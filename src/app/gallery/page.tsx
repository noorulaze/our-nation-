"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/lib/i18n/context";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { 
  Camera, 
  MapPin, 
  X, 
  Share2, 
  Download, 
  Heart, 
  Sparkles,
  Maximize2,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface GalleryPhoto {
  id: string;
  title: string;
  category: "പ്രകൃതി" | "പൈതൃകം" | "സംസ്കാരം" | "ഉത്സവങ്ങൾ" | "ജനങ്ങൾ" | "വാസ്തുവിദ്യ" | "ഗ്രാമീണ ജീവിതം";
  district: string;
  imageUrl: string;
  description: string;
}

const KERALA_GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "munnar-tea",
    title: "മൂന്നാർ തേയില മലനിരകൾ",
    category: "പ്രകൃതി",
    district: "ഇടുക്കി",
    imageUrl: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=1200&auto=format&fit=crop&q=85",
    description: "കോടമഞ്ഞും ഹരിതഭംഗിയും പുതച്ചുനിൽക്കുന്ന മൂന്നാറിന്റെ പ്രകൃതി രമണീയമായ തേയിലത്തോട്ടങ്ങൾ.",
  },
  {
    id: "alappuzha-houseboat",
    title: "ആലപ്പുഴ കായലോളങ്ങൾ",
    category: "പ്രകൃതി",
    district: "ആലപ്പുഴ",
    imageUrl: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&auto=format&fit=crop&q=85",
    description: "വേമ്പനാട്ട് കായലിലൂടെ ഒഴുകിനീങ്ങുന്ന പരമ്പരാഗത കെട്ടുവള്ളങ്ങളും തെങ്ങിൻതോപ്പുകളും.",
  },
  {
    id: "sunset-backwaters",
    title: "കായൽത്തീരത്തെ സൂര്യാസ്തമയം",
    category: "പ്രകൃതി",
    district: "കുമരകം / കോട്ടയം",
    imageUrl: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1200&auto=format&fit=crop&q=85",
    description: "കായൽപ്പരപ്പിൽ സ്വർണ്ണവർണ്ണം വിതറി അസ്തമിക്കുന്ന സൂര്യനും തുരുത്തുകളും.",
  },
  {
    id: "heritage-basilica",
    title: "പൈതൃക ദേവാലയം",
    category: "പൈതൃകം",
    district: "മധ്യകേരളം",
    imageUrl: "https://images.unsplash.com/photo-1548625361-195fe578cb26?w=1200&auto=format&fit=crop&q=85",
    description: "നൂറ്റാണ്ടുകളുടെ പഴക്കമുള്ള കേരളീയ വാസ്തുവിദ്യയിൽ തീർത്ത പുരാതന പൈതൃക സ്മാരകം.",
  },
  {
    id: "athirappilly-falls",
    title: "അതിരപ്പള്ളി വെള്ളച്ചാട്ടം",
    category: "പ്രകൃതി",
    district: "തൃശ്ശൂർ",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=85",
    description: "ഇന്ത്യയുടെ നയാഗ്ര എന്നറിയപ്പെടുന്ന ചാലക്കുടിപ്പുഴയിലെ ഗംഭീരമായ ജലപാതം.",
  },
  {
    id: "kovalam-beach",
    title: "കോവളം ലൈറ്റ് ഹൗസ് തീരം",
    category: "പ്രകൃതി",
    district: "തിരുവനന്തപുരം",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=85",
    description: "ചുവപ്പും വെളുപ്പും ചായമടിച്ച ലൈറ്റ് ഹൗസും അറബിക്കടലിന്റെ തിരമാലകളും.",
  },
  {
    id: "kathakali-mudra",
    title: "കഥകളി ഭാവങ്ങൾ",
    category: "സംസ്കാരം",
    district: "തൃശ്ശൂർ",
    imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&auto=format&fit=crop&q=85",
    description: "ഭാവഹാവാദികളും നവരസങ്ങളും തുളുമ്പുന്ന കേരളത്തിന്റെ വിശ്വപ്രസിദ്ധ ശാസ്ത്രീയ കലാരൂപം.",
  },
  {
    id: "thrissur-pooram-kudamattam",
    title: "തൃശ്ശൂർ പൂരം കുടമാറ്റം",
    category: "ഉത്സവങ്ങൾ",
    district: "തൃശ്ശൂർ",
    imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&auto=format&fit=crop&q=85",
    description: "തേക്കിൻകാട് മൈതാനത്ത് തിങ്ങിനിറഞ്ഞ ജനസാഗരത്തിന് മുന്നിൽ വിരിയുന്ന വർണ്ണക്കുടകൾ.",
  },
  {
    id: "temple-architecture",
    title: "കേരളീയ വാസ്തുശില്പകല",
    category: "വാസ്തുവിദ്യ",
    district: "പത്മനാഭപുരം",
    imageUrl: "https://images.unsplash.com/photo-1609137144822-54d9c79e6074?w=1200&auto=format&fit=crop&q=85",
    description: "തടികൊണ്ടുള്ള മേൽക്കൂരയും ചുവർച്ചിത്രങ്ങളും നിറഞ്ഞ തനതു വാസ്തുശിൽപ പാരമ്പര്യം.",
  },
  {
    id: "coastal-fishermen",
    title: "തീരദേശത്തെ മീൻപിടുത്തക്കാർ",
    category: "ജനങ്ങൾ",
    district: "താനൂർ / തീരദേശം",
    imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&auto=format&fit=crop&q=85",
    description: "അറബിക്കടലിന്റെ തിരമാലകളോട് പടവെട്ടി നാടിന് അന്നമേകുന്ന അധ്വാനശാലികളായ പരമ്പരാഗത മത്സ്യത്തൊഴിലാളികൾ.",
  },
  {
    id: "village-paddy",
    title: "ഗ്രാമീണ നെൽപ്പാടങ്ങൾ",
    category: "ഗ്രാമീണ ജീവിതം",
    district: "പാലക്കാട് / കുട്ടനാട്",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=85",
    description: "പച്ചപ്പട്ടുവിരിച്ച നെൽപ്പാടങ്ങളും വരമ്പിലൂടെയുള്ള നാടൻ വഴികളും ചേർന്ന ഗ്രാമീണ തനിമ.",
  },
];

