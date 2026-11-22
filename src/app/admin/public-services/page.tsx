"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { useAuth } from "@/lib/auth/context";
import { 
  publicServiceStore, 
  SERVICE_CATEGORIES, 
  getServiceCategoryByKey 
} from "@/lib/data/publicServicesData";
import { 
  PublicServiceDetail, 
  PublicServiceApplication,
  ServiceApplicationStatus 
} from "@/types/digitalMunicipality";
import { 
  Building2, 
  FileText, 
  Search, 
  Plus, 
  Edit3, 
  Archive, 
  Eye, 
  CheckCircle2, 
  Clock, 
  CreditCard, 
  ExternalLink, 
  ArrowLeft, 
  ShieldCheck, 
  Layers, 
  Check, 
  X, 
  AlertCircle,
  FileCheck2,
  CalendarCheck2,
  Users,
  SendHorizontal
} from "lucide-react";

export default function AdminPublicServicesPage() {
  const { user, role } = useAuth();
  const [activeTab, setActiveTab] = useState<"services" | "applications" | "categories">("services");

  // Force re-render state trigger
  const [refreshKey, setRefreshKey] = useState(0);
  const triggerRefresh = () => setRefreshKey(k => k + 1);

  // Search & Filter States
  const [serviceSearch, setServiceSearch] = useState("");
  const [serviceCatFilter, setServiceCatFilter] = useState("all");
  const [appSearch, setAppSearch] = useState("");
  const [appStatusFilter, setAppStatusFilter] = useState("all");

  // Modals
  const [editingService, setEditingService] = useState<PublicServiceDetail | null>(null);
  const [isCreatingService, setIsCreatingService] = useState(false);
  const [selectedApp, setSelectedApp] = useState<PublicServiceApplication | null>(null);
  const [appStatusUpdate, setAppStatusUpdate] = useState<ServiceApplicationStatus>("submitted");
  const [appOfficerNote, setAppOfficerNote] = useState("");

  // Create Service Form State
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("cat-certificates");
  const [newDepartment, setNewDepartment] = useState("Health & Sanitation Wing, Tanur Municipality");
  const [newSummary, setNewSummary] = useState("");
  const [newEligibility, setNewEligibility] = useState("");
  const [newDocs, setNewDocs] = useState("");
  const [newSteps, setNewSteps] = useState("");
  const [newFees, setNewFees] = useState("Free");
  const [newProcessingTime, setNewProcessingTime] = useState("1 to 3 working days");
  const [newPortalUrl, setNewPortalUrl] = useState("https://ksmart.lsgkerala.gov.in/");
  const [newPortalName, setNewPortalName] = useState("K-Smart Kerala");
  const [newSourceRef, setNewSourceRef] = useState("Kerala Municipality Act 1994 & Statutory Rules");

  // Services list
  const services = useMemo(() => {
    void refreshKey;
    return publicServiceStore.getServices(
      serviceCatFilter === "all" ? undefined : serviceCatFilter,
      serviceSearch,
      "recent"
    );
  }, [serviceCatFilter, serviceSearch, refreshKey]);

  // Applications list
  const applications = useMemo(() => {
    void refreshKey;
    return publicServiceStore.getApplications(
      undefined,
      appStatusFilter === "all" ? undefined : appStatusFilter
    ).filter(app => {
      if (appSearch.trim()) {
        const q = appSearch.toLowerCase().trim();
        return (
          app.reference_no.toLowerCase().includes(q) ||
          app.service_title.toLowerCase().includes(q) ||
          app.applicant_name.toLowerCase().includes(q) ||
          app.applicant_phone.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [appStatusFilter, appSearch, refreshKey]);

  // Handlers
  const handleArchive = (id: string) => {
    if (confirm("Are you sure you want to unpublish / archive this service?")) {
      publicServiceStore.archiveService(id, user?.display_name || "Admin");
      triggerRefresh();
    }
  };

  const handleUpdateAppStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp) return;

    publicServiceStore.updateApplicationStatus(
      selectedApp.id,
      appStatusUpdate,
      appOfficerNote.trim(),
      user?.display_name || "Municipal Verification Officer"
    );

    triggerRefresh();
    setSelectedApp(null);
    setAppOfficerNote("");
  };

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const cat = getServiceCategoryByKey(newCategory);
    const slug = newTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

    const eligibilityList = newEligibility.split("\n").map(s => s.trim()).filter(Boolean);
    const docsList = newDocs.split("\n").map(s => s.trim()).filter(Boolean);
    const stepsList = newSteps.split("\n").map(s => s.trim()).filter(Boolean).map((step, idx) => ({
      step_number: idx + 1,
      title: `Step ${idx + 1}`,
      description: step,
    }));

    publicServiceStore.createService({
      slug,
      title: newTitle.trim(),
      category: newCategory as any,
      category_name: cat?.name || "Municipal Services",
      department: newDepartment.trim(),
      summary: newSummary.trim(),
      eligibility: eligibilityList.length > 0 ? eligibilityList : ["Tanur Municipality Residents"],
      required_documents: docsList.length > 0 ? docsList : ["Aadhaar Card", "Door Number Certificate"],
      procedure_steps: stepsList.length > 0 ? stepsList : [{ step_number: 1, title: "Submission", description: "Submit online or at municipal counter." }],
      processing_time_text: newProcessingTime.trim(),
      fee_structure: newFees.trim(),
      office_location: "Tanur Municipality Office, Main Road, Tanur - 676302",
      contact_phone: "0494 2440228",
      contact_email: "tanurmunicipality@gmail.com",
      working_hours: "Monday to Saturday: 10:00 AM – 5:00 PM",
      is_online_available: !!newPortalUrl,
      official_portal_url: newPortalUrl.trim() || undefined,
      official_portal_name: newPortalName.trim() || undefined,
      last_verified_date: new Date().toISOString().split("T")[0],
      source_reference: newSourceRef.trim(),
      supports_internal_application: true,
      published: true,
    });

    triggerRefresh();
    setIsCreatingService(false);
    // Reset
    setNewTitle("");
    setNewSummary("");
    setNewEligibility("");
    setNewDocs("");
    setNewSteps("");
  };

  const handleSaveEditService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    publicServiceStore.updateService(
      editingService.id,
      {
        title: editingService.title,
        department: editingService.department,
        summary: editingService.summary,
        fee_structure: editingService.fee_structure,
        processing_time_text: editingService.processing_time_text,
        official_portal_url: editingService.official_portal_url,
        official_portal_name: editingService.official_portal_name,
        source_reference: editingService.source_reference,
      },
      user?.display_name || "Admin"
    );

    triggerRefresh();
    setEditingService(null);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] flex flex-col font-sans">
      <Navbar />

      {/* Top Admin Navigation Header */}
      <div className="bg-[#143E2C] text-white border-b border-[#0F3022]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-2.5 flex items-center justify-between border-b border-white/10 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-amber-400 text-[#143E2C] flex items-center justify-center font-bold text-[10px]">
                ADM
              </span>
              <span className="font-bold tracking-wide text-amber-300">
                Public Services Management Workspace
              </span>
              <span className="hidden md:inline-block text-[11px] text-white/60 border-l border-white/20 pl-2">
                Tanur Municipality 45 Wards Desk
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/public-services"
                className="text-[11px] text-white/80 hover:text-white flex items-center gap-1 transition"
              >
                <Eye className="w-3.5 h-3.5 text-amber-300" />
                <span>View Public Directory</span>
              </Link>
              <Link
                href="/admin"
                className="text-[11px] text-white/80 hover:text-white flex items-center gap-1 border-l border-white/20 pl-3 transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Main Admin Panel</span>
              </Link>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex items-center gap-6 pt-3 pb-2 text-xs font-bold">
            <button
              onClick={() => setActiveTab("services")}
              className={`pb-2.5 border-b-2 transition flex items-center gap-2 ${
                activeTab === "services"
                  ? "border-amber-400 text-amber-300"
                  : "border-transparent text-white/70 hover:text-white"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Service Catalog ({services.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("applications")}
              className={`pb-2.5 border-b-2 transition flex items-center gap-2 ${
                activeTab === "applications"
                  ? "border-amber-400 text-amber-300"
                  : "border-transparent text-white/70 hover:text-white"
              }`}
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Guidance Applications ({applications.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("categories")}
              className={`pb-2.5 border-b-2 transition flex items-center gap-2 ${
                activeTab === "categories"
                  ? "border-amber-400 text-amber-300"
                  : "border-transparent text-white/70 hover:text-white"
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Statutory Categories (8)</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 w-full">
        {/* ========================================================================= */}
        {/* TAB 1: SERVICE CATALOG                                                   */}
        {/* ========================================================================= */}
        {activeTab === "services" && (
          <div className="space-y-6">
            {/* Header & Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-[#194B35]">
                  Municipal Public Services Catalog
                </h1>
                <p className="text-xs text-[#5C6A64]">
                  Manage official requirements, statutory fees, portal links, and verification dates.
                </p>
              </div>

              <button
                onClick={() => setIsCreatingService(true)}
                className="px-4 py-2.5 rounded-xl bg-[#194B35] hover:bg-[#143E2C] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs shrink-0"
              >
                <Plus className="w-4 h-4 text-amber-300" />
                <span>Add New Service Listing</span>
              </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white rounded-2xl border border-[#EDE6D8] p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xs">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={serviceSearch}
                  onChange={(e) => setServiceSearch(e.target.value)}
                  placeholder="Search by title, department, or keyword..."
                  className="w-full pl-9 pr-3 py-2 bg-[#FAF7F0] border border-[#EDE6D8] rounded-xl text-xs focus:ring-2 focus:ring-[#194B35] focus:outline-hidden"
                />
              </div>

              <div className="flex items-center gap-2 shrink-0 w-full md:w-auto">
                <span className="text-xs font-bold text-[#5C6A64]">Category:</span>
                <select
                  value={serviceCatFilter}
                  onChange={(e) => setServiceCatFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[#FAF7F0] border border-[#EDE6D8] text-xs font-semibold text-[#194B35]"
                >
                  <option value="all">All Categories</option>
                  {SERVICE_CATEGORIES.map(c => (
                    <option key={c.id} value={c.key}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Services Table */}
            <div className="bg-white rounded-3xl border border-[#EDE6D8] overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF7F0] border-b border-[#EDE6D8] text-[#7A8880] font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Service Name</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Department</th>
                      <th className="py-3 px-4">Processing Time</th>
                      <th className="py-3 px-4">Fee Structure</th>
                      <th className="py-3 px-4">Portal Link</th>
                      <th className="py-3 px-4">Last Verified</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EDE6D8]">
                    {services.map((srv) => (
                      <tr key={srv.id} className="hover:bg-[#FAF7F0]/40 transition">
                        <td className="py-3.5 px-4 font-bold text-[#194B35] max-w-xs">
                          <Link href={`/public-services/${srv.slug}`} className="hover:underline">
                            {srv.title}
                          </Link>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#194B35]/10 text-[#194B35]">
                            {srv.category_name}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-[#5C6A64] whitespace-nowrap">
                          {srv.department}
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap font-medium">
                          {srv.processing_time_text.split("(")[0]}
                        </td>
                        <td className="py-3.5 px-4 text-[#5C6A64] max-w-xs truncate">
                          {srv.fee_structure}
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          {srv.official_portal_url ? (
                            <a
                              href={srv.official_portal_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-emerald-700 hover:underline flex items-center gap-1 font-semibold"
                            >
                              <span>{srv.online_system_name || "Official"}</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            <span className="text-gray-400">Offline / Counter</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap text-gray-500 font-mono text-[11px]">
                          {srv.last_verified_date}
                        </td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setEditingService(srv)}
                              className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
                              title="Edit Service Details"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleArchive(srv.id)}
                              className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition"
                              title="Archive Service"
                            >
                              <Archive className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: GUIDANCE APPLICATIONS QUEUE                                       */}
        {/* ========================================================================= */}
        {activeTab === "applications" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-[#194B35]">
                  Citizen Guidance Applications Queue
                </h1>
                <p className="text-xs text-[#5C6A64]">
                  Review pre-submission assistance requests, verify citizen documents, and update status across the 6 lifecycle states.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#194B35] bg-emerald-100 px-3 py-1 rounded-full">
                  {applications.length} Active Records
                </span>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="bg-white rounded-2xl border border-[#EDE6D8] p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xs">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={appSearch}
                  onChange={(e) => setAppSearch(e.target.value)}
                  placeholder="Search by reference (PS-TNR-2026-XXXX), applicant name, or phone..."
                  className="w-full pl-9 pr-3 py-2 bg-[#FAF7F0] border border-[#EDE6D8] rounded-xl text-xs focus:ring-2 focus:ring-[#194B35] focus:outline-hidden"
                />
              </div>

              <div className="flex items-center gap-2 shrink-0 w-full md:w-auto">
                <span className="text-xs font-bold text-[#5C6A64]">Status:</span>
                <select
                  value={appStatusFilter}
                  onChange={(e) => setAppStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[#FAF7F0] border border-[#EDE6D8] text-xs font-semibold text-[#194B35]"
                >
                  <option value="all">All Statuses</option>
                  <option value="submitted">Submitted</option>
                  <option value="under_review">Under Review</option>
                  <option value="documents_verified">Documents Verified</option>
                  <option value="forwarded_guidance">Guidance Forwarded</option>
                  <option value="completed">Completed</option>
                  <option value="rejected">Rejected / Needs Fix</option>
                </select>
              </div>
            </div>

            {/* Applications Table */}
            <div className="bg-white rounded-3xl border border-[#EDE6D8] overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF7F0] border-b border-[#EDE6D8] text-[#7A8880] font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Reference No</th>
                      <th className="py-3 px-4">Service</th>
                      <th className="py-3 px-4">Applicant</th>
                      <th className="py-3 px-4">Ward</th>
                      <th className="py-3 px-4">Documents</th>
                      <th className="py-3 px-4">Current Status</th>
                      <th className="py-3 px-4">Submission Date</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EDE6D8]">
                    {applications.map((app) => (
                      <tr key={app.id} className="hover:bg-[#FAF7F0]/40 transition">
                        <td className="py-3.5 px-4 font-mono font-bold text-[#194B35] whitespace-nowrap">
                          {app.reference_no}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-[#1A2420] max-w-xs truncate">
                          {app.service_title}
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="font-semibold">{app.applicant_name}</div>
                          <div className="text-[10px] text-gray-400">{app.applicant_phone}</div>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap font-medium text-gray-700">
                          Ward {app.ward_number}
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                            {app.documents.length} verified
                          </span>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            app.status === "completed" ? "bg-emerald-100 text-emerald-800" :
                            app.status === "documents_verified" ? "bg-indigo-100 text-indigo-800" :
                            app.status === "under_review" ? "bg-blue-100 text-blue-800" :
                            "bg-amber-100 text-amber-800"
                          }`}>
                            {app.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap text-gray-500 font-mono text-[11px]">
                          {new Date(app.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <button
                            onClick={() => {
                              setSelectedApp(app);
                              setAppStatusUpdate(app.status);
                              setAppOfficerNote(app.status_notes || "");
                            }}
                            className="px-3 py-1.5 rounded-lg bg-[#194B35] text-white font-bold text-[11px] hover:bg-[#143E2C] transition inline-flex items-center gap-1"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Inspect & Update</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: CATEGORIES & STATUTORY LINKS                                       */}
        {/* ========================================================================= */}
        {activeTab === "categories" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-[#194B35]">
                8 Statutory Municipal Service Categories
              </h1>
              <p className="text-xs text-[#5C6A64]">
                Administrative taxonomy adhering strictly to Kerala Municipality Act and LSGD mandates.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {SERVICE_CATEGORIES.map((cat) => {
                const count = services.filter(s => s.category === cat.key).length;
                return (
                  <div key={cat.id} className="bg-white rounded-3xl border border-[#EDE6D8] p-5 shadow-2xs space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#194B35]/10 text-[#194B35] flex items-center justify-center font-bold">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-[#194B35]">{cat.name}</h3>
                      <p className="text-xs text-[#5C6A64] mt-1 leading-relaxed">
                        {cat.description}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-[#EDE6D8] flex items-center justify-between text-xs text-gray-500">
                      <span>Key: <code className="text-[#194B35] font-bold">{cat.key}</code></span>
                      <span className="font-bold text-[#194B35]">{count} Services</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODAL: INSPECT & UPDATE APPLICATION STATUS                                */}
        {/* ========================================================================= */}
        {selectedApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-white rounded-3xl border border-[#EDE6D8] max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setSelectedApp(null)}
                className="absolute right-5 top-5 text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                  Municipal Guidance Inspection Desk
                </span>
                <h3 className="text-xl font-bold text-[#194B35]">
                  Update Application: {selectedApp.reference_no}
                </h3>
                <p className="text-xs text-gray-500">
                  Service: <strong>{selectedApp.service_title}</strong> (Ward {selectedApp.ward_number})
                </p>
              </div>

              {/* Citizen Details */}
              <div className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#EDE6D8] text-xs text-[#5C6A64] space-y-1">
                <p><strong>Applicant Name:</strong> {selectedApp.applicant_name}</p>
                <p><strong>Email:</strong> {selectedApp.applicant_email} • <strong>Phone:</strong> {selectedApp.applicant_phone}</p>
                {selectedApp.notes && (
                  <p className="pt-1 text-[#1A2420]"><strong>Citizen Remarks:</strong> {selectedApp.notes}</p>
                )}
              </div>

              {/* Documents Checklist */}
              {selectedApp.documents.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#194B35]">Verified Documents Checklist:</span>
                  <div className="space-y-1.5 text-xs">
                    {selectedApp.documents.map((doc, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#EDE6D8] flex items-center justify-between">
                        <span>{doc.name}</span>
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                          Verified
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Status Update Form */}
              <form onSubmit={handleUpdateAppStatus} className="space-y-4 pt-2 border-t border-[#EDE6D8]">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#1A2420]">
                    Change Application Status:
                  </label>
                  <select
                    value={appStatusUpdate}
                    onChange={(e) => setAppStatusUpdate(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F0] border border-[#EDE6D8] text-xs font-bold text-[#194B35] focus:outline-hidden focus:ring-2 focus:ring-[#194B35]"
                  >
                    <option value="submitted">Submitted (Initial Stage)</option>
                    <option value="under_review">Under Review (Scrutiny in Progress)</option>
                    <option value="documents_verified">Documents Verified (Ready for Submission)</option>
                    <option value="forwarded_guidance">Guidance Forwarded (Instructions Sent)</option>
                    <option value="completed">Completed (Guidance Resolved)</option>
                    <option value="rejected">Needs Correction (Missing Documents)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#1A2420]">
                    Official Helpdesk Guidance Note:
                  </label>
                  <textarea
                    rows={3}
                    value={appOfficerNote}
                    onChange={(e) => setAppOfficerNote(e.target.value)}
                    placeholder="Enter instructions for the citizen, portal guidance, or verification findings..."
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F0] border border-[#EDE6D8] text-xs focus:outline-hidden focus:ring-2 focus:ring-[#194B35]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedApp(null)}
                    className="px-4 py-2 rounded-xl border border-[#EDE6D8] text-xs font-bold text-gray-600 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#194B35] hover:bg-[#143E2C] text-white text-xs font-bold transition shadow-xs flex items-center gap-1.5"
                  >
                    <span>Save & Notify Citizen</span>
                    <SendHorizontal className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODAL: EDIT SERVICE DETAILS                                              */}
        {/* ========================================================================= */}
        {editingService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-white rounded-3xl border border-[#EDE6D8] max-w-xl w-full p-6 sm:p-8 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setEditingService(null)}
                className="absolute right-5 top-5 text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-bold text-[#194B35]">
                Edit Public Service Listing
              </h3>

              <form onSubmit={handleSaveEditService} className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#1A2420]">Service Title</label>
                  <input
                    type="text"
                    required
                    value={editingService.title}
                    onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#EDE6D8] bg-[#FAF7F0] text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#1A2420]">Department Wing</label>
                  <input
                    type="text"
                    required
                    value={editingService.department}
                    onChange={(e) => setEditingService({ ...editingService, department: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#EDE6D8] bg-[#FAF7F0] text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#1A2420]">Summary Description</label>
                  <textarea
                    rows={2}
                    required
                    value={editingService.summary}
                    onChange={(e) => setEditingService({ ...editingService, summary: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#EDE6D8] bg-[#FAF7F0] text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#1A2420]">Processing Time</label>
                    <input
                      type="text"
                      value={editingService.processing_time_text}
                      onChange={(e) => setEditingService({ ...editingService, processing_time_text: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-[#EDE6D8] bg-[#FAF7F0] text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#1A2420]">Statutory Fees</label>
                    <input
                      type="text"
                      value={editingService.fee_structure}
                      onChange={(e) => setEditingService({ ...editingService, fee_structure: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-[#EDE6D8] bg-[#FAF7F0] text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#1A2420]">Official Portal URL</label>
                    <input
                      type="url"
                      value={editingService.official_portal_url || ""}
                      onChange={(e) => setEditingService({ ...editingService, official_portal_url: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-[#EDE6D8] bg-[#FAF7F0] text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#1A2420]">Portal System Name</label>
                    <input
                      type="text"
                      value={editingService.official_portal_name || ""}
                      onChange={(e) => setEditingService({ ...editingService, official_portal_name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-[#EDE6D8] bg-[#FAF7F0] text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#1A2420]">Statutory Source Reference</label>
                  <input
                    type="text"
                    value={editingService.source_reference}
                    onChange={(e) => setEditingService({ ...editingService, source_reference: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#EDE6D8] bg-[#FAF7F0] text-xs"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingService(null)}
                    className="px-4 py-2 rounded-xl border border-[#EDE6D8] text-xs font-bold text-gray-600 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#194B35] hover:bg-[#143E2C] text-white text-xs font-bold transition shadow-xs"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODAL: CREATE NEW SERVICE LISTING                                         */}
        {/* ========================================================================= */}
        {isCreatingService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-white rounded-3xl border border-[#EDE6D8] max-w-xl w-full p-6 sm:p-8 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setIsCreatingService(false)}
                className="absolute right-5 top-5 text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-bold text-[#194B35]">
                Add New Municipal Public Service
              </h3>

              <form onSubmit={handleCreateService} className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#1A2420]">Service Title *</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Street Vendor Vending Certificate"
                    className="w-full px-3 py-2 rounded-xl border border-[#EDE6D8] bg-[#FAF7F0] text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#1A2420]">Category *</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#EDE6D8] bg-[#FAF7F0] text-xs font-semibold"
                    >
                      {SERVICE_CATEGORIES.map(c => (
                        <option key={c.id} value={c.key}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#1A2420]">Department *</label>
                    <input
                      type="text"
                      required
                      value={newDepartment}
                      onChange={(e) => setNewDepartment(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#EDE6D8] bg-[#FAF7F0] text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#1A2420]">Summary Description *</label>
                  <textarea
                    rows={2}
                    required
                    value={newSummary}
                    onChange={(e) => setNewSummary(e.target.value)}
                    placeholder="Brief description of the service..."
                    className="w-full px-3 py-2 rounded-xl border border-[#EDE6D8] bg-[#FAF7F0] text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#1A2420]">Eligibility Criteria (1 per line)</label>
                  <textarea
                    rows={2}
                    value={newEligibility}
                    onChange={(e) => setNewEligibility(e.target.value)}
                    placeholder="Enter eligibility rules..."
                    className="w-full px-3 py-2 rounded-xl border border-[#EDE6D8] bg-[#FAF7F0] text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#1A2420]">Required Documents (1 per line)</label>
                  <textarea
                    rows={2}
                    value={newDocs}
                    onChange={(e) => setNewDocs(e.target.value)}
                    placeholder="Aadhaar Card&#10;Door Number Receipt"
                    className="w-full px-3 py-2 rounded-xl border border-[#EDE6D8] bg-[#FAF7F0] text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#1A2420]">Processing Time</label>
                    <input
                      type="text"
                      value={newProcessingTime}
                      onChange={(e) => setNewProcessingTime(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#EDE6D8] bg-[#FAF7F0] text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#1A2420]">Statutory Fees</label>
                    <input
                      type="text"
                      value={newFees}
                      onChange={(e) => setNewFees(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#EDE6D8] bg-[#FAF7F0] text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#1A2420]">Official Portal URL</label>
                    <input
                      type="url"
                      value={newPortalUrl}
                      onChange={(e) => setNewPortalUrl(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#EDE6D8] bg-[#FAF7F0] text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#1A2420]">Portal System Name</label>
                    <input
                      type="text"
                      value={newPortalName}
                      onChange={(e) => setNewPortalName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#EDE6D8] bg-[#FAF7F0] text-xs"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsCreatingService(false)}
                    className="px-4 py-2 rounded-xl border border-[#EDE6D8] text-xs font-bold text-gray-600 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#194B35] hover:bg-[#143E2C] text-white text-xs font-bold transition shadow-xs"
                  >
                    Create Service Listing
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
