"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";
import { useCommunity } from "@/lib/community/context";
import { ShieldCheck, Heart, Sparkles, MapPin } from "lucide-react";

export function Footer() {
  const { t, language } = useLanguage();
  const { setSelectedDistrict, availableCommunities } = useCommunity();

  const keralaDistricts = [
    "Thiruvananthapuram", "Kollam", "Pathanamthitta", "Alappuzha",
    "Kottayam", "Idukki", "Ernakulam", "Thrissur",
    "Palakkad", "Malappuram", "Kozhikode", "Wayanad",
    "Kannur", "Kasaragod"
  ];

  return (
    <footer className="bg-surface border-t border-border mt-auto mb-16 md:mb-0 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* District Directory Bar */}
        <div className="mb-10 pb-8 border-b border-border/80">
          <div className="flex items-center gap-2 mb-3 text-xs font-bold text-foreground uppercase tracking-wider">
            <MapPin className="w-4 h-4 text-brand-700" />
            <span>{language === "ml" ? "കേരളത്തിലെ ജില്ലകൾ" : "Districts of Kerala"}</span>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            {keralaDistricts.map((district) => (
              <Link
                key={district}
                href="/discover"
                onClick={() => setSelectedDistrict(district)}
                className="px-2.5 py-1 rounded-md bg-muted/60 hover:bg-brand-50 hover:text-brand-700 text-muted-foreground transition border border-transparent hover:border-brand-200"
              >
                {district}
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-700 text-white flex items-center justify-center font-bold text-base">
                <span>നാ</span>
              </div>
              <span className="font-bold text-lg text-foreground">
                {language === "ml" ? "നമ്മുടെ നാട്" : "Nammude Naadu"}
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              {t("heroDescription")}
            </p>
            <div className="flex items-center gap-2 text-xs text-brand-700 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>{t("trustTitle")}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-3">
              {t("navDiscover")}
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/discover?tab=events" className="hover:text-brand-700 transition">
                  {t("tabEvents")}
                </Link>
              </li>
              <li>
                <Link href="/discover?tab=services" className="hover:text-brand-700 transition">
                  {t("tabServices")}
                </Link>
              </li>
              <li>
                <Link href="/discover?tab=places" className="hover:text-brand-700 transition">
                  {t("tabPlaces")}
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:text-brand-700 transition">
                  {t("communityFeed")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Civic & Platform */}
          <div>
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-3">
              {t("civicTitle")}
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/create?type=issue" className="hover:text-brand-700 transition">
                  {t("reportIssue")}
                </Link>
              </li>
              <li>
                <Link href="/create?type=service" className="hover:text-brand-700 transition">
                  {t("submitService")}
                </Link>
              </li>
              <li>
                <Link href="/create?type=event" className="hover:text-brand-700 transition">
                  {t("submitEvent")}
                </Link>
              </li>
              <li>
                <Link href="/ai" className="hover:text-brand-700 transition flex items-center gap-1.5 font-medium text-brand-700">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t("aiTitle")}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-3">
          <p>
            © {new Date().getFullYear()} Nammude Naadu. Built for the communities of Kerala.
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for local civic life
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
