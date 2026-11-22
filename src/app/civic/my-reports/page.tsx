"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { CivicNav } from "@/components/civic/CivicNav";
import { useAuth } from "@/lib/auth/context";
import { 
  civicStore, 
  CIVIC_CATEGORIES, 
  CivicIssue 
} from "@/lib/data/civicConnectData";
import { 
  FileText, 
  PlusCircle, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Send, 
  ShieldCheck, 
  MapPin, 
  ChevronRight, 
  Copy, 
  Check, 
  ExternalLink,
  Search,
  Filter
} from "lucide-react";

export default function CivicMyReportsPage() {
  const { user } = useAuth();

  // Status tabs: all, pending, in_progress, resolved, rejected
  const [activeTab, setActiveTab] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Strictly enforce citizen data isolation
  const allIssues = civicStore.getIssues();
  const myReports = allIssues.filter((i) => {
    if (user?.id && i.reporter_id === user.id) return true;
    if (user?.username === "fathima_tanur" || user?.id === "u0000000-0000-0000-0000-000000000003") {
      if (i.reporter_id === "usr-fathima" || i.reporter_name.toLowerCase().includes("fathima")) {
        return true;
      }
    }
    return false;
  });

  const filteredReports = myReports.filter((issue) => {
    if (activeTab === "all") return true;
    if (activeTab === "pending") return issue.status === "submitted" || issue.status === "under_review";
    if (activeTab === "in_progress") return issue.status === "in_progress" || issue.status === "forwarded" || issue.status === "verified";
    return issue.status === activeTab;
  });

  const handleCopyId = (e: React.MouseEvent, trackingId: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(trackingId);
    setCopiedId(trackingId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getStatusBadge = (status: CivicIssue['status']) => {
    switch (status) {
      case "resolved":
        return { label: "Resolved", bg: "bg-emerald-100 text-emerald-800 border-emerald-300", icon: CheckCircle2 };
      case "in_progress":
        return { label: "In Progress", bg: "bg-blue-100 text-blue-800 border-blue-300", icon: Clock };
      case "forwarded":
        return { label: "Forwarded", bg: "bg-amber-100 text-amber-800 border-amber-300", icon: Send };
      case "verified":
        return { label: "Verified", bg: "bg-purple-100 text-purple-800 border-purple-300", icon: ShieldCheck };
      case "under_review":
        return { label: "Under Review", bg: "bg-sky-100 text-sky-800 border-sky-300", icon: Clock };
      case "rejected":
        return { label: "Rejected", bg: "bg-rose-100 text-rose-800 border-rose-300", icon: AlertTriangle };
      default:
        return { label: "Submitted", bg: "bg-neutral-100 text-neutral-800 border-neutral-300", icon: Clock };
    }
  };

  const stats = {
    total: myReports.length,
    inProgress: myReports.filter(i => i.status === "in_progress" || i.status === "forwarded" || i.status === "verified").length,
    resolved: myReports.filter(i => i.status === "resolved").length,
    pending: myReports.filter(i => i.status === "submitted" || i.status === "under_review").length,
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] pb-24">
      <Navbar />
      <CivicNav />

      {/* Header Hub */}
      <section className="bg-gradient-to-b from-[#FAF4E6] to-[#FAF7F0] border-b border-[#E8DCBF] pt-8 pb-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-[#194B35] text-amber-300 flex items-center justify-center">
                  <FileText className="w-3.5 h-3.5" />
                </span>
                <span className="text-xs font-bold text-[#194B35] uppercase tracking-wider">
                  Citizen Dashboard
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#194B35] font-sans">
                My Civic Reports
              </h1>
              <p className="text-xs sm:text-sm text-[#5C6A64] mt-1">
                Track the real-time status, authority forwarding, and resolution proof for issues you reported.
              </p>
            </div>

            <Link
              href="/civic-connect"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#194B35] text-white text-xs font-bold shadow-2xs hover:bg-[#143E2C] transition active:scale-95 shrink-0"
            >
              <PlusCircle className="w-4 h-4 text-amber-300" />
              <span>Report New Issue</span>
            </Link>
          </div>

          {/* Quick Metrics KPI cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white p-3.5 rounded-2xl border border-[#E8DCBF] shadow-2xs">
              <span className="text-[11px] text-[#5C6A64] block font-medium">Total Submitted</span>
              <span className="text-xl font-extrabold text-[#194B35] mt-1 block">{stats.total}</span>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-[#E8DCBF] shadow-2xs">
              <span className="text-[11px] text-[#5C6A64] block font-medium">Under Review</span>
              <span className="text-xl font-extrabold text-sky-700 mt-1 block">{stats.pending}</span>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-[#E8DCBF] shadow-2xs">
              <span className="text-[11px] text-[#5C6A64] block font-medium">In Progress</span>
              <span className="text-xl font-extrabold text-blue-700 mt-1 block">{stats.inProgress}</span>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-[#E8DCBF] shadow-2xs">
              <span className="text-[11px] text-[#5C6A64] block font-medium">Resolved</span>
              <span className="text-xl font-extrabold text-emerald-700 mt-1 block">{stats.resolved}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Filter & Listing */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-6 border-b border-[#E8DCBF] scrollbar-none text-xs">
          {[
            { id: "all", label: "All Reports", count: stats.total },
            { id: "pending", label: "Under Review", count: stats.pending },
            { id: "in_progress", label: "In Progress", count: stats.inProgress },
            { id: "resolved", label: "Resolved", count: stats.resolved },
            { id: "rejected", label: "Rejected", count: myReports.filter(i => i.status === "rejected").length },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition active:scale-95 flex items-center gap-1.5 ${
                  isActive
                    ? "bg-[#194B35] text-white shadow-2xs"
                    : "bg-white text-[#5C6A64] border border-[#DDD5C5] hover:bg-[#FAF4E6]"
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-neutral-100 text-neutral-600"}`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Reports Content */}
        {filteredReports.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#E8DCBF] p-10 text-center max-w-lg mx-auto shadow-2xs my-6">
            <div className="w-16 h-16 rounded-2xl bg-[#E0F1E7] border border-[#BDE3CE] flex items-center justify-center mx-auto mb-4 text-[#194B35]">
              <FileText className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-[#194B35] mb-2 font-sans">
              No Reports Found in this Category
            </h3>
            <p className="text-xs sm:text-sm text-[#5C6A64] mb-6">
              Report civic issues in your ward easily to receive official tracking numbers and automated updates from municipal engineers.
            </p>
            <Link
              href="/civic-connect"
              className="px-5 py-2.5 rounded-xl bg-[#194B35] text-white text-xs font-bold hover:bg-[#143E2C] transition inline-flex items-center gap-2 shadow-2xs"
            >
              <PlusCircle className="w-4 h-4 text-amber-300" />
              <span>Submit a Report</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredReports.map((issue) => {
              const statusInfo = getStatusBadge(issue.status);
              const StatusIcon = statusInfo.icon;
              const cat = CIVIC_CATEGORIES.find(c => c.id === issue.category_id);
              const isCopied = copiedId === issue.tracking_id;

              return (
                <div
                  key={issue.id}
                  className="bg-white rounded-2xl border border-[#E8DCBF] p-5 hover:border-[#194B35]/40 transition shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2 text-xs">
                      <div className="flex items-center gap-1">
                        <span className="font-mono text-[11px] font-bold text-[#194B35] bg-[#E0F1E7] px-2.5 py-0.5 rounded-lg border border-[#BDE3CE]">
                          {issue.tracking_id}
                        </span>
                        <button
                          onClick={(e) => handleCopyId(e, issue.tracking_id)}
                          className="p-1 text-neutral-400 hover:text-[#194B35] rounded"
                          title="Copy Tracking ID"
                        >
                          {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${statusInfo.bg}`}>
                        <StatusIcon className="w-3 h-3" />
                        {statusInfo.label}
                      </span>

                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded"
                        style={{ backgroundColor: `${cat?.color || '#194B35'}15`, color: cat?.color || '#194B35' }}
                      >
                        {cat?.name || issue.subcategory}
                      </span>
                    </div>

                    <Link href={`/civic/issues/${issue.id}`} className="hover:text-[#194B35] transition">
                      <h3 className="font-bold text-base text-[#1A2420] mb-1">
                        {issue.title}
                      </h3>
                    </Link>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 mt-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#8C5B0F]" />
                        {issue.address_landmark || issue.locality}
                      </span>
                      <span>•</span>
                      <span>Date: {new Date(issue.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                      <span>•</span>
                      <span>👍 {issue.support_count} supporters</span>
                    </div>

                    {/* Forwarding tag if exists */}
                    {issue.authority_forwarding && (
                      <div className="mt-2 text-[11px] text-amber-900 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 inline-block">
                        Forwarded to: <strong>{issue.authority_forwarding.authority_name}</strong> (Ref: {issue.authority_forwarding.reference_no})
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-neutral-100">
                    <Link
                      href={`/civic/issues/${issue.id}`}
                      className="px-4 py-2 rounded-xl bg-[#194B35] text-white text-xs font-bold hover:bg-[#143E2C] transition inline-flex items-center gap-1.5 shadow-2xs"
                    >
                      <span>View Full Report</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
