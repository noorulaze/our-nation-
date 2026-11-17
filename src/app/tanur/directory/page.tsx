"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { TanurNav } from "@/components/tanur/TanurNav";
import { TANUR_PUBLIC_SERVICES, TanurPublicService } from "@/lib/data/tanurData";
import {
  Building2,
  Phone,
  PhoneCall,
  Clock,
  MapPin,
  ExternalLink,
  ShieldAlert,
  Search,
  Filter,
  Flame,
  ShieldCheck,
  Ambulance,
  Zap,
  Train,
  Mail,
  HelpCircle,
  Sparkles,
} from "lucide-react";

type DirectoryCategory = "all" | "emergency" | "civic" | "utility" | "transport";

export default function TanurDirectoryPage() {
  const [selectedCategory, setSelectedCategory] = useState<DirectoryCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filterService = (srv: TanurPublicService) => {
    const matchesSearch =
      srv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.name_ml.includes(searchQuery) ||
      srv.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.phone.includes(searchQuery);

    if (!matchesSearch) return false;

    if (selectedCategory === "all") return true;
    if (selectedCategory === "emergency") {
      return srv.category === "police" || srv.category === "fire" || srv.category === "health";
    }
    if (selectedCategory === "civic") {
      return srv.category === "municipality" || srv.category === "revenue";
    }
    if (selectedCategory === "utility") {
      return srv.category === "utility";
    }
    if (selectedCategory === "transport") {
      return srv.category === "transport";
    }
    return true;
  };

  const filteredServices = TANUR_PUBLIC_SERVICES.filter(filterService);

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
              <span>പൊതുസേവനങ്ങൾ</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold text-amber-300 mb-2">
              <Building2 className="w-3.5 h-3.5" />
              <span>പൗരസേവന ഡയറക്ടറി • Civic & Emergency Directory</span>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-malayalam-heading">
              താനൂർ പൊതുസേവന ഡയറക്ടറി
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-stone-200 font-malayalam-body max-w-2xl leading-relaxed">
              താനൂർ നഗരസഭ, പോലീസ്, അഗ്നിശമന സേന, ആശുപത്രി, കെ.എസ്.ഇ.ബി, റെയിൽവേ തുടങ്ങിയ ഔദ്യോഗിക കാര്യാലയങ്ങളുടെ ഫോൺ നമ്പറുകളും വിലാസങ്ങളും.
            </p>
          </div>
        </section>

        {/* Emergency Quick-Dial Strip */}
        <div className="bg-[#1B4D36] text-white py-4 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-bold font-malayalam-heading uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4 animate-bounce" />
                <span>അടിയന്തര ഹെൽപ്പ്‌ലൈൻ നമ്പറുകൾ (24 Hours Emergency):</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:flex lg:flex-wrap items-center gap-2.5 w-full md:w-auto">
                <a
                  href="tel:112"
                  className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition shadow-xs"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>പോലീസ്: 112 / 100</span>
                </a>
                <a
                  href="tel:101"
                  className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition shadow-xs"
                >
                  <Flame className="w-3.5 h-3.5" />
                  <span>ഫയർഫോഴ്സ്: 101</span>
                </a>
                <a
                  href="tel:108"
                  className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition shadow-xs"
                >
                  <Ambulance className="w-3.5 h-3.5" />
                  <span>ആംബുലൻസ്: 108</span>
                </a>
                <a
                  href="tel:1912"
                  className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition shadow-xs"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>കെ.എസ്.ഇ.ബി: 1912</span>
                </a>
                <a
                  href="tel:139"
                  className="col-span-2 sm:col-span-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition shadow-xs"
                >
                  <Train className="w-3.5 h-3.5" />
                  <span>റെയിൽവേ: 139</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Category Filter */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A8680]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ഓഫീസിന്റെ പേരോ ഫോൺ നമ്പറോ തിരയുക..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-[#EDE6D8] text-xs font-malayalam-body text-[#1A2420] placeholder-[#7A8680] focus:outline-none focus:ring-2 focus:ring-[#1B4D36]"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: "all", label: "എല്ലാം (All)" },
                { id: "emergency", label: "അടിയന്തര സേവനങ്ങൾ (Emergency)" },
                { id: "civic", label: "നഗരസഭ & റവന്യൂ (Civic)" },
                { id: "utility", label: "യൂട്ടിലിറ്റി (KSEB, Post)" },
                { id: "transport", label: "റെയിൽവേ & യാത്ര (Transport)" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as DirectoryCategory)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold font-malayalam-body transition ${
                    selectedCategory === cat.id
                      ? "bg-[#1B4D36] text-white shadow-sm"
                      : "bg-white text-[#5C6A64] hover:text-[#1A2420] border border-[#EDE6D8]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Directory Cards Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((srv) => (
              <div
                key={srv.id}
                className="bg-white rounded-3xl border border-[#EDE6D8] p-6 shadow-card hover:shadow-lg transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-1 rounded-full bg-[#E8F2EC] text-[11px] font-bold text-[#1B4D36] font-malayalam-heading">
                      {srv.category_ml}
                    </span>
                    {srv.emergencyNumber && (
                      <span className="px-2 py-0.5 rounded-md bg-red-100 text-[10px] font-bold text-red-700">
                        അടിയന്തിരം: {srv.emergencyNumber}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold font-malayalam-serif text-[#1B4D36] mt-1">
                    {srv.name_ml}
                  </h3>
                  <div className="text-xs text-[#5C6A64] font-medium mb-3">
                    {srv.name}
                  </div>

                  <div className="space-y-2 text-xs text-[#4A5752] font-malayalam-body">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#B87A1E] shrink-0 mt-0.5" />
                      <span>{srv.address}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#5C6A64] shrink-0 mt-0.5" />
                      <span>{srv.workingHours}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-[#F0EAE1] flex items-center justify-between gap-2">
                  <a
                    href={`tel:${srv.phone.replace(/[^0-9]/g, "")}`}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#1B4D36] hover:bg-[#133827] text-white text-xs font-bold transition shadow-xs"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>{srv.phone}</span>
                  </a>

                  {srv.officialLink && (
                    <a
                      href={srv.officialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-[#FAF7F0] hover:bg-[#EFE9DC] text-[#1B4D36] border border-[#EDE6D8] transition"
                      title="ഔദ്യോഗിക പോർട്ടൽ സന്ദർശിക്കുക"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl border border-[#EDE6D8]">
              <HelpCircle className="w-12 h-12 text-[#9BA8A1] mx-auto mb-3" />
              <h3 className="text-lg font-bold font-malayalam-heading text-[#1B4D36]">
                സേവനങ്ങൾ ഒന്നും കണ്ടെത്തിയില്ല
              </h3>
              <p className="text-xs text-[#5C6A64] mt-1 font-malayalam-body">
                തിരയൽ പദങ്ങൾ മാറ്റുകയോ വിഭാഗം പുനഃക്രമീകരിക്കുകയോ ചെയ്യുക.
              </p>
            </div>
          )}
        </div>

        {/* Municipality Administrative Information */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="bg-[#FAF0E6]/80 border border-[#E3D1BE] rounded-3xl p-6 sm:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#B87A1E] font-malayalam-body">
                  തദ്ദേശഭരണ വിവരണം • Local Self Government
                </span>
                <h3 className="text-xl font-bold font-malayalam-serif text-[#1B4D36]">
                  താനൂർ നഗരസഭ (Tanur Municipality)
                </h3>
                <p className="text-xs sm:text-sm text-[#4A5752] font-malayalam-body max-w-2xl leading-relaxed">
                  2015 നവംബർ 1-നാണ് താനൂർ നഗരസഭ രൂപീകൃതമായത്. 19.49 ചതുരശ്ര കിലോമീറ്റർ വിസ്തൃതിയും 45 വാർഡുകളുമുണ്ട്. ജനന-മരണ രജിസ്ട്രേഷൻ, കെട്ടിട നികുതി, തൊഴിൽ ലൈസൻസുകൾ, ശുചിത്വ മാലിന്യ നിർമ്മാർജ്ജന സേവനങ്ങൾ എന്നിവ നഗരസഭാ കാര്യാലയത്തിലൂടെ നേരിട്ടും കെ-സ്മാർട്ട് (K-Smart) പോർട്ടൽ വഴിയും ലഭ്യമാണ്.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <a
                  href="https://tanurmunicipality.lsgkerala.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-[#1B4D36] text-white text-xs font-bold hover:bg-[#133827] transition shadow-xs"
                >
                  <span>നഗരസഭാ വെബ്സൈറ്റ്</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
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
