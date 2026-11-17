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
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const { login, isLoading } = useAuth();

  const [email, setEmail] = useState("admin_nammude@example.com");
  const [password, setPassword] = useState("password123");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    const result = await login(email, password);
    if (result.success) {
      router.push("/");
    } else {
      setErrorMsg(result.error || "Login failed");
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
              {t("navLogin")}
            </h1>
            <p className="text-xs text-[#5C6A64] mt-1 font-malayalam-body">
              നമ്മുടെ നാട് ഡിജിറ്റൽ സമൂഹത്തിലേക്ക് സ്വാഗതം
            </p>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#1A2420] mb-1">
                ഇമെയിൽ / യൂസർനെയിം
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-[#7A8880]" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-none focus:ring-2 focus:ring-[#1B4D36]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1A2420] mb-1">
                പാസ്‌വേഡ്
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-[#7A8880]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-none focus:ring-2 focus:ring-[#1B4D36]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-[#1B4D36] hover:bg-[#133A28] disabled:opacity-50 text-white font-bold text-xs sm:text-sm transition active:scale-95 shadow-md mt-2 flex items-center justify-center gap-2"
            >
              <span>{isLoading ? t("loading") : t("navLogin")}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#F3EFE6] text-center text-xs text-[#5C6A64]">
            Don&apos;t have an account yet?{" "}
            <Link href="/register" className="font-bold text-[#1B4D36] hover:underline">
              {t("navRegister")}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
