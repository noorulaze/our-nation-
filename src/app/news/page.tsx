"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { NewsNav } from "@/components/news/NewsNav";
import { useLanguage } from "@/lib/i18n/context";
import { 
  newsroomStore, 
  NEWS_CATEGORIES 
} from "@/lib/data/newsroomStore";
import { SmartNewsArticle, NewsCategorySlug } from "@/types/newsroom";
import { 
  Clock, 
  Flame, 
  MapPin, 
  ExternalLink, 
  ChevronRight, 
  Search, 
  Radio, 
  Sparkles, 
  ShieldCheck, 
  Share2, 
  Layers, 
  ArrowRight,
  TrendingUp,
  Bookmark,
  CheckCircle2,
  Newspaper
} from "lucide-react";

export default function NewsHomePage() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<NewsCategorySlug | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const articles = useMemo(() => newsroomStore.getArticles({ status: "all" }).filter(a => a.status === "published" || a.status === "breaking"), []);
  const breakingNews = useMemo(() => newsroomStore.getBreakingNews(), []);
  const localTanurNews = useMemo(() => articles.filter(a => a.geographic_scope === "tanur"), [articles]);
  const malappuramNews = useMemo(() => articles.filter(a => a.geographic_scope === "malappuram"), [articles]);
  const keralaNews = useMemo(() => articles.filter(a => a.geographic_scope === "kerala"), [articles]);
  const nationalGlobalNews = useMemo(() => articles.filter(a => a.geographic_scope === "national" || a.geographic_scope === "international"), [articles]);

  const featuredArticle = articles.find(a => a.featured) || articles[0];

  const filteredArticles = useMemo(() => {
    return articles.filter(a => {
      if (selectedCategory !== "all" && a.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          a.title.toLowerCase().includes(q) ||
          a.title_ml.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.summary_ml.toLowerCase().includes(q) ||
          a.source_name.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [articles, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] pb-24">
      <Navbar />
      <NewsNav />

      {/* ========================================================================= */}
      {/* 1. HEADER BANNER (Matching Design Reference: News & Updates / Stay Informed) */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#194B35] via-[#143E2C] to-[#194B35] text-white py-10 sm:py-14 border-b border-[#C39A5B]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[#F3CE7A] text-xs font-bold border border-white/20 mb-3">
            <Newspaper className="w-3.5 h-3.5" />
            <span>Tanur Municipality — Official Bulletin</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-sans tracking-tight">
            News & Updates
          </h1>
          <p className="mt-1 text-base sm:text-lg font-bold text-[#F3CE7A]">
            Stay Informed
          </p>
          <p className="mt-2 text-xs sm:text-sm text-stone-200 max-w-xl leading-relaxed">
            Verified local news, statutory municipal announcements, council orders, and public notices across Tanur.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. BREAKING NEWS LIVE STRIP */}
      {/* ========================================================================= */}
      {breakingNews.length > 0 && (
        <section className="bg-gradient-to-r from-rose-900 via-rose-800 to-rose-900 text-white py-2.5 px-4 shadow-sm border-b border-rose-950">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="px-2.5 py-0.5 rounded-md bg-rose-600 text-white font-black text-[10px] tracking-wider uppercase flex items-center gap-1 shrink-0 animate-pulse">
                <Flame className="w-3.5 h-3.5 fill-current" />
                <span>ബ്രേക്കിംഗ് ന്യൂസ്</span>
              </span>
              <Link
                href={`/news/${breakingNews[0].id}`}
                className="font-bold hover:underline truncate text-xs sm:text-sm text-white"
              >
                {language === "ml" ? breakingNews[0].title_ml : breakingNews[0].title}
              </Link>
            </div>

            <Link
              href="/news/breaking"
              className="text-[11px] font-bold text-amber-300 hover:text-white shrink-0 flex items-center gap-1"
            >
              <span>എല്ലാ മുന്നറിയിപ്പുകളും</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 1. FEATURED NEWS HERO SECTION */}
      {/* ========================================================================= */}
      {featuredArticle && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
          <div className="bg-white rounded-3xl border border-[#E8DCBF] overflow-hidden shadow-xs hover:border-[#194B35]/40 transition group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              
              {/* Image side */}
              <div className="lg:col-span-7 relative min-h-[280px] sm:min-h-[360px] bg-neutral-900">
                <img
                  src={featuredArticle.image_url}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#194B35] text-amber-300 border border-emerald-500/40 shadow-sm">
                    ⭐ പ്രധാന വാർത്ത (Featured)
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-black/60 text-white backdrop-blur-md">
                    {featuredArticle.category_name_ml}
                  </span>
                </div>
                <div className="absolute bottom-3 left-4 text-[10px] text-white/70">
                  ഉറവിടം: {featuredArticle.image_attribution}
                </div>
              </div>

              {/* Text side */}
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-b from-[#FFFDF7] to-white">
                <div>
                  <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2">
                    <span className="font-bold text-[#194B35]">{featuredArticle.source_name}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#8C5B0F]" />
                      {new Date(featuredArticle.original_published_at).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>

                  <Link href={`/news/${featuredArticle.id}`}>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-[#194B35] font-serif leading-snug group-hover:text-[#8C5B0F] transition mb-3">
                      {language === "ml" ? featuredArticle.title_ml : featuredArticle.title}
                    </h2>
                  </Link>

                  <p className="text-xs sm:text-sm text-[#47554F] leading-relaxed line-clamp-4 mb-4">
                    {language === "ml" ? featuredArticle.summary_ml : featuredArticle.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8DCBF] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-neutral-500">
                    <MapPin className="w-3.5 h-3.5 text-[#8C5B0F]" />
                    <span className="font-medium">{featuredArticle.specific_locality || "താനൂർ / മലപ്പുറം"}</span>
                  </div>

                  <Link
                    href={`/news/${featuredArticle.id}`}
                    className="font-bold text-[#194B35] hover:text-[#8C5B0F] inline-flex items-center gap-1"
                  >
                    <span>പൂർണ്ണരൂപം വായിക്കുക</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SEARCH & CATEGORY FILTER BAR */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Category Chips Scroll */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 scrollbar-none text-xs">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition ${
                selectedCategory === "all"
                  ? "bg-[#194B35] text-white shadow-xs"
                  : "bg-white text-neutral-600 border border-[#DDD5C5] hover:bg-[#FAF4E6]"
              }`}
            >
              എല്ലാ വാർത്തകളും ({articles.length})
            </button>
            {NEWS_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
                  selectedCategory === cat.slug
                    ? "bg-[#194B35] text-white shadow-xs"
                    : "bg-white text-neutral-600 border border-[#DDD5C5] hover:bg-[#FAF4E6]"
                }`}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                <span>{language === "ml" ? cat.name_ml : cat.name}</span>
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="വാർത്തകളിൽ തിരയുക..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white border border-[#DDD5C5] text-xs focus:outline-hidden focus:border-[#194B35]"
            />
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. LOCAL TANUR UPDATES & 5. MALAPPURAM DISTRICT UPDATES (HYPERLOCAL FIRST) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-[#FAF4E6] rounded-3xl p-5 sm:p-7 border border-[#E8DCBF]">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-[#194B35] text-amber-300 flex items-center justify-center font-bold">
                <MapPin className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#194B35] font-serif">
                  താനൂർ നഗരസഭ & മലപ്പുറം ജില്ലാ അപ്‌ഡേറ്റുകൾ
                </h3>
                <p className="text-[11px] text-[#5C6A64]">
                  44 നഗരസഭാ വാർഡുകളിലെയും മലപ്പുറം ജില്ലയിലെയും പ്രാദേശിക വാർത്തകൾ
                </p>
              </div>
            </div>

            <Link
              href="/news/local"
              className="text-xs font-bold text-[#194B35] hover:text-[#8C5B0F] inline-flex items-center gap-1 self-start sm:self-auto"
            >
              <span>പ്രാദേശിക വാർത്തകൾ മാത്രം കാണുക</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...localTanurNews, ...malappuramNews].slice(0, 3).map((art) => (
              <div
                key={art.id}
                className="bg-white rounded-2xl border border-[#E8DCBF] p-4 hover:border-[#194B35]/40 transition shadow-xs flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-16/9 rounded-xl overflow-hidden mb-3 bg-neutral-100">
                    <img src={art.image_url} alt={art.title} className="w-full h-full object-cover group-hover:scale-103 transition duration-300" />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#194B35] text-white">
                      {art.geographic_scope === "tanur" ? "താനൂർ വാർഡ്" : "മലപ്പുറം"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-neutral-400 mb-1.5">
                    <span className="font-semibold text-[#8C5B0F]">{art.source_name}</span>
                    <span>•</span>
                    <span>{new Date(art.original_published_at).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</span>
                  </div>

                  <Link href={`/news/${art.id}`}>
                    <h4 className="font-bold text-sm text-[#1A2420] group-hover:text-[#194B35] transition line-clamp-2 mb-2">
                      {language === "ml" ? art.title_ml : art.title}
                    </h4>
                  </Link>

                  <p className="text-xs text-[#5C6A64] line-clamp-2 leading-relaxed">
                    {language === "ml" ? art.summary_ml : art.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-neutral-400">
                    📍 {art.specific_locality || "താനൂർ"}
                  </span>
                  <Link
                    href={`/news/${art.id}`}
                    className="font-bold text-xs text-[#194B35] hover:text-[#8C5B0F] flex items-center gap-0.5"
                  >
                    <span>വിശദമായി</span>
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. LATEST NEWS FEED & 6. KERALA NEWS & 7. NATIONAL / GLOBAL */}
      {/* ========================================================================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main 2 Cols: Filtered Feed */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DCBF]">
              <h3 className="font-bold text-base text-[#194B35] font-serif flex items-center gap-2">
                <Newspaper className="w-4 h-4 text-[#8C5B0F]" />
                <span>
                  {selectedCategory === "all" ? "പുതിയ വാർത്താ ഫീഡ് (Latest News Feed)" : `${selectedCategory.toUpperCase()} വാർത്തകൾ`}
                </span>
              </h3>
              <span className="text-xs text-neutral-500 font-medium">
                {filteredArticles.length} വാർത്തകൾ
              </span>
            </div>

            <div className="space-y-4">
              {filteredArticles.map((art) => (
                <div
                  key={art.id}
                  className="bg-white rounded-2xl border border-[#E8DCBF] p-4 sm:p-5 hover:border-[#194B35]/40 transition shadow-xs flex flex-col sm:flex-row gap-4 group"
                >
                  <div className="sm:w-44 h-32 rounded-xl overflow-hidden bg-neutral-100 shrink-0">
                    <img src={art.image_url} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs mb-1.5">
                        <span className="font-bold text-[#194B35] bg-[#E0F1E7] px-2 py-0.2 rounded text-[10px]">
                          {art.category_name_ml}
                        </span>
                        <span className="text-neutral-400">•</span>
                        <span className="font-semibold text-neutral-600 text-[11px]">{art.source_name}</span>
                        <span className="text-neutral-400">•</span>
                        <span className="text-neutral-400 text-[11px]">
                          {new Date(art.original_published_at).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>

                      <Link href={`/news/${art.id}`}>
                        <h4 className="font-bold text-sm sm:text-base text-[#1A2420] group-hover:text-[#194B35] transition leading-snug mb-1.5">
                          {language === "ml" ? art.title_ml : art.title}
                        </h4>
                      </Link>

                      <p className="text-xs text-[#5C6A64] line-clamp-2 leading-relaxed">
                        {language === "ml" ? art.summary_ml : art.summary}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
                      {art.corroboration_count > 1 ? (
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          ✓ {art.corroboration_count} ഔദ്യോഗിക ഉറവിടങ്ങൾ സ്ഥിരീകരിച്ചു
                        </span>
                      ) : (
                        <span className="text-[10px] text-neutral-400">
                          ഔദ്യോഗിക വാർത്താക്കുറിപ്പ്
                        </span>
                      )}

                      <Link
                        href={`/news/${art.id}`}
                        className="font-bold text-xs text-[#194B35] hover:text-[#8C5B0F] flex items-center gap-0.5"
                      >
                        <span>വായിക്കുക</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar: Kerala & National Strips & Source Reliability */}
          <div className="space-y-6">

            {/* Quick State & National Digest */}
            <div className="bg-white rounded-3xl border border-[#E8DCBF] p-5 sm:p-6 shadow-xs">
              <h3 className="font-bold text-sm text-[#194B35] font-serif mb-4 pb-2 border-b border-neutral-100 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#8C5B0F]" />
                <span>കേരള & ദേശീയ വാർത്തകൾ</span>
              </h3>

              <div className="space-y-3.5">
                {[...keralaNews, ...nationalGlobalNews].slice(0, 4).map((art) => (
                  <div key={art.id} className="text-xs">
                    <span className="text-[10px] text-[#8C5B0F] font-bold block mb-0.5">
                      {art.category_name_ml} • {art.source_name}
                    </span>
                    <Link href={`/news/${art.id}`} className="font-bold text-[#1A2420] hover:text-[#194B35] line-clamp-2">
                      {language === "ml" ? art.title_ml : art.title}
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Smart Newsroom Transparency Card */}
            <div className="bg-[#FAF4E6] rounded-3xl border border-[#E8DCBF] p-5 text-xs text-[#5C6A64] space-y-2.5">
              <div className="flex items-center gap-2 font-bold text-[#194B35] text-sm font-serif">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>സുതാര്യത & വാസ്തുതാ മാനദണ്ഡം</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                OUR NATION ന്യൂസ്‌റൂം ഔദ്യോഗിക സർക്കാർ ഗസറ്റുകൾ, പി.ഐ.ബി, പി.ആർ.ഡി ലൈവ്, പ്രസാർ ഭാരതി, താനൂർ നഗരസഭ എന്നിവയിൽ നിന്നുള്ള റിപ്പോർട്ടുകൾ എഐ സാങ്കേതികവിദ്യ ഉപയോഗിച്ച് ചുരുക്കി പ്രസിദ്ധീകരിക്കുന്നു. പൂർണ്ണ വാർത്തകൾക്കായി ഒറിജിനൽ പബ്ലിഷർ ലിങ്ക് പരിശോധിക്കുക.
              </p>
            </div>

          </div>

        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
