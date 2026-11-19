"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { useLanguage } from "@/lib/i18n/context";
import { useAuth } from "@/lib/auth/context";
import { store } from "@/lib/data/store";
import Link from "next/link";
import { 
  Bookmark, 
  Star, 
  MapPin, 
  ShieldCheck, 
  Trash2, 
  ArrowRight, 
  Wrench,
  Calendar
} from "lucide-react";

export default function SavedProfessionalsPage() {
  const { t, language } = useLanguage();
  const { user } = useAuth();

  const [savedPros, setSavedPros] = useState(() => {
    return user ? store.getSavedProfessionals(user.id) : [];
  });

  const handleRemove = (proId: string) => {
    if (user) {
      store.toggleSaveProfessional(user.id, proId);
      setSavedPros(store.getSavedProfessionals(user.id));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "പ്രൊഫഷണൽ ഡയറക്ടറി", href: "/professionals" },
            { label: "സൂക്ഷിച്ച വിദഗ്ദ്ധർ (Saved Professionals)" },
          ]}
        />

        {/* Page Header */}
        <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 sm:p-8 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-bold font-malayalam-serif text-[#1B4D36] flex items-center gap-2">
              <Bookmark className="w-6 h-6 text-[#B87A1E] fill-current" />
              <span>സൂക്ഷിച്ച സേവന വിദഗ്ദ്ധർ ({savedPros.length})</span>
            </h1>
            <p className="text-xs text-[#7A8880]">
              നിങ്ങൾ ബുക്കിംഗിനായി തിരഞ്ഞെടുത്ത് മാറ്റിവെച്ച വിശ്വസ്തരായ താനൂർ പ്രൊഫഷണലുകൾ.
            </p>
          </div>

          <Link
            href="/professionals"
            className="px-4 py-2.5 rounded-xl bg-[#1B4D36] text-white text-xs font-bold hover:bg-[#143B29] transition shadow-xs flex items-center gap-1.5"
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>കൂടുതൽ വിദഗ്ദ്ധരെ കണ്ടെത്തുക</span>
          </Link>
        </div>

        {/* Grid of Saved Professionals */}
        {savedPros.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#EAE4D7] p-12 text-center space-y-3 shadow-card">
            <Bookmark className="w-12 h-12 text-[#DDD5C5] mx-auto" />
            <h3 className="text-base font-bold font-malayalam-serif text-[#1B4D36]">
              സൂക്ഷിച്ച വിദഗ്ദ്ധരൊന്നും നിലവിലില്ല
            </h3>
            <p className="text-xs text-[#7A8880] max-w-sm mx-auto">
              നിങ്ങൾക്ക് ആവശ്യമായ ഇലക്ട്രീഷ്യൻ, പ്ലംബർ, തച്ചൻ തുടങ്ങിയ സേവന വിദഗ്ദ്ധരെ കണ്ടെത്തി ബുക്ക്മാർക്ക് ചെയ്യാം.
            </p>
            <Link
              href="/professionals"
              className="inline-block px-5 py-2.5 rounded-xl bg-[#1B4D36] text-white text-xs font-bold"
            >
              ഡയറക്ടറി കാണുക (Explore Directory)
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedPros.map((pro) => (
              <div
                key={pro.id}
                className="bg-white rounded-3xl border border-[#EAE4D7] p-5 shadow-card hover:shadow-lg transition space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={pro.avatar_url || "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&auto=format&fit=crop&q=80"}
                        alt={pro.display_name}
                        className="w-14 h-14 rounded-2xl object-cover border border-[#DDD5C5]"
                      />
                      <div>
                        <div className="flex items-center gap-1">
                          <h3 className="font-bold text-sm text-[#1A2420]">
                            {language === "ml" && pro.display_name_ml ? pro.display_name_ml : pro.display_name}
                          </h3>
                          {pro.is_verified && (
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          )}
                        </div>
                        <span className="text-[11px] text-[#8C5B0F] font-semibold block">
                          {language === "ml" ? pro.category_name_ml : pro.category_name}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] text-[#7A8880] mt-0.5">
                          <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                          <span className="font-bold text-[#1A2420]">{pro.rating}</span>
                          <span>•</span>
                          <span>{pro.locality}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemove(pro.id)}
                      className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition"
                      title="സൂക്ഷിച്ചവയിൽ നിന്ന് മാറ്റുക"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-xs text-[#5C6A64] line-clamp-2 leading-relaxed">
                    {language === "ml" && pro.bio_ml ? pro.bio_ml : pro.bio}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F3EFE6] flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1B4D36]">
                    ₹{pro.starting_price} <span className="text-[10px] text-[#7A8880] font-normal">മുതൽ</span>
                  </span>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/professionals/${pro.username}`}
                      className="px-3 py-1.5 rounded-xl bg-[#1B4D36] text-white text-xs font-bold hover:bg-[#143B29] transition flex items-center gap-1"
                    >
                      <span>ബുക്കിംഗ്</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
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
