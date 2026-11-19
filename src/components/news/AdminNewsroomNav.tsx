"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n/context";
import { 
  ShieldCheck, 
  LayoutDashboard, 
  Rss, 
  FileSpreadsheet, 
  AlertCircle, 
  BarChart3, 
  Eye, 
  ArrowLeft 
} from "lucide-react";
import { newsroomStore } from "@/lib/data/newsroomStore";

export function AdminNewsroomNav() {
  const pathname = usePathname();
  const { language } = useLanguage();

  const pendingReviewCount = newsroomStore.getEditorialReviews().filter(r => r.review_status === "pending").length;

  const links = [
    { href: "/admin/newsroom", label: "ഡാഷ്‌ബോർഡ്", enLabel: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/newsroom/sources", label: "വാർത്താ ഉറവിടങ്ങൾ (Sources)", enLabel: "News Sources", icon: Rss },
    { href: "/admin/newsroom/articles", label: "വാർത്തകൾ മാനേജ് ചെയ്യുക", enLabel: "Articles", icon: FileSpreadsheet },
    { href: "/admin/newsroom/review", label: "എഡിറ്റോറിയൽ റിവ്യൂ", enLabel: "Editorial Review", icon: AlertCircle, badge: pendingReviewCount > 0 ? pendingReviewCount : null },
    { href: "/admin/newsroom/analytics", label: "ന്യൂസ്‌റൂം അനലിറ്റിക്സ്", enLabel: "Analytics", icon: BarChart3 },
  ];

  return (
    <div className="bg-[#143E2C] text-white border-b border-[#0F3022]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Admin Banner */}
        <div className="py-2.5 flex items-center justify-between border-b border-white/10 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-md bg-amber-400 text-[#143E2C] flex items-center justify-center font-bold text-[10px]">
              ADM
            </span>
            <span className="font-bold tracking-wide text-amber-300">
              സ്മാർട്ട് ന്യൂസ്‌റൂം അഡ്മിൻ കൺട്രോൾ സെന്റർ
            </span>
            <span className="hidden md:inline-block text-[11px] text-white/60 border-l border-white/20 pl-2">
              താനൂർ & മലപ്പുറം ഓട്ടോമേറ്റഡ് പബ്ലിഷിംഗ്
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/news"
              className="text-[11px] text-white/80 hover:text-white flex items-center gap-1 transition"
            >
              <Eye className="w-3.5 h-3.5 text-amber-300" />
              <span>പബ്ലിക് പോർട്ടൽ കാണുക</span>
            </Link>
            <Link
              href="/admin"
              className="text-[11px] text-white/80 hover:text-white flex items-center gap-1 border-l border-white/20 pl-3 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>പ്രധാന അഡ്മിൻ പാനൽ</span>
            </Link>
          </div>
        </div>

        {/* Admin Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-none text-xs">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                  isActive
                    ? "bg-white text-[#143E2C] shadow-xs"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#143E2C]" : "text-amber-300"}`} />
                <span>{language === "ml" ? link.label : link.enLabel}</span>
                {link.badge && (
                  <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}
