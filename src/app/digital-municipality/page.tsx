"use client";

import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { useLanguage } from "@/lib/i18n/context";
import { 
  digitalMunicipalityStore, 
  TANUR_MUNICIPAL_WARDS 
} from "@/lib/data/digitalMunicipalityData";
import { civicStore } from "@/lib/data/civicConnectData";
import { VerificationBadge, DataSourcesNotice } from "@/components/common/VerificationBadge";
import { 
  DigitalTanurLocation, 
  FacilityCategoryKey 
} from "@/types/digitalMunicipality";
import { 
  Building2, 
  MapPin, 
  Users, 
  ShieldCheck, 
  Compass, 
  Phone, 
  Search, 
  ChevronRight, 
  Layers, 
  HardHat, 
  FileText, 
  Calendar, 
  Globe2, 
  Briefcase, 
  Activity, 
  BookOpen, 
  Anchor, 
  Trash2, 
  Clock, 
  AlertTriangle 
} from "lucide-react";

// Dynamically import the upgraded Google Maps component
const DigitalTanurMap = dynamic(
  () => import("@/components/tanur/DigitalTanurMap").then((mod) => mod.DigitalTanurMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-[520px] w-full rounded-3xl bg-[#EDE6D8] animate-pulse flex flex-col items-center justify-center text-[#5C6A64]">
        <Compass className="w-10 h-10 text-[#194B35] animate-spin mb-3" />
        <span className="text-sm font-bold text-[#194B35]">Google Maps Platform GIS ലോഡ് ചെയ്യുന്നു...</span>
        <span className="text-xs text-[#5C6A64] mt-1">Loading Tanur Municipality GIS Map...</span>
      </div>
    ),
  }
);

// Municipal Departments
const MUNICIPAL_DEPARTMENTS = [
  {
    id: "dept-admin",
    name: "General Administration & Council Secretariat",
    name_ml: "പൊതു ഭരണവും കൗൺസിൽ സെക്രട്ടേറിയറ്റും",
    lead: "Municipal Secretary",
    lead_ml: "നഗരസഭാ സെക്രട്ടറി",
    responsibilities: [
      "Council meetings, agendas, resolutions and minutes documentation",
      "Human resources, establishment, RTI matters, and public relations",
      "Coordination across all subordinate municipal wings and district administration"
    ],
    responsibilities_ml: [
      "കൗൺസിൽ യോഗങ്ങൾ, പ്രമേയങ്ങൾ, മിനിറ്റ്സ് സൂക്ഷിപ്പ്",
      "ജീവനക്കാരുടെ കാര്യങ്ങൾ, വിവരാവകാശം, പൗരസമ്പർക്കം",
      "വിവിധ വകുപ്പുകളുടെയും ജില്ലാ ഭരണകൂടത്തിന്റെയും ഏകോപനം"
    ],
    icon: Building2,
    color: "#194B35"
  },
  {
    id: "dept-engineering",
    name: "Engineering & Local Infrastructure (LID & EW)",
    name_ml: "എഞ്ചിനീയറിംഗ് & തദ്ദേശ പശ്ചാത്തല വികസനം",
    lead: "Assistant Executive Engineer",
    lead_ml: "അസിസ്റ്റന്റ് എക്സിക്യൂട്ടീവ് എഞ്ചിനീയർ",
    responsibilities: [
      "Road construction, maintenance, tarring, and concrete paving",
      "Storm water drainage, culverts, coastal seawall, and bridge maintenance",
      "Preparation of estimates, technical sanctions, and e-tender management"
    ],
    responsibilities_ml: [
      "നഗരസഭാ റോഡുകളുടെ നിർമ്മാണം, അറ്റകുറ്റപ്പണികൾ, ടാറിംഗ്",
      "മഴവെള്ള ഡ്രെയിനേജ്, കലുങ്കുകൾ, തീരദേശ സംരക്ഷണം",
      "എസ്റ്റിമേറ്റുകൾ തയ്യാറാക്കൽ, സാങ്കേതിക അനുമതി, ഇ-ടെണ്ടർ"
    ],
    icon: HardHat,
    color: "#C39A5B"
  },
  {
    id: "dept-health",
    name: "Health, Sanitation & Environment Wing",
    name_ml: "ആരോഗ്യം, ശുചിത്വം & പരിസ്ഥിതി വിഭാഗം",
    lead: "Health Supervisor / Health Inspector",
    lead_ml: "ഹെൽത്ത് സൂപ്പർവൈസർ / ഹെൽത്ത് ഇൻസ്പെക്ടർ",
    responsibilities: [
      "Civil registrations (birth, death, marriage certificates via K-Smart)",
      "Solid waste management, Haritha Karma Sena coordination, and MCF operations",
      "Food safety inspection, slaughterhouse oversight, and trade premises licensing"
    ],
    responsibilities_ml: [
      "സിവിൽ രജിസ്ട്രേഷൻ (ജനനം, മരണം, വിവാഹം)",
      "ഹരിത കർമ്മസേന മാലിന്യ ശേഖരണം, എം.സി.എഫ് പ്രവർത്തനം",
      "ഭക്ഷ്യ സുരക്ഷാ പരിശോധന, ഡി&ഒ ലൈസൻസുകൾ"
    ],
    icon: Activity,
    color: "#059669"
  },
  {
    id: "dept-revenue",
    name: "Revenue, Tax Assessment & Finance",
    name_ml: "റവന്യൂ, നികുതി നിർണ്ണയം & ധനകാര്യം",
    lead: "Revenue Officer",
    lead_ml: "റവന്യൂ ഓഫീസർ",
    responsibilities: [
      "Building property tax assessment, collection, and Sanchitha ledger maintenance",
      "Professional tax, advertisement tax, and rent collection from municipal markets",
      "Annual budget preparation and statutory audit compliance"
    ],
    responsibilities_ml: [
      "കെട്ടിട വസ്തുനികുതി നിർണ്ണയവും ശേഖരണവും (സഞ്ചിത പോർട്ടൽ)",
      "തൊഴിൽ നികുതി, പരസ്യ നികുതി, മുനിസിപ്പൽ മാർക്കറ്റ് വാടക",
      "വാർഷിക ബജറ്റ് തയ്യാറാക്കലും ഓഡിറ്റ് പരിശോധനയും"
    ],
    icon: FileText,
    color: "#1E3A8A"
  },
  {
    id: "dept-welfare",
    name: "Social Justice, Welfare & Kudumbashree Urban CDS",
    name_ml: "സാമൂഹിക നീതി, ക്ഷേമം & കുടുംബശ്രീ അർബൻ സി.ഡി.എസ്",
    lead: "Community Development Society (CDS) Chairperson",
    lead_ml: "കുടുംബശ്രീ സി.ഡി.എസ് ചെയർപേഴ്സൺ",
    responsibilities: [
      "Social security welfare pensions (Old Age, Widow, Disability, Agricultural)",
      "Poverty alleviation, women entrepreneurship, and micro-enterprises",
      "Coastal fisheries family welfare schemes and housing grants"
    ],
    responsibilities_ml: [
      "സാമൂഹിക സുരക്ഷാ പെൻഷനുകൾ (വാർദ്ധക്യം, വിധവ, ഭിന്നശേഷി)",
      "ദാരിദ്ര്യ നിർമ്മാർജ്ജനം, വനിതാ സ്വയംതൊഴിൽ ഗ്രൂപ്പുകൾ",
      "തീരദേശ മത്സ്യത്തൊഴിലാളി ക്ഷേമ പദ്ധതികൾ"
    ],
    icon: Users,
    color: "#7C3AED"
  },
  {
    id: "dept-townplanning",
    name: "Town Planning & Building Permissions",
    name_ml: "ടൗൺ പ്ലാനിംഗ് & കെട്ടിട നിർമ്മാണ അനുമതി",
    lead: "Town Planning Officer",
    lead_ml: "ടൗൺ പ്ലാനിംഗ് ഓഫീസർ",
    responsibilities: [
      "Building permit scrutiny under Kerala Municipality Building Rules (KMBR) 2019",
      "Perspective master plan, land use zoning, and road widening schemes",
      "Coastal Regulation Zone (CRZ) clearances coordination with KCZMA"
    ],
    responsibilities_ml: [
      "കെട്ടിട നിർമ്മാണ പെർമിറ്റുകൾ (KMBR 2019 അനുസരിച്ച്)",
      "നഗര വികസന മാസ്റ്റർ പ്ലാനും ഭൂവിനിയോഗ മേഖലകളും",
      "തീരദേശ പരിപാലന അനുമതി (CRZ Clearance) പരിശോധന"
    ],
    icon: Compass,
    color: "#EA580C"
  }
];

