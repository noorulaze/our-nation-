"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n/context";
import { useAuth } from "@/lib/auth/context";
import { 
  Newspaper, 
  Flame, 
  Clock, 
  MapPin, 
  Sparkles, 
  ShieldCheck, 
  Search, 
  Radio, 
  ChevronDown,
  Layers
} from "lucide-react";
import { NEWS_CATEGORIES } from "@/lib/data/newsroomStore";

export function NewsNav() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const { role } = useAuth();
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

  const mainTabs = [
    { href: "/news", label: "വാർത്താ കേന്ദ്രം", enLabel: "Newsroom Hub", icon: Newspaper },
    { href: "/news/latest", label: "പുതിയ വാർത്തകൾ", enLabel: "Latest Feed", icon: Clock },
    { href: "/news/breaking", label: "ബ്രേക്കിംഗ് ന്യൂസ്", enLabel: "Breaking News", icon: Flame, isAlert: true },
    { href: "/news/local", label: "താനൂർ & മലപ്പുറം", enLabel: "Tanur & Malappuram", icon: MapPin },
  ];

  const isAdmin = role === "admin" || role === "moderator";

  return (
    <div className="bg-[#FAF4E6] border-b border-[#E8DCBF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Brand Banner Strip */}
        <div className="py-2.5 flex items-center justify-between border-b border-[#E8DCBF]/70 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-[#194B35] text-amber-300 flex items-center justify-center font-bold">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
            </span>
            <div className="flex items-center gap-1.5 font-bold text-[#194B35]">
              <span>സ്മാർട്ട് ന്യൂസ്‌റൂം</span>
              <span className="text-neutral-400 font-normal">|</span>
              <span className="text-[#8C5B0F] font-semibold text-[11px]">OUR NATION</span>
            </div>
            <span className="hidden md:inline-block text-[11px] text-[#5C6A64] border-l border-[#DDD5C5] pl-2 font-malayalam">
              {language === "ml" ? "കൃത്യത. സുതാര്യത. വേഗത. പൂർണ്ണമായും ഓട്ടോമേറ്റഡ്." : "Accurate. Transparent. Fast. Fully Automated."}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-900 bg-emerald-100/90 px-2.5 py-0.5 rounded-full border border-emerald-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
              <span>തത്സമയം അപ്‌ഡേറ്റ് ചെയ്യുന്നു</span>
            </span>

            {isAdmin && (
              <Link
                href="/admin/newsroom"
                className="text-[11px] font-bold text-[#8C5B0F] hover:text-[#194B35] flex items-center gap-1 px-2.5 py-0.5 rounded bg-amber-100/80 hover:bg-amber-100 transition"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                <span>ന്യൂസ്‌റൂം അഡ്മിൻ</span>
              </Link>
            )}
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto py-2 scrollbar-none text-xs">
          <div className="flex items-center gap-1">
            {mainTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = pathname === tab.href;
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`px-3.5 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 whitespace-nowrap active:scale-95 ${
                    tab.isAlert
                      ? isActive
                        ? "bg-rose-700 text-white shadow-xs"
                        : "bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100"
                      : isActive
                      ? "bg-[#194B35] text-white shadow-xs"
                      : "text-[#47554F] hover:bg-white/80 hover:text-[#1A2420]"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${tab.isAlert ? "text-rose-500 fill-current" : isActive ? "text-amber-300" : "text-neutral-500"}`} />
                  <span>{language === "ml" ? tab.label : tab.enLabel}</span>
                </Link>
              );
            })}

            {/* Category Dropdown Pill */}
            <div className="relative">
              <button
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className="px-3 py-1.5 rounded-xl text-[#47554F] hover:bg-white/80 font-bold transition flex items-center gap-1 whitespace-nowrap"
              >
                <Layers className="w-3.5 h-3.5 text-neutral-500" />
                <span>{language === "ml" ? "മറ്റു വിഭാഗങ്ങൾ" : "Categories"}</span>
                <ChevronDown className="w-3 h-3 text-neutral-400" />
              </button>

              {isCategoryMenuOpen && (
                <div 
                  className="absolute top-full left-0 mt-1 w-64 bg-white rounded-2xl shadow-xl border border-[#E8DCBF] p-2 z-50 grid grid-cols-1 gap-1"
                  onMouseLeave={() => setIsCategoryMenuOpen(false)}
                >
                  {NEWS_CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/news/category/${cat.slug}`}
                      onClick={() => setIsCategoryMenuOpen(false)}
                      className="px-3 py-2 rounded-xl text-xs hover:bg-[#FAF7F0] transition flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                        <span className="font-semibold text-[#1A2420] group-hover:text-[#194B35]">
                          {language === "ml" ? cat.name_ml : cat.name}
                        </span>
                      </div>
                      <span className="text-[10px] text-neutral-400 font-mono">
                        {cat.article_count}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Search Hub Button */}
          <Link
            href="/explore?tab=news"
            className="text-xs font-semibold text-[#194B35] hover:text-[#8C5B0F] hidden sm:flex items-center gap-1 whitespace-nowrap"
          >
            <Search className="w-3.5 h-3.5" />
            <span>വാർത്തകൾ തിരയുക</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
