/**
 * Digital Municipality Data Types
 * Prepared for multi-municipality architecture (starting with Tanur Municipality)
 */

export type ProjectCategory = 
  // 9 Statutory Categories
  | 'roads_transportation'
  | 'drainage_water'
  | 'drinking_water'
  | 'waste_management'
  | 'education'
  | 'healthcare'
  | 'public_infrastructure'
  | 'parks_public_spaces'
  | 'other_development'
  // Backward compatibility keys
  | 'roads_transport'
  | 'water_drainage'
  | 'public_facilities'
  | 'environment'
  | 'streetlights'
  | 'community_infrastructure'
  | 'other'
  | 'infrastructure'
  | 'fisheries_harbour'
  | 'water_sanitation'
  | 'sports_youth'
  | 'tourism_culture'
  | 'environment_coastal'
  | 'facilities';

export type ProjectStatus = 
  // 8 Statutory Statuses
  | 'Proposed' 
  | 'Approved' 
  | 'Planned' 
  | 'In Progress' 
  | 'Delayed' 
  | 'Completed' 
  | 'On Hold' 
  | 'Cancelled'
  // Backward compatibility status
  | 'Announced';

export type InformationSourceType = 
  | 'official_published' 
  | 'admin_entered' 
  | 'community_submitted';

export type MilestoneType = 
  | 'announcement' 
  | 'approval' 
  | 'commencement' 
  | 'progress' 
  | 'inspection' 
  | 'completion';

export interface DevelopmentProgressUpdate {
  id: string;
  project_id: string;
  date: string;
  title: string;
  title_ml?: string;
  note: string;
  note_ml?: string;
  official_remarks?: string;
  status_transition?: ProjectStatus;
  milestone_percentage?: number;
  update_type?: MilestoneType;
  evidence_url?: string;
  source_name?: string;
  source_url?: string;
  photographs?: string[];
  verified_by: string;
  created_at: string;
}

export interface ProjectSourceDocument {
  id: string;
  title: string;
  title_ml?: string;
  url: string;
  document_type: 'gazette' | 'order' | 'tender' | 'press_release' | 'inspection_report' | 'other';
  published_date: string;
  publisher: string;
}

export interface DevelopmentProject {
  id: string;
  municipality_id: string;
  municipality_name: string;
  municipality_name_ml: string;
  ward_number?: number; // 1 to 45 (Tanur Municipality 45 confirmed wards)
  ward_name?: string;
  ward_name_ml?: string;
  locality?: string;
  locality_ml?: string;
  title: string;
  title_ml: string;
  description: string;
  description_ml: string;
  category: ProjectCategory;
  category_name: string;
  category_name_ml: string;
  department: string;
  department_ml: string;
  implementing_agency?: string;
  official_source_name: string;
  official_source_url: string;
  source_type?: InformationSourceType;
  
  // Financial breakdown & transparency
  budget_sanctioned: string; // Display string, e.g. "₹42.50 Cr"
  approved_budget?: string; // e.g. "₹42.50 Cr"
  estimated_cost?: string; // e.g. "₹45.00 Cr"
  actual_expenditure?: string; // Audited expenditure or "Not published"
  funding_source?: string; // e.g. "Kerala Municipal Development Fund (KUDP) / Plan Grant"

  // Lifecycle dates
  announcement_date: string;
  approval_date?: string;
  start_date?: string;
  expected_completion_date?: string;
  actual_completion_date?: string;

  status: ProjectStatus;
  progress_percentage?: number; // Strictly when verified/supported by recorded data
  completion_percentage?: number; // Compatibility alias
  project_image: string;
  project_images?: string[];
  gallery_images?: string[];
  latitude?: number;
  longitude?: number;
  contractor_name?: string;
  is_verified: boolean;
  verification_status?: 'verified' | 'pending_verification' | 'unverified';
  verified_by?: string;
  last_verified_date: string;
  source_documents?: ProjectSourceDocument[];
  progress_updates: DevelopmentProgressUpdate[];
  is_archived?: boolean;
  created_at: string;
  updated_at: string;
}

export type ContributionType = 
  | 'suggest_project' 
  | 'submit_info' 
  | 'submit_photo' 
  | 'report_outdated' 
  | 'ask_question';

