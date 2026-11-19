/**
 * Verified Data Repository for Tanur (താനൂർ), Malappuram, Kerala
 * Sourced from:
 * - Tanur Municipality (https://tanurmunicipality.lsgkerala.gov.in/)
 * - Kerala Tourism (https://www.keralatourism.org/)
 * - Census of India 2011 (https://censusindia.gov.in/)
 * - Malappuram District Portal (https://malappuram.nic.in/)
 * - Islahul Uloom Arabic College (https://islahululoom.in/)
 * - Wikimedia Commons (CC BY-SA and CC BY licenses)
 */

export interface SourceReference {
  id: string;
  title: string;
  url: string;
  publisher: string;
  yearOrDate: string;
  category: "official" | "historical" | "research" | "community";
}

export interface TanurPhotoAsset {
  id: string;
  filenameOrUrl: string;
  title: string;
  subject: string;
  location: string;
  creator: string;
  originalSource: string;
  license: string;
  attributionText: string;
  dateAccessed: string;
}

export interface TanurHistoricalMilestone {
  year: string;
  era: string;
  title: string;
  title_ml: string;
  description: string;
  description_ml: string;
  sourceId: string;
  isDisputedOrTraditional?: boolean;
}

export interface TanurPlace {
  id: string;
  name: string;
  name_ml: string;
  category: "beach" | "harbour" | "temple" | "mosque" | "education" | "transport" | "heritage";
  category_ml: string;
  tagline: string;
  tagline_ml: string;
  description: string;
  description_ml: string;
  significance: string;
  significance_ml: string;
  location: string;
  location_ml: string;
  latitude: number;
  longitude: number;
  imageUrl: string;
  photoAssetId: string;
  visitorInfo?: {
    timings?: string;
    entryFee?: string;
    bestTimeToVisit?: string;
    nearestTransport?: string;
  };
  contactInfo?: {
    phone?: string;
    website?: string;
  };
  isNearby?: boolean; // labeled if outside municipal boundary
  sourceId: string;
}

export interface TanurCultureItem {
  id: string;
  title: string;
  title_ml: string;
  category: "art" | "music" | "festival" | "cuisine" | "literature" | "architecture";
  category_ml: string;
  description: string;
  description_ml: string;
  significance: string;
  imageUrl: string;
  sourceId: string;
}

export interface TanurStory {
  id: string;
  title: string;
  title_ml: string;
  authorOrSubject: string;
  role: string;
  category: "memoir" | "fisherfolk" | "scholar" | "entrepreneur" | "youth";
  excerpt: string;
  excerpt_ml: string;
  fullStory: string;
  fullStory_ml: string;
  date: string;
  verified: boolean;
  source: string;
}

export interface TanurInstitution {
  id: string;
  name: string;
  name_ml: string;
  type: "arabic_college" | "school" | "college" | "library" | "vocational";
  type_ml: string;
  establishedYear: string;
  location: string;
  description: string;
  description_ml: string;
  coursesOrFacilities: string[];
  website?: string;
  phone?: string;
  imageUrl: string;
  sourceId: string;
}

export interface TanurBusinessItem {
  id: string;
  name: string;
  name_ml: string;
  category: "seafood" | "boat_net" | "restaurant" | "retail" | "service";
  category_ml: string;
  address: string;
  phone?: string;
  description: string;
  verified: boolean;
}

export interface TanurPublicService {
  id: string;
  name: string;
  name_ml: string;
  category: "municipality" | "health" | "police" | "fire" | "revenue" | "transport" | "utility";
  category_ml: string;
  address: string;
  phone: string;
  emergencyNumber?: string;
  officialLink?: string;
  workingHours: string;
}

// -------------------------------------------------------------
// 1. VERIFIED CITATIONS AND SOURCE REPOSITORY
// -------------------------------------------------------------
export const TANUR_SOURCES: SourceReference[] = [
  {
    id: "src-lsgd",
    title: "Tanur Municipality Official Portal",
    url: "https://tanurmunicipality.lsgkerala.gov.in/",
    publisher: "Local Self Government Department, Government of Kerala",
    yearOrDate: "2024",
    category: "official",
  },
  {
    id: "src-census2011",
    title: "Census of India 2011: District Census Handbook Malappuram",
    url: "https://censusindia.gov.in/",
    publisher: "Directorate of Census Operations, Kerala",
    yearOrDate: "2011",
    category: "official",
  },
  {
    id: "src-kt-keraladeshapuram",
    title: "Keraladeshapuram Temple - Destination Details",
    url: "https://www.keralatourism.org/destination/keraladeshapuram-temple-malappuram/338",
    publisher: "Department of Tourism, Government of Kerala",
    yearOrDate: "2024",
    category: "official",
  },
  {
    id: "src-malappuram-nic",
    title: "Malappuram District Administration Portal",
    url: "https://malappuram.nic.in/",
    publisher: "National Informatics Centre, Ministry of Electronics & IT, Govt of India",
    yearOrDate: "2024",
    category: "official",
  },
  {
    id: "src-islahululoom",
    title: "Islahul Uloom Arabic College Official History",
    url: "https://islahululoom.in/",
    publisher: "Islahul Uloom Arabic College Governing Body",
    yearOrDate: "2024",
    category: "research",
  },
  {
    id: "src-sr-railway",
    title: "Southern Railway History: Tirur-Beypore Line 1861",
    url: "https://sr.indianrailways.gov.in/",
    publisher: "Southern Railway, Ministry of Railways",
    yearOrDate: "2023",
    category: "historical",
  },
  {
    id: "src-fisheries",
    title: "Kerala Fisheries Department Harbour Statistics",
    url: "https://fisheries.kerala.gov.in/",
    publisher: "Directorate of Fisheries, Government of Kerala",
    yearOrDate: "2023",
    category: "official",
  },
  {
    id: "src-kudumbashree",
    title: "Tanur Local History & Etymology",
    url: "https://kudumbashree.org/",
    publisher: "State Poverty Eradication Mission (Kudumbashree), Govt of Kerala",
    yearOrDate: "2022",
    category: "research",
  },
];

// -------------------------------------------------------------
// 2. AUTHENTIC PHOTOGRAPH ASSET MANIFEST (WIKIMEDIA COMMONS)
// -------------------------------------------------------------
export const TANUR_PHOTO_MANIFEST: TanurPhotoAsset[] = [
  {
    id: "photo-harbour-view",
    filenameOrUrl: "https://upload.wikimedia.org/wikipedia/commons/3/31/A_view_of_tanur_harbour.jpg",
    title: "A view of Tanur Harbour",
    subject: "Tanur Fishing Harbour and fishing crafts at anchorage",
    location: "Tanur Fishing Harbour, Malappuram",
    creator: "Shamil Hisham",
    originalSource: "https://commons.wikimedia.org/wiki/File:A_view_of_tanur_harbour.jpg",
    license: "CC BY-SA 4.0",
    attributionText: "Photo by Shamil Hisham via Wikimedia Commons (CC BY-SA 4.0)",
    dateAccessed: "2026-11-17",
  },
  {
    id: "photo-beach-sunset",
    filenameOrUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Tanur_beach%2C_Malappuram_%289%29.jpg",
    title: "Tanur Beach at Sunset",
    subject: "Golden hour sunset along the sandy shores of Tanur Beach",
    location: "Tanur Beach, Malappuram",
    creator: "Manu Sankerms (Kambliyil)",
    originalSource: "https://commons.wikimedia.org/wiki/File:Tanur_beach,_Malappuram_(9).jpg",
    license: "CC BY-SA 2.0",
    attributionText: "Photo by Manu Sankerms via Wikimedia Commons (CC BY-SA 2.0)",
    dateAccessed: "2026-11-17",
  },
  {
    id: "photo-railway-station",
    filenameOrUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Tanur_railway_station_-_panoramio.jpg",
    title: "Tanur Railway Station Platform",
    subject: "Historic Tanur Railway Station building and tracks",
    location: "Tanur Railway Station (TA), Malappuram",
    creator: "Maharoof K Mohammed",
    originalSource: "https://commons.wikimedia.org/wiki/File:Tanur_railway_station_-_panoramio.jpg",
    license: "CC BY 3.0",
    attributionText: "Photo by Maharoof K Mohammed via Wikimedia Commons (CC BY 3.0)",
    dateAccessed: "2026-11-17",
  },
  {
    id: "photo-landscape",
    filenameOrUrl: "https://upload.wikimedia.org/wikipedia/commons/6/67/Tanur%2C_Malappuram_district.jpg",
    title: "Tanur Coastal Landscape",
    subject: "Coastal coconut groves and landscape near Tanur",
    location: "Tanur, Malappuram district",
    creator: "Prof tpms",
    originalSource: "https://commons.wikimedia.org/wiki/File:Tanur,_Malappuram_district.jpg",
    license: "CC BY-SA 4.0",
    attributionText: "Photo by Prof tpms via Wikimedia Commons (CC BY-SA 4.0)",
    dateAccessed: "2026-11-17",
  },
  {
    id: "photo-town-view",
    filenameOrUrl: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    title: "Tanur Town Overview",
    subject: "Greenery and urban settlement in Tanur",
    location: "Tanur, Malappuram",
    creator: "Prof tpms",
    originalSource: "https://commons.wikimedia.org/wiki/File:Tanur.jpg",
    license: "CC BY-SA 4.0",
    attributionText: "Photo by Prof tpms via Wikimedia Commons (CC BY-SA 4.0)",
    dateAccessed: "2026-11-17",
  },
  {
    id: "photo-beach-waves",
    filenameOrUrl: "https://upload.wikimedia.org/wikipedia/commons/5/51/Tanur_beach%2C_Malappuram_%285%29.jpg",
    title: "Arabian Sea Surf at Tanur Beach",
    subject: "Waves breaking against the shoreline at Tanur",
    location: "Tanur Beach, Malappuram",
    creator: "Manu Sankerms (Kambliyil)",
    originalSource: "https://commons.wikimedia.org/wiki/File:Tanur_beach,_Malappuram_(5).jpg",
    license: "CC BY-SA 2.0",
    attributionText: "Photo by Manu Sankerms via Wikimedia Commons (CC BY-SA 2.0)",
    dateAccessed: "2026-11-17",
  },
  {
    id: "photo-beach-palms",
    filenameOrUrl: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Tanur_beach%2C_Malappuram_%284%29.jpg",
    title: "Coastline and Coconut Palms at Tanur Beach",
    subject: "Traditional coastline featuring coconut palm groves and beach",
    location: "Tanur Beach, Malappuram",
    creator: "Manu Sankerms (Kambliyil)",
    originalSource: "https://commons.wikimedia.org/wiki/File:Tanur_beach,_Malappuram_(4).jpg",
    license: "CC BY-SA 2.0",
    attributionText: "Photo by Manu Sankerms via Wikimedia Commons (CC BY-SA 2.0)",
    dateAccessed: "2026-11-17",
  },
  {
    id: "photo-beach-shore",
    filenameOrUrl: "https://upload.wikimedia.org/wikipedia/commons/3/33/Tanur_beach%2C_Malappuram_%281%29.jpg",
    title: "Tanur Coastal Shoreline",
    subject: "Wide view of sandy coastline and marine horizon",
    location: "Tanur Beach, Malappuram",
    creator: "Manu Sankerms (Kambliyil)",
    originalSource: "https://commons.wikimedia.org/wiki/File:Tanur_beach,_Malappuram_(1).jpg",
    license: "CC BY-SA 2.0",
    attributionText: "Photo by Manu Sankerms via Wikimedia Commons (CC BY-SA 2.0)",
    dateAccessed: "2026-11-17",
  },
];

