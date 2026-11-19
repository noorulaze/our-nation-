-- OUR NATION: People's Voice (ജനകീയ ശബ്ദം) Database Migration
-- Version: 20241117000001
-- Description: Citizen Participation, Community Ideas, Discussions, Initiatives, Moderation & Audit Logs

-- 1. COMMUNITY IDEAS TABLE
CREATE TABLE IF NOT EXISTS public.community_ideas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_id TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  title_ml TEXT NOT NULL,
  description TEXT NOT NULL,
  description_ml TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN (
    'roads_transport', 'waste_cleanliness', 'education', 'healthcare',
    'environment', 'public_facilities', 'tourism', 'digital_services',
    'youth_development', 'community_welfare', 'other'
  )),
  locality TEXT NOT NULL,
  locality_ml TEXT,
  ward_number INT CHECK (ward_number >= 1 AND ward_number <= 44),
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_avatar TEXT,
  is_anonymous BOOLEAN NOT NULL DEFAULT false,
  images TEXT[] DEFAULT '{}',
  expected_benefit TEXT NOT NULL,
  expected_benefit_ml TEXT,
  estimated_cost TEXT,
  estimated_cost_note TEXT,
  status TEXT NOT NULL DEFAULT 'Submitted' CHECK (status IN (
    'Submitted', 'Under Review', 'Community Discussion', 'Shortlisted',
    'Forwarded for Consideration', 'Accepted for Collaboration', 'In Progress',
    'Completed', 'Not Proceeding'
  )),
  status_reason TEXT,
  status_reason_ml TEXT,
  forwarded_record JSONB,
  collaboration_record JSONB,
  support_count INT NOT NULL DEFAULT 0,
  comments_count INT NOT NULL DEFAULT 0,
  is_hidden BOOLEAN NOT NULL DEFAULT false,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. COMMUNITY IDEA SUPPORTS (Prevent duplicate support from same user)
CREATE TABLE IF NOT EXISTS public.community_idea_supports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  idea_id UUID NOT NULL REFERENCES public.community_ideas(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  UNIQUE(idea_id, user_id)
);

