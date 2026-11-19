import {
  CommunityIdea,
  IdeaCategory,
  IdeaStatus,
  IdeaComment,
  IdeaTimelineEvent,
  IdeaForwardingRecord,
  IdeaCollaborationRecord,
  CommunityDiscussion,
  DiscussionCategory,
  DiscussionComment,
  LocalInitiative,
  InitiativeCategory,
  InitiativeUpdate,
  ContentReport,
  PeoplesVoiceAuditLog,
  ReportContentType,
  ReportReason,
  ReportStatus
} from "@/types/peoplesVoice";

// -------------------------------------------------------------
// 1. CATEGORY METADATA DEFINITIONS
// -------------------------------------------------------------

export const PEOPLES_VOICE_IDEA_CATEGORIES = [
  { key: "roads_transport" as IdeaCategory, label: "Roads & Transportation", label_ml: "റോഡുകളും ഗതാഗതവും", icon: "Car", color: "#1E3A8A" },
  { key: "waste_cleanliness" as IdeaCategory, label: "Cleanliness & Waste Management", label_ml: "മാലിന്യ സംസ്കരണവും ശുചിത്വവും", icon: "Trash2", color: "#059669" },
  { key: "education" as IdeaCategory, label: "Education", label_ml: "വിദ്യാഭ്യാസം", icon: "GraduationCap", color: "#4338CA" },
  { key: "healthcare" as IdeaCategory, label: "Healthcare", label_ml: "ആരോഗ്യം", icon: "Activity", color: "#DC2626" },
  { key: "environment" as IdeaCategory, label: "Environment", label_ml: "പരിസ്ഥിതി", icon: "Leaf", color: "#16A34A" },
  { key: "public_facilities" as IdeaCategory, label: "Public Facilities", label_ml: "പൊതു സൗകര്യങ്ങൾ", icon: "Building2", color: "#D97706" },
  { key: "tourism" as IdeaCategory, label: "Tourism & Heritage", label_ml: "വിനോദസഞ്ചാരവും പൈതൃകവും", icon: "Camera", color: "#0891B2" },
  { key: "digital_services" as IdeaCategory, label: "Digital Services", label_ml: "ഡിജിറ്റൽ സേവനങ്ങൾ", icon: "Cpu", color: "#2563EB" },
  { key: "youth_development" as IdeaCategory, label: "Youth Development", label_ml: "യുവജനക്ഷേമം", icon: "Trophy", color: "#7C3AED" },
  { key: "community_welfare" as IdeaCategory, label: "Community Welfare", label_ml: "സാമൂഹിക ക്ഷേമം", icon: "HeartHandshake", color: "#BE185D" },
  { key: "other" as IdeaCategory, label: "Other Community Ideas", label_ml: "മറ്റ് പൊതു ആശയങ്ങൾ", icon: "Sparkles", color: "#4B5563" },
] as const;

export const PEOPLES_VOICE_DISCUSSION_CATEGORIES = [
  { key: "local_development" as DiscussionCategory, label: "Local Development", label_ml: "പ്രാദേശിക വികസനം", icon: "Building" },
  { key: "environment" as DiscussionCategory, label: "Environment & Green Spaces", label_ml: "പരിസ്ഥിതിയും ഹരിതമേഖലയും", icon: "Leaf" },
  { key: "education" as DiscussionCategory, label: "Education & Youth", label_ml: "വിദ്യാഭ്യാസവും യുവജനങ്ങളും", icon: "GraduationCap" },
  { key: "public_facilities" as DiscussionCategory, label: "Public Facilities & Roads", label_ml: "പൊതു സൗകര്യങ്ങളും റോഡുകളും", icon: "Landmark" },
  { key: "community_initiatives" as DiscussionCategory, label: "Community Initiatives", label_ml: "സാമൂഹിക കൂട്ടായ്മകൾ", icon: "Users" },
  { key: "improvement_ideas" as DiscussionCategory, label: "Local Improvement Ideas", label_ml: "നവീകരണ നിർദ്ദേശങ്ങൾ", icon: "Lightbulb" },
] as const;

export const PEOPLES_VOICE_INITIATIVE_CATEGORIES = [
  { key: "cleanliness" as InitiativeCategory, label: "Cleanliness Campaign", label_ml: "ശുചിത്വ യജ്ഞം", icon: "Trash2", color: "#059669" },
  { key: "tree_planting" as InitiativeCategory, label: "Tree Planting & Nature", label_ml: "വൃക്ഷത്തൈ നടീലും പരിസ്ഥിതിയും", icon: "Leaf", color: "#16A34A" },
  { key: "education_support" as InitiativeCategory, label: "Educational Support", label_ml: "വിദ്യാഭ്യാസ പിന്തുണ", icon: "GraduationCap", color: "#4338CA" },
  { key: "volunteering" as InitiativeCategory, label: "Community Volunteering", label_ml: "സാമൂഹിക സന്നദ്ധസേവനം", icon: "HeartHandshake", color: "#BE185D" },
  { key: "public_awareness" as InitiativeCategory, label: "Public Awareness", label_ml: "ബോധവൽക്കരണ പരിപാടി", icon: "Megaphone", color: "#D97706" },
  { key: "cultural" as InitiativeCategory, label: "Cultural & Arts Activities", label_ml: "സാംസ്കാരിക പ്രവർത്തനങ്ങൾ", icon: "Palette", color: "#7C3AED" },
] as const;

// -------------------------------------------------------------
// 2. INITIAL COMMUNITY IDEAS (COVERING ALL 9 STATUSES)
// -------------------------------------------------------------

