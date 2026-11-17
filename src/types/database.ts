export type UserRole = 'user' | 'moderator' | 'verified_org' | 'admin';
export type PreferredLanguage = 'ml' | 'en';
export type CommunityType = 'country' | 'state' | 'district' | 'locality' | 'panchayath' | 'municipality' | 'corporation';
export type MembershipRole = 'member' | 'moderator' | 'admin';
export type ContentStatus = 'published' | 'under_review' | 'removed';
export type EventStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';
export type BusinessStatus = 'pending' | 'approved' | 'rejected' | 'suspended';
export type AnnouncementStatus = 'pending' | 'approved' | 'rejected' | 'expired';
export type IssueCategory = 'roads' | 'waste_management' | 'water' | 'public_facilities' | 'environment' | 'other';
export type IssueStatus = 'submitted' | 'under_review' | 'acknowledged' | 'in_progress' | 'resolved' | 'rejected';
export type ReportContentType = 'post' | 'comment' | 'event' | 'business' | 'issue';
export type ReportStatus = 'pending' | 'reviewed' | 'dismissed' | 'actioned';

export interface Profile {
  id: string;
  username: string;
  display_name: string;
  email?: string | null;
  avatar_url?: string | null;
  bio?: string | null;
  preferred_language: PreferredLanguage;
  selected_community_id?: string | null;
  role: UserRole;
  interests?: string[];
  created_at: string;
  updated_at: string;
}

export interface Community {
  id: string;
  name: string;
  name_ml: string;
  slug: string;
  description?: string | null;
  description_ml?: string | null;
  type: CommunityType;
  parent_id?: string | null;
  district: string;
  latitude?: number | null;
  longitude?: number | null;
  cover_image_url?: string | null;
  member_count: number;
  is_active: boolean;
  created_at: string;
  parent?: Community | null;
}

export interface CommunityMembership {
  id: string;
  user_id: string;
  community_id: string;
  role: MembershipRole;
  created_at: string;
  community?: Community;
}

export interface Category {
  id: string;
  name: string;
  name_ml: string;
  slug: string;
  module: 'post' | 'event' | 'business' | 'issue' | 'announcement' | 'place';
  icon?: string | null;
  created_at: string;
}

export interface Post {
  id: string;
  community_id: string;
  author_id: string;
  content: string;
  media_urls: string[];
  likes_count: number;
  comments_count: number;
  is_pinned: boolean;
  status: ContentStatus;
  created_at: string;
  updated_at: string;
  author?: Profile;
  community?: Community;
}

export interface Comment {
  id: string;
  post_id: string;
  author_id: string;
  content: string;
  status: ContentStatus;
  created_at: string;
  author?: Profile;
}

export interface Event {
  id: string;
  community_id: string;
  creator_id: string;
  title: string;
  title_ml?: string | null;
  description: string;
  category: string;
  location_name: string;
  latitude?: number | null;
  longitude?: number | null;
  start_date: string;
  end_date?: string | null;
  image_url?: string | null;
  organizer_name: string;
  contact_phone?: string | null;
  contact_email?: string | null;
  status: EventStatus;
  rejection_reason?: string | null;
  created_at: string;
  community?: Community;
  creator?: Profile;
}

export interface Business {
  id: string;
  community_id: string;
  owner_id?: string | null;
  name: string;
  name_ml?: string | null;
  category: string;
  description: string;
  address: string;
  latitude?: number | null;
  longitude?: number | null;
  phone: string;
  email?: string | null;
  website?: string | null;
  opening_hours?: Record<string, string> | null;
  image_url?: string | null;
  is_verified: boolean;
  status: BusinessStatus;
  created_at: string;
  community?: Community;
}

export interface Place {
  id: string;
  community_id: string;
  name: string;
  name_ml?: string | null;
  category: string;
  description: string;
  location_name: string;
  latitude?: number | null;
  longitude?: number | null;
  image_url?: string | null;
  created_at: string;
  community?: Community;
}

export interface Announcement {
  id: string;
  community_id: string;
  publisher_id: string;
  title: string;
  title_ml?: string | null;
  content: string;
  category: string;
  is_official: boolean;
  publisher_organization: string;
  image_url?: string | null;
  status: AnnouncementStatus;
  expires_at?: string | null;
  created_at: string;
  publisher?: Profile;
  community?: Community;
}

export interface IssueReport {
  id: string;
  community_id: string;
  reporter_id: string;
  title: string;
  description: string;
  category: IssueCategory;
  location_name?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  image_url?: string | null;
  status: IssueStatus;
  official_response?: string | null;
  status_updated_at: string;
  status_updated_by?: string | null;
  created_at: string;
  reporter?: Profile;
  community?: Community;
}

export interface ModerationReport {
  id: string;
  reporter_id: string;
  content_type: ReportContentType;
  content_id: string;
  reason: string;
  details?: string | null;
  status: ReportStatus;
  reviewed_by?: string | null;
  created_at: string;
  reporter?: Profile;
}

export interface AuditLog {
  id: string;
  actor_id?: string | null;
  action: string;
  target_type: string;
  target_id?: string | null;
  details?: Record<string, any> | null;
  created_at: string;
  actor?: Profile;
}