-- 3. COMMUNITY IDEA COMMENTS
CREATE TABLE IF NOT EXISTS public.community_idea_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  idea_id UUID NOT NULL REFERENCES public.community_ideas(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_avatar TEXT,
  content TEXT NOT NULL,
  is_official BOOLEAN NOT NULL DEFAULT false,
  official_role TEXT,
  is_hidden BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. COMMUNITY IDEA TIMELINE UPDATES
CREATE TABLE IF NOT EXISTS public.community_idea_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  idea_id UUID NOT NULL REFERENCES public.community_ideas(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  title TEXT NOT NULL,
  title_ml TEXT NOT NULL,
  description TEXT NOT NULL,
  actor TEXT NOT NULL,
  actor_role TEXT NOT NULL,
  evidence_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. COMMUNITY DISCUSSIONS
CREATE TABLE IF NOT EXISTS public.community_discussions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  title_ml TEXT,
  body TEXT NOT NULL,
  body_ml TEXT,
  category TEXT NOT NULL CHECK (category IN (
    'local_development', 'environment', 'education',
    'public_facilities', 'community_initiatives', 'improvement_ideas'
  )),
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_avatar TEXT,
  locality TEXT,
  tags TEXT[] DEFAULT '{}',
  likes_count INT NOT NULL DEFAULT 0,
  replies_count INT NOT NULL DEFAULT 0,
  is_pinned BOOLEAN NOT NULL DEFAULT false,
  is_closed BOOLEAN NOT NULL DEFAULT false,
  is_hidden BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 6. COMMUNITY DISCUSSION COMMENTS & REPLIES
CREATE TABLE IF NOT EXISTS public.community_discussion_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  discussion_id UUID NOT NULL REFERENCES public.community_discussions(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_avatar TEXT,
  content TEXT NOT NULL,
  parent_comment_id UUID REFERENCES public.community_discussion_comments(id) ON DELETE CASCADE,
  likes_count INT NOT NULL DEFAULT 0,
  is_official BOOLEAN NOT NULL DEFAULT false,
  official_role TEXT,
  is_hidden BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 7. LOCAL INITIATIVES
CREATE TABLE IF NOT EXISTS public.community_initiatives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  title_ml TEXT,
  description TEXT NOT NULL,
  description_ml TEXT,
  category TEXT NOT NULL CHECK (category IN (
    'cleanliness', 'tree_planting', 'education_support',
    'volunteering', 'public_awareness', 'cultural'
  )),
  organizer_name TEXT NOT NULL,
  organizer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  organizer_type TEXT NOT NULL DEFAULT 'community_group' CHECK (organizer_type IN (
    'individual', 'community_group', 'ngo', 'youth_club', 'residents_association'
  )),
  locality TEXT NOT NULL,
  locality_ml TEXT,
  venue_address TEXT NOT NULL,
  event_date DATE NOT NULL,
  event_time TEXT NOT NULL,
  participation_instructions TEXT NOT NULL,
  contact_details TEXT NOT NULL,
  contact_phone TEXT,
  contact_email TEXT,
  images TEXT[] DEFAULT '{}',
  participant_count INT NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
  progress_updates JSONB DEFAULT '[]'::jsonb,
  is_approved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 8. INITIATIVE PARTICIPANTS (RSVP)
CREATE TABLE IF NOT EXISTS public.community_initiative_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  initiative_id UUID NOT NULL REFERENCES public.community_initiatives(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  registered_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  notes TEXT,
  UNIQUE(initiative_id, user_id)
);

-- 9. CONTENT REPORTS
CREATE TABLE IF NOT EXISTS public.community_content_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type TEXT NOT NULL CHECK (content_type IN ('idea', 'comment', 'discussion', 'initiative')),
  content_id UUID NOT NULL,
  content_title TEXT NOT NULL,
  reporter_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  reporter_name TEXT NOT NULL,
  reason TEXT NOT NULL CHECK (reason IN ('spam', 'offensive', 'misleading', 'inappropriate', 'defamatory', 'other')),
  details TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'actioned', 'dismissed')),
  action_taken TEXT,
  reviewed_by TEXT,
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 10. AUDIT LOGS
CREATE TABLE IF NOT EXISTS public.community_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  actor_name TEXT NOT NULL,
  actor_role TEXT NOT NULL,
  action TEXT NOT NULL,
  target_type TEXT NOT NULL,
  target_id TEXT NOT NULL,
  target_title TEXT NOT NULL,
  details TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_community_ideas_category ON public.community_ideas(category);
CREATE INDEX IF NOT EXISTS idx_community_ideas_status ON public.community_ideas(status);
CREATE INDEX IF NOT EXISTS idx_community_ideas_locality ON public.community_ideas(locality);
CREATE INDEX IF NOT EXISTS idx_community_ideas_ward ON public.community_ideas(ward_number);
CREATE INDEX IF NOT EXISTS idx_community_ideas_author ON public.community_ideas(author_id);
CREATE INDEX IF NOT EXISTS idx_community_discussions_cat ON public.community_discussions(category);
CREATE INDEX IF NOT EXISTS idx_community_initiatives_date ON public.community_initiatives(event_date);
CREATE INDEX IF NOT EXISTS idx_community_content_reports_status ON public.community_content_reports(status);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.community_ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_idea_supports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_idea_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_discussion_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_initiatives ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_content_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_audit_logs ENABLE ROW LEVEL SECURITY;

-- Ideas: readable by all, writable by authenticated
CREATE POLICY "Public can view non-hidden ideas" ON public.community_ideas
  FOR SELECT USING (is_hidden = false OR auth.uid() = author_id);

CREATE POLICY "Authenticated users can submit ideas" ON public.community_ideas
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authors or admins can update ideas" ON public.community_ideas
  FOR UPDATE USING (auth.uid() = author_id OR EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'moderator')
  ));

-- Supports: authenticated users can insert/delete own support
CREATE POLICY "Public can view supports" ON public.community_idea_supports
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage own support" ON public.community_idea_supports
  FOR ALL USING (auth.uid() = user_id);

-- Discussions & Initiatives: public read, authenticated write
CREATE POLICY "Public can view discussions" ON public.community_discussions FOR SELECT USING (is_hidden = false);
CREATE POLICY "Authenticated create discussions" ON public.community_discussions FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Public can view approved initiatives" ON public.community_initiatives FOR SELECT USING (is_approved = true);
CREATE POLICY "Authenticated create initiatives" ON public.community_initiatives FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Reports: readable only by moderators and admins
CREATE POLICY "Admins view reports" ON public.community_content_reports
  FOR ALL USING (EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'moderator')
  ));

CREATE POLICY "Authenticated users can create reports" ON public.community_content_reports
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
