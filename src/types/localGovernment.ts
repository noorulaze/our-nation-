export type LocalBodyType = "municipality" | "block_panchayat" | "grama_panchayat";
export type LocalBodyCategory = "urban" | "rural";
export type VerificationStatus = "verified" | "pending_verification" | "disputed";

export type ElectedRole = 
  | "chairperson"
  | "vice_chairperson"
  | "councillor"
  | "president"
  | "vice_president"
  | "block_member"
  | "panchayat_member"
  | "standing_committee_chairperson"
  | "standing_committee_member";

export interface LeadershipOfficer {
  title: string;
  name: string;
  name_ml?: string;
  ward_number?: number;
  party?: string;
  photo_url?: string;
  phone?: string;
  verification_status: VerificationStatus;
}

export interface LocalGovernmentBody {
  id: string;
  slug: string;
  name: string;
  name_ml: string;
  category: LocalBodyCategory;
  type: LocalBodyType;
  parent_block_id?: string;
  district: string;
  taluk: string;
  hq_address: string;
  phone: string;
  email?: string;
  official_website: string;
  total_wards: number;
  population?: number | string;
  area_sq_km?: number | string;
  description: string;
  leadership: {
    chair_or_president: LeadershipOfficer;
    vice_chair_or_vice_president: LeadershipOfficer;
    secretary?: {
      name: string;
      designation: string;
      phone?: string;
    };
  };
  source_url: string;
  last_verified: string;
  verification_status: VerificationStatus;
  administrative_note?: string;
}

export interface LocalGovernmentWard {
  id: string;
  local_body_id: string;
  ward_number: number;
  ward_name: string;
  ward_name_ml?: string;
  reservation: "General" | "Woman" | "SC" | "SC Woman" | "ST";
  representative_id?: string;
  representative_name: string;
  representative_name_ml?: string;
  party?: string;
  photo_url?: string;
  phone?: string;
  verification_status: VerificationStatus;
  source_url?: string;
}

export interface RepresentativeAudit {
  id: string;
  representative_id: string;
  timestamp: string;
  action: string;
  modified_by: string;
  note: string;
}

export interface LocalRepresentative {
  id: string;
  name: string;
  name_ml?: string;
  photo_url?: string;
  photo_source?: string;
  local_body_id: string;
  local_body_name: string;
  local_body_slug: string;
  local_body_type: LocalBodyType;
  local_body_category: LocalBodyCategory;
  ward_number: number;
  ward_name: string;
  ward_id: string;
  role: ElectedRole;
  role_title: string;
  is_head: boolean;
  is_deputy: boolean;
  standing_committees?: string[];
  party?: string;
  phone?: string;
  email?: string;
  bio?: string;
  reservation?: string;
  source_url: string;
  last_verified: string;
  verification_status: VerificationStatus;
  audit_history?: RepresentativeAudit[];
}
