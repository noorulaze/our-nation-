"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { NewsNav } from "@/components/news/NewsNav";
import { useLanguage } from "@/lib/i18n/context";
import { newsroomStore } from "@/lib/data/newsroomStore";
import { 
  MapPin, 
  Building2, 
  Clock, 
  ExternalLink, 
  ChevronRight, 
  CheckCircle2, 
  Search,
  Filter
} from "lucide-react";

export default function LocalNewsPage() {
  const { language } = useLanguage();
  const [filterScope, setFilterScope] = useState<"all" | "tanur" | "malappuram">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const localArticles = useMemo(() => newsroomStore.getLocalNews(), []);

  const filtered = useMemo(() => {
    return localArticles.filter(art => {
      if (filterScope === "tanur" && art.geographic_scope !== "tanur") return false;
      if (filterScope === "malappuram" && art.geographic_scope !== "malappuram") return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          art.title.toLowerCase().includes(q) ||
          art.title_ml.toLowerCase().includes(q) ||
          art.summary.toLowerCase().includes(q) ||
          art.summary_ml.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [localArticles, filterScope, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] pb-24">
      <Navbar />
      <NewsNav />

      {/* Header Hub */}
      <section className="bg-gradient-to-b from-[#FAF4E6] to-[#FAF7F0] border-b border-[#E8DCBF] pt-8 pb-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-6 h-6 rounded-lg bg-[#194B35] text-amber-300 flex items-center justify-center font-bold">
                  <MapPin className="w-3.5 h-3.5" />
                </span>
                <span className="text-xs font-bold text-[#194B35] uppercase tracking-wider">
                  ഹൈപ്പർലോക്കൽ വാർത്തകൾ
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#194B35] font-serif">
                {language === "ml" ? "താനൂർ & മലപ്പുറം പ്രാദേശിക വാർത്തകൾ" : "Tanur & Malappuram Local News"}
              </h1>
              <p className="text-xs sm:text-sm text-[#5C6A64] mt-1 max-w-2xl">
                താനൂർ നഗരസഭയിലെ 44 വാർഡുകളിലെയും മലപ്പുറം ജില്ലയിലെയും വികസന പ്രവർത്തനങ്ങൾ, നഗരസഭാ കൗൺസിൽ തീരുമാനങ്ങൾ, വിദ്യാഭ്യാസ-തൊഴിൽ അറിയിപ്പുകൾ.
              </p>
            </div>

            <div className="text-xs text-neutral-500 font-medium self-start sm:self-auto">
              ആകെ {filtered.length} പ്രാദേശിക വാർത്തകൾ
            </div>
          </div>

          {/* Sub Filters */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3">
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto text-xs">
              <button
                onClick={() => setFilterScope("all")}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition ${
                  filterScope === "all" ? "bg-[#194B35] text-white" : "bg-white text-neutral-600 border border-[#DDD5C5]"
                }`}
              >
                എല്ലാം ({localArticles.length})
              </button>
              <button
                onClick={() => setFilterScope("tanur")}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition ${
                  filterScope === "tanur" ? "bg-[#194B35] text-white" : "bg-white text-neutral-600 border border-[#DDD5C5]"
                }`}
              >
                താനൂർ നഗരസഭ മാത്രം ({localArticles.filter(a => a.geographic_scope === "tanur").length})
              </button>
              <button
                onClick={() => setFilterScope("malappuram")}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition ${
                  filterScope === "malappuram" ? "bg-[#194B35] text-white" : "bg-white text-neutral-600 border border-[#DDD5C5]"
                }`}
              >
                മലപ്പുറം ജില്ല ({localArticles.filter(a => a.geographic_scope === "malappuram").length})
              </button>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="വാർഡിലോ വിഷയത്തിലോ തിരയുക..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white border border-[#DDD5C5] text-xs focus:outline-hidden focus:border-[#194B35]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Local Articles List */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((art) => (
            <div
              key={art.id}
              className="bg-white rounded-3xl border border-[#E8DCBF] p-5 shadow-xs hover:border-[#194B35]/40 transition flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-16/10 rounded-2xl overflow-hidden mb-3 bg-neutral-100">
                  <img src={art.image_url} alt={art.title} className="w-full h-full object-cover group-hover:scale-103 transition duration-300" />
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-[#194B35] text-white shadow-xs">
                    {art.geographic_scope === "tanur" ? "താനൂർ വാർഡ്" : "മലപ്പുറം"}
                  </span>
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
                  <span className="truncate max-w-[150px]">{art.specific_locality || "താനൂർ"}</span>
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
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
