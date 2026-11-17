"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { store } from "@/lib/data/store";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  ArrowLeft, 
  Share2, 
  CheckCircle2, 
  ExternalLink,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Phone,
  Mail,
  Check
} from "lucide-react";

export default function SingleEventPage() {
  const params = useParams();
  const eventId = params?.id as string;
  const [rsvpDone, setRsvpDone] = useState(false);
  const [copied, setCopied] = useState(false);

  const allEvents = useMemo(() => store.getEvents(), []);

  // Lookup by ID or legacy slug matching
  const event = useMemo(() => {
    return (
      allEvents.find((e) => e.id === eventId) ||
      allEvents.find((e) => {
        const slug = (e.title_ml || e.title).toLowerCase().replace(/[^a-z0-9]/g, "-");
        return slug.includes(eventId) || eventId.includes(e.id.slice(0, 8));
      }) ||
      allEvents[0]
    );
  }, [allEvents, eventId]);

  const relatedEvents = useMemo(() => {
    if (!event) return [];
    return allEvents.filter((e) => e.id !== event.id).slice(0, 3);
  }, [allEvents, event]);

  const handleShare = async () => {
    if (!event) return;
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ 
          title: event.title_ml || event.title, 
          text: event.description, 
          url: window.location.href 
        });
      } catch (err) {
        // user cancelled
      }
    } else if (typeof navigator !== "undefined") {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const formatEventDate = (dateString?: string) => {
    if (!dateString) return { fullDate: "നവംബർ 2026", time: "രാവിലെ 09:30 മുതൽ" };
    const d = new Date(dateString);
    const mlMonths = ["ജനുവരി", "ഫെബ്രുവരി", "മാർച്ച്", "ഏപ്രിൽ", "മേയ്", "ജൂൺ", "ജൂലൈ", "ഓഗസ്റ്റ്", "സെപ്റ്റംബർ", "ഒക്ടോബർ", "നവംബർ", "ഡിസംബർ"];
    const mlMonth = mlMonths[d.getMonth()] || "നവംബർ";
    const day = d.getDate() || 20;
    const year = d.getFullYear() || 2026;
    return {
      fullDate: `${mlMonth} ${day}, ${year}`,
      time: "രാവിലെ 09:30 മുതൽ വൈകുന്നേരം വരെ",
    };
  };

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
        <Navbar />
        <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-16 text-center">
          <h1 className="text-2xl font-bold text-[#1B4D36] mb-4">പരിപാടി കണ്ടെത്താനായില്ല</h1>
          <p className="text-sm text-[#5C6E64] mb-6">ഈ പരിപാടി നിലവിലില്ല അല്ലെങ്കിൽ നീക്കം ചെയ്യപ്പെട്ടു.</p>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1B4D36] text-white text-sm font-semibold hover:bg-[#153D2A] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>പരിപാടികളിലേക്ക് മടങ്ങുക</span>
          </Link>
        </main>
        <Footer />
        <BottomNav />
      </div>
    );
  }

  const dateInfo = formatEventDate(event.start_date);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6">
        
        {/* Breadcrumbs */}
        <div className="mb-4">
          <Breadcrumbs
            items={[
              { label: "പരിപാടികൾ (Events)", href: "/events" },
              { label: event.title_ml || event.title },
            ]}
          />
        </div>

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
              src={event.image_url || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&auto=format&fit=crop&q=80"}
              alt={event.title_ml || event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
              <span className="bg-[#1B4D36] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                {event.category}
              </span>
              {event.is_verified && (
                <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Source</span>
                </span>
              )}
            </div>
            {event.image_license && (
              <span className="absolute bottom-2 right-3 text-[10px] text-white/80 bg-black/60 px-2 py-0.5 rounded-sm backdrop-blur-xs">
                Image: {event.image_license} {event.image_attribution ? `• ${event.image_attribution}` : ""}
              </span>
            )}
          </div>

          <div className="p-6 sm:p-10">
            <h1 className="text-2xl sm:text-4xl font-bold font-malayalam-serif text-[#1B4D36] mb-4">
              {event.title_ml || event.title}
            </h1>

            {/* Quick Details Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 bg-[#FAF7F0] rounded-2xl p-4 sm:p-5 border border-[#EAE4D7] text-xs text-[#5C6A64]">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-5 h-5 text-[#1B4D36]" />
                <div>
                  <span className="font-bold text-[#1A2420] block">തീയതി</span>
                  <span>{dateInfo.fullDate}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-[#1B4D36]" />
                <div>
                  <span className="font-bold text-[#1A2420] block">സമയം</span>
                  <span>{dateInfo.time}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <MapPin className="w-5 h-5 text-[#1B4D36]" />
                <div>
                  <span className="font-bold text-[#1A2420] block">സ്ഥലം</span>
                  <span>{event.location_name}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Users className="w-5 h-5 text-[#1B4D36]" />
                <div>
                  <span className="font-bold text-[#1A2420] block">സംഘാടനം</span>
                  <span>{event.organizer_name}</span>
                </div>
              </div>

              {event.contact_phone && (
                <div className="flex items-center gap-2.5">
                  <Phone className="w-5 h-5 text-[#1B4D36]" />
                  <div>
                    <span className="font-bold text-[#1A2420] block">ഫോൺ</span>
                    <span>{event.contact_phone}</span>
                  </div>
                </div>
              )}

              {event.verified_at && (
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-emerald-700" />
                  <div>
                    <span className="font-bold text-emerald-950 block">വിവര പരിശോധന</span>
                    <span className="text-emerald-800">{event.verified_at} ൽ പരിശോധിച്ചു</span>
                  </div>
                </div>
              )}
            </div>

            {/* Official Source Verification Callout */}
            {event.source_url && (
              <div className="mb-6 p-4 rounded-2xl bg-[#F4F9F5] border border-emerald-200/80 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-emerald-950">ഔദ്യോഗിക പ്രൈമറി വിവര സ്രോതസ്സ്</h4>
                    <p className="text-xs text-emerald-800 mt-0.5">
                      ഈ പരിപാടിയുടെ തീയതികളും വിവരങ്ങളും {event.source_name || "ഔദ്യോഗിക പോർട്ടൽ"} വിവരങ്ങളുമായി പരിശോധിച്ചുറപ്പുവരുത്തിയിട്ടുണ്ട്.
                    </p>
                  </div>
                </div>
                <a
                  href={event.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition flex-shrink-0"
                >
                  <span>ഔദ്യോഗിക പേജ്</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

            <div className="prose prose-stone max-w-none mb-8">
              <h3 className="text-lg font-bold font-malayalam-serif text-[#1B4D36] mb-2">വിവരണം</h3>
              <p className="text-sm sm:text-base text-[#3E4D45] leading-relaxed whitespace-pre-line font-malayalam-body">
                {event.description}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#EAE4D7]">
              {rsvpDone ? (
                <div className="px-6 py-3 rounded-2xl bg-[#1B4D36] text-white text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-300" />
                  <span>നിങ്ങൾ പങ്കാളിത്തം ഉറപ്പാക്കിയിരിക്കുന്നു!</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setRsvpDone(true)}
                  className="px-8 py-3 rounded-2xl bg-[#1B4D36] hover:bg-[#133A28] text-white text-xs font-bold transition shadow-md active:scale-95"
                >
                  പരിപാടിയിൽ പങ്കെടുക്കാം (RSVP)
                </button>
              )}

              <div className="flex items-center gap-2">
                {copied && (
                  <span className="text-xs text-[#1B4D36] font-semibold animate-in fade-in">
                    ലിങ്ക് കോപ്പി ചെയ്തു!
                  </span>
                )}
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FAF7F0] border border-[#DDD5C5] text-xs font-bold text-[#1B4D36] hover:bg-[#F3EFE6] transition active:scale-95"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                  <span>{copied ? "കോപ്പി ചെയ്തു" : "പങ്കുവെക്കുക"}</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Related Events */}
        {relatedEvents.length > 0 && (
          <div className="mb-12">
            <h3 className="text-xl font-bold font-malayalam-serif text-[#1B4D36] mb-4">
              മറ്റു പ്രധാന പരിപാടികൾ
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedEvents.map((rel) => {
                const relDate = formatEventDate(rel.start_date);
                return (
                  <Link
                    key={rel.id}
                    href={`/events/${rel.id}`}
                    className="bg-white rounded-2xl border border-[#EAE4D7] p-4 shadow-xs hover:border-[#1B4D36]/60 transition flex flex-col justify-between group"
                  >
                    <div className="h-32 rounded-xl overflow-hidden mb-3 bg-neutral-900">
                      <img 
                        src={rel.image_url || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=80"} 
                        alt={rel.title_ml || rel.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition" 
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[#1B4D36] bg-[#E0F1E7] px-2 py-0.5 rounded-full">
                        {rel.category}
                      </span>
                      <h4 className="font-bold text-xs sm:text-sm text-[#1A2420] mt-2 group-hover:text-[#1B4D36] transition line-clamp-2">
                        {rel.title_ml || rel.title}
                      </h4>
                    </div>
                    <div className="text-[10px] text-[#7A8880] mt-2 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#1B4D36]" /> {relDate.fullDate}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
