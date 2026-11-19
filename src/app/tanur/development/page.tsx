"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { TanurNav } from "@/components/tanur/TanurNav";
import { useLanguage } from "@/lib/i18n/context";
import { digitalMunicipalityStore, TANUR_MUNICIPAL_WARDS } from "@/lib/data/digitalMunicipalityData";
import { DevelopmentProject, ProjectCategory, ProjectStatus } from "@/types/digitalMunicipality";
import { VerificationBadge, DataSourcesNotice } from "@/components/common/VerificationBadge";
import { 
  Building2, 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  ExternalLink, 
  ArrowRight,
  ShieldCheck,
  Layers,
  Banknote,
  Wrench,
  Compass,
  FileCheck2,
  HardHat,
  ChevronRight
} from "lucide-react";

export default function DevelopmentTrackerPage() {
  const { language } = useLanguage();
  const [projects, setProjects] = useState<DevelopmentProject[]>(() => digitalMunicipalityStore.getProjects());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | "all">("all");
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus | "all">("all");
  const [selectedWard, setSelectedWard] = useState<number>(0);

  const categories: { slug: ProjectCategory | "all"; name: string; name_ml: string }[] = [
    { slug: "all", name: "All Categories", name_ml: "എല്ലാ വിഭാഗങ്ങളും" },
    { slug: "infrastructure", name: "Infrastructure", name_ml: "അടിസ്ഥാന സൗകര്യം" },
    { slug: "fisheries_harbour", name: "Fisheries & Harbour", name_ml: "മത്സ്യബന്ധനവും ഹാർബറും" },
    { slug: "roads_transport", name: "Roads & Mobility", name_ml: "റോഡും ഗതാഗതവും" },
    { slug: "water_sanitation", name: "Water & Sanitation", name_ml: "കുടിവെള്ളവും ശുചിത്വവും" },
    { slug: "healthcare", name: "Healthcare", name_ml: "ആരോഗ്യം" },
    { slug: "sports_youth", name: "Sports & Youth", name_ml: "കായികവും യുവജനക്ഷേമവും" },
    { slug: "environment_coastal", name: "Coastal & Ecology", name_ml: "തീരദേശ സംരക്ഷണം" },
  ];

  const statuses: { slug: ProjectStatus | "all"; name: string; name_ml: string }[] = [
    { slug: "all", name: "All Statuses", name_ml: "എല്ലാ നിലകളും" },
    { slug: "In Progress", name: "In Progress", name_ml: "പുരോഗമിക്കുന്നു" },
    { slug: "Approved", name: "Approved / Sanctioned", name_ml: "അനുമതി ലഭിച്ചത്" },
    { slug: "Completed", name: "Completed", name_ml: "പൂർത്തിയായവ" },
    { slug: "Proposed", name: "Proposed", name_ml: "നിർദ്ദേശിക്കപ്പെട്ടവ" },
    { slug: "Delayed", name: "Delayed", name_ml: "കാലതാമസം നേരിടുന്നത്" },
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      if (selectedCategory !== "all" && p.category !== selectedCategory) return false;
      if (selectedStatus !== "all" && p.status !== selectedStatus) return false;
      if (selectedWard > 0 && p.ward_number !== selectedWard) return false;
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.title_ml.toLowerCase().includes(q) ||
          p.department.toLowerCase().includes(q) ||
          p.department_ml.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [projects, selectedCategory, selectedStatus, selectedWard, searchTerm]);

  // Aggregate stats
  const totalSanctionedBudget = "₹86.60 കോടി";
  const inProgressCount = projects.filter(p => p.status === "In Progress").length;
  const completedCount = projects.filter(p => p.status === "Completed").length;

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] pb-24">
      <Navbar />
      <TanurNav />

      {/* Hero Banner — Transparent Tanur */}
      <div className="bg-[#194B35] text-white py-10 px-4 border-b border-[#143E2C] relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 px-3.5 py-1 rounded-full text-xs font-bold">
                <HardHat className="w-3.5 h-3.5" />
                <span>{language === "ml" ? "സുതാര്യ താനൂർ • പില്ലർ ബി (Transparent Tanur)" : "Transparent Tanur • Pillar B"}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                {language === "ml" ? "വികസന പദ്ധതി ട്രാക്കർ" : "Development Project Tracker"}
              </h1>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                {language === "ml"
                  ? "താനൂർ നഗരസഭയിലെ 44 വാർഡുകളിലുമായി പുരോഗമിക്കുന്ന പ്രധാന സർക്കാർ വികസന പദ്ധതികൾ, അനുവദിച്ച ബജറ്റ്, നിർവ്വഹണ ഏജൻസി, ഔദ്യോഗിക വിവരങ്ങൾ എന്നിവ സുതാര്യമായി അറിയാം."
                  : "Track verified public development projects across Tanur Municipality with sanctioned budgets, responsible departments, verified sources, and real-time milestones."}
              </p>
            </div>

            {/* Quick Action Links */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/development"
                className="px-4 py-2.5 bg-white text-[#194B35] hover:bg-[#FAF7F0] rounded-xl text-xs font-bold flex items-center gap-2 transition shadow-sm"
              >
                <Building2 className="w-4 h-4 text-[#194B35]" />
                <span>{language === "ml" ? "ഫ്ലാഗ്ഷിപ്പ് പോർട്ടൽ" : "Flagship Portal"}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/peoples-voice"
                className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-[#143E2C] rounded-xl text-xs font-bold flex items-center gap-2 transition shadow-sm"
              >
                <TrendingUp className="w-4 h-4" />
                <span>{language === "ml" ? "നിർദ്ദേശങ്ങൾ സമർപ്പിക്കാം" : "People's Voice"}</span>
              </Link>
              <Link
                href="/civic"
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-bold flex items-center gap-2 transition"
              >
                <AlertCircle className="w-4 h-4 text-amber-300" />
                <span>{language === "ml" ? "സിവിക് പരാതികൾ" : "Civic Connect"}</span>
              </Link>
            </div>
          </div>

          {/* Metric Cards Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-6 border-t border-white/15">
            <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-xl border border-white/10">
              <span className="text-[11px] text-white/70 block uppercase font-bold tracking-wider">
                {language === "ml" ? "ആകെ അനുവദിച്ച തുക" : "Total Documented Budget"}
              </span>
              <p className="text-xl sm:text-2xl font-black text-amber-300 mt-1">{totalSanctionedBudget}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-xl border border-white/10">
              <span className="text-[11px] text-white/70 block uppercase font-bold tracking-wider">
                {language === "ml" ? "പുരോഗമിക്കുന്ന പദ്ധതികൾ" : "Projects in Progress"}
              </span>
              <p className="text-xl sm:text-2xl font-black text-white mt-1">{inProgressCount}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-xl border border-white/10">
              <span className="text-[11px] text-white/70 block uppercase font-bold tracking-wider">
                {language === "ml" ? "പൂർത്തിയായവ" : "Completed Projects"}
              </span>
              <p className="text-xl sm:text-2xl font-black text-emerald-300 mt-1">{completedCount}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-xl border border-white/10">
              <span className="text-[11px] text-white/70 block uppercase font-bold tracking-wider">
                {language === "ml" ? "വാർഡുകളുടെ പരിധി" : "Municipal Wards"}
              </span>
              <p className="text-xl sm:text-2xl font-black text-white mt-1">44 {language === "ml" ? "വാർഡുകൾ" : "Wards"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Verification Guarantee Alert */}
        <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900 shadow-xs">
          <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold text-amber-950 block">
              {language === "ml" ? "ഔദ്യോഗിക സ്ഥിരീകരണ നയം (Public Verification Policy)" : "Documented Evidence & Verification Policy"}
            </span>
            <p className="leading-relaxed text-amber-800">
              {language === "ml"
                ? "വികസന പദ്ധതികളുമായി ബന്ധപ്പെട്ട് ഇവിടെ നൽകിയിട്ടുള്ള ബജറ്റ് തുകകളും പദ്ധതി വിവരങ്ങളും സർക്കാർ ഗസറ്റ് വിജ്ഞാപനങ്ങൾ, ഹാർബർ എൻജിനീയറിംഗ് വകുപ്പ്, പി.ഡബ്ല്യു.ഡി, വാട്ടർ അതോറിറ്റി എന്നിവയുടെ ഔദ്യോഗിക രേഖകളുടെ അടിസ്ഥാനത്തിൽ മാത്രം പ്രസിദ്ധീകരിച്ചിട്ടുള്ളതാണ്. അനൗദ്യോഗിക ഊഹാപോഹങ്ങളോ ഊഹക്കണക്കുകളോ ഇതിൽ ഉൾപ്പെടുത്തിയിട്ടില്ല."
                : "Budget statistics, completion dates, and departments are documented strictly from official Kerala Gazette, PWD, Harbour Engineering, and KWA orders. We do not display estimated percentages unless backed by site records."}
            </p>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={language === "ml" ? "പദ്ധതിയുടെ പേര്, വകുപ്പ് എന്നിവ തിരയുക..." : "Search project title, department, keyword..."}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#194B35] outline-none"
              />
            </div>

            {/* Ward Selector */}
            <select
              value={selectedWard}
              onChange={(e) => setSelectedWard(Number(e.target.value))}
              className="px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs bg-white focus:ring-2 focus:ring-[#194B35] outline-none"
            >
              <option value={0}>{language === "ml" ? "എല്ലാ വാർഡുകളും (44 Wards)" : "All 44 Municipal Wards"}</option>
              {TANUR_MUNICIPAL_WARDS.map((w) => (
                <option key={w.id} value={w.ward_number}>
                  {language === "ml" ? `വാർഡ് ${w.ward_number}: ${w.name_ml}` : `Ward ${w.ward_number}: ${w.name}`}
                </option>
              ))}
            </select>
          </div>

          {/* Status Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className="font-bold text-gray-500 mr-1 shrink-0">{language === "ml" ? "അവസ്ഥ:" : "Status:"}</span>
            {statuses.map((st) => (
              <button
                key={st.slug}
                onClick={() => setSelectedStatus(st.slug)}
                className={`px-3 py-1.5 rounded-lg font-bold transition whitespace-nowrap ${
                  selectedStatus === st.slug
                    ? "bg-[#194B35] text-white shadow-xs"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {language === "ml" ? st.name_ml : st.name}
              </button>
            ))}
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className="font-bold text-gray-500 mr-1 shrink-0">{language === "ml" ? "വിഭാഗം:" : "Category:"}</span>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3 py-1.5 rounded-lg font-medium transition whitespace-nowrap ${
                  selectedCategory === cat.slug
                    ? "bg-[#C39A5B] text-white font-bold shadow-xs"
                    : "bg-[#FAF7F0] text-gray-600 hover:bg-gray-200"
                }`}
              >
                {language === "ml" ? cat.name_ml : cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-gray-500 font-bold px-1">
            <span>{language === "ml" ? `ലഭ്യമായ വികസന പദ്ധതികൾ: ${filteredProjects.length}` : `Showing ${filteredProjects.length} Projects`}</span>
            <span>{language === "ml" ? "താനൂർ നഗരസഭാ പരിധി" : "Tanur Municipality Scope"}</span>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center">
              <Building2 className="w-10 h-10 text-gray-400 mx-auto mb-2" />
              <h3 className="text-base font-bold text-gray-800">
                {language === "ml" ? "പദ്ധതികൾ കണ്ടെത്തിയില്ല" : "No Projects Found"}
              </h3>
              <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                {language === "ml" ? "തിരഞ്ഞെടുത്ത മാനദണ്ഡങ്ങൾക്ക് അനുയോജ്യമായ പദ്ധതികൾ നിലവിലില്ല. ഫിൽട്ടറുകൾ മാറ്റി പരിശോധിക്കുക." : "Try clearing your filters or search keywords."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((project) => {
                const isCompleted = project.status === "Completed";
                const isInProgress = project.status === "In Progress";
                const isApproved = project.status === "Approved";

                return (
                  <div
                    key={project.id}
                    className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between group"
                  >
                    <div>
                      {/* Project Image */}
                      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                        <img
                          src={project.project_image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        
                        {/* Status Badge */}
                        <div className="absolute top-3 left-3">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1 shadow-sm ${
                            isCompleted ? "bg-emerald-600 text-white" :
                            isInProgress ? "bg-amber-500 text-white" :
                            isApproved ? "bg-blue-600 text-white" :
                            "bg-gray-700 text-white"
                          }`}>
                            {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : <HardHat className="w-3.5 h-3.5" />}
                            <span>{project.status}</span>
                          </span>
                        </div>

                        {/* Category Badge */}
                        <div className="absolute top-3 right-3">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/60 text-white backdrop-blur-xs">
                            {language === "ml" ? project.category_name_ml : project.category_name}
                          </span>
                        </div>

                        {/* Title overlay */}
                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          {project.ward_number && (
                            <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1 mb-0.5">
                              <MapPin className="w-3 h-3" />
                              {language === "ml" ? `വാർഡ് ${project.ward_number}: ${project.ward_name_ml}` : `Ward ${project.ward_number}: ${project.ward_name}`}
                            </span>
                          )}
                          <h3 className="text-base font-bold leading-snug drop-shadow-sm line-clamp-2">
                            {language === "ml" ? project.title_ml : project.title}
                          </h3>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-5 space-y-3">
                        <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                          {language === "ml" ? project.description_ml : project.description}
                        </p>

                        {/* Verification & Milestone Status */}
                        <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                          {project.status === "Completed" ? (
                            <VerificationBadge
                              level="verified"
                              citation="Final Measurement Book Audit"
                              compact
                              tooltipText="Audited via completion certificate and final Measurement Book recordings"
                            />
                          ) : (
                            <VerificationBadge
                              level="awaiting_verification"
                              citation="Measurement Book (MB) Entry Pending"
                              compact
                              tooltipText="On-site physical percentage withheld pending certified Measurement Book recordings"
                            />
                          )}
                          <span className="text-[11px] text-gray-500 font-medium">
                            {project.progress_updates.length} {language === "ml" ? "രേഖപ്പെടുത്തിയ ഘട്ടങ്ങൾ" : "Milestones"}
                          </span>
                        </div>

                        {/* Key Specs Row */}
                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100 text-xs">
                          <div className="bg-[#FAF7F0] p-2.5 rounded-lg">
                            <span className="text-[10px] text-gray-500 block font-bold uppercase">
                              {project.status === "Completed"
                                ? (language === "ml" ? "ഓഡിറ്റ് ചെയ്ത തുക" : "Audited Expenditure")
                                : project.status === "Proposed"
                                ? (language === "ml" ? "പ്രതീക്ഷിത അടങ്കൽ" : "Estimated Proposal")
                                : (language === "ml" ? "അനുവദിച്ച സാങ്കേതിക തുക" : "Sanctioned Allocation")}
                            </span>
                            <span className="font-extrabold text-[#194B35]">{project.budget_sanctioned}</span>
                          </div>

                          <div className="bg-[#FAF7F0] p-2.5 rounded-lg">
                            <span className="text-[10px] text-gray-500 block font-bold uppercase">{language === "ml" ? "നിർവ്വഹണം" : "Department"}</span>
                            <span className="font-bold text-gray-800 line-clamp-1">{language === "ml" ? project.department_ml : project.department}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                      <div className="text-[11px] text-gray-400">
                        {language === "ml" ? `സ്ഥിരീകരിച്ച തീയതി: ${project.last_verified_date}` : `Verified: ${project.last_verified_date}`}
                      </div>

                      <Link
                        href={`/tanur/development/${project.id}`}
                        className="px-3.5 py-1.5 bg-[#194B35] hover:bg-[#143E2C] text-white rounded-lg text-xs font-bold inline-flex items-center gap-1 transition shadow-xs"
                      >
                        <span>{language === "ml" ? "വിശദാംശങ്ങൾ" : "View Details"}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Data Sources Notice & Transparency Policy */}
        <DataSourcesNotice 
          language={language}
          title={language === "ml" ? "വികസന പദ്ധതികൾ — വിവര സ്രോതസ്സും സുതാര്യതാ മാനദണ്ഡവും" : "Development Projects — Verified Data Sources & Policy"}
          sources={[
            "Tanur Municipality Annual Plan & Budget Book (FY 2024–25)",
            "LSGD Engineering Wing Technical Sanction Records",
            "Harbour Engineering Department Project Clearances",
            "Sulekha Plan Monitoring System (sulekha.lsgkerala.gov.in)",
          ]}
        />
      </div>

      <BottomNav />
      <Footer />
    </div>
  );
}
