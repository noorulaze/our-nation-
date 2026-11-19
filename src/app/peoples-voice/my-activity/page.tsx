"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { PeoplesVoiceNav } from "@/components/peoples-voice/PeoplesVoiceNav";
import { useLanguage } from "@/lib/i18n/context";
import { useAuth } from "@/lib/auth/context";
import { peoplesVoiceStore } from "@/lib/data/peoplesVoiceData";
import {
  UserCheck,
  Lightbulb,
  ThumbsUp,
  MessageSquare,
  Users,
  Calendar,
  MapPin,
  ChevronRight,
  PlusCircle,
  Clock,
  Sparkles,
  ArrowRight
} from "lucide-react";

export default function MyActivityPage() {
  const { language } = useLanguage();
  const { user } = useAuth();

  const userId = user?.id || "usr-001";
  const [activeTab, setActiveTab] = useState<"submitted" | "supported" | "comments" | "discussions" | "initiatives">("submitted");

  const activity = peoplesVoiceStore.getUserActivity(userId);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "In Progress":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "Accepted for Collaboration":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "Forwarded for Consideration":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "Shortlisted":
        return "bg-indigo-100 text-indigo-800 border-indigo-300";
      case "Community Discussion":
        return "bg-cyan-100 text-cyan-800 border-cyan-300";
      case "Under Review":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      default:
        return "bg-stone-100 text-stone-800 border-stone-300";
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#252A25] pb-24">
      <Navbar />
      <PeoplesVoiceNav />

      {/* Header */}
      <section className="bg-gradient-to-b from-[#FAF4E6] to-[#FAF7F0] border-b border-[#EDE6D8] pt-8 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2 text-xs text-[#5C6A64]">
                <Link href="/peoples-voice" className="hover:text-[#194B35]">
                  {language === "ml" ? "ജനകീയ ശബ്ദം" : "People's Voice"}
                </Link>
                <span>/</span>
                <span className="font-bold text-[#194B35]">
                  {language === "ml" ? "എന്റെ പങ്കാളിത്തം" : "My Participation History"}
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#194B35] font-serif">
                {language === "ml" ? "എന്റെ പങ്കാളിത്ത ചരിത്രം" : "My Participation Dashboard"}
              </h1>
              <p className="text-xs sm:text-sm text-[#5C6A64] mt-1">
                {language === "ml"
                  ? "നിങ്ങൾ സമർപ്പിച്ച ആശയങ്ങൾ, നൽകിയ പിന്തുണകൾ, പങ്കെടുത്ത ചർച്ചകൾ, കൂട്ടായ്മകൾ."
                  : "Track all your submitted ideas, endorsed proposals, followed discussions, and registered community drives."}
              </p>
            </div>

            <Link
              href="/peoples-voice/ideas/new"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#194B35] text-white font-bold text-sm shadow hover:bg-[#143E2C] transition shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{language === "ml" ? "പുതിയ ആശയം സമർപ്പിക്കാം" : "Submit New Idea"}</span>
            </Link>
          </div>

          {/* User badge */}
          <div className="mt-6 p-4 rounded-2xl bg-white border border-[#EDE6D8] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#194B35] text-white font-bold flex items-center justify-center text-sm">
                {(user?.display_name || user?.username || "R")[0].toUpperCase()}
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#194B35]">
                  {user?.display_name || user?.username || "Tanur Resident"}
                </h4>
                <p className="text-[11px] text-[#5C6A64]">
                  {user?.locality || "Tanur Municipality"} • {user?.role || "Citizen"}
                </p>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-[#EDE6D8] text-[#194B35] text-xs font-bold">
              {language === "ml" ? "സജീവ പൗര പങ്കാളി" : "Active Citizen Contributor"}
            </span>
          </div>
        </div>
      </section>

      {/* Main Tabs & Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6 border-b border-[#EDE6D8]">
          <button
            onClick={() => setActiveTab("submitted")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition shrink-0 ${
              activeTab === "submitted"
                ? "bg-[#194B35] text-white shadow-sm"
                : "bg-white text-[#5C6A64] hover:text-[#194B35] border border-[#EDE6D8]"
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>{language === "ml" ? "ഞാൻ സമർപ്പിച്ച ആശയങ്ങൾ" : "My Ideas"}</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-black/10">
              {activity.submittedIdeas.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("supported")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition shrink-0 ${
              activeTab === "supported"
                ? "bg-[#194B35] text-white shadow-sm"
                : "bg-white text-[#5C6A64] hover:text-[#194B35] border border-[#EDE6D8]"
            }`}
          >
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>{language === "ml" ? "ഞാൻ പിന്തുണച്ചവ" : "Ideas I Support"}</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-black/10">
              {activity.supportedIdeas.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("comments")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition shrink-0 ${
              activeTab === "comments"
                ? "bg-[#194B35] text-white shadow-sm"
                : "bg-white text-[#5C6A64] hover:text-[#194B35] border border-[#EDE6D8]"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{language === "ml" ? "എന്റെ അഭിപ്രായങ്ങൾ" : "My Comments"}</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-black/10">
              {activity.myComments.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("discussions")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition shrink-0 ${
              activeTab === "discussions"
                ? "bg-[#194B35] text-white shadow-sm"
                : "bg-white text-[#5C6A64] hover:text-[#194B35] border border-[#EDE6D8]"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
            <span>{language === "ml" ? "ഫോളോ ചെയ്യുന്ന ചർച്ചകൾ" : "Followed Discussions"}</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-black/10">
              {activity.followedDiscussions.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("initiatives")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition shrink-0 ${
              activeTab === "initiatives"
                ? "bg-[#194B35] text-white shadow-sm"
                : "bg-white text-[#5C6A64] hover:text-[#194B35] border border-[#EDE6D8]"
            }`}
          >
            <Users className="w-3.5 h-3.5 text-purple-600" />
            <span>{language === "ml" ? "പങ്കെടുക്കുന്ന കൂട്ടായ്മകൾ" : "Joined Initiatives"}</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-black/10">
              {activity.joinedInitiatives.length}
            </span>
          </button>
        </div>

        {/* Tab 1: Submitted Ideas */}
        {activeTab === "submitted" && (
          <div>
            {activity.submittedIdeas.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-[#EDE6D8]">
                <Lightbulb className="w-10 h-10 text-[#C39A5B] mx-auto mb-2 opacity-50" />
                <h3 className="font-bold text-base text-[#194B35] mb-1 font-serif">
                  {language === "ml" ? "നിങ്ങൾ ഇതുവരെ ആശയങ്ങൾ സമർപ്പിച്ചിട്ടില്ല" : "No Ideas Submitted Yet"}
                </h3>
                <p className="text-xs text-[#5C6A64] mb-4">
                  {language === "ml" ? "താനൂരിന്റെ നന്മയ്ക്കായി നിങ്ങളുടെ ആദ്യത്തെ ആശയം ഇവിടെ പങ്കുവെക്കൂ." : "Submit your first constructive idea to make a difference in Tanur."}
                </p>
                <Link
                  href="/peoples-voice/ideas/new"
                  className="px-4 py-2 rounded-xl bg-[#194B35] text-white text-xs font-bold"
                >
                  {language === "ml" ? "ആശയം സമർപ്പിക്കാം" : "Submit an Idea"}
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activity.submittedIdeas.map((idea) => (
                  <div key={idea.id} className="bg-white rounded-2xl border border-[#EDE6D8] p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-[#5C6A64] mb-2">
                        <span className="font-bold text-[#194B35]">{idea.tracking_id}</span>
                        <span className={`px-2 py-0.5 rounded-full font-bold border ${getStatusBadge(idea.status)}`}>
                          {idea.status}
                        </span>
                      </div>
                      <Link href={`/peoples-voice/ideas/${idea.id}`}>
                        <h4 className="font-bold text-sm sm:text-base text-[#194B35] font-serif mb-2 line-clamp-2 hover:text-[#C39A5B]">
                          {language === "ml" && idea.title_ml ? idea.title_ml : idea.title}
                        </h4>
                      </Link>
                      <p className="text-xs text-[#5C6A64] line-clamp-2 mb-3">
                        {idea.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#EDE6D8] flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1 text-[#194B35] font-bold">
                        <ThumbsUp className="w-3.5 h-3.5" /> {idea.support_count}
                      </span>
                      <Link
                        href={`/peoples-voice/ideas/${idea.id}`}
                        className="text-xs font-bold text-[#194B35] flex items-center gap-0.5 hover:text-[#C39A5B]"
                      >
                        <span>{language === "ml" ? "വിശദാംശങ്ങൾ" : "View"}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Ideas I Support */}
        {activeTab === "supported" && (
          <div>
            {activity.supportedIdeas.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-[#EDE6D8]">
                <ThumbsUp className="w-10 h-10 text-[#C39A5B] mx-auto mb-2 opacity-50" />
                <h3 className="font-bold text-base text-[#194B35] mb-1 font-serif">
                  {language === "ml" ? "നിങ്ങൾ ഇതുവരെ ആശയങ്ങൾ പിന്തുണച്ചിട്ടില്ല" : "No Supported Ideas Yet"}
                </h3>
                <p className="text-xs text-[#5C6A64] mb-4">
                  {language === "ml" ? "നാട്ടുകാരുടെ നല്ല നിർദ്ദേശങ്ങൾ കണ്ട് അവയ്ക്ക് നിങ്ങളുടെ പിന്തുണ അറിയിക്കൂ." : "Browse community ideas and support the ones you care about."}
                </p>
                <Link
                  href="/peoples-voice/ideas"
                  className="px-4 py-2 rounded-xl bg-[#194B35] text-white text-xs font-bold"
                >
                  {language === "ml" ? "ആശയങ്ങൾ കാണുക" : "Browse Ideas"}
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activity.supportedIdeas.map((idea) => (
                  <div key={idea.id} className="bg-white rounded-2xl border border-[#EDE6D8] p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-[#5C6A64] mb-2">
                        <span className="font-bold text-[#194B35]">{idea.tracking_id}</span>
                        <span className={`px-2 py-0.5 rounded-full font-bold border ${getStatusBadge(idea.status)}`}>
                          {idea.status}
                        </span>
                      </div>
                      <Link href={`/peoples-voice/ideas/${idea.id}`}>
                        <h4 className="font-bold text-sm sm:text-base text-[#194B35] font-serif mb-2 line-clamp-2 hover:text-[#C39A5B]">
                          {language === "ml" && idea.title_ml ? idea.title_ml : idea.title}
                        </h4>
                      </Link>
                      <p className="text-xs text-[#5C6A64] line-clamp-2 mb-3">
                        {idea.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#EDE6D8] flex items-center justify-between text-xs">
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <ThumbsUp className="w-3.5 h-3.5 fill-emerald-700" />
                        <span>{language === "ml" ? "പിന്തുണ നൽകി" : "Supported"}</span>
                      </span>
                      <Link
                        href={`/peoples-voice/ideas/${idea.id}`}
                        className="text-xs font-bold text-[#194B35] flex items-center gap-0.5 hover:text-[#C39A5B]"
                      >
                        <span>{language === "ml" ? "വിശദാംശങ്ങൾ" : "View"}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: My Comments */}
        {activeTab === "comments" && (
          <div className="space-y-3">
            {activity.myComments.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-[#EDE6D8]">
                <MessageSquare className="w-10 h-10 text-[#C39A5B] mx-auto mb-2 opacity-50" />
                <h3 className="font-bold text-base text-[#194B35] mb-1 font-serif">
                  {language === "ml" ? "ഇതുവരെ അഭിപ്രായങ്ങൾ രേഖപ്പെടുത്തിയിട്ടില്ല" : "No Comments Recorded Yet"}
                </h3>
              </div>
            ) : (
              activity.myComments.map((comm, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white border border-[#EDE6D8]">
                  <div className="flex items-center justify-between text-xs text-[#5C6A64] mb-1.5">
                    <span className="font-bold text-[#194B35]">
                      {language === "ml" ? "വിഷയം: " : "On: "} {comm.targetTitle}
                    </span>
                    <span>{comm.date.split("T")[0]}</span>
                  </div>
                  <p className="text-xs text-[#4A5550] mb-2">{comm.content}</p>
                  <Link
                    href={comm.url}
                    className="text-xs font-bold text-[#194B35] hover:text-[#C39A5B] flex items-center gap-1"
                  >
                    <span>{language === "ml" ? "ആശയത്തിലേക്ക് പോകാം" : "Go to Thread"}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 4: Followed Discussions */}
        {activeTab === "discussions" && (
          <div className="space-y-3">
            {activity.followedDiscussions.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-[#EDE6D8]">
                <MessageSquare className="w-10 h-10 text-blue-500 mx-auto mb-2 opacity-50" />
                <h3 className="font-bold text-base text-[#194B35] mb-1 font-serif">
                  {language === "ml" ? "ചർച്ചകൾ ഒന്നും ഫോളോ ചെയ്യുന്നില്ല" : "No Discussions Followed"}
                </h3>
                <Link
                  href="/peoples-voice/discussions"
                  className="px-4 py-2 rounded-xl bg-[#194B35] text-white text-xs font-bold inline-block mt-3"
                >
                  {language === "ml" ? "ചർച്ചകൾ കാണുക" : "Browse Discussions"}
                </Link>
              </div>
            ) : (
              activity.followedDiscussions.map((disc) => (
                <div key={disc.id} className="p-4 rounded-2xl bg-white border border-[#EDE6D8] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded-full">
                      {disc.category_name}
                    </span>
                    <h4 className="font-bold text-sm text-[#194B35] font-serif mt-1">
                      {language === "ml" && disc.title_ml ? disc.title_ml : disc.title}
                    </h4>
                    <p className="text-xs text-[#5C6A64] mt-0.5">
                      {disc.comments.length} {language === "ml" ? "മറുപടികൾ" : "replies"}
                    </p>
                  </div>

                  <Link
                    href={`/peoples-voice/discussions#${disc.id}`}
                    className="px-3 py-1.5 rounded-xl bg-[#FAF7F0] text-[#194B35] text-xs font-bold hover:bg-[#EFE9DC]"
                  >
                    {language === "ml" ? "തുറക്കുക" : "Open"}
                  </Link>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 5: Joined Initiatives */}
        {activeTab === "initiatives" && (
          <div className="space-y-3">
            {activity.joinedInitiatives.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-[#EDE6D8]">
                <Users className="w-10 h-10 text-purple-600 mx-auto mb-2 opacity-50" />
                <h3 className="font-bold text-base text-[#194B35] mb-1 font-serif">
                  {language === "ml" ? "കൂട്ടായ്മകളിൽ ഒന്നും പങ്കെടുത്തിട്ടില്ല" : "No Initiatives Joined"}
                </h3>
                <Link
                  href="/peoples-voice/initiatives"
                  className="px-4 py-2 rounded-xl bg-[#194B35] text-white text-xs font-bold inline-block mt-3"
                >
                  {language === "ml" ? "കൂട്ടായ്മകൾ കാണുക" : "Explore Initiatives"}
                </Link>
              </div>
            ) : (
              activity.joinedInitiatives.map((init) => (
                <div key={init.id} className="p-4 rounded-2xl bg-white border border-[#EDE6D8] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                      {init.category_name}
                    </span>
                    <h4 className="font-bold text-sm text-[#194B35] font-serif mt-1">
                      {language === "ml" && init.title_ml ? init.title_ml : init.title}
                    </h4>
                    <p className="text-xs text-[#5C6A64] mt-0.5 flex items-center gap-2">
                      <Calendar className="w-3 h-3 text-[#C39A5B]" /> {init.event_date} ({init.event_time})
                    </p>
                  </div>

                  <Link
                    href={`/peoples-voice/initiatives#${init.id}`}
                    className="px-3 py-1.5 rounded-xl bg-[#194B35] text-white text-xs font-bold hover:bg-[#143E2C]"
                  >
                    {language === "ml" ? "വിവരങ്ങൾ" : "Details"}
                  </Link>
                </div>
              ))
            )}
          </div>
        )}
      </section>

      <Footer />
      <BottomNav />
    </div>
  );
}
