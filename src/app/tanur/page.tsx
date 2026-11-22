"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { TanurNav } from "@/components/tanur/TanurNav";
import {
  TANUR_CORE_FACTS,
  TANUR_PLACES,
  TANUR_HISTORY_TIMELINE,
  TANUR_CULTURE_ITEMS,
  TANUR_STORIES,
  TANUR_INSTITUTIONS,
  TANUR_BUSINESSES,
  TANUR_PUBLIC_SERVICES,
  TANUR_NEWS_DATA,
  TANUR_PHOTO_MANIFEST,
  TANUR_SOURCES,
} from "@/lib/data/tanurData";
import {
  digitalMunicipalityStore,
  TANUR_MUNICIPAL_WARDS
} from "@/lib/data/digitalMunicipalityData";
import {
  Compass,
  MapPin,
  Landmark,
  Waves,
  ArrowRight,
  Sparkles,
  Users,
  GraduationCap,
  Briefcase,
  Building2,
  Calendar,
  Share2,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Info,
  Clock,
  Phone,
  Search,
  HardHat,
  HeartHandshake,
  TrendingUp,
  Layers,
  Filter,
  ChevronRight,
  FileCheck2,
  Activity,
  AlertCircle
} from "lucide-react";
import dynamic from "next/dynamic";

// Dynamic import for Leaflet map
const CommunityMap = dynamic(
  () => import("@/components/map/CommunityMap").then((mod) => mod.CommunityMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-[320px] w-full rounded-2xl bg-[#EDE6D8] animate-pulse flex items-center justify-center text-xs text-[#5C6A64]">
        താനൂർ മാപ്പ് ലോഡ് ചെയ്യുന്നു... (Loading Tanur Map)
      </div>
    ),
  }
);

