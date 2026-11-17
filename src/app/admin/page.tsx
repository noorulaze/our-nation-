"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/lib/i18n/context";
import { useCommunity } from "@/lib/community/context";
import { useAuth } from "@/lib/auth/context";
import { store } from "@/lib/data/store";
import { 
  ShieldCheck, 
  Users, 
  Calendar, 
  Briefcase, 
  Megaphone, 
  AlertTriangle, 
  Check, 
  X, 
  Trash2, 
  Activity, 
  Eye, 
  Lock,
  Layers, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  Building,
  Plus,
  Edit,
  ExternalLink,
  Archive,
  FileText,
  School,
  Phone,
  MapPin,
  Globe,
  Shield,
  RefreshCw,
  Search,
  Filter
} from "lucide-react";
import { 
  IssueStatus, 
  EventStatus, 
  BusinessStatus, 
  NewsArticleEntity, 
  Institution, 
  PublicService, 
  Event, 
  Business, 
  IssueReport 
} from "@/types/database";

type AdminTab = 
  | "overview" 
  | "submissions" 
  | "news" 
  | "events" 
  | "businesses" 
  | "institutions" 
  | "services" 
  | "issues" 
  | "posts" 
  | "audit";

export default function AdminPage() {
  const { t, language } = useLanguage();
  const { role, user, switchUserRole } = useAuth();
  const { currentCommunity } = useCommunity();

  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [searchFilter, setSearchFilter] = useState("");
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  // Store state queries
  const [stats, setStats] = useState(() => store.getVerificationStats());
  const [news, setNews] = useState(() => store.getNewsArticles(undefined, false, true));
  const [events, setEvents] = useState(() => store.getEvents(undefined, undefined, false, true));
  const [businesses, setBusinesses] = useState(() => store.getBusinesses(undefined, undefined, false, true));
  const [institutions, setInstitutions] = useState(() => store.getInstitutions(undefined, undefined, true));
  const [publicServices, setPublicServices] = useState(() => store.getPublicServices(undefined, undefined, true));
  const [issues, setIssues] = useState(() => store.getIssueReports());
  const [posts, setPosts] = useState(() => store.getPosts());
  const [auditLogs, setAuditLogs] = useState(() => store.getAuditLogs());

  // Input states
  const [officialResponseInput, setOfficialResponseInput] = useState<{ [id: string]: string }>({});

  // Verification modal state
  const [verifyingTarget, setVerifyingTarget] = useState<{ type: string; id: string; title: string } | null>(null);
  const [verifySourceUrl, setVerifySourceUrl] = useState("");
  const [verifySourceName, setVerifySourceName] = useState("");

  // Rejection modal state
  const [rejectingTarget, setRejectingTarget] = useState<{ type: "event" | "business" | "news"; id: string; title: string } | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");

  // Content Creation Modal states
  const [isCreateNewsOpen, setIsCreateNewsOpen] = useState(false);
  const [newsForm, setNewsForm] = useState({
    title: "",
    title_ml: "",
    category: "താനൂർ",
    summary: "",
    full_story: "",
    source_name: "താനൂർ നഗരസഭ ഔദ്യോഗിക വാർത്താക്കുറിപ്പ്",
    source_url: "https://tanurmunicipality.lsgkerala.gov.in/",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    image_license: "CC BY-SA 4.0",
    image_attribution: "Wikimedia Commons",
    is_official: true,
    is_verified: true,
  });

  const [isCreateBizOpen, setIsCreateBizOpen] = useState(false);
  const [bizForm, setBizForm] = useState({
    name: "",
    name_ml: "",
    category: "Fisheries & Seafood",
    description: "",
    address: "",
    phone: "",
    email: "",
    source_url: "https://tanurmunicipality.lsgkerala.gov.in/",
    source_name: "താനൂർ വ്യാപാര ലൈസൻസ് രജിസ്റ്റർ",
    is_verified: true,
  });

  const isAuthorized = role === "admin" || role === "moderator";

  const showFeedback = (msg: string) => {
    setActionFeedback(msg);
    setTimeout(() => setActionFeedback(null), 3500);
  };

  const refreshAllState = () => {
    setStats(store.getVerificationStats());
    setNews(store.getNewsArticles(undefined, false, true));
    setEvents(store.getEvents(undefined, undefined, false, true));
    setBusinesses(store.getBusinesses(undefined, undefined, false, true));
    setInstitutions(store.getInstitutions(undefined, undefined, true));
    setPublicServices(store.getPublicServices(undefined, undefined, true));
    setIssues(store.getIssueReports());
    setPosts(store.getPosts());
    setAuditLogs(store.getAuditLogs());
  };

  // -------------------------------------------------------------
  // ACTION HANDLERS
  // -------------------------------------------------------------
  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyingTarget) return;

    store.verifyEntity(
      verifyingTarget.type,
      verifyingTarget.id,
      verifySourceUrl.trim() || "https://tanurmunicipality.lsgkerala.gov.in/",
      verifySourceName.trim() || "തദ്ദേശ സ്വയംഭരണ വകുപ്പ് / താനൂർ നഗരസഭ",
      user?.id || "admin"
    );

    showFeedback(`"${verifyingTarget.title}" പരിശോധിച്ചുറപ്പിച്ചു (Verified with primary source).`);
    setVerifyingTarget(null);
    setVerifySourceUrl("");
    setVerifySourceName("");
    refreshAllState();
  };

  const handleRejectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectingTarget) return;

    if (rejectingTarget.type === "event") {
      store.updateEventStatus(rejectingTarget.id, "rejected", rejectionReason, user?.id);
    } else if (rejectingTarget.type === "business") {
      store.updateBusinessStatus(rejectingTarget.id, "rejected", false, user?.id);
    }

    showFeedback(`"${rejectingTarget.title}" നിരസിച്ചു (Submission Rejected).`);
    setRejectingTarget(null);
    setRejectionReason("");
    refreshAllState();
  };

  const handleUpdateIssue = (id: string, newStatus: IssueStatus) => {
    const responseNote = officialResponseInput[id] || undefined;
    store.updateIssueStatus(id, newStatus, responseNote, user?.id);
    refreshAllState();
    showFeedback(`പരാതിയുടെ അവസ്ഥ ${newStatus}-ലേക്ക് മാറ്റി.`);
  };

  const handleArchiveContent = (type: string, id: string, title: string) => {
    if (type === "news") store.archiveNewsArticle(id, user?.id);
    else if (type === "event") store.archiveEvent(id, user?.id);
    else if (type === "business") store.archiveBusiness(id, user?.id);
    else if (type === "institution") store.archiveInstitution(id, user?.id);
    else if (type === "service") store.archivePublicService(id, user?.id);

    refreshAllState();
    showFeedback(`"${title}" ആർക്കൈവ് ചെയ്തു (Archived).`);
  };

  const handleCreateNewsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    store.createNewsArticle({
      community_id: currentCommunity?.id || "40000000-0000-0000-0000-000000000007",
      title: newsForm.title,
      title_ml: newsForm.title_ml || newsForm.title,
      summary: newsForm.summary,
      full_story: newsForm.full_story,
      category: newsForm.category,
      date: new Date().toLocaleDateString("ml-IN", { day: "numeric", month: "long", year: "numeric" }),
      image_url: newsForm.image_url,
      image_license: newsForm.image_license,
      image_attribution: newsForm.image_attribution,
      source_name: newsForm.source_name,
      source_url: newsForm.source_url,
      is_official: newsForm.is_official,
      is_verified: newsForm.is_verified,
      is_community_submitted: false,
      verified_at: new Date().toISOString().split("T")[0],
      status: "approved",
    }, user?.id);

    setIsCreateNewsOpen(false);
    showFeedback("പുതിയ ഔദ്യോഗിക വാർത്ത വിജയകരമായി പ്രസിദ്ധീകരിച്ചു.");
    refreshAllState();
  };

  const handleCreateBizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    store.createBusiness({
      community_id: currentCommunity?.id || "40000000-0000-0000-0000-000000000007",
      name: bizForm.name,
      name_ml: bizForm.name_ml || bizForm.name,
      category: bizForm.category,
      description: bizForm.description,
      address: bizForm.address,
      phone: bizForm.phone,
      email: bizForm.email,
      source_url: bizForm.source_url,
      source_name: bizForm.source_name,
    });

    setIsCreateBizOpen(false);
    showFeedback("സ്ഥാപനം ഡയറക്ടറിയിൽ ചേർത്തു.");
    refreshAllState();
  };

  // Filter pending community submissions
  const pendingEvents = events.filter(e => e.status === "pending" || e.is_community_submitted);
  const pendingBusinesses = businesses.filter(b => b.status === "pending" || (!b.is_verified && b.is_community_submitted));
  const totalPending = pendingEvents.length + pendingBusinesses.length;

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl border border-[#EAE4D7] p-8 text-center shadow-card">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-[#B87A1E] flex items-center justify-center mx-auto mb-4 border border-amber-200">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold font-malayalam-serif text-[#1A2420]">
              അഡ്മിൻ പ്രവേശനം ആവശ്യമാണ്
            </h2>
            <p className="text-xs text-[#5C6A64] mt-2 leading-relaxed">
              ഈ പേജ് താനൂർ നഗരസഭാ മോഡറേറ്റർമാർക്കും പ്ലാറ്റ്‌ഫോം അഡ്മിനിസ്ട്രേറ്റർമാർക്കും മാത്രമുള്ളതാണ്. ടെസ്റ്റ് ചെയ്യാനായി താഴെ നൽകിയിരിക്കുന്ന ബട്ടൺ ഉപയോഗിച്ച് റോൾ മാറ്റാം:
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <button
                onClick={() => switchUserRole("admin")}
                className="w-full py-2.5 rounded-xl bg-[#1B4D36] hover:bg-[#133A28] text-white font-bold text-xs transition active:scale-95 shadow-sm"
              >
                അഡ്മിൻ റോൾ സ്വീകരിക്കുക (Switch to Admin)
              </button>
              <button
                onClick={() => switchUserRole("moderator")}
                className="w-full py-2.5 rounded-xl bg-white hover:bg-[#F3EFE6] text-[#1B4D36] border border-[#DDD5C5] font-bold text-xs transition active:scale-95 shadow-sm"
              >
                മോഡറേറ്റർ റോൾ സ്വീകരിക്കുക (Switch to Moderator)
              </button>
            </div>
          </div>
        </main>
        <Footer />
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header & Verification Health Badge */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <ShieldCheck className="w-7 h-7 text-[#1B4D36]" />
              <h1 className="text-2xl sm:text-3xl font-bold font-malayalam-serif text-[#1B4D36]">
                {t("adminDashboard")}
              </h1>
              <span className="text-[11px] bg-[#E0F1E7] text-[#1B4D36] font-bold px-3 py-0.5 rounded-full uppercase border border-[#BDE3CE]">
                {role} mode • Malappuram & Tanur
              </span>
            </div>
            <p className="text-xs text-[#5C6A64] mt-1 font-malayalam-body">
              വിവരങ്ങളുടെ കൃത്യത പരിശോധിക്കൽ, ഔദ്യോഗിക ഉറവിട ലിങ്കുകൾ, മോഡറേഷൻ, പുതിയ വിവരങ്ങൾ ചേർക്കൽ.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border border-[#EAE4D7] shadow-xs">
            <div className="text-right">
              <span className="text-[10px] font-bold uppercase text-[#7A8880] block">സ്ഥിരീകരിച്ച വിവരങ്ങൾ</span>
              <span className="text-sm font-bold text-emerald-800">{stats.percentVerified}% Verified</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#E0F1E7] text-[#1B4D36] flex items-center justify-center font-bold text-xs border border-[#BDE3CE]">
              {stats.totalVerified}/{stats.totalRecords}
            </div>
          </div>
        </div>

        {/* Feedback Banner */}
        {actionFeedback && (
          <div className="mb-6 p-4 rounded-2xl bg-[#1B4D36] text-white text-xs font-semibold flex items-center gap-2 shadow-md animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-amber-300" />
            <span>{actionFeedback}</span>
          </div>
        )}

        {/* Tabs Bar */}
        <div className="flex gap-2 overflow-x-auto pb-2 border-b border-[#E5DFD1] mb-6 scrollbar-none">
          {[
            { id: "overview", label: "Overview", icon: Activity },
            { id: "submissions", label: `അംഗീകാരത്തിനായുള്ളവ (${totalPending})`, icon: Sparkles },
            { id: "news", label: `വാർത്തകൾ (${news.length})`, icon: FileText },
            { id: "events", label: `പരിപാടികൾ (${events.length})`, icon: Calendar },
            { id: "businesses", label: `സ്ഥാപനങ്ങൾ (${businesses.length})`, icon: Briefcase },
            { id: "institutions", label: `വിദ്യാഭ്യാസ സ്ഥാപനങ്ങൾ (${institutions.length})`, icon: School },
            { id: "services", label: `പൊതുസേവനങ്ങൾ (${publicServices.length})`, icon: Phone },
            { id: "issues", label: `പരാതികൾ (${issues.length})`, icon: AlertTriangle },
            { id: "posts", label: `പോസ്റ്റുകൾ (${posts.length})`, icon: Eye },
            { id: "audit", label: `ഓഡിറ്റ് രേഖകൾ (${auditLogs.length})`, icon: Clock },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition active:scale-95 shadow-xs ${
                  isActive
                    ? "bg-[#1B4D36] text-white"
                    : "bg-white hover:bg-[#F3EFE6] text-[#3E4D45] border border-[#DDD5C5]"
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-amber-300" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: OVERVIEW */}
        {/* ========================================================================= */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white rounded-3xl border border-[#EAE4D7] p-5 shadow-card">
                <span className="text-[11px] font-bold text-[#7A8880] uppercase">ഡാറ്റാ സ്ഥിരീകരണ നിരക്ക്</span>
                <div className="text-3xl font-bold font-malayalam-serif text-emerald-800 mt-1">
                  {stats.percentVerified}%
                </div>
                <div className="text-[11px] text-[#5C6A64] mt-1 font-semibold">
                  {stats.totalVerified} / {stats.totalRecords} ലിസ്റ്റിംഗുകൾ സ്ഥിരീകരിച്ചു
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-[#EAE4D7] p-5 shadow-card">
                <span className="text-[11px] font-bold text-[#7A8880] uppercase">പരിശോധന ആവശ്യമുള്ളവ</span>
                <div className="text-3xl font-bold font-malayalam-serif text-amber-700 mt-1">
                  {totalPending}
                </div>
                <div className="text-[11px] text-amber-700 mt-1 font-semibold">
                  കമ്യൂണിറ്റി സമർപ്പിച്ചവ
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-[#EAE4D7] p-5 shadow-card">
                <span className="text-[11px] font-bold text-[#7A8880] uppercase">പൊതു പരാതികൾ</span>
                <div className="text-3xl font-bold font-malayalam-serif text-[#1B4D36] mt-1">
                  {issues.length}
                </div>
                <div className="text-[11px] text-[#5C6A64] mt-1 font-semibold">
                  {issues.filter(i => i.status === "resolved").length} പരിഹരിച്ചവ
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-[#EAE4D7] p-5 shadow-card">
                <span className="text-[11px] font-bold text-[#7A8880] uppercase">പൊതുസേവന നമ്പറുകൾ</span>
                <div className="text-3xl font-bold font-malayalam-serif text-[#1B4D36] mt-1">
                  {publicServices.length}
                </div>
                <div className="text-[11px] text-emerald-700 mt-1 font-semibold">
                  100% ഔദ്യോഗിക ഫോൺ നമ്പറുകൾ
                </div>
              </div>
            </div>

            {/* Quick Action Bar */}
            <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 shadow-card">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <h3 className="font-bold font-malayalam-serif text-base text-[#1A2420]">
                  ദ്രുത നടപടികൾ (Quick Content Actions)
                </h3>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setIsCreateNewsOpen(true)}
                    className="px-3.5 py-2 rounded-xl bg-[#1B4D36] hover:bg-[#133A28] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>പുതിയ വാർത്ത ചേർക്കുക</span>
                  </button>
                  <button
                    onClick={() => setIsCreateBizOpen(true)}
                    className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#FAF7F0] text-[#1B4D36] border border-[#DDD5C5] text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>സ്ഥാപനം ചേർക്കുക</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1B4D36] mb-1">
                    ഔദ്യോഗിക ഡാറ്റാ ഉറവിട മാനദണ്ഡം (Data Integrity Policy)
                  </h4>
                  <p className="text-xs text-[#5C6A64] leading-relaxed">
                    താനൂർ നഗരസഭ, റവന്യൂ വകുപ്പ്, പോലീസ്, ഫയർഫോഴ്സ്, കെ.എസ്.ഇ.ബി, റെയിൽവേ എന്നിവയുടെ ഔദ്യോഗിക പോർട്ടലുകളിൽ നിന്നോ സർക്കാർ ഉത്തരവുകളിൽ നിന്നോ ലഭിച്ച വിവരങ്ങൾ മാത്രമേ <strong>Verified</strong> ആയി അംഗീകരിക്കാവൂ. ഊഹാപോഹങ്ങളോ വ്യാജ നമ്പറുകളോ പ്രസിദ്ധീകരിക്കാൻ പാടില്ല.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1B4D36] mb-1">
                    ചിത്രങ്ങളുടെ ലൈസൻസിംഗ് (Image License Tracking)
                  </h4>
                  <p className="text-xs text-[#5C6A64] leading-relaxed">
                    സൈറ്റിൽ ഉപയോഗിക്കുന്ന ചിത്രങ്ങൾ വിക്കിമീഡിയ കോമൺസ് (CC BY-SA), സർക്കാർ പബ്ലിക് ഡൊമൈൻ, അല്ലെങ്കിൽ ലൈസൻസ് വ്യക്തമാക്കിയ ഫോട്ടോഗ്രാഫർമാരുടേതായിരിക്കണം. ഓരോ ചിത്രത്തിനും ലൈസൻസ് വിവരങ്ങളും ക്രെഡിറ്റും സൂക്ഷിക്കുന്നു.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: SUBMISSIONS & MODERATION INBOX */}
        {/* ========================================================================= */}
        {activeTab === "submissions" && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 shadow-card">
              <h3 className="font-bold font-malayalam-serif text-base text-[#1A2420] mb-2">
                കമ്യൂണിറ്റിയിൽ നിന്ന് സമർപ്പിക്കപ്പെട്ട വിവരങ്ങൾ ({totalPending})
              </h3>
              <p className="text-xs text-[#5C6A64] mb-6">
                പൊതുജനങ്ങൾ സമർപ്പിച്ച പരിപാടികളും സ്ഥാപന വിവരങ്ങളും പരിശോധിച്ച് അംഗീകരിക്കുകയോ, ഔദ്യോഗിക ഉറവിടം ചേർത്തശേഷം Verified Badge നൽകുകയോ ചെയ്യാം.
              </p>

              {totalPending === 0 ? (
                <div className="text-center py-12 bg-[#FAF7F0] rounded-2xl border border-dashed border-[#DDD5C5]">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <p className="text-xs font-bold text-[#1A2420]">പുതിയ പരിശോധനകൾ ഒന്നും ബാക്കിയില്ല</p>
                  <p className="text-[11px] text-[#7A8880] mt-0.5">എല്ലാ സമർപ്പണങ്ങളും കൃത്യമായി പ്രോസസ്സ് ചെയ്തിട്ടുണ്ട്.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Pending Events */}
                  {pendingEvents.map((ev) => (
                    <div key={ev.id} className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-blue-800 bg-blue-100 px-2.5 py-0.5 rounded-full uppercase">
                            Event Submission
                          </span>
                          <span className="text-xs text-[#7A8880]">{ev.location_name}</span>
                        </div>
                        <h4 className="font-bold text-sm text-[#1A2420] mt-1">{ev.title}</h4>
                        <p className="text-xs text-[#5C6A64] mt-0.5 line-clamp-2">{ev.description}</p>
                        <div className="flex items-center gap-3 text-[11px] text-[#7A8880] mt-2">
                          <span>തീയതി: {new Date(ev.start_date).toLocaleDateString()}</span>
                          <span>സംഘാടകർ: {ev.organizer_name}</span>
                          {ev.contact_phone && <span>ഫോൺ: {ev.contact_phone}</span>}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                        <button
                          onClick={() => setVerifyingTarget({ type: "event", id: ev.id, title: ev.title })}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs"
                        >
                          Verify & Approve ✓
                        </button>
                        <button
                          onClick={() => setRejectingTarget({ type: "event", id: ev.id, title: ev.title })}
                          className="px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold transition"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Pending Businesses */}
                  {pendingBusinesses.map((biz) => (
                    <div key={biz.id} className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full uppercase">
                            Business / Service
                          </span>
                          <span className="text-xs text-[#7A8880]">{biz.category}</span>
                        </div>
                        <h4 className="font-bold text-sm text-[#1A2420] mt-1">{biz.name}</h4>
                        <p className="text-xs text-[#5C6A64] mt-0.5">{biz.address} • ഫോൺ: {biz.phone}</p>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                        <button
                          onClick={() => setVerifyingTarget({ type: "business", id: biz.id, title: biz.name })}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs"
                        >
                          Verify & Badge ✓
                        </button>
                        <button
                          onClick={() => setRejectingTarget({ type: "business", id: biz.id, title: biz.name })}
                          className="px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold transition"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: NEWS & ANNOUNCEMENTS */}
        {/* ========================================================================= */}
        {activeTab === "news" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-bold font-malayalam-serif text-lg text-[#1A2420]">
                താനൂർ & മലപ്പുറം വാർത്തകൾ ({news.length})
              </h3>
              <button
                onClick={() => setIsCreateNewsOpen(true)}
                className="px-4 py-2 rounded-xl bg-[#1B4D36] hover:bg-[#133A28] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>പുതിയ വാർത്ത ചേർക്കുക</span>
              </button>
            </div>

            <div className="space-y-4">
              {news.map((item) => (
                <div key={item.id} className="bg-white rounded-3xl border border-[#EAE4D7] p-5 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-20 h-20 rounded-2xl object-cover shrink-0 border border-[#EAE4D7]"
                    />
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-bold text-[#1B4D36] bg-[#E0F1E7] px-2.5 py-0.5 rounded-full">
                          {item.category}
                        </span>
                        {item.is_verified && (
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            Verified Source ✓
                          </span>
                        )}
                        {item.archived && (
                          <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                            Archived
                          </span>
                        )}
                        <span className="text-xs text-[#7A8880]">{item.date}</span>
                      </div>
                      <h4 className="font-bold text-base text-[#1A2420] mt-1">{item.title}</h4>
                      <p className="text-xs text-[#5C6A64] mt-1 line-clamp-1">{item.summary}</p>
                      <div className="flex items-center gap-2 text-[11px] text-[#7A8880] mt-2">
                        <span>ഉറവിടം: {item.source_name}</span>
                        {item.source_url && (
                          <a
                            href={item.source_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#1B4D36] hover:underline flex items-center gap-0.5"
                          >
                            <span>ലിങ്ക്</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start md:self-center shrink-0">
                    {!item.is_verified && (
                      <button
                        onClick={() => setVerifyingTarget({ type: "news", id: item.id, title: item.title })}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition"
                      >
                        Verify
                      </button>
                    )}
                    {!item.archived && (
                      <button
                        onClick={() => handleArchiveContent("news", item.id, item.title)}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition flex items-center gap-1"
                      >
                        <Archive className="w-3.5 h-3.5" />
                        <span>Archive</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: EVENTS & FESTIVALS */}
        {/* ========================================================================= */}
        {activeTab === "events" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-bold font-malayalam-serif text-lg text-[#1A2420]">
                പരിപാടികളും ഉത്സവങ്ങളും ({events.length})
              </h3>
            </div>

            <div className="space-y-4">
              {events.map((ev) => (
                <div key={ev.id} className="bg-white rounded-3xl border border-[#EAE4D7] p-5 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold uppercase text-[#1B4D36] bg-[#E0F1E7] px-2.5 py-0.5 rounded-full">
                        {ev.category}
                      </span>
                      {ev.is_verified ? (
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          Verified ✓ ({ev.verified_at || "2026-11-17"})
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                          Community Submitted
                        </span>
                      )}
                      <span className="text-xs text-[#7A8880]">{ev.location_name}</span>
                    </div>
                    <h4 className="font-bold text-base text-[#1A2420] mt-1">{ev.title}</h4>
                    <p className="text-xs text-[#5C6A64] mt-0.5">{ev.description}</p>
                    <div className="flex items-center gap-3 text-[11px] text-[#7A8880] mt-2">
                      <span>തീയതി: {new Date(ev.start_date).toLocaleDateString()}</span>
                      <span>സംഘാടകർ: {ev.organizer_name}</span>
                      {ev.source_url && (
                        <a href={ev.source_url} target="_blank" rel="noopener noreferrer" className="text-[#1B4D36] hover:underline flex items-center gap-0.5">
                          <span>ഉറവിടം</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start md:self-center shrink-0">
                    {!ev.is_verified && (
                      <button
                        onClick={() => setVerifyingTarget({ type: "event", id: ev.id, title: ev.title })}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition"
                      >
                        Verify Badge
                      </button>
                    )}
                    {!ev.archived && (
                      <button
                        onClick={() => handleArchiveContent("event", ev.id, ev.title)}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition"
                      >
                        Archive
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: BUSINESSES & SHOPS */}
        {/* ========================================================================= */}
        {activeTab === "businesses" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-bold font-malayalam-serif text-lg text-[#1A2420]">
                വ്യാപാര സ്ഥാപനങ്ങൾ & സേവനങ്ങൾ ({businesses.length})
              </h3>
              <button
                onClick={() => setIsCreateBizOpen(true)}
                className="px-4 py-2 rounded-xl bg-[#1B4D36] hover:bg-[#133A28] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>സ്ഥാപനം ചേർക്കുക</span>
              </button>
            </div>

            <div className="space-y-4">
              {businesses.map((biz) => (
                <div key={biz.id} className="bg-white rounded-3xl border border-[#EAE4D7] p-5 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-[#1B4D36] bg-[#E0F1E7] px-2.5 py-0.5 rounded-full">
                        {biz.category}
                      </span>
                      {biz.is_verified ? (
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          Verified ✓ ({biz.verified_at || "2026-11-17"})
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full">
                          Unverified
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-base text-[#1A2420] mt-1">{biz.name}</h4>
                    <p className="text-xs text-[#5C6A64] mt-0.5">{biz.address} • ഫോൺ: {biz.phone}</p>
                    {biz.source_name && (
                      <span className="text-[11px] text-[#7A8880] mt-1 block">സ്ഥിരീകരിച്ച ഉറവിടം: {biz.source_name}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 self-start md:self-center shrink-0">
                    <button
                      onClick={() => {
                        const newVerified = !biz.is_verified;
                        store.updateBusinessStatus(biz.id, "approved", newVerified, user?.id);
                        refreshAllState();
                        showFeedback(`"${biz.name}" വെരിഫിക്കേഷൻ സ്റ്റാറ്റസ് പുതുക്കി.`);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                        biz.is_verified
                          ? "bg-emerald-600 text-white hover:bg-emerald-700"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                      }`}
                    >
                      {biz.is_verified ? "Verified ✓" : "Verify Badge നൽകുക"}
                    </button>
                    {!biz.archived && (
                      <button
                        onClick={() => handleArchiveContent("business", biz.id, biz.name)}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition"
                      >
                        Archive
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: INSTITUTIONS */}
        {/* ========================================================================= */}
        {activeTab === "institutions" && (
          <div className="space-y-6">
            <h3 className="font-bold font-malayalam-serif text-lg text-[#1A2420]">
              വിദ്യാഭ്യാസ സ്ഥാപനങ്ങൾ ({institutions.length})
            </h3>
            <div className="space-y-4">
              {institutions.map((inst) => (
                <div key={inst.id} className="bg-white rounded-3xl border border-[#EAE4D7] p-5 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-[#1B4D36] bg-[#E0F1E7] px-2.5 py-0.5 rounded-full">
                        {inst.type_ml}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Verified ({inst.verified_at || "2026-11-17"})
                      </span>
                      <span className="text-xs text-[#7A8880]">സ്ഥാപിതം: {inst.established_year}</span>
                    </div>
                    <h4 className="font-bold text-base text-[#1A2420] mt-1">{inst.name_ml} ({inst.name})</h4>
                    <p className="text-xs text-[#5C6A64] mt-0.5">{inst.address} • ഫോൺ: {inst.phone || "—"}</p>
                    <div className="flex items-center gap-3 text-[11px] text-[#7A8880] mt-2">
                      {inst.website && (
                        <a href={inst.website} target="_blank" rel="noopener noreferrer" className="text-[#1B4D36] hover:underline flex items-center gap-0.5">
                          <span>ഔദ്യോഗിക പോർട്ടൽ</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      <span>ഉറവിടം: {inst.source_name}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start md:self-center shrink-0">
                    <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-xl">
                      സജീവ ഡയറക്ടറി ✓
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 7: PUBLIC SERVICES & EMERGENCY */}
        {/* ========================================================================= */}
        {activeTab === "services" && (
          <div className="space-y-6">
            <h3 className="font-bold font-malayalam-serif text-lg text-[#1A2420]">
              താനൂർ പൊതുസേവന & അത്യാഹിത കാര്യാലയങ്ങൾ ({publicServices.length})
            </h3>
            <div className="space-y-4">
              {publicServices.map((srv) => (
                <div key={srv.id} className="bg-white rounded-3xl border border-[#EAE4D7] p-5 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-[#1B4D36] bg-[#E0F1E7] px-2.5 py-0.5 rounded-full">
                        {srv.category_ml}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Official Landline Verified ✓
                      </span>
                    </div>
                    <h4 className="font-bold text-base text-[#1A2420] mt-1">{srv.name_ml} ({srv.name})</h4>
                    <p className="text-xs text-[#5C6A64] mt-0.5">{srv.address} • ഫോൺ: <strong>{srv.phone}</strong> {srv.emergency_number && `(എമർജൻസി: ${srv.emergency_number})`}</p>
                    <p className="text-[11px] text-[#7A8880] mt-1">{srv.working_hours}</p>
                  </div>

                  <div className="flex items-center gap-2 self-start md:self-center shrink-0">
                    {srv.official_link && (
                      <a
                        href={srv.official_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#FAF7F0] text-[#1B4D36] border border-[#DDD5C5] text-xs font-bold transition flex items-center gap-1"
                      >
                        <span>പോർട്ടൽ</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 8: CIVIC ISSUES */}
        {/* ========================================================================= */}
        {activeTab === "issues" && (
          <div className="space-y-4">
            {issues.map((issue) => (
              <div key={issue.id} className="bg-white rounded-3xl border border-[#EAE4D7] p-6 shadow-card space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F3EFE6] pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                      {issue.category}
                    </span>
                    <h3 className="text-base font-bold font-malayalam-serif text-[#1A2420] mt-1">
                      {issue.title}
                    </h3>
                    <span className="text-xs text-[#7A8880]">
                      {issue.location_name} • {new Date(issue.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <span className={`self-start sm:self-center text-xs font-bold px-3 py-1 rounded-full uppercase ${
                    issue.status === "resolved"
                      ? "bg-emerald-100 text-emerald-800"
                      : issue.status === "in_progress"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-amber-100 text-amber-800"
                  }`}>
                    {issue.status}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#4A5750] leading-relaxed">
                  {issue.description}
                </p>

                {issue.official_response && (
                  <div className="p-3.5 rounded-2xl bg-[#E0F1E7] border border-[#BDE3CE] text-xs text-[#1B4D36]">
                    <strong>ഔദ്യോഗിക മറുപടി:</strong> {issue.official_response}
                  </div>
                )}

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <input
                    type="text"
                    placeholder="നഗരസഭാ അധികൃതരുടെ മറുപടി ഇവിടെ രേഖപ്പെടുത്താം..."
                    value={officialResponseInput[issue.id] || ""}
                    onChange={(e) =>
                      setOfficialResponseInput({
                        ...officialResponseInput,
                        [issue.id]: e.target.value,
                      })
                    }
                    className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-none focus:border-[#1B4D36]"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdateIssue(issue.id, "in_progress")}
                      className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs"
                    >
                      In Progress
                    </button>
                    <button
                      onClick={() => handleUpdateIssue(issue.id, "resolved")}
                      className="px-3.5 py-2 rounded-xl bg-[#1B4D36] hover:bg-[#133A28] text-white text-xs font-bold shadow-xs"
                    >
                      Resolved ✓
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 9: POSTS MODERATION */}
        {/* ========================================================================= */}
        {activeTab === "posts" && (
          <div className="space-y-4">
            {posts.map((p) => (
              <div key={p.id} className="bg-white rounded-3xl border border-[#EAE4D7] p-5 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-[#1A2420]">{p.author?.display_name || "Neighbor"}</span>
                  <p className="text-xs text-[#4A5750]">{p.content}</p>
                </div>
                <button
                  onClick={() => {
                    store.deletePost(p.id, user?.id || "admin");
                    refreshAllState();
                    showFeedback("പോസ്റ്റ് നീക്കം ചെയ്തു.");
                  }}
                  className="px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold self-start sm:self-center transition flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>നീക്കം ചെയ്യുക</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 10: AUDIT TRAIL */}
        {/* ========================================================================= */}
        {activeTab === "audit" && (
          <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 shadow-card overflow-x-auto">
            <h3 className="font-bold font-malayalam-serif text-base text-[#1A2420] mb-4">
              ഓഡിറ്റ് രേഖകൾ (Audit Logs & Action Trail)
            </h3>
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#EAE4D7] text-[#7A8880] font-bold">
                  <th className="pb-3">Action</th>
                  <th className="pb-3">Target</th>
                  <th className="pb-3">Target ID</th>
                  <th className="pb-3">Details</th>
                  <th className="pb-3">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3EFE6]">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-[#FAF7F0] transition">
                    <td className="py-3 font-bold text-[#1B4D36]">{log.action}</td>
                    <td className="py-3 text-[#1A2420]">{log.target_type}</td>
                    <td className="py-3 font-mono text-[11px] text-[#7A8880]">{log.target_id ? `${log.target_id.slice(0, 10)}...` : "—"}</td>
                    <td className="py-3 text-[11px] text-[#5C6A64]">
                      {log.details ? JSON.stringify(log.details) : "—"}
                    </td>
                    <td className="py-3 text-[#7A8880]">{new Date(log.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </main>

      {/* ========================================================================= */}
      {/* MODAL 1: VERIFICATION & SOURCE ATTRIBUTION MODAL */}
      {/* ========================================================================= */}
      {verifyingTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl border border-[#EAE4D7] max-w-lg w-full p-6 shadow-elevated">
            <div className="flex items-center justify-between pb-4 border-b border-[#F3EFE6]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <h3 className="font-bold text-base text-[#1A2420]">
                  വിവരം സ്ഥിരീകരിക്കുക (Verify Listing)
                </h3>
              </div>
              <button
                onClick={() => setVerifyingTarget(null)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleVerifySubmit} className="mt-4 space-y-4">
              <div className="p-3 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7] text-xs text-[#5C6A64]">
                <strong className="text-[#1A2420] block mb-1">വിഷയം: {verifyingTarget.title}</strong>
                പ്രാഥമിക ഉറവിടം (Primary Official Source) പരിശോധിച്ച ശേഷം മാത്രമേ Verified പദവി നൽകാവൂ.
              </div>

              <div>
                <label className="text-xs font-bold text-[#1A2420] block mb-1">
                  ഔദ്യോഗിക ഉറവിടത്തിന്റെ പേര് (Source Organization)
                </label>
                <input
                  type="text"
                  required
                  placeholder="ഉദാ: താനൂർ നഗരസഭ / കേരള വിനോദസഞ്ചാര വകുപ്പ്"
                  value={verifySourceName}
                  onChange={(e) => setVerifySourceName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-none focus:border-[#1B4D36]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#1A2420] block mb-1">
                  ഉറവിട വെബ് ലിങ്ക് (Source URL)
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://tanurmunicipality.lsgkerala.gov.in/..."
                  value={verifySourceUrl}
                  onChange={(e) => setVerifySourceUrl(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-none focus:border-[#1B4D36]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setVerifyingTarget(null)}
                  className="flex-1 py-2.5 rounded-xl border border-[#DDD5C5] text-xs font-bold text-[#5C6A64] hover:bg-[#FAF7F0]"
                >
                  റദ്ദാക്കുക
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs"
                >
                  Verified Badge നൽകുക ✓
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: REJECTION WITH REASON MODAL */}
      {/* ========================================================================= */}
      {rejectingTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl border border-[#EAE4D7] max-w-md w-full p-6 shadow-elevated">
            <div className="flex items-center justify-between pb-4 border-b border-[#F3EFE6]">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <h3 className="font-bold text-base text-[#1A2420]">
                  സമർപ്പണം നിരസിക്കുക (Reject Submission)
                </h3>
              </div>
              <button
                onClick={() => setRejectingTarget(null)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleRejectSubmit} className="mt-4 space-y-4">
              <p className="text-xs text-[#5C6A64]">
                <strong>{rejectingTarget.title}</strong> നിരസിക്കുന്നതിനുള്ള കാരണം രേഖപ്പെടുത്തുക.
              </p>

              <div>
                <textarea
                  required
                  rows={3}
                  placeholder="ഉദാ: അപൂർണ്ണമായ വിലാസം / തെറ്റായ ഫോൺ നമ്പർ / ഔദ്യോഗിക വിവരങ്ങളുമായി പൊരുത്തപ്പെടുന്നില്ല..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-none focus:border-red-600"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRejectingTarget(null)}
                  className="flex-1 py-2.5 rounded-xl border border-[#DDD5C5] text-xs font-bold text-[#5C6A64]"
                >
                  റദ്ദാക്കുക
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs"
                >
                  നിരസിക്കുക (Reject)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: CREATE OFFICIAL NEWS MODAL */}
      {/* ========================================================================= */}
      {isCreateNewsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-3xl border border-[#EAE4D7] max-w-xl w-full p-6 shadow-elevated my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#F3EFE6]">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#1B4D36]" />
                <h3 className="font-bold text-base text-[#1A2420]">
                  പുതിയ ഔദ്യോഗിക വാർത്ത ചേർക്കുക
                </h3>
              </div>
              <button
                onClick={() => setIsCreateNewsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateNewsSubmit} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="font-bold text-[#1A2420] block mb-1">വാർത്താ തലക്കെട്ട് (Title)</label>
                <input
                  type="text"
                  required
                  placeholder="ഉദാ: താനൂർ ഫിഷിംഗ് ഹാർബർ ആധുനികവൽക്കരണം..."
                  value={newsForm.title}
                  onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#1A2420] block mb-1">വിഭാഗം (Category)</label>
                  <select
                    value={newsForm.category}
                    onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                  >
                    <option value="താനൂർ">താനൂർ</option>
                    <option value="ഭരണം">ഭരണം (Governance)</option>
                    <option value="വിദ്യാഭ്യാസം">വിദ്യാഭ്യാസം (Education)</option>
                    <option value="കായികം">കായികം (Sports)</option>
                    <option value="പൈതൃകം">പൈതൃകം (Heritage)</option>
                    <option value="തീരദേശം">തീരദേശം (Coastal)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#1A2420] block mb-1">ചിത്ര ലൈസൻസ് (License)</label>
                  <input
                    type="text"
                    value={newsForm.image_license}
                    onChange={(e) => setNewsForm({ ...newsForm, image_license: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#1A2420] block mb-1">ചുരുക്കം (Summary)</label>
                <input
                  type="text"
                  required
                  value={newsForm.summary}
                  onChange={(e) => setNewsForm({ ...newsForm, summary: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>

              <div>
                <label className="font-bold text-[#1A2420] block mb-1">പൂർണ്ണ വിവരണം (Full Story)</label>
                <textarea
                  required
                  rows={4}
                  value={newsForm.full_story}
                  onChange={(e) => setNewsForm({ ...newsForm, full_story: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#1A2420] block mb-1">ഉറവിട കാര്യാലയം (Source Name)</label>
                  <input
                    type="text"
                    required
                    value={newsForm.source_name}
                    onChange={(e) => setNewsForm({ ...newsForm, source_name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#1A2420] block mb-1">ഉറവിട വെബ് ലിങ്ക് (Source URL)</label>
                  <input
                    type="url"
                    required
                    value={newsForm.source_url}
                    onChange={(e) => setNewsForm({ ...newsForm, source_url: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#1A2420] block mb-1">ചിത്ര ലിങ്ക് (Image URL)</label>
                <input
                  type="url"
                  required
                  value={newsForm.image_url}
                  onChange={(e) => setNewsForm({ ...newsForm, image_url: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsCreateNewsOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-[#DDD5C5] font-bold text-[#5C6A64]"
                >
                  റദ്ദാക്കുക
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#1B4D36] hover:bg-[#133A28] text-white font-bold shadow-xs"
                >
                  പ്രസിദ്ധീകരിക്കുക ✓
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: CREATE BUSINESS MODAL */}
      {/* ========================================================================= */}
      {isCreateBizOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-3xl border border-[#EAE4D7] max-w-lg w-full p-6 shadow-elevated my-8">
            <div className="flex items-center justify-between pb-4 border-b border-[#F3EFE6]">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#1B4D36]" />
                <h3 className="font-bold text-base text-[#1A2420]">
                  പുതിയ സ്ഥാപനം ചേർക്കുക (Add Business / Service)
                </h3>
              </div>
              <button
                onClick={() => setIsCreateBizOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateBizSubmit} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="font-bold text-[#1A2420] block mb-1">സ്ഥാപനത്തിന്റെ പേര് (Business Name)</label>
                <input
                  type="text"
                  required
                  placeholder="ഉദാ: Malabar Sea Bounty Fish Exports"
                  value={bizForm.name}
                  onChange={(e) => setBizForm({ ...bizForm, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>

              <div>
                <label className="font-bold text-[#1A2420] block mb-1">മേഖല (Category)</label>
                <select
                  value={bizForm.category}
                  onChange={(e) => setBizForm({ ...bizForm, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                >
                  <option value="Fisheries & Seafood">Fisheries & Seafood</option>
                  <option value="Food & Bakery">Food & Bakery</option>
                  <option value="Retail & Crafts">Retail & Crafts</option>
                  <option value="Healthcare & Clinics">Healthcare & Clinics</option>
                  <option value="Home & Maintenance">Home & Maintenance</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-[#1A2420] block mb-1">വിലാസം (Address in Tanur / Malappuram)</label>
                <input
                  type="text"
                  required
                  placeholder="Harbour Road, West Tanur - 676302"
                  value={bizForm.address}
                  onChange={(e) => setBizForm({ ...bizForm, address: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>

              <div>
                <label className="font-bold text-[#1A2420] block mb-1">യഥാർത്ഥ ഫോൺ നമ്പർ (Official Phone)</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 94471 23450 അല്ലെങ്കിൽ 0494 258..."
                  value={bizForm.phone}
                  onChange={(e) => setBizForm({ ...bizForm, phone: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>

              <div>
                <label className="font-bold text-[#1A2420] block mb-1">വിവരണം (Description)</label>
                <textarea
                  required
                  rows={2}
                  value={bizForm.description}
                  onChange={(e) => setBizForm({ ...bizForm, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateBizOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-[#DDD5C5] font-bold text-[#5C6A64]"
                >
                  റദ്ദാക്കുക
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#1B4D36] hover:bg-[#133A28] text-white font-bold shadow-xs"
                >
                  ചേർക്കുക ✓
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
      <BottomNav />
    </div>
  );
}
