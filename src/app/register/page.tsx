"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { KeralaLogo } from "@/components/layout/KeralaLogo";
import { useLanguage } from "@/lib/i18n/context";
import { useAuth } from "@/lib/auth/context";
import { Lock, Mail, User, ShieldCheck, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const { register, isLoading } = useAuth();

  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState<"ml" | "en">("ml");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    const result = await register({
      email,
      password,
      username,
      displayName,
      preferredLanguage,
    });
    if (result.success) {
      router.push("/");
    } else {
      setErrorMsg(result.error || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md bg-white rounded-3xl border border-[#EAE4D7] p-8 sm:p-10 shadow-card">
          <div className="text-center mb-8 flex flex-col items-center">
            <KeralaLogo />
            <h1 className="text-2xl font-bold font-malayalam-serif text-[#1B4D36] mt-4">
              {t("navRegister")}
            </h1>
            <p className="text-xs text-[#5C6A64] mt-1 font-malayalam-body">
              നമ്മുടെ നാടിന്റെ ഭാഗമാകൂ — ഇപ്പോൾ തന്നെ ചേരൂ
            </p>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-[#1A2420] mb-1">
                പൂർണ്ണ നാമം (Full Display Name)
              </label>
              <input
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="ഉദാ: രോഹിത് വർമ്മ"
                className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-none focus:ring-2 focus:ring-[#1B4D36]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1A2420] mb-1">
                യൂസർനെയിം (Unique Username)
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s+/g, "_"))}
                placeholder="rohith_v"
                className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-none focus:ring-2 focus:ring-[#1B4D36]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1A2420] mb-1">
                ഇമെയിൽ വിലാസം
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-none focus:ring-2 focus:ring-[#1B4D36]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1A2420] mb-1">
                പാസ്‌വേഡ് (Password)
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-none focus:ring-2 focus:ring-[#1B4D36]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1A2420] mb-1">
                മുൻഗണനാ ഭാഷ
              </label>
              <select
                value={preferredLanguage}
                onChange={(e) => setPreferredLanguage(e.target.value as any)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
              >
                <option value="ml">മലയാളം (Malayalam)</option>
                <option value="en">English</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-[#1B4D36] hover:bg-[#133A28] disabled:opacity-50 text-white font-bold text-xs sm:text-sm transition active:scale-95 shadow-md mt-3 flex items-center justify-center gap-2"
            >
              <span>{isLoading ? t("loading") : t("navRegister")}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#F3EFE6] text-center text-xs text-[#5C6A64]">
            Already registered?{" "}
            <Link href="/login" className="font-bold text-[#1B4D36] hover:underline">
              {t("navLogin")}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
