"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { NewsNav } from "@/components/news/NewsNav";
import { useLanguage } from "@/lib/i18n/context";
import { 
  newsroomStore, 
  NEWS_CATEGORIES 
} from "@/lib/data/newsroomStore";
import { NewsCategorySlug } from "@/types/newsroom";
import { 
  ArrowLeft, 
  Clock, 
  MapPin, 
  ChevronRight, 
  ExternalLink, 
  Layers, 
  Search,
  CheckCircle2,
  Tag
} from "lucide-react";

export default function NewsCategoryArchivePage() {
  const params = useParams();
  const { language } = useLanguage();
  const categorySlug = (params?.category as string) || "local";
  const [searchQuery, setSearchQuery] = useState("");

  const category = NEWS_CATEGORIES.find(c => c.slug === categorySlug) || {
    id: "cat-default",
    slug: categorySlug as NewsCategorySlug,
    name: categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1) + " News",
    name_ml: `${categorySlug} വാർത്തകൾ`,
    description: `Latest news and updates for ${categorySlug}`,
    description_ml: `${categorySlug} സംബന്ധമായ വാർത്തകൾ`,
    icon: "Layers",
    color: "#194B35",
    display_order: 1,
    article_count: 5,
  };

  const allArticles = useMemo(() => newsroomStore.getArticles({ status: "all" }).filter(a => a.status === "published" || a.status === "breaking"), []);
  
  const categoryArticles = useMemo(() => {
    return allArticles.filter(a => a.category === categorySlug);
  }, [allArticles, categorySlug]);

  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) return categoryArticles;
    const q = searchQuery.toLowerCase();
    return categoryArticles.filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.title_ml.toLowerCase().includes(q) ||
      a.summary.toLowerCase().includes(q)
    );
  }, [categoryArticles, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] pb-24">
      <Navbar />
      <NewsNav />

      {/* Header Hub */}
      <section className="bg-gradient-to-b from-[#FAF4E6] to-[#FAF7F0] border-b border-[#E8DCBF] pt-8 pb-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#194B35] hover:text-[#8C5B0F] transition mb-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>എല്ലാ വാർത്തകളിലേക്കും മടങ്ങുക</span>
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-xs"
                style={{ backgroundColor: category.color }}
              >
                <Tag className="w-6 h-6" />
              </span>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#194B35] font-serif">
                  {language === "ml" ? category.name_ml : category.name}
                </h1>
                <p className="text-xs sm:text-sm text-[#5C6A64] mt-0.5">
                  {language === "ml" ? category.description_ml : category.description}
                </p>
              </div>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="ഈ വിഭാഗത്തിൽ തിരയുക..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white border border-[#DDD5C5] text-xs focus:outline-hidden focus:border-[#194B35]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Articles Feed */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredArticles.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#E8DCBF] p-10 text-center max-w-md mx-auto shadow-xs my-8">
            <Tag className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
            <h3 className="font-bold text-base text-[#194B35] font-serif mb-1">
              ഈ വിഭാഗത്തിൽ വാർത്തകളൊന്നും കണ്ടെത്തിയില്ല
            </h3>
            <p className="text-xs text-neutral-500 mb-4">
              തിരച്ചിൽ വാക്ക് പുനഃക്രമീകരിക്കുക അല്ലെങ്കിൽ പ്രധാന വാർത്താ പേജിലേക്ക് മടങ്ങുക.
            </p>
            <Link
              href="/news"
              className="px-4 py-2 rounded-xl bg-[#194B35] text-white text-xs font-bold hover:bg-[#143E2C] transition inline-block"
            >
              പ്രധാന വാർത്തകൾ കാണുക
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((art) => (
              <div
                key={art.id}
                className="bg-white rounded-3xl border border-[#E8DCBF] p-5 shadow-xs hover:border-[#194B35]/40 transition flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-16/10 rounded-2xl overflow-hidden mb-3 bg-neutral-100">
                    <img src={art.image_url} alt={art.title} className="w-full h-full object-cover group-hover:scale-103 transition duration-300" />
                  </div>

                  <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1.5">
                    <span className="font-bold text-[#8C5B0F]">{art.source_name}</span>
                    <span>•</span>
                    <span>{new Date(art.original_published_at).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</span>
                  </div>

                  <Link href={`/news/${art.id}`}>
                    <h3 className="font-bold text-sm sm:text-base text-[#1A2420] group-hover:text-[#194B35] transition leading-snug mb-2 line-clamp-2">
                      {language === "ml" ? art.title_ml : art.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-[#5C6A64] line-clamp-3 leading-relaxed mb-3">
                    {language === "ml" ? art.summary_ml : art.summary}
                  </p>
                </div>

                <div className="mt-2 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-neutral-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#8C5B0F]" />
                    <span className="truncate max-w-[140px]">{art.specific_locality || "കേരളം"}</span>
                  </span>

                  <Link
                    href={`/news/${art.id}`}
                    className="font-bold text-xs text-[#194B35] hover:text-[#8C5B0F] flex items-center gap-1"
                  >
                    <span>വിശദാംശങ്ങൾ</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
