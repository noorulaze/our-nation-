"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n/context";
import { Home, Compass, MessageSquare, PlusCircle, User } from "lucide-react";

export function BottomNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const tabs = [
    { href: "/", label: t("navHome"), icon: Home },
    { href: "/discover", label: t("navDiscover"), icon: Compass },
    { href: "/community", label: t("navCommunity"), icon: MessageSquare },
    { href: "/create", label: t("navCreate"), icon: PlusCircle, isHighlight: true },
    { href: "/profile", label: t("navProfile"), icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-md border-t border-border px-2 py-1 safe-area-pb">
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
                <div className="w-12 h-12 rounded-full bg-brand-700 text-white flex items-center justify-center shadow-lg hover:bg-brand-800 transition active:scale-95">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-semibold text-brand-700 mt-1">
                  {tab.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-lg transition ${
                isActive ? "text-brand-700 font-semibold" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px]">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
