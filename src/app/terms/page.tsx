"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { FileText, CheckCircle2, AlertTriangle, Users, Landmark, Scale } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] flex flex-col font-sans selection:bg-[#C39A5B]/30 selection:text-[#194B35]">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
        
        {/* Header Banner */}
        <div className="space-y-3 border-b border-[#EDE6D8] pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200">
            <Scale className="w-3.5 h-3.5 text-[#C39A5B]" />
            <span>Community Guidelines &amp; Civic Terms</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-[#194B35] font-sans tracking-tight">
            Terms of Service
          </h1>

          <p className="text-sm sm:text-base text-[#5C6A64] leading-relaxed">
            Welcome to OUR NATION, the citizen-centric digital platform for Tanur Municipality. By creating an account or using our civic services, you agree to these community guidelines and terms.
          </p>

          <div className="text-xs text-[#7A8880] flex items-center gap-2">
            <span>Last Updated: November 2026</span>
            <span>•</span>
            <span>Tanur Municipality Grade II Urban Local Body</span>
          </div>
        </div>

        {/* Terms Sections */}
        <div className="space-y-8 text-xs sm:text-sm text-[#3D4B44] leading-relaxed">
          
          {/* Section 1 */}
          <section className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-8 space-y-3 shadow-xs">
            <div className="flex items-center gap-2 text-base font-bold text-[#194B35]">
              <Users className="w-4 h-4 text-[#C39A5B]" />
              <h2>1. Authentic Citizen Participation</h2>
            </div>
            <p>
              OUR NATION is built on mutual public trust. Users must provide accurate, non-misleading information when creating an account or filing civic issue reports. Impersonating municipal officials, councillors, or other citizens is strictly prohibited and results in immediate account suspension.
            </p>
          </section>

          {/* Section 2 */}
          <section className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-8 space-y-3 shadow-xs">
            <div className="flex items-center gap-2 text-base font-bold text-[#194B35]">
              <AlertTriangle className="w-4 h-4 text-[#C39A5B]" />
              <h2>2. Civic Connect Guidelines</h2>
            </div>
            <p>
              When reporting civic issues (road repairs, streetlights, drainage, or sanitation):
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[#5C6A64]">
              <li>Submit genuine photographs taken at the reported location within Tanur Municipality.</li>
              <li>Provide clear, constructive descriptions to help ward engineers locate and resolve the issue.</li>
              <li>Do not file abusive, defamatory, threatening, or politically motivated false reports.</li>
              <li>Do not tamper with, duplicate, or falsely dispute verified civic reports filed by fellow citizens.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-8 space-y-3 shadow-xs">
            <div className="flex items-center gap-2 text-base font-bold text-[#194B35]">
              <Landmark className="w-4 h-4 text-[#C39A5B]" />
              <h2>3. Public Information &amp; Official Records</h2>
            </div>
            <p>
              All municipal information, development budgets, ward boundaries, councillor lists, and council orders presented on OUR NATION reflect documented statutory records from official local self-government sources. This platform is an independent civic technology initiative designed to enhance public transparency and citizen convenience.
            </p>
          </section>

          {/* Section 4 */}
          <section className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-8 space-y-3 shadow-xs">
            <div className="flex items-center gap-2 text-base font-bold text-[#194B35]">
              <CheckCircle2 className="w-4 h-4 text-[#C39A5B]" />
              <h2>4. Account Suspension &amp; Moderation</h2>
            </div>
            <p>
              To maintain platform safety, accounts that repeatedly violate community rules, post hate speech, or abuse emergency contacts may be suspended by municipal moderators. Suspended citizens receive a formal notice and may appeal directly to the Tanur Municipal switchboard at <a href="tel:04942440228" className="text-[#C39A5B] font-bold hover:underline">0494 2440228</a>.
            </p>
          </section>

        </div>

        {/* Back Link */}
        <div className="pt-4 border-t border-[#EDE6D8] flex items-center justify-between">
          <Link
            href="/"
            className="text-xs font-bold text-[#194B35] hover:underline"
          >
            ← Return to Homepage
          </Link>
          <Link
            href="/privacy"
            className="text-xs font-bold text-[#C39A5B] hover:underline"
          >
            Privacy Policy →
          </Link>
        </div>

      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