// Navigation tab type definition
type TabKey = "overview" | "wards" | "facilities" | "departments" | "gis" | "announcements";

// Facility Category metadata for Directory Tab
const FACILITY_CATEGORIES = [
  { key: "all", label: "All Facilities", label_ml: "എല്ലാ സൗകര്യങ്ങളും", icon: Layers },
  { key: "health", label: "Health & Hospitals", label_ml: "ആരോഗ്യം & ആശുപത്രികൾ", icon: Activity },
  { key: "education", label: "Educational Institutions", label_ml: "വിദ്യാഭ്യാസ സ്ഥാപനങ്ങൾ", icon: BookOpen },
  { key: "harbour", label: "Harbour & Coastal", label_ml: "ഫിഷിംഗ് ഹാർബർ", icon: Anchor },
  { key: "akshaya", label: "Akshaya & Citizen Services", label_ml: "അക്ഷയ & സേവന കേന്ദ്രങ്ങൾ", icon: Compass },
  { key: "mcf", label: "Waste & MCF Depots", label_ml: "മാലിന്യ ശേഖരണ കേന്ദ്രങ്ങൾ", icon: Trash2 },
  { key: "emergency", label: "Emergency & Safety", label_ml: "അടിയന്തര സേവനങ്ങൾ", icon: AlertTriangle },
  { key: "civic", label: "Civic & Community Halls", label_ml: "കമ്മ്യൂണിറ്റി & മാർക്കറ്റുകൾ", icon: Building2 },
] as const;

