"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { CivicNav } from "@/components/civic/CivicNav";
import { useLanguage } from "@/lib/i18n/context";
import { 
  civicStore, 
  CIVIC_CATEGORIES, 
  CivicIssue 
} from "@/lib/data/civicConnectData";
import { 
  Bookmark, 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Send, 
  ShieldCheck, 
  MapPin, 
  ChevronRight, 
  Bell, 
  BookmarkX,
  ThumbsUp
} from "lucide-react";

export default function CivicFollowingPage() {
  const { language } = useLanguage();
  const [issues, setIssues] = useState<CivicIssue[]>(() => civicStore.getIssues());

  // Filter issues that the user is following (or seed a default followed one)
  const followedIssues = issues.filter((i) => i.followed_by_user);

  const handleUnfollow = (e: React.MouseEvent, issueId: string) => {
    e.preventDefault();
    e.stopPropagation();
    civicStore.toggleFollow(issueId);
    setIssues([...civicStore.getIssues()]);
  };

  const getStatusBadge = (status: CivicIssue['status']) => {
    switch (status) {
      case "resolved":
        return { label: language === "ml" ? "പരിഹരിച്ചു" : "Resolved", bg: "bg-emerald-100 text-emerald-800 border-emerald-300", icon: CheckCircle2 };
      case "in_progress":
        return { label: language === "ml" ? "നടപടിയിൽ" : "In Progress", bg: "bg-blue-100 text-blue-800 border-blue-300", icon: Clock };
      case "forwarded":
        return { label: language === "ml" ? "കൈമാറി" : "Forwarded", bg: "bg-amber-100 text-amber-800 border-amber-300", icon: Send };
      case "verified":
        return { label: language === "ml" ? "സ്ഥിരീകരിച്ചു" : "Verified", bg: "bg-purple-100 text-purple-800 border-purple-300", icon: ShieldCheck };
      case "under_review":
        return { label: language === "ml" ? "അവലോകനത്തിൽ" : "Under Review", bg: "bg-sky-100 text-sky-800 border-sky-300", icon: Clock };
      case "rejected":
        return { label: language === "ml" ? "തള്ളി" : "Rejected", bg: "bg-rose-100 text-rose-800 border-rose-300", icon: AlertTriangle };
      default:
        return { label: language === "ml" ? "സമർപ്പിച്ചു" : "Submitted", bg: "bg-neutral-100 text-neutral-800 border-neutral-300", icon: Clock };
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] pb-24">
      <Navbar />
      <CivicNav />

      {/* Header Hub */}
      <section className="bg-gradient-to-b from-[#FAF4E6] to-[#FAF7F0] border-b border-[#E8DCBF] pt-8 pb-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-[#8C5B0F] text-white flex items-center justify-center">
                  <Bookmark className="w-3.5 h-3.5 fill-current" />
                </span>
                <span className="text-xs font-bold text-[#8C5B0F] uppercase tracking-wider">
                  ഫോളോ ചെയ്യുന്ന പ്രശ്നങ്ങൾ
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#194B35] font-serif">
                {language === "ml" ? "ഞാൻ ഫോളോ ചെയ്യുന്ന പൊതു വിഷയങ്ങൾ" : "Followed Civic Issues"}
              </h1>
              <p className="text-xs sm:text-sm text-[#5C6A64] mt-1 max-w-2xl">
                {language === "ml"
                  ? "നിങ്ങൾ ട്രാക്ക് ചെയ്യുന്ന പ്രശ്നങ്ങളിൽ അധികൃതർ സ്വീകരിക്കുന്ന നടപടികളും പുതിയ അപ്‌ഡേറ്റുകളും നിങ്ങളുടെ അറിയിപ്പുകളിൽ എത്തും."
                  : "Track updates, authority actions, and resolution notices for community issues you are monitoring."}
              </p>
            </div>

            <Link
              href="/civic/issues"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#DDD5C5] text-[#194B35] text-xs font-bold shadow-xs hover:bg-[#FAF4E6] transition shrink-0"
            >
              <Search className="w-4 h-4 text-[#8C5B0F]" />
              <span>{language === "ml" ? "കൂടുതൽ പ്രശ്നങ്ങൾ തിരയുക" : "Browse Issues"}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {followedIssues.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#E8DCBF] p-10 text-center max-w-lg mx-auto shadow-xs my-6">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto mb-4 text-[#8C5B0F]">
              <Bookmark className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-[#194B35] mb-2 font-serif">
              {language === "ml" ? "ഫോളോ ചെയ്യുന്ന പ്രശ്നങ്ങളൊന്നുമില്ല" : "No Followed Issues Yet"}
            </h3>
            <p className="text-xs sm:text-sm text-[#5C6A64] mb-6">
              {language === "ml"
                ? "നിങ്ങളുടെ വാർഡിലെ പ്രധാന വിഷയങ്ങൾ ഫോളോ ചെയ്താൽ അവയുടെ പരിഹാര നടപടികൾ തത്സമയം അറിയാൻ കഴിയും."
                : "Follow community issues to receive automated alerts whenever authorities update their progress."}
            </p>
            <Link
              href="/civic/issues"
              className="px-5 py-2.5 rounded-xl bg-[#194B35] text-white text-xs font-bold hover:bg-[#143E2C] transition inline-flex items-center gap-2"
            >
              <Search className="w-4 h-4 text-amber-300" />
              <span>{language === "ml" ? "പരാതികൾ ബ്രൗസ് ചെയ്യുക" : "Explore Community Issues"}</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-xs text-[#5C6A64] font-medium">
              {followedIssues.length} പ്രശ്നങ്ങൾ ഫോളോ ചെയ്യുന്നു
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {followedIssues.map((issue) => {
                const statusInfo = getStatusBadge(issue.status);
                const StatusIcon = statusInfo.icon;
                const cat = CIVIC_CATEGORIES.find(c => c.id === issue.category_id);

                return (
                  <div
                    key={issue.id}
                    className="bg-white rounded-2xl border border-[#E8DCBF] p-5 shadow-xs hover:border-[#194B35]/40 transition flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2 text-xs">
                        <span className="font-mono text-[10px] font-bold text-[#194B35] bg-[#E0F1E7] px-2 py-0.5 rounded border border-[#BDE3CE]">
                          {issue.tracking_id}
                        </span>
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${statusInfo.bg}`}>
                          <StatusIcon className="w-3 h-3" />
                          {statusInfo.label}
                        </span>
                      </div>

                      <div className="mb-2">
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded"
                          style={{ backgroundColor: `${cat?.color || '#194B35'}15`, color: cat?.color || '#194B35' }}
                        >
                          {issue.subcategory}
                        </span>
                      </div>

                      <Link href={`/civic/issues/${issue.id}`}>
                        <h3 className="font-bold text-sm sm:text-base text-[#1A2420] hover:text-[#194B35] transition mb-1 line-clamp-2">
                          {language === "ml" ? issue.title_ml : issue.title}
                        </h3>
                      </Link>

                      <div className="flex items-center gap-1.5 text-xs text-neutral-500 mt-2">
                        <MapPin className="w-3.5 h-3.5 text-[#8C5B0F] shrink-0" />
                        <span className="truncate">{issue.address_landmark}, {issue.locality}</span>
                      </div>

                      {issue.authority_forwarding && (
                        <div className="mt-2.5 text-[11px] bg-amber-50 text-amber-900 px-2.5 py-1 rounded-lg border border-amber-200">
                          🏛️ കൈമാറിയത്: <strong>{issue.authority_forwarding.authority_name}</strong>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                      <button
                        onClick={(e) => handleUnfollow(e, issue.id)}
                        className="text-neutral-500 hover:text-rose-600 transition flex items-center gap-1 text-[11px] font-medium"
                      >
                        <BookmarkX className="w-3.5 h-3.5" />
                        <span>അൺഫോളോ ചെയ്യുക</span>
                      </button>

                      <Link
                        href={`/civic/issues/${issue.id}`}
                        className="font-bold text-xs text-[#194B35] hover:text-[#8C5B0F] flex items-center gap-1"
                      >
                        <span>വിശദാംശങ്ങൾ</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
