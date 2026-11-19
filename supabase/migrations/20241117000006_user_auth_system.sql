-- ==============================================================================
-- OUR NATION: Complete Authentication, User Account & Super Admin RBAC System
-- Migration: 20241117000006_user_auth_system.sql
--
-- PURPOSE:
-- 1. Extend profiles with account_status ('active', 'suspended', 'deactivated'),
--    email_verified flag, privacy_settings, and deletion request audit fields.
-- 2. Upgrade UserRole to support 'citizen', 'user', 'moderator', 'verified_org',
--    'admin', and 'super_admin'.
-- 3. Enforce Super Admin hierarchy: only 'super_admin' can assign 'admin' or 'super_admin'.
--    Ordinary 'admin' cannot elevate anyone to super_admin or admin.
-- 4. Maintain zero self-escalation and immutable audit logs.
-- ==============================================================================

-- 1. Add columns to public.profiles safely
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'account_status'
  ) THEN
    ALTER TABLE public.profiles 
      ADD COLUMN account_status TEXT NOT NULL DEFAULT 'active' 
      CHECK (account_status IN ('active', 'suspended', 'deactivated'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'email_verified'
  ) THEN
    ALTER TABLE public.profiles 
      ADD COLUMN email_verified BOOLEAN NOT NULL DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'privacy_settings'
  ) THEN
    ALTER TABLE public.profiles 
      ADD COLUMN privacy_settings JSONB DEFAULT '{"show_phone": false, "show_email": false, "show_address": false, "public_profile": false}'::jsonb;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'deletion_requested_at'
  ) THEN
    ALTER TABLE public.profiles 
      ADD COLUMN deletion_requested_at TIMESTAMPTZ;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'deletion_reason'
  ) THEN
    ALTER TABLE public.profiles 
      ADD COLUMN deletion_reason TEXT;
  END IF;
END $$;

-- 2. Upgrade is_admin helper to recognize both 'admin' and 'super_admin'
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = user_id 
      AND role IN ('admin', 'super_admin') 
      AND (account_status IS NULL OR account_status = 'active')
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- 3. Helper to check if user is a super_admin
CREATE OR REPLACE FUNCTION public.is_super_admin(user_id uuid)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = user_id 
      AND role = 'super_admin' 
      AND (account_status IS NULL OR account_status = 'active')
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- 4. Hardened prevent_self_role_escalation trigger function
CREATE OR REPLACE FUNCTION public.prevent_self_role_escalation()
RETURNS TRIGGER AS $$
BEGIN
  -- If role is unchanged, allow normal profile updates
  IF NEW.role IS NOT DISTINCT FROM OLD.role THEN
    RETURN NEW;
  END IF;

  -- Block any non-admin from modifying roles
  IF auth.uid() IS NOT NULL AND NOT public.is_admin(auth.uid()) THEN
    RAISE EXCEPTION 'Access Denied: Ordinary users and unauthorized sessions cannot alter user roles or escalate privileges.';
  END IF;

  -- Validate target role against allowed role list
  IF NEW.role NOT IN ('citizen', 'user', 'moderator', 'verified_org', 'admin', 'super_admin') THEN
    RAISE EXCEPTION 'Invalid role: %', NEW.role;
  END IF;

  -- Super Admin privilege boundary:
  -- Only a verified super_admin can grant 'admin' or 'super_admin' roles.
  IF NEW.role IN ('admin', 'super_admin') AND auth.uid() IS NOT NULL AND NOT public.is_super_admin(auth.uid()) THEN
    RAISE EXCEPTION 'Access Denied: Only a Super Administrator can assign administrative or super administrator privileges.';
  END IF;

  -- Write role change event to immutable audit log
  INSERT INTO public.audit_logs (
    actor_id,
    action,
    target_type,
    target_id,
    details
  ) VALUES (
    COALESCE(auth.uid(), '00000000-0000-0000-0000-000000000000'::uuid),
    'ASSIGN_USER_ROLE',
    'profiles',
    NEW.id,
    jsonb_build_object(
      'previous_role', OLD.role,
      'new_role', NEW.role,
      'target_username', NEW.username,
      'timestamp', now()
    )
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Attach updated trigger
DROP TRIGGER IF EXISTS trg_prevent_self_role_escalation ON public.profiles;
CREATE TRIGGER trg_prevent_self_role_escalation
  BEFORE UPDATE OF role ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_self_role_escalation();

-- 6. RLS: Default registration creates 'citizen' / 'user' role with 'active' status
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (
    auth.uid() = id 
    AND (
      NEW.role IN ('citizen', 'user')
      OR public.is_admin(auth.uid())
    )
  );

COMMENT ON FUNCTION public.is_super_admin(uuid) IS 
  'Verifies if the designated user holds active Super Administrator privileges.';
