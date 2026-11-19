"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { AdminCivicNav } from "@/components/civic/AdminCivicNav";
import { useLanguage } from "@/lib/i18n/context";
import { 
  civicStore, 
  CIVIC_CATEGORIES, 
  CIVIC_AUTHORITIES, 
  CivicIssue 
} from "@/lib/data/civicConnectData";
import { 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  Send, 
  Building2, 
  FolderTree, 
  BarChart3, 
  FileSpreadsheet, 
  ArrowRight, 
  Eye, 
  ChevronRight,
  ThumbsUp,
  MapPin,
  TrendingUp,
  ShieldAlert
} from "lucide-react";

export default function AdminCivicOverviewPage() {
  const { language } = useLanguage();
  const [issues, setIssues] = useState<CivicIssue[]>(() => civicStore.getIssues());
  const analytics = civicStore.getCivicAnalytics();

  const urgentOrPending = issues.filter(
    (i) => i.status === "submitted" || i.status === "under_review" || i.priority === "urgent"
  );

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] pb-24">
      <Navbar />
      <AdminCivicNav />

      {/* Hero Welcome */}
      <section className="bg-gradient-to-b from-[#FAF4E6] to-[#FAF7F0] border-b border-[#E8DCBF] pt-8 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#143E2C] text-white">
                  താനൂർ നഗരസഭ & മലപ്പുറം സിവിക് കമാൻഡ് സെന്റർ
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#194B35] font-serif">
                {language === "ml" ? "സിവിക് മോഡറേഷൻ അവലോകനം" : "Civic Connect Admin Overview"}
              </h1>
              <p className="text-xs sm:text-sm text-[#5C6A64] mt-1">
                {language === "ml"
                  ? "പൗരന്മാർ റിപ്പോർട്ട് ചെയ്ത പ്രശ്നങ്ങൾ പരിശോധിക്കുക, സർക്കാർ വകുപ്പുകളിലേക്ക് കൈമാറുക, പരിഹാര പുരോഗതി രേഖപ്പെടുത്തുക."
                  : "Moderate resident civic reports, verify field submissions, forward to authorities, and record verified resolutions."}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/admin/civic/issues"
                className="px-4 py-2 rounded-xl bg-[#194B35] text-white text-xs font-bold hover:bg-[#143E2C] transition inline-flex items-center gap-2 shadow-xs"
              >
                <FileSpreadsheet className="w-4 h-4 text-amber-300" />
                <span>പരാതികൾ കൈകാര്യം ചെയ്യുക</span>
              </Link>
            </div>
          </div>

          {/* Key KPI Metric Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            <div className="bg-white p-4 rounded-2xl border border-[#E8DCBF] shadow-xs">
              <span className="text-[11px] font-semibold text-[#5C6A64] block">ആകെ പരാതികൾ</span>
              <span className="text-2xl font-extrabold text-[#194B35] mt-1 block">{analytics.total}</span>
              <span className="text-[10px] text-neutral-400 mt-0.5 block">താനൂർ & മലപ്പുറം</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-sky-200 bg-sky-50/30 shadow-xs">
              <span className="text-[11px] font-semibold text-sky-800 block">അവലോകനത്തിൽ</span>
              <span className="text-2xl font-extrabold text-sky-700 mt-1 block">{analytics.pending}</span>
              <span className="text-[10px] text-sky-600 mt-0.5 block">സ്ഥിരീകരണം ആവശ്യം</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-purple-200 bg-purple-50/30 shadow-xs">
              <span className="text-[11px] font-semibold text-purple-800 block">സ്ഥിരീകരിച്ചവ</span>
              <span className="text-2xl font-extrabold text-purple-700 mt-1 block">{analytics.verified}</span>
              <span className="text-[10px] text-purple-600 mt-0.5 block">മോഡറേഷൻ പൂർത്തിയായി</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-amber-200 bg-amber-50/30 shadow-xs">
              <span className="text-[11px] font-semibold text-amber-800 block">കൈമാറിയവ</span>
              <span className="text-2xl font-extrabold text-amber-700 mt-1 block">{analytics.forwarded}</span>
              <span className="text-[10px] text-amber-600 mt-0.5 block">ഡിപ്പാർട്ട്മെന്റുകളിൽ</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-blue-200 bg-blue-50/30 shadow-xs">
              <span className="text-[11px] font-semibold text-blue-800 block">നടപടിയിൽ</span>
              <span className="text-2xl font-extrabold text-blue-700 mt-1 block">{analytics.inProgress}</span>
              <span className="text-[10px] text-blue-600 mt-0.5 block">പ്രവൃത്തി നടക്കുന്നു</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-emerald-200 bg-emerald-50/30 shadow-xs">
              <span className="text-[11px] font-semibold text-emerald-800 block">പരിഹരിച്ചവ</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-extrabold text-emerald-700">{analytics.resolved}</span>
                <span className="text-xs font-bold text-emerald-600">({analytics.resolutionRate}%)</span>
              </div>
              <span className="text-[10px] text-emerald-600 mt-0.5 block">വിജയ നിരക്ക്</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Admin Workspace Columns */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Action Queue Column (2 Cols) */}
          <div className="lg:col-span-2 space-y-6">

            {/* Urgent & Pending Moderation Queue */}
            <div className="bg-white rounded-3xl border border-[#E8DCBF] p-5 sm:p-6 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                    <ShieldAlert className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#194B35] font-serif">
                      പരിശോധന ആവശ്യമുള്ള പരാതികൾ (Moderation Action Queue)
                    </h3>
                    <p className="text-[11px] text-[#5C6A64]">
                      ഉടൻ വെരിഫിക്കേഷനും കൈമാറ്റത്തിനും കാത്തിരിക്കുന്ന പരാതികൾ
                    </p>
                  </div>
                </div>
                <Link
                  href="/admin/civic/issues?status=pending"
                  className="text-xs font-bold text-[#194B35] hover:text-[#8C5B0F] transition flex items-center gap-1"
                >
                  <span>എല്ലാം കാണുക</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-3">
                {urgentOrPending.length === 0 ? (
                  <p className="text-xs text-neutral-400 py-4 text-center italic">
                    നിലവിൽ കാത്തിരിക്കുന്ന അടിയന്തിര പരാതികളൊന്നുമില്ല.
                  </p>
                ) : (
                  urgentOrPending.slice(0, 5).map((issue) => (
                    <div
                      key={issue.id}
                      className="p-3.5 rounded-2xl bg-[#FAF7F0] border border-[#DDD5C5] hover:border-[#194B35]/40 transition flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1 text-xs">
                          <span className="font-mono text-[10px] font-bold text-[#194B35] bg-white px-2 py-0.2 rounded border border-[#DDD5C5]">
                            {issue.tracking_id}
                          </span>
                          {issue.priority === "urgent" && (
                            <span className="text-[9px] font-bold bg-rose-100 text-rose-700 px-1.5 py-0.2 rounded">
                              അടിയന്തിരം
                            </span>
                          )}
                          <span className="text-[10px] text-neutral-500">
                            {new Date(issue.created_at).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                          </span>
                        </div>
                        <h4 className="font-bold text-xs sm:text-sm text-[#1A2420] truncate">
                          {issue.title_ml || issue.title}
                        </h4>
                        <p className="text-[11px] text-neutral-500 truncate mt-0.5">
                          📍 {issue.address_landmark}, {issue.locality}
                        </p>
                      </div>

                      <div className="shrink-0 flex items-center gap-2">
                        <Link
                          href={`/admin/civic/issues/${issue.id}`}
                          className="px-3 py-1.5 rounded-xl bg-[#194B35] text-white text-xs font-bold hover:bg-[#143E2C] transition inline-flex items-center gap-1"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                          <span>പരിശോധിക്കുക</span>
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Quick Admin Navigation Modules */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                href="/admin/civic/categories"
                className="bg-white p-5 rounded-2xl border border-[#E8DCBF] hover:border-[#194B35]/40 shadow-xs transition group"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#8C5B0F] flex items-center justify-center mb-3 group-hover:scale-105 transition">
                  <FolderTree className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-[#194B35] mb-1">വിഭാഗങ്ങൾ (Categories)</h4>
                <p className="text-[11px] text-[#5C6A64]">
                  8 പ്രധാന വിഭാഗങ്ങളും സബ്-കാറ്റഗറികളും കൈകാര്യം ചെയ്യുക.
                </p>
              </Link>

              <Link
                href="/admin/civic/authorities"
                className="bg-white p-5 rounded-2xl border border-[#E8DCBF] hover:border-[#194B35]/40 shadow-xs transition group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#194B35] flex items-center justify-center mb-3 group-hover:scale-105 transition">
                  <Building2 className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-[#194B35] mb-1">അധികൃതർ (Authorities)</h4>
                <p className="text-[11px] text-[#5C6A64]">
                  താനൂർ നഗരസഭ, KSEB, KWA ബന്ധപ്പെടൽ വിവരങ്ങൾ.
                </p>
              </Link>

              <Link
                href="/admin/civic/analytics"
                className="bg-white p-5 rounded-2xl border border-[#E8DCBF] hover:border-[#194B35]/40 shadow-xs transition group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-3 group-hover:scale-105 transition">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-[#194B35] mb-1">അനലിറ്റിക്സ് (Analytics)</h4>
                <p className="text-[11px] text-[#5C6A64]">
                  വാർഡ് തിരിച്ചുള്ള ഡാറ്റയും പരിഹാര നിരക്കുകളും.
                </p>
              </Link>
            </div>

          </div>

          {/* Right Sidebar: Authority Forwarding Status */}
          <div className="space-y-6">

            {/* Local Authorities Quick Status */}
            <div className="bg-white rounded-3xl border border-[#E8DCBF] p-5 sm:p-6 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-4">
                <h3 className="text-sm font-bold text-[#194B35] font-serif flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#8C5B0F]" />
                  <span>ബന്ധപ്പെട്ട വകുപ്പുകൾ</span>
                </h3>
                <Link href="/admin/civic/authorities" className="text-xs text-[#8C5B0F] font-bold hover:underline">
                  ഡയറക്ടറി →
                </Link>
              </div>

              <div className="space-y-3">
                {CIVIC_AUTHORITIES.map((auth) => (
                  <div key={auth.id} className="p-3 rounded-xl bg-[#FAF7F0] border border-[#DDD5C5] text-xs">
                    <div className="flex items-start justify-between gap-2">
                      <strong className="text-[#194B35] block leading-tight">{auth.name_ml}</strong>
                      <span className="font-bold text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full shrink-0">
                        {auth.active_issues_count} ആക്ടീവ്
                      </span>
                    </div>
                    <span className="text-[11px] text-neutral-500 mt-1 block">{auth.department}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ward Coverage Note */}
            <div className="bg-[#FAF4E6] rounded-3xl border border-[#E8DCBF] p-5 text-xs text-[#5C6A64]">
              <strong className="text-[#194B35] block mb-1 font-serif text-sm">
                ഭൂമിശാസ്ത്രപരമായ പരിധി (Scope)
              </strong>
              <p className="leading-relaxed">
                സിവിക് കണക്ട് താനൂർ നഗരസഭയിലെ 44 വാർഡുകളിലെയും സമീപ താനൂർ ബ്ലോക്ക് പഞ്ചായത്തിലെയും ജനങ്ങൾക്ക് വേണ്ടിയുള്ളതാണ്. സർട്ടിഫൈ ചെയ്ത സർക്കാർ നോഡുകളിലേക്ക് പരാതികൾ വേഗത്തിൽ റൂട്ട് ചെയ്യാൻ ഈ ഡാഷ്‌ബോർഡ് ഉപയോഗിക്കുക.
              </p>
            </div>

          </div>

        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
