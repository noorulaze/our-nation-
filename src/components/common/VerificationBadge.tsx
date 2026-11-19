"use client";

import React from "react";
import { ShieldCheck, AlertTriangle, Info, Clock, FileText, CheckCircle2 } from "lucide-react";

export type VerificationLevel = 
  | "verified" 
  | "partially_verified" 
  | "approximate" 
  | "document_pending" 
  | "awaiting_verification";

interface VerificationBadgeProps {
  level: VerificationLevel;
  citation?: string;
  className?: string;
  size?: "sm" | "md";
  language?: "ml" | "en";
  compact?: boolean;
  tooltipText?: string;
}

export function VerificationBadge({
  level,
  citation,
  className = "",
  size = "sm",
  language = "en",
  compact = false,
  tooltipText,
}: VerificationBadgeProps) {
  const isMl = language === "ml";

  const config = {
    verified: {
      bg: "bg-emerald-50 text-emerald-800 border-emerald-200",
      icon: ShieldCheck,
      iconColor: "text-emerald-700",
      labelEn: "Verified",
      labelMl: "സ്ഥിരീകരിച്ചത്",
      defaultDescEn: "Backed by official gazette order or statutory register",
      defaultDescMl: "ഔദ്യോഗിക ഗസറ്റ് അല്ലെങ്കിൽ സർക്കാർ ഉത്തരവ് വഴി സ്ഥിരീകരിച്ചത്",
    },
    partially_verified: {
      bg: "bg-amber-50 text-amber-800 border-amber-200",
      icon: AlertTriangle,
      iconColor: "text-amber-700",
      labelEn: "Partially Verified",
      labelMl: "ഭാഗികമായി സ്ഥിരീകരിച്ചത്",
      defaultDescEn: "Name/framework verified; specific secondary fields pending gazette sync",
      defaultDescMl: "പേരും ഘടനയും സ്ഥിരീകരിച്ചു; വ്യക്തിഗത വിവരങ്ങൾ ഗസറ്റ് അനുസരിച്ച് പുതുക്കുന്നു",
    },
    approximate: {
      bg: "bg-slate-50 text-slate-700 border-slate-200",
      icon: Info,
      iconColor: "text-slate-600",
      labelEn: "Approximate / Indicative",
      labelMl: "ഏകദേശ വിവരം",
      defaultDescEn: "Approximate centroid or estimate; pending cadastral survey",
      defaultDescMl: "ഏകദേശ സ്ഥാനം; ഡിജിറ്റൽ സർവേ രേഖകൾ ലഭ്യമാകുന്നതിനനുസരിച്ച് പുതുക്കും",
    },
    document_pending: {
      bg: "bg-sky-50 text-sky-800 border-sky-200",
      icon: Clock,
      iconColor: "text-sky-700",
      labelEn: "Reference Only — Original Document Pending",
      labelMl: "റഫറൻസ് മാത്രം — ഒറിജിനൽ രേഖ ലഭ്യമല്ല",
      defaultDescEn: "Catalogue reference documented; scanned original PDF upload pending",
      defaultDescMl: "സൂചികയിൽ രേഖപ്പെടുത്തിയിട്ടുണ്ട്; ഒറിജിനൽ സ്കാൻ ചെയ്ത പി.ഡി.എഫ് ലഭ്യമാകുന്നതേയുള്ളൂ",
    },
    awaiting_verification: {
      bg: "bg-amber-50 text-amber-900 border-amber-300",
      icon: Clock,
      iconColor: "text-amber-800",
      labelEn: "Awaiting Official Measurement Verification",
      labelMl: "ഔദ്യോഗിക അളവുപുസ്തക (MB) പരിശോധന കാത്തിരിക്കുന്നു",
      defaultDescEn: "Progress percentage requires on-site Measurement Book (MB) inspection certification",
      defaultDescMl: "ഭൗതിക പുരോഗതി ശതമാനം ഔദ്യോഗിക എം.ബി പരിശോധനയ്ക്ക് വിധേയമാണ്",
    },
  }[level];

  const Icon = config.icon;
  const label = isMl ? config.labelMl : config.labelEn;
  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border font-bold transition-all ${config.bg} ${sizeClasses} ${className}`}
      title={tooltipText || citation || (isMl ? config.defaultDescMl : config.defaultDescEn)}
    >
      <Icon className={`w-3 h-3 ${config.iconColor} shrink-0`} />
      <span>{label}</span>
      {!compact && citation && (
        <span className="hidden sm:inline-block text-[9px] opacity-75 font-normal ml-0.5 border-l border-current pl-1 truncate max-w-[150px]">
          {citation}
        </span>
      )}
    </span>
  );
}

interface DataSourcesNoticeProps {
  title?: string;
  description?: string;
  sources?: string[];
  lastAuditDate?: string;
  language?: "ml" | "en";
  className?: string;
}

export function DataSourcesNotice({
  title,
  description,
  sources = [
    "Tanur Municipality Official Portal (tanurmunicipality.lsgkerala.gov.in)",
    "Local Self Government Department, Govt. of Kerala (lsgkerala.gov.in)",
    "K-SMART Kerala Governance Platform (ksmart.lsgkerala.gov.in)",
  ],
  lastAuditDate = "November 2026",
  language = "en",
  className = "",
}: DataSourcesNoticeProps) {
  const isMl = language === "ml";

  return (
    <div className={`p-4 sm:p-5 rounded-2xl bg-[#EDE6D8]/60 border border-[#DFD7C7] text-xs text-[#5C6A64] space-y-2 ${className}`}>
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2 text-[#194B35] font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>
            {title || (isMl ? "ഡാറ്റാ സ്രോതസ്സുകളും സുതാര്യതാ നയവും" : "Data Sources & Verification Policy")}
          </span>
        </div>
        <span className="text-[10px] text-[#7A8880] font-mono">
          {isMl ? `അവസാനം ഓഡിറ്റ് ചെയ്തത്: ${lastAuditDate}` : `Last Verified Audit: ${lastAuditDate}`}
        </span>
      </div>

      <p className="leading-relaxed text-[11px] sm:text-xs">
        {description || (isMl
          ? "ഈ വിഭാഗത്തിലെ വിവരങ്ങൾ കേരള സർക്കാർ ഗസറ്റ് വിജ്ഞാപനങ്ങൾ, തദ്ദേശ സ്വയംഭരണ വകുപ്പ് (LSGD) ഉത്തരവുകൾ, താനൂർ നഗരസഭാ ഔദ്യോഗിക രേഖകൾ എന്നിവ അടിസ്ഥാനമാക്കി രേഖപ്പെടുത്തിയതാണ്. പൗരന്മാർക്ക് വിശ്വസനീയവും കൃത്യവുമായ വിവരങ്ങൾ ലഭ്യമാക്കാൻ 'ഔർ നേഷൻ' പ്രതിജ്ഞാബദ്ധമാണ്."
          : "All civic and municipal entries strictly reflect documented government orders, official departmental gazettes, or statutory registrations. Unsupported estimates and unverified personal contacts are strictly excluded to maintain highest public integrity.")}
      </p>

      {sources.length > 0 && (
        <div className="pt-1.5 border-t border-[#DFD7C7]/70 flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-[#7A8880]">
          <span className="font-bold text-[#194B35]">{isMl ? "ഔദ്യോഗിക സ്രോതസ്സുകൾ:" : "Official References:"}</span>
          {sources.map((s, i) => (
            <span key={i} className="flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-[#194B35]" />
              <span>{s}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
