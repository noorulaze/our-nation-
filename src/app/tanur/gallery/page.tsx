"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { TanurNav } from "@/components/tanur/TanurNav";
import { TANUR_PHOTO_MANIFEST, TanurPhotoAsset } from "@/lib/data/tanurData";
import {
  Image as ImageIcon,
  ExternalLink,
  ShieldCheck,
  Camera,
  Filter,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Info,
  MapPin,
  Sparkles,
  UploadCloud,
} from "lucide-react";

type GalleryCategory = "all" | "harbour" | "beach" | "heritage" | "landscape";

export default function TanurGalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>("all");
  const [activePhoto, setActivePhoto] = useState<TanurPhotoAsset | null>(null);

  const filterPhoto = (photo: TanurPhotoAsset) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "harbour") {
      return (
        photo.subject.toLowerCase().includes("harbour") ||
        photo.title.toLowerCase().includes("harbour")
      );
    }
    if (selectedCategory === "beach") {
      return (
        photo.subject.toLowerCase().includes("beach") ||
        photo.title.toLowerCase().includes("beach") ||
        photo.subject.toLowerCase().includes("surf")
      );
    }
    if (selectedCategory === "heritage") {
      return (
        photo.subject.toLowerCase().includes("railway") ||
        photo.title.toLowerCase().includes("railway") ||
        photo.subject.toLowerCase().includes("settlement")
      );
    }
    if (selectedCategory === "landscape") {
      return (
        photo.subject.toLowerCase().includes("landscape") ||
        photo.subject.toLowerCase().includes("palms") ||
        photo.subject.toLowerCase().includes("overview")
      );
    }
    return true;
  };

  const filteredPhotos = TANUR_PHOTO_MANIFEST.filter(filterPhoto);

  const handleNextPhoto = () => {
    if (!activePhoto) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === activePhoto.id);
    const nextIndex = (currentIndex + 1) % filteredPhotos.length;
    setActivePhoto(filteredPhotos[nextIndex]);
  };

  const handlePrevPhoto = () => {
    if (!activePhoto) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === activePhoto.id);
    const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setActivePhoto(filteredPhotos[prevIndex]);
  };

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
              <span>ഫോട്ടോ ഗാലറി</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold text-amber-300 mb-2">
              <Camera className="w-3.5 h-3.5" />
              <span>പ്രാമാണിക ചിത്ര ശേഖരം • Verified Photo Archive</span>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-malayalam-heading">
              താനൂർ ഫോട്ടോ ഗാലറി
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-stone-200 font-malayalam-body max-w-2xl leading-relaxed">
              വിക്കിമീഡിയ കോമൺസ് ക്രിയേറ്റീവ് കോമൺസ് ലൈസൻസുള്ള യഥാർത്ഥ ചിത്രങ്ങൾ, ഹാർബർ, തീരദേശ ഭംഗി, റെയിൽവേ പൈതൃകം.
            </p>
          </div>
        </section>

        {/* Verification and Attribution Notice */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="bg-[#E8F2EC] border border-[#C6DEC9] rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#1B4D36]">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-[#1B4D36] shrink-0" />
              <span>
                <strong>പ്രാമാണികത ഉറപ്പാക്കിയ ചിത്രങ്ങൾ:</strong> ഇവിടെ പ്രദർശിപ്പിച്ചിരിക്കുന്ന എല്ലാ ഫോട്ടോകളും വിക്കിമീഡിയ കോമൺസിലെ യഥാർത്ഥ ഫോട്ടോഗ്രാഫർമാരുടെ അനുമതിയോടെ (CC BY-SA / CC BY ലൈസൻസ് പ്രകാരം) കൃത്യമായ കടപ്പാടോടെ ഉൾപ്പെടുത്തിയിട്ടുള്ളതാണ്.
              </span>
            </div>
            <Link
              href="/tanur/contribute"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#1B4D36] text-white text-xs font-bold hover:bg-[#133827] transition shrink-0"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>ചിത്രങ്ങൾ പങ്കുവെക്കാം</span>
            </Link>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="flex flex-wrap items-center gap-2 pb-2">
            {[
              { id: "all", label: "എല്ലാ ചിത്രങ്ങളും (All)", count: TANUR_PHOTO_MANIFEST.length },
              { id: "harbour", label: "ഫിഷിംഗ് ഹാർബർ (Harbour)" },
              { id: "beach", label: "കടൽത്തീരം (Beach & Waves)" },
              { id: "heritage", label: "റെയിൽവേ & പൈതൃകം (Heritage)" },
              { id: "landscape", label: "ഗ്രാമീണ കാഴ്ചകൾ (Landscape)" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as GalleryCategory)}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-malayalam-body transition ${
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

        {/* Photos Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setActivePhoto(photo)}
                className="group cursor-pointer bg-white rounded-3xl border border-[#EDE6D8] overflow-hidden shadow-card hover:shadow-lg transition flex flex-col"
              >
                {/* Image Container with overlay */}
                <div className="relative h-64 overflow-hidden bg-stone-100">
                  <img
                    src={photo.filenameOrUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <span className="p-3 rounded-full bg-white/90 text-[#1B4D36] shadow-md transform translate-y-2 group-hover:translate-y-0 transition">
                      <Maximize2 className="w-5 h-5" />
                    </span>
                  </div>
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider">
                    {photo.license}
                  </span>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#B87A1E] font-medium mb-1">
                      <MapPin className="w-3 h-3" />
                      <span>{photo.location}</span>
                    </div>
                    <h3 className="text-base font-bold font-malayalam-serif text-[#1B4D36] group-hover:text-[#B87A1E] transition">
                      {photo.title}
                    </h3>
                    <p className="mt-1 text-xs text-[#5C6A64] font-malayalam-body line-clamp-2">
                      {photo.subject}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#F0EAE1] flex items-center justify-between text-[11px] text-[#7A8680]">
                    <span>ഛായാഗ്രഹണം: <strong>{photo.creator}</strong></span>
                    <span className="text-[#1B4D36] group-hover:underline flex items-center gap-0.5">
                      കാണുക
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPhotos.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl border border-[#EDE6D8]">
              <ImageIcon className="w-12 h-12 text-[#9BA8A1] mx-auto mb-3" />
              <h3 className="text-lg font-bold font-malayalam-heading text-[#1B4D36]">
                ഈ വിഭാഗത്തിൽ ചിത്രങ്ങൾ ലഭ്യമല്ല
              </h3>
              <p className="text-xs text-[#5C6A64] mt-1 font-malayalam-body">
                മറ്റ് വിഭാഗങ്ങൾ തിരഞ്ഞെടുത്ത് ചിത്രങ്ങൾ കാണുക.
              </p>
            </div>
          )}
        </div>

        {/* Modal Lightbox */}
        {activePhoto && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full bg-[#FAF7F0] rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#EDE6D8] bg-white">
                <div>
                  <h3 className="text-base font-bold font-malayalam-serif text-[#1B4D36]">
                    {activePhoto.title}
                  </h3>
                  <p className="text-xs text-[#5C6A64] flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-[#B87A1E]" />
                    {activePhoto.location}
                  </p>
                </div>
                <button
                  onClick={() => setActivePhoto(null)}
                  className="p-2 rounded-full hover:bg-stone-100 text-[#5C6A64] hover:text-[#1A2420] transition"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Image Container */}
              <div className="relative bg-black flex items-center justify-center overflow-hidden flex-1 min-h-[300px] sm:min-h-[420px]">
                <img
                  src={activePhoto.filenameOrUrl}
                  alt={activePhoto.title}
                  className="max-h-[60vh] max-w-full object-contain mx-auto"
                />

                {/* Nav buttons */}
                <button
                  onClick={handlePrevPhoto}
                  className="absolute left-3 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition backdrop-blur-md"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextPhoto}
                  className="absolute right-3 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition backdrop-blur-md"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Footer Attribution Panel */}
              <div className="p-5 bg-white border-t border-[#EDE6D8] space-y-3">
                <p className="text-xs text-[#4A5752] font-malayalam-body">
                  {activePhoto.subject}
                </p>
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#F0EAE1] text-xs">
                  <div className="space-y-0.5">
                    <div className="font-semibold text-[#1A2420]">
                      ഫോട്ടോഗ്രാഫർ: <span className="text-[#1B4D36]">{activePhoto.creator}</span>
                    </div>
                    <div className="text-[11px] text-[#7A8680]">
                      ലൈസൻസ്: <span className="font-mono font-medium text-stone-700">{activePhoto.license}</span>
                    </div>
                  </div>

                  <a
                    href={activePhoto.originalSource}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#E8F2EC] hover:bg-[#D4E8DC] text-[#1B4D36] font-bold text-xs transition"
                  >
                    <span>വിക്കിമീഡിയയിൽ കാണുക</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
