"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n/context";
import { Home, Compass, MessageSquare, PlusCircle, User } from "lucide-react";

export function BottomNav() {
  const pathname = usePathname();
  const { t, language } = useLanguage();

  const tabs = [
    { href: "/", label: language === "ml" ? "ഹോം" : "Home", icon: Home },
    { href: "/discover", label: language === "ml" ? "കണ്ടെത്തുക" : "Discover", icon: Compass },
    { href: "/create", label: language === "ml" ? "ചേർക്കുക" : "Create", icon: PlusCircle, isHighlight: true },
    { href: "/community", label: language === "ml" ? "ഫോറം" : "Forum", icon: MessageSquare },
    { href: "/profile", label: language === "ml" ? "പ്രൊഫൈൽ" : "Profile", icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F0]/95 backdrop-blur-md border-t border-[#EAE4D7] px-2 py-1 safe-area-pb">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href;

          if (tab.isHighlight) {
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="flex flex-col items-center justify-center -mt-5"
                aria-label={tab.label}
              >
                <div className="w-12 h-12 rounded-full bg-[#1B4D36] text-white flex items-center justify-center shadow-lg hover:bg-[#133A28] transition active:scale-95">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold text-[#1B4D36] mt-1">
                  {tab.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition ${
                isActive ? "text-[#1B4D36] font-bold" : "text-[#6C7A74] hover:text-[#1A2420]"
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
