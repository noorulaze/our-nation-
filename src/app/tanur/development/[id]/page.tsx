"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { TanurNav } from "@/components/tanur/TanurNav";
import { useLanguage } from "@/lib/i18n/context";
import { digitalMunicipalityStore } from "@/lib/data/digitalMunicipalityData";
import { VerificationBadge, DataSourcesNotice } from "@/components/common/VerificationBadge";
import { 
  Building2, 
  MapPin, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  ExternalLink, 
  ArrowLeft, 
  ShieldCheck, 
  HardHat, 
  Layers, 
  TrendingUp,
  FileText,
  AlertCircle
} from "lucide-react";

export default function SingleDevelopmentProjectPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const { language } = useLanguage();

  const project = id ? digitalMunicipalityStore.getProjectById(id) : null;

  if (!project) {
    return (
      <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] pb-24">
        <Navbar />
        <TanurNav />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="w-16 h-16 bg-amber-50 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-200">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">
            {language === "ml" ? "പദ്ധതി കണ്ടെത്താനായില്ല" : "Project Not Found"}
          </h2>
          <p className="text-xs text-gray-500 mt-2">
            {language === "ml" ? "ഈ പദ്ധതി റെക്കോർഡ് നീക്കം ചെയ്യപ്പെട്ടതോ ഐഡി തെറ്റായതോ ആകാം." : "The project record you are looking for does not exist."}
          </p>
          <Link
            href="/tanur/development"
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#194B35] text-white text-xs font-bold transition hover:bg-[#143E2C]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === "ml" ? "വികസന ട്രാക്കറിലേക്ക് മടങ്ങുക" : "Back to Development Tracker"}</span>
          </Link>
        </div>
        <Footer />
        <BottomNav />
      </div>
    );
  }

  const isCompleted = project.status === "Completed";
  const isInProgress = project.status === "In Progress";
  const isApproved = project.status === "Approved";

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] pb-24">
      <Navbar />
      <TanurNav />

      {/* Breadcrumb Header */}
      <div className="bg-[#194B35] text-white py-6 px-4 border-b border-[#143E2C]">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/tanur/development"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-white transition mb-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{language === "ml" ? "എല്ലാ വികസന പദ്ധതികളും" : "Back to Projects"}</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold inline-flex items-center gap-1 ${
              isCompleted ? "bg-emerald-500 text-white" :
              isInProgress ? "bg-amber-400 text-[#143E2C]" :
              isApproved ? "bg-blue-500 text-white" :
              "bg-gray-600 text-white"
            }`}>
              {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : <HardHat className="w-3.5 h-3.5" />}
              <span>{project.status}</span>
            </span>

            <span className="bg-white/20 text-white px-2.5 py-0.5 rounded-full text-xs font-bold">
              {language === "ml" ? project.category_name_ml : project.category_name}
            </span>

            {project.ward_number && (
              <span className="bg-amber-400/20 text-amber-300 px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {language === "ml" ? `വാർഡ് ${project.ward_number}: ${project.ward_name_ml}` : `Ward ${project.ward_number}: ${project.ward_name}`}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {language === "ml" ? project.title_ml : project.title}
          </h1>

          <p className="text-white/80 text-xs sm:text-sm mt-1">
            {language === "ml" ? project.title : project.title_ml}
          </p>
        </div>
      </div>

      {/* Main Body */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        
        {/* Project Image Container */}
        <div className="relative rounded-2xl overflow-hidden shadow-md h-72 sm:h-96 w-full bg-gray-900 border border-gray-200">
          <img
            src={project.project_image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
            <span className="font-bold flex items-center gap-1">
              <Building2 className="w-4 h-4 text-amber-300" />
              {language === "ml" ? project.department_ml : project.department}
            </span>
            <span className="bg-black/60 px-3 py-1 rounded-full backdrop-blur-xs font-extrabold text-amber-300">
              {project.budget_sanctioned}
            </span>
          </div>
        </div>

        {/* Overview & Key Facts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Scope & Description */}
          <div className="lg:col-span-2 space-y-6">
            
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#194B35]" />
                <span>{language === "ml" ? "പദ്ധതി അവലോകനവും ലക്ഷ്യങ്ങളും" : "Project Scope & Description"}</span>
              </h2>

              <div className="space-y-3 text-xs sm:text-sm text-gray-700 leading-relaxed">
                <p className="font-medium text-gray-900">
                  {project.description_ml}
                </p>
                <p className="text-gray-600 italic">
                  {project.description}
                </p>
              </div>

              {/* Physical Inspection & Measurement Book Verification Status */}
              <div className="pt-4 border-t border-gray-100">
                <div className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#EDE6D8] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#194B35]">
                      {language === "ml" ? "ഫിസിക്കൽ പരിശോധന & അളവ് പുസ്തക നില (MB Status)" : "Physical Inspection & Measurement Book (MB) Status"}
                    </span>
                    {project.status === "Completed" ? (
                      <VerificationBadge
                        level="verified"
                        citation="Final MB Audit"
                        tooltipText="Final measurements verified and expenditure audited"
                      />
                    ) : (
                      <VerificationBadge
                        level="awaiting_verification"
                        citation="Measurement Book (MB) Entry Pending"
                        tooltipText="Physical progress percentage withheld pending certified Measurement Book recordings"
                      />
                    )}
                  </div>
                  <p className="text-[11px] text-[#5C6A64] leading-relaxed">
                    {project.status === "Completed"
                      ? (language === "ml" 
                          ? "ഈ പദ്ധതിയുടെ എല്ലാ പ്രവൃത്തികളും പൂർത്തീകരിക്കപ്പെടുകയും എഞ്ചിനീയറിംഗ് വിഭാഗത്തിന്റെ അന്തിമ അളവ് പുസ്തക (MB) പരിശോധനയും ഓഡിറ്റും പൂർത്തിയാക്കുകയും ചെയ്തിട്ടുണ്ട്."
                          : "Project execution concluded. Final Measurement Book (MB) entries and completion audits recorded by the Engineering Wing.")
                      : (language === "ml"
                          ? "തദ്ദേശ സ്വയംഭരണ വകുപ്പിന്റെയും നഗരസഭാ എഞ്ചിനീയറിംഗ് വിഭാഗത്തിന്റെയും ഫീൽഡ് ഇൻസ്പെക്ഷൻ റിപ്പോർട്ടും അളവ് പുസ്തക (MB) സാക്ഷ്യപ്പെടുത്തലും ലഭിക്കുന്നതുവരെ പൊതു പ്ലാറ്റ്‌ഫോമിൽ ഊഹാപോഹപരമായ ശതമാനക്കണക്കുകൾ പ്രദർശിപ്പിക്കുന്നതല്ല."
                          : "Per Municipal Data Transparency Policy, unverified real-time percentages are withheld until primary physical measurement evidence (Measurement Book recordings and site inspection certificates) is published by the executing department.")}
                  </p>
                </div>
              </div>
            </div>

            {/* Milestone Updates Timeline */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#194B35]" />
                  <span>{language === "ml" ? "വികസന ഘട്ടങ്ങൾ (Milestones)" : "Documented Milestone Updates"}</span>
                </h2>
                <span className="text-xs bg-emerald-50 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {project.progress_updates.length} {language === "ml" ? "റിപ്പോർട്ടുകൾ" : "Updates"}
                </span>
              </div>

              {project.progress_updates.length === 0 ? (
                <p className="text-xs text-gray-500 py-4 text-center">
                  {language === "ml" ? "ഈ പദ്ധതിക്കായി പുതിയ മൈൽസ്റ്റോൺ അപ്‌ഡേറ്റുകൾ രേഖപ്പെടുത്തിയിട്ടില്ല." : "No milestone updates recorded yet."}
                </p>
              ) : (
                <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
                  {project.progress_updates.map((upd) => (
                    <div key={upd.id} className="relative space-y-1 text-xs">
                      <div className="absolute -left-[1.65rem] top-1 w-3.5 h-3.5 rounded-full bg-[#194B35] ring-4 ring-white" />
                      
                      <div className="flex items-center gap-2 text-gray-400 font-mono text-[11px]">
                        <span>{upd.date}</span>
                        <span>•</span>
                        <span className="text-emerald-700 font-bold">{upd.verified_by}</span>
                      </div>

                      <h4 className="font-bold text-sm text-gray-900">
                        {language === "ml" ? upd.title_ml : upd.title}
                      </h4>

                      <p className="text-gray-600 leading-relaxed">
                        {language === "ml" ? upd.note_ml : upd.note}
                      </p>

                      {upd.evidence_url && (
                        <a
                          href={upd.evidence_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-[#194B35] hover:underline pt-1"
                        >
                          <span>{language === "ml" ? "പരിശോധനാ രേഖ കാണുക" : "View Inspection Document"}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Fact Sheet & Governance Attribution */}
          <div className="space-y-6">
            
            {/* Fact Sheet Card */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">
                {language === "ml" ? "പദ്ധതി രേഖകൾ" : "Official Project Details"}
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-gray-500 block text-[11px]">
                    {project.status === "Completed"
                      ? (language === "ml" ? "ഓഡിറ്റ് ചെയ്ത ചെലവ്" : "Audited Final Expenditure")
                      : project.status === "Proposed"
                      ? (language === "ml" ? "പ്രതീക്ഷിത അടങ്കൽ" : "Estimated Proposal Budget")
                      : (language === "ml" ? "അനുവദിച്ച സാങ്കേതിക വിഹിതം" : "Sanctioned Technical Allocation")}
                  </span>
                  <span className="text-base font-black text-[#194B35]">{project.budget_sanctioned}</span>
                </div>

                <div>
                  <span className="text-gray-500 block">{language === "ml" ? "നിർവ്വഹണ വകുപ്പ് / ഏജൻസി" : "Executing Department"}</span>
                  <span className="font-bold text-gray-800">{project.department}</span>
                  <span className="text-gray-500 block text-[11px]">{project.department_ml}</span>
                </div>

                <div>
                  <span className="text-gray-500 block">{language === "ml" ? "തദ്ദേശ സ്ഥാപനം" : "Municipality"}</span>
                  <span className="font-bold text-gray-800">{project.municipality_name_ml} ({project.municipality_name})</span>
                </div>

                {project.ward_number && (
                  <div>
                    <span className="text-gray-500 block">{language === "ml" ? "വാർഡ് പരിധി" : "Ward Location"}</span>
                    <span className="font-bold text-gray-800">Ward {project.ward_number} - {project.ward_name}</span>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
                  <div>
                    <span className="text-gray-500 block text-[10px] uppercase font-bold">{language === "ml" ? "പ്രഖ്യാപനം" : "Announced"}</span>
                    <span className="font-bold text-gray-800">{project.announcement_date}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px] uppercase font-bold">{language === "ml" ? "പൂർത്തീകരണ ലക്ഷ്യം" : "Target Date"}</span>
                    <span className="font-bold text-gray-800">{project.expected_completion_date || "Ongoing"}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100">
                  <span className="text-gray-500 block">{language === "ml" ? "ഔദ്യോഗിക ഉറവിടം" : "Official Source"}</span>
                  <a
                    href={project.official_source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#194B35] hover:underline flex items-center gap-1 mt-0.5"
                  >
                    <span>{project.official_source_name}</span>
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                </div>

                <div className="pt-2 text-[11px] text-gray-400">
                  {language === "ml" ? `അവസാനം സ്ഥിരീകരിച്ച തീയതി: ${project.last_verified_date}` : `Last verified: ${project.last_verified_date}`}
                </div>
              </div>
            </div>

            {/* People's Voice & Community Suggestion Action Card */}
            <div className="bg-gradient-to-br from-[#FAF7F0] to-[#EFE9DC] p-5 rounded-2xl border border-[#EDE6D8] space-y-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#194B35]" />
                <h4 className="font-bold text-sm text-gray-900">
                  {language === "ml" ? "ജനകീയ അഭിപ്രായങ്ങൾ (People's Voice)" : "Have Ideas for this Ward?"}
                </h4>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                {language === "ml"
                  ? "ഈ പ്രദേശത്തെ വികസനവുമായി ബന്ധപ്പെട്ട് പുതിയ നിർദ്ദേശങ്ങളോ മെച്ചപ്പെടുത്തലുകളോ ഉണ്ടെങ്കിൽ ജനകീയ ശബ്ദത്തിൽ സമർപ്പിക്കാം."
                  : "Submit your constructive community proposal for municipal review and rally neighborhood support."}
              </p>
              <Link
                href="/tanur/voice"
                className="w-full py-2 bg-[#194B35] hover:bg-[#143E2C] text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>{language === "ml" ? "നിർദ്ദേശം സമർപ്പിക്കുക" : "Submit Citizen Proposal"}</span>
              </Link>
            </div>

          </div>

        </div>

        {/* Data Sources Notice & Transparency Policy */}
        <DataSourcesNotice 
          language={language}
          title={language === "ml" ? "പദ്ധതി രേഖകൾ & ഓഡിറ്റ് സ്രോതസ്സുകൾ" : "Project Records & Audit Verification"}
          sources={[
            `${project.official_source_name} (${project.official_source_url})`,
            "Tanur Municipality Annual Plan & Budget Book (FY 2024–25)",
            "LSGD Engineering Wing Technical Sanction Records",
            "Measurement Book (MB) & Sulekha Monitoring Platform",
          ]}
        />
      </div>

      <BottomNav />
      <Footer />
    </div>
  );
}
