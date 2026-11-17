"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  CheckCircle2,
  ChevronDown,
  Building,
  Sparkles,
  ExternalLink,
  Globe,
  Share2,
} from "lucide-react";
import dynamic from "next/dynamic";

// Dynamic import for Leaflet map component to prevent SSR window issues
const CommunityMap = dynamic(
  () => import("@/components/map/CommunityMap").then((mod) => mod.CommunityMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-[280px] w-full rounded-2xl bg-[#EDE6D8] animate-pulse flex items-center justify-center text-xs text-[#5C6A64]">
        മാപ്പ് ലോഡ് ചെയ്യുന്നു... (Loading Kerala Map)
      </div>
    ),
  }
);

interface FaqItem {
  q: string;
  a: string;
}

const faqs: FaqItem[] = [
  {
    q: "എങ്ങനെയാണ് എന്റെ പ്രദേശത്തെ വാർത്തകൾ Nammude Naadu-ൽ പങ്കുവെക്കുക?",
    a: "നിങ്ങൾക്ക് സൗജന്യമായി അക്കൗണ്ട് സൃഷ്ടിച്ച് ലോഗിൻ ചെയ്ത ശേഷം 'വാർത്തകൾ' പേജിൽ നിന്നോ ഹോം പേജിലെ 'പുതിയ വാർത്ത പങ്കുവെക്കൂ' എന്ന ബട്ടണിലൂടെയോ സ്വന്തം പ്രദേശത്തെ വിശ്വസനീയമായ വാർത്തകളും ചിത്രങ്ങളും പങ്കുവെക്കാം. ഞങ്ങളുടെ മോഡറേറ്റർമാർ അത് പരിശോധിച്ച് പ്രസിദ്ധീകരിക്കുന്നതാണ്.",
  },
  {
    q: "പ്രാദേശിക വ്യാപാരങ്ങളും സേവനങ്ങളും ലിസ്റ്റ് ചെയ്യാൻ പണം നൽകേണ്ടതുണ്ടോ?",
    a: "ഇല്ല! കേരളത്തിലെ ചെറുകിട വ്യാപാരികൾ, പ്ലംബർമാർ, ഇലക്ട്രീഷ്യൻമാർ, ഓട്ടോ/ടാക്സി ഡ്രൈവർമാർ തുടങ്ങിയ പ്രാദേശിക സേവനദാതാക്കൾക്ക് തങ്ങളുടെ സേവനങ്ങൾ തികച്ചും സൗജന്യമായി പ്ലാറ്റ്‌ഫോമിൽ ലിസ്റ്റ് ചെയ്യാവുന്നതാണ്.",
  },
  {
    q: "'നാട് AI' അസിസ്റ്റന്റ് എങ്ങനെയാണ് ഉപയോഗിക്കുക?",
    a: "വെബ്‌സൈറ്റിന്റെ താഴെ വലതുവശത്തുള്ള 'നാട് AI' ബട്ടൺ ക്ലിക്ക് ചെയ്യുക. മലയാളത്തിലോ മംഗ്ലീഷിലോ ഇംഗ്ലീഷിലോ പ്രാദേശിക ബസ്സ് സമയം, ആശുപത്രി വിവരങ്ങൾ, സർക്കാർ ഓഫീസുകൾ, കാലാവസ്ഥ, അല്ലെങ്കിൽ പാരമ്പര്യ കലകളെക്കുറിച്ച് ചോദിക്കാം.",
  },
  {
    q: "സന്നദ്ധ പ്രവർത്തകനായി (Community Volunteer) എങ്ങനെ പങ്കാളിയാകാം?",
    a: "ഓരോ ജില്ലയിലും താലൂക്കിലും സന്നദ്ധ പ്രവർത്തകരുടെ കൂട്ടായ്മ നമുക്കുണ്ട്. ബന്ധപ്പെടാനുള്ള ഫോമിൽ 'പങ്കാളിത്തം' എന്ന് വിഷയം തിരഞ്ഞെടുത്ത് സന്ദേശം അയക്കുക, ഞങ്ങളുടെ ജില്ലാ കോർഡിനേറ്റർ നിങ്ങളെ നേരിട്ട് ബന്ധപ്പെടും.",
  },
];

