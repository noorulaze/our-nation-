"use client";

import React, { useState, useMemo } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { useLanguage } from "@/lib/i18n/context";
import { useAuth } from "@/lib/auth/context";
import { store } from "@/lib/data/store";
import { ProfessionalProfile } from "@/types/database";
import Link from "next/link";
import { 
  Search, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Bookmark, 
  ArrowRight, 
  Filter, 
  Wrench, 
  Zap, 
  Hammer, 
  Fan, 
  Paintbrush, 
  Building2, 
  Sparkles, 
  ShieldAlert, 
  HeartHandshake, 
  Baby, 
  Camera, 
  Laptop, 
  Smartphone, 
  GraduationCap, 
  Video, 
  Scissors, 
  Car, 
  PartyPopper,
  Briefcase,
  Clock,
  Check,
  CheckCircle2,
  Calendar
} from "lucide-react";

const CATEGORY_ICON_MAP: Record<string, any> = {
  Zap,
  Wrench,
  Hammer,
  Fan,
  Paintbrush,
  Building2,
  Sparkles,
  ShieldAlert,
  HeartHandshake,
  Baby,
  Camera,
  Laptop,
  Smartphone,
  GraduationCap,
  Video,
  Scissors,
  Car,
  PartyPopper,
};

const MALAPPURAM_LOCALITIES = [
  "All Localities (എല്ലാ പ്രദേശങ്ങളും)",
  "Tanur Municipality",
  "Tanur Beach Ward",
  "Rayirimangalam",
  "Kettungal",
  "Meenadathur",
  "Tirur",
  "Kottakkal",
  "Ponnani",
  "Parappanangadi",
  "Malappuram Town",
];