export const INITIAL_COMMUNITY_IDEAS: CommunityIdea[] = [
  {
    id: "idea-solar-harbour",
    tracking_id: "TNR-PV-2026-001",
    title: "Solar-Powered Fish Drying & Cold Storage Shed at Tanur Beach",
    title_ml: "താനൂർ തീരദേശത്ത് സൗരോർജ്ജ മത്സ്യ ഉണക്കൽ & ശീതീകരണ കേന്ദ്രം",
    description: "Establish a modern, hygienic solar drying yard and small-scale cold storage unit for traditional fisherfolk at Ward 4 Tanur Harbour. This will prevent post-harvest spoilage, empower coastal self-help groups, and protect livelihood during monsoon bans.",
    description_ml: "താനൂർ ഹാർബർ തീരദേശത്തെ പരമ്പരാഗത മത്സ്യത്തൊഴിലാളികൾക്കായി ആധുനിക സോളാർ ഉണക്കൽ കേന്ദ്രവും മിനി കോൾഡ് സ്റ്റോറേജും സ്ഥാപിക്കുക. ഇത് ശുചിത്വമുള്ള മൂല്യവർദ്ധിത ഉൽപ്പന്നങ്ങൾ നിർമ്മിക്കാനും വരുമാനം വർദ്ധിപ്പിക്കാനും സഹായിക്കും.",
    category: "community_welfare",
    category_name: "Community Welfare",
    category_name_ml: "സാമൂഹിക ക്ഷേമം",
    locality: "Theeradesham (Beach)",
    locality_ml: "തീരദേശം",
    ward_number: 4,
    author_id: "usr-001",
    author_name: "Hamza Koya P. (ഹംസക്കോയ)",
    is_anonymous: false,
    images: ["https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80"],
    expected_benefit: "Direct livelihood stability for 250+ coastal fishing families, zero waste processing of catch, and prevention of foul odor in harbor proximity.",
    expected_benefit_ml: "250-ൽ അധികം തീരദേശ കുടുംബങ്ങൾക്ക് നേരിട്ടുള്ള വരുമാന സംരക്ഷണം, മത്സ്യ പാഴാകുന്നത് തടയൽ, തീരത്ത് ശുചിത്വം ഉറപ്പാക്കൽ.",
    estimated_cost: "₹18.50 Lakhs",
    estimated_cost_note: "Community-provided rough estimate based on Matsyafed cooperative model. Not an official tender or municipal quote.",
    status: "Forwarded for Consideration",
    status_reason: "Proposal officially compiled and submitted to Matsyafed District Officer and Municipal Coastal Development Sub-Committee for technical feasibility.",
    status_reason_ml: "മത്സ്യഫെഡ് ജില്ലാ കാര്യാലയത്തിനും നഗരസഭ തീരദേശ സമിതിക്കും സാങ്കേതിക പരിശോധനയ്ക്കായി കൈമാറി.",
    forwarded_record: {
      authority_name: "Kerala State Co-operative Federation for Fisheries Development (Matsyafed) & Tanur Municipality",
      department: "Fisheries & Coastal Community Cell",
      forwarded_date: "2026-03-12",
      reference_number: "MF-MLP/TNR/PV-2026/889",
      official_contact_note: "District Project Officer acknowledges proposal. Joint inspection scheduled with Harbour Engineering Wing.",
      notes: "Forwarded with citizen endorsement petition containing 142 local signatures."
    },
    support_count: 142,
    supported_user_ids: ["usr-001", "usr-002", "usr-003", "usr-004", "usr-005"],
    supported_by_user: true,
    followed_user_ids: ["usr-001", "usr-002"],
    is_followed_by_user: true,
    comments_count: 8,
    comments: [
      {
        id: "comm-01",
        idea_id: "idea-solar-harbour",
        author_id: "usr-002",
        author_name: "Rashid Ali (റഷീദ് അലി)",
        content: "A very timely initiative. During heavy catch seasons, fish gets sold at distress prices due to lack of local cold chain facilities.",
        is_official: false,
        created_at: "2026-03-05T10:30:00Z"
      },
      {
        id: "comm-02",
        idea_id: "idea-solar-harbour",
        author_id: "admin-001",
        author_name: "Civic Moderator (താനൂർ സിവിക് ഡെസ്ക്)",
        content: "This proposal was verified for community impact and submitted under official Reference MF-MLP/TNR/PV-2026/889.",
        is_official: true,
        official_role: "People's Voice Civic Moderator",
        created_at: "2026-03-12T14:15:00Z"
      }
    ],
    timeline: [
      {
        id: "tl-01",
        status: "Submitted",
        title: "Idea Submitted by Citizen",
        title_ml: "നിർദ്ദേശം സമർപ്പിച്ചു",
        description: "Hamza Koya submitted the proposal with preliminary design diagram and community requirements.",
        date: "2026-02-28",
        actor: "Hamza Koya P.",
        actor_role: "Resident"
      },
      {
        id: "tl-02",
        status: "Community Discussion",
        title: "Opened for Public Discussion",
        title_ml: "പൊതു ചർച്ചയ്ക്കായി തുറന്നു",
        description: "Community discussion reached 100+ supporters from Harbour and Beach Wards.",
        date: "2026-03-05",
        actor: "Civic Desk",
        actor_role: "Platform Moderator"
      },
      {
        id: "tl-03",
        status: "Forwarded for Consideration",
        title: "Forwarded to Matsyafed & Municipality",
        title_ml: "മത്സ്യഫെഡിനും നഗരസഭയ്ക്കും സമർപ്പിച്ചു",
        description: "Officially transmitted with Reference No. MF-MLP/TNR/PV-2026/889.",
        date: "2026-03-12",
        actor: "Moderator Panel",
        actor_role: "Community Facilitator"
      }
    ],
    is_hidden: false,
    is_featured: true,
    created_at: "2026-02-28T09:00:00Z",
    updated_at: "2026-03-12T14:15:00Z"
  },
  {
    id: "idea-green-canal-walk",
    tracking_id: "TNR-PV-2026-002",
    title: "Green Canal Walkway & Micro-Parks along Valiyathodu Canal",
    title_ml: "വലിയതോട് തീരത്ത് ഹരിത നടപ്പാതയും വിശ്രമ കേന്ദ്രങ്ങളും",
    description: "Transform the neglected embankment along Valiyathodu near Devadhar into a pedestrian greenway with native flowering trees, bamboo fences, solar lighting, and waste bins. This will prevent illegal garbage dumping and create a healthy walking corridor for elderly residents and children.",
    description_ml: "ദേവധാർ സമീപമുള്ള വലിയതോടിന്റെ ഇരുവശങ്ങളും മാലിന്യമുക്തമാക്കി തദ്ദേശീയ വൃക്ഷങ്ങളും സൗരോർജ്ജ വിളക്കുകളും ഉൾപ്പെടുന്ന മനോഹരമായ നടപ്പാതയാക്കി മാറ്റുക.",
    category: "environment",
    category_name: "Environment",
    category_name_ml: "പരിസ്ഥിതി",
    locality: "Devadhar",
    locality_ml: "ദേവധാർ",
    ward_number: 14,
    author_id: "usr-003",
    author_name: "Dr. Lakshmi S. (ഡോ. ലക്ഷ്മി)",
    is_anonymous: false,
    images: ["https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=1200&q=80"],
    expected_benefit: "Protects natural water flow, curbs mosquito breeding, stops roadside waste dumping, and offers a safe recreation zone for 1,200+ local families.",
    expected_benefit_ml: "നീരൊഴുക്ക് സുഗമമാക്കൽ, കൊതുകുശല്യം കുറയ്ക്കൽ, പുഴയോര മാലിന്യനിക്ഷേപം തടയൽ, പ്രഭാത സവാരിക്കാർക്ക് സുരക്ഷിത പാത.",
    estimated_cost: "₹12.00 Lakhs",
    estimated_cost_note: "Estimated volunteer community labor contribution + material procurement for landscaping.",
    status: "Accepted for Collaboration",
    status_reason: "Tanur Nature & Youth Society and Devadhar Residents Welfare Association formally accepted to partner on phase 1 sapling planting and cleaning.",
    status_reason_ml: "താനൂർ നേച്ചർ & യൂത്ത് സൊസൈറ്റിയും റസിഡന്റ്സ് അസോസിയേഷനും സംയുക്തമായി പദ്ധതി ഏറ്റെടുക്കാൻ തീരുമാനിച്ചു.",
    collaboration_record: {
      organization_name: "Tanur Nature & Youth Collective & Devadhar RWA",
      organization_type: "resident_association",
      accepted_date: "2026-03-08",
      contact_person: "K. Muralidharan (President, RWA)",
      collaboration_scope: "Community volunteer mobilisation for clearing weeds, planting 200 cassia fistula and neem saplings, and maintenance.",
      verification_note: "MOU signed between local club and residents group with intimation to Ward Councillor."
    },
    support_count: 98,
    supported_user_ids: ["usr-003", "usr-004", "usr-006"],
    supported_by_user: false,
    comments_count: 5,
    comments: [
      {
        id: "comm-03",
        idea_id: "idea-green-canal-walk",
        author_id: "usr-004",
        author_name: "Vinod Kumar (വിനോദ് കുമാർ)",
        content: "We can mobilize NSS volunteers from nearby schools for the Sunday cleaning drive.",
        is_official: false,
        created_at: "2026-03-04T11:00:00Z"
      }
    ],
    timeline: [
      {
        id: "tl-04",
        status: "Submitted",
        title: "Proposal Submitted",
        title_ml: "നിർദ്ദേശം സമർപ്പിച്ചു",
        description: "Citizen proposed canal bank reclamation project.",
        date: "2026-02-20",
        actor: "Dr. Lakshmi S.",
        actor_role: "Resident"
      },
      {
        id: "tl-05",
        status: "Shortlisted",
        title: "Selected for Community Action",
        title_ml: "നടപടിക്കായി തിരഞ്ഞെടുത്തു",
        description: "Identified as high-impact environmental community initiative.",
        date: "2026-03-01",
        actor: "Civic Review Committee",
        actor_role: "Reviewer"
      },
      {
        id: "tl-06",
        status: "Accepted for Collaboration",
        title: "Partnership Agreement Formed",
        title_ml: "സഹകരണത്തിന് അംഗീകാരം നൽകി",
        description: "Devadhar RWA & Nature Collective agreed to execute phase 1.",
        date: "2026-03-08",
        actor: "RWA & Volunteers",
        actor_role: "Community Partner"
      }
    ],
    is_hidden: false,
    is_featured: true,
    created_at: "2026-02-20T10:00:00Z",
    updated_at: "2026-03-08T16:00:00Z"
  },
  {
    id: "idea-digital-library-rayiri",
    tracking_id: "TNR-PV-2026-003",
    title: "Youth Digital Library & Competitive Exam Reading Room at Rayirimangalam",
    title_ml: "രായിരിമംഗലത്ത് യുവജന ഡിജിറ്റൽ വായനശാലയും പി.എസ്.സി പഠന കേന്ദ്രവും",
    description: "Provide high-speed internet, 6 desktop computers, reference periodicals, and quiet reading desks for students preparing for PSC, UPSC, NEET, and banking exams. An existing unused community hall space at Rayirimangalam East can be converted with minimal furniture expenditure.",
    description_ml: "മത്സരപരീക്ഷകൾക്ക് തയ്യാറെടുക്കുന്ന പ്രദേശത്തെ വിദ്യാർത്ഥികൾക്കായി ഹൈസ്പീഡ് ഇന്റർനെറ്റ് സൗകര്യമുള്ള ഡിജിറ്റൽ ലൈബ്രറിയും റീഡിങ് റൂമും ഒരുക്കുക.",
    category: "education",
    category_name: "Education",
    category_name_ml: "വിദ്യാഭ്യാസം",
    locality: "Rayirimangalam",
    locality_ml: "രായിരിമംഗലം",
    ward_number: 1,
    author_id: "usr-005",
    author_name: "Fathima Suhara (ഫാത്തിമ സുഹറ)",
    is_anonymous: false,
    images: ["https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80"],
    expected_benefit: "Affordable access to quality study materials and high-speed research facilities for over 180 rural aspirants every month.",
    expected_benefit_ml: "പ്രദേശത്തെ 180-ലധികം ഉദ്യോഗാർത്ഥികൾക്ക് സൗജന്യ പഠന സൗകര്യവും ഓൺലൈൻ ക്ലാസ് ലഭ്യതയും.",
    estimated_cost: "₹6.50 Lakhs",
    estimated_cost_note: "Community-sponsored desktop computers and study carrels estimate.",
    status: "In Progress",
    status_reason: "Refurbishment of the room commenced with crowd-donated books and community sponsorship for high-speed fiber broadband.",
    status_reason_ml: "മുറിയുടെ നവീകരണവും പുസ്തക ശേഖരണവും ഇന്റർനെറ്റ് കണക്ഷൻ സ്ഥാപിക്കലും ആരംഭിച്ചു.",
    support_count: 115,
    supported_user_ids: ["usr-001", "usr-005", "usr-007"],
    supported_by_user: true,
    comments_count: 6,
    comments: [
      {
        id: "comm-04",
        idea_id: "idea-digital-library-rayiri",
        author_id: "usr-007",
        author_name: "Sujith Narayanan",
        content: "We have pledged 50 standard PSC reference guides and current affairs digests from our alumni group.",
        is_official: false,
        created_at: "2026-03-02T15:20:00Z"
      }
    ],
    timeline: [
      {
        id: "tl-07",
        status: "Submitted",
        title: "Idea Proposed",
        title_ml: "നിർദ്ദേശം സമർപ്പിച്ചു",
        description: "Fathima Suhara shared study room requirement.",
        date: "2026-01-15",
        actor: "Fathima Suhara",
        actor_role: "Student Representative"
      },
      {
        id: "tl-08",
        status: "In Progress",
        title: "Work Commenced",
        title_ml: "പഠനമുറി തയ്യാറാക്കൽ ആരംഭിച്ചു",
        description: "Community collective secured permission and started electrical cabling.",
        date: "2026-03-10",
        actor: "Library Committee",
        actor_role: "Implementation Team"
      }
    ],
    is_hidden: false,
    is_featured: true,
    created_at: "2026-01-15T08:00:00Z",
    updated_at: "2026-03-10T11:00:00Z"
  },
  {
    id: "idea-smart-waste-station",
    tracking_id: "TNR-PV-2026-004",
    title: "Automated Dry Waste Segregation Kiosk at Tanur Railway Station Road",
    title_ml: "താനൂർ റെയിൽവേ സ്റ്റേഷൻ റോഡിൽ സ്മാർട്ട് ഡ്രൈ വേസ്റ്റ് കിയോസ്ക്",
    description: "Install an intelligent smart bin facility where citizens deposit clean plastic bottles, e-waste, and dry cardboard with barcode reward tracking to incentivize cleanliness and support Haritha Karma Sena.",
    description_ml: "റെയിൽവേ സ്റ്റേഷൻ പരിസരത്ത് പ്ലാസ്റ്റിക് കുപ്പികളും ഇ-മാലിന്യങ്ങളും ശേഖരിക്കാൻ പ്രോത്സാഹന പോയിന്റുകളോടെയുള്ള ഓട്ടോമേറ്റഡ് ബിൻ സൗകര്യം ഏർപ്പെടുത്തുക.",
    category: "waste_cleanliness",
    category_name: "Cleanliness & Waste Management",
    category_name_ml: "മാലിന്യ സംസ്കരണവും ശുചിത്വവും",
    locality: "Tanur Town",
    locality_ml: "താനൂർ ടൗൺ",
    ward_number: 10,
    author_id: "usr-008",
    author_name: "Anas Meenadathur (അനസ്)",
    is_anonymous: false,
    images: ["https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80"],
    expected_benefit: "Keeps railway approach spotless and collects 800+ kg clean recyclable PET per month.",
    expected_benefit_ml: "റെയിൽവേ പരിസരം മാലിന്യമുക്തമാക്കുകയും പ്രതിമാസം 800 കിലോ പ്ലാസ്റ്റിക് പുനരുപയോഗത്തിനായി നൽകുകയും ചെയ്യുന്നു.",
    estimated_cost: "₹4.20 Lakhs",
    status: "Under Review",
    status_reason: "Technical specifications being reviewed for power hookup feasibility and sensor maintenance protocol.",
    status_reason_ml: "വൈദ്യുതി ലഭ്യതയും മെയിന്റനൻസും സാങ്കേതിക സമിതി പരിശോധിക്കുന്നു.",
    support_count: 67,
    supported_user_ids: ["usr-008"],
    supported_by_user: false,
    comments_count: 3,
    comments: [],
    timeline: [
      {
        id: "tl-09",
        status: "Submitted",
        title: "Idea Submitted",
        title_ml: "നിർദ്ദേശം സമർപ്പിച്ചു",
        description: "Submitted for municipal town cleanliness enhancement.",
        date: "2026-03-01",
        actor: "Anas M.",
        actor_role: "Citizen"
      },
      {
        id: "tl-10",
        status: "Under Review",
        title: "Under Administrative Review",
        title_ml: "പരിശോധനയിൽ",
        description: "Checking alignment with Haritha Karma Sena collection timetable.",
        date: "2026-03-06",
        actor: "Cleanliness Desk",
        actor_role: "Moderator"
      }
    ],
    is_hidden: false,
    created_at: "2026-03-01T12:00:00Z",
    updated_at: "2026-03-06T15:00:00Z"
  },
  {
    id: "idea-water-quality-kiosks",
    tracking_id: "TNR-PV-2026-005",
    title: "Open Public Water Salinity & Quality Testing Hubs for Coastal Wards",
    title_ml: "തീരദേശ വാർഡുകളിൽ സൗജന്യ കുടിവെള്ള ഗുണനിലവാര പരിശോധനാ കേന്ദ്രം",
    description: "Equip local health sub-centers in beach localities with digital TDS and salinity meters so residents can periodically test their domestic well water before consumption, especially during dry summer months.",
    description_ml: "വേനൽക്കാലത്ത് തീരദേശത്തെ വീടുകളിലെ കിണറുകളിലെ ഉപ്പുരസവും ഗുണനിലവാരവും സൗജന്യമായി പരിശോധിക്കാൻ ആരോഗ്യ കേന്ദ്രങ്ങളിൽ ഡിജിറ്റൽ മീറ്ററുകൾ സജ്ജമാക്കുക.",
    category: "healthcare",
    category_name: "Healthcare",
    category_name_ml: "ആരോഗ്യം",
    locality: "Theeradesham (Beach)",
    locality_ml: "തീരദേശം",
    ward_number: 3,
    author_id: "usr-009",
    author_name: "Aisha Beevi (ആയിഷ ബീവി)",
    is_anonymous: false,
    images: ["https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1200&q=80"],
    expected_benefit: "Early detection of groundwater salinity intrusion and water-borne pathogens for 3,000 households.",
    expected_benefit_ml: "കുടിവെള്ളത്തിലെ ഉപ്പുരസവും രോഗാണുസാന്നിധ്യവും നേരത്തെ കണ്ടെത്തി പകർച്ചവ്യാധികൾ തടയൽ.",
    estimated_cost: "₹1.80 Lakhs",
    status: "Submitted",
    status_reason: "Newly submitted idea awaiting moderation screening.",
    status_reason_ml: "പുതിയ നിർദ്ദേശം മോഡറേഷൻ പരിശോധനയ്ക്കായി കാത്തിരിക്കുന്നു.",
    support_count: 34,
    supported_user_ids: ["usr-009"],
    supported_by_user: false,
    comments_count: 2,
    comments: [],
    timeline: [
      {
        id: "tl-11",
        status: "Submitted",
        title: "Submitted by Resident",
        title_ml: "നിർദ്ദേശം സമർപ്പിച്ചു",
        description: "Registered by Aisha Beevi from Ward 3.",
        date: "2026-03-14",
        actor: "Aisha Beevi",
        actor_role: "Resident"
      }
    ],
    is_hidden: false,
    created_at: "2026-03-14T08:30:00Z",
    updated_at: "2026-03-14T08:30:00Z"
  },
  {
    id: "idea-inclusive-park-karianode",
    tracking_id: "TNR-PV-2026-006",
    title: "Children's Inclusive Play Corner & Sensory Garden at Karianode",
    title_ml: "കരിയാനോട് കുട്ടികൾക്കായുള്ള ഇൻക്ലൂസീവ് കളിസ്ഥലവും പൂന്തോട്ടവും",
    description: "Construct wheelchair-accessible swings, sensory herb gardens, and rubberized play surfaces adjacent to the pre-school grounds in Karianode for differently-abled and neurodivergent children.",
    description_ml: "ഭിന്നശേഷിയുള്ള കുട്ടികൾക്ക് കൂടി ആസ്വദിക്കാൻ സാധിക്കുന്ന സുരക്ഷിതമായ കളിസ്ഥലവും പ്രത്യേക പൂന്തോട്ടവും നിർമ്മിക്കുക.",
    category: "public_facilities",
    category_name: "Public Facilities",
    category_name_ml: "പൊതു സൗകര്യങ്ങൾ",
    locality: "Karianode",
    locality_ml: "കരിയാനോട്",
    ward_number: 22,
    author_id: "usr-010",
    author_name: "P. V. Gopinathan Master",
    is_anonymous: false,
    images: ["https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1200&q=80"],
    expected_benefit: "Inclusive recreation for over 200 children across Wards 21, 22, and 23.",
    expected_benefit_ml: "എല്ലാ വിഭാഗം കുട്ടികൾക്കും ഒരുമിച്ചു കളിക്കാനും ഇടപഴകാനുമുള്ള തുല്യാവസര സൗകര്യം.",
    estimated_cost: "₹8.00 Lakhs",
    status: "Completed",
    status_reason: "Successfully installed and inaugurated with community crowd-funding and Rotary Club Tanur backing.",
    status_reason_ml: "പൊതുജന പങ്കാളിത്തത്തോടും ക്ലബ്ബ് സഹകരണത്തോടും കൂടി വിജയകരമായി പൂർത്തീകരിച്ചു.",
    support_count: 178,
    supported_user_ids: ["usr-001", "usr-003", "usr-010"],
    supported_by_user: true,
    comments_count: 11,
    comments: [
      {
        id: "comm-05",
        idea_id: "idea-inclusive-park-karianode",
        author_id: "usr-011",
        author_name: "Sreedevi Nair",
        content: "Our children are loving the newly opened sensory play area. Truly commendable effort!",
        is_official: false,
        created_at: "2026-02-18T14:00:00Z"
      }
    ],
    timeline: [
      {
        id: "tl-12",
        status: "Submitted",
        title: "Idea Proposed",
        title_ml: "നിർദ്ദേശം സമർപ്പിച്ചു",
        date: "2025-10-10",
        description: "Gopinathan Master proposed inclusive play facility.",
        actor: "Gopinathan Master",
        actor_role: "Educator"
      },
      {
        id: "tl-13",
        status: "Accepted for Collaboration",
        title: "Partnership Confirmed",
        title_ml: "പങ്കാളിത്തം ഉറപ്പിച്ചു",
        date: "2025-11-05",
        description: "Tanur Philanthropic Society backed the funding.",
        actor: "Rotary & Residents",
        actor_role: "Donor Partner"
      },
      {
        id: "tl-14",
        status: "Completed",
        title: "Project Completed & Opened",
        title_ml: "പദ്ധതി പൂർത്തിയായി നാടിന് സമർപ്പിച്ചു",
        date: "2026-02-10",
        description: "Park inaugurated with community participation.",
        actor: "Ward Representative",
        actor_role: "Municipal Ward Member"
      }
    ],
    is_hidden: false,
    is_featured: false,
    created_at: "2025-10-10T09:00:00Z",
    updated_at: "2026-02-10T16:00:00Z"
  },
  {
    id: "idea-flyover-town-bypass",
    tracking_id: "TNR-PV-2026-007",
    title: "Elevated 4-Lane Flyover Over Tanur Town Market Junction",
    title_ml: "താനൂർ ടൗൺ മാർക്കറ്റ് ജംഗ്ഷനിൽ നാലുവരി ഫ്ലൈഓവർ നിർമ്മാണം",
    description: "Proposal to construct an elevated multi-lane flyover above the current congested town market to clear traffic between Tirur Road and Parappanangali coastal corridor.",
    description_ml: "താനൂർ ടൗണിലെ ഗതാഗതക്കുരുക്ക് പരിഹരിക്കാൻ നാലുവരി എലിവേറ്റഡ് മേൽപ്പാലം നിർമ്മിക്കുക.",
    category: "roads_transport",
    category_name: "Roads & Transportation",
    category_name_ml: "റോഡുകളും ഗതാഗതവും",
    locality: "Tanur Town",
    locality_ml: "താനൂർ ടൗൺ",
    ward_number: 8,
    author_id: "usr-012",
    author_name: "Anonymous Citizen (താനൂർ നിവാസി)",
    is_anonymous: true,
    images: [],
    expected_benefit: "Easing peak hour jams in market.",
    expected_benefit_ml: "മാർക്കറ്റ് ജംഗ്ഷനിലെ ഗതാഗതക്കുരുക്ക് ലഘൂകരിക്കൽ.",
    estimated_cost: "₹85.00 Cr",
    status: "Not Proceeding",
    status_reason: "Town planning appraisal determined that the upcoming Tanur Railway Overbridge (ROB) and Coastal Ring Bypass already absorb heavy transit traffic; an elevated market flyover is structurally infeasible given the dense market shop frontage.",
    status_reason_ml: "നിലവിലെ താനൂർ റെയിൽവേ ഓവർബ്രിഡ്ജും റിംഗ് റോഡും ഗതാഗതക്കുരുക്ക് പരിഹരിക്കാൻ പര്യാപ്തമായതിനാലും കടകൾ കാരണം സ്ഥലം ലഭ്യമല്ലാത്തതിനാലും ഈ നിർദ്ദേശം പ്രായോഗികമല്ലെന്ന് കണ്ടെത്തി.",
    support_count: 19,
    supported_user_ids: [],
    supported_by_user: false,
    comments_count: 4,
    comments: [],
    timeline: [
      {
        id: "tl-15",
        status: "Submitted",
        title: "Submitted",
        title_ml: "സമർപ്പിച്ചു",
        date: "2025-11-20",
        description: "Idea submitted anonymously.",
        actor: "Citizen",
        actor_role: "Resident"
      },
      {
        id: "tl-16",
        status: "Not Proceeding",
        title: "Reviewed and Closed with Explanation",
        title_ml: "പരിശോധിച്ച് കാരണം വ്യക്തമാക്കി തുടർനടപടി ഒഴിവാക്കി",
        date: "2025-12-15",
        description: "Closed with detailed engineering rationale regarding Coastal Bypass alternative.",
        actor: "Traffic Engineering Sub-Committee",
        actor_role: "Municipal Advisory"
      }
    ],
    is_hidden: false,
    created_at: "2025-11-20T10:00:00Z",
    updated_at: "2025-12-15T12:00:00Z"
  }
];

