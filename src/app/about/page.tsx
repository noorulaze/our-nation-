"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { useLanguage } from "@/lib/i18n/context";
import { 
  ArrowRight, 
  Users, 
  MapPin, 
  Landmark, 
  Palmtree, 
  CheckCircle2, 
  Heart, 
  ShieldCheck, 
  Sparkles,
  Award,
  Globe,
  Compass
} from "lucide-react";

export default function AboutPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
          <Breadcrumbs items={[{ label: "നമ്മെക്കുറിച്ച് (About Us)" }]} />
        </div>
        
        {/* ========================================================================= */}
        {/* HERO BANNER: Row 1, Col 2 in reference image */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden pt-2 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="relative rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-elevated border border-[#E7DFD0] min-h-[380px] sm:min-h-[440px] flex items-center">
            
            {/* Background Panorama: Kerala Lake & Green Hills */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1800&auto=format&fit=crop&q=85')`,
              }}
            >
              {/* Subtle Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#1B4D36]/90 via-[#1B4D36]/70 to-transparent" />
            </div>

            {/* Left Content */}
            <div className="relative z-10 p-6 sm:p-12 lg:p-16 max-w-2xl text-white">
              <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-amber-200 text-xs font-bold mb-3">
                ഞങ്ങളെക്കുറിച്ച്
              </span>
              <h1 className="text-4xl sm:text-6xl font-bold font-malayalam-serif tracking-tight leading-none mb-3">
                നമ്മുടെ നാട്
              </h1>
              <p className="text-xl sm:text-2xl font-bold font-malayalam-script text-amber-200 mb-4">
                ഒരു നാടിന്റെ കഥ
              </p>
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-malayalam-body max-w-lg">
                കേരളത്തിന്റെ മനോഹാരിതയും, സംസ്കാരത്തെയും, ജനങ്ങളുടെ ഐക്യത്തെയും പ്രതിനിധീകരിക്കുന്ന കേരളത്തിന്റെ സ്വന്തം ഡിജിറ്റൽ ജനകീയ വേദി.
              </p>
            </div>

            {/* Wave curve divider at bottom right */}
            <div className="hidden sm:block absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#FAF7F0]/20 backdrop-blur-sm pointer-events-none" />
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 1: KERALA... NAMMUDE NAADU (Text + Traditional Architecture Photo) */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          {/* Golden Quote Box matching Screen 2 in Mobile Demo */}
          <div className="mb-6 sm:mb-8 p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#FFF8E7] border border-[#ECD9A8] shadow-xs relative overflow-hidden">
            <div className="flex items-start gap-3">
              <span className="text-3xl sm:text-4xl text-[#B87A1E] font-serif leading-none select-none">“</span>
              <div>
                <p className="text-base sm:text-lg font-bold font-malayalam-script text-[#8C5B0F] leading-snug">
                  നാടിന്റെ നന്മക്കായി... നമ്മളൊന്നിച്ചു...
                </p>
                <p className="text-xs text-[#6E593A] mt-1 font-malayalam-body">
                  കേരളത്തിന്റെ പാരമ്പര്യവും ഒരുമയും കാത്തുസൂക്ഷിക്കാൻ ഓരോ മലയാളിക്കുമുള്ള ഡിജിറ്റൽ കൂട്ടായ്മ.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-[#EAE4D7] shadow-card p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Description */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-6 rounded-full bg-[#1B4D36]" />
                  <h2 className="text-2xl sm:text-3xl font-bold font-malayalam-serif text-[#1B4D36]">
                    കേരളം... നമ്മുടെ നാട്
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-[#4A5750] leading-relaxed font-malayalam-body">
                  കേരളത്തിന്റെ സമ്പന്നമായ സാംസ്കാരിക പൈതൃകത്തെയും പ്രകൃതിയെയും, ജനങ്ങളുടെ ജീവസ്സുറ്റ പരസ്പരബന്ധത്തെയും പ്രതിഫലിപ്പിക്കുന്ന ഒരു സമഗ്ര ഡിജിറ്റൽ സംരംഭമാണ് &quot;നമ്മുടെ നാട്&quot;. 
                </p>
                <p className="text-xs sm:text-sm text-[#4A5750] leading-relaxed font-malayalam-body">
                  14 ജില്ലകളിലെയും തനതു സംസ്കാരം, തദ്ദേശീയ സേവനങ്ങൾ, വിജ്ഞാനകേന്ദ്രങ്ങൾ, പൊതു അറിയിപ്പുകൾ, ജനകീയ കൂട്ടായ്മകൾ എന്നിവ ഒരൊറ്റ കുടക്കീഴിൽ എത്തിക്കുകയാണ് ഞങ്ങളുടെ ലക്ഷ്യം. പരമ്പരാഗത തനിമയും ആധുനിക സാങ്കേതികവിദ്യയും സമന്വയിപ്പിച്ച് ഓരോ മലയാളിക്കും അഭിമാനിക്കാവുന്ന ഡിജിറ്റൽ അനുഭവം ഞങ്ങൾ ഒരുക്കുന്നു.
                </p>
                <div className="pt-2">
                  <Link
                    href="/community"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1B4D36] hover:bg-[#133A28] text-white text-xs font-bold transition shadow-xs active:scale-95 group"
                  >
                    <span>കൂടുതൽ അറിയാം</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Traditional Kerala Architecture Image */}
              <div className="lg:col-span-5 rounded-2xl overflow-hidden shadow-card border border-[#EAE4D7] h-72 sm:h-80 group">
                <img
                  src="https://images.unsplash.com/photo-1609137144822-54d9c79e6074?w=900&auto=format&fit=crop&q=80"
                  alt="Kerala Heritage Temple & Architecture"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

            </div>

            {/* ========================================================================= */}
            {/* STATS STRIP: 100% Literacy, 14 Districts, 3.5 Cr+ People, Nature Wealth */}
            {/* ========================================================================= */}
            <div className="mt-10 pt-8 border-t border-[#F3EFE6] grid grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Stat 1: Literacy */}
              <div className="bg-[#FAF7F0] rounded-2xl p-4 sm:p-5 border border-[#EAE4D7] text-center flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-[#E0F1E7] text-[#1B4D36] flex items-center justify-center mb-2">
                  <Award className="w-5 h-5" />
                </div>
                <span className="text-xl sm:text-2xl font-bold font-malayalam-serif text-[#1B4D36]">
                  100%
                </span>
                <span className="text-xs font-bold text-[#5C6A64] mt-0.5">
                  സാക്ഷരത
                </span>
              </div>

              {/* Stat 2: Districts */}
              <div className="bg-[#FAF7F0] rounded-2xl p-4 sm:p-5 border border-[#EAE4D7] text-center flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-[#E5DDD0] text-[#1B4D36] flex items-center justify-center mb-2">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-xl sm:text-2xl font-bold font-malayalam-serif text-[#1B4D36]">
                  14
                </span>
                <span className="text-xs font-bold text-[#5C6A64] mt-0.5">
                  ജില്ലകൾ
                </span>
              </div>

              {/* Stat 3: Population */}
              <div className="bg-[#FAF7F0] rounded-2xl p-4 sm:p-5 border border-[#EAE4D7] text-center flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-[#E5DDD0] text-[#1B4D36] flex items-center justify-center mb-2">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-xl sm:text-2xl font-bold font-malayalam-serif text-[#1B4D36]">
                  3.5 Cr+
                </span>
                <span className="text-xs font-bold text-[#5C6A64] mt-0.5">
                  ജനസംഖ്യ
                </span>
              </div>

              {/* Stat 4: Nature */}
              <div className="bg-[#FAF7F0] rounded-2xl p-4 sm:p-5 border border-[#EAE4D7] text-center flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-[#E0F1E7] text-[#1B4D36] flex items-center justify-center mb-2">
                  <Palmtree className="w-5 h-5" />
                </div>
                <span className="text-lg sm:text-xl font-bold font-malayalam-serif text-[#1B4D36]">
                  പ്രകൃതി
                </span>
                <span className="text-xs font-bold text-[#5C6A64] mt-0.5">
                  നമ്മുടെ സമ്പത്ത്
                </span>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: OUR MISSION (ഞങ്ങളുടെ ലക്ഷ്യം) with traditional boat & hut sketch */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="bg-[#FAF4E6] rounded-3xl border border-[#E8DCBF] p-6 sm:p-10 shadow-card relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-3">
                <h3 className="text-2xl font-bold font-malayalam-serif text-[#1B4D36]">
                  ഞങ്ങളുടെ ലക്ഷ്യം
                </h3>
                <p className="text-xs sm:text-sm text-[#4A5750] leading-relaxed font-malayalam-body">
                  കേരളത്തിന്റെ ഓരോ ഗ്രാമങ്ങളിലെയും തനിമയും ഒരുമയും നിലനിർത്തിക്കൊണ്ട് പുതിയ തലമുറയ്ക്ക് നാടിന്റെ വിജ്ഞാനവും സൗന്ദര്യവും പകർന്നു നൽകുക എന്നതാണ് നമ്മുടെ ലക്ഷ്യം.
                </p>
                <p className="text-xs sm:text-sm text-[#4A5750] leading-relaxed font-malayalam-body">
                  സാങ്കേതികവിദ്യയുടെ സഹായത്തോടെ നാട്ടിൻപുറത്തെ ചെറുകിട സംരംഭങ്ങളെയും സേവനങ്ങളെയും ശാക്തീകരിക്കുകയും, ജനങ്ങൾ തമ്മിലുള്ള പരസ്പര സഹായവും ഐക്യവും വളർത്തുകയും ചെയ്യുക.
                </p>
              </div>

              {/* Right Illustration: Traditional Kerala Countryside Sketch */}
              <div className="lg:col-span-4 flex items-center justify-center">
                <svg viewBox="0 0 200 120" className="w-56 h-36 text-[#8C5B0F]/70 stroke-current fill-none">
                  {/* Traditional hut */}
                  <path d="M50 80 L80 40 L110 80 Z" strokeWidth="2" />
                  <path d="M60 80 L60 100 L100 100 L100 80" strokeWidth="2" />
                  <path d="M75 100 L75 88 L85 88 L85 100" strokeWidth="1.5" />
                  {/* Coconut tree */}
                  <path d="M150 100 Q145 60 155 30" strokeWidth="2.5" />
                  <path d="M155 30 Q130 20 120 30 M155 30 Q140 10 145 0 M155 30 Q170 10 175 0 M155 30 Q180 20 190 30" strokeWidth="2" />
                  {/* Ground & River line */}
                  <path d="M10 100 C50 95 150 105 195 100" strokeWidth="1.5" />
                  <path d="M20 108 C60 103 140 112 185 108" strokeWidth="1" strokeDasharray="4 2" />
                </svg>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: CORE PILLARS (ഞങ്ങളുടെ പ്രധാന മൂല്യങ്ങൾ) */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl font-bold font-malayalam-serif text-[#1B4D36]">
              ഞങ്ങളുടെ പ്രധാന മൂല്യങ്ങൾ
            </h3>
            <p className="text-xs text-[#5C6A64] mt-1 font-malayalam-body">
              ഓരോ പൗരന്റെയും ജീവിതം സുഗമവും അഭിമാനകരവുമാക്കാൻ ഞങ്ങൾ പ്രതിജ്ഞാബദ്ധരാണ്
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-white rounded-2xl p-5 border border-[#EAE4D7] shadow-xs hover:border-[#1B4D36]/40 transition">
              <div className="w-10 h-10 rounded-full bg-[#E0F1E7] text-[#1B4D36] flex items-center justify-center mb-3">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-[#1A2420] mb-1">വിശ്വസനീയത</h4>
              <p className="text-xs text-[#5C6A64] leading-relaxed">
                പരിശോധിച്ചുറപ്പിച്ച വിവരങ്ങളും തദ്ദേശീയ വാർത്തകളും മാത്രം ജനങ്ങളിലേക്ക് എത്തിക്കുന്നു.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-[#EAE4D7] shadow-xs hover:border-[#1B4D36]/40 transition">
              <div className="w-10 h-10 rounded-full bg-[#FAF4E6] text-[#B87A1E] flex items-center justify-center mb-3">
                <Heart className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-[#1A2420] mb-1">ജനകീയ പങ്കാളിത്തം</h4>
              <p className="text-xs text-[#5C6A64] leading-relaxed">
                നാട്ടിലെ പ്രശ്നങ്ങളും ആവശ്യങ്ങളും ഒരുമിച്ചു ചർച്ച ചെയ്യാനും പരിഹരിക്കാനും പൊതുവേദി.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-[#EAE4D7] shadow-xs hover:border-[#1B4D36]/40 transition">
              <div className="w-10 h-10 rounded-full bg-[#E5DDD0] text-[#1B4D36] flex items-center justify-center mb-3">
                <Landmark className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-[#1A2420] mb-1">സാംസ്കാരിക സംരക്ഷണം</h4>
              <p className="text-xs text-[#5C6A64] leading-relaxed">
                കേരളത്തിന്റെ തനതു കലാരൂപങ്ങളും ചരിത്ര സ്മാരകങ്ങളും ഡിജിറ്റലായി കാത്തുസൂക്ഷിക്കുന്നു.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-[#EAE4D7] shadow-xs hover:border-[#1B4D36]/40 transition">
              <div className="w-10 h-10 rounded-full bg-[#E0F1E7] text-[#1B4D36] flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-[#1A2420] mb-1">എഐ സാങ്കേതികവിദ്യ</h4>
              <p className="text-xs text-[#5C6A64] leading-relaxed">
                മലയാളത്തിൽ കൃത്യമായ വിവരങ്ങൾ ലഭ്യമാക്കാൻ അത്യാധുനിക &quot;നാട് AI&quot; സഹായി.
              </p>
            </div>

          </div>
        </section>

      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
