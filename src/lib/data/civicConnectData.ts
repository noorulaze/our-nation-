import { store } from "@/lib/data/store";
import { LOCAL_GOVERNMENT_WARDS } from "@/lib/data/localGovernmentData";

export interface CivicTimelineEvent {
  id: string;
  status: string;
  title: string;
  description: string;
  date: string;
  actor: string;
  actor_role: string;
}

export interface CivicAuthorityForwarding {
  authority_id: string;
  authority_name: string;
  department: string;
  forwarded_at: string;
  reference_no: string;
  notes?: string;
}

export interface CivicAssignedTo {
  department: string;
  staff_name?: string;
  assigned_at: string;
  reference_no?: string;
  notes?: string;
}

export interface CivicResolutionEvidence {
  resolved_at: string;
  resolution_notes: string;
  resolution_images: string[];
  verified_by_moderator: boolean;
}

export interface CivicComment {
  id: string;
  author_name: string;
  author_id: string;
  content: string;
  date: string;
  is_official: boolean;
}

export type CivicStatus =
  | 'submitted'
  | 'under_review'
  | 'verified'
  | 'assigned'
  | 'in_progress'
  | 'resolved'
  | 'closed'
  | 'rejected'
  | 'forwarded'
  | 'reopened';

export interface CivicIssue {
  id: string;
  tracking_id: string;
  title: string;
  title_ml: string;
  description: string;
  category_id: string;
  subcategory: string;
  district: string;
  locality: string;
  jurisdiction_type: "municipality" | "block_panchayat" | "district";
  address_landmark: string;
  ward_number?: number;
  ward_name?: string;
  location_name?: string;
  latitude: number;
  longitude: number;
  images: string[];
  contact_preference?: 'in_app' | 'phone' | 'email' | 'none';
  status: CivicStatus;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  support_count: number;
  supported_by_user?: boolean;
  followed_by_user?: boolean;
  reporter_name: string;
  reporter_id: string;
  reporter_contact?: string;
  is_anonymous: boolean;
  created_at: string;
  updated_at: string;
  timeline: CivicTimelineEvent[];
  authority_forwarding?: CivicAuthorityForwarding;
  assigned_to?: CivicAssignedTo;
  rejection_reason?: string;
  resolution_evidence?: CivicResolutionEvidence;
  comments: CivicComment[];
  moderator_notes?: string;
}

export interface CivicCategory {
  id: string;
  slug: string;
  name: string;
  name_ml: string;
  description: string;
  icon: string;
  color: string;
  subcategories: string[];
  count: number;
}

export interface CivicAuthority {
  id: string;
  name: string;
  name_ml: string;
  department: string;
  department_ml: string;
  jurisdiction: string;
  jurisdiction_ml: string;
  verified: boolean;
  contact_placeholder: string;
  active_issues_count: number;
}

export interface CivicNotification {
  id: string;
  issue_id: string;
  issue_tracking_id: string;
  title: string;
  description: string;
  type: 'submitted' | 'verified' | 'status_update' | 'forwarded' | 'resolved' | 'comment';
  date: string;
  is_read: boolean;
}

export const CIVIC_CATEGORIES: CivicCategory[] = [
  {
    id: "cat-roads",
    slug: "roads-and-potholes",
    name: "Roads and Potholes",
    name_ml: "Roads and Potholes",
    description: "Potholes, damaged tarring, broken culverts, and dangerous road hazards.",
    icon: "Truck",
    color: "#B87A1E",
    subcategories: ["Potholes", "Damaged Tarring", "Broken Road Shoulder", "Missing Signboard or Speed Breaker"],
    count: 14,
  },
  {
    id: "cat-streetlights",
    slug: "streetlights",
    name: "Streetlights",
    name_ml: "Streetlights",
    description: "Non-functional streetlights, broken poles, and dark transit corridors.",
    icon: "Lightbulb",
    color: "#EAB308",
    subcategories: ["Faulty Streetlight", "Broken Electric Post", "Dangerous Cable Lines", "Dark Pedestrian Lane"],
    count: 16,
  },
  {
    id: "cat-waste",
    slug: "waste-management",
    name: "Waste Management",
    name_ml: "Waste Management",
    description: "Garbage accumulation, missing waste collection, and illegal dumping.",
    icon: "Trash2",
    color: "#166534",
    subcategories: ["Garbage Dumps", "Haritha Karma Sena Collection", "Drainage Dumping", "Beach Litter"],
    count: 19,
  },
  {
    id: "cat-drainage",
    slug: "drainage-and-waterlogging",
    name: "Drainage and Waterlogging",
    name_ml: "Drainage and Waterlogging",
    description: "Blocked stormwater drains, water stagnation, and flooded roads.",
    icon: "Droplets",
    color: "#0284C7",
    subcategories: ["Blocked Drain", "Waterlogging on Road", "Broken Drain Slab", "Canal Stagnation"],
    count: 11,
  },
  {
    id: "cat-water",
    slug: "drinking-water",
    name: "Drinking Water",
    name_ml: "Drinking Water",
    description: "Pipeline bursts, drinking water scarcity, low pressure, and contaminated supply.",
    icon: "Droplets",
    color: "#0369A1",
    subcategories: ["Pipeline Leakage", "Drinking Water Scarcity", "Contaminated Water", "Public Tap Repair"],
    count: 9,
  },
  {
    id: "cat-facilities",
    slug: "public-facilities",
    name: "Public Facilities",
    name_ml: "Public Facilities",
    description: "Bus shelters, public toilets, parks, footbridges, and civic building access.",
    icon: "Building2",
    color: "#7C3AED",
    subcategories: ["Bus Shelter", "Public Toilets", "Public Park Maintenance", "Government Building Access"],
    count: 7,
  },
  {
    id: "cat-health",
    slug: "public-health-and-sanitation",
    name: "Public Health and Sanitation",
    name_ml: "Public Health and Sanitation",
    description: "Stray animal menace, mosquito breeding spots, food hygiene risks, and hazardous animal carcasses.",
    icon: "ShieldAlert",
    color: "#DC2626",
    subcategories: ["Stray Animals", "Mosquito Breeding Sites", "Sanitation Hazard", "Dead Animal Removal"],
    count: 12,
  },
  {
    id: "cat-other",
    slug: "other-civic-issues",
    name: "Other Civic Issues",
    name_ml: "Other Civic Issues",
    description: "General civic grievances, administrative delays, and issues requiring municipal attention.",
    icon: "HelpCircle",
    color: "#4B5563",
    subcategories: ["General Civic Grievance", "Municipal Scheme Access", "Public Encroachment", "Miscellaneous"],
    count: 5,
  },
];

