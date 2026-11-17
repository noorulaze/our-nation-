"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { TanurNav } from "@/components/tanur/TanurNav";
import {
  Waves,
  Sun,
  ShieldAlert,
  TreePine,
  CheckCircle2,
  Sparkles,
  Info,
  MapPin,
  ArrowRight,
} from "lucide-react";

export default function TanurNaturePage() {
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
                "url('https://upload.wikimedia.org/wikipedia/commons/5/51/Tanur_beach%2C_Malappuram_%285%29.jpg')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#081B12] via-[#0E2C1E]/80 to-black/40" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8 sm:pb-10 text-white">
            <div className="flex items-center gap-2 text-xs font-medium text-amber-200/90 mb-2">
              <Link href="/tanur" className="hover:underline">
                താനൂർ
              </Link>
              <span>/</span>
              <span>പ്രകൃതിയും തീരദേശവും</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold text-amber-300 mb-2">
              <Waves className="w-3.5 h-3.5" />
              <span>കടലും കായലും കണ്ടൽക്കാടുകളും</span>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-malayalam-heading">
              താനൂരിന്റെ പ്രകൃതിയും തീരദേശവും
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-stone-200 font-malayalam-body max-w-2xl leading-relaxed">
              അറബിക്കടലിന്റെ തീരഭംഗി, പൂരപ്പുഴ അഴിമുഖം, കണ്ടൽ ജൈവവൈവിധ്യം, പരിസ്ഥിതി സംരക്ഷണ പ്രവർത്തനങ്ങൾ.
            </p>
          </div>
        </section>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12 space-y-10">
          {/* Ecology Narrative Card */}
          <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-9 shadow-card">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#B87A1E] font-malayalam-body">
              തീരദേശ ആവാസവ്യവസ്ഥ • Coastal Ecology
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-malayalam-serif text-[#1B4D36] mt-1 mb-4">
              പൂരപ്പുഴയും അറബിക്കടലും ഒന്നിക്കുന്ന തീരം
            </h2>
            <div className="space-y-3.5 text-xs sm:text-sm text-[#4A5752] font-malayalam-body leading-relaxed">
              <p>
                താനൂരിന്റെ പ്രകൃതിസൗന്ദര്യത്തിന്റെ പ്രധാന ആകർഷണം കടലും കായലും തമ്മിലുള്ള സവിശേഷമായ സംഗമമാണ്. കിഴക്കൻ മലനിരകളിൽ നിന്ന് ഉത്ഭവിച്ച് തീരത്തേക്ക് ഒഴുകിയെത്തുന്ന <strong>പൂരപ്പുഴ (Poorappuzha River)</strong> താനൂരിന്റെ വടക്കേ അതിർത്തിയായ ഒട്ടുംപുറം-തൂവൽതീരം ഭാഗത്തുവെച്ച് അറബിക്കടലിലേക്ക് ചേരുന്നു.
              </p>
              <p>
                ഈ അഴിമുഖ പ്രദേശം സമ്പന്നമായ കണ്ടൽക്കാടുകൾക്കും (Mangroves) തീരദേശ മത്സ്യങ്ങളുടെയും ചെമ്മീനുകളുടെയും പ്രജനന കേന്ദ്രങ്ങൾക്കും പേരുകേട്ടതാണ്. കടൽക്കാക്കകൾ, കൊക്കുകൾ, വാത്തകൾ തുടങ്ങി നിരവധി ദേശാടന പക്ഷികൾ വർഷംതോറും ഈ അഴിമുഖ തീരങ്ങളിൽ വിരുന്നെത്തുന്നു.
              </p>
            </div>
          </div>

          {/* Environmental Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 shadow-card space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#E8F2EC] flex items-center justify-center text-[#1B4D36]">
                <Waves className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-malayalam-serif text-[#1B4D36]">
                അറബിക്കടൽ തീരഭംഗി
              </h3>
              <p className="text-xs text-[#5C6A64] font-malayalam-body leading-relaxed">
                കിലോമീറ്ററുകളോളം നീളുന്ന താനൂർ ബീച്ചും ഒട്ടുംപുറം കടൽത്തീരവും പച്ചപ്പുനിറഞ്ഞ കാറ്റാടി മരങ്ങളും തെങ്ങിൻതോപ്പുകളും നിറഞ്ഞ മനോഹരമായ സായാഹ്ന കാഴ്ചയൊരുക്കുന്നു.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 shadow-card space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#E8F2EC] flex items-center justify-center text-[#1B4D36]">
                <TreePine className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-malayalam-serif text-[#1B4D36]">
                കണ്ടൽ വനവൽക്കരണം
              </h3>
              <p className="text-xs text-[#5C6A64] font-malayalam-body leading-relaxed">
                നഗരസഭയുടെയും സന്നദ്ധ സംഘടനകളുടെയും നേതൃത്വത്തിൽ അഴിമുഖ പ്രദേശങ്ങളിൽ തീരദേശ മണ്ണൊലിപ്പ് തടയുന്നതിനായി കണ്ടൽ തൈകൾ നട്ടുപിടിപ്പിക്കുന്ന പരിസ്ഥിതി പദ്ധതികൾ നടക്കുന്നു.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 shadow-card space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#E8F2EC] flex items-center justify-center text-[#1B4D36]">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-malayalam-serif text-[#1B4D36]">
                തീരദേശ സംരക്ഷണ മുൻകരുതലുകൾ
              </h3>
              <p className="text-xs text-[#5C6A64] font-malayalam-body leading-relaxed">
                മഴക്കാലങ്ങളിലെ പ്രക്ഷുബ്ധമായ കടൽക്ഷോഭവും അഴിമുഖങ്ങളിലെ ഒഴുക്കും കണക്കിലെടുത്ത് ഔദ്യോഗിക സുരക്ഷാ നിർദ്ദേശങ്ങളും പുലിമുട്ട് സംരക്ഷണ ഭിത്തികളും ഒരുക്കിയിട്ടുണ്ട്.
              </p>
            </div>
          </div>

          {/* Safety & Responsible Tourism Advisory */}
          <div className="p-6 sm:p-8 rounded-3xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-malayalam-body space-y-2">
            <div className="font-bold text-sm flex items-center gap-2 text-amber-950">
              <Info className="w-4 h-4 text-amber-800" />
              <span>സുരക്ഷാ മാർഗ്ഗനിർദ്ദേശങ്ങൾ (Responsible Tourism Advisory):</span>
            </div>
            <p className="leading-relaxed">
              തീരദേശവും അഴിമുഖവും സന്ദർശിക്കുന്നവർ ഔദ്യോഗിക സുരക്ഷാ നിർദ്ദേശങ്ങൾ കർശനമായി പാലിക്കുക. ശക്തമായ അടിയൊഴുക്കുള്ള സമയങ്ങളിൽ വെള്ളത്തിലിറങ്ങുന്നത് പൂർണ്ണമായും ഒഴിവാക്കുക. പ്ലാസ്റ്റിക് മാലിന്യങ്ങൾ തീരത്തോ കായലിലോ വലിച്ചെറിയാതെ പരിസ്ഥിതി ശുചിത്വം കാത്തുസൂക്ഷിക്കുക.
            </p>
          </div>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
