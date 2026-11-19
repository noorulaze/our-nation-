"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n/context";
import { useAuth } from "@/lib/auth/context";
import { 
  HardHat, 
  Search, 
  MapPin, 
  ShieldCheck, 
  MessageSquarePlus, 
  Compass, 
  FileCheck2,
  ChevronRight
} from "lucide-react";

export function DevelopmentNav() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const { role } = useAuth();
  const isStaff = role === "admin" || role === "moderator";

  const navLinks = [
    {
      href: "/development",
      label: "ഡാഷ്‌ബോർഡ് & മാപ്പ്",
      enLabel: "Dashboard & Map",
      icon: HardHat,
      exact: true,
    },
    {
      href: "/development/projects",
      label: "പദ്ധതി സൂചിക",
      enLabel: "Project Directory",
      icon: Search,
      exact: false,
    },
    {
      href: "/digital-tanur",
      label: "താനൂർ ജി.ഐ.എസ്",
      enLabel: "Tanur GIS",
      icon: Compass,
      exact: false,
    },
    {
      href: "/peoples-voice",
      label: "ജനകീയ പങ്കാളിത്തം",
      enLabel: "Citizen Voice",
      icon: MessageSquarePlus,
      exact: false,
    },
  ];

  return (
    <div className="sticky top-16 sm:top-20 z-30 bg-[#FAF7F0]/95 backdrop-blur-md border-b border-[#EDE6D8] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 py-2 sm:py-2.5">
          {/* Brand Pill */}
          <div className="flex items-center gap-2 pr-3 border-r border-[#EDE6D8] shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#194B35] animate-pulse" />
            <Link href="/development" className="text-xs sm:text-sm font-extrabold text-[#194B35] font-malayalam-heading hover:text-[#C39A5B] transition flex items-center gap-1.5">
              <span>{language === "ml" ? "സുതാര്യ താനൂർ" : "Transparent Tanur"}</span>
              <span className="hidden md:inline-block px-1.5 py-0.5 rounded text-[10px] bg-[#C39A5B]/20 text-[#194B35] font-mono">
                Tracker
              </span>
            </Link>
          </div>

          {/* Links list */}
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-none py-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact 
                ? pathname === item.href 
                : pathname === item.href || (item.href !== "/development" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
                    isActive
                      ? "bg-[#194B35] text-white shadow-xs"
                      : "bg-white text-[#5C6A64] hover:text-[#194B35] hover:bg-white/80 border border-[#EDE6D8]"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#C39A5B]" : "text-[#5C6A64]"}`} />
                  <span>{language === "ml" ? item.label : item.enLabel}</span>
                </Link>
              );
            })}

            {/* Staff / Admin link */}
            {isStaff && (
              <Link
                href="/admin/development"
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
                  pathname.startsWith("/admin/development")
                    ? "bg-[#C39A5B] text-[#194B35] shadow-xs"
                    : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200"
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{language === "ml" ? "അഡ്മിൻ" : "Admin Panel"}</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