// Helper to get category with alias support
export function getCategoryById(id: string): CivicCategory | undefined {
  if (id === "cat-lighting") return CIVIC_CATEGORIES.find(c => c.id === "cat-streetlights");
  if (id === "cat-safety") return CIVIC_CATEGORIES.find(c => c.id === "cat-health");
  if (id === "cat-environment") return CIVIC_CATEGORIES.find(c => c.id === "cat-waste");
  return CIVIC_CATEGORIES.find(c => c.id === id);
}

// Helper to get Tanur Municipal Ward Name
export function getTanurWardName(wardNumber: number): string {
  const ward = LOCAL_GOVERNMENT_WARDS.find(
    w => w.local_body_id === "lgb-tanur-municipality" && w.ward_number === wardNumber
  );
  return ward ? ward.ward_name : `Ward ${wardNumber}`;
}

export const CIVIC_AUTHORITIES: CivicAuthority[] = [
  {
    id: "auth-tanur-municipality",
    name: "Tanur Municipality Office",
    name_ml: "Tanur Municipality Office",
    department: "Municipal Administration & Engineering Wing",
    department_ml: "Municipal Administration & Engineering Wing",
    jurisdiction: "Tanur Municipality (45 Wards)",
    jurisdiction_ml: "Tanur Municipality (45 Wards)",
    verified: true,
    contact_placeholder: "0494 2440228 • secretary.tanur@kerala.gov.in",
    active_issues_count: 18,
  },
  {
    id: "auth-health-tanur",
    name: "Tanur Municipal Health Wing",
    name_ml: "Tanur Municipal Health Wing",
    department: "Public Health & Sanitation Wing",
    department_ml: "Public Health & Sanitation Wing",
    jurisdiction: "Tanur Municipality",
    jurisdiction_ml: "Tanur Municipality",
    verified: true,
    contact_placeholder: "0494 2440228 • health.tanur@kerala.gov.in",
    active_issues_count: 14,
  },
  {
    id: "auth-kseb-tanur",
    name: "KSEB Electrical Section, Tanur",
    name_ml: "KSEB Electrical Section, Tanur",
    department: "Kerala State Electricity Board",
    department_ml: "Kerala State Electricity Board",
    jurisdiction: "Tanur Town, Rayirimangalam, Kettungal",
    jurisdiction_ml: "Tanur Town, Rayirimangalam, Kettungal",
    verified: true,
    contact_placeholder: "0494 2440230 • 1912 (Helpline)",
    active_issues_count: 11,
  },
  {
    id: "auth-kwa-tanur",
    name: "Kerala Water Authority (KWA), Tanur",
    name_ml: "Kerala Water Authority (KWA), Tanur",
    department: "Public Health Engineering Department",
    department_ml: "Public Health Engineering Department",
    jurisdiction: "Tanur Municipal Supply Zone",
    jurisdiction_ml: "Tanur Municipal Supply Zone",
    verified: true,
    contact_placeholder: "0494 2422250 • kwa.tanur@kerala.gov.in",
    active_issues_count: 7,
  },
  {
    id: "auth-police-tanur",
    name: "Tanur Police Station",
    name_ml: "Tanur Police Station",
    department: "Kerala Police, Malappuram District",
    department_ml: "Kerala Police, Malappuram District",
    jurisdiction: "Tanur Police Station Limits",
    jurisdiction_ml: "Tanur Police Station Limits",
    verified: true,
    contact_placeholder: "0494 2440233 • 112 (Emergency)",
    active_issues_count: 6,
  },
];

