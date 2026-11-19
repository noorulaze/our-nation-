"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { AdminCivicNav } from "@/components/civic/AdminCivicNav";
import { useLanguage } from "@/lib/i18n/context";
import { 
  civicStore, 
  CIVIC_CATEGORIES 
} from "@/lib/data/civicConnectData";
import { 
  BarChart3, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Tag, 
  FileSpreadsheet, 
  ArrowRight,
  ShieldCheck,
  Building2,
  Users
} from "lucide-react";

export default function AdminCivicAnalyticsPage() {
  const { language } = useLanguage();
  const analytics = civicStore.getCivicAnalytics();
  const issues = civicStore.getIssues();

  const totalSupportCount = issues.reduce((acc, curr) => acc + curr.support_count, 0);

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
                  <BarChart3 className="w-3.5 h-3.5" />
                </span>
                <span className="text-xs font-bold text-[#143E2C] uppercase tracking-wider">
                  സിവിക് ഇന്റലിജൻസ് & അനലിറ്റിക്സ്
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#194B35] font-serif">
                {language === "ml" ? "സിവിക് പ്രശ്ന പരിഹാര അനലിറ്റിക്സ്" : "Civic Analytics & Resolution Trends"}
              </h1>
              <p className="text-xs sm:text-sm text-[#5C6A64] mt-1">
                താനൂർ നഗരസഭയിലെയും മലപ്പുറം ജില്ലയിലെയും പൗര പ്രശ്നങ്ങളുടെ പരിഹാര നിരക്കുകൾ, ട്രെൻഡുകൾ.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-white border border-[#DDD5C5] text-xs font-bold text-[#194B35] hover:bg-[#FAF4E6] transition shadow-xs"
              >
                റിപ്പോർട്ട് പ്രിന്റ് ചെയ്യുക
              </button>
            </div>
          </div>

          {/* Top 4 Key KPI Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-[#E8DCBF] shadow-xs">
              <span className="text-[11px] font-semibold text-[#5C6A64] block">ആകെ രജിസ്റ്റർ ചെയ്തവ</span>
              <span className="text-2xl font-extrabold text-[#194B35] mt-1 block">{analytics.total}</span>
              <span className="text-[10px] text-neutral-400 mt-0.5 block">100% ട്രാക്ക് ചെയ്യുന്നു</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#E8DCBF] shadow-xs">
              <span className="text-[11px] font-semibold text-[#5C6A64] block">പരിഹാര നിരക്ക് (Resolution)</span>
              <span className="text-2xl font-extrabold text-emerald-700 mt-1 block">{analytics.resolutionRate}%</span>
              <span className="text-[10px] text-emerald-600 mt-0.5 block">{analytics.resolved} പ്രശ്നങ്ങൾ പരിഹരിച്ചു</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#E8DCBF] shadow-xs">
              <span className="text-[11px] font-semibold text-[#5C6A64] block">ശരാശരി പരിഹാര സമയം</span>
              <span className="text-2xl font-extrabold text-blue-700 mt-1 block">4.2 ദിവസം</span>
              <span className="text-[10px] text-neutral-400 mt-0.5 block">നഗരസഭാ ശരാശരി</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#E8DCBF] shadow-xs">
              <span className="text-[11px] font-semibold text-[#5C6A64] block">കമ്മ്യൂണിറ്റി പിന്തുണകൾ</span>
              <span className="text-2xl font-extrabold text-[#8C5B0F] mt-1 block">{totalSupportCount}</span>
              <span className="text-[10px] text-amber-700 mt-0.5 block">റെസിഡന്റ് വോട്ടുകൾ</span>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Breakdown Sections */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Row 1: Categories Breakdown & Status Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Categories Chart Bar */}
          <div className="bg-white rounded-3xl border border-[#E8DCBF] p-6 shadow-xs">
            <h3 className="text-sm font-bold text-[#194B35] font-serif mb-4 flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#8C5B0F]" />
              <span>വിഭാഗം തിരിച്ചുള്ള കണക്കുകൾ (Category Distribution)</span>
            </h3>

            <div className="space-y-3.5 text-xs">
              {CIVIC_CATEGORIES.map((cat) => {
                const count = issues.filter(i => i.category_id === cat.id).length;
                const percentage = analytics.total > 0 ? Math.round((count / analytics.total) * 100) : 0;

                return (
                  <div key={cat.id}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-[#1A2420] flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                        {cat.name_ml}
                      </span>
                      <span className="font-bold text-neutral-600">{count} ({percentage}%)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-neutral-100 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%`, backgroundColor: cat.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Status Breakdown */}
          <div className="bg-white rounded-3xl border border-[#E8DCBF] p-6 shadow-xs">
            <h3 className="text-sm font-bold text-[#194B35] font-serif mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#8C5B0F]" />
              <span>സ്റ്റാറ്റസ് തിരിച്ചുള്ള വിഭജനം (Status Breakdown)</span>
            </h3>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-3 rounded-xl bg-sky-50 border border-sky-200">
                <span className="text-[11px] text-sky-800 font-semibold block">അവലോകനത്തിൽ</span>
                <span className="text-lg font-bold text-sky-900">{analytics.pending} കേസുകൾ</span>
              </div>
              <div className="p-3 rounded-xl bg-purple-50 border border-purple-200">
                <span className="text-[11px] text-purple-800 font-semibold block">സ്ഥിരീകരിച്ചവ</span>
                <span className="text-lg font-bold text-purple-900">{analytics.verified} കേസുകൾ</span>
              </div>
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                <span className="text-[11px] text-amber-800 font-semibold block">കൈമാറിയവ</span>
                <span className="text-lg font-bold text-amber-900">{analytics.forwarded} കേസുകൾ</span>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="text-[11px] text-emerald-800 font-semibold block">പരിഹരിച്ചവ</span>
                <span className="text-lg font-bold text-emerald-900">{analytics.resolved} കേസുകൾ</span>
              </div>
            </div>

            {/* Locality Distribution */}
            <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">
              ഭൂമിശാസ്ത്രപരമായ വിഭജനം:
            </h4>
            <div className="space-y-2 text-xs">
              {Object.entries(analytics.byLocality).map(([locality, count]) => (
                <div key={locality} className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF7F0] border border-[#DDD5C5]">
                  <span className="font-semibold text-[#194B35]">{locality}</span>
                  <span className="font-bold text-[#8C5B0F]">{count} പരാതികൾ</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Tanur Ward Performance Note */}
        <div className="bg-[#FAF4E6] rounded-3xl border border-[#E8DCBF] p-6 text-xs text-[#5C6A64]">
          <div className="flex items-center gap-2 mb-2 font-bold text-[#194B35] text-sm font-serif">
            <Building2 className="w-4 h-4 text-[#8C5B0F]" />
            <span>താനൂർ നഗരസഭ 44 വാർഡുകളുടെ ഏകോപന റിപ്പോർട്ട്</span>
          </div>
          <p className="leading-relaxed">
            സിവിക് കണക്ട് ഡിജിറ്റൽ സംവിധാനം വഴി ലഭിച്ച 70% ത്തിലധികം പരാതികളും 7 പ്രവൃത്തി ദിനങ്ങൾക്കുള്ളിൽ ബന്ധപ്പെട്ട സർക്കാർ എൻജിനീയറിങ്, ഹെൽത്ത്, ഇലക്ട്രിക്കൽ വിഭാഗങ്ങളിലേക്ക് ഫോർവേഡ് ചെയ്യുകയും ട്രാക്കിംഗ് നമ്പർ അനുവദിക്കുകയും ചെയ്തിട്ടുണ്ട്.
          </p>
        </div>

      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
