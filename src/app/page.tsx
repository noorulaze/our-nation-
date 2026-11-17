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
    id: "kerala-today",
    title: "കേരളം: ഇന്ന് അറിയേണ്ട കാര്യങ്ങൾ",
    category: "കേരളം",
    date: "16 നവംബർ 2026",
    imageUrl: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=900&auto=format&fit=crop&q=80",
    summary: "സംസ്ഥാനത്തെ പ്രധാന വികസന വാർത്തകളും പ്രധാന വിവരങ്ങളും ഒറ്റനോട്ടത്തിൽ അറിയാം. പുതിയ ഗതാഗത പദ്ധതികൾ പുരോഗമിക്കുന്നു.",
    fullStory: "സംസ്ഥാനത്തെ പ്രധാന നഗരങ്ങളിലും ഗ്രാമങ്ങളിലും അടിസ്ഥാന സൗകര്യ വികസനത്തിന് പുതിയ ഊർജ്ജം പകർന്ന് നിരവധി പദ്ധതികൾക്ക് ഇന്ന് തുടക്കമായി. റോഡ് നവീകരണം, ശുദ്ധജല വിതരണം, പരിസ്ഥിതി സൗഹൃദ പൊതുഗതാഗതം എന്നിവയ്ക്ക് മുൻഗണന നൽകിയാണ് പദ്ധതികൾ ആവിഷ്കരിച്ചിരിക്കുന്നത്.",
    author: "നമ്മുടെ നാട് വാർത്താ വിഭാഗം",
  },
  {
    id: "plus-two",
    title: "+2 പരീക്ഷയ്ക്ക് തയാറെടുക്കുന്ന വിദ്യാർഥികൾ ശ്രദ്ധിക്കുക...",
    category: "വിദ്യാഭ്യാസം",
    date: "15 നവംബർ 2026",
    imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80",
    summary: "ഹയർ സെക്കൻഡറി പരീക്ഷകൾക്കുള്ള ക്രമീകരണങ്ങളും മോഡൽ പരീക്ഷാ ടൈംടേബിളും പ്രഖ്യാപിച്ചു. വിദ്യാർഥികൾക്കായുള്ള ഹെൽപ്പ് ഡെസ്ക് തുടങ്ങി.",
    fullStory: "സംസ്ഥാനത്തെ ഹയർ സെക്കൻഡറി പരീക്ഷകൾക്കുള്ള അന്തിമ ഒരുക്കങ്ങൾ പൂർത്തിയായതായി പൊതുവിദ്യാഭ്യാസ വകുപ്പ് അറിയിച്ചു. മോഡൽ പരീക്ഷകൾ അടുത്ത മാസം ആരംഭിക്കും. വിദ്യാർത്ഥികൾക്ക് പരീക്ഷാ ഭയം അകറ്റാനും സംശയ നിവാരണത്തിനുമായി പ്രത്യേക കൗൺസിലിംഗ് ഹെൽപ്പ് ലൈൻ സൗകര്യവും ആരംഭിച്ചിട്ടുണ്ട്.",
    author: "വിദ്യാഭ്യാസ ലേഖകൻ",
  },
  {
    id: "pooram",
    title: "തൃശ്ശൂർ പൂരം താലപ്പൊലി...",
    category: "ഉത്സവങ്ങൾ",
    date: "14 നവംബർ 2026",
    imageUrl: "https://images.unsplash.com/photo-1599818816942-8c1055728a50?w=600&auto=format&fit=crop&q=80",
    summary: "സാംസ്കാരിക കേരളത്തിന്റെ മാമാങ്കമായ തൃശ്ശൂർ പൂരത്തിന് കൊടിയേറി. താളമേളങ്ങളുടെ വിസ്മയമൊരുക്കാൻ നാടും നഗരവും ഒരുങ്ങി.",
    fullStory: "കേരളത്തിന്റെ സാംസ്കാരിക തലസ്ഥാനത്ത് പൂരപ്രേമികളുടെ ഹൃദയമിടിപ്പേറ്റിക്കൊണ്ട് തൃശ്ശൂർ പൂരത്തിന് കൊടിയേറി. ഘടകക്ഷേത്രങ്ങളിൽ നിന്നുള്ള എഴുന്നള്ളിപ്പുകളും പാറമേക്കാവ്-തിരുവമ്പാടി വിഭാഗങ്ങളുടെ മേള വിസ്മയവും ഇലഞ്ഞിത്തറ മേളവും കുടമാറ്റവും കാണാൻ നാടൊന്നാകെ ഒരുങ്ങിക്കഴിഞ്ഞു.",
    author: "സാംസ്കാരിക വിഭാഗം",
  },
  {
    id: "ksrtc",
    title: "കേരളത്തിൽ പുതിയ ബസ് സർവീസുകൾക്ക് തുടക്കമായി",
    category: "ഗതാഗതം",
    date: "13 നവംബർ 2026",
    imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=900&auto=format&fit=crop&q=80",
    summary: "സംസ്ഥാനത്ത് കൂടുതൽ പ്രദേശങ്ങളിലേക്ക് പുതിയ ബസ് സർവീസുകൾ ആരംഭിച്ചു. ഗ്രാമീണ റൂട്ടുകളിൽ കൂടുതൽ യാത്രാസൗകര്യം ലഭ്യമാക്കുകയാണ് ലക്ഷ്യം.",
    fullStory: "സംസ്ഥാനത്ത് കൂടുതൽ ഗ്രാമീണ, നഗര പ്രദേശങ്ങളിലേക്ക് പുതിയ ഇലക്ട്രിക്, ഫാസ്റ്റ് പാസഞ്ചർ ബസ് സർവീസുകൾ ആരംഭിച്ചു.",
    author: "നമ്മുടെ നാട് വാർത്താ വിഭാഗം",
  },
];

