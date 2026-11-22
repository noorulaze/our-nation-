"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { 
  publicServiceStore, 
  SERVICE_CATEGORIES 
} from "@/lib/data/publicServicesData";
import { 
  FileText, 
  Receipt, 
  Building2, 
  Droplets, 
  ShieldCheck, 
  Briefcase, 
  Users, 
  Sparkles, 
  Search, 
  ArrowRight, 
  ExternalLink, 
  Clock, 
  CreditCard, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  Info, 
  ChevronRight,
  TrendingUp,
  CalendarCheck2,
  HelpCircle,
  FileCheck2,
  SendHorizontal
} from "lucide-react";

export default function PublicServicesDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortOption, setSortOption] = useState<"popular" | "recent" | "name">("popular");

  // All published services
  const allServices = useMemo(() => {
    return publicServiceStore.getServices("all", undefined, "popular");
  }, []);

  // Filtered & Sorted Services
  const filteredServices = useMemo(() => {
    return publicServiceStore.getServices(
      selectedCategory === "all" ? undefined : selectedCategory,
      searchQuery,
      sortOption
    );
  }, [selectedCategory, searchQuery, sortOption]);

  // Popular Services (Top 3 by views)
  const popularServices = useMemo(() => {
    return [...allServices].sort((a, b) => (b.views_count || 0) - (a.views_count || 0)).slice(0, 3);
  }, [allServices]);

  // Helper to get category icon
  const renderCategoryIcon = (catId: string, className = "w-5 h-5") => {
    switch (catId) {
      case "cat-certificates":
        return <FileText className={className} />;
      case "cat-property-tax":
        return <Receipt className={className} />;
      case "cat-building":
        return <Building2 className={className} />;
      case "cat-water-sanitation":
        return <Droplets className={className} />;
      case "cat-public-health":
        return <ShieldCheck className={className} />;
      case "cat-business":
        return <Briefcase className={className} />;
      case "cat-social-welfare":
        return <Users className={className} />;
      case "cat-other":
      default:
        return <Sparkles className={className} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] flex flex-col font-sans selection:bg-[#194B35]/20 selection:text-[#194B35]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 w-full">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Public Services" },
          ]}
        />

        {/* ========================================================================= */}
        {/* HERO HEADER SECTION                                                      */}
        {/* ========================================================================= */}
        <div className="relative rounded-3xl sm:rounded-[36px] bg-gradient-to-br from-[#194B35] via-[#143E2C] to-[#0F3022] text-white p-6 sm:p-10 shadow-lg overflow-hidden border border-[#0F3022]">
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-xs font-bold border border-white/15">
                <Building2 className="w-4 h-4 text-amber-300" />
                <span>Tanur Municipality — Digital Public Services Desk</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
                Online Public Services
              </h1>

              <p className="text-base sm:text-lg font-medium text-white/90 max-w-2xl leading-relaxed">
                Clear guidance, official portals, required document checklists, and application assistance for residents of all 45 wards in Tanur Municipality.
              </p>

              {/* Quick Contact & Switchboard Info */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-white/80">
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                  <Phone className="w-3.5 h-3.5 text-amber-300" />
                  <span>Central Switchboard: <strong>0494 2440228</strong></span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                  <MapPin className="w-3.5 h-3.5 text-amber-300" />
                  <span>Municipal Office, Main Road, Tanur</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                  <Clock className="w-3.5 h-3.5 text-amber-300" />
                  <span>Mon–Sat: 10:00 AM – 5:00 PM</span>
                </div>
              </div>
            </div>

            {/* Quick Actions & Guidance Card */}
            <div className="md:col-span-4 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-3.5">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                <FileCheck2 className="w-4 h-4" />
                <span>Need Application Guidance?</span>
              </div>
              <p className="text-xs text-white/80 leading-relaxed">
                Submit an internal verification request through OUR NATION. We verify your documents and guide you before official submission.
              </p>
              <div className="pt-1 flex items-center justify-between text-xs">
                <span className="text-white/60">Coverage: Wards 1 to 45</span>
                <Link 
                  href="/dashboard?tab=applications" 
                  className="font-bold text-amber-300 hover:text-white transition inline-flex items-center gap-1"
                >
                  My Applications <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* STATUTORY DISCLAIMER BANNER                                               */}
        {/* ========================================================================= */}
        <div className="bg-[#FAF4E6] border border-[#E8DCBF] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3.5 shadow-2xs">
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 flex items-center justify-center shrink-0 text-[#855B14]">
            <Info className="w-5 h-5" />
          </div>
          <div className="flex-1 text-xs sm:text-sm text-[#4A3D2A] leading-relaxed">
            <strong className="font-bold text-[#2A2315]">Statutory Transparency Notice:</strong> OUR NATION is an independent civic platform providing verified guidance for Tanur Municipality residents. Statutory certificates, building permits, and taxes are officially processed through verified Government of Kerala portals (K-Smart, Sanchitha, Sevana, KWA) or directly at the Tanur Municipal Office.
          </div>
        </div>

        {/* ========================================================================= */}
        {/* POPULAR SERVICES SECTION                                                  */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#C39A5B]" />
              <h2 className="text-lg sm:text-xl font-bold text-[#194B35]">
                Most Frequently Requested Services
              </h2>
            </div>
            <span className="text-xs text-[#5C6A64]">Based on citizen applications & queries</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {popularServices.map((service) => (
              <div 
                key={service.id}
                className="bg-white rounded-2xl border border-[#EDE6D8] p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#194B35]/10 text-[#194B35] border border-[#194B35]/20">
                      {service.category_name}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {service.processing_time_text.split("(")[0]}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-[#194B35] group-hover:text-emerald-800 transition line-clamp-1">
                    {service.title}
                  </h3>

                  <p className="text-xs text-[#5C6A64] line-clamp-2 leading-relaxed">
                    {service.summary}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#EDE6D8]/60 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-medium text-[#7A8880]">
                    Fee: {service.fee_structure.includes("Free") ? "Free / Zero Fee" : "Statutory Schedule"}
                  </span>
                  <Link
                    href={`/public-services/${service.slug}`}
                    className="font-bold text-[#194B35] hover:text-emerald-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>View Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SEARCH, CATEGORIES & CONTROLS                                             */}
        {/* ========================================================================= */}
        <section className="space-y-5 pt-2">
          {/* Search bar & Sorting */}
          <div className="bg-white rounded-2xl border border-[#EDE6D8] p-4 sm:p-5 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services by keyword, department, certificate name..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#EDE6D8] bg-[#FAF7F0]/50 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#194B35] focus:border-transparent transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort & Quick Filter */}
            <div className="flex items-center gap-2.5 shrink-0">
              <span className="text-xs font-semibold text-[#5C6A64]">Sort by:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as any)}
                className="px-3 py-2 rounded-xl border border-[#EDE6D8] bg-[#FAF7F0]/50 text-xs font-bold text-[#194B35] focus:outline-hidden focus:ring-2 focus:ring-[#194B35]"
              >
                <option value="popular">Most Popular</option>
                <option value="recent">Recently Verified</option>
                <option value="name">Alphabetical</option>
              </select>
            </div>
          </div>

          {/* 8 Statutory Municipal Category Pills */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#5C6A64] uppercase tracking-wider">
                Official Municipal Categories
              </span>
              <span className="text-xs text-[#5C6A64]">
                Showing {filteredServices.length} {filteredServices.length === 1 ? "service" : "services"}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
              {/* All Services button */}
              <button
                onClick={() => setSelectedCategory("all")}
                className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                  selectedCategory === "all"
                    ? "bg-[#194B35] text-white border-[#194B35] shadow-xs"
                    : "bg-white text-[#1A2420] border-[#EDE6D8] hover:border-[#194B35]/40"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <Sparkles className="w-4 h-4 opacity-80" />
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    selectedCategory === "all" ? "bg-white/20 text-white" : "bg-[#FAF7F0] text-[#5C6A64]"
                  }`}>
                    {allServices.length}
                  </span>
                </div>
                <span className="text-xs font-bold leading-snug">All Services</span>
              </button>

              {/* 8 Individual Categories */}
              {SERVICE_CATEGORIES.map((cat) => {
                const count = allServices.filter(s => s.category === cat.key).length;
                const isSelected = selectedCategory === cat.key;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.key)}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                      isSelected
                        ? "bg-[#194B35] text-white border-[#194B35] shadow-xs"
                        : "bg-white text-[#1A2420] border-[#EDE6D8] hover:border-[#194B35]/40"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <div className="opacity-90">
                        {renderCategoryIcon(cat.id, "w-4 h-4")}
                      </div>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                        isSelected ? "bg-white/20 text-white" : "bg-[#FAF7F0] text-[#5C6A64]"
                      }`}>
                        {count}
                      </span>
                    </div>
                    <span className="text-xs font-bold leading-tight line-clamp-2">
                      {cat.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PUBLIC SERVICES DIRECTORY GRID                                            */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          {filteredServices.length === 0 ? (
            <div className="bg-white rounded-3xl border border-[#EDE6D8] p-12 text-center space-y-3">
              <HelpCircle className="w-12 h-12 text-gray-300 mx-auto" />
              <h3 className="font-bold text-lg text-[#194B35]">No Services Found</h3>
              <p className="text-xs text-[#5C6A64] max-w-md mx-auto">
                No municipal public services matched your search term &quot;{searchQuery}&quot;. Try selecting another category or resetting the search filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="px-4 py-2 rounded-xl bg-[#194B35] text-white text-xs font-bold hover:bg-[#143E2C] transition"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-3xl border border-[#EDE6D8] p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group relative"
                >
                  <div className="space-y-4">
                    {/* Header Badges */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#194B35]/10 text-[#194B35] border border-[#194B35]/20">
                        {service.category_name}
                      </span>
                      <span className="text-[10px] font-bold text-gray-500 bg-[#FAF7F0] px-2 py-0.5 rounded-md border border-[#EDE6D8]">
                        Verified: {service.last_verified_date}
                      </span>
                    </div>

                    {/* Title */}
                    <div>
                      <h3 className="font-bold text-base text-[#194B35] group-hover:text-emerald-800 transition line-clamp-2 leading-snug">
                        <Link href={`/public-services/${service.slug}`} className="hover:underline">
                          {service.title}
                        </Link>
                      </h3>
                      <p className="text-[11px] font-medium text-[#7A8880] mt-1">
                        {service.department}
                      </p>
                    </div>

                    {/* Summary */}
                    <p className="text-xs text-[#5C6A64] line-clamp-3 leading-relaxed">
                      {service.summary}
                    </p>

                    {/* Key Attributes Pills */}
                    <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                      <div className="bg-[#FAF7F0] p-2.5 rounded-xl border border-[#EDE6D8]/60 space-y-0.5">
                        <span className="text-[10px] font-bold text-[#7A8880] flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#194B35]" /> Processing
                        </span>
                        <p className="font-semibold text-[#1A2420] truncate">
                          {service.processing_time_text.split("(")[0]}
                        </p>
                      </div>

                      <div className="bg-[#FAF7F0] p-2.5 rounded-xl border border-[#EDE6D8]/60 space-y-0.5">
                        <span className="text-[10px] font-bold text-[#7A8880] flex items-center gap-1">
                          <CreditCard className="w-3 h-3 text-[#194B35]" /> Fees
                        </span>
                        <p className="font-semibold text-[#1A2420] truncate">
                          {service.fee_structure.includes("Free") ? "Free" : "Statutory Fee"}
                        </p>
                      </div>
                    </div>

                    {/* Official System Tag */}
                    {service.official_portal_name && (
                      <div className="text-[11px] text-[#5C6A64] flex items-center gap-1.5 pt-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                        <span className="truncate">Portal: <strong>{service.official_portal_name}</strong></span>
                      </div>
                    )}
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-5 mt-5 border-t border-[#EDE6D8] flex items-center justify-between gap-2">
                    <Link
                      href={`/public-services/${service.slug}`}
                      className="px-3.5 py-2 rounded-xl bg-[#194B35] hover:bg-[#143E2C] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-2xs"
                    >
                      <span>View Full Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    {service.official_portal_url && service.official_portal_url.startsWith("http") ? (
                      <a
                        href={service.official_portal_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 rounded-xl bg-[#FAF7F0] hover:bg-[#EDE6D8] text-[#194B35] text-xs font-bold border border-[#EDE6D8] transition inline-flex items-center gap-1"
                        title="Open external government portal"
                      >
                        <span>Official Portal</span>
                        <ExternalLink className="w-3 h-3 text-[#C39A5B]" />
                      </a>
                    ) : (
                      <Link
                        href={`/public-services/${service.slug}#apply`}
                        className="px-3 py-2 rounded-xl bg-[#FAF7F0] hover:bg-[#EDE6D8] text-[#194B35] text-xs font-bold border border-[#EDE6D8] transition inline-flex items-center gap-1"
                      >
                        <span>Guidance</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* CIVIC ASSISTANCE & HELP DESK FOOTER CARD                                  */}
        {/* ========================================================================= */}
        <div className="rounded-3xl bg-gradient-to-r from-[#FAF4E6] to-[#FAF7F0] border border-[#E8DCBF] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <h3 className="font-bold text-lg text-[#194B35]">
              Cannot Find What You Are Looking For?
            </h3>
            <p className="text-xs sm:text-sm text-[#5C6A64] leading-relaxed">
              Contact the Tanur Municipality Front Office Helpdesk or call the central switchboard for guidance on statutory permits, council certificates, and revenue inquiries.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="tel:04942440228"
              className="px-4 py-2.5 rounded-xl bg-[#194B35] hover:bg-[#143E2C] text-white text-xs font-bold transition shadow-sm inline-flex items-center gap-1.5"
            >
              <Phone className="w-4 h-4 text-amber-300" />
              <span>Call 0494 2440228</span>
            </a>
            <Link
              href="/civic/report"
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-gray-50 text-[#194B35] text-xs font-bold border border-[#EDE6D8] transition inline-flex items-center gap-1.5"
            >
              <SendHorizontal className="w-4 h-4 text-[#C39A5B]" />
              <span>Report Civic Grievance</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
