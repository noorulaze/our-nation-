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
  location_name?: string;
  latitude: number;
  longitude: number;
  images: string[];
  status: 'submitted' | 'under_review' | 'verified' | 'forwarded' | 'in_progress' | 'resolved' | 'rejected' | 'reopened';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  support_count: number;
  supported_by_user?: boolean;
  followed_by_user?: boolean;
  reporter_name: string;
  reporter_id: string;
  is_anonymous: boolean;
  created_at: string;
  updated_at: string;
  timeline: CivicTimelineEvent[];
  authority_forwarding?: CivicAuthorityForwarding;
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
    slug: "roads-transport",
    name: "Roads & Transport",
    name_ml: "റോഡുകളും ഗതാഗതവും",
    description: "കുഴികൾ, റോഡ് തകർച്ച, ഫുട്പാത്ത്, സ്പീഡ് ബ്രേക്കർ പ്രശ്നങ്ങൾ",
    icon: "Truck",
    color: "#B87A1E",
    subcategories: ["Potholes (കുഴികൾ)", "Damaged Tarring (റോഡ് തകർച്ച)", "Footpath Obstruction (ഫുട്പാത്ത് തടസ്സങ്ങൾ)", "Traffic Sign Board (ദിശാബോർഡുകൾ)"],
    count: 14,
  },
  {
    id: "cat-waste",
    slug: "waste-management",
    name: "Waste Management",
    name_ml: "മാലിന്യ സംസ്കരണം",
    description: "പൊതു ഇടങ്ങളിലെ മാലിന്യക്കൂമ്പാരം, അജൈവ മാലിന്യ ശേഖരണം",
    icon: "Trash2",
    color: "#166534",
    subcategories: ["Garbage Dumps (മാലിന്യക്കൂമ്പാരം)", "Haritha Karma Sena Collection (ഹരിത കർമ്മ സേന ശേഖരണം)", "Drainage Dumping (ഓടകളിലെ മാലിന്യം)", "Beach Litter (തീരദേശ മാലിന്യം)"],
    count: 19,
  },
  {
    id: "cat-water",
    slug: "water-drainage",
    name: "Water & Drainage",
    name_ml: "കുടിവെള്ളവും ഡ്രെയിനേജും",
    description: "പൈപ്പ് ലൈൻ ചോർച്ച, കുടിവെള്ള ക്ഷാമം, ഓടകളുടെ തടസ്സം",
    icon: "Droplets",
    color: "#0284C7",
    subcategories: ["Pipeline Leakage (പൈപ്പ് ലൈൻ ചോർച്ച)", "Drinking Water Scarcity (കുടിവെള്ള ക്ഷാമം)", "Blocked Drain (ഓടയിലെ നീരൊഴുക്ക് തടസ്സം)", "Water Contamination (വെള്ളത്തിന്റെ ഗുണനിലവാരം)"],
    count: 11,
  },
  {
    id: "cat-lighting",
    slug: "streetlights-electricity",
    name: "Streetlights & Electricity",
    name_ml: "തെരുവ് വിളക്കുകളും വൈദ്യുതിയും",
    description: "കത്താത്ത തെരുവ് വിളക്കുകൾ, അപകടകരമായ ഇലക്ട്രിക് ലൈനുകൾ",
    icon: "Lightbulb",
    color: "#EAB308",
    subcategories: ["Faulty Streetlight (കത്താത്ത സ്ട്രീറ്റ്‌ലൈറ്റുകൾ)", "Dangerous Cable Lines (അപകടകരമായ ലൈനുകൾ)", "Transformer Issues (ട്രാൻസ്ഫോർമർ തകരാർ)", "Broken Electric Post (തകർന്ന പോസ്റ്റുകൾ)"],
    count: 16,
  },
  {
    id: "cat-environment",
    slug: "environment",
    name: "Environment & Ecology",
    name_ml: "പരിസ്ഥിതിയും പ്രകൃതിയും",
    description: "തീരദേശ സംരക്ഷണം, കായൽ മലിനീകരണം, മരം വീഴൽ സാധ്യത",
    icon: "Leaf",
    color: "#15803D",
    subcategories: ["Coastal Erosion (തീരശോഷണം)", "Canal Pollution (കനാൽ മലിനീകരണം)", "Fallen Trees (മരങ്ങൾ വീഴാൻ സാധ്യത)", "Sand Mining Concerns (മണലെടുപ്പ്)"],
    count: 8,
  },
  {
    id: "cat-facilities",
    slug: "public-facilities",
    name: "Public Facilities",
    name_ml: "പൊതു സൗകര്യങ്ങൾ",
    description: "ബസ് കാത്തിരിപ്പുകേന്ദ്രം, പൊതു ശൗചാലയം, പാർക്കുകൾ, കളിസ്ഥലങ്ങൾ",
    icon: "Building2",
    color: "#7C3AED",
    subcategories: ["Bus Shelter (ബസ് ഷെൽട്ടറുകൾ)", "Public Toilets (പൊതു ശൗചാലയങ്ങൾ)", "Public Park Maintenance (പാർക്കുകൾ)", "Government Building Access (പൊതു സ്ഥാപനങ്ങൾ)"],
    count: 7,
  },
  {
    id: "cat-safety",
    slug: "public-safety",
    name: "Public Safety",
    name_ml: "പൊതുജന സുരക്ഷ",
    description: "തെരുവ് നായ്ക്കളുടെ ശല്യം, അപകടകരമായ കുഴികൾ, അന്ധകാരമുള്ള ഇടവഴികൾ",
    icon: "ShieldAlert",
    color: "#DC2626",
    subcategories: ["Stray Dogs (തെരുവ് നായ്ക്കൾ)", "Dangerous Open Wells (തുറന്ന കിണറുകൾ)", "Dark Alleyways (വെളിച്ചമില്ലാത്ത വഴികൾ)", "School Zone Safety (സ്കൂൾ പരിസര സുരക്ഷ)"],
    count: 12,
  },
  {
    id: "cat-other",
    slug: "other-issues",
    name: "Other Civic Issues",
    name_ml: "മറ്റു പൗര പ്രശ്നങ്ങൾ",
    description: "മറ്റു പൊതു പ്രശ്നങ്ങളും നഗരസഭയുടെ ശ്രദ്ധയിൽപ്പെടേണ്ട വിഷയങ്ങളും",
    icon: "HelpCircle",
    color: "#4B5563",
    subcategories: ["General Civic Grievance (പൊതു പരാതി)", "Municipal Scheme Access (നഗരസഭാ പദ്ധതികൾ)", "Miscellaneous (മറ്റു വിഷയങ്ങൾ)"],
    count: 5,
  },
];

