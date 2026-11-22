"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { AdminCivicNav } from "@/components/civic/AdminCivicNav";
import { useAuth } from "@/lib/auth/context";
import { 
  civicStore, 
  CIVIC_CATEGORIES, 
  CivicIssue,
  CivicStatus,
  getCategoryById,
  getTanurWardName 
} from "@/lib/data/civicConnectData";
import { LOCAL_GOVERNMENT_WARDS } from "@/lib/data/localGovernmentData";
import { 
  Search, 
  Filter, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Send, 
  AlertTriangle, 
  X, 
  ChevronRight, 
  MapPin, 
  ThumbsUp, 
  FileSpreadsheet, 
  ExternalLink,
  Edit,
  Eye,
  Building2,
  CheckCheck,
  Camera,
  User,
  Info
} from "lucide-react";

function AdminIssuesContent() {
  const searchParams = useSearchParams();
  const initialStatus = searchParams.get("status") || "all";
  const { user, role } = useAuth();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState(initialStatus);
  const [selectedWard, setSelectedWard] = useState<string>("all");
  const [issues, setIssues] = useState<CivicIssue[]>(() => civicStore.getIssues());

  // Tanur Municipality Wards (1 to 45)
  const tanurWards = useMemo(() => {
    return LOCAL_GOVERNMENT_WARDS.filter(
      w => w.local_body_id === "lgb-tanur-municipality"
    ).sort((a, b) => a.ward_number - b.ward_number);
  }, []);

  // Modal State for Administrative Actions
  const [actionModal, setActionModal] = useState<{
    isOpen: boolean;
    issue: CivicIssue | null;
    actionType: "verify" | "assign" | "resolve" | "close" | "reject" | null;
    note: string;
    department: string;
    staffName: string;
    referenceCode: string;
    rejectionReason: string;
    resolutionNotes: string;
    resolutionImage: string;
  }>({
    isOpen: false,
    issue: null,
    actionType: null,
    note: "",
    department: "Municipal Engineering Wing",
    staffName: "Assistant Engineer Desk",
    referenceCode: "",
    rejectionReason: "",
    resolutionNotes: "",
    resolutionImage: "",
  });

  const handleOpenAction = (issue: CivicIssue, actionType: "verify" | "assign" | "resolve" | "close" | "reject") => {
    const randomRef = `TNR-MUN-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setActionModal({
      isOpen: true,
      issue,
      actionType,
      note: "",
      department: issue.category_id === "cat-streetlights" || issue.category_id === "cat-lighting"
        ? "KSEB Electrical Section, Tanur"
        : issue.category_id === "cat-water"
        ? "Kerala Water Authority (KWA Tanur)"
        : issue.category_id === "cat-health"
        ? "Municipal Health & Sanitation Wing"
        : "Municipal Engineering Wing",
      staffName: "Duty Municipal Officer",
      referenceCode: randomRef,
      rejectionReason: "",
      resolutionNotes: "Field team completed inspection and permanent maintenance on site.",
      resolutionImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80",
    });
  };

  const handleConfirmAction = () => {
    if (!actionModal.issue || !actionModal.actionType) return;

    const issue = actionModal.issue;
    const actor = user?.display_name || user?.email || "Tanur Municipal Desk";
    let targetStatus: CivicStatus = "verified";

    if (actionModal.actionType === "verify") {
      targetStatus = "verified";
      civicStore.updateIssueStatus(
        issue.id,
        targetStatus,
        actor,
        actionModal.note || "Verified through ground inspection and municipal boundary validation."
      );
    } else if (actionModal.actionType === "assign") {
      targetStatus = "assigned";
      civicStore.updateIssueStatus(
        issue.id,
        targetStatus,
        actor,
        actionModal.note || `Officially assigned to ${actionModal.department} for technical execution.`,
        {
          authority_id: "auth-tanur-municipality",
          authority_name: "Tanur Municipality Office",
          department: actionModal.department,
          forwarded_at: new Date().toISOString(),
          reference_no: actionModal.referenceCode,
          notes: actionModal.note,
        },
        undefined,
        {
          department: actionModal.department,
          staff_name: actionModal.staffName,
          assigned_at: new Date().toISOString(),
          reference_no: actionModal.referenceCode,
          notes: actionModal.note,
        }
      );
    } else if (actionModal.actionType === "reject") {
      if (!actionModal.rejectionReason.trim()) {
        alert("Please provide a mandatory statutory reason for rejection.");
        return;
      }
      targetStatus = "rejected";
      civicStore.updateIssueStatus(
        issue.id,
        targetStatus,
        actor,
        actionModal.note || `Complaint rejected: ${actionModal.rejectionReason}`,
        undefined,
        undefined,
        undefined,
        actionModal.rejectionReason.trim()
      );
    } else if (actionModal.actionType === "resolve") {
      targetStatus = "resolved";
      civicStore.updateIssueStatus(
        issue.id,
        targetStatus,
        actor,
        actionModal.note || "Issue verified as resolved by municipal field team.",
        undefined,
        {
          resolved_at: new Date().toISOString(),
          resolution_notes: actionModal.resolutionNotes || "Field repair completed.",
          resolution_images: actionModal.resolutionImage ? [actionModal.resolutionImage] : [],
          verified_by_moderator: true,
        }
      );
    } else if (actionModal.actionType === "close") {
      targetStatus = "closed";
      civicStore.updateIssueStatus(
        issue.id,
        targetStatus,
        actor,
        actionModal.note || "Complaint confirmed resolved and formally closed in municipal records."
      );
    }

    setIssues([...civicStore.getIssues()]);
    setActionModal({
      isOpen: false,
      issue: null,
      actionType: null,
      note: "",
      department: "Municipal Engineering Wing",
      staffName: "",
      referenceCode: "",
      rejectionReason: "",
      resolutionNotes: "",
      resolutionImage: "",
    });
  };

  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {
      if (selectedCategory !== "all" && issue.category_id !== selectedCategory) return false;
      if (selectedStatus !== "all") {
        if (selectedStatus === "pending") {
          if (issue.status !== "submitted" && issue.status !== "under_review") return false;
        } else if (issue.status !== selectedStatus) {
          return false;
        }
      }
      if (selectedWard !== "all") {
        const wardNum = parseInt(selectedWard, 10);
        if (issue.ward_number !== wardNum) return false;
      }
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchesTitle = issue.title.toLowerCase().includes(q);
        const matchesTracking = issue.tracking_id.toLowerCase().includes(q);
        const matchesLocality = issue.locality.toLowerCase().includes(q) || issue.address_landmark.toLowerCase().includes(q);
        const matchesWard = issue.ward_name?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesTracking && !matchesLocality && !matchesWard) return false;
      }
      return true;
    });
  }, [issues, selectedCategory, selectedStatus, selectedWard, searchTerm]);

  const getStatusBadge = (status: CivicIssue['status']) => {
    switch (status) {
      case "resolved":
        return { label: "Resolved", bg: "bg-emerald-100 text-emerald-800 border-emerald-300", icon: CheckCircle2 };
      case "closed":
        return { label: "Closed", bg: "bg-teal-100 text-teal-800 border-teal-300", icon: CheckCheck };
      case "in_progress":
        return { label: "In Progress", bg: "bg-blue-100 text-blue-800 border-blue-300", icon: Building2 };
      case "assigned":
      case "forwarded":
        return { label: "Assigned", bg: "bg-amber-100 text-amber-800 border-amber-300", icon: Send };
      case "verified":
        return { label: "Verified", bg: "bg-purple-100 text-purple-800 border-purple-300", icon: ShieldCheck };
      case "under_review":
        return { label: "Under Review", bg: "bg-sky-100 text-sky-800 border-sky-300", icon: Clock };
      case "rejected":
        return { label: "Rejected", bg: "bg-rose-100 text-rose-800 border-rose-300", icon: AlertTriangle };
      default:
        return { label: "Submitted", bg: "bg-neutral-100 text-neutral-800 border-neutral-300", icon: Clock };
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] pb-24">
      <Navbar />
      <AdminCivicNav />

      {/* Header Hub */}
      <section className="bg-gradient-to-b from-[#FAF4E6] to-[#FAF7F0] border-b border-[#E8DCBF] pt-8 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-6 h-6 rounded-lg bg-[#143E2C] text-amber-300 flex items-center justify-center">
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                </span>
                <span className="text-xs font-bold text-[#143E2C] uppercase tracking-wider">
                  Municipal Grievance Desk
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#194B35]">
                Manage Civic Complaints
              </h1>
              <p className="text-xs sm:text-sm text-[#5C6A64] mt-1">
                Filter by Tanur wards, verify submissions, assign to municipal engineering and health wings, and record resolution proof.
              </p>
            </div>

            <div className="text-xs text-[#5C6A64] font-medium bg-white px-3.5 py-1.5 rounded-xl border border-[#EDE6D8]">
              Showing <strong>{filteredIssues.length}</strong> of {issues.length} complaints
            </div>
          </div>

          {/* Filter Bar Controls */}
          <div className="bg-white p-4 rounded-2xl border border-[#EDE6D8] shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search reference ID, keyword, or landmark..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#FAF7F0] border border-[#DDD5C5] text-xs focus:outline-hidden focus:border-[#194B35]"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[#FAF7F0] border border-[#DDD5C5] text-xs font-medium focus:outline-hidden"
            >
              <option value="all">All 8 Categories</option>
              {CIVIC_CATEGORIES.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>

            {/* Status Filter (All 8 Statuses) */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[#FAF7F0] border border-[#DDD5C5] text-xs font-medium focus:outline-hidden"
            >
              <option value="all">All Statuses</option>
              <option value="submitted">1. Submitted</option>
              <option value="under_review">2. Under Review</option>
              <option value="verified">3. Verified</option>
              <option value="assigned">4. Assigned</option>
              <option value="in_progress">5. In Progress</option>
              <option value="resolved">6. Resolved</option>
              <option value="closed">7. Closed</option>
              <option value="rejected">8. Rejected</option>
            </select>

            {/* Ward Filter (Wards 1–45) */}
            <select
              value={selectedWard}
              onChange={(e) => setSelectedWard(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[#FAF7F0] border border-[#DDD5C5] text-xs font-medium focus:outline-hidden"
            >
              <option value="all">All 45 Municipal Wards</option>
              {tanurWards.map(w => (
                <option key={w.id} value={w.ward_number}>
                  Ward {w.ward_number}: {w.ward_name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Main Table Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-3xl border border-[#EDE6D8] overflow-hidden shadow-2xs">
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#FAF7F0] border-b border-[#EDE6D8] text-[#5C6A64] uppercase text-[10px] tracking-wider">
                  <th className="py-3.5 px-4 font-bold">Reference ID & Category</th>
                  <th className="py-3.5 px-4 font-bold">Issue Title & Description</th>
                  <th className="py-3.5 px-4 font-bold">Ward & Location</th>
                  <th className="py-3.5 px-4 font-bold">Status</th>
                  <th className="py-3.5 px-4 font-bold">Reported Date</th>
                  <th className="py-3.5 px-4 font-bold text-right">Moderator Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDE6D8]">
                {filteredIssues.map((issue) => {
                  const statusInfo = getStatusBadge(issue.status);
                  const StatusIcon = statusInfo.icon;
                  const cat = getCategoryById(issue.category_id);
                  const wardName = issue.ward_name || (issue.ward_number ? getTanurWardName(issue.ward_number) : "Tanur Ward");

                  return (
                    <tr key={issue.id} className="hover:bg-[#FAF7F0]/60 transition">
                      
                      {/* Ref ID & Category */}
                      <td className="py-4 px-4 align-top">
                        <Link 
                          href={`/admin/civic/issues/${issue.id}`}
                          className="font-mono font-bold text-[#194B35] hover:underline block"
                        >
                          {issue.tracking_id}
                        </Link>
                        <span className="text-[10px] text-[#8C5B0F] font-semibold block mt-0.5">
                          {cat?.name || "Civic Issue"}
                        </span>
                        <span className="text-[10px] text-[#7A8880] block">
                          {issue.subcategory}
                        </span>
                      </td>

                      {/* Title & Desc */}
                      <td className="py-4 px-4 align-top max-w-xs">
                        <Link
                          href={`/admin/civic/issues/${issue.id}`}
                          className="font-bold text-[#1A2420] hover:text-[#194B35] line-clamp-1 block"
                        >
                          {issue.title}
                        </Link>
                        <p className="text-[11px] text-[#5C6A64] line-clamp-2 mt-0.5">
                          {issue.description}
                        </p>
                        {issue.images && issue.images.length > 0 && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-[#194B35] font-bold mt-1 bg-[#E0F1E7] px-2 py-0.5 rounded">
                            <Camera className="w-3 h-3" />
                            <span>{issue.images.length} Photo Evidence</span>
                          </span>
                        )}
                      </td>

                      {/* Ward & Location */}
                      <td className="py-4 px-4 align-top">
                        <span className="font-bold text-[#194B35] block">
                          Ward {issue.ward_number || 12}: {wardName}
                        </span>
                        <span className="text-[11px] text-[#5C6A64] line-clamp-1 block mt-0.5">
                          {issue.address_landmark}
                        </span>
                        <span className="text-[10px] text-[#7A8880] block">
                          Reporter: {issue.is_anonymous ? "Anonymous Resident" : issue.reporter_name}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4 align-top">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${statusInfo.bg}`}>
                          <StatusIcon className="w-3 h-3" />
                          <span>{statusInfo.label}</span>
                        </span>
                        {issue.assigned_to && (
                          <span className="text-[10px] text-[#8C5B0F] font-medium block mt-1">
                            Assigned: {issue.assigned_to.department}
                          </span>
                        )}
                      </td>

                      {/* Date */}
                      <td className="py-4 px-4 align-top text-[#5C6A64] text-[11px] whitespace-nowrap">
                        {new Date(issue.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 align-top text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Verify */}
                          {issue.status === "submitted" && (
                            <button
                              type="button"
                              onClick={() => handleOpenAction(issue, "verify")}
                              className="px-2.5 py-1 rounded-lg bg-purple-50 text-purple-800 border border-purple-200 text-[11px] font-bold hover:bg-purple-100 transition"
                            >
                              Verify
                            </button>
                          )}

                          {/* Assign */}
                          {(issue.status === "verified" || issue.status === "submitted") && (
                            <button
                              type="button"
                              onClick={() => handleOpenAction(issue, "assign")}
                              className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-bold hover:bg-amber-100 transition"
                            >
                              Assign
                            </button>
                          )}

                          {/* Resolve */}
                          {(issue.status === "in_progress" || issue.status === "assigned" || issue.status === "forwarded") && (
                            <button
                              type="button"
                              onClick={() => handleOpenAction(issue, "resolve")}
                              className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold hover:bg-emerald-100 transition"
                            >
                              Resolve
                            </button>
                          )}

                          {/* Close */}
                          {issue.status === "resolved" && (
                            <button
                              type="button"
                              onClick={() => handleOpenAction(issue, "close")}
                              className="px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 border border-teal-200 text-[11px] font-bold hover:bg-teal-100 transition"
                            >
                              Close Case
                            </button>
                          )}

                          {/* Reject */}
                          {issue.status !== "resolved" && issue.status !== "closed" && issue.status !== "rejected" && (
                            <button
                              type="button"
                              onClick={() => handleOpenAction(issue, "reject")}
                              className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-800 border border-rose-200 text-[11px] font-bold hover:bg-rose-100 transition"
                            >
                              Reject
                            </button>
                          )}

                          {/* Full Desk View */}
                          <Link
                            href={`/admin/civic/issues/${issue.id}`}
                            className="p-1 rounded-lg text-[#194B35] hover:bg-[#FAF7F0] transition"
                            title="Open full administrative desk"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredIssues.length === 0 && (
            <div className="py-16 text-center text-xs text-[#5C6A64]">
              <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
              <p className="font-bold text-[#194B35] text-sm">No complaints found</p>
              <p className="mt-1">Try resetting search keywords or selecting another status filter.</p>
            </div>
          )}

        </div>
      </main>

      {/* ============================================================== */}
      {/* QUICK ACTION MODAL */}
      {/* ============================================================== */}
      {actionModal.isOpen && actionModal.issue && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-xl border border-[#EDE6D8] animate-in fade-in zoom-in-95">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#EDE6D8]">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#194B35] text-white flex items-center justify-center font-bold text-xs">
                  ADM
                </span>
                <div>
                  <h3 className="font-bold text-sm text-[#194B35]">
                    {actionModal.actionType === "verify" && "Verify Civic Complaint"}
                    {actionModal.actionType === "assign" && "Assign to Municipal Wing"}
                    {actionModal.actionType === "resolve" && "Record Resolution Evidence"}
                    {actionModal.actionType === "close" && "Confirm & Close Complaint"}
                    {actionModal.actionType === "reject" && "Reject Civic Complaint"}
                  </h3>
                  <span className="text-[10px] text-[#7A8880] font-mono">
                    Ref: {actionModal.issue.tracking_id}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActionModal({ ...actionModal, isOpen: false })}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Target Issue Info Card */}
            <div className="p-3 rounded-xl bg-[#FAF7F0] border border-[#EDE6D8] text-xs space-y-1">
              <span className="font-bold text-[#194B35] block">{actionModal.issue.title}</span>
              <p className="text-[11px] text-[#5C6A64]">
                Ward {actionModal.issue.ward_number}: {actionModal.issue.ward_name} • {actionModal.issue.address_landmark}
              </p>
            </div>

            {/* Department Assignment Fields */}
            {actionModal.actionType === "assign" && (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-[#194B35] block mb-1">
                    Select Municipal Department *
                  </label>
                  <select
                    value={actionModal.department}
                    onChange={(e) => setActionModal({ ...actionModal, department: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F0] border border-[#DDD5C5] text-xs font-medium"
                  >
                    <option value="Municipal Engineering Wing">Municipal Engineering Wing (Roads & Bridges)</option>
                    <option value="Municipal Health & Sanitation Wing">Municipal Health & Sanitation Wing</option>
                    <option value="KSEB Electrical Section, Tanur">KSEB Electrical Section, Tanur</option>
                    <option value="Kerala Water Authority (KWA Tanur)">Kerala Water Authority (KWA Tanur)</option>
                    <option value="Municipal Revenue Wing">Municipal Revenue Wing</option>
                    <option value="Tanur Police Station Limits">Tanur Police Station Limits</option>
                    <option value="General Administration Desk">General Administration Desk</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-[#194B35] block mb-1">
                      Inspection Officer
                    </label>
                    <input
                      type="text"
                      value={actionModal.staffName}
                      onChange={(e) => setActionModal({ ...actionModal, staffName: e.target.value })}
                      placeholder="e.g. Assistant Engineer Desk"
                      className="w-full px-3 py-2 rounded-xl bg-[#FAF7F0] border border-[#DDD5C5] text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-[#194B35] block mb-1">
                      Assignment Ref No
                    </label>
                    <input
                      type="text"
                      value={actionModal.referenceCode}
                      onChange={(e) => setActionModal({ ...actionModal, referenceCode: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#FAF7F0] border border-[#DDD5C5] text-xs font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Rejection Reason (Mandatory) */}
            {actionModal.actionType === "reject" && (
              <div className="space-y-1.5 text-xs">
                <label className="font-bold text-rose-800 block">
                  Statutory Rejection Reason (Mandatory) *
                </label>
                <textarea
                  rows={3}
                  value={actionModal.rejectionReason}
                  onChange={(e) => setActionModal({ ...actionModal, rejectionReason: e.target.value })}
                  placeholder="State clear reason (e.g. Private property dispute outside municipal jurisdiction, duplicate submission, insufficient location details)..."
                  className="w-full px-3 py-2 rounded-xl bg-rose-50/50 border border-rose-200 text-xs focus:outline-hidden focus:border-rose-400"
                />
              </div>
            )}

            {/* Resolution Fields */}
            {actionModal.actionType === "resolve" && (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-[#194B35] block mb-1">
                    Field Resolution Notes *
                  </label>
                  <textarea
                    rows={2}
                    value={actionModal.resolutionNotes}
                    onChange={(e) => setActionModal({ ...actionModal, resolutionNotes: e.target.value })}
                    placeholder="Describe how the problem was fixed (e.g. Asphalt patch applied, leak repaired, drain de-silted)..."
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F0] border border-[#DDD5C5] text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#194B35] block mb-1">
                    Proof Photograph URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={actionModal.resolutionImage}
                    onChange={(e) => setActionModal({ ...actionModal, resolutionImage: e.target.value })}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F0] border border-[#DDD5C5] text-xs"
                  />
                </div>
              </div>
            )}

            {/* Additional Remarks Note */}
            <div className="space-y-1 text-xs">
              <label className="font-bold text-[#194B35] block">
                Additional Remarks for Timeline Log
              </label>
              <textarea
                rows={2}
                value={actionModal.note}
                onChange={(e) => setActionModal({ ...actionModal, note: e.target.value })}
                placeholder="Optional remark visible to citizen in chronological timeline..."
                className="w-full px-3 py-2 rounded-xl bg-[#FAF7F0] border border-[#DDD5C5] text-xs"
              />
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#EDE6D8]">
              <button
                type="button"
                onClick={() => setActionModal({ ...actionModal, isOpen: false })}
                className="px-4 py-2 rounded-xl border border-[#EDE6D8] text-xs font-bold text-[#5C6A64] hover:bg-[#FAF7F0]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmAction}
                className="px-5 py-2 rounded-xl bg-[#194B35] text-white text-xs font-bold hover:bg-[#143E2C] transition shadow-xs"
              >
                Confirm Update
              </button>
            </div>

          </div>
        </div>
      )}

      <Footer />
      <BottomNav />
    </div>
  );
}

export default function AdminCivicIssuesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAF7F0] flex items-center justify-center p-8 text-[#194B35]">
        <div className="w-8 h-8 border-3 border-[#194B35] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <AdminIssuesContent />
    </Suspense>
  );
}
