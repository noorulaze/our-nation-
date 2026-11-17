"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { TanurNav } from "@/components/tanur/TanurNav";
import { TANUR_PLACES, TanurPlace } from "@/lib/data/tanurData";
import {
  MapPin,
  Clock,
  Compass,
  ArrowRight,
  Filter,
  ExternalLink,
  ShieldCheck,
  Search,
  Sparkles,
  Phone,
  Globe,
  X,
} from "lucide-react";
import dynamic from "next/dynamic";

const CommunityMap = dynamic(
  () => import("@/components/map/CommunityMap").then((mod) => mod.CommunityMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-[320px] w-full rounded-2xl bg-[#EDE6D8] animate-pulse flex items-center justify-center text-xs text-[#5C6A64]">
        മാപ്പ് ലോഡ് ചെയ്യുന്നു... (Loading Map)
      </div>
    ),
  }
);

export default function TanurPlacesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlaceModal, setSelectedPlaceModal] = useState<TanurPlace | null>(null);

  const categories = [
    { key: "all", label: "എല്ലാ സ്ഥലങ്ങളും (All Places)" },
    { key: "beach", label: "കടലോരം & ബീച്ചുകൾ (Beaches)" },
    { key: "harbour", label: "ഹാർബറും പുലിമുട്ടും (Harbour)" },
    { key: "temple", label: "ക്ഷേത്രങ്ങൾ (Temples)" },
    { key: "mosque", label: "പള്ളികൾ (Mosques)" },
    { key: "education", label: "പഠന കേന്ദ്രങ്ങൾ (Institutions)" },
    { key: "transport", label: "റെയിൽവേ & ഗതാഗതം (Transport)" },
  ];

  const filteredPlaces = TANUR_PLACES.filter((p) => {
    const matchCategory = selectedCategory === "all" || p.category === selectedCategory;
    const matchSearch = (p.name + " " + p.name_ml + " " + p.description + " " + p.location)
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const mapPlaces = filteredPlaces.map((p) => ({
    id: p.id,
    community_id: "40000000-0000-0000-0000-000000000007",
    name: p.name,
    name_ml: p.name_ml,
    category: p.category_ml,
    description: p.description,
    location_name: p.location,
    latitude: p.latitude,
    longitude: p.longitude,
    image_url: p.imageUrl,
    created_at: new Date().toISOString(),
  }));

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
      <Navbar />
      <TanurNav />

      <main className="flex-1 pb-16">
        {/* Hero Section */}
        <section className="relative h-[260px] sm:h-[340px] overflow-hidden flex items-end">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://upload.wikimedia.org/wikipedia/commons/3/31/A_view_of_tanur_harbour.jpg')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#081B12] via-[#0E2C1E]/80 to-black/40" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8 sm:pb-10 text-white">
            <div className="flex items-center gap-2 text-xs font-medium text-amber-200/90 mb-2">
              <Link href="/tanur" className="hover:underline">
                താനൂർ
              </Link>
              <span>/</span>
              <span>സ്ഥലങ്ങൾ & അടയാളങ്ങൾ</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold text-amber-300 mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>തീരദേശ കാഴ്ചകൾ & പൈതൃക കേന്ദ്രങ്ങൾ</span>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-malayalam-heading">
              താനൂരിലെ പ്രധാന സ്ഥലങ്ങൾ
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-stone-200 font-malayalam-body max-w-2xl leading-relaxed">
              കടലോരങ്ങളും പുലിമുട്ടും പുരാതന ക്ഷേത്രങ്ങളും പള്ളികളും പൈതൃക റെയിൽവേ സ്റ്റേഷനും ഉൾപ്പെടുന്ന സമഗ്ര വഴികാട്ടി.
            </p>
          </div>
        </section>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12">
          {/* Search & Category Filter Bar */}
          <div className="bg-white rounded-3xl border border-[#EDE6D8] p-4 sm:p-6 shadow-card mb-8 space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-[#7A8880]" />
                <input
                  type="text"
                  placeholder="സ്ഥലത്തിന്റെ പേര് തിരയുക..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-none focus:ring-2 focus:ring-[#1B4D36]"
                />
              </div>
              <div className="text-xs font-medium text-[#5C6A64]">
                ആകെ കണ്ടെത്തിയ സ്ഥലങ്ങൾ: <strong className="text-[#1B4D36]">{filteredPlaces.length}</strong>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pt-2">
              {categories.map((c) => (
                <button
                  key={c.key}
                  onClick={() => setSelectedCategory(c.key)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-malayalam-heading transition whitespace-nowrap ${
                    selectedCategory === c.key
                      ? "bg-[#1B4D36] text-white shadow-sm"
                      : "bg-[#FAF7F0] text-[#5C6A64] hover:text-[#1A2420] border border-[#EDE6D8]"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Places Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlaces.map((place) => (
              <div
                id={place.id}
                key={place.id}
                className="bg-white rounded-3xl border border-[#EDE6D8] overflow-hidden shadow-card hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-stone-200">
                    <img
                      src={place.imageUrl}
                      alt={place.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[11px] font-bold text-[#1B4D36]">
                      {place.category_ml}
                    </div>
                    {place.isNearby && (
                      <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-bold">
                        അയൽപക്ക പ്രദേശം
                      </div>
                    )}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h3 className="text-lg font-bold font-malayalam-heading leading-tight drop-shadow">
                        {place.name_ml}
                      </h3>
                      <div className="text-xs text-stone-200">{place.name}</div>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="text-[11px] font-bold text-[#B87A1E] font-malayalam-body">
                      {place.tagline_ml}
                    </div>
                    <p className="text-xs text-[#5C6A64] font-malayalam-body line-clamp-3 leading-relaxed">
                      {place.description_ml}
                    </p>

                    {place.visitorInfo && (
                      <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#EDE6D8] text-[11px] text-[#4A5752] space-y-1">
                        {place.visitorInfo.timings && (
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-[#1B4D36] shrink-0" />
                            <span>സമയം: {place.visitorInfo.timings}</span>
                          </div>
                        )}
                        {place.visitorInfo.nearestTransport && (
                          <div className="flex items-center gap-1.5">
                            <Compass className="w-3.5 h-3.5 text-[#1B4D36] shrink-0" />
                            <span>യാത്ര: {place.visitorInfo.nearestTransport}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-[#F0EBE0] flex items-center justify-between text-xs text-[#7A8880]">
                    <span className="flex items-center gap-1 font-medium truncate max-w-[170px]">
                      <MapPin className="w-3.5 h-3.5 text-[#1B4D36]" />
                      <span>{place.location_ml}</span>
                    </span>
                    <button
                      onClick={() => setSelectedPlaceModal(place)}
                      className="px-3 py-1.5 rounded-xl bg-[#1B4D36] hover:bg-[#143d2b] text-white text-[11px] font-bold font-malayalam-heading transition"
                    >
                      കൂടുതൽ അറിയാം
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Map View */}
          <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-8 shadow-card mt-12">
            <h3 className="text-lg font-bold font-malayalam-serif text-[#1B4D36] mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#B87A1E]" />
              <span>മാപ്പിൽ അടയാളപ്പെടുത്തിയ താനൂർ കേന്ദ്രങ്ങൾ</span>
            </h3>
            <CommunityMap
              centerLat={10.9768}
              centerLng={75.8675}
              zoom={13}
              places={mapPlaces}
              className="h-[360px] w-full rounded-2xl border border-[#EDE6D8]"
            />
          </div>
        </div>

        {/* Modal for Place Details */}
        {selectedPlaceModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-3xl border border-[#EDE6D8] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
              <button
                onClick={() => setSelectedPlaceModal(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-64 w-full bg-stone-200">
                <img
                  src={selectedPlaceModal.imageUrl}
                  alt={selectedPlaceModal.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <span className="px-3 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-[11px] font-bold">
                    {selectedPlaceModal.category_ml}
                  </span>
                  <h3 className="text-2xl font-black font-malayalam-heading mt-1">
                    {selectedPlaceModal.name_ml}
                  </h3>
                  <div className="text-xs text-stone-200">{selectedPlaceModal.name}</div>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#B87A1E] font-malayalam-body">
                    വിവരണം & പ്രാധാന്യം
                  </h4>
                  <p className="text-xs sm:text-sm text-[#4A5752] font-malayalam-body leading-relaxed mt-1">
                    {selectedPlaceModal.description_ml}
                  </p>
                  <p className="text-xs text-[#7A8880] leading-relaxed italic mt-2">
                    {selectedPlaceModal.description}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] space-y-2 text-xs font-malayalam-body">
                  <div className="font-bold text-[#1B4D36]">സന്ദർശക വിവരങ്ങൾ (Visitor Information):</div>
                  {selectedPlaceModal.visitorInfo?.timings && (
                    <div className="text-[#4A5752]">• സമയം: {selectedPlaceModal.visitorInfo.timings}</div>
                  )}
                  {selectedPlaceModal.visitorInfo?.entryFee && (
                    <div className="text-[#4A5752]">• പ്രവേശന ഫീസ്: {selectedPlaceModal.visitorInfo.entryFee}</div>
                  )}
                  {selectedPlaceModal.visitorInfo?.nearestTransport && (
                    <div className="text-[#4A5752]">• ഗതാഗതം: {selectedPlaceModal.visitorInfo.nearestTransport}</div>
                  )}
                  <div className="text-[#4A5752]">• സ്ഥാനം: {selectedPlaceModal.location_ml}</div>
                </div>

                {selectedPlaceModal.contactInfo && (
                  <div className="flex flex-wrap gap-3 pt-2">
                    {selectedPlaceModal.contactInfo.phone && (
                      <a
                        href={`tel:${selectedPlaceModal.contactInfo.phone}`}
                        className="px-4 py-2 rounded-xl bg-[#E8F2EC] text-[#1B4D36] text-xs font-bold flex items-center gap-1.5"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>{selectedPlaceModal.contactInfo.phone}</span>
                      </a>
                    )}
                    {selectedPlaceModal.contactInfo.website && (
                      <a
                        href={selectedPlaceModal.contactInfo.website}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-xl bg-[#E8F2EC] text-[#1B4D36] text-xs font-bold flex items-center gap-1.5"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>ഔദ്യോഗിക വെബ്‌സൈറ്റ്</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
