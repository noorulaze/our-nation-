"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { TanurNav } from "@/components/tanur/TanurNav";
import { useLanguage } from "@/lib/i18n/context";
import { useAuth } from "@/lib/auth/context";
import { digitalMunicipalityStore, TANUR_MUNICIPAL_WARDS } from "@/lib/data/digitalMunicipalityData";
import { CitizenProposal, ProposalCategory, ProposalStatus } from "@/types/digitalMunicipality";
import { 
  Users, 
  Search, 
  Filter, 
  ThumbsUp, 
  MessageSquare, 
  Plus, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  X, 
  Send,
  Building,
  AlertCircle,
  HelpCircle,
  HeartHandshake,
  Check,
  ArrowRight
} from "lucide-react";

export default function PeoplesVoicePage() {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [proposals, setProposals] = useState<CitizenProposal[]>(() => digitalMunicipalityStore.getProposals());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ProposalCategory | "all">("all");
  const [selectedStatus, setSelectedStatus] = useState<ProposalStatus | "all">("all");
  const [selectedWard, setSelectedWard] = useState<number>(0);

  // Proposal submission modal
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formTitleMl, setFormTitleMl] = useState("");
  const [formSummary, setFormSummary] = useState("");
  const [formSummaryMl, setFormSummaryMl] = useState("");
  const [formDetails, setFormDetails] = useState("");
  const [formCategory, setFormCategory] = useState<ProposalCategory>("infrastructure");
  const [formWard, setFormWard] = useState<number>(1);
  const [formLocality, setFormLocality] = useState("");
  const [authorName, setAuthorName] = useState(user?.display_name || "Tanur Resident (താനൂർ നിവാസി)");
  const [feedback, setFeedback] = useState<string | null>(null);

  // Comment expansion state
  const [expandedCommentsId, setExpandedCommentsId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");

  const categories: { slug: ProposalCategory | "all"; name: string; name_ml: string }[] = [
    { slug: "all", name: "All Categories", name_ml: "എല്ലാ വിഭാഗങ്ങളും" },
    { slug: "infrastructure", name: "Infrastructure & Energy", name_ml: "അടിസ്ഥാന സൗകര്യം" },
    { slug: "roads_traffic", name: "Roads & Traffic", name_ml: "റോഡും ഗതാഗതവും" },
    { slug: "waste_cleanliness", name: "Waste & Cleanliness", name_ml: "മാലിന്യ സംസ്കരണവും ശുചിത്വവും" },
    { slug: "youth_sports", name: "Youth & Sports", name_ml: "കായികവും യുവജനക്ഷേമവും" },
    { slug: "women_welfare", name: "Women Welfare & Skills", name_ml: "വനിതാ ക്ഷേമം" },
    { slug: "fisheries_coastal", name: "Fisheries & Coastal", name_ml: "മത്സ്യബന്ധനവും തീരദേശവും" },
    { slug: "heritage_tourism", name: "Heritage & Tourism", name_ml: "പൈതൃകവും വിനോദസഞ്ചാരവും" },
    { slug: "education_skills", name: "Education & Skills", name_ml: "വിദ്യാഭ്യാസവും തൊഴിലും" },
  ];

  const statuses: { slug: ProposalStatus | "all"; name: string; name_ml: string }[] = [
    { slug: "all", name: "All Statuses", name_ml: "എല്ലാം" },
    { slug: "submitted", name: "Submitted", name_ml: "സമർപ്പിച്ചത്" },
    { slug: "community_supported", name: "Community Supported", name_ml: "കമ്യൂണിറ്റി പിന്തുണ നേടിയത്" },
    { slug: "under_municipal_review", name: "Under Review", name_ml: "നഗരസഭാ അവലോകനത്തിൽ" },
    { slug: "feasibility_study", name: "Feasibility Study", name_ml: "സാധ്യത പരിശോധന" },
    { slug: "budget_allocated", name: "Budget Allocated", name_ml: "നടപടി സ്വീകരിച്ചവ" },
  ];

  const filteredProposals = useMemo(() => {
    return proposals.filter((p) => {
      if (selectedCategory !== "all" && p.category !== selectedCategory) return false;
      if (selectedStatus !== "all" && p.status !== selectedStatus) return false;
      if (selectedWard > 0 && p.ward_number !== selectedWard) return false;
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.title_ml.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          p.summary_ml.toLowerCase().includes(q) ||
          p.locality.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [proposals, selectedCategory, selectedStatus, selectedWard, searchTerm]);

  const handleSupportToggle = (id: string) => {
    const res = digitalMunicipalityStore.toggleProposalSupport(id);
    if (res) {
      setProposals([...digitalMunicipalityStore.getProposals()]);
    }
  };

  const handleAddComment = (proposalId: string) => {
    if (!commentText.trim()) return;
    digitalMunicipalityStore.addProposalComment(proposalId, {
      author_id: user?.id || "guest",
      author_name: user?.display_name || "Tanur Resident",
      content: commentText.trim(),
      is_official: user?.role === "admin" || user?.role === "moderator",
    });
    setCommentText("");
    setProposals([...digitalMunicipalityStore.getProposals()]);
  };

  const handleSubmitProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() && !formTitleMl.trim()) return;

    const catObj = categories.find(c => c.slug === formCategory);
    const wardObj = TANUR_MUNICIPAL_WARDS.find(w => w.ward_number === formWard);

    digitalMunicipalityStore.addProposal({
      municipality_id: "40000000-0000-0000-0000-000000000007",
      author_id: user?.id || "usr-" + Date.now(),
      author_name: authorName.trim() || "Tanur Resident",
      ward_number: formWard,
      locality: formLocality.trim() || wardObj?.name || "Tanur",
      locality_ml: formLocality.trim() || wardObj?.name_ml || "താനൂർ",
      title: formTitle.trim() || formTitleMl.trim(),
      title_ml: formTitleMl.trim() || formTitle.trim(),
      summary: formSummary.trim() || formSummaryMl.trim(),
      summary_ml: formSummaryMl.trim() || formSummary.trim(),
      details: formDetails.trim() || formSummary.trim(),
      details_ml: formDetails.trim() || formSummaryMl.trim(),
      category: formCategory,
      category_name: catObj?.name || "General Infrastructure",
      category_name_ml: catObj?.name_ml || "പൊതു വികസനം",
    });

    setProposals([...digitalMunicipalityStore.getProposals()]);
    setIsSubmitOpen(false);
    setFormTitle("");
    setFormTitleMl("");
    setFormSummary("");
    setFormSummaryMl("");
    setFormDetails("");
    setFeedback("നിങ്ങളുടെ നിർദ്ദേശം വിജയകരമായി സമർപ്പിച്ചു. കമ്യൂണിറ്റി പിന്തുണയ്ക്കായി പോർട്ടലിൽ ലഭ്യമാണ്.");
    setTimeout(() => setFeedback(null), 4000);
  };

  // Status badge styling helper
  const renderStatusBadge = (status: ProposalStatus) => {
    switch (status) {
      case "budget_allocated":
        return (
          <span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>{language === "ml" ? "നടപടി സ്വീകരിച്ചു" : "Budget Allocated"}</span>
          </span>
        );
      case "feasibility_study":
        return (
          <span className="bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1">
            <Clock className="w-3 h-3 text-purple-600" />
            <span>{language === "ml" ? "സാധ്യത പരിശോധന" : "Feasibility Study"}</span>
          </span>
        );
      case "under_municipal_review":
        return (
          <span className="bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1">
            <Building className="w-3 h-3 text-blue-600" />
            <span>{language === "ml" ? "നഗരസഭാ അവലോകനത്തിൽ" : "Under Review"}</span>
          </span>
        );
      case "community_supported":
        return (
          <span className="bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-amber-600" />
            <span>{language === "ml" ? "കമ്യൂണിറ്റി പിന്തുണ നേടിയത്" : "Community Supported"}</span>
          </span>
        );
      default:
        return (
          <span className="bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1">
            <Clock className="w-3 h-3 text-gray-500" />
            <span>{language === "ml" ? "സമർപ്പിച്ചത്" : "Submitted"}</span>
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] pb-24">
      <Navbar />
      <TanurNav />

      {/* Flagship People's Voice Link Banner */}
      <div className="bg-[#FAF4E6] border-b border-[#DDD3BF] py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#194B35] animate-pulse" />
            <span className="font-bold text-[#194B35]">
              {language === "ml"
                ? "വിപുലീകരിച്ച ജനകീയ ശബ്ദം പ്ലാറ്റ്‌ഫോം ഇപ്പോൾ ലഭ്യമാണ്:"
                : "The Full People's Voice Citizen Participation Ecosystem is now live:"}
            </span>
            <span className="text-[#5C6A64]">
              {language === "ml" ? "ആശയങ്ങൾ, ചർച്ചകൾ, സന്നദ്ധ കൂട്ടായ്മകൾ" : "Ideas, Discussions, Local Initiatives"}
            </span>
          </div>
          <Link
            href="/peoples-voice"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#194B35] text-white font-bold hover:bg-[#143E2C] transition shrink-0"
          >
            <span>{language === "ml" ? "ജനകീയ ശബ്ദം സന്ദർശിക്കാം" : "Visit People's Voice Hub"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Hero Section — People-Powered Tanur */}
      <div className="bg-[#194B35] text-white py-10 px-4 border-b border-[#143E2C]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 px-3.5 py-1 rounded-full text-xs font-bold">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>{language === "ml" ? "ജനകീയ താനൂർ • പില്ലർ സി (People-Powered Tanur)" : "People-Powered Tanur • Pillar C"}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                {language === "ml" ? "ജനകീയ ശബ്ദം (People's Voice)" : "People's Voice Platform"}
              </h1>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                {language === "ml"
                  ? "താനൂർ നഗരസഭയുടെ വികസനത്തിൽ പൗരന്മാർക്ക് നേരിട്ട് പങ്കാളികളാകാം. വാർഡുകളിലെ ആവശ്യങ്ങൾ നിർദ്ദേശങ്ങളായി സമർപ്പിക്കുക, മറ്റുള്ളവരുടെ നിർദ്ദേശങ്ങളെ പിന്തുണയ്ക്കുക, നഗരസഭയുടെ ഔദ്യോഗിക പ്രതികരണങ്ങൾ അറിയുക."
                  : "Empowering residents to propose community ideas, rally neighborhood support, participate in constructive consultations, and track municipal action."}
              </p>
            </div>

            <button
              onClick={() => setIsSubmitOpen(true)}
              className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-[#143E2C] rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition shadow-md w-fit"
            >
              <Plus className="w-4 h-4" />
              <span>{language === "ml" ? "നിർദ്ദേശം സമർപ്പിക്കുക" : "Submit New Proposal"}</span>
            </button>
          </div>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-6 border-t border-white/15">
            <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-xl border border-white/10">
              <span className="text-[11px] text-white/70 block uppercase font-bold tracking-wider">
                {language === "ml" ? "ആകെ നിർദ്ദേശങ്ങൾ" : "Total Proposals"}
              </span>
              <p className="text-2xl font-black text-white mt-1">{proposals.length}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-xl border border-white/10">
              <span className="text-[11px] text-white/70 block uppercase font-bold tracking-wider">
                {language === "ml" ? "കമ്യൂണിറ്റി പിന്തുണ നേടിയവ" : "Community Backed"}
              </span>
              <p className="text-2xl font-black text-amber-300 mt-1">
                {proposals.filter(p => p.status === "community_supported" || p.support_count >= 50).length}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-xl border border-white/10">
              <span className="text-[11px] text-white/70 block uppercase font-bold tracking-wider">
                {language === "ml" ? "നഗരസഭാ അവലോകനത്തിൽ" : "Under Council Review"}
              </span>
              <p className="text-2xl font-black text-blue-300 mt-1">
                {proposals.filter(p => p.status === "under_municipal_review" || p.status === "feasibility_study").length}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-xl border border-white/10">
              <span className="text-[11px] text-white/70 block uppercase font-bold tracking-wider">
                {language === "ml" ? "നടപടിയായവ / ബജറ്റ് ചെയ്തവ" : "Action Initiated"}
              </span>
              <p className="text-2xl font-black text-emerald-300 mt-1">
                {proposals.filter(p => p.status === "budget_allocated").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Feedback Alert Toast */}
        {feedback && (
          <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center justify-between shadow-xs animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{feedback}</span>
            </div>
            <button onClick={() => setFeedback(null)} className="text-gray-400 hover:text-gray-700">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Community Consultation & Anti-Abuse Safeguard Banner */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-gray-700">
            <ShieldCheck className="w-5 h-5 text-[#194B35] shrink-0" />
            <div>
              <span className="font-bold text-gray-900 block">
                {language === "ml" ? "ജനാധിപത്യ പങ്കാളിത്ത മാർഗ്ഗനിർദ്ദേശങ്ങൾ" : "Democratic Participation Guidelines"}
              </span>
              <span className="text-gray-500 text-[11px]">
                {language === "ml"
                  ? "ജനകീയ നിർദ്ദേശങ്ങൾ നഗരസഭയുടെ ആലോചനാ സമിതികളുടെ ശ്രദ്ധയിൽപ്പെടുത്തുന്നതിനുള്ളതാണ്. അസഭ്യമായ ഉള്ളടക്കങ്ങൾ, അനാവശ്യ സ്പാം എന്നിവ ഫിൽട്ടർ ചെയ്യപ്പെടും."
                  : "Community suggestions inform municipal priorities. Unofficial proposals are clearly distinguished from municipal council resolutions."}
              </span>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <Link
              href="/tanur/development"
              className="px-3 py-1.5 bg-[#FAF7F0] hover:bg-gray-100 text-[#194B35] rounded-lg font-bold transition flex items-center gap-1"
            >
              <span>{language === "ml" ? "വികസന ട്രാക്കർ" : "Projects Tracker"}</span>
            </Link>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-3">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={language === "ml" ? "നിർദ്ദേശങ്ങളുടെ തലക്കെട്ട്, പ്രദേശം എന്നിവ തിരയുക..." : "Search proposals by title, locality..."}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#194B35] outline-none"
              />
            </div>

            <select
              value={selectedWard}
              onChange={(e) => setSelectedWard(Number(e.target.value))}
              className="px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs bg-white focus:ring-2 focus:ring-[#194B35] outline-none"
            >
              <option value={0}>{language === "ml" ? "എല്ലാ വാർഡുകളും (44 Wards)" : "All 44 Municipal Wards"}</option>
              {TANUR_MUNICIPAL_WARDS.map((w) => (
                <option key={w.id} value={w.ward_number}>
                  {language === "ml" ? `വാർഡ് ${w.ward_number}: ${w.name_ml}` : `Ward ${w.ward_number}: ${w.name}`}
                </option>
              ))}
            </select>
          </div>

          {/* Status Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className="font-bold text-gray-500 mr-1 shrink-0">{language === "ml" ? "ഘട്ടം:" : "Lifecycle:"}</span>
            {statuses.map((st) => (
              <button
                key={st.slug}
                onClick={() => setSelectedStatus(st.slug)}
                className={`px-3 py-1.5 rounded-lg font-bold transition whitespace-nowrap ${
                  selectedStatus === st.slug
                    ? "bg-[#194B35] text-white shadow-xs"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {language === "ml" ? st.name_ml : st.name}
              </button>
            ))}
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className="font-bold text-gray-500 mr-1 shrink-0">{language === "ml" ? "വിഭാഗം:" : "Category:"}</span>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3 py-1.5 rounded-lg font-medium transition whitespace-nowrap ${
                  selectedCategory === cat.slug
                    ? "bg-[#C39A5B] text-white font-bold shadow-xs"
                    : "bg-[#FAF7F0] text-gray-600 hover:bg-gray-200"
                }`}
              >
                {language === "ml" ? cat.name_ml : cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Proposals List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-gray-500 font-bold px-1">
            <span>{language === "ml" ? `ലഭ്യമായ നിർദ്ദേശങ്ങൾ: ${filteredProposals.length}` : `Showing ${filteredProposals.length} Proposals`}</span>
            <span>{language === "ml" ? "ഏറ്റവും കൂടുതൽ പിന്തുണ ലഭിച്ചവ ആദ്യം" : "Ranked by Community Backing"}</span>
          </div>

          {filteredProposals.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center">
              <Users className="w-10 h-10 text-gray-400 mx-auto mb-2" />
              <h3 className="text-base font-bold text-gray-800">
                {language === "ml" ? "നിർദ്ദേശങ്ങൾ ഒന്നും കണ്ടെത്തിയില്ല" : "No Proposals Found"}
              </h3>
              <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                {language === "ml" ? "നിങ്ങളുടെ വാർഡിനായി ആദ്യ നിർദ്ദേശം സമർപ്പിക്കൂ." : "Be the first to submit a proposal for this category or ward."}
              </p>
              <button
                onClick={() => setIsSubmitOpen(true)}
                className="mt-4 px-4 py-2 bg-[#194B35] text-white rounded-xl text-xs font-bold hover:bg-[#143E2C] transition"
              >
                {language === "ml" ? "നിർദ്ദേശം സമർപ്പിക്കുക" : "Submit Proposal"}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProposals.map((proposal) => {
                const isExpanded = expandedCommentsId === proposal.id;

                return (
                  <div
                    key={proposal.id}
                    className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs hover:shadow-md transition space-y-4"
                  >
                    {/* Header Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
                      <div className="flex flex-wrap items-center gap-2">
                        {renderStatusBadge(proposal.status)}
                        <span className="text-[11px] font-mono font-bold text-gray-400">
                          {proposal.tracking_id}
                        </span>
                        <span className="text-gray-300">•</span>
                        <span className="text-xs font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                          {language === "ml" ? proposal.category_name_ml : proposal.category_name}
                        </span>
                      </div>

                      <div className="text-[11px] text-gray-400 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#194B35]" />
                        <span>
                          {proposal.ward_number ? `${language === "ml" ? "വാർഡ്" : "Ward"} ${proposal.ward_number}: ` : ""}
                          {language === "ml" ? proposal.locality_ml : proposal.locality}
                        </span>
                      </div>
                    </div>

                    {/* Proposal Title & Summary */}
                    <div className="space-y-1.5">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
                        {language === "ml" ? proposal.title_ml : proposal.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                        {language === "ml" ? proposal.summary_ml : proposal.summary}
                      </p>

                      <p className="text-xs text-gray-500 leading-relaxed pt-1">
                        {language === "ml" ? proposal.details_ml : proposal.details}
                      </p>
                    </div>

                    {/* Official Municipal Response Box (if present) */}
                    {proposal.official_response && (
                      <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3.5 space-y-1 text-xs">
                        <div className="flex items-center justify-between text-emerald-950 font-bold">
                          <span className="flex items-center gap-1.5">
                            <Building className="w-4 h-4 text-emerald-700" />
                            {language === "ml" ? "നഗരസഭാ ഔദ്യോഗിക പ്രതികരണം:" : "Official Municipal Response:"}
                          </span>
                          <span className="text-[11px] text-emerald-700 font-mono">
                            {proposal.official_response_date}
                          </span>
                        </div>
                        <p className="text-emerald-900 leading-relaxed">
                          {proposal.official_response}
                        </p>
                        {proposal.official_responder_name && (
                          <div className="text-[11px] text-emerald-700 pt-0.5">
                            — <span className="font-bold">{proposal.official_responder_name}</span> ({proposal.official_responder_role})
                          </div>
                        )}
                      </div>
                    )}

                    {/* Action Row: Support Counter, Author, and Comments Toggle */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-gray-100">
                      
                      {/* Author Info */}
                      <div className="text-xs text-gray-500 flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#194B35]/10 text-[#194B35] font-bold flex items-center justify-center text-xs">
                          {proposal.author_name[0]}
                        </div>
                        <div>
                          <span className="font-bold text-gray-800 block">{proposal.author_name}</span>
                          <span className="text-[10px] text-gray-400">
                            {new Date(proposal.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      {/* Interactive Buttons */}
                      <div className="flex items-center gap-2">
                        {/* Support / Upvote Button */}
                        <button
                          onClick={() => handleSupportToggle(proposal.id)}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition active:scale-95 shadow-xs ${
                            proposal.supported_by_user
                              ? "bg-[#194B35] text-white"
                              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                          }`}
                        >
                          <ThumbsUp className={`w-3.5 h-3.5 ${proposal.supported_by_user ? "fill-white" : ""}`} />
                          <span>{language === "ml" ? "പിന്തുണയ്ക്കുക" : "Support"}</span>
                          <span className="ml-1 px-1.5 py-0.2 bg-black/10 rounded-full text-[10px]">
                            {proposal.support_count}
                          </span>
                        </button>

                        {/* Comments Toggle */}
                        <button
                          onClick={() => setExpandedCommentsId(isExpanded ? null : proposal.id)}
                          className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold flex items-center gap-1.5 transition"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-gray-500" />
                          <span>{proposal.comments_count}</span>
                        </button>
                      </div>

                    </div>

                    {/* Expanded Discussion / Comments Panel */}
                    {isExpanded && (
                      <div className="pt-3 border-t border-gray-100 space-y-3">
                        <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                          {language === "ml" ? "പൗര ചർച്ചകൾ & അഭിപ്രായങ്ങൾ" : "Citizen Discussion"}
                        </h4>

                        {proposal.comments.length === 0 ? (
                          <p className="text-xs text-gray-400 italic">
                            {language === "ml" ? "ആദ്യ അഭിപ്രായം രേഖപ്പെടുത്തൂ." : "No comments yet. Share your thoughts."}
                          </p>
                        ) : (
                          <div className="space-y-2">
                            {proposal.comments.map((comm) => (
                              <div key={comm.id} className="p-2.5 rounded-lg bg-gray-50 text-xs space-y-0.5 border border-gray-100">
                                <div className="flex items-center justify-between">
                                  <span className={`font-bold ${comm.is_official ? "text-emerald-800" : "text-gray-800"}`}>
                                    {comm.author_name} {comm.is_official && `(${comm.official_designation || "Municipal Authority"})`}
                                  </span>
                                  <span className="text-[10px] text-gray-400">
                                    {new Date(comm.created_at).toLocaleDateString()}
                                  </span>
                                </div>
                                <p className="text-gray-700">{comm.content}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Comment Input */}
                        <div className="flex items-center gap-2 pt-1">
                          <input
                            type="text"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder={language === "ml" ? "നിങ്ങളുടെ അഭിപ്രായം രേഖപ്പെടുത്തുക..." : "Add your constructive comment..."}
                            className="flex-1 p-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#194B35] outline-none"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handleAddComment(proposal.id);
                              }
                            }}
                          />
                          <button
                            onClick={() => handleAddComment(proposal.id)}
                            className="px-3.5 py-2 bg-[#194B35] text-white rounded-lg text-xs font-bold hover:bg-[#143E2C] transition flex items-center gap-1"
                          >
                            <Send className="w-3 h-3" />
                            <span>{language === "ml" ? "പോസ്റ്റ്" : "Post"}</span>
                          </button>
                        </div>
                      </div>
                    )}

                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>

      {/* ======================================================== */}
      {/* SUBMISSION MODAL (നിർദ്ദേശം സമർപ്പിക്കുക) */}
      {/* ======================================================== */}
      {isSubmitOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 p-6 space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-[#194B35]" />
                <h3 className="text-lg font-bold text-gray-900">
                  {language === "ml" ? "ജനകീയ വികസന നിർദ്ദേശം സമർപ്പിക്കുക" : "Submit Citizen Proposal"}
                </h3>
              </div>
              <button onClick={() => setIsSubmitOpen(false)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitProposal} className="space-y-3 text-xs">
              
              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  {language === "ml" ? "നിർദ്ദേശത്തിന്റെ തലക്കെട്ട് (മലയാളം അല്ലെങ്കിൽ ഇംഗ്ലീഷ്): *" : "Proposal Title: *"}
                </label>
                <input
                  type="text"
                  required
                  value={formTitleMl}
                  onChange={(e) => setFormTitleMl(e.target.value)}
                  placeholder={language === "ml" ? "ഉദാ: താനൂർ ബീച്ച് നടപ്പാതയിൽ സോളാർ ലൈറ്റുകൾ സ്ഥാപിക്കുക" : "e.g., Solar street lighting along beach walkway"}
                  className="w-full p-2.5 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#194B35]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">
                    {language === "ml" ? "വിഭാഗം (Category):" : "Category:"}
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as ProposalCategory)}
                    className="w-full p-2.5 rounded-lg border border-gray-300 text-xs bg-white focus:ring-2 focus:ring-[#194B35]"
                  >
                    {categories.filter(c => c.slug !== "all").map(c => (
                      <option key={c.slug} value={c.slug}>
                        {language === "ml" ? c.name_ml : c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">
                    {language === "ml" ? "വാർഡ് (44 വാർഡുകളിൽ ഒന്ന്):" : "Select Ward (1-44):"}
                  </label>
                  <select
                    value={formWard}
                    onChange={(e) => setFormWard(Number(e.target.value))}
                    className="w-full p-2.5 rounded-lg border border-gray-300 text-xs bg-white focus:ring-2 focus:ring-[#194B35]"
                  >
                    {TANUR_MUNICIPAL_WARDS.map(w => (
                      <option key={w.id} value={w.ward_number}>
                        {language === "ml" ? `വാർഡ് ${w.ward_number}: ${w.name_ml}` : `Ward ${w.ward_number}: ${w.name}`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  {language === "ml" ? "പ്രദേശം / ലൊക്കേഷൻ:" : "Specific Locality / Landmark:"}
                </label>
                <input
                  type="text"
                  value={formLocality}
                  onChange={(e) => setFormLocality(e.target.value)}
                  placeholder={language === "ml" ? "ഉദാ: ഫിഷറീസ് സ്കൂൾ പരിസരം, ബീച്ച് റോഡ്" : "e.g., Near Fisheries School, Beach Road"}
                  className="w-full p-2.5 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#194B35]"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  {language === "ml" ? "ലഘു വിവരണം (Summary): *" : "Brief Summary: *"}
                </label>
                <textarea
                  rows={2}
                  required
                  value={formSummaryMl}
                  onChange={(e) => setFormSummaryMl(e.target.value)}
                  placeholder={language === "ml" ? "ഈ നിർദ്ദേശം താനൂരിന് എന്ത് ഗുണം ചെയ്യും?" : "How does this benefit the community?"}
                  className="w-full p-2.5 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#194B35]"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  {language === "ml" ? "വിശദാംശങ്ങൾ (Details / Action Plan):" : "Detailed Proposal:"}
                </label>
                <textarea
                  rows={3}
                  value={formDetails}
                  onChange={(e) => setFormDetails(e.target.value)}
                  placeholder={language === "ml" ? "സാങ്കേതിക നിർദ്ദേശങ്ങൾ, വിശദ വിവരങ്ങൾ..." : "Details, potential location benefits, and implementation ideas..."}
                  className="w-full p-2.5 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#194B35]"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  {language === "ml" ? "നിങ്ങളുടെ പേര്:" : "Your Name / Organization:"}
                </label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#194B35]"
                />
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-[11px] leading-relaxed">
                {language === "ml"
                  ? "സമർപ്പിച്ച നിർദ്ദേശങ്ങൾ പബ്ലിക് പോർട്ടലിൽ പ്രസിദ്ധീകരിക്കും. 50-ലധികം കമ്യൂണിറ്റി വോട്ടുകൾ നേടുന്ന നിർദ്ദേശങ്ങൾ നഗരസഭയുടെ അവലോകനത്തിലേക്ക് സ്വയം മാറ്റപ്പെടും."
                  : "Submitted proposals are open to community voting. When a proposal reaches 50+ supports, it automatically advances to Municipal Review."}
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsSubmitOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50"
                >
                  {language === "ml" ? "റദ്ദാക്കുക" : "Cancel"}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#194B35] hover:bg-[#143E2C] text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{language === "ml" ? "സമർപ്പിക്കുക" : "Submit Proposal"}</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      <BottomNav />
      <Footer />
    </div>
  );
}
