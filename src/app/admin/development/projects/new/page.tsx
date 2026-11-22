"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { DevelopmentNav } from "@/components/development/DevelopmentNav";
import { useAuth } from "@/lib/auth/context";
import { 
  digitalMunicipalityStore, 
  TRANSPARENT_PROJECT_CATEGORIES,
  TANUR_LOCALITIES,
  TANUR_MUNICIPAL_WARDS 
} from "@/lib/data/digitalMunicipalityData";
import { 
  ProjectCategory, 
  ProjectStatus, 
  InformationSourceType 
} from "@/types/digitalMunicipality";
import {
  HardHat,
  ArrowLeft,
  Save,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Building2,
  MapPin,
  Calendar,
  Banknote,
  Compass,
  FileText,
  TrendingUp,
  DollarSign
} from "lucide-react";

export default function CreateDevelopmentProjectPage() {
  const router = useRouter();
  const { role, user } = useAuth();
  const isAuthorized = role === "admin" || role === "moderator";

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "roads_transportation" as ProjectCategory,
    locality: "Tanur Town",
    ward_number: 1,
    department: "Tanur Municipality Engineering Wing",
    implementing_agency: "Tanur Municipality Engineering Wing",
    official_source_name: "LSGD Kerala & Tanur Municipal Council",
    official_source_url: "https://lsgkerala.gov.in/",
    source_type: "official_published" as InformationSourceType,
    approved_budget: "₹1.50 Crores",
    estimated_cost: "₹1.60 Crores",
    actual_expenditure: "",
    funding_source: "Municipal Plan Fund 2024-25",
    announcement_date: new Date().toISOString().split("T")[0],
    approval_date: "",
    start_date: "",
    expected_completion_date: "",
    status: "Proposed" as ProjectStatus,
    progress_percentage: 0,
    latitude: 10.9768,
    longitude: 75.8672,
    project_image: "https://images.unsplash.com/photo-1541888946425-d0fbb1861593?w=800&auto=format&fit=crop",
    contractor_name: "",
    verification_status: "verified" as "verified" | "pending_verification" | "unverified",
  });

  const [feedback, setFeedback] = useState<string | null>(null);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
        <Navbar />
        <DevelopmentNav />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl border border-[#EDE6D8] p-8 text-center shadow-card">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-[#B87A1E] flex items-center justify-center mx-auto mb-4 border border-amber-200">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-[#1A2420]">
              Administrative Access Required
            </h2>
            <div className="mt-6">
              <Link
                href="/development"
                className="w-full py-2.5 rounded-xl bg-[#194B35] text-white font-bold text-xs transition inline-block text-center shadow-xs"
              >
                Return to Development Tracker
              </Link>
            </div>
          </div>
        </main>
        <Footer />
        <BottomNav />
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) return;

    const catObj = TRANSPARENT_PROJECT_CATEGORIES.find((c) => c.key === form.category);
    const wardObj = TANUR_MUNICIPAL_WARDS.find((w) => w.ward_number === Number(form.ward_number));

    const newProject = digitalMunicipalityStore.addProject({
      municipality_id: "40000000-0000-0000-0000-000000000007",
      municipality_name: "Tanur Municipality",
      municipality_name_ml: "Tanur Municipality",
      ward_number: Number(form.ward_number),
      ward_name: wardObj?.ward_name || `Ward ${form.ward_number}`,
      ward_name_ml: `Ward ${form.ward_number}`,
      locality: form.locality,
      locality_ml: form.locality,
      title: form.title,
      title_ml: form.title,
      description: form.description,
      description_ml: form.description,
      category: form.category,
      category_name: catObj?.label || "Public Infrastructure",
      category_name_ml: catObj?.label || "Public Infrastructure",
      department: form.department,
      department_ml: form.department,
      implementing_agency: form.implementing_agency || form.department,
      official_source_name: form.official_source_name,
      official_source_url: form.official_source_url,
      source_type: form.source_type,
      budget_sanctioned: form.approved_budget,
      approved_budget: form.approved_budget,
      estimated_cost: form.estimated_cost,
      actual_expenditure: form.actual_expenditure || undefined,
      funding_source: form.funding_source,
      announcement_date: form.announcement_date,
      approval_date: form.approval_date || undefined,
      start_date: form.start_date || undefined,
      expected_completion_date: form.expected_completion_date || undefined,
      status: form.status,
      progress_percentage: Number(form.progress_percentage) || 0,
      latitude: Number(form.latitude) || 10.9768,
      longitude: Number(form.longitude) || 75.8672,
      project_image: form.project_image,
      project_images: [form.project_image],
      gallery_images: [form.project_image],
      contractor_name: form.contractor_name || undefined,
      is_verified: true,
      verification_status: form.verification_status,
      last_verified_date: new Date().toISOString().split("T")[0],
      source_documents: [],
      progress_updates: [
        {
          id: "upd-" + Date.now(),
          project_id: "",
          date: form.announcement_date,
          title: "Project Registered in Municipal Ledger",
          title_ml: "Project Registered in Municipal Ledger",
          note: `Project officially listed under ${catObj?.label}. Administrative Status: ${form.status}. Approved Budget: ${form.approved_budget}.`,
          official_remarks: `Registered by ${user?.display_name || user?.username || "Admin Officer"} under municipal plan supervision.`,
          status_transition: form.status,
          milestone_percentage: Number(form.progress_percentage) || 0,
          verified_by: user?.display_name || user?.username || "Tanur Municipal Engineering Wing",
          created_at: new Date().toISOString(),
        }
      ],
    });

    setFeedback("Project registered successfully in the municipal ledger! Redirecting to public overview...");
    setTimeout(() => {
      router.push(`/development/projects/${newProject.id}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] flex flex-col font-sans">
      <Navbar />
      <DevelopmentNav />

      <main className="flex-1 pb-24">
        {/* Header */}
        <div className="bg-gradient-to-b from-[#194B35] to-[#123626] text-white pt-8 pb-10 shadow-inner">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <Link
              href="/admin/development/projects"
              className="inline-flex items-center gap-1.5 text-xs text-[#C39A5B] font-bold mb-2 hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Projects Registry</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Register New Municipal Development Project
            </h1>
            <p className="text-xs text-[#EDE6D8] mt-1">
              Add verified civil works, administrative sanctions, three-way budget breakdowns, and GIS coordinates for Tanur Municipality (Wards 1–45).
            </p>
          </div>
        </div>

        {feedback && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-4 mb-4">
            <div className="p-4 rounded-2xl bg-emerald-700 text-white text-xs font-semibold flex items-center gap-2 shadow-lg animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-[#C39A5B]" />
              <span>{feedback}</span>
            </div>
          </div>
        )}

        {/* Form Container */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-6">
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE6D8] shadow-card space-y-6 text-xs">
            
            {/* 1. Title */}
            <div>
              <label className="font-bold text-[#1A2420] block mb-1">
                Project Title (English) *
              </label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Modernization of Tanur Fishing Harbour & Coastal Wharf"
                className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-hidden focus:border-[#194B35]"
              />
            </div>

            {/* 2. Category & Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-[#1A2420] block mb-1">
                  Statutory Category (9 Official Domains) *
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value as ProjectCategory })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-hidden focus:border-[#194B35]"
                >
                  {TRANSPARENT_PROJECT_CATEGORIES.map((c) => (
                    <option key={c.key} value={c.key}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-[#1A2420] block mb-1">
                  Lifecycle Status (8 Statutory Statuses) *
                </label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as ProjectStatus })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-hidden focus:border-[#194B35]"
                >
                  <option value="Proposed">Proposed</option>
                  <option value="Approved">Approved</option>
                  <option value="Planned">Planned</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Delayed">Delayed</option>
                  <option value="Completed">Completed</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* 3. Description & Scope */}
            <div>
              <label className="font-bold text-[#1A2420] block mb-1">
                Detailed Scope of Engineering Works *
              </label>
              <textarea
                rows={4}
                required
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Comprehensive technical specifications, civic utility, project background, and expected outcomes..."
                className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-hidden focus:border-[#194B35]"
              />
            </div>

            {/* 4. Three-Way Budget Breakdown Matrix */}
            <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] space-y-4">
              <div className="flex items-center gap-2">
                <Banknote className="w-4 h-4 text-[#C39A5B]" />
                <span className="font-bold text-[#194B35] text-xs uppercase tracking-wider">
                  Three-Way Budget & Financial Breakdown
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-[#1A2420] block mb-1">
                    Approved Budget (Administrative Sanction) *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.approved_budget}
                    onChange={(e) => setForm({ ...form, approved_budget: e.target.value })}
                    placeholder="e.g. ₹2.50 Crores"
                    className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-white text-[#1A2420] focus:outline-hidden focus:border-[#194B35]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#1A2420] block mb-1">
                    Estimated Cost (DPR Proposal)
                  </label>
                  <input
                    type="text"
                    value={form.estimated_cost}
                    onChange={(e) => setForm({ ...form, estimated_cost: e.target.value })}
                    placeholder="e.g. ₹2.75 Crores"
                    className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-white text-[#1A2420] focus:outline-hidden focus:border-[#194B35]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#1A2420] block mb-1">
                    Actual Expenditure (Audited)
                  </label>
                  <input
                    type="text"
                    value={form.actual_expenditure}
                    onChange={(e) => setForm({ ...form, actual_expenditure: e.target.value })}
                    placeholder="e.g. ₹1.80 Crores (if commenced)"
                    className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-white text-[#1A2420] focus:outline-hidden focus:border-[#194B35]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#1A2420] block mb-1">
                    Funding Source / Scheme
                  </label>
                  <input
                    type="text"
                    value={form.funding_source}
                    onChange={(e) => setForm({ ...form, funding_source: e.target.value })}
                    placeholder="e.g. Municipal Plan Fund / KIIFB / AMRUT 2.0"
                    className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-white text-[#1A2420] focus:outline-hidden focus:border-[#194B35]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#1A2420] block mb-1">
                    Implementing Agency / Department
                  </label>
                  <input
                    type="text"
                    value={form.implementing_agency}
                    onChange={(e) => setForm({ ...form, implementing_agency: e.target.value, department: e.target.value })}
                    placeholder="e.g. Tanur Municipal Engineering Wing / PWD Roads"
                    className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-white text-[#1A2420] focus:outline-hidden focus:border-[#194B35]"
                  />
                </div>
              </div>
            </div>

            {/* 5. Location: Ward 1 to 45 & Locality */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="font-bold text-[#1A2420] block mb-1">
                  Municipal Ward (Wards 1–45) *
                </label>
                <select
                  value={form.ward_number}
                  onChange={(e) => setForm({ ...form, ward_number: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-hidden focus:border-[#194B35]"
                >
                  {Array.from({ length: 45 }, (_, i) => i + 1).map((w) => (
                    <option key={w} value={w}>
                      Ward {w}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-[#1A2420] block mb-1">
                  Locality / Landmark
                </label>
                <input
                  type="text"
                  value={form.locality}
                  onChange={(e) => setForm({ ...form, locality: e.target.value })}
                  placeholder="e.g. Harbour Road, Tanur"
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-hidden focus:border-[#194B35]"
                />
              </div>

              <div>
                <label className="font-bold text-[#1A2420] block mb-1">
                  Assigned Contractor (Optional)
                </label>
                <input
                  type="text"
                  value={form.contractor_name}
                  onChange={(e) => setForm({ ...form, contractor_name: e.target.value })}
                  placeholder="e.g. M/s Coastal Infra Consortium"
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-hidden focus:border-[#194B35]"
                />
              </div>
            </div>

            {/* 6. Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="font-bold text-[#1A2420] block mb-1">
                  Announcement Date *
                </label>
                <input
                  type="date"
                  required
                  value={form.announcement_date}
                  onChange={(e) => setForm({ ...form, announcement_date: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>

              <div>
                <label className="font-bold text-[#1A2420] block mb-1">
                  Sanction Date
                </label>
                <input
                  type="date"
                  value={form.approval_date}
                  onChange={(e) => setForm({ ...form, approval_date: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>

              <div>
                <label className="font-bold text-[#1A2420] block mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={form.start_date}
                  onChange={(e) => setForm({ ...form, start_date: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>

              <div>
                <label className="font-bold text-[#1A2420] block mb-1">
                  Target Completion
                </label>
                <input
                  type="date"
                  value={form.expected_completion_date}
                  onChange={(e) => setForm({ ...form, expected_completion_date: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>
            </div>

            {/* 7. GIS Coordinates & Photo */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="font-bold text-[#1A2420] block mb-1">
                  Latitude (GPS)
                </label>
                <input
                  type="number"
                  step="0.0001"
                  value={form.latitude}
                  onChange={(e) => setForm({ ...form, latitude: parseFloat(e.target.value) || 10.9768 })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>

              <div>
                <label className="font-bold text-[#1A2420] block mb-1">
                  Longitude (GPS)
                </label>
                <input
                  type="number"
                  step="0.0001"
                  value={form.longitude}
                  onChange={(e) => setForm({ ...form, longitude: parseFloat(e.target.value) || 75.8672 })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>

              <div>
                <label className="font-bold text-[#1A2420] block mb-1">
                  Physical Completion (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={form.progress_percentage}
                  onChange={(e) => setForm({ ...form, progress_percentage: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>
            </div>

            {/* 8. Photo URL & Official Source */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-[#1A2420] block mb-1">
                  Project Representative Image URL
                </label>
                <input
                  type="url"
                  value={form.project_image}
                  onChange={(e) => setForm({ ...form, project_image: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>

              <div>
                <label className="font-bold text-[#1A2420] block mb-1">
                  Official Source / Order URL
                </label>
                <input
                  type="url"
                  value={form.official_source_url}
                  onChange={(e) => setForm({ ...form, official_source_url: e.target.value })}
                  placeholder="https://lsgkerala.gov.in/..."
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-4 border-t border-[#EDE6D8] flex items-center justify-between">
              <Link
                href="/admin/development/projects"
                className="px-4 py-2.5 rounded-xl text-neutral-600 hover:bg-neutral-100 font-bold transition"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#194B35] hover:bg-[#123626] text-white font-extrabold transition shadow-xs flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Register Project in Municipal Ledger</span>
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
