"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { TanurNav } from "@/components/tanur/TanurNav";
import { TANUR_INSTITUTIONS } from "@/lib/data/tanurData";
import {
  GraduationCap,
  BookOpen,
  Building,
  Phone,
  Globe,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function TanurEducationPage() {
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
              <span>വിദ്യാഭ്യാസവും വിജ്ഞാനവും</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold text-amber-300 mb-2">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>വിദ്യാഭ്യാസ സ്ഥാപനങ്ങൾ & ലൈബ്രറികൾ</span>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-malayalam-heading">
              വിദ്യാഭ്യാസവും വിജ്ഞാനവും
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-stone-200 font-malayalam-body max-w-2xl leading-relaxed">
              ഇസ്ലാഹുൽ ഉലൂം അറബിക് കോളേജ്, ദേവധാർ ഗവ. ഹയർ സെക്കൻഡറി സ്കൂൾ, സഞ്ചാര സാഹിത്യ ലൈബ്രറി.
            </p>
          </div>
        </section>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12 space-y-10">
          {/* Spotlight on Islahul Uloom Arabic College */}
          <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-9 shadow-card">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-[#E8F2EC] text-[#1B4D36] text-[11px] font-bold">
                ശതാബ്ദി തിളക്കത്തിൽ (1924–2024)
              </span>
              <span className="text-xs text-[#1B4D36] font-bold flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" />
                ഔദ്യോഗികമായി സ്ഥിരീകരിച്ച സ്ഥാപനം
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black font-malayalam-heading text-[#1B4D36] mb-1">
              ഇസ്ലാഹുൽ ഉലൂം അറബിക് കോളേജ് (Islahul Uloom Arabic College)
            </h2>
            <div className="text-xs text-[#7A8880] mb-4">
              താനൂർ ടൗൺ • അഫിലിയേഷൻ: ദാറുൽ ഹുദാ ഇസ്ലാമിക് യൂണിവേഴ്സിറ്റി
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm text-[#4A5752] font-malayalam-body leading-relaxed">
              <p>
                1924-ൽ പ്രമുഖ പണ്ഡിതനും നേതാവുമായിരുന്ന പാങ്ങിൽ അഹമ്മദ് കുട്ടി മുസ്ലിയാരുടെ നേതൃത്വത്തിൽ സ്ഥാപിതമായ ഇസ്ലാഹുൽ ഉലൂം അറബിക് കോളേജ്, മലബാറിലെ ആധുനിക മത-ഭാഷാ വിദ്യാഭ്യാസ രംഗത്തെ വിപ്ലവകരമായ നാഴികക്കല്ലാണ്. നൂറ്റാണ്ടുകൾ പഴക്കമുള്ള പള്ളി ദർസ് സംവിധാനത്തെ ആധുനിക സിലബസുകളോടെ പരിഷ്കരിച്ച് രൂപപ്പെടുത്തിയ ഈ കലാലയം ഇന്ന് ആയിരക്കണക്കിന് പണ്ഡിതന്മാർക്കും എഴുത്തുകാർക്കും ജന്മം നൽകിയ അക്കാദമിക കേന്ദ്രമാണ്.
              </p>
              <p>
                അറബി ഭാഷ, സാഹിത്യം, ഇസ്ലാമിക കർമ്മശാസ്ത്രം (ഫുഖ്ഹ്), ഹദീസ്, സാമൂഹിക ശാസ്ത്രം എന്നിവ സമന്വയിപ്പിച്ചുകൊണ്ടുള്ള ഉന്നത പഠന സൗകര്യങ്ങൾ ഇവിടെ ലഭ്യമാണ്. കോളേജിനോടനുബന്ധിച്ച് വിശാലമായ റഫറൻസ് ലൈബ്രറിയും പ്രവർത്തിക്കുന്നു.
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-[#F0EBE0] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-xs font-mono text-[#5C6A64]">
                <span>ഫോൺ: 0494 2440260</span>
                <span>•</span>
                <a
                  href="https://islahululoom.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#1B4D36] font-bold hover:underline flex items-center gap-1"
                >
                  <span>islahululoom.in</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <div className="text-xs text-[#1B4D36] font-bold">സ്ഥാപിതം: 1924 AD</div>
            </div>
          </div>

          {/* Directory of Institutions */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-malayalam-serif text-[#1B4D36] mb-6">
              താനൂരിലെ പ്രമുഖ വിദ്യാലയങ്ങളും വായനശാലകളും
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TANUR_INSTITUTIONS.map((inst) => (
                <div
                  key={inst.id}
                  className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-7 shadow-card flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#E8F2EC] text-[#1B4D36] text-[10px] font-bold uppercase">
                        {inst.type_ml}
                      </span>
                      <span className="text-[11px] font-mono text-[#7A8880]">
                        സ്ഥാപിതം: {inst.establishedYear}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold font-malayalam-serif text-[#1A2420] mb-1">
                      {inst.name_ml}
                    </h4>
                    <div className="text-xs text-[#7A8880] mb-3">{inst.name}</div>

                    <p className="text-xs text-[#5C6A64] font-malayalam-body leading-relaxed mb-4">
                      {inst.description_ml}
                    </p>

                    <div className="space-y-1.5 text-xs text-[#4A5752] font-malayalam-body">
                      <div className="font-bold text-[#1B4D36]">പ്രത്യേകതകൾ & സൗകര്യങ്ങൾ:</div>
                      {inst.coursesOrFacilities.map((c, i) => (
                        <div key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#1B4D36] shrink-0 mt-0.5" />
                          <span>{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#F0EBE0] flex items-center justify-between text-xs text-[#7A8880]">
                    <span className="truncate max-w-[180px]">{inst.location}</span>
                    {inst.phone && <span className="font-mono text-[#1B4D36] font-bold">{inst.phone}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
