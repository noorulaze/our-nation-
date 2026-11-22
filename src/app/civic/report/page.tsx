"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { CivicNav } from "@/components/civic/CivicNav";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { useAuth } from "@/lib/auth/context";
import { 
  civicStore, 
  CIVIC_CATEGORIES, 
  CivicIssue,
  getTanurWardName 
} from "@/lib/data/civicConnectData";
import { LOCAL_GOVERNMENT_WARDS } from "@/lib/data/localGovernmentData";
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
  Info,
  Copy,
  Building2,
  Phone,
  Mail,
  Bell,
  Lock,
  Truck,
  Lightbulb,
  Trash2,
  Droplets,
  HelpCircle,
  ShieldAlert,
  Send
} from "lucide-react";

export default function CivicReportPage() {
  const router = useRouter();
  const { user } = useAuth();

  // 4 Steps: 1: Details, 2: Location, 3: Evidence & Contact, 4: Review
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Tanur Municipality Wards (1 to 45)
  const tanurWards = useMemo(() => {
    return LOCAL_GOVERNMENT_WARDS.filter(
      w => w.local_body_id === "lgb-tanur-municipality"
    ).sort((a, b) => a.ward_number - b.ward_number);
  }, []);

  // Form State
  // Step 1: Category & Details
  const [categoryId, setCategoryId] = useState("cat-roads");
  const [subcategory, setSubcategory] = useState("Potholes");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Step 2: Location & Ward
  const [wardNumber, setWardNumber] = useState<number>(12); // Default to Ward 12 (Panangattoor)
  const [addressLandmark, setAddressLandmark] = useState("");
  const [latitude, setLatitude] = useState(10.9753);
  const [longitude, setLongitude] = useState(75.8672);

  // Step 3: Evidence & Preferences
  const [images, setImages] = useState<string[]>([]);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [contactPreference, setContactPreference] = useState<'in_app' | 'phone' | 'email' | 'none'>("in_app");
  const [reporterContact, setReporterContact] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>("medium");

  // Validation & Submission State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [createdIssue, setCreatedIssue] = useState<CivicIssue | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  // Category change handler
  const handleCategoryChange = (catId: string) => {
    setCategoryId(catId);
    const cat = CIVIC_CATEGORIES.find(c => c.id === catId);
    if (cat && cat.subcategories.length > 0) {
      setSubcategory(cat.subcategories[0]);
    }
  };

  // Add sample image helper
  const handleAddSampleImage = () => {
    const samples = [
      "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=800&auto=format&fit=crop&q=80"
    ];
    if (images.length < 3) {
      setImages([...images, samples[images.length % samples.length]]);
    }
  };

  const handleAddCustomImage = () => {
    if (imageUrlInput.trim() && imageUrlInput.startsWith("http")) {
      setImages([...images, imageUrlInput.trim()]);
      setImageUrlInput("");
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // Validation routines per step
  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!title.trim() || title.trim().length < 5) {
      errs.title = "Please provide a clear issue title (minimum 5 characters).";
    }
    if (!description.trim() || description.trim().length < 15) {
      errs.description = "Please describe the problem in detail (minimum 15 characters).";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!wardNumber || wardNumber < 1 || wardNumber > 45) {
      errs.wardNumber = "Please select a valid Tanur Municipality ward (Wards 1–45).";
    }
    if (!addressLandmark.trim() || addressLandmark.trim().length < 3) {
      errs.addressLandmark = "Please enter a specific street, junction, or recognizable landmark.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = () => {
    const errs: Record<string, string> = {};
    if (contactPreference === "phone" && reporterContact && !/^[0-9+ -]{10,14}$/.test(reporterContact)) {
      errs.reporterContact = "Please enter a valid 10-digit telephone number.";
    }
    if (contactPreference === "email" && reporterContact && !/\S+@\S+\.\S+/.test(reporterContact)) {
      errs.reporterContact = "Please enter a valid email address.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Step Navigation
  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (currentStep === 3 && validateStep3()) {
      setCurrentStep(4);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as 1 | 2 | 3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Final Submission
  const handleSubmitReport = async () => {
    if (!validateStep1() || !validateStep2() || !validateStep3()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Direct store submission + API sync
      const selectedWard = tanurWards.find(w => w.ward_number === wardNumber);
      const wardName = selectedWard ? selectedWard.ward_name : getTanurWardName(wardNumber);

      const newIssue = civicStore.submitIssue({
        title: title.trim(),
        description: description.trim(),
        category_id: categoryId,
        subcategory,
        ward_number: wardNumber,
        ward_name: wardName,
        address_landmark: addressLandmark.trim(),
        latitude,
        longitude,
        images,
        contact_preference: contactPreference,
        reporter_contact: reporterContact.trim() || undefined,
        priority,
        is_anonymous: isAnonymous,
        reporter_name: isAnonymous 
          ? "Anonymous Resident" 
          : (user?.display_name || user?.email || "Tanur Resident"),
        reporter_id: user?.id || "usr-anon",
        district: "Malappuram",
        locality: "Tanur Municipality",
        jurisdiction_type: "municipality",
      });

      // Attempt background POST to server route
      try {
        await fetch("/api/civic/issues", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: title.trim(),
            description: description.trim(),
            category_id: categoryId,
            subcategory,
            ward_number: wardNumber,
            ward_name: wardName,
            address_landmark: addressLandmark.trim(),
            latitude,
            longitude,
            images,
            contact_preference: contactPreference,
            reporter_contact: reporterContact.trim() || undefined,
            priority,
            is_anonymous: isAnonymous,
            reporter_name: user?.display_name || user?.email || "Tanur Resident",
            reporter_id: user?.id || "usr-anon",
          }),
        });
      } catch {
        // Safe fallback - store already updated
      }

      setCreatedIssue(newIssue);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Submission error:", err);
      setErrors({ global: "Failed to submit report. Please check your network connection and try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyId = () => {
    if (createdIssue?.tracking_id) {
      navigator.clipboard.writeText(createdIssue.tracking_id);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  const selectedCategoryObj = CIVIC_CATEGORIES.find(c => c.id === categoryId);
  const selectedWardObj = tanurWards.find(w => w.ward_number === wardNumber);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
      <Navbar />
      <CivicNav />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Civic Connect", href: "/civic-connect" },
            { label: "Report Civic Issue" },
          ]}
        />

        {/* ============================================================== */}
        {/* SUCCESS CONFIRMATION STATE */}
        {/* ============================================================== */}
        {isSubmitted && createdIssue ? (
          <div className="bg-white rounded-3xl border border-[#EDE6D8] p-8 sm:p-10 shadow-sm text-center space-y-6 animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-[#194B35] flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-8 h-8 text-emerald-700" />
            </div>

            <div className="space-y-2 max-w-lg mx-auto">
              <span className="text-[11px] font-bold text-[#194B35] uppercase tracking-wider bg-[#E0F1E7] px-3.5 py-1 rounded-full border border-[#BDE3CE]">
                1. Submitted — Awaiting Review
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#194B35]">
                Civic Complaint Registered
              </h1>
              <p className="text-xs sm:text-sm text-[#5C6A64] leading-relaxed">
                Thank you for helping keep Tanur clean and safe. Your complaint has been submitted to the OUR NATION Civic Connect system and queued for municipal verification.
              </p>
            </div>

            {/* Tracking ID Badge */}
            <div className="p-5 rounded-2xl bg-[#FAF7F0] border border-[#DDD5C5] max-w-md mx-auto space-y-2">
              <span className="text-[10px] font-bold text-[#7A8880] uppercase tracking-wider">
                Official Reference ID
              </span>
              <div className="flex items-center justify-center gap-3">
                <span className="text-xl sm:text-2xl font-extrabold font-mono text-[#194B35] tracking-wider">
                  {createdIssue.tracking_id}
                </span>
                <button
                  type="button"
                  onClick={handleCopyId}
                  className="px-3 py-1.5 rounded-lg bg-white border border-[#DDD5C5] text-xs font-bold text-[#194B35] hover:bg-[#FAF4E6] flex items-center gap-1.5 transition shadow-2xs"
                  title="Copy reference code"
                >
                  {copiedId ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-[11px] text-[#8C5B0F]">
                Save this reference code to track the resolution timeline or verify field updates anytime.
              </p>
            </div>

            {/* Next Steps Card */}
            <div className="p-5 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] max-w-lg mx-auto text-left text-xs space-y-2.5">
              <h4 className="font-bold text-[#194B35] flex items-center gap-1.5">
                <Info className="w-4 h-4 text-emerald-700" />
                <span>What happens next:</span>
              </h4>
              <ul className="space-y-1.5 text-[#33413B] list-disc list-inside">
                <li>Municipal moderation desk will review the report location and category within 24 hours.</li>
                <li>Once verified, the issue will be assigned directly to the responsible wing (e.g. Roads Engineering, Sanitation, or Electrical).</li>
                <li>You will receive in-app status updates as field contractors begin and resolve the work.</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href={`/civic/issues/${createdIssue.id}`}
                className="px-6 py-2.5 rounded-xl bg-[#194B35] text-white text-xs font-bold hover:bg-[#143E2C] transition shadow-xs flex items-center gap-1.5"
              >
                <span>Track Complaint Live</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                href="/dashboard"
                className="px-5 py-2.5 rounded-xl bg-white border border-[#DDD5C5] text-[#194B35] text-xs font-bold hover:bg-[#FAF7F0] transition shadow-2xs"
              >
                Go to Citizen Dashboard
              </Link>

              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setCreatedIssue(null);
                  setCurrentStep(1);
                  setTitle("");
                  setDescription("");
                  setAddressLandmark("");
                  setImages([]);
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#5C6A64] hover:text-[#194B35] transition"
              >
                Submit Another Report
              </button>
            </div>

            {/* Statutory Disclaimer Note */}
            <div className="pt-4 border-t border-[#EDE6D8] text-[11px] text-[#7A8880] max-w-lg mx-auto">
              OUR NATION is an independent civic portal designed for community reporting and municipal liaison. For life-threatening emergencies, dial 112 immediately.
            </div>
          </div>
        ) : (
          /* ============================================================== */
          /* MULTI-STEP REPORT WIZARD */
          /* ============================================================== */
          <div className="space-y-6">
            
            {/* Header */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-[#194B35] uppercase tracking-wider bg-[#E0F1E7] px-3 py-0.5 rounded-full border border-[#BDE3CE]">
                  Citizen Reporting Portal
                </span>
                <span className="text-xs text-[#5C6A64]">
                  Tanur Municipality
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#194B35]">
                Report a Civic Issue
              </h1>
              <p className="text-xs sm:text-sm text-[#5C6A64]">
                Report damaged roads, broken streetlights, waste accumulation, or drainage problems directly to the municipal team.
              </p>
            </div>

            {/* Progress Stepper Bar */}
            <div className="bg-white rounded-2xl border border-[#EDE6D8] p-4 shadow-2xs">
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                {[
                  { num: 1, label: "Issue Details" },
                  { num: 2, label: "Location & Ward" },
                  { num: 3, label: "Evidence & Contact" },
                  { num: 4, label: "Review & Submit" },
                ].map((step) => {
                  const isActive = currentStep === step.num;
                  const isDone = currentStep > step.num;
                  return (
                    <div 
                      key={step.num}
                      onClick={() => {
                        if (isDone) setCurrentStep(step.num as 1 | 2 | 3 | 4);
                      }}
                      className={`flex flex-col items-center gap-1.5 p-1 rounded-xl transition ${
                        isDone ? "cursor-pointer hover:bg-[#FAF7F0]" : ""
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition ${
                          isDone
                            ? "bg-[#194B35] text-white"
                            : isActive
                            ? "bg-[#C39A5B] text-white ring-4 ring-[#C39A5B]/20"
                            : "bg-[#F5F1E7] text-[#7A8880]"
                        }`}
                      >
                        {isDone ? <Check className="w-3.5 h-3.5" /> : step.num}
                      </div>
                      <span
                        className={`text-[11px] font-medium hidden sm:inline ${
                          isActive ? "font-bold text-[#194B35]" : isDone ? "text-[#194B35]" : "text-[#7A8880]"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Global Error Banner */}
            {errors.global && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errors.global}</span>
              </div>
            )}

            {/* ============================================================ */}
            {/* STEP 1: CATEGORY & ISSUE DETAILS */}
            {/* ============================================================ */}
            {currentStep === 1 && (
              <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-8 space-y-6 shadow-2xs">
                <div>
                  <h3 className="text-base font-bold text-[#194B35]">
                    1. Select Issue Category
                  </h3>
                  <p className="text-xs text-[#5C6A64] mt-0.5">
                    Choose one of the 8 statutory municipal categories that best matches the issue.
                  </p>
                </div>

                {/* 8 Statutory Categories Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {CIVIC_CATEGORIES.map((cat) => {
                    const isSelected = categoryId === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => handleCategoryChange(cat.id)}
                        className={`p-3.5 rounded-2xl border text-left transition flex flex-col justify-between gap-2 ${
                          isSelected
                            ? "border-[#194B35] bg-[#E0F1E7]/40 ring-2 ring-[#194B35]/20"
                            : "border-[#EDE6D8] bg-[#FAF7F0] hover:border-[#194B35]/50"
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span
                            className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs"
                            style={{ backgroundColor: cat.color }}
                          >
                            {cat.icon === "Truck" && <Truck className="w-4 h-4" />}
                            {cat.icon === "Lightbulb" && <Lightbulb className="w-4 h-4" />}
                            {cat.icon === "Trash2" && <Trash2 className="w-4 h-4" />}
                            {cat.icon === "Droplets" && <Droplets className="w-4 h-4" />}
                            {cat.icon === "Building2" && <Building2 className="w-4 h-4" />}
                            {cat.icon === "ShieldAlert" && <ShieldAlert className="w-4 h-4" />}
                            {cat.icon === "HelpCircle" && <HelpCircle className="w-4 h-4" />}
                          </span>
                          {isSelected && (
                            <span className="w-5 h-5 rounded-full bg-[#194B35] text-white flex items-center justify-center">
                              <Check className="w-3 h-3" />
                            </span>
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-xs text-[#194B35] line-clamp-1">
                            {cat.name}
                          </div>
                          <div className="text-[10px] text-[#5C6A64] line-clamp-2 mt-0.5 leading-tight">
                            {cat.description}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Subcategory selector */}
                {selectedCategoryObj && selectedCategoryObj.subcategories.length > 0 && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#194B35] block">
                      Specific Problem Type
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {selectedCategoryObj.subcategories.map((sub) => (
                        <button
                          key={sub}
                          type="button"
                          onClick={() => setSubcategory(sub)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                            subcategory === sub
                              ? "bg-[#194B35] text-white font-bold"
                              : "bg-[#FAF7F0] border border-[#EDE6D8] text-[#33413B] hover:bg-[#F5F1E7]"
                          }`}
                        >
                          {sub}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Issue Title */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#194B35] flex items-center justify-between">
                    <span>Issue Title *</span>
                    <span className="text-[11px] font-normal text-[#7A8880]">Minimum 5 characters</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Deep pothole on Railway Station Road near auto stand"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F0] border border-[#DDD5C5] text-xs text-[#1A2420] focus:outline-hidden focus:border-[#194B35] focus:ring-1 focus:ring-[#194B35]"
                  />
                  {errors.title && (
                    <p className="text-[11px] text-rose-600 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.title}</span>
                    </p>
                  )}
                </div>

                {/* Detailed Description */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#194B35] flex items-center justify-between">
                    <span>Detailed Description *</span>
                    <span className="text-[11px] font-normal text-[#7A8880]">Minimum 15 characters</span>
                  </label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide full details: when did it start, how bad is the hazard, does it block traffic or pedestrians..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F0] border border-[#DDD5C5] text-xs text-[#1A2420] focus:outline-hidden focus:border-[#194B35] focus:ring-1 focus:ring-[#194B35] leading-relaxed"
                  />
                  {errors.description && (
                    <p className="text-[11px] text-rose-600 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.description}</span>
                    </p>
                  )}
                </div>

                {/* Navigation CTA */}
                <div className="pt-4 border-t border-[#EDE6D8] flex items-center justify-end">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-xl bg-[#194B35] text-white text-xs font-bold hover:bg-[#143E2C] transition flex items-center gap-1.5 shadow-xs"
                  >
                    <span>Next: Location & Ward</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* STEP 2: LOCATION & WARD */}
            {/* ============================================================ */}
            {currentStep === 2 && (
              <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-8 space-y-6 shadow-2xs">
                <div>
                  <h3 className="text-base font-bold text-[#194B35]">
                    2. Location & Municipal Ward
                  </h3>
                  <p className="text-xs text-[#5C6A64] mt-0.5">
                    Select the exact Tanur Municipality ward and provide landmark guidance for inspection officers.
                  </p>
                </div>

                {/* Ward Selection (Wards 1–45) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#194B35] flex items-center justify-between">
                    <span>Tanur Municipal Ward (1–45) *</span>
                    <span className="text-[11px] text-[#7A8880]">45 Officially Confirmed Wards</span>
                  </label>
                  <select
                    value={wardNumber}
                    onChange={(e) => setWardNumber(parseInt(e.target.value, 10))}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F0] border border-[#DDD5C5] text-xs text-[#1A2420] focus:outline-hidden focus:border-[#194B35] focus:ring-1 focus:ring-[#194B35]"
                  >
                    {tanurWards.map((w) => (
                      <option key={w.id} value={w.ward_number}>
                        Ward {w.ward_number}: {w.ward_name} ({w.reservation})
                      </option>
                    ))}
                  </select>
                  {errors.wardNumber && (
                    <p className="text-[11px] text-rose-600 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.wardNumber}</span>
                    </p>
                  )}
                  {selectedWardObj && (
                    <p className="text-[11px] text-[#5C6A64] bg-[#FAF7F0] p-2.5 rounded-xl border border-[#EDE6D8]">
                      Elected Councillor: <strong>{selectedWardObj.representative_name}</strong> • Committee: {selectedWardObj.committee_designation}
                    </p>
                  )}
                </div>

                {/* Specific Address or Landmark */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#194B35] flex items-center justify-between">
                    <span>Street, Landmark or Specific Address *</span>
                    <span className="text-[11px] text-[#7A8880]">Help field crew locate the spot</span>
                  </label>
                  <input
                    type="text"
                    value={addressLandmark}
                    onChange={(e) => setAddressLandmark(e.target.value)}
                    placeholder="e.g. Opposite Tanur Police Station, near the footbridge"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F0] border border-[#DDD5C5] text-xs text-[#1A2420] focus:outline-hidden focus:border-[#194B35] focus:ring-1 focus:ring-[#194B35]"
                  />
                  {errors.addressLandmark && (
                    <p className="text-[11px] text-rose-600 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.addressLandmark}</span>
                    </p>
                  )}
                </div>

                {/* Map & Coordinates Preview Box */}
                <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#194B35] flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[#C39A5B]" />
                      <span>Approximate Geographic Coordinates</span>
                    </span>
                    <span className="text-[11px] text-[#7A8880] font-mono">
                      {latitude.toFixed(4)}° N, {longitude.toFixed(4)}° E
                    </span>
                  </div>
                  <p className="text-[11px] text-[#5C6A64] leading-relaxed">
                    Default municipal center coordinates are automatically attached to place this complaint inside Tanur Municipality.
                  </p>
                  <div className="p-3 bg-amber-50/70 border border-amber-200/70 rounded-xl text-[11px] text-[#8C5B0F] flex items-start gap-2">
                    <Lock className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                    <span>
                      <strong>Privacy Protection:</strong> Exact house numbers and private residential coordinates are protected and never revealed on public maps. Only general ward and landmark information is visible to the public.
                    </span>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="pt-4 border-t border-[#EDE6D8] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-5 py-2.5 rounded-xl bg-[#FAF7F0] border border-[#DDD5C5] text-[#194B35] text-xs font-bold hover:bg-[#F5F1E7] transition flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-xl bg-[#194B35] text-white text-xs font-bold hover:bg-[#143E2C] transition flex items-center gap-1.5 shadow-xs"
                  >
                    <span>Next: Evidence & Contact</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* STEP 3: EVIDENCE & CONTACT PREFERENCES */}
            {/* ============================================================ */}
            {currentStep === 3 && (
              <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-8 space-y-6 shadow-2xs">
                <div>
                  <h3 className="text-base font-bold text-[#194B35]">
                    3. Evidence & Contact Preferences
                  </h3>
                  <p className="text-xs text-[#5C6A64] mt-0.5">
                    Attach optional photo proof and select how municipal officers should follow up with you.
                  </p>
                </div>

                {/* Photo Evidence Section */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-[#194B35] flex items-center justify-between">
                    <span>Photo Evidence (Optional)</span>
                    <span className="text-[11px] text-[#7A8880]">{images.length}/3 photos added</span>
                  </label>

                  {/* Attached Images Grid */}
                  {images.length > 0 && (
                    <div className="grid grid-cols-3 gap-3">
                      {images.map((img, idx) => (
                        <div key={idx} className="relative rounded-2xl overflow-hidden border border-[#EDE6D8] aspect-4/3 bg-gray-100 group">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={img} alt={`Evidence ${idx + 1}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-rose-600 transition"
                            title="Remove image"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Image Attachment Controls */}
                  {images.length < 3 && (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="url"
                          value={imageUrlInput}
                          onChange={(e) => setImageUrlInput(e.target.value)}
                          placeholder="Paste image URL (https://...)"
                          className="flex-1 px-4 py-2 rounded-xl bg-[#FAF7F0] border border-[#DDD5C5] text-xs text-[#1A2420] focus:outline-hidden focus:border-[#194B35]"
                        />
                        <button
                          type="button"
                          onClick={handleAddCustomImage}
                          className="px-4 py-2 rounded-xl bg-[#194B35] text-white text-xs font-bold hover:bg-[#143E2C] transition shadow-xs shrink-0"
                        >
                          Add URL
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleAddSampleImage}
                          className="px-3 py-1.5 rounded-lg bg-[#FAF7F0] border border-[#DDD5C5] text-[11px] font-bold text-[#194B35] hover:bg-[#F5F1E7] transition flex items-center gap-1.5"
                        >
                          <Camera className="w-3.5 h-3.5 text-[#C39A5B]" />
                          <span>Attach Sample Photo</span>
                        </button>
                        <span className="text-[10px] text-[#7A8880]">
                          Clear photos significantly accelerate field inspection.
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Contact Preference Selection */}
                <div className="space-y-2 pt-2 border-t border-[#EDE6D8]">
                  <label className="text-xs font-bold text-[#194B35] block">
                    How should municipal staff reach you if clarification is needed? *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { id: "in_app", label: "In-App Updates", desc: "Notification Center", icon: Bell },
                      { id: "phone", label: "Phone / SMS", desc: "Voice or WhatsApp", icon: Phone },
                      { id: "email", label: "Email", desc: "Written Updates", icon: Mail },
                      { id: "none", label: "No Contact", desc: "Silent Follow-Up", icon: ShieldCheck },
                    ].map((pref) => {
                      const isSelected = contactPreference === pref.id;
                      const IconComp = pref.icon;
                      return (
                        <button
                          key={pref.id}
                          type="button"
                          onClick={() => setContactPreference(pref.id as any)}
                          className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between ${
                            isSelected
                              ? "border-[#194B35] bg-[#E0F1E7]/50 ring-2 ring-[#194B35]/20"
                              : "border-[#EDE6D8] bg-[#FAF7F0] hover:border-[#194B35]/40"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <IconComp className={`w-4 h-4 ${isSelected ? "text-[#194B35]" : "text-[#7A8880]"}`} />
                            {isSelected && <Check className="w-3.5 h-3.5 text-[#194B35]" />}
                          </div>
                          <div className="mt-2">
                            <span className="block text-xs font-bold text-[#194B35]">{pref.label}</span>
                            <span className="block text-[10px] text-[#7A8880]">{pref.desc}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {(contactPreference === "phone" || contactPreference === "email") && (
                    <div className="pt-2">
                      <input
                        type={contactPreference === "email" ? "email" : "tel"}
                        value={reporterContact}
                        onChange={(e) => setReporterContact(e.target.value)}
                        placeholder={contactPreference === "email" ? "Enter your email address" : "Enter your 10-digit mobile number"}
                        className="w-full px-4 py-2 rounded-xl bg-[#FAF7F0] border border-[#DDD5C5] text-xs text-[#1A2420] focus:outline-hidden focus:border-[#194B35]"
                      />
                      {errors.reporterContact && (
                        <p className="text-[11px] text-rose-600 font-medium mt-1">
                          {errors.reporterContact}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Priority Selection */}
                <div className="space-y-1.5 pt-2 border-t border-[#EDE6D8]">
                  <label className="text-xs font-bold text-[#194B35] block">
                    Reported Hazard Level
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: "low", label: "Low (Minor inconvenience)" },
                      { id: "medium", label: "Medium (Standard maintenance)" },
                      { id: "high", label: "High (Active daily nuisance)" },
                      { id: "urgent", label: "Urgent (Immediate safety hazard)" },
                    ].map((lvl) => (
                      <button
                        key={lvl.id}
                        type="button"
                        onClick={() => setPriority(lvl.id as any)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                          priority === lvl.id
                            ? "bg-[#194B35] text-white font-bold"
                            : "bg-[#FAF7F0] border border-[#EDE6D8] text-[#33413B] hover:bg-[#F5F1E7]"
                        }`}
                      >
                        {lvl.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Anonymous Toggle */}
                <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-[#194B35] block">
                      Submit Anonymously
                    </span>
                    <span className="text-[11px] text-[#5C6A64] block">
                      Your identity will be masked as &quot;Anonymous Resident&quot; on public feeds.
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#194B35]"></div>
                  </label>
                </div>

                {/* Navigation Buttons */}
                <div className="pt-4 border-t border-[#EDE6D8] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-5 py-2.5 rounded-xl bg-[#FAF7F0] border border-[#DDD5C5] text-[#194B35] text-xs font-bold hover:bg-[#F5F1E7] transition flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-xl bg-[#194B35] text-white text-xs font-bold hover:bg-[#143E2C] transition flex items-center gap-1.5 shadow-xs"
                  >
                    <span>Next: Review & Submit</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* STEP 4: PRE-SUBMISSION REVIEW */}
            {/* ============================================================ */}
            {currentStep === 4 && (
              <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-8 space-y-6 shadow-2xs">
                <div>
                  <h3 className="text-base font-bold text-[#194B35]">
                    4. Pre-Submission Review
                  </h3>
                  <p className="text-xs text-[#5C6A64] mt-0.5">
                    Please review all details before registering this report into the municipal queue.
                  </p>
                </div>

                {/* Review Card */}
                <div className="rounded-2xl border border-[#EDE6D8] bg-[#FAF7F0] p-5 space-y-4">
                  {/* Category & Title */}
                  <div className="flex items-start justify-between pb-3 border-b border-[#EDE6D8]">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#194B35] text-white">
                          {selectedCategoryObj?.name}
                        </span>
                        <span className="text-[11px] text-[#7A8880] font-medium">
                          {subcategory}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-[#194B35]">{title}</h4>
                      <p className="text-xs text-[#5C6A64] leading-relaxed">{description}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="text-xs font-bold text-[#C39A5B] hover:underline shrink-0"
                    >
                      Edit
                    </button>
                  </div>

                  {/* Ward & Location */}
                  <div className="flex items-start justify-between pb-3 border-b border-[#EDE6D8] text-xs">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-[#7A8880] block">
                        Location Details
                      </span>
                      <p className="font-semibold text-[#1A2420]">
                        Ward {wardNumber}: {selectedWardObj?.ward_name || getTanurWardName(wardNumber)}
                      </p>
                      <p className="text-[#5C6A64]">
                        {addressLandmark} • Tanur Municipality
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="text-xs font-bold text-[#C39A5B] hover:underline shrink-0"
                    >
                      Edit
                    </button>
                  </div>

                  {/* Preferences & Evidence */}
                  <div className="flex items-start justify-between text-xs">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-[#7A8880] block">
                        Preferences & Attachments
                      </span>
                      <p className="text-[#33413B]">
                        Contact: <strong>{contactPreference.replace('_', ' ')}</strong> {reporterContact && `(${reporterContact})`} • Priority: <strong>{priority}</strong>
                      </p>
                      <p className="text-[#5C6A64]">
                        Identity: {isAnonymous ? "Anonymous Resident" : (user?.display_name || user?.email || "Tanur Resident")} • Photos: {images.length} attached
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="text-xs font-bold text-[#C39A5B] hover:underline shrink-0"
                    >
                      Edit
                    </button>
                  </div>
                </div>

                {/* Statutory Disclaimer Notice */}
                <div className="p-4 rounded-2xl bg-[#E0F1E7]/40 border border-[#BDE3CE] text-xs text-[#194B35] space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>Statutory Transparency Notice</span>
                  </div>
                  <p className="text-[11px] text-[#2A3730] leading-relaxed">
                    OUR NATION is an independent civic platform designed to connect citizens with verified municipal workflows. All submissions are cross-referenced with official Tanur Municipality ward records. By submitting, you confirm that the information provided is factual to the best of your knowledge.
                  </p>
                </div>

                {/* Final Submission Buttons */}
                <div className="pt-4 border-t border-[#EDE6D8] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-5 py-2.5 rounded-xl bg-[#FAF7F0] border border-[#DDD5C5] text-[#194B35] text-xs font-bold hover:bg-[#F5F1E7] transition flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmitReport}
                    disabled={isSubmitting}
                    className="px-7 py-3 rounded-xl bg-[#194B35] text-white text-xs font-bold hover:bg-[#143E2C] transition flex items-center gap-2 shadow-xs disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Registering Complaint...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-amber-300" />
                        <span>Submit Complaint</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
