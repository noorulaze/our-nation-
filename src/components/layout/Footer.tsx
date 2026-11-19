"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";
import { KeralaLogo } from "./KeralaLogo";
import { 
  Youtube, 
  Facebook, 
  Instagram, 
  Twitter, 
  Send as TelegramIcon,
  Globe
} from "lucide-react";

export function Footer() {
  const { language, setLanguage } = useLanguage();

  return (
    <footer className="bg-[#131A15] text-[#D8E2DC] border-t border-[#232F27] mt-auto pb-24 lg:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#232F27]">
          
          {/* Logo & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <KeralaLogo variant="dark" showSubtext={true} />
            <p className="text-xs text-[#98A8A0] leading-relaxed max-w-sm mt-3">
              താനൂർ നഗരസഭയിലെ പൗരന്മാർക്കായി വികസിപ്പിച്ച സമഗ്ര ഡിജിറ്റൽ മുൻസിപ്പാലിറ്റി പ്ലാറ്റ്‌ഫോം. വാർഡുകൾ, പൗര സേവനങ്ങൾ, വികസന പദ്ധതികൾ, പരാതി പരിഹാരം എന്നിവ ഒരൊറ്റ കുടക്കീഴിൽ.
            </p>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-[11px] text-[#A2B2AA] space-y-1 max-w-sm">
              <span className="font-bold text-amber-300 block">സ്വതന്ത്ര സിവിക് പ്ലാറ്റ്‌ഫോം (Independent Platform)</span>
              <p className="leading-relaxed">
                ഔർ നേഷൻ (OUR NATION) താനൂർ നഗരസഭയിലെ പൗരന്മാർക്കായുള്ള സ്വതന്ത്ര സിവിക് ടെക്നോളജി പ്ലാറ്റ്‌ഫോമാണ്. ഇത് സർക്കാരിന്റെ ഔദ്യോഗിക പോർട്ടലല്ല. ഔദ്യോഗിക നടപടികൾക്ക് K-Smart പോർട്ടൽ സന്ദർശിക്കുക.
              </p>
            </div>
          </div>

          {/* Column 1: ആറ് പ്രധാന സേവനങ്ങൾ (Six Core Features) */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 font-malayalam-serif tracking-wide">
              പ്രധാന സേവനങ്ങൾ
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A2B2AA]">
              <li>
                <Link href="/digital-municipality" className="hover:text-amber-300 transition">
                  ഡിജിറ്റൽ നഗരസഭ (Digital Municipality)
                </Link>
              </li>
              <li>
                <Link href="/civic-connect" className="hover:text-amber-300 transition">
                  സിവിക് കണക്ട് (Civic Connect)
                </Link>
              </li>
              <li>
                <Link href="/development-tracker" className="hover:text-amber-300 transition">
                  വികസന ട്രാക്കർ (Development Tracker)
                </Link>
              </li>
              <li>
                <Link href="/public-services" className="hover:text-amber-300 transition">
                  പൗര സേവനങ്ങൾ (Public Services)
                </Link>
              </li>
              <li>
                <Link href="/documents" className="hover:text-amber-300 transition">
                  രേഖകളും ഉത്തരവുകളും (Documents)
                </Link>
              </li>
              <li>
                <Link href="/peoples-voice" className="hover:text-amber-300 transition">
                  ജനകീയ ശബ്ദം (People&apos;s Voice)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: നഗരസഭ വിവരങ്ങൾ & സഹായം */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 font-malayalam-serif tracking-wide">
              വിവരങ്ങൾ &amp; ലിങ്കുകൾ
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A2B2AA]">
              <li>
                <Link href="/about" className="hover:text-amber-300 transition">
                  പ്ലാറ്റ്‌ഫോമിനെക്കുറിച്ച് (About Us)
                </Link>
              </li>
              <li>
                <a 
                  href="https://ksmart.lsgkerala.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-amber-300 transition flex items-center gap-1 text-amber-200/90 font-medium"
                >
                  <span>K-Smart കേരള പോർട്ടൽ</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://tanurmunicipality.lsgkerala.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-amber-300 transition flex items-center gap-1"
                >
                  <span>താനൂർ നഗരസഭാ പോർട്ടൽ</span>
                </a>
              </li>
              <li>
                <Link href="/ai" className="hover:text-amber-300 transition text-amber-300">
                  നാട് AI സഹായി (Naadu AI)
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-amber-300 transition">
                  അഡ്മിൻ പോർട്ടൽ (Admin Desk)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: ഞങ്ങളെ പിന്തുടരൂ & Kerala God's Own Country Outline */}
          <div className="flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-bold text-white mb-4 font-malayalam-serif tracking-wide">
                ഞങ്ങളെ പിന്തുടരൂ
              </h4>
              <div className="flex items-center gap-3 text-[#A2B2AA]">
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-[#1C2720] hover:bg-amber-400 hover:text-[#131A15] flex items-center justify-center transition">
                  <Youtube className="w-4 h-4" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-[#1C2720] hover:bg-amber-400 hover:text-[#131A15] flex items-center justify-center transition">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-[#1C2720] hover:bg-amber-400 hover:text-[#131A15] flex items-center justify-center transition">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-[#1C2720] hover:bg-amber-400 hover:text-[#131A15] flex items-center justify-center transition">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="https://telegram.org" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-[#1C2720] hover:bg-amber-400 hover:text-[#131A15] flex items-center justify-center transition">
                  <TelegramIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Kerala Map Graphic & God's Own Country Tagline */}
            <div className="mt-6 pt-4 flex items-center gap-3">
              <svg 
                viewBox="0 0 60 90" 
                className="w-10 h-16 text-amber-300/80 fill-current opacity-80"
              >
                {/* Stylized Kerala Strip Map Outline */}
                <path d="M42 5 C38 12 34 20 28 30 C24 38 20 46 22 55 C24 64 30 72 36 82 C38 85 36 88 32 88 C25 82 18 72 16 62 C14 52 18 40 22 30 C26 20 32 10 38 4 Z" />
              </svg>
              <div className="flex flex-col">
                <span className="font-brand font-bold text-amber-200 text-base tracking-wide leading-none">
                  KERALA
                </span>
                <span className="text-[10px] text-amber-300/80 font-medium tracking-wide">
                  God&apos;s Own Country
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#7A8E84]">
          <p>
            © {new Date().getFullYear()} നമ്മുടെ നാട്. എല്ലാ അവകാശങ്ങളും സുരക്ഷിതമാണ്.
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLanguage("ml")}
              className={`hover:text-amber-300 transition ${language === "ml" ? "text-amber-300 font-bold" : ""}`}
            >
              മലയാളം
            </button>
            <span>|</span>
            <button
              onClick={() => setLanguage("en")}
              className={`hover:text-amber-300 transition ${language === "en" ? "text-amber-300 font-bold" : ""}`}
            >
              English
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
