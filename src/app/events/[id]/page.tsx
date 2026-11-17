"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { KERALA_EVENTS_DATA } from "@/lib/data/keralaEventsData";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  ArrowLeft, 
  Share2, 
  CheckCircle2, 
  ExternalLink,
  Sparkles
} from "lucide-react";

export default function SingleEventPage() {
  const params = useParams();
  const eventId = params.id as string;
  const event = KERALA_EVENTS_DATA.find((e) => e.id === eventId) || KERALA_EVENTS_DATA[0];
  const [rsvpDone, setRsvpDone] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8">
        
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B4D36] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>എല്ലാ പരിപാടികളിലേക്കും മടങ്ങുക</span>
          </Link>
        </div>

        {/* Main Event Box */}
        <div className="bg-white rounded-3xl border border-[#EAE4D7] shadow-card overflow-hidden mb-12">
          
          <div className="h-72 sm:h-96 w-full relative bg-neutral-900">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-4 left-4 bg-[#1B4D36] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
              {event.category}
            </span>
          </div>

          <div className="p-6 sm:p-10">
            <h1 className="text-2xl sm:text-4xl font-bold font-malayalam-serif text-[#1B4D36] mb-4">
              {event.title}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 bg-[#FAF7F0] rounded-2xl p-4 sm:p-5 border border-[#EAE4D7] text-xs text-[#5C6A64]">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-5 h-5 text-[#1B4D36]" />
                <div>
                  <span className="font-bold text-[#1A2420] block">തീയതി</span>
                  <span>{event.fullDate}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-[#1B4D36]" />
                <div>
                  <span className="font-bold text-[#1A2420] block">സമയം</span>
                  <span>{event.time}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <MapPin className="w-5 h-5 text-[#1B4D36]" />
                <div>
                  <span className="font-bold text-[#1A2420] block">സ്ഥലം</span>
                  <span>{event.location}, {event.district}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Users className="w-5 h-5 text-[#1B4D36]" />
                <div>
                  <span className="font-bold text-[#1A2420] block">സംഘാടനം</span>
                  <span>{event.organizer}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <h3 className="font-bold font-malayalam-serif text-lg text-[#1A2420]">
                പരിപാടിയെക്കുറിച്ച്
              </h3>
              <p className="text-sm sm:text-base text-[#3E4D45] leading-relaxed font-malayalam-body">
                {event.description}
              </p>
            </div>

            {/* RSVP / Share Actions */}
            <div className="pt-6 border-t border-[#F3EFE6] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              {rsvpDone ? (
                <div className="px-5 py-3 rounded-2xl bg-[#1B4D36] text-white text-xs font-semibold flex items-center gap-2 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-amber-300" />
                  <span>നിങ്ങളുടെ പങ്കാളിത്തം ഉറപ്പിച്ചു!</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setRsvpDone(true)}
                  className="px-8 py-3 rounded-2xl bg-[#1B4D36] hover:bg-[#133A28] text-white text-xs sm:text-sm font-bold transition shadow-md active:scale-95 text-center"
                >
                  പങ്കെടുക്കാം (RSVP ചെയ്യുക)
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: event.title, text: event.description, url: window.location.href });
                  }
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#FAF7F0] border border-[#DDD5C5] text-xs font-bold text-[#1B4D36] hover:bg-[#F3EFE6] transition"
              >
                <Share2 className="w-4 h-4" />
                <span>സുഹൃത്തുക്കളുമായി പങ്കുവെക്കുക</span>
              </button>
            </div>
          </div>
        </div>

      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