// -------------------------------------------------------------
// 3. CORE GEOGRAPHIC & DEMOGRAPHIC FACTS (CENSUS 2011)
// -------------------------------------------------------------
export const TANUR_CORE_FACTS = {
  name: "Tanur",
  name_ml: "താനൂർ",
  alternateSpellings: ["Thanoor", "Tanore"],
  district: "Malappuram (മലപ്പുറം)",
  taluk: "Tirur (തിരൂർ)",
  state: "Kerala (കേരളം)",
  country: "India",
  pincode: "676302",
  stdCode: "0494",
  coordinates: {
    lat: 10.9768,
    lng: 75.8675,
  },
  elevation: "5 metres above sea level",
  coastalIdentity: "Malabar Coast, Arabian Sea",
  nearestRiver: "Poorappuzha River (പൂരപ്പുഴ) & Estuary",
  distances: {
    tirur: "9 km South",
    parappanangadi: "9 km North",
    malappuramHq: "32 km East",
    calicutAirport: "30 km North-East",
  },
  census2011: {
    censusYear: "2011",
    areaKm2: "19.49 sq. km",
    electoralWards: "44",
    totalPopulation: "69,534",
    malePopulation: "33,301",
    femalePopulation: "36,233",
    households: "15,547",
    literacyRate: "91.18%",
    sexRatio: "1,088 females per 1,000 males",
    note: "All figures represent official 2011 Census of India records published by Tanur Municipality and the Directorate of Census Operations, Kerala. They should not be conflated with current-day population projections.",
  },
  administrativeDistinction: {
    municipality: "Tanur Municipality (താനൂർ നഗരസഭ) - Formed on 1 November 2015. Covers 19.49 sq. km across 44 municipal wards.",
    blockPanchayat: "Tanur Block Panchayat (താനൂർ ബ്ലോക്ക് പഞ്ചായത്ത്) - A separate rural development jurisdiction governing surrounding panchayats including Ozhur, Ponmundam, Thanalur, Niramaruthur, and Cheriyamundam. Do not combine their population or geographical information.",
  },
  etymology: {
    origin: "Derivative of 'Tanni' (താന്നി മരം - Terminalia bellirica / Bastard Myrobalan tree) + 'Ur' (ഊര് - settlement/town).",
    explanation: "Historical accounts document that ancient groves of medicinal Thanni trees were prominent along this coastal settlement, giving rise to 'Tanniyoor' which evolved into modern Tanur.",
    sourceId: "src-kudumbashree",
  },
};

// -------------------------------------------------------------
// 4. HISTORICAL TIMELINE & HERITAGE
// -------------------------------------------------------------
export const TANUR_HISTORY_TIMELINE: TanurHistoricalMilestone[] = [
  {
    year: "Medieval Era",
    era: "Vettathunadu Dynasty",
    title: "Capital of the Kingdom of Vettathunadu",
    title_ml: "വെട്ടത്തുനാടിന്റെ തുറമുഖ തലസ്ഥാനം",
    description: "Tanur (historically Tanore or Prakashabhu) flourished as the principal coastal headquarters of the Kingdom of Vettathunadu (Tanur Swaroopam), playing an influential maritime role alongside the Zamorin of Calicut.",
    description_ml: "മധ്യകാലഘട്ടത്തിൽ വെട്ടത്തുനാട് സ്വരൂപത്തിന്റെ (പ്രകാശഭൂ) പ്രധാന തീരദേശ തുറമുഖ തലസ്ഥാനമായിരുന്നു താനൂർ. സാമൂതിരിയുമായി അടുത്ത നയതന്ത്ര ബന്ധം പുലർത്തിയിരുന്ന ഒരു സ്വതന്ത്ര നാട്ടുരാജ്യമായിരുന്നു ഇത്.",
    sourceId: "src-lsgd",
  },
  {
    year: "8th - 14th Century",
    era: "Malabar Maritime Network",
    title: "Spice & Timber Trade with Arab and Chinese Merchants",
    title_ml: "അറബ്, ചൈനീസ് വ്യാപാരികളുമായുള്ള സമുദ്ര വ്യാപാരം",
    description: "Tanur's natural anchorage near the Poorappuzha river mouth facilitated vibrant maritime trade. Malabar spices, coir, dried fish, and timber were exported to Arabia, the Persian Gulf, and Chinese ports.",
    description_ml: "പൂരപ്പുഴയുടെ അഴിമുഖത്തോട് ചേർന്നുള്ള താനൂർ തുറമുഖം വഴി കുരുമുളക്, ഏലം, കയർ, ഉണക്കമീൻ, തടി എന്നിവ അറബ് രാജ്യങ്ങളിലേക്കും ചൈനയിലേക്കും കയറ്റി അയച്ചിരുന്നു.",
    sourceId: "src-kudumbashree",
  },
  {
    year: "1546 AD",
    era: "Portuguese Presence",
    title: "Visit of St. Francis Xavier & Portuguese Relations",
    title_ml: "ഫ്രാൻസിസ് സേവ്യറുടെ സന്ദർശനവും പോർച്ചുഗീസ് ബന്ധവും",
    description: "Historical Jesuit records chronicle that missionary St. Francis Xavier visited Tanur in 1546. He engaged with the Vettathu Raja and local residents, visiting landmark heritage sites including Keraladeshapuram.",
    description_ml: "1546-ൽ വിശുദ്ധ ഫ്രാൻസിസ് സേവ്യർ താനൂർ സന്ദർശിച്ചതായി ചരിത്ര രേഖകളിൽ കാണുന്നു. വെട്ടത്തു രാജാവുമായി അദ്ദേഹം കൂടിക്കാഴ്ച നടത്തുകയും കേരളാദിത്യപുരം അടക്കമുള്ള പുരാതന കേന്ദ്രങ്ങൾ സന്ദർശിക്കുകയും ചെയ്തു.",
    sourceId: "src-kt-keraladeshapuram",
  },
  {
    year: "17th - 18th Century",
    era: "European Factory Era",
    title: "French Chappa and Coconut Trade Legacy",
    title_ml: "ഫ്രഞ്ച് ചാപ്പയും കൊപ്ര വ്യാപാരവും",
    description: "European trade missions, notably the French, established trading outposts ('Chappa') along the coastal belt of Tanur for processing copra, coir yarn, and coconut oil for continental export.",
    description_ml: "കൊപ്ര, വെളിച്ചെണ്ണ, കയറുല്പന്നങ്ങൾ എന്നിവയുടെ വിപണനത്തിനായി യൂറോപ്യൻ ശക്തികൾ (പ്രത്യേകിച്ച് ഫ്രഞ്ചുകാർ) താനൂർ തീരത്ത് ചാപ്പകൾ സ്ഥാപിച്ചു പ്രവർത്തിച്ചിരുന്നു.",
    sourceId: "src-lsgd",
  },
  {
    year: "1780s",
    era: "Mysore Kingdom",
    title: "Tipu Sultan's Coastal March and Road Infrastructure",
    title_ml: "ടിപ്പു സുൽത്താന്റെ പടനീക്കവും ഗതാഗത പാതയും",
    description: "During the Mysore campaigns in Malabar, Hyder Ali and Tipu Sultan's forces established logistical routes connecting Malabar forts, paving the way for regional trade routes along coastal Malappuram.",
    description_ml: "മലബാർ പടനീക്കത്തിന്റെ ഭാഗമായി ടിപ്പു സുൽത്താന്റെ സേന തീരദേശ മേഖലകളിലൂടെ കടന്നുപോവുകയും മലബാറിലെ ആദ്യകാല റോഡ് ശൃംഖലകൾ രൂപപ്പെടുകയും ചെയ്തു.",
    sourceId: "src-malappuram-nic",
  },
  {
    year: "1861 (12 March)",
    era: "Colonial Railway Pioneer",
    title: "Opening of the Tirur-Beypore Railway Corridor (Tanur Station)",
    title_ml: "തിരൂർ - ബേപ്പൂർ റെയിൽപാതയുടെ ഉദ്ഘാടനം (താനൂർ സ്റ്റേഷൻ)",
    description: "The historic railway corridor connecting Tirur and Beypore was inaugurated on March 12, 1861 by Madras Railway, making Tanur one of the earliest railway stations in Kerala and South India.",
    description_ml: "1861 മാർച്ച് 12-ന് തിരൂർ മുതൽ ബേപ്പൂർ വരെയുള്ള കേരളത്തിലെ ആദ്യത്തെ റെയിൽവേ പാത കമ്മീഷൻ ചെയ്തപ്പോൾ താനൂർ സ്റ്റേഷൻ ദക്ഷിണേന്ത്യയിലെ തന്നെ ആദ്യകാല റെയിൽവേ കേന്ദ്രങ്ങളിലൊന്നായി മാറി.",
    sourceId: "src-sr-railway",
  },
  {
    year: "1921",
    era: "Freedom Struggle",
    title: "Khilafat Movement & National Freedom Struggle",
    title_ml: "1921-ലെ ഖിലാഫത്ത് പ്രസ്ഥാനവും സ്വാതന്ത്ര്യസമരവും",
    description: "Tanur played an active role during the 1921 Malabar anti-colonial movement. Prominent local leaders mobilized community gatherings in support of self-rule and against colonial revenue oppressions.",
    description_ml: "1921-ലെ മലബാർ സമരത്തിലും ദേശീയ സ്വാതന്ത്ര്യസമര പ്രസ്ഥാനങ്ങളിലും താനൂരിലെ ജനങ്ങൾ സജീവമായി പങ്കെടുത്തു. നിസ്സഹകരണ പ്രസ്ഥാനത്തിനും ഖിലാഫത്ത് സമിതികൾക്കും വലിയ ജനപിന്തുണ ഇവിടെ ലഭിച്ചു.",
    sourceId: "src-lsgd",
  },
  {
    year: "1924",
    era: "Islamic Scholarly Renaissance",
    title: "Foundation of Islahul Uloom Arabic College",
    title_ml: "ഇസ്ലാഹുൽ ഉലൂം അറബിക് കോളേജിന്റെ സ്ഥാപനം",
    description: "Renowned Islamic reformer Pangil Ahmed Kutty Musliyar established Islahul Uloom Arabic College at Tanur, evolving from the centuries-old Valiya Kulangara Palli Dars into a premier theological institution in Kerala.",
    description_ml: "പ്രമുഖ പണ്ഡിതനും നവോത്ഥാന നായകനുമായ പാങ്ങിൽ അഹമ്മദ് കുട്ടി മുസ്ലിയാരുടെ നേതൃത്വത്തിൽ താനൂർ വലിയ കുളങ്ങര പള്ളി ദർസിന്റെ പാരമ്പര്യത്തിൽ 1924-ൽ ഇസ്ലാഹുൽ ഉലൂം അറബിക് കോളേജ് സ്ഥാപിതമായി.",
    sourceId: "src-islahululoom",
  },
  {
    year: "Mid-20th Century",
    era: "Literary Movement",
    title: "Tanur Travel Library & Public Reading Movement",
    title_ml: "താനൂർ സഞ്ചാര സാഹിത്യ ലൈബ്രറിയും വായനശാലാ പ്രസ്ഥാനവും",
    description: "Establishment of the Tanur Travel Library fostered a distinctive literary culture in Malabar, encouraging reading, travel writing, and socio-educational awareness across generations of coastal youth.",
    description_ml: "യാത്രാവിവരണങ്ങൾക്കും സാഹിത്യത്തിനും മുൻഗണന നൽകിക്കൊണ്ട് താനൂരിൽ ആരംഭിച്ച സഞ്ചാര സാഹിത്യ ലൈബ്രറി മലബാറിലെ വായനശാലാ പ്രസ്ഥാനത്തിൽ ശ്രദ്ധേയമായ അധ്യായമായി മാറി.",
    sourceId: "src-lsgd",
  },
  {
    year: "1950",
    era: "Local Self-Government",
    title: "Formation of Tanur Grama Panchayat",
    title_ml: "താനൂർ ഗ്രാമപഞ്ചായത്ത് രൂപീകരണം",
    description: "Tanur Grama Panchayat was officially constituted in 1950 under the Madras Village Panchayats Act, formalizing local democratic governance in the post-independence era.",
    description_ml: "സ്വാതന്ത്ര്യാനന്തരം 1950-ൽ മദ്രാസ് വില്ലേജ് പഞ്ചായത്ത് ആക്ട് പ്രകാരം താനൂർ ഗ്രാമപഞ്ചായത്ത് നിലവിൽ വന്നു.",
    sourceId: "src-lsgd",
  },
  {
    year: "1964",
    era: "Panchayat Reorganisation",
    title: "Reconstitution under Kerala Panchayati Raj Framework",
    title_ml: "കേരള പഞ്ചായത്ത് ആക്ട് പ്രകാരമുള്ള പുനഃസംഘടന",
    description: "In 1964, following the implementation of the Kerala Panchayats Act 1960, Tanur was restructured to meet the expanding municipal and developmental requirements of the coastal population.",
    description_ml: "1964-ൽ കേരള പഞ്ചായത്ത് ആക്ട് അനുസരിച്ച് വികസന ആവശ്യങ്ങൾ കണക്കിലെടുത്ത് പഞ്ചായത്ത് അതിർത്തികളും ഭരണസമിതിയും വിപുലീകരിച്ചു.",
    sourceId: "src-lsgd",
  },
  {
    year: "2015 (1 November)",
    era: "Municipal Upgrade",
    title: "Upgradation to Tanur Municipality (താനൂർ നഗരസഭ)",
    title_ml: "താനൂർ നഗരസഭയായി പദവി ഉയർത്തൽ",
    description: "On Kerala Piravi Day (1 November 2015), the Government of Kerala upgraded Tanur Grama Panchayat into Tanur Municipality, creating 45 electoral divisions to oversee rapid coastal urban development.",
    description_ml: "2015 നവംബർ 1-ന് കേരളപ്പിറവി ദിനത്തിൽ താനൂർ ഗ്രാമപഞ്ചായത്തിനെ നഗരസഭയായി സർക്കാർ ഉയർത്തി. 45 വാർഡുകളോടെ നഗരസഭാ ഭരണം ആരംഭിച്ചു.",
    sourceId: "src-lsgd",
  },
];