export default function TanurOverviewPage() {
  const [activeTab, setActiveTab] = useState<"all" | "places" | "history">("all");
  
  // Wards Explorer State
  const [wardSearch, setWardSearch] = useState("");
  const [selectedWardFilter, setSelectedWardFilter] = useState<"all" | "coastal" | "town" | "central">("all");
  
  // Development Projects & Citizen Voice
  const [devProjects] = useState(() => digitalMunicipalityStore.getProjects().slice(0, 4));
  const [proposals] = useState(() => digitalMunicipalityStore.getProposals().slice(0, 3));

  const filteredWards = useMemo(() => {
    return TANUR_MUNICIPAL_WARDS.filter((w) => {
      if (selectedWardFilter === "coastal") {
        if (!w.name.toLowerCase().includes("beach") && !w.name.toLowerCase().includes("theeradesham") && !w.name.toLowerCase().includes("harbour") && !w.name.toLowerCase().includes("fishermen")) {
          return false;
        }
      } else if (selectedWardFilter === "town") {
        if (!w.name.toLowerCase().includes("town") && !w.name.toLowerCase().includes("market") && !w.name.toLowerCase().includes("puthentheru") && !w.name.toLowerCase().includes("station")) {
          return false;
        }
      }
      if (wardSearch.trim()) {
        const q = wardSearch.toLowerCase();
        return (
          w.ward_number.toString() === q ||
          w.name.toLowerCase().includes(q) ||
          w.name_ml.toLowerCase().includes(q) ||
          w.key_localities.some(l => l.toLowerCase().includes(q)) ||
          w.key_localities_ml.some(l => l.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [wardSearch, selectedWardFilter]);

  const mapPlaces = TANUR_PLACES.map((p) => ({
    id: p.id,
    community_id: "40000000-0000-0000-0000-000000000007",
    name: p.name,
    name_ml: p.name_ml,
    category: p.category_ml,
    description: p.description,
    location_name: p.location,
    latitude: p.latitude,
    longitude: p.longitude,
    image_url: p.imageUrl,
    created_at: new Date().toISOString(),
  }));

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
      <Navbar />
      <TanurNav />

      <main className="flex-1 pb-16">
        {/* ========================================================================= */}
        {/* 1. HERO SECTION (Matching Image Reference: About Tanur / Our History)     */}
        {/* ========================================================================= */}
        <section className="relative min-h-[460px] sm:min-h-[520px] md:min-h-[580px] overflow-hidden flex items-end">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
            style={{
              backgroundImage: "url('/images/tanur-coastal-pride.jpg')",
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#081B12] via-[#0E2C1E]/80 to-black/35" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 w-full">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/25 text-amber-300 text-xs font-bold font-sans mb-4">
              <Compass className="w-3.5 h-3.5" />
              <span>Tanur Municipality • 45 Statutory Wards • Grade II ULB</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-sans text-white tracking-tight leading-tight max-w-4xl drop-shadow-md">
              About Tanur
            </h1>

            <p className="mt-2 text-xl sm:text-2xl font-bold text-[#F3CE7A] font-sans drop-shadow">
              Our History, Our Pride
            </p>

            <p className="mt-3 text-sm sm:text-base md:text-lg text-stone-200 font-sans max-w-3xl leading-relaxed drop-shadow">
              A historic coastal urban local body in Malappuram district, Kerala. Covering 19.59 km² across 45 statutory wards, Tanur blends centuries of maritime trade, cultural heritage, renowned fisheries traditions, and dynamic modern civic governance.
            </p>

            {/* Main Action Buttons */}
            <div className="mt-6 flex flex-wrap gap-3 pt-2">
              <a
                href="#wards"
                className="px-5 py-3 rounded-2xl bg-[#C39A5B] hover:bg-[#b0874a] text-[#143E2C] font-extrabold text-xs sm:text-sm font-sans transition shadow-xl active:scale-95 flex items-center gap-2 ring-2 ring-white/30"
              >
                <Compass className="w-4 h-4 text-[#143E2C]" />
                <span>Explore 45 Wards</span>
              </a>

              <Link
                href="/digital-tanur"
                className="px-5 py-3 rounded-2xl bg-[#1B4D36] hover:bg-[#143d2b] border border-amber-300/40 text-white font-bold text-xs sm:text-sm font-sans transition shadow-lg active:scale-95 flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-amber-300" />
                <span>Digital Tanur GIS</span>
              </Link>

              <Link
                href="/development-tracker"
                className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-[#143E2C] font-bold text-xs sm:text-sm font-sans transition shadow-lg active:scale-95 flex items-center gap-2"
              >
                <HardHat className="w-4 h-4" />
                <span>Track Projects</span>
              </Link>

              <Link
                href="/civic-connect"
                className="px-5 py-3 rounded-2xl bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/25 text-white font-bold text-xs sm:text-sm font-sans transition active:scale-95 flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 text-amber-200" />
                <span>Civic Connect</span>
              </Link>
            </div>

            {/* Photo Attribution Pill */}
            <div className="mt-6 pt-3 border-t border-white/15 flex items-center justify-between text-[11px] text-stone-300">
              <span className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-amber-300" />
                Photo: Tanur Coastal Waterfront & Heritage (OUR NATION Verified Archive)
              </span>
              <span className="hidden sm:inline-block font-mono">PIN: 676302 • Central Switchboard: 0494 2440228</span>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* FLAGSHIP BANNER: DIGITAL TANUR GIS EXPERIENCE                             */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
          <div className="bg-gradient-to-r from-[#194B35] via-[#123626] to-[#194B35] rounded-3xl p-6 sm:p-7 text-white shadow-xl border border-[#C39A5B]/30 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#C39A5B] text-[#194B35] flex items-center justify-center shrink-0 shadow-lg">
                <Compass className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#C39A5B] text-[#194B35]">
                    Interactive Map
                  </span>
                  <span className="text-xs text-[#FAF7F0]/80">45 Statutory Wards • 48+ Mapped Facilities • 19.59 km²</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-sans text-white">
                  Digital Tanur Live GIS Map
                </h3>
                <p className="text-xs text-[#EDE6D8] mt-0.5 max-w-xl">
                  Explore healthcare centres, schools, government offices, developmental projects, and all 45 municipal ward boundaries.
                </p>
              </div>
            </div>

            <Link
              href="/digital-tanur"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#C39A5B] hover:bg-[#b0874a] text-[#194B35] font-extrabold text-sm transition shadow-md shrink-0 whitespace-nowrap"
            >
              <span>Open GIS Map</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. THE THREE PILLARS GATEWAY SHOWCASE */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Pillar A: Connected Tanur */}
            <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 shadow-card hover:shadow-lg transition flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#E8F2EC] text-[#1B4D36] flex items-center justify-center font-bold">
                  <Compass className="w-6 h-6" />
                </div>
                <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E8F2EC] text-[#1B4D36] uppercase">
                  പില്ലർ എ • Pillar A
                </div>
                <h3 className="text-xl font-bold font-malayalam-serif text-[#1B4D36]">
                  കണക്റ്റഡ് താനൂർ (Connected Tanur)
                </h3>
                <p className="text-xs text-[#5C6A64] font-malayalam-body leading-relaxed">
                  നാട്ടിലെ ആളുകൾ, വ്യാപാരികൾ, സ്ഥാപനങ്ങൾ, വാർത്തകൾ, പ്രൊഫഷണൽ സേവനങ്ങൾ എന്നിവയെല്ലാം ഒരൊറ്റ വേദിയിൽ സംയോജിപ്പിക്കുന്ന സമ്പൂർണ്ണ ഡിജിറ്റൽ നെറ്റ്വർക്ക്.
                </p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  <span className="text-[10px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-bold">45 വാർഡുകൾ</span>
                  <span className="text-[10px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-bold">സ്മാർട്ട് ന്യൂസ്‌റൂം</span>
                  <span className="text-[10px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-bold">സേവന വിദഗ്ദ്ധർ</span>
                  <span className="text-[10px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-bold">മാപ്പ്</span>
                </div>
              </div>
              <a
                href="#wards"
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-[#1B4D36] hover:underline"
              >
                <span>വാർഡുകളും സേവനങ്ങളും പര്യവേക്ഷണം ചെയ്യാം</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Pillar B: Transparent Tanur */}
            <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 shadow-card hover:shadow-lg transition flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold border border-amber-200">
                  <HardHat className="w-6 h-6" />
                </div>
                <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 uppercase">
                  പില്ലർ ബി • Pillar B
                </div>
                <h3 className="text-xl font-bold font-malayalam-serif text-amber-900">
                  സുതാര്യ താനൂർ (Transparent Tanur)
                </h3>
                <p className="text-xs text-[#5C6A64] font-malayalam-body leading-relaxed">
                  നഗരസഭയിലെ വികസന പദ്ധതികൾ, അനുവദിച്ച ബജറ്റ്, നിർവ്വഹണ ഏജൻസി, ഔദ്യോഗിക ഉത്തരവുകൾ, സിവിക് പ്രശ്ന പരിഹാരങ്ങൾ എന്നിവയെല്ലാം പൂർണ്ണ സുതാര്യതയോടെ പൊതുസമക്ഷം.
                </p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  <span className="text-[10px] bg-amber-50 text-amber-800 px-2 py-0.5 rounded font-bold">₹86.60 Cr ബജറ്റ് രേഖകൾ</span>
                  <span className="text-[10px] bg-amber-50 text-amber-800 px-2 py-0.5 rounded font-bold">സിവിക് കണക്ട്</span>
                  <span className="text-[10px] bg-amber-50 text-amber-800 px-2 py-0.5 rounded font-bold">ഔദ്യോഗിക തെളിവുകൾ</span>
                </div>
              </div>
              <Link
                href="/tanur/development"
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:underline"
              >
                <span>വികസന പദ്ധതി ട്രാക്കർ പരിശോധിക്കുക</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Pillar C: People-Powered Tanur */}
            <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 shadow-card hover:shadow-lg transition flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-800 flex items-center justify-center font-bold border border-blue-200">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-900 uppercase">
                  പില്ലർ സി • Pillar C
                </div>
                <h3 className="text-xl font-bold font-malayalam-serif text-blue-900">
                  ജനകീയ താനൂർ (People-Powered)
                </h3>
                <p className="text-xs text-[#5C6A64] font-malayalam-body leading-relaxed">
                  താനൂരിന്റെ ഭാവി രൂപപ്പെടുത്താൻ പൗരന്മാർക്ക് നേരിട്ട് വോട്ടും നിർദ്ദേശങ്ങളും നൽകാം. വാർഡുകളിലെ ആവശ്യങ്ങൾ നിർദ്ദേശിച്ച് പിന്തുണ നേടാനും ആലോചനകളിൽ പങ്കെടുക്കാനും അവസരം.
                </p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  <span className="text-[10px] bg-blue-50 text-blue-800 px-2 py-0.5 rounded font-bold">ജനകീയ ശബ്ദം</span>
                  <span className="text-[10px] bg-blue-50 text-blue-800 px-2 py-0.5 rounded font-bold">കമ്യൂണിറ്റി വോട്ടിംഗ്</span>
                  <span className="text-[10px] bg-blue-50 text-blue-800 px-2 py-0.5 rounded font-bold">പൗര നിർദ്ദേശങ്ങൾ</span>
                </div>
              </div>
              <Link
                href="/tanur/voice"
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-blue-800 hover:underline"
              >
                <span>നിങ്ങളുടെ നിർദ്ദേശങ്ങൾ സമർപ്പിക്കാം</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. INTERACTIVE 45 WARDS DIRECTORY & EXPLORER */}
        {/* ========================================================================= */}
        <section id="wards" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-20 scroll-mt-24">
          <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-8 shadow-card space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#B87A1E] font-malayalam-body flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  മുനിസിപ്പൽ ഡിവിഷനുകൾ
                </span>
                <h2 className="text-2xl sm:text-3xl font-black font-malayalam-heading text-[#1B4D36] mt-1">
                  താനൂർ നഗരസഭയിലെ 45 വാർഡുകൾ
                </h2>
                <p className="text-xs text-[#5C6A64] font-malayalam-body mt-1 max-w-2xl leading-relaxed">
                  നഗരസഭയുടെ 45 വാർഡുകളിലെയും ഔദ്യോഗിക പേര്, പ്രധാന പ്രദേശങ്ങൾ, വാർഡ് കൗൺസിലർ വിവരങ്ങൾ, നടക്കുന്ന വികസന പദ്ധതികൾ എന്നിവ താഴെ പരിശോധിക്കാം.
                </p>
              </div>

              {/* Ward Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto text-xs shrink-0">
                {(["all", "coastal", "town"] as const).map(f => (
                  <button
                    key={f}
                    onClick={() => setSelectedWardFilter(f)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap ${
                      selectedWardFilter === f
                        ? "bg-[#194B35] text-white shadow-xs"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {f === "all" ? "എല്ലാ 45 വാർഡുകളും" :
                     f === "coastal" ? "തീരദേശ വാർഡുകൾ" : "ടൗൺ വാർഡുകൾ"}
                  </button>
                ))}
              </div>
            </div>

            {/* Ward Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={wardSearch}
                onChange={(e) => setWardSearch(e.target.value)}
                placeholder="വാർഡ് നമ്പർ, പേര്, പ്രദേശം (ഉദാ: വാർഡ് 4, ഹാർബർ, രായിരിമംഗലം) തിരയുക..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#194B35] outline-none"
              />
            </div>

            {/* Wards Grid (Displaying all matched wards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-h-[500px] overflow-y-auto pr-1">
              {filteredWards.map((ward) => (
                <div
                  key={ward.id}
                  className="bg-[#FAF7F0] p-4 rounded-2xl border border-[#EDE6D8] hover:border-[#194B35]/40 transition space-y-2.5 shadow-2xs flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="w-7 h-7 rounded-lg bg-[#194B35] text-white text-xs font-black flex items-center justify-center">
                        {ward.ward_number}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-gray-500">
                        ~{ward.population_approx} residents
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-[#194B35] leading-snug">
                      {ward.name_ml}
                    </h4>
                    <p className="text-[11px] text-gray-500">
                      {ward.name}
                    </p>

                    <div className="text-[11px] text-gray-700 pt-1 line-clamp-2">
                      <strong className="text-gray-900">പ്രധാന മേഖലകൾ: </strong>
                      {ward.key_localities_ml.join(", ")}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#EDE6D8] flex items-center justify-between text-[11px]">
                    <span className="text-amber-800 font-bold flex items-center gap-1">
                      <HardHat className="w-3 h-3" />
                      {ward.active_projects_count} പദ്ധതികൾ
                    </span>

                    <Link
                      href={`/tanur/development?ward=${ward.ward_number}`}
                      className="text-[#194B35] font-bold hover:underline flex items-center gap-0.5"
                    >
                      <span>പദ്ധതികൾ</span>
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-right text-[11px] text-gray-400">
              ലഭ്യമായ വാർഡുകൾ: {filteredWards.length} / 45 വാർഡുകൾ
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. TRANSPARENT DEVELOPMENT TRACKER SPOTLIGHT */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 font-malayalam-body flex items-center gap-1">
                <HardHat className="w-3.5 h-3.5" />
                സുതാര്യ താനൂർ • വികസന മുന്നേറ്റങ്ങൾ
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-malayalam-heading text-[#1B4D36] mt-1">
                പ്രധാന സർക്കാർ വികസന പദ്ധതികൾ
              </h2>
            </div>
            <Link
              href="/tanur/development"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B4D36] hover:text-[#B87A1E] transition"
            >
              <span>എല്ലാ വികസന പദ്ധതികളും കാണാം</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {devProjects.map((proj) => (
              <div
                key={proj.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-36 w-full bg-gray-100">
                    <img src={proj.project_image} alt={proj.title} className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#194B35] text-white">
                      {proj.status}
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <span className="text-[10px] font-bold text-amber-700 uppercase block">
                      {proj.budget_sanctioned}
                    </span>
                    <h4 className="font-bold text-sm text-gray-900 leading-snug line-clamp-2">
                      {proj.title_ml}
                    </h4>
                    <p className="text-[11px] text-gray-500 line-clamp-2">
                      {proj.department_ml}
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-gray-400">Verified</span>
                  <Link
                    href={`/tanur/development/${proj.id}`}
                    className="text-[#194B35] font-bold hover:underline flex items-center gap-0.5"
                  >
                    <span>വിശദാംശങ്ങൾ</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. CENSUS 2011 & ADMINISTRATIVE DISTINCTION */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-8 shadow-card">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#B87A1E] font-malayalam-body">
                  ഭൂമിശാസ്ത്രപരമായ തനിമ
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-malayalam-serif text-[#1B4D36] mt-1 mb-4">
                  താനൂർ നഗരസഭ — ചരിത്രവും അതിരുകളും
                </h2>
                <div className="space-y-4 text-xs sm:text-sm text-[#3E4D45] font-malayalam-body leading-relaxed">
                  <p>
                    മലപ്പുറം ജില്ലയിലെ പ്രധാന തീരദേശ നഗരസഭയാണ് താനൂർ (താനൂർ നഗരസഭ). അറബിക്കടലിന്റെ തീരത്ത് തിരൂരിനും പരപ്പനങ്ങാടിക്കുമിടയിലായി സ്ഥിതി ചെയ്യുന്ന ഈ ചരിത്ര നഗരം, സാമൂതിരി ഭരണകാലം മുതൽക്കേ അറിയപ്പെടുന്ന സുപ്രധാന തുറമുഖവും വ്യാപാര കേന്ദ്രവുമായിരുന്നു.
                  </p>
                  <p>
                    ഇന്ന് മലബാറിലെ പ്രധാന മത്സ്യബന്ധന തുറമുഖങ്ങളിലൊന്നായ താനൂർ, പരമ്പരാഗത മത്സ്യത്തൊഴിലാളി ജീവിതവും, ഇസ്ലാഹുൽ ഉലൂം അറബിക് കോളേജ് അടക്കമുള്ള വിജ്ഞാന കേന്ദ്രങ്ങളും, കേരളാദിത്യപുരം ശ്രീകൃഷ്ണ ക്ഷേത്രവും, ശോഭാപറമ്പ് ഭഗവതി ക്ഷേത്രവും ഒത്തുചേരുന്ന സാംസ്കാരിക കേന്ദ്രമാണ്.
                  </p>
                </div>

                {/* Administrative Distinction Callout */}
                <div className="mt-6 p-4 rounded-2xl bg-[#E8F2EC] border border-[#C5DEC8] text-xs font-malayalam-body text-[#1B4D36] space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-sm">
                    <ShieldCheck className="w-4 h-4 text-[#1B4D36]" />
                    <span>ഭരണപരമായ വ്യത്യാസം (Administrative Distinction):</span>
                  </div>
                  <p className="text-[12px] text-[#2D5A43] leading-relaxed">
                    <strong>താനൂർ നഗരസഭ (Tanur Municipality)</strong> എന്നത് 19.59 ച.കി.മീ വിസ്തൃതിയും 45 വാർഡുകളുമുള്ള നഗര ഭരണ സംവിധാനമാണ്. ഇത് സമീപത്തെ ഗ്രാമീണ പഞ്ചായത്തുകൾ (ഒഴൂർ, പൊന്മമുണ്ടം, താനാളൂർ, നിറമരുതൂർ, ചെറിയമുണ്ടം) ഉൾപ്പെടുന്ന <strong>താനൂർ ബ്ലോക്ക് പഞ്ചായത്തുമായി (Block Panchayat)</strong> വേറിട്ടുനിൽക്കുന്നു. രണ്ടിന്റെയും കണക്കുകൾ കൂട്ടിക്കലർത്തരുത്.
                  </p>
                </div>

                {/* MLA & Legislative Representation Callout */}
                <div className="mt-4 p-4.5 rounded-2xl bg-white border border-[#EAE4D7] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-malayalam-body">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#E0F1E7] text-[#1B4D36] flex items-center justify-center shrink-0">
                      <Landmark className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm text-[#1B4D36]">പി. കെ. നവാസ് (P. K. Navas MLA)</span>
                        <span className="text-[10px] bg-[#E0F1E7] text-[#1B4D36] font-bold px-2 py-0.5 rounded-full">താനൂർ എം.എൽ.എ</span>
                      </div>
                      <p className="text-xs text-[#5C6A64] mt-0.5">
                        പതിനാറാം കേരള നിയമസഭാംഗം • താനൂർ നിയമസഭാ മണ്ഡലം (LAC 044)
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/politics/pk-navas"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FAF7F0] hover:bg-[#1B4D36] hover:text-white text-[#1B4D36] border border-[#DDD5C5] text-xs font-bold transition shrink-0 self-start sm:self-auto"
                  >
                    <span>ജനപ്രതിനിധി പ്രൊഫൈൽ</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Geographic Highlights Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                <div className="bg-white p-4 rounded-2xl border border-[#EDE6D8] shadow-sm text-center">
                  <div className="text-xl font-black text-[#1B4D36] font-malayalam-heading">9 കി.മീ</div>
                  <div className="text-[11px] text-[#5C6A64] font-malayalam-body mt-0.5">തിരൂരിൽ നിന്ന് വടക്ക്</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-[#EDE6D8] shadow-sm text-center">
                  <div className="text-xl font-black text-[#1B4D36] font-malayalam-heading">9 കി.മീ</div>
                  <div className="text-[11px] text-[#5C6A64] font-malayalam-body mt-0.5">പരപ്പനങ്ങാടിയിൽ നിന്ന് തെക്ക്</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-[#EDE6D8] shadow-sm text-center">
                  <div className="text-xl font-black text-[#1B4D36] font-malayalam-heading">പൂരപ്പുഴ</div>
                  <div className="text-[11px] text-[#5C6A64] font-malayalam-body mt-0.5">അറബിക്കടൽ അഴിമുഖം</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-[#EDE6D8] shadow-sm text-center">
                  <div className="text-xl font-black text-[#1B4D36] font-malayalam-heading">TA</div>
                  <div className="text-[11px] text-[#5C6A64] font-malayalam-body mt-0.5">റെയിൽവേ സ്റ്റേഷൻ കോഡ്</div>
                </div>
              </div>
            </div>

            {/* Right Column: Census 2011 Official Statistics Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-gradient-to-br from-[#1B4D36] to-[#0D2E1F] rounded-3xl p-6 sm:p-8 text-white shadow-card relative overflow-hidden">
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-[11px] font-bold mb-3">
                    <Info className="w-3.5 h-3.5" />
                    <span>2011 സെൻസസ് ഔദ്യോഗിക കണക്കുകൾ</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-malayalam-serif mb-1">
                    താനൂർ നഗരസഭ സ്ഥിതിവിവരക്കണക്കുകൾ
                  </h3>
                  <p className="text-xs text-stone-300 font-malayalam-body mb-6">
                    ഡയറക്ടറേറ്റ് ഓഫ് സെൻസസ് ഓപ്പറേഷൻസ് പ്രസിദ്ധീകരിച്ച ഔദ്യോഗിക 2011 കണക്കുകൾ. (ഇപ്പോഴത്തെ ജനസംഖ്യയായി തെറ്റിദ്ധരിക്കരുത്).
                  </p>

                  <div className="space-y-3 font-malayalam-body">
                    <div className="flex justify-between items-center py-2 border-b border-white/15">
                      <span className="text-stone-300 text-xs">വിസ്തീർണ്ണം (Area)</span>
                      <span className="font-bold text-white text-sm font-mono">{TANUR_CORE_FACTS.census2011.areaKm2}</span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-white/15">
                      <span className="text-stone-300 text-xs">മുനിസിപ്പൽ വാർഡുകൾ (Wards)</span>
                      <span className="font-bold text-amber-300 text-sm font-mono">{TANUR_CORE_FACTS.census2011.electoralWards} ഡിവിഷനുകൾ</span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-white/15">
                      <span className="text-stone-300 text-xs">ആകെ ജനസംഖ്യ (Total Population)</span>
                      <span className="font-bold text-white text-base font-mono">{TANUR_CORE_FACTS.census2011.totalPopulation}</span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-white/15">
                      <span className="text-stone-300 text-xs">പുരുഷന്മാർ / സ്ത്രീകൾ</span>
                      <span className="font-bold text-white text-xs font-mono">
                        {TANUR_CORE_FACTS.census2011.malePopulation} / {TANUR_CORE_FACTS.census2011.femalePopulation}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-white/15">
                      <span className="text-stone-300 text-xs">വീടുകൾ (Households)</span>
                      <span className="font-bold text-white text-sm font-mono">{TANUR_CORE_FACTS.census2011.households}</span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-white/15">
                      <span className="text-stone-300 text-xs">സാക്ഷരതാ നിരക്ക് (Literacy Rate)</span>
                      <span className="font-bold text-amber-300 text-sm font-mono">{TANUR_CORE_FACTS.census2011.literacyRate}</span>
                    </div>

                    <div className="flex justify-between items-center py-2">
                      <span className="text-stone-300 text-xs">സ്ത്രീ-പുരുഷ അനുപാതം (Sex Ratio)</span>
                      <span className="font-bold text-white text-xs font-mono">{TANUR_CORE_FACTS.census2011.sexRatio}</span>
                    </div>
                  </div>

                  <div className="mt-5 p-3 rounded-xl bg-white/10 text-[10px] text-stone-300 font-malayalam-body leading-tight">
                    ഉറവിടം: Census of India 2011, District Census Handbook Malappuram & Tanur Municipality Portal.
                  </div>
                </div>
              </div>

              {/* Etymology Card */}
              <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 shadow-card">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#B87A1E]">
                  പേരിന്റെ ഉത്ഭവം (Etymology)
                </span>
                <h4 className="text-base font-bold font-malayalam-serif text-[#1B4D36] mt-1 mb-2">
                  &ldquo;താന്നി&rdquo; മരങ്ങളുടെ ഊര് — താനൂർ
                </h4>
                <p className="text-xs text-[#5C6A64] font-malayalam-body leading-relaxed">
                  {TANUR_CORE_FACTS.etymology.explanation}
                </p>
                <div className="mt-3 text-[11px] text-[#7A8880] italic">
                  (Botanical: Terminalia bellirica / Bastard Myrobalan tree)
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. IMPORTANT PLACES & LANDMARKS */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#B87A1E] font-malayalam-body">
                പ്രധാന സ്ഥലങ്ങൾ
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-malayalam-heading text-[#1B4D36] mt-1">
                താനൂരിലെ പ്രമുഖ അടയാളങ്ങളും കാഴ്ചകളും
              </h2>
            </div>
            <Link
              href="/tanur/places"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B4D36] hover:text-[#B87A1E] transition"
            >
              <span>എല്ലാ 14 സ്ഥലങ്ങളും കാണാം</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TANUR_PLACES.slice(0, 6).map((place) => (
              <div
                key={place.id}
                className="bg-white rounded-3xl border border-[#EDE6D8] overflow-hidden shadow-card hover:shadow-lg transition-all duration-300 flex flex-col group"
              >
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-stone-200">
                  <img
                    src={place.imageUrl}
                    alt={place.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[11px] font-bold text-[#1B4D36]">
                    {place.category_ml}
                  </div>
                  {place.isNearby && (
                    <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-bold">
                      അയൽ പ്രദേശം
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="text-base sm:text-lg font-bold font-malayalam-heading leading-tight drop-shadow">
                      {place.name_ml}
                    </h3>
                    <div className="text-[11px] text-stone-200">{place.name}</div>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <p className="text-xs text-[#5C6A64] font-malayalam-body line-clamp-3 leading-relaxed">
                    {place.description_ml}
                  </p>
                  <div className="pt-3 border-t border-[#F0EBE0] flex items-center justify-between text-xs text-[#7A8880]">
                    <span className="flex items-center gap-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#1B4D36]" />
                      <span className="truncate max-w-[170px]">{place.location_ml}</span>
                    </span>
                    <Link
                      href={`/tanur/places#${place.id}`}
                      className="font-bold text-[#1B4D36] hover:underline flex items-center gap-1 text-[11px]"
                    >
                      വിശദാംശങ്ങൾ
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. TANUR COMMUNITY MAP OVERVIEW */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-20">
          <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-8 shadow-card">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#B87A1E] font-malayalam-body">
                  ഭൂമിശാസ്ത്രം & ലൊക്കേഷൻ
                </span>
                <h3 className="text-xl sm:text-2xl font-black font-malayalam-heading text-[#1B4D36] mt-0.5">
                  താനൂർ സംവേദനാത്മക മാപ്പ് (Tanur Interactive Map)
                </h3>
                <p className="text-xs text-[#5C6A64] font-malayalam-body mt-0.5">
                  താനൂർ ബീച്ച്, ഫിഷിംഗ് ഹാർബർ, കേരളാദിത്യപുരം ക്ഷേത്രം, ഇസ്ലാഹുൽ ഉലൂം കാമ്പസ് എന്നിവ മാപ്പിൽ കാണാം
                </p>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E8F2EC] text-[#1B4D36] text-xs font-bold shrink-0">
                <MapPin className="w-3.5 h-3.5" />
                <span>10.9768° N, 75.8675° E</span>
              </div>
            </div>

            <CommunityMap
              centerLat={10.9768}
              centerLng={75.8675}
              zoom={13}
              places={mapPlaces}
              className="h-[360px] w-full rounded-2xl border border-[#EDE6D8]"
            />
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. MUNICIPAL GOVERNANCE & CITIZEN CHARTER */}
        {/* ========================================================================= */}
        <section id="governance" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-20">
          <div className="bg-gradient-to-r from-[#143E2C] to-[#194B35] rounded-3xl p-6 sm:p-10 text-white shadow-xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-white/15 pb-8 mb-8">
              <div className="space-y-1.5 max-w-xl">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-[#143E2C]">
                  മുനിസിപ്പൽ ഭരണസമിതി & പബ്ലിക് ഇൻഫർമേഷൻ
                </span>
                <h3 className="text-2xl sm:text-3xl font-black font-malayalam-heading text-white">
                  താനൂർ നഗരസഭാ കാര്യാലയം (Municipal Office)
                </h3>
                <p className="text-xs text-white/80 leading-relaxed font-malayalam-body">
                  താനൂർ ടൗൺ ബസ് സ്റ്റാൻഡിന് സമീപം സ്ഥിതി ചെയ്യുന്ന നഗരസഭാ കാര്യാലയം 45 വാർഡുകളിലെയും പൗര സേവനങ്ങൾ, സിവിൽ രജിസ്ട്രേഷൻ, ബിൽഡിംഗ് പെർമിറ്റ്, നികുതി പിരിവ് എന്നിവ കൈകാര്യം ചെയ്യുന്നു.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
                <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-xl border border-white/20">
                  <span className="text-[10px] text-white/70 block uppercase font-bold">ഹെൽപ്പ്‌ലൈൻ / ഫോൺ</span>
                  <span className="text-base font-black text-amber-300 font-mono">0494 2440228</span>
                </div>
                <a
                  href="https://tanurmunicipality.lsgkerala.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 bg-amber-400 hover:bg-amber-300 text-[#143E2C] rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                >
                  <span>LSGD ഔദ്യോഗിക പോർട്ടൽ</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-malayalam-body">
              <div className="bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-white/10 space-y-1">
                <span className="text-amber-300 font-bold block text-[11px] uppercase">മുനിസിപ്പൽ സെക്രട്ടറി</span>
                <p className="text-white font-bold text-sm">സെക്രട്ടറി കാര്യാലയം</p>
                <p className="text-white/70 text-[11px]">ഭരണപരമായ ചുമതലകൾ & കൗൺസിൽ രേഖകൾ</p>
              </div>

              <div className="bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-white/10 space-y-1">
                <span className="text-amber-300 font-bold block text-[11px] uppercase">എൻജിനീയറിംഗ് വിഭാഗം</span>
                <p className="text-white font-bold text-sm">മുനിസിപ്പൽ എൻജിനീയർ</p>
                <p className="text-white/70 text-[11px]">റോഡുകൾ, പാലങ്ങൾ & പൊതുമരാമത്ത്</p>
              </div>

              <div className="bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-white/10 space-y-1">
                <span className="text-amber-300 font-bold block text-[11px] uppercase">ആരോഗ്യ വിഭാഗം</span>
                <p className="text-white font-bold text-sm">ഹെൽത്ത് ഇൻസ്പെക്ടർ</p>
                <p className="text-white/70 text-[11px]">മാലിന്യ നിർമ്മാർജ്ജനം & പൊതുജനാരോഗ്യം</p>
              </div>

              <div className="bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-white/10 space-y-1">
                <span className="text-amber-300 font-bold block text-[11px] uppercase">റെവന്യൂ വിഭാഗം</span>
                <p className="text-white font-bold text-sm">റെവന്യൂ ഓഫീസർ</p>
                <p className="text-white/70 text-[11px]">കെട്ടിടനികുതി, ലൈസൻസ് & നികുതി സേവനങ്ങൾ</p>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
