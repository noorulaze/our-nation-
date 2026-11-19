"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { 
  Users, 
  Building2, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Calendar, 
  ArrowLeft, 
  Share2, 
  ExternalLink, 
  Lock,
  Clock,
  Sparkles,
  Info,
  Award,
  Layers,
  ChevronRight
} from "lucide-react";
import { leadershipStore } from "@/lib/store/leadershipStore";
import { LeadershipCategory, LeadershipVerificationStatus } from "@/types/leadershipProfile";

export default function LeadershipProfileDetailPage() {
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : "";
  const profile = leadershipStore.getProfileBySlug(slug);

  const [copied, setCopied] = useState(false);

  if (!profile) {
    return notFound();
  }

  const categoryLabels: Record<LeadershipCategory, { label: string; color: string }> = {
    community_leadership: { label: "Community Leadership", color: "bg-emerald-50 text-emerald-800 border-emerald-200" },
    project_guidance: { label: "Project Guidance", color: "bg-blue-50 text-blue-800 border-blue-200" },
    civic_advisory: { label: "Civic Advisory", color: "bg-amber-50 text-amber-800 border-amber-200" },
    youth_leadership: { label: "Youth Leadership", color: "bg-purple-50 text-purple-800 border-purple-200" },
    expert_advisor: { label: "Expert Advisor", color: "bg-indigo-50 text-indigo-800 border-indigo-200" },
  };

  const statusConfig: Record<LeadershipVerificationStatus, { label: string; badgeClass: string; icon: any }> = {
    verified: { 
      label: "Official Verified Profile", 
      badgeClass: "bg-emerald-100 text-emerald-900 border-emerald-200", 
      icon: ShieldCheck 
    },
    pending_admin_approval: { 
      label: "Pending Admin Approval", 
      badgeClass: "bg-amber-100 text-amber-900 border-amber-200", 
      icon: AlertCircle 
    },
    draft: { 
      label: "Draft Profile (Unpublished)", 
      badgeClass: "bg-gray-100 text-gray-700 border-gray-200", 
      icon: Clock 
    },
    archived: { 
      label: "Archived Profile", 
      badgeClass: "bg-red-50 text-red-700 border-red-200", 
      icon: AlertCircle 
    },
  };

  const currentCategory = categoryLabels[profile.leadershipCategory] || { label: "Community Leader", color: "bg-gray-50 text-gray-700 border-gray-200" };
  const currentStatus = statusConfig[profile.verificationStatus] || statusConfig.pending_admin_approval;
  const StatusIcon = currentStatus.icon;

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Evaluate whether authorized public contacts exist
  const hasAuthorizedContact = Boolean(
    (profile.isContactPubliclyAuthorized && profile.publicContactNumber) ||
    (profile.isEmailPubliclyAuthorized && profile.publicEmail) ||
    profile.officialWebsite ||
    profile.publicOfficeAddress ||
    (profile.socialMediaLinks && profile.socialMediaLinks.length > 0)
  );

  return (
    <div className="min-h-screen bg-[#FAF7F0] flex flex-col font-sans selection:bg-[#194B35] selection:text-white pb-16 md:pb-0">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Leadership & Guidance", href: "/leadership" },
              { label: profile.displayName },
            ]}
          />

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#EDE6D8] text-xs font-bold text-gray-600 hover:text-[#194B35] hover:border-[#194B35] transition shadow-2xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? "Link Copied!" : "Share Profile"}</span>
          </button>
        </div>

        {/* Verification Status Notice if Pending */}
        {profile.verificationStatus === "pending_admin_approval" && (
          <div className="p-4 sm:p-5 bg-amber-50 rounded-3xl border border-amber-200 text-xs space-y-2 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 text-amber-900 font-bold">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Standardized Profile — Pending Official Admin Verification</span>
            </div>
            <p className="text-amber-950 leading-relaxed">
              This leadership record has been registered within OUR NATION’s standardized community governance structure. Personal biographical details, qualifications, and authorized responsibilities are preserved as pending until individual consent confirmation and formal administrative review.
            </p>
          </div>
        )}

        {/* 1. PROFILE HEADER CARD */}
        <div className="bg-white rounded-3xl sm:rounded-[2.5rem] border border-[#EDE6D8] p-6 sm:p-8 shadow-xs relative overflow-hidden">
          {/* Subtle Kerala Municipal Motif Watermark */}
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 rounded-full bg-emerald-50/40 pointer-events-none blur-2xl" />

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10 text-center sm:text-left">
            {/* Profile Avatar / Photo Container */}
            <div className="flex flex-col items-center shrink-0">
              <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-3xl bg-[#FAF7F0] border-2 border-[#EDE6D8] p-1.5 flex items-center justify-center shadow-xs overflow-hidden">
                <Image
                  src={profile.profilePhotoUrl || "/placeholder-leader.svg"}
                  alt={profile.fullName}
                  width={140}
                  height={140}
                  className="rounded-2xl object-cover w-full h-full"
                />
              </div>
              <span className="text-[10px] font-bold text-gray-500 mt-2 px-2.5 py-0.5 rounded-full bg-gray-100 border border-gray-200">
                {profile.photoStatus === "verified_photo" 
                  ? "Authorized Official Photo" 
                  : "Pending Authorized Photo"}
              </span>
            </div>

            {/* Profile Header Details */}
            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className={`text-[10.5px] font-bold px-3 py-1 rounded-full border uppercase tracking-wider ${currentCategory.color}`}>
                  {currentCategory.label}
                </span>

                <span className={`text-[10.5px] font-bold px-3 py-1 rounded-full border flex items-center gap-1.5 ${currentStatus.badgeClass}`}>
                  <StatusIcon className="w-3.5 h-3.5" />
                  <span>{currentStatus.label}</span>
                </span>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-[#194B35] font-sans">
                  {profile.fullName}
                </h1>
                <p className="text-sm sm:text-base font-bold text-[#C39A5B] mt-0.5">
                  {profile.designation}
                </p>
                <p className="text-xs text-gray-500 mt-1 flex items-center justify-center sm:justify-start gap-1">
                  <Building2 className="w-3.5 h-3.5 text-gray-400" />
                  <span>{profile.organization}</span>
                </p>
              </div>

              {/* Short Introduction if available */}
              {profile.shortIntroduction && (
                <p className="text-xs sm:text-sm text-[#5C6A64] leading-relaxed pt-1 max-w-2xl border-t border-gray-100">
                  {profile.shortIntroduction}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 2-COLUMN MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT 2 COLUMNS: About, Responsibilities & Areas */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* 2. ABOUT & BIOGRAPHY SECTION */}
            <section className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-7 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 border-b border-[#EDE6D8] pb-3">
                <Users className="w-5 h-5 text-[#194B35]" />
                <h2 className="text-lg font-bold text-[#194B35] font-sans">
                  About &amp; Overview
                </h2>
              </div>

              <div className="text-xs sm:text-sm text-[#252A25] leading-relaxed space-y-3 font-normal">
                {profile.fullBiography ? (
                  <p className="whitespace-pre-line bg-[#FAF7F0] p-4 rounded-2xl border border-[#EDE6D8] text-[#5C6A64]">
                    {profile.fullBiography}
                  </p>
                ) : (
                  <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] text-xs text-gray-500 italic">
                    Full biographical record is pending verified authorization and individual confirmation.
                  </div>
                )}
              </div>
            </section>

            {/* 3. ROLES, RESPONSIBILITIES & AREAS OF LEADERSHIP */}
            <section className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-7 shadow-xs space-y-5">
              <div className="flex items-center gap-2.5 border-b border-[#EDE6D8] pb-3">
                <Award className="w-5 h-5 text-[#194B35]" />
                <h2 className="text-lg font-bold text-[#194B35] font-sans">
                  Roles &amp; Responsibilities
                </h2>
              </div>

              {/* Main Responsibilities */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                  Designated Responsibilities
                </span>
                <ul className="space-y-2">
                  {profile.mainResponsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#5C6A64] bg-[#FAF7F0] p-3 rounded-2xl border border-[#EDE6D8]">
                      <CheckCircle2 className="w-4 h-4 text-[#C39A5B] shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Areas of Leadership */}
              {profile.areasOfLeadership && profile.areasOfLeadership.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                    Core Leadership Dimensions
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {profile.areasOfLeadership.map((area, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-bold"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* 4. COMMITTEE & ASSOCIATED LOCAL BODY (Only if present) */}
            {((profile.associatedLocalGovernmentBody) || (profile.committeeMembership && profile.committeeMembership.length > 0)) && (
              <section className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-7 shadow-xs space-y-4">
                <div className="flex items-center gap-2.5 border-b border-[#EDE6D8] pb-3">
                  <Layers className="w-5 h-5 text-[#194B35]" />
                  <h2 className="text-lg font-bold text-[#194B35] font-sans">
                    Affiliations &amp; Committees
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  {profile.associatedLocalGovernmentBody && (
                    <div className="p-3.5 bg-[#FAF7F0] rounded-2xl border border-[#EDE6D8]">
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider block">
                        Associated Local Government Body
                      </span>
                      <span className="font-bold text-[#194B35] text-sm block mt-0.5">
                        {profile.associatedLocalGovernmentBody}
                      </span>
                    </div>
                  )}

                  {profile.committeeMembership && profile.committeeMembership.length > 0 && (
                    <div className="p-3.5 bg-[#FAF7F0] rounded-2xl border border-[#EDE6D8]">
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider block">
                        Committee Membership
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {profile.committeeMembership.map((com, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-white text-gray-700 rounded-lg border border-[#EDE6D8] font-bold">
                            {com}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}

          </div>

          {/* RIGHT 1 COLUMN: Public Info & Verification Details */}
          <div className="space-y-8">
            
            {/* 5. PUBLIC CONTACT INFORMATION (Genuinely optional & strictly authorized) */}
            <section className="bg-white rounded-3xl border border-[#EDE6D8] p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 border-b border-[#EDE6D8] pb-3">
                <Phone className="w-4 h-4 text-[#194B35]" />
                <h3 className="font-bold text-base text-[#194B35] font-sans">
                  Public Office &amp; Contact
                </h3>
              </div>

              {hasAuthorizedContact ? (
                <div className="space-y-3 text-xs">
                  {profile.isContactPubliclyAuthorized && profile.publicContactNumber && (
                    <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8]">
                      <Phone className="w-4 h-4 text-[#C39A5B] shrink-0" />
                      <div>
                        <span className="text-[10px] text-gray-400 block uppercase">Public Phone</span>
                        <a href={`tel:${profile.publicContactNumber}`} className="font-bold text-[#194B35] hover:underline">
                          {profile.publicContactNumber}
                        </a>
                      </div>
                    </div>
                  )}

                  {profile.isEmailPubliclyAuthorized && profile.publicEmail && (
                    <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8]">
                      <Mail className="w-4 h-4 text-[#C39A5B] shrink-0" />
                      <div>
                        <span className="text-[10px] text-gray-400 block uppercase">Email</span>
                        <a href={`mailto:${profile.publicEmail}`} className="font-bold text-[#194B35] hover:underline">
                          {profile.publicEmail}
                        </a>
                      </div>
                    </div>
                  )}

                  {profile.officialWebsite && (
                    <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8]">
                      <Globe className="w-4 h-4 text-[#C39A5B] shrink-0" />
                      <div>
                        <span className="text-[10px] text-gray-400 block uppercase">Official Portal</span>
                        <a href={profile.officialWebsite} target="_blank" rel="noopener noreferrer" className="font-bold text-[#194B35] hover:underline flex items-center gap-1">
                          <span>Visit Website</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  )}

                  {profile.publicOfficeAddress && (
                    <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8]">
                      <MapPin className="w-4 h-4 text-[#C39A5B] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] text-gray-400 block uppercase">Office Address</span>
                        <span className="text-gray-700">{profile.publicOfficeAddress}</span>
                      </div>
                    </div>
                  )}

                  {profile.socialMediaLinks && profile.socialMediaLinks.length > 0 && (
                    <div className="pt-2">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                        Official Social Media
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {profile.socialMediaLinks.map((link, idx) => (
                          <a
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1 rounded-xl bg-white border border-[#EDE6D8] hover:border-[#194B35] text-xs font-bold text-gray-700 hover:text-[#194B35] transition"
                          >
                            {link.label || link.platform}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] text-center space-y-2">
                  <Lock className="w-5 h-5 text-gray-400 mx-auto" />
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Direct public contact channels are held confidential and are not published without explicit authorization.
                  </p>
                </div>
              )}
            </section>

            {/* 6. VERIFICATION & SOURCE AUDIT CARD */}
            <section className="bg-white rounded-3xl border border-[#EDE6D8] p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 border-b border-[#EDE6D8] pb-3">
                <ShieldCheck className="w-4 h-4 text-[#194B35]" />
                <h3 className="font-bold text-base text-[#194B35] font-sans">
                  Verification &amp; Integrity
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] space-y-1">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider block">
                    Verification Audit Status
                  </span>
                  <span className="font-bold text-[#194B35] block">
                    {profile.verificationStatus.replace(/_/g, " ").toUpperCase()}
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] space-y-1">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider block">
                    Consent &amp; Authorization
                  </span>
                  <span className="font-bold text-gray-700 block">
                    {profile.consentConfirmed ? "Confirmed & Documented" : "Pending Confirmation"}
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] space-y-1">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider block">
                    Profile Timeline
                  </span>
                  <p className="text-[11px] text-gray-500">
                    Created: {profile.profileCreatedDate} • Updated: {profile.lastUpdatedDate}
                  </p>
                </div>

                {profile.informationSourceUrl && (
                  <div className="p-3 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] space-y-1">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block">
                      Information Source
                    </span>
                    <a
                      href={profile.informationSourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-[#194B35] hover:underline flex items-center gap-1 text-[11px]"
                    >
                      <span className="truncate">{profile.informationSourceUrl}</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                  </div>
                )}
              </div>

              {/* Administrative Integrity Notice */}
              <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-[11px] text-emerald-900 leading-relaxed">
                <strong>Platform Standard:</strong> OUR NATION distinguishes independent community leadership profiles from statutory municipal representatives. Information is verified through statutory or direct documented consent.
              </div>
            </section>

            {/* Link to Municipal Representatives Directory */}
            <div className="p-5 rounded-3xl bg-[#194B35] text-white space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 block">
                Local Government Directory
              </span>
              <h4 className="font-bold text-sm">
                Looking for Elected Municipal Councillors?
              </h4>
              <p className="text-xs text-emerald-100/90 leading-relaxed">
                Explore the official 45 wards of Tanur Municipality and statutory office bearers.
              </p>
              <Link
                href="/local-governments/tanur-municipality"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-[#194B35] text-xs font-bold hover:bg-[#F5F1E7] transition shadow-xs"
              >
                <span>View Municipal Directory</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