export const INITIAL_CIVIC_ISSUES: CivicIssue[] = [
  {
    id: "civic-tnr-001",
    tracking_id: "CC-TNR-2026-0104",
    title: "Large potholes causing waterlogging near Tanur Railway Station road",
    title_ml: "Large potholes causing waterlogging near Tanur Railway Station road",
    description: "Several deep potholes have formed on the main road leading to Tanur Railway Station. During rains, stagnant water causes serious skidding risks for two-wheelers and pedestrians.",
    category_id: "cat-roads",
    subcategory: "Potholes",
    district: "Malappuram",
    locality: "Tanur Municipality",
    jurisdiction_type: "municipality",
    address_landmark: "Near Tanur Railway Station Western Entry, Ward 12",
    ward_number: 12,
    ward_name: "Panangattoor",
    latitude: 10.9753,
    longitude: 75.8672,
    images: [
      "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1584463699026-53818e9d5696?w=800&auto=format&fit=crop&q=80"
    ],
    contact_preference: "in_app",
    status: "in_progress",
    priority: "high",
    support_count: 38,
    supported_by_user: true,
    followed_by_user: true,
    reporter_name: "Muhammed Shafi P.",
    reporter_id: "usr-shafi-tanur",
    is_anonymous: false,
    created_at: "2026-11-12T09:15:00Z",
    updated_at: "2026-11-16T14:30:00Z",
    assigned_to: {
      department: "Municipal Engineering Wing",
      staff_name: "Assistant Engineer (Roads)",
      assigned_at: "2026-11-14T11:20:00Z",
      reference_no: "TNR-PW-2026-9812",
      notes: "Priority road maintenance fund allocated for Railway Station connector corridor."
    },
    authority_forwarding: {
      authority_id: "auth-tanur-municipality",
      authority_name: "Tanur Municipality Office",
      department: "Municipal Engineering Wing",
      forwarded_at: "2026-11-14T11:20:00Z",
      reference_no: "TNR-PW-2026-9812",
      notes: "Priority road maintenance fund allocated for Railway Station connector corridor."
    },
    timeline: [
      {
        id: "tl-1",
        status: "submitted",
        title: "Report Submitted",
        description: "Resident Muhammed Shafi submitted civic complaint with photographic evidence.",
        date: "2026-11-12T09:15:00Z",
        actor: "Muhammed Shafi",
        actor_role: "Resident"
      },
      {
        id: "tl-2",
        status: "under_review",
        title: "Under Official Review",
        description: "Community moderation team reviewed report coordinates and confirmed public road jurisdiction.",
        date: "2026-11-12T14:00:00Z",
        actor: "Civic Moderator",
        actor_role: "Municipal Moderator"
      },
      {
        id: "tl-3",
        status: "verified",
        title: "Verified by Moderator",
        description: "Site inspected and verified as high traffic accident hazard.",
        date: "2026-11-13T10:40:00Z",
        actor: "Civic Moderator (Tanur)",
        actor_role: "Municipal Moderator"
      },
      {
        id: "tl-4",
        status: "assigned",
        title: "Assigned to Municipal Wing",
        description: "Officially assigned to Tanur Municipality Roads & Public Works Engineering Wing.",
        date: "2026-11-14T11:20:00Z",
        actor: "Civic Desk",
        actor_role: "Municipal Administrator"
      },
      {
        id: "tl-5",
        status: "in_progress",
        title: "Field Work in Progress",
        description: "Contractor mobilized crushed stone and asphalt patching equipment on site.",
        date: "2026-11-16T14:30:00Z",
        actor: "Assistant Engineer (Roads)",
        actor_role: "Municipal Authority"
      }
    ],
    comments: [
      {
        id: "c-1",
        author_name: "Abdul Azeez K.",
        author_id: "usr-azeez",
        content: "Very dangerous spot especially after dark when getting off late evening trains. Glad work has started.",
        date: "2026-11-13T15:20:00Z",
        is_official: false
      },
      {
        id: "c-2",
        author_name: "Tanur Municipal Information Desk",
        author_id: "auth-tanur-officer",
        content: "Temporary pothole filling is underway. Full asphalt resurfacing scheduled next week.",
        date: "2026-11-16T15:00:00Z",
        is_official: true
      }
    ],
    moderator_notes: "Multiple resident reports received for the same station link road. Verified high traffic risk."
  },
  {
    id: "civic-tnr-002",
    tracking_id: "CC-TNR-2026-0098",
    title: "Illegal plastic and municipal waste dumping near Tanur Beach walkway",
    title_ml: "Illegal plastic and municipal waste dumping near Tanur Beach walkway",
    description: "Commercial and plastic waste has accumulated at the northern end of the Tanur Beach walkway. Unattended waste is causing severe odor and coastal environmental risk.",
    category_id: "cat-waste",
    subcategory: "Garbage Dumps",
    district: "Malappuram",
    locality: "Tanur Municipality",
    jurisdiction_type: "municipality",
    address_landmark: "Tanur Beach Promenade North End, Ward 3",
    ward_number: 3,
    ward_name: "Olappeedika",
    latitude: 10.9685,
    longitude: 75.8545,
    images: [
      "https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop&q=80"
    ],
    contact_preference: "phone",
    status: "verified",
    priority: "urgent",
    support_count: 52,
    supported_by_user: true,
    followed_by_user: false,
    reporter_name: "Sujith K.",
    reporter_id: "usr-sujith-tanur",
    is_anonymous: false,
    created_at: "2026-11-14T17:30:00Z",
    updated_at: "2026-11-15T11:00:00Z",
    timeline: [
      {
        id: "tl-201",
        status: "submitted",
        title: "Report Submitted",
        description: "Resident submitted photo evidence of commercial waste dumping.",
        date: "2026-11-14T17:30:00Z",
        actor: "Sujith K.",
        actor_role: "Resident"
      },
      {
        id: "tl-202",
        status: "under_review",
        title: "Under Official Review",
        description: "Complaint prioritized due to coastal environment protection regulations.",
        date: "2026-11-14T20:00:00Z",
        actor: "Civic Moderator",
        actor_role: "Municipal Moderator"
      },
      {
        id: "tl-203",
        status: "verified",
        title: "Verified by Moderator",
        description: "Verified on site by Municipal Health Inspector. Recommended for immediate sanitation clearance.",
        date: "2026-11-15T11:00:00Z",
        actor: "Civic Lead Moderator",
        actor_role: "Community Moderator"
      }
    ],
    comments: [],
    moderator_notes: "Forwarding request pending with Health Wing. Immediate sanitation clearance requested."
  },
  {
    id: "civic-tnr-003",
    tracking_id: "CC-TNR-2026-0082",
    title: "Drinking water pipeline burst near Rayirimangalam UP School junction",
    title_ml: "Drinking water pipeline burst near Rayirimangalam UP School junction",
    description: "Drinking water pipeline burst on the main road, leaking clean water onto the roadway. Road surface was getting degraded and school access compromised.",
    category_id: "cat-water",
    subcategory: "Pipeline Leakage",
    district: "Malappuram",
    locality: "Tanur Municipality",
    jurisdiction_type: "municipality",
    address_landmark: "Rayirimangalam UP School Junction, Ward 15",
    ward_number: 15,
    ward_name: "Rayirimangalam West",
    latitude: 10.9821,
    longitude: 75.8754,
    images: [
      "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=800&auto=format&fit=crop&q=80"
    ],
    contact_preference: "in_app",
    status: "resolved",
    priority: "urgent",
    support_count: 44,
    supported_by_user: false,
    followed_by_user: true,
    reporter_name: "Fathima Beegum",
    reporter_id: "usr-fathima",
    is_anonymous: false,
    created_at: "2026-11-08T08:00:00Z",
    updated_at: "2026-11-10T16:00:00Z",
    assigned_to: {
      department: "Kerala Water Authority (KWA Tanur)",
      staff_name: "Section Maintenance Engineer",
      assigned_at: "2026-11-08T11:00:00Z",
      reference_no: "KWA-TNR-LK-2026-440",
      notes: "Main 110mm PVC line repaired with cast iron collar."
    },
    authority_forwarding: {
      authority_id: "auth-kwa-tanur",
      authority_name: "Kerala Water Authority (KWA Tanur)",
      department: "Distribution Maintenance",
      forwarded_at: "2026-11-08T11:00:00Z",
      reference_no: "KWA-TNR-LK-2026-440",
      notes: "Main 110mm PVC line repaired with cast iron collar."
    },
    resolution_evidence: {
      resolved_at: "2026-11-10T16:00:00Z",
      resolution_notes: "Water pipeline leakage permanently repaired by KWA crew. Clean drinking water supply restored to all households in Ward 15.",
      resolution_images: [
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80"
      ],
      verified_by_moderator: true
    },
    timeline: [
      {
        id: "tl-301",
        status: "submitted",
        title: "Report Submitted",
        description: "Reported pipeline burst near school junction.",
        date: "2026-11-08T08:00:00Z",
        actor: "Fathima Beegum",
        actor_role: "Resident"
      },
      {
        id: "tl-302",
        status: "verified",
        title: "Verified by Moderator",
        description: "Verified urgent drinking water pipeline leakage.",
        date: "2026-11-08T09:30:00Z",
        actor: "Moderator",
        actor_role: "Community Moderator"
      },
      {
        id: "tl-303",
        status: "assigned",
        title: "Assigned to Water Authority",
        description: "Assigned to KWA Tanur Section Engineer.",
        date: "2026-11-08T11:00:00Z",
        actor: "Civic Desk",
        actor_role: "Authority Liaison"
      },
      {
        id: "tl-304",
        status: "in_progress",
        title: "Field Work in Progress",
        description: "Plumbing team excavated damaged section and replaced ruptured joint.",
        date: "2026-11-09T10:00:00Z",
        actor: "KWA Maintenance Team",
        actor_role: "Authority"
      },
      {
        id: "tl-305",
        status: "resolved",
        title: "Issue Resolved",
        description: "Pipeline repair completed, water pressure tested, road backfilled.",
        date: "2026-11-10T16:00:00Z",
        actor: "KWA Section Engineer & Municipal Inspector",
        actor_role: "Authority"
      }
    ],
    comments: [
      {
        id: "c-301",
        author_name: "Fathima Beegum",
        author_id: "usr-fathima",
        content: "Thank you to the Water Authority crew and Tanur Municipality for quick action!",
        date: "2026-11-10T17:15:00Z",
        is_official: false
      }
    ]
  },
  {
    id: "civic-tnr-004",
    tracking_id: "CC-TNR-2026-0112",
    title: "12 non-functional streetlights on Kettungal Coastal Road",
    title_ml: "12 non-functional streetlights on Kettungal Coastal Road",
    description: "A stretch of 12 consecutive LED streetlights on the coastal road has been unlit for over a week, making night commuting difficult for fish workers and pedestrians.",
    category_id: "cat-streetlights",
    subcategory: "Faulty Streetlight",
    district: "Malappuram",
    locality: "Tanur Municipality",
    jurisdiction_type: "municipality",
    address_landmark: "Kettungal Fishery Road to Harbour, Ward 7",
    ward_number: 7,
    ward_name: "Moria",
    latitude: 10.9612,
    longitude: 75.8511,
    images: [
      "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=800&auto=format&fit=crop&q=80"
    ],
    contact_preference: "phone",
    status: "assigned",
    priority: "medium",
    support_count: 29,
    supported_by_user: false,
    followed_by_user: false,
    reporter_name: "Kader Kutty",
    reporter_id: "usr-kader",
    is_anonymous: false,
    created_at: "2026-11-15T18:40:00Z",
    updated_at: "2026-11-16T10:15:00Z",
    assigned_to: {
      department: "KSEB Electrical Section, Tanur",
      staff_name: "Assistant Engineer (Electrical)",
      assigned_at: "2026-11-16T10:15:00Z",
      reference_no: "KSEB-TNR-LT-2026-302",
      notes: "Transformer fuse replacement scheduled for coastal line."
    },
    authority_forwarding: {
      authority_id: "auth-kseb-tanur",
      authority_name: "KSEB Electrical Section, Tanur",
      department: "Distribution Operations",
      forwarded_at: "2026-11-16T10:15:00Z",
      reference_no: "KSEB-TNR-LT-2026-302",
      notes: "Transformer fuse replacement scheduled for coastal line."
    },
    timeline: [
      {
        id: "tl-401",
        status: "submitted",
        title: "Report Submitted",
        description: "Resident reported faulty streetlights along coastal road.",
        date: "2026-11-15T18:40:00Z",
        actor: "Kader Kutty",
        actor_role: "Resident"
      },
      {
        id: "tl-402",
        status: "verified",
        title: "Verified by Moderator",
        description: "Confirmed circuit outage with Ward 7 councillor office.",
        date: "2026-11-16T09:00:00Z",
        actor: "Civic Moderator",
        actor_role: "Community Moderator"
      },
      {
        id: "tl-403",
        status: "assigned",
        title: "Assigned to Electrical Wing",
        description: "Assigned to KSEB Electrical Section Tanur for line inspection.",
        date: "2026-11-16T10:15:00Z",
        actor: "Civic Desk",
        actor_role: "Authority Liaison"
      }
    ],
    comments: []
  },
  {
    id: "civic-tnr-005",
    tracking_id: "CC-TNR-2026-0120",
    title: "Stray dog pack gathering near Meenadathur LP School gate",
    title_ml: "Stray dog pack gathering near Meenadathur LP School gate",
    description: "A pack of 8-10 aggressive stray dogs gathers around the primary school gate during morning arrival and afternoon dismissal hours, posing safety risks to young children.",
    category_id: "cat-health",
    subcategory: "Stray Animals",
    district: "Malappuram",
    locality: "Tanur Municipality",
    jurisdiction_type: "municipality",
    address_landmark: "Meenadathur School Gate, Ward 22",
    ward_number: 22,
    ward_name: "Nadakkavu",
    latitude: 10.9782,
    longitude: 75.8611,
    images: [],
    contact_preference: "in_app",
    status: "submitted",
    priority: "high",
    support_count: 41,
    supported_by_user: true,
    followed_by_user: true,
    reporter_name: "Noufina V. P.",
    reporter_id: "usr-noufina",
    is_anonymous: false,
    created_at: "2026-11-17T07:45:00Z",
    updated_at: "2026-11-17T07:45:00Z",
    timeline: [
      {
        id: "tl-501",
        status: "submitted",
        title: "Report Submitted",
        description: "Resident reported animal safety concern near primary school entrance.",
        date: "2026-11-17T07:45:00Z",
        actor: "Noufina V. P.",
        actor_role: "Resident"
      }
    ],
    comments: [
      {
        id: "c-501",
        author_name: "Rashid Ali",
        author_id: "usr-rashid",
        content: "Urgent intervention needed by the Municipal Veterinary team.",
        date: "2026-11-17T09:10:00Z",
        is_official: false
      }
    ]
  },
  {
    id: "civic-tnr-006",
    tracking_id: "CC-TNR-2026-0065",
    title: "Broken roof tiles on public waiting shed near Tanur Police Station",
    title_ml: "Broken roof tiles on public waiting shed near Tanur Police Station",
    description: "Asbestos and tile roofing on the passenger shelter opposite the police station has fractured and needs structural maintenance before monsoon winds cause falling debris.",
    category_id: "cat-facilities",
    subcategory: "Bus Shelter",
    district: "Malappuram",
    locality: "Tanur Municipality",
    jurisdiction_type: "municipality",
    address_landmark: "Opposite Police Station, Main Road Tanur, Ward 23",
    ward_number: 23,
    ward_name: "Tanur",
    latitude: 10.9741,
    longitude: 75.8643,
    images: [
      "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=800&auto=format&fit=crop&q=80"
    ],
    contact_preference: "none",
    status: "under_review",
    priority: "medium",
    support_count: 17,
    supported_by_user: false,
    followed_by_user: false,
    reporter_name: "Anonymous Resident",
    reporter_id: "usr-anon",
    is_anonymous: true,
    created_at: "2026-11-16T12:00:00Z",
    updated_at: "2026-11-16T14:00:00Z",
    timeline: [
      {
        id: "tl-601",
        status: "submitted",
        title: "Report Submitted",
        description: "Passenger safety report submitted anonymously.",
        date: "2026-11-16T12:00:00Z",
        actor: "Resident",
        actor_role: "Resident"
      },
      {
        id: "tl-602",
        status: "under_review",
        title: "Under Official Review",
        description: "Municipal public works team reviewing shelter maintenance contract.",
        date: "2026-11-16T14:00:00Z",
        actor: "Civic Moderator",
        actor_role: "Municipal Moderator"
      }
    ],
    comments: []
  },
  {
    id: "civic-tnr-007",
    tracking_id: "CC-TNR-2026-0041",
    title: "Blocked storm drainage culvert causing water backflow near Kattilangadi market",
    title_ml: "Blocked storm drainage culvert causing water backflow near Kattilangadi market",
    description: "Concrete culvert behind Kattilangadi vegetable market was blocked by silt and debris, causing stagnant water after unseasonal rainfall. Municipal sanitation workers cleared the blockage and restored drainage flow.",
    category_id: "cat-drainage",
    subcategory: "Blocked Drain",
    district: "Malappuram",
    locality: "Tanur Municipality",
    jurisdiction_type: "municipality",
    address_landmark: "Behind Kattilangadi Market, Ward 19",
    ward_number: 19,
    ward_name: "Kattilangadi",
    latitude: 10.9765,
    longitude: 75.8690,
    images: [
      "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=800&auto=format&fit=crop&q=80"
    ],
    contact_preference: "in_app",
    status: "closed",
    priority: "medium",
    support_count: 22,
    supported_by_user: false,
    followed_by_user: false,
    reporter_name: "Usman Koya",
    reporter_id: "usr-usman",
    is_anonymous: false,
    created_at: "2026-11-04T10:00:00Z",
    updated_at: "2026-11-06T15:30:00Z",
    assigned_to: {
      department: "Municipal Sanitation & Drainage Wing",
      staff_name: "Health Inspector Desk",
      assigned_at: "2026-11-04T14:00:00Z",
      reference_no: "TNR-DR-2026-105"
    },
    resolution_evidence: {
      resolved_at: "2026-11-06T12:00:00Z",
      resolution_notes: "Culvert de-silted and heavy concrete slab repositioned. Water runoff verified.",
      resolution_images: [
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80"
      ],
      verified_by_moderator: true
    },
    timeline: [
      {
        id: "tl-701",
        status: "submitted",
        title: "Report Submitted",
        description: "Resident reported blocked storm drainage culvert.",
        date: "2026-11-04T10:00:00Z",
        actor: "Usman Koya",
        actor_role: "Resident"
      },
      {
        id: "tl-702",
        status: "resolved",
        title: "Issue Resolved",
        description: "Drainage cleared and flushed by sanitation crew.",
        date: "2026-11-06T12:00:00Z",
        actor: "Health Inspector Desk",
        actor_role: "Municipal Authority"
      },
      {
        id: "tl-703",
        status: "closed",
        title: "Complaint Closed & Confirmed",
        description: "Citizen confirmed waterflow restored; case closed.",
        date: "2026-11-06T15:30:00Z",
        actor: "Civic Moderator",
        actor_role: "Municipal Moderator"
      }
    ],
    comments: []
  },
  {
    id: "civic-tnr-008",
    tracking_id: "CC-TNR-2026-0022",
    title: "Complaint regarding boundary tree on private compound wall",
    title_ml: "Complaint regarding boundary tree on private compound wall",
    description: "Requesting municipality to cut branches of a coconut tree situated entirely inside private compound.",
    category_id: "cat-other",
    subcategory: "General Civic Grievance",
    district: "Malappuram",
    locality: "Tanur Municipality",
    jurisdiction_type: "municipality",
    address_landmark: "Private lane off Cherumukku Road, Ward 11",
    ward_number: 11,
    ward_name: "Panangattoor Central",
    latitude: 10.9730,
    longitude: 75.8630,
    images: [],
    contact_preference: "in_app",
    status: "rejected",
    priority: "low",
    rejection_reason: "Private property boundary dispute outside municipal public hazard jurisdiction. Civil or RDO grievance protocol applies.",
    support_count: 3,
    supported_by_user: false,
    followed_by_user: false,
    reporter_name: "Gireesh M.",
    reporter_id: "usr-gireesh",
    is_anonymous: false,
    created_at: "2026-11-02T11:00:00Z",
    updated_at: "2026-11-03T09:30:00Z",
    timeline: [
      {
        id: "tl-801",
        status: "submitted",
        title: "Report Submitted",
        description: "Resident filed private compound boundary dispute.",
        date: "2026-11-02T11:00:00Z",
        actor: "Gireesh M.",
        actor_role: "Resident"
      },
      {
        id: "tl-802",
        status: "rejected",
        title: "Complaint Rejected",
        description: "Rejected with statutory reason: Private property boundary dispute outside municipal public hazard jurisdiction.",
        date: "2026-11-03T09:30:00Z",
        actor: "Municipal Secretary Desk",
        actor_role: "Municipal Administrator"
      }
    ],
    comments: []
  }
];

