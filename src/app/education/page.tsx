"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
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
  const [selectedCategory, setSelectedCategory] = useState("എല്ലാം");
  const [showDetailModal, setShowDetailModal] = useState(false);

  const categories = ["എല്ലാം", "വാർത്തകൾ", "സർവ്വകലാശാലകൾ", "സ്കോളർഷിപ്പുകൾ", "കരിയർ ഗൈഡൻസ്"];

  const UNIVERSITIES = [
    {
      name: "കേരള സർവ്വകലാശാല (University of Kerala)",
      location: "തിരുവനന്തപുരം",
      established: "1937",
      desc: "കേരളത്തിലെ ആദ്യത്തെ സർവ്വകലാശാല. NAAC A++ അംഗീകാരത്തോടെ അക്കാദമിക് മികവിന്റെ മുന്നിൽ.",
      courses: "ആർട്സ്, സയൻസ്, കൊമേഴ്സ്, റിസർച്ച്",
      link: "https://www.keralauniversity.ac.in",
    },
    {
      name: "കാലിക്കറ്റ് സർവ്വകലാശാല (University of Calicut)",
      location: "തേഞ്ഞിപ്പലം, മലപ്പുറം",
      established: "1968",
      desc: "വടക്കൻ കേരളത്തിലെ ഏറ്റവും വലിയ സർവ്വകലാശാല. 400-ലധികം അഫിലിയേറ്റഡ് കോളേജുകൾ.",
      courses: "ഹ്യുമാനിറ്റീസ്, സയൻസ്, മാനേജ്‌മെന്റ്",
      link: "https://uoc.ac.in",
    },
    {
      name: "മഹാത്മാഗാന്ധി സർവ്വകലാശാല (MG University)",
      location: "കോട്ടയം",
      established: "1983",
      desc: "നാനോ സയൻസ്, പോളിമർ കെമിസ്ട്രി, ബയോമെഡിക്കൽ റിസർച്ച് എന്നിവയിൽ രാജ്യാന്തര ശ്രദ്ധ നേടിയ കേന്ദ്രം.",
      courses: "ഇന്റർ ഡിസിപ്ലിനറി സ്റ്റഡീസ്, റിസർച്ച്",
      link: "https://www.mgu.ac.in",
    },
    {
      name: "കൊച്ചി ശാസ്ത്ര സാങ്കേതിക സർവ്വകലാശാല (CUSAT)",
      location: "കളമശ്ശേരി, കൊച്ചി",
      established: "1971",
      desc: "എഞ്ചിനീയറിംഗ്, ഓഷ്യനോഗ്രഫി, കമ്പ്യൂട്ടർ ആപ്ലിക്കേഷൻസ്, നേവൽ ആർക്കിടെക്ചർ എന്നിവയിൽ പ്രമുഖം.",
      courses: "B.Tech, M.Tech, MCA, Ph.D",
      link: "https://www.cusat.ac.in",
    },
    {
      name: "എ.പി.ജെ. അബ്ദുൾ കലാം സാങ്കേതിക സർവ്വകലാശാല (KTU)",
      location: "തിരുവനന്തപുരം",
      established: "2014",
      desc: "സംസ്ഥാനത്തെ സാങ്കേതിക വിദ്യാഭ്യാസ സ്ഥാപനങ്ങളെ ഏകീകരിക്കുന്ന സാങ്കേതിക സർവ്വകലാശാല.",
      courses: "എഞ്ചിനീയറിംഗ്, ആർക്കിടെക്ചർ, എം.ബി.എ",
      link: "https://ktu.edu.in",
    },
    {
      name: "കേരള കാർഷിക സർവ്വകലാശാല (KAU)",
      location: "വെള്ളാനിക്കര, തൃശ്ശൂർ",
      established: "1971",
      desc: "കേരളത്തിന്റെ കാർഷിക, ഹോർട്ടികൾച്ചറൽ ഗവേഷണങ്ങൾക്കും ഭക്ഷ്യസുരക്ഷയ്ക്കും നേതൃത്വം നൽകുന്നു.",
      courses: "B.Sc Agriculture, Forestry, Biotech",
      link: "https://kau.in",
    },
  ];

  const SCHOLARSHIPS = [
    {
      title: "ഇ-ഗ്രാന്റ്സ് 3.0 (E-Grants Scholarship)",
      provider: "പിന്നാക്ക ക്ഷേമ വകുപ്പ്, കേരളം",
      amount: "പൂർണ്ണ ഫീസ് ഇളവ് + പ്രതിമാസ അലവൻസ്",
      eligibility: "SC / ST / OEC / OBC വിദ്യാർത്ഥികൾക്ക് പോസ്റ്റ്-മെട്രിക് കോഴ്സുകൾക്ക്",
      deadline: "ഓരോ അധ്യയന വർഷവും തുറന്നിരിക്കുന്നു",
      portal: "https://egrantz.kerala.gov.in",
    },
    {
      title: "പ്രതിഭാ സ്കോളർഷിപ്പ് (KSCSTE Prathibha)",
      provider: "കേരള ശാസ്ത്ര സാങ്കേതിക പരിസ്ഥിതി കൗൺസിൽ",
      amount: "പ്രതിവർഷം ₹12,000 - ₹60,000 വരെ",
      eligibility: "ബേസിക് സയൻസ് ഡിഗ്രി / പിജി പഠിക്കുന്ന മിടുക്കരായ വിദ്യാർത്ഥികൾക്ക്",
      deadline: "ജനുവരി 31",
      portal: "https://kscste.kerala.gov.in",
    },
    {
      title: "ന്യൂനപക്ഷ മെറിറ്റ് കം മീൻസ് സ്കോളർഷിപ്പ്",
      provider: "ന്യൂനപക്ഷ ക്ഷേമ വകുപ്പ്",
      amount: "₹10,000 - ₹20,000 പ്രതിവർഷം",
      eligibility: "മുസ്‌ലിം, ക്രിസ്ത്യൻ തുടങ്ങിയ ന്യൂനപക്ഷ വിഭാഗങ്ങളിലെ മെറിറ്റുള്ള വിദ്യാർത്ഥികൾക്ക്",
      deadline: "ഡിസംബർ 15",
      portal: "https://minoritywelfare.kerala.gov.in",
    },
    {
      title: "വിദ്യാകിരണം & ഡിജിറ്റൽ ഡിവൈസ് പദ്ധതി",
      provider: "പൊതുവിദ്യാഭ്യാസ സംരക്ഷണ യജ്ഞം",
      amount: "സൗജന്യ ലാപ്‌ടോപ്പ് / പഠന സാമഗ്രികൾ",
      eligibility: "സാമ്പത്തികമായി പിന്നാക്കം നിൽക്കുന്ന പൊതുവിദ്യാലയ വിദ്യാർത്ഥികൾക്ക്",
      deadline: "സ്കൂൾ ഹെഡ്മാസ്റ്റർ മുഖേന അപേക്ഷിക്കാം",
      portal: "https://education.kerala.gov.in",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
          <Breadcrumbs items={[{ label: "വിദ്യാഭ്യാസം (Education)" }]} />
        </div>
        
        {/* ========================================================================= */}
        {/* HERO BANNER: Row 2, Col 2 in reference image (Students in Uniform) */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden pt-2 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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
                കേരളത്തിലെ സ്കൂളുകൾ, ഉന്നത വിദ്യാഭ്യാസ സ്ഥാപനങ്ങൾ, സർവ്വകലാശാലകൾ, സ്കോളർഷിപ്പുകൾ, കരിയർ ഗൈഡൻസ് എന്നിവയെക്കുറിച്ചുള്ള വിശ്വസനീയമായ വിവരങ്ങൾ.
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
        {(selectedCategory === "എല്ലാം" || selectedCategory === "വാർത്തകൾ") && (
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
                      { title: "SSLC / +2 പരീക്ഷാ ബോർഡ്", subtitle: "Pareeksha Bhavan", href: "https://pareekshabhavan.kerala.gov.in" },
                      { title: "കോളേജ് വിദ്യാഭ്യാസ വകുപ്പ്", subtitle: "Higher Education Portal", href: "https://collegiateedu.kerala.gov.in" },
                      { title: "സ്കോൾ കേരള (SCOLE)", subtitle: "State Open School", href: "https://scolekerala.org" },
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

                {/* Scholarship Quick Highlight Card */}
                <div className="bg-[#FAF4E6] rounded-3xl border border-[#E8DCBF] p-6 shadow-card">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-5 h-5 text-[#B87A1E]" />
                    <h4 className="font-bold font-malayalam-serif text-sm text-[#8C5B0F]">
                      സ്കോളർഷിപ്പ് അറിയിപ്പുകൾ
                    </h4>
                  </div>
                  <p className="text-xs text-[#5C6A64] leading-relaxed mb-3">
                    സംസ്ഥാന സർക്കാരിന്റെ മെറിറ്റ് സ്കോളർഷിപ്പ്, ഇ-ഗ്രാന്റ്സ് 3.0 അപേക്ഷകൾ ആരംഭിച്ചു.
                  </p>
                  <button
                    onClick={() => setSelectedCategory("സ്കോളർഷിപ്പുകൾ")}
                    className="text-xs font-bold text-[#1B4D36] hover:underline flex items-center gap-1"
                  >
                    <span>വിവരങ്ങൾ അറിയാം</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

              </div>

            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* SECTION: UNIVERSITIES IN KERALA (സർവ്വകലാശാലകൾ) */}
        {/* ========================================================================= */}
        {(selectedCategory === "എല്ലാം" || selectedCategory === "സർവ്വകലാശാലകൾ") && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <School className="w-5 h-5 text-[#1B4D36]" />
                  <span className="text-xs font-bold text-[#1B4D36] uppercase tracking-wider">ഉന്നത വിദ്യാഭ്യാസം</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-malayalam-serif text-[#1B4D36]">
                  കേരളത്തിലെ സർവ്വകലാശാലകൾ
                </h2>
                <p className="text-xs sm:text-sm text-[#5C6A64] mt-1">
                  ഗുണനിലവാരമുള്ള ഉന്നത വിദ്യാഭ്യാസവും രാജ്യാന്തര ഗവേഷണ സൗകര്യങ്ങളും നൽകുന്ന പ്രമുഖ സർവ്വകലാശാലകൾ.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {UNIVERSITIES.map((univ, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl border border-[#EAE4D7] p-6 shadow-card hover:border-[#1B4D36]/60 transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3 text-xs text-[#7A8880]">
                      <span className="bg-[#E0F1E7] text-[#1B4D36] font-bold px-2.5 py-0.5 rounded-full">
                        സ്ഥാപിതം: {univ.established}
                      </span>
                      <span>{univ.location}</span>
                    </div>
                    <h3 className="font-bold font-malayalam-serif text-base text-[#1A2420] mb-2">
                      {univ.name}
                    </h3>
                    <p className="text-xs text-[#5C6A64] leading-relaxed mb-4">
                      {univ.desc}
                    </p>
                    <div className="p-3 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7] text-[11px] text-[#4A5750] mb-4">
                      <strong className="text-[#1B4D36]">പ്രധാന ശാഖകൾ:</strong> {univ.courses}
                    </div>
                  </div>

                  <a
                    href={univ.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-[#FAF7F0] hover:bg-[#1B4D36] hover:text-white text-[#1B4D36] border border-[#DDD5C5] text-xs font-bold transition shadow-xs"
                  >
                    <span>ഔദ്യോഗിക പോർട്ടൽ</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* SECTION: SCHOLARSHIPS (സ്കോളർഷിപ്പുകൾ) */}
        {/* ========================================================================= */}
        {(selectedCategory === "എല്ലാം" || selectedCategory === "സ്കോളർഷിപ്പുകൾ") && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-[#B87A1E]" />
                  <span className="text-xs font-bold text-[#B87A1E] uppercase tracking-wider">ധനസഹായം</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-malayalam-serif text-[#1B4D36]">
                  പ്രധാന സ്കോളർഷിപ്പുകൾ & ഗ്രാന്റുകൾ
                </h2>
                <p className="text-xs sm:text-sm text-[#5C6A64] mt-1">
                  കേരളത്തിലെ സ്കൂൾ-കോളേജ് വിദ്യാർത്ഥികൾക്ക് ലഭ്യമായ ഔദ്യോഗിക സാമ്പത്തിക സഹായ പദ്ധതികൾ.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {SCHOLARSHIPS.map((sch, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl border border-[#EAE4D7] p-6 sm:p-7 shadow-card hover:border-[#1B4D36]/50 transition flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="bg-[#FAF4E6] text-[#8C5B0F] border border-[#E8DCBF] font-bold text-[10px] px-2.5 py-0.5 rounded-full">
                        {sch.provider}
                      </span>
                      <span className="text-[11px] text-[#7A8880]">അവസാന തീയതി: {sch.deadline}</span>
                    </div>
                    <h3 className="font-bold font-malayalam-serif text-lg text-[#1B4D36]">
                      {sch.title}
                    </h3>
                    <div className="p-3.5 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7] space-y-1.5 text-xs">
                      <div><strong className="text-[#1A2420]">സഹായ തുക:</strong> <span className="text-emerald-700 font-bold">{sch.amount}</span></div>
                      <div><strong className="text-[#1A2420]">അർഹത:</strong> <span className="text-[#5C6A64]">{sch.eligibility}</span></div>
                    </div>
                  </div>

                  <div className="pt-4 mt-2">
                    <a
                      href={sch.portal}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-[#1B4D36] text-white hover:bg-[#133A28] text-xs font-bold transition shadow-xs active:scale-95"
                    >
                      <span>അപേക്ഷിക്കൂ (Apply on Portal)</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* ACADEMIC RESOURCES & CAREER GUIDANCE */}
        {/* ========================================================================= */}
        {(selectedCategory === "എല്ലാം" || selectedCategory === "കരിയർ ഗൈഡൻസ്") && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <h3 className="text-2xl font-bold font-malayalam-serif text-[#1B4D36] mb-6">
              പഠന വിഭവങ്ങളും കരിയർ ഗൈഡൻസും
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-white rounded-3xl p-6 border border-[#EAE4D7] shadow-card flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-[#E0F1E7] text-[#1B4D36] flex items-center justify-center mb-4">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-base text-[#1A2420] mb-2 font-malayalam-serif">ഉന്നത വിദ്യാഭ്യാസം</h4>
                  <p className="text-xs text-[#5C6A64] leading-relaxed mb-4">
                    കേരളത്തിലെ സർവ്വകലാശാലകൾ, മെഡിക്കൽ, എഞ്ചിനീയറിംഗ് കോളേജുകളിലെ കോഴ്സുകൾ.
                  </p>
                </div>
                <Link href="/discover?tab=places" className="text-xs font-bold text-[#1B4D36] hover:underline flex items-center gap-1 pt-2">
                  സ്ഥാപനങ്ങൾ കണ്ടെത്തൂ <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-[#EAE4D7] shadow-card flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-[#FAF4E6] text-[#B87A1E] flex items-center justify-center mb-4">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-base text-[#1A2420] mb-2 font-malayalam-serif">മത്സര പരീക്ഷകൾ</h4>
                  <p className="text-xs text-[#5C6A64] leading-relaxed mb-4">
                    കേരള പി.എസ്.സി, KEAM, NEET എന്നിവയ്ക്കുള്ള സിലബസും മോഡൽ പരീക്ഷകളും.
                  </p>
                </div>
                <Link href="/news" className="text-xs font-bold text-[#1B4D36] hover:underline flex items-center gap-1 pt-2">
                  പരീക്ഷാ വാർത്തകൾ <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-[#EAE4D7] shadow-card flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-[#E5DDD0] text-[#1B4D36] flex items-center justify-center mb-4">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-base text-[#1A2420] mb-2 font-malayalam-serif">ASAP Kerala</h4>
                  <p className="text-xs text-[#5C6A64] leading-relaxed mb-4">
                    ഉന്നത വിദ്യാഭ്യാസ വകുപ്പിന് കീഴിലുള്ള അത്യാധുനിക നൈപുണ്യ തൊഴിൽ പരിശീലന പരിപാടികൾ.
                  </p>
                </div>
                <a href="https://asapkerala.gov.in" target="_blank" rel="noreferrer" className="text-xs font-bold text-[#1B4D36] hover:underline flex items-center gap-1 pt-2">
                  കോഴ്സുകൾ കാണാം <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-[#EAE4D7] shadow-card flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-[#E0F1E7] text-[#1B4D36] flex items-center justify-center mb-4">
                    <Award className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-base text-[#1A2420] mb-2 font-malayalam-serif">K-DISC (YIP)</h4>
                  <p className="text-xs text-[#5C6A64] leading-relaxed mb-4">
                    വിദ്യാർത്ഥികളിലെ ശാസ്ത്രീയ ആശയങ്ങളെ സ്റ്റാർട്ടപ്പുകളാക്കി മാറ്റുന്ന യങ് ഇന്നൊവേറ്റേഴ്സ് പ്രോഗ്രാം.
                  </p>
                </div>
                <a href="https://kdisc.kerala.gov.in" target="_blank" rel="noreferrer" className="text-xs font-bold text-[#1B4D36] hover:underline flex items-center gap-1 pt-2">
                  YIP രജിസ്ട്രേഷൻ <ExternalLink className="w-3 h-3" />
                </a>
              </div>

            </div>
          </section>
        )}

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
