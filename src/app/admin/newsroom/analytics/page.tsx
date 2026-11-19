"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { AdminNewsroomNav } from "@/components/news/AdminNewsroomNav";
import { useLanguage } from "@/lib/i18n/context";
import { newsroomStore, NEWS_CATEGORIES } from "@/lib/data/newsroomStore";
import { 
  BarChart3, 
  TrendingUp, 
  Cpu, 
  ShieldCheck, 
  RefreshCw, 
  Eye, 
  Clock, 
  CheckCircle2, 
  Flame, 
  AlertTriangle, 
  Rss, 
  Globe2, 
  MapPin, 
  Layers, 
  Zap,
  Activity,
  FileSpreadsheet
} from "lucide-react";

export default function AdminNewsroomAnalyticsPage() {
  const { language } = useLanguage();
  const [analytics, setAnalytics] = useState(() => newsroomStore.getNewsroomAnalytics());
  const [sources, setSources] = useState(() => newsroomStore.getSources());
  const [fetchLogs, setFetchLogs] = useState(() => newsroomStore.getFetchLogs());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setAnalytics(newsroomStore.getNewsroomAnalytics());
      setSources(newsroomStore.getSources());
      setFetchLogs(newsroomStore.getFetchLogs());
      setIsRefreshing(false);
    }, 400);
  };

  // Compute average pipeline latency from fetch logs
  const avgLatencyMs = fetchLogs.length > 0 
    ? Math.round(fetchLogs.reduce((acc, l) => acc + l.duration_ms, 0) / fetchLogs.length) 
    : 340;

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] pb-24">
      <Navbar />
      <AdminNewsroomNav />

      {/* Header Hub */}
      <div className="bg-[#194B35] text-white py-8 px-4 border-b border-[#143E2C]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 px-3 py-1 rounded-full text-xs font-bold mb-2">
              <Activity className="w-3.5 h-3.5" />
              <span>{language === "ml" ? "എഐ ഓട്ടോമേഷൻ സ്ഥിതിവിവരക്കണക്കുകൾ" : "AI Automation & Ingestion Analytics"}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {language === "ml" ? "സ്മാർട്ട് ന്യൂസ്‌റൂം അനലിറ്റിക്സ്" : "Smart Newsroom Analytics"}
            </h1>
            <p className="text-white/80 text-sm mt-1 max-w-2xl">
              {language === "ml"
                ? "താനൂർ, മലപ്പുറം, കേരളം വാർത്തകളുടെ ഓട്ടോമേറ്റഡ് ഇൻജഷൻ, വാർത്താ ഉറവിട വിശ്വാസ്യത, വർഗ്ഗീകരണ കണക്കുകൾ തത്സമയം നിരീക്ഷിക്കുക."
                : "Real-time performance metrics, automated ingestion rates, source reliability rankings, and distribution across 11 news categories."}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-bold flex items-center gap-2 transition disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
              <span>{language === "ml" ? "ഡാറ്റ പുതുക്കുക" : "Refresh Metrics"}</span>
            </button>

            <Link
              href="/admin/newsroom/review"
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-[#143E2C] rounded-lg text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{language === "ml" ? "റിവ്യൂ ക്യൂ" : "Review Queue"}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Top 4 KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                {language === "ml" ? "ആകെ ശേഖരിച്ച വാർത്തകൾ" : "Total Articles Ingested"}
              </span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-black text-gray-900 mt-2">{analytics.totalArticles}</p>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-700 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{analytics.publishedCount} {language === "ml" ? "പബ്ലിഷ് ചെയ്തു" : "Live published"}</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                {language === "ml" ? "ഓട്ടോ-പബ്ലിഷിംഗ് നിരക്ക്" : "Auto-Publish Rate"}
              </span>
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-black text-[#194B35] mt-2">{analytics.autoPublishRate}%</p>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-500">
              <Cpu className="w-3.5 h-3.5 text-blue-600" />
              <span>{language === "ml" ? "എഐ സ്വയം പരിശോധിച്ചു പബ്ലിഷ് ചെയ്തവ" : "Zero routine editor touch"}</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                {language === "ml" ? "ശരാശരി പ്രോസസ്സിംഗ് സമയം" : "Avg Processing Latency"}
              </span>
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-black text-gray-900 mt-2">{avgLatencyMs} <span className="text-base font-bold text-gray-500">ms</span></p>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-amber-700 font-bold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{language === "ml" ? "ഫീഡ് ഡൗൺലോഡ് & എൻക്രിപ്റ്റഡ് ഹാഷിംഗ്" : "XML Parse & Entity Extraction"}</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                {language === "ml" ? "ആകെ വായനകൾ (Views)" : "Total Readership"}
              </span>
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                <Eye className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-black text-gray-900 mt-2">{analytics.totalViews.toLocaleString()}</p>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-purple-700 font-bold">
              <Flame className="w-3.5 h-3.5" />
              <span>{analytics.breakingCount} {language === "ml" ? "ബ്രേക്കിംഗ് അലേർട്ടുകൾ" : "Breaking stories"}</span>
            </div>
          </div>

        </div>

        {/* Section 2: Geographic Distribution & Pipeline Status Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Geographic Distribution */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#194B35]" />
                <h3 className="text-base font-bold text-gray-900">
                  {language === "ml" ? "ഭൂമിശാസ്ത്രപരമായ വിതരണം" : "Geographic Scope Distribution"}
                </h3>
              </div>
              <span className="text-xs text-gray-400 font-medium">
                {language === "ml" ? "താനൂർ & മലപ്പുറം പ്രഥമ പരിഗണന" : "Tanur & Malappuram Priority"}
              </span>
            </div>

            <p className="text-xs text-gray-600 mb-6">
              {language === "ml"
                ? "നമ്മുടെ നാട് താനൂർ നഗരസഭയ്ക്കും മലപ്പുറം ജില്ലയ്ക്കും ഏറ്റവും ഉയർന്ന പരിഗണന നൽകുന്നു."
                : "Newsroom pipeline automatically ranks local stories from Tanur's 44 wards and Malappuram district."}
            </p>

            <div className="space-y-4">
              {Object.entries(analytics.byScope).map(([scopeLabel, count]) => {
                const percentage = analytics.totalArticles > 0 ? Math.round((count / analytics.totalArticles) * 100) : 0;
                return (
                  <div key={scopeLabel} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-gray-800">{scopeLabel}</span>
                      <span className="font-extrabold text-[#194B35]">{count} ({percentage}%)</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#194B35] to-[#C39A5B] rounded-full transition-all duration-500"
                        style={{ width: `${Math.max(percentage, 5)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pipeline Verification Status Breakdown */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#194B35]" />
                <h3 className="text-base font-bold text-gray-900">
                  {language === "ml" ? "വാർത്താ ഫിൽട്ടറിംഗ് നിലവാരം" : "Publishing Safeguard Status"}
                </h3>
              </div>
              <span className="text-xs text-gray-400 font-medium">
                {language === "ml" ? "കർശന പരിശോധന" : "Quality Filter"}
              </span>
            </div>

            <p className="text-xs text-gray-600 mb-6">
              {language === "ml"
                ? "ഓരോ വാർത്തയും സ്വയം പരിശോധിക്കപ്പെട്ട് ഉചിതമായ സ്റ്റാറ്റസിലേക്ക് മാറ്റപ്പെടുന്നു."
                : "Breakdown of articles automatically approved versus routed to safeguards or rejected."}
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
                <span className="text-xs font-bold text-emerald-800 block">
                  {language === "ml" ? "നേരിട്ട് പബ്ലിഷ് ചെയ്തവ" : "Auto-Published"}
                </span>
                <p className="text-2xl font-black text-emerald-900 mt-1">{analytics.publishedCount}</p>
                <p className="text-[11px] text-emerald-700 mt-0.5">
                  {language === "ml" ? "വിശ്വാസ്യതയുള്ള ഉറവിടങ്ങളിൽ നിന്ന്" : "Verified authentic publishers"}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
                <span className="text-xs font-bold text-amber-800 block">
                  {language === "ml" ? "എഡിറ്റോറിയൽ റിവ്യൂവിൽ" : "In Review Queue"}
                </span>
                <p className="text-2xl font-black text-amber-900 mt-1">{analytics.reviewCount}</p>
                <p className="text-[11px] text-amber-700 mt-0.5">
                  {language === "ml" ? "സെൻസിറ്റീവ് വാർത്താ നിയന്ത്രണം" : "Safety keyword matches"}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-red-50 border border-red-100">
                <span className="text-xs font-bold text-red-800 block">
                  {language === "ml" ? "നിരസിക്കപ്പെട്ട വാർത്തകൾ" : "Rejected / Excluded"}
                </span>
                <p className="text-2xl font-black text-red-900 mt-1">{analytics.rejectedCount}</p>
                <p className="text-[11px] text-red-700 mt-0.5">
                  {language === "ml" ? "അടിസ്ഥാനരഹിതമായ വിവരങ്ങൾ" : "Failed corroboration"}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                <span className="text-xs font-bold text-blue-800 block">
                  {language === "ml" ? "സജീവ ഉറവിടങ്ങൾ" : "Active News Feeds"}
                </span>
                <p className="text-2xl font-black text-blue-900 mt-1">{analytics.activeSourcesCount}</p>
                <p className="text-[11px] text-blue-700 mt-0.5">
                  {language === "ml" ? "തുടർച്ചയായി പോൾ ചെയ്യുന്നു" : "Scheduled continuous sync"}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Section 3: Distribution Across 11 News Categories */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#194B35]" />
              <h3 className="text-base font-bold text-gray-900">
                {language === "ml" ? "11 വാർത്താ വിഭാഗങ്ങളിലെ വിതരണം" : "11 Standard News Categories Breakdown"}
              </h3>
            </div>
            <Link
              href="/news"
              className="text-xs font-bold text-[#194B35] hover:underline flex items-center gap-1"
            >
              <span>{language === "ml" ? "പബ്ലിക് ആർക്കൈവ് കാണുക" : "View Categories in Portal"}</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {NEWS_CATEGORIES.map((cat) => {
              const count = analytics.byCategory[cat.name] || 0;
              const percentage = analytics.totalArticles > 0 ? Math.round((count / analytics.totalArticles) * 100) : 0;
              return (
                <div 
                  key={cat.id} 
                  className="p-4 rounded-xl border border-gray-100 bg-[#FAF7F0]/40 hover:bg-[#FAF7F0] transition space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-gray-900">
                      {language === "ml" ? cat.name_ml : cat.name}
                    </span>
                    <span className="font-extrabold text-[#194B35]">{count} ({percentage}%)</span>
                  </div>
                  
                  <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${Math.max(percentage * 2, 4)}%`,
                        backgroundColor: cat.color || "#194B35" 
                      }} 
                    />
                  </div>

                  <p className="text-[11px] text-gray-500 line-clamp-1">
                    {language === "ml" ? cat.description_ml : cat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 4: News Source Reliability Rankings Table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Rss className="w-5 h-5 text-[#194B35]" />
                <h3 className="text-base font-bold text-gray-900">
                  {language === "ml" ? "വാർത്താ ഉറവിട വിശ്വാസ്യത റാങ്കിംഗ്" : "News Source Reliability & Ingestion Table"}
                </h3>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {language === "ml" 
                  ? "അംഗീകൃത വാർത്താ പോർട്ടലുകളുടെ വിശ്വാസ്യത സ്കോറും പബ്ലിഷിംഗ് സ്ഥിതിവിവരക്കണക്കുകളും"
                  : "Government PR portals, regional newsrooms, and authorized wire feeds."}
              </p>
            </div>

            <Link
              href="/admin/newsroom/sources"
              className="px-3.5 py-2 bg-[#194B35] hover:bg-[#143E2C] text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 w-fit"
            >
              <Rss className="w-3.5 h-3.5" />
              <span>{language === "ml" ? "ഉറവിടങ്ങൾ കൈകാര്യം ചെയ്യുക" : "Manage Sources"}</span>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F0] text-gray-700 font-bold border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4">{language === "ml" ? "ഉറവിടം (Source)" : "Source / Publisher"}</th>
                  <th className="py-3 px-4">{language === "ml" ? "തരം & പരിധി" : "Type & Scope"}</th>
                  <th className="py-3 px-4 text-center">{language === "ml" ? "വിശ്വാസ്യത" : "Reliability Score"}</th>
                  <th className="py-3 px-4 text-center">{language === "ml" ? "ശേഖരിച്ചവ" : "Ingested"}</th>
                  <th className="py-3 px-4 text-center">{language === "ml" ? "പരാജയങ്ങൾ" : "Failures"}</th>
                  <th className="py-3 px-4 text-right">{language === "ml" ? "അവസാന സമന്വയം" : "Last Polled"}</th>
                  <th className="py-3 px-4 text-center">{language === "ml" ? "നില" : "Status"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sources.map((src) => {
                  return (
                    <tr key={src.id} className="hover:bg-gray-50/80 transition">
                      
                      <td className="py-3 px-4">
                        <div className="font-bold text-gray-900">{src.name}</div>
                        <div className="text-[11px] text-gray-500">{src.name_ml}</div>
                      </td>

                      <td className="py-3 px-4">
                        <span className="inline-block bg-gray-100 text-gray-700 uppercase font-mono px-2 py-0.5 rounded text-[10px] mr-1.5 font-bold">
                          {src.feed_type}
                        </span>
                        <span className="capitalize text-gray-600 font-medium">
                          {src.geographic_scope}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-center">
                        <div className="inline-flex items-center gap-1 font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                          <span>{src.reliability_score}%</span>
                        </div>
                      </td>

                      <td className="py-3 px-4 text-center font-bold text-gray-800">
                        {src.articles_ingested_count}
                      </td>

                      <td className="py-3 px-4 text-center">
                        {src.consecutive_failures > 0 ? (
                          <span className="text-red-600 font-bold">{src.consecutive_failures}</span>
                        ) : (
                          <span className="text-emerald-600 font-bold">0</span>
                        )}
                      </td>

                      <td className="py-3 px-4 text-right text-gray-500 font-mono text-[11px]">
                        {src.last_polled_at ? new Date(src.last_polled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Just now"}
                      </td>

                      <td className="py-3 px-4 text-center">
                        {src.is_active ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            {language === "ml" ? "സജീവം" : "Active"}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-200 text-gray-600">
                            {language === "ml" ? "നിർജ്ജീവം" : "Paused"}
                          </span>
                        )}
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <BottomNav />
      <Footer />
    </div>
  );
}
