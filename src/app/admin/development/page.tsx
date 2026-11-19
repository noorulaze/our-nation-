"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { DevelopmentNav } from "@/components/development/DevelopmentNav";
import { useLanguage } from "@/lib/i18n/context";
import { useAuth } from "@/lib/auth/context";
import { 
  digitalMunicipalityStore 
} from "@/lib/data/digitalMunicipalityData";
import { 
  DevelopmentProject, 
  ProjectContribution, 
  ProjectAuditLog,
  ContributionStatus 
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
  Search
} from "lucide-react";

export default function AdminDevelopmentDashboard() {
  const { language } = useLanguage();
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
    const reviewer = user?.display_name || user?.username || "Admin";
    digitalMunicipalityStore.updateProjectContributionStatus(id, status, note, reviewer);
    refreshAll();
    showFeedback(`സമർപ്പണം ${status === "approved" ? "അംഗീകരിച്ചു" : "നിരസിച്ചു"} (Contribution ${status}).`);
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
            <p className="text-xs text-[#5C6A64] mt-2 leading-relaxed">
              ഈ കൺട്രോൾ സെന്റർ താനൂർ നഗരസഭാ അഡ്മിനിസ്ട്രേറ്റർമാർക്കും മോഡറേറ്റർമാർക്കും മാത്രമുള്ളതാണ്.
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <Link
                href="/development"
                className="w-full py-2.5 rounded-xl bg-[#194B35] hover:bg-[#123626] text-white font-bold text-xs transition active:scale-95 shadow-sm text-center"
              >
                വികസന ട്രാക്കറിലേക്ക് മടങ്ങുക (Return to Dev Tracker)
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
        <div className="bg-gradient-to-b from-[#194B35] to-[#123626] text-white pt-8 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#C39A5B] text-xs font-bold mb-2.5 border border-white/20">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{language === "ml" ? "മുനിസിപ്പൽ അഡ്മിനിസ്ട്രേഷൻ" : "Municipal Administration"}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold font-malayalam-heading text-white">
                  {language === "ml" ? "സുതാര്യ താനൂർ • അഡ്മിൻ കൺസോൾ" : "Transparent Tanur • Admin Hub"}
                </h1>
                <p className="text-xs sm:text-sm text-[#EDE6D8] mt-1">
                  Manage projects, verify field milestones, review citizen contributions, and maintain gazette audit logs.
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <Link
                  href="/admin/development/projects"
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition flex items-center gap-1.5"
                >
                  <Search className="w-3.5 h-3.5 text-[#C39A5B]" />
                  <span>{language === "ml" ? "പദ്ധതി പട്ടിക" : "Manage Registry"}</span>
                </Link>

                <Link
                  href="/admin/development/projects/new"
                  className="px-4 py-2.5 rounded-xl bg-[#C39A5B] hover:bg-[#b0874a] text-[#194B35] text-xs font-extrabold transition shadow-sm flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>{language === "ml" ? "പുതിയ പദ്ധതി" : "Register Project"}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback Alert */}
        {actionFeedback && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 mb-4">
            <div className="p-4 rounded-2xl bg-[#194B35] text-white text-xs font-semibold flex items-center gap-2 shadow-lg animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-amber-300" />
              <span>{actionFeedback}</span>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3.5">
            <div className="bg-white p-4 rounded-2xl border border-[#EDE6D8] shadow-xs">
              <span className="text-[10px] font-bold text-[#7A8880] uppercase block">ആകെ പദ്ധതികൾ</span>
              <div className="text-2xl font-extrabold text-[#194B35] mt-0.5">{stats.total}</div>
              <span className="text-[10px] text-[#5C6A64]">All 44 Wards</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#EDE6D8] shadow-xs">
              <span className="text-[10px] font-bold text-amber-700 uppercase block">നടന്നു വരുന്നവ</span>
              <div className="text-2xl font-extrabold text-amber-700 mt-0.5">{stats.in_progress}</div>
              <span className="text-[10px] text-[#5C6A64]">Active Works</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#EDE6D8] shadow-xs">
              <span className="text-[10px] font-bold text-emerald-700 uppercase block">പൂർത്തിയായവ</span>
              <div className="text-2xl font-extrabold text-emerald-700 mt-0.5">{stats.completed}</div>
              <span className="text-[10px] text-[#5C6A64]">Commissioned</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#EDE6D8] shadow-xs">
              <span className="text-[10px] font-bold text-rose-700 uppercase block">കാലതാമസം ഉള്ളവ</span>
              <div className="text-2xl font-extrabold text-rose-700 mt-0.5">{stats.delayed}</div>
              <span className="text-[10px] text-[#5C6A64]">Delayed / Review</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#EDE6D8] shadow-xs">
              <span className="text-[10px] font-bold text-[#194B35] uppercase block">സ്ഥിരീകരിച്ചവ</span>
              <div className="text-2xl font-extrabold text-[#194B35] mt-0.5">{stats.verified}</div>
              <span className="text-[10px] text-[#5C6A64]">100% Sourced</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#EDE6D8] shadow-xs">
              <span className="text-[10px] font-bold text-indigo-700 uppercase block">പൗര സമർപ്പണങ്ങൾ</span>
              <div className="text-2xl font-extrabold text-indigo-700 mt-0.5">{pendingContributions.length}</div>
              <span className="text-[10px] text-amber-600 font-bold">Pending Review</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-10">
          {/* Section 1: Citizen Contributions Review Queue */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE6D8] shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-[#EDE6D8] pb-4">
              <div>
                <h2 className="text-base font-bold font-malayalam-heading text-[#194B35] flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#C39A5B]" />
                  <span>പൗര പങ്കാളിത്ത അവലോകന ക്യൂ (Citizen Contributions Queue)</span>
                </h2>
                <p className="text-xs text-[#5C6A64] mt-0.5">
                  നിവാസികൾ സമർപ്പിച്ച പുതിയ ഫോട്ടോകൾ, തിരുത്തലുകൾ, നിർദ്ദേശങ്ങൾ പരിശോധിക്കുക
                </p>
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-amber-50 text-amber-900 rounded-full border border-amber-200">
                {pendingContributions.length} Pending Review
              </span>
            </div>

            {pendingContributions.length === 0 ? (
              <div className="p-8 text-center bg-[#FAF7F0] rounded-2xl border border-[#EDE6D8] text-xs text-[#5C6A64]">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <span>അവലോകനം ചെയ്യാനുള്ള പുതിയ പൗര സമർപ്പണങ്ങൾ ലഭ്യമല്ല. ക്യൂ പൂർണ്ണമായും പരിശോധിച്ചു കഴിഞ്ഞു!</span>
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
                      </div>
                      <span className="text-[11px] text-[#7A8880] flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(c.created_at).toLocaleDateString("en-IN")}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-[#1A2420] font-malayalam-heading">{c.title}</h4>
                      <p className="text-xs text-[#5C6A64] mt-1 leading-relaxed">{c.details}</p>
                    </div>

                    {c.evidence_url && (
                      <div className="text-xs">
                        <a
                          href={c.evidence_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#194B35] hover:text-[#C39A5B] font-bold inline-flex items-center gap-1"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>സമർപ്പിച്ച ലിങ്ക് / ഫോട്ടോ പരിശോധിക്കുക</span>
                        </a>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="pt-2 border-t border-[#EDE6D8] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                      <input
                        type="text"
                        value={reviewNote[c.id] || ""}
                        onChange={(e) => setReviewNote({ ...reviewNote, [c.id]: e.target.value })}
                        placeholder="അഡ്മിൻ കുറിപ്പ് (Admin note / response)..."
                        className="px-3 py-1.5 rounded-xl text-xs bg-white border border-[#DDD5C5] text-[#1A2420] sm:max-w-md"
                      />

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <button
                          onClick={() => handleReviewContribution(c.id, "rejected")}
                          className="px-3 py-1.5 rounded-xl bg-white border border-rose-300 text-rose-700 text-xs font-bold hover:bg-rose-50 transition"
                        >
                          നിരസിക്കുക (Reject)
                        </button>
                        <button
                          onClick={() => handleReviewContribution(c.id, "approved")}
                          className="px-4 py-1.5 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 transition shadow-xs"
                        >
                          അംഗീകരിക്കുക (Approve)
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 2: Recent Projects Table with Quick Edit */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE6D8] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#EDE6D8] pb-4">
              <div>
                <h2 className="text-base font-bold font-malayalam-heading text-[#194B35]">
                  പദ്ധതി രജിസ്ട്രി അവലോകനം (Projects Quick Register)
                </h2>
                <p className="text-xs text-[#5C6A64]">
                  ഏറ്റവും പുതിയ പദ്ധതികൾ എഡിറ്റ് ചെയ്യാനും വിവരങ്ങൾ പുതുക്കാനും താഴെ കാണുന്ന ലിങ്കുകൾ ഉപയോഗിക്കുക
                </p>
              </div>

              <Link
                href="/admin/development/projects"
                className="text-xs font-bold text-[#194B35] hover:text-[#C39A5B] flex items-center gap-1"
              >
                <span>മുഴുവൻ കാണുക ({projects.length})</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#EDE6D8] text-[#5C6A64] font-bold">
                    <th className="py-2.5">പദ്ധതി</th>
                    <th className="py-2.5">വിഭാഗം</th>
                    <th className="py-2.5">അവസ്ഥ</th>
                    <th className="py-2.5">ബജറ്റ്</th>
                    <th className="py-2.5">വാർഡ്</th>
                    <th className="py-2.5 text-right">നടപടികൾ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDE6D8]">
                  {projects.slice(0, 8).map((p) => (
                    <tr key={p.id} className="hover:bg-[#FAF7F0]">
                      <td className="py-3 font-bold text-[#194B35] max-w-xs truncate">
                        <Link href={`/development/projects/${p.id}`} className="hover:underline">
                          {language === "ml" ? p.title_ml : p.title}
                        </Link>
                      </td>
                      <td className="py-3 text-[#5C6A64]">
                        {language === "ml" ? p.category_name_ml : p.category_name}
                      </td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-neutral-100 text-neutral-800">
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3 font-mono text-[#194B35] font-bold">{p.budget_sanctioned}</td>
                      <td className="py-3 text-[#5C6A64]">{p.ward_number ? `Ward ${p.ward_number}` : "—"}</td>
                      <td className="py-3 text-right">
                        <Link
                          href={`/admin/development/projects/${p.id}/edit`}
                          className="px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-[#C39A5B] hover:text-white text-[#194B35] text-[11px] font-bold transition inline-flex items-center gap-1"
                        >
                          <Edit className="w-3 h-3" />
                          <span>Edit</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: Immutable Audit Trail */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE6D8] shadow-xs space-y-4">
            <h2 className="text-base font-bold font-malayalam-heading text-[#194B35] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#C39A5B]" />
              <span>പദ്ധതി ഓഡിറ്റ് രേഖകൾ (Development Audit Log Trail)</span>
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#EDE6D8] text-[#5C6A64] font-bold">
                    <th className="py-2.5">Action</th>
                    <th className="py-2.5">Project ID</th>
                    <th className="py-2.5">Actor</th>
                    <th className="py-2.5">Note / Change</th>
                    <th className="py-2.5">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDE6D8]">
                  {auditLogs.slice(0, 10).map((log) => (
                    <tr key={log.id} className="hover:bg-[#FAF7F0]">
                      <td className="py-2.5 font-bold uppercase text-[10px] text-[#194B35]">{log.action}</td>
                      <td className="py-2.5 font-mono text-[11px] text-[#7A8880]">{log.project_id}</td>
                      <td className="py-2.5 text-[#1A2420]">{log.actor_name} ({log.actor_role})</td>
                      <td className="py-2.5 text-[#5C6A64]">{log.note || `${log.previous_value || ""} -> ${log.new_value || ""}`}</td>
                      <td className="py-2.5 text-[#7A8880] text-[11px]">{new Date(log.timestamp).toLocaleString("en-IN")}</td>
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
