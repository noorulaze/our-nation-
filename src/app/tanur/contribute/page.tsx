"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { TanurNav } from "@/components/tanur/TanurNav";
import {
  PenTool,
  UploadCloud,
  CheckCircle2,
  BookOpen,
  Newspaper,
  Image as ImageIcon,
  Building2,
  ShieldCheck,
  Send,
  Sparkles,
  Info,
  Clock,
  MapPin,
  AlertCircle,
} from "lucide-react";

type ContributionType = "memoir" | "news" | "photo" | "business";

export default function TanurContributePage() {
  const [selectedType, setSelectedType] = useState<ContributionType>("memoir");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    location: "Tanur Municipality",
    title: "",
    description: "",
    sourceOrOrigin: "",
    photoUrl: "",
    agreeToGuidelines: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.title || !formData.description || !formData.agreeToGuidelines) {
      alert("ദയവായി എല്ലാ ആവശ്യ വിവരങ്ങളും പൂരിപ്പിച്ച് നിബന്ധനകൾ അംഗീകരിക്കുക.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setReferenceId(`TNR-${Math.floor(100000 + Math.random() * 900000)}`);
      setIsSubmitted(true);
    }, 900);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      contact: "",
      location: "Tanur Municipality",
      title: "",
      description: "",
      sourceOrOrigin: "",
      photoUrl: "",
      agreeToGuidelines: false,
    });
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
      <Navbar />
      <TanurNav />

      <main className="flex-1 pb-16">
        {/* Hero Section */}
        <section className="relative h-[260px] sm:h-[340px] overflow-hidden flex items-end">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://upload.wikimedia.org/wikipedia/commons/6/67/Tanur%2C_Malappuram_district.jpg')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#081B12] via-[#0E2C1E]/80 to-black/40" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8 sm:pb-10 text-white">
            <div className="flex items-center gap-2 text-xs font-medium text-amber-200/90 mb-2">
              <Link href="/tanur" className="hover:underline">
                താനൂർ
              </Link>
              <span>/</span>
              <span>പങ്കുവെക്കാം</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold text-amber-300 mb-2">
              <PenTool className="w-3.5 h-3.5" />
              <span>കമ്മ്യൂണിറ്റി പങ്കാളിത്തം • Community Archive</span>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-malayalam-heading">
              താനൂരിന്റെ ചരിത്രവും കഥകളും പങ്കുവെക്കാം
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-stone-200 font-malayalam-body max-w-2xl leading-relaxed">
              താനൂരിലെ പൂർവ്വികരുടെ ഓർമ്മകൾ, പ്രാദേശിക ചരിത്രക്കുറിപ്പുകൾ, പുരാതന ഫോട്ടോകൾ, സാംസ്കാരിക വിശേഷങ്ങൾ നമ്മുടെ നാട് ഡിജിറ്റൽ ശേഖരത്തിലേക്ക് സമർപ്പിക്കാം.
            </p>
          </div>
        </section>

        {/* Content Container */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          {/* Submission Guidelines Alert */}
          <div className="bg-[#E8F2EC] border border-[#C6DEC9] rounded-2xl p-4 sm:p-5 flex items-start gap-3 mb-8">
            <ShieldCheck className="w-5 h-5 text-[#1B4D36] shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs text-[#1B4D36] font-malayalam-body">
              <strong className="font-malayalam-heading text-sm">
                കമ്മ്യൂണിറ്റി പരിശോധനാ നയം (Editorial Verification):
              </strong>
              <p className="leading-relaxed">
                നമ്മുടെ നാട് താനൂർ ഡിജിറ്റൽ പ്രൊഫൈലിലേക്ക് ലഭിക്കുന്ന വിവരങ്ങൾ ആധികാരികതയും സാംസ്കാരിക മൂല്യവും പരിശോധിച്ച് ഉറപ്പുവരുത്തിയ ശേഷമാണ് പ്രസിദ്ധീകരിക്കുക. കൃത്യമായ ഉറവിടങ്ങളും ചരിത്ര പ്രാമാണികതയും സൂചിപ്പിക്കാൻ ശ്രദ്ധിക്കുക.
              </p>
            </div>
          </div>

          {!isSubmitted ? (
            <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-10 shadow-card">
              {/* Type Selectors */}
              <div className="space-y-3 mb-8">
                <label className="text-xs font-bold font-malayalam-heading text-[#1B4D36] uppercase tracking-wider block">
                  1. സമർപ്പണ വിഭാഗം തിരഞ്ഞെടുക്കുക (Select Category)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    {
                      id: "memoir",
                      label: "ചരിത്രം & ഓർമ്മകൾ",
                      enLabel: "Memoir & History",
                      icon: BookOpen,
                    },
                    {
                      id: "news",
                      label: "പ്രാദേശിക വാർത്ത",
                      enLabel: "Local News / Event",
                      icon: Newspaper,
                    },
                    {
                      id: "photo",
                      label: "പൈതൃക ഫോട്ടോ",
                      enLabel: "Heritage Photo",
                      icon: ImageIcon,
                    },
                    {
                      id: "business",
                      label: "സ്ഥാപനം / വ്യാപാരം",
                      enLabel: "Business / Institution",
                      icon: Building2,
                    },
                  ].map((type) => {
                    const Icon = type.icon;
                    const isSelected = selectedType === type.id;
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setSelectedType(type.id as ContributionType)}
                        className={`p-3.5 rounded-2xl border text-left transition flex flex-col justify-between ${
                          isSelected
                            ? "bg-[#1B4D36] text-white border-[#1B4D36] shadow-sm"
                            : "bg-[#FAF7F0] text-[#4A5752] border-[#EDE6D8] hover:border-[#1B4D36]/40"
                        }`}
                      >
                        <Icon className={`w-5 h-5 mb-2 ${isSelected ? "text-amber-300" : "text-[#1B4D36]"}`} />
                        <div>
                          <div className="text-xs font-bold font-malayalam-heading leading-tight">
                            {type.label}
                          </div>
                          <div className={`text-[10px] mt-0.5 ${isSelected ? "text-stone-300" : "text-[#7A8680]"}`}>
                            {type.enLabel}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Form Fields */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="border-t border-[#F0EAE1] pt-6 space-y-4">
                  <span className="text-xs font-bold font-malayalam-heading text-[#1B4D36] uppercase tracking-wider block">
                    2. വിവരങ്ങൾ രേഖപ്പെടുത്തുക (Enter Information)
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#1A2420] font-malayalam-body mb-1">
                        നിങ്ങളുടെ പേര് (Your Name) *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="ഉദാ: പി. മുഹമ്മദ് കുട്ടി"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#EDE6D8] bg-[#FAF7F0] text-xs focus:outline-none focus:ring-2 focus:ring-[#1B4D36] focus:bg-white transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1A2420] font-malayalam-body mb-1">
                        ഫോൺ നമ്പർ / ഇമെയിൽ (Contact) *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        placeholder="+91 അല്ലെങ്കിൽ ഇമെയിൽ"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#EDE6D8] bg-[#FAF7F0] text-xs focus:outline-none focus:ring-2 focus:ring-[#1B4D36] focus:bg-white transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A2420] font-malayalam-body mb-1">
                      താനൂരിലെ പ്രദേശം / വാർഡ് (Ward / Locality in Tanur)
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="ഉദാ: ഹാർബർ വാർഡ്, ഒട്ടുംപുറം, സ്റ്റേഷൻ റോഡ്"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#EDE6D8] bg-[#FAF7F0] text-xs focus:outline-none focus:ring-2 focus:ring-[#1B4D36] focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A2420] font-malayalam-body mb-1">
                      തലക്കെട്ട് (Title / Topic) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="ഉദാ: 1970-കളിലെ താനൂർ ചാപ്പയും ഉപ്പിലിട്ട മത്സ്യവ്യാപാരവും"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#EDE6D8] bg-[#FAF7F0] text-xs focus:outline-none focus:ring-2 focus:ring-[#1B4D36] focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A2420] font-malayalam-body mb-1">
                      വിശദമായ വിവരണം / ഓർമ്മക്കുറിപ്പ് (Full Story / Description) *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="വിശദമായ വിവരങ്ങൾ, സംഭവങ്ങൾ, ഉൾപ്പെട്ട വ്യക്തികൾ, കാലഘട്ടം എന്നിവ രേഖപ്പെടുത്തുക..."
                      className="w-full px-4 py-2.5 rounded-xl border border-[#EDE6D8] bg-[#FAF7F0] text-xs font-malayalam-body focus:outline-none focus:ring-2 focus:ring-[#1B4D36] focus:bg-white transition leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A2420] font-malayalam-body mb-1">
                      വിവര ഉറവിടം / രേഖകൾ (Source / References)
                    </label>
                    <input
                      type="text"
                      value={formData.sourceOrOrigin}
                      onChange={(e) => setFormData({ ...formData, sourceOrOrigin: e.target.value })}
                      placeholder="ഉദാ: കുടുംബ ഡയറിക്കുറിപ്പുകൾ, പഴയ ഫോട്ടോ, നേരിട്ടുള്ള അനുഭവം"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#EDE6D8] bg-[#FAF7F0] text-xs focus:outline-none focus:ring-2 focus:ring-[#1B4D36] focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A2420] font-malayalam-body mb-1">
                      ചിത്രത്തിന്റെ ലിങ്ക് (Photo URL if available)
                    </label>
                    <input
                      type="url"
                      value={formData.photoUrl}
                      onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-4 py-2.5 rounded-xl border border-[#EDE6D8] bg-[#FAF7F0] text-xs focus:outline-none focus:ring-2 focus:ring-[#1B4D36] focus:bg-white transition"
                    />
                  </div>

                  {/* Declaration checkbox */}
                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.agreeToGuidelines}
                        onChange={(e) => setFormData({ ...formData, agreeToGuidelines: e.target.checked })}
                        className="mt-0.5 rounded border-[#EDE6D8] text-[#1B4D36] focus:ring-[#1B4D36]"
                      />
                      <span className="text-xs text-[#5C6A64] font-malayalam-body leading-relaxed">
                        നൽകിയ വിവരങ്ങൾ സത്യസന്ധവും യഥാർത്ഥവുമാണെന്നും, വ്യാജവാർത്തകളോ അപകീർത്തികരമായ പരാമർശങ്ങളോ ഇല്ലെന്നും സാക്ഷ്യപ്പെടുത്തുന്നു.
                      </span>
                    </label>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-[#1B4D36] hover:bg-[#133827] text-white font-bold font-malayalam-heading text-sm transition shadow-md disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>സമർപ്പിക്കുന്നു...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>വിവരങ്ങൾ സമർപ്പിക്കുക</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-[#C6DEC9] p-8 sm:p-12 text-center shadow-card space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#E8F2EC] text-[#1B4D36] flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold font-malayalam-heading text-[#1B4D36]">
                നന്ദി! വിവരങ്ങൾ വിജയകരമായി സ്വീകരിച്ചു
              </h2>
              <p className="text-xs sm:text-sm text-[#4A5752] font-malayalam-body max-w-md mx-auto leading-relaxed">
                താനൂരിന്റെ ഡിജിറ്റൽ ശേഖരത്തിലേക്ക് താങ്കൾ നൽകിയ വിവരങ്ങൾ പരിശോധനയ്ക്കായി രേഖപ്പെടുത്തിയിട്ടുണ്ട്.
              </p>
              <div className="inline-block px-4 py-2 rounded-xl bg-[#FAF7F0] border border-[#EDE6D8] text-xs font-mono font-bold text-[#1B4D36]">
                റഫറൻസ് ടോക്കൺ: {referenceId}
              </div>
              <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 rounded-xl bg-[#FAF7F0] hover:bg-[#EDE6D8] text-[#1B4D36] font-bold text-xs transition border border-[#EDE6D8]"
                >
                  മറ്റൊരു വിവരം സമർപ്പിക്കുക
                </button>
                <Link
                  href="/tanur"
                  className="px-5 py-2.5 rounded-xl bg-[#1B4D36] hover:bg-[#133827] text-white font-bold text-xs transition"
                >
                  താനൂർ പ്രൊഫൈലിലേക്ക് മടങ്ങുക
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
