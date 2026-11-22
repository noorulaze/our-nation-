"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { PeoplesVoiceNav } from "@/components/peoples-voice/PeoplesVoiceNav";
import { useLanguage } from "@/lib/i18n/context";
import { useAuth } from "@/lib/auth/context";
import { 
  peoplesVoiceStore, 
  PEOPLES_VOICE_IDEA_CATEGORIES 
} from "@/lib/data/peoplesVoiceData";
import { 
  CommunityIdea, 
  ReportReason 
} from "@/types/peoplesVoice";
import {
  Lightbulb,
  ThumbsUp,
  MessageSquare,
  Share2,
  Bell,
  BellOff,
  Flag,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  FileCheck2,
  HeartHandshake,
  ArrowLeft,
  Sparkles,
  AlertTriangle,
  X,
  Send,
  User,
  ShieldCheck,
  Building2,
  ExternalLink,
  ChevronRight
} from "lucide-react";

export default function IdeaDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { language } = useLanguage();
  const { user } = useAuth();

  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [idea, setIdea] = useState<CommunityIdea | null>(null);

  // Comments state
  const [newComment, setNewComment] = useState("");
  const [commentAuthor, setCommentAuthor] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  // Report modal state
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState<ReportReason>("inappropriate");
  const [reportDetails, setReportDetails] = useState("");
  const [reportSuccess, setReportSuccess] = useState(false);

  // Share feedback
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (id) {
      const found = peoplesVoiceStore.getIdeaById(id);
      setIdea(found);
    }
  }, [id]);

  if (!idea) {
    return (
      <div className="min-h-screen bg-[#FAF7F0] text-[#252A25] pb-24">
        <Navbar />
        <PeoplesVoiceNav />
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <Lightbulb className="w-12 h-12 text-[#C39A5B] mx-auto mb-3 opacity-50" />
          <h2 className="text-xl font-bold text-[#194B35] font-serif mb-2">
            {language === "ml" ? "ആശയം കണ്ടെത്തിയില്ല" : "Community Idea Not Found"}
          </h2>
          <p className="text-xs text-[#5C6A64] mb-6">
            {language === "ml"
              ? "നിങ്ങൾ തിരഞ്ഞ ആശയം നിലവിലില്ല അല്ലെങ്കിൽ നീക്കം ചെയ്യപ്പെട്ടിരിക്കാം."
              : "The requested idea could not be located or may have been archived."}
          </p>
          <Link
            href="/peoples-voice/ideas"
            className="px-5 py-2.5 rounded-xl bg-[#194B35] text-white font-bold text-xs"
          >
            {language === "ml" ? "എല്ലാ ആശയങ്ങളും കാണുക" : "Browse Ideas Register"}
          </Link>
        </div>
        <Footer />
        <BottomNav />
      </div>
    );
  }

  // Toggle Support
  const handleSupportToggle = () => {
    const userId = user?.id || "usr-anon-local";
    const res = peoplesVoiceStore.toggleIdeaSupport(idea.id, userId);
    if (res) {
      const updated = peoplesVoiceStore.getIdeaById(idea.id);
      if (updated) setIdea(updated);
    }
  };

  // Toggle Follow
  const handleFollowToggle = () => {
    const userId = user?.id || "usr-anon-local";
    peoplesVoiceStore.toggleIdeaFollow(idea.id, userId);
    const updated = peoplesVoiceStore.getIdeaById(idea.id);
    if (updated) setIdea(updated);
  };

  // Add Comment
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmittingComment(true);
    const authorName = commentAuthor.trim() || user?.display_name || user?.username || "Tanur Resident";
    
    peoplesVoiceStore.addIdeaComment(idea.id, {
      author_id: user?.id || "usr-" + Date.now(),
      author_name: authorName,
      content: newComment.trim(),
      is_official: user?.role === "admin" || user?.role === "moderator",
      official_role: user?.role === "admin" ? "Platform Administrator" : user?.role === "moderator" ? "Civic Moderator" : undefined
    });

    const updated = peoplesVoiceStore.getIdeaById(idea.id);
    if (updated) setIdea(updated);
    setNewComment("");
    setIsSubmittingComment(false);
  };

  // Report submit
  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportDetails.trim()) return;

    peoplesVoiceStore.reportContent({
      content_type: "idea",
      content_id: idea.id,
      content_title: idea.title,
      reporter_id: user?.id || "anon-reporter",
      reporter_name: user?.display_name || user?.username || "Concerned Resident",
      reason: reportReason,
      details: reportDetails.trim()
    });

    setReportSuccess(true);
    setTimeout(() => {
      setReportSuccess(false);
      setIsReportOpen(false);
      setReportDetails("");
    }, 2000);
  };

  // Share
  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "In Progress":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "Accepted for Collaboration":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "Forwarded for Consideration":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "Shortlisted":
        return "bg-indigo-100 text-indigo-800 border-indigo-300";
      case "Community Discussion":
        return "bg-cyan-100 text-cyan-800 border-cyan-300";
      case "Under Review":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "Not Proceeding":
        return "bg-gray-100 text-gray-700 border-gray-300";
      default:
        return "bg-stone-100 text-stone-800 border-stone-300";
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#252A25] pb-24">
      <Navbar />
      <PeoplesVoiceNav />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#5C6A64] mb-4">
          <Link href="/peoples-voice" className="hover:text-[#194B35]">
            {language === "ml" ? "ജനകീയ ശബ്ദം" : "People's Voice"}
          </Link>
          <span>/</span>
          <Link href="/peoples-voice/ideas" className="hover:text-[#194B35]">
            {language === "ml" ? "ആശയങ്ങൾ" : "Ideas"}
          </Link>
          <span>/</span>
          <span className="font-bold text-[#194B35] truncate max-w-xs">{idea.tracking_id}</span>
        </div>

        {/* Main Content & Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Idea Column */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Header Card */}
            <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-8 shadow-sm">
              
              {/* Category, Status & Tracking ID */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#EDE6D8] mb-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#194B35] text-white">
                    {idea.tracking_id}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#EDE6D8] text-[#194B35]">
                    {language === "ml" ? idea.category_name_ml : idea.category_name}
                  </span>
                </div>

                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(idea.status)}`}>
                  {idea.status}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#194B35] font-serif leading-tight mb-3">
                {language === "ml" && idea.title_ml ? idea.title_ml : idea.title}
              </h1>

              {/* Locality & Author Metadata */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-[#5C6A64] mb-6">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#C39A5B]" />
                  <span className="font-semibold text-[#252A25]">{idea.locality}</span>
                  {idea.ward_number ? <span>(Ward {idea.ward_number})</span> : null}
                </span>

                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-[#5C6A64]" />
                  <span>
                    {language === "ml" ? "സമർപ്പിച്ചത്: " : "By: "}
                    <strong className="text-[#252A25]">{idea.author_name}</strong>
                  </span>
                </span>

                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#5C6A64]" />
                  <span>{idea.created_at.split("T")[0]}</span>
                </span>
              </div>

              {/* Featured Image if present */}
              {idea.images && idea.images.length > 0 && (
                <div className="mb-6 rounded-2xl overflow-hidden bg-[#EDE6D8] max-h-80">
                  <img
                    src={idea.images[0]}
                    alt={idea.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Description Body */}
              <div className="mb-6">
                <h3 className="text-xs font-bold text-[#194B35] uppercase tracking-wider mb-2">
                  {language === "ml" ? "പദ്ധതിയുടെ പൂർണ്ണ വിവരണം" : "Detailed Description"}
                </h3>
                <p className="text-sm text-[#4A5550] leading-relaxed whitespace-pre-line font-sans">
                  {language === "ml" && idea.description_ml ? idea.description_ml : idea.description}
                </p>
              </div>

              {/* Expected Community Benefit */}
              <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] mb-6">
                <h4 className="text-xs font-bold text-[#194B35] flex items-center gap-1.5 mb-1.5">
                  <Sparkles className="w-4 h-4 text-[#C39A5B]" />
                  <span>{language === "ml" ? "നാടിന് ലഭിക്കുന്ന പ്രതീക്ഷിക്കുന്ന നേട്ടം" : "Expected Community Benefit"}</span>
                </h4>
                <p className="text-xs text-[#5C6A64] leading-relaxed">
                  {language === "ml" && idea.expected_benefit_ml ? idea.expected_benefit_ml : idea.expected_benefit}
                </p>
              </div>

              {/* Estimated Cost clearly marked as community estimate */}
              {idea.estimated_cost && (
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 mb-6 flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-amber-900 font-medium">
                        {language === "ml" ? "പ്രതീക്ഷിക്കുന്ന ചെലവ്:" : "Community Estimated Cost:"}
                      </span>
                      <span className="text-sm font-extrabold text-amber-950">{idea.estimated_cost}</span>
                    </div>
                    <p className="text-[11px] text-amber-800/90 mt-1">
                      {language === "ml"
                        ? "ശ്രദ്ധിക്കുക: ഇത് പൊതുജനങ്ങൾ നൽകിയ ഏകദേശ അനുമാനം മാത്രമാണ്. ഔദ്യോഗിക ടെൻഡറോ ഭരണാനുമതിയോ അല്ല."
                        : "Notice: This figure is an informal community-provided estimate and does not represent an approved budget or official quotation."}
                    </p>
                  </div>
                </div>
              )}

              {/* Official Forwarding Record Details if forwarded */}
              {idea.forwarded_record && (
                <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-950 mb-6">
                  <div className="flex items-center gap-2 font-bold text-sm text-blue-900 mb-2">
                    <FileCheck2 className="w-5 h-5 text-blue-700" />
                    <span>{language === "ml" ? "ഔദ്യോഗിക കൈമാറ്റ രേഖ (Forwarding Record)" : "Official Forwarding Record"}</span>
                  </div>
                  <div className="space-y-1 text-xs text-blue-900">
                    <p><strong>{language === "ml" ? "അധികൃതർ:" : "Authority:"}</strong> {idea.forwarded_record.authority_name}</p>
                    <p><strong>{language === "ml" ? "വകുപ്പ്:" : "Department:"}</strong> {idea.forwarded_record.department}</p>
                    <p><strong>{language === "ml" ? "റഫറൻസ് നമ്പർ:" : "Reference No:"}</strong> {idea.forwarded_record.reference_number}</p>
                    <p><strong>{language === "ml" ? "കൈമാറിയ തീയതി:" : "Forwarded Date:"}</strong> {idea.forwarded_record.forwarded_date}</p>
                    {idea.forwarded_record.official_contact_note && (
                      <p className="mt-2 text-[11px] bg-white/70 p-2 rounded-lg border border-blue-200 text-blue-800">
                        {idea.forwarded_record.official_contact_note}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Official Collaboration Record Details if accepted */}
              {idea.collaboration_record && (
                <div className="p-5 rounded-2xl bg-purple-50 border border-purple-200 text-xs text-purple-950 mb-6">
                  <div className="flex items-center gap-2 font-bold text-sm text-purple-900 mb-2">
                    <HeartHandshake className="w-5 h-5 text-purple-700" />
                    <span>{language === "ml" ? "സഹകരണ രേഖ (Collaboration Confirmed)" : "Confirmed Collaboration Record"}</span>
                  </div>
                  <div className="space-y-1 text-xs text-purple-900">
                    <p><strong>{language === "ml" ? "കൂട്ടായ്മ / സംഘടന:" : "Partner Organization:"}</strong> {idea.collaboration_record.organization_name}</p>
                    <p><strong>{language === "ml" ? "അംഗീകരിച്ച തീയതി:" : "Date Confirmed:"}</strong> {idea.collaboration_record.accepted_date}</p>
                    <p><strong>{language === "ml" ? "പങ്കാളിത്ത വ്യാപ്തി:" : "Scope:"}</strong> {idea.collaboration_record.collaboration_scope}</p>
                    {idea.collaboration_record.verification_note && (
                      <p className="mt-2 text-[11px] bg-white/70 p-2 rounded-lg border border-purple-200 text-purple-800">
                        {idea.collaboration_record.verification_note}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Status reason if 'Not Proceeding' */}
              {idea.status === "Not Proceeding" && idea.status_reason && (
                <div className="p-5 rounded-2xl bg-stone-100 border border-stone-300 text-xs text-stone-800 mb-6">
                  <div className="flex items-center gap-2 font-bold text-sm text-stone-900 mb-2">
                    <AlertTriangle className="w-5 h-5 text-stone-600" />
                    <span>{language === "ml" ? "തുടർനടപടിയില്ലാത്തതിന്റെ കാരണം" : "Decision Rationale"}</span>
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed">
                    {language === "ml" && idea.status_reason_ml ? idea.status_reason_ml : idea.status_reason}
                  </p>
                </div>
              )}

              {/* Actions Bar: Support, Share, Follow, Report */}
              <div className="pt-4 border-t border-[#EDE6D8] flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={handleSupportToggle}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition shadow-sm active:scale-95 ${
                    idea.supported_by_user
                      ? "bg-[#194B35] text-white"
                      : "bg-[#FAF7F0] text-[#194B35] border border-[#DDD3BF] hover:bg-[#EFE9DC]"
                  }`}
                >
                  <ThumbsUp className={`w-4 h-4 ${idea.supported_by_user ? "fill-white" : ""}`} />
                  <span>
                    {idea.supported_by_user
                      ? language === "ml"
                        ? "പിന്തുണച്ചു"
                        : "Supported"
                      : language === "ml"
                      ? "പിന്തുണയ്ക്കാം"
                      : "Support Idea"}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-black/10 text-[11px]">
                    {idea.support_count}
                  </span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleFollowToggle}
                    className="p-2.5 rounded-xl bg-[#FAF7F0] text-[#5C6A64] hover:text-[#194B35] border border-[#EDE6D8] transition text-xs font-semibold flex items-center gap-1.5"
                    title="Follow updates"
                  >
                    {idea.is_followed_by_user ? (
                      <>
                        <BellOff className="w-3.5 h-3.5 text-[#194B35]" />
                        <span className="hidden sm:inline">{language === "ml" ? "ഫോളോ ചെയ്യുന്നു" : "Following"}</span>
                      </>
                    ) : (
                      <>
                        <Bell className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">{language === "ml" ? "ഫോളോ ചെയ്യാം" : "Follow"}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleShare}
                    className="p-2.5 rounded-xl bg-[#FAF7F0] text-[#5C6A64] hover:text-[#194B35] border border-[#EDE6D8] transition text-xs font-semibold flex items-center gap-1.5"
                    title="Share idea link"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">
                      {copiedLink ? (language === "ml" ? "ലിങ്ക് പകർത്തി!" : "Copied!") : (language === "ml" ? "പങ്കുവെക്കാം" : "Share")}
                    </span>
                  </button>

                  <button
                    onClick={() => setIsReportOpen(true)}
                    className="p-2.5 rounded-xl bg-[#FAF7F0] text-red-600 hover:bg-red-50 border border-red-200 transition text-xs font-semibold flex items-center gap-1.5"
                    title="Report inappropriate content"
                  >
                    <Flag className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{language === "ml" ? "റിപ്പോർട്ട്" : "Report"}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Comments & Discussion Section */}
            <div id="comments" className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-[#EDE6D8] mb-6">
                <h3 className="font-bold text-lg text-[#194B35] font-serif flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#C39A5B]" />
                  <span>
                    {language === "ml" ? "പൊതു അഭിപ്രായങ്ങൾ & ചർച്ച" : "Community Comments"}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#EDE6D8] text-xs font-bold text-[#194B35]">
                    {idea.comments.length}
                  </span>
                </h3>
              </div>

              {/* Add Comment Form */}
              <form onSubmit={handleCommentSubmit} className="mb-8 p-4 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] space-y-3">
                <div>
                  <label className="block text-xs font-bold text-[#194B35] mb-1">
                    {language === "ml" ? "നിങ്ങളുടെ പേര് (ഓപ്ഷണൽ)" : "Your Name (Optional)"}
                  </label>
                  <input
                    type="text"
                    value={commentAuthor}
                    onChange={(e) => setCommentAuthor(e.target.value)}
                    placeholder={user?.display_name || user?.username || (language === "ml" ? "താനൂർ നിവാസി" : "Tanur Resident")}
                    className="w-full sm:w-72 px-3 py-2 rounded-xl bg-white border border-[#DDD3BF] text-xs text-[#252A25] focus:outline-none focus:ring-2 focus:ring-[#194B35]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#194B35] mb-1">
                    {language === "ml" ? "നിങ്ങളുടെ അഭിപ്രായം പങ്കുവെക്കാം *" : "Share your feedback / opinion *"}
                  </label>
                  <textarea
                    rows={3}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder={
                      language === "ml"
                        ? "ഈ ആശയത്തെക്കുറിച്ചുള്ള ക്രിയാത്മകമായ നിർദ്ദേശങ്ങൾ എഴുതുക..."
                        : "Provide constructive feedback, suggestions, or community input..."
                    }
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#DDD3BF] text-xs text-[#252A25] focus:outline-none focus:ring-2 focus:ring-[#194B35]"
                    required
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <p className="text-[11px] text-[#8C9A94]">
                    {language === "ml" ? "മര്യാദയുള്ള സംവാദം പാലിക്കുക" : "Keep discussions respectful and constructive"}
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmittingComment}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#194B35] text-white text-xs font-bold hover:bg-[#143E2C] transition shadow disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{language === "ml" ? "അഭിപ്രായം രേഖപ്പെടുത്താം" : "Post Comment"}</span>
                  </button>
                </div>
              </form>

              {/* Comments list */}
              {idea.comments.length === 0 ? (
                <div className="py-8 text-center text-xs text-[#8C9A94]">
                  {language === "ml"
                    ? "ഇതുവരെ അഭിപ്രായങ്ങൾ രേഖപ്പെടുത്തിയിട്ടില്ല. ആദ്യ അഭിപ്രായം നിങ്ങളുടേതാവട്ടെ!"
                    : "No comments posted yet. Be the first to share your thoughts!"}
                </div>
              ) : (
                <div className="space-y-3">
                  {idea.comments.map((comm) => (
                    <div
                      key={comm.id}
                      className={`p-4 rounded-2xl border text-xs ${
                        comm.is_official
                          ? "bg-emerald-50/70 border-emerald-200"
                          : "bg-[#FAF7F0] border-[#EDE6D8]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#194B35]">{comm.author_name}</span>
                          {comm.is_official && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#194B35] text-white flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3" />
                              <span>{comm.official_role || "Official"}</span>
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-[#8C9A94]">
                          {comm.created_at.split("T")[0]}
                        </span>
                      </div>
                      <p className="text-[#4A5550] leading-relaxed whitespace-pre-line font-sans">
                        {comm.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar: Timeline & Info */}
          <div className="space-y-6">
            
            {/* Timeline Progress Card */}
            <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 shadow-sm">
              <h3 className="font-bold text-base text-[#194B35] font-serif mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C39A5B]" />
                <span>{language === "ml" ? "നടപടിക്രമ നാൾവഴി" : "Progress Timeline"}</span>
              </h3>

              <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#EDE6D8]">
                {idea.timeline.map((event, idx) => (
                  <div key={event.id || idx} className="relative">
                    <span className="absolute -left-6 top-1 w-4 h-4 rounded-full border-2 border-white bg-[#194B35] shadow" />
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-[#5C6A64] mb-0.5">
                        <span className="font-bold text-[#194B35]">
                          {language === "ml" && event.title_ml ? event.title_ml : event.title}
                        </span>
                        <span className="text-[10px]">{event.date}</span>
                      </div>
                      <p className="text-xs text-[#5C6A64] leading-relaxed mb-1">
                        {event.description}
                      </p>
                      <span className="text-[10px] text-[#8C9A94] italic">
                        {event.actor} ({event.actor_role})
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Participation Trust Card */}
            <div className="bg-gradient-to-br from-[#FAF4E6] to-[#EDE6D8] rounded-3xl border border-[#DDD3BF] p-6 text-xs text-[#5C6A64]">
              <h4 className="font-bold text-sm text-[#194B35] font-serif mb-2 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#C39A5B]" />
                <span>{language === "ml" ? "ജനകീയ പങ്കാളിത്ത തത്വം" : "Participation Principles"}</span>
              </h4>
              <p className="leading-relaxed mb-3">
                {language === "ml"
                  ? "ഒരു അക്കൗണ്ടിൽ നിന്ന് ഒരൊറ്റ പിന്തുണ മാത്രമേ അനുവദിക്കൂ. ലഭിക്കുന്ന പിന്തുണകൾ നാടിന്റെ പൊതുവായ ആവശ്യങ്ങൾ കൃത്യമായി വ്യക്തമാക്കാൻ സഹായിക്കുന്നു."
                  : "Only one verified support is recorded per resident. High-interest ideas are prioritized for community action and local representation."}
              </p>
              <div className="pt-2 border-t border-[#DDD3BF] flex items-center justify-between text-[11px] text-[#194B35] font-bold">
                <span>{language === "ml" ? "താനൂർ നഗരസഭ" : "Tanur Municipality"}</span>
                <span>45 Wards</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Report Inappropriate Content Modal */}
      {isReportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#EDE6D8]">
            <div className="flex items-center justify-between pb-3 border-b border-[#EDE6D8] mb-4">
              <h3 className="font-bold text-base text-[#194B35] flex items-center gap-2">
                <Flag className="w-4 h-4 text-red-600" />
                <span>{language === "ml" ? "ഉള്ളടക്കം റിപ്പോർട്ട് ചെയ്യാം" : "Report Content"}</span>
              </h3>
              <button
                onClick={() => setIsReportOpen(false)}
                className="p-1 rounded-full hover:bg-stone-100 text-stone-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {reportSuccess ? (
              <div className="p-6 text-center text-xs text-emerald-800">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                <p className="font-bold text-sm mb-1">
                  {language === "ml" ? "റിപ്പോർട്ട് സമർപ്പിച്ചു" : "Report Submitted Successfully"}
                </p>
                <p>{language === "ml" ? "മോഡറേറ്റർമാർ പരിശോധിച്ച് ഉചിതമായ നടപടി സ്വീകരിക്കും." : "Our moderation team will review this content promptly."}</p>
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#194B35] mb-1">
                    {language === "ml" ? "കാരണം *" : "Reason for Reporting *"}
                  </label>
                  <select
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value as ReportReason)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#FAF7F0] border border-[#DDD3BF] text-xs font-semibold text-[#194B35] focus:outline-none focus:ring-2 focus:ring-[#194B35]"
                  >
                    <option value="spam">{language === "ml" ? "സ്പാം / പരസ്യം (Spam)" : "Spam / Commercial Ads"}</option>
                    <option value="offensive">{language === "ml" ? "അപകീർത്തികരം / അധിക്ഷേപകരം (Offensive)" : "Offensive or Abusive"}</option>
                    <option value="misleading">{language === "ml" ? "തെറ്റിദ്ധരിപ്പിക്കുന്ന വിവരങ്ങൾ (Misleading)" : "False or Misleading Info"}</option>
                    <option value="inappropriate">{language === "ml" ? "അനുചിതമായ ഉള്ളടക്കം (Inappropriate)" : "Inappropriate for Community"}</option>
                    <option value="other">{language === "ml" ? "മറ്റ് കാരണങ്ങൾ (Other)" : "Other Reason"}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#194B35] mb-1">
                    {language === "ml" ? "വിശദാംശങ്ങൾ *" : "Additional Details *"}
                  </label>
                  <textarea
                    rows={3}
                    value={reportDetails}
                    onChange={(e) => setReportDetails(e.target.value)}
                    placeholder={language === "ml" ? "എന്തുകൊണ്ടാണ് ഈ ഉള്ളടക്കം റിപ്പോർട്ട് ചെയ്യുന്നത് എന്ന് വ്യക്തമാക്കുക..." : "Please describe what is concerning about this content..."}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F0] border border-[#DDD3BF] text-xs text-[#252A25] focus:outline-none focus:ring-2 focus:ring-[#194B35]"
                    required
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsReportOpen(false)}
                    className="px-4 py-2 rounded-xl bg-[#EDE6D8] text-[#194B35] text-xs font-bold"
                  >
                    {language === "ml" ? "റദ്ദാക്കുക" : "Cancel"}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition"
                  >
                    {language === "ml" ? "റിപ്പോർട്ട് നൽകാം" : "Submit Report"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer />
      <BottomNav />
    </div>
  );
}