// -------------------------------------------------------------
// 3. INITIAL COMMUNITY DISCUSSIONS
// -------------------------------------------------------------

export const INITIAL_COMMUNITY_DISCUSSIONS: CommunityDiscussion[] = [
  {
    id: "disc-01",
    title: "How can we make Tanur's beaches clean, tourist-friendly, and plastic-free?",
    title_ml: "താനൂർ ബീച്ച് പ്ലാസ്റ്റിക് മുക്തവും വിനോദസഞ്ചാര സൗഹൃദവുമാക്കാൻ എന്തെല്ലാം ചെയ്യാം?",
    body: "Tanur Beach has immense natural beauty and maritime charm, but plastic litter left behind on weekends is concerning. What practical solutions can we implement through community self-regulation, youth monitoring squads, and segregated bins?",
    category: "environment",
    category_name: "Environment & Green Spaces",
    category_name_ml: "പരിസ്ഥിതിയും ഹരിതമേഖലയും",
    author_id: "usr-002",
    author_name: "Rashid Ali (റഷീദ് അലി)",
    locality: "Theeradesham (Beach)",
    tags: ["CleanTanur", "EcoTourism", "WasteManagement", "BeachProtection"],
    likes_count: 45,
    liked_user_ids: ["usr-001", "usr-002", "usr-003"],
    liked_by_user: true,
    replies_count: 7,
    followed_user_ids: ["usr-001", "usr-002"],
    is_followed_by_user: true,
    is_pinned: true,
    is_closed: false,
    is_hidden: false,
    comments: [
      {
        id: "dcomm-01",
        discussion_id: "disc-01",
        author_id: "usr-001",
        author_name: "Hamza Koya P.",
        content: "Local boat owners can participate. If we designate designated deposit spots for tourist trash, vendors will ensure nobody throws bottles on sand.",
        likes_count: 12,
        is_official: false,
        created_at: "2026-03-01T10:00:00Z"
      },
      {
        id: "dcomm-02",
        discussion_id: "disc-01",
        author_id: "admin-001",
        author_name: "Tanur Civic Desk",
        content: "A volunteer cleanup initiative is scheduled for this coming Sunday. Details are posted in the Initiatives section.",
        likes_count: 19,
        is_official: true,
        official_role: "People's Voice Facilitator",
        created_at: "2026-03-02T11:30:00Z"
      }
    ],
    created_at: "2026-02-28T14:00:00Z",
    updated_at: "2026-03-02T11:30:00Z"
  },
  {
    id: "disc-02",
    title: "Improving morning bus connectivity from Tanur to Calicut University and Medical College",
    title_ml: "താനൂരിൽ നിന്ന് കാലിക്കറ്റ് യൂണിവേഴ്സിറ്റി, മെഡിക്കൽ കോളേജ് ഭാഗങ്ങളിലേക്ക് കൂടുതൽ ബസ് സർവീസുകൾ",
    body: "Every morning hundreds of college students and hospital visitors from Tanur struggle with packed buses. Can we collectively petition KSRTC for two dedicated fast passenger schedules from Tanur Railway station at 7:45 AM and 8:15 AM?",
    category: "local_development",
    category_name: "Local Development",
    category_name_ml: "പ്രാദേശിക വികസനം",
    author_id: "usr-005",
    author_name: "Fathima Suhara",
    locality: "Tanur Town",
    tags: ["PublicTransport", "KSRTC", "Students", "TanurCommute"],
    likes_count: 78,
    liked_user_ids: ["usr-001", "usr-005", "usr-007", "usr-008"],
    liked_by_user: true,
    replies_count: 12,
    followed_user_ids: ["usr-001", "usr-005"],
    is_followed_by_user: true,
    is_pinned: false,
    is_closed: false,
    is_hidden: false,
    comments: [
      {
        id: "dcomm-03",
        discussion_id: "disc-02",
        author_id: "usr-008",
        author_name: "Anas Meenadathur",
        content: "Ponnani - Parappanangadi route buses are completely packed by the time they reach Tanur. A depot-origin bus from Tanur is the only real fix.",
        likes_count: 15,
        is_official: false,
        created_at: "2026-03-03T09:15:00Z"
      }
    ],
    created_at: "2026-03-02T16:00:00Z",
    updated_at: "2026-03-03T09:15:00Z"
  },
  {
    id: "disc-03",
    title: "Preserving historical landmarks: Sobhaparambu and old port heritage sites",
    title_ml: "ശോഭാപറമ്പ് ഉൾപ്പെടെയുള്ള താനൂരിന്റെ ചരിത്ര സ്മാരകങ്ങളുടെ സംരക്ഷണം",
    body: "Tanur has rich medieval trade history and historic temple/mosque heritage. How can school clubs and cultural enthusiasts document local folklore and install bilingual heritage plaques?",
    category: "education",
    category_name: "Education & Youth",
    category_name_ml: "വിദ്യാഭ്യാസവും യുവജനങ്ങളും",
    author_id: "usr-010",
    author_name: "P. V. Gopinathan Master",
    locality: "Rayirimangalam",
    tags: ["Heritage", "History", "LocalCulture", "TanurSchools"],
    likes_count: 38,
    liked_user_ids: ["usr-010"],
    liked_by_user: false,
    replies_count: 4,
    followed_user_ids: [],
    is_followed_by_user: false,
    is_pinned: false,
    is_closed: false,
    is_hidden: false,
    comments: [],
    created_at: "2026-03-04T10:00:00Z",
    updated_at: "2026-03-04T10:00:00Z"
  }
];

