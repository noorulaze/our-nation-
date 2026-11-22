"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { DevelopmentNav } from "@/components/development/DevelopmentNav";
import { useAuth } from "@/lib/auth/context";
import { 
  digitalMunicipalityStore, 
  TRANSPARENT_PROJECT_CATEGORIES,
  TANUR_MUNICIPAL_WARDS 
} from "@/lib/data/digitalMunicipalityData";
import { 
  DevelopmentProject, 
  ProjectStatus, 
  ProjectCategory 
} from "@/types/digitalMunicipality";
import {
  HardHat,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Archive,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowLeft,
  ChevronRight,
  Eye,
  Building2,
  MapPin
} from "lucide-react";

export default function AdminProjectsDirectoryPage() {
  const { role, user } = useAuth();
  const isAuthorized = role === "admin" || role === "moderator";

  const [projects, setProjects] = useState<DevelopmentProject[]>(() => digitalMunicipalityStore.getProjects());
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<ProjectCategory | "all">("all");
  const [wardFilter, setWardFilter] = useState<number | "all">("all");
  const [feedback, setFeedback] = useState<string | null>(null);

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3000);
  };

  const refreshProjects = () => {
    setProjects(digitalMunicipalityStore.getProjects());
  };

  const handleStatusChange = (projectId: string, newStatus: ProjectStatus) => {
    const actor = user?.display_name || user?.username || "Admin Officer";
    digitalMunicipalityStore.updateProject(projectId, { status: newStatus }, actor);
    refreshProjects();
    showFeedback(`Project status updated to ${newStatus}. Transition recorded in audit trail.`);
  };

  const handleArchiveProject = (projectId: string) => {
    if (!confirm("Are you sure you want to archive this municipal project? It will be hidden from the active directory.")) return;
    digitalMunicipalityStore.archiveProject(projectId);
    refreshProjects();
    showFeedback("Project has been archived successfully.");
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        if (
          !p.title.toLowerCase().includes(q) &&
          !(p.locality || "").toLowerCase().includes(q) &&
          !(p.department || "").toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      if (statusFilter !== "all" && p.status !== statusFilter) return false;
      if (categoryFilter !== "all" && p.category !== categoryFilter) return false;
      if (wardFilter !== "all" && p.ward_number !== wardFilter) return false;
      return true;
    });
  }, [projects, searchTerm, statusFilter, categoryFilter, wardFilter]);

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
            <p className="text-xs text-[#5C6A64] mt-2">
              This registry management screen is restricted to authorized municipal officers.
            </p>
            <div className="mt-6">
              <Link
                href="/development"
                className="w-full py-2.5 rounded-xl bg-[#194B35] text-white font-bold text-xs transition inline-block text-center shadow-xs"
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

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] flex flex-col font-sans">
      <Navbar />
      <DevelopmentNav />

      <main className="flex-1 pb-24">
        {/* Header */}
        <div className="bg-gradient-to-b from-[#194B35] to-[#123626] text-white pt-8 pb-10 shadow-inner">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs text-[#C39A5B] font-bold mb-2">
                  <Link href="/admin/development" className="hover:underline flex items-center gap-1">
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Admin Control Center</span>
                  </Link>
                  <span>/</span>
                  <span>Projects Registry</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Municipal Projects Management Directory
                </h1>
                <p className="text-xs text-[#EDE6D8] mt-1">
                  Full control over project lifecycle, status updates, budget auditing, and ward allocations across Wards 1 to 45.
                </p>
              </div>

              <Link
                href="/admin/development/projects/new"
                className="px-4 py-2.5 rounded-xl bg-[#C39A5B] hover:bg-[#b0874a] text-[#194B35] text-xs font-extrabold transition shadow-xs flex items-center gap-1.5 self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Register New Project</span>
              </Link>
            </div>
          </div>
        </div>

        {feedback && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 mb-4">
            <div className="p-3.5 rounded-2xl bg-[#194B35] text-white text-xs font-semibold flex items-center gap-2 shadow-lg animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-[#C39A5B]" />
              <span>{feedback}</span>
            </div>
          </div>
        )}

        {/* Filters & Projects Table */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
          <div className="bg-white rounded-3xl p-5 border border-[#EDE6D8] shadow-card space-y-4">
            {/* Filter Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-[#7A8880] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search project title or locality..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-[#FAF7F0] border border-[#DDD5C5] text-[#1A2420] focus:outline-hidden focus:border-[#194B35]"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-3 py-2 rounded-xl text-xs bg-[#FAF7F0] border border-[#DDD5C5] text-[#1A2420] focus:outline-hidden focus:border-[#194B35]"
              >
                <option value="all">All Statuses (8 Statutory)</option>
                <option value="Proposed">Proposed</option>
                <option value="Approved">Approved</option>
                <option value="Planned">Planned</option>
                <option value="In Progress">In Progress</option>
                <option value="Delayed">Delayed</option>
                <option value="Completed">Completed</option>
                <option value="On Hold">On Hold</option>
                <option value="Cancelled">Cancelled</option>
              </select>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value as any)}
                className="px-3 py-2 rounded-xl text-xs bg-[#FAF7F0] border border-[#DDD5C5] text-[#1A2420] focus:outline-hidden focus:border-[#194B35]"
              >
                <option value="all">All Categories (9 Statutory)</option>
                {TRANSPARENT_PROJECT_CATEGORIES.map((c) => (
                  <option key={c.key} value={c.key}>
                    {c.label}
                  </option>
                ))}
              </select>

              <select
                value={wardFilter === "all" ? "all" : String(wardFilter)}
                onChange={(e) => setWardFilter(e.target.value === "all" ? "all" : Number(e.target.value))}
                className="px-3 py-2 rounded-xl text-xs bg-[#FAF7F0] border border-[#DDD5C5] text-[#1A2420] focus:outline-hidden focus:border-[#194B35]"
              >
                <option value="all">All Wards (Wards 1–45)</option>
                {Array.from({ length: 45 }, (_, i) => i + 1).map((w) => (
                  <option key={w} value={w}>
                    Ward {w}
                  </option>
                ))}
              </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto pt-2">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#EDE6D8] text-[#5C6A64] font-bold">
                    <th className="py-2.5">Project Title</th>
                    <th className="py-2.5">Category</th>
                    <th className="py-2.5">Ward / Locality</th>
                    <th className="py-2.5">Approved Budget</th>
                    <th className="py-2.5">Status Transition</th>
                    <th className="py-2.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDE6D8]">
                  {filteredProjects.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-[#5C6A64]">
                        No municipal projects match the selected criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredProjects.map((p) => (
                      <tr key={p.id} className="hover:bg-[#FAF7F0] transition">
                        <td className="py-3 font-bold text-[#194B35] max-w-xs">
                          <Link href={`/development/projects/${p.id}`} className="hover:underline block truncate">
                            {p.title}
                          </Link>
                          <div className="text-[10px] text-[#7A8880] truncate font-normal">
                            Agency: {p.implementing_agency || p.department}
                          </div>
                        </td>
                        <td className="py-3 text-[#5C6A64]">
                          {p.category_name}
                        </td>
                        <td className="py-3 text-[#5C6A64]">
                          {p.ward_number ? `Ward ${p.ward_number}` : "All Tanur"}
                          {p.locality ? ` • ${p.locality}` : ""}
                        </td>
                        <td className="py-3 font-mono font-bold text-[#194B35]">
                          {p.approved_budget || p.budget_sanctioned || "—"}
                        </td>
                        <td className="py-3">
                          <select
                            value={p.status}
                            onChange={(e) => handleStatusChange(p.id, e.target.value as ProjectStatus)}
                            className="px-2 py-1 rounded-lg text-[11px] font-bold bg-[#FAF7F0] border border-[#DDD5C5] text-[#194B35] focus:outline-hidden"
                          >
                            <option value="Proposed">Proposed</option>
                            <option value="Approved">Approved</option>
                            <option value="Planned">Planned</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Delayed">Delayed</option>
                            <option value="Completed">Completed</option>
                            <option value="On Hold">On Hold</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="py-3 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <Link
                              href={`/development/projects/${p.id}`}
                              title="View Public Details"
                              className="p-1.5 rounded-lg text-neutral-600 hover:text-[#194B35] hover:bg-[#FAF7F0] transition"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </Link>
                            <Link
                              href={`/admin/development/projects/${p.id}/edit`}
                              title="Edit Project & Add Milestones"
                              className="p-1.5 rounded-lg text-[#194B35] bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </Link>
                            <button
                              onClick={() => handleArchiveProject(p.id)}
                              title="Archive Project"
                              className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition"
                            >
                              <Archive className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
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
