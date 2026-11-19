"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { AdminNewsroomNav } from "@/components/news/AdminNewsroomNav";
import { useLanguage } from "@/lib/i18n/context";
import { newsroomStore, NEWS_CATEGORIES } from "@/lib/data/newsroomStore";
import { SmartNewsArticle, NewsEditorialReview, NewsCategorySlug } from "@/types/newsroom";
import { 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  Edit3, 
  Eye, 
  ExternalLink, 
  ShieldAlert, 
  Clock, 
  FileText, 
  Check, 
  X, 
  Filter, 
  Flame, 
  RefreshCw,
  Building,
  MapPin
} from "lucide-react";

export default function AdminNewsroomReviewPage() {
  const { language } = useLanguage();
  const [reviews, setReviews] = useState<NewsEditorialReview[]>(() => newsroomStore.getEditorialReviews());
  const [articles, setArticles] = useState<SmartNewsArticle[]>(() => newsroomStore.getArticles({ status: "all" }));
  const [filterStatus, setFilterStatus] = useState<"pending" | "approved" | "rejected" | "all">("pending");
  const [selectedReview, setSelectedReview] = useState<NewsEditorialReview | null>(null);

  // Modal states
  const [modalMode, setModalMode] = useState<"preview" | "approve" | "reject" | "modify" | null>(null);
  const [activeArticle, setActiveArticle] = useState<SmartNewsArticle | null>(null);
  
  // Action inputs
  const [actionNotes, setActionNotes] = useState("");
  const [approveAsBreaking, setApproveAsBreaking] = useState(false);
  
  // Modification form
  const [editTitle, setEditTitle] = useState("");
  const [editTitleMl, setEditTitleMl] = useState("");
  const [editSummary, setEditSummary] = useState("");
  const [editSummaryMl, setEditSummaryMl] = useState("");
  const [editCategory, setEditCategory] = useState<NewsCategorySlug>("local");

  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const showNotification = (message: string, type: "success" | "error" = "success") => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const refreshData = () => {
    setReviews([...newsroomStore.getEditorialReviews()]);
    setArticles([...newsroomStore.getArticles({ status: "all" })]);
  };

  const filteredReviews = useMemo(() => {
    return reviews.filter(r => {
      if (filterStatus === "all") return true;
      return r.review_status === filterStatus;
    });
  }, [reviews, filterStatus]);

  const openModal = (review: NewsEditorialReview, mode: "preview" | "approve" | "reject" | "modify") => {
    setSelectedReview(review);
    const art = newsroomStore.getArticleById(review.article_id) || articles.find(a => a.id === review.article_id) || null;
    setActiveArticle(art);
    setModalMode(mode);
    setActionNotes("");
    setApproveAsBreaking(art?.is_breaking || false);

    if (art && mode === "modify") {
      setEditTitle(art.title);
      setEditTitleMl(art.title_ml);
      setEditSummary(art.summary);
      setEditSummaryMl(art.summary_ml);
      setEditCategory(art.category);
    }
  };

  const closeModal = () => {
    setModalMode(null);
    setSelectedReview(null);
    setActiveArticle(null);
  };

  const handleApprove = () => {
    if (!selectedReview) return;
    const notes = actionNotes.trim() || "Approved by Chief Editor";
    
    // First approve in store
    newsroomStore.reviewArticle(selectedReview.id, "approved", notes, "Chief Editor");
    
    // If selected as breaking news
    if (approveAsBreaking && activeArticle) {
      newsroomStore.updateArticleStatus(activeArticle.id, "breaking", true, "urgent");
    }

    refreshData();
    closeModal();
    showNotification(language === "ml" ? "വാർത്ത വിജയകരമായി അംഗീകരിച്ച് പ്രസിദ്ധീകരിച്ചു!" : "Article approved and published successfully!");
  };

  const handleReject = () => {
    if (!selectedReview) return;
    const notes = actionNotes.trim() || "Rejected: Does not meet verification and safety criteria.";
    
    newsroomStore.reviewArticle(selectedReview.id, "rejected", notes, "Chief Editor");
    refreshData();
    closeModal();
    showNotification(language === "ml" ? "വാർത്ത പ്രസിദ്ധീകരണത്തിൽ നിന്ന് നിരസിച്ചു." : "Article rejected from publication.");
  };

  const handleModifyAndPublish = () => {
    if (!selectedReview || !activeArticle) return;
    
    const catObj = NEWS_CATEGORIES.find(c => c.slug === editCategory);
    
    // Update article content
    newsroomStore.updateArticle(activeArticle.id, {
      title: editTitle.trim() || activeArticle.title,
      title_ml: editTitleMl.trim() || activeArticle.title_ml,
      summary: editSummary.trim() || activeArticle.summary,
      summary_ml: editSummaryMl.trim() || activeArticle.summary_ml,
      category: editCategory,
      category_name: catObj?.name || activeArticle.category_name,
      category_name_ml: catObj?.name_ml || activeArticle.category_name_ml,
      is_breaking: approveAsBreaking,
      status: approveAsBreaking ? "breaking" : "published",
    });

    const notes = actionNotes.trim() || "Modified editorial content and approved for publishing.";
    newsroomStore.reviewArticle(selectedReview.id, "approved", notes, "Chief Editor");
    
    refreshData();
    closeModal();
    showNotification(language === "ml" ? "വാർത്ത തിരുത്തി വിജയകരമായി പ്രസിദ്ധീകരിച്ചു!" : "Article modified and published successfully!");
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] pb-24">
      <Navbar />
      <AdminNewsroomNav />

      {/* Header Hub */}
      <div className="bg-[#194B35] text-white py-8 px-4 border-b border-[#143E2C]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 px-3 py-1 rounded-full text-xs font-bold mb-2">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{language === "ml" ? "എഡിറ്റോറിയൽ പരിശോധന & സുരക്ഷാ ഗേറ്റ്വേ" : "Editorial Safeguard & Quality Gateway"}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {language === "ml" ? "എഡിറ്റോറിയൽ റിവ്യൂ ക്യൂ" : "Editorial Review Queue"}
            </h1>
            <p className="text-white/80 text-sm mt-1 max-w-2xl">
              {language === "ml"
                ? "അപകടങ്ങൾ, ദുരന്തങ്ങൾ, സെൻസിറ്റീവ് ബ്രേക്കിംഗ് വാർത്തകൾ, ഏക-ഉറവിട വിവരങ്ങൾ എന്നിവ ഇവിടെ കർശനമായ പരിശോധനയ്ക്ക് വിധേയമാക്കുന്നു."
                : "Sensitive breaking claims, casualty reports, single-source submissions, and high-impact rumors held safely prior to publication."}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={refreshData}
              className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-bold flex items-center gap-2 transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{language === "ml" ? "പുതുക്കുക" : "Refresh Queue"}</span>
            </button>
            <Link
              href="/admin/newsroom/articles"
              className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-[#143E2C] rounded-lg text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{language === "ml" ? "എല്ലാ വാർത്തകളും" : "All Articles"}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Notification Toast */}
        {notification && (
          <div className={`mb-6 p-4 rounded-xl flex items-center justify-between text-sm font-bold shadow-md ${
            notification.type === "success" 
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200" 
              : "bg-red-50 text-red-800 border border-red-200"
          }`}>
            <div className="flex items-center gap-2">
              {notification.type === "success" ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-red-600" />}
              <span>{notification.message}</span>
            </div>
            <button onClick={() => setNotification(null)} className="text-gray-400 hover:text-gray-700">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Safeguard Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                {language === "ml" ? "തീരുമാനം കാത്തിരിക്കുന്നവ" : "Pending Action"}
              </p>
              <p className="text-2xl font-black text-amber-900 mt-1">
                {reviews.filter(r => r.review_status === "pending").length}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-emerald-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                {language === "ml" ? "അംഗീകരിച്ചവ" : "Approved"}
              </p>
              <p className="text-2xl font-black text-emerald-900 mt-1">
                {reviews.filter(r => r.review_status === "approved").length}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-red-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-red-700 uppercase tracking-wider">
                {language === "ml" ? "നിരസിച്ചവ" : "Rejected"}
              </p>
              <p className="text-2xl font-black text-red-900 mt-1">
                {reviews.filter(r => r.review_status === "rejected").length}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-700">
              <XCircle className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                {language === "ml" ? "ആകെ പരിശോധനകൾ" : "Total Logged"}
              </p>
              <p className="text-2xl font-black text-gray-900 mt-1">
                {reviews.length}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700">
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">
              {language === "ml" ? "ഫിൽട്ടർ:" : "Status Filter:"}
            </span>
            <div className="flex items-center gap-1.5 ml-2">
              {(["pending", "approved", "rejected", "all"] as const).map(st => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition ${
                    filterStatus === st
                      ? "bg-[#194B35] text-white shadow-xs"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {st === "pending" ? (language === "ml" ? "പെൻഡിംഗ്" : "Pending") :
                   st === "approved" ? (language === "ml" ? "അംഗീകരിച്ചത്" : "Approved") :
                   st === "rejected" ? (language === "ml" ? "നിരസിച്ചത്" : "Rejected") :
                   (language === "ml" ? "എല്ലാം" : "All")}
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs text-gray-500 font-medium">
            {language === "ml" ? `ലഭ്യമായ ഇനങ്ങൾ: ${filteredReviews.length}` : `Showing: ${filteredReviews.length} reviews`}
          </div>
        </div>

        {/* Reviews List */}
        {filteredReviews.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              {language === "ml" ? "റിവ്യൂ ക്യൂ ശൂന്യമാണ്" : "No Items in this Review Queue"}
            </h3>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              {language === "ml" 
                ? "നിലവിൽ ഈ വിഭാഗത്തിൽ പരിശോധനയ്ക്കായി കാത്തിരിക്കുന്ന വാർത്തകളോ റിപ്പോർട്ടുകളോ ഇല്ല." 
                : "All incoming articles have passed automated reliability scoring or have already been reviewed."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredReviews.map((review) => {
              const article = newsroomStore.getArticleById(review.article_id) || articles.find(a => a.id === review.article_id);
              const isPending = review.review_status === "pending";

              return (
                <div 
                  key={review.id}
                  className={`bg-white rounded-xl border p-5 transition shadow-xs hover:shadow-md ${
                    isPending ? "border-amber-300 ring-1 ring-amber-100" : "border-gray-200"
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    
                    {/* Main Information */}
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        {isPending ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                            <Clock className="w-3 h-3" />
                            {language === "ml" ? "പരിശോധന വേണം" : "Pending Review"}
                          </span>
                        ) : review.review_status === "approved" ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                            <CheckCircle2 className="w-3 h-3" />
                            {language === "ml" ? "അംഗീകരിച്ചു" : "Approved"}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800">
                            <XCircle className="w-3 h-3" />
                            {language === "ml" ? "നിരസിച്ചു" : "Rejected"}
                          </span>
                        )}

                        <span className="text-xs font-medium text-gray-400">
                          ID: {review.id}
                        </span>

                        <span className="text-xs text-gray-500">
                          {new Date(review.flagged_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      {/* Headline */}
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
                        {article ? (language === "ml" ? article.title_ml : article.title) : `Article ID: ${review.article_id}`}
                      </h3>

                      {article && (
                        <p className="text-xs text-gray-500 line-clamp-1 italic">
                          Original: {article.original_headline}
                        </p>
                      )}

                      {/* Flagged Reason Box */}
                      <div className="bg-amber-50/70 border border-amber-200/80 rounded-lg p-3 text-xs text-amber-900 flex items-start gap-2.5">
                        <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-bold">{language === "ml" ? "ഫ്ലാഗ് ചെയ്ത കാരണം: " : "Reason Flagged: "}</strong>
                          {review.reason}
                        </div>
                      </div>

                      {/* Metadata row */}
                      {article && (
                        <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-gray-600">
                          <span className="flex items-center gap-1 bg-gray-100 px-2.5 py-1 rounded-md font-medium">
                            <Building className="w-3 h-3 text-gray-500" />
                            {article.source_name}
                          </span>

                          <span className="flex items-center gap-1 bg-gray-100 px-2.5 py-1 rounded-md font-medium">
                            <MapPin className="w-3 h-3 text-[#194B35]" />
                            {article.specific_locality || article.geographic_scope}
                          </span>

                          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-bold">
                            {article.category_name}
                          </span>

                          <a
                            href={article.source_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#194B35] hover:underline flex items-center gap-1 ml-auto font-medium"
                          >
                            <span>{language === "ml" ? "യഥാർത്ഥ ലിങ്ക്" : "Source Link"}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}

                      {/* Reviewer Notes if past review */}
                      {review.reviewer_notes && (
                        <div className="mt-2 text-xs text-gray-500 border-t border-gray-100 pt-2">
                          <span className="font-bold text-gray-700">{review.reviewer_name || "Editor"}: </span>
                          <span>{review.reviewer_notes}</span>
                        </div>
                      )}
                    </div>

                    {/* Actions Panel */}
                    <div className="flex flex-row lg:flex-col items-center gap-2 lg:w-44 shrink-0 border-t lg:border-t-0 lg:border-l border-gray-100 pt-3 lg:pt-0 lg:pl-4">
                      <button
                        onClick={() => openModal(review, "preview")}
                        className="w-full px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition"
                      >
                        <Eye className="w-3.5 h-3.5 text-gray-600" />
                        <span>{language === "ml" ? "പ്രിവ്യൂ" : "Inspect"}</span>
                      </button>

                      {isPending && (
                        <>
                          <button
                            onClick={() => openModal(review, "approve")}
                            className="w-full px-3 py-2 bg-[#194B35] hover:bg-[#143E2C] text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-xs"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>{language === "ml" ? "അംഗീകരിക്കുക" : "Approve"}</span>
                          </button>

                          <button
                            onClick={() => openModal(review, "modify")}
                            className="w-full px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>{language === "ml" ? "തിരുത്തി നൽകുക" : "Edit & Publish"}</span>
                          </button>

                          <button
                            onClick={() => openModal(review, "reject")}
                            className="w-full px-3 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>{language === "ml" ? "നിരസിക്കുക" : "Reject"}</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* MODAL SYSTEM */}
      {/* ======================================================== */}
      {modalMode && activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 p-6">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-[#194B35]" />
                <h3 className="text-lg font-bold text-gray-900">
                  {modalMode === "preview" ? (language === "ml" ? "വാർത്ത പരിശോധന & പ്രിവ്യൂ" : "Inspect Article Safeguards") :
                   modalMode === "approve" ? (language === "ml" ? "വാർത്ത പ്രസിദ്ധീകരണം അംഗീകരിക്കുക" : "Confirm Publication") :
                   modalMode === "reject" ? (language === "ml" ? "വാർത്ത നിരസിക്കുക" : "Reject Article") :
                   (language === "ml" ? "വാർത്ത തിരുത്തി പ്രസിദ്ധീകരിക്കുക" : "Modify Content & Publish")}
                </h3>
              </div>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="py-4 space-y-4">
              
              {/* Common Article Context Box */}
              <div className="bg-gray-50 p-4 rounded-xl space-y-2 border border-gray-200 text-xs text-gray-700">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#194B35] uppercase">{activeArticle.source_name}</span>
                  <span className="text-gray-500">{new Date(activeArticle.original_published_at).toLocaleString()}</span>
                </div>
                <p className="font-bold text-sm text-gray-900">{activeArticle.title}</p>
                <p className="text-gray-600 line-clamp-3">{activeArticle.summary}</p>
              </div>

              {/* Mode: PREVIEW */}
              {modalMode === "preview" && (
                <div className="space-y-4 text-xs">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{language === "ml" ? "മലയാളം തലക്കെട്ട്:" : "Malayalam Title:"}</h4>
                    <p className="p-2.5 bg-gray-50 rounded-lg text-gray-800">{activeArticle.title_ml}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{language === "ml" ? "എഐ സംഗ്രഹം (Malayalam):" : "AI Malayalam Summary:"}</h4>
                    <p className="p-2.5 bg-gray-50 rounded-lg text-gray-800 leading-relaxed">{activeArticle.summary_ml}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{language === "ml" ? "യഥാർത്ഥ ഉള്ളടക്ക പ്രിവ്യൂ (Raw text):" : "Original Raw Preview:"}</h4>
                    <p className="p-2.5 bg-gray-50 rounded-lg text-gray-600 leading-relaxed font-mono text-[11px] max-h-36 overflow-y-auto">
                      {activeArticle.full_content_preview}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-2.5 bg-amber-50 rounded-lg text-amber-900">
                      <span className="font-bold block">{language === "ml" ? "പരിശോധനാ കാരണം:" : "Reason Flagged:"}</span>
                      <span>{selectedReview?.reason}</span>
                    </div>
                    <div className="p-2.5 bg-blue-50 rounded-lg text-blue-900">
                      <span className="font-bold block">{language === "ml" ? "എഐ മോഡൽ:" : "AI Model Used:"}</span>
                      <span>{activeArticle.ai_model_used}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Mode: APPROVE */}
              {modalMode === "approve" && (
                <div className="space-y-4 text-xs">
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900">
                    {language === "ml"
                      ? "ഈ വാർത്ത പ്രസിദ്ധീകരിക്കാൻ താങ്കൾ അംഗീകാരം നൽകുന്നു. വാർത്ത സാധാരണ വാർത്തയായോ ബ്രേക്കിംഗ് വാർത്തയായോ പോർട്ടലിൽ ഉടൻ ലഭ്യമാകും."
                      : "You are approving this article for public release on OUR NATION. It will immediately show across public news feeds."}
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-gray-700 block">
                      {language === "ml" ? "എഡിറ്റോറിയൽ കുറിപ്പ് (ഓപ്ഷണൽ):" : "Editorial Clearance Note:"}
                    </label>
                    <textarea
                      rows={3}
                      value={actionNotes}
                      onChange={(e) => setActionNotes(e.target.value)}
                      placeholder={language === "ml" ? "ഉദാ: താനൂർ ട്രാഫിക് പോലീസുമായി ഫോണിൽ സംസാരിച്ച് സ്ഥിരീകരിച്ചു..." : "e.g., Verified by contacting Tanur police station..."}
                      className="w-full p-2.5 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-[#194B35] outline-none"
                    />
                  </div>

                  <label className="flex items-center gap-2.5 p-3 rounded-lg border border-amber-200 bg-amber-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={approveAsBreaking}
                      onChange={(e) => setApproveAsBreaking(e.target.checked)}
                      className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
                    />
                    <div>
                      <span className="font-bold text-amber-900 block flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 text-amber-600" />
                        {language === "ml" ? "ബ്രേക്കിംഗ് വാർത്തയായി നൽകുക" : "Promote to Breaking News Strip"}
                      </span>
                      <span className="text-amber-800 text-[11px]">
                        {language === "ml" ? "ഹോംപേജിലെ റെഡ് ബ്രേക്കിംഗ് ബാനറിലും ബ്രേക്കിംഗ് ഡെസ്കിലും പ്രദർശിപ്പിക്കും" : "Displays in the breaking news ticker and urgent alerts"}
                      </span>
                    </div>
                  </label>
                </div>
              )}

              {/* Mode: REJECT */}
              {modalMode === "reject" && (
                <div className="space-y-4 text-xs">
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-900">
                    {language === "ml"
                      ? "ഈ വാർത്ത തള്ളിക്കളയപ്പെടും. പൊതുജനങ്ങൾക്ക് ഇത് കാണാൻ സാധിക്കില്ല. നിരസിക്കാനുള്ള കാരണം താഴെ രേഖപ്പെടുത്തുക."
                      : "This article will be marked as rejected and excluded from all public feeds. Provide the editorial rationale."}
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-gray-700 block">
                      {language === "ml" ? "നിരസിക്കാനുള്ള കാരണം:" : "Reason for Rejection (Required):"}
                    </label>
                    <textarea
                      rows={3}
                      value={actionNotes}
                      onChange={(e) => setActionNotes(e.target.value)}
                      placeholder={language === "ml" ? "ഉദാ: അടിസ്ഥാനരഹിതമായ സമൂഹമാധ്യമ പ്രചാരണം, ഔദ്യോഗിക സ്ഥിരീകരണമില്ല..." : "e.g. Unverified social media rumor; debunked by local officials..."}
                      className="w-full p-2.5 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-red-500 outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Mode: MODIFY */}
              {modalMode === "modify" && (
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">{language === "ml" ? "മലയാളം തലക്കെട്ട്:" : "Malayalam Headline:"}</label>
                    <input
                      type="text"
                      value={editTitleMl}
                      onChange={(e) => setEditTitleMl(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-[#194B35]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">{language === "ml" ? "ഇംഗ്ലീഷ് തലക്കെട്ട്:" : "English Headline:"}</label>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-[#194B35]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">{language === "ml" ? "മലയാളം സംഗ്രഹം:" : "Malayalam Summary:"}</label>
                    <textarea
                      rows={2}
                      value={editSummaryMl}
                      onChange={(e) => setEditSummaryMl(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-[#194B35]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">{language === "ml" ? "ഇംഗ്ലീഷ് സംഗ്രഹം:" : "English Summary:"}</label>
                    <textarea
                      rows={2}
                      value={editSummary}
                      onChange={(e) => setEditSummary(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-[#194B35]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">{language === "ml" ? "വിഭാഗം (Category):" : "Category:"}</label>
                    <select
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value as NewsCategorySlug)}
                      className="w-full p-2 border border-gray-300 rounded-lg text-xs bg-white focus:ring-2 focus:ring-[#194B35]"
                    >
                      {NEWS_CATEGORIES.map(c => (
                        <option key={c.slug} value={c.slug}>
                          {language === "ml" ? c.name_ml : c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <label className="flex items-center gap-2 p-2 bg-amber-50 rounded-lg border border-amber-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={approveAsBreaking}
                      onChange={(e) => setApproveAsBreaking(e.target.checked)}
                      className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
                    />
                    <span className="font-bold text-amber-900">{language === "ml" ? "ബ്രേക്കിംഗ് ന്യൂസ് ആയി പ്രസിദ്ധീകരിക്കുക" : "Publish as Breaking News"}</span>
                  </label>
                </div>
              )}

            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={closeModal}
                className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 transition"
              >
                {language === "ml" ? "റദ്ദാക്കുക" : "Cancel"}
              </button>

              {modalMode === "approve" && (
                <button
                  onClick={handleApprove}
                  className="px-5 py-2 bg-[#194B35] hover:bg-[#143E2C] text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                >
                  <Check className="w-4 h-4" />
                  <span>{language === "ml" ? "അംഗീകരിച്ച് പ്രസിദ്ധീകരിക്കുക" : "Approve & Publish"}</span>
                </button>
              )}

              {modalMode === "reject" && (
                <button
                  onClick={handleReject}
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                >
                  <X className="w-4 h-4" />
                  <span>{language === "ml" ? "നിരസിക്കുക" : "Confirm Rejection"}</span>
                </button>
              )}

              {modalMode === "modify" && (
                <button
                  onClick={handleModifyAndPublish}
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                >
                  <Check className="w-4 h-4" />
                  <span>{language === "ml" ? "തിരുത്തി പ്രസിദ്ധീകരിക്കുക" : "Save & Publish"}</span>
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      <BottomNav />
      <Footer />
    </div>
  );
}
