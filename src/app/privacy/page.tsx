"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { ShieldCheck, Lock, EyeOff, FileText, Phone, Building2, CheckCircle2 } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] flex flex-col font-sans selection:bg-[#C39A5B]/30 selection:text-[#194B35]">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
        
        {/* Header Banner */}
        <div className="space-y-3 border-b border-[#EDE6D8] pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-[#194B35]" />
            <span>Citizen Data Protection &amp; Privacy Policy</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-[#194B35] font-sans tracking-tight">
            Privacy Policy
          </h1>

          <p className="text-sm sm:text-base text-[#5C6A64] leading-relaxed">
            OUR NATION is committed to safeguarding the privacy and personal data of all residents of Tanur Municipality. This policy explains what information is collected, how it is used, and how your rights are protected.
          </p>

          <div className="text-xs text-[#7A8880] flex items-center gap-2">
            <span>Last Updated: November 2026</span>
            <span>•</span>
            <span>Tanur Municipality Grade II Urban Local Body</span>
          </div>
        </div>

        {/* Policy Content Sections */}
        <div className="space-y-8 text-xs sm:text-sm text-[#3D4B44] leading-relaxed">
          
          {/* Section 1 */}
          <section className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-8 space-y-3 shadow-xs">
            <div className="flex items-center gap-2 text-base font-bold text-[#194B35]">
              <Lock className="w-4 h-4 text-[#C39A5B]" />
              <h2>1. Privacy by Default</h2>
            </div>
            <p>
              By default, all citizen profile settings are strictly private. Your phone number, personal email address, and precise physical address are hidden from public view unless you explicitly choose to make them visible in your profile privacy settings.
            </p>
          </section>

          {/* Section 2 */}
          <section className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-8 space-y-3 shadow-xs">
            <div className="flex items-center gap-2 text-base font-bold text-[#194B35]">
              <FileText className="w-4 h-4 text-[#C39A5B]" />
              <h2>2. Information We Collect</h2>
            </div>
            <p>We only collect information necessary to deliver civic technology services to residents:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[#5C6A64]">
              <li><strong>Account Credentials:</strong> Full name, username, email address, and encrypted passwords for authentication.</li>
              <li><strong>Civic Reports:</strong> Location, description, category, and photographs submitted when reporting local civic issues through Civic Connect.</li>
              <li><strong>Community Participation:</strong> Ideas, proposals, and comments shared in People&apos;s Voice discussions.</li>
              <li><strong>System Diagnostics:</strong> Non-personally identifiable browser headers and interaction timestamps to ensure security and prevent abuse.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-8 space-y-3 shadow-xs">
            <div className="flex items-center gap-2 text-base font-bold text-[#194B35]">
              <EyeOff className="w-4 h-4 text-[#C39A5B]" />
              <h2>3. How Your Information Is Used</h2>
            </div>
            <p>
              Your data is used solely to verify civic reports, route grievances to responsible ward engineers, deliver project updates, and authenticate access to municipal records. We do not sell, rent, monetize, or share citizen information with commercial third parties or advertisers.
            </p>
          </section>

          {/* Section 4 */}
          <section className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-8 space-y-3 shadow-xs">
            <div className="flex items-center gap-2 text-base font-bold text-[#194B35]">
              <Building2 className="w-3.5 h-3.5 text-[#C39A5B]" />
              <h2>4. Public Civic Records &amp; Data Retention</h2>
            </div>
            <p>
              To maintain statutory accountability and transparency, public civic issue reports (such as road repair requests and streetlight faults) are preserved in the civic log. When an account is deleted, personal identifying information is permanently anonymized, while the civic issue record itself remains in municipal archives for public infrastructure tracking.
            </p>
          </section>

          {/* Section 5 */}
          <section className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-8 space-y-3 shadow-xs">
            <div className="flex items-center gap-2 text-base font-bold text-[#194B35]">
              <Phone className="w-4 h-4 text-[#C39A5B]" />
              <h2>5. Contacting the Municipality</h2>
            </div>
            <p>
              For questions regarding privacy, personal data corrections, or account deletion inquiries, please reach out to the Tanur Municipality administration:
            </p>
            <div className="pt-2 text-xs text-[#194B35] font-semibold space-y-1">
              <p>Municipal Office, Civil Station Road, Tanur, Malappuram, Kerala - 676302</p>
              <p>Central Switchboard: <a href="tel:04942440228" className="text-[#C39A5B] font-bold hover:underline">0494 2440228</a> (Mon–Sat, 10:00 AM – 5:00 PM)</p>
            </div>
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
            href="/terms"
            className="text-xs font-bold text-[#C39A5B] hover:underline"
          >
            Terms of Service →
          </Link>
        </div>

      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
