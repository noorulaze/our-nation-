"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { CivicNav } from "@/components/civic/CivicNav";
import { useAuth } from "@/lib/auth/context";
import { 
  civicStore, 
  CIVIC_CATEGORIES, 
  CivicIssue,
  CivicComment,
  getCategoryById,
  getTanurWardName
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
  X,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  Phone,
  Mail,
  Lock,
  FileCheck,
  CheckCheck
} from "lucide-react";

export default function CivicIssueDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, role } = useAuth();
  const issueId = params?.id as string;

  const [issue, setIssue] = useState<CivicIssue | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [activeImagePreview, setActiveImagePreview] = useState<string | null>(null);

  // Comment input state
  const [commentText, setCommentText] = useState("");
  const [commentSubmitting, setCommentSubmitting] = useState(false);

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
          <p className="text-xs font-bold">Loading complaint tracking record...</p>
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
            Complaint Not Found
          </h2>
          <p className="text-xs sm:text-sm text-[#5C6A64] mb-6">
            The requested civic issue tracking record could not be found or may have been archived.
          </p>
          <Link
            href="/civic-connect"
            className="px-5 py-2.5 rounded-xl bg-[#194B35] text-white text-xs font-bold hover:bg-[#143E2C] transition inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Civic Connect</span>
          </Link>
        </div>
        <Footer />
        <BottomNav />
      </div>
    );
  }

  const category = getCategoryById(issue.category_id);
  const isOwner = user && (issue.reporter_id === user.id || (user.email && issue.reporter_contact === user.email));
  const isAdmin = role === "admin" || role === "super_admin" || role === "moderator";

  const handleCopyTrackingId = () => {
    navigator.clipboard.writeText(issue.tracking_id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: issue.title,
        text: `OUR NATION Civic Report: ${issue.title} (${issue.tracking_id})`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
      user?.display_name || user?.email || "Tanur Resident",
      user?.id || "anon-" + Date.now(),
      commentText.trim(),
      isAdmin
    );

    const updated = civicStore.getIssueById(issue.id);
    if (updated) setIssue({ ...updated });
    setCommentText("");
    setCommentSubmitting(false);
  };

  // 8 Statutory Processing Stages definition
  const STAGES = [
    { key: "submitted", label: "1. Submitted", icon: Clock },
    { key: "under_review", label: "2. Under Review", icon: Clock },
    { key: "verified", label: "3. Verified", icon: ShieldCheck },
    { key: "assigned", label: "4. Assigned", icon: Send },
    { key: "in_progress", label: "5. In Progress", icon: Building2 },
    { key: "resolved", label: "6. Resolved", icon: CheckCircle2 },
    { key: "closed", label: "7. Closed", icon: CheckCheck },
  ];

  // Helper to determine status progress index
  const getStageIndex = (st: string) => {
    if (st === "submitted") return 0;
    if (st === "under_review" || st === "reopened") return 1;
    if (st === "verified") return 2;
    if (st === "assigned" || st === "forwarded") return 3;
    if (st === "in_progress") return 4;
    if (st === "resolved") return 5;
    if (st === "closed") return 6;
    if (st === "rejected") return -1;
    return 0;
  };

  const currentStageIdx = getStageIndex(issue.status);

  // Status visual badge styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "resolved":
        return { label: "Resolved", bg: "bg-emerald-100 text-emerald-800 border-emerald-300", icon: CheckCircle2 };
      case "closed":
        return { label: "Closed & Confirmed", bg: "bg-teal-100 text-teal-800 border-teal-300", icon: CheckCheck };
      case "in_progress":
        return { label: "Field Work in Progress", bg: "bg-blue-100 text-blue-800 border-blue-300", icon: Building2 };
      case "assigned":
      case "forwarded":
        return { label: "Assigned to Department", bg: "bg-amber-100 text-amber-800 border-amber-300", icon: Send };
      case "verified":
        return { label: "Verified by Moderator", bg: "bg-purple-100 text-purple-800 border-purple-300", icon: ShieldCheck };
      case "under_review":
        return { label: "Under Official Review", bg: "bg-sky-100 text-sky-800 border-sky-300", icon: Clock };
      case "rejected":
        return { label: "Complaint Rejected", bg: "bg-rose-100 text-rose-800 border-rose-300", icon: AlertTriangle };
      default:
        return { label: "Report Submitted", bg: "bg-neutral-100 text-neutral-800 border-neutral-300", icon: Clock };
    }
  };

  const statusBadge = getStatusBadge(issue.status);
  const StatusIcon = statusBadge.icon;

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] pb-24">
      <Navbar />
      <CivicNav />

      {/* Top Header / Breadcrumbs Bar */}
      <div className="bg-white border-b border-[#EDE6D8] py-3.5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link
            href="/civic-connect"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#194B35] hover:text-[#C39A5B] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Civic Connect</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="px-3 py-1.5 rounded-lg border border-[#EDE6D8] text-xs font-medium text-[#194B35] hover:bg-[#FAF7F0] flex items-center gap-1.5 transition"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
            <button
              type="button"
              onClick={handleFollowToggle}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                issue.followed_by_user
                  ? "bg-[#194B35] text-white"
                  : "bg-white border border-[#EDE6D8] text-[#194B35] hover:bg-[#FAF7F0]"
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>{issue.followed_by_user ? "Following" : "Follow Updates"}</span>
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* ============================================================== */}
        {/* 1. TOP HEADER & REFERENCE ID BANNER */}
        {/* ============================================================== */}
        <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-8 space-y-5 shadow-2xs">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold border inline-flex items-center gap-1.5 ${statusBadge.bg}`}>
                <StatusIcon className="w-3.5 h-3.5" />
                <span>{statusBadge.label}</span>
              </span>

              {category && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FAF7F0] text-[#194B35] border border-[#EDE6D8]">
                  {category.name}
                </span>
              )}

              <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-neutral-100 text-[#5C6A64]">
                Priority: {issue.priority.toUpperCase()}
              </span>
            </div>

            {/* Tracking Reference ID Pill */}
            <div className="flex items-center gap-2 bg-[#FAF7F0] px-3.5 py-1.5 rounded-xl border border-[#DDD5C5]">
              <span className="text-[10px] uppercase font-bold text-[#7A8880]">Reference ID:</span>
              <span className="text-xs font-extrabold font-mono text-[#194B35]">{issue.tracking_id}</span>
              <button
                type="button"
                onClick={handleCopyTrackingId}
                className="text-[#194B35] hover:text-[#C39A5B] transition p-1"
                title="Copy reference code"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Title & Subcategory */}
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#194B35] leading-snug">
              {issue.title}
            </h1>
            <p className="text-xs text-[#7A8880]">
              Subcategory: <strong>{issue.subcategory}</strong> • Reported on {new Date(issue.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>

          {/* ============================================================ */}
          {/* 2. CHRONOLOGICAL 8-STAGE PROGRESS STEPPER */}
          {/* ============================================================ */}
          {issue.status === "rejected" ? (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-xs">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>8. Complaint Rejected by Municipal Administration</span>
              </div>
              <p className="text-xs text-rose-800 leading-relaxed">
                <strong>Reason:</strong> {issue.rejection_reason || "This submission does not fall under municipal public works jurisdiction or lacks actionable field location data."}
              </p>
            </div>
          ) : (
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-[#194B35]">
                <span>Statutory Processing Stage</span>
                <span className="text-[11px] font-normal text-[#5C6A64]">
                  {currentStageIdx + 1} of 7 Standard Milestones
                </span>
              </div>

              {/* Responsive Progress Stepper */}
              <div className="grid grid-cols-2 sm:grid-cols-7 gap-2">
                {STAGES.map((st, idx) => {
                  const isPassed = currentStageIdx >= idx;
                  const isCurrent = currentStageIdx === idx;
                  return (
                    <div
                      key={st.key}
                      className={`p-2 rounded-xl text-center flex flex-col items-center gap-1 transition ${
                        isCurrent
                          ? "bg-white border-2 border-[#194B35] shadow-2xs"
                          : isPassed
                          ? "bg-emerald-50/80 border border-emerald-200"
                          : "bg-white/50 border border-neutral-200/80 opacity-60"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          isPassed
                            ? "bg-[#194B35] text-white"
                            : "bg-neutral-200 text-[#7A8880]"
                        }`}
                      >
                        {isPassed && idx < currentStageIdx ? (
                          <Check className="w-3.5 h-3.5" />
                        ) : (
                          idx + 1
                        )}
                      </div>
                      <span className={`text-[10px] leading-tight font-medium ${
                        isCurrent ? "font-bold text-[#194B35]" : isPassed ? "text-emerald-900" : "text-[#7A8880]"
                      }`}>
                        {st.label.replace(/^\d+\.\s*/, '')}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Issue Description */}
          <div className="space-y-2 pt-2">
            <h3 className="text-xs font-bold text-[#194B35] uppercase tracking-wider">
              Issue Description
            </h3>
            <p className="text-xs sm:text-sm text-[#33413B] leading-relaxed whitespace-pre-line bg-[#FAF7F0] p-4 rounded-2xl border border-[#EDE6D8]">
              {issue.description}
            </p>
          </div>

          {/* Location & Ward Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] space-y-1 text-xs">
              <span className="text-[10px] font-bold text-[#7A8880] uppercase tracking-wider block">
                Municipal Ward
              </span>
              <p className="font-bold text-[#194B35] text-sm">
                Ward {issue.ward_number || 12}: {issue.ward_name || (issue.ward_number ? getTanurWardName(issue.ward_number) : "Tanur Ward")}
              </p>
              <p className="text-[#5C6A64]">
                Local Body: <strong>Tanur Municipality</strong> (Grade II ULB, 45 Wards)
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] space-y-1 text-xs">
              <span className="text-[10px] font-bold text-[#7A8880] uppercase tracking-wider block">
                Street & Landmark Address
              </span>
              <p className="font-semibold text-[#1A2420] text-sm flex items-start gap-1.5">
                <MapPin className="w-4 h-4 text-[#C39A5B] shrink-0 mt-0.5" />
                <span>{issue.address_landmark}</span>
              </p>
              <p className="text-[#5C6A64]">
                Coordinates: {issue.latitude?.toFixed(4)}° N, {issue.longitude?.toFixed(4)}° E
              </p>
            </div>
          </div>

          {/* Reporter & Contact Preference (Privacy Protected) */}
          <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#194B35]/10 text-[#194B35] flex items-center justify-center font-bold">
                <User className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-[#7A8880] block">Reported By</span>
                <span className="font-bold text-[#194B35]">
                  {issue.is_anonymous ? "Anonymous Resident" : issue.reporter_name}
                </span>
              </div>
            </div>

            {/* Contact preference info */}
            <div className="text-right sm:text-right text-[11px] text-[#5C6A64]">
              {isOwner || isAdmin ? (
                <span>
                  Follow-up preference: <strong className="text-[#194B35]">{issue.contact_preference || "In-App Updates"}</strong>
                  {issue.reporter_contact && ` • (${issue.reporter_contact})`}
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[#7A8880]">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Citizen contact information masked for privacy</span>
                </span>
              )}
            </div>
          </div>

          {/* Photo Evidence Gallery */}
          {issue.images && issue.images.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-[#EDE6D8]">
              <h3 className="text-xs font-bold text-[#194B35] uppercase tracking-wider flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-[#C39A5B]" />
                <span>Citizen Photo Evidence ({issue.images.length})</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {issue.images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImagePreview(img)}
                    className="relative rounded-2xl overflow-hidden border border-[#EDE6D8] aspect-4/3 group cursor-zoom-in"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt={`Evidence photo ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-xs font-bold">
                      Click to Enlarge
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Community Support Counter */}
          <div className="pt-2 border-t border-[#EDE6D8] flex items-center justify-between">
            <button
              type="button"
              onClick={handleSupportToggle}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
                issue.supported_by_user
                  ? "bg-[#194B35] text-white"
                  : "bg-[#FAF7F0] border border-[#DDD5C5] text-[#194B35] hover:bg-[#F5F1E7]"
              }`}
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>{issue.support_count} Citizens Endorsed This Issue</span>
            </button>

            <span className="text-[11px] text-[#7A8880]">
              Higher endorsements increase municipal inspection priority.
            </span>
          </div>

        </div>

        {/* ============================================================== */}
        {/* 3. OFFICIAL ASSIGNMENT & RESOLUTION EVIDENCE BOXES */}
        {/* ============================================================== */}
        {(issue.assigned_to || issue.authority_forwarding) && (
          <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 space-y-3 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold text-[#194B35]">
              <Building2 className="w-4 h-4 text-[#C39A5B]" />
              <span>Official Department Assignment</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#7A8880] block">Assigned Wing</span>
                <span className="font-bold text-[#194B35]">
                  {issue.assigned_to?.department || issue.authority_forwarding?.department}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#7A8880] block">Inspection Officer</span>
                <span className="font-semibold text-[#1A2420]">
                  {issue.assigned_to?.staff_name || "Field Assistant Engineer"}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#7A8880] block">Assignment Reference</span>
                <span className="font-mono text-xs text-[#8C5B0F]">
                  {issue.assigned_to?.reference_no || issue.authority_forwarding?.reference_no || "TNR-MUN-2026-ENG"}
                </span>
              </div>
            </div>
            {(issue.assigned_to?.notes || issue.authority_forwarding?.notes) && (
              <p className="text-xs text-[#5C6A64] italic">
                &quot;{issue.assigned_to?.notes || issue.authority_forwarding?.notes}&quot;
              </p>
            )}
          </div>
        )}

        {/* Resolution Evidence Box (when resolved or closed) */}
        {issue.resolution_evidence && (
          <div className="bg-emerald-50/70 rounded-3xl border border-emerald-200 p-6 space-y-4 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
              <CheckCircle2 className="w-5 h-5 text-emerald-700" />
              <span>Official Resolution Proof & Field Evidence</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-emerald-200 space-y-3 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-emerald-800 block">
                  Field Resolution Report
                </span>
                <p className="text-xs text-[#1A2420] leading-relaxed font-medium">
                  {issue.resolution_evidence.resolution_notes}
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#5C6A64] pt-2 border-t border-emerald-100">
                <span>
                  Resolved Date: <strong>{new Date(issue.resolution_evidence.resolved_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</strong>
                </span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified by Municipal Moderator</span>
                </span>
              </div>
            </div>

            {/* Resolution Images */}
            {issue.resolution_evidence.resolution_images && issue.resolution_evidence.resolution_images.length > 0 && (
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold text-emerald-900 block">
                  Resolution Photographs:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {issue.resolution_evidence.resolution_images.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveImagePreview(img)}
                      className="rounded-2xl overflow-hidden border border-emerald-300 aspect-4/3 cursor-zoom-in"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img} alt={`Resolution proof ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* 4. CHRONOLOGICAL AUDIT TIMELINE */}
        {/* ============================================================== */}
        <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-8 space-y-6 shadow-2xs">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#194B35] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#C39A5B]" />
              <span>Chronological Audit Timeline</span>
            </h3>
            <span className="text-xs text-[#7A8880]">
              {issue.timeline.length} Recorded Milestone Events
            </span>
          </div>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#DDD5C5]">
            {issue.timeline.map((event, idx) => {
              const isLast = idx === issue.timeline.length - 1;
              return (
                <div key={event.id || idx} className="relative text-xs space-y-1">
                  <div className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center ${
                    isLast ? "bg-[#194B35] text-white ring-4 ring-[#194B35]/20" : "bg-[#DDD5C5] text-white"
                  }`}>
                    <Check className="w-3 h-3" />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="font-bold text-[#194B35] text-sm">
                      {event.title}
                    </span>
                    <span className="text-[11px] text-[#7A8880]">
                      {new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <p className="text-[#33413B] leading-relaxed">
                    {event.description}
                  </p>
                  <p className="text-[10px] text-[#7A8880]">
                    Action by: <strong>{event.actor}</strong> ({event.actor_role})
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================================== */}
        {/* 5. COMMUNITY COMMENTS & OFFICIAL UPDATES */}
        {/* ============================================================== */}
        <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-8 space-y-6 shadow-2xs">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#194B35] flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#C39A5B]" />
              <span>Public Comments & Official Remarks ({issue.comments.length})</span>
            </h3>
          </div>

          {/* Comment list */}
          <div className="space-y-3">
            {issue.comments.map((comm) => (
              <div 
                key={comm.id} 
                className={`p-4 rounded-2xl border text-xs space-y-1.5 ${
                  comm.is_official 
                    ? "bg-[#E0F1E7]/50 border-emerald-300" 
                    : "bg-[#FAF7F0] border-[#EDE6D8]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#194B35]">{comm.author_name}</span>
                    {comm.is_official && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#194B35] text-white">
                        Official Desk
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-[#7A8880]">
                    {new Date(comm.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </span>
                </div>
                <p className="text-[#33413B] leading-relaxed">{comm.content}</p>
              </div>
            ))}

            {issue.comments.length === 0 && (
              <p className="text-xs text-[#7A8880] italic text-center py-4">
                No remarks posted yet. Have additional information regarding this spot? Add a remark below.
              </p>
            )}
          </div>

          {/* Add Remark Form */}
          <form onSubmit={handleCommentSubmit} className="space-y-3 pt-2 border-t border-[#EDE6D8]">
            <label className="text-xs font-bold text-[#194B35] block">
              Add a Remark or Update
            </label>
            <textarea
              rows={3}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Provide constructive field updates (e.g. temporary gravel has been placed, water is receding...)"
              className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F0] border border-[#DDD5C5] text-xs text-[#1A2420] focus:outline-hidden focus:border-[#194B35]"
            />
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#7A8880]">
                Posting as: <strong>{user?.display_name || user?.email || "Tanur Resident"}</strong>
              </span>
              <button
                type="submit"
                disabled={commentSubmitting || !commentText.trim()}
                className="px-5 py-2 rounded-xl bg-[#194B35] text-white text-xs font-bold hover:bg-[#143E2C] transition disabled:opacity-50 flex items-center gap-1.5 shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post Remark</span>
              </button>
            </div>
          </form>
        </div>

        {/* ============================================================== */}
        {/* STATUTORY DISCLAIMER */}
        {/* ============================================================== */}
        <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#DDD5C5] text-center text-xs text-[#5C6A64] space-y-1">
          <p className="font-bold text-[#194B35]">
            Statutory Transparency Disclaimer
          </p>
          <p className="text-[11px] leading-relaxed max-w-2xl mx-auto">
            OUR NATION is an independent civic portal designed for community reporting and municipal liaison. It is not an official government portal. For urgent emergency response, contact the Tanur Municipal Switchboard at <strong>0494 2440228</strong> or Police Helpline at <strong>112</strong>.
          </p>
        </div>

      </main>

      {/* Image Preview Modal */}
      {activeImagePreview && (
        <div 
          onClick={() => setActiveImagePreview(null)}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in"
        >
          <div className="relative max-w-3xl max-h-[90vh] overflow-hidden rounded-2xl">
            <button
              type="button"
              onClick={() => setActiveImagePreview(null)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-rose-600 transition"
            >
              <X className="w-4 h-4" />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={activeImagePreview} alt="Enlarged evidence" className="max-w-full max-h-[85vh] object-contain rounded-2xl" />
          </div>
        </div>
      )}

      <Footer />
      <BottomNav />
    </div>
  );
}
