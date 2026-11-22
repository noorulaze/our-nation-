-- OUR NATION: Development Tracker Comprehensive Upgrade Migration
-- Version: 20241117000009
-- Description: Upgrades development_projects schema to support 9 statutory categories, 8 progress statuses,
--              Tanur 45 confirmed municipal wards (Wards 1–45), three-way financial transparency
--              (Approved Budget, Estimated Cost, Actual Expenditure), milestone verification, and RLS policies.

-- 1. ADD NEW TRANSPARENCY COLUMNS TO DEVELOPMENT PROJECTS
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='development_projects' AND column_name='approved_budget') THEN
    ALTER TABLE public.development_projects ADD COLUMN approved_budget TEXT;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='development_projects' AND column_name='estimated_cost') THEN
    ALTER TABLE public.development_projects ADD COLUMN estimated_cost TEXT;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='development_projects' AND column_name='actual_expenditure') THEN
    ALTER TABLE public.development_projects ADD COLUMN actual_expenditure TEXT;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='development_projects' AND column_name='funding_source') THEN
    ALTER TABLE public.development_projects ADD COLUMN funding_source TEXT;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='development_projects' AND column_name='implementing_agency') THEN
    ALTER TABLE public.development_projects ADD COLUMN implementing_agency TEXT;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='development_projects' AND column_name='verification_status') THEN
    ALTER TABLE public.development_projects ADD COLUMN verification_status TEXT DEFAULT 'verified' CHECK (verification_status IN ('verified', 'pending_verification', 'unverified'));
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='development_projects' AND column_name='verified_by') THEN
    ALTER TABLE public.development_projects ADD COLUMN verified_by TEXT;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='development_projects' AND column_name='gallery_images') THEN
    ALTER TABLE public.development_projects ADD COLUMN gallery_images TEXT[] DEFAULT '{}';
  END IF;
END $$;

-- 2. UPDATE WARD CHECK CONSTRAINT (TANUR MUNICIPALITY 45 STATUTORY WARDS)
ALTER TABLE public.development_projects DROP CONSTRAINT IF EXISTS development_projects_ward_number_check;
ALTER TABLE public.development_projects ADD CONSTRAINT development_projects_ward_number_check 
  CHECK (ward_number IS NULL OR (ward_number BETWEEN 1 AND 45));

-- 3. UPDATE STATUTORY CATEGORIES CHECK CONSTRAINT
ALTER TABLE public.development_projects DROP CONSTRAINT IF EXISTS development_projects_category_check;
ALTER TABLE public.development_projects ADD CONSTRAINT development_projects_category_check
  CHECK (category IN (
    -- 9 Statutory Categories
    'roads_transportation', 'drainage_water', 'drinking_water', 'waste_management',
    'education', 'healthcare', 'public_infrastructure', 'parks_public_spaces', 'other_development',
    -- Legacy & backward compatibility keys
    'roads_transport', 'water_drainage', 'public_facilities', 'environment', 'streetlights',
    'community_infrastructure', 'other', 'infrastructure', 'fisheries_harbour', 'water_sanitation',
    'sports_youth', 'tourism_culture', 'environment_coastal', 'facilities'
  ));

-- 4. UPDATE STATUTORY STATUSES CHECK CONSTRAINT (8 STATUTORY STATUSES + ANNOUNCED)
ALTER TABLE public.development_projects DROP CONSTRAINT IF EXISTS development_projects_status_check;
ALTER TABLE public.development_projects ADD CONSTRAINT development_projects_status_check
  CHECK (status IN (
    'Proposed', 'Approved', 'Planned', 'In Progress', 'Delayed', 'Completed', 'On Hold', 'Cancelled', 'Announced'
  ));

-- 5. UPGRADE DEVELOPMENT PROJECT UPDATES TABLE
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='development_project_updates' AND column_name='official_remarks') THEN
    ALTER TABLE public.development_project_updates ADD COLUMN official_remarks TEXT;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='development_project_updates' AND column_name='milestone_percentage') THEN
    ALTER TABLE public.development_project_updates ADD COLUMN milestone_percentage INT CHECK (milestone_percentage >= 0 AND milestone_percentage <= 100);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='development_project_updates' AND column_name='supporting_photos') THEN
    ALTER TABLE public.development_project_updates ADD COLUMN supporting_photos TEXT[] DEFAULT '{}';
  END IF;
END $$;

-- 6. UPDATE CITIZEN SUGGESTIONS WARD CONSTRAINT
ALTER TABLE public.development_project_suggestions DROP CONSTRAINT IF EXISTS development_project_suggestions_ward_number_check;
ALTER TABLE public.development_project_suggestions ADD CONSTRAINT development_project_suggestions_ward_number_check
  CHECK (ward_number IS NULL OR (ward_number >= 1 AND ward_number <= 45));

-- 7. RE-VERIFY ROW LEVEL SECURITY POLICIES
ALTER TABLE public.development_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.development_project_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.development_project_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.development_project_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.development_project_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.development_project_suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.development_project_audit_logs ENABLE ROW LEVEL SECURITY;

-- Project Policies
DROP POLICY IF EXISTS "Public can view unarchived development projects" ON public.development_projects;
CREATE POLICY "Public can view unarchived development projects"
  ON public.development_projects FOR SELECT
  USING (is_archived = false);

DROP POLICY IF EXISTS "Admins and moderators can view all development projects" ON public.development_projects;
CREATE POLICY "Admins and moderators can view all development projects"
  ON public.development_projects FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'moderator', 'super_admin')
    )
  );

DROP POLICY IF EXISTS "Admins and moderators can insert/update development projects" ON public.development_projects;
CREATE POLICY "Admins and moderators can insert/update development projects"
  ON public.development_projects FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'moderator', 'super_admin')
    )
  );

-- Milestone / Updates Policies
DROP POLICY IF EXISTS "Public can view development project updates" ON public.development_project_updates;
CREATE POLICY "Public can view development project updates"
  ON public.development_project_updates FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Admins and moderators can manage updates" ON public.development_project_updates;
CREATE POLICY "Admins and moderators can manage updates"
  ON public.development_project_updates FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'moderator', 'super_admin')
    )
  );

-- Audit Log Policy (Immutable Appending)
DROP POLICY IF EXISTS "Admins can view audit logs" ON public.development_project_audit_logs;
CREATE POLICY "Admins can view audit logs"
  ON public.development_project_audit_logs FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'moderator', 'super_admin')
    )
  );

DROP POLICY IF EXISTS "System can insert audit logs" ON public.development_project_audit_logs;
CREATE POLICY "System can insert audit logs"
  ON public.development_project_audit_logs FOR INSERT
  TO authenticated
  WITH CHECK (true);
