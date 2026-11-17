"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { useLanguage } from "@/lib/i18n/context";
import { 
  Palmtree, 
  Sparkles, 
  Calendar, 
  MapPin, 
  ArrowRight, 
  X, 
  Music, 
  Award, 
  BookOpen, 
  Share2,
  Utensils,
  Landmark,
  Coffee,
  Compass
} from "lucide-react";

interface CulturalArt {
  id: string;
  name: string;
  category: "കലാരൂപങ്ങൾ" | "ഉത്സവങ്ങൾ" | "പാരമ്പര്യം" | "വാസ്തുവിദ്യ";
  district: string;
  imageUrl: string;
  shortDesc: string;
  fullHistory: string;
  instruments: string;
}

const CULTURAL_ARTS: CulturalArt[] = [
  {
    id: "kathakali",
    name: "കഥകളി",
    category: "കലാരൂപങ്ങൾ",
    district: "തൃശ്ശൂർ & മധ്യകേരളം",
    imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&fit=crop&q=80",
    shortDesc: "ഭാവസാന്ദ്രമായ മുദ്രകളും വർണ്ണാഭമായ ചുട്ടിയും കിരീടവും ചേർന്ന കേരളത്തിന്റെ വിഖ്യാത ശാസ്ത്രീയ നാട്യകല.",
    fullHistory: "പതിനേഴാം നൂറ്റാണ്ടിൽ കൊട്ടാരക്കര തമ്പുരാൻ രചിച്ച രാമനാട്ടത്തിൽ നിന്നാണ് കഥകളിയുടെ ഉദ്ഭവം. സാഹിത്യം, സംഗീതം, അഭിനയം, നൃത്തം, ചിത്രകല എന്നീ പഞ്ചകലകളുടെ മനോഹരമായ സമന്വയമാണിത്. പച്ച, കത്തി, താടി, കരി, മിനുക്ക് എന്നിങ്ങനെ കഥാപാത്രങ്ങളുടെ സ്വഭാവത്തിനനുസരിച്ചുള്ള വേഷവിധാനങ്ങൾ കഥകളിയുടെ സവിശേഷതയാണ്. വായ്പാട്ടിന്റെയും ചെണ്ട, മദ്ദളം, ചേങ്ങില, ഇലത്താളം എന്നിവയുടെയും അകമ്പടിയോടെയാണ് അരങ്ങേറുന്നത്.",
    instruments: "ചെണ്ട, മദ്ദളം, ചേങ്ങില, ഇലത്താളം",
  },
  {
    id: "theyyam",
    name: "തെയ്യം",
    category: "കലാരൂപങ്ങൾ",
    district: "കണ്ണൂർ & കാസർഗോഡ്",
    imageUrl: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&auto=format&fit=crop&q=80",
    shortDesc: "ദൈവങ്ങളുടെ നൃത്തം എന്നറിയപ്പെടുന്ന ഉത്തര മലബാറിന്റെ അനുഷ്ഠാന കലാരൂപം.",
    fullHistory: "തെയ്യം അഥവാ തിറ ഉത്തരകേരളത്തിന്റെ തനതായ പുരാതന അനുഷ്ഠാന കലയാണ്. മനുഷ്യൻ ദൈവമായി മാറുന്ന വിസ്മയ കാഴ്ചയാണിത്. വലിയ മുടിയും, തനതു മുഖത്തെഴുത്തും, ആടയാഭരണങ്ങളും അണിഞ്ഞ് തിരുമുറ്റങ്ങളിൽ തെയ്യക്കോലങ്ങൾ ഉറഞ്ഞാടുന്നു. മുച്ചിലോട്ടു ഭഗവതി, കതിവനൂർ വീരൻ, പൊട്ടൻ തെയ്യം, ഗുളികൻ തുടങ്ങി നാനൂറിലധികം തെയ്യക്കോലങ്ങളുണ്ട്.",
    instruments: "തുടി, വീക്കൻ ചെണ്ട, കുഴൽ, ഇലത്താളം",
  },
  {
    id: "mohiniyattam",
    name: "മോഹിനിയാട്ടം",
    category: "കലാരൂപങ്ങൾ",
    district: "കേരളമൊട്ടാകെ",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80",
    shortDesc: "ലാസ്യ ഭാവം തുളുമ്പുന്ന ചുവടുകളും കേരളീയ കസവ് വസ്ത്രധാരണവുമുള്ള ശാസ്ത്രീയ നൃത്തരൂപം.",
    fullHistory: "മോഹിപ്പിക്കുന്ന ഭാവഹാവാദികളോടെ സ്ത്രീകളാൽ അവതരിപ്പിക്കപ്പെടുന്ന ക്ലാസിക്കൽ നൃത്തമാണ് മോഹിനിയാട്ടം. സ്വാതി തിരുനാളിന്റെയും മഹാകവി വള്ളത്തോളിന്റെയും കാലത്താണ് മോഹിനിയാട്ടം ഇന്നത്തെ സമ്പൂർണ്ണ രൂപത്തിലേക്ക് വളർന്നത്. കേരളത്തിന്റെ തനതു കസവുമുണ്ടും നേര്യതും മുല്ലപ്പൂവും അണിഞ്ഞുള്ള ഈ നൃത്തരൂപം ആസ്വാദകരുടെ മനം കവരുന്നു.",
    instruments: "മൃദംഗം, മദ്ദളം, കുഴൽ, ഇടയ്ക്ക, പുല്ലാങ്കുഴൽ",
  },
  {
    id: "kalaripayattu",
    name: "കളരിപ്പയറ്റ്",
    category: "പാരമ്പര്യം",
    district: "വടക്കൻ മലബാർ",
    imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80",
    shortDesc: "ലോകത്തിലെ തന്നെ ഏറ്റവും പുരാതനമായ ആയോധനകലകളിൽ ഒന്ന്.",
    fullHistory: "ശരീര വഴക്കവും മനസ്സാന്നിധ്യവും ആയുധ പ്രയോഗവും സമന്വയിക്കുന്ന പരമ്പരാഗത ആയോധന വിദ്യയാണ് കളരിപ്പയറ്റ്. മെയ്ത്താരി, കോൽത്താരി, അങ്കത്താരി, വെറുംകൈ പ്രയോഗം എന്നിങ്ങനെ നാല് പ്രധാന ഘട്ടങ്ങളിലായി പയറ്റ് അഭ്യസിക്കുന്നു. വാൾ, പരിച, ഉറുമി എന്നിവയുടെ പ്രയോഗം ആയോധന കലയുടെ അത്യുന്നതിയെ പ്രതിഫലിപ്പിക്കുന്നു.",
    instruments: "ഗുരുസ്തോത്രം, വായ്ത്താരികൾ",
  },
  {
    id: "padayani",
    name: "പടയണി",
    category: "കലാരൂപങ്ങൾ",
    district: "പത്തനംതിട്ട & കോട്ടയം",
    imageUrl: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&auto=format&fit=crop&q=80",
    shortDesc: "കവുങ്ങിൻ പാളകളിൽ വരച്ച ഭീമാകാരമായ കോലങ്ങളണിഞ്ഞ് തപ്പിന്റെ താളത്തിനൊത്ത് ഉറയുന്ന അനുഷ്ഠാന കല.",
    fullHistory: "ഭദ്രകാളി ക്ഷേത്രങ്ങളിൽ കാളീപ്രീതിക്കായി നടത്തുന്ന അനുഷ്ഠാന നൃത്തമാണിത്. ഭൈരവി, കാലൻ, യക്ഷി, പക്ഷി, കുതിര തുടങ്ങിയ കോലങ്ങളാണ് പ്രധാനമായും എഴുന്നള്ളിക്കുന്നത്. തപ്പ് എന്ന തോൽവാദ്യത്തിന്റെ മുറുകിയ താളത്തിലാണ് പടയണി അവതരിപ്പിക്കപ്പെടുന്നത്.",
    instruments: "തപ്പ്, കൈമണി, ചെണ്ട",
  },
  {
    id: "nalukettu",
    name: "നാലുകെട്ട് വാസ്തുവിദ്യ",
    category: "വാസ്തുവിദ്യ",
    district: "കേരളമൊട്ടാകെ",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
    shortDesc: "തച്ചുശാസ്ത്ര വിധിപ്രകാരം നടുമുറ്റവും ചരിഞ്ഞ ഓട്ടു മേൽക്കൂരയുമുള്ള പരമ്പരാഗത കേരളീയ ഗൃഹനിർമ്മാണം.",
    fullHistory: "വടക്കിനി, തെക്കിനി, കിഴക്കിനി, പടിഞ്ഞാറ്റിനി എന്നീ നാല് കെട്ടുകൾ ഒത്തുചേർന്ന് നടുവിലൊരു നടുമുറ്റത്തോട് (അങ്കണം) കൂടിയ തനതു നിർമ്മാണ ശൈലിയാണ് നാലുകെട്ട്. കളിമൺ ഓടുകൾ, മരം, വെട്ടുകല്ല് എന്നിവ ഉപയോഗിച്ച് പ്രകൃതിയോട് ഇണങ്ങി നിൽക്കുന്ന അന്തരീക്ഷ ഊഷ്മാവ് നിലനിർത്തുന്ന വാസ്തുവിദ്യാ വിസ്മയമാണിത്.",
    instruments: "തച്ചുശാസ്ത്രം, തച്ചുവിദ്യ",
  },
  {
    id: "pooram",
    name: "തൃശ്ശൂർ പൂരം",
    category: "ഉത്സവങ്ങൾ",
    district: "തൃശ്ശൂർ",
    imageUrl: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&auto=format&fit=crop&q=80",
    shortDesc: "ഉത്സവങ്ങളുടെ ഉത്സവമായ തൃശ്ശൂർ പൂരം — കുടമാറ്റവും ഇലഞ്ഞിത്തറ മേളവും വെടിക്കെട്ടും.",
    fullHistory: "ശക്തൻ തമ്പുരാൻ തുടക്കം കുറിച്ച തൃശ്ശൂർ പൂരം മെയ് മാസത്തിലെ പൂര നാളിൽ വടക്കുന്നാഥ ക്ഷേത്ര സന്നിധിയിൽ അരങ്ങേറുന്നു. പാറമേക്കാവ്, തിരുവമ്പാടി എന്നീ പ്രമുഖ പക്ഷങ്ങൾ തമ്മിലുള്ള സൗഹൃദ മത്സരമായ കുടമാറ്റവും ലോകോത്തര പഞ്ചവാദ്യവും വിശ്വപ്രസിദ്ധമാണ്.",
    instruments: "പഞ്ചവാദ്യം, പാണ്ടിമേളം, കൊമ്പ്, കുഴൽ",
  },
  {
    id: "oppana",
    name: "ഒപ്പന & ദഫ്മുട്ട്",
    category: "പാരമ്പര്യം",
    district: "മലബാർ",
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80",
    shortDesc: "മലബാറിലെ വിവാഹങ്ങളിലും സാംസ്കാരിക കൂട്ടായ്മകളിലും കൈകൊട്ടി പാടുന്ന മനോഹരമായ മാപ്പിള കലാരൂപം.",
    fullHistory: "മണവാട്ടിയെ നടുവിലിരുത്തി സഖിമാർ താളത്തിൽ കൈകൊട്ടി പാടുന്ന കലാരൂപമാണ് ഒപ്പന. കവിഞ്ഞ ഭാവഹാവാദികളോടെ ഇശലുകൾ ആലപിക്കപ്പെടുന്നു. മാപ്പിളപ്പാട്ടിന്റെ മാസ്മരിക താളം ഇതിന്റെ മാറ്റുകൂട്ടുന്നു.",
    instruments: "ഹാർമോണിയം, തബല, കൈത്താളം",
  },
];

