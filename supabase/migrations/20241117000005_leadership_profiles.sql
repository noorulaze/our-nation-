-- OUR NATION: Standardized Leadership & Guidance Profiles Database Migration
-- Version: 20241117000005
-- Description: Creates public.leadership_profiles table with normalized fields for community leadership, project guidance, verification metadata, and strict Row Level Security (RLS).

CREATE TABLE IF NOT EXISTS public.leadership_profiles (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  display_name TEXT NOT NULL,
  profile_photo_url TEXT,
  photo_type TEXT NOT NULL DEFAULT 'placeholder' CHECK (photo_type IN ('official', 'placeholder', 'pending_authorization')),
  photo_status TEXT NOT NULL DEFAULT 'pending_authorization' CHECK (photo_status IN ('verified_photo', 'awaiting_photo', 'pending_authorization')),
  photo_source TEXT,
  designation TEXT NOT NULL,
  leadership_category TEXT NOT NULL CHECK (leadership_category IN (
    'community_leadership',
    'project_guidance',
    'civic_advisory',
    'youth_leadership',
    'expert_advisor'
  )),
  short_introduction TEXT,
  full_biography TEXT,
  main_responsibilities JSONB NOT NULL DEFAULT '[]'::jsonb,
  areas_of_leadership JSONB NOT NULL DEFAULT '[]'::jsonb,
  organization TEXT NOT NULL DEFAULT 'OUR NATION – Tanur',
  associated_local_government_body TEXT,
  committee_membership JSONB NOT NULL DEFAULT '[]'::jsonb,
  public_contact_number TEXT,
  is_contact_publicly_authorized BOOLEAN NOT NULL DEFAULT false,
  public_email TEXT,
  is_email_publicly_authorized BOOLEAN NOT NULL DEFAULT false,
  official_website TEXT,
  public_office_address TEXT,
  social_media_links JSONB NOT NULL DEFAULT '[]'::jsonb,
  verification_status TEXT NOT NULL DEFAULT 'pending_admin_approval' CHECK (verification_status IN (
    'verified',
    'pending_admin_approval',
    'draft',
    'archived'
  )),
  information_source_url TEXT,
  photograph_source TEXT,
  consent_confirmed BOOLEAN NOT NULL DEFAULT false,
  consent_date DATE,
  last_verified_date DATE,
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_leadership_slug ON public.leadership_profiles(slug);
CREATE INDEX IF NOT EXISTS idx_leadership_category ON public.leadership_profiles(leadership_category);
CREATE INDEX IF NOT EXISTS idx_leadership_verification ON public.leadership_profiles(verification_status);

-- Enable Row Level Security (RLS)
ALTER TABLE public.leadership_profiles ENABLE ROW LEVEL SECURITY;

-- Policy 1: Public Read Access (Verified profiles accessible to everyone)
CREATE POLICY "Public can view verified leadership profiles"
  ON public.leadership_profiles FOR SELECT
  USING (verification_status = 'verified');

-- Policy 2: Admin Full Management Access (Admins can view, create, edit, verify, and archive)
CREATE POLICY "Admins can manage all leadership profiles"
  ON public.leadership_profiles FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('admin', 'moderator')
    )
  );

-- Seed Special Initial Profile: PK Nawas (Pending Admin Approval)
INSERT INTO public.leadership_profiles (
  id,
  slug,
  full_name,
  display_name,
  profile_photo_url,
  photo_type,
  photo_status,
  photo_source,
  designation,
  leadership_category,
  organization,
  short_introduction,
  full_biography,
  main_responsibilities,
  areas_of_leadership,
  verification_status,
  consent_confirmed,
  admin_notes
) VALUES (
  'profile-pk-nawas',
  'pk-nawas',
  'PK Nawas',
  'PK Nawas',
  '/placeholder-leader.svg',
  'pending_authorization',
  'pending_authorization',
  'Pending authorized photograph.',
  'Overall Community Leader & Project Guidance',
  'community_leadership',
  'OUR NATION – Tanur',
  'To be added after confirmation.',
  'Pending verified information.',
  '["To be confirmed with the individual."]'::jsonb,
  '["Community Leadership", "Civic Guidance", "Youth Engagement"]'::jsonb,
  'pending_admin_approval',
  false,
  'Profile created under standardized leadership structure. Pending official individual consent confirmation and admin review.'
) ON CONFLICT (id) DO UPDATE SET
  designation = EXCLUDED.designation,
  verification_status = EXCLUDED.verification_status,
  updated_at = timezone('utc'::text, now());
