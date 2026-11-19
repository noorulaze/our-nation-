"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { useLanguage } from "@/lib/i18n/context";
import { 
  TANUR_MUNICIPAL_DOCUMENTS, 
  DOCUMENT_CATEGORIES 
} from "@/lib/data/documentsData";
import { VerificationBadge, DataSourcesNotice } from "@/components/common/VerificationBadge";
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  Calendar, 
  Building2, 
  ShieldCheck, 
  ExternalLink, 
  Tag, 
  ChevronRight,
  FileSpreadsheet,
  Megaphone,
  Vote,
  Scale,
  Sparkles,
  FileCheck,
  Coins
} from "lucide-react";

export default function DocumentsPage() {
  const { language } = useLanguage();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");

  // Filtered documents
  const filteredDocuments = useMemo(() => {
    return TANUR_MUNICIPAL_DOCUMENTS.filter(doc => {
      if (selectedCategory !== "all" && doc.category !== selectedCategory) return false;
      if (selectedYear !== "all" && doc.year.toString() !== selectedYear) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = doc.title.toLowerCase().includes(q) || doc.title_ml.toLowerCase().includes(q);
        const matchesRef = doc.reference_number?.toLowerCase().includes(q);
        const matchesAuth = doc.publishing_authority.toLowerCase().includes(q) || doc.publishing_authority_ml.toLowerCase().includes(q);
        const matchesDesc = doc.description.toLowerCase().includes(q) || doc.description_ml.toLowerCase().includes(q);
        return matchesTitle || matchesRef || matchesAuth || matchesDesc;
      }
      return true;
    });
  }, [selectedCategory, selectedYear, searchQuery]);

  // Aggregate stats
  const stats = useMemo(() => {
    return {
      total: TANUR_MUNICIPAL_DOCUMENTS.length,
      resolutions: TANUR_MUNICIPAL_DOCUMENTS.filter(d => d.category === "council_decisions").length,
      budgets: TANUR_MUNICIPAL_DOCUMENTS.filter(d => d.category === "budget_finance").length,
      tenders: TANUR_MUNICIPAL_DOCUMENTS.filter(d => d.category === "tenders_procurement").length,
      forms: TANUR_MUNICIPAL_DOCUMENTS.filter(d => d.category === "citizen_forms").length,
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] flex flex-col font-sans selection:bg-[#194B35]/20 selection:text-[#194B35]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 w-full">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: language === "ml" ? "ഹോം" : "Home", href: "/" },
            { label: language === "ml" ? "രേഖകളും അറിയിപ്പുകളും" : "Documents & Notices" },
          ]}
        />

        {/* ========================================================================= */}
        {/* 1. HERO SECTION (Kerala Municipal Waterfront Style)                       */}
        {/* ========================================================================= */}
        <div className="relative rounded-3xl sm:rounded-[36px] bg-gradient-to-br from-[#FAF7F0] via-[#F5F1E7] to-[#EDE6D8] border border-[#EDE6D8] p-6 sm:p-10 shadow-xs overflow-hidden">
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#194B35_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8">
            <div className="space-y-3 sm:space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#194B35]/10 text-[#194B35] text-xs font-bold border border-[#194B35]/20">
                <FileText className="w-4 h-4 text-[#194B35]" />
                <span>{language === "ml" ? "ഔദ്യോഗിക ഗസറ്റ് & രേഖാ സൂചിക" : "Documents & Public Notices • Feature 05"}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#194B35] tracking-tight font-malayalam-heading leading-tight">
                {language === "ml" ? "ഔദ്യോഗിക രേഖകളും അറിയിപ്പുകളും" : "Documents & Notices"}
              </h1>

              <p className="text-xs sm:text-sm text-[#5C6A64] leading-relaxed">
                {language === "ml"
                  ? "താനൂർ നഗരസഭയുടെ കൗൺസിൽ പ്രമേയങ്ങൾ, വികസന പദ്ധതി രേഖകൾ, ബജറ്റ് വിഹിതങ്ങൾ, ടെണ്ടർ വിജ്ഞാപനങ്ങൾ, സർക്കാർ ഉത്തരവുകൾ (G.O.), ഡൗൺലോഡ് ചെയ്യാവുന്ന പൗര അപേക്ഷാ ഫോറങ്ങൾ എന്നിവ ഇവിടെ സുതാര്യമായി ലഭ്യമാണ്."
                  : "A searchable public document repository for Tanur Municipality. Access authentic municipal council resolutions, annual budgets, e-tender notifications, government gazettes, and downloadable citizen forms."}
              </p>

              {/* Badges */}
              <div className="pt-1 flex flex-wrap items-center gap-2.5 text-xs">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/80 text-[#194B35] border border-[#EDE6D8] shadow-2xs font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Statutory Reference Numbers</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/80 text-[#194B35] border border-[#EDE6D8] shadow-2xs font-bold">
                  <Calendar className="w-3.5 h-3.5 text-[#C39A5B]" />
                  <span>Updated for 2024–2026 Fiscal Year</span>
                </div>
              </div>
            </div>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 w-full lg:w-80 shrink-0">
              <div className="p-3.5 bg-white rounded-2xl border border-[#EDE6D8] shadow-2xs space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#C39A5B] block">Total Documents</span>
                <span className="text-xl sm:text-2xl font-black text-[#194B35]">{stats.total}</span>
                <span className="text-[11px] text-[#5C6A64] block">Archived Records</span>
              </div>
              <div className="p-3.5 bg-white rounded-2xl border border-[#EDE6D8] shadow-2xs space-y-1">
                <span className="text-[10px] uppercase font-bold text-teal-700 block">Council Minutes</span>
                <span className="text-xl sm:text-2xl font-black text-teal-800">{stats.resolutions}</span>
                <span className="text-[11px] text-[#5C6A64] block">Resolutions</span>
              </div>
              <div className="p-3.5 bg-white rounded-2xl border border-[#EDE6D8] shadow-2xs space-y-1">
                <span className="text-[10px] uppercase font-bold text-amber-700 block">E-Tenders</span>
                <span className="text-xl sm:text-2xl font-black text-amber-800">{stats.tenders}</span>
                <span className="text-[11px] text-[#5C6A64] block">Procurement</span>
              </div>
              <div className="p-3.5 bg-white rounded-2xl border border-[#EDE6D8] shadow-2xs space-y-1">
                <span className="text-[10px] uppercase font-bold text-purple-700 block">Citizen Forms</span>
                <span className="text-xl sm:text-2xl font-black text-purple-900">{stats.forms}</span>
                <span className="text-[11px] text-[#5C6A64] block">Downloadable</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. CATEGORY PILLS BAR                                                     */}
        {/* ========================================================================= */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[#EDE6D8]">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              selectedCategory === "all"
                ? "bg-[#194B35] text-white shadow-xs"
                : "bg-white text-[#5C6A64] hover:bg-[#FAF7F0] border border-[#EDE6D8]"
            }`}
          >
            {language === "ml" ? "എല്ലാ രേഖകളും" : "All Documents"} ({TANUR_MUNICIPAL_DOCUMENTS.length})
          </button>

          {DOCUMENT_CATEGORIES.map(c => {
            const isSelected = selectedCategory === c.key;
            const count = TANUR_MUNICIPAL_DOCUMENTS.filter(d => d.category === c.key).length;
            return (
              <button
                key={c.key}
                onClick={() => setSelectedCategory(c.key)}
                className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-[#194B35] text-white shadow-xs font-bold"
                    : "bg-white text-[#5C6A64] hover:bg-[#FAF7F0] border border-[#EDE6D8]"
                }`}
              >
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

        {/* ========================================================================= */}
        {/* 3. SEARCH & YEAR FILTER BAR                                               */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-3xl border border-[#EDE6D8] p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              aria-label="Search documents by title or reference number"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                language === "ml"
                  ? "രേഖയുടെ പേര്, റഫറൻസ് നമ്പർ, വിഷയം തിരയുക..."
                  : "Search document title, reference no, topic..."
              }
              className="w-full pl-10 pr-4 py-2.5 bg-[#FAF7F0] text-xs border border-[#EDE6D8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#194B35] text-[#1A2420]"
            />
          </div>

          <select
            aria-label="Filter by year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full sm:w-auto px-3.5 py-2.5 bg-[#FAF7F0] border border-[#EDE6D8] rounded-2xl text-xs text-[#1A2420] focus:outline-none focus:ring-2 focus:ring-[#194B35]"
          >
            <option value="all">{language === "ml" ? "എല്ലാ വർഷവും" : "All Years"}</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
        </div>

        {/* ========================================================================= */}
        {/* 4. TRANSPARENCY NOTICE BANNER                                             */}
        {/* ========================================================================= */}
        <div className="p-4 sm:p-5 rounded-3xl bg-amber-50/80 border border-amber-200/90 text-xs text-amber-950 space-y-2 shadow-2xs">
          <div className="flex items-center gap-2 font-bold text-amber-900">
            <ShieldCheck className="w-4 h-4 text-amber-800 shrink-0" />
            <span className="text-sm">
              {language === "ml"
                ? "ഔദ്യോഗിക രേഖാ സുതാര്യതാ നയം"
                : "Official Documents Transparency & Archival Standards"}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px] text-amber-900/90 leading-relaxed pt-1">
            <div className="p-3 rounded-2xl bg-white/80 border border-amber-200/60 shadow-2xs">
              <span className="font-bold block text-[#194B35] mb-1">
                1. {language === "ml" ? "സൂചിക vs ഡൗൺലോഡ്" : "Catalogue Separation"}
              </span>
              {language === "ml"
                ? "നേരിട്ട് ഡൗൺലോഡ് ചെയ്യാവുന്ന ഉത്തരവുകളും, നഗരസഭാ രജിസ്റ്ററിലുള്ള സൂചികാ വിവരങ്ങളും (Catalogue References) പരസ്പരം വേർതിരിച്ചിരിക്കുന്നു."
                : "Separates direct downloadable gazette orders from archival catalogue entries awaiting scanned PDF attachments."}
            </div>
            <div className="p-3 rounded-2xl bg-white/80 border border-amber-200/60 shadow-2xs">
              <span className="font-bold block text-[#194B35] mb-1">
                2. {language === "ml" ? "വ്യാജ ലിങ്കുകൾ ഇല്ല" : "No Misleading Downloads"}
              </span>
              {language === "ml"
                ? "ജനറൽ ഹോംപേജ് ലിങ്കുകളെ വ്യാജമായി 'PDF ഡൗൺലോഡ്' എന്ന് ഇവിടെ അവതരിപ്പിക്കുന്നില്ല."
                : "General portal homepages are never presented as direct PDF file downloads."}
            </div>
            <div className="p-3 rounded-2xl bg-white/80 border border-amber-200/60 shadow-2xs">
              <span className="font-bold block text-[#194B35] mb-1">
                3. {language === "ml" ? "സ്റ്റാറ്റ്യൂട്ടറി റഫറൻസുകൾ" : "Preserved Metadata"}
              </span>
              {language === "ml"
                ? "എല്ലാ കൗൺസിൽ റെസല്യൂഷൻ നമ്പറുകളും, സർക്കാർ ഉത്തരവ് നമ്പറുകളും (G.O.), പ്രസിദ്ധീകരിച്ച തീയതികളും അതേപടി നിലനിർത്തിയിരിക്കുന്നു."
                : "All statutory resolution numbers, gazette dates, and publishing authorities are preserved with full fidelity."}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 5. DOCUMENTS LISTING (Clean Cards, Sand Borders, Action Buttons)          */}
        {/* ========================================================================= */}
        <div className="space-y-4">
          {filteredDocuments.map((doc) => {
            const isCatalogueOnly = 
              doc.download_url === "https://tanurmunicipality.lsgkerala.gov.in/" ||
              doc.download_url.endsWith("lsgkerala.gov.in/") ||
              doc.id === "doc-council-2024-08" ||
              doc.id === "doc-budget-2024-25" ||
              doc.id === "doc-notice-crz-guidelines" ||
              doc.id === "doc-plan-master-2035";

            return (
              <div
                key={doc.id}
                className="bg-white rounded-3xl border border-[#EDE6D8] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-5 group"
              >
                <div className="space-y-2 flex-1">
                  {/* Meta Badges */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FAF7F0] text-[#194B35] border border-[#EDE6D8]">
                      {language === "ml" ? doc.category_name_ml : doc.category_name}
                    </span>

                    {doc.reference_number && (
                      <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#FAF7F0] text-gray-700 border border-[#EDE6D8]">
                        Ref: {doc.reference_number}
                      </span>
                    )}

                    <span className="text-[11px] text-gray-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#C39A5B]" />
                      <span>{doc.publication_date}</span>
                    </span>

                    {/* Transparency Verification Badge */}
                    {isCatalogueOnly ? (
                      <VerificationBadge 
                        level="document_pending" 
                        language={language} 
                      />
                    ) : (
                      <VerificationBadge 
                        level="verified" 
                        citation="Official Portal Record" 
                        language={language} 
                      />
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-base sm:text-lg text-[#194B35] font-malayalam-heading group-hover:text-[#123626] transition">
                    {language === "ml" ? doc.title_ml : doc.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-[#5C6A64] line-clamp-2 leading-relaxed">
                    {language === "ml" ? doc.description_ml : doc.description}
                  </p>

                  {/* Authority & Status Tag */}
                  <div className="flex items-center gap-3 text-xs text-gray-500 pt-1 flex-wrap">
                    <span className="truncate">
                      <strong>Authority:</strong> {language === "ml" ? doc.publishing_authority_ml : doc.publishing_authority}
                    </span>
                    <span>•</span>
                    <span className="text-[11px] text-[#7A8880]">
                      Source: {doc.source}
                    </span>
                  </div>

                  {isCatalogueOnly && (
                    <div className="pt-1">
                      <span className="text-[10px] text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200 inline-block">
                        ⚠️ {language === "ml"
                          ? "സൂചികാ രേഖ: ഒറിജിനൽ സ്കാൻ ചെയ്ത പി.ഡി.എഫ് നഗരസഭയിൽ നിന്ന് ലഭ്യമാകുന്നതിനനുസരിച്ച് പുതുക്കും."
                          : "Archival Catalogue Entry: Scanned PDF upload pending municipal digital archive synchronization."}
                      </span>
                    </div>
                  )}
                </div>

                {/* Action Download / View */}
                <div className="flex items-center gap-2 shrink-0">
                  {isCatalogueOnly ? (
                    <a
                      href={doc.download_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 bg-[#FAF7F0] hover:bg-[#EDE6D8] text-[#194B35] font-bold rounded-2xl text-xs border border-[#EDE6D8] flex items-center gap-1.5 transition shadow-2xs"
                      title={language === "ml" ? "നഗരസഭാ പോർട്ടൽ റഫറൻസ് സന്ദർശിക്കുക" : "Visit municipal portal reference"}
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-[#C39A5B]" />
                      <span>{language === "ml" ? "പോർട്ടൽ റഫറൻസ്" : "Portal Reference"}</span>
                    </a>
                  ) : (
                    <a
                      href={doc.download_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-[#194B35] hover:bg-[#123626] text-white font-bold rounded-2xl text-xs flex items-center gap-1.5 shadow-2xs hover:shadow transition"
                    >
                      <Download className="w-3.5 h-3.5 text-amber-300" />
                      <span>
                        {doc.category === "citizen_forms"
                          ? (language === "ml" ? "ഫോറം ഡൗൺലോഡ്" : "Access Form")
                          : (language === "ml" ? "ഗസറ്റ് ഉത്തരവ്" : "Official Order")}
                      </span>
                      <ExternalLink className="w-3 h-3 ml-0.5" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredDocuments.length === 0 && (
          <div className="p-8 text-center bg-white rounded-3xl border border-[#EDE6D8] text-[#5C6A64] space-y-2">
            <FileText className="w-8 h-8 text-[#C39A5B] mx-auto" />
            <p className="font-bold text-sm">
              {language === "ml" ? "രേഖകൾ ഒന്നും കണ്ടെത്താനായില്ല" : "No documents match your query"}
            </p>
            <p className="text-xs text-[#7A8880]">
              {language === "ml" ? "മറ്റൊരു റഫറൻസ് നമ്പറോ വിഭാഗമോ നൽകി തിരയുക." : "Try adjusting your search terms or year filter."}
            </p>
          </div>
        )}

        {/* Source and Transparency Standards */}
        <DataSourcesNotice 
          language={language}
          title={language === "ml" ? "ഔദ്യോഗിക രേഖാ സ്രോതസ്സുകളും സുതാര്യതാ മാനദണ്ഡവും" : "Document Verification & Archival Policy"}
          sources={[
            "Kerala Government Gazette (egazette.kerala.gov.in)",
            "Local Self Government Department Orders (lsgkerala.gov.in)",
            "Tanur Municipal Council Resolution Minutes",
            "K-SMART Civil Registration Portal (ksmart.lsgkerala.gov.in)",
          ]}
        />
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
