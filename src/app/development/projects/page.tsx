"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { DevelopmentNav } from "@/components/development/DevelopmentNav";
import { useLanguage } from "@/lib/i18n/context";
import { useAuth } from "@/lib/auth/context";
import { 
  digitalMunicipalityStore, 
  TRANSPARENT_PROJECT_CATEGORIES,
  TANUR_LOCALITIES,
  TANUR_MUNICIPAL_WARDS
} from "@/lib/data/digitalMunicipalityData";
import { 
  DevelopmentProject, 
  ProjectStatus, 
  ProjectCategory 
} from "@/types/digitalMunicipality";
import { VerificationBadge } from "@/components/common/VerificationBadge";
import {
  HardHat,
  Search,
  Filter,
  MapPin,
  Clock,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Layers,
  Banknote,
  Compass,
  FileCheck2,
  X,
  LayoutGrid,
  List,
  SlidersHorizontal,
  ExternalLink,
  Car,
  Droplets,
  Trash2,
  GraduationCap,
  Activity,
  Building2,
  Leaf,
  Sun,
  Users
} from "lucide-react";

const ALL_STATUSES: ProjectStatus[] = [
  "Proposed",
  "Announced",
  "Approved",
  "In Progress",
  "Completed",
  "Delayed",
  "On Hold"
];

