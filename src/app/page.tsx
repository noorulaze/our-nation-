"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { NaaduAiModal } from "@/components/ai/NaaduAiModal";
import { CommunityMap } from "@/components/map/CommunityMap";
import { useLanguage } from "@/lib/i18n/context";
import { useCommunity } from "@/lib/community/context";
import { store } from "@/lib/data/store";
import { 
  Sparkles, 
  Search, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Play,
  Landmark,
  Palmtree,
  BookOpen,
  Handshake,
  Megaphone,
  Mail,
  Send,
  Building,
  AlertTriangle,
  X,
  Share2,
  Clock,
  Phone,
  Eye,
  Volume2,
  VolumeX,
  Info,
  GraduationCap,
  Camera,
  Newspaper
} from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
  imageUrl: string;
  summary: string;
  fullStory: string;
  author: string;
}

interface EventItem {
  id: string;
  title: string;
  category: string;
  dateMonth: string;
  dateDay: string;
  fullDate: string;
  location: string;
  imageUrl: string;
  description: string;
  time: string;
  organizer: string;
}

interface GalleryItem {
  id: string;
  title: string;
  district: string;
  imageUrl: string;
  description: string;
}

const NEWS_DATA: NewsItem[] = [
  {
    id: "tanur-harbour",
    title: "താനൂർ ഫിഷിംഗ് ഹാർബർ ആധുനികവൽക്കരണം: പുതിയ ലേലപ്പുര പൂർത്തിയായി",
    category: "താനൂർ",
    date: "16 നവംബർ 2026",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/31/A_view_of_tanur_harbour.jpg",
    summary: "താനൂർ ഫിഷിംഗ് ഹാർബറിലെ അത്യാധുനിക ലേലപ്പുരയും സോളാർ ശീതീകരണ സംവിധാനവും സജ്ജമായി.",
    fullStory: "മലപ്പുറം തീരദേശത്തിന്റെ ജീവനാഡിയായ താനൂർ ഫിഷിംഗ് ഹാർബറിലെ നവീകരണ പ്രവർത്തനങ്ങൾ അവസാന ഘട്ടത്തിലെത്തി. കേരള ഫിഷറീസ് വകുപ്പും താനൂർ നഗരസഭയും സംയുക്തമായി നടപ്പിലാക്കുന്ന സമഗ്ര പദ്ധതിയിൽ ഹൈടെക് ലേല ഹാൾ, സോളാർ കോൾഡ് സ്റ്റോറേജ്, വിശ്രമ കേന്ദ്രം എന്നിവ പൂർത്തിയായി. അയ്യായിരത്തിലധികം പരമ്പരാഗത മത്സ്യത്തൊഴിലാളി കുടുംബങ്ങൾക്ക് ഇത് നേരിട്ട് പ്രയോജനം ചെയ്യും.",
    author: "നമ്മുടെ നാട് താനൂർ ഡെസ്ക്",
  },
  {
    id: "malappuram-kalolsavam",
    title: "മലപ്പുറം ജില്ലാ സ്കൂൾ കലോത്സവം തിരൂരിൽ സമാപിച്ചു: താനൂർ ഉപജില്ലയ്ക്ക് മികച്ച മുന്നേറ്റം",
    category: "വിദ്യാഭ്യാസം",
    date: "15 നവംബർ 2026",
    imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80",
    summary: "മലപ്പുറം ജില്ലാ സ്കൂൾ കലോത്സവത്തിൽ ദഫ്മുട്ട്, ഒപ്പന, നാടകം ഇനങ്ങളിൽ താനൂർ വിദ്യാലയങ്ങൾക്ക് തിളക്കമാർന്ന വിജയം.",
    fullStory: "തുഞ്ചൻ മണ്ണിൽ അഞ്ച് ദിവസങ്ങളിലായി നടന്ന മലപ്പുറം ജില്ലാ സ്കൂൾ കലോത്സവം സമാപിച്ചു. ജില്ലയിലെ 17 ഉപജില്ലകളിൽ നിന്നുമുള്ള അയ്യായിരത്തിലധികം പ്രതിഭകൾ മാറ്റുരച്ച കലോത്സവത്തിൽ താനൂർ ഉപജില്ലയ്ക്ക് മികച്ച പോയിന്റ് മുന്നേറ്റം. ദേവധാർ ഹയർ സെക്കൻഡറി സ്കൂൾ വിദ്യാർത്ഥികൾ തനതു മാപ്പിള കലകളിൽ ഒന്നാം സ്ഥാനം നേടി.",
    author: "വിദ്യാഭ്യാസ ലേഖകൻ",
  },
  {
    id: "tanur-cleanliness",
    title: "താനൂർ നഗരസഭയിലെ 44 വാർഡുകളിലും സമഗ്ര മാലിന്യ സംസ്കരണ പദ്ധതി",
    category: "തദ്ദേശം",
    date: "14 നവംബർ 2026",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    summary: "താനൂർ നഗരസഭയിലെ 44 വാർഡുകളിലും ഹരിത കർമ്മ സേനയുടെ വീടുതോറുമുള്ള അജൈവ മാലിന്യ ശേഖരണം 100% പൂർത്തിയായി.",
    fullStory: "കേരള തദ്ദേശ സ്വയംഭരണ വകുപ്പിന്റെ ശുചിത്വ പദവി താനൂർ നഗരസഭയ്ക്ക് ലഭിച്ചു. നഗരസഭയിലെ 44 വാർഡുകളിലും ഉറവിട മാലിന്യ സംസ്കരണവും ഹരിത കർമ്മ സേന മുഖേനയുള്ള തരംതിരിച്ച പ്ലാസ്റ്റിക് ശേഖരണവും സമ്പൂർണ്ണ വിജയകരമായി നടപ്പാക്കിയതിനാണ് അംഗീകാരം.",
    author: "നഗരസഭാ വാർത്താ വിഭാഗം",
  },
  {
    id: "malappuram-sevens",
    title: "മലപ്പുറം ജില്ലാ സെവൻസ് ഫുട്ബോൾ ചാമ്പ്യൻഷിപ്പ്: കോട്ടപ്പടിയിൽ ആവേശകരമായ തുടക്കം",
    category: "കായികം",
    date: "13 നവംബർ 2026",
    imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=900&auto=format&fit=crop&q=80",
    summary: "മലപ്പുറത്തിന്റെ കാൽപ്പന്ത് ഹൃദയതുടിപ്പായ സെവൻസ് ഫുട്ബോൾ ടൂർണമെന്റുകൾക്ക് ഫ്ലഡ്‌ലൈറ്റ് വെളിച്ചത്തിൽ കോട്ടപ്പടിയിൽ വിസിൽ മുഴങ്ങി.",
    fullStory: "ഫുട്ബോൾ പ്രേമികളുടെ കാത്തിരിപ്പിന് വിരാമമിട്ട് മലപ്പുറം ജില്ലാ ഓൾ ഇന്ത്യാ സെവൻസ് ഫുട്ബോൾ ടൂർണമെന്റിന് കോട്ടപ്പടി സ്റ്റേഡിയത്തിൽ തുടക്കമായി. പതിനായിരത്തിലധികം കാണികളാണ് ഓരോ ദിവസവും കളികാണാൻ ഒഴുകിയെത്തുന്നത്.",
    author: "സ്പോർട്സ് ഡെസ്ക്",
  },
];

