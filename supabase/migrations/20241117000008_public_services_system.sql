-- ============================================================================
-- OUR NATION: ONLINE PUBLIC SERVICES SYSTEM
-- Migration: 20241117000008_public_services_system.sql
-- Covers: 8 Statutory Categories, Dedicated Service Directory, Verification Audits,
-- Unique Reference Tracking (PS-TNR-2026-XXXX), Tanur Wards 1-45, and Strict RLS Guardrails
-- ============================================================================

-- 1. PUBLIC SERVICES DIRECTORY TABLE
CREATE TABLE IF NOT EXISTS public.public_services (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  title_ml TEXT,
  category_id TEXT NOT NULL CHECK (
    category_id IN (
      'cat-certificates',
      'cat-property-tax',
      'cat-building',
      'cat-water-sanitation',
      'cat-public-health',
      'cat-business',
      'cat-social-welfare',
      'cat-other'
    )
  ),
  category_name TEXT NOT NULL,
  department TEXT NOT NULL,
  summary TEXT NOT NULL,
  eligibility TEXT[] NOT NULL DEFAULT '{}',
  required_documents TEXT[] NOT NULL DEFAULT '{}',
  procedure_steps JSONB NOT NULL DEFAULT '[]'::jsonb,
  official_portal_url TEXT,
  official_portal_name TEXT,
  processing_time_days INTEGER DEFAULT 0,
  processing_time_text TEXT NOT NULL,
  fee_structure TEXT NOT NULL,
  office_location TEXT NOT NULL DEFAULT 'Tanur Municipality Office, Main Road, Tanur - 676302',
  contact_phone TEXT NOT NULL DEFAULT '0494 2440228',
  contact_email TEXT DEFAULT 'tanurmunicipality@gmail.com',
  working_hours TEXT DEFAULT 'Monday to Saturday: 10:00 AM – 5:00 PM',
  is_online_available BOOLEAN DEFAULT true,
  online_system_name TEXT,
  last_verified_date DATE NOT NULL DEFAULT CURRENT_DATE,
  source_reference TEXT NOT NULL,
  faqs JSONB DEFAULT '[]'::jsonb,
  views_count INTEGER DEFAULT 0,
  supports_internal_application BOOLEAN DEFAULT true,
  published BOOLEAN DEFAULT true,
  audit_history JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PUBLIC SERVICE INTERNAL GUIDANCE APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.public_service_applications (
  id TEXT PRIMARY KEY DEFAULT ('app-' || floor(extract(epoch from now()))::text || '-' || floor(random() * 1000)::text),
  reference_no TEXT UNIQUE NOT NULL CHECK (reference_no ~ '^PS-TNR-2026-[0-9]{4,}$'),
  service_id TEXT NOT NULL REFERENCES public.public_services(id) ON DELETE RESTRICT,
  service_title TEXT NOT NULL,
  service_category TEXT NOT NULL,
  applicant_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  applicant_name TEXT NOT NULL,
  applicant_email TEXT NOT NULL,
  applicant_phone TEXT NOT NULL,
  ward_number INTEGER NOT NULL CHECK (ward_number BETWEEN 1 AND 45),
  documents JSONB DEFAULT '[]'::jsonb,
  notes TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'submitted' CHECK (
    status IN (
      'submitted', 
      'under_review', 
      'documents_verified', 
      'forwarded_guidance', 
      'completed', 
      'rejected'
    )
  ),
  status_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  timeline JSONB DEFAULT '[]'::jsonb
);

-- 3. INDEXES FOR HIGH VELOCITY SEARCH & QUERY OPTIMIZATION
CREATE INDEX IF NOT EXISTS idx_public_services_slug ON public.public_services(slug);
CREATE INDEX IF NOT EXISTS idx_public_services_category ON public.public_services(category_id);
CREATE INDEX IF NOT EXISTS idx_public_services_published ON public.public_services(published);
CREATE INDEX IF NOT EXISTS idx_public_service_apps_applicant ON public.public_service_applications(applicant_id);
CREATE INDEX IF NOT EXISTS idx_public_service_apps_ref ON public.public_service_applications(reference_no);
CREATE INDEX IF NOT EXISTS idx_public_service_apps_status ON public.public_service_applications(status);
CREATE INDEX IF NOT EXISTS idx_public_service_apps_ward ON public.public_service_applications(ward_number);

-- 4. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.public_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.public_service_applications ENABLE ROW LEVEL SECURITY;

-- Public Services Policies
CREATE POLICY "Public services are viewable by all users"
  ON public.public_services FOR SELECT
  USING (published = true OR (auth.jwt() ->> 'role') IN ('admin', 'super_admin', 'moderator'));

CREATE POLICY "Authorized staff can modify public services"
  ON public.public_services FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin', 'moderator')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin', 'moderator')
    )
  );

-- Applications Policies: Strict Citizen Data Isolation
CREATE POLICY "Citizens can view only their own service applications"
  ON public.public_service_applications FOR SELECT
  TO authenticated
  USING (
    applicant_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin', 'moderator')
    )
  );

CREATE POLICY "Authenticated citizens can submit service applications"
  ON public.public_service_applications FOR INSERT
  TO authenticated
  WITH CHECK (
    applicant_id = auth.uid()
  );

CREATE POLICY "Staff can update application statuses and guidance notes"
  ON public.public_service_applications FOR UPDATE
  TO authenticated
  USING (
    applicant_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin', 'moderator')
    )
  )
  WITH CHECK (
    applicant_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin', 'moderator')
    )
  );
