"use client";

import React, { useState, useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { useAuth } from "@/lib/auth/context";
import { store } from "@/lib/data/store";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import Link from "next/link";
import { KERALA_NEWS_ARTICLES } from "@/lib/data/keralaNewsData";
import { KERALA_EVENTS_DATA } from "@/lib/data/keralaEventsData";
import { 
  User, 
  MapPin, 
  ShieldCheck, 
  Save, 
  Trash2, 
  CheckCircle2, 
  Calendar, 
  AlertTriangle, 
  ArrowRight, 
  Bookmark, 
  Settings, 
  ExternalLink, 
  Camera, 
  Upload, 
  Eye, 
  Phone, 
  Mail, 
  Wrench, 
  Check, 
  X, 
  Lock, 
  ZoomIn, 
  ZoomOut 
} from "lucide-react";

export default function ProfilePage() {
  const { user, role, updateProfile, updatePassword, deleteAccount, resendVerificationEmail, logout } = useAuth();

  const [activeTab, setActiveTab] = useState<"info" | "privacy" | "saved_articles" | "saved_events" | "civic" | "settings">("info");
  const [savedArticles] = useState(KERALA_NEWS_ARTICLES.slice(0, 3));
  const [savedEvents] = useState(KERALA_EVENTS_DATA.slice(0, 2));

  // Form Fields
  const [displayName, setDisplayName] = useState(user?.display_name || "Citizen");
  const [bio, setBio] = useState(user?.bio || "Resident of Tanur Municipality.");
  const [phone, setPhone] = useState(user?.phone || "");
  const [locality, setLocality] = useState(user?.locality || "Tanur Municipality");
  const [interests, setInterests] = useState<string[]>(user?.interests || ["Civic Tech", "Tanur History", "Environment"]);
  const [newInterestInput, setNewInterestInput] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  // Privacy Settings (Default Private)
  const [privacySettings, setPrivacySettings] = useState(user?.privacy_settings || {
    public_profile: false,
    show_phone: false,
    show_email: false,
    show_address: false,
  });

  // Avatar Management & Crop Modal
  const [avatarUrl, setAvatarUrl] = useState<string | null>(user?.avatar_url || null);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [tempImageSrc, setTempImageSrc] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Security / Password Change State
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStatus, setPasswordStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  // Resend verification state
  const [verifyNotice, setVerifyNotice] = useState<string | null>(null);

  // Account Deletion State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteReason, setDeleteReason] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const myIssues = store.getIssueReports(undefined, user?.id);
  const mySavedPros = user ? store.getSavedProfessionals(user.id) : [];

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({
      display_name: displayName,
      bio,
      phone,
      locality,
      interests,
      avatar_url: avatarUrl,
      privacy_settings: privacySettings,
    });
    setSaveMessage("Profile updated successfully!");
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleAddInterest = () => {
    if (newInterestInput.trim() && !interests.includes(newInterestInput.trim())) {
      setInterests([...interests, newInterestInput.trim()]);
      setNewInterestInput("");
    }
  };

  const handleRemoveInterest = (item: string) => {
    setInterests(interests.filter((i) => i !== item));
  };

  // Avatar File Handling
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      alert("Please upload an image in JPEG, PNG, or WebP format.");
      return;
    }

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be under 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setTempImageSrc(reader.result as string);
      setZoomLevel(1);
      setCropModalOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const handleApplyCroppedAvatar = () => {
    if (tempImageSrc) {
      setAvatarUrl(tempImageSrc);
      updateProfile({ avatar_url: tempImageSrc });
      setCropModalOpen(false);
      setTempImageSrc(null);
    }
  };

  const handleRemoveAvatar = () => {
    if (confirm("Are you sure you want to remove your profile photo?")) {
      setAvatarUrl(null);
      updateProfile({ avatar_url: null });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: "Profile" }]} className="mb-4" />

        {/* Profile Card Header */}
        <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 sm:p-8 mb-6 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative group">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={displayName}
                  className="w-20 h-20 rounded-2xl object-cover border-4 border-[#FAF7F0] shadow-md"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#194B35] to-[#143E2C] text-amber-200 font-bold text-3xl flex items-center justify-center border-4 border-[#FAF7F0] shadow-md">
                  {displayName ? displayName.charAt(0) : "C"}
                </div>
              )}

              {/* Photo change overlay button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                title="Change Photo"
                aria-label="Change Photo"
                className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200 text-white cursor-pointer"
              >
                <Camera className="w-6 h-6" />
              </button>

              <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold font-sans text-[#194B35]">
                  {displayName}
                </h1>
                <span className={`text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full ${
                  role === "admin"
                    ? "bg-purple-100 text-purple-800 border border-purple-200"
                    : role === "moderator"
                    ? "bg-blue-100 text-blue-800 border border-blue-200"
                    : role === "verified_org"
                    ? "bg-amber-100 text-amber-800 border border-amber-200"
                    : "bg-[#E0F1E7] text-[#194B35] border border-[#BDE3CE]"
                }`}>
                  {role}
                </span>

                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                  user?.email_verified
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                    : "bg-amber-100 text-amber-800 border border-amber-200"
                }`}>
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{user?.email_verified ? "Verified Citizen" : "Email Pending"}</span>
                </span>
              </div>
              <p className="text-xs text-[#7A8880] mt-1 flex items-center gap-2 flex-wrap">
                <span>@{user?.username || "citizen"}</span>
                <span>•</span>
                <span>{user?.email || "citizen@tanur.gov.in"}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-[#194B35] font-semibold">
                  <MapPin className="w-3.5 h-3.5" />
                  {locality || "Tanur Municipality"}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end flex-wrap">
            <Link
              href={`/people/${user?.username || "fathima_tanur"}`}
              className="px-4 py-2 rounded-xl text-xs font-bold text-[#194B35] bg-[#FAF7F0] hover:bg-[#F3EFE6] transition border border-[#DDD5C5] shadow-2xs flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View Public Profile</span>
            </Link>
            <button
              onClick={() => logout()}
              className="px-4 py-2 rounded-xl text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 transition border border-red-200 shadow-2xs active:scale-95"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Hidden File Input for Avatar */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
        />

        {/* CROP & PREVIEW MODAL */}
        {cropModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#EAE4D7] space-y-4 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-[#F3EFE6] pb-3">
                <h3 className="font-bold text-sm text-[#194B35] font-sans">
                  Adjust Profile Photo
                </h3>
                <button
                  onClick={() => setCropModalOpen(false)}
                  className="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-neutral-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Circle Viewport Preview */}
              <div className="relative w-56 h-56 mx-auto rounded-full overflow-hidden border-4 border-[#194B35] bg-neutral-900 flex items-center justify-center shadow-inner">
                {tempImageSrc && (
                  <img
                    src={tempImageSrc}
                    alt="Preview"
                    style={{ transform: `scale(${zoomLevel})` }}
                    className="max-w-none transition-transform duration-100"
                  />
                )}
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.1))}
                  className="p-2 rounded-xl bg-[#FAF7F0] border border-[#DDD5C5] text-[#194B35]"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <input
                  type="range"
                  min="0.7"
                  max="2.5"
                  step="0.05"
                  value={zoomLevel}
                  onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
                  className="w-40 accent-[#194B35]"
                />
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.1))}
                  className="p-2 rounded-xl bg-[#FAF7F0] border border-[#DDD5C5] text-[#194B35]"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#F3EFE6]">
                <button
                  type="button"
                  onClick={() => setCropModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#5C6A64] hover:bg-neutral-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleApplyCroppedAvatar}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#194B35] hover:bg-[#143E2C] transition shadow-2xs flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Photo</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Tabs Bar */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none border-b border-[#EAE4D7]">
          {[
            { id: "info", label: "Account Info", icon: User },
            { id: "privacy", label: "Privacy Settings", icon: Lock },
            { id: "saved_articles", label: `Saved Articles (${savedArticles.length})`, icon: Bookmark },
            { id: "saved_events", label: `Saved Events (${savedEvents.length})`, icon: Calendar },
            { id: "civic", label: `My Reports (${myIssues.length})`, icon: AlertTriangle },
            { id: "settings", label: "Settings & Security", icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap shadow-2xs active:scale-95 ${
                  isActive
                    ? "bg-[#194B35] text-white"
                    : "bg-white text-[#3D4B44] hover:bg-[#F3EFE6] border border-[#EAE4D7]"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-amber-300" : "text-[#7A8880]"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Saved Alert */}
        {isSaved && (
          <div className="mb-6 p-4 rounded-2xl bg-[#194B35] text-white text-xs font-semibold flex items-center gap-2 shadow-md animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-amber-300" />
            <span>{saveMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Tab Area (8 Cols) */}
          <div className="lg:col-span-8">
            {/* TAB 1: Account Information Form */}
            {activeTab === "info" && (
              <form onSubmit={handleSave} className="bg-white rounded-3xl border border-[#EAE4D7] p-6 sm:p-8 shadow-2xs space-y-5">
                <div className="flex items-center justify-between border-b border-[#F3EFE6] pb-3">
                  <h2 className="text-base font-bold text-[#194B35]">
                    Personal Information
                  </h2>
                  <span className="text-[11px] text-[#7A8880]">Edit your profile details</span>
                </div>

                {/* Photo Management Section */}
                <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt={displayName}
                        className="w-16 h-16 rounded-2xl object-cover border-2 border-[#194B35]"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-2xl bg-[#194B35] text-amber-200 font-bold text-2xl flex items-center justify-center">
                        {displayName ? displayName.charAt(0) : "C"}
                      </div>
                    )}
                    <div>
                      <h4 className="text-xs font-bold text-[#1A2420]">Profile Photo</h4>
                      <p className="text-[11px] text-[#7A8880]">JPG, PNG, or WebP (Max 5MB)</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3.5 py-2 rounded-xl bg-white border border-[#DDD5C5] text-xs font-bold text-[#194B35] hover:bg-[#F3EFE6] transition flex items-center gap-1.5"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Change Photo</span>
                    </button>
                    {avatarUrl && (
                      <button
                        type="button"
                        onClick={handleRemoveAvatar}
                        className="p-2 rounded-xl bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 transition"
                        title="Remove Photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1A2420] mb-1">
                      Display Name
                    </label>
                    <input
                      type="text"
                      required
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-none focus:ring-2 focus:ring-[#194B35]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A2420] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      disabled
                      value={user?.email || "citizen@tanur.gov.in"}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#F3EFE6] text-[#7A8880] cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1A2420] mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98470 11223"
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-none focus:ring-2 focus:ring-[#194B35]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A2420] mb-1">
                      Locality within Tanur
                    </label>
                    <select
                      value={locality}
                      onChange={(e) => setLocality(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                    >
                      <option value="Tanur Municipality">Tanur Municipality</option>
                      <option value="Tanur Beach Ward">Tanur Beach Ward</option>
                      <option value="Rayirimangalam, Tanur">Rayirimangalam, Tanur</option>
                      <option value="Kettungal, Tanur">Kettungal, Tanur</option>
                      <option value="Meenadathur, Tanur">Meenadathur, Tanur</option>
                      <option value="Tirur">Tirur</option>
                      <option value="Kottakkal">Kottakkal</option>
                      <option value="Ponnani">Ponnani</option>
                      <option value="Parappanangadi">Parappanangadi</option>
                      <option value="Malappuram Town">Malappuram Town</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1A2420] mb-1">
                    Bio / Introduction
                  </label>
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Short introduction about yourself..."
                    className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-none focus:ring-2 focus:ring-[#194B35] resize-none"
                  />
                </div>

                {/* Interests tag pills */}
                <div>
                  <label className="block text-xs font-bold text-[#1A2420] mb-2">
                    Civic Interests & Topics
                  </label>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {interests.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-[#E0F1E7] text-[#194B35] text-xs font-semibold flex items-center gap-1.5 border border-[#BDE3CE]"
                      >
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveInterest(tag)}
                          className="hover:text-red-600 font-bold ml-1 text-xs"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newInterestInput}
                      onChange={(e) => setNewInterestInput(e.target.value)}
                      placeholder="Add an interest (e.g. Sanitation, Roads, Education)..."
                      className="flex-1 px-3 py-2 text-xs rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddInterest();
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleAddInterest}
                      className="px-4 py-2 rounded-xl bg-[#FAF7F0] hover:bg-[#EAE4D7] border border-[#DDD5C5] text-xs font-bold text-[#194B35]"
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#194B35] hover:bg-[#143E2C] text-white font-bold text-xs transition active:scale-95 shadow-sm flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Profile</span>
                  </button>
                </div>
              </form>
            )}

            {/* TAB 2: Privacy Settings */}
            {activeTab === "privacy" && (
              <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 sm:p-8 shadow-2xs space-y-6">
                <div className="flex items-center justify-between border-b border-[#F3EFE6] pb-3">
                  <h2 className="text-base font-bold text-[#194B35] flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#C39A5B]" />
                    <span>Privacy Controls</span>
                  </h2>
                  <Link
                    href={`/people/${user?.username || "citizen"}`}
                    target="_blank"
                    className="text-xs font-bold text-[#194B35] hover:underline flex items-center gap-1"
                  >
                    <span>Preview Public Profile</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>

                <p className="text-xs text-[#5C6A64] leading-relaxed">
                  Your phone number and email are kept private by default. Control which details are visible on your public citizen profile:
                </p>

                <div className="space-y-4">
                  {/* Public Profile Enabled */}
                  <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7] flex items-center justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-[#1A2420]">Enable Public Profile</h4>
                      <p className="text-[11px] text-[#7A8880]">Allow community members to view your name, locality, and public contributions.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPrivacySettings(p => ({ ...p, public_profile: !p.public_profile }))}
                      className={`w-12 h-6 rounded-full transition relative p-0.5 ${
                        privacySettings.public_profile ? "bg-[#194B35]" : "bg-neutral-300"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition shadow-sm transform ${
                        privacySettings.public_profile ? "translate-x-6" : "translate-x-0"
                      }`} />
                    </button>
                  </div>

                  {/* Show Phone */}
                  <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7] flex items-center justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-[#1A2420] flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#194B35]" />
                        <span>Show Phone Number</span>
                      </h4>
                      <p className="text-[11px] text-[#7A8880]">Keep off to ensure your contact number is hidden from the public.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPrivacySettings(p => ({ ...p, show_phone: !p.show_phone }))}
                      className={`w-12 h-6 rounded-full transition relative p-0.5 ${
                        privacySettings.show_phone ? "bg-[#194B35]" : "bg-neutral-300"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition shadow-sm transform ${
                        privacySettings.show_phone ? "translate-x-6" : "translate-x-0"
                      }`} />
                    </button>
                  </div>

                  {/* Show Email */}
                  <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7] flex items-center justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-[#1A2420] flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-[#194B35]" />
                        <span>Show Email Address</span>
                      </h4>
                      <p className="text-[11px] text-[#7A8880]">Keep off to prevent spam and protect your email address.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPrivacySettings(p => ({ ...p, show_email: !p.show_email }))}
                      className={`w-12 h-6 rounded-full transition relative p-0.5 ${
                        privacySettings.show_email ? "bg-[#194B35]" : "bg-neutral-300"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition shadow-sm transform ${
                        privacySettings.show_email ? "translate-x-6" : "translate-x-0"
                      }`} />
                    </button>
                  </div>

                  {/* Show Locality */}
                  <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7] flex items-center justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-[#1A2420] flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#194B35]" />
                        <span>Show Ward / Locality</span>
                      </h4>
                      <p className="text-[11px] text-[#7A8880]">Display your Tanur locality or ward on your profile.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPrivacySettings(p => ({ ...p, show_address: !p.show_address }))}
                      className={`w-12 h-6 rounded-full transition relative p-0.5 ${
                        privacySettings.show_address ? "bg-[#194B35]" : "bg-neutral-300"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition shadow-sm transform ${
                        privacySettings.show_address ? "translate-x-6" : "translate-x-0"
                      }`} />
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={async () => {
                      await updateProfile({ privacy_settings: privacySettings });
                      setSaveMessage("Privacy settings saved successfully!");
                      setIsSaved(true);
                      setTimeout(() => setIsSaved(false), 3000);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-[#194B35] hover:bg-[#143E2C] text-white font-bold text-xs transition active:scale-95 shadow-sm flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Privacy Settings</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: Saved Articles */}
            {activeTab === "saved_articles" && (
              <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 sm:p-8 shadow-2xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#F3EFE6] pb-3">
                  <h2 className="text-base font-bold text-[#194B35] flex items-center gap-2">
                    <Bookmark className="w-4 h-4 text-[#C39A5B]" />
                    <span>Saved Articles ({savedArticles.length})</span>
                  </h2>
                  <Link href="/news" className="text-xs font-bold text-[#194B35] hover:underline flex items-center gap-1">
                    <span>Browse News</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                {savedArticles.length === 0 ? (
                  <div className="py-12 text-center text-[#7A8880] space-y-3">
                    <Bookmark className="w-8 h-8 mx-auto text-[#DDD5C5]" />
                    <p className="text-xs">You have not saved any articles yet.</p>
                    <Link href="/news" className="inline-block px-4 py-2 bg-[#194B35] text-white text-xs font-bold rounded-xl">
                      Read News
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {savedArticles.map((article) => (
                      <div
                        key={article.id}
                        className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7] flex flex-col sm:flex-row gap-4 items-start hover:border-[#194B35]/40 transition group"
                      >
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          className="w-full sm:w-32 h-24 rounded-xl object-cover shrink-0 bg-[#E5DDD0]"
                        />
                        <div className="flex-1 space-y-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#C39A5B]">
                            {article.category}
                          </span>
                          <h4 className="font-bold text-xs sm:text-sm text-[#1A2420] group-hover:text-[#194B35] transition line-clamp-2">
                            {article.title}
                          </h4>
                          <p className="text-xs text-[#5C6A64] line-clamp-2">{article.summary}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: Saved Events */}
            {activeTab === "saved_events" && (
              <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 sm:p-8 shadow-2xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#F3EFE6] pb-3">
                  <h2 className="text-base font-bold text-[#194B35] flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#C39A5B]" />
                    <span>Saved Events ({savedEvents.length})</span>
                  </h2>
                  <Link href="/events" className="text-xs font-bold text-[#194B35] hover:underline flex items-center gap-1">
                    <span>Explore Events</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="space-y-3">
                  {savedEvents.map((evt) => (
                    <div
                      key={evt.id}
                      className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7] flex items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-[#194B35] bg-[#E0F1E7] px-2 py-0.5 rounded-md">
                          {evt.category}
                        </span>
                        <h4 className="font-bold text-xs sm:text-sm text-[#1A2420]">{evt.title}</h4>
                        <p className="text-[11px] text-[#7A8880] flex items-center gap-2">
                          <span>📅 {evt.fullDate}</span>
                          <span>•</span>
                          <span>📍 {evt.location}</span>
                        </p>
                      </div>
                      <Link
                        href={`/events/${evt.id}`}
                        className="px-3.5 py-2 rounded-xl bg-white border border-[#DDD5C5] text-xs font-bold text-[#194B35] hover:bg-[#F3EFE6] transition"
                      >
                        View Details
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: Civic Issues */}
            {activeTab === "civic" && (
              <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 sm:p-8 shadow-2xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#F3EFE6] pb-3">
                  <h2 className="text-base font-bold text-[#194B35] flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>My Civic Reports ({myIssues.length})</span>
                  </h2>
                  <Link href="/civic-connect" className="text-xs font-bold text-[#194B35] hover:underline flex items-center gap-1">
                    <span>Report Issue</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                {myIssues.length === 0 ? (
                  <div className="py-12 text-center text-[#7A8880] space-y-2">
                    <p className="text-xs">You have not submitted any civic reports yet.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {myIssues.map((issue) => (
                      <div
                        key={issue.id}
                        className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7] space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#C39A5B]">
                            {issue.category}
                          </span>
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                            issue.status === "resolved"
                              ? "bg-emerald-100 text-emerald-800"
                              : issue.status === "in_progress"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-amber-100 text-amber-800"
                          }`}>
                            {issue.status}
                          </span>
                        </div>
                        <h4 className="font-bold text-xs sm:text-sm text-[#1A2420]">{issue.title}</h4>
                        <p className="text-xs text-[#5C6A64] line-clamp-2">{issue.description}</p>
                        {issue.official_response && (
                          <div className="text-[11px] p-2.5 rounded-xl bg-white border border-[#DDD5C5] text-[#194B35] mt-2">
                            <strong>Authority:</strong> {issue.official_response}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 6: Settings & Security */}
            {activeTab === "settings" && (
              <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 sm:p-8 shadow-2xs space-y-6">
                <h2 className="text-base font-bold text-[#194B35] border-b border-[#F3EFE6] pb-3">
                  Account Settings & Security
                </h2>

                <div className="space-y-6">
                  {/* Account Information Section */}
                  <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7] space-y-3">
                    <h4 className="font-bold text-xs sm:text-sm text-[#1A2420] flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#194B35]" />
                      <span>Account Information</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-2.5 bg-white rounded-xl border border-[#EDE6D8]">
                        <span className="text-[10px] text-[#5C6A64] block font-bold uppercase tracking-wider">User ID</span>
                        <code className="text-[11px] font-mono text-[#194B35] font-semibold break-all">{user?.id || "N/A"}</code>
                      </div>
                      <div className="p-2.5 bg-white rounded-xl border border-[#EDE6D8]">
                        <span className="text-[10px] text-[#5C6A64] block font-bold uppercase tracking-wider">Assigned Role</span>
                        <span className="font-bold text-[#194B35] uppercase">{user?.role || "citizen"}</span>
                      </div>
                      <div className="p-2.5 bg-white rounded-xl border border-[#EDE6D8]">
                        <span className="text-[10px] text-[#5C6A64] block font-bold uppercase tracking-wider">Account Status</span>
                        <span className={`inline-flex items-center gap-1 font-bold ${user?.account_status === "suspended" ? "text-red-600" : "text-emerald-700"}`}>
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{user?.account_status === "suspended" ? "Suspended" : "Active Citizen"}</span>
                        </span>
                      </div>
                      <div className="p-2.5 bg-white rounded-xl border border-[#EDE6D8]">
                        <span className="text-[10px] text-[#5C6A64] block font-bold uppercase tracking-wider">Email Verification</span>
                        <div className="flex items-center justify-between gap-1 mt-0.5">
                          <span className={user?.email_verified ? "text-emerald-700 font-bold" : "text-amber-700 font-bold"}>
                            {user?.email_verified ? "Verified" : "Pending Verification"}
                          </span>
                          {!user?.email_verified && (
                            <button
                              type="button"
                              onClick={async () => {
                                const res = await resendVerificationEmail();
                                setVerifyNotice(res.message || res.error || "Sent");
                                setTimeout(() => setVerifyNotice(null), 4000);
                              }}
                              className="text-[10px] text-[#194B35] font-bold underline hover:no-underline"
                            >
                              Resend Email
                            </button>
                          )}
                        </div>
                        {verifyNotice && (
                          <span className="text-[10px] text-emerald-800 block mt-1">{verifyNotice}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Notification Toggles */}
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7]">
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-[#1A2420]">Municipal Notifications</h4>
                      <p className="text-[11px] text-[#5C6A64]">Receive immediate notifications for local announcements, emergency alerts, and issue status changes.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                      className={`w-12 h-6 rounded-full transition relative p-0.5 ${
                        notificationsEnabled ? "bg-[#194B35]" : "bg-neutral-300"
                      }`}
                      aria-label="Toggle notifications"
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition shadow-sm transform ${
                        notificationsEnabled ? "translate-x-6" : "translate-x-0"
                      }`} />
                    </button>
                  </div>

                  {/* Change Password Form */}
                  <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7] space-y-3">
                    <h4 className="font-bold text-xs sm:text-sm text-[#1A2420] flex items-center gap-2">
                      <Lock className="w-4 h-4 text-[#194B35]" />
                      <span>Change Account Password</span>
                    </h4>
                    <p className="text-[11px] text-[#5C6A64]">
                      Update your account password with at least 8 characters.
                    </p>

                    {passwordStatus && (
                      <div className={`p-2.5 rounded-xl text-xs ${passwordStatus.type === "success" ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                        {passwordStatus.text}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <label className="block text-[11px] font-bold text-[#1A2420] mb-1">New Password</label>
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Min 8 characters"
                          className="w-full px-3 py-2 text-xs bg-white border border-[#EDE6D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#194B35]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-[#1A2420] mb-1">Confirm New Password</label>
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Re-enter password"
                          className="w-full px-3 py-2 text-xs bg-white border border-[#EDE6D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#194B35]"
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      disabled={isUpdatingPassword}
                      onClick={async () => {
                        setPasswordStatus(null);
                        if (newPassword.length < 8) {
                          setPasswordStatus({ type: "error", text: "Password must be at least 8 characters in length." });
                          return;
                        }
                        if (newPassword !== confirmPassword) {
                          setPasswordStatus({ type: "error", text: "Passwords do not match." });
                          return;
                        }
                        setIsUpdatingPassword(true);
                        const res = await updatePassword(newPassword);
                        setIsUpdatingPassword(false);
                        if (res.success) {
                          setPasswordStatus({ type: "success", text: "Password successfully updated!" });
                          setNewPassword("");
                          setConfirmPassword("");
                        } else {
                          setPasswordStatus({ type: "error", text: res.error || "Failed to update password." });
                        }
                      }}
                      className="px-4 py-2 rounded-xl bg-[#194B35] text-white text-xs font-bold hover:bg-[#133A29] transition active:scale-95 disabled:opacity-50"
                    >
                      {isUpdatingPassword ? "Updating..." : "Update Password"}
                    </button>
                  </div>

                  {/* Danger Zone: Account Deletion */}
                  <div className="p-4 rounded-2xl bg-red-50 border border-red-200 space-y-2">
                    <h4 className="font-bold text-xs sm:text-sm text-red-900 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span>Danger Zone: Account Deletion</span>
                    </h4>
                    <p className="text-[11px] text-red-700 leading-relaxed">
                      Deactivating your account will anonymize your personal credentials (name, email, phone). In accordance with statutory transparency standards, past submitted public civic reports and project notes remain preserved in the municipal record.
                    </p>
                    <button
                      type="button"
                      onClick={() => setDeleteModalOpen(true)}
                      className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition active:scale-95"
                    >
                      Request Account Deletion
                    </button>
                  </div>
                </div>

                {/* Account Deletion Modal */}
                {deleteModalOpen && (
                  <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-[#EDE6D8] shadow-2xl space-y-4">
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                        <Trash2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-[#1A2420]">Confirm Account Deletion</h3>
                        <p className="text-xs text-[#5C6A64] mt-1 leading-relaxed">
                          Are you sure you want to delete your citizen account? Your personal identity will be anonymized. Your public civic submissions will remain archived for municipal continuity.
                        </p>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#1A2420] mb-1">
                          Reason for leaving (Optional)
                        </label>
                        <textarea
                          rows={2}
                          value={deleteReason}
                          onChange={(e) => setDeleteReason(e.target.value)}
                          placeholder="Let us know how we can improve municipal services..."
                          className="w-full p-2.5 text-xs bg-[#FAF7F0] border border-[#EDE6D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setDeleteModalOpen(false)}
                          className="px-4 py-2 rounded-xl border border-[#EDE6D8] text-xs font-bold text-[#5C6A64] hover:bg-[#FAF7F0]"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          disabled={isDeleting}
                          onClick={async () => {
                            setIsDeleting(true);
                            await deleteAccount(deleteReason);
                            setIsDeleting(false);
                            setDeleteModalOpen(false);
                            window.location.href = "/";
                          }}
                          className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700"
                        >
                          {isDeleting ? "Deleting..." : "Permanently Deactivate Account"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Sidebar (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Links Card */}
            <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 shadow-2xs space-y-3">
              <h3 className="text-sm font-bold text-[#194B35] border-b border-[#F3EFE6] pb-2">
                Citizen Shortcuts
              </h3>
              <div className="flex flex-col gap-2">
                <Link
                  href="/civic-connect"
                  className="p-3 rounded-2xl bg-[#FAF7F0] hover:bg-[#F3EFE6] border border-[#EAE4D7] transition flex items-center justify-between text-xs font-bold text-[#1A2420]"
                >
                  <span className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-600" />
                    <span>Report a Civic Issue</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#7A8880]" />
                </Link>

                <Link
                  href="/public-services"
                  className="p-3 rounded-2xl bg-[#FAF7F0] hover:bg-[#F3EFE6] border border-[#EAE4D7] transition flex items-center justify-between text-xs font-bold text-[#1A2420]"
                >
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#C39A5B]" />
                    <span>Explore Public Services</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#7A8880]" />
                </Link>

                <Link
                  href="/saved"
                  className="p-3 rounded-2xl bg-[#FAF7F0] hover:bg-[#F3EFE6] border border-[#EAE4D7] transition flex items-center justify-between text-xs font-bold text-[#1A2420]"
                >
                  <span className="flex items-center gap-2">
                    <Bookmark className="w-4 h-4 text-emerald-600" />
                    <span>Saved Professionals ({mySavedPros.length})</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#7A8880]" />
                </Link>
              </div>
            </div>

            {/* Quick Stats Widget */}
            <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 shadow-2xs space-y-3">
              <h3 className="text-sm font-bold text-[#194B35] border-b border-[#F3EFE6] pb-2">
                Platform Statistics
              </h3>
              <div className="grid grid-cols-3 gap-2 text-center pt-1">
                <div className="p-2.5 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7]">
                  <span className="block text-lg font-bold font-mono text-[#194B35]">{savedArticles.length}</span>
                  <span className="text-[10px] text-[#7A8880]">Articles</span>
                </div>
                <div className="p-2.5 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7]">
                  <span className="block text-lg font-bold font-mono text-[#194B35]">{savedEvents.length}</span>
                  <span className="text-[10px] text-[#7A8880]">Events</span>
                </div>
                <div className="p-2.5 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7]">
                  <span className="block text-lg font-bold font-mono text-[#194B35]">{myIssues.length}</span>
                  <span className="text-[10px] text-[#7A8880]">Reports</span>
                </div>
              </div>
            </div>

            {/* Account Status & Verified Role Card */}
            <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 shadow-2xs space-y-3">
              <h3 className="text-sm font-bold text-[#194B35] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#194B35]" />
                <span>Account Role & Access Level</span>
              </h3>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-[#194B35] border border-emerald-200">
                  {role === "admin" 
                    ? "Administrator" 
                    : role === "moderator" 
                    ? "Moderator" 
                    : role === "verified_org" 
                    ? "Verified Organization" 
                    : "Citizen / Resident"}
                </span>
              </div>
              <p className="text-xs text-[#5C6A64] leading-relaxed">
                Account permissions are enforced under strict server-side RBAC policies. Elevated roles are provisioned exclusively through authorized municipal administrators.
              </p>
            </div>

            <div className="bg-[#FAF4E6] rounded-3xl border border-[#E8DCBF] p-6 shadow-2xs text-[#8C5B0F]">
              <h4 className="text-xs font-semibold tracking-normal mb-2">Municipal Data Security</h4>
              <p className="text-xs leading-relaxed">
                Your personal citizen records and contact info are securely encrypted. Privacy controls keep your phone number and email private from public view.
              </p>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
      <Footer />
    </div>
  );
}
