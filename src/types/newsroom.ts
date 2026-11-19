export type NewsCategorySlug = 
  | 'local'
  | 'kerala'
  | 'national'
  | 'international'
  | 'politics'
  | 'education'
  | 'business'
  | 'tech'
  | 'sports'
  | 'environment'
  | 'health';

export type GeographicScope = 'tanur' | 'malappuram' | 'kerala' | 'national' | 'international';

export type ArticleStatus = 'published' | 'breaking' | 'review' | 'rejected' | 'archived';

export type BreakingSeverity = 'developing' | 'urgent' | 'critical';

export interface SmartNewsSource {
  id: string;
  name: string;
  name_ml: string;
  slug: string;
  website_url: string;
  feed_url: string;
  feed_type: 'rss' | 'atom' | 'api' | 'official_pr';
  publisher: string;
  category_default: NewsCategorySlug;
  geographic_scope: GeographicScope;
  reliability_score: number; // 0 - 100
  polling_interval_minutes: number; // e.g. 2, 5, 15
  is_active: boolean;
  last_polled_at?: string | null;
  last_success_at?: string | null;
  consecutive_failures: number;
  error_message?: string | null;
  terms_verified: boolean;
  articles_ingested_count: number;
}

export interface NewsArticleSource {
  id: string;
  article_id: string;
  source_id: string;
  source_name: string;
  original_url: string;
  original_headline: string;
  published_at: string;
  reliability_score: number;
}

export interface NewsLiveUpdate {
  id: string;
  article_id: string;
  timestamp: string;
  title: string;
  title_ml: string;
  update_text: string;
  update_text_ml: string;
  source_name: string;
  is_confirmed: boolean;
}

export interface NewsEditorialReview {
  id: string;
  article_id: string;
  reason: string;
  flagged_at: string;
  reviewer_id?: string | null;
  reviewer_name?: string | null;
  review_status: 'pending' | 'approved' | 'rejected' | 'modified';
  reviewer_notes?: string | null;
  action_taken_at?: string | null;
}

export interface NewsCorrection {
  id: string;
  article_id: string;
  type: 'clarification' | 'correction' | 'retraction';
  statement: string;
  statement_ml: string;
  published_at: string;
  editor_name: string;
}

export interface NewsFetchLog {
  id: string;
  source_id: string;
  source_name: string;
  fetched_at: string;
  status: 'success' | 'failed' | 'partial';
  articles_found: number;
  articles_published: number;
  articles_skipped: number;
  articles_flagged: number;
  duration_ms: number;
  error_message?: string | null;
}

export interface NewsUserPreferences {
  user_id: string;
  preferred_categories: NewsCategorySlug[];
  local_priority: boolean;
  breaking_alerts: boolean;
  preferred_language: 'ml' | 'en';
}

export interface NewsNotification {
  id: string;
  article_id: string;
  title: string;
  title_ml: string;
  summary: string;
  type: 'breaking' | 'local_urgent' | 'daily_roundup';
  created_at: string;
  is_read: boolean;
}

export interface NewsAuditLog {
  id: string;
  timestamp: string;
  actor: string;
  action: 'AUTO_PUBLISH' | 'FLAG_FOR_REVIEW' | 'EDITORIAL_APPROVE' | 'EDITORIAL_REJECT' | 'PUBLISH_CORRECTION' | 'SOURCE_UPDATE';
  article_id?: string;
  details: string;
}

export interface SmartNewsCategory {
  id: string;
  slug: NewsCategorySlug;
  name: string;
  name_ml: string;
  description: string;
  description_ml: string;
  icon: string;
  color: string;
  display_order: number;
  article_count: number;
}

export interface SmartNewsArticle {
  id: string;
  title: string;
  title_ml: string;
  original_headline: string;
  summary: string;
  summary_ml: string;
  full_content_preview: string;
  category: NewsCategorySlug;
  category_name: string;
  category_name_ml: string;
  geographic_scope: GeographicScope;
  specific_locality?: string; // e.g. "Tanur Ward 14, Beach Road" or "Malappuram Civil Station"
  keywords: string[];
  image_url: string;
  image_license: string;
  image_attribution: string;
  source_id: string;
  source_name: string;
  source_url: string; // Canonical original article link
  original_published_at: string;
  collected_at: string;
  updated_at: string;
  status: ArticleStatus;
  is_breaking: boolean;
  breaking_severity?: BreakingSeverity;
  breaking_verified: boolean;
  corroboration_count: number;
  corroborated_sources: NewsArticleSource[];
  updates: NewsLiveUpdate[];
  corrections: NewsCorrection[];
  ai_processed: boolean;
  ai_model_used: string;
  ai_disclaimer: string;
  content_hash: string;
  view_count: number;
  read_time: string;
  featured?: boolean;
}
