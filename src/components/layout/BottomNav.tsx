"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n/context";
import { Home, Search, Bell, User } from "lucide-react";

export function BottomNav() {
  const pathname = usePathname();
  const { language } = useLanguage();

  const tabs = [
    { 
      href: "/", 
      label: language === "ml" ? "ഹോം" : "Home", 
      icon: Home,
      isActive: pathname === "/" 
    },
    { 
      href: "/discover", 
      label: language === "ml" ? "തിരയുക" : "Search", 
      icon: Search,
      isActive: pathname === "/discover" || pathname.startsWith("/news") || pathname.startsWith("/gallery")
    },
    { 
      href: "/events", 
      label: language === "ml" ? "അറിയിപ്പുകൾ" : "Alerts", 
      icon: Bell,
      isActive: pathname.startsWith("/events") || pathname.startsWith("/community")
    },
    { 
      href: "/profile", 
      label: language === "ml" ? "പ്രൊഫൈൽ" : "Profile", 
      icon: User,
      isActive: pathname.startsWith("/profile") || pathname === "/login" || pathname === "/register"
    },
  ];

  return (
    <nav 
      aria-label="Mobile Navigation Bar" 
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F0]/95 backdrop-blur-md border-t border-[#EAE4D7] px-3 py-1.5 safe-area-pb shadow-[0_-4px_12px_rgba(0,0,0,0.04)]"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 active:scale-95 ${
                tab.isActive 
                  ? "text-[#1B4D36] font-bold" 
                  : "text-[#7A8880] hover:text-[#1B4D36]"
              }`}
            >
              <div className={`p-1 rounded-full transition ${tab.isActive ? "bg-[#E0F1E7]/80" : ""}`}>
                <Icon className={`w-5 h-5 ${tab.isActive ? "stroke-[2.5]" : "stroke-[1.8]"}`} />
              </div>
              <span className={`text-[10px] mt-0.5 tracking-tight ${tab.isActive ? "font-bold text-[#1B4D36]" : "font-medium"}`}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
