-- OUR NATION: Transparent Tanur (സുതാര്യ താനൂർ) Database Migration
-- Version: 20241117000003
-- Description: Smart Municipal Development Tracker, Projects, Milestones, Verifications, Citizen Contributions, and Audit Logs

-- 1. DEVELOPMENT PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.development_projects (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  tracking_id TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  title_ml TEXT NOT NULL,
  description TEXT NOT NULL,
  description_ml TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN (
    'roads_transport', 'water_drainage', 'waste_management', 'education',
    'healthcare', 'public_facilities', 'environment', 'streetlights',
    'community_infrastructure', 'other',
    'infrastructure', 'fisheries_harbour', 'water_sanitation', 'sports_youth', 'environment_coastal'
  )),
  locality TEXT NOT NULL,
  locality_ml TEXT,
  ward_number INT CHECK (ward_number >= 0 AND ward_number <= 44),
  department TEXT NOT NULL,
  department_ml TEXT NOT NULL,
  budget_sanctioned TEXT NOT NULL,
  budget_sanctioned_amount NUMERIC(15,2),
  budget_spent_amount NUMERIC(15,2),
  completion_percentage INT DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
  status TEXT NOT NULL DEFAULT 'Announced' CHECK (status IN (
    'Proposed', 'Announced', 'Approved', 'In Progress', 'Completed', 'Delayed', 'On Hold'
  )),
  status_reason TEXT,
  source_type TEXT NOT NULL DEFAULT 'official_published' CHECK (source_type IN (
    'official_published', 'admin_entered', 'community_submitted'
  )),
  source_document_name TEXT,
  source_url TEXT,
  announced_date DATE,
  approval_date DATE,
  start_date DATE,
  estimated_completion DATE,
  completion_date DATE,
  contractor TEXT,
  contractor_contact TEXT,
  coordinates JSONB NOT NULL DEFAULT '{"lat": 10.9754, "lng": 75.8672}'::jsonb,
  last_verified_date DATE NOT NULL DEFAULT CURRENT_DATE,
  is_archived BOOLEAN NOT NULL DEFAULT false,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. DEVELOPMENT PROJECT UPDATES / MILESTONES TABLE
CREATE TABLE IF NOT EXISTS public.development_project_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id TEXT NOT NULL REFERENCES public.development_projects(id) ON DELETE CASCADE,
  update_date DATE NOT NULL DEFAULT CURRENT_DATE,
  title TEXT NOT NULL,
  title_ml TEXT NOT NULL,
  description TEXT NOT NULL,
  description_ml TEXT NOT NULL,
  milestone_achieved TEXT,
  completion_percentage_at_time INT CHECK (completion_percentage_at_time >= 0 AND completion_percentage_at_time <= 100),
  inspection_report_ref TEXT,
  evidence_url TEXT,
  verified_by TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. DEVELOPMENT PROJECT MEDIA TABLE
CREATE TABLE IF NOT EXISTS public.development_project_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id TEXT NOT NULL REFERENCES public.development_projects(id) ON DELETE CASCADE,
  media_type TEXT NOT NULL DEFAULT 'image' CHECK (media_type IN ('image', 'video', 'document')),
  url TEXT NOT NULL,
  caption TEXT,
  caption_ml TEXT,
  captured_date DATE,
  verified BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. DEVELOPMENT PROJECT TRANSPARENCY SOURCES TABLE
CREATE TABLE IF NOT EXISTS public.development_project_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id TEXT NOT NULL REFERENCES public.development_projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  source_type TEXT NOT NULL CHECK (source_type IN (
    'gazette', 'go_order', 'tender', 'budget_speech', 'assembly_answer',
    'municipal_council_resolution', 'official_portal', 'field_inspection'
  )),
  file_url TEXT,
  official_ref_number TEXT,
  published_date DATE,
  issuing_authority TEXT,
  verified BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. DEVELOPMENT PROJECT VERIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.development_project_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id TEXT NOT NULL REFERENCES public.development_projects(id) ON DELETE CASCADE,
  verified_by UUID REFERENCES public.profiles(id),
  verifier_name TEXT NOT NULL,
  verification_notes TEXT NOT NULL,
  verified_status TEXT NOT NULL,
  verified_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 6. DEVELOPMENT PROJECT CITIZEN SUGGESTIONS & CONTRIBUTIONS TABLE