function ProjectDirectoryContent() {
  const searchParams = useSearchParams();
  const { language } = useLanguage();
  const { role } = useAuth();

  const initialCategory = (searchParams.get("category") as ProjectCategory) || "all";
  const initialStatus = (searchParams.get("status") as ProjectStatus) || "all";
  const initialLocality = searchParams.get("locality") || "all";
  const initialWard = searchParams.get("ward") ? Number(searchParams.get("ward")) : 0;
  const initialSearch = searchParams.get("q") || "";

  const [projects] = useState<DevelopmentProject[]>(() => digitalMunicipalityStore.getProjects());
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | "all">(initialCategory);
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus | "all">(initialStatus);
  const [selectedLocality, setSelectedLocality] = useState<string>(initialLocality);
  const [selectedWard, setSelectedWard] = useState<number>(initialWard);
  const [sortBy, setSortBy] = useState<"recent" | "progress" | "name" | "budget">("recent");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      // Search term
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(q) || p.title_ml.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q) || p.description_ml.toLowerCase().includes(q);
        const matchesDept = p.department.toLowerCase().includes(q) || p.department_ml.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesDept) return false;
      }

      // Category
      if (selectedCategory !== "all" && p.category !== selectedCategory) {
        return false;
      }

      // Status
      if (selectedStatus !== "all" && p.status !== selectedStatus) {
        return false;
      }

      // Locality
      if (selectedLocality !== "all") {
        if (!p.locality || !p.locality.toLowerCase().includes(selectedLocality.toLowerCase())) {
          return false;
        }
      }

      // Ward
      if (selectedWard > 0 && p.ward_number !== selectedWard) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "progress") {
        return (b.progress_percentage || 0) - (a.progress_percentage || 0);
      }
      if (sortBy === "name") {
        return a.title.localeCompare(b.title);
      }
      // Default: recent updates or announcement date
      const dateA = a.updated_at || a.announcement_date || "";
      const dateB = b.updated_at || b.announcement_date || "";
      return dateB.localeCompare(dateA);
    });
  }, [projects, searchTerm, selectedCategory, selectedStatus, selectedLocality, selectedWard, sortBy]);

  const activeFiltersCount = 
    (selectedCategory !== "all" ? 1 : 0) +
    (selectedStatus !== "all" ? 1 : 0) +
    (selectedLocality !== "all" ? 1 : 0) +
    (selectedWard > 0 ? 1 : 0) +
    (searchTerm.trim() ? 1 : 0);

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedStatus("all");
    setSelectedLocality("all");
    setSelectedWard(0);
  };

  const getCategoryIcon = (key: string) => {
    switch (key) {
      case "roads_transport": return <Car className="w-3.5 h-3.5" />;
      case "water_drainage": return <Droplets className="w-3.5 h-3.5" />;
      case "waste_management": return <Trash2 className="w-3.5 h-3.5" />;
      case "education": return <GraduationCap className="w-3.5 h-3.5" />;
      case "healthcare": return <Activity className="w-3.5 h-3.5" />;
      case "public_facilities": return <Building2 className="w-3.5 h-3.5" />;
      case "environment": return <Leaf className="w-3.5 h-3.5" />;
      case "streetlights": return <Sun className="w-3.5 h-3.5" />;
      case "community_infrastructure": return <Users className="w-3.5 h-3.5" />;
      default: return <Layers className="w-3.5 h-3.5" />;
    }
  };

  const getStatusBadgeClass = (status: ProjectStatus) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "In Progress":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "Approved":
        return "bg-sky-100 text-sky-800 border-sky-300";
      case "Announced":
        return "bg-indigo-100 text-indigo-800 border-indigo-300";
      case "Proposed":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "Delayed":
        return "bg-rose-100 text-rose-800 border-rose-300";
      case "On Hold":
        return "bg-stone-200 text-stone-800 border-stone-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] flex flex-col font-sans">
      <Navbar />
      <DevelopmentNav />

      <main className="flex-1 pb-24">
        {/* Top Header */}
        <div className="bg-gradient-to-b from-[#194B35] to-[#123626] text-white pt-8 pb-12 sm:pt-10 sm:pb-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#C39A5B] text-xs font-bold mb-3 border border-white/20">
                  <HardHat className="w-3.5 h-3.5" />
                  <span>{language === "ml" ? "താനൂർ നഗരസഭാ വികസന സൂചിക" : "Tanur Municipal Project Registry"}</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold font-malayalam-heading text-white">
                  {language === "ml" ? "പദ്ധതി സൂചിക & വിവരങ്ങൾ" : "Development Projects Directory"}
                </h1>
                <p className="text-xs sm:text-sm text-[#EDE6D8] mt-1 max-w-2xl leading-relaxed">
                  {language === "ml"
                    ? "താനൂർ നഗരസഭയിലെ എല്ലാ വാർഡുകളിലെയും ഔദ്യോഗിക വികസന പദ്ധതികൾ കണ്ടെത്തുക, പരിശോധിക്കുക."
                    : "Comprehensive registry of public works in Tanur Municipality with verified sources, timelines, and budgets."}
                </p>
              </div>

              <div className="flex items-center gap-2 self-start md:self-auto">
                <Link
                  href="/development"
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition flex items-center gap-1.5"
                >
                  <Compass className="w-3.5 h-3.5 text-[#C39A5B]" />
                  <span>{language === "ml" ? "മാപ്പിൽ കാണുക" : "Map View"}</span>
                </Link>
                {(role === "admin" || role === "moderator") && (
                  <Link
                    href="/admin/development/projects/new"
                    className="px-4 py-2.5 rounded-xl bg-[#C39A5B] hover:bg-[#b0874a] text-[#194B35] text-xs font-extrabold transition shadow-sm flex items-center gap-1.5"
                  >
                    <span>+ {language === "ml" ? "പുതിയ പദ്ധതി" : "New Project"}</span>
                  </Link>
                )}
              </div>
            </div>

            {/* Live Search Bar */}
            <div className="mt-6 relative max-w-3xl">
              <Search className="w-5 h-5 text-[#5C6A64] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={
                  language === "ml"
                    ? "പദ്ധതിയുടെ പേര്, വകുപ്പ്, വിവരങ്ങൾ തിരയുക..."
                    : "Search project name, department, or keyword..."
                }
                className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white text-[#1A2420] text-sm placeholder-[#7A8880] border border-[#DDD5C5] shadow-lg focus:outline-hidden focus:ring-2 focus:ring-[#C39A5B]"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-[#EDE6D8] shadow-md space-y-4">
            {/* Primary Filter Rows */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Category Filter */}
              <div>
                <label className="text-[11px] font-bold text-[#5C6A64] block mb-1">
                  {language === "ml" ? "വിഭാഗം (Category)" : "Category"}
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-[#FAF7F0] border border-[#EDE6D8] text-[#1A2420] font-medium"
                >
                  <option value="all">{language === "ml" ? "എല്ലാ വിഭാഗങ്ങളും (All Categories)" : "All Categories"}</option>
                  {TRANSPARENT_PROJECT_CATEGORIES.map((c) => (
                    <option key={c.key} value={c.key}>
                      {language === "ml" ? c.label_ml : c.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="text-[11px] font-bold text-[#5C6A64] block mb-1">
                  {language === "ml" ? "സ്ഥിതിവിവരം (Status)" : "Project Status"}
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-[#FAF7F0] border border-[#EDE6D8] text-[#1A2420] font-medium"
                >
                  <option value="all">{language === "ml" ? "എല്ലാ അവസ്ഥകളും (All Statuses)" : "All Statuses"}</option>
                  {ALL_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Locality Filter */}
              <div>
                <label className="text-[11px] font-bold text-[#5C6A64] block mb-1">
                  {language === "ml" ? "പ്രദേശം (Locality)" : "Locality"}
                </label>
                <select
                  value={selectedLocality}
                  onChange={(e) => setSelectedLocality(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-[#FAF7F0] border border-[#EDE6D8] text-[#1A2420] font-medium"
                >
                  <option value="all">{language === "ml" ? "എല്ലാ പ്രദേശങ്ങളും (All Localities)" : "All Localities"}</option>
                  {TANUR_LOCALITIES.map((l) => (
                    <option key={l.id} value={l.name}>
                      {language === "ml" ? l.name_ml : l.name} (Wards {l.ward_numbers.join(", ")})
                    </option>
                  ))}
                </select>
              </div>

              {/* Ward Filter */}
              <div>
                <label className="text-[11px] font-bold text-[#5C6A64] block mb-1">
                  {language === "ml" ? "വാർഡ് (Ward Number)" : "Ward"}
                </label>
                <select
                  value={selectedWard}
                  onChange={(e) => setSelectedWard(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-[#FAF7F0] border border-[#EDE6D8] text-[#1A2420] font-medium"
                >
                  <option value={0}>{language === "ml" ? "എല്ലാ വാർഡുകളും (All 44 Wards)" : "All 44 Wards"}</option>
                  {TANUR_MUNICIPAL_WARDS.map((w) => (
                    <option key={w.id} value={w.ward_number}>
                      Ward {w.ward_number}: {language === "ml" ? w.ward_name_ml : w.ward_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Bottom Controls Bar */}
            <div className="pt-3 border-t border-[#EDE6D8] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#194B35]">
                  {filteredProjects.length} {language === "ml" ? "പദ്ധതികൾ കണ്ടെത്തി" : "projects found"}
                </span>
                <span className="text-[#5C6A64]">({projects.length} Total Registered)</span>

                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="ml-2 px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-[11px] font-bold flex items-center gap-1"
                  >
                    <X className="w-3 h-3" />
                    <span>{language === "ml" ? "ഫിൽട്ടറുകൾ നീക്കുക" : "Clear Filters"} ({activeFiltersCount})</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3">
                {/* Sort */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[#5C6A64] font-semibold">{language === "ml" ? "ക്രമപ്പെടുത്തുക" : "Sort"}:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-2.5 py-1 rounded-lg text-xs bg-[#FAF7F0] border border-[#EDE6D8] font-bold text-[#194B35]"
                  >
                    <option value="recent">{language === "ml" ? "അടുത്തിടെ പുതുക്കിയവ" : "Recent Updates"}</option>
                    <option value="progress">{language === "ml" ? "പുരോഗതി %" : "Progress %"}</option>
                    <option value="name">{language === "ml" ? "പേര് (A-Z)" : "Name (A-Z)"}</option>
                  </select>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center rounded-xl bg-[#FAF7F0] border border-[#EDE6D8] p-0.5">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded-lg transition ${
                      viewMode === "grid" ? "bg-[#194B35] text-white shadow-xs" : "text-[#5C6A64] hover:text-[#194B35]"
                    }`}
                    title="Grid View"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setViewMode("table")}
                    className={`p-1.5 rounded-lg transition ${
                      viewMode === "table" ? "bg-[#194B35] text-white shadow-xs" : "text-[#5C6A64] hover:text-[#194B35]"
                    }`}
                    title="Table View"
                  >
                    <List className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Results */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          {filteredProjects.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-[#EDE6D8] shadow-xs">
              <HardHat className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-[#194B35] font-malayalam-heading">
                {language === "ml" ? "പദ്ധതികൾ ഒന്നും കണ്ടെത്താനായില്ല" : "No Projects Found"}
              </h3>
              <p className="text-xs text-[#5C6A64] mt-1 max-w-md mx-auto">
                {language === "ml"
                  ? "തിരഞ്ഞെടുത്ത ഫിൽട്ടറുകൾ പ്രകാരം പദ്ധതികൾ ലഭ്യമല്ല. മറ്റ് വിഭാഗങ്ങളോ വാർഡുകളോ തിരഞ്ഞെടുക്കുക."
                  : "No projects match your current filter parameters. Try clearing some filters."}
              </p>
              <button
                onClick={clearAllFilters}
                className="mt-4 px-4 py-2 rounded-xl bg-[#194B35] text-white text-xs font-bold hover:bg-[#123626] transition shadow-xs"
              >
                {language === "ml" ? "എല്ലാ ഫിൽട്ടറുകളും പുനഃക്രമീകരിക്കുക" : "Reset All Filters"}
              </button>
            </div>
          ) : viewMode === "grid" ? (
            /* ================= GRID VIEW ================= */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProjects.map((proj) => {
                const latestUpdate = proj.progress_updates?.[0];
                return (
                  <div
                    key={proj.id}
                    className="bg-white rounded-3xl border border-[#EDE6D8] p-5 shadow-xs hover:shadow-md hover:border-[#194B35] transition flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#194B35]/10 text-[#194B35] flex items-center gap-1">
                          {getCategoryIcon(proj.category)}
                          <span>{language === "ml" ? proj.category_name_ml : proj.category_name}</span>
                        </span>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${getStatusBadgeClass(proj.status)}`}>
                          {proj.status}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-base text-[#194B35] font-malayalam-heading group-hover:text-[#C39A5B] transition line-clamp-2">
                        <Link href={`/development/projects/${proj.id}`}>
                          {language === "ml" ? proj.title_ml : proj.title}
                        </Link>
                      </h3>

                      {/* Locality / Ward Info */}
                      <div className="mt-2 flex items-center gap-2 text-xs text-[#5C6A64]">
                        <MapPin className="w-3.5 h-3.5 text-[#C39A5B] shrink-0" />
                        <span className="truncate">
                          {proj.locality || "Tanur Municipality"}
                          {proj.ward_number ? ` • Ward ${proj.ward_number}` : ""}
                        </span>
                      </div>

                      {/* Budget & Verification */}
                      <div className="mt-3 p-3 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] space-y-1.5 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-[#5C6A64]">
                            {proj.status === "Proposed" ? (language === "ml" ? "എസ്റ്റിമേറ്റ് ബജറ്റ്" : "Estimated Budget") :
                             proj.status === "Completed" ? (language === "ml" ? "ഓഡിറ്റ് ചെലവ്" : "Audited Cost") :
                             (language === "ml" ? "സാങ്കേതിക വിഹിതം" : "Sanctioned Budget")}
                          </span>
                          <strong className="text-[#194B35] font-mono">{proj.budget_sanctioned}</strong>
                        </div>
                        <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-gray-100">
                          <span className="text-[#5C6A64] text-[10px]">
                            {language === "ml" ? "പരിശോധനാ സ്ഥിതി:" : "Status:"}
                          </span>
                          {proj.status === "Completed" ? (
                            <VerificationBadge level="verified" citation="Commissioned" size="sm" language={language} />
                          ) : proj.status === "Approved" ? (
                            <VerificationBadge level="verified" citation="Sanctioned" size="sm" language={language} />
                          ) : proj.status === "Proposed" ? (
                            <VerificationBadge level="partially_verified" citation="Proposal" size="sm" language={language} />
                          ) : (
                            <VerificationBadge level="awaiting_verification" size="sm" language={language} />
                          )}
                        </div>
                      </div>

                      {/* Responsible Department */}
                      <div className="mt-3 text-[11px] text-[#5C6A64] flex items-center justify-between">
                        <span className="truncate max-w-[200px]">
                          {language === "ml" ? proj.department_ml : proj.department}
                        </span>
                        {proj.is_verified && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-emerald-600" />
                            <span>Verified</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-4 pt-3 border-t border-[#EDE6D8] flex items-center justify-between">
                      <span className="text-[10px] text-[#7A8880]">
                        Updated: {proj.last_verified_date || proj.announcement_date}
                      </span>
                      <Link
                        href={`/development/projects/${proj.id}`}
                        className="text-xs font-bold text-[#194B35] group-hover:text-[#C39A5B] flex items-center gap-1 transition"
                      >
                        <span>{language === "ml" ? "വിശദാംശങ്ങൾ" : "Details"}</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* ================= TABLE VIEW ================= */
            <div className="bg-white rounded-3xl border border-[#EDE6D8] shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF7F0] border-b border-[#EDE6D8] text-[#5C6A64] uppercase font-bold text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">പദ്ധതി (Project)</th>
                      <th className="py-3 px-4">വിഭാഗം</th>
                      <th className="py-3 px-4">പ്രദേശം / വാർഡ്</th>
                      <th className="py-3 px-4">അവസ്ഥ</th>
                      <th className="py-3 px-4">ബജറ്റ്</th>
                      <th className="py-3 px-4">പുരോഗതി</th>
                      <th className="py-3 px-4 text-right">വിശദാംശങ്ങൾ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EDE6D8]">
                    {filteredProjects.map((proj) => (
                      <tr key={proj.id} className="hover:bg-[#FAF7F0]/60 transition">
                        <td className="py-3 px-4 font-bold text-[#194B35] max-w-xs">
                          <Link href={`/development/projects/${proj.id}`} className="hover:text-[#C39A5B]">
                            {language === "ml" ? proj.title_ml : proj.title}
                          </Link>
                          <div className="text-[10px] text-[#7A8880] truncate font-normal">
                            {language === "ml" ? proj.department_ml : proj.department}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-[#5C6A64]">
                          {language === "ml" ? proj.category_name_ml : proj.category_name}
                        </td>
                        <td className="py-3 px-4 text-[#5C6A64]">
                          {proj.locality || "Tanur"} {proj.ward_number ? `(W${proj.ward_number})` : ""}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadgeClass(proj.status)}`}>
                            {proj.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-[#194B35]">
                          {proj.budget_sanctioned}
                        </td>
                        <td className="py-3 px-4">
                          {proj.status === "Completed" ? (
                            <VerificationBadge level="verified" citation="Commissioned" size="sm" language={language} />
                          ) : proj.status === "Approved" ? (
                            <VerificationBadge level="verified" citation="Sanctioned" size="sm" language={language} />
                          ) : proj.status === "Proposed" ? (
                            <VerificationBadge level="partially_verified" citation="Proposal" size="sm" language={language} />
                          ) : (
                            <VerificationBadge level="awaiting_verification" size="sm" language={language} />
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Link
                            href={`/development/projects/${proj.id}`}
                            className="inline-flex items-center gap-1 font-bold text-[#194B35] hover:text-[#C39A5B]"
                          >
                            <span>Open</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}

export default function DevelopmentProjectsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAF7F0] flex items-center justify-center p-8 text-[#194B35] font-bold">
        <HardHat className="w-8 h-8 animate-bounce mr-3" />
        <span>പദ്ധതി വിവരങ്ങൾ ലോഡ് ചെയ്യുന്നു (Loading Project Directory)...</span>
      </div>
    }>
      <ProjectDirectoryContent />
    </Suspense>
  );
}
