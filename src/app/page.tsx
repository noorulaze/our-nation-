"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { NaaduAiModal } from "@/components/ai/NaaduAiModal";
import { CommunityMap } from "@/components/map/CommunityMap";
import { useLanguage } from "@/lib/i18n/context";
import { useCommunity } from "@/lib/community/context";
import { store } from "@/lib/data/store";
import { 
  Sparkles, 
  Search, 
  MapPin, 
  Calendar, 
  Briefcase, 
  AlertTriangle, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Compass, 
  Building2,
  Clock,
  Phone,
  MessageSquare
} from "lucide-react";

export default function HomePage() {
  const { t, language } = useLanguage();
  const { currentCommunity, availableCommunities, setCurrentCommunity } = useCommunity();
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const events = store.getEvents(currentCommunity?.id).slice(0, 3);
  const businesses = store.getBusinesses(currentCommunity?.id).slice(0, 3);
  const announcements = store.getAnnouncements(currentCommunity?.id).slice(0, 2);
  const posts = store.getPosts(currentCommunity?.id).slice(0, 2);
  const places = store.getPlaces(currentCommunity?.id);
  const issues = store.getIssueReports(currentCommunity?.id);

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-brand-100 selection:text-brand-900">
      <Navbar />

      <main className="flex-1">
        
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 border-b border-border bg-gradient-to-b from-surface via-background to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              
              {/* Locality badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold mb-6">
                <MapPin className="w-3.5 h-3.5 text-brand-600" />
                <span>
                  {currentCommunity 
                    ? `${language === "ml" ? currentCommunity.name_ml : currentCommunity.name}, ${currentCommunity.district}`
                    : "Kerala, India"}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-600 animate-pulse" />
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-[1.15]">
                {t("heroHeadline")}
              </h1>

              {/* Sub-headline */}
              <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                {t("heroDescription")}
              </p>

              {/* Search & Action Bar */}
              <div className="mt-8 max-w-xl mx-auto">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (searchQuery.trim()) {
                      setIsAiModalOpen(true);
                    }
                  }}
                  className="flex items-center gap-2 p-1.5 bg-surface rounded-2xl border border-border shadow-md focus-within:ring-2 focus-within:ring-brand-500 focus-within:border-transparent transition"
                >
                  <div className="pl-3 text-muted-foreground">
                    <Search className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t("heroSearchPlaceholder")}
                    className="flex-1 px-2 py-2.5 text-sm bg-transparent border-none focus:outline-none text-foreground placeholder:text-muted-foreground"
                  />
                  <button
                    type="button"
                    onClick={() => setIsAiModalOpen(true)}
                    className="px-4 py-2.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition active:scale-95 shadow-sm"
                  >
                    <Sparkles className="w-4 h-4 text-brand-200" />
                    <span>{t("aiAskBtn")}</span>
                  </button>
                </form>
              </div>

              {/* Action buttons */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/discover"
                  className="px-5 py-2.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-semibold text-sm transition active:scale-95 flex items-center gap-2 shadow-sm"
                >
                  <span>{t("exploreCommunities")}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/community"
                  className="px-5 py-2.5 rounded-xl bg-surface hover:bg-muted text-foreground border border-border font-semibold text-sm transition active:scale-95"
                >
                  {t("communityFeed")}
                </Link>
                <Link
                  href="/create?type=issue"
                  className="px-5 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-semibold text-sm transition active:scale-95 flex items-center gap-1.5"
                >
                  <AlertTriangle className="w-4 h-4 text-amber-700" />
                  <span>{t("reportIssue")}</span>
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* VERIFIED OFFICIAL ANNOUNCEMENTS BANNER */}
        {announcements.length > 0 && (
          <section className="bg-brand-50/70 border-b border-brand-200 py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="px-2 py-0.5 rounded-md bg-brand-700 text-white font-bold text-[10px] uppercase tracking-wider">
                    {t("officialBadge")}
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-brand-950 truncate max-w-2xl">
                    {announcements[0].title}
                  </p>
                </div>
                <Link
                  href="/community"
                  className="text-xs font-bold text-brand-800 hover:text-brand-950 flex items-center gap-1 flex-shrink-0"
                >
                  <span>{t("announcementsTitle")}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* PILLARS / FEATURE OVERVIEW */}
        <section className="py-16 sm:py-24 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                {language === "ml" ? "നാടിന്റെ എല്ലാ തുടിപ്പുകളും ഒരു കുടക്കീഴിൽ" : "Unified Pillars for Vibrant Community Life"}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {t("appTagline")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Events */}
              <div className="bg-surface rounded-2xl p-6 border border-border shadow-sm hover:border-brand-300 transition group">
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold mb-4 group-hover:scale-105 transition">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-foreground mb-2">
                  {t("featEventsTitle")}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t("featEventsDesc")}
                </p>
                <Link
                  href="/discover?tab=events"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 mt-4 hover:gap-1.5 transition"
                >
                  <span>Browse Events</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* Businesses / Services */}
              <div className="bg-surface rounded-2xl p-6 border border-border shadow-sm hover:border-brand-300 transition group">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold mb-4 group-hover:scale-105 transition">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-foreground mb-2">
                  {t("featBizTitle")}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t("featBizDesc")}
                </p>
                <Link
                  href="/discover?tab=services"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 mt-4 hover:gap-1.5 transition"
                >
                  <span>Find Services</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* Civic Improvement */}
              <div className="bg-surface rounded-2xl p-6 border border-border shadow-sm hover:border-brand-300 transition group">
                <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold mb-4 group-hover:scale-105 transition">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-foreground mb-2">
                  {t("featCivicTitle")}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t("featCivicDesc")}
                </p>
                <Link
                  href="/create?type=issue"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 mt-4 hover:gap-1.5 transition"
                >
                  <span>Report Problem</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* Naadu AI */}
              <div className="bg-surface rounded-2xl p-6 border border-border shadow-sm hover:border-brand-300 transition group">
                <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold mb-4 group-hover:scale-105 transition">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-foreground mb-2">
                  {t("featAiTitle")}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t("featAiDesc")}
                </p>
                <button
                  onClick={() => setIsAiModalOpen(true)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-purple-700 mt-4 hover:gap-1.5 transition"
                >
                  <span>Ask AI Assistant</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* INTERACTIVE COMMUNITY MAP */}
        <section className="py-16 sm:py-20 bg-muted/20 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-xs font-bold text-brand-700 uppercase tracking-wider">
                  {language === "ml" ? "പ്രാദേശിക മാപ്പ്" : "Interactive Locality Map"}
                </span>
                <h2 className="text-2xl font-bold text-foreground mt-1">
                  {currentCommunity ? (language === "ml" ? `${currentCommunity.name_ml} മാപ്പിൽ` : `${currentCommunity.name} on the Map`) : "Kerala Overview"}
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Explore verified places, events, local businesses, and active civic issue reports around you.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" /> Events</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Businesses</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Places</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" /> Civic Reports</span>
              </div>
            </div>

            <CommunityMap
              centerLat={currentCommunity?.latitude || 10.0159}
              centerLng={currentCommunity?.longitude || 76.3419}
              events={events}
              businesses={businesses}
              places={places}
              issues={issues}
              className="h-[420px] w-full rounded-2xl border border-border shadow-md"
            />
          </div>
        </section>

        {/* UPCOMING LOCAL EVENTS */}
        <section className="py-16 sm:py-20 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  {t("tabEvents")}
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Upcoming cultural, educational, and sports gatherings in {currentCommunity ? currentCommunity.name : "Kerala"}
                </p>
              </div>
              <Link
                href="/discover?tab=events"
                className="text-xs font-semibold text-brand-700 hover:text-brand-800 flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {events.map((ev) => (
                <div key={ev.id} className="bg-surface rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col hover:border-brand-300 transition">
                  {ev.image_url && (
                    <div className="h-44 w-full overflow-hidden bg-muted relative">
                      <img
                        src={ev.image_url}
                        alt={ev.title}
                        className="w-full h-full object-cover hover:scale-105 transition duration-300"
                      />
                      <span className="absolute top-2.5 left-2.5 bg-surface/90 backdrop-blur-sm px-2 py-0.5 rounded-md text-[10px] font-bold text-foreground">
                        {ev.category}
                      </span>
                    </div>
                  )}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-base text-foreground mb-1">
                        {ev.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                        {ev.description}
                      </p>
                    </div>
                    <div className="space-y-1.5 text-xs text-muted-foreground pt-3 border-t border-border">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-brand-700" />
                        <span>{new Date(ev.start_date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-brand-700" />
                        <span className="truncate">{ev.location_name}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* VERIFIED LOCAL SERVICES */}
        <section className="py-16 sm:py-20 bg-muted/10 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  {t("tabServices")}
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Trusted neighborhood technicians, clinics, and homegrown shops
                </p>
              </div>
              <Link
                href="/discover?tab=services"
                className="text-xs font-semibold text-brand-700 hover:text-brand-800 flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {businesses.map((biz) => (
                <div key={biz.id} className="bg-surface rounded-2xl border border-border shadow-sm p-5 flex flex-col justify-between hover:border-brand-300 transition">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-semibold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-200">
                        {biz.category}
                      </span>
                      {biz.is_verified && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>{t("verifiedBadge")}</span>
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-base text-foreground mb-1">
                      {biz.name}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                      {biz.description}
                    </p>
                  </div>

                  <div className="space-y-1.5 text-xs text-muted-foreground pt-3 border-t border-border">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-brand-700 flex-shrink-0" />
                      <span className="truncate">{biz.address}</span>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <a
                        href={`tel:${biz.phone}`}
                        className="inline-flex items-center gap-1 font-semibold text-brand-700 hover:text-brand-800"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>{biz.phone}</span>
                      </a>
                      <Link
                        href={`/discover?tab=services&id=${biz.id}`}
                        className="text-[11px] text-muted-foreground hover:text-foreground font-medium underline"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TRUST AND SAFETY */}
        <section className="py-16 sm:py-20 border-b border-border bg-surface">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center mx-auto mb-4 border border-brand-200">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              {t("trustTitle")}
            </h2>
            <p className="mt-3 text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t("trustDesc")}
            </p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
              <div className="p-4 rounded-xl border border-border bg-background">
                <h4 className="font-bold text-xs uppercase tracking-wider text-brand-800 mb-1">
                  1. Official Transparency
                </h4>
                <p className="text-xs text-muted-foreground">
                  Notices from public utilities and local government bodies are verified by community moderators.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-border bg-background">
                <h4 className="font-bold text-xs uppercase tracking-wider text-brand-800 mb-1">
                  2. Honest Civic Tracking
                </h4>
                <p className="text-xs text-muted-foreground">
                  Issue reports show real-time progress without misleading promises or exaggerated resolution claims.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-border bg-background">
                <h4 className="font-bold text-xs uppercase tracking-wider text-brand-800 mb-1">
                  3. Grounded AI Assistance
                </h4>
                <p className="text-xs text-muted-foreground">
                  Naadu AI never invents facts or services—answers are strictly grounded in published database records.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Floating AI Button */}
      <button
        onClick={() => setIsAiModalOpen(true)}
        className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-40 px-4 py-3 rounded-full bg-brand-700 hover:bg-brand-800 text-white shadow-xl flex items-center gap-2 font-semibold text-xs sm:text-sm transition active:scale-95 border-2 border-white/20"
      >
        <Sparkles className="w-4 h-4 text-brand-200 animate-spin" />
        <span>{t("aiTitle")}</span>
      </button>

      {/* Naadu AI Modal */}
      <NaaduAiModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />

      <Footer />
      <BottomNav />
    </div>
  );
}
