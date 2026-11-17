"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { CommunityMap } from "@/components/map/CommunityMap";
import { useLanguage } from "@/lib/i18n/context";
import { useCommunity } from "@/lib/community/context";
import { store } from "@/lib/data/store";
import { Event, Business, Place } from "@/types/database";
import { 
  Search, 
  MapPin, 
  Calendar, 
  Phone, 
  Mail, 
  Globe, 
  CheckCircle2, 
  Clock, 
  Filter, 
  Map, 
  List, 
  Sparkles, 
  ExternalLink,
  X,
  Share2,
  Users,
  Compass,
  ArrowRight
} from "lucide-react";

function DiscoverContent() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get("tab") as "events" | "services" | "places") || "events";
  const initialCategory = searchParams.get("category") || "All";
  const initialDistrict = searchParams.get("district") || "";

  const { t, language } = useLanguage();
  const { currentCommunity, availableCommunities, setCurrentCommunity } = useCommunity();
  const [activeTab, setActiveTab] = useState<"events" | "services" | "places">(initialTab);
  const [searchQuery, setSearchQuery] = useState(initialDistrict);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [showMapView, setShowMapView] = useState(false);

  // Selected item detail modals
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);

  useEffect(() => {
    const tabParam = searchParams.get("tab") as "events" | "services" | "places" | null;
    if (tabParam && ["events", "services", "places"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
    const catParam = searchParams.get("category");
    if (catParam) {
      setSelectedCategory(catParam);
    }
    const distParam = searchParams.get("district");
    if (distParam) {
      setSearchQuery(distParam);
    }
  }, [searchParams]);

  // Fetch data from store
  const events = store.getEvents(currentCommunity?.id);
  const businesses = store.getBusinesses(currentCommunity?.id);
  const places = store.getPlaces(currentCommunity?.id);

  // Categories
  const eventCategories = ["All", "Culture & Arts", "Sports & Fitness", "Charity & Volunteering", "Workshops & Education"];
  const serviceCategories = ["All", "Home & Maintenance", "Healthcare & Clinics", "Food & Bakery", "Automotive Repairs", "Local Groceries"];
  const placeCategories = ["All", "Historic Landmark", "Public Park & Heritage", "Scenic Views"];

  // Filtered Lists
  const filteredEvents = events.filter((e) => {
    const matchesSearch = (e.title + " " + e.description + " " + e.location_name).toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === "All" || e.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCat;
  });

  const filteredBusinesses = businesses.filter((b) => {
    const matchesSearch = (b.name + " " + b.description + " " + b.address).toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === "All" || b.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCat;
  });

  const filteredPlaces = places.filter((p) => {
    const matchesSearch = (p.name + " " + p.description + " " + p.location_name).toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === "All" || p.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCat;
  });

  const handleEventRsvp = () => {
    setRsvpSuccess(true);
    setTimeout(() => setRsvpSuccess(false), 2500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header & View Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold text-[#1B4D36] uppercase tracking-wider bg-[#E5DDD0] px-2.5 py-0.5 rounded-full">
                {language === "ml" ? "നാടൻ അന്വേഷണം" : "Explore Kerala"}
              </span>
              <span className="text-xs text-[#5C6A64]">
                {currentCommunity 
                  ? (language === "ml" ? `${currentCommunity.name_ml} • ${currentCommunity.district}` : `${currentCommunity.name}, ${currentCommunity.district}`)
                  : "All Kerala"}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-malayalam-serif text-[#1B4D36]">
              {t("discoverTitle")}
            </h1>
            <p className="text-xs sm:text-sm text-[#5C6A64] mt-1">
              കേരളത്തിലെ പരിപാടികൾ, വിശ്വസനീയമായ സേവനങ്ങൾ, ചരിത്ര സ്ഥലങ്ങൾ എന്നിവ കണ്ടെത്തൂ.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowMapView(!showMapView)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 border transition shadow-xs ${
                showMapView 
                  ? "bg-[#1B4D36] text-white border-[#1B4D36]" 
                  : "bg-white text-[#1A2420] border-[#DDD5C5] hover:bg-[#F3EFE6]"
              }`}
            >
              {showMapView ? <List className="w-4 h-4" /> : <Map className="w-4 h-4 text-[#1B4D36]" />}
              <span>{showMapView ? (language === "ml" ? "പട്ടിക കാണുക" : "List View") : t("viewOnMap")}</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#E5DFD1] mb-6">
          <button
            onClick={() => {
              setActiveTab("events");
              setSelectedCategory("All");
            }}
            className={`pb-3 px-5 text-xs sm:text-sm font-bold transition border-b-2 -mb-px flex items-center gap-2 ${
              activeTab === "events"
                ? "border-[#1B4D36] text-[#1B4D36]"
                : "border-transparent text-[#7A8880] hover:text-[#1A2420]"
            }`}
          >
            <span>{t("tabEvents")}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#EAE4D7] text-[#1B4D36] font-bold">
              {filteredEvents.length}
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab("services");
              setSelectedCategory("All");
            }}
            className={`pb-3 px-5 text-xs sm:text-sm font-bold transition border-b-2 -mb-px flex items-center gap-2 ${
              activeTab === "services"
                ? "border-[#1B4D36] text-[#1B4D36]"
                : "border-transparent text-[#7A8880] hover:text-[#1A2420]"
            }`}
          >
            <span>{t("tabServices")}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#EAE4D7] text-[#1B4D36] font-bold">
              {filteredBusinesses.length}
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab("places");
              setSelectedCategory("All");
            }}
            className={`pb-3 px-5 text-xs sm:text-sm font-bold transition border-b-2 -mb-px flex items-center gap-2 ${
              activeTab === "places"
                ? "border-[#1B4D36] text-[#1B4D36]"
                : "border-transparent text-[#7A8880] hover:text-[#1A2420]"
            }`}
          >
            <span>{t("tabPlaces")}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#EAE4D7] text-[#1B4D36] font-bold">
              {filteredPlaces.length}
            </span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-2xl border border-[#EAE4D7] p-3.5 mb-6 shadow-card flex flex-col md:flex-row gap-3 items-stretch">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-[#7A8880]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                activeTab === "events"
                  ? t("searchEventsPlaceholder")
                  : activeTab === "services"
                  ? t("searchServicesPlaceholder")
                  : t("searchPlacesPlaceholder")
              }
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] focus:outline-none focus:ring-2 focus:ring-[#1B4D36] text-[#1A2420]"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-3 text-xs text-[#7A8880] hover:text-[#1A2420]"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Chips */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none items-center">
            {(activeTab === "events"
              ? eventCategories
              : activeTab === "services"
              ? serviceCategories
              : placeCategories
            ).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-semibold transition active:scale-95 ${
                  selectedCategory === cat
                    ? "bg-[#1B4D36] text-white shadow-xs"
                    : "bg-[#F3EFE6] hover:bg-[#EAE4D7] text-[#3E4D45]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Map View */}
        {showMapView && (
          <div className="mb-8 bg-white p-3 rounded-3xl border border-[#EAE4D7] shadow-card">
            <div className="h-[450px] w-full rounded-2xl overflow-hidden">
              <CommunityMap
                centerLat={currentCommunity?.latitude || 10.0159}
                centerLng={currentCommunity?.longitude || 76.3419}
                events={activeTab === "events" ? filteredEvents : []}
                businesses={activeTab === "services" ? filteredBusinesses : []}
                places={activeTab === "places" ? filteredPlaces : []}
                className="h-full w-full"
              />
            </div>
          </div>
        )}

        {/* EVENTS LIST */}
        {activeTab === "events" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredEvents.length === 0 ? (
              <div className="col-span-3 text-center py-16 bg-white rounded-3xl border border-[#EAE4D7] p-8">
                <Calendar className="w-10 h-10 text-[#B87A1E] mx-auto mb-3 opacity-60" />
                <h3 className="font-bold text-base text-[#1A2420]">{t("noResults")}</h3>
                <p className="text-xs text-[#7A8880] mt-1">മറ്റു വാക്കുകൾ ഉപയോഗിച്ച് തിരയുക അല്ലെങ്കിൽ മറ്റൊരു വിഭാഗം തിരഞ്ഞെടുക്കുക.</p>
              </div>
            ) : (
              filteredEvents.map((ev) => (
                <div 
                  key={ev.id} 
                  onClick={() => setSelectedEvent(ev)}
                  className="bg-white rounded-3xl border border-[#EAE4D7] shadow-card overflow-hidden flex flex-col hover:border-[#1B4D36]/60 transition cursor-pointer group"
                >
                  {ev.image_url && (
                    <div className="h-48 w-full bg-[#E5DDD0] relative overflow-hidden">
                      <img src={ev.image_url} alt={ev.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                      <span className="absolute top-3 left-3 bg-[#1B4D36] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                        {ev.category}
                      </span>
                    </div>
                  )}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold font-malayalam-serif text-base text-[#1A2420] group-hover:text-[#1B4D36] transition mb-1.5">
                        {ev.title}
                      </h3>
                      <p className="text-xs text-[#5C6A64] line-clamp-3 leading-relaxed mb-4">
                        {ev.description}
                      </p>
                    </div>

                    <div className="space-y-2 text-xs text-[#5C6A64] pt-3 border-t border-[#F3EFE6]">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-[#1B4D36]" />
                        <span>{new Date(ev.start_date).toLocaleDateString("ml-IN", { month: "short", day: "numeric", year: "numeric" })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#1B4D36]" />
                        <span className="truncate">{ev.location_name}</span>
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] font-medium text-[#7A8880]">
                          {ev.organizer_name}
                        </span>
                        <span className="text-xs font-bold text-[#1B4D36] group-hover:underline flex items-center gap-1">
                          വിശദാംശങ്ങൾ <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* SERVICES / BUSINESSES LIST */}
        {activeTab === "services" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredBusinesses.length === 0 ? (
              <div className="col-span-3 text-center py-16 bg-white rounded-3xl border border-[#EAE4D7] p-8">
                <Compass className="w-10 h-10 text-[#B87A1E] mx-auto mb-3 opacity-60" />
                <h3 className="font-bold text-base text-[#1A2420]">{t("noResults")}</h3>
                <p className="text-xs text-[#7A8880] mt-1">സേവനങ്ങൾ ഒന്നും കണ്ടെത്തിയില്ല.</p>
              </div>
            ) : (
              filteredBusinesses.map((biz) => (
                <div 
                  key={biz.id} 
                  onClick={() => setSelectedBusiness(biz)}
                  className="bg-white rounded-3xl border border-[#EAE4D7] shadow-card p-6 flex flex-col justify-between hover:border-[#1B4D36]/60 transition cursor-pointer group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-bold text-[#1B4D36] bg-[#E0F1E7] px-3 py-1 rounded-full border border-[#BDE3CE]">
                        {biz.category}
                      </span>
                      {biz.is_verified && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>{t("verifiedBadge")}</span>
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold font-malayalam-serif text-lg text-[#1A2420] group-hover:text-[#1B4D36] transition mb-1.5">
                      {biz.name}
                    </h3>
                    <p className="text-xs text-[#5C6A64] leading-relaxed mb-4 line-clamp-3">
                      {biz.description}
                    </p>
                  </div>

                  <div className="space-y-2 text-xs text-[#5C6A64] pt-3 border-t border-[#F3EFE6]">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#1B4D36] flex-shrink-0" />
                      <span className="truncate">{biz.address}</span>
                    </div>

                    {biz.opening_hours && (
                      <div className="flex items-center gap-2 text-[11px]">
                        <Clock className="w-3.5 h-3.5 text-[#1B4D36] flex-shrink-0" />
                        <span className="truncate">
                          {Object.entries(biz.opening_hours)[0]?.[0]}: {Object.entries(biz.opening_hours)[0]?.[1]}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2">
                      <a
                        href={`tel:${biz.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#E0F1E7] hover:bg-[#C9E8D6] text-[#1B4D36] font-bold text-xs transition"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>{biz.phone}</span>
                      </a>
                      <span className="text-xs font-bold text-[#1B4D36] group-hover:underline">
                        വിവരങ്ങൾ
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* PLACES LIST */}
        {activeTab === "places" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPlaces.length === 0 ? (
              <div className="col-span-2 text-center py-16 bg-white rounded-3xl border border-[#EAE4D7] p-8">
                <MapPin className="w-10 h-10 text-[#B87A1E] mx-auto mb-3 opacity-60" />
                <h3 className="font-bold text-base text-[#1A2420]">{t("noResults")}</h3>
                <p className="text-xs text-[#7A8880] mt-1">സ്ഥലങ്ങൾ ഒന്നും കണ്ടെത്തിയില്ല.</p>
              </div>
            ) : (
              filteredPlaces.map((plc) => (
                <div 
                  key={plc.id} 
                  onClick={() => setSelectedPlace(plc)}
                  className="bg-white rounded-3xl border border-[#EAE4D7] shadow-card overflow-hidden flex flex-col sm:flex-row hover:border-[#1B4D36]/60 transition cursor-pointer group"
                >
                  {plc.image_url && (
                    <div className="sm:w-1/2 h-48 sm:h-auto bg-[#E5DDD0] overflow-hidden">
                      <img src={plc.image_url} alt={plc.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    </div>
                  )}
                  <div className="p-5 sm:w-1/2 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-[#B87A1E] uppercase tracking-wider bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                        {plc.category}
                      </span>
                      <h3 className="font-bold font-malayalam-serif text-base text-[#1A2420] group-hover:text-[#1B4D36] transition mt-2 mb-2">
                        {plc.name}
                      </h3>
                      <p className="text-xs text-[#5C6A64] leading-relaxed mb-4 line-clamp-3">
                        {plc.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#F3EFE6] text-xs text-[#5C6A64] flex items-center justify-between">
                      <div className="flex items-center gap-1.5 truncate">
                        <MapPin className="w-3.5 h-3.5 text-[#1B4D36] flex-shrink-0" />
                        <span className="truncate">{plc.location_name}</span>
                      </div>
                      <span className="text-xs font-bold text-[#1B4D36] group-hover:underline flex-shrink-0 ml-2">
                        കാണുക
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </main>

      {/* ========================================================================= */}
      {/* INTERACTIVE DETAIL MODALS */}
      {/* ========================================================================= */}

      {/* 1. EVENT DETAIL MODAL */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[#FAF7F0] rounded-3xl border border-[#E7DFD0] max-w-lg w-full shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            {selectedEvent.image_url && (
              <div className="relative h-48 w-full flex-shrink-0 bg-neutral-900">
                <img
                  src={selectedEvent.image_url}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => {
                    setSelectedEvent(null);
                    setRsvpSuccess(false);
                  }}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="p-6 overflow-y-auto flex-1">
              <span className="text-[11px] font-bold text-[#1B4D36] uppercase tracking-wider bg-[#E0F1E7] px-2.5 py-0.5 rounded-full border border-[#BDE3CE]">
                {selectedEvent.category}
              </span>

              <h2 className="text-xl font-bold font-malayalam-serif text-[#1B4D36] mt-2 mb-3">
                {selectedEvent.title}
              </h2>

              <div className="space-y-2.5 text-xs text-[#5C6A64] mb-5 bg-white rounded-2xl p-4 border border-[#EAE4D7]">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#1B4D36]" />
                  <span className="font-semibold text-[#1A2420]">
                    {new Date(selectedEvent.start_date).toLocaleString("ml-IN", { dateStyle: "full", timeStyle: "short" })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#1B4D36]" />
                  <span>{selectedEvent.location_name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#1B4D36]" />
                  <span>സംഘാടനം: {selectedEvent.organizer_name}</span>
                </div>
                {selectedEvent.contact_phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#1B4D36]" />
                    <a href={`tel:${selectedEvent.contact_phone}`} className="text-[#1B4D36] font-bold hover:underline">
                      {selectedEvent.contact_phone}
                    </a>
                  </div>
                )}
              </div>

              <p className="text-xs sm:text-sm text-[#3E4D45] leading-relaxed mb-6 font-malayalam-body">
                {selectedEvent.description}
              </p>

              {rsvpSuccess ? (
                <div className="p-3.5 rounded-xl bg-[#1B4D36] text-white text-xs font-semibold text-center flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-300" />
                  <span>പങ്കാളിത്തം രേഖപ്പെടുത്തി! നിങ്ങൾക്ക് ഓർമ്മപ്പെടുത്തൽ ലഭിക്കും.</span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleEventRsvp}
                    className="flex-1 py-3 rounded-xl bg-[#1B4D36] hover:bg-[#133A28] text-white text-xs font-bold transition shadow-md active:scale-95"
                  >
                    പങ്കെടുക്കാം (RSVP)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({ title: selectedEvent.title, text: selectedEvent.description, url: window.location.href });
                      }
                    }}
                    className="px-4 py-3 rounded-xl bg-white hover:bg-[#EFE9DD] border border-[#DDD5C5] text-xs font-bold text-[#1B4D36] transition flex items-center gap-1.5"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>പങ്കുവെക്കുക</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. BUSINESS DETAIL MODAL */}
      {selectedBusiness && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[#FAF7F0] rounded-3xl border border-[#E7DFD0] max-w-lg w-full shadow-2xl p-6 overflow-hidden">
            <div className="flex items-center justify-between mb-3 border-b border-[#E5DFD1] pb-3">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-[#1B4D36] bg-[#E0F1E7] px-2.5 py-0.5 rounded-full border border-[#BDE3CE]">
                  {selectedBusiness.category}
                </span>
                {selectedBusiness.is_verified && (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>{t("verifiedBadge")}</span>
                  </span>
                )}
              </div>
              <button
                onClick={() => setSelectedBusiness(null)}
                className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#5C6A64] hover:text-[#1A2420] border border-[#DDD5C5] flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h2 className="text-xl font-bold font-malayalam-serif text-[#1B4D36] mb-2">
              {selectedBusiness.name}
            </h2>

            <p className="text-xs sm:text-sm text-[#3E4D45] leading-relaxed mb-5 font-malayalam-body">
              {selectedBusiness.description}
            </p>

            <div className="space-y-2.5 text-xs text-[#5C6A64] mb-6 bg-white rounded-2xl p-4 border border-[#EAE4D7]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#1B4D36]" />
                <span>{selectedBusiness.address}</span>
              </div>
              {selectedBusiness.opening_hours && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#1B4D36]" />
                  <span>
                    {Object.entries(selectedBusiness.opening_hours)[0]?.[0]}: {Object.entries(selectedBusiness.opening_hours)[0]?.[1]}
                  </span>
                </div>
              )}
              {selectedBusiness.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#1B4D36]" />
                  <span>{selectedBusiness.email}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <a
                href={`tel:${selectedBusiness.phone}`}
                className="flex-1 py-3 rounded-xl bg-[#1B4D36] hover:bg-[#133A28] text-white text-xs font-bold transition shadow-md flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>വിളിക്കുക ({selectedBusiness.phone})</span>
              </a>
              {selectedBusiness.website && (
                <a
                  href={selectedBusiness.website}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-3 rounded-xl bg-white hover:bg-[#EFE9DD] border border-[#DDD5C5] text-xs font-bold text-[#1B4D36] transition flex items-center gap-1.5"
                >
                  <Globe className="w-4 h-4" />
                  <span>വെബ്സൈറ്റ്</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. PLACE DETAIL MODAL */}
      {selectedPlace && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[#FAF7F0] rounded-3xl border border-[#E7DFD0] max-w-lg w-full shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            {selectedPlace.image_url && (
              <div className="relative h-52 w-full flex-shrink-0 bg-neutral-900">
                <img
                  src={selectedPlace.image_url}
                  alt={selectedPlace.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedPlace(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="p-6 overflow-y-auto flex-1">
              <span className="text-[11px] font-bold text-[#B87A1E] uppercase tracking-wider bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                {selectedPlace.category}
              </span>

              <h2 className="text-xl font-bold font-malayalam-serif text-[#1B4D36] mt-2 mb-3">
                {selectedPlace.name}
              </h2>

              <div className="flex items-center gap-2 text-xs text-[#5C6A64] mb-4 bg-white rounded-2xl p-3 border border-[#EAE4D7]">
                <MapPin className="w-4 h-4 text-[#1B4D36]" />
                <span className="font-semibold text-[#1A2420]">{selectedPlace.location_name}</span>
              </div>

              <p className="text-xs sm:text-sm text-[#3E4D45] leading-relaxed mb-6 font-malayalam-body">
                {selectedPlace.description}
              </p>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowMapView(true);
                    setSelectedPlace(null);
                  }}
                  className="flex-1 py-3 rounded-xl bg-[#1B4D36] hover:bg-[#133A28] text-white text-xs font-bold transition shadow-md flex items-center justify-center gap-2"
                >
                  <Map className="w-4 h-4" />
                  <span>ഭൂപടത്തിൽ കാണുക</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <BottomNav />
    </div>
  );
}

export default function DiscoverPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7F0] flex items-center justify-center text-xs text-[#5C6A64]">Loading...</div>}>
      <DiscoverContent />
    </Suspense>
  );
}
