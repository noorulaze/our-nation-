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
              കേരളത്തിന്റെ സാംസ്കാരിക പൈതൃകവും, പ്രാദേശിക കൂട്ടായ്മകളും, തദ്ദേശീയ സേവനങ്ങളും ഒരുമിപ്പിക്കുന്ന സമഗ്ര ജനകീയ ഡിജിറ്റൽ വേദി.
            </p>
          </div>

          {/* Column 1: പ്രധാന ലിങ്കുകൾ */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 font-malayalam-serif tracking-wide">
              പ്രധാന ലിങ്കുകൾ
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A2B2AA]">
              <li>
                <Link href="/" className="hover:text-amber-300 transition">
                  മുഖ്യ പേജ് (Home)
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-300 transition">
                  നമ്മുടെ നാട് (About Us)
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-amber-300 transition">
                  വാർത്തകൾ (News)
                </Link>
              </li>
              <li>
                <Link href="/culture" className="hover:text-amber-300 transition">
                  സംസ്കാരം (Culture)
                </Link>
              </li>
              <li>
                <Link href="/education" className="hover:text-amber-300 transition">
                  വിദ്യാഭ്യാസം (Education)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: കൂടുതൽ */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 font-malayalam-serif tracking-wide">
              കൂടുതൽ
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A2B2AA]">
              <li>
                <Link href="/events" className="hover:text-amber-300 transition">
                  പരിപാടികൾ (Events)
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-amber-300 transition">
                  ഗാലറി (Gallery)
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-300 transition">
                  ബന്ധപ്പെടുക (Contact)
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:text-amber-300 transition">
                  കമ്മ്യൂണിറ്റി ഫോറം
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-amber-300 transition">
                  ഉപയോഗ നിബന്ധനകൾ
                </Link>
              </li>
              <li>
                <Link href="/politics/pk-navas" className="hover:text-amber-300 transition text-amber-200/90 font-medium">
                  ജനപ്രതിനിധികൾ (MLA Profile)
                </Link>
              </li>
              <li>
                <Link href="/ai" className="hover:text-amber-300 transition text-amber-300">
                  നാട് AI സഹായി
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
                <span className="font-serif italic text-amber-200 text-lg leading-none">
                  Kerala
                </span>
                <span className="text-[10px] text-amber-300/70 italic tracking-wider">
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
