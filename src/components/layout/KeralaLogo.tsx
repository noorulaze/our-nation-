"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/context";

export function KeralaLogo({ 
  className = "", 
  variant = "light",
  showSubtext = true 
}: { 
  className?: string; 
  variant?: "light" | "dark";
  showSubtext?: boolean;
}) {
  const { language } = useLanguage();
  const isDark = variant === "dark";
  const strokeColor = isDark ? "#FFFFFF" : "#194B35";
  const textColor = isDark ? "text-white" : "text-[#194B35]";
  const subtextColor = isDark ? "text-amber-200/90" : "text-[#3D4B44]";
  const municipalityColor = isDark ? "text-amber-300/80" : "text-[#C39A5B]";

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 flex-shrink-0 whitespace-nowrap ${className}`}>
      {/* Traditional Kerala Heritage & Coastal Architectural Emblem */}
      <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#194B35]/10 border border-[#194B35]/20 flex items-center justify-center p-1.5 flex-shrink-0 shadow-xs">
        <svg 
          viewBox="0 0 64 64" 
          className="w-full h-full" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Traditional Kerala Roof Gable */}
          <path 
            d="M32 6L14 22H50L32 6Z" 
            stroke={strokeColor} 
            strokeWidth="2.5" 
            strokeLinejoin="round" 
            fill={isDark ? "rgba(255,255,255,0.12)" : "rgba(25,75,53,0.08)"}
          />
          {/* Gable finial */}
          <path d="M32 3V6" stroke="#C39A5B" strokeWidth="2.5" strokeLinecap="round" />
          {/* Palm Fronds on sides */}
          <path 
            d="M14 22C10 16 6 18 4 22M14 22C8 24 6 28 8 32M50 22C54 16 58 18 60 22M50 22C56 24 58 28 56 32" 
            stroke={strokeColor} 
            strokeWidth="2" 
            strokeLinecap="round" 
          />
          {/* Pillars */}
          <path d="M20 22V42M28 22V42M36 22V42M44 22V42" stroke={strokeColor} strokeWidth="2" />
          {/* Plinth */}
          <path d="M10 42H54V48H10V42Z" stroke={strokeColor} strokeWidth="2" fill={isDark ? "rgba(255,255,255,0.05)" : "rgba(25,75,53,0.05)"} />
          {/* Water waves */}
          <path 
            d="M8 54C16 51 28 51 40 54M24 59C34 57 44 57 56 59" 
            stroke="#C39A5B" 
            strokeWidth="2" 
            strokeLinecap="round" 
          />
        </svg>
      </div>

      {/* Brand Wordmark Typography Hierarchy Matching Design Reference */}
      <div className="flex flex-col flex-shrink-0 text-left justify-center leading-none">
        <span className={`text-base sm:text-lg lg:text-xl font-black font-brand tracking-tight ${textColor}`}>
          OUR NATION
        </span>
        {showSubtext && (
          <>
            <span className={`text-[10px] sm:text-[11px] font-semibold tracking-normal mt-0.5 ${subtextColor}`}>
              Digital Municipality Platform
            </span>
            <span className={`text-[9px] sm:text-[10px] font-bold tracking-wide mt-0.5 ${municipalityColor}`}>
              Tanur Municipality
            </span>
          </>
        )}
      </div>
    </div>
  );
}
