"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { TanurNav } from "@/components/tanur/TanurNav";
import { TANUR_NEWS_DATA, TanurNewsItem } from "@/lib/data/tanurData";
import {
  Newspaper,
  Calendar,
  MapPin,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  ExternalLink,
  X,
  Filter,
} from "lucide-react";

export default function TanurNewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeArticleModal, setActiveArticleModal] = useState<TanurNewsItem | null>(null);

  const categories = [
    { key: "all", label: "എല്ലാ വാർത്തകളും (All)" },
    { key: "harbour", label: "തുറമുഖം & വികസനം (Harbour)" },
    { key: "environment", label: "പരിസ്ഥിതി (Environment)" },
    { key: "culture", label: "സാംസ്കാരികം (Culture & Events)" },
  ];

  const filteredNews = TANUR_NEWS_DATA.filter((n) => {
    if (selectedCategory === "all") return true;
    return n.category === selectedCategory;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
      <Navbar />
      <TanurNav />

      <main className="flex-1 pb-16">
        {/* Hero Section */}
        <section className="relative h-[260px] sm:h-[340px] overflow-hidden flex items-end">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#081B12] via-[#0E2C1E]/80 to-black/40" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8 sm:pb-10 text-white">
            <div className="flex items-center gap-2 text-xs font-medium text-amber-200/90 mb-2">
              <Link href="/tanur" className="hover:underline">
                താനൂർ
              </Link>
              <span>/</span>
              <span>വാർത്തകളും അറിയിപ്പുകളും</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold text-amber-300 mb-2">
              <Newspaper className="w-3.5 h-3.5" />
              <span>പ്രാദേശിക വാർത്തകൾ & സംഭവങ്ങൾ</span>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-malayalam-heading">
              താനൂർ വാർത്തകളും പരിപാടികളും
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-stone-200 font-malayalam-body max-w-2xl leading-relaxed">
              ഹാർബർ നവീകരണം, നഗരസഭാ പദ്ധതികൾ, സാംസ്കാരിക പരിപാടികൾ, പരിസ്ഥിതി പ്രവർത്തനങ്ങൾ.
            </p>
          </div>
        </section>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12 space-y-8">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2">
            {categories.map((c) => (
              <button
                key={c.key}
                onClick={() => setSelectedCategory(c.key)}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-malayalam-heading transition whitespace-nowrap ${
                  selectedCategory === c.key
                    ? "bg-[#1B4D36] text-white shadow-sm"
                    : "bg-white text-[#5C6A64] hover:text-[#1A2420] border border-[#EDE6D8]"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* News Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredNews.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-[#EDE6D8] overflow-hidden shadow-card hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-stone-200">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[11px] font-bold text-[#1B4D36]">
                      {item.category_ml}
                    </div>
                    {item.isOfficial && (
                      <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-[#1B4D36] text-white text-[10px] font-bold flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        ഔദ്യോഗികം
                      </div>
                    )}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="text-[11px] text-stone-200 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{item.date}</span>
                        <span>•</span>
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 space-y-2.5">
                    <h3 className="text-base sm:text-lg font-bold font-malayalam-heading text-[#1A2420] group-hover:text-[#1B4D36] transition leading-snug">
                      {item.title_ml}
                    </h3>
                    <p className="text-xs text-[#5C6A64] font-malayalam-body line-clamp-3 leading-relaxed">
                      {item.summary_ml}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-[#F0EBE0] flex items-center justify-between text-xs text-[#7A8880]">
                    <span className="truncate max-w-[150px]">{item.source}</span>
                    <button
                      onClick={() => setActiveArticleModal(item)}
                      className="font-bold text-[#1B4D36] hover:underline flex items-center gap-1 text-[11px]"
                    >
                      <span>വായിക്കാം</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal for Article Reading */}
        {activeArticleModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-3xl border border-[#EDE6D8] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
              <button
                onClick={() => setActiveArticleModal(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-60 w-full bg-stone-200">
                <img
                  src={activeArticleModal.imageUrl}
                  alt={activeArticleModal.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <span className="px-3 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-[11px] font-bold">
                    {activeArticleModal.category_ml}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black font-malayalam-heading mt-1">
                    {activeArticleModal.title_ml}
                  </h3>
                  <div className="text-xs text-stone-200 mt-1 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{activeArticleModal.date}</span>
                    <span>•</span>
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{activeArticleModal.location}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-4 font-malayalam-body">
                <p className="text-xs sm:text-sm font-semibold text-[#1A2420] leading-relaxed">
                  {activeArticleModal.summary_ml}
                </p>
                <div className="text-xs sm:text-sm text-[#4A5752] leading-relaxed space-y-3 pt-2 border-t border-[#F0EBE0]">
                  <p>{activeArticleModal.fullContent_ml}</p>
                  <p className="text-xs text-[#7A8880] italic pt-2 border-t border-[#F5F1E8]">
                    &ldquo;{activeArticleModal.fullContent}&rdquo;
                  </p>
                </div>
                <div className="pt-3 border-t border-[#F0EBE0] flex items-center justify-between text-xs text-[#7A8880]">
                  <span>ഉറവിടം: <strong className="text-[#1A2420]">{activeArticleModal.source}</strong></span>
                  {activeArticleModal.isOfficial && (
                    <span className="text-[#1B4D36] font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      സ്ഥിരീകരിച്ച ഔദ്യോഗിക വാർത്ത
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