export type ContributionStatus = 'pending' | 'approved' | 'rejected';

export interface ProjectContribution {
  id: string;
  project_id?: string;
  project_title?: string;
  type: ContributionType;
  author_name: string;
  author_phone?: string;
  author_email?: string;
  title: string;
  details: string;
  evidence_url?: string;
  photo_url?: string;
  locality?: string;
  ward_number?: number;
  status: ContributionStatus;
  admin_notes?: string;
  reviewed_by?: string;
  reviewed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectAuditLog {
  id: string;
  project_id: string;
  action: 'created' | 'updated' | 'status_changed' | 'milestone_added' | 'verified' | 'archived';
  actor_name: string;
  actor_role: string;
  previous_value?: string;
  new_value?: string;
  note?: string;
  timestamp: string;
}

export type ProposalCategory = 
  | 'infrastructure'
  | 'roads_traffic'
  | 'waste_cleanliness'
  | 'youth_sports'
  | 'women_welfare'
  | 'heritage_tourism'
  | 'fisheries_coastal'
  | 'education_skills';

export type ProposalStatus = 
  | 'submitted'
  | 'community_supported'
  | 'under_municipal_review'
  | 'feasibility_study'
  | 'budget_allocated'
  | 'closed'
  | 'Under Review'
  | 'Submitted'
  | 'In Progress'
  | 'Completed';

export interface ProposalComment {
  id: string;
  proposal_id: string;
  author_id: string;
  author_name: string;
  content: string;
  is_official: boolean;
  official_designation?: string;
  created_at: string;
}

export interface CitizenProposal {
  id: string;
  tracking_id: string;
  municipality_id: string;
  author_id: string;
  author_name: string;
  author_avatar?: string;
  ward_number?: number;
  locality: string;
  locality_ml: string;
  title: string;
  title_ml: string;
  summary: string;
  summary_ml: string;
  details: string;
  details_ml: string;
  description?: string;
  expected_benefit?: string;
  category: ProposalCategory;
  category_name: string;
  category_name_ml: string;
  category_ml?: string;
  status: ProposalStatus;
  support_count: number;
  supported_by_user?: boolean;
  comments_count: number;
  comments: ProposalComment[];
  official_response?: string;
  official_response_date?: string;
  official_responder_name?: string;
  official_responder_role?: string;
  created_at: string;
  updated_at: string;
}

export interface MunicipalWard {
  id: string;
  ward_number: number;
  name: string;
  name_ml: string;
  ward_name?: string;
  ward_name_ml?: string;
  municipality_id: string;
  councillor_name: string;
  councillor_name_ml: string;
  councillor_contact?: string;
  key_localities: string[];
  key_localities_ml: string[];
  population_approx: number;
  active_issues_count: number;
  active_projects_count: number;
  latitude: number;
  longitude: number;
}

export type LocationCategoryKey = 
  | 'government'
  | 'education'
  | 'health'
  | 'facilities'
  | 'religious_cultural'
  | 'tourism'
  | 'transport'
  | 'business';

export type FacilityCategoryKey = 
  | 'health'
  | 'education'
  | 'harbour'
  | 'akshaya'
  | 'mcf'
  | 'emergency'
  | 'civic';

export interface DigitalTanurLocation {
  id: string;
  name: string;
  name_ml: string;
  category: LocationCategoryKey;
  category_name: string;
  category_name_ml: string;
  facility_category?: FacilityCategoryKey;
  ward_number?: number;
  ward_name?: string;
  ward_name_ml?: string;
  locality: string;
  locality_ml: string;
  address: string;
  address_ml?: string;
  latitude: number;
  longitude: number;
  phone?: string;
  emergency_phone?: string;
  website?: string;
  opening_hours?: string;
  opening_hours_ml?: string;
  description: string;
  description_ml: string;
  image_url: string;
  is_verified: boolean;
  is_community_submitted?: boolean;
  source_name: string;
  source_url?: string;
  last_verified_date: string;
  featured?: boolean;
}

export interface LocalityItem {
  id: string;
  name: string;
  name_ml: string;
  ward_numbers: number[];
  tagline: string;
  tagline_ml: string;
  description: string;
  description_ml: string;
  latitude: number;
  longitude: number;
  landmarks: string[];
  landmarks_ml: string[];
  nearby_facilities: string[];
  nearby_facilities_ml: string[];
  services_available: string[];
  services_available_ml: string[];
  image_url: string;
}

// -------------------------------------------------------------
// FEATURE 04: PUBLIC SERVICES DATA MODEL
// -------------------------------------------------------------
export type ServiceCategoryKey = 
  | 'cat-certificates'
  | 'cat-property-tax'
  | 'cat-building'
  | 'cat-water-sanitation'
  | 'cat-public-health'
  | 'cat-business'
  | 'cat-social-welfare'
  | 'cat-other'
  // Backward compatibility with legacy categories:
  | 'civil_registration'
  | 'permits_licensing'
  | 'taxes_revenue'
  | 'welfare_pensions'
  | 'sanitation_health'
  | 'utilities_infrastructure'
  | 'certificates_land';

export interface PublicServiceProcedureStep {
  step_number: number;
  title: string;
  title_ml?: string;
  description: string;
  description_ml?: string;
}

export interface PublicServiceDetail {
  id: string;
  slug: string;
  title: string;
  title_ml?: string;
  category: ServiceCategoryKey;
  category_name: string;
  category_name_ml?: string;
  department: string;
  department_ml?: string;
  summary: string;
  summary_ml?: string;
  eligibility: string[];
  eligibility_ml?: string[];
  required_documents: string[];
  required_documents_ml?: string[];
  procedure_steps: PublicServiceProcedureStep[];
  official_portal_url?: string;
  official_portal_name?: string;
  processing_time_days?: number;
  processing_time_text: string;
  processing_time_text_ml?: string;
  fee_structure: string;
  fee_structure_ml?: string;
  office_location: string;
  office_location_ml?: string;
  contact_phone: string;
  contact_email?: string;
  working_hours: string;
  working_hours_ml?: string;
  is_online_available: boolean;
  online_system_name?: string;
  last_verified_date: string;
  source_reference: string;
  faqs?: Array<{ question: string; question_ml?: string; answer: string; answer_ml?: string }>;
  views_count?: number;
  supports_internal_application?: boolean;
  published?: boolean;
  audit_history?: Array<{ date: string; actor: string; action: string; note?: string }>;
}

export type ServiceApplicationStatus = 
  | 'submitted'
  | 'under_review'
  | 'documents_verified'
  | 'forwarded_guidance'
  | 'completed'
  | 'rejected';

export interface PublicServiceApplication {
  id: string;
  reference_no: string; // Format: PS-TNR-2026-XXXX
  service_id: string;
  service_title: string;
  service_category: string;
  applicant_id: string;
  applicant_name: string;
  applicant_email: string;
  applicant_phone: string;
  ward_number: number; // 1 to 45
  documents: Array<{
    name: string;
    url?: string;
    status: 'uploaded' | 'verified' | 'action_required';
    note?: string;
  }>;
  notes: string;
  status: ServiceApplicationStatus;
  status_notes?: string;
  created_at: string;
  updated_at: string;
  timeline: Array<{
    date: string;
    status: ServiceApplicationStatus;
    actor: string;
    note: string;
  }>;
}

// -------------------------------------------------------------
// FEATURE 05: DOCUMENTS & NOTICES DATA MODEL
// -------------------------------------------------------------
export type DocumentCategoryKey = 
  | 'council_decisions'
  | 'public_notices'
  | 'budget_finance'
  | 'tenders_procurement'
  | 'government_orders'
  | 'citizen_forms'
  | 'development_plans';

export interface MunicipalPublicDocument {
  id: string;
  title: string;
  title_ml: string;
  category: DocumentCategoryKey;
  category_name: string;
  category_name_ml: string;
  publishing_authority: string;
  publishing_authority_ml: string;
  publication_date: string;
  year: number;
  reference_number?: string;
  file_size?: string;
  file_format?: 'PDF' | 'DOC' | 'XLS';
  download_url: string;
  description: string;
  description_ml: string;
  is_official: boolean;
  source: string;
  last_verified_date: string;
}
