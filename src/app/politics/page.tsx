"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { useLanguage } from "@/lib/i18n/context";
import {
  Landmark,
  ShieldCheck,
  Building2,
  Users,
  MapPin,
  ExternalLink,
  ArrowRight,
  Phone,
  Mail,
  CheckCircle2,
  Info,
  Calendar,
  Search
} from "lucide-react";

export default function PoliticsDirectoryPage() {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  const representatives = [
    {
      id: "pk-nawas",
      name: "PK Nawas",
      nameEn: "PK Nawas",
      designation: "Overall Community Leader & Project Guidance",
      designationEn: "Overall Community Leader & Project Guidance",
      jurisdiction: "OUR NATION — Tanur",
      district: "Malappuram District",
      party: "Community Leadership",
      term: "Current Project Guidance",
      imageUrl: "/placeholder-leader.svg",
      profileUrl: "/leadership/pk-nawas",
      office: "Tanur, Malappuram",
      phone: "0494 2440228",
      isSitting: true,
      category: "leadership",
      description: "Overall Community Leader & Project Guidance for the OUR NATION Tanur civic initiative.",
    },
    {
      id: "tanur-chairperson",
      name: "Tanur Municipal Chairperson",
      nameEn: "Chairperson — Tanur Municipality",
      designation: "Municipal Chairperson",
      designationEn: "Municipal Chairperson",
      jurisdiction: "Tanur Municipality (45 Statutory Wards)",
      district: "Tanur, Malappuram",
      party: "Municipal Council",
      term: "Current Council",
      imageUrl: "/representatives/tanur-municipality/ward-35.jpeg",
      profileUrl: "/local-governments/tanur-municipality",
      office: "Tanur Municipality Office, Main Road, Tanur",
      phone: "0494 2440228",
      isSitting: true,
      category: "local",
      description: "Statutory municipal leadership for the 45 wards of Tanur Municipality.",
    },
    {
      id: "tanur-block-president",
      name: "Tanur Block Panchayat President",
      nameEn: "President — Tanur Block Panchayat",
      designation: "Block Panchayat President",
      designationEn: "Block Panchayat President",
      jurisdiction: "Tanur Block Panchayat (17 Divisions)",
      district: "Tanur Block, Malappuram",
      party: "Block Panchayat Council",
      term: "Current Council",
      imageUrl: "/placeholder-representative.svg",
      profileUrl: "/local-governments/tanur-block-panchayat",
      office: "Tanur Block Panchayat Office, Tanalur Road, Tanur",
      phone: "0494 2440228",
      isSitting: true,
      category: "rural",
      description: "Rural local governance leadership covering 17 divisions across constituent Grama Panchayats.",
    },
  ];

  const filteredReps = representatives.filter((r) =>
    r.name.includes(searchQuery) ||
    r.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.jurisdiction.includes(searchQuery) ||
    r.designation.includes(searchQuery)
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
      <Navbar />

      <main className="flex-1 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3">
          <Breadcrumbs items={[{ label: "ജനപ്രതിനിധികൾ (Public Representatives)" }]} />
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden pt-2 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="relative rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-elevated border border-[#E7DFD0] min-h-[300px] sm:min-h-[360px] flex items-center bg-[#183426]">
            
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1600&auto=format&fit=crop&q=80')`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#11271D] via-[#11271D]/85 to-transparent" />
            </div>

            <div className="relative z-10 p-6 sm:p-12 lg:p-16 max-w-2xl text-white">
              <span className="inline-block px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-xs text-amber-200 text-xs font-bold mb-3">
                പൗരസഞ്ചയം • Civic Democracy
              </span>
              <h1 className="text-3xl sm:text-5xl font-bold font-malayalam-serif tracking-tight leading-none mb-3">
                ജനപ്രതിനിധികൾ
              </h1>
              <p className="text-lg sm:text-2xl font-bold font-malayalam-script text-amber-200 mb-3">
                താനൂർ & മലപ്പുറം പൊതുപ്രതിനിധി വിവരസഞ്ചയം...
              </p>
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-malayalam-body max-w-lg">
                താനൂർ നിയമസഭാ മണ്ഡലം, പൊന്നാനി പാർലമെന്റ് മണ്ഡലം, താനൂർ നഗരസഭ എന്നിവയെ പ്രതിനിധീകരിക്കുന്ന തെരഞ്ഞെടുക്കപ്പെട്ട ജനപ്രതിനിധികളുടെ ആധികാരിക ഔദ്യോഗിക വിവരരേഖ.
              </p>
            </div>
          </div>
        </section>

        {/* Search Bar & Neutrality Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 space-y-4">
          <div className="bg-[#FFFDF7] rounded-2xl border border-[#E8DFC8] p-4 text-xs text-[#5C6A64] flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-[#1B4D36] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#1B4D36]">നിഷ്പക്ഷ പൗരവിവരരേഖ: </strong>
              ഈ ഡയറക്ടറി ഔദ്യോഗിക ഗസറ്റ്, തെരഞ്ഞെടുപ്പ് കമ്മീഷൻ, കേരള നിയമസഭ എന്നിവയിൽ നിന്നുള്ള സ്ഥിരീകരിച്ച രേഖകൾ മാത്രമാണ് പ്രദർശിപ്പിക്കുന്നത്. കക്ഷിരാഷ്ട്രീയ പ്രചരണങ്ങൾക്കോ തെരഞ്ഞെടുപ്പ് പ്രഖ്യാപനങ്ങൾക്കോ വേണ്ടിയുള്ളതല്ല.
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border border-[#DDD5C5] shadow-xs">
            <Search className="w-4 h-4 text-[#7A8880]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ജനപ്രതിനിധിയുടെ പേരോ മണ്ഡലമോ തിരയുക (Search by Name, Constituency)..."
              className="w-full text-xs sm:text-sm bg-transparent focus:outline-none text-[#1A2420]"
            />
          </div>
        </section>

        {/* Representatives Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredReps.map((rep) => (
              <div
                key={rep.id}
                className="bg-white rounded-3xl border border-[#EAE4D7] shadow-card overflow-hidden flex flex-col justify-between hover:border-[#1B4D36]/60 transition group"
              >
                <div>
                  <div className="h-52 overflow-hidden relative bg-[#E5DDD0]">
                    <img
                      src={rep.imageUrl}
                      alt={rep.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full bg-[#1B4D36] text-white text-[10px] font-bold shadow-xs">
                        {rep.designation}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-[#7A8880]">
                      <MapPin className="w-3.5 h-3.5 text-[#1B4D36]" />
                      <span>{rep.jurisdiction}</span>
                    </div>

                    <h3 className="font-bold font-malayalam-serif text-lg text-[#1A2420] group-hover:text-[#1B4D36] transition">
                      {rep.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#8C5B0F]">
                      {rep.nameEn}
                    </p>

                    <p className="text-xs text-[#5C6A64] leading-relaxed font-malayalam-body pt-1">
                      {rep.description}
                    </p>

                    <div className="pt-2 text-xs space-y-1 text-[#4A5750]">
                      <div><strong>പാർട്ടി:</strong> {rep.party}</div>
                      <div><strong>കാലാവധി:</strong> {rep.term}</div>
                      <div><strong>ഓഫീസ് ഫോൺ:</strong> {rep.phone}</div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link
                    href={rep.profileUrl}
                    className="w-full py-2.5 rounded-xl bg-[#FAF7F0] hover:bg-[#1B4D36] hover:text-white text-[#1B4D36] border border-[#DDD5C5] text-xs font-bold text-center transition shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <span>പൂർണ്ണ വിവരരേഖ കാണുക (View Profile)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
