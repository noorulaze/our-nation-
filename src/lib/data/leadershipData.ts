import { LeadershipProfile } from "@/types/leadershipProfile";

/**
 * Standardized Leadership & Guidance Profiles Dataset
 * Strictly distinguishes Community Leadership from Official Municipal Governance.
 */

export const INITIAL_LEADERSHIP_PROFILES: LeadershipProfile[] = [
  {
    // Special Profile: PK Nawas
    id: "profile-pk-nawas",
    slug: "pk-nawas",
    fullName: "PK Nawas",
    displayName: "PK Nawas",
    designation: "Overall Community Leader & Project Guidance",
    leadershipCategory: "community_leadership",
    organization: "OUR NATION – Tanur",
    shortIntroduction: "To be added after confirmation.",
    fullBiography: "Pending verified information.",
    mainResponsibilities: [
      "To be confirmed with the individual."
    ],
    areasOfLeadership: [
      "Community Leadership",
      "Civic Guidance",
      "Youth Engagement"
    ],
    profilePhotoUrl: "/placeholder-leader.svg",
    photoType: "pending_authorization",
    photoStatus: "pending_authorization",
    photoSource: "Pending authorized photograph.",
    associatedLocalGovernmentBody: undefined,
    committeeMembership: [],
    // Contact Information - Not authorized yet, so kept undefined
    publicContactNumber: undefined,
    isContactPubliclyAuthorized: false,
    publicEmail: undefined,
    isEmailPubliclyAuthorized: false,
    officialWebsite: undefined,
    publicOfficeAddress: undefined,
    socialMediaLinks: [],
    // Verification Metadata
    verificationStatus: "pending_admin_approval",
    informationSourceUrl: undefined,
    photographSource: "Pending authorized photograph submission.",
    consentConfirmed: false,
    consentDate: undefined,
    lastVerifiedDate: undefined,
    profileCreatedDate: "2026-11-19",
    lastUpdatedDate: "2026-11-19",
    adminNotes: "Profile created under standardized leadership structure. Pending official individual consent confirmation and admin review before full verification.",
  }
];
