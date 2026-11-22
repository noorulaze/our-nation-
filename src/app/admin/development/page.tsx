"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { DevelopmentNav } from "@/components/development/DevelopmentNav";
import { useAuth } from "@/lib/auth/context";
import { 
  digitalMunicipalityStore 
} from "@/lib/data/digitalMunicipalityData";
import { 
  DevelopmentProject, 
  ProjectContribution, 
  ProjectAuditLog,
  ContributionStatus,
  ProjectStatus
} from "@/types/digitalMunicipality";
import {
  HardHat,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Plus,
  ArrowRight,
  ChevronRight,
  Eye,
  Edit,
  Trash2,
  FileCheck2,
  Archive,
  Lock,
  ExternalLink,
  MessageSquare,
  Camera,
  Users,
  Search,
  Check,
  X,
  FileText
} from "lucide-react";

export default function AdminDevelopmentDashboard() {
  const { role, user } = useAuth();
  const isAuthorized = role === "admin" || role === "moderator";

  const [stats, setStats] = useState(() => digitalMunicipalityStore.getProjectStats());
  const [projects, setProjects] = useState<DevelopmentProject[]>(() => digitalMunicipalityStore.getProjects());
  const [contributions, setContributions] = useState<ProjectContribution[]>(() => 
    digitalMunicipalityStore.getProjectContributions()
  );
  const [auditLogs, setAuditLogs] = useState<ProjectAuditLog[]>(() => 
    digitalMunicipalityStore.getProjectAuditLogs()
  );

  const [reviewNote, setReviewNote] = useState<{ [id: string]: string }>({});
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const showFeedback = (msg: string) => {
    setActionFeedback(msg);
    setTimeout(() => setActionFeedback(null), 3000);
  };

  const refreshAll = () => {
    setStats(digitalMunicipalityStore.getProjectStats());
    setProjects(digitalMunicipalityStore.getProjects());
    setContributions(digitalMunicipalityStore.getProjectContributions());
    setAuditLogs(digitalMunicipalityStore.getProjectAuditLogs());
  };

  const handleReviewContribution = (id: string, status: ContributionStatus) => {
    const note = reviewNote[id] || "";
    const reviewer = user?.display_name || user?.username || "Admin Officer";
    digitalMunicipalityStore.updateProjectContributionStatus(id, status, note, reviewer);
    refreshAll();
    showFeedback(`Citizen submission marked as ${status}. Public audit ledger updated.`);
  };

  const getStatusBadgeClass = (status: ProjectStatus) => {
    switch (status) {
      case "Proposed":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Approved":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Planned":
        return "bg-cyan-100 text-cyan-800 border-cyan-200";
      case "In Progress":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Delayed":
        return "bg-rose-100 text-rose-800 border-rose-200";
      case "Completed":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "On Hold":
        return "bg-stone-200 text-stone-800 border-stone-300";
      case "Cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
        <Navbar />
        <DevelopmentNav />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl border border-[#EDE6D8] p-8 text-center shadow-card">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-[#B87A1E] flex items-center justify-center mx-auto mb-4 border border-amber-200">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-[#1A2420]">
              Administrative Access Required
            </h2>
            <p className="text-xs text-[#5C6A64] mt-2 leading-relaxed">
              This workspace is restricted to authorized municipal engineers, administrators, and verified civic moderators.
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <Link
                href="/development"
                className="w-full py-2.5 rounded-xl bg-[#194B35] hover:bg-[#123626] text-white font-bold text-xs transition active:scale-95 shadow-xs text-center"
              >
                Return to Development Tracker
              </Link>
            </div>
          </div>
        </main>
        <Footer />
        <BottomNav />
      </div>
    );
  }

  const pendingContributions = contributions.filter(c => c.status === "pending");

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] flex flex-col font-sans">
      <Navbar />
      <DevelopmentNav />

      <main className="flex-1 pb-24">
        {/* Header */}
        <div className="bg-gradient-to-b from-[#194B35] to-[#123626] text-white pt-8 pb-12 shadow-inner">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#C39A5B] text-xs font-bold mb-2.5 border border-white/20">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Tanur Municipality • Engineering Administration</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Development Projects Control Center
                </h1>
                <p className="text-xs sm:text-sm text-[#EDE6D8] mt-1">
                  Manage municipal projects, record verified Measurement Book milestones, audit budgets, and review citizen field submissions across Wards 1 to 45.
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <Link
                  href="/admin/development/projects"
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition flex items-center gap-1.5"
                >
                  <Search className="w-3.5 h-3.5 text-[#C39A5B]" />
                  <span>Manage Projects ({projects.length})</span>
                </Link>

                <Link
                  href="/admin/development/projects/new"
                  className="px-4 py-2.5 rounded-xl bg-[#C39A5B] hover:bg-[#b0874a] text-[#194B35] text-xs font-extrabold transition shadow-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Register New Project</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback Alert */}
        {actionFeedback && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 mb-4">
            <div className="p-4 rounded-2xl bg-[#194B35] text-white text-xs font-semibold flex items-center gap-2 shadow-lg animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-[#C39A5B]" />
              <span>{actionFeedback}</span>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            <div className="bg-white p-4 rounded-2xl border border-[#EDE6D8] shadow-card">
              <span className="text-[10px] font-bold text-[#7A8880] uppercase tracking-wider block">Total Projects</span>
              <div className="text-2xl font-extrabold text-[#194B35] mt-0.5">{stats.total}</div>
              <span className="text-[10px] text-[#5C6A64]">All 45 Wards</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#EDE6D8] shadow-card">
              <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">In Progress</span>
              <div className="text-2xl font-extrabold text-amber-700 mt-0.5">{stats.in_progress}</div>
              <span className="text-[10px] text-[#5C6A64]">Active Site Works</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#EDE6D8] shadow-card">
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">Completed</span>
              <div className="text-2xl font-extrabold text-emerald-700 mt-0.5">{stats.completed}</div>
              <span className="text-[10px] text-[#5C6A64]">Commissioned</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#EDE6D8] shadow-card">
              <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider block">Delayed / Review</span>
              <div className="text-2xl font-extrabold text-rose-700 mt-0.5">{stats.delayed}</div>
              <span className="text-[10px] text-[#5C6A64]">Attention Required</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#EDE6D8] shadow-card">
              <span className="text-[10px] font-bold text-[#194B35] uppercase tracking-wider block">Grounded Sourced</span>
              <div className="text-2xl font-extrabold text-[#194B35] mt-0.5">{stats.verified}</div>
              <span className="text-[10px] text-[#5C6A64]">Official Records</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#EDE6D8] shadow-card">
              <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider block">Citizen Submissions</span>
              <div className="text-2xl font-extrabold text-indigo-700 mt-0.5">{pendingContributions.length}</div>
              <span className="text-[10px] text-amber-600 font-bold">Pending Review</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-10">
          
          {/* Section 1: Citizen Contributions Review Queue */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE6D8] shadow-card space-y-5">
            <div className="flex items-center justify-between border-b border-[#EDE6D8] pb-4">
              <div>
                <h2 className="text-base font-bold text-[#194B35] flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#C39A5B]" />
                  <span>Citizen Field Contribution Review Queue</span>
                </h2>
                <p className="text-xs text-[#5C6A64] mt-0.5">
                  Review field inspection photographs, reported status discrepancies, and resident inquiries before publication.
                </p>
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-amber-50 text-amber-900 rounded-full border border-amber-200">
                {pendingContributions.length} Pending Verification
              </span>
            </div>

            {pendingContributions.length === 0 ? (
              <div className="p-8 text-center bg-[#FAF7F0] rounded-2xl border border-[#EDE6D8] text-xs text-[#5C6A64]">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <span>All citizen submissions have been audited. The verification queue is currently clear!</span>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingContributions.map((c) => (
                  <div key={c.id} className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#194B35] text-white capitalize">
                          {c.type.replace("_", " ")}
                        </span>
                        <span className="text-xs font-bold text-[#194B35]">
                          {c.author_name} {c.author_phone ? `(${c.author_phone})` : ""}
                        </span>
                        <span className="text-[11px] text-[#7A8880]">
                          Target Project: <strong className="text-[#194B35]">{c.project_title}</strong>
                        </span>
                      </div>
                      <span className="text-[11px] text-[#7A8880] flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(c.created_at).toLocaleDateString("en-IN")}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-[#1A2420]">{c.title}</h4>
                      <p className="text-xs text-[#5C6A64] mt-1 leading-relaxed whitespace-pre-line">{c.details}</p>
                    </div>

                    {c.evidence_url && (
                      <div className="text-xs">
                        <a
                          href={c.evidence_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#194B35] hover:text-[#C39A5B] font-bold inline-flex items-center gap-1 transition"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>View Submitted Field Photo / Document URL</span>
                        </a>
                      </div>
                    )}

                    {/* Review Actions */}
                    <div className="pt-2 border-t border-[#EDE6D8] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                      <input
                        type="text"
                        value={reviewNote[c.id] || ""}
                        onChange={(e) => setReviewNote({ ...reviewNote, [c.id]: e.target.value })}
                        placeholder="Administrative verification remark / reason..."
                        className="px-3 py-1.5 rounded-xl text-xs bg-white border border-[#DDD5C5] text-[#1A2420] sm:max-w-md focus:outline-hidden focus:border-[#194B35]"
                      />

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <button
                          onClick={() => handleReviewContribution(c.id, "rejected")}
                          className="px-3 py-1.5 rounded-xl bg-white border border-rose-300 text-rose-700 text-xs font-bold hover:bg-rose-50 transition"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => handleReviewContribution(c.id, "approved")}
                          className="px-4 py-1.5 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 transition shadow-xs"
                        >
                          Approve & Publish
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 2: Projects Overview Table with Direct Actions */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE6D8] shadow-card space-y-4">
            <div className="flex items-center justify-between border-b border-[#EDE6D8] pb-4">
              <div>
                <h2 className="text-base font-bold text-[#194B35]">
                  Municipal Projects Registry Overview
                </h2>
                <p className="text-xs text-[#5C6A64]">
                  Recently updated projects across Tanur Grade II Municipality (Wards 1–45).
                </p>
              </div>

              <Link
                href="/admin/development/projects"
                className="text-xs font-bold text-[#194B35] hover:text-[#C39A5B] flex items-center gap-1 transition"
              >
                <span>View Full Registry ({projects.length})</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#EDE6D8] text-[#5C6A64] font-bold">
                    <th className="py-2.5">Project Title</th>
                    <th className="py-2.5">Category</th>
                    <th className="py-2.5">Status</th>
                    <th className="py-2.5">Approved Budget</th>
                    <th className="py-2.5">Ward</th>
                    <th className="py-2.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDE6D8]">
                  {projects.slice(0, 10).map((p) => (
                    <tr key={p.id} className="hover:bg-[#FAF7F0] transition">
                      <td className="py-3 font-bold text-[#194B35] max-w-xs truncate">
                        <Link href={`/development/projects/${p.id}`} className="hover:underline">
                          {p.title}
                        </Link>
                      </td>
                      <td className="py-3 text-[#5C6A64]">
                        {p.category_name}
                      </td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadgeClass(p.status)}`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3 font-mono text-[#194B35] font-bold">
                        {p.approved_budget || p.budget_sanctioned || "—"}
                      </td>
                      <td className="py-3 text-[#5C6A64]">
                        {p.ward_number ? `Ward ${p.ward_number}` : "All Tanur"}
                      </td>
                      <td className="py-3 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <Link
                            href={`/development/projects/${p.id}`}
                            className="p-1 rounded-md text-neutral-500 hover:text-[#194B35] transition"
                            title="View Public Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </Link>
                          <Link
                            href={`/admin/development/projects/${p.id}/edit`}
                            className="px-2.5 py-1 rounded-lg bg-white border border-[#DDD5C5] hover:bg-[#C39A5B] hover:text-white text-[#194B35] text-[11px] font-bold transition inline-flex items-center gap-1"
                          >
                            <Edit className="w-3 h-3" />
                            <span>Edit</span>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: Immutable Audit Trail */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE6D8] shadow-card space-y-4">
            <div className="flex items-center justify-between border-b border-[#EDE6D8] pb-4">
              <div>
                <h2 className="text-base font-bold text-[#194B35] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#C39A5B]" />
                  <span>Statutory Development Audit Trail</span>
                </h2>
                <p className="text-xs text-[#5C6A64] mt-0.5">
                  Immutable log of all project updates, status transitions, budget adjustments, and administrative approvals.
                </p>
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-[#FAF7F0] text-[#194B35] border border-[#DDD5C5] rounded-full">
                {auditLogs.length} Logged Actions
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#EDE6D8] text-[#5C6A64] font-bold">
                    <th className="py-2.5">Action</th>
                    <th className="py-2.5">Project ID</th>
                    <th className="py-2.5">Actor</th>
                    <th className="py-2.5">Note / Transition</th>
                    <th className="py-2.5">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDE6D8]">
                  {auditLogs.slice(0, 10).map((log) => (
                    <tr key={log.id} className="hover:bg-[#FAF7F0] transition">
                      <td className="py-2.5 font-bold uppercase text-[10px] text-[#194B35]">
                        <span className="px-2 py-0.5 rounded-md bg-[#FAF7F0] border border-[#DDD5C5]">
                          {log.action}
                        </span>
                      </td>
                      <td className="py-2.5 font-mono text-[11px] text-[#7A8880] truncate max-w-[120px]">
                        {log.project_id}
                      </td>
                      <td className="py-2.5 text-[#1A2420]">
                        <strong>{log.actor_name}</strong> <span className="text-[10px] text-[#7A8880]">({log.actor_role})</span>
                      </td>
                      <td className="py-2.5 text-[#5C6A64]">
                        {log.note || `${log.previous_value || ""} -> ${log.new_value || ""}`}
                      </td>
                      <td className="py-2.5 text-[#7A8880] text-[11px] font-mono">
                        {new Date(log.timestamp).toLocaleString("en-IN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
