"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
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
  Phone,
  Users,
  Megaphone,
  CreditCard,
  FileCheck2,
  HelpCircle,
  Search,
  MessageSquareQuote
} from "lucide-react";

export default function HomePage() {
  const { language } = useLanguage();
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  // Real Database Records
  const projects = useMemo(() => digitalMunicipalityStore.getProjects().slice(0, 4), []);
  const civicIssues = useMemo(() => civicStore.getIssues().slice(0, 4), []);
  const documents = useMemo(() => TANUR_MUNICIPAL_DOCUMENTS.slice(0, 4), []);

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
      accent: "bg-emerald-50 text-[#194B35] border-emerald-200",
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
      accent: "bg-amber-50 text-amber-900 border-amber-200",
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

  // 2. OVERLAPPING QUICK ACTIONS BAR (Exact match to reference mockup)
  const quickActions = [
    {
      id: "qa-tax",
      title: "Pay Property Tax",
      title_ml: "വസ്തുനികുതി അടയ്ക്കുക",
      sub: "K-Smart online tax",
      sub_ml: "കെ-സ്മാർട്ട് ഓൺലൈൻ",
      href: "/public-services",
      icon: CreditCard,
      color: "text-emerald-700 bg-emerald-50 border-emerald-200"
    },
    {
      id: "qa-cert",
      title: "Apply Certificate",
      title_ml: "സർട്ടിഫിക്കറ്റ് അപേക്ഷ",
      sub: "Birth, death, marriage",
      sub_ml: "ജനന, മരണ, വിവാഹം",
      href: "/public-services",
      icon: FileCheck2,
      color: "text-blue-700 bg-blue-50 border-blue-200"
    },
    {
      id: "qa-grievance",
      title: "File Grievance",
      title_ml: "പരാതി രജിസ്റ്റർ",
      sub: "Track with ID",
      sub_ml: "ഐഡി ഉപയോഗിച്ച് ട്രാക്ക് ചെയ്യാം",
      href: "/civic-connect",
      icon: AlertTriangle,
      color: "text-orange-700 bg-orange-50 border-orange-200"
    },
    {
      id: "qa-progress",
      title: "View Progress",
      title_ml: "പദ്ധതി പുരോഗതി",
      sub: "Verified MB records",
      sub_ml: "ഔദ്യോഗിക എം.ബി. രേഖകൾ",
      href: "/development-tracker",
      icon: HardHat,
      color: "text-amber-800 bg-amber-50 border-amber-200"
    },
    {
      id: "qa-help",
      title: "Get Help",
      title_ml: "സഹായ കേന്ദ്രം",
      sub: "0494 2440228",
      sub_ml: "0494 2440228",
      href: "tel:04942440228",
      icon: Phone,
      color: "text-[#194B35] bg-emerald-50/70 border-emerald-200"
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] flex flex-col font-sans selection:bg-[#C39A5B]/30 selection:text-[#194B35]">
      <Navbar onOpenSearchAi={() => setIsAiModalOpen(true)} />

      <main id="main-content" className="flex-1 space-y-16 sm:space-y-24 pb-20">
        
        {/* ========================================================================= */}
        {/* 1. HERO SECTION: EDITORIAL KERALA MUNICIPAL EXPERIENCE                    */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex flex-col justify-between pt-8 sm:pt-14 pb-20 sm:pb-28">
          
          {/* Authentic Kerala Heritage Architectural Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/tanur-heritage-hero.jpg"
              alt="Tanur Municipality Heritage Architecture"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
            />
            {/* Multi-layered Editorial Gradient Overlay for Perfect Contrast & Mood */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#194B35]/95 via-[#194B35]/85 to-[#194B35]/40 md:to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#194B35] via-transparent to-[#194B35]/30 md:hidden" />
            <div className="absolute inset-0 bg-black/15 pointer-events-none" />
          </div>

          {/* Hero Content Container */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Confident Editorial Typography & Primary CTAs */}
              <div className="lg:col-span-7 space-y-6 text-white text-left">
                
                {/* Statutory Citizen-Centric Pill */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-[#F5E2B8] text-xs font-bold border border-white/20 shadow-sm">
                  <Building2 className="w-3.5 h-3.5 text-[#C39A5B]" />
                  <span>
                    {language === "ml" 
                      ? "താനൂർ നഗരസഭ — പൗര കേന്ദ്രീകൃത ഡിജിറ്റൽ വേദി" 
                      : "Tanur Municipality — Citizen-Centric Civic Technology"}
                  </span>
                </div>

                {/* Confident Headline */}
                <div className="space-y-3">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.08] font-malayalam-heading">
                    <span>{language === "ml" ? "ഒരുമിച്ച്, കൂടുതൽ" : "Together for a"}</span>
                    <br />
                    <span className="text-[#F3CE7A] drop-shadow-sm">
                      {language === "ml" ? "കാര്യക്ഷമമായ താനൂരിനായി" : "Smarter Tanur"}
                    </span>
                  </h1>

                  <p className="text-lg sm:text-xl font-bold text-[#F5E2B8] font-malayalam-heading">
                    {language === "ml" 
                      ? "ഡിജിറ്റൽ സേവനങ്ങൾ. സുതാര്യ ഭരണം. പുരോഗമന നഗരസഭ." 
                      : "Digital Services. Transparent Governance. A Progressive Municipality."}
                  </p>

                  <p className="text-white/85 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
                    {language === "ml"
                      ? "താനൂർ നിവാസികൾക്കായി ഔദ്യോഗിക സേവനങ്ങൾ, 44 വാർഡ് വിവരങ്ങൾ, വികസന പദ്ധതി നിരീക്ഷണം, പരാതി പരിഹാരം എന്നിവ ഒരു കുടക്കീഴിൽ ലഭ്യമാക്കുന്ന ആധികാരിക ഡിജിറ്റൽ സംവിധാനം."
                      : "A modern digital municipality platform where residents can access statutory services, monitor ward infrastructure, verify development milestones, and actively participate in civic governance."}
                  </p>
                </div>

                {/* Primary Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    href="/public-services"
                    className="px-6 py-3.5 bg-[#C39A5B] hover:bg-[#b08849] text-[#194B35] font-black text-xs sm:text-sm rounded-2xl shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center gap-2 group"
                  >
                    <span>{language === "ml" ? "സേവനങ്ങൾ അറിയുക" : "Explore Services"}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href="/civic-connect"
                    className="px-5 py-3.5 bg-white/15 hover:bg-white/25 backdrop-blur-md text-white font-bold text-xs sm:text-sm rounded-2xl border border-white/25 transition flex items-center gap-2 shadow-sm"
                  >
                    <AlertTriangle className="w-4 h-4 text-[#F3CE7A]" />
                    <span>{language === "ml" ? "പരാതി രജിസ്റ്റർ" : "Report a Civic Issue"}</span>
                  </Link>

                  <button
                    onClick={() => setIsAiModalOpen(true)}
                    className="px-4 py-3.5 bg-black/20 hover:bg-black/30 backdrop-blur-md text-[#F5E2B8] font-bold text-xs sm:text-sm rounded-2xl border border-[#C39A5B]/30 transition flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-[#F3CE7A]" />
                    <span>{language === "ml" ? "നാട് AI" : "Ask Naadu AI"}</span>
                  </button>
                </div>

                {/* Small Trust & Statutory Indicator */}
                <div className="pt-4 border-t border-white/15 flex flex-wrap items-center gap-4 text-xs text-white/70">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#F3CE7A]" />
                    <span>100% Documented Sources</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#F3CE7A]" />
                    <span>Central Switchboard: <a href="tel:04942440228" className="text-[#F3CE7A] font-bold hover:underline">0494 2440228</a></span>
                  </div>
                  <span className="hidden sm:inline">•</span>
                  <div className="hidden sm:flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#F3CE7A]" />
                    <span>44 Mapped Wards</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Floating Frosted Quick Cards (Desktop/Tablet) */}
              <div className="lg:col-span-5 hidden sm:block space-y-3.5">
                {[
                  {
                    title: "Citizen Services",
                    title_ml: "പൗര സേവനങ്ങൾ",
                    sub: "Online & Easy via K-Smart portal",
                    sub_ml: "കെ-സ്മാർട്ട് വഴി ലളിതമായി",
                    href: "/public-services",
                    icon: Briefcase,
                    color: "text-[#C39A5B] bg-[#C39A5B]/15 border-[#C39A5B]/30"
                  },
                  {
                    title: "Grievance Redressal",
                    title_ml: "പരാതി പരിഹാരം",
                    sub: "Track issues with real-time updates",
                    sub_ml: "തത്സമയ ട്രാക്കിംഗ് ഐഡി വഴി",
                    href: "/civic-connect",
                    icon: AlertTriangle,
                    color: "text-orange-400 bg-orange-500/15 border-orange-500/30"
                  },
                  {
                    title: "Municipal Updates",
                    title_ml: "നഗരസഭാ വാർത്തകൾ",
                    sub: "Council resolutions & public gazettes",
                    sub_ml: "കൗൺസിൽ തീരുമാനങ്ങളും വിജ്ഞാപനങ്ങളും",
                    href: "/digital-municipality",
                    icon: Building2,
                    color: "text-emerald-400 bg-emerald-500/15 border-emerald-500/30"
                  }
                ].map((card, idx) => {
                  const Icon = card.icon;
                  return (
                    <Link
                      key={idx}
                      href={card.href}
                      className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 hover:border-[#C39A5B]/50 transition-all flex items-center justify-between group shadow-lg"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center border shrink-0 ${card.color} group-hover:scale-105 transition-transform`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-sm font-malayalam-heading group-hover:text-[#F3CE7A] transition-colors">
                            {language === "ml" ? card.title_ml : card.title}
                          </h3>
                          <p className="text-white/70 text-xs">
                            {language === "ml" ? card.sub_ml : card.sub}
                          </p>
                        </div>
                      </div>

                      <ChevronRight className="w-4 h-4 text-white/50 group-hover:text-[#F3CE7A] group-hover:translate-x-1 transition-all" />
                    </Link>
                  );
                })}
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. OVERLAPPING QUICK ACCESS BAR                                           */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 relative z-20">
          <div className="bg-white rounded-3xl border border-[#EDE6D8] p-3 sm:p-4 shadow-xl">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {quickActions.map((qa) => {
                const Icon = qa.icon;
                return (
                  <Link
                    key={qa.id}
                    href={qa.href}
                    className="p-3.5 sm:p-4 rounded-2xl bg-[#FAF7F0] hover:bg-white border border-[#EDE6D8] hover:border-[#194B35] hover:shadow-md transition-all flex flex-col items-center text-center gap-2.5 group"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 group-hover:scale-110 transition-transform ${qa.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#194B35] font-malayalam-heading group-hover:text-[#123626]">
                        {language === "ml" ? qa.title_ml : qa.title}
                      </h4>
                      <p className="text-[11px] text-[#5C6A64] mt-0.5 hidden sm:block">
                        {language === "ml" ? qa.sub_ml : qa.sub}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. ABOUT TANUR: OUR HISTORY, OUR PRIDE (EDITORIAL COMPOSITION)            */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-[#EDE6D8] overflow-hidden shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              
              {/* Left Column: Visual Asset of Tanur's Coast & Heritage */}
              <div className="lg:col-span-5 relative min-h-[260px] sm:min-h-[340px] lg:min-h-full">
                <Image
                  src="/images/tanur-coastal-pride.jpg"
                  alt="Tanur Coastline and Maritime Heritage"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
                <div className="absolute bottom-4 left-4 right-4 text-white lg:hidden">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md">
                    Heritage & Geography
                  </span>
                  <h3 className="text-lg font-bold font-malayalam-heading mt-1">
                    {language === "ml" ? "താനൂരിന്റെ സാംസ്കാരിക പൈതൃകം" : "Our History, Our Pride"}
                  </h3>
                </div>
              </div>

              {/* Right Column: Municipal Context & Verified Stats */}
              <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#C39A5B]">
                      {language === "ml" ? "നഗരസഭാ സംക്ഷിപ്തം" : "About Tanur Municipality"}
                    </span>
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#FAF7F0] text-[#194B35] border border-[#EDE6D8]">
                      Grade II ULB • LSGD
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-[#194B35] font-malayalam-heading">
                    {language === "ml" ? "നമ്മുടെ ചരിത്രം, നമ്മുടെ അഭിമാനം" : "Our History, Our Pride"}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#5C6A64] leading-relaxed">
                    {language === "ml"
                      ? "മലപ്പുറം ജില്ലയിലെ ചരിത്ര പ്രസിദ്ധമായ തീരദേശ നഗരസഭയാണ് താനൂർ. 44 വാർഡുകളിലായി 19.59 ചതുരശ്ര കിലോമീറ്റർ വിസ്തൃതിയിൽ വ്യാപിച്ചുകിടക്കുന്ന ഈ നാട് സമ്പന്നമായ മത്സ്യബന്ധന പാരമ്പര്യവും, വ്യാപാര ബന്ധങ്ങളും, സാംസ്കാരിക സൗഹാർദ്ദവും കാത്തുസൂക്ഷിക്കുന്നു."
                      : "Tanur is a historic coastal urban local body in Malappuram district, Kerala. Covering 19.59 km² across 44 statutory wards, it blends centuries of maritime trade, renowned fisheries heritage, and rapid modern civic progress."}
                  </p>
                </div>

                {/* Key Facts Metric Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-[#EDE6D8]">
                  <div className="p-3 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8]">
                    <div className="text-xl sm:text-2xl font-black text-[#194B35] font-mono">44</div>
                    <div className="text-[11px] text-[#5C6A64] font-medium">{language === "ml" ? "വാർഡുകൾ" : "Statutory Wards"}</div>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8]">
                    <div className="text-xl sm:text-2xl font-black text-[#194B35] font-mono">19.59</div>
                    <div className="text-[11px] text-[#5C6A64] font-medium">{language === "ml" ? "ചതുരശ്ര കി.മീ" : "Area (km²)"}</div>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8]">
                    <div className="text-xl sm:text-2xl font-black text-[#194B35] font-mono">69,864</div>
                    <div className="text-[11px] text-[#5C6A64] font-medium">{language === "ml" ? "ജനസംഖ്യ (2011)" : "Population (2011)"}</div>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8]">
                    <div className="text-xl sm:text-2xl font-black text-[#194B35] font-mono">48+</div>
                    <div className="text-[11px] text-[#5C6A64] font-medium">{language === "ml" ? "മാപ്പ് ചെയ്ത സ്ഥാപനങ്ങൾ" : "Mapped Facilities"}</div>
                  </div>
                </div>

                {/* Direct Action Link */}
                <div className="pt-2 flex items-center justify-between">
                  <Link
                    href="/digital-municipality"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#194B35] hover:text-[#123626] group"
                  >
                    <span>{language === "ml" ? "താനൂർ ജി.ഐ.എസ് മാപ്പും വാർഡുകളും കാണുക" : "Explore Tanur GIS Map & Ward Directory"}</span>
                    <ArrowRight className="w-4 h-4 text-[#C39A5B] group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <span className="text-[11px] text-gray-400 font-mono hidden sm:inline">
                    Code: 0494
                  </span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. THE SIX PRIMARY PUBLIC FEATURES                                        */}
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
        {/* 5. IMPORTANT MUNICIPAL ANNOUNCEMENTS                                      */}
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
        {/* 6. RECENTLY UPDATED DEVELOPMENT PROJECTS                                  */}
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
        {/* 7. LATEST CIVIC ISSUES & TRACKING PREVIEW                                  */}
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
        {/* 8. PUBLIC DOCUMENTS & OFFICIAL NOTICES                                    */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between border-b border-[#EDE6D8] pb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#7C3AED]" />
              <h2 className="text-xl sm:text-2xl font-bold text-[#194B35] font-malayalam-heading">
                {language === "ml" ? "ഔദ്യോഗിക രേഖകളും ഗസറ്റ് വിജ്ഞാപനങ്ങളും" : "Public Documents & Official Notices"}
              </h2>
            </div>

            <Link
              href="/documents"
              className="text-xs font-bold text-[#194B35] hover:underline flex items-center gap-1"
            >
              <span>{language === "ml" ? "എല്ലാ രേഖകളും" : "View All Documents"}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-3xl border border-[#EDE6D8] p-5 shadow-xs flex items-start justify-between gap-4 hover:border-[#194B35] hover:shadow-md transition"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 text-[10px]">
                    <span className="font-bold px-2 py-0.5 rounded-full bg-[#FAF7F0] text-[#194B35] border border-[#EDE6D8]">
                      {doc.category_name}
                    </span>
                    <span className="text-gray-400 font-mono">{doc.publication_date}</span>
                    {doc.reference_number && (
                      <span className="text-gray-400 font-mono hidden sm:inline">• Ref: {doc.reference_number}</span>
                    )}
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
                  className="px-3.5 py-2 bg-[#FAF7F0] hover:bg-[#194B35] hover:text-white text-[#194B35] font-bold text-xs rounded-xl border border-[#EDE6D8] shrink-0 flex items-center gap-1 transition"
                >
                  <span>{doc.file_format || "PDF"}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 9. NAADU AI ASSISTANT SPOTLIGHT                                           */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#194B35] via-[#153E2C] to-[#0E281C] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
            {/* Ambient subtle glow */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#C39A5B]/20 blur-3xl pointer-events-none" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#F5E2B8] text-xs font-bold border border-white/20">
                  <Sparkles className="w-3.5 h-3.5 text-[#F3CE7A]" />
                  <span>{language === "ml" ? "നാട് AI — മുനിസിപ്പൽ ഇന്റലിജൻസ്" : "Naadu AI — Municipal Intelligence"}</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-black font-malayalam-heading leading-tight">
                  {language === "ml" 
                    ? "താനൂർ നഗരസഭാ സംശയങ്ങൾക്ക് തത്സമയ മറുപടി" 
                    : "Instant Municipal Guidance in Malayalam & English"}
                </h2>

                <p className="text-white/80 text-xs sm:text-sm leading-relaxed max-w-2xl">
                  {language === "ml"
                    ? "കെട്ടിട നികുതി ചട്ടങ്ങൾ, ജനന-മരണ സർട്ടിഫിക്കറ്റ് അപേക്ഷാ രീതി, വാർഡ് കൗൺസിലർ ഫോൺ നമ്പറുകൾ, കൺട്രോൾ റൂം വിവരങ്ങൾ എന്നിവ നാട് AI-യോട് ചോദിക്കാം."
                    : "Ask questions about property tax rates, building permit procedures, ward boundaries, office timings, or official document requirements. Powered by verified Tanur municipal records."}
                </p>

                {/* Example Prompts Pills */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  {[
                    language === "ml" ? "താനൂർ ഹാർബർ പദ്ധതിയുടെ ബജറ്റ് എത്ര?" : "What is the budget for Tanur Harbour?",
                    language === "ml" ? "കെട്ടിട നികുതി അടയ്ക്കുന്നതെങ്ങനെ?" : "How to pay property tax online?",
                    language === "ml" ? "നഗരസഭാ ഓഫീസ് സമയം എപ്പോഴാണ്?" : "Municipal office timings?"
                  ].map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => setIsAiModalOpen(true)}
                      className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[11px] font-medium border border-white/15 transition text-left text-white/90"
                    >
                      &ldquo;{prompt}&rdquo;
                    </button>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
                <button
                  onClick={() => setIsAiModalOpen(true)}
                  className="w-full sm:w-auto px-8 py-4 bg-[#C39A5B] hover:bg-[#b08849] text-[#194B35] font-black text-sm rounded-2xl shadow-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{language === "ml" ? "നാട് AI തുറക്കുക" : "Open Naadu AI Assistant"}</span>
                </button>
                <span className="text-[11px] text-white/60 mt-2">
                  {language === "ml" ? "സൗജന്യ പൗര സേവനം" : "Free Citizen Service • 24/7"}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 9. PEOPLE'S VOICE CITIZEN PARTICIPATION BANNER                            */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-[#EDE6D8] p-8 sm:p-10 text-[#194B35] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Feature 06: Citizen Participation</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-malayalam-heading">
                {language === "ml" ? "നിങ്ങളുടെ നാട്, നിങ്ങളുടെ ശബ്ദം!" : "Your Locality, Your Voice!"}
              </h2>
              <p className="text-[#5C6A64] text-xs sm:text-sm leading-relaxed">
                {language === "ml"
                  ? "താനൂരിന്റെ വികസനത്തിനായി പുതിയ ആശയങ്ങൾ നിർദ്ദേശിക്കുക, പൊതു ചർച്ചകളിൽ പങ്കെടുക്കുക, പ്രദേശവാസികളുടെ പിന്തുണയോടെ കമ്മ്യൂണിറ്റി സംരംഭങ്ങൾ ആരംഭിക്കുക."
                  : "Submit public improvement suggestions, discuss local infrastructure, and build consensus with your neighbors on Tanur's future."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <Link
                href="/peoples-voice/ideas/new"
                className="w-full sm:w-auto px-6 py-3.5 bg-[#194B35] hover:bg-[#123626] text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md transition text-center"
              >
                {language === "ml" ? "ആശയം സമർപ്പിക്കുക" : "Submit Idea"}
              </Link>

              <Link
                href="/peoples-voice"
                className="w-full sm:w-auto px-6 py-3.5 bg-[#FAF7F0] hover:bg-neutral-100 text-[#194B35] font-bold text-xs sm:text-sm rounded-2xl border border-[#EDE6D8] transition text-center"
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
