"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { PeoplesVoiceNav } from "@/components/peoples-voice/PeoplesVoiceNav";
import { useLanguage } from "@/lib/i18n/context";
import { useAuth } from "@/lib/auth/context";
import { 
  peoplesVoiceStore, 
  PEOPLES_VOICE_IDEA_CATEGORIES 
} from "@/lib/data/peoplesVoiceData";
import { 
  CommunityIdea, 
  IdeaStatus, 
  ContentReport, 
  PeoplesVoiceAuditLog,
  ReportStatus 
} from "@/types/peoplesVoice";
import {
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  MessageSquare,
  Users,
  Clock,
  Eye,
  EyeOff,
  Filter,
  Search,
  FileCheck2,
  HeartHandshake,
  ArrowRight,
  ChevronRight,
  Sparkles,
  BarChart3,
  Calendar,
  Lock
} from "lucide-react";

export default function AdminPeoplesVoicePage() {
  const { language } = useLanguage();
  const { user, role } = useAuth();

  const [activeTab, setActiveTab] = useState<"overview" | "ideas" | "reports" | "audit">("overview");

  const [ideas, setIdeas] = useState<CommunityIdea[]>(() => peoplesVoiceStore.getIdeas({ includeHidden: true }));
  const [reports, setReports] = useState<ContentReport[]>(() => peoplesVoiceStore.getReports());
  const [auditLogs, setAuditLogs] = useState<PeoplesVoiceAuditLog[]>(() => peoplesVoiceStore.getAuditLogs());
  const analytics = peoplesVoiceStore.getAnalytics();

  // Status update modal state
  const [selectedIdeaForStatus, setSelectedIdeaForStatus] = useState<CommunityIdea | null>(null);
  const [newStatus, setNewStatus] = useState<IdeaStatus>("Under Review");
  const [statusNotes, setStatusNotes] = useState("");
  // Forwarding fields
  const [authorityName, setAuthorityName] = useState("");
  const [authorityDept, setAuthorityDept] = useState("");
  const [refNumber, setRefNumber] = useState("");
  // Collaboration fields
  const [collabOrgName, setCollabOrgName] = useState("");
  const [collabScope, setCollabScope] = useState("");

  const isPrivileged = role === "admin" || role === "moderator";

  // Refresh data
  const refreshAll = () => {
    setIdeas(peoplesVoiceStore.getIdeas({ includeHidden: true }));
    setReports(peoplesVoiceStore.getReports());
    setAuditLogs(peoplesVoiceStore.getAuditLogs());
  };

  // Toggle Hide/Unhide idea
  const handleToggleHide = (idea: CommunityIdea) => {
    const actorName = user?.display_name || user?.username || "Civic Moderator";
    peoplesVoiceStore.hideIdea(idea.id, !idea.is_hidden, actorName);
    refreshAll();
  };

  // Handle Status Update Submit
  const handleStatusSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIdeaForStatus) return;

    const actorName = user?.display_name || user?.username || "Civic Moderator";
    const actorRole = role === "admin" ? "Administrator" : "Moderator";

    let forwardedRecord = undefined;
    if (newStatus === "Forwarded for Consideration") {
      forwardedRecord = {
        authority_name: authorityName.trim() || "Tanur Municipality Administration",
        department: authorityDept.trim() || "Municipal Engineering & Civic Wing",
        forwarded_date: new Date().toISOString().split("T")[0],
        reference_number: refNumber.trim() || `TNR/PV-${Date.now().toString().slice(-4)}`,
        notes: statusNotes.trim()
      };
    }

    let collaborationRecord = undefined;
    if (newStatus === "Accepted for Collaboration") {
      collaborationRecord = {
        organization_name: collabOrgName.trim() || "Tanur Community Action Collective",
        organization_type: "resident_association" as const,
        accepted_date: new Date().toISOString().split("T")[0],
        collaboration_scope: collabScope.trim() || "Community volunteer execution",
        verification_note: statusNotes.trim()
      };
    }

    peoplesVoiceStore.updateIdeaStatus(
      selectedIdeaForStatus.id,
      newStatus,
      actorName,
      actorRole,
      statusNotes.trim(),
      forwardedRecord,
      collaborationRecord
    );

    setSelectedIdeaForStatus(null);
    setStatusNotes("");
    setAuthorityName("");
    setRefNumber("");
    setCollabOrgName("");
    setCollabScope("");
    refreshAll();
  };

  // Handle Resolve Report
  const handleResolveReport = (reportId: string, action: "actioned" | "dismissed", actionNotes: string) => {
    const reviewerName = user?.display_name || user?.username || "Moderator";
    peoplesVoiceStore.updateReportStatus(reportId, action, actionNotes, reviewerName);
    refreshAll();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "In Progress":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "Accepted for Collaboration":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "Forwarded for Consideration":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "Shortlisted":
        return "bg-indigo-100 text-indigo-800 border-indigo-300";
      case "Community Discussion":
        return "bg-cyan-100 text-cyan-800 border-cyan-300";
      case "Under Review":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "Not Proceeding":
        return "bg-gray-100 text-gray-700 border-gray-300";
      default:
        return "bg-stone-100 text-stone-800 border-stone-300";
    }
  };

  if (!isPrivileged) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
        <Navbar />
        <PeoplesVoiceNav />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl border border-[#EAE4D7] p-8 text-center shadow-card">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-[#B87A1E] flex items-center justify-center mx-auto mb-4 border border-amber-200">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold font-malayalam-serif text-[#1A2420]">
              {language === "ml" ? "മോഡറേഷൻ പ്രവേശനം ആവശ്യമാണ്" : "Moderator Access Required"}
            </h2>
            <p className="text-xs text-[#5C6A64] mt-2 leading-relaxed">
              {language === "ml" 
                ? "ഈ കൺട്രോൾ സെന്റർ താനൂർ നഗരസഭാ മോഡറേറ്റർമാർക്കും അഡ്മിനിസ്ട്രേറ്റർമാർക്കും മാത്രമുള്ളതാണ്."
                : "This control center is restricted exclusively to authorized Tanur Municipality moderators and administrators."}
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <Link
                href="/peoples-voice"
                className="w-full py-2.5 rounded-xl bg-[#1B4D36] hover:bg-[#133A28] text-white font-bold text-xs transition active:scale-95 shadow-sm text-center"
              >
                {language === "ml" ? "ജനകീയ ശബ്ദത്തിലേക്ക് മടങ്ങുക (Return to People's Voice)" : "Return to People's Voice"}
              </Link>
              <Link
                href="/profile"
                className="w-full py-2.5 rounded-xl bg-white hover:bg-[#F3EFE6] text-[#1B4D36] border border-[#DDD5C5] font-bold text-xs transition active:scale-95 shadow-sm text-center"
              >
                {language === "ml" ? "പ്രൊഫൈൽ സന്ദർശിക്കുക (View Profile)" : "View Profile"}
              </Link>
            </div>
            <p className="text-[11px] text-[#7A8880] mt-4">
              {language === "ml" 
                ? "സാധാരണ ഉപയോക്താക്കൾക്ക് മോഡറേഷൻ അനുമതികൾ സ്വയം നൽകാൻ സാധ്യമല്ല."
                : "Standard citizens cannot perform moderation actions without authorization."}
            </p>
          </div>
        </main>
        <Footer />
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#252A25] pb-24">
      <Navbar />
      <PeoplesVoiceNav />

      {/* Hero */}
      <section className="bg-gradient-to-b from-[#FAF4E6] to-[#FAF7F0] border-b border-[#EDE6D8] pt-8 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#BE185D] text-white">
                  {language === "ml" ? "മോഡറേഷൻ കൺട്രോൾ സെന്റർ" : "Moderation Control Center"}
                </span>
                <span className="text-xs text-[#5C6A64]">Tanur Municipality Civic Portal</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#194B35] font-serif">
                {language === "ml" ? "ജനകീയ ശബ്ദം • മോഡറേഷൻ ഡാഷ്‌ബോർഡ്" : "People's Voice — Moderation Hub"}
              </h1>
              <p className="text-xs sm:text-sm text-[#5C6A64] mt-0.5">
                {language === "ml"
                  ? "പൗരന്മാരുടെ ആശയങ്ങൾ പരിശോധിക്കുക, ഘട്ടങ്ങൾ നിശ്ചയിക്കുക, ഔദ്യോഗിക രേഖകൾ ചേർക്കുക, പരാതികൾ പരിഹരിക്കുക."
                  : "Review submissions, manage idea progression, record official communications, and moderate content."}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#5C6A64]">Logged as:</span>
              <span className="px-3 py-1 rounded-full bg-[#194B35] text-white text-xs font-bold uppercase">
                {role}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* KPI Stats Ribbon */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
          <div className="bg-white p-4 rounded-2xl border border-[#EDE6D8] shadow-sm">
            <span className="text-xs text-[#5C6A64] font-medium">{language === "ml" ? "ആകെ ആശയങ്ങൾ" : "Total Ideas"}</span>
            <div className="text-2xl font-black text-[#194B35] mt-1">{analytics.totalIdeas}</div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#EDE6D8] shadow-sm">
            <span className="text-xs text-[#5C6A64] font-medium">{language === "ml" ? "അവലോകനത്തിൽ" : "Under Review"}</span>
            <div className="text-2xl font-black text-amber-700 mt-1">{analytics.underReview + analytics.submitted}</div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#EDE6D8] shadow-sm">
            <span className="text-xs text-[#5C6A64] font-medium">{language === "ml" ? "കൈമാറിയവ" : "Forwarded Records"}</span>
            <div className="text-2xl font-black text-blue-700 mt-1">{analytics.forwarded}</div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#EDE6D8] shadow-sm">
            <span className="text-xs text-[#5C6A64] font-medium">{language === "ml" ? "റിപ്പോർട്ടുകൾ" : "Pending Reports"}</span>
            <div className="text-2xl font-black text-red-600 mt-1">{analytics.pendingReports}</div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#EDE6D8] shadow-sm col-span-2 sm:col-span-1">
            <span className="text-xs text-[#5C6A64] font-medium">{language === "ml" ? "സഹകരണം / പൂർത്തിയായവ" : "Adopted / Completed"}</span>
            <div className="text-2xl font-black text-emerald-700 mt-1">{analytics.accepted + analytics.completed + analytics.inProgress}</div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 border-b border-[#EDE6D8] pb-3 mb-6">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === "overview"
                ? "bg-[#194B35] text-white shadow-sm"
                : "bg-white text-[#5C6A64] hover:text-[#194B35] border border-[#EDE6D8]"
            }`}
          >
            {language === "ml" ? "അവലോകനം & സ്ഥിതിവിവരക്കണക്കുകൾ" : "Analytics & Overview"}
          </button>

          <button
            onClick={() => setActiveTab("ideas")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === "ideas"
                ? "bg-[#194B35] text-white shadow-sm"
                : "bg-white text-[#5C6A64] hover:text-[#194B35] border border-[#EDE6D8]"
            }`}
          >
            {language === "ml" ? "ആശയങ്ങളുടെ മോഡറേഷൻ" : "Manage Ideas"} ({ideas.length})
          </button>

          <button
            onClick={() => setActiveTab("reports")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === "reports"
                ? "bg-[#194B35] text-white shadow-sm"
                : "bg-white text-[#5C6A64] hover:text-[#194B35] border border-[#EDE6D8]"
            }`}
          >
            {language === "ml" ? "പരാതികൾ (Reports)" : "Content Reports"} ({reports.filter(r => r.status === "pending").length})
          </button>

          <button
            onClick={() => setActiveTab("audit")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === "audit"
                ? "bg-[#194B35] text-white shadow-sm"
                : "bg-white text-[#5C6A64] hover:text-[#194B35] border border-[#EDE6D8]"
            }`}
          >
            {language === "ml" ? "ഓഡിറ്റ് ലോഗ് (Audit Logs)" : "Audit Log"} ({auditLogs.length})
          </button>
        </div>

        {/* Tab 1: Overview Analytics */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6">
              <h3 className="font-bold text-base text-[#194B35] font-serif mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#C39A5B]" />
                <span>{language === "ml" ? "ഘട്ടം തിരിച്ചുള്ള ആശയങ്ങൾ" : "Ideas by Status (9 Official Statuses)"}</span>
              </h3>

              <div className="space-y-3">
                {Object.entries(analytics.byStatus).map(([statusName, count]) => (
                  <div key={statusName} className="flex items-center justify-between text-xs">
                    <span className={`px-2.5 py-0.5 rounded-full font-bold border ${getStatusBadge(statusName)}`}>
                      {statusName}
                    </span>
                    <span className="font-black text-[#194B35]">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6">
              <h3 className="font-bold text-base text-[#194B35] font-serif mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-[#C39A5B]" />
                <span>{language === "ml" ? "വിഭാഗം തിരിച്ചുള്ള ആശയങ്ങൾ" : "Ideas by Civic Category"}</span>
              </h3>

              <div className="space-y-3">
                {PEOPLES_VOICE_IDEA_CATEGORIES.map((cat) => {
                  const count = analytics.byCategory[cat.key] || 0;
                  return (
                    <div key={cat.key} className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#252A25]">
                        {language === "ml" ? cat.label_ml : cat.label}
                      </span>
                      <span className="font-bold text-[#194B35] bg-[#FAF7F0] px-2.5 py-0.5 rounded-full border border-[#EDE6D8]">
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Manage Ideas Table */}
        {activeTab === "ideas" && (
          <div className="bg-white rounded-3xl border border-[#EDE6D8] overflow-hidden shadow-sm">
            <div className="p-4 border-b border-[#EDE6D8] flex items-center justify-between">
              <h3 className="font-bold text-base text-[#194B35]">
                {language === "ml" ? "ആശയങ്ങളുടെ രജിസ്റ്റർ & മോഡറേഷൻ" : "Community Ideas Register"}
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF7F0] text-[#5C6A64] border-b border-[#EDE6D8] font-bold">
                  <tr>
                    <th className="py-3 px-4">Tracking ID</th>
                    <th className="py-3 px-4">Title & Category</th>
                    <th className="py-3 px-4">Locality / Ward</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Supports</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDE6D8]">
                  {ideas.map((idea) => (
                    <tr key={idea.id} className={idea.is_hidden ? "bg-red-50/50 opacity-70" : "hover:bg-[#FAF7F0]/60"}>
                      <td className="py-3 px-4 font-bold text-[#194B35]">
                        {idea.tracking_id}
                        {idea.is_hidden && (
                          <span className="block text-[10px] text-red-600 font-bold uppercase">(Hidden)</span>
                        )}
                      </td>
                      <td className="py-3 px-4 max-w-xs">
                        <Link href={`/peoples-voice/ideas/${idea.id}`} className="font-bold text-[#252A25] hover:text-[#194B35] line-clamp-1">
                          {idea.title}
                        </Link>
                        <span className="text-[11px] text-[#5C6A64]">{idea.category_name} • By {idea.author_name}</span>
                      </td>
                      <td className="py-3 px-4 text-[#5C6A64]">
                        {idea.locality} {idea.ward_number ? `(Ward ${idea.ward_number})` : ""}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded-full font-bold border text-[10px] ${getStatusBadge(idea.status)}`}>
                          {idea.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-bold text-[#194B35]">
                        {idea.support_count}
                      </td>
                      <td className="py-3 px-4 space-x-2">
                        <button
                          onClick={() => {
                            setSelectedIdeaForStatus(idea);
                            setNewStatus(idea.status);
                            setStatusNotes(idea.status_reason || "");
                          }}
                          className="px-2.5 py-1 rounded-lg bg-[#194B35] text-white font-bold hover:bg-[#143E2C] transition text-[11px]"
                        >
                          {language === "ml" ? "സ്റ്റാറ്റസ് മാറ്റുക" : "Change Status"}
                        </button>

                        <button
                          onClick={() => handleToggleHide(idea)}
                          className={`px-2.5 py-1 rounded-lg font-bold text-[11px] border transition ${
                            idea.is_hidden
                              ? "bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100"
                              : "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                          }`}
                        >
                          {idea.is_hidden ? (language === "ml" ? "പുനഃസ്ഥാപിക്കുക" : "Restore") : (language === "ml" ? "മറയ്ക്കുക" : "Hide")}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Reports */}
        {activeTab === "reports" && (
          <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6">
            <h3 className="font-bold text-base text-[#194B35] mb-4">
              {language === "ml" ? "പൗരന്മാർ റിപ്പോർട്ട് ചെയ്ത ഉള്ളടക്കം" : "Reported Content Queue"}
            </h3>

            {reports.length === 0 ? (
              <p className="text-xs text-[#8C9A94] italic">
                {language === "ml" ? "പരാതികൾ ലഭിച്ചിട്ടില്ല." : "No reports pending review."}
              </p>
            ) : (
              <div className="space-y-4">
                {reports.map((rep) => (
                  <div key={rep.id} className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] flex flex-col sm:flex-row justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1 text-xs">
                        <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-800 font-bold uppercase text-[10px]">
                          {rep.reason}
                        </span>
                        <span className="font-bold text-[#194B35]">{rep.content_title}</span>
                        <span className="text-[#8C9A94]">({rep.content_type})</span>
                      </div>
                      <p className="text-xs text-[#4A5550] mb-2">{rep.details}</p>
                      <div className="text-[11px] text-[#5C6A64]">
                        Reported by: <strong>{rep.reporter_name}</strong> • {rep.created_at.split("T")[0]} • Status: <strong className="uppercase">{rep.status}</strong>
                      </div>
                    </div>

                    {rep.status === "pending" && (
                      <div className="flex sm:flex-col gap-2 shrink-0">
                        <button
                          onClick={() => handleResolveReport(rep.id, "actioned", "Content warned / action taken")}
                          className="px-3 py-1.5 rounded-xl bg-red-600 text-white font-bold text-xs hover:bg-red-700"
                        >
                          Action / Remove
                        </button>
                        <button
                          onClick={() => handleResolveReport(rep.id, "dismissed", "Reviewed and deemed non-violating")}
                          className="px-3 py-1.5 rounded-xl bg-stone-200 text-stone-800 font-bold text-xs hover:bg-stone-300"
                        >
                          Dismiss
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Audit Logs */}
        {activeTab === "audit" && (
          <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6">
            <h3 className="font-bold text-base text-[#194B35] mb-4">
              {language === "ml" ? "മോഡറേഷൻ ചരിത്രവും ഓഡിറ്റ് രേഖകളും" : "Administrative Audit Trail"}
            </h3>

            <div className="space-y-3">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#EDE6D8] text-xs">
                  <div className="flex items-center justify-between text-[#5C6A64] mb-1">
                    <span className="font-bold text-[#194B35]">
                      {log.actor_name} ({log.actor_role})
                    </span>
                    <span className="text-[10px]">{log.timestamp.replace("T", " ").slice(0, 19)}</span>
                  </div>
                  <p className="font-medium text-[#252A25]">{log.details}</p>
                  <span className="text-[10px] text-[#8C9A94]">Action: {log.action} • Target: {log.target_title}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Change Status Modal */}
      {selectedIdeaForStatus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#EDE6D8] my-8">
            <h3 className="font-bold text-lg text-[#194B35] font-serif mb-1">
              {language === "ml" ? "സ്റ്റാറ്റസ് മാറ്റുക & ഔദ്യോഗിക രേഖ ചേർക്കുക" : "Update Status & Attach Records"}
            </h3>
            <p className="text-xs text-[#5C6A64] mb-4">
              {selectedIdeaForStatus.tracking_id} • {selectedIdeaForStatus.title}
            </p>

            <form onSubmit={handleStatusSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#194B35] mb-1">
                  New Status (9 Official Statuses) *
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as IdeaStatus)}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF7F0] border border-[#DDD3BF] text-xs font-bold text-[#194B35]"
                >
                  <option value="Submitted">Submitted</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Community Discussion">Community Discussion</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Forwarded for Consideration">Forwarded for Consideration</option>
                  <option value="Accepted for Collaboration">Accepted for Collaboration</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Not Proceeding">Not Proceeding</option>
                </select>
              </div>

              {/* Conditional Forwarding Fields */}
              {newStatus === "Forwarded for Consideration" && (
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-3">
                  <h4 className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                    <FileCheck2 className="w-4 h-4" />
                    <span>Official Forwarding Record</span>
                  </h4>

                  <div>
                    <label className="block text-[11px] font-bold text-blue-900 mb-0.5">Authority Name *</label>
                    <input
                      type="text"
                      value={authorityName}
                      onChange={(e) => setAuthorityName(e.target.value)}
                      placeholder="e.g. Tanur Municipality / Matsyafed"
                      className="w-full px-3 py-1.5 rounded-lg bg-white border border-blue-200 text-xs"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-blue-900 mb-0.5">Department</label>
                      <input
                        type="text"
                        value={authorityDept}
                        onChange={(e) => setAuthorityDept(e.target.value)}
                        placeholder="e.g. Engineering Wing"
                        className="w-full px-3 py-1.5 rounded-lg bg-white border border-blue-200 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-blue-900 mb-0.5">Reference No *</label>
                      <input
                        type="text"
                        value={refNumber}
                        onChange={(e) => setRefNumber(e.target.value)}
                        placeholder="e.g. TNR-ENG-2026-90"
                        className="w-full px-3 py-1.5 rounded-lg bg-white border border-blue-200 text-xs"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Conditional Collaboration Fields */}
              {newStatus === "Accepted for Collaboration" && (
                <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 space-y-3">
                  <h4 className="text-xs font-bold text-purple-900 flex items-center gap-1.5">
                    <HeartHandshake className="w-4 h-4" />
                    <span>Collaboration Partner Record</span>
                  </h4>

                  <div>
                    <label className="block text-[11px] font-bold text-purple-900 mb-0.5">Organization / Partner Name *</label>
                    <input
                      type="text"
                      value={collabOrgName}
                      onChange={(e) => setCollabOrgName(e.target.value)}
                      placeholder="e.g. Devadhar Residents Association"
                      className="w-full px-3 py-1.5 rounded-lg bg-white border border-purple-200 text-xs"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-purple-900 mb-0.5">Collaboration Scope *</label>
                    <input
                      type="text"
                      value={collabScope}
                      onChange={(e) => setCollabScope(e.target.value)}
                      placeholder="e.g. Volunteer execution of planting and fencing"
                      className="w-full px-3 py-1.5 rounded-lg bg-white border border-purple-200 text-xs"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-[#194B35] mb-1">
                  Public Notes / Decision Rationale
                </label>
                <textarea
                  rows={3}
                  value={statusNotes}
                  onChange={(e) => setStatusNotes(e.target.value)}
                  placeholder="Explain status update to the community..."
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF7F0] border border-[#DDD3BF] text-xs text-[#252A25]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#EDE6D8]">
                <button
                  type="button"
                  onClick={() => setSelectedIdeaForStatus(null)}
                  className="px-4 py-2 rounded-xl bg-[#EDE6D8] text-[#194B35] text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#194B35] text-white text-xs font-bold hover:bg-[#143E2C]"
                >
                  Confirm Status Change
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
