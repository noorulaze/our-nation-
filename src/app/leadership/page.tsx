"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { 
  Users, 
  Building2, 
  ShieldCheck, 
  AlertCircle, 
  Search, 
  ExternalLink, 
  ChevronRight, 
  Sparkles, 
  ArrowRight,
  Filter,
  CheckCircle2,
  MapPin,
  Lock,
  Layers
} from "lucide-react";
import { leadershipStore } from "@/lib/store/leadershipStore";
import { LeadershipCategory, LeadershipProfile } from "@/types/leadershipProfile";

export default function LeadershipDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const allProfiles = useMemo(() => leadershipStore.getProfiles({ includePending: true }), []);

  const filteredProfiles = useMemo(() => {
    return allProfiles.filter((p) => {
      const matchesCategory = selectedCategory === "all" || p.leadershipCategory === selectedCategory;
      const matchesSearch = 
        !searchQuery.trim() ||
        p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.areasOfLeadership.some(a => a.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [allProfiles, selectedCategory, searchQuery]);

  const categories = [
    { key: "all", label: "All Leadership Profiles" },
    { key: "community_leadership", label: "Community Leadership" },
    { key: "project_guidance", label: "Project Guidance" },
    { key: "civic_advisory", label: "Civic Advisory" },
    { key: "youth_leadership", label: "Youth Leadership" },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F0] flex flex-col font-sans selection:bg-[#194B35] selection:text-white pb-16 md:pb-0">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Leadership & Guidance" },
          ]}
        />

        {/* Hero Section */}
        <div className="bg-[#194B35] text-white rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-10 shadow-sm relative overflow-hidden">
          <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-80 h-80 rounded-full bg-white/5 pointer-events-none blur-3xl" />

          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-white/10 text-emerald-200 border border-white/20 uppercase tracking-wider inline-flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#C39A5B]" />
              <span>Community Leadership &amp; Guidance Registry</span>
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-sans tracking-tight text-white leading-tight">
              Leadership &amp; Guidance Structure
            </h1>

            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-light">
              Standardized profiles of community leadership, initiative guidance, and civic mentors supporting progress across Tanur. All profiles follow strict identity verification and consent standards.
            </p>
          </div>
        </div>

        {/* Administrative Separation Notice */}
        <div className="p-4 sm:p-5 bg-white rounded-3xl border border-[#EDE6D8] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
              <Building2 className="w-5 h-5 text-[#194B35]" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#194B35]">
                Distinct Governance Architecture
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Municipal statutory representatives (45 Wards, Chairperson, Council) are maintained in the separate Local Government Directory.
              </p>
            </div>
          </div>

          <Link
            href="/local-governments/tanur-municipality"
            className="px-4 py-2 rounded-xl bg-[#FAF7F0] hover:bg-[#194B35] text-[#194B35] hover:text-white border border-[#EDE6D8] text-xs font-bold transition flex items-center gap-1.5 shrink-0"
          >
            <span>Explore Municipal Wards (1–45)</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search leadership profiles by name, role, organization..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white rounded-2xl border border-[#EDE6D8] text-xs text-gray-800 placeholder-gray-400 focus:outline-hidden focus:border-[#194B35] shadow-2xs"
              />
            </div>

            {/* Admin Management Quick Link */}
            <Link
              href="/admin/leadership"
              className="px-4 py-3 rounded-2xl bg-[#194B35] hover:bg-[#123626] text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-2xs shrink-0"
            >
              <span>Admin Profile Editor</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c.key}
                onClick={() => setSelectedCategory(c.key)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition border ${
                  selectedCategory === c.key
                    ? "bg-[#194B35] text-white border-[#194B35] shadow-2xs"
                    : "bg-white text-gray-600 border-[#EDE6D8] hover:border-[#194B35]"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Profile Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfiles.map((p) => {
            const isPending = p.verificationStatus === "pending_admin_approval";

            return (
              <div
                key={p.id}
                className="bg-white rounded-3xl border border-[#EDE6D8] p-6 shadow-xs hover:border-[#194B35] hover:shadow-md transition flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  {/* Category & Status Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase tracking-wider">
                      {p.leadershipCategory.replace(/_/g, " ")}
                    </span>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 ${
                      isPending ? "bg-amber-100 text-amber-900 border-amber-200" : "bg-emerald-100 text-emerald-900 border-emerald-200"
                    }`}>
                      {isPending ? <AlertCircle className="w-3 h-3" /> : <ShieldCheck className="w-3 h-3" />}
                      <span>{isPending ? "Pending Admin Approval" : "Verified Profile"}</span>
                    </span>
                  </div>

                  {/* Profile Header in Card */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] p-1 flex items-center justify-center shrink-0">
                      <Image
                        src={p.profilePhotoUrl || "/placeholder-leader.svg"}
                        alt={p.fullName}
                        width={60}
                        height={60}
                        className="rounded-xl object-cover w-full h-full"
                      />
                    </div>

                    <div className="space-y-0.5 min-w-0">
                      <h3 className="font-bold text-base text-[#194B35] font-sans truncate">
                        {p.fullName}
                      </h3>
                      <p className="text-xs font-bold text-[#C39A5B] line-clamp-1">
                        {p.designation}
                      </p>
                      <p className="text-[11px] text-gray-500 line-clamp-1">
                        {p.organization}
                      </p>
                    </div>
                  </div>

                  {/* Short Introduction or Status Note */}
                  <p className="text-xs text-[#5C6A64] line-clamp-2 leading-relaxed bg-[#FAF7F0] p-3 rounded-2xl border border-[#EDE6D8]">
                    {p.shortIntroduction || "Profile registered in standardized community leadership structure."}
                  </p>

                  {/* Areas of Leadership */}
                  {p.areasOfLeadership && p.areasOfLeadership.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {p.areasOfLeadership.slice(0, 3).map((area, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 bg-gray-50 text-gray-700 rounded-lg border border-gray-200 font-medium">
                          {area}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Action */}
                <div className="pt-3 border-t border-[#EDE6D8] flex items-center justify-between">
                  <span className="text-[11px] text-gray-400 font-mono">
                    ID: {p.slug}
                  </span>

                  <Link
                    href={`/leadership/${p.slug}`}
                    className="px-4 py-2 bg-[#194B35] hover:bg-[#123626] text-white text-xs font-bold rounded-xl transition flex items-center gap-1 shadow-2xs"
                  >
                    <span>View Profile</span>
                    <ChevronRight className="w-3.5 h-3.5" />
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