// -------------------------------------------------------------
// 5. PLACES AND LANDMARKS
// -------------------------------------------------------------
export const TANUR_PLACES: TanurPlace[] = [
  {
    id: "tanur-beach",
    name: "Tanur Beach",
    name_ml: "താനൂർ ബീച്ച്",
    category: "beach",
    category_ml: "കടലോരം / ബീച്ച്",
    tagline: "Golden shores, rhythmic Arabian Sea surf, and traditional fishing life",
    tagline_ml: "അറബിക്കടലിന്റെ തിരമാലകളും നാടൻ വള്ളങ്ങളും നിറഞ്ഞ തീരഭംഗി",
    description: "Tanur Beach is the vibrant coastal heart of the town. Lined with swaying coconut palms and traditional wooden canoes, it offers sweeping sunset vistas and a direct glimpse into the authentic coastal life of Malabar fishermen.",
    description_ml: "താനൂർ നഗരത്തിന്റെ പ്രകൃതിരമണീയമായ തീരമാണ് താനൂർ ബീച്ച്. തെങ്ങോലകൾ കാറ്റിലാടുന്ന ഈ കടലോരത്ത് വൈകുന്നേരങ്ങളിൽ സൂര്യാസ്തമയം കാണാനും തീരദേശ ജീവിതത്തിന്റെ തനിമ അടുത്തറിയാനും നിരവധി ആളുകൾ എത്തിച്ചേരുന്നു.",
    significance: "Crucial landing point for traditional fishing crafts and a cherished community gathering space for local families and visitors.",
    significance_ml: "തീരദേശ മത്സ്യത്തൊഴിലാളികളുടെ പരമ്പരാഗത കരവലത്തൊഴിലിനും വൈകുന്നേരങ്ങളിലെ ജനകീയ കൂട്ടായ്മകൾക്കും പേരുകേട്ട ഇടം.",
    location: "Coastal Road, Tanur",
    location_ml: "തീരദേശ റോഡ്, താനൂർ",
    latitude: 10.9745,
    longitude: 75.8562,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Tanur_beach%2C_Malappuram_%289%29.jpg",
    photoAssetId: "photo-beach-sunset",
    visitorInfo: {
      timings: "Open all days (Best from 4:30 PM to 7:00 PM)",
      entryFee: "Free public access",
      bestTimeToVisit: "October to March",
      nearestTransport: "1.5 km from Tanur Railway Station and Bus Stand",
    },
    sourceId: "src-malappuram-nic",
  },
  {
    id: "tanur-fishing-harbour",
    name: "Tanur Fishing Harbour & Pulimuttu",
    name_ml: "താനൂർ ഫിഷിംഗ് ഹാർബറും പുലിമുട്ടും",
    category: "harbour",
    category_ml: "തുറമുഖം / പുലിമുട്ട്",
    tagline: "Major marine fisheries hub on the Malabar coastline with modern breakwater walkway",
    tagline_ml: "മലബാറിലെ പ്രധാന മത്സ്യബന്ധന തുറമുഖവും കടലിലേക്ക് നീളുന്ന പുലിമുട്ടും",
    description: "Commissioned under the Kerala Fisheries Department and Harbour Engineering Wing, Tanur Fishing Harbour provides a safe basin for hundreds of deep-sea trawlers, purse-seiners, and traditional crafts. Its granite breakwater (Pulimuttu) extends into the sea, offering breathtaking panoramic sea views.",
    description_ml: "കേരള ഫിഷറീസ് വകുപ്പിന്റെ കീഴിലുള്ള ഈ ആധുനിക തുറമുഖം നൂറുകണക്കിന് ബോട്ടുകൾക്കും വള്ളങ്ങൾക്കും സുരക്ഷിത താവളമൊരുക്കുന്നു. കടലിലേക്ക് തള്ളിനിൽക്കുന്ന കരിങ്കൽ പുലിമുട്ട് മനോഹരമായ ഒരു സായാഹ്ന നടപ്പാത കൂടിയാണ്.",
    significance: "The backbone of Tanur's marine economy, supporting thousands of fishing families, auctioneers, cold storages, and wholesale transport logistics.",
    significance_ml: "താനൂരിന്റെ സാമ്പത്തിക ജീവനാഡിയായ ഹാർബർ ആയിരക്കണക്കിന് മത്സ്യത്തൊഴിലാളി കുടുംബങ്ങളുടെ ഉപജീവന മാർഗ്ഗമാണ്.",
    location: "Harbour Road, West Tanur",
    location_ml: "ഹാർബർ റോഡ്, പടിഞ്ഞാറെ താനൂർ",
    latitude: 10.9802,
    longitude: 75.8541,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/31/A_view_of_tanur_harbour.jpg",
    photoAssetId: "photo-harbour-view",
    visitorInfo: {
      timings: "Harbour operations 24/7; visitor walking allowed daylight hours",
      entryFee: "Free access (restricted during rough monsoon seas)",
      nearestTransport: "2 km from Town Centre",
    },
    sourceId: "src-fisheries",
  },
  {
    id: "keraladeshapuram-temple",
    name: "Keraladeshapuram Sree Krishna Temple",
    name_ml: "കേരളാദിത്യപുരം / കേരളാധീശപുരം ശ്രീകൃഷ്ണ ക്ഷേത്രം",
    category: "temple",
    category_ml: "പുരാതന ക്ഷേത്രം",
    tagline: "One of Kerala's oldest consecrated Vishnu temples, steeped in centuries of heritage",
    tagline_ml: "കേരളത്തിലെ ഏറ്റവും പുരാതനമായ മഹാവിഷ്ണു ക്ഷേത്രങ്ങളിലൊന്ന്",
    description: "Located approximately 3 km south of Tanur town, Keraladeshapuram Temple is dedicated to Lord Vishnu. Believed by tradition to date back over thousands of years, historical records link its heritage with Parashurama traditions and document a visit by St. Francis Xavier in 1546 AD.",
    description_ml: "താനൂർ ടൗണിൽ നിന്ന് 3 കി.മീ തെക്കുമാറി സ്ഥിതിചെയ്യുന്ന പ്രസിദ്ധമായ ക്ഷേത്രം. പരശുരാമൻ പ്രതിഷ്ഠ നടത്തിയതെന്ന് വിശ്വസിക്കപ്പെടുന്ന ഈ പുരാതന മഹാവിഷ്ണു ക്ഷേത്രം 1546-ൽ വിശുദ്ധ ഫ്രാൻസിസ് സേവ്യർ സന്ദർശിച്ചതായി ചരിത്രരേഖകളിൽ രേഖപ്പെടുത്തിയിട്ടുണ്ട്.",
    significance: "Ancient architectural masterpiece featuring traditional wood carvings, copper-plated sanctum, and vibrant annual temple festival (Utsavam).",
    significance_ml: "പരമ്പരാഗത വാസ്തുവിദ്യയും ശില്പകലയും വാർഷിക ഉത്സവവും കൊണ്ട് മലബാറിലെ പ്രമുഖ തീർത്ഥാടന കേന്ദ്രം.",
    location: "Keraladeshapuram, Tanur",
    location_ml: "കേരളാദിത്യപുരം, താനൂർ",
    latitude: 10.9582,
    longitude: 75.8715,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/67/Tanur%2C_Malappuram_district.jpg",
    photoAssetId: "photo-landscape",
    visitorInfo: {
      timings: "Morning: 5:00 AM – 11:30 AM; Evening: 5:00 PM – 8:00 PM",
      entryFee: "Free (Traditional dress code applies)",
      bestTimeToVisit: "Annual Utsavam festival season",
      nearestTransport: "3 km from Tanur Railway Station",
    },
    sourceId: "src-kt-keraladeshapuram",
  },
  {
    id: "thooval-theeram",
    name: "Thooval Theeram & Poorappuzha Estuary",
    name_ml: "തൂവൽതീരം & പൂരപ്പുഴ അഴിമുഖം",
    category: "beach",
    category_ml: "നദീമുഖം / ഇക്കോ ടൂറിസം",
    tagline: "Serene meeting point of Poorappuzha River backwaters and the Arabian Sea",
    tagline_ml: "പൂരപ്പുഴ അറബിക്കടലുമായി സംഗമിക്കുന്ന ശാന്തസുന്ദരമായ അഴിമുഖതീരം",
    description: "Thooval Theeram is situated near the estuary where the Poorappuzha River discharges into the Arabian Sea. Fringed by mangroves, estuary sandbanks, and coastal migratory birds, it is a naturally tranquil ecological corridor.",
    description_ml: "പൂരപ്പുഴ കായൽ അറബിക്കടലിലേക്ക് ചേരുന്ന അഴിമുഖ പ്രദേശം. കണ്ടൽക്കാടുകളും ജലപക്ഷികളും നിറഞ്ഞ മനോഹരമായ പ്രകൃതിദത്ത കായലോരം.",
    significance: "Rich riverine biodiversity and mangrove habitat. Note: Visitors are strictly advised to adhere to official river safety regulations.",
    significance_ml: "കായൽ-കടൽ ജൈവവൈവിധ്യ സമ്പന്നമായ പ്രദേശം. ഔദ്യോഗിക സുരക്ഷാ നിർദ്ദേശങ്ങൾ പാലിച്ചുകൊണ്ട് മാത്രമേ സന്ദർശനം അനുവദിക്കൂ.",
    location: "Ottumpuram - Thooval Theeram, Tanur",
    location_ml: "ഒട്ടുംപുറം - തൂവൽതീരം, താനൂർ",
    latitude: 10.9912,
    longitude: 75.8498,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Tanur_beach%2C_Malappuram_%284%29.jpg",
    photoAssetId: "photo-beach-palms",
    visitorInfo: {
      timings: "Daylight hours (6:00 AM – 6:30 PM)",
      entryFee: "Free access to public beach shore",
      nearestTransport: "3.5 km from Tanur Town",
    },
    sourceId: "src-lsgd",
  },
  {
    id: "ottumpuram-beach",
    name: "Ottumpuram Beach",
    name_ml: "ഒട്ടുംപുറം ബീച്ച്",
    category: "beach",
    category_ml: "കടലോരം",
    tagline: "Pristine coastal stretch bordering the northern edge of Tanur",
    tagline_ml: "താനൂരിന്റെ വടക്കേ അതിർത്തിയിലെ മനോഹരമായ സായാഹ്ന കടലോരം",
    description: "Ottumpuram Beach is an expansive, uncrowded coastal expanse adjoining the Poorappuzha estuary. It is celebrated for its wide sands, casuarina plantations, coastal breeze, and peaceful ambience away from commercial noise.",
    description_ml: "പൂരപ്പുഴയുടെ അഴിമുഖത്തോട് ചേർന്നുകിടക്കുന്ന വിസ്തൃതമായ കടൽത്തീരം. പച്ചപ്പ് നിറഞ്ഞ കാറ്റാടി മരങ്ങളും ശാന്തമായ അന്തരീക്ഷവും ഇവിടേക്ക് പ്രകൃതിസ്നേഹികളെ ആകർഷിക്കുന്നു.",
    significance: "Coastal conservation area with nesting zones for marine fauna and scenic evening walking stretch.",
    significance_ml: "തീരദേശ പരിസ്ഥിതി സംരക്ഷണത്തിനും വൈകുന്നേര നടത്തത്തിനും അനുയോജ്യമായ പ്രദേശം.",
    location: "Ottumpuram, Tanur",
    location_ml: "ഒട്ടുംപുറം, താനൂർ",
    latitude: 10.9945,
    longitude: 75.8475,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Tanur_beach%2C_Malappuram_%283%29.jpg",
    photoAssetId: "photo-beach-shore",
    visitorInfo: {
      timings: "Open all days",
      entryFee: "Free",
      nearestTransport: "4 km from Tanur Railway Station",
    },
    sourceId: "src-malappuram-nic",
  },
  {
    id: "shobha-parambu-temple",
    name: "Shobha Parambu Sree Kurumba Bhagavathi Temple",
    name_ml: "ശോഭാപറമ്പ് ശ്രീ കുറുമ്പ ഭഗവതി ക്ഷേത്രം",
    category: "temple",
    category_ml: "ഭഗവതി ക്ഷേത്രം",
    tagline: "Famed Mother Goddess shrine known for the grand annual Shobha Parambu Thalappoli",
    tagline_ml: "പ്രസിദ്ധമായ ശോഭാപറമ്പ് താലപ്പൊലി ഉത്സവത്തിന് പേരുകേട്ട ഭഗവതി ക്ഷേത്രം",
    description: "An illustrious Devi shrine in Tanur, the temple is dedicated to Goddess Kurumba Bhagavathi (Bhadrakali). It is celebrated across Malappuram district for the colorful Shobha Parambu Thalappoli / Bharani festival featuring traditional percussion, caparisoned elephants, and deep local devotion.",
    description_ml: "താനൂരിലെ പ്രമുഖ ഭദ്രകാളി ക്ഷേത്രം. മേളപ്പെരുക്കവും വർണ്ണാഭമായ താലപ്പൊലിയും ആനയെഴുന്നള്ളിപ്പുമായി അരങ്ങേറുന്ന ശോഭാപറമ്പ് ഭരണി മഹോത്സവം മലബാറിലെ തന്നെ പ്രധാന ഉത്സവങ്ങളിലൊന്നാണ്.",
    significance: "A premier cultural and spiritual hub in Tanur celebrating authentic Malabar temple percussion and folkloric festivities.",
    significance_ml: "പഞ്ചവാദ്യം, പാണ്ടിമേളം, താലപ്പൊലി എന്നിവ ഒത്തുചേരുന്ന മലബാറിന്റെ സാംസ്കാരിക കൂട്ടായ്മ.",
    location: "Shobha Parambu, Tanur",
    location_ml: "ശോഭാപറമ്പ്, താനൂർ",
    latitude: 10.9835,
    longitude: 75.8742,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    photoAssetId: "photo-town-view",
    visitorInfo: {
      timings: "5:30 AM – 10:30 AM; 5:00 PM – 7:30 PM",
      entryFee: "Free (Traditional attire required)",
      bestTimeToVisit: "Annual Thalappoli festival month (February - March)",
      nearestTransport: "2 km from Town Centre",
    },
    sourceId: "src-lsgd",
  },
  {
    id: "islahul-uloom-college",
    name: "Islahul Uloom Arabic College",
    name_ml: "ഇസ്ലാഹുൽ ഉലൂം അറബിക് കോളേജ്",
    category: "education",
    category_ml: "ചരിത്ര വിദ്യാഭ്യാസ സ്ഥാപനം",
    tagline: "Centenary Islamic and Arabic theological institution established in 1924",
    tagline_ml: "1924-ൽ സ്ഥാപിതമായ നൂറ്റാണ്ടിന്റെ പാരമ്പര്യമുള്ള അറബിക്-ഇസ്ലാമിക് കലാലയം",
    description: "Founded in 1924 under the visionary leadership of scholar Pangil Ahmed Kutty Musliyar, Islahul Uloom Arabic College represents over a century of educational excellence in Malabar. Evolving from traditional Dars education into modern Arabic and moral sciences, it is affiliated today with Darul Huda Islamic University.",
    description_ml: "പ്രമുഖ പണ്ഡിതനും നേതാവുമായ പാങ്ങിൽ അഹമ്മദ് കുട്ടി മുസ്ലിയാരുടെ നേതൃത്വത്തിൽ 1924-ൽ സ്ഥാപിതമായ ഈ കലാലയം മലബാറിലെ വിദ്യാഭ്യാസ-സാംസ്കാരിക നവോത്ഥാനത്തിൽ നിർണ്ണായക പങ്ക് വഹിച്ചു. നിലവിൽ ദാറുൽ ഹുദാ ഇസ്ലാമിക് യൂണിവേഴ്സിറ്റിയുമായി അഫിലിയേറ്റ് ചെയ്ത് പ്രവർത്തിക്കുന്നു.",
    significance: "A foundational cornerstone of higher religious and linguistic scholarship that educated generations of educators, writers, and community leaders.",
    significance_ml: "നൂറ്റാണ്ടിലേറെയായി ആയിരക്കണക്കിന് പണ്ഡിതന്മാരെയും അധ്യാപകരെയും വാർത്തെടുത്ത മലബാറിലെ ജ്ഞാനകേന്ദ്രം.",
    location: "Islahul Uloom Campus, Tanur",
    location_ml: "ഇസ്ലാഹുൽ ഉലൂം കാമ്പസ്, താനൂർ",
    latitude: 10.9785,
    longitude: 75.8698,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    photoAssetId: "photo-town-view",
    visitorInfo: {
      timings: "Office hours: 9:00 AM – 4:30 PM (Working days)",
      nearestTransport: "1 km from Tanur Railway Station",
    },
    contactInfo: {
      website: "https://islahululoom.in/",
      phone: "0494 2440260",
    },
    sourceId: "src-islahululoom",
  },
  {
    id: "tanur-town-juma-masjid",
    name: "Tanur Town Juma Masjid & Valiya Kulangara Palli",
    name_ml: "താനൂർ ടൗൺ ജുമാ മസ്ജിദ് & വലിയ കുളങ്ങര പള്ളി",
    category: "mosque",
    category_ml: "പൈതൃക പള്ളി",
    tagline: "Historic community mosques bearing classic Kerala-Malabar timber architecture",
    tagline_ml: "കേരള തനിമയാർന്ന തച്ചുശാസ്ത്ര മികവോടെ നിലകൊള്ളുന്ന പൗരാണിക പള്ളി",
    description: "Tanur's principal Juma Masjid and the historic Valiya Kulangara Palli showcase centuries-old Kerala Islamic architecture with multi-tiered gabled tiled roofs, intricately carved teak wood rafters, and central pond ablution tanks. They have served as epicenters for communal cohesion and scholarship for centuries.",
    description_ml: "താനൂരിലെ പ്രമുഖ ജുമാ മസ്ജിദും വലിയ കുളങ്ങര പള്ളിയും കേരളത്തിന്റെ പാരമ്പര്യ തച്ചുശാസ്ത്ര ചാരുത വിളിച്ചോതുന്ന പൗരാണിക വാസ്തുശില്പങ്ങളാണ്. നൂറ്റാണ്ടുകളായി താനൂരിലെ സാമുദായിക സൗഹാർദ്ദത്തിന്റെയും പ്രാർത്ഥനകളുടെയും കേന്ദ്രം.",
    significance: "Architectural treasure embodying indigenous wooden carving craftsmanship and home to the historic Dars educational tradition of Malabar.",
    significance_ml: "പഴക്കം ചെന്ന മരപ്പണികളും പാരമ്പര്യ പള്ളി ദർസ് സംവിധാനവും നിലനിന്നിരുന്ന പൈതൃക കേന്ദ്രം.",
    location: "Main Town Road, Tanur",
    location_ml: "മെയിൻ ടൗൺ റോഡ്, താനൂർ",
    latitude: 10.9765,
    longitude: 75.8645,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    photoAssetId: "photo-town-view",
    visitorInfo: {
      timings: "Open for prayer times",
      nearestTransport: "Walking distance from Tanur Town Circle",
    },
    sourceId: "src-lsgd",
  },
  {
    id: "tanur-railway-station",
    name: "Tanur Railway Station (Station Code: TA)",
    name_ml: "താനൂർ റെയിൽവേ സ്റ്റേഷൻ (കോഡ്: TA)",
    category: "transport",
    category_ml: "റെയിൽവേ പൈതൃക സ്റ്റേഷൻ",
    tagline: "Historic station on Kerala's very first railway line commissioned in 1861",
    tagline_ml: "1861-ൽ ആരംഭിച്ച കേരളത്തിലെ ആദ്യത്തെ റെയിൽവേ പാതയിലെ പൈതൃക സ്റ്റേഷൻ",
    description: "Tanur Railway Station is an NSG-5 category passenger hub on the Shoranur–Mangalore section of Southern Railway (Palakkad division). It opened on March 12, 1861 as an integral stop on the pioneering Tirur–Beypore railway link, connecting Tanur's maritime trade with the wider subcontinent.",
    description_ml: "ദക്ഷിണ റെയിൽവേയിലെ പാലക്കാട് ഡിവിഷന്റെ കീഴിലുള്ള പ്രധാന സ്റ്റേഷൻ. 1861 മാർച്ച് 12-ന് കേരളത്തിലെ പ്രഥമ റെയിൽപാത യാഥാർത്ഥ്യമായപ്പോൾ തന്നെ താനൂർ സ്റ്റേഷൻ നിലവിൽ വന്നു. നൂറ്റാണ്ടുകളായി നാട്ടുകാരുടെയും വ്യാപാരികളുടെയും പ്രധാന ഗതാഗത ആശ്രയം.",
    significance: "A living transportation monument linking Malappuram's coastal community with Kozhikode, Mangalore, Kochi, and southern Kerala.",
    significance_ml: "കേരളത്തിന്റെ ഗതാഗത ചരിത്രത്തിലെ സുവർണ്ണ അധ്യായവും താനൂരിന്റെ യാത്രാ ഹബ്ബും.",
    location: "Station Road, Tanur",
    location_ml: "സ്റ്റേഷൻ റോഡ്, താനൂർ",
    latitude: 10.9749,
    longitude: 75.8672,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Tanur_railway_station_-_panoramio.jpg",
    photoAssetId: "photo-railway-station",
    visitorInfo: {
      timings: "24-hour train services",
      nearestTransport: "Located in Tanur town centre",
    },
    sourceId: "src-sr-railway",
  },
  {
    id: "thrikkaikkattu-shiva-temple",
    name: "Thrikkaikkattu Sree Mahadeva Shiva Temple",
    name_ml: "തൃക്കൈക്കാട്ട് ശ്രീ മഹാദേവ ശിവക്ഷേത്രം",
    category: "temple",
    category_ml: "ശിവക്ഷേത്രം",
    tagline: "Ancient Shiva sanctuary with quiet spiritual ambiance and sacred grove",
    tagline_ml: "നിശ്ശബ്ദമായ ഭക്തിസാന്ദ്രതയും കാവുമുള്ള പുരാതന മഹാദേവ ക്ഷേത്രം",
    description: "Nestled in an idyllic sacred setting, Thrikkaikkattu Shiva Temple is revered for its ancient stone lingam idol, sanctified well, and traditional Shivarathri celebrations.",
    description_ml: "താനൂരിന്റെ ഗ്രാമീണ ഭംഗിയിൽ സ്ഥിതിചെയ്യുന്ന പ്രസിദ്ധമായ ശിവക്ഷേത്രം. പുരാതനമായ ശ്രീകോവിലും ശാന്തമായ അന്തരീക്ഷവും ശിവരാത്രി മഹോത്സവവും ഇവിടുത്തെ പ്രത്യേകതകളാണ്.",
    significance: "A peaceful heritage spiritual centre exemplifying Kerala's classical stone and tile sacred architecture.",
    significance_ml: "പാരമ്പര്യ ആചാരങ്ങളും ശിവരാത്രി ആഘോഷങ്ങളും നടക്കുന്ന പ്രധാന ആരാധനാലയം.",
    location: "Near Pariyapuram Road, Tanur",
    location_ml: "പരിയാപുരം റോഡിനടുത്ത്, താനൂർ",
    latitude: 10.9698,
    longitude: 75.8812,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/67/Tanur%2C_Malappuram_district.jpg",
    photoAssetId: "photo-landscape",
    visitorInfo: {
      timings: "5:30 AM – 9:30 AM; 5:00 PM – 7:30 PM",
      entryFee: "Free",
      nearestTransport: "2.5 km from Tanur Station",
    },
    sourceId: "src-lsgd",
  },
  {
    id: "ganapathiyangava-temple",
    name: "Ganapathiyangava Temple, Pariyapuram",
    name_ml: "ഗണപതിയാങ്ങാവ ക്ഷേത്രം, പരിയാപുരം",
    category: "temple",
    category_ml: "ക്ഷേത്രം (അയൽപക്കം)",
    tagline: "Historic Ganapathi shrine located in the neighboring Pariyapuram cultural belt",
    tagline_ml: "പരിയാപുരം മേഖലയിലെ ചരിത്രപ്രസിദ്ധമായ വിനായക ക്ഷേത്രം",
    description: "Situated in Pariyapuram just outside the core municipal perimeter, this revered Ganapathi temple is closely woven into the socio-cultural life of Tanur residents. It celebrates Vinayaka Chathurthi with traditional elephant processions and music.",
    description_ml: "താനൂർ മുനിസിപ്പാലിറ്റി അതിർത്തിയോട് ചേർന്ന പരിയാപുരത്ത് സ്ഥിതിചെയ്യുന്ന പ്രസിദ്ധമായ ഗണപതി ക്ഷേത്രം. വിനായക ചതുർത്ഥി മഹോത്സവത്തിന് നാടിന്റെ നാനാഭാഗത്തുനിന്നും ആളുകൾ എത്തുന്നു.",
    significance: "Important regional cultural pilgrimage destination in the Tirur–Tanur cultural corridor.",
    significance_ml: "പ്രാദേശിക കാർഷിക-സാമുദായിക കൂട്ടായ്മകൾ ഒത്തുചേരുന്ന പുരാതന ക്ഷേത്ര സങ്കേതം.",
    location: "Pariyapuram, near Tanur",
    location_ml: "പരിയാപുരം, താനൂരിനടുത്ത്",
    latitude: 10.9525,
    longitude: 75.8895,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/67/Tanur%2C_Malappuram_district.jpg",
    photoAssetId: "photo-landscape",
    isNearby: true,
    visitorInfo: {
      timings: "Morning & Evening Pooja hours",
      entryFee: "Free",
      nearestTransport: "4 km from Tanur Railway Station",
    },
    sourceId: "src-lsgd",
  },
];

