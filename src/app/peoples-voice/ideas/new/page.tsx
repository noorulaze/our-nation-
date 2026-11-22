"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { PeoplesVoiceNav } from "@/components/peoples-voice/PeoplesVoiceNav";
import { useLanguage } from "@/lib/i18n/context";
import { useAuth } from "@/lib/auth/context";
import { 
  peoplesVoiceStore, 
  PEOPLES_VOICE_IDEA_CATEGORIES 
} from "@/lib/data/peoplesVoiceData";
import { IdeaCategory } from "@/types/peoplesVoice";
import {
  Lightbulb,
  Send,
  Sparkles,
  MapPin,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  ShieldCheck,
  Building2,
  Banknote
} from "lucide-react";

export default function SubmitIdeaPage() {
  const { language } = useLanguage();
  const { user } = useAuth();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [titleMl, setTitleMl] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionMl, setDescriptionMl] = useState("");
  const [category, setCategory] = useState<IdeaCategory>("roads_transport");
  const [locality, setLocality] = useState("Tanur Town");
  const [wardNumber, setWardNumber] = useState<number>(1);
  const [expectedBenefit, setExpectedBenefit] = useState("");
  const [estimatedCost, setEstimatedCost] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [agreedToGuidelines, setAgreedToGuidelines] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const localities = [
    { value: "Tanur Town", label: "Tanur Town (താനൂർ ടൗൺ)" },
    { value: "Rayirimangalam", label: "Rayirimangalam (രായിരിമംഗലം)" },
    { value: "Theeradesham (Beach)", label: "Theeradesham / Beach (തീരദേശം / ബീച്ച്)" },
    { value: "Harbour Central", label: "Harbour Central (ഹാർബർ സെൻട്രൽ)" },
    { value: "Devadhar", label: "Devadhar (ദേവധാർ)" },
    { value: "Karianode", label: "Karianode (കരിയാനോട്)" },
    { value: "Meenadathur", label: "Meenadathur (മീനടത്തൂർ)" },
    { value: "Chiramangalam", label: "Chiramangalam (ചീരമംഗലം)" },
    { value: "Pattaruparambu", label: "Pattaruparambu (പട്ടരുപറമ്പ്)" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!title.trim()) {
      setErrorMessage(language === "ml" ? "ദയവായി ആശയത്തിന്റെ തലക്കെട്ട് നൽകുക." : "Please provide a title for your idea.");
      return;
    }

    if (!description.trim() || description.length < 20) {
      setErrorMessage(
        language === "ml"
          ? "ദയവായി ആശയത്തെക്കുറിച്ച് വിശദമായ വിവരണം (കുറഞ്ഞത് 20 അക്ഷരങ്ങൾ) നൽകുക."
          : "Please provide a detailed description (at least 20 characters) explaining your proposal."
      );
      return;
    }

    if (!expectedBenefit.trim()) {
      setErrorMessage(
        language === "ml"
          ? "ഈ ആശയം നടപ്പിലാക്കിയാൽ താനൂരിന് ലഭിക്കുന്ന പ്രയോജനം വ്യക്തമാക്കുക."
          : "Please describe the expected community benefit."
      );
      return;
    }

    if (!agreedToGuidelines) {
      setErrorMessage(
        language === "ml"
          ? "നിങ്ങൾ സമർപ്പിക്കുന്ന വിവരങ്ങൾ താനൂരിന്റെ വികസനത്തിനായുള്ളതാണെന്ന് സമ്മതിക്കുക."
          : "Please accept the community constructive participation pledge."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const selectedCatObj = PEOPLES_VOICE_IDEA_CATEGORIES.find(c => c.key === category);
      const authorName = isAnonymous 
        ? (language === "ml" ? "താനൂർ നിവാസി (അജ്ഞാതൻ)" : "Tanur Resident (Anonymous)")
        : (user?.display_name || user?.username || "Tanur Resident");

      const created = peoplesVoiceStore.addIdea({
        title,
        title_ml: titleMl || title,
        description,
        description_ml: descriptionMl || description,
        category,
        category_name: selectedCatObj?.label || "Community Idea",
        category_name_ml: selectedCatObj?.label_ml || "പൊതു ആശയം",
        locality,
        locality_ml: locality,
        ward_number: wardNumber > 0 ? wardNumber : undefined,
        author_id: user?.id || "usr-" + Date.now(),
        author_name: authorName,
        is_anonymous: isAnonymous,
        images: imageUrl ? [imageUrl] : [],
        expected_benefit: expectedBenefit,
        expected_benefit_ml: expectedBenefit,
        estimated_cost: estimatedCost ? estimatedCost : undefined,
        estimated_cost_note: estimatedCost ? "Community-provided rough estimate" : undefined,
        status: "Submitted"
      });

      router.push(`/peoples-voice/ideas/${created.id}`);
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error ? err.message : "An error occurred while creating the idea."
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#252A25] pb-24">
      <Navbar />
      <PeoplesVoiceNav />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Back Link */}
        <Link
          href="/peoples-voice/ideas"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5C6A64] hover:text-[#194B35] mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{language === "ml" ? "ആശയങ്ങളുടെ പട്ടികയിലേക്ക് മടങ്ങാം" : "Back to Ideas Register"}</span>
        </Link>

        {/* Header */}
        <div className="mb-6">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#EAE2D0] text-[#194B35] border border-[#DDD3BF] mb-2">
            {language === "ml" ? "താനൂർ നവീകരണ നിർദ്ദേശം" : "Tanur Improvement Proposal"}
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#194B35] font-serif">
            {language === "ml" ? "പുതിയൊരു ആശയം സമർപ്പിക്കാം" : "Submit a Community Idea"}
          </h1>
          <p className="text-xs sm:text-sm text-[#5C6A64] mt-1 font-sans">
            {language === "ml"
              ? "താനൂർ നഗരസഭയുടെ ഭാവി വികസനത്തിനായി നിങ്ങൾക്ക് തോന്നിയ നവീനമായ ആശയങ്ങൾ ഇവിടെ പങ്കുവെക്കാം."
              : "Share your constructive ideas for neighborhood enhancement, public safety, facilities, or environmental protection in Tanur."}
          </p>
        </div>

        {/* Disclaimer Card */}
        <div className="p-4 rounded-2xl bg-[#EDE6D8]/80 border border-[#DDD3BF] text-xs text-[#5C6A64] flex items-start gap-3 mb-6">
          <Sparkles className="w-4 h-4 text-[#C39A5B] shrink-0 mt-0.5" />
          <p>
            {language === "ml"
              ? "നിങ്ങൾ സമർപ്പിക്കുന്ന ആശയങ്ങൾ പൊതുജനങ്ങൾക്ക് കാണാനും പിന്തുണയ്ക്കാനും ചർച്ച ചെയ്യാനും ലഭ്യമായിരിക്കും. ഇത് ഔദ്യോഗിക ടെൻഡറോ വോട്ടോ അല്ല; ജനകീയ പങ്കാളിത്തത്തിനായുള്ള ഒരു സ്വതന്ത്ര സംരംഭമാണ്."
              : "Ideas submitted here are made publicly available for resident support and constructive dialogue. This platform is independent of municipal tenders or official ballots."}
          </p>
        </div>

        {/* Error notification */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-8 shadow-sm space-y-6">
          
          {/* Idea Title */}
          <div>
            <label className="block text-xs font-bold text-[#194B35] uppercase tracking-wider mb-1.5">
              {language === "ml" ? "ആശയത്തിന്റെ തലക്കെട്ട് (ഇംഗ്ലീഷിൽ / മലയാളത്തിൽ) *" : "Idea Title *"}
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={
                language === "ml"
                  ? "ഉദാഹരണത്തിന്: താനൂർ ബീച്ചിൽ സൗരോർജ്ജ മത്സ്യ ഉണക്കൽ കേന്ദ്രം"
                  : "e.g., Solar-Powered Fish Drying & Cold Storage Shed at Tanur Beach"
              }
              className="w-full px-4 py-3 rounded-xl bg-[#FAF7F0] border border-[#DDD3BF] text-sm text-[#252A25] focus:outline-none focus:ring-2 focus:ring-[#194B35]"
              required
            />
          </div>

          {/* Malayalam Title Optional */}
          <div>
            <label className="block text-xs font-bold text-[#5C6A64] mb-1.5">
              {language === "ml" ? "തലക്കെട്ട് (മലയാളം - ഓപ്ഷണൽ)" : "Title in Malayalam (Optional)"}
            </label>
            <input
              type="text"
              value={titleMl}
              onChange={(e) => setTitleMl(e.target.value)}
              placeholder="മലയാളത്തിലുള്ള തലക്കെട്ട്..."
              className="w-full px-4 py-3 rounded-xl bg-[#FAF7F0] border border-[#DDD3BF] text-sm text-[#252A25] focus:outline-none focus:ring-2 focus:ring-[#194B35]"
            />
          </div>

          {/* Category & Locality Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#194B35] uppercase tracking-wider mb-1.5">
                {language === "ml" ? "വിഭാഗം *" : "Category *"}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as IdeaCategory)}
                className="w-full px-3 py-3 rounded-xl bg-[#FAF7F0] border border-[#DDD3BF] text-xs font-semibold text-[#194B35] focus:outline-none focus:ring-2 focus:ring-[#194B35]"
              >
                {PEOPLES_VOICE_IDEA_CATEGORIES.map((c) => (
                  <option key={c.key} value={c.key}>
                    {language === "ml" ? c.label_ml : c.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#194B35] uppercase tracking-wider mb-1.5">
                {language === "ml" ? "പ്രദേശം *" : "Locality *"}
              </label>
              <select
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                className="w-full px-3 py-3 rounded-xl bg-[#FAF7F0] border border-[#DDD3BF] text-xs font-semibold text-[#194B35] focus:outline-none focus:ring-2 focus:ring-[#194B35]"
              >
                {localities.map((loc) => (
                  <option key={loc.value} value={loc.value}>
                    {loc.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#194B35] uppercase tracking-wider mb-1.5">
                {language === "ml" ? "വാർഡ് (1-45)" : "Ward (1-45)"}
              </label>
              <select
                value={wardNumber}
                onChange={(e) => setWardNumber(Number(e.target.value))}
                className="w-full px-3 py-3 rounded-xl bg-[#FAF7F0] border border-[#DDD3BF] text-xs font-semibold text-[#194B35] focus:outline-none focus:ring-2 focus:ring-[#194B35]"
              >
                {Array.from({ length: 45 }, (_, i) => i + 1).map((w) => (
                  <option key={w} value={w}>
                    Ward {w} ({language === "ml" ? `വാർഡ് ${w}` : `Ward ${w}`})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Detailed Description */}
          <div>
            <label className="block text-xs font-bold text-[#194B35] uppercase tracking-wider mb-1.5">
              {language === "ml" ? "വിശദമായ വിവരണം *" : "Detailed Description *"}
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={
                language === "ml"
                  ? "നിങ്ങൾ നിർദ്ദേശിക്കുന്ന പദ്ധതിയുടെ ഉദ്ദേശ്യം, അത് എങ്ങനെ നടപ്പാക്കാം, ആർക്കൊക്കെ പ്രയോജനപ്പെടും എന്നിവ വ്യക്തമായി എഴുതുക..."
                  : "Detail what the problem is, how this idea solves it, and how it can be implemented..."
              }
              className="w-full px-4 py-3 rounded-xl bg-[#FAF7F0] border border-[#DDD3BF] text-sm text-[#252A25] focus:outline-none focus:ring-2 focus:ring-[#194B35]"
              required
            />
          </div>

          {/* Expected Community Benefit */}
          <div>
            <label className="block text-xs font-bold text-[#194B35] uppercase tracking-wider mb-1.5">
              {language === "ml" ? "നാടിന് ലഭിക്കുന്ന പ്രതീക്ഷിക്കുന്ന നേട്ടം *" : "Expected Community Benefit *"}
            </label>
            <textarea
              rows={2}
              value={expectedBenefit}
              onChange={(e) => setExpectedBenefit(e.target.value)}
              placeholder={
                language === "ml"
                  ? "ഉദാഹരണത്തിന്: 250-ലധികം മത്സ്യത്തൊഴിലാളി കുടുംബങ്ങൾക്ക് മെച്ചപ്പെട്ട വരുമാനവും തീരദേശ ശുചിത്വവും..."
                  : "e.g., Direct livelihood enhancement for 250+ fishing families and zero waste at shoreline..."
              }
              className="w-full px-4 py-3 rounded-xl bg-[#FAF7F0] border border-[#DDD3BF] text-sm text-[#252A25] focus:outline-none focus:ring-2 focus:ring-[#194B35]"
              required
            />
          </div>

          {/* Optional Estimated Cost */}
          <div>
            <label className="block text-xs font-bold text-[#5C6A64] mb-1.5">
              {language === "ml" ? "പ്രതീക്ഷിക്കുന്ന ചെലവ് (ഓപ്ഷണൽ - ജനകീയ അനുമാനം)" : "Estimated Cost (Optional - Community Estimate)"}
            </label>
            <div className="relative">
              <input
                type="text"
                value={estimatedCost}
                onChange={(e) => setEstimatedCost(e.target.value)}
                placeholder="e.g. ₹5.00 Lakhs"
                className="w-full px-4 py-3 rounded-xl bg-[#FAF7F0] border border-[#DDD3BF] text-sm text-[#252A25] focus:outline-none focus:ring-2 focus:ring-[#194B35]"
              />
            </div>
            <p className="text-[11px] text-[#8C9A94] mt-1">
              {language === "ml"
                ? "ശ്രദ്ധിക്കുക: ഇതൊരു ഔദ്യോഗിക എസ്റ്റിമേറ്റല്ല; പൊതുജനങ്ങളുടെ ഏകദേശ അനുമാനം മാത്രമായി രേഖപ്പെടുത്തപ്പെടും."
                : "Note: This is labeled on the platform as a community estimate, not an official municipal quote or sanctioned budget."}
            </p>
          </div>

          {/* Supporting Photograph URL */}
          <div>
            <label className="block text-xs font-bold text-[#5C6A64] mb-1.5">
              {language === "ml" ? "ചിത്രം / ഫോട്ടോ ലിങ്ക് (ഓപ്ഷണൽ)" : "Supporting Photograph / Reference Image URL (Optional)"}
            </label>
            <div className="relative">
              <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C9A94]" />
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/photo.jpg"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#FAF7F0] border border-[#DDD3BF] text-sm text-[#252A25] focus:outline-none focus:ring-2 focus:ring-[#194B35]"
              />
            </div>
          </div>

          {/* Anonymous Option */}
          <div className="pt-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-4 h-4 text-[#194B35] rounded border-[#DDD3BF] focus:ring-[#194B35]"
              />
              <span className="text-xs font-semibold text-[#252A25]">
                {language === "ml" ? "എന്റെ പേര് പരസ്യമാക്കാതെ സമർപ്പിക്കുക (അജ്ഞാതൻ)" : "Submit anonymously (do not show my name publicly)"}
              </span>
            </label>
          </div>

          {/* Community Pledge Agreement */}
          <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8]">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedToGuidelines}
                onChange={(e) => setAgreedToGuidelines(e.target.checked)}
                className="w-4 h-4 text-[#194B35] rounded border-[#DDD3BF] focus:ring-[#194B35] mt-0.5"
                required
              />
              <div className="text-xs text-[#5C6A64]">
                <p className="font-bold text-[#194B35] mb-0.5">
                  {language === "ml" ? "നിർമ്മാണാത്മക പൗര പങ്കാളിത്ത പ്രതിജ്ഞ" : "Constructive Participation Pledge"}
                </p>
                <p>
                  {language === "ml"
                    ? "ഞാൻ സമർപ്പിക്കുന്ന ആശയം താനൂർ നഗരസഭയുടെ പൊതുനന്മയ്ക്കും വികസനത്തിനും വേണ്ടിയുള്ളതാണെന്നും, വിദ്വേഷമോ വ്യക്തിപരമായ ആക്ഷേപങ്ങളോ അടങ്ങിയിട്ടില്ലെന്നും സ്ഥിരീകരിക്കുന്നു."
                    : "I confirm that this submission is intended for constructive community improvement in Tanur and does not contain abusive, commercial, or defamatory statements."}
                </p>
              </div>
            </label>
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#EDE6D8]">
            <Link
              href="/peoples-voice/ideas"
              className="px-5 py-3 rounded-xl bg-[#EDE6D8] text-[#194B35] text-xs font-bold hover:bg-[#DDD3BF] transition"
            >
              {language === "ml" ? "റദ്ദാക്കുക" : "Cancel"}
            </Link>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#194B35] text-white text-xs font-bold hover:bg-[#143E2C] transition shadow disabled:opacity-50 active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>
                {isSubmitting
                  ? language === "ml"
                    ? "സമർപ്പിക്കുന്നു..."
                    : "Submitting..."
                  : language === "ml"
                  ? "ആശയം സമർപ്പിക്കാം"
                  : "Publish Idea"}
              </span>
            </button>
          </div>
        </form>
      </div>

      <Footer />
      <BottomNav />
    </div>
  );
}
