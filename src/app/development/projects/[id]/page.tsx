"use client";

import React, { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useParams, notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { DevelopmentNav } from "@/components/development/DevelopmentNav";
import { useLanguage } from "@/lib/i18n/context";
import { useAuth } from "@/lib/auth/context";
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
  FileCheck2,
  MessageSquare,
  Send,
  Flag,
  HelpCircle,
  X,
  Info,
  Car,
  Droplets,
  Trash2,
  GraduationCap,
  Activity,
  Leaf,
  Sun,
  Users,
  Layers,
  Edit
} from "lucide-react";

// Dynamic import for Leaflet-based project map
const DevelopmentProjectMap = dynamic(
  () => import("@/components/development/DevelopmentProjectMap").then((mod) => mod.DevelopmentProjectMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-64 sm:h-80 w-full rounded-2xl bg-[#EDE6D8] animate-pulse flex flex-col items-center justify-center text-[#5C6A64]">
        <Compass className="w-8 h-8 text-[#194B35] animate-spin mb-2" />
        <span className="text-xs font-bold text-[#194B35]">മാപ്പ് ലോഡ് ചെയ്യുന്നു...</span>
      </div>
    ),
  }
);

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params?.id as string;
  const { language } = useLanguage();
  const { role, user } = useAuth();
  const isStaff = role === "admin" || role === "moderator";

  const project = digitalMunicipalityStore.getProjectById(projectId);

  // Public Contribution modal state
  const [isContributionModalOpen, setIsContributionModalOpen] = useState(false);
  const [contributionType, setContributionType] = useState<ContributionType>("submit_photo");
  const [contribForm, setContribForm] = useState({
    title: "",
    details: "",
    author_name: user?.display_name || user?.username || "",
    author_phone: user?.phone || "",
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
            <h2 className="text-xl font-bold font-malayalam-heading text-[#194B35]">
              {language === "ml" ? "പദ്ധതി കണ്ടെത്താനായില്ല" : "Project Not Found"}
            </h2>
            <p className="text-xs text-[#5C6A64] mt-2">
              {language === "ml" 
                ? "നിങ്ങൾ തിരഞ്ഞ പ്രൊജക്റ്റ് രജിസ്ട്രിയിൽ ലഭ്യമല്ല അല്ലെങ്കിൽ നീക്കം ചെയ്യപ്പെട്ടിരിക്കാം."
                : "The requested municipal project does not exist in the official registry or has been archived."}
            </p>
            <div className="mt-6">
              <Link
                href="/development/projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#194B35] text-white text-xs font-bold hover:bg-[#123626] transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{language === "ml" ? "പദ്ധതി സൂചികയിലേക്ക് മടങ്ങുക" : "Return to Directory"}</span>
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
      language === "ml"
        ? "നിങ്ങളുടെ സമർപ്പണം നഗരസഭാ അവലോകനത്തിനായി സ്വീകരിച്ചു. നന്ദി!"
        : "Your contribution has been received for administrative review. Thank you!"
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
    }, 2000);
  };

  const getCategoryIcon = (key: string) => {
    switch (key) {
      case "roads_transport": return <Car className="w-4 h-4" />;
      case "water_drainage": return <Droplets className="w-4 h-4" />;
      case "waste_management": return <Trash2 className="w-4 h-4" />;
      case "education": return <GraduationCap className="w-4 h-4" />;
      case "healthcare": return <Activity className="w-4 h-4" />;
      case "public_facilities": return <Building2 className="w-4 h-4" />;
      case "environment": return <Leaf className="w-4 h-4" />;
      case "streetlights": return <Sun className="w-4 h-4" />;
      case "community_infrastructure": return <Users className="w-4 h-4" />;
      default: return <Layers className="w-4 h-4" />;
    }
  };

  const getStatusBadgeClass = (status: ProjectStatus) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "In Progress":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "Approved":
        return "bg-sky-100 text-sky-800 border-sky-300";
      case "Announced":
        return "bg-indigo-100 text-indigo-800 border-indigo-300";
      case "Proposed":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "Delayed":
        return "bg-rose-100 text-rose-800 border-rose-300";
      case "On Hold":
        return "bg-stone-200 text-stone-800 border-stone-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const sourceDocuments = project.source_documents || [];
  const progressUpdates = project.progress_updates || [];
  const projectImages = project.project_images && project.project_images.length > 0
    ? project.project_images 
    : [project.project_image];

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] flex flex-col font-sans">
      <Navbar />
      <DevelopmentNav />

      <main className="flex-1 pb-24">
        {/* Breadcrumbs & Admin Actions */}
        <div className="bg-white border-b border-[#EDE6D8] py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-1.5 text-[#5C6A64] truncate">
              <Link href="/development" className="hover:text-[#194B35]">
                {language === "ml" ? "വികസന ട്രാക്കർ" : "Dev Tracker"}
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/development/projects" className="hover:text-[#194B35]">
                {language === "ml" ? "പദ്ധതികൾ" : "Projects"}
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="font-bold text-[#194B35] truncate max-w-xs">
                {language === "ml" ? project.title_ml : project.title}
              </span>
            </div>

            {isStaff && (
              <Link
                href={`/admin/development/projects/${project.id}/edit`}
                className="px-3 py-1 rounded-lg bg-[#C39A5B] hover:bg-[#b0874a] text-[#194B35] font-extrabold text-xs transition flex items-center gap-1 shrink-0"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>{language === "ml" ? "എഡിറ്റ് ചെയ്യുക" : "Edit Project"}</span>
              </Link>
            )}
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-b from-[#194B35] to-[#123626] text-white pt-8 pb-12 sm:pt-10 sm:pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {/* Category Pill */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold border border-white/20">
                {getCategoryIcon(project.category)}
                <span>{language === "ml" ? project.category_name_ml : project.category_name}</span>
              </span>

              {/* Status Badge */}
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold border ${getStatusBadgeClass(project.status)}`}>
                <span>{project.status}</span>
              </span>

              {/* Source Type Badge */}
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#C39A5B]/20 text-[#C39A5B] text-[11px] font-bold border border-[#C39A5B]/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>
                  {project.source_type === "official_published"
                    ? (language === "ml" ? "ഔദ്യോഗിക ഗസറ്റ് പ്രസിദ്ധീകരണം" : "Officially Published Record")
                    : project.source_type === "community_submitted"
                    ? (language === "ml" ? "പൗര സമർപ്പണം" : "Community Submitted")
                    : (language === "ml" ? "നഗരസഭാ അഡ്മിൻ രേഖ" : "Admin Entered Record")}
                </span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold font-malayalam-heading text-white leading-tight">
              {language === "ml" ? project.title_ml : project.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-[#EDE6D8]">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#C39A5B]" />
                <span>
                  {project.locality || "Tanur Municipality"}
                  {project.ward_number ? ` • Ward ${project.ward_number} (${project.ward_name || ""})` : ""}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-[#C39A5B]" />
                <span>{language === "ml" ? project.department_ml : project.department}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#C39A5B]" />
                <span>Verified: {project.last_verified_date || project.announcement_date}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left 8 Cols: Overview, Timeline, Evidence, Photos, Participation */}
            <div className="lg:col-span-8 space-y-8">
              {/* Card 1: Project Description & Key Details */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE6D8] shadow-xs space-y-6">
                <div>
                  <h2 className="text-lg font-bold font-malayalam-heading text-[#194B35] mb-2">
                    {language === "ml" ? "പദ്ധതി അവലോകനം & വിശദാംശങ്ങൾ" : "Project Overview & Scope"}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5C6A64] leading-relaxed whitespace-pre-line">
                    {language === "ml" ? project.description_ml : project.description}
                  </p>
                </div>

                {/* Physical Progress & Measurement Verification Notice */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] space-y-2.5">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="font-bold text-[#194B35] text-xs sm:text-sm">
                      {language === "ml" ? "ഭൗതിക പുരോഗതി & എൻജിനീയറിംഗ് പരിശോധനാ സ്ഥിതി" : "Physical Inspection & Measurement Book (MB) Status"}
                    </span>
                    {project.status === "Completed" ? (
                      <VerificationBadge level="verified" citation="Commissioned" language={language} />
                    ) : project.status === "Approved" ? (
                      <VerificationBadge level="verified" citation="Sanctioned" language={language} />
                    ) : project.status === "Proposed" ? (
                      <VerificationBadge level="partially_verified" citation="Proposal" language={language} />
                    ) : (
                      <VerificationBadge level="awaiting_verification" language={language} />
                    )}
                  </div>
                  
                  <p className="text-[11px] text-[#5C6A64] leading-relaxed">
                    {project.status === "Completed"
                      ? (language === "ml" 
                          ? "പദ്ധതി നിർമ്മാണം പൂർത്തിയാക്കി പൊതുജനങ്ങൾക്ക് തുറന്നുകൊടുത്തു. അന്തിമ യൂട്ടിലൈസേഷൻ ഓഡിറ്റ് രേഖപ്പെടുത്തിയിരിക്കുന്നു." 
                          : "Project construction completed, inspected, and commissioned. Final audit records registered.")
                      : project.status === "In Progress"
                      ? (language === "ml"
                          ? "ഫീൽഡിൽ നിർമ്മാണ പ്രവർത്തനങ്ങൾ പുരോഗമിക്കുന്നു. അസിസ്റ്റന്റ് എക്സിക്യൂട്ടീവ് എഞ്ചിനീയറുടെ ഔദ്യോഗിക അളവുപുസ്തക (MB) പരിശോധനയ്ക്കും മൂല്യനിർണ്ണയത്തിനും വിധേയമായതിനാൽ ഏകദേശ ശതമാനങ്ങൾ പ്രദർശിപ്പിക്കുന്നില്ല."
                          : "Field works active on site. Real-time percentages are withheld until verified on-site Measurement Book (MB) recordings are certified by the Municipal Engineering Wing.")
                      : (language === "ml"
                          ? "പദ്ധതി അനുമതി അല്ലെങ്കിൽ പൊതുജനാഭിപ്രായ അവലോകന ഘട്ടത്തിലാണ്."
                          : "Project is in formal planning, administrative sanction, or public consultation phase.")}
                  </p>

                  <div className="pt-2 border-t border-[#EDE6D8] flex items-center justify-between text-[11px] text-[#7A8880]">
                    <span>
                      {language === "ml" 
                        ? `${progressUpdates.length} ഇൻസ്പെക്ഷൻ നാഴികക്കല്ലുകൾ ലഭ്യമാണ്` 
                        : `${progressUpdates.length} Recorded Field Milestones`}
                    </span>
                    <span>
                      Last verified: {project.last_verified_date || project.announcement_date}
                    </span>
                  </div>
                </div>

                {/* Project Metadata Matrix */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-2">
                  <div className="p-3.5 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8]">
                    <span className="text-[10px] font-bold text-[#7A8880] uppercase block">
                      {project.status === "Proposed" || project.status === "Announced"
                        ? (language === "ml" ? "പ്രതീക്ഷിത അടങ്കൽ (Estimated)" : "Estimated Proposal Budget")
                        : project.status === "Completed"
                        ? (language === "ml" ? "ഓഡിറ്റ് ചെയ്ത ചെലവ് (Audited)" : "Audited Expenditure")
                        : (language === "ml" ? "അനുവദിച്ച വിഹിതം (Sanctioned)" : "Sanctioned Technical Budget")}
                    </span>
                    <span className="text-sm font-bold text-[#194B35] font-mono mt-0.5 block">
                      {project.budget_sanctioned || "Information not available"}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8]">
                    <span className="text-[10px] font-bold text-[#7A8880] uppercase block">
                      {language === "ml" ? "പ്രഖ്യാപിച്ച തീയതി" : "Announcement Date"}
                    </span>
                    <span className="text-sm font-bold text-[#194B35] mt-0.5 block">
                      {project.announcement_date || "Information not available"}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8]">
                    <span className="text-[10px] font-bold text-[#7A8880] uppercase block">
                      {language === "ml" ? "അംഗീകാര തീയതി" : "Approval Date"}
                    </span>
                    <span className="text-sm font-bold text-[#194B35] mt-0.5 block">
                      {project.approval_date || "Information not available"}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8]">
                    <span className="text-[10px] font-bold text-[#7A8880] uppercase block">
                      {language === "ml" ? "തുടങ്ങിയ തീയതി" : "Commencement Date"}
                    </span>
                    <span className="text-sm font-bold text-[#194B35] mt-0.5 block">
                      {project.start_date || "Information not available"}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8]">
                    <span className="text-[10px] font-bold text-[#7A8880] uppercase block">
                      {language === "ml" ? "പ്രതീക്ഷിക്കുന്ന പൂർത്തീകരണം" : "Expected Completion"}
                    </span>
                    <span className="text-sm font-bold text-[#194B35] mt-0.5 block">
                      {project.expected_completion_date || "Information not available"}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8]">
                    <span className="text-[10px] font-bold text-[#7A8880] uppercase block">
                      {language === "ml" ? "കരാറുകാരൻ / ഏജൻസി" : "Contractor / Agency"}
                    </span>
                    <span className="text-sm font-bold text-[#194B35] mt-0.5 block truncate">
                      {project.contractor_name || "Information not available"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 2: Visual Project Timeline */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE6D8] shadow-xs">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-bold font-malayalam-heading text-[#194B35]">
                      {language === "ml" ? "പദ്ധതി നാൾവഴികൾ & പുരോഗതി" : "Verified Project Timeline"}
                    </h2>
                    <p className="text-xs text-[#5C6A64] mt-0.5">
                      {language === "ml"
                        ? "ഔദ്യോഗിക അറിയിപ്പുകൾ, ഉത്തരവുകൾ, ഇൻസ്പെക്ഷൻ റിപ്പോർട്ടുകൾ അടങ്ങിയ രേഖകൾ"
                        : "Chronological milestone audit with verified dates and official evidence links."}
                    </p>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {progressUpdates.length} Milestones
                  </span>
                </div>

                {progressUpdates.length === 0 ? (
                  <div className="p-8 text-center bg-[#FAF7F0] rounded-2xl border border-[#EDE6D8] text-xs text-[#5C6A64]">
                    <Clock className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                    <span>{language === "ml" ? "നാൾവഴികൾ ഇതുവരെ രേഖപ്പെടുത്തിയിട്ടില്ല." : "No progress milestones recorded yet."}</span>
                  </div>
                ) : (
                  <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#EDE6D8]">
                    {progressUpdates.map((update, idx) => (
                      <div key={update.id || idx} className="relative group">
                        {/* Dot */}
                        <div className="absolute -left-6 sm:-left-8 top-1.5 w-3 h-3 rounded-full bg-[#194B35] ring-4 ring-white" />

                        <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] hover:border-[#194B35] transition">
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                            <span className="text-xs font-bold text-[#C39A5B] flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>{update.date}</span>
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-[#EDE6D8] text-[#5C6A64]">
                              Verified by: {update.verified_by || "Municipal Engineering Dept"}
                            </span>
                          </div>

                          <h4 className="text-sm font-bold text-[#194B35] font-malayalam-heading">
                            {language === "ml" ? update.title_ml || update.title : update.title}
                          </h4>

                          <p className="text-xs text-[#5C6A64] mt-1 leading-relaxed whitespace-pre-line">
                            {language === "ml" ? update.note_ml || update.note : update.note}
                          </p>

                          {update.evidence_url && (
                            <div className="mt-3 pt-2.5 border-t border-[#EDE6D8] flex items-center gap-2">
                              <a
                                href={update.evidence_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-bold text-[#194B35] hover:text-[#C39A5B] inline-flex items-center gap-1"
                              >
                                <ExternalLink className="w-3 h-3" />
                                <span>{language === "ml" ? "തെളിവ് / റിപ്പോർട്ട് പരിശോധിക്കുക" : "View Official Evidence"}</span>
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Card 3: Project Photographs & Progress Gallery */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE6D8] shadow-xs">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="text-lg font-bold font-malayalam-heading text-[#194B35]">
                      {language === "ml" ? "ഫീൽഡ് ഫോട്ടോഗ്രാഫുകൾ & ദൃശ്യങ്ങൾ" : "Progress Photographs & Field Evidence"}
                    </h2>
                    <p className="text-xs text-[#5C6A64] mt-0.5">
                      {language === "ml" ? "യഥാർത്ഥ നിർമ്മാണ സൈറ്റ് ദൃശ്യങ്ങൾ" : "Documented field photographs with timestamps"}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setContributionType("submit_photo");
                      setIsContributionModalOpen(true);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-white text-[#194B35] border border-[#EDE6D8] hover:bg-[#FAF7F0] text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <Camera className="w-3.5 h-3.5 text-[#C39A5B]" />
                    <span>{language === "ml" ? "ഫോട്ടോ സമർപ്പിക്കുക" : "Submit Photo"}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {projectImages.map((img, i) => (
                    <div key={i} className="rounded-2xl overflow-hidden border border-[#EDE6D8] bg-[#FAF7F0] group">
                      <div className="aspect-video relative overflow-hidden bg-neutral-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                      </div>
                      <div className="p-3 text-[11px] text-[#5C6A64] flex items-center justify-between">
                        <span>Field Record #{i + 1}</span>
                        <span className="font-semibold text-[#194B35]">Verified On Ground</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 4: Transparency, Sources & Government Orders */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE6D8] shadow-xs">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="w-5 h-5 text-[#C39A5B]" />
                  <h2 className="text-lg font-bold font-malayalam-heading text-[#194B35]">
                    {language === "ml" ? "സുതാര്യതാ രേഖകൾ & ഔദ്യോഗിക ഉറവിടങ്ങൾ" : "Transparency Records & Gazette Sources"}
                  </h2>
                </div>
                <p className="text-xs text-[#5C6A64] mb-5 leading-relaxed">
                  {language === "ml"
                    ? "നമ്മുടെ നാട് സുതാര്യ താനൂർ പ്ലാറ്റ്‌ഫോം യാതൊരു വിവരങ്ങളും വ്യാജമായി നിർമ്മിക്കുന്നില്ല. എല്ലാ വിവരങ്ങൾക്കും ഔദ്യോഗിക സർക്കാർ ഉത്തരവുകളോ ഇൻസ്പെക്ഷൻ രേഖകളോ ഉറവിടമായി നൽകിയിരിക്കുന്നു."
                    : "Transparent Tanur never fabricates project figures or clearance statuses. All data is cross-referenced with primary government orders, municipal gazettes, or field audits."}
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
                          className="px-3 py-1.5 rounded-xl bg-white border border-[#EDE6D8] text-[#194B35] text-xs font-bold hover:bg-[#FAF7F0] transition inline-flex items-center gap-1 shrink-0"
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
                        {project.official_source_name || "Department of Local Self Government"}
                      </span>
                      <span className="text-[11px] text-[#7A8880]">Primary Official Reference Portal</span>
                    </div>
                    {project.official_source_url && (
                      <a
                        href={project.official_source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-white border border-[#EDE6D8] text-[#194B35] text-xs font-bold hover:bg-[#FAF7F0] transition inline-flex items-center gap-1 shrink-0"
                      >
                        <span>Visit Source</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                )}

                {/* Data Sources & Verification Policy Notice */}
                <DataSourcesNotice
                  className="mt-4"
                  language={language}
                  title={language === "ml" ? "വികസന പദ്ധതി സ്ഥിരീകരണ നയം" : "Project Verification & Measurement Book Policy"}
                  sources={[
                    project.official_source_name || "Official Department Portal",
                    "Kerala LSGD Engineering Directorate (LID & EW)",
                    "Kerala State e-Procurement Portal",
                  ]}
                />
              </div>

              {/* Card 5: Public Participation & Citizen Contribution Form */}
              <div className="bg-gradient-to-r from-[#194B35] to-[#123626] rounded-3xl p-6 sm:p-8 text-white shadow-lg space-y-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#C39A5B]" />
                  <h3 className="text-lg font-bold font-malayalam-heading">
                    {language === "ml" ? "ജനകീയ നിരീക്ഷണം & പങ്കാളിത്തം" : "Public Participation & Community Audit"}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#EDE6D8] leading-relaxed">
                  {language === "ml"
                    ? "ഈ പദ്ധതിയെക്കുറിച്ച് പുതിയ വിവരങ്ങളോ ഫോട്ടോകളോ ഉണ്ടോ? തെറ്റായ വിവരങ്ങൾ തിരുത്താനോ ചോദ്യങ്ങൾ ചോദിക്കാനോ ഇവിടെ സമർപ്പിക്കാം."
                    : "Have an update, progress photograph, or correction for this project? Submit your evidence for administrative review."}
                </p>

                <div className="flex flex-wrap gap-2.5 pt-2">
                  <button
                    onClick={() => {
                      setContributionType("submit_photo");
                      setIsContributionModalOpen(true);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#C39A5B] hover:bg-[#b0874a] text-[#194B35] text-xs font-extrabold transition flex items-center gap-1.5"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>{language === "ml" ? "ഫോട്ടോ നൽകുക" : "Submit Photo"}</span>
                  </button>

                  <button
                    onClick={() => {
                      setContributionType("report_outdated");
                      setIsContributionModalOpen(true);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition flex items-center gap-1.5"
                  >
                    <Flag className="w-3.5 h-3.5 text-amber-300" />
                    <span>{language === "ml" ? "വിവരം തിരുത്തുക" : "Report Outdated Info"}</span>
                  </button>

                  <button
                    onClick={() => {
                      setContributionType("ask_question");
                      setIsContributionModalOpen(true);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition flex items-center gap-1.5"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-sky-300" />
                    <span>{language === "ml" ? "ചോദ്യം ചോദിക്കുക" : "Ask Question"}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Location Map & Sidebar Meta */}
            <div className="lg:col-span-4 space-y-6">
              {/* Map Card */}
              <div className="bg-white rounded-3xl p-5 border border-[#EDE6D8] shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-[#194B35]" />
                    <h3 className="text-sm font-bold text-[#194B35] font-malayalam-heading">
                      {language === "ml" ? "പദ്ധതി ലൊക്കേഷൻ" : "Project Location"}
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold text-[#7A8880]">
                    {project.latitude && project.longitude ? "GPS Verified" : "Ward Level"}
                  </span>
                </div>

                {project.latitude && project.longitude ? (
                  <div className="overflow-hidden rounded-2xl border border-[#EDE6D8]">
                    <DevelopmentProjectMap
                      projects={[project]}
                      selectedProjectId={project.id}
                      language={language}
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
                      Coordinates pending GPS demarcation
                    </span>
                  </div>
                )}

                <div className="text-xs text-[#5C6A64] space-y-1.5 pt-1">
                  <div className="flex justify-between">
                    <span>{language === "ml" ? "പ്രദേശം" : "Locality"}:</span>
                    <strong className="text-[#194B35]">{project.locality || "Tanur"}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>{language === "ml" ? "വാർഡ് നമ്പർ" : "Ward"}:</span>
                    <strong className="text-[#194B35]">{project.ward_number ? `Ward ${project.ward_number}` : "Information not available"}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>{language === "ml" ? "നഗരസഭ" : "Municipality"}:</span>
                    <strong className="text-[#194B35]">Tanur (Malappuram)</strong>
                  </div>
                </div>
              </div>

              {/* Responsible Department Card */}
              <div className="bg-white rounded-3xl p-5 border border-[#EDE6D8] shadow-xs space-y-3">
                <h3 className="text-sm font-bold text-[#194B35] font-malayalam-heading flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-[#194B35]" />
                  <span>{language === "ml" ? "നിർവ്വഹണ വകുപ്പ്" : "Executing Department"}</span>
                </h3>

                <div className="p-3.5 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8]">
                  <div className="font-bold text-xs text-[#194B35]">
                    {language === "ml" ? project.department_ml : project.department}
                  </div>
                  <div className="text-[11px] text-[#7A8880] mt-1">
                    Official executing agency responsible for tenders, quality inspection, and milestone certification.
                  </div>
                </div>

                <div className="text-[11px] text-[#5C6A64] space-y-1 pt-1">
                  <div>Source: <strong>{project.official_source_name || "Government of Kerala"}</strong></div>
                  <div>Verified Status: <strong className="text-emerald-700">Audit Approved</strong></div>
                </div>
              </div>

              {/* Quick Navigation Card */}
              <div className="bg-[#FAF7F0] rounded-3xl p-5 border border-[#EDE6D8] space-y-3">
                <h4 className="text-xs font-bold text-[#194B35] font-malayalam uppercase tracking-wider">
                  {language === "ml" ? "കൂടുതൽ സേവനങ്ങൾ" : "Related Hubs"}
                </h4>
                <div className="space-y-1.5 text-xs">
                  <Link
                    href="/development/projects"
                    className="block p-2.5 rounded-xl bg-white border border-[#EDE6D8] hover:border-[#194B35] text-[#194B35] font-bold transition flex items-center justify-between"
                  >
                    <span>{language === "ml" ? "എല്ലാ വികസന പദ്ധതികളും" : "All Development Projects"}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href="/digital-tanur"
                    className="block p-2.5 rounded-xl bg-white border border-[#EDE6D8] hover:border-[#194B35] text-[#194B35] font-bold transition flex items-center justify-between"
                  >
                    <span>{language === "ml" ? "ഡിജിറ്റൽ താനൂർ GIS മാപ്പ്" : "Digital Tanur GIS"}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href="/peoples-voice"
                    className="block p-2.5 rounded-xl bg-white border border-[#EDE6D8] hover:border-[#194B35] text-[#194B35] font-bold transition flex items-center justify-between"
                  >
                    <span>{language === "ml" ? "ജനകീയ ശബ്ദം (People's Voice)" : "People's Voice Hub"}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Contribution Modal */}
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
              <h3 className="text-base font-bold font-malayalam-heading text-[#194B35]">
                {contributionType === "submit_photo"
                  ? (language === "ml" ? "പുതിയ ഫോട്ടോ സമർപ്പിക്കുക" : "Submit Field Photograph")
                  : contributionType === "report_outdated"
                  ? (language === "ml" ? "വിവരങ്ങൾ തിരുത്താൻ റിപ്പോർട്ട് ചെയ്യുക" : "Report Outdated / Incorrect Info")
                  : (language === "ml" ? "പദ്ധതിയെക്കുറിച്ച് ചോദ്യം ചോദിക്കുക" : "Ask Question About Project")}
              </h3>
            </div>

            <p className="text-xs text-[#5C6A64]">
              {language === "ml"
                ? "നിങ്ങൾ സമർപ്പിക്കുന്ന വിവരങ്ങൾ നഗരസഭാ അഡ്മിനിസ്ട്രേറ്റർമാർ പരിശോധിച്ച ശേഷം ഔദ്യോഗികമായി ചേർക്കും."
                : "Submitted evidence and observations are reviewed before publication to protect data accuracy."}
            </p>

            {contribFeedback ? (
              <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                {contribFeedback}
              </div>
            ) : (
              <form onSubmit={handleContribSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="font-bold text-[#1A2420] block mb-1">
                    {language === "ml" ? "നിങ്ങളുടെ പേര്" : "Your Name"}
                  </label>
                  <input
                    type="text"
                    value={contribForm.author_name}
                    onChange={(e) => setContribForm({ ...contribForm, author_name: e.target.value })}
                    placeholder="Resident Name"
                    className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#1A2420] block mb-1">
                    {language === "ml" ? "വിവരണം / നിരീക്ഷണം" : "Details / Evidence Notes"} *
                  </label>
                  <textarea
                    rows={4}
                    value={contribForm.details}
                    onChange={(e) => setContribForm({ ...contribForm, details: e.target.value })}
                    required
                    placeholder={
                      language === "ml"
                        ? "നിർമ്മാണ പുരോഗതി, ഫോട്ടോ വിവരണം അല്ലെങ്കിൽ തിരുത്തൽ കുറിപ്പ് നൽകുക..."
                        : "Describe the update, progress noticed, or specific correction needed..."
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#1A2420] block mb-1">
                    {language === "ml" ? "ഫോട്ടോ / രേഖ ലിങ്ക് (URL)" : "Photo / Evidence Link (URL)"}
                  </label>
                  <input
                    type="url"
                    value={contribForm.evidence_url}
                    onChange={(e) => setContribForm({ ...contribForm, evidence_url: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
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
                    {language === "ml" ? "സമർപ്പിക്കുക" : "Submit"}
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