const EVENTS_DATA: EventItem[] = [
  {
    id: "tanur-keraladeshapuram",
    title: "താനൂർ കേരളാദിത്യപുരം വാർഷിക ഉത്സവം",
    category: "സാംസ്കാരികം",
    dateMonth: "Nov",
    dateDay: "20",
    fullDate: "നവംബർ 20, 2026 • 05:00 PM",
    location: "കേരളാദിത്യപുരം ശ്രീകൃഷ്ണ ക്ഷേത്രം, താനൂർ",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/67/Tanur%2C_Malappuram_district.jpg",
    description: "നൂറ്റാണ്ടുകളുടെ പാരമ്പര്യമുള്ള പുരാതന ക്ഷേത്രോത്സവം. പരമ്പരാഗത പഞ്ചവാദ്യം, തായമ്പക, കാഴ്ചശീവേലി, സാംസ്കാരിക കലാപരിപാടികൾ എന്നിവ അരങ്ങേറും.",
    time: "രാവിലെ 06:00 മുതൽ രാത്രി 10:00 വരെ",
    organizer: "കേരളാദിത്യപുരം ക്ഷേത്ര ദേവസ്വം",
  },
  {
    id: "malappuram_sevens_event",
    title: "മലപ്പുറം ജില്ലാ സെവൻസ് ഫുട്ബോൾ",
    category: "കായികം",
    dateMonth: "Nov",
    dateDay: "25",
    fullDate: "നവംബർ 25, 2026 • 06:30 PM",
    location: "കോട്ടപ്പടി സ്റ്റേഡിയം, മലപ്പുറം",
    imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&auto=format&fit=crop&q=80",
    description: "മലപ്പുറത്തിന്റെ കാൽപ്പന്ത് വീര്യം വിളിച്ചോതുന്ന ഓൾ ഇന്ത്യാ സെവൻസ് ഫുട്ബോൾ ടൂർണമെന്റ്. പ്രമുഖ ക്ലബ്ബുകളും അന്താരാഷ്ട്ര താരങ്ങളും അണിനിരക്കുന്നു.",
    time: "വൈകുന്നേരം 6:30 മുതൽ",
    organizer: "ജില്ലാ സ്പോർട്സ് കൗൺസിൽ, മലപ്പുറം",
  },
  {
    id: "thunchan_festival",
    title: "തുഞ്ചൻ ഉത്സവം & സാഹിത്യ സമ്മേളനം",
    category: "സാഹിത്യം",
    dateMonth: "Dec",
    dateDay: "05",
    fullDate: "ഡിസംബർ 05, 2026 • 09:30 AM",
    location: "തുഞ്ചൻ പറമ്പ്, തിരൂർ",
    imageUrl: "https://images.unsplash.com/photo-1548625361-195fe578cb26?w=600&auto=format&fit=crop&q=80",
    description: "ഭാഷാപിതാവ് തുഞ്ചത്തെഴുത്തച്ഛന്റെ സ്മരണയിൽ നടക്കുന്ന ദേശീയ സാഹിത്യ സംവാദം, പുസ്തകോത്സവം, കവി സമ്മേളനം എന്നിവ.",
    time: "രാവിലെ 9:30 മുതൽ വൈകുന്നേരം 7:00 വരെ",
    organizer: "തുഞ്ചൻ സ്മാരക സമിതി",
  },
  {
    id: "tanur_coastal_fest",
    title: "താനൂർ തീരദേശ പൈതൃക സംഗമം",
    category: "മേളകൾ",
    dateMonth: "Dec",
    dateDay: "15",
    fullDate: "ഡിസംബർ 15, 2026 • 04:30 PM",
    location: "താനൂർ ബീച്ച് ഓപ്പൺ സ്റ്റേജ്, താനൂർ",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Tanur_beach%2C_Malappuram_%289%29.jpg",
    description: "താനൂർ തുറമുഖ പൈതൃകവും കടലോര ജീവിതവും ആഘോഷിക്കുന്ന തീരദേശ മേള. ദഫ്മുട്ട്, കോൽക്കളി, മാപ്പിളപ്പാട്ട്, സമുദ്ര വിഭവ ഫുഡ് ഫെസ്റ്റ് എന്നിവ.",
    time: "വൈകുന്നേരം 4:30 മുതൽ",
    organizer: "താനൂർ നഗരസഭ & തീരദേശ കൂട്ടായ്മ",
  },
];

