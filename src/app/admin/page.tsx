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
  Clock
} from "lucide-react";
import { IssueStatus, EventStatus, BusinessStatus, UserRole } from "@/types/database";

export default function AdminPage() {
  const { t, language } = useLanguage();
  const { role, user } = useAuth();
  const { availableCommunities } = useCommunity();

  const [activeTab, setActiveTab] = useState<"overview" | "issues" | "events" | "businesses" | "announcements" | "posts" | "users" | "audit">("overview");

  // State queries from store
  const [issues, setIssues] = useState(() => store.getIssueReports());
  const [events, setEvents] = useState(() => store.getEvents(undefined, undefined, false));
  const [businesses, setBusinesses] = useState(() => store.getBusinesses(undefined, undefined, false));
  const [announcements, setAnnouncements] = useState(() => store.getAnnouncements(undefined, false));
  const [posts, setPosts] = useState(() => store.getPosts());
  const [auditLogs, setAuditLogs] = useState(() => store.getAuditLogs());
  const [officialResponseInput, setOfficialResponseInput] = useState<{ [id: string]: string }>({});

  const isAuthorized = role === "admin" || role === "moderator";

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-surface rounded-2xl border border-red-200 p-8 text-center shadow-lg">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-foreground">Access Restricted</h2>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              This administrative portal requires Moderator or Platform Administrator privileges. You can switch your role in the navigation bar to test admin features.
            </p>
          </div>
        </main>
        <Footer />
        <BottomNav />
      </div>
    );
  }

  // Handlers
  const handleUpdateIssue = (id: string, newStatus: IssueStatus) => {
    const responseNote = officialResponseInput[id] || undefined;
    store.updateIssueStatus(id, newStatus, responseNote, user?.id);
    setIssues(store.getIssueReports());
    setAuditLogs(store.getAuditLogs());
  };

  const handleUpdateEvent = (id: string, newStatus: EventStatus) => {
    store.updateEventStatus(id, newStatus, undefined, user?.id);
    setEvents(store.getEvents(undefined, undefined, false));
    setAuditLogs(store.getAuditLogs());
  };

  const handleUpdateBusiness = (id: string, newStatus: BusinessStatus, verified: boolean) => {
    store.updateBusinessStatus(id, newStatus, verified, user?.id);
    setBusinesses(store.getBusinesses(undefined, undefined, false));
    setAuditLogs(store.getAuditLogs());
  };

  const handleDeletePost = (id: string) => {
    store.deletePost(id, user?.id || "admin");
    setPosts(store.getPosts());
    setAuditLogs(store.getAuditLogs());
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-700" />
              <h1 className="text-2xl font-bold text-foreground">
                {t("adminDashboard")}
              </h1>
              <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-full uppercase">
                {role} mode
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Multi-community administration, civic issue resolution, content moderation, and audit logs.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 overflow-x-auto pb-2 border-b border-border mb-6 scrollbar-none">
          {[
            { id: "overview", label: "Overview", icon: Activity },
            { id: "issues", label: `Civic Issues (${issues.length})`, icon: AlertTriangle },
            { id: "events", label: `Events (${events.length})`, icon: Calendar },
            { id: "businesses", label: `Businesses (${businesses.length})`, icon: Briefcase },
            { id: "posts", label: `Posts (${posts.length})`, icon: Eye },
            { id: "audit", label: `Audit Trail (${auditLogs.length})`, icon: Clock },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
                  isActive
                    ? "bg-brand-700 text-white shadow-xs"
                    : "bg-surface hover:bg-muted text-muted-foreground hover:text-foreground border border-border"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 1. OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-surface rounded-2xl border border-border p-5 shadow-xs">
                <span className="text-xs text-muted-foreground font-medium">Local Communities</span>
                <div className="text-2xl font-bold text-foreground mt-1">{availableCommunities.length}</div>
                <span className="text-[10px] text-emerald-600 font-semibold">India → Kerala</span>
              </div>

              <div className="bg-surface rounded-2xl border border-border p-5 shadow-xs">
                <span className="text-xs text-muted-foreground font-medium">Civic Issues Tracked</span>
                <div className="text-2xl font-bold text-foreground mt-1">{issues.length}</div>
                <span className="text-[10px] text-amber-600 font-semibold">Active Resolution</span>
              </div>

              <div className="bg-surface rounded-2xl border border-border p-5 shadow-xs">
                <span className="text-xs text-muted-foreground font-medium">Published Events</span>
                <div className="text-2xl font-bold text-foreground mt-1">{events.length}</div>
                <span className="text-[10px] text-blue-600 font-semibold">Verified Gatherings</span>
              </div>

              <div className="bg-surface rounded-2xl border border-border p-5 shadow-xs">
                <span className="text-xs text-muted-foreground font-medium">Local Services</span>
                <div className="text-2xl font-bold text-foreground mt-1">{businesses.length}</div>
                <span className="text-[10px] text-emerald-600 font-semibold">Neighborhood Listings</span>
              </div>
            </div>

            {/* Parent-Child Hierarchy Preview */}
            <div className="bg-surface rounded-2xl border border-border p-6 shadow-xs">
              <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-brand-700" />
                <span>Active Community Hierarchy (Parent → Child Localities)</span>
              </h3>
              <div className="divide-y divide-border/60 text-xs">
                {availableCommunities.map((c) => (
                  <div key={c.id} className="py-2.5 flex items-center justify-between">
                    <div>
                      <strong className="text-foreground">{c.name} ({c.name_ml})</strong>
                      <span className="text-muted-foreground ml-2">• District: {c.district}</span>
                    </div>
                    <span className="text-[10px] font-semibold bg-muted px-2 py-0.5 rounded-full uppercase">
                      {c.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. CIVIC ISSUES MANAGEMENT TAB */}
        {activeTab === "issues" && (
          <div className="space-y-4">
            <div className="bg-surface rounded-2xl border border-border divide-y divide-border overflow-hidden shadow-xs">
              {issues.map((iss) => (
                <div key={iss.id} className="p-5 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${
                          iss.status === "resolved"
                            ? "bg-emerald-100 text-emerald-800"
                            : iss.status === "in_progress"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-amber-100 text-amber-800"
                        }`}>
                          {iss.status}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {iss.category} • {iss.community?.name || "Community"}
                        </span>
                      </div>
                      <h4 className="font-bold text-base text-foreground mt-1">
                        {iss.title}
                      </h4>
                    </div>

                    {/* Status update controls */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      {(["submitted", "acknowledged", "in_progress", "resolved", "rejected"] as IssueStatus[]).map((st) => (
                        <button
                          key={st}
                          onClick={() => handleUpdateIssue(iss.id, st)}
                          className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase transition ${
                            iss.status === st
                              ? "bg-brand-700 text-white"
                              : "bg-muted text-muted-foreground hover:bg-muted/80"
                          }`}
                        >
                          {st.replace("_", " ")}
                        </button>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {iss.description}
                  </p>

                  <div className="text-xs text-muted-foreground">
                    📍 <strong>Location:</strong> {iss.location_name || "N/A"}
                  </div>

                  {/* Official Response Note */}
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <input
                      type="text"
                      placeholder="Add or update official authority response note..."
                      defaultValue={iss.official_response || ""}
                      onChange={(e) =>
                        setOfficialResponseInput({ ...officialResponseInput, [iss.id]: e.target.value })
                      }
                      className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-border bg-background text-foreground"
                    />
                    <button
                      onClick={() => handleUpdateIssue(iss.id, iss.status)}
                      className="px-3 py-1.5 rounded-xl bg-brand-700 text-white text-xs font-semibold hover:bg-brand-800"
                    >
                      Save Official Note
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. EVENTS APPROVALS TAB */}
        {activeTab === "events" && (
          <div className="bg-surface rounded-2xl border border-border divide-y divide-border overflow-hidden shadow-xs">
            {events.map((ev) => (
              <div key={ev.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${
                      ev.status === "approved" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                    }`}>
                      {ev.status}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {ev.category} • {new Date(ev.start_date).toLocaleDateString()}
                    </span>
                  </div>
                  <h4 className="font-bold text-base text-foreground mt-1">{ev.title}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{ev.description}</p>
                  <p className="text-[11px] text-muted-foreground mt-1">📍 {ev.location_name} • Org: {ev.organizer_name}</p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleUpdateEvent(ev.id, "approved")}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Approve</span>
                  </button>
                  <button
                    onClick={() => handleUpdateEvent(ev.id, "rejected")}
                    className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold flex items-center gap-1"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 4. BUSINESSES APPROVALS TAB */}
        {activeTab === "businesses" && (
          <div className="bg-surface rounded-2xl border border-border divide-y divide-border overflow-hidden shadow-xs">
            {businesses.map((biz) => (
              <div key={biz.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${
                      biz.status === "approved" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                    }`}>
                      {biz.status}
                    </span>
                    {biz.is_verified && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 uppercase">
                        Verified
                      </span>
                    )}
                    <span className="text-xs text-muted-foreground">{biz.category}</span>
                  </div>
                  <h4 className="font-bold text-base text-foreground mt-1">{biz.name}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{biz.description}</p>
                  <p className="text-[11px] text-muted-foreground mt-1">📍 {biz.address} • 📞 {biz.phone}</p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleUpdateBusiness(biz.id, "approved", !biz.is_verified)}
                    className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{biz.is_verified ? "Unverify" : "Verify Badge"}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 5. POST MODERATION TAB */}
        {activeTab === "posts" && (
          <div className="bg-surface rounded-2xl border border-border divide-y divide-border overflow-hidden shadow-xs">
            {posts.map((p) => (
              <div key={p.id} className="p-5 flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-foreground">{p.author?.display_name || "Resident"}</span>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{p.content}</p>
                  <span className="text-[10px] text-muted-foreground mt-1 block">
                    {new Date(p.created_at).toLocaleString()} • {p.community?.name}
                  </span>
                </div>
                <button
                  onClick={() => handleDeletePost(p.id)}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-red-50 text-red-600 hover:bg-red-100 flex items-center gap-1 flex-shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* 6. AUDIT LOGS TAB */}
        {activeTab === "audit" && (
          <div className="bg-surface rounded-2xl border border-border divide-y divide-border overflow-hidden shadow-xs">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-4 flex items-center justify-between text-xs">
                <div>
                  <strong className="text-brand-800 dark:text-brand-300 font-mono">[{log.action}]</strong>
                  <span className="text-foreground ml-2">Target: {log.target_type} ({log.target_id})</span>
                </div>
                <span className="text-[10px] text-muted-foreground">
                  {new Date(log.created_at).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        )}

      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