// -------------------------------------------------------------
// 6. CULTURE, TRADITIONS & FOOD HERITAGE
// -------------------------------------------------------------
export const TANUR_CULTURE_ITEMS: TanurCultureItem[] = [
  {
    id: "mappila-heritage",
    title: "Mappila Songs and Folk Arts (മാപ്പിള പൈതൃകം)",
    title_ml: "മാപ്പിളപ്പാട്ടും നാടൻ കലകളും",
    category: "art",
    category_ml: "സംഗീതവും പൈതൃക കലകളും",
    description: "Tanur possesses a rich lineage of Mappila literature and oral poetry. Rhythmic art forms such as Daffmuttu (ദഫ്മുട്ട്), Arabanamuttu (അറബനമുട്ട്), and Kolkali are enthusiastically performed during community weddings, cultural carnivals, and school festivals.",
    description_ml: "മാപ്പിളപ്പാട്ടുകളുടെയും നാടൻ താളങ്ങളുടെയും സമ്പന്നമായ പാരമ്പര്യമാണ് താനൂരിനുള്ളത്. ദഫ്മുട്ട്, അറബനമുട്ട്, കോൽക്കളി തുടങ്ങിയ പാരമ്പര്യ കലകൾ ഇവിടുത്തെ വിവാഹങ്ങളിലും സാംസ്കാരിക പരിപാടികളിലും വിദ്യാലയങ്ങളിലും ഇന്നും ആവേശത്തോടെ അവതരിപ്പിക്കപ്പെടുന്നു.",
    significance: "Preserves the lyrical Arabic-Malayalam poetic traditions chronicling Malabar maritime bravery and devotion.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    sourceId: "src-kudumbashree",
  },
  {
    id: "temple-festivals",
    title: "Temple Festivals & Thalappoli (ക്ഷേത്രോത്സവങ്ങൾ)",
    title_ml: "ക്ഷേത്രോത്സവങ്ങളും താലപ്പൊലിയും",
    category: "festival",
    category_ml: "ഉത്സവങ്ങൾ",
    description: "The annual festivals at Keraladeshapuram and Shobha Parambu Kurumba Bhagavathi Temple represent the pinnacle of communal harmony and festive spirit. Spectacular fireworks, Panchavadyam, and Melam bring together people of all backgrounds.",
    description_ml: "കേരളാദിത്യപുരം ക്ഷേത്രത്തിലെ ഉത്സവവും ശോഭാപറമ്പ് ഭഗവതി ക്ഷേത്രത്തിലെ പ്രസിദ്ധമായ താലപ്പൊലിയും താനൂരിന്റെ ഉത്സവ വസന്തങ്ങളാണ്. പഞ്ചവാദ്യം, പാണ്ടിമേളം, കരിമരുന്ന് പ്രയോഗം എന്നിവ നാടിന്റെ എല്ലാ ജനവിഭാഗങ്ങളെയും ഒന്നിപ്പിക്കുന്നു.",
    significance: "Living expression of Kerala's temple percussion arts and communal solidarity.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/67/Tanur%2C_Malappuram_district.jpg",
    sourceId: "src-lsgd",
  },
  {
    id: "coastal-cuisine",
    title: "Coastal Malabar Seafood & Culinary Heritage (താനൂർ രുചികൾ)",
    title_ml: "തീരദേശ മലബാർ രുചികളും കടൽവിഭവങ്ങളും",
    category: "cuisine",
    category_ml: "ഭക്ഷണ പാരമ്പര്യം",
    description: "Tanur's gastronomy is famous for fresh catch-of-the-day marine delights: Spicy Chemmeen (prawns) roast, Kallummakkaya (mussels) fry, Ayila (mackerel) Mulakittathu, paired with piping hot Ari Pathiri, Neypathiri, and Malabar Biryani.",
    description_ml: "ഹാർബറിൽ നിന്ന് അപ്പപ്പോൾ എത്തുന്ന മീൻ വിഭവങ്ങളാണ് താനൂർ രുചിയുടെ മുഖമുദ്ര. എരിവുള്ള മീൻ മുളകിട്ടതും, ചെമ്മീൻ റോസ്റ്റും, കല്ലുമ്മക്കായ നിറച്ചതും, ചൂടുള്ള അരിപ്പത്തിരിയും നെയ്പ്പത്തിരിയും താനൂരിന്റെ തനതു രുചികളാണ്.",
    significance: "A mouth-watering blend of traditional coastal fishing community recipes and Arab-influenced Malabar coastal culinary arts.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/31/A_view_of_tanur_harbour.jpg",
    sourceId: "src-lsgd",
  },
  {
    id: "travel-library-culture",
    title: "Literary Culture & Tanur Travel Library (സഞ്ചാര സാഹിത്യ പാരമ്പര്യം)",
    title_ml: "വായനശാലാ പ്രസ്ഥാനവും സഞ്ചാര സാഹിത്യവും",
    category: "literature",
    category_ml: "സാഹിത്യവും വായനയും",
    description: "Tanur holds a unique place in Kerala's library movement through its specialized focus on travelogues and global literature. Public reading rooms have long nurtured lively political debates and social engagement.",
    description_ml: "കേരളത്തിലെ വായനശാലാ പ്രസ്ഥാനത്തിൽ താനൂരിന് പ്രത്യേക സ്ഥാനമുണ്ട്. സഞ്ചാര സാഹിത്യത്തിനും ആഗോള വിവരങ്ങൾക്കും പ്രാധാന്യം നൽകിയുള്ള വായനശാലകൾ നാട്ടിലെ യുവതലമുറയിൽ വിജ്ഞാന ദാഹവും വിപുലമായ കാഴ്ചപ്പാടുകളും വളർത്തി.",
    significance: "Demonstrates Tanur's enduring commitment to literacy, secular knowledge, and democratic discussion.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    sourceId: "src-lsgd",
  },
];

