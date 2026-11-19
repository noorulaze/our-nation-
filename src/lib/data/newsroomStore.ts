import { 
  SmartNewsArticle, 
  SmartNewsSource, 
  SmartNewsCategory, 
  NewsCategorySlug, 
  GeographicScope,
  NewsEditorialReview,
  NewsCorrection,
  NewsFetchLog,
  NewsNotification,
  NewsAuditLog,
  NewsLiveUpdate,
  NewsArticleSource
} from "@/types/newsroom";

export const NEWS_CATEGORIES: SmartNewsCategory[] = [
  {
    id: "cat-local",
    slug: "local",
    name: "Local News",
    name_ml: "പ്രാദേശിക വാർത്തകൾ (താനൂർ & മലപ്പുറം)",
    description: "Tanur Municipality 44 wards, Coastal belt, and Malappuram district updates",
    description_ml: "താനൂർ നഗരസഭയിലെ 44 വാർഡുകളിലെയും മലപ്പുറം ജില്ലയിലെയും സമഗ്ര പ്രാദേശിക വിവരങ്ങൾ",
    icon: "MapPin",
    color: "#194B35",
    display_order: 1,
    article_count: 18,
  },
  {
    id: "cat-kerala",
    slug: "kerala",
    name: "Kerala News",
    name_ml: "കേരള വാർത്തകൾ",
    description: "Major state government decisions, public initiatives, and Kerala state events",
    description_ml: "സംസ്ഥാന സർക്കാർ തീരുമാനങ്ങൾ, വികസന പദ്ധതികൾ, സാമൂഹിക മുന്നേറ്റങ്ങൾ",
    icon: "Landmark",
    color: "#0F766E",
    display_order: 2,
    article_count: 24,
  },
  {
    id: "cat-national",
    slug: "national",
    name: "National News",
    name_ml: "ദേശീയ വാർത്തകൾ",
    description: "Key national developments, parliamentary legislation, and country-wide updates",
    description_ml: "കേന്ദ്ര സർക്കാർ നയങ്ങൾ, ദേശീയ വികസന പദ്ധതികൾ, പ്രധാന സംഭവങ്ങൾ",
    icon: "Flag",
    color: "#C39A5B",
    display_order: 3,
    article_count: 16,
  },
  {
    id: "cat-international",
    slug: "international",
    name: "International News",
    name_ml: "അന്താരാഷ്ട്ര വാർത്തകൾ",
    description: "Global affairs, GCC diaspora updates, and international diplomacy",
    description_ml: "ആഗോള സംഭവങ്ങൾ, പ്രവാസി ലോകം (GCC), അന്താരാഷ്ട്ര ബന്ധങ്ങൾ",
    icon: "Globe",
    color: "#2563EB",
    display_order: 4,
    article_count: 12,
  },
  {
    id: "cat-politics",
    slug: "politics",
    name: "Politics & Government",
    name_ml: "രാഷ്ട്രീയവും ഭരണവും",
    description: "Local assembly, municipal council, and legislative affairs",
    description_ml: "നിയമസഭ, താനൂർ നഗരസഭാ കൗൺസിൽ, ഭരണനിർവ്വഹണ വാർത്തകൾ",
    icon: "Vote",
    color: "#7C3AED",
    display_order: 5,
    article_count: 15,
  },
  {
    id: "cat-education",
    slug: "education",
    name: "Education",
    name_ml: "വിദ്യാഭ്യാസം",
    description: "Calicut University, school admissions, exams, scholarships, and career alerts",
    description_ml: "കാലിക്കറ്റ് സർവകലാശാല, പരീക്ഷാ ഫലങ്ങൾ, സ്കോളർഷിപ്പ്, തൊഴിൽ വാർത്തകൾ",
    icon: "GraduationCap",
    color: "#D97706",
    display_order: 6,
    article_count: 14,
  },
  {
    id: "cat-business",
    slug: "business",
    name: "Business & Economy",
    name_ml: "സാമ്പത്തികവും വിപണിയും",
    description: "Local trade, Tanur harbour fisheries economy, MSMEs, and market trends",
    description_ml: "താനൂർ ഹാർബർ മത്സ്യബന്ധന വിപണി, വ്യാപാരികൾ, സാമ്പത്തിക മുന്നേറ്റങ്ങൾ",
    icon: "TrendingUp",
    color: "#059669",
    display_order: 7,
    article_count: 10,
  },
  {
    id: "cat-tech",
    slug: "tech",
    name: "Technology & AI",
    name_ml: "സാങ്കേതികവിദ്യയും എഐയും",
    description: "Kerala Startup Mission, digital governance, AI breakthroughs, and cybersecurity",
    description_ml: "ഡിജിറ്റൽ സേവനങ്ങൾ, കേരള സ്റ്റാർട്ടപ്പ് മിഷൻ, എഐ സാങ്കേതികവിദ്യ",
    icon: "Cpu",
    color: "#4F46E5",
    display_order: 8,
    article_count: 9,
  },
  {
    id: "cat-sports",
    slug: "sports",
    name: "Sports",
    name_ml: "കായികം",
    description: "Malappuram Sevens football, state athletics, cricket, and school games",
    description_ml: "മലപ്പുറം സെവൻസ് ഫുട്ബോൾ, സംസ്ഥാന കായിക മേളകൾ, സ്കൂൾ സ്പോർട്സ്",
    icon: "Trophy",
    color: "#EA580C",
    display_order: 9,
    article_count: 11,
  },
  {
    id: "cat-environment",
    slug: "environment",
    name: "Environment",
    name_ml: "പരിസ്ഥിതിയും കാലാവസ്ഥയും",
    description: "Tanur coastal preservation, monsoon alerts, sea erosion, and Haritha initiatives",
    description_ml: "തീരദേശ സംരക്ഷണം, കാലാവസ്ഥാ മുന്നറിയിപ്പുകൾ, പരിസ്ഥിതി പ്രവർത്തനങ്ങൾ",
    icon: "Leaf",
    color: "#166534",
    display_order: 10,
    article_count: 8,
  },
  {
    id: "cat-health",
    slug: "health",
    name: "Health & Public Awareness",
    name_ml: "ആരോഗ്യവും പൊതുജന ബോധവൽക്കരണവും",
    description: "Community health centres, monsoon disease prevention, and public wellness",
    description_ml: "താനൂർ കമ്മ്യൂണിറ്റി ഹെൽത്ത് സെന്റർ, മഴക്കാല രോഗപ്രതിരോധം, ആരോഗ്യ നിർദ്ദേശങ്ങൾ",
    icon: "HeartPulse",
    color: "#DC2626",
    display_order: 11,
    article_count: 13,
  },
];

