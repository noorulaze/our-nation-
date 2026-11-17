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
  MoreVertical,
  X
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

  const handleAddComment = (postId: string) => {
    if (!commentInput.trim() || !user) return;

    store.createComment(postId, user.id, commentInput.trim());
    setCommentInput("");
    // refresh post counts
    setPosts(store.getPosts(currentCommunity?.id));
  };

  const handleReportPost = () => {
    if (!reportModalPost || !reportReason.trim() || !user) return;
    // record in store
    store.addAuditLog(user.id, "REPORT_CONTENT", "post", reportModalPost.id, { reason: reportReason });
    setReportSuccess(true);
    setTimeout(() => {
      setReportModalPost(null);
      setReportReason("");
      setReportSuccess(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8">
        
        {/* Community Header Banner */}
        <div className="bg-surface rounded-2xl border border-border p-6 mb-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-brand-700 uppercase tracking-wider bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-200">
                {currentCommunity?.type || "Locality"}
              </span>
              <span className="text-xs text-muted-foreground">
                {currentCommunity?.district} • Kerala
              </span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              {currentCommunity ? (language === "ml" ? currentCommunity.name_ml : currentCommunity.name) : "Kerala Community"}
            </h1>
            <p className="text-xs text-muted-foreground max-w-xl">
              {currentCommunity?.description || "A verified local public square for all residents."}
            </p>
          </div>

          <button
            onClick={() => setIsJoined(!isJoined)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition active:scale-95 self-start sm:self-center ${
              isJoined
                ? "bg-muted text-muted-foreground hover:bg-red-50 hover:text-red-700 border border-border"
                : "bg-brand-700 hover:bg-brand-800 text-white shadow-sm"
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
              <div key={ann.id} className="bg-brand-50/80 border border-brand-200 rounded-2xl p-4 shadow-xs">
                <div className="flex items-center gap-2 mb-1.5">
                  <Pin className="w-4 h-4 text-brand-700" />
                  <span className="text-[11px] font-bold text-brand-800 uppercase tracking-wider">
                    {t("officialBadge")} • {ann.publisher_organization}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-brand-950 mb-1">
                  {ann.title}
                </h3>
                <p className="text-xs text-brand-900/90 leading-relaxed">
                  {ann.content}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Create Post Card */}
        <div className="bg-surface rounded-2xl border border-border p-5 mb-8 shadow-sm">
          <form onSubmit={handleCreatePost}>
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-brand-100 text-brand-700 font-bold flex items-center justify-center text-sm flex-shrink-0">
                {user?.display_name ? user.display_name.charAt(0) : "U"}
              </div>
              <div className="flex-1">
                <textarea
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder={t("postPlaceholder")}
                  rows={3}
                  className="w-full text-sm rounded-xl border border-border bg-background p-3 focus:outline-none focus:ring-2 focus:ring-brand-500 text-foreground resize-none"
                />

                {showImageInput && (
                  <input
                    type="url"
                    value={newPostImage}
                    onChange={(e) => setNewPostImage(e.target.value)}
                    placeholder="Paste image URL (https://...)"
                    className="w-full mt-2 px-3 py-2 text-xs rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-brand-500 text-foreground"
                  />
                )}

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setShowImageInput(!showImageInput)}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground font-medium p-1 rounded"
                  >
                    <ImageIcon className="w-4 h-4 text-brand-700" />
                    <span>{showImageInput ? "Remove Image" : "Add Image"}</span>
                  </button>

                  <button
                    type="submit"
                    disabled={!newPostContent.trim()}
                    className="px-5 py-2 rounded-xl bg-brand-700 hover:bg-brand-800 disabled:opacity-50 text-white font-semibold text-xs transition active:scale-95 shadow-sm"
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
            <div className="text-center py-12 text-muted-foreground text-sm">
              {t("noResults")}
            </div>
          ) : (
            posts.map((post) => {
              const comments = store.getComments(post.id);
              const isOwner = user?.id === post.author_id || role === "admin" || role === "moderator";

              return (
                <article
                  key={post.id}
                  className="bg-surface rounded-2xl border border-border p-6 shadow-sm hover:border-brand-300 transition"
                >
                  {/* Post Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-50 border border-brand-200 text-brand-700 font-bold flex items-center justify-center text-sm">
                        {post.author?.display_name ? post.author.display_name.charAt(0) : "U"}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-foreground">
                          {post.author?.display_name || "Community Member"}
                        </div>
                        <div className="text-[11px] text-muted-foreground">
                          {new Date(post.created_at).toLocaleDateString()} • {post.community?.name || currentCommunity?.name}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      {isOwner && (
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="p-1.5 rounded-lg text-muted-foreground hover:text-red-600 hover:bg-red-50 transition"
                          title="Delete post"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => setReportModalPost(post)}
                        className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition"
                        title={t("reportContent")}
                      >
                        <Flag className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <p className="text-sm text-foreground leading-relaxed whitespace-pre-line mb-4">
                    {post.content}
                  </p>

                  {/* Image attachment */}
                  {post.media_urls && post.media_urls.length > 0 && (
                    <div className="rounded-xl overflow-hidden mb-4 border border-border max-h-96 bg-muted">
                      <img
                        src={post.media_urls[0]}
                        alt="Post attachment"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-6 pt-3 border-t border-border text-xs text-muted-foreground">
                    <button className="flex items-center gap-1.5 hover:text-red-600 transition">
                      <Heart className="w-4 h-4" />
                      <span>{post.likes_count}</span>
                    </button>

                    <button
                      onClick={() =>
                        setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)
                      }
                      className="flex items-center gap-1.5 hover:text-brand-700 transition"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>{post.comments_count || comments.length}</span>
                    </button>
                  </div>

                  {/* Comments Section */}
                  {activeCommentPostId === post.id && (
                    <div className="mt-4 pt-4 border-t border-border/70 space-y-3">
                      <div className="space-y-2">
                        {comments.map((comment) => (
                          <div key={comment.id} className="p-3 rounded-xl bg-muted/50 text-xs">
                            <span className="font-bold text-foreground mr-1.5">
                              {comment.author?.display_name || "Neighbor"}:
                            </span>
                            <span className="text-foreground/90">{comment.content}</span>
                          </div>
                        ))}
                      </div>

                      {/* Add comment input */}
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="text"
                          value={commentInput}
                          onChange={(e) => setCommentInput(e.target.value)}
                          placeholder={t("writeComment")}
                          className="flex-1 px-3 py-2 text-xs rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-brand-500"
                        />
                        <button
                          onClick={() => handleAddComment(post.id)}
                          disabled={!commentInput.trim()}
                          className="px-3.5 py-2 rounded-xl bg-brand-700 hover:bg-brand-800 disabled:opacity-50 text-white text-xs font-semibold"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-surface rounded-2xl border border-border p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base text-foreground flex items-center gap-2">
                <Flag className="w-4 h-4 text-red-600" />
                <span>{t("reportContent")}</span>
              </h3>
              <button
                onClick={() => setReportModalPost(null)}
                className="p-1 rounded-lg text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {reportSuccess ? (
              <div className="text-center py-6 text-sm font-semibold text-emerald-700">
                Thank you. Our community moderation team has received your report.
              </div>
            ) : (
              <div>
                <p className="text-xs text-muted-foreground mb-3">
                  Please let us know why this post violates community guidelines:
                </p>
                <select
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  className="w-full mb-4 px-3 py-2 text-xs rounded-xl border border-border bg-background text-foreground"
                >
                  <option value="">Select a reason...</option>
                  <option value="spam">Spam or misleading information</option>
                  <option value="harassment">Harassment or abusive language</option>
                  <option value="privacy">Unauthorized personal information</option>
                  <option value="inappropriate">Inappropriate or offensive content</option>
                </select>

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setReportModalPost(null)}
                    className="px-4 py-2 rounded-xl text-xs font-medium text-muted-foreground hover:bg-muted"
                  >
                    {t("cancel")}
                  </button>
                  <button
                    onClick={handleReportPost}
                    disabled={!reportReason}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-red-600 hover:bg-red-700 text-white disabled:opacity-50"
                  >
                    Submit Report
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
      <BottomNav />
    </div>
  );
}
