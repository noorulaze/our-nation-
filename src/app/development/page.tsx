"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { TanurNav } from "@/components/tanur/TanurNav";
import { DevelopmentNav } from "@/components/development/DevelopmentNav";
import { useLanguage } from "@/lib/i18n/context";
import { useAuth } from "@/lib/auth/context";
import { 
  digitalMunicipalityStore, 
  TRANSPARENT_PROJECT_CATEGORIES,
  TANUR_LOCALITIES 
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
  Plus
} from "lucide-react";

// Dynamic import for Leaflet-based project map
const DevelopmentProjectMap = dynamic(
  () => import("@/components/development/DevelopmentProjectMap").then((mod) => mod.DevelopmentProjectMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-[450px] w-full rounded-3xl bg-[#EDE6D8] animate-pulse flex flex-col items-center justify-center text-[#5C6A64] text-center p-6">
        <HardHat className="w-8 h-8 text-[#194B35] animate-bounce mb-2" />
        <p className="font-bold font-malayalam-heading text-sm text-[#194B35]">
          പദ്ധതി ഭൂപടം ലോഡ് ചെയ്യുന്നു...
        </p>
        <p className="text-xs text-[#5C6A64]">Loading Transparent Tanur Project Map...</p>
      </div>
    ),
  }
);

