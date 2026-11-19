"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { DevelopmentNav } from "@/components/development/DevelopmentNav";
import { useLanguage } from "@/lib/i18n/context";
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
  Compass
} from "lucide-react";

export default function CreateDevelopmentProjectPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const { role, user } = useAuth();
  const isAuthorized = role === "admin" || role === "moderator";

  const [form, setForm] = useState({
    title: "",
    title_ml: "",
    description: "",
    description_ml: "",
    category: "roads_transport" as ProjectCategory,
    locality: "Tanur Town",
    ward_number: 1,
    department: "Tanur Municipality Engineering Wing",
    department_ml: "താനൂർ നഗരസഭ എഞ്ചിനീയറിംഗ് വിഭാഗം",
    official_source_name: "LSGD Kerala & Tanur Municipal Council",
    official_source_url: "https://lsgkerala.gov.in/",
    source_type: "official_published" as InformationSourceType,
    budget_sanctioned: "₹1.50 കോടി (Crores)",
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
  });

  const [feedback, setFeedback] = useState<string | null>(null);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
        <Navbar />
        <DevelopmentNav />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl border border-[#EAE4D7] p-8 text-center shadow-card">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-[#B87A1E] flex items-center justify-center mx-auto mb-4 border border-amber-200">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold font-malayalam-serif text-[#1A2420]">
              അഡ്മിൻ പ്രവേശനം ആവശ്യമാണ്
            </h2>
            <div className="mt-6">
              <Link
                href="/development"
                className="w-full py-2.5 rounded-xl bg-[#194B35] text-white font-bold text-xs transition inline-block text-center"
              >
                മടങ്ങുക
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
    if (!form.title.trim() || !form.title_ml.trim()) return;

    const catObj = TRANSPARENT_PROJECT_CATEGORIES.find((c) => c.key === form.category);
    const wardObj = TANUR_MUNICIPAL_WARDS.find((w) => w.ward_number === Number(form.ward_number));

    const newProject = digitalMunicipalityStore.addProject({
      municipality_id: "40000000-0000-0000-0000-000000000007",
      municipality_name: "Tanur Municipality",
      municipality_name_ml: "താനൂർ നഗരസഭ",
      ward_number: Number(form.ward_number),
      ward_name: wardObj?.ward_name || `Ward ${form.ward_number}`,
      ward_name_ml: wardObj?.ward_name_ml || `വാർഡ് ${form.ward_number}`,
      locality: form.locality,
      locality_ml: form.locality,
      title: form.title,
      title_ml: form.title_ml,
      description: form.description,
      description_ml: form.description_ml,
      category: form.category,
      category_name: catObj?.label || "Development",
      category_name_ml: catObj?.label_ml || "വികസനം",
      department: form.department,
      department_ml: form.department_ml,
      official_source_name: form.official_source_name,
      official_source_url: form.official_source_url,
      source_type: form.source_type,
      budget_sanctioned: form.budget_sanctioned,
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
      contractor_name: form.contractor_name || undefined,
      is_verified: true,
      last_verified_date: new Date().toISOString().split("T")[0],
      source_documents: [],
      progress_updates: [
        {
          id: "upd-" + Date.now(),
          project_id: "",
          date: form.announcement_date,
          title: "Project Registered on Portal",
          title_ml: "പദ്ധതി പോർട്ടലിൽ രജിസ്റ്റർ ചെയ്തു",
          note: `Project officially listed under ${catObj?.label}. Status: ${form.status}.`,
          note_ml: `പദ്ധതി ഔദ്യോഗികമായി രജിസ്റ്റർ ചെയ്തു. അവസ്ഥ: ${form.status}.`,
          verified_by: user?.display_name || user?.username || "Admin",
          created_at: new Date().toISOString(),
        }
      ],
    });

    setFeedback("പദ്ധതി വിജയകരമായി രജിസ്റ്റർ ചെയ്തു! റീഡയറക്ട് ചെയ്യുന്നു...");
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
        <div className="bg-gradient-to-b from-[#194B35] to-[#123626] text-white pt-8 pb-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <Link
              href="/admin/development/projects"
              className="inline-flex items-center gap-1.5 text-xs text-[#C39A5B] font-bold mb-2 hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>പദ്ധതി പട്ടികയിലേക്ക് മടങ്ങുക</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-malayalam-heading text-white">
              പുതിയ വികസന പദ്ധതി രജിസ്റ്റർ ചെയ്യുക
            </h1>
            <p className="text-xs text-[#EDE6D8] mt-1">
              താനൂർ നഗരസഭയിലെ ഔദ്യോഗിക ഗസറ്റ് ഉത്തരവുകൾ, ബജറ്റ്, ലൊക്കേഷൻ വിവരങ്ങൾ സമർപ്പിക്കുക
            </p>
          </div>
        </div>

        {feedback && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-4 mb-4">
            <div className="p-4 rounded-2xl bg-emerald-700 text-white text-xs font-semibold flex items-center gap-2 shadow-lg">
              <CheckCircle2 className="w-4 h-4 text-amber-300" />
              <span>{feedback}</span>
            </div>
          </div>
        )}

        {/* Form Container */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-6">
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE6D8] shadow-xs space-y-6 text-xs">
            {/* 1. Title & Malayalam Title */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-[#1A2420] block mb-1">
                  പദ്ധതി പേര് (മലയാളത്തിൽ) *
                </label>
                <input
                  type="text"
                  required
                  value={form.title_ml}
                  onChange={(e) => setForm({ ...form, title_ml: e.target.value })}
                  placeholder="ഉദാ: താനൂർ ഹാർബർ ആധുനികവൽക്കരണം..."
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>

              <div>
                <label className="font-bold text-[#1A2420] block mb-1">
                  Project Title (English) *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Tanur Harbour Modernization..."
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>
            </div>

            {/* 2. Category & Status */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="font-bold text-[#1A2420] block mb-1">വിഭാഗം (Category) *</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value as ProjectCategory })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                >
                  {TRANSPARENT_PROJECT_CATEGORIES.map((c) => (
                    <option key={c.key} value={c.key}>
                      {c.label_ml} ({c.label})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-[#1A2420] block mb-1">അവസ്ഥ (Current Status) *</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as ProjectStatus })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                >
                  <option value="Proposed">Proposed</option>
                  <option value="Announced">Announced</option>
                  <option value="Approved">Approved</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Delayed">Delayed</option>
                  <option value="On Hold">On Hold</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-[#1A2420] block mb-1">പുരോഗതി % (Progress Percentage)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={form.progress_percentage}
                  onChange={(e) => setForm({ ...form, progress_percentage: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>
            </div>

            {/* 3. Locality & Ward */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-[#1A2420] block mb-1">പ്രദേശം (Locality)</label>
                <select
                  value={form.locality}
                  onChange={(e) => setForm({ ...form, locality: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                >
                  {TANUR_LOCALITIES.map((l) => (
                    <option key={l.id} value={l.name}>
                      {l.name_ml} ({l.name})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-[#1A2420] block mb-1">വാർഡ് നമ്പർ (Ward 1 - 44)</label>
                <select
                  value={form.ward_number}
                  onChange={(e) => setForm({ ...form, ward_number: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                >
                  {TANUR_MUNICIPAL_WARDS.map((w) => (
                    <option key={w.id} value={w.ward_number}>
                      Ward {w.ward_number}: {w.ward_name_ml}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 4. Description (ML & EN) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-[#1A2420] block mb-1">
                  വിശദീകരണം (മലയാളത്തിൽ) *
                </label>
                <textarea
                  rows={4}
                  required
                  value={form.description_ml}
                  onChange={(e) => setForm({ ...form, description_ml: e.target.value })}
                  placeholder="പദ്ധതിയുടെ ലക്ഷ്യം, സൗകര്യങ്ങൾ, പ്രദേശവാസികൾക്ക് ലഭിക്കുന്ന നേട്ടങ്ങൾ..."
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>

              <div>
                <label className="font-bold text-[#1A2420] block mb-1">
                  Description (English) *
                </label>
                <textarea
                  rows={4}
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Scope of work, beneficiaries, infrastructural components..."
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>
            </div>

            {/* 5. Department & Budget */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-[#1A2420] block mb-1">നിർവ്വഹണ വകുപ്പ് (Department)</label>
                <input
                  type="text"
                  value={form.department_ml}
                  onChange={(e) => setForm({ ...form, department_ml: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>

              <div>
                <label className="font-bold text-[#1A2420] block mb-1">അനുവദിച്ച ബജറ്റ് (Budget Sanctioned)</label>
                <input
                  type="text"
                  value={form.budget_sanctioned}
                  onChange={(e) => setForm({ ...form, budget_sanctioned: e.target.value })}
                  placeholder="ഉദാ: ₹4.50 കോടി (Crores) or Information not available"
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>
            </div>

            {/* 6. Dates */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="font-bold text-[#1A2420] block mb-1">പ്രഖ്യാപന തീയതി *</label>
                <input
                  type="date"
                  required
                  value={form.announcement_date}
                  onChange={(e) => setForm({ ...form, announcement_date: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>
              <div>
                <label className="font-bold text-[#1A2420] block mb-1">അംഗീകാര തീയതി</label>
                <input
                  type="date"
                  value={form.approval_date}
                  onChange={(e) => setForm({ ...form, approval_date: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>
              <div>
                <label className="font-bold text-[#1A2420] block mb-1">തുടങ്ങിയ തീയതി</label>
                <input
                  type="date"
                  value={form.start_date}
                  onChange={(e) => setForm({ ...form, start_date: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>
              <div>
                <label className="font-bold text-[#1A2420] block mb-1">പൂർത്തീകരണ തീയതി</label>
                <input
                  type="date"
                  value={form.expected_completion_date}
                  onChange={(e) => setForm({ ...form, expected_completion_date: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>
            </div>

            {/* 7. Coordinates & Photo */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="font-bold text-[#1A2420] block mb-1">Latitude (അക്ഷാംശം)</label>
                <input
                  type="number"
                  step="any"
                  value={form.latitude}
                  onChange={(e) => setForm({ ...form, latitude: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>
              <div>
                <label className="font-bold text-[#1A2420] block mb-1">Longitude (രേഖാംശം)</label>
                <input
                  type="number"
                  step="any"
                  value={form.longitude}
                  onChange={(e) => setForm({ ...form, longitude: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>
              <div>
                <label className="font-bold text-[#1A2420] block mb-1">കരാറുകാരൻ / ഏജൻസി</label>
                <input
                  type="text"
                  value={form.contractor_name}
                  onChange={(e) => setForm({ ...form, contractor_name: e.target.value })}
                  placeholder="Contractor / Agency Name"
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>
            </div>

            {/* 8. Source details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="font-bold text-[#1A2420] block mb-1">ഉറവിടം തരം (Source Type)</label>
                <select
                  value={form.source_type}
                  onChange={(e) => setForm({ ...form, source_type: e.target.value as InformationSourceType })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                >
                  <option value="official_published">Officially Published (ഗസറ്റ്/ഉത്തരവ്)</option>
                  <option value="admin_entered">Admin Entered (നഗരസഭാ അഡ്മിൻ)</option>
                  <option value="community_submitted">Community Submitted (പൗര സമർപ്പണം)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-[#1A2420] block mb-1">ഔദ്യോഗിക ഉറവിടം പേര്</label>
                <input
                  type="text"
                  value={form.official_source_name}
                  onChange={(e) => setForm({ ...form, official_source_name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>

              <div>
                <label className="font-bold text-[#1A2420] block mb-1">ഉറവിടം ലിങ്ക് (Official URL)</label>
                <input
                  type="url"
                  value={form.official_source_url}
                  onChange={(e) => setForm({ ...form, official_source_url: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-[#1A2420] block mb-1">പ്രൊജക്റ്റ് ചിത്രം (Photo URL)</label>
              <input
                type="url"
                value={form.project_image}
                onChange={(e) => setForm({ ...form, project_image: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
              />
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-[#EDE6D8] flex items-center justify-end gap-3">
              <Link
                href="/admin/development/projects"
                className="px-4 py-2 rounded-xl text-neutral-600 hover:bg-neutral-100 font-bold"
              >
                റദ്ദാക്കുക (Cancel)
              </Link>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#194B35] hover:bg-[#123626] text-white font-bold transition shadow-sm flex items-center gap-2"
              >
                <Save className="w-4 h-4 text-[#C39A5B]" />
                <span>പദ്ധതി രജിസ്റ്റർ ചെയ്യുക (Save Project)</span>
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
