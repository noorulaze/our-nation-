"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/lib/i18n/context";
import { 
  Calendar, 
  ArrowRight, 
  Search, 
  ExternalLink, 
  Share2, 
  TrendingUp,
  Newspaper,
  ChevronRight,
  X
} from "lucide-react";
import { NewsArticle, KERALA_NEWS_ARTICLES } from "@/lib/data/keralaNewsData";

export default function NewsPage() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("എല്ലാം");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeArticleModal, setActiveArticleModal] = useState<NewsArticle | null>(null);

  const categories = ["എല്ലാം", "കേരളം", "വിദ്യാഭ്യാസം", "സർക്കാർ", "രാഷ്ട്രീയം", "കായികം"];

  const filteredNews = useMemo(() => {
    return KERALA_NEWS_ARTICLES.filter((item) => {
      const matchCat = selectedCategory === "എല്ലാം" || item.category === selectedCategory;
      const matchSearch = (item.title + " " + item.summary + " " + item.fullStory)
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
      <Navbar />

      <main className="flex-1">
        
        {/* ========================================================================= */}
        {/* HERO BANNER: Row 1, Col 3 in reference image (Newspaper visual) */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden pt-4 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="relative rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-elevated border border-[#E7DFD0] min-h-[340px] sm:min-h-[380px] flex items-center bg-[#1B4D36]">
            
            {/* Background Image: Malayalam Newspaper on wood / desk */}
            <div 
              className="absolute inset-0 bg-cover bg-right sm:bg-center opacity-45 mix-blend-luminosity"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1600&auto=format&fit=crop&q=80')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1B4D36] via-[#1B4D36]/80 to-transparent" />

            {/* Left Content */}
            <div className="relative z-10 p-6 sm:p-12 lg:p-16 max-w-2xl text-white">
              <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-amber-200 text-xs font-bold mb-3">
                ലൈവ് വാർത്തകൾ
              </span>
              <h1 className="text-4xl sm:text-6xl font-bold font-malayalam-serif tracking-tight leading-none mb-3">
                വാർത്തകൾ
              </h1>
              <p className="text-lg sm:text-2xl font-bold font-malayalam-script text-amber-200 mb-3">
                നാടിന്റെ പുതിയ വാർത്തകൾ അറിയാം...
              </p>
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-malayalam-body max-w-md">
                കേരളത്തിലെ സമകാലിക സംഭവങ്ങൾ, സർക്കാർ അറിയിപ്പുകൾ, വിദ്യാഭ്യാസ വാർത്തകൾ, കായികം എന്നിവ തത്സമയം.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* FILTER BAR & SEARCH */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Category Pills */}
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none w-full sm:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition active:scale-95 whitespace-nowrap shadow-xs ${
                    selectedCategory === cat
                      ? "bg-[#1B4D36] text-white"
                      : "bg-white hover:bg-[#F3EFE6] text-[#3D4B44] border border-[#DDD5C5]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#7A8880]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="വാർത്തകളിൽ തിരയുക..."
                className="w-full pl-10 pr-4 py-2 rounded-full text-xs bg-white border border-[#DDD5C5] text-[#1A2420] focus:outline-none focus:ring-2 focus:ring-[#1B4D36]"
              />
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* MAIN LAYOUT: News List on Left + Sidebar on Right (Matching Reference) */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: News Items List (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              
              {filteredNews.length === 0 ? (
                <div className="bg-white rounded-3xl border border-[#EAE4D7] p-12 text-center">
                  <Newspaper className="w-12 h-12 text-[#B87A1E] mx-auto mb-3 opacity-60" />
                  <h3 className="font-bold text-base text-[#1A2420]">വാർത്തകൾ ഒന്നും കണ്ടെത്തിയില്ല</h3>
                  <p className="text-xs text-[#7A8880] mt-1">മറ്റു വാക്കുകൾ ഉപയോഗിച്ച് തിരയുക.</p>
                </div>
              ) : (
                filteredNews.map((news) => (
                  <div
                    key={news.id}
                    onClick={() => setActiveArticleModal(news)}
                    className="bg-white rounded-3xl border border-[#EAE4D7] p-4 sm:p-5 shadow-card hover:border-[#1B4D36]/60 transition flex flex-col sm:flex-row gap-4 cursor-pointer group"
                  >
                    {/* Thumbnail Image */}
                    <div className="sm:w-44 h-36 sm:h-28 rounded-2xl overflow-hidden flex-shrink-0 bg-[#E5DDD0]">
                      <img
                        src={news.imageUrl}
                        alt={news.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-[10px] font-bold text-[#1B4D36] bg-[#E0F1E7] px-2 py-0.5 rounded-full border border-[#BDE3CE]">
                            {news.category}
                          </span>
                          <span className="text-[11px] text-[#7A8880] flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-[#1B4D36]" /> {news.date}
                          </span>
                        </div>
                        <h3 className="font-bold font-malayalam-serif text-base sm:text-lg text-[#1A2420] group-hover:text-[#1B4D36] transition leading-snug">
                          {news.title}
                        </h3>
                        <p className="text-xs text-[#5C6A64] mt-1.5 line-clamp-2 leading-relaxed font-malayalam-body">
                          {news.summary}
                        </p>
                      </div>

                      <div className="pt-2 flex items-center justify-between text-xs font-bold text-[#1B4D36]">
                        <span className="text-[11px] text-[#7A8880] font-normal">{news.source}</span>
                        <span className="group-hover:underline flex items-center gap-1">
                          പൂർണ്ണമായി വായിക്കുക <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}

            </div>

            {/* Right Column: Important Links & Quote Card (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Important Links Card */}
              <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 shadow-card">
                <h3 className="font-bold font-malayalam-serif text-base text-[#1A2420] mb-4 pb-3 border-b border-[#F3EFE6] flex items-center justify-between">
                  <span>മുഖ്യപ്പെട്ട ലിങ്കുകൾ</span>
                  <ExternalLink className="w-4 h-4 text-[#1B4D36]" />
                </h3>

                <ul className="space-y-3">
                  {[
                    { title: "സർക്കാർ പോർട്ടൽ", href: "https://kerala.gov.in" },
                    { title: "കേരള ടൂറിസം", href: "https://www.keralatourism.org" },
                    { title: "വിദ്യാഭ്യാസ വകുപ്പ്", href: "/education" },
                    { title: "ആരോഗ്യ വകുപ്പ്", href: "https://dhs.kerala.gov.in" },
                    { title: "കൃഷി വകുപ്പ്", href: "https://keralaagriculture.gov.in" },
                  ].map((link, idx) => (
                    <li key={idx}>
                      <a
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : "_self"}
                        rel="noreferrer"
                        className="p-3 rounded-2xl bg-[#FAF7F0] hover:bg-[#F3EFE6] border border-[#EAE4D7] flex items-center justify-between text-xs font-bold text-[#1B4D36] transition group"
                      >
                        <span>{link.title}</span>
                        <ChevronRight className="w-4 h-4 text-[#7A8880] group-hover:translate-x-1 group-hover:text-[#1B4D36] transition" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Inspiration Quote Card (Row 1, Col 3 in reference image) */}
              <div className="bg-[#FAF4E6] rounded-3xl border border-[#E8DCBF] p-6 shadow-card text-center relative overflow-hidden">
                <div className="w-10 h-10 rounded-full bg-[#B87A1E]/15 text-[#B87A1E] flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <p className="font-malayalam-script text-xl sm:text-2xl font-bold text-[#8C5B0F] leading-snug">
                  &quot;നാട് അറിയുമ്പോൾ നാം കൂടുതൽ ശക്തരാകും.&quot;
                </p>
                <span className="text-[11px] font-bold text-[#A87B2E] uppercase tracking-wider block mt-2">
                  നമ്മുടെ നാട് • കേരളം
                </span>
              </div>

            </div>

          </div>
        </section>

      </main>

      {/* ========================================================================= */}
      {/* FULL ARTICLE MODAL */}
      {/* ========================================================================= */}
      {activeArticleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[#FAF7F0] rounded-3xl border border-[#E7DFD0] max-w-2xl w-full shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="relative h-60 w-full flex-shrink-0 bg-neutral-900">
              <img
                src={activeArticleModal.imageUrl}
                alt={activeArticleModal.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setActiveArticleModal(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
              <span className="absolute bottom-4 left-4 bg-[#1B4D36] text-white text-xs font-bold px-3 py-1 rounded-full">
                {activeArticleModal.category}
              </span>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto flex-1">
              <div className="flex items-center gap-2 text-xs text-[#7A8880] mb-2">
                <Calendar className="w-3.5 h-3.5 text-[#1B4D36]" />
                <span>{activeArticleModal.date}</span>
                <span>•</span>
                <span>{activeArticleModal.source}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold font-malayalam-serif text-[#1B4D36] mb-4 leading-snug">
                {activeArticleModal.title}
              </h2>

              <p className="text-xs sm:text-sm text-[#3E4D45] leading-relaxed whitespace-pre-line font-malayalam-body">
                {activeArticleModal.fullStory}
              </p>

              <div className="mt-8 pt-4 border-t border-[#E5DFD1] flex items-center justify-between">
                <span className="text-xs text-[#7A8880]">നമ്മുടെ നാട് വാർത്താ ശൃംഖല</span>
                <button
                  type="button"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: activeArticleModal.title, text: activeArticleModal.summary, url: window.location.href });
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#DDD5C5] text-xs font-bold text-[#1B4D36] hover:bg-[#F3EFE6] transition"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>പങ്കുവെക്കുക</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <BottomNav />
    </div>
  );
}
