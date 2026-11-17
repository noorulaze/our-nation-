"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { CommunityMap } from "@/components/map/CommunityMap";
import { useLanguage } from "@/lib/i18n/context";
import { useCommunity } from "@/lib/community/context";
import { store } from "@/lib/data/store";
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
  ExternalLink 
} from "lucide-react";

export default function DiscoverPage() {
  const { t, language } = useLanguage();
  const { currentCommunity, availableCommunities } = useCommunity();
  const [activeTab, setActiveTab] = useState<"events" | "services" | "places">("events");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showMapView, setShowMapView] = useState(false);

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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header & Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              {t("discoverTitle")}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              {currentCommunity 
                ? (language === "ml" ? `${currentCommunity.name_ml} പ്രദേശത്തെ വിശേഷങ്ങൾ` : `Exploring ${currentCommunity.name}, ${currentCommunity.district}`)
                : "All Kerala"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowMapView(!showMapView)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition ${
                showMapView 
                  ? "bg-brand-700 text-white border-brand-700 shadow-sm" 
                  : "bg-surface text-foreground border-border hover:bg-muted"
              }`}
            >
              {showMapView ? <List className="w-4 h-4" /> : <Map className="w-4 h-4" />}
              <span>{showMapView ? "List View" : t("viewOnMap")}</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-border mb-6">
          <button
            onClick={() => {
              setActiveTab("events");
              setSelectedCategory("All");
            }}
            className={`pb-3 px-4 text-sm font-semibold transition border-b-2 -mb-px flex items-center gap-2 ${
              activeTab === "events"
                ? "border-brand-700 text-brand-700"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>{t("tabEvents")}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted font-bold">
              {filteredEvents.length}
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab("services");
              setSelectedCategory("All");
            }}
            className={`pb-3 px-4 text-sm font-semibold transition border-b-2 -mb-px flex items-center gap-2 ${
              activeTab === "services"
                ? "border-brand-700 text-brand-700"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>{t("tabServices")}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted font-bold">
              {filteredBusinesses.length}
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab("places");
              setSelectedCategory("All");
            }}
            className={`pb-3 px-4 text-sm font-semibold transition border-b-2 -mb-px flex items-center gap-2 ${
              activeTab === "places"
                ? "border-brand-700 text-brand-700"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>{t("tabPlaces")}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted font-bold">
              {filteredPlaces.length}
            </span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-surface rounded-2xl border border-border p-4 mb-6 shadow-sm flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-3.5 text-muted-foreground" />
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
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-brand-500 text-foreground"
            />
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
                className={`whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                  selectedCategory === cat
                    ? "bg-brand-700 text-white font-semibold"
                    : "bg-muted/70 hover:bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Map View Toggle */}
        {showMapView && (
          <div className="mb-8">
            <CommunityMap
              centerLat={currentCommunity?.latitude || 10.0159}
              centerLng={currentCommunity?.longitude || 76.3419}
              events={activeTab === "events" ? filteredEvents : []}
              businesses={activeTab === "services" ? filteredBusinesses : []}
              places={activeTab === "places" ? filteredPlaces : []}
              className="h-[450px] w-full rounded-2xl border border-border shadow-md"
            />
          </div>
        )}

        {/* EVENTS LIST */}
        {activeTab === "events" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredEvents.length === 0 ? (
              <div className="col-span-3 text-center py-12 text-muted-foreground text-sm">
                {t("noResults")}
              </div>
            ) : (
              filteredEvents.map((ev) => (
                <div key={ev.id} className="bg-surface rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col hover:border-brand-300 transition">
                  {ev.image_url && (
                    <div className="h-48 w-full bg-muted relative overflow-hidden">
                      <img src={ev.image_url} alt={ev.title} className="w-full h-full object-cover" />
                      <span className="absolute top-2.5 left-2.5 bg-surface/90 backdrop-blur-sm px-2.5 py-0.5 rounded-md text-[10px] font-bold text-foreground">
                        {ev.category}
                      </span>
                    </div>
                  )}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-base text-foreground mb-1.5">
                        {ev.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed mb-4">
                        {ev.description}
                      </p>
                    </div>

                    <div className="space-y-2 text-xs text-muted-foreground pt-3 border-t border-border">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-brand-700" />
                        <span>{new Date(ev.start_date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-brand-700" />
                        <span className="truncate">{ev.location_name}</span>
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] font-medium text-foreground">
                          Org: {ev.organizer_name}
                        </span>
                        {ev.contact_phone && (
                          <a
                            href={`tel:${ev.contact_phone}`}
                            className="font-semibold text-brand-700 hover:text-brand-800"
                          >
                            {ev.contact_phone}
                          </a>
                        )}
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
              <div className="col-span-3 text-center py-12 text-muted-foreground text-sm">
                {t("noResults")}
              </div>
            ) : (
              filteredBusinesses.map((biz) => (
                <div key={biz.id} className="bg-surface rounded-2xl border border-border shadow-sm p-6 flex flex-col justify-between hover:border-brand-300 transition">
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
                    <h3 className="font-bold text-lg text-foreground mb-1.5">
                      {biz.name}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                      {biz.description}
                    </p>
                  </div>

                  <div className="space-y-2 text-xs text-muted-foreground pt-3 border-t border-border">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-brand-700 flex-shrink-0" />
                      <span className="truncate">{biz.address}</span>
                    </div>

                    {biz.opening_hours && (
                      <div className="flex items-center gap-2 text-[11px]">
                        <Clock className="w-3.5 h-3.5 text-brand-700 flex-shrink-0" />
                        <span className="truncate">
                          {Object.entries(biz.opening_hours)[0]?.[0]}: {Object.entries(biz.opening_hours)[0]?.[1]}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2">
                      <a
                        href={`tel:${biz.phone}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-50 hover:bg-brand-100 text-brand-700 font-semibold transition"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>{biz.phone}</span>
                      </a>
                      {biz.website && (
                        <a
                          href={biz.website}
                          target="_blank"
                          rel="noreferrer"
                          className="text-muted-foreground hover:text-foreground p-1.5 rounded-lg hover:bg-muted"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
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
              <div className="col-span-2 text-center py-12 text-muted-foreground text-sm">
                {t("noResults")}
              </div>
            ) : (
              filteredPlaces.map((plc) => (
                <div key={plc.id} className="bg-surface rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col sm:flex-row hover:border-brand-300 transition">
                  {plc.image_url && (
                    <div className="sm:w-1/2 h-48 sm:h-auto bg-muted">
                      <img src={plc.image_url} alt={plc.name} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="p-5 sm:w-1/2 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">
                        {plc.category}
                      </span>
                      <h3 className="font-bold text-base text-foreground mt-0.5 mb-2">
                        {plc.name}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                        {plc.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-border text-xs text-muted-foreground flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-brand-700 flex-shrink-0" />
                      <span className="truncate">{plc.location_name}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
