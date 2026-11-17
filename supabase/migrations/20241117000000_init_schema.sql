-- Nammude Naadu: Supabase Database Migration
-- Version: 20241117000000
-- Description: Core tables, RLS policies, indexes, and triggers

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  preferred_language TEXT NOT NULL DEFAULT 'ml' CHECK (preferred_language IN ('ml', 'en')),
  selected_community_id UUID,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'moderator', 'verified_org', 'admin')),
  interests TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. COMMUNITIES HIERARCHY
-- India -> Kerala -> District -> Town/Locality/Panchayath
CREATE TABLE IF NOT EXISTS public.communities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  name_ml TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  description_ml TEXT,
  type TEXT NOT NULL CHECK (type IN ('country', 'state', 'district', 'locality', 'panchayath', 'municipality', 'corporation')),
  parent_id UUID REFERENCES public.communities(id) ON DELETE SET NULL,
  district TEXT NOT NULL,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  cover_image_url TEXT,
  member_count INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Add foreign key constraint to profiles now that communities exists
ALTER TABLE public.profiles 
  ADD CONSTRAINT fk_profiles_selected_community 
  FOREIGN KEY (selected_community_id) 
  REFERENCES public.communities(id) 
  ON DELETE SET NULL;

-- 3. COMMUNITY MEMBERSHIPS
CREATE TABLE IF NOT EXISTS public.community_memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  community_id UUID NOT NULL REFERENCES public.communities(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('member', 'moderator', 'admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  UNIQUE(user_id, community_id)
);

-- 4. CATEGORIES
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  name_ml TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  module TEXT NOT NULL CHECK (module IN ('post', 'event', 'business', 'issue', 'announcement', 'place')),
  icon TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. POSTS
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID NOT NULL REFERENCES public.communities(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  media_urls TEXT[] NOT NULL DEFAULT '{}',
  likes_count INT NOT NULL DEFAULT 0,
  comments_count INT NOT NULL DEFAULT 0,
  is_pinned BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('published', 'under_review', 'removed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 6. COMMENTS
CREATE TABLE IF NOT EXISTS public.comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('published', 'removed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 7. EVENTS
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID NOT NULL REFERENCES public.communities(id) ON DELETE CASCADE,
  creator_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  title_ml TEXT,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  location_name TEXT NOT NULL,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ,
  image_url TEXT,
  organizer_name TEXT NOT NULL,
  contact_phone TEXT,
  contact_email TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'cancelled')),
  rejection_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 8. BUSINESSES (LOCAL SERVICES)
CREATE TABLE IF NOT EXISTS public.businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID NOT NULL REFERENCES public.communities(id) ON DELETE CASCADE,
  owner_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  name_ml TEXT,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  address TEXT NOT NULL,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  phone TEXT NOT NULL,
  email TEXT,
  website TEXT,
  opening_hours JSONB,
  image_url TEXT,
  is_verified BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'suspended')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 9. PLACES (POINTS OF INTEREST)
CREATE TABLE IF NOT EXISTS public.places (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID NOT NULL REFERENCES public.communities(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  name_ml TEXT,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  location_name TEXT NOT NULL,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 10. ANNOUNCEMENTS
CREATE TABLE IF NOT EXISTS public.announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID NOT NULL REFERENCES public.communities(id) ON DELETE CASCADE,
  publisher_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  title_ml TEXT,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  is_official BOOLEAN NOT NULL DEFAULT true,
  publisher_organization TEXT NOT NULL,
  image_url TEXT,
  status TEXT NOT NULL DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'rejected', 'expired')),
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 11. ISSUE REPORTS (COMMUNITY IMPROVEMENT)
CREATE TABLE IF NOT EXISTS public.issue_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID NOT NULL REFERENCES public.communities(id) ON DELETE CASCADE,
  reporter_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('roads', 'waste_management', 'water', 'public_facilities', 'environment', 'other')),
  location_name TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  image_url TEXT,
  status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'acknowledged', 'in_progress', 'resolved', 'rejected')),
  official_response TEXT,
  status_updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  status_updated_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 12. MODERATION REPORTS
