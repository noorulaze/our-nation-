"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { TanurNav } from "@/components/tanur/TanurNav";
import { TANUR_HISTORY_TIMELINE, TANUR_SOURCES } from "@/lib/data/tanurData";
import {
  Landmark,
  Calendar,
  ShieldCheck,
  ExternalLink,
  ArrowLeft,
  Sparkles,
  BookOpen,
  Info,
  Clock,
} from "lucide-react";

export default function TanurHistoryPage() {
  const [selectedEra, setSelectedEra] = useState<string>("all");

  const eras = [
    { key: "all", label: "മുഴുവൻ കാലഘട്ടങ്ങൾ (All Eras)" },
    { key: "Vettathunadu Dynasty", label: "വെട്ടത്തുനാട് രാജവംശം" },
    { key: "Colonial", label: "പോർച്ചുഗീസ് & ബ്രിട്ടീഷ് കാലം" },
    { key: "Modern", label: "സ്വാതന്ത്ര്യാനന്തര കാലം" },
  ];

  const filteredTimeline = TANUR_HISTORY_TIMELINE.filter((item) => {
    if (selectedEra === "all") return true;
    if (selectedEra === "Vettathunadu Dynasty") return item.era.includes("Vettathunadu") || item.era.includes("Maritime");
    if (selectedEra === "Colonial") return item.era.includes("Portuguese") || item.era.includes("European") || item.era.includes("Railway") || item.era.includes("Freedom") || item.era.includes("Mysore");
    if (selectedEra === "Modern") return item.era.includes("Panchayat") || item.era.includes("Municipal") || item.era.includes("Literary") || item.era.includes("Islamic");
    return true;
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
                "url('https://upload.wikimedia.org/wikipedia/commons/6/67/Tanur%2C_Malappuram_district.jpg')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#081B12] via-[#0E2C1E]/80 to-black/40" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8 sm:pb-10 text-white">
            <div className="flex items-center gap-2 text-xs font-medium text-amber-200/90 mb-2">
              <Link href="/tanur" className="hover:underline">
                താനൂർ
              </Link>
              <span>/</span>
              <span>ചരിത്രവും പൈതൃകവും</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold text-amber-300 mb-2">
              <Landmark className="w-3.5 h-3.5" />
              <span>ചരിത്ര രേഖകൾ & ഗവേഷണം</span>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-malayalam-heading">
              താനൂരിന്റെ ചരിത്ര നാൾവഴികൾ
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-stone-200 font-malayalam-body max-w-2xl leading-relaxed">
              വെട്ടത്തുനാട് രാജ്യത്തിന്റെ തുറമുഖ തലസ്ഥാനം മുതൽ ആധുനിക നഗരസഭ വരെയുള്ള നൂറ്റാണ്ടുകളുടെ ചരിത്ര ശേഷിപ്പുകൾ.
            </p>
          </div>
        </section>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12">
          {/* Era Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 mb-8">
            {eras.map((era) => (
              <button
                key={era.key}
                onClick={() => setSelectedEra(era.key)}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-malayalam-heading transition whitespace-nowrap ${
                  selectedEra === era.key
                    ? "bg-[#1B4D36] text-white shadow-sm"
                    : "bg-white text-[#5C6A64] hover:text-[#1A2420] border border-[#EDE6D8]"
                }`}
              >
                {era.label}
              </button>
            ))}
          </div>

          {/* Historical Narrative Overview Card */}
          <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-9 shadow-card mb-10">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#B87A1E] font-malayalam-body">
              ചരിത്ര പശ്ചാത്തലം • Historical Overview
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-malayalam-serif text-[#1B4D36] mt-1 mb-4">
              വെട്ടത്തുനാടിന്റെ സുവർണ്ണ തുറമുഖം
            </h2>
            <div className="space-y-3.5 text-xs sm:text-sm text-[#4A5752] font-malayalam-body leading-relaxed">
              <p>
                മധ്യകാല കേരളത്തിൽ കോഴിക്കോട് സാമൂതിരിയുടെ ആധിപത്യത്തിന് സമാന്തരമായി സ്വയംഭരണാധികാരത്തോടെ നിലനിന്ന ഒരു സുപ്രധാന നാട്ടുരാജ്യമായിരുന്നു <strong>വെട്ടത്തുനാട് (താനൂർ സ്വരൂപം / പ്രകാശഭൂ)</strong>. ഇന്നത്തെ തിരൂർ, തിരൂരങ്ങാടി, പൊന്നാനി താലൂക്കുകളുടെ ഭാഗങ്ങളും, ചാലിയം വരെയുള്ള പ്രദേശങ്ങളും വെട്ടത്തുനാടിന്റെ അധീനതയിലായിരുന്നു. അതിന്റെ പ്രധാന തുറമുഖ തലസ്ഥാനമായിരുന്നു താനൂർ.
              </p>
              <p>
                അറബിക്കടലിലേക്ക് തുറന്നുകിടന്ന താനൂർ തീരത്തേക്ക് എട്ടാം നൂറ്റാണ്ട് മുതൽ തന്നെ അറബ് കച്ചവട കപ്പലുകൾ സുഗന്ധവ്യഞ്ജനങ്ങൾ തേടിയെത്തി. പിന്നീട് വാസ്കോഡ ഗാമയുടെ വരവോടെ പോർച്ചുഗീസുകാരുമായി സമ്പർക്കത്തിലായ ആദ്യകാല മലബാർ തുറമുഖങ്ങളിലൊന്നായി താനൂർ മാറി. 1546-ൽ വിശുദ്ധ ഫ്രാൻസിസ് സേവ്യറുടെ സന്ദർശനം ഇവിടെയുള്ള പുരാതന പൈതൃക കേന്ദ്രമായ കേരളാദിത്യപുരം ക്ഷേത്രവുമായി ബന്ധപ്പെട്ട് രേഖപ്പെടുത്തപ്പെട്ടിട്ടുണ്ട്.
              </p>
              <p>
                1861 മാർച്ച് 12-ന് തിരൂർ മുതൽ ബേപ്പൂർ വരെയുള്ള കേരളത്തിലെ പ്രഥമ റെയിൽവേ പാത ആരംഭിച്ചപ്പോൾ താനൂർ റെയിൽവേ സ്റ്റേഷൻ ഒരു നാഴികക്കല്ലായി. 1921-ലെ മലബാർ സ്വാതന്ത്ര്യസമരത്തിലും, 1924-ൽ പാങ്ങിൽ അഹമ്മദ് കുട്ടി മുസ്ലിയാർ സ്ഥാപിച്ച ഇസ്ലാഹുൽ ഉലൂം അറബിക് കോളേജിലൂടെ വിദ്യാഭ്യാസ രംഗത്തും താനൂർ നിർണ്ണായക പങ്കുവഹിച്ചു. 2015 നവംബർ 1-ന് നഗരസഭയായി മാറിയ താനൂർ ഇന്ന് പാരമ്പര്യത്തെയും പുരോഗതിയെയും ഒരേപോലെ ചേർത്തുപിടിക്കുന്നു.
              </p>
            </div>
          </div>

          {/* Chronological Timeline */}
          <div className="relative pl-6 sm:pl-8 border-l-2 border-[#1B4D36]/20 space-y-8 sm:space-y-10 my-10">
            {filteredTimeline.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Dot marker */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#1B4D36] border-4 border-[#FAF7F0] group-hover:scale-125 transition-transform" />

                <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-7 shadow-card hover:border-[#1B4D36] transition">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full bg-[#E8F2EC] text-[#1B4D36] text-xs font-bold font-mono">
                      {item.year}
                    </span>
                    <span className="text-[11px] font-bold text-[#B87A1E] uppercase tracking-wider font-malayalam-body">
                      {item.era}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold font-malayalam-serif text-[#1B4D36] mt-1 mb-2">
                    {item.title_ml}
                  </h3>
                  <div className="text-xs font-semibold text-[#7A8880] mb-3">
                    {item.title}
                  </div>

                  <p className="text-xs sm:text-sm text-[#4A5752] font-malayalam-body leading-relaxed mb-3">
                    {item.description_ml}
                  </p>
                  <p className="text-xs text-[#7A8880] leading-relaxed italic border-t border-[#F5F1E8] pt-3">
                    &ldquo;{item.description}&rdquo;
                  </p>

                  <div className="mt-4 flex items-center justify-between text-[11px] text-[#5C6A64] font-medium pt-2 border-t border-[#F5F1E8]">
                    <span className="flex items-center gap-1 text-[#1B4D36]">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      സ്ഥിരീകരിച്ച രേഖ (Verified Record)
                    </span>
                    <span className="text-stone-400 font-mono">ഉറവിടം: {item.sourceId}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sources and Historiographical Transparency */}
          <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-8 shadow-card mt-12">
            <h3 className="text-base font-bold font-malayalam-serif text-[#1B4D36] mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#B87A1E]" />
              <span>ചരിത്ര രേഖകളും ഗ്രന്ഥസൂചികയും (Historical References):</span>
            </h3>
            <ul className="space-y-2 text-xs text-[#5C6A64] font-malayalam-body">
              <li>• വില്യം ലോഗന്റെ &lsquo;മലബാർ മാന്വൽ&rsquo; (William Logan, Malabar Manual, 1887) - വെട്ടത്തുനാട്, താനൂർ തുറമുഖം.</li>
              <li>• താനൂർ നഗരസഭാ ചരിത്ര സംഗ്രഹം (Local Self Government Department, Kerala).</li>
              <li>• ഇസ്ലാഹുൽ ഉലൂം അറബിക് കോളേജ് ശതാബ്ദി സ്മരണിക (1924–2024).</li>
              <li>• ദക്ഷിണ റെയിൽവേ ചരിത്ര ആർക്കൈവ്സ്: തിരൂർ-ബേപ്പൂർ പാത ഉദ്ഘാടനം (1861).</li>
              <li>• കേരള ടൂറിസം ചരിത്ര ഗവേഷണ രേഖകൾ - കേരളാദിത്യപുരം ക്ഷേത്രം & ഫ്രാൻസിസ് സേവ്യർ സന്ദർശനം (1546).</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