const GALLERY_DATA: GalleryItem[] = [
  {
    id: "tanur-beach",
    title: "താനൂർ തൂവൽതീരവും കടൽത്തീരവും",
    district: "താനൂർ നഗരസഭ",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Tanur_beach%2C_Malappuram_%289%29.jpg",
    description: "അറബിക്കടലിന്റെ തിരമാലകളും സ്വർണ്ണ മണൽത്തരികളും പരമ്പരാഗത വള്ളങ്ങളും നിറഞ്ഞ താനൂർ തീരം.",
  },
  {
    id: "tanur-harbour",
    title: "താനൂർ ഫിഷിംഗ് ഹാർബറും പുലിമുട്ടും",
    district: "താനൂർ നഗരസഭ",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/31/A_view_of_tanur_harbour.jpg",
    description: "മലബാറിലെ പ്രമുഖ സമുദ്ര മത്സ്യബന്ധന തുറമുഖവും കടലിലേക്ക് നീളുന്ന പുലിമുട്ട് നടപ്പാതയും.",
  },
  {
    id: "keraladeshapuram",
    title: "കേരളാദിത്യപുരം ശ്രീകൃഷ്ണ ക്ഷേത്രം",
    district: "താനൂർ, മലപ്പുറം",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/67/Tanur%2C_Malappuram_district.jpg",
    description: "നൂറ്റാണ്ടുകളുടെ ചരിത്രമുള്ള പുരാതന മഹാവിഷ്ണു ക്ഷേത്രവും വെട്ടത്തുനാട് പൈതൃകവും.",
  },
  {
    id: "poorappuzha",
    title: "പൂരപ്പുഴ അഴിമുഖവും കണ്ടൽക്കാടുകളും",
    district: "താനൂർ, മലപ്പുറം",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    description: "പൂരപ്പുഴ അറബിക്കടലിൽ സംഗമിക്കുന്ന അഴിമുഖവും പച്ചപ്പ് നിറഞ്ഞ കണ്ടൽ വനങ്ങളും.",
  },
  {
    id: "mini-ooty",
    title: "മിനി ഊട്ടി ആരിമ്പ്ര മലനിരകൾ",
    district: "മലപ്പുറം",
    imageUrl: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=1200&auto=format&fit=crop&q=85",
    description: "സമുദ്രനിരപ്പിൽ നിന്ന് ആയിരത്തിലധികം അടി ഉയരത്തിലുള്ള പ്രകൃതിരമണീയമായ മലയോര സായാഹ്ന കേന്ദ്രം.",
  },
  {
    id: "thunchan-parambu",
    title: "തുഞ്ചൻ പറമ്പ് സാഹിത്യതീർത്ഥം",
    district: "തിരൂർ, മലപ്പുറം",
    imageUrl: "https://images.unsplash.com/photo-1548625361-195fe578cb26?w=1200&auto=format&fit=crop&q=85",
    description: "മലയാള ഭാഷാപിതാവ് തുഞ്ചത്തെഴുത്തച്ഛന്റെ പൂണ്യഭൂമിയും ചരിത്ര സ്മാരകവും.",
  },
];

