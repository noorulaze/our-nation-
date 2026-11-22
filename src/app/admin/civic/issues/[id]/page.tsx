"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { AdminCivicNav } from "@/components/civic/AdminCivicNav";
import { useAuth } from "@/lib/auth/context";
import { 
  civicStore, 
  CIVIC_CATEGORIES, 
  CIVIC_AUTHORITIES, 
  CivicIssue,
  CivicStatus,
  getCategoryById,
  getTanurWardName
} from "@/lib/data/civicConnectData";
import { 
  ArrowLeft, 
  ShieldCheck, 
  Building2, 
  Send, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  MapPin, 
  Camera, 
  ExternalLink, 
  Save, 
  Check, 
  User, 
  FileText,
  Calendar,
  CheckCheck,
  X,
  Phone,
  Mail,
  Lock
} from "lucide-react";

export default function AdminCivicIssueDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, role } = useAuth();
  const issueId = params?.id as string;

  const [issue, setIssue] = useState<CivicIssue | null>(null);
  const [loading, setLoading] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [activeImagePreview, setActiveImagePreview] = useState<string | null>(null);

  // Status form fields (8 statuses)
  const [selectedStatus, setSelectedStatus] = useState<CivicStatus>("under_review");
  const [moderatorNote, setModeratorNote] = useState("");

  // Department assignment fields
  const [selectedDepartment, setSelectedDepartment] = useState("Municipal Engineering Wing");
  const [assignedStaff, setAssignedStaff] = useState("Assistant Engineer Desk");
  const [assignmentRefNo, setAssignmentRefNo] = useState("TNR-PW-2026-9812");
  const [assignmentNotes, setAssignmentNotes] = useState("");

  // Rejection fields
  const [rejectionReason, setRejectionReason] = useState("");

  // Resolution evidence fields
  const [resolutionNotes, setResolutionNotes] = useState("");
  const [resolutionImage, setResolutionImage] = useState("");
  const [isResolutionVerified, setIsResolutionVerified] = useState(true);

  useEffect(() => {
    if (issueId) {
      const found = civicStore.getIssueById(issueId);
      if (found) {
        setIssue({ ...found });
        setSelectedStatus(found.status);
        setModeratorNote(found.moderator_notes || "");
        if (found.assigned_to) {
          setSelectedDepartment(found.assigned_to.department);
          setAssignedStaff(found.assigned_to.staff_name || "Assistant Engineer Desk");
          setAssignmentRefNo(found.assigned_to.reference_no || `TNR-MUN-2026-${Math.floor(1000 + Math.random() * 9000)}`);
          setAssignmentNotes(found.assigned_to.notes || "");
        } else if (found.authority_forwarding) {
          setSelectedDepartment(found.authority_forwarding.department);
          setAssignmentRefNo(found.authority_forwarding.reference_no);
          setAssignmentNotes(found.authority_forwarding.notes || "");
        }
        if (found.rejection_reason) {
          setRejectionReason(found.rejection_reason);
        }
        if (found.resolution_evidence) {
          setResolutionNotes(found.resolution_evidence.resolution_notes);
          setIsResolutionVerified(found.resolution_evidence.verified_by_moderator);
          if (found.resolution_evidence.resolution_images.length > 0) {
            setResolutionImage(found.resolution_evidence.resolution_images[0]);
          }
        }
      }
      setLoading(false);
    }
  }, [issueId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F0] flex items-center justify-center p-8 text-[#194B35]">
        <div className="text-center">
          <div className="w-10 h-10 border-3 border-[#194B35] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-bold">Loading municipal desk record...</p>
        </div>
      </div>
    );
  }

  if (!issue) {
    return (
      <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420]">
        <Navbar />
        <AdminCivicNav />
        <div className="max-w-xl mx-auto px-4 py-20 text-center">
          <h2 className="text-xl font-bold text-[#194B35] mb-2 font-serif">Complaint Record Not Found</h2>
          <Link href="/admin/civic/issues" className="text-xs font-bold text-[#194B35] underline">
            Back to Complaint Queue
          </Link>
        </div>
        <Footer />
        <BottomNav />
      </div>
    );
  }

  const category = getCategoryById(issue.category_id);
  const wardName = issue.ward_name || (issue.ward_number ? getTanurWardName(issue.ward_number) : "Tanur Ward");

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedStatus === "rejected" && !rejectionReason.trim()) {
      alert("Please provide a mandatory statutory reason for rejection.");
      return;
    }

    const actor = user?.display_name || user?.email || "Tanur Municipal Desk Officer";

    let assignedToObj = undefined;
    let authForwarding = undefined;
    if (selectedStatus === "assigned" || selectedStatus === "forwarded" || selectedStatus === "in_progress") {
      assignedToObj = {
        department: selectedDepartment,
        staff_name: assignedStaff,
        assigned_at: issue.assigned_to?.assigned_at || new Date().toISOString(),
        reference_no: assignmentRefNo,
        notes: assignmentNotes,
      };
      authForwarding = {
        authority_id: "auth-tanur-municipality",
        authority_name: "Tanur Municipality Office",
        department: selectedDepartment,
        forwarded_at: issue.authority_forwarding?.forwarded_at || new Date().toISOString(),
        reference_no: assignmentRefNo,
        notes: assignmentNotes,
      };
    }

    let resEvidence = undefined;
    if (selectedStatus === "resolved" || selectedStatus === "closed") {
      resEvidence = {
        resolved_at: issue.resolution_evidence?.resolved_at || new Date().toISOString(),
        resolution_notes: resolutionNotes || "Field repair completed and verified by municipal staff.",
        resolution_images: resolutionImage ? [resolutionImage] : (issue.resolution_evidence?.resolution_images || []),
        verified_by_moderator: isResolutionVerified,
      };
    }

    civicStore.updateIssueStatus(
      issue.id,
      selectedStatus,
      actor,
      moderatorNote || `Status updated to ${selectedStatus.replace('_', ' ')}.`,
      authForwarding,
      resEvidence,
      assignedToObj,
      selectedStatus === "rejected" ? rejectionReason.trim() : undefined
    );

    const updated = civicStore.getIssueById(issue.id);
    if (updated) setIssue({ ...updated });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] pb-24">
      <Navbar />
      <AdminCivicNav />

      {/* Top Breadcrumb Bar */}
      <div className="bg-white border-b border-[#EDE6D8] py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link
            href="/admin/civic/issues"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#194B35] hover:text-[#C39A5B] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Complaint Queue</span>
          </Link>

          <Link
            href={`/civic/issues/${issue.id}`}
            target="_blank"
            className="text-xs font-bold text-[#C39A5B] hover:underline flex items-center gap-1"
          >
            <span>View Public Tracking Page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left 2 Cols: Issue Details & Evidence */}
          <div className="lg:col-span-2 space-y-6">

            {/* Resident Submission Card */}
            <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-8 space-y-5 shadow-2xs">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#EDE6D8]">
                <span className="font-mono text-xs sm:text-sm font-extrabold text-[#194B35] bg-[#E0F1E7] px-3 py-1 rounded-xl border border-[#BDE3CE]">
                  {issue.tracking_id}
                </span>
                <span className="text-xs text-[#7A8880]">
                  Reported: {new Date(issue.created_at).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-[#194B35] bg-[#FAF7F0] px-2.5 py-0.5 rounded border border-[#EDE6D8]">
                    {category?.name || issue.subcategory}
                  </span>
                  <span>•</span>
                  <span className="text-[#5C6A64] font-medium">{issue.subcategory}</span>
                  <span>•</span>
                  <span className="text-[#8C5B0F] font-bold">Priority: {issue.priority.toUpperCase()}</span>
                </div>

                <h1 className="text-xl sm:text-2xl font-extrabold text-[#194B35]">
                  {issue.title}
                </h1>

                <p className="text-xs sm:text-sm text-[#33413B] whitespace-pre-line leading-relaxed pt-1 bg-[#FAF7F0] p-4 rounded-2xl border border-[#EDE6D8]">
                  {issue.description}
                </p>
              </div>

              {/* Resident info & location */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] space-y-1">
                  <span className="text-[10px] uppercase font-bold text-[#7A8880] block">Ward Details</span>
                  <p className="font-bold text-[#194B35]">
                    Ward {issue.ward_number || 12}: {wardName}
                  </p>
                  <p className="text-[#5C6A64]">{issue.address_landmark}</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] space-y-1">
                  <span className="text-[10px] uppercase font-bold text-[#7A8880] block">Citizen Contact Details</span>
                  <p className="font-semibold text-[#1A2420]">
                    {issue.is_anonymous ? "Anonymous Resident (Identity Masked)" : issue.reporter_name}
                  </p>
                  <p className="text-[#5C6A64]">
                    Preference: <strong>{issue.contact_preference || "In-App"}</strong>
                    {issue.reporter_contact && ` • (${issue.reporter_contact})`}
                  </p>
                </div>
              </div>

              {/* Photo Evidence */}
              {issue.images && issue.images.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-[#EDE6D8]">
                  <span className="text-xs font-bold text-[#194B35] uppercase tracking-wider block">
                    Citizen Photo Attachments ({issue.images.length})
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {issue.images.map((img, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActiveImagePreview(img)}
                        className="rounded-2xl overflow-hidden border border-[#EDE6D8] aspect-4/3 cursor-zoom-in"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img} alt={`Evidence ${i + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Audit Timeline */}
            <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 space-y-4 shadow-2xs">
              <h3 className="font-bold text-sm text-[#194B35] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C39A5B]" />
                <span>Audit History & State Transitions</span>
              </h3>
              <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#EDE6D8]">
                {issue.timeline.map((evt, idx) => (
                  <div key={evt.id || idx} className="relative text-xs space-y-0.5">
                    <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-[#194B35] text-white flex items-center justify-center text-[8px]">
                      ✓
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#194B35]">{evt.title}</span>
                      <span className="text-[10px] text-[#7A8880]">
                        {new Date(evt.date).toLocaleDateString("en-IN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    <p className="text-[#5C6A64]">{evt.description}</p>
                    <p className="text-[10px] text-[#7A8880]">Actor: {evt.actor} ({evt.actor_role})</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Administrative Mutation Desk */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 shadow-xs space-y-5">
              
              <div className="pb-3 border-b border-[#EDE6D8] flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[#194B35]">
                    Administrative Action Desk
                  </h3>
                  <p className="text-[11px] text-[#5C6A64]">
                    Update status, assign wings, and record resolution proof.
                  </p>
                </div>
                <span className="w-6 h-6 rounded-lg bg-[#194B35] text-amber-300 flex items-center justify-center font-bold text-[10px]">
                  ADM
                </span>
              </div>

              {savedSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Complaint status saved successfully!</span>
                </div>
              )}

              <form onSubmit={handleSaveChanges} className="space-y-4 text-xs">
                
                {/* 8 Status Selector */}
                <div className="space-y-1.5">
                  <label className="font-bold text-[#194B35] block">
                    Statutory Status *
                  </label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value as CivicStatus)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#FAF7F0] border border-[#DDD5C5] text-xs font-bold text-[#194B35]"
                  >
                    <option value="submitted">1. Submitted (Awaiting verification)</option>
                    <option value="under_review">2. Under Review (Inspection pending)</option>
                    <option value="verified">3. Verified (Field validated)</option>
                    <option value="assigned">4. Assigned (Transferred to Wing)</option>
                    <option value="in_progress">5. In Progress (Works active)</option>
                    <option value="resolved">6. Resolved (Work completed)</option>
                    <option value="closed">7. Closed & Confirmed</option>
                    <option value="rejected">8. Rejected (Out of jurisdiction / Invalid)</option>
                  </select>
                </div>

                {/* Rejection Reason (Mandatory when Rejected) */}
                {selectedStatus === "rejected" && (
                  <div className="space-y-1.5 p-3 rounded-2xl bg-rose-50 border border-rose-200">
                    <label className="font-bold text-rose-800 block">
                      Statutory Rejection Reason (Mandatory) *
                    </label>
                    <textarea
                      rows={3}
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      placeholder="e.g. Private property boundary dispute outside municipal public road jurisdiction..."
                      className="w-full px-3 py-2 rounded-xl bg-white border border-rose-300 text-xs text-rose-900"
                    />
                  </div>
                )}

                {/* Assignment Controls */}
                {(selectedStatus === "assigned" || selectedStatus === "in_progress" || selectedStatus === "verified") && (
                  <div className="space-y-3 p-3.5 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8]">
                    <span className="font-bold text-[#194B35] block text-xs">
                      Department Assignment
                    </span>

                    <div>
                      <label className="text-[10px] font-bold text-[#7A8880] block mb-1">
                        Responsible Municipal Department
                      </label>
                      <select
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD5C5] text-xs font-medium"
                      >
                        <option value="Municipal Engineering Wing">Municipal Engineering Wing (Roads & Bridges)</option>
                        <option value="Municipal Health & Sanitation Wing">Municipal Health & Sanitation Wing</option>
                        <option value="KSEB Electrical Section, Tanur">KSEB Electrical Section, Tanur</option>
                        <option value="Kerala Water Authority (KWA Tanur)">Kerala Water Authority (KWA Tanur)</option>
                        <option value="Municipal Revenue Wing">Municipal Revenue Wing</option>
                        <option value="General Administration Desk">General Administration Desk</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-bold text-[#7A8880] block mb-1">Officer / Section</label>
                        <input
                          type="text"
                          value={assignedStaff}
                          onChange={(e) => setAssignedStaff(e.target.value)}
                          placeholder="Assistant Engineer Desk"
                          className="w-full px-2.5 py-1.5 rounded-xl bg-white border border-[#DDD5C5] text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-[#7A8880] block mb-1">Ref Number</label>
                        <input
                          type="text"
                          value={assignmentRefNo}
                          onChange={(e) => setAssignmentRefNo(e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-xl bg-white border border-[#DDD5C5] text-xs font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-[#7A8880] block mb-1">Assignment Notes</label>
                      <textarea
                        rows={2}
                        value={assignmentNotes}
                        onChange={(e) => setAssignmentNotes(e.target.value)}
                        placeholder="Instructions for field team..."
                        className="w-full px-2.5 py-1.5 rounded-xl bg-white border border-[#DDD5C5] text-xs"
                      />
                    </div>
                  </div>
                )}

                {/* Resolution Controls */}
                {(selectedStatus === "resolved" || selectedStatus === "closed") && (
                  <div className="space-y-3 p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                    <span className="font-bold text-emerald-900 block text-xs">
                      Resolution Evidence Recording
                    </span>

                    <div>
                      <label className="text-[10px] font-bold text-emerald-800 block mb-1">
                        Resolution Notes *
                      </label>
                      <textarea
                        rows={2}
                        value={resolutionNotes}
                        onChange={(e) => setResolutionNotes(e.target.value)}
                        placeholder="Describe completed works..."
                        className="w-full px-2.5 py-1.5 rounded-xl bg-white border border-emerald-300 text-xs"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-emerald-800 block mb-1">
                        Proof Photograph URL
                      </label>
                      <input
                        type="url"
                        value={resolutionImage}
                        onChange={(e) => setResolutionImage(e.target.value)}
                        placeholder="https://..."
                        className="w-full px-2.5 py-1.5 rounded-xl bg-white border border-emerald-300 text-xs"
                      />
                    </div>

                    <label className="flex items-center gap-2 pt-1 text-emerald-900 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isResolutionVerified}
                        onChange={(e) => setIsResolutionVerified(e.target.checked)}
                        className="rounded text-[#194B35]"
                      />
                      <span className="text-[11px] font-medium">Ground work verified by Municipal Moderator</span>
                    </label>
                  </div>
                )}

                {/* Moderator Remarks */}
                <div className="space-y-1">
                  <label className="font-bold text-[#194B35] block">
                    Moderator Note for Timeline
                  </label>
                  <textarea
                    rows={2}
                    value={moderatorNote}
                    onChange={(e) => setModeratorNote(e.target.value)}
                    placeholder="Brief description of the action taken..."
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F0] border border-[#DDD5C5] text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#194B35] text-white text-xs font-bold hover:bg-[#143E2C] transition flex items-center justify-center gap-2 shadow-xs"
                >
                  <Save className="w-4 h-4 text-amber-300" />
                  <span>Save Status & Notify Citizen</span>
                </button>

              </form>
            </div>
          </div>

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