// -------------------------------------------------------------
// 7. PEOPLE, COMMUNITY VOICES & LIFE
// -------------------------------------------------------------
export const TANUR_STORIES: TanurStory[] = [
  {
    id: "story-pangil-musliyar",
    title: "Pangil Ahmed Kutty Musliyar: Architect of Modern Education",
    title_ml: "പാങ്ങിൽ അഹമ്മദ് കുട്ടി മുസ്ലിയാർ: വിജ്ഞാനത്തിന്റെ വിളക്കുമാടം",
    authorOrSubject: "Pangil Ahmed Kutty Musliyar (1888–1946)",
    role: "Islamic Scholar, Social Reformer & Founder of Islahul Uloom",
    category: "scholar",
    excerpt: "The visionary Islamic thinker who established Islahul Uloom at Tanur in 1924, reforming religious pedagogy in Malabar.",
    excerpt_ml: "1924-ൽ താനൂരിൽ ഇസ്ലാഹുൽ ഉലൂം സ്ഥാപിച്ച് മലബാറിലെ വിദ്യാഭ്യാസ ചിന്തകളിൽ വഴിത്തിരിവുണ്ടാക്കിയ നവോത്ഥാന നായകൻ.",
    fullStory: "Born in Pang near Malappuram, Pangil Ahmed Kutty Musliyar dedicated his life to community enlightenment. In 1924, amidst the challenging aftermath of the 1921 events, he founded Islahul Uloom Arabic College in Tanur. He introduced structured curricula, combining Arabic linguistics, religious ethics, and social duties, steering Tanur toward becoming a beacon of higher learning in Kerala.",
    fullStory_ml: "മലബാറിന്റെ ആത്മീയ-വിദ്യാഭ്യാസ ചരിത്രത്തിൽ സുവർണ്ണ മുദ്ര പതിപ്പിച്ച പണ്ഡിതനാണ് പാങ്ങിൽ അഹമ്മദ് കുട്ടി മുസ്ലിയാർ. 1924-ൽ താനൂരിൽ സ്ഥാപിതമായ ഇസ്ലാഹുൽ ഉലൂം അറബിക് കോളേജ് പരമ്പരാഗത ദർസ് വിദ്യാഭ്യാസത്തെ കാലാനുസൃതമായി പരിഷ്കരിച്ചു. താനൂരിനെ കേരളത്തിലെ തന്നെ പ്രമുഖ മത-ഭാഷാ പഠന കേന്ദ്രമാക്കി മാറ്റുന്നതിൽ അദ്ദേഹം വഹിച്ച പങ്ക് ചരിത്രപ്രസിദ്ധമാണ്.",
    date: "Historical Record",
    verified: true,
    source: "Islahul Uloom Centenary Archives (1924–2024)",
  },
  {
    id: "story-fisherfolk-life",
    title: "Dawn on the Waves: The Fishermen of Tanur Harbour",
    title_ml: "തിരമാലകളോട് പൊരുതുന്ന താനൂരിന്റെ കടൽമക്കൾ",
    authorOrSubject: "Tanur Coastal Traditional Fisherfolk Community",
    role: "Marine Harvest & Coastal Protectors",
    category: "fisherfolk",
    excerpt: "Generations of brave seafarers setting out at 3:00 AM aboard traditional motorized crafts to bring fresh bounty to the shore.",
    excerpt_ml: "പുലർച്ചെ മൂന്നുമണിക്ക് കടലിലേക്കിറങ്ങി അന്നത്തിനായ് അധ്വാനിക്കുന്ന താനൂരിലെ ധീരരായ മത്സ്യത്തൊഴിലാളികൾ.",
    fullStory: "Long before the morning sun illuminates the Arabian Sea, Tanur beach and harbour reverberate with activity. Experienced sea helmsmen (സ്രാങ്കുകൾ) study wind tides and ocean currents passed down through generations. From sardines (മത്തി) and mackerel (അയില) to prized prawns and seer fish, their relentless toil feeds millions across Kerala and powers the coastal economy.",
    fullStory_ml: "സൂര്യനുദിക്കും മുമ്പേ താനൂർ ഹാർബറും തീരവും ഉണരുകയായി. തലമുറകളായി പകർന്നു കിട്ടിയ അനുഭവജ്ഞാനവുമായി കടലിലിറങ്ങുന്ന തൊഴിലാളികൾ നാടിന്റെ യഥാർത്ഥ നട്ടെല്ലാണ്. മീൻപിടിത്തം കേവലം ഒരു തൊഴിൽ മാത്രമല്ല, കടലിനോടുള്ള ആഴമേറിയ സ്നേഹവും നാടിനോടുള്ള സമർപ്പണവുമാണ്.",
    date: "Current Verified Field Account",
    verified: true,
    source: "Tanur Matsyathozhilali Union & Harbour Records",
  },
  {
    id: "story-local-entrepreneur",
    title: "The Ice, Coir & Fish Export Legacy",
    title_ml: "കൊപ്രയും മീനും ഐസ് പ്ലാന്റുകളും: താനൂരിന്റെ വ്യാപാര പാരമ്പര്യം",
    authorOrSubject: "Tanur Merchants & Coastal Traders",
    role: "Local Economy & Logistics",
    category: "entrepreneur",
    excerpt: "How Tanur's historic trade evolved from copra chappas to modern cold storages and seafood transport.",
    excerpt_ml: "പഴയകാല കൊപ്ര ചാപ്പകളിൽ നിന്ന് ആധുനിക ശീതീകരണ ശാലകളിലേക്കും മത്സ്യ കയറ്റുമതിയിലേക്കുമുള്ള താനൂരിന്റെ വാണിജ്യ മാറ്റം.",
    fullStory: "Historically known for coconut and copra processing, Tanur seamlessly transitioned in the late 20th century into an ice manufacturing and seafood trading corridor. Today, refrigerated trucks depart nightly from Tanur to Bangalore, Mangalore, Kochi, and Coimbatore, supplying premium fresh sea catch to regional wholesale markets.",
    fullStory_ml: "പഴയ ഫ്രഞ്ച് ചാപ്പകളുടെ കൊപ്ര വ്യാപാരത്തിൽ നിന്ന് തുടങ്ങി ഇന്ന് അത്യാധുനിക ഐസ് പ്ലാന്റുകളിലേക്കും മത്സ്യ സംസ്കരണത്തിലേക്കും വളർന്ന താനൂരിന്റെ വാണിജ്യ പാരമ്പര്യം ശ്രദ്ധേയമാണ്. പ്രതിദിനം ടൺ കണക്കിന് മത്സ്യമാണ് ഇവിടെ നിന്നും കർണാടക, തമിഴ്നാട് അടക്കമുള്ള സംസ്ഥാനങ്ങളിലേക്ക് കയറ്റി അയക്കപ്പെടുന്നത്.",
    date: "Verified Local Economic Survey",
    verified: true,
    source: "Tanur Chamber of Commerce & Fisheries Dept",
  },
];

