"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { PeoplesVoiceNav } from "@/components/peoples-voice/PeoplesVoiceNav";
import { useLanguage } from "@/lib/i18n/context";
import { useAuth } from "@/lib/auth/context";
import { 
  peoplesVoiceStore, 
  PEOPLES_VOICE_DISCUSSION_CATEGORIES 
} from "@/lib/data/peoplesVoiceData";
import { 
  CommunityDiscussion, 
  DiscussionCategory,
  ReportReason 
} from "@/types/peoplesVoice";
import {
  MessageSquare,
  ThumbsUp,
  Search,
  Filter,
  PlusCircle,
  Bell,
  BellOff,
  Flag,
  Share2,
  Send,
  X,
  Sparkles,
  Tag,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default function CommunityDiscussionsPage() {
  const { language } = useLanguage();
  const { user } = useAuth();

  const [discussions, setDiscussions] = useState<CommunityDiscussion[]>(() => peoplesVoiceStore.getDiscussions());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<DiscussionCategory | "all">("all");
  const [sortBy, setSortBy] = useState<"popular" | "active" | "newest">("popular");

  // New discussion modal state
  const [isNewDiscussionOpen, setIsNewDiscussionOpen] = useState(false);
  const [discTitle, setDiscTitle] = useState("");
  const [discCategory, setDiscCategory] = useState<DiscussionCategory>("local_development");
  const [discBody, setDiscBody] = useState("");
  const [discLocality, setDiscLocality] = useState("Tanur Municipality");
  const [discTags, setDiscTags] = useState("");

  // Expanded discussion for replies
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [replyAuthor, setReplyAuthor] = useState("");

  // Report modal state
  const [reportModalData, setReportModalData] = useState<{ id: string; title: string } | null>(null);
  const [reportReason, setReportReason] = useState<ReportReason>("inappropriate");
  const [reportDetails, setReportDetails] = useState("");
  const [reportDone, setReportDone] = useState(false);

  // Filtered discussions
  const filteredDiscussions = useMemo(() => {
    return peoplesVoiceStore.getDiscussions({
      category: selectedCategory,
      search: searchTerm,
      sortBy
    });
  }, [selectedCategory, searchTerm, sortBy, discussions]);

  // Handle Create Discussion
  const handleCreateDiscussion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!discTitle.trim() || !discBody.trim()) return;

    const catObj = PEOPLES_VOICE_DISCUSSION_CATEGORIES.find(c => c.key === discCategory);
    const parsedTags = discTags.split(",").map(t => t.trim()).filter(Boolean);

    peoplesVoiceStore.addDiscussion({
      title: discTitle.trim(),
      body: discBody.trim(),
      category: discCategory,
      category_name: catObj?.label || "General",
      category_name_ml: catObj?.label_ml || "പൊതുചർച്ച",
      author_id: user?.id || "usr-" + Date.now(),
      author_name: user?.display_name || user?.username || "Tanur Resident",
      locality: discLocality,
      tags: parsedTags.length > 0 ? parsedTags : ["Tanur", "Community"]
    });

    setDiscussions(peoplesVoiceStore.getDiscussions({
      category: selectedCategory,
      search: searchTerm,
      sortBy
    }));

    setIsNewDiscussionOpen(false);
    setDiscTitle("");
    setDiscBody("");
    setDiscTags("");
  };

  // Handle Like
  const handleLike = (id: string) => {
    const userId = user?.id || "usr-anon-local";
    peoplesVoiceStore.toggleDiscussionLike(id, userId);
    setDiscussions(peoplesVoiceStore.getDiscussions({
      category: selectedCategory,
      search: searchTerm,
      sortBy
    }));
  };

  // Handle Follow
  const handleFollow = (id: string) => {
    const userId = user?.id || "usr-anon-local";
    peoplesVoiceStore.toggleDiscussionFollow(id, userId);
    setDiscussions(peoplesVoiceStore.getDiscussions({
      category: selectedCategory,
      search: searchTerm,
      sortBy
    }));
  };

  // Handle Add Reply
  const handleAddReply = (discussionId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    peoplesVoiceStore.addDiscussionComment(discussionId, {
      author_id: user?.id || "usr-" + Date.now(),
      author_name: replyAuthor.trim() || user?.display_name || user?.username || "Tanur Resident",
      content: replyText.trim(),
      is_official: user?.role === "admin" || user?.role === "moderator",
      official_role: user?.role === "admin" ? "Platform Admin" : user?.role === "moderator" ? "Civic Moderator" : undefined
    });

    setDiscussions(peoplesVoiceStore.getDiscussions({
      category: selectedCategory,
      search: searchTerm,
      sortBy
    }));
    setReplyText("");
  };

  // Handle Report
  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportModalData || !reportDetails.trim()) return;

    peoplesVoiceStore.reportContent({
      content_type: "discussion",
      content_id: reportModalData.id,
      content_title: reportModalData.title,
      reporter_id: user?.id || "anon-reporter",
      reporter_name: user?.display_name || user?.username || "Resident",
      reason: reportReason,
      details: reportDetails.trim()
    });

    setReportDone(true);
    setTimeout(() => {
      setReportDone(false);
      setReportModalData(null);
      setReportDetails("");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#252A25] pb-24">
      <Navbar />
      <PeoplesVoiceNav />

      {/* Header */}
      <section className="bg-gradient-to-b from-[#FAF4E6] to-[#FAF7F0] border-b border-[#EDE6D8] pt-8 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2 text-xs text-[#5C6A64]">
                <Link href="/peoples-voice" className="hover:text-[#194B35]">
                  {language === "ml" ? "ജനകീയ ശബ്ദം" : "People's Voice"}
                </Link>
                <span>/</span>
                <span className="font-bold text-[#194B35]">
                  {language === "ml" ? "ജനകീയ ചർച്ചകൾ" : "Civic Discussions"}
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#194B35] font-serif">
                {language === "ml" ? "താനൂർ ജനകീയ ചർച്ചാവേദി" : "Tanur Civic Discussions"}
              </h1>
              <p className="text-xs sm:text-sm text-[#5C6A64] mt-1">
                {language === "ml"
                  ? "പ്രാദേശിക വികസനം, പരിസ്ഥിതി, വിദ്യാഭ്യാസം, പൊതുസൗകര്യങ്ങൾ തുടങ്ങിയ വിഷയങ്ങളിൽ ക്രിയാത്മകമായി സംവദിക്കാം."
                  : "Engage in constructive public dialogue on local development, green spaces, education, and municipal improvements."}
              </p>
            </div>

            <button
              onClick={() => setIsNewDiscussionOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#194B35] text-white font-bold text-sm shadow hover:bg-[#143E2C] transition shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{language === "ml" ? "പുതിയ ചർച്ച ആരംഭിക്കാം" : "Start New Discussion"}</span>
            </button>
          </div>

          {/* Search bar & Category filter */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C9A94]" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={
                  language === "ml"
                    ? "വിഷയങ്ങൾ, ടാഗുകൾ, ചർച്ചകൾ തിരയുക..."
                    : "Search discussion topics, tags, or questions..."
                }
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-[#DDD3BF] text-sm text-[#252A25] focus:outline-none focus:ring-2 focus:ring-[#194B35] shadow-sm"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as DiscussionCategory | "all")}
              aria-label={language === "ml" ? "വിഭാഗം തിരഞ്ഞെടുക്കുക" : "Select Category"}
              className="px-4 py-3 rounded-2xl bg-white border border-[#DDD3BF] text-xs font-semibold text-[#194B35] focus:outline-none focus:ring-2 focus:ring-[#194B35] shadow-sm"
            >
              <option value="all">{language === "ml" ? "എല്ലാ വിഷയങ്ങളും" : "All Discussion Topics"}</option>
              {PEOPLES_VOICE_DISCUSSION_CATEGORIES.map((c) => (
                <option key={c.key} value={c.key}>
                  {language === "ml" ? c.label_ml : c.label}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "popular" | "active" | "newest")}
              aria-label={language === "ml" ? "ക്രമപ്പെടുത്തുക" : "Sort By"}
              className="px-4 py-3 rounded-2xl bg-white border border-[#DDD3BF] text-xs font-semibold text-[#194B35] focus:outline-none focus:ring-2 focus:ring-[#194B35] shadow-sm"
            >
              <option value="popular">{language === "ml" ? "കൂടുതൽ ലൈക്കുകൾ" : "Most Liked"}</option>
              <option value="active">{language === "ml" ? "കൂടുതൽ മറുപടികൾ" : "Most Active"}</option>
              <option value="newest">{language === "ml" ? "ഏറ്റവും പുതിയത്" : "Newest"}</option>
            </select>
          </div>
        </div>
      </section>

      {/* Discussions Feed */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex items-center justify-between text-xs text-[#5C6A64] mb-4">
          <span className="font-semibold text-[#194B35]">
            {filteredDiscussions.length} {language === "ml" ? "ചർച്ചകൾ കണ്ടെത്തി" : "discussions found"}
          </span>
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#C39A5B]" />
            <span>{language === "ml" ? "സഭ്യതയും മര്യാദയും പാലിക്കുക" : "Constructive & Moderated Space"}</span>
          </span>
        </div>

        <div className="space-y-4">
          {filteredDiscussions.map((disc) => {
            const isExpanded = expandedId === disc.id;
            return (
              <div
                key={disc.id}
                id={disc.id}
                className="bg-white rounded-3xl border border-[#EDE6D8] p-6 shadow-sm hover:border-[#194B35]/40 transition"
              >
                {/* Meta header */}
                <div className="flex items-center justify-between text-xs text-[#5C6A64] mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 font-bold text-[10px]">
                      {disc.category_name}
                    </span>
                    {disc.locality && <span>• {disc.locality}</span>}
                  </div>
                  <span>{disc.created_at.split("T")[0]}</span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-lg sm:text-xl text-[#194B35] font-serif leading-snug mb-2">
                  {language === "ml" && disc.title_ml ? disc.title_ml : disc.title}
                </h3>

                {/* Body */}
                <p className="text-sm text-[#4A5550] leading-relaxed mb-4 whitespace-pre-line font-sans">
                  {disc.body}
                </p>

                {/* Tags */}
                {disc.tags && disc.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 mb-4">
                    {disc.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-lg bg-[#FAF7F0] text-[#5C6A64] text-[11px] border border-[#EDE6D8]"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}

                {/* Footer Controls: Like, Comment count, Follow, Report */}
                <div className="pt-3 border-t border-[#EDE6D8] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleLike(disc.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition active:scale-95 ${
                        disc.liked_by_user
                          ? "bg-blue-100 text-blue-800"
                          : "bg-[#FAF7F0] text-[#5C6A64] hover:text-[#194B35]"
                      }`}
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${disc.liked_by_user ? "fill-blue-800" : ""}`} />
                      <span>{disc.likes_count}</span>
                    </button>

                    <button
                      onClick={() => setExpandedId(isExpanded ? null : disc.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF7F0] text-[#194B35] text-xs font-bold hover:bg-[#EFE9DC] transition"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{disc.comments.length}</span>
                      <span className="hidden sm:inline">
                        {language === "ml" ? "മറുപടികൾ" : "Replies"}
                      </span>
                      {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleFollow(disc.id)}
                      className="p-2 rounded-xl text-[#5C6A64] hover:text-[#194B35] hover:bg-[#FAF7F0] text-xs"
                      title="Follow discussion"
                    >
                      {disc.is_followed_by_user ? (
                        <BellOff className="w-4 h-4 text-[#194B35]" />
                      ) : (
                        <Bell className="w-4 h-4" />
                      )}
                    </button>

                    <button
                      onClick={() => setReportModalData({ id: disc.id, title: disc.title })}
                      className="p-2 rounded-xl text-red-500 hover:bg-red-50 text-xs"
                      title="Report discussion"
                    >
                      <Flag className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Expanded Thread View & Replies */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-[#EDE6D8] space-y-4">
                    <h4 className="text-xs font-bold text-[#194B35] uppercase tracking-wider">
                      {language === "ml" ? "മറുപടികൾ & അഭിപ്രായങ്ങൾ" : "Replies in Thread"}
                    </h4>

                    {disc.comments.length === 0 ? (
                      <p className="text-xs text-[#8C9A94] italic">
                        {language === "ml" ? "ഇതുവരെ മറുപടികളില്ല. ചർച്ചയിൽ ആദ്യമായി പങ്കുചേരൂ!" : "No replies yet. Be the first to share your viewpoint!"}
                      </p>
                    ) : (
                      <div className="space-y-2.5">
                        {disc.comments.map((comm) => (
                          <div
                            key={comm.id}
                            className={`p-3.5 rounded-2xl text-xs ${
                              comm.is_official
                                ? "bg-emerald-50 border border-emerald-200"
                                : "bg-[#FAF7F0] border border-[#EDE6D8]"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-[#194B35]">{comm.author_name}</span>
                                {comm.is_official && (
                                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#194B35] text-white flex items-center gap-0.5">
                                    <ShieldCheck className="w-2.5 h-2.5" />
                                    <span>{comm.official_role || "Official"}</span>
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] text-[#8C9A94]">{comm.created_at.split("T")[0]}</span>
                            </div>
                            <p className="text-[#4A5550]">{comm.content}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Reply form */}
                    <form onSubmit={(e) => handleAddReply(disc.id, e)} className="pt-2 flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        value={replyAuthor}
                        onChange={(e) => setReplyAuthor(e.target.value)}
                        placeholder={user?.display_name || user?.username || (language === "ml" ? "പേര്" : "Your Name")}
                        className="w-full sm:w-44 px-3 py-2 rounded-xl bg-[#FAF7F0] border border-[#DDD3BF] text-xs text-[#252A25] focus:outline-none focus:ring-2 focus:ring-[#194B35]"
                      />
                      <input
                        type="text"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder={language === "ml" ? "നിങ്ങളുടെ മറുപടി ഇവിടെ എഴുതുക..." : "Write a constructive reply..."}
                        className="flex-1 px-3 py-2 rounded-xl bg-[#FAF7F0] border border-[#DDD3BF] text-xs text-[#252A25] focus:outline-none focus:ring-2 focus:ring-[#194B35]"
                        required
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-[#194B35] text-white text-xs font-bold hover:bg-[#143E2C] transition flex items-center justify-center gap-1 shrink-0"
                      >
                        <Send className="w-3 h-3" />
                        <span>{language === "ml" ? "മറുപടി നൽകാം" : "Reply"}</span>
                      </button>
                    </form>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Start New Discussion Modal */}
      {isNewDiscussionOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#EDE6D8]">
            <div className="flex items-center justify-between pb-3 border-b border-[#EDE6D8] mb-4">
              <h3 className="font-bold text-lg text-[#194B35] font-serif flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#C39A5B]" />
                <span>{language === "ml" ? "പുതിയ ജനകീയ ചർച്ച ആരംഭിക്കാം" : "Start a Community Discussion"}</span>
              </h3>
              <button
                onClick={() => setIsNewDiscussionOpen(false)}
                className="p-1 rounded-full hover:bg-stone-100 text-stone-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateDiscussion} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#194B35] mb-1">
                  {language === "ml" ? "ചർച്ചാ വിഷയം (Title) *" : "Discussion Topic *"}
                </label>
                <input
                  type="text"
                  value={discTitle}
                  onChange={(e) => setDiscTitle(e.target.value)}
                  placeholder={language === "ml" ? "ഉദാ: താനൂരിലെ സ്കൂളുകൾക്കായി സുരക്ഷിത യാത്രാ സൗകര്യം..." : "e.g., Safe commute options for schoolchildren in Tanur..."}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#FAF7F0] border border-[#DDD3BF] text-xs text-[#252A25] focus:outline-none focus:ring-2 focus:ring-[#194B35]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#194B35] mb-1">
                  {language === "ml" ? "വിഭാഗം *" : "Category *"}
                </label>
                <select
                  value={discCategory}
                  onChange={(e) => setDiscCategory(e.target.value as DiscussionCategory)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#FAF7F0] border border-[#DDD3BF] text-xs font-semibold text-[#194B35] focus:outline-none focus:ring-2 focus:ring-[#194B35]"
                >
                  {PEOPLES_VOICE_DISCUSSION_CATEGORIES.map((c) => (
                    <option key={c.key} value={c.key}>
                      {language === "ml" ? c.label_ml : c.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#194B35] mb-1">
                  {language === "ml" ? "വിശദമായ കുറിപ്പ് / ചോദ്യം *" : "Discussion Body / Context *"}
                </label>
                <textarea
                  rows={4}
                  value={discBody}
                  onChange={(e) => setDiscBody(e.target.value)}
                  placeholder={language === "ml" ? "വിഷയത്തെക്കുറിച്ചുള്ള നിങ്ങളുടെ കാഴ്ച്ചപ്പാടും ചോദ്യങ്ങളും വിശദീകരിക്കുക..." : "Explain the background, current situation, and questions for the community..."}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF7F0] border border-[#DDD3BF] text-xs text-[#252A25] focus:outline-none focus:ring-2 focus:ring-[#194B35]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#5C6A64] mb-1">
                  {language === "ml" ? "ടാഗുകൾ (Comma separated)" : "Tags (Comma separated)"}
                </label>
                <input
                  type="text"
                  value={discTags}
                  onChange={(e) => setDiscTags(e.target.value)}
                  placeholder="Traffic, Schools, Safety, Tanur"
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF7F0] border border-[#DDD3BF] text-xs text-[#252A25] focus:outline-none focus:ring-2 focus:ring-[#194B35]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#EDE6D8]">
                <button
                  type="button"
                  onClick={() => setIsNewDiscussionOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#EDE6D8] text-[#194B35] text-xs font-bold"
                >
                  {language === "ml" ? "റദ്ദാക്കുക" : "Cancel"}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#194B35] text-white text-xs font-bold hover:bg-[#143E2C] transition shadow"
                >
                  {language === "ml" ? "ചർച്ച പ്രസിദ്ധീകരിക്കാം" : "Publish Discussion"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {reportModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#EDE6D8]">
            <div className="flex items-center justify-between pb-3 border-b border-[#EDE6D8] mb-4">
              <h3 className="font-bold text-base text-[#194B35] flex items-center gap-2">
                <Flag className="w-4 h-4 text-red-600" />
                <span>{language === "ml" ? "ചർച്ച റിപ്പോർട്ട് ചെയ്യാം" : "Report Discussion"}</span>
              </h3>
              <button
                onClick={() => setReportModalData(null)}
                className="p-1 rounded-full hover:bg-stone-100 text-stone-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {reportDone ? (
              <div className="p-6 text-center text-xs text-emerald-800">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                <p className="font-bold text-sm mb-1">{language === "ml" ? "റിപ്പോർട്ട് സമർപ്പിച്ചു" : "Report Submitted"}</p>
                <p>{language === "ml" ? "മോഡറേറ്റർമാർ ഉടൻ പരിശോധിക്കും." : "Our team will review this discussion shortly."}</p>
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#194B35] mb-1">
                    {language === "ml" ? "കാരണം *" : "Reason *"}
                  </label>
                  <select
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value as ReportReason)}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F0] border border-[#DDD3BF] text-xs font-semibold text-[#194B35]"
                  >
                    <option value="spam">Spam / Commercial Ads</option>
                    <option value="offensive">Offensive or Abusive</option>
                    <option value="misleading">Misleading Information</option>
                    <option value="inappropriate">Inappropriate for Community</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#194B35] mb-1">
                    {language === "ml" ? "വിശദാംശങ്ങൾ *" : "Details *"}
                  </label>
                  <textarea
                    rows={3}
                    value={reportDetails}
                    onChange={(e) => setReportDetails(e.target.value)}
                    placeholder="Provide details..."
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F0] border border-[#DDD3BF] text-xs"
                    required
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setReportModalData(null)}
                    className="px-4 py-2 rounded-xl bg-[#EDE6D8] text-[#194B35] text-xs font-bold"
                  >
                    {language === "ml" ? "റദ്ദാക്കുക" : "Cancel"}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700"
                  >
                    {language === "ml" ? "റിപ്പോർട്ട് നൽകാം" : "Submit"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer />
      <BottomNav />
    </div>
  );
}
