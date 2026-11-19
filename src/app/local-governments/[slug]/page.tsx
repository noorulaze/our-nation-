"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { 
  Building2, 
  Landmark, 
  Users, 
  MapPin, 
  Search, 
  ExternalLink, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Phone, 
  FileText,
  Filter,
  Info,
  User,
  Calendar,
  Sparkles,
  X
} from "lucide-react";
import { localGovernmentStore } from "@/lib/store/localGovernmentStore";
import { LocalRepresentative, LocalGovernmentWard } from "@/types/localGovernment";

export default function LocalBodyDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params?.slug as string;

  const [wardSearch, setWardSearch] = useState("");
  const [reservationFilter, setReservationFilter] = useState<string>("all");
  const [selectedRep, setSelectedRep] = useState<LocalRepresentative | null>(null);

  const localBody = useMemo(() => {
    return localGovernmentStore.getLocalBodyBySlug(slug);
  }, [slug]);

  const wards = useMemo(() => {
    if (!localBody) return [];
    return localGovernmentStore.getWardsByLocalBodyId(localBody.id);
  }, [localBody]);

  const representatives = useMemo(() => {
    if (!localBody) return [];
    return localGovernmentStore.getRepresentatives({ localBodyId: localBody.id });
  }, [localBody]);

  // Open rep modal if ?rep query parameter is present
  React.useEffect(() => {
    const repId = searchParams.get("rep");
    if (repId) {
      const rep = localGovernmentStore.getRepresentativeById(repId);
      if (rep) setSelectedRep(rep);
    }
  }, [searchParams]);

  // Filtered wards
  const filteredWards = useMemo(() => {
    let list = [...wards];
    if (reservationFilter !== "all") {
      list = list.filter((w) => w.reservation === reservationFilter);
    }
    if (wardSearch.trim()) {
      const q = wardSearch.toLowerCase().trim();
      list = list.filter(
        (w) =>
          w.ward_number.toString() === q ||
          w.ward_name.toLowerCase().includes(q) ||
          w.representative_name.toLowerCase().includes(q) ||
          (w.party && w.party.toLowerCase().includes(q))
      );
    }
    return list;
  }, [wards, reservationFilter, wardSearch]);

  if (!localBody) {
    return (
      <div className="min-h-screen bg-[#FAF7F0] flex flex-col items-center justify-center p-6 text-center">
        <AlertCircle className="w-12 h-12 text-amber-600 mb-4" />
        <h1 className="text-2xl font-bold text-[#194B35] font-sans">
          Local Government Body Not Found
        </h1>
        <p className="text-xs text-[#5C6A64] mt-2 max-w-md">
          The requested administrative body &quot;{slug}&quot; could not be found or has been restructured.
        </p>
        <Link
          href="/local-governments"
          className="mt-6 px-5 py-2.5 bg-[#194B35] text-white text-xs font-bold rounded-2xl"
        >
          Return to Local Governments Directory
        </Link>
      </div>
    );
  }

  const isMunicipality = localBody.type === "municipality";
  const isBlock = localBody.type === "block_panchayat";
  const wardTerm = isBlock ? "Division" : "Ward";

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420]">
      {/* Breadcrumb Bar */}
      <div className="bg-[#143E2C] text-white/80 border-b border-white/10 px-4 sm:px-6 lg:px-8 py-2.5 text-xs">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <Link href="/local-governments" className="hover:text-amber-200 transition flex items-center gap-1">
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Local Governments</span>
          </Link>
          <span>/</span>
          <span className="text-white font-bold">{localBody.name}</span>
        </div>
      </div>

      {/* Header Banner */}
      <header className="bg-[#194B35] text-white pt-10 pb-14 px-4 sm:px-6 lg:px-8 border-b border-[#143E2C]">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  isMunicipality 
                    ? "bg-emerald-400 text-[#143E2C]" 
                    : isBlock 
                    ? "bg-[#C39A5B] text-[#194B35]" 
                    : "bg-white/20 text-white"
                }`}>
                  {isMunicipality ? "Urban Local Government" : isBlock ? "Block Panchayat (Intermediate)" : "Grama Panchayat (Village)"}
                </span>

                <span className="text-xs text-amber-200 flex items-center gap-1 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Statutory Body
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-sans tracking-tight">
                {localBody.name}
              </h1>
              <p className="text-sm text-gray-300 font-malayalam">
                {localBody.name_ml}
              </p>

              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed pt-1">
                {localBody.description}
              </p>
            </div>

            {/* Quick Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 shrink-0">
              <div className="p-4 bg-white/10 rounded-2xl border border-white/15 text-center backdrop-blur-sm">
                <span className="text-2xl font-black text-white block">
                  {localBody.total_wards}
                </span>
                <span className="text-[10px] font-bold text-amber-200 uppercase tracking-wider">
                  Total {wardTerm}s
                </span>
              </div>

              <div className="p-4 bg-white/10 rounded-2xl border border-white/15 text-center backdrop-blur-sm">
                <span className="text-sm font-black text-white block pt-1">
                  {localBody.district}
                </span>
                <span className="text-[10px] font-bold text-amber-200 uppercase tracking-wider">
                  District
                </span>
              </div>

              <div className="p-4 bg-white/10 rounded-2xl border border-white/15 text-center backdrop-blur-sm col-span-2 sm:col-span-1">
                <span className="text-sm font-black text-white block pt-1">
                  {localBody.phone}
                </span>
                <span className="text-[10px] font-bold text-amber-200 uppercase tracking-wider">
                  Official Phone
                </span>
              </div>
            </div>
          </div>

          {/* Official Website & Source Notice */}
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-emerald-100/80">
            <a
              href={localBody.official_website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition border border-white/20"
            >
              <span>Visit Official Government Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <span>• Head Office: {localBody.hq_address}</span>
            <span>• Verified as of {localBody.last_verified}</span>
          </div>
        </div>
      </header>

      {/* Administrative Notice (if discrepancy or special note exists) */}
      {localBody.administrative_note && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="bg-amber-50 rounded-3xl border border-amber-200 p-4 text-xs text-amber-900 flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold uppercase tracking-wider text-[11px] block">
                Administrative Structure Note
              </span>
              <p className="mt-0.5 leading-relaxed">
                {localBody.administrative_note}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Body Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* Leadership Cards */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-[#EDE6D8] pb-3">
            <Users className="w-5 h-5 text-[#194B35]" />
            <h2 className="text-xl font-bold text-[#194B35] font-sans">
              Statutory Leadership &amp; Administration
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Chairperson or President */}
            <div className="bg-white rounded-3xl border border-[#EDE6D8] p-5 shadow-xs flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                <Image
                  src={localBody.leadership.chair_or_president.photo_url || "/placeholder-leader.svg"}
                  alt={localBody.leadership.chair_or_president.name}
                  width={48}
                  height={48}
                  className="rounded-xl object-cover"
                />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                  {localBody.leadership.chair_or_president.title}
                </span>
                <h3 className="font-bold text-base text-[#194B35]">
                  {localBody.leadership.chair_or_president.name}
                </h3>
                {localBody.leadership.chair_or_president.party && (
                  <p className="text-xs text-gray-500 font-mono">
                    {localBody.leadership.chair_or_president.party}
                  </p>
                )}
              </div>
            </div>

            {/* Vice Leader */}
            <div className="bg-white rounded-3xl border border-[#EDE6D8] p-5 shadow-xs flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                <Image
                  src={localBody.leadership.vice_chair_or_vice_president.photo_url || "/placeholder-leader.svg"}
                  alt={localBody.leadership.vice_chair_or_vice_president.name}
                  width={48}
                  height={48}
                  className="rounded-xl object-cover"
                />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md">
                  {localBody.leadership.vice_chair_or_vice_president.title}
                </span>
                <h3 className="font-bold text-base text-[#194B35]">
                  {localBody.leadership.vice_chair_or_vice_president.name}
                </h3>
                {localBody.leadership.vice_chair_or_vice_president.party && (
                  <p className="text-xs text-gray-500 font-mono">
                    {localBody.leadership.vice_chair_or_vice_president.party}
                  </p>
                )}
              </div>
            </div>

            {/* Secretary / Executive */}
            {localBody.leadership.secretary && (
              <div className="bg-white rounded-3xl border border-[#EDE6D8] p-5 shadow-xs flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0">
                  <FileText className="w-7 h-7 text-[#194B35]" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-700 bg-gray-100 px-2 py-0.5 rounded-md">
                    Administration
                  </span>
                  <h3 className="font-bold text-base text-[#194B35]">
                    {localBody.leadership.secretary.name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {localBody.leadership.secretary.designation}
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Complete Ward Directory & Representatives */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EDE6D8] pb-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#194B35] font-sans">
                Complete {wardTerm} Directory &amp; Representatives ({wards.length})
              </h2>
              <p className="text-xs text-[#5C6A64]">
                All officially gazetted electoral {wardTerm.toLowerCase()}s with elected representatives and reservation categories
              </p>
            </div>

            {/* Search & Reservation Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <input
                  type="text"
                  value={wardSearch}
                  onChange={(e) => setWardSearch(e.target.value)}
                  placeholder={`Search ${wardTerm.toLowerCase()} or member...`}
                  className="pl-8 pr-3 py-1.5 bg-white text-xs rounded-xl border border-[#EDE6D8] focus:outline-none focus:ring-1 focus:ring-[#194B35] w-48"
                />
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
              </div>

              <select
                value={reservationFilter}
                onChange={(e) => setReservationFilter(e.target.value)}
                className="bg-white text-xs py-1.5 px-2.5 rounded-xl border border-[#EDE6D8] text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#194B35]"
              >
                <option value="all">All Categories</option>
                <option value="General">General</option>
                <option value="Woman">Woman</option>
                <option value="SC">SC</option>
                <option value="SC Woman">SC Woman</option>
              </select>
            </div>
          </div>

          {/* Responsive Ward & Representative Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredWards.map((w) => {
              // Find matching representative record if available
              const rep = representatives.find((r) => r.ward_number === w.ward_number);

              return (
                <div
                  key={w.id}
                  className="bg-white rounded-3xl border border-[#EDE6D8] p-5 shadow-xs hover:border-[#194B35] hover:shadow-md transition flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-lg bg-[#FAF7F0] text-[#194B35] border border-[#EDE6D8]">
                        {wardTerm} {w.ward_number}
                      </span>

                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        w.reservation === "Woman" 
                          ? "bg-pink-50 text-pink-700 border border-pink-200"
                          : w.reservation === "SC" || w.reservation === "SC Woman"
                          ? "bg-purple-50 text-purple-700 border border-purple-200"
                          : "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      }`}>
                        {w.reservation}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-base text-[#194B35] font-sans">
                        {w.ward_name}
                      </h3>
                      {w.ward_name_ml && (
                        <p className="text-xs text-gray-400 font-malayalam">
                          {w.ward_name_ml}
                        </p>
                      )}
                    </div>

                    {/* Representative Card */}
                    <div className="pt-2 border-t border-gray-100 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#FAF7F0] border border-[#EDE6D8] flex items-center justify-center shrink-0">
                        <Image
                          src={w.photo_url || "/placeholder-representative.svg"}
                          alt={w.representative_name}
                          width={36}
                          height={36}
                          className="rounded-lg object-cover"
                        />
                      </div>
                      <div className="space-y-0.5 flex-1 min-w-0">
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider block">
                          Elected Member
                        </span>
                        <h4 className="font-bold text-xs text-[#194B35] truncate">
                          {w.representative_name}
                        </h4>
                        {w.party && (
                          <span className="text-[10px] font-mono text-gray-500 block truncate">
                            {w.party}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-gray-400">
                      {w.phone ? (
                        <span className="flex items-center gap-1 text-gray-600">
                          <Phone className="w-3 h-3 text-[#C39A5B]" />
                          {w.phone}
                        </span>
                      ) : (
                        <span>Official Switchboard</span>
                      )}
                    </span>

                    <button
                      onClick={() => {
                        if (rep) {
                          setSelectedRep(rep);
                        } else {
                          // synthesize basic view
                          setSelectedRep({
                            id: `rep-${w.id}`,
                            name: w.representative_name,
                            local_body_id: localBody.id,
                            local_body_name: localBody.name,
                            local_body_slug: localBody.slug,
                            local_body_type: localBody.type,
                            local_body_category: localBody.category,
                            ward_number: w.ward_number,
                            ward_name: w.ward_name,
                            ward_id: w.id,
                            role: isMunicipality ? "councillor" : isBlock ? "block_member" : "panchayat_member",
                            role_title: `${wardTerm} Representative`,
                            is_head: false,
                            is_deputy: false,
                            party: w.party,
                            phone: w.phone || localBody.phone,
                            reservation: w.reservation,
                            source_url: w.source_url || localBody.source_url,
                            last_verified: localBody.last_verified,
                            verification_status: w.verification_status,
                          });
                        }
                      }}
                      className="text-xs font-bold text-[#194B35] hover:underline flex items-center gap-0.5"
                    >
                      <span>Full Profile</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredWards.length === 0 && (
            <div className="bg-white rounded-3xl border border-[#EDE6D8] p-10 text-center space-y-2">
              <p className="text-sm font-bold text-[#194B35]">
                No {wardTerm.toLowerCase()}s found matching &quot;{wardSearch}&quot;
              </p>
              <button
                onClick={() => {
                  setWardSearch("");
                  setReservationFilter("all");
                }}
                className="text-xs text-[#C39A5B] font-bold hover:underline"
              >
                Clear all search filters
              </button>
            </div>
          )}
        </section>

      </main>

      {/* 5. INDIVIDUAL REPRESENTATIVE PROFILE MODAL */}
      {selectedRep && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-[#EDE6D8] max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedRep(null)}
              className="absolute right-4 top-4 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition"
              aria-label="Close Profile"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Profile Header */}
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] p-1 flex items-center justify-center shrink-0">
                <Image
                  src={selectedRep.photo_url || "/placeholder-representative.svg"}
                  alt={selectedRep.name}
                  width={72}
                  height={72}
                  className="rounded-xl object-cover"
                />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200 uppercase">
                  {selectedRep.role_title}
                </span>

                <h3 className="text-xl font-black text-[#194B35] font-sans">
                  {selectedRep.name}
                </h3>
                {selectedRep.name_ml && (
                  <p className="text-xs text-gray-500 font-malayalam">
                    {selectedRep.name_ml}
                  </p>
                )}

                <p className="text-xs text-gray-500">
                  {selectedRep.local_body_name}
                </p>
              </div>
            </div>

            {/* Profile Attribute Details */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#FAF7F0] rounded-2xl border border-[#EDE6D8]">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">
                  Electoral {wardTerm}
                </span>
                <span className="font-bold text-[#194B35]">
                  {wardTerm} {selectedRep.ward_number}: {selectedRep.ward_name}
                </span>
              </div>

              <div className="p-3 bg-[#FAF7F0] rounded-2xl border border-[#EDE6D8]">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">
                  Reservation Category
                </span>
                <span className="font-bold text-[#194B35]">
                  {selectedRep.reservation || "General"}
                </span>
              </div>

              <div className="p-3 bg-[#FAF7F0] rounded-2xl border border-[#EDE6D8]">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">
                  Political Affiliation
                </span>
                <span className="font-bold text-[#194B35]">
                  {selectedRep.party || "Documented Independent"}
                </span>
              </div>

              <div className="p-3 bg-[#FAF7F0] rounded-2xl border border-[#EDE6D8]">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">
                  Official Contact
                </span>
                <span className="font-bold text-[#194B35]">
                  {selectedRep.phone || "0494 2440228 (Office)"}
                </span>
              </div>
            </div>

            {/* Standing Committees */}
            {selectedRep.standing_committees && selectedRep.standing_committees.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-gray-600 block uppercase">
                  Standing Committees &amp; Roles
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedRep.standing_committees.map((com, idx) => (
                    <span key={idx} className="text-xs px-2.5 py-1 rounded-xl bg-amber-50 text-amber-900 border border-amber-200">
                      {com}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Public Biography if available */}
            {selectedRep.bio && (
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-gray-600 block uppercase">
                  Public Statement &amp; Responsibilities
                </span>
                <p className="text-xs text-[#5C6A64] leading-relaxed bg-[#FAF7F0] p-3 rounded-2xl border border-[#EDE6D8]">
                  {selectedRep.bio}
                </p>
              </div>
            )}

            {/* Statutory Source & Verification Seal */}
            <div className="pt-3 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] text-gray-500">
              <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Status: {selectedRep.verification_status.toUpperCase()}</span>
              </div>

              <a
                href={selectedRep.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#194B35] font-bold hover:underline flex items-center gap-1"
              >
                <span>Statutory Source URL</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
