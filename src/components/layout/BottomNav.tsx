"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n/context";
import { Home, Building2, AlertTriangle, HardHat, Briefcase, User, FileText } from "lucide-react";

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
      href: "/digital-municipality", 
      label: language === "ml" ? "നഗരസഭ" : "Municipality", 
      icon: Building2,
      isActive: pathname.startsWith("/digital-municipality") || pathname.startsWith("/digital-tanur")
    },
    { 
      href: "/civic-connect", 
      label: language === "ml" ? "പരാതികൾ" : "Civic", 
      icon: AlertTriangle,
      isActive: pathname.startsWith("/civic-connect") || pathname.startsWith("/civic")
    },
    { 
      href: "/development-tracker", 
      label: language === "ml" ? "വികസനം" : "Projects", 
      icon: HardHat,
      isActive: pathname.startsWith("/development-tracker") || pathname.startsWith("/development")
    },
    { 
      href: "/public-services", 
      label: language === "ml" ? "സേവനങ്ങൾ" : "Services", 
      icon: Briefcase,
      isActive: pathname.startsWith("/public-services")
    },
    { 
      href: "/profile", 
      label: language === "ml" ? "പ്രൊഫൈൽ" : "Profile", 
      icon: User,
      isActive: pathname.startsWith("/profile") || pathname.startsWith("/dashboard") || pathname.startsWith("/admin")
    },
  ];

  return (
    <nav 
      aria-label="Mobile Navigation Bar" 
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F0]/95 backdrop-blur-md border-t border-[#EAE4D7] px-2 py-1 safe-area-pb shadow-[0_-4px_16px_rgba(0,0,0,0.06)]"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex-1 flex flex-col items-center justify-center py-1 rounded-2xl transition-all duration-200 active:scale-95 min-h-[48px] ${
                tab.isActive 
                  ? "text-[#1B4D36] font-bold" 
                  : "text-[#7A8880] hover:text-[#1B4D36]"
              }`}
            >
              <div className={`p-1 rounded-full transition-colors ${tab.isActive ? "bg-[#E0F1E7]" : ""}`}>
                <Icon className={`w-5 h-5 ${tab.isActive ? "stroke-[2.5]" : "stroke-[1.8]"}`} />
              </div>
              <span className={`text-[10px] mt-0.5 whitespace-nowrap ${language === "ml" ? "font-malayalam tracking-normal" : "font-manrope tracking-tight"} ${tab.isActive ? "font-bold text-[#1B4D36]" : "font-medium"}`}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
