"use client";

import React, { useState } from "react";
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
        {/* 1. HERO SECTION (Exact requested headline & subtitle) */}
        {/* ========================================================================= */}
        <section className="relative min-h-[460px] sm:min-h-[520px] md:min-h-[580px] overflow-hidden flex items-end">
          {/* Authentic High-Res Background Image: Tanur Beach at Sunset (Wikimedia Commons) */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
            style={{
              backgroundImage:
                "url('https://upload.wikimedia.org/wikipedia/commons/d/d1/Tanur_beach%2C_Malappuram_%289%29.jpg')",
            }}
          />

          {/* Deep Green, Golden Sunset & Vignette Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#081B12] via-[#0E2C1E]/80 to-black/35" />

          {/* Ornamental subtle background pattern */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)",
              backgroundSize: "28px 28px",
            }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-10 sm:pb-14 text-white">
            {/* Breadcrumb & Official Badges */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-amber-200/90 mb-3">
              <Link href="/" className="hover:underline">
                ഹോം
              </Link>
              <span>/</span>
              <span className="text-white">മലപ്പുറം ജില്ല</span>
              <span>/</span>
              <span className="text-amber-300 font-bold">താനൂർ നഗരസഭ</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-bold text-amber-300 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ഡിജിറ്റൽ കമ്മ്യൂണിറ്റി പ്രൊഫൈൽ • Malabar Coast</span>
            </div>

            {/* Requested Hero Title */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-malayalam-heading tracking-tight leading-tight drop-shadow-md">
              താനൂർ — കടലിന്റെ കഥ പറയുന്ന നമ്മുടെ നാട്.
            </h1>

            {/* Requested Subtitle */}
            <p className="mt-3 text-sm sm:text-lg md:text-xl text-stone-200 font-malayalam-body max-w-3xl leading-relaxed drop-shadow">
              ചരിത്രവും സംസ്കാരവും കടലോര ജീവിതവും നാട്ടുകാരുടെ വിശേഷങ്ങളും ഒരുമിക്കുന്ന ഇടം.
            </p>

            {/* Main Action Buttons */}
            <div className="mt-6 flex flex-wrap gap-3 pt-2">
              <Link
                href="/tanur/places"
                className="px-5 py-3 rounded-2xl bg-[#1B4D36] hover:bg-[#143d2b] border border-amber-300/40 text-white font-bold text-xs sm:text-sm font-malayalam-heading transition shadow-lg active:scale-95 flex items-center gap-2"
              >
                <Compass className="w-4 h-4 text-amber-300" />
                <span>സ്ഥലങ്ങൾ കാണാം (Explore Places)</span>
              </Link>

              <Link
                href="/tanur/history"
                className="px-5 py-3 rounded-2xl bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/25 text-white font-bold text-xs sm:text-sm font-malayalam-heading transition active:scale-95 flex items-center gap-2"
              >
                <Landmark className="w-4 h-4 text-amber-200" />
                <span>ചരിത്ര വഴികൾ (History)</span>
              </Link>

              <Link
                href="/tanur/news"
                className="px-5 py-3 rounded-2xl bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/25 text-white font-bold text-xs sm:text-sm font-malayalam-heading transition active:scale-95 flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-amber-200" />
                <span>നാട്ടുവിശേഷങ്ങൾ (What&apos;s Happening?)</span>
              </Link>

              <Link
                href="/tanur/contribute"
                className="px-5 py-3 rounded-2xl bg-[#B87A1E] hover:bg-[#9E6A1E] text-white font-bold text-xs sm:text-sm font-malayalam-heading transition shadow-lg active:scale-95 flex items-center gap-2"
              >
                <span>നിങ്ങളുടെ കഥ പങ്കുവെക്കാം (Share Story)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Photo Attribution Pill */}
            <div className="mt-6 pt-3 border-t border-white/15 flex items-center justify-between text-[11px] text-stone-300">
              <span className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-amber-300" />
                ചിത്രം: താനൂർ ബീച്ച് സൂര്യാസ്തമയം (Photo: Manu Sankerms, CC BY-SA 2.0 via Wikimedia Commons)
              </span>
              <span className="hidden sm:inline-block font-mono">PIN: 676302 • STD: 0494</span>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. INTRODUCTION & CORE FACTS (Census 2011 & Administrative Distinction) */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Town Introduction */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-9 shadow-card">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#B87A1E] font-malayalam-body">
                  നാടറിവ് • താനൂർ നഗരസഭ
                </span>
                <h2 className="text-2xl sm:text-3xl font-black font-malayalam-heading text-[#1B4D36] mt-1 mb-4 leading-snug">
                  അറബിക്കടലിന്റെ താളവും വെട്ടത്തുനാടിന്റെ പൈതൃകവും
                </h2>
                <div className="space-y-3.5 text-xs sm:text-sm text-[#4A5752] font-malayalam-body leading-relaxed">
                  <p>
                    മലപ്പുറം ജില്ലയിലെ തിരൂർ താലൂക്കിൽ, അറബിക്കടലിന്റെ തീരത്ത് പൂരപ്പുഴയുടെ അഴിമുഖത്തോട് ചേർന്ന് സ്ഥിതിചെയ്യുന്ന ചരിത്രപ്രസിദ്ധമായ നഗരസഭയാണ് <strong>താനൂർ (Tanur)</strong>. വടക്ക് പരപ്പനങ്ങാടിയും തെക്ക് തിരൂരും കിഴക്ക് താനാളൂരും പടിഞ്ഞാറ് അറബിക്കടലും അതിരിടുന്ന ഈ തീരദേശ നഗരം മലബാറിന്റെ പ്രാചീന സമുദ്ര വാണിജ്യത്തിൽ സുപ്രധാന പങ്കുവഹിച്ച തുറമുഖമായിരുന്നു.
                  </p>
                  <p>
                    മധ്യകാലഘട്ടത്തിൽ പ്രസിദ്ധമായ <strong>വെട്ടത്തുനാട് (താനൂർ സ്വരൂപം / പ്രകാശഭൂ)</strong> നാട്ടുരാജ്യത്തിന്റെ തലസ്ഥാനമായിരുന്നു താനൂർ. കുരുമുളകും ഏലവും തടിയും കൊപ്രയും കയറ്റുമതി ചെയ്തിരുന്ന ഈ തീരത്തേക്ക് അറബ്, ചൈനീസ്, പോർച്ചുഗീസ്, ഫ്രഞ്ച് വ്യാപാരികൾ എത്തിച്ചേർന്നു. 1546-ൽ വിശുദ്ധ ഫ്രാൻസിസ് സേവ്യർ സന്ദർശിച്ചതും, 1861-ൽ കേരളത്തിലെ ആദ്യ റെയിൽപാത കമ്മീഷൻ ചെയ്തപ്പോൾ താനൂർ സ്റ്റേഷൻ സ്ഥാപിതമായതും ഇവിടുത്തെ ചരിത്ര പ്രാധാന്യം വ്യക്തമാക്കുന്നു.
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
                    <strong>താനൂർ നഗരസഭ (Tanur Municipality)</strong> എന്നത് 19.49 ച.കി.മീ വിസ്തൃതിയും 45 വാർഡുകളുമുള്ള നഗര ഭരണ സംവിധാനമാണ്. ഇത് സമീപത്തെ ഗ്രാമീണ പഞ്ചായത്തുകൾ (ഒഴൂർ, പൊന്മമുണ്ടം, താനാളൂർ, നിറമരുതൂർ, ചെറിയമുണ്ടം) ഉൾപ്പെടുന്ന <strong>താനൂർ ബ്ലോക്ക് പഞ്ചായത്തുമായി (Block Panchayat)</strong> വേറിട്ടുനിൽക്കുന്നു. രണ്ടിന്റെയും കണക്കുകൾ കൂട്ടിക്കലർത്തരുത്.
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
        {/* 3. IMPORTANT PLACES & LANDMARKS (Visual Cards) */}
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
        {/* 4. TANUR COMMUNITY MAP OVERVIEW */}
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
        {/* 5. HISTORY & HERITAGE HIGHLIGHTS */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#B87A1E] font-malayalam-body">
                പൈതൃക നാൾവഴി
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-malayalam-heading text-[#1B4D36] mt-1">
                നൂറ്റാണ്ടുകളുടെ ചരിത്ര ശേഷിപ്പുകൾ
              </h2>
            </div>
            <Link
              href="/tanur/history"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B4D36] hover:text-[#B87A1E] transition"
            >
              <span>സമ്പൂർണ്ണ ചരിത്ര നാൾവഴി കാണാം</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {TANUR_HISTORY_TIMELINE.slice(0, 4).map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-[#EDE6D8] p-5 shadow-card hover:border-[#1B4D36] transition flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="inline-block px-2.5 py-1 rounded-xl bg-[#E8F2EC] text-[#1B4D36] text-[11px] font-bold font-mono">
                    {item.year}
                  </div>
                  <h4 className="text-base font-bold font-malayalam-serif text-[#1A2420] mt-2 mb-1.5">
                    {item.title_ml}
                  </h4>
                  <p className="text-xs text-[#5C6A64] font-malayalam-body leading-relaxed">
                    {item.description_ml}
                  </p>
                </div>
                <div className="text-[10px] text-[#7A8880] font-medium pt-2 border-t border-[#F5F1E8]">
                  യുഗം: {item.era}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. CULTURE, CUISINE & TRADITIONS */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-20">
          <div className="bg-[#FAF7F0] rounded-3xl border border-[#EDE6D8] p-6 sm:p-10 shadow-card">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#B87A1E] font-malayalam-body">
                  സാംസ്കാരിക തനിമ
                </span>
                <h2 className="text-2xl sm:text-3xl font-black font-malayalam-heading text-[#1B4D36] mt-1">
                  കലകൾ, ആഘോഷങ്ങൾ & താനൂർ കടലോര രുചികൾ
                </h2>
              </div>
              <Link
                href="/tanur/culture"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B4D36] hover:text-[#B87A1E] transition"
              >
                <span>സംസ്കാര പേജിലേക്ക്</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {TANUR_CULTURE_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-[#EDE6D8] p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#B87A1E] block mb-1">
                      {item.category_ml}
                    </span>
                    <h3 className="text-base font-bold font-malayalam-serif text-[#1B4D36] mb-2">
                      {item.title_ml}
                    </h3>
                    <p className="text-xs text-[#5C6A64] font-malayalam-body leading-relaxed">
                      {item.description_ml}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#F5F1E8] text-[11px] text-[#2D5A43] font-medium font-malayalam-body">
                    {item.significance}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. PEOPLE & COMMUNITY STORIES */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#B87A1E] font-malayalam-body">
                നാട്ടുകാർ & അനുഭവങ്ങൾ
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-malayalam-heading text-[#1B4D36] mt-1">
                താനൂരിന്റെ ജനങ്ങളും നാട്ടുഗാഥകളും
              </h2>
            </div>
            <Link
              href="/tanur/people"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B4D36] hover:text-[#B87A1E] transition"
            >
              <span>എല്ലാ കഥകളും കാണാം</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TANUR_STORIES.map((story) => (
              <div
                key={story.id}
                className="bg-white rounded-3xl border border-[#EDE6D8] p-6 shadow-card hover:shadow-lg transition flex flex-col justify-between"
              >
                <div>
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#E8F2EC] text-[#1B4D36] text-[10px] font-bold uppercase mb-3">
                    {story.role}
                  </div>
                  <h3 className="text-lg font-bold font-malayalam-serif text-[#1A2420] mb-2 leading-snug">
                    {story.title_ml}
                  </h3>
                  <p className="text-xs text-[#5C6A64] font-malayalam-body leading-relaxed">
                    {story.excerpt_ml}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#F0EBE0] flex items-center justify-between text-xs text-[#7A8880]">
                  <span className="font-medium text-[#1A2420] truncate max-w-[160px]">
                    {story.authorOrSubject}
                  </span>
                  <span className="text-[11px] text-[#1B4D36] font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    സ്ഥിരീകരിച്ച രേഖ
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. EDUCATION, ECONOMY & PUBLIC SERVICES SNIPPET */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Education Highlight */}
            <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 shadow-card flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-[#E8F2EC] flex items-center justify-center text-[#1B4D36] mb-3">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-malayalam-serif text-[#1B4D36] mb-2">
                  വിദ്യാഭ്യാസ സ്ഥാപനങ്ങൾ
                </h3>
                <p className="text-xs text-[#5C6A64] font-malayalam-body mb-4 leading-relaxed">
                  ഇസ്ലാഹുൽ ഉലൂം അറബിക് കോളേജ്, ദേവധാർ ഗവ. എച്ച്.എസ്.എസ്, ഫിഷറീസ് ടെക്നിക്കൽ സ്കൂൾ, സഞ്ചാര സാഹിത്യ ലൈബ്രറി എന്നിവ താനൂരിന്റെ വിജ്ഞാന ദീപങ്ങളാണ്.
                </p>
                <div className="space-y-2 text-xs font-malayalam-body">
                  {TANUR_INSTITUTIONS.slice(0, 3).map((inst) => (
                    <div key={inst.id} className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#EDE6D8]">
                      <div className="font-bold text-[#1A2420]">{inst.name_ml}</div>
                      <div className="text-[11px] text-[#7A8880]">സ്ഥാപിതം: {inst.establishedYear}</div>
                    </div>
                  ))}
                </div>
              </div>
              <Link
                href="/tanur/education"
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-[#1B4D36] hover:underline"
              >
                <span>വിദ്യാഭ്യാസ ഡയറക്ടറി കാണാം</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Economy & Businesses Highlight */}
            <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 shadow-card flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-[#E8F2EC] flex items-center justify-center text-[#1B4D36] mb-3">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-malayalam-serif text-[#1B4D36] mb-2">
                  വ്യാപാരവും സമ്പദ്‌വ്യവസ്ഥയും
                </h3>
                <p className="text-xs text-[#5C6A64] font-malayalam-body mb-4 leading-relaxed">
                  മത്സ്യബന്ധന ഹാർബർ, കൊപ്ര-വെളിച്ചെണ്ണ വ്യാപാരം, ഐസ് പ്ലാന്റുകൾ, മത്സ്യ കയറ്റുമതി, ചെറുകിട വ്യാപാരികൾ എന്നിവയാണ് നഗരത്തിന്റെ പ്രധാന സാമ്പത്തിക സ്രോതസ്സുകൾ.
                </p>
                <div className="space-y-2 text-xs font-malayalam-body">
                  {TANUR_BUSINESSES.slice(0, 3).map((biz) => (
                    <div key={biz.id} className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#EDE6D8]">
                      <div className="font-bold text-[#1A2420]">{biz.name_ml}</div>
                      <div className="text-[11px] text-[#7A8880]">{biz.category_ml}</div>
                    </div>
                  ))}
                </div>
              </div>
              <Link
                href="/tanur/economy"
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-[#1B4D36] hover:underline"
              >
                <span>വ്യാപാര വിവരങ്ങൾ കാണാം</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Public Services & Emergency Directory */}
            <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 shadow-card flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-[#E8F2EC] flex items-center justify-center text-[#1B4D36] mb-3">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-malayalam-serif text-[#1B4D36] mb-2">
                  പൊതു സേവനങ്ങളും അത്യാഹിത നമ്പറുകളും
                </h3>
                <p className="text-xs text-[#5C6A64] font-malayalam-body mb-4 leading-relaxed">
                  താനൂർ നഗരസഭ, പോലീസ് സ്റ്റേഷൻ, ഫയർ സ്റ്റേഷൻ, താലൂക്ക് ആശുപത്രി തുടങ്ങിയ പ്രധാന സർക്കാർ സ്ഥാപനങ്ങളുടെ വിവരങ്ങൾ.
                </p>
                <div className="space-y-2 text-xs font-malayalam-body">
                  <div className="flex justify-between items-center p-2 rounded-xl bg-[#FAF7F0] border border-[#EDE6D8]">
                    <span className="font-medium text-[#1A2420]">നഗരസഭാ കാര്യാലയം</span>
                    <span className="font-mono font-bold text-[#1B4D36]">0494 2440232</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-xl bg-[#FAF7F0] border border-[#EDE6D8]">
                    <span className="font-medium text-[#1A2420]">പോലീസ് സ്റ്റേഷൻ</span>
                    <span className="font-mono font-bold text-[#1B4D36]">0494 2440244</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-xl bg-[#FAF7F0] border border-[#EDE6D8]">
                    <span className="font-medium text-[#1A2420]">ഫയർ & റെസ്ക്യൂ</span>
                    <span className="font-mono font-bold text-[#1B4D36]">0494 2440101</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-xl bg-[#FAF7F0] border border-[#EDE6D8]">
                    <span className="font-medium text-[#1A2420]">താലൂക്ക് ആശുപത്രി</span>
                    <span className="font-mono font-bold text-[#1B4D36]">0494 2440250</span>
                  </div>
                </div>
              </div>
              <Link
                href="/tanur/directory"
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-[#1B4D36] hover:underline"
              >
                <span>പൂർണ്ണ ഡയറക്ടറി കാണാം</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 9. AUTHENTIC PHOTOGRAPHY GALLERY SNIPPET */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#B87A1E] font-malayalam-body">
                ഫോട്ടോ ഗാലറി
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-malayalam-heading text-[#1B4D36] mt-1">
                താനൂരിന്റെ യഥാർത്ഥ ചിത്രങ്ങൾ (Verified Wikimedia Commons)
              </h2>
            </div>
            <Link
              href="/tanur/gallery"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B4D36] hover:text-[#B87A1E] transition"
            >
              <span>മുഴുവൻ ഗാലറിയും ആട്രിബ്യൂഷനും കാണാം</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TANUR_PHOTO_MANIFEST.slice(0, 4).map((photo) => (
              <div
                key={photo.id}
                className="group relative h-48 sm:h-60 rounded-2xl overflow-hidden shadow-card border border-[#EDE6D8] bg-stone-200"
              >
                <img
                  src={photo.filenameOrUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                  <div className="text-xs font-bold drop-shadow leading-tight">{photo.title}</div>
                  <div className="text-[10px] text-amber-200/90 truncate">{photo.creator} • {photo.license}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 10. COMMUNITY CONTRIBUTION CTA */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-20">
          <div className="bg-gradient-to-r from-[#1B4D36] via-[#143D2B] to-[#0A2016] rounded-3xl p-8 sm:p-12 text-white shadow-card relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>താനൂരിന്റെ ഡിജിറ്റൽ കൂട്ടായ്മ</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black font-malayalam-heading leading-tight">
                നിങ്ങളുടെ നാട്ടുവിശേഷങ്ങളും പഴയകാല ചിത്രങ്ങളും പങ്കുവെക്കാം
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-stone-200 font-malayalam-body leading-relaxed">
                താനൂരിന്റെ ചരിത്ര ഓർമ്മകൾ, കുടുംബ കഥകൾ, വാർഡുകളിലെ വികസനങ്ങൾ, പുതിയ വ്യാപാര സ്ഥാപനങ്ങൾ, പരിപാടികൾ എന്നിവ Nammude Naadu പ്ലാറ്റ്‌ഫോമിൽ രേഖപ്പെടുത്തൂ.
              </p>
            </div>
            <div className="relative z-10 shrink-0 flex flex-col sm:flex-row gap-3">
              <Link
                href="/tanur/contribute"
                className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-stone-900 font-black text-xs sm:text-sm font-malayalam-heading transition shadow-lg text-center"
              >
                വിവരങ്ങൾ സമർപ്പിക്കൂ
              </Link>
              <Link
                href="/tanur/directory"
                className="px-6 py-3.5 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/25 text-white font-bold text-xs sm:text-sm font-malayalam-heading transition text-center"
              >
                സേവനങ്ങൾ അന്വേഷിക്കാം
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 11. SOURCES, REFERENCES & RESEARCH DISCLOSURE */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
          <div className="p-6 rounded-2xl bg-white border border-[#EDE6D8] text-xs text-[#5C6A64] font-malayalam-body space-y-2">
            <div className="font-bold text-[#1B4D36] text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#1B4D36]" />
              <span>വിവര സ്രോതസ്സുകളും സുതാര്യതയും (Sources & Research Verification):</span>
            </div>
            <p className="leading-relaxed">
              ഈ പ്രൊഫൈലിൽ നൽകിയിരിക്കുന്ന എല്ലാ വിവരങ്ങളും താനൂർ നഗരസഭയുടെ ഔദ്യോഗിക പോർട്ടൽ (LSGD Kerala), സെൻസസ് ഓഫ് ഇന്ത്യ 2011 ഡിസ്ട്രിക്റ്റ് ഹാൻഡ്ബുക്ക്, കേരള ടൂറിസം ഡയറക്ടറി, മലപ്പുറം ജില്ലാ അഡ്മിനിസ്ട്രേഷൻ, ഇസ്ലാഹുൽ ഉലൂം അറബിക് കോളേജ് ആർക്കൈവ്സ് എന്നിവയെ ആസ്പദമാക്കി തയ്യാറാക്കിയതാണ്. ഫോട്ടോഗ്രാഫുകൾ വിക്കിമീഡിയ കോമൺസ് വഴിയുള്ള അംഗീകൃത ക്രിയേറ്റീവ് കോമൺസ് ലൈസൻസുകൾ (CC BY-SA 4.0, CC BY 3.0, CC BY-SA 2.0) പ്രകാരം കൃത്യമായ ആട്രിബ്യൂഷനോടെ പ്രസിദ്ധീകരിച്ചിരിക്കുന്നു.
            </p>
            <div className="pt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-medium text-[#1B4D36]">
              {TANUR_SOURCES.map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline flex items-center gap-1"
                >
                  <span>{s.title} ({s.yearOrDate})</span>
                  <ExternalLink className="w-3 h-3 text-[#7A8880]" />
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