CREATE TABLE IF NOT EXISTS public.moderation_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content_type TEXT NOT NULL CHECK (content_type IN ('post', 'comment', 'event', 'business', 'issue')),
  content_id UUID NOT NULL,
  reason TEXT NOT NULL,
  details TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'dismissed', 'actioned')),
  reviewed_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 13. AUDIT LOGS
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  target_type TEXT NOT NULL,
  target_id TEXT,
  details JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 14. MEDIA METADATA
CREATE TABLE IF NOT EXISTS public.media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  uploader_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  size_bytes BIGINT NOT NULL,
  bucket_name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_communities_parent_id ON public.communities(parent_id);
CREATE INDEX IF NOT EXISTS idx_communities_district ON public.communities(district);
CREATE INDEX IF NOT EXISTS idx_communities_slug ON public.communities(slug);

CREATE INDEX IF NOT EXISTS idx_memberships_user ON public.community_memberships(user_id);
CREATE INDEX IF NOT EXISTS idx_memberships_community ON public.community_memberships(community_id);

CREATE INDEX IF NOT EXISTS idx_posts_community_created ON public.posts(community_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_author ON public.posts(author_id);
CREATE INDEX IF NOT EXISTS idx_comments_post ON public.comments(post_id);

CREATE INDEX IF NOT EXISTS idx_events_community_date ON public.events(community_id, start_date);
CREATE INDEX IF NOT EXISTS idx_events_status ON public.events(status);

CREATE INDEX IF NOT EXISTS idx_businesses_community ON public.businesses(community_id);
CREATE INDEX IF NOT EXISTS idx_businesses_status ON public.businesses(status);
CREATE INDEX IF NOT EXISTS idx_businesses_category ON public.businesses(category);

CREATE INDEX IF NOT EXISTS idx_announcements_community ON public.announcements(community_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_announcements_status ON public.announcements(status);

CREATE INDEX IF NOT EXISTS idx_issue_reports_community ON public.issue_reports(community_id, status);
CREATE INDEX IF NOT EXISTS idx_issue_reports_reporter ON public.issue_reports(reporter_id);

-- TRIGGER FOR NEW USER CREATION IN AUTH.USERS -> PUBLIC.PROFILES
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, display_name, avatar_url, preferred_language)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1) || '_' || substr(NEW.id::text, 1, 5)),
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url',
    COALESCE(NEW.raw_user_meta_data->>'preferred_language', 'ml')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.communities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.places ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.issue_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.moderation_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;

-- Helper function: is admin or moderator
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = user_id AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.is_staff(user_id UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = user_id AND role IN ('admin', 'moderator')
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- Profiles: Anyone can read, user can update own profile, admins can update any
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id OR public.is_admin(auth.uid()));

-- Communities: Viewable by everyone, insert/update by admin/moderator
CREATE POLICY "Active communities viewable by all" ON public.communities
  FOR SELECT USING (is_active = true OR public.is_staff(auth.uid()));

CREATE POLICY "Communities manageable by admins" ON public.communities
  FOR ALL USING (public.is_admin(auth.uid()));

-- Community Memberships: Viewable by everyone, user can join/leave
CREATE POLICY "Memberships viewable by all" ON public.community_memberships
  FOR SELECT USING (true);

CREATE POLICY "Users can join/leave community" ON public.community_memberships
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove own membership" ON public.community_memberships
  FOR DELETE USING (auth.uid() = user_id OR public.is_staff(auth.uid()));

-- Categories: Viewable by all, managed by admins
CREATE POLICY "Categories viewable by all" ON public.categories
  FOR SELECT USING (true);

CREATE POLICY "Categories manageable by admins" ON public.categories
  FOR ALL USING (public.is_admin(auth.uid()));

-- Posts: Published posts viewable by all, authors can manage own, staff can moderate
CREATE POLICY "Published posts viewable by everyone" ON public.posts
  FOR SELECT USING (status = 'published' OR auth.uid() = author_id OR public.is_staff(auth.uid()));

