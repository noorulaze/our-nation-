"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { DevelopmentNav } from "@/components/development/DevelopmentNav";
import { useLanguage } from "@/lib/i18n/context";
import { useAuth } from "@/lib/auth/context";
import { 
  digitalMunicipalityStore, 
  TRANSPARENT_PROJECT_CATEGORIES 
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
  Eye
} from "lucide-react";

export default function AdminProjectsDirectoryPage() {
  const { language } = useLanguage();
  const { role, user } = useAuth();
  const isAuthorized = role === "admin" || role === "moderator";

  const [projects, setProjects] = useState<DevelopmentProject[]>(() => digitalMunicipalityStore.getProjects());
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<ProjectCategory | "all">("all");
  const [feedback, setFeedback] = useState<string | null>(null);

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3000);
  };

  const refreshProjects = () => {
    setProjects(digitalMunicipalityStore.getProjects());
  };

  const handleStatusChange = (projectId: string, newStatus: ProjectStatus) => {
    const actor = user?.display_name || user?.username || "Admin";
    digitalMunicipalityStore.updateProject(projectId, { status: newStatus }, actor);
    refreshProjects();
    showFeedback(`പദ്ധതിയുടെ സ്റ്റാറ്റസ് ${newStatus} ആയി മാറ്റി.`);
  };

  const handleArchiveProject = (projectId: string) => {
    if (!confirm("ഈ പ്രൊജക്റ്റ് ആർക്കൈവ് ചെയ്യാൻ ഉറപ്പാണോ?")) return;
    digitalMunicipalityStore.archiveProject(projectId);
    refreshProjects();
    showFeedback("പദ്ധതി ആർക്കൈവ് ചെയ്തു.");
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        if (!p.title.toLowerCase().includes(q) && !p.title_ml.toLowerCase().includes(q)) {
          return false;
        }
      }
      if (statusFilter !== "all" && p.status !== statusFilter) return false;
      if (categoryFilter !== "all" && p.category !== categoryFilter) return false;
      return true;
    });
  }, [projects, searchTerm, statusFilter, categoryFilter]);

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
            <p className="text-xs text-[#5C6A64] mt-2">
              ഈ പേജ് താനൂർ നഗരസഭാ അഡ്മിനിസ്ട്രേറ്റർമാർക്ക് മാത്രമുള്ളതാണ്.
            </p>
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

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] flex flex-col font-sans">
      <Navbar />
      <DevelopmentNav />

      <main className="flex-1 pb-24">
        {/* Header */}
        <div className="bg-gradient-to-b from-[#194B35] to-[#123626] text-white pt-8 pb-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs text-[#C39A5B] font-bold mb-2">
                  <Link href="/admin/development" className="hover:underline flex items-center gap-1">
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>അഡ്മിൻ കൺസോൾ</span>
                  </Link>
                  <span>/</span>
                  <span>പദ്ധതി രജിസ്ട്രി</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold font-malayalam-heading text-white">
                  പദ്ധതി മാനേജ്‌മെന്റ് ഡയറക്ടറി
                </h1>
                <p className="text-xs text-[#EDE6D8] mt-1">
                  താനൂർ നഗരസഭയിലെ മുഴുവൻ വികസന പദ്ധതികളുടെയും പൂർണ്ണ നിയന്ത്രണം
                </p>
              </div>

              <Link
                href="/admin/development/projects/new"
                className="px-4 py-2.5 rounded-xl bg-[#C39A5B] hover:bg-[#b0874a] text-[#194B35] text-xs font-extrabold transition shadow-sm flex items-center gap-1.5 self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>പുതിയ പദ്ധതി രജിസ്റ്റർ ചെയ്യുക</span>
              </Link>
            </div>
          </div>
        </div>

        {feedback && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 mb-4">
            <div className="p-3.5 rounded-2xl bg-[#194B35] text-white text-xs font-semibold flex items-center gap-2 shadow-lg">
              <CheckCircle2 className="w-4 h-4 text-amber-300" />
              <span>{feedback}</span>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
          <div className="bg-white rounded-3xl p-5 border border-[#EDE6D8] shadow-xs space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-[#7A8880] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="പേര് തിരയുക..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-[#FAF7F0] border border-[#DDD5C5] text-[#1A2420]"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-3 py-2 rounded-xl text-xs bg-[#FAF7F0] border border-[#DDD5C5] text-[#1A2420]"
              >
                <option value="all">എല്ലാ അവസ്ഥകളും (All Statuses)</option>
                <option value="Proposed">Proposed</option>
                <option value="Announced">Announced</option>
                <option value="Approved">Approved</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Delayed">Delayed</option>
                <option value="On Hold">On Hold</option>
              </select>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value as any)}
                className="px-3 py-2 rounded-xl text-xs bg-[#FAF7F0] border border-[#DDD5C5] text-[#1A2420]"
              >
                <option value="all">എല്ലാ വിഭാഗങ്ങളും (All Categories)</option>
                {TRANSPARENT_PROJECT_CATEGORIES.map((c) => (
                  <option key={c.key} value={c.key}>
                    {c.label_ml}
                  </option>
                ))}
              </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto pt-2">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#EDE6D8] text-[#5C6A64] font-bold">
                    <th className="py-2.5">പദ്ധതി പേര്</th>
                    <th className="py-2.5">വിഭാഗം</th>
                    <th className="py-2.5">പ്രദേശം / വാർഡ്</th>
                    <th className="py-2.5">ബജറ്റ്</th>
                    <th className="py-2.5">അവസ്ഥ</th>
                    <th className="py-2.5 text-right">നടപടികൾ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDE6D8]">
                  {filteredProjects.map((p) => (
                    <tr key={p.id} className="hover:bg-[#FAF7F0]">
                      <td className="py-3 font-bold text-[#194B35] max-w-xs">
                        <div>{p.title_ml}</div>
                        <div className="text-[10px] text-[#7A8880] truncate font-normal">{p.title}</div>
                      </td>
                      <td className="py-3 text-[#5C6A64]">{p.category_name_ml}</td>
                      <td className="py-3 text-[#5C6A64]">
                        {p.locality || "Tanur"} {p.ward_number ? `(W${p.ward_number})` : ""}
                      </td>
                      <td className="py-3 font-mono font-bold text-[#194B35]">{p.budget_sanctioned}</td>
                      <td className="py-3">
                        <select
                          value={p.status}
                          onChange={(e) => handleStatusChange(p.id, e.target.value as ProjectStatus)}
                          className="px-2 py-1 rounded-lg text-[11px] font-bold bg-[#FAF7F0] border border-[#DDD5C5] text-[#194B35]"
                        >
                          <option value="Proposed">Proposed</option>
                          <option value="Announced">Announced</option>
                          <option value="Approved">Approved</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Delayed">Delayed</option>
                          <option value="On Hold">On Hold</option>
                        </select>
                      </td>
                      <td className="py-3 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <Link
                            href={`/development/projects/${p.id}`}
                            title="View Public Page"
                            className="p-1.5 rounded-lg text-neutral-600 hover:text-[#194B35] hover:bg-neutral-100"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </Link>
                          <Link
                            href={`/admin/development/projects/${p.id}/edit`}
                            title="Edit Project & Milestones"
                            className="p-1.5 rounded-lg text-[#194B35] bg-emerald-50 hover:bg-emerald-100 border border-emerald-200"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => handleArchiveProject(p.id)}
                            title="Archive Project"
                            className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-600 hover:bg-rose-50"
                          >
                            <Archive className="w-3.5 h-3.5" />
                          </button>
                        </div>
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