export default function ProfessionalsDirectoryPage() {
  const { t, language } = useLanguage();
  const { user } = useAuth();

  const categories = store.getServiceCategories();
  const allPros = store.getProfessionals();

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>("all");
  const [selectedLocality, setSelectedLocality] = useState<string>("All Localities (എല്ലാ പ്രദേശങ്ങളും)");
  const [minRating, setMinRating] = useState<number>(0);
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<"rating" | "reviews" | "price_asc" | "price_desc">("rating");

  // Saved state
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    return user ? store.getSavedProfessionals(user.id).map(p => p.id) : [];
  });

  const handleToggleSave = (proId: string) => {
    if (!user) {
      alert("സേവന ദാതാക്കളെ സൂക്ഷിക്കാൻ ദയവായി ലോഗിൻ ചെയ്യുക (Please login to save).");
      return;
    }
    const isNowSaved = store.toggleSaveProfessional(user.id, proId);
    if (isNowSaved) {
      setSavedIds([...savedIds, proId]);
    } else {
      setSavedIds(savedIds.filter(id => id !== proId));
    }
  };

  // Filtered & Sorted Professionals
  const filteredProfessionals = useMemo(() => {
    return store.getProfessionals({
      categorySlug: selectedCategorySlug,
      locality: selectedLocality.startsWith("All") ? undefined : selectedLocality,
      minRating: minRating > 0 ? minRating : undefined,
      verifiedOnly,
      search: searchQuery,
      sort: sortBy,
    });
  }, [selectedCategorySlug, selectedLocality, minRating, verifiedOnly, searchQuery, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: "സേവന വിദഗ്ദ്ധർ (Professional Directory)" }]} />

        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-[#1B4D36] via-[#16432E] to-[#0F2D1F] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(#E8C547_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          
          <div className="max-w-2xl space-y-3 relative z-10">
            <span className="inline-block px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-bold uppercase tracking-wider border border-amber-400/30">
              താനൂർ & മലപ്പുറം സേവന നെറ്റ്‌വർക്ക്
            </span>
            <h1 className="text-2xl sm:text-4xl font-bold font-malayalam-serif leading-tight">
              വിശ്വസ്തരായ പ്രാദേശിക സേവന വിദഗ്ദ്ധരെ കണ്ടെത്തൂ
            </h1>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              ഇലക്ട്രീഷ്യൻമാർ, പ്ലംബർമാർ, തച്ചന്മാർ, എസി റിപ്പയർ തുടങ്ങി 18 വിഭാഗങ്ങളിലായി താനൂരിലും മലപ്പുറത്തുമുള്ള 
              പരിചയസമ്പന്നരായ പ്രൊഫഷണലുകളെ നേരിട്ട് ബുക്ക് ചെയ്യാം.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/professionals/onboarding"
                className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#1B4D36] text-xs font-bold transition shadow-md flex items-center gap-2 active:scale-95"
              >
                <Briefcase className="w-4 h-4" />
                <span>സേവന ദാതാവായി രജിസ്റ്റർ ചെയ്യാം (Join as Provider)</span>
              </Link>

              <Link
                href="/dashboard/bookings"
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-xs transition border border-white/20 flex items-center gap-1.5"
              >
                <Calendar className="w-4 h-4 text-amber-300" />
                <span>എന്റെ ബുക്കിംഗുകൾ</span>
              </Link>
            </div>
          </div>
        </div>

        {/* SEARCH & FILTERS BAR */}
        <div className="bg-white rounded-3xl border border-[#EAE4D7] p-5 sm:p-6 shadow-card space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            
            {/* Search Input (5 Cols) */}
            <div className="sm:col-span-5 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-[#7A8880]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="പേര്, തൊഴിൽ, വിഭാഗം, ഉപകരണം എന്നിവ തിരയുക..."
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-2xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:ring-2 focus:ring-[#1B4D36] focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-3 text-xs text-[#7A8880] hover:text-[#1A2420]"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Locality Filter (3 Cols) */}
            <div className="sm:col-span-3">
              <div className="relative">
                <MapPin className="w-4 h-4 absolute left-3.5 top-3.5 text-[#1B4D36]" />
                <select
                  value={selectedLocality}
                  onChange={(e) => setSelectedLocality(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-2xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                >
                  {MALAPPURAM_LOCALITIES.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Sorting (2 Cols) */}
            <div className="sm:col-span-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2.5 text-xs rounded-2xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
              >
                <option value="rating">ഉയർന്ന റേറ്റിംഗ് (Top Rated)</option>
                <option value="reviews">കൂടുതൽ അവലോകനങ്ങൾ (Most Reviews)</option>
                <option value="price_asc">കുറഞ്ഞ നിരക്ക് (Price: Low to High)</option>
                <option value="price_desc">കൂടിയ നിരക്ക് (Price: High to Low)</option>
              </select>
            </div>

            {/* Verified Only Toggle (2 Cols) */}
            <div className="sm:col-span-2 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setVerifiedOnly(!verifiedOnly)}
                className={`w-full py-2.5 px-3 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-1.5 border ${
                  verifiedOnly
                    ? "bg-[#1B4D36] text-white border-[#1B4D36]"
                    : "bg-[#FAF7F0] text-[#5C6A64] border-[#DDD5C5] hover:bg-[#F3EFE6]"
                }`}
              >
                <ShieldCheck className={`w-3.5 h-3.5 ${verifiedOnly ? "text-amber-300" : "text-[#7A8880]"}`} />
                <span>വെരിഫൈഡ് മാത്രം</span>
              </button>
            </div>

          </div>

          {/* Dynamic 18 Category Filter Scroll Bar */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none pt-2 border-t border-[#F3EFE6]">
            <button
              onClick={() => setSelectedCategorySlug("all")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition shrink-0 ${
                selectedCategorySlug === "all"
                  ? "bg-[#1B4D36] text-white shadow-xs"
                  : "bg-[#FAF7F0] text-[#5C6A64] hover:bg-[#F3EFE6] border border-[#DDD5C5]"
              }`}
            >
              എല്ലാം (All Categories)
            </button>

            {categories.map((cat) => {
              const Icon = CATEGORY_ICON_MAP[cat.icon] || Wrench;
              const isActive = selectedCategorySlug === cat.slug || selectedCategorySlug === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategorySlug(cat.slug)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition shrink-0 flex items-center gap-1.5 ${
                    isActive
                      ? "bg-[#1B4D36] text-white font-bold shadow-xs"
                      : "bg-[#FAF7F0] text-[#5C6A64] hover:bg-[#F3EFE6] border border-[#DDD5C5]"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-amber-300" : "text-[#7A8880]"}`} />
                  <span>{language === "ml" ? cat.name_ml : cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* RESULTS HEADER */}
        <div className="flex items-center justify-between text-xs text-[#7A8880] px-1">
          <span>
            കണ്ടെത്തിയ വിദഗ്ദ്ധർ: <strong className="text-[#1B4D36]">{filteredProfessionals.length}</strong> പേർ
          </span>
          {user && (
            <Link href="/saved" className="font-bold text-[#1B4D36] hover:underline flex items-center gap-1">
              <Bookmark className="w-3.5 h-3.5" />
              <span>സൂക്ഷിച്ച വിദഗ്ദ്ധർ ({savedIds.length})</span>
            </Link>
          )}
        </div>

        {/* PROFESSIONALS GRID */}
        {filteredProfessionals.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#EAE4D7] p-12 text-center space-y-3 shadow-card">
            <Wrench className="w-12 h-12 text-[#DDD5C5] mx-auto" />
            <h3 className="text-base font-bold font-malayalam-serif text-[#1B4D36]">
              സേവന ദാതാക്കളെ കണ്ടെത്താനായില്ല
            </h3>
            <p className="text-xs text-[#7A8880] max-w-sm mx-auto">
              തിരഞ്ഞെടുത്ത വിഭാഗത്തിലോ പ്രദേശത്തോ നിലവിൽ സേവന ദാതാക്കൾ ലഭ്യമല്ല. ഫിൽട്ടറുകൾ മാറ്റി തിരയുക.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategorySlug("all");
                setSelectedLocality("All Localities (എല്ലാ പ്രദേശങ്ങളും)");
                setVerifiedOnly(false);
              }}
              className="px-4 py-2 bg-[#1B4D36] text-white text-xs font-bold rounded-xl"
            >
              ഫിൽട്ടറുകൾ ഒഴിവാക്കുക
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfessionals.map((pro) => {
              const isSaved = savedIds.includes(pro.id);
              return (
                <div
                  key={pro.id}
                  className="bg-white rounded-3xl border border-[#EAE4D7] overflow-hidden shadow-card hover:shadow-lg hover:border-[#1B4D36]/40 transition duration-200 flex flex-col justify-between group"
                >
                  <div>
                    {/* Card Header & Banner */}
                    <div className="h-28 w-full relative bg-[#1B4D36]/10">
                      {pro.banner_url ? (
                        <img
                          src={pro.banner_url}
                          alt={pro.display_name}
                          className="w-full h-full object-cover group-hover:scale-102 transition duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-r from-[#1B4D36] to-[#123826]" />
                      )}
                      
                      {/* Save Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          handleToggleSave(pro.id);
                        }}
                        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition shadow-md ${
                          isSaved
                            ? "bg-amber-400 text-[#1B4D36]"
                            : "bg-white/80 hover:bg-white text-neutral-600"
                        }`}
                        title="സൂക്ഷിക്കുക"
                      >
                        <Bookmark className="w-3.5 h-3.5 fill-current" />
                      </button>

                      {/* Locality Pill */}
                      <span className="absolute bottom-2 left-3 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-semibold backdrop-blur-xs flex items-center gap-1">
                        <MapPin className="w-2.5 h-2.5" />
                        <span>{pro.locality}</span>
                      </span>
                    </div>

                    {/* Avatar & Content */}
                    <div className="p-5 pt-0 relative space-y-3">
                      <div className="flex items-end justify-between -mt-8 mb-2">
                        <div className="relative">
                          <img
                            src={pro.avatar_url || "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&auto=format&fit=crop&q=80"}
                            alt={pro.display_name}
                            className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md bg-white"
                          />
                          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-1 bg-[#FAF7F0] px-2.5 py-1 rounded-xl border border-[#EAE4D7] text-xs font-bold text-[#1A2420]">
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          <span>{pro.rating}</span>
                          <span className="text-[10px] text-[#7A8880] font-normal">({pro.reviews_count})</span>
                        </div>
                      </div>

                      {/* Name & Titles */}
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-bold text-sm sm:text-base text-[#1A2420] group-hover:text-[#1B4D36] transition">
                            {language === "ml" && pro.display_name_ml ? pro.display_name_ml : pro.display_name}
                          </h3>
                          {pro.is_verified && (
                            <span title="Verified Professional">
                              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                            </span>
                          )}
                        </div>

                        {pro.business_name && (
                          <p className="text-[11px] font-semibold text-[#8C5B0F] truncate">
                            {pro.business_name}
                          </p>
                        )}

                        <span className="inline-block text-[10px] font-bold text-[#1B4D36] bg-[#E0F1E7] px-2 py-0.5 rounded-md mt-1">
                          {language === "ml" ? pro.category_name_ml : pro.category_name} • {pro.experience_years} വർഷം
                        </span>
                      </div>

                      {/* Bio snippet */}
                      <p className="text-xs text-[#5C6A64] line-clamp-2 leading-relaxed">
                        {language === "ml" && pro.bio_ml ? pro.bio_ml : pro.bio}
                      </p>

                      {/* Subcategories tags */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        {pro.subcategories.slice(0, 3).map((sub) => (
                          <span
                            key={sub}
                            className="px-2 py-0.5 rounded-md bg-[#FAF7F0] border border-[#DDD5C5] text-[10px] text-[#3E4D45]"
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom: Starting Price & CTAs */}
                  <div className="p-5 pt-3 border-t border-[#F3EFE6] flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] text-[#7A8880] block">പ്രാരംഭ നിരക്ക്</span>
                      <span className="text-base font-bold font-mono text-[#1B4D36]">
                        ₹{pro.starting_price}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/professionals/${pro.username}`}
                        className="px-3 py-2 rounded-xl bg-[#FAF7F0] hover:bg-[#F3EFE6] border border-[#DDD5C5] text-xs font-bold text-[#1B4D36] transition"
                      >
                        വിശദാംശങ്ങൾ
                      </Link>

                      <Link
                        href={`/professionals/${pro.username}`}
                        className="px-4 py-2 rounded-xl bg-[#1B4D36] hover:bg-[#143B29] text-white text-xs font-bold transition shadow-xs flex items-center gap-1 active:scale-95"
                      >
                        <span>ബുക്ക് ചെയ്യാം</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
