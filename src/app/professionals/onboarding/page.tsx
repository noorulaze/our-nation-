"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { useLanguage } from "@/lib/i18n/context";
import { useAuth } from "@/lib/auth/context";
import { store } from "@/lib/data/store";
import { useRouter } from "next/navigation";
import { 
  Zap, 
  Wrench, 
  Hammer, 
  Fan, 
  Paintbrush, 
  Building2, 
  Sparkles, 
  ShieldAlert, 
  HeartHandshake, 
  Baby, 
  Camera, 
  Laptop, 
  Smartphone, 
  GraduationCap, 
  Video, 
  Scissors, 
  Car, 
  PartyPopper,
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Upload, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  CheckCircle2,
  AlertCircle
} from "lucide-react";

const CATEGORY_ICON_MAP: Record<string, any> = {
  Zap,
  Wrench,
  Hammer,
  Fan,
  Paintbrush,
  Building2,
  Sparkles,
  ShieldAlert,
  HeartHandshake,
  Baby,
  Camera,
  Laptop,
  Smartphone,
  GraduationCap,
  Video,
  Scissors,
  Car,
  PartyPopper,
};

const MALAPPURAM_AREAS = [
  "Tanur Municipality",
  "Tanur Beach Ward",
  "Rayirimangalam",
  "Kettungal",
  "Meenadathur",
  "Vettom",
  "Tirur",
  "Kottakkal",
  "Ponnani",
  "Parappanangadi",
  "Malappuram Town",
];