export default function HomePage() {
  const { t, language } = useLanguage();
  const { currentCommunity, availableCommunities, setCurrentCommunity } = useCommunity();
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiInitialQuery, setAiInitialQuery] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [showDistrictModal, setShowDistrictModal] = useState(false);

  // Interactive Modals State
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [eventRsvpSuccess, setEventRsvpSuccess] = useState(false);

  const realEvents = store.getEvents(currentCommunity?.id);
  const realBusinesses = store.getBusinesses(currentCommunity?.id);
  const realPlaces = store.getPlaces(currentCommunity?.id);
  const realIssues = store.getIssueReports(currentCommunity?.id);

  const handleOpenAi = (query?: string) => {
    if (query) setAiInitialQuery(query);
    setIsAiModalOpen(true);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSuccess(true);
      setTimeout(() => {
        setNewsletterEmail("");
        setNewsletterSuccess(false);
      }, 3000);
    }
  };

  const handleRsvp = () => {
    setEventRsvpSuccess(true);
    setTimeout(() => {
      setEventRsvpSuccess(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420] selection:bg-[#E0F1E7] selection:text-[#1B4D36]">
      <Navbar onOpenSearchAi={handleOpenAi} />

      <main className="flex-1">
        
        {/* ========================================================================= */}
        {/* 1. HERO BANNER SECTION (Exact Match to Reference Image) */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden pt-4 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="relative rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-elevated border border-[#E7DFD0] min-h-[440px] sm:min-h-[500px] lg:min-h-[540px] flex items-center">
            
            {/* Background Panorama: Sunset over Kerala Backwaters with Houseboat & Coconut Palms */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1800&auto=format&fit=crop&q=85')`,
              }}
            >
              {/* Subtle Sunset & Warm Cream Vignette for readability (Dark overlay on mobile for clear white text) */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-transparent sm:from-[#FAF7F0]/95 sm:via-[#FAF7F0]/70 sm:to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent sm:hidden" />
            </div>

            {/* Left Content */}
            <div className="relative z-10 p-6 sm:p-12 lg:p-16 max-w-2xl">
              
              {/* Locality Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 sm:bg-[#1B4D36]/10 text-amber-300 sm:text-[#1B4D36] text-[11px] font-bold mb-2 backdrop-blur-xs">
                <MapPin className="w-3.5 h-3.5" />
                <span>മലപ്പുറം ജില്ല • താനൂർ നഗരസഭ</span>
              </div>

              {/* Big Malayalam Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-malayalam-serif text-white sm:text-[#1B4D36] tracking-tight leading-none mb-3 drop-shadow-md sm:drop-shadow-none">
                നമ്മുടെ നാട്
              </h1>

              {/* Tagline in Golden Script */}
              <p className="text-lg sm:text-2xl font-bold font-malayalam-script text-amber-300 sm:text-[#B87A1E] mb-3 drop-shadow-sm sm:drop-shadow-none">
                മലപ്പുറത്തിന്റെ പെരുമ... താനൂരിന്റെ പൈതൃകം...
              </p>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-stone-200 sm:text-[#4A5750] leading-relaxed max-w-md font-malayalam-body mb-8 drop-shadow-sm sm:drop-shadow-none">
                മലപ്പുറം ജില്ലയുടെയും താനൂർ നഗരസഭയുടെയും സമഗ്ര വിവരങ്ങളും സാംസ്കാരിക പൈതൃകവും ഒരൊറ്റ ഹൈപ്പർലോക്കൽ വേദിയിൽ.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <Link
                  href="/tanur"
                  className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#1B4D36] hover:bg-[#133A28] text-white font-bold text-xs sm:text-sm transition-all duration-200 active:scale-95 shadow-md flex items-center gap-2 group"
                >
                  <MapPin className="w-4 h-4 text-amber-300" />
                  <span>താനൂർ പ്രൊഫൈൽ</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
                </Link>

                <button
                  type="button"
                  onClick={() => setShowDistrictModal(true)}
                  className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-white/90 hover:bg-white text-[#1B4D36] border border-[#DDD5C5] font-bold text-xs sm:text-sm transition-all duration-200 active:scale-95 shadow-sm flex items-center gap-2 backdrop-blur-xs"
                >
                  <Building className="w-4 h-4 text-[#1B4D36]" />
                  <span>തദ്ദേശ സ്ഥാപനങ്ങൾ</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenAi("താനൂർ നഗരസഭയെയും മലപ്പുറം ജില്ലയെയും കുറിച്ച് പ്രധാന വിവരങ്ങൾ എന്തൊക്കെയാണ്?")}
                  className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-[#EDE6D8] hover:bg-[#E2DAC8] text-[#1B4D36] border border-[#DDD5C5] font-bold text-xs sm:text-sm transition-all duration-200 active:scale-95 shadow-sm flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#B87A1E]" />
                  <span>നാട് AI</span>
                </button>
              </div>

            </div>

            {/* Right side artistic script overlay */}
            <div className="hidden lg:block absolute right-12 top-1/3 z-10 text-right pointer-events-none">
              <span className="font-malayalam-script text-white text-3xl xl:text-4xl font-bold drop-shadow-lg opacity-90 block">
                എന്റെ മലപ്പുറം...
              </span>
              <span className="font-malayalam-script text-white text-3xl xl:text-4xl font-bold drop-shadow-lg opacity-90 block mt-1">
                എന്റെ താനൂർ...
              </span>
            </div>

            {/* Bottom Carousel Indicator Pills */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
              <div className="w-7 h-1.5 rounded-full bg-[#1B4D36]" />
              <div className="w-7 h-1.5 rounded-full bg-[#1B4D36]/40" />
              <div className="w-7 h-1.5 rounded-full bg-[#1B4D36]/40" />
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. QUICK NAVIGATION CATEGORY BAR (Matching Screen 1 2x3 Mobile Cards) */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-12">
          <div className="bg-transparent sm:bg-[#F3EFE6] sm:rounded-2xl sm:border sm:border-[#E5DFD1] sm:shadow-card p-0 sm:p-4">
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 sm:gap-4 sm:divide-x sm:divide-[#E1D9C8]">
              
              {/* 1. പൈതൃകം */}
              <Link
                href="/about"
                className="flex flex-col items-center justify-center text-center p-3 sm:p-2 rounded-2xl sm:rounded-xl bg-white sm:bg-transparent border border-[#EAE4D7] sm:border-0 shadow-xs sm:shadow-none hover:bg-white/80 transition active:scale-95 group"
              >
                <div className="w-10 h-10 sm:w-9 sm:h-9 rounded-full bg-[#E8E1D2] group-hover:bg-[#1B4D36] group-hover:text-white text-[#1B4D36] flex items-center justify-center mb-1.5 transition">
                  <Landmark className="w-4 h-4 sm:w-4 sm:h-4" />
                </div>
                <span className="text-xs sm:text-[11px] font-bold text-[#2A3730] group-hover:text-[#1B4D36] transition font-malayalam-heading">
                  പൈതൃകം
                </span>
              </Link>

              {/* 2. ടൂറിസം */}
              <Link
                href="/gallery"
                className="flex flex-col items-center justify-center text-center p-3 sm:p-2 rounded-2xl sm:rounded-xl bg-white sm:bg-transparent border border-[#EAE4D7] sm:border-0 shadow-xs sm:shadow-none hover:bg-white/80 transition active:scale-95 group"
              >
                <div className="w-10 h-10 sm:w-9 sm:h-9 rounded-full bg-[#E8E1D2] group-hover:bg-[#1B4D36] group-hover:text-white text-[#1B4D36] flex items-center justify-center mb-1.5 transition">
                  <Palmtree className="w-4 h-4 sm:w-4 sm:h-4" />
                </div>
                <span className="text-xs sm:text-[11px] font-bold text-[#2A3730] group-hover:text-[#1B4D36] transition font-malayalam-heading">
                  ടൂറിസം
                </span>
              </Link>

              {/* 3. വിദ്യാഭ്യാസം */}
              <Link
                href="/education"
                className="flex flex-col items-center justify-center text-center p-3 sm:p-2 rounded-2xl sm:rounded-xl bg-white sm:bg-transparent border border-[#EAE4D7] sm:border-0 shadow-xs sm:shadow-none hover:bg-white/80 transition active:scale-95 group"
              >
                <div className="w-10 h-10 sm:w-9 sm:h-9 rounded-full bg-[#E8E1D2] group-hover:bg-[#1B4D36] group-hover:text-white text-[#1B4D36] flex items-center justify-center mb-1.5 transition">
                  <GraduationCap className="w-4 h-4 sm:w-4 sm:h-4" />
                </div>
                <span className="text-xs sm:text-[11px] font-bold text-[#2A3730] group-hover:text-[#1B4D36] transition font-malayalam-heading">
                  വിദ്യാഭ്യാസം
                </span>
              </Link>

              {/* 4. സേവനങ്ങൾ */}
              <Link
                href="/tanur/directory"
                className="flex flex-col items-center justify-center text-center p-3 sm:p-2 rounded-2xl sm:rounded-xl bg-white sm:bg-transparent border border-[#EAE4D7] sm:border-0 shadow-xs sm:shadow-none hover:bg-white/80 transition active:scale-95 group"
              >
                <div className="w-10 h-10 sm:w-9 sm:h-9 rounded-full bg-[#E8E1D2] group-hover:bg-[#1B4D36] group-hover:text-white text-[#1B4D36] flex items-center justify-center mb-1.5 transition">
                  <Building className="w-4 h-4 sm:w-4 sm:h-4" />
                </div>
                <span className="text-xs sm:text-[11px] font-bold text-[#2A3730] group-hover:text-[#1B4D36] transition font-malayalam-heading">
                  സേവനങ്ങൾ
                </span>
              </Link>

              {/* 5. പുതിയ വാർത്തകൾ */}
              <Link
                href="/news"
                className="flex flex-col items-center justify-center text-center p-3 sm:p-2 rounded-2xl sm:rounded-xl bg-white sm:bg-transparent border border-[#EAE4D7] sm:border-0 shadow-xs sm:shadow-none hover:bg-white/80 transition active:scale-95 group cursor-pointer"
              >
                <div className="w-10 h-10 sm:w-9 sm:h-9 rounded-full bg-[#E8E1D2] group-hover:bg-[#1B4D36] group-hover:text-white text-[#1B4D36] flex items-center justify-center mb-1.5 transition">
                  <Newspaper className="w-4 h-4 sm:w-4 sm:h-4" />
                </div>
                <span className="text-xs sm:text-[11px] font-bold text-[#2A3730] group-hover:text-[#1B4D36] transition font-malayalam-heading">
                  പുതിയ വാർത്തകൾ
                </span>
              </Link>

              {/* 6. നമ്മുടെ ആളുകൾ */}
              <Link
                href="/culture"
                className="flex flex-col items-center justify-center text-center p-3 sm:p-2 rounded-2xl sm:rounded-xl bg-white sm:bg-transparent border border-[#EAE4D7] sm:border-0 shadow-xs sm:shadow-none hover:bg-white/80 transition active:scale-95 group"
              >
                <div className="w-10 h-10 sm:w-9 sm:h-9 rounded-full bg-[#E8E1D2] group-hover:bg-[#1B4D36] group-hover:text-white text-[#1B4D36] flex items-center justify-center mb-1.5 transition">
                  <Users className="w-4 h-4 sm:w-4 sm:h-4" />
                </div>
                <span className="text-xs sm:text-[11px] font-bold text-[#2A3730] group-hover:text-[#1B4D36] transition font-malayalam-heading">
                  നമ്മുടെ ആളുകൾ
                </span>
              </Link>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. LATEST UPDATES / NEWS ("പുതിയ വാർത്തകൾ") */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-6 rounded-full bg-[#1B4D36]" />
              <h2 className="text-xl sm:text-2xl font-bold font-malayalam-serif text-[#1A2420]">
                പുതിയ വാർത്തകൾ
              </h2>
            </div>
            <Link
              href="/news"
              className="text-xs font-bold text-[#1B4D36] hover:text-[#133A28] flex items-center gap-1 group"
            >
              <span>എല്ലാം കാണുക</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
            </Link>
          </div>

          {/* 3 Vertical News Cards matching IMAGE 2 Panel 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {NEWS_DATA.slice(0, 3).map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedNews(item)}
                className="bg-white rounded-3xl border border-[#EAE4D7] shadow-card overflow-hidden hover:border-[#1B4D36]/60 transition duration-300 group flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="h-52 overflow-hidden relative">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-[#1B4D36] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-5 sm:p-6">
                    <h3 className="font-bold font-malayalam-serif text-base sm:text-lg text-[#1A2420] group-hover:text-[#1B4D36] transition leading-snug mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#5C6A64] leading-relaxed line-clamp-2">
                      {item.summary}
                    </p>
                  </div>
                </div>
                <div className="px-5 sm:px-6 pb-5 text-[11px] text-[#7A8880] flex items-center justify-between border-t border-[#F3EFE6] pt-3">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#1B4D36]" />
                    <span>{item.date}</span>
                  </div>
                  <span className="text-[#1B4D36] font-bold group-hover:underline flex items-center gap-1 text-[11px]">
                    വായിക്കാം <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Leafy botanical ornamental divider accent from IMAGE 2 Panel 1 */}
          <div className="mt-12 flex items-center justify-center gap-4 text-[#8C9B8E] opacity-75">
            <div className="h-px bg-gradient-to-r from-transparent via-[#C5D0C6] to-transparent flex-1 max-w-xs" />
            <svg className="w-8 h-8 text-[#1B4D36]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 0 0 9-9c0-4.97-4.03-9-9-9-4.97 0-9 4.03-9 9a9 9 0 0 0 9 9z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18" opacity="0.3" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c4 4 4 14 0 18-4-4-4-14 0-18z" />
            </svg>
            <div className="h-px bg-gradient-to-r from-transparent via-[#C5D0C6] to-transparent flex-1 max-w-xs" />
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. FEATURED COMMUNITY / ABOUT ("നമ്മുടെ നാട് കുറിച്ച്") */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="bg-white rounded-3xl border border-[#EAE4D7] shadow-card p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Photo: Traditional Kerala Architecture */}
              <div className="lg:col-span-4 rounded-2xl overflow-hidden shadow-xs h-64 sm:h-72 group">
                <img
                  src="https://images.unsplash.com/photo-1609137144822-54d9c79e6074?w=800&auto=format&fit=crop&q=80"
                  alt="Kerala Palace & Heritage Architecture"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* Center Text */}
              <div className="lg:col-span-4 space-y-4">
                <h3 className="text-2xl font-bold font-malayalam-serif text-[#1A2420]">
                  നമ്മുടെ നാട് കുറിച്ച്
                </h3>
                <p className="text-xs sm:text-sm text-[#5C6A64] leading-relaxed">
                  മലപ്പുറം ജില്ലയുടെയും താനൂർ നഗരസഭയുടെയും സമ്പന്നമായ സാംസ്കാരിക പൈതൃകത്തെയും തീരദേശ ജനതയുടെ ഐക്യത്തെയും പ്രതിനിധീകരിക്കുന്ന ഒരു ഡിജിറ്റൽ വേദിയാണ് &quot;നമ്മുടെ നാട്&quot;.
                </p>
                <div>
                  <Link
                    href="/tanur"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1B4D36] hover:bg-[#133A28] text-white text-xs font-bold transition shadow-xs"
                  >
                    <span>താനൂർ നഗരസഭ കാണുക</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Right Stats Box: 45L+ People, 44 Wards, 100+ Heritage */}
              <div className="lg:col-span-4 bg-[#F2EDE1] rounded-2xl p-6 border border-[#E5DECEx] flex items-center justify-around text-center">
                
                {/* Stat 1 */}
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-[#E5DDD0] text-[#1B4D36] flex items-center justify-center mb-2">
                    <Users className="w-4 h-4" />
                  </div>
                  <span className="text-xl font-bold font-malayalam-serif text-[#1B4D36] leading-none">
                    45L+
                  </span>
                  <span className="text-[11px] font-bold text-[#5C6A64] mt-1">
                    മലപ്പുറം ജനങ്ങൾ
                  </span>
                </div>

                <div className="w-px h-12 bg-[#DFD6C6]" />

                {/* Stat 2 */}
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-[#E5DDD0] text-[#1B4D36] flex items-center justify-center mb-2">
                    <Building className="w-4 h-4" />
                  </div>
                  <span className="text-xl font-bold font-malayalam-serif text-[#1B4D36] leading-none">
                    44
                  </span>
                  <span className="text-[11px] font-bold text-[#5C6A64] mt-1">
                    താനൂർ വാർഡുകൾ
                  </span>
                </div>

                <div className="w-px h-12 bg-[#DFD6C6]" />

                {/* Stat 3 */}
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-[#E5DDD0] text-[#1B4D36] flex items-center justify-center mb-2">
                    <Landmark className="w-4 h-4" />
                  </div>
                  <span className="text-xl font-bold font-malayalam-serif text-[#1B4D36] leading-none">
                    100+
                  </span>
                  <span className="text-[11px] font-bold text-[#5C6A64] mt-1">
                    പൈതൃകങ്ങൾ
                  </span>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. UPCOMING EVENTS & NEWSLETTER ("വരാനിരിക്കുന്ന പരിപാടികൾ") */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-6 rounded-full bg-[#1B4D36]" />
              <h2 className="text-xl sm:text-2xl font-bold font-malayalam-serif text-[#1A2420]">
                വരാനിരിക്കുന്ന പരിപാടികൾ
              </h2>
            </div>
            <Link
              href="/discover?tab=events"
              className="text-xs font-bold text-[#1B4D36] hover:text-[#133A28] flex items-center gap-1 group"
            >
              <span>എല്ലാം കാണുക</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* 4 Event Cards */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {EVENTS_DATA.map((event) => (
                <div 
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  className="bg-white rounded-2xl border border-[#EAE4D7] shadow-card overflow-hidden hover:border-[#1B4D36]/60 transition group cursor-pointer"
                >
                  <div className="h-32 overflow-hidden relative">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                    <div className="absolute top-2 left-2 bg-white/95 rounded-lg px-2.5 py-1 text-center shadow-xs">
                      <span className="text-[9px] uppercase font-bold text-[#7A8680] block leading-none">{event.dateMonth}</span>
                      <span className="text-sm font-bold text-[#1B4D36] block leading-none mt-0.5">{event.dateDay}</span>
                    </div>
                    <span className="absolute top-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
                      {event.category}
                    </span>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-[#1A2420] group-hover:text-[#1B4D36] transition line-clamp-1">
                        {event.title}
                      </h4>
                      <div className="flex items-center gap-1 text-[11px] text-[#7A8680] mt-1">
                        <MapPin className="w-3 h-3 text-[#1B4D36]" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="px-2.5 py-1 rounded-lg bg-[#FAF7F0] hover:bg-[#1B4D36] hover:text-white text-[#1B4D36] text-[11px] font-bold border border-[#E1D9C8] transition flex-shrink-0 ml-2"
                    >
                      വിശദാംശങ്ങൾ
                    </button>
                  </div>
                </div>
              ))}

            </div>

            {/* Right Card: Dark Green Newsletter Subscription Box */}
            <div className="lg:col-span-4 bg-gradient-to-b from-[#1C5139] to-[#123826] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-card">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-amber-200">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="font-bold font-malayalam-serif text-lg leading-snug">
                  ഞങ്ങളുടെ വാർത്തകൾ നിങ്ങളുടെ inbox-ൽ
                </h3>
                <p className="text-xs text-[#C5D6CD] leading-relaxed">
                  ഇപ്പോൾ തന്നെ സബ്സ്ക്രൈബ് ചെയ്യൂ. പ്രധാന പ്രാദേശിക അറിയിപ്പുകളും പരിപാടികളും നിങ്ങൾക്ക് നേരിട്ട് ലഭിക്കും.
                </p>
              </div>

              {newsletterSuccess ? (
                <div className="mt-6 p-3 rounded-xl bg-white/20 text-xs font-semibold text-center text-amber-200 flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>നന്ദി! നിങ്ങളുടെ ഇമെയിൽ വിലാസം രജിസ്റ്റർ ചെയ്തു.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="mt-6 flex items-center relative">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="ഇമെയിൽ വിലാസം..."
                    className="w-full pl-4 pr-12 py-3 rounded-xl bg-white text-xs text-[#1A2420] placeholder-[#7A8880] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 w-9 h-9 rounded-lg bg-[#1B4D36] hover:bg-[#133A28] text-white flex items-center justify-center transition active:scale-95"
                    aria-label="Subscribe"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. EXPLORE KERALA GALLERY ("നമ്മുടെ നാട് ഗാലറി") */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-6 rounded-full bg-[#1B4D36]" />
              <h2 className="text-xl sm:text-2xl font-bold font-malayalam-serif text-[#1A2420]">
                നമ്മുടെ നാട് ഗാലറി
              </h2>
            </div>
            <Link
              href="/discover?tab=places"
              className="text-xs font-bold text-[#1B4D36] hover:text-[#133A28] flex items-center gap-1 group"
            >
              <span>എല്ലാം കാണുക</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            
            {GALLERY_DATA.map((photo) => (
              <div 
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className="h-44 sm:h-52 rounded-2xl overflow-hidden shadow-xs border border-[#EAE4D7] relative group cursor-pointer"
              >
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition p-2.5 flex flex-col justify-end text-white">
                  <span className="text-[11px] font-bold leading-tight">{photo.title}</span>
                  <span className="text-[9px] text-amber-200">{photo.district}</span>
                </div>
              </div>
            ))}

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. INTERACTIVE LOCALITY MAP SECTION (Live Community Discovery) */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 sm:p-8 shadow-card">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-6 rounded-full bg-[#1B4D36]" />
                  <h2 className="text-xl sm:text-2xl font-bold font-malayalam-serif text-[#1A2420]">
                    നമ്മുടെ പ്രദേശത്തിന്റെ ഭൂപടം
                  </h2>
                </div>
                <p className="text-xs text-[#5C6A64] mt-1">
                  പരിപാടികൾ, പ്രാദേശിക സ്ഥാപനങ്ങൾ, പൈതൃക കേന്ദ്രങ്ങൾ, പൊതു പരാതികൾ എന്നിവ ഭൂപടത്തിൽ കാണൂ.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/discover"
                  className="px-4 py-2 rounded-xl bg-[#FAF7F0] hover:bg-[#F3EFE6] border border-[#E1D9C8] text-xs font-bold text-[#1B4D36] flex items-center gap-1.5 transition"
                >
                  <span>വിപുലമായ ഭൂപടം</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="h-80 sm:h-96 w-full rounded-2xl overflow-hidden border border-[#EAE4D7] shadow-inner relative">
              <CommunityMap
                centerLat={currentCommunity?.latitude || 10.0159}
                centerLng={currentCommunity?.longitude || 76.3419}
                events={realEvents}
                businesses={realBusinesses}
                places={realPlaces}
                issues={realIssues}
                className="w-full h-full"
              />
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. COMMUNITY CTA BANNER (Exact Match to Reference Image) */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="bg-[#1B4D36] text-white rounded-3xl p-6 sm:p-10 shadow-elevated relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 border border-[#276449]">
            
            {/* Left Boat Line Illustration */}
            <div className="flex items-center gap-4">
              <svg 
                viewBox="0 0 100 50" 
                className="w-20 sm:w-28 h-12 text-amber-200/80 stroke-current fill-none flex-shrink-0"
              >
                {/* Traditional Kerala Vallam / Boat & Palm trees */}
                <path d="M5 25 C15 15 25 20 40 25 C60 30 85 28 95 20 C85 35 60 40 35 38 C15 35 8 30 5 25 Z" strokeWidth="2" />
                <path d="M15 15 L20 25 M30 14 L35 25 M45 16 L50 26 M60 18 L65 27" strokeWidth="1.5" />
                <path d="M10 20 C10 10 16 5 20 2 M18 5 C15 3 10 4 8 7 M22 5 C25 3 28 5 27 8" strokeWidth="1.5" strokeLinecap="round" />
              </svg>

              {/* Banner Text */}
              <div>
                <p className="font-malayalam-serif font-bold text-base sm:text-xl text-white leading-snug">
                  നമ്മുടെ നാടിനോടൊപ്പം നമുക്കും കൂടാം...
                </p>
                <p className="font-malayalam-serif font-bold text-base sm:text-xl text-amber-200 leading-snug mt-1">
                  ഒരു മികച്ച കേരളത്തിനായി ഒരുമിക്കാം.
                </p>
              </div>
            </div>

            {/* Right Button: Cream Pill */}
            <Link
              href="/register"
              className="px-6 py-3 rounded-full bg-[#FAF7F0] hover:bg-white text-[#1B4D36] font-bold text-xs sm:text-sm transition-all duration-200 active:scale-95 shadow-md flex items-center gap-2 flex-shrink-0 group"
            >
              <span>ഇപ്പോൾ തന്നെ ചേരൂ</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
            </Link>

          </div>
        </section>

      </main>

      {/* ========================================================================= */}
      {/* INTERACTIVE MODALS */}
      {/* ========================================================================= */}

      {/* 1. NEWS ARTICLE DETAIL MODAL */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[#FAF7F0] rounded-3xl border border-[#E7DFD0] max-w-xl w-full shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="relative h-56 w-full flex-shrink-0 bg-neutral-900">
              <img
                src={selectedNews.imageUrl}
                alt={selectedNews.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedNews(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
              <span className="absolute bottom-4 left-4 bg-[#1B4D36] text-white text-xs font-bold px-3 py-1 rounded-full">
                {selectedNews.category}
              </span>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <div className="flex items-center gap-2 text-xs text-[#7A8880] mb-2">
                <Calendar className="w-3.5 h-3.5 text-[#1B4D36]" />
                <span>{selectedNews.date}</span>
                <span>•</span>
                <span>{selectedNews.author}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold font-malayalam-serif text-[#1B4D36] mb-4 leading-snug">
                {selectedNews.title}
              </h2>

              <p className="text-sm text-[#3E4D45] leading-relaxed whitespace-pre-line font-malayalam-body">
                {selectedNews.fullStory}
              </p>

              <div className="mt-6 pt-4 border-t border-[#E5DFD1] flex items-center justify-between">
                <span className="text-xs text-[#7A8880]">നമ്മുടെ നാട് വാർത്താ ശൃംഖല</span>
                <button
                  type="button"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: selectedNews.title, text: selectedNews.summary, url: window.location.href });
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E1D9C8] text-xs font-bold text-[#1B4D36] hover:bg-[#F3EFE6] transition"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>പങ്കുവെക്കുക</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. EVENT DETAIL MODAL */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[#FAF7F0] rounded-3xl border border-[#E7DFD0] max-w-lg w-full shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="relative h-48 w-full flex-shrink-0 bg-neutral-900">
              <img
                src={selectedEvent.imageUrl}
                alt={selectedEvent.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => {
                  setSelectedEvent(null);
                  setEventRsvpSuccess(false);
                }}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute top-4 left-4 bg-white/95 rounded-xl px-3 py-1 text-center shadow-md">
                <span className="text-[10px] uppercase font-bold text-[#7A8680] block">{selectedEvent.dateMonth}</span>
                <span className="text-base font-bold text-[#1B4D36] block">{selectedEvent.dateDay}</span>
              </div>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <span className="text-[11px] font-bold text-[#B87A1E] uppercase tracking-wider bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                {selectedEvent.category}
              </span>

              <h2 className="text-xl font-bold font-malayalam-serif text-[#1B4D36] mt-2 mb-3">
                {selectedEvent.title}
              </h2>

              <div className="space-y-2 text-xs text-[#5C6A64] mb-4 bg-white rounded-xl p-3 border border-[#EAE4D7]">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#1B4D36]" />
                  <span className="font-semibold text-[#1A2420]">{selectedEvent.fullDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#1B4D36]" />
                  <span>{selectedEvent.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#1B4D36]" />
                  <span>{selectedEvent.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#1B4D36]" />
                  <span>സംഘാടനം: {selectedEvent.organizer}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#3E4D45] leading-relaxed mb-6 font-malayalam-body">
                {selectedEvent.description}
              </p>

              {eventRsvpSuccess ? (
                <div className="p-3 rounded-xl bg-[#1B4D36] text-white text-xs font-semibold text-center flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-300" />
                  <span>നിങ്ങളുടെ പങ്കാളിത്തം ഉറപ്പാക്കി! അറിയിപ്പുകൾ ലഭിക്കും.</span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleRsvp}
                    className="flex-1 py-3 rounded-xl bg-[#1B4D36] hover:bg-[#133A28] text-white text-xs font-bold transition shadow-md active:scale-95"
                  >
                    പങ്കെടുക്കാം (RSVP)
                  </button>
                  <Link
                    href={`/discover?tab=events`}
                    className="px-4 py-3 rounded-xl bg-white hover:bg-[#EFE9DD] border border-[#DDD5C5] text-xs font-bold text-[#1B4D36] transition"
                  >
                    കൂടുതൽ പരിപാടികൾ
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. PHOTO LIGHTBOX MODAL */}
      {selectedPhoto && (
        <div 
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="max-w-3xl w-full bg-[#18241E] text-white rounded-3xl overflow-hidden shadow-2xl border border-white/10"
          >
            <div className="relative max-h-[70vh] bg-black flex items-center justify-center">
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                className="max-h-[70vh] w-auto max-w-full object-contain"
              />
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-amber-300 flex items-center gap-1 mb-1">
                  <MapPin className="w-3.5 h-3.5" /> {selectedPhoto.district}
                </span>
                <h3 className="text-lg font-bold font-malayalam-serif">
                  {selectedPhoto.title}
                </h3>
                <p className="text-xs text-white/70 mt-1 max-w-xl">
                  {selectedPhoto.description}
                </p>
              </div>
              <Link
                href="/discover?tab=places"
                className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-xs font-bold text-white transition self-start sm:self-center"
              >
                കൂടുതൽ സ്ഥലങ്ങൾ
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 4. KERALA SCENIC VIDEO SHOWCASE MODAL */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#121A15] text-white rounded-3xl border border-white/15 max-w-3xl w-full shadow-2xl overflow-hidden flex flex-col">
            <div className="p-4 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 text-amber-300 fill-current" />
                <h3 className="font-bold font-malayalam-serif text-sm sm:text-base">
                  നമ്മുടെ നാടിന്റെ സൗന്ദര്യം — കേരളം
                </h3>
              </div>
              <button
                onClick={() => setShowVideoModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Player Display */}
            <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center">
              <video
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                autoPlay
                loop
                muted={isVideoMuted}
                playsInline
                className="w-full h-full object-cover"
              />
              
              {/* Controls Overlay */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsVideoMuted(!isVideoMuted)}
                  className="px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-xs text-white text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  {isVideoMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  <span>{isVideoMuted ? "ശബ്ദം തുറക്കൂ" : "ശബ്ദം നിർത്തൂ"}</span>
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-5 bg-[#17221C] text-xs text-white/80 flex items-center justify-between">
              <span>ദൈവത്തിന്റെ സ്വന്തം നാട് • പച്ചപ്പും കായലോളങ്ങളും നിറഞ്ഞ പ്രകൃതിഭംഗി</span>
              <button
                onClick={() => {
                  setShowVideoModal(false);
                  handleOpenAi("കേരളത്തിലെ പ്രധാന വിനോദസഞ്ചാര കേന്ദ്രങ്ങൾ നിർദ്ദേശിക്കാമോ?");
                }}
                className="text-amber-300 hover:underline font-semibold flex items-center gap-1 text-xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI-യോട് കൂടുതൽ ചോദിക്കാം</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Naadu AI Button */}
      <button
        onClick={() => handleOpenAi()}
        className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-40 px-4 py-3 rounded-full bg-[#1B4D36] hover:bg-[#143B29] text-white shadow-xl flex items-center gap-2 font-semibold text-xs sm:text-sm transition active:scale-95 border border-amber-300/40"
      >
        <Sparkles className="w-4 h-4 text-amber-300" />
        <span>നാട് AI</span>
      </button>

      {/* Naadu AI Assistant Modal */}
      <NaaduAiModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        initialQuery={aiInitialQuery}
      />

      {/* Malappuram Local Bodies Selector Modal */}
      {showDistrictModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[#FAF7F0] rounded-3xl border border-[#E7DFD0] p-6 max-w-lg w-full shadow-2xl">
            <div className="flex items-center justify-between mb-4 border-b border-[#E1D9C8] pb-3">
              <div>
                <h3 className="font-bold font-malayalam-serif text-lg text-[#1B4D36] flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>മലപ്പുറം തദ്ദേശ സ്വയംഭരണ സ്ഥാപനങ്ങൾ</span>
                </h3>
                <p className="text-[11px] text-[#5C6A64] mt-0.5 font-malayalam-body">
                  പ്രധാന നഗരസഭകളും തദ്ദേശ സ്ഥാപനങ്ങളും (നമ്മുടെ നാട് ഹൈപ്പർലോക്കൽ ശൃംഖല)
                </p>
              </div>
              <button
                onClick={() => setShowDistrictModal(false)}
                className="text-xs font-bold text-[#5C6A64] hover:text-[#1A2420] px-2 py-1"
              >
                ✕
              </button>
            </div>

            {/* Featured Tanur Municipality Spotlight Card */}
            <div className="mb-4 p-3.5 rounded-2xl bg-[#E8F2EC] border border-[#C5DEC8]">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#1B4D36] bg-white px-2 py-0.5 rounded-full border border-[#C5DEC8]">
                    Featured Community
                  </span>
                  <h4 className="font-bold font-malayalam-serif text-base text-[#1B4D36] mt-1">
                    താനൂർ നഗരസഭ (Tanur Municipality)
                  </h4>
                  <p className="text-[11px] text-[#3D5E4E] font-malayalam-body">
                    44 വാർഡുകൾ • ചരിത്ര തുറമുഖം • വെട്ടത്തുനാട് പൈതൃകം
                  </p>
                </div>
                <Link
                  href="/tanur"
                  onClick={() => setShowDistrictModal(false)}
                  className="px-3.5 py-2 rounded-xl bg-[#1B4D36] hover:bg-[#143d2b] text-white text-xs font-bold font-malayalam-heading transition shrink-0 ml-3"
                >
                  പ്രൊഫൈൽ
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { name: "താനൂർ നഗരസഭ", slug: "tanur", desc: "44 വാർഡുകൾ (Primary)" },
                { name: "തിരൂർ നഗരസഭ", slug: "tirur", desc: "തുഞ്ചൻ പറമ്പ്" },
                { name: "മലപ്പുറം മുനിസിപ്പാലിറ്റി", slug: "malappuram", desc: "ജില്ലാ ആസ്ഥാനം" },
                { name: "കോട്ടക്കൽ നഗരസഭ", slug: "kottakkal", desc: "ആയുർവേദ നഗരം" },
                { name: "പൊന്നാനി നഗരസഭ", slug: "ponnani", desc: "പൈതൃക തുറമുഖം" },
                { name: "മഞ്ചേരി നഗരസഭ", slug: "manjeri", desc: "വാണിജ്യ കേന്ദ്രം" },
                { name: "പരപ്പനങ്ങാടി നഗരസഭ", slug: "parappanangadi", desc: "തീരദേശ നഗരം" },
                { name: "കൊണ്ടോട്ടി നഗരസഭ", slug: "kondotty", desc: "വിമാനത്താവളം" }
              ].map((locality) => (
                <Link
                  key={locality.slug}
                  href={locality.slug === "tanur" ? "/tanur" : `/discover?locality=${encodeURIComponent(locality.name)}`}
                  onClick={() => setShowDistrictModal(false)}
                  className={`p-3 rounded-xl border font-semibold transition text-left flex flex-col justify-between ${
                    locality.slug === "tanur" 
                      ? "bg-[#1B4D36] text-white border-[#1B4D36]" 
                      : "bg-white hover:bg-[#EFE9DD] border-[#EAE4D7] text-[#2A3730]"
                  }`}
                >
                  <span className="font-bold">{locality.name}</span>
                  <span className={`text-[10px] mt-0.5 ${locality.slug === "tanur" ? "text-amber-300" : "text-[#7A8880]"}`}>
                    {locality.desc}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
      <BottomNav />
    </div>
  );
}
