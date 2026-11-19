"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { AdminCivicNav } from "@/components/civic/AdminCivicNav";
import { useLanguage } from "@/lib/i18n/context";
import { 
  civicStore, 
  CIVIC_CATEGORIES, 
  CivicIssue 
} from "@/lib/data/civicConnectData";
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
  Eye
} from "lucide-react";

function AdminIssuesContent() {
  const { language } = useLanguage();
  const searchParams = useSearchParams();
  const initialStatus = searchParams.get("status") || "all";

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState(initialStatus);
  const [selectedLocality, setSelectedLocality] = useState("all");
  const [issues, setIssues] = useState<CivicIssue[]>(() => civicStore.getIssues());

  // Quick Action Modal state
  const [actionModal, setActionModal] = useState<{
    isOpen: boolean;
    issue: CivicIssue | null;
    actionType: "verify" | "resolve" | "reject" | null;
    note: string;
  }>({
    isOpen: false,
    issue: null,
    actionType: null,
    note: "",
  });

  const handleOpenAction = (issue: CivicIssue, actionType: "verify" | "resolve" | "reject") => {
    setActionModal({
      isOpen: true,
      issue,
      actionType,
      note: actionType === "verify" 
        ? "ഫീൽഡ് പരിശോധനയിൽ പ്രശ്നം സ്ഥിരീകരിച്ചു." 
        : actionType === "resolve" 
        ? "നഗരസഭാ സംഘം സ്ഥലം സന്ദർശിച്ച് പ്രവൃത്തി പൂർത്തിയാക്കി." 
        : "മതിയായ തെളിവുകളില്ലാത്തതിനാൽ അല്ലെങ്കിൽ വ്യാജമായതിനാൽ തള്ളി.",
    });
  };

  const handleConfirmAction = () => {
    if (!actionModal.issue || !actionModal.actionType) return;

    let targetStatus: CivicIssue['status'] = "verified";
    if (actionModal.actionType === "resolve") targetStatus = "resolved";
    if (actionModal.actionType === "reject") targetStatus = "rejected";

    civicStore.updateIssueStatus(
      actionModal.issue.id,
      targetStatus,
      "താനൂർ സിവിക് മോഡറേറ്റർ (Admin)",
      actionModal.note,
      undefined,
      targetStatus === "resolved" ? {
        resolved_at: new Date().toISOString(),
        resolution_notes: actionModal.note,
        resolution_images: [],
        verified_by_moderator: true,
      } : undefined
    );

    setIssues([...civicStore.getIssues()]);
    setActionModal({ isOpen: false, issue: null, actionType: null, note: "" });
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
      if (selectedLocality !== "all") {
        if (selectedLocality === "municipality" && !issue.locality.includes("Municipality") && issue.jurisdiction_type !== "municipality") return false;
        if (selectedLocality === "block" && !issue.locality.includes("Block") && issue.jurisdiction_type !== "block_panchayat") return false;
      }
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchesTitle = issue.title.toLowerCase().includes(q) || issue.title_ml.toLowerCase().includes(q);
        const matchesTracking = issue.tracking_id.toLowerCase().includes(q);
        const matchesLocality = issue.locality.toLowerCase().includes(q) || issue.address_landmark.toLowerCase().includes(q);
        if (!matchesTitle && !matchesTracking && !matchesLocality) return false;
      }
      return true;
    });
  }, [issues, selectedCategory, selectedStatus, selectedLocality, searchTerm]);

  const getStatusBadge = (status: CivicIssue['status']) => {
    switch (status) {
      case "resolved":
        return { label: "പരിഹരിച്ചു", bg: "bg-emerald-100 text-emerald-800 border-emerald-300", icon: CheckCircle2 };
      case "in_progress":
        return { label: "നടപടിയിൽ", bg: "bg-blue-100 text-blue-800 border-blue-300", icon: Clock };
      case "forwarded":
        return { label: "കൈമാറി", bg: "bg-amber-100 text-amber-800 border-amber-300", icon: Send };
      case "verified":
        return { label: "സ്ഥിരീകരിച്ചു", bg: "bg-purple-100 text-purple-800 border-purple-300", icon: ShieldCheck };
      case "under_review":
        return { label: "അവലോകനത്തിൽ", bg: "bg-sky-100 text-sky-800 border-sky-300", icon: Clock };
      case "rejected":
        return { label: "തള്ളി", bg: "bg-rose-100 text-rose-800 border-rose-300", icon: AlertTriangle };
      default:
        return { label: "സമർപ്പിച്ചു", bg: "bg-neutral-100 text-neutral-800 border-neutral-300", icon: Clock };
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
                  മാനേജ്‌മെന്റ് ടേബിൾ
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#194B35] font-serif">
                {language === "ml" ? "പരാതികളുടെ പൂർണ്ണ പട്ടിക" : "Manage Civic Issues"}
              </h1>
              <p className="text-xs sm:text-sm text-[#5C6A64] mt-1">
                പരാതികൾ ഫിൽട്ടർ ചെയ്യുക, വേരിഫൈ ചെയ്യുക, വകുപ്പുകളിലേക്ക് ഫോർവേഡ് ചെയ്യുക, സ്റ്റാറ്റസ് മാറ്റുക.
              </p>
            </div>

            <div className="text-xs text-neutral-500 font-medium">
              ആകെ {filteredIssues.length} പരാതികൾ കണ്ടെത്തി
            </div>
          </div>

          {/* Filter Bar Controls */}
          <div className="bg-white p-4 rounded-2xl border border-[#E8DCBF] shadow-xs flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="ട്രാക്കിംഗ് ഐഡി, വിഷയം അല്ലെങ്കിൽ സ്ഥലം തിരയുക..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#FAF7F0] border border-[#DDD5C5] text-xs focus:outline-hidden focus:border-[#194B35]"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[#FAF7F0] border border-[#DDD5C5] text-xs font-medium focus:outline-hidden"
            >
              <option value="all">എല്ലാ വിഭാഗങ്ങളും</option>
              {CIVIC_CATEGORIES.map(c => (
                <option key={c.id} value={c.id}>{c.name_ml}</option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[#FAF7F0] border border-[#DDD5C5] text-xs font-medium focus:outline-hidden"
            >
              <option value="all">എല്ലാ സ്റ്റാറ്റസും</option>
              <option value="pending">അവലോകനത്തിൽ (Pending)</option>
              <option value="verified">സ്ഥിരീകരിച്ചവ (Verified)</option>
              <option value="forwarded">കൈമാറിയവ (Forwarded)</option>
              <option value="in_progress">നടപടിയിൽ (In Progress)</option>
              <option value="resolved">പരിഹരിച്ചവ (Resolved)</option>
              <option value="rejected">തള്ളിയവ (Rejected)</option>
            </select>

            <select
              value={selectedLocality}
              onChange={(e) => setSelectedLocality(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[#FAF7F0] border border-[#DDD5C5] text-xs font-medium focus:outline-hidden"
            >
              <option value="all">എല്ലാ പ്രദേശങ്ങളും</option>
              <option value="municipality">താനൂർ നഗരസഭ</option>
              <option value="block">താനൂർ ബ്ലോക്ക്</option>
            </select>
          </div>
        </div>
      </section>

      {/* Issues Table */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-3xl border border-[#E8DCBF] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#1A2420]">
              <thead className="bg-[#FAF4E6] border-b border-[#E8DCBF] text-[#194B35] font-bold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">ട്രാക്കിംഗ് ഐഡി</th>
                  <th className="py-3 px-4">പരാതി & കാറ്റഗറി</th>
                  <th className="py-3 px-4">പ്രദേശം / വാർഡ്</th>
                  <th className="py-3 px-4">തീയതി</th>
                  <th className="py-3 px-4">സ്റ്റാറ്റസ്</th>
                  <th className="py-3 px-4">പിന്തുണ</th>
                  <th className="py-3 px-4 text-right">നടപടികൾ (Actions)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 font-medium">
                {filteredIssues.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-neutral-400 italic">
                      പരാതികളൊന്നും കണ്ടെത്തിയില്ല.
                    </td>
                  </tr>
                ) : (
                  filteredIssues.map((issue) => {
                    const statusInfo = getStatusBadge(issue.status);
                    const StatusIcon = statusInfo.icon;
                    const cat = CIVIC_CATEGORIES.find(c => c.id === issue.category_id);

                    return (
                      <tr key={issue.id} className="hover:bg-[#FAF7F0]/60 transition">
                        <td className="py-3.5 px-4 font-mono font-bold text-[#194B35]">
                          <Link href={`/admin/civic/issues/${issue.id}`} className="hover:underline">
                            {issue.tracking_id}
                          </Link>
                        </td>

                        <td className="py-3.5 px-4 max-w-xs">
                          <Link href={`/admin/civic/issues/${issue.id}`} className="font-bold text-[#1A2420] hover:text-[#194B35] line-clamp-1">
                            {issue.title_ml || issue.title}
                          </Link>
                          <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-neutral-500">
                            <span className="font-semibold text-amber-800">{cat?.name_ml || cat?.name}</span>
                            <span>•</span>
                            <span>{issue.subcategory}</span>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 text-neutral-600 max-w-xs">
                          <div className="line-clamp-1">{issue.address_landmark}</div>
                          <div className="text-[10px] text-neutral-400">{issue.locality}</div>
                        </td>

                        <td className="py-3.5 px-4 text-neutral-500 text-[11px] whitespace-nowrap">
                          {new Date(issue.created_at).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                        </td>

                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusInfo.bg}`}>
                            <StatusIcon className="w-2.5 h-2.5" />
                            {statusInfo.label}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-neutral-600 font-bold whitespace-nowrap">
                          👍 {issue.support_count}
                        </td>

                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* Quick Verify */}
                            {issue.status === "submitted" || issue.status === "under_review" ? (
                              <button
                                onClick={() => handleOpenAction(issue, "verify")}
                                className="px-2 py-1 rounded-md bg-purple-100 hover:bg-purple-200 text-purple-800 font-bold text-[10px] transition"
                                title="സ്ഥിരീകരിക്കുക (Verify)"
                              >
                                സ്ഥിരീകരിക്കുക
                              </button>
                            ) : null}

                            {/* Quick Resolve */}
                            {issue.status !== "resolved" && issue.status !== "rejected" ? (
                              <button
                                onClick={() => handleOpenAction(issue, "resolve")}
                                className="px-2 py-1 rounded-md bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold text-[10px] transition"
                                title="പരിഹരിച്ചു എന്ന് അടയാളപ്പെടുത്തുക"
                              >
                                പരിഹരിച്ചു
                              </button>
                            ) : null}

                            {/* Full Edit / Moderate Link */}
                            <Link
                              href={`/admin/civic/issues/${issue.id}`}
                              className="px-2.5 py-1 rounded-md bg-[#194B35] text-white hover:bg-[#143E2C] font-bold text-[10px] inline-flex items-center gap-1 transition"
                            >
                              <Edit className="w-3 h-3" />
                              <span>മാനേജ്</span>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Action Confirmation Modal */}
      {actionModal.isOpen && actionModal.issue && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#E8DCBF]">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-4">
              <h3 className="font-bold text-sm text-[#194B35] font-serif">
                സ്റ്റാറ്റസ് മാറ്റം: {actionModal.issue.tracking_id}
              </h3>
              <button
                onClick={() => setActionModal({ isOpen: false, issue: null, actionType: null, note: "" })}
                className="text-neutral-400 hover:text-neutral-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="font-bold text-[#1A2420]">
                {actionModal.issue.title_ml || actionModal.issue.title}
              </p>

              <div>
                <label className="block text-neutral-500 mb-1">മോഡറേറ്റർ / അധികൃതർ കുറിപ്പ്:</label>
                <textarea
                  rows={3}
                  value={actionModal.note}
                  onChange={(e) => setActionModal({ ...actionModal, note: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#DDD5C5] text-xs focus:outline-hidden focus:border-[#194B35]"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  onClick={() => setActionModal({ isOpen: false, issue: null, actionType: null, note: "" })}
                  className="px-4 py-2 rounded-xl border border-neutral-200 text-neutral-600 hover:bg-neutral-100 font-bold"
                >
                  റദ്ദാക്കുക
                </button>
                <button
                  onClick={handleConfirmAction}
                  className="px-4 py-2 rounded-xl bg-[#194B35] text-white hover:bg-[#143E2C] font-bold"
                >
                  സ്ഥിരീകരിക്കുക
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <BottomNav />
    </div>
  );
}

export default function AdminIssuesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAF7F0] flex items-center justify-center p-8 text-[#194B35]">
        <div className="text-center">
          <div className="w-10 h-10 border-3 border-[#194B35] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-bold font-malayalam">പരാതികളുടെ പട്ടിക ലോഡ് ചെയ്യുന്നു...</p>
        </div>
      </div>
    }>
      <AdminIssuesContent />
    </Suspense>
  );
}
