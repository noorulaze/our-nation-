"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { store } from "@/lib/data/store";
import { 
  Calendar, 
  ArrowLeft, 
  Share2, 
  Tag, 
  ExternalLink, 
  ChevronRight, 
  Newspaper, 
  Clock, 
  User, 
  Check, 
  ShieldCheck, 
  Info,
  CheckCircle2
} from "lucide-react";

export default function SingleNewsPage() {
  const params = useParams();
  const router = useRouter();
  const newsId = params?.id as string;
  const [copied, setCopied] = useState(false);

  const allArticles = useMemo(() => store.getNewsArticles(), []);
  const article = allArticles.find((a) => a.id === newsId) || allArticles[0];
  const relatedArticles = allArticles.filter((a) => a.id !== article?.id).slice(0, 3);

  const handleShare = async () => {
    if (!article) return;
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ 
          title: article.title, 
          text: article.summary, 
          url: window.location.href 
        });
      } catch (err) {
        // user cancelled or fallback
      }
    } else if (typeof navigator !== "undefined") {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
        <Navbar />
        <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-16 text-center">
          <h1 className="text-2xl font-bold text-[#1B4D36] mb-4">വാർത്ത കണ്ടെത്താനായില്ല</h1>
          <p className="text-sm text-[#5C6E64] mb-6">നിങ്ങൾ തിരഞ്ഞ വാർത്ത നിലവിലില്ല അല്ലെങ്കിൽ നീക്കം ചെയ്യപ്പെട്ടു.</p>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1B4D36] text-white text-sm font-semibold hover:bg-[#153D2A] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>വാർത്തകളിലേക്ക് മടങ്ങുക</span>
          </Link>
        </main>
        <Footer />
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6">
        
        {/* Breadcrumbs */}
        <div className="mb-4">
          <Breadcrumbs
            items={[
              { label: "വാർത്തകൾ (News)", href: "/news" },
              { label: article.title },
            ]}
          />
        </div>

        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B4D36] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>എല്ലാ വാർത്തകളിലേക്കും മടങ്ങുക</span>
          </Link>
        </div>

        {/* Main Article Container */}
        <article className="bg-white rounded-3xl border border-[#EAE4D7] shadow-card overflow-hidden mb-12">
          
          {/* Hero Image */}
          <div className="h-72 sm:h-96 w-full relative bg-neutral-900">
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
              <span className="bg-[#1B4D36] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                {article.category}
              </span>
              {article.is_verified && (
                <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Source</span>
                </span>
              )}
            </div>
            {article.image_license && (
              <span className="absolute bottom-2 right-3 text-[10px] text-white/80 bg-black/60 px-2 py-0.5 rounded-sm backdrop-blur-xs">
                Image: {article.image_license} {article.image_attribution ? `• ${article.image_attribution}` : ""}
              </span>
            )}
          </div>

          <div className="p-6 sm:p-10">
            {/* Meta bar */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#7A8880] mb-4 pb-4 border-b border-[#F3EFE6]">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#1B4D36]" />
                <span>{article.date}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#1B4D36]" />
                <span className="font-semibold text-[#1A2420]">{article.source_name || article.source || "നമ്മുടെ നാട് ഡെസ്ക്"}</span>
              </div>
              {article.read_time && (
                <>
                  <span>•</span>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#1B4D36]" />
                    <span>{article.read_time}</span>
                  </div>
                </>
              )}
              {article.verified_at && (
                <>
                  <span>•</span>
                  <div className="flex items-center gap-1 text-emerald-700 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>പരിശോധിച്ചത്: {article.verified_at}</span>
                  </div>
                </>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-bold font-malayalam-serif text-[#1B4D36] leading-tight mb-6">
              {article.title}
            </h1>

            {/* Official Source Callout if available */}
            {article.source_url && (
              <div className="mb-6 p-4 rounded-2xl bg-[#F4F9F5] border border-emerald-200/80 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-emerald-950">ഔദ്യോഗിക പ്രൈമറി വിവര സ്രോതസ്സ്</h4>
                    <p className="text-xs text-emerald-800 mt-0.5">
                      ഈ വാർത്ത {article.source_name || "ഔദ്യോഗിക പോർട്ടൽ"} നൽകിയ വിവരങ്ങളുമായി പരിശോധിച്ചുറപ്പുവരുത്തിയിട്ടുണ്ട്.
                    </p>
                  </div>
                </div>
                <a
                  href={article.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition flex-shrink-0"
                >
                  <span>മൂലരേഖ കാണുക</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

            <div className="prose prose-stone max-w-none">
              <p className="text-sm sm:text-base text-[#3E4D45] leading-relaxed whitespace-pre-line font-malayalam-body">
                {article.full_story || article.summary}
              </p>
            </div>

            {/* Verification Footer Box */}
            <div className="mt-8 pt-6 border-t border-[#E5DFD1] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#E5DDD0] text-[#1B4D36] font-bold text-xs flex items-center justify-center">
                  NN
                </div>
                <div>
                  <span className="text-xs font-bold text-[#1A2420] block">നമ്മുടെ നാട് വാർത്താ വിഭാഗം</span>
                  <span className="text-[10px] text-[#7A8880]">മലപ്പുറം & താനൂർ ഡാറ്റാ വെരിഫിക്കേഷൻ സിസ്റ്റം</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {copied && (
                  <span className="text-xs text-[#1B4D36] font-semibold animate-in fade-in">
                    ലിങ്ക് കോപ്പി ചെയ്തു!
                  </span>
                )}
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FAF7F0] border border-[#DDD5C5] text-xs font-bold text-[#1B4D36] hover:bg-[#F3EFE6] transition active:scale-95"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                  <span>{copied ? "കോപ്പി ചെയ്തു" : "പങ്കുവെക്കുക"}</span>
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mb-12">
            <h3 className="text-xl font-bold font-malayalam-serif text-[#1B4D36] mb-4">
              മറ്റു പ്രധാന വാർത്തകൾ
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/news/${rel.id}`}
                  className="bg-white rounded-2xl border border-[#EAE4D7] p-4 shadow-xs hover:border-[#1B4D36]/60 transition flex flex-col justify-between group"
                >
                  <div className="h-32 rounded-xl overflow-hidden mb-3 bg-neutral-900">
                    <img 
                      src={rel.image_url} 
                      alt={rel.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition" 
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#1B4D36] bg-[#E0F1E7] px-2 py-0.5 rounded-full">
                      {rel.category}
                    </span>
                    <h4 className="font-bold text-xs sm:text-sm text-[#1A2420] mt-2 group-hover:text-[#1B4D36] transition line-clamp-2">
                      {rel.title}
                    </h4>
                  </div>
                  <div className="text-[10px] text-[#7A8880] mt-2 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#1B4D36]" /> {rel.date}
                  </div>
                </Link>
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
