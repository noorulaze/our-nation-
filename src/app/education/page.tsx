"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/lib/i18n/context";
import { 
  BookOpen, 
  GraduationCap, 
  Calendar, 
  ArrowRight, 
  ExternalLink, 
  Award, 
  CheckCircle2, 
  Sparkles,
  School,
  FileText,
  Search,
  ChevronRight,
  X
} from "lucide-react";

export default function EducationPage() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("വാർത്തകൾ");
  const [showDetailModal, setShowDetailModal] = useState(false);

  const categories = ["വാർത്തകൾ", "വിദ്യാഭ്യാസ വാർത്തകൾ", "വിദ്യാഭ്യാസ വിവരങ്ങൾ", "സ്കോളർഷിപ്പുകൾ"];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
      <Navbar />

      <main className="flex-1">
        
        {/* ========================================================================= */}
        {/* HERO BANNER: Row 2, Col 2 in reference image (Students in Uniform) */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden pt-4 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="relative rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-elevated border border-[#E7DFD0] min-h-[380px] sm:min-h-[440px] flex items-center bg-[#173024]">
            
            {/* Background Image: Students walking with backpacks */}
            <div 
              className="absolute inset-0 bg-cover bg-center sm:bg-right"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&auto=format&fit=crop&q=80')`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#122B20] via-[#122B20]/80 to-transparent" />
            </div>

            {/* Left Content */}
            <div className="relative z-10 p-6 sm:p-12 lg:p-16 max-w-2xl text-white">
              <span className="inline-block px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-xs text-amber-200 text-xs font-bold mb-3">
                അറിവിന്റെ ലോകം
              </span>
              <h1 className="text-4xl sm:text-6xl font-bold font-malayalam-serif tracking-tight leading-none mb-3">
                വിദ്യാഭ്യാസം
              </h1>
              <p className="text-xl sm:text-2xl font-bold font-malayalam-script text-amber-200 mb-4">
                ജ്ഞാനമാണ് ശക്തി
              </p>
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-malayalam-body max-w-lg">
                കേരളത്തിലെ സ്കൂളുകൾ, ഉന്നത വിദ്യാഭ്യാസ സ്ഥാപനങ്ങൾ, മത്സര പരീക്ഷകൾ, സ്കോളർഷിപ്പുകൾ എന്നിവയെക്കുറിച്ചുള്ള വിശ്വസനീയമായ വിവരങ്ങൾ.
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
        {/* MAIN SECTION: Featured Education Card on Left + Important Links on Right */}
        {/* (Matching Row 2, Col 2 in reference image) */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Featured Card (8 Cols) */}
            <div className="lg:col-span-8 bg-white rounded-3xl border border-[#EAE4D7] shadow-card overflow-hidden hover:border-[#1B4D36]/60 transition">
              
              {/* Image of Heritage College Campus */}
              <div className="h-64 sm:h-80 w-full overflow-hidden relative bg-[#E5DDD0]">
                <img
                  src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&auto=format&fit=crop&q=80"
                  alt="Kerala Heritage University Campus"
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
                <span className="absolute top-4 left-4 bg-[#1B4D36] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  പ്രധാന വാർത്ത
                </span>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-2 text-xs text-[#7A8880] mb-2">
                  <Calendar className="w-3.5 h-3.5 text-[#1B4D36]" />
                  <span>16 നവംബർ 2026</span>
                  <span>•</span>
                  <span>വിദ്യാഭ്യാസ വകുപ്പ്</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-malayalam-serif text-[#1B4D36] mb-3 leading-snug">
                  കേരളത്തിൽ പുതിയ വിദ്യാഭ്യാസ നയങ്ങൾ
                </h3>

                <p className="text-xs sm:text-sm text-[#4A5750] leading-relaxed mb-6 font-malayalam-body">
                  സ്കൂൾ തലം മുതൽ ഉന്നത വിദ്യാഭ്യാസം വരെയുള്ള പാഠ്യപദ്ധതിയിൽ പ്രായോഗിക നൈപുണ്യങ്ങൾക്കും ആർട്ടിഫിഷ്യൽ ഇന്റലിജൻസ് (AI) ഉൾപ്പെടെയുള്ള പുത്തൻ സാങ്കേതിക വിദ്യകൾക്കും മുൻഗണന നൽകുന്ന വിപ്ലവകരമായ മാറ്റങ്ങൾ പ്രഖ്യാപിച്ചു. വിദ്യാർത്ഥികളിൽ സ്വതന്ത്ര ചിന്തയും ഗവേഷണ മനോഭാവവും വളർത്തുകയാണ് ലക്ഷ്യം.
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-[#F3EFE6]">
                  <button
                    type="button"
                    onClick={() => setShowDetailModal(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1B4D36] hover:bg-[#133A28] text-white text-xs font-bold transition shadow-xs active:scale-95 group"
                  >
                    <span>വായിക്കുക</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                  </button>

                  <span className="text-xs text-[#7A8880]">പൊതുവിദ്യാഭ്യാസ സംരക്ഷണം</span>
                </div>
              </div>

            </div>

            {/* Right Column: "പ്രധാന ലിങ്കുകൾ" (4 Cols) */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 shadow-card">
                <h3 className="font-bold font-malayalam-serif text-base text-[#1A2420] mb-4 pb-3 border-b border-[#F3EFE6] flex items-center justify-between">
                  <span>പ്രധാന ലിങ്കുകൾ</span>
                  <BookOpen className="w-4 h-4 text-[#1B4D36]" />
                </h3>

                <ul className="space-y-3">
                  {[
                    { title: "വിദ്യാഭ്യാസ വകുപ്പ്", subtitle: "General Education Portal", href: "https://education.kerala.gov.in" },
                    { title: "SSLC / +2", subtitle: "പരീക്ഷാ ബോർഡ്", href: "https://pareekshabhavan.kerala.gov.in" },
                    { title: "Higher Education", subtitle: "കോളേജ് വിദ്യാഭ്യാസ വകുപ്പ്", href: "https://collegiateedu.kerala.gov.in" },
                    { title: "Open School", subtitle: "സ്കോൾ കേരള (SCOLE)", href: "https://scolekerala.org" },
                    { title: "KITE Victers", subtitle: "ഡിജിറ്റൽ ലേണിംഗ് ക്ലാസുകൾ", href: "https://victers.kite.kerala.gov.in" },
                  ].map((link, idx) => (
                    <li key={idx}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="p-3.5 rounded-2xl bg-[#FAF7F0] hover:bg-[#F3EFE6] border border-[#EAE4D7] flex items-center justify-between transition group"
                      >
                        <div>
                          <span className="text-xs font-bold text-[#1B4D36] block">{link.title}</span>
                          <span className="text-[10px] text-[#7A8880]">{link.subtitle}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#7A8880] group-hover:translate-x-1 group-hover:text-[#1B4D36] transition" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Scholarship Highlight Card */}
              <div className="bg-[#FAF4E6] rounded-3xl border border-[#E8DCBF] p-6 shadow-card">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-[#B87A1E]" />
                  <h4 className="font-bold font-malayalam-serif text-sm text-[#8C5B0F]">
                    സ്കോളർഷിപ്പ് അറിയിപ്പുകൾ
                  </h4>
                </div>
                <p className="text-xs text-[#5C6A64] leading-relaxed mb-3">
                  സംസ്ഥാന സർക്കാരിന്റെ മെറിറ്റ് സ്കോളർഷിപ്പ്, ഇ-ഗ്രാന്റ്സ് അപേക്ഷകൾ ആരംഭിച്ചു.
                </p>
                <Link
                  href="/contact"
                  className="text-xs font-bold text-[#1B4D36] hover:underline flex items-center gap-1"
                >
                  <span>വിവരങ്ങൾ അറിയാം</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* ACADEMIC RESOURCES & CAREER GUIDANCE */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <h3 className="text-2xl font-bold font-malayalam-serif text-[#1B4D36] mb-6">
            പഠന വിഭവങ്ങളും കരിയർ ഗൈഡൻസും
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            <div className="bg-white rounded-3xl p-6 border border-[#EAE4D7] shadow-card">
              <div className="w-10 h-10 rounded-2xl bg-[#E0F1E7] text-[#1B4D36] flex items-center justify-center mb-4">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-[#1A2420] mb-2">ഉന്നത വിദ്യാഭ്യാസം</h4>
              <p className="text-xs text-[#5C6A64] leading-relaxed mb-4">
                കേരളത്തിലെ സർവ്വകലാശാലകൾ, മെഡിക്കൽ, എഞ്ചിനീയറിംഗ് കോളേജുകളിലെ കോഴ്സുകൾ.
              </p>
              <Link href="/discover?tab=places" className="text-xs font-bold text-[#1B4D36] hover:underline flex items-center gap-1">
                സ്ഥാപനങ്ങൾ കണ്ടെത്തൂ <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-[#EAE4D7] shadow-card">
              <div className="w-10 h-10 rounded-2xl bg-[#FAF4E6] text-[#B87A1E] flex items-center justify-center mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-[#1A2420] mb-2">മത്സര പരീക്ഷകൾ</h4>
              <p className="text-xs text-[#5C6A64] leading-relaxed mb-4">
                കേരള പി.എസ്.സി, KEAM, NEET എന്നിവയ്ക്കുള്ള സിലബസും മോഡൽ പരീക്ഷകളും.
              </p>
              <Link href="/news" className="text-xs font-bold text-[#1B4D36] hover:underline flex items-center gap-1">
                പരീക്ഷാ വാർത്തകൾ <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-[#EAE4D7] shadow-card">
              <div className="w-10 h-10 rounded-2xl bg-[#E5DDD0] text-[#1B4D36] flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-[#1A2420] mb-2">സ്കിൽ കേരള</h4>
              <p className="text-xs text-[#5C6A64] leading-relaxed mb-4">
                യുവജനങ്ങളുടെ തൊഴിൽ നൈപുണ്യം വർദ്ധിപ്പിക്കുന്ന സൗജന്യ പരിശീലന പരിപാടികൾ.
              </p>
              <Link href="/events" className="text-xs font-bold text-[#1B4D36] hover:underline flex items-center gap-1">
                വർക്ക്ഷോപ്പുകൾ കാണാം <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

          </div>
        </section>

      </main>

      {/* Detail Modal */}
      {showDetailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[#FAF7F0] rounded-3xl border border-[#E7DFD0] max-w-xl w-full shadow-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4 border-b border-[#E5DFD1] pb-3">
              <span className="text-xs font-bold text-[#1B4D36] uppercase bg-[#E0F1E7] px-2.5 py-0.5 rounded-full">
                വിദ്യാഭ്യാസ വാർത്ത
              </span>
              <button
                onClick={() => setShowDetailModal(false)}
                className="w-8 h-8 rounded-full bg-white text-[#5C6A64] hover:text-[#1A2420] flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <h3 className="text-xl font-bold font-malayalam-serif text-[#1B4D36] mb-3">
              കേരളത്തിൽ പുതിയ വിദ്യാഭ്യാസ നയങ്ങൾ
            </h3>
            <p className="text-xs sm:text-sm text-[#3E4D45] leading-relaxed mb-4 font-malayalam-body">
              കേരളത്തിലെ സ്കൂളുകളിൽ കോഡിംഗ്, റോബോട്ടിക്സ്, നിർമ്മിത ബുദ്ധി എന്നിവ പ്രൈമറി തലം മുതൽ ഘട്ടം ഘട്ടമായി പരിചയപ്പെടുത്തുന്ന നവീകരിച്ച പാഠ്യപദ്ധതി നടപ്പിലാക്കുന്നു. ഇതിനായി അധ്യാപകർക്കുള്ള പരിശീലനം ആരംഭിച്ചു. ഒപ്പം സ്കൂൾ ലൈബ്രറികൾ ഡിജിറ്റലാക്കി വിജ്ഞാന വ്യാപനം ഉറപ്പാക്കും.
            </p>
            <div className="text-right">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-5 py-2 rounded-xl bg-[#1B4D36] text-white text-xs font-bold"
              >
                ശരി
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <BottomNav />
    </div>
  );
}
