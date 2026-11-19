"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { AdminCivicNav } from "@/components/civic/AdminCivicNav";
import { useLanguage } from "@/lib/i18n/context";
import { 
  CIVIC_AUTHORITIES, 
  CivicAuthority,
  civicStore 
} from "@/lib/data/civicConnectData";
import { 
  Building2, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  FileText, 
  ArrowRight, 
  ExternalLink,
  CheckCircle2
} from "lucide-react";

export default function AdminCivicAuthoritiesPage() {
  const { language } = useLanguage();
  const [authorities] = useState<CivicAuthority[]>(CIVIC_AUTHORITIES);
  const issues = civicStore.getIssues();

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] pb-24">
      <Navbar />
      <AdminCivicNav />

      {/* Header Hub */}
      <section className="bg-gradient-to-b from-[#FAF4E6] to-[#FAF7F0] border-b border-[#E8DCBF] pt-8 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-6 h-6 rounded-lg bg-[#143E2C] text-amber-300 flex items-center justify-center">
                  <Building2 className="w-3.5 h-3.5" />
                </span>
                <span className="text-xs font-bold text-[#143E2C] uppercase tracking-wider">
                  അതോറിറ്റി ഡയറക്ടറി
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#194B35] font-serif">
                {language === "ml" ? "ബന്ധപ്പെട്ട സർക്കാർ വകുപ്പുകൾ & കാര്യാലയങ്ങൾ" : "Local Authorities & Government Liaisons"}
              </h1>
              <p className="text-xs sm:text-sm text-[#5C6A64] mt-1">
                താനൂർ നഗരസഭയിലെയും മലപ്പുറം ജില്ലയിലെയും പൊതുജന സേവന വകുപ്പുകൾ.
              </p>
            </div>

            <span className="text-xs font-bold text-[#194B35] bg-[#E0F1E7] px-3 py-1.5 rounded-xl border border-[#BDE3CE] self-start sm:self-auto">
              5 ഔദ്യോഗിക വകുപ്പുകൾ കണക്ട് ചെയ്തിരിക്കുന്നു
            </span>
          </div>
        </div>
      </section>

      {/* Authorities Directory Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {authorities.map((auth) => {
            const activeIssuesCount = issues.filter(
              i => i.authority_forwarding?.authority_id === auth.id || (i.status === "forwarded" && i.category_id.includes(auth.id.split("-")[1] || ""))
            ).length || auth.active_issues_count;

            return (
              <div
                key={auth.id}
                className="bg-white rounded-3xl border border-[#E8DCBF] p-6 shadow-xs hover:border-[#194B35]/40 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.2 rounded-full border border-emerald-300">
                          <ShieldCheck className="w-3 h-3" />
                          പരിശോധിച്ചു സ്ഥിരീകരിച്ച സർക്കാർ നോഡ്
                        </span>
                      </div>
                      <h3 className="font-bold text-base sm:text-lg text-[#194B35]">
                        {auth.name_ml}
                      </h3>
                      <p className="text-xs text-neutral-500 font-medium">{auth.name}</p>
                    </div>

                    <span className="text-xs font-bold bg-[#FAF7F0] text-[#8C5B0F] px-2.5 py-1 rounded-xl border border-[#E8DCBF] shrink-0">
                      {activeIssuesCount} ആക്ടീവ് കേസുകൾ
                    </span>
                  </div>

                  <div className="space-y-2 text-xs text-neutral-600 my-4 bg-[#FAF7F0] p-3.5 rounded-2xl border border-[#DDD5C5]">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5 text-[#8C5B0F]" />
                      <span>വകുപ്പ്: <strong>{auth.department_ml}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#8C5B0F]" />
                      <span>അധികാര പരിധി: <strong>{auth.jurisdiction_ml}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-500">
                      <Phone className="w-3.5 h-3.5 text-neutral-400" />
                      <span>ഹെൽപ്പ്‌ലൈൻ: <span className="font-mono">{auth.contact_placeholder}</span></span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-neutral-500">
                    ഔദ്യോഗിക റഫറൻസ് സംവിധാനം വഴി ലിങ്ക് ചെയ്തു
                  </span>

                  <Link
                    href={`/admin/civic/issues?locality=municipality`}
                    className="font-bold text-[#194B35] hover:text-[#8C5B0F] flex items-center gap-1 transition"
                  >
                    <span>കൈമാറിയ പരാതികൾ</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
