"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { useLanguage } from "@/lib/i18n/context";
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Clock, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  Share2, 
  X, 
  Search, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  ExternalLink,
  Phone
} from "lucide-react";
import { store } from "@/lib/data/store";
import { Event } from "@/types/database";

export default function EventsPage() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("എല്ലാം");
  const [selectedDay, setSelectedDay] = useState<number>(20);
  const [activeModalEvent, setActiveModalEvent] = useState<Event | null>(null);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);

  const categories = ["എല്ലാം", "സംസ്കാരം", "വിദ്യാഭ്യാസം", "കായികം", "മേളകൾ"];

  const allEvents = useMemo(() => {
    return store.getEvents();
  }, []);

  const getEventCategoryTag = (category: string) => {
    const c = category.toLowerCase();
    if (c.includes("cultur") || c.includes("കല") || c.includes("സംസ്കാരം")) return "സംസ്കാരം";
    if (c.includes("educat") || c.includes("വിദ്യാഭ്യാസം") || c.includes("സാഹിത്യം")) return "വിദ്യാഭ്യാസം";
    if (c.includes("sport") || c.includes("കായികം") || c.includes("ഫുട്ബോൾ")) return "കായികം";
    return "മേളകൾ";
  };

  const filteredEvents = useMemo(() => {
    if (selectedCategory === "എല്ലാം") return allEvents;
    return allEvents.filter((e) => getEventCategoryTag(e.category) === selectedCategory);
  }, [allEvents, selectedCategory]);

  const handleRsvp = () => {
    setRsvpSuccess(true);
    setTimeout(() => setRsvpSuccess(false), 2500);
  };

  const formatEventDate = (dateString: string) => {
    const d = new Date(dateString);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const mlMonths = ["ജനുവരി", "ഫെബ്രുവരി", "മാർച്ച്", "ഏപ്രിൽ", "മേയ്", "ജൂൺ", "ജൂലൈ", "ഓഗസ്റ്റ്", "സെപ്റ്റംബർ", "ഒക്ടോബർ", "നവംബർ", "ഡിസംബർ"];
    const month = months[d.getMonth()] || "Nov";
    const mlMonth = mlMonths[d.getMonth()] || "നവംബർ";
    const day = d.getDate() || 20;
    const year = d.getFullYear() || 2026;
    return {
      month,
      day,
      fullDate: `${mlMonth} ${day}, ${year}`,
      time: "രാവിലെ 09:30 മുതൽ",
    };
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
          <Breadcrumbs items={[{ label: "പരിപാടികൾ (Events)" }]} />
        </div>
        
        {/* ========================================================================= */}
        {/* HERO BANNER: Row 2, Col 3 in reference image */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden pt-2 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="relative rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-elevated border border-[#E7DFD0] min-h-[380px] sm:min-h-[440px] flex items-center bg-[#1B3A2C]">
            
            {/* Background Panorama */}
            <div 
              className="absolute inset-0 bg-cover bg-center sm:bg-right"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1600&auto=format&fit=crop&q=80')`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#143024] via-[#143024]/85 to-transparent" />
            </div>

            {/* Left Content */}
            <div className="relative z-10 p-6 sm:p-12 lg:p-16 max-w-2xl text-white">
              <span className="inline-block px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-xs text-amber-200 text-xs font-bold mb-3">
                നാടൻ മാമാങ്കങ്ങൾ • മലപ്പുറം & താനൂർ
              </span>
              <h1 className="text-4xl sm:text-6xl font-bold font-malayalam-serif tracking-tight leading-none mb-3">
                പരിപാടികൾ
              </h1>
              <p className="text-xl sm:text-2xl font-bold font-malayalam-script text-amber-200 mb-4">
                നാടിന്റെ പരിപാടികൾ അറിയാം...
              </p>
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-malayalam-body max-w-lg">
                ഉത്സവങ്ങൾ, കലോത്സവങ്ങൾ, സാഹിത്യ സമ്മേളനങ്ങൾ, കായിക മത്സരങ്ങൾ എന്നിവയെക്കുറിച്ചുള്ള പരിശോധിച്ചുറപ്പിച്ച തത്സമയ വിവരങ്ങൾ.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CATEGORY TABS BAR */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition active:scale-95 whitespace-nowrap shadow-xs ${
                  selectedCategory === cat
                    ? "bg-[#1B4D36] text-white"
                    : "bg-white hover:bg-[#F3EFE6] text-[#3D4B44] border border-[#DDD5C5]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* MAIN SECTION: Event Cards on Left (8 Cols) + Calendar Widget on Right (4 Cols) */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Event Cards Grid (8 Cols) */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {filteredEvents.map((event) => {
                const dateInfo = formatEventDate(event.start_date);
                const categoryTag = getEventCategoryTag(event.category);

                return (
                  <div
                    key={event.id}
                    onClick={() => setActiveModalEvent(event)}
                    className="bg-white rounded-2xl sm:rounded-3xl border border-[#EAE4D7] shadow-card overflow-hidden hover:border-[#1B4D36]/60 transition cursor-pointer group flex flex-row sm:flex-col justify-between p-3.5 sm:p-0"
                  >
                    {/* Mobile Date Badge */}
                    <div className="sm:hidden flex flex-col items-center justify-center w-14 h-14 rounded-2xl bg-[#FFF4D6] border border-[#F0D598] text-center shrink-0 mr-3">
                      <span className="text-[10px] uppercase font-bold text-[#8C5B0F] leading-none">{dateInfo.month}</span>
                      <span className="text-base font-bold text-[#1B4D36] leading-none mt-1">{dateInfo.day}</span>
                    </div>

                    {/* Desktop Image with Date & Verification Badges */}
                    <div className="hidden sm:block h-44 overflow-hidden relative bg-[#E5DDD0]">
                      <img
                        src={event.image_url || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80"}
                        alt={event.title_ml || event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-white/95 rounded-xl px-2.5 py-1 text-center shadow-xs">
                        <span className="text-[9px] uppercase font-bold text-[#7A8880] block leading-none">{dateInfo.month}</span>
                        <span className="text-sm font-bold text-[#1B4D36] block leading-none mt-0.5">{dateInfo.day}</span>
                      </div>
                      <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
                        <span className="bg-[#1B4D36] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {categoryTag}
                        </span>
                        {event.is_verified && (
                          <span className="bg-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-0.5">
                            <CheckCircle2 className="w-2.5 h-2.5" />
                            <span>Verified ✓</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 sm:p-4 flex flex-col justify-between">
                      <div>
                        <div className="sm:hidden flex items-center gap-1.5 mb-1">
                          <span className="text-[9px] font-bold text-[#1B4D36] bg-[#E0F1E7] px-2 py-0.5 rounded-full border border-[#BDE3CE]">
                            {categoryTag}
                          </span>
                          {event.is_verified && (
                            <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                              Verified ✓
                            </span>
                          )}
                        </div>
                        <h3 className="font-bold font-malayalam-serif text-xs sm:text-base text-[#1A2420] group-hover:text-[#1B4D36] transition truncate mb-0.5 sm:mb-1">
                          {event.title_ml || event.title}
                        </h3>
                        <div className="flex items-center gap-1 text-[11px] text-[#7A8880] mb-1 sm:mb-2">
                          <MapPin className="w-3.5 h-3.5 text-[#1B4D36] shrink-0" />
                          <span className="truncate">{event.location_name}</span>
                        </div>
                        <p className="hidden sm:block text-xs text-[#5C6A64] line-clamp-2 leading-relaxed font-malayalam-body">
                          {event.description}
                        </p>
                      </div>

                      <div className="mt-1 sm:mt-4 sm:pt-3 sm:border-t sm:border-[#F3EFE6] flex items-center justify-between text-xs font-bold text-[#1B4D36]">
                        <span className="hidden sm:inline">വിശദാംശങ്ങൾ</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition ml-auto sm:ml-0" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Dark Green Calendar Box */}
            <div className="lg:col-span-4 bg-gradient-to-b from-[#1C5139] to-[#123826] text-white rounded-3xl p-6 sm:p-7 shadow-card">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/15">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-amber-300" />
                  <h3 className="font-bold font-malayalam-serif text-base text-white">
                    നവംബർ 2026
                  </h3>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-1 rounded-full hover:bg-white/10 text-white/80" aria-label="Previous month">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button className="p-1 rounded-full hover:bg-white/10 text-white/80" aria-label="Next month">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Day of Week Headers */}
              <div className="grid grid-cols-7 gap-1 text-center text-[10px] uppercase font-bold text-amber-200/90 mb-2">
                <span>Su</span>
                <span>Mo</span>
                <span>Tu</span>
                <span>We</span>
                <span>Th</span>
                <span>Fr</span>
                <span>Sa</span>
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1.5 text-center text-xs">
                <div className="p-2 text-white/20">26</div>
                <div className="p-2 text-white/20">27</div>
                <div className="p-2 text-white/20">28</div>
                <div className="p-2 text-white/20">29</div>
                <div className="p-2 text-white/20">30</div>
                <div className="p-2 text-white/20">31</div>

                {Array.from({ length: 30 }).map((_, i) => {
                  const day = i + 1;
                  const isHighlighted = [10, 15, 20, 22, 28].includes(day);
                  const isSelected = selectedDay === day;

                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs transition mx-auto ${
                        isSelected
                          ? "bg-amber-300 text-[#1B4D36] shadow-sm"
                          : isHighlighted
                          ? "bg-white/25 text-white hover:bg-white/40 ring-1 ring-amber-300/40"
                          : "text-white/80 hover:bg-white/10"
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 pt-4 border-t border-white/15">
                <button
                  type="button"
                  onClick={() => setSelectedCategory("എല്ലാം")}
                  className="w-full py-3 rounded-2xl bg-[#FAF7F0] hover:bg-white text-[#1B4D36] font-bold text-xs text-center transition shadow-md active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <span>എല്ലാ പരിപാടികളും കാണുക ({allEvents.length})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* ========================================================================= */}
      {/* EVENT DETAIL & RSVP MODAL */}
      {/* ========================================================================= */}
      {activeModalEvent && (() => {
        const dateInfo = formatEventDate(activeModalEvent.start_date);
        const categoryTag = getEventCategoryTag(activeModalEvent.category);

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
            <div className="bg-[#FAF7F0] rounded-3xl border border-[#E7DFD0] max-w-lg w-full shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
              <div className="relative h-48 w-full flex-shrink-0 bg-neutral-900">
                <img
                  src={activeModalEvent.image_url || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80"}
                  alt={activeModalEvent.title_ml || activeModalEvent.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => {
                    setActiveModalEvent(null);
                    setRsvpSuccess(false);
                  }}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute top-4 left-4 bg-white/95 rounded-xl px-3 py-1 text-center shadow-md">
                  <span className="text-[10px] uppercase font-bold text-[#7A8880] block">{dateInfo.month}</span>
                  <span className="text-base font-bold text-[#1B4D36] block">{dateInfo.day}</span>
                </div>
                {activeModalEvent.is_verified && (
                  <span className="absolute bottom-3 left-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified Official Event</span>
                  </span>
                )}
              </div>

              <div className="p-6 sm:p-8 overflow-y-auto flex-1">
                <span className="text-[11px] font-bold text-[#1B4D36] uppercase tracking-wider bg-[#E0F1E7] px-2.5 py-0.5 rounded-full border border-[#BDE3CE]">
                  {categoryTag}
                </span>

                <h2 className="text-xl font-bold font-malayalam-serif text-[#1B4D36] mt-2 mb-3">
                  {activeModalEvent.title_ml || activeModalEvent.title}
                </h2>

                <div className="space-y-2 text-xs text-[#5C6A64] mb-4 bg-white rounded-2xl p-4 border border-[#EAE4D7]">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-[#1B4D36]" />
                    <span className="font-semibold text-[#1A2420]">{dateInfo.fullDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#1B4D36]" />
                    <span>{dateInfo.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#1B4D36]" />
                    <span>{activeModalEvent.location_name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#1B4D36]" />
                    <span>സംഘാടനം: {activeModalEvent.organizer_name}</span>
                  </div>
                  {activeModalEvent.contact_phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#1B4D36]" />
                      <span>ബന്ധപ്പെടുക: {activeModalEvent.contact_phone}</span>
                    </div>
                  )}
                </div>

                {/* Verification Source Box */}
                {activeModalEvent.source_url && (
                  <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-emerald-900">
                      <ShieldCheck className="w-4 h-4 text-emerald-700" />
                      <span>സ്രോതസ്സ്: {activeModalEvent.source_name || "ഔദ്യോഗിക പോർട്ടൽ"}</span>
                    </div>
                    <a
                      href={activeModalEvent.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 font-bold hover:underline inline-flex items-center gap-1"
                    >
                      <span>ലിങ്ക്</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}

                <p className="text-xs sm:text-sm text-[#3E4D45] leading-relaxed mb-6 font-malayalam-body">
                  {activeModalEvent.description}
                </p>

                {rsvpSuccess ? (
                  <div className="p-3.5 rounded-xl bg-[#1B4D36] text-white text-xs font-semibold text-center flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-300" />
                    <span>പങ്കാളിത്തം ഉറപ്പാക്കി! നിങ്ങൾക്ക് ഓർമ്മപ്പെടുത്തൽ ലഭിക്കും.</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleRsvp}
                      className="flex-1 py-3 rounded-xl bg-[#1B4D36] hover:bg-[#133A28] text-white text-xs font-bold transition shadow-md active:scale-95"
                    >
                      പങ്കെടുക്കാം (RSVP)
                    </button>
                    <Link
                      href={`/events/${activeModalEvent.id}`}
                      className="px-4 py-3 rounded-xl bg-white hover:bg-[#EFE9DD] border border-[#DDD5C5] text-xs font-bold text-[#1B4D36] transition"
                    >
                      വിശദ താൾ
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      <Footer />
      <BottomNav />
    </div>
  );
}
