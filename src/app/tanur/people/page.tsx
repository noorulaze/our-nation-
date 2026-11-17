"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { TanurNav } from "@/components/tanur/TanurNav";
import { TANUR_STORIES, TanurStory } from "@/lib/data/tanurData";
import {
  Users,
  ShieldCheck,
  Send,
  PenTool,
  CheckCircle2,
  Sparkles,
  Heart,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

export default function TanurPeoplePage() {
  const [stories, setStories] = useState<TanurStory[]>(TANUR_STORIES);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { key: "all", label: "എല്ലാ അനുഭവങ്ങളും (All Stories)" },
    { key: "fisherfolk", label: "തീരദേശ ജീവിതം (Fisherfolk)" },
    { key: "scholar", label: "വിജ്ഞാന നായകന്മാർ (Scholars)" },
    { key: "entrepreneur", label: "നാട്ടു സംരംഭകർ (Entrepreneurs)" },
  ];

  const filteredStories = stories.filter((s) => {
    if (selectedCategory === "all") return true;
    return s.category === selectedCategory;
  });

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
                "url('https://upload.wikimedia.org/wikipedia/commons/3/33/Tanur_beach%2C_Malappuram_%281%29.jpg')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#081B12] via-[#0E2C1E]/80 to-black/40" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8 sm:pb-10 text-white">
            <div className="flex items-center gap-2 text-xs font-medium text-amber-200/90 mb-2">
              <Link href="/tanur" className="hover:underline">
                താനൂർ
              </Link>
              <span>/</span>
              <span>ജനങ്ങൾ & കഥകൾ</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold text-amber-300 mb-2">
              <Users className="w-3.5 h-3.5" />
              <span>താനൂരിലെ യഥാർത്ഥ ജീവിതങ്ങൾ</span>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-malayalam-heading">
              മനുഷ്യരും അനുഭവങ്ങളും
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-stone-200 font-malayalam-body max-w-2xl leading-relaxed">
              കടലിൽ അന്നം തേടുന്ന മീൻപിടിത്തക്കാർ, അധ്യാപകർ, വ്യാപാരികൾ, പണ്ഡിതന്മാർ, യുവജന സന്നദ്ധ പ്രവർത്തകർ.
            </p>
          </div>
        </section>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12 space-y-10">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
            {categories.map((c) => (
              <button
                key={c.key}
                onClick={() => setSelectedCategory(c.key)}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-malayalam-heading transition whitespace-nowrap ${
                  selectedCategory === c.key
                    ? "bg-[#1B4D36] text-white shadow-sm"
                    : "bg-white text-[#5C6A64] hover:text-[#1A2420] border border-[#EDE6D8]"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Stories Showcase */}
          <div className="space-y-8">
            {filteredStories.map((story) => (
              <div
                key={story.id}
                className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-9 shadow-card space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#E8F2EC] text-[#1B4D36] text-[11px] font-bold">
                    {story.role}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-[#1B4D36] font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>സ്ഥിരീകരിച്ച നാട്ടുരേഖ</span>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold font-malayalam-serif text-[#1B4D36]">
                    {story.title_ml}
                  </h2>
                  <div className="text-xs text-[#7A8880] mt-0.5">{story.title}</div>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-[#4A5752] font-malayalam-body leading-relaxed">
                  <p className="font-semibold text-[#1A2420]">{story.excerpt_ml}</p>
                  <p>{story.fullStory_ml}</p>
                  <p className="text-xs text-[#7A8880] italic border-t border-[#F5F1E8] pt-3">
                    &ldquo;{story.fullStory}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F0EBE0] flex items-center justify-between text-xs text-[#7A8880]">
                  <span>വ്യക്തി / സമൂഹം: <strong className="text-[#1A2420]">{story.authorOrSubject}</strong></span>
                  <span className="font-mono text-[11px]">{story.source}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Callout to Share Memories */}
          <div className="bg-gradient-to-br from-[#1B4D36] to-[#0A2016] rounded-3xl p-8 sm:p-10 text-white shadow-card flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl">
              <h3 className="text-xl sm:text-2xl font-bold font-malayalam-serif mb-2">
                നിങ്ങളുടെ താനൂർ അനുഭവങ്ങളും ഓർമ്മകളും പങ്കുവെക്കാം
              </h3>
              <p className="text-xs sm:text-sm text-stone-200 font-malayalam-body leading-relaxed">
                നിങ്ങളുടെ കുടുംബത്തിന്റെ പഴയകാല താനൂർ ഓർമ്മകൾ, പ്രമുഖ വ്യക്തികളെക്കുറിച്ചുള്ള വിവരങ്ങൾ, അല്ലെങ്കിൽ വാർഡിലെ നേട്ടങ്ങൾ എന്നിവ ഞങ്ങളുമായി പങ്കുവെക്കൂ.
              </p>
            </div>
            <Link
              href="/tanur/contribute"
              className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-500 text-stone-900 font-bold text-xs sm:text-sm font-malayalam-heading transition shrink-0"
            >
              കഥകൾ സമർപ്പിക്കാം
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