// -------------------------------------------------------------
// 4. INITIAL LOCAL INITIATIVES (COMMUNITY-LED ACTIVITIES)
// -------------------------------------------------------------

export const INITIAL_LOCAL_INITIATIVES: LocalInitiative[] = [
  {
    id: "init-01",
    title: "Mega Coastal Cleanup & Marine Plastic Awareness Drive",
    title_ml: "മെഗാ തീരദേശ ശുചീകരണവും പ്ലാസ്റ്റിക് വിമുക്ത ബോധവൽക്കരണവും",
    description: "Join fellow residents, student volunteers, and coastal youth clubs for a 3-hour weekend drive to clear marine debris along Tanur Beach and Harbor shoreline. Gloves, trash bags, and refreshments will be provided.",
    description_ml: "താനൂർ ബീച്ചും ഹാർബർ പരിസരവും ശുചീകരിക്കാൻ സംഘടിപ്പിക്കുന്ന ബൃഹദ് ജനകീയ യജ്ഞം. എല്ലാ സന്നദ്ധപ്രവർത്തകർക്കും സ്വാഗതം.",
    category: "cleanliness",
    category_name: "Cleanliness Campaign",
    category_name_ml: "ശുചിത്വ യജ്ഞം",
    organizer_name: "Tanur Coastal Youth Collective & Haritha Sena",
    organizer_id: "usr-001",
    organizer_type: "community_group",
    locality: "Theeradesham (Beach)",
    locality_ml: "തീരദേശം",
    venue_address: "Tanur Beach Near Fish Landing Point, Ward 4",
    event_date: "2026-03-22",
    event_time: "06:30 AM - 09:30 AM",
    participation_instructions: "Wear sturdy shoes and cotton clothes. Drinking water will be provided in reusable dispensers (bring personal water bottles). All volunteers receive a digital Certificate of Participation.",
    contact_details: "Authorized Coordinator Phone: 0494-2440228 / volunteer.tanur@gmail.com",
    contact_phone: "9447123456",
    contact_email: "volunteer.tanur@gmail.com",
    images: ["https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=1200&q=80"],
    participant_count: 84,
    participant_user_ids: ["usr-001", "usr-002", "usr-003", "usr-005"],
    is_participating_by_user: true,
    status: "upcoming",
    progress_updates: [
      {
        id: "upd-01",
        date: "2026-03-10",
        title: "Garbage collection logistics finalized with Haritha Karma Sena",
        notes: "Municipal recovery vehicle arranged for immediate segregation of recovered plastic and glass waste."
      }
    ],
    is_approved: true,
    created_at: "2026-03-01T08:00:00Z",
    updated_at: "2026-03-10T12:00:00Z"
  },
  {
    id: "init-02",
    title: "Green Tanur: 500 Shade Trees & Mangrove Sapling Plantation",
    title_ml: "ഹരിത താനൂർ: 500 തണൽമരങ്ങളും കണ്ടൽച്ചെടികളും നടീൽ യജ്ഞം",
    description: "Planting shade saplings along railway overbridge approach and mangrove propagules along the estuarine canal bunds to combat soil erosion and beat summer heat.",
    description_ml: "താനൂർ താലൂക്ക് പരിസരങ്ങളിലും റെയിൽവേ സമീപത്തും തണൽമരങ്ങളും തോട്ടുതീരത്ത് കണ്ടൽച്ചെടികളും നട്ടുപിടിപ്പിക്കുന്നു.",
    category: "tree_planting",
    category_name: "Tree Planting & Nature",
    category_name_ml: "വൃക്ഷത്തൈ നടീലും പരിസ്ഥിതിയും",
    organizer_name: "Tanur Nature Conservation Society",
    organizer_id: "usr-003",
    organizer_type: "ngo",
    locality: "Devadhar & Rayirimangalam",
    venue_address: "Devadhar Higher Secondary Ground & Canal Bank",
    event_date: "2026-03-29",
    event_time: "07:00 AM - 10:30 AM",
    participation_instructions: "Volunteers of all age groups welcome. Gardening tools and saplings provided on site.",
    contact_details: "Office of Tanur Nature Conservation Society / nature.tanur@gmail.com",
    images: ["https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80"],
    participant_count: 52,
    participant_user_ids: ["usr-003", "usr-004"],
    is_participating_by_user: false,
    status: "upcoming",
    progress_updates: [],
    is_approved: true,
    created_at: "2026-03-05T09:00:00Z",
    updated_at: "2026-03-05T09:00:00Z"
  },
  {
    id: "init-03",
    title: "Free Weekend Science & English Mentorship for SSLC Students",
    title_ml: "എസ്.എസ്.എൽ.സി വിദ്യാർത്ഥികൾക്കായി സൗജന്യ വാരാന്ത്യ മെന്റർഷിപ്പ്",
    description: "College graduates and working professionals providing free weekend revision, confidence-building, and science experiment demonstrations for coastal school students.",
    description_ml: "തീരദേശത്തെ പത്താം ക്ലാസ് വിദ്യാർത്ഥികൾക്ക് സയൻസ്, ഇംഗ്ലീഷ് വിഷയങ്ങളിൽ പരിചയസമ്പന്നരായ അധ്യാപകരും ബിരുദധാരികളും നൽകുന്ന സൗജന്യ ക്ലാസ്.",
    category: "education_support",
    category_name: "Educational Support",
    category_name_ml: "വിദ്യാഭ്യാസ പിന്തുണ",
    organizer_name: "Rayirimangalam Study Circle",
    organizer_id: "usr-005",
    organizer_type: "youth_club",
    locality: "Rayirimangalam",
    venue_address: "Community Learning Hall, Rayirimangalam East",
    event_date: "2026-03-15",
    event_time: "09:00 AM - 01:00 PM",
    participation_instructions: "Both volunteer teachers and student participants can register for free.",
    contact_details: "Study Circle Desk: 9895123456",
    images: ["https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80"],
    participant_count: 36,
    participant_user_ids: ["usr-005", "usr-007"],
    is_participating_by_user: false,
    status: "ongoing",
    progress_updates: [
      {
        id: "upd-02",
        date: "2026-03-08",
        title: "Session 1 Completed with 32 Students",
        notes: "Physics ray diagram and English grammar fundamentals covered with positive student feedback."
      }
    ],
    is_approved: true,
    created_at: "2026-02-25T11:00:00Z",
    updated_at: "2026-03-08T18:00:00Z"
  }
];

