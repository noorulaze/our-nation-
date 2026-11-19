"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { useLanguage } from "@/lib/i18n/context";
import { useCommunity } from "@/lib/community/context";
import { store } from "@/lib/data/store";
import { 
  Search, 
  Newspaper, 
  Wrench, 
  Calendar, 
  Landmark, 
  GraduationCap, 
  Store, 
  MapPin, 
  Camera, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Star, 
  ChevronRight,
  Filter,
  X,
  Compass,
  Briefcase,
  ShoppingBag
} from "lucide-react";

type ExploreCategory = "all" | "news" | "pros" | "events" | "culture" | "education" | "businesses" | "places";

function ExploreContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || searchParams.get("search") || "";
  const initialCategory = (searchParams.get("cat") as ExploreCategory) || "all";

  const { language } = useLanguage();
  const { currentCommunity } = useCommunity();

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<ExploreCategory>(initialCategory);

  // Retrieve data from store
  const newsList = useMemo(() => store.getNewsArticles(currentCommunity?.id), [currentCommunity?.id]);
  const prosList = useMemo(() => store.getProfessionals(), []);
  const eventsList = useMemo(() => store.getEvents(currentCommunity?.id), [currentCommunity?.id]);
  const cultureList = useMemo(() => store.getCulturalItems(currentCommunity?.id), [currentCommunity?.id]);
  const eduList = useMemo(() => store.getInstitutions(currentCommunity?.id), [currentCommunity?.id]);
  const bizList = useMemo(() => store.getBusinesses(currentCommunity?.id), [currentCommunity?.id]);
  const placesList = useMemo(() => store.getPlaces(currentCommunity?.id), [currentCommunity?.id]);

  // Categories config
  const categories: { id: ExploreCategory; label: string; labelEn: string; icon: any; count: number }[] = [
    { id: "all", label: "എല്ലാം", labelEn: "All", icon: Compass, count: newsList.length + prosList.length + eventsList.length + bizList.length },
    { id: "news", label: "വാർത്തകൾ", labelEn: "News", icon: Newspaper, count: newsList.length },
    { id: "pros", label: "സേവന വിദഗ്ദ്ധർ", labelEn: "Professionals", icon: Wrench, count: prosList.length },
    { id: "events", label: "പരിപാടികൾ", labelEn: "Events", icon: Calendar, count: eventsList.length },
    { id: "businesses", label: "വ്യാപാരങ്ങൾ", labelEn: "Businesses", icon: Store, count: bizList.length },
    { id: "culture", label: "സംസ്കാരം", labelEn: "Culture", icon: Landmark, count: cultureList.length },
    { id: "education", label: "വിദ്യാഭ്യാസം", labelEn: "Education", icon: GraduationCap, count: eduList.length },
    { id: "places", label: "സ്ഥലങ്ങൾ", labelEn: "Places", icon: MapPin, count: placesList.length },
  ];

  // Search filtering
  const qLower = query.trim().toLowerCase();

  const searchResults = useMemo(() => {
    if (!qLower) return null;

    const matchedNews = (selectedCategory === "all" || selectedCategory === "news")
      ? newsList.filter(n => (n.title + " " + (n.title_ml || "") + " " + n.summary + " " + (n.summary_ml || "")).toLowerCase().includes(qLower))
      : [];

    const matchedPros = (selectedCategory === "all" || selectedCategory === "pros")
      ? prosList.filter(p => (p.display_name + " " + (p.display_name_ml || "") + " " + p.category_name + " " + (p.category_name_ml || "") + " " + (p.locality || "") + " " + (p.bio || "")).toLowerCase().includes(qLower))
      : [];

    const matchedEvents = (selectedCategory === "all" || selectedCategory === "events")
      ? eventsList.filter(e => (e.title + " " + (e.title_ml || "") + " " + e.description + " " + e.location_name).toLowerCase().includes(qLower))
      : [];

    const matchedCulture = (selectedCategory === "all" || selectedCategory === "culture")
      ? cultureList.filter(c => (c.name + " " + c.category + " " + c.short_desc + " " + c.full_history).toLowerCase().includes(qLower))
      : [];

    const matchedEdu = (selectedCategory === "all" || selectedCategory === "education")
      ? eduList.filter(ed => (ed.name + " " + ed.name_ml + " " + ed.location + " " + ed.description).toLowerCase().includes(qLower))
      : [];

    const matchedBiz = (selectedCategory === "all" || selectedCategory === "businesses")
      ? bizList.filter(b => (b.name + " " + (b.description || "") + " " + b.category + " " + b.address).toLowerCase().includes(qLower))
      : [];

    const matchedPlaces = (selectedCategory === "all" || selectedCategory === "places")
      ? placesList.filter(pl => (pl.name + " " + pl.description + " " + pl.location_name).toLowerCase().includes(qLower))
      : [];

    const total = matchedNews.length + matchedPros.length + matchedEvents.length + matchedCulture.length + matchedEdu.length + matchedBiz.length + matchedPlaces.length;

    return {
      news: matchedNews,
      pros: matchedPros,
      events: matchedEvents,
      culture: matchedCulture,
      edu: matchedEdu,
      biz: matchedBiz,
      places: matchedPlaces,
      total,
    };
  }, [qLower, selectedCategory, newsList, prosList, eventsList, cultureList, eduList, bizList, placesList]);

  // Primary Feature Hubs for default view
  const primaryHubs = [
    {
      title: language === "ml" ? "പ്രാദേശിക വാർത്തകൾ" : "Local News & Updates",
      subtitle: language === "ml" ? "മലപ്പുറം & താനൂർ സമഗ്ര വാർത്തകൾ" : "Verified district and municipal reports",
      href: "/news",
      icon: Newspaper,
      badge: `${newsList.length} ലേഖനങ്ങൾ`,
      badgeColor: "bg-emerald-100 text-emerald-800",
      accent: "#1B4D36",
    },
    {
      title: language === "ml" ? "സേവന വിദഗ്ദ്ധർ" : "Service Professionals",
      subtitle: language === "ml" ? "ഇലക്ട്രീഷ്യൻ, പ്ലംബർ, എസി റിപ്പയർ..." : "18 categories of verified local trades",
      href: "/professionals",
      icon: Wrench,
      badge: `${prosList.length} വിദഗ്ദ്ധർ`,
      badgeColor: "bg-amber-100 text-amber-800",
      accent: "#B87A1E",
    },
    {
      title: language === "ml" ? "പരിപാടികളും മേളകളും" : "Events & Festivals",
      subtitle: language === "ml" ? "സാംസ്കാരിക, കായിക, സാമൂഹിക പരിപാടികൾ" : "Festivals, town meetings & sports",
      href: "/events",
      icon: Calendar,
      badge: `${eventsList.length} പരിപാടികൾ`,
      badgeColor: "bg-blue-100 text-blue-800",
      accent: "#2563EB",
    },
    {
      title: language === "ml" ? "സംസ്കാരവും പൈതൃകവും" : "Culture & Heritage",
      subtitle: language === "ml" ? "തുഞ്ചൻ പറമ്പ്, മാപ്പിള കലകൾ, തനിമ" : "Historic legacy & authentic traditions",
      href: "/culture",
      icon: Landmark,
      badge: `${cultureList.length} ഇനങ്ങൾ`,
      badgeColor: "bg-purple-100 text-purple-800",
      accent: "#7C3AED",
    },
    {
      title: language === "ml" ? "വിദ്യാഭ്യാസ സ്ഥാപനങ്ങൾ" : "Education & Libraries",
      subtitle: language === "ml" ? "സ്കൂളുകൾ, കോളേജുകൾ, ഗവേഷണ കേന്ദ്രങ്ങൾ" : "Schools, colleges & institutions",
      href: "/education",
      icon: GraduationCap,
      badge: `${eduList.length} സ്ഥാപനങ്ങൾ`,
      badgeColor: "bg-teal-100 text-teal-800",
      accent: "#0D9488",
    },
    {
      title: language === "ml" ? "വ്യാപാര ഡയറക്ടറി" : "Business Directory",
      subtitle: language === "ml" ? "താനൂരിലെ കടകൾ, ക്ലിനിക്കുകൾ, വിപണി" : "Registered local shops & services",
      href: "/tanur/directory",
      icon: Store,
      badge: `${bizList.length} വ്യാപാരങ്ങൾ`,
      badgeColor: "bg-orange-100 text-orange-800",
      accent: "#EA580C",
    },
    {
      title: language === "ml" ? "സ്ഥലങ്ങളും ഗാലറിയും" : "Places & Gallery",
      subtitle: language === "ml" ? "താനൂർ കടപ്പുറം, പ്രകൃതിഭംഗി, ചരിത്രസ്ഥലങ്ങൾ" : "Beaches, heritage & coastal views",
      href: "/gallery",
      icon: Camera,
      badge: `${placesList.length} സ്ഥലങ്ങൾ`,
      badgeColor: "bg-rose-100 text-rose-800",
      accent: "#E11D48",
    },
    {
      title: language === "ml" ? "തൊഴിലവസരങ്ങൾ & അപ്രന്റീസ്ഷിപ്പ്" : "Jobs & Careers",
      subtitle: language === "ml" ? "താനൂരിലെ വ്യാപാര, ഹാർബർ, ക്ലിനിക്ക് തൊഴിലുകൾ" : "Local verified job openings & apprenticeships",
      href: "/jobs",
      icon: Briefcase,
      badge: "8+ ഒഴിവുകൾ",
      badgeColor: "bg-indigo-100 text-indigo-800",
      accent: "#4F46E5",
    },
    {
      title: language === "ml" ? "ബൈ & സെൽ മാർക്കറ്റ്പ്ലേസ്" : "Buy & Sell Marketplace",
      subtitle: language === "ml" ? "മത്സ്യബന്ധന സാമഗ്രികൾ, കാർഷിക വിഭവങ്ങൾ, വാഹനങ്ങൾ" : "Verified local community marketplace",
      href: "/marketplace",
      icon: ShoppingBag,
      badge: "തദ്ദേശീയ ചന്ത",
      badgeColor: "bg-emerald-100 text-emerald-800",
      accent: "#059669",
    },
    {
      title: language === "ml" ? "ജനപ്രതിനിധി (MLA)" : "MLA & Public Leadership",
      subtitle: language === "ml" ? "പി. കെ. നവാസ് — താനൂർ മണ്ഡലം" : "Constituency representation & works",
      href: "/politics/pk-navas",
      icon: ShieldCheck,
      badge: "താനൂർ നിയോജകമണ്ഡലം",
      badgeColor: "bg-emerald-100 text-emerald-900",
      accent: "#1B4D36",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: language === "ml" ? "ഹോം" : "Home", href: "/" },
            { label: language === "ml" ? "കണ്ടെത്തുക (Explore)" : "Explore" },
          ]}
        />

        {/* Hero Banner with Search */}
        <div className="bg-gradient-to-br from-[#1B4D36] to-[#123826] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold text-emerald-200 border border-white/20">
              <Compass className="w-3.5 h-3.5" />
              <span>{language === "ml" ? "ഏകീകൃത തിരച്ചിൽ കേന്ദ്രം" : "Unified Discovery Center"}</span>
            </span>
            <h1 className="text-2xl sm:text-4xl font-bold font-malayalam-serif tracking-tight text-[#FAF7F0]">
              {language === "ml" ? "നാടിന്റെ വിവരങ്ങൾ എല്ലാം ഒരിടത്ത്" : "Everything in OUR NATION at your fingertips"}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-malayalam-body">
              {language === "ml"
                ? "വാർത്തകൾ, സർവീസ് വിദഗ്ദ്ധർ, പരിപാടികൾ, വ്യാപാരങ്ങൾ, സ്കൂളുകൾ, സാംസ്കാരിക കേന്ദ്രങ്ങൾ — നിങ്ങൾക്ക് ആവശ്യമുള്ളതെന്തും എളുപ്പത്തിൽ തിരഞ്ഞു കണ്ടെത്തൂ."
                : "Search across local news, verified service technicians, community events, local shops, education and heritage."}
            </p>

            {/* Universal Search Bar */}
            <div className="pt-2">
              <div className="relative flex items-center bg-white rounded-2xl shadow-lg border border-white/30 overflow-hidden focus-within:ring-3 focus-within:ring-emerald-400/50 transition">
                <Search className="w-5 h-5 text-neutral-400 ml-4 shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={language === "ml" ? "വാർത്തകൾ, വിദഗ്ദ്ധർ, പരിപാടികൾ തിരയൂ..." : "Search news, professionals, events, places..."}
                  className="w-full py-3.5 px-3 text-xs sm:text-sm text-[#1A2420] placeholder-neutral-400 focus:outline-none font-malayalam-body"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="p-2 mr-2 text-neutral-400 hover:text-neutral-700 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 border ${
                  isSelected
                    ? "bg-[#1B4D36] text-white border-[#1B4D36] shadow-xs"
                    : "bg-white text-[#5C6A64] hover:bg-[#F3EFE6] border-[#EAE4D7]"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-emerald-300" : "text-[#7A8880]"}`} />
                <span>{language === "ml" ? cat.label : cat.labelEn}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? "bg-white/20 text-white" : "bg-[#FAF7F0] text-[#7A8880]"}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* CONDITIONAL RENDERING: SEARCH RESULTS vs PRIMARY HUBS */}
        {searchResults ? (
          <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-[#EAE4D7] pb-3">
              <h2 className="text-base sm:text-lg font-bold font-malayalam-serif text-[#1B4D36] flex items-center gap-2">
                <span>{language === "ml" ? "തിരച്ചിൽ ഫലങ്ങൾ" : "Search Results"}</span>
                <span className="text-xs font-normal text-[#7A8880]">({searchResults.total} കണ്ടെത്തി)</span>
              </h2>
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="text-xs text-[#8C5B0F] hover:underline font-semibold"
                >
                  {language === "ml" ? "തിരച്ചിൽ ക്ലിയർ ചെയ്യുക" : "Clear Search"}
                </button>
              )}
            </div>

            {searchResults.total === 0 ? (
              <div className="bg-white rounded-3xl border border-[#EAE4D7] p-10 text-center space-y-3">
                <Sparkles className="w-10 h-10 text-amber-500 mx-auto opacity-70" />
                <h3 className="font-bold text-base text-[#1A2420]">
                  {language === "ml" ? `"${query}" ന് അനുയോജ്യമായ ഫലങ്ങളൊന്നും കണ്ടെത്താനായില്ല.` : `No results found for "${query}".`}
                </h3>
                <p className="text-xs text-[#7A8880] max-w-md mx-auto">
                  {language === "ml"
                    ? "മറ്റൊരു വാക്ക് നൽകി തിരഞ്ഞുനോക്കൂ, അല്ലെങ്കിൽ ചുവടെയുള്ള പ്രധാന വിഭാഗങ്ങൾ പരിശോധിക്കൂ."
                    : "Try searching with different keywords or explore our curated sections below."}
                </p>
                <button
                  onClick={() => setQuery("")}
                  className="px-4 py-2 rounded-xl bg-[#1B4D36] text-white text-xs font-bold hover:bg-[#133A28] transition"
                >
                  {language === "ml" ? "എല്ലാ വിഭാഗങ്ങളും കാണുക" : "Explore All Categories"}
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                
                {/* 1. Professionals Results */}
                {searchResults.pros.length > 0 && (
                  <section className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-[#1B4D36] uppercase tracking-wider flex items-center gap-2">
                        <Wrench className="w-4 h-4 text-[#B87A1E]" />
                        <span>{language === "ml" ? "സേവന വിദഗ്ദ്ധർ" : "Professionals"} ({searchResults.pros.length})</span>
                      </h3>
                      <Link href="/professionals" className="text-xs font-bold text-[#1B4D36] hover:underline">
                        {language === "ml" ? "എല്ലാം കാണുക" : "View All"} →
                      </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {searchResults.pros.map(pro => (
                        <Link
                          key={pro.id}
                          href={`/professionals/${pro.username}`}
                          className="bg-white rounded-2xl border border-[#EAE4D7] p-4 hover:shadow-card hover:border-[#1B4D36]/40 transition group flex items-start gap-3.5"
                        >
                          <img
                            src={pro.avatar_url || "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&auto=format&fit=crop&q=80"}
                            alt={pro.display_name}
                            className="w-14 h-14 rounded-xl object-cover shrink-0 border border-[#EAE4D7]"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1">
                              <h4 className="font-bold text-sm text-[#1A2420] group-hover:text-[#1B4D36] truncate">
                                {language === "ml" && pro.display_name_ml ? pro.display_name_ml : pro.display_name}
                              </h4>
                              {pro.is_verified && <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                            </div>
                            <p className="text-[11px] font-semibold text-[#8C5B0F] truncate">
                              {language === "ml" ? pro.category_name_ml : pro.category_name}
                            </p>
                            <div className="flex items-center gap-2 text-[10px] text-[#7A8880] mt-1">
                              <span>⭐ {pro.rating.toFixed(1)}</span>
                              <span>•</span>
                              <span>📍 {pro.locality || "Tanur"}</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}

                {/* 2. News Results */}
                {searchResults.news.length > 0 && (
                  <section className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-[#1B4D36] uppercase tracking-wider flex items-center gap-2">
                        <Newspaper className="w-4 h-4 text-[#1B4D36]" />
                        <span>{language === "ml" ? "വാർത്തകൾ" : "News Articles"} ({searchResults.news.length})</span>
                      </h3>
                      <Link href="/news" className="text-xs font-bold text-[#1B4D36] hover:underline">
                        {language === "ml" ? "എല്ലാം കാണുക" : "View All"} →
                      </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {searchResults.news.map(article => (
                        <Link
                          key={article.id}
                          href={`/news/${article.id}`}
                          className="bg-white rounded-2xl border border-[#EAE4D7] p-4 hover:shadow-card hover:border-[#1B4D36]/40 transition group flex flex-col justify-between"
                        >
                          <div>
                            <span className="text-[10px] font-bold text-[#1B4D36] bg-[#E0F1E7] px-2 py-0.5 rounded-md">
                              {article.category}
                            </span>
                            <h4 className="font-bold text-sm text-[#1A2420] group-hover:text-[#1B4D36] mt-1.5 line-clamp-2">
                              {language === "ml" && article.title_ml ? article.title_ml : article.title}
                            </h4>
                            <p className="text-xs text-[#5C6A64] mt-1 line-clamp-2">
                              {language === "ml" && article.summary_ml ? article.summary_ml : article.summary}
                            </p>
                          </div>
                          <div className="flex items-center justify-between text-[11px] text-[#7A8880] mt-3 pt-2 border-t border-[#F3EFE6]">
                            <span>{new Date(article.date || article.created_at).toLocaleDateString("ml-IN", { month: "short", day: "numeric" })}</span>
                            <span className="text-[#1B4D36] font-semibold flex items-center gap-0.5">വായിക്കൂ <ChevronRight className="w-3 h-3" /></span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}

                {/* 3. Events Results */}
                {searchResults.events.length > 0 && (
                  <section className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-[#1B4D36] uppercase tracking-wider flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <span>{language === "ml" ? "പരിപാടികൾ" : "Events"} ({searchResults.events.length})</span>
                      </h3>
                      <Link href="/events" className="text-xs font-bold text-[#1B4D36] hover:underline">
                        {language === "ml" ? "എല്ലാം കാണുക" : "View All"} →
                      </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {searchResults.events.map(evt => (
                        <Link
                          key={evt.id}
                          href={`/events/${evt.id}`}
                          className="bg-white rounded-2xl border border-[#EAE4D7] p-4 hover:shadow-card hover:border-[#1B4D36]/40 transition group"
                        >
                          <div className="flex items-start justify-between">
                            <span className="text-[10px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded-md">
                              {evt.category}
                            </span>
                            <span className="text-[10px] text-[#7A8880]">📍 {evt.location_name}</span>
                          </div>
                          <h4 className="font-bold text-sm text-[#1A2420] group-hover:text-[#1B4D36] mt-2">
                            {language === "ml" && evt.title_ml ? evt.title_ml : evt.title}
                          </h4>
                          <p className="text-xs text-[#5C6A64] mt-1 line-clamp-2">{evt.description}</p>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}

                {/* 4. Businesses Results */}
                {searchResults.biz.length > 0 && (
                  <section className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-[#1B4D36] uppercase tracking-wider flex items-center gap-2">
                        <Store className="w-4 h-4 text-orange-600" />
                        <span>{language === "ml" ? "വ്യാപാര സ്ഥാപനങ്ങൾ" : "Businesses"} ({searchResults.biz.length})</span>
                      </h3>
                      <Link href="/tanur/directory" className="text-xs font-bold text-[#1B4D36] hover:underline">
                        {language === "ml" ? "ഡയറക്ടറി കാണുക" : "Directory"} →
                      </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {searchResults.biz.map(b => (
                        <div key={b.id} className="bg-white rounded-2xl border border-[#EAE4D7] p-4 shadow-xs">
                          <span className="text-[10px] font-bold text-orange-800 bg-orange-50 px-2 py-0.5 rounded-md">
                            {b.category}
                          </span>
                          <h4 className="font-bold text-sm text-[#1A2420] mt-1">{b.name}</h4>
                          <p className="text-xs text-[#5C6A64] mt-1 line-clamp-1">{b.address}</p>
                          {b.phone && (
                            <p className="text-xs text-[#1B4D36] font-semibold mt-2">📞 {b.phone}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}
          </div>
        ) : (
          /* DEFAULT VIEW: PRIMARY FEATURE HUBS */
          <div className="space-y-10">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold font-malayalam-serif text-[#1B4D36]">
                    {language === "ml" ? "പ്രധാന മേഖലകൾ പര്യവേക്ഷണം ചെയ്യൂ" : "Explore Featured Domains"}
                  </h2>
                  <p className="text-xs text-[#5C6A64] font-malayalam-body">
                    {language === "ml" ? "നിങ്ങൾക്ക് ആവശ്യമുള്ള വിഭാഗം തിരഞ്ഞെടുക്കൂ." : "Select a domain to access full directories and features."}
                  </p>
                </div>
              </div>

              {/* 8 Primary Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {primaryHubs.map((hub, idx) => {
                  const Icon = hub.icon;
                  return (
                    <Link
                      key={idx}
                      href={hub.href}
                      className="bg-white rounded-2xl border border-[#EAE4D7] p-5 hover:border-[#1B4D36] hover:shadow-card transition-all duration-200 group flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div 
                            className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105"
                            style={{ backgroundColor: `${hub.accent}15`, color: hub.accent }}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${hub.badgeColor}`}>
                            {hub.badge}
                          </span>
                        </div>
                        <h3 className="font-bold text-sm sm:text-base text-[#1A2420] group-hover:text-[#1B4D36] transition font-malayalam-serif">
                          {hub.title}
                        </h3>
                        <p className="text-xs text-[#5C6A64] mt-1 leading-relaxed font-malayalam-body line-clamp-2">
                          {hub.subtitle}
                        </p>
                      </div>

                      <div className="pt-4 mt-3 border-t border-[#F3EFE6] flex items-center justify-between text-xs font-bold text-[#1B4D36]">
                        <span>{language === "ml" ? "തുറക്കുക" : "Explore"}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Quick Spotlight: Verified Services */}
            <div className="bg-[#FAF4E6] rounded-3xl border border-[#E8DCBF] p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <span className="text-[10px] font-bold text-[#8C5B0F] uppercase tracking-wider bg-white/70 px-2.5 py-0.5 rounded-full border border-[#E8DCBF]">
                    {language === "ml" ? "പ്രാദേശിക സേവനങ്ങൾ" : "Local Services"}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold font-malayalam-serif text-[#1B4D36] mt-1.5">
                    {language === "ml" ? "വിശ്വാസ്യരായ സേവന വിദഗ്ദ്ധരെ കണ്ടെത്തൂ" : "Discover Verified Local Professionals"}
                  </h3>
                  <p className="text-xs text-[#5C6A64] mt-0.5">
                    {language === "ml"
                      ? "ഇലക്ട്രിക്കൽ, പ്ലംബിംഗ്, എസി സർവീസ്, പെയിന്റിംഗ്, കാർപെന്റർ സേവനങ്ങൾ വീട്ടുപടിക്കൽ."
                      : "Electricians, plumbers, AC care and more available for instant direct bookings."}
                  </p>
                </div>
                <Link
                  href="/professionals"
                  className="px-4 py-2.5 rounded-xl bg-[#1B4D36] hover:bg-[#133A28] text-white text-xs font-bold transition flex items-center gap-1.5 self-start sm:self-center shrink-0 shadow-xs"
                >
                  <span>{language === "ml" ? "എല്ലാ വിദഗ്ദ്ധരെയും കാണുക" : "Browse All"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* 3 Featured Pros */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {prosList.slice(0, 3).map((pro) => (
                  <Link
                    key={pro.id}
                    href={`/professionals/${pro.username}`}
                    className="bg-white rounded-2xl border border-[#DDD5C5] p-4 hover:shadow-md transition group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={pro.avatar_url || "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&auto=format&fit=crop&q=80"}
                        alt={pro.display_name}
                        className="w-12 h-12 rounded-xl object-cover shrink-0 border border-[#EAE4D7]"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1">
                          <h4 className="font-bold text-xs sm:text-sm text-[#1A2420] group-hover:text-[#1B4D36] truncate">
                            {language === "ml" && pro.display_name_ml ? pro.display_name_ml : pro.display_name}
                          </h4>
                          {pro.is_verified && <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                        </div>
                        <p className="text-[11px] text-[#8C5B0F] font-semibold truncate">
                          {language === "ml" ? pro.category_name_ml : pro.category_name}
                        </p>
                        <p className="text-[10px] text-[#7A8880]">
                          ⭐ {pro.rating.toFixed(1)} • {pro.locality || "Tanur"}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
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

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7F0] flex items-center justify-center text-xs text-[#7A8880]">ലോഡ് ചെയ്യുന്നു...</div>}>
      <ExploreContent />
    </Suspense>
  );
}
