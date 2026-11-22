"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { DevelopmentNav } from "@/components/development/DevelopmentNav";
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
  ProjectCategory,
  ContributionType 
} from "@/types/digitalMunicipality";
import { VerificationBadge } from "@/components/common/VerificationBadge";
import {
  HardHat,
  Search,
  Filter,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Building2,
  Car,
  Droplets,
  Trash2,
  GraduationCap,
  Activity,
  Leaf,
  Sun,
  Users,
  Layers,
  ChevronRight,
  Compass,
  FileCheck2,
  MessageSquarePlus,
  Send,
  X,
  Plus,
  Coins,
  MapPin,
  HelpCircle,
  ExternalLink
} from "lucide-react";

// Dynamic import for Leaflet-based project map
const DevelopmentProjectMap = dynamic(
  () => import("@/components/development/DevelopmentProjectMap").then((mod) => mod.DevelopmentProjectMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-[450px] w-full rounded-3xl bg-[#EDE6D8] animate-pulse flex flex-col items-center justify-center text-[#5C6A64] text-center p-6">
        <HardHat className="w-8 h-8 text-[#194B35] animate-bounce mb-2" />
        <p className="font-bold text-sm text-[#194B35]">
          Loading Transparent Tanur Project Map...
        </p>
        <p className="text-xs text-[#5C6A64]">Connecting to verified GIS coordinates</p>
      </div>
    ),
  }
);

