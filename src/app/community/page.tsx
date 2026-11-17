"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/lib/i18n/context";
import { useCommunity } from "@/lib/community/context";
import { useAuth } from "@/lib/auth/context";
import { store } from "@/lib/data/store";
import { Post, Comment } from "@/types/database";
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
  X,
  ExternalLink
} from "lucide-react";

export default function CommunityPage() {
  const { t, language } = useLanguage();
  const { currentCommunity } = useCommunity();
  const { user, role } = useAuth();

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
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const announcements = store.getAnnouncements(currentCommunity?.id);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim() || !user) return;

    const created = store.createPost({
      community_id: currentCommunity?.id || "40000000-0000-0000-0000-000000000001",
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

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8">
        
        {/* Community Header Banner */}
        <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 mb-6 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-[#1B4D36] uppercase tracking-wider bg-[#E0F1E7] px-2.5 py-0.5 rounded-full border border-[#BDE3CE]">
                {currentCommunity?.type || "Locality"}
              </span>
              <span className="text-xs text-[#5C6A64]">
                {currentCommunity?.district || "Ernakulam"} • Kerala
              </span>
            </div>
            <h1 className="text-2xl font-bold font-malayalam-serif text-[#1B4D36]">
              {currentCommunity ? (language === "ml" ? currentCommunity.name_ml : currentCommunity.name) : "Kerala Community"}
            </h1>
            <p className="text-xs text-[#5C6A64] max-w-xl font-malayalam-body">
              {currentCommunity?.description || "A verified local public square for all residents."}
            </p>
          </div>

          <button
            onClick={() => setIsJoined(!isJoined)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition active:scale-95 self-start sm:self-center shadow-xs ${
              isJoined
                ? "bg-[#F3EFE6] text-[#5C6A64] hover:bg-red-50 hover:text-red-700 border border-[#DDD5C5]"
                : "bg-[#1B4D36] hover:bg-[#133A28] text-white shadow-sm"
            }`}
          >
            {isJoined ? (
              <>
                <UserMinus className="w-4 h-4" />
                <span>{t("leaveCommunity")}</span>
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                <span>{t("joinCommunity")}</span>
              </>
            )}
          </button>
        </div>

        {/* Pinned Official Announcements */}
        {announcements.length > 0 && (
          <div className="mb-6 space-y-3">
            {announcements.map((ann) => (
              <div key={ann.id} className="bg-[#FAF4E6] border border-[#E8DCBF] rounded-2xl p-4 sm:p-5 shadow-xs">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-6 h-6 rounded-full bg-[#B87A1E] text-white flex items-center justify-center">
                    <Pin className="w-3 h-3" />
                  </div>
                  <span className="text-[11px] font-bold text-[#8C5B0F] uppercase tracking-wider">
                    {t("officialBadge")} • {ann.publisher_organization}
                  </span>
                </div>
                <h3 className="font-bold font-malayalam-serif text-sm sm:text-base text-[#1A2420] mb-1">
                  {ann.title}
                </h3>
                <p className="text-xs text-[#4A5750] leading-relaxed font-malayalam-body">
                  {ann.content}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Create Post Card */}
        <div className="bg-white rounded-3xl border border-[#EAE4D7] p-5 sm:p-6 mb-8 shadow-card">
          <form onSubmit={handleCreatePost}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#E5DDD0] text-[#1B4D36] font-bold flex items-center justify-center text-sm flex-shrink-0">
                {user?.display_name ? user.display_name.charAt(0) : "U"}
              </div>
              <div className="flex-1">
                <textarea
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder={language === "ml" ? "നിങ്ങളുടെ പ്രദേശത്തെ വിശേഷങ്ങളും വാർത്തകളും പങ്കുവെക്കൂ..." : t("postPlaceholder")}
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
                    {t("publish")}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Feed Posts */}
        <div className="space-y-6">
          {posts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-[#EAE4D7] p-8">
              <Sparkles className="w-10 h-10 text-[#B87A1E] mx-auto mb-3 opacity-60" />
              <h3 className="font-bold text-base text-[#1A2420]">{t("noResults")}</h3>
              <p className="text-xs text-[#7A8880] mt-1">ആദ്യ പോസ്റ്റ് നിങ്ങൾ തന്നെ തുടങ്ങൂ!</p>
            </div>
          ) : (
            posts.map((post) => {
              const comments = store.getComments(post.id);
              const isOwner = user?.id === post.author_id || role === "admin" || role === "moderator";
              const isLiked = likedPosts[post.id] || false;

              return (
                <article
                  key={post.id}
                  className="bg-white rounded-3xl border border-[#EAE4D7] p-5 sm:p-6 shadow-card hover:border-[#1B4D36]/40 transition"
                >
                  {/* Post Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#E5DDD0] border border-[#DDD5C5] text-[#1B4D36] font-bold flex items-center justify-center text-sm">
                        {post.author?.display_name ? post.author.display_name.charAt(0) : "U"}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-[#1A2420]">
                          {post.author?.display_name || "Community Member"}
                        </div>
                        <div className="text-[11px] text-[#7A8880]">
                          {new Date(post.created_at).toLocaleDateString("ml-IN", { month: "short", day: "numeric" })} • {post.community?.name || currentCommunity?.name || "Kerala"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      {isOwner && (
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="p-1.5 rounded-lg text-[#7A8880] hover:text-red-600 hover:bg-red-50 transition"
                          title="Delete post"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => setReportModalPost(post)}
                        className="p-1.5 rounded-lg text-[#7A8880] hover:text-[#1A2420] hover:bg-[#F3EFE6] transition"
                        title={t("reportContent")}
                      >
                        <Flag className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <p className="text-xs sm:text-sm text-[#2A3730] leading-relaxed whitespace-pre-line mb-4 font-malayalam-body">
                    {post.content}
                  </p>

                  {/* Image attachment */}
                  {post.media_urls && post.media_urls.length > 0 && (
                    <div 
                      onClick={() => setLightboxImage(post.media_urls[0])}
                      className="rounded-2xl overflow-hidden mb-4 border border-[#EAE4D7] max-h-96 bg-[#E5DDD0] cursor-pointer group relative"
                    >
                      <img
                        src={post.media_urls[0]}
                        alt="Post attachment"
                        className="w-full h-full object-cover group-hover:scale-102 transition duration-300"
                      />
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                        <span className="px-3 py-1 rounded-full bg-black/60 text-white text-xs font-semibold backdrop-blur-xs">
                          വലുതായി കാണുക
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-6 pt-3 border-t border-[#F3EFE6] text-xs text-[#5C6A64]">
                    <button 
                      onClick={() => handleToggleLike(post.id)}
                      className={`flex items-center gap-1.5 transition active:scale-90 font-semibold ${
                        isLiked ? "text-red-600" : "hover:text-red-600"
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? "fill-red-600 text-red-600" : ""}`} />
                      <span>{post.likes_count}</span>
                    </button>

                    <button
                      onClick={() =>
                        setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)
                      }
                      className="flex items-center gap-1.5 hover:text-[#1B4D36] transition font-semibold"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>{post.comments_count || comments.length} അഭിപ്രായങ്ങൾ</span>
                    </button>

                    <button
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({ text: post.content, url: window.location.href });
                        }
                      }}
                      className="flex items-center gap-1.5 hover:text-[#1B4D36] transition ml-auto"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>പങ്കുവെക്കുക</span>
                    </button>
                  </div>

                  {/* Comments Section */}
                  {activeCommentPostId === post.id && (
                    <div className="mt-4 pt-4 border-t border-[#EAE4D7] space-y-3">
                      <div className="space-y-2">
                        {comments.length === 0 ? (
                          <div className="text-xs text-[#7A8880] py-1 text-center">
                            ഇതുവരെ അഭിപ്രായങ്ങൾ ഒന്നുമില്ല. ആദ്യത്തെ കമന്റ് ചെയ്യൂ!
                          </div>
                        ) : (
                          comments.map((comment) => (
                            <div key={comment.id} className="p-3 rounded-xl bg-[#FAF7F0] border border-[#EAE4D7] text-xs">
                              <span className="font-bold text-[#1B4D36] mr-1.5">
                                {comment.author?.display_name || "Neighbor"}:
                              </span>
                              <span className="text-[#2A3730]">{comment.content}</span>
                            </div>
                          ))
                        )}
                      </div>

                      {/* Add comment input */}
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="text"
                          value={commentInput}
                          onChange={(e) => setCommentInput(e.target.value)}
                          placeholder={t("writeComment")}
                          className="flex-1 px-3 py-2 text-xs rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-none focus:ring-1 focus:ring-[#1B4D36]"
                        />
                        <button
                          onClick={() => handleAddComment(post.id)}
                          disabled={!commentInput.trim()}
                          className="px-4 py-2 rounded-xl bg-[#1B4D36] hover:bg-[#133A28] disabled:opacity-50 text-white text-xs font-bold transition active:scale-95 shadow-xs"
                        >
                          {t("postComment")}
                        </button>
                      </div>
                    </div>
                  )}
                </article>
              );
            })
          )}
        </div>

      </main>

      {/* Moderation / Report Modal */}
      {reportModalPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-[#FAF7F0] rounded-3xl border border-[#E7DFD0] p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold font-malayalam-serif text-base text-[#1A2420] flex items-center gap-2">
                <Flag className="w-4 h-4 text-red-600" />
                <span>{t("reportContent")}</span>
              </h3>
              <button
                onClick={() => setReportModalPost(null)}
                className="w-7 h-7 rounded-full bg-white hover:bg-[#EAE4D7] text-[#5C6A64] flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            {reportSuccess ? (
              <div className="p-4 rounded-xl bg-[#1B4D36] text-white text-xs font-semibold text-center flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-300" />
                <span>പരാതി സമർപ്പിച്ചു. മോഡറേഷൻ ടീം പരിശോധിക്കും.</span>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-xs text-[#5C6A64]">
                  ഈ ഉള്ളടക്കം റിപ്പോർട്ട് ചെയ്യാനുള്ള കാരണം വ്യക്തമാക്കുക:
                </p>
                <textarea
                  rows={3}
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  placeholder="തെറ്റായ വിവരങ്ങൾ, സ്പാം, അനുചിതമായ ഭാഷ..."
                  className="w-full text-xs p-3 rounded-xl border border-[#DDD5C5] bg-white text-[#1A2420] focus:outline-none focus:ring-1 focus:ring-[#1B4D36] resize-none"
                />
                <button
                  onClick={handleReportPost}
                  disabled={!reportReason.trim()}
                  className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold text-xs transition"
                >
                  സമർപ്പിക്കുക
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in cursor-pointer"
        >
          <div className="relative max-w-3xl max-h-[85vh]">
            <img src={lightboxImage} alt="Full attachment" className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl object-contain" />
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <Footer />
      <BottomNav />
    </div>
  );
}