// -------------------------------------------------------------
// 5. INITIAL AUDIT LOGS & REPORTS
// -------------------------------------------------------------

export const INITIAL_PEOPLES_VOICE_AUDIT_LOGS: PeoplesVoiceAuditLog[] = [
  {
    id: "alog-01",
    actor_id: "admin-001",
    actor_name: "Chief Civic Moderator",
    actor_role: "Administrator",
    action: "status_changed",
    target_type: "idea",
    target_id: "idea-solar-harbour",
    target_title: "Solar-Powered Fish Drying & Cold Storage Shed",
    details: "Status updated to 'Forwarded for Consideration' with Matsyafed Reference MF-MLP/TNR/PV-2026/889",
    timestamp: "2026-03-12T14:15:00Z"
  },
  {
    id: "alog-02",
    actor_id: "admin-001",
    actor_name: "Civic Moderator",
    actor_role: "Moderator",
    action: "initiative_approved",
    target_type: "initiative",
    target_id: "init-01",
    target_title: "Mega Coastal Cleanup & Marine Plastic Awareness Drive",
    details: "Approved community initiative after verifying venue safety and municipality sanitation coordination",
    timestamp: "2026-03-02T10:00:00Z"
  }
];

export const INITIAL_CONTENT_REPORTS: ContentReport[] = [
  {
    id: "rep-01",
    content_type: "discussion",
    content_id: "disc-02",
    content_title: "Bus Connectivity Discussion",
    reporter_id: "usr-020",
    reporter_name: "Local Commuter",
    reason: "misleading",
    details: "One commenter posted outdated bus schedule numbers from 2021 that might confuse passengers.",
    status: "pending",
    created_at: "2026-03-13T10:00:00Z"
  }
];

