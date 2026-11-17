"use client";

import React, { useState } from "react";
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
  ExternalLink
} from "lucide-react";

export default function ProfilePage() {
  const { t, language, setLanguage } = useLanguage();
  const { user, role, updateProfile, switchUserRole, logout } = useAuth();
  const { availableCommunities, currentCommunity, setCurrentCommunity } = useCommunity();

  const [activeTab, setActiveTab] = useState<"info" | "saved_articles" | "saved_events" | "civic" | "settings">("info");
  const [savedArticles, setSavedArticles] = useState(KERALA_NEWS_ARTICLES.slice(0, 3));
  const [savedEvents, setSavedEvents] = useState(KERALA_EVENTS_DATA.slice(0, 2));

  const [displayName, setDisplayName] = useState(user?.display_name || "വിഷ്ണു പ്രസാദ് (Vishnu Prasad)");
  const [bio, setBio] = useState(user?.bio || "കേരളത്തിന്റെ പാരമ്പര്യത്തിലും പ്രാദേശിക വികസനത്തിലും താൽപ്പര്യമുള്ള ഒരു സജീവ നാട്ടുവാസി.");
  const [preferredLang, setPreferredLang] = useState<"ml" | "en">(user?.preferred_language || "ml");
  const [selectedCommId, setSelectedCommId] = useState(user?.selected_community_id || "");
  const [interests, setInterests] = useState<string[]>(user?.interests || ["Civic Tech", "Kerala History", "Environment", "സാഹിത്യം", "കൃഷി"]);
  const [newInterestInput, setNewInterestInput] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

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

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: "പ്രൊഫൈൽ (Profile)" }]} className="mb-4" />

        {/* Profile Card Header */}
        <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 sm:p-8 mb-6 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#1B4D36] to-[#123826] text-amber-200 font-bold text-3xl flex items-center justify-center border-4 border-[#FAF7F0] shadow-md">
                {displayName ? displayName.charAt(0) : "U"}
              </div>
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
              </div>
              <p className="text-xs text-[#7A8880] mt-1 flex items-center gap-2 flex-wrap">
                <span>@{user?.username || "vishnu_kerala"}</span>
                <span>•</span>
                <span>{user?.email || "vishnu.prasad@example.com"}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-[#1B4D36] font-semibold">
                  <MapPin className="w-3.5 h-3.5" />
                  {currentCommunity?.name || "Kerala"}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={() => logout()}
              className="px-4 py-2 rounded-xl text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 transition border border-red-200 shadow-xs active:scale-95"
            >
              {t("navLogout")}
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none border-b border-[#EAE4D7]">
          {[
            { id: "info", label: "അക്കൗണ്ട് വിവരങ്ങൾ (Account Info)", icon: User },
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
            <span>പ്രൊഫൈൽ വിവരങ്ങൾ വിജയകരമായി സേവ് ചെയ്തു!</span>
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
                  <span className="text-[11px] text-[#7A8880]">Edit Profile</span>
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
                      value={user?.email || "vishnu.prasad@example.com"}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#F3EFE6] text-[#7A8880] cursor-not-allowed"
                    />
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
                    <span>സേവ് ചെയ്യുക (Save Profile)</span>
                  </button>
                </div>
              </form>
            )}

            {/* TAB 2: Saved Articles */}
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
                          <div className="flex items-center gap-2 text-[10px] text-[#7A8880]">
                            <span className="bg-[#E0F1E7] text-[#1B4D36] font-bold px-2 py-0.5 rounded-full">
                              {article.category}
                            </span>
                            <span>•</span>
                            <span>{article.date}</span>
                            <span>•</span>
                            <span className="flex items-center gap-0.5"><Clock className="w-3 h-3" /> 3 മിനിറ്റ്</span>
                          </div>
                          <h3 className="font-bold text-sm sm:text-base text-[#1A2420] group-hover:text-[#1B4D36] transition font-malayalam-serif">
                            <Link href={`/news/${article.id}`}>
                              {article.title}
                            </Link>
                          </h3>
                          <p className="text-xs text-[#5C6A64] line-clamp-2">
                            {article.summary}
                          </p>
                          <div className="flex items-center justify-between pt-2">
                            <Link
                              href={`/news/${article.id}`}
                              className="text-xs font-bold text-[#1B4D36] hover:underline flex items-center gap-1"
                            >
                              <span>വായിക്കുക</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                            <button
                              onClick={() => setSavedArticles(savedArticles.filter((a) => a.id !== article.id))}
                              className="text-xs text-red-600 hover:text-red-800 font-semibold flex items-center gap-1 p-1 hover:bg-red-50 rounded-lg transition"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>ഒഴിവാക്കുക</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: Saved Events */}
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

                {savedEvents.length === 0 ? (
                  <div className="py-12 text-center text-[#7A8880] space-y-3">
                    <Calendar className="w-8 h-8 mx-auto text-[#DDD5C5]" />
                    <p className="text-xs">നിങ്ങൾ ഇതുവരെ പരിപാടികൾ ഒന്നും സൂക്ഷിച്ചിട്ടില്ല.</p>
                    <Link href="/events" className="inline-block px-4 py-2 bg-[#1B4D36] text-white text-xs font-bold rounded-xl">
                      പരിപാടികൾ കാണൂ
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {savedEvents.map((event) => (
                      <div
                        key={event.id}
                        className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7] flex flex-col sm:flex-row gap-4 items-start hover:border-[#1B4D36]/40 transition group"
                      >
                        <div className="w-full sm:w-28 h-24 rounded-xl bg-gradient-to-br from-[#1B4D36] to-[#123826] text-white flex flex-col items-center justify-center p-2 text-center shrink-0">
                          <span className="text-[10px] uppercase font-bold text-amber-200">{event.dateMonth}</span>
                          <span className="text-2xl font-bold font-mono">{event.dateDay}</span>
                          <span className="text-[10px] text-white/80">{event.time}</span>
                        </div>
                        <div className="flex-1 space-y-1.5">
                          <div className="flex items-center gap-2 text-[10px] text-[#7A8880]">
                            <span className="bg-[#FAF4E6] text-[#8C5B0F] font-bold px-2 py-0.5 rounded-full border border-[#E8DCBF]">
                              {event.category}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-[#1B4D36]" /> {event.location}</span>
                          </div>
                          <h3 className="font-bold text-sm sm:text-base text-[#1A2420] group-hover:text-[#1B4D36] transition font-malayalam-serif">
                            <Link href={`/events/${event.id}`}>
                              {event.title}
                            </Link>
                          </h3>
                          <p className="text-xs text-[#5C6A64] line-clamp-2">
                            {event.description}
                          </p>
                          <div className="flex items-center justify-between pt-2">
                            <Link
                              href={`/events/${event.id}`}
                              className="text-xs font-bold text-[#1B4D36] hover:underline flex items-center gap-1"
                            >
                              <span>വിശദാംശങ്ങൾ കാണുക</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                            <button
                              onClick={() => setSavedEvents(savedEvents.filter((e) => e.id !== event.id))}
                              className="text-xs text-red-600 hover:text-red-800 font-semibold flex items-center gap-1 p-1 hover:bg-red-50 rounded-lg transition"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>ഒഴിവാക്കുക</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: Civic Reports */}
            {activeTab === "civic" && (
              <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 sm:p-8 shadow-card">
                <h3 className="text-base font-bold font-malayalam-serif text-[#1B4D36] mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>ഞാൻ സമർപ്പിച്ച പരാതികൾ ({myIssues.length})</span>
                </h3>

                {myIssues.length === 0 ? (
                  <p className="text-xs text-[#7A8880] py-8 text-center">
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
            )}

            {/* TAB 5: Settings */}
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

          {/* Right Sidebar: Role Switcher & Badges (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            
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

            {/* Role Switcher */}
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
