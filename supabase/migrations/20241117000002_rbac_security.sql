-- ==============================================================================
-- OUR NATION: Role-Based Access Control (RBAC) & Privilege Escalation Prevention
-- Migration: 20241117000002_rbac_security.sql
--
-- PURPOSE:
-- 1. Prevent users from self-escalating permissions (e.g. updating their own role column).
-- 2. Enforce that only verified administrators (role = 'admin') can modify user roles.
-- 3. Log all role transitions and privilege changes into the immutable audit_logs table.
-- 4. Harden Row Level Security (RLS) policies on public.profiles.
-- ==============================================================================

-- 1. Create or replace the trigger function that protects the role column
CREATE OR REPLACE FUNCTION public.prevent_self_role_escalation()
RETURNS TRIGGER AS $$
BEGIN
  -- If the role is unchanged, allow normal profile updates (bio, display_name, avatar, etc.)
  IF NEW.role IS NOT DISTINCT FROM OLD.role THEN
    RETURN NEW;
  END IF;

  -- If the role IS changing, verify that the executing database session belongs to an authorized admin
  -- Notice: auth.uid() is null during service-role administrative operations or migrations
  IF auth.uid() IS NOT NULL AND NOT public.is_admin(auth.uid()) THEN
    RAISE EXCEPTION 'Access Denied: Ordinary users and unauthorized sessions cannot alter user roles or escalate privileges.';
  END IF;

  -- Ensure target role is a valid enum/string
  IF NEW.role NOT IN ('user', 'moderator', 'verified_org', 'admin') THEN
    RAISE EXCEPTION 'Invalid role: %', NEW.role;
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

-- 2. Attach trigger to public.profiles
DROP TRIGGER IF EXISTS trg_prevent_self_role_escalation ON public.profiles;
CREATE TRIGGER trg_prevent_self_role_escalation
  BEFORE UPDATE OF role ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_self_role_escalation();

-- 3. Explicitly verify & ensure RLS policy on profiles restricts role assignment
-- Allow users to update their own profile fields (excluding role, which is guarded by the trigger)
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id OR public.is_admin(auth.uid()));

-- Restrict direct row insertion of non-user roles by unauthenticated or regular users
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (
    auth.uid() = id 
    AND (
      NEW.role = 'user' 
      OR public.is_admin(auth.uid())
    )
  );

COMMENT ON FUNCTION public.prevent_self_role_escalation() IS 
  'Enforces strict server-side RBAC: prevents self-role elevation and requires admin authorization.';