export default function CulturePage() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("എല്ലാം");
  const [activeArtModal, setActiveArtModal] = useState<CulturalArt | null>(null);

  const categories = ["എല്ലാം", "കലാരൂപങ്ങൾ", "ഉത്സവങ്ങൾ", "പാരമ്പര്യം", "വാസ്തുവിദ്യ"];

  const filteredArts = selectedCategory === "എല്ലാം" 
    ? CULTURAL_ARTS 
    : CULTURAL_ARTS.filter((a) => a.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
          <Breadcrumbs items={[{ label: "സംസ്കാരം (Culture)" }]} />
        </div>
        
        {/* ========================================================================= */}
        {/* HERO BANNER: Row 2, Col 1 in reference image (Kathakali Face) */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden pt-2 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="relative rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-elevated border border-[#E7DFD0] min-h-[380px] sm:min-h-[440px] flex items-center bg-[#182C22]">
            
            {/* Background Panorama: Kathakali Face Closeup */}
            <div 
              className="absolute inset-0 bg-cover bg-center sm:bg-right"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1600&auto=format&fit=crop&q=85')`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#11241A] via-[#11241A]/85 to-transparent" />
            </div>

            {/* Left Content */}
            <div className="relative z-10 p-6 sm:p-12 lg:p-16 max-w-2xl text-white">
              <span className="inline-block px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-xs text-amber-200 text-xs font-bold mb-3">
                കേരള പൈതൃകം
              </span>
              <h1 className="text-4xl sm:text-6xl font-bold font-malayalam-serif tracking-tight leading-none mb-3">
                സംസ്കാരം
              </h1>
              <p className="text-xl sm:text-2xl font-bold font-malayalam-script text-amber-200 mb-4">
                നാടിന്റെ പാരമ്പര്യം...
              </p>
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-malayalam-body max-w-lg">
                നൂറ്റാണ്ടുകളുടെ പെരുമ പേറുന്ന അനുഷ്ഠാന കലകൾ, വാസ്തുവിദ്യ, ഉത്സവങ്ങൾ, ആയോധന പാരമ്പര്യം എന്നിവയുടെ അനന്തമായ സംഗമം.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CATEGORY TABS BAR */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition active:scale-95 whitespace-nowrap shadow-xs ${
                  selectedCategory === cat
                    ? "bg-[#1B4D36] text-white"
                    : "bg-white hover:bg-[#F3EFE6] text-[#3D4B44] border border-[#DDD5C5]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* MAIN SECTION: 4 Art Cards + Large Festivals Banner (Matching Reference) */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* 4 Art Cards (8 Cols) */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {filteredArts.map((art) => (
                <div
                  key={art.id}
                  onClick={() => setActiveArtModal(art)}
                  className="bg-white rounded-3xl border border-[#EAE4D7] shadow-card overflow-hidden hover:border-[#1B4D36]/60 transition cursor-pointer group flex flex-col justify-between"
                >
                  <div className="h-44 sm:h-52 overflow-hidden relative bg-[#E5DDD0]">
                    <img
                      src={art.imageUrl}
                      alt={art.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition p-3 flex items-end">
                      <span className="text-[11px] text-amber-200 font-semibold">വിശദാംശങ്ങൾ കാണുക</span>
                    </div>
                  </div>
                  <div className="p-3.5 text-center">
                    <h3 className="font-bold font-malayalam-serif text-sm sm:text-base text-[#1A2420] group-hover:text-[#1B4D36] transition">
                      {art.name}
                    </h3>
                    <span className="text-[10px] text-[#7A8880] block mt-0.5">{art.district}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Featured Right Card: "നാടിന്റെ ഉത്സവങ്ങൾ" (Row 2, Col 1 reference Snake Boat) */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-[#EAE4D7] shadow-card p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <h3 className="font-bold font-malayalam-serif text-lg text-[#1B4D36] mb-2">
                  നാടിന്റെ ഉത്സവങ്ങൾ
                </h3>
                <p className="text-xs text-[#5C6A64] leading-relaxed mb-4 font-malayalam-body">
                  കേരളത്തിന്റെ പാരമ്പര്യവും ഒരുമയും വിളംബരം ചെയ്യുന്ന ഉത്സവങ്ങൾ... ഓണം, വിഷു, തൃശ്ശൂർ പൂരം, വള്ളംകളി എന്നിവ നാടിന്റെ ആവേശമാണ്.
                </p>
                <div className="rounded-2xl overflow-hidden h-48 bg-[#E5DDD0] mb-4 shadow-inner">
                  <img
                    src="https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&auto=format&fit=crop&q=80"
                    alt="Kerala Vallam Kali (Boat Race)"
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                </div>
              </div>

              <Link
                href="/events?category=സംസ്കാരം"
                className="w-full py-2.5 rounded-xl bg-[#FAF7F0] hover:bg-[#1B4D36] hover:text-white text-[#1B4D36] border border-[#DDD5C5] text-xs font-bold text-center transition shadow-xs flex items-center justify-center gap-1.5"
              >
                <span>സാംസ്കാരിക പരിപാടികൾ കാണാം</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* HERITAGE INSTRUMENTS & TRADITIONS */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="bg-[#FAF4E6] rounded-3xl border border-[#E8DCBF] p-6 sm:p-10 shadow-card">
            <div className="max-w-2xl mb-8">
              <h3 className="text-2xl font-bold font-malayalam-serif text-[#1B4D36]">
                വാദ്യമേളങ്ങളുടെ സംഗീതം
              </h3>
              <p className="text-xs sm:text-sm text-[#5C6A64] mt-1 font-malayalam-body">
                പഞ്ചവാദ്യവും പാണ്ടിമേളവും ഇലഞ്ഞിത്തറയിലെ ചെണ്ടനാദവും ഓരോ മലയാളിയുടെയും ഹൃദയമിടിപ്പാണ്.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              <div className="bg-white rounded-2xl p-5 border border-[#EAE4D7] shadow-xs">
                <div className="w-10 h-10 rounded-full bg-[#E0F1E7] text-[#1B4D36] flex items-center justify-center mb-3">
                  <Music className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-[#1A2420] mb-1">പഞ്ചവാദ്യം</h4>
                <p className="text-xs text-[#5C6A64] leading-relaxed">
                  മദ്ദളം, തിമില, ഇടയ്ക്ക, ഇലത്താളം, കൊമ്പ് എന്നീ അഞ്ചു വാദ്യങ്ങൾ ചേർന്നൊരുക്കുന്ന ദിവ്യനാദം.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-[#EAE4D7] shadow-xs">
                <div className="w-10 h-10 rounded-full bg-[#E5DDD0] text-[#1B4D36] flex items-center justify-center mb-3">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-[#1A2420] mb-1">ചെണ്ടമേളം</h4>
                <p className="text-xs text-[#5C6A64] leading-relaxed">
                  പാണ്ടിമേളവും പഞ്ചാരിമേളവും ഉത്സവപ്പറമ്പുകളിൽ ലഹരി പടർത്തുന്ന പരമ്പരാഗത താളവിസ്മയം.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-[#EAE4D7] shadow-xs">
                <div className="w-10 h-10 rounded-full bg-[#E0F1E7] text-[#1B4D36] flex items-center justify-center mb-3">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-[#1A2420] mb-1">സോപാനസംഗീതം</h4>
                <p className="text-xs text-[#5C6A64] leading-relaxed">
                  ഇടയ്ക്ക കൊട്ടി ശ്രീകോവിലിന്റെ പടികളിലിരുന്ന് പാടുന്ന അതിപുരാതന ഭക്തിഗാന ശാഖ.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION: TRADITIONAL KERALA CUISINE (ഭക്ഷണ സംസ്കാരം) */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Utensils className="w-5 h-5 text-[#B87A1E]" />
                <span className="text-xs font-bold text-[#B87A1E] uppercase tracking-wider">നാട്ടുരുചികൾ</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-malayalam-serif text-[#1B4D36]">
                പരമ്പരാഗത ഭക്ഷണ സംസ്കാരം
              </h2>
              <p className="text-xs sm:text-sm text-[#5C6A64] mt-1 max-w-xl">
                തേങ്ങയും സുഗന്ധവ്യഞ്ജനങ്ങളും ചേർത്തൊരുക്കുന്ന തനിമയാർന്ന കേരളീയ രുചിഭേദങ്ങൾ.
              </p>
            </div>
            <Link
              href="/gallery?category=സംസ്കാരം"
              className="mt-3 sm:mt-0 text-xs font-bold text-[#1B4D36] hover:underline flex items-center gap-1"
            >
              <span>കൂടുതൽ രുചിചിത്രങ്ങൾ</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Dish 1: Kerala Sadya */}
            <div className="bg-white rounded-3xl border border-[#EAE4D7] overflow-hidden shadow-card hover:border-[#1B4D36]/50 transition group flex flex-col justify-between">
              <div>
                <div className="h-44 overflow-hidden relative bg-[#E5DDD0]">
                  <img
                    src="https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=800&auto=format&fit=crop&q=80"
                    alt="Kerala Sadya on Banana Leaf"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/60 text-amber-200 text-[10px] font-bold backdrop-blur-xs">
                    വാഴയിലയിൽ വിളമ്പിയ വിരുന്ന്
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold font-malayalam-serif text-base text-[#1A2420] mb-1.5 group-hover:text-[#1B4D36] transition">
                    കേരള സദ്യ
                  </h3>
                  <p className="text-xs text-[#5C6A64] leading-relaxed line-clamp-3">
                    അവിയിലും സാമ്പാറും കാളനും ഓലനും പായസവുമടങ്ങുന്ന 24-ലധികം വിഭവങ്ങളോടെ തുമ്പപ്പൂ ചോറിലൊരുക്കുന്ന സമ്പൂർണ്ണ സസ്യാഹാര സദ്യ.
                  </p>
                </div>
              </div>
              <div className="p-5 pt-0">
                <span className="text-[11px] font-bold text-[#1B4D36] bg-[#E0F1E7] px-2.5 py-1 rounded-xl block text-center">
                  ഓണം & ശുഭകാര്യങ്ങൾ
                </span>
              </div>
            </div>

            {/* Dish 2: Appam & Stew */}
            <div className="bg-white rounded-3xl border border-[#EAE4D7] overflow-hidden shadow-card hover:border-[#1B4D36]/50 transition group flex flex-col justify-between">
              <div>
                <div className="h-44 overflow-hidden relative bg-[#E5DDD0]">
                  <img
                    src="https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&auto=format&fit=crop&q=80"
                    alt="Kerala Appam with Stew"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/60 text-amber-200 text-[10px] font-bold backdrop-blur-xs">
                    തേങ്ങാപ്പാൽ ചേർത്ത സ്റ്റൂ
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold font-malayalam-serif text-base text-[#1A2420] mb-1.5 group-hover:text-[#1B4D36] transition">
                    അപ്പവും സ്റ്റൂവും
                  </h3>
                  <p className="text-xs text-[#5C6A64] leading-relaxed line-clamp-3">
                    പാലപ്പവും വെളിച്ചെണ്ണയിൽ മൂപ്പിച്ച തേങ്ങാപ്പാൽ ഇഷ്തുവും കേരളീയ പ്രാതലിന്റെയും ക്രിസ്മസ് വിരുന്നിന്റെയും പ്രിയപ്പെട്ട വിഭവമാണ്.
                  </p>
                </div>
              </div>
              <div className="p-5 pt-0">
                <span className="text-[11px] font-bold text-[#1B4D36] bg-[#E0F1E7] px-2.5 py-1 rounded-xl block text-center">
                  മധ്യതിരുവിതാംകൂർ രുചി
                </span>
              </div>
            </div>

            {/* Dish 3: Malabar Dum Biryani */}
            <div className="bg-white rounded-3xl border border-[#EAE4D7] overflow-hidden shadow-card hover:border-[#1B4D36]/50 transition group flex flex-col justify-between">
              <div>
                <div className="h-44 overflow-hidden relative bg-[#E5DDD0]">
                  <img
                    src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80"
                    alt="Malabar Biryani"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/60 text-amber-200 text-[10px] font-bold backdrop-blur-xs">
                    ഖൈമ അരിയിൽ ദം ചെയ്തത്
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold font-malayalam-serif text-base text-[#1A2420] mb-1.5 group-hover:text-[#1B4D36] transition">
                    തലശ്ശേരി ബിരിയാണി
                  </h3>
                  <p className="text-xs text-[#5C6A64] leading-relaxed line-clamp-3">
                    ജീരകശാല അരിയണിഞ്ഞ് നെയ്മണവും മലബാർ മസാലക്കൂട്ടും സമന്വയിക്കുന്ന തനതു മലബാർ ദം ബിരിയാണി.
                  </p>
                </div>
              </div>
              <div className="p-5 pt-0">
                <span className="text-[11px] font-bold text-[#1B4D36] bg-[#E0F1E7] px-2.5 py-1 rounded-xl block text-center">
                  മലബാർ തീരദേശ പാരമ്പര്യം
                </span>
              </div>
            </div>

            {/* Dish 4: Pazham Pori & Snacks */}
            <div className="bg-white rounded-3xl border border-[#EAE4D7] overflow-hidden shadow-card hover:border-[#1B4D36]/50 transition group flex flex-col justify-between">
              <div>
                <div className="h-44 overflow-hidden relative bg-[#E5DDD0]">
                  <img
                    src="https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80"
                    alt="Pazham Pori and Kerala Evening Snacks"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/60 text-amber-200 text-[10px] font-bold backdrop-blur-xs">
                    നാടൻ ചായക്കട വിഭവങ്ങൾ
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold font-malayalam-serif text-base text-[#1A2420] mb-1.5 group-hover:text-[#1B4D36] transition">
                    പഴംപൊരി & നേന്ത്രക്കായ ഉപ്പേരി
                  </h3>
                  <p className="text-xs text-[#5C6A64] leading-relaxed line-clamp-3">
                    പഴുത്ത നേന്ത്രപ്പഴം മാവിൽ മുക്കി വെളിച്ചെണ്ണയിൽ വറുത്തെടുത്ത പഴംപൊരിയും കട്ടൻ ചായയും കേരളത്തിലെ സായാഹ്ന കൂട്ടായ്മകളുടെ അടയാളമാണ്.
                  </p>
                </div>
              </div>
              <div className="p-5 pt-0">
                <span className="text-[11px] font-bold text-[#1B4D36] bg-[#E0F1E7] px-2.5 py-1 rounded-xl block text-center">
                  തട്ടുകട & ചായപ്പീടിക
                </span>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION: ARCHITECTURE & HERITAGE (വാസ്തുവിദ്യയും പൈതൃകവും) */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="bg-white rounded-3xl sm:rounded-[2.5rem] border border-[#EAE4D7] p-6 sm:p-10 shadow-card">
            <div className="max-w-2xl mb-8">
              <div className="flex items-center gap-2 mb-2">
                <Landmark className="w-5 h-5 text-[#1B4D36]" />
                <span className="text-xs font-bold text-[#1B4D36] uppercase tracking-wider">തച്ചുശാസ്ത്രം</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-malayalam-serif text-[#1B4D36]">
                കേരള വാസ്തുവിദ്യയും പൈതൃക കേന്ദ്രങ്ങളും
              </h2>
              <p className="text-xs sm:text-sm text-[#5C6A64] mt-1">
                പ്രകൃതിദത്ത മരപ്പണികളും ചുവർച്ചിത്രങ്ങളും മനോഹരമായ ചരിഞ്ഞ മേൽക്കൂരകളും സമ്മാനിക്കുന്ന വിസ്മയം.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7] p-5 space-y-3">
                <div className="h-40 rounded-xl overflow-hidden bg-[#E5DDD0]">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80"
                    alt="Traditional Kerala Nalukettu Courtyard"
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                </div>
                <h4 className="font-bold text-base text-[#1A2420] font-malayalam-serif">നാലുകെട്ടും നടുമുറ്റവും</h4>
                <p className="text-xs text-[#5C6A64] leading-relaxed">
                  മഴയും വെയിലും സ്വീകരിക്കുന്ന നടുമുറ്റവും (അങ്കണം) പടിപ്പുരയും പത്തായപ്പുരയുമുള്ള പാരമ്പര്യ നിർമ്മാണ രീതി.
                </p>
              </div>

              <div className="rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7] p-5 space-y-3">
                <div className="h-40 rounded-xl overflow-hidden bg-[#E5DDD0]">
                  <img
                    src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80"
                    alt="Padmanabhapuram Palace Kerala Wooden Architecture"
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                </div>
                <h4 className="font-bold text-base text-[#1A2420] font-malayalam-serif">പത്മനാഭപുരം കൊട്ടാരം</h4>
                <p className="text-xs text-[#5C6A64] leading-relaxed">
                  ഏഷ്യയിലെ ഏറ്റവും വലിയ തടി കൊട്ടാരം. കൊത്തുപണികൾ നിറഞ്ഞ മച്ചുകളും ഔഷധക്കൂട്ടുകൾ ചേർത്ത കറുത്ത മിനുസമുള്ള തറകളും.
                </p>
              </div>

              <div className="rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7] p-5 space-y-3">
                <div className="h-40 rounded-xl overflow-hidden bg-[#E5DDD0]">
                  <img
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80"
                    alt="Bekal Fort Arabian Sea Coast"
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                </div>
                <h4 className="font-bold text-base text-[#1A2420] font-malayalam-serif">ബേക്കൽ കോട്ടയും ചരിത്ര സ്മാരകങ്ങളും</h4>
                <p className="text-xs text-[#5C6A64] leading-relaxed">
                  അറബിക്കടലിന്റെ തീരത്ത് തലയുയർത്തി നിൽക്കുന്ന അതിപുരാതന ചെങ്കൽ കോട്ടയും കേരള തീരദേശ പ്രതിരോധ ചരിത്രവും.
                </p>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* ========================================================================= */}
      {/* ART DETAIL MODAL */}
      {/* ========================================================================= */}
      {activeArtModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[#FAF7F0] rounded-3xl border border-[#E7DFD0] max-w-xl w-full shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="relative h-60 w-full flex-shrink-0 bg-neutral-900">
              <img
                src={activeArtModal.imageUrl}
                alt={activeArtModal.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setActiveArtModal(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
              <span className="absolute bottom-4 left-4 bg-[#1B4D36] text-white text-xs font-bold px-3 py-1 rounded-full">
                {activeArtModal.category}
              </span>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto flex-1">
              <div className="flex items-center gap-2 text-xs text-[#7A8880] mb-2">
                <MapPin className="w-3.5 h-3.5 text-[#1B4D36]" />
                <span>{activeArtModal.district}</span>
              </div>

              <h2 className="text-2xl font-bold font-malayalam-serif text-[#1B4D36] mb-3">
                {activeArtModal.name}
              </h2>

              <p className="text-xs sm:text-sm text-[#3E4D45] leading-relaxed mb-4 font-malayalam-body">
                {activeArtModal.fullHistory}
              </p>

              <div className="p-3.5 rounded-2xl bg-white border border-[#EAE4D7] text-xs text-[#5C6A64] mb-4">
                <strong className="text-[#1A2420]">പ്രധാന വാദ്യോപകരണങ്ങൾ:</strong> {activeArtModal.instruments}
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-[#E5DFD1]">
                <span className="text-xs text-[#7A8880]">നമ്മുടെ നാട് സാംസ്കാരിക പൈതൃകം</span>
                <button
                  type="button"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: activeArtModal.name, text: activeArtModal.shortDesc, url: window.location.href });
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-[#DDD5C5] text-xs font-bold text-[#1B4D36] hover:bg-[#F3EFE6] transition"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>പങ്കുവെക്കുക</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <BottomNav />
    </div>
  );
}
