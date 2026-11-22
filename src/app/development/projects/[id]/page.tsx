"use client";

import React, { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { DevelopmentNav } from "@/components/development/DevelopmentNav";
import { 
  digitalMunicipalityStore,
  TRANSPARENT_PROJECT_CATEGORIES
} from "@/lib/data/digitalMunicipalityData";
import { 
  DevelopmentProject, 
  ProjectStatus, 
  ContributionType 
} from "@/types/digitalMunicipality";
import { VerificationBadge, DataSourcesNotice } from "@/components/common/VerificationBadge";
import {
  HardHat,
  MapPin,
  Calendar,
  Clock,
  Banknote,
  Building2,
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ChevronRight,
  ArrowLeft,
  Camera,
  Share2,
  Compass,
  MessageSquare,
  Flag,
  HelpCircle,
  X,
  Info,
  Car,
  Droplets,
  Trash2,
  GraduationCap,
  Activity,
  Trees,
  Layers,
  Edit,
  DollarSign,
  TrendingUp,
  Landmark,
  FileCheck
} from "lucide-react";

// Dynamic import for Leaflet-based project map
const DevelopmentProjectMap = dynamic(
  () => import("@/components/development/DevelopmentProjectMap").then((mod) => mod.DevelopmentProjectMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-64 sm:h-80 w-full rounded-2xl bg-[#EDE6D8] animate-pulse flex flex-col items-center justify-center text-[#5C6A64]">
        <Compass className="w-8 h-8 text-[#194B35] animate-spin mb-2" />
        <span className="text-xs font-bold text-[#194B35]">Loading GIS project map...</span>
      </div>
    ),
  }
);

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params?.id as string;

  const project = digitalMunicipalityStore.getProjectById(projectId);

  // Public Contribution modal state
  const [isContributionModalOpen, setIsContributionModalOpen] = useState(false);
  const [contributionType, setContributionType] = useState<ContributionType>("submit_photo");
  const [contribForm, setContribForm] = useState({
    title: "",
    details: "",
    author_name: "",
    author_phone: "",
    evidence_url: "",
  });
  const [contribFeedback, setContribFeedback] = useState<string | null>(null);

  // If project not found in store
  if (!project) {
    return (
      <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] flex flex-col">
        <Navbar />
        <DevelopmentNav />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-[#EDE6D8] text-center shadow-card">
            <HardHat className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
            <h2 className="text-xl font-bold text-[#194B35]">
              Project Not Found
            </h2>
            <p className="text-xs text-[#5C6A64] mt-2 leading-relaxed">
              The requested municipal project does not exist in the official registry or has been archived.
            </p>
            <div className="mt-6">
              <Link
                href="/development/projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#194B35] text-white text-xs font-bold hover:bg-[#123626] transition shadow-xs"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Projects Directory</span>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
        <BottomNav />
      </div>
    );
  }

  const handleContribSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contribForm.details.trim()) return;

    digitalMunicipalityStore.addProjectContribution({
      project_id: project.id,
      project_title: project.title,
      type: contributionType,
      title: contribForm.title || `${contributionType.replace("_", " ")} on ${project.title}`,
      details: contribForm.details,
      author_name: contribForm.author_name || "Resident",
      author_phone: contribForm.author_phone,
      evidence_url: contribForm.evidence_url,
    });

    setContribFeedback(
      "Your contribution has been received for administrative review. Thank you for participating in civic oversight!"
    );

    setTimeout(() => {
      setIsContributionModalOpen(false);
      setContribFeedback(null);
      setContribForm({
        title: "",
        details: "",
        author_name: "",
        author_phone: "",
        evidence_url: "",
      });
    }, 2200);
  };

  const getCategoryIcon = (key: string) => {
    switch (key) {
      case "roads_transportation":
      case "roads_transport":
        return <Car className="w-4 h-4" />;
      case "drainage_water":
      case "water_drainage":
        return <Droplets className="w-4 h-4" />;
      case "drinking_water":
        return <Droplets className="w-4 h-4" />;
      case "waste_management":
        return <Trash2 className="w-4 h-4" />;
      case "education":
        return <GraduationCap className="w-4 h-4" />;
      case "healthcare":
        return <Activity className="w-4 h-4" />;
      case "public_infrastructure":
      case "public_facilities":
        return <Building2 className="w-4 h-4" />;
      case "parks_public_spaces":
      case "environment":
        return <Trees className="w-4 h-4" />;
      default:
        return <Layers className="w-4 h-4" />;
    }
  };

  const getStatusBadgeClass = (status: ProjectStatus) => {
    switch (status) {
      case "Proposed":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "Approved":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "Planned":
        return "bg-cyan-100 text-cyan-800 border-cyan-300";
      case "In Progress":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "Delayed":
        return "bg-rose-100 text-rose-800 border-rose-300";
      case "Completed":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "On Hold":
        return "bg-stone-200 text-stone-800 border-stone-300";
      case "Cancelled":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const sourceDocuments = project.source_documents || [];
  const progressUpdates = project.progress_updates || [];
  
  // Aggregate photos
  const allImages = Array.from(new Set([
    ...(project.gallery_images || []),
    ...(project.project_images || []),
    ...(project.project_image ? [project.project_image] : [])
  ])).filter(Boolean);

  const approvedBudgetDisplay = project.approved_budget || project.budget_sanctioned || "Pending Sanction";
  const estimatedCostDisplay = project.estimated_cost || "Under DPR Estimation";
  const actualExpenditureDisplay = project.actual_expenditure || (project.status === "Completed" ? approvedBudgetDisplay : "Subject to Final Audit");
  const fundingSourceDisplay = project.funding_source || "Tanur Municipal Plan Fund";
  const implementingAgencyDisplay = project.implementing_agency || project.department || "Municipal Engineering Wing";

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] flex flex-col font-sans">
      <Navbar />
      <DevelopmentNav />

      <main className="flex-1 pb-24">
        {/* Breadcrumbs & Header Actions */}
        <div className="bg-white border-b border-[#EDE6D8] py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-1.5 text-[#5C6A64] truncate">
              <Link href="/development" className="hover:text-[#194B35] transition">
                Development Tracker
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
              <Link href="/development/projects" className="hover:text-[#194B35] transition">
                Projects
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
              <span className="font-bold text-[#194B35] truncate max-w-xs">
                {project.title}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/admin/development"
                className="px-3 py-1 rounded-lg bg-[#FAF7F0] hover:bg-[#EDE6D8] text-[#194B35] border border-[#DDD5C5] font-bold text-xs transition flex items-center gap-1"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Admin Workspace</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-b from-[#194B35] to-[#123626] text-white pt-8 pb-12 sm:pt-10 sm:pb-16 shadow-inner">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {/* Category Pill */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold border border-white/20">
                {getCategoryIcon(project.category)}
                <span>{project.category_name}</span>
              </span>

              {/* Status Badge */}
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold border ${getStatusBadgeClass(project.status)}`}>
                <span>{project.status}</span>
              </span>

              {/* Source Verification Badge */}
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#C39A5B]/20 text-[#C39A5B] text-[11px] font-bold border border-[#C39A5B]/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>
                  {project.source_type === "official_published"
                    ? "Official Published Gazette"
                    : project.source_type === "community_submitted"
                    ? "Citizen Field Report"
                    : "Municipal Administrative Entry"}
                </span>
              </span>

              {project.verification_status && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 text-[#EDE6D8] text-[11px] font-bold border border-white/20 capitalize">
                  <CheckCircle2 className="w-3 h-3 text-[#C39A5B]" />
                  <span>{project.verification_status.replace("_", " ")}</span>
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
              {project.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-[#EDE6D8]">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#C39A5B]" />
                <span>
                  {project.locality || "Tanur Municipality"}
                  {project.ward_number ? ` • Ward ${project.ward_number}${project.ward_name ? ` (${project.ward_name})` : ""}` : ""}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-[#C39A5B]" />
                <span>Implementing Agency: {implementingAgencyDisplay}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#C39A5B]" />
                <span>Last Verified: {project.last_verified_date || project.announcement_date || "2024-11-15"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left 8 Cols: Overview, Three-Way Financial Matrix, Timeline, Photos, Documents */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Card 1: Project Scope & Official Description */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE6D8] shadow-card space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-[#194B35] mb-2 flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-[#C39A5B]" />
                    <span>Project Overview & Engineering Scope</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5C6A64] leading-relaxed whitespace-pre-line">
                    {project.description}
                  </p>
                </div>

                {/* Progress Tracking Bar (Only if verified progress percentage exists) */}
                {typeof project.progress_percentage === "number" && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-[#194B35]">
                      <span>Verified Physical Completion</span>
                      <span className="font-mono text-sm">{project.progress_percentage}%</span>
                    </div>
                    <div className="w-full bg-[#EDE6D8] h-3 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#194B35] h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, Math.max(0, project.progress_percentage))}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-[#7A8880]">
                      Certified according to official Measurement Book (MB) recordings and site inspection logs.
                    </p>
                  </div>
                )}

                {/* Statutory Physical Inspection & MB Status Box */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] space-y-2.5">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="font-bold text-[#194B35] text-xs sm:text-sm">
                      Physical Inspection & Measurement Book (MB) Verification
                    </span>
                    {project.status === "Completed" ? (
                      <VerificationBadge level="verified" citation="Commissioned" />
                    ) : project.status === "Approved" ? (
                      <VerificationBadge level="verified" citation="Sanctioned" />
                    ) : project.status === "Proposed" ? (
                      <VerificationBadge level="partially_verified" citation="Proposal" />
                    ) : (
                      <VerificationBadge level="awaiting_verification" />
                    )}
                  </div>
                  
                  <p className="text-[11px] text-[#5C6A64] leading-relaxed">
                    {project.status === "Completed"
                      ? "The project construction is fully completed, certified by the Assistant Executive Engineer (AEE), and commissioned for public use. Final utilization audit records have been registered."
                      : project.status === "In Progress"
                      ? "Field civil works are actively underway. Progress milestones are updated strictly upon receipt of verified Measurement Book recordings signed by the Municipal Engineering Wing."
                      : project.status === "Delayed"
                      ? "Execution has encountered logistical or technical bottlenecks. Official remarks and revised timelines are recorded in the milestone audit."
                      : "Project is in the planning, administrative sanction, or tender preparation phase."}
                  </p>

                  <div className="pt-2 border-t border-[#EDE6D8] flex items-center justify-between text-[11px] text-[#7A8880]">
                    <span>{progressUpdates.length} Recorded Milestone Audits</span>
                    <span>Last Verified: {project.last_verified_date || project.announcement_date || "2024-11-15"}</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Three-Way Financial Breakdown Matrix */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE6D8] shadow-card space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Banknote className="w-5 h-5 text-[#C39A5B]" />
                    <h2 className="text-lg font-bold text-[#194B35]">
                      Three-Way Budget & Financial Breakdown
                    </h2>
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#FAF7F0] text-[#194B35] border border-[#DDD5C5]">
                    Statutory Transparency
                  </span>
                </div>
                
                <p className="text-xs text-[#5C6A64] leading-relaxed">
                  In compliance with public expenditure transparency, OUR NATION strictly distinguishes between Approved Budget (administrative sanction), Estimated Cost (DPR proposal), and Actual Audited Expenditure.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                  {/* Approved Budget */}
                  <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8]">
                    <div className="flex items-center justify-between text-[#7A8880] mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider">Approved Budget</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <span className="text-base font-extrabold text-[#194B35] font-mono block">
                      {approvedBudgetDisplay}
                    </span>
                    <span className="text-[10px] text-[#7A8880] mt-1 block">
                      Statutory administrative sanction
                    </span>
                  </div>

                  {/* Estimated Cost */}
                  <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8]">
                    <div className="flex items-center justify-between text-[#7A8880] mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider">Estimated Cost (DPR)</span>
                      <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                    </div>
                    <span className="text-base font-extrabold text-[#194B35] font-mono block">
                      {estimatedCostDisplay}
                    </span>
                    <span className="text-[10px] text-[#7A8880] mt-1 block">
                      Detailed Project Report estimate
                    </span>
                  </div>

                  {/* Actual Expenditure */}
                  <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8]">
                    <div className="flex items-center justify-between text-[#7A8880] mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider">Actual Expenditure</span>
                      <DollarSign className="w-3.5 h-3.5 text-[#C39A5B]" />
                    </div>
                    <span className="text-base font-extrabold text-[#194B35] font-mono block">
                      {actualExpenditureDisplay}
                    </span>
                    <span className="text-[10px] text-[#7A8880] mt-1 block">
                      Audited payment voucher records
                    </span>
                  </div>
                </div>

                {/* Additional Financial Attributes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-white border border-[#EDE6D8] text-xs">
                    <span className="text-[#7A8880] block text-[11px]">Funding Source / Scheme:</span>
                    <strong className="text-[#194B35] mt-0.5 block">{fundingSourceDisplay}</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-[#EDE6D8] text-xs">
                    <span className="text-[#7A8880] block text-[11px]">Contractor / Executing Agency:</span>
                    <strong className="text-[#194B35] mt-0.5 block">{project.contractor_name || implementingAgencyDisplay}</strong>
                  </div>
                </div>
              </div>

              {/* Card 3: Milestone Timeline & Status Transitions */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE6D8] shadow-card">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-bold text-[#194B35] flex items-center gap-2">
                      <Clock className="w-5 h-5 text-[#C39A5B]" />
                      <span>Verified Progress & Milestone Timeline</span>
                    </h2>
                    <p className="text-xs text-[#5C6A64] mt-0.5">
                      Chronological milestone audit with official remarks, inspection dates, and evidence links.
                    </p>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {progressUpdates.length} Milestones
                  </span>
                </div>

                {progressUpdates.length === 0 ? (
                  <div className="p-8 text-center bg-[#FAF7F0] rounded-2xl border border-[#EDE6D8] text-xs text-[#5C6A64]">
                    <Clock className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                    <span>No progress milestones recorded yet for this project.</span>
                  </div>
                ) : (
                  <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#EDE6D8]">
                    {progressUpdates.map((update, idx) => (
                      <div key={update.id || idx} className="relative group">
                        {/* Milestone Node */}
                        <div className="absolute -left-6 sm:-left-8 top-1.5 w-3 h-3 rounded-full bg-[#194B35] ring-4 ring-white" />

                        <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] hover:border-[#194B35] transition">
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                            <span className="text-xs font-bold text-[#C39A5B] flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>{update.date}</span>
                            </span>
                            <div className="flex items-center gap-2">
                              {update.status_transition && (
                                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border ${getStatusBadgeClass(update.status_transition)}`}>
                                  {update.status_transition}
                                </span>
                              )}
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-[#EDE6D8] text-[#5C6A64]">
                                Verified by: {update.verified_by || "Municipal Engineering Wing"}
                              </span>
                            </div>
                          </div>

                          <h4 className="text-sm font-bold text-[#194B35]">
                            {update.title}
                          </h4>

                          <p className="text-xs text-[#5C6A64] mt-1 leading-relaxed whitespace-pre-line">
                            {update.note}
                          </p>

                          {/* Official Remarks */}
                          {update.official_remarks && (
                            <div className="mt-2.5 p-3 rounded-xl bg-white border border-[#EDE6D8] text-[11px] text-[#194B35]">
                              <span className="font-bold text-[#C39A5B] block mb-0.5">Official Engineering Remark:</span>
                              <p className="italic text-[#5C6A64]">{update.official_remarks}</p>
                            </div>
                          )}

                          {/* Milestone Percentage Bar */}
                          {typeof update.milestone_percentage === "number" && (
                            <div className="mt-2.5 flex items-center gap-2 text-[11px] text-[#5C6A64]">
                              <span className="font-bold text-[#194B35]">Recorded Completion:</span>
                              <div className="w-24 bg-[#EDE6D8] h-2 rounded-full overflow-hidden">
                                <div 
                                  className="bg-[#194B35] h-full" 
                                  style={{ width: `${update.milestone_percentage}%` }}
                                />
                              </div>
                              <span className="font-mono font-bold text-[#194B35]">{update.milestone_percentage}%</span>
                            </div>
                          )}

                          {/* Evidence link */}
                          {update.evidence_url && (
                            <div className="mt-3 pt-2.5 border-t border-[#EDE6D8] flex items-center gap-2">
                              <a
                                href={update.evidence_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-bold text-[#194B35] hover:text-[#C39A5B] inline-flex items-center gap-1 transition"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                <span>View Official Verification Evidence</span>
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Card 4: Field Photographs & Evidence Gallery */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE6D8] shadow-card">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="text-lg font-bold text-[#194B35] flex items-center gap-2">
                      <Camera className="w-5 h-5 text-[#C39A5B]" />
                      <span>Field Inspection Photographs & Visual Evidence</span>
                    </h2>
                    <p className="text-xs text-[#5C6A64] mt-0.5">
                      Ground verification photographs from municipal site inspections and public contributions.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setContributionType("submit_photo");
                      setIsContributionModalOpen(true);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-white text-[#194B35] border border-[#DDD5C5] hover:bg-[#FAF7F0] text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                  >
                    <Camera className="w-3.5 h-3.5 text-[#C39A5B]" />
                    <span>Submit Photo</span>
                  </button>
                </div>

                {allImages.length === 0 ? (
                  <div className="p-8 text-center bg-[#FAF7F0] rounded-2xl border border-[#EDE6D8] text-xs text-[#5C6A64]">
                    <Camera className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                    <span>No photographic records currently attached to this project.</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {allImages.map((img, i) => (
                      <div key={i} className="rounded-2xl overflow-hidden border border-[#EDE6D8] bg-[#FAF7F0] group">
                        <div className="aspect-video relative overflow-hidden bg-neutral-200">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={img}
                            alt={`${project.title} photographic record ${i + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                          />
                        </div>
                        <div className="p-3 text-[11px] text-[#5C6A64] flex items-center justify-between">
                          <span>Inspection Evidence #{i + 1}</span>
                          <span className="font-bold text-[#194B35]">Verified On Ground</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Card 5: Official Documents, Gazette Orders & References */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE6D8] shadow-card space-y-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#C39A5B]" />
                  <h2 className="text-lg font-bold text-[#194B35]">
                    Official Documents & Gazette References
                  </h2>
                </div>
                <p className="text-xs text-[#5C6A64] leading-relaxed">
                  Every figure and status shown on OUR NATION is sourced from official Government Orders, Municipal Council resolutions, or verified e-Tender portals.
                </p>

                {sourceDocuments.length > 0 ? (
                  <div className="space-y-3">
                    {sourceDocuments.map((doc) => (
                      <div
                        key={doc.id}
                        className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-6 h-6 text-[#194B35] shrink-0" />
                          <div>
                            <div className="text-xs font-bold text-[#194B35]">{doc.title}</div>
                            <div className="text-[11px] text-[#7A8880]">
                              {doc.publisher} • {doc.published_date} ({doc.document_type})
                            </div>
                          </div>
                        </div>
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-xl bg-white border border-[#DDD5C5] text-[#194B35] text-xs font-bold hover:bg-[#FAF7F0] transition inline-flex items-center gap-1 shrink-0"
                        >
                          <span>Open</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-[#194B35] block">
                        {project.official_source_name || "Department of Local Self Government (LSGD)"}
                      </span>
                      <span className="text-[11px] text-[#7A8880]">Primary Statutory Reference Portal</span>
                    </div>
                    {project.official_source_url && (
                      <a
                        href={project.official_source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-white border border-[#DDD5C5] text-[#194B35] text-xs font-bold hover:bg-[#FAF7F0] transition inline-flex items-center gap-1 shrink-0"
                      >
                        <span>Visit Source</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                )}

                {/* Statutory Policy Disclaimer */}
                <DataSourcesNotice
                  className="mt-4"
                  title="Development Verification Policy"
                  sources={[
                    project.official_source_name || "LSGD Engineering Directorate (LID & EW)",
                    "Kerala State e-Procurement Portal",
                    "Tanur Municipal Council Gazette Archives",
                  ]}
                />
              </div>

              {/* Card 6: Citizen Participation & Public Audit */}
              <div className="bg-gradient-to-r from-[#194B35] to-[#123626] rounded-3xl p-6 sm:p-8 text-white shadow-lg space-y-4">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#C39A5B]" />
                  <h3 className="text-lg font-bold">
                    Citizen Observation & Field Participation
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#EDE6D8] leading-relaxed">
                  Have an update, progress photograph, or observed a discrepancy regarding this project? Submit your observation for administrative verification and inclusion in the audit log.
                </p>

                <div className="flex flex-wrap gap-2.5 pt-2">
                  <button
                    onClick={() => {
                      setContributionType("submit_photo");
                      setIsContributionModalOpen(true);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#C39A5B] hover:bg-[#b0874a] text-[#194B35] text-xs font-extrabold transition flex items-center gap-1.5 shadow-xs"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Submit Field Photo</span>
                  </button>

                  <button
                    onClick={() => {
                      setContributionType("report_outdated");
                      setIsContributionModalOpen(true);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition flex items-center gap-1.5"
                  >
                    <Flag className="w-3.5 h-3.5 text-amber-300" />
                    <span>Report Outdated Info</span>
                  </button>

                  <button
                    onClick={() => {
                      setContributionType("ask_question");
                      setIsContributionModalOpen(true);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition flex items-center gap-1.5"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-sky-300" />
                    <span>Ask Question</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Location Map & Sidebar Meta */}
            <div className="lg:col-span-4 space-y-6">
              {/* GIS Map Card */}
              <div className="bg-white rounded-3xl p-5 border border-[#EDE6D8] shadow-card space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-[#194B35]" />
                    <h3 className="text-sm font-bold text-[#194B35]">
                      Project GIS Location
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold text-[#7A8880]">
                    {project.latitude && project.longitude ? "GPS Verified" : "Ward Demarcated"}
                  </span>
                </div>

                {project.latitude && project.longitude ? (
                  <div className="overflow-hidden rounded-2xl border border-[#EDE6D8]">
                    <DevelopmentProjectMap
                      projects={[project]}
                      selectedProjectId={project.id}
                      heightClass="h-56 sm:h-64"
                    />
                  </div>
                ) : (
                  <div className="h-48 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] flex flex-col items-center justify-center text-center p-4 text-[#5C6A64]">
                    <MapPin className="w-8 h-8 text-neutral-400 mb-1.5" />
                    <span className="text-xs font-bold text-[#194B35]">
                      {project.locality || "Tanur Municipality"}
                    </span>
                    <span className="text-[11px] text-[#7A8880] mt-0.5">
                      Coordinates pending municipal GIS pinpointing
                    </span>
                  </div>
                )}

                <div className="text-xs text-[#5C6A64] space-y-1.5 pt-1">
                  <div className="flex justify-between">
                    <span>Locality / Landmark:</span>
                    <strong className="text-[#194B35]">{project.locality || "Tanur"}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Municipal Ward:</span>
                    <strong className="text-[#194B35]">
                      {project.ward_number ? `Ward ${project.ward_number}${project.ward_name ? ` (${project.ward_name})` : ""}` : "Not Ward-Specific"}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Local Body:</span>
                    <strong className="text-[#194B35]">Tanur Municipality (Grade II)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Central Switchboard:</span>
                    <strong className="text-[#194B35] font-mono">0494 2440228</strong>
                  </div>
                </div>
              </div>

              {/* Project Lifecycle Timeline Metadata */}
              <div className="bg-white rounded-3xl p-5 border border-[#EDE6D8] shadow-card space-y-3">
                <h3 className="text-sm font-bold text-[#194B35] flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#194B35]" />
                  <span>Statutory Dates</span>
                </h3>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-[#FAF7F0]">
                    <span className="text-[#7A8880]">Announcement Date:</span>
                    <span className="font-bold text-[#194B35]">{project.announcement_date || "Not Available"}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#FAF7F0]">
                    <span className="text-[#7A8880]">Approval / Sanction Date:</span>
                    <span className="font-bold text-[#194B35]">{project.approval_date || "Not Available"}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#FAF7F0]">
                    <span className="text-[#7A8880]">Commencement Date:</span>
                    <span className="font-bold text-[#194B35]">{project.start_date || "Not Available"}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#FAF7F0]">
                    <span className="text-[#7A8880]">Expected Completion:</span>
                    <span className="font-bold text-[#194B35]">{project.expected_completion_date || "Not Available"}</span>
                  </div>
                  {project.actual_completion_date && (
                    <div className="flex justify-between py-1.5">
                      <span className="text-[#7A8880]">Actual Completion:</span>
                      <span className="font-bold text-emerald-700">{project.actual_completion_date}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Responsible Department Card */}
              <div className="bg-white rounded-3xl p-5 border border-[#EDE6D8] shadow-card space-y-3">
                <h3 className="text-sm font-bold text-[#194B35] flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-[#194B35]" />
                  <span>Administrative Authority</span>
                </h3>

                <div className="p-3.5 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8]">
                  <div className="font-bold text-xs text-[#194B35]">
                    {implementingAgencyDisplay}
                  </div>
                  <div className="text-[11px] text-[#7A8880] mt-1">
                    Department responsible for engineering supervision, quality inspection, and milestone certification.
                  </div>
                </div>

                <div className="text-[11px] text-[#5C6A64] space-y-1 pt-1">
                  <div>Source: <strong>{project.official_source_name || "Tanur Municipality"}</strong></div>
                  <div>Verification Level: <strong className="text-emerald-700">Audit Grounded</strong></div>
                </div>
              </div>

              {/* Quick Navigation Card */}
              <div className="bg-[#FAF7F0] rounded-3xl p-5 border border-[#EDE6D8] space-y-3">
                <h4 className="text-xs font-bold text-[#194B35] uppercase tracking-wider">
                  Related Civic Portals
                </h4>
                <div className="space-y-1.5 text-xs">
                  <Link
                    href="/development/projects"
                    className="block p-2.5 rounded-xl bg-white border border-[#EDE6D8] hover:border-[#194B35] text-[#194B35] font-bold transition flex items-center justify-between"
                  >
                    <span>All Municipal Projects</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href="/digital-tanur"
                    className="block p-2.5 rounded-xl bg-white border border-[#EDE6D8] hover:border-[#194B35] text-[#194B35] font-bold transition flex items-center justify-between"
                  >
                    <span>Digital Tanur GIS Map</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href="/services"
                    className="block p-2.5 rounded-xl bg-white border border-[#EDE6D8] hover:border-[#194B35] text-[#194B35] font-bold transition flex items-center justify-between"
                  >
                    <span>Online Public Services</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Contribution / Public Observation Modal */}
      {isContributionModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#EDE6D8] shadow-2xl relative space-y-4">
            <button
              onClick={() => setIsContributionModalOpen(false)}
              className="absolute right-5 top-5 p-1 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-[#194B35]" />
              <h3 className="text-base font-bold text-[#194B35]">
                {contributionType === "submit_photo"
                  ? "Submit Field Inspection Photograph"
                  : contributionType === "report_outdated"
                  ? "Report Outdated or Inaccurate Information"
                  : "Submit Inquiry Regarding Project"}
              </h3>
            </div>

            <p className="text-xs text-[#5C6A64] leading-relaxed">
              All resident observations and photographic evidence are reviewed by municipal moderators before incorporation into the public audit ledger.
            </p>

            {contribFeedback ? (
              <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                {contribFeedback}
              </div>
            ) : (
              <form onSubmit={handleContribSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="font-bold text-[#1A2420] block mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={contribForm.author_name}
                    onChange={(e) => setContribForm({ ...contribForm, author_name: e.target.value })}
                    placeholder="Resident Name"
                    className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-hidden focus:border-[#194B35]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#1A2420] block mb-1">
                    Detailed Notes / Observations *
                  </label>
                  <textarea
                    rows={4}
                    value={contribForm.details}
                    onChange={(e) => setContribForm({ ...contribForm, details: e.target.value })}
                    required
                    placeholder="Describe field progress, observed delays, photo details, or specific corrections needed..."
                    className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-hidden focus:border-[#194B35]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#1A2420] block mb-1">
                    Photo or Document URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={contribForm.evidence_url}
                    onChange={(e) => setContribForm({ ...contribForm, evidence_url: e.target.value })}
                    placeholder="https://example.com/field-photo.jpg"
                    className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-hidden focus:border-[#194B35]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsContributionModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-neutral-600 hover:bg-neutral-100 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#194B35] hover:bg-[#123626] text-white font-bold transition shadow-xs"
                  >
                    Submit for Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer />
      <BottomNav />
    </div>
  );
}
