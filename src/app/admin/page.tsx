"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/lib/i18n/context";
import { useCommunity } from "@/lib/community/context";
import { useAuth } from "@/lib/auth/context";
import { store } from "@/lib/data/store";
import { 
  ShieldCheck, 
  Users, 
  Calendar, 
  Briefcase, 
  Megaphone, 
  AlertTriangle, 
  Check, 
  X, 
  Trash2, 
  Activity, 
  Eye, 
  Lock,
  Layers,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight
} from "lucide-react";
import { IssueStatus, EventStatus, BusinessStatus, UserRole } from "@/types/database";

export default function AdminPage() {
  const { t, language } = useLanguage();
  const { role, user, switchUserRole } = useAuth();
  const { availableCommunities } = useCommunity();

  const [activeTab, setActiveTab] = useState<"overview" | "issues" | "events" | "businesses" | "posts" | "audit">("overview");

  // State queries from store
  const [issues, setIssues] = useState(() => store.getIssueReports());
  const [events, setEvents] = useState(() => store.getEvents(undefined, undefined, false));
  const [businesses, setBusinesses] = useState(() => store.getBusinesses(undefined, undefined, false));
  const [posts, setPosts] = useState(() => store.getPosts());
  const [auditLogs, setAuditLogs] = useState(() => store.getAuditLogs());
  const [officialResponseInput, setOfficialResponseInput] = useState<{ [id: string]: string }>({});
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const isAuthorized = role === "admin" || role === "moderator";

  const showFeedback = (msg: string) => {
    setActionFeedback(msg);
    setTimeout(() => setActionFeedback(null), 3000);
  };

  // Handlers
  const handleUpdateIssue = (id: string, newStatus: IssueStatus) => {
    const responseNote = officialResponseInput[id] || undefined;
    store.updateIssueStatus(id, newStatus, responseNote, user?.id);
    setIssues(store.getIssueReports());
    setAuditLogs(store.getAuditLogs());
    showFeedback(`പരാതിയുടെ അവസ്ഥ ${newStatus}-ലേക്ക് മാറ്റി.`);
  };

  const handleUpdateEvent = (id: string, newStatus: EventStatus) => {
    store.updateEventStatus(id, newStatus, undefined, user?.id);
    setEvents(store.getEvents(undefined, undefined, false));
    setAuditLogs(store.getAuditLogs());
    showFeedback(`പരിപാടിയുടെ അവസ്ഥ പുതുക്കി.`);
  };

  const handleUpdateBusiness = (id: string, newStatus: BusinessStatus, verified: boolean) => {
    store.updateBusinessStatus(id, newStatus, verified, user?.id);
    setBusinesses(store.getBusinesses(undefined, undefined, false));
    setAuditLogs(store.getAuditLogs());
    showFeedback(`സ്ഥാപനത്തിന്റെ വിവരങ്ങൾ പുതുക്കി.`);
  };

  const handleDeletePost = (id: string) => {
    store.deletePost(id, user?.id || "admin");
    setPosts(store.getPosts());
    setAuditLogs(store.getAuditLogs());
    showFeedback(`പോസ്റ്റ് നീക്കം ചെയ്തു.`);
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl border border-[#EAE4D7] p-8 text-center shadow-card">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-[#B87A1E] flex items-center justify-center mx-auto mb-4 border border-amber-200">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold font-malayalam-serif text-[#1A2420]">
              അഡ്മിൻ പ്രവേശനം ആവശ്യമാണ്
            </h2>
            <p className="text-xs text-[#5C6A64] mt-2 leading-relaxed">
              ഈ പേജ് മോഡറേറ്റർമാർക്കും പ്ലാറ്റ്‌ഫോം അഡ്മിനിസ്ട്രേറ്റർമാർക്കും മാത്രമുള്ളതാണ്. ടെസ്റ്റ് ചെയ്യാനായി താഴെ നൽകിയിരിക്കുന്ന ബട്ടൺ ഉപയോഗിച്ച് റോൾ മാറ്റാം:
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <button
                onClick={() => switchUserRole("admin")}
                className="w-full py-2.5 rounded-xl bg-[#1B4D36] hover:bg-[#133A28] text-white font-bold text-xs transition active:scale-95 shadow-sm"
              >
                അഡ്മിൻ റോൾ സ്വീകരിക്കുക (Switch to Admin)
              </button>
              <button
                onClick={() => switchUserRole("moderator")}
                className="w-full py-2.5 rounded-xl bg-white hover:bg-[#F3EFE6] text-[#1B4D36] border border-[#DDD5C5] font-bold text-xs transition active:scale-95 shadow-sm"
              >
                മോഡറേറ്റർ റോൾ സ്വീകരിക്കുക (Switch to Moderator)
              </button>
            </div>
          </div>
        </main>
        <Footer />
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-[#1B4D36]" />
              <h1 className="text-2xl sm:text-3xl font-bold font-malayalam-serif text-[#1B4D36]">
                {t("adminDashboard")}
              </h1>
              <span className="text-[11px] bg-[#E0F1E7] text-[#1B4D36] font-bold px-3 py-0.5 rounded-full uppercase border border-[#BDE3CE]">
                {role} mode
              </span>
            </div>
            <p className="text-xs text-[#5C6A64] mt-1 font-malayalam-body">
              കേരളത്തിലെ വിവിധ പ്രദേശങ്ങളിലെ പരാതി പരിഹാരം, ഉള്ളടക്ക മോഡറേഷൻ, അനുമതികൾ, ഓഡിറ്റ് രേഖകൾ.
            </p>
          </div>
        </div>

        {/* Action Feedback Banner */}
        {actionFeedback && (
          <div className="mb-6 p-4 rounded-2xl bg-[#1B4D36] text-white text-xs font-semibold flex items-center gap-2 shadow-md animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-amber-300" />
            <span>{actionFeedback}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex gap-2 overflow-x-auto pb-2 border-b border-[#E5DFD1] mb-6 scrollbar-none">
          {[
            { id: "overview", label: "Overview", icon: Activity },
            { id: "issues", label: `പരാതികൾ (${issues.length})`, icon: AlertTriangle },
            { id: "events", label: `പരിപാടികൾ (${events.length})`, icon: Calendar },
            { id: "businesses", label: `സ്ഥാപനങ്ങൾ (${businesses.length})`, icon: Briefcase },
            { id: "posts", label: `പോസ്റ്റുകൾ (${posts.length})`, icon: Eye },
            { id: "audit", label: `ഓഡിറ്റ് ട്രെയിൽ (${auditLogs.length})`, icon: Clock },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition active:scale-95 shadow-xs ${
                  isActive
                    ? "bg-[#1B4D36] text-white"
                    : "bg-white hover:bg-[#F3EFE6] text-[#3E4D45] border border-[#DDD5C5]"
                }`}
              >
                <Icon className="w-4 h-4 text-amber-300" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 1. OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white rounded-3xl border border-[#EAE4D7] p-5 shadow-card">
                <span className="text-[11px] font-bold text-[#7A8880] uppercase">ആകെ പരാതികൾ</span>
                <div className="text-3xl font-bold font-malayalam-serif text-[#1B4D36] mt-1">{issues.length}</div>
                <div className="text-[11px] text-amber-700 mt-1 font-semibold">
                  {issues.filter(i => i.status !== "resolved").length} പരിഹരിക്കാനുണ്ട്
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-[#EAE4D7] p-5 shadow-card">
                <span className="text-[11px] font-bold text-[#7A8880] uppercase">പരിപാടികൾ</span>
                <div className="text-3xl font-bold font-malayalam-serif text-[#1B4D36] mt-1">{events.length}</div>
                <div className="text-[11px] text-emerald-700 mt-1 font-semibold">
                  {events.filter(e => e.status === "approved").length} അംഗീകരിച്ചവ
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-[#EAE4D7] p-5 shadow-card">
                <span className="text-[11px] font-bold text-[#7A8880] uppercase">സ്ഥാപനങ്ങൾ</span>
                <div className="text-3xl font-bold font-malayalam-serif text-[#1B4D36] mt-1">{businesses.length}</div>
                <div className="text-[11px] text-[#1B4D36] mt-1 font-semibold">
                  {businesses.filter(b => b.is_verified).length} പരിശോധിച്ചുറപ്പിച്ചവ
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-[#EAE4D7] p-5 shadow-card">
                <span className="text-[11px] font-bold text-[#7A8880] uppercase">കമ്യൂണിറ്റി പോസ്റ്റുകൾ</span>
                <div className="text-3xl font-bold font-malayalam-serif text-[#1B4D36] mt-1">{posts.length}</div>
                <div className="text-[11px] text-[#5C6A64] mt-1 font-semibold">
                  പൂർണ്ണമായും മോണിറ്റർ ചെയ്യുന്നു
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 shadow-card">
              <h3 className="font-bold font-malayalam-serif text-base text-[#1A2420] mb-3">
                ശ്രദ്ധ ആവശ്യമുള്ള അടിയന്തിര വിഷയങ്ങൾ
              </h3>
              <div className="space-y-3">
                {issues.filter(i => i.status === "submitted").slice(0, 3).map((issue) => (
                  <div key={issue.id} className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full uppercase">
                          {issue.category}
                        </span>
                        <span className="text-xs text-[#7A8880]">{issue.location_name}</span>
                      </div>
                      <h4 className="font-bold text-sm text-[#1A2420] mt-1">{issue.title}</h4>
                      <p className="text-xs text-[#5C6A64] mt-0.5 line-clamp-1">{issue.description}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdateIssue(issue.id, "in_progress")}
                        className="px-3 py-1.5 rounded-xl bg-[#1B4D36] hover:bg-[#133A28] text-white text-xs font-bold transition shadow-xs"
                      >
                        നടപടി തുടങ്ങാം
                      </button>
                      <button
                        onClick={() => handleUpdateIssue(issue.id, "resolved")}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs"
                      >
                        പരിഹരിച്ചു
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. CIVIC ISSUES TAB */}
        {activeTab === "issues" && (
          <div className="space-y-4">
            {issues.map((issue) => (
              <div key={issue.id} className="bg-white rounded-3xl border border-[#EAE4D7] p-6 shadow-card space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F3EFE6] pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                      {issue.category}
                    </span>
                    <h3 className="text-base font-bold font-malayalam-serif text-[#1A2420] mt-1">
                      {issue.title}
                    </h3>
                    <span className="text-xs text-[#7A8880]">
                      {issue.location_name} • {new Date(issue.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <span className={`self-start sm:self-center text-xs font-bold px-3 py-1 rounded-full uppercase ${
                    issue.status === "resolved"
                      ? "bg-emerald-100 text-emerald-800"
                      : issue.status === "in_progress"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-amber-100 text-amber-800"
                  }`}>
                    {issue.status}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#4A5750] leading-relaxed">
                  {issue.description}
                </p>

                {issue.official_response && (
                  <div className="p-3.5 rounded-2xl bg-[#E0F1E7] border border-[#BDE3CE] text-xs text-[#1B4D36]">
                    <strong>ഔദ്യോഗിക മറുപടി:</strong> {issue.official_response}
                  </div>
                )}

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <input
                    type="text"
                    placeholder="അധികൃതരുടെ മറുപടി ഇവിടെ രേഖപ്പെടുത്താം..."
                    value={officialResponseInput[issue.id] || ""}
                    onChange={(e) =>
                      setOfficialResponseInput({
                        ...officialResponseInput,
                        [issue.id]: e.target.value,
                      })
                    }
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdateIssue(issue.id, "in_progress")}
                      className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold"
                    >
                      In Progress
                    </button>
                    <button
                      onClick={() => handleUpdateIssue(issue.id, "resolved")}
                      className="px-3 py-2 rounded-xl bg-[#1B4D36] hover:bg-[#133A28] text-white text-xs font-bold"
                    >
                      Resolved
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. EVENTS TAB */}
        {activeTab === "events" && (
          <div className="space-y-4">
            {events.map((ev) => (
              <div key={ev.id} className="bg-white rounded-3xl border border-[#EAE4D7] p-5 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase text-[#1B4D36] bg-[#E0F1E7] px-2 py-0.5 rounded-md">
                    {ev.category}
                  </span>
                  <h4 className="font-bold text-base text-[#1A2420] mt-1">{ev.title}</h4>
                  <p className="text-xs text-[#7A8880]">{ev.location_name} • {new Date(ev.start_date).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase px-2.5 py-1 rounded-full bg-slate-100 text-slate-800">
                    {ev.status}
                  </span>
                  {ev.status !== "approved" && (
                    <button
                      onClick={() => handleUpdateEvent(ev.id, "approved")}
                      className="px-3 py-1.5 rounded-xl bg-[#1B4D36] hover:bg-[#133A28] text-white text-xs font-bold"
                    >
                      അംഗീകരിക്കുക
                    </button>
                  )}
                  {ev.status !== "cancelled" && (
                    <button
                      onClick={() => handleUpdateEvent(ev.id, "cancelled")}
                      className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold"
                    >
                      റദ്ദാക്കുക
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 4. BUSINESSES TAB */}
        {activeTab === "businesses" && (
          <div className="space-y-4">
            {businesses.map((biz) => (
              <div key={biz.id} className="bg-white rounded-3xl border border-[#EAE4D7] p-5 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold text-[#1B4D36] bg-[#E0F1E7] px-2.5 py-0.5 rounded-full">
                    {biz.category}
                  </span>
                  <h4 className="font-bold text-base text-[#1A2420] mt-1">{biz.name}</h4>
                  <p className="text-xs text-[#7A8880]">{biz.address} • {biz.phone}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleUpdateBusiness(biz.id, "approved", !biz.is_verified)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                      biz.is_verified
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                    }`}
                  >
                    {biz.is_verified ? "Verified ✓" : "Verify Badge നൽകുക"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 5. POSTS MODERATION TAB */}
        {activeTab === "posts" && (
          <div className="space-y-4">
            {posts.map((p) => (
              <div key={p.id} className="bg-white rounded-3xl border border-[#EAE4D7] p-5 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-[#1A2420]">{p.author?.display_name || "Neighbor"}</span>
                  <p className="text-xs text-[#4A5750]">{p.content}</p>
                </div>
                <button
                  onClick={() => handleDeletePost(p.id)}
                  className="px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold self-start sm:self-center transition flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>നീക്കം ചെയ്യുക</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* 6. AUDIT TRAIL TAB */}
        {activeTab === "audit" && (
          <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 shadow-card overflow-x-auto">
            <h3 className="font-bold font-malayalam-serif text-base text-[#1A2420] mb-4">
              ഓഡിറ്റ് രേഖകൾ (Audit Logs)
            </h3>
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#EAE4D7] text-[#7A8880] font-bold">
                  <th className="pb-3">Action</th>
                  <th className="pb-3">Target</th>
                  <th className="pb-3">Target ID</th>
                  <th className="pb-3">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3EFE6]">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-[#FAF7F0] transition">
                    <td className="py-3 font-bold text-[#1B4D36]">{log.action}</td>
                    <td className="py-3 text-[#1A2420]">{log.target_type}</td>
                    <td className="py-3 font-mono text-[11px] text-[#7A8880]">{log.target_id ? `${log.target_id.slice(0, 8)}...` : "—"}</td>
                    <td className="py-3 text-[#7A8880]">{new Date(log.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
