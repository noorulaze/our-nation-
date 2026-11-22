"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { useAuth } from "@/lib/auth/context";
import { 
  publicServiceStore, 
  SERVICE_CATEGORIES, 
  getServiceCategoryByKey 
} from "@/lib/data/publicServicesData";
import { getTanurWardName } from "@/lib/data/civicConnectData";
import { 
  FileText, 
  Building2, 
  Clock, 
  CreditCard, 
  CheckCircle2, 
  ExternalLink, 
  Phone, 
  MapPin, 
  Mail, 
  ShieldCheck, 
  Info, 
  ArrowLeft, 
  SendHorizontal, 
  ChevronDown, 
  ChevronUp, 
  AlertCircle,
  FileCheck2,
  CalendarCheck2,
  Sparkles,
  HelpCircle,
  Check,
  X,
  Share2
} from "lucide-react";

export default function PublicServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const slug = (params?.slug as string) || "";

  const service = useMemo(() => {
    return publicServiceStore.getServiceBySlug(slug);
  }, [slug]);

  // UI state for FAQs accordion
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedLink, setCopiedLink] = useState(false);

  // Guidance Application Modal State
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applicantName, setApplicantName] = useState(user?.display_name || user?.username || "");
  const [applicantEmail, setApplicantEmail] = useState(user?.email || "");
  const [applicantPhone, setApplicantPhone] = useState(user?.phone || "");
  const [wardNumber, setWardNumber] = useState<number>((user as any)?.ward_number || 12);
  const [notes, setNotes] = useState("");
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  // If service not found
  if (!service) {
    return (
      <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
          <HelpCircle className="w-16 h-16 text-gray-300 mx-auto" />
          <h1 className="text-2xl font-bold text-[#194B35]">Public Service Not Found</h1>
          <p className="text-sm text-[#5C6A64]">
            The requested municipal public service could not be located or may have been updated.
          </p>
          <div className="pt-4">
            <Link
              href="/public-services"
              className="px-5 py-2.5 rounded-xl bg-[#194B35] text-white text-xs font-bold hover:bg-[#143E2C] transition inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Services Directory</span>
            </Link>
          </div>
        </main>
        <Footer />
        <BottomNav />
      </div>
    );
  }

  const category = getServiceCategoryByKey(service.category);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const toggleDocCheck = (docName: string) => {
    setCheckedDocs(prev => ({ ...prev, [docName]: !prev[docName] }));
  };

  const handleGuidanceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      if (!applicantName.trim()) throw new Error("Please enter your name");
      if (!applicantEmail.trim() || !applicantEmail.includes("@")) throw new Error("Please enter a valid email address");
      if (!applicantPhone.trim() || applicantPhone.length < 7) throw new Error("Please enter a valid phone number");
      if (wardNumber < 1 || wardNumber > 45) throw new Error("Please select a valid Tanur Municipality ward (1 to 45)");

      const confirmedDocs = Object.keys(checkedDocs)
        .filter(k => checkedDocs[k])
        .map(name => ({ name }));

      // Submit application via publicServiceStore
      const app = publicServiceStore.submitApplication({
        service_id: service.id,
        applicant_id: user?.id || "u0000000-0000-0000-0000-000000000003",
        applicant_name: applicantName.trim(),
        applicant_email: applicantEmail.trim(),
        applicant_phone: applicantPhone.trim(),
        ward_number: Number(wardNumber),
        documents: confirmedDocs,
        notes: notes.trim(),
      });

      setSubmittedRef(app.reference_no);
    } catch (err: any) {
      setSubmissionError(err.message || "Failed to submit application");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] flex flex-col font-sans selection:bg-[#194B35]/20 selection:text-[#194B35]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 w-full">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Public Services", href: "/public-services" },
            { label: service.title },
          ]}
        />

        {/* Back Button */}
        <div>
          <Link
            href="/public-services"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#194B35] hover:text-emerald-700 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Public Services</span>
          </Link>
        </div>

        {/* ========================================================================= */}
        {/* SERVICE HEADER BANNER                                                    */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-3xl sm:rounded-[36px] border border-[#EDE6D8] p-6 sm:p-10 shadow-xs relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#194B35]/10 text-[#194B35] border border-[#194B35]/20">
                  {service.category_name}
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs font-semibold text-[#5C6A64] bg-[#FAF7F0] border border-[#EDE6D8]">
                  Verified: {service.last_verified_date}
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200">
                  Tanur Wards 1 to 45
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#194B35] tracking-tight leading-snug">
                {service.title}
              </h1>

              <p className="text-xs sm:text-sm font-semibold text-[#C39A5B]">
                {service.department}
              </p>

              <p className="text-xs sm:text-sm text-[#5C6A64] leading-relaxed pt-1">
                {service.summary}
              </p>
            </div>

            {/* Share & Quick Action */}
            <div className="flex items-center gap-2 self-start shrink-0">
              <button
                onClick={handleShare}
                className="px-3.5 py-2 rounded-xl border border-[#EDE6D8] bg-[#FAF7F0] hover:bg-[#EDE6D8] text-xs font-bold text-[#194B35] transition inline-flex items-center gap-1.5"
                title="Copy service link"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedLink ? "Link Copied!" : "Share"}</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-6 border-t border-[#EDE6D8]">
            <div className="bg-[#FAF7F0] p-3.5 rounded-2xl border border-[#EDE6D8]">
              <span className="text-[10px] font-bold text-[#7A8880] uppercase tracking-wider flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#194B35]" /> Processing Time
              </span>
              <p className="font-bold text-xs sm:text-sm text-[#1A2420] mt-1">
                {service.processing_time_text}
              </p>
            </div>

            <div className="bg-[#FAF7F0] p-3.5 rounded-2xl border border-[#EDE6D8]">
              <span className="text-[10px] font-bold text-[#7A8880] uppercase tracking-wider flex items-center gap-1">
                <CreditCard className="w-3 h-3 text-[#194B35]" /> Statutory Fee
              </span>
              <p className="font-bold text-xs sm:text-sm text-[#1A2420] mt-1">
                {service.fee_structure.includes("Free") ? "Free / Zero Fee" : "Statutory Schedule"}
              </p>
            </div>

            <div className="bg-[#FAF7F0] p-3.5 rounded-2xl border border-[#EDE6D8]">
              <span className="text-[10px] font-bold text-[#7A8880] uppercase tracking-wider flex items-center gap-1">
                <Building2 className="w-3 h-3 text-[#194B35]" /> Online Portal
              </span>
              <p className="font-bold text-xs sm:text-sm text-[#1A2420] mt-1 truncate">
                {service.online_system_name || "K-Smart Kerala"}
              </p>
            </div>

            <div className="bg-[#FAF7F0] p-3.5 rounded-2xl border border-[#EDE6D8]">
              <span className="text-[10px] font-bold text-[#7A8880] uppercase tracking-wider flex items-center gap-1">
                <Phone className="w-3 h-3 text-[#194B35]" /> Switchboard
              </span>
              <p className="font-bold text-xs sm:text-sm text-[#1A2420] mt-1">
                0494 2440228
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* STATUTORY NOTICE                                                          */}
        {/* ========================================================================= */}
        <div className="bg-[#FAF4E6] border border-[#E8DCBF] rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
          <Info className="w-5 h-5 text-[#855B14] shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-[#4A3D2A] leading-relaxed">
            <strong className="font-bold text-[#2A2315]">Statutory Guidance Notice:</strong> This page details the official statutory requirements of Tanur Municipality under Kerala Local Self Government rules. Final processing, certificate signature, and statutory permit sanctions are rendered by the Secretary and designated officers through official Government portals.
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TWO-COLUMN CONTENT GRID                                                   */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Comprehensive Details (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* 1. Who Can Apply (Eligibility) */}
            <section className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-8 space-y-4 shadow-2xs">
              <div className="flex items-center gap-2 text-[#194B35]">
                <ShieldCheck className="w-5 h-5 text-[#C39A5B]" />
                <h2 className="text-lg sm:text-xl font-bold">
                  Who Can Apply (Eligibility)
                </h2>
              </div>
              <ul className="space-y-3">
                {service.eligibility.map((criterion, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#1A2420]">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 font-bold" />
                    </div>
                    <span className="leading-relaxed">{criterion}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 2. Required Documents Checklist */}
            <section className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-8 space-y-4 shadow-2xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#194B35]">
                  <FileText className="w-5 h-5 text-[#C39A5B]" />
                  <h2 className="text-lg sm:text-xl font-bold">
                    Required Documents Checklist
                  </h2>
                </div>
                <span className="text-xs font-semibold text-[#5C6A64]">
                  {service.required_documents.length} verified items
                </span>
              </div>
              <div className="space-y-2.5">
                {service.required_documents.map((doc, idx) => (
                  <div 
                    key={idx} 
                    className="p-3.5 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] flex items-start gap-3"
                  >
                    <span className="w-6 h-6 rounded-lg bg-[#194B35] text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-[#1A2420] leading-relaxed">
                      {doc}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* 3. Step-by-Step Statutory Procedure */}
            <section className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-8 space-y-5 shadow-2xs">
              <div className="flex items-center gap-2 text-[#194B35]">
                <CalendarCheck2 className="w-5 h-5 text-[#C39A5B]" />
                <h2 className="text-lg sm:text-xl font-bold">
                  Step-by-Step Application Procedure
                </h2>
              </div>
              <div className="space-y-4 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-[#EDE6D8] before:z-0">
                {service.procedure_steps.map((step) => (
                  <div key={step.step_number} className="relative z-10 flex items-start gap-4">
                    <div className="w-7 h-7 rounded-full bg-[#194B35] text-amber-300 font-bold text-xs flex items-center justify-center shrink-0 shadow-xs border-2 border-white">
                      {step.step_number}
                    </div>
                    <div className="flex-1 bg-[#FAF7F0] p-4 rounded-2xl border border-[#EDE6D8] space-y-1">
                      <h3 className="font-bold text-xs sm:text-sm text-[#194B35]">
                        {step.title}
                      </h3>
                      <p className="text-xs text-[#5C6A64] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. Statutory Fees & Timeline Details */}
            <section className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-8 space-y-4 shadow-2xs">
              <div className="flex items-center gap-2 text-[#194B35]">
                <CreditCard className="w-5 h-5 text-[#C39A5B]" />
                <h2 className="text-lg sm:text-xl font-bold">
                  Statutory Fees & Processing Schedule
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] space-y-1">
                  <span className="text-[10px] font-bold text-[#7A8880] uppercase tracking-wider">
                    Statutory Fee Structure
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-[#1A2420] leading-relaxed">
                    {service.fee_structure}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] space-y-1">
                  <span className="text-[10px] font-bold text-[#7A8880] uppercase tracking-wider">
                    Processing Duration
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-[#1A2420] leading-relaxed">
                    {service.processing_time_text}
                  </p>
                </div>
              </div>
            </section>

            {/* 5. Frequently Asked Questions */}
            {service.faqs && service.faqs.length > 0 && (
              <section className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-8 space-y-4 shadow-2xs">
                <div className="flex items-center gap-2 text-[#194B35]">
                  <HelpCircle className="w-5 h-5 text-[#C39A5B]" />
                  <h2 className="text-lg sm:text-xl font-bold">
                    Frequently Asked Questions
                  </h2>
                </div>
                <div className="space-y-3">
                  {service.faqs.map((faq, idx) => {
                    const isOpen = openFaqIndex === idx;
                    return (
                      <div 
                        key={idx}
                        className="rounded-2xl border border-[#EDE6D8] overflow-hidden transition"
                      >
                        <button
                          onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                          className="w-full p-4 text-left flex items-center justify-between gap-4 bg-[#FAF7F0] hover:bg-[#EDE6D8]/50 transition"
                        >
                          <span className="font-bold text-xs sm:text-sm text-[#194B35]">
                            {faq.question}
                          </span>
                          {isOpen ? (
                            <ChevronUp className="w-4 h-4 text-[#194B35] shrink-0" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                          )}
                        </button>
                        {isOpen && (
                          <div className="p-4 bg-white text-xs sm:text-sm text-[#5C6A64] leading-relaxed border-t border-[#EDE6D8]">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* 6. Legal Reference & Verification Audit */}
            <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#5C6A64]">
              <div>
                <span className="font-bold text-[#194B35]">Statutory Rule Reference: </span>
                <span>{service.source_reference}</span>
              </div>
              <div className="shrink-0 text-emerald-800 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Audited: {service.last_verified_date}</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Actions & Helpdesk (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* ACTION 1: Official Portal Link */}
            {service.official_portal_url && service.official_portal_url.startsWith("http") && (
              <div className="bg-gradient-to-br from-[#194B35] to-[#143E2C] rounded-3xl p-6 text-white space-y-4 shadow-md border border-[#0F3022]">
                <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
                  <ExternalLink className="w-4 h-4" />
                  <span>State Government Portal</span>
                </div>
                <h3 className="font-bold text-lg leading-snug">
                  Apply on {service.official_portal_name || "Official Portal"}
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Submit your statutory application directly on the Government of Kerala portal for legal sanction and digital certificate download.
                </p>
                <a
                  href={service.official_portal_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#143E2C] font-bold text-xs transition shadow-sm flex items-center justify-center gap-2"
                >
                  <span>Open Official Portal</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}

            {/* ACTION 2: Municipal Guidance Application CTA */}
            <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 space-y-4 shadow-2xs" id="apply">
              <div className="flex items-center gap-2 text-[#194B35] text-xs font-bold uppercase tracking-wider">
                <FileCheck2 className="w-4 h-4 text-[#C39A5B]" />
                <span>OUR NATION Guidance</span>
              </div>
              <h3 className="font-bold text-base text-[#194B35]">
                Request Document Verification & Guidance
              </h3>
              <p className="text-xs text-[#5C6A64] leading-relaxed">
                Need help checking your documents or understanding the statutory forms before submitting? Our civic desk assists Tanur residents.
              </p>

              <button
                onClick={() => setIsApplyModalOpen(true)}
                className="w-full py-3 px-4 rounded-xl bg-[#194B35] hover:bg-[#143E2C] text-white font-bold text-xs transition shadow-2xs flex items-center justify-center gap-2"
              >
                <SendHorizontal className="w-4 h-4 text-amber-300" />
                <span>Request Guidance Application</span>
              </button>

              <div className="text-[11px] text-[#7A8880] flex items-center gap-1.5 pt-1">
                <Info className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Generates instant reference tracking ID (PS-TNR-2026-XXXX).</span>
              </div>
            </div>

            {/* Municipal Office Contact Box */}
            <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 space-y-4 shadow-2xs">
              <div className="flex items-center gap-2 text-[#194B35]">
                <Building2 className="w-4 h-4 text-[#C39A5B]" />
                <h3 className="font-bold text-sm">
                  Tanur Municipal Office Helpdesk
                </h3>
              </div>
              
              <div className="space-y-3 text-xs text-[#5C6A64]">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#194B35] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    Tanur Municipality Office, Main Road, Tanur, Malappuram - 676302
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#194B35] shrink-0" />
                  <a href="tel:04942440228" className="font-bold text-[#194B35] hover:underline">
                    0494 2440228 (Switchboard)
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#194B35] shrink-0" />
                  <span>tanurmunicipality@gmail.com</span>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#194B35] shrink-0 mt-0.5" />
                  <span>Mon–Sat: 10:00 AM – 5:00 PM (2nd Sat & Sun Holiday)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* GUIDANCE APPLICATION MODAL                                               */}
        {/* ========================================================================= */}
        {isApplyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-white rounded-3xl border border-[#EDE6D8] max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              {/* Close Button */}
              <button
                onClick={() => {
                  setIsApplyModalOpen(false);
                  setSubmittedRef(null);
                }}
                className="absolute right-5 top-5 text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>

              {submittedRef ? (
                /* Submission Success Confirmation */
                <div className="text-center py-6 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <h3 className="text-xl font-bold text-[#194B35]">
                    Guidance Request Submitted
                  </h3>

                  <div className="bg-[#FAF7F0] p-4 rounded-2xl border border-[#EDE6D8] space-y-1.5 max-w-sm mx-auto">
                    <span className="text-[11px] font-bold text-[#7A8880] uppercase tracking-wider">
                      Your Unique Reference Number
                    </span>
                    <p className="text-xl font-black text-[#194B35] tracking-wide font-mono">
                      {submittedRef}
                    </p>
                    <span className="text-[10px] text-emerald-700 font-semibold block">
                      Status: Submitted (Under Review)
                    </span>
                  </div>

                  <p className="text-xs text-[#5C6A64] max-w-md mx-auto leading-relaxed">
                    Our municipal guidance desk will review your documents and verify details. You can track this request at any time in your Citizen Dashboard.
                  </p>

                  <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-200 text-left text-[11px] text-amber-900 leading-relaxed">
                    <strong>Note:</strong> This is an assistance and document verification request through OUR NATION. For statutory certificate sanctions, you must also complete official submission through {service.online_system_name || "the Kerala Government portal"}.
                  </div>

                  <div className="pt-2 flex items-center justify-center gap-3">
                    <Link
                      href="/dashboard?tab=applications"
                      className="px-5 py-2.5 rounded-xl bg-[#194B35] text-white text-xs font-bold hover:bg-[#143E2C] transition"
                    >
                      View in My Applications
                    </Link>
                    <button
                      onClick={() => {
                        setIsApplyModalOpen(false);
                        setSubmittedRef(null);
                      }}
                      className="px-4 py-2.5 rounded-xl border border-[#EDE6D8] bg-[#FAF7F0] text-xs font-bold text-[#194B35] hover:bg-[#EDE6D8] transition"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                /* Submission Form */
                <form onSubmit={handleGuidanceSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                      OUR NATION Municipal Assistance
                    </span>
                    <h3 className="text-xl font-bold text-[#194B35]">
                      Request Document Verification
                    </h3>
                    <p className="text-xs text-[#5C6A64]">
                      Service: <strong>{service.title}</strong>
                    </p>
                  </div>

                  {submissionError && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{submissionError}</span>
                    </div>
                  )}

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#1A2420]">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        placeholder="Your legal name"
                        className="w-full px-3.5 py-2 rounded-xl border border-[#EDE6D8] bg-[#FAF7F0]/50 text-xs focus:ring-2 focus:ring-[#194B35] focus:outline-hidden"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#1A2420]">
                        Contact Telephone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={applicantPhone}
                        onChange={(e) => setApplicantPhone(e.target.value)}
                        placeholder="Mobile number"
                        className="w-full px-3.5 py-2 rounded-xl border border-[#EDE6D8] bg-[#FAF7F0]/50 text-xs focus:ring-2 focus:ring-[#194B35] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#1A2420]">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={applicantEmail}
                        onChange={(e) => setApplicantEmail(e.target.value)}
                        placeholder="citizen@example.com"
                        className="w-full px-3.5 py-2 rounded-xl border border-[#EDE6D8] bg-[#FAF7F0]/50 text-xs focus:ring-2 focus:ring-[#194B35] focus:outline-hidden"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#1A2420]">
                        Tanur Ward (1–45) <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={wardNumber}
                        onChange={(e) => setWardNumber(Number(e.target.value))}
                        className="w-full px-3.5 py-2 rounded-xl border border-[#EDE6D8] bg-[#FAF7F0]/50 text-xs font-semibold focus:ring-2 focus:ring-[#194B35] focus:outline-hidden"
                      >
                        {Array.from({ length: 45 }, (_, i) => i + 1).map((w) => (
                          <option key={w} value={w}>
                            Ward {w} — {getTanurWardName(w)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Document Readiness Checklist */}
                  <div className="space-y-2 pt-1">
                    <label className="text-xs font-bold text-[#1A2420] block">
                      Documents You Have Ready:
                    </label>
                    <div className="space-y-1.5 max-h-36 overflow-y-auto p-2 rounded-xl border border-[#EDE6D8] bg-[#FAF7F0]/30 text-xs">
                      {service.required_documents.map((doc, idx) => (
                        <label key={idx} className="flex items-start gap-2 cursor-pointer py-1">
                          <input
                            type="checkbox"
                            checked={!!checkedDocs[doc]}
                            onChange={() => toggleDocCheck(doc)}
                            className="mt-0.5 rounded-sm text-[#194B35] focus:ring-[#194B35]"
                          />
                          <span className="text-xs text-[#5C6A64] leading-tight">{doc}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Notes & Inquiries */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#1A2420]">
                      Special Instructions or Questions (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Need clarification regarding plinth area calculation or late birth registration..."
                      className="w-full px-3.5 py-2 rounded-xl border border-[#EDE6D8] bg-[#FAF7F0]/50 text-xs focus:ring-2 focus:ring-[#194B35] focus:outline-hidden"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsApplyModalOpen(false)}
                      className="px-4 py-2.5 rounded-xl border border-[#EDE6D8] text-xs font-bold text-[#5C6A64] hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-5 py-2.5 rounded-xl bg-[#194B35] hover:bg-[#143E2C] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs disabled:opacity-50"
                    >
                      <span>{isSubmitting ? "Submitting..." : "Submit Guidance Request"}</span>
                      <SendHorizontal className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
