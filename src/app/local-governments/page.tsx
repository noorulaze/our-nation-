"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Building2, 
  Landmark, 
  Users, 
  MapPin, 
  Search, 
  ExternalLink, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Phone, 
  FileText,
  Filter,
  Info,
  Layers,
  ArrowRight
} from "lucide-react";
import { localGovernmentStore } from "@/lib/store/localGovernmentStore";
import { LocalGovernmentBody, LocalRepresentative } from "@/types/localGovernment";

export default function LocalGovernmentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "urban" | "rural">("all");
  const [selectedLeaderRole, setSelectedLeaderRole] = useState<string>("all");

  const bodies = useMemo(() => localGovernmentStore.getLocalBodies(), []);
  const allRepresentatives = useMemo(() => localGovernmentStore.getRepresentatives(), []);
  const leadershipReps = useMemo(() => localGovernmentStore.getLeadershipRepresentatives(), []);

  // Categorized bodies
  const municipality = useMemo(() => bodies.find(b => b.type === "municipality"), [bodies]);
  const blockPanchayat = useMemo(() => bodies.find(b => b.type === "block_panchayat"), [bodies]);
  const gramaPanchayats = useMemo(() => bodies.filter(b => b.type === "grama_panchayat" && b.verification_status !== "disputed"), [bodies]);
  const referenceDiscrepancy = useMemo(() => bodies.find(b => b.verification_status === "disputed"), [bodies]);

  // Search filtering
  const filteredBodies = useMemo(() => {
    let list = bodies.filter(b => b.verification_status !== "disputed");
    if (activeTab === "urban") list = list.filter(b => b.category === "urban");
    if (activeTab === "rural") list = list.filter(b => b.category === "rural");

    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase().trim();
    return list.filter(b => 
      b.name.toLowerCase().includes(q) ||
      b.description.toLowerCase().includes(q) ||
      b.taluk.toLowerCase().includes(q)
    );
  }, [bodies, activeTab, searchQuery]);

  const searchResultsRepresentatives = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) return [];
    return localGovernmentStore.getRepresentatives({ search: searchQuery }).slice(0, 10);
  }, [searchQuery]);

  const filteredLeaders = useMemo(() => {
    if (selectedLeaderRole === "all") return leadershipReps;
    if (selectedLeaderRole === "heads") return leadershipReps.filter(r => r.is_head);
    if (selectedLeaderRole === "deputies") return leadershipReps.filter(r => r.is_deputy);
    return leadershipReps;
  }, [leadershipReps, selectedLeaderRole]);

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420]">
      {/* 1. HERO SECTION */}
      <section className="bg-[#194B35] text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#143E2C] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C39A5B_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-7xl mx-auto relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-amber-200 text-xs font-bold border border-white/15 backdrop-blur-sm">
            <Landmark className="w-4 h-4 text-[#C39A5B]" />
            <span>Tanur Local Government &amp; Electoral Directory</span>
          </div>

          <div className="space-y-3 max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-sans tracking-tight leading-tight">
              Explore Your Local Government
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-sans">
              Discover local bodies, wards and elected representatives across the Tanur area. Access verified public profiles, ward boundaries, official contacts, and administrative structures.
            </p>
          </div>

          {/* Universal Search Field */}
          <div className="pt-2 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search a local body, ward name, or elected representative..."
                className="w-full pl-11 pr-4 py-3.5 bg-white text-[#1A2420] placeholder-[#7A8680] text-sm rounded-2xl shadow-lg border border-[#EDE6D8] focus:outline-none focus:ring-2 focus:ring-[#C39A5B]"
              />
              <Search className="w-5 h-5 text-[#5C6A64] absolute left-3.5 top-4" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-3.5 text-xs text-gray-400 hover:text-gray-600 font-bold px-2 py-1"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Live Search Representative Hits */}
            {searchResultsRepresentatives.length > 0 && (
              <div className="mt-2 bg-white rounded-2xl shadow-xl border border-[#EDE6D8] p-3 divide-y divide-gray-100 max-h-72 overflow-y-auto">
                <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider px-2 pb-1">
                  Matching Representatives ({searchResultsRepresentatives.length})
                </div>
                {searchResultsRepresentatives.map((rep) => (
                  <Link
                    key={rep.id}
                    href={`/local-governments/${rep.local_body_slug}?rep=${rep.id}`}
                    className="flex items-center justify-between p-2 hover:bg-[#FAF7F0] rounded-xl transition text-xs group"
                  >
                    <div>
                      <div className="font-bold text-[#194B35] group-hover:underline">
                        {rep.name}
                      </div>
                      <div className="text-[11px] text-gray-500">
                        {rep.role_title} • {rep.local_body_name} (Ward {rep.ward_number}: {rep.ward_name})
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-medium border border-emerald-200">
                      View Profile
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. ADMINISTRATIVE STRUCTURE GUIDE (URBAN VS RURAL) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-white rounded-3xl border border-[#EDE6D8] p-5 sm:p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-900 border border-amber-200 flex items-center justify-center shrink-0">
              <Info className="w-5 h-5 text-[#C39A5B]" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-[#194B35]">
                Important Constitutional Structure: Urban vs. Rural Local Government
              </h3>
              <p className="text-xs text-[#5C6A64] leading-relaxed max-w-4xl">
                In Kerala’s local governance framework under the 73rd and 74th Constitutional Amendments, a <strong>Municipality</strong> is an independent <em>Urban Local Government</em> (ULB) that does not contain Grama Panchayats. A <strong>Block Panchayat</strong> is an intermediate <em>Rural Local Government</em> body coordinating constituent rural Grama Panchayats. Their wards and elections are completely separate electoral systems.
              </p>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-[#FAF7F0] p-1 rounded-2xl border border-[#EDE6D8] shrink-0">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                activeTab === "all" ? "bg-[#194B35] text-white shadow-xs" : "text-[#5C6A64] hover:text-[#194B35]"
              }`}
            >
              All Bodies
            </button>
            <button
              onClick={() => setActiveTab("urban")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                activeTab === "urban" ? "bg-[#194B35] text-white shadow-xs" : "text-[#5C6A64] hover:text-[#194B35]"
              }`}
            >
              Urban
            </button>
            <button
              onClick={() => setActiveTab("rural")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                activeTab === "rural" ? "bg-[#194B35] text-white shadow-xs" : "text-[#5C6A64] hover:text-[#194B35]"
              }`}
            >
              Rural
            </button>
          </div>
        </div>
      </section>

      {/* 3. DISCREPANCY INVESTIGATION NOTICE */}
      {referenceDiscrepancy && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="bg-amber-50/60 rounded-3xl border border-amber-200/80 p-5 text-xs text-[#5C4515] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold text-amber-900 uppercase tracking-wider text-[11px] block">
                  Official Administrative Investigation Record
                </span>
                <p className="leading-relaxed">
                  <strong>Tanur Block Panchayat Discrepancy Clarification:</strong> While the Tanur Block Panchayat website lists <em>Kalpakanchery</em>, the official Malappuram District Administration portal (<em>malappuram.nic.in/en/panchayats</em>) and statutory LSGD Kerala delimitation classify <strong>Perumanna-Klari</strong> as the 7th constituent Grama Panchayat under Tanur Block. Official records confirm Kalpakanchery statutorily belongs to <strong>Kuttippuram Block Panchayat</strong>.
                </p>
              </div>
            </div>
            <Link
              href="/local-governments/kalpakanchery"
              className="px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-[11px] shrink-0 border border-amber-300 transition"
            >
              Read Delimitation Note
            </Link>
          </div>
        </section>
      )}

      {/* 4. MAIN DIRECTORY SECTIONS */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        
        {/* A. URBAN LOCAL GOVERNMENT: TANUR MUNICIPALITY */}
        {(activeTab === "all" || activeTab === "urban") && municipality && (
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#EDE6D8] pb-3">
              <div className="flex items-center gap-2.5">
                <Building2 className="w-6 h-6 text-[#194B35]" />
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#194B35] font-sans">
                    Category A: Urban Local Government
                  </h2>
                  <p className="text-xs text-[#5C6A64]">
                    Independent municipal corporation / council governance (ULB)
                  </p>
                </div>
              </div>

              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                Grade II ULB
              </span>
            </div>

            {/* Dedicated Tanur Municipality Featured Card */}
            <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-8 shadow-xs hover:border-[#194B35] transition space-y-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#EDE6D8]">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#C39A5B] bg-[#FAF7F0] px-2.5 py-1 rounded-lg border border-[#EDE6D8]">
                      ULB #4007
                    </span>
                    <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Statutory Urban Body
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-[#194B35] font-sans">
                    {municipality.name}
                  </h3>
                  <p className="text-xs text-gray-500 font-malayalam">
                    {municipality.name_ml}
                  </p>

                  <p className="text-xs sm:text-sm text-[#5C6A64] leading-relaxed pt-1">
                    {municipality.description}
                  </p>
                </div>

                {/* Key Quick Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 shrink-0">
                  <div className="p-3.5 bg-[#FAF7F0] rounded-2xl border border-[#EDE6D8] text-center">
                    <span className="text-2xl font-black text-[#194B35] block">
                      {municipality.total_wards}
                    </span>
                    <span className="text-[10.5px] font-bold text-gray-500 uppercase tracking-wider">
                      Municipal Wards
                    </span>
                  </div>

                  <div className="p-3.5 bg-[#FAF7F0] rounded-2xl border border-[#EDE6D8] text-center">
                    <span className="text-sm font-black text-[#194B35] block pt-1">
                      19.59 km²
                    </span>
                    <span className="text-[10.5px] font-bold text-gray-500 uppercase tracking-wider">
                      Territory Area
                    </span>
                  </div>

                  <div className="p-3.5 bg-[#FAF7F0] rounded-2xl border border-[#EDE6D8] text-center col-span-2 sm:col-span-1">
                    <span className="text-sm font-black text-[#194B35] block pt-1">
                      0494 2440228
                    </span>
                    <span className="text-[10.5px] font-bold text-gray-500 uppercase tracking-wider">
                      Switchboard
                    </span>
                  </div>
                </div>
              </div>

              {/* Leadership & Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                <div className="flex flex-wrap items-center gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-[#194B35] text-xs">
                      PS
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block uppercase">Chairperson</span>
                      <span className="font-bold text-[#194B35]">{municipality.leadership.chair_or_president.name}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center font-bold text-[#194B35] text-xs">
                      MT
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block uppercase">Vice Chairperson</span>
                      <span className="font-bold text-[#194B35]">{municipality.leadership.vice_chair_or_vice_president.name}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Link
                    href="/local-governments/tanur-municipality"
                    className="px-5 py-2.5 bg-[#194B35] hover:bg-[#123626] text-white text-xs font-bold rounded-xl transition shadow-sm flex items-center gap-1.5"
                  >
                    <span>Explore All 44 Wards &amp; Councillors</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>

                  <a
                    href={municipality.official_website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-[#FAF7F0] hover:bg-[#EDE6D8] text-[#194B35] rounded-xl border border-[#EDE6D8] transition"
                    title="Open Official Website"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* B. RURAL LOCAL GOVERNMENT: TANUR BLOCK PANCHAYAT */}
        {(activeTab === "all" || activeTab === "rural") && blockPanchayat && (
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#EDE6D8] pb-3">
              <div className="flex items-center gap-2.5">
                <Landmark className="w-6 h-6 text-[#C39A5B]" />
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#194B35] font-sans">
                    Category B: Rural Local Government
                  </h2>
                  <p className="text-xs text-[#5C6A64]">
                    Tanur Block Panchayat (Intermediate tier) &amp; 7 Constituent Grama Panchayats
                  </p>
                </div>
              </div>

              <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                Panchayati Raj Tier
              </span>
            </div>

            {/* Block Panchayat Featured Card */}
            <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-8 shadow-xs hover:border-[#194B35] transition space-y-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#EDE6D8]">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#194B35] bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                      Intermediate Tier Block
                    </span>
                    <span className="text-xs font-bold text-amber-800 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#C39A5B]" />
                      Constituent Hub (7 Panchayats)
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-[#194B35] font-sans">
                    {blockPanchayat.name}
                  </h3>
                  <p className="text-xs text-gray-500 font-malayalam">
                    {blockPanchayat.name_ml}
                  </p>

                  <p className="text-xs sm:text-sm text-[#5C6A64] leading-relaxed pt-1">
                    {blockPanchayat.description}
                  </p>
                </div>

                {/* Key Quick Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 shrink-0">
                  <div className="p-3.5 bg-[#FAF7F0] rounded-2xl border border-[#EDE6D8] text-center">
                    <span className="text-2xl font-black text-[#194B35] block">
                      {blockPanchayat.total_wards}
                    </span>
                    <span className="text-[10.5px] font-bold text-gray-500 uppercase tracking-wider">
                      Block Divisions
                    </span>
                  </div>

                  <div className="p-3.5 bg-[#FAF7F0] rounded-2xl border border-[#EDE6D8] text-center">
                    <span className="text-2xl font-black text-[#C39A5B] block">
                      7
                    </span>
                    <span className="text-[10.5px] font-bold text-gray-500 uppercase tracking-wider">
                      Grama Panchayats
                    </span>
                  </div>

                  <div className="p-3.5 bg-[#FAF7F0] rounded-2xl border border-[#EDE6D8] text-center col-span-2 sm:col-span-1">
                    <span className="text-sm font-black text-[#194B35] block pt-1">
                      0494 2440250
                    </span>
                    <span className="text-[10.5px] font-bold text-gray-500 uppercase tracking-wider">
                      Block Office
                    </span>
                  </div>
                </div>
              </div>

              {/* Leadership & Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                <div className="flex flex-wrap items-center gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center font-bold text-[#194B35] text-xs">
                      NC
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block uppercase">Block President</span>
                      <span className="font-bold text-[#194B35]">{blockPanchayat.leadership.chair_or_president.name}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-[#194B35] text-xs">
                      NM
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block uppercase">Vice President</span>
                      <span className="font-bold text-[#194B35]">{blockPanchayat.leadership.vice_chair_or_vice_president.name}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Link
                    href="/local-governments/tanur-block-panchayat"
                    className="px-5 py-2.5 bg-[#194B35] hover:bg-[#123626] text-white text-xs font-bold rounded-xl transition shadow-sm flex items-center gap-1.5"
                  >
                    <span>View 17 Block Divisions &amp; Members</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>

                  <a
                    href={blockPanchayat.official_website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-[#FAF7F0] hover:bg-[#EDE6D8] text-[#194B35] rounded-xl border border-[#EDE6D8] transition"
                    title="Open Official Website"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Constituent 7 Grama Panchayats Grid */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#194B35]">
                    Constituent Grama Panchayats ({gramaPanchayats.length})
                  </h3>
                  <p className="text-xs text-gray-500">
                    Officially confirmed village councils under Tanur Block Panchayat jurisdiction
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {gramaPanchayats.map((gp) => (
                  <div
                    key={gp.id}
                    className="bg-white rounded-3xl border border-[#EDE6D8] p-5 shadow-xs hover:border-[#194B35] hover:shadow-md transition flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {gp.total_wards} Verified Wards
                        </span>
                        <span className="text-[10px] font-mono text-gray-400">
                          {gp.taluk} Taluk
                        </span>
                      </div>

                      <h4 className="text-lg font-bold text-[#194B35] font-sans">
                        {gp.name}
                      </h4>
                      <p className="text-xs text-gray-400 font-malayalam -mt-1">
                        {gp.name_ml}
                      </p>

                      <p className="text-xs text-[#5C6A64] line-clamp-2 leading-relaxed">
                        {gp.description}
                      </p>

                      {/* President Info */}
                      <div className="pt-2 border-t border-gray-100 flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#FAF7F0] border border-[#EDE6D8] flex items-center justify-center font-bold text-[#194B35] text-xs">
                          {gp.leadership.chair_or_president.name.charAt(0)}
                        </div>
                        <div className="text-xs">
                          <span className="text-[10px] text-gray-400 block">President</span>
                          <span className="font-bold text-[#194B35]">
                            {gp.leadership.chair_or_president.name}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#EDE6D8] flex items-center justify-between">
                      <span className="text-[11px] text-gray-500 flex items-center gap-1">
                        <Phone className="w-3 h-3 text-[#C39A5B]" />
                        {gp.phone}
                      </span>

                      <Link
                        href={`/local-governments/${gp.slug}`}
                        className="px-3.5 py-1.5 rounded-xl bg-[#FAF7F0] hover:bg-[#194B35] text-[#194B35] hover:text-white font-bold text-xs border border-[#EDE6D8] transition flex items-center gap-1"
                      >
                        <span>Explore</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 5. ELECTED LEADERSHIP DIRECTORY SHOWCASE */}
        <section className="space-y-6 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EDE6D8] pb-3">
            <div className="flex items-center gap-2.5">
              <Users className="w-6 h-6 text-[#194B35]" />
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#194B35] font-sans">
                  Local Government Leadership Directory
                </h2>
                <p className="text-xs text-[#5C6A64]">
                  Officially confirmed Presidents, Chairpersons, and Vice Leaders
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => setSelectedLeaderRole("all")}
                className={`px-3 py-1 rounded-xl font-bold transition ${
                  selectedLeaderRole === "all" ? "bg-[#194B35] text-white" : "bg-white text-gray-600 border border-[#EDE6D8]"
                }`}
              >
                All Leaders ({leadershipReps.length})
              </button>
              <button
                onClick={() => setSelectedLeaderRole("heads")}
                className={`px-3 py-1 rounded-xl font-bold transition ${
                  selectedLeaderRole === "heads" ? "bg-[#194B35] text-white" : "bg-white text-gray-600 border border-[#EDE6D8]"
                }`}
              >
                Presidents &amp; Chairs
              </button>
              <button
                onClick={() => setSelectedLeaderRole("deputies")}
                className={`px-3 py-1 rounded-xl font-bold transition ${
                  selectedLeaderRole === "deputies" ? "bg-[#194B35] text-white" : "bg-white text-gray-600 border border-[#EDE6D8]"
                }`}
              >
                Vice Leaders
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredLeaders.map((ldr) => (
              <div
                key={ldr.id}
                className="bg-white rounded-3xl border border-[#EDE6D8] p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-[#194B35] transition"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      ldr.is_head 
                        ? "bg-emerald-100 text-emerald-900 border border-emerald-200" 
                        : "bg-amber-100 text-amber-900 border border-amber-200"
                    }`}>
                      {ldr.role_title}
                    </span>

                    <span className="text-[10px] font-mono text-gray-400">
                      {ldr.party}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] p-1 flex items-center justify-center shrink-0">
                      <Image
                        src={ldr.photo_url || "/placeholder-leader.svg"}
                        alt={ldr.name}
                        width={44}
                        height={44}
                        className="rounded-xl object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#194B35] font-sans">
                        {ldr.name}
                      </h4>
                      <p className="text-[11px] text-gray-500">
                        {ldr.local_body_name}
                      </p>
                    </div>
                  </div>

                  {ldr.ward_name && (
                    <div className="text-[11px] text-gray-600 bg-[#FAF7F0] px-2.5 py-1.5 rounded-xl border border-[#EDE6D8]">
                      📍 Ward {ldr.ward_number}: {ldr.ward_name}
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-gray-500 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-[#C39A5B]" />
                    {ldr.phone || "Office Switchboard"}
                  </span>

                  <Link
                    href={`/local-governments/${ldr.local_body_slug}?rep=${ldr.id}`}
                    className="font-bold text-[#194B35] hover:underline flex items-center gap-0.5 text-xs"
                  >
                    <span>Profile</span>
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
