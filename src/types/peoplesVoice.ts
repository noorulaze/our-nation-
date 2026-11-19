/**
 * OUR NATION — PEOPLE'S VOICE (ജനകീയ ശബ്ദം)
 * Data types for Citizen Participation & Community Development Platform
 * Primary Coverage: Tanur Municipality, Malappuram District, Kerala
 */

export type IdeaCategory = 
  | 'roads_transport'
  | 'waste_cleanliness'
  | 'education'
  | 'healthcare'
  | 'environment'
  | 'public_facilities'
  | 'tourism'
  | 'digital_services'
  | 'youth_development'
  | 'community_welfare'
  | 'other';

export type IdeaStatus = 
  | 'Submitted'
  | 'Under Review'
  | 'Community Discussion'
  | 'Shortlisted'
  | 'Forwarded for Consideration'
  | 'Accepted for Collaboration'
  | 'In Progress'
  | 'Completed'
  | 'Not Proceeding';

export interface IdeaForwardingRecord {
  authority_name: string;
  department: string;
  forwarded_date: string;
  reference_number: string;
  official_contact_note?: string;
  notes?: string;
}

export interface IdeaCollaborationRecord {
  organization_name: string;
  organization_type: 'municipality_cell' | 'resident_association' | 'ngo' | 'youth_collective' | 'academic_institution' | 'other';
  accepted_date: string;
  contact_person?: string;
  collaboration_scope: string;
  verification_note?: string;
}

export interface IdeaTimelineEvent {
  id: string;
  status: IdeaStatus;
  title: string;
  title_ml: string;
  description: string;
  description_ml?: string;
  date: string;
  actor: string;
  actor_role: string;
  evidence_url?: string;
}

export interface IdeaComment {
  id: string;
  idea_id: string;
  author_id: string;
  author_name: string;
  author_avatar?: string;
  content: string;
  is_official: boolean;
  official_role?: string;
  created_at: string;
}

export interface CommunityIdea {
  id: string;
  tracking_id: string; // e.g. TNR-PV-2026-104
  title: string;
  title_ml: string;
  description: string;
  description_ml: string;
  category: IdeaCategory;
  category_name: string;
  category_name_ml: string;
  locality: string;
  locality_ml?: string;
  ward_number?: number;
  author_id: string;
  author_name: string;
  author_avatar?: string;
  is_anonymous: boolean;
  images: string[];
  expected_benefit: string;
  expected_benefit_ml?: string;
  estimated_cost?: string; // Clearly marked as community-provided estimate
  estimated_cost_note?: string;
  status: IdeaStatus;
  status_reason?: string;
  status_reason_ml?: string;
  forwarded_record?: IdeaForwardingRecord;
  collaboration_record?: IdeaCollaborationRecord;
  support_count: number;
  supported_user_ids: string[]; // for preventing duplicate support
  supported_by_user?: boolean;
  followed_user_ids?: string[];
  is_followed_by_user?: boolean;
  comments_count: number;
  comments: IdeaComment[];
  timeline: IdeaTimelineEvent[];
  is_hidden: boolean;
  is_featured?: boolean;
  created_at: string;
  updated_at: string;
}

export type DiscussionCategory = 
  | 'local_development'
  | 'environment'
  | 'education'
  | 'public_facilities'
  | 'community_initiatives'
  | 'improvement_ideas';

export interface DiscussionComment {
  id: string;
  discussion_id: string;
  author_id: string;
  author_name: string;
  author_avatar?: string;
  content: string;
  parent_comment_id?: string;
  likes_count: number;
  liked_user_ids?: string[];
  is_official: boolean;
  official_role?: string;
  created_at: string;
}

export interface CommunityDiscussion {
  id: string;
  title: string;
  title_ml?: string;
  body: string;
  body_ml?: string;
  category: DiscussionCategory;
  category_name: string;
  category_name_ml: string;
  author_id: string;
  author_name: string;
  author_avatar?: string;
  locality?: string;
  tags: string[];
  likes_count: number;
  liked_user_ids: string[];
  liked_by_user?: boolean;
  replies_count: number;
  followed_user_ids: string[];
  is_followed_by_user?: boolean;
  is_pinned: boolean;
  is_closed: boolean;
  is_hidden: boolean;
  comments: DiscussionComment[];
  created_at: string;
  updated_at: string;
}

export type InitiativeCategory = 
  | 'cleanliness'
  | 'tree_planting'
  | 'education_support'
  | 'volunteering'
  | 'public_awareness'
  | 'cultural';

export interface InitiativeUpdate {
  id: string;
  date: string;
  title: string;
  notes: string;
  photos?: string[];
}

export interface LocalInitiative {
  id: string;
  title: string;
  title_ml?: string;
  description: string;
  description_ml?: string;
  category: InitiativeCategory;
  category_name: string;
  category_name_ml: string;
  organizer_name: string;
  organizer_id: string;
  organizer_type: 'individual' | 'community_group' | 'ngo' | 'youth_club' | 'residents_association';
  locality: string;
  locality_ml?: string;
  venue_address: string;
  event_date: string;
  event_time: string;
  participation_instructions: string;
  contact_details: string; // Protected, shown with consent or safe registration
  contact_phone?: string;
  contact_email?: string;
  images: string[];
  participant_count: number;
  participant_user_ids: string[];
  is_participating_by_user?: boolean;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  progress_updates: InitiativeUpdate[];
  is_approved: boolean;
  created_at: string;
  updated_at: string;
}

export type ReportContentType = 'idea' | 'comment' | 'discussion' | 'initiative';
export type ReportReason = 'spam' | 'offensive' | 'misleading' | 'inappropriate' | 'defamatory' | 'other';
export type ReportStatus = 'pending' | 'reviewed' | 'actioned' | 'dismissed';

export interface ContentReport {
  id: string;
  content_type: ReportContentType;
  content_id: string;
  content_title: string;
  reporter_id: string;
  reporter_name: string;
  reason: ReportReason;
  details: string;
  status: ReportStatus;
  action_taken?: string;
  reviewed_by?: string;
  reviewed_at?: string;
  created_at: string;
}

export interface PeoplesVoiceAuditLog {
  id: string;
  actor_id: string;
  actor_name: string;
  actor_role: string;
  action: 'idea_approved' | 'idea_rejected' | 'status_changed' | 'content_hidden' | 'content_restored' | 'report_actioned' | 'report_dismissed' | 'comment_removed' | 'official_update_posted' | 'initiative_approved';
  target_type: ReportContentType | 'audit';
  target_id: string;
  target_title: string;
  details: string;
  timestamp: string;
}
