"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { NaaduAiModal } from "@/components/ai/NaaduAiModal";
import { useLanguage } from "@/lib/i18n/context";
import { digitalMunicipalityStore } from "@/lib/data/digitalMunicipalityData";
import { civicStore } from "@/lib/data/civicConnectData";
import { TANUR_MUNICIPAL_DOCUMENTS } from "@/lib/data/documentsData";
import { TANUR_MUNICIPAL_SERVICES } from "@/lib/data/publicServicesData";
import { peoplesVoiceStore } from "@/lib/data/peoplesVoiceData";
import { 
  Building2, 
  AlertTriangle, 
  HardHat, 
  Briefcase, 
  FileText, 
  TrendingUp, 
  ArrowRight, 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  ChevronRight, 
  Clock, 
  Sparkles,
  ExternalLink,
  Info,
  Compass,
  Coins,
  Send,
  Eye,
  Megaphone
} from "lucide-react";

export default function HomePage() {
  const { language } = useLanguage();
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  // Real Database Records
  const projects = useMemo(() => digitalMunicipalityStore.getProjects().slice(0, 4), []);
  const civicIssues = useMemo(() => civicStore.getIssues().slice(0, 4), []);
  const documents = useMemo(() => TANUR_MUNICIPAL_DOCUMENTS.slice(0, 4), []);
  const ideas = useMemo(() => peoplesVoiceStore.getIdeas().slice(0, 3), []);

  // 1. THE SIX CORE FEATURES SPECIFICATION
  const coreFeatures = [
    {
      id: "feat-01",
      number: "01",
      title: "Digital Municipality",
      title_ml: "ഡിജിറ്റൽ നഗരസഭ",
      href: "/digital-municipality",
      icon: Building2,
      color: "#194B35",
      accent: "bg-emerald-50 text-emerald-800 border-emerald-200",
      description: "Central municipal information hub: leadership hierarchy, all 44 wards, administrative departments, and Google Maps Platform GIS.",
      description_ml: "ഭരണ നേതൃത്വം, 44 വാർഡുകൾ, വകുപ്പുകൾ, ഗൂഗിൾ മാപ്പ് ജി.ഐ.എസ് എന്നിവ ഉൾക്കൊള്ളുന്ന വിവര കേന്ദ്രം.",
      actionLabel: "Explore Municipality",
      actionLabel_ml: "നഗരസഭയെ അറിയുക",
    },
    {
      id: "feat-02",
      number: "02",
      title: "Civic Connect",
      title_ml: "സിവിക് കണക്ട്",
      href: "/civic-connect",
      icon: AlertTriangle,
      color: "#EA580C",
      accent: "bg-orange-50 text-orange-800 border-orange-200",
      description: "Report local civic issues, track progress with unique tracking IDs, and follow documented authority forwarding records.",
      description_ml: "റോഡ്, മാലിന്യം, തെരുവ് വിളക്ക് പരാതികൾ റിപ്പോർട്ട് ചെയ്യുക; ട്രാക്കിംഗ് ഐഡി വഴി പുരോഗതി പരിശോധിക്കുക.",
      actionLabel: "Report or Track Issue",
      actionLabel_ml: "പരാതി രജിസ്റ്റർ ചെയ്യുക",
    },
    {
      id: "feat-03",
      number: "03",
      title: "Development Tracker",
      title_ml: "വികസന പദ്ധതി ട്രാക്കർ",
      href: "/development-tracker",
      icon: HardHat,
      color: "#C39A5B",
      accent: "bg-amber-50 text-amber-800 border-amber-200",
      description: "Transparent public monitoring directory for Tanur development projects: sanctioned budgets, timelines, and verified milestone progress.",
      description_ml: "അനുവദിച്ച ബജറ്റ്, സമയക്രമം, നിർമ്മാണ പുരോഗതി, ഗസറ്റ് രേഖകൾ എന്നിവ സുതാര്യമായി നിരീക്ഷിക്കുക.",
      actionLabel: "Track Projects",
      actionLabel_ml: "പദ്ധതികൾ നിരീക്ഷിക്കുക",
    },
    {
      id: "feat-04",
      number: "04",
      title: "Public Services",
      title_ml: "പൗര സേവന സൂചിക",
      href: "/public-services",
      icon: Briefcase,
      color: "#1E3A8A",
      accent: "bg-blue-50 text-blue-800 border-blue-200",
      description: "Official procedures, required document checklists, office hours, and direct K-Smart application links for municipal services.",
      description_ml: "ജനന-മരണ രജിസ്ട്രേഷൻ, പെർമിറ്റുകൾ, നികുതികൾ എന്നിവയ്ക്കുള്ള ചട്ടങ്ങളും കെ-സ്മാർട്ട് ഔദ്യോഗിക ലിങ്കുകളും.",
      actionLabel: "View Services Directory",
      actionLabel_ml: "സേവന ചട്ടങ്ങൾ കാണുക",
    },
    {
      id: "feat-05",
      number: "05",
      title: "Documents & Notices",
      title_ml: "രേഖകളും ഉത്തരവുകളും",
      href: "/documents",
      icon: FileText,
      color: "#7C3AED",
      accent: "bg-purple-50 text-purple-800 border-purple-200",
      description: "Searchable repository of municipal council decisions, annual development budgets, e-tenders, government orders, and downloadable forms.",
      description_ml: "കൗൺസിൽ തീരുമാനങ്ങൾ, വാർഷിക ബജറ്റ്, ഇ-ടെണ്ടറുകൾ, സർക്കാർ ഉത്തരവുകൾ (G.O.), അപേക്ഷാ ഫോറങ്ങൾ.",
      actionLabel: "Search Documents",
      actionLabel_ml: "രേഖകൾ പരിശോധിക്കുക",
    },
    {
      id: "feat-06",
      number: "06",
      title: "People's Voice",
      title_ml: "ജനകീയ ശബ്ദം",
      href: "/peoples-voice",
      icon: TrendingUp,
      color: "#059669",
      accent: "bg-teal-50 text-teal-800 border-teal-200",
      description: "Citizen participation platform for proposing community improvement ideas, discussing local needs, and tracking civic initiatives.",
      description_ml: "പ്രാദേശിക വികസന ആശയങ്ങൾ പങ്കുവെക്കാനും പൊതു ചർച്ചകളിൽ ഭാഗമാകാനുമുള്ള ജനകീയ ഇടം.",
      actionLabel: "Share an Idea",
      actionLabel_ml: "ആശയങ്ങൾ പങ്കുവെക്കുക",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] flex flex-col font-sans">
      <Navbar onOpenSearchAi={() => setIsAiModalOpen(true)} />

      <main className="flex-1 space-y-12 sm:space-y-18 pb-16">
        {/* ========================================================================= */}
        {/* 1. PREMIUM HERO SECTION: OUR NATION — TANUR MUNICIPALITY                  */}
        {/* ========================================================================= */}
        <section className="relative bg-[#194B35] text-white overflow-hidden py-16 sm:py-24">
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-[#C39A5B]/15 pointer-events-none blur-3xl" />
          <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-white/5 pointer-events-none blur-2xl" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold border border-white/20">
              <Building2 className="w-4 h-4 text-amber-300" />
              <span>
                {language === "ml" 
                  ? "താനൂർ നഗരസഭ — പൗര കേന്ദ്രീകൃത ഡിജിറ്റൽ വേദി" 
                  : "Tanur Municipality — Citizen-Centric Civic Technology"}
              </span>
            </div>

            <div className="space-y-3 max-w-4xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight font-malayalam-heading leading-tight">
                {language === "ml" ? "ഔർ നേഷൻ താനൂർ" : "OUR NATION TANUR"}
              </h1>
              <p className="text-xl sm:text-2xl font-bold text-amber-300 font-malayalam-heading">
                {language === "ml" ? "നമ്മുടെ ജനങ്ങൾ. നമ്മുടെ നാട്. നമ്മുടെ ഭാവി." : "Our People. Our Place. Our Future."}
              </p>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-3xl">
                {language === "ml"
                  ? "നഗരസഭാ വിവരങ്ങൾ അറിയാനും, പ്രാദേശിക പ്രശ്നങ്ങൾ അധികൃതരുടെ ശ്രദ്ധയിൽപ്പെടുത്താനും, വികസന പദ്ധതികൾ നിരീക്ഷിക്കാനും, പൗരസേവനങ്ങൾ സുഗമമായി പ്രയോജനപ്പെടുത്താനുമുള്ള സമഗ്ര ഡിജിറ്റൽ സംവിധാനം."
                  : "A unified digital municipality platform where residents can access verified public information, report local civic issues, follow development projects, access official documents, and participate in community decision-making."}
              </p>
            </div>

            {/* Quick Action CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/digital-municipality"
                className="px-6 py-3.5 bg-[#C39A5B] hover:bg-[#b08849] text-[#194B35] font-black text-xs sm:text-sm rounded-2xl shadow-lg transition flex items-center gap-2"
              >
                <span>{language === "ml" ? "നഗരസഭയെ അറിയുക" : "Explore Digital Municipality"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/civic-connect"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-2xl border border-white/20 transition flex items-center gap-2"
              >
                <AlertTriangle className="w-4 h-4 text-amber-300" />
                <span>{language === "ml" ? "പരാതി രജിസ്റ്റർ ചെയ്യുക" : "Report a Civic Issue"}</span>
              </Link>

              <button
                onClick={() => setIsAiModalOpen(true)}
                className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-amber-300 font-bold text-xs sm:text-sm rounded-2xl border border-amber-300/30 transition flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{language === "ml" ? "നാട് AI അസിസ്റ്റന്റ്" : "Ask Naadu AI"}</span>
              </button>
            </div>

            {/* Independent Platform Disclaimer */}
            <div className="pt-4 border-t border-white/10 text-[11px] text-white/60 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span>
                {language === "ml"
                  ? "ഔർ നേഷൻ ഒരു സ്വതന്ത്ര പൗര സാങ്കേതിക പ്ലാറ്റ്‌ഫോമാണ്. ഔദ്യോഗിക ഗസറ്റ് ഉത്തരവുകൾക്ക് സർക്കാരിന്റെ ഔദ്യോഗിക പോർട്ടലുകൾ പരിശോധിക്കുക."
                  : "OUR NATION is an independent civic technology platform. All public information reflects documented official sources."}
              </span>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. THE SIX CORE FEATURES CARDS GRID                                       */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EDE6D8] pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C39A5B] block">
                {language === "ml" ? "പ്രധാന ആറ് സ്തംഭങ്ങൾ" : "Core Architecture"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#194B35] font-malayalam-heading">
                {language === "ml" ? "ആറ് അടിസ്ഥാന പൗര സേവനങ്ങൾ" : "The Six Primary Public Features"}
              </h2>
            </div>
            <p className="text-xs text-[#5C6A64] max-w-md">
              {language === "ml"
                ? "താനൂർ നിവാസികൾക്കായി തികച്ചും പ്രയോജനപ്രദമായ ആറ് കേന്ദ്രീകൃത മൊഡ്യൂളുകൾ."
                : "The entire OUR NATION platform is reorganized exclusively around these six public features."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreFeatures.map((feat) => {
              const Icon = feat.icon;
              return (
                <Link
                  key={feat.id}
                  href={feat.href}
                  className="bg-white rounded-3xl border border-[#EDE6D8] p-6 shadow-sm hover:shadow-xl hover:border-[#194B35] transition-all group flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-4">
                    {/* Top Pill & Icon */}
                    <div className="flex items-center justify-between">
                      <div 
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-xs group-hover:scale-105 transition-transform"
                        style={{ backgroundColor: feat.color }}
                      >
                        <Icon className="w-6 h-6" />
                      </div>

                      <span className="font-mono text-xs font-bold text-gray-400">
                        FEATURE {feat.number}
                      </span>
                    </div>

                    {/* Title */}
                    <div>
                      <h3 className="text-xl font-bold text-[#194B35] font-malayalam-heading group-hover:text-[#123626]">
                        {language === "ml" ? feat.title_ml : feat.title}
                      </h3>
                      <p className="text-xs text-[#5C6A64] mt-2 leading-relaxed">
                        {language === "ml" ? feat.description_ml : feat.description}
                      </p>
                    </div>
                  </div>

                  {/* Action Link Button */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#194B35]">
                    <span>{language === "ml" ? feat.actionLabel_ml : feat.actionLabel}</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#C39A5B]" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. IMPORTANT MUNICIPAL ANNOUNCEMENTS                                      */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between border-b border-[#EDE6D8] pb-3">
            <div className="flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-[#C39A5B]" />
              <h2 className="text-xl sm:text-2xl font-bold text-[#194B35] font-malayalam-heading">
                {language === "ml" ? "നഗരസഭാ ഔദ്യോഗിക അറിയിപ്പുകൾ" : "Important Municipal Announcements"}
              </h2>
            </div>

            <Link
              href="/digital-municipality"
              className="text-xs font-bold text-[#194B35] hover:underline flex items-center gap-1"
            >
              <span>{language === "ml" ? "എല്ലാ അറിയിപ്പുകളും" : "View All"}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                id: "anc-home-1",
                title: "Pre-Monsoon Sanitation & Haritha Karma Sena Collection Schedule",
                title_ml: "മൺസൂൺ പൂർവ്വ ശുചീകരണം & ഹരിത കർമ്മസേന വാർഡ് ഡ്രൈവ്",
                department: "Health & Sanitation Wing",
                date: "2024-11-12",
                href: "/digital-municipality"
              },
              {
                id: "anc-home-2",
                title: "Tanur Fishing Harbour Inner Basin Desiltation e-Tender",
                title_ml: "താനൂർ ഫിഷിംഗ് ഹാർബർ ആഴം കൂട്ടൽ ഇ-ടെണ്ടർ വിജ്ഞാപനം",
                department: "LID & EW Engineering Wing",
                date: "2024-11-04",
                href: "/documents"
              },
              {
                id: "anc-home-3",
                title: "Coastal Regulation Zone (CRZ) Compliance Directive for Wards 3, 4, 11",
                title_ml: "തീരദേശ വാർഡുകളിലെ കെട്ടിട നിർമ്മാണത്തിന് CRZ അനുമതി നിർബന്ധം",
                department: "Town Planning Wing",
                date: "2024-09-12",
                href: "/documents"
              }
            ].map(anc => (
              <Link
                key={anc.id}
                href={anc.href}
                className="p-5 rounded-3xl bg-white border border-[#EDE6D8] shadow-xs hover:border-[#194B35] hover:shadow-md transition space-y-2 block"
              >
                <div className="flex items-center justify-between text-[11px] text-gray-400">
                  <span>{anc.department}</span>
                  <span>{anc.date}</span>
                </div>
                <h3 className="font-bold text-sm text-[#194B35] font-malayalam-heading line-clamp-2">
                  {language === "ml" ? anc.title_ml : anc.title}
                </h3>
                <span className="text-[11px] font-bold text-[#C39A5B] flex items-center gap-1 pt-1">
                  <span>Read Notice</span>
                  <ChevronRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. RECENTLY UPDATED DEVELOPMENT PROJECTS                                  */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between border-b border-[#EDE6D8] pb-3">
            <div className="flex items-center gap-2">
              <HardHat className="w-5 h-5 text-[#C39A5B]" />
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#194B35] font-malayalam-heading">
                  {language === "ml" ? "വികസന പദ്ധതി പുരോഗതി" : "Recently Updated Development Projects"}
                </h2>
              </div>
            </div>

            <Link
              href="/development-tracker"
              className="text-xs font-bold text-[#194B35] hover:underline flex items-center gap-1"
            >
              <span>{language === "ml" ? "മുഴുവൻ പദ്ധതികളും" : "View Directory"}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {projects.map((proj) => {
              const pct = proj.progress_percentage ?? proj.completion_percentage ?? 0;
              return (
                <Link
                  key={proj.id}
                  href={`/development/projects/${proj.id}`}
                  className="bg-white rounded-3xl border border-[#EDE6D8] p-5 shadow-xs hover:border-[#194B35] hover:shadow-md transition flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-bold px-2 py-0.5 rounded-full bg-[#FAF7F0] text-[#194B35] border border-[#EDE6D8]">
                        {proj.category_name}
                      </span>
                      <span className="font-bold text-emerald-800">{proj.status}</span>
                    </div>

                    <h3 className="font-bold text-sm text-[#194B35] font-malayalam-heading line-clamp-2">
                      {language === "ml" ? proj.title_ml : proj.title}
                    </h3>

                    <p className="text-[11px] text-[#5C6A64] line-clamp-2">
                      {proj.locality} {proj.ward_number ? `(Ward ${proj.ward_number})` : ""}
                    </p>
                  </div>

                  <div className="space-y-1 pt-2 border-t border-gray-100">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-gray-800">{proj.budget_sanctioned}</span>
                      <span className="font-bold text-[#194B35]">{pct}% Done</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full bg-[#194B35]" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. LATEST CIVIC ISSUES & TRACKING PREVIEW                                  */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between border-b border-[#EDE6D8] pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#EA580C]" />
              <h2 className="text-xl sm:text-2xl font-bold text-[#194B35] font-malayalam-heading">
                {language === "ml" ? "ഏറ്റവും പുതിയ സിവിക് റിപ്പോർട്ടുകൾ" : "Latest Civic Issue Reports"}
              </h2>
            </div>

            <Link
              href="/civic-connect"
              className="text-xs font-bold text-[#194B35] hover:underline flex items-center gap-1"
            >
              <span>{language === "ml" ? "എല്ലാ പരാതികളും" : "Browse All"}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {civicIssues.map((issue) => (
              <Link
                key={issue.id}
                href={`/civic/issues/${issue.id}`}
                className="bg-white rounded-3xl border border-[#EDE6D8] p-5 shadow-xs hover:border-[#194B35] hover:shadow-md transition flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#FAF7F0] text-[#194B35] border border-[#EDE6D8]">
                      {issue.tracking_id}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {issue.status}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-[#194B35] font-malayalam-heading line-clamp-2">
                    {language === "ml" ? issue.title_ml : issue.title}
                  </h3>

                  <p className="text-[11px] text-[#5C6A64] line-clamp-2">
                    📍 {issue.locality} — {issue.address_landmark}
                  </p>
                </div>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
                  <span>{issue.support_count} Support</span>
                  <span className="text-[#194B35] font-bold flex items-center gap-0.5">
                    View <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. IMPORTANT PUBLIC NOTICES & COUNCIL DECISIONS                            */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between border-b border-[#EDE6D8] pb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#7C3AED]" />
              <h2 className="text-xl sm:text-2xl font-bold text-[#194B35] font-malayalam-heading">
                {language === "ml" ? "പ്രധാന രേഖകളും കൗൺസിൽ തീരുമാനങ്ങളും" : "Public Documents & Council Decisions"}
              </h2>
            </div>

            <Link
              href="/documents"
              className="text-xs font-bold text-[#194B35] hover:underline flex items-center gap-1"
            >
              <span>{language === "ml" ? "എല്ലാ രേഖകളും" : "View All"}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-3xl border border-[#EDE6D8] p-5 shadow-xs flex items-start justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 text-[10px]">
                    <span className="font-bold px-2 py-0.5 rounded-full bg-[#FAF7F0] text-[#194B35] border border-[#EDE6D8]">
                      {doc.category_name}
                    </span>
                    <span className="text-gray-400">{doc.publication_date}</span>
                  </div>

                  <h3 className="font-bold text-sm text-[#194B35] font-malayalam-heading line-clamp-2">
                    {language === "ml" ? doc.title_ml : doc.title}
                  </h3>

                  <p className="text-[11px] text-[#5C6A64] line-clamp-2">
                    {doc.description}
                  </p>
                </div>

                <a
                  href={doc.download_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-[#FAF7F0] hover:bg-neutral-100 text-[#194B35] font-bold text-xs rounded-xl border border-[#EDE6D8] shrink-0 flex items-center gap-1"
                >
                  <span>{doc.file_format || "PDF"}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. PEOPLE'S VOICE CITIZEN PARTICIPATION BANNER                             */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#194B35] to-[#143E2C] rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold border border-white/20">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Feature 06: Citizen Participation</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-malayalam-heading">
                {language === "ml" ? "നിങ്ങളുടെ നാട്, നിങ്ങളുടെ ശബ്ദം!" : "Your Locality, Your Voice!"}
              </h2>
              <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                {language === "ml"
                  ? "താനൂരിന്റെ വികസനത്തിനായി പുതിയ ആശയങ്ങൾ നിർദ്ദേശിക്കുക, പൊതു ചർച്ചകളിൽ പങ്കെടുക്കുക, പ്രദേശവാസികളുടെ പിന്തുണയോടെ കമ്മ്യൂണിറ്റി സംരംഭങ്ങൾ ആരംഭിക്കുക."
                  : "Submit public improvement suggestions, discuss local infrastructure, and build consensus with your neighbors on Tanur's future."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <Link
                href="/peoples-voice/ideas/new"
                className="w-full sm:w-auto px-6 py-3 bg-[#C39A5B] hover:bg-[#b08849] text-[#194B35] font-black text-xs sm:text-sm rounded-2xl shadow-md transition text-center"
              >
                {language === "ml" ? "ആശയം സമർപ്പിക്കുക" : "Submit Idea"}
              </Link>

              <Link
                href="/peoples-voice"
                className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-2xl border border-white/20 transition text-center"
              >
                {language === "ml" ? "ചർച്ചകളിൽ പങ്കുചേരുക" : "Explore Discussions"}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BottomNav />

      {/* Naadu AI Assistant Floating Modal */}
      <NaaduAiModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />
    </div>
  );
}
