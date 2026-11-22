"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedLocality, setSelectedLocality] = useState<string>("all");

  const projects = useMemo(() => digitalMunicipalityStore.getProjects(), []);
  const localities = useMemo(() => digitalMunicipalityStore.getLocalities(), []);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      if (selectedCategory !== "all") {
        if (p.category !== selectedCategory) {
          const catObj = TRANSPARENT_PROJECT_CATEGORIES.find((c) => c.key === selectedCategory);
          if (catObj && "legacy_keys" in catObj && Array.isArray((catObj as any).legacy_keys)) {
            if (!(catObj as any).legacy_keys.includes(p.category)) return false;
          } else {
            return false;
          }
        }
      }
      if (selectedStatus !== "all" && p.status !== selectedStatus) return false;
      if (selectedLocality !== "all" && p.locality !== selectedLocality) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
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
      planned: projects.filter(p => p.status === "Planned").length,
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
    Planned: { bg: "bg-indigo-50", text: "text-indigo-800", border: "border-indigo-200" },
    "In Progress": { bg: "bg-amber-50", text: "text-amber-800", border: "border-amber-200" },
    Completed: { bg: "bg-emerald-50", text: "text-emerald-800", border: "border-emerald-200" },
    Delayed: { bg: "bg-red-50", text: "text-red-800", border: "border-red-200" },
    "On Hold": { bg: "bg-gray-100", text: "text-gray-800", border: "border-gray-300" },
    Cancelled: { bg: "bg-rose-50", text: "text-rose-800", border: "border-rose-200" },
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] flex flex-col font-sans selection:bg-[#194B35]/20 selection:text-[#194B35]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 w-full">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Development Tracker" },
          ]}
        />

        {/* ========================================================================= */}
        {/* 1. HERO SECTION                                                          */}
        {/* ========================================================================= */}
        <div className="relative rounded-3xl sm:rounded-[36px] bg-gradient-to-br from-[#FAF7F0] via-[#F5F1E7] to-[#EDE6D8] border border-[#EDE6D8] p-6 sm:p-10 shadow-xs overflow-hidden">
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#194B35_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#194B35]/10 text-[#194B35] text-xs font-bold border border-[#194B35]/20">
                <HardHat className="w-4 h-4 text-[#194B35]" />
                <span>Development Project Monitoring • Tanur Municipality</span>
              </div>

              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#194B35] tracking-tight leading-tight">
                Development Tracker
              </h1>

              <p className="text-xs sm:text-sm text-[#5C6A64] leading-relaxed max-w-xl">
                A transparent public monitoring directory for Tanur Municipality development projects. Follow sanctioned budgets, milestones, contractors, verified progress updates, and completion evidence.
              </p>

              {/* Action CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href="/development/projects"
                  className="px-5 py-3 rounded-2xl bg-[#194B35] hover:bg-[#123626] text-white text-xs sm:text-sm font-bold shadow-sm hover:shadow transition flex items-center gap-2 min-h-[44px]"
                >
                  <Search className="w-4 h-4 text-amber-300" />
                  <span>Browse Projects Registry</span>
                </Link>

                <Link
                  href="/development"
                  className="px-5 py-3 rounded-2xl bg-white hover:bg-[#FAF7F0] text-[#194B35] border border-[#EDE6D8] text-xs sm:text-sm font-bold shadow-2xs transition flex items-center gap-2 min-h-[44px]"
                >
                  <Building2 className="w-4 h-4 text-[#C39A5B]" />
                  <span>View on GIS Map</span>
                </Link>
              </div>
            </div>

            {/* Quick Metrics Strip */}
            <div className="md:col-span-5 flex justify-center md:justify-end w-full">
              <div className="grid grid-cols-2 gap-3 w-full max-w-md">
                <div className="p-3.5 bg-white rounded-2xl border border-[#EDE6D8] shadow-2xs space-y-1 text-left">
                  <span className="text-[10px] uppercase font-bold text-[#C39A5B] block">Total Registered</span>
                  <span className="text-xl sm:text-2xl font-black text-[#194B35]">{stats.total}</span>
                  <span className="text-[11px] text-[#5C6A64] block">Official Projects</span>
                </div>
                <div className="p-3.5 bg-white rounded-2xl border border-[#EDE6D8] shadow-2xs space-y-1 text-left">
                  <span className="text-[10px] uppercase font-bold text-teal-700 block">Approved</span>
                  <span className="text-xl sm:text-2xl font-black text-teal-800">{stats.approved}</span>
                  <span className="text-[11px] text-[#5C6A64] block">Admin Sanction</span>
                </div>
                <div className="p-3.5 bg-white rounded-2xl border border-[#EDE6D8] shadow-2xs space-y-1 text-left">
                  <span className="text-[10px] uppercase font-bold text-amber-700 block">In Progress</span>
                  <span className="text-xl sm:text-2xl font-black text-amber-800">{stats.inProgress}</span>
                  <span className="text-[11px] text-[#5C6A64] block">Active Execution</span>
                </div>
                <div className="p-3.5 bg-white rounded-2xl border border-[#EDE6D8] shadow-2xs space-y-1 text-left">
                  <span className="text-[10px] uppercase font-bold text-emerald-700 block">Completed</span>
                  <span className="text-xl sm:text-2xl font-black text-emerald-800">{stats.completed}</span>
                  <span className="text-[11px] text-[#5C6A64] block">Commissioned</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. CATEGORY PILLS BAR                                                     */}
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
            All Projects ({projects.length})
          </button>

          {TRANSPARENT_PROJECT_CATEGORIES.map(c => {
            const isActive = selectedCategory === c.key;
            const count = projects.filter(p => {
              if (p.category === c.key) return true;
              if ("legacy_keys" in c && Array.isArray((c as any).legacy_keys)) {
                return (c as any).legacy_keys.includes(p.category);
              }
              return false;
            }).length;

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
                <span>{c.label}</span>
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
        {/* 3. SEARCH & FILTERS BAR                                                   */}
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
              placeholder="Search project by title, locality, department..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#FAF7F0] text-xs border border-[#EDE6D8] rounded-2xl focus:outline-hidden focus:ring-2 focus:ring-[#194B35] text-[#1A2420]"
            />
          </div>

          {/* Status Filter */}
          <select
            aria-label="Filter by project status"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full sm:w-auto px-3.5 py-2.5 bg-[#FAF7F0] border border-[#EDE6D8] rounded-2xl text-xs text-[#1A2420] focus:outline-hidden focus:ring-2 focus:ring-[#194B35]"
          >
            <option value="all">All Statuses</option>
            <option value="Proposed">Proposed</option>
            <option value="Approved">Approved</option>
            <option value="Planned">Planned</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Delayed">Delayed</option>
            <option value="On Hold">On Hold</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          {/* Locality Filter */}
          <select
            aria-label="Filter by locality"
            value={selectedLocality}
            onChange={(e) => setSelectedLocality(e.target.value)}
            className="w-full sm:w-auto px-3.5 py-2.5 bg-[#FAF7F0] border border-[#EDE6D8] rounded-2xl text-xs text-[#1A2420] focus:outline-hidden focus:ring-2 focus:ring-[#194B35]"
          >
            <option value="all">All Localities</option>
            {localities.map(l => (
              <option key={l.id} value={l.name}>
                {l.name}
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
              Development Tracker Data Presentation & Verification Policy
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px] text-amber-900/90 leading-relaxed">
            <div className="p-3 rounded-2xl bg-white/80 border border-amber-200/60 shadow-2xs">
              <span className="font-bold block text-[#194B35] mb-1">
                1. Evidence-Based Progress
              </span>
              Unsupported progress percentages are strictly prohibited. Only inspected physical milestones verified by Municipal and PWD Engineers are displayed.
            </div>
            <div className="p-3 rounded-2xl bg-white/80 border border-amber-200/60 shadow-2xs">
              <span className="font-bold block text-[#194B35] mb-1">
                2. Three-Way Budget Classification
              </span>
              Strictly distinguishes between Approved Municipal Budgets, Initial Estimated Costs, and Post-Completion Audited Expenditures.
            </div>
            <div className="p-3 rounded-2xl bg-white/80 border border-amber-200/60 shadow-2xs">
              <span className="font-bold block text-[#194B35] mb-1">
                3. Primary Source Verification
              </span>
              All records are grounded in official public sources from LSGD Kerala, KIIFB, and municipal gazettes. Unverified estimates are clearly flagged.
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 5. PROJECTS GRID                                                          */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => {
            const statusCfg = statusColorMap[project.status] || statusColorMap["In Progress"];
            const approvedBudget = project.approved_budget || project.budget_sanctioned;

            return (
              <div
                key={project.id}
                className="bg-white rounded-3xl border border-[#EDE6D8] p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  {/* Top Meta Bar */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FAF7F0] text-[#194B35] border border-[#EDE6D8]">
                      {project.category_name}
                    </span>

                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${statusCfg.bg} ${statusCfg.text} ${statusCfg.border}`}>
                      {project.status}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-lg text-[#194B35] group-hover:text-[#123626] transition">
                    {project.title}
                  </h3>

                  <p className="text-xs text-[#5C6A64] line-clamp-3 leading-relaxed">
                    {project.description}
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
                        <span>Approved Budget:</span>
                      </span>
                      <span className="font-mono font-bold text-[#194B35] bg-[#FAF7F0] px-2.5 py-0.5 rounded-lg border border-[#EDE6D8]">
                        {approvedBudget}
                      </span>
                    </div>

                    {/* Physical Milestone & Verification Status */}
                    <div className="p-3 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] space-y-1.5 text-[11px]">
                      <div className="flex items-center justify-between gap-1 flex-wrap">
                        <span className="font-bold text-[#5C6A64]">
                          Execution Status:
                        </span>
                        {project.status === "Completed" ? (
                          <span className="font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">Commissioned</span>
                        ) : project.status === "Approved" ? (
                          <span className="font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded-full">Admin Sanction</span>
                        ) : project.status === "Proposed" ? (
                          <span className="font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded-full">Public Proposal</span>
                        ) : (
                          <span className="font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">Active In Progress</span>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-[#7A8880] pt-0.5">
                        <span>
                          {project.progress_updates?.length || 0} Inspected Milestones
                        </span>
                        <span>
                          {project.status === "Completed" ? "Commissioned" : "Verified By Municipal Engineers"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer with action button */}
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
              No development projects found
            </p>
            <p className="text-xs text-[#7A8880]">
              Try adjusting your search criteria or category filter.
            </p>
          </div>
        )}

        {/* Source and Verification Disclaimer */}
        <DataSourcesNotice 
          title="Development Tracker — Official Verification Sources"
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
