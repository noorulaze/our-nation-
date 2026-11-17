"use client";

import React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { KERALA_NEWS_ARTICLES } from "@/lib/data/keralaNewsData";
import { 
  Calendar, 
  ArrowLeft, 
  Share2, 
  Tag, 
  ExternalLink,
  ChevronRight,
  Newspaper
} from "lucide-react";

export default function SingleNewsPage() {
  const params = useParams();
  const router = useRouter();
  const newsId = params.id as string;

  const article = KERALA_NEWS_ARTICLES.find((a) => a.id === newsId) || KERALA_NEWS_ARTICLES[0];
  const relatedArticles = KERALA_NEWS_ARTICLES.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8">
        
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
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-4 left-4 bg-[#1B4D36] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
              {article.category}
            </span>
          </div>

          <div className="p-6 sm:p-10">
            <div className="flex items-center gap-3 text-xs text-[#7A8880] mb-3 pb-3 border-b border-[#F3EFE6]">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#1B4D36]" />
                <span>{article.date}</span>
              </div>
              <span>•</span>
              <span className="font-semibold text-[#1A2420]">{article.source}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-bold font-malayalam-serif text-[#1B4D36] leading-tight mb-6">
              {article.title}
            </h1>

            <p className="text-sm sm:text-base text-[#3E4D45] leading-relaxed whitespace-pre-line font-malayalam-body">
              {article.fullStory}
            </p>

            <div className="mt-8 pt-6 border-t border-[#E5DFD1] flex items-center justify-between">
              <span className="text-xs text-[#7A8880]">നമ്മുടെ നാട് • വാർത്താ വിഭാഗം</span>
              <button
                type="button"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: article.title, text: article.summary, url: window.location.href });
                  }
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FAF7F0] border border-[#DDD5C5] text-xs font-bold text-[#1B4D36] hover:bg-[#F3EFE6] transition"
              >
                <Share2 className="w-4 h-4" />
                <span>പങ്കുവെക്കുക</span>
              </button>
            </div>
          </div>
        </article>

        {/* Related Articles */}
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
                <div className="h-32 rounded-xl overflow-hidden mb-3">
                  <img src={rel.imageUrl} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
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

      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