const malappuramLocalities = [
  "താനൂർ നഗരസഭ (Tanur Municipality)",
  "തിരൂർ നഗരസഭ (Tirur Municipality)",
  "മലപ്പുറം മുനിസിപ്പാലിറ്റി (Malappuram Town)",
  "കോട്ടക്കൽ നഗരസഭ (Kottakkal)",
  "പൊന്നാനി നഗരസഭ (Ponnani)",
  "മഞ്ചേരി നഗരസഭ (Manjeri)",
  "പരപ്പനങ്ങാടി നഗരസഭ (Parappanangadi)",
  "കൊണ്ടോട്ടി നഗരസഭ (Kondotty)",
];

const samplePlaces = [
  {
    id: "tanur-munc-office",
    name: "താനൂർ നഗരസഭാ കാര്യാലയം (Tanur Municipality)",
    description: "താനൂർ നഗരസഭ കേന്ദ്ര ഓഫീസ്",
    location_name: "മുനിസിപ്പൽ ബിൽഡിംഗ്, താനൂർ",
    latitude: 10.9768,
    longitude: 75.8675,
    community_id: "tanur",
    category: "municipality",
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "malappuram-collectorate",
    name: "മലപ്പുറം ജില്ലാ കളക്ടറേറ്റ് (Malappuram Collectorate)",
    description: "ജില്ലാ ഭരണകൂടം & ഹെൽപ്പ് ഡെസ്ക്",
    location_name: "സിവിൽ സ്റ്റേഷൻ, മലപ്പുറം",
    latitude: 11.051,
    longitude: 76.0711,
    community_id: "malappuram",
    category: "collectorate",
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "tanur-harbour-office",
    name: "താനൂർ ഫിഷിംഗ് ഹാർബർ കാര്യാലയം",
    description: "തീരദേശ വികസന കേന്ദ്രം",
    location_name: "ഹാർബർ റോഡ്, വെസ്റ്റ് താനൂർ",
    latitude: 10.9802,
    longitude: 75.8541,
    community_id: "tanur",
    category: "harbour",
    is_active: true,
    created_at: new Date().toISOString(),
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    district: malappuramLocalities[0],
    category: "പൊതു അന്വേഷണം (General Inquiry)",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 900);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      district: malappuramLocalities[0],
      category: "പൊതു അന്വേഷണം (General Inquiry)",
      message: "",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
      <Navbar />

      <main className="flex-1 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
          <Breadcrumbs items={[{ label: "ബന്ധപ്പെടുക (Contact)" }]} />
        </div>

        {/* Hero Section matching Row 3, Col 2 in reference collage */}
        <section className="relative h-[280px] sm:h-[340px] md:h-[400px] overflow-hidden flex items-end">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=80')",
            }}
          />
          {/* Sunset warm green & golden gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A2016] via-[#1B4D36]/75 to-black/40" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8 sm:pb-12 text-white">
            <div className="flex items-center gap-2 text-xs font-medium text-amber-200/90 mb-2">
              <Link href="/" className="hover:underline">
                ഹോം
              </Link>
              <span>/</span>
              <span>ബന്ധപ്പെടുക</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-bold text-amber-300 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>തുറന്ന മനസ്സോടെ, നാടിനായി</span>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-malayalam-heading tracking-tight leading-tight">
              ബന്ധപ്പെടുക
            </h1>
            <p className="mt-2 text-xs sm:text-base text-stone-200 font-malayalam-body max-w-2xl leading-relaxed">
              നമ്മളുമായി ബന്ധപ്പെടൂ — നിങ്ങളുടെ നിർദ്ദേശങ്ങളും സംശയങ്ങളും കേരളത്തിന്റെ പുരോഗതിക്കായുള്ള പുത്തൻ ആശയങ്ങളും പങ്കുവെക്കാം.
            </p>
          </div>
        </section>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column (Contact Info & Kerala Heritage Motif) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Primary Contact Card */}
              <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-8 shadow-card relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#1B4D36]/5 rounded-bl-full pointer-events-none" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#B87A1E] font-malayalam-body">
                  സമ്പർക്ക വിവരങ്ങൾ
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-malayalam-serif text-[#1B4D36] mt-1 mb-6">
                  ഞങ്ങളെ നേരിട്ട് സമീപിക്കാം
                </h2>

                <div className="space-y-5">
                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-[#E8F2EC] flex items-center justify-center text-[#1B4D36] shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-[#5C6A64] font-medium">ഹെൽപ്പ്‌ലൈൻ ഫോൺ</div>
                      <a
                        href="tel:+919876543210"
                        className="text-base font-bold text-[#1A2420] hover:text-[#1B4D36] transition block"
                      >
                        +91 98765 43210
                      </a>
                      <div className="text-xs text-[#5C6A64]">0471 2345678 (തിരുവനന്തപുരം)</div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-[#E8F2EC] flex items-center justify-center text-[#1B4D36] shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-[#5C6A64] font-medium">ഇമെയിൽ വിലാസം</div>
                      <a
                        href="mailto:info@nammudenaadu.in"
                        className="text-sm sm:text-base font-bold text-[#1A2420] hover:text-[#1B4D36] transition block"
                      >
                        info@nammudenaadu.in
                      </a>
                      <div className="text-xs text-[#5C6A64]">support@nammudenaadu.in</div>
                    </div>
                  </div>

                  {/* Office Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-[#E8F2EC] flex items-center justify-center text-[#1B4D36] shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-[#5C6A64] font-medium">കേന്ദ്ര കാര്യാലയം</div>
                      <div className="text-xs sm:text-sm font-semibold text-[#1A2420] font-malayalam-body leading-relaxed mt-0.5">
                        നമ്മുടെ നാട് ഡിജിറ്റൽ ഹബ്ബ്, വികാസ് ഭവൻ പി.ഒ., തിരുവനന്തപുരം, കേരളം - 695033
                      </div>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-[#E8F2EC] flex items-center justify-center text-[#1B4D36] shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-[#5C6A64] font-medium">പ്രവർത്തന സമയം</div>
                      <div className="text-xs sm:text-sm font-semibold text-[#1A2420] font-malayalam-body">
                        തിങ്കൾ മുതൽ ശനി വരെ: 9:00 AM – 6:00 PM
                      </div>
                      <div className="text-[11px] text-[#7A8880]">ഞായറാഴ്ച പൊതു അവധി</div>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Chat Button */}
                <div className="mt-8 pt-6 border-t border-[#F0EBE0]">
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm transition shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>വാട്‌സ്ആപ്പിൽ സംസാരിക്കാം (WhatsApp Chat)</span>
                  </a>
                </div>
              </div>

              {/* Traditional Kerala Motif Card */}
              <div className="bg-gradient-to-br from-[#1B4D36] to-[#0D2E1F] rounded-3xl p-6 sm:p-7 text-white shadow-card relative overflow-hidden">
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-[11px] font-bold mb-3">
                    <span>നമ്മുടെ കൂട്ടായ്മ</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold font-malayalam-serif mb-2">
                    നാടിന്റെ വികസനം, ജനങ്ങളുടെ പങ്കാളിത്തത്തിലൂടെ
                  </h3>
                  <p className="text-xs text-stone-200 font-malayalam-body leading-relaxed mb-4">
                    താനൂർ നഗരസഭയിലെ 44 വാർഡുകളിലെയും മലപ്പുറം ജില്ലയിലെയും സജീവമായ സന്നദ്ധ പ്രവർത്തകരുമായി ചേർന്നാണ് നമ്മുടെ നാട് പ്രവർത്തിക്കുന്നത്.
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-center pt-2">
                    <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                      <div className="text-lg font-black text-amber-300 font-malayalam-heading">44</div>
                      <div className="text-[10px] text-stone-300">താനൂർ വാർഡുകൾ</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                      <div className="text-lg font-black text-amber-300 font-malayalam-heading">24/7</div>
                      <div className="text-[10px] text-stone-300">നാട് AI സഹായം</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tanur & Malappuram Helplines Directory */}
              <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 shadow-card">
                <h3 className="text-sm font-bold font-malayalam-serif text-[#1B4D36] mb-3 flex items-center gap-2">
                  <Building className="w-4 h-4 text-[#B87A1E]" />
                  <span>താനൂർ & മലപ്പുറം സഹായ കേന്ദ്രങ്ങൾ</span>
                </h3>
                <div className="space-y-2.5 text-xs text-[#5C6A64]">
                  <div className="flex justify-between items-center py-1.5 border-b border-[#F5F1E8]">
                    <span className="font-medium text-[#1A2420]">താനൂർ നഗരസഭാ കാര്യാലയം</span>
                    <span className="font-mono text-[#1B4D36] font-bold">0494-2582233</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-[#F5F1E8]">
                    <span className="font-medium text-[#1A2420]">മലപ്പുറം ജില്ലാ കളക്ടറേറ്റ് ഹെൽപ്പ്‌ലൈൻ</span>
                    <span className="font-mono text-[#1B4D36] font-bold">0483-2734355</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-[#F5F1E8]">
                    <span className="font-medium text-[#1A2420]">താനൂർ പോലീസ് സ്റ്റേഷൻ</span>
                    <span className="font-mono text-[#1B4D36] font-bold">0494-2582225</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5">
                    <span className="font-medium text-[#1A2420]">താനൂർ താലൂക്ക് ആശുപത്രി / CHC</span>
                    <span className="font-mono text-[#1B4D36] font-bold">0494-2582240</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (Contact Form & Map & FAQ) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Contact Form Card */}
              <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-8 shadow-card">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#B87A1E] font-malayalam-body">
                  സന്ദേശം അയക്കൂ
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-malayalam-serif text-[#1B4D36] mt-1 mb-2">
                  നിങ്ങളുടെ അഭിപ്രായങ്ങളും സംശയങ്ങളും പങ്കുവെക്കാം
                </h2>
                <p className="text-xs text-[#5C6A64] font-malayalam-body mb-6">
                  താഴെ പറയുന്ന വിവരങ്ങൾ പൂരിപ്പിച്ച് അയക്കുക. ഞങ്ങളുടെ കോർഡിനേഷൻ ടീം 24 മണിക്കൂറിനകം പ്രതികരിക്കും.
                </p>

                {submitted ? (
                  <div className="p-8 rounded-2xl bg-[#E8F2EC] border border-[#C5DEC8] text-center space-y-3">
                    <div className="w-14 h-14 rounded-full bg-[#1B4D36] text-white flex items-center justify-center mx-auto shadow-md">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1B4D36] font-malayalam-serif">
                      നന്ദി! നിങ്ങളുടെ സന്ദേശം ലഭിച്ചു
                    </h3>
                    <p className="text-xs sm:text-sm text-[#3A4E45] font-malayalam-body max-w-md mx-auto">
                      നിങ്ങൾ നൽകിയ വിവരങ്ങൾ പരിശോധിച്ച ശേഷം ഞങ്ങളുടെ പ്രതിനിധി ഉടൻ തന്നെ ഇമെയിൽ അല്ലെങ്കിൽ ഫോൺ മുഖേന ബന്ധപ്പെടും.
                    </p>
                    <button
                      onClick={handleReset}
                      className="mt-4 px-6 py-2.5 rounded-xl bg-[#1B4D36] text-white text-xs font-bold hover:bg-[#133A28] transition"
                    >
                      മറ്റൊരു സന്ദേശം അയക്കുക
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-bold text-[#1A2420] mb-1.5 font-malayalam-body">
                          പേര് (Full Name) *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="നിങ്ങളുടെ പേര് നൽകുക"
                          className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-none focus:ring-2 focus:ring-[#1B4D36]"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs font-bold text-[#1A2420] mb-1.5 font-malayalam-body">
                          ഇമെയിൽ (Email Address) *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@example.com"
                          className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-none focus:ring-2 focus:ring-[#1B4D36]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Phone */}
                      <div>
                        <label className="block text-xs font-bold text-[#1A2420] mb-1.5 font-malayalam-body">
                          ഫോൺ നമ്പർ (Mobile Number)
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-none focus:ring-2 focus:ring-[#1B4D36]"
                        />
                      </div>

                      {/* Locality Selection */}
                      <div>
                        <label className="block text-xs font-bold text-[#1A2420] mb-1.5 font-malayalam-body">
                          പ്രദേശം / തദ്ദേശ സ്ഥാപനം (Locality / Municipality)
                        </label>
                        <select
                          value={formData.district}
                          onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                          className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-none focus:ring-2 focus:ring-[#1B4D36]"
                        >
                          {malappuramLocalities.map((d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Subject / Category */}
                    <div>
                      <label className="block text-xs font-bold text-[#1A2420] mb-1.5 font-malayalam-body">
                        സന്ദേശ വിഭാഗം (Subject / Topic)
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-none focus:ring-2 focus:ring-[#1B4D36]"
                      >
                        <option value="പൊതു അന്വേഷണം (General Inquiry)">പൊതു അന്വേഷണം (General Inquiry)</option>
                        <option value="വാർത്തകൾ പങ്കുവെക്കാൻ (Share Local News)">വാർത്തകൾ പങ്കുവെക്കാൻ (Share Local News)</option>
                        <option value="ബിസിനസ്സ് ലിസ്റ്റിംഗ് (Business Listing)">ബിസിനസ്സ് ലിസ്റ്റിംഗ് (Business Listing)</option>
                        <option value="സാങ്കേതിക സഹായം (Technical Support)">സാങ്കേതിക സഹായം (Technical Support)</option>
                        <option value="പങ്കാളിത്തം / സന്നദ്ധപ്രവർത്തനം (Volunteering)">പങ്കാളിത്തം / സന്നദ്ധപ്രവർത്തനം (Volunteering)</option>
                        <option value="പരാതി / തിരുത്തലുകൾ (Feedback & Grievance)">പരാതി / തിരുത്തലുകൾ (Feedback & Grievance)</option>
                      </select>
                    </div>

                    {/* Message Area */}
                    <div>
                      <label className="block text-xs font-bold text-[#1A2420] mb-1.5 font-malayalam-body">
                        സന്ദേശം (Your Message) *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="നിങ്ങളുടെ സന്ദേശം വിശദമായി ഇവിടെ രേഖപ്പെടുത്തുക..."
                        className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-none focus:ring-2 focus:ring-[#1B4D36] resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl bg-[#1B4D36] hover:bg-[#133A28] disabled:opacity-60 text-white font-bold text-xs sm:text-sm transition active:scale-95 shadow-md flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? "സന്ദേശം അയക്കുന്നു..." : "സന്ദേശം അയക്കുക"}</span>
                    </button>
                  </form>
                )}
              </div>

              {/* Map Card */}
              <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-7 shadow-card">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold font-malayalam-serif text-[#1B4D36]">
                      കേരള മാപ്പ് & സേവന കേന്ദ്രങ്ങൾ
                    </h3>
                    <p className="text-xs text-[#5C6A64] font-malayalam-body">
                      നമ്മുടെ നാടിന്റെ പ്രധാന വിവര കേന്ദ്രങ്ങൾ മാപ്പിൽ കാണാം
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F2EC] text-[#1B4D36] text-[11px] font-bold">
                    <Globe className="w-3.5 h-3.5" />
                    <span>OpenStreetMap • Kerala</span>
                  </div>
                </div>

                {/* Leaflet Dynamic Map */}
                <CommunityMap
                  centerLat={10.0159}
                  centerLng={76.3419}
                  zoom={7}
                  places={samplePlaces}
                  className="h-[280px] w-full rounded-2xl border border-[#EDE6D8]"
                />
              </div>

              {/* Frequently Asked Questions Accordion */}
              <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-8 shadow-card">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#B87A1E] font-malayalam-body">
                  സഹായ കേന്ദ്രം
                </span>
                <h3 className="text-xl font-bold font-malayalam-serif text-[#1B4D36] mt-1 mb-4">
                  സാധാരണയായി ചോദിക്കുന്ന ചോദ്യങ്ങൾ (FAQs)
                </h3>

                <div className="space-y-3">
                  {faqs.map((faq, idx) => {
                    const isOpen = openFaq === idx;
                    return (
                      <div
                        key={idx}
                        className="rounded-2xl border border-[#EDE6D8] bg-[#FAF7F0] overflow-hidden transition"
                      >
                        <button
                          type="button"
                          onClick={() => setOpenFaq(isOpen ? null : idx)}
                          className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-[#1A2420] font-malayalam-heading hover:text-[#1B4D36]"
                        >
                          <span>{faq.q}</span>
                          <ChevronDown
                            className={`w-4 h-4 text-[#7A8880] shrink-0 transition-transform duration-200 ${
                              isOpen ? "rotate-180 text-[#1B4D36]" : ""
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-4 text-xs text-[#5C6A64] font-malayalam-body leading-relaxed border-t border-[#EDE6D8]/60 pt-3">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