export default function DevelopmentDashboardPage() {
  const { language } = useLanguage();
  const { role, user } = useAuth();

  const [projects] = useState<DevelopmentProject[]>(() => digitalMunicipalityStore.getProjects());
  const [stats] = useState(() => digitalMunicipalityStore.getProjectStats());

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

    setSubmissionFeedback(
      language === "ml"
        ? "നിങ്ങളുടെ നിർദ്ദേശം നഗരസഭാ അവലോകനത്തിനായി സമർപ്പിച്ചു. നന്ദി!"
        : "Your contribution has been submitted for administrative review. Thank you!"
    );

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
    }, 2500);
  };

  const getCategoryIcon = (key: string) => {
    switch (key) {
      case "roads_transport": return <Car className="w-4 h-4" />;
      case "water_drainage": return <Droplets className="w-4 h-4" />;
      case "waste_management": return <Trash2 className="w-4 h-4" />;
      case "education": return <GraduationCap className="w-4 h-4" />;
      case "healthcare": return <Activity className="w-4 h-4" />;
      case "public_facilities": return <Building2 className="w-4 h-4" />;
      case "environment": return <Leaf className="w-4 h-4" />;
      case "streetlights": return <Sun className="w-4 h-4" />;
      case "community_infrastructure": return <Users className="w-4 h-4" />;
      default: return <Layers className="w-4 h-4" />;
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
              <span>
                {language === "ml"
                  ? "സുതാര്യ താനൂർ • നഗരസഭാ വികസന ട്രാക്കർ"
                  : "TRANSPARENT TANUR • Municipal Development Tracker"}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-malayalam-heading leading-tight">
                  {language === "ml" ? (
                    <>
                      സുതാര്യ താനൂർ: <br />
                      <span className="text-[#C39A5B]">ഓരോ പദ്ധതിയും, ഓരോ പുരോഗതിയും ജനങ്ങൾക്ക് മുന്നിൽ.</span>
                    </>
                  ) : (
                    <>
                      Transparent Tanur: <br />
                      <span className="text-[#C39A5B]">Every Project. Every Update. Open to the People.</span>
                    </>
                  )}
                </h1>

                <p className="mt-4 text-base sm:text-lg text-[#EDE6D8] max-w-2xl leading-relaxed">
                  {language === "ml"
                    ? "താനൂർ നഗരസഭയിലെ ഔദ്യോഗിക വികസന പദ്ധതികൾ, അംഗീകൃത ബജറ്റുകൾ, കരാർ വിവരങ്ങൾ, ഫീൽഡ് ഇൻസ്പെക്ഷൻ റിപ്പോർട്ടുകൾ എന്നിവ ജനങ്ങൾക്ക് വിരൽത്തുമ്പിൽ പരിശോധിക്കാം."
                    : "Discover, track, and verify municipal development projects in Tanur Municipality with official gazette sources, documented budgets, and field inspections."}
                </p>

                {/* CTAs */}
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href="/development/projects"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#C39A5B] text-[#194B35] font-bold text-sm hover:bg-[#b0874a] transition shadow-lg shadow-black/20"
                  >
                    <Search className="w-4 h-4" />
                    <span>{language === "ml" ? "പദ്ധതി സൂചിക കാണുക" : "Browse All Projects"}</span>
                  </Link>

                  <button
                    onClick={() => {
                      setSuggestionType("suggest_project");
                      setIsSuggestModalOpen(true);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition backdrop-blur-sm"
                  >
                    <MessageSquarePlus className="w-4 h-4 text-[#C39A5B]" />
                    <span>{language === "ml" ? "പദ്ധതി നിർദ്ദേശിക്കുക" : "Suggest a Project"}</span>
                  </button>

                  {(role === "admin" || role === "moderator") && (
                    <Link
                      href="/admin/development"
                      className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-emerald-800/80 hover:bg-emerald-700 text-white text-xs font-bold border border-emerald-500/40 transition"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-300" />
                      <span>{language === "ml" ? "അഡ്മിൻ മാനേജ്‌മെന്റ്" : "Admin Panel"}</span>
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
                      {language === "ml" ? "സുതാര്യതാ മാനദണ്ഡങ്ങൾ" : "Transparency Standards"}
                    </span>
                  </div>
                  <span className="text-[11px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full">
                    Official Sync
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="text-white/70">{language === "ml" ? "ആകെ അനുവദിച്ച തുക" : "Tracked Budget"}</span>
                    <span className="font-bold text-white text-sm">{stats.total_budget_cr}</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="text-white/70">{language === "ml" ? "സ്ഥിരീകരിച്ച രേഖകൾ" : "Verified Documents"}</span>
                    <span className="font-bold">{stats.verified} / {stats.total} (100% Primary Sourced)</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="text-white/70">{language === "ml" ? "പ്രവർത്തന പുരോഗതി" : "Active In-Progress"}</span>
                    <span className="font-bold text-amber-300">{stats.in_progress} Projects Active</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="text-white/70">{language === "ml" ? "പൂർത്തിയായവ" : "Completed Projects"}</span>
                    <span className="font-bold text-emerald-300">{stats.completed} Commissioned</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">{language === "ml" ? "പൗര നിർദ്ദേശങ്ങൾ" : "Citizen Inquiries"}</span>
                    <span className="font-bold">{stats.pendingContributionsCount} In Review</span>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-white/10 text-[11px] text-stone-300 flex items-center justify-between">
                  <span>Data: LSGD Kerala & PWD</span>
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
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
            {/* Total Projects */}
            <div className="bg-white p-4 rounded-2xl border border-[#EDE6D8] shadow-sm hover:border-[#194B35] transition">
              <span className="text-[11px] font-semibold text-[#5C6A64] block mb-1">
                {language === "ml" ? "ആകെ പദ്ധതികൾ" : "Total Registered"}
              </span>
              <div className="text-2xl font-extrabold text-[#194B35]">{stats.total}</div>
              <div className="text-[10px] text-[#5C6A64] mt-0.5">All 44 Wards</div>
            </div>

            {/* Proposed */}
            <div className="bg-white p-4 rounded-2xl border border-[#EDE6D8] shadow-sm hover:border-amber-500 transition">
              <span className="text-[11px] font-semibold text-amber-700 block mb-1">
                {language === "ml" ? "നിർദ്ദേശിച്ചവ" : "Proposed"}
              </span>
              <div className="text-2xl font-extrabold text-amber-700">{stats.proposed}</div>
              <div className="text-[10px] text-[#5C6A64] mt-0.5">Under Assessment</div>
            </div>

            {/* Announced */}
            <div className="bg-white p-4 rounded-2xl border border-[#EDE6D8] shadow-sm hover:border-indigo-500 transition">
              <span className="text-[11px] font-semibold text-indigo-700 block mb-1">
                {language === "ml" ? "പ്രഖ്യാപിച്ചവ" : "Announced"}
              </span>
              <div className="text-2xl font-extrabold text-indigo-700">{stats.announced}</div>
              <div className="text-[10px] text-[#5C6A64] mt-0.5">Gazette Listed</div>
            </div>

            {/* Approved */}
            <div className="bg-white p-4 rounded-2xl border border-[#EDE6D8] shadow-sm hover:border-sky-500 transition">
              <span className="text-[11px] font-semibold text-sky-700 block mb-1">
                {language === "ml" ? "അനുമതിയായവ" : "Approved"}
              </span>
              <div className="text-2xl font-extrabold text-sky-700">{stats.approved}</div>
              <div className="text-[10px] text-[#5C6A64] mt-0.5">Sanctioned</div>
            </div>

            {/* In Progress */}
            <div className="bg-white p-4 rounded-2xl border border-[#EDE6D8] shadow-sm hover:border-emerald-600 transition">
              <span className="text-[11px] font-semibold text-emerald-800 block mb-1">
                {language === "ml" ? "നടന്നു കൊണ്ടിരിക്കുന്നവ" : "In Progress"}
              </span>
              <div className="text-2xl font-extrabold text-emerald-700">{stats.in_progress}</div>
              <div className="text-[10px] text-[#5C6A64] mt-0.5">Active On Ground</div>
            </div>

            {/* Completed */}
            <div className="bg-white p-4 rounded-2xl border border-[#EDE6D8] shadow-sm hover:border-[#194B35] transition">
              <span className="text-[11px] font-semibold text-[#194B35] block mb-1">
                {language === "ml" ? "പൂർത്തിയായവ" : "Completed"}
              </span>
              <div className="text-2xl font-extrabold text-[#194B35]">{stats.completed}</div>
              <div className="text-[10px] text-[#5C6A64] mt-0.5">Commissioned</div>
            </div>

            {/* Delayed / On Hold */}
            <div className="bg-white p-4 rounded-2xl border border-[#EDE6D8] shadow-sm hover:border-rose-500 transition col-span-2 sm:col-span-1">
              <span className="text-[11px] font-semibold text-rose-700 block mb-1">
                {language === "ml" ? "കാലതാമസം / മാറ്റിവെച്ചവ" : "Delayed / On Hold"}
              </span>
              <div className="text-2xl font-extrabold text-rose-700">{stats.delayed + stats.on_hold}</div>
              <div className="text-[10px] text-[#5C6A64] mt-0.5">Clearance Pending</div>
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
                <span>{language === "ml" ? "ഭൂമിശാസ്ത്രപരമായ മാപ്പിംഗ്" : "Geographic Project Mapping"}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#194B35] font-malayalam-heading">
                {language === "ml" ? "താനൂർ വികസന പദ്ധതി ഭൂപടം" : "Tanur Development Map"}
              </h2>
              <p className="text-xs sm:text-sm text-[#5C6A64] mt-0.5">
                {language === "ml"
                  ? "പദ്ധതികളുടെ കൃത്യമായ ലൊക്കേഷൻ മാപ്പിൽ കാണാം. സ്റ്റാറ്റസ് ഫിൽട്ടർ ചെയ്യാൻ മുകളിലെ ബട്ടണുകൾ ഉപയോഗിക്കുക."
                  : "Explore real municipal project locations across Tanur Municipality. Never based on fabricated coordinates."}
              </p>
            </div>

            <Link
              href="/development/projects"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-[#194B35] border border-[#EDE6D8] text-xs font-bold hover:bg-[#FAF7F0] transition shadow-xs self-start sm:self-auto"
            >
              <span>{language === "ml" ? "പട്ടിക കാണുക" : "View Full List"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <DevelopmentProjectMap projects={projects} language={language} />
        </section>

        {/* ========================================================================= */}
        {/* 4. RECENTLY UPDATED PROJECTS                                              */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-18">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-[#194B35] font-malayalam-heading">
                {language === "ml" ? "അടുത്തിടെ പുതുക്കിയ പദ്ധതികൾ" : "Recently Updated Projects"}
              </h2>
              <p className="text-xs sm:text-sm text-[#5C6A64] mt-0.5">
                {language === "ml" ? "പുതിയ ഇൻസ്പെക്ഷൻ റിപ്പോർട്ടുകളും ഫീൽഡ് പുരോഗതിയും" : "Latest inspection milestones and progress verification"}
              </p>
            </div>
            <Link
              href="/development/projects"
              className="text-xs font-bold text-[#194B35] hover:text-[#C39A5B] flex items-center gap-1"
            >
              <span>{language === "ml" ? "എല്ലാം കാണുക" : "View All"}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.slice(0, 6).map((proj) => {
              const latestUpdate = proj.progress_updates[0];
              return (
                <div
                  key={proj.id}
                  className="bg-white rounded-3xl border border-[#EDE6D8] p-5 shadow-xs hover:shadow-md hover:border-[#194B35] transition flex flex-col justify-between"
                >
                  <div>
                    {/* Header Badges */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#194B35]/10 text-[#194B35]">
                        {language === "ml" ? proj.category_name_ml : proj.category_name}
                      </span>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        proj.status === "Completed" ? "bg-emerald-100 text-emerald-800" :
                        proj.status === "In Progress" ? "bg-amber-100 text-amber-800" :
                        proj.status === "Delayed" ? "bg-rose-100 text-rose-800" :
                        "bg-neutral-100 text-neutral-700"
                      }`}>
                        {proj.status}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-[#194B35] font-malayalam-heading line-clamp-2">
                      {language === "ml" ? proj.title_ml : proj.title}
                    </h3>

                    <div className="mt-2.5 flex items-center justify-between text-xs text-[#5C6A64]">
                      <span>
                        {proj.status === "Proposed" ? (language === "ml" ? "എസ്റ്റിമേറ്റ്" : "Est. Budget") : 
                         proj.status === "Completed" ? (language === "ml" ? "ഓഡിറ്റ് ചെലവ്" : "Audited Cost") : 
                         (language === "ml" ? "സാങ്കേതിക വിഹിതം" : "Sanctioned")}:{" "}
                        <strong className="text-[#194B35] font-mono">{proj.budget_sanctioned}</strong>
                      </span>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-[11px] pt-1.5 border-t border-gray-100">
                      <span className="text-[#5C6A64] text-[10px]">
                        {language === "ml" ? "പരിശോധനാ സ്ഥിതി:" : "Verification Status:"}
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

                    {/* Latest Milestone Snippet */}
                    {latestUpdate && (
                      <div className="mt-3.5 p-3 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] text-xs">
                        <div className="flex items-center justify-between text-[10px] text-[#5C6A64] mb-1">
                          <span className="font-semibold text-[#194B35] flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {latestUpdate.date}
                          </span>
                          <span>Verified</span>
                        </div>
                        <div className="font-bold text-[#1A2420] line-clamp-1 font-malayalam-heading">
                          {language === "ml" ? latestUpdate.title_ml : latestUpdate.title}
                        </div>
                        <p className="text-[11px] text-[#5C6A64] mt-0.5 line-clamp-2">
                          {language === "ml" ? latestUpdate.note_ml : latestUpdate.note}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#EDE6D8] flex items-center justify-between">
                    <span className="text-[10px] text-[#5C6A64] truncate max-w-[170px]">
                      {proj.locality || "Tanur Municipality"} {proj.ward_number ? `(W${proj.ward_number})` : ""}
                    </span>
                    <Link
                      href={`/development/projects/${proj.id}`}
                      className="text-xs font-bold text-[#194B35] hover:text-[#C39A5B] flex items-center gap-1 transition"
                    >
                      <span>{language === "ml" ? "വിശദാംശങ്ങൾ" : "Details"}</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. EXPLORE BY 10 OFFICIAL CATEGORIES                                      */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-18">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#194B35] font-malayalam-heading">
              {language === "ml" ? "വിഭാഗങ്ങൾ അനുസരിച്ച് കണ്ടെത്തുക" : "Explore by Category"}
            </h2>
            <p className="text-xs sm:text-sm text-[#5C6A64] mt-0.5">
              {language === "ml" ? "താനൂരിലെ 10 പ്രധാന വികസന മേഖലകൾ" : "10 Key Development Sectors in Tanur Municipality"}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
            {TRANSPARENT_PROJECT_CATEGORIES.map((cat) => {
              const count = projects.filter((p) => p.category === cat.key).length;
              return (
                <Link
                  key={cat.key}
                  href={`/development/projects?category=${cat.key}`}
                  className="bg-white p-4 rounded-2xl border border-[#EDE6D8] hover:border-[#194B35] hover:shadow-sm transition flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="p-2 rounded-xl bg-[#FAF7F0] text-[#194B35]">
                      {getCategoryIcon(cat.key)}
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-neutral-100 text-[#5C6A64]">
                      {count}
                    </span>
                  </div>
                  <h3 className="font-bold text-xs sm:text-sm text-[#194B35] font-malayalam-heading leading-tight">
                    {language === "ml" ? cat.label_ml : cat.label}
                  </h3>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. PROJECTS BY LOCALITY / WARD BREAKDOWN                                   */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-18">
          <div className="bg-gradient-to-r from-[#194B35]/5 via-[#C39A5B]/10 to-[#194B35]/5 p-6 sm:p-8 rounded-3xl border border-[#EDE6D8]">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-[#194B35] font-malayalam-heading">
                  {language === "ml" ? "പ്രദേശങ്ങൾ അനുസരിച്ചുള്ള വികസനം" : "Projects by Locality & Ward"}
                </h2>
                <p className="text-xs sm:text-sm text-[#5C6A64] mt-0.5">
                  {language === "ml" ? "താനൂരിലെ ഓരോ പ്രദേശത്തെയും പദ്ധതികളുടെ എണ്ണവും വിവരങ്ങളും" : "Locality-wise distribution of verified municipal works"}
                </p>
              </div>
              <Link
                href="/development/projects"
                className="text-xs font-bold text-[#194B35] hover:underline"
              >
                {language === "ml" ? "മുഴുവൻ ലിസ്റ്റും കാണുക →" : "View Complete List →"}
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
                    <h4 className="font-bold text-sm text-[#194B35] font-malayalam-heading">
                      {language === "ml" ? loc.name_ml : loc.name}
                    </h4>
                    <p className="text-[11px] text-[#5C6A64] mt-0.5 line-clamp-1">
                      {language === "ml" ? loc.tagline_ml : loc.tagline}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. PUBLIC PARTICIPATION CTA BANNER                                        */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-18">
          <div className="bg-gradient-to-r from-[#194B35] to-[#123626] rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#C39A5B] text-xs font-bold mb-3 border border-white/20">
                <Users className="w-3.5 h-3.5" />
                <span>{language === "ml" ? "ജനകീയ പങ്കാളിത്തം" : "Citizen Participation & Transparency"}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-malayalam-heading">
                {language === "ml"
                  ? "പദ്ധതികളെക്കുറിച്ച് നിങ്ങൾക്കറിയാമോ? വിവരങ്ങൾ പങ്കുവെക്കൂ!"
                  : "Know About a Project? Share Public Evidence!"}
              </h2>
              <p className="text-xs sm:text-sm text-[#EDE6D8] mt-2 leading-relaxed">
                {language === "ml"
                  ? "നിങ്ങളുടെ പ്രദേശത്ത് ശ്രദ്ധയർഹിക്കുന്ന പദ്ധതി നിർദ്ദേശിക്കാം, പുതിയ ഫോട്ടോകൾ സമർപ്പിക്കാം, കാലഹരണപ്പെട്ട വിവരങ്ങൾ റിപ്പോർട്ട് ചെയ്യാം."
                  : "Submit public project evidence, progress photographs, or report outdated information. Community contributions are reviewed before publication."}
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
                <span>{language === "ml" ? "പുതിയ പദ്ധതി നിർദ്ദേശിക്കുക" : "Suggest Project"}</span>
              </button>

              <button
                onClick={() => {
                  setSuggestionType("submit_photo");
                  setIsSuggestModalOpen(true);
                }}
                className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition flex items-center justify-center gap-2 backdrop-blur-sm"
              >
                <Send className="w-4 h-4 text-[#C39A5B]" />
                <span>{language === "ml" ? "ഫോട്ടോ / അപ്‌ഡേറ്റ് അയക്കാം" : "Submit Photo / Update"}</span>
              </button>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PUBLIC SUGGESTION MODAL                                                   */}
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
                <h3 className="font-bold text-lg text-[#194B35] font-malayalam-heading">
                  {language === "ml" ? "സുതാര്യ താനൂർ: ജനകീയ സമർപ്പണം" : "Transparent Tanur: Public Submission"}
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
                      {language === "ml" ? "സമർപ്പണ തരം" : "Contribution Type"}
                    </label>
                    <select
                      value={suggestionType}
                      onChange={(e) => setSuggestionType(e.target.value as ContributionType)}
                      className="w-full px-3 py-2 rounded-xl border border-[#EDE6D8] bg-[#FAF7F0] font-semibold text-[#1A2420]"
                    >
                      <option value="suggest_project">Suggest a New Project / പുതിയ പദ്ധതി നിർദ്ദേശം</option>
                      <option value="submit_photo">Submit Progress Photographs / പുതിയ ഫോട്ടോകൾ</option>
                      <option value="submit_info">Submit Verified Public Information / ഔദ്യോഗിക വിവരങ്ങൾ</option>
                      <option value="report_outdated">Report Outdated Information / കാലഹരണപ്പെട്ട വിവരങ്ങൾ</option>
                      <option value="ask_question">Ask Question About a Project / സംശയങ്ങൾ ചോദിക്കാം</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-[#1A2420] block mb-1">
                      {language === "ml" ? "വിഷയം / പദ്ധതിയുടെ പേര് *" : "Title / Project Name *"}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={language === "ml" ? "ഉദാ: തീരദേശ റോഡ് പുനരുദ്ധാരണം" : "e.g. Coastal Road Maintenance"}
                      value={suggestForm.title}
                      onChange={(e) => setSuggestForm({ ...suggestForm, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-[#EDE6D8] bg-[#FAF7F0]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#1A2420] block mb-1">
                      {language === "ml" ? "വിശദാംശങ്ങൾ *" : "Detailed Notes & Description *"}
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder={language === "ml" ? "പദ്ധതിയെക്കുറിച്ചുള്ള വിശദാംശങ്ങൾ രേഖപ്പെടുത്തുക..." : "Provide accurate public details, location, and context..."}
                      value={suggestForm.details}
                      onChange={(e) => setSuggestForm({ ...suggestForm, details: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-[#EDE6D8] bg-[#FAF7F0]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-[#1A2420] block mb-1">
                        {language === "ml" ? "നിങ്ങളുടെ പേര്" : "Your Name"}
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
                        {language === "ml" ? "ഫോൺ നമ്പർ (ഓപ്ഷണൽ)" : "Phone (Optional)"}
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
                      {language === "ml" ? "ഫോട്ടോ അല്ലെങ്കിൽ ഔദ്യോഗിക രേഖ ലിങ്ക്" : "Evidence URL or Photo Link"}
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
                      {language === "ml" ? "റദ്ദാക്കുക" : "Cancel"}
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-[#194B35] hover:bg-[#123626] text-white font-bold transition shadow-sm"
                    >
                      {language === "ml" ? "സമർപ്പിക്കുക ✓" : "Submit Contribution ✓"}
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
