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
  Heart,
  Calendar,
  AlertTriangle,
  ArrowRight
} from "lucide-react";

export default function ProfilePage() {
  const { t, language, setLanguage } = useLanguage();
  const { user, role, updateProfile, switchUserRole, logout } = useAuth();
  const { availableCommunities, currentCommunity, setCurrentCommunity } = useCommunity();

  const [displayName, setDisplayName] = useState(user?.display_name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [preferredLang, setPreferredLang] = useState<"ml" | "en">(user?.preferred_language || "ml");
  const [selectedCommId, setSelectedCommId] = useState(user?.selected_community_id || "");
  const [interests, setInterests] = useState<string[]>(user?.interests || ["Civic Tech", "Kerala History", "Environment"]);
  const [newInterestInput, setNewInterestInput] = useState("");
  const [isSaved, setIsSaved] = useState(false);

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
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8">
        
        {/* Profile Card Header */}
        <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 sm:p-8 mb-8 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#E5DDD0] text-[#1B4D36] font-bold text-2xl flex items-center justify-center border-2 border-[#DDD5C5] shadow-xs">
              {displayName ? displayName.charAt(0) : "U"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold font-malayalam-serif text-[#1B4D36]">
                  {displayName || "Community Member"}
                </h1>
                <span className={`text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full ${
                  role === "admin"
                    ? "bg-purple-100 text-purple-800"
                    : role === "moderator"
                    ? "bg-blue-100 text-blue-800"
                    : role === "verified_org"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-[#E0F1E7] text-[#1B4D36]"
                }`}>
                  {role}
                </span>
              </div>
              <p className="text-xs text-[#7A8880] mt-0.5">@{user?.username || "resident"} • {currentCommunity?.name || "Kerala"}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => logout()}
              className="px-4 py-2 rounded-xl text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 transition border border-red-200"
            >
              {t("navLogout")}
            </button>
          </div>
        </div>

        {/* Saved Alert */}
        {isSaved && (
          <div className="mb-6 p-4 rounded-2xl bg-[#1B4D36] text-white text-xs font-semibold flex items-center gap-2 shadow-md animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-amber-300" />
            <span>പ്രൊഫൈൽ വിവരങ്ങൾ വിജയകരമായി സേവ് ചെയ്തു!</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Main Edit Form */}
          <div className="md:col-span-2 space-y-6">
            <form onSubmit={handleSave} className="bg-white rounded-3xl border border-[#EAE4D7] p-6 sm:p-8 shadow-card space-y-4">
              <h2 className="text-base font-bold font-malayalam-serif text-[#1B4D36] border-b border-[#F3EFE6] pb-3">
                വ്യക്തിഗത വിവരങ്ങൾ (Account Information)
              </h2>

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
                    സ്വന്തം പ്രദേശം (Primary Locality)
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
                  <span>സേവ് ചെയ്യുക</span>
                </button>
              </div>
            </form>

            {/* My Civic Reports Tracking */}
            <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 sm:p-8 shadow-card">
              <h3 className="text-base font-bold font-malayalam-serif text-[#1B4D36] mb-4 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>ഞാൻ സമർപ്പിച്ച പരാതികൾ ({myIssues.length})</span>
              </h3>

              {myIssues.length === 0 ? (
                <p className="text-xs text-[#7A8880] py-4 text-center">
                  നിങ്ങൾ ഇതുവരെ പരാതികൾ ഒന്നും സമർപ്പിച്ചിട്ടില്ല.
                </p>
              ) : (
                <div className="space-y-3">
                  {myIssues.map((issue) => (
                    <div key={issue.id} className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full uppercase">
                          {issue.category}
                        </span>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
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
          </div>

          {/* Right Sidebar: Role Switcher & Badges */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 shadow-card space-y-4">
              <h3 className="text-sm font-bold font-malayalam-serif text-[#1B4D36] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#B87A1E]" />
                <span>ടെസ്റ്റിംഗ് റോൾ സ്വിച്ചർ</span>
              </h3>
              <p className="text-xs text-[#5C6A64] leading-relaxed">
                വിവിധ റോൾ അനുമതികൾ (അഡ്മിൻ, മോഡറേറ്റർ, സാധാരണ ഉപഭോക്താവ്) പരിശോധിക്കാനായി ഇവിടെ നിന്നും റോൾ തിരഞ്ഞെടുക്കാം:
              </p>
              <div className="flex flex-col gap-2">
                {(["user", "verified_org", "moderator", "admin"] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => switchUserRole(r)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold text-left transition flex items-center justify-between ${
                      role === r
                        ? "bg-[#1B4D36] text-white shadow-xs"
                        : "bg-[#FAF7F0] hover:bg-[#F3EFE6] text-[#3E4D45] border border-[#EAE4D7]"
                    }`}
                  >
                    <span className="capitalize">{r.replace("_", " ")}</span>
                    {role === r && <CheckCircle2 className="w-4 h-4 text-amber-300" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#FAF4E6] rounded-3xl border border-[#E8DCBF] p-6 shadow-card text-[#8C5B0F]">
              <h4 className="text-xs font-bold uppercase tracking-wider mb-2">നമ്മുടെ നാട് സുരക്ഷ</h4>
              <p className="text-xs leading-relaxed">
                നിങ്ങളുടെ വിവരങ്ങൾ സുരക്ഷിതമായി സൂക്ഷിക്കപ്പെടുന്നു. പ്രാദേശിക കാര്യങ്ങളിൽ സജീവമായി പങ്കാളിയാകൂ.
              </p>
            </div>
          </div>

        </div>

      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
