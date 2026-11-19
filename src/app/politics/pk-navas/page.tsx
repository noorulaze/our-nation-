"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Users, ArrowRight, ShieldCheck, Building2 } from "lucide-react";

export default function PkNavasRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Graceful automatic transition to standardized Leadership profile
    const timer = setTimeout(() => {
      router.push("/leadership/pk-nawas");
    }, 1500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex items-center justify-center">
        <div className="bg-white rounded-3xl border border-[#EDE6D8] p-8 sm:p-12 shadow-card text-center max-w-xl w-full space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#194B35]/10 border border-[#194B35]/20 flex items-center justify-center mx-auto text-[#194B35]">
            <Users className="w-8 h-8 text-[#C39A5B]" />
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#C39A5B] block">
              Official Profile System
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-[#194B35] font-sans">
              PK Nawas
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-[#5C6A64]">
              Overall Community Leader &amp; Project Guidance
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] text-xs text-[#5C6A64] leading-relaxed">
            This leadership record has been migrated to the standardized OUR NATION Leadership &amp; Guidance directory under verified administrative standards.
          </div>

          <div className="pt-2">
            <Link
              href="/leadership/pk-nawas"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#194B35] hover:bg-[#123626] text-white text-xs sm:text-sm font-bold shadow-sm transition"
            >
              <span>View Leadership Profile</span>
              <ArrowRight className="w-4 h-4 text-[#F3CE7A]" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