CREATE POLICY "Authenticated users can create posts" ON public.posts
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update own posts" ON public.posts
  FOR UPDATE USING (auth.uid() = author_id OR public.is_staff(auth.uid()));

CREATE POLICY "Users can delete own posts or staff can remove" ON public.posts
  FOR DELETE USING (auth.uid() = author_id OR public.is_staff(auth.uid()));

-- Comments: Viewable if published, authenticated users can comment
CREATE POLICY "Published comments viewable by everyone" ON public.comments
  FOR SELECT USING (status = 'published' OR auth.uid() = author_id OR public.is_staff(auth.uid()));

CREATE POLICY "Authenticated users can create comments" ON public.comments
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update own comments" ON public.comments
  FOR UPDATE USING (auth.uid() = author_id OR public.is_staff(auth.uid()));

CREATE POLICY "Users can delete own comments" ON public.comments
  FOR DELETE USING (auth.uid() = author_id OR public.is_staff(auth.uid()));

-- Events: Approved events viewable by all, user can see own pending, staff can see all
CREATE POLICY "Approved events viewable by all" ON public.events
  FOR SELECT USING (status = 'approved' OR auth.uid() = creator_id OR public.is_staff(auth.uid()));

CREATE POLICY "Users can submit events" ON public.events
  FOR INSERT WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Creators can edit pending events or staff can edit all" ON public.events
  FOR UPDATE USING (auth.uid() = creator_id OR public.is_staff(auth.uid()));

-- Businesses: Approved businesses viewable by all, owners or staff can edit
CREATE POLICY "Approved businesses viewable by all" ON public.businesses
  FOR SELECT USING (status = 'approved' OR auth.uid() = owner_id OR public.is_staff(auth.uid()));

CREATE POLICY "Users can register business" ON public.businesses
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owners or staff can edit business" ON public.businesses
  FOR UPDATE USING (auth.uid() = owner_id OR public.is_staff(auth.uid()));

-- Places: Viewable by all, managed by staff
CREATE POLICY "Places viewable by all" ON public.places
  FOR SELECT USING (true);

CREATE POLICY "Staff can manage places" ON public.places
  FOR ALL USING (public.is_staff(auth.uid()));

-- Announcements: Approved viewable by all, verified orgs/staff can insert/manage
CREATE POLICY "Approved announcements viewable by all" ON public.announcements
  FOR SELECT USING (status = 'approved' OR auth.uid() = publisher_id OR public.is_staff(auth.uid()));

CREATE POLICY "Verified orgs and staff can create announcements" ON public.announcements
  FOR INSERT WITH CHECK (
    auth.uid() = publisher_id AND (
      EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('verified_org', 'moderator', 'admin'))
    )
  );

CREATE POLICY "Publishers or staff can update announcements" ON public.announcements
  FOR UPDATE USING (auth.uid() = publisher_id OR public.is_staff(auth.uid()));

-- Issue Reports: Reporter can view own, staff can view all in community
CREATE POLICY "Users view own issues or staff view all" ON public.issue_reports
  FOR SELECT USING (auth.uid() = reporter_id OR public.is_staff(auth.uid()));

CREATE POLICY "Users can submit issues" ON public.issue_reports
  FOR INSERT WITH CHECK (auth.uid() = reporter_id);

CREATE POLICY "Staff can update issue status" ON public.issue_reports
  FOR UPDATE USING (public.is_staff(auth.uid()));

-- Moderation Reports: Reporter can create, only staff can view and manage
CREATE POLICY "Users can submit moderation reports" ON public.moderation_reports
  FOR INSERT WITH CHECK (auth.uid() = reporter_id);

CREATE POLICY "Staff can view and manage moderation reports" ON public.moderation_reports
  FOR ALL USING (public.is_staff(auth.uid()));

-- Audit Logs: Only staff can view, server/functions can insert
CREATE POLICY "Staff can view audit logs" ON public.audit_logs
  FOR SELECT USING (public.is_staff(auth.uid()));

CREATE POLICY "Authenticated users can insert audit log" ON public.audit_logs
  FOR INSERT WITH CHECK (auth.uid() = actor_id);
