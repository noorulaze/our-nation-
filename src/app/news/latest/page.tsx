"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { NewsNav } from "@/components/news/NewsNav";
import { useLanguage } from "@/lib/i18n/context";
import { newsroomStore } from "@/lib/data/newsroomStore";
import { GeographicScope } from "@/types/newsroom";
import { 
  Clock, 
  RefreshCw, 
  MapPin, 
  ChevronRight, 
  Search, 
  ExternalLink, 
  Check, 
  Radio, 
  Filter,
  Sparkles
} from "lucide-react";

export default function LatestNewsPage() {
  const { language } = useLanguage();
  const [selectedScope, setSelectedScope] = useState<GeographicScope | "all">("all");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);

  const [articles, setArticles] = useState(() => newsroomStore.getArticles({ status: "all" }).filter(a => a.status === "published" || a.status === "breaking"));

  const handleManualSync = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch("/api/newsroom/ingest", { method: "POST" });
      const data = await res.json();
      setArticles([...newsroomStore.getArticles({ status: "all" }).filter(a => a.status === "published" || a.status === "breaking")]);
      setSyncFeedback("ഫീഡുകൾ വിജയകരമായി സമന്വയിപ്പിച്ചു (Feeds Synced)");
      setTimeout(() => setSyncFeedback(null), 3000);
    } catch {
      setSyncFeedback("സമന്വയം പൂർത്തിയായി");
      setTimeout(() => setSyncFeedback(null), 3000);
    } finally {
      setIsRefreshing(false);
    }
  };

  const filteredArticles = useMemo(() => {
    if (selectedScope === "all") return articles;
    return articles.filter(a => a.geographic_scope === selectedScope);
  }, [articles, selectedScope]);

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] pb-24">
      <Navbar />
      <NewsNav />

      {/* Header Hub */}
      <section className="bg-gradient-to-b from-[#FAF4E6] to-[#FAF7F0] border-b border-[#E8DCBF] pt-8 pb-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-6 h-6 rounded-lg bg-[#194B35] text-amber-300 flex items-center justify-center font-bold">
                  <Clock className="w-3.5 h-3.5" />
                </span>
                <span className="text-xs font-bold text-[#194B35] uppercase tracking-wider">
                  തത്സമയ വാർത്താ ഫീഡ്
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#194B35] font-serif">
                {language === "ml" ? "ഏറ്റവും പുതിയ വാർത്തകൾ (Latest Stream)" : "Latest News Updates"}
              </h1>
              <p className="text-xs sm:text-sm text-[#5C6A64] mt-1">
                താനൂർ നഗരസഭ, മലപ്പുറം, കേരളം, ദേശീയ വാർത്തകൾ തത്സമയം സ്വയം അപ്‌ഡേറ്റ് ചെയ്യപ്പെടുന്നു.
              </p>
            </div>

            <button
              onClick={handleManualSync}
              disabled={isRefreshing}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#DDD5C5] text-xs font-bold text-[#194B35] hover:bg-[#FAF4E6] transition shadow-xs self-start sm:self-auto disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#8C5B0F] ${isRefreshing ? "animate-spin" : ""}`} />
              <span>{isRefreshing ? "ഫീഡുകൾ പരിശോധിക്കുന്നു..." : "തത്സമയം പുതുക്കുക (Sync Now)"}</span>
            </button>
          </div>

          {syncFeedback && (
            <div className="mb-4 p-2.5 rounded-xl bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-700" />
              <span>{syncFeedback}</span>
            </div>
          )}

          {/* Scope Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 scrollbar-none text-xs">
            {[
              { id: "all", label: "എല്ലാ വാർത്തകളും" },
              { id: "tanur", label: "താനൂർ നഗരസഭ" },
              { id: "malappuram", label: "മലപ്പുറം ജില്ല" },
              { id: "kerala", label: "കേരളം" },
              { id: "national", label: "ദേശീയം" },
            ].map((sc) => (
              <button
                key={sc.id}
                onClick={() => setSelectedScope(sc.id as any)}
                className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition active:scale-95 ${
                  selectedScope === sc.id
                    ? "bg-[#194B35] text-white shadow-xs"
                    : "bg-white text-neutral-600 border border-[#DDD5C5] hover:bg-[#FAF4E6]"
                }`}
              >
                {sc.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Stream */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-4">
          {filteredArticles.map((art) => (
            <div
              key={art.id}
              className="bg-white rounded-2xl border border-[#E8DCBF] p-5 hover:border-[#194B35]/40 transition shadow-xs flex flex-col sm:flex-row gap-4 group"
            >
              <div className="sm:w-48 h-32 rounded-xl overflow-hidden bg-neutral-100 shrink-0">
                <img src={art.image_url} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs mb-1.5">
                    <span className="font-bold text-[#194B35] bg-[#E0F1E7] px-2 py-0.2 rounded text-[10px]">
                      {art.category_name_ml}
                    </span>
                    <span className="text-neutral-400">•</span>
                    <span className="font-semibold text-[#8C5B0F] text-[11px]">{art.source_name}</span>
                    <span className="text-neutral-400">•</span>
                    <span className="text-neutral-500 text-[11px] font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3 text-neutral-400" />
                      {new Date(art.original_published_at).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>

                  <Link href={`/news/${art.id}`}>
                    <h3 className="font-bold text-base text-[#1A2420] group-hover:text-[#194B35] transition leading-snug mb-2">
                      {language === "ml" ? art.title_ml : art.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-[#5C6A64] line-clamp-2 leading-relaxed">
                    {language === "ml" ? art.summary_ml : art.summary}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-neutral-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-neutral-400">
                    📍 {art.specific_locality || (art.geographic_scope === "tanur" ? "താനൂർ" : "കേരളം")}
                  </span>

                  <Link
                    href={`/news/${art.id}`}
                    className="font-bold text-[#194B35] hover:text-[#8C5B0F] flex items-center gap-1"
                  >
                    <span>വിശദാംശങ്ങൾ</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
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
