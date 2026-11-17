"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { KeralaLogo } from "@/components/layout/KeralaLogo";
import { useLanguage } from "@/lib/i18n/context";
import { useAuth } from "@/lib/auth/context";
import {
  Lock,
  Mail,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  MapPin,
  CheckCircle2,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";

interface AuthSplitScreenProps {
  initialMode: "login" | "register";
}

const keralaDistricts = [
  "തിരുവനന്തപുരം (Thiruvananthapuram)",
  "കൊല്ലം (Kollam)",
  "പത്തനംതിട്ട (Pathanamthitta)",
  "ആലപ്പുഴ (Alappuzha)",
  "കോട്ടയം (Kottayam)",
  "ഇടുക്കി (Idukki)",
  "എറണാകുളം (Ernakulam)",
  "തൃശ്ശൂർ (Thrissur)",
  "പാലക്കാട് (Palakkad)",
  "മലപ്പുറം (Malappuram)",
  "കോഴിക്കോട് (Kozhikode)",
  "വയനാട് (Wayanad)",
  "കണ്ണൂർ (Kannur)",
  "കാസർഗോഡ് (Kasaragod)",
];

export function AuthSplitScreen({ initialMode }: AuthSplitScreenProps) {
  const router = useRouter();
  const { t } = useLanguage();
  const { login, register, isLoading } = useAuth();

  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [forgotPasswordNotice, setForgotPasswordNotice] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState("admin_nammude@example.com");
  const [loginPassword, setLoginPassword] = useState("password123");

  // Register form state
  const [regDisplayName, setRegDisplayName] = useState("");
  const [regUsername, setRegUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regDistrict, setRegDistrict] = useState(keralaDistricts[0]);
  const [regLanguage, setRegLanguage] = useState<"ml" | "en">("ml");
  const [termsAccepted, setTermsAccepted] = useState(true);

  // Demo account quick switch
  const handleQuickLogin = (email: string, pass: string) => {
    setLoginEmail(email);
    setLoginPassword(pass);
    setErrorMsg("");
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    const result = await login(loginEmail, loginPassword);
    if (result.success) {
      router.push("/");
    } else {
      setErrorMsg(result.error || "Login failed");
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!termsAccepted) {
      setErrorMsg("ദയവായി സേവന നിബന്ധനകൾ അംഗീകരിക്കുക.");
      return;
    }
    const result = await register({
      email: regEmail,
      password: regPassword,
      username: regUsername || regEmail.split("@")[0],
      displayName: regDisplayName || regEmail.split("@")[0],
      preferredLanguage: regLanguage,
    });
    if (result.success) {
      router.push("/");
    } else {
      setErrorMsg(result.error || "Registration failed");
    }
  };

  const handleSocialMock = async (provider: string) => {
    setErrorMsg("");
    const mockEmail = `${provider.toLowerCase()}_user@nammudenaadu.in`;
    const result = await login(mockEmail, "password123");
    if (result.success) {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#FAF7F0] text-[#1A2420]">
      {/* LEFT COLUMN: Scenic Kerala Landscape & Editorial Showcase */}
      <div className="relative w-full lg:w-1/2 min-h-[380px] lg:min-h-screen flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-hidden text-white">
        {/* Background Image: Kerala Backwaters & Sunset */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=80')",
          }}
        />

        {/* Deep Kerala Palm Green & Warm Sunset Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#091D13] via-[#1B4D36]/85 to-black/50" />

        {/* Subtle traditional lattice / ornamental pattern */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Top Header Row with Return Home Link */}
        <div className="relative z-10 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-md border border-white/20 text-xs font-semibold text-white transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>ഹോമിലേക്ക് മടങ്ങാം</span>
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-bold text-amber-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>നമ്മുടെ നാട് • കേരളം</span>
          </div>
        </div>

        {/* Center Content: Brand & Emotional Promise */}
        <div className="relative z-10 my-auto py-8">
          <div className="mb-4 inline-block">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 inline-block shadow-lg">
              <KeralaLogo variant="dark" />
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black font-malayalam-heading leading-tight tracking-tight text-white drop-shadow-md">
            നാടിനായി... <br />
            <span className="text-amber-300">എപ്പോഴും ഒപ്പം...</span>
          </h1>

          <p className="mt-4 text-xs sm:text-sm lg:text-base text-stone-200 font-malayalam-body leading-relaxed max-w-lg drop-shadow">
            കേരളത്തിലെ 14 ജില്ലകളിലെയും പ്രാദേശിക വാർത്തകൾ, ഉത്സവങ്ങൾ, കലകൾ, സേവനങ്ങൾ, വിദ്യാഭ്യാസ വിവരങ്ങൾ — എല്ലാം വിരൽത്തുമ്പിൽ.
          </p>

          {/* District & Community Stats Badge */}
          <div className="mt-6 flex flex-wrap gap-2.5">
            <span className="px-3 py-1 rounded-lg bg-white/15 backdrop-blur-md border border-white/20 text-[11px] font-bold text-white">
              📍 14 ജില്ലകൾ
            </span>
            <span className="px-3 py-1 rounded-lg bg-white/15 backdrop-blur-md border border-white/20 text-[11px] font-bold text-white">
              🌿 3.5 കോടി ജനങ്ങൾ
            </span>
            <span className="px-3 py-1 rounded-lg bg-white/15 backdrop-blur-md border border-white/20 text-[11px] font-bold text-amber-300">
              ✨ 100% സൗജന്യം
            </span>
          </div>
        </div>

        {/* Bottom Floating Testimonial Card */}
        <div className="relative z-10 pt-4 border-t border-white/15">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 max-w-md">
            <p className="text-xs text-stone-200 font-malayalam-body italic leading-relaxed">
              &ldquo;ഒരു നാടിന്റെ സമഗ്ര വിവരങ്ങളും ഒരൊറ്റ കുടക്കീഴിൽ ലഭ്യമാകുന്ന കേരളത്തിന്റെ ആദ്യ ഡിജിറ്റൽ ജനകീയ കൂട്ടായ്മ.&rdquo;
            </p>
            <div className="mt-2 flex items-center justify-between text-[10px] text-amber-200/90 font-medium">
              <span>നമ്മുടെ നാട് സമിതി</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                സുരക്ഷിതവും സുതാര്യവും
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Clean Split-Screen Authentication Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-md bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-9 shadow-card">
          {/* Dual Tab Switcher matching Row 3, Col 3 in reference collage */}
          <div className="grid grid-cols-2 p-1 rounded-2xl bg-[#F4EFE6] border border-[#E5DEC9] mb-6">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setErrorMsg("");
              }}
              className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold font-malayalam-heading transition-all ${
                mode === "login"
                  ? "bg-[#1B4D36] text-white shadow-sm"
                  : "text-[#5C6A64] hover:text-[#1A2420]"
              }`}
            >
              പ്രവേശിക്കുക (Login)
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("register");
                setErrorMsg("");
              }}
              className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold font-malayalam-heading transition-all ${
                mode === "register"
                  ? "bg-[#1B4D36] text-white shadow-sm"
                  : "text-[#5C6A64] hover:text-[#1A2420]"
              }`}
            >
              രജിസ്റ്റർ ചെയ്യുക (Sign Up)
            </button>
          </div>

          {/* Error Message Alert */}
          {errorMsg && (
            <div className="mb-5 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
              {errorMsg}
            </div>
          )}

          {/* Forgot Password Alert Notice */}
          {forgotPasswordNotice && (
            <div className="mb-5 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-malayalam-body">
              പാസ്‌വേഡ് റീസെറ്റ് ചെയ്യാനുള്ള ലിങ്ക് നിങ്ങളുടെ ഇമെയിലിലേക്ക് അയച്ചിട്ടുണ്ട്. ദയവായി ഇൻബോക്സ് പരിശോധിക്കുക.
            </div>
          )}

          {/* ======================= LOGIN VIEW ======================= */}
          {mode === "login" ? (
            <div>
              <div className="mb-6">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#B87A1E] font-malayalam-body">
                  സ്വാഗതം
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-malayalam-serif text-[#1B4D36] mt-0.5">
                  അക്കൗണ്ടിലേക്ക് പ്രവേശിക്കൂ
                </h2>
                <p className="text-xs text-[#5C6A64] font-malayalam-body mt-1">
                  നിങ്ങളുടെ ഇമെയിലും പാസ്‌വേഡും നൽകി പ്രവേശിക്കുക
                </p>
              </div>

              {/* Quick Demo Login selector */}
              <div className="mb-5 p-3 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8]">
                <div className="text-[11px] font-bold text-[#5C6A64] mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#B87A1E]" />
                  <span>ഡെമോ അക്കൗണ്ടുകൾ (Quick Test Accounts):</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleQuickLogin("admin_nammude@example.com", "password123")}
                    className="px-2 py-1.5 rounded-xl bg-white hover:bg-[#E8F2EC] border border-[#DDD5C5] text-[10px] font-bold text-[#1B4D36] transition"
                  >
                    👑 അഡ്മിൻ
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickLogin("resident@nammudenaadu.in", "password123")}
                    className="px-2 py-1.5 rounded-xl bg-white hover:bg-[#E8F2EC] border border-[#DDD5C5] text-[10px] font-bold text-[#1B4D36] transition"
                  >
                    🏡 റസിഡന്റ്
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickLogin("moderator@nammudenaadu.in", "password123")}
                    className="px-2 py-1.5 rounded-xl bg-white hover:bg-[#E8F2EC] border border-[#DDD5C5] text-[10px] font-bold text-[#1B4D36] transition"
                  >
                    🛡️ മോഡറേറ്റർ
                  </button>
                </div>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {/* Email / Username */}
                <div>
                  <label className="block text-xs font-bold text-[#1A2420] mb-1 font-malayalam-body">
                    ഇമെയിൽ അല്ലെങ്കിൽ യൂസർനെയിം
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-[#7A8880]" />
                    <input
                      type="text"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-none focus:ring-2 focus:ring-[#1B4D36]"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-[#1A2420] font-malayalam-body">
                      പാസ്‌വേഡ്
                    </label>
                    <button
                      type="button"
                      onClick={() => setForgotPasswordNotice(true)}
                      className="text-[11px] font-bold text-[#1B4D36] hover:underline"
                    >
                      പാസ്‌വേഡ് മറന്നോ?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-[#7A8880]" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-none focus:ring-2 focus:ring-[#1B4D36]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3.5 text-[#7A8880] hover:text-[#1A2420]"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-[#1B4D36] focus:ring-[#1B4D36] border-[#DDD5C5]"
                  />
                  <label htmlFor="rememberMe" className="text-xs text-[#5C6A64] font-malayalam-body">
                    എന്നെ ഓർമ്മിക്കുക (Remember me)
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-xl bg-[#1B4D36] hover:bg-[#133A28] disabled:opacity-50 text-white font-bold text-xs sm:text-sm transition active:scale-95 shadow-md flex items-center justify-center gap-2 mt-2"
                >
                  <span>{isLoading ? "പ്രവേശിക്കുന്നു..." : "പ്രവേശിക്കുക"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Social Login Separator */}
              <div className="relative my-6 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#EDE6D8]" />
                </div>
                <span className="relative px-3 bg-white text-[11px] font-bold text-[#7A8880] uppercase">
                  അല്ലെങ്കിൽ തുടരുക
                </span>
              </div>

              {/* Social Buttons */}
              <div className="grid grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => handleSocialMock("Google")}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] hover:bg-white text-xs font-bold text-[#1A2420] transition"
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
                  <span className="hidden sm:inline">Google</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialMock("Facebook")}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] hover:bg-white text-xs font-bold text-[#1A2420] transition"
                >
                  <svg className="w-4 h-4 fill-[#1877F2]" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span className="hidden sm:inline">Facebook</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialMock("Apple")}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] hover:bg-white text-xs font-bold text-[#1A2420] transition"
                >
                  <svg className="w-4 h-4 fill-black" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.84c.62-.75 1.04-1.8 0.92-2.84-.9.04-1.99.6-2.64 1.35-.58.67-.99 1.74-.85 2.76.99.08 2.02-.52 2.57-1.27z" />
                  </svg>
                  <span className="hidden sm:inline">Apple</span>
                </button>
              </div>

              {/* Bottom toggle prompt */}
              <div className="mt-6 pt-5 border-t border-[#EDE6D8] text-center text-xs text-[#5C6A64]">
                ഇതുവരെ അക്കൗണ്ട് ഇല്ലേ?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("register");
                    setErrorMsg("");
                  }}
                  className="font-bold text-[#1B4D36] hover:underline"
                >
                  ഇവിടെ ക്ലിക്ക് ചെയ്ത് രജിസ്റ്റർ ചെയ്യൂ
                </button>
              </div>
            </div>
          ) : (
            /* ======================= REGISTER VIEW ======================= */
            <div>
              <div className="mb-6">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#B87A1E] font-malayalam-body">
                  പുതിയ തുടക്കം
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-malayalam-serif text-[#1B4D36] mt-0.5">
                  സൗജന്യ അക്കൗണ്ട് തുറക്കൂ
                </h2>
                <p className="text-xs text-[#5C6A64] font-malayalam-body mt-1">
                  നമ്മുടെ നാടിന്റെ ഭാഗമാകൂ — ഇപ്പോൾ തന്നെ രജിസ്റ്റർ ചെയ്യാം
                </p>
              </div>

              <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-[#1A2420] mb-1 font-malayalam-body">
                    പൂർണ്ണ നാമം (Full Name) *
                  </label>
                  <input
                    type="text"
                    required
                    value={regDisplayName}
                    onChange={(e) => setRegDisplayName(e.target.value)}
                    placeholder="ഉദാ: രോഹിത് വർമ്മ"
                    className="w-full px-4 py-2 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-none focus:ring-2 focus:ring-[#1B4D36]"
                  />
                </div>

                {/* Username */}
                <div>
                  <label className="block text-xs font-bold text-[#1A2420] mb-1 font-malayalam-body">
                    യൂസർനെയിം (Username) *
                  </label>
                  <input
                    type="text"
                    required
                    value={regUsername}
                    onChange={(e) =>
                      setRegUsername(e.target.value.toLowerCase().replace(/\s+/g, "_"))
                    }
                    placeholder="rohith_v"
                    className="w-full px-4 py-2 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-none focus:ring-2 focus:ring-[#1B4D36]"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-[#1A2420] mb-1 font-malayalam-body">
                    ഇമെയിൽ വിലാസം *
                  </label>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-4 py-2 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-none focus:ring-2 focus:ring-[#1B4D36]"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-bold text-[#1A2420] mb-1 font-malayalam-body">
                    പാസ്‌വേഡ് (കുറഞ്ഞത് 6 അക്ഷരങ്ങൾ) *
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-none focus:ring-2 focus:ring-[#1B4D36]"
                  />
                </div>

                {/* District & Language Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#1A2420] mb-1 font-malayalam-body">
                      ജില്ല (District)
                    </label>
                    <select
                      value={regDistrict}
                      onChange={(e) => setRegDistrict(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-none focus:ring-2 focus:ring-[#1B4D36]"
                    >
                      {keralaDistricts.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A2420] mb-1 font-malayalam-body">
                      മുൻഗണനാ ഭാഷ
                    </label>
                    <select
                      value={regLanguage}
                      onChange={(e) => setRegLanguage(e.target.value as "ml" | "en")}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-none focus:ring-2 focus:ring-[#1B4D36]"
                    >
                      <option value="ml">മലയാളം (Malayalam)</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                </div>

                {/* Terms agreement */}
                <div className="flex items-start gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="termsAccepted"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="w-4 h-4 rounded text-[#1B4D36] focus:ring-[#1B4D36] border-[#DDD5C5] mt-0.5"
                  />
                  <label htmlFor="termsAccepted" className="text-[11px] text-[#5C6A64] font-malayalam-body leading-tight">
                    ഞാൻ സേവന നിബന്ധനകളും സ്വകാര്യതാ നയവും വായിച്ചു മനസ്സിലാക്കി അംഗീകരിക്കുന്നു.
                  </label>
                </div>

                {/* Register Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-xl bg-[#1B4D36] hover:bg-[#133A28] disabled:opacity-50 text-white font-bold text-xs sm:text-sm transition active:scale-95 shadow-md flex items-center justify-center gap-2 mt-2"
                >
                  <span>{isLoading ? "അക്കൗണ്ട് സൃഷ്ടിക്കുന്നു..." : "അക്കൗണ്ട് തുറക്കൂ"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Bottom toggle prompt */}
              <div className="mt-5 pt-4 border-t border-[#EDE6D8] text-center text-xs text-[#5C6A64]">
                ഇതിനകം അക്കൗണ്ട് ഉണ്ടോ?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("login");
                    setErrorMsg("");
                  }}
                  className="font-bold text-[#1B4D36] hover:underline"
                >
                  ഇവിടെ പ്രവേശിക്കൂ
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
