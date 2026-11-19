"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { NewsNav } from "@/components/news/NewsNav";
import { useLanguage } from "@/lib/i18n/context";
import { newsroomStore } from "@/lib/data/newsroomStore";
import { 
  Flame, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  ShieldCheck, 
  ChevronRight,
  Radio,
  Share2
} from "lucide-react";

export default function BreakingNewsPage() {
  const { language } = useLanguage();
  const breakingList = newsroomStore.getBreakingNews();

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] pb-24">
      <Navbar />
      <NewsNav />

      {/* Header Hub */}
      <section className="bg-gradient-to-r from-rose-950 via-rose-900 to-[#194B35] text-white pt-8 pb-8 border-b border-rose-950 shadow-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-7 h-7 rounded-lg bg-rose-600 text-white flex items-center justify-center font-bold animate-pulse">
              <Flame className="w-4 h-4 fill-current" />
            </span>
            <span className="text-xs font-bold text-amber-300 uppercase tracking-widest">
              ലൈവ് ബ്രേക്കിംഗ് ന്യൂസ് ഡെസ്ക്
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-serif text-white leading-tight">
            {language === "ml" ? "ബ്രേക്കിംഗ് ന്യൂസ് & അടിയന്തിര മുന്നറിയിപ്പുകൾ" : "Breaking News & Emergency Advisories"}
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-2 max-w-2xl leading-relaxed">
            താനൂർ നഗരസഭയിലെയും മലപ്പുറം ജില്ലയിലെയും കാലാവസ്ഥാ മുന്നറിയിപ്പുകൾ, ദുരന്തനിവാരണ സന്ദേശങ്ങൾ, പ്രധാന ഭരണ തീരുമാനങ്ങൾ.
          </p>
        </div>
      </section>

      {/* Safeguard Banner */}
      <div className="bg-amber-50 border-b border-amber-200 py-3 px-4 text-xs text-amber-950">
        <div className="max-w-5xl mx-auto flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-800 shrink-0" />
          <span>
            <strong>വാസ്തുതാ പരിശോധനാ നയം:</strong> മരണസംഖ്യ, അപകടങ്ങൾ, പൊതു സുരക്ഷാ അടിയന്തരാവസ്ഥകൾ എന്നിവ ഒന്നിലധികം ഔദ്യോഗിക ഉറവിടങ്ങൾ സ്ഥിരീകരിച്ച ശേഷം മാത്രമേ കൺഫേംഡ് ബ്രേക്കിംഗ് ന്യൂസ് ആയി പ്രസിദ്ധീകരിക്കൂ.
          </span>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {breakingList.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#E8DCBF] p-10 text-center max-w-md mx-auto shadow-xs my-8">
            <div className="w-14 h-14 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto mb-3 text-neutral-400">
              <Flame className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-base text-[#194B35] font-serif mb-1">
              നിലവിൽ അടിയന്തിര മുന്നറിയിപ്പുകളില്ല
            </h3>
            <p className="text-xs text-neutral-500">
              പ്രധാനപ്പെട്ട സംഭവങ്ങളും ഔദ്യോഗിക അടിയന്തിര അറിയിപ്പുകളും ഉണ്ടാകുമ്പോൾ ഇവിടെ തത്സമയം ലഭ്യമാകും.
            </p>
          </div>
        ) : (
          breakingList.map((art) => (
            <div
              key={art.id}
              className="bg-white rounded-3xl border-2 border-rose-300 p-6 sm:p-7 shadow-md relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-rose-600 text-white font-bold text-[10px] uppercase px-3 py-1 rounded-bl-xl tracking-wider">
                {art.breaking_severity === "urgent" ? "അടിയന്തിരം (Urgent)" : "ഡെവലപ്പിംഗ് ന്യൂസ്"}
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-200">
                    {art.category_name_ml}
                  </span>
                  <span>•</span>
                  <span className="font-semibold text-neutral-600">{art.source_name}</span>
                  <span>•</span>
                  <span className="text-neutral-400">
                    {new Date(art.original_published_at).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>

                <Link href={`/news/${art.id}`}>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#194B35] font-serif leading-snug hover:text-rose-700 transition">
                    {language === "ml" ? art.title_ml : art.title}
                  </h2>
                </Link>

                <p className="text-xs sm:text-sm text-[#252A25] leading-relaxed">
                  {language === "ml" ? art.summary_ml : art.summary}
                </p>

                {/* Multi-source corroboration status badge */}
                <div className="p-3 rounded-2xl bg-[#FAF7F0] border border-[#DDD5C5] flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="font-semibold text-emerald-950">
                      സ്ഥിരീകരണം: <strong>{art.corroboration_count} സ്വതന്ത്ര ഉറവിടങ്ങൾ</strong> (KSDMA, PRD, AIR)
                    </span>
                  </div>

                  <span className="text-[11px] text-neutral-500">
                    ലൊക്കേഷൻ: <strong>{art.specific_locality || "താനൂർ തീരദേശം"}</strong>
                  </span>
                </div>

                {/* Live updates list if any */}
                {art.updates.length > 0 && (
                  <div className="pt-2 border-t border-neutral-100">
                    <h4 className="text-xs font-bold text-[#194B35] mb-2 font-serif">തത്സമയ വിവരങ്ങൾ (Live Timeline):</h4>
                    <div className="space-y-2">
                      {art.updates.map((upd) => (
                        <div key={upd.id} className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs">
                          <div className="flex items-center justify-between font-bold text-rose-800 mb-0.5">
                            <span>{upd.title_ml}</span>
                            <span className="text-[10px] text-neutral-400">
                              {new Date(upd.timestamp).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                            </span>
                          </div>
                          <p className="text-neutral-600">{upd.update_text_ml}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-3 flex items-center justify-between text-xs">
                  <a
                    href={art.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#8C5B0F] hover:underline inline-flex items-center gap-1"
                  >
                    <span>ഔദ്യോഗിക ഉത്തരവ് പരിശോധിക്കുക ({art.source_name})</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <Link
                    href={`/news/${art.id}`}
                    className="px-4 py-2 rounded-xl bg-[#194B35] text-white font-bold text-xs hover:bg-[#143E2C] transition inline-flex items-center gap-1"
                  >
                    <span>പൂർണ്ണ വാർത്ത</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