export default function ProfessionalOnboardingPage() {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const router = useRouter();

  const categories = store.getServiceCategories();

  // Wizard Step (1: Category, 2: Details & Areas, 3: Schedule & Pricing, 4: Verification Proof)
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [displayName, setDisplayName] = useState(user?.display_name || "");
  const [displayNameMl, setDisplayNameMl] = useState("");
  const [experienceYears, setExperienceYears] = useState(5);
  const [locality, setLocality] = useState("Tanur Municipality");
  const [serviceAreas, setServiceAreas] = useState<string[]>(["Tanur Municipality", "Rayirimangalam", "Tirur"]);
  const [phone, setPhone] = useState(user?.phone || "+91 98471 20494");
  const [whatsapp, setWhatsapp] = useState(user?.phone || "+91 98471 20494");
  const [email, setEmail] = useState(user?.email || "provider@nammudenaadu.in");
  const [bio, setBio] = useState("");
  const [bioMl, setBioMl] = useState("");
  const [subcategoriesInput, setSubcategoriesInput] = useState("");

  // Schedule & Pricing
  const [startingPrice, setStartingPrice] = useState(400);
  const [workingDays, setWorkingDays] = useState({
    mon: true,
    tue: true,
    wed: true,
    thu: true,
    fri: true,
    sat: true,
    sun: false,
  });
  const [workStart, setWorkStart] = useState("08:30");
  const [workEnd, setWorkEnd] = useState("18:30");

  // Verification Doc
  const [docUploaded, setDocUploaded] = useState(false);
  const [docName, setDocName] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const toggleServiceArea = (area: string) => {
    if (serviceAreas.includes(area)) {
      if (serviceAreas.length > 1) {
        setServiceAreas(serviceAreas.filter((a) => a !== area));
      }
    } else {
      setServiceAreas([...serviceAreas, area]);
    }
  };

  const handleNextStep1 = () => {
    if (!selectedCategoryId) {
      setErrorMessage("ദയവായി നിങ്ങളുടെ പ്രധാന തൊഴിൽ വിഭാഗം തിരഞ്ഞെടുക്കുക (Please choose a service category)");
      return;
    }
    setErrorMessage("");
    setStep(2);
  };

  const handleNextStep2 = () => {
    if (!displayName.trim() || !phone.trim() || !bio.trim()) {
      setErrorMessage("പേര്, ഫോൺ നമ്പർ, ലഘുവിവരണം (Bio) എന്നിവ നിർബന്ധമാണ്.");
      return;
    }
    setErrorMessage("");
    setStep(3);
  };

  const handleNextStep3 = () => {
    setErrorMessage("");
    setStep(4);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const selectedCat = categories.find((c) => c.id === selectedCategoryId);
      const subcats = subcategoriesInput.split(",").map((s) => s.trim()).filter(Boolean);

      const username = user?.username || "pro_" + Date.now();

      const created = store.createProfessionalProfile({
        user_id: user?.id || "u0000000-0000-0000-0000-000000000001",
        username,
        display_name: displayName,
        display_name_ml: displayNameMl || displayName,
        business_name: businessName || null,
        avatar_url: user?.avatar_url || "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&auto=format&fit=crop&q=80",
        banner_url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1200&auto=format&fit=crop&q=80",
        category_id: selectedCat?.id || selectedCategoryId,
        category_name: selectedCat?.name || "Professional Services",
        category_name_ml: selectedCat?.name_ml || "സേവന വിഭാഗം",
        subcategories: subcats.length > 0 ? subcats : [selectedCat?.name || "General Service"],
        bio,
        bio_ml: bioMl || bio,
        phone,
        whatsapp,
        email,
        locality,
        service_areas: serviceAreas,
        experience_years: experienceYears,
        status: "active",
        badges: docUploaded ? ["verified_pro", "independent"] : ["independent"],
        is_verified: docUploaded,
        verification_status: docUploaded ? "verified" : "pending",
        starting_price: Number(startingPrice),
        availability: {
          days: {
            mon: { enabled: workingDays.mon, start: workStart, end: workEnd },
            tue: { enabled: workingDays.tue, start: workStart, end: workEnd },
            wed: { enabled: workingDays.wed, start: workStart, end: workEnd },
            thu: { enabled: workingDays.thu, start: workStart, end: workEnd },
            fri: { enabled: workingDays.fri, start: workStart, end: workEnd },
            sat: { enabled: workingDays.sat, start: workStart, end: workEnd },
            sun: { enabled: workingDays.sun, start: workStart, end: workEnd },
          },
          slotDurationMinutes: 60,
          breakStart: "13:00",
          breakEnd: "14:00",
          blockedDates: [],
        },
      });

      // Add default initial service for this provider
      store.addProfessionalService({
        professional_id: created.id,
        title: `${selectedCat?.name || "General"} Inspection & Base Service`,
        title_ml: `${selectedCat?.name_ml || "പൊതു"} പരിശോധനയും പ്രാരംഭ സേവനവും`,
        description: `Direct on-site inspection and fundamental troubleshooting across ${locality}.`,
        description_ml: `${locality} പരിധിയിലെ നേരിട്ടുള്ള പരിശോധനയും തകരാർ പരിഹാരവും.`,
        price: Number(startingPrice),
        pricing_type: "fixed",
        duration_minutes: 60,
        is_active: true,
      });

      // Redirect to their newly created professional public profile!
      router.push(`/professionals/${created.username}`);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to register profile. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "പ്രൊഫഷണൽ ഡയറക്ടറി", href: "/professionals" },
            { label: "സേവന ദാതാവായി രജിസ്റ്റർ ചെയ്യുക (Onboarding)" },
          ]}
        />

        {/* Wizard Header */}
        <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 sm:p-8 shadow-card text-center space-y-3">
          <span className="inline-block px-3 py-1 rounded-full bg-[#E0F1E7] text-[#1B4D36] text-[11px] font-bold uppercase tracking-wider border border-[#BDE3CE]">
            താനൂർ & മലപ്പുറം സർവീസ് നെറ്റ്‌വർക്ക്
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-malayalam-serif text-[#1B4D36]">
            പ്രാദേശിക സേവന വിദഗ്ദ്ധനായി രജിസ്റ്റർ ചെയ്യാം
          </h1>
          <p className="text-xs sm:text-sm text-[#5C6A64] max-w-xl mx-auto leading-relaxed">
            താനൂരിലും മലപ്പുറത്തെ മറ്റു പ്രദേശങ്ങളിലും നിങ്ങളുടെ തൊഴിൽ വൈദഗ്ധ്യം വഴി കൂടുതൽ ഉപഭോക്താക്കളെ കണ്ടെത്തൂ. 
            ഇടനിലക്കാരില്ലാതെ നേരിട്ടുള്ള ബുക്കിംഗും സുതാര്യമായ ചാർജുകളും.
          </p>

          {/* Stepper Progress Bar */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 pt-4 max-w-lg mx-auto">
            {[
              { num: 1, label: "വിഭാഗം (Category)" },
              { num: 2, label: "വിവരങ്ങൾ (Details)" },
              { num: 3, label: "ഷെഡ്യൂൾ & ഫീസ്" },
              { num: 4, label: "പരിശോധന (Verify)" },
            ].map((s) => (
              <div key={s.num} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition shadow-xs ${
                    step === s.num
                      ? "bg-[#1B4D36] text-white ring-4 ring-[#1B4D36]/20"
                      : step > s.num
                      ? "bg-emerald-600 text-white"
                      : "bg-[#FAF7F0] text-[#7A8880] border border-[#DDD5C5]"
                  }`}
                >
                  {step > s.num ? <Check className="w-4 h-4" /> : s.num}
                </div>
                <span className={`text-[11px] font-semibold hidden md:inline ${
                  step === s.num ? "text-[#1B4D36] font-bold" : "text-[#7A8880]"
                }`}>
                  {s.label}
                </span>
                {s.num < 4 && <div className="w-4 sm:w-8 h-0.5 bg-[#DDD5C5]" />}
              </div>
            ))}
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* STEP 1: CATEGORY SELECTION */}
        {step === 1 && (
          <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 sm:p-8 shadow-card space-y-6">
            <div className="border-b border-[#F3EFE6] pb-3">
              <h2 className="text-base font-bold font-malayalam-serif text-[#1B4D36]">
                ഘട്ടം 1: നിങ്ങളുടെ സേവന വിഭാഗം തിരഞ്ഞെടുക്കുക (Select Service Category)
              </h2>
              <p className="text-xs text-[#7A8880] mt-0.5">
                നിങ്ങൾ നൽകുന്ന പ്രധാന തൊഴിൽ അല്ലെങ്കിൽ സേവനം താഴെ നൽകിയിട്ടുള്ള 18 വിഭാഗങ്ങളിൽ നിന്നും തിരഞ്ഞെടുക്കുക:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {categories.map((cat) => {
                const Icon = CATEGORY_ICON_MAP[cat.icon] || Wrench;
                const isSelected = selectedCategoryId === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategoryId(cat.id)}
                    className={`p-4 rounded-2xl text-left border transition relative flex items-start gap-3 active:scale-95 ${
                      isSelected
                        ? "bg-[#E0F1E7] border-[#1B4D36] shadow-md ring-2 ring-[#1B4D36]"
                        : "bg-[#FAF7F0] border-[#EAE4D7] hover:border-[#DDD5C5] hover:bg-[#F3EFE6]"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isSelected ? "bg-[#1B4D36] text-white" : "bg-white text-[#1B4D36] border border-[#EAE4D7]"
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="text-xs font-bold text-[#1A2420]">
                        {language === "ml" ? cat.name_ml : cat.name}
                      </h3>
                      <p className="text-[10px] text-[#7A8880] line-clamp-2">
                        {language === "ml" ? cat.description_ml : cat.description}
                      </p>
                    </div>
                    {isSelected && (
                      <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#1B4D36] text-white flex items-center justify-center text-xs">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-end pt-4 border-t border-[#F3EFE6]">
              <button
                type="button"
                onClick={handleNextStep1}
                className="px-6 py-3 rounded-2xl bg-[#1B4D36] hover:bg-[#143B29] text-white text-xs sm:text-sm font-bold transition shadow-md flex items-center gap-2 active:scale-95"
              >
                <span>അടുത്ത ഘട്ടത്തിലേക്ക്</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: PROFESSIONAL DETAILS & SERVICE AREAS */}
        {step === 2 && (
          <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 sm:p-8 shadow-card space-y-6">
            <div className="border-b border-[#F3EFE6] pb-3">
              <h2 className="text-base font-bold font-malayalam-serif text-[#1B4D36]">
                ഘട്ടം 2: പ്രൊഫഷണൽ വിവരങ്ങളും സേവന പരിധിയും (Professional Details & Areas)
              </h2>
              <p className="text-xs text-[#7A8880] mt-0.5">
                നിങ്ങളുടെ സ്ഥാപനത്തിന്റെ പേര്, അനുഭവ പരിചയം, സേവനം നൽകുന്ന പ്രദേശങ്ങൾ എന്നിവ നൽകുക.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#1A2420] mb-1">
                  നിങ്ങളുടെ പേര് (Your Name) *
                </label>
                <input
                  type="text"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:ring-2 focus:ring-[#1B4D36]"
                  placeholder="ഉദാ: മുഹമ്മദ് ബഷീർ (Muhammed Basheer)"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A2420] mb-1">
                  സ്ഥാപനം / ബ്രാൻഡ് പേര് (Business / Brand Name - Optional)
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:ring-2 focus:ring-[#1B4D36]"
                  placeholder="ഉദാ: മലബാർ ഇലക്ട്രിക്കൽസ് & ഇൻവെർട്ടർ വർക്സ്"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#1A2420] mb-1">
                  പ്രവൃത്തി പരിചയം (Years of Exp) *
                </label>
                <input
                  type="number"
                  min="0"
                  max="60"
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A2420] mb-1">
                  പ്രധാന വാർഡ് / തട്ടകം (Primary Locality) *
                </label>
                <select
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                >
                  {MALAPPURAM_AREAS.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A2420] mb-1">
                  ഫോൺ നമ്പർ (Phone / WhatsApp) *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98471 20494"
                  className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>
            </div>

            {/* Service Areas Multi-selector */}
            <div>
              <label className="block text-xs font-bold text-[#1A2420] mb-1">
                സേവനം ലഭ്യമാക്കുന്ന പ്രദേശങ്ങൾ (Service Areas in Malappuram) *
              </label>
              <p className="text-[11px] text-[#7A8880] mb-2">
                നിങ്ങൾക്ക് നേരിട്ടെത്തി സേവനം നൽകാൻ സാധിക്കുന്ന പ്രദേശങ്ങൾ ടിക്ക് ചെയ്യുക:
              </p>
              <div className="flex flex-wrap gap-2">
                {MALAPPURAM_AREAS.map((area) => {
                  const active = serviceAreas.includes(area);
                  return (
                    <button
                      key={area}
                      type="button"
                      onClick={() => toggleServiceArea(area)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border flex items-center gap-1.5 ${
                        active
                          ? "bg-[#1B4D36] text-white border-[#1B4D36]"
                          : "bg-[#FAF7F0] text-[#3E4D45] border-[#DDD5C5] hover:bg-[#F3EFE6]"
                      }`}
                    >
                      {active && <Check className="w-3.5 h-3.5" />}
                      <span>{area}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Subcategories */}
            <div>
              <label className="block text-xs font-bold text-[#1A2420] mb-1">
                പ്രത്യേക സേവന ടാഗുകൾ (Subcategories - Comma Separated)
              </label>
              <input
                type="text"
                value={subcategoriesInput}
                onChange={(e) => setSubcategoriesInput(e.target.value)}
                placeholder="ഉദാ: ഇൻവെർട്ടർ ഫിറ്റിംഗ്, എംസിബി ട്രിപ്പ്, ഹൗസ് വയറിംഗ്, സോളാർ"
                className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-xs font-bold text-[#1A2420] mb-1">
                നിങ്ങളുടെ സേവനത്തെക്കുറിച്ചുള്ള വിവരണം (Professional Bio) *
              </label>
              <textarea
                rows={3}
                required
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="നിങ്ങളുടെ യോഗ്യതകൾ, എത്ര കാലമായി ജോലി ചെയ്യുന്നു, നൽകുന്ന ഉറപ്പ് എന്നിവ വ്യക്തമാക്കുക..."
                className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#F3EFE6]">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-2.5 rounded-xl border border-[#DDD5C5] text-xs font-bold text-[#5C6A64] hover:bg-[#F3EFE6] transition flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>മുൻപത്തെ ഘട്ടം</span>
              </button>
              <button
                type="button"
                onClick={handleNextStep2}
                className="px-6 py-3 rounded-2xl bg-[#1B4D36] hover:bg-[#143B29] text-white text-xs sm:text-sm font-bold transition shadow-md flex items-center gap-2 active:scale-95"
              >
                <span>അടുത്ത ഘട്ടത്തിലേക്ക്</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SCHEDULE & PRICING */}
        {step === 3 && (
          <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 sm:p-8 shadow-card space-y-6">
            <div className="border-b border-[#F3EFE6] pb-3">
              <h2 className="text-base font-bold font-malayalam-serif text-[#1B4D36]">
                ഘട്ടം 3: പ്രവൃത്തി സമയവും പ്രാരംഭ നിരക്കും (Working Schedule & Pricing)
              </h2>
              <p className="text-xs text-[#7A8880] mt-0.5">
                ഉപഭോക്താക്കൾക്ക് സേവനം നൽകാൻ സാധിക്കുന്ന ആഴ്ചയിലെ ദിവസങ്ങളും അടിസ്ഥാന സർവീസ് ചാർജും നിശ്ചയിക്കുക.
              </p>
            </div>

            {/* Base Starting Price */}
            <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7] max-w-sm">
              <label className="block text-xs font-bold text-[#1A2420] mb-1">
                പ്രാരംഭ സർവീസ് ഫീസ് (Starting Price / Inspection Fee - ₹) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-sm font-bold text-[#1B4D36]">₹</span>
                <input
                  type="number"
                  min="50"
                  step="50"
                  value={startingPrice}
                  onChange={(e) => setStartingPrice(parseInt(e.target.value) || 0)}
                  className="w-full pl-8 pr-4 py-2.5 text-sm font-bold rounded-xl border border-[#DDD5C5] bg-white text-[#1A2420]"
                />
              </div>
              <p className="text-[10px] text-[#7A8880] mt-1">നേരിട്ടുള്ള പരിശോധനയ്ക്കും ചെറിയ റിപ്പയറുകൾക്കും ബാധകമായ ഫീസ്.</p>
            </div>

            {/* Working Days */}
            <div>
              <label className="block text-xs font-bold text-[#1A2420] mb-2">
                ലഭ്യമായ ദിവസങ്ങൾ (Available Days)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                {[
                  { key: "mon", label: "തിങ്കൾ (Mon)" },
                  { key: "tue", label: "ചൊവ്വ (Tue)" },
                  { key: "wed", label: "ബുധൻ (Wed)" },
                  { key: "thu", label: "വ്യാഴം (Thu)" },
                  { key: "fri", label: "വെള്ളി (Fri)" },
                  { key: "sat", label: "ശനി (Sat)" },
                  { key: "sun", label: "ഞായർ (Sun)" },
                ].map((d) => {
                  const active = (workingDays as any)[d.key];
                  return (
                    <button
                      key={d.key}
                      type="button"
                      onClick={() => setWorkingDays({ ...workingDays, [d.key]: !active })}
                      className={`p-3 rounded-2xl text-center text-xs font-bold transition border ${
                        active
                          ? "bg-[#1B4D36] text-white border-[#1B4D36] shadow-xs"
                          : "bg-[#FAF7F0] text-[#7A8880] border-[#DDD5C5]"
                      }`}
                    >
                      {d.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Working Hours Range */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#1A2420] mb-1">
                  തുടങ്ങുന്ന സമയം (Start Time)
                </label>
                <input
                  type="time"
                  value={workStart}
                  onChange={(e) => setWorkStart(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A2420] mb-1">
                  അവസാനിക്കുന്ന സമയം (End Time)
                </label>
                <input
                  type="time"
                  value={workEnd}
                  onChange={(e) => setWorkEnd(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#F3EFE6]">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2.5 rounded-xl border border-[#DDD5C5] text-xs font-bold text-[#5C6A64] hover:bg-[#F3EFE6] transition flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>മുൻപത്തെ ഘട്ടം</span>
              </button>
              <button
                type="button"
                onClick={handleNextStep3}
                className="px-6 py-3 rounded-2xl bg-[#1B4D36] hover:bg-[#143B29] text-white text-xs sm:text-sm font-bold transition shadow-md flex items-center gap-2 active:scale-95"
              >
                <span>അടുത്ത ഘട്ടത്തിലേക്ക്</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: VERIFICATION PROOF & FINALIZE */}
        {step === 4 && (
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-[#EAE4D7] p-6 sm:p-8 shadow-card space-y-6">
            <div className="border-b border-[#F3EFE6] pb-3">
              <h2 className="text-base font-bold font-malayalam-serif text-[#1B4D36]">
                ഘട്ടം 4: തിരിച്ചറിയൽ രേഖയും വെരിഫിക്കേഷനും (Verification & Review)
              </h2>
              <p className="text-xs text-[#7A8880] mt-0.5">
                താനൂർ കമ്മ്യൂണിറ്റിയിൽ വിശ്വസ്തത വർദ്ധിപ്പിക്കാൻ നിങ്ങളുടെ തൊഴിൽ സർട്ടിഫിക്കറ്റ് അല്ലെങ്കിൽ തിരിച്ചറിയൽ രേഖ സമർപ്പിക്കുക.
              </p>
            </div>

            {/* Document Upload Area */}
            <div className="p-6 rounded-2xl bg-[#FAF7F0] border-2 border-dashed border-[#DDD5C5] text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#1B4D36] flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs sm:text-sm font-bold text-[#1A2420]">
                  {docUploaded ? docName : "ട്രേഡ് ലൈസൻസ് / ആധാർ / ഐടിഐ സർട്ടിഫിക്കറ്റ് അപ്‌ലോഡ് ചെയ്യുക"}
                </h4>
                <p className="text-[11px] text-[#7A8880]">
                  PDF, JPG അല്ലെങ്കിൽ PNG (പരമാവധി 10MB)
                </p>
              </div>

              {!docUploaded ? (
                <button
                  type="button"
                  onClick={() => {
                    setDocUploaded(true);
                    setDocName("Kerala_Trade_License_Tanur_Verified.pdf");
                  }}
                  className="px-4 py-2 rounded-xl bg-white border border-[#1B4D36] text-xs font-bold text-[#1B4D36] hover:bg-[#E0F1E7] transition inline-flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>രേഖ അപ്‌ലോഡ് ചെയ്യുക (Upload Proof)</span>
                </button>
              ) : (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>രേഖ പരിശോധനയ്ക്കായി ചേർത്തു</span>
                </div>
              )}
            </div>

            {/* Terms & Declarations */}
            <div className="p-4 rounded-2xl bg-[#FAF4E6] border border-[#E8DCBF] text-xs text-[#8C5B0F] space-y-2">
              <h4 className="font-bold flex items-center gap-1.5">
                <Check className="w-4 h-4" />
                <span>സേവന ദാതാവിന്റെ സത്യവാങ്മൂലം</span>
              </h4>
              <p className="leading-relaxed text-[11px]">
                നമ്മുടെ നാട് താനൂർ പ്ലാറ്റ്‌ഫോം വഴി ലഭിക്കുന്ന സേവന അന്വേഷണങ്ങളിൽ മാന്യമായും സുതാര്യമായും ഇടപഴകുമെന്നും, 
                നിശ്ചയിച്ച തീയതിയിലും സമയത്തും സേവനം പൂർത്തിയാക്കുമെന്നും ഞാൻ ഉറപ്പുനൽകുന്നു.
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#F3EFE6]">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-5 py-2.5 rounded-xl border border-[#DDD5C5] text-xs font-bold text-[#5C6A64] hover:bg-[#F3EFE6] transition flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>മുൻപത്തെ ഘട്ടം</span>
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3.5 rounded-2xl bg-[#1B4D36] hover:bg-[#143B29] text-white text-xs sm:text-sm font-bold transition shadow-lg flex items-center gap-2 active:scale-95 disabled:opacity-50"
              >
                <CheckCircle2 className="w-5 h-5 text-amber-300" />
                <span>{isSubmitting ? "രജിസ്റ്റർ ചെയ്യുന്നു..." : "പ്രൊഫൈൽ പൂർത്തിയാക്കുക (Complete Registration)"}</span>
              </button>
            </div>
          </form>
        )}

      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