export const INITIAL_CIVIC_NOTIFICATIONS: CivicNotification[] = [
  {
    id: "cnotif-1",
    issue_id: "civic-tnr-001",
    issue_tracking_id: "CC-TNR-2026-0104",
    title: "Field Work in Progress",
    description: "Repairs have commenced on Tanur Railway Station road potholes.",
    type: "status_update",
    date: "2026-11-16T14:30:00Z",
    is_read: false
  },
  {
    id: "cnotif-2",
    issue_id: "civic-tnr-003",
    issue_tracking_id: "CC-TNR-2026-0082",
    title: "Issue Resolved",
    description: "Drinking water pipeline leak in Rayirimangalam was repaired by KWA.",
    type: "resolved",
    date: "2026-11-10T16:00:00Z",
    is_read: true
  },
  {
    id: "cnotif-3",
    issue_id: "civic-tnr-001",
    issue_tracking_id: "CC-TNR-2026-0104",
    title: "Assigned to Municipal Wing",
    description: "Complaint assigned to Tanur Municipal Engineering Wing.",
    type: "forwarded",
    date: "2026-11-14T11:20:00Z",
    is_read: true
  },
  {
    id: "cnotif-4",
    issue_id: "civic-tnr-005",
    issue_tracking_id: "CC-TNR-2026-0120",
    title: "Report Submitted",
    description: "Report received regarding Meenadathur School safety concern. Reference ID: CC-TNR-2026-0120.",
    type: "submitted",
    date: "2026-11-17T07:45:00Z",
    is_read: false
  }
];

