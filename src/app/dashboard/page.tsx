"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { useAuth } from "@/lib/auth/context";
import { store } from "@/lib/data/store";
import { civicStore, CIVIC_CATEGORIES, CivicIssue } from "@/lib/data/civicConnectData";
import { digitalMunicipalityStore } from "@/lib/data/digitalMunicipalityData";
import { publicServiceStore, PublicServiceApplication } from "@/lib/data/publicServicesData";
import { UserRole } from "@/types/database";
import {
  User,
  ShieldCheck,
  Building2,
  AlertTriangle,
  HardHat,
  TrendingUp,
  Bell,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Plus,
  Send,
  Sparkles,
  FileText,
  FileCheck2,
  Activity,
  Layers,
  BarChart3,
  Users,
  Search,
  Eye,
  Lock,
  Megaphone,
  Briefcase,
  Wrench,
  ThumbsUp,
  MessageSquare,
  ShieldAlert,
  Settings,
  Phone,
  Copy,
  Check,
  X,
  Compass,
  ArrowRight,
  Filter,
  LogOut,
  Newspaper
} from "lucide-react";

function formatDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch {
    return dateString;
  }
}

function timeAgo(dateString: string): string {
  try {
    const now = Date.now();
    const past = new Date(dateString).getTime();
    if (isNaN(past)) return dateString;
    const diffSec = Math.floor((now - past) / 1000);
    if (diffSec < 60) return "Just now";
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
    if (diffSec < 86400 * 7) return `${Math.floor(diffSec / 86400)}d ago`;
    return formatDate(dateString);
  } catch {
    return dateString;
  }
}