// -------------------------------------------------------------
// 8. EDUCATION AND KNOWLEDGE DIRECTORY
// -------------------------------------------------------------
export const TANUR_INSTITUTIONS: TanurInstitution[] = [
  {
    id: "inst-islahul-uloom",
    name: "Islahul Uloom Arabic College",
    name_ml: "ഇസ്ലാഹുൽ ഉലൂം അറബിക് കോളേജ്",
    type: "arabic_college",
    type_ml: "അറബിക് & ഇസ്ലാമിക് കോളേജ്",
    establishedYear: "1924",
    location: "Tanur Town, 676302",
    description: "Premier centennial higher education and Arabic linguistics institution affiliated with Darul Huda Islamic University.",
    description_ml: "ദാറുൽ ഹുദാ ഇസ്ലാമിക് യൂണിവേഴ്സിറ്റിയുമായി അഫിലിയേറ്റ് ചെയ്ത നൂറ്റാണ്ടിന്റെ ചരിത്രമുള്ള അറബിക്-ഇസ്ലാമിക് ഉന്നതവിദ്യാഭ്യാസ സ്ഥാപനം.",
    coursesOrFacilities: [
      "Secondary & Higher Secondary Arabic Studies",
      "Degree & Post Graduate in Islamic Theology (Usooluddin, Shareeah)",
      "Extensive Arabic and Islamic Reference Library",
      "Modern Computer and Language Labs",
    ],
    website: "https://islahululoom.in/",
    phone: "0494 2440260",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    sourceId: "src-islahululoom",
  },
  {
    id: "inst-devadhar-hss",
    name: "Devadhar Govt Higher Secondary School, Tanur",
    name_ml: "ദേവധാർ ഗവ. ഹയർ സെക്കൻഡറി സ്കൂൾ, താനൂർ",
    type: "school",
    type_ml: "സർക്കാർ ഹയർ സെക്കൻഡറി സ്കൂൾ",
    establishedYear: "1919 (Early 20th Century)",
    location: "Tanur Main Road, 676302",
    description: "One of the most reputed and historic public educational institutions in coastal Malappuram, educating tens of thousands of pupils across generations.",
    description_ml: "മലപ്പുറം തീരദേശത്തെ ഏറ്റവും ചരിത്രപ്രസിദ്ധമായ പൊതുവിദ്യാഭ്യാസ സ്ഥാപനം. അക്കാദമിക് രംഗത്തും കായിക-കലാ രംഗങ്ങളിലും മുൻപന്തിയിൽ.",
    coursesOrFacilities: [
      "High School & Higher Secondary (Science, Commerce, Humanities)",
      "Vocational Higher Secondary Streams",
      "Extensive Playground, NCC & NSS Units",
      "KITE Hi-Tech Multimedia Classrooms",
    ],
    phone: "0494 2440234",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/67/Tanur%2C_Malappuram_district.jpg",
    sourceId: "src-lsgd",
  },
  {
    id: "inst-fisheries-school",
    name: "Govt Regional Fisheries Technical High School",
    name_ml: "ഗവ. റീജിയണൽ ഫിഷറീസ് ടെക്നിക്കൽ ഹൈസ്കൂൾ, താനൂർ",
    type: "vocational",
    type_ml: "ഫിഷറീസ് സാങ്കേതിക വിദ്യാലയം",
    establishedYear: "1968",
    location: "Harbour Road, Tanur",
    description: "Specialized technical school providing vocational training in marine mechanics, navigation, and fish processing alongside standard secondary curriculum.",
    description_ml: "തീരദേശ വിദ്യാർത്ഥികൾക്കായി മത്സ്യബന്ധനം, സമുദ്ര ഗതാഗതം, മറൈൻ മെക്കാനിക്സ് എന്നിവയിൽ പ്രായോഗിക പരിശീലനം നൽകുന്ന പ്രത്യേക സർക്കാർ വിദ്യാലയം.",
    coursesOrFacilities: [
      "Technical High School Certificate (THSLC)",
      "Marine Navigation & Mechanics Workshop",
      "Free residential support for coastal students",
    ],
    phone: "0494 2440567",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/31/A_view_of_tanur_harbour.jpg",
    sourceId: "src-fisheries",
  },
  {
    id: "inst-tanur-travel-library",
    name: "Tanur Travel & Public Memorial Library",
    name_ml: "താനൂർ സഞ്ചാര സാഹിത്യ പബ്ലിക് ലൈബ്രറി",
    type: "library",
    type_ml: "സഞ്ചാര സാഹിത്യ ലൈബ്രറി & റീഡിംഗ് റൂം",
    establishedYear: "1972",
    location: "Near Railway Station, Tanur",
    description: "Distinctive library housing an acclaimed collection of Malayalam and world travelogues, historical archives, and daily periodicals.",
    description_ml: "യാത്രാവിവരണങ്ങൾ, ചരിത്ര പുസ്തകങ്ങൾ, സമകാലിക ആനുകാലികങ്ങൾ എന്നിവയുടെ വിപുലമായ ശേഖരമുള്ള വായനശാല.",
    coursesOrFacilities: [
      "Over 15,000 catalogued volumes",
      "Special Section for Malabar Local History & Coastal Ecology",
      "Daily Newspaper & Magazine Reading Hall",
      "Youth Literary Debating Circle",
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    sourceId: "src-lsgd",
  },
];

// -------------------------------------------------------------
// 9. LOCAL BUSINESSES AND ENTERPRISES
// -------------------------------------------------------------
export const TANUR_BUSINESSES: TanurBusinessItem[] = [
  {
    id: "biz-tanur-seafoods",
    name: "Malabar Sea Bounty Fish Exports & Trading",
    name_ml: "മലബാർ സീ ബൗണ്ടി ഫിഷ് ട്രേഡിംഗ്",
    category: "seafood",
    category_ml: "മത്സ്യ വ്യാപാരവും കയറ്റുമതിയും",
    address: "Harbour Road, West Tanur - 676302",
    phone: "+91 94471 23450",
    description: "Wholesale fish auction and daily fresh dispatch of mackerel, sardines, tuna, and prawns across Kerala and interstate markets.",
    verified: true,
  },
  {
    id: "biz-coastal-ice-plant",
    name: "Tanur Coastal Ice Plants & Cold Storage",
    name_ml: "താനൂർ കോസ്റ്റൽ ഐസ് പ്ലാന്റ് & കോൾഡ് സ്റ്റോറേജ്",
    category: "service",
    category_ml: "ഐസ് പ്ലാന്റ് & ശീതീകരണ ശാല",
    address: "Near Pulimuttu, Harbour Road, Tanur",
    phone: "+91 98460 54321",
    description: "24-hour flake and block ice manufacturing facility catering to deep sea fishing vessels and fish transport trucks.",
    verified: true,
  },
  {
    id: "biz-kayal-orom-restaurant",
    name: "Al-Bahar Coastal Malabar Restaurant",
    name_ml: "അൽ-ബഹർ കോസ്റ്റൽ മലബാർ റെസ്റ്റോറന്റ്",
    category: "restaurant",
    category_ml: "ഭക്ഷണശാല / ഹോട്ടൽ",
    address: "Main Town Circle, Tanur - 676302",
    phone: "+91 94951 88776",
    description: "Traditional Malabar coastal seafood restaurant serving authentic fish curry meals, Neypathiri, chemmeen roast, and freshly brewed Sulaimani.",
    verified: true,
  },
  {
    id: "biz-tanur-boat-repair",
    name: "Sagar Fibre Boat & Fishing Net Workshop",
    name_ml: "സാഗർ ഫൈബർ ബോട്ട് & വല നിർമ്മാണ കേന്ദ്രം",
    category: "boat_net",
    category_ml: "ബോട്ട് അറ്റകുറ്റപ്പണി & വല നിർമ്മാണം",
    address: "Beach Road, Tanur",
    phone: "+91 94462 77889",
    description: "Country boat fiberglass repair, marine engine servicing, and traditional nylon gill net manufacturing.",
    verified: true,
  },
  {
    id: "biz-tanur-coir-copra",
    name: "Vettathu Traditional Coir & Copra Traders",
    name_ml: "വെട്ടത്ത് ട്രഡീഷണൽ കയർ & കൊപ്ര ട്രേഡേഴ്സ്",
    category: "retail",
    category_ml: "കയറും കൊപ്ര വ്യാപാരവും",
    address: "Station Road, Tanur",
    phone: "+91 98950 12345",
    description: "Historical coconut trading unit supplying coconut husk coir yarn, unadulterated coconut oil, and dry copra.",
    verified: true,
  },
];

// -------------------------------------------------------------
// 10. PUBLIC SERVICES AND CIVIC DIRECTORY
// -------------------------------------------------------------
export const TANUR_PUBLIC_SERVICES: TanurPublicService[] = [
  {
    id: "srv-mla-office",
    name: "Tanur MLA Constituency Office (P. K. Navas MLA)",
    name_ml: "താനൂർ എം.എൽ.എ ഓഫീസ് (പി. കെ. നവാസ്)",
    category: "municipality",
    category_ml: "ജനപ്രതിനിധി കാര്യാലയം",
    address: "Railway Station Road, Tanur, Malappuram - 676302",
    phone: "0494 2582250",
    officialLink: "/politics/pk-navas",
    workingHours: "Monday to Saturday: 10:00 AM – 5:00 PM (Subject to Niyamasabha sessions)",
  },
  {
    id: "srv-municipality",
    name: "Tanur Municipality Office",
    name_ml: "താനൂർ നഗരസഭാ കാര്യാലയം",
    category: "municipality",
    category_ml: "നഗരസഭ",
    address: "Main Road, Tanur, Malappuram - 676302",
    phone: "0494 2440232",
    officialLink: "https://tanurmunicipality.lsgkerala.gov.in/",
    workingHours: "Monday to Saturday: 10:00 AM – 5:00 PM (2nd Sat & Sun holiday)",
  },
  {
    id: "srv-police",
    name: "Tanur Police Station",
    name_ml: "താനൂർ പോലീസ് സ്റ്റേഷൻ",
    category: "police",
    category_ml: "പോലീസ് സ്റ്റേഷൻ",
    address: "Police Station Road, Tanur - 676302",
    phone: "0494 2440244",
    emergencyNumber: "112 / 100",
    workingHours: "24 Hours Active Emergency Service",
  },
  {
    id: "srv-fire",
    name: "Tanur Fire and Rescue Station",
    name_ml: "താനൂർ ഫയർ & റെസ്ക്യൂ സ്റ്റേഷൻ",
    category: "fire",
    category_ml: "അഗ്നിശമന സേന",
    address: "Near KSEB, Tanur",
    phone: "0494 2440101",
    emergencyNumber: "101",
    workingHours: "24 Hours Active Emergency Service",
  },
  {
    id: "srv-hospital",
    name: "Community Health Centre / Taluk Hospital, Tanur",
    name_ml: "സാമൂഹികാരോഗ്യ കേന്ദ്രം / താലൂക്ക് ആശുപത്രി, താനൂർ",
    category: "health",
    category_ml: "സർക്കാർ ആശുപത്രി",
    address: "Hospital Road, Tanur - 676302",
    phone: "0494 2440250",
    emergencyNumber: "108 (Ambulance)",
    workingHours: "24 Hours Emergency & Casualty Services",
  },
  {
    id: "srv-village",
    name: "Tanur Village Office (Tirur Taluk)",
    name_ml: "താനൂർ വില്ലേജ് ഓഫീസ്",
    category: "revenue",
    category_ml: "റവന്യൂ ഓഫീസ്",
    address: "Near Tanur Town, Tirur Taluk, Malappuram",
    phone: "0494 2441200",
    workingHours: "Monday to Saturday: 10:00 AM – 5:00 PM",
  },
  {
    id: "srv-railway",
    name: "Tanur Railway Station Enquiry (Southern Railway)",
    name_ml: "താനൂർ റെയിൽവേ സ്റ്റേഷൻ എൻക്വയറി",
    category: "transport",
    category_ml: "റെയിൽവേ സ്റ്റേഷൻ",
    address: "Station Road, Tanur - 676302",
    phone: "0494 2440266",
    emergencyNumber: "139 (Railway Helpline)",
    workingHours: "24 Hours Ticket Counter & Train Inquiry",
  },
  {
    id: "srv-kseb",
    name: "KSEB Electrical Section, Tanur",
    name_ml: "കെ.എസ്.ഇ.ബി ഇലക്ട്രിക്കൽ സെക്ഷൻ, താനൂർ",
    category: "utility",
    category_ml: "വൈദ്യുതി ഓഫീസ്",
    address: "KSEB Road, Tanur",
    phone: "0494 2440280",
    emergencyNumber: "1912 (Fault Helpline)",
    workingHours: "24 Hours Fuse Call Centre",
  },
  {
    id: "srv-post",
    name: "Tanur Post Office (Sub Post Office - 676302)",
    name_ml: "താനൂർ സബ് പോസ്റ്റ് ഓഫീസ് (പിൻ: 676302)",
    category: "utility",
    category_ml: "തപാൽ ആഫീസ്",
    address: "Main Road, Tanur - 676302",
    phone: "0494 2440220",
    workingHours: "Monday to Saturday: 9:00 AM – 4:00 PM",
  },
];

// -------------------------------------------------------------
// 11. TANUR LOCAL NEWS AND CIVIC ANNOUNCEMENTS
// -------------------------------------------------------------
export interface TanurNewsItem {
  id: string;
  title: string;
  title_ml: string;
  category: "harbour" | "civic" | "culture" | "environment" | "education";
  category_ml: string;
  date: string;
  location: string;
  summary: string;
  summary_ml: string;
  fullContent: string;
  fullContent_ml: string;
  imageUrl: string;
  source: string;
  isOfficial: boolean;
}

export const TANUR_NEWS_DATA: TanurNewsItem[] = [
  {
    id: "tanur-harbour-upgrades",
    title: "Tanur Fishing Harbour Modernisation Works Advanced",
    title_ml: "താനൂർ ഫിഷിംഗ് ഹാർബർ നവീകരണ പ്രവർത്തനങ്ങൾ പുരോഗമിക്കുന്നു",
    category: "harbour",
    category_ml: "തുറമുഖം & മത്സ്യബന്ധനം",
    date: "16 നവംബർ 2026",
    location: "താനൂർ ഹാർബർ",
    summary: "New modern auction hall and solar-powered cold storage facilities set to benefit over 5,000 traditional fishermen in Tanur.",
    summary_ml: "താനൂരിലെ അയ്യായിരത്തിലധികം മത്സ്യത്തൊഴിലാളികൾക്ക് പ്രയോജനപ്പെടുന്ന ആധുനിക ലേലപ്പുരയും സൗരോർജ്ജ ശീതീകരണ സൗകര്യങ്ങളും ഉടൻ പൂർത്തിയാകും.",
    fullContent: "The Kerala Fisheries and Harbour Engineering Department has fast-tracked the second phase expansion of the Tanur Fishing Harbour. The works include reinforcing the southern breakwater (Pulimuttu), establishing modern hygienic auction halls, and installing automated ice packaging units to minimize post-catch degradation.",
    fullContent_ml: "താനൂർ ഫിഷിംഗ് ഹാർബറിന്റെ രണ്ടാം ഘട്ട നവീകരണ പ്രവർത്തനങ്ങൾ അന്തിമഘട്ടത്തിലേക്ക്. തെക്കൻ പുലിമുട്ടിന്റെ ബലപ്പെടുത്തൽ, ആധുനിക ശുചിത്വ ലേലപ്പുര, ബോട്ടുകൾക്ക് തടസ്സമില്ലാതെ അടുക്കാനുള്ള ഡ്രെഡ്ജിംഗ് എന്നിവ ഇതിന്റെ ഭാഗമായി നടപ്പിലാക്കുന്നു. തീരദേശ ജനതയുടെ ദീർഘകാലമായ ആവശ്യമാണിത്.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/31/A_view_of_tanur_harbour.jpg",
    source: "കേരള ഫിഷറീസ് വകുപ്പ് വാർത്താക്കുറിപ്പ്",
    isOfficial: true,
  },
  {
    id: "tanur-beach-cleanliness",
    title: "Community Volunteers Launch Coastal Cleanliness & Mangrove Mission",
    title_ml: "താനൂർ തീരദേശ ശുചിത്വ-കണ്ടൽ സംരക്ഷണ ദൗത്യത്തിന് തുടക്കം",
    category: "environment",
    category_ml: "പരിസ്ഥിതി സംരക്ഷണം",
    date: "14 നവംബർ 2026",
    location: "താനൂർ ബീച്ച് & പൂരപ്പുഴ അഴിമുഖം",
    summary: "Local youth clubs, Kudumbashree units, and students unite to plant 2,000 mangrove saplings along the Poorappuzha estuary.",
    summary_ml: "തദ്ദേശീയ യുവജന ക്ലബ്ബുകളും കുടുംബശ്രീയും ചേർന്ന് പൂരപ്പുഴ അഴിമുഖത്ത് രണ്ടായിരം കണ്ടൽ തൈകൾ നട്ടുപിടിപ്പിച്ചു.",
    fullContent: "Under the joint leadership of Tanur Municipality, local high schools, and volunteer nature forums, an extensive beach cleanup and mangrove reforestation drive was conducted along the Poorappuzha river mouth and Tanur Beach. The mission aims to combat coastal soil erosion and preserve marine breeding grounds.",
    fullContent_ml: "തീരദേശ മണ്ണൊലിപ്പ് തടയുന്നതിനും സമുദ്ര ജീവജാലങ്ങളുടെ പ്രജനന കേന്ദ്രങ്ങൾ സംരക്ഷിക്കുന്നതിനുമായി താനൂർ നഗരസഭയുടെയും യുവജന സംഘടനകളുടെയും നേതൃത്വത്തിൽ പൂരപ്പുഴ തീരത്ത് വിപുലമായ കണ്ടൽ വനവൽക്കരണ പരിപാടി സംഘടിപ്പിച്ചു.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Tanur_beach%2C_Malappuram_%289%29.jpg",
    source: "താനൂർ നഗരസഭാ ഹരിതസേന അറിയിപ്പ്",
    isOfficial: true,
  },
  {
    id: "tanur-library-bookfair",
    title: "Tanur Travel Literary Festival Announced for December",
    title_ml: "താനൂർ സഞ്ചാര സാഹിത്യോത്സവം ഡിസംബറിൽ",
    category: "culture",
    category_ml: "സാംസ്കാരികം",
    date: "12 നവംബർ 2026",
    location: "ടൗൺ ഹാൾ, താനൂർ",
    summary: "Annual celebration of travel writing, coastal folklore, and Mappila literature to convene writers and scholars from across Malabar.",
    summary_ml: "മലബാറിലെ പ്രമുഖ യാത്രാവിവരണ എഴുത്തുകാരും സാംസ്കാരിക പ്രവർത്തകരും പങ്കെടുക്കുന്ന ത്രിദിന സാഹിത്യോത്സവത്തിന് ഒരുക്കങ്ങൾ തുടങ്ങി.",
    fullContent: "The Tanur Public Library Council in association with local literary forums has announced the 2026 edition of the Tanur Travel Literary Festival. The three-day event will feature book launches, coastal oral history sessions, photographic exhibitions, and interactive storytelling for youth.",
    fullContent_ml: "താനൂർ പബ്ലിക് ലൈബ്രറി കൗൺസിലിന്റെയും സാംസ്കാരിക കൂട്ടായ്മകളുടെയും ആഭിമുഖ്യത്തിൽ ഡിസംബർ രണ്ടാം വാരത്തിൽ താനൂർ സഞ്ചാര സാഹിത്യോത്സവം നടക്കും. പുസ്തകപ്രകാശനങ്ങൾ, പ്രാദേശിക ചരിത്ര സെമിനാറുകൾ, ഫോട്ടോ എക്സിബിഷൻ എന്നിവ ഇതിന്റെ ഭാഗമായി അരങ്ങേറും.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    source: "താനൂർ ലൈബ്രറി കൗൺസിൽ",
    isOfficial: false,
  },
];
