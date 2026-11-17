"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  Home, 
  ArrowLeft, 
  Compass, 
  Newspaper, 
  Sparkles, 
  BookOpen, 
  Calendar, 
  Camera, 
  Mail 
} from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-16 flex flex-col items-center justify-center text-center">
        
        {/* Cultural Kerala 404 Badge */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-[#E0F1E7] border border-[#BDE3CE] flex items-center justify-center text-[#1B4D36] mb-6 shadow-sm">
          <Compass className="w-10 h-10 sm:w-12 sm:h-12 animate-spin-slow" />
        </div>

        <span className="text-sm font-bold uppercase tracking-wider text-[#B87A1E] font-malayalam-body mb-2">
          404 • വഴി തെറ്റിയോ?
        </span>

        <h1 className="text-3xl sm:text-5xl font-bold font-malayalam-serif text-[#1B4D36] mb-4">
          ക്ഷമിക്കണം, ഈ താൾ കണ്ടെത്താനായില്ല
        </h1>

        <p className="text-sm sm:text-base text-[#4A5750] max-w-md mx-auto mb-8 font-malayalam-body leading-relaxed">
          നിങ്ങൾ തിരഞ്ഞ പേജ് നിലവിലില്ല അല്ലെങ്കിൽ മറ്റൊരിടത്തേക്ക് മാറ്റപ്പെട്ടിരിക്കാം. നമ്മുടെ നാടിന്റെ പ്രധാന പേജുകളിലേക്ക് താഴെയുള്ള ലിങ്കുകൾ വഴി പോകാം:
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-[#1B4D36] hover:bg-[#133A28] text-white font-bold text-xs sm:text-sm transition-all duration-200 active:scale-95 shadow-md flex items-center gap-2 group"
          >
            <Home className="w-4 h-4" />
            <span>മുഖ്യ പേജിലേക്ക് മടങ്ങാം (Home)</span>
          </Link>

          <Link
            href="/contact"
            className="px-6 py-3 rounded-full bg-white hover:bg-[#F3EFE6] text-[#1B4D36] border border-[#DDD5C5] font-bold text-xs sm:text-sm transition-all duration-200 active:scale-95 shadow-sm flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            <span>ഞങ്ങളെ അറിയിക്കുക</span>
          </Link>
        </div>

        {/* Quick Discovery Cards */}
        <div className="w-full max-w-2xl bg-white rounded-3xl border border-[#EAE4D7] p-6 sm:p-8 shadow-card text-left">
          <h2 className="text-sm font-bold text-[#1A2420] mb-4 font-malayalam-serif">
            നാടിന്റെ മറ്റു പ്രധാന വിഭാഗങ്ങൾ കാണാം:
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { title: "വാർത്തകൾ", href: "/news", icon: Newspaper },
              { title: "സംസ്കാരം", href: "/culture", icon: Sparkles },
              { title: "വിദ്യാഭ്യാസം", href: "/education", icon: BookOpen },
              { title: "പരിപാടികൾ", href: "/events", icon: Calendar },
              { title: "ഗാലറി", href: "/gallery", icon: Camera },
              { title: "താനൂർ പ്രൊഫൈൽ", href: "/tanur", icon: Compass },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link
                  key={idx}
                  href={item.href}
                  className="p-3 rounded-2xl bg-[#FAF7F0] hover:bg-[#EFE9DC] border border-[#EAE4D7] flex items-center gap-2.5 transition group"
                >
                  <div className="w-8 h-8 rounded-full bg-[#E5DDD0] text-[#1B4D36] flex items-center justify-center shrink-0 group-hover:bg-[#1B4D36] group-hover:text-white transition">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-[#2A3730] group-hover:text-[#1B4D36] transition">
                    {item.title}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
