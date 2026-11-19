-- OUR NATION: Complete Local Government & Representatives Directory Database Migration
-- Version: 20241117000004
-- Description: Tanur Municipality (Urban) and Tanur Block Panchayat with 7 Grama Panchayats (Rural), Wards, Elected Representatives, and Administrative Audits

-- 1. LOCAL GOVERNMENT BODIES TABLE
CREATE TABLE IF NOT EXISTS public.local_government_bodies (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  name_ml TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('urban', 'rural')),
  type TEXT NOT NULL CHECK (type IN ('municipality', 'block_panchayat', 'grama_panchayat')),
  parent_block_id TEXT REFERENCES public.local_government_bodies(id) ON DELETE SET NULL,
  district TEXT NOT NULL DEFAULT 'Malappuram',
  taluk TEXT NOT NULL DEFAULT 'Tirur',
  hq_address TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  official_website TEXT NOT NULL,
  total_wards INT NOT NULL CHECK (total_wards > 0),
  population TEXT,
  area_sq_km TEXT,
  description TEXT NOT NULL,
  leadership JSONB NOT NULL DEFAULT '{}'::jsonb,
  source_url TEXT NOT NULL,
  last_verified DATE NOT NULL DEFAULT CURRENT_DATE,
  verification_status TEXT NOT NULL DEFAULT 'verified' CHECK (verification_status IN ('verified', 'pending_verification', 'disputed')),
  administrative_note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. LOCAL GOVERNMENT WARDS TABLE
CREATE TABLE IF NOT EXISTS public.local_government_wards (
  id TEXT PRIMARY KEY,
  local_body_id TEXT NOT NULL REFERENCES public.local_government_bodies(id) ON DELETE CASCADE,
  ward_number INT NOT NULL CHECK (ward_number > 0),
  ward_name TEXT NOT NULL,
  ward_name_ml TEXT,
  reservation TEXT NOT NULL DEFAULT 'General' CHECK (reservation IN ('General', 'Woman', 'SC', 'SC Woman', 'ST')),
  representative_id TEXT,
  representative_name TEXT NOT NULL,
  representative_name_ml TEXT,
  party TEXT,
  photo_url TEXT,
  phone TEXT,
  verification_status TEXT NOT NULL DEFAULT 'verified' CHECK (verification_status IN ('verified', 'pending_verification', 'disputed')),
  source_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  UNIQUE (local_body_id, ward_number)
);

-- 3. LOCAL REPRESENTATIVES TABLE
CREATE TABLE IF NOT EXISTS public.local_representatives (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  name_ml TEXT,
  photo_url TEXT,
  photo_source TEXT,
  local_body_id TEXT NOT NULL REFERENCES public.local_government_bodies(id) ON DELETE CASCADE,
  local_body_name TEXT NOT NULL,
  local_body_slug TEXT NOT NULL,
  local_body_type TEXT NOT NULL CHECK (local_body_type IN ('municipality', 'block_panchayat', 'grama_panchayat')),
  local_body_category TEXT NOT NULL CHECK (local_body_category IN ('urban', 'rural')),
  ward_number INT NOT NULL,
  ward_name TEXT NOT NULL,
  ward_id TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN (
    'chairperson', 'vice_chairperson', 'councillor',
    'president', 'vice_president', 'block_member', 'panchayat_member',
    'standing_committee_chairperson', 'standing_committee_member'
  )),
  role_title TEXT NOT NULL,
  is_head BOOLEAN NOT NULL DEFAULT false,
  is_deputy BOOLEAN NOT NULL DEFAULT false,
  standing_committees JSONB DEFAULT '[]'::jsonb,
  party TEXT,
  phone TEXT,
  email TEXT,
  bio TEXT,
  reservation TEXT,
  source_url TEXT NOT NULL,
  last_verified DATE NOT NULL DEFAULT CURRENT_DATE,
  verification_status TEXT NOT NULL DEFAULT 'verified' CHECK (verification_status IN ('verified', 'pending_verification', 'disputed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. REPRESENTATIVE AUDIT TRAIL TABLE
CREATE TABLE IF NOT EXISTS public.local_representative_audits (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  representative_id TEXT NOT NULL REFERENCES public.local_representatives(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  modified_by TEXT NOT NULL,
  note TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. PERFORMANCE INDEXES
CREATE INDEX IF NOT EXISTS idx_lg_bodies_category ON public.local_government_bodies(category);
CREATE INDEX IF NOT EXISTS idx_lg_bodies_type ON public.local_government_bodies(type);
CREATE INDEX IF NOT EXISTS idx_lg_bodies_slug ON public.local_government_bodies(slug);
CREATE INDEX IF NOT EXISTS idx_lg_wards_body_id ON public.local_government_wards(local_body_id);
CREATE INDEX IF NOT EXISTS idx_lg_reps_body_id ON public.local_representatives(local_body_id);
CREATE INDEX IF NOT EXISTS idx_lg_reps_role ON public.local_representatives(role);
CREATE INDEX IF NOT EXISTS idx_lg_reps_verification ON public.local_representatives(verification_status);

-- 6. ENABLE ROW LEVEL SECURITY
ALTER TABLE public.local_government_bodies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.local_government_wards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.local_representatives ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.local_representative_audits ENABLE ROW LEVEL SECURITY;

-- 7. RLS POLICIES (Public Read, Admin Write)
CREATE POLICY "Public can view local government bodies"
  ON public.local_government_bodies FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage local government bodies"
  ON public.local_government_bodies FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('admin', 'moderator')
    )
  );

CREATE POLICY "Public can view local government wards"
  ON public.local_government_wards FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage local government wards"
  ON public.local_government_wards FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('admin', 'moderator')
    )
  );

CREATE POLICY "Public can view local representatives"
  ON public.local_representatives FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage local representatives"
  ON public.local_representatives FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('admin', 'moderator')
    )
  );

CREATE POLICY "Admins can view and create representative audits"
  ON public.local_representative_audits FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('admin', 'moderator')
    )
  );
