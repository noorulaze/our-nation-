"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/lib/i18n/context";
import { useCommunity } from "@/lib/community/context";
import { useAuth } from "@/lib/auth/context";
import { store } from "@/lib/data/store";
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
  Heart
} from "lucide-react";

export default function ProfilePage() {
  const { t, language, setLanguage } = useLanguage();
  const { user, role, updateProfile, switchUserRole, logout } = useAuth();
  const { availableCommunities, currentCommunity, setCurrentCommunity } = useCommunity();

  const [displayName, setDisplayName] = useState(user?.display_name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [preferredLang, setPreferredLang] = useState<"ml" | "en">(user?.preferred_language || "ml");
  const [selectedCommId, setSelectedCommId] = useState(user?.selected_community_id || "");
  const [interests, setInterests] = useState<string[]>(user?.interests || ["Civic Tech", "Kerala History"]);
  const [newInterestInput, setNewInterestInput] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const myIssues = store.getIssueReports(undefined, user?.id);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({
      display_name: displayName,
      bio,
      preferred_language: preferredLang,
      selected_community_id: selectedCommId || null,
      interests,
    });
    setLanguage(preferredLang);
    if (selectedCommId) {
      const comm = availableCommunities.find((c) => c.id === selectedCommId);
      if (comm) setCurrentCommunity(comm);
    }
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8">
        
        {/* Profile Card Header */}
        <div className="bg-surface rounded-2xl border border-border p-6 mb-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-brand-100 text-brand-700 font-bold text-2xl flex items-center justify-center border-2 border-brand-200">
              {displayName ? displayName.charAt(0) : "U"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-foreground">
                  {displayName || "Community Member"}
                </h1>
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                  role === "admin"
                    ? "bg-purple-100 text-purple-800"
                    : role === "moderator"
                    ? "bg-blue-100 text-blue-800"
                    : role === "verified_org"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-emerald-100 text-emerald-800"
                }`}>
                  {role}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">@{user?.username || "resident"}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => logout()}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition"
            >
              {t("navLogout")}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Main Edit Form */}
          <div className="md:col-span-2 space-y-6">
            <form onSubmit={handleSave} className="bg-surface rounded-2xl border border-border p-6 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-foreground border-b border-border pb-3">
                Account Information
              </h2>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Display Name
                </label>
                <input
                  type="text"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Bio / Community Role
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Share a brief introduction with your neighborhood..."
                  className="w-full px-3 py-2 text-sm rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Preferred Language
                  </label>
                  <select
                    value={preferredLang}
                    onChange={(e) => setPreferredLang(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background text-foreground"
                  >
                    <option value="ml">മലയാളം (Malayalam)</option>
                    <option value="en">English</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Primary Community Locality
                  </label>
                  <select
                    value={selectedCommId}
                    onChange={(e) => setSelectedCommId(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background text-foreground"
                  >
                    <option value="">Choose locality...</option>
                    {availableCommunities.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.district})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Interests Tags */}
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Community Interests
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {interests.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-brand-50 text-brand-700 border border-brand-200"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveInterest(tag)}
                        className="hover:text-red-600 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newInterestInput}
                    onChange={(e) => setNewInterestInput(e.target.value)}
                    placeholder="Add an interest (e.g. Clean Energy, Sports)..."
                    className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-border bg-background text-foreground"
                  />
                  <button
                    type="button"
                    onClick={handleAddInterest}
                    className="px-3 py-1.5 rounded-xl bg-muted hover:bg-brand-50 text-foreground text-xs font-semibold border border-border"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                {isSaved ? (
                  <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Profile Updated
                  </span>
                ) : <span />}

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition active:scale-95 shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>{t("save")}</span>
                </button>
              </div>
            </form>

            {/* Account Deletion Workflow */}
            <div className="bg-red-50/50 rounded-2xl border border-red-200 p-6">
              <h3 className="text-sm font-bold text-red-900 mb-1">
                Account & Privacy Control
              </h3>
              <p className="text-xs text-red-700/80 leading-relaxed mb-4">
                You can delete your account and associated private data at any time. All personal records will be securely unlinked in compliance with Kerala and Indian privacy standards.
              </p>
              {showDeleteConfirm ? (
                <div className="p-3 bg-red-100/70 rounded-xl border border-red-300">
                  <p className="text-xs font-semibold text-red-900 mb-2">
                    Are you sure? This action cannot be reversed.
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        logout();
                        window.location.href = "/";
                      }}
                      className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-bold"
                    >
                      Yes, Delete My Account
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      className="px-3 py-1.5 rounded-lg bg-white border border-border text-xs text-foreground font-medium"
                    >
                      {t("cancel")}
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-red-700 bg-white border border-red-300 hover:bg-red-100 transition"
                >
                  Request Account Deletion
                </button>
              )}
            </div>
          </div>

          {/* Sidebar: My Reported Issues */}
          <div className="space-y-6">
            <div className="bg-surface rounded-2xl border border-border p-5 shadow-sm">
              <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>My Civic Reports ({myIssues.length})</span>
              </h3>

              {myIssues.length === 0 ? (
                <p className="text-xs text-muted-foreground">
                  You have not submitted any civic issue reports yet.
                </p>
              ) : (
                <div className="space-y-3">
                  {myIssues.map((iss) => (
                    <div key={iss.id} className="p-3 rounded-xl bg-muted/40 border border-border text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-foreground truncate max-w-[150px]">
                          {iss.title}
                        </span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md uppercase ${
                          iss.status === "resolved" 
                            ? "bg-emerald-100 text-emerald-800" 
                            : iss.status === "in_progress"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-amber-100 text-amber-800"
                        }`}>
                          {iss.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground">
                        📍 {iss.location_name || "Community Area"}
                      </p>
                      {iss.official_response && (
                        <div className="mt-2 pt-2 border-t border-border/60 text-[11px] text-emerald-800 dark:text-emerald-300">
                          <strong>Official Update:</strong> {iss.official_response}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>

      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
