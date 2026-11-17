"use client";

import React, { useState } from "react";
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
  ChevronRight 
} from "lucide-react";
import { KeralaEvent, KERALA_EVENTS_DATA } from "@/lib/data/keralaEventsData";

export default function EventsPage() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("എല്ലാം");
  const [selectedDay, setSelectedDay] = useState<number>(20);
  const [activeModalEvent, setActiveModalEvent] = useState<KeralaEvent | null>(null);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);

  const categories = ["എല്ലാം", "സംസ്കാരം", "വിദ്യാഭ്യാസം", "കായികം", "മേളകൾ"];

  const filteredEvents = selectedCategory === "എല്ലാം"
    ? KERALA_EVENTS_DATA
    : KERALA_EVENTS_DATA.filter((e) => e.category === selectedCategory);

  const handleRsvp = () => {
    setRsvpSuccess(true);
    setTimeout(() => setRsvpSuccess(false), 2500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
          <Breadcrumbs items={[{ label: "പരിപാടികൾ (Events)" }]} />
        </div>
        
        {/* ========================================================================= */}
        {/* HERO BANNER: Row 2, Col 3 in reference image (Thrissur Pooram Elephants) */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden pt-2 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="relative rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-elevated border border-[#E7DFD0] min-h-[380px] sm:min-h-[440px] flex items-center bg-[#1B3A2C]">
            
            {/* Background Panorama: Caparisoned Elephants with Golden Nettipattam */}
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
                നാടൻ മാമാങ്കങ്ങൾ
              </span>
              <h1 className="text-4xl sm:text-6xl font-bold font-malayalam-serif tracking-tight leading-none mb-3">
                പരിപാടികൾ
              </h1>
              <p className="text-xl sm:text-2xl font-bold font-malayalam-script text-amber-200 mb-4">
                നാടിന്റെ പരിപാടികൾ അറിയാം...
              </p>
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-malayalam-body max-w-lg">
                ഉത്സവങ്ങൾ, കലോത്സവങ്ങൾ, സാഹിത്യ സമ്മേളനങ്ങൾ, കായിക മത്സരങ്ങൾ എന്നിവയെക്കുറിച്ചുള്ള തത്സമയ കലണ്ടർ.
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
        {/* (Row 2, Col 3 in reference image) */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Event Cards Grid (8 Cols) */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  onClick={() => setActiveModalEvent(event)}
                  className="bg-white rounded-2xl sm:rounded-3xl border border-[#EAE4D7] shadow-card overflow-hidden hover:border-[#1B4D36]/60 transition cursor-pointer group flex flex-row sm:flex-col justify-between p-3.5 sm:p-0"
                >
                  {/* On mobile: Yellow Date Badge on left (matching Screen 6 in Mobile Demo) */}
                  <div className="sm:hidden flex flex-col items-center justify-center w-14 h-14 rounded-2xl bg-[#FFF4D6] border border-[#F0D598] text-center shrink-0 mr-3">
                    <span className="text-[10px] uppercase font-bold text-[#8C5B0F] leading-none">{event.dateMonth}</span>
                    <span className="text-base font-bold text-[#1B4D36] leading-none mt-1">{event.dateDay}</span>
                  </div>

                  {/* On desktop: Image with absolute date badge */}
                  <div className="hidden sm:block h-44 overflow-hidden relative bg-[#E5DDD0]">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 rounded-xl px-2.5 py-1 text-center shadow-xs">
                      <span className="text-[9px] uppercase font-bold text-[#7A8880] block leading-none">{event.dateMonth}</span>
                      <span className="text-sm font-bold text-[#1B4D36] block leading-none mt-0.5">{event.dateDay}</span>
                    </div>
                    <span className="absolute top-3 right-3 bg-[#1B4D36] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {event.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 sm:p-4 flex flex-col justify-between">
                    <div>
                      <div className="sm:hidden flex items-center gap-1.5 mb-1">
                        <span className="text-[9px] font-bold text-[#1B4D36] bg-[#E0F1E7] px-2 py-0.5 rounded-full border border-[#BDE3CE]">
                          {event.category}
                        </span>
                      </div>
                      <h3 className="font-bold font-malayalam-serif text-xs sm:text-base text-[#1A2420] group-hover:text-[#1B4D36] transition truncate mb-0.5 sm:mb-1">
                        {event.title}
                      </h3>
                      <div className="flex items-center gap-1 text-[11px] text-[#7A8880] mb-1 sm:mb-2">
                        <MapPin className="w-3.5 h-3.5 text-[#1B4D36] shrink-0" />
                        <span className="truncate">{event.location || event.district}</span>
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
              ))}
            </div>

            {/* Right Column: Dark Green Calendar Box (Row 2, Col 3 in reference image) */}
            <div className="lg:col-span-4 bg-gradient-to-b from-[#1C5139] to-[#123826] text-white rounded-3xl p-6 sm:p-7 shadow-card">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/15">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-amber-300" />
                  <h3 className="font-bold font-malayalam-serif text-base text-white">
                    നവംബർ 2026
                  </h3>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-1 rounded-full hover:bg-white/10 text-white/80">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button className="p-1 rounded-full hover:bg-white/10 text-white/80">
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

              {/* 30 Calendar Days Grid */}
              <div className="grid grid-cols-7 gap-1.5 text-center text-xs">
                {/* Empty leading offset */}
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
                  <span>എല്ലാ പരിപാടികളും കാണുക</span>
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
      {activeModalEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[#FAF7F0] rounded-3xl border border-[#E7DFD0] max-w-lg w-full shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="relative h-48 w-full flex-shrink-0 bg-neutral-900">
              <img
                src={activeModalEvent.imageUrl}
                alt={activeModalEvent.title}
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
                <span className="text-[10px] uppercase font-bold text-[#7A8880] block">{activeModalEvent.dateMonth}</span>
                <span className="text-base font-bold text-[#1B4D36] block">{activeModalEvent.dateDay}</span>
              </div>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto flex-1">
              <span className="text-[11px] font-bold text-[#1B4D36] uppercase tracking-wider bg-[#E0F1E7] px-2.5 py-0.5 rounded-full border border-[#BDE3CE]">
                {activeModalEvent.category}
              </span>

              <h2 className="text-xl font-bold font-malayalam-serif text-[#1B4D36] mt-2 mb-3">
                {activeModalEvent.title}
              </h2>

              <div className="space-y-2 text-xs text-[#5C6A64] mb-4 bg-white rounded-2xl p-4 border border-[#EAE4D7]">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-[#1B4D36]" />
                  <span className="font-semibold text-[#1A2420]">{activeModalEvent.fullDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#1B4D36]" />
                  <span>{activeModalEvent.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#1B4D36]" />
                  <span>{activeModalEvent.location}, {activeModalEvent.district}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#1B4D36]" />
                  <span>സംഘാടനം: {activeModalEvent.organizer}</span>
                </div>
              </div>

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
      )}

      <Footer />
      <BottomNav />
    </div>
  );
}
