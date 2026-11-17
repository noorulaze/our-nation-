"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { TanurNav } from "@/components/tanur/TanurNav";
import { TANUR_BUSINESSES, TanurBusinessItem } from "@/lib/data/tanurData";
import {
  Briefcase,
  Fish,
  Anchor,
  Clock,
  MapPin,
  Phone,
  Search,
  ShieldCheck,
  Building,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function TanurEconomyPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { key: "all", label: "എല്ലാ മേഖലകളും (All)" },
    { key: "seafood", label: "മത്സ്യ വ്യാപാരം & കയറ്റുമതി (Seafood)" },
    { key: "service", label: "ഐസ് പ്ലാന്റ് & സർവീസുകൾ (Cold Storage)" },
    { key: "boat_net", label: "ബോട്ട് & വല നിർമ്മാണം (Marine Works)" },
    { key: "restaurant", label: "ഭക്ഷണശാലകൾ (Restaurants)" },
    { key: "retail", label: "കൊപ്ര & പരമ്പരാഗത വ്യാപാരം (Trade)" },
  ];

  const filteredBusinesses = TANUR_BUSINESSES.filter((b) => {
    const matchCategory = selectedCategory === "all" || b.category === selectedCategory;
    const matchSearch = (b.name + " " + b.name_ml + " " + b.description + " " + b.address)
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
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
                "url('https://upload.wikimedia.org/wikipedia/commons/3/31/A_view_of_tanur_harbour.jpg')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#081B12] via-[#0E2C1E]/80 to-black/40" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8 sm:pb-10 text-white">
            <div className="flex items-center gap-2 text-xs font-medium text-amber-200/90 mb-2">
              <Link href="/tanur" className="hover:underline">
                താനൂർ
              </Link>
              <span>/</span>
              <span>സമ്പദ്‌വ്യവസ്ഥ & വ്യാപാരം</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold text-amber-300 mb-2">
              <Briefcase className="w-3.5 h-3.5" />
              <span>മത്സ്യബന്ധനം, തുറമുഖ വാണിജ്യം, ചെറുകിട സംരംഭങ്ങൾ</span>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-malayalam-heading">
              താനൂരിന്റെ സമ്പദ്‌വ്യവസ്ഥയും വ്യാപാരവും
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-stone-200 font-malayalam-body max-w-2xl leading-relaxed">
              മത്സ്യബന്ധന ഹാർബർ, കൊപ്ര വ്യവസായ പൈതൃകം, ഐസ് പ്ലാന്റുകൾ, ചന്തകൾ, പ്രാദേശിക സംരംഭങ്ങൾ.
            </p>
          </div>
        </section>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12 space-y-10">
          {/* Economic Pillar Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 shadow-card space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-[#E8F2EC] flex items-center justify-center text-[#1B4D36]">
                <Anchor className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-malayalam-serif text-[#1B4D36]">
                മത്സ്യബന്ധന മേഖല
              </h3>
              <p className="text-xs text-[#5C6A64] font-malayalam-body leading-relaxed">
                ആധുനിക ഹാർബർ, പുലിമുട്ട്, നൂറുകണക്കിന് ബോട്ടുകളും വള്ളങ്ങളും, പതിനായിരത്തോളം വരുന്ന പ്രത്യക്ഷ-പരോക്ഷ തൊഴിലാളികൾ. താനൂരിന്റെ സാമ്പത്തിക ജീവനാഡി.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 shadow-card space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-[#E8F2EC] flex items-center justify-center text-[#1B4D36]">
                <Building className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-malayalam-serif text-[#1B4D36]">
                ശീതീകരണവും കയറ്റുമതിയും
              </h3>
              <p className="text-xs text-[#5C6A64] font-malayalam-body leading-relaxed">
                24 മണിക്കൂറും പ്രവർത്തിക്കുന്ന ഐസ് പ്ലാന്റുകൾ, ലേലപ്പുരകൾ, കേരളത്തിനകത്തേക്കും മറ്റ് ദക്ഷിണേന്ത്യൻ നഗരങ്ങളിലേക്കുമുള്ള റഫ്രിജറേറ്റഡ് ട്രക്ക് ശൃംഖല.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 shadow-card space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-[#E8F2EC] flex items-center justify-center text-[#1B4D36]">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-malayalam-serif text-[#1B4D36]">
                കൊപ്ര & ചെറുകിട വാണിജ്യം
              </h3>
              <p className="text-xs text-[#5C6A64] font-malayalam-body leading-relaxed">
                പഴയ ഫ്രഞ്ച് ചാപ്പകളിൽ നിന്ന് തുടങ്ങി ഇന്നും നിലനിൽക്കുന്ന കൊപ്ര-കയർ വ്യാപാരം, ടൗൺ ചന്തകൾ, ടെക്സ്റ്റൈൽസ്, തനതു ഹോട്ടൽ വിപണികൾ.
              </p>
            </div>
          </div>

          {/* Searchable Business Directory */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#B87A1E] font-malayalam-body">
                  വ്യാപാര ഡയറക്ടറി
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-malayalam-serif text-[#1B4D36] mt-0.5">
                  താനൂരിലെ സ്ഥിരീകരിച്ച വ്യാപാര സ്ഥാപനങ്ങൾ
                </h3>
              </div>
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-3 text-[#7A8880]" />
                <input
                  type="text"
                  placeholder="സ്ഥാപനത്തിന്റെ പേര് തിരയുക..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-[#DDD5C5] bg-white text-[#1A2420] focus:outline-none focus:ring-2 focus:ring-[#1B4D36]"
                />
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 mb-6">
              {categories.map((c) => (
                <button
                  key={c.key}
                  onClick={() => setSelectedCategory(c.key)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-malayalam-heading transition whitespace-nowrap ${
                    selectedCategory === c.key
                      ? "bg-[#1B4D36] text-white shadow-sm"
                      : "bg-white text-[#5C6A64] hover:text-[#1A2420] border border-[#EDE6D8]"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBusinesses.map((biz) => (
                <div
                  key={biz.id}
                  className="bg-white rounded-3xl border border-[#EDE6D8] p-6 shadow-card hover:border-[#1B4D36] transition flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#E8F2EC] text-[#1B4D36] text-[10px] font-bold">
                        {biz.category_ml}
                      </span>
                      {biz.verified && (
                        <span className="text-[11px] text-[#1B4D36] font-bold flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          പരിശോധിച്ചുറപ്പിച്ചത്
                        </span>
                      )}
                    </div>

                    <h4 className="text-base font-bold font-malayalam-serif text-[#1A2420]">
                      {biz.name_ml}
                    </h4>
                    <div className="text-xs text-[#7A8880] mb-2">{biz.name}</div>

                    <p className="text-xs text-[#5C6A64] font-malayalam-body leading-relaxed mb-3">
                      {biz.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#F0EBE0] space-y-1.5 text-xs text-[#7A8880]">
                    <div className="flex items-center gap-1.5 font-medium truncate">
                      <MapPin className="w-3.5 h-3.5 text-[#1B4D36] shrink-0" />
                      <span className="truncate">{biz.address}</span>
                    </div>
                    {biz.phone && (
                      <div className="flex items-center gap-1.5 font-mono font-bold text-[#1B4D36]">
                        <Phone className="w-3.5 h-3.5 shrink-0" />
                        <span>{biz.phone}</span>
                      </div>
                    )}
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