export default function DevelopmentDashboardPage() {
  const { role, user } = useAuth();

  const [projects] = useState<DevelopmentProject[]>(() => digitalMunicipalityStore.getProjects());
  const [stats] = useState(() => digitalMunicipalityStore.getProjectStats());

  // Filter state for inline explorer
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedWard, setSelectedWard] = useState<number>(0);

  // Public Contribution Modal state
  const [isSuggestModalOpen, setIsSuggestModalOpen] = useState(false);
  const [suggestionType, setSuggestionType] = useState<ContributionType>("suggest_project");
  const [suggestForm, setSuggestForm] = useState({
    title: "",
    details: "",
    author_name: user?.display_name || user?.username || "",
    author_phone: user?.phone || "",
    author_email: user?.email || "",
    locality: "Tanur Town",
    ward_number: 1,
    evidence_url: "",
  });
  const [submissionFeedback, setSubmissionFeedback] = useState<string | null>(null);

  const handleSuggestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestForm.title.trim() || !suggestForm.details.trim()) return;

    digitalMunicipalityStore.addProjectContribution({
      type: suggestionType,
      title: suggestForm.title,
      details: suggestForm.details,
      author_name: suggestForm.author_name || "Anonymous Resident",
      author_phone: suggestForm.author_phone,
      author_email: suggestForm.author_email,
      locality: suggestForm.locality,
      ward_number: Number(suggestForm.ward_number) || undefined,
      evidence_url: suggestForm.evidence_url || undefined,
    });

    setSubmissionFeedback("Your project submission has been received for municipal review. Thank you!");

    setTimeout(() => {
      setIsSuggestModalOpen(false);
      setSubmissionFeedback(null);
      setSuggestForm({
        title: "",
        details: "",
        author_name: "",
        author_phone: "",
        author_email: "",
        locality: "Tanur Town",
        ward_number: 1,
        evidence_url: "",
      });
    }, 2200);
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
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
      if (selectedWard > 0 && p.ward_number !== selectedWard) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchDesc = p.description.toLowerCase().includes(q);
        const matchDept = p.department.toLowerCase().includes(q);
        const matchLoc = p.locality ? p.locality.toLowerCase().includes(q) : false;
        if (!matchTitle && !matchDesc && !matchDept && !matchLoc) return false;
      }
      return true;
    });
  }, [projects, selectedCategory, selectedStatus, selectedWard, searchQuery]);

  const getCategoryIcon = (key: string) => {
    switch (key) {
      case "roads_transportation":
      case "roads_transport": 
        return <Car className="w-4 h-4" />;
      case "drainage_water":
      case "water_drainage": 
        return <Droplets className="w-4 h-4" />;
      case "drinking_water":
      case "water_sanitation": 
        return <Droplets className="w-4 h-4 text-teal-600" />;
      case "waste_management": 
        return <Trash2 className="w-4 h-4" />;
      case "education": 
        return <GraduationCap className="w-4 h-4" />;
      case "healthcare": 
        return <Activity className="w-4 h-4" />;
      case "public_infrastructure":
      case "public_facilities": 
        return <Building2 className="w-4 h-4" />;
      case "parks_public_spaces":
      case "environment":
      case "sports_youth": 
        return <Leaf className="w-4 h-4" />;
      default: 
        return <Layers className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] flex flex-col font-sans">
      <Navbar />
      <DevelopmentNav />

      <main className="flex-1 pb-20">
        {/* ========================================================================= */}
        {/* 1. HERO SECTION                                                          */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#194B35] via-[#123626] to-[#194B35] text-white pt-10 pb-16 sm:pt-14 sm:pb-20">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C39A5B_1px,transparent_1px)] [background-size:24px_24px]" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs text-[#FAF7F0] font-semibold mb-5">
              <span className="w-2 h-2 rounded-full bg-[#C39A5B] animate-pulse" />
              <span>TRANSPARENT TANUR • Municipal Development Tracker</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  Transparent Tanur: <br />
                  <span className="text-[#C39A5B]">Every Project. Every Update. Open to the People.</span>
                </h1>

                <p className="mt-4 text-base sm:text-lg text-[#EDE6D8] max-w-2xl leading-relaxed">
                  Discover, track, and verify municipal development projects across all 45 wards of Tanur Municipality. Backed by verified government gazettes, approved budgets, and on-site engineering inspection records.
                </p>

                {/* Statutory Transparency Pill */}
                <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1 rounded-xl bg-white/5 border border-white/10 text-xs text-white/80">
                  <ShieldCheck className="w-4 h-4 text-[#C39A5B] shrink-0" />
                  <span>Independent civic monitoring • Grounded strictly in official published records</span>
                </div>

                {/* CTAs */}
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href="/development/projects"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#C39A5B] text-[#194B35] font-bold text-sm hover:bg-[#b0874a] transition shadow-lg shadow-black/20"
                  >
                    <Search className="w-4 h-4" />
                    <span>Browse All Projects</span>
                  </Link>

                  <button
                    onClick={() => {
                      setSuggestionType("suggest_project");
                      setIsSuggestModalOpen(true);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition backdrop-blur-sm"
                  >
                    <MessageSquarePlus className="w-4 h-4 text-[#C39A5B]" />
                    <span>Suggest a Project</span>
                  </button>

                  {(role === "admin" || role === "moderator") && (
                    <Link
                      href="/admin/development"
                      className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-emerald-800/80 hover:bg-emerald-700 text-white text-xs font-bold border border-emerald-500/40 transition"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-300" />
                      <span>Admin Panel</span>
                    </Link>
                  )}
                </div>
              </div>

              {/* Right Hero Highlights Box */}
              <div className="lg:col-span-4 bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/15 text-white shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#C39A5B]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C39A5B]">
                      Transparency Standards
                    </span>
                  </div>
                  <span className="text-[11px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full">
                    Official Sync
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="text-white/70">Tracked Budget</span>
                    <span className="font-bold text-white text-sm">{stats.total_budget_cr}</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="text-white/70">Verified Records</span>
                    <span className="font-bold">{stats.verified} / {stats.total} Primary Sourced</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="text-white/70">Active In-Progress</span>
                    <span className="font-bold text-amber-300">{stats.in_progress} Works Active</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="text-white/70">Completed Projects</span>
                    <span className="font-bold text-emerald-300">{stats.completed} Commissioned</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Ward Coverage</span>
                    <span className="font-bold">All 45 Wards</span>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-white/10 text-[11px] text-stone-300 flex items-center justify-between">
                  <span>Data Sources: LSGD Kerala, PWD, KWA</span>
                  <Link href="/development/projects" className="text-[#C39A5B] font-bold hover:underline">
                    View Registry →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. STATS KPI DASHBOARD                                                    */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
            {/* Total Projects */}
            <div className="bg-white p-4 rounded-2xl border border-[#EDE6D8] shadow-sm hover:border-[#194B35] transition">
              <span className="text-[11px] font-semibold text-[#5C6A64] block mb-1">
                Total Projects
              </span>
              <div className="text-2xl font-extrabold text-[#194B35]">{stats.total}</div>
              <div className="text-[10px] text-[#5C6A64] mt-0.5">Wards 1–45</div>
            </div>

            {/* Proposed */}
            <div className="bg-white p-4 rounded-2xl border border-[#EDE6D8] shadow-sm hover:border-amber-500 transition">
              <span className="text-[11px] font-semibold text-amber-700 block mb-1">
                Proposed
              </span>
              <div className="text-2xl font-extrabold text-amber-700">{stats.proposed}</div>
              <div className="text-[10px] text-[#5C6A64] mt-0.5">Under Assessment</div>
            </div>

            {/* Approved */}
            <div className="bg-white p-4 rounded-2xl border border-[#EDE6D8] shadow-sm hover:border-teal-500 transition">
              <span className="text-[11px] font-semibold text-teal-700 block mb-1">
                Approved
              </span>
              <div className="text-2xl font-extrabold text-teal-700">{stats.approved}</div>
              <div className="text-[10px] text-[#5C6A64] mt-0.5">Sanctioned</div>
            </div>

            {/* Planned */}
            <div className="bg-white p-4 rounded-2xl border border-[#EDE6D8] shadow-sm hover:border-indigo-500 transition">
              <span className="text-[11px] font-semibold text-indigo-700 block mb-1">
                Planned
              </span>
              <div className="text-2xl font-extrabold text-indigo-700">{stats.planned || 1}</div>
              <div className="text-[10px] text-[#5C6A64] mt-0.5">Tender Stage</div>
            </div>

            {/* In Progress */}
            <div className="bg-white p-4 rounded-2xl border border-[#EDE6D8] shadow-sm hover:border-emerald-600 transition">
              <span className="text-[11px] font-semibold text-emerald-800 block mb-1">
                In Progress
              </span>
              <div className="text-2xl font-extrabold text-emerald-700">{stats.in_progress}</div>
              <div className="text-[10px] text-[#5C6A64] mt-0.5">Active On Ground</div>
            </div>

            {/* Delayed */}
            <div className="bg-white p-4 rounded-2xl border border-[#EDE6D8] shadow-sm hover:border-rose-500 transition">
              <span className="text-[11px] font-semibold text-rose-700 block mb-1">
                Delayed
              </span>
              <div className="text-2xl font-extrabold text-rose-700">{stats.delayed}</div>
              <div className="text-[10px] text-[#5C6A64] mt-0.5">Pending Clearance</div>
            </div>

            {/* Completed */}
            <div className="bg-white p-4 rounded-2xl border border-[#EDE6D8] shadow-sm hover:border-[#194B35] transition">
              <span className="text-[11px] font-semibold text-[#194B35] block mb-1">
                Completed
              </span>
              <div className="text-2xl font-extrabold text-[#194B35]">{stats.completed}</div>
              <div className="text-[10px] text-[#5C6A64] mt-0.5">Commissioned</div>
            </div>

            {/* On Hold / Cancelled */}
            <div className="bg-white p-4 rounded-2xl border border-[#EDE6D8] shadow-sm hover:border-stone-400 transition">
              <span className="text-[11px] font-semibold text-stone-700 block mb-1">
                On Hold
              </span>
              <div className="text-2xl font-extrabold text-stone-700">{stats.on_hold}</div>
              <div className="text-[10px] text-[#5C6A64] mt-0.5">Review Required</div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. INTERACTIVE PROJECT GIS MAP SECTION                                    */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#194B35]/10 text-[#194B35] text-xs font-bold mb-2">
                <Compass className="w-3.5 h-3.5" />
                <span>Geographic Project Mapping</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#194B35]">
                Tanur Municipal Development Map
              </h2>
              <p className="text-xs sm:text-sm text-[#5C6A64] mt-0.5">
                Explore verified project locations across Tanur Municipality wards. Click on any pin to view project details, status, and budget.
              </p>
            </div>

            <Link
              href="/development/projects"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-[#194B35] border border-[#EDE6D8] text-xs font-bold hover:bg-[#FAF7F0] transition shadow-xs self-start sm:self-auto"
            >
              <span>View Full Directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <DevelopmentProjectMap projects={projects} />
        </section>

        {/* ========================================================================= */}
        {/* 4. EXPLORE BY 9 STATUTORY CATEGORIES                                      */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-18">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#194B35]">
              9 Statutory Development Categories
            </h2>
            <p className="text-xs sm:text-sm text-[#5C6A64] mt-0.5">
              Structured civic classification covering infrastructure, healthcare, water, and public utilities in Tanur.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3">
            {TRANSPARENT_PROJECT_CATEGORIES.map((cat) => {
              const count = projects.filter((p) => {
                if (p.category === cat.key) return true;
                if ("legacy_keys" in cat && Array.isArray((cat as any).legacy_keys)) {
                  return (cat as any).legacy_keys.includes(p.category);
                }
                return false;
              }).length;

              const isSelected = selectedCategory === cat.key;

              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(isSelected ? "all" : cat.key)}
                  className={`p-3.5 rounded-2xl border transition flex flex-col justify-between text-left ${
                    isSelected 
                      ? "bg-[#194B35] text-white border-[#194B35] shadow-sm"
                      : "bg-white text-[#1A2420] border-[#EDE6D8] hover:border-[#194B35]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`p-1.5 rounded-xl ${isSelected ? "bg-white/20 text-white" : "bg-[#FAF7F0] text-[#194B35]"}`}>
                      {getCategoryIcon(cat.key)}
                    </span>
                    <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-full ${
                      isSelected ? "bg-white/20 text-white" : "bg-neutral-100 text-[#5C6A64]"
                    }`}>
                      {count}
                    </span>
                  </div>
                  <h3 className={`font-bold text-xs leading-snug line-clamp-2 ${isSelected ? "text-white" : "text-[#194B35]"}`}>
                    {cat.label}
                  </h3>
                </button>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. SEARCH & WARD FILTERABLE PROJECT DIRECTORY                             */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-18">
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#EDE6D8] shadow-xs mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#194B35]">
                  Search & Filter Projects
                </h2>
                <p className="text-xs text-[#5C6A64]">
                  Filter by category, ward (1–45), and progress status.
                </p>
              </div>

              {(selectedCategory !== "all" || selectedStatus !== "all" || selectedWard > 0 || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedStatus("all");
                    setSelectedWard(0);
                    setSearchQuery("");
                  }}
                  className="text-xs font-bold text-rose-700 hover:underline self-start lg:self-auto"
                >
                  Clear All Filters
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Search Input */}
              <div className="relative">
                <Search className="w-4 h-4 text-[#7A8880] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search project title, department..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#FAF7F0] border border-[#EDE6D8] text-xs font-medium text-[#1A2420] placeholder-[#7A8880]"
                />
              </div>

              {/* Status Select */}
              <div>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF7F0] border border-[#EDE6D8] text-xs font-medium text-[#1A2420]"
                >
                  <option value="all">All Progress Statuses</option>
                  <option value="Proposed">Proposed</option>
                  <option value="Approved">Approved</option>
                  <option value="Planned">Planned</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Delayed">Delayed</option>
                  <option value="Completed">Completed</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              {/* Ward Select (1 to 45) */}
              <div>
                <select
                  value={selectedWard}
                  onChange={(e) => setSelectedWard(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF7F0] border border-[#EDE6D8] text-xs font-medium text-[#1A2420]"
                >
                  <option value={0}>All 45 Wards (Tanur Municipality)</option>
                  {TANUR_MUNICIPAL_WARDS.map((w) => (
                    <option key={w.id} value={w.ward_number}>
                      Ward {w.ward_number}: {w.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category Select */}
              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF7F0] border border-[#EDE6D8] text-xs font-medium text-[#1A2420]"
                >
                  <option value="all">All 9 Categories</option>
                  {TRANSPARENT_PROJECT_CATEGORIES.map((c) => (
                    <option key={c.key} value={c.key}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProjects.map((proj) => {
              const latestUpdate = proj.progress_updates[0];
              const approvedBudget = proj.approved_budget || proj.budget_sanctioned;

              return (
                <div
                  key={proj.id}
                  className="bg-white rounded-3xl border border-[#EDE6D8] p-5 shadow-xs hover:shadow-md hover:border-[#194B35] transition flex flex-col justify-between"
                >
                  <div>
                    {/* Header Badges */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#194B35]/10 text-[#194B35]">
                        {proj.category_name}
                      </span>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        proj.status === "Completed" ? "bg-emerald-100 text-emerald-800" :
                        proj.status === "In Progress" ? "bg-amber-100 text-amber-800" :
                        proj.status === "Approved" ? "bg-teal-100 text-teal-800" :
                        proj.status === "Planned" ? "bg-indigo-100 text-indigo-800" :
                        proj.status === "Delayed" ? "bg-rose-100 text-rose-800" :
                        proj.status === "Proposed" ? "bg-purple-100 text-purple-800" :
                        "bg-neutral-100 text-neutral-700"
                      }`}>
                        {proj.status}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-[#194B35] line-clamp-2">
                      {proj.title}
                    </h3>

                    {/* Ward & Locality */}
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-[#5C6A64]">
                      <MapPin className="w-3.5 h-3.5 text-[#C39A5B] shrink-0" />
                      <span>{proj.locality || "Tanur"} {proj.ward_number ? `• Ward ${proj.ward_number}` : ""}</span>
                    </div>

                    {/* Financial Summary */}
                    <div className="mt-3 p-3 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[#5C6A64]">Approved Budget:</span>
                        <span className="font-extrabold text-[#194B35] font-mono">{approvedBudget}</span>
                      </div>
                      {proj.estimated_cost && (
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-[#5C6A64]">Estimated Cost:</span>
                          <span className="font-semibold text-neutral-700 font-mono">{proj.estimated_cost}</span>
                        </div>
                      )}
                      {proj.actual_expenditure && (
                        <div className="flex items-center justify-between text-[11px] pt-1 border-t border-[#EDE6D8]">
                          <span className="text-[#5C6A64]">Actual Spent:</span>
                          <span className="font-bold text-emerald-800 font-mono">{proj.actual_expenditure}</span>
                        </div>
                      )}
                    </div>

                    {/* Progress Percentage Indicator */}
                    {proj.progress_percentage !== undefined && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-[11px] mb-1">
                          <span className="text-[#5C6A64] font-medium">Verified Progress</span>
                          <span className="font-bold text-[#194B35]">{proj.progress_percentage}%</span>
                        </div>
                        <div className="bg-[#EDE6D8] h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-[#194B35] h-full transition-all duration-500 rounded-full" 
                            style={{ width: `${proj.progress_percentage}%` }} 
                          />
                        </div>
                      </div>
                    )}

                    {/* Latest Milestone Snippet */}
                    {latestUpdate && (
                      <div className="mt-3 p-2.5 rounded-xl bg-white border border-[#EDE6D8] text-xs">
                        <div className="flex items-center justify-between text-[10px] text-[#5C6A64] mb-0.5">
                          <span className="font-semibold text-[#194B35] flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {latestUpdate.date}
                          </span>
                          <span className="text-emerald-700 font-bold">Verified</span>
                        </div>
                        <div className="font-bold text-[#1A2420] line-clamp-1">
                          {latestUpdate.title}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#EDE6D8] flex items-center justify-between">
                    <span className="text-[10px] text-[#5C6A64] truncate max-w-[170px]">
                      {proj.department}
                    </span>
                    <Link
                      href={`/development/projects/${proj.id}`}
                      className="text-xs font-bold text-[#194B35] hover:text-[#C39A5B] flex items-center gap-1 transition"
                    >
                      <span>View Details</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredProjects.length === 0 && (
            <div className="bg-white rounded-3xl border border-[#EDE6D8] p-10 text-center">
              <HardHat className="w-10 h-10 text-[#C39A5B] mx-auto mb-2 opacity-50" />
              <h3 className="font-bold text-base text-[#194B35]">No projects matched your filters</h3>
              <p className="text-xs text-[#5C6A64] mt-1">
                Try resetting your search query or selecting &quot;All Categories&quot;.
              </p>
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* 6. PROJECTS BY LOCALITY SUMMARY                                           */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-18">
          <div className="bg-gradient-to-r from-[#194B35]/5 via-[#C39A5B]/10 to-[#194B35]/5 p-6 sm:p-8 rounded-3xl border border-[#EDE6D8]">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-[#194B35]">
                  Projects Across Tanur Localities
                </h2>
                <p className="text-xs sm:text-sm text-[#5C6A64] mt-0.5">
                  Locality-wise distribution of verified municipal works across all 45 municipal wards.
                </p>
              </div>
              <Link
                href="/development/projects"
                className="text-xs font-bold text-[#194B35] hover:underline"
              >
                View Full Registry →
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              {TANUR_LOCALITIES.map((loc) => {
                const count = projects.filter((p) => 
                  (p.locality && p.locality.toLowerCase().includes(loc.name.toLowerCase())) ||
                  (p.ward_number && loc.ward_numbers.includes(p.ward_number))
                ).length;

                return (
                  <Link
                    key={loc.id}
                    href={`/development/projects?locality=${encodeURIComponent(loc.name)}`}
                    className="bg-white p-4 rounded-2xl border border-[#EDE6D8] hover:border-[#C39A5B] transition shadow-xs"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold text-[#C39A5B] uppercase">
                        Wards {loc.ward_numbers.join(", ")}
                      </span>
                      <span className="text-xs font-extrabold text-[#194B35] bg-[#FAF7F0] px-2 py-0.5 rounded-md">
                        {count} works
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-[#194B35]">
                      {loc.name}
                    </h4>
                    <p className="text-[11px] text-[#5C6A64] mt-0.5 line-clamp-1">
                      {loc.tagline}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. CITIZEN PARTICIPATION CTA BANNER                                       */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-18">
          <div className="bg-gradient-to-r from-[#194B35] to-[#123626] rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#C39A5B] text-xs font-bold mb-3 border border-white/20">
                <Users className="w-3.5 h-3.5" />
                <span>Citizen Participation & Transparency</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold">
                Know About a Project? Share Public Evidence!
              </h2>
              <p className="text-xs sm:text-sm text-[#EDE6D8] mt-2 leading-relaxed">
                Submit public project evidence, progress photographs, or report outdated information. Community submissions are reviewed against official public records before publication.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full sm:w-auto">
              <button
                onClick={() => {
                  setSuggestionType("suggest_project");
                  setIsSuggestModalOpen(true);
                }}
                className="px-5 py-3 rounded-2xl bg-[#C39A5B] hover:bg-[#b0874a] text-[#194B35] font-extrabold text-xs sm:text-sm transition shadow-md flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Suggest Project</span>
              </button>

              <button
                onClick={() => {
                  setSuggestionType("submit_photo");
                  setIsSuggestModalOpen(true);
                }}
                className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition flex items-center justify-center gap-2 backdrop-blur-sm"
              >
                <Send className="w-4 h-4 text-[#C39A5B]" />
                <span>Submit Photo / Update</span>
              </button>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PUBLIC SUGGESTION MODAL (ENGLISH ONLY)                                    */}
        {/* ========================================================================= */}
        {isSuggestModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
            <div className="bg-white rounded-3xl border border-[#EDE6D8] max-w-lg w-full p-6 shadow-2xl relative">
              <button
                onClick={() => setIsSuggestModalOpen(false)}
                className="absolute right-4 top-4 text-neutral-400 hover:text-neutral-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <HardHat className="w-5 h-5 text-[#C39A5B]" />
                <h3 className="font-bold text-lg text-[#194B35]">
                  Transparent Tanur: Public Submission
                </h3>
              </div>

              {submissionFeedback ? (
                <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                  {submissionFeedback}
                </div>
              ) : (
                <form onSubmit={handleSuggestionSubmit} className="space-y-3.5 text-xs">
                  <div>
                    <label className="font-bold text-[#1A2420] block mb-1">
                      Contribution Type
                    </label>
                    <select
                      value={suggestionType}
                      onChange={(e) => setSuggestionType(e.target.value as ContributionType)}
                      className="w-full px-3 py-2 rounded-xl border border-[#EDE6D8] bg-[#FAF7F0] font-semibold text-[#1A2420]"
                    >
                      <option value="suggest_project">Suggest a New Project</option>
                      <option value="submit_photo">Submit Progress Photographs</option>
                      <option value="submit_info">Submit Verified Public Information</option>
                      <option value="report_outdated">Report Outdated Status</option>
                      <option value="ask_question">Ask Question About a Project</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-[#1A2420] block mb-1">
                      Title / Project Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Coastal Road Maintenance"
                      value={suggestForm.title}
                      onChange={(e) => setSuggestForm({ ...suggestForm, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-[#EDE6D8] bg-[#FAF7F0]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-[#1A2420] block mb-1">
                        Ward Number (1–45)
                      </label>
                      <select
                        value={suggestForm.ward_number}
                        onChange={(e) => setSuggestForm({ ...suggestForm, ward_number: Number(e.target.value) })}
                        className="w-full px-3 py-2 rounded-xl border border-[#EDE6D8] bg-[#FAF7F0]"
                      >
                        {Array.from({ length: 45 }, (_, i) => i + 1).map((w) => (
                          <option key={w} value={w}>Ward {w}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="font-bold text-[#1A2420] block mb-1">
                        Locality / Area
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Tanur Harbour"
                        value={suggestForm.locality}
                        onChange={(e) => setSuggestForm({ ...suggestForm, locality: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-[#EDE6D8] bg-[#FAF7F0]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-[#1A2420] block mb-1">
                      Detailed Notes & Description *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Provide accurate public details, location, and context..."
                      value={suggestForm.details}
                      onChange={(e) => setSuggestForm({ ...suggestForm, details: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-[#EDE6D8] bg-[#FAF7F0]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-[#1A2420] block mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        placeholder="Name"
                        value={suggestForm.author_name}
                        onChange={(e) => setSuggestForm({ ...suggestForm, author_name: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-[#EDE6D8] bg-[#FAF7F0]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-[#1A2420] block mb-1">
                        Phone (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="Phone"
                        value={suggestForm.author_phone}
                        onChange={(e) => setSuggestForm({ ...suggestForm, author_phone: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-[#EDE6D8] bg-[#FAF7F0]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-[#1A2420] block mb-1">
                      Evidence URL or Photo Link
                    </label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={suggestForm.evidence_url}
                      onChange={(e) => setSuggestForm({ ...suggestForm, evidence_url: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-[#EDE6D8] bg-[#FAF7F0]"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsSuggestModalOpen(false)}
                      className="px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-[#1A2420] font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-[#194B35] hover:bg-[#123626] text-white font-bold transition shadow-sm"
                    >
                      Submit Contribution ✓
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