// Helper Singleton Store for Civic Connect
class CivicDataStore {
  private issues: CivicIssue[] = [...INITIAL_CIVIC_ISSUES];
  private notifications: CivicNotification[] = [...INITIAL_CIVIC_NOTIFICATIONS];

  getIssues(): CivicIssue[] {
    return this.issues;
  }

  getIssueById(id: string): CivicIssue | undefined {
    return this.issues.find(
      i => i.id === id || i.tracking_id.toLowerCase() === id.toLowerCase()
    );
  }

  createIssue(data: Omit<CivicIssue, "id" | "tracking_id" | "support_count" | "timeline" | "comments" | "created_at" | "updated_at">): CivicIssue {
    const id = "civic-tnr-" + (this.issues.length + 1).toString().padStart(3, "0");
    const tracking_id = `CC-TNR-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date().toISOString();

    const resolvedWardName = data.ward_number ? (data.ward_name || getTanurWardName(data.ward_number)) : undefined;

    const newIssue: CivicIssue = {
      ...data,
      id,
      tracking_id,
      title_ml: data.title_ml || data.title,
      ward_name: resolvedWardName,
      support_count: 1,
      supported_by_user: true,
      followed_by_user: true,
      created_at: now,
      updated_at: now,
      timeline: [
        {
          id: "tl-" + Date.now(),
          status: "submitted",
          title: "Report Submitted",
          description: "Citizen submitted civic report into OUR NATION Civic Connect system.",
          date: now,
          actor: data.is_anonymous ? "Anonymous Resident" : (data.reporter_name || "Resident"),
          actor_role: "Citizen Reporter"
        }
      ],
      comments: []
    };

    this.issues.unshift(newIssue);

    // In-app civic notification
    this.notifications.unshift({
      id: "cnotif-" + Date.now(),
      issue_id: newIssue.id,
      issue_tracking_id: newIssue.tracking_id,
      title: "Civic Report Submitted",
      description: `Your report "${newIssue.title}" was submitted. Reference ID: ${newIssue.tracking_id}.`,
      type: "submitted",
      date: now,
      is_read: false
    });

    // Sync to user notification store if reporter_id exists
    if (data.reporter_id) {
      try {
        store.addNotification({
          user_id: data.reporter_id,
          title: "Civic Report Submitted",
          title_ml: "Civic Report Submitted",
          message: `Your report "${newIssue.title}" was submitted. Reference ID: ${newIssue.tracking_id}.`,
          message_ml: `Your report "${newIssue.title}" was submitted. Reference ID: ${newIssue.tracking_id}.`,
          type: "civic_issue_status",
          link: `/civic/issues/${newIssue.id}`,
        });
      } catch {
        // Safe fallback
      }
    }

    return newIssue;
  }

  submitIssue(data: {
    title: string;
    title_ml?: string;
    description: string;
    category_id: string;
    subcategory: string;
    district?: string;
    locality?: string;
    jurisdiction_type?: "municipality" | "block_panchayat" | "district";
    address_landmark: string;
    ward_number?: number;
    ward_name?: string;
    latitude?: number;
    longitude?: number;
    images?: string[];
    contact_preference?: 'in_app' | 'phone' | 'email' | 'none';
    priority?: 'low' | 'medium' | 'high' | 'urgent';
    reporter_name?: string;
    reporter_id?: string;
    reporter_contact?: string;
    is_anonymous?: boolean;
  }): CivicIssue {
    return this.createIssue({
      title: data.title,
      title_ml: data.title_ml || data.title,
      description: data.description,
      category_id: data.category_id,
      subcategory: data.subcategory,
      district: data.district || "Malappuram",
      locality: data.locality || "Tanur Municipality",
      jurisdiction_type: data.jurisdiction_type || "municipality",
      address_landmark: data.address_landmark,
      ward_number: data.ward_number,
      ward_name: data.ward_name || (data.ward_number ? getTanurWardName(data.ward_number) : undefined),
      latitude: data.latitude || 10.9753,
      longitude: data.longitude || 75.8672,
      images: data.images || [],
      contact_preference: data.contact_preference || "in_app",
      status: "submitted",
      priority: data.priority || "medium",
      reporter_name: data.is_anonymous ? "Anonymous Resident" : (data.reporter_name || "Resident"),
      reporter_id: data.reporter_id || "usr-anon",
      reporter_contact: data.reporter_contact,
      is_anonymous: data.is_anonymous || false,
    });
  }

  toggleSupport(issueId: string): boolean {
    const issue = this.issues.find(i => i.id === issueId);
    if (!issue) return false;
    if (issue.supported_by_user) {
      issue.support_count = Math.max(0, issue.support_count - 1);
      issue.supported_by_user = false;
      return false;
    } else {
      issue.support_count += 1;
      issue.supported_by_user = true;
      return true;
    }
  }

  toggleFollow(issueId: string): boolean {
    const issue = this.issues.find(i => i.id === issueId);
    if (!issue) return false;
    issue.followed_by_user = !issue.followed_by_user;
    return issue.followed_by_user;
  }

  addComment(issueId: string, authorName: string, authorId: string, content: string, isOfficial = false): CivicComment | null {
    const issue = this.issues.find(i => i.id === issueId);
    if (!issue) return null;
    const comment: CivicComment = {
      id: "comm-" + Date.now(),
      author_name: authorName,
      author_id: authorId,
      content,
      date: new Date().toISOString(),
      is_official: isOfficial
    };
    issue.comments.push(comment);
    return comment;
  }

  updateIssueStatus(
    issueId: string,
    newStatus: CivicStatus,
    actorName: string,
    notes?: string,
    authorityForwarding?: CivicAuthorityForwarding,
    resolutionEvidence?: CivicResolutionEvidence,
    assignedTo?: CivicAssignedTo,
    rejectionReason?: string
  ): boolean {
    const issue = this.issues.find(i => i.id === issueId);
    if (!issue) return false;
    const now = new Date().toISOString();
    issue.status = newStatus;
    issue.updated_at = now;

    if (authorityForwarding) {
      issue.authority_forwarding = authorityForwarding;
    }
    if (assignedTo) {
      issue.assigned_to = assignedTo;
    }
    if (rejectionReason) {
      issue.rejection_reason = rejectionReason;
    }
    if (resolutionEvidence) {
      issue.resolution_evidence = resolutionEvidence;
    }
    if (notes) {
      issue.moderator_notes = notes;
    }

    const statusTitles: Record<string, string> = {
      submitted: "Report Submitted",
      under_review: "Under Official Review",
      verified: "Verified by Moderator",
      assigned: "Assigned to Municipal Wing",
      forwarded: "Assigned to Municipal Wing",
      in_progress: "Field Work in Progress",
      resolved: "Issue Resolved",
      closed: "Complaint Closed & Confirmed",
      rejected: "Complaint Rejected",
      reopened: "Complaint Reopened"
    };

    const statusTitle = statusTitles[newStatus] || newStatus;
    const defaultDesc = notes || (
      newStatus === "rejected" && rejectionReason 
        ? `Rejected: ${rejectionReason}` 
        : `Status transitioned to ${newStatus.replace('_', ' ')}.`
    );

    issue.timeline.push({
      id: "tl-" + Date.now(),
      status: newStatus,
      title: statusTitle,
      description: defaultDesc,
      date: now,
      actor: actorName,
      actor_role: "Municipal Authority / Moderator"
    });

    // In-app civic notification
    this.notifications.unshift({
      id: "cnotif-" + Date.now(),
      issue_id: issue.id,
      issue_tracking_id: issue.tracking_id,
      title: statusTitle,
      description: `Report "${issue.title}" (${issue.tracking_id}) status is now ${newStatus.replace('_', ' ')}.`,
      type: newStatus === "resolved" ? "resolved" : newStatus === "assigned" || newStatus === "forwarded" ? "forwarded" : "status_update",
      date: now,
      is_read: false
    });

    // Sync to user notification store if reporter_id exists
    if (issue.reporter_id && issue.reporter_id !== "usr-anon") {
      try {
        store.addNotification({
          user_id: issue.reporter_id,
          title: `Civic Report: ${statusTitle}`,
          title_ml: `Civic Report: ${statusTitle}`,
          message: `Your report (${issue.tracking_id}) status was updated to ${newStatus.replace('_', ' ')}.`,
          message_ml: `Your report (${issue.tracking_id}) status was updated to ${newStatus.replace('_', ' ')}.`,
          type: "civic_issue_status",
          link: `/civic/issues/${issue.id}`,
        });
      } catch {
        // Safe fallback
      }
    }

    return true;
  }

  getNotifications(): CivicNotification[] {
    return this.notifications;
  }

  markNotificationAsRead(id: string): boolean {
    const notif = this.notifications.find(n => n.id === id);
    if (notif) {
      notif.is_read = true;
      return true;
    }
    return false;
  }

  markAllNotificationsAsRead(): void {
    this.notifications.forEach(n => n.is_read = true);
  }

  getCivicAnalytics() {
    const total = this.issues.length;
    const submitted = this.issues.filter(i => i.status === "submitted").length;
    const underReview = this.issues.filter(i => i.status === "under_review").length;
    const pending = submitted + underReview;
    const verified = this.issues.filter(i => i.status === "verified").length;
    const assigned = this.issues.filter(i => i.status === "assigned" || i.status === "forwarded").length;
    const inProgress = this.issues.filter(i => i.status === "in_progress").length;
    const resolved = this.issues.filter(i => i.status === "resolved").length;
    const closed = this.issues.filter(i => i.status === "closed").length;
    const rejected = this.issues.filter(i => i.status === "rejected").length;

    const byCategory: Record<string, number> = {};
    CIVIC_CATEGORIES.forEach(c => {
      byCategory[c.name] = this.issues.filter(i => i.category_id === c.id || (c.id === "cat-streetlights" && i.category_id === "cat-lighting") || (c.id === "cat-health" && i.category_id === "cat-safety")).length;
    });

    const byLocality: Record<string, number> = {
      "Tanur Municipality": this.issues.filter(i => i.locality.includes("Municipality")).length,
      "Tanur Block Panchayat": this.issues.filter(i => i.locality.includes("Block")).length,
      "Other Regions": this.issues.filter(i => !i.locality.includes("Municipality") && !i.locality.includes("Block")).length,
    };

    return {
      total,
      submitted,
      underReview,
      pending,
      verified,
      assigned,
      forwarded: assigned,
      inProgress,
      resolved,
      closed,
      rejected,
      resolutionRate: total > 0 ? Math.round(((resolved + closed) / total) * 100) : 0,
      byCategory,
      byLocality,
    };
  }
}

const globalForCivicStore = globalThis as unknown as { civicStore: CivicDataStore };
export const civicStore = globalForCivicStore.civicStore || new CivicDataStore();
if (process.env.NODE_ENV !== "production") globalForCivicStore.civicStore = civicStore;
