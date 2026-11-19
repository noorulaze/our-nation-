/**
 * Standardized Leadership & Guidance Profile Types
 * OUR NATION — Digital Municipality Platform (Tanur, Kerala)
 */

export type LeadershipCategory = 
  | "community_leadership"
  | "project_guidance"
  | "civic_advisory"
  | "youth_leadership"
  | "expert_advisor";

export type LeadershipVerificationStatus = 
  | "verified"
  | "pending_admin_approval"
  | "draft"
  | "archived";

export type ProfilePhotoStatus = 
  | "verified_photo"
  | "awaiting_photo"
  | "pending_authorization";

export interface SocialMediaLink {
  platform: "twitter" | "facebook" | "instagram" | "linkedin" | "youtube" | "website" | "other";
  url: string;
  label?: string;
}

export interface LeadershipProfile {
  // A. Basic Information
  id: string;
  slug: string;
  fullName: string;
  displayName: string;
  profilePhotoUrl?: string;
  photoType: "official" | "placeholder" | "pending_authorization";
  photoStatus: ProfilePhotoStatus;
  photoSource?: string;
  designation: string;
  leadershipCategory: LeadershipCategory;
  shortIntroduction?: string;
  fullBiography?: string;

  // B. Role & Responsibilities
  mainResponsibilities: string[];
  areasOfLeadership: string[];
  organization: string;
  associatedLocalGovernmentBody?: string;
  committeeMembership?: string[];

  // C. Public Information (Only displayed when publicly authorized)
  publicContactNumber?: string;
  isContactPubliclyAuthorized?: boolean;
  publicEmail?: string;
  isEmailPubliclyAuthorized?: boolean;
  officialWebsite?: string;
  publicOfficeAddress?: string;
  socialMediaLinks?: SocialMediaLink[];

  // D. Verification Information
  verificationStatus: LeadershipVerificationStatus;
  informationSourceUrl?: string;
  photographSource?: string;
  consentConfirmed: boolean;
  consentDate?: string;
  lastVerifiedDate?: string;
  profileCreatedDate: string;
  lastUpdatedDate: string;
  adminNotes?: string;
}

export interface LeadershipProfileInput extends Omit<LeadershipProfile, "id" | "profileCreatedDate" | "lastUpdatedDate"> {
  id?: string;
}
