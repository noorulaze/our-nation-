"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { NaaduAiModal } from "@/components/ai/NaaduAiModal";
import { CommunityMap } from "@/components/map/CommunityMap";
import { useLanguage } from "@/lib/i18n/context";
import { useCommunity } from "@/lib/community/context";
import { store } from "@/lib/data/store";
import { 
  Sparkles, 
  Search, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Play,
  Landmark,
  Palmtree,
  BookOpen,
  Handshake,
  Megaphone,
  Mail,
  Send,
  Building,
  AlertTriangle
} from "lucide-react";

export default function HomePage() {
  const { t, language } = useLanguage();
  const { currentCommunity, availableCommunities, setCurrentCommunity } = useCommunity();
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiInitialQuery, setAiInitialQuery] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [showDistrictModal, setShowDistrictModal] = useState(false);

  const realEvents = store.getEvents(currentCommunity?.id);
  const realAnnouncements = store.getAnnouncements(currentCommunity?.id);
  const realBusinesses = store.getBusinesses(currentCommunity?.id);
  const realPlaces = store.getPlaces(currentCommunity?.id);
  const realIssues = store.getIssueReports(currentCommunity?.id);

  const handleOpenAi = (query?: string) => {
    if (query) setAiInitialQuery(query);
    setIsAiModalOpen(true);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSuccess(true);
      setTimeout(() => {
        setNewsletterEmail("");
        setNewsletterSuccess(false);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420] selection:bg-[#E0F1E7] selection:text-[#1B4D36]">
      <Navbar onOpenSearchAi={handleOpenAi} />

      <main className="flex-1">
        
        {/* ========================================================================= */}
        {/* 1. HERO BANNER SECTION (Exact Match to Reference Image) */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden pt-4 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="relative rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-elevated border border-[#E7DFD0] min-h-[440px] sm:min-h-[500px] lg:min-h-[540px] flex items-center">
            
            {/* Background Panorama: Sunset over Kerala Backwaters with Houseboat & Coconut Palms */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1800&auto=format&fit=crop&q=85')`,
              }}
            >
              {/* Subtle Sunset & Warm Cream Vignette for readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F0]/95 via-[#FAF7F0]/70 to-black/30 sm:to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent sm:hidden" />
            </div>

            {/* Left Content */}
            <div className="relative z-10 p-6 sm:p-12 lg:p-16 max-w-2xl">
              
              {/* Big Malayalam Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-malayalam-serif text-[#1B4D36] tracking-tight leading-none mb-3">
                നമ്മുടെ നാട്
              </h1>

              {/* Tagline in Golden Script */}
              <p className="text-lg sm:text-2xl font-bold font-malayalam-script text-[#B87A1E] mb-3">
                നമ്മുടെ നാട്... നമ്മുടെ അഭിമാനം...
              </p>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-[#4A5750] leading-relaxed max-w-md font-malayalam-body mb-8">
                കേരളത്തിന്റെ മനോഹാരിതയും, സംസ്കാരവും, വിവരങ്ങളും ഒറ്റ വേദിയിൽ.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/discover"
                  className="px-6 py-3 rounded-full bg-[#1B4D36] hover:bg-[#133A28] text-white font-bold text-xs sm:text-sm transition-all duration-200 active:scale-95 shadow-md flex items-center gap-2 group"
                >
                  <span>നാടിനെ അറിയാം</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
                </Link>

                <button
                  type="button"
                  onClick={() => handleOpenAi("കേരളത്തിലെ പ്രധാന വിവരങ്ങളും വിശേഷങ്ങളും എന്തൊക്കെയാണ്?")}
                  className="px-5 py-3 rounded-full bg-white/80 hover:bg-white text-[#1B4D36] border border-[#DDD5C5] font-bold text-xs sm:text-sm transition-all duration-200 active:scale-95 shadow-sm flex items-center gap-2 backdrop-blur-xs"
                >
                  <div className="w-5 h-5 rounded-full bg-[#1B4D36] text-white flex items-center justify-center">
                    <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                  </div>
                  <span>നാട് AI സഹായി</span>
                </button>
              </div>

            </div>

            {/* Right side artistic script overlay */}
            <div className="hidden lg:block absolute right-12 top-1/3 z-10 text-right pointer-events-none">
              <span className="font-malayalam-script text-white text-3xl xl:text-4xl font-bold drop-shadow-lg opacity-90 block">
                എന്റെ നാട്...
              </span>
              <span className="font-malayalam-script text-white text-3xl xl:text-4xl font-bold drop-shadow-lg opacity-90 block mt-1">
                എന്റെ അഭിമാനം...
              </span>
            </div>

            {/* Bottom Carousel Indicator Pills */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
              <div className="w-7 h-1.5 rounded-full bg-[#1B4D36]" />
              <div className="w-7 h-1.5 rounded-full bg-[#1B4D36]/40" />
              <div className="w-7 h-1.5 rounded-full bg-[#1B4D36]/40" />
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. QUICK NAVIGATION CATEGORY BAR (Exact Match to Reference Image) */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="bg-[#F3EFE6] rounded-2xl border border-[#E5DFD1] shadow-card p-3 sm:p-4">
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E1D9C8]">
              
              {/* 1. ക്ഷേത്രങ്ങൾ / പൈതൃകം */}
              <Link
                href="/discover?tab=places"
                className="flex flex-col items-center justify-center text-center p-2 rounded-xl hover:bg-white/60 transition group"
              >
                <div className="w-9 h-9 rounded-full bg-[#E8E1D2] group-hover:bg-[#1B4D36] group-hover:text-white text-[#1B4D36] flex items-center justify-center mb-1.5 transition">
                  <Landmark className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-[#2A3730] group-hover:text-[#1B4D36] transition">
                  ക്ഷേത്രങ്ങൾ
                </span>
              </Link>

              {/* 2. ടൂറിസം */}
              <Link
                href="/discover?tab=places"
                className="flex flex-col items-center justify-center text-center p-2 rounded-xl hover:bg-white/60 transition group"
              >
                <div className="w-9 h-9 rounded-full bg-[#E8E1D2] group-hover:bg-[#1B4D36] group-hover:text-white text-[#1B4D36] flex items-center justify-center mb-1.5 transition">
                  <Palmtree className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-[#2A3730] group-hover:text-[#1B4D36] transition">
                  ടൂറിസം
                </span>
              </Link>

              {/* 3. വിദ്യാഭ്യാസം */}
              <Link
                href="/discover?tab=events"
                className="flex flex-col items-center justify-center text-center p-2 rounded-xl hover:bg-white/60 transition group"
              >
                <div className="w-9 h-9 rounded-full bg-[#E8E1D2] group-hover:bg-[#1B4D36] group-hover:text-white text-[#1B4D36] flex items-center justify-center mb-1.5 transition">
                  <BookOpen className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-[#2A3730] group-hover:text-[#1B4D36] transition">
                  വിദ്യാഭ്യാസം
                </span>
              </Link>

              {/* 4. സേവനങ്ങൾ */}
              <Link
                href="/discover?tab=services"
                className="flex flex-col items-center justify-center text-center p-2 rounded-xl hover:bg-white/60 transition group"
              >
                <div className="w-9 h-9 rounded-full bg-[#E8E1D2] group-hover:bg-[#1B4D36] group-hover:text-white text-[#1B4D36] flex items-center justify-center mb-1.5 transition">
                  <Handshake className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-[#2A3730] group-hover:text-[#1B4D36] transition">
                  സേവനങ്ങൾ
                </span>
              </Link>

              {/* 5. പുതിയ വാർത്തകൾ */}
              <Link
                href="/community"
                className="flex flex-col items-center justify-center text-center p-2 rounded-xl hover:bg-white/60 transition group"
              >
                <div className="w-9 h-9 rounded-full bg-[#E8E1D2] group-hover:bg-[#1B4D36] group-hover:text-white text-[#1B4D36] flex items-center justify-center mb-1.5 transition">
                  <Megaphone className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-[#2A3730] group-hover:text-[#1B4D36] transition">
                  പുതിയ വാർത്തകൾ
                </span>
              </Link>

              {/* 6. നമ്മുടെ ജില്ലകൾ */}
              <button
                type="button"
                onClick={() => setShowDistrictModal(true)}
                className="flex flex-col items-center justify-center text-center p-2 rounded-xl hover:bg-white/60 transition group"
              >
                <div className="w-9 h-9 rounded-full bg-[#E8E1D2] group-hover:bg-[#1B4D36] group-hover:text-white text-[#1B4D36] flex items-center justify-center mb-1.5 transition">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-[#2A3730] group-hover:text-[#1B4D36] transition">
                  നമ്മുടെ ജില്ലകൾ
                </span>
              </button>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. LATEST UPDATES / NEWS ("പുതിയ വാർത്തകൾ") */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-6 rounded-full bg-[#1B4D36]" />
              <h2 className="text-xl sm:text-2xl font-bold font-malayalam-serif text-[#1A2420]">
                പുതിയ വാർത്തകൾ
              </h2>
            </div>
            <Link
              href="/community"
              className="text-xs font-bold text-[#1B4D36] hover:text-[#133A28] flex items-center gap-1 group"
            >
              <span>എല്ലാം കാണുക</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Big Card: KSRTC Kerala Bus Story */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-[#EAE4D7] shadow-card overflow-hidden hover:border-[#1B4D36]/40 transition group flex flex-col justify-between">
              <div>
                <div className="h-56 sm:h-64 overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=900&auto=format&fit=crop&q=80"
                    alt="Kerala Public Transport"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#1B4D36] text-white text-[11px] font-bold px-3 py-1 rounded-full">
                    കേരളം
                  </span>
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="font-bold font-malayalam-serif text-lg text-[#1A2420] group-hover:text-[#1B4D36] transition leading-snug mb-2">
                    കേരളത്തിൽ പുതിയ ബസ് സർവീസുകൾക്ക് തുടക്കമായി
                  </h3>
                  <p className="text-xs text-[#5C6A64] leading-relaxed line-clamp-2">
                    സംസ്ഥാനത്ത് കൂടുതൽ പ്രദേശങ്ങളിലേക്ക് പുതിയ ബസ് സർവീസുകൾ ആരംഭിച്ചു. ഗ്രാമീണ റൂട്ടുകളിൽ കൂടുതൽ യാത്രാസൗകര്യം ലഭ്യമാക്കുകയാണ് ലക്ഷ്യം.
                  </p>
                </div>
              </div>
              <div className="px-5 sm:px-6 pb-5 text-[11px] text-[#7A8880] flex items-center gap-1.5 border-t border-[#F3EFE6] pt-3">
                <Calendar className="w-3.5 h-3.5 text-[#1B4D36]" />
                <span>17 നവംബർ 2026</span>
              </div>
            </div>

            {/* Middle Column: 3 Horizontal News Items */}
            <div className="lg:col-span-4 flex flex-col gap-3.5">
              
              {/* Item 1 */}
              <div className="bg-white rounded-2xl border border-[#EAE4D7] shadow-xs p-3.5 flex gap-3 hover:border-[#1B4D36]/40 transition">
                <img
                  src="https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=400&auto=format&fit=crop&q=80"
                  alt="Thiruvananthapuram Project"
                  className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex flex-col justify-between">
                  <h4 className="font-bold text-xs sm:text-sm text-[#1A2420] leading-snug hover:text-[#1B4D36] transition">
                    തിരുവനന്തപുരത്ത് പുതിയ വികസന പദ്ധതി
                  </h4>
                  <span className="text-[10px] text-[#7A8880] flex items-center gap-1 mt-1">
                    <Calendar className="w-3 h-3 text-[#1B4D36]" /> 16 നവംബർ 2026
                  </span>
                </div>
              </div>

              {/* Item 2 */}
              <div className="bg-white rounded-2xl border border-[#EAE4D7] shadow-xs p-3.5 flex gap-3 hover:border-[#1B4D36]/40 transition">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&auto=format&fit=crop&q=80"
                  alt="Education Results"
                  className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex flex-col justify-between">
                  <h4 className="font-bold text-xs sm:text-sm text-[#1A2420] leading-snug hover:text-[#1B4D36] transition">
                    +2 ഫലങ്ങൾ പ്രസിദ്ധീകരിച്ചു
                  </h4>
                  <span className="text-[10px] text-[#7A8880] flex items-center gap-1 mt-1">
                    <Calendar className="w-3 h-3 text-[#1B4D36]" /> 15 നവംബർ 2026
                  </span>
                </div>
              </div>

              {/* Item 3 */}
              <div className="bg-white rounded-2xl border border-[#EAE4D7] shadow-xs p-3.5 flex gap-3 hover:border-[#1B4D36]/40 transition">
                <img
                  src="https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=400&auto=format&fit=crop&q=80"
                  alt="Kerala Weather Alert"
                  className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex flex-col justify-between">
                  <h4 className="font-bold text-xs sm:text-sm text-[#1A2420] leading-snug hover:text-[#1B4D36] transition">
                    കേരളത്തിൽ മഴ മുന്നറിയിപ്പ്
                  </h4>
                  <span className="text-[10px] text-[#7A8880] flex items-center gap-1 mt-1">
                    <Calendar className="w-3 h-3 text-[#1B4D36]" /> 14 നവംബർ 2026
                  </span>
                </div>
              </div>

            </div>

            {/* Right Card: Dark Green Highlight Card */}
            <div className="lg:col-span-3 bg-gradient-to-b from-[#1C5139] to-[#123826] text-white rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between shadow-card">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&auto=format&fit=crop&q=80')`,
                }}
              />
              <div className="relative z-10">
                <span className="font-malayalam-script text-2xl sm:text-3xl font-bold leading-tight block">
                  നമ്മുടെ നാട്...
                </span>
                <span className="font-malayalam-script text-2xl sm:text-3xl font-bold leading-tight block mt-1 text-amber-200">
                  എന്നും....
                </span>
              </div>

              <div className="relative z-10 pt-20">
                <button
                  type="button"
                  onClick={() => handleOpenAi("കേരളത്തിലെ തനത് സാംസ്കാരിക സൗന്ദര്യം കാണിച്ചു തരൂ")}
                  className="flex items-center gap-2.5 text-xs text-white hover:text-amber-200 transition font-medium"
                >
                  <div className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-xs flex items-center justify-center">
                    <Play className="w-3 h-3 fill-current ml-0.5" />
                  </div>
                  <span>നമ്മുടെ നാടിന്റെ സൗന്ദര്യം കാണുക</span>
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. FEATURED COMMUNITY / ABOUT ("നമ്മുടെ നാട് കുറിച്ച്") */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="bg-white rounded-3xl border border-[#EAE4D7] shadow-card p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Photo: Traditional Kerala Architecture */}
              <div className="lg:col-span-4 rounded-2xl overflow-hidden shadow-xs h-64 sm:h-72">
                <img
                  src="https://images.unsplash.com/photo-1609137144822-54d9c79e6074?w=800&auto=format&fit=crop&q=80"
                  alt="Kerala Palace & Heritage Architecture"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Center Text */}
              <div className="lg:col-span-4 space-y-4">
                <h3 className="text-2xl font-bold font-malayalam-serif text-[#1A2420]">
                  നമ്മുടെ നാട് കുറിച്ച്
                </h3>
                <p className="text-xs sm:text-sm text-[#5C6A64] leading-relaxed">
                  കേരളത്തിന്റെ മനോഹാരിതയും, സംസ്കാരത്തെയും, ജനങ്ങളുടെ ഐക്യത്തെയും പ്രതിനിധീകരിക്കുന്ന ഒരു ഡിജിറ്റൽ വേദിയാണ് &quot;നമ്മുടെ നാട്&quot;.
                </p>
                <div>
                  <Link
                    href="/community"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1B4D36] hover:bg-[#133A28] text-white text-xs font-bold transition shadow-xs"
                  >
                    <span>കൂടുതൽ അറിയാം</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Right Stats Box: 1Cr+ People, 14 Districts, 1000+ Heritage */}
              <div className="lg:col-span-4 bg-[#F2EDE1] rounded-2xl p-6 border border-[#E5DECEx] flex items-center justify-around text-center">
                
                {/* Stat 1 */}
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-[#E5DDD0] text-[#1B4D36] flex items-center justify-center mb-2">
                    <Users className="w-4 h-4" />
                  </div>
                  <span className="text-xl font-bold font-malayalam-serif text-[#1B4D36] leading-none">
                    1Cr+
                  </span>
                  <span className="text-[11px] font-bold text-[#5C6A64] mt-1">
                    ജനങ്ങൾ
                  </span>
                </div>

                <div className="w-px h-12 bg-[#DFD6C6]" />

                {/* Stat 2 */}
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-[#E5DDD0] text-[#1B4D36] flex items-center justify-center mb-2">
                    <Building className="w-4 h-4" />
                  </div>
                  <span className="text-xl font-bold font-malayalam-serif text-[#1B4D36] leading-none">
                    14
                  </span>
                  <span className="text-[11px] font-bold text-[#5C6A64] mt-1">
                    ജില്ലകൾ
                  </span>
                </div>

                <div className="w-px h-12 bg-[#DFD6C6]" />

                {/* Stat 3 */}
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-[#E5DDD0] text-[#1B4D36] flex items-center justify-center mb-2">
                    <Landmark className="w-4 h-4" />
                  </div>
                  <span className="text-xl font-bold font-malayalam-serif text-[#1B4D36] leading-none">
                    1000+
                  </span>
                  <span className="text-[11px] font-bold text-[#5C6A64] mt-1">
                    പൈതൃകങ്ങൾ
                  </span>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. UPCOMING EVENTS & NEWSLETTER ("വരാനിരിക്കുന്ന പരിപാടികൾ") */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-6 rounded-full bg-[#1B4D36]" />
              <h2 className="text-xl sm:text-2xl font-bold font-malayalam-serif text-[#1A2420]">
                വരാനിരിക്കുന്ന പരിപാടികൾ
              </h2>
            </div>
            <Link
              href="/discover?tab=events"
              className="text-xs font-bold text-[#1B4D36] hover:text-[#133A28] flex items-center gap-1 group"
            >
              <span>എല്ലാം കാണുക</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* 4 Event Cards */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Event 1: Keralotsavam */}
              <div className="bg-white rounded-2xl border border-[#EAE4D7] shadow-card overflow-hidden hover:border-[#1B4D36]/40 transition group">
                <div className="h-32 overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&auto=format&fit=crop&q=80"
                    alt="Keralotsavam 2026"
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                  <div className="absolute top-2 left-2 bg-white/95 rounded-lg px-2 py-1 text-center shadow-xs">
                    <span className="text-[9px] uppercase font-bold text-[#7A8680] block leading-none">Nov</span>
                    <span className="text-sm font-bold text-[#1B4D36] block leading-none mt-0.5">20</span>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-sm text-[#1A2420] group-hover:text-[#1B4D36] transition">
                    കേരളോത്സവം 2026
                  </h4>
                  <div className="flex items-center gap-1 text-[11px] text-[#7A8680] mt-1.5">
                    <MapPin className="w-3 h-3 text-[#1B4D36]" />
                    <span>കൊച്ചി</span>
                  </div>
                </div>
              </div>

              {/* Event 2: AI & Education Seminar */}
              <div className="bg-white rounded-2xl border border-[#EAE4D7] shadow-card overflow-hidden hover:border-[#1B4D36]/40 transition group">
                <div className="h-32 overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80"
                    alt="AI & Education Seminar"
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                  <div className="absolute top-2 left-2 bg-white/95 rounded-lg px-2 py-1 text-center shadow-xs">
                    <span className="text-[9px] uppercase font-bold text-[#7A8680] block leading-none">Nov</span>
                    <span className="text-sm font-bold text-[#1B4D36] block leading-none mt-0.5">25</span>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-sm text-[#1A2420] group-hover:text-[#1B4D36] transition">
                    AI & വിദ്യാഭ്യാസം സെമിനാർ
                  </h4>
                  <div className="flex items-center gap-1 text-[11px] text-[#7A8680] mt-1.5">
                    <MapPin className="w-3 h-3 text-[#1B4D36]" />
                    <span>തിരുവനന്തപുരം</span>
                  </div>
                </div>
              </div>

              {/* Event 3: Kerala Sangeethotsavam */}
              <div className="bg-white rounded-2xl border border-[#EAE4D7] shadow-card overflow-hidden hover:border-[#1B4D36]/40 transition group">
                <div className="h-32 overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=600&auto=format&fit=crop&q=80"
                    alt="Kerala Music Festival"
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                  <div className="absolute top-2 left-2 bg-white/95 rounded-lg px-2 py-1 text-center shadow-xs">
                    <span className="text-[9px] uppercase font-bold text-[#7A8680] block leading-none">Nov</span>
                    <span className="text-sm font-bold text-[#1B4D36] block leading-none mt-0.5">28</span>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-sm text-[#1A2420] group-hover:text-[#1B4D36] transition">
                    കേരള സംഗീതോത്സവം
                  </h4>
                  <div className="flex items-center gap-1 text-[11px] text-[#7A8680] mt-1.5">
                    <MapPin className="w-3 h-3 text-[#1B4D36]" />
                    <span>കോഴിക്കോട്</span>
                  </div>
                </div>
              </div>

              {/* Event 4: District Sports Meet */}
              <div className="bg-white rounded-2xl border border-[#EAE4D7] shadow-card overflow-hidden hover:border-[#1B4D36]/40 transition group">
                <div className="h-32 overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&auto=format&fit=crop&q=80"
                    alt="District Sports Meet"
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                  <div className="absolute top-2 left-2 bg-white/95 rounded-lg px-2 py-1 text-center shadow-xs">
                    <span className="text-[9px] uppercase font-bold text-[#7A8680] block leading-none">Dec</span>
                    <span className="text-sm font-bold text-[#1B4D36] block leading-none mt-0.5">02</span>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-sm text-[#1A2420] group-hover:text-[#1B4D36] transition">
                    ജില്ലാതല കായികമേള
                  </h4>
                  <div className="flex items-center gap-1 text-[11px] text-[#7A8680] mt-1.5">
                    <MapPin className="w-3 h-3 text-[#1B4D36]" />
                    <span>മലപ്പുറം</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Card: Dark Green Newsletter Subscription Box */}
            <div className="lg:col-span-4 bg-gradient-to-b from-[#1C5139] to-[#123826] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-card">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-amber-200">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="font-bold font-malayalam-serif text-lg leading-snug">
                  ഞങ്ങളുടെ വാർത്തകൾ നിങ്ങളുടെ inbox-ൽ
                </h3>
                <p className="text-xs text-[#C5D6CD] leading-relaxed">
                  ഇപ്പോൾ തന്നെ സബ്സ്ക്രൈബ് ചെയ്യൂ. പ്രധാന പ്രാദേശിക അറിയിപ്പുകളും പരിപാടികളും നിങ്ങൾക്ക് നേരിട്ട് ലഭിക്കും.
                </p>
              </div>

              {newsletterSuccess ? (
                <div className="mt-6 p-3 rounded-xl bg-white/20 text-xs font-semibold text-center text-amber-200">
                  നന്ദി! നിങ്ങളുടെ ഇമെയിൽ വിലാസം രജിസ്റ്റർ ചെയ്തു.
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="mt-6 flex items-center relative">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="ഇമെയിൽ വിലാസം..."
                    className="w-full pl-4 pr-12 py-3 rounded-xl bg-white text-xs text-[#1A2420] placeholder-[#7A8880] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 w-9 h-9 rounded-lg bg-[#1B4D36] hover:bg-[#133A28] text-white flex items-center justify-center transition active:scale-95"
                    aria-label="Subscribe"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. EXPLORE KERALA GALLERY ("നമ്മുടെ നാട് ഗാലറി") */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-6 rounded-full bg-[#1B4D36]" />
              <h2 className="text-xl sm:text-2xl font-bold font-malayalam-serif text-[#1A2420]">
                നമ്മുടെ നാട് ഗാലറി
              </h2>
            </div>
            <Link
              href="/discover?tab=places"
              className="text-xs font-bold text-[#1B4D36] hover:text-[#133A28] flex items-center gap-1 group"
            >
              <span>എല്ലാം കാണുക</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            
            {/* Photo 1: Kovalam / Varkala Beach */}
            <div className="h-44 sm:h-52 rounded-2xl overflow-hidden shadow-xs border border-[#EAE4D7] relative group">
              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=80"
                alt="Kerala Coastline & Beach"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
            </div>

            {/* Photo 2: Coconut Groves & River */}
            <div className="h-44 sm:h-52 rounded-2xl overflow-hidden shadow-xs border border-[#EAE4D7] relative group">
              <img
                src="https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=500&auto=format&fit=crop&q=80"
                alt="Kerala Coconut Groves"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
            </div>

            {/* Photo 3: Kerala Historic Church / Basilica */}
            <div className="h-44 sm:h-52 rounded-2xl overflow-hidden shadow-xs border border-[#EAE4D7] relative group">
              <img
                src="https://images.unsplash.com/photo-1548625361-195fe578cb26?w=500&auto=format&fit=crop&q=80"
                alt="Kerala Heritage Church"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
            </div>

            {/* Photo 4: Munnar Tea Gardens & Mountains */}
            <div className="h-44 sm:h-52 rounded-2xl overflow-hidden shadow-xs border border-[#EAE4D7] relative group">
              <img
                src="https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=500&auto=format&fit=crop&q=80"
                alt="Munnar Tea Hills"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
            </div>

            {/* Photo 5: Backwaters Footbridge at Sunset */}
            <div className="h-44 sm:h-52 rounded-2xl overflow-hidden shadow-xs border border-[#EAE4D7] relative group">
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&auto=format&fit=crop&q=80"
                alt="Backwaters Sunrise Bridge"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
            </div>

            {/* Photo 6: Kathakali Traditional Performer */}
            <div className="h-44 sm:h-52 rounded-2xl overflow-hidden shadow-xs border border-[#EAE4D7] relative group">
              <img
                src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=500&auto=format&fit=crop&q=80"
                alt="Traditional Kathakali"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. COMMUNITY CTA BANNER (Exact Match to Reference Image) */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="bg-[#1B4D36] text-white rounded-3xl p-6 sm:p-10 shadow-elevated relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 border border-[#276449]">
            
            {/* Left Boat Line Illustration */}
            <div className="flex items-center gap-4">
              <svg 
                viewBox="0 0 100 50" 
                className="w-20 sm:w-28 h-12 text-amber-200/80 stroke-current fill-none flex-shrink-0"
              >
                {/* Traditional Kerala Vallam / Boat & Palm trees */}
                <path d="M5 25 C15 15 25 20 40 25 C60 30 85 28 95 20 C85 35 60 40 35 38 C15 35 8 30 5 25 Z" strokeWidth="2" />
                <path d="M15 15 L20 25 M30 14 L35 25 M45 16 L50 26 M60 18 L65 27" strokeWidth="1.5" />
                <path d="M10 20 C10 10 16 5 20 2 M18 5 C15 3 10 4 8 7 M22 5 C25 3 28 5 27 8" strokeWidth="1.5" strokeLinecap="round" />
              </svg>

              {/* Banner Text */}
              <div>
                <p className="font-malayalam-serif font-bold text-base sm:text-xl text-white leading-snug">
                  നമ്മുടെ നാടിനോടൊപ്പം നമുക്കും കൂടാം...
                </p>
                <p className="font-malayalam-serif font-bold text-base sm:text-xl text-amber-200 leading-snug mt-1">
                  ഒരു മികച്ച കേരളത്തിനായി ഒരുമിക്കാം.
                </p>
              </div>
            </div>

            {/* Right Button: Cream Pill */}
            <Link
              href="/register"
              className="px-6 py-3 rounded-full bg-[#FAF7F0] hover:bg-white text-[#1B4D36] font-bold text-xs sm:text-sm transition-all duration-200 active:scale-95 shadow-md flex items-center gap-2 flex-shrink-0 group"
            >
              <span>ഇപ്പോൾ തന്നെ ചേരൂ</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
            </Link>

          </div>
        </section>

      </main>

      {/* Floating Naadu AI Button */}
      <button
        onClick={() => handleOpenAi()}
        className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-40 px-4 py-3 rounded-full bg-[#1B4D36] hover:bg-[#143B29] text-white shadow-xl flex items-center gap-2 font-semibold text-xs sm:text-sm transition active:scale-95 border border-amber-300/40"
      >
        <Sparkles className="w-4 h-4 text-amber-300" />
        <span>നാട് AI</span>
      </button>

      {/* Naadu AI Assistant Modal */}
      <NaaduAiModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />

      {/* Districts Selector Modal */}
      {showDistrictModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[#FAF7F0] rounded-3xl border border-[#E7DFD0] p-6 max-w-lg w-full shadow-2xl">
            <div className="flex items-center justify-between mb-4 border-b border-[#E1D9C8] pb-3">
              <h3 className="font-bold font-malayalam-serif text-lg text-[#1B4D36] flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>കേരളത്തിലെ 14 ജില്ലകൾ</span>
              </h3>
              <button
                onClick={() => setShowDistrictModal(false)}
                className="text-xs font-bold text-[#5C6A64] hover:text-[#1A2420] px-2 py-1"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                "തിരുവനന്തപുരം", "കൊല്ലം", "പത്തനംതിട്ട", "ആലപ്പുഴ",
                "കോട്ടയം", "ഇടുക്കി", "എറണാകുളം", "തൃശ്ശൂർ",
                "പാലക്കാട്", "മലപ്പുറം", "കോഴിക്കോട്", "വയനാട്",
                "കണ്ണൂർ", "കാസർഗോഡ്"
              ].map((district) => (
                <Link
                  key={district}
                  href={`/discover?district=${encodeURIComponent(district)}`}
                  onClick={() => setShowDistrictModal(false)}
                  className="px-3 py-2 rounded-xl bg-white hover:bg-[#EFE9DD] border border-[#EAE4D7] font-semibold text-[#2A3730] transition text-center"
                >
                  {district}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
      <BottomNav />
    </div>
  );
}
