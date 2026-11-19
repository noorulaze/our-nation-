"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/context";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import {
  Lock,
  Mail,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  CheckCircle2,
  ArrowLeft,
  ShieldCheck,
  AlertCircle,
  Building2,
  Info
} from "lucide-react";

interface AuthSplitScreenProps {
  initialMode: "login" | "register";
}

export function AuthSplitScreen({ initialMode }: AuthSplitScreenProps) {
  const router = useRouter();
  const { login, register, signInWithGoogle, resendVerificationEmail, isLoading } = useAuth();

  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [registeredEmail, setRegisteredEmail] = useState<string | null>(null);

  // Login form state
  const [loginEmail, setLoginEmail] = useState("fathima_tanur@example.com");
  const [loginPassword, setLoginPassword] = useState("password123");

  // Register form state
  const [regDisplayName, setRegDisplayName] = useState("");
  const [regUsername, setRegUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Password Strength Calculation
  const passwordStrength = useMemo(() => {
    if (!regPassword) return { score: 0, label: "None", color: "bg-stone-200" };
    let score = 0;
    if (regPassword.length >= 8) score++;
    if (/[A-Z]/.test(regPassword)) score++;
    if (/[0-9]/.test(regPassword)) score++;
    if (/[^A-Za-z0-9]/.test(regPassword)) score++;

    if (score === 1) return { score: 1, label: "Weak", color: "bg-red-500" };
    if (score === 2) return { score: 2, label: "Fair", color: "bg-amber-500" };
    if (score === 3) return { score: 3, label: "Good", color: "bg-blue-500" };
    return { score: 4, label: "Strong", color: "bg-[#194B35]" };
  }, [regPassword]);

  // Demo accounts
  const handleQuickLogin = (email: string, pass: string) => {
    setLoginEmail(email);
    setLoginPassword(pass);
    setErrorMsg("");
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    if (!loginEmail.trim()) {
      setErrorMsg("Please enter your registered email address or username.");
      return;
    }
    const result = await login(loginEmail, loginPassword);
    if (result.success) {
      router.push("/dashboard");
    } else {
      setErrorMsg(result.error || "Failed to sign in. Please verify your credentials.");
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!regDisplayName.trim()) {
      setErrorMsg("Please provide your full legal name.");
      return;
    }
    if (!regEmail.trim() || !regEmail.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    if (regPassword.length < 8) {
      setErrorMsg("Password must contain at least 8 characters.");
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setErrorMsg("Passwords do not match. Please re-enter.");
      return;
    }
    if (!termsAccepted) {
      setErrorMsg("You must accept the Terms of Service & Privacy Policy to create an account.");
      return;
    }

    const result = await register({
      email: regEmail,
      password: regPassword,
      username: regUsername.trim() || regEmail.split("@")[0].replace(/[^a-zA-Z0-9_]/g, "_"),
      displayName: regDisplayName.trim(),
      preferredLanguage: "en",
      termsAccepted: true
    });

    if (result.success) {
      setRegisteredEmail(regEmail);
      setSuccessMsg("Account registered successfully! An email verification request has been queued.");
    } else {
      setErrorMsg(result.error || "Registration failed. Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMsg("");
    const res = await signInWithGoogle();
    if (!res.success) {
      setErrorMsg(res.error || "Google Sign-In is unavailable in this environment.");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#FAF7F0] text-[#1A2420]">
      {/* LEFT COLUMN: Scenic Tanur Municipal Visual & Brand Guarantee */}
      <div className="relative w-full lg:w-1/2 min-h-[260px] sm:min-h-[340px] lg:min-h-screen flex flex-col justify-between p-6 sm:p-10 lg:p-16 overflow-hidden text-white">
        {/* Background Visual */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=80')",
          }}
        />

        {/* Deep Forest Green Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D241A] via-[#194B35]/90 to-black/60" />

        {/* Top Header Row with Return Home Link */}
        <div className="relative z-10 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 text-xs font-semibold text-white transition active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Homepage</span>
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-bold text-[#E5C17A]">
            <Sparkles className="w-3.5 h-3.5 text-[#E5C17A]" />
            <span>Official Civic Portal</span>
          </div>
        </div>

        {/* Center Editorial Brand Statement */}
        <div className="relative z-10 my-auto py-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 backdrop-blur-md text-xs font-bold text-[#E5C17A] mb-4">
            <Building2 className="w-3.5 h-3.5" />
            <span>Tanur Municipality • Malappuram</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-sans leading-tight tracking-tight text-white drop-shadow-md">
            Our People. <br />
            Our Place. <br />
            <span className="text-[#E5C17A]">Our Future.</span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-white/85 max-w-md leading-relaxed">
            Access statutory municipal records, report public issues across 45 statutory wards,
            track local infrastructure projects, and engage directly in civic governance.
          </p>

          {/* Civic Trust Pillar Indicators */}
          <div className="mt-8 grid grid-cols-2 gap-3 max-w-md pt-6 border-t border-white/15 text-xs text-white/90">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#E5C17A] shrink-0" />
              <span>45 Statutory Wards Mapped</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#E5C17A] shrink-0" />
              <span>Verified Civic Records</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#E5C17A] shrink-0" />
              <span>Direct Issue Resolution</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#E5C17A] shrink-0" />
              <span>Protected Citizen Privacy</span>
            </div>
          </div>
        </div>

        {/* Footer Guarantee */}
        <div className="relative z-10 text-[11px] text-white/60">
          Central Municipal Switchboard: <span className="text-[#E5C17A] font-semibold">0494 2440228</span> • Tanur Grade II Urban Local Body
        </div>
      </div>

      {/* RIGHT COLUMN: Authentication Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10 lg:p-16">
        <div className="w-full max-w-md space-y-6">
          {/* Header Title & Mode Toggle */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="inline-flex p-1 bg-[#F0EBE0] rounded-xl border border-[#EDE6D8]">
                <button
                  type="button"
                  onClick={() => {
                    setMode("login");
                    setErrorMsg("");
                    setSuccessMsg("");
                  }}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                    mode === "login"
                      ? "bg-[#194B35] text-white shadow-xs"
                      : "text-[#5C6A64] hover:text-[#1A2420]"
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode("register");
                    setErrorMsg("");
                    setSuccessMsg("");
                  }}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                    mode === "register"
                      ? "bg-[#194B35] text-white shadow-xs"
                      : "text-[#5C6A64] hover:text-[#1A2420]"
                  }`}
                >
                  Register
                </button>
              </div>

              <span className="text-xs text-[#5C6A64]">
                {mode === "login" ? "Resident & Staff Access" : "New Citizen Account"}
              </span>
            </div>

            <h2 className="text-2xl font-black text-[#194B35] tracking-tight">
              {mode === "login" ? "Sign In to OUR NATION" : "Create Citizen Account"}
            </h2>
            <p className="text-xs text-[#5C6A64] mt-1">
              {mode === "login"
                ? "Enter your credentials to access your citizen dashboard, reports, and services."
                : "Register to submit civic issues, track municipal progress, and follow public notices."}
            </p>
          </div>

          {/* Feedback Alerts */}
          {errorMsg && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div className="flex-1">{errorMsg}</div>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold">{successMsg}</p>
                {registeredEmail && (
                  <div className="mt-2 pt-2 border-t border-emerald-200/60 flex items-center justify-between">
                    <span className="text-[11px] text-emerald-700">Check inbox: {registeredEmail}</span>
                    <button
                      type="button"
                      onClick={() => resendVerificationEmail(registeredEmail)}
                      className="text-[11px] font-bold text-[#194B35] underline hover:no-underline"
                    >
                      Resend Link
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* LOGIN FORM */}
          {mode === "login" && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1A2420] mb-1.5">
                  Email Address or Username
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#5C6A64] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="e.g. resident@tanur.gov.in"
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-[#EDE6D8] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#194B35] focus:border-transparent transition"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-[#1A2420]">
                    Password
                  </label>
                  <Link
                    href="/reset-password"
                    className="text-[11px] font-bold text-[#194B35] hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#5C6A64] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter your account password"
                    className="w-full pl-10 pr-10 py-2.5 text-xs bg-white border border-[#EDE6D8] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#194B35] focus:border-transparent transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5C6A64] hover:text-[#1A2420]"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-[#5C6A64]">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded-md border-[#EDE6D8] text-[#194B35] focus:ring-[#194B35]"
                  />
                  <span>Remember this device</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-[#194B35] hover:bg-[#133A29] text-white rounded-xl text-xs font-bold tracking-wide flex items-center justify-center gap-2 transition active:scale-98 shadow-sm disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Signing in...</span>
                ) : (
                  <>
                    <span>Sign In to Citizen Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* OAuth / Google Sign-In */}
              <div className="pt-2">
                <div className="relative flex py-2 items-center">
                  <div className="grow border-t border-[#EDE6D8]"></div>
                  <span className="shrink mx-3 text-[11px] text-[#5C6A64] uppercase font-bold tracking-wider">
                    Or Continue With
                  </span>
                  <div className="grow border-t border-[#EDE6D8]"></div>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full py-2.5 px-4 bg-white hover:bg-[#FAF7F0] border border-[#EDE6D8] text-[#1A2420] rounded-xl text-xs font-bold flex items-center justify-center gap-2.5 transition active:scale-98 shadow-2xs"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Google Account</span>
                </button>
                {!isSupabaseConfigured() && (
                  <p className="text-[10px] text-[#5C6A64] text-center mt-1.5 flex items-center justify-center gap-1">
                    <Info className="w-3 h-3 text-[#C39A5B]" />
                    <span>Google OAuth requires production credentials. Use demo accounts below.</span>
                  </p>
                )}
              </div>

              {/* Quick Access Demo Credentials Selector */}
              <div className="pt-3 border-t border-[#EDE6D8]">
                <div className="text-[11px] font-bold text-[#5C6A64] mb-2">
                  One-Click Demo Credentials:
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleQuickLogin("fathima_tanur@example.com", "password123")}
                    className="p-2 text-left bg-white hover:bg-[#F5F1E7] border border-[#EDE6D8] rounded-lg transition text-[11px]"
                  >
                    <div className="font-bold text-[#194B35]">Citizen</div>
                    <div className="text-[#5C6A64] text-[10px] truncate">fathima_tanur</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickLogin("tanur_moderator@example.com", "password123")}
                    className="p-2 text-left bg-white hover:bg-[#F5F1E7] border border-[#EDE6D8] rounded-lg transition text-[11px]"
                  >
                    <div className="font-bold text-[#194B35]">Moderator</div>
                    <div className="text-[#5C6A64] text-[10px] truncate">tanur_moderator</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickLogin("admin_nammude@example.com", "password123")}
                    className="p-2 text-left bg-white hover:bg-[#F5F1E7] border border-[#EDE6D8] rounded-lg transition text-[11px]"
                  >
                    <div className="font-bold text-[#194B35]">Administrator</div>
                    <div className="text-[#5C6A64] text-[10px] truncate">admin_nammude</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickLogin("superadmin@tanur.gov.in", "password123")}
                    className="p-2 text-left bg-white hover:bg-[#F5F1E7] border border-[#EDE6D8] rounded-lg transition text-[11px]"
                  >
                    <div className="font-bold text-[#194B35]">Super Admin</div>
                    <div className="text-[#5C6A64] text-[10px] truncate">superadmin_tanur</div>
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* REGISTRATION FORM */}
          {mode === "register" && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#1A2420] mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#5C6A64] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={regDisplayName}
                    onChange={(e) => setRegDisplayName(e.target.value)}
                    placeholder="e.g. Fathima Suhara"
                    className="w-full pl-10 pr-4 py-2 text-xs bg-white border border-[#EDE6D8] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#194B35] focus:border-transparent transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A2420] mb-1">
                  Username (Optional)
                </label>
                <input
                  type="text"
                  value={regUsername}
                  onChange={(e) => setRegUsername(e.target.value)}
                  placeholder="e.g. fathima_tanur"
                  className="w-full px-4 py-2 text-xs bg-white border border-[#EDE6D8] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#194B35] focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A2420] mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#5C6A64] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="e.g. citizen@tanur.gov.in"
                    className="w-full pl-10 pr-4 py-2 text-xs bg-white border border-[#EDE6D8] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#194B35] focus:border-transparent transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A2420] mb-1">
                  Password (Minimum 8 Characters)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#5C6A64] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Create a strong password"
                    className="w-full pl-10 pr-10 py-2 text-xs bg-white border border-[#EDE6D8] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#194B35] focus:border-transparent transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5C6A64] hover:text-[#1A2420]"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Real-time Password Strength Meter */}
                {regPassword && (
                  <div className="mt-1.5 space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-[#5C6A64]">
                      <span>Password Strength:</span>
                      <span className="font-bold">{passwordStrength.label}</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#E5DFD3] rounded-full overflow-hidden flex gap-1">
                      {[1, 2, 3, 4].map((step) => (
                        <div
                          key={step}
                          className={`h-full flex-1 rounded-full transition-all ${
                            step <= passwordStrength.score ? passwordStrength.color : "bg-transparent"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A2420] mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#5C6A64] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="w-full pl-10 pr-10 py-2 text-xs bg-white border border-[#EDE6D8] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#194B35] focus:border-transparent transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5C6A64] hover:text-[#1A2420]"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {regConfirmPassword && regPassword !== regConfirmPassword && (
                  <span className="text-[10px] text-red-600 mt-1 block">Passwords do not match.</span>
                )}
              </div>

              <div className="pt-1">
                <label className="flex items-start gap-2 cursor-pointer text-[11px] text-[#5C6A64] leading-snug">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded-md border-[#EDE6D8] text-[#194B35] focus:ring-[#194B35]"
                  />
                  <span>
                    I accept the{" "}
                    <Link href="/terms" className="text-[#194B35] underline font-bold">
                      Terms of Service
                    </Link>{" "}
                    and acknowledge the{" "}
                    <Link href="/privacy" className="text-[#194B35] underline font-bold">
                      Civic Privacy Policy
                    </Link>
                    . All submitted issues remain part of the statutory municipal transparency archive.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 bg-[#194B35] hover:bg-[#133A29] text-white rounded-xl text-xs font-bold tracking-wide flex items-center justify-center gap-2 transition active:scale-98 shadow-sm disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Registering...</span>
                ) : (
                  <>
                    <span>Create Citizen Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Help & Switchboard */}
          <div className="pt-4 border-t border-[#EDE6D8] text-center text-xs text-[#5C6A64]">
            Need assistance accessing your account? <br />
            Contact Municipal Helpdesk:{" "}
            <a href="tel:04942440228" className="font-bold text-[#194B35] hover:underline">
              0494 2440228
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
