"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { useLanguage } from "@/lib/i18n/context";
import { useCommunity } from "@/lib/community/context";
import { useAuth } from "@/lib/auth/context";
import { store } from "@/lib/data/store";
import { Post, Comment, IssueReport, IssueStatus } from "@/types/database";
import { 
  Heart, 
  MessageSquare, 
  Share2, 
  Send, 
  Trash2, 
  Pin, 
  Flag, 
  Sparkles, 
  Image as ImageIcon, 
  MapPin, 
  CheckCircle2, 
  UserPlus, 
  UserMinus,
  AlertCircle,
  AlertTriangle,
  X,
  ExternalLink,
  Clock,
  PlusCircle,
  Megaphone,
  Check,
  ChevronRight
} from "lucide-react";

function CommunityContent() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get("tab") as "feed" | "civic" | "announcements") || "feed";

  const { t, language } = useLanguage();
  const { currentCommunity } = useCommunity();
  const { user, role } = useAuth();

  const [activeTab, setActiveTab] = useState<"feed" | "civic" | "announcements">(initialTab);
  const [civicFilter, setCivicFilter] = useState<"all" | IssueStatus>("all");

  // Feed State
  const [posts, setPosts] = useState<Post[]>(() => store.getPosts(currentCommunity?.id));
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostImage, setNewPostImage] = useState("");
  const [showImageInput, setShowImageInput] = useState(false);
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState("");
  const [isJoined, setIsJoined] = useState(true);
  const [reportModalPost, setReportModalPost] = useState<Post | null>(null);
  const [reportReason, setReportReason] = useState("");
  const [reportSuccess, setReportSuccess] = useState(false);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  // Civic Issues
  const [issues, setIssues] = useState<IssueReport[]>(() => store.getIssueReports(currentCommunity?.id));
  const announcements = store.getAnnouncements(currentCommunity?.id);

  useEffect(() => {
    const tabParam = searchParams.get("tab") as "feed" | "civic" | "announcements" | null;
    if (tabParam && ["feed", "civic", "announcements"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim() || !user) return;

    const created = store.createPost({
      community_id: currentCommunity?.id || "40000000-0000-0000-0000-000000000007",
      author_id: user.id,
      content: newPostContent.trim(),
      media_urls: newPostImage.trim() ? [newPostImage.trim()] : [],
    });

    setPosts([created, ...posts]);
    setNewPostContent("");
    setNewPostImage("");
    setShowImageInput(false);
  };

  const handleDeletePost = (postId: string) => {
    if (!user) return;
    const ok = store.deletePost(postId, user.id);
    if (ok) {
      setPosts(posts.filter((p) => p.id !== postId));
    }
  };

  const handleToggleLike = (postId: string) => {
    const isCurrentlyLiked = likedPosts[postId] || false;
    setLikedPosts({
      ...likedPosts,
      [postId]: !isCurrentlyLiked,
    });
    setPosts(
      posts.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            likes_count: isCurrentlyLiked ? Math.max(0, p.likes_count - 1) : p.likes_count + 1,
          };
        }
        return p;
      })
    );
  };

  const handleAddComment = (postId: string) => {
    if (!commentInput.trim() || !user) return;
    store.createComment(postId, user.id, commentInput.trim());
    setCommentInput("");
    setPosts(store.getPosts(currentCommunity?.id));
  };

  const handleReportPost = () => {
    if (!reportModalPost || !reportReason.trim() || !user) return;
    store.addAuditLog(user.id, "REPORT_CONTENT", "post", reportModalPost.id, { reason: reportReason });
    setReportSuccess(true);
    setTimeout(() => {
      setReportModalPost(null);
      setReportReason("");
      setReportSuccess(false);
    }, 1500);
  };

  // Filtered Issues
  const filteredIssues = issues.filter(iss => {
    if (civicFilter === "all") return true;
    return iss.status === civicFilter;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: language === "ml" ? "ഹോം" : "Home", href: "/" },
            { label: language === "ml" ? "കമ്മ്യൂണിറ്റി (Community)" : "Community" },
          ]}
        />

        {/* Community Header Banner */}
        <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-[#1B4D36] uppercase tracking-wider bg-[#E0F1E7] px-2.5 py-0.5 rounded-full border border-[#BDE3CE]">
                {currentCommunity?.type || "Locality"}
              </span>
              <span className="text-xs text-[#5C6A64]">
                {currentCommunity?.district || "Malappuram"} • Kerala
              </span>
            </div>
            <h1 className="text-2xl font-bold font-malayalam-serif text-[#1B4D36]">
              {currentCommunity ? (language === "ml" ? currentCommunity.name_ml : currentCommunity.name) : "താനൂർ കമ്മ്യൂണിറ്റി"}
            </h1>
            <p className="text-xs text-[#5C6A64] max-w-xl font-malayalam-body">
              {language === "ml"
                ? "നാട്ടിലെ സൗഹൃദ ചർച്ചകൾ, പൗര പ്രശ്നങ്ങൾ, ഔദ്യോഗിക അറിയിപ്പുകൾ — എല്ലാം പരസ്പരം പങ്കുവെക്കാനുള്ള പബ്ലിക് പ്ലാറ്റ്‌ഫോം."
                : "The verified local public square for residents, civic issues, discussions and official updates."}
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-center">
            <Link
              href="/create?type=issue"
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#FAF4E6] text-[#8C5B0F] border border-[#DDD5C5] hover:bg-[#F3EFE6] transition flex items-center gap-1.5 shadow-xs"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{language === "ml" ? "പ്രശ്നം റിപ്പോർട്ട് ചെയ്യൂ" : "Report Issue"}</span>
            </Link>

            <button
              onClick={() => setIsJoined(!isJoined)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition active:scale-95 shadow-xs ${
                isJoined
                  ? "bg-[#F3EFE6] text-[#5C6A64] hover:bg-red-50 hover:text-red-700 border border-[#DDD5C5]"
                  : "bg-[#1B4D36] hover:bg-[#133A28] text-white"
              }`}
            >
              {isJoined ? (
                <>
                  <UserMinus className="w-3.5 h-3.5" />
                  <span>{language === "ml" ? "അംഗത്വം" : "Joined"}</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>{language === "ml" ? "ചേരുക" : "Join"}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 3 PROGRESSIVE TABS */}
        <div className="flex items-center gap-2 border-b border-[#EAE4D7] pb-2 overflow-x-auto">
          {[
            { id: "feed", label: language === "ml" ? "കമ്മ്യൂണിറ്റി ഫീഡ് (Feed)" : "Community Feed", count: posts.length, icon: MessageSquare },
            { id: "civic", label: language === "ml" ? "പൗര പ്രശ്നങ്ങൾ (Civic Connect)" : "Civic Issues", count: issues.length, icon: AlertTriangle },
            { id: "announcements", label: language === "ml" ? "ഔദ്യോഗിക അറിയിപ്പുകൾ (Notices)" : "Announcements", count: announcements.length, icon: Megaphone },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  isSelected
                    ? "bg-[#1B4D36] text-white shadow-xs"
                    : "text-[#5C6A64] hover:bg-[#F3EFE6] hover:text-[#1A2420]"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? "bg-white/20 text-white" : "bg-[#EFE9DC] text-[#7A8880]"}`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ============================================================== */}
        {/* TAB 1: COMMUNITY FEED */}
        {/* ============================================================== */}
        {activeTab === "feed" && (
          <div className="space-y-6">
            
            {/* Create Post Box */}
            <div className="bg-white rounded-3xl border border-[#EAE4D7] p-5 sm:p-6 shadow-card">
              <form onSubmit={handleCreatePost}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#E5DDD0] text-[#1B4D36] font-bold flex items-center justify-center text-sm shrink-0">
                    {user?.display_name ? user.display_name.charAt(0) : "U"}
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      placeholder={language === "ml" ? "നിങ്ങളുടെ പ്രദേശത്തെ വിശേഷങ്ങളും വാർത്തകളും പങ്കുവെക്കൂ..." : "Share local updates, questions or community news..."}
                      rows={3}
                      className="w-full text-xs sm:text-sm rounded-2xl border border-[#DDD5C5] bg-[#FAF7F0] p-3.5 focus:outline-none focus:ring-2 focus:ring-[#1B4D36] text-[#1A2420] resize-none font-malayalam-body"
                    />

                    {showImageInput && (
                      <div className="mt-2 space-y-2">
                        <input
                          type="url"
                          value={newPostImage}
                          onChange={(e) => setNewPostImage(e.target.value)}
                          placeholder="ചിത്രത്തിന്റെ URL നൽകുക (https://...)"
                          className="w-full px-3 py-2 text-xs rounded-xl border border-[#DDD5C5] bg-white focus:outline-none focus:ring-1 focus:ring-[#1B4D36] text-[#1A2420]"
                        />
                        {newPostImage.trim() && (
                          <div className="h-32 w-full rounded-xl overflow-hidden border border-[#EAE4D7] relative">
                            <img src={newPostImage} alt="Preview" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => setNewPostImage("")}
                              className="absolute top-2 right-2 p-1 rounded-full bg-black/60 text-white text-xs"
                            >
                              ✕
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#F3EFE6]">
                      <button
                        type="button"
                        onClick={() => setShowImageInput(!showImageInput)}
                        className="flex items-center gap-1.5 text-xs text-[#5C6A64] hover:text-[#1B4D36] font-semibold p-1 rounded transition"
                      >
                        <ImageIcon className="w-4 h-4 text-[#1B4D36]" />
                        <span>{showImageInput ? "ചിത്രം മാറ്റുക" : "ചിത്രം ചേർക്കുക"}</span>
                      </button>

                      <button
                        type="submit"
                        disabled={!newPostContent.trim()}
                        className="px-5 py-2.5 rounded-xl bg-[#1B4D36] hover:bg-[#133A28] disabled:opacity-40 text-white font-bold text-xs transition active:scale-95 shadow-xs"
                      >
                        {language === "ml" ? "പ്രസിദ്ധീകരിക്കുക" : "Post"}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Posts List */}
            <div className="space-y-4">
              {posts.map((post) => {
                const comments = store.getComments(post.id);
                const isOwner = user?.id === post.author_id || role === "admin" || role === "moderator";
                const isLiked = likedPosts[post.id] || false;
                const isCommentsOpen = activeCommentPostId === post.id;

                return (
                  <article
                    key={post.id}
                    className="bg-white rounded-3xl border border-[#EAE4D7] p-5 sm:p-6 shadow-card hover:border-[#1B4D36]/40 transition space-y-4"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#E5DDD0] border border-[#DDD5C5] text-[#1B4D36] font-bold flex items-center justify-center text-sm">
                          {post.author?.display_name ? post.author.display_name.charAt(0) : "U"}
                        </div>
                        <div>
                          <div className="font-bold text-sm text-[#1A2420]">
                            {post.author?.display_name || "Community Member"}
                          </div>
                          <div className="text-[11px] text-[#7A8880]">
                            {new Date(post.created_at).toLocaleDateString("ml-IN", { month: "short", day: "numeric" })} • {post.community?.name || currentCommunity?.name || "Tanur"}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        {isOwner && (
                          <button
                            onClick={() => handleDeletePost(post.id)}
                            className="p-1.5 rounded-lg text-[#7A8880] hover:text-red-600 hover:bg-red-50 transition"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => setReportModalPost(post)}
                          className="p-1.5 rounded-lg text-[#7A8880] hover:text-[#1A2420] hover:bg-[#F3EFE6] transition"
                          title="Report"
                        >
                          <Flag className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <p className="text-xs sm:text-sm text-[#2A3730] leading-relaxed font-malayalam-body whitespace-pre-wrap">
                      {post.content}
                    </p>

                    {/* Photo if present */}
                    {post.media_urls && post.media_urls.length > 0 && (
                      <div className="rounded-2xl overflow-hidden border border-[#EAE4D7] max-h-96">
                        <img src={post.media_urls[0]} alt="Post media" className="w-full h-full object-cover" />
                      </div>
                    )}

                    {/* Actions Bar */}
                    <div className="flex items-center justify-between pt-3 border-t border-[#F3EFE6]">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleToggleLike(post.id)}
                          className={`flex items-center gap-1.5 text-xs font-semibold transition ${
                            isLiked ? "text-rose-600" : "text-[#7A8880] hover:text-[#1B4D36]"
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
                          <span>{post.likes_count}</span>
                        </button>

                        <button
                          onClick={() => setActiveCommentPostId(isCommentsOpen ? null : post.id)}
                          className="flex items-center gap-1.5 text-xs font-semibold text-[#7A8880] hover:text-[#1B4D36] transition"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>{comments.length} അഭിപ്രായങ്ങൾ</span>
                        </button>
                      </div>
                    </div>

                    {/* Comments Section */}
                    {isCommentsOpen && (
                      <div className="pt-3 border-t border-[#F3EFE6] space-y-3">
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={commentInput}
                            onChange={(e) => setCommentInput(e.target.value)}
                            placeholder="നിങ്ങളുടെ അഭിപ്രായം രേഖപ്പെടുത്തൂ..."
                            className="flex-1 px-3 py-2 text-xs rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] focus:outline-none focus:ring-1 focus:ring-[#1B4D36]"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleAddComment(post.id);
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => handleAddComment(post.id)}
                            className="p-2 rounded-xl bg-[#1B4D36] text-white hover:bg-[#133A28] transition"
                          >
                            <Send className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {comments.map((c) => (
                          <div key={c.id} className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#EAE4D7] text-xs">
                            <span className="font-bold text-[#1B4D36]">{c.author?.display_name || "User"}: </span>
                            <span className="text-[#2A3730]">{c.content}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: CIVIC CONNECT & ISSUES */}
        {/* ============================================================== */}
        {activeTab === "civic" && (
          <div className="space-y-6">
            
            {/* CTA & Filters Header */}
            <div className="bg-[#FAF4E6] rounded-3xl border border-[#E8DCBF] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold text-[#8C5B0F] uppercase tracking-wider bg-white/70 px-2.5 py-0.5 rounded-full border border-[#E8DCBF]">
                  പൗര പങ്കാളിത്തം • Civic Connect
                </span>
                <h3 className="text-lg font-bold font-malayalam-serif text-[#1B4D36] mt-1">
                  പ്രദേശത്തെ പൗര പ്രശ്നങ്ങൾ അറിയിക്കാം
                </h3>
                <p className="text-xs text-[#5C6A64]">
                  റോഡുകൾ, മാലിന്യ സംസ്കരണം, തെരുവ് വിളക്കുകൾ, കുടിവെള്ള പ്രശ്നങ്ങൾ നഗരസഭയുടെ ശ്രദ്ധയിൽപ്പെടുത്തൂ.
                </p>
              </div>

              <Link
                href="/create?type=issue"
                className="px-5 py-2.5 rounded-xl bg-[#1B4D36] hover:bg-[#133A28] text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs shrink-0"
              >
                <PlusCircle className="w-4 h-4" />
                <span>പുതിയ പരാതി നൽകുക</span>
              </Link>
            </div>

            {/* Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {[
                { id: "all", label: "എല്ലാം (All)" },
                { id: "submitted", label: "സമർപ്പിച്ചത് (Submitted)" },
                { id: "acknowledged", label: "സ്വീകരിച്ചത് (Acknowledged)" },
                { id: "in_progress", label: "നടപടിയിൽ (In Progress)" },
                { id: "resolved", label: "പരിഹരിച്ചത് (Resolved)" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setCivicFilter(f.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition border ${
                    civicFilter === f.id
                      ? "bg-[#1B4D36] text-white border-[#1B4D36]"
                      : "bg-white text-[#5C6A64] border-[#EAE4D7] hover:bg-[#F3EFE6]"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Issues Cards */}
            <div className="space-y-4">
              {filteredIssues.length === 0 ? (
                <div className="bg-white rounded-3xl border border-[#EAE4D7] p-8 text-center text-xs text-[#7A8880]">
                  ഈ വിഭാഗത്തിൽ പരാതികൾ ഇല്ല.
                </div>
              ) : (
                filteredIssues.map((iss) => {
                  const statusColors: Record<string, string> = {
                    submitted: "bg-amber-100 text-amber-800 border-amber-200",
                    acknowledged: "bg-blue-100 text-blue-800 border-blue-200",
                    in_progress: "bg-indigo-100 text-indigo-800 border-indigo-200",
                    resolved: "bg-emerald-100 text-emerald-800 border-emerald-200",
                    rejected: "bg-rose-100 text-rose-800 border-rose-200",
                  };

                  const statusLabels: Record<string, string> = {
                    submitted: "സമർപ്പിച്ചു",
                    acknowledged: "അധികൃതർ സ്വീകരിച്ചു",
                    in_progress: "നടപടി പുരോഗമിക്കുന്നു",
                    resolved: "പരിഹരിച്ചു",
                    rejected: "തള്ളി",
                  };

                  return (
                    <div
                      key={iss.id}
                      className="bg-white rounded-2xl border border-[#EAE4D7] p-5 shadow-xs hover:shadow-card transition space-y-3"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-[#1B4D36] bg-[#E0F1E7] px-2 py-0.5 rounded-md uppercase">
                              {iss.category}
                            </span>
                            <span className="text-[11px] text-[#7A8880]">
                              📍 {iss.location_name || "Tanur"}
                            </span>
                          </div>
                          <h4 className="font-bold text-sm sm:text-base text-[#1A2420] font-malayalam-serif">
                            {iss.title}
                          </h4>
                        </div>

                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${statusColors[iss.status] || "bg-gray-100 text-gray-800"}`}>
                          {statusLabels[iss.status] || iss.status}
                        </span>
                      </div>

                      <p className="text-xs text-[#5C6A64] font-malayalam-body leading-relaxed">
                        {iss.description}
                      </p>

                      {/* Official response if any */}
                      {iss.official_response && (
                        <div className="p-3 rounded-xl bg-[#E0F1E7]/50 border border-[#BDE3CE] text-xs space-y-1">
                          <div className="flex items-center gap-1.5 font-bold text-[#1B4D36]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>നഗരസഭാ ഔദ്യോഗിക പ്രതികരണം:</span>
                          </div>
                          <p className="text-[#2A3730]">{iss.official_response}</p>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-[11px] text-[#7A8880] pt-2 border-t border-[#F3EFE6]">
                        <span>റിപ്പോർട്ട് ചെയ്തത്: {iss.reporter?.display_name || "നാട്ടുവാസി"}</span>
                        <span>{new Date(iss.created_at).toLocaleDateString("ml-IN", { month: "short", day: "numeric", year: "numeric" })}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: LOCAL ANNOUNCEMENTS */}
        {/* ============================================================== */}
        {activeTab === "announcements" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold font-malayalam-serif text-[#1B4D36]">
                  താനൂർ നഗരസഭ & ജില്ലാ ഭരണകൂട അറിയിപ്പുകൾ
                </h3>
                <p className="text-xs text-[#5C6A64]">
                  പൊതുജനങ്ങൾക്കായുള്ള ഔദ്യോഗിക പത്രക്കുറിപ്പുകളും മുന്നറിയിപ്പുകളും.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {announcements.map((ann) => (
                <div key={ann.id} className="bg-white rounded-2xl border border-[#EAE4D7] p-5 shadow-xs space-y-2 hover:shadow-card transition">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#B87A1E] text-white flex items-center justify-center shrink-0">
                        <Pin className="w-3 h-3" />
                      </div>
                      <span className="text-[11px] font-bold text-[#8C5B0F] uppercase tracking-wider">
                        ഔദ്യോഗിക അറിയിപ്പ് • {ann.publisher_organization}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#7A8880]">
                      {new Date(ann.created_at).toLocaleDateString("ml-IN", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm sm:text-base text-[#1A2420] font-malayalam-serif">
                    {ann.title}
                  </h4>
                  <p className="text-xs text-[#4A5750] leading-relaxed font-malayalam-body">
                    {ann.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}

export default function CommunityPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7F0] flex items-center justify-center text-xs text-[#7A8880]">ലോഡ് ചെയ്യുന്നു...</div>}>
      <CommunityContent />
    </Suspense>
  );
}
