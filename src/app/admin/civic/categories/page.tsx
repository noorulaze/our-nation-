"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { AdminCivicNav } from "@/components/civic/AdminCivicNav";
import { useLanguage } from "@/lib/i18n/context";
import { 
  CIVIC_CATEGORIES, 
  CivicCategory,
  civicStore 
} from "@/lib/data/civicConnectData";
import { 
  FolderTree, 
  Plus, 
  Tag, 
  ArrowRight, 
  Check, 
  Sparkles, 
  AlertCircle,
  ExternalLink
} from "lucide-react";

export default function AdminCivicCategoriesPage() {
  const { language } = useLanguage();
  const [categories, setCategories] = useState<CivicCategory[]>(CIVIC_CATEGORIES);
  const [selectedCat, setSelectedCat] = useState<CivicCategory | null>(null);
  const [newSubcategoryText, setNewSubcategoryText] = useState("");
  const [addedSuccess, setAddedSuccess] = useState(false);

  const issues = civicStore.getIssues();

  const handleAddSubcategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCat || !newSubcategoryText.trim()) return;

    selectedCat.subcategories.push(newSubcategoryText.trim());
    setCategories([...categories]);
    setNewSubcategoryText("");
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] pb-24">
      <Navbar />
      <AdminCivicNav />

      {/* Header Hub */}
      <section className="bg-gradient-to-b from-[#FAF4E6] to-[#FAF7F0] border-b border-[#E8DCBF] pt-8 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-6 h-6 rounded-lg bg-[#143E2C] text-amber-300 flex items-center justify-center">
                  <FolderTree className="w-3.5 h-3.5" />
                </span>
                <span className="text-xs font-bold text-[#143E2C] uppercase tracking-wider">
                  കാറ്റഗറി മാനേജ്‌മെന്റ്
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#194B35] font-serif">
                {language === "ml" ? "സിവിക് വിഭാഗങ്ങളും ഉപവിഭാഗങ്ങളും" : "Civic Categories & Taxonomies"}
              </h1>
              <p className="text-xs sm:text-sm text-[#5C6A64] mt-1">
                താനൂർ നഗരസഭയിലെ 8 പ്രധാന ഭരണനിർവ്വഹണ വിഭാഗങ്ങളും അവയിലെ ഉപവിഷയങ്ങളും.
              </p>
            </div>

            <span className="text-xs font-bold text-[#194B35] bg-[#E0F1E7] px-3 py-1.5 rounded-xl border border-[#BDE3CE] self-start sm:self-auto">
              8 സജീവ വിഭാഗങ്ങൾ ലഭ്യമാണ്
            </span>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat) => {
            const activeIssues = issues.filter(i => i.category_id === cat.id).length;
            return (
              <div
                key={cat.id}
                className="bg-white rounded-3xl border border-[#E8DCBF] p-6 shadow-xs hover:border-[#194B35]/40 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <span
                        className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold shadow-xs"
                        style={{ backgroundColor: cat.color }}
                      >
                        <Tag className="w-5 h-5" />
                      </span>
                      <div>
                        <h3 className="font-bold text-base text-[#194B35]">{cat.name_ml}</h3>
                        <span className="text-xs text-neutral-500 font-medium">{cat.name}</span>
                      </div>
                    </div>

                    <span className="text-xs font-bold bg-[#FAF7F0] text-[#8C5B0F] px-2.5 py-1 rounded-xl border border-[#E8DCBF]">
                      {activeIssues} പരാതികൾ
                    </span>
                  </div>

                  <p className="text-xs text-[#5C6A64] mb-4 leading-relaxed">
                    {cat.description}
                  </p>

                  {/* Subcategories list */}
                  <div>
                    <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-2">
                      ഉപവിഭാഗങ്ങൾ (Subcategories):
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.subcategories.map((sub, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-medium bg-[#FAF7F0] text-neutral-700 px-2.5 py-1 rounded-lg border border-[#DDD5C5]"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs">
                  <button
                    onClick={() => setSelectedCat(cat)}
                    className="font-bold text-[#8C5B0F] hover:text-[#194B35] flex items-center gap-1 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>ഉപവിഭാഗം ചേർക്കുക</span>
                  </button>

                  <Link
                    href={`/admin/civic/issues?category=${cat.id}`}
                    className="font-bold text-[#194B35] hover:underline flex items-center gap-1"
                  >
                    <span>പരാതികൾ കാണുക</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Add Subcategory Modal */}
      {selectedCat && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#E8DCBF]">
            <h3 className="font-bold text-base text-[#194B35] mb-2 font-serif">
              പുതിയ ഉപവിഭാഗം ചേർക്കുക: {selectedCat.name_ml}
            </h3>
            <p className="text-xs text-neutral-500 mb-4">
              പൗരന്മാർക്ക് പരാതി നൽകുമ്പോൾ തിരഞ്ഞെടുക്കാനായി പുതിയൊരു സബ്-ടൈപ്പ് ചേർക്കുക.
            </p>

            {addedSuccess ? (
              <div className="py-4 text-center text-xs font-bold text-emerald-700 flex items-center justify-center gap-1.5 bg-emerald-50 rounded-xl">
                <Check className="w-4 h-4" /> ഉപവിഭാഗം വിജയകരമായി ചേർത്തു!
              </div>
            ) : (
              <form onSubmit={handleAddSubcategory} className="space-y-4">
                <input
                  type="text"
                  placeholder="ഉദാ: Smart Bus Stop (സ്മാർട്ട് ബസ് സ്റ്റോപ്പ്)"
                  value={newSubcategoryText}
                  onChange={(e) => setNewSubcategoryText(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#DDD5C5] text-xs focus:outline-hidden focus:border-[#194B35]"
                  required
                />

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedCat(null)}
                    className="px-4 py-2 rounded-xl border border-neutral-200 text-neutral-600 text-xs font-bold hover:bg-neutral-100"
                  >
                    റദ്ദാക്കുക
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#194B35] text-white text-xs font-bold hover:bg-[#143E2C]"
                  >
                    ചേർക്കുക
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer />
      <BottomNav />
    </div>
  );
}
