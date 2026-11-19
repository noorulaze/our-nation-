"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { NewsNav } from "@/components/news/NewsNav";
import { useLanguage } from "@/lib/i18n/context";
import { newsroomStore, NEWS_CATEGORIES } from "@/lib/data/newsroomStore";
import { SmartNewsArticle } from "@/types/newsroom";
import { 
  ArrowLeft, 
  Clock, 
  MapPin, 
  ExternalLink, 
  Share2, 
  ShieldCheck, 
  CheckCircle2, 
  Flame, 
  Sparkles, 
  Tag, 
  Layers, 
  ChevronRight, 
  Bookmark,
  Check,
  AlertCircle,
  FileText
} from "lucide-react";

export default function SmartNewsArticleDetailPage() {
  const params = useParams();
  const { language } = useLanguage();
  const articleId = params?.id as string;

  const [article, setArticle] = useState<SmartNewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (articleId) {
      const found = newsroomStore.getArticleById(articleId);
      setArticle(found ? { ...found } : null);
      setLoading(false);
    }
  }, [articleId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F0] flex items-center justify-center p-8 text-[#194B35]">
        <div className="text-center">
          <div className="w-10 h-10 border-3 border-[#194B35] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-bold font-malayalam">വാർത്ത ലോഡ് ചെയ്യുന്നു...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420]">
        <Navbar />
        <NewsNav />
        <div className="max-w-xl mx-auto px-4 py-20 text-center">
          <h2 className="text-xl font-bold text-[#194B35] mb-2 font-serif">വാർത്ത കണ്ടെത്താനായില്ല</h2>
          <p className="text-xs text-[#5C6A64] mb-6">നിങ്ങൾ തിരഞ്ഞ വാർത്ത നിലവിലില്ല അല്ലെങ്കിൽ നീക്കം ചെയ്യപ്പെട്ടിരിക്കാം.</p>
          <Link
            href="/news"
            className="px-5 py-2.5 rounded-xl bg-[#194B35] text-white text-xs font-bold hover:bg-[#143E2C] transition inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>പ്രധാന വാർത്തകളിലേക്ക് മടങ്ങുക</span>
          </Link>
        </div>
        <Footer />
        <BottomNav />
      </div>
    );
  }

  const category = NEWS_CATEGORIES.find(c => c.slug === article.category);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.summary,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] pb-24">
      <Navbar />
      <NewsNav />

      {/* Top Breadcrumb & Share */}
      <div className="bg-white border-b border-[#E8DCBF] py-3">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#194B35] hover:text-[#8C5B0F] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>വാർത്തകളിലേക്ക് മടങ്ങുക</span>
          </Link>

          <button
            onClick={handleShare}
            className="p-1.5 px-3 rounded-lg border border-[#DDD5C5] bg-[#FAF7F0] text-[#5C6A64] hover:text-[#194B35] text-xs font-bold flex items-center gap-1.5 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? "ലിങ്ക് കോപ്പി ചെയ്തു" : "പങ്കുവെക്കുക (Share)"}</span>
          </button>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Article Header Card */}
        <div className="bg-white rounded-3xl border border-[#E8DCBF] p-6 sm:p-8 shadow-xs">
          
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-3 text-xs">
            {article.is_breaking && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-rose-600 text-white flex items-center gap-1 uppercase tracking-wider animate-pulse">
                <Flame className="w-3 h-3 fill-current" />
                ബ്രേക്കിംഗ്
              </span>
            )}
            <Link
              href={`/news/category/${article.category}`}
              className="font-bold px-2.5 py-0.5 rounded-md text-[11px]"
              style={{ backgroundColor: `${category?.color || '#194B35'}15`, color: category?.color || '#194B35' }}
            >
              {category?.name_ml || article.category_name}
            </Link>
            <span className="text-neutral-400">•</span>
            <span className="text-neutral-500 font-medium">
              വായിക്കാൻ: {article.read_time}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#194B35] font-serif leading-snug mb-3">
            {language === "ml" ? article.title_ml : article.title}
          </h1>

          {/* Publisher & Timestamps Bar */}
          <div className="p-3.5 rounded-2xl bg-[#FAF7F0] border border-[#DDD5C5] mb-6 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 font-bold text-[#194B35]">
                <span>ഉറവിടം:</span>
                <span className="text-[#8C5B0F]">{article.source_name}</span>
              </div>
              <div className="text-[11px] text-neutral-500 flex flex-wrap items-center gap-2">
                <span>പ്രസിദ്ധീകരിച്ചത്: {new Date(article.original_published_at).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", day: "numeric", month: "short" })}</span>
                <span>•</span>
                <span>ശേഖരിച്ചത്: {new Date(article.collected_at).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</span>
              </div>
            </div>

            <a
              href={article.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-white border border-[#DDD5C5] text-xs font-bold text-[#194B35] hover:bg-[#FAF4E6] transition flex items-center gap-1.5 shadow-xs"
            >
              <span>യഥാർത്ഥ വാർത്ത ({article.source_name})</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#8C5B0F]" />
            </a>
          </div>

          {/* Main Visual */}
          <div className="relative aspect-16/9 rounded-2xl overflow-hidden bg-neutral-900 mb-6">
            <img src={article.image_url} alt={article.title} className="w-full h-full object-cover" />
            <div className="absolute bottom-2 left-3 text-[10px] text-white/80 bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
              ചിത്രം: {article.image_attribution} ({article.image_license})
            </div>
          </div>

          {/* AI Summary Box */}
          <div className="bg-[#FAF4E6] p-5 rounded-2xl border border-[#E8DCBF] mb-6">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#194B35] mb-2 font-serif">
              <Sparkles className="w-4 h-4 text-[#8C5B0F]" />
              <span>എഐ ചുരുക്കരൂപം (AI-Generated Factual Summary)</span>
            </div>
            <p className="text-xs sm:text-sm text-[#252A25] leading-relaxed font-medium">
              {language === "ml" ? article.summary_ml : article.summary}
            </p>
            <div className="mt-3 pt-2.5 border-t border-[#E8DCBF] text-[10px] text-neutral-500 italic">
              {article.ai_disclaimer}
            </div>
          </div>

          {/* Preview Story Content */}
          <div className="prose prose-sm max-w-none text-[#252A25] leading-relaxed mb-6 space-y-3 text-xs sm:text-sm">
            <p>{article.full_content_preview}</p>
          </div>

          {/* Multi-Source Corroboration Section */}
          {article.corroborated_sources && article.corroborated_sources.length > 0 && (
            <div className="mt-6 pt-6 border-t border-neutral-100">
              <h3 className="text-sm font-bold text-[#194B35] font-serif mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>മറ്റു ഔദ്യോഗിക പബ്ലിഷർമാരുടെ റിപ്പോർട്ടുകൾ ({article.corroborated_sources.length})</span>
              </h3>
              <div className="space-y-2">
                {article.corroborated_sources.map((cs) => (
                  <div key={cs.id} className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs flex items-center justify-between gap-3">
                    <div>
                      <span className="font-bold text-[#194B35] block">{cs.source_name}</span>
                      <p className="text-neutral-600 line-clamp-1">{cs.original_headline}</p>
                    </div>
                    <a
                      href={cs.original_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-[#8C5B0F] hover:underline shrink-0 flex items-center gap-1"
                    >
                      <span>വായിക്കുക</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Corrections Notice (If Any) */}
          {article.corrections && article.corrections.length > 0 && (
            <div className="mt-6 p-4 rounded-2xl bg-amber-50 border border-amber-300 text-xs text-amber-950 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-amber-900">
                <AlertCircle className="w-4 h-4 text-amber-700" />
                <span>തിരുത്ത് / വിശദീകരണം (Correction Notice)</span>
              </div>
              {article.corrections.map((corr) => (
                <div key={corr.id} className="pt-1">
                  <p>{corr.statement_ml || corr.statement}</p>
                  <span className="text-[10px] text-amber-800">
                    പ്രസിദ്ധീകരിച്ചത്: {new Date(corr.published_at).toLocaleDateString()} • എഡിറ്റർ: {corr.editor_name}
                  </span>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
