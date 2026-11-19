"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { CivicNav } from "@/components/civic/CivicNav";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { useLanguage } from "@/lib/i18n/context";
import { 
  civicStore, 
  CIVIC_CATEGORIES, 
  CivicIssue 
} from "@/lib/data/civicConnectData";
import { 
  ShieldAlert, 
  PlusCircle, 
  Search, 
  MapPin, 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Building2, 
  Truck, 
  Trash2, 
  Droplets, 
  Lightbulb, 
  Leaf, 
  ShieldCheck, 
  Heart, 
  MessageSquare, 
  ExternalLink,
  Info,
  PhoneCall,
  Sparkles,
  ChevronRight
} from "lucide-react";

export default function CivicHomePage() {
  const { language } = useLanguage();
  const issues = civicStore.getIssues();
  const analytics = civicStore.getCivicAnalytics();

  const [supportState, setSupportState] = useState<Record<string, number>>({});

  const handleSupportToggle = (issueId: string) => {
    civicStore.toggleSupport(issueId);
    setSupportState(prev => ({
      ...prev,
      [issueId]: (prev[issueId] || 0) + 1
    }));
  };

  const categoryIconMap: Record<string, any> = {
    Truck,
    Trash2,
    Droplets,
    Lightbulb,
    Leaf,
    Building2,
    ShieldAlert,
    HelpCircle: AlertTriangle
  };

  const statusBadges: Record<string, { label: string; labelEn: string; color: string }> = {
    submitted: { label: "സമർപ്പിച്ചു", labelEn: "Submitted", color: "bg-amber-100 text-amber-800 border-amber-200" },
    under_review: { label: "അവലോകനത്തിൽ", labelEn: "Under Review", color: "bg-blue-100 text-blue-800 border-blue-200" },
    verified: { label: "വെരിഫൈഡ്", labelEn: "Verified", color: "bg-teal-100 text-teal-800 border-teal-200" },
    forwarded: { label: "അധികൃതർക്ക് അയച്ചു", labelEn: "Forwarded", color: "bg-purple-100 text-purple-800 border-purple-200" },
    in_progress: { label: "നടപടിയിൽ", labelEn: "In Progress", color: "bg-indigo-100 text-indigo-800 border-indigo-200" },
    resolved: { label: "പരിഹരിച്ചു", labelEn: "Resolved", color: "bg-emerald-100 text-emerald-800 border-emerald-200" },
    rejected: { label: "തള്ളി", labelEn: "Rejected", color: "bg-rose-100 text-rose-800 border-rose-200" },
    reopened: { label: "തുറന്നു", labelEn: "Reopened", color: "bg-orange-100 text-orange-800 border-orange-200" },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
      <Navbar />
      <CivicNav />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-10">
        
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: language === "ml" ? "ഹോം" : "Home", href: "/" },
            { label: "Civic Connect" },
          ]}
        />

        {/* ================================================================ */}
        {/* SECTION A: HERO SECTION */}
        {/* ================================================================ */}
        <section className="bg-gradient-to-br from-[#194B35] via-[#143E2C] to-[#0D2A1E] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(#E8C547_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold text-amber-300 border border-white/20">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Civic Connect • OUR NATION</span>
              </span>
              <span className="text-[11px] text-emerald-200/90 bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-800/60">
                താനൂർ നഗരസഭ & മലപ്പുറം
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-bold font-malayalam-serif tracking-tight text-[#FAF7F0] leading-tight">
              {language === "ml"
                ? "നാടിന്റെ പ്രശ്നങ്ങൾ അധികൃതരുടെ ശ്രദ്ധയിൽപ്പെടുത്തൂ"
                : "Report, track and resolve local civic issues together"}
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-malayalam-body">
              {language === "ml"
                ? "റോഡിലെ കുഴികൾ, മാലിന്യക്കൂമ്പാരം, കത്താത്ത തെരുവ് വിളക്കുകൾ, കുടിവെള്ള ചോർച്ച എന്നിവ ഫോട്ടോ സഹിതം സുതാര്യമായി അറിയിക്കാം. പൗര പങ്കാളിത്തത്തോടെ നമ്മുടെ താനൂരിനെ മികച്ചതാക്കാം."
                : "A modern civic reporting interface for Tanur Municipality residents. Submit reports with photo evidence, track progress in real-time, and view verified municipal updates."}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/civic/report"
                className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-[#194B35] text-xs sm:text-sm font-bold transition-all duration-150 active:scale-95 shadow-md flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{language === "ml" ? "പരാതി രജിസ്റ്റർ ചെയ്യൂ" : "Report an Issue"}</span>
              </Link>

              <Link
                href="/civic/issues"
                className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/30 text-xs sm:text-sm font-bold transition flex items-center gap-2 backdrop-blur-xs"
              >
                <Search className="w-4 h-4" />
                <span>{language === "ml" ? "പരാതികൾ പരിശോധിക്കൂ" : "Explore Issues"}</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* SECTION B: QUICK ACTIONS */}
        {/* ================================================================ */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {[
            { title: "പരാതി നൽകുക", enTitle: "Report an Issue", desc: "4 ലളിതമായ ഘട്ടങ്ങളിലൂടെ", href: "/civic/report", icon: PlusCircle, bg: "bg-[#194B35]", text: "text-white" },
            { title: "പരാതികൾ തിരയുക", enTitle: "Explore Issues", desc: "സ്റ്റാറ്റസ് തിരിച്ചുള്ള പട്ടിക", href: "/civic/issues", icon: Search, bg: "bg-white", text: "text-[#1A2420]" },
            { title: "ഇന്ററാക്ടീവ് മാപ്പ്", enTitle: "Interactive Map", desc: "താനൂർ തത്സമയ ലൊക്കേഷൻ", href: "/civic/map", icon: MapPin, bg: "bg-white", text: "text-[#1A2420]" },
            { title: "എന്റെ റിപ്പോർട്ടുകൾ", enTitle: "My Reports", desc: "സമർപ്പിച്ച പരാതികളുടെ നില", href: "/civic/my-reports", icon: FileText, bg: "bg-white", text: "text-[#1A2420]" },
          ].map((action, i) => {
            const Icon = action.icon;
            return (
              <Link
                key={i}
                href={action.href}
                className={`${action.bg} rounded-2xl border border-[#EAE4D7] p-4 sm:p-5 shadow-xs hover:shadow-card hover:border-[#194B35] transition flex flex-col justify-between group`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${action.bg === "bg-[#194B35]" ? "bg-white/20 text-amber-300" : "bg-[#FAF4E6] text-[#194B35]"}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <ArrowRight className={`w-3.5 h-3.5 ${action.bg === "bg-[#194B35]" ? "text-white/70" : "text-[#7A8880]"} group-hover:translate-x-0.5 transition`} />
                </div>
                <div>
                  <h3 className={`font-bold text-xs sm:text-sm font-malayalam-serif ${action.text}`}>
                    {language === "ml" ? action.title : action.enTitle}
                  </h3>
                  <p className={`text-[10px] sm:text-[11px] mt-0.5 line-clamp-1 ${action.bg === "bg-[#194B35]" ? "text-emerald-100" : "text-[#5C6A64]"}`}>
                    {action.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </section>

        {/* ================================================================ */}
        {/* SECTION C: ISSUE CATEGORIES */}
        {/* ================================================================ */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-bold font-malayalam-serif text-[#194B35]">
                {language === "ml" ? "പരാതി വിഭാഗങ്ങൾ" : "Issue Categories"}
              </h2>
              <p className="text-xs text-[#5C6A64]">
                {language === "ml" ? "വിഷയത്തിനനുസരിച്ച് പരാതികൾ തിരഞ്ഞെടുക്കാം." : "Browse civic issues categorized by department and municipal domain."}
              </p>
            </div>
            <Link href="/civic/issues" className="text-xs font-bold text-[#194B35] hover:underline flex items-center gap-1">
              <span>{language === "ml" ? "എല്ലാം കാണുക" : "View All"}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {CIVIC_CATEGORIES.map((cat) => {
              const Icon = categoryIconMap[cat.icon] || AlertTriangle;
              return (
                <Link
                  key={cat.id}
                  href={`/civic/issues?category=${cat.id}`}
                  className="bg-white rounded-2xl border border-[#EAE4D7] p-4 hover:border-[#194B35] hover:shadow-card transition group space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div 
                      className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105"
                      style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FAF7F0] text-[#7A8880] border border-[#EAE4D7]">
                      {cat.count} പരാതികൾ
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-xs sm:text-sm text-[#1A2420] group-hover:text-[#194B35] font-malayalam-serif transition">
                      {language === "ml" ? cat.name_ml : cat.name}
                    </h3>
                    <p className="text-[10px] text-[#5C6A64] mt-0.5 line-clamp-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ================================================================ */}
        {/* SECTION D: RECENTLY REPORTED ISSUES */}
        {/* ================================================================ */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-bold font-malayalam-serif text-[#194B35]">
                {language === "ml" ? "സമീപകാല റിപ്പോർട്ടുകൾ" : "Recently Reported Issues"}
              </h2>
              <p className="text-xs text-[#5C6A64]">
                {language === "ml" ? "താനൂരിൽ നാട്ടുവാസികൾ സമർപ്പിച്ച പുതിയ പരാതികൾ." : "Recent civic issues reported across Tanur wards."}
              </p>
            </div>
            <Link href="/civic/issues" className="text-xs font-bold text-[#194B35] hover:underline flex items-center gap-1">
              <span>{language === "ml" ? "എല്ലാ പരാതികളും" : "Explore All"}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {issues.slice(0, 6).map((issue) => {
              const statusMeta = statusBadges[issue.status] || { label: issue.status, color: "bg-gray-100 text-gray-800" };
              return (
                <div
                  key={issue.id}
                  className="bg-white rounded-3xl border border-[#EAE4D7] overflow-hidden shadow-xs hover:shadow-card hover:border-[#194B35]/40 transition flex flex-col justify-between"
                >
                  <div>
                    {/* Thumbnail */}
                    <div className="h-40 w-full relative bg-[#EAE4D7] overflow-hidden">
                      <img
                        src={issue.images[0] || "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80"}
                        alt={issue.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <span className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-0.5 rounded-full border shadow-xs backdrop-blur-md ${statusMeta.color}`}>
                        {statusMeta.label}
                      </span>
                      <span className="absolute bottom-2 right-2 text-[10px] font-mono font-bold bg-black/60 text-white px-2 py-0.5 rounded-md backdrop-blur-xs">
                        {issue.tracking_id}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-2">
                      <div className="flex items-center gap-1.5 text-[11px] text-[#7A8880]">
                        <MapPin className="w-3 h-3 text-[#194B35] shrink-0" />
                        <span className="truncate">{issue.locality}</span>
                      </div>

                      <h3 className="font-bold text-sm text-[#1A2420] font-malayalam-serif line-clamp-2 hover:text-[#194B35] transition">
                        <Link href={`/civic/issues/${issue.id}`}>
                          {language === "ml" && issue.title_ml ? issue.title_ml : issue.title}
                        </Link>
                      </h3>

                      <p className="text-xs text-[#5C6A64] line-clamp-2 leading-relaxed">
                        {issue.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="px-4 py-3 bg-[#FAF7F0] border-t border-[#F3EFE6] flex items-center justify-between text-xs">
                    <button
                      onClick={() => handleSupportToggle(issue.id)}
                      className={`flex items-center gap-1 font-semibold transition ${
                        issue.supported_by_user ? "text-rose-600 font-bold" : "text-[#5C6A64] hover:text-[#194B35]"
                      }`}
                      title="പിന്തുണയ്ക്കുക (Support this issue)"
                    >
                      <Heart className={`w-3.5 h-3.5 ${issue.supported_by_user ? "fill-current" : ""}`} />
                      <span>{issue.support_count} പിന്തുണ</span>
                    </button>

                    <Link
                      href={`/civic/issues/${issue.id}`}
                      className="font-bold text-[#194B35] hover:underline flex items-center gap-0.5 text-[11px]"
                    >
                      <span>വിശദാംശങ്ങൾ</span>
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================================================================ */}
        {/* SECTION E: COMMUNITY STATISTICS (Clearly Labelled Demo Data) */}
        {/* ================================================================ */}
        <section className="bg-white rounded-3xl border border-[#EAE4D7] p-6 sm:p-8 shadow-card space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F3EFE6] pb-3">
            <div>
              <span className="text-[10px] font-bold text-[#8C5B0F] uppercase tracking-wider bg-[#FAF4E6] px-2 py-0.5 rounded-md border border-[#E8DCBF]">
                ഡെമോ സ്റ്റാറ്റിസ്റ്റിക്സ് • Sample Data Preview
              </span>
              <h2 className="text-base sm:text-lg font-bold font-malayalam-serif text-[#194B35] mt-1">
                സിവിക് കണക്ട് പുരോഗതി അവലോകനം
              </h2>
            </div>
            <p className="text-[11px] text-[#7A8880]">
              *UI ഫേസ് ഡെമോൺസ്ട്രേഷനായി നൽകിയിട്ടുള്ള മാതൃകാ ഡാറ്റ മാത്രം.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7] text-center">
              <span className="text-[10px] font-bold text-[#7A8880] uppercase tracking-wider">ആകെ റിപ്പോർട്ടുകൾ</span>
              <p className="text-2xl font-bold font-mono text-[#194B35] mt-1">{analytics.total}</p>
              <span className="text-[11px] text-[#5C6A64]">പൗര പരാതികൾ</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7] text-center">
              <span className="text-[10px] font-bold text-[#7A8880] uppercase tracking-wider">പരിശോധിച്ചവ</span>
              <p className="text-2xl font-bold font-mono text-teal-700 mt-1">{analytics.verified}</p>
              <span className="text-[11px] text-[#5C6A64]">മോഡറേഷൻ പൂർത്തിയായി</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7] text-center">
              <span className="text-[10px] font-bold text-[#7A8880] uppercase tracking-wider">നടപടിയിലുള്ളവ</span>
              <p className="text-2xl font-bold font-mono text-indigo-700 mt-1">{analytics.inProgress + analytics.forwarded}</p>
              <span className="text-[11px] text-[#5C6A64]">അധികൃതരുടെ പ്രവൃത്തിയിൽ</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7] text-center">
              <span className="text-[10px] font-bold text-[#7A8880] uppercase tracking-wider">പരിഹാര നിരക്ക്</span>
              <p className="text-2xl font-bold font-mono text-emerald-700 mt-1">{analytics.resolutionRate}%</p>
              <span className="text-[11px] text-[#5C6A64]">വിജയകരമായി പൂർത്തിയാക്കി</span>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* SECTION F: HOW IT WORKS */}
        {/* ================================================================ */}
        <section className="bg-[#FAF4E6] rounded-3xl border border-[#E8DCBF] p-6 sm:p-8 space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-[10px] font-bold text-[#8C5B0F] uppercase tracking-wider bg-white px-2.5 py-0.5 rounded-full border border-[#DDD5C5]">
              പ്രവർത്തന രീതി • How It Works
            </span>
            <h2 className="text-lg sm:text-xl font-bold font-malayalam-serif text-[#194B35]">
              4 സുതാര്യമായ ഘട്ടങ്ങളിലൂടെ പരിഹാരം
            </h2>
            <p className="text-xs text-[#5C6A64]">
              നാട്ടുവാസികൾക്ക് വളരെ ലളിതമായി പരാതികൾ രജിസ്റ്റർ ചെയ്യാനും പുരോഗതി കാണാനും സാധിക്കുന്നു.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {[
              { step: "01", title: "പ്രശ്നം രേഖപ്പെടുത്തുക", enTitle: "Report a Problem", desc: "ലൊക്കേഷൻ, വിഭാഗം, ഫോട്ടോകൾ സഹിതം ഫോം വഴി സമർപ്പിക്കുക." },
              { step: "02", title: "മോഡറേറ്റർ പരിശോധന", enTitle: "Moderator Review", desc: "കമ്മ്യൂണിറ്റി മോഡറേറ്റർമാർ പരിശോധിച്ച് റിപ്പോർട്ടിന്റെ കൃത്യത ഉറപ്പാക്കുന്നു." },
              { step: "03", title: "അധികൃതർക്ക് അയക്കുന്നു", enTitle: "Authority Forwarding", desc: "താനൂർ നഗരസഭയിലേക്കോ കെ.എസ്.ഇ.ബി/വാട്ടർ അതോറിറ്റിയിലേക്കോ അറിയിപ്പ് കൈമാറുന്നു." },
              { step: "04", title: "പരിഹാര തെളിവ്", enTitle: "Resolution Evidence", desc: "പ്രവൃത്തി പൂർത്തിയാകുമ്പോൾ ഫോട്ടോ സഹിതം സ്റ്റാറ്റസ് അപ്‌ഡേറ്റ് ചെയ്യപ്പെടുന്നു." },
            ].map((st, i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#DDD5C5] p-5 space-y-2 relative shadow-xs">
                <span className="text-2xl font-bold font-mono text-amber-500/40 block">
                  {st.step}
                </span>
                <h3 className="font-bold text-xs sm:text-sm text-[#1A2420] font-malayalam-serif">
                  {language === "ml" ? st.title : st.enTitle}
                </h3>
                <p className="text-xs text-[#5C6A64] leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================ */}
        {/* SECTION G & H: GEOGRAPHIC COVERAGE & EMERGENCY DISCLAIMER */}
        {/* ================================================================ */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Geographic Scope Box */}
          <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 shadow-card space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#E0F1E7] text-[#194B35] flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#1A2420] font-malayalam-serif">
                  ഭൂമിശാസ്ത്രപരമായ പരിധി (Coverage Scope)
                </h3>
                <span className="text-[11px] text-[#7A8880]">മലപ്പുറം ജില്ല • താനൂർ</span>
              </div>
            </div>

            <p className="text-xs text-[#5C6A64] leading-relaxed">
              സിവിക് കണക്റ്റ് നിലവിൽ <strong>മലപ്പുറം ജില്ലയിലെ താനൂർ നഗരസഭയിൽ (44 വാർഡുകൾ)</strong> പൂർണ്ണമായും, തൊട്ടടുത്ത താനൂർ ബ്ലോക്ക് പഞ്ചായത്ത് ഗ്രാമപഞ്ചായത്തുകളിൽ മുൻഗണനാടിസ്ഥാനത്തിലും പ്രവർത്തിക്കുന്നു.
            </p>

            <div className="p-3 rounded-xl bg-[#FAF7F0] border border-[#EAE4D7] text-xs space-y-1">
              <div className="flex items-center justify-between text-[#194B35] font-bold">
                <span>താനൂർ നഗരസഭ (Municipality):</span>
                <span className="text-emerald-700">44 വാർഡുകൾ സജീവം</span>
              </div>
              <div className="flex items-center justify-between text-[#7A8880]">
                <span>താനൂർ ബ്ലോക്ക് പഞ്ചായത്ത്:</span>
                <span>കമ്മ്യൂണിറ്റി സപ്പോർട്ട്</span>
              </div>
            </div>
          </div>

          {/* Emergency Disclaimer Box */}
          <div className="bg-rose-50/70 rounded-3xl border border-rose-200 p-6 shadow-card space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-rose-950 font-malayalam-serif">
                  അടിയന്തര ഹെൽപ്‌ലൈൻ അറിയിപ്പ് (Emergency)
                </h3>
                <span className="text-[11px] text-rose-700 font-semibold">തീപിടുത്തം, പോലീസ്, ആംബുലൻസ്</span>
              </div>
            </div>

            <p className="text-xs text-rose-900 leading-relaxed">
              സിവിക് കണക്റ്റ് അടിസ്ഥാന സൗകര്യ പരാതികൾക്കുള്ള വേദിയാണ്. അടിയന്തര മെഡിക്കൽ അത്യാഹിതങ്ങൾ, തീപിടുത്തങ്ങൾ, ക്രമസമാധാന പ്രശ്നങ്ങൾ എന്നിവയ്ക്ക് തത്സമയം ഔദ്യോഗിക ഹെൽപ്‌ലൈനുകളെ നേരിട്ട് വിളിക്കുക:
            </p>

            <div className="flex items-center gap-2 pt-1">
              <a
                href="tel:112"
                className="flex-1 py-2 px-3 rounded-xl bg-rose-600 text-white text-center text-xs font-bold hover:bg-rose-700 transition"
              >
                പോലീസ്: 112
              </a>
              <a
                href="tel:101"
                className="flex-1 py-2 px-3 rounded-xl bg-white border border-rose-300 text-rose-800 text-center text-xs font-bold hover:bg-rose-100 transition"
              >
                ഫയർഫോഴ്സ്: 101
              </a>
              <a
                href="tel:108"
                className="flex-1 py-2 px-3 rounded-xl bg-white border border-rose-300 text-rose-800 text-center text-xs font-bold hover:bg-rose-100 transition"
              >
                ആംബുലൻസ്: 108
              </a>
            </div>
          </div>

        </section>

      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
