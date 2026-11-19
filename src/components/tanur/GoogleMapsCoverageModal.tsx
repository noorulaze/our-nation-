"use client";

import React from "react";
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  X, 
  MapPin, 
  Compass, 
  Layers, 
  Key, 
  ExternalLink,
  Info
} from "lucide-react";

interface GoogleMapsCoverageModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: "ml" | "en";
  hasApiKey: boolean;
}

export function GoogleMapsCoverageModal({
  isOpen,
  onClose,
  language = "ml",
  hasApiKey
}: GoogleMapsCoverageModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-[#EDE6D8] max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#194B35] text-white flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white/10 text-amber-300 text-[11px] font-bold border border-white/20">
              <Compass className="w-3.5 h-3.5" />
              <span>Google Maps Platform GIS Audit</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black font-malayalam-heading">
              {language === "ml"
                ? "താനൂർ നഗരസഭ — ഗൂഗിൾ മാപ്പ് കവറേജ് വിശകലനം"
                : "Tanur Municipality — Google Maps Coverage & Feasibility"}
            </h3>
            <p className="text-xs text-white/80">
              {language === "ml"
                ? "താനൂർ (10.9768° N, 75.8672° E) ലൊക്കേഷനിലെ ഗൂഗിൾ മാപ്പ്സ് പ്ലാറ്റ്‌ഫോം ഫീച്ചറുകളുടെ പരിശോധന."
                : "Verified coverage analysis for Tanur, Malappuram, Kerala (10.9768° N, 75.8672° E)."}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-[#1A2420] text-xs sm:text-sm">
          {/* Feature Support Matrix */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C39A5B] mb-3">
              {language === "ml" ? "1. ലഭ്യമായ ഫീച്ചറുകൾ (Feature Support Matrix)" : "1. Feature Support Matrix for Tanur, Kerala"}
            </h4>

            <div className="space-y-2.5">
              {/* Standard Roadmap */}
              <div className="p-3.5 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-0.5 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#194B35]">
                      {language === "ml" ? "സ്റ്റാൻഡേർഡ് റോഡ് മാപ്പ് (Standard Roadmap)" : "Standard 2D Roadmap View"}
                    </span>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {language === "ml" ? "ലഭ്യമാണ് (Supported)" : "Available"}
                    </span>
                  </div>
                  <p className="text-xs text-[#5C6A64]">
                    {language === "ml"
                      ? "താനൂർ നഗരസഭയിലെ മുഴുവൻ പ്രധാന റോഡുകൾ, റൂട്ടുകൾ, മലയാളം/ഇംഗ്ലീഷ് സ്ഥലനാമങ്ങൾ, റെയിൽവേ സ്റ്റേഷൻ, പൊതു സ്ഥാപനങ്ങൾ എന്നിവ വ്യക്തമായി കാണിക്കുന്നു."
                      : "Complete road network, bilingual (Malayalam & English) place names, railway lines, and government landmarks."}
                  </p>
                </div>
              </div>

              {/* 2D Satellite View */}
              <div className="p-3.5 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-0.5 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#194B35]">
                      {language === "ml" ? "ഹൈ-റെസലൂഷൻ സാറ്റലൈറ്റ് കാഴ്‌ച (2D Satellite / Hybrid)" : "High-Resolution 2D Satellite View"}
                    </span>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {language === "ml" ? "ലഭ്യമാണ് (Supported)" : "Available"}
                    </span>
                  </div>
                  <p className="text-xs text-[#5C6A64]">
                    {language === "ml"
                      ? "തീരദേശ തീരം, താനൂർ ഫിഷിംഗ് ഹാർബർ, പുലിമുട്ട്, തെങ്ങിൻതോപ്പുകൾ, നഗര കേന്ദ്രം എന്നിവയുടെ യഥാർത്ഥ ഏരിയൽ സാറ്റലൈറ്റ് ചിത്രങ്ങൾ ലഭ്യം."
                      : "High-resolution optical satellite imagery of Tanur coast, fishing harbour, breakwater, estuaries, and municipal area."}
                  </p>
                </div>
              </div>

              {/* 3D Terrain */}
              <div className="p-3.5 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-0.5 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#194B35]">
                      {language === "ml" ? "3D ടെറൈൻ & ഉയരക്കാഴ്‌ച (3D Terrain & DEM)" : "Google 3D Terrain & Topographical Relief"}
                    </span>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {language === "ml" ? "ലഭ്യമാണ് (Supported)" : "Available"}
                    </span>
                  </div>
                  <p className="text-xs text-[#5C6A64]">
                    {language === "ml"
                      ? "ഗൂഗിളിന്റെ ഡിജിറ്റൽ എലവേഷൻ മോഡൽ (DEM), ഭൂപ്രകൃതിയുടെ ഉയർച്ച-താഴ്ചകൾ, വെക്ടർ ക്യാമറ ടിൽറ്റ് (0° മുതൽ 67.5° വരെ), റൊട്ടേഷൻ എന്നിവ പൂർണ്ണമായി പ്രവർത്തിക്കുന്നു."
                      : "Topographical relief shading, contour elevation from Google DEM, and WebGL vector camera pitch/tilt and 360° rotation."}
                  </p>
                </div>
              </div>

              {/* Photorealistic 3D Tiles */}
              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-0.5 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-950">
                      {language === "ml" ? "ഫോട്ടോറിയലിസ്റ്റിക് 3D ടൈലുകൾ (3D Mesh Buildings)" : "Photorealistic 3D Tiles (3D Buildings)"}
                    </span>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                      {language === "ml" ? "താനൂരിൽ ലഭ്യമല്ല (Not in Tanur)" : "Unavailable in Tanur"}
                    </span>
                  </div>
                  <p className="text-xs text-amber-900/80">
                    {language === "ml"
                      ? "ഗൂഗിളിന്റെ ഫോട്ടോറിയലിസ്റ്റിക് 3D ബിൽഡിംഗ് മെഷ് ഇന്ത്യയിലെ പ്രധാന മെട്രോ നഗരങ്ങളിൽ (മുംബൈ, ഡൽഹി, ബെംഗളൂരു) മാത്രമാണ് ലഭ്യമാക്കിയിട്ടുള്ളത്. താനൂർ നഗരസഭയിൽ ഈ ഫീച്ചർ ഗൂഗിൾ നൽകുന്നില്ല. അതിനാൽ വ്യാജ 3D മോഡലുകൾ സൃഷ്ടിക്കാതെ, യഥാർത്ഥ 3D ടെറൈൻ കാഴ്‌ചയാണ് ഇവിടെ നൽകിയിരിക്കുന്നത്."
                      : "Google's aerial photogrammetry 3D building mesh is currently limited to tier-1 metropolitan cities in India. It is NOT available for Tanur Municipality. To maintain genuine civic integrity, we display authentic 3D Terrain elevation and tilted camera controls rather than fake geometry."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Technical & Billing Setup */}
          <div className="space-y-3 pt-2 border-t border-[#EDE6D8]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C39A5B]">
              {language === "ml" ? "2. സാങ്കേതികവും ബില്ലിംഗ് വിവരങ്ങളും (Setup & Requirements)" : "2. Technical & Billing Requirements"}
            </h4>

            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2.5">
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-[#194B35]" />
                <span className="font-bold text-xs text-gray-800">
                  {language === "ml" ? "എ.പി.ഐ കീ ക്രമീകരണം:" : "API Key Status:"}
                </span>
                {hasApiKey ? (
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY Configured ✓
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-bold">
                    Awaiting Key in .env.local (Using High-Res Dual Fallback)
                  </span>
                )}
              </div>

              <ul className="list-disc pl-5 text-xs text-[#5C6A64] space-y-1">
                <li>
                  <strong>Required Google Cloud APIs:</strong> Maps JavaScript API (mandatory for vector rendering, roadmap, satellite & terrain).
                </li>
                <li>
                  <strong>Security Best Practice:</strong> Restrict the API key in Google Cloud Console using <em>HTTP Referrer Restrictions</em> to authorized production domains (e.g. <code>https://tanur.ournation.in/*</code>) and <code>http://localhost:3000/*</code>.
                </li>
                <li>
                  <strong>Google Billing:</strong> Google Maps Platform provides a <strong>$200 monthly free tier credit</strong> per billing account, which provides approximately <strong>28,500 free dynamic map loads</strong> each month.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FAF7F0] border-t border-[#EDE6D8] flex items-center justify-between">
          <span className="text-[11px] text-[#5C6A64] flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Digital Tanur GIS Verified Data</span>
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#194B35] text-white rounded-xl text-xs font-bold hover:bg-[#123626] transition"
          >
            {language === "ml" ? "മനസ്സിലായി (Close)" : "Understood"}
          </button>
        </div>
      </div>
    </div>
  );
}
