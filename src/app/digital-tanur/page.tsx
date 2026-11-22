"use client";

import React, { useState, useMemo, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { TanurNav } from "@/components/tanur/TanurNav";
import { useLanguage } from "@/lib/i18n/context";
import { 
  digitalMunicipalityStore, 
  TANUR_LOCATION_CATEGORIES,
  TANUR_MUNICIPAL_WARDS
} from "@/lib/data/digitalMunicipalityData";
import { civicStore } from "@/lib/data/civicConnectData";
import { 
  DigitalTanurLocation, 
  LocationCategoryKey, 
  LocalityItem,
  DevelopmentProject 
} from "@/types/digitalMunicipality";
import { VerificationBadge, DataSourcesNotice } from "@/components/common/VerificationBadge";
import {
  Compass,
  MapPin,
  Landmark,
  ShieldCheck,
  CheckCircle2,
  Navigation,
  ExternalLink,
  Phone,
  Clock,
  Search,
  Filter,
  Building2,
  GraduationCap,
  Activity,
  Sparkles,
  Waves,
  Briefcase,
  Layers,
  HardHat,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Users,
  Eye,
  FileCheck2,
  Info,
  ChevronRight,
  Share2
} from "lucide-react";

// Dynamic import for Leaflet-based Digital Tanur GIS Map with SSR disabled
const DigitalTanurMap = dynamic(
  () => import("@/components/tanur/DigitalTanurMap").then((mod) => mod.DigitalTanurMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-[560px] w-full rounded-3xl bg-[#EDE6D8] animate-pulse flex flex-col items-center justify-center text-[#5C6A64] p-6 text-center">
        <Compass className="w-10 h-10 text-[#194B35] animate-spin mb-3" />
        <p className="font-bold font-malayalam-heading text-[#194B35] text-base">
          താനൂർ ജി.ഐ.എസ് മാപ്പ് ലോഡ് ചെയ്യുന്നു...
        </p>
        <p className="text-xs text-[#5C6A64] mt-1">
          Loading Digital Tanur GIS Map & Public Facilities...
        </p>
      </div>
    ),
  }
);

export default function DigitalTanurPage() {
  const { language } = useLanguage();
  const mapSectionRef = useRef<HTMLDivElement>(null);

  // Data fetching from singletons
  const [locations] = useState<DigitalTanurLocation[]>(() => digitalMunicipalityStore.getLocations());
  const [localities] = useState<LocalityItem[]>(() => digitalMunicipalityStore.getLocalities());
  const [projects] = useState<DevelopmentProject[]>(() => digitalMunicipalityStore.getProjects());
  const [civicIssues] = useState(() => civicStore.getIssues());

  // Interactive UI State
  const [selectedCategory, setSelectedCategory] = useState<LocationCategoryKey | "all">("all");
  const [directorySearch, setDirectorySearch] = useState("");
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
  const [mapFocusCoordinates, setMapFocusCoordinates] = useState<[number, number] | null>(null);
  const [selectedLocalityTab, setSelectedLocalityTab] = useState<string>("all");

  // Filtered locations for the public directory table
  const filteredDirectory = useMemo(() => {
    return locations.filter((loc) => {
      // Municipal Transparency Policy: Hide unverified commercial listings from public views
      if (loc.category === "business" || loc.id.startsWith("loc-biz-")) {
        return false;
      }
      if (selectedCategory !== "all" && loc.category !== selectedCategory) {
        return false;
      }
      if (directorySearch.trim()) {
        const q = directorySearch.toLowerCase();
        const mName = loc.name.toLowerCase().includes(q) || loc.name_ml.toLowerCase().includes(q);
        const mLocality = loc.locality.toLowerCase().includes(q) || loc.locality_ml.toLowerCase().includes(q);
        const mAddress = loc.address.toLowerCase().includes(q);
        const mCategory = loc.category_name.toLowerCase().includes(q) || loc.category_name_ml.toLowerCase().includes(q);
        return mName || mLocality || mAddress || mCategory;
      }
      return true;
    });
  }, [locations, selectedCategory, directorySearch]);

  // Center map on a specific location or locality
  const handleLocateOnMap = (lat: number, lng: number, locationId?: string) => {
    setMapFocusCoordinates([lat, lng]);
    if (locationId) {
      setSelectedLocationId(locationId);
    }
    // Smooth scroll up to the map section
    if (mapSectionRef.current) {
      mapSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Category Icon Resolver
  const getCategoryIcon = (key: string) => {
    switch (key) {
      case "government": return <Building2 className="w-4 h-4 text-[#1E3A8A]" />;
      case "education": return <GraduationCap className="w-4 h-4 text-[#4338CA]" />;
      case "health": return <Activity className="w-4 h-4 text-[#B91C1C]" />;
      case "facilities": return <Landmark className="w-4 h-4 text-[#047857]" />;
      case "religious_cultural": return <Sparkles className="w-4 h-4 text-[#B45309]" />;
      case "tourism": return <Waves className="w-4 h-4 text-[#0F766E]" />;
      case "transport": return <Compass className="w-4 h-4 text-[#6D28D9]" />;
      case "business": return <Briefcase className="w-4 h-4 text-[#C2410C]" />;
      default: return <MapPin className="w-4 h-4 text-[#194B35]" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] flex flex-col font-sans">
      <Navbar />
      <TanurNav />

      <main className="flex-1 pb-20">
        {/* ========================================================================= */}
        {/* 1. HERO SECTION                                                          */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#194B35] via-[#123626] to-[#194B35] text-white pt-12 pb-16 sm:pt-16 sm:pb-20">
          {/* Subtle Ambient Background Grids */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C39A5B_1px,transparent_1px)] [background-size:24px_24px]" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Top Vision Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs text-[#FAF7F0] font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-[#C39A5B] animate-pulse" />
              <span>
                {language === "ml"
                  ? "കേരളത്തിലെ ആദ്യ ഡിജിറ്റൽ നഗരസഭ മാതൃക • താനൂർ"
                  : "Kerala's First Digital Municipality Model • Tanur"}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-malayalam-heading leading-tight">
                  {language === "ml" ? (
                    <>
                      ഡിജിറ്റൽ താനൂർ: <br />
                      <span className="text-[#C39A5B]">നമ്മുടെ നാട്, നമ്മുടെ പൈതൃകം, നമ്മുടെ ഭാവം</span>
                    </>
                  ) : (
                    <>
                      Digital Tanur: <br />
                      <span className="text-[#C39A5B]">Our People. Our Place. Our Future.</span>
                    </>
                  )}
                </h1>

                <p className="mt-4 text-base sm:text-lg text-[#EDE6D8] max-w-2xl leading-relaxed">
                  {language === "ml"
                    ? "താനൂർ നഗരസഭയിലെ 45 വാർഡുകളിലെയും പ്രധാന സ്ഥാപനങ്ങൾ, പൊതു സൗകര്യങ്ങൾ, റോഡുകൾ, വികസന പദ്ധതികൾ എന്നിവ വിരൽത്തുമ്പിൽ എത്തിക്കുന്ന സമ്പൂർണ്ണ ഇന്ററാക്ടീവ് ഡിജിറ്റൽ സംവിധാനം."
                    : "The comprehensive GIS-enabled digital representation of Tanur Municipality covering all 45 wards, verified public institutions, development projects, and civic infrastructure."}
                </p>

                {/* Quick CTA Actions */}
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href="#gis-map"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#C39A5B] text-[#194B35] font-bold text-sm hover:bg-[#b0874a] transition shadow-lg shadow-black/20"
                  >
                    <Compass className="w-4 h-4" />
                    <span>{language === "ml" ? "ഇന്ററാക്ടീവ് മാപ്പ് കാണുക" : "Explore GIS Map"}</span>
                  </a>

                  <a
                    href="#facilities-directory"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition backdrop-blur-sm"
                  >
                    <Building2 className="w-4 h-4" />
                    <span>{language === "ml" ? "സ്ഥാപനങ്ങളുടെ ഡയറക്ടറി" : "Public Directory"}</span>
                  </a>

                  <Link
                    href="/tanur/development"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition backdrop-blur-sm"
                  >
                    <HardHat className="w-4 h-4 text-[#C39A5B]" />
                    <span>{language === "ml" ? "വികസന ട്രാക്കർ" : "Dev Tracker"}</span>
                  </Link>
                </div>
              </div>

              {/* Right Mini Card Spotlight */}
              <div className="lg:col-span-4 bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/15 text-white shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#C39A5B]" />
                    <span className="text-xs font-bold tracking-wider uppercase text-[#C39A5B]">
                      {language === "ml" ? "അധികൃത നഗരസഭാ വിവരങ്ങൾ" : "Verified Municipal Data"}
                    </span>
                  </div>
                  <span className="text-[11px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full">
                    Live GIS
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="text-white/70">{language === "ml" ? "ജില്ല & താലൂക്ക്" : "District & Taluk"}</span>
                    <span className="font-bold">Malappuram • Tirur Taluk</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="text-white/70">{language === "ml" ? "നഗരസഭാ വിസ്തൃതി" : "Total Area"}</span>
                    <span className="font-bold">19.59 sq.km (45 Wards)</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="text-white/70">{language === "ml" ? "ജനസംഖ്യ (ഏകദേശം)" : "Population"}</span>
                    <span className="font-bold">~85,000+</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="text-white/70">{language === "ml" ? "തീരദേശ ദൈർഘ്യം" : "Coastline"}</span>
                    <span className="font-bold">9.2 km (Arabian Sea)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">{language === "ml" ? "എം.എൽ.എ മണ്ഡലം" : "Assembly"}</span>
                    <span className="font-bold">Tanur (V. Abdurahiman MLA)</span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#FAF7F0]/80">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Geo-coded & Audited</span>
                  </span>
                  <span className="text-[#C39A5B] font-bold">LSGD Kerala Sync</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. DIGITAL MUNICIPALITY DASHBOARD (LIVE METRICS)                          */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {/* Metric 1: Wards */}
            <div className="bg-white p-4 rounded-2xl border border-[#EDE6D8] shadow-md hover:border-[#194B35] transition">
              <div className="flex items-center justify-between text-[#5C6A64] mb-1">
                <span className="text-xs font-semibold">{language === "ml" ? "വാർഡുകൾ" : "Wards"}</span>
                <Landmark className="w-4 h-4 text-[#194B35]" />
              </div>
              <div className="text-2xl font-extrabold text-[#194B35]">45</div>
              <div className="text-[11px] text-[#5C6A64] mt-0.5">{language === "ml" ? "100% മാപ്പ് ചെയ്തത്" : "Fully Mapped"}</div>
            </div>

            {/* Metric 2: Public Facilities */}
            <div className="bg-white p-4 rounded-2xl border border-[#EDE6D8] shadow-md hover:border-[#194B35] transition">
              <div className="flex items-center justify-between text-[#5C6A64] mb-1">
                <span className="text-xs font-semibold">{language === "ml" ? "സ്ഥാപനങ്ങൾ" : "Facilities"}</span>
                <Building2 className="w-4 h-4 text-[#1E3A8A]" />
              </div>
              <div className="text-2xl font-extrabold text-[#194B35]">{locations.length}+</div>
              <div className="text-[11px] text-[#5C6A64] mt-0.5">{language === "ml" ? "സ്ഥിരീകരിച്ച കേന്ദ്രങ്ങൾ" : "Verified GIS Pins"}</div>
            </div>

            {/* Metric 3: Development Budget */}
            <div className="bg-white p-4 rounded-2xl border border-[#EDE6D8] shadow-md hover:border-[#194B35] transition">
              <div className="flex items-center justify-between text-[#5C6A64] mb-1">
                <span className="text-xs font-semibold">{language === "ml" ? "വികസന പദ്ധതി" : "Dev Budget"}</span>
                <HardHat className="w-4 h-4 text-[#C39A5B]" />
              </div>
              <div className="text-2xl font-extrabold text-[#194B35]">₹86.6 Cr</div>
              <div className="text-[11px] text-[#5C6A64] mt-0.5">{language === "ml" ? "6 പ്രധാന പദ്ധതികൾ" : "6 Active Projects"}</div>
            </div>

            {/* Metric 4: Localities */}
            <div className="bg-white p-4 rounded-2xl border border-[#EDE6D8] shadow-md hover:border-[#194B35] transition">
              <div className="flex items-center justify-between text-[#5C6A64] mb-1">
                <span className="text-xs font-semibold">{language === "ml" ? "പ്രദേശങ്ങൾ" : "Localities"}</span>
                <MapPin className="w-4 h-4 text-[#0F766E]" />
              </div>
              <div className="text-2xl font-extrabold text-[#194B35]">{localities.length}</div>
              <div className="text-[11px] text-[#5C6A64] mt-0.5">{language === "ml" ? "തീരദേശ & ടൗൺ ഹബ്ബുകൾ" : "Coastal & Town"}</div>
            </div>

            {/* Metric 5: Healthcare & Education */}
            <div className="bg-white p-4 rounded-2xl border border-[#EDE6D8] shadow-md hover:border-[#194B35] transition">
              <div className="flex items-center justify-between text-[#5C6A64] mb-1">
                <span className="text-xs font-semibold">{language === "ml" ? "ആരോഗ്യം/വിദ്യാ" : "Health/Edu"}</span>
                <Activity className="w-4 h-4 text-[#B91C1C]" />
              </div>
              <div className="text-2xl font-extrabold text-[#194B35]">
                {locations.filter(l => l.category === "health" || l.category === "education").length}
              </div>
              <div className="text-[11px] text-[#5C6A64] mt-0.5">{language === "ml" ? "സ്കൂളുകൾ & ഹോസ്പിറ്റൽ" : "Hospitals & Schools"}</div>
            </div>

            {/* Metric 6: Civic Resolutions */}
            <div className="bg-white p-4 rounded-2xl border border-[#EDE6D8] shadow-md hover:border-[#194B35] transition">
              <div className="flex items-center justify-between text-[#5C6A64] mb-1">
                <span className="text-xs font-semibold">{language === "ml" ? "സിവിക് കണക്ട്" : "Civic"}</span>
                <AlertTriangle className="w-4 h-4 text-[#EA580C]" />
              </div>
              <div className="text-2xl font-extrabold text-[#194B35]">{civicIssues.length}</div>
              <div className="text-[11px] text-[#5C6A64] mt-0.5">{language === "ml" ? "പൗര പ്രശ്നങ്ങൾ ലൈവ്" : "Civic Reports Live"}</div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. CENTRAL VISUAL EXPERIENCE: INTERACTIVE GIS MAP                         */}
        {/* ========================================================================= */}
        <section id="gis-map" ref={mapSectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#194B35]/10 text-[#194B35] text-xs font-bold mb-2">
                <Compass className="w-3.5 h-3.5" />
                <span>{language === "ml" ? "ലൈവ് ജി.ഐ.എസ് ഭൂപടം" : "Interactive Municipality GIS"}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#194B35] font-malayalam-heading">
                {language === "ml" ? "താനൂർ നഗരസഭാ സമഗ്ര മാപ്പ്" : "Tanur Municipality Master Map"}
              </h2>
              <p className="text-xs sm:text-sm text-[#5C6A64] mt-1 max-w-2xl">
                {language === "ml"
                  ? "സ്ഥാപനങ്ങളുടെ ലൊക്കേഷൻ, വികസന പദ്ധതികൾ, സിവിക് പ്രശ്നങ്ങൾ എന്നിവ നേരിട്ട് കണ്ടറിയാം. റൂട്ട് അറിയാൻ പിൻ ക്ലിക്ക് ചെയ്യുക."
                  : "Explore public facilities, active development project sites, and civic issue spots in real time. Click any pin to get instant directions."}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleLocateOnMap(10.9768, 75.8672)}
                className="px-4 py-2 bg-white text-[#194B35] border border-[#EDE6D8] rounded-xl text-xs font-bold hover:bg-[#FAF7F0] transition shadow-sm"
              >
                📍 {language === "ml" ? "ടൗൺ സെന്റർ" : "Town Center"}
              </button>
              <button
                onClick={() => handleLocateOnMap(10.9802, 75.8541)}
                className="px-4 py-2 bg-white text-[#194B35] border border-[#EDE6D8] rounded-xl text-xs font-bold hover:bg-[#FAF7F0] transition shadow-sm"
              >
                ⚓ {language === "ml" ? "ഹാർബർ & ബീച്ച്" : "Harbour & Beach"}
              </button>
            </div>
          </div>

          {/* Digital Tanur Leaflet Map Component */}
          <DigitalTanurMap
            locations={locations}
            localities={localities}
            projects={projects}
            civicIssues={civicIssues}
            selectedLocationId={selectedLocationId}
            onSelectLocation={(loc) => {
              if (loc) {
                setSelectedLocationId(loc.id);
              }
            }}
            language={language}
            focusCoordinates={mapFocusCoordinates}
          />
        </section>

        {/* ========================================================================= */}
        {/* 4. EXPLORE BY CATEGORY (8 MUNICIPAL CATEGORIES)                          */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-18">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#194B35] font-malayalam-heading">
                {language === "ml" ? "വിഭാഗങ്ങൾ അനുസരിച്ച് കണ്ടെത്തുക" : "Explore by Category"}
              </h2>
              <p className="text-xs sm:text-sm text-[#5C6A64] mt-0.5">
                {language === "ml" ? "നഗരസഭയിലെ 7 പ്രധാന സേവന മേഖലകൾ" : "7 Public Civic & Utility Sectors in Tanur"}
              </p>
            </div>
            {selectedCategory !== "all" && (
              <button
                onClick={() => setSelectedCategory("all")}
                className="text-xs font-bold text-[#194B35] hover:underline"
              >
                {language === "ml" ? "എല്ലാ വിഭാഗങ്ങളും കാണിക്കുക" : "Reset Filter"}
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {TANUR_LOCATION_CATEGORIES.filter((c) => c.key !== "business").map((cat) => {
              const isSelected = selectedCategory === cat.key;
              const count = locations.filter((l) => l.category === cat.key && !l.id.startsWith("loc-biz-")).length;
              return (
                <button
                  key={cat.key}
                  onClick={() => {
                    setSelectedCategory(cat.key as LocationCategoryKey);
                    // scroll to directory
                    const dirEl = document.getElementById("facilities-directory");
                    if (dirEl) dirEl.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`p-3.5 rounded-2xl text-left border transition flex flex-col justify-between ${
                    isSelected
                      ? "bg-[#194B35] text-white border-[#194B35] shadow-md shadow-[#194B35]/20 scale-[1.02]"
                      : "bg-white text-[#1A2420] border-[#EDE6D8] hover:border-[#C39A5B] hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-3">
                    <span className="p-2 rounded-xl" style={{ backgroundColor: isSelected ? "rgba(255,255,255,0.2)" : cat.bg }}>
                      {getCategoryIcon(cat.key)}
                    </span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${isSelected ? "bg-white/20 text-white" : "bg-neutral-100 text-[#5C6A64]"}`}>
                      {count}
                    </span>
                  </div>
                  <div>
                    <h3 className={`font-bold text-xs sm:text-sm font-malayalam-heading leading-tight ${isSelected ? "text-white" : "text-[#194B35]"}`}>
                      {language === "ml" ? cat.label_ml : cat.label}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. LOCALITY EXPLORER (8 VERIFIED TANUR LOCALITIES)                        */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-18">
          <div className="bg-gradient-to-r from-[#194B35]/5 via-[#C39A5B]/10 to-[#194B35]/5 p-6 sm:p-8 rounded-3xl border border-[#EDE6D8]">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#194B35] text-white text-xs font-bold mb-2">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{language === "ml" ? "പ്രദേശ ഡയറക്ടറി" : "Tanur Locality Profiles"}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#194B35] font-malayalam-heading">
                  {language === "ml" ? "നമ്മുടെ താനൂരിലെ പ്രധാന പ്രദേശങ്ങൾ" : "Explore Tanur Localities"}
                </h2>
                <p className="text-xs sm:text-sm text-[#5C6A64] mt-1 max-w-2xl">
                  {language === "ml"
                    ? "നഗരസഭയിലെ ഓരോ പ്രദേശത്തിന്റെയും ലാൻഡ്‌മാർക്കുകൾ, വാർഡുകൾ, ലഭ്യമായ സേവനങ്ങൾ എന്നിവ അറിയാം."
                    : "Authentic profiles of historic settlements, fishing hamlets, and emerging commerce hubs within Tanur Municipality."}
                </p>
              </div>

              {/* Locality Quick Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
                <button
                  onClick={() => setSelectedLocalityTab("all")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                    selectedLocalityTab === "all"
                      ? "bg-[#194B35] text-white"
                      : "bg-white text-[#5C6A64] border border-[#EDE6D8] hover:bg-neutral-50"
                  }`}
                >
                  {language === "ml" ? "എല്ലാം" : "All"} ({localities.length})
                </button>
                {localities.slice(0, 4).map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => setSelectedLocalityTab(loc.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition whitespace-nowrap ${
                      selectedLocalityTab === loc.id
                        ? "bg-[#194B35] text-white"
                        : "bg-white text-[#5C6A64] border border-[#EDE6D8] hover:bg-neutral-50"
                    }`}
                  >
                    {language === "ml" ? loc.name_ml : loc.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Localities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {localities
                .filter((loc) => selectedLocalityTab === "all" || loc.id === selectedLocalityTab)
                .map((loc) => (
                  <div
                    key={loc.id}
                    className="bg-white rounded-2xl border border-[#EDE6D8] p-5 shadow-sm hover:shadow-md hover:border-[#194B35] transition flex flex-col justify-between"
                  >
                    <div>
                      {/* Locality Header */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#194B35]/10 text-[#194B35]">
                          {language === "ml"
                            ? `വാർഡുകൾ: ${loc.ward_numbers.join(", ")}`
                            : `Wards: ${loc.ward_numbers.join(", ")}`}
                        </span>
                        <button
                          onClick={() => handleLocateOnMap(loc.latitude, loc.longitude)}
                          className="text-[11px] font-bold text-[#C39A5B] hover:text-[#194B35] flex items-center gap-1 transition"
                          title="Locate on GIS Map"
                        >
                          <Compass className="w-3.5 h-3.5" />
                          <span>{language === "ml" ? "മാപ്പിൽ കാണുക" : "Map"}</span>
                        </button>
                      </div>

                      <h3 className="font-bold text-base text-[#194B35] font-malayalam-heading">
                        {language === "ml" ? loc.name_ml : loc.name}
                      </h3>

                      <p className="text-[11px] font-semibold text-[#C39A5B] mt-0.5">
                        {language === "ml" ? loc.tagline_ml : loc.tagline}
                      </p>

                      <p className="text-xs text-[#5C6A64] mt-2 line-clamp-3 leading-relaxed">
                        {language === "ml" ? loc.description_ml : loc.description}
                      </p>

                      {/* Connected Civic & Development Modules */}
                      <div className="mt-3 pt-2.5 border-t border-[#EDE6D8] space-y-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                          {language === "ml" ? "ബന്ധപ്പെട്ട പദ്ധതികളും സേവനങ്ങളും" : "Connected Locality Data"}:
                        </span>
                        
                        {(() => {
                          const localProjects = projects.filter(p => 
                            (p.locality && (p.locality.toLowerCase().includes(loc.name.toLowerCase()) || p.locality.toLowerCase().includes(loc.name_ml))) || 
                            (p.ward_number ? loc.ward_numbers.includes(p.ward_number) : false)
                          );
                          const localIssues = civicIssues.filter(i => 
                            (i.location_name && i.location_name.toLowerCase().includes(loc.name.toLowerCase())) ||
                            (i.locality && (i.locality.toLowerCase().includes(loc.name.toLowerCase()) || i.locality.toLowerCase().includes(loc.name_ml))) ||
                            (i.address_landmark && i.address_landmark.toLowerCase().includes(loc.name.toLowerCase())) ||
                            (i.ward_number ? loc.ward_numbers.includes(i.ward_number) : false)
                          );

                          return (
                            <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                              {localProjects.length > 0 && (
                                <Link
                                  href={`/development/projects?search=${encodeURIComponent(loc.name)}`}
                                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold hover:bg-emerald-100 transition"
                                  title="View development projects in this locality"
                                >
                                  <HardHat className="w-3 h-3" />
                                  <span>{localProjects.length} {language === "ml" ? "വികസന പദ്ധതികൾ" : "Projects"}</span>
                                </Link>
                              )}

                              {localIssues.length > 0 && (
                                <Link
                                  href={`/civic/issues?search=${encodeURIComponent(loc.name)}`}
                                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 font-bold hover:bg-amber-100 transition"
                                  title="View civic issues in this locality"
                                >
                                  <AlertTriangle className="w-3 h-3" />
                                  <span>{localIssues.length} {language === "ml" ? "സിവിക് റിപ്പോർട്ടുകൾ" : "Issues"}</span>
                                </Link>
                              )}

                              <Link
                                href={`/peoples-voice/ideas/new?locality=${encodeURIComponent(loc.name)}`}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-200 font-semibold hover:bg-blue-100 transition"
                                title="Propose an idea for this locality"
                              >
                                <TrendingUp className="w-3 h-3" />
                                <span>{language === "ml" ? "ആശയം സമർപ്പിക്കാം" : "Suggest Idea"}</span>
                              </Link>
                            </div>
                          );
                        })()}
                      </div>

                      {/* Landmarks */}
                      <div className="mt-2.5 pt-2 border-t border-[#EDE6D8]">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#5C6A64] block mb-1">
                          {language === "ml" ? "പ്രധാന അടയാളങ്ങൾ" : "Key Landmarks"}:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {(language === "ml" ? loc.landmarks_ml : loc.landmarks).slice(0, 3).map((lm, idx) => (
                            <span key={idx} className="text-[10px] bg-[#FAF7F0] text-[#194B35] px-2 py-0.5 rounded-md border border-[#EDE6D8]">
                              {lm}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action */}
                    <div className="mt-4 pt-3 border-t border-[#EDE6D8]">
                      <button
                        onClick={() => handleLocateOnMap(loc.latitude, loc.longitude)}
                        className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-[#FAF7F0] hover:bg-[#194B35] hover:text-white text-[#194B35] rounded-xl text-xs font-bold transition border border-[#EDE6D8]"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        <span>{language === "ml" ? "മാപ്പിൽ കേന്ദ്രീകരിക്കുക" : "Focus on GIS Map"}</span>
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. PUBLIC FACILITIES DIRECTORY (SEARCHABLE & FILTERABLE)                  */}
        {/* ========================================================================= */}
        <section id="facilities-directory" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-18">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#194B35]/10 text-[#194B35] text-xs font-bold mb-2">
                <Building2 className="w-3.5 h-3.5" />
                <span>{language === "ml" ? "പൊതു സ്ഥാപന സൂചിക" : "Official Directory"}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#194B35] font-malayalam-heading">
                {language === "ml" ? "പൊതു സ്ഥാപനങ്ങൾ & സേവനങ്ങൾ" : "Public Facilities Directory"}
              </h2>
              <p className="text-xs sm:text-sm text-[#5C6A64] mt-1">
                {language === "ml"
                  ? "താനൂർ നഗരസഭയിലെ എല്ലാ സർക്കാർ ഓഫീസുകൾ, ആശുപത്രികൾ, സ്കൂളുകൾ എന്നിവയുടെ വിവരങ്ങൾ."
                  : "Verified addresses, emergency contacts, opening hours, and official web portals for Tanur."}
              </p>
            </div>

            {/* Search Input for Directory */}
            <div className="relative min-w-[260px] sm:min-w-[320px]">
              <Search className="w-4 h-4 text-[#5C6A64] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={directorySearch}
                onChange={(e) => setDirectorySearch(e.target.value)}
                placeholder={language === "ml" ? "സ്ഥാപനമോ സ്ഥലമോ തിരയുക..." : "Search institution by name, locality..."}
                className="w-full pl-9 pr-4 py-2 bg-white text-xs sm:text-sm text-[#1A2420] border border-[#EDE6D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#194B35]"
              />
            </div>
          </div>

          {/* Directory Count and Category Pills */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-[#5C6A64] font-semibold">
              {language === "ml"
                ? `${filteredDirectory.length} സ്ഥാപനങ്ങൾ കണ്ടെത്തി`
                : `Showing ${filteredDirectory.length} verified listings`}
            </span>

            {selectedCategory !== "all" && (
              <span className="inline-flex items-center gap-1 text-xs bg-[#194B35] text-white px-2.5 py-1 rounded-lg font-bold">
                <span>{selectedCategory}</span>
                <button onClick={() => setSelectedCategory("all")} className="hover:opacity-75">×</button>
              </span>
            )}
          </div>

          {/* Directory Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDirectory.map((loc) => {
              const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${loc.latitude},${loc.longitude}`;

              return (
                <div
                  key={loc.id}
                  className={`bg-white rounded-2xl border p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between ${
                    selectedLocationId === loc.id ? "border-[#194B35] ring-2 ring-[#194B35]/20" : "border-[#EDE6D8]"
                  }`}
                >
                  <div>
                    {/* Top Badges */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#194B35]/10 text-[#194B35]">
                        {language === "ml" ? loc.category_name_ml : loc.category_name}
                      </span>

                      {loc.is_verified ? (
                        <VerificationBadge
                          level="verified"
                          citation={loc.source_name}
                          compact
                          tooltipText={`Verified via ${loc.source_name} (${loc.last_verified_date})`}
                        />
                      ) : (
                        <VerificationBadge
                          level="partially_verified"
                          citation="Pending Document Verification"
                          compact
                        />
                      )}
                    </div>

                    <h3 className="font-bold text-base text-[#194B35] font-malayalam-heading">
                      {language === "ml" ? loc.name_ml : loc.name}
                    </h3>

                    <p className="text-xs text-[#5C6A64] mt-1 line-clamp-2">
                      {language === "ml" ? loc.description_ml : loc.description}
                    </p>

                    {/* Metadata details */}
                    <div className="mt-3.5 space-y-1.5 text-xs text-[#5C6A64]">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 truncate">
                          <MapPin className="w-3.5 h-3.5 text-[#C39A5B] shrink-0" />
                          <span className="truncate">
                            {language === "ml" ? (loc.locality_ml || loc.locality) : loc.locality}
                            {loc.ward_number ? ` (Ward ${loc.ward_number})` : ""}
                          </span>
                        </div>
                        <span className="text-[9px] font-mono text-[#7A8880] shrink-0 bg-neutral-100 px-1.5 py-0.5 rounded">
                          Approx Pin
                        </span>
                      </div>

                      {loc.opening_hours && (
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-[#194B35] shrink-0" />
                          <span className="truncate">{loc.opening_hours}</span>
                        </div>
                      )}

                      {/* Official Public Landline or Central Municipal Switchboard */}
                      {loc.phone && (
                        loc.phone.startsWith("0494") ||
                        loc.phone.startsWith("+91 494") ||
                        ["112", "101", "108", "1912", "1098", "1091"].includes(loc.phone.trim())
                      ) ? (
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-[#194B35] shrink-0" />
                          <a href={`tel:${loc.phone}`} className="text-[#194B35] font-bold hover:underline">
                            {loc.phone}
                          </a>
                          <span className="text-[10px] text-[#7A8880]">(Official Desk)</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-[11px] text-[#7A8880]">
                          <Phone className="w-3.5 h-3.5 text-[#C39A5B] shrink-0" />
                          <span>
                            {language === "ml" ? "കേന്ദ്ര സ്വിച്ച്ബോർഡ്:" : "Central Switchboard:"}{" "}
                            <a href="tel:04942440228" className="text-[#194B35] font-bold hover:underline">0494 2440228</a>
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Verification Source Attribution */}
                    <div className="mt-3 pt-2.5 border-t border-[#EDE6D8] text-[10px] text-[#5C6A64] flex items-center justify-between">
                      <span className="truncate">
                        Source: <strong>{loc.source_name}</strong>
                      </span>
                      <span>Verified: {loc.last_verified_date}</span>
                    </div>
                  </div>

                  {/* Actions: Directions + Focus on Map */}
                  <div className="mt-4 pt-3 border-t border-[#EDE6D8] flex items-center gap-2">
                    <button
                      onClick={() => handleLocateOnMap(loc.latitude, loc.longitude, loc.id)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-[#FAF7F0] text-[#194B35] hover:bg-[#194B35] hover:text-white rounded-xl text-xs font-bold border border-[#EDE6D8] transition"
                    >
                      <Compass className="w-3.5 h-3.5" />
                      <span>{language === "ml" ? "മാപ്പിൽ കാണുക" : "View on Map"}</span>
                    </button>

                    <a
                      href={directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1 py-2 px-3 bg-[#194B35] text-white rounded-xl text-xs font-bold hover:bg-[#123626] transition shadow-sm"
                      title="Google Maps Navigation"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{language === "ml" ? "റൂട്ട്" : "Directions"}</span>
                    </a>

                    {loc.website && (
                      <a
                        href={loc.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-[#FAF7F0] text-[#194B35] rounded-xl text-xs border border-[#EDE6D8] hover:bg-neutral-100 transition"
                        title="Official Portal"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. CONNECTED DEVELOPMENT TRACKER                                          */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-18">
          <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#EDE6D8]">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#C39A5B]/20 text-[#194B35] text-xs font-bold mb-2">
                  <HardHat className="w-3.5 h-3.5 text-[#C39A5B]" />
                  <span>{language === "ml" ? "നഗരസഭാ വികസന ട്രാക്കർ" : "Development Tracker"}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#194B35] font-malayalam-heading">
                  {language === "ml" ? "താനൂരിലെ പ്രധാന വികസന പദ്ധതികൾ" : "Major Development Projects"}
                </h2>
                <p className="text-xs sm:text-sm text-[#5C6A64] mt-1">
                  {language === "ml"
                    ? "നഗരസഭയിലെ 6 സുപ്രധാന പദ്ധതികളുടെ പുരോഗതി, ബജറ്റ്, ഔദ്യോഗിക ഗസറ്റ് വിവരങ്ങൾ."
                    : "Real-time municipal tracking of ₹86.60 Cr development works across Tanur."}
                </p>
              </div>

              <Link
                href="/tanur/development"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#194B35] text-white text-xs font-bold hover:bg-[#123626] transition shadow-sm self-start sm:self-auto"
              >
                <span>{language === "ml" ? "എല്ലാ പദ്ധതികളും കാണുക" : "View Dev Tracker"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.slice(0, 6).map((proj) => (
                <div
                  key={proj.id}
                  className="bg-[#FAF7F0] rounded-2xl border border-[#EDE6D8] p-4 flex flex-col justify-between hover:border-[#C39A5B] transition"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#194B35] text-white">
                        {language === "ml" ? proj.category_name_ml : proj.category_name}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                        {proj.status}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-[#194B35] font-malayalam-heading line-clamp-1">
                      {language === "ml" ? proj.title_ml : proj.title}
                    </h3>

                    <div className="mt-2 text-xs text-[#5C6A64]">
                      <span className="block text-[11px]">
                        {proj.status === "Completed"
                          ? (language === "ml" ? "ഓഡിറ്റ് ചെയ്ത ചെലവ്" : "Audited Final Expenditure")
                          : proj.status === "Proposed"
                          ? (language === "ml" ? "പ്രതീക്ഷിത അടങ്കൽ" : "Estimated Proposal Budget")
                          : (language === "ml" ? "അനുവദിച്ച സാങ്കേതിക വിഹിതം" : "Sanctioned Allocation")}
                      </span>
                      <strong className="text-sm text-[#194B35] font-bold">{proj.budget_sanctioned}</strong>
                    </div>

                    {/* Measurement Book Verification Status */}
                    <div className="mt-2.5 pt-2 border-t border-[#EDE6D8]/60 flex items-center justify-between">
                      {proj.status === "Completed" ? (
                        <VerificationBadge
                          level="verified"
                          citation="Final MB Audit"
                          compact
                          tooltipText="Expenditure & completion audited via certified completion certificate"
                        />
                      ) : (
                        <VerificationBadge
                          level="awaiting_verification"
                          citation="Measurement Book (MB) Entry Pending"
                          compact
                          tooltipText="On-site physical percentage withheld pending certified Measurement Book recordings"
                        />
                      )}
                      <span className="text-[10px] text-[#7A8880] font-medium">
                        {proj.progress_updates.length} {language === "ml" ? "രേഖകൾ" : "Milestones"}
                      </span>
                    </div>

                    <p className="text-[11px] text-[#5C6A64] mt-2 line-clamp-2">
                      {language === "ml" ? proj.description_ml : proj.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#EDE6D8] flex items-center justify-between">
                    <span className="text-[10px] text-[#5C6A64]">
                      {proj.official_source_name}
                    </span>
                    <Link
                      href={`/tanur/development/${proj.id}`}
                      className="text-xs font-bold text-[#194B35] hover:text-[#C39A5B] flex items-center gap-1 transition"
                    >
                      <span>{language === "ml" ? "വിശദാംശങ്ങൾ" : "Details"}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. CIVIC CONNECT & CITIZEN VOICE BANNER                                   */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-18">
          <div className="bg-gradient-to-r from-[#194B35] to-[#123626] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(#C39A5B_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />

            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#C39A5B] text-xs font-bold mb-3 border border-white/20">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{language === "ml" ? "പൗര പങ്കാളിത്തം • സിവിക് കണക്ട്" : "Civic Connect & Citizen Voice"}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-malayalam-heading">
                {language === "ml"
                  ? "താനൂരിലെ പ്രശ്നങ്ങൾ റിപ്പോർട്ട് ചെയ്യാം, പരിഹാരം ട്രാക്ക് ചെയ്യാം"
                  : "Report Local Issues, Track Municipal Action"}
              </h2>

              <p className="text-xs sm:text-sm text-[#EDE6D8] mt-2 leading-relaxed">
                {language === "ml"
                  ? "റോഡിലെ കുഴികൾ, തെരുവ് വിളക്കുകൾ, മാലിന്യ പ്രശ്നങ്ങൾ എന്നിവ നഗരസഭയുടെ ശ്രദ്ധയിൽപ്പെടുത്തുക. നിങ്ങളുടെ സ്വകാര്യത പൂർണ്ണമായി സംരക്ഷിക്കപ്പെടും."
                  : "Submit civic grievances with photos and location pins. Anonymous on the public map to ensure citizen privacy. Real-time updates on status."}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/civic/report"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C39A5B] text-[#194B35] font-bold text-xs sm:text-sm hover:bg-[#b0874a] transition shadow-md"
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>{language === "ml" ? "പുതിയ പരാതി നൽകുക" : "Report a Civic Issue"}</span>
                </Link>

                <Link
                  href="/civic/map"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition backdrop-blur-sm"
                >
                  <Compass className="w-4 h-4" />
                  <span>{language === "ml" ? "സിവിക് മാപ്പ് കാണുക" : "View Civic Map"}</span>
                </Link>

                <Link
                  href="/tanur/voice"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition backdrop-blur-sm"
                >
                  <Users className="w-4 h-4" />
                  <span>{language === "ml" ? "ജനകീയ ശബ്ദം" : "People's Voice"}</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Source Citations & GIS Transparency Disclaimer */}
        <DataSourcesNotice 
          language={language}
          title={language === "ml" ? "ഡിജിറ്റൽ താനൂർ ജി.ഐ.എസ് — വിവര സ്രോതസ്സും സുതാര്യതാ മാനദണ്ഡവും" : "Digital Tanur GIS — Verified Data Sources & Policy"}
          sources={[
            "Tanur Municipality Official Portal (tanurmunicipality.lsgkerala.gov.in)",
            "LSGD Delimitation Order & Ward Registry (lsgkerala.gov.in)",
            "Survey of India / Kerala State Spatial Data Infrastructure (KSDI)",
            "Official Landline Directory & Emergency Services Malappuram District",
          ]}
        />
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
