-- ============================================================================
-- OUR NATION: CIVIC ISSUE REPORTING SYSTEM
-- Migration: 20241117000007_civic_reporting_system.sql
-- Covers: 8 Statutory Categories, 8 Processing Statuses, Tanur Wards 1-45,
-- Dedicated Audit Timeline, Resolution Evidence, and Strict RLS Guardrails
-- ============================================================================

-- 1. CIVIC COMPLAINTS TABLE
CREATE TABLE IF NOT EXISTS public.civic_complaints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_id TEXT UNIQUE NOT NULL,
  reporter_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  reporter_name TEXT NOT NULL,
  reporter_contact TEXT,
  is_anonymous BOOLEAN NOT NULL DEFAULT false,
  
  -- Issue Details
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category_id TEXT NOT NULL CHECK (
    category_id IN (
      'cat-roads', 
      'cat-streetlights', 
      'cat-waste', 
      'cat-drainage', 
      'cat-water', 
      'cat-facilities', 
      'cat-health', 
      'cat-other',
      'cat-lighting',
      'cat-safety'
    )
  ),
  subcategory TEXT NOT NULL,
  
  -- Tanur Municipality Ward & Location
  ward_number INTEGER NOT NULL CHECK (ward_number BETWEEN 1 AND 45),
  ward_name TEXT,
  district TEXT NOT NULL DEFAULT 'Malappuram',
  locality TEXT NOT NULL DEFAULT 'Tanur Municipality',
  jurisdiction_type TEXT NOT NULL DEFAULT 'municipality' CHECK (jurisdiction_type IN ('municipality', 'block_panchayat', 'district')),
  address_landmark TEXT NOT NULL,
  latitude DOUBLE PRECISION DEFAULT 10.9753,
  longitude DOUBLE PRECISION DEFAULT 75.8672,
  
  -- Evidence & Contact Preferences
  images TEXT[] DEFAULT '{}',
  contact_preference TEXT NOT NULL DEFAULT 'in_app' CHECK (contact_preference IN ('in_app', 'phone', 'email', 'none')),
  
  -- 8 Exact Processing Statuses
  status TEXT NOT NULL DEFAULT 'submitted' CHECK (
    status IN (
      'submitted', 
      'under_review', 
      'verified', 
      'assigned', 
      'in_progress', 
      'resolved', 
      'closed', 
      'rejected',
      'forwarded',
      'reopened'
    )
  ),
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  support_count INTEGER NOT NULL DEFAULT 1,
  
  -- Department Assignment
  assigned_department TEXT,
  assigned_staff_name TEXT,
  assigned_at TIMESTAMPTZ,
  assignment_reference TEXT,
  
  -- Rejection & Moderation
  rejection_reason TEXT,
  moderator_notes TEXT,
  
  -- Resolution Proof
  resolution_notes TEXT,
  resolution_images TEXT[] DEFAULT '{}',
  resolved_at TIMESTAMPTZ,
  is_resolution_verified BOOLEAN DEFAULT false,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. CHRONOLOGICAL AUDIT TIMELINE
CREATE TABLE IF NOT EXISTS public.civic_complaint_timeline (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  complaint_id UUID NOT NULL REFERENCES public.civic_complaints(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  actor_name TEXT NOT NULL,
  actor_role TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. OFFICIAL & CITIZEN COMMENTS
CREATE TABLE IF NOT EXISTS public.civic_complaint_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  complaint_id UUID NOT NULL REFERENCES public.civic_complaints(id) ON DELETE CASCADE,
  author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  author_name TEXT NOT NULL,
  content TEXT NOT NULL,
  is_official BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. PERFORMANCE & LOOKUP INDEXES
CREATE INDEX IF NOT EXISTS idx_civic_complaints_tracking ON public.civic_complaints(tracking_id);
CREATE INDEX IF NOT EXISTS idx_civic_complaints_reporter ON public.civic_complaints(reporter_id);
CREATE INDEX IF NOT EXISTS idx_civic_complaints_ward ON public.civic_complaints(ward_number);
CREATE INDEX IF NOT EXISTS idx_civic_complaints_status ON public.civic_complaints(status);
CREATE INDEX IF NOT EXISTS idx_civic_complaints_category ON public.civic_complaints(category_id);
CREATE INDEX IF NOT EXISTS idx_civic_complaints_created ON public.civic_complaints(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_civic_timeline_complaint ON public.civic_complaint_timeline(complaint_id, created_at ASC);
CREATE INDEX IF NOT EXISTS idx_civic_comments_complaint ON public.civic_complaint_comments(complaint_id, created_at ASC);

-- 5. ENABLE ROW-LEVEL SECURITY
ALTER TABLE public.civic_complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.civic_complaint_timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.civic_complaint_comments ENABLE ROW LEVEL SECURITY;

-- 6. RLS POLICIES FOR CIVIC COMPLAINTS

-- A. Public & Citizen Read Access: Anyone can inspect complaints
CREATE POLICY "Public can view complaints" ON public.civic_complaints
  FOR SELECT
  USING (true);

-- B. Citizen Submission Access: Authenticated users can insert complaints
CREATE POLICY "Authenticated users can submit complaints" ON public.civic_complaints
  FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL AND (reporter_id = auth.uid() OR is_anonymous = true)
  );

-- C. Citizen Update Restriction: Citizens cannot alter administrative statuses
-- Only administrative roles (admin, super_admin, moderator, staff) can mutate status, assignments, or resolution
CREATE POLICY "Admins and Staff can update complaints" ON public.civic_complaints
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'super_admin', 'moderator', 'staff')
    )
  );

-- D. Delete restriction: Only super admins can purge complaint records
CREATE POLICY "Super admins can delete complaints" ON public.civic_complaints
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() 
      AND role = 'super_admin'
    )
  );

-- 7. RLS POLICIES FOR TIMELINE
CREATE POLICY "Public can view complaint timeline" ON public.civic_complaint_timeline
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can add timeline events" ON public.civic_complaint_timeline
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'super_admin', 'moderator', 'staff')
    )
    OR
    EXISTS (
      SELECT 1 FROM public.civic_complaints
      WHERE id = complaint_id AND reporter_id = auth.uid()
    )
  );

-- 8. RLS POLICIES FOR COMMENTS
CREATE POLICY "Public can view complaint comments" ON public.civic_complaint_comments
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can comment" ON public.civic_complaint_comments
  FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL
  );

-- 9. COMPATIBILITY VIEW
CREATE OR REPLACE VIEW public.civic_issues AS
  SELECT 
    id,
    tracking_id,
    reporter_id,
    CASE WHEN is_anonymous THEN 'Anonymous Resident' ELSE reporter_name END AS reporter_name,
    title,
    description,
    category_id,
    subcategory,
    ward_number,
    ward_name,
    district,
    locality,
    jurisdiction_type,
    address_landmark,
    latitude,
    longitude,
    images,
    contact_preference,
    status,
    priority,
    support_count,
    assigned_department,
    assigned_staff_name,
    rejection_reason,
    moderator_notes,
    resolution_notes,
    resolution_images,
    resolved_at,
    is_anonymous,
    created_at,
    updated_at
  FROM public.civic_complaints;
