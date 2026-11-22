"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CommunityMap } from "@/components/map/CommunityMap";
import { useLanguage } from "@/lib/i18n/context";
import { useCommunity } from "@/lib/community/context";
import { store } from "@/lib/data/store";
import { 
  MapPin, 
  Building2, 
  Phone, 
  Clock, 
  Map as MapIcon, 
  Compass, 
  ShieldCheck, 
  Landmark, 
  Waves, 
  Users, 
  ExternalLink, 
  ChevronRight,
  ArrowRight,
  AlertTriangle,
  Award,
  HardHat,
  TrendingUp
} from "lucide-react";

export default function LocalityPage() {
  const { language } = useLanguage();
  const { currentCommunity, availableCommunities, setCurrentCommunity } = useCommunity();

  const [activeTab, setActiveTab] = useState<"overview" | "map" | "services" | "places">("overview");

  // Representative info
  const mla = store.getRepresentativeById("rep-tanur-mla");
  const publicServices = store.getPublicServices();
  const places = store.getPlaces();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: language === "ml" ? "ഹോം" : "Home", href: "/" },
            { label: language === "ml" ? "എന്റെ പ്രദേശം (My Locality)" : "My Locality" },
          ]}
        />

        {/* HERO SECTION */}
        <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 sm:p-8 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold text-[#1B4D36] uppercase tracking-wider bg-[#E0F1E7] px-3 py-1 rounded-full border border-[#BDE3CE]">
                {language === "ml" ? "നഗരസഭ & ജില്ല" : "Municipality & District"}
              </span>
              <span className="text-xs text-[#5C6A64]">
                മലപ്പുറം ജില്ല • കേരളം
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-malayalam-serif text-[#1B4D36]">
              {language === "ml" ? "താനൂർ നഗരസഭ — പ്രാദേശിക കേന്ദ്രം" : "Tanur Municipality — Local Civic Hub"}
            </h1>
            <p className="text-xs sm:text-sm text-[#5C6A64] font-malayalam-body leading-relaxed">
              {language === "ml"
                ? "താനൂർ നഗരസഭയുടെ സമഗ്ര ഭരണ വിവരങ്ങൾ, പൗര സേവനങ്ങൾ, അടിയന്തര ഹെൽപ്‌ലൈനുകൾ, സാംസ്കാരിക കേന്ദ്രങ്ങൾ എന്നിവ ഒറ്റനോട്ടത്തിൽ."
                : "Civic administration, public utilities, emergency contacts, local map and heritage for Tanur, Malappuram."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <Link
              href="/tanur"
              className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-[#1B4D36] hover:bg-[#133A28] text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs"
            >
              <span>{language === "ml" ? "താനൂർ പ്രൊഫൈൽ" : "Full Tanur Profile"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/politics/pk-navas"
              className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-[#FAF4E6] border border-[#DDD5C5] hover:bg-[#F3EFE6] text-[#8C5B0F] text-xs font-bold transition flex items-center justify-center gap-1.5"
            >
              <span>{language === "ml" ? "എം.എൽ.എ പ്രൊഫൈൽ" : "MLA Profile"}</span>
            </Link>
          </div>
        </div>

        {/* 4 FAST STATS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-[#EAE4D7] p-4 text-center">
            <span className="text-[10px] font-bold text-[#7A8880] uppercase tracking-wider">നിയോജകമണ്ഡലം</span>
            <p className="text-lg sm:text-xl font-bold text-[#1B4D36] mt-1">താനൂർ (No. 44)</p>
            <span className="text-[11px] text-[#5C6A64]">ജനപ്രതിനിധി: പി.കെ. നവാസ്</span>
          </div>
          <div className="bg-white rounded-2xl border border-[#EAE4D7] p-4 text-center">
            <span className="text-[10px] font-bold text-[#7A8880] uppercase tracking-wider">ഭരണവിഭാഗം</span>
            <p className="text-lg sm:text-xl font-bold text-[#1B4D36] mt-1">45 വാർഡുകൾ</p>
            <span className="text-[11px] text-[#5C6A64]">താനൂർ നഗരസഭ</span>
          </div>
          <div className="bg-white rounded-2xl border border-[#EAE4D7] p-4 text-center">
            <span className="text-[10px] font-bold text-[#7A8880] uppercase tracking-wider">ജില്ല</span>
            <p className="text-lg sm:text-xl font-bold text-[#1B4D36] mt-1">മലപ്പുറം</p>
            <span className="text-[11px] text-[#5C6A64]">തിരൂർ താലൂക്ക്</span>
          </div>
          <div className="bg-white rounded-2xl border border-[#EAE4D7] p-4 text-center">
            <span className="text-[10px] font-bold text-[#7A8880] uppercase tracking-wider">തീരദേശ പൈതൃകം</span>
            <p className="text-lg sm:text-xl font-bold text-[#1B4D36] mt-1">തീരദേശ പട്ടണം</p>
            <span className="text-[11px] text-[#5C6A64]">പൗരാണിക തുറമുഖ പാരമ്പര്യം</span>
          </div>
        </div>

        {/* 4 CORE DIGITAL MUNICIPALITY MODULES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/digital-tanur"
            className="bg-white rounded-2xl border border-[#EDE6D8] p-4.5 hover:border-[#194B35] hover:shadow-md transition group flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#194B35] flex items-center justify-center mb-2.5 group-hover:bg-[#194B35] group-hover:text-white transition">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#194B35]">
                {language === "ml" ? "ഡിജിറ്റൽ താനൂർ ജി.ഐ.എസ്" : "Digital Tanur (GIS)"}
              </h3>
              <p className="text-xs text-[#5C6A64] mt-1">
                {language === "ml" ? "30+ പ്രധാന പൊതു കേന്ദ്രങ്ങൾ, സ്കൂളുകൾ, ആരോഗ്യ കേന്ദ്രങ്ങൾ മാപ്പിൽ കാണാം." : "Interactive GIS map with 30+ public facilities."}
              </p>
            </div>
            <span className="text-[11px] font-bold text-[#194B35] mt-3 inline-flex items-center gap-1">
              {language === "ml" ? "മാപ്പ് തുറക്കുക" : "Open GIS Map"} →
            </span>
          </Link>

          <Link
            href="/development"
            className="bg-white rounded-2xl border border-[#EDE6D8] p-4.5 hover:border-[#194B35] hover:shadow-md transition group flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-[#C39A5B] flex items-center justify-center mb-2.5 group-hover:bg-[#C39A5B] group-hover:text-white transition">
                <HardHat className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#194B35]">
                {language === "ml" ? "വികസന ട്രാക്കർ" : "Development Tracker"}
              </h3>
              <p className="text-xs text-[#5C6A64] mt-1">
                {language === "ml" ? "45 വാർഡുകളിലെ ₹86.60 കോടിയുടെ വികസന പദ്ധതികൾ ട്രാക്ക് ചെയ്യാം." : "Track ₹86.60 Cr verified municipal works across 45 wards."}
              </p>
            </div>
            <span className="text-[11px] font-bold text-[#C39A5B] mt-3 inline-flex items-center gap-1">
              {language === "ml" ? "പദ്ധതികൾ കാണുക" : "Track Projects"} →
            </span>
          </Link>

          <Link
            href="/civic"
            className="bg-white rounded-2xl border border-[#EDE6D8] p-4.5 hover:border-[#194B35] hover:shadow-md transition group flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-2.5 group-hover:bg-orange-600 group-hover:text-white transition">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#194B35]">
                {language === "ml" ? "സിവിക് കണക്ട്" : "Civic Connect"}
              </h3>
              <p className="text-xs text-[#5C6A64] mt-1">
                {language === "ml" ? "റോഡ്, ഡ്രെയിനേജ്, ശുചിത്വ പരാതികൾ അറിയിക്കാം, പരിഹാരം അറിയാം." : "Report roads, drainage, waste issues and track resolution."}
              </p>
            </div>
            <span className="text-[11px] font-bold text-orange-600 mt-3 inline-flex items-center gap-1">
              {language === "ml" ? "പരാതി രജിസ്റ്റർ ചെയ്യാം" : "Report Issue"} →
            </span>
          </Link>

          <Link
            href="/peoples-voice"
            className="bg-white rounded-2xl border border-[#EDE6D8] p-4.5 hover:border-[#194B35] hover:shadow-md transition group flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2.5 group-hover:bg-blue-600 group-hover:text-white transition">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#194B35]">
                {language === "ml" ? "ജനകീയ ശബ്ദം" : "People's Voice"}
              </h3>
              <p className="text-xs text-[#5C6A64] mt-1">
                {language === "ml" ? "താനൂരിന്റെ വികസനത്തിന് നിങ്ങളുടെ നിർദ്ദേശങ്ങളും ആശയങ്ങളും പങ്കുവെക്കാം." : "Citizen participation platform for Tanur's community ideas."}
              </p>
            </div>
            <span className="text-[11px] font-bold text-blue-600 mt-3 inline-flex items-center gap-1">
              {language === "ml" ? "പങ്കാളിയാകൂ" : "Join Discussion"} →
            </span>
          </Link>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex items-center gap-2 border-b border-[#EAE4D7] pb-2 overflow-x-auto">
          {[
            { id: "overview", label: "പൊതു അവലോകനം (Overview)", icon: Building2 },
            { id: "map", label: "പ്രാദേശിക മാപ്പ് (Local Map)", icon: MapIcon },
            { id: "services", label: "അടിയന്തര & പൊതു സേവനങ്ങൾ (Public Services)", icon: Phone },
            { id: "places", label: "പ്രധാന സ്ഥലങ്ങൾ (Places & Heritage)", icon: Landmark },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  isSelected
                    ? "bg-[#1B4D36] text-white shadow-xs"
                    : "text-[#5C6A64] hover:bg-[#F3EFE6] hover:text-[#1A2420]"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Tanur Municipal Office Card */}
              <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 shadow-card space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-[#E0F1E7] text-[#1B4D36] flex items-center justify-center">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#1A2420] font-malayalam-serif">
                      താനൂർ നഗരസഭ കാര്യാലയം
                    </h3>
                    <p className="text-[11px] text-[#7A8880]">Tanur Municipal Office</p>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs text-[#4A5750] border-t border-[#F3EFE6] pt-3">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#1B4D36] shrink-0 mt-0.5" />
                    <span>മെയിൻ റോഡ്, താനൂർ, മലപ്പുറം ജില്ല, പിൻ: 676302</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#1B4D36] shrink-0" />
                    <span>തിങ്കൾ - ശനി: 10:00 AM - 05:00 PM (ഞായർ അവധി)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#1B4D36] shrink-0" />
                    <span className="font-semibold text-[#1A2420]">0494 2440228</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <Link
                    href="/community?tab=issues"
                    className="flex-1 py-2 px-3 rounded-xl bg-[#FAF4E6] text-[#8C5B0F] border border-[#DDD5C5] text-center text-xs font-bold hover:bg-[#F3EFE6] transition"
                  >
                    പൗര പ്രശ്നങ്ങൾ അറിയിക്കുക
                  </Link>
                  <Link
                    href="/tanur"
                    className="flex-1 py-2 px-3 rounded-xl bg-[#1B4D36] text-white text-center text-xs font-bold hover:bg-[#133A28] transition"
                  >
                    വിശദമായ പ്രൊഫൈൽ
                  </Link>
                </div>
              </div>

              {/* Public Representative Card */}
              <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 shadow-card space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/e/e0/P_K_Navas_Portrait.jpg"
                    alt="P. K. Navas MLA"
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-[#1B4D36] shrink-0"
                    onError={(e) => {
                      (e.target as any).src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80";
                    }}
                  />
                  <div>
                    <span className="text-[10px] font-bold text-[#1B4D36] bg-[#E0F1E7] px-2 py-0.5 rounded-md">
                      ജനപ്രതിനിധി (MLA)
                    </span>
                    <h3 className="font-bold text-base text-[#1A2420] font-malayalam-serif mt-1">
                      പി. കെ. നവാസ്
                    </h3>
                    <p className="text-[11px] text-[#7A8880]">താനൂർ നിയമസഭാ മണ്ഡലം</p>
                  </div>
                </div>

                <p className="text-xs text-[#5C6A64] font-malayalam-body leading-relaxed border-t border-[#F3EFE6] pt-3">
                  താനൂർ നിയോജകമണ്ഡലത്തെ പ്രതിനിധീകരിക്കുന്ന നിയമസഭാംഗം. തീരദേശ വികസനം, റോഡ് നവീകരണം, കുടിവെള്ള പദ്ധതികൾ എന്നിവയിൽ സജീവ ഇടപെടലുകൾ.
                </p>

                <div className="pt-2">
                  <Link
                    href="/politics/pk-navas"
                    className="w-full py-2.5 px-4 rounded-xl bg-[#1B4D36] text-white text-center text-xs font-bold hover:bg-[#133A28] transition flex items-center justify-center gap-1.5"
                  >
                    <span>പൂർണ്ണ രാഷ്ട്രീയ ചരിത്രവും റിപ്പോർട്ടും കാണുക</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>

            {/* Quick Explore Links to Tanur Sections */}
            <div className="bg-[#FAF4E6] rounded-3xl border border-[#E8DCBF] p-6">
              <h3 className="text-base font-bold font-malayalam-serif text-[#1B4D36] mb-4">
                താനൂരിന്റെ സമഗ്ര വിഭാഗങ്ങൾ പര്യവേക്ഷണം ചെയ്യൂ
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { title: "ചരിത്രവും പൈതൃകവും", href: "/tanur/history", desc: "പഴയകാല തുറമുഖ ചരിത്രം" },
                  { title: "പ്രകൃതിയും കടലും", href: "/tanur/nature", desc: "തീരദേശവും ജലാശയങ്ങളും" },
                  { title: "തദ്ദേശീയ സമ്പദ്‌വ്യവസ്ഥ", href: "/tanur/economy", desc: "മത്സ്യബന്ധനവും വാണിജ്യവും" },
                  { title: "സന്ദർശന സ്ഥലങ്ങൾ", href: "/tanur/places", desc: "ബീച്ച് & സ്മാരകങ്ങൾ" },
                ].map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    className="bg-white rounded-xl p-3.5 border border-[#DDD5C5] hover:border-[#1B4D36] hover:shadow-sm transition group"
                  >
                    <h4 className="font-bold text-xs text-[#1A2420] group-hover:text-[#1B4D36] font-malayalam-serif">
                      {item.title}
                    </h4>
                    <p className="text-[10px] text-[#7A8880] mt-0.5">{item.desc}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LOCAL MAP */}
        {activeTab === "map" && (
          <div className="space-y-4">
            <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 shadow-card">
              <div className="mb-4">
                <h3 className="text-base font-bold font-malayalam-serif text-[#1B4D36]">
                  താനൂർ നഗരസഭ സമഗ്ര മാപ്പ്
                </h3>
                <p className="text-xs text-[#5C6A64]">
                  പ്രധാന സർക്കാർ സ്ഥാപനങ്ങൾ, ആരോഗ്യ കേന്ദ്രങ്ങൾ, ബീച്ച്, വിദ്യാലയങ്ങൾ എന്നിവ മാപ്പിൽ കാണാം.
                </p>
              </div>
              <CommunityMap />
            </div>
          </div>
        )}

        {/* TAB 3: PUBLIC SERVICES */}
        {activeTab === "services" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold font-malayalam-serif text-[#1B4D36]">
                  അടിയന്തര & പൊതു സേവന ഹെൽപ്‌ലൈനുകൾ
                </h3>
                <p className="text-xs text-[#5C6A64]">
                  താനൂരിലെ പ്രാഥമിക ആരോഗ്യ കേന്ദ്രം, പോലീസ്, ഫയർഫോഴ്സ്, കെ.എസ്.ഇ.ബി നമ്പറുകൾ.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {publicServices.map((svc) => (
                <div
                  key={svc.id}
                  className="bg-white rounded-2xl border border-[#EAE4D7] p-4 shadow-xs space-y-2 hover:shadow-card transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#1B4D36] bg-[#E0F1E7] px-2 py-0.5 rounded-md">
                      {svc.category_ml}
                    </span>
                    {svc.is_verified && (
                      <span className="text-[10px] font-semibold text-emerald-700 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        വെരിഫൈഡ്
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-sm text-[#1A2420]">{svc.name_ml}</h4>
                  <p className="text-xs text-[#5C6A64] line-clamp-1">{svc.address}</p>
                  
                  <div className="pt-2 border-t border-[#F3EFE6] flex items-center justify-between">
                    <span className="text-xs text-[#7A8880]">{svc.working_hours}</span>
                    <a
                      href={`tel:${svc.phone}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#1B4D36] text-white text-xs font-bold hover:bg-[#133A28] transition"
                    >
                      <Phone className="w-3 h-3" />
                      <span>{svc.phone}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PLACES & HERITAGE */}
        {activeTab === "places" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold font-malayalam-serif text-[#1B4D36]">
                  താനൂരിലെ പ്രധാന സ്ഥലങ്ങളും സ്മാരകങ്ങളും
                </h3>
                <p className="text-xs text-[#5C6A64]">
                  ചരിത്ര പ്രസിദ്ധമായ ആരാധനാലയങ്ങൾ, തീരദേശങ്ങൾ, സന്ദർശന കേന്ദ്രങ്ങൾ.
                </p>
              </div>
              <Link href="/gallery" className="text-xs font-bold text-[#1B4D36] hover:underline">
                ഫോട്ടോ ഗാലറി →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {places.map((place) => (
                <div key={place.id} className="bg-white rounded-2xl border border-[#EAE4D7] overflow-hidden shadow-xs hover:shadow-card transition">
                  <div className="h-40 w-full relative bg-[#E5DDD0]">
                    <img
                      src={place.image_url || "https://upload.wikimedia.org/wikipedia/commons/6/67/Tanur%2C_Malappuram_district.jpg"}
                      alt={place.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-2 left-2 text-[10px] font-bold bg-black/60 text-white px-2 py-0.5 rounded-md backdrop-blur-xs">
                      {place.category}
                    </span>
                  </div>
                  <div className="p-4 space-y-1.5">
                    <h4 className="font-bold text-sm text-[#1A2420] font-malayalam-serif">{place.name}</h4>
                    <p className="text-xs text-[#5C6A64] line-clamp-2">{place.description}</p>
                    <p className="text-[11px] text-[#7A8880] pt-1">📍 {place.location_name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