const EVENTS_DATA: EventItem[] = [
  {
    id: "keralotsavam",
    title: "കേരളോത്സവം 2026",
    category: "സാംസ്കാരികം",
    dateMonth: "Nov",
    dateDay: "20",
    fullDate: "നവംബർ 20, 2026 • 05:00 PM",
    location: "മറൈൻ ഡ്രൈവ് ഗ്രൗണ്ട്, കൊച്ചി",
    imageUrl: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&auto=format&fit=crop&q=80",
    description: "സാംസ്കാരിക സമ്മേളനവും തനതു നാടൻ കലകളുടെ അരങ്ങേറ്റവും. കേരളത്തിലെ 14 ജില്ലകളിൽ നിന്നുള്ള കലാകാരന്മാരുടെ ചെണ്ടമേളം, തെയ്യം, കഥകളി പ്രദർശനം എന്നിവ നടക്കും.",
    time: "വൈകുന്നേരം 5:00 മുതൽ രാത്രി 10:00 വരെ",
    organizer: "കൊച്ചി സാംസ്കാരിക കൂട്ടായ്മ",
  },
  {
    id: "ai_seminar",
    title: "AI & വിദ്യാഭ്യാസം സെമിനാർ",
    category: "വിദ്യാഭ്യാസം",
    dateMonth: "Nov",
    dateDay: "25",
    fullDate: "നവംബർ 25, 2026 • 10:00 AM",
    location: "സെനറ്റ് ഹാൾ, തിരുവനന്തപുരം",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80",
    description: "നിർമ്മിത ബുദ്ധി എങ്ങനെ വിദ്യാർത്ഥികളുടെയും അധ്യാപകരുടെയും പഠന രീതിയെ പരിവർത്തനം ചെയ്യുന്നു എന്നതിനെക്കുറിച്ചുള്ള വിദഗ്ദ്ധ ചർച്ചയും വർക്ക്ഷോപ്പും.",
    time: "രാവിലെ 10:00 മുതൽ ഉച്ചക്ക് 1:30 വരെ",
    organizer: "കേരള ഇന്നൊവേഷൻ കൗൺസിൽ",
  },
  {
    id: "sangeethotsavam",
    title: "കേരള സംഗീതോത്സവം",
    category: "കല & സംഗീതം",
    dateMonth: "Nov",
    dateDay: "28",
    fullDate: "നവംബർ 28, 2026 • 06:00 PM",
    location: "ടാഗോർ സെന്റിനറി ഹാൾ, കോഴിക്കോട്",
    imageUrl: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=600&auto=format&fit=crop&q=80",
    description: "ശാസ്‌ത്രീയ സംഗീതവും ഗസലുകളും കേരളീയ നാടൻ പാട്ടുകളും കോർത്തിണക്കിയ ഗംഭീര സംഗീത സന്ധ്യ. പ്രമുഖ പിന്നണി ഗായകർ പങ്കെടുക്കുന്നു.",
    time: "വൈകുന്നേരം 6:00 മുതൽ",
    organizer: "കോഴിക്കോട് സംഗീത സഭ",
  },
  {
    id: "sports_meet",
    title: "ജില്ലാതല കായികമേള",
    category: "കായികം",
    dateMonth: "Dec",
    dateDay: "02",
    fullDate: "ഡിസംബർ 02, 2026 • 08:30 AM",
    location: "കോട്ടപ്പടി സ്റ്റേഡിയം, മലപ്പുറം",
    imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&auto=format&fit=crop&q=80",
    description: "ഫുട്ബോൾ, അത്‌ലറ്റിക്സ് എന്നിവ ഉൾപ്പെടുന്ന പ്രാദേശിക കായിക പ്രതിഭകളുടെ വാർഷിക ജില്ലാ മത്സരങ്ങൾ. 2000-ലധികം കായികതാരങ്ങൾ പങ്കെടുക്കുന്നു.",
    time: "രാവിലെ 8:30 മുതൽ വൈകുന്നേരം 6:00 വരെ",
    organizer: "ജില്ലാ സ്പോർട്സ് കൗൺസിൽ",
  },
];