CREATE TABLE IF NOT EXISTS public.development_project_suggestions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id TEXT REFERENCES public.development_projects(id) ON DELETE SET NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  contributor_name TEXT NOT NULL,
  contributor_phone TEXT,
  suggestion_type TEXT NOT NULL CHECK (suggestion_type IN (
    'suggest_project', 'submit_photo', 'report_outdated', 'ask_question'
  )),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  ward_number INT CHECK (ward_number >= 0 AND ward_number <= 44),
  locality TEXT,
  photos TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN (
    'Pending', 'Approved', 'Rejected', 'Incorporated'
  )),
  admin_notes TEXT,
  reviewed_by UUID REFERENCES public.profiles(id),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 7. DEVELOPMENT PROJECT IMMUTABLE AUDIT LOGS TABLE
CREATE TABLE IF NOT EXISTS public.development_project_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id TEXT REFERENCES public.development_projects(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  performed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  performed_by_name TEXT NOT NULL,
  change_summary TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- INDEXES FOR OPTIMAL QUERY PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_dev_proj_status ON public.development_projects(status);
CREATE INDEX IF NOT EXISTS idx_dev_proj_category ON public.development_projects(category);
CREATE INDEX IF NOT EXISTS idx_dev_proj_ward ON public.development_projects(ward_number);
CREATE INDEX IF NOT EXISTS idx_dev_proj_locality ON public.development_projects(locality);
CREATE INDEX IF NOT EXISTS idx_dev_proj_updated ON public.development_projects(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_dev_proj_verified ON public.development_projects(last_verified_date DESC);
CREATE INDEX IF NOT EXISTS idx_dev_updates_project ON public.development_project_updates(project_id, update_date DESC);
CREATE INDEX IF NOT EXISTS idx_dev_media_project ON public.development_project_media(project_id);
CREATE INDEX IF NOT EXISTS idx_dev_sources_project ON public.development_project_sources(project_id);
CREATE INDEX IF NOT EXISTS idx_dev_suggestions_status ON public.development_project_suggestions(status);
CREATE INDEX IF NOT EXISTS idx_dev_suggestions_project ON public.development_project_suggestions(project_id);
CREATE INDEX IF NOT EXISTS idx_dev_audit_project ON public.development_project_audit_logs(project_id, created_at DESC);

-- ENABLE ROW LEVEL SECURITY
ALTER TABLE public.development_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.development_project_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.development_project_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.development_project_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.development_project_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.development_project_suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.development_project_audit_logs ENABLE ROW LEVEL SECURITY;

-- ROW LEVEL SECURITY POLICIES

-- 1. Projects Policies
CREATE POLICY "Public can view unarchived development projects"
  ON public.development_projects FOR SELECT
  USING (is_archived = false);

CREATE POLICY "Admins and moderators can view all development projects"
  ON public.development_projects FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'moderator')
    )
  );

CREATE POLICY "Admins and moderators can insert/update development projects"
  ON public.development_projects FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'moderator')
    )
  );

-- 2. Updates & Milestones Policies
CREATE POLICY "Public can view development project updates"
  ON public.development_project_updates FOR SELECT
  USING (true);

CREATE POLICY "Admins and moderators can manage updates"
  ON public.development_project_updates FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'moderator')
    )
  );

-- 3. Media Policies
CREATE POLICY "Public can view verified media"
  ON public.development_project_media FOR SELECT
  USING (verified = true);

CREATE POLICY "Admins and moderators can manage media"
  ON public.development_project_media FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'moderator')
    )
  );

-- 4. Sources Policies
CREATE POLICY "Public can view project sources"
  ON public.development_project_sources FOR SELECT
  USING (true);

CREATE POLICY "Admins and moderators can manage sources"
  ON public.development_project_sources FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'moderator')
    )
  );

-- 5. Suggestions / Citizen Contributions Policies
CREATE POLICY "Public can view approved suggestions"
  ON public.development_project_suggestions FOR SELECT
  USING (status = 'Approved' OR status = 'Incorporated');

CREATE POLICY "Authenticated users can submit suggestions"
  ON public.development_project_suggestions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can view their own submitted suggestions"
  ON public.development_project_suggestions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins and moderators can manage all suggestions"
  ON public.development_project_suggestions FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'moderator')
    )
  );

-- 6. Verifications Policies
CREATE POLICY "Public can view verifications"
  ON public.development_project_verifications FOR SELECT
  USING (true);

CREATE POLICY "Admins and moderators can manage verifications"
  ON public.development_project_verifications FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'moderator')
    )
  );

-- 7. Audit Logs Policies
CREATE POLICY "Admins can view audit logs"
  ON public.development_project_audit_logs FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'moderator')
    )
  );

CREATE POLICY "Authenticated staff can append audit logs"
  ON public.development_project_audit_logs FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'moderator')
    )
  );
