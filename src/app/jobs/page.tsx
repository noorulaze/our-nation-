"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { useLanguage } from "@/lib/i18n/context";
import { useAuth } from "@/lib/auth/context";
import { 
  jobStore, 
  TANUR_JOB_CATEGORIES, 
  JobOpportunity 
} from "@/lib/data/jobsData";
import {
  Briefcase,
  Search,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Banknote,
  Send,
  Plus,
  Filter,
  AlertCircle,
  Phone,
  Mail,
  ChevronRight,
  Sparkles,
  X,
  FileText
} from "lucide-react";

export default function JobsPage() {
  const { language } = useLanguage();
  const { user, role } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedJob, setSelectedJob] = useState<JobOpportunity | null>(null);

  // Apply Modal State
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applicantName, setApplicantName] = useState(user?.display_name || "");
  const [applicantPhone, setApplicantPhone] = useState(user?.phone || "");
  const [applicantNote, setApplicantNote] = useState("");
  const [applySuccess, setApplySuccess] = useState(false);

  // Post Job Modal State
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postTitleMl, setPostTitleMl] = useState("");
  const [postCompany, setPostCompany] = useState("");
  const [postCategory, setPostCategory] = useState("retail_commerce");
  const [postLocality, setPostLocality] = useState("Tanur Town Center");
  const [postSalary, setPostSalary] = useState("");
  const [postPhone, setPostPhone] = useState("");
  const [postDesc, setPostDesc] = useState("");
  const [postSuccess, setPostSuccess] = useState(false);

  const [jobsList, setJobsList] = useState<JobOpportunity[]>(() => jobStore.getJobs());

  const filteredJobs = useMemo(() => {
    return jobsList.filter((job) => {
      const matchCat = selectedCategory === "all" || job.category === selectedCategory;
      if (!matchCat) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          job.title.toLowerCase().includes(q) ||
          job.title_ml.includes(q) ||
          job.company.toLowerCase().includes(q) ||
          job.company_ml.includes(q) ||
          job.locality.toLowerCase().includes(q) ||
          job.locality_ml.includes(q)
        );
      }
      return true;
    });
  }, [jobsList, selectedCategory, searchQuery]);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;
    jobStore.incrementApplications(selectedJob.id);
    setJobsList([...jobStore.getJobs()]);
    setApplySuccess(true);
    setTimeout(() => {
      setApplySuccess(false);
      setIsApplyModalOpen(false);
      setSelectedJob(null);
      setApplicantNote("");
    }, 2000);
  };

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle || !postCompany || !postPhone) return;

    const catObj = TANUR_JOB_CATEGORIES.find(c => c.key === postCategory);

    const newJob = jobStore.addJob({
      title: postTitle,
      title_ml: postTitleMl || postTitle,
      company: postCompany,
      company_ml: postCompany,
      category: postCategory as any,
      category_ml: catObj?.name_ml || "തദ്ദേശീയ സേവനം",
      locality: postLocality,
      locality_ml: postLocality,
      job_type: "full_time",
      job_type_ml: "പൂർണ്ണസമയം",
      salary_range: postSalary || "ചർച്ച ചെയ്യാവുന്നത്",
      description: postDesc || "Verified job opening in Tanur Municipality.",
      description_ml: postDesc || "താനൂർ നഗരസഭയിലെ തൊഴിൽ അവസരം.",
      requirements: ["Relevant trade interest / experience"],
      requirements_ml: ["തൊഴിൽ താല്പര്യം / മുൻപരിചയം"],
      contact_person: postCompany,
      contact_phone: postPhone,
      is_verified_employer: role === "verified_org" || role === "admin",
    });

    setJobsList([newJob, ...jobsList]);
    setPostSuccess(true);
    setTimeout(() => {
      setPostSuccess(false);
      setIsPostModalOpen(false);
      setPostTitle("");
      setPostCompany("");
      setPostPhone("");
      setPostSalary("");
      setPostDesc("");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] pb-24">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: language === "ml" ? "ഹോം" : "Home", href: "/" },
            { label: language === "ml" ? "കണ്ടെത്തുക" : "Explore", href: "/explore" },
            { label: language === "ml" ? "തൊഴിലവസരങ്ങൾ (Jobs)" : "Jobs & Opportunities" },
          ]}
        />

        {/* Hero Banner */}
        <div className="bg-[#194B35] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-md">
          <div className="max-w-3xl space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
              <Briefcase className="w-3.5 h-3.5" />
              <span>{language === "ml" ? "താനൂർ തൊഴിൽ വേദി" : "Tanur Municipal Career Hub"}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-malayalam-heading">
              {language === "ml" ? "താനൂരിലെ തൊഴിലവസരങ്ങൾ & അപ്രന്റീസ്ഷിപ്പ്" : "Jobs & Local Career Opportunities"}
            </h1>
            <p className="text-white/80 text-xs sm:text-sm leading-relaxed max-w-2xl">
              {language === "ml"
                ? "താനൂർ നഗരസഭയിലെയും തിരൂർ താലൂക്കിലെയും സ്ഥിരീകരിച്ച വ്യാപാര സ്ഥാപനങ്ങൾ, ഹാർബർ സംരംഭങ്ങൾ, ക്ലിനിക്കുകൾ, വിദ്യാലയങ്ങൾ എന്നിവയിലെ തൊഴിൽ അവസരങ്ങൾ നേരിട്ട് കണ്ടെത്താം."
                : "Discover verified employment openings, skill apprenticeships, and local trade opportunities across Tanur Municipality directly from authentic employers."}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsPostModalOpen(true)}
                className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-[#143E2C] font-bold text-xs rounded-xl flex items-center gap-2 transition shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>{language === "ml" ? "തൊഴിൽ ഒഴിവ് രജിസ്റ്റർ ചെയ്യാം" : "Post a Job Opening"}</span>
              </button>

              <div className="inline-flex items-center gap-1.5 px-3 py-2 bg-white/10 rounded-xl text-[11px] text-white/90 border border-white/15">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{language === "ml" ? "മുൻകൂർ ഫീസ് നയമില്ല: സുരക്ഷിത തദ്ദേശീയ തൊഴിൽ" : "Zero Registration Fee Policy"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="bg-white rounded-2xl border border-[#EDE6D8] p-4 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === "ml" ? "ജോലി, സ്ഥാപനം, പ്രദേശം എന്നിവ തിരയുക..." : "Search job title, firm or locality..."}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-gray-200 bg-[#FAF7F0] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#194B35]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="text-xs font-bold text-[#5C6A64] shrink-0">
              {language === "ml" ? `ലഭ്യമായ ഒഴിവുകൾ: ${filteredJobs.length}` : `${filteredJobs.length} Positions Available`}
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {TANUR_JOB_CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3 py-1.5 rounded-lg font-bold transition whitespace-nowrap ${
                  selectedCategory === cat.key
                    ? "bg-[#194B35] text-white shadow-xs"
                    : "bg-[#FAF7F0] text-gray-600 hover:bg-gray-200"
                }`}
              >
                {language === "ml" ? cat.name_ml : cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Job Listings Grid */}
        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-3xl border border-dashed border-[#EDE6D8] p-12 text-center max-w-xl mx-auto space-y-3">
            <Briefcase className="w-12 h-12 text-gray-300 mx-auto" />
            <h3 className="text-base font-bold text-gray-800">
              {language === "ml" ? "ഒഴിവുകൾ കണ്ടെത്തിയില്ല" : "No Positions Found"}
            </h3>
            <p className="text-xs text-gray-500">
              {language === "ml"
                ? "നിങ്ങൾ തിരഞ്ഞ മാനദണ്ഡങ്ങൾക്ക് അനുയോജ്യമായ ഒഴിവുകൾ നിലവിലില്ല. ഫിൽട്ടറുകൾ മാറ്റി പരിശോധിക്കുക."
                : "No job postings matched your current search criteria. Try clearing the filter."}
            </p>
            <button
              onClick={() => { setSelectedCategory("all"); setSearchQuery(""); }}
              className="px-4 py-2 bg-[#194B35] text-white text-xs font-bold rounded-xl hover:bg-[#143E2C] transition"
            >
              {language === "ml" ? "ഫിൽട്ടറുകൾ റീസെറ്റ് ചെയ്യുക" : "Reset Filters"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl border border-[#EDE6D8] p-5 shadow-xs hover:shadow-md hover:border-[#194B35] transition flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Category & Verified Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#FAF7F0] text-[#194B35] border border-[#EDE6D8]">
                      {language === "ml" ? job.category_ml : job.category}
                    </span>
                    {job.is_verified_employer && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <ShieldCheck className="w-3 h-3" />
                        <span>{language === "ml" ? "സ്ഥിരീകരിച്ച തൊഴിലുടമ" : "Verified Firm"}</span>
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-[#194B35] font-malayalam-heading">
                      {language === "ml" ? job.title_ml : job.title}
                    </h3>
                    <p className="text-xs font-semibold text-gray-700 flex items-center gap-1.5 mt-1">
                      <Building2 className="w-3.5 h-3.5 text-[#C39A5B]" />
                      <span>{language === "ml" ? job.company_ml : job.company}</span>
                    </p>
                  </div>

                  {/* Locality & Type */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 pt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#194B35]" />
                      {language === "ml" ? job.locality_ml : job.locality}
                      {job.ward_number ? ` (വാർഡ് ${job.ward_number})` : ""}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-600" />
                      {language === "ml" ? job.job_type_ml : job.job_type}
                    </span>
                  </div>

                  {/* Salary Range */}
                  <div className="bg-[#FAF7F0] p-2.5 rounded-xl border border-[#EDE6D8] text-xs">
                    <span className="text-[10px] text-gray-400 block uppercase font-bold">
                      {language === "ml" ? "വേതനം / ശമ്പള പരിധി" : "Salary / Compensation"}
                    </span>
                    <span className="font-extrabold text-[#194B35]">{job.salary_range}</span>
                  </div>

                  <p className="text-xs text-[#5C6A64] line-clamp-2 leading-relaxed">
                    {language === "ml" ? job.description_ml : job.description}
                  </p>
                </div>

                {/* Card Actions */}
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400">
                    {language === "ml" ? `${job.applications_count} അപേക്ഷകൾ` : `${job.applications_count} applied`}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => { setSelectedJob(job); setIsApplyModalOpen(true); }}
                      className="px-3.5 py-1.5 bg-[#194B35] hover:bg-[#143E2C] text-white text-xs font-bold rounded-xl transition flex items-center gap-1"
                    >
                      <Send className="w-3 h-3" />
                      <span>{language === "ml" ? "അപേക്ഷിക്കുക" : "Apply"}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* APPLY MODAL */}
      {isApplyModalOpen && selectedJob && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-[#EDE6D8]">
            <button
              onClick={() => setIsApplyModalOpen(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C39A5B]">
                  {language === "ml" ? "തൊഴിൽ അപേക്ഷ" : "Job Application"}
                </span>
                <h3 className="text-lg font-bold text-[#194B35] font-malayalam-heading">
                  {language === "ml" ? selectedJob.title_ml : selectedJob.title}
                </h3>
                <p className="text-xs text-gray-500">{selectedJob.company} • {selectedJob.locality}</p>
              </div>

              {applySuccess ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <p className="font-bold text-emerald-800 text-sm">
                    {language === "ml" ? "അപേക്ഷ വിജയകരമായി സമർപ്പിച്ചു!" : "Application Submitted Successfully!"}
                  </p>
                  <p className="text-xs text-emerald-700">
                    {language === "ml" ? `സ്ഥാപനം നിങ്ങളെ ${selectedJob.contact_phone} വഴി ബന്ധപ്പെടുന്നതാണ്.` : `The employer will review your details and contact you.`}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleApply} className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      {language === "ml" ? "നിങ്ങളുടെ പേര്" : "Full Name"} *
                    </label>
                    <input
                      type="text"
                      required
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-[#FAF7F0] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#194B35]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      {language === "ml" ? "മൊബൈൽ നമ്പർ" : "Mobile Phone"} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-[#FAF7F0] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#194B35]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      {language === "ml" ? "വിദ്യാഭ്യാസം / മുൻപരിചയം" : "Experience or Note"}
                    </label>
                    <textarea
                      rows={3}
                      value={applicantNote}
                      onChange={(e) => setApplicantNote(e.target.value)}
                      placeholder={language === "ml" ? "നിങ്ങളുടെ യോഗ്യതകളും താൽപ്പര്യവും ചുരുക്കമായി രേഖപ്പെടുത്തുക..." : "Brief summary of your qualification or experience..."}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-[#FAF7F0] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#194B35]"
                    />
                  </div>

                  <div className="bg-[#FAF7F0] p-3 rounded-xl border border-[#EDE6D8] text-[11px] text-gray-600 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-[#194B35]">
                      <Phone className="w-3.5 h-3.5" />
                      <span>{language === "ml" ? "നേരിട്ടുള്ള നമ്പർ:" : "Direct Contact:"} {selectedJob.contact_phone}</span>
                    </div>
                    <p className="text-[10px] text-gray-500">
                      {language === "ml" ? "താനൂർ സിവിക് ചട്ടപ്രകാരം തൊഴിലിനായി യാതൊരുവിധ നിക്ഷേപവും നൽകേണ്ടതില്ല." : "Never pay any registration fee for job offers."}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsApplyModalOpen(false)}
                      className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-50"
                    >
                      {language === "ml" ? "റദ്ദാക്കുക" : "Cancel"}
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#194B35] text-white rounded-xl text-xs font-bold hover:bg-[#143E2C] transition flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{language === "ml" ? "അപേക്ഷ അയക്കുക" : "Submit Application"}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* POST JOB MODAL */}
      {isPostModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative border border-[#EDE6D8] max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsPostModalOpen(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C39A5B]">
                  {language === "ml" ? "തൊഴിലുടമകൾക്കായി" : "For Employers & Businesses"}
                </span>
                <h3 className="text-lg font-bold text-[#194B35] font-malayalam-heading">
                  {language === "ml" ? "പുതിയ തൊഴിൽ ഒഴിവ് രജിസ്റ്റർ ചെയ്യുക" : "Register a New Job Opening"}
                </h3>
              </div>

              {postSuccess ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <p className="font-bold text-emerald-800 text-sm">
                    {language === "ml" ? "തൊഴിൽ ഒഴിവ് വിജയകരമായി പ്രസിദ്ധീകരിച്ചു!" : "Job Opening Posted Successfully!"}
                  </p>
                </div>
              ) : (
                <form onSubmit={handlePostJob} className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      {language === "ml" ? "തൊഴിൽ പദവി (Job Title)" : "Job Title"} *
                    </label>
                    <input
                      type="text"
                      required
                      value={postTitle}
                      onChange={(e) => setPostTitle(e.target.value)}
                      placeholder="e.g. Sales Executive / Driver / Accountant"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-[#FAF7F0] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#194B35]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      {language === "ml" ? "സ്ഥാപനത്തിന്റെ പേര്" : "Company / Business Name"} *
                    </label>
                    <input
                      type="text"
                      required
                      value={postCompany}
                      onChange={(e) => setPostCompany(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-[#FAF7F0] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#194B35]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">
                        {language === "ml" ? "വിഭാഗം" : "Category"}
                      </label>
                      <select
                        value={postCategory}
                        onChange={(e) => setPostCategory(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-[#FAF7F0] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#194B35]"
                      >
                        {TANUR_JOB_CATEGORIES.filter(c => c.key !== "all").map(c => (
                          <option key={c.key} value={c.key}>
                            {language === "ml" ? c.name_ml : c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">
                        {language === "ml" ? "പ്രദേശം" : "Locality"}
                      </label>
                      <input
                        type="text"
                        value={postLocality}
                        onChange={(e) => setPostLocality(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-[#FAF7F0] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#194B35]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">
                        {language === "ml" ? "ശമ്പളം / വേതനം" : "Salary Range"}
                      </label>
                      <input
                        type="text"
                        value={postSalary}
                        onChange={(e) => setPostSalary(e.target.value)}
                        placeholder="e.g. ₹15,000 - ₹20,000"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-[#FAF7F0] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#194B35]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">
                        {language === "ml" ? "ബന്ധപ്പെടേണ്ട നമ്പർ" : "Contact Phone"} *
                      </label>
                      <input
                        type="tel"
                        required
                        value={postPhone}
                        onChange={(e) => setPostPhone(e.target.value)}
                        placeholder="0494..."
                        className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-[#FAF7F0] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#194B35]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      {language === "ml" ? "ജോലി വിവരണം" : "Description"}
                    </label>
                    <textarea
                      rows={3}
                      value={postDesc}
                      onChange={(e) => setPostDesc(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-[#FAF7F0] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#194B35]"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsPostModalOpen(false)}
                      className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-50"
                    >
                      {language === "ml" ? "റദ്ദാക്കുക" : "Cancel"}
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#194B35] text-white rounded-xl text-xs font-bold hover:bg-[#143E2C] transition flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{language === "ml" ? "ഒഴിവ് പ്രസിദ്ധീകരിക്കുക" : "Publish Listing"}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      <BottomNav />
      <Footer />
    </div>
  );
}
