"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { PeoplesVoiceNav } from "@/components/peoples-voice/PeoplesVoiceNav";
import { useLanguage } from "@/lib/i18n/context";
import { useAuth } from "@/lib/auth/context";
import { 
  peoplesVoiceStore, 
  PEOPLES_VOICE_IDEA_CATEGORIES 
} from "@/lib/data/peoplesVoiceData";
import { 
  CommunityIdea, 
  IdeaCategory, 
  IdeaStatus 
} from "@/types/peoplesVoice";
import {
  Lightbulb,
  Search,
  Filter,
  ThumbsUp,
  MessageSquare,
  PlusCircle,
  MapPin,
  ChevronRight,
  FileCheck2,
  HeartHandshake,
  CheckCircle2,
  Clock,
  RotateCcw,
  Sparkles,
  ArrowUpDown
} from "lucide-react";

function BrowseIdeasContent() {
  const { language } = useLanguage();
  const { user } = useAuth();
  const searchParams = useSearchParams();

  // Initial category from URL if present
  const initialCat = (searchParams.get("category") as IdeaCategory) || "all";

  const [ideas, setIdeas] = useState<CommunityIdea[]>(() => peoplesVoiceStore.getIdeas());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<IdeaCategory | "all">(initialCat);
  const [selectedStatus, setSelectedStatus] = useState<IdeaStatus | "all">("all");
  const [selectedLocality, setSelectedLocality] = useState<string>("all");
  const [selectedWard, setSelectedWard] = useState<number>(0);
  const [sortBy, setSortBy] = useState<"supported" | "newest" | "comments">("supported");

  // Tanur localities for filtering
  const localities = [
    { value: "all", label: "All Localities (താനൂർ മുഴുവൻ)" },
    { value: "Tanur Town", label: "Tanur Town (താനൂർ ടൗൺ)" },
    { value: "Rayirimangalam", label: "Rayirimangalam (രായിരിമംഗലം)" },
    { value: "Theeradesham", label: "Theeradesham / Beach (തീരദേശം / ബീച്ച്)" },
    { value: "Devadhar", label: "Devadhar (ദേവധാർ)" },
    { value: "Karianode", label: "Karianode (കരിയാനോട്)" },
    { value: "Meenadathur", label: "Meenadathur (മീനടത്തൂർ)" },
  ];

  // 9 statuses
  const statuses: { value: IdeaStatus | "all"; label: string; label_ml: string }[] = [
    { value: "all", label: "All Statuses", label_ml: "എല്ലാ ഘട്ടങ്ങളും" },
    { value: "Submitted", label: "Submitted", label_ml: "സമർപ്പിച്ചത്" },
    { value: "Under Review", label: "Under Review", label_ml: "അവലോകനത്തിൽ" },
    { value: "Community Discussion", label: "Community Discussion", label_ml: "പൊതു ചർച്ചയിൽ" },
    { value: "Shortlisted", label: "Shortlisted", label_ml: "തിരഞ്ഞെടുത്തവ" },
    { value: "Forwarded for Consideration", label: "Forwarded for Consideration", label_ml: "കൈമാറിയവ" },
    { value: "Accepted for Collaboration", label: "Accepted for Collaboration", label_ml: "സഹകരണത്തിന് അംഗീകരിച്ചവ" },
    { value: "In Progress", label: "In Progress", label_ml: "നടപടി പുരോഗമിക്കുന്നവ" },
    { value: "Completed", label: "Completed", label_ml: "പൂർത്തിയായവ" },
    { value: "Not Proceeding", label: "Not Proceeding", label_ml: "തുടർനടപടിയില്ലാത്തവ" },
  ];

  // Support toggle
  const handleSupportToggle = (ideaId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const userId = user?.id || "usr-anon-local";
    const res = peoplesVoiceStore.toggleIdeaSupport(ideaId, userId);
    if (res) {
      setIdeas(peoplesVoiceStore.getIdeas({
        category: selectedCategory,
        status: selectedStatus,
        locality: selectedLocality,
        wardNumber: selectedWard,
        search: searchTerm,
        sortBy
      }));
    }
  };

  // Re-filter
  const filteredIdeas = useMemo(() => {
    return peoplesVoiceStore.getIdeas({
      category: selectedCategory,
      status: selectedStatus,
      locality: selectedLocality,
      wardNumber: selectedWard,
      search: searchTerm,
      sortBy
    });
  }, [selectedCategory, selectedStatus, selectedLocality, selectedWard, searchTerm, sortBy, ideas]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedStatus("all");
    setSelectedLocality("all");
    setSelectedWard(0);
    setSearchTerm("");
    setSortBy("supported");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "In Progress":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "Accepted for Collaboration":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "Forwarded for Consideration":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "Shortlisted":
        return "bg-indigo-100 text-indigo-800 border-indigo-300";
      case "Community Discussion":
        return "bg-cyan-100 text-cyan-800 border-cyan-300";
      case "Under Review":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "Not Proceeding":
        return "bg-gray-100 text-gray-700 border-gray-300";
      default:
        return "bg-stone-100 text-stone-800 border-stone-300";
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#252A25] pb-24">
      <Navbar />
      <PeoplesVoiceNav />

      {/* Header section */}
      <section className="bg-gradient-to-b from-[#FAF4E6] to-[#FAF7F0] border-b border-[#EDE6D8] pt-8 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2 text-xs text-[#5C6A64]">
                <Link href="/peoples-voice" className="hover:text-[#194B35]">
                  {language === "ml" ? "ജനകീയ ശബ്ദം" : "People's Voice"}
                </Link>
                <span>/</span>
                <span className="font-bold text-[#194B35]">
                  {language === "ml" ? "ആശയങ്ങളുടെ രജിസ്റ്റർ" : "Community Ideas Register"}
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#194B35] font-serif">
                {language === "ml" ? "താനൂരിനായുള്ള ജനകീയ ആശയങ്ങൾ" : "Community Ideas Register"}
              </h1>
              <p className="text-xs sm:text-sm text-[#5C6A64] mt-1">
                {language === "ml"
                  ? "താനൂർ നിവാസികൾ സമർപ്പിച്ച ആശയങ്ങൾ കണ്ടെത്താം, പിന്തുണയ്ക്കാം, ചർച്ച ചെയ്യാം."
                  : "Explore, support, and discuss improvement proposals submitted by residents of Tanur."}
              </p>
            </div>

            <Link
              href="/peoples-voice/ideas/new"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#194B35] text-white font-bold text-sm shadow hover:bg-[#143E2C] transition shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{language === "ml" ? "പുതിയ ആശയം നൽകാം" : "Submit an Idea"}</span>
            </Link>
          </div>

          {/* Search bar */}
          <div className="relative max-w-2xl mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C9A94]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={
                language === "ml"
                  ? "ആശയം, പ്രദേശം, അല്ലെങ്കിൽ സമർപ്പിച്ച ആളുടെ പേര് തിരയുക..."
                  : "Search ideas by title, locality, or resident name..."
              }
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-[#DDD3BF] text-sm focus:outline-none focus:ring-2 focus:ring-[#194B35] shadow-sm text-[#252A25]"
            />
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            {/* Category Dropdown */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as IdeaCategory | "all")}
              aria-label={language === "ml" ? "വിഭാഗം തിരഞ്ഞെടുക്കുക" : "Select Category"}
              className="px-3 py-2 rounded-xl bg-white border border-[#DDD3BF] text-xs font-semibold text-[#194B35] focus:outline-none focus:ring-2 focus:ring-[#194B35]"
            >
              <option value="all">{language === "ml" ? "എല്ലാ വിഭാഗങ്ങളും" : "All Categories"}</option>
              {PEOPLES_VOICE_IDEA_CATEGORIES.map((c) => (
                <option key={c.key} value={c.key}>
                  {language === "ml" ? c.label_ml : c.label}
                </option>
              ))}
            </select>

            {/* Status Dropdown */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as IdeaStatus | "all")}
              aria-label={language === "ml" ? "ഘട്ടം തിരഞ്ഞെടുക്കുക" : "Select Status"}
              className="px-3 py-2 rounded-xl bg-white border border-[#DDD3BF] text-xs font-semibold text-[#194B35] focus:outline-none focus:ring-2 focus:ring-[#194B35]"
            >
              {statuses.map((s) => (
                <option key={s.value} value={s.value}>
                  {language === "ml" ? s.label_ml : s.label}
                </option>
              ))}
            </select>

            {/* Locality Dropdown */}
            <select
              value={selectedLocality}
              onChange={(e) => setSelectedLocality(e.target.value)}
              aria-label={language === "ml" ? "പ്രദേശം തിരഞ്ഞെടുക്കുക" : "Select Locality"}
              className="px-3 py-2 rounded-xl bg-white border border-[#DDD3BF] text-xs font-semibold text-[#194B35] focus:outline-none focus:ring-2 focus:ring-[#194B35]"
            >
              {localities.map((loc) => (
                <option key={loc.value} value={loc.value}>
                  {loc.label}
                </option>
              ))}
            </select>

            {/* Ward Selector (1 to 44) */}
            <select
              value={selectedWard}
              onChange={(e) => setSelectedWard(Number(e.target.value))}
              aria-label={language === "ml" ? "വാർഡ് തിരഞ്ഞെടുക്കുക" : "Select Ward"}
              className="px-3 py-2 rounded-xl bg-white border border-[#DDD3BF] text-xs font-semibold text-[#194B35] focus:outline-none focus:ring-2 focus:ring-[#194B35]"
            >
              <option value={0}>{language === "ml" ? "എല്ലാ വാർഡുകളും (1-44)" : "All Wards (1-44)"}</option>
              {Array.from({ length: 44 }, (_, i) => i + 1).map((w) => (
                <option key={w} value={w}>
                  Ward {w} ({language === "ml" ? `വാർഡ് ${w}` : `Ward ${w}`})
                </option>
              ))}
            </select>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1 ml-auto">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#5C6A64]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "supported" | "newest" | "comments")}
                aria-label={language === "ml" ? "ക്രമപ്പെടുത്തുക" : "Sort By"}
                className="px-3 py-2 rounded-xl bg-white border border-[#DDD3BF] text-xs font-semibold text-[#194B35] focus:outline-none focus:ring-2 focus:ring-[#194B35]"
              >
                <option value="supported">{language === "ml" ? "കൂടുതൽ പിന്തുണ" : "Most Supported"}</option>
                <option value="newest">{language === "ml" ? "ഏറ്റവും പുതിയത്" : "Newest"}</option>
                <option value="comments">{language === "ml" ? "കൂടുതൽ ചർച്ച" : "Most Discussed"}</option>
              </select>
            </div>

            {/* Reset Button */}
            {(selectedCategory !== "all" || selectedStatus !== "all" || selectedLocality !== "all" || selectedWard > 0 || searchTerm) && (
              <button
                onClick={resetFilters}
                className="p-2 rounded-xl bg-[#EDE6D8] text-[#194B35] hover:bg-[#DDD3BF] transition text-xs font-bold flex items-center gap-1"
                title="Reset filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{language === "ml" ? "റീസെറ്റ്" : "Reset"}</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex items-center justify-between mb-4 text-xs text-[#5C6A64]">
          <span className="font-semibold text-[#194B35]">
            {filteredIdeas.length} {language === "ml" ? "ആശയങ്ങൾ കണ്ടെത്തി" : "ideas found"}
          </span>
          <span>
            {language === "ml" ? "സ്വതന്ത്ര പൗര പങ്കാളിത്തം" : "Independent Resident Participation"}
          </span>
        </div>

        {filteredIdeas.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-[#EDE6D8] shadow-sm">
            <Lightbulb className="w-12 h-12 text-[#C39A5B] mx-auto mb-3 opacity-60" />
            <h3 className="text-lg font-bold text-[#194B35] mb-1 font-serif">
              {language === "ml" ? "തിരഞ്ഞെടുത്ത വിഭാഗത്തിൽ ആശയങ്ങൾ കണ്ടെത്തിയില്ല" : "No Ideas Found Matching Your Filters"}
            </h3>
            <p className="text-xs text-[#5C6A64] max-w-md mx-auto mb-6">
              {language === "ml"
                ? "നിങ്ങളുടെ തിരയൽ മാനദണ്ഡങ്ങൾ മാറ്റുകയോ താനൂരിനായി പുതിയൊരു ആശയം സമർപ്പിക്കുകയോ ചെയ്യാം."
                : "Try adjusting your search criteria or be the first to submit an idea for this category."}
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={resetFilters}
                className="px-4 py-2 rounded-xl bg-[#EDE6D8] text-[#194B35] font-bold text-xs"
              >
                {language === "ml" ? "ഫിൽട്ടറുകൾ നീക്കം ചെയ്യാം" : "Clear Filters"}
              </button>
              <Link
                href="/peoples-voice/ideas/new"
                className="px-4 py-2 rounded-xl bg-[#194B35] text-white font-bold text-xs"
              >
                {language === "ml" ? "പുതിയ ആശയം നൽകാം" : "Submit Idea"}
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIdeas.map((idea) => (
              <div
                key={idea.id}
                className="bg-white rounded-3xl border border-[#EDE6D8] overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  {idea.images && idea.images.length > 0 ? (
                    <div className="relative h-44 w-full bg-[#EDE6D8] overflow-hidden">
                      <img
                        src={idea.images[0]}
                        alt={idea.title}
                        className="w-full h-full object-cover transition duration-300 hover:scale-105"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#194B35]/90 text-white backdrop-blur-sm">
                          {idea.tracking_id}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border backdrop-blur-sm ${getStatusBadge(idea.status)}`}>
                          {idea.status}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="h-16 bg-gradient-to-r from-[#FAF4E6] to-[#EDE6D8] p-4 flex items-center justify-between border-b border-[#EDE6D8]">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#194B35] text-white">
                        {idea.tracking_id}
                      </span>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusBadge(idea.status)}`}>
                        {idea.status}
                      </span>
                    </div>
                  )}

                  <div className="p-5">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#EDE6D8] text-[#194B35]">
                        {language === "ml" ? idea.category_name_ml : idea.category_name}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-[#5C6A64]">
                        <MapPin className="w-3 h-3 text-[#C39A5B]" />
                        <span>{idea.locality}</span>
                        {idea.ward_number ? <span>(Ward {idea.ward_number})</span> : null}
                      </span>
                    </div>

                    <Link href={`/peoples-voice/ideas/${idea.id}`}>
                      <h3 className="font-bold text-base sm:text-lg text-[#194B35] hover:text-[#C39A5B] transition font-serif leading-snug mb-2 line-clamp-2">
                        {language === "ml" && idea.title_ml ? idea.title_ml : idea.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-[#5C6A64] line-clamp-3 mb-4 leading-relaxed font-sans">
                      {language === "ml" && idea.description_ml ? idea.description_ml : idea.description}
                    </p>

                    {/* Forwarded record banner */}
                    {idea.forwarded_record ? (
                      <div className="mb-3 p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-[11px] text-blue-900 flex items-start gap-2">
                        <FileCheck2 className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold">
                            {language === "ml" ? "ഔദ്യോഗികമായി കൈമാറി:" : "Forwarded:"}
                          </p>
                          <p className="text-[10px] text-blue-800 line-clamp-1">
                            Ref: {idea.forwarded_record.reference_number}
                          </p>
                        </div>
                      </div>
                    ) : idea.collaboration_record ? (
                      <div className="mb-3 p-2.5 rounded-xl bg-purple-50 border border-purple-200 text-[11px] text-purple-900 flex items-start gap-2">
                        <HeartHandshake className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold">
                            {language === "ml" ? "സഹകരണത്തിന് അംഗീകരിച്ചു:" : "Collaboration Confirmed:"}
                          </p>
                          <p className="text-[10px] text-purple-800 line-clamp-1">
                            {idea.collaboration_record.organization_name}
                          </p>
                        </div>
                      </div>
                    ) : null}

                    {idea.estimated_cost ? (
                      <div className="text-[11px] text-[#5C6A64] mb-3">
                        <span className="font-medium text-[#252A25]">
                          {language === "ml" ? "പ്രതീക്ഷിത ചെലവ്:" : "Est. Cost:"}{" "}
                        </span>
                        <span className="font-bold text-[#194B35]">{idea.estimated_cost}</span>
                        <span className="text-[10px] text-[#8C9A94] ml-1">
                          ({language === "ml" ? "ജനകീയ അനുമാനം" : "Community estimate"})
                        </span>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="px-5 py-3.5 bg-[#FAF7F0] border-t border-[#EDE6D8] flex items-center justify-between">
                  <button
                    onClick={(e) => handleSupportToggle(idea.id, e)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition active:scale-95 ${
                      idea.supported_by_user
                        ? "bg-[#194B35] text-white shadow-sm"
                        : "bg-white text-[#194B35] border border-[#DDD3BF] hover:bg-[#EFE9DC]"
                    }`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${idea.supported_by_user ? "fill-white" : ""}`} />
                    <span>{idea.support_count}</span>
                  </button>

                  <div className="flex items-center gap-3">
                    <Link
                      href={`/peoples-voice/ideas/${idea.id}#comments`}
                      className="flex items-center gap-1 text-xs text-[#5C6A64] hover:text-[#194B35]"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{idea.comments_count}</span>
                    </Link>

                    <Link
                      href={`/peoples-voice/ideas/${idea.id}`}
                      className="text-xs font-bold text-[#194B35] hover:text-[#C39A5B] flex items-center gap-0.5"
                    >
                      <span>{language === "ml" ? "വിശദാംശങ്ങൾ" : "Details"}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
      <BottomNav />
    </div>
  );
}

export default function BrowseIdeasPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF7F0] flex items-center justify-center p-8">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-[#194B35] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs font-bold text-[#194B35]">Loading Ideas Register...</p>
          </div>
        </div>
      }
    >
      <BrowseIdeasContent />
    </Suspense>
  );
}