export const INITIAL_NEWS_SOURCES: SmartNewsSource[] = [
  {
    id: "src-prd-kerala",
    name: "Information & Public Relations Dept (PRD Live)",
    name_ml: "കേരള ഇൻഫർമേഷൻ & പബ്ലിക് റിലേഷൻസ് വകുപ്പ് (PRD)",
    slug: "prd-kerala",
    website_url: "https://prdlive.kerala.gov.in/",
    feed_url: "https://prdlive.kerala.gov.in/feed/",
    feed_type: "official_pr",
    publisher: "Government of Kerala",
    category_default: "kerala",
    geographic_scope: "kerala",
    reliability_score: 99,
    polling_interval_minutes: 5,
    is_active: true,
    last_polled_at: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
    last_success_at: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
    consecutive_failures: 0,
    terms_verified: true,
    articles_ingested_count: 42,
  },
  {
    id: "src-tanur-municipality-pr",
    name: "Tanur Municipality Official Portal",
    name_ml: "താനൂർ നഗരസഭാ ഔദ്യോഗിക പോർട്ടൽ",
    slug: "tanur-municipality-pr",
    website_url: "https://tanurmunicipality.lsgkerala.gov.in/",
    feed_url: "https://tanurmunicipality.lsgkerala.gov.in/en/rss",
    feed_type: "official_pr",
    publisher: "Tanur Municipality LSGD",
    category_default: "local",
    geographic_scope: "tanur",
    reliability_score: 100,
    polling_interval_minutes: 3,
    is_active: true,
    last_polled_at: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    last_success_at: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    consecutive_failures: 0,
    terms_verified: true,
    articles_ingested_count: 31,
  },
  {
    id: "src-pib-kerala",
    name: "Press Information Bureau (PIB) Kerala",
    name_ml: "പ്രസ്സ് ഇൻഫർമേഷൻ ബ്യൂറോ (PIB) കേരളം",
    slug: "pib-kerala",
    website_url: "https://pib.gov.in/",
    feed_url: "https://pib.gov.in/RssMain.aspx?ModId=1",
    feed_type: "rss",
    publisher: "Government of India",
    category_default: "national",
    geographic_scope: "national",
    reliability_score: 98,
    polling_interval_minutes: 10,
    is_active: true,
    last_polled_at: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
    last_success_at: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
    consecutive_failures: 0,
    terms_verified: true,
    articles_ingested_count: 36,
  },
  {
    id: "src-air-malappuram",
    name: "Akashvani (AIR) Regional News Division",
    name_ml: "ആകാശവാണി പ്രാദേശിക വാർത്താ വിഭാഗം (AIR)",
    slug: "air-malappuram",
    website_url: "https://newsonair.gov.in/",
    feed_url: "https://newsonair.gov.in/rss/malayalam.xml",
    feed_type: "rss",
    publisher: "Prasar Bharati",
    category_default: "local",
    geographic_scope: "malappuram",
    reliability_score: 97,
    polling_interval_minutes: 5,
    is_active: true,
    last_polled_at: new Date(Date.now() - 4 * 60 * 1000).toISOString(),
    last_success_at: new Date(Date.now() - 4 * 60 * 1000).toISOString(),
    consecutive_failures: 0,
    terms_verified: true,
    articles_ingested_count: 28,
  },
  {
    id: "src-the-hindu-kerala",
    name: "The Hindu (Kerala Bureau)",
    name_ml: "ദി ഹിന്ദു (കേരള ബ്യൂറോ)",
    slug: "the-hindu-kerala",
    website_url: "https://www.thehindu.com/",
    feed_url: "https://www.thehindu.com/news/national/kerala/feeder/default.rss",
    feed_type: "rss",
    publisher: "THG Publishing Pvt Ltd",
    category_default: "kerala",
    geographic_scope: "kerala",
    reliability_score: 95,
    polling_interval_minutes: 5,
    is_active: true,
    last_polled_at: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
    last_success_at: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
    consecutive_failures: 0,
    terms_verified: true,
    articles_ingested_count: 48,
  },
  {
    id: "src-kerala-disaster-mgmt",
    name: "Kerala State Disaster Management Authority (KSDMA)",
    name_ml: "കേരള ദുരന്തനിവാരണ അതോറിറ്റി (KSDMA)",
    slug: "kerala-ksdma",
    website_url: "https://sdma.kerala.gov.in/",
    feed_url: "https://sdma.kerala.gov.in/feed/",
    feed_type: "official_pr",
    publisher: "KSDMA Kerala",
    category_default: "environment",
    geographic_scope: "kerala",
    reliability_score: 100,
    polling_interval_minutes: 2,
    is_active: true,
    last_polled_at: new Date(Date.now() - 1 * 60 * 1000).toISOString(),
    last_success_at: new Date(Date.now() - 1 * 60 * 1000).toISOString(),
    consecutive_failures: 0,
    terms_verified: true,
    articles_ingested_count: 19,
  },
];

