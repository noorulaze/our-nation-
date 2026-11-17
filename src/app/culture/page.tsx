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
    id: "oppana-duff",
    name: "ദഫ്മുട്ട് & കോൽക്കളി",
    category: "കലാരൂപങ്ങൾ",
    district: "മലപ്പുറം & താനൂർ",
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80",
    shortDesc: "മാപ്പിള പൈതൃകത്തിന്റെ താളവും ആവേശവും നിറയുന്ന മലപ്പുറത്തിന്റെ അനുഷ്ഠാന കലാരൂപങ്ങൾ.",
    fullHistory: "മലപ്പുറത്തിന്റെയും താനൂരിന്റെയും സാംസ്കാരിക ജീവിതവുമായി ഇഴചേർന്നുനിൽക്കുന്ന പാരമ്പര്യ കലാരൂപങ്ങളാണ് ദഫ്മുട്ടും കോൽക്കളിയും. ദഫ് എന്ന തോൽവാദ്യത്തിൽ കൈകൾകൊണ്ടു താളമിട്ട്, ഇശലുകൾ പാടി വട്ടത്തിൽ ചുവടുവെക്കുന്ന കലയാണിത്. നേർച്ചകളിലും ഉത്സവപ്പറമ്പുകളിലും വിവാഹ സദസ്സുകളിലും ഈ കലാരൂപം മലപ്പുറത്തിന്റെ ആവേശം ഉയർത്തുന്നു.",
    instruments: "ദഫ്, കൈത്താളം, ഇശലുകൾ",
  },
  {
    id: "oppana",
    name: "ഒപ്പന",
    category: "കലാരൂപങ്ങൾ",
    district: "മലപ്പുറം ജില്ല",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80",
    shortDesc: "മലബാറിലെ വിവാഹങ്ങളിലും സാംസ്കാരിക കൂട്ടായ്മകളിലും കൈകൊട്ടി പാടുന്ന മനോഹരമായ മാപ്പിള കലാരൂപം.",
    fullHistory: "മണവാട്ടിയെ നടുവിലിരുത്തി സഖിമാർ താളത്തിൽ കൈകൊട്ടി പാടുന്ന കലാരൂപമാണ് ഒപ്പന. കവിഞ്ഞ ഭാവഹാവാദികളോടെ ഇശലുകൾ ആലപിക്കപ്പെടുന്നു. മാപ്പിളപ്പാട്ടിന്റെ മാസ്മരിക താളം ഇതിന്റെ മാറ്റുകൂട്ടുന്നു. മലപ്പുറത്തിന്റെ സംസ്കാരത്തിൽ ഒപ്പനയ്ക്ക് വലിയ സ്ഥാനമുണ്ട്.",
    instruments: "ഹാർമോണിയം, തബല, കൈത്താളം",
  },
  {
    id: "mappila-pattu",
    name: "മാപ്പിളപ്പാട്ട് & വൈദ്യർ പാരമ്പര്യം",
    category: "പാരമ്പര്യം",
    district: "കൊണ്ടോട്ടി & മലപ്പുറം",
    imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80",
    shortDesc: "മഹാകവി മോയിൻകുട്ടി വൈദ്യരുടെ ബദർ പടപ്പാട്ട് മുതൽ തലമുറകൾ ഏറ്റുപാടിയ ഇശൽ പൈതൃകം.",
    fullHistory: "അറബി-മലയാള സാഹിത്യ ശാഖയിലെ അതുല്യ പ്രതിഭയായ മോയിൻകുട്ടി വൈദ്യരുടെ ഈറ്റില്ലമായ കൊണ്ടോട്ടി മലപ്പുറം ജില്ലയിലാണ്. ബദർ പടപ്പാട്ട്, ബദറുൽ മുനീർ ഹുസ്നുൽ ജമാൽ തുടങ്ങിയ വിശ്വോത്തര കൃതികളിലൂടെ മാപ്പിളപ്പാട്ടിന് സാഹിത്യ പ്രൗഢി നൽകി. കാതുകൾക്ക് കുളിർമയേകുന്ന ഇശലുകളും ചരിത്ര ആഖ്യാനങ്ങളും മലപ്പുറത്തിന്റെ സാംസ്കാരിക സ്വത്വമാണ്.",
    instruments: "ഹാർമോണിയം, തബല, വായ്പാട്ട്",
  },
  {
    id: "vettathunadu-kathakali",
    name: "വെട്ടത്തു സമ്പ്രദായം (കഥകളി)",
    category: "കലാരൂപങ്ങൾ",
    district: "താനൂർ (വെട്ടത്തുനാട്)",
    imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&fit=crop&q=80",
    shortDesc: "കഥകളിയുടെ വേഷത്തിലും താളത്തിലും വിപ്ലവകരമായ മാറ്റങ്ങൾ വരുത്തിയ താനൂർ വെട്ടത്തു സമ്പ്രദായം.",
    fullHistory: "താനൂർ ആസ്ഥാനമായിരുന്ന പ്രാചീന വെട്ടത്തുനാട് രാജവംശം കഥകളിയുടെ ചരിത്രത്തിൽ നിസ്തുല സംഭാവന നൽകിയിട്ടുണ്ട്. രാമനാട്ടത്തിൽ ആദ്യമായി ചെണ്ട ഉൾപ്പെടുത്തിയതും, മിനുക്ക്, കത്തി, താടി വേഷങ്ങളുടെ ചുട്ടി പരിഷ്കരിച്ചതും വെട്ടത്തു തമ്പുരാനാണ്. ഇത് 'വെട്ടത്തു സമ്പ്രദായം' എന്ന പേരിൽ കഥകളി രംഗത്ത് പ്രസിദ്ധമാണ്. താനൂരിന്റെ മണ്ണ് കഥകളിയുടെ ശാസ്ത്രീയ വളർച്ചയുടെ നാഴികക്കല്ലാണ്.",
    instruments: "ചെണ്ട, മദ്ദളം, ചേങ്ങില, ഇലത്താളം",
  },
  {
    id: "kalaripayattu",
    name: "വെട്ടത്തുനാട് കളരിപ്പയറ്റ്",
    category: "പാരമ്പര്യം",
    district: "താനൂർ & മലപ്പുറം",
    imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80",
    shortDesc: "മാമാങ്കത്തിലെ ധീരതയുടെയും സാമൂതിരി-വെട്ടത്തുനാട് അങ്കച്ചേകവർമാരുടെയും ആയോധന പാരമ്പര്യം.",
    fullHistory: "ഭാരതപ്പുഴയുടെ തീരത്തും വെട്ടത്തുനാടൻ തീരപ്രദേശങ്ങളിലും നൂറ്റാണ്ടുകളായി നിലനിന്ന ആയോധന പാരമ്പര്യമാണ് കളരിപ്പയറ്റ്. മെയ്ത്താരി, കോൽത്താരി, അങ്കത്താരി, വെറുംകൈ പ്രയോഗം എന്നിവ അഭ്യസിപ്പിക്കുന്ന കളരികൾ താനൂരിലും പരിസരങ്ങളിലും ഇന്നും സജീവമായി തലമുറകൾക്ക് പകർന്നുനൽകുന്നു.",
    instruments: "വായ്ത്താരി, ഗുരുസ്തോത്രം",
  },
  {
    id: "kottakkal-ayurveda",
    name: "കോട്ടക്കൽ ആയുർവേദ പാരമ്പര്യം",
    category: "പാരമ്പര്യം",
    district: "കോട്ടക്കൽ, മലപ്പുറം",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80",
    shortDesc: "വൈദ്യരത്നം പി.എസ്. വാര്യർ സ്ഥാപിച്ച ആര്യവൈദ്യശാലയും പരമ്പരാഗത അഷ്ടാംഗഹൃദയ ചികിത്സാരീതികളും.",
    fullHistory: "ലോകപ്രശസ്തമായ ആയുർവേദ തലസ്ഥാനമാണ് മലപ്പുറം ജില്ലയിലെ കോട്ടക്കൽ. 1902-ൽ പി.എസ്. വാര്യർ സ്ഥാപിച്ച കോട്ടക്കൽ ആര്യവൈദ്യശാല ഭാരതീയ ചികിത്സാരീതിക്ക് ആഗോള അംഗീകാരം നേടിക്കൊടുത്തു. പഞ്ചകർമ്മ ചികിത്സയും പാരമ്പര്യ ഔഷധ നിർമ്മാണവും മലപ്പുറത്തിന്റെ അഭിമാനമാണ്.",
    instruments: "തനതു തൈലക്കൂട്ട്, അഷ്ടാംഗഹൃദയ പാരമ്പര്യം",
  },
  {
    id: "keraladeshapuram",
    name: "കേരളാദിത്യപുരം ക്ഷേത്ര പൈതൃകം",
    category: "ഉത്സവങ്ങൾ",
    district: "താനൂർ നഗരസഭ",
    imageUrl: "https://images.unsplash.com/photo-1609137144822-54d9c79e6074?w=800&auto=format&fit=crop&q=80",
    shortDesc: "പരശുരാമ പ്രതിഷ്ഠിതമെന്നു കരുതപ്പെടുന്ന താനൂരിലെ അതിപുരാതന ശ്രീകൃഷ്ണ ക്ഷേത്രോത്സവം.",
    fullHistory: "താനൂർ നഗരസഭയിലെ മൂച്ചിക്കൽ സ്ഥിതി ചെയ്യുന്ന അതിപുരാതന ക്ഷേത്രമാണ് കേരളാദിത്യപുരം (കേരളദേശപുരം). 3000-ത്തിലധികം വർഷത്തെ പഴക്കമുണ്ടെന്ന് വിശ്വസിക്കപ്പെടുന്ന ഈ ക്ഷേത്രം വെട്ടത്തു രാജാക്കന്മാരുടെ പരദേവതയായിരുന്നു. മീന മാസത്തിലെ ആറാട്ടുത്സവവും വാദ്യമേളങ്ങളും താനൂരിന്റെ ഏറ്റവും വലിയ സാംസ്കാരിക കൂട്ടായ്മയാണ്.",
    instruments: "പഞ്ചവാദ്യം, പഞ്ചാരിമേളം, കൊമ്പ്, കുഴൽ",
  },
  {
    id: "heritage-mosques",
    name: "പരമ്പരാഗത പള്ളി വാസ്തുവിദ്യ",
    category: "വാസ്തുവിദ്യ",
    district: "താനൂർ & പൊന്നാനി",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
    shortDesc: "കേരളീയ തച്ചുശാസ്ത്രത്തിലും മരപ്പണിയിലും നിർമ്മിക്കപ്പെട്ട വലിയ കുളങ്ങര പള്ളിയും പൊന്നാനി പള്ളിയും.",
    fullHistory: "താനൂരിലെ വലിയ കുളങ്ങര പള്ളിയും നൂറ്റാണ്ടുകൾ പഴക്കമുള്ള പൊന്നാനി വലിയ ജുമുഅത്ത് പള്ളിയും കേരളീയ തച്ചുശാസ്ത്ര വിസ്മയങ്ങളാണ്. മരത്തിൽ കൊത്തിയെടുത്ത കാലിഗ്രാഫിയും, ചരിഞ്ഞ ഓട്ടു മേൽക്കൂരകളും, വെട്ടുകല്ലിൽ പണിത തൂണുകളും കേരളീയവും ഇസ്ലാമികവുമായ വാസ്തുവിദ്യയുടെ മനോഹരമായ സമന്വയമാണ്.",
    instruments: "തച്ചുശാസ്ത്രം, തടി കൊത്തുപണികൾ",
  },
  {
    id: "kondotty-nercha",
    name: "കൊണ്ടോട്ടി നേർച്ച",
    category: "ഉത്സവങ്ങൾ",
    district: "കൊണ്ടോട്ടി, മലപ്പുറം",
    imageUrl: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&auto=format&fit=crop&q=80",
    shortDesc: "സൂഫി പാരമ്പര്യവും സാമുദായിക സൗഹാർദ്ദവും വിളിച്ചോതുന്ന മലപ്പുറത്തിന്റെ ഐതിഹാസിക നേർച്ച.",
    fullHistory: "പതിനെട്ടാം നൂറ്റാണ്ടിലെ സൂഫി വര്യനായ കൊണ്ടോട്ടി തങ്ങളുടെ സ്മരണാർത്ഥം നടക്കുന്ന നേർച്ച. ഹിന്ദു-മുസ്ലിം ഭേദമന്യേ സർവ്വ ജനങ്ങളും പങ്കാളികളാകുന്ന തട്ടാൻ പെട്ടി വരവും പീരങ്കി വെടിയും നേർച്ചയുടെ സവിശേഷതയാണ്. മലപ്പുറത്തിന്റെ സൗഹാർദ്ദ പാരമ്പര്യത്തിന്റെ ജീവിക്കുന്ന തെളിവാണിത്.",
    instruments: "തപ്പുമേളം, വായ്പ്പാട്ട്, സൂഫി ഗീതങ്ങൾ",
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
                മലപ്പുറം & താനൂർ പൈതൃകം
              </span>
              <h1 className="text-4xl sm:text-6xl font-bold font-malayalam-serif tracking-tight leading-none mb-3">
                സംസ്കാരം
              </h1>
              <p className="text-xl sm:text-2xl font-bold font-malayalam-script text-amber-200 mb-4">
                നാടിന്റെ പാരമ്പര്യം...
              </p>
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-malayalam-body max-w-lg">
                വെട്ടത്തുനാടിന്റെയും മലപ്പുറത്തിന്റെയും നൂറ്റാണ്ടുകളുടെ പെരുമ പേറുന്ന തനതു കലകൾ, വാസ്തുവിദ്യ, ഉത്സവങ്ങൾ, ആയോധന പാരമ്പര്യം എന്നിവയുടെ വിസ്മയ സംഗമം.
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
                  className="bg-white rounded-2xl sm:rounded-3xl border border-[#EAE4D7] shadow-card overflow-hidden hover:border-[#1B4D36]/60 transition cursor-pointer group flex flex-col justify-between"
                >
                  <div className="h-36 sm:h-52 overflow-hidden relative bg-[#E5DDD0]">
                    <img
                      src={art.imageUrl}
                      alt={art.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition p-3 flex items-end">
                      <span className="text-[11px] text-amber-200 font-semibold">വിശദാംശങ്ങൾ കാണുക</span>
                    </div>
                  </div>
                  <div className="p-2.5 sm:p-3.5 text-center">
                    <h3 className="font-bold font-malayalam-serif text-xs sm:text-base text-[#1A2420] group-hover:text-[#1B4D36] transition line-clamp-1">
                      {art.name}
                    </h3>
                    <span className="text-[10px] text-[#7A8880] block mt-0.5 truncate">{art.district}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Featured Right Card: "നാടിന്റെ ഉത്സവങ്ങൾ" */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-[#EAE4D7] shadow-card p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <h3 className="font-bold font-malayalam-serif text-lg text-[#1B4D36] mb-2">
                  താനൂരിന്റെയും മലപ്പുറത്തിന്റെയും ഉത്സവങ്ങൾ
                </h3>
                <p className="text-xs text-[#5C6A64] leading-relaxed mb-4 font-malayalam-body">
                  സൗഹാർദ്ദവും പാരമ്പര്യവും വിളംബരം ചെയ്യുന്ന താനൂർ കേരളാദിത്യപുരം ഉത്സവം, താനൂർ തീരദേശ ഫെസ്റ്റ്, തുഞ്ചൻ ഉത്സവം, കൊണ്ടോട്ടി നേർച്ച എന്നിവ നാടിന്റെ ആവേശമാണ്.
                </p>
                <div className="rounded-2xl overflow-hidden h-48 bg-[#E5DDD0] mb-4 shadow-inner">
                  <img
                    src="https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&auto=format&fit=crop&q=80"
                    alt="Tanur Festival Atmosphere"
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
                ദഫ്മുട്ടും തപ്പുമേളവും ക്ഷേത്രങ്ങളിലെ പഞ്ചാരിമേളവും ഇഴചേരുന്ന മലപ്പുറത്തിന്റെ താളവിസ്മയം.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              <div className="bg-white rounded-2xl p-5 border border-[#EAE4D7] shadow-xs">
                <div className="w-10 h-10 rounded-full bg-[#E0F1E7] text-[#1B4D36] flex items-center justify-center mb-3">
                  <Music className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-[#1A2420] mb-1">ദഫ്മുട്ട് & തപ്പുമേളം</h4>
                <p className="text-xs text-[#5C6A64] leading-relaxed">
                  ദഫ് എന്ന തോൽവാദ്യത്തിലും തപ്പിലും വിരിയുന്ന മലപ്പുറത്തിന്റെ തനതു സൂഫി-മാപ്പിള താളങ്ങൾ.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-[#EAE4D7] shadow-xs">
                <div className="w-10 h-10 rounded-full bg-[#E5DDD0] text-[#1B4D36] flex items-center justify-center mb-3">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-[#1A2420] mb-1">പഞ്ചാരിമേളവും ചെണ്ടയും</h4>
                <p className="text-xs text-[#5C6A64] leading-relaxed">
                  കേരളാദിത്യപുരം അടക്കമുള്ള പുരാതന ക്ഷേത്രോത്സവങ്ങളിൽ അലയടിക്കുന്ന പാണ്ടി-പഞ്ചാരി മേളങ്ങൾ.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-[#EAE4D7] shadow-xs">
                <div className="w-10 h-10 rounded-full bg-[#E0F1E7] text-[#1B4D36] flex items-center justify-center mb-3">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-[#1A2420] mb-1">മാപ്പിള ഇശലുകൾ & സോപാനം</h4>
                <p className="text-xs text-[#5C6A64] leading-relaxed">
                  മോയിൻകുട്ടി വൈദ്യരുടെ കാവ്യ ഇശലുകളും ശ്രീകോവിൽ നടയിലെ ഇടയ്ക്ക നാദവും ചേർന്ന സംഗീതധാര.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION: TRADITIONAL CUISINE (ഭക്ഷണ സംസ്കാരം) */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Utensils className="w-5 h-5 text-[#B87A1E]" />
                <span className="text-xs font-bold text-[#B87A1E] uppercase tracking-wider">നാട്ടുരുചികൾ</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-malayalam-serif text-[#1B4D36]">
                താനൂർ & മലപ്പുറം ഭക്ഷണ സംസ്കാരം
              </h2>
              <p className="text-xs sm:text-sm text-[#5C6A64] mt-1 max-w-xl">
                അറബിക്കടലിന്റെ തീരദേശ തനിമയും നാടൻ സുഗന്ധവ്യഞ്ജനങ്ങളും ചേർത്തൊരുക്കുന്ന മലപ്പുറത്തിന്റെ രുചിഭേദങ്ങൾ.
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
            
            {/* Dish 1: Tanur Coastal Fresh Fish Curry */}
            <div className="bg-white rounded-3xl border border-[#EAE4D7] overflow-hidden shadow-card hover:border-[#1B4D36]/50 transition group flex flex-col justify-between">
              <div>
                <div className="h-44 overflow-hidden relative bg-[#E5DDD0]">
                  <img
                    src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80"
                    alt="Tanur Coastal Fish Curry"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/60 text-amber-200 text-[10px] font-bold backdrop-blur-xs">
                    താനൂർ ഹാർബർ ഫ്രഷ്
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold font-malayalam-serif text-base text-[#1A2420] mb-1.5 group-hover:text-[#1B4D36] transition">
                    താനൂർ അയല പൊരിച്ചതും മീൻകറിയും
                  </h3>
                  <p className="text-xs text-[#5C6A64] leading-relaxed line-clamp-3">
                    താനൂർ ഫിഷിംഗ് ഹാർബറിൽ നിന്നുള്ള പുത്തൻ മീനുകൾ കുടംപുളിയും തേങ്ങാപ്പാലും ചേർത്ത് മൺചട്ടിയിൽ തയ്യാറാക്കുന്ന തനതു തീരദേശ മീൻകറി.
                  </p>
                </div>
              </div>
              <div className="p-5 pt-0">
                <span className="text-[11px] font-bold text-[#1B4D36] bg-[#E0F1E7] px-2.5 py-1 rounded-xl block text-center">
                  താനൂർ കടപ്പുറം രുചി
                </span>
              </div>
            </div>

            {/* Dish 2: Neypathiri & Meat Curry */}
            <div className="bg-white rounded-3xl border border-[#EAE4D7] overflow-hidden shadow-card hover:border-[#1B4D36]/50 transition group flex flex-col justify-between">
              <div>
                <div className="h-44 overflow-hidden relative bg-[#E5DDD0]">
                  <img
                    src="https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&auto=format&fit=crop&q=80"
                    alt="Malappuram Neypathiri"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/60 text-amber-200 text-[10px] font-bold backdrop-blur-xs">
                    നെയ്മണമുള്ള പത്തൽ
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold font-malayalam-serif text-base text-[#1A2420] mb-1.5 group-hover:text-[#1B4D36] transition">
                    നെയ്പ്പത്തിരി & ഇറച്ചിക്കറി
                  </h3>
                  <p className="text-xs text-[#5C6A64] leading-relaxed line-clamp-3">
                    മലപ്പുറത്തിന്റെ പാരമ്പര്യ വിഭവമായ മൊരിഞ്ഞ നെയ്പ്പത്തലും തേങ്ങാക്കൊത്തു ചേർത്ത നാടൻ ഇറച്ചിക്കറിയും വിശേഷ ദിവസങ്ങളിലെ ഇഷ്ടവിഭവമാണ്.
                  </p>
                </div>
              </div>
              <div className="p-5 pt-0">
                <span className="text-[11px] font-bold text-[#1B4D36] bg-[#E0F1E7] px-2.5 py-1 rounded-xl block text-center">
                  മലപ്പുറം നാടൻ രുചി
                </span>
              </div>
            </div>

            {/* Dish 3: Malappuram Dum Biryani */}
            <div className="bg-white rounded-3xl border border-[#EAE4D7] overflow-hidden shadow-card hover:border-[#1B4D36]/50 transition group flex flex-col justify-between">
              <div>
                <div className="h-44 overflow-hidden relative bg-[#E5DDD0]">
                  <img
                    src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80"
                    alt="Malappuram Biryani"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/60 text-amber-200 text-[10px] font-bold backdrop-blur-xs">
                    ജീരകശാല അരിയിൽ ദം ചെയ്തത്
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold font-malayalam-serif text-base text-[#1A2420] mb-1.5 group-hover:text-[#1B4D36] transition">
                    മലപ്പുറം ദം ബിരിയാണി
                  </h3>
                  <p className="text-xs text-[#5C6A64] leading-relaxed line-clamp-3">
                    ജീരകശാല അരിയണിഞ്ഞ് നെയ്മണവും മലപ്പുറം സുഗന്ധവ്യഞ്ജനക്കൂട്ടും സമന്വയിക്കുന്ന തനതു മലബാർ ദം ബിരിയാണി.
                  </p>
                </div>
              </div>
              <div className="p-5 pt-0">
                <span className="text-[11px] font-bold text-[#1B4D36] bg-[#E0F1E7] px-2.5 py-1 rounded-xl block text-center">
                  വിവാഹ സൽക്കാര വിരുന്ന്
                </span>
              </div>
            </div>

            {/* Dish 4: Unnakaya & Sulaimani */}
            <div className="bg-white rounded-3xl border border-[#EAE4D7] overflow-hidden shadow-card hover:border-[#1B4D36]/50 transition group flex flex-col justify-between">
              <div>
                <div className="h-44 overflow-hidden relative bg-[#E5DDD0]">
                  <img
                    src="https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80"
                    alt="Unnakaya and Sulaimani"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/60 text-amber-200 text-[10px] font-bold backdrop-blur-xs">
                    താനൂർ ചായപ്പീടിക വിഭവങ്ങൾ
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold font-malayalam-serif text-base text-[#1A2420] mb-1.5 group-hover:text-[#1B4D36] transition">
                    ഉന്നക്കായ & സുലൈമാനി
                  </h3>
                  <p className="text-xs text-[#5C6A64] leading-relaxed line-clamp-3">
                    നേന്ത്രപ്പഴം കൊണ്ട് തയ്യാറാക്കുന്ന ഉന്നക്കായയും കടിച്ചികളും താനൂരിലെ സായാഹ്ന കൂട്ടായ്മകളുടെ ലഹരിയായ സുലൈമാനിയും.
                  </p>
                </div>
              </div>
              <div className="p-5 pt-0">
                <span className="text-[11px] font-bold text-[#1B4D36] bg-[#E0F1E7] px-2.5 py-1 rounded-xl block text-center">
                  താനൂർ സായാഹ്ന രുചി
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
                മലപ്പുറം & താനൂർ വാസ്തുവിദ്യയും പൈതൃക കേന്ദ്രങ്ങളും
              </h2>
              <p className="text-xs sm:text-sm text-[#5C6A64] mt-1">
                വെട്ടത്തുനാടൻ തച്ചുശാസ്ത്രവും ഇസ്ലാമിക-കേരളീയ വാസ്തുശിൽപ കലയും ഇഴചേർന്ന അപൂർവ്വ നിർമ്മിതികൾ.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7] p-5 space-y-3">
                <div className="h-40 rounded-xl overflow-hidden bg-[#E5DDD0]">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80"
                    alt="Tanur Valia Kulangara Mosque Woodcraft"
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                </div>
                <h4 className="font-bold text-base text-[#1A2420] font-malayalam-serif">താനൂർ വലിയ കുളങ്ങര പള്ളി</h4>
                <p className="text-xs text-[#5C6A64] leading-relaxed">
                  നൂറ്റാണ്ടുകളുടെ പഴക്കമുള്ള കേരളീയ തച്ചുശാസ്ത്രത്തിൽ തീർത്ത മരപ്പണികളും കൊത്തുപണികളുമുള്ള താനൂരിലെ ചരിത്ര സ്മാരകം.
                </p>
              </div>

              <div className="rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7] p-5 space-y-3">
                <div className="h-40 rounded-xl overflow-hidden bg-[#E5DDD0]">
                  <img
                    src="https://images.unsplash.com/photo-1609137144822-54d9c79e6074?w=800&auto=format&fit=crop&q=80"
                    alt="Keraladeshapuram Temple Architecture"
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                </div>
                <h4 className="font-bold text-base text-[#1A2420] font-malayalam-serif">കേരളാദിത്യപുരം ശ്രീകൃഷ്ണ ക്ഷേത്രം</h4>
                <p className="text-xs text-[#5C6A64] leading-relaxed">
                  താനൂർ മൂച്ചിക്കലിലെ അതിപുരാതന ക്ഷേത്രത്തിലെ കരിങ്കൽ കൊത്തുപണികളും വെട്ടത്തു രാജവംശത്തിന്റെ വാസ്തുവിദ്യാ സംഭാവനകളും.
                </p>
              </div>

              <div className="rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7] p-5 space-y-3">
                <div className="h-40 rounded-xl overflow-hidden bg-[#E5DDD0]">
                  <img
                    src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80"
                    alt="Kottakkal Heritage Nalukettu Architecture"
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                </div>
                <h4 className="font-bold text-base text-[#1A2420] font-malayalam-serif">കോട്ടക്കൽ കൈലാസ മന്ദിരവും നാലുകെട്ടും</h4>
                <p className="text-xs text-[#5C6A64] leading-relaxed">
                  പരമ്പരാഗത നാലുകെട്ട് മാതൃകയിലുള്ള ഔഷധ തോട്ടവും ആര്യവൈദ്യശാലയുടെ പൈതൃക കേന്ദ്രങ്ങളും.
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