export default function DigitalMunicipalityPage() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [wardSearch, setWardSearch] = useState("");
  const [selectedWardNumber, setSelectedWardNumber] = useState<number | null>(null);

  // Facilities Tab states
  const [facilityCategory, setFacilityCategory] = useState<FacilityCategoryKey | "all">("all");
  const [facilitySearch, setFacilitySearch] = useState("");

  // GIS Map focus states (when switching from facility/ward to GIS map)
  const [mapFocusCoords, setMapFocusCoords] = useState<[number, number] | null>(null);
  const [mapSelectedLocationId, setMapSelectedLocationId] = useState<string | null>(null);

  // Real database records from digitalMunicipalityStore
  const locations = useMemo(() => digitalMunicipalityStore.getLocations(), []);
  const localities = useMemo(() => digitalMunicipalityStore.getLocalities(), []);
  const projects = useMemo(() => digitalMunicipalityStore.getProjects(), []);
  const civicIssues = useMemo(() => civicStore.getIssues(), []);

  // Filtered Wards
  const filteredWards = useMemo(() => {
    if (!wardSearch.trim()) return TANUR_MUNICIPAL_WARDS;
    const q = wardSearch.toLowerCase();
    return TANUR_MUNICIPAL_WARDS.filter(w => 
      w.name.toLowerCase().includes(q) || 
      w.name_ml.toLowerCase().includes(q) ||
      w.ward_number.toString() === q ||
      w.key_localities.some(l => l.toLowerCase().includes(q)) ||
      w.key_localities_ml.some(l => l.toLowerCase().includes(q))
    );
  }, [wardSearch]);

  // Real-time facility counts by category
  const facilityCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: locations.length,
      health: 0,
      education: 0,
      harbour: 0,
      akshaya: 0,
      mcf: 0,
      emergency: 0,
      civic: 0,
    };
    locations.forEach((loc) => {
      const cat = loc.facility_category || "civic";
      if (counts[cat] !== undefined) {
        counts[cat]++;
      }
    });
    return counts;
  }, [locations]);

  // Filtered Facilities list
  const filteredFacilities = useMemo(() => {
    let res = locations;
    if (facilityCategory !== "all") {
      res = res.filter((l) => (l.facility_category || "civic") === facilityCategory);
    }
    if (facilitySearch.trim()) {
      const q = facilitySearch.toLowerCase();
      res = res.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.name_ml.toLowerCase().includes(q) ||
          l.locality.toLowerCase().includes(q) ||
          l.locality_ml.toLowerCase().includes(q) ||
          (l.ward_name && l.ward_name.toLowerCase().includes(q)) ||
          (l.ward_name_ml && l.ward_name_ml.toLowerCase().includes(q)) ||
          (l.ward_number && l.ward_number.toString() === q) ||
          l.category_name.toLowerCase().includes(q) ||
          l.category_name_ml.toLowerCase().includes(q) ||
          l.address.toLowerCase().includes(q)
      );
    }
    return res;
  }, [locations, facilityCategory, facilitySearch]);

  // Action button to switch to GIS Map focused on a facility
  const handleFacilityFocusOnMap = (loc: DigitalTanurLocation) => {
    setMapFocusCoords([loc.latitude, loc.longitude]);
    setMapSelectedLocationId(loc.id);
    setActiveTab("gis");
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  // Action button to switch to GIS Map focused on a ward
  const handleWardFocusOnMap = (w: (typeof TANUR_MUNICIPAL_WARDS)[0]) => {
    setMapFocusCoords([w.latitude, w.longitude]);
    setMapSelectedLocationId(null);
    setActiveTab("gis");
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#252A25] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-8 w-full">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: language === "ml" ? "ഹോം" : "Home", href: "/" },
            { label: language === "ml" ? "ഡിജിറ്റൽ നഗരസഭ" : "Digital Municipality" },
          ]}
        />

        {/* ========================================================================= */}
        {/* 1. HERO HEADER: KERALA COASTAL WATERFRONT & FLOATING SEAL CARD            */}
        {/* ========================================================================= */}
        <section className="relative rounded-3xl overflow-hidden border border-[#EDE6D8] bg-[#F5F1E7] shadow-sm">
          {/* Coastal Horizon & Water Silhouette Ambient Overlay */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-25 bg-cover bg-center"
            style={{
              backgroundImage: `radial-gradient(ellipse at top left, rgba(25, 75, 53, 0.14), transparent 70%), 
                                linear-gradient(to bottom, transparent, rgba(237, 230, 216, 0.85))`
            }}
          />

          <div className="relative z-10 p-5 sm:p-8 lg:p-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Left Column: Feature Badge, Bilingual Title, Description & CTAs */}
              <div className="md:col-span-7 space-y-5 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/85 backdrop-blur-xs border border-[#EDE6D8] text-[#194B35] text-xs font-bold shadow-2xs">
                  <Building2 className="w-3.5 h-3.5 text-[#C39A5B]" />
                  <span>{language === "ml" ? "ഫീച്ചർ 01: ഔദ്യോഗിക വിവര കേന്ദ്രം" : "Feature 01: Municipal Information Hub"}</span>
                </div>

                <div className="space-y-1">
                  <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#C39A5B] block font-sans">
                    {language === "ml" ? "കേരള സർക്കാർ • തദ്ദേശ സ്വയംഭരണ വകുപ്പ്" : "Government of Kerala • Local Self Government"}
                  </span>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#194B35] tracking-tight font-malayalam-heading leading-tight">
                    {language === "ml" ? "താനൂർ നഗരസഭ" : "Welcome to Tanur Municipality"}
                  </h1>
                </div>

                <p className="text-[#5C6A64] text-xs sm:text-sm lg:text-base leading-relaxed max-w-2xl">
                  {language === "ml"
                    ? "മലപ്പുറം ജില്ലയിലെ ചരിത്രപ്രസിദ്ധമായ തീരദേശ നഗരസഭ. 45 വാർഡുകളിലായി വ്യാപിച്ചുകിടക്കുന്ന ഭരണസംവിധാനം, പൊതുസേവനങ്ങൾ, വികസന പദ്ധതികൾ, പൗരസമ്പർക്ക വിവരങ്ങൾ എന്നിവ ഇവിടെ സമഗ്രമായി ലഭ്യമാക്കിയിരിക്കുന്നു."
                    : "A transparent, connected, and progressive coastal local body. Explore official ward governance across 45 divisions, municipal departments, statutory leadership, public facilities, and interactive GIS mapping."}
                </p>

                {/* Hero Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setActiveTab("wards")}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#C39A5B] hover:bg-[#b0874a] text-white font-bold text-xs sm:text-sm shadow-sm transition-all min-h-[44px]"
                  >
                    <span>{language === "ml" ? "45 വാർഡുകൾ കാണുക" : "Explore Our Wards"}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveTab("facilities")}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white hover:bg-[#FAF7F0] text-[#194B35] border border-[#EDE6D8] font-bold text-xs sm:text-sm shadow-2xs transition-all min-h-[44px]"
                  >
                    <Layers className="w-4 h-4 text-[#C39A5B]" />
                    <span>{language === "ml" ? "പൊതു സൗകര്യങ്ങൾ" : "Public Facilities"}</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Floating Municipal Seal Card */}
              <div className="md:col-span-5 flex justify-center md:justify-end">
                <div className="w-full max-w-sm bg-white/95 backdrop-blur-md rounded-3xl border border-[#EDE6D8] p-6 sm:p-7 shadow-card text-center space-y-4 relative overflow-hidden transition hover:shadow-elevated">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#194B35] via-[#C39A5B] to-[#194B35]" />
                  
                  {/* Kerala Government & Municipal Emblem SVG */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] flex items-center justify-center p-3 text-[#194B35] shadow-xs">
                    <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M32 6C34 14 40 18 50 18M32 6C30 14 24 18 14 18M32 6C36 12 44 14 48 24M32 6C28 12 20 14 16 24" stroke="#194B35" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M32 6C31 22 28 38 24 50" stroke="#194B35" strokeWidth="3" strokeLinecap="round" />
                      <path d="M12 50C20 47 30 47 40 50M8 55C18 53 30 52 44 55M14 60C24 58 36 58 52 60" stroke="#C39A5B" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  </div>

                  <div className="space-y-1">
                    <h2 className="text-xl font-black text-[#194B35] font-malayalam-heading">
                      {language === "ml" ? "താനൂർ നഗരസഭ" : "Tanur Municipality"}
                    </h2>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#C39A5B] block">
                      {language === "ml" ? "മലപ്പുറം ജില്ല, കേരളം" : "Malappuram, Kerala"}
                    </span>
                  </div>

                  <div className="py-2 border-y border-[#EDE6D8]/60 text-xs text-[#5C6A64]">
                    <span className="italic block font-medium">
                      {language === "ml" ? "നവ താനൂരിനായി ഒരുമിച്ച് • Together for a Developed Tanur" : "Together for a Developed Tanur • നവ താനൂരിനായി ഒരുമിച്ച്"}
                    </span>
                  </div>

                  {/* Direct Switchboard Telephone Link */}
                  <div className="pt-1 flex flex-col items-center gap-1.5 text-xs">
                    <span className="text-[10px] text-[#7A8880] uppercase tracking-wider font-bold">
                      {language === "ml" ? "കേന്ദ്ര സ്വിച്ച്ബോർഡ്" : "Central Municipal Switchboard"}
                    </span>
                    <a
                      href="tel:04942440228"
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF7F0] hover:bg-[#194B35] text-[#194B35] hover:text-white border border-[#EDE6D8] font-bold text-xs transition-colors shadow-2xs"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#C39A5B]" />
                      <span>0494 2440228</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 6-metric Key Facts Bar */}
            <div className="mt-8 pt-6 border-t border-[#EDE6D8] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {[
                { labelEn: "Municipal Wards", labelMl: "വാർഡുകൾ", val: "44", subEn: "Divisions", subMl: "ഡിവിഷനുകൾ" },
                { labelEn: "Total Area", labelMl: "വിസ്തൃതി", val: "19.59", subEn: "Sq. Km", subMl: "ച.കി.മീറ്റർ" },
                { labelEn: "Population", labelMl: "ജനസംഖ്യ", val: "69,864", subEn: "Census Baseline", subMl: "സെൻസസ് കണക്ക്" },
                { labelEn: "Public Assets", labelMl: "പൊതു സൗകര്യങ്ങൾ", val: `${locations.length}+`, subEn: "Verified Assets", subMl: "സ്ഥാപനങ്ങൾ" },
                { labelEn: "Waste Coverage", labelMl: "മാലിന്യ ശേഖരണം", val: "100%", subEn: "Haritha Karma Sena", subMl: "ഹരിത കർമ്മസേന" },
                { labelEn: "ULB Grade", labelMl: "പദവി", val: "Grade II", subEn: "Urban Local Body", subMl: "നഗരസഭ (2015)" },
              ].map((fact, idx) => (
                <div key={idx} className="p-3.5 bg-white rounded-2xl border border-[#EDE6D8] text-left shadow-2xs hover:border-[#C39A5B] transition-colors">
                  <span className="text-[10px] uppercase font-bold text-[#C39A5B] block truncate">
                    {language === "ml" ? fact.labelMl : fact.labelEn}
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-[#194B35] block my-0.5 font-mono">{fact.val}</span>
                  <span className="text-[10px] text-[#5C6A64] block truncate">
                    {language === "ml" ? fact.subMl : fact.subEn}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. NAVIGATION TABS (6 TABS: OVERVIEW, WARDS, FACILITIES, DEPTS, GIS, NEWS) */}
        {/* ========================================================================= */}
        <nav 
          role="tablist"
          aria-label="Digital Municipality Sections"
          className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[#EDE6D8]"
        >
          {[
            { key: "overview", label: "Overview & Leadership", label_ml: "ഭരണ നേതൃത്വം", icon: Building2 },
            { key: "wards", label: "45 Wards Directory", label_ml: "45 വാർഡുകൾ", icon: MapPin },
            { key: "facilities", label: "Public Facilities & Directory", label_ml: "പൊതു സൗകര്യങ്ങൾ", icon: Layers },
            { key: "departments", label: "Departments & Wings", label_ml: "വകുപ്പുകളും ചുമതലകളും", icon: Briefcase },
            { key: "gis", label: "Interactive GIS Map", label_ml: "ഡിജിറ്റൽ മാപ്പ് (GIS)", icon: Globe2 },
            { key: "announcements", label: "Public Announcements", label_ml: "നഗരസഭാ അറിയിപ്പുകൾ", icon: Calendar },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                id={`tab-${tab.key}`}
                role="tab"
                aria-selected={isActive}
                aria-controls={`tabpanel-${tab.key}`}
                onClick={() => setActiveTab(tab.key as TabKey)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#194B35] focus-visible:ring-offset-2 ${
                  isActive
                    ? "bg-[#194B35] text-white shadow-sm ring-2 ring-[#194B35]/20"
                    : "bg-white text-[#5C6A64] hover:text-[#194B35] hover:bg-[#FAF7F0] border border-[#EDE6D8]"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-amber-300" : "text-[#C39A5B]"}`} />
                <span>{language === "ml" ? tab.label_ml : tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* ========================================================================= */}
        {/* TAB 1: OVERVIEW & LEADERSHIP HIERARCHY                                    */}
        {/* ========================================================================= */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-in fade-in duration-200" id="tabpanel-overview" role="tabpanel" aria-labelledby="tab-overview">
            {/* Leadership Grid */}
            <div>
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#194B35] font-malayalam-heading">
                    {language === "ml" ? "നഗരസഭാ ഭരണ നേതൃത്വം" : "Municipal Leadership & Administration"}
                  </h2>
                  <p className="text-xs text-[#5C6A64] mt-0.5">
                    {language === "ml"
                      ? "താനൂർ നഗരസഭയുടെ ജനാധിപത്യ ഭരണസമിതിയും മുഖ്യ നിർവ്വഹണ ഉദ്യോഗസ്ഥരും."
                      : "Elected council representatives and executive administrative officers."}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{language === "ml" ? "സ്ഥിരീകരിച്ച രേഖകൾ" : "Official Records"}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Municipal Chairperson */}
                <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 shadow-sm space-y-4 hover:shadow-md transition">
                  <div className="w-16 h-16 rounded-2xl bg-[#194B35] text-white flex items-center justify-center font-bold text-2xl shadow-sm">
                    🏛️
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C39A5B] block">
                      {language === "ml" ? "നഗരസഭാ അധ്യക്ഷൻ / അധ്യക്ഷ" : "Municipal Chairperson"}
                    </span>
                    <h3 className="text-lg font-black text-[#194B35] font-malayalam-heading">
                      {language === "ml" ? "ചെയർപേഴ്സൺ" : "Municipal Chairperson"}
                    </h3>
                    <p className="text-xs text-[#5C6A64] mt-1 leading-relaxed">
                      {language === "ml"
                        ? "താനൂർ നഗരസഭാ കൗൺസിലിന്റെ രാഷ്ട്രീയ-ഭരണ തലവൻ. നഗരസഭാ നയരൂപീകരണങ്ങൾക്കും വികസന പദ്ധതികൾക്കും നേതൃത്വം നൽകുന്നു."
                        : "Elected head of Tanur Municipal Council, leading municipal policy-making, council deliberations, and town development."}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-[#5C6A64]">
                    <span>Office: 0494 2440232</span>
                    <span className="font-bold text-[#194B35]">Room 101</span>
                  </div>
                </div>

                {/* Deputy Chairperson */}
                <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 shadow-sm space-y-4 hover:shadow-md transition">
                  <div className="w-16 h-16 rounded-2xl bg-[#C39A5B] text-[#194B35] flex items-center justify-center font-bold text-2xl shadow-sm">
                    ⚖️
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C39A5B] block">
                      {language === "ml" ? "നഗരസഭാ ഉപാധ്യക്ഷൻ" : "Vice Chairperson"}
                    </span>
                    <h3 className="text-lg font-black text-[#194B35] font-malayalam-heading">
                      {language === "ml" ? "വൈസ് ചെയർപേഴ്സൺ" : "Deputy Chairperson"}
                    </h3>
                    <p className="text-xs text-[#5C6A64] mt-1 leading-relaxed">
                      {language === "ml"
                        ? "നഗരസഭാ ധനകാര്യ സ്റ്റാൻഡിംഗ് കമ്മിറ്റിയുടെ അധ്യക്ഷൻ. വാർഷിക ബജറ്റ് തയ്യാറാക്കലിനും നികുതി പരിഷ്കാരങ്ങൾക്കും മേൽനോട്ടം വഹിക്കുന്നു."
                        : "Ex-officio Chairperson of the Finance Standing Committee, overseeing municipal revenue and budget execution."}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-[#5C6A64]">
                    <span>Office: 0494 2440232</span>
                    <span className="font-bold text-[#194B35]">Room 102</span>
                  </div>
                </div>

                {/* Municipal Secretary */}
                <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 shadow-sm space-y-4 hover:shadow-md transition">
                  <div className="w-16 h-16 rounded-2xl bg-[#1E3A8A] text-white flex items-center justify-center font-bold text-2xl shadow-sm">
                    📜
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C39A5B] block">
                      {language === "ml" ? "ചീഫ് എക്സിക്യൂട്ടീവ് ഓഫീസർ" : "Chief Executive Officer"}
                    </span>
                    <h3 className="text-lg font-black text-[#194B35] font-malayalam-heading">
                      {language === "ml" ? "മുനിസിപ്പൽ സെക്രട്ടറി" : "Municipal Secretary"}
                    </h3>
                    <p className="text-xs text-[#5C6A64] mt-1 leading-relaxed">
                      {language === "ml"
                        ? "തദ്ദേശ സ്വയംഭരണ വകുപ്പിൽ നിന്നുള്ള മുഖ്യ ഭരണ നിർവ്വഹണ ഉദ്യോഗസ്ഥൻ. കൗൺസിൽ തീരുമാനങ്ങൾ നടപ്പിലാക്കലും സാമ്പത്തിക ഇടപാടുകളുടെ നിയന്ത്രണവും നിർവ്വഹിക്കുന്നു."
                        : "Principal Executive Officer appointed by Government of Kerala, executing council resolutions and exercising statutory administrative control."}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-[#5C6A64]">
                    <span>Office: 0494 2440228</span>
                    <span className="font-bold text-[#194B35]">Secretary Chamber</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Standing Committees Summary */}
            <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#194B35] font-malayalam-heading">
                  {language === "ml" ? "നഗരസഭാ സ്റ്റാൻഡിംഗ് കമ്മിറ്റികൾ (Standing Committees)" : "Five Statutory Standing Committees"}
                </h3>
                <p className="text-xs text-[#5C6A64] mt-1">
                  {language === "ml"
                    ? "കേരള മുനിസിപ്പാലിറ്റി ആക്ട് പ്രകാരം പ്രവർത്തിക്കുന്ന സബ്-കമ്മിറ്റികൾ."
                    : "Statutory governance committees established under the Kerala Municipality Act 1994."}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] space-y-1">
                  <span className="font-bold text-[#194B35] block text-sm">1. Finance Committee</span>
                  <p className="text-[#5C6A64]">Chaired by Vice Chairperson. Supervises budget, revenue mobilization, expenditure audits.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] space-y-1">
                  <span className="font-bold text-[#194B35] block text-sm">2. Development Committee</span>
                  <p className="text-[#5C6A64]">Chaired by Development Standing Committee Chair. Plans municipal projects, road connectivity, fisheries infrastructure.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] space-y-1">
                  <span className="font-bold text-[#194B35] block text-sm">3. Welfare Committee</span>
                  <p className="text-[#5C6A64]">Monitors social welfare pensions, poverty alleviation, Kudumbashree schemes, and women empowerment.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] space-y-1">
                  <span className="font-bold text-[#194B35] block text-sm">4. Health Committee</span>
                  <p className="text-[#5C6A64]">Oversees public health, sanitation, waste management, epidemic prevention, and civil registrations.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] space-y-1">
                  <span className="font-bold text-[#194B35] block text-sm">5. Public Works (Maramath)</span>
                  <p className="text-[#5C6A64]">Scrutinizes engineering estimates, road repairs, streetlights, municipal building maintenance.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] space-y-1">
                  <span className="font-bold text-[#194B35] block text-sm">Council Secretariat</span>
                  <p className="text-[#5C6A64]">General administration, RTI processing, gazette notices, and citizen services oversight.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: ALL 45 WARDS DIRECTORY (POLISHED WARD CARDS)                       */}
        {/* ========================================================================= */}
        {activeTab === "wards" && (
          <div className="space-y-6 animate-in fade-in duration-200" id="tabpanel-wards" role="tabpanel" aria-labelledby="tab-wards">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#194B35] font-malayalam-heading">
                    {language === "ml" ? "45 നഗരസഭാ വാർഡുകൾ" : "All 45 Municipal Wards of Tanur"}
                  </h2>
                  <VerificationBadge 
                    level="verified" 
                    citation="LSGD Delimitation Order" 
                    language={language} 
                  />
                </div>
                <p className="text-xs text-[#5C6A64]">
                  {language === "ml"
                    ? "താനൂർ നഗരസഭയിലെ 45 ഡിവിഷനുകൾ, കേന്ദ്ര സ്വിച്ച്ബോർഡ് സമ്പർക്കം, പ്രധാന പ്രദേശങ്ങൾ, ഏകദേശ ജിയോ-കോർഡിനേറ്റുകൾ."
                    : "Delimited electoral divisions, central switchboard communications, key localities, and approximate locality centroids."}
                </p>
              </div>

              {/* Ward Search */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  aria-label={language === "ml" ? "വാർഡ് നമ്പർ അല്ലെങ്കിൽ പേര് തിരയുക" : "Search municipal wards by number, name, or locality"}
                  value={wardSearch}
                  onChange={(e) => setWardSearch(e.target.value)}
                  placeholder={language === "ml" ? "വാർഡ് നമ്പർ അല്ലെങ്കിൽ പേര് തിരയുക..." : "Search ward number or name..."}
                  className="w-full pl-9 pr-4 py-2.5 bg-white text-xs border border-[#EDE6D8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#194B35] shadow-2xs"
                />
              </div>
            </div>

            {/* Comprehensive Ward Transparency Notice Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950 space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-900">
                <ShieldCheck className="w-4 h-4 text-amber-800 shrink-0" />
                <span>
                  {language === "ml"
                    ? "വാർഡ് വിവര സുതാര്യതാ മാർഗ്ഗരേഖ (Ward Data Transparency Notice)"
                    : "Ward Data Presentation & Verification Notice"}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px] text-amber-900/90 leading-relaxed pt-1">
                <div className="p-2.5 rounded-xl bg-white/70 border border-amber-200/60">
                  <span className="font-bold block text-[#194B35] mb-0.5">
                    1. {language === "ml" ? "സ്ഥിരീകരിച്ച ഡിവിഷനുകൾ" : "Verified Divisions (1–45)"}
                  </span>
                  {language === "ml"
                    ? "എല്ലാ 45 വാർഡ് പേരുകളും നമ്പറുകളും കേരള തദ്ദേശ സ്വയംഭരണ വകുപ്പിന്റെ ഡീലിമിറ്റേഷൻ ഉത്തരവ് പ്രകാരം സ്ഥിരീകരിച്ചതാണ്."
                    : "All 45 ward numbers and official Malayalam/English names are verified via the official LSGD Delimitation Order."}
                </div>
                <div className="p-2.5 rounded-xl bg-white/70 border border-amber-200/60">
                  <span className="font-bold block text-[#194B35] mb-0.5">
                    2. {language === "ml" ? "കേന്ദ്ര സ്വിച്ച്ബോർഡ് സമ്പർക്കം" : "Central Municipal Switchboard"}
                  </span>
                  {language === "ml"
                    ? "കൗൺസിലർമാരുടെ സ്വകാര്യ ഫോൺ നമ്പറുകൾ പരസ്യപ്പെടുത്തിയിട്ടില്ല. എല്ലാ ഔദ്യോഗിക കാര്യങ്ങൾക്കും നഗരസഭാ സെൻട്രൽ സ്വിച്ച്ബോർഡിൽ (0494 2440228) ബന്ധപ്പെടുക."
                    : "Individual councillor personal numbers are withheld per privacy guidelines. Public inquiries route via Central Municipal Switchboard (0494 2440228)."}
                </div>
                <div className="p-2.5 rounded-xl bg-white/70 border border-amber-200/60">
                  <span className="font-bold block text-[#194B35] mb-0.5">
                    3. {language === "ml" ? "ഏകദേശ കോർഡിനേറ്റുകൾ" : "Approximate Centroid Pins"}
                  </span>
                  {language === "ml"
                    ? "രേഖപ്പെടുത്തിയിട്ടുള്ള അക്ഷാംശ-രേഖാംശങ്ങൾ ഓരോ വാർഡിന്റെയും പ്രധാന പ്രദേശത്തിന്റെ കേന്ദ്രമാണ്. കൃത്യമായ പോളിഗൺ അതിർത്തികൾ സർവേ ഓഫ് ഇന്ത്യ റിലീസിന് വിധേയം."
                    : "Coordinates represent approximate locality centroids. Exact cadastral polygon boundaries will be rendered upon official Survey of India / LSGD release."}
                </div>
              </div>
            </div>

            {/* Wards Grid: 45 Polish Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredWards.map((w) => {
                const isSelected = selectedWardNumber === w.ward_number;
                return (
                  <div
                    key={w.id}
                    className="bg-white rounded-2xl p-5 border border-[#EDE6D8] hover:border-[#194B35] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group space-y-4"
                  >
                    <div className="space-y-3">
                      {/* Card Header: Ward Number Badge & Delimitation Verification */}
                      <div className="flex items-center justify-between">
                        <span className="w-9 h-9 rounded-xl bg-[#194B35] text-white flex items-center justify-center font-black text-xs shadow-xs">
                          {w.ward_number}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <VerificationBadge level="verified" size="sm" language={language} />
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FAF7F0] text-[#5C6A64] border border-[#EDE6D8]">
                            ~{w.population_approx}
                          </span>
                        </div>
                      </div>

                      {/* Ward Title & Councillor Status */}
                      <div>
                        <h3 className="font-bold text-base text-[#194B35] font-malayalam-heading group-hover:text-[#123626] transition-colors">
                          {language === "ml" ? w.name_ml : w.name}
                        </h3>
                        <p className="text-xs text-[#5C6A64] mt-0.5 flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-[#C39A5B]" />
                          <span>{language === "ml" ? `${w.name_ml} വാർഡ് കൗൺസിലർ` : `Elected Councillor (Ward ${w.ward_number})`}</span>
                        </p>
                      </div>

                      {/* Central Municipal Switchboard Contact Notice */}
                      <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#EDE6D8] text-[11px] text-[#5C6A64] space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-[#194B35] uppercase tracking-wider">
                            {language === "ml" ? "സമ്പർക്കം:" : "Contact:"}
                          </span>
                          <a
                            href="tel:04942440228"
                            className="flex items-center gap-1 text-[#194B35] font-bold hover:underline"
                          >
                            <Phone className="w-3 h-3 text-[#C39A5B]" />
                            <span>0494 2440228</span>
                          </a>
                        </div>
                        <span className="text-[9px] text-[#7A8880] block leading-tight">
                          {language === "ml" 
                            ? "നഗരസഭാ കേന്ദ്ര സ്വിച്ച്ബോർഡ് (സ്വകാര്യ നമ്പർ പരസ്യപ്പെടുത്തിയിട്ടില്ല)" 
                            : "Central Municipal Switchboard (Direct councillor mobile withheld for privacy)"}
                        </span>
                      </div>

                      {/* Key Localities */}
                      <div className="space-y-1 pt-1 text-xs text-[#5C6A64]">
                        <span className="text-[10px] font-bold text-[#7A8880] uppercase tracking-wider block">
                          {language === "ml" ? "പ്രധാന പ്രദേശങ്ങൾ:" : "Key Localities:"}
                        </span>
                        <p className="line-clamp-2 leading-relaxed">
                          {language === "ml" ? w.key_localities_ml.join(", ") : w.key_localities.join(", ")}
                        </p>
                      </div>

                      {/* Centroid Tag */}
                      <div className="text-[10px] text-[#7A8880] flex items-center gap-1 pt-1 border-t border-gray-100">
                        <MapPin className="w-3 h-3 text-[#C39A5B] shrink-0" />
                        <span className="truncate">Centroid: {w.latitude.toFixed(3)}°N, {w.longitude.toFixed(3)}°E</span>
                      </div>
                    </div>

                    {/* Card Bottom Row: Civic Indicators & Circular Dark Green Action Button */}
                    <div className="pt-3 border-t border-[#EDE6D8] flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[10px]">
                        <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-bold">
                          ⚠️ {w.active_issues_count} {language === "ml" ? "പരാതികൾ" : "Issues"}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                          👷 {w.active_projects_count} {language === "ml" ? "പദ്ധതികൾ" : "Projects"}
                        </span>
                      </div>

                      {/* Circular Dark Green Action Arrow Button */}
                      <button
                        onClick={() => {
                          setSelectedWardNumber(isSelected ? null : w.ward_number);
                        }}
                        aria-label={`View Ward ${w.ward_number} details`}
                        className="w-9 h-9 rounded-full bg-[#194B35] text-white flex items-center justify-center hover:bg-[#123626] hover:scale-105 active:scale-95 transition-all shadow-sm shrink-0"
                      >
                        <ChevronRight className={`w-4 h-4 text-white transition-transform duration-200 ${isSelected ? "rotate-90" : ""}`} />
                      </button>
                    </div>

                    {/* Expanded Ward Governance Drawer */}
                    {isSelected && (
                      <div className="pt-3 border-t border-[#194B35]/20 space-y-2 text-xs animate-in fade-in duration-150">
                        <div className="p-3 rounded-xl bg-[#FAF7F0] border border-[#EDE6D8] space-y-2 text-[11px]">
                          <span className="font-bold text-[#194B35] block">
                            {language === "ml" ? "വാർഡ് ഭരണനിർവ്വഹണ റഫറൻസ്:" : "Ward Governance Reference:"}
                          </span>
                          <p className="text-[#5C6A64] leading-relaxed">
                            {language === "ml"
                              ? "നഗരസഭാ തെരഞ്ഞെടുപ്പ് വിജ്ഞാപന പ്രകാരമുള്ള ഡിവിഷൻ. പരാതികൾ സമർപ്പിക്കാൻ സിവിക് കണക്ട് ഉപയോഗിക്കുക."
                              : "Official municipal electoral division. Inquiries and civic grievances can be submitted directly via Civic Connect."}
                          </p>
                          <div className="flex flex-wrap gap-2 pt-1">
                            <a
                              href="tel:04942440228"
                              className="px-3 py-1.5 rounded-xl bg-[#194B35] hover:bg-[#123626] text-white text-[11px] font-bold flex items-center gap-1.5 shadow-2xs transition"
                            >
                              <Phone className="w-3 h-3 text-[#C39A5B]" />
                              <span>{language === "ml" ? "സ്വിച്ച്ബോർഡ്" : "Call Switchboard"}</span>
                            </a>
                            <Link
                              href="/civic-connect"
                              className="px-3 py-1.5 rounded-xl bg-white border border-[#EDE6D8] hover:border-[#194B35] text-[#194B35] text-[11px] font-bold hover:bg-[#FAF7F0] flex items-center gap-1.5 shadow-2xs transition"
                            >
                              <span>{language === "ml" ? "പരാതി അറിയിക്കുക" : "Report Issue"}</span>
                              <ChevronRight className="w-3 h-3 text-[#C39A5B]" />
                            </Link>
                            <button
                              onClick={() => handleWardFocusOnMap(w)}
                              className="px-3 py-1.5 rounded-xl bg-[#C39A5B] hover:bg-[#b0874a] text-white text-[11px] font-bold flex items-center gap-1.5 shadow-2xs transition"
                            >
                              <Globe2 className="w-3 h-3" />
                              <span>{language === "ml" ? "മാപ്പിൽ കാണുക" : "View on Map"}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {filteredWards.length === 0 && (
                <div className="col-span-full p-8 rounded-3xl bg-white border border-[#EDE6D8] text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF7F0] text-[#194B35] flex items-center justify-center mx-auto">
                    <Search className="w-6 h-6 text-[#C39A5B]" />
                  </div>
                  <h3 className="text-base font-bold text-[#194B35] font-malayalam-heading">
                    {language === "ml" ? "വാർഡുകൾ കണ്ടെത്താനായില്ല" : "No Municipal Wards Found"}
                  </h3>
                  <p className="text-xs text-[#5C6A64] max-w-md mx-auto">
                    {language === "ml"
                      ? `"${wardSearch}" എന്ന തിരയലിന് അനുയോജ്യമായ വാർഡുകൾ ലഭ്യമല്ല. മറ്റൊരു പേരോ നമ്പറോ നൽകി വീണ്ടും ശ്രമിക്കുക.`
                      : `No ward matched your search query "${wardSearch}". Try searching by ward number (1-45) or locality name.`}
                  </p>
                  <button
                    onClick={() => setWardSearch("")}
                    className="px-4 py-2 rounded-xl bg-[#194B35] text-white text-xs font-bold hover:bg-[#123626] transition"
                  >
                    {language === "ml" ? "തിരയൽ പുനഃക്രമീകരിക്കുക" : "Clear Search"}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: PUBLIC FACILITIES & ASSET DIRECTORY (NEW!)                          */}
        {/* ========================================================================= */}
        {activeTab === "facilities" && (
          <div className="space-y-6 animate-in fade-in duration-200" id="tabpanel-facilities" role="tabpanel" aria-labelledby="tab-facilities">
            {/* Header & Search */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#194B35] font-malayalam-heading">
                    {language === "ml" ? "താനൂർ പൊതു സൗകര്യങ്ങളും സ്ഥാപനങ്ങളും" : "Public Facilities & Assets Directory"}
                  </h2>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {locations.length} {language === "ml" ? "സ്ഥാപനങ്ങൾ" : "Assets"}
                  </span>
                </div>
                <p className="text-xs text-[#5C6A64]">
                  {language === "ml"
                    ? "ആരോഗ്യം, വിദ്യാഭ്യാസം, ഹാർബർ, അക്ഷയ സേവനങ്ങൾ, മാലിന്യ സംസ്കരണ കേന്ദ്രങ്ങൾ, അടിയന്തര സേവനങ്ങൾ എന്നിവയുടെ സമഗ്ര വിവരങ്ങൾ."
                    : "Verified public utilities, educational institutions, healthcare centers, Akshaya e-centres, and waste facilities across Tanur."}
                </p>
              </div>

              {/* Facility Search */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  aria-label={language === "ml" ? "സ്ഥാപനം അല്ലെങ്കിൽ വാർഡ് തിരയുക" : "Search public facilities by name, ward, or locality"}
                  value={facilitySearch}
                  onChange={(e) => setFacilitySearch(e.target.value)}
                  placeholder={language === "ml" ? "സ്ഥാപനം അല്ലെങ്കിൽ വാർഡ് തിരയുക..." : "Search facility, ward, or locality..."}
                  className="w-full pl-9 pr-4 py-2.5 bg-white text-xs border border-[#EDE6D8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#194B35] shadow-2xs"
                />
              </div>
            </div>

            {/* Category Filter Pills with Real-Time Counts */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {FACILITY_CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isSelected = facilityCategory === cat.key;
                const count = facilityCounts[cat.key] || 0;
                return (
                  <button
                    key={cat.key}
                    role="button"
                    aria-pressed={isSelected}
                    onClick={() => setFacilityCategory(cat.key as any)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                      isSelected
                        ? "bg-[#194B35] text-white shadow-sm ring-2 ring-[#194B35]/20"
                        : "bg-white text-[#5C6A64] hover:text-[#194B35] hover:bg-[#FAF7F0] border border-[#EDE6D8]"
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-amber-300" : "text-[#C39A5B]"}`} />
                    <span>{language === "ml" ? cat.label_ml : cat.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ml-0.5 ${
                      isSelected ? "bg-white/20 text-white" : "bg-[#FAF7F0] text-[#5C6A64]"
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Facilities Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredFacilities.map((fac) => (
                <div
                  key={fac.id}
                  className="bg-white rounded-2xl border border-[#EDE6D8] p-5 shadow-sm hover:shadow-md hover:border-[#194B35] transition-all flex flex-col justify-between group space-y-4"
                >
                  <div className="space-y-3">
                    {/* Top row: Category Badge, Verification, Ward Pill */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {language === "ml" ? fac.category_name_ml : fac.category_name}
                        </span>
                        <VerificationBadge level="verified" size="sm" language={language} />
                      </div>
                      {fac.ward_number ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FAF7F0] text-[#194B35] border border-[#EDE6D8]">
                          {language === "ml" ? `വാർഡ് ${fac.ward_number}` : `Ward ${fac.ward_number}`}
                        </span>
                      ) : null}
                    </div>

                    {/* Facility Titles */}
                    <div>
                      <h3 className="font-bold text-base text-[#194B35] font-malayalam-heading group-hover:text-[#123626] transition-colors">
                        {language === "ml" ? fac.name_ml : fac.name}
                      </h3>
                      <p className="text-xs font-semibold text-[#5C6A64] mt-0.5">
                        {language === "ml" ? fac.name : fac.name_ml}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-[#5C6A64] line-clamp-2 leading-relaxed">
                      {language === "ml" ? fac.description_ml : fac.description}
                    </p>

                    {/* Locality & Address */}
                    <div className="pt-2 border-t border-gray-100 space-y-1.5 text-xs text-[#5C6A64]">
                      <div className="flex items-start gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#C39A5B] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{fac.address}</span>
                      </div>

                      {fac.opening_hours && (
                        <div className="flex items-center gap-1.5 text-[11px] text-[#7A8880]">
                          <Clock className="w-3 h-3 text-[#C39A5B] shrink-0" />
                          <span className="line-clamp-1">
                            {language === "ml" ? fac.opening_hours_ml || fac.opening_hours : fac.opening_hours}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Phone / Emergency Contact Box */}
                    {(fac.phone || fac.emergency_phone) && (
                      <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#EDE6D8] flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          {fac.phone && (
                            <a
                              href={`tel:${fac.phone.replace(/[^0-9]/g, "")}`}
                              className="inline-flex items-center gap-1 font-bold text-[#194B35] hover:underline"
                            >
                              <Phone className="w-3 h-3 text-[#C39A5B]" />
                              <span>{fac.phone}</span>
                            </a>
                          )}
                          {fac.emergency_phone && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200">
                              🚨 {fac.emergency_phone}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-[#7A8880]">
                          {language === "ml" ? "ഔദ്യോഗിക ഫോൺ" : "Official Phone"}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Bottom Row: Centroid Coordinates & Circular Green Action Arrow */}
                  <div className="pt-3 border-t border-[#EDE6D8] flex items-center justify-between">
                    <div className="text-[10px] text-[#7A8880] flex items-center gap-1">
                      <Compass className="w-3 h-3 text-[#C39A5B] shrink-0" />
                      <span>{fac.latitude.toFixed(3)}°N, {fac.longitude.toFixed(3)}°E</span>
                    </div>

                    <button
                      onClick={() => handleFacilityFocusOnMap(fac)}
                      aria-label={`View ${fac.name} on GIS Map`}
                      title={language === "ml" ? "മാപ്പിൽ കാണുക" : "View on GIS Map"}
                      className="w-9 h-9 rounded-full bg-[#194B35] text-white flex items-center justify-center hover:bg-[#123626] hover:scale-105 active:scale-95 transition-all shadow-sm shrink-0"
                    >
                      <ChevronRight className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredFacilities.length === 0 && (
              <div className="p-8 text-center bg-white rounded-3xl border border-[#EDE6D8] text-[#5C6A64]">
                <Layers className="w-8 h-8 text-[#C39A5B] mx-auto mb-2" />
                <p className="font-bold text-sm">
                  {language === "ml" ? "സ്ഥാപനങ്ങൾ ഒന്നും കണ്ടെത്താനായില്ല" : "No public facilities found"}
                </p>
                <p className="text-xs text-[#7A8880] mt-1">
                  {language === "ml" ? "മറ്റൊരു കീവേഡ് ഉപയോഗിച്ച് തിരയുക." : "Try adjusting your search or category filter."}
                </p>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: DEPARTMENTS & WINGS                                                */}
        {/* ========================================================================= */}
        {activeTab === "departments" && (
          <div className="space-y-6 animate-in fade-in duration-200" id="tabpanel-departments" role="tabpanel" aria-labelledby="tab-departments">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#194B35] font-malayalam-heading">
                {language === "ml" ? "നഗരസഭാ വകുപ്പുകളും ഉത്തരവാദിത്തങ്ങളും" : "Municipal Departments & Responsibilities"}
              </h2>
              <p className="text-xs text-[#5C6A64] mt-0.5">
                {language === "ml"
                  ? "ഓരോ ഡിപ്പാർട്ട്‌മെന്റിന്റെയും ചുമതലകൾ, അധ്യക്ഷ ഉദ്യോഗസ്ഥർ, പൊതുജന സമ്പർക്ക വിവരങ്ങൾ."
                  : "Key administrative wings functioning inside Tanur Municipality headquarters."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MUNICIPAL_DEPARTMENTS.map((dept) => {
                const Icon = dept.icon;
                return (
                  <div key={dept.id} className="bg-white rounded-3xl border border-[#EDE6D8] p-6 shadow-sm space-y-4 hover:shadow-md transition">
                    <div className="flex items-start gap-4">
                      <div 
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-xs"
                        style={{ backgroundColor: dept.color }}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#C39A5B] block">
                          {language === "ml" ? dept.lead_ml : dept.lead}
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-[#194B35] font-malayalam-heading">
                          {language === "ml" ? dept.name_ml : dept.name}
                        </h3>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-gray-100 text-xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                        {language === "ml" ? "പ്രധാന ഉത്തരവാദിത്തങ്ങൾ:" : "Key Statutory Responsibilities:"}
                      </span>
                      <ul className="space-y-1.5 list-disc pl-4 text-[#5C6A64]">
                        {(language === "ml" ? dept.responsibilities_ml : dept.responsibilities).map((r, i) => (
                          <li key={i} className="leading-relaxed">{r}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: INTERACTIVE GIS MAP (GOOGLE MAPS PLATFORM)                          */}
        {/* ========================================================================= */}
        {activeTab === "gis" && (
          <div className="space-y-4 animate-in fade-in duration-200" id="tabpanel-gis" role="tabpanel" aria-labelledby="tab-gis">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#194B35] font-malayalam-heading">
                  {language === "ml" ? "താനൂർ നഗരസഭ — ഗൂഗിൾ മാപ്പ് ജി.ഐ.എസ്" : "Tanur Municipality GIS & Location Explorer"}
                </h2>
                <p className="text-xs text-[#5C6A64]">
                  {language === "ml"
                    ? "റോഡ് മാപ്പ്, ഹൈ-റെസലൂഷൻ സാറ്റലൈറ്റ്, 3D ടെറൈൻ കാഴ്‌ചകൾ എന്നിവ ഉപയോഗിച്ച് നഗരസഭയിലെ 48+ പൊതു സ്ഥാപനങ്ങളും വികസന പദ്ധതികളും കാണുക."
                    : "Standard 2D Roadmap, high-resolution satellite imagery, and verified 3D Terrain relief mapping 48+ public facilities."}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab("facilities")}
                  className="px-3.5 py-1.5 bg-[#FAF7F0] hover:bg-[#EDE6D8] text-[#194B35] border border-[#EDE6D8] rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                >
                  <Layers className="w-3.5 h-3.5 text-[#C39A5B]" />
                  <span>{language === "ml" ? "സ്ഥാപനങ്ങളുടെ പട്ടിക" : "Facilities Directory"}</span>
                </button>
                <Link
                  href="/public-services"
                  className="px-3.5 py-1.5 bg-white hover:bg-neutral-50 text-[#194B35] border border-[#EDE6D8] rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-2xs"
                >
                  <Briefcase className="w-3.5 h-3.5 text-[#C39A5B]" />
                  <span>{language === "ml" ? "പൊതു സേവനങ്ങൾ" : "Public Services"}</span>
                </Link>
              </div>
            </div>

            {/* Embedded Upgraded Map Component */}
            <DigitalTanurMap
              locations={locations}
              localities={localities}
              projects={projects}
              civicIssues={civicIssues}
              selectedLocationId={mapSelectedLocationId}
              focusCoordinates={mapFocusCoords}
              language={language}
              heightClass="h-[600px] sm:h-[680px]"
            />
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: PUBLIC ANNOUNCEMENTS                                               */}
        {/* ========================================================================= */}
        {activeTab === "announcements" && (
          <div className="space-y-6 animate-in fade-in duration-200" id="tabpanel-announcements" role="tabpanel" aria-labelledby="tab-announcements">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#194B35] font-malayalam-heading">
                  {language === "ml" ? "നഗരസഭാ ഔദ്യോഗിക അറിയിപ്പുകൾ" : "Official Municipal Announcements"}
                </h2>
                <p className="text-xs text-[#5C6A64] mt-0.5">
                  {language === "ml"
                    ? "നഗരസഭാ കാര്യാലയത്തിൽ നിന്നുള്ള ഏറ്റവും പുതിയ വാർത്തകളും വിജ്ഞാപനങ്ങളും."
                    : "Verified updates, meeting intimations, and public advisories from Tanur Municipality."}
                </p>
              </div>

              <Link
                href="/documents"
                className="px-4 py-2 bg-[#194B35] text-white text-xs font-bold rounded-xl hover:bg-[#123626] transition flex items-center gap-1.5 shadow-2xs"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{language === "ml" ? "മുഴുവൻ രേഖകളും കാണുക" : "View All Documents"}</span>
              </Link>
            </div>

            <div className="space-y-4">
              {[
                {
                  id: "anc-01",
                  title: "Pre-Monsoon Sanitation & Haritha Karma Sena Ward Drives Announced",
                  title_ml: "മൺസൂൺ പൂർവ്വ ശുചീകരണം & ഹരിത കർമ്മസേന വാർഡ് ഡ്രൈവ് ആരംഭിച്ചു",
                  date: "2024-11-12",
                  department: "Health Wing, Tanur Municipality",
                  summary: "Special ward-level collection for dry and e-waste scheduled across all coastal wards from Nov 20 to Dec 5.",
                  summary_ml: "നവംബർ 20 മുതൽ ഡിസംബർ 5 വരെ താനൂരിലെ തീരദേശ വാർഡുകളിൽ പ്രത്യേക അജൈവ മാലിന്യ ശേഖരണം നടക്കുന്നു.",
                  tag: "Health & Sanitation"
                },
                {
                  id: "anc-02",
                  title: "Tanur Fishing Harbour Inner Basin Desiltation Tender Published",
                  title_ml: "താനൂർ ഫിഷിംഗ് ഹാർബർ ആഴം കൂട്ടൽ ഇ-ടെണ്ടർ പ്രസിദ്ധീകരിച്ചു",
                  date: "2024-11-04",
                  department: "Fisheries & Harbour Engineering",
                  summary: "E-tenders invited for dredging and maintenance of navigation basin at Tanur Fishing Harbour.",
                  summary_ml: "താനൂർ ഫിഷിംഗ് ഹാർബറിലെ ബോട്ട് നാവിഗേഷൻ തടസ്സം ഒഴിവാക്കാൻ ഡ്രഡ്ജിംഗ് ജോലികൾക്കായി ഇ-ടെണ്ടർ ക്ഷണിച്ചു.",
                  tag: "Infrastructure"
                },
                {
                  id: "anc-03",
                  title: "CRZ Mandatory Clearance Notice for Coastal Ward Constructions",
                  title_ml: "തീരദേശ വാർഡുകളിലെ കെട്ടിട നിർമ്മാണത്തിന് CRZ അനുമതി നിർബന്ധം",
                  date: "2024-09-12",
                  department: "Town Planning Wing",
                  summary: "Statutory notice directing property owners in Wards 3, 4, 11, 12, 13 to submit KCZMA approval before foundation laying.",
                  summary_ml: "തീരദേശ പരിപാലന പരിധിയിലുള്ള വാർഡുകളിലെ നിർമ്മാണങ്ങൾക്ക് KCZMA മുൻകൂർ അനുമതി നിർബന്ധമാക്കി.",
                  tag: "Statutory Notice"
                }
              ].map((anc) => (
                <div key={anc.id} className="p-5 rounded-3xl bg-white border border-[#EDE6D8] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#C39A5B] transition">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#FAF7F0] text-[#194B35] font-bold text-[10px] border border-[#EDE6D8]">
                        {anc.tag}
                      </span>
                      <span className="text-[11px] text-gray-400">{anc.date}</span>
                    </div>
                    <h3 className="font-bold text-base text-[#194B35] font-malayalam-heading">
                      {language === "ml" ? anc.title_ml : anc.title}
                    </h3>
                    <p className="text-xs text-[#5C6A64] line-clamp-2">
                      {language === "ml" ? anc.summary_ml : anc.summary}
                    </p>
                    <span className="text-[10px] text-gray-400 block pt-1">Published by: {anc.department}</span>
                  </div>

                  <Link
                    href="/documents"
                    className="px-4 py-2 bg-[#FAF7F0] hover:bg-neutral-100 text-[#194B35] font-bold text-xs rounded-xl border border-[#EDE6D8] flex items-center justify-center gap-1 shrink-0"
                  >
                    <span>{language === "ml" ? "വിശദാംശങ്ങൾ" : "Details"}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SOURCE CITATIONS & TRANSPARENCY DISCLAIMER                                 */}
        {/* ========================================================================= */}
        <DataSourcesNotice 
          language={language}
          title={language === "ml" ? "ഡിജിറ്റൽ നഗരസഭ — വിവര സ്രോതസ്സും സുതാര്യതാ മാനദണ്ഡവും" : "Digital Municipality — Verified Data Sources & Policy"}
          sources={[
            "Tanur Municipality Official Portal (tanurmunicipality.lsgkerala.gov.in)",
            "LSGD Delimitation Order & Ward Registry (lsgkerala.gov.in)",
            "State Election Commission Kerala (sec.kerala.gov.in)",
            "Census of India Town Directory (Malappuram District)",
          ]}
        />
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
