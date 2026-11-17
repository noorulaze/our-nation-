import React from "react";

export function KeralaLogo({ 
  className = "h-10", 
  variant = "light",
  showSubtext = false 
}: { 
  className?: string; 
  variant?: "light" | "dark";
  showSubtext?: boolean;
}) {
  const isDark = variant === "dark";
  const strokeColor = isDark ? "#FFFFFF" : "#1B4D36";
  const textColor = isDark ? "text-white" : "text-[#1B4D36]";
  const subtextColor = isDark ? "text-amber-200/80" : "text-[#9E6A1E]";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Coconut Tree & Wave Emblem */}
      <svg 
        viewBox="0 0 64 64" 
        className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
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

      {/* Typography */}
      <div className="flex flex-col">
        <span className={`text-xl sm:text-2xl font-bold font-malayalam-serif tracking-tight leading-none ${textColor}`}>
          നമ്മുടെ നാട്
        </span>
        {showSubtext && (
          <span className={`text-[11px] font-malayalam-script tracking-wide mt-0.5 ${subtextColor}`}>
            നമ്മുടെ നാട്... നമ്മുടെ അഭിമാനം...
          </span>
        )}
      </div>
    </div>
  );
}
