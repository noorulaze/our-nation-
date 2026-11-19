"use client";

import React, { use } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { useLanguage } from "@/lib/i18n/context";
import { store } from "@/lib/data/store";
import Link from "next/link";
import { 
  User, 
  MapPin, 
  Mail, 
  Phone, 
  Calendar, 
  ShieldCheck, 
  Wrench, 
  ArrowRight, 
  Lock, 
  Globe, 
  Award, 
  ExternalLink,
  MessageSquare
} from "lucide-react";

interface PageProps {
  params: Promise<{ username: string }>;
}

export default function PublicProfilePage({ params }: PageProps) {
  const { username } = use(params);
  const { t, language } = useLanguage();

  const allProfiles = store.getProfiles();
  const profile = allProfiles.find(
    (p) => p.username.toLowerCase() === decodeURIComponent(username).toLowerCase()
  );

  // Check if user has an associated professional profile
  const proProfile = profile ? store.getProfessionalByUserId(profile.id) || store.getProfessionalByUsername(profile.username) : undefined;

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
        <Navbar />
        <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-16 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
            <User className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold font-malayalam-serif text-[#1B4D36]">
            ഉപയോക്താവിനെ കണ്ടെത്താനായില്ല (User Not Found)
          </h1>
          <p className="text-xs text-[#5C6A64]">
            @{username} എന്ന പേരിലുള്ള പ്രൊഫൈൽ നിലവിലില്ല അല്ലെങ്കിൽ നീക്കം ചെയ്യപ്പെട്ടിരിക്കുന്നു.
          </p>
          <Link
            href="/"
            className="inline-block px-5 py-2.5 rounded-xl bg-[#1B4D36] text-white text-xs font-bold hover:bg-[#143C2A] transition"
          >
            ഹോം പേജിലേക്ക് മടങ്ങുക
          </Link>
        </main>
        <Footer />
        <BottomNav />
      </div>
    );
  }

  const privacy = profile.privacy_settings || {
    public_profile: true,
    show_phone: false,
    show_email: false,
    show_address: true,
  };

  // If user disabled public profile
  if (!privacy.public_profile) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
        <Navbar />
        <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-16 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-neutral-200 text-neutral-600 flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold font-malayalam-serif text-[#1B4D36]">
            സ്വകാര്യ പ്രൊഫൈൽ (Private Profile)
          </h1>
          <p className="text-xs text-[#5C6A64] max-w-md mx-auto">
            ഈ ഉപയോക്താവ് തന്റെ പ്രൊഫൈൽ വിവരങ്ങൾ പൊതുവായി കാണിക്കുന്നത് ഒഴിവാക്കിയിരിക്കുന്നു.
          </p>
          <Link
            href="/"
            className="inline-block px-5 py-2.5 rounded-xl bg-[#1B4D36] text-white text-xs font-bold hover:bg-[#143C2A] transition"
          >
            ഹോം പേജിലേക്ക് മടങ്ങുക
          </Link>
        </main>
        <Footer />
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "നാട്ടുകാർ (Community)", href: "/" },
            { label: profile.display_name },
          ]}
        />

        {/* Profile Header Card */}
        <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 sm:p-8 shadow-card relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative">
              {profile.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={profile.display_name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-[#FAF7F0] shadow-md"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#1B4D36] to-[#123826] text-amber-200 font-bold text-4xl flex items-center justify-center border-4 border-[#FAF7F0] shadow-md">
                  {profile.display_name ? profile.display_name.charAt(0) : "U"}
                </div>
              )}
              <span className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full" />
            </div>

            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold font-malayalam-serif text-[#1B4D36]">
                  {profile.display_name}
                </h1>
                <span className={`text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full ${
                  profile.role === "admin"
                    ? "bg-purple-100 text-purple-800 border border-purple-200"
                    : profile.role === "moderator"
                    ? "bg-blue-100 text-blue-800 border border-blue-200"
                    : profile.role === "verified_org"
                    ? "bg-amber-100 text-amber-800 border border-amber-200"
                    : "bg-[#E0F1E7] text-[#1B4D36] border border-[#BDE3CE]"
                }`}>
                  {profile.role.replace("_", " ")}
                </span>
                {proProfile && (
                  <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                    <Wrench className="w-3 h-3 text-[#B87A1E]" />
                    <span>സേവന ദാതാവ്</span>
                  </span>
                )}
              </div>

              <p className="text-xs text-[#7A8880] flex items-center gap-2 flex-wrap">
                <span>@{profile.username}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>അംഗത്വം: {new Date(profile.created_at).toLocaleDateString("ml-IN", { month: "short", year: "numeric" })}</span>
                </span>
                {privacy.show_address && profile.locality && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-[#1B4D36] font-semibold">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{profile.locality}</span>
                    </span>
                  </>
                )}
              </p>

              {profile.bio && (
                <p className="text-xs sm:text-sm text-[#3E4D45] leading-relaxed pt-1">
                  {profile.bio}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* PRO SERVICE BANNER (IF USER IS A PROFESSIONAL) */}
        {proProfile && (
          <div className="bg-gradient-to-r from-[#1B4D36] to-[#123826] rounded-3xl p-6 sm:p-7 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="space-y-1.5">
              <span className="inline-block px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider border border-amber-400/30">
                ⭐ വെരിഫൈഡ് പ്രൊഫഷണൽ സർവീസ്
              </span>
              <h3 className="text-lg font-bold font-malayalam-serif">
                {proProfile.business_name || proProfile.display_name}
              </h3>
              <p className="text-xs text-white/80">
                {proProfile.category_name_ml || proProfile.category_name} • {proProfile.experience_years} വർഷത്തെ പ്രവൃത്തിപരിചയം • താനൂർ & മലപ്പുറം
              </p>
            </div>
            <Link
              href={`/professionals/${proProfile.username}`}
              className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-[#1B4D36] text-xs sm:text-sm font-bold transition shadow-md flex items-center gap-2 shrink-0 active:scale-95"
            >
              <Wrench className="w-4 h-4" />
              <span>സേവനങ്ങളും ബുക്കിംഗും കാണുക</span>
            </Link>
          </div>
        )}

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact & Locality Card */}
          <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 shadow-card space-y-4">
            <h3 className="text-sm font-bold font-malayalam-serif text-[#1B4D36] border-b border-[#F3EFE6] pb-2">
              ബന്ധപ്പെടാനുള്ള വിവരങ്ങൾ (Contact & Locality)
            </h3>
            
            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-3 text-[#3E4D45]">
                <MapPin className="w-4 h-4 text-[#1B4D36] shrink-0" />
                <div>
                  <span className="block text-[11px] text-[#7A8880]">പ്രദേശം / വാർഡ്</span>
                  <span className="font-semibold">{privacy.show_address && profile.locality ? profile.locality : "താനൂർ നഗരസഭ (മലപ്പുറം)"}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-[#3E4D45]">
                <Phone className="w-4 h-4 text-[#1B4D36] shrink-0" />
                <div>
                  <span className="block text-[11px] text-[#7A8880]">ഫോൺ നമ്പർ</span>
                  {privacy.show_phone && profile.phone ? (
                    <a href={`tel:${profile.phone}`} className="font-semibold text-[#1B4D36] hover:underline">
                      {profile.phone}
                    </a>
                  ) : (
                    <span className="text-[#7A8880] italic flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      <span>സ്വകാര്യതയ്ക്കായി മറച്ചിരിക്കുന്നു</span>
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 text-[#3E4D45]">
                <Mail className="w-4 h-4 text-[#1B4D36] shrink-0" />
                <div>
                  <span className="block text-[11px] text-[#7A8880]">ഇമെയിൽ</span>
                  {privacy.show_email && profile.email ? (
                    <a href={`mailto:${profile.email}`} className="font-semibold text-[#1B4D36] hover:underline">
                      {profile.email}
                    </a>
                  ) : (
                    <span className="text-[#7A8880] italic flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      <span>സ്വകാര്യതയ്ക്കായി മറച്ചിരിക്കുന്നു</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Interests & Community Participation */}
          <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 shadow-card space-y-4">
            <h3 className="text-sm font-bold font-malayalam-serif text-[#1B4D36] border-b border-[#F3EFE6] pb-2">
              താൽപ്പര്യമുള്ള മേഖലകൾ (Interests)
            </h3>
            
            {profile.interests && profile.interests.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full bg-[#FAF7F0] border border-[#DDD5C5] text-xs font-semibold text-[#1B4D36]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#7A8880] italic">
                താൽപ്പര്യങ്ങൾ ഒന്നും ചേർത്തിട്ടില്ല.
              </p>
            )}

            <div className="pt-2 border-t border-[#F3EFE6]">
              <span className="text-[11px] text-[#7A8880] block mb-1">പ്രാദേശിക ഭാഷകൾ:</span>
              <div className="flex gap-2">
                <span className="px-2.5 py-1 bg-[#E0F1E7] text-[#1B4D36] rounded-lg text-xs font-bold">മലയാളം</span>
                <span className="px-2.5 py-1 bg-[#FAF7F0] text-[#3E4D45] border border-[#DDD5C5] rounded-lg text-xs font-bold">English</span>
              </div>
            </div>
          </div>
        </div>

      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
