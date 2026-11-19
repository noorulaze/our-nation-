"use client";

import React from "react";
import Link from "next/link";
import { KeralaLogo } from "./KeralaLogo";
import { 
  Youtube, 
  Facebook, 
  Instagram, 
  Twitter, 
  Send as TelegramIcon,
  ShieldCheck,
  ExternalLink,
  Phone
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#111814] text-[#D8E2DC] border-t border-[#1F2922] mt-auto pb-20 lg:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        
        {/* 4-Column Compact & Balanced Main Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 pb-8 border-b border-[#1F2922]">
          
          {/* Column 1: Brand & Independent Platform Disclaimer (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <KeralaLogo variant="dark" showSubtext={true} />
            <p className="text-xs text-[#98A8A0] leading-relaxed max-w-sm">
              A unified digital municipality platform connecting Tanur residents to verified public services, ward information, development tracking, and civic governance.
            </p>

            {/* Independent Platform Disclaimer Notice */}
            <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-[11px] text-[#A2B2AA] space-y-0.5 max-w-sm">
              <div className="flex items-center gap-1.5 font-bold text-[#C39A5B]">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span>Independent Platform</span>
              </div>
              <p className="leading-normal text-white/60 text-[10.5px]">
                OUR NATION is an independent civic platform. Public information reflects documented sources. Central switchboard: 0494 2440228.
              </p>
            </div>
          </div>

          {/* Column 2: Six Core Features (3 cols) */}
          <div className="lg:col-span-3 space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-sans">
              Primary Features
            </h4>
            <ul className="space-y-1.5 text-xs text-[#A2B2AA]">
              <li>
                <Link href="/digital-municipality" className="hover:text-[#C39A5B] transition-colors block py-0.5">
                  Tanur Municipality Hub
                </Link>
              </li>
              <li>
                <Link href="/local-governments" className="hover:text-[#C39A5B] transition-colors block py-0.5">
                  Local Governments &amp; Panchayats
                </Link>
              </li>
              <li>
                <Link href="/civic-connect" className="hover:text-[#C39A5B] transition-colors block py-0.5">
                  Report an Issue
                </Link>
              </li>
              <li>
                <Link href="/development-tracker" className="hover:text-[#C39A5B] transition-colors block py-0.5">
                  Track Projects
                </Link>
              </li>
              <li>
                <Link href="/public-services" className="hover:text-[#C39A5B] transition-colors block py-0.5">
                  Municipal Services
                </Link>
              </li>
              <li>
                <Link href="/documents" className="hover:text-[#C39A5B] transition-colors block py-0.5">
                  Notices &amp; Documents
                </Link>
              </li>
              <li>
                <Link href="/peoples-voice" className="hover:text-[#C39A5B] transition-colors block py-0.5">
                  Share Your Ideas
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Important Links & Useful Resources (3 cols) */}
          <div className="lg:col-span-3 space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-sans">
              Useful Resources
            </h4>
            <ul className="space-y-1.5 text-xs text-[#A2B2AA]">
              <li>
                <Link href="/about" className="hover:text-[#C39A5B] transition-colors block py-0.5">
                  About OUR NATION
                </Link>
              </li>
              <li>
                <a 
                  href="https://ksmart.lsgkerala.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#C39A5B] transition-colors flex items-center gap-1 text-[#F3CE7A] font-medium py-0.5"
                >
                  <span>K-Smart Kerala Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://tanurmunicipality.lsgkerala.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#C39A5B] transition-colors flex items-center gap-1 py-0.5"
                >
                  <span>Tanur Municipality Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <Link href="/ai" className="hover:text-[#C39A5B] transition-colors flex items-center gap-1 text-emerald-400 py-0.5">
                  <span>Naadu AI Assistant</span>
                </Link>
              </li>
              <li>
                <a href="tel:04942440228" className="hover:text-[#C39A5B] transition-colors flex items-center gap-1 py-0.5">
                  <Phone className="w-3 h-3 text-[#C39A5B]" />
                  <span>Switchboard: 0494 2440228</span>
                </a>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#C39A5B] transition-colors text-white/50 block py-0.5">
                  Admin Desk
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Links & Kerala Identity (2 cols) */}
          <div className="lg:col-span-2 flex flex-col justify-between space-y-4">
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-sans">
                Follow Us
              </h4>
              <div className="flex items-center gap-2 text-[#A2B2AA]">
                <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="w-7 h-7 rounded-lg bg-[#1C2720] hover:bg-[#C39A5B] hover:text-[#111814] flex items-center justify-center transition">
                  <Youtube className="w-3.5 h-3.5" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="w-7 h-7 rounded-lg bg-[#1C2720] hover:bg-[#C39A5B] hover:text-[#111814] flex items-center justify-center transition">
                  <Facebook className="w-3.5 h-3.5" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="w-7 h-7 rounded-lg bg-[#1C2720] hover:bg-[#C39A5B] hover:text-[#111814] flex items-center justify-center transition">
                  <Instagram className="w-3.5 h-3.5" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="w-7 h-7 rounded-lg bg-[#1C2720] hover:bg-[#C39A5B] hover:text-[#111814] flex items-center justify-center transition">
                  <Twitter className="w-3.5 h-3.5" />
                </a>
                <a href="https://telegram.org" target="_blank" rel="noreferrer" aria-label="Telegram" className="w-7 h-7 rounded-lg bg-[#1C2720] hover:bg-[#C39A5B] hover:text-[#111814] flex items-center justify-center transition">
                  <TelegramIcon className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Kerala Identity Silhouette Badge */}
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/[0.03] border border-white/5">
              <svg 
                viewBox="0 0 60 90" 
                className="w-6 h-10 text-[#C39A5B] fill-current shrink-0 opacity-80"
                aria-hidden="true"
              >
                <path d="M42 5 C38 12 34 20 28 30 C24 38 20 46 22 55 C24 64 30 72 36 82 C38 85 36 88 32 88 C25 82 18 72 16 62 C14 52 18 40 22 30 C26 20 32 10 38 4 Z" />
              </svg>
              <div className="flex flex-col text-left">
                <span className="font-brand font-bold text-white text-xs tracking-wide leading-tight">
                  KERALA
                </span>
                <span className="text-[9px] text-[#C39A5B] font-medium tracking-wide">
                  God&apos;s Own Country
                </span>
                <span className="text-[8.5px] text-white/50">
                  Tanur Grade II ULB
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* 3. Slim Horizontal Bottom Copyright Strip (English Only) */}
        <div className="pt-4 pb-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#7A8E84]">
          <p className="text-center sm:text-left text-[11px]">
            Copyright &copy; 2026 OUR NATION. All rights reserved.
          </p>

          <div className="flex items-center gap-3 text-[11px] text-[#A2B2AA]">
            <Link href="/about" className="hover:text-[#C39A5B] transition-colors">About</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-[#C39A5B] transition-colors">Contact</Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-[#C39A5B] transition-colors">Privacy</Link>
          </div>
        </div>

        {/* 4. Elegant CRAFTIQ Developer Credit */}
        <div className="pt-2 text-center text-[10.5px] text-[#7A8E84]/80 tracking-wide">
          Designed &amp; Developed by{" "}
          <span className="font-extrabold text-[#D8E2DC] tracking-wider hover:text-[#C39A5B] transition-colors cursor-default">
            CRAFTIQ
          </span>
        </div>

      </div>
    </footer>
  );
}
