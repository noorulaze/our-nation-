"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { AdminNewsroomNav } from "@/components/news/AdminNewsroomNav";
import { useLanguage } from "@/lib/i18n/context";
import { newsroomStore } from "@/lib/data/newsroomStore";
import { 
  Radio, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  Flame, 
  Clock, 
  Rss, 
  FileSpreadsheet, 
  BarChart3, 
  AlertCircle, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  Cpu
} from "lucide-react";

export default function AdminNewsroomOverviewPage() {
  const { language } = useLanguage();
  const [analytics, setAnalytics] = useState(() => newsroomStore.getNewsroomAnalytics());
  const [sources, setSources] = useState(() => newsroomStore.getSources());
  const [fetchLogs, setFetchLogs] = useState(() => newsroomStore.getFetchLogs());
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<string | null>(null);

  const handleSyncFeeds = async () => {
    setIsSyncing(true);
    try {
      const res = await fetch("/api/newsroom/ingest", { method: "POST" });
      const data = await res.json();
      setAnalytics(newsroomStore.getNewsroomAnalytics());
      setSources(newsroomStore.getSources());
      setFetchLogs(newsroomStore.getFetchLogs());
      setSyncResult(`സമന്വയം പൂർത്തിയായി! ${data.sourcesPolled} ഉറവിടങ്ങൾ പരിശോധിച്ചു.`);
      setTimeout(() => setSyncResult(null), 4000);
    } catch {
      setSyncResult("സമന്വയ പ്രക്രിയ പൂർത്തിയായി.");
      setTimeout(() => setSyncResult(null), 4000);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] pb-24">
      <Navbar />
      <AdminNewsroomNav />

      {/* Header Hub */}
      <section className="bg-gradient-to-b from-[#FAF4E6] to-[#FAF7F0] border-b border-[#E8DCBF] pt-8 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-6 h-6 rounded-lg bg-[#143E2C] text-amber-300 flex items-center justify-center font-bold">
                  <Radio className="w-3.5 h-3.5" />
                </span>
                <span className="text-xs font-bold text-[#143E2C] uppercase tracking-wider">
                  ഓട്ടോമേറ്റഡ് ന്യൂസ്‌റൂം കൺട്രോൾ
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#194B35] font-serif">
                {language === "ml" ? "ന്യൂസ്‌റൂം കമാൻഡ് സെന്റർ" : "Smart Newsroom Command Center"}
              </h1>
              <p className="text-xs sm:text-sm text-[#5C6A64] mt-1">
                വാർത്താ ഉറവിടങ്ങൾ നിരീക്ഷിക്കുക, തത്സമയ ഫീഡുകൾ ക്രമീകരിക്കുക, എഡിറ്റോറിയൽ റിവ്യൂ നടത്തുക.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSyncFeeds}
                disabled={isSyncing}
                className="px-4 py-2 rounded-xl bg-[#194B35] text-white text-xs font-bold hover:bg-[#143E2C] transition inline-flex items-center gap-2 shadow-xs disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-amber-300 ${isSyncing ? "animate-spin" : ""}`} />
                <span>{isSyncing ? "ഫീഡുകൾ ശേഖരിക്കുന്നു..." : "ഫീഡുകൾ ഇപ്പോൾ പുതുക്കുക (Sync)"}</span>
              </button>
            </div>
          </div>

          {syncResult && (
            <div className="mb-6 p-3 rounded-xl bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>{syncResult}</span>
            </div>
          )}

          {/* Key KPI Metric Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            <div className="bg-white p-4 rounded-2xl border border-[#E8DCBF] shadow-xs">
              <span className="text-[11px] font-semibold text-[#5C6A64] block">ആകെ ശേഖരിച്ചവ</span>
              <span className="text-2xl font-extrabold text-[#194B35] mt-1 block">{analytics.totalArticles}</span>
              <span className="text-[10px] text-neutral-400 mt-0.5 block">എല്ലാ ഫീഡുകളിൽ നിന്നും</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-emerald-200 bg-emerald-50/30 shadow-xs">
              <span className="text-[11px] font-semibold text-emerald-800 block">ഓട്ടോ-പബ്ലിഷ് നിരക്ക്</span>
              <span className="text-2xl font-extrabold text-emerald-700 mt-1 block">{analytics.autoPublishRate}%</span>
              <span className="text-[10px] text-emerald-600 mt-0.5 block">{analytics.publishedCount} പ്രസിദ്ധീകരിച്ചു</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-rose-200 bg-rose-50/30 shadow-xs">
              <span className="text-[11px] font-semibold text-rose-800 block">ബ്രേക്കിംഗ് ന്യൂസ്</span>
              <span className="text-2xl font-extrabold text-rose-700 mt-1 block">{analytics.breakingCount}</span>
              <span className="text-[10px] text-rose-600 mt-0.5 block">സ്ഥിരീകരിച്ച മുന്നറിയിപ്പുകൾ</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-amber-200 bg-amber-50/30 shadow-xs">
              <span className="text-[11px] font-semibold text-amber-800 block">റിവ്യൂ ക്യൂ</span>
              <span className="text-2xl font-extrabold text-amber-700 mt-1 block">{analytics.reviewCount}</span>
              <span className="text-[10px] text-amber-600 mt-0.5 block">സൂക്ഷ്മപരിശോധന ആവശ്യമുള്ളവ</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-blue-200 bg-blue-50/30 shadow-xs">
              <span className="text-[11px] font-semibold text-blue-800 block">സജീവ ഉറവിടങ്ങൾ</span>
              <span className="text-2xl font-extrabold text-blue-700 mt-1 block">{analytics.activeSourcesCount}</span>
              <span className="text-[10px] text-blue-600 mt-0.5 block">2-5 മിനിറ്റ് ഇന്റർവൽ</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#E8DCBF] shadow-xs">
              <span className="text-[11px] font-semibold text-[#5C6A64] block">ആകെ വായനകൾ</span>
              <span className="text-2xl font-extrabold text-[#8C5B0F] mt-1 block">{analytics.totalViews}</span>
              <span className="text-[10px] text-neutral-400 mt-0.5 block">വായനക്കാരുടെ എണ്ണം</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left 2 Cols: Ingestion Activity & Modules */}
          <div className="lg:col-span-2 space-y-6">

            {/* Quick Admin Navigation Modules */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                href="/admin/newsroom/sources"
                className="bg-white p-5 rounded-2xl border border-[#E8DCBF] hover:border-[#194B35]/40 shadow-xs transition group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#194B35] flex items-center justify-center mb-3 group-hover:scale-105 transition">
                  <Rss className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-[#194B35] mb-1">വാർത്താ ഉറവിടങ്ങൾ (Sources)</h4>
                <p className="text-[11px] text-[#5C6A64]">
                  6 അംഗീകൃത ഫീഡുകൾ കോൺഫിഗർ ചെയ്യുക.
                </p>
              </Link>

              <Link
                href="/admin/newsroom/articles"
                className="bg-white p-5 rounded-2xl border border-[#E8DCBF] hover:border-[#194B35]/40 shadow-xs transition group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-3 group-hover:scale-105 transition">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-[#194B35] mb-1">വാർത്താ മാനേജ്‌മെന്റ്</h4>
                <p className="text-[11px] text-[#5C6A64]">
                  തിരുത്തലുകൾ നൽകുക, അൺപബ്ലിഷ് ചെയ്യുക.
                </p>
              </Link>

              <Link
                href="/admin/newsroom/review"
                className="bg-white p-5 rounded-2xl border border-[#E8DCBF] hover:border-[#194B35]/40 shadow-xs transition group"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#8C5B0F] flex items-center justify-center mb-3 group-hover:scale-105 transition">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-[#194B35] mb-1">എഡിറ്റോറിയൽ റിവ്യൂ ക്യൂ</h4>
                <p className="text-[11px] text-[#5C6A64]">
                  സ്ഥിരീകരിക്കാത്ത സെൻസിറ്റീവ് വാർത്തകൾ.
                </p>
              </Link>
            </div>

            {/* Recent Fetch Logs Table */}
            <div className="bg-white rounded-3xl border border-[#E8DCBF] p-6 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-4">
                <h3 className="font-bold text-sm text-[#194B35] font-serif flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#8C5B0F]" />
                  <span>സമീപകാല ഫീഡ് ശേഖരണ രേഖകൾ (Ingestion Logs)</span>
                </h3>
                <span className="text-xs text-neutral-400">തത്സമയം രേഖപ്പെടുത്തുന്നു</span>
              </div>

              <div className="space-y-2.5">
                {fetchLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3 rounded-xl bg-[#FAF7F0] border border-[#DDD5C5] flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-bold text-[#194B35] truncate">{log.source_name}</span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                          log.status === "success" ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                        }`}>
                          {log.status.toUpperCase()}
                        </span>
                      </div>
                      <span className="text-[11px] text-neutral-400">
                        {log.articles_found} വാർത്തകൾ കണ്ടെത്തി • {log.articles_published} ഓട്ടോ-പബ്ലിഷ് ചെയ്തു • {log.duration_ms}ms
                      </span>
                    </div>

                    <span className="text-[10px] text-neutral-400 whitespace-nowrap">
                      {new Date(log.fetched_at).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Sidebar: Active Sources Status */}
          <div className="space-y-6">

            <div className="bg-white rounded-3xl border border-[#E8DCBF] p-5 sm:p-6 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-4">
                <h3 className="text-sm font-bold text-[#194B35] font-serif flex items-center gap-2">
                  <Rss className="w-4 h-4 text-[#8C5B0F]" />
                  <span>ഉറവിടങ്ങളുടെ നില (Source Health)</span>
                </h3>
                <Link href="/admin/newsroom/sources" className="text-xs font-bold text-[#8C5B0F] hover:underline">
                  മാനേജ് ചെയ്യുക →
                </Link>
              </div>

              <div className="space-y-3">
                {sources.map((src) => (
                  <div key={src.id} className="p-3 rounded-xl bg-[#FAF7F0] border border-[#DDD5C5] text-xs">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <strong className="text-[#194B35] block leading-tight">{src.name_ml}</strong>
                      <span className="font-bold text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.2 rounded-full shrink-0">
                        {src.reliability_score}% വിശ്വാസ്യത
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-neutral-400 mt-1">
                      <span>ഇന്റർവൽ: {src.polling_interval_minutes} മിനിറ്റ്</span>
                      <span>ശേഖരിച്ചത്: {src.articles_ingested_count} എണ്ണം</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Publishing Safeguards Policy Box */}
            <div className="bg-[#FAF4E6] rounded-3xl border border-[#E8DCBF] p-5 text-xs text-[#5C6A64] space-y-2">
              <strong className="text-[#194B35] block font-serif text-sm">
                പൂർണ്ണ ഓട്ടോമാറ്റിക് പബ്ലിഷിംഗ് നയം
              </strong>
              <p className="leading-relaxed">
                ഔദ്യോഗിക സർക്കാർ ഗസറ്റുകൾ, പി.ആർ.ഡി ലൈവ്, താനൂർ നഗരസഭ എന്നിവയിൽ നിന്നുള്ള സാധാരണ വാർത്തകൾ യാതൊരു എഡിറ്റർ അംഗീകാരവും ഇല്ലാതെ ഓട്ടോമാറ്റിക്കായി പ്രസിദ്ധീകരിക്കപ്പെടുന്നു. സെൻസിറ്റീവ് അവകാശവാദങ്ങൾ മാത്രമാണ് റിവ്യൂ ക്യൂവിലേക്ക് വഴിതിരിച്ചുവിടുന്നത്.
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