// -------------------------------------------------------------
// 6. CENTRAL DATA STORE CLASS
// -------------------------------------------------------------

export class PeoplesVoiceStore {
  private ideas: CommunityIdea[] = [...INITIAL_COMMUNITY_IDEAS];
  private discussions: CommunityDiscussion[] = [...INITIAL_COMMUNITY_DISCUSSIONS];
  private initiatives: LocalInitiative[] = [...INITIAL_LOCAL_INITIATIVES];
  private reports: ContentReport[] = [...INITIAL_CONTENT_REPORTS];
  private auditLogs: PeoplesVoiceAuditLog[] = [...INITIAL_PEOPLES_VOICE_AUDIT_LOGS];

  // ---------------- Community Ideas ----------------

  getIdeas(filter?: {
    category?: IdeaCategory | "all";
    status?: IdeaStatus | "all";
    locality?: string;
    wardNumber?: number;
    search?: string;
    sortBy?: "supported" | "newest" | "comments";
    includeHidden?: boolean;
  }): CommunityIdea[] {
    let res = this.ideas.filter(i => filter?.includeHidden ? true : !i.is_hidden);

    if (filter?.category && filter.category !== "all") {
      res = res.filter(i => i.category === filter.category);
    }

    if (filter?.status && filter.status !== "all") {
      res = res.filter(i => i.status === filter.status);
    }

    if (filter?.locality && filter.locality !== "all") {
      const locQ = filter.locality.toLowerCase();
      res = res.filter(i => 
        i.locality.toLowerCase().includes(locQ) || 
        (i.locality_ml && i.locality_ml.toLowerCase().includes(locQ))
      );
    }

    if (filter?.wardNumber !== undefined && filter.wardNumber > 0) {
      res = res.filter(i => i.ward_number === filter.wardNumber);
    }

    if (filter?.search && filter.search.trim()) {
      const q = filter.search.toLowerCase();
      res = res.filter(i => 
        i.title.toLowerCase().includes(q) ||
        i.title_ml.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q) ||
        i.description_ml.toLowerCase().includes(q) ||
        i.locality.toLowerCase().includes(q) ||
        i.author_name.toLowerCase().includes(q) ||
        i.tracking_id.toLowerCase().includes(q)
      );
    }

    if (filter?.sortBy === "supported") {
      return res.sort((a, b) => b.support_count - a.support_count);
    }

    if (filter?.sortBy === "comments") {
      return res.sort((a, b) => b.comments_count - a.comments_count);
    }

    // Default newest first
    return res.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  getIdeaById(id: string): CommunityIdea | null {
    const item = this.ideas.find(i => i.id === id || i.tracking_id === id);
    return item ? { ...item } : null;
  }

  addIdea(data: Omit<CommunityIdea, "id" | "tracking_id" | "support_count" | "supported_user_ids" | "comments_count" | "comments" | "timeline" | "is_hidden" | "created_at" | "updated_at">): CommunityIdea {
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const trackingId = `TNR-PV-2026-${randomSuffix}`;
    const now = new Date().toISOString();

    const newIdea: CommunityIdea = {
      ...data,
      id: "idea-" + Date.now(),
      tracking_id: trackingId,
      support_count: 1, // author initial support
      supported_user_ids: [data.author_id],
      supported_by_user: true,
      comments_count: 0,
      comments: [],
      is_hidden: false,
      created_at: now,
      updated_at: now,
      timeline: [
        {
          id: "tl-" + Date.now(),
          status: data.status || "Submitted",
          title: "Idea Submitted by Citizen",
          title_ml: "നിർദ്ദേശം സമർപ്പിച്ചു",
          description: `${data.author_name} submitted proposal '${data.title}' for Tanur community development.`,
          date: now.split("T")[0],
          actor: data.author_name,
          actor_role: "Resident"
        }
      ]
    };

    this.ideas.unshift(newIdea);
    this.addAuditLog({
      actor_id: data.author_id,
      actor_name: data.author_name,
      actor_role: "Resident",
      action: "idea_approved",
      target_type: "idea",
      target_id: newIdea.id,
      target_title: newIdea.title,
      details: `New community idea submitted with tracking ID ${trackingId}`
    });

    return newIdea;
  }

