"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { CivicNav } from "@/components/civic/CivicNav";
import { useLanguage } from "@/lib/i18n/context";
import { useAuth } from "@/lib/auth/context";
import { 
  civicStore, 
  CIVIC_CATEGORIES, 
  CivicIssue,
  CivicComment 
} from "@/lib/data/civicConnectData";
import { 
  ArrowLeft, 
  MapPin, 
  ThumbsUp, 
  Bookmark, 
  Share2, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Send, 
  ShieldCheck, 
  Building2, 
  Copy, 
  Check, 
  MessageSquare, 
  User, 
  Calendar, 
  Camera, 
  Flag, 
  X,
  ExternalLink,
  ChevronRight,
  ShieldAlert
} from "lucide-react";

export default function CivicIssueDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { language } = useLanguage();
  const { user, role } = useAuth();
  const issueId = params?.id as string;

  const [issue, setIssue] = useState<CivicIssue | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [activeImagePreview, setActiveImagePreview] = useState<string | null>(null);

  // Comment input form
  const [commentText, setCommentText] = useState("");
  const [commenterName, setCommenterName] = useState(user?.display_name || "താനൂർ നിവാസി (Resident)");
  const [commentSubmitting, setCommentSubmitting] = useState(false);

  // Report modal state
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState("misinformation");
  const [reportSent, setReportSent] = useState(false);

  useEffect(() => {
    if (issueId) {
      const found = civicStore.getIssueById(issueId);
      setIssue(found ? { ...found } : null);
      setLoading(false);
    }
  }, [issueId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F0] flex items-center justify-center p-8 text-[#194B35]">
        <div className="text-center">
          <div className="w-10 h-10 border-3 border-[#194B35] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-bold font-malayalam">പരാതിയുടെ വിവരങ്ങൾ ലോഡ് ചെയ്യുന്നു...</p>
        </div>
      </div>
    );
  }

  if (!issue) {
    return (
      <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420]">
        <Navbar />
        <CivicNav />
        <div className="max-w-xl mx-auto px-4 py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto mb-4 text-rose-600">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-[#194B35] mb-2 font-serif">
            {language === "ml" ? "പരാതി കണ്ടെത്താനായില്ല" : "Civic Issue Not Found"}
          </h2>
          <p className="text-xs sm:text-sm text-[#5C6A64] mb-6">
            {language === "ml"
              ? "ഈ ട്രാക്കിംഗ് ഐഡിയിലുള്ള പരാതി സിസ്റ്റത്തിൽ ലഭ്യമല്ല അല്ലെങ്കിൽ നീക്കം ചെയ്യപ്പെട്ടിരിക്കാം."
              : "The requested civic issue could not be found or may have been removed."}
          </p>
          <Link
            href="/civic/issues"
            className="px-5 py-2.5 rounded-xl bg-[#194B35] text-white text-xs font-bold hover:bg-[#143E2C] transition inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === "ml" ? "പരാതികളുടെ ലിസ്റ്റിലേക്ക് മടങ്ങുക" : "Back to All Issues"}</span>
          </Link>
        </div>
        <Footer />
        <BottomNav />
      </div>
    );
  }

  const category = CIVIC_CATEGORIES.find(c => c.id === issue.category_id);

  const handleCopyTrackingId = () => {
    navigator.clipboard.writeText(issue.tracking_id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: issue.title,
        text: `Civic Connect Malappuram: ${issue.title} (${issue.tracking_id})`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("ലിങ്ക് കോപ്പി ചെയ്തു! (Link copied to clipboard)");
    }
  };

  const handleSupportToggle = () => {
    civicStore.toggleSupport(issue.id);
    const updated = civicStore.getIssueById(issue.id);
    if (updated) setIssue({ ...updated });
  };

  const handleFollowToggle = () => {
    civicStore.toggleFollow(issue.id);
    const updated = civicStore.getIssueById(issue.id);
    if (updated) setIssue({ ...updated });
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setCommentSubmitting(true);
    civicStore.addComment(
      issue.id,
      commenterName.trim() || "താനൂർ നിവാസി",
      user?.id || "anon-" + Date.now(),
      commentText.trim(),
      role === "admin" || role === "moderator"
    );

    const updated = civicStore.getIssueById(issue.id);
    if (updated) setIssue({ ...updated });
    setCommentText("");
    setCommentSubmitting(false);
  };

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

  const statusBadge = getStatusBadge(issue.status);
  const StatusIcon = statusBadge.icon;

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] pb-24">
      <Navbar />
      <CivicNav />

      {/* Breadcrumb & Navigation Bar */}
      <div className="bg-white border-b border-[#E8DCBF] py-3">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link
            href="/civic/issues"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#194B35] hover:text-[#8C5B0F] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === "ml" ? "പരാതികളുടെ ലിസ്റ്റിലേക്ക്" : "Back to Issues"}</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-lg border border-[#DDD5C5] bg-[#FAF7F0] text-[#5C6A64] hover:text-[#194B35] hover:bg-white text-xs font-semibold flex items-center gap-1 transition"
              title="പങ്കുവെക്കുക (Share)"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{language === "ml" ? "പങ്കുവെക്കുക" : "Share"}</span>
            </button>
            <button
              onClick={() => setShowReportModal(true)}
              className="p-2 rounded-lg border border-[#DDD5C5] bg-[#FAF7F0] text-rose-600 hover:bg-rose-50 text-xs font-semibold flex items-center gap-1 transition"
              title="റിപ്പോർട്ട് ചെയ്യുക (Report inappropriate)"
            >
              <Flag className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{language === "ml" ? "ഫ്ലാഗ് ചെയ്യുക" : "Flag"}</span>
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main 2-Column Content */}
          <div className="lg:col-span-2 space-y-6">

            {/* Header Hero Card */}
            <div className="bg-white rounded-3xl border border-[#E8DCBF] p-5 sm:p-7 shadow-xs">
              {/* Tracking ID & Status Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs sm:text-sm font-extrabold text-[#194B35] bg-[#E0F1E7] px-3 py-1 rounded-xl border border-[#BDE3CE] flex items-center gap-1.5">
                    <span>{issue.tracking_id}</span>
                  </span>
                  <button
                    onClick={handleCopyTrackingId}
                    className="p-1.5 text-neutral-400 hover:text-[#194B35] rounded-lg hover:bg-neutral-100 transition"
                    title="ട്രാക്കിംഗ് ഐഡി കോപ്പി ചെയ്യുക"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${statusBadge.bg}`}>
                    <StatusIcon className="w-3.5 h-3.5" />
                    {statusBadge.label}
                  </span>
                  {issue.priority === "urgent" && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700 border border-rose-300 uppercase tracking-wider">
                      അടിയന്തിരം
                    </span>
                  )}
                </div>
              </div>

              {/* Title & Category Info */}
              <div className="pt-4 space-y-3">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span
                    className="font-bold px-2.5 py-0.5 rounded-md"
                    style={{ backgroundColor: `${category?.color || '#194B35'}15`, color: category?.color || '#194B35' }}
                  >
                    {language === "ml" ? category?.name_ml || issue.subcategory : category?.name || issue.subcategory}
                  </span>
                  <span className="text-neutral-400">•</span>
                  <span className="text-neutral-500 font-medium">
                    {issue.subcategory}
                  </span>
                  <span className="text-neutral-400">•</span>
                  <span className="text-neutral-500">
                    {new Date(issue.created_at).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })}
                  </span>
                </div>

                <h1 className="text-xl sm:text-2xl font-extrabold text-[#194B35] font-serif leading-snug">
                  {language === "ml" ? issue.title_ml : issue.title}
                </h1>
                {issue.title_ml && language !== "ml" && (
                  <p className="text-xs text-neutral-500 italic">{issue.title_ml}</p>
                )}

                <p className="text-xs sm:text-sm text-[#252A25] leading-relaxed whitespace-pre-line pt-2">
                  {issue.description}
                </p>
              </div>

              {/* Action Buttons Bar */}
              <div className="mt-6 pt-4 border-t border-[#E8DCBF] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {/* Community Support Button */}
                  <button
                    onClick={handleSupportToggle}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 active:scale-95 ${
                      issue.supported_by_user
                        ? "bg-[#194B35] text-white shadow-xs"
                        : "bg-[#FAF7F0] text-[#194B35] border border-[#DDD5C5] hover:bg-emerald-50"
                    }`}
                  >
                    <ThumbsUp className={`w-4 h-4 ${issue.supported_by_user ? "fill-current" : ""}`} />
                    <span>{language === "ml" ? "പിന്തുണയ്ക്കുക" : "Support"} ({issue.support_count})</span>
                  </button>

                  {/* Follow Button */}
                  <button
                    onClick={handleFollowToggle}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 active:scale-95 ${
                      issue.followed_by_user
                        ? "bg-[#8C5B0F] text-white shadow-xs"
                        : "bg-[#FAF7F0] text-[#8C5B0F] border border-[#DDD5C5] hover:bg-amber-50"
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${issue.followed_by_user ? "fill-current" : ""}`} />
                    <span>{issue.followed_by_user ? (language === "ml" ? "ഫോളോ ചെയ്യുന്നു" : "Following") : (language === "ml" ? "ഫോളോ ചെയ്യുക" : "Follow Updates")}</span>
                  </button>
                </div>

                <div className="text-xs text-neutral-500 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-neutral-400" />
                  <span>
                    {issue.is_anonymous ? (language === "ml" ? "അജ്ഞാത നിവാസി" : "Anonymous Resident") : issue.reporter_name}
                  </span>
                </div>
              </div>
            </div>

            {/* Photo Evidence Gallery */}
            {issue.images && issue.images.length > 0 && (
              <div className="bg-white rounded-3xl border border-[#E8DCBF] p-5 sm:p-6 shadow-xs">
                <h3 className="text-sm font-bold text-[#194B35] mb-3 flex items-center gap-2 font-serif">
                  <Camera className="w-4 h-4 text-[#8C5B0F]" />
                  <span>{language === "ml" ? "പ്രശ്നത്തിന്റെ ഫോട്ടോകൾ (Evidence Photos)" : "Photo Evidence"} ({issue.images.length})</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {issue.images.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => setActiveImagePreview(img)}
                      className="group relative aspect-4/3 rounded-xl overflow-hidden border border-[#DDD5C5] bg-neutral-100 cursor-pointer"
                    >
                      <img
                        src={img}
                        alt={`Evidence ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-xs font-bold">
                        ക്ലിക്ക് ചെയ്യുക
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Authority Forwarding Card (If Present) */}
            {issue.authority_forwarding && (
              <div className="bg-amber-50/70 rounded-3xl border border-amber-200 p-5 sm:p-6 shadow-xs">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                    <Building2 className="w-5 h-5 text-amber-700" />
                    <span>{language === "ml" ? "ഔദ്യോഗിക കൈമാറ്റം (Authority Forwarding)" : "Forwarded to Authority"}</span>
                  </div>
                  <span className="font-mono text-xs font-bold bg-amber-200/70 text-amber-900 px-2.5 py-0.5 rounded-lg border border-amber-300">
                    റഫറൻസ്: {issue.authority_forwarding.reference_no}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-amber-950">
                  <p><strong className="text-amber-900">സ്ഥാപനം:</strong> {issue.authority_forwarding.authority_name}</p>
                  <p><strong className="text-amber-900">ഡിപ്പാർട്ട്മെന്റ്:</strong> {issue.authority_forwarding.department}</p>
                  <p><strong className="text-amber-900">കൈമാറിയ തീയതി:</strong> {new Date(issue.authority_forwarding.forwarded_at).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p>
                  {issue.authority_forwarding.notes && (
                    <p className="pt-2 text-amber-900/90 italic border-t border-amber-200/60">
                      &quot;{issue.authority_forwarding.notes}&quot;
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Resolution Evidence Card (If Resolved) */}
            {issue.resolution_evidence && (
              <div className="bg-emerald-50/80 rounded-3xl border border-emerald-200 p-5 sm:p-6 shadow-xs">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm mb-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                  <span>{language === "ml" ? "പരിഹാര സ്ഥിരീകരണം (Resolution Evidence)" : "Resolution Evidence"}</span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-950 mb-3 leading-relaxed">
                  {issue.resolution_evidence.resolution_notes}
                </p>
                <div className="text-[11px] text-emerald-800 mb-4 flex items-center gap-3">
                  <span>പരിഹരിച്ച തീയതി: {new Date(issue.resolution_evidence.resolved_at).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })}</span>
                  {issue.resolution_evidence.verified_by_moderator && (
                    <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                      ✓ മോഡറേറ്റർ പരിശോധിച്ചു
                    </span>
                  )}
                </div>

                {issue.resolution_evidence.resolution_images && issue.resolution_evidence.resolution_images.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-emerald-900 mb-2">പരിഹരിച്ച ശേഷമുള്ള ഫോട്ടോകൾ:</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {issue.resolution_evidence.resolution_images.map((img, idx) => (
                        <div
                          key={idx}
                          onClick={() => setActiveImagePreview(img)}
                          className="aspect-4/3 rounded-xl overflow-hidden border border-emerald-300 cursor-pointer group"
                        >
                          <img src={img} alt="Resolution" className="w-full h-full object-cover group-hover:scale-105 transition" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Moderator Notes Card */}
            {issue.moderator_notes && (
              <div className="bg-neutral-50 rounded-2xl border border-neutral-200 p-4 text-xs text-neutral-700">
                <span className="font-bold text-[#194B35] block mb-1">മോഡറേറ്റർ കുറിപ്പ് (Moderator Note):</span>
                <p>{issue.moderator_notes}</p>
              </div>
            )}

            {/* Community Discussion / Comments */}
            <div className="bg-white rounded-3xl border border-[#E8DCBF] p-5 sm:p-7 shadow-xs">
              <h3 className="text-base font-bold text-[#194B35] mb-4 flex items-center gap-2 font-serif">
                <MessageSquare className="w-4 h-4 text-[#8C5B0F]" />
                <span>{language === "ml" ? "കമ്മ്യൂണിറ്റി ചർച്ചയും പ്രതികരണങ്ങളും" : "Community Discussion"} ({issue.comments.length})</span>
              </h3>

              {/* Comment submission form */}
              <form onSubmit={handleCommentSubmit} className="mb-6 p-4 rounded-2xl bg-[#FAF7F0] border border-[#DDD5C5]">
                <div className="mb-2">
                  <input
                    type="text"
                    placeholder={language === "ml" ? "നിങ്ങളുടെ പേര്" : "Your name"}
                    value={commenterName}
                    onChange={(e) => setCommenterName(e.target.value)}
                    className="w-full sm:w-64 px-3 py-1.5 rounded-lg bg-white border border-[#DDD5C5] text-xs font-medium focus:outline-hidden focus:border-[#194B35]"
                  />
                </div>
                <div className="mb-2">
                  <textarea
                    rows={2}
                    placeholder={language === "ml" ? "ഈ വിഷയത്തെക്കുറിച്ച് അഭിപ്രായം രേഖപ്പെടുത്തുക..." : "Write a constructive comment or update..."}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD5C5] text-xs focus:outline-hidden focus:border-[#194B35]"
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-neutral-500">
                    മാന്യവും ക്രിയാത്മകവുമായ ഭാഷ ഉപയോഗിക്കുക.
                  </span>
                  <button
                    type="submit"
                    disabled={commentSubmitting || !commentText.trim()}
                    className="px-4 py-1.5 rounded-xl bg-[#194B35] text-white text-xs font-bold hover:bg-[#143E2C] transition disabled:opacity-50 inline-flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{language === "ml" ? "അയക്കുക" : "Post"}</span>
                  </button>
                </div>
              </form>

              {/* Comments List */}
              <div className="space-y-3">
                {issue.comments.length === 0 ? (
                  <p className="text-xs text-neutral-400 text-center py-4 italic">
                    {language === "ml" ? "ഇതുവരെ പ്രതികരണങ്ങളില്ല. ആദ്യത്തെ പ്രതികരണം നൽകുക." : "No comments yet. Be the first to share an update."}
                  </p>
                ) : (
                  issue.comments.map((comm) => (
                    <div
                      key={comm.id}
                      className={`p-3.5 rounded-2xl text-xs ${
                        comm.is_official
                          ? "bg-amber-50/70 border border-amber-200"
                          : "bg-neutral-50 border border-neutral-100"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#194B35]">{comm.author_name}</span>
                          {comm.is_official && (
                            <span className="text-[9px] font-bold bg-[#194B35] text-white px-2 py-0.2 rounded-full">
                              ഔദ്യോഗിക പ്രതികരണം
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-neutral-400">
                          {new Date(comm.date).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                        </span>
                      </div>
                      <p className="text-[#252A25] leading-relaxed">{comm.content}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

          {/* Right Sidebar: Timeline & Location Details */}
          <div className="space-y-6">

            {/* Status Timeline Card */}
            <div className="bg-white rounded-3xl border border-[#E8DCBF] p-5 sm:p-6 shadow-xs">
              <h3 className="text-sm font-bold text-[#194B35] mb-4 flex items-center gap-2 font-serif border-b border-neutral-100 pb-3">
                <Clock className="w-4 h-4 text-[#8C5B0F]" />
                <span>{language === "ml" ? "പ്രവർത്തന പുരോഗതി (Status Timeline)" : "Status Timeline"}</span>
              </h3>

              <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#DDD5C5]">
                {issue.timeline.map((event, idx) => {
                  const isLatest = idx === issue.timeline.length - 1;
                  return (
                    <div key={event.id} className="relative">
                      {/* Timeline Dot */}
                      <span
                        className={`absolute -left-6 top-1 w-3.5 h-3.5 rounded-full border-2 bg-white ${
                          isLatest ? "border-[#194B35] bg-[#194B35]" : "border-[#8C5B0F]"
                        }`}
                      />
                      <div>
                        <div className="flex items-center justify-between text-[11px] mb-0.5">
                          <span className="font-bold text-[#194B35]">{event.title}</span>
                          <span className="text-neutral-400 text-[10px]">
                            {new Date(event.date).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                          </span>
                        </div>
                        <p className="text-xs text-[#5C6A64] leading-relaxed">{event.description}</p>
                        <div className="text-[10px] text-neutral-400 mt-1">
                          കൈകാര്യം ചെയ്തത്: <span className="font-medium text-neutral-600">{event.actor}</span> ({event.actor_role})
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Location & Jurisdiction Card */}
            <div className="bg-white rounded-3xl border border-[#E8DCBF] p-5 sm:p-6 shadow-xs">
              <h3 className="text-sm font-bold text-[#194B35] mb-3 flex items-center gap-2 font-serif border-b border-neutral-100 pb-3">
                <MapPin className="w-4 h-4 text-[#8C5B0F]" />
                <span>{language === "ml" ? "സ്ഥല വിവരങ്ങൾ (Location Details)" : "Location & Jurisdiction"}</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-neutral-400 text-[10px] block">അധികാര പരിധി:</span>
                  <span className="font-bold text-[#194B35] inline-block bg-[#E0F1E7] text-[#194B35] px-2 py-0.5 rounded text-[11px] mt-0.5">
                    {issue.jurisdiction_type === "municipality" ? "താനൂർ നഗരസഭ (Tanur Municipality)" : "താനൂർ ബ്ലോക്ക് പഞ്ചായത്ത്"}
                  </span>
                </div>

                <div>
                  <span className="text-neutral-400 text-[10px] block">പ്രദേശം / വാർഡ്:</span>
                  <span className="font-semibold text-[#1A2420]">{issue.locality}</span>
                </div>

                <div>
                  <span className="text-neutral-400 text-[10px] block">അടയാളം / ലാന്റ്മാർക്ക്:</span>
                  <span className="font-semibold text-[#1A2420]">{issue.address_landmark}</span>
                </div>

                <div>
                  <span className="text-neutral-400 text-[10px] block">ഭൂമിശാസ്ത്ര കോർഡിനേറ്റുകൾ:</span>
                  <span className="font-mono text-[11px] text-neutral-600">
                    {issue.latitude.toFixed(4)}° N, {issue.longitude.toFixed(4)}° E
                  </span>
                </div>

                {/* Map Link */}
                <div className="pt-2">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${issue.latitude},${issue.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 rounded-xl bg-[#FAF7F0] border border-[#DDD5C5] text-[#194B35] text-xs font-bold hover:bg-neutral-100 transition inline-flex items-center justify-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#8C5B0F]" />
                    <span>ഗൂഗിൾ മാപ്പിൽ തുറക്കുക</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-[#FAF4E6] rounded-3xl border border-[#E8DCBF] p-5 text-center">
              <h4 className="text-xs font-bold text-[#194B35] mb-1">നിങ്ങളുടെ വാർഡിലും സമാന പ്രശ്നമുണ്ടോ?</h4>
              <p className="text-[11px] text-[#5C6A64] mb-3">
                ഓൺലൈനായി പരാതി നൽകി ട്രാക്കിംഗ് നമ്പർ സ്വന്തമാക്കുക.
              </p>
              <Link
                href="/civic/report"
                className="w-full py-2 px-4 rounded-xl bg-[#194B35] text-white text-xs font-bold hover:bg-[#143E2C] transition inline-flex items-center justify-center gap-2"
              >
                <span>പരാതി നൽകുക</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

        </div>
      </main>

      {/* Image Lightbox Modal */}
      {activeImagePreview && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setActiveImagePreview(null)}
        >
          <div className="relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setActiveImagePreview(null)}
              className="absolute -top-10 right-0 text-white hover:text-neutral-300 p-2"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={activeImagePreview}
              alt="Preview"
              className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* Inappropriate Content Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-xl border border-[#E8DCBF]">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2 text-rose-600 font-bold text-sm">
                <Flag className="w-4 h-4" />
                <span>റിപ്പോർട്ട് ചെയ്യുക (Report Issue)</span>
              </div>
              <button onClick={() => setShowReportModal(false)} className="text-neutral-400 hover:text-neutral-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {reportSent ? (
              <div className="py-6 text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                <h4 className="font-bold text-sm text-[#194B35]">റിപ്പോർട്ട് സമർപ്പിച്ചു</h4>
                <p className="text-xs text-neutral-500 mt-1">മോഡറേറ്റർമാർ ഈ ഉള്ളടക്കം ഉടൻ പരിശോധിക്കുന്നതാണ്.</p>
                <button
                  onClick={() => { setShowReportModal(false); setReportSent(false); }}
                  className="mt-4 px-4 py-2 bg-[#194B35] text-white text-xs font-bold rounded-xl"
                >
                  ശരി
                </button>
              </div>
            ) : (
              <div className="py-4 space-y-3">
                <p className="text-xs text-neutral-600">
                  ഈ പോസ്റ്റിൽ തെറ്റായ വിവരങ്ങളോ നിയമവിരുദ്ധമായ ഉള്ളടക്കമോ അടങ്ങിയിട്ടുണ്ടെങ്കിൽ കാരണം തിരഞ്ഞെടുക്കുക:
                </p>
                <div className="space-y-2 text-xs">
                  {[
                    { id: "misinformation", label: "തെറ്റായ വിവരങ്ങൾ (Misleading / False)" },
                    { id: "spam", label: "സ്പാം / പരസ്യം (Spam or Advertising)" },
                    { id: "offensive", label: "അപകീർത്തികരമായ ഭാഷ (Offensive Language)" },
                    { id: "duplicate", label: "ഇരട്ടിപ്പ് പരാതി (Duplicate Report)" },
                  ].map((opt) => (
                    <label key={opt.id} className="flex items-center gap-2 p-2 rounded-lg border border-neutral-100 hover:bg-[#FAF7F0] cursor-pointer">
                      <input
                        type="radio"
                        name="reportReason"
                        value={opt.id}
                        checked={reportReason === opt.id}
                        onChange={(e) => setReportReason(e.target.value)}
                        className="text-[#194B35]"
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
                <div className="pt-3 flex justify-end gap-2">
                  <button
                    onClick={() => setShowReportModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold border border-neutral-200 text-neutral-600 hover:bg-neutral-100"
                  >
                    റദ്ദാക്കുക
                  </button>
                  <button
                    onClick={() => setReportSent(true)}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 text-white hover:bg-rose-700"
                  >
                    സമർപ്പിക്കുക
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
      <BottomNav />
    </div>
  );
}
