"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { useLanguage } from "@/lib/i18n/context";
import { useAuth } from "@/lib/auth/context";
import { 
  civicStore, 
  CIVIC_CATEGORIES, 
  CivicIssue 
} from "@/lib/data/civicConnectData";
import { 
  ShieldAlert, 
  PlusCircle, 
  Search, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle, 
  PhoneCall, 
  ChevronRight, 
  Send, 
  Heart, 
  MessageSquare,
  FileText,
  Clock,
  ArrowRight,
  Filter,
  Check,
  Building2,
  ExternalLink,
  User
} from "lucide-react";

type CivicNavTab = "feed" | "report" | "track" | "emergency";

export default function CivicConnectPage() {
  const { language } = useLanguage();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState<CivicNavTab>("feed");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [showMyIssuesOnly, setShowMyIssuesOnly] = useState(false);
  const [supportState, setSupportState] = useState<Record<string, number>>({});

  // Tracking query state
  const [trackQuery, setTrackQuery] = useState("");
  const [trackedIssue, setTrackedIssue] = useState<CivicIssue | null>(null);
  const [trackError, setTrackError] = useState(false);

  // New Issue Form State
  const [formCategory, setFormCategory] = useState("roads_transport");
  const [formTitle, setFormTitle] = useState("");
  const [formTitleMl, setFormTitleMl] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formLocality, setFormLocality] = useState("Town Centre");
  const [formLandmark, setFormLandmark] = useState("");
  const [formPriority, setFormPriority] = useState<"low" | "medium" | "high" | "urgent">("medium");
  const [formImages] = useState<string[]>([
    "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80"
  ]);
  const [submittedTrackingId, setSubmittedTrackingId] = useState<string | null>(null);

  const issues = useMemo(() => civicStore.getIssues(), []);
  const analytics = useMemo(() => civicStore.getCivicAnalytics(), []);

  const handleSupportToggle = (issueId: string) => {
    civicStore.toggleSupport(issueId);
    setSupportState(prev => ({
      ...prev,
      [issueId]: (prev[issueId] || 0) + 1
    }));
  };

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackQuery.trim()) return;

    const found = issues.find(i => 
      i.tracking_id.toLowerCase() === trackQuery.trim().toLowerCase() ||
      i.id.toLowerCase() === trackQuery.trim().toLowerCase()
    );

    if (found) {
      setTrackedIssue(found);
      setTrackError(false);
    } else {
      setTrackedIssue(null);
      setTrackError(true);
    }
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formDescription.trim()) return;

    const newIssue = civicStore.createIssue({
      title: formTitle,
      title_ml: formTitleMl || formTitle,
      description: formDescription,
      category_id: formCategory,
      subcategory: "Citizen Submission",
      district: "Malappuram",
      locality: formLocality,
      address_landmark: formLandmark || formLocality,
      jurisdiction_type: "municipality",
      latitude: 10.9768,
      longitude: 75.8672,
      status: "submitted",
      priority: formPriority,
      images: formImages,
      reporter_name: user?.display_name || user?.username || "Resident",
      reporter_id: user?.id || "u0000000-0000-0000-0000-000000000003",
      is_anonymous: false
    });

    setSubmittedTrackingId(newIssue.tracking_id);
    setFormTitle("");
    setFormTitleMl("");
    setFormDescription("");
    setFormLandmark("");
  };

  // Filtered issues
  const filteredIssues = useMemo(() => {
    return issues.filter(issue => {
      if (showMyIssuesOnly) {
        const isMine = issue.reporter_id === user?.id || 
                       issue.reporter_name === user?.display_name || 
                       issue.reporter_name === user?.username ||
                       (user?.username === "fathima_tanur" && issue.reporter_id === "u0000000-0000-0000-0000-000000000003");
        if (!isMine) return false;
      }
      if (selectedCategory !== "all" && issue.category_id !== selectedCategory) return false;
      if (selectedStatus !== "all" && issue.status !== selectedStatus) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = issue.title.toLowerCase().includes(q) || issue.title_ml.toLowerCase().includes(q);
        const matchesLoc = issue.locality.toLowerCase().includes(q) || (issue.address_landmark && issue.address_landmark.toLowerCase().includes(q));
        const matchesTrack = issue.tracking_id.toLowerCase().includes(q);
        return matchesTitle || matchesLoc || matchesTrack;
      }
      return true;
    });
  }, [issues, selectedCategory, selectedStatus, searchQuery, showMyIssuesOnly, user]);

  const statusBadges: Record<string, { label: string; labelEn: string; color: string; step: number }> = {
    submitted: { label: "സമർപ്പിച്ചു", labelEn: "Submitted", color: "bg-amber-100 text-amber-800 border-amber-200", step: 1 },
    under_review: { label: "അവലോകനത്തിൽ", labelEn: "Under Review", color: "bg-blue-100 text-blue-800 border-blue-200", step: 2 },
    verified: { label: "വെരിഫൈഡ്", labelEn: "Verified", color: "bg-teal-100 text-teal-800 border-teal-200", step: 3 },
    forwarded: { label: "അധികൃതർക്ക് കൈമാറി", labelEn: "Forwarded to Authority", color: "bg-purple-100 text-purple-800 border-purple-200", step: 4 },
    in_progress: { label: "നടപടിയിൽ", labelEn: "In Progress", color: "bg-indigo-100 text-indigo-800 border-indigo-200", step: 5 },
    resolved: { label: "പരിഹരിച്ചു", labelEn: "Resolved", color: "bg-emerald-100 text-emerald-800 border-emerald-200", step: 6 },
    rejected: { label: "തള്ളി", labelEn: "Rejected", color: "bg-rose-100 text-rose-800 border-rose-200", step: 0 },
    reopened: { label: "തുറന്നു", labelEn: "Reopened", color: "bg-orange-100 text-orange-800 border-orange-200", step: 5 },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420] font-sans selection:bg-[#194B35]/20 selection:text-[#194B35]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 w-full">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: language === "ml" ? "ഹോം" : "Home", href: "/" },
            { label: language === "ml" ? "സിവിക് കണക്ട്" : "Civic Connect" },
          ]}
        />

        {/* ========================================================================= */}
        {/* 1. HERO SECTION (Kerala Municipal Waterfront Aesthetic)                   */}
        {/* ========================================================================= */}
        <div className="relative rounded-3xl sm:rounded-[36px] bg-gradient-to-br from-[#FAF7F0] via-[#F5F1E7] to-[#EDE6D8] border border-[#EDE6D8] p-6 sm:p-10 shadow-xs overflow-hidden">
          {/* Subtle Organic Background Texture */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#194B35_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#194B35]/10 text-[#194B35] text-xs font-bold border border-[#194B35]/20">
                <ShieldAlert className="w-4 h-4 text-[#194B35]" />
                <span>Tanur Municipality — Grievance Redressal</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#194B35] tracking-tight font-sans leading-tight">
                Civic Connect
              </h1>

              <p className="text-base sm:text-lg font-bold text-[#C39A5B] font-sans">
                Your Voice, Our Priority
              </p>

              <p className="text-xs sm:text-sm text-[#5C6A64] leading-relaxed max-w-xl">
                Transparent civic grievance reporting and progress tracking for roads, streetlights, sanitation, and municipal utilities across all 45 statutory wards of Tanur Municipality.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setActiveTab("report")}
                  className="px-5 py-3 rounded-2xl bg-[#194B35] hover:bg-[#123626] text-white text-xs sm:text-sm font-bold shadow-sm hover:shadow transition flex items-center gap-2 min-h-[44px]"
                >
                  <PlusCircle className="w-4 h-4 text-[#F3CE7A]" />
                  <span>Submit Feedback</span>
                </button>

                <button
                  onClick={() => setActiveTab("track")}
                  className="px-5 py-3 rounded-2xl bg-white hover:bg-[#FAF7F0] text-[#194B35] border border-[#EDE6D8] text-xs sm:text-sm font-bold shadow-2xs transition flex items-center gap-2 min-h-[44px]"
                >
                  <Search className="w-4 h-4 text-[#C39A5B]" />
                  <span>Track by ID</span>
                </button>
              </div>
            </div>

            {/* Quick Metrics Strip */}
            <div className="md:col-span-5 flex justify-center md:justify-end w-full">
              <div className="grid grid-cols-2 gap-3 w-full max-w-md">
                <div className="p-3.5 bg-white rounded-2xl border border-[#EDE6D8] shadow-2xs space-y-1 text-left">
                  <span className="text-[10px] uppercase font-bold text-[#C39A5B] block">Total Issues</span>
                  <span className="text-xl sm:text-2xl font-black text-[#194B35]">{analytics.total}</span>
                  <span className="text-[11px] text-[#5C6A64] block">Logged into Queue</span>
                </div>
                <div className="p-3.5 bg-white rounded-2xl border border-[#EDE6D8] shadow-2xs space-y-1 text-left">
                  <span className="text-[10px] uppercase font-bold text-emerald-700 block">Resolved</span>
                  <span className="text-xl sm:text-2xl font-black text-emerald-800">{analytics.resolved}</span>
                  <span className="text-[11px] text-[#5C6A64] block">{analytics.resolutionRate}% Success Rate</span>
                </div>
                <div className="p-3.5 bg-white rounded-2xl border border-[#EDE6D8] shadow-2xs space-y-1 text-left">
                  <span className="text-[10px] uppercase font-bold text-blue-700 block">Forwarded</span>
                  <span className="text-xl sm:text-2xl font-black text-blue-900">{analytics.forwarded}</span>
                  <span className="text-[11px] text-[#5C6A64] block">To LSGD / KSEB</span>
                </div>
                <div className="p-3.5 bg-white rounded-2xl border border-[#EDE6D8] shadow-2xs space-y-1 text-left">
                  <span className="text-[10px] uppercase font-bold text-purple-700 block">Response Window</span>
                  <span className="text-xl sm:text-2xl font-black text-purple-900">48 Hrs</span>
                  <span className="text-[11px] text-[#5C6A64] block">Verified Triage</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. STATUTORY NON-EMERGENCY SAFETY DISCLAIMER                              */}
        {/* ========================================================================= */}
        <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-amber-50/90 border border-amber-200 text-amber-950 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-start sm:items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5 sm:mt-0" />
            <span className="leading-relaxed">
              <strong className="font-bold">{language === "ml" ? "ശ്രദ്ധിക്കുക (Emergency Notice):" : "Important Notice:"}</strong>{" "}
              {language === "ml"
                ? "സിവിക് കണക്ട് ഒരു അടിയന്തര രക്ഷാപ്രവർത്തന സംവിധാനമല്ല. ജീവന് ഭീഷണിയായ അപകടങ്ങൾക്കും അടിയന്തര ആവശ്യങ്ങൾക്കും 112 (പോലീസ്), 101 (ഫയർ ഫോഴ്സ്), 108 (ആംബുലൻസ്) എന്നിവയുമായി നേരിട്ട് ബന്ധപ്പെടുക."
                : "Civic Connect is an independent public tracking tool and not an emergency service. For life-threatening emergencies, call 112 (Police), 101 (Fire), or 108 (Ambulance) immediately."}
            </span>
          </div>
          <a
            href="tel:112"
            className="px-3.5 py-1.5 bg-amber-700 hover:bg-amber-800 text-white rounded-xl font-bold text-xs shrink-0 transition text-center shadow-2xs flex items-center justify-center gap-1.5"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Emergency 112</span>
          </a>
        </div>

        {/* ========================================================================= */}
        {/* 3. PURPOSE-DRIVEN LAYOUT (Sidebar + Dynamic Workspace)                    */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Navigation Sidebar (Desktop/Tablet) & Tab Pills (Mobile) */}
          <aside className="lg:col-span-4 xl:col-span-3 space-y-4">
            <div className="bg-white rounded-3xl border border-[#EDE6D8] p-3 sm:p-4 shadow-xs space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C39A5B] px-3 pt-1 block">
                {language === "ml" ? "സിവിക് വിഭാഗങ്ങൾ" : "Navigation"}
              </span>

              {/* Sidebar Tab Buttons */}
              <div className="flex lg:flex-col gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
                {[
                  { key: "feed" as const, label: "Browse Issues", label_ml: "പൊതു പരാതികൾ", icon: MessageSquare, badge: filteredIssues.length },
                  { key: "report" as const, label: "Submit Feedback", label_ml: "പരാതി നൽകുക", icon: PlusCircle },
                  { key: "track" as const, label: "Track Grievance", label_ml: "സ്റ്റാറ്റസ് പരിശോധന", icon: Search },
                  { key: "emergency" as const, label: "Emergency & Helplines", label_ml: "അടിയന്തര സമ്പർക്കം", icon: PhoneCall },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.key;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap lg:whitespace-normal w-full text-left ${
                        isActive
                          ? "bg-[#194B35] text-white shadow-xs"
                          : "text-[#5C6A64] hover:text-[#194B35] hover:bg-[#FAF7F0]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? "text-amber-300" : "text-[#C39A5B]"}`} />
                        <span>{language === "ml" ? tab.label_ml : tab.label}</span>
                      </div>
                      {tab.badge !== undefined && (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isActive ? "bg-white/20 text-white" : "bg-[#FAF7F0] text-[#194B35]"
                        }`}>
                          {tab.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Municipal Switchboard Support Card */}
            <div className="hidden lg:block bg-white rounded-3xl border border-[#EDE6D8] p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#194B35] flex items-center justify-center font-bold">
                  🏛️
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#194B35]">
                    {language === "ml" ? "നഗരസഭാ ഹെൽപ്പ്‌ഡെസ്ക്" : "Municipal Helpdesk"}
                  </h4>
                  <span className="text-[10px] text-[#5C6A64]">
                    Mon - Sat (10:00 AM - 5:00 PM)
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-[#5C6A64] leading-relaxed">
                {language === "ml"
                  ? "പരാതികൾ ഫോൺ മുഖേന അറിയിക്കാൻ നഗരസഭാ കേന്ദ്ര എക്സ്ചേഞ്ചുമായി ബന്ധപ്പെടുക."
                  : "For verbal intimations or procedural guidance, call the municipal central switchboard."}
              </p>
              <a
                href="tel:04942440228"
                className="w-full py-2 bg-[#FAF7F0] hover:bg-[#EDE6D8] text-[#194B35] border border-[#EDE6D8] rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#C39A5B]" />
                <span>0494 2440228</span>
              </a>
            </div>
          </aside>

          {/* Right Main Content Area */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-6">
            {/* =================================================================== */}
            {/* TAB 1: BROWSE PUBLIC ISSUES FEED                                   */}
            {/* =================================================================== */}
            {activeTab === "feed" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                {/* Search & Filters Bar */}
                <div className="bg-white rounded-3xl border border-[#EDE6D8] p-4 shadow-xs flex flex-col sm:flex-row items-center gap-3">
                  {/* Search */}
                  <div className="relative flex-1 w-full">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      aria-label="Search civic issues"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={language === "ml" ? "ട്രാക്കിംഗ് ഐഡി, സ്ഥലം, വിഷയം തിരയുക..." : "Search tracking ID, locality, or issue..."}
                      className="w-full pl-10 pr-4 py-2.5 bg-[#FAF7F0] text-xs border border-[#EDE6D8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#194B35] text-[#1A2420]"
                    />
                  </div>

                  {/* Category Filter */}
                  <select
                    aria-label="Filter by category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full sm:w-auto px-3.5 py-2.5 bg-[#FAF7F0] border border-[#EDE6D8] rounded-2xl text-xs text-[#1A2420] focus:outline-none focus:ring-2 focus:ring-[#194B35]"
                  >
                    <option value="all">{language === "ml" ? "എല്ലാ വിഭാഗങ്ങളും" : "All Categories"}</option>
                    {CIVIC_CATEGORIES.map(c => (
                      <option key={c.id} value={c.id}>
                        {language === "ml" ? c.name_ml : c.name}
                      </option>
                    ))}
                  </select>

                  {/* Status Filter */}
                  <select
                    aria-label="Filter by status"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full sm:w-auto px-3.5 py-2.5 bg-[#FAF7F0] border border-[#EDE6D8] rounded-2xl text-xs text-[#1A2420] focus:outline-hidden focus:ring-2 focus:ring-[#194B35]"
                  >
                    <option value="all">{language === "ml" ? "എല്ലാ സ്റ്റാറ്റസും" : "All Statuses"}</option>
                    <option value="submitted">Submitted</option>
                    <option value="under_review">Under Review</option>
                    <option value="verified">Verified</option>
                    <option value="forwarded">Forwarded to Authority</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>

                  {/* My Reports Toggle */}
                  <button
                    type="button"
                    onClick={() => setShowMyIssuesOnly(!showMyIssuesOnly)}
                    className={`w-full sm:w-auto px-3.5 py-2.5 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-1.5 active:scale-98 ${
                      showMyIssuesOnly
                        ? "bg-[#194B35] text-white shadow-xs"
                        : "bg-[#FAF7F0] text-[#5C6A64] hover:bg-[#EDE6D8] border border-[#EDE6D8]"
                    }`}
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>{showMyIssuesOnly ? "Showing My Reports" : "My Reports Only"}</span>
                  </button>
                </div>

                {/* Issues Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {filteredIssues.map((issue) => {
                    const badge = statusBadges[issue.status] || statusBadges.submitted;
                    const isSupported = (supportState[issue.id] || 0) % 2 === 1;

                    return (
                      <div
                        key={issue.id}
                        className="bg-white rounded-3xl border border-[#EDE6D8] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
                      >
                        <div className="space-y-3">
                          {/* Top Meta Bar */}
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <span className="font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-[#FAF7F0] text-[#194B35] border border-[#EDE6D8]">
                              {issue.tracking_id}
                            </span>

                            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${badge.color}`}>
                              {language === "ml" ? badge.label : badge.labelEn}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="font-bold text-base text-[#194B35] font-malayalam-heading group-hover:text-[#123626] transition">
                            {language === "ml" ? issue.title_ml : issue.title}
                          </h3>

                          <p className="text-xs text-[#5C6A64] line-clamp-3 leading-relaxed">
                            {issue.description}
                          </p>

                          {/* Locality & Landmark */}
                          <div className="flex items-center gap-1.5 text-xs text-[#5C6A64] pt-1">
                            <MapPin className="w-3.5 h-3.5 text-[#C39A5B] shrink-0" />
                            <span className="truncate">{issue.locality} — {issue.address_landmark}</span>
                          </div>

                          {/* Forwarding / Resolution Status */}
                          {issue.status === "forwarded" && (
                            <div className="p-2.5 rounded-2xl bg-purple-50 border border-purple-200 text-purple-900 text-xs">
                              <span className="font-bold">Forwarded:</span> LSGD Engineering Section / KSEB Tanur
                            </div>
                          )}

                          {issue.status === "resolved" && (
                            <div className="p-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              <span>{language === "ml" ? "പരിഹരിച്ചു — അറ്റകുറ്റപ്പണി പൂർത്തിയായി." : "Resolved with verified on-site inspection."}</span>
                            </div>
                          )}
                        </div>

                        {/* Bottom Actions */}
                        <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                          <button
                            onClick={() => handleSupportToggle(issue.id)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition text-xs ${
                              isSupported 
                                ? "bg-rose-50 text-rose-700 border border-rose-200" 
                                : "bg-[#FAF7F0] text-[#5C6A64] hover:bg-neutral-100 border border-[#EDE6D8]"
                            }`}
                          >
                            <Heart className={`w-3.5 h-3.5 ${isSupported ? "fill-rose-600 text-rose-600" : ""}`} />
                            <span>{issue.support_count + (isSupported ? 1 : 0)} Support</span>
                          </button>

                          <Link
                            href={`/civic/issues/${issue.id}`}
                            className="w-8 h-8 rounded-full bg-[#194B35] text-white flex items-center justify-center hover:bg-[#123626] transition shadow-xs hover:scale-105 active:scale-95"
                            title={language === "ml" ? "വിശദാംശങ്ങൾ കാണുക" : "View issue timeline"}
                          >
                            <ChevronRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {filteredIssues.length === 0 && (
                  <div className="p-8 text-center bg-white rounded-3xl border border-[#EDE6D8] text-[#5C6A64] space-y-2">
                    <ShieldAlert className="w-8 h-8 text-[#C39A5B] mx-auto" />
                    <p className="font-bold text-sm">
                      {language === "ml" ? "പരാതികൾ ഒന്നും കണ്ടെത്താനായില്ല" : "No civic issues match your filter"}
                    </p>
                    <p className="text-xs text-[#7A8880]">
                      {language === "ml" ? "തിരയൽ പദങ്ങൾ മാറ്റി വീണ്ടും ശ്രമിക്കുക." : "Try adjusting your search query or category filters."}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* =================================================================== */}
            {/* TAB 2: SUBMIT FEEDBACK / REPORT ISSUE (Reference Form Layout)      */}
            {/* =================================================================== */}
            {activeTab === "report" && (
              <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in duration-200">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#194B35] font-malayalam-heading">
                    {language === "ml" ? "പുതിയ സിവിക് പരാതി സമർപ്പിക്കുക" : "Submit Your Feedback"}
                  </h2>
                  <p className="text-xs text-[#5C6A64] mt-1">
                    {language === "ml"
                      ? "താനൂർ നഗരസഭയുടെ ശ്രദ്ധയിൽപ്പെടുത്താൻ താഴെ പറയുന്ന വിവരങ്ങൾ നൽകുക. പരിശോധനയ്ക്ക് ശേഷം ട്രാക്കിംഗ് ഐഡി ലഭിക്കും."
                      : "Help us serve you better. Enter precise location details and descriptions to route to municipal engineers."}
                  </p>
                </div>

                {submittedTrackingId ? (
                  <div className="p-8 rounded-3xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                    <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
                    <h3 className="text-xl font-bold text-emerald-950 font-malayalam-heading">
                      {language === "ml" ? "പരാതി വിജയകരമായി രജിസ്റ്റർ ചെയ്തു!" : "Grievance Registered Successfully!"}
                    </h3>
                    <p className="text-xs text-emerald-900 max-w-md mx-auto">
                      {language === "ml"
                        ? "നിങ്ങളുടെ പരാതി താനൂർ നഗരസഭാ സിവിക് അവലോകനത്തിലേക്ക് സ്വീകരിച്ചു. റെഫറൻസിനായി ഈ ട്രാക്കിംഗ് ഐഡി സൂക്ഷിക്കുക:"
                        : "Your complaint has been queued for field verification. Keep your unique tracking ID for status follow-ups:"}
                    </p>
                    <div className="text-2xl font-mono font-black text-[#194B35] bg-white py-3 px-6 rounded-2xl border border-emerald-300 inline-block shadow-2xs">
                      {submittedTrackingId}
                    </div>
                    <div className="pt-2 flex justify-center gap-3">
                      <button
                        onClick={() => {
                          setTrackQuery(submittedTrackingId);
                          setSubmittedTrackingId(null);
                          setActiveTab("track");
                        }}
                        className="px-4 py-2 bg-[#194B35] text-white text-xs font-bold rounded-xl shadow-xs hover:bg-[#123626] transition"
                      >
                        Track Status Now
                      </button>
                      <button
                        onClick={() => setSubmittedTrackingId(null)}
                        className="px-4 py-2 bg-white text-[#194B35] border border-[#EDE6D8] text-xs font-bold rounded-xl hover:bg-[#FAF7F0] transition"
                      >
                        Submit Another
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleReportSubmit} className="space-y-4 text-xs">
                    {/* Authenticated Citizen Association Badge */}
                    <div className="p-3 bg-[#FAF7F0] rounded-xl border border-[#EDE6D8] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#194B35]" />
                        <span className="text-xs">Submitting as: <strong className="text-[#194B35]">{user?.display_name || user?.username || "Citizen"}</strong></span>
                      </div>
                      <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-white border border-[#EDE6D8] text-[#194B35]">
                        {user?.role || "citizen"}
                      </span>
                    </div>

                    {/* Category Selection */}
                    <div>
                      <label className="font-bold text-gray-700 block mb-1">
                        {language === "ml" ? "വിഭാഗം (Category):" : "Category of Issue:"}
                      </label>
                      <select
                        value={formCategory}
                        onChange={(e) => setFormCategory(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#EDE6D8] rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#194B35]"
                      >
                        {CIVIC_CATEGORIES.map(c => (
                          <option key={c.id} value={c.id}>
                            {language === "ml" ? c.name_ml : c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Title in English */}
                    <div>
                      <label className="font-bold text-gray-700 block mb-1">
                        {language === "ml" ? "പരാതി വിഷയം (Title in English):" : "Title of Complaint / Feedback:"}
                      </label>
                      <input
                        type="text"
                        required
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        placeholder="e.g. Broken streetlight near Railway Station Ward 8"
                        className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#EDE6D8] rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#194B35]"
                      />
                    </div>

                    {/* Title in Malayalam */}
                    <div>
                      <label className="font-bold text-gray-700 block mb-1">
                        {language === "ml" ? "മലയാളത്തിൽ വിഷയം (Title in Malayalam):" : "Title in Malayalam (Optional):"}
                      </label>
                      <input
                        type="text"
                        value={formTitleMl}
                        onChange={(e) => setFormTitleMl(e.target.value)}
                        placeholder="ഉദാ: വാർഡ് 8 ലെ തകരാറിലായ തെരുവ് വിളക്ക്"
                        className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#EDE6D8] rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#194B35]"
                      />
                    </div>

                    {/* Locality & Landmark */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold text-gray-700 block mb-1">
                          {language === "ml" ? "പ്രദേശം (Locality):" : "Locality:"}
                        </label>
                        <input
                          type="text"
                          required
                          value={formLocality}
                          onChange={(e) => setFormLocality(e.target.value)}
                          placeholder="e.g. Meenadathur, Beach Road"
                          className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#EDE6D8] rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#194B35]"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-gray-700 block mb-1">
                          {language === "ml" ? "ലാൻഡ്‌മാർക്ക് (Landmark):" : "Landmark / Ward Number:"}
                        </label>
                        <input
                          type="text"
                          value={formLandmark}
                          onChange={(e) => setFormLandmark(e.target.value)}
                          placeholder="e.g. Near GLPS School, Pole #18"
                          className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#EDE6D8] rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#194B35]"
                        />
                      </div>
                    </div>

                    {/* Detailed Description */}
                    <div>
                      <label className="font-bold text-gray-700 block mb-1">
                        {language === "ml" ? "വിശദാംശങ്ങൾ (Detailed Description):" : "Detailed Description:"}
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formDescription}
                        onChange={(e) => setFormDescription(e.target.value)}
                        placeholder="Describe the issue, hazard risk, how long it has persisted..."
                        className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#EDE6D8] rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#194B35]"
                      />
                    </div>

                    {/* Severity Priority */}
                    <div>
                      <label className="font-bold text-gray-700 block mb-1">
                        {language === "ml" ? "മുൻഗണന (Priority):" : "Severity Priority:"}
                      </label>
                      <div className="grid grid-cols-4 gap-2 text-center">
                        {(["low", "medium", "high", "urgent"] as const).map(p => (
                          <button
                            key={p}
                            type="button"
                            onClick={() => setFormPriority(p)}
                            className={`py-2 rounded-xl font-bold uppercase text-[10px] border transition ${
                              formPriority === p 
                                ? "bg-[#194B35] text-white border-[#194B35] shadow-2xs" 
                                : "bg-[#FAF7F0] text-[#5C6A64] border-[#EDE6D8]"
                            }`}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-3">
                      <button
                        type="submit"
                        className="w-full py-3 bg-[#194B35] hover:bg-[#123626] text-white font-bold rounded-2xl text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2"
                      >
                        <Send className="w-4 h-4 text-amber-300" />
                        <span>{language === "ml" ? "പരാതി രജിസ്റ്റർ ചെയ്യുക (Generate Tracking ID)" : "Submit Feedback"}</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* =================================================================== */}
            {/* TAB 3: TRACK GRIEVANCE BY ID                                       */}
            {/* =================================================================== */}
            {activeTab === "track" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-8 shadow-xs space-y-4">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#194B35] font-malayalam-heading">
                    {language === "ml" ? "പരാതി സ്റ്റാറ്റസ് പരിശോധിക്കുക" : "Track Grievance Resolution"}
                  </h2>
                  <p className="text-xs text-[#5C6A64]">
                    {language === "ml"
                      ? "നിങ്ങളുടെ ട്രാക്കിംഗ് ഐഡി (ഉദാ: TNR-2026-0001) നൽകി നിലവിലെ സ്റ്റാറ്റസും എഞ്ചിനീയറിംഗ് റിപ്പോർട്ടുകളും പരിശോധിക്കുക."
                      : "Enter your official Tracking ID (e.g. TNR-2026-0001) to view real-time inspection notes and authority routing."}
                  </p>

                  <form onSubmit={handleTrackSubmit} className="flex flex-col sm:flex-row gap-2.5 pt-2">
                    <input
                      type="text"
                      required
                      aria-label="Enter Tracking ID"
                      value={trackQuery}
                      onChange={(e) => setTrackQuery(e.target.value)}
                      placeholder="e.g. TNR-2026-0001"
                      className="flex-1 px-4 py-2.5 bg-[#FAF7F0] border border-[#EDE6D8] rounded-2xl text-xs uppercase font-mono focus:outline-none focus:ring-2 focus:ring-[#194B35]"
                    />
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#194B35] text-white rounded-2xl text-xs font-bold hover:bg-[#123626] transition flex items-center justify-center gap-1.5 shadow-2xs"
                    >
                      <Search className="w-4 h-4" />
                      <span>Track</span>
                    </button>
                  </form>

                  {trackError && (
                    <p className="text-xs text-rose-600 font-bold pt-1">
                      {language === "ml"
                        ? "നൽകിയ ട്രാക്കിംഗ് ഐഡി കണ്ടെത്താനായില്ല. ദയവായി ശരിയായ ഐഡി നൽകുക."
                        : "No complaint found with this Tracking ID. Please verify the ID format (e.g. TNR-2026-0001)."}
                    </p>
                  )}
                </div>

                {trackedIssue && (
                  <div className="bg-white rounded-3xl border border-[#C39A5B] p-6 sm:p-8 shadow-sm space-y-5 animate-in fade-in">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="font-mono text-xs font-bold px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {trackedIssue.tracking_id}
                      </span>
                      <span className="text-xs font-bold uppercase text-gray-500">
                        Current Status: <strong className="text-[#194B35]">{trackedIssue.status}</strong>
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#194B35] font-malayalam-heading">
                      {language === "ml" ? trackedIssue.title_ml : trackedIssue.title}
                    </h3>

                    <p className="text-xs text-[#5C6A64] leading-relaxed">
                      {trackedIssue.description}
                    </p>

                    {/* Lifecycle Progress Bar */}
                    <div className="pt-4 border-t border-gray-100 space-y-3">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                        Lifecycle Milestone Timeline
                      </span>
                      <div className="grid grid-cols-6 gap-1 text-[9px] sm:text-[10px] text-gray-500 font-bold text-center">
                        <span className="truncate">1. Submitted</span>
                        <span className="truncate">2. Review</span>
                        <span className="truncate">3. Verified</span>
                        <span className="truncate">4. Forwarded</span>
                        <span className="truncate">5. Progress</span>
                        <span className="truncate">6. Resolved</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-gray-100 overflow-hidden">
                        <div 
                          className="h-full bg-[#194B35] transition-all rounded-full"
                          style={{ 
                            width: `${Math.min(100, Math.max(16, (statusBadges[trackedIssue.status]?.step || 1) * 16.6))}%` 
                          }}
                        />
                      </div>
                    </div>

                    <div className="pt-2 text-right">
                      <Link
                        href={`/civic/issues/${trackedIssue.id}`}
                        className="text-xs font-bold text-[#194B35] hover:underline inline-flex items-center gap-1"
                      >
                        <span>Full Case History & Inspection Notes</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* =================================================================== */}
            {/* TAB 4: EMERGENCY HELPLINES & CONTACTS DIRECTORY                    */}
            {/* =================================================================== */}
            {activeTab === "emergency" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 shadow-xs space-y-2">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#194B35] font-malayalam-heading">
                    {language === "ml" ? "അടിയന്തര ഹെൽപ്പ്‌ലൈനുകൾ & ഫോൺ നമ്പറുകൾ" : "Emergency Helplines & Municipal Directory"}
                  </h2>
                  <p className="text-xs text-[#5C6A64]">
                    {language === "ml"
                      ? "അടിയന്തര ഘട്ടങ്ങളിൽ നേരിട്ട് ബന്ധപ്പെടാവുന്ന പ്രധാന പൊതു സേവന നമ്പറുകൾ."
                      : "Verified contact lines for emergency response, utility failure reporting, and municipal operations in Tanur."}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: "National Emergency Helpline", num: "112", desc: "Police, Fire, and Ambulance unified response", badge: "24x7 Statutory", bg: "bg-rose-50 border-rose-200 text-rose-950" },
                    { title: "Fire & Rescue Station (Tanur/Tirur)", num: "101", desc: "Fire fighting and natural hazard mitigation", badge: "24x7 Emergency", bg: "bg-amber-50 border-amber-200 text-amber-950" },
                    { title: "Ambulance Response (Health)", num: "108", desc: "Government emergency medical transport", badge: "24x7 Medical", bg: "bg-emerald-50 border-emerald-200 text-emerald-950" },
                    { title: "Tanur Municipality Switchboard", num: "0494 2440228", desc: "Central administration chamber & general inquiries", badge: "Working Hours", bg: "bg-green-50 border-green-200 text-green-950" },
                    { title: "KSEB Electrical Section (Tanur)", num: "0494 2440250", desc: "Power grid failure, fallen wires, and feeder breakdowns", badge: "Utility", bg: "bg-blue-50 border-blue-200 text-blue-950" },
                    { title: "Kerala Water Authority (Tirur/Tanur)", num: "0494 2422240", desc: "Public tap leakage and drinking water supply issues", badge: "Utility", bg: "bg-cyan-50 border-cyan-200 text-cyan-950" },
                  ].map((contact, idx) => (
                    <div key={idx} className={`p-5 rounded-3xl border ${contact.bg} flex flex-col justify-between space-y-3 shadow-2xs`}>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider opacity-75">{contact.badge}</span>
                          <PhoneCall className="w-4 h-4 opacity-75" />
                        </div>
                        <h4 className="font-bold text-sm">{contact.title}</h4>
                        <p className="text-[11px] opacity-80">{contact.desc}</p>
                      </div>

                      <a
                        href={`tel:${contact.num.replace(/\s+/g, '')}`}
                        className="w-full py-2 bg-white/80 hover:bg-white text-center font-mono font-bold text-sm rounded-xl border border-black/10 transition shadow-2xs block"
                      >
                        {contact.num}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
