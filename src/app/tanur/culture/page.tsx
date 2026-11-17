"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { TanurNav } from "@/components/tanur/TanurNav";
import { TANUR_CULTURE_ITEMS } from "@/lib/data/tanurData";
import {
  Palette,
  Music,
  Utensils,
  BookOpen,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building,
} from "lucide-react";

export default function TanurCulturePage() {
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
                "url('https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#081B12] via-[#0E2C1E]/80 to-black/40" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8 sm:pb-10 text-white">
            <div className="flex items-center gap-2 text-xs font-medium text-amber-200/90 mb-2">
              <Link href="/tanur" className="hover:underline">
                താനൂർ
              </Link>
              <span>/</span>
              <span>സംസ്കാരവും പാരമ്പര്യവും</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold text-amber-300 mb-2">
              <Palette className="w-3.5 h-3.5" />
              <span>പൈതൃക കലകൾ, സംഗീതം, തീരദേശ രുചികൾ</span>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-malayalam-heading">
              താനൂരിന്റെ സാംസ്കാരിക തനിമ
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-stone-200 font-malayalam-body max-w-2xl leading-relaxed">
              മാപ്പിളപ്പാട്ടുകൾ, ദഫ്മുട്ട്, ക്ഷേത്രോത്സവങ്ങൾ, വായനശാലാ പ്രസ്ഥാനം, തനതു മലബാർ കടലോര രുചികൾ.
            </p>
          </div>
        </section>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12 space-y-10">
          {/* Introduction Card */}
          <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-9 shadow-card">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#B87A1E] font-malayalam-body">
              സാംസ്കാരിക സമന്വയം
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-malayalam-serif text-[#1B4D36] mt-1 mb-3">
              കടലോരവും കാവും പള്ളിയും ചേർന്ന പൈതൃകം
            </h2>
            <p className="text-xs sm:text-sm text-[#4A5752] font-malayalam-body leading-relaxed">
              താനൂരിന്റെ സാംസ്കാരിക ജീവിതം വൈവിധ്യമാർന്ന കൂട്ടായ്മകളുടെ സംഗമമാണ്. ഒരുവശത്ത് നൂറ്റാണ്ടുകൾ പഴക്കമുള്ള മാപ്പിളപ്പാട്ട് ഗാനശാഖയും മൗലിദ് പാരമ്പര്യവും ദഫ്മുട്ടും സജീവമായി നിലനിൽക്കുമ്പോൾ, മറുവശത്ത് കേരളാദിത്യപുരത്തെയും ശോഭാപറമ്പിലെയും ക്ഷേത്രോത്സവങ്ങളും പാണ്ടിമേളവും നാടിന്റെ സാംസ്കാരിക ഉണർവ്വായി മാറുന്നു. കൂടാതെ, മലബാറിലെ സഞ്ചാര സാഹിത്യ ലൈബ്രറി പ്രസ്ഥാനത്തിലൂടെ അറിവിന്റെ വിശാല ജാലകങ്ങൾ ഇവിടെ തുറക്കപ്പെടുന്നു.
            </p>
          </div>

          {/* Cultural Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TANUR_CULTURE_ITEMS.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-[#EDE6D8] overflow-hidden shadow-card flex flex-col justify-between"
              >
                <div className="p-6 sm:p-8 space-y-3">
                  <div className="inline-block px-3 py-1 rounded-full bg-[#E8F2EC] text-[#1B4D36] text-[11px] font-bold">
                    {item.category_ml}
                  </div>
                  <h3 className="text-xl font-bold font-malayalam-serif text-[#1B4D36]">
                    {item.title_ml}
                  </h3>
                  <div className="text-xs text-[#7A8880] font-medium">{item.title}</div>
                  <p className="text-xs sm:text-sm text-[#4A5752] font-malayalam-body leading-relaxed">
                    {item.description_ml}
                  </p>
                </div>

                <div className="p-6 pt-0">
                  <div className="p-3.5 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] text-xs text-[#2D5A43] font-medium font-malayalam-body leading-relaxed">
                    <span className="font-bold text-[#1B4D36]">പ്രാധാന്യം: </span>
                    {item.significance}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Authentic Coastal Gastronomy Showcase */}
          <div className="bg-gradient-to-br from-[#1B4D36] to-[#0A2016] rounded-3xl p-6 sm:p-10 text-white shadow-card">
            <div className="max-w-2xl mb-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                രുചിവൈഭവം • Coastal Delicacies
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-malayalam-heading mt-1">
                താനൂർ കടൽരുചികളുടെ കലവറ
              </h3>
              <p className="text-xs sm:text-sm text-stone-200 font-malayalam-body mt-2 leading-relaxed">
                ഹാർബറിൽ നിന്നും അപ്പപ്പോൾ കിട്ടുന്ന പുത്തൻ മീനുകൾ കൊണ്ടുണ്ടാക്കുന്ന വിഭവങ്ങൾ താനൂരിന്റെ ഓരോ ചായപ്പീടികകളിലും ഹോട്ടലുകളിലും സവിശേഷമായ സ്വാദൊരുക്കുന്നു.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15">
                <div className="font-bold text-amber-300 text-sm font-malayalam-heading">മീൻ മുളകിട്ടത്</div>
                <div className="text-[11px] text-stone-300 mt-1">അയില, ചാള, ആവോലി</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15">
                <div className="font-bold text-amber-300 text-sm font-malayalam-heading">അരിപ്പത്തിരി & നെയ്പ്പത്തിരി</div>
                <div className="text-[11px] text-stone-300 mt-1">തനതു മലബാർ പ്രാതൽ</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15">
                <div className="font-bold text-amber-300 text-sm font-malayalam-heading">കല്ലുമ്മക്കായ റോസ്റ്റ്</div>
                <div className="text-[11px] text-stone-300 mt-1">തീരദേശ സ്പെഷ്യൽ</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15">
                <div className="font-bold text-amber-300 text-sm font-malayalam-heading">ചട്ടിപ്പത്തിരി & ഉന്നക്കായ</div>
                <div className="text-[11px] text-stone-300 mt-1">നാലുമണി പലഹാരങ്ങൾ</div>
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