  toggleIdeaSupport(ideaId: string, userId: string): { supported: boolean; newCount: number } | null {
    const idea = this.ideas.find(i => i.id === ideaId);
    if (!idea) return null;

    const hasSupported = idea.supported_user_ids.includes(userId);

    if (hasSupported) {
      // Remove support
      idea.supported_user_ids = idea.supported_user_ids.filter(id => id !== userId);
      idea.support_count = Math.max(0, idea.support_count - 1);
      idea.supported_by_user = false;
    } else {
      // Add support
      idea.supported_user_ids.push(userId);
      idea.support_count += 1;
      idea.supported_by_user = true;

      // Automatic milestone: If reaching 50 supports and status is 'Submitted', transition to 'Community Discussion'
      if (idea.support_count >= 50 && idea.status === "Submitted") {
        idea.status = "Community Discussion";
        idea.status_reason = "Community interest reached 50+ resident endorsements; opened for active public discussion.";
        idea.status_reason_ml = "50-ൽ അധികം ആളുകളുടെ പിന്തുണ ലഭിച്ചതിനാൽ പൊതുചർച്ചയ്ക്കായി തിരഞ്ഞെടുത്തു.";
        idea.timeline.push({
          id: "tl-" + Date.now(),
          status: "Community Discussion",
          title: "Public Discussion Milestone Reached",
          title_ml: "പൊതു ചർച്ചാ ഘട്ടത്തിലേക്ക് കടന്നു",
          description: "Endorsed by 50+ residents across Tanur.",
          date: new Date().toISOString().split("T")[0],
          actor: "Platform System",
          actor_role: "Community Engagement"
        });
      }
    }

    idea.updated_at = new Date().toISOString();
    return { supported: !hasSupported, newCount: idea.support_count };
  }

  toggleIdeaFollow(ideaId: string, userId: string): boolean {
    const idea = this.ideas.find(i => i.id === ideaId);
    if (!idea) return false;

    if (!idea.followed_user_ids) idea.followed_user_ids = [];
    const idx = idea.followed_user_ids.indexOf(userId);
    if (idx > -1) {
      idea.followed_user_ids.splice(idx, 1);
      idea.is_followed_by_user = false;
    } else {
      idea.followed_user_ids.push(userId);
      idea.is_followed_by_user = true;
    }
    return idea.is_followed_by_user;
  }

  addIdeaComment(ideaId: string, commentData: {
    author_id: string;
    author_name: string;
    author_avatar?: string;
    content: string;
    is_official?: boolean;
    official_role?: string;
  }): IdeaComment | null {
    const idea = this.ideas.find(i => i.id === ideaId);
    if (!idea) return null;

    const newComment: IdeaComment = {
      id: "icomm-" + Date.now(),
      idea_id: ideaId,
      author_id: commentData.author_id,
      author_name: commentData.author_name,
      author_avatar: commentData.author_avatar,
      content: commentData.content,
      is_official: commentData.is_official || false,
      official_role: commentData.official_role,
      created_at: new Date().toISOString()
    };

    idea.comments.push(newComment);
    idea.comments_count = idea.comments.length;
    idea.updated_at = new Date().toISOString();
    return newComment;
  }

  updateIdeaStatus(
    ideaId: string,
    newStatus: IdeaStatus,
    actorName: string,
    actorRole: string,
    notes?: string,
    forwardedRecord?: IdeaForwardingRecord,
    collaborationRecord?: IdeaCollaborationRecord
  ): boolean {
    const idea = this.ideas.find(i => i.id === ideaId);
    if (!idea) return false;

    const oldStatus = idea.status;
    idea.status = newStatus;
    idea.updated_at = new Date().toISOString();

    if (notes) {
      idea.status_reason = notes;
    }

    if (forwardedRecord) {
      idea.forwarded_record = forwardedRecord;
    }

    if (collaborationRecord) {
      idea.collaboration_record = collaborationRecord;
    }

    idea.timeline.push({
      id: "tl-" + Date.now(),
      status: newStatus,
      title: `Status updated to ${newStatus}`,
      title_ml: `സ്റ്റാറ്റസ് ${newStatus} ലേക്ക് മാറ്റി`,
      description: notes || `Status changed from ${oldStatus} to ${newStatus}`,
      date: new Date().toISOString().split("T")[0],
      actor: actorName,
      actor_role: actorRole
    });

    this.addAuditLog({
      actor_id: "mod-001",
      actor_name: actorName,
      actor_role: actorRole,
      action: "status_changed",
      target_type: "idea",
      target_id: idea.id,
      target_title: idea.title,
      details: `Status changed from ${oldStatus} to ${newStatus}. Note: ${notes || "None"}`
    });

    return true;
  }

  hideIdea(ideaId: string, isHidden: boolean, actorName: string): boolean {
    const idea = this.ideas.find(i => i.id === ideaId);
    if (!idea) return false;
    idea.is_hidden = isHidden;
    idea.updated_at = new Date().toISOString();

    this.addAuditLog({
      actor_id: "mod-001",
      actor_name: actorName,
      actor_role: "Moderator",
      action: isHidden ? "content_hidden" : "content_restored",
      target_type: "idea",
      target_id: idea.id,
      target_title: idea.title,
      details: isHidden ? "Idea hidden from public view" : "Idea restored to public view"
    });

    return true;
  }

  // ---------------- Community Discussions ----------------

