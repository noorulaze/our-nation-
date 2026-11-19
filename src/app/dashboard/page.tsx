"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { useLanguage } from "@/lib/i18n/context";
import { useAuth } from "@/lib/auth/context";
import { store } from "@/lib/data/store";
import { civicStore } from "@/lib/data/civicConnectData";
import { digitalMunicipalityStore } from "@/lib/data/digitalMunicipalityData";
import { UserRole } from "@/types/database";
import {
  User,
  ShieldCheck,
  Building2,
  AlertTriangle,
  HardHat,
  TrendingUp,
  Bell,
  Bookmark,
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
  ShieldAlert
} from "lucide-react";

export default function UnifiedDashboardPage() {
  const { language } = useLanguage();
  const { user, role } = useAuth();

  // Active Persona (defaults to current authenticated role, with preview switcher for UI inspection)
  const [activePersona, setActivePersona] = useState<UserRole>(role || "user");

  // Resident Data
  const userId = user?.id || "u0000000-0000-0000-0000-000000000003";
  const myReports = useMemo(() => store.getIssueReports(undefined, userId), [userId]);
  const myIdeas = useMemo(() => digitalMunicipalityStore.getProposals().slice(0, 3), []);
  const myNotifications = useMemo(() => store.getNotifications(userId), [userId]);
  const mySavedPros = useMemo(() => (user ? store.getSavedProfessionals(user.id) : []), [user]);
  const myBookings = useMemo(() => (user ? store.getBookings({ customerId: user.id }) : []), [user]);

  // Moderator Data
  const pendingReports = useMemo(() => store.getModerationReports().filter(r => r.status === "pending"), []);
  const pendingCivicIssues = useMemo(() => civicStore.getIssues().filter(i => i.status === "submitted" || i.status === "under_review"), []);
  const pendingIdeas = useMemo(() => digitalMunicipalityStore.getProposals().filter(p => p.status === "under_municipal_review" || p.status.toLowerCase().includes("review")), []);

  // Organization Data
  const orgAnnouncements = useMemo(() => store.getAnnouncements().slice(0, 4), []);
  const orgEvents = useMemo(() => store.getEvents().slice(0, 3), []);

  // Admin Data
  const stats = useMemo(() => store.getVerificationStats(), []);
  const devProjects = useMemo(() => digitalMunicipalityStore.getProjects(), []);
  const auditLogs = useMemo(() => store.getAuditLogs().slice(0, 6), []);
  const allUsers = useMemo(() => store.getProfiles(), []);

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] pb-24">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: language === "ml" ? "ഹോം" : "Home", href: "/" },
            { label: language === "ml" ? "ഡാഷ്‌ബോർഡ്" : "Dashboard" },
          ]}
        />

        {/* Persona Switcher Bar (For Audit & Preview) */}
        <div className="bg-white rounded-2xl border border-[#EDE6D8] p-3 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C39A5B] bg-[#FAF7F0] px-2.5 py-1 rounded-md border border-[#EDE6D8]">
              {language === "ml" ? "റോൾ അടിസ്ഥാനമാക്കിയുള്ള കാഴ്‌ച" : "Role Dashboard View"}
            </span>
            <span className="text-xs text-[#5C6A64]">
              {language === "ml" ? "ലോഗിൻ ചെയ്ത റോൾ:" : "Authenticated Role:"}{" "}
              <strong className="text-[#194B35] uppercase">{role}</strong>
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs">
            <span className="text-gray-400 font-bold mr-1 shrink-0">{language === "ml" ? "പ്രിവ്യൂ:" : "Preview:"}</span>
            {[
              { r: "user" as UserRole, label: "Resident", label_ml: "പൗരൻ (Resident)" },
              { r: "moderator" as UserRole, label: "Moderator", label_ml: "മോഡറേറ്റർ (Moderator)" },
              { r: "verified_org" as UserRole, label: "Verified Org", label_ml: "സ്ഥാപനം (Verified Org)" },
              { r: "admin" as UserRole, label: "Administrator", label_ml: "അഡ്മിൻ (Admin)" },
            ].map((item) => (
              <button
                key={item.r}
                onClick={() => setActivePersona(item.r)}
                className={`px-3 py-1 rounded-lg font-bold transition whitespace-nowrap ${
                  activePersona === item.r
                    ? "bg-[#194B35] text-white shadow-xs"
                    : "bg-[#FAF7F0] text-gray-600 hover:bg-gray-200"
                }`}
              >
                {language === "ml" ? item.label_ml : item.label}
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 1. RESIDENT PERSONA DASHBOARD                                             */}
        {/* ========================================================================= */}
        {activePersona === "user" && (
          <div className="space-y-6">
            {/* Resident Hero */}
            <div className="bg-[#194B35] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-md">
              <div className="max-w-3xl space-y-3 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
                  <User className="w-3.5 h-3.5" />
                  <span>{language === "ml" ? "പൗര സേവന കേന്ദ്രം" : "Resident Civic Portal"}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-malayalam-heading">
                  {language === "ml"
                    ? `സ്വാഗതം, ${user?.display_name || "ഫാത്തിമ സുഹറ"}`
                    : `Welcome, ${user?.display_name || "Fathima Suhara"}`}
                </h1>
                <p className="text-white/80 text-xs sm:text-sm leading-relaxed max-w-2xl">
                  {language === "ml"
                    ? "നിങ്ങൾ സമർപ്പിച്ച സിവിക് പരാതികളുടെ പുരോഗതി, പിന്തുണച്ച വികസന ആശയങ്ങൾ, താനൂരിലെ ഔദ്യോഗിക അറിയിപ്പുകൾ എന്നിവ ഒറ്റനോട്ടത്തിൽ."
                    : "Track your reported civic issues, supported community development ideas, saved content, and followed ward activities across Tanur Municipality."}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    href="/civic/report"
                    className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-[#143E2C] font-bold text-xs rounded-xl flex items-center gap-1.5 transition shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{language === "ml" ? "പരാതി രജിസ്റ്റർ ചെയ്യാം" : "Report Civic Issue"}</span>
                  </Link>

                  <Link
                    href="/peoples-voice/ideas/new"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 flex items-center gap-1.5 transition"
                  >
                    <TrendingUp className="w-4 h-4 text-amber-300" />
                    <span>{language === "ml" ? "ആശയം സമർപ്പിക്കാം" : "Submit Idea"}</span>
                  </Link>

                  <Link
                    href="/notifications"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 flex items-center gap-1.5 transition"
                  >
                    <Bell className="w-4 h-4 text-amber-300" />
                    <span>{language === "ml" ? `അറിയിപ്പുകൾ (${myNotifications.filter(n => !n.is_read).length})` : `Notifications (${myNotifications.filter(n => !n.is_read).length})`}</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Resident 4 KPI Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl border border-[#EDE6D8] p-4">
                <span className="text-[10px] font-bold uppercase text-gray-400 block">
                  {language === "ml" ? "എന്റെ പരാതികൾ" : "My Reports"}
                </span>
                <p className="text-2xl font-black text-[#194B35] mt-1">{myReports.length || 2}</p>
                <span className="text-[10px] text-emerald-600 font-bold">1 ഇൻ പ്രോഗ്രസ് • 1 തീർപ്പായി</span>
              </div>

              <div className="bg-white rounded-2xl border border-[#EDE6D8] p-4">
                <span className="text-[10px] font-bold uppercase text-gray-400 block">
                  {language === "ml" ? "സമർപ്പിച്ച ആശയങ്ങൾ" : "My Ideas"}
                </span>
                <p className="text-2xl font-black text-[#C39A5B] mt-1">{myIdeas.length}</p>
                <span className="text-[10px] text-gray-500">38 ജനകീയ പിന്തുണകൾ</span>
              </div>

              <div className="bg-white rounded-2xl border border-[#EDE6D8] p-4">
                <span className="text-[10px] font-bold uppercase text-gray-400 block">
                  {language === "ml" ? "സൂക്ഷിച്ച വിദഗ്ദ്ധർ" : "Saved Pros"}
                </span>
                <p className="text-2xl font-black text-[#194B35] mt-1">{mySavedPros.length || 3}</p>
                <span className="text-[10px] text-gray-500">ബുക്കിംഗിന് തയ്യാറുള്ളവർ</span>
              </div>

              <div className="bg-white rounded-2xl border border-[#EDE6D8] p-4">
                <span className="text-[10px] font-bold uppercase text-gray-400 block">
                  {language === "ml" ? "പിന്തുടരുന്ന വാർഡ്" : "Followed Ward"}
                </span>
                <p className="text-lg font-black text-[#194B35] mt-1">വാർഡ് 14 (ഹാർബർ)</p>
                <span className="text-[10px] text-[#C39A5B] font-bold">താനൂർ നഗരസഭ</span>
              </div>
            </div>

            {/* Section: My Civic Reports & Followed Projects */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* My Civic Reports */}
              <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                    <h2 className="text-base font-bold text-[#194B35] font-malayalam-heading">
                      {language === "ml" ? "എന്റെ സിവിക് റിപ്പോർട്ടുകൾ" : "My Civic Reports"}
                    </h2>
                  </div>
                  <Link href="/civic/my-reports" className="text-xs font-bold text-[#194B35] hover:underline flex items-center gap-1">
                    <span>{language === "ml" ? "എല്ലാം കാണുക" : "View All"}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#EDE6D8] space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-800">വാർഡ് 14 അങ്ങാടി ഡ്രെയിനേജ് ബ്ലോക്ക്</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                        In Progress
                      </span>
                    </div>
                    <p className="text-[11px] text-[#5C6A64]">അസിസ്റ്റന്റ് എഞ്ചിനീയർ സൈറ്റ് പരിശോധിച്ചു. കരാറുകാരന് നിർദ്ദേശം നൽകി.</p>
                    <div className="text-[10px] text-gray-400 flex items-center justify-between pt-1">
                      <span>താനൂർ ഹാർബർ റോഡ്</span>
                      <Link href="/civic/issues/iss-002" className="text-[#194B35] font-bold hover:underline">ട്രാക്ക് ചെയ്യാം →</Link>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#EDE6D8] space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-800">തീരദേശ റോഡ് സ്ട്രീറ്റ്‌ലൈറ്റ് തകരാർ</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        Resolved
                      </span>
                    </div>
                    <p className="text-[11px] text-[#5C6A64]">കെ.എസ്.ഇ.ബി സെക്ഷൻ പുതിയ എൽ.ഇ.ഡി ലൈറ്റുകൾ സ്ഥാപിച്ചു പൂർത്തിയാക്കി.</p>
                    <div className="text-[10px] text-gray-400 flex items-center justify-between pt-1">
                      <span>താനൂർ ബീച്ച് വാർഡ്</span>
                      <span className="text-emerald-700 font-bold">പരിഹരിച്ചു ✓</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* My People's Voice Ideas */}
              <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-amber-600" />
                    <h2 className="text-base font-bold text-[#194B35] font-malayalam-heading">
                      {language === "ml" ? "എന്റെ ജനകീയ ആശയങ്ങൾ" : "My Community Ideas"}
                    </h2>
                  </div>
                  <Link href="/peoples-voice/my-activity" className="text-xs font-bold text-[#194B35] hover:underline flex items-center gap-1">
                    <span>{language === "ml" ? "എന്റെ പ്രവർത്തനം" : "My Activity"}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="space-y-3">
                  {myIdeas.map((idea) => (
                    <div key={idea.id} className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#EDE6D8] space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-800 line-clamp-1">{language === "ml" ? idea.title_ml : idea.title}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 shrink-0">
                          {idea.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-gray-500">
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3 text-[#C39A5B]" />
                          {idea.support_count} {language === "ml" ? "പിന്തുണകൾ" : "supporters"}
                        </span>
                        <span>•</span>
                        <span>{language === "ml" ? (idea.category_name_ml || idea.category_ml || idea.category) : (idea.category_name || idea.category)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. MODERATOR PERSONA DASHBOARD                                            */}
        {/* ========================================================================= */}
        {activePersona === "moderator" && (
          <div className="space-y-6">
            <div className="bg-[#143E2C] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-md">
              <div className="max-w-3xl space-y-3 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{language === "ml" ? "സിവിക് മോഡറേഷൻ കമാൻഡ് സെന്റർ" : "Moderator Control Center"}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-malayalam-heading">
                  {language === "ml" ? "മോഡറേഷൻ & പരിശോധനാ ഡാഷ്‌ബോർഡ്" : "Civic Moderation & Inspection Desk"}
                </h1>
                <p className="text-white/80 text-xs sm:text-sm leading-relaxed max-w-2xl">
                  {language === "ml"
                    ? "പൗരന്മാർ സമർപ്പിച്ച പരാതികളുടെ പ്രാഥമിക പരിശോധന, ഫീൽഡ് ഇൻസ്പെക്ഷൻ ടാസ്കുകൾ, അനുയോജ്യമല്ലാത്ത ഉള്ളടക്കങ്ങളുടെ ഫിൽറ്ററിംഗ് എന്നിവ ഇവിടെ നിർവ്വഹിക്കാം."
                    : "Review incoming citizen submissions, assign field verification visits, validate uploaded photos, and moderate community discussions."}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    href="/admin/civic"
                    className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-[#143E2C] font-bold text-xs rounded-xl flex items-center gap-1.5 transition shadow-sm"
                  >
                    <span>{language === "ml" ? "സിവിക് ടാസ്കുകൾ കാണുക" : "Manage Civic Queue"}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href="/admin/peoples-voice"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 flex items-center gap-1.5 transition"
                  >
                    <span>{language === "ml" ? "ആശയ മോഡറേഷൻ" : "Moderate Ideas"}</span>
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
                    <span>{language === "ml" ? "ഫ്ലാഗ് ചെയ്ത ഉള്ളടക്കങ്ങൾ" : "Flagged Content Reports"}</span>
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-800">
                    {pendingReports.length || 1}
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-[#FAF7F0] rounded-xl border border-[#EDE6D8] space-y-1">
                    <p className="font-bold text-gray-800">ചർച്ചാ കുറിപ്പ് പരിശോധന</p>
                    <p className="text-[11px] text-gray-500">വാർഡ് 18 സ്ട്രീറ്റ് ലൈറ്റ് ചർച്ചയിലെ ആവർത്തിച്ചുള്ള മെസ്സേജ് റിപ്പോർട്ട് ചെയ്തു.</p>
                    <div className="pt-1 flex gap-2">
                      <button className="px-2.5 py-1 bg-[#194B35] text-white rounded-lg text-[10px] font-bold">അംഗീകരിക്കുക</button>
                      <button className="px-2.5 py-1 bg-gray-200 text-gray-700 rounded-lg text-[10px] font-bold">ഡിസ്മിസ് ചെയ്യുക</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pending Civic Reports */}
              <div className="bg-white rounded-3xl border border-[#EDE6D8] p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <span className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                    <span>{language === "ml" ? "പരിശോധിക്കാനുള്ള പരാതികൾ" : "Unverified Issues"}</span>
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-800">
                    {pendingCivicIssues.length || 3}
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-[#FAF7F0] rounded-xl border border-[#EDE6D8] space-y-1">
                    <p className="font-bold text-gray-800">മീനടത്തൂർ റോഡ് കുഴികൾ</p>
                    <p className="text-[11px] text-gray-500">പൗരൻ സമർപ്പിച്ച ഫോട്ടോ പരിശോധിച്ചു വാർഡ് സമിതിക്ക് കൈമാറാൻ കാത്തിരിക്കുന്നു.</p>
                    <Link href="/admin/civic" className="text-[10px] font-bold text-[#194B35] hover:underline block pt-1">
                      ഇൻസ്പെക്ഷൻ തുറക്കുക →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Community Ideas Queue */}
              <div className="bg-white rounded-3xl border border-[#EDE6D8] p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <span className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    <span>{language === "ml" ? "അവലോകനം കാക്കുന്ന ആശയങ്ങൾ" : "Ideas in Review"}</span>
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {pendingIdeas.length || 2}
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-[#FAF7F0] rounded-xl border border-[#EDE6D8] space-y-1">
                    <p className="font-bold text-gray-800">താനൂർ ടൗൺ ലൈബ്രറി ഡിജിറ്റലൈസേഷൻ</p>
                    <p className="text-[11px] text-gray-500">നഗരസഭാ വിദ്യാഭ്യാസ സമിതിയുടെ അവലോകനത്തിന് അയക്കാൻ യോഗ്യമാണോ എന്ന് വിലയിരുത്തുക.</p>
                    <Link href="/admin/peoples-voice" className="text-[10px] font-bold text-[#194B35] hover:underline block pt-1">
                      അവലോകനം ചെയ്യുക →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. VERIFIED ORGANIZATION PERSONA DASHBOARD                                 */}
        {/* ========================================================================= */}
        {activePersona === "verified_org" && (
          <div className="space-y-6">
            <div className="bg-[#194B35] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-md">
              <div className="max-w-3xl space-y-3 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{language === "ml" ? "സ്ഥിരീകരിച്ച സംഘടന / സ്ഥാപനം" : "Verified Organization Portal"}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-malayalam-heading">
                  {language === "ml" ? "താനൂർ കോസ്റ്റൽ ഹെറിറ്റേജ് ഗിൽഡ്" : "Tanur Coastal Heritage Guild"}
                </h1>
                <p className="text-white/80 text-xs sm:text-sm leading-relaxed max-w-2xl">
                  {language === "ml"
                    ? "താനൂർ നഗരസഭയിലെ ഔദ്യോഗിക പരിപാടികൾ, പൗര അറിയിപ്പുകൾ, കമ്മ്യൂണിറ്റി സംരംഭങ്ങൾ എന്നിവ സംഘടനയുടെ പേരിൽ പ്രസിദ്ധീകരിക്കാം."
                    : "Authorized portal for verified non-profits, trade unions, institutions, and civic guilds to publish official announcements and organize verified initiatives."}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    href="/community"
                    className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-[#143E2C] font-bold text-xs rounded-xl flex items-center gap-1.5 transition shadow-sm"
                  >
                    <Megaphone className="w-4 h-4" />
                    <span>{language === "ml" ? "ഔദ്യോഗിക അറിയിപ്പ് നൽകാം" : "Publish Announcement"}</span>
                  </Link>

                  <Link
                    href="/events"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 flex items-center gap-1.5 transition"
                  >
                    <Calendar className="w-4 h-4 text-amber-300" />
                    <span>{language === "ml" ? "പരിപാടി സംഘടിപ്പിക്കാം" : "Host Public Event"}</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Org Metrics & Activity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 space-y-4">
                <h2 className="text-base font-bold text-[#194B35] font-malayalam-heading flex items-center gap-2">
                  <Megaphone className="w-4 h-4 text-[#C39A5B]" />
                  <span>{language === "ml" ? "പ്രസിദ്ധീകരിച്ച ഔദ്യോഗിക അറിയിപ്പുകൾ" : "Published Announcements"}</span>
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
                <h2 className="text-base font-bold text-[#194B35] font-malayalam-heading flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#194B35]" />
                  <span>{language === "ml" ? "സംഘടിപ്പിച്ച പൊതു പരിപാടികൾ" : "Hosted Public Events"}</span>
                </h2>
                <div className="space-y-2.5">
                  {orgEvents.map((evt) => (
                    <div key={evt.id} className="p-3 bg-[#FAF7F0] rounded-xl border border-[#EDE6D8] flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-gray-800 block line-clamp-1">{language === "ml" ? evt.title_ml || evt.title : evt.title}</span>
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
        {/* 4. ADMINISTRATOR PERSONA DASHBOARD                                        */}
        {/* ========================================================================= */}
        {activePersona === "admin" && (
          <div className="space-y-6">
            <div className="bg-[#194B35] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-md">
              <div className="max-w-3xl space-y-3 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{language === "ml" ? "നഗരസഭാ അഡ്മിൻ കൺട്രോൾ ഹബ്" : "Administrator Command Hub"}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-malayalam-heading">
                  {language === "ml" ? "താനൂർ ഡിജിറ്റൽ മുൻസിപ്പാലിറ്റി മാനേജ്‌മെന്റ്" : "Municipal Platform Administration"}
                </h1>
                <p className="text-white/80 text-xs sm:text-sm leading-relaxed max-w-2xl">
                  {language === "ml"
                    ? "നഗരസഭയിലെ സ്മാർട്ട് ന്യൂസ്‌റൂം, വികസന ട്രാക്കർ, സിവിക് കണക്ട്, ജനകീയ ശബ്ദം, ഉപയോക്തൃ റോളുകൾ, ഓഡിറ്റ് ലോഗുകൾ എന്നിവ പൂർണ്ണമായി നിയന്ത്രിക്കാം."
                    : "Full-spectrum municipal oversight: manage verified users, server-side RBAC role assignments, newsroom ingestion safeguards, development tracker milestones, and immutable audit trails."}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    href="/admin"
                    className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-[#143E2C] font-bold text-xs rounded-xl flex items-center gap-1.5 transition shadow-sm"
                  >
                    <span>{language === "ml" ? "പൂർണ്ണ അഡ്മിൻ പാനൽ" : "Full Admin Panel"}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href="/admin/development"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 flex items-center gap-1.5 transition"
                  >
                    <HardHat className="w-4 h-4 text-emerald-300" />
                    <span>{language === "ml" ? "വികസന ട്രാക്കർ" : "Dev Tracker Admin"}</span>
                  </Link>

                  <Link
                    href="/admin/newsroom"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 flex items-center gap-1.5 transition"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>{language === "ml" ? "സ്മാർട്ട് ന്യൂസ്‌റൂം" : "Smart Newsroom"}</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Admin 4 KPIs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl border border-[#EDE6D8] p-4">
                <span className="text-[10px] font-bold uppercase text-gray-400 block">
                  {language === "ml" ? "സ്ഥിരീകരിച്ച വിവരങ്ങൾ" : "Verified Records"}
                </span>
                <p className="text-2xl font-black text-[#194B35] mt-1">{stats.totalVerified}</p>
                <span className="text-[10px] text-emerald-600 font-bold">{stats.percentVerified}% തദ്ദേശീയ കൃത്യത</span>
              </div>

              <div className="bg-white rounded-2xl border border-[#EDE6D8] p-4">
                <span className="text-[10px] font-bold uppercase text-gray-400 block">
                  {language === "ml" ? "വികസന പദ്ധതികൾ" : "Dev Projects"}
                </span>
                <p className="text-2xl font-black text-[#C39A5B] mt-1">{devProjects.length}</p>
                <span className="text-[10px] text-gray-500">₹86.60 കോടി ബജറ്റ്</span>
              </div>

              <div className="bg-white rounded-2xl border border-[#EDE6D8] p-4">
                <span className="text-[10px] font-bold uppercase text-gray-400 block">
                  {language === "ml" ? "രജിസ്റ്റർ ചെയ്ത ഉപയോക്താക്കൾ" : "Active Users"}
                </span>
                <p className="text-2xl font-black text-[#194B35] mt-1">{allUsers.length}</p>
                <span className="text-[10px] text-gray-500">4 റോളുകൾ വിന്യസിച്ചു</span>
              </div>

              <div className="bg-white rounded-2xl border border-[#EDE6D8] p-4">
                <span className="text-[10px] font-bold uppercase text-gray-400 block">
                  {language === "ml" ? "സിസ്റ്റം ഹെൽത്ത്" : "System Health"}
                </span>
                <p className="text-2xl font-black text-emerald-600 mt-1">99.8%</p>
                <span className="text-[10px] text-gray-500">PostgreSQL RLS സജീവം</span>
              </div>
            </div>

            {/* Quick Administrative Module Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link href="/admin/civic" className="p-5 bg-white rounded-2xl border border-[#EDE6D8] hover:border-[#194B35] transition shadow-xs flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[#194B35]">സിവിക് കണക്ട് ഡെസ്ക് (Civic Connect)</h3>
                  <p className="text-xs text-gray-500 mt-0.5">പൗര പരാതികൾ, വകുപ്പ് പ്രതികരണങ്ങൾ</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>

              <Link href="/admin/development" className="p-5 bg-white rounded-2xl border border-[#EDE6D8] hover:border-[#194B35] transition shadow-xs flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[#194B35]">വികസന ട്രാക്കർ (Dev Tracker)</h3>
                  <p className="text-xs text-gray-500 mt-0.5">പദ്ധതികൾ, മൈൽസ്റ്റോണുകൾ, ബജറ്റ്</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>

              <Link href="/admin/peoples-voice" className="p-5 bg-white rounded-2xl border border-[#EDE6D8] hover:border-[#194B35] transition shadow-xs flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[#194B35]">ജനകീയ ശബ്ദം (People&apos;s Voice)</h3>
                  <p className="text-xs text-gray-500 mt-0.5">ആശയ അവലോകനം, കൗൺസിൽ കൈമാറ്റം</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>

              <Link href="/admin/newsroom" className="p-5 bg-white rounded-2xl border border-[#EDE6D8] hover:border-[#194B35] transition shadow-xs flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[#194B35]">സ്മാർട്ട് ന്യൂസ്‌റൂം (Smart Newsroom)</h3>
                  <p className="text-xs text-gray-500 mt-0.5">RSS ഇൻജഷൻ, സെൻസിറ്റിവിറ്റി ഗേറ്റിംഗ്</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>

              <Link href="/admin?tab=users" className="p-5 bg-white rounded-2xl border border-[#EDE6D8] hover:border-[#194B35] transition shadow-xs flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[#194B35]">യൂസർ & റോൾ മാനേജ്‌മെന്റ് (RBAC)</h3>
                  <p className="text-xs text-gray-500 mt-0.5">സെർവർ-സൈഡ് പെർമിഷൻ അസൈൻമെന്റ്</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>

              <Link href="/admin?tab=audit" className="p-5 bg-white rounded-2xl border border-[#EDE6D8] hover:border-[#194B35] transition shadow-xs flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[#194B35]">ഇമ്യൂട്ടബിൾ ഓഡിറ്റ് ലോഗുകൾ (Audit Trail)</h3>
                  <p className="text-xs text-gray-500 mt-0.5">ഭരണപരമായ എല്ലാ നീക്കങ്ങളുടെയും രേഖ</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
            </div>
          </div>
        )}
      </main>

      <BottomNav />
      <Footer />
    </div>
  );
}