export const INITIAL_SMART_ARTICLES: SmartNewsArticle[] = [
  {
    id: "art-tnr-harbour-modernization-2026",
    title: "Tanur Coastal Fisheries Harbour Modernisation Project Reaches Phase 2",
    title_ml: "താനൂർ ഹാർബർ ആധുനികവൽക്കരണ പദ്ധതി രണ്ടാം ഘട്ടത്തിലേക്ക്; മത്സ്യത്തൊഴിലാളികൾക്ക് ആശ്വാസം",
    original_headline: "Tanur Fisheries Harbour modernisation works accelerated with new cold storage facility",
    summary: "The Tanur Harbour modernisation project has entered Phase 2 with a sanctioned modern cold-storage unit, automated auction hall, and dedicated navigational lighting along the breakwater.",
    summary_ml: "താനൂർ ഹാർബറിലെ ആധുനിക ശീതീകരണ പ്ലാന്റ്, ഓട്ടോമേറ്റഡ് ലേല ഹാൾ, ബ്രേക്ക്‌വാട്ടർ നാവിഗേഷൻ ലൈറ്റിംഗ് എന്നിവ ഉൾപ്പെടുന്ന രണ്ടാം ഘട്ട നിർമ്മാണ പ്രവൃത്തികൾക്ക് ഭരണാനുമതി ലഭിച്ചു. തീരദേശ തൊഴിലാളികൾക്ക് പദ്ധതി വലിയ നേട്ടമാകും.",
    full_content_preview: "താനൂർ നഗരസഭയുടെയും ഫിഷറീസ് വകുപ്പിന്റെയും നേതൃത്വത്തിൽ നടപ്പിലാക്കുന്ന സമഗ്ര ഹാർബർ വികസന പദ്ധതിയിലാണ് പുതിയ ഘട്ടം ആരംഭിച്ചത്. നൂതന ഹൈജീനിക് ലേല ഹാൾ വഴി മത്സ്യത്തിന്റെ ഗുണനിലവാരം ഉറപ്പാക്കാനും കർഷകർക്ക് മികച്ച വില ലഭ്യമാക്കാനും സാധിക്കും.",
    category: "local",
    category_name: "Local News",
    category_name_ml: "പ്രാദേശിക വാർത്തകൾ (താനൂർ)",
    geographic_scope: "tanur",
    specific_locality: "Tanur Harbour & Coastal Wards (വാർഡുകൾ 1, 2, 3)",
    keywords: ["Tanur", "Fisheries", "Harbour", "LSGD", "Malappuram"],
    image_url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&auto=format&fit=crop&q=80",
    image_license: "Unsplash Free License / PRD Media",
    image_attribution: "Fisheries Department Kerala / PRD",
    source_id: "src-tanur-municipality-pr",
    source_name: "Tanur Municipality Official Portal",
    source_url: "https://tanurmunicipality.lsgkerala.gov.in/news/harbour-phase2",
    original_published_at: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    collected_at: new Date(Date.now() - 22 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    status: "published",
    is_breaking: false,
    breaking_verified: true,
    corroboration_count: 2,
    corroborated_sources: [
      {
        id: "cs-1",
        article_id: "art-tnr-harbour-modernization-2026",
        source_id: "src-prd-kerala",
        source_name: "PRD Live Kerala",
        original_url: "https://prdlive.kerala.gov.in/news/tanur-fisheries-project",
        original_headline: "Kerala Fisheries Department sanctions infrastructure upgrade for Tanur harbour",
        published_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        reliability_score: 99,
      }
    ],
    updates: [],
    corrections: [],
    ai_processed: true,
    ai_model_used: "Naadu AI (Gemini Flash Factual Extraction)",
    ai_disclaimer: "AI-generated concise summary based on official Tanur Municipality and PRD Kerala releases. Consult the original publisher link for full governmental orders.",
    content_hash: "hash-tanur-harbour-2026-p2",
    view_count: 480,
    read_time: "2 min",
    featured: true,
  },
  {
    id: "art-mlp-calicut-univ-results-2026",
    title: "Calicut University Announces UG Degree Examination Results Online",
    title_ml: "കാലിക്കറ്റ് സർവകലാശാല നാലാം സെമസ്റ്റർ ബിരുദ പരീക്ഷാ ഫലങ്ങൾ പ്രസിദ്ധീകരിച്ചു",
    original_headline: "University of Calicut announces Fourth Semester UG examination results on official pareekshabhavan portal",
    summary: "Calicut University has declared the results of the Fourth Semester CBCS-UG (BA, BSc, BCom) examinations. Students can access their marks cards on the Pareekshabhavan website.",
    summary_ml: "കാലിക്കറ്റ് സർവകലാശാല നാലാം സെമസ്റ്റർ ബിരുദ (BA, BSc, BCom) പരീക്ഷാ ഫലങ്ങൾ പരീക്ഷാഭവൻ ഔദ്യോഗിക വെബ്‌സൈറ്റിൽ ലഭ്യമാക്കി. പുനർമൂല്യനിർണ്ണയത്തിനുള്ള അപേക്ഷകൾ ഈ മാസം 25 വരെ സമർപ്പിക്കാം.",
    full_content_preview: "താനൂർ ദേവധാർ ഗവൺമെന്റ് കോളേജ് ഉൾപ്പെടെയുള്ള മലപ്പുറം ജില്ലയിലെ അഫിലിയേറ്റഡ് കോളേജുകളിലെ വിദ്യാർത്ഥികൾക്ക് സർവകലാശാല പോർട്ടൽ വഴി ഫലങ്ങൾ പരിശോധിക്കാവുന്നതാണ്.",
    category: "education",
    category_name: "Education",
    category_name_ml: "വിദ്യാഭ്യാസം",
    geographic_scope: "malappuram",
    specific_locality: "University of Calicut Campus, Malappuram",
    keywords: ["Calicut University", "Pareekshabhavan", "Degree Results", "College"],
    image_url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80",
    image_license: "Editorial / Educational CC-BY-SA",
    image_attribution: "Calicut University PRO",
    source_id: "src-prd-kerala",
    source_name: "PRD Live Kerala",
    source_url: "https://prdlive.kerala.gov.in/news/calicut-university-results-2026",
    original_published_at: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    collected_at: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
    status: "published",
    is_breaking: false,
    breaking_verified: true,
    corroboration_count: 2,
    corroborated_sources: [
      {
        id: "cs-2",
        article_id: "art-mlp-calicut-univ-results-2026",
        source_id: "src-air-malappuram",
        source_name: "All India Radio (Akashvani)",
        original_url: "https://newsonair.gov.in/calicut-ug-results",
        original_headline: "Calicut University declares UG semester results",
        published_at: new Date(Date.now() - 50 * 60 * 1000).toISOString(),
        reliability_score: 97,
      }
    ],
    updates: [],
    corrections: [],
    ai_processed: true,
    ai_model_used: "Naadu AI (Gemini Flash Factual Extraction)",
    ai_disclaimer: "AI-generated concise summary based on Calicut University Pareekshabhavan notifications.",
    content_hash: "hash-calicut-univ-ug-2026",
    view_count: 890,
    read_time: "1 min",
    featured: false,
  },
  {
    id: "art-breaking-ksdma-monsoon-alert-2026",
    title: "KSDMA Issues Yellow Alert for Coastal Malappuram: Fishermen Advised Not to Venture Into Sea",
    title_ml: "മലപ്പുറം തീരദേശത്ത് ജാഗ്രതാ നിർദ്ദേശം; കടലിൽ പോകരുതെന്ന് ദുരന്തനിവാരണ അതോറിറ്റി മുന്നറിയിപ്പ്",
    original_headline: "IMD and KSDMA alert for squally weather along Malappuram and Kozhikode coast with wind speeds up to 55 kmph",
    summary: "The Kerala State Disaster Management Authority and IMD have issued a weather advisory for coastal Malappuram including Tanur, warning of wind speeds up to 55 km/h. Sea venture has been prohibited for 48 hours.",
    summary_ml: "മലപ്പുറം തീരത്ത് മണിക്കൂറിൽ 40 മുതൽ 55 കിലോമീറ്റർ വരെ വേഗതയിൽ ശക്തമായ കാറ്റിനും ഉയർന്ന തിരമാലകൾക്കും സാധ്യതയുള്ളതിനാൽ താനൂർ തീരത്തെ മത്സ്യത്തൊഴിലാളികൾ അടുത്ത 48 മണിക്കൂർ കടലിൽ പോകരുതെന്ന് മുന്നറിയിപ്പ് നൽകി.",
    full_content_preview: "താനൂർ കോസ്റ്റൽ പോലീസ്, മറൈൻ എൻഫോഴ്സ്മെന്റ്, താനൂർ നഗരസഭാ ദുരന്തനിവാരണ സമിതി എന്നിവ തീരദേശ വാർഡുകളിൽ മൈക്ക് അനൗൺസ്മെന്റും സുരക്ഷാ ക്രമീകരണങ്ങളും ശക്തിപ്പെടുത്തിയിട്ടുണ്ട്.",
    category: "environment",
    category_name: "Environment & Climate",
    category_name_ml: "പരിസ്ഥിതിയും കാലാവസ്ഥയും",
    geographic_scope: "tanur",
    specific_locality: "Tanur Coastal Belt, Unniyal, Parappanangadi border",
    keywords: ["KSDMA", "IMD", "Weather Alert", "Tanur Beach", "Fishermen Alert"],
    image_url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200&auto=format&fit=crop&q=80",
    image_license: "Editorial / Weather Advisory",
    image_attribution: "KSDMA State Emergency Operations Centre",
    source_id: "src-kerala-disaster-mgmt",
    source_name: "Kerala State Disaster Management Authority (KSDMA)",
    source_url: "https://sdma.kerala.gov.in/weather-alerts/coastal-malappuram-2026",
    original_published_at: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    collected_at: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    status: "breaking",
    is_breaking: true,
    breaking_severity: "urgent",
    breaking_verified: true,
    corroboration_count: 3,
    corroborated_sources: [
      {
        id: "cs-3a",
        article_id: "art-breaking-ksdma-monsoon-alert-2026",
        source_id: "src-prd-kerala",
        source_name: "PRD Live Kerala",
        original_url: "https://prdlive.kerala.gov.in/weather/malappuram-coastal-advisory",
        original_headline: "State Emergency Operations Centre issues advisory for coastal districts",
        published_at: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        reliability_score: 99,
      },
      {
        id: "cs-3b",
        article_id: "art-breaking-ksdma-monsoon-alert-2026",
        source_id: "src-air-malappuram",
        source_name: "Akashvani News",
        original_url: "https://newsonair.gov.in/kerala-weather-warning",
        original_headline: "Fishermen alert issued for Malappuram coast",
        published_at: new Date(Date.now() - 14 * 60 * 1000).toISOString(),
        reliability_score: 97,
      }
    ],
    updates: [
      {
        id: "upd-1",
        article_id: "art-breaking-ksdma-monsoon-alert-2026",
        timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        title: "Tanur Coastal Police Advisory Active",
        title_ml: "താനൂർ കോസ്റ്റൽ പോലീസ് തീരത്ത് ജാഗ്രതാ നിർദ്ദേശം നൽകി",
        update_text: "Tanur Coastal Police Station has deployed patrol teams across Unniyal and Tanur harbour beaches.",
        update_text_ml: "താനൂർ ഹാർബർ, ഉണ്ണ്യാൽ തീരങ്ങളിൽ കോസ്റ്റൽ പോലീസ് പട്രോളിംഗ് ആരംഭിച്ചു. ബോട്ട് പുറപ്പെടുന്നത് തടഞ്ഞു.",
        source_name: "Tanur Coastal Police",
        is_confirmed: true,
      }
    ],
    corrections: [],
    ai_processed: true,
    ai_model_used: "Naadu AI (Corroborated Multi-Source Extraction)",
    ai_disclaimer: "Verified Urgent Advisory corroborated across KSDMA, PRD Kerala, and Akashvani Regional News.",
    content_hash: "hash-ksdma-weather-tanur-2026",
    view_count: 1450,
    read_time: "1 min",
    featured: true,
  },
  {
    id: "art-kerala-ai-healthcare-initiative-2026",
    title: "Kerala Health Dept Rolls Out AI-Assisted Telemedicine Screening Across Malappuram CHCs",
    title_ml: "മലപ്പുറത്തെ കുടുംബാരോഗ്യ കേന്ദ്രങ്ങളിൽ എഐ ടെലിമെഡിസിൻ സേവനം തുടങ്ങി",
    original_headline: "Kerala Department of Health launches AI diagnostic screening for primary and community health centres",
    summary: "In a pioneering digital health initiative, the Kerala Health Department has introduced automated AI-assisted diagnostic triaging at Community Health Centres, including Tanur CHC.",
    summary_ml: "താനൂർ സിഎച്ച്‌സി ഉൾപ്പെടെയുള്ള മലപ്പുറത്തെ കമ്മ്യൂണിറ്റി, കുടുംബാരോഗ്യ കേന്ദ്രങ്ങളിൽ പ്രാഥമിക പരിശോധനകൾ വേഗത്തിലാക്കാൻ എഐ അധിഷ്ഠിത ടെലിമെഡിസിൻ സംവിധാനം ആരംഭിച്ചു. ജീവിതശൈലീ രോഗങ്ങൾ നേരത്തെ കണ്ടെത്താൻ ഇത് സഹായിക്കും.",
    full_content_preview: "താനൂർ ബ്ലോക്ക് പരിധിയിലെ രോഗികൾക്ക് സ്പെഷ്യലിസ്റ്റ് ഡോക്ടർമാരുടെ സേവനം ഡിജിറ്റൽ സ്ക്രീനിംഗിലൂടെ വേഗത്തിൽ ലഭ്യമാക്കുന്നതിനാണ് പുതിയ പദ്ധതി ലക്ഷ്യമിടുന്നത്.",
    category: "health",
    category_name: "Health & Public Awareness",
    category_name_ml: "ആരോഗ്യവും പൊതുജന ബോധവൽക്കരണവും",
    geographic_scope: "kerala",
    specific_locality: "Tanur Community Health Centre & Malappuram District",
    keywords: ["Health Department", "Telemedicine", "AI Diagnostics", "Tanur CHC"],
    image_url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80",
    image_license: "Health Dept Official PR / Unsplash Free",
    image_attribution: "Directorate of Health Services Kerala",
    source_id: "src-prd-kerala",
    source_name: "PRD Live Kerala",
    source_url: "https://prdlive.kerala.gov.in/health/ai-telemedicine-screening",
    original_published_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    collected_at: new Date(Date.now() - 110 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    status: "published",
    is_breaking: false,
    breaking_verified: true,
    corroboration_count: 2,
    corroborated_sources: [
      {
        id: "cs-4",
        article_id: "art-kerala-ai-healthcare-initiative-2026",
        source_id: "src-the-hindu-kerala",
        source_name: "The Hindu",
        original_url: "https://www.thehindu.com/sci-tech/health/kerala-ai-primary-healthcare-pilot/article68291.ece",
        original_headline: "Kerala deploys AI diagnostic triage in primary health institutions",
        published_at: new Date(Date.now() - 130 * 60 * 1000).toISOString(),
        reliability_score: 95,
      }
    ],
    updates: [],
    corrections: [],
    ai_processed: true,
    ai_model_used: "Naadu AI (Gemini Flash Factual Extraction)",
    ai_disclaimer: "AI-generated summary from official Kerala DHS release and The Hindu reporting.",
    content_hash: "hash-kerala-ai-health-telemed-2026",
    view_count: 670,
    read_time: "2 min",
    featured: false,
  },
  {
    id: "art-sports-sevens-football-malappuram-2026",
    title: "All-Kerala Sevens Football Tournament Final Set for Tanur Floodlit Stadium",
    title_ml: "അഖിലേന്ത്യാ സെവൻസ് ഫുട്ബോൾ ഫൈനൽ താനൂർ ഫ്ലഡ്‌ലൈറ്റ് സ്റ്റേഡിയത്തിൽ",
    original_headline: "Tanur Municipality stadium to host blockbuster All-Kerala Sevens Football grand finale under floodlights",
    summary: "Football fever grips Malappuram as the Tanur Municipal Stadium hosts the championship final of the All-Kerala Sevens tournament featuring top state clubs.",
    summary_ml: "മലപ്പുറത്തിന്റെ കാൽപ്പന്തുത്സവമായ അഖിലേന്ത്യാ സെവൻസ് ടൂർണമെന്റിന്റെ കലാശപ്പോരാട്ടം താനൂർ മുനിസിപ്പൽ ഫ്ലഡ്‌ലൈറ്റ് സ്റ്റേഡിയത്തിൽ നടക്കും. വിദേശ താരങ്ങൾ ഉൾപ്പെടെ അണിനിരക്കുന്ന മത്സരത്തിന് വിപുലമായ സുരക്ഷാ ക്രമീകരണങ്ങൾ ഏർപ്പെടുത്തി.",
    full_content_preview: "താനൂർ നഗരസഭയുടെയും സ്പോർട്സ് കൗൺസിലിന്റെയും സംയുക്ത ആഭിമുഖ്യത്തിൽ സ്റ്റേഡിയത്തിൽ 15,000 കാണികൾക്കുള്ള സൗകര്യമാണ് ഒരുക്കിയിരിക്കുന്നത്.",
    category: "sports",
    category_name: "Sports",
    category_name_ml: "കായികം",
    geographic_scope: "tanur",
    specific_locality: "Tanur Municipal Stadium, Rayirimangalam",
    keywords: ["Malappuram", "Sevens Football", "Tanur Stadium", "Sports"],
    image_url: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&auto=format&fit=crop&q=80",
    image_license: "Sports Media License",
    image_attribution: "Malappuram District Sports Council",
    source_id: "src-air-malappuram",
    source_name: "Akashvani Regional Sports Desk",
    source_url: "https://newsonair.gov.in/sports/kerala-sevens-tanur-final",
    original_published_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    collected_at: new Date(Date.now() - 170 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 170 * 60 * 1000).toISOString(),
    status: "published",
    is_breaking: false,
    breaking_verified: true,
    corroboration_count: 1,
    corroborated_sources: [],
    updates: [],
    corrections: [],
    ai_processed: true,
    ai_model_used: "Naadu AI (Factual Sports Extraction)",
    ai_disclaimer: "AI-generated summary based on Akashvani Sports coverage.",
    content_hash: "hash-tanur-sevens-final-2026",
    view_count: 1120,
    read_time: "2 min",
    featured: false,
  },
  {
    id: "art-review-traffic-diversion-claim-2026",
    title: "Unconfirmed Claim: Purported National Highway 66 Traffic Diversion Near Tanur Bypass",
    title_ml: "അനൗദ്യോഗിക പ്രചാരണം: താനൂർ ബൈപാസിലെ ഗതാഗത തിരിച്ചുവിടൽ ഔദ്യോഗിക സ്ഥിരീകരണത്തിനായി കാത്തിരിക്കുന്നു",
    original_headline: "Social media claims traffic blockade and major diversion on NH 66 near Tanur",
    summary: "Reports circulating regarding immediate indefinite closure of Tanur-Parappanangadi bypass are currently unverified by Tanur Traffic Police and NHAI.",
    summary_ml: "താനൂർ-പരപ്പനങ്ങാടി ബൈപാസ് റോഡിൽ പൂർണ്ണ ഗതാഗത നിരോധനം ഏർപ്പെടുത്തിയതായി സമൂഹമാധ്യമങ്ങളിൽ പ്രചരിക്കുന്ന വാർത്ത താനൂർ ട്രാഫിക് പോലീസോ എൻ.എച്ച്.എ.ഐയോ ഔദ്യോഗികമായി സ്ഥിരീകരിച്ചിട്ടില്ല. വസ്തുതകൾ പരിശോധിക്കുന്നു.",
    full_content_preview: "ഔദ്യോഗിക അറിയിപ്പ് ലഭിക്കാത്തതിനാൽ ഈ വാർത്ത പബ്ലിക് പോർട്ടലിൽ സാധാരണ വാർത്തയായി നൽകിയിട്ടില്ല. വസ്തുതാ പരിശോധന പൂർത്തിയായ ശേഷമേ അന്തിമ അറിയിപ്പ് നൽകൂ.",
    category: "local",
    category_name: "Local News",
    category_name_ml: "പ്രാദേശിക വാർത്തകൾ",
    geographic_scope: "tanur",
    specific_locality: "Tanur NH 66 bypass junction",
    keywords: ["Traffic", "NH66", "Tanur Police", "Fact Check"],
    image_url: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&auto=format&fit=crop&q=80",
    image_license: "Public Domain / Editorial",
    image_attribution: "Traffic Safety Bureau",
    source_id: "src-air-malappuram",
    source_name: "Local Reporter Feed",
    source_url: "https://newsonair.gov.in/unverified/tanur-traffic",
    original_published_at: new Date(Date.now() - 50 * 60 * 1000).toISOString(),
    collected_at: new Date(Date.now() - 48 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    status: "review",
    is_breaking: false,
    breaking_verified: false,
    corroboration_count: 0,
    corroborated_sources: [],
    updates: [],
    corrections: [],
    ai_processed: true,
    ai_model_used: "Naadu AI Reliability Guard",
    ai_disclaimer: "Flagged by automatic reliability safeguard: single unconfirmed claim with no official government gazette or police confirmation.",
    content_hash: "hash-tanur-nh66-traffic-claim-2026",
    view_count: 45,
    read_time: "1 min",
    featured: false,
  }
];

export const INITIAL_EDITORIAL_REVIEWS: NewsEditorialReview[] = [
  {
    id: "rev-1",
    article_id: "art-review-traffic-diversion-claim-2026",
    reason: "Sensitive public transport disruption claim lacks corroboration from Tanur Police Station or PWD.",
    flagged_at: new Date(Date.now() - 48 * 60 * 1000).toISOString(),
    review_status: "pending",
    reviewer_notes: "Awaiting formal verification statement from Tanur Traffic Sub-Inspector before public release.",
  }
];

export const INITIAL_FETCH_LOGS: NewsFetchLog[] = [
  {
    id: "log-1",
    source_id: "src-prd-kerala",
    source_name: "PRD Live Kerala",
    fetched_at: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
    status: "success",
    articles_found: 8,
    articles_published: 2,
    articles_skipped: 6,
    articles_flagged: 0,
    duration_ms: 480,
  },
  {
    id: "log-2",
    source_id: "src-tanur-municipality-pr",
    source_name: "Tanur Municipality Official Portal",
    fetched_at: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    status: "success",
    articles_found: 4,
    articles_published: 1,
    articles_skipped: 3,
    articles_flagged: 0,
    duration_ms: 320,
  },
  {
    id: "log-3",
    source_id: "src-kerala-disaster-mgmt",
    source_name: "Kerala State Disaster Management Authority (KSDMA)",
    fetched_at: new Date(Date.now() - 1 * 60 * 1000).toISOString(),
    status: "success",
    articles_found: 3,
    articles_published: 1,
    articles_skipped: 2,
    articles_flagged: 0,
    duration_ms: 290,
  }
];

class SmartNewsroomStore {
  private sources: SmartNewsSource[] = [...INITIAL_NEWS_SOURCES];
  private articles: SmartNewsArticle[] = [...INITIAL_SMART_ARTICLES];
  private reviews: NewsEditorialReview[] = [...INITIAL_EDITORIAL_REVIEWS];
  private corrections: NewsCorrection[] = [];
  private fetchLogs: NewsFetchLog[] = [...INITIAL_FETCH_LOGS];
  private auditLogs: NewsAuditLog[] = [];

  // ==========================================
  // ARTICLES QUERYING
  // ==========================================
  getArticles(filter?: {
    category?: NewsCategorySlug | "all";
    geographicScope?: GeographicScope | "all";
    status?: SmartNewsArticle["status"] | "all";
    isBreaking?: boolean;
    search?: string;
    limit?: number;
  }): SmartNewsArticle[] {
    let result = [...this.articles];

    // Status filter
    if (filter?.status && filter.status !== "all") {
      result = result.filter(a => a.status === filter.status);
    } else if (!filter?.status) {
      // By default for public portal: only show published or breaking
      result = result.filter(a => a.status === "published" || a.status === "breaking");
    }

    // Category filter
    if (filter?.category && filter.category !== "all") {
      result = result.filter(a => a.category === filter.category);
    }

    // Geographic scope filter
    if (filter?.geographicScope && filter.geographicScope !== "all") {
      result = result.filter(a => a.geographic_scope === filter.geographicScope);
    }

    // Breaking filter
    if (filter?.isBreaking !== undefined) {
      result = result.filter(a => a.is_breaking === filter.isBreaking);
    }

    // Search filter
    if (filter?.search && filter.search.trim()) {
      const q = filter.search.toLowerCase();
      result = result.filter(a => 
        a.title.toLowerCase().includes(q) ||
        a.title_ml.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.summary_ml.toLowerCase().includes(q) ||
        a.source_name.toLowerCase().includes(q) ||
        a.keywords.some(k => k.toLowerCase().includes(q))
      );
    }

    // Sort by original_published_at or collected_at desc
    result.sort((a, b) => new Date(b.original_published_at).getTime() - new Date(a.original_published_at).getTime());

    if (filter?.limit && filter.limit > 0) {
      return result.slice(0, filter.limit);
    }

    return result;
  }

  getArticleById(id: string): SmartNewsArticle | null {
    const art = this.articles.find(a => a.id === id);
    if (art) {
      art.view_count += 1;
      return { ...art };
    }
    return null;
  }

  getBreakingNews(): SmartNewsArticle[] {
    return this.articles
      .filter(a => (a.status === "breaking" || a.is_breaking) && a.status !== "rejected")
      .sort((a, b) => new Date(b.original_published_at).getTime() - new Date(a.original_published_at).getTime());
  }

  getLocalNews(scope?: 'tanur' | 'malappuram'): SmartNewsArticle[] {
    return this.articles.filter(a => {
      if (a.status !== "published" && a.status !== "breaking") return false;
      if (scope === "tanur") return a.geographic_scope === "tanur";
      if (scope === "malappuram") return a.geographic_scope === "malappuram";
      return a.geographic_scope === "tanur" || a.geographic_scope === "malappuram" || a.category === "local";
    }).sort((a, b) => new Date(b.original_published_at).getTime() - new Date(a.original_published_at).getTime());
  }

  // ==========================================
  // SOURCES MANAGEMENT
  // ==========================================
  getSources(): SmartNewsSource[] {
    return [...this.sources];
  }

  getSourceById(id: string): SmartNewsSource | null {
    const s = this.sources.find(src => src.id === id);
    return s ? { ...s } : null;
  }

  addSource(source: Omit<SmartNewsSource, "id" | "consecutive_failures" | "articles_ingested_count">): SmartNewsSource {
    const newSource: SmartNewsSource = {
      ...source,
      id: "src-" + Date.now(),
      consecutive_failures: 0,
      articles_ingested_count: 0,
    };
    this.sources.unshift(newSource);
    this.addAuditLog("ADMIN", "SOURCE_UPDATE", undefined, `Added new news source: ${newSource.name}`);
    return newSource;
  }

  updateSource(id: string, updates: Partial<SmartNewsSource>): boolean {
    const src = this.sources.find(s => s.id === id);
    if (!src) return false;
    Object.assign(src, updates);
    this.addAuditLog("ADMIN", "SOURCE_UPDATE", undefined, `Updated source ${src.name}`);
    return true;
  }

  deleteSource(id: string): boolean {
    const idx = this.sources.findIndex(s => s.id === id);
    if (idx !== -1) {
      const removed = this.sources.splice(idx, 1)[0];
      this.addAuditLog("ADMIN", "SOURCE_UPDATE", undefined, `Removed source ${removed.name}`);
      return true;
    }
    return false;
  }

  // ==========================================
  // EDITORIAL REVIEW & BREAKING NEWS MODERATION
  // ==========================================
  getEditorialReviews(): NewsEditorialReview[] {
    return [...this.reviews];
  }

  reviewArticle(reviewId: string, action: 'approved' | 'rejected' | 'modified', notes: string, reviewerName = "Chief Editor"): boolean {
    const review = this.reviews.find(r => r.id === reviewId);
    if (!review) return false;

    const article = this.articles.find(a => a.id === review.article_id);
    review.review_status = action;
    review.reviewer_name = reviewerName;
    review.reviewer_notes = notes;
    review.action_taken_at = new Date().toISOString();

    if (article) {
      if (action === "approved") {
        article.status = "published";
        article.updated_at = new Date().toISOString();
        this.addAuditLog(reviewerName, "EDITORIAL_APPROVE", article.id, `Approved article after review: ${notes}`);
      } else if (action === "rejected") {
        article.status = "rejected";
        article.updated_at = new Date().toISOString();
        this.addAuditLog(reviewerName, "EDITORIAL_REJECT", article.id, `Rejected article: ${notes}`);
      }
    }
    return true;
  }

  addCorrection(articleId: string, correction: Omit<NewsCorrection, "id" | "published_at">): boolean {
    const article = this.articles.find(a => a.id === articleId);
    if (!article) return false;

    const record: NewsCorrection = {
      ...correction,
      id: "corr-" + Date.now(),
      article_id: articleId,
      published_at: new Date().toISOString(),
    };

    article.corrections.push(record);
    article.updated_at = new Date().toISOString();
    this.corrections.push(record);
    this.addAuditLog(correction.editor_name, "PUBLISH_CORRECTION", articleId, `Published correction (${correction.type}): ${correction.statement}`);
    return true;
  }

  addLiveUpdate(articleId: string, update: Omit<NewsLiveUpdate, "id" | "timestamp">): boolean {
    const article = this.articles.find(a => a.id === articleId);
    if (!article) return false;

    const record: NewsLiveUpdate = {
      ...update,
      id: "upd-" + Date.now(),
      article_id: articleId,
      timestamp: new Date().toISOString(),
    };

    article.updates.unshift(record);
    article.updated_at = new Date().toISOString();
    return true;
  }

  updateArticleStatus(articleId: string, status: SmartNewsArticle["status"], isBreaking?: boolean, severity?: SmartNewsArticle["breaking_severity"]): boolean {
    const article = this.articles.find(a => a.id === articleId);
    if (!article) return false;

    article.status = status;
    if (isBreaking !== undefined) article.is_breaking = isBreaking;
    if (severity !== undefined) article.breaking_severity = severity;
    article.updated_at = new Date().toISOString();

    return true;
  }

  updateArticle(articleId: string, updates: Partial<SmartNewsArticle>): boolean {
    const article = this.articles.find(a => a.id === articleId);
    if (!article) return false;

    Object.assign(article, updates);
    article.updated_at = new Date().toISOString();
    return true;
  }

  // ==========================================
  // AUTOMATED INGESTION & PIPELINE (SECTION 4, 5, 6, 7)
  // Fetch -> Validate -> Deduplicate -> Categorize -> Summarize -> Quality Check -> Publish
  // ==========================================
  ingestArticle(incoming: {
    original_headline: string;
    original_content: string;
    source_id: string;
    source_name: string;
    source_url: string;
    original_published_at: string;
    image_url?: string;
  }): { article: SmartNewsArticle; isNew: boolean; status: string } {
    const now = new Date().toISOString();
    const source = this.sources.find(s => s.id === incoming.source_id);
    const reliability = source?.reliability_score || 85;

    // 1. Deduplication check via content hash & title similarity
    const normalizedTitle = incoming.original_headline
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .trim();
    const contentHash = "hash-" + Buffer.from(normalizedTitle.slice(0, 32)).toString("base64");

    const existingMatch = this.articles.find(a => {
      if (a.content_hash === contentHash) return true;
      const existingNorm = a.original_headline.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim();
      return existingNorm.includes(normalizedTitle.slice(0, 20)) || normalizedTitle.includes(existingNorm.slice(0, 20));
    });

    if (existingMatch) {
      // Corroborate existing story!
      const alreadyHasSource = existingMatch.corroborated_sources.some(cs => cs.source_id === incoming.source_id);
      if (!alreadyHasSource) {
        existingMatch.corroborated_sources.push({
          id: "cs-" + Date.now(),
          article_id: existingMatch.id,
          source_id: incoming.source_id,
          source_name: incoming.source_name,
          original_url: incoming.source_url,
          original_headline: incoming.original_headline,
          published_at: incoming.original_published_at,
          reliability_score: reliability,
        });
        existingMatch.corroboration_count += 1;
        existingMatch.updated_at = now;
      }
      return { article: existingMatch, isNew: false, status: "corroborated" };
    }

    // 2. Automated Category & Location Detection
    const textToAnalyze = (incoming.original_headline + " " + incoming.original_content).toLowerCase();
    
    // Geographic scope detection
    let detectedScope: GeographicScope = source?.geographic_scope || "kerala";
    let detectedLocality = "";
    if (textToAnalyze.includes("tanur") || textToAnalyze.includes("താനൂർ") || textToAnalyze.includes("rayirimangalam") || textToAnalyze.includes("unniyal")) {
      detectedScope = "tanur";
      detectedLocality = "താനൂർ നഗരസഭ (Tanur Municipality)";
    } else if (textToAnalyze.includes("malappuram") || textToAnalyze.includes("മലപ്പുറം") || textToAnalyze.includes("tirur") || textToAnalyze.includes("calicut university")) {
      detectedScope = "malappuram";
      detectedLocality = "മലപ്പുറം ജില്ല (Malappuram District)";
    } else if (textToAnalyze.includes("kerala") || textToAnalyze.includes("കേരള") || textToAnalyze.includes("thiruvananthapuram")) {
      detectedScope = "kerala";
    } else if (textToAnalyze.includes("india") || textToAnalyze.includes("delhi") || textToAnalyze.includes("parliament")) {
      detectedScope = "national";
    }

    // Category detection
    let detectedCategory: NewsCategorySlug = source?.category_default || "local";
    if (textToAnalyze.includes("weather") || textToAnalyze.includes("monsoon") || textToAnalyze.includes("climate") || textToAnalyze.includes("rain") || textToAnalyze.includes("മഴ")) {
      detectedCategory = "environment";
    } else if (textToAnalyze.includes("school") || textToAnalyze.includes("exam") || textToAnalyze.includes("university") || textToAnalyze.includes("admission") || textToAnalyze.includes("പരീക്ഷ")) {
      detectedCategory = "education";
    } else if (textToAnalyze.includes("football") || textToAnalyze.includes("sevens") || textToAnalyze.includes("cricket") || textToAnalyze.includes("trophy") || textToAnalyze.includes("കായികം")) {
      detectedCategory = "sports";
    } else if (textToAnalyze.includes("health") || textToAnalyze.includes("hospital") || textToAnalyze.includes("vaccine") || textToAnalyze.includes("രോഗം") || textToAnalyze.includes("ആശുപത്രി")) {
      detectedCategory = "health";
    } else if (textToAnalyze.includes("business") || textToAnalyze.includes("market") || textToAnalyze.includes("fisheries") || textToAnalyze.includes("വ്യാപാരം")) {
      detectedCategory = "business";
    } else if (textToAnalyze.includes("election") || textToAnalyze.includes("minister") || textToAnalyze.includes("mla") || textToAnalyze.includes("രാഷ്ട്രീയ")) {
      detectedCategory = "politics";
    } else if (detectedScope === "tanur" || detectedScope === "malappuram") {
      detectedCategory = "local";
    }

    // 3. Sensitive / Breaking News Safeguard
    // Detect potentially urgent or sensitive claims (deaths, accidents, disasters)
    const sensitiveKeywords = ["death", "killed", "casualty", "accident", "blast", "arrested", "emergency", "മരണം", "അപകടം", "ദുരന്തം"];
    const isSensitive = sensitiveKeywords.some(kw => textToAnalyze.includes(kw));

    let finalStatus: SmartNewsArticle["status"] = "published";
    let isBreaking = false;
    let severity: SmartNewsArticle["breaking_severity"] = undefined;

    if (textToAnalyze.includes("alert") || textToAnalyze.includes("warning") || textToAnalyze.includes("breaking") || textToAnalyze.includes("ജാഗ്രത")) {
      isBreaking = true;
      severity = "urgent";
      finalStatus = "breaking";
    }

    if (isSensitive && reliability < 95) {
      // Route sensitive claims with single or lower reliability source to human review queue!
      finalStatus = "review";
      this.reviews.unshift({
        id: "rev-" + Date.now(),
        article_id: "art-" + Date.now(),
        reason: `Sensitive claim detected in uncorroborated report from ${incoming.source_name}. Awaiting corroboration or moderator verification.`,
        flagged_at: now,
        review_status: "pending",
      });
    }

    const catInfo = NEWS_CATEGORIES.find(c => c.slug === detectedCategory);

    // 4. Construct Published / Processed SmartNewsArticle
    const newArticle: SmartNewsArticle = {
      id: "art-" + Date.now() + "-" + Math.floor(Math.random() * 1000),
      title: incoming.original_headline,
      title_ml: incoming.original_headline,
      original_headline: incoming.original_headline,
      summary: incoming.original_content.slice(0, 220) + "...",
      summary_ml: incoming.original_content.slice(0, 220) + "...",
      full_content_preview: incoming.original_content.slice(0, 450),
      category: detectedCategory,
      category_name: catInfo?.name || "News",
      category_name_ml: catInfo?.name_ml || "വാർത്തകൾ",
      geographic_scope: detectedScope,
      specific_locality: detectedLocality,
      keywords: [detectedCategory, detectedScope, incoming.source_name],
      image_url: incoming.image_url || "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1200&auto=format&fit=crop&q=80",
      image_license: "Official Publisher Media / Editorial",
      image_attribution: incoming.source_name,
      source_id: incoming.source_id,
      source_name: incoming.source_name,
      source_url: incoming.source_url,
      original_published_at: incoming.original_published_at,
      collected_at: now,
      updated_at: now,
      status: finalStatus,
      is_breaking: isBreaking,
      breaking_severity: severity,
      breaking_verified: reliability >= 95,
      corroboration_count: 1,
      corroborated_sources: [],
      updates: [],
      corrections: [],
      ai_processed: true,
      ai_model_used: "Naadu AI Auto-Newsroom Pipeline",
      ai_disclaimer: `AI-generated summary based on reporting by ${incoming.source_name}. Refer to the publisher's canonical page for full coverage.`,
      content_hash: contentHash,
      view_count: 0,
      read_time: "2 min",
      featured: false,
    };

    this.articles.unshift(newArticle);
    if (source) {
      source.articles_ingested_count += 1;
      source.last_success_at = now;
      source.consecutive_failures = 0;
    }

    this.addAuditLog("PIPELINE", finalStatus === "published" ? "AUTO_PUBLISH" : "FLAG_FOR_REVIEW", newArticle.id, `Ingested from ${incoming.source_name}: ${newArticle.title}`);

    return { article: newArticle, isNew: true, status: finalStatus };
  }

  // ==========================================
  // FETCH LOGS & ANALYTICS
  // ==========================================
  getFetchLogs(): NewsFetchLog[] {
    return [...this.fetchLogs];
  }

  addFetchLog(log: Omit<NewsFetchLog, "id">): void {
    this.fetchLogs.unshift({
      ...log,
      id: "log-" + Date.now(),
    });
    if (this.fetchLogs.length > 50) this.fetchLogs.pop();
  }

  getNewsroomAnalytics() {
    const totalArticles = this.articles.length;
    const publishedCount = this.articles.filter(a => a.status === "published").length;
    const breakingCount = this.articles.filter(a => a.status === "breaking" || a.is_breaking).length;
    const reviewCount = this.articles.filter(a => a.status === "review").length;
    const rejectedCount = this.articles.filter(a => a.status === "rejected").length;
    const totalViews = this.articles.reduce((acc, a) => acc + a.view_count, 0);

    const byCategory: Record<string, number> = {};
    NEWS_CATEGORIES.forEach(c => {
      byCategory[c.name] = this.articles.filter(a => a.category === c.slug).length;
    });

    const byScope: Record<string, number> = {
      "താനൂർ നഗരസഭ (Tanur)": this.articles.filter(a => a.geographic_scope === "tanur").length,
      "മലപ്പുറം ജില്ല (Malappuram)": this.articles.filter(a => a.geographic_scope === "malappuram").length,
      "കേരളം (Kerala)": this.articles.filter(a => a.geographic_scope === "kerala").length,
      "ദേശീയം & അന്തർദേശീയം (National/Global)": this.articles.filter(a => a.geographic_scope === "national" || a.geographic_scope === "international").length,
    };

    return {
      totalArticles,
      publishedCount,
      breakingCount,
      reviewCount,
      rejectedCount,
      totalViews,
      activeSourcesCount: this.sources.filter(s => s.is_active).length,
      byCategory,
      byScope,
      autoPublishRate: totalArticles > 0 ? Math.round((publishedCount / totalArticles) * 100) : 0,
    };
  }

  private addAuditLog(actor: string, action: NewsAuditLog["action"], articleId?: string, details = ""): void {
    this.auditLogs.unshift({
      id: "audit-" + Date.now(),
      timestamp: new Date().toISOString(),
      actor,
      action,
      article_id: articleId,
      details,
    });
  }

  getAuditLogs(): NewsAuditLog[] {
    return [...this.auditLogs];
  }
}

// Global Singleton to ensure memory persistence across Next.js re-renders
const globalForNewsroom = globalThis as unknown as { newsroomStore: SmartNewsroomStore };
export const newsroomStore = globalForNewsroom.newsroomStore || new SmartNewsroomStore();
if (process.env.NODE_ENV !== "production") globalForNewsroom.newsroomStore = newsroomStore;
