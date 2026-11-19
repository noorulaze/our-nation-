"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { useLanguage } from "@/lib/i18n/context";
import { 
  TANUR_MUNICIPAL_SERVICES, 
  SERVICE_CATEGORIES 
} from "@/lib/data/publicServicesData";
import { VerificationBadge, DataSourcesNotice } from "@/components/common/VerificationBadge";
import { 
  Briefcase, 
  Search, 
  Filter, 
  CheckCircle2, 
  FileText, 
  ExternalLink, 
  Clock, 
  Phone, 
  MapPin, 
  Building2, 
  HelpCircle, 
  ChevronDown, 
  ChevronRight,
  ShieldCheck,
  Check,
  ArrowRight,
  Sparkles,
  Info,
  CreditCard,
  Home,
  FileCheck,
  Droplets,
  AlertCircle
} from "lucide-react";

export default function PublicServicesPage() {
  const { language } = useLanguage();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>("srv-birth-reg");

  // Filtered Services
  const filteredServices = useMemo(() => {
    return TANUR_MUNICIPAL_SERVICES.filter(service => {
      if (selectedCategory !== "all" && service.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = service.title.toLowerCase().includes(q) || service.title_ml.toLowerCase().includes(q);
        const matchesSummary = service.summary.toLowerCase().includes(q) || service.summary_ml.toLowerCase().includes(q);
        const matchesDept = service.department.toLowerCase().includes(q) || service.department_ml.toLowerCase().includes(q);
        return matchesTitle || matchesSummary || matchesDept;
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] flex flex-col font-sans selection:bg-[#194B35]/20 selection:text-[#194B35]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 w-full">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: language === "ml" ? "ഹോം" : "Home", href: "/" },
            { label: language === "ml" ? "പൊതു സേവനങ്ങൾ" : "Public Services" },
          ]}
        />

        {/* ========================================================================= */}
        {/* 1. HERO SECTION (Kerala Municipal Waterfront Style)                       */}
        {/* ========================================================================= */}
        <div className="relative rounded-3xl sm:rounded-[36px] bg-gradient-to-br from-[#FAF7F0] via-[#F5F1E7] to-[#EDE6D8] border border-[#EDE6D8] p-6 sm:p-10 shadow-xs overflow-hidden">
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#194B35_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#194B35]/10 text-[#194B35] text-xs font-bold border border-[#194B35]/20">
                <Briefcase className="w-4 h-4 text-[#194B35]" />
                <span>{language === "ml" ? "നഗരസഭാ പൗര സേവന വിവരങ്ങൾ" : "Citizen Public Services • Feature 04"}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#194B35] tracking-tight font-malayalam-heading leading-tight">
                {language === "ml" ? "പൊതു സേവന സൂചിക" : "Our Digital Services"}
              </h1>

              <p className="text-xs sm:text-sm text-[#5C6A64] leading-relaxed max-w-xl">
                {language === "ml"
                  ? "താനൂർ നഗരസഭയിൽ ലഭ്യമായ പൗരസേവനങ്ങൾ, അപേക്ഷിക്കേണ്ട നടപടിക്രമങ്ങൾ, ആവശ്യമായ രേഖകളുടെ ചെക്ക്‌ലിസ്റ്റ്, ഓഫീസ് സമയങ്ങൾ, കെ-സ്മാർട്ട് ഔദ്യോഗിക ഓൺലൈൻ ലിങ്കുകൾ എന്നിവ ഇവിടെ പരിശോധിക്കാം."
                  : "Access verified municipal services online, anytime, anywhere. Understand exact statutory procedures, required document checklists, fees, and direct links to official Kerala Government portals."}
              </p>

              {/* Badges strip */}
              <div className="pt-1 flex flex-wrap items-center gap-2.5 text-xs">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 text-[#194B35] border border-[#EDE6D8] shadow-2xs font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  <span>K-Smart Integrated</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 text-[#194B35] border border-[#EDE6D8] shadow-2xs font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C39A5B]" />
                  <span>Statutory Fees Only</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 text-[#194B35] border border-[#EDE6D8] shadow-2xs font-bold">
                  <Clock className="w-3.5 h-3.5 text-blue-700" />
                  <span>Citizen Charter SLAs</span>
                </div>
              </div>
            </div>

            {/* Switchboard Callout Card */}
            <div className="md:col-span-5 flex justify-center md:justify-end w-full">
              <div className="bg-white rounded-3xl border border-[#EDE6D8] p-5 sm:p-6 shadow-2xs space-y-3 w-full max-w-sm text-left">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#194B35] text-white flex items-center justify-center font-bold text-lg">
                    🏛️
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#194B35] font-malayalam-heading">
                      {language === "ml" ? "ഫ്രണ്ട് ഓഫീസ് ഹെൽപ്പ്‌ഡെസ്ക്" : "Front Office Helpdesk"}
                    </h4>
                    <span className="text-[10px] text-[#5C6A64]">Tanur Municipal Office</span>
                  </div>
                </div>
                <p className="text-[11px] text-[#5C6A64] leading-relaxed">
                  {language === "ml"
                    ? "സേവനങ്ങളെക്കുറിച്ചുള്ള അന്വേഷണങ്ങൾക്കും അക്ഷയ സേവന സംശയങ്ങൾക്കും കേന്ദ്ര ഓഫീസിലേക്ക് വിളിക്കുക."
                    : "For offline token guidance, Akshaya liaison, or procedural queries, contact the central switchboard."}
                </p>
                <a
                  href="tel:04942440228"
                  className="w-full py-2.5 bg-[#FAF7F0] hover:bg-[#EDE6D8] text-[#194B35] border border-[#EDE6D8] rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C39A5B]" />
                  <span>0494 2440228</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. QUICK ACCESS CARDS (From Visual Design Reference media_1795061857199)  */}
        {/* ========================================================================= */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#C39A5B]">
              {language === "ml" ? "പ്രധാന ഓൺലൈൻ സേവനങ്ങൾ" : "Essential Municipal Services"}
            </h2>
            <span className="text-xs text-[#5C6A64]">
              {language === "ml" ? "കെ-സ്മാർട്ട് & സഞ്ചിത ലിങ്കുകൾ" : "Official Kerala Portals"}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {[
              {
                title: "Property Tax",
                title_ml: "വസ്തുനികുതി",
                subtitle: "Pay & Manage",
                icon: Home,
                href: "https://tax.lsgkerala.gov.in/",
                portal: "Sanchitha",
              },
              {
                title: "Building Permit",
                title_ml: "കെട്ടിട നിർമ്മാണം",
                subtitle: "Apply Online",
                icon: Building2,
                href: "https://ksmart.lsgkerala.gov.in/",
                portal: "K-SMART",
              },
              {
                title: "Trade License",
                title_ml: "വ്യാപാര ലൈസൻസ്",
                subtitle: "D&O Renewal",
                icon: Briefcase,
                href: "https://ksmart.lsgkerala.gov.in/",
                portal: "K-SMART",
              },
              {
                title: "Vital Records",
                title_ml: "ജനന-മരണ രജിസ്ട്രേഷൻ",
                subtitle: "Certificates",
                icon: FileCheck,
                href: "https://cr.lsgkerala.gov.in/",
                portal: "Sevana CR",
              },
              {
                title: "Welfare Pension",
                title_ml: "ക്ഷേമ പെൻഷൻ",
                subtitle: "Status & DBT",
                icon: CreditCard,
                href: "https://welfarepension.lsgkerala.gov.in/",
                portal: "Sevana",
              },
              {
                title: "File Grievance",
                title_ml: "പരാതി രജിസ്ട്രേഷൻ",
                subtitle: "Civic Connect",
                icon: AlertCircle,
                href: "/civic-connect",
                portal: "Our Nation",
                internal: true,
              },
            ].map((card, idx) => {
              const Icon = card.icon;
              return card.internal ? (
                <Link
                  key={idx}
                  href={card.href}
                  className="bg-white rounded-3xl border border-[#EDE6D8] p-4 text-center hover:shadow-md hover:border-[#194B35] transition flex flex-col items-center justify-between space-y-2 group"
                >
                  <div className="w-10 h-10 rounded-2xl bg-[#194B35]/10 text-[#194B35] flex items-center justify-center group-hover:bg-[#194B35] group-hover:text-white transition">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-[#194B35] block truncate font-malayalam-heading">
                      {language === "ml" ? card.title_ml : card.title}
                    </span>
                    <span className="text-[10px] text-[#5C6A64] block">{card.subtitle}</span>
                  </div>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#FAF7F0] text-[#C39A5B] border border-[#EDE6D8]">
                    {card.portal}
                  </span>
                </Link>
              ) : (
                <a
                  key={idx}
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-3xl border border-[#EDE6D8] p-4 text-center hover:shadow-md hover:border-[#194B35] transition flex flex-col items-center justify-between space-y-2 group"
                >
                  <div className="w-10 h-10 rounded-2xl bg-[#194B35]/10 text-[#194B35] flex items-center justify-center group-hover:bg-[#194B35] group-hover:text-white transition">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-[#194B35] block truncate font-malayalam-heading">
                      {language === "ml" ? card.title_ml : card.title}
                    </span>
                    <span className="text-[10px] text-[#5C6A64] block">{card.subtitle}</span>
                  </div>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#FAF7F0] text-[#C39A5B] border border-[#EDE6D8]">
                    {card.portal} ↗
                  </span>
                </a>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. SEARCH & CATEGORY PILLS BAR                                            */}
        {/* ========================================================================= */}
        <div className="space-y-4">
          <div className="relative w-full max-w-xl">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              aria-label="Search public services"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                language === "ml"
                  ? "ജനന സർട്ടിഫിക്കറ്റ്, പെർമിറ്റ്, വസ്തുനികുതി, പെൻഷൻ തിരയുക..."
                  : "Search birth certificate, building permit, property tax, pension..."
              }
              className="w-full pl-10 pr-4 py-2.5 bg-white text-xs sm:text-sm border border-[#EDE6D8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#194B35] shadow-xs text-[#1A2420]"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[#EDE6D8]">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                selectedCategory === "all"
                  ? "bg-[#194B35] text-white shadow-xs"
                  : "bg-white text-[#5C6A64] hover:bg-[#FAF7F0] border border-[#EDE6D8]"
              }`}
            >
              {language === "ml" ? "എല്ലാ സേവനങ്ങളും" : "All Services"} ({TANUR_MUNICIPAL_SERVICES.length})
            </button>

            {SERVICE_CATEGORIES.map(c => {
              const isSelected = selectedCategory === c.key;
              const count = TANUR_MUNICIPAL_SERVICES.filter(s => s.category === c.key).length;
              return (
                <button
                  key={c.key}
                  onClick={() => setSelectedCategory(c.key)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-[#194B35] text-white shadow-xs"
                      : "bg-white text-[#5C6A64] hover:bg-[#FAF7F0] border border-[#EDE6D8]"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
                  <span>{language === "ml" ? c.label_ml : c.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? "bg-white/20 text-white" : "bg-[#FAF7F0] text-[#194B35]"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. TRANSPARENCY & STATUTORY POLICY BANNER                                 */}
        {/* ========================================================================= */}
        <div className="p-4 sm:p-5 rounded-3xl bg-amber-50/80 border border-amber-200/90 text-xs text-amber-950 space-y-2 shadow-2xs">
          <div className="flex items-center gap-2 font-bold text-amber-900">
            <ShieldCheck className="w-4 h-4 text-amber-800 shrink-0" />
            <span className="text-sm">
              {language === "ml"
                ? "പൗര സേവന വിവര സുതാര്യതാ മാർഗ്ഗരേഖ"
                : "Public Services Transparency & Legal Verification Policy"}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px] text-amber-900/90 leading-relaxed pt-1">
            <div className="p-3 rounded-2xl bg-white/80 border border-amber-200/60 shadow-2xs">
              <span className="font-bold block text-[#194B35] mb-0.5">
                1. {language === "ml" ? "നിയമപരമായ ഫീസുകൾ മാത്രം" : "Statutory Fees Only"}
              </span>
              {language === "ml"
                ? "കെ.എം.ബി.ആർ (KMBR 2019), ജനന-മരണ രജിസ്ട്രേഷൻ ചട്ടങ്ങൾ, തദ്ദേശ വകുപ്പ് ഉത്തരവുകൾ എന്നിവയിൽ അനുശാസിക്കുന്ന ഔദ്യോഗിക ഫീസുകൾ മാത്രം പ്രദർശിപ്പിക്കുന്നു."
                : "Fees strictly reflect schedules under Kerala Municipality Building Rules 2019, RBD Act 1969, and LSGD Government Orders."}
            </div>
            <div className="p-3 rounded-2xl bg-white/80 border border-amber-200/60 shadow-2xs">
              <span className="font-bold block text-[#194B35] mb-0.5">
                2. {language === "ml" ? "സമയപരിധി വർഗ്ഗീകരണം" : "Timelines vs SLA Targets"}
              </span>
              {language === "ml"
                ? "സർക്കാർ നിയമപ്രകാരമുള്ള സമയപരിധികളും നഗരസഭയുടെ ഇന്റേണൽ സിറ്റിസൺ ചാർട്ടർ ലക്ഷ്യങ്ങളും (ഉദാ: തെരുവ് വിളക്ക് അറ്റകുറ്റപ്പണി 2-4 ദിവസം) കൃത്യമായി വേർതിരിച്ചിരിക്കുന്നു."
                : "Statutory deadlines mandated by Legislature are clearly separated from internal municipal citizen charter SLA targets."}
            </div>
            <div className="p-3 rounded-2xl bg-white/80 border border-amber-200/60 shadow-2xs">
              <span className="font-bold block text-[#194B35] mb-0.5">
                3. {language === "ml" ? "ഔദ്യോഗിക പോർട്ടലുകൾ" : "Direct Official Portals"}
              </span>
              {language === "ml"
                ? "അപേക്ഷകൾ സമർപ്പിക്കാൻ K-SMART, സഞ്ചിത, സേവന എന്നീ ഔദ്യോഗിക കേരള സർക്കാർ പോർട്ടലുകളിലേക്ക് നേരിട്ടുള്ള ലിങ്കുകൾ നൽകിയിരിക്കുന്നു."
                : "Direct integrations to official Kerala platforms: K-SMART, Sanchitha Property Tax, Sevana Welfare Pensions, and Clean Kerala."}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 5. SERVICES LIST ACCORDION / CARDS                                        */}
        {/* ========================================================================= */}
        <div className="space-y-5">
          {filteredServices.map((service) => {
            const isExpanded = expandedServiceId === service.id;
            const isInternalCharter = service.id === "srv-streetlight-repair";

            return (
              <div
                key={service.id}
                className={`bg-white rounded-3xl border transition-all overflow-hidden ${
                  isExpanded 
                    ? "border-[#194B35] shadow-md ring-1 ring-[#194B35]/20" 
                    : "border-[#EDE6D8] hover:border-[#C39A5B] shadow-xs"
                }`}
              >
                {/* Header Bar */}
                <div
                  onClick={() => setExpandedServiceId(isExpanded ? null : service.id)}
                  className="p-5 sm:p-6 cursor-pointer flex items-start justify-between gap-4 select-none"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FAF7F0] text-[#194B35] border border-[#EDE6D8]">
                        {language === "ml" ? service.category_name_ml : service.category_name}
                      </span>

                      {isInternalCharter ? (
                        <VerificationBadge 
                          level="partially_verified" 
                          citation="Citizen Charter SLA" 
                          language={language} 
                        />
                      ) : (
                        <VerificationBadge 
                          level="verified" 
                          citation={service.source_reference} 
                          language={language} 
                        />
                      )}

                      {service.is_online_available && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                          Online via {service.online_system_name} ✓
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-lg sm:text-xl text-[#194B35] font-malayalam-heading">
                      {language === "ml" ? service.title_ml : service.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#5C6A64] line-clamp-2 leading-relaxed">
                      {language === "ml" ? service.summary_ml : service.summary}
                    </p>

                    <div className="flex items-center gap-3 text-xs text-[#5C6A64] pt-1 flex-wrap">
                      <span className="flex items-center gap-1 font-semibold">
                        <Clock className="w-3.5 h-3.5 text-[#C39A5B]" />
                        <span>
                          {isInternalCharter
                            ? (language === "ml" 
                                ? `ചാർട്ടർ ലക്ഷ്യം: ${service.processing_time_text_ml}`
                                : `Charter Target: ${service.processing_time_text}`)
                            : (language === "ml" 
                                ? `നിയമപരമായ സമയപരിധി: ${service.processing_time_text_ml}`
                                : `Statutory Timeline: ${service.processing_time_text}`)}
                        </span>
                      </span>
                      <span>•</span>
                      <span className="truncate">{language === "ml" ? service.department_ml : service.department}</span>
                    </div>
                  </div>

                  <div className="w-9 h-9 rounded-full bg-[#FAF7F0] text-[#194B35] border border-[#EDE6D8] flex items-center justify-center shrink-0">
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                  </div>
                </div>

                {/* Expanded Details Body */}
                {isExpanded && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-gray-100 space-y-6 text-xs animate-in fade-in duration-150">
                    {/* Required Documents Checklist */}
                    <div className="space-y-2">
                      <h4 className="font-bold text-sm text-[#194B35] flex items-center gap-2 font-malayalam-heading">
                        <FileText className="w-4 h-4 text-[#C39A5B]" />
                        <span>{language === "ml" ? "ആവശ്യമായ രേഖകൾ (Required Documents):" : "Required Documents Checklist:"}</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {(language === "ml" ? service.required_documents_ml : service.required_documents).map((doc, idx) => (
                          <div key={idx} className="p-3 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="text-[#1A2420]">{doc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Step-by-Step Procedure */}
                    <div className="space-y-2">
                      <h4 className="font-bold text-sm text-[#194B35] flex items-center gap-2 font-malayalam-heading">
                        <ArrowRight className="w-4 h-4 text-[#C39A5B]" />
                        <span>{language === "ml" ? "നടപടിക്രമങ്ങൾ (Step-by-Step Procedure):" : "Step-by-Step Application Procedure:"}</span>
                      </h4>
                      <div className="space-y-2">
                        {service.procedure_steps.map((st) => (
                          <div key={st.step_number} className="p-3.5 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] flex items-start gap-3">
                            <span className="w-6 h-6 rounded-full bg-[#194B35] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                              {st.step_number}
                            </span>
                            <div className="space-y-0.5">
                              <span className="font-bold text-[#194B35]">{language === "ml" ? st.title_ml : st.title}</span>
                              <p className="text-[#5C6A64] leading-relaxed">{language === "ml" ? st.description_ml : st.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Fee Structure & Office Contact Box */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-gray-700 block">
                            {isInternalCharter
                              ? (language === "ml" ? "സേവന നിരക്ക്:" : "Service Fee:")
                              : (language === "ml" ? "നിയമപരമായ ഫീസ് നിരക്ക്:" : "Statutory Fee:")}
                          </span>
                          <span className="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                            Verified Source
                          </span>
                        </div>
                        <p className="text-[#5C6A64] font-medium">
                          {language === "ml" ? service.fee_structure_ml : service.fee_structure}
                        </p>
                        <span className="text-[10px] text-[#7A8880] block pt-1 border-t border-gray-200">
                          Legal Citation: {service.source_reference}
                        </span>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] space-y-1.5">
                        <span className="font-bold text-gray-700 block">
                          {language === "ml" ? "ഓഫീസ് ലൊക്കേഷൻ & ബന്ധപ്പെടേണ്ട നമ്പർ:" : "Office & Contact:"}
                        </span>
                        <p className="text-[#5C6A64]">
                          {language === "ml" ? service.office_location_ml : service.office_location}
                        </p>
                        <p className="text-[#194B35] font-bold">
                          Phone: {service.contact_phone}
                        </p>
                      </div>
                    </div>

                    {/* Action Link Footer */}
                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <span className="text-[11px] text-gray-400">
                        Official Government Portal • Last verified: {service.last_verified_date}
                      </span>

                      <div className="flex items-center gap-2">
                        {service.id === "srv-streetlight-repair" ? (
                          <>
                            <Link
                              href="/civic-connect"
                              className="px-4 py-2 bg-[#194B35] hover:bg-[#123626] text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-2xs transition"
                            >
                              <span>{language === "ml" ? "പരാതി രജിസ്റ്റർ ചെയ്യുക" : "Lodge in Civic Connect"}</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </Link>
                            <a
                              href="https://wss.kseb.in/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 bg-white border border-[#EDE6D8] hover:bg-[#FAF7F0] text-[#194B35] font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-2xs transition"
                            >
                              <span>KSEB Portal</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </>
                        ) : (
                          service.official_portal_url && (
                            <a
                              href={service.official_portal_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-5 py-2.5 bg-[#194B35] hover:bg-[#123626] text-white font-bold rounded-2xl text-xs flex items-center gap-1.5 shadow-2xs transition"
                            >
                              <span>{service.official_portal_name || "Apply Online"}</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Source Disclaimer */}
        <DataSourcesNotice 
          language={language}
          title={language === "ml" ? "പൊതു സേവന വിവര ഉറവിടങ്ങളും നിയമപരമായ അടിത്തറയും" : "Public Services — Legal Framework & Official Portals"}
          sources={[
            "Kerala Municipality Building Rules (KMBR) 2019",
            "Registration of Births and Deaths Act 1969 & Kerala Rules",
            "Kerala Social Security Pension Guidelines & DBT Mission",
            "K-SMART Kerala Local Governance Portal (ksmart.lsgkerala.gov.in)",
            "Sanchitha LSGD Property Tax Portal (tax.lsgkerala.gov.in)",
          ]}
        />
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
