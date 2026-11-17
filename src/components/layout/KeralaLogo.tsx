"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/context";

export function KeralaLogo({ 
  className = "h-10", 
  variant = "light",
  showSubtext = false 
}: { 
  className?: string; 
  variant?: "light" | "dark";
  showSubtext?: boolean;
}) {
  const { language } = useLanguage();
  const isDark = variant === "dark";
  const strokeColor = isDark ? "#FFFFFF" : "#1B4D36";
  const textColor = isDark ? "text-white" : "text-[#1B4D36]";
  const subtextColor = isDark ? "text-amber-200/90" : "text-[#9E6A1E]";

  const isEn = language === "en";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Coconut Tree & Wave Emblem */}
      <svg 
        viewBox="0 0 64 64" 
        className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Palm Fronds */}
        <path 
          d="M32 10C34 16 38 20 48 20M32 10C30 16 26 20 16 20M32 10C36 14 42 16 46 26M32 10C28 14 22 16 18 26M32 10C34 8 40 10 44 14M32 10C30 8 24 10 20 14" 
          stroke={strokeColor} 
          strokeWidth="2.5" 
          strokeLinecap="round" 
        />
        {/* Curved Trunk */}
        <path 
          d="M32 10C31 22 28 36 24 48" 
          stroke={strokeColor} 
          strokeWidth="3" 
          strokeLinecap="round" 
        />
        {/* Island & Water Waves */}
        <path 
          d="M12 48C18 45 28 45 36 48M8 53C16 51 28 50 42 53M14 58C22 56 34 56 50 58" 
          stroke={strokeColor} 
          strokeWidth="2" 
          strokeLinecap="round" 
        />
        {/* Birds in flight */}
        <path 
          d="M48 10C49 8 51 9 52 10C53 9 55 8 56 10" 
          stroke={strokeColor} 
          strokeWidth="1.5" 
          strokeLinecap="round" 
        />
      </svg>

      {/* Brand Wordmark Typography Hierarchy */}
      <div className="flex flex-col">
        {isEn ? (
          <>
            <span className={`text-lg sm:text-2xl font-extrabold font-brand tracking-tight leading-none ${textColor}`}>
              OUR NATION
            </span>
            <span className={`text-[10px] sm:text-[11px] font-medium font-malayalam tracking-normal mt-0.5 ${subtextColor}`}>
              നമ്മുടെ നാട് • Malappuram & Tanur
            </span>
          </>
        ) : (
          <>
            <span className={`text-xl sm:text-2xl font-bold font-malayalam leading-none tracking-normal ${textColor}`}>
              നമ്മുടെ നാട്
            </span>
            <span className={`text-[10px] sm:text-[11px] font-semibold font-brand tracking-wider uppercase mt-0.5 ${subtextColor}`}>
              OUR NATION • താനൂർ & മലപ്പുറം
            </span>
          </>
        )}
      </div>
    </div>
  );
}