  getDiscussions(filter?: {
    category?: DiscussionCategory | "all";
    search?: string;
    sortBy?: "popular" | "active" | "newest";
  }): CommunityDiscussion[] {
    let res = this.discussions.filter(d => !d.is_hidden);

    if (filter?.category && filter.category !== "all") {
      res = res.filter(d => d.category === filter.category);
    }

    if (filter?.search && filter.search.trim()) {
      const q = filter.search.toLowerCase();
      res = res.filter(d =>
        d.title.toLowerCase().includes(q) ||
        (d.title_ml && d.title_ml.toLowerCase().includes(q)) ||
        d.body.toLowerCase().includes(q) ||
        d.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    if (filter?.sortBy === "popular") {
      return res.sort((a, b) => b.likes_count - a.likes_count);
    }

    if (filter?.sortBy === "active") {
      return res.sort((a, b) => b.replies_count - a.replies_count);
    }

    return res.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  getDiscussionById(id: string): CommunityDiscussion | null {
    const disc = this.discussions.find(d => d.id === id);
    return disc ? { ...disc } : null;
  }

  addDiscussion(data: Omit<CommunityDiscussion, "id" | "likes_count" | "liked_user_ids" | "replies_count" | "followed_user_ids" | "is_pinned" | "is_closed" | "is_hidden" | "comments" | "created_at" | "updated_at">): CommunityDiscussion {
    const now = new Date().toISOString();
    const newDisc: CommunityDiscussion = {
      ...data,
      id: "disc-" + Date.now(),
      likes_count: 1,
      liked_user_ids: [data.author_id],
      liked_by_user: true,
      replies_count: 0,
      followed_user_ids: [data.author_id],
      is_followed_by_user: true,
      is_pinned: false,
      is_closed: false,
      is_hidden: false,
      comments: [],
      created_at: now,
      updated_at: now
    };

    this.discussions.unshift(newDisc);
    return newDisc;
  }

  toggleDiscussionLike(discussionId: string, userId: string): boolean {
    const disc = this.discussions.find(d => d.id === discussionId);
    if (!disc) return false;

    const idx = disc.liked_user_ids.indexOf(userId);
    if (idx > -1) {
      disc.liked_user_ids.splice(idx, 1);
      disc.likes_count = Math.max(0, disc.likes_count - 1);
      disc.liked_by_user = false;
    } else {
      disc.liked_user_ids.push(userId);
      disc.likes_count += 1;
      disc.liked_by_user = true;
    }
    disc.updated_at = new Date().toISOString();
    return disc.liked_by_user;
  }

  toggleDiscussionFollow(discussionId: string, userId: string): boolean {
    const disc = this.discussions.find(d => d.id === discussionId);
    if (!disc) return false;

    const idx = disc.followed_user_ids.indexOf(userId);
    if (idx > -1) {
      disc.followed_user_ids.splice(idx, 1);
      disc.is_followed_by_user = false;
    } else {
      disc.followed_user_ids.push(userId);
      disc.is_followed_by_user = true;
    }
    return disc.is_followed_by_user;
  }

  addDiscussionComment(discussionId: string, commentData: {
    author_id: string;
    author_name: string;
    author_avatar?: string;
    content: string;
    parent_comment_id?: string;
    is_official?: boolean;
    official_role?: string;
  }): DiscussionComment | null {
    const disc = this.discussions.find(d => d.id === discussionId);
    if (!disc) return null;

    const newComment: DiscussionComment = {
      id: "dcomm-" + Date.now(),
      discussion_id: discussionId,
      author_id: commentData.author_id,
      author_name: commentData.author_name,
      author_avatar: commentData.author_avatar,
      content: commentData.content,
      parent_comment_id: commentData.parent_comment_id,
      likes_count: 0,
      is_official: commentData.is_official || false,
      official_role: commentData.official_role,
      created_at: new Date().toISOString()
    };

    disc.comments.push(newComment);
    disc.replies_count = disc.comments.length;
    disc.updated_at = new Date().toISOString();
    return newComment;
  }

  // ---------------- Local Initiatives ----------------

  getInitiatives(filter?: {
    category?: InitiativeCategory | "all";
    status?: 'upcoming' | 'ongoing' | 'completed' | 'cancelled' | "all";
    locality?: string;
    search?: string;
  }): LocalInitiative[] {
    let res = this.initiatives.filter(i => i.is_approved);

    if (filter?.category && filter.category !== "all") {
      res = res.filter(i => i.category === filter.category);
    }

    if (filter?.status && filter.status !== "all") {
      res = res.filter(i => i.status === filter.status);
    }

    if (filter?.locality && filter.locality !== "all") {
      const locQ = filter.locality.toLowerCase();
      res = res.filter(i => i.locality.toLowerCase().includes(locQ));
    }

    if (filter?.search && filter.search.trim()) {
      const q = filter.search.toLowerCase();
      res = res.filter(i =>
        i.title.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q) ||
        i.organizer_name.toLowerCase().includes(q)
      );
    }

    return res.sort((a, b) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime());
  }

  getInitiativeById(id: string): LocalInitiative | null {
    const init = this.initiatives.find(i => i.id === id);
    return init ? { ...init } : null;
  }

  addInitiative(data: Omit<LocalInitiative, "id" | "participant_count" | "participant_user_ids" | "progress_updates" | "is_approved" | "created_at" | "updated_at">): LocalInitiative {
    const now = new Date().toISOString();
    const newInit: LocalInitiative = {
      ...data,
      id: "init-" + Date.now(),
      participant_count: 1,
      participant_user_ids: [data.organizer_id],
      is_participating_by_user: true,
      progress_updates: [],
      is_approved: true, // auto-approved or pending based on moderator role
      created_at: now,
      updated_at: now
    };

    this.initiatives.unshift(newInit);
    this.addAuditLog({
      actor_id: data.organizer_id,
      actor_name: data.organizer_name,
      actor_role: "Initiative Lead",
      action: "initiative_approved",
      target_type: "initiative",
      target_id: newInit.id,
      target_title: newInit.title,
      details: `New local initiative published for ${newInit.event_date}`
    });

    return newInit;
  }

  toggleInitiativeParticipation(initiativeId: string, userId: string): boolean {
    const init = this.initiatives.find(i => i.id === initiativeId);
    if (!init) return false;

    const idx = init.participant_user_ids.indexOf(userId);
    if (idx > -1) {
      init.participant_user_ids.splice(idx, 1);
      init.participant_count = Math.max(0, init.participant_count - 1);
      init.is_participating_by_user = false;
    } else {
      init.participant_user_ids.push(userId);
      init.participant_count += 1;
      init.is_participating_by_user = true;
    }
    init.updated_at = new Date().toISOString();
    return init.is_participating_by_user;
  }

  addInitiativeUpdate(initiativeId: string, updateData: { title: string; notes: string; photos?: string[] }): boolean {
    const init = this.initiatives.find(i => i.id === initiativeId);
    if (!init) return false;

    const newUpd: InitiativeUpdate = {
      id: "iupd-" + Date.now(),
      date: new Date().toISOString().split("T")[0],
      title: updateData.title,
      notes: updateData.notes,
      photos: updateData.photos
    };

    init.progress_updates.unshift(newUpd);
    init.updated_at = new Date().toISOString();
    return true;
  }

  // ---------------- Content Reports & Moderation ----------------

  reportContent(reportData: {
    content_type: ReportContentType;
    content_id: string;
    content_title: string;
    reporter_id: string;
    reporter_name: string;
    reason: ReportReason;
    details: string;
  }): ContentReport {
    const newReport: ContentReport = {
      id: "rep-" + Date.now(),
      ...reportData,
      status: "pending",
      created_at: new Date().toISOString()
    };
    this.reports.unshift(newReport);
    return newReport;
  }

  getReports(status?: ReportStatus | "all"): ContentReport[] {
    if (status && status !== "all") {
      return this.reports.filter(r => r.status === status);
    }
    return [...this.reports];
  }

  updateReportStatus(reportId: string, status: ReportStatus, actionTaken?: string, reviewerName: string = "Admin"): boolean {
    const rep = this.reports.find(r => r.id === reportId);
    if (!rep) return false;
    rep.status = status;
    rep.action_taken = actionTaken;
    rep.reviewed_by = reviewerName;
    rep.reviewed_at = new Date().toISOString();

    this.addAuditLog({
      actor_id: "mod-001",
      actor_name: reviewerName,
      actor_role: "Moderator",
      action: status === "actioned" ? "report_actioned" : "report_dismissed",
      target_type: rep.content_type,
      target_id: rep.content_id,
      target_title: rep.content_title,
      details: `Report for reason '${rep.reason}' resolved with status '${status}'. Note: ${actionTaken || "None"}`
    });

    return true;
  }

  // ---------------- Audit Logs ----------------

  addAuditLog(logData: Omit<PeoplesVoiceAuditLog, "id" | "timestamp">): PeoplesVoiceAuditLog {
    const newLog: PeoplesVoiceAuditLog = {
      ...logData,
      id: "alog-" + Date.now(),
      timestamp: new Date().toISOString()
    };
    this.auditLogs.unshift(newLog);
    return newLog;
  }

  getAuditLogs(): PeoplesVoiceAuditLog[] {
    return [...this.auditLogs];
  }

  // ---------------- User Activity ----------------

  getUserActivity(userId: string) {
    const submittedIdeas = this.ideas.filter(i => i.author_id === userId);
    const supportedIdeas = this.ideas.filter(i => i.supported_user_ids.includes(userId));
    
    // Comments by this user
    const myComments: { type: "idea" | "discussion"; targetTitle: string; content: string; date: string; url: string }[] = [];
    this.ideas.forEach(i => {
      i.comments.filter(c => c.author_id === userId).forEach(c => {
        myComments.push({
          type: "idea",
          targetTitle: i.title,
          content: c.content,
          date: c.created_at,
          url: `/peoples-voice/ideas/${i.id}`
        });
      });
    });

    const followedDiscussions = this.discussions.filter(d => d.followed_user_ids.includes(userId));
    const joinedInitiatives = this.initiatives.filter(init => init.participant_user_ids.includes(userId));

    return {
      submittedIdeas,
      supportedIdeas,
      myComments,
      followedDiscussions,
      joinedInitiatives
    };
  }

  // ---------------- Analytics ----------------

  getAnalytics() {
    const totalIdeas = this.ideas.length;
    const byStatus: Record<string, number> = {};
    const byCategory: Record<string, number> = {};

    this.ideas.forEach(i => {
      byStatus[i.status] = (byStatus[i.status] || 0) + 1;
      byCategory[i.category] = (byCategory[i.category] || 0) + 1;
    });

    const totalSupporters = this.ideas.reduce((acc, i) => acc + i.support_count, 0);
    const totalDiscussions = this.discussions.length;
    const totalInitiatives = this.initiatives.length;
    const pendingReports = this.reports.filter(r => r.status === "pending").length;

    return {
      totalIdeas,
      submitted: byStatus["Submitted"] || 0,
      underReview: byStatus["Under Review"] || 0,
      communityDiscussion: byStatus["Community Discussion"] || 0,
      shortlisted: byStatus["Shortlisted"] || 0,
      forwarded: byStatus["Forwarded for Consideration"] || 0,
      accepted: byStatus["Accepted for Collaboration"] || 0,
      inProgress: byStatus["In Progress"] || 0,
      completed: byStatus["Completed"] || 0,
      notProceeding: byStatus["Not Proceeding"] || 0,
      totalSupporters,
      totalDiscussions,
      totalInitiatives,
      pendingReports,
      byCategory,
      byStatus
    };
  }
}

// Global Singleton for in-memory persistence in Next.js development
const globalForPeoplesVoice = globalThis as unknown as { peoplesVoiceStore: PeoplesVoiceStore };
export const peoplesVoiceStore = globalForPeoplesVoice.peoplesVoiceStore || new PeoplesVoiceStore();
if (process.env.NODE_ENV !== "production") globalForPeoplesVoice.peoplesVoiceStore = peoplesVoiceStore;
