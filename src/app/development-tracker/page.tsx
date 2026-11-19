"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { useLanguage } from "@/lib/i18n/context";
import { 
  digitalMunicipalityStore, 
  TRANSPARENT_PROJECT_CATEGORIES
} from "@/lib/data/digitalMunicipalityData";
import { DevelopmentProject, ProjectStatus } from "@/types/digitalMunicipality";
import { VerificationBadge, DataSourcesNotice } from "@/components/common/VerificationBadge";
import { 
  HardHat, 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  ExternalLink, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  PauseCircle, 
  Sparkles, 
  TrendingUp, 
  FileText,
  ChevronRight,
  Layers,
  Coins,
  Building2,
  Check
} from "lucide-react";

export default function DevelopmentTrackerPage() {
  const { language } = useLanguage();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedLocality, setSelectedLocality] = useState<string>("all");

  const projects = useMemo(() => digitalMunicipalityStore.getProjects(), []);
  const localities = useMemo(() => digitalMunicipalityStore.getLocalities(), []);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      if (selectedCategory !== "all" && p.category !== selectedCategory) return false;
      if (selectedStatus !== "all" && p.status !== selectedStatus) return false;
      if (selectedLocality !== "all" && p.locality !== selectedLocality) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(q) || p.title_ml.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q) || p.description_ml.toLowerCase().includes(q);
        const matchesLoc = p.locality?.toLowerCase().includes(q) || p.department.toLowerCase().includes(q);
        return matchesTitle || matchesDesc || matchesLoc;
      }
      return true;
    });
  }, [projects, selectedCategory, selectedStatus, selectedLocality, searchQuery]);

  // Statistics from actual verified database records
  const stats = useMemo(() => {
    return {
      total: projects.length,
      approved: projects.filter(p => p.status === "Approved").length,
      inProgress: projects.filter(p => p.status === "In Progress").length,
      completed: projects.filter(p => p.status === "Completed").length,
      delayed: projects.filter(p => p.status === "Delayed" || p.status === "On Hold").length,
      proposed: projects.filter(p => p.status === "Proposed" || p.status === "Announced").length,
    };
  }, [projects]);

  const statusColorMap: Record<ProjectStatus, { bg: string; text: string; border: string }> = {
    Proposed: { bg: "bg-purple-50", text: "text-purple-800", border: "border-purple-200" },
    Announced: { bg: "bg-blue-50", text: "text-blue-800", border: "border-blue-200" },
    Approved: { bg: "bg-teal-50", text: "text-teal-800", border: "border-teal-200" },
    "In Progress": { bg: "bg-amber-50", text: "text-amber-800", border: "border-amber-200" },
    Completed: { bg: "bg-emerald-50", text: "text-emerald-800", border: "border-emerald-200" },
    Delayed: { bg: "bg-red-50", text: "text-red-800", border: "border-red-200" },
    "On Hold": { bg: "bg-gray-100", text: "text-gray-800", border: "border-gray-300" },
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] flex flex-col font-sans selection:bg-[#194B35]/20 selection:text-[#194B35]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 w-full">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: language === "ml" ? "ഹോം" : "Home", href: "/" },
            { label: language === "ml" ? "വികസന പദ്ധതി ട്രാക്കർ" : "Development Tracker" },
          ]}
        />

        {/* ========================================================================= */}
        {/* 1. HERO SECTION (Kerala Municipal Waterfront Style)                       */}
        {/* ========================================================================= */}
        <div className="relative rounded-3xl sm:rounded-[36px] bg-gradient-to-br from-[#FAF7F0] via-[#F5F1E7] to-[#EDE6D8] border border-[#EDE6D8] p-6 sm:p-10 shadow-xs overflow-hidden">
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#194B35_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8">
            <div className="space-y-3 sm:space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#194B35]/10 text-[#194B35] text-xs font-bold border border-[#194B35]/20">
                <HardHat className="w-4 h-4 text-[#194B35]" />
                <span>{language === "ml" ? "സുതാര്യമായ താനൂർ വികസന നിരീക്ഷണം" : "Development Project Monitoring • Feature 03"}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#194B35] tracking-tight font-malayalam-heading leading-tight">
                {language === "ml" ? "വികസന പദ്ധതി ട്രാക്കർ" : "Development Tracker"}
              </h1>

              <p className="text-xs sm:text-sm text-[#5C6A64] leading-relaxed">
                {language === "ml"
                  ? "താനൂർ നഗരസഭയിലെ ഔദ്യോഗിക വികസന പദ്ധതികൾ, അനുവദിച്ച ബജറ്റ്, സമയക്രമം, നിർമ്മാണ പുരോഗതി, ഗസറ്റ് രേഖകൾ എന്നിവ സുതാര്യമായി പരിശോധിക്കുക. അനുമാനങ്ങളില്ലാതെ അളവുപുസ്തകം (MB) അടിസ്ഥാനമാക്കിയുള്ള വിവരങ്ങൾ."
                  : "A transparent public monitoring directory for Tanur Municipality development projects. Follow sanctioned budgets, milestones, contractors, verified progress updates, and completion evidence."}
              </p>

              {/* Action CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href="/documents"
                  className="px-5 py-2.5 rounded-2xl bg-[#194B35] hover:bg-[#123626] text-white text-xs sm:text-sm font-bold shadow-sm hover:shadow transition flex items-center gap-2"
                >
                  <FileText className="w-4 h-4 text-amber-300" />
                  <span>{language === "ml" ? "ടെൻഡർ & ബജറ്റ് രേഖകൾ" : "Tender & Budget Records"}</span>
                </Link>

                <Link
                  href="/digital-municipality"
                  className="px-5 py-2.5 rounded-2xl bg-white hover:bg-[#FAF7F0] text-[#194B35] border border-[#EDE6D8] text-xs sm:text-sm font-bold shadow-2xs transition flex items-center gap-2"
                >
                  <Building2 className="w-4 h-4 text-[#C39A5B]" />
                  <span>{language === "ml" ? "നഗരസഭാ ഭൂപടത്തിൽ കാണുക" : "View on GIS Map"}</span>
                </Link>
              </div>
            </div>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-2 gap-3 w-full lg:w-80 shrink-0">
              <div className="p-3.5 bg-white rounded-2xl border border-[#EDE6D8] shadow-2xs space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#C39A5B] block">Total Registered</span>
                <span className="text-xl sm:text-2xl font-black text-[#194B35]">{stats.total}</span>
                <span className="text-[11px] text-[#5C6A64] block">Official Projects</span>
              </div>
              <div className="p-3.5 bg-white rounded-2xl border border-[#EDE6D8] shadow-2xs space-y-1">
                <span className="text-[10px] uppercase font-bold text-teal-700 block">Approved</span>
                <span className="text-xl sm:text-2xl font-black text-teal-800">{stats.approved}</span>
                <span className="text-[11px] text-[#5C6A64] block">Admin Sanction</span>
              </div>
              <div className="p-3.5 bg-white rounded-2xl border border-[#EDE6D8] shadow-2xs space-y-1">
                <span className="text-[10px] uppercase font-bold text-amber-700 block">In Progress</span>
                <span className="text-xl sm:text-2xl font-black text-amber-800">{stats.inProgress}</span>
                <span className="text-[11px] text-[#5C6A64] block">Active Execution</span>
              </div>
              <div className="p-3.5 bg-white rounded-2xl border border-[#EDE6D8] shadow-2xs space-y-1">
                <span className="text-[10px] uppercase font-bold text-emerald-700 block">Completed</span>
                <span className="text-xl sm:text-2xl font-black text-emerald-800">{stats.completed}</span>
                <span className="text-[11px] text-[#5C6A64] block">Commissioned</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. CATEGORY PILLS BAR (Visual Reference Quick Access Strip)                */}
        {/* ========================================================================= */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[#EDE6D8]">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              selectedCategory === "all"
                ? "bg-[#194B35] text-white shadow-xs"
                : "bg-white text-[#5C6A64] hover:bg-[#FAF7F0] border border-[#EDE6D8]"
            }`}
          >
            {language === "ml" ? "എല്ലാ പദ്ധതികളും" : "All Projects"} ({projects.length})
          </button>

          {TRANSPARENT_PROJECT_CATEGORIES.map(c => {
            const isActive = selectedCategory === c.key;
            const count = projects.filter(p => p.category === c.key).length;
            return (
              <button
                key={c.key}
                onClick={() => setSelectedCategory(c.key)}
                className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isActive
                    ? "bg-[#194B35] text-white shadow-xs"
                    : "bg-white text-[#5C6A64] hover:bg-[#FAF7F0] border border-[#EDE6D8]"
                }`}
              >
                <span>{language === "ml" ? c.label_ml : c.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? "bg-white/20 text-white" : "bg-[#FAF7F0] text-[#194B35]"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* 3. SEARCH & SECONDARY FILTERS BAR                                         */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-3xl border border-[#EDE6D8] p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              aria-label="Search development projects"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === "ml" ? "പദ്ധതി പേര്, സ്ഥലം, വകുപ്പ് തിരയുക..." : "Search project by title, locality, department..."}
              className="w-full pl-10 pr-4 py-2.5 bg-[#FAF7F0] text-xs border border-[#EDE6D8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#194B35] text-[#1A2420]"
            />
          </div>

          {/* Status Filter */}
          <select
            aria-label="Filter by project status"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full sm:w-auto px-3.5 py-2.5 bg-[#FAF7F0] border border-[#EDE6D8] rounded-2xl text-xs text-[#1A2420] focus:outline-none focus:ring-2 focus:ring-[#194B35]"
          >
            <option value="all">{language === "ml" ? "എല്ലാ സ്റ്റാറ്റസും" : "All Statuses"}</option>
            <option value="Proposed">Proposed</option>
            <option value="Announced">Announced</option>
            <option value="Approved">Approved</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Delayed">Delayed</option>
            <option value="On Hold">On Hold</option>
          </select>

          {/* Locality Filter */}
          <select
            aria-label="Filter by locality"
            value={selectedLocality}
            onChange={(e) => setSelectedLocality(e.target.value)}
            className="w-full sm:w-auto px-3.5 py-2.5 bg-[#FAF7F0] border border-[#EDE6D8] rounded-2xl text-xs text-[#1A2420] focus:outline-none focus:ring-2 focus:ring-[#194B35]"
          >
            <option value="all">{language === "ml" ? "എല്ലാ പ്രദേശങ്ങളും" : "All Localities"}</option>
            {localities.map(l => (
              <option key={l.id} value={l.name}>
                {language === "ml" ? l.name_ml : l.name}
              </option>
            ))}
          </select>
        </div>

        {/* ========================================================================= */}
        {/* 4. STATUTORY DATA PRESENTATION TRANSPARENCY BANNER                         */}
        {/* ========================================================================= */}
        <div className="p-5 rounded-3xl bg-amber-50/80 border border-amber-200/90 text-xs text-amber-950 space-y-3 shadow-2xs">
          <div className="flex items-center gap-2 font-bold text-amber-900">
            <ShieldCheck className="w-5 h-5 text-amber-800 shrink-0" />
            <span className="text-sm">
              {language === "ml"
                ? "വികസന പദ്ധതി സുതാര്യതാ നയം (Development Data Transparency Standard)"
                : "Development Tracker Data Presentation & Verification Policy"}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px] text-amber-900/90 leading-relaxed">
            <div className="p-3 rounded-2xl bg-white/80 border border-amber-200/60 shadow-2xs">
              <span className="font-bold block text-[#194B35] mb-1">
                1. {language === "ml" ? "പുരോഗതി ശതമാന നിയന്ത്രണം" : "Evidence-Based Progress"}
              </span>
              {language === "ml"
                ? "അസിസ്റ്റന്റ് എക്സിക്യൂട്ടീവ് എഞ്ചിനീയറുടെ ഔദ്യോഗിക അളവുപുസ്തകം (MB) ഇല്ലാതെ അനുമാന ശതമാനങ്ങൾ ഇവിടെ കാണിക്കുന്നില്ല. ഫീൽഡ് ഇൻസ്പെക്ഷൻ റിപ്പോർട്ടുകൾ മാത്രം രേഖപ്പെടുത്തുന്നു."
                : "Unsupported progress percentages are hidden. Only inspected physical milestones verified by Municipal Engineers are displayed."}
            </div>
            <div className="p-3 rounded-2xl bg-white/80 border border-amber-200/60 shadow-2xs">
              <span className="font-bold block text-[#194B35] mb-1">
                2. {language === "ml" ? "ബജറ്റ് വർഗ്ഗീകരണം" : "Budget Stage Classification"}
              </span>
              {language === "ml"
                ? "നിർദ്ദേശിക്കപ്പെട്ട എസ്റ്റിമേറ്റുകളും, സാങ്കേതിക അനുമതി ലഭിച്ച തുകയും, നിർമ്മാണം പൂർത്തിയായ ശേഷമുള്ള ഓഡിറ്റ് ചെലവും പരസ്പരം വേർതിരിച്ചിരിക്കുന്നു."
                : "Strictly distinguishes between Project Proposals, Sanctioned Technical Allocations, and Post-Completion Audited Expenditures."}
            </div>
            <div className="p-3 rounded-2xl bg-white/80 border border-amber-200/60 shadow-2xs">
              <span className="font-bold block text-[#194B35] mb-1">
                3. {language === "ml" ? "ഔദ്യോഗിക സ്ഥിരീകരണം" : "Awaiting Verification"}
              </span>
              {language === "ml"
                ? "തദ്ദേശ വകുപ്പ് അല്ലെങ്കിൽ കിഫ്ബി (KIIFB) പോർട്ടലുകളിൽ നിന്ന് ലഭിച്ച പ്രാഥമിക രേഖകൾ കൃത്യമായ പരിശോധന സ്റ്റാറ്റസോടെ പ്രദർശിപ്പിച്ചിരിക്കുന്നു."
                : "Projects under execution display 'Awaiting Official Measurement Verification' until completion certificates are registered."}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 5. PROJECTS GRID (White Cards, Sand Borders, Circular Action Buttons)       */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => {
            const statusCfg = statusColorMap[project.status] || statusColorMap["In Progress"];

            const getBudgetLabel = () => {
              if (project.status === "Proposed" || project.status === "Announced") {
                return language === "ml" ? "പ്രതീക്ഷിത അടങ്കൽ (Estimated)" : "Estimated Proposal Budget";
              }
              if (project.status === "Completed") {
                return language === "ml" ? "ഓഡിറ്റ് ചെയ്ത ചെലവ് (Audited Expenditure)" : "Audited Expenditure";
              }
              return language === "ml" ? "അനുവദിച്ച വിഹിതം (Sanctioned)" : "Sanctioned Allocation";
            };

            return (
              <div
                key={project.id}
                className="bg-white rounded-3xl border border-[#EDE6D8] p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  {/* Top Meta Bar */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FAF7F0] text-[#194B35] border border-[#EDE6D8]">
                      {language === "ml" ? project.category_name_ml : project.category_name}
                    </span>

                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${statusCfg.bg} ${statusCfg.text} ${statusCfg.border}`}>
                      {project.status}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-lg text-[#194B35] font-malayalam-heading group-hover:text-[#123626] transition">
                    {language === "ml" ? project.title_ml : project.title}
                  </h3>

                  <p className="text-xs text-[#5C6A64] line-clamp-3 leading-relaxed">
                    {language === "ml" ? project.description_ml : project.description}
                  </p>

                  {/* Locality & Department */}
                  <div className="space-y-1 text-xs text-[#5C6A64] pt-1">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C39A5B] shrink-0" />
                      <span>{project.locality || "Tanur Municipality"} {project.ward_number ? `(Ward ${project.ward_number})` : ""}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-500">
                      <Building2 className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span className="truncate">{project.department}</span>
                    </div>
                  </div>

                  {/* Budget & Verification Details */}
                  <div className="pt-2 border-t border-gray-100 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#194B35] flex items-center gap-1">
                        <Coins className="w-3.5 h-3.5 text-[#C39A5B]" />
                        <span>{getBudgetLabel()}:</span>
                      </span>
                      <span className="font-mono font-bold text-[#194B35] bg-[#FAF7F0] px-2.5 py-0.5 rounded-lg border border-[#EDE6D8]">
                        {project.budget_sanctioned}
                      </span>
                    </div>

                    {/* Official Physical Milestone & MB Verification Status */}
                    <div className="p-3 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] space-y-1.5 text-[11px]">
                      <div className="flex items-center justify-between gap-1 flex-wrap">
                        <span className="font-bold text-[#5C6A64]">
                          {language === "ml" ? "നിർവ്വഹണ സ്ഥിതി:" : "Execution Status:"}
                        </span>
                        {project.status === "Completed" ? (
                          <VerificationBadge level="verified" citation="Commissioned" language={language} />
                        ) : project.status === "Approved" ? (
                          <VerificationBadge level="verified" citation="Admin Sanction" language={language} />
                        ) : project.status === "Proposed" ? (
                          <VerificationBadge level="partially_verified" citation="Public Proposal" language={language} />
                        ) : (
                          <VerificationBadge level="awaiting_verification" language={language} />
                        )}
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-[#7A8880] pt-0.5">
                        <span>
                          {language === "ml" 
                            ? `${project.progress_updates?.length || 0} ഫീൽഡ് പരിശോധന രേഖകൾ` 
                            : `${project.progress_updates?.length || 0} Inspected Milestones`}
                        </span>
                        <span>
                          {project.status === "Completed" 
                            ? (language === "ml" ? "പൂർത്തിയായി കൈമാറി" : "Commissioned")
                            : (language === "ml" ? "അളവുപുസ്തകം (MB) പരിശോധനയിൽ" : "MB Verification in Progress")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer with circular action arrow */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-[11px] text-gray-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verified: {project.last_verified_date}</span>
                  </div>

                  <Link
                    href={`/development/projects/${project.id}`}
                    aria-label={`View full timeline for ${project.title}`}
                    className="w-9 h-9 rounded-full bg-[#194B35] text-white flex items-center justify-center hover:bg-[#123626] transition-all shadow-xs hover:scale-105 active:scale-95 shrink-0"
                  >
                    <ChevronRight className="w-4 h-4 text-white" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="p-8 text-center bg-white rounded-3xl border border-[#EDE6D8] text-[#5C6A64] space-y-2">
            <HardHat className="w-8 h-8 text-[#C39A5B] mx-auto" />
            <p className="font-bold text-sm">
              {language === "ml" ? "പദ്ധതികൾ ഒന്നും കണ്ടെത്താനായില്ല" : "No development projects found"}
            </p>
            <p className="text-xs text-[#7A8880]">
              {language === "ml" ? "തിരയൽ പദങ്ങളോ വിഭാഗമോ മാറ്റി വീണ്ടും ശ്രമിക്കുക." : "Try adjusting your search criteria or category filter."}
            </p>
          </div>
        )}

        {/* Source and Verification Disclaimer */}
        <DataSourcesNotice 
          language={language}
          title={language === "ml" ? "വികസന പദ്ധതി വിവര സ്രോതസ്സുകളും സുതാര്യതാ മാനദണ്ഡവും" : "Development Tracker — Official Verification Sources"}
          sources={[
            "Kerala State e-Procurement Portal (etenders.kerala.gov.in)",
            "Local Self Government Department Plan Monitoring System",
            "KIIFB Project Registry (kiifb.kerala.gov.in)",
            "Tanur Municipal Council Resolution Records",
          ]}
        />
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
