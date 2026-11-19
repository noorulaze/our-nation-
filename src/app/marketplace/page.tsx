"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { useLanguage } from "@/lib/i18n/context";
import { useAuth } from "@/lib/auth/context";
import { 
  marketplaceStore, 
  TANUR_MARKETPLACE_CATEGORIES, 
  MarketplaceItem 
} from "@/lib/data/marketplaceData";
import {
  ShoppingBag,
  Search,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Tag,
  Phone,
  Eye,
  Plus,
  Filter,
  AlertTriangle,
  X,
  Send,
  Sparkles,
  Info
} from "lucide-react";

export default function MarketplacePage() {
  const { language } = useLanguage();
  const { user, role } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [revealedContacts, setRevealedContacts] = useState<Record<string, boolean>>({});

  // Post Listing Modal
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postTitleMl, setPostTitleMl] = useState("");
  const [postCategory, setPostCategory] = useState("marine_fishing");
  const [postPrice, setPostPrice] = useState("");
  const [postLocality, setPostLocality] = useState("Tanur Town Center");
  const [postPhone, setPostPhone] = useState(user?.phone || "");
  const [postDesc, setPostDesc] = useState("");
  const [postSuccess, setPostSuccess] = useState(false);

  const [itemsList, setItemsList] = useState<MarketplaceItem[]>(() => marketplaceStore.getItems());

  const filteredItems = useMemo(() => {
    return itemsList.filter((item) => {
      const matchCat = selectedCategory === "all" || item.category === selectedCategory;
      if (!matchCat) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.title_ml.includes(q) ||
          item.locality.toLowerCase().includes(q) ||
          item.locality_ml.includes(q) ||
          item.description.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [itemsList, selectedCategory, searchQuery]);

  const toggleContactReveal = (id: string) => {
    setRevealedContacts(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
    marketplaceStore.incrementViews(id);
  };

  const handlePostItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle || !postPrice || !postPhone) return;

    const catObj = TANUR_MARKETPLACE_CATEGORIES.find(c => c.key === postCategory);

    const newItem = marketplaceStore.addItem({
      title: postTitle,
      title_ml: postTitleMl || postTitle,
      category: postCategory as any,
      category_ml: catObj?.name_ml || "തദ്ദേശീയ ഉൽപ്പന്നങ്ങൾ",
      price: postPrice,
      price_type: "negotiable",
      price_type_ml: "വില സംസാരിക്കാം",
      locality: postLocality,
      locality_ml: postLocality,
      condition: "used_good",
      condition_ml: "നല്ല അവസ്ഥയിൽ",
      seller_name: user?.display_name || "താനൂർ നിവാസി",
      seller_phone: postPhone,
      is_verified_seller: true,
      image_url: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&auto=format&fit=crop&q=80",
      description: postDesc || "Local item for sale in Tanur Municipality.",
      description_ml: postDesc || "താനൂർ നഗരസഭയിലെ തദ്ദേശീയ വിൽപ്പന ഇനം.",
    });

    setItemsList([newItem, ...itemsList]);
    setPostSuccess(true);
    setTimeout(() => {
      setPostSuccess(false);
      setIsPostModalOpen(false);
      setPostTitle("");
      setPostPrice("");
      setPostPhone("");
      setPostDesc("");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] pb-24">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: language === "ml" ? "ഹോം" : "Home", href: "/" },
            { label: language === "ml" ? "കണ്ടെത്തുക" : "Explore", href: "/explore" },
            { label: language === "ml" ? "ബൈ & സെൽ മാർക്കറ്റ്പ്ലേസ്" : "Buy & Sell Marketplace" },
          ]}
        />

        {/* Hero Banner */}
        <div className="bg-[#194B35] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-md">
          <div className="max-w-3xl space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{language === "ml" ? "താനൂർ ചന്ത & കമ്മ്യൂണിറ്റി മാർക്കറ്റ്" : "Tanur Community Marketplace"}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-malayalam-heading">
              {language === "ml" ? "ബൈ & സെൽ തദ്ദേശീയ മാർക്കറ്റ്പ്ലേസ്" : "Buy & Sell Local Marketplace"}
            </h1>
            <p className="text-white/80 text-xs sm:text-sm leading-relaxed max-w-2xl">
              {language === "ml"
                ? "താനൂർ നിവാസികൾക്ക് വിശ്വസ്തതയോടെ മത്സ്യബന്ധന ഉപകരണങ്ങൾ, കാർഷിക വിഭവങ്ങൾ, വാഹനങ്ങൾ, ഫർണിച്ചർ എന്നിവ നേരിട്ട് വിൽക്കാനും വാങ്ങാനുമുള്ള പ്ലാറ്റ്‌ഫോം."
                : "A verified local marketplace for Tanur Municipality residents to buy and sell fishing gears, farm produce, vehicles, and household items safely."}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsPostModalOpen(true)}
                className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-[#143E2C] font-bold text-xs rounded-xl flex items-center gap-2 transition shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>{language === "ml" ? "വിൽക്കാൻ പരസ്യം നൽകാം (സൗജന്യം)" : "Post Free Listing"}</span>
              </button>

              <div className="inline-flex items-center gap-1.5 px-3 py-2 bg-white/10 rounded-xl text-[11px] text-white/90 border border-white/15">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{language === "ml" ? "സുരക്ഷിത ഇടപാട്: നേരിട്ട് കണ്ട് ബോധ്യപ്പെട്ട് മാത്രം പണം നൽകുക" : "In-Person Verification Required"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="bg-white rounded-2xl border border-[#EDE6D8] p-4 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === "ml" ? "സാധനത്തിന്റെ പേര്, പ്രദേശം എന്നിവ തിരയുക..." : "Search items, gear or locality..."}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-gray-200 bg-[#FAF7F0] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#194B35]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="text-xs font-bold text-[#5C6A64] shrink-0">
              {language === "ml" ? `ലഭ്യമായ ഇനങ്ങൾ: ${filteredItems.length}` : `${filteredItems.length} Items Listed`}
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {TANUR_MARKETPLACE_CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3 py-1.5 rounded-lg font-bold transition whitespace-nowrap ${
                  selectedCategory === cat.key
                    ? "bg-[#194B35] text-white shadow-xs"
                    : "bg-[#FAF7F0] text-gray-600 hover:bg-gray-200"
                }`}
              >
                {language === "ml" ? cat.name_ml : cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Marketplace Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-3xl border border-dashed border-[#EDE6D8] p-12 text-center max-w-xl mx-auto space-y-3">
            <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto" />
            <h3 className="text-base font-bold text-gray-800">
              {language === "ml" ? "ഇനങ്ങൾ കണ്ടെത്തിയില്ല" : "No Items Found"}
            </h3>
            <p className="text-xs text-gray-500">
              {language === "ml"
                ? "നിങ്ങൾ തിരഞ്ഞ വിഭാഗത്തിൽ ഇപ്പോൾ ഇനങ്ങൾ ലഭ്യമല്ല. ഫിൽട്ടറുകൾ മാറ്റി പരിശോധിക്കുക."
                : "No marketplace listings match your query. Try resetting your filters."}
            </p>
            <button
              onClick={() => { setSelectedCategory("all"); setSearchQuery(""); }}
              className="px-4 py-2 bg-[#194B35] text-white text-xs font-bold rounded-xl hover:bg-[#143E2C] transition"
            >
              {language === "ml" ? "ഫിൽട്ടറുകൾ റീസെറ്റ് ചെയ്യുക" : "Reset Filters"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-[#EDE6D8] overflow-hidden shadow-xs hover:shadow-md hover:border-[#194B35] transition flex flex-col justify-between"
              >
                <div>
                  {/* Photo Thumbnail */}
                  <div className="relative h-44 w-full bg-gray-100 overflow-hidden">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover transition duration-300 hover:scale-105"
                      onError={(e) => {
                        (e.target as any).src = "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80";
                      }}
                    />
                    <div className="absolute top-2.5 left-2.5 bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                      {language === "ml" ? item.category_ml : item.category}
                    </div>

                    <div className="absolute bottom-2.5 right-2.5 bg-white/90 backdrop-blur-xs text-[#194B35] text-xs font-black px-3 py-1 rounded-xl shadow-xs">
                      {item.price}
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold text-[#C39A5B] bg-[#FAF7F0] px-2 py-0.5 rounded-md border border-[#EDE6D8]">
                        {language === "ml" ? item.condition_ml : item.condition}
                      </span>
                      {item.is_verified_seller && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>{language === "ml" ? "സ്ഥിരീകരിച്ച വിൽപനക്കാരൻ" : "Verified Resident"}</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-[#194B35] font-malayalam-heading line-clamp-1">
                      {language === "ml" ? item.title_ml : item.title}
                    </h3>

                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <MapPin className="w-3.5 h-3.5 text-[#194B35] shrink-0" />
                      <span>{language === "ml" ? item.locality_ml : item.locality}</span>
                      {item.ward_number && <span>(വാർഡ് {item.ward_number})</span>}
                    </div>

                    <p className="text-xs text-[#5C6A64] line-clamp-2 leading-relaxed pt-1">
                      {language === "ml" ? item.description_ml : item.description}
                    </p>
                  </div>
                </div>

                {/* Footer with Contact Action */}
                <div className="p-4 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between">
                  <div className="text-[10px] text-gray-400">
                    {language === "ml" ? `പോസ്റ്റ് ചെയ്തത്: ${item.posted_date}` : `Listed: ${item.posted_date}`}
                  </div>

                  {revealedContacts[item.id] ? (
                    <a
                      href={`tel:${item.seller_phone}`}
                      className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{item.seller_phone}</span>
                    </a>
                  ) : (
                    <button
                      onClick={() => toggleContactReveal(item.id)}
                      className="px-3.5 py-1.5 bg-[#194B35] hover:bg-[#143E2C] text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{language === "ml" ? "നമ്പർ കാണുക" : "Contact Seller"}</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* POST LISTING MODAL */}
      {isPostModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative border border-[#EDE6D8] max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsPostModalOpen(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C39A5B]">
                  {language === "ml" ? "താനൂർ കമ്മ്യൂണിറ്റി മാർക്കറ്റ്" : "Community Marketplace"}
                </span>
                <h3 className="text-lg font-bold text-[#194B35] font-malayalam-heading">
                  {language === "ml" ? "വിൽക്കാൻ പരസ്യം നൽകാം" : "List an Item for Sale"}
                </h3>
              </div>

              {postSuccess ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <p className="font-bold text-emerald-800 text-sm">
                    {language === "ml" ? "പരസ്യം വിജയകരമായി ലിസ്റ്റ് ചെയ്തു!" : "Listing Published Successfully!"}
                  </p>
                </div>
              ) : (
                <form onSubmit={handlePostItem} className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      {language === "ml" ? "സാധനത്തിന്റെ പേര് (Item Title)" : "Item Title"} *
                    </label>
                    <input
                      type="text"
                      required
                      value={postTitle}
                      onChange={(e) => setPostTitle(e.target.value)}
                      placeholder="e.g. Fishing Net / Auto-rickshaw / Teak Table"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-[#FAF7F0] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#194B35]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">
                        {language === "ml" ? "വിഭാഗം" : "Category"}
                      </label>
                      <select
                        value={postCategory}
                        onChange={(e) => setPostCategory(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-[#FAF7F0] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#194B35]"
                      >
                        {TANUR_MARKETPLACE_CATEGORIES.filter(c => c.key !== "all").map(c => (
                          <option key={c.key} value={c.key}>
                            {language === "ml" ? c.name_ml : c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">
                        {language === "ml" ? "പ്രദേശം" : "Locality"}
                      </label>
                      <input
                        type="text"
                        value={postLocality}
                        onChange={(e) => setPostLocality(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-[#FAF7F0] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#194B35]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">
                        {language === "ml" ? "ആവശ്യപ്പെടുന്ന വില" : "Asking Price"} *
                      </label>
                      <input
                        type="text"
                        required
                        value={postPrice}
                        onChange={(e) => setPostPrice(e.target.value)}
                        placeholder="e.g. ₹5,000"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-[#FAF7F0] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#194B35]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">
                        {language === "ml" ? "ബന്ധപ്പെടേണ്ട നമ്പർ" : "Contact Phone"} *
                      </label>
                      <input
                        type="tel"
                        required
                        value={postPhone}
                        onChange={(e) => setPostPhone(e.target.value)}
                        placeholder="0494..."
                        className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-[#FAF7F0] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#194B35]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      {language === "ml" ? "വിവരണം & പ്രത്യേകതകൾ" : "Description & Details"}
                    </label>
                    <textarea
                      rows={3}
                      value={postDesc}
                      onChange={(e) => setPostDesc(e.target.value)}
                      placeholder={language === "ml" ? "സാധനത്തിന്റെ അവസ്ഥ, ഉപയോഗിച്ച കാലാവധി എന്നിവ രേഖപ്പെടുത്തുക..." : "Describe the item condition and details..."}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-[#FAF7F0] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#194B35]"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsPostModalOpen(false)}
                      className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-50"
                    >
                      {language === "ml" ? "റദ്ദാക്കുക" : "Cancel"}
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#194B35] text-white rounded-xl text-xs font-bold hover:bg-[#143E2C] transition flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{language === "ml" ? "പരസ്യം പ്രസിദ്ധീകരിക്കുക" : "Publish Item"}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      <BottomNav />
      <Footer />
    </div>
  );
}
