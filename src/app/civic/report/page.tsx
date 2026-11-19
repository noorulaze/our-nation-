"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { CivicNav } from "@/components/civic/CivicNav";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { useLanguage } from "@/lib/i18n/context";
import { useAuth } from "@/lib/auth/context";
import { 
  civicStore, 
  CIVIC_CATEGORIES, 
  CivicIssue 
} from "@/lib/data/civicConnectData";
import { 
  PlusCircle, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  MapPin, 
  Camera, 
  Image as ImageIcon, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Eye, 
  ShieldCheck, 
  FileText,
  Sparkles,
  Info
} from "lucide-react";

export default function CivicReportPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const { user } = useAuth();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  // Step 1: Issue Info
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("cat-roads");
  const [subcategory, setSubcategory] = useState("Potholes (കുഴികൾ)");

  // Step 2: Location
  const [district, setDistrict] = useState("Malappuram (മലപ്പുറം)");
  const [locality, setLocality] = useState("താനൂർ നഗരസഭ (Tanur Municipality)");
  const [jurisdictionType, setJurisdictionType] = useState<"municipality" | "block_panchayat" | "district">("municipality");
  const [addressLandmark, setAddressLandmark] = useState("");
  const [latitude, setLatitude] = useState(10.9753);
  const [longitude, setLongitude] = useState(75.8672);

  // Step 3: Evidence
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [images, setImages] = useState<string[]>([
    "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=80"
  ]);
  const [notes, setNotes] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  // Validation & Submission
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [createdIssue, setCreatedIssue] = useState<CivicIssue | null>(null);

  // Category subcategories helper
  const selectedCatObj = CIVIC_CATEGORIES.find(c => c.id === categoryId);

  const handleCategoryChange = (catId: string) => {
    setCategoryId(catId);
    const cat = CIVIC_CATEGORIES.find(c => c.id === catId);
    if (cat && cat.subcategories.length > 0) {
      setSubcategory(cat.subcategories[0]);
    }
  };

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!title.trim() || title.trim().length < 5) {
      errs.title = "പരാതിക്ക് വ്യക്തമായ ഒരു തലക്കെട്ട് നൽകുക (കുറഞ്ഞത് 5 അക്ഷരങ്ങൾ).";
    }
    if (!description.trim() || description.trim().length < 15) {
      errs.description = "പ്രശ്നത്തെക്കുറിച്ച് വിശദമായി എഴുതുക (കുറഞ്ഞത് 15 അക്ഷരങ്ങൾ).";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!addressLandmark.trim()) {
      errs.addressLandmark = "പ്രദേശത്തിന്റെ പേരോ അടുത്തുള്ള പ്രധാന അടയാളമോ നൽകുക.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && !validateStep2()) return;
    if (currentStep < 4) {
      setCurrentStep((prev) => (prev + 1) as any);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as any);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleAddImage = () => {
    if (imageUrlInput.trim() && !images.includes(imageUrlInput.trim())) {
      setImages([...images, imageUrlInput.trim()]);
      setImageUrlInput("");
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, idx) => idx !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newIssue = civicStore.createIssue({
      title: title.trim(),
      title_ml: title.trim(),
      description: description.trim(),
      category_id: categoryId,
      subcategory,
      district,
      locality,
      jurisdiction_type: jurisdictionType,
      address_landmark: addressLandmark.trim(),
      latitude,
      longitude,
      images: images.length > 0 ? images : ["https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=800&auto=format&fit=crop&q=80"],
      status: "submitted",
      priority: "medium",
      reporter_name: isAnonymous ? "Anonymous Resident (അജ്ഞാതൻ)" : (user?.display_name || "Tanur Resident"),
      reporter_id: user?.id || "guest-resident",
      is_anonymous: isAnonymous,
      moderator_notes: notes.trim() || undefined,
    });

    setCreatedIssue(newIssue);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
      <Navbar />
      <CivicNav />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: language === "ml" ? "ഹോം" : "Home", href: "/" },
            { label: "Civic Connect", href: "/civic" },
            { label: language === "ml" ? "പരാതി രജിസ്റ്റർ ചെയ്യുക" : "Report an Issue" },
          ]}
        />

        {/* ============================================================== */}
        {/* SUCCESS CONFIRMATION STATE */}
        {/* ============================================================== */}
        {isSubmitted && createdIssue ? (
          <div className="bg-white rounded-3xl border border-[#EAE4D7] p-8 sm:p-10 shadow-card text-center space-y-6 animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>

            <div className="space-y-2 max-w-lg mx-auto">
              <span className="text-[11px] font-bold text-[#8C5B0F] uppercase tracking-wider bg-[#FAF4E6] px-3 py-1 rounded-full border border-[#E8DCBF]">
                വിജയകരമായി സമർപ്പിച്ചു (Report Submitted)
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold font-malayalam-serif text-[#194B35]">
                നിങ്ങളുടെ പരാതി രേഖപ്പെടുത്തിയിരിക്കുന്നു
              </h1>
              <p className="text-xs sm:text-sm text-[#5C6A64] font-malayalam-body leading-relaxed">
                താനൂർ നഗരസഭാ സിവിക് കണക്റ്റ് ടീമിന് നിങ്ങളുടെ പരാതി ലഭിച്ചു. കമ്മ്യൂണിറ്റി മോഡറേറ്റർമാർ പരിശോധിച്ച് ഉടൻ തന്നെ തുടർനടപടികൾ സ്വീകരിക്കും.
              </p>
            </div>

            {/* Tracking ID Badge */}
            <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#DDD5C5] max-w-md mx-auto space-y-1">
              <span className="text-[10px] font-bold text-[#7A8880] uppercase tracking-wider">
                പരാതി ട്രാക്കിംഗ് ഐഡി (Tracking ID)
              </span>
              <p className="text-xl sm:text-2xl font-bold font-mono text-[#194B35] tracking-wider">
                {createdIssue.tracking_id}
              </p>
              <p className="text-[11px] text-[#8C5B0F]">
                ഈ ഐഡി ഉപയോഗിച്ച് ഏത് സമയത്തും പരാതിയുടെ നില പരിശോധിക്കാം.
              </p>
            </div>

            {/* Next Steps Card */}
            <div className="p-5 rounded-2xl bg-[#E0F1E7]/50 border border-[#BDE3CE] max-w-lg mx-auto text-left text-xs space-y-2">
              <h4 className="font-bold text-[#194B35] flex items-center gap-1.5">
                <Info className="w-4 h-4 text-emerald-700" />
                <span>അടുത്ത ഘട്ടങ്ങൾ (What happens next):</span>
              </h4>
              <ul className="space-y-1 text-[#2A3730] list-disc list-inside">
                <li>കമ്മ്യൂണിറ്റി മോഡറേറ്റർമാർ 24 മണിക്കൂറിനകം റിപ്പോർട്ട് പരിശോധിക്കും.</li>
                <li>സ്ഥിരീകരിച്ച ശേഷം താനൂർ നഗരസഭയിലേക്കോ ബന്ധപ്പെട്ട വകുപ്പിലേക്കോ ഔദ്യോഗികമായി അയക്കും.</li>
                <li>സ്റ്റാറ്റസ് മാറുമ്പോൾ നിങ്ങൾക്ക് ഇൻ-ആപ്പ് അറിയിപ്പുകൾ ലഭിക്കും.</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href={`/civic/issues/${createdIssue.id}`}
                className="px-6 py-2.5 rounded-xl bg-[#194B35] text-white text-xs font-bold hover:bg-[#143E2C] transition shadow-xs flex items-center gap-1.5"
              >
                <span>പരാതിയുടെ വിശദാംശങ്ങൾ കാണുക</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                href="/civic/my-reports"
                className="px-5 py-2.5 rounded-xl bg-[#FAF4E6] border border-[#DDD5C5] text-[#8C5B0F] text-xs font-bold hover:bg-[#F3EFE6] transition"
              >
                എന്റെ റിപ്പോർട്ടുകളിലേക്ക്
              </Link>
            </div>
          </div>
        ) : (
          /* ============================================================== */
          /* MULTI-STEP REPORT WIZARD */
          /* ============================================================== */
          <div className="space-y-6">
            
            {/* Header */}
            <div>
              <span className="text-[11px] font-bold text-[#194B35] uppercase tracking-wider bg-[#E0F1E7] px-3 py-1 rounded-full border border-[#BDE3CE]">
                പൗര പരാതി ഫോം
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold font-malayalam-serif text-[#194B35] mt-2">
                പുതിയ പൗര പ്രശ്നം റിപ്പോർട്ട് ചെയ്യുക
              </h1>
              <p className="text-xs text-[#5C6A64] mt-1 font-malayalam-body">
                താനൂർ നഗരസഭയിലെയും മലപ്പുറം ജില്ലയിലെയും അടിസ്ഥാന സൗകര്യ പ്രശ്നങ്ങൾ 4 ലളിതമായ ഘട്ടങ്ങളിലൂടെ അറിയിക്കാം.
              </p>
            </div>

            {/* PROGRESS STEPPER INDICATOR */}
            <div className="bg-white rounded-2xl border border-[#EAE4D7] p-4 shadow-xs">
              <div className="grid grid-cols-4 gap-2">
                {[
                  { num: 1, label: "വിവരങ്ങൾ", en: "Issue Info" },
                  { num: 2, label: "ലൊക്കേഷൻ", en: "Location" },
                  { num: 3, label: "ഫോട്ടോകൾ", en: "Evidence" },
                  { num: 4, label: "പരിശോധന", en: "Review" },
                ].map((s) => {
                  const isDone = currentStep > s.num;
                  const isCurrent = currentStep === s.num;
                  return (
                    <div key={s.num} className="flex flex-col items-center text-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition ${
                        isDone
                          ? "bg-emerald-600 text-white"
                          : isCurrent
                          ? "bg-[#194B35] text-amber-300 ring-4 ring-[#194B35]/20"
                          : "bg-[#FAF7F0] text-[#7A8880] border border-[#DDD5C5]"
                      }`}>
                        {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : s.num}
                      </div>
                      <span className={`text-[11px] font-bold mt-1.5 font-malayalam ${isCurrent ? "text-[#194B35]" : "text-[#7A8880]"}`}>
                        {s.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* FORM CONTAINER */}
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-[#EAE4D7] p-6 sm:p-8 shadow-card space-y-6">
              
              {/* ========================================================== */}
              {/* STEP 1: ISSUE INFORMATION */}
              {/* ========================================================== */}
              {currentStep === 1 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="border-b border-[#F3EFE6] pb-3">
                    <h2 className="text-base font-bold font-malayalam-serif text-[#194B35]">
                      ഘട്ടം 1: പ്രശ്നത്തിന്റെ വിശദാംശങ്ങൾ (Issue Details)
                    </h2>
                    <p className="text-xs text-[#5C6A64]">നിങ്ങൾ ശ്രദ്ധയിൽപ്പെടുത്താൻ ആഗ്രഹിക്കുന്ന വിഷയത്തെക്കുറിച്ച് വ്യക്തമായി പറയുക.</p>
                  </div>

                  {/* Title */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1A2420] flex items-center justify-between">
                      <span>പരാതിയുടെ തലക്കെട്ട് * (Issue Title)</span>
                      <span className="text-[10px] text-[#7A8880]">ഉദാ: റെയിൽവേ സ്റ്റേഷൻ റോഡിലെ കുഴികൾ</span>
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="പ്രശ്നത്തെ സൂചിപ്പിക്കുന്ന വ്യക്തമായ തലക്കെട്ട് നൽകുക..."
                      className={`w-full px-4 py-3 rounded-xl text-xs sm:text-sm border bg-[#FAF7F0] focus:outline-none focus:ring-2 focus:ring-[#194B35] font-malayalam-body text-[#1A2420] ${
                        errors.title ? "border-rose-400 bg-rose-50/30" : "border-[#DDD5C5]"
                      }`}
                    />
                    {errors.title && <p className="text-[11px] text-rose-600 font-semibold">{errors.title}</p>}
                  </div>

                  {/* Category Selection */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#1A2420]">
                      വിഭാഗം തിരഞ്ഞെടുക്കുക * (Select Category)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {CIVIC_CATEGORIES.map((cat) => {
                        const isSelected = categoryId === cat.id;
                        return (
                          <button
                            type="button"
                            key={cat.id}
                            onClick={() => handleCategoryChange(cat.id)}
                            className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                              isSelected
                                ? "bg-[#194B35] text-white border-[#194B35] shadow-xs"
                                : "bg-[#FAF7F0] text-[#1A2420] border-[#EAE4D7] hover:bg-[#F3EFE6]"
                            }`}
                          >
                            <span className="text-xs font-bold font-malayalam-serif">{cat.name_ml}</span>
                            <span className={`text-[10px] mt-1 ${isSelected ? "text-emerald-200" : "text-[#7A8880]"}`}>
                              {cat.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Subcategory */}
                  {selectedCatObj && selectedCatObj.subcategories.length > 0 && (
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#1A2420]">
                        ഉപവിഭാഗം (Subcategory)
                      </label>
                      <select
                        value={subcategory}
                        onChange={(e) => setSubcategory(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl text-xs border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-none focus:ring-2 focus:ring-[#194B35]"
                      >
                        {selectedCatObj.subcategories.map((sub, i) => (
                          <option key={i} value={sub}>{sub}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Description */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1A2420]">
                      വിശദമായ വിവരണം * (Detailed Description)
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="പ്രശ്നം എപ്പോൾ തുടങ്ങി? ജനങ്ങൾക്ക് ഇത് എങ്ങനെ ബുദ്ധിമുട്ടുണ്ടാക്കുന്നു? വിശദമായി എഴുതുക..."
                      rows={4}
                      className={`w-full p-4 rounded-xl text-xs sm:text-sm border bg-[#FAF7F0] focus:outline-none focus:ring-2 focus:ring-[#194B35] font-malayalam-body text-[#1A2420] resize-none ${
                        errors.description ? "border-rose-400 bg-rose-50/30" : "border-[#DDD5C5]"
                      }`}
                    />
                    {errors.description && <p className="text-[11px] text-rose-600 font-semibold">{errors.description}</p>}
                  </div>
                </div>
              )}

              {/* ========================================================== */}
              {/* STEP 2: LOCATION */}
              {/* ========================================================== */}
              {currentStep === 2 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="border-b border-[#F3EFE6] pb-3">
                    <h2 className="text-base font-bold font-malayalam-serif text-[#194B35]">
                      ഘട്ടം 2: പ്രശ്നബാധിത സ്ഥലം (Issue Location)
                    </h2>
                    <p className="text-xs text-[#5C6A64]">അധികൃതർക്ക് സ്ഥലം വേഗത്തിൽ കണ്ടെത്താൻ സഹായിക്കുന്ന വിവരങ്ങൾ നൽകുക.</p>
                  </div>

                  {/* District & Locality Selection */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#1A2420]">ജില്ല (District)</label>
                      <input
                        type="text"
                        value={district}
                        disabled
                        className="w-full px-4 py-2.5 rounded-xl text-xs border border-[#DDD5C5] bg-[#EFE9DC]/60 text-[#1A2420] font-semibold cursor-not-allowed"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#1A2420]">ഭരണവിഭാഗം (Locality Jurisdiction)</label>
                      <select
                        value={locality}
                        onChange={(e) => {
                          setLocality(e.target.value);
                          if (e.target.value.includes("Municipality")) setJurisdictionType("municipality");
                          else setJurisdictionType("block_panchayat");
                        }}
                        className="w-full px-4 py-2.5 rounded-xl text-xs border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-none focus:ring-2 focus:ring-[#194B35]"
                      >
                        <option value="താനൂർ നഗരസഭ (Tanur Municipality)">താനൂർ നഗരസഭ (Tanur Municipality) — 44 വാർഡുകൾ</option>
                        <option value="താനൂർ ബ്ലോക്ക് പഞ്ചായത്ത് (Tanur Block Panchayat)">താനൂർ ബ്ലോക്ക് പഞ്ചായത്ത് (Tanur Block Panchayat)</option>
                        <option value="രായിരിമംഗലം (Rayirimangalam, Tanur)">രായിരിമംഗലം (Rayirimangalam)</option>
                        <option value="കെട്ടുങ്ങൽ തീരദേശം (Kettungal Beach)">കെട്ടുങ്ങൽ തീരദേശം (Kettungal Beach)</option>
                        <option value="മീനടത്തൂർ (Meenadathur)">മീനടത്തൂർ (Meenadathur)</option>
                        <option value="താനൂർ ടൗൺ (Tanur Town Centre)">താനൂർ ടൗൺ (Tanur Town Centre)</option>
                      </select>
                    </div>
                  </div>

                  {/* Landmark Address */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1A2420]">
                      കൃത്യമായ സ്ഥലം / അടയാളം * (Landmark & Ward)
                    </label>
                    <input
                      type="text"
                      value={addressLandmark}
                      onChange={(e) => setAddressLandmark(e.target.value)}
                      placeholder="ഉദാ: വാർഡ് 12, റെയിൽവേ സ്റ്റേഷൻ പടിഞ്ഞാറേ ഗേറ്റിന് എതിർവശം"
                      className={`w-full px-4 py-3 rounded-xl text-xs sm:text-sm border bg-[#FAF7F0] focus:outline-none focus:ring-2 focus:ring-[#194B35] font-malayalam-body text-[#1A2420] ${
                        errors.addressLandmark ? "border-rose-400 bg-rose-50/30" : "border-[#DDD5C5]"
                      }`}
                    />
                    {errors.addressLandmark && <p className="text-[11px] text-rose-600 font-semibold">{errors.addressLandmark}</p>}
                  </div>

                  {/* Interactive Map Location Picker Mock UI */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#1A2420] flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#194B35]" />
                        <span>മാപ്പ് ലൊക്കേഷൻ പിൻ (Map Pin Coordinates)</span>
                      </span>
                      <span className="text-[11px] text-[#7A8880] font-mono">
                        Lat: {latitude.toFixed(4)}, Lng: {longitude.toFixed(4)}
                      </span>
                    </div>

                    <div className="h-48 w-full rounded-2xl bg-[#E5DDD0] border border-[#DDD5C5] relative overflow-hidden flex items-center justify-center group shadow-inner">
                      {/* Stylized Map Background */}
                      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#194B35_1px,transparent_1px)] [background-size:12px_12px]" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="p-3 bg-white/90 rounded-2xl shadow-md border border-[#DDD5C5] text-center space-y-1 pointer-events-none">
                          <span className="w-7 h-7 rounded-full bg-rose-600 text-white flex items-center justify-center mx-auto shadow-md">
                            <MapPin className="w-4 h-4" />
                          </span>
                          <span className="text-[11px] font-bold text-[#194B35] block font-malayalam">
                            താനൂർ ലൊക്കേഷൻ പിൻ ചെയ്തിരിക്കുന്നു
                          </span>
                          <span className="text-[10px] text-[#7A8880] block">
                            (ഭൂമിശാസ്ത്രപരമായ ഏകദേശ പോയിന്റ്)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================================== */}
              {/* STEP 3: EVIDENCE & PHOTOGRAPHS */}
              {/* ========================================================== */}
              {currentStep === 3 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="border-b border-[#F3EFE6] pb-3">
                    <h2 className="text-base font-bold font-malayalam-serif text-[#194B35]">
                      ഘട്ടം 3: ഫോട്ടോകളും തെളിവുകളും (Evidence & Photos)
                    </h2>
                    <p className="text-xs text-[#5C6A64]">ഫോട്ടോകൾ നൽകുന്നത് അധികൃതർക്ക് പ്രശ്നത്തിന്റെ ഗൗരവം വേഗത്തിൽ മനസ്സിലാക്കാൻ സഹായിക്കുന്നു.</p>
                  </div>

                  {/* Add Image Input */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#1A2420]">ചിത്രത്തിന്റെ വെബ് ലിങ്ക് ചേർക്കുക (Image URL)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="url"
                        value={imageUrlInput}
                        onChange={(e) => setImageUrlInput(e.target.value)}
                        placeholder="https://images.unsplash.com/... അല്ലെങ്കിൽ ഇമേജ് ലിങ്ക്"
                        className="flex-1 px-4 py-2.5 rounded-xl text-xs border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-none focus:ring-2 focus:ring-[#194B35]"
                      />
                      <button
                        type="button"
                        onClick={handleAddImage}
                        className="px-4 py-2.5 rounded-xl bg-[#194B35] text-white text-xs font-bold hover:bg-[#143E2C] transition shrink-0"
                      >
                        ചേർക്കുക
                      </button>
                    </div>
                  </div>

                  {/* Photos Grid with Remove Action */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-[#1A2420]">അപ്‌ലോഡ് ചെയ്ത ചിത്രങ്ങൾ ({images.length})</span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {images.map((img, idx) => (
                        <div key={idx} className="h-28 rounded-2xl overflow-hidden border border-[#DDD5C5] relative group shadow-xs">
                          <img src={img} alt={`Evidence ${idx + 1}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            className="absolute top-2 right-2 p-1.5 rounded-full bg-rose-600 text-white text-xs hover:bg-rose-700 transition shadow-md"
                            title="ചിത്രം നീക്കം ചെയ്യുക"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Anonymous Toggle */}
                  <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#DDD5C5] flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-xs text-[#1A2420]">അജ്ഞാതമായി സമർപ്പിക്കുക (Anonymous Submission)</h4>
                      <p className="text-[11px] text-[#5C6A64]">നിങ്ങളുടെ പേര് പബ്ലിക് ലിസ്റ്റിംഗിൽ കാണിക്കാതെ പരാതി സമർപ്പിക്കാം.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="w-5 h-5 rounded text-[#194B35] accent-[#194B35]"
                    />
                  </div>

                  {/* Optional Notes */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1A2420]">കൂടുതൽ കുറിപ്പുകൾ (Optional Notes)</label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="അധികൃതർക്കോ മോഡറേറ്റർമാർക്കോ പ്രത്യേകമായി നൽകാനുള്ള നിർദ്ദേശങ്ങൾ..."
                      rows={2}
                      className="w-full p-3 rounded-xl text-xs border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-none focus:ring-1 focus:ring-[#194B35]"
                    />
                  </div>
                </div>
              )}

              {/* ========================================================== */}
              {/* STEP 4: REVIEW & CONFIRM */}
              {/* ========================================================== */}
              {currentStep === 4 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="border-b border-[#F3EFE6] pb-3">
                    <h2 className="text-base font-bold font-malayalam-serif text-[#194B35]">
                      ഘട്ടം 4: വിവരങ്ങൾ പരിശോധിക്കുക (Review Information)
                    </h2>
                    <p className="text-xs text-[#5C6A64]">സമർപ്പിക്കുന്നതിന് മുൻപ് നൽകിയ വിവരങ്ങൾ പരിശോധിക്കുക.</p>
                  </div>

                  {/* Summary Card */}
                  <div className="p-5 rounded-2xl bg-[#FAF7F0] border border-[#DDD5C5] space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-bold text-[#194B35] bg-[#E0F1E7] px-2.5 py-0.5 rounded-md uppercase">
                          {selectedCatObj?.name_ml} • {subcategory}
                        </span>
                        <h3 className="font-bold text-base text-[#1A2420] font-malayalam-serif mt-1.5">
                          {title}
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="text-xs text-[#8C5B0F] font-bold hover:underline shrink-0"
                      >
                        മാറ്റുക (Edit)
                      </button>
                    </div>

                    <p className="text-xs text-[#4A5750] leading-relaxed border-t border-[#EAE4D7] pt-2">
                      {description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2 border-t border-[#EAE4D7]">
                      <div>
                        <span className="text-[#7A8880] block text-[10px]">സ്ഥലം & ഭരണവിഭാഗം:</span>
                        <span className="font-bold text-[#1A2420]">{locality}</span>
                      </div>
                      <div>
                        <span className="text-[#7A8880] block text-[10px]">പ്രധാന അടയാളം:</span>
                        <span className="font-bold text-[#1A2420]">{addressLandmark}</span>
                      </div>
                    </div>

                    {images.length > 0 && (
                      <div className="pt-2 border-t border-[#EAE4D7]">
                        <span className="text-[#7A8880] block text-[10px] mb-1.5">ചിത്രങ്ങൾ ({images.length}):</span>
                        <div className="flex items-center gap-2 overflow-x-auto pb-1">
                          {images.map((img, i) => (
                            <img key={i} src={img} alt="Thumb" className="w-14 h-14 rounded-xl object-cover border border-[#DDD5C5]" />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Declaration Disclaimer */}
                  <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold">
                      <ShieldCheck className="w-4 h-4 text-amber-800" />
                      <span>പൗര സത്യവാങ്മൂലം:</span>
                    </div>
                    <p className="text-[11px] leading-relaxed">
                      ഞാൻ നൽകിയ വിവരങ്ങൾ യഥാർത്ഥവും സത്യസന്ധവുമാണ്. തെറ്റായ വിവരങ്ങളോ വ്യക്തിഹത്യയോ വ്യാജ ഫോട്ടോകളോ ഉൾപ്പെടുത്തിയിട്ടില്ലെന്ന് ഉറപ്പ് നൽകുന്നു.
                    </p>
                  </div>
                </div>
              )}

              {/* WIZARD NAVIGATION BUTTONS */}
              <div className="pt-4 border-t border-[#F3EFE6] flex items-center justify-between">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-4 py-2.5 rounded-xl border border-[#DDD5C5] text-[#5C6A64] hover:bg-[#FAF7F0] text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>പിന്നിലേക്ക് (Back)</span>
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-xl bg-[#194B35] text-white text-xs font-bold hover:bg-[#143E2C] transition flex items-center gap-1.5 shadow-xs"
                  >
                    <span>തുടരുക (Next)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-8 py-3 rounded-2xl bg-[#194B35] hover:bg-[#143E2C] text-white text-xs sm:text-sm font-bold transition flex items-center gap-2 shadow-md active:scale-95"
                  >
                    <CheckCircle2 className="w-4 h-4 text-amber-300" />
                    <span>പരാതി അന്തിമമായി സമർപ്പിക്കുക (Submit Report)</span>
                  </button>
                )}
              </div>

            </form>
          </div>
        )}

      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
