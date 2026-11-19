"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { PeoplesVoiceNav } from "@/components/peoples-voice/PeoplesVoiceNav";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { useLanguage } from "@/lib/i18n/context";
import { useAuth } from "@/lib/auth/context";
import { 
  peoplesVoiceStore, 
  PEOPLES_VOICE_IDEA_CATEGORIES 
} from "@/lib/data/peoplesVoiceData";
import { 
  CommunityIdea, 
  LocalInitiative, 
  CommunityDiscussion 
} from "@/types/peoplesVoice";
import {
  Lightbulb,
  MessageSquare,
  Users,
  PlusCircle,
  ThumbsUp,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  Calendar,
  Layers,
  HeartHandshake,
  TrendingUp,
  AlertCircle,
  Compass,
  FileCheck2,
  ChevronRight,
  Heart
} from "lucide-react";

export default function PeoplesVoiceHomePage() {
  const { language } = useLanguage();
  const { user } = useAuth();

  const [ideas, setIdeas] = useState<CommunityIdea[]>(() => peoplesVoiceStore.getIdeas({ sortBy: "supported" }));
  const [discussions] = useState<CommunityDiscussion[]>(() => peoplesVoiceStore.getDiscussions({ sortBy: "popular" }));
  const [initiatives] = useState<LocalInitiative[]>(() => peoplesVoiceStore.getInitiatives());
  const analytics = peoplesVoiceStore.getAnalytics();

  // Support toggle handler
  const handleSupportToggle = (ideaId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const userId = user?.id || "usr-anon-local";
    const res = peoplesVoiceStore.toggleIdeaSupport(ideaId, userId);
    if (res) {
      setIdeas(peoplesVoiceStore.getIdeas({ sortBy: "supported" }));
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "In Progress":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "Accepted for Collaboration":
        return "bg-purple-50 text-purple-800 border-purple-200";
      case "Forwarded for Consideration":
        return "bg-blue-50 text-blue-800 border-blue-200";
      case "Shortlisted":
        return "bg-indigo-50 text-indigo-800 border-indigo-200";
      case "Community Discussion":
        return "bg-cyan-50 text-cyan-800 border-cyan-200";
      case "Under Review":
        return "bg-yellow-50 text-yellow-800 border-yellow-200";
      case "Not Proceeding":
        return "bg-gray-100 text-gray-700 border-gray-300";
      default:
        return "bg-[#FAF7F0] text-[#194B35] border-[#EDE6D8]";
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] flex flex-col font-sans selection:bg-[#194B35]/20 selection:text-[#194B35]">
      <Navbar />
      <PeoplesVoiceNav />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 w-full">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: language === "ml" ? "ഹോം" : "Home", href: "/" },
            { label: language === "ml" ? "ജനകീയ ശബ്ദം" : "People's Voice" },
          ]}
        />

        {/* ========================================================================= */}
        {/* 1. HERO SECTION (Kerala Municipal Waterfront Style)                       */}
        {/* ========================================================================= */}
        <div className="relative rounded-3xl sm:rounded-[36px] bg-gradient-to-br from-[#FAF7F0] via-[#F5F1E7] to-[#EDE6D8] border border-[#EDE6D8] p-6 sm:p-10 shadow-xs overflow-hidden">
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#194B35_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8">
            <div className="space-y-3 sm:space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#194B35]/10 text-[#194B35] text-xs font-bold border border-[#194B35]/20">
                <Heart className="w-4 h-4 text-[#194B35]" />
                <span>{language === "ml" ? "പൗര പങ്കാളിത്ത വേദി • ഫീച്ചർ 06" : "Citizen Participation • Feature 06"}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#194B35] tracking-tight font-malayalam-heading leading-tight">
                {language === "ml" ? "ജനകീയ ശബ്ദം താനൂർ" : "People's Voice"}
              </h1>

              <p className="text-xs sm:text-sm text-[#5C6A64] leading-relaxed">
                {language === "ml"
                  ? "നിങ്ങളുടെ ആശയങ്ങൾ. നമ്മുടെ സമൂഹം. മെച്ചപ്പെട്ട താനൂർ. താനൂർ നഗരസഭയിലെ പ്രദേശവാസികൾക്ക് സ്വന്തം നാടിന്റെ നവീകരണത്തിനായുള്ള നിർദ്ദേശങ്ങൾ പങ്കുവെക്കാനും, പൊതുവിഷയങ്ങൾ ചർച്ച ചെയ്യാനും, സന്നദ്ധ കൂട്ടായ്മകളിൽ പങ്കാളികളാകാനുമുള്ള സ്വതന്ത്ര പൊതുവേദി."
                  : "Your Ideas. Our Community. A Better Tanur. An open civic platform for residents of Tanur Municipality to propose constructive improvement ideas, engage in neighborhood discussions, and spearhead voluntary drives."}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href="/peoples-voice/ideas/new"
                  className="px-5 py-2.5 rounded-2xl bg-[#194B35] hover:bg-[#123626] text-white text-xs sm:text-sm font-bold shadow-sm hover:shadow transition flex items-center gap-2"
                >
                  <PlusCircle className="w-4 h-4 text-amber-300" />
                  <span>{language === "ml" ? "പുതിയ ആശയം സമർപ്പിക്കാം" : "Submit Community Idea"}</span>
                </Link>

                <Link
                  href="/peoples-voice/ideas"
                  className="px-5 py-2.5 rounded-2xl bg-white hover:bg-[#FAF7F0] text-[#194B35] border border-[#EDE6D8] text-xs sm:text-sm font-bold shadow-2xs transition flex items-center gap-2"
                >
                  <Lightbulb className="w-4 h-4 text-[#C39A5B]" />
                  <span>{language === "ml" ? "ആശയങ്ങൾ കാണുക" : "Browse Ideas Register"}</span>
                </Link>

                <Link
                  href="/peoples-voice/discussions"
                  className="px-5 py-2.5 rounded-2xl bg-[#FAF7F0] hover:bg-[#EDE6D8] text-[#194B35] border border-[#EDE6D8] text-xs sm:text-sm font-bold shadow-2xs transition flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-[#194B35]" />
                  <span>{language === "ml" ? "ചർച്ചകൾ" : "Civic Discussions"}</span>
                </Link>
              </div>
            </div>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 w-full lg:w-80 shrink-0">
              <div className="p-3.5 bg-white rounded-2xl border border-[#EDE6D8] shadow-2xs space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#C39A5B] block">Community Ideas</span>
                <span className="text-xl sm:text-2xl font-black text-[#194B35]">{analytics.totalIdeas}</span>
                <span className="text-[11px] text-[#5C6A64] block">Proposed</span>
              </div>
              <div className="p-3.5 bg-white rounded-2xl border border-[#EDE6D8] shadow-2xs space-y-1">
                <span className="text-[10px] uppercase font-bold text-emerald-700 block">Endorsements</span>
                <span className="text-xl sm:text-2xl font-black text-emerald-800">{analytics.totalSupporters}</span>
                <span className="text-[11px] text-[#5C6A64] block">Resident Supports</span>
              </div>
              <div className="p-3.5 bg-white rounded-2xl border border-[#EDE6D8] shadow-2xs space-y-1">
                <span className="text-[10px] uppercase font-bold text-blue-700 block">Civic Debates</span>
                <span className="text-xl sm:text-2xl font-black text-blue-900">{analytics.totalDiscussions}</span>
                <span className="text-[11px] text-[#5C6A64] block">Active Threads</span>
              </div>
              <div className="p-3.5 bg-white rounded-2xl border border-[#EDE6D8] shadow-2xs space-y-1">
                <span className="text-[10px] uppercase font-bold text-purple-700 block">Local Drives</span>
                <span className="text-xl sm:text-2xl font-black text-purple-900">{analytics.totalInitiatives}</span>
                <span className="text-[11px] text-[#5C6A64] block">Volunteer Actions</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. CIVIC STATUS & PARTICIPATION ADVISORY BANNER                           */}
        {/* ========================================================================= */}
        <div className="p-4 sm:p-5 rounded-3xl bg-amber-50/80 border border-amber-200/90 text-xs text-amber-950 flex items-start gap-3 shadow-2xs">
          <Sparkles className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-amber-900 block text-sm font-malayalam-heading">
              {language === "ml" ? "സ്വതന്ത്ര പൗര പങ്കാളിത്ത വേദി (Independent Citizen Platform)" : "Independent Citizen Platform Standard"}
            </span>
            <p className="leading-relaxed text-[11px] text-amber-900/90">
              {language === "ml"
                ? "ഇതൊരു ഔദ്യോഗിക തിരഞ്ഞെടുപ്പ് വോട്ടെടുപ്പല്ല. താനൂർ നിവാസികളുടെ പിന്തുണയും സർഗ്ഗാത്മക നിർദ്ദേശങ്ങളും സമാഹരിച്ച് പൊതുശ്രദ്ധയിൽ കൊണ്ടുവരാനും പ്രാദേശിക ക്ലബ്ബുകൾ, റസിഡന്റ്സ് അസോസിയേഷനുകൾ എന്നിവയിലൂടെ നാടിന് പ്രയോജനകരമായ മാറ്റങ്ങൾ സൃഷ്ടിക്കാനുമുള്ള വേദി."
                : "This platform is an independent civic forum, not an official municipal ballot. Support counts reflect resident consensus to empower community action campaigns and constructive representations to authorities."}
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. EXPLORE BY CIVIC CATEGORY PILLS                                        */}
        {/* ========================================================================= */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#194B35] font-malayalam-heading">
                {language === "ml" ? "വിഭാഗങ്ങൾ തിരിച്ച് കണ്ടെത്താം" : "Explore Ideas by Category"}
              </h2>
              <p className="text-xs text-[#5C6A64]">
                {language === "ml"
                  ? "റോഡുകൾ, മാലിന്യ സംസ്കരണം, വിദ്യാഭ്യാസം, ആരോഗ്യം ഉൾപ്പെടെയുള്ള പ്രധാന മേഖലകൾ"
                  : "Browse community improvement ideas across key civic categories"}
              </p>
            </div>

            <Link
              href="/peoples-voice/ideas"
              className="text-xs font-bold text-[#194B35] hover:underline flex items-center gap-1"
            >
              <span>{language === "ml" ? "എല്ലാം കാണുക" : "View All"}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {PEOPLES_VOICE_IDEA_CATEGORIES.slice(0, 6).map((cat) => {
              const count = analytics.byCategory[cat.key] || 0;
              return (
                <Link
                  key={cat.key}
                  href={`/peoples-voice/ideas?category=${cat.key}`}
                  className="group p-4 rounded-3xl bg-white border border-[#EDE6D8] hover:border-[#194B35] hover:shadow-md transition text-left flex flex-col justify-between space-y-2 shadow-2xs"
                >
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center text-white transition group-hover:scale-105 shadow-2xs"
                    style={{ backgroundColor: cat.color }}
                  >
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs sm:text-sm text-[#194B35] group-hover:text-[#123626] line-clamp-1 font-malayalam-heading">
                      {language === "ml" ? cat.label_ml : cat.label}
                    </h3>
                    <p className="text-[11px] text-[#5C6A64] mt-0.5">
                      {count} {language === "ml" ? "ആശയങ്ങൾ" : "ideas"}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. TOP SUPPORTED COMMUNITY IDEAS GRID                                      */}
        {/* ========================================================================= */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#C39A5B]" />
                <span className="text-xs font-bold text-[#C39A5B] uppercase tracking-wider">
                  {language === "ml" ? "ജനകീയ നിർദ്ദേശങ്ങൾ" : "Community Proposals"}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#194B35] font-malayalam-heading">
                {language === "ml" ? "കൂടുതൽ പിന്തുണ ലഭിച്ച ആശയങ്ങൾ" : "Top Supported Community Ideas"}
              </h2>
            </div>

            <Link
              href="/peoples-voice/ideas"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white text-xs font-bold text-[#194B35] border border-[#EDE6D8] hover:bg-[#FAF7F0] shadow-2xs transition self-start sm:self-auto"
            >
              <span>{language === "ml" ? "എല്ലാ ആശയങ്ങളും" : "Browse Ideas Register"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ideas.slice(0, 3).map((idea) => {
              return (
                <div
                  key={idea.id}
                  className="bg-white rounded-3xl border border-[#EDE6D8] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Image banner or fallback */}
                    {idea.images && idea.images.length > 0 ? (
                      <div className="relative h-44 w-full bg-[#EDE6D8] overflow-hidden">
                        <img
                          src={idea.images[0]}
                          alt={idea.title}
                          className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#194B35]/90 text-white backdrop-blur-xs">
                            {idea.tracking_id}
                          </span>
                        </div>
                        <div className="absolute top-3 right-3">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border backdrop-blur-xs ${getStatusBadge(idea.status)}`}>
                            {idea.status}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="h-20 bg-gradient-to-r from-[#FAF7F0] to-[#EDE6D8] p-4 flex items-center justify-between border-b border-[#EDE6D8]">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#194B35] text-white">
                          {idea.tracking_id}
                        </span>
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusBadge(idea.status)}`}>
                          {idea.status}
                        </span>
                      </div>
                    )}

                    <div className="p-5 space-y-3">
                      {/* Category & Locality */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#FAF7F0] text-[#194B35] border border-[#EDE6D8]">
                          {language === "ml" ? idea.category_name_ml : idea.category_name}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-[#5C6A64]">
                          <MapPin className="w-3 h-3 text-[#C39A5B]" />
                          <span>{idea.locality}</span>
                          {idea.ward_number ? <span>(Ward {idea.ward_number})</span> : null}
                        </span>
                      </div>

                      <Link href={`/peoples-voice/ideas/${idea.id}`}>
                        <h3 className="font-bold text-base sm:text-lg text-[#194B35] group-hover:text-[#123626] transition font-malayalam-heading leading-snug line-clamp-2">
                          {language === "ml" && idea.title_ml ? idea.title_ml : idea.title}
                        </h3>
                      </Link>

                      <p className="text-xs text-[#5C6A64] line-clamp-3 leading-relaxed">
                        {language === "ml" && idea.description_ml ? idea.description_ml : idea.description}
                      </p>

                      {/* Forwarded or Collaboration Alert if any */}
                      {idea.forwarded_record ? (
                        <div className="p-2.5 rounded-2xl bg-blue-50 border border-blue-200 text-[11px] text-blue-900 flex items-start gap-2">
                          <FileCheck2 className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-bold">
                              {language === "ml" ? "ഔദ്യോഗികമായി കൈമാറി:" : "Forwarded to Authority:"}
                            </p>
                            <p className="text-[10px] text-blue-800 line-clamp-1">
                              Ref: {idea.forwarded_record.reference_number} ({idea.forwarded_record.authority_name})
                            </p>
                          </div>
                        </div>
                      ) : idea.collaboration_record ? (
                        <div className="p-2.5 rounded-2xl bg-purple-50 border border-purple-200 text-[11px] text-purple-900 flex items-start gap-2">
                          <HeartHandshake className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-bold">
                              {language === "ml" ? "സഹകരണത്തിന് അംഗീകരിച്ചു:" : "Collaboration Confirmed:"}
                            </p>
                            <p className="text-[10px] text-purple-800 line-clamp-1">
                              {idea.collaboration_record.organization_name}
                            </p>
                          </div>
                        </div>
                      ) : null}

                      {/* Estimated Cost */}
                      {idea.estimated_cost && (
                        <div className="text-[11px] text-[#5C6A64] pt-1">
                          <span className="font-medium text-[#1A2420]">
                            {language === "ml" ? "പ്രതീക്ഷിത ചെലവ്:" : "Est. Cost:"}{" "}
                          </span>
                          <span className="font-bold text-[#194B35] font-mono">{idea.estimated_cost}</span>
                          <span className="text-[10px] text-[#7A8880] ml-1">
                            ({language === "ml" ? "ജനകീയ അനുമാനം" : "Community estimate"})
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer: Support Button & Action Link */}
                  <div className="px-5 py-3.5 bg-[#FAF7F0] border-t border-[#EDE6D8] flex items-center justify-between">
                    <button
                      onClick={(e) => handleSupportToggle(idea.id, e)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition active:scale-95 ${
                        idea.supported_by_user
                          ? "bg-[#194B35] text-white shadow-2xs"
                          : "bg-white text-[#194B35] border border-[#EDE6D8] hover:bg-[#FAF7F0]"
                      }`}
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${idea.supported_by_user ? "fill-white" : ""}`} />
                      <span>{idea.support_count}</span>
                      <span className="hidden sm:inline font-normal text-[11px]">
                        {idea.supported_by_user
                          ? (language === "ml" ? "പിന്തുണച്ചു" : "Supported")
                          : (language === "ml" ? "പിന്തുണയ്ക്കാം" : "Support")}
                      </span>
                    </button>

                    <div className="flex items-center gap-3">
                      <Link
                        href={`/peoples-voice/ideas/${idea.id}#comments`}
                        className="flex items-center gap-1 text-xs text-[#5C6A64] hover:text-[#194B35]"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>{idea.comments_count}</span>
                      </Link>

                      <Link
                        href={`/peoples-voice/ideas/${idea.id}`}
                        aria-label={`View details for ${idea.title}`}
                        className="w-8 h-8 rounded-full bg-[#194B35] text-white flex items-center justify-center hover:bg-[#123626] transition shadow-xs hover:scale-105 active:scale-95"
                      >
                        <ChevronRight className="w-4 h-4 text-white" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 5. TWO COLUMN WORKSPACE: CIVIC DISCUSSIONS & LOCAL DRIVES                 */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Civic Discussions */}
          <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#EDE6D8]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#194B35] font-malayalam-heading">
                    {language === "ml" ? "ജനകീയ ചർച്ചകൾ" : "Civic Discussions"}
                  </h3>
                  <p className="text-[11px] text-[#5C6A64]">
                    {language === "ml" ? "വികസന വിഷയങ്ങളിൽ സ്വതന്ത്ര സംവാദം" : "Active debates on town priorities"}
                  </p>
                </div>
              </div>

              <Link
                href="/peoples-voice/discussions"
                className="text-xs font-bold text-[#194B35] hover:underline flex items-center gap-0.5"
              >
                <span>{language === "ml" ? "എല്ലാം" : "View All"}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {discussions.slice(0, 3).map((disc) => (
                <Link
                  key={disc.id}
                  href={`/peoples-voice/discussions#${disc.id}`}
                  className="block p-4 rounded-2xl bg-[#FAF7F0] hover:bg-[#F5F1E7] transition border border-[#EDE6D8]"
                >
                  <div className="flex items-center gap-2 mb-1 text-[11px] text-[#5C6A64]">
                    <span className="font-semibold text-[#194B35]">{disc.category_name}</span>
                    <span>•</span>
                    <span>{disc.replies_count} {language === "ml" ? "അഭിപ്രായങ്ങൾ" : "replies"}</span>
                  </div>

                  <h4 className="font-bold text-sm text-[#194B35] mb-1 font-malayalam-heading line-clamp-1">
                    {language === "ml" && disc.title_ml ? disc.title_ml : disc.title}
                  </h4>

                  <p className="text-xs text-[#5C6A64] line-clamp-2 mb-2">
                    {disc.body}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-[#5C6A64]">
                    <span className="truncate">{disc.author_name}</span>
                    <span className="flex items-center gap-1 text-[#194B35] font-semibold">
                      <ThumbsUp className="w-3 h-3" /> {disc.likes_count}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Local Initiatives */}
          <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#EDE6D8]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#194B35] font-malayalam-heading">
                    {language === "ml" ? "പ്രാദേശിക കൂട്ടായ്മകൾ" : "Local Initiatives"}
                  </h3>
                  <p className="text-[11px] text-[#5C6A64]">
                    {language === "ml" ? "ശുചിത്വ യജ്ഞങ്ങൾ, മരം നടീൽ കാമ്പയിനുകൾ" : "Volunteer drives and civic actions"}
                  </p>
                </div>
              </div>

              <Link
                href="/peoples-voice/initiatives"
                className="text-xs font-bold text-[#194B35] hover:underline flex items-center gap-0.5"
              >
                <span>{language === "ml" ? "എല്ലാം" : "View All"}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {initiatives.slice(0, 3).map((init) => (
                <div
                  key={init.id}
                  className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] flex flex-col justify-between space-y-2"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-[#5C6A64] mb-1">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold text-[10px] border border-emerald-200">
                        {init.category_name}
                      </span>
                      <span className="flex items-center gap-1 font-medium text-[#194B35]">
                        <Calendar className="w-3 h-3 text-[#C39A5B]" />
                        {init.event_date}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-[#194B35] font-malayalam-heading mb-1">
                      {language === "ml" && init.title_ml ? init.title_ml : init.title}
                    </h4>

                    <p className="text-xs text-[#5C6A64] line-clamp-2">
                      {init.description}
                    </p>

                    <div className="flex items-center gap-1.5 text-[11px] text-[#5C6A64] pt-1">
                      <MapPin className="w-3 h-3 text-[#C39A5B] shrink-0" />
                      <span className="truncate">{init.venue_address}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-200 text-xs">
                    <span className="text-[11px] text-[#5C6A64]">
                      {init.participant_count} {language === "ml" ? "പങ്കാളികൾ" : "registered"}
                    </span>

                    <Link
                      href={`/peoples-voice/initiatives#${init.id}`}
                      className="px-3 py-1 rounded-xl bg-[#194B35] text-white text-xs font-bold hover:bg-[#123626] transition shadow-2xs"
                    >
                      {language === "ml" ? "പങ്കാളിയാകാം" : "Join Drive"}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 6. HOW PARTICIPATION WORKS BANNER                                         */}
        {/* ========================================================================= */}
        <div className="bg-[#194B35] rounded-3xl sm:rounded-[36px] p-6 sm:p-10 text-white relative overflow-hidden shadow-sm">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-amber-300 border border-white/20">
              {language === "ml" ? "എങ്ങനെ പ്രവർത്തിക്കുന്നു?" : "How Participation Works"}
            </span>

            <h2 className="text-xl sm:text-3xl font-black font-malayalam-heading leading-snug">
              {language === "ml"
                ? "നിങ്ങളുടെ ആശയം താനൂരിന്റെ വികസനത്തിന് വഴികാട്ടിയാകാം"
                : "Your Idea Can Shape Tanur's Community Future"}
            </h2>

            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              {language === "ml"
                ? "നിങ്ങൾ സമർപ്പിക്കുന്ന ഓരോ ആശയവും താനൂർ നിവാസികളുടെ ചർച്ചയ്ക്കും പിന്തുണയ്ക്കും വിധേയമാകുന്നു. കൂടുതൽ പൊതുതാത്പര്യമുള്ളവ പ്രാദേശിക ക്ലബ്ബുകൾ, റസിഡന്റ്സ് അസോസിയേഷനുകൾ, അല്ലെങ്കിൽ ബന്ധപ്പെട്ട അധികാരികൾ എന്നിവരിലേക്ക് സമർപ്പിക്കപ്പെടും."
                : "Every idea submitted is open to resident discussion. High-impact proposals are adopted for community collaboration by voluntary organizations or formally forwarded to relevant public agencies."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-1">
                <span className="w-7 h-7 rounded-full bg-[#C39A5B] text-[#194B35] font-black flex items-center justify-center text-xs">
                  1
                </span>
                <h4 className="font-bold text-xs sm:text-sm font-malayalam-heading">
                  {language === "ml" ? "1. ആശയം സമർപ്പിക്കുക" : "1. Submit Idea"}
                </h4>
                <p className="text-[11px] text-white/70">
                  {language === "ml" ? "വിശദാംശങ്ങളും പ്രതീക്ഷിക്കുന്ന നേട്ടങ്ങളും പങ്കുവെക്കുക." : "Detail problem, proposal, and expected local benefits."}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-1">
                <span className="w-7 h-7 rounded-full bg-[#C39A5B] text-[#194B35] font-black flex items-center justify-center text-xs">
                  2
                </span>
                <h4 className="font-bold text-xs sm:text-sm font-malayalam-heading">
                  {language === "ml" ? "2. പൊതു പിന്തുണ" : "2. Community Support"}
                </h4>
                <p className="text-[11px] text-white/70">
                  {language === "ml" ? "നാട്ടുകാരുടെ പിന്തുണ നേടുകയും ചർച്ചകളിൽ പങ്കെടുക്കുകയും ചെയ്യുക." : "Gather resident supports and refine through dialogue."}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-1">
                <span className="w-7 h-7 rounded-full bg-[#C39A5B] text-[#194B35] font-black flex items-center justify-center text-xs">
                  3
                </span>
                <h4 className="font-bold text-xs sm:text-sm font-malayalam-heading">
                  {language === "ml" ? "3. സഹകരണവും നടപടിയും" : "3. Action & Collaboration"}
                </h4>
                <p className="text-[11px] text-white/70">
                  {language === "ml" ? "കൂട്ടായ്മകളിലൂടെ നടപ്പാക്കുകയോ അധികൃതരുടെ ശ്രദ്ധയിൽ എത്തിക്കുകയോ ചെയ്യുക." : "Partner with local organizations or forward for review."}
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/peoples-voice/ideas/new"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#C39A5B] hover:bg-[#b0874a] text-[#194B35] font-bold text-xs sm:text-sm shadow transition"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{language === "ml" ? "ഇപ്പോൾ ആശയം സമർപ്പിക്കാം" : "Submit Your Idea Now"}</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
