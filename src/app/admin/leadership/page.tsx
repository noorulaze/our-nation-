"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { leadershipStore } from "@/lib/store/leadershipStore";
import {
  LeadershipProfile,
  LeadershipCategory,
  LeadershipVerificationStatus,
  ProfilePhotoStatus,
} from "@/types/leadershipProfile";
import {
  Users,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Eye,
  Edit3,
  Plus,
  Save,
  Trash2,
  ExternalLink,
  ChevronRight,
  Info,
  Archive,
  ArrowLeft,
  X,
  FileText
} from "lucide-react";

export default function AdminLeadershipPage() {
  const [profiles, setProfiles] = useState<LeadershipProfile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<LeadershipProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Form state
  const [formFullName, setFormFullName] = useState("");
  const [formDisplayName, setFormDisplayName] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formDesignation, setFormDesignation] = useState("");
  const [formCategory, setFormCategory] = useState<LeadershipCategory>("community_leadership");
  const [formShortIntro, setFormShortIntro] = useState("");
  const [formFullBiography, setFormFullBiography] = useState("");
  const [formPhotoUrl, setFormPhotoUrl] = useState("/placeholder-leader.svg");
  const [formPhotoStatus, setFormPhotoStatus] = useState<ProfilePhotoStatus>("pending_authorization");
  
  const [formOrg, setFormOrg] = useState("OUR NATION – Tanur");
  const [formAreas, setFormAreas] = useState("");
  const [formResponsibilities, setFormResponsibilities] = useState("");
  const [formAssociatedBody, setFormAssociatedBody] = useState("");
  const [formCommittee, setFormCommittee] = useState("");

  const [formContactNumber, setFormContactNumber] = useState("");
  const [formIsContactAuthorized, setFormIsContactAuthorized] = useState(false);
  const [formEmail, setFormEmail] = useState("");
  const [formIsEmailAuthorized, setFormIsEmailAuthorized] = useState(false);
  const [formWebsite, setFormWebsite] = useState("");
  const [formOfficeAddress, setFormOfficeAddress] = useState("");

  const [formVerificationStatus, setFormVerificationStatus] = useState<LeadershipVerificationStatus>("pending_admin_approval");
  const [formSourceUrl, setFormSourceUrl] = useState("");
  const [formPhotoSource, setFormPhotoSource] = useState("");
  const [formConsentConfirmed, setFormConsentConfirmed] = useState(false);
  const [formAdminNotes, setFormAdminNotes] = useState("");

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = () => {
    const list = leadershipStore.getProfiles({ includePending: true });
    setProfiles(list);
    if (!selectedProfile && list.length > 0) {
      handleSelect(list[0]);
    }
  };

  const handleSelect = (p: LeadershipProfile) => {
    setSelectedProfile(p);
    setFormFullName(p.fullName);
    setFormDisplayName(p.displayName);
    setFormSlug(p.slug);
    setFormDesignation(p.designation);
    setFormCategory(p.leadershipCategory);
    setFormShortIntro(p.shortIntroduction || "");
    setFormFullBiography(p.fullBiography || "");
    setFormPhotoUrl(p.profilePhotoUrl || "/placeholder-leader.svg");
    setFormPhotoStatus(p.photoStatus);
    setFormOrg(p.organization);
    setFormAreas(p.areasOfLeadership.join(", "));
    setFormResponsibilities(p.mainResponsibilities.join("\n"));
    setFormAssociatedBody(p.associatedLocalGovernmentBody || "");
    setFormCommittee(Array.isArray(p.committeeMembership) ? p.committeeMembership.join(", ") : "");
    setFormContactNumber(p.publicContactNumber || "");
    setFormIsContactAuthorized(!!p.isContactPubliclyAuthorized);
    setFormEmail(p.publicEmail || "");
    setFormIsEmailAuthorized(!!p.isEmailPubliclyAuthorized);
    setFormWebsite(p.officialWebsite || "");
    setFormOfficeAddress(p.publicOfficeAddress || "");
    setFormVerificationStatus(p.verificationStatus);
    setFormSourceUrl(p.informationSourceUrl || "");
    setFormPhotoSource(p.photographSource || "");
    setFormConsentConfirmed(p.consentConfirmed);
    setFormAdminNotes(p.adminNotes || "");
    setIsEditing(false);
  };

  const handleNew = () => {
    setSelectedProfile(null);
    setFormFullName("");
    setFormDisplayName("");
    setFormSlug("");
    setFormDesignation("");
    setFormCategory("community_leadership");
    setFormShortIntro("To be added after confirmation.");
    setFormFullBiography("Pending verified information.");
    setFormPhotoUrl("/placeholder-leader.svg");
    setFormPhotoStatus("pending_authorization");
    setFormOrg("OUR NATION – Tanur");
    setFormAreas("Community Mentorship, Civic Projects");
    setFormResponsibilities("To be confirmed with the individual.");
    setFormAssociatedBody("");
    setFormCommittee("");
    setFormContactNumber("");
    setFormIsContactAuthorized(false);
    setFormEmail("");
    setFormIsEmailAuthorized(false);
    setFormWebsite("");
    setFormOfficeAddress("");
    setFormVerificationStatus("draft");
    setFormSourceUrl("");
    setFormPhotoSource("");
    setFormConsentConfirmed(false);
    setFormAdminNotes("");
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formFullName.trim()) {
      showNotification("Full Name is required.", "error");
      return;
    }

    const payload = {
      fullName: formFullName.trim(),
      displayName: formDisplayName.trim() || formFullName.trim(),
      slug: formSlug.trim() || formFullName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      designation: formDesignation.trim(),
      leadershipCategory: formCategory,
      shortIntroduction: formShortIntro.trim(),
      fullBiography: formFullBiography.trim(),
      profilePhotoUrl: formPhotoUrl.trim() || "/placeholder-leader.svg",
      photoType: formPhotoUrl.startsWith("http") ? "url" : "local",
      photoStatus: formPhotoStatus,
      organization: formOrg.trim(),
      areasOfLeadership: formAreas.split(",").map((s) => s.trim()).filter(Boolean),
      mainResponsibilities: formResponsibilities.split("\n").map((s) => s.trim()).filter(Boolean),
      associatedLocalGovernmentBody: formAssociatedBody.trim() || undefined,
      committeeMembership: formCommittee.trim() ? [formCommittee.trim()] : [],
      publicContactNumber: formContactNumber.trim() || undefined,
      isContactPubliclyAuthorized: formIsContactAuthorized,
      publicEmail: formEmail.trim() || undefined,
      isEmailPubliclyAuthorized: formIsEmailAuthorized,
      officialWebsite: formWebsite.trim() || undefined,
      publicOfficeAddress: formOfficeAddress.trim() || undefined,
      verificationStatus: formVerificationStatus,
      informationSourceUrl: formSourceUrl.trim() || undefined,
      photographSource: formPhotoSource.trim() || undefined,
      consentConfirmed: formConsentConfirmed,
      adminNotes: formAdminNotes.trim() || undefined,
    } as any;

    if (selectedProfile) {
      leadershipStore.updateProfile(selectedProfile.id, payload, "Admin Console");
      showNotification("Profile updated successfully.", "success");
    } else {
      const created = leadershipStore.createProfile(payload, "Admin Console");
      setSelectedProfile(created);
      showNotification("New leadership profile created.", "success");
    }

    setIsEditing(false);
    loadProfiles();
  };

  const handleStatusChange = (status: LeadershipVerificationStatus) => {
    if (!selectedProfile) return;
    leadershipStore.setVerificationStatus(selectedProfile.id, status, `Admin status set to ${status}`, "Admin Console");
    setFormVerificationStatus(status);
    showNotification(`Verification status changed to: ${status}`, "success");
    loadProfiles();
  };

  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420] font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Admin", href: "/admin" },
            { label: "Leadership & Guidance Profiles" },
          ]}
        />

        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EDE6D8]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#194B35]/10 text-[#194B35] text-xs font-bold border border-[#194B35]/20 mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C39A5B]" />
              <span>Admin Management Console</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#194B35] font-sans">
              Leadership &amp; Guidance Profiles
            </h1>
            <p className="text-xs sm:text-sm text-[#5C6A64]">
              Manage community leaders, mentors, and verified civic advisors with strict provenance and anti-fabrication standards.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/leadership"
              target="_blank"
              className="px-4 py-2.5 rounded-xl bg-white border border-[#EDE6D8] text-[#194B35] text-xs font-bold hover:bg-[#FAF7F0] transition flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View Public Directory</span>
            </Link>

            <button
              onClick={handleNew}
              className="px-4 py-2.5 rounded-xl bg-[#194B35] hover:bg-[#123626] text-white text-xs font-bold shadow-xs transition flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5 text-[#F3CE7A]" />
              <span>Add New Leader</span>
            </button>
          </div>
        </div>

        {notification && (
          <div
            className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in ${
              notification.type === "success"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-rose-50 text-rose-800 border border-rose-200"
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{notification.message}</span>
          </div>
        )}

        {/* Master-Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Profiles List */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#C39A5B] px-1">
              Registered Profiles ({profiles.length})
            </div>

            <div className="space-y-2">
              {profiles.map((p) => {
                const isSelected = selectedProfile?.id === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleSelect(p)}
                    className={`w-full text-left p-4 rounded-2xl border transition flex items-center gap-3.5 ${
                      isSelected
                        ? "bg-white border-[#194B35] shadow-md ring-1 ring-[#194B35]"
                        : "bg-white/70 hover:bg-white border-[#EDE6D8]"
                    }`}
                  >
                    <div className="relative w-12 h-12 rounded-xl bg-[#FAF7F0] border border-[#EDE6D8] overflow-hidden shrink-0">
                      <Image
                        src={p.profilePhotoUrl || "/placeholder-leader.svg"}
                        alt={p.fullName}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <h3 className="font-bold text-xs sm:text-sm text-[#194B35] truncate">
                          {p.fullName}
                        </h3>
                        <span
                          className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full shrink-0 ${
                            p.verificationStatus === "verified"
                              ? "bg-emerald-100 text-emerald-800"
                              : p.verificationStatus === "pending_admin_approval"
                              ? "bg-amber-100 text-amber-900 border border-amber-300"
                              : p.verificationStatus === "archived"
                              ? "bg-stone-200 text-stone-600"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {p.verificationStatus.replace(/_/g, " ")}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#5C6A64] truncate mt-0.5">
                        {p.designation}
                      </p>
                      <p className="text-[10px] text-[#C39A5B] font-medium truncate">
                        {p.organization}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Anti-Fabrication Safeguard Alert */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-[11px] text-amber-950 space-y-1.5 leading-relaxed">
              <div className="flex items-center gap-1.5 font-bold text-amber-900">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                <span>Statutory Verification Rule</span>
              </div>
              <p>
                Never invent biographical details, academic credentials, electoral claims, or private contact info. Any unconfirmed fields must remain explicitly marked as &quot;Pending verified information&quot;.
              </p>
            </div>
          </div>

          {/* Right Column: Editor & Verification Inspector */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-8 shadow-sm space-y-6">
            
            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#EDE6D8]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C39A5B]">
                  {selectedProfile ? "Edit Leadership Profile" : "Create Leadership Profile"}
                </span>
                <h2 className="text-xl font-black text-[#194B35]">
                  {formFullName || "New Profile"}
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {selectedProfile && (
                  <>
                    <button
                      type="button"
                      onClick={() => setIsPreviewOpen(true)}
                      className="px-3.5 py-2 rounded-xl bg-[#FAF7F0] hover:bg-[#EDE8DC] text-[#194B35] text-xs font-bold border border-[#EDE6D8] flex items-center gap-1.5 transition"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#C39A5B]" />
                      <span>Live Preview</span>
                    </button>

                    <Link
                      href={`/leadership/${formSlug}`}
                      target="_blank"
                      className="px-3.5 py-2 rounded-xl bg-[#FAF7F0] hover:bg-[#EDE8DC] text-[#194B35] text-xs font-bold border border-[#EDE6D8] flex items-center gap-1.5 transition"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>View Public Page</span>
                    </Link>

                    {formVerificationStatus !== "verified" && (
                      <button
                        type="button"
                        onClick={() => handleStatusChange("verified")}
                        className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Verify Profile</span>
                      </button>
                    )}

                    {formVerificationStatus !== "archived" && (
                      <button
                        type="button"
                        onClick={() => handleStatusChange("archived")}
                        className="px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition flex items-center gap-1"
                      >
                        <Archive className="w-3.5 h-3.5" />
                        <span>Archive</span>
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Structured Form */}
            <form onSubmit={handleSave} className="space-y-6">
              
              {/* SECTION A: BASIC INFORMATION */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#194B35] border-b border-[#FAF7F0] pb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C39A5B]" />
                  <span>Section A: Basic Information</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1A2420] mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formFullName}
                      onChange={(e) => setFormFullName(e.target.value)}
                      placeholder="e.g. PK Nawas"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#194B35]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A2420] mb-1">Display Name</label>
                    <input
                      type="text"
                      value={formDisplayName}
                      onChange={(e) => setFormDisplayName(e.target.value)}
                      placeholder="e.g. PK Nawas"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-xs focus:outline-none focus:ring-2 focus:ring-[#194B35]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A2420] mb-1">URL Slug *</label>
                    <input
                      type="text"
                      required
                      value={formSlug}
                      onChange={(e) => setFormSlug(e.target.value)}
                      placeholder="e.g. pk-nawas"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#194B35]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A2420] mb-1">Designation / Role *</label>
                    <input
                      type="text"
                      required
                      value={formDesignation}
                      onChange={(e) => setFormDesignation(e.target.value)}
                      placeholder="e.g. Overall Community Leader & Project Guidance"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-xs focus:outline-none focus:ring-2 focus:ring-[#194B35]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A2420] mb-1">Leadership Category</label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value as LeadershipCategory)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-xs focus:outline-none focus:ring-2 focus:ring-[#194B35]"
                    >
                      <option value="community_leadership">Community Leadership</option>
                      <option value="project_guidance">Project Guidance</option>
                      <option value="civic_advisory">Civic Advisory</option>
                      <option value="youth_leadership">Youth Leadership</option>
                      <option value="expert_advisor">Expert Advisor</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A2420] mb-1">Organization / Institution</label>
                    <input
                      type="text"
                      value={formOrg}
                      onChange={(e) => setFormOrg(e.target.value)}
                      placeholder="e.g. OUR NATION – Tanur"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-xs focus:outline-none focus:ring-2 focus:ring-[#194B35]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1A2420] mb-1">Short Introduction</label>
                  <textarea
                    rows={2}
                    value={formShortIntro}
                    onChange={(e) => setFormShortIntro(e.target.value)}
                    placeholder="Short introduction (leave as 'To be added after confirmation.' if unconfirmed)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-xs focus:outline-none focus:ring-2 focus:ring-[#194B35]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1A2420] mb-1">Full Biography</label>
                  <textarea
                    rows={4}
                    value={formFullBiography}
                    onChange={(e) => setFormFullBiography(e.target.value)}
                    placeholder="Detailed biography (leave as 'Pending verified information.' if unconfirmed)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-xs focus:outline-none focus:ring-2 focus:ring-[#194B35]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1A2420] mb-1">Profile Photograph URL</label>
                    <input
                      type="text"
                      value={formPhotoUrl}
                      onChange={(e) => setFormPhotoUrl(e.target.value)}
                      placeholder="/placeholder-leader.svg"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#194B35]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A2420] mb-1">Photo Authorization Status</label>
                    <select
                      value={formPhotoStatus}
                      onChange={(e) => setFormPhotoStatus(e.target.value as ProfilePhotoStatus)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-xs focus:outline-none focus:ring-2 focus:ring-[#194B35]"
                    >
                      <option value="pending_authorization">Pending Authorization</option>
                      <option value="official_authorized">Official Authorized</option>
                      <option value="placeholder_only">Placeholder Only</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION B: ROLE & RESPONSIBILITIES */}
              <div className="space-y-4 pt-4 border-t border-[#EDE6D8]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#194B35] border-b border-[#FAF7F0] pb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C39A5B]" />
                  <span>Section B: Role &amp; Responsibilities</span>
                </h3>

                <div>
                  <label className="block text-xs font-bold text-[#1A2420] mb-1">Areas of Leadership (Comma-separated)</label>
                  <input
                    type="text"
                    value={formAreas}
                    onChange={(e) => setFormAreas(e.target.value)}
                    placeholder="e.g. Community Mentorship, Public Grievance Guidance, Youth Development"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-xs focus:outline-none focus:ring-2 focus:ring-[#194B35]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1A2420] mb-1">Main Responsibilities (One per line)</label>
                  <textarea
                    rows={3}
                    value={formResponsibilities}
                    onChange={(e) => setFormResponsibilities(e.target.value)}
                    placeholder="To be confirmed with the individual."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-xs focus:outline-none focus:ring-2 focus:ring-[#194B35]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1A2420] mb-1">Associated Local Government Body</label>
                    <input
                      type="text"
                      value={formAssociatedBody}
                      onChange={(e) => setFormAssociatedBody(e.target.value)}
                      placeholder="Optional (e.g. Tanur Municipality / Block)"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-xs focus:outline-none focus:ring-2 focus:ring-[#194B35]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A2420] mb-1">Committee Membership</label>
                    <input
                      type="text"
                      value={formCommittee}
                      onChange={(e) => setFormCommittee(e.target.value)}
                      placeholder="Optional"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-xs focus:outline-none focus:ring-2 focus:ring-[#194B35]"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION C: PUBLIC CONTACT INFORMATION */}
              <div className="space-y-4 pt-4 border-t border-[#EDE6D8]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#194B35] border-b border-[#FAF7F0] pb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C39A5B]" />
                  <span>Section C: Public Contact Information (Strictly Authorized Only)</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1A2420] mb-1">Public Contact Number</label>
                    <input
                      type="text"
                      value={formContactNumber}
                      onChange={(e) => setFormContactNumber(e.target.value)}
                      placeholder="Only if authorized"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-xs focus:outline-none focus:ring-2 focus:ring-[#194B35]"
                    />
                    <label className="flex items-center gap-2 mt-2 text-xs font-bold text-[#194B35] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formIsContactAuthorized}
                        onChange={(e) => setFormIsContactAuthorized(e.target.checked)}
                        className="rounded text-[#194B35] focus:ring-[#194B35]"
                      />
                      <span>Authorized for Public Display</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A2420] mb-1">Public Email Address</label>
                    <input
                      type="email"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="Only if authorized"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-xs focus:outline-none focus:ring-2 focus:ring-[#194B35]"
                    />
                    <label className="flex items-center gap-2 mt-2 text-xs font-bold text-[#194B35] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formIsEmailAuthorized}
                        onChange={(e) => setFormIsEmailAuthorized(e.target.checked)}
                        className="rounded text-[#194B35] focus:ring-[#194B35]"
                      />
                      <span>Authorized for Public Display</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A2420] mb-1">Official Website</label>
                    <input
                      type="url"
                      value={formWebsite}
                      onChange={(e) => setFormWebsite(e.target.value)}
                      placeholder="https://..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-xs focus:outline-none focus:ring-2 focus:ring-[#194B35]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A2420] mb-1">Public Office Address</label>
                    <input
                      type="text"
                      value={formOfficeAddress}
                      onChange={(e) => setFormOfficeAddress(e.target.value)}
                      placeholder="Public office location"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-xs focus:outline-none focus:ring-2 focus:ring-[#194B35]"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION D: VERIFICATION & AUDIT AUDIENCE */}
              <div className="space-y-4 pt-4 border-t border-[#EDE6D8]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#194B35] border-b border-[#FAF7F0] pb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C39A5B]" />
                  <span>Section D: Verification &amp; Statutory Provenance</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1A2420] mb-1">Verification Status *</label>
                    <select
                      value={formVerificationStatus}
                      onChange={(e) => setFormVerificationStatus(e.target.value as LeadershipVerificationStatus)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#194B35]"
                    >
                      <option value="draft">Draft (Private)</option>
                      <option value="pending_admin_approval">Pending Admin Approval (Public with Alert)</option>
                      <option value="verified">Verified (Official Badge)</option>
                      <option value="archived">Archived (Hidden)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A2420] mb-1">Source Information URL</label>
                    <input
                      type="url"
                      value={formSourceUrl}
                      onChange={(e) => setFormSourceUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-xs focus:outline-none focus:ring-2 focus:ring-[#194B35]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A2420] mb-1">Photograph Source / Attribution</label>
                    <input
                      type="text"
                      value={formPhotoSource}
                      onChange={(e) => setFormPhotoSource(e.target.value)}
                      placeholder="e.g. Official Representative Archive"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-xs focus:outline-none focus:ring-2 focus:ring-[#194B35]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A2420] mb-1">Admin Audit Notes</label>
                    <input
                      type="text"
                      value={formAdminNotes}
                      onChange={(e) => setFormAdminNotes(e.target.value)}
                      placeholder="Audit log notes"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-xs focus:outline-none focus:ring-2 focus:ring-[#194B35]"
                    />
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8]">
                  <label className="flex items-center gap-2 text-xs font-bold text-[#194B35] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formConsentConfirmed}
                      onChange={(e) => setFormConsentConfirmed(e.target.checked)}
                      className="rounded text-[#194B35] focus:ring-[#194B35]"
                    />
                    <span>Direct Consent Confirmed (Individual has directly authorized this public profile)</span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#EDE6D8]">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl bg-[#194B35] hover:bg-[#123626] text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2"
                >
                  <Save className="w-4 h-4 text-[#F3CE7A]" />
                  <span>Save Leadership Profile</span>
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Live Preview Modal */}
        {isPreviewOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
            <div className="bg-[#FAF7F0] rounded-3xl border border-[#EDE6D8] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative space-y-6 text-left">
              <div className="flex items-center justify-between border-b border-[#EDE6D8] pb-3">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-[#C39A5B]" />
                  <span className="text-xs font-bold text-[#194B35]">Draft Preview</span>
                </div>
                <button
                  onClick={() => setIsPreviewOpen(false)}
                  className="w-7 h-7 rounded-full bg-white border border-[#EDE6D8] flex items-center justify-center text-gray-500 hover:text-black text-xs font-bold"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Preview Hero Card */}
              <div className="bg-white rounded-2xl border border-[#EDE6D8] p-6 shadow-xs flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] overflow-hidden shrink-0">
                  <Image
                    src={formPhotoUrl || "/placeholder-leader.svg"}
                    alt={formFullName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#194B35]">{formFullName || "Leader Name"}</h3>
                  <p className="text-xs font-bold text-[#C39A5B] mt-0.5">{formDesignation || "Designation"}</p>
                  <p className="text-[11px] text-[#5C6A64] mt-0.5">{formOrg}</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#EDE6D8] p-5 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#194B35]">About &amp; Biography</h4>
                <p className="text-xs text-[#5C6A64] leading-relaxed">{formFullBiography || "Pending verified information."}</p>
              </div>

              <div className="text-center">
                <button
                  onClick={() => setIsPreviewOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-[#194B35] text-white text-xs font-bold"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
