"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { CivicNav } from "@/components/civic/CivicNav";
import { useLanguage } from "@/lib/i18n/context";
import { 
  civicStore, 
  CIVIC_CATEGORIES, 
  CivicIssue 
} from "@/lib/data/civicConnectData";
import { 
  Search, 
  Filter, 
  MapPin, 
  ThumbsUp, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ArrowRight, 
  PlusCircle, 
  SlidersHorizontal, 
  Map as MapIcon, 
  Grid, 
  List, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight,
  Eye,
  Send
} from "lucide-react";

function CivicIssuesContent() {
  const { language } = useLanguage();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialStatus = searchParams.get("status") || "all";

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedStatus, setSelectedStatus] = useState<string>(initialStatus);
  const [selectedLocality, setSelectedLocality] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"recent" | "supported" | "priority">("recent");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Reactive store state
  const [issues, setIssues] = useState<CivicIssue[]>(() => civicStore.getIssues());

  const handleSupportToggle = (e: React.MouseEvent, issueId: string) => {
    e.preventDefault();
    e.stopPropagation();
    civicStore.toggleSupport(issueId);
    setIssues([...civicStore.getIssues()]);
  };

  const filteredIssues = useMemo(() => {
    let result = issues.filter((issue) => {
      // Category filter
      if (selectedCategory !== "all" && issue.category_id !== selectedCategory) {
        return false;
      }
      // Status filter
      if (selectedStatus !== "all") {
        if (selectedStatus === "pending") {
          if (issue.status !== "submitted" && issue.status !== "under_review") return false;
        } else if (issue.status !== selectedStatus) {
          return false;
        }
      }
      // Locality filter
      if (selectedLocality !== "all") {
        if (selectedLocality === "municipality" && !issue.locality.includes("Municipality") && issue.jurisdiction_type !== "municipality") return false;
        if (selectedLocality === "block" && !issue.locality.includes("Block") && issue.jurisdiction_type !== "block_panchayat") return false;
        if (selectedLocality === "other" && (issue.locality.includes("Municipality") || issue.locality.includes("Block"))) return false;
      }
      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesTitle = issue.title.toLowerCase().includes(query) || issue.title_ml.toLowerCase().includes(query);
        const matchesDesc = issue.description.toLowerCase().includes(query);
        const matchesTracking = issue.tracking_id.toLowerCase().includes(query);
        const matchesAddress = issue.address_landmark.toLowerCase().includes(query) || issue.locality.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesTracking && !matchesAddress) {
          return false;
        }
      }
      return true;
    });

    // Sorting
    return result.sort((a, b) => {
      if (sortBy === "supported") {
        return b.support_count - a.support_count;
      }
      if (sortBy === "priority") {
        const priorityOrder: Record<string, number> = { urgent: 4, high: 3, medium: 2, low: 1 };
        return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
      }
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }, [issues, selectedCategory, selectedStatus, selectedLocality, searchTerm, sortBy]);

  const getStatusBadge = (status: CivicIssue['status']) => {
    switch (status) {
      case "resolved":
        return { label: language === "ml" ? "പരിഹരിച്ചു" : "Resolved", bg: "bg-emerald-100 text-emerald-800 border-emerald-300", icon: CheckCircle2 };
      case "in_progress":
        return { label: language === "ml" ? "നടപടി പുരോഗമിക്കുന്നു" : "In Progress", bg: "bg-blue-100 text-blue-800 border-blue-300", icon: Clock };
      case "forwarded":
        return { label: language === "ml" ? "അധികൃതർക്ക് കൈമാറി" : "Forwarded", bg: "bg-amber-100 text-amber-800 border-amber-300", icon: Send };
      case "verified":
        return { label: language === "ml" ? "പരിശോധിച്ചു സ്ഥിരീകരിച്ചു" : "Verified", bg: "bg-purple-100 text-purple-800 border-purple-300", icon: ShieldCheck };
      case "under_review":
        return { label: language === "ml" ? "അവലോകനത്തിൽ" : "Under Review", bg: "bg-sky-100 text-sky-800 border-sky-300", icon: Clock };
      case "rejected":
        return { label: language === "ml" ? "തള്ളി" : "Rejected", bg: "bg-rose-100 text-rose-800 border-rose-300", icon: AlertTriangle };
      default:
        return { label: language === "ml" ? "സമർപ്പിച്ചു" : "Submitted", bg: "bg-neutral-100 text-neutral-800 border-neutral-300", icon: Clock };
    }
  };

  const getCategoryDetails = (catId: string) => {
    return CIVIC_CATEGORIES.find(c => c.id === catId);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] pb-20">
      <Navbar />
      <CivicNav />

      {/* Hero / Header Filter Hub */}
      <section className="bg-gradient-to-b from-[#FAF4E6] to-[#FAF7F0] border-b border-[#E8DCBF] pt-8 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#E0F1E7] text-[#194B35] border border-[#BDE3CE]">
                  താനൂർ നഗരസഭ & മലപ്പുറം ജില്ലാ ഡയറക്ടറി
                </span>
                <span className="text-xs text-neutral-500 font-medium">
                  {filteredIssues.length} പ്രശ്നങ്ങൾ ലഭ്യമാണ്
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#194B35] font-serif tracking-tight">
                {language === "ml" ? "പൗര പ്രശ്നങ്ങളുടെ ഡയറക്ടറി" : "Explore Civic Issues"}
              </h1>
              <p className="text-xs sm:text-sm text-[#5C6A64] mt-1 max-w-2xl">
                {language === "ml"
                  ? "താനൂർ നഗരസഭയിലെയും സമീപ മലപ്പുറം പ്രദേശങ്ങളിലെയും റോഡ്, ഡ്രെയിനേജ്, ശുചിത്വം തുടങ്ങിയ പൊതു പ്രശ്നങ്ങൾ നിരീക്ഷിക്കുക, പിന്തുണ നൽകുക."
                  : "Track, support, and inspect transparent civic issues across Tanur Municipality (45 wards) and Malappuram."}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/civic/map"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#DDD5C5] text-[#194B35] text-xs font-bold shadow-xs hover:bg-[#FAF4E6] transition"
              >
                <MapIcon className="w-4 h-4 text-[#8C5B0F]" />
                <span>{language === "ml" ? "മാപ്പിൽ കാണുക" : "View Live Map"}</span>
              </Link>
              <Link
                href="/civic/report"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#194B35] text-white text-xs font-bold shadow-sm hover:bg-[#143E2C] transition active:scale-95"
              >
                <PlusCircle className="w-4 h-4 text-amber-300" />
                <span>{language === "ml" ? "പുതിയ പരാതി നൽകുക" : "Report Issue"}</span>
              </Link>
            </div>
          </div>

          {/* Search Bar & Quick Controls */}
          <div className="bg-white p-3 sm:p-4 rounded-2xl border border-[#E8DCBF] shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={language === "ml" ? "പ്രശ്നം, വാർഡ്, ട്രാക്കിംഗ് ഐഡി (ഉദാ: CC-TNR-2026-0081) തിരയുക..." : "Search by issue, ward, landmark or tracking ID..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#FAF7F0] border border-[#DDD5C5] text-xs sm:text-sm focus:outline-hidden focus:border-[#194B35] focus:bg-white transition"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-700"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Locality Selector */}
              <div className="w-full sm:w-64">
                <select
                  value={selectedLocality}
                  onChange={(e) => setSelectedLocality(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF7F0] border border-[#DDD5C5] text-xs font-medium text-[#1A2420] focus:outline-hidden focus:border-[#194B35]"
                >
                  <option value="all">{language === "ml" ? "എല്ലാ പ്രദേശങ്ങളും (All Localities)" : "All Localities"}</option>
                  <option value="municipality">{language === "ml" ? "താനൂർ നഗരസഭ (Tanur Municipality)" : "Tanur Municipality"}</option>
                  <option value="block">{language === "ml" ? "താനൂർ ബ്ലോക്ക് പഞ്ചായത്ത് (Tanur Block)" : "Tanur Block Panchayat"}</option>
                  <option value="other">{language === "ml" ? "മറ്റു മലപ്പുറം പ്രദേശങ്ങൾ (Other Malappuram)" : "Other Malappuram"}</option>
                </select>
              </div>

              {/* Sort By */}
              <div className="w-full sm:w-48">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF7F0] border border-[#DDD5C5] text-xs font-medium text-[#1A2420] focus:outline-hidden focus:border-[#194B35]"
                >
                  <option value="recent">{language === "ml" ? "ഏറ്റവും പുതിയവ (Recent)" : "Most Recent"}</option>
                  <option value="supported">{language === "ml" ? "കൂടുതൽ പിന്തുണ (Supported)" : "Most Supported"}</option>
                  <option value="priority">{language === "ml" ? "മുൻഗണനാ ക്രമം (Priority)" : "Highest Priority"}</option>
                </select>
              </div>
            </div>

            {/* Status Filter Chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-neutral-100 text-xs">
              <span className="text-[11px] font-bold text-[#5C6A64] mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3" />
                നില:
              </span>
              {[
                { id: "all", label: "എല്ലാം", en: "All" },
                { id: "pending", label: "അവലോകനത്തിൽ", en: "Under Review" },
                { id: "verified", label: "സ്ഥിരീകരിച്ചവ", en: "Verified" },
                { id: "forwarded", label: "കൈമാറിയവ", en: "Forwarded" },
                { id: "in_progress", label: "നടപടിയിൽ", en: "In Progress" },
                { id: "resolved", label: "പരിഹരിച്ചവ", en: "Resolved" },
              ].map((st) => (
                <button
                  key={st.id}
                  onClick={() => setSelectedStatus(st.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition active:scale-95 ${
                    selectedStatus === st.id
                      ? "bg-[#194B35] text-white shadow-xs"
                      : "bg-[#FAF7F0] text-[#5C6A64] hover:bg-[#FAF4E6] border border-[#DDD5C5]"
                  }`}
                >
                  {language === "ml" ? st.label : st.en}
                </button>
              ))}

              {/* View mode toggle */}
              <div className="ml-auto flex items-center gap-1 border-l border-neutral-200 pl-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-md ${viewMode === "grid" ? "bg-[#E0F1E7] text-[#194B35]" : "text-neutral-400 hover:text-neutral-700"}`}
                  title="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-md ${viewMode === "list" ? "bg-[#E0F1E7] text-[#194B35]" : "text-neutral-400 hover:text-neutral-700"}`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Category Filter Horizontal Scroll */}
          <div className="flex items-center gap-2 overflow-x-auto pt-4 pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition shrink-0 ${
                selectedCategory === "all"
                  ? "bg-[#8C5B0F] text-white shadow-xs"
                  : "bg-white text-[#5C6A64] border border-[#DDD5C5] hover:bg-[#FAF4E6]"
              }`}
            >
              {language === "ml" ? "എല്ലാ കാറ്റഗറികളും" : "All Categories"} ({issues.length})
            </button>
            {CIVIC_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const count = issues.filter(i => i.category_id === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition shrink-0 flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-[#194B35] text-white shadow-xs"
                      : "bg-white text-[#5C6A64] border border-[#DDD5C5] hover:bg-[#FAF4E6]"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span>{language === "ml" ? cat.name_ml : cat.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? "bg-white/20 text-white" : "bg-neutral-100 text-neutral-600"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Issues Listing Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredIssues.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-3xl border border-[#E8DCBF] p-10 text-center max-w-lg mx-auto shadow-xs my-8">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto mb-4 text-[#8C5B0F]">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-[#194B35] mb-2 font-serif">
              {language === "ml" ? "പ്രശ്നങ്ങളൊന്നും കണ്ടെത്തിയില്ല" : "No Civic Issues Found"}
            </h3>
            <p className="text-xs sm:text-sm text-[#5C6A64] mb-6">
              {language === "ml"
                ? "നിങ്ങൾ നൽകിയ ഫിൽട്ടറുകൾ അല്ലെങ്കിൽ തിരച്ചിൽ പദങ്ങൾക്ക് അനുസൃതമായ പരാതികൾ നിലവിലില്ല. ഫിൽട്ടറുകൾ പുനഃക്രമീകരിക്കുക അല്ലെങ്കിൽ പുതിയൊരു പ്രശ്നം റിപ്പോർട്ട് ചെയ്യുക."
                : "No civic issues match your current filters or search terms. Try clearing filters or report a new civic issue in your ward."}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setSelectedStatus("all");
                  setSelectedLocality("all");
                }}
                className="w-full sm:w-auto px-4 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-xs font-bold text-[#194B35] hover:bg-neutral-100 transition"
              >
                {language === "ml" ? "ഫിൽട്ടറുകൾ റദ്ദാക്കുക" : "Reset Filters"}
              </button>
              <Link
                href="/civic/report"
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#194B35] text-white text-xs font-bold hover:bg-[#143E2C] transition inline-flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4 text-amber-300" />
                <span>{language === "ml" ? "പരാതി രജിസ്റ്റർ ചെയ്യുക" : "Report New Issue"}</span>
              </Link>
            </div>
          </div>
        ) : (
          /* Results Count & Grid/List */
          <div>
            <div className="flex items-center justify-between text-xs text-[#5C6A64] mb-4 font-medium">
              <span>
                {filteredIssues.length} {language === "ml" ? "പൗര പ്രശ്നങ്ങൾ പ്രദർശിപ്പിക്കുന്നു" : "issues displayed"}
              </span>
              <span className="text-[11px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                ഔദ്യോഗിക വാർഡ് നിരീക്ഷണം: താനൂർ നഗരസഭ
              </span>
            </div>

            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredIssues.map((issue) => {
                  const statusInfo = getStatusBadge(issue.status);
                  const StatusIcon = statusInfo.icon;
                  const cat = getCategoryDetails(issue.category_id);
                  const isSupported = issue.supported_by_user;

                  return (
                    <div
                      key={issue.id}
                      className="bg-white rounded-2xl border border-[#E8DCBF] hover:border-[#194B35]/40 shadow-xs hover:shadow-md transition-all flex flex-col overflow-hidden group"
                    >
                      {/* Top Badges Bar */}
                      <div className="p-4 pb-3 flex items-center justify-between gap-2 border-b border-neutral-100 text-xs">
                        <span className="font-mono text-[11px] font-bold text-neutral-500 bg-[#FAF7F0] px-2 py-0.5 rounded border border-[#E8DCBF]">
                          {issue.tracking_id}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold border ${statusInfo.bg}`}>
                            <StatusIcon className="w-3 h-3" />
                            {statusInfo.label}
                          </span>
                        </div>
                      </div>

                      {/* Main Card Content */}
                      <div className="p-4 flex-1 flex flex-col">
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded-md"
                            style={{ backgroundColor: `${cat?.color || '#194B35'}15`, color: cat?.color || '#194B35' }}
                          >
                            {language === "ml" ? cat?.name_ml || issue.subcategory : cat?.name || issue.subcategory}
                          </span>
                          <span className="text-[11px] text-neutral-400">
                            {new Date(issue.created_at).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                          </span>
                        </div>

                        <Link href={`/civic/issues/${issue.id}`} className="group-hover:text-[#194B35] transition">
                          <h3 className="font-bold text-sm sm:text-base text-[#1A2420] line-clamp-2 mb-1">
                            {language === "ml" ? issue.title_ml : issue.title}
                          </h3>
                        </Link>

                        <p className="text-xs text-[#5C6A64] line-clamp-2 mb-3 leading-relaxed">
                          {issue.description}
                        </p>

                        {/* Location Landmark */}
                        <div className="flex items-start gap-1.5 text-xs text-neutral-500 mt-auto pt-2 border-t border-neutral-50">
                          <MapPin className="w-3.5 h-3.5 text-[#8C5B0F] shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{issue.address_landmark}, {issue.locality}</span>
                        </div>

                        {/* Authority forwarding note if present */}
                        {issue.authority_forwarding && (
                          <div className="mt-2.5 bg-amber-50/70 border border-amber-200/80 rounded-lg p-2 text-[11px] text-amber-900 flex items-center justify-between">
                            <span className="font-medium line-clamp-1">
                              🏛️ {issue.authority_forwarding.authority_name}
                            </span>
                            <span className="font-mono text-[9px] bg-amber-100 px-1.5 py-0.5 rounded text-amber-800 shrink-0">
                              {issue.authority_forwarding.reference_no}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Card Footer Actions */}
                      <div className="bg-[#FAF7F0] px-4 py-2.5 border-t border-[#E8DCBF] flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          {/* Community Support Button */}
                          <button
                            onClick={(e) => handleSupportToggle(e, issue.id)}
                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition active:scale-90 ${
                              isSupported
                                ? "bg-[#194B35] text-white shadow-xs"
                                : "bg-white text-[#5C6A64] border border-[#DDD5C5] hover:text-[#194B35] hover:border-[#194B35]"
                            }`}
                            title="ഈ പ്രശ്നത്തിന് പിന്തുണ നൽകുക"
                          >
                            <ThumbsUp className={`w-3.5 h-3.5 ${isSupported ? "fill-current" : ""}`} />
                            <span>{issue.support_count}</span>
                          </button>

                          {/* Comments count */}
                          <div className="flex items-center gap-1 text-neutral-500 text-xs">
                            <MessageSquare className="w-3.5 h-3.5 text-neutral-400" />
                            <span>{issue.comments.length}</span>
                          </div>
                        </div>

                        {/* View Issue Details Link */}
                        <Link
                          href={`/civic/issues/${issue.id}`}
                          className="font-bold text-xs text-[#194B35] hover:text-[#8C5B0F] inline-flex items-center gap-1 transition"
                        >
                          <span>{language === "ml" ? "വിശദാംശങ്ങൾ" : "Details"}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* List View Mode */
              <div className="space-y-3">
                {filteredIssues.map((issue) => {
                  const statusInfo = getStatusBadge(issue.status);
                  const StatusIcon = statusInfo.icon;
                  const cat = getCategoryDetails(issue.category_id);
                  const isSupported = issue.supported_by_user;

                  return (
                    <div
                      key={issue.id}
                      className="bg-white rounded-xl border border-[#E8DCBF] p-4 hover:border-[#194B35]/40 transition shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5 text-xs">
                          <span className="font-mono text-[10px] font-bold text-neutral-500 bg-[#FAF7F0] px-2 py-0.5 rounded border border-[#E8DCBF]">
                            {issue.tracking_id}
                          </span>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusInfo.bg}`}>
                            <StatusIcon className="w-2.5 h-2.5" />
                            {statusInfo.label}
                          </span>
                          <span className="text-[10px] font-semibold text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded">
                            {language === "ml" ? cat?.name_ml : cat?.name}
                          </span>
                        </div>
                        <Link href={`/civic/issues/${issue.id}`}>
                          <h3 className="font-bold text-sm sm:text-base text-[#1A2420] hover:text-[#194B35] transition">
                            {language === "ml" ? issue.title_ml : issue.title}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-2 text-xs text-neutral-500 mt-1">
                          <MapPin className="w-3 h-3 text-[#8C5B0F]" />
                          <span className="truncate">{issue.address_landmark}, {issue.locality}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
                        <button
                          onClick={(e) => handleSupportToggle(e, issue.id)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition active:scale-95 ${
                            isSupported
                              ? "bg-[#194B35] text-white"
                              : "bg-[#FAF7F0] text-[#5C6A64] border border-[#DDD5C5] hover:text-[#194B35]"
                          }`}
                        >
                          <ThumbsUp className={`w-3.5 h-3.5 ${isSupported ? "fill-current" : ""}`} />
                          <span>{issue.support_count}</span>
                        </button>

                        <Link
                          href={`/civic/issues/${issue.id}`}
                          className="px-3.5 py-1.5 rounded-lg bg-[#194B35] text-white text-xs font-bold hover:bg-[#143E2C] transition inline-flex items-center gap-1"
                        >
                          <span>{language === "ml" ? "കാണുക" : "View"}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}

export default function CivicIssuesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAF7F0] flex items-center justify-center p-8 text-[#194B35]">
        <div className="text-center">
          <div className="w-10 h-10 border-3 border-[#194B35] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-bold font-malayalam">പൗര പ്രശ്നങ്ങൾ ലോഡ് ചെയ്യുന്നു...</p>
        </div>
      </div>
    }>
      <CivicIssuesContent />
    </Suspense>
  );
}