const GALLERY_DATA: GalleryItem[] = [
  {
    id: "kovalam",
    title: "കോവളം & വർക്കല തീരങ്ങൾ",
    district: "തിരുവനന്തപുരം",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=85",
    description: "അറബിക്കടലിന്റെ ശാന്തതയും സ്വർണ്ണ മണൽത്തരികളും നിറഞ്ഞ കേരളത്തിന്റെ വിഖ്യാത തീരദേശ സൗന്ദര്യം.",
  },
  {
    id: "backwaters",
    title: "ആലപ്പുഴ കായലോളങ്ങൾ",
    district: "ആലപ്പുഴ",
    imageUrl: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1200&auto=format&fit=crop&q=85",
    description: "കെട്ടുവള്ളങ്ങളും പച്ചപ്പ് നിറഞ്ഞ തുരുത്തുകളും ഇടകലർന്ന കിഴക്കിന്റെ വെനീസ്.",
  },
  {
    id: "heritage",
    title: "പൈതൃക വാസ്തുവിദ്യ",
    district: "മധ്യകേരളം",
    imageUrl: "https://images.unsplash.com/photo-1548625361-195fe578cb26?w=1200&auto=format&fit=crop&q=85",
    description: "കേരളത്തിന്റെ പരമ്പരാഗത തച്ചുശാസ്ത്രവും പൈതൃക ശൈലിയും ഒത്തുചേരുന്ന ചരിത്ര സ്മാരകം.",
  },
  {
    id: "munnar",
    title: "മൂന്നാർ മലനിരകൾ",
    district: "ഇടുക്കി",
    imageUrl: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=1200&auto=format&fit=crop&q=85",
    description: "കോടമഞ്ഞും പച്ചപ്പട്ടു വിരിച്ച തേയിലത്തോട്ടങ്ങളും സംഗമിക്കുന്ന ദൈവത്തിന്റെ സ്വന്തം നാട്ടിലെ മലയോര സുന്ദരി.",
  },
  {
    id: "sunrise",
    title: "കായൽക്കരയിലെ പ്രഭാതം",
    district: "കുമരകം / കോട്ടയം",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=85",
    description: "വേമ്പനാട്ടു കായൽപ്പരപ്പിൽ ഉദിച്ചുയരുന്ന പുലർകാല സൂര്യകിരണങ്ങളും നാടൻ വള്ളങ്ങളും.",
  },
  {
    id: "kathakali",
    title: "കഥകളി — തനതു കലാരൂപം",
    district: "തൃശ്ശൂർ",
    imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&auto=format&fit=crop&q=85",
    description: "ഭാവസാന്ദ്രമായ മുദ്രകളും വർണ്ണാഭമായ വേഷവിധാനങ്ങളും ചേർന്ന കേരളത്തിന്റെ ശാസ്ത്രീയ ദൃശ്യവിസ്മയം.",
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
              
              {/* Big Malayalam Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-malayalam-serif text-white sm:text-[#1B4D36] tracking-tight leading-none mb-3 drop-shadow-md sm:drop-shadow-none">
                നമ്മുടെ നാട്
              </h1>

              {/* Tagline in Golden Script */}
              <p className="text-lg sm:text-2xl font-bold font-malayalam-script text-amber-300 sm:text-[#B87A1E] mb-3 drop-shadow-sm sm:drop-shadow-none">
                നമ്മുടെ നാട്... നമ്മുടെ അഭിമാനം...
              </p>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-stone-200 sm:text-[#4A5750] leading-relaxed max-w-md font-malayalam-body mb-8 drop-shadow-sm sm:drop-shadow-none">
                കേരളത്തിന്റെ മനോഹാരിതയും, സംസ്കാരവും, വിവരങ്ങളും ഒറ്റ വേദിയിൽ.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <Link
                  href="/about"
                  className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#1B4D36] hover:bg-[#133A28] text-white font-bold text-xs sm:text-sm transition-all duration-200 active:scale-95 shadow-md flex items-center gap-2 group"
                >
                  <span>കൂടുതൽ അറിയാം</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
                </Link>

                <button
                  type="button"
                  onClick={() => setShowVideoModal(true)}
                  className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-white/90 hover:bg-white text-[#1B4D36] border border-[#DDD5C5] font-bold text-xs sm:text-sm transition-all duration-200 active:scale-95 shadow-sm flex items-center gap-2 backdrop-blur-xs"
                >
                  <div className="w-5 h-5 rounded-full bg-[#1B4D36] text-white flex items-center justify-center">
                    <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                  </div>
                  <span>വിവരങ്ങൾ കാണുക</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenAi("കേരളത്തിലെ പ്രധാന വിവരങ്ങളും വിശേഷങ്ങളും എന്തൊക്കെയാണ്?")}
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
                എന്റെ നാട്...
              </span>
              <span className="font-malayalam-script text-white text-3xl xl:text-4xl font-bold drop-shadow-lg opacity-90 block mt-1">
                എന്റെ അഭിമാനം...
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
                  കേരളത്തിന്റെ മനോഹാരിതയും, സംസ്കാരത്തെയും, ജനങ്ങളുടെ ഐക്യത്തെയും പ്രതിനിധീകരിക്കുന്ന ഒരു ഡിജിറ്റൽ വേദിയാണ് &quot;നമ്മുടെ നാട്&quot;.
                </p>
                <div>
                  <Link
                    href="/community"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1B4D36] hover:bg-[#133A28] text-white text-xs font-bold transition shadow-xs"
                  >
                    <span>കൂടുതൽ അറിയാം</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Right Stats Box: 1Cr+ People, 14 Districts, 1000+ Heritage */}
              <div className="lg:col-span-4 bg-[#F2EDE1] rounded-2xl p-6 border border-[#E5DECEx] flex items-center justify-around text-center">
                
                {/* Stat 1 */}
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-[#E5DDD0] text-[#1B4D36] flex items-center justify-center mb-2">
                    <Users className="w-4 h-4" />
                  </div>
                  <span className="text-xl font-bold font-malayalam-serif text-[#1B4D36] leading-none">
                    1Cr+
                  </span>
                  <span className="text-[11px] font-bold text-[#5C6A64] mt-1">
                    ജനങ്ങൾ
                  </span>
                </div>

                <div className="w-px h-12 bg-[#DFD6C6]" />

                {/* Stat 2 */}
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-[#E5DDD0] text-[#1B4D36] flex items-center justify-center mb-2">
                    <Building className="w-4 h-4" />
                  </div>
                  <span className="text-xl font-bold font-malayalam-serif text-[#1B4D36] leading-none">
                    14
                  </span>
                  <span className="text-[11px] font-bold text-[#5C6A64] mt-1">
                    ജില്ലകൾ
                  </span>
                </div>

                <div className="w-px h-12 bg-[#DFD6C6]" />

                {/* Stat 3 */}
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-[#E5DDD0] text-[#1B4D36] flex items-center justify-center mb-2">
                    <Landmark className="w-4 h-4" />
                  </div>
                  <span className="text-xl font-bold font-malayalam-serif text-[#1B4D36] leading-none">
                    1000+
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

      {/* Districts Selector Modal */}
      {showDistrictModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[#FAF7F0] rounded-3xl border border-[#E7DFD0] p-6 max-w-lg w-full shadow-2xl">
            <div className="flex items-center justify-between mb-4 border-b border-[#E1D9C8] pb-3">
              <h3 className="font-bold font-malayalam-serif text-lg text-[#1B4D36] flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>കേരളത്തിലെ 14 ജില്ലകൾ</span>
              </h3>
              <button
                onClick={() => setShowDistrictModal(false)}
                className="text-xs font-bold text-[#5C6A64] hover:text-[#1A2420] px-2 py-1"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                "തിരുവനന്തപുരം", "കൊല്ലം", "പത്തനംതിട്ട", "ആലപ്പുഴ",
                "കോട്ടയം", "ഇടുക്കി", "എറണാകുളം", "തൃശ്ശൂർ",
                "പാലക്കാട്", "മലപ്പുറം", "കോഴിക്കോട്", "വയനാട്",
                "കണ്ണൂർ", "കാസർഗോഡ്"
              ].map((district) => (
                <Link
                  key={district}
                  href={`/discover?district=${encodeURIComponent(district)}`}
                  onClick={() => setShowDistrictModal(false)}
                  className="px-3 py-2 rounded-xl bg-white hover:bg-[#EFE9DD] border border-[#EAE4D7] font-semibold text-[#2A3730] transition text-center"
                >
                  {district}
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