export const CIVIC_AUTHORITIES: CivicAuthority[] = [
  {
    id: "auth-tanur-municipality",
    name: "Tanur Municipality Office",
    name_ml: "താനൂർ നഗരസഭാ കാര്യാലയം",
    department: "Municipal Administration & Engineering",
    department_ml: "നഗരസഭാ ഭരണം & എൻജിനീയറിംഗ് വിഭാഗം",
    jurisdiction: "Tanur Municipality (44 Wards)",
    jurisdiction_ml: "താനൂർ നഗരസഭ (44 വാർഡുകൾ)",
    verified: true,
    contact_placeholder: "0494 2440228 • secretary.tanur@kerala.gov.in",
    active_issues_count: 18,
  },
  {
    id: "auth-kseb-tanur",
    name: "KSEB Electrical Section, Tanur",
    name_ml: "കെ.എസ്.ഇ.ബി ഇലക്ട്രിക്കൽ സെക്ഷൻ, താനൂർ",
    department: "Kerala State Electricity Board",
    department_ml: "വൈദ്യുതി വകുപ്പ്",
    jurisdiction: "Tanur Town, Rayirimangalam, Kettungal",
    jurisdiction_ml: "താനൂർ ടൗൺ, രായിരിമംഗലം, കെട്ടുങ്ങൽ",
    verified: true,
    contact_placeholder: "0494 2440230 • 1912 (Electricity Helpline)",
    active_issues_count: 11,
  },
  {
    id: "auth-kwa-tanur",
    name: "Kerala Water Authority (KWA), Tanur",
    name_ml: "കേരള വാട്ടർ അതോറിറ്റി, താനൂർ",
    department: "Public Health Engineering Department",
    department_ml: "കുടിവെള്ള വിതരണ വിഭാഗം",
    jurisdiction: "Tanur Municipal Supply Zone",
    jurisdiction_ml: "താനൂർ നഗരസഭാ കുടിവെള്ള മേഖല",
    verified: true,
    contact_placeholder: "0494 2422250 • kwa.tanur@kerala.gov.in",
    active_issues_count: 7,
  },
  {
    id: "auth-health-tanur",
    name: "Tanur Municipal Health Wing",
    name_ml: "താനൂർ നഗരസഭാ ആരോഗ്യ വിഭാഗം",
    department: "Public Health & Sanitation",
    department_ml: "പൊതുജനാരോഗ്യവും മാലിന്യ സംസ്കരണവും",
    jurisdiction: "Tanur Municipality",
    jurisdiction_ml: "താനൂർ നഗരസഭ",
    verified: true,
    contact_placeholder: "0494 2440229 • health.tanur@kerala.gov.in",
    active_issues_count: 14,
  },
  {
    id: "auth-police-tanur",
    name: "Tanur Police Station",
    name_ml: "താനൂർ പോലീസ് സ്റ്റേഷൻ",
    department: "Kerala Police, Malappuram District",
    department_ml: "കേരള പോലീസ്",
    jurisdiction: "Tanur Police Station Limits",
    jurisdiction_ml: "താനൂർ പോലീസ് പരിധി",
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
    title_ml: "താനൂർ റെയിൽവേ സ്റ്റേഷൻ റോഡിൽ വെള്ളക്കെട്ടും വൻ കുഴികളും",
    description: "താനൂർ റെയിൽവേ സ്റ്റേഷനിലേക്ക് പോകുന്ന മെയിൻ റോഡിൽ നിരവധി ആഴത്തിലുള്ള കുഴികൾ രൂപപ്പെട്ടിട്ടുണ്ട്. കഴിഞ്ഞ ദിവസത്തെ മഴയിൽ വെള്ളം കെട്ടിനിന്ന് ഇരുചക്ര വാഹനങ്ങൾ അപകടത്തിൽപ്പെടുന്നു. കാൽനടയാത്ര പോലും അസാധ്യമാണ്.",
    category_id: "cat-roads",
    subcategory: "Potholes (കുഴികൾ)",
    district: "Malappuram (മലപ്പുറം)",
    locality: "താനൂർ നഗരസഭ (Tanur Municipality)",
    jurisdiction_type: "municipality",
    address_landmark: "Near Tanur Railway Station Western Entry, Ward 12",
    latitude: 10.9753,
    longitude: 75.8672,
    images: [
      "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1584463699026-53818e9d5696?w=800&auto=format&fit=crop&q=80"
    ],
    status: "in_progress",
    priority: "high",
    support_count: 38,
    supported_by_user: true,
    followed_by_user: true,
    reporter_name: "Muhammed Shafi P. (മുഹമ്മദ് ഷാഫി)",
    reporter_id: "usr-shafi-tanur",
    is_anonymous: false,
    created_at: "2026-11-12T09:15:00Z",
    updated_at: "2026-11-16T14:30:00Z",
    timeline: [
      {
        id: "tl-1",
        status: "submitted",
        title: "പരാതി രജിസ്റ്റർ ചെയ്തു (Issue Reported)",
        description: "നാട്ടുവാസി മുഹമ്മദ് ഷാഫി ഫോട്ടോ സഹിതം പരാതി സമർപ്പിച്ചു.",
        date: "2026-11-12T09:15:00Z",
        actor: "Muhammed Shafi",
        actor_role: "Resident"
      },
      {
        id: "tl-2",
        status: "verified",
        title: "കമ്മ്യൂണിറ്റി മോഡറേറ്റർ പരിശോധിച്ചു (Verified by Moderator)",
        description: "പരാതിയുടെ സ്ഥലം പരിശോധിക്കുകയും അടിയന്തര പ്രാധാന്യമുള്ളതെന്ന് സ്ഥിരീകരിക്കുകയും ചെയ്തു.",
        date: "2026-11-13T10:40:00Z",
        actor: "Civic Moderator (Tanur)",
        actor_role: "Community Moderator"
      },
      {
        id: "tl-3",
        status: "forwarded",
        title: "നഗരസഭാ എൻജിനീയറിംഗ് വിഭാഗത്തിലേക്ക് അയച്ചു (Forwarded to Authority)",
        description: "താനൂർ നഗരസഭ റോഡ്‌സ് & ബ്രിഡ്ജസ് എൻജിനീയറിംഗ് വിഭാഗത്തിന് ഔദ്യോഗികമായി അറിയിപ്പ് കൈമാറി.",
        date: "2026-11-14T11:20:00Z",
        actor: "Civic Desk",
        actor_role: "Municipal Liaison"
      },
      {
        id: "tl-4",
        status: "in_progress",
        title: "നവീകരണ പ്രവൃത്തികൾ ആരംഭിച്ചു (Work In Progress)",
        description: "മെറ്റൽ ഇറക്കി റോഡിലെ കുഴികൾ അടയ്ക്കാനുള്ള പ്രാഥമിക പ്രവൃത്തികൾ നഗരസഭാ കോൺട്രാക്ടർ ആരംഭിച്ചിട്ടുണ്ട്.",
        date: "2026-11-16T14:30:00Z",
        actor: "Tanur Municipality Assistant Engineer",
        actor_role: "Municipal Authority"
      }
    ],
    authority_forwarding: {
      authority_id: "auth-tanur-municipality",
      authority_name: "താനൂർ നഗരസഭാ കാര്യാലയം (Tanur Municipality)",
      department: "Municipal Engineering Wing",
      forwarded_at: "2026-11-14T11:20:00Z",
      reference_no: "TNR-PW-2026-9812",
      notes: "Priority road maintenance fund allocated for Railway Station connector corridor."
    },
    comments: [
      {
        id: "c-1",
        author_name: "Abdul Azeez K.",
        author_id: "usr-azeez",
        content: "വളരെ ഗൗരവമുള്ള വിഷയമാണ്. രാത്രിയിൽ ട്രെയിൻ ഇറങ്ങി വരുന്നവർ പലരും ഇവിടെ തട്ടി വീഴുന്നുണ്ട്. എത്രയും വേഗം റീടാറിംഗ് നടത്തണം.",
        date: "2026-11-13T15:20:00Z",
        is_official: false
      },
      {
        id: "c-2",
        author_name: "താനൂർ നഗരസഭാ പബ്ലിക് ഇൻഫർമേഷൻ ഓഫീസർ",
        author_id: "auth-tanur-officer",
        content: "നഗരസഭാ ചെയർപേഴ്സൺ സ്ഥലം സന്ദർശിച്ചു. താൽക്കാലികമായി കുഴികൾ അടച്ചു കഴിഞ്ഞാൽ പൂർണ്ണ റീടാറിംഗ് അടുത്തയാഴ്ച ആരംഭിക്കും.",
        date: "2026-11-16T15:00:00Z",
        is_official: true
      }
    ],
    moderator_notes: "Multiple resident reports received for the same station link road. Verified high traffic risk."
  },
  {
    id: "civic-tnr-002",
    tracking_id: "CC-TNR-2026-0098",
    title: "Illegal plastic and municipal waste burning near Tanur Beach walkway",
    title_ml: "താനൂർ ബീച്ച് വാക്ക്‌വേ പരിസരത്ത് പ്ലാസ്റ്റിക് മാലിന്യങ്ങൾ തള്ളലും കത്തിക്കലും",
    description: "താനൂർ കടപ്പുറം വാക്ക്‌വേയുടെ വടക്കേ അറ്റത്ത് രാത്രികാലങ്ങളിൽ വൻതോതിൽ പ്ലാസ്റ്റിക്കും ഹോട്ടൽ മാലിന്യങ്ങളും തള്ളുകയും തീയിടുകയും ചെയ്യുന്നു. കടൽക്കാറ്റിലൂടെ വിഷപ്പുക സമീപത്തെ വീടുകളിലേക്ക് എത്തുന്നു.",
    category_id: "cat-waste",
    subcategory: "Garbage Dumps (മാലിന്യക്കൂമ്പാരം)",
    district: "Malappuram (മലപ്പുറം)",
    locality: "താനൂർ നഗരസഭ (Tanur Municipality)",
    jurisdiction_type: "municipality",
    address_landmark: "Tanur Beach Promenade North End, Ward 3",
    latitude: 10.9685,
    longitude: 75.8545,
    images: [
      "https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop&q=80"
    ],
    status: "verified",
    priority: "urgent",
    support_count: 52,
    supported_by_user: true,
    followed_by_user: false,
    reporter_name: "Sujith K. (സുജിത്ത്)",
    reporter_id: "usr-sujith-tanur",
    is_anonymous: false,
    created_at: "2026-11-14T17:30:00Z",
    updated_at: "2026-11-15T11:00:00Z",
    timeline: [
      {
        id: "tl-201",
        status: "submitted",
        title: "പരാതി രജിസ്റ്റർ ചെയ്തു",
        description: "മാലിന്യം കത്തുന്നതിന്റെ ഫോട്ടോ സഹിതം സുജിത്ത് റിപ്പോർട്ട് സമർപ്പിച്ചു.",
        date: "2026-11-14T17:30:00Z",
        actor: "Sujith K.",
        actor_role: "Resident"
      },
      {
        id: "tl-202",
        status: "verified",
        title: "സ്ഥിരീകരിച്ചു (Verified)",
        description: "താനൂർ നഗരസഭാ ഹെൽത്ത് ഇൻസ്‌പെക്ടറുടെ ശ്രദ്ധയിൽപ്പെടുത്താൻ ശുപാർശ ചെയ്തു.",
        date: "2026-11-15T11:00:00Z",
        actor: "Civic Lead Moderator",
        actor_role: "Community Moderator"
      }
    ],
    comments: [
      {
        id: "c-201",
        author_name: "Dr. Anoop Prasad",
        author_id: "usr-anoop",
        content: "പ്ലാസ്റ്റിക് കത്തുമ്പോൾ ഉണ്ടാകുന്ന ഡയോക്സിൻ വായു മലിനീകരണത്തിനും കുട്ടികളിൽ ശ്വാസതടസ്സത്തിനും കാരണമാകും. സിസിടിവി സ്ഥാപിച്ച് പിഴ ചുമത്തണം.",
        date: "2026-11-15T13:40:00Z",
        is_official: false
      }
    ],
    moderator_notes: "Forwarding request pending with Health Wing. Immediate night patrol requested."
  },
  {
    id: "civic-tnr-003",
    tracking_id: "CC-TNR-2026-0082",
    title: "Drinking water pipeline burst near Rayirimangalam UP School junction",
    title_ml: "രായിരിമംഗലം യുപി സ്കൂൾ ജംഗ്ഷനിൽ കുടിവെള്ള പൈപ്പ് ലൈൻ പൊട്ടി വെള്ളം പാഴാകുന്നു",
    description: "രായിരിമംഗലം മെയിൻ റോഡിൽ കുടിവെള്ള പൈപ്പ് ലൈൻ പൊട്ടി 3 ദിവസമായി ആയിരക്കണക്കിന് ലിറ്റർ ശുദ്ധജലം പാഴാകുന്നു. റോഡിലൂടെ ഒഴുകുന്നതിനാൽ റോഡ് തകരുകയും സ്കൂൾ കുട്ടികൾക്ക് നടക്കാൻ ബുദ്ധിമുട്ടാവുകയും ചെയ്യുന്നു.",
    category_id: "cat-water",
    subcategory: "Pipeline Leakage (പൈപ്പ് ലൈൻ ചോർച്ച)",
    district: "Malappuram (മലപ്പുറം)",
    locality: "താനൂർ നഗരസഭ (Tanur Municipality)",
    jurisdiction_type: "municipality",
    address_landmark: "Rayirimangalam UP School Junction, Ward 28",
    latitude: 10.9821,
    longitude: 75.8754,
    images: [
      "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=800&auto=format&fit=crop&q=80"
    ],
    status: "resolved",
    priority: "urgent",
    support_count: 44,
    supported_by_user: false,
    followed_by_user: true,
    reporter_name: "Fathima Beegum (ഫാത്തിമ ബീഗം)",
    reporter_id: "usr-fathima",
    is_anonymous: false,
    created_at: "2026-11-08T08:00:00Z",
    updated_at: "2026-11-10T16:00:00Z",
    timeline: [
      {
        id: "tl-301",
        status: "submitted",
        title: "പരാതി രജിസ്റ്റർ ചെയ്തു",
        description: "കുടിവെള്ള പൈപ്പ് ലൈൻ പൊട്ടിയതായി അറിയിച്ചു.",
        date: "2026-11-08T08:00:00Z",
        actor: "Fathima Beegum",
        actor_role: "Resident"
      },
      {
        id: "tl-302",
        status: "verified",
        title: "സ്ഥിരീകരിച്ചു (Verified)",
        description: "വാട്ടർ അതോറിറ്റിയിലേക്ക് കൈമാറാൻ അനുമതി നൽകി.",
        date: "2026-11-08T09:30:00Z",
        actor: "Moderator",
        actor_role: "Community Moderator"
      },
      {
        id: "tl-303",
        status: "forwarded",
        title: "കേരള വാട്ടർ അതോറിറ്റിക്ക് അയച്ചു",
        description: "KWA താനൂർ സെക്ഷൻ എൻജിനീയർക്ക് കൈമാറി.",
        date: "2026-11-08T11:00:00Z",
        actor: "Civic Desk",
        actor_role: "Authority Liaison"
      },
      {
        id: "tl-304",
        status: "in_progress",
        title: "അറ്റകുറ്റപ്പണി ആരംഭിച്ചു",
        description: "KWA പ്ലംബിംഗ് ടീം റോഡ് വെട്ടി പൈപ്പ് മാറ്റിസ്ഥാപിക്കാൻ തുടങ്ങി.",
        date: "2026-11-09T10:00:00Z",
        actor: "KWA Maintenance Team",
        actor_role: "Authority"
      },
      {
        id: "tl-305",
        status: "resolved",
        title: "പ്രശ്നം പരിഹരിച്ചു (Resolved)",
        description: "പൈപ്പ് ലൈൻ ലീക്കേജ് മാറ്റി പുതിയ വാൽവ് ഘടിപ്പിച്ചു. റോഡ് താത്കാലികമായി നികത്തി.",
        date: "2026-11-10T16:00:00Z",
        actor: "KWA Section Engineer & Municipal Inspector",
        actor_role: "Authority"
      }
    ],
    authority_forwarding: {
      authority_id: "auth-kwa-tanur",
      authority_name: "കേരള വാട്ടർ അതോറിറ്റി (KWA Tanur)",
      department: "Distribution Maintenance",
      forwarded_at: "2026-11-08T11:00:00Z",
      reference_no: "KWA-TNR-LK-2026-440",
      notes: "Main 110mm PVC line repaired with cast iron collar."
    },
    resolution_evidence: {
      resolved_at: "2026-11-10T16:00:00Z",
      resolution_notes: "പൈപ്പ് ലൈൻ തകരാർ പൂർണ്ണമായി പരിഹരിച്ചു. ശുദ്ധജല വിതരണം പുനഃസ്ഥാപിച്ചു.",
      resolution_images: [
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80"
      ],
      verified_by_moderator: true
    },
    comments: [
      {
        id: "c-301",
        author_name: "Fathima Beegum",
        author_id: "usr-fathima",
        content: "വേഗത്തിൽ നടപടിയെടുത്ത വാട്ടർ അതോറിറ്റി ഉദ്യോഗസ്ഥർക്കും നഗരസഭയ്ക്കും നന്ദി!",
        date: "2026-11-10T17:15:00Z",
        is_official: false
      }
    ]
  },
  {
    id: "civic-tnr-004",
    tracking_id: "CC-TNR-2026-0112",
    title: "12 non-functional streetlights on Kettungal Coastal Road",
    title_ml: "കെട്ടുങ്ങൽ തീരദേശ റോഡിൽ 12 സ്ട്രീറ്റ് ലൈറ്റുകൾ കത്തുന്നില്ല; ഇരുട്ടിൽ പ്രദേശം",
    description: "കെട്ടുങ്ങൽ തീരദേശ റോഡിൽ തുടർച്ചയായ 12 പോസ്റ്റുകളിലെ എൽഇഡി വിളക്കുകൾ രണ്ടാഴ്ചയായി കത്തുന്നില്ല. രാത്രിയിൽ ജോലി കഴിഞ്ഞു വരുന്ന മത്സ്യത്തൊഴിലാളികൾക്കും സ്ത്രീകൾക്കും കാൽനടയാത്ര ഭയമുണ്ടാക്കുന്നു.",
    category_id: "cat-lighting",
    subcategory: "Faulty Streetlight (കത്താത്ത സ്ട്രീറ്റ്‌ലൈറ്റുകൾ)",
    district: "Malappuram (മലപ്പുറം)",
    locality: "താനൂർ നഗരസഭ (Tanur Municipality)",
    jurisdiction_type: "municipality",
    address_landmark: "Kettungal Fishery Road to Harbour, Ward 7",
    latitude: 10.9612,
    longitude: 75.8511,
    images: [
      "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=800&auto=format&fit=crop&q=80"
    ],
    status: "forwarded",
    priority: "medium",
    support_count: 29,
    supported_by_user: false,
    followed_by_user: false,
    reporter_name: "Kader Kutty (ഖാദർ കുട്ടി)",
    reporter_id: "usr-kader",
    is_anonymous: false,
    created_at: "2026-11-15T18:40:00Z",
    updated_at: "2026-11-16T10:15:00Z",
    timeline: [
      {
        id: "tl-401",
        status: "submitted",
        title: "പരാതി രജിസ്റ്റർ ചെയ്തു",
        description: "കെട്ടുങ്ങൽ വാർഡിലെ വിളക്കുകൾ കത്തുന്നില്ലെന്ന് പരാതി നൽകി.",
        date: "2026-11-15T18:40:00Z",
        actor: "Kader Kutty",
        actor_role: "Resident"
      },
      {
        id: "tl-402",
        status: "verified",
        title: "പരിശോധിച്ച് സ്ഥിരീകരിച്ചു",
        description: "താനൂർ കെ.എസ്.ഇ.ബി സെക്ഷനിലേക്കും നഗരസഭാ ലൈറ്റിംഗ് വിങ്ങിനും ഫോർവേഡ് ചെയ്തു.",
        date: "2026-11-16T09:00:00Z",
        actor: "Moderator",
        actor_role: "Community Moderator"
      },
      {
        id: "tl-403",
        status: "forwarded",
        title: "കെ.എസ്.ഇ.ബി & നഗരസഭയിലേക്ക് ഫോർവേഡ് ചെയ്തു",
        description: "നഗരസഭാ കരാറുകാരന് ലൈറ്റുകൾ മാറ്റിസ്ഥാപിക്കാൻ നിർദ്ദേശം നൽകി.",
        date: "2026-11-16T10:15:00Z",
        actor: "Civic Desk",
        actor_role: "Liaison"
      }
    ],
    authority_forwarding: {
      authority_id: "auth-kseb-tanur",
      authority_name: "കെ.എസ്.ഇ.ബി ഇലക്ട്രിക്കൽ സെക്ഷൻ & താനൂർ നഗരസഭ",
      department: "Street Lighting Maintenance",
      forwarded_at: "2026-11-16T10:15:00Z",
      reference_no: "KSEB-TNR-SL-8902",
      notes: "Inspection scheduled with hydraulic bucket crane on Wednesday."
    },
    comments: []
  },
  {
    id: "civic-tnr-005",
    tracking_id: "CC-TNR-2026-0120",
    title: "Pack of aggressive stray dogs near Meenadathur LPS School premises",
    title_ml: "മീനടത്തൂർ എൽപി സ്കൂൾ പരിസരത്ത് തെരുവ് നായ്ക്കളുടെ ശല്യം",
    description: "മീനടത്തൂർ എൽപി സ്കൂൾ പരിസരത്ത് പത്തോളം തെരുവ് നായ്ക്കൾ കൂട്ടമായി അലഞ്ഞുതിരിയുന്നു. കുട്ടികളെ പിന്തുടർന്ന് ആക്രമിക്കാൻ തുനിയുന്നതിനാൽ മാതാപിതാക്കൾ ഭീതിയിലാണ്. അടിയന്തര എബിസി (ABC) വന്ധ്യംകരണവും വാക്സിനേഷനും വേണം.",
    category_id: "cat-safety",
    subcategory: "Stray Dogs (തെരുവ് നായ്ക്കൾ)",
    district: "Malappuram (മലപ്പുറം)",
    locality: "താനൂർ ബ്ലോക്ക് പഞ്ചായത്ത് (Tanur Block Panchayat)",
    jurisdiction_type: "block_panchayat",
    address_landmark: "Meenadathur LP School Gate, Tanur Rural",
    latitude: 10.9892,
    longitude: 75.8821,
    images: [
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&auto=format&fit=crop&q=80"
    ],
    status: "submitted",
    priority: "high",
    support_count: 41,
    supported_by_user: true,
    followed_by_user: true,
    reporter_name: "Noufina V. P. (നൗഫീന)",
    reporter_id: "usr-noufina",
    is_anonymous: false,
    created_at: "2026-11-17T07:45:00Z",
    updated_at: "2026-11-17T07:45:00Z",
    timeline: [
      {
        id: "tl-501",
        status: "submitted",
        title: "പരാതി രജിസ്റ്റർ ചെയ്തു",
        description: "സ്കൂൾ പരിസരത്തെ സുരക്ഷാ പ്രശ്നം റിപ്പോർട്ട് ചെയ്തു.",
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
        content: "കഴിഞ്ഞ ആഴ്ച ഒരു വിദ്യാർത്ഥിയുടെ ബാഗ് കടിച്ചുകീറി. ബ്ലോക്ക് പഞ്ചായത്ത് വെറ്ററിനറി സർജൻ വഴി അടിയന്തര നടപടി സ്വീകരിക്കണം.",
        date: "2026-11-17T09:10:00Z",
        is_official: false
      }
    ]
  },
  {
    id: "civic-tnr-006",
    tracking_id: "CC-TNR-2026-0065",
    title: "Broken roof tiles on public waiting shed near Tanur Police Station",
    title_ml: "താനൂർ പോലീസ് സ്റ്റേഷന് സമീപമുള്ള ബസ് കാത്തിരിപ്പ് കേന്ദ്രത്തിന്റെ മേൽക്കൂര തകർന്നു",
    description: "താനൂർ പോലീസ് സ്റ്റേഷന് എതിർവശത്തുള്ള യാത്രക്കാരുടെ വെയ്റ്റിംഗ് ഷെഡിന്റെ ആസ്ബറ്റോസ് മേൽക്കൂര തകർന്ന് വീഴാറായ അവസ്ഥയിലാണ്. മഴ പെയ്യുമ്പോൾ യാത്രക്കാർക്ക് നിൽക്കാൻ സാധിക്കുന്നില്ല.",
    category_id: "cat-facilities",
    subcategory: "Bus Shelter (ബസ് ഷെൽട്ടറുകൾ)",
    district: "Malappuram (മലപ്പുറം)",
    locality: "താനൂർ നഗരസഭ (Tanur Municipality)",
    jurisdiction_type: "municipality",
    address_landmark: "Opposite Police Station, Main Road Tanur",
    latitude: 10.9741,
    longitude: 75.8643,
    images: [
      "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=800&auto=format&fit=crop&q=80"
    ],
    status: "under_review",
    priority: "medium",
    support_count: 17,
    supported_by_user: false,
    followed_by_user: false,
    reporter_name: "Anonymous Resident (അജ്ഞാതൻ)",
    reporter_id: "usr-anon",
    is_anonymous: true,
    created_at: "2026-11-16T12:00:00Z",
    updated_at: "2026-11-16T12:00:00Z",
    timeline: [
      {
        id: "tl-601",
        status: "submitted",
        title: "പരാതി രജിസ്റ്റർ ചെയ്തു",
        description: "യാത്രക്കാരുടെ സൗകര്യാർത്ഥം സമർപ്പിച്ചു.",
        date: "2026-11-16T12:00:00Z",
        actor: "Resident",
        actor_role: "Resident"
      },
      {
        id: "tl-602",
        status: "under_review",
        title: "മോഡറേഷൻ അവലോകനത്തിൽ",
        description: "നഗരസഭാ വാർഡ് കൗൺസിലർക്ക് ഫോർവേഡ് ചെയ്യാൻ ഡാറ്റ പരിശോധിക്കുന്നു.",
        date: "2026-11-16T14:00:00Z",
        actor: "Civic Moderator",
        actor_role: "Community Moderator"
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
    title: "പ്രവൃത്തി പുരോഗമിക്കുന്നു (Work in Progress)",
    description: "നിങ്ങൾ ഫോളോ ചെയ്യുന്ന താനൂർ റെയിൽവേ സ്റ്റേഷൻ റോഡിലെ കുഴികൾ അടയ്ക്കാനുള്ള പ്രവൃത്തികൾ ആരംഭിച്ചു.",
    type: "status_update",
    date: "2026-11-16T14:30:00Z",
    is_read: false
  },
  {
    id: "cnotif-2",
    issue_id: "civic-tnr-003",
    issue_tracking_id: "CC-TNR-2026-0082",
    title: "പരാതി വിജയകരമായി പരിഹരിച്ചു (Issue Resolved)",
    description: "രായിരിമംഗലത്തെ കുടിവെള്ള പൈപ്പ് ലൈൻ ചോർച്ച KWA ഉദ്യോഗസ്ഥർ പരിഹരിച്ചു.",
    type: "resolved",
    date: "2026-11-10T16:00:00Z",
    is_read: true
  },
  {
    id: "cnotif-3",
    issue_id: "civic-tnr-001",
    issue_tracking_id: "CC-TNR-2026-0104",
    title: "അധികൃതർക്ക് കൈമാറി (Forwarded to Authority)",
    description: "നിങ്ങളുടെ പരാതി താനൂർ നഗരസഭാ എൻജിനീയറിംഗ് വിഭാഗത്തിലേക്ക് ഔദ്യോഗികമായി അയച്ചു.",
    type: "forwarded",
    date: "2026-11-14T11:20:00Z",
    is_read: true
  },
  {
    id: "cnotif-4",
    issue_id: "civic-tnr-005",
    issue_tracking_id: "CC-TNR-2026-0120",
    title: "പരാതി രജിസ്റ്റർ ചെയ്തു (Report Submitted)",
    description: "മീനടത്തൂർ എൽപി സ്കൂൾ തെരുവ് നായ ശല്യം സംബന്ധിച്ച പരാതി സ്വീകരിച്ചു. ട്രാക്കിംഗ് ഐഡി: CC-TNR-2026-0120.",
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
    return this.issues.find(i => i.id === id || i.tracking_id === id);
  }

  createIssue(data: Omit<CivicIssue, "id" | "tracking_id" | "support_count" | "timeline" | "comments" | "created_at" | "updated_at">): CivicIssue {
    const id = "civic-tnr-" + (this.issues.length + 1).toString().padStart(3, "0");
    const tracking_id = `CC-TNR-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date().toISOString();

    const newIssue: CivicIssue = {
      ...data,
      id,
      tracking_id,
      support_count: 1,
      supported_by_user: true,
      followed_by_user: true,
      created_at: now,
      updated_at: now,
      timeline: [
        {
          id: "tl-" + Date.now(),
          status: "submitted",
          title: "പരാതി രജിസ്റ്റർ ചെയ്തു (Report Submitted)",
          description: "നാട്ടുവാസി വിജയകരമായി പരാതി സിവിക് കണക്റ്റിൽ രേഖപ്പെടുത്തി.",
          date: now,
          actor: data.reporter_name,
          actor_role: "Resident"
        }
      ],
      comments: []
    };

    this.issues.unshift(newIssue);

    // Add user notification
    this.notifications.unshift({
      id: "cnotif-" + Date.now(),
      issue_id: newIssue.id,
      issue_tracking_id: newIssue.tracking_id,
      title: "പരാതി രജിസ്റ്റർ ചെയ്തു (Report Submitted)",
      description: `നിങ്ങളുടെ പരാതി "${newIssue.title}" വിജയകരമായി സമർപ്പിച്ചു. ട്രാക്കിംഗ് ഐഡി: ${newIssue.tracking_id}.`,
      type: "submitted",
      date: now,
      is_read: false
    });

    return newIssue;
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
    newStatus: CivicIssue['status'],
    actorName: string,
    notes?: string,
    authorityForwarding?: CivicAuthorityForwarding,
    resolutionEvidence?: CivicResolutionEvidence
  ): boolean {
    const issue = this.issues.find(i => i.id === issueId);
    if (!issue) return false;
    const now = new Date().toISOString();
    issue.status = newStatus;
    issue.updated_at = now;

    if (authorityForwarding) {
      issue.authority_forwarding = authorityForwarding;
    }
    if (resolutionEvidence) {
      issue.resolution_evidence = resolutionEvidence;
    }

    const statusTitles: Record<string, string> = {
      under_review: "മോഡറേഷൻ അവലോകനത്തിൽ (Under Review)",
      verified: "മോഡറേറ്റർ പരിശോധിച്ചു സ്ഥിരീകരിച്ചു (Verified by Moderator)",
      forwarded: "ബന്ധപ്പെട്ട അധികൃതർക്ക് കൈമാറി (Forwarded to Authority)",
      in_progress: "പരിഹാര നടപടി പുരോഗമിക്കുന്നു (Work in Progress)",
      resolved: "പ്രശ്നം പരിഹരിച്ചു (Issue Resolved)",
      rejected: "പരാതി തള്ളി (Report Rejected)",
      reopened: "പരാതി പുനഃപരിശോധനക്കായി തുറന്നു (Reopened)"
    };

    issue.timeline.push({
      id: "tl-" + Date.now(),
      status: newStatus,
      title: statusTitles[newStatus] || newStatus,
      description: notes || `സ്റ്റാറ്റസ് ${newStatus} ലേക്ക് മാറ്റി.`,
      date: now,
      actor: actorName,
      actor_role: "Authority / Moderator"
    });

    // Notify followers
    this.notifications.unshift({
      id: "cnotif-" + Date.now(),
      issue_id: issue.id,
      issue_tracking_id: issue.tracking_id,
      title: statusTitles[newStatus] || "സ്റ്റാറ്റസ് അപ്‌ഡേറ്റ്",
      description: `പരാതി "${issue.title}" (${issue.tracking_id}) നില: ${newStatus}.`,
      type: newStatus === "resolved" ? "resolved" : newStatus === "forwarded" ? "forwarded" : "status_update",
      date: now,
      is_read: false
    });

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
    const pending = this.issues.filter(i => i.status === "submitted" || i.status === "under_review").length;
    const verified = this.issues.filter(i => i.status === "verified").length;
    const forwarded = this.issues.filter(i => i.status === "forwarded").length;
    const inProgress = this.issues.filter(i => i.status === "in_progress").length;
    const resolved = this.issues.filter(i => i.status === "resolved").length;
    const rejected = this.issues.filter(i => i.status === "rejected").length;

    const byCategory: Record<string, number> = {};
    CIVIC_CATEGORIES.forEach(c => {
      byCategory[c.name] = this.issues.filter(i => i.category_id === c.id).length;
    });

    const byLocality: Record<string, number> = {
      "താനൂർ നഗരസഭ (Tanur Municipality)": this.issues.filter(i => i.locality.includes("Municipality")).length,
      "താനൂർ ബ്ലോക്ക് പഞ്ചായത്ത് (Tanur Block Panchayat)": this.issues.filter(i => i.locality.includes("Block")).length,
      "മറ്റു പ്രദേശങ്ങൾ (Other Malappuram)": this.issues.filter(i => !i.locality.includes("Municipality") && !i.locality.includes("Block")).length,
    };

    return {
      total,
      pending,
      verified,
      forwarded,
      inProgress,
      resolved,
      rejected,
      resolutionRate: total > 0 ? Math.round((resolved / total) * 100) : 0,
      byCategory,
      byLocality,
    };
  }
}

const globalForCivicStore = globalThis as unknown as { civicStore: CivicDataStore };
export const civicStore = globalForCivicStore.civicStore || new CivicDataStore();
if (process.env.NODE_ENV !== "production") globalForCivicStore.civicStore = civicStore;
