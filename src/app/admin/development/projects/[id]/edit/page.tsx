"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { DevelopmentNav } from "@/components/development/DevelopmentNav";
import { useAuth } from "@/lib/auth/context";
import { 
  digitalMunicipalityStore, 
  TRANSPARENT_PROJECT_CATEGORIES,
  TANUR_LOCALITIES,
  TANUR_MUNICIPAL_WARDS 
} from "@/lib/data/digitalMunicipalityData";
import { 
  ProjectCategory, 
  ProjectStatus, 
  InformationSourceType,
  MilestoneType 
} from "@/types/digitalMunicipality";
import {
  HardHat,
  ArrowLeft,
  Save,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Plus,
  Trash2,
  Calendar,
  ExternalLink,
  Clock,
  Archive,
  Eye,
  Banknote,
  Building2,
  MapPin,
  TrendingUp,
  DollarSign,
  FileText,
  X
} from "lucide-react";

export default function EditDevelopmentProjectPage() {
  const params = useParams();
  const projectId = params?.id as string;
  const router = useRouter();
  const { role, user } = useAuth();
  const isAuthorized = role === "admin" || role === "moderator";

  const project = digitalMunicipalityStore.getProjectById(projectId);

  const [form, setForm] = useState({
    title: project?.title || "",
    description: project?.description || "",
    category: (project?.category || "roads_transportation") as ProjectCategory,
    locality: project?.locality || "Tanur Town",
    ward_number: project?.ward_number || 1,
    department: project?.department || "",
    implementing_agency: project?.implementing_agency || project?.department || "Tanur Municipal Engineering Wing",
    official_source_name: project?.official_source_name || "",
    official_source_url: project?.official_source_url || "",
    source_type: (project?.source_type || "official_published") as InformationSourceType,
    approved_budget: project?.approved_budget || project?.budget_sanctioned || "",
    estimated_cost: project?.estimated_cost || "",
    actual_expenditure: project?.actual_expenditure || "",
    funding_source: project?.funding_source || "Tanur Municipal Plan Fund",
    announcement_date: project?.announcement_date || "",
    approval_date: project?.approval_date || "",
    start_date: project?.start_date || "",
    expected_completion_date: project?.expected_completion_date || "",
    actual_completion_date: project?.actual_completion_date || "",
    status: (project?.status || "In Progress") as ProjectStatus,
    progress_percentage: project?.progress_percentage ?? 0,
    latitude: project?.latitude || 10.9768,
    longitude: project?.longitude || 75.8672,
    project_image: project?.project_image || "",
    contractor_name: project?.contractor_name || "",
    verification_status: project?.verification_status || "verified",
  });

  // Milestone Form Modal
  const [isMilestoneModalOpen, setIsMilestoneModalOpen] = useState(false);
  const [milestoneForm, setMilestoneForm] = useState({
    title: "",
    note: "",
    official_remarks: "",
    date: new Date().toISOString().split("T")[0],
    update_type: "progress" as MilestoneType,
    status_transition: (project?.status || "In Progress") as ProjectStatus,
    milestone_percentage: project?.progress_percentage ?? 0,
    evidence_url: "",
    verified_by: user?.display_name || user?.username || "Tanur Municipal Engineering Wing",
  });

  const [feedback, setFeedback] = useState<string | null>(null);

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3000);
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

  if (!project) {
    return (
      <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] flex flex-col font-sans">
        <Navbar />
        <DevelopmentNav />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl p-8 text-center border border-[#EDE6D8] shadow-card">
            <HardHat className="w-10 h-10 text-neutral-400 mx-auto mb-2" />
            <h3 className="text-base font-bold text-[#194B35]">Project Not Found in Ledger</h3>
            <p className="text-xs text-[#5C6A64] mt-1">The requested project ID does not exist or has been permanently archived.</p>
            <Link href="/admin/development/projects" className="mt-4 inline-block text-xs font-bold text-[#194B35] underline">
              Return to Projects Registry
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleProjectUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const actor = user?.display_name || user?.username || "Admin Officer";

    const catObj = TRANSPARENT_PROJECT_CATEGORIES.find((c) => c.key === form.category);
    const wardObj = TANUR_MUNICIPAL_WARDS.find((w) => w.ward_number === Number(form.ward_number));

    digitalMunicipalityStore.updateProject(project.id, {
      title: form.title,
      title_ml: form.title,
      description: form.description,
      description_ml: form.description,
      category: form.category,
      category_name: catObj?.label || "Public Infrastructure",
      category_name_ml: catObj?.label || "Public Infrastructure",
      locality: form.locality,
      ward_number: Number(form.ward_number),
      ward_name: wardObj?.ward_name || `Ward ${form.ward_number}`,
      department: form.department,
      implementing_agency: form.implementing_agency,
      official_source_name: form.official_source_name,
      official_source_url: form.official_source_url,
      source_type: form.source_type,
      budget_sanctioned: form.approved_budget,
      approved_budget: form.approved_budget,
      estimated_cost: form.estimated_cost,
      actual_expenditure: form.actual_expenditure,
      funding_source: form.funding_source,
      announcement_date: form.announcement_date,
      approval_date: form.approval_date || undefined,
      start_date: form.start_date || undefined,
      expected_completion_date: form.expected_completion_date || undefined,
      actual_completion_date: form.actual_completion_date || undefined,
      status: form.status,
      progress_percentage: Number(form.progress_percentage) || 0,
      latitude: Number(form.latitude) || undefined,
      longitude: Number(form.longitude) || undefined,
      project_image: form.project_image,
      contractor_name: form.contractor_name || undefined,
      verification_status: form.verification_status,
      last_verified_date: new Date().toISOString().split("T")[0],
    }, actor);

    showFeedback("Project record updated successfully in the municipal ledger!");
  };

  const handleAddMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!milestoneForm.title.trim()) return;

    digitalMunicipalityStore.addProjectProgressUpdate(project.id, {
      date: milestoneForm.date,
      title: milestoneForm.title,
      title_ml: milestoneForm.title,
      note: milestoneForm.note,
      note_ml: milestoneForm.note,
      official_remarks: milestoneForm.official_remarks || undefined,
      status_transition: milestoneForm.status_transition,
      milestone_percentage: Number(milestoneForm.milestone_percentage) || undefined,
      update_type: milestoneForm.update_type,
      evidence_url: milestoneForm.evidence_url || undefined,
      verified_by: milestoneForm.verified_by,
    });

    // Also update project current status if status transition specified
    if (milestoneForm.status_transition !== form.status) {
      setForm(prev => ({
        ...prev,
        status: milestoneForm.status_transition,
        progress_percentage: milestoneForm.milestone_percentage
      }));
    }

    setIsMilestoneModalOpen(false);
    showFeedback("New milestone and Measurement Book (MB) verification added!");
  };

  const handleArchive = () => {
    if (!confirm("Are you sure you want to archive this municipal project?")) return;
    digitalMunicipalityStore.archiveProject(project.id);
    router.push("/admin/development/projects");
  };

  const progressUpdates = project.progress_updates || [];

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] flex flex-col font-sans">
      <Navbar />
      <DevelopmentNav />

      <main className="flex-1 pb-24">
        {/* Header */}
        <div className="bg-gradient-to-b from-[#194B35] to-[#123626] text-white pt-8 pb-10 shadow-inner">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <Link
                  href="/admin/development/projects"
                  className="inline-flex items-center gap-1.5 text-xs text-[#C39A5B] font-bold mb-2 hover:underline"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Projects Registry</span>
                </Link>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Edit Project: {project.title}
                </h1>
                <p className="text-xs text-[#EDE6D8] mt-1">
                  ID: {project.id} • Category: {project.category_name} • Current Status: {project.status}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/development/projects/${project.id}`}
                  target="_blank"
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Public View</span>
                </Link>
                <button
                  onClick={handleArchive}
                  className="px-3.5 py-2 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-white text-xs font-bold transition flex items-center gap-1"
                >
                  <Archive className="w-3.5 h-3.5" />
                  <span>Archive</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {feedback && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-4 mb-4">
            <div className="p-4 rounded-2xl bg-emerald-700 text-white text-xs font-semibold flex items-center gap-2 shadow-lg animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-[#C39A5B]" />
              <span>{feedback}</span>
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-6 space-y-8">
          
          {/* Main Edit Form */}
          <form onSubmit={handleProjectUpdate} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE6D8] shadow-card space-y-6 text-xs">
            <div className="flex items-center justify-between border-b border-[#EDE6D8] pb-3">
              <h3 className="text-base font-bold text-[#194B35]">
                Project Core Specifications
              </h3>
              <span className="text-[11px] font-bold text-[#7A8880]">
                Last Verified: {project.last_verified_date || "2024-11-15"}
              </span>
            </div>

            {/* Title */}
            <div>
              <label className="font-bold text-[#1A2420] block mb-1">Project Title *</label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-hidden focus:border-[#194B35]"
              />
            </div>

            {/* Category & Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-[#1A2420] block mb-1">Category (9 Statutory) *</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value as ProjectCategory })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-hidden focus:border-[#194B35]"
                >
                  {TRANSPARENT_PROJECT_CATEGORIES.map((c) => (
                    <option key={c.key} value={c.key}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-[#1A2420] block mb-1">Status (8 Statutory) *</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as ProjectStatus })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-hidden focus:border-[#194B35]"
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
              </div>
            </div>

            {/* Scope */}
            <div>
              <label className="font-bold text-[#1A2420] block mb-1">Detailed Engineering Scope *</label>
              <textarea
                rows={4}
                required
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-hidden focus:border-[#194B35]"
              />
            </div>

            {/* Three-Way Budget Breakdown Matrix */}
            <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] space-y-4">
              <div className="flex items-center gap-2">
                <Banknote className="w-4 h-4 text-[#C39A5B]" />
                <span className="font-bold text-[#194B35] text-xs uppercase tracking-wider">
                  Three-Way Budget Breakdown
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-[#1A2420] block mb-1">
                    Approved Budget (Administrative Sanction) *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.approved_budget}
                    onChange={(e) => setForm({ ...form, approved_budget: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-white text-[#1A2420] focus:outline-hidden focus:border-[#194B35]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#1A2420] block mb-1">
                    Estimated Cost (DPR Proposal)
                  </label>
                  <input
                    type="text"
                    value={form.estimated_cost}
                    onChange={(e) => setForm({ ...form, estimated_cost: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-white text-[#1A2420] focus:outline-hidden focus:border-[#194B35]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#1A2420] block mb-1">
                    Actual Expenditure (Audited)
                  </label>
                  <input
                    type="text"
                    value={form.actual_expenditure}
                    onChange={(e) => setForm({ ...form, actual_expenditure: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-white text-[#1A2420] focus:outline-hidden focus:border-[#194B35]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#1A2420] block mb-1">Funding Scheme</label>
                  <input
                    type="text"
                    value={form.funding_source}
                    onChange={(e) => setForm({ ...form, funding_source: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-white text-[#1A2420]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#1A2420] block mb-1">Implementing Agency</label>
                  <input
                    type="text"
                    value={form.implementing_agency}
                    onChange={(e) => setForm({ ...form, implementing_agency: e.target.value, department: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-white text-[#1A2420]"
                  />
                </div>
              </div>
            </div>

            {/* Ward 1 to 45 & Locality */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="font-bold text-[#1A2420] block mb-1">Ward (1–45) *</label>
                <select
                  value={form.ward_number}
                  onChange={(e) => setForm({ ...form, ward_number: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                >
                  {Array.from({ length: 45 }, (_, i) => i + 1).map((w) => (
                    <option key={w} value={w}>
                      Ward {w}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-[#1A2420] block mb-1">Locality</label>
                <input
                  type="text"
                  value={form.locality}
                  onChange={(e) => setForm({ ...form, locality: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>

              <div>
                <label className="font-bold text-[#1A2420] block mb-1">Contractor</label>
                <input
                  type="text"
                  value={form.contractor_name}
                  onChange={(e) => setForm({ ...form, contractor_name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="font-bold text-[#1A2420] block mb-1">Announcement Date</label>
                <input
                  type="date"
                  value={form.announcement_date}
                  onChange={(e) => setForm({ ...form, announcement_date: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>

              <div>
                <label className="font-bold text-[#1A2420] block mb-1">Sanction Date</label>
                <input
                  type="date"
                  value={form.approval_date}
                  onChange={(e) => setForm({ ...form, approval_date: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>

              <div>
                <label className="font-bold text-[#1A2420] block mb-1">Start Date</label>
                <input
                  type="date"
                  value={form.start_date}
                  onChange={(e) => setForm({ ...form, start_date: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>

              <div>
                <label className="font-bold text-[#1A2420] block mb-1">Expected Completion</label>
                <input
                  type="date"
                  value={form.expected_completion_date}
                  onChange={(e) => setForm({ ...form, expected_completion_date: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>
            </div>

            {/* Progress & GPS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="font-bold text-[#1A2420] block mb-1">Physical Completion (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={form.progress_percentage}
                  onChange={(e) => setForm({ ...form, progress_percentage: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>

              <div>
                <label className="font-bold text-[#1A2420] block mb-1">Latitude</label>
                <input
                  type="number"
                  step="0.0001"
                  value={form.latitude}
                  onChange={(e) => setForm({ ...form, latitude: parseFloat(e.target.value) || 10.9768 })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>

              <div>
                <label className="font-bold text-[#1A2420] block mb-1">Longitude</label>
                <input
                  type="number"
                  step="0.0001"
                  value={form.longitude}
                  onChange={(e) => setForm({ ...form, longitude: parseFloat(e.target.value) || 75.8672 })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>
            </div>

            {/* Photo & Source URL */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-[#1A2420] block mb-1">Project Photo URL</label>
                <input
                  type="url"
                  value={form.project_image}
                  onChange={(e) => setForm({ ...form, project_image: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>

              <div>
                <label className="font-bold text-[#1A2420] block mb-1">Official Reference URL</label>
                <input
                  type="url"
                  value={form.official_source_url}
                  onChange={(e) => setForm({ ...form, official_source_url: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#EDE6D8] flex items-center justify-between">
              <Link
                href="/admin/development/projects"
                className="px-4 py-2.5 rounded-xl text-neutral-600 hover:bg-neutral-100 font-bold transition"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#194B35] hover:bg-[#123626] text-white font-extrabold transition shadow-xs flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Project Modifications</span>
              </button>
            </div>
          </form>

          {/* Section 2: Progress Milestones & Measurement Book Log */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE6D8] shadow-card space-y-5">
            <div className="flex items-center justify-between border-b border-[#EDE6D8] pb-4">
              <div>
                <h3 className="text-base font-bold text-[#194B35] flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#C39A5B]" />
                  <span>Progress Milestones & MB Inspection Audit</span>
                </h3>
                <p className="text-xs text-[#5C6A64] mt-0.5">
                  Append certified Measurement Book recordings, site inspections, and official engineering remarks.
                </p>
              </div>

              <button
                onClick={() => setIsMilestoneModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-[#C39A5B] hover:bg-[#b0874a] text-[#194B35] text-xs font-extrabold transition shadow-xs flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Milestone Update</span>
              </button>
            </div>

            {progressUpdates.length === 0 ? (
              <div className="p-6 text-center bg-[#FAF7F0] rounded-2xl border border-[#EDE6D8] text-xs text-[#5C6A64]">
                No progress milestones recorded yet for this project. Click the button above to add the initial inspection update.
              </div>
            ) : (
              <div className="space-y-3">
                {progressUpdates.map((u, i) => (
                  <div key={u.id || i} className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] space-y-1.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-bold text-xs text-[#194B35]">{u.title}</span>
                      <div className="flex items-center gap-2 text-[11px] text-[#7A8880]">
                        <span>{u.date}</span>
                        {u.status_transition && (
                          <span className="font-bold px-2 py-0.5 rounded-md bg-white border border-[#DDD5C5] text-[#194B35]">
                            Status: {u.status_transition}
                          </span>
                        )}
                        <span>Verified by: {u.verified_by || "Municipal Wing"}</span>
                      </div>
                    </div>
                    <p className="text-xs text-[#5C6A64] leading-relaxed">{u.note}</p>
                    {u.official_remarks && (
                      <p className="text-[11px] italic text-[#194B35] bg-white p-2 rounded-lg border border-[#EDE6D8]">
                        Official Remark: {u.official_remarks}
                      </p>
                    )}
                    {u.evidence_url && (
                      <div className="pt-1">
                        <a
                          href={u.evidence_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-bold text-[#194B35] hover:text-[#C39A5B] inline-flex items-center gap-1"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>View Evidence Document</span>
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Add Milestone Modal */}
      {isMilestoneModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#EDE6D8] shadow-2xl relative space-y-4">
            <button
              onClick={() => setIsMilestoneModalOpen(false)}
              className="absolute right-5 top-5 p-1 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#194B35]" />
              <h3 className="text-base font-bold text-[#194B35]">
                Record Measurement Book (MB) Milestone
              </h3>
            </div>

            <form onSubmit={handleAddMilestone} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-[#1A2420] block mb-1">Milestone Title *</label>
                <input
                  type="text"
                  required
                  value={milestoneForm.title}
                  onChange={(e) => setMilestoneForm({ ...milestoneForm, title: e.target.value })}
                  placeholder="e.g. Foundation Concrete Inspection & MB Recording"
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#1A2420] block mb-1">Inspection Date *</label>
                  <input
                    type="date"
                    required
                    value={milestoneForm.date}
                    onChange={(e) => setMilestoneForm({ ...milestoneForm, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#1A2420] block mb-1">Status Transition</label>
                  <select
                    value={milestoneForm.status_transition}
                    onChange={(e) => setMilestoneForm({ ...milestoneForm, status_transition: e.target.value as ProjectStatus })}
                    className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
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
                </div>
              </div>

              <div>
                <label className="font-bold text-[#1A2420] block mb-1">Inspection Notes & Findings *</label>
                <textarea
                  rows={3}
                  required
                  value={milestoneForm.note}
                  onChange={(e) => setMilestoneForm({ ...milestoneForm, note: e.target.value })}
                  placeholder="Details of physical inspection, completed components, or noted constraints..."
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>

              <div>
                <label className="font-bold text-[#1A2420] block mb-1">Official Engineering Remarks</label>
                <input
                  type="text"
                  value={milestoneForm.official_remarks}
                  onChange={(e) => setMilestoneForm({ ...milestoneForm, official_remarks: e.target.value })}
                  placeholder="e.g. Certified by AEE. Passed structural load pre-check."
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#1A2420] block mb-1">Physical Completion (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={milestoneForm.milestone_percentage}
                    onChange={(e) => setMilestoneForm({ ...milestoneForm, milestone_percentage: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#1A2420] block mb-1">Verifying Authority</label>
                  <input
                    type="text"
                    value={milestoneForm.verified_by}
                    onChange={(e) => setMilestoneForm({ ...milestoneForm, verified_by: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#1A2420] block mb-1">Evidence / Report URL (Optional)</label>
                <input
                  type="url"
                  value={milestoneForm.evidence_url}
                  onChange={(e) => setMilestoneForm({ ...milestoneForm, evidence_url: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsMilestoneModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-neutral-600 hover:bg-neutral-100 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#194B35] hover:bg-[#123626] text-white font-bold transition shadow-xs"
                >
                  Save Milestone Update
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
