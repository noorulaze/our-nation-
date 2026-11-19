"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { useAuth } from "@/lib/auth/context";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import {
  Lock,
  Mail,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  ArrowLeft,
  KeyRound,
  RefreshCw
} from "lucide-react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const { resetPassword, updatePassword, isLoading } = useAuth();

  // Mode: "request" (enter email) or "update" (enter new password)
  const [mode, setMode] = useState<"request" | "update">("request");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);

  // Detect recovery token in URL hash or query params
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      const params = new URLSearchParams(window.location.search);
      if (hash.includes("type=recovery") || hash.includes("access_token=") || params.has("token")) {
        setMode("update");
      }
    }
  }, []);

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);
    if (!email.trim() || !email.includes("@")) {
      setStatusMessage({
        type: "error",
        text: "Please provide a valid registered email address.",
      });
      return;
    }

    const result = await resetPassword(email.trim());
    if (result.success) {
      setStatusMessage({
        type: "success",
        text: result.message || "A secure password recovery link has been dispatched to your email.",
      });
    } else {
      setStatusMessage({
        type: "error",
        text: result.error || "Failed to dispatch recovery link. Please try again.",
      });
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);
    if (newPassword.length < 8) {
      setStatusMessage({
        type: "error",
        text: "New password must be at least 8 characters in length.",
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      setStatusMessage({
        type: "error",
        text: "Passwords do not match. Please re-enter.",
      });
      return;
    }

    const result = await updatePassword(newPassword);
    if (result.success) {
      setStatusMessage({
        type: "success",
        text: "Your password has been successfully updated! Redirecting to login...",
      });
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } else {
      setStatusMessage({
        type: "error",
        text: result.error || "The reset link may have expired or is invalid. Please request a new recovery link.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] flex flex-col justify-between">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-md space-y-6">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Sign In", href: "/login" },
              { label: "Account Recovery" },
            ]}
          />

          <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-8 shadow-sm">
            {/* Header Icon */}
            <div className="w-12 h-12 rounded-2xl bg-[#F5F1E7] border border-[#EDE6D8] flex items-center justify-center text-[#194B35] mb-4">
              <KeyRound className="w-6 h-6" />
            </div>

            <h1 className="text-2xl font-black text-[#194B35] tracking-tight">
              {mode === "request" ? "Reset Your Password" : "Set New Password"}
            </h1>
            <p className="text-xs text-[#5C6A64] mt-1 leading-relaxed">
              {mode === "request"
                ? "Enter your registered citizen or municipal email address. We'll send you instructions to securely reset your credentials."
                : "Choose a strong, unique password with at least 8 characters to protect your civic account."}
            </p>

            {/* Status Messages */}
            {statusMessage && (
              <div
                className={`mt-4 p-3.5 rounded-xl border text-xs flex items-start gap-2.5 ${
                  statusMessage.type === "success"
                    ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                    : "bg-red-50 border-red-200 text-red-700"
                }`}
              >
                {statusMessage.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                )}
                <div className="flex-1">{statusMessage.text}</div>
              </div>
            )}

            {/* REQUEST RESET FORM */}
            {mode === "request" ? (
              <form onSubmit={handleRequestReset} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#1A2420] mb-1.5">
                    Registered Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#5C6A64] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. resident@tanur.gov.in"
                      className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-[#EDE6D8] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#194B35] focus:border-transparent transition"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 bg-[#194B35] hover:bg-[#133A29] text-white rounded-xl text-xs font-bold tracking-wide flex items-center justify-center gap-2 transition active:scale-98 shadow-sm disabled:opacity-50"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      Sending Recovery Link...
                    </span>
                  ) : (
                    <>
                      <span>Send Recovery Link</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => setMode("update")}
                    className="text-[11px] font-bold text-[#5C6A64] hover:text-[#194B35] underline"
                  >
                    Already have a reset token or link? Click here to set new password
                  </button>
                </div>
              </form>
            ) : (
              /* UPDATE PASSWORD FORM */
              <form onSubmit={handleUpdatePassword} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#1A2420] mb-1.5">
                    New Password (Min 8 Characters)
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#5C6A64] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full pl-10 pr-10 py-2.5 text-xs bg-white border border-[#EDE6D8] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#194B35] focus:border-transparent transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5C6A64] hover:text-[#1A2420]"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1A2420] mb-1.5">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#5C6A64] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="w-full pl-10 pr-10 py-2.5 text-xs bg-white border border-[#EDE6D8] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#194B35] focus:border-transparent transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5C6A64] hover:text-[#1A2420]"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 bg-[#194B35] hover:bg-[#133A29] text-white rounded-xl text-xs font-bold tracking-wide flex items-center justify-center gap-2 transition active:scale-98 shadow-sm disabled:opacity-50"
                >
                  {isLoading ? "Updating..." : "Update Password & Sign In"}
                </button>

                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => setMode("request")}
                    className="text-[11px] font-bold text-[#5C6A64] hover:text-[#194B35] underline"
                  >
                    Need a new recovery link? Request one here
                  </button>
                </div>
              </form>
            )}

            {/* Back to Login Link */}
            <div className="mt-6 pt-4 border-t border-[#EDE6D8] flex items-center justify-between text-xs">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-[#194B35] font-bold hover:underline"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Sign In</span>
              </Link>
              <span className="text-[#5C6A64] text-[11px]">Help: 0494 2440228</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