export default function GalleryPage() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("എല്ലാം");
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);
  const [likedPhotoIds, setLikedPhotoIds] = useState<string[]>([]);

  const categories = [
    "എല്ലാം", 
    "പ്രകൃതി", 
    "പൈതൃകം", 
    "സംസ്കാരം", 
    "ഉത്സവങ്ങൾ", 
    "ജനങ്ങൾ", 
    "വാസ്തുവിദ്യ", 
    "ഗ്രാമീണ ജീവിതം"
  ];

  const filteredPhotos = selectedCategory === "എല്ലാം"
    ? KERALA_GALLERY_PHOTOS
    : KERALA_GALLERY_PHOTOS.filter((p) => p.category === selectedCategory);

  const toggleLike = (id: string) => {
    if (likedPhotoIds.includes(id)) {
      setLikedPhotoIds(likedPhotoIds.filter((item) => item !== id));
    } else {
      setLikedPhotoIds([...likedPhotoIds, id]);
    }
  };

  const currentIndex = activePhoto ? filteredPhotos.findIndex((p) => p.id === activePhoto.id) : -1;
  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (filteredPhotos.length === 0) return;
    const newIdx = currentIndex > 0 ? currentIndex - 1 : filteredPhotos.length - 1;
    setActivePhoto(filteredPhotos[newIdx]);
  };
  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (filteredPhotos.length === 0) return;
    const newIdx = currentIndex < filteredPhotos.length - 1 ? currentIndex + 1 : 0;
    setActivePhoto(filteredPhotos[newIdx]);
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activePhoto) return;
      if (e.key === "Escape") setActivePhoto(null);
      if (e.key === "ArrowLeft") {
        const newIdx = currentIndex > 0 ? currentIndex - 1 : filteredPhotos.length - 1;
        setActivePhoto(filteredPhotos[newIdx]);
      }
      if (e.key === "ArrowRight") {
        const newIdx = currentIndex < filteredPhotos.length - 1 ? currentIndex + 1 : 0;
        setActivePhoto(filteredPhotos[newIdx]);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhoto, currentIndex, filteredPhotos]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
          <Breadcrumbs items={[{ label: "ഗാലറി (Gallery)" }]} />
        </div>
        
        {/* ========================================================================= */}
        {/* HERO BANNER: Row 3, Col 1 in reference image (Camera Icon + Landscape) */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden pt-2 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="relative rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-elevated border border-[#E7DFD0] min-h-[340px] sm:min-h-[380px] flex items-center bg-[#193225]">
            
            {/* Background Panorama: Scenic Green Landscape */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=1600&auto=format&fit=crop&q=85')`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#12281D] via-[#12281D]/80 to-transparent" />
            </div>

            {/* Left Content */}
            <div className="relative z-10 p-6 sm:p-12 lg:p-16 max-w-2xl text-white">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-amber-200">
                  <Camera className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-amber-200 uppercase tracking-wider">
                  ദൃശ്യവിസ്മയം
                </span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-bold font-malayalam-serif tracking-tight leading-none mb-3">
                ഗാലറി
              </h1>
              <p className="text-xl sm:text-2xl font-bold font-malayalam-script text-amber-200 mb-3">
                നാടിന്റെ മനോഹര കാഴ്ച്ചകൾ...
              </p>
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-malayalam-body max-w-md">
                ദൈവത്തിന്റെ സ്വന്തം നാടായ കേരളത്തിന്റെ കടലോരങ്ങൾ, കായലോളങ്ങൾ, മലനിരകൾ, പൈതൃക സ്മാരകങ്ങൾ എന്നിവയുടെ ചിത്രസഞ്ചയം.
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
        {/* PHOTO GRID GALLERY (Row 3, Col 1 in reference image — 2-Col Mobile Grid) */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {filteredPhotos.map((photo) => {
              const isLiked = likedPhotoIds.includes(photo.id);
              return (
                <div
                  key={photo.id}
                  onClick={() => setActivePhoto(photo)}
                  className="bg-white rounded-2xl sm:rounded-3xl border border-[#EAE4D7] shadow-card overflow-hidden hover:border-[#1B4D36]/60 transition cursor-pointer group flex flex-col justify-between"
                >
                  <div className="h-36 sm:h-64 overflow-hidden relative bg-[#E5DDD0]">
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition p-2.5 sm:p-4 flex items-end justify-between text-white">
                      <div>
                        <span className="text-[9px] sm:text-[10px] text-amber-200 font-bold block">{photo.district}</span>
                        <span className="text-xs sm:text-sm font-bold truncate max-w-[120px] sm:max-w-none">{photo.title}</span>
                      </div>
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center">
                        <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="p-2.5 sm:p-4 flex items-center justify-between">
                    <div className="min-w-0 pr-1">
                      <h3 className="font-bold font-malayalam-serif text-xs sm:text-sm text-[#1A2420] group-hover:text-[#1B4D36] transition truncate">
                        {photo.title}
                      </h3>
                      <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-[#7A8880] mt-0.5">
                        <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#1B4D36] shrink-0" />
                        <span className="truncate">{photo.district}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(photo.id);
                      }}
                      className={`p-1.5 sm:p-2 rounded-full transition active:scale-90 shrink-0 ${
                        isLiked ? "text-red-600 bg-red-50" : "text-[#7A8880] hover:text-red-600 hover:bg-[#FAF7F0]"
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isLiked ? "fill-red-600" : ""}`} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </main>

      {/* ========================================================================= */}
      {/* IMMERSIVE LIGHTBOX MODAL */}
      {/* ========================================================================= */}
      {activePhoto && (
        <div 
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full bg-[#18241E] text-white rounded-3xl overflow-hidden shadow-2xl border border-white/10"
          >
            <div className="relative max-h-[72vh] bg-black flex items-center justify-center group/nav">
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                className="max-h-[72vh] w-auto max-w-full object-contain"
              />
              {/* Previous Button */}
              <button
                type="button"
                onClick={handlePrevPhoto}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition border border-white/20 active:scale-95 shadow-lg"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={handleNextPhoto}
                aria-label="Next image"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition border border-white/20 active:scale-95 shadow-lg"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Close Button */}
              <button
                onClick={() => setActivePhoto(null)}
                aria-label="Close"
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition border border-white/20"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-amber-300 flex items-center gap-1 mb-1">
                  <MapPin className="w-3.5 h-3.5" /> {activePhoto.district} • {activePhoto.category}
                </span>
                <h3 className="text-xl font-bold font-malayalam-serif">
                  {activePhoto.title}
                </h3>
                <p className="text-xs text-white/70 mt-1 max-w-xl font-malayalam-body">
                  {activePhoto.description}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: activePhoto.title, text: activePhoto.description, url: activePhoto.imageUrl });
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-xs font-bold text-white transition flex items-center gap-1.5"
                >
                  <Share2 className="w-4 h-4" />
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
