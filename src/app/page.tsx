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
  MessageSquareQuote,
  Landmark
} from "lucide-react";

export default function HomePage() {
  const { language } = useLanguage();
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  // Real Database Records
  const projects = useMemo(() => digitalMunicipalityStore.getProjects().slice(0, 4), []);
  const civicIssues = useMemo(() => civicStore.getIssues().slice(0, 4), []);
  const documents = useMemo(() => TANUR_MUNICIPAL_DOCUMENTS.slice(0, 4), []);

  // 1. THE SIX CORE FEATURES SPECIFICATION (Simple English)
  const coreFeatures = [
    {
      id: "feat-01",
      number: "01",
      title: "Tanur Municipality",
      href: "/digital-municipality",
      icon: Building2,
      color: "#194B35",
      accent: "bg-emerald-50 text-[#194B35] border-emerald-200",
      description: "Find your local ward, elected councillors, municipal departments, and town map.",
      actionLabel: "View Municipality",
    },
    {
      id: "feat-02",
      number: "02",
      title: "Report an Issue",
      href: "/civic-connect",
      icon: AlertTriangle,
      color: "#EA580C",
      accent: "bg-orange-50 text-orange-800 border-orange-200",
      description: "Report road repairs, streetlight faults, or waste issues and track status updates.",
      actionLabel: "Report or Track Issue",
    },
    {
      id: "feat-03",
      number: "03",
      title: "Track Projects",
      href: "/development-tracker",
      icon: HardHat,
      color: "#C39A5B",
      accent: "bg-amber-50 text-amber-900 border-amber-200",
      description: "Follow local development projects, approved budgets, work timelines, and progress.",
      actionLabel: "View Projects",
    },
    {
      id: "feat-04",
      number: "04",
      title: "Municipal Services",
      href: "/public-services",
      icon: Briefcase,
      color: "#1E3A8A",
      accent: "bg-blue-50 text-blue-800 border-blue-200",
      description: "Simple steps, required documents, and direct links to apply for town services.",
      actionLabel: "View Services",
    },
    {
      id: "feat-05",
      number: "05",
      title: "Notices & Documents",
      href: "/documents",
      icon: FileText,
      color: "#7C3AED",
      accent: "bg-purple-50 text-purple-800 border-purple-200",
      description: "Read town council decisions, yearly budgets, public tenders, and download forms.",
      actionLabel: "View Documents",
    },
    {
      id: "feat-06",
      number: "06",
      title: "Share Your Ideas",
      href: "/peoples-voice",
      icon: TrendingUp,
      color: "#059669",
      accent: "bg-teal-50 text-teal-800 border-teal-200",
      description: "Suggest ideas to improve our town, join community discussions, and take part.",
      actionLabel: "Share an Idea",
    },
  ];

  // 2. OVERLAPPING QUICK ACTIONS BAR (Simple English)
  const quickActions = [
    {
      id: "qa-tax",
      title: "Pay Property Tax",
      sub: "Online tax payment",
      href: "/public-services",
      icon: CreditCard,
      color: "text-emerald-700 bg-emerald-50 border-emerald-200"
    },
    {
      id: "qa-cert",
      title: "Apply Certificate",
      sub: "Birth, death, marriage",
      href: "/public-services",
      icon: FileCheck2,
      color: "text-blue-700 bg-blue-50 border-blue-200"
    },
    {
      id: "qa-grievance",
      title: "Report an Issue",
      sub: "Track with your ID",
      href: "/civic-connect",
      icon: AlertTriangle,
      color: "text-orange-700 bg-orange-50 border-orange-200"
    },
    {
      id: "qa-progress",
      title: "Track Projects",
      sub: "Work progress & budgets",
      href: "/development-tracker",
      icon: HardHat,
      color: "text-amber-800 bg-amber-50 border-amber-200"
    },
    {
      id: "qa-help",
      title: "Get Help",
      sub: "Call 0494 2440228",
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
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 lg:gap-12 items-center">
              
              {/* Left Column: Confident Editorial Typography & Primary CTAs */}
              <div className="md:col-span-7 space-y-6 text-white text-left">
                
                {/* Statutory Citizen-Centric Pill */}
                <div 
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-[#F5E2B8] text-xs font-bold border border-white/20 shadow-sm"
                  data-ulb="താനൂർ നഗരസഭ"
                  aria-label="Tanur Municipality (താനൂർ നഗരസഭ)"
                >
                  <Building2 className="w-3.5 h-3.5 text-[#C39A5B]" />
                  <span>Tanur Municipality — Official Citizen Portal</span>
                </div>

                {/* Confident Headline */}
                <div className="space-y-3">
                  <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] font-sans">
                    <span>Together for a</span>
                    <br />
                    <span className="text-[#F3CE7A] drop-shadow-sm">
                      Smarter Tanur
                    </span>
                  </h1>

                  <p className="text-base sm:text-lg lg:text-xl font-bold text-[#F5E2B8] font-sans">
                    Easy Services. Transparent Governance. A Better Community.
                  </p>

                  <p className="text-white/85 text-xs sm:text-sm lg:text-base leading-relaxed max-w-xl font-normal">
                    A simple digital platform for Tanur residents to access official services, report local problems, follow development projects, and stay updated.
                  </p>
                </div>

                {/* Primary Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    href="/public-services"
                    className="px-6 py-3.5 bg-[#C39A5B] hover:bg-[#b08849] text-[#194B35] font-black text-xs sm:text-sm rounded-2xl shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center gap-2 group min-h-[48px]"
                  >
                    <span>View Services</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href="/civic-connect"
                    className="px-5 py-3.5 bg-white/15 hover:bg-white/25 backdrop-blur-md text-white font-bold text-xs sm:text-sm rounded-2xl border border-white/25 transition flex items-center gap-2 shadow-sm min-h-[48px]"
                  >
                    <AlertTriangle className="w-4 h-4 text-[#F3CE7A]" />
                    <span>Report an Issue</span>
                  </Link>

                  <button
                    onClick={() => setIsAiModalOpen(true)}
                    className="px-4 py-3.5 bg-black/20 hover:bg-black/30 backdrop-blur-md text-[#F5E2B8] font-bold text-xs sm:text-sm rounded-2xl border border-[#C39A5B]/30 transition flex items-center gap-2 min-h-[48px]"
                  >
                    <Sparkles className="w-4 h-4 text-[#F3CE7A]" />
                    <span>Ask Naadu AI</span>
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

              {/* Right Column: Floating Frosted Quick Cards (Desktop & Tablet) */}
              <div className="md:col-span-5 hidden md:block space-y-3.5">
                {[
                  {
                    title: "Municipal Services",
                    sub: "Online certificate and tax services",
                    href: "/public-services",
                    icon: Briefcase,
                    color: "text-[#C39A5B] bg-[#C39A5B]/15 border-[#C39A5B]/30"
                  },
                  {
                    title: "Report an Issue",
                    sub: "Roads, lights and waste with live tracking",
                    href: "/civic-connect",
                    icon: AlertTriangle,
                    color: "text-orange-400 bg-orange-500/15 border-orange-500/30"
                  },
                  {
                    title: "Notices & Updates",
                    sub: "Council decisions and official notices",
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
                        <div className="text-left">
                          <h3 className="text-white font-bold text-sm font-sans group-hover:text-[#F3CE7A] transition-colors">
                            {card.title}
                          </h3>
                          <p className="text-white/70 text-xs">
                            {card.sub}
                          </p>
                        </div>
                      </div>

                      <ChevronRight className="w-4 h-4 text-white/50 group-hover:text-[#F3CE7A] group-hover:translate-x-1 transition-all shrink-0" />
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
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-14 sm:-mt-18 lg:-mt-20 relative z-20">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#EDE6D8] p-3 sm:p-4 shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
              {quickActions.map((qa) => {
                const Icon = qa.icon;
                return (
                  <Link
                    key={qa.id}
                    href={qa.href}
                    className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#FAF7F0] hover:bg-white border border-[#EDE6D8] hover:border-[#194B35] hover:shadow-md transition-all flex items-center gap-3 text-left group min-h-[56px]"
                  >
                    <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center border shrink-0 group-hover:scale-105 transition-transform ${qa.color}`}>
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs sm:text-sm font-bold text-[#194B35] font-sans truncate group-hover:text-[#123626]">
                        {qa.title}
                      </h4>
                      <p className="text-[10px] sm:text-[11px] text-[#5C6A64] truncate">
                        {qa.sub}
                      </p>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-[#C39A5B] opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0 hidden sm:block" />
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
                  <h3 className="text-lg font-bold font-sans mt-1">
                    Our History, Our Pride
                  </h3>
                </div>
              </div>

              {/* Right Column: Municipal Context & Verified Stats */}
              <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#C39A5B]">
                      About Tanur Municipality
                    </span>
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#FAF7F0] text-[#194B35] border border-[#EDE6D8]">
                      Grade II ULB • LSGD
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-[#194B35] font-sans">
                    Our History, Our Pride
                  </h2>

                  <p className="text-xs sm:text-sm text-[#5C6A64] leading-relaxed">
                    Tanur is a historic coastal urban local body in Malappuram district, Kerala. Covering 19.59 km² across 44 statutory wards, it blends centuries of maritime trade, renowned fisheries heritage, and rapid modern civic progress.
                  </p>
                </div>

                {/* Key Facts Metric Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-[#EDE6D8]">
                  <div className="p-3.5 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] text-left">
                    <div className="text-xl sm:text-2xl font-black text-[#194B35] font-mono">44</div>
                    <div className="text-[11px] text-[#5C6A64] font-medium">Statutory Wards</div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] text-left">
                    <div className="text-xl sm:text-2xl font-black text-[#194B35] font-mono">19.59</div>
                    <div className="text-[11px] text-[#5C6A64] font-medium">Area (km²)</div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] text-left">
                    <div className="text-xl sm:text-2xl font-black text-[#194B35] font-mono">69,864</div>
                    <div className="text-[11px] text-[#5C6A64] font-medium">Population (2011)</div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] text-left">
                    <div className="text-xl sm:text-2xl font-black text-[#194B35] font-mono">48+</div>
                    <div className="text-[11px] text-[#5C6A64] font-medium">Mapped Facilities</div>
                  </div>
                </div>

                {/* Direct Action Links */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-[#EDE6D8]/60">
                  <Link
                    href="/digital-municipality"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#194B35] hover:text-[#123626] group"
                  >
                    <span>Explore Tanur GIS Map &amp; Ward Directory</span>
                    <ArrowRight className="w-4 h-4 text-[#C39A5B] group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href="/local-governments"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#C39A5B] hover:text-[#194B35] group"
                  >
                    <Landmark className="w-3.5 h-3.5 text-[#C39A5B]" />
                    <span>Explore Local Governments Directory</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
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
                Core Architecture
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#194B35] font-sans">
                The Six Primary Public Features
              </h2>
            </div>
            <p className="text-xs text-[#5C6A64] max-w-md">
              The entire OUR NATION platform is organized simply around these six public features.
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
                      <h3 className="text-xl font-bold text-[#194B35] font-sans group-hover:text-[#123626]">
                        {feat.title}
                      </h3>
                      <p className="text-xs text-[#5C6A64] mt-2 leading-relaxed">
                        {feat.description}
                      </p>
                    </div>
                  </div>

                  {/* Action Link Button */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#194B35]">
                    <span>{feat.actionLabel}</span>
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
              <h2 className="text-xl sm:text-2xl font-bold text-[#194B35] font-sans">
                Important Municipal Announcements
              </h2>
            </div>

            <Link
              href="/digital-municipality"
              className="text-xs font-bold text-[#194B35] hover:underline flex items-center gap-1"
            >
              <span>View All Notices</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                id: "anc-home-1",
                title: "Pre-Monsoon Sanitation & Haritha Karma Sena Collection Schedule",
                department: "Health & Sanitation Wing",
                date: "2024-11-12",
                href: "/digital-municipality"
              },
              {
                id: "anc-home-2",
                title: "Tanur Fishing Harbour Inner Basin Desiltation e-Tender",
                department: "LID & EW Engineering Wing",
                date: "2024-11-04",
                href: "/documents"
              },
              {
                id: "anc-home-3",
                title: "Coastal Regulation Zone (CRZ) Compliance Directive for Wards 3, 4, 11",
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
                <h3 className="font-bold text-sm text-[#194B35] font-sans line-clamp-2">
                  {anc.title}
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
                <h2 className="text-xl sm:text-2xl font-bold text-[#194B35] font-sans">
                  Recently Updated Development Projects
                </h2>
              </div>
            </div>

            <Link
              href="/development-tracker"
              className="text-xs font-bold text-[#194B35] hover:underline flex items-center gap-1"
            >
              <span>View All Projects</span>
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

                    <h3 className="font-bold text-sm text-[#194B35] font-sans line-clamp-2">
                      {proj.title}
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
        {/* 7. LATEST CIVIC ISSUES & TRACKING STATUS (CIVIC CONNECT)                 */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between border-b border-[#EDE6D8] pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#EA580C]" />
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#194B35] font-sans">
                  Latest Civic Issue Reports (Civic Connect)
                </h2>
              </div>
            </div>

            <Link
              href="/civic-connect"
              className="text-xs font-bold text-[#194B35] hover:underline flex items-center gap-1"
            >
              <span>Browse All Issues</span>
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

                  <h3 className="font-bold text-sm text-[#194B35] font-sans line-clamp-2">
                    {issue.title}
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
              <h2 className="text-xl sm:text-2xl font-bold text-[#194B35] font-sans">
                Public Documents &amp; Official Notices
              </h2>
            </div>

            <Link
              href="/documents"
              className="text-xs font-bold text-[#194B35] hover:underline flex items-center gap-1"
            >
              <span>View All Documents</span>
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

                  <h3 className="font-bold text-sm text-[#194B35] font-sans line-clamp-2">
                    {doc.title}
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
                  <span>Naadu AI — Municipal Intelligence</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-black font-sans leading-tight">
                  Instant Municipal Guidance in Plain English
                </h2>

                <p className="text-white/80 text-xs sm:text-sm leading-relaxed max-w-2xl">
                  Ask questions about property tax rates, building permit procedures, ward boundaries, office timings, or official document requirements. Powered by verified Tanur municipal records.
                </p>

                {/* Example Prompts Pills */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  {[
                    "What is the budget for Tanur Harbour?",
                    "How to pay property tax online?",
                    "Municipal office timings?"
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
                  <span>Open Naadu AI Assistant</span>
                </button>
                <span className="text-[11px] text-white/60 mt-2">
                  Free Citizen Service • 24/7
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
                <span>Feature 06: Citizen Participation • {"People's Voice"}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-sans">
                Your Community, Your Voice!
              </h2>
              <p className="text-[#5C6A64] text-xs sm:text-sm leading-relaxed">
                Submit public improvement suggestions, discuss local infrastructure, and build consensus with your neighbors on Tanur&apos;s future.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <Link
                href="/peoples-voice/ideas/new"
                className="w-full sm:w-auto px-6 py-3.5 bg-[#194B35] hover:bg-[#123626] text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md transition text-center"
              >
                Submit Idea
              </Link>

              <Link
                href="/peoples-voice"
                className="w-full sm:w-auto px-6 py-3.5 bg-[#FAF7F0] hover:bg-neutral-100 text-[#194B35] font-bold text-xs sm:text-sm rounded-2xl border border-[#EDE6D8] transition text-center"
              >
                Explore Discussions
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
