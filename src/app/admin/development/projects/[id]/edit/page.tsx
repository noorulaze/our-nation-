"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { DevelopmentNav } from "@/components/development/DevelopmentNav";
import { useLanguage } from "@/lib/i18n/context";
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
  Eye
} from "lucide-react";

export default function EditDevelopmentProjectPage() {
  const params = useParams();
  const projectId = params?.id as string;
  const router = useRouter();
  const { language } = useLanguage();
  const { role, user } = useAuth();
  const isAuthorized = role === "admin" || role === "moderator";

  const project = digitalMunicipalityStore.getProjectById(projectId);

  const [form, setForm] = useState({
    title: project?.title || "",
    title_ml: project?.title_ml || "",
    description: project?.description || "",
    description_ml: project?.description_ml || "",
    category: (project?.category || "roads_transport") as ProjectCategory,
    locality: project?.locality || "Tanur Town",
    ward_number: project?.ward_number || 1,
    department: project?.department || "",
    department_ml: project?.department_ml || "",
    official_source_name: project?.official_source_name || "",
    official_source_url: project?.official_source_url || "",
    source_type: (project?.source_type || "official_published") as InformationSourceType,
    budget_sanctioned: project?.budget_sanctioned || "",
    announcement_date: project?.announcement_date || "",
    approval_date: project?.approval_date || "",
    start_date: project?.start_date || "",
    expected_completion_date: project?.expected_completion_date || "",
    status: (project?.status || "In Progress") as ProjectStatus,
    progress_percentage: project?.progress_percentage ?? 0,
    latitude: project?.latitude || 10.9768,
    longitude: project?.longitude || 75.8672,
    project_image: project?.project_image || "",
    contractor_name: project?.contractor_name || "",
  });

  // Milestone Form
  const [isMilestoneModalOpen, setIsMilestoneModalOpen] = useState(false);
  const [milestoneForm, setMilestoneForm] = useState({
    title: "",
    title_ml: "",
    note: "",
    note_ml: "",
    date: new Date().toISOString().split("T")[0],
    update_type: "progress" as MilestoneType,
    evidence_url: "",
    verified_by: user?.display_name || user?.username || "Tanur Engineering Dept",
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
          <div className="max-w-md w-full bg-white rounded-3xl border border-[#EAE4D7] p-8 text-center shadow-card">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-[#B87A1E] flex items-center justify-center mx-auto mb-4 border border-amber-200">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold font-malayalam-serif text-[#1A2420]">
              അഡ്മിൻ പ്രവേശനം ആവശ്യമാണ്
            </h2>
            <div className="mt-6">
              <Link
                href="/development"
                className="w-full py-2.5 rounded-xl bg-[#194B35] text-white font-bold text-xs transition inline-block text-center"
              >
                മടങ്ങുക
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
      <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] flex flex-col">
        <Navbar />
        <DevelopmentNav />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl p-8 text-center border border-[#EDE6D8]">
            <HardHat className="w-10 h-10 text-neutral-400 mx-auto mb-2" />
            <h3 className="text-base font-bold text-[#194B35]">പദ്ധതി കണ്ടെത്തിയില്ല</h3>
            <Link href="/admin/development/projects" className="mt-4 inline-block text-xs font-bold text-[#194B35] underline">
              പട്ടികയിലേക്ക് മടങ്ങുക
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleProjectUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const actor = user?.display_name || user?.username || "Admin";

    const catObj = TRANSPARENT_PROJECT_CATEGORIES.find((c) => c.key === form.category);
    const wardObj = TANUR_MUNICIPAL_WARDS.find((w) => w.ward_number === Number(form.ward_number));

    digitalMunicipalityStore.updateProject(project.id, {
      title: form.title,
      title_ml: form.title_ml,
      description: form.description,
      description_ml: form.description_ml,
      category: form.category,
      category_name: catObj?.label || "Development",
      category_name_ml: catObj?.label_ml || "വികസനം",
      locality: form.locality,
      ward_number: Number(form.ward_number),
      ward_name: wardObj?.ward_name || `Ward ${form.ward_number}`,
      ward_name_ml: wardObj?.ward_name_ml || `വാർഡ് ${form.ward_number}`,
      department: form.department,
      department_ml: form.department_ml,
      official_source_name: form.official_source_name,
      official_source_url: form.official_source_url,
      source_type: form.source_type,
      budget_sanctioned: form.budget_sanctioned,
      announcement_date: form.announcement_date,
      approval_date: form.approval_date || undefined,
      start_date: form.start_date || undefined,
      expected_completion_date: form.expected_completion_date || undefined,
      status: form.status,
      progress_percentage: Number(form.progress_percentage) || 0,
      latitude: Number(form.latitude) || undefined,
      longitude: Number(form.longitude) || undefined,
      project_image: form.project_image,
      contractor_name: form.contractor_name || undefined,
      last_verified_date: new Date().toISOString().split("T")[0],
    }, actor);

    showFeedback("പദ്ധതി വിവരങ്ങൾ വിജയകരമായി പുതുക്കി!");
  };

  const handleAddMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!milestoneForm.title.trim()) return;

    digitalMunicipalityStore.addProjectProgressUpdate(project.id, {
      date: milestoneForm.date,
      title: milestoneForm.title,
      title_ml: milestoneForm.title_ml || milestoneForm.title,
      note: milestoneForm.note,
      note_ml: milestoneForm.note_ml || milestoneForm.note,
      update_type: milestoneForm.update_type,
      evidence_url: milestoneForm.evidence_url || undefined,
      verified_by: milestoneForm.verified_by,
    });

    setIsMilestoneModalOpen(false);
    showFeedback("പുതിയ നാൾവഴി / ഇൻസ്പെക്ഷൻ റിപ്പോർട്ട് ചേർത്തു!");
  };

  const handleArchive = () => {
    if (!confirm("ഈ പദ്ധതി ആർക്കൈവ് ചെയ്യാൻ ഉറപ്പാണോ?")) return;
    digitalMunicipalityStore.archiveProject(project.id);
    router.push("/admin/development/projects");
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] flex flex-col font-sans">
      <Navbar />
      <DevelopmentNav />

      <main className="flex-1 pb-24">
        {/* Header */}
        <div className="bg-gradient-to-b from-[#194B35] to-[#123626] text-white pt-8 pb-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <Link
                  href="/admin/development/projects"
                  className="inline-flex items-center gap-1.5 text-xs text-[#C39A5B] font-bold mb-2 hover:underline"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>പദ്ധതി പട്ടികയിലേക്ക് മടങ്ങുക</span>
                </Link>
                <h1 className="text-2xl sm:text-3xl font-extrabold font-malayalam-heading text-white">
                  പദ്ധതി എഡിറ്റ് ചെയ്യുക: {project.title_ml}
                </h1>
                <p className="text-xs text-[#EDE6D8] mt-1">
                  ID: {project.id} • Category: {project.category_name} • Status: {project.status}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/development/projects/${project.id}`}
                  target="_blank"
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Live Page</span>
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
            <div className="p-4 rounded-2xl bg-emerald-700 text-white text-xs font-semibold flex items-center gap-2 shadow-lg">
              <CheckCircle2 className="w-4 h-4 text-amber-300" />
              <span>{feedback}</span>
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-6 space-y-8">
          {/* Main Edit Form */}
          <form onSubmit={handleProjectUpdate} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE6D8] shadow-xs space-y-6 text-xs">
            <h3 className="text-base font-bold font-malayalam-heading text-[#194B35] border-b border-[#EDE6D8] pb-3">
              പദ്ധതി പ്രധാന വിവരങ്ങൾ (Project Core Information)
            </h3>

            {/* Title */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-[#1A2420] block mb-1">പദ്ധതി പേര് (മലയാളത്തിൽ) *</label>
                <input
                  type="text"
                  required
                  value={form.title_ml}
                  onChange={(e) => setForm({ ...form, title_ml: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>

              <div>
                <label className="font-bold text-[#1A2420] block mb-1">Project Title (English) *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>
            </div>

            {/* Category & Status */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="font-bold text-[#1A2420] block mb-1">വിഭാഗം (Category)</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value as ProjectCategory })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                >
                  {TRANSPARENT_PROJECT_CATEGORIES.map((c) => (
                    <option key={c.key} value={c.key}>
                      {c.label_ml}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-[#1A2420] block mb-1">അവസ്ഥ (Current Status)</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as ProjectStatus })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                >
                  <option value="Proposed">Proposed</option>
                  <option value="Announced">Announced</option>
                  <option value="Approved">Approved</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Delayed">Delayed</option>
                  <option value="On Hold">On Hold</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-[#1A2420] block mb-1">പുരോഗതി % (Progress Percentage)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={form.progress_percentage}
                  onChange={(e) => setForm({ ...form, progress_percentage: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>
            </div>

            {/* Locality & Ward */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-[#1A2420] block mb-1">പ്രദേശം (Locality)</label>
                <select
                  value={form.locality}
                  onChange={(e) => setForm({ ...form, locality: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                >
                  {TANUR_LOCALITIES.map((l) => (
                    <option key={l.id} value={l.name}>
                      {l.name_ml} ({l.name})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-[#1A2420] block mb-1">വാർഡ് നമ്പർ</label>
                <select
                  value={form.ward_number}
                  onChange={(e) => setForm({ ...form, ward_number: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                >
                  {TANUR_MUNICIPAL_WARDS.map((w) => (
                    <option key={w.id} value={w.ward_number}>
                      Ward {w.ward_number}: {w.ward_name_ml}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-[#1A2420] block mb-1">വിശദീകരണം (മലയാളത്തിൽ)</label>
                <textarea
                  rows={4}
                  value={form.description_ml}
                  onChange={(e) => setForm({ ...form, description_ml: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>

              <div>
                <label className="font-bold text-[#1A2420] block mb-1">Description (English)</label>
                <textarea
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>
            </div>

            {/* Department & Budget */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-[#1A2420] block mb-1">നിർവ്വഹണ വകുപ്പ്</label>
                <input
                  type="text"
                  value={form.department_ml}
                  onChange={(e) => setForm({ ...form, department_ml: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>

              <div>
                <label className="font-bold text-[#1A2420] block mb-1">അനുവദിച്ച ബജറ്റ്</label>
                <input
                  type="text"
                  value={form.budget_sanctioned}
                  onChange={(e) => setForm({ ...form, budget_sanctioned: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="font-bold text-[#1A2420] block mb-1">പ്രഖ്യാപന തീയതി</label>
                <input
                  type="date"
                  value={form.announcement_date}
                  onChange={(e) => setForm({ ...form, announcement_date: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>
              <div>
                <label className="font-bold text-[#1A2420] block mb-1">അംഗീകാര തീയതി</label>
                <input
                  type="date"
                  value={form.approval_date}
                  onChange={(e) => setForm({ ...form, approval_date: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>
              <div>
                <label className="font-bold text-[#1A2420] block mb-1">തുടങ്ങിയ തീയതി</label>
                <input
                  type="date"
                  value={form.start_date}
                  onChange={(e) => setForm({ ...form, start_date: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>
              <div>
                <label className="font-bold text-[#1A2420] block mb-1">പൂർത്തീകരണ തീയതി</label>
                <input
                  type="date"
                  value={form.expected_completion_date}
                  onChange={(e) => setForm({ ...form, expected_completion_date: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>
            </div>

            {/* Coordinates */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="font-bold text-[#1A2420] block mb-1">Latitude</label>
                <input
                  type="number"
                  step="any"
                  value={form.latitude}
                  onChange={(e) => setForm({ ...form, latitude: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>
              <div>
                <label className="font-bold text-[#1A2420] block mb-1">Longitude</label>
                <input
                  type="number"
                  step="any"
                  value={form.longitude}
                  onChange={(e) => setForm({ ...form, longitude: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>
              <div>
                <label className="font-bold text-[#1A2420] block mb-1">കരാറുകാരൻ / ഏജൻസി</label>
                <input
                  type="text"
                  value={form.contractor_name}
                  onChange={(e) => setForm({ ...form, contractor_name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#EDE6D8] flex justify-end gap-3">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#194B35] hover:bg-[#123626] text-white font-bold transition shadow-sm flex items-center gap-1.5"
              >
                <Save className="w-4 h-4 text-[#C39A5B]" />
                <span>മാറ്റങ്ങൾ സേവ് ചെയ്യുക (Update Project)</span>
              </button>
            </div>
          </form>

          {/* Timeline & Milestones Management */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE6D8] shadow-xs space-y-5 text-xs">
            <div className="flex items-center justify-between border-b border-[#EDE6D8] pb-4">
              <div>
                <h3 className="text-base font-bold font-malayalam-heading text-[#194B35] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#C39A5B]" />
                  <span>പദ്ധതി നാൾവഴികൾ & മൈൽസ്റ്റോണുകൾ (Timeline Milestones)</span>
                </h3>
                <p className="text-xs text-[#5C6A64]">
                  പുതിയ ഇൻസ്പെക്ഷൻ റിപ്പോർട്ടുകൾ, വർക്ക് ഓർഡറുകൾ, ഫീൽഡ് പുരോഗതികൾ ചേർക്കുക
                </p>
              </div>

              <button
                onClick={() => setIsMilestoneModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-[#194B35] hover:bg-[#123626] text-white text-xs font-bold transition flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4 text-[#C39A5B]" />
                <span>+ പുതിയ നാൾവഴി ചേർക്കുക</span>
              </button>
            </div>

            <div className="space-y-3">
              {project.progress_updates.map((upd) => (
                <div key={upd.id} className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-[#194B35]">{upd.title_ml || upd.title}</span>
                      <span className="text-[10px] text-[#C39A5B] font-bold bg-[#C39A5B]/10 px-2 py-0.5 rounded">
                        {upd.date}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#5C6A64]">{upd.note_ml || upd.note}</p>
                    <div className="text-[10px] text-[#7A8880] mt-1">Verified by: {upd.verified_by}</div>
                  </div>

                  {upd.evidence_url && (
                    <a
                      href={upd.evidence_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-[#194B35] hover:underline inline-flex items-center gap-1 shrink-0"
                    >
                      <span>Evidence</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Add Milestone Modal */}
      {isMilestoneModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#EDE6D8] shadow-2xl space-y-4 text-xs">
            <h3 className="text-base font-bold font-malayalam-heading text-[#194B35]">
              പുതിയ ടൈംലൈൻ മൈൽസ്റ്റോൺ ചേർക്കുക
            </h3>

            <form onSubmit={handleAddMilestone} className="space-y-3.5">
              <div>
                <label className="font-bold text-[#1A2420] block mb-1">തീയതി (Date) *</label>
                <input
                  type="date"
                  required
                  value={milestoneForm.date}
                  onChange={(e) => setMilestoneForm({ ...milestoneForm, date: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>

              <div>
                <label className="font-bold text-[#1A2420] block mb-1">മൈൽസ്റ്റോൺ തരം (Update Type)</label>
                <select
                  value={milestoneForm.update_type}
                  onChange={(e) => setMilestoneForm({ ...milestoneForm, update_type: e.target.value as MilestoneType })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                >
                  <option value="announcement">Announcement (പ്രഖ്യാപനം)</option>
                  <option value="approval">Official Approval (ഔദ്യോഗിക അനുമതി)</option>
                  <option value="commencement">Commencement (നിർമ്മാണം ആരംഭിച്ചു)</option>
                  <option value="progress">Progress Update (പ്രവർത്തന പുരോഗതി)</option>
                  <option value="inspection">Field Inspection (ഫീൽഡ് പരിശോധന)</option>
                  <option value="completion">Completion Confirmation (പൂർത്തീകരണ സ്ഥിരീകരണം)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-[#1A2420] block mb-1">തലക്കെട്ട് (മലയാളത്തിൽ) *</label>
                <input
                  type="text"
                  required
                  value={milestoneForm.title_ml}
                  onChange={(e) => setMilestoneForm({ ...milestoneForm, title_ml: e.target.value })}
                  placeholder="ഉദാ: മൂന്നാം ഘട്ട ടാറിംഗ് പൂർത്തിയായി..."
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>

              <div>
                <label className="font-bold text-[#1A2420] block mb-1">Title (English)</label>
                <input
                  type="text"
                  value={milestoneForm.title}
                  onChange={(e) => setMilestoneForm({ ...milestoneForm, title: e.target.value })}
                  placeholder="e.g. Phase 3 Tarring Completed..."
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>

              <div>
                <label className="font-bold text-[#1A2420] block mb-1">വിശദാംശങ്ങൾ (Notes)</label>
                <textarea
                  rows={3}
                  value={milestoneForm.note_ml}
                  onChange={(e) => setMilestoneForm({ ...milestoneForm, note_ml: e.target.value, note: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>

              <div>
                <label className="font-bold text-[#1A2420] block mb-1">തെളിവ് / റിപ്പോർട്ട് ലിങ്ക് (Evidence URL)</label>
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
                  മൈൽസ്റ്റോൺ ചേർക്കുക
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