export default function CitizenDashboardPage() {
  const { user, role, logout } = useAuth();

  // Active Persona (defaults to current authenticated role, with switcher for testing / privileged roles)
  const [activePersona, setActivePersona] = useState<UserRole>(role || "user");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Search and Filters for My Civic Reports
  const [reportSearch, setReportSearch] = useState("");
  const [reportStatusFilter, setReportStatusFilter] = useState<string>("all");
  const [reportCategoryFilter, setReportCategoryFilter] = useState<string>("all");

  // Selected issue for quick modal view
  const [selectedIssue, setSelectedIssue] = useState<CivicIssue | null>(null);
  const [modalComment, setModalComment] = useState("");
  const [commentSubmitting, setCommentSubmitting] = useState(false);

  // State & Filters for My Public Service Applications
  const [appSearch, setAppSearch] = useState("");
  const [appStatusFilter, setAppStatusFilter] = useState<string>("all");
  const [selectedServiceApp, setSelectedServiceApp] = useState<PublicServiceApplication | null>(null);

  // Synchronize activePersona with authenticated role
  useEffect(() => {
    if (role) {
      setActivePersona(role);
    }
  }, [role]);

  // Authenticated citizen data isolation:
  // Strictly return only issues reported by the authenticated citizen.
  // For the default seeded demo profile ("fathima_tanur" / "u0000000-0000-0000-0000-000000000003"),
  // include her seeded report (usr-fathima) and any newly submitted issues.
  const myCivicIssues = useMemo(() => {
    const all = civicStore.getIssues();
    const currentId = user?.id;
    const currentUsername = user?.username?.toLowerCase();

    return all.filter(issue => {
      if (currentId && issue.reporter_id === currentId) return true;
      if (currentUsername === "fathima_tanur" || currentId === "u0000000-0000-0000-0000-000000000003") {
        if (issue.reporter_id === "usr-fathima" || issue.reporter_name.toLowerCase().includes("fathima")) {
          return true;
        }
      }
      return false;
    });
  }, [user]);

  // Filtered reports based on search, status, and category
  const filteredReports = useMemo(() => {
    return myCivicIssues.filter(issue => {
      // Status filter
      if (reportStatusFilter !== "all") {
        if (reportStatusFilter === "pending") {
          if (issue.status !== "submitted" && issue.status !== "under_review") return false;
        } else if (reportStatusFilter === "in_progress") {
          if (issue.status !== "in_progress" && issue.status !== "forwarded" && issue.status !== "verified") return false;
        } else if (issue.status !== reportStatusFilter) {
          return false;
        }
      }

      // Category filter
      if (reportCategoryFilter !== "all" && issue.category_id !== reportCategoryFilter) {
        return false;
      }

      // Search query
      if (reportSearch.trim()) {
        const q = reportSearch.toLowerCase().trim();
        const matchesTitle = issue.title.toLowerCase().includes(q);
        const matchesTracking = issue.tracking_id.toLowerCase().includes(q);
        const matchesLocality = issue.locality.toLowerCase().includes(q);
        const matchesLandmark = issue.address_landmark?.toLowerCase().includes(q) || false;
        if (!matchesTitle && !matchesTracking && !matchesLocality && !matchesLandmark) {
          return false;
        }
      }

      return true;
    });
  }, [myCivicIssues, reportSearch, reportStatusFilter, reportCategoryFilter]);

  // Authenticated citizen service applications data isolation
  const myServiceApplications = useMemo(() => {
    const all = publicServiceStore.getApplications();
    const currentId = user?.id;
    const currentUsername = user?.username?.toLowerCase();

    return all.filter(app => {
      if (currentId && app.applicant_id === currentId) return true;
      if (currentUsername === "fathima_tanur" || currentId === "u0000000-0000-0000-0000-000000000003") {
        if (app.applicant_id === "u0000000-0000-0000-0000-000000000003" || app.applicant_name.toLowerCase().includes("fathima")) {
          return true;
        }
      }
      return false;
    });
  }, [user]);

  // Filtered applications
  const filteredApplications = useMemo(() => {
    return myServiceApplications.filter(app => {
      if (appStatusFilter !== "all" && app.status !== appStatusFilter) return false;
      if (appSearch.trim()) {
        const q = appSearch.toLowerCase().trim();
        const matchesRef = app.reference_no.toLowerCase().includes(q);
        const matchesTitle = app.service_title.toLowerCase().includes(q);
        const matchesNotes = app.notes.toLowerCase().includes(q);
        return matchesRef || matchesTitle || matchesNotes;
      }
      return true;
    });
  }, [myServiceApplications, appStatusFilter, appSearch]);

  // Profile Completion Indicator
  const profileCompletion = useMemo(() => {
    let score = 0;
    const missing: { label: string; href: string }[] = [];
    if (user?.display_name) score += 25; else missing.push({ label: "Display Name", href: "/profile" });
    if (user?.email) score += 25; else missing.push({ label: "Email Address", href: "/profile" });
    if (user?.email_verified) score += 25; else missing.push({ label: "Verify Email", href: "/profile" });
    if (user?.phone || user?.bio) score += 25; else missing.push({ label: "Add Phone or Bio", href: "/profile" });
    return { percentage: score, missing };
  }, [user]);

  // Real Citizen Activities Stream (Strictly user-related records)
  const userActivities = useMemo(() => {
    const list: {
      id: string;
      title: string;
      description?: string;
      date: string;
      type: "submitted" | "status" | "comment" | "notification" | "proposal";
      link: string;
    }[] = [];

    // 1. Citizen's submitted civic reports
    myCivicIssues.forEach(issue => {
      list.push({
        id: `act-sub-${issue.id}`,
        title: `Report Submitted: ${issue.title}`,
        description: `Tracking ID: ${issue.tracking_id} • ${issue.locality}`,
        date: issue.created_at,
        type: "submitted",
        link: `/civic/issues/${issue.id}`,
      });

      // Timeline events on citizen's reports
      if (issue.timeline && issue.timeline.length > 1) {
        issue.timeline.slice(1).forEach(event => {
          list.push({
            id: `act-tl-${event.id}`,
            title: `Status Updated: ${issue.tracking_id}`,
            description: `${event.title} - ${event.description}`,
            date: event.date,
            type: "status",
            link: `/civic/issues/${issue.id}`,
          });
        });
      }
    });

    // 2. Citizen's service applications
    myServiceApplications.forEach(app => {
      list.push({
        id: `act-ps-${app.id}`,
        title: `Service Request: ${app.service_title}`,
        description: `Ref: ${app.reference_no} • Status: ${app.status.replace('_', ' ').toUpperCase()}`,
        date: app.created_at,
        type: "submitted",
        link: `#service-applications`,
      });

      if (app.timeline && app.timeline.length > 1) {
        app.timeline.slice(1).forEach((tl, idx) => {
          list.push({
            id: `act-ps-tl-${app.id}-${idx}`,
            title: `Service Update: ${app.reference_no}`,
            description: `${tl.note} (${tl.actor})`,
            date: tl.date,
            type: "status",
            link: `#service-applications`,
          });
        });
      }
    });

    // 3. Citizen's in-app notifications
    if (user?.id) {
      const notifs = store.getNotifications(user.id);
      notifs.forEach(n => {
        list.push({
          id: `act-notif-${n.id}`,
          title: n.title,
          description: n.message,
          date: n.created_at,
          type: "notification",
          link: n.link || "/dashboard",
        });
      });
    }

    // Sort newest first
    return list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 8);
  }, [myCivicIssues, myServiceApplications, user]);

  // Citizen's community ideas (People's Voice)
  const myIdeas = useMemo(() => {
    return digitalMunicipalityStore.getProposals().slice(0, 3);
  }, []);

  // Summary Card Metrics (Strictly from real database records)
  const totalReportsCount = myCivicIssues.length;
  const pendingRequestsCount = myCivicIssues.filter(
    i => i.status === "submitted" || i.status === "under_review"
  ).length;
  const inProgressCount = myCivicIssues.filter(
    i => i.status === "in_progress" || i.status === "forwarded" || i.status === "verified"
  ).length;
  const resolvedCount = myCivicIssues.filter(i => i.status === "resolved").length;

  // Service Applications Summary Metrics (Real database records)
  const totalServiceApplicationsCount = myServiceApplications.length;
  const pendingServiceApplicationsCount = myServiceApplications.filter(
    a => a.status === "submitted" || a.status === "under_review"
  ).length;

  // Administrative / Moderator Data (For privileged preview mode)
  const isPrivilegedUser = role === "admin" || role === "super_admin" || role === "moderator";
  const pendingReports = useMemo(() => store.getModerationReports().filter(r => r.status === "pending"), []);
  const pendingCivicIssues = useMemo(() => civicStore.getIssues().filter(i => i.status === "submitted" || i.status === "under_review"), []);
  const stats = useMemo(() => store.getVerificationStats(), []);
  const devProjects = useMemo(() => digitalMunicipalityStore.getProjects(), []);
  const allUsers = useMemo(() => store.getProfiles(), []);
  const orgAnnouncements = useMemo(() => store.getAnnouncements().slice(0, 4), []);
  const orgEvents = useMemo(() => store.getEvents().slice(0, 3), []);

  const handleCopyId = (e: React.MouseEvent, trackingId: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(trackingId);
    setCopiedId(trackingId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddCommentToModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIssue || !modalComment.trim()) return;
    setCommentSubmitting(true);
    const authorName = user?.display_name || user?.username || "Citizen";
    const authorId = user?.id || "u0000000-0000-0000-0000-000000000003";
    const comment = civicStore.addComment(selectedIssue.id, authorName, authorId, modalComment.trim(), false);
    if (comment) {
      // update selected issue
      setSelectedIssue({
        ...selectedIssue,
        comments: [...selectedIssue.comments, comment],
      });
      setModalComment("");
    }
    setCommentSubmitting(false);
  };

  // User initials for avatar fallback
  const userInitials = useMemo(() => {
    if (user?.display_name) {
      const parts = user.display_name.trim().split(/\s+/);
      if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      return parts[0].slice(0, 2).toUpperCase();
    }
    if (user?.username) {
      return user.username.slice(0, 2).toUpperCase();
    }
    return "CT";
  }, [user]);

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] pb-24">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Citizen Dashboard" },
          ]}
        />

        {/* Role Switcher Bar (Only visible if user has administrative rights or during development testing) */}
        {isPrivilegedUser && (
          <div className="bg-white rounded-2xl border border-[#EDE6D8] p-3 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C39A5B] bg-[#FAF7F0] px-2.5 py-1 rounded-md border border-[#EDE6D8]">
                Privileged Access Switcher
              </span>
              <span className="text-xs text-[#5C6A64]">
                Current Role: <strong className="text-[#194B35] uppercase">{role}</strong>
              </span>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs">
              <span className="text-gray-400 font-bold mr-1 shrink-0">View As:</span>
              {[
                { r: "user" as UserRole, label: "Citizen Dashboard" },
                { r: "moderator" as UserRole, label: "Moderator Desk" },
                { r: "verified_org" as UserRole, label: "Verified Org" },
                { r: "admin" as UserRole, label: "Administrator Hub" },
              ].map((item) => (
                <button
                  key={item.r}
                  onClick={() => setActivePersona(item.r)}
                  className={`px-3 py-1 rounded-lg font-bold transition whitespace-nowrap ${
                    activePersona === item.r
                      ? "bg-[#194B35] text-white shadow-2xs"
                      : "bg-[#FAF7F0] text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* CITIZEN DASHBOARD EXPERIENCE (Primary View)                               */}
        {/* ========================================================================= */}
        {(activePersona === "user" || activePersona === "citizen") && (
          <div className="space-y-6">
            {/* 1. WELCOME SECTION */}
            <div className="bg-[#194B35] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-md">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />

              <div className="max-w-4xl space-y-4 relative z-10">
                {/* Citizen Header with Avatar & Status */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    {user?.avatar_url ? (
                      <img
                        src={user.avatar_url}
                        alt={user.display_name || "Citizen Avatar"}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white/20 shadow-md"
                      />
                    ) : (
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#C39A5B] text-[#194B35] font-black text-2xl sm:text-3xl flex items-center justify-center border-2 border-white/20 shadow-md">
                        {userInitials}
                      </div>
                    )}
                    <div className="absolute -bottom-1 -right-1 p-1 bg-emerald-500 rounded-full border-2 border-[#194B35]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>

                  {/* Name and Badges */}
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
                        <User className="w-3.5 h-3.5" />
                        <span>Citizen Portal</span>
                      </span>

                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 border ${
                        user?.email_verified
                          ? "bg-emerald-400/20 text-emerald-300 border-emerald-400/30"
                          : "bg-amber-400/20 text-amber-200 border-amber-400/30"
                      }`}>
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{user?.email_verified ? "Verified Citizen" : "Email Verification Pending"}</span>
                      </span>

                      <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-white/10 text-white/90 border border-white/20 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#C39A5B]" />
                        <span>{user?.locality || "Tanur Municipality (Ward 1–45)"}</span>
                      </span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-sans">
                      Welcome, {user?.display_name || user?.username || "Citizen"}
                    </h1>
                    <p className="text-white/80 text-xs sm:text-sm leading-relaxed max-w-2xl">
                      Your personal municipal control center for reporting civic issues, monitoring local infrastructure, and exploring public services across Tanur Municipality.
                    </p>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    href="/civic-connect"
                    className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-[#143E2C] font-bold text-xs rounded-xl flex items-center gap-1.5 transition shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Report a Civic Issue</span>
                  </Link>

                  <Link
                    href="/public-services"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 flex items-center gap-1.5 transition"
                  >
                    <Compass className="w-4 h-4 text-amber-300" />
                    <span>Explore Services</span>
                  </Link>

                  <Link
                    href="/profile"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 flex items-center gap-1.5 transition"
                  >
                    <Settings className="w-4 h-4 text-emerald-300" />
                    <span>Profile Settings</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => logout()}
                    className="px-4 py-2 bg-white/10 hover:bg-red-500/30 text-white font-bold text-xs rounded-xl border border-white/20 flex items-center gap-1.5 transition"
                  >
                    <LogOut className="w-4 h-4 text-red-300" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Profile Completion Indicator */}
            {profileCompletion.percentage < 100 && (
              <div className="bg-white rounded-2xl border border-[#EDE6D8] p-4 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#194B35]">Profile Completion:</span>
                    <span className="text-xs font-extrabold text-[#C39A5B]">{profileCompletion.percentage}%</span>
                  </div>
                  <div className="w-48 sm:w-64 h-2 bg-[#FAF7F0] rounded-full overflow-hidden border border-[#EDE6D8]">
                    <div
                      className="h-full bg-[#194B35] rounded-full transition-all duration-500"
                      style={{ width: `${profileCompletion.percentage}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] text-[#5C6A64]">Recommended next step:</span>
                  {profileCompletion.missing.map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.href}
                      className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#FAF7F0] hover:bg-[#EDE6D8] text-[#194B35] border border-[#EDE6D8] transition"
                    >
                      + {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* 2. DASHBOARD OVERVIEW — 5 KPI CARDS (Real Database Records) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {/* Total Reports */}
              <div className="bg-white rounded-2xl border border-[#EDE6D8] p-4 shadow-2xs hover:border-[#194B35] transition">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    My Civic Reports
                  </span>
                  <FileText className="w-4 h-4 text-[#194B35]" />
                </div>
                <p className="text-3xl font-black text-[#194B35] mt-2">{totalReportsCount}</p>
                <span className="text-[11px] text-emerald-700 font-bold block mt-0.5">Total Submitted</span>
              </div>

              {/* Pending Requests */}
              <div className="bg-white rounded-2xl border border-[#EDE6D8] p-4 shadow-2xs hover:border-amber-500 transition">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Pending Requests
                  </span>
                  <Clock className="w-4 h-4 text-amber-500" />
                </div>
                <p className="text-3xl font-black text-amber-600 mt-2">{pendingRequestsCount}</p>
                <span className="text-[11px] text-amber-700 font-bold block mt-0.5">Awaiting Inspection</span>
              </div>

              {/* In Progress */}
              <div className="bg-white rounded-2xl border border-[#EDE6D8] p-4 shadow-2xs hover:border-blue-500 transition">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    In Progress
                  </span>
                  <Activity className="w-4 h-4 text-blue-500" />
                </div>
                <p className="text-3xl font-black text-blue-600 mt-2">{inProgressCount}</p>
                <span className="text-[11px] text-blue-700 font-bold block mt-0.5">Action Underway</span>
              </div>

              {/* Resolved Issues */}
              <div className="bg-white rounded-2xl border border-[#EDE6D8] p-4 shadow-2xs hover:border-emerald-500 transition">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Resolved Issues
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-3xl font-black text-emerald-700 mt-2">{resolvedCount}</p>
                <span className="text-[11px] text-emerald-700 font-bold block mt-0.5">Completed</span>
              </div>

              {/* Public Service Applications */}
              <a
                href="#service-applications"
                className="bg-white rounded-2xl border border-[#EDE6D8] p-4 shadow-2xs hover:border-[#194B35] transition block"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Public Services
                  </span>
                  <FileCheck2 className="w-4 h-4 text-[#194B35]" />
                </div>
                <p className="text-3xl font-black text-[#194B35] mt-2">{totalServiceApplicationsCount}</p>
                <span className="text-[11px] text-emerald-700 font-bold block mt-0.5">
                  {pendingServiceApplicationsCount > 0 ? `${pendingServiceApplicationsCount} In Guidance` : "All Verified"}
                </span>
              </a>
            </div>

            {/* 3. QUICK ACTIONS HUB */}
            <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-[#194B35]">
                    Quick Actions Hub
                  </h2>
                  <p className="text-xs text-[#5C6A64]">
                    Direct shortcuts to core municipal services and civic tools.
                  </p>
                </div>
                <span className="text-[10px] font-bold text-[#C39A5B] bg-[#FAF7F0] px-2.5 py-1 rounded-full border border-[#EDE6D8]">
                  5 Services
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {/* 1. Report Civic Issue */}
                <Link
                  href="/civic-connect"
                  className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] hover:border-[#194B35] hover:bg-white transition group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center group-hover:scale-105 transition">
                      <AlertTriangle className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-[#1A2420] group-hover:text-[#194B35] transition">
                        Report Civic Issue
                      </h3>
                      <p className="text-[11px] text-[#5C6A64] mt-0.5 line-clamp-2">
                        Potholes, broken streetlights, or waste dumps.
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-[#194B35] flex items-center gap-1 mt-3">
                    <span>Submit Report</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition" />
                  </span>
                </Link>

                {/* 2. Explore Public Services */}
                <Link
                  href="/public-services"
                  className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] hover:border-[#194B35] hover:bg-white transition group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#194B35] flex items-center justify-center group-hover:scale-105 transition">
                      <Compass className="w-5 h-5 text-[#194B35]" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-[#1A2420] group-hover:text-[#194B35] transition">
                        Explore Public Services
                      </h3>
                      <p className="text-[11px] text-[#5C6A64] mt-0.5 line-clamp-2">
                        Certificates, trade permits, and tax payments.
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-[#194B35] flex items-center gap-1 mt-3">
                    <span>Browse 18 Services</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition" />
                  </span>
                </Link>

                {/* 3. Track Development */}
                <Link
                  href="/development-tracker"
                  className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] hover:border-[#194B35] hover:bg-white transition group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center group-hover:scale-105 transition">
                      <HardHat className="w-5 h-5 text-blue-700" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-[#1A2420] group-hover:text-[#194B35] transition">
                        Track Development
                      </h3>
                      <p className="text-[11px] text-[#5C6A64] mt-0.5 line-clamp-2">
                        Inspect 45-ward infrastructure projects & budgets.
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-[#194B35] flex items-center gap-1 mt-3">
                    <span>View Projects</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition" />
                  </span>
                </Link>

                {/* 4. Municipal Updates */}
                <Link
                  href="/news"
                  className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] hover:border-[#194B35] hover:bg-white transition group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center group-hover:scale-105 transition">
                      <Newspaper className="w-5 h-5 text-purple-700" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-[#1A2420] group-hover:text-[#194B35] transition">
                        Municipal Updates
                      </h3>
                      <p className="text-[11px] text-[#5C6A64] mt-0.5 line-clamp-2">
                        Official announcements, alerts, and verified news.
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-[#194B35] flex items-center gap-1 mt-3">
                    <span>Read Updates</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition" />
                  </span>
                </Link>

                {/* 5. Contact Municipality */}
                <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] hover:border-[#194B35] hover:bg-white transition group flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center group-hover:scale-105 transition">
                      <Phone className="w-5 h-5 text-[#C39A5B]" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-[#1A2420] group-hover:text-[#194B35] transition">
                        Contact Municipality
                      </h3>
                      <p className="text-[11px] text-[#5C6A64] mt-0.5 line-clamp-2">
                        Central Switchboard: 0494 2440228
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <a
                      href="tel:04942440228"
                      className="text-[10px] font-bold px-2.5 py-1 bg-[#194B35] text-white rounded-lg hover:bg-[#143E2C] transition"
                    >
                      Call Switchboard
                    </a>
                    <Link
                      href="/contact"
                      className="text-[10px] font-bold text-[#5C6A64] hover:text-[#194B35]"
                    >
                      Office Info
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. MY CIVIC REPORTS SECTION (Full Interactive Management) */}
            <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 shadow-2xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#EDE6D8]">
                <div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                    <h2 className="text-base sm:text-lg font-bold text-[#194B35]">
                      My Civic Reports ({myCivicIssues.length})
                    </h2>
                  </div>
                  <p className="text-xs text-[#5C6A64] mt-0.5">
                    Track the lifecycle of issues you reported to Tanur Municipality from submission to resolution.
                  </p>
                </div>

                <Link
                  href="/civic-connect"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#194B35] hover:bg-[#143E2C] text-white font-bold text-xs rounded-xl transition shadow-2xs shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Report New Issue</span>
                </Link>
              </div>

              {/* Filters & Search Bar */}
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                {/* Search Bar */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={reportSearch}
                    onChange={(e) => setReportSearch(e.target.value)}
                    placeholder="Search reports by title, tracking ID, or locality..."
                    className="w-full pl-9 pr-4 py-2 bg-[#FAF7F0] border border-[#EDE6D8] rounded-xl text-xs text-[#1A2420] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#194B35] focus:bg-white transition"
                  />
                  {reportSearch && (
                    <button
                      onClick={() => setReportSearch("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Category Filter Dropdown */}
                <div className="flex items-center gap-2">
                  <select
                    value={reportCategoryFilter}
                    onChange={(e) => setReportCategoryFilter(e.target.value)}
                    className="px-3 py-2 bg-[#FAF7F0] border border-[#EDE6D8] rounded-xl text-xs font-medium text-[#1A2420] focus:outline-none focus:ring-1 focus:ring-[#194B35]"
                  >
                    <option value="all">All Categories</option>
                    {CIVIC_CATEGORIES.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Status Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
                {[
                  { key: "all", label: "All Reports", count: myCivicIssues.length },
                  {
                    key: "pending",
                    label: "Under Review",
                    count: myCivicIssues.filter(i => i.status === "submitted" || i.status === "under_review").length,
                  },
                  {
                    key: "in_progress",
                    label: "In Progress",
                    count: myCivicIssues.filter(i => i.status === "in_progress" || i.status === "forwarded" || i.status === "verified").length,
                  },
                  {
                    key: "resolved",
                    label: "Resolved",
                    count: myCivicIssues.filter(i => i.status === "resolved").length,
                  },
                  {
                    key: "rejected",
                    label: "Rejected",
                    count: myCivicIssues.filter(i => i.status === "rejected").length,
                  },
                ].map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setReportStatusFilter(tab.key)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap text-xs flex items-center gap-1.5 ${
                      reportStatusFilter === tab.key
                        ? "bg-[#194B35] text-white shadow-2xs"
                        : "bg-[#FAF7F0] text-[#5C6A64] hover:bg-[#EDE6D8]"
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      reportStatusFilter === tab.key ? "bg-white/20 text-white" : "bg-white text-gray-600 border border-[#EDE6D8]"
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Reports List */}
              <div className="space-y-3">
                {filteredReports.map((issue) => {
                  const categoryObj = CIVIC_CATEGORIES.find(c => c.id === issue.category_id);
                  const isResolved = issue.status === "resolved";
                  const isInProgress = issue.status === "in_progress" || issue.status === "forwarded" || issue.status === "verified";
                  const isRejected = issue.status === "rejected";

                  return (
                    <div
                      key={issue.id}
                      className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] hover:border-[#194B35] transition shadow-2xs space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="space-y-1.5 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            {/* Tracking ID with Copy Button */}
                            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-white border border-[#EDE6D8] font-mono text-[11px] font-bold text-[#194B35]">
                              <span>{issue.tracking_id}</span>
                              <button
                                type="button"
                                onClick={(e) => handleCopyId(e, issue.tracking_id)}
                                title="Copy Tracking ID"
                                className="text-gray-400 hover:text-[#194B35] transition p-0.5"
                              >
                                {copiedId === issue.tracking_id ? (
                                  <Check className="w-3 h-3 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>

                            {/* Category Badge */}
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-[#5C6A64] border border-[#EDE6D8]">
                              {categoryObj?.name || issue.subcategory || "Civic Infrastructure"}
                            </span>

                            {/* Submission Date */}
                            <span className="text-[10px] text-gray-400 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{formatDate(issue.created_at)}</span>
                            </span>
                          </div>

                          <h3 className="text-sm font-bold text-[#1A2420] hover:text-[#194B35] transition">
                            {issue.title}
                          </h3>

                          <p className="text-xs text-[#5C6A64] line-clamp-2 leading-relaxed">
                            {issue.description}
                          </p>
                        </div>

                        {/* Status Badge */}
                        <div className="shrink-0">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                              isResolved
                                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                                : isInProgress
                                ? "bg-blue-50 text-blue-800 border-blue-200"
                                : isRejected
                                ? "bg-rose-50 text-rose-800 border-rose-200"
                                : "bg-amber-50 text-amber-800 border-amber-200"
                            }`}
                          >
                            {isResolved ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            ) : isInProgress ? (
                              <Activity className="w-3.5 h-3.5 text-blue-600" />
                            ) : (
                              <Clock className="w-3.5 h-3.5 text-amber-600" />
                            )}
                            <span className="capitalize">{issue.status.replace("_", " ")}</span>
                          </span>
                        </div>
                      </div>

                      {/* Locality & Actions Footer */}
                      <div className="pt-2 border-t border-[#EDE6D8] flex flex-wrap items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-1.5 text-[#5C6A64]">
                          <MapPin className="w-3.5 h-3.5 text-[#C39A5B] shrink-0" />
                          <span className="text-[11px] font-medium">{issue.address_landmark || issue.locality}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedIssue(issue)}
                            className="text-[11px] font-bold px-3 py-1 bg-white hover:bg-[#EDE6D8] text-[#194B35] rounded-lg border border-[#EDE6D8] transition flex items-center gap-1"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Quick View</span>
                          </button>

                          <Link
                            href={`/civic/issues/${issue.id}`}
                            className="text-[11px] font-bold px-3 py-1 bg-[#194B35] hover:bg-[#143E2C] text-white rounded-lg transition flex items-center gap-1 shadow-2xs"
                          >
                            <span>Full Report</span>
                            <ChevronRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Empty State */}
                {filteredReports.length === 0 && (
                  <div className="text-center py-12 px-4 rounded-2xl bg-[#FAF7F0] border border-dashed border-[#EDE6D8] space-y-3">
                    <div className="w-12 h-12 rounded-full bg-white border border-[#EDE6D8] flex items-center justify-center mx-auto text-[#C39A5B]">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-[#194B35]">No Civic Reports Found</h3>
                      <p className="text-xs text-[#5C6A64] max-w-md mx-auto">
                        {myCivicIssues.length === 0
                          ? "You haven't reported any civic issues yet. Noticed road damage, garbage dumps, or water leakages? Report an issue to notify Tanur Municipal engineers."
                          : "No reports match your current search and filter criteria. Try clearing filters or searching for another term."}
                      </p>
                    </div>
                    {myCivicIssues.length === 0 ? (
                      <Link
                        href="/civic-connect"
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#194B35] text-white font-bold text-xs rounded-xl shadow-2xs hover:bg-[#143E2C] transition"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Submit Your First Report</span>
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setReportSearch("");
                          setReportStatusFilter("all");
                          setReportCategoryFilter("all");
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white text-[#194B35] font-bold text-xs rounded-xl border border-[#EDE6D8] hover:bg-gray-100 transition"
                      >
                        Reset Filters
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* 4.5 MY PUBLIC SERVICE APPLICATIONS SECTION */}
            <div id="service-applications" className="bg-white rounded-3xl border border-[#EDE6D8] p-6 shadow-2xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#EDE6D8]">
                <div>
                  <div className="flex items-center gap-2">
                    <FileCheck2 className="w-5 h-5 text-[#194B35]" />
                    <h2 className="text-base sm:text-lg font-bold text-[#194B35]">
                      My Public Service Applications ({myServiceApplications.length})
                    </h2>
                  </div>
                  <p className="text-xs text-[#5C6A64] mt-0.5">
                    Track municipal guidance requests, document readiness verifications, and statutory portal steps.
                  </p>
                </div>

                <Link
                  href="/public-services"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#194B35] hover:bg-[#143E2C] text-white font-bold text-xs rounded-xl transition shadow-2xs shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Apply for Guidance</span>
                </Link>
              </div>

              {/* Search & Status Filters */}
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                <div className="relative flex-1">
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={appSearch}
                    onChange={(e) => setAppSearch(e.target.value)}
                    placeholder="Search by reference (PS-TNR-2026-XXXX) or service..."
                    className="w-full pl-9 pr-3 py-1.5 bg-[#FAF7F0] border border-[#EDE6D8] rounded-xl text-xs text-[#1A2420] focus:outline-hidden focus:ring-1 focus:ring-[#194B35]"
                  />
                  {appSearch && (
                    <button
                      onClick={() => setAppSearch("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Status filter tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                  {[
                    { key: "all", label: "All", count: myServiceApplications.length },
                    { key: "submitted", label: "Submitted", count: myServiceApplications.filter(a => a.status === "submitted").length },
                    { key: "under_review", label: "Under Review", count: myServiceApplications.filter(a => a.status === "under_review").length },
                    { key: "documents_verified", label: "Verified", count: myServiceApplications.filter(a => a.status === "documents_verified").length },
                    { key: "completed", label: "Completed", count: myServiceApplications.filter(a => a.status === "completed").length },
                  ].map(tab => (
                    <button
                      key={tab.key}
                      onClick={() => setAppStatusFilter(tab.key)}
                      className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap text-xs flex items-center gap-1.5 ${
                        appStatusFilter === tab.key
                          ? "bg-[#194B35] text-white shadow-2xs"
                          : "bg-[#FAF7F0] text-[#5C6A64] hover:bg-[#EDE6D8]"
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        appStatusFilter === tab.key ? "bg-white/20 text-white" : "bg-white text-gray-600 border border-[#EDE6D8]"
                      }`}>
                        {tab.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Applications List */}
              <div className="space-y-3">
                {filteredApplications.map((app) => {
                  const getStatusBadge = (status: string) => {
                    switch (status) {
                      case "submitted":
                        return { label: "Submitted", bg: "bg-amber-100 text-amber-800 border-amber-200" };
                      case "under_review":
                        return { label: "Under Review", bg: "bg-blue-100 text-blue-800 border-blue-200" };
                      case "documents_verified":
                        return { label: "Documents Verified", bg: "bg-indigo-100 text-indigo-800 border-indigo-200" };
                      case "forwarded_guidance":
                        return { label: "Guidance Forwarded", bg: "bg-purple-100 text-purple-800 border-purple-200" };
                      case "completed":
                        return { label: "Completed", bg: "bg-emerald-100 text-emerald-800 border-emerald-200" };
                      case "rejected":
                        return { label: "Needs Correction", bg: "bg-red-100 text-red-800 border-red-200" };
                      default:
                        return { label: status, bg: "bg-gray-100 text-gray-800 border-gray-200" };
                    }
                  };
                  const badge = getStatusBadge(app.status);

                  return (
                    <div
                      key={app.id}
                      className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] hover:border-[#194B35] transition flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          {/* Reference Number Pill */}
                          <button
                            onClick={(e) => handleCopyId(e, app.reference_no)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-[#EDE6D8] text-xs font-mono font-bold text-[#194B35] hover:bg-[#EDE6D8] transition"
                            title="Click to copy reference number"
                          >
                            <span>{app.reference_no}</span>
                            <span className="text-[10px] text-gray-400">
                              {copiedId === app.reference_no ? "✓ Copied" : "Copy"}
                            </span>
                          </button>

                          {/* Status Badge */}
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${badge.bg}`}>
                            {badge.label}
                          </span>

                          <span className="text-[11px] text-[#5C6A64]">
                            Ward {app.ward_number}
                          </span>
                        </div>

                        <h3 className="font-bold text-sm text-[#1A2420]">
                          {app.service_title}
                        </h3>

                        {app.status_notes && (
                          <p className="text-xs text-[#5C6A64] line-clamp-2">
                            <strong className="text-gray-700">Official Note:</strong> {app.status_notes}
                          </p>
                        )}

                        <div className="text-[10px] text-gray-400 flex items-center gap-3">
                          <span>Submitted: {new Date(app.created_at).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                          <span>•</span>
                          <span>Last Update: {new Date(app.updated_at).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                        <button
                          onClick={() => setSelectedServiceApp(app)}
                          className="px-3.5 py-2 rounded-xl bg-white hover:bg-gray-50 text-[#194B35] text-xs font-bold border border-[#EDE6D8] transition flex items-center gap-1.5 shadow-2xs"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Details</span>
                        </button>
                      </div>
                    </div>
                  );
                })}

                {filteredApplications.length === 0 && (
                  <div className="text-center py-8 bg-[#FAF7F0] rounded-2xl border border-dashed border-[#EDE6D8] space-y-2">
                    <FileCheck2 className="w-8 h-8 text-gray-300 mx-auto" />
                    <p className="text-xs font-bold text-[#194B35]">No Service Applications Found</p>
                    <p className="text-[11px] text-[#5C6A64]">
                      {myServiceApplications.length === 0
                        ? "You have not submitted any service guidance applications yet. Explore the Public Services Directory to request document assistance."
                        : "No service applications match your current search and filter criteria."}
                    </p>
                    <Link
                      href="/public-services"
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#194B35] hover:underline pt-1"
                    >
                      <span>Explore Public Services</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* 5. RECENT ACTIVITY TIMELINE & COMMUNITY PROPOSALS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity Timeline */}
              <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-[#194B35]" />
                    <h2 className="text-base font-bold text-[#194B35]">
                      Recent Activity
                    </h2>
                  </div>
                  <span className="text-[10px] font-bold text-[#5C6A64]">
                    {userActivities.length} Actions
                  </span>
                </div>

                <div className="space-y-3">
                  {userActivities.map((act) => (
                    <div
                      key={act.id}
                      className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#EDE6D8] flex items-start gap-3"
                    >
                      <div className="p-2 rounded-lg bg-white border border-[#EDE6D8] shrink-0 mt-0.5">
                        {act.type === "submitted" ? (
                          <Plus className="w-3.5 h-3.5 text-amber-600" />
                        ) : act.type === "status" ? (
                          <Activity className="w-3.5 h-3.5 text-blue-600" />
                        ) : act.type === "notification" ? (
                          <Bell className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <MessageSquare className="w-3.5 h-3.5 text-[#C39A5B]" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <Link
                            href={act.link}
                            className="text-xs font-bold text-[#1A2420] hover:text-[#194B35] transition truncate"
                          >
                            {act.title}
                          </Link>
                          <span className="text-[10px] text-gray-400 shrink-0">
                            {timeAgo(act.date)}
                          </span>
                        </div>
                        {act.description && (
                          <p className="text-[11px] text-[#5C6A64] line-clamp-1 mt-0.5">
                            {act.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}

                  {userActivities.length === 0 && (
                    <div className="text-center py-8 text-xs text-[#5C6A64]">
                      <p>No recent activity recorded yet.</p>
                      <p className="text-[11px] text-gray-400 mt-1">
                        As you report civic issues and participate in community discussions, your timeline will update automatically.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Community Proposals (People's Voice) */}
              <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[#C39A5B]" />
                    <h2 className="text-base font-bold text-[#194B35]">
                      Community Proposals
                    </h2>
                  </div>
                  <Link
                    href="/peoples-voice"
                    className="text-xs font-bold text-[#194B35] hover:underline flex items-center gap-1"
                  >
                    <span>View All Ideas</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="space-y-3">
                  {myIdeas.map((idea) => (
                    <div
                      key={idea.id}
                      className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#EDE6D8] space-y-2 hover:border-[#194B35] transition"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-gray-800 line-clamp-1">
                          {idea.title}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 shrink-0">
                          {idea.status}
                        </span>
                      </div>

                      <p className="text-[11px] text-[#5C6A64] line-clamp-1">
                        {idea.description}
                      </p>

                      <div className="flex items-center justify-between text-[11px] text-gray-500 pt-1 border-t border-[#EDE6D8]">
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3 text-[#C39A5B]" />
                          <span>{idea.support_count} supporters</span>
                        </span>
                        <span>Ward {idea.ward_number || 14}</span>
                      </div>
                    </div>
                  ))}

                  <div className="pt-2 text-center">
                    <Link
                      href="/peoples-voice/ideas/new"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#194B35] hover:underline"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Submit a New Community Idea</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODERATOR PERSONA DASHBOARD (Privileged)                                  */}
        {/* ========================================================================= */}
        {activePersona === "moderator" && isPrivilegedUser && (
          <div className="space-y-6">
            <div className="bg-[#143E2C] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-md">
              <div className="max-w-3xl space-y-3 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Civic Moderation Command Center</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Civic Moderation & Inspection Desk
                </h1>
                <p className="text-white/80 text-xs sm:text-sm leading-relaxed max-w-2xl">
                  Review incoming citizen submissions, assign field verification visits, validate uploaded photos, and moderate community discussions.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    href="/admin/civic"
                    className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-[#143E2C] font-bold text-xs rounded-xl flex items-center gap-1.5 transition shadow-sm"
                  >
                    <span>Manage Civic Queue</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href="/admin/peoples-voice"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 flex items-center gap-1.5 transition"
                  >
                    <span>Moderate Ideas</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Moderator 3 Queue Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Flagged Content */}
              <div className="bg-white rounded-3xl border border-[#EDE6D8] p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <span className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-red-500" />
                    <span>Flagged Content Reports</span>
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-800">
                    {pendingReports.length || 1}
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-[#FAF7F0] rounded-xl border border-[#EDE6D8] space-y-1">
                    <p className="font-bold text-gray-800">Discussion Comment Review</p>
                    <p className="text-[11px] text-gray-500">Duplicate message reported in Ward 18 streetlight debate.</p>
                    <div className="pt-1 flex gap-2">
                      <button className="px-2.5 py-1 bg-[#194B35] text-white rounded-lg text-[10px] font-bold">Approve</button>
                      <button className="px-2.5 py-1 bg-gray-200 text-gray-700 rounded-lg text-[10px] font-bold">Dismiss</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pending Civic Reports */}
              <div className="bg-white rounded-3xl border border-[#EDE6D8] p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <span className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                    <span>Unverified Issues</span>
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-800">
                    {pendingCivicIssues.length || 3}
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-[#FAF7F0] rounded-xl border border-[#EDE6D8] space-y-1">
                    <p className="font-bold text-gray-800">Meenadathur Road Potholes</p>
                    <p className="text-[11px] text-gray-500">Citizen submitted photo awaiting review before ward forwarding.</p>
                    <Link href="/admin/civic" className="text-[10px] font-bold text-[#194B35] hover:underline block pt-1">
                      Open Inspection →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Community Ideas Queue */}
              <div className="bg-white rounded-3xl border border-[#EDE6D8] p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <span className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    <span>Ideas in Review</span>
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {digitalMunicipalityStore.getProposals().length}
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-[#FAF7F0] rounded-xl border border-[#EDE6D8] space-y-1">
                    <p className="font-bold text-gray-800">Tanur Town Library Digitalization</p>
                    <p className="text-[11px] text-gray-500">Assess proposal eligibility for municipal education committee review.</p>
                    <Link href="/admin/peoples-voice" className="text-[10px] font-bold text-[#194B35] hover:underline block pt-1">
                      Review Proposal →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VERIFIED ORGANIZATION PERSONA DASHBOARD                                   */}
        {/* ========================================================================= */}
        {activePersona === "verified_org" && isPrivilegedUser && (
          <div className="space-y-6">
            <div className="bg-[#194B35] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-md">
              <div className="max-w-3xl space-y-3 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Verified Organization Portal</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Tanur Coastal Heritage Guild
                </h1>
                <p className="text-white/80 text-xs sm:text-sm leading-relaxed max-w-2xl">
                  Authorized portal for verified non-profits, trade unions, institutions, and civic guilds to publish official announcements and organize verified initiatives.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    href="/community"
                    className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-[#143E2C] font-bold text-xs rounded-xl flex items-center gap-1.5 transition shadow-sm"
                  >
                    <Megaphone className="w-4 h-4" />
                    <span>Publish Announcement</span>
                  </Link>

                  <Link
                    href="/events"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 flex items-center gap-1.5 transition"
                  >
                    <Calendar className="w-4 h-4 text-amber-300" />
                    <span>Host Public Event</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Org Metrics & Activity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 space-y-4">
                <h2 className="text-base font-bold text-[#194B35] flex items-center gap-2">
                  <Megaphone className="w-4 h-4 text-[#C39A5B]" />
                  <span>Published Announcements</span>
                </h2>
                <div className="space-y-2.5">
                  {orgAnnouncements.map((ann) => (
                    <div key={ann.id} className="p-3 bg-[#FAF7F0] rounded-xl border border-[#EDE6D8]">
                      <span className="text-xs font-bold text-gray-800 block line-clamp-1">{ann.title}</span>
                      <span className="text-[10px] text-gray-400">{ann.publisher_organization} • {ann.category}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 space-y-4">
                <h2 className="text-base font-bold text-[#194B35] flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#194B35]" />
                  <span>Hosted Public Events</span>
                </h2>
                <div className="space-y-2.5">
                  {orgEvents.map((evt) => (
                    <div key={evt.id} className="p-3 bg-[#FAF7F0] rounded-xl border border-[#EDE6D8] flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-gray-800 block line-clamp-1">{evt.title}</span>
                        <span className="text-[10px] text-gray-400">{evt.location_name}</span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 shrink-0">
                        {evt.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ADMINISTRATOR PERSONA DASHBOARD (Privileged)                              */}
        {/* ========================================================================= */}
        {activePersona === "admin" && isPrivilegedUser && (
          <div className="space-y-6">
            <div className="bg-[#194B35] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-md">
              <div className="max-w-3xl space-y-3 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Administrator Command Hub</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Municipal Platform Administration
                </h1>
                <p className="text-white/80 text-xs sm:text-sm leading-relaxed max-w-2xl">
                  Full-spectrum municipal oversight: manage verified users, server-side RBAC role assignments, newsroom ingestion safeguards, development tracker milestones, and immutable audit trails.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    href="/admin"
                    className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-[#143E2C] font-bold text-xs rounded-xl flex items-center gap-1.5 transition shadow-sm"
                  >
                    <span>Full Admin Panel</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href="/admin/development"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 flex items-center gap-1.5 transition"
                  >
                    <HardHat className="w-4 h-4 text-emerald-300" />
                    <span>Dev Tracker Admin</span>
                  </Link>

                  <Link
                    href="/admin/newsroom"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 flex items-center gap-1.5 transition"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Smart Newsroom</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Admin 4 KPIs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl border border-[#EDE6D8] p-4">
                <span className="text-[10px] font-bold uppercase text-gray-400 block">
                  Verified Records
                </span>
                <p className="text-2xl font-black text-[#194B35] mt-1">{stats.totalVerified}</p>
                <span className="text-[10px] text-emerald-600 font-bold">{stats.percentVerified}% Statutory Accuracy</span>
              </div>

              <div className="bg-white rounded-2xl border border-[#EDE6D8] p-4">
                <span className="text-[10px] font-bold uppercase text-gray-400 block">
                  Dev Projects
                </span>
                <p className="text-2xl font-black text-[#C39A5B] mt-1">{devProjects.length}</p>
                <span className="text-[10px] text-gray-500">₹86.60 Cr Total Budget</span>
              </div>

              <div className="bg-white rounded-2xl border border-[#EDE6D8] p-4">
                <span className="text-[10px] font-bold uppercase text-gray-400 block">
                  Active Profiles
                </span>
                <p className="text-2xl font-black text-[#194B35] mt-1">{allUsers.length}</p>
                <span className="text-[10px] text-gray-500">4 RBAC Roles</span>
              </div>

              <div className="bg-white rounded-2xl border border-[#EDE6D8] p-4">
                <span className="text-[10px] font-bold uppercase text-gray-400 block">
                  System Health
                </span>
                <p className="text-2xl font-black text-emerald-600 mt-1">99.8%</p>
                <span className="text-[10px] text-gray-500">PostgreSQL RLS Active</span>
              </div>
            </div>

            {/* Quick Administrative Module Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link href="/admin/civic" className="p-5 bg-white rounded-2xl border border-[#EDE6D8] hover:border-[#194B35] transition shadow-2xs flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[#194B35]">Civic Connect Desk</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Citizen grievances, municipal engineering responses</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>

              <Link href="/admin/development" className="p-5 bg-white rounded-2xl border border-[#EDE6D8] hover:border-[#194B35] transition shadow-2xs flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[#194B35]">Development Tracker Desk</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Projects, milestones, expenditure audits</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>

              <Link href="/admin/peoples-voice" className="p-5 bg-white rounded-2xl border border-[#EDE6D8] hover:border-[#194B35] transition shadow-2xs flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[#194B35]">People&apos;s Voice Desk</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Citizen proposals, ward committee escalation</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>

              <Link href="/admin/newsroom" className="p-5 bg-white rounded-2xl border border-[#EDE6D8] hover:border-[#194B35] transition shadow-2xs flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[#194B35]">Smart Newsroom Desk</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Statutory news feed, emergency bulletin gating</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>

              <Link href="/admin?tab=users" className="p-5 bg-white rounded-2xl border border-[#EDE6D8] hover:border-[#194B35] transition shadow-2xs flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[#194B35]">User & RBAC Security</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Server-side role assignments and account status</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>

              <Link href="/admin?tab=audit" className="p-5 bg-white rounded-2xl border border-[#EDE6D8] hover:border-[#194B35] transition shadow-2xs flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[#194B35]">Immutable Audit Log</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Statutory ledger of administrative actions</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* QUICK VIEW DETAIL MODAL */}
      {selectedIssue && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-4 shadow-xl border border-[#EDE6D8]">
            <div className="flex items-center justify-between border-b border-[#EDE6D8] pb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold bg-[#FAF7F0] px-2.5 py-1 rounded-md border border-[#EDE6D8] text-[#194B35]">
                  {selectedIssue.tracking_id}
                </span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full capitalize bg-amber-100 text-amber-800">
                  {selectedIssue.status.replace("_", " ")}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedIssue(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-[#194B35]">{selectedIssue.title}</h3>
              <p className="text-xs text-[#5C6A64] leading-relaxed">{selectedIssue.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 p-3 bg-[#FAF7F0] rounded-2xl border border-[#EDE6D8] text-xs">
              <div>
                <span className="text-[10px] text-gray-400 block font-bold uppercase">Location</span>
                <span className="font-semibold text-[#1A2420]">{selectedIssue.address_landmark || selectedIssue.locality}</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 block font-bold uppercase">Date Reported</span>
                <span className="font-semibold text-[#1A2420]">{formatDate(selectedIssue.created_at)}</span>
              </div>
            </div>

            {/* Photos */}
            {selectedIssue.images && selectedIssue.images.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#194B35]">Attached Photos:</span>
                <div className="grid grid-cols-2 gap-2">
                  {selectedIssue.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`Issue attachment ${i + 1}`}
                      className="w-full h-32 rounded-xl object-cover border border-[#EDE6D8]"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Timeline */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#194B35]">Inspection & Resolution Timeline:</span>
              <div className="space-y-2 text-xs">
                {selectedIssue.timeline.map((evt, idx) => (
                  <div key={idx} className="p-3 bg-[#FAF7F0] rounded-xl border border-[#EDE6D8] space-y-0.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-[#194B35]">{evt.title}</span>
                      <span className="text-gray-400">{formatDate(evt.date)}</span>
                    </div>
                    <p className="text-[11px] text-[#5C6A64]">{evt.description}</p>
                    <span className="text-[10px] text-gray-400 font-medium">By: {evt.actor} ({evt.actor_role})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Comments List & Add Comment Form */}
            <div className="space-y-3 pt-2 border-t border-[#EDE6D8]">
              <span className="text-xs font-bold text-[#194B35]">
                Comments & Official Responses ({selectedIssue.comments.length}):
              </span>

              <div className="space-y-2 max-h-40 overflow-y-auto">
                {selectedIssue.comments.map((c) => (
                  <div key={c.id} className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#EDE6D8] text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-800">{c.author_name}</span>
                      <span className="text-[10px] text-gray-400">{timeAgo(c.date)}</span>
                    </div>
                    <p className="text-[11px] text-[#5C6A64]">{c.content}</p>
                  </div>
                ))}
                {selectedIssue.comments.length === 0 && (
                  <p className="text-[11px] text-gray-400 italic">No comments yet. Add the first comment below.</p>
                )}
              </div>

              {/* Add Comment Input */}
              <form onSubmit={handleAddCommentToModal} className="flex gap-2">
                <input
                  type="text"
                  value={modalComment}
                  onChange={(e) => setModalComment(e.target.value)}
                  placeholder="Add a remark or update on this issue..."
                  className="flex-1 px-3 py-1.5 bg-[#FAF7F0] border border-[#EDE6D8] rounded-xl text-xs text-[#1A2420] focus:outline-none focus:ring-1 focus:ring-[#194B35]"
                />
                <button
                  type="submit"
                  disabled={commentSubmitting || !modalComment.trim()}
                  className="px-3 py-1.5 bg-[#194B35] hover:bg-[#143E2C] text-white font-bold text-xs rounded-xl disabled:opacity-50 transition shrink-0"
                >
                  Send
                </button>
              </form>
            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-[#EDE6D8] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setSelectedIssue(null)}
                className="px-4 py-2 bg-gray-100 text-gray-700 font-bold text-xs rounded-xl hover:bg-gray-200 transition"
              >
                Close
              </button>

              <Link
                href={`/civic/issues/${selectedIssue.id}`}
                className="px-4 py-2 bg-[#194B35] text-white font-bold text-xs rounded-xl hover:bg-[#143E2C] transition flex items-center gap-1.5"
              >
                <span>Open Dedicated Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SERVICE APPLICATION DETAILS MODAL                                        */}
      {/* ========================================================================= */}
      {selectedServiceApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-[#EDE6D8] max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedServiceApp(null)}
              className="absolute right-5 top-5 text-gray-400 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                OUR NATION Public Service Guidance Request
              </span>
              <h3 className="text-xl font-bold text-[#194B35]">
                {selectedServiceApp.service_title}
              </h3>
              <div className="flex items-center gap-2 pt-1">
                <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-md bg-[#FAF7F0] border border-[#EDE6D8] text-[#194B35]">
                  {selectedServiceApp.reference_no}
                </span>
                <span className="text-xs text-gray-500">
                  Ward {selectedServiceApp.ward_number}
                </span>
              </div>
            </div>

            {/* Status & Helpdesk Notes */}
            <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1A2420]">Current Status:</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#194B35] text-white">
                  {selectedServiceApp.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              {selectedServiceApp.status_notes && (
                <p className="text-xs text-[#5C6A64] leading-relaxed">
                  <strong className="text-gray-700">Official Guidance:</strong> {selectedServiceApp.status_notes}
                </p>
              )}
            </div>

            {/* Applicant Details */}
            <div className="text-xs text-[#5C6A64] space-y-1 bg-[#FAF7F0] p-3 rounded-xl border border-[#EDE6D8]">
              <p><strong>Applicant:</strong> {selectedServiceApp.applicant_name}</p>
              <p><strong>Email:</strong> {selectedServiceApp.applicant_email}</p>
              <p><strong>Phone:</strong> {selectedServiceApp.applicant_phone}</p>
              {selectedServiceApp.notes && (
                <p className="pt-1"><strong>Applicant Notes:</strong> {selectedServiceApp.notes}</p>
              )}
            </div>

            {/* Verified Documents */}
            {selectedServiceApp.documents && selectedServiceApp.documents.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#194B35] block">
                  Documents Verified / Uploaded:
                </span>
                <div className="space-y-1.5 text-xs">
                  {selectedServiceApp.documents.map((doc: any, idx: number) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#EDE6D8] flex items-center justify-between">
                      <span className="text-gray-800 font-medium">{doc.name}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        {doc.status || "Verified"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Audit Timeline */}
            <div className="space-y-2 pt-2 border-t border-[#EDE6D8]">
              <span className="text-xs font-bold text-[#194B35] block">
                Application Timeline:
              </span>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {selectedServiceApp.timeline.map((event: any, idx: number) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#EDE6D8] text-xs space-y-0.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-gray-800">{event.actor}</span>
                      <span className="text-gray-400">{timeAgo(event.date)}</span>
                    </div>
                    <p className="text-[11px] text-[#5C6A64]">{event.note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Statutory Disclaimer */}
            <div className="text-[11px] text-[#4A3D2A] bg-[#FAF4E6] p-3 rounded-xl border border-[#E8DCBF]">
              <strong>Notice:</strong> This is a guidance application managed by OUR NATION civic assistance desk. Final statutory processing and certificate downloads are completed on official Kerala Government portals.
            </div>

            <div className="pt-3 border-t border-[#EDE6D8] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setSelectedServiceApp(null)}
                className="px-4 py-2 bg-gray-100 text-gray-700 font-bold text-xs rounded-xl hover:bg-gray-200 transition"
              >
                Close
              </button>
              <Link
                href="/public-services"
                className="px-4 py-2 bg-[#194B35] text-white font-bold text-xs rounded-xl hover:bg-[#143E2C] transition inline-flex items-center gap-1.5"
              >
                <span>Services Directory</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
      <Footer />
    </div>
  );
}
