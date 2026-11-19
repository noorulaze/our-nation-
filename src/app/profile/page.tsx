"use client";

import React, { useState, useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/lib/i18n/context";
import { useCommunity } from "@/lib/community/context";
import { useAuth } from "@/lib/auth/context";
import { store } from "@/lib/data/store";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import Link from "next/link";
import { KERALA_NEWS_ARTICLES } from "@/lib/data/keralaNewsData";
import { KERALA_EVENTS_DATA } from "@/lib/data/keralaEventsData";
import { 
  User, 
  MapPin, 
  Globe, 
  ShieldCheck, 
  Save, 
  Trash2, 
  Plus, 
  CheckCircle2, 
  AlertCircle,
  Building,
  Heart,
  Calendar,
  AlertTriangle,
  ArrowRight,
  Bookmark,
  Bell,
  Settings,
  Clock,
  ExternalLink,
  Camera,
  Upload,
  Eye,
  EyeOff,
  Phone,
  Mail,
  Briefcase,
  Wrench,
  Check,
  X,
  Lock,
  ZoomIn,
  ZoomOut,
  Star,
  BarChart3
} from "lucide-react";

export default function ProfilePage() {
  const { t, language, setLanguage } = useLanguage();
  const { user, role, updateProfile, logout } = useAuth();
  const { availableCommunities, currentCommunity, setCurrentCommunity } = useCommunity();

  const [activeTab, setActiveTab] = useState<"info" | "privacy" | "saved_articles" | "saved_events" | "civic" | "settings">("info");
  const [savedArticles, setSavedArticles] = useState(KERALA_NEWS_ARTICLES.slice(0, 3));
  const [savedEvents, setSavedEvents] = useState(KERALA_EVENTS_DATA.slice(0, 2));

  // Form Fields
  const [displayName, setDisplayName] = useState(user?.display_name || "വിഷ്ണു പ്രസാദ് (Vishnu Prasad)");
  const [bio, setBio] = useState(user?.bio || "കേരളത്തിന്റെ പാരമ്പര്യത്തിലും പ്രാദേശിക വികസനത്തിലും താൽപ്പര്യമുള്ള ഒരു സജീവ നാട്ടുവാസി.");
  const [phone, setPhone] = useState(user?.phone || "+91 98470 11223");
  const [locality, setLocality] = useState(user?.locality || "Tanur Municipality");
  const [preferredLang, setPreferredLang] = useState<"ml" | "en">(user?.preferred_language || "ml");
  const [selectedCommId, setSelectedCommId] = useState(user?.selected_community_id || "40000000-0000-0000-0000-000000000007");
  const [interests, setInterests] = useState<string[]>(user?.interests || ["Civic Tech", "Kerala History", "Environment", "സാഹിത്യം", "കൃഷി"]);
  const [newInterestInput, setNewInterestInput] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  // Privacy Settings
  const [privacySettings, setPrivacySettings] = useState(user?.privacy_settings || {
    public_profile: true,
    show_phone: false,
    show_email: false,
    show_address: true,
  });

  // Avatar Management & Crop Modal
  const [avatarUrl, setAvatarUrl] = useState<string | null>(user?.avatar_url || null);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [tempImageSrc, setTempImageSrc] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Check if current user is also registered as a professional
  const existingPro = user ? store.getProfessionalByUserId(user.id) : undefined;
  const myIssues = store.getIssueReports(undefined, user?.id);
  const mySavedPros = user ? store.getSavedProfessionals(user.id) : [];

  // Context-aware Dashboard Persona State (Section 4)
  const [dashboardPersona, setDashboardPersona] = useState<"resident" | "professional" | "moderator" | "admin">(
    role === "admin" ? "admin" : role === "moderator" ? "moderator" : existingPro ? "professional" : "resident"
  );

  const myBookings = user ? (existingPro ? store.getBookings({ professionalId: existingPro.id }) : store.getBookings({ customerId: user.id })) : [];
  const proReviews = existingPro ? store.getReviews(existingPro.id) : [];
  const moderationReports = store.getModerationReports();
  const verificationStats = store.getVerificationStats();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({
      display_name: displayName,
      bio,
      phone,
      locality,
      preferred_language: preferredLang,
      selected_community_id: selectedCommId || null,
      interests,
      avatar_url: avatarUrl,
      privacy_settings: privacySettings,
    });
    setLanguage(preferredLang);
    if (selectedCommId) {
      const comm = availableCommunities.find((c) => c.id === selectedCommId);
      if (comm) setCurrentCommunity(comm);
    }
    setSaveMessage("പ്രൊഫൈൽ വിവരങ്ങൾ വിജയകരമായി സേവ് ചെയ്തു! (Profile updated successfully)");
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
      alert("JPEG, PNG അല്ലെങ്കിൽ WebP ഫോർമാറ്റിലുള്ള ചിത്രങ്ങൾ മാത്രം അപ്‌ലോഡ് ചെയ്യുക.");
      return;
    }

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("ഫയൽ സൈസ് 5MB യിൽ കുറവായിരിക്കണം.");
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
    if (confirm("പ്രൊഫൈൽ ചിത്രം ഒഴിവാക്കാൻ നിങ്ങൾ ആഗ്രഹിക്കുന്നുണ്ടോ?")) {
      setAvatarUrl(null);
      updateProfile({ avatar_url: null });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: "പ്രൊഫൈൽ (Profile)" }]} className="mb-4" />

        {/* CONTEXT-AWARE PERSONA SELECTOR (SECTION 4) */}
        <div className="bg-[#FAF4E6] rounded-2xl border border-[#E8DCBF] p-3 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-[#1B4D36] text-amber-300 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <div>
              <span className="text-[10px] font-bold text-[#8C5B0F] uppercase tracking-wider block">
                {language === "ml" ? "സന്ദർഭോചിത ഡാഷ്‌ബോർഡ് (Context-Aware Dashboard)" : "Context-Aware Dashboard"}
              </span>
              <p className="text-xs font-bold text-[#1B4D36]">
                {dashboardPersona === "resident" && "റസിഡന്റ് ഡാഷ്‌ബോർഡ് — നാട്ടുവാസി വ്യക്തിഗത കേന്ദ്രം"}
                {dashboardPersona === "professional" && "പ്രൊഫഷണൽ സർവീസ് ഡാഷ്‌ബോർഡ് — സേവന ദാതാവ്"}
                {dashboardPersona === "moderator" && "മോഡറേഷൻ വർക്ക്‌സ്‌പേസ് — റിപ്പോർട്ടുകൾ & പരിശോധന"}
                {dashboardPersona === "admin" && "അഡ്മിനിസ്ട്രേറ്റർ കൺസോൾ — പ്ലാറ്റ്‌ഫോം അവലോകനം"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 shrink-0">
            {[
              { id: "resident", label: "റസിഡന്റ് (Resident)", icon: User },
              { id: "professional", label: "പ്രൊഫഷണൽ (Pro)", icon: Wrench },
              { id: "moderator", label: "മോഡറേറ്റർ (Mod)", icon: ShieldCheck },
              { id: "admin", label: "അഡ്മിൻ (Admin)", icon: Settings },
            ].map((p) => {
              const Icon = p.icon;
              const isSelected = dashboardPersona === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setDashboardPersona(p.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap active:scale-95 ${
                    isSelected
                      ? "bg-[#1B4D36] text-white shadow-xs"
                      : "bg-white text-[#5C6A64] hover:bg-[#F3EFE6] border border-[#DDD5C5]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{p.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Profile Card Header */}
        <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 sm:p-8 mb-6 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative group">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={displayName}
                  className="w-20 h-20 rounded-full object-cover border-4 border-[#FAF7F0] shadow-md"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#1B4D36] to-[#123826] text-amber-200 font-bold text-3xl flex items-center justify-center border-4 border-[#FAF7F0] shadow-md">
                  {displayName ? displayName.charAt(0) : "U"}
                </div>
              )}
              
              {/* Photo change overlay button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                title="ചിത്രം മാറ്റുക (Change Photo)"
                aria-label="ചിത്രം മാറ്റുക (Change Photo)"
                className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200 text-white cursor-pointer"
              >
                <Camera className="w-6 h-6" />
              </button>
              
              <span className="absolute bottom-0 right-0 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
            
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold font-malayalam-serif text-[#1B4D36]">
                  {displayName}
                </h1>
                <span className={`text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full ${
                  role === "admin"
                    ? "bg-purple-100 text-purple-800 border border-purple-200"
                    : role === "moderator"
                    ? "bg-blue-100 text-blue-800 border border-blue-200"
                    : role === "verified_org"
                    ? "bg-amber-100 text-amber-800 border border-amber-200"
                    : "bg-[#E0F1E7] text-[#1B4D36] border border-[#BDE3CE]"
                }`}>
                  {role}
                </span>

                {existingPro && (
                  <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                    <Wrench className="w-3 h-3 text-[#B87A1E]" />
                    <span>സർവീസ് പ്രൊവൈഡർ</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-[#7A8880] mt-1 flex items-center gap-2 flex-wrap">
                <span>@{user?.username || "vishnu_kerala"}</span>
                <span>•</span>
                <span>{user?.email || "vishnu.prasad@example.com"}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-[#1B4D36] font-semibold">
                  <MapPin className="w-3.5 h-3.5" />
                  {locality || currentCommunity?.name || "Tanur Municipality"}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end flex-wrap">
            <Link
              href={`/people/${user?.username || "admin_nammude"}`}
              className="px-4 py-2 rounded-xl text-xs font-bold text-[#1B4D36] bg-[#FAF7F0] hover:bg-[#F3EFE6] transition border border-[#DDD5C5] shadow-xs flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>പബ്ലിക് പ്രൊഫൈൽ കാണുക</span>
            </Link>
            <button
              onClick={() => logout()}
              className="px-4 py-2 rounded-xl text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 transition border border-red-200 shadow-xs active:scale-95"
            >
              {t("navLogout")}
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
                <h3 className="font-bold text-sm text-[#1B4D36] font-malayalam-serif">
                  പ്രൊഫൈൽ ചിത്രം ക്രമീകരിക്കുക (Adjust Photo)
                </h3>
                <button
                  onClick={() => setCropModalOpen(false)}
                  className="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-neutral-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Circle Viewport Preview */}
              <div className="relative w-56 h-56 mx-auto rounded-full overflow-hidden border-4 border-[#1B4D36] bg-neutral-900 flex items-center justify-center shadow-inner">
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
                  className="p-2 rounded-xl bg-[#FAF7F0] border border-[#DDD5C5] text-[#1B4D36]"
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
                  className="w-40 accent-[#1B4D36]"
                />
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.1))}
                  className="p-2 rounded-xl bg-[#FAF7F0] border border-[#DDD5C5] text-[#1B4D36]"
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
                  റദ്ദാക്കുക
                </button>
                <button
                  type="button"
                  onClick={handleApplyCroppedAvatar}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#1B4D36] hover:bg-[#143B29] transition shadow-xs flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>ചിത്രം സേവ് ചെയ്യുക</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* RESIDENT PERSONA DASHBOARD (SECTION 4) */}
        {dashboardPersona === "resident" && (
          <>
            {/* BECOME A SERVICE PROVIDER CTA BANNER */}
            <div className="bg-gradient-to-r from-[#1B4D36] via-[#16432E] to-[#0F2D1F] rounded-3xl p-6 sm:p-7 text-white shadow-lg mb-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(#E8C547_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 relative z-10">
            <div className="space-y-1.5 max-w-xl">
              <span className="inline-block px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-bold uppercase tracking-wider border border-amber-400/30">
                {existingPro ? "പ്രൊഫഷണൽ സർവീസ് പാർട്ണർ" : "പ്രാദേശിക സേവന ദാതാവാകൂ (Become a Provider)"}
              </span>
              <h2 className="text-lg sm:text-xl font-bold font-malayalam-serif">
                {existingPro 
                  ? `${existingPro.business_name || existingPro.display_name} — സേവന അക്കൗണ്ട് സജീവമാണ്`
                  : "താനൂരിലും മലപ്പുറത്തും നിങ്ങളുടെ തൊഴിൽ വൈദഗ്ധ്യം സേവനമാക്കൂ"}
              </h2>
              <p className="text-xs text-white/80 leading-relaxed">
                {existingPro
                  ? `വിഭാഗം: ${existingPro.category_name_ml || existingPro.category_name} • റേറ്റിംഗ്: ⭐ ${existingPro.rating} (${existingPro.reviews_count} അവലോകനങ്ങൾ)`
                  : "ഇലക്ട്രീഷ്യൻ, പ്ലംബർ, തച്ചൻ, എസി റിപ്പയർ, ഹോം നഴ്സിംഗ് തുടങ്ങി 18 വിഭാഗങ്ങളിൽ നാട്ടുകാർക്ക് നിങ്ങളുടെ സേവനം ലഭ്യമാക്കാം."}
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-2.5">
              {existingPro ? (
                <div className="flex items-center gap-2">
                  <Link
                    href={`/professionals/${existingPro.username}`}
                    className="px-4 py-2.5 rounded-xl bg-white text-[#1B4D36] text-xs font-bold hover:bg-neutral-100 transition shadow-md flex items-center gap-1.5"
                  >
                    <span>പ്രൊഫൈൽ പേജ്</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/dashboard/bookings"
                    className="px-4 py-2.5 rounded-xl bg-amber-400 text-[#1B4D36] text-xs font-bold hover:bg-amber-300 transition shadow-md flex items-center gap-1.5"
                  >
                    <span>ബുക്കിംഗ് ഡാഷ്‌ബോർഡ്</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ) : (
                <Link
                  href="/professionals/onboarding"
                  className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-[#1B4D36] text-xs sm:text-sm font-bold transition shadow-md flex items-center gap-2 active:scale-95"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>ഇപ്പോൾ രജിസ്റ്റർ ചെയ്യുക (Register Free)</span>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none border-b border-[#EAE4D7]">
          {[
            { id: "info", label: "അക്കൗണ്ട് വിവരങ്ങൾ (Account Info)", icon: User },
            { id: "privacy", label: "സ്വകാര്യത & പബ്ലിക് പ്രൊഫൈൽ (Privacy)", icon: Lock },
            { id: "saved_articles", label: `സൂക്ഷിച്ച വാർത്തകൾ (${savedArticles.length})`, icon: Bookmark },
            { id: "saved_events", label: `സൂക്ഷിച്ച പരിപാടികൾ (${savedEvents.length})`, icon: Calendar },
            { id: "civic", label: `പരാതികൾ (${myIssues.length})`, icon: AlertTriangle },
            { id: "settings", label: "സെറ്റിംഗ്സ് (Settings)", icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap shadow-xs active:scale-95 ${
                  isActive
                    ? "bg-[#1B4D36] text-white"
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
          <div className="mb-6 p-4 rounded-2xl bg-[#1B4D36] text-white text-xs font-semibold flex items-center gap-2 shadow-md animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-amber-300" />
            <span>{saveMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Tab Area (8 Cols) */}
          <div className="lg:col-span-8">
            
            {/* TAB 1: Account Information Form */}
            {activeTab === "info" && (
              <form onSubmit={handleSave} className="bg-white rounded-3xl border border-[#EAE4D7] p-6 sm:p-8 shadow-card space-y-5">
                <div className="flex items-center justify-between border-b border-[#F3EFE6] pb-3">
                  <h2 className="text-base font-bold font-malayalam-serif text-[#1B4D36]">
                    വ്യക്തിഗത വിവരങ്ങൾ എഡിറ്റ് ചെയ്യുക
                  </h2>
                  <span className="text-[11px] text-[#7A8880]">Edit Personal Profile</span>
                </div>

                {/* Photo Management Section */}
                <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt={displayName}
                        className="w-16 h-16 rounded-full object-cover border-2 border-[#1B4D36]"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-[#1B4D36] text-amber-200 font-bold text-2xl flex items-center justify-center">
                        {displayName ? displayName.charAt(0) : "U"}
                      </div>
                    )}
                    <div>
                      <h4 className="text-xs font-bold text-[#1A2420]">പ്രൊഫൈൽ ചിത്രം (Profile Photo)</h4>
                      <p className="text-[11px] text-[#7A8880]">JPG, PNG അല്ലെങ്കിൽ WebP (പരമാവധി 5MB)</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3.5 py-2 rounded-xl bg-white border border-[#DDD5C5] text-xs font-bold text-[#1B4D36] hover:bg-[#F3EFE6] transition flex items-center gap-1.5"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>ചിത്രം മാറ്റുക</span>
                    </button>
                    {avatarUrl && (
                      <button
                        type="button"
                        onClick={handleRemoveAvatar}
                        className="p-2 rounded-xl bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 transition"
                        title="ചിത്രം ഒഴിവാക്കുക"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1A2420] mb-1">
                      പ്രദർശിപ്പിക്കേണ്ട പേര് (Display Name)
                    </label>
                    <input
                      type="text"
                      required
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-none focus:ring-2 focus:ring-[#1B4D36]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A2420] mb-1">
                      ഇമെയിൽ വിലാസം (Email)
                    </label>
                    <input
                      type="email"
                      disabled
                      value={user?.email || "admin@nammudenaadu.in"}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#F3EFE6] text-[#7A8880] cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1A2420] mb-1">
                      ഫോൺ നമ്പർ (Phone / WhatsApp)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98470 11223"
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-none focus:ring-2 focus:ring-[#1B4D36]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A2420] mb-1">
                      പ്രദേശം (Locality within Malappuram)
                    </label>
                    <select
                      value={locality}
                      onChange={(e) => setLocality(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                    >
                      <option value="Tanur Municipality">താനൂർ നഗരസഭ (Tanur Municipality)</option>
                      <option value="Tanur Beach Ward">താനൂർ ബീച്ച് വാർഡ് (Tanur Beach)</option>
                      <option value="Rayirimangalam, Tanur">റയിരിമംഗലം, താനൂർ (Rayirimangalam)</option>
                      <option value="Kettungal, Tanur">കെട്ടുങ്ങൽ, താനൂർ (Kettungal)</option>
                      <option value="Meenadathur, Tanur">മീനടത്തൂർ, താനൂർ (Meenadathur)</option>
                      <option value="Tirur">തിരൂർ (Tirur)</option>
                      <option value="Kottakkal">കോട്ടക്കൽ (Kottakkal)</option>
                      <option value="Ponnani">പൊന്നാനി (Ponnani)</option>
                      <option value="Parappanangadi">പരപ്പനങ്ങാടി (Parappanangadi)</option>
                      <option value="Malappuram Town">മലപ്പുറം ടൗൺ (Malappuram Town)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1A2420] mb-1">
                    പരിചയപ്പെടുത്തൽ (Bio)
                  </label>
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="നിങ്ങളെക്കുറിച്ചുള്ള ലഘു വിവരണം..."
                    className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-none focus:ring-2 focus:ring-[#1B4D36] resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1A2420] mb-1">
                      മുൻഗണനാ ഭാഷ (Language)
                    </label>
                    <select
                      value={preferredLang}
                      onChange={(e) => setPreferredLang(e.target.value as any)}
                      className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                    >
                      <option value="ml">മലയാളം (Malayalam)</option>
                      <option value="en">English</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A2420] mb-1">
                      കമ്മ്യൂണിറ്റി (Community)
                    </label>
                    <select
                      value={selectedCommId}
                      onChange={(e) => setSelectedCommId(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                    >
                      {availableCommunities.map((c) => (
                        <option key={c.id} value={c.id}>
                          {language === "ml" ? c.name_ml : c.name} ({c.district})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Interests tag pills */}
                <div>
                  <label className="block text-xs font-bold text-[#1A2420] mb-2">
                    താൽപ്പര്യമുള്ള വിഷയങ്ങൾ (Interests)
                  </label>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {interests.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-[#E0F1E7] text-[#1B4D36] text-xs font-semibold flex items-center gap-1.5 border border-[#BDE3CE]"
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
                      placeholder="പുതിയ താല്പര്യം ചേർക്കുക (ഉദാ: കൃഷി, സാഹിത്യം)..."
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
                      className="px-4 py-2 rounded-xl bg-[#FAF7F0] hover:bg-[#EAE4D7] border border-[#DDD5C5] text-xs font-bold text-[#1B4D36]"
                    >
                      ചേർക്കൂ
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#1B4D36] hover:bg-[#133A28] text-white font-bold text-xs transition active:scale-95 shadow-sm flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>സേവ് ചെയ്യുക (Save Profile)</span>
                  </button>
                </div>
              </form>
            )}

            {/* TAB 2: Privacy Settings & Public Profile Visibility */}
            {activeTab === "privacy" && (
              <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 sm:p-8 shadow-card space-y-6">
                <div className="flex items-center justify-between border-b border-[#F3EFE6] pb-3">
                  <h2 className="text-base font-bold font-malayalam-serif text-[#1B4D36] flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#B87A1E]" />
                    <span>സ്വകാര്യതാ ക്രമീകരണങ്ങൾ (Privacy Controls)</span>
                  </h2>
                  <Link
                    href={`/people/${user?.username || "admin_nammude"}`}
                    target="_blank"
                    className="text-xs font-bold text-[#1B4D36] hover:underline flex items-center gap-1"
                  >
                    <span>പബ്ലിക് പ്രൊഫൈൽ എങ്ങനെ കാണുന്നു?</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>

                <p className="text-xs text-[#5C6A64] leading-relaxed">
                  നിങ്ങളുടെ വ്യക്തിഗത സുരക്ഷ ഉറപ്പാക്കുന്നതിനായി പബ്ലിക് പ്രൊഫൈലിൽ ഏതൊക്കെ വിവരങ്ങൾ മറ്റുള്ളവർക്ക് കാണാം എന്നത് താഴെ തിരഞ്ഞെടുക്കാം:
                </p>

                <div className="space-y-4">
                  {/* Public Profile Enabled */}
                  <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7] flex items-center justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-[#1A2420]">പബ്ലിക് പ്രൊഫൈൽ സജീവമാക്കുക</h4>
                      <p className="text-[11px] text-[#7A8880]">മറ്റു കമ്മ്യൂണിറ്റി അംഗങ്ങൾക്ക് നിങ്ങളുടെ പേരും താല്പര്യങ്ങളും കാണാൻ അനുവദിക്കുക</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPrivacySettings(p => ({ ...p, public_profile: !p.public_profile }))}
                      className={`w-12 h-6 rounded-full transition relative p-0.5 ${
                        privacySettings.public_profile ? "bg-[#1B4D36]" : "bg-neutral-300"
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
                        <Phone className="w-3.5 h-3.5 text-[#1B4D36]" />
                        <span>ഫോൺ നമ്പർ പബ്ലിക് പ്രൊഫൈലിൽ കാണിക്കുക</span>
                      </h4>
                      <p className="text-[11px] text-[#7A8880]">ഓഫ് ചെയ്തിട്ടാൽ, ബുക്കിംഗ് സ്ഥിരീകരിച്ച സേവന ദാതാക്കൾക്ക് മാത്രമേ കാണാൻ സാധിക്കൂ</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPrivacySettings(p => ({ ...p, show_phone: !p.show_phone }))}
                      className={`w-12 h-6 rounded-full transition relative p-0.5 ${
                        privacySettings.show_phone ? "bg-[#1B4D36]" : "bg-neutral-300"
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
                        <Mail className="w-3.5 h-3.5 text-[#1B4D36]" />
                        <span>ഇമെയിൽ വിലാസം പബ്ലിക് പ്രൊഫൈലിൽ കാണിക്കുക</span>
                      </h4>
                      <p className="text-[11px] text-[#7A8880]">സാധാരണ ഉപയോക്താക്കൾക്ക് നിങ്ങളുടെ ഇമെയിൽ ദൃശ്യമാക്കണോ എന്ന് തീരുമാനിക്കുക</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPrivacySettings(p => ({ ...p, show_email: !p.show_email }))}
                      className={`w-12 h-6 rounded-full transition relative p-0.5 ${
                        privacySettings.show_email ? "bg-[#1B4D36]" : "bg-neutral-300"
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
                        <MapPin className="w-3.5 h-3.5 text-[#1B4D36]" />
                        <span>പ്രദേശം / വാർഡ് കാണിക്കുക</span>
                      </h4>
                      <p className="text-[11px] text-[#7A8880]">നിങ്ങൾ ഉൾപ്പെടുന്ന വാർഡ് / മുൻസിപ്പാലിറ്റി വിവരങ്ങൾ പബ്ലിക് പ്രൊഫൈലിൽ പ്രദർശിപ്പിക്കുക</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPrivacySettings(p => ({ ...p, show_address: !p.show_address }))}
                      className={`w-12 h-6 rounded-full transition relative p-0.5 ${
                        privacySettings.show_address ? "bg-[#1B4D36]" : "bg-neutral-300"
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
                      setSaveMessage("സ്വകാര്യതാ ക്രമീകരണങ്ങൾ സേവ് ചെയ്തു!");
                      setIsSaved(true);
                      setTimeout(() => setIsSaved(false), 3000);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-[#1B4D36] hover:bg-[#133A28] text-white font-bold text-xs transition active:scale-95 shadow-sm flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>സേവ് ചെയ്യുക</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: Saved Articles */}
            {activeTab === "saved_articles" && (
              <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 sm:p-8 shadow-card space-y-4">
                <div className="flex items-center justify-between border-b border-[#F3EFE6] pb-3">
                  <h2 className="text-base font-bold font-malayalam-serif text-[#1B4D36] flex items-center gap-2">
                    <Bookmark className="w-4 h-4 text-[#B87A1E]" />
                    <span>സൂക്ഷിച്ച വാർത്തകൾ ({savedArticles.length})</span>
                  </h2>
                  <Link href="/news" className="text-xs font-bold text-[#1B4D36] hover:underline flex items-center gap-1">
                    <span>കൂടുതൽ വാർത്തകൾ</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                {savedArticles.length === 0 ? (
                  <div className="py-12 text-center text-[#7A8880] space-y-3">
                    <Bookmark className="w-8 h-8 mx-auto text-[#DDD5C5]" />
                    <p className="text-xs">നിങ്ങൾ ഇതുവരെ വാർത്തകൾ ഒന്നും സൂക്ഷിച്ചുവെച്ചിട്ടില്ല.</p>
                    <Link href="/news" className="inline-block px-4 py-2 bg-[#1B4D36] text-white text-xs font-bold rounded-xl">
                      വാർത്തകൾ വായിക്കൂ
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {savedArticles.map((article) => (
                      <div
                        key={article.id}
                        className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7] flex flex-col sm:flex-row gap-4 items-start hover:border-[#1B4D36]/40 transition group"
                      >
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          className="w-full sm:w-32 h-24 rounded-xl object-cover shrink-0 bg-[#E5DDD0]"
                        />
                        <div className="flex-1 space-y-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#B87A1E]">
                            {article.category}
                          </span>
                          <h4 className="font-bold text-xs sm:text-sm text-[#1A2420] group-hover:text-[#1B4D36] transition line-clamp-2">
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
              <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 sm:p-8 shadow-card space-y-4">
                <div className="flex items-center justify-between border-b border-[#F3EFE6] pb-3">
                  <h2 className="text-base font-bold font-malayalam-serif text-[#1B4D36] flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#B87A1E]" />
                    <span>സൂക്ഷിച്ച പരിപാടികൾ ({savedEvents.length})</span>
                  </h2>
                  <Link href="/events" className="text-xs font-bold text-[#1B4D36] hover:underline flex items-center gap-1">
                    <span>കൂടുതൽ പരിപാടികൾ</span>
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
                        <span className="text-[10px] font-bold text-[#1B4D36] bg-[#E0F1E7] px-2 py-0.5 rounded-md">
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
                        className="px-3.5 py-2 rounded-xl bg-white border border-[#DDD5C5] text-xs font-bold text-[#1B4D36] hover:bg-[#F3EFE6] transition"
                      >
                        വിശദാംശങ്ങൾ
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: Civic Issues */}
            {activeTab === "civic" && (
              <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 sm:p-8 shadow-card space-y-4">
                <div className="flex items-center justify-between border-b border-[#F3EFE6] pb-3">
                  <h2 className="text-base font-bold font-malayalam-serif text-[#1B4D36] flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>ഞാൻ റിപ്പോർട്ട് ചെയ്ത പരാതികൾ ({myIssues.length})</span>
                  </h2>
                  <Link href="/tanur" className="text-xs font-bold text-[#1B4D36] hover:underline flex items-center gap-1">
                    <span>പുതിയ പ്രശ്നം അറിയിക്കൂ</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                {myIssues.length === 0 ? (
                  <div className="py-12 text-center text-[#7A8880] space-y-2">
                    <p className="text-xs">നിങ്ങൾ ഇതുവരെ പരാതികളൊന്നും സമർപ്പിച്ചിട്ടില്ല.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {myIssues.map((issue) => (
                      <div
                        key={issue.id}
                        className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7] space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#B87A1E]">
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
                          <div className="text-[11px] p-2.5 rounded-xl bg-white border border-[#DDD5C5] text-[#1B4D36] mt-2">
                            <strong>അധികൃതർ:</strong> {issue.official_response}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 6: Settings */}
            {activeTab === "settings" && (
              <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 sm:p-8 shadow-card space-y-6">
                <h2 className="text-base font-bold font-malayalam-serif text-[#1B4D36] border-b border-[#F3EFE6] pb-3">
                  അക്കൗണ്ട് സെറ്റിംഗ്സ് (Account Settings)
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7]">
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-[#1A2420]">അറിയിപ്പുകൾ (Notifications)</h4>
                      <p className="text-[11px] text-[#7A8880]">പ്രാദേശിക വാർത്തകളും അടിയന്തിര അറിയിപ്പുകളും ലഭ്യമാക്കുക</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                      className={`w-12 h-6 rounded-full transition relative p-0.5 ${
                        notificationsEnabled ? "bg-[#1B4D36]" : "bg-neutral-300"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition shadow-sm transform ${
                        notificationsEnabled ? "translate-x-6" : "translate-x-0"
                      }`} />
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7] space-y-2">
                    <h4 className="font-bold text-xs sm:text-sm text-[#1A2420]">സുരക്ഷയും പാസ്‌വേഡും</h4>
                    <p className="text-[11px] text-[#7A8880]">അവസാനം മാറ്റിയത്: 1 മാസം മുൻപ്</p>
                    <button
                      type="button"
                      className="px-4 py-2 rounded-xl bg-white border border-[#DDD5C5] text-xs font-bold text-[#1B4D36] hover:bg-[#F3EFE6] transition"
                    >
                      പാസ്‌വേഡ് മാറ്റുക
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl bg-red-50 border border-red-200 space-y-2">
                    <h4 className="font-bold text-xs sm:text-sm text-red-900">ഡെയ്ഞ്ചർ സോൺ</h4>
                    <p className="text-[11px] text-red-700">അക്കൗണ്ട് നിർജ്ജീവമാക്കുകയോ പൂർണ്ണമായി ഒഴിവാക്കുകയോ ചെയ്യാം.</p>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm("അക്കൗണ്ട് ഒഴിവാക്കാൻ നിങ്ങൾ ആഗ്രഹിക്കുന്നുണ്ടോ?")) {
                          logout();
                        }
                      }}
                      className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition"
                    >
                      അക്കൗണ്ട് ഒഴിവാക്കുക (Delete Account)
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Right Sidebar (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Links Card */}
            <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 shadow-card space-y-3">
              <h3 className="text-sm font-bold font-malayalam-serif text-[#1B4D36] border-b border-[#F3EFE6] pb-2">
                സേവന കേന്ദ്രം (Service Shortcuts)
              </h3>
              <div className="flex flex-col gap-2">
                <Link
                  href="/professionals"
                  className="p-3 rounded-2xl bg-[#FAF7F0] hover:bg-[#F3EFE6] border border-[#EAE4D7] transition flex items-center justify-between text-xs font-bold text-[#1A2420]"
                >
                  <span className="flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-[#1B4D36]" />
                    <span>സേവന വിദഗ്ദ്ധരെ കണ്ടെത്തുക</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#7A8880]" />
                </Link>

                <Link
                  href="/dashboard/bookings"
                  className="p-3 rounded-2xl bg-[#FAF7F0] hover:bg-[#F3EFE6] border border-[#EAE4D7] transition flex items-center justify-between text-xs font-bold text-[#1A2420]"
                >
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#B87A1E]" />
                    <span>എന്റെ ബുക്കിംഗുകൾ</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#7A8880]" />
                </Link>

                <Link
                  href="/saved"
                  className="p-3 rounded-2xl bg-[#FAF7F0] hover:bg-[#F3EFE6] border border-[#EAE4D7] transition flex items-center justify-between text-xs font-bold text-[#1A2420]"
                >
                  <span className="flex items-center gap-2">
                    <Bookmark className="w-4 h-4 text-emerald-600" />
                    <span>സേവ് ചെയ്ത വിദഗ്ദ്ധർ ({mySavedPros.length})</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#7A8880]" />
                </Link>
              </div>
            </div>

            {/* Quick Stats Widget */}
            <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 shadow-card space-y-3">
              <h3 className="text-sm font-bold font-malayalam-serif text-[#1B4D36] border-b border-[#F3EFE6] pb-2">
                പ്ലാറ്റ്‌ഫോം സ്ഥിതിവിവരങ്ങൾ
              </h3>
              <div className="grid grid-cols-3 gap-2 text-center pt-1">
                <div className="p-2.5 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7]">
                  <span className="block text-lg font-bold font-mono text-[#1B4D36]">{savedArticles.length}</span>
                  <span className="text-[10px] text-[#7A8880]">വാർത്തകൾ</span>
                </div>
                <div className="p-2.5 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7]">
                  <span className="block text-lg font-bold font-mono text-[#1B4D36]">{savedEvents.length}</span>
                  <span className="text-[10px] text-[#7A8880]">പരിപാടികൾ</span>
                </div>
                <div className="p-2.5 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7]">
                  <span className="block text-lg font-bold font-mono text-[#1B4D36]">{myIssues.length}</span>
                  <span className="text-[10px] text-[#7A8880]">പരാതികൾ</span>
                </div>
              </div>
            </div>

            {/* Account Status & Verified Role Card */}
            <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 shadow-card space-y-3">
              <h3 className="text-sm font-bold font-malayalam-serif text-[#1B4D36] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#1B4D36]" />
                <span>{language === "ml" ? "അക്കൗണ്ട് പദവി (Account Role)" : "Account Role & Access Level"}</span>
              </h3>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-[#1B4D36] border border-emerald-200">
                  {role === "admin" 
                    ? (language === "ml" ? "അഡ്മിനിസ്ട്രേറ്റർ (Admin)" : "Administrator") 
                    : role === "moderator" 
                    ? (language === "ml" ? "മോഡറേറ്റർ (Moderator)" : "Moderator") 
                    : role === "verified_org" 
                    ? (language === "ml" ? "സ്ഥിരീകരിച്ച സ്ഥാപനം (Verified Org)" : "Verified Organization") 
                    : (language === "ml" ? "സാധാരണ പൗരൻ (Citizen)" : "Citizen / Resident")}
                </span>
              </div>
              <p className="text-xs text-[#5C6A64] leading-relaxed">
                {language === "ml" 
                  ? "റോളുകൾ സുരക്ഷിതമായ ആക്‌സസ്സ് കൺട്രോൾ പോളിസികൾ പ്രകാരമാണ് നിയന്ത്രിക്കുന്നത്. ഉയർന്ന അധികാരം താനൂർ നഗരസഭാ അഡ്മിനിസ്ട്രേറ്റർമാർ വഴി മാത്രമേ ലഭ്യമാകൂ."
                  : "Account permissions are enforced under strict server-side RBAC policies. Elevated roles are provisioned exclusively through authorized municipal administrators."}
              </p>
            </div>

            <div className="bg-[#FAF4E6] rounded-3xl border border-[#E8DCBF] p-6 shadow-card text-[#8C5B0F]">
              <h4 className="text-xs font-semibold font-malayalam tracking-normal mb-2">നമ്മുടെ നാട് സുരക്ഷ</h4>
              <p className="text-xs leading-relaxed">
                നിങ്ങളുടെ വിവരങ്ങൾ സുരക്ഷിതമായി സൂക്ഷിക്കപ്പെടുന്നു. സ്വകാര്യതാ ക്രമീകരണങ്ങൾ വഴി നിങ്ങളുടെ ഫോൺ നമ്പറും വിലാസവും സംരക്ഷിക്കാം.
              </p>
            </div>
          </div>

        </div>
          </>
        )}

        {/* ============================================================== */}
        {/* PROFESSIONAL PERSONA DASHBOARD (SECTION 4) */}
        {/* ============================================================== */}
        {dashboardPersona === "professional" && (
          <div className="space-y-6">
            {existingPro ? (
              <div className="space-y-6">
                {/* Pro Hero Summary Card */}
                <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={existingPro.avatar_url || "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&auto=format&fit=crop&q=80"}
                      alt={existingPro.display_name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-[#1B4D36]"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-base text-[#1A2420] font-malayalam-serif">{existingPro.display_name}</h3>
                        {existingPro.is_verified && <ShieldCheck className="w-4 h-4 text-emerald-600" />}
                      </div>
                      <p className="text-xs text-[#8C5B0F] font-semibold">{existingPro.category_name_ml || existingPro.category_name}</p>
                      <div className="flex items-center gap-3 text-xs text-[#7A8880] mt-1">
                        <span>⭐ {existingPro.rating.toFixed(1)} ({existingPro.reviews_count} അവലോകനങ്ങൾ)</span>
                        <span>•</span>
                        <span>പരിചയം: {existingPro.experience_years} വർഷം</span>
                        <span>•</span>
                        <span>📍 {existingPro.locality || "Tanur"}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/professionals/${existingPro.username}`}
                      className="px-4 py-2 rounded-xl bg-[#FAF7F0] border border-[#DDD5C5] text-xs font-bold text-[#1B4D36] hover:bg-[#F3EFE6] transition flex items-center gap-1.5"
                    >
                      <span>പബ്ലിക് പ്രൊഫൈൽ</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href="/dashboard/bookings"
                      className="px-4 py-2 rounded-xl bg-[#1B4D36] text-white text-xs font-bold hover:bg-[#133A28] transition flex items-center gap-1.5"
                    >
                      <span>ബുക്കിംഗുകൾ</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* 3 Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white rounded-2xl border border-[#EAE4D7] p-5">
                    <span className="text-[10px] font-bold text-[#7A8880] uppercase tracking-wider">സേവന അപ്പോയിന്റ്മെന്റുകൾ</span>
                    <p className="text-2xl font-bold font-mono text-[#1B4D36] mt-1">{myBookings.length}</p>
                    <span className="text-xs text-[#5C6A64]">ആകെ ലഭിച്ച റിക്വസ്റ്റുകൾ</span>
                  </div>
                  <div className="bg-white rounded-2xl border border-[#EAE4D7] p-5">
                    <span className="text-[10px] font-bold text-[#7A8880] uppercase tracking-wider">സ്ഥിരീകരിച്ച അവലോകനങ്ങൾ</span>
                    <p className="text-2xl font-bold font-mono text-[#B87A1E] mt-1">{proReviews.length}</p>
                    <span className="text-xs text-[#5C6A64]">ശരാശരി റേറ്റിംഗ്: ⭐ {existingPro.rating.toFixed(1)}</span>
                  </div>
                  <div className="bg-white rounded-2xl border border-[#EAE4D7] p-5">
                    <span className="text-[10px] font-bold text-[#7A8880] uppercase tracking-wider">ലഭ്യത (Availability)</span>
                    <p className="text-sm font-bold text-emerald-700 mt-2 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>ബുക്കിംഗുകൾ സജീവമാണ്</span>
                    </p>
                    <span className="text-[11px] text-[#5C6A64]">തിങ്കൾ - ശനി: 08:00 AM - 08:00 PM</span>
                  </div>
                </div>

                {/* Recent Service Bookings List */}
                <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 shadow-card space-y-4">
                  <div className="flex items-center justify-between border-b border-[#F3EFE6] pb-3">
                    <h4 className="font-bold text-sm text-[#1A2420] font-malayalam-serif">സമീപകാല സർവീസ് റിക്വസ്റ്റുകൾ</h4>
                    <Link href="/dashboard/bookings" className="text-xs text-[#1B4D36] font-bold hover:underline">
                      എല്ലാ ബുക്കിംഗുകളും കാണുക →
                    </Link>
                  </div>
                  {myBookings.length === 0 ? (
                    <p className="text-xs text-[#7A8880] py-4 text-center">നിലവിൽ പുതിയ ബുക്കിംഗ് റിക്വസ്റ്റുകൾ ലഭ്യമല്ല.</p>
                  ) : (
                    <div className="space-y-3">
                      {myBookings.slice(0, 3).map(b => (
                        <div key={b.id} className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#EAE4D7] flex items-center justify-between gap-3 text-xs">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-[#1A2420]">{b.service_title}</span>
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E0F1E7] text-[#1B4D36]">{b.status}</span>
                            </div>
                            <p className="text-[11px] text-[#7A8880] mt-0.5">📅 {b.booking_date} ({b.time_slot}) • 📍 {b.customer_locality || "Tanur"}</p>
                          </div>
                          <span className="font-bold text-[#B87A1E]">₹{b.estimated_price}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Verified Customer Reviews */}
                <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 shadow-card space-y-4">
                  <h4 className="font-bold text-sm text-[#1A2420] font-malayalam-serif">ഉപഭോക്താക്കളുടെ സമീപകാല അവലോകനങ്ങൾ</h4>
                  {proReviews.length === 0 ? (
                    <p className="text-xs text-[#7A8880] py-4 text-center">ഇതുവരെ അവലോകനങ്ങളൊന്നും ലഭിച്ചിട്ടില്ല.</p>
                  ) : (
                    <div className="space-y-3">
                      {proReviews.slice(0, 2).map(r => (
                        <div key={r.id} className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#EAE4D7] space-y-1.5 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-[#1A2420]">{r.customer_name}</span>
                            <span className="text-amber-500 font-bold">⭐ {r.rating_overall}/5</span>
                          </div>
                          <p className="text-[#4A5750]">{r.comment}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-[#EAE4D7] p-8 text-center space-y-4 shadow-card">
                <Wrench className="w-12 h-12 text-[#1B4D36] mx-auto opacity-70" />
                <h3 className="text-lg font-bold font-malayalam-serif text-[#1A2420]">
                  നിങ്ങൾ ഒരു സേവന ദാതാവായി രജിസ്റ്റർ ചെയ്തിട്ടില്ല
                </h3>
                <p className="text-xs text-[#5C6A64] max-w-md mx-auto leading-relaxed">
                  താനൂരിലും പരിസരങ്ങളിലും ഇലക്ട്രിക്കൽ, പ്ലംബിംഗ്, എസി റിപ്പയർ, കാർപെന്റിംഗ് തുടങ്ങിയ സേവനങ്ങൾ നൽകാൻ സൗജന്യമായി പ്രൊഫൈൽ തുടങ്ങൂ.
                </p>
                <Link
                  href="/professionals/onboarding"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1B4D36] text-white text-xs font-bold hover:bg-[#133A28] transition"
                >
                  <span>ഇപ്പോൾ രജിസ്റ്റർ ചെയ്യുക (Become a Provider)</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* MODERATOR PERSONA DASHBOARD (SECTION 4) */}
        {/* ============================================================== */}
        {dashboardPersona === "moderator" && (
          <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 sm:p-8 shadow-card space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F3EFE6] pb-4">
              <div>
                <span className="text-[10px] font-bold text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-md uppercase">
                  മോഡറേഷൻ വർക്ക്‌സ്‌പേസ്
                </span>
                <h3 className="text-lg font-bold font-malayalam-serif text-[#1B4D36] mt-1">
                  കമ്മ്യൂണിറ്റി സുരക്ഷ & റിപ്പോർട്ട് ക്യൂ
                </h3>
                <p className="text-xs text-[#5C6A64]">ഉപയോക്താക്കൾ സമർപ്പിച്ച റിപ്പോർട്ടുകൾ പരിശോധിച്ച് നടപടി സ്വീകരിക്കുക.</p>
              </div>
              <Link href="/admin" className="px-4 py-2 rounded-xl bg-[#1B4D36] text-white text-xs font-bold hover:bg-[#133A28] transition self-start sm:self-center">
                പൂർണ്ണ അഡ്മിൻ പാനലിലേക്ക് →
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7] text-center">
                <span className="text-[10px] font-bold text-[#7A8880] uppercase">ആകെ റിപ്പോർട്ടുകൾ</span>
                <p className="text-xl font-bold font-mono text-[#1A2420] mt-1">{moderationReports.length}</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7] text-center">
                <span className="text-[10px] font-bold text-[#7A8880] uppercase">പരിഹരിക്കാനുള്ളവ</span>
                <p className="text-xl font-bold font-mono text-amber-600 mt-1">
                  {moderationReports.filter(r => r.status === "pending").length}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7] text-center">
                <span className="text-[10px] font-bold text-[#7A8880] uppercase">പൗര പരാതികൾ</span>
                <p className="text-xl font-bold font-mono text-[#1B4D36] mt-1">{myIssues.length}</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7] text-center">
                <span className="text-[10px] font-bold text-[#7A8880] uppercase">നിങ്ങളുടെ റോൾ</span>
                <p className="text-xs font-bold text-emerald-700 mt-2 uppercase">{role}</p>
              </div>
            </div>

            {/* Reports list */}
            <div className="space-y-3 pt-2">
              <h4 className="font-bold text-sm text-[#1A2420]">ലഭിച്ച പരാതികളുടെ പട്ടിക (Report Queue)</h4>
              {moderationReports.length === 0 ? (
                <div className="p-6 rounded-2xl bg-[#E0F1E7]/40 border border-[#BDE3CE] text-center text-xs text-emerald-800 font-semibold">
                  ✓ നിലവിൽ തീർപ്പാക്കപ്പെടാത്ത മോഡറേഷൻ പരാതികളൊന്നും ഇല്ല!
                </div>
              ) : (
                moderationReports.slice(0, 5).map(rep => (
                  <div key={rep.id} className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7] flex items-center justify-between gap-4 text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#1B4D36] uppercase text-[10px] px-2 py-0.5 bg-[#E5DDD0] rounded-md">{rep.content_type}</span>
                        <span className="font-semibold text-[#1A2420]">കാരണം: {rep.reason}</span>
                      </div>
                      {rep.details && <p className="text-[11px] text-[#5C6A64] mt-1">{rep.details}</p>}
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">{rep.status}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* ADMINISTRATOR PERSONA DASHBOARD (SECTION 4) */}
        {/* ============================================================== */}
        {dashboardPersona === "admin" && (
          <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 sm:p-8 shadow-card space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F3EFE6] pb-4">
              <div>
                <span className="text-[10px] font-bold text-purple-800 bg-purple-50 px-2.5 py-0.5 rounded-md uppercase">
                  അഡ്മിനിസ്ട്രേറ്റർ കൺസോൾ
                </span>
                <h3 className="text-lg font-bold font-malayalam-serif text-[#1B4D36] mt-1">
                  പ്ലാറ്റ്‌ഫോം സ്ഥിതിവിവരങ്ങളും ഭരണവും (Admin Overview)
                </h3>
                <p className="text-xs text-[#5C6A64]">താനൂർ & മലപ്പുറം ഡാറ്റാബേസ് പൂർണ്ണ നിയന്ത്രണം.</p>
              </div>
              <Link href="/admin" className="px-4 py-2.5 rounded-xl bg-[#1B4D36] text-white text-xs font-bold hover:bg-[#133A28] transition shadow-xs self-start sm:self-center">
                പൂർണ്ണ അഡ്മിൻ ഡാഷ്‌ബോർഡ് തുറക്കുക →
              </Link>
            </div>

            {/* Platform Health Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7]">
                <span className="text-[10px] font-bold text-[#7A8880] uppercase">ആകെ ഡാറ്റാ റെക്കോർഡുകൾ</span>
                <p className="text-2xl font-bold font-mono text-[#1B4D36] mt-1">{verificationStats.totalRecords}</p>
                <span className="text-[10px] text-emerald-700 font-semibold">{verificationStats.percentVerified}% സ്ഥിരീകരിച്ചവ</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7]">
                <span className="text-[10px] font-bold text-[#7A8880] uppercase">വാർത്തകൾ</span>
                <p className="text-2xl font-bold font-mono text-[#1A2420] mt-1">{verificationStats.totalNews}</p>
                <span className="text-[10px] text-[#5C6A64]">{verificationStats.verifiedNews} വെരിഫൈഡ്</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7]">
                <span className="text-[10px] font-bold text-[#7A8880] uppercase">വ്യാപാരങ്ങൾ & സേവനങ്ങൾ</span>
                <p className="text-2xl font-bold font-mono text-[#1A2420] mt-1">{verificationStats.totalBiz}</p>
                <span className="text-[10px] text-[#5C6A64]">{verificationStats.verifiedBiz} വെരിഫൈഡ്</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7]">
                <span className="text-[10px] font-bold text-[#7A8880] uppercase">പെൻഡിംഗ് സബ്മിഷൻസ്</span>
                <p className="text-2xl font-bold font-mono text-amber-600 mt-1">{verificationStats.pendingSubmissions}</p>
                <span className="text-[10px] text-[#8C5B0F]">പരിശോധന ആവശ്യമാണ്</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF4E6] border border-[#E8DCBF] flex items-center justify-between">
              <div className="text-xs text-[#8C5B0F]">
                <span className="font-bold">അഡ്മിൻ വർക്ക്‌സ്‌പേസ്:</span> വാർത്തകൾ, ഇവന്റുകൾ, സേവന ദാതാക്കൾ, അവലോകനങ്ങൾ എന്നിവ നിയന്ത്രിക്കാൻ അഡ്മിൻ പാനൽ സന്ദർശിക്കുക.
              </div>
              <Link href="/admin" className="px-3.5 py-1.5 rounded-lg bg-[#1B4D36] text-white text-xs font-bold hover:bg-[#133A28] shrink-0">
                തുറക്കുക
              </Link>
            </div>
          </div>
        )}

      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
