"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/lib/i18n/context";
import { useCommunity } from "@/lib/community/context";
import { useAuth } from "@/lib/auth/context";
import { store } from "@/lib/data/store";
import { 
  ShieldCheck, 
  Users, 
  Calendar, 
  Briefcase, 
  Megaphone, 
  AlertTriangle, 
  Check, 
  X, 
  Trash2, 
  Activity, 
  Eye, 
  Lock,
  Layers, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  Building,
  Landmark,
  Plus,
  Edit,
  ExternalLink,
  Archive,
  FileText,
  School,
  Phone,
  MapPin,
  Globe,
  Shield,
  RefreshCw,
  Search,
  Filter,
  Wrench,
  Star,
  Rss,
  Cpu,
  BarChart3,
  HardHat,
  HeartHandshake,
  Compass,
  Navigation
} from "lucide-react";
import { 
  IssueStatus, 
  EventStatus, 
  BusinessStatus, 
  NewsArticleEntity, 
  Institution, 
  PublicService, 
  Event, 
  Business, 
  IssueReport,
  ProfessionalProfile,
  ServiceCategory,
  Review,
  UserRole,
  Profile
} from "@/types/database";
import { digitalMunicipalityStore, TANUR_LOCATION_CATEGORIES } from "@/lib/data/digitalMunicipalityData";
import { civicStore } from "@/lib/data/civicConnectData";
import { 
  DevelopmentProject, 
  CitizenProposal, 
  ProjectStatus, 
  ProposalStatus,
  DigitalTanurLocation,
  LocationCategoryKey
} from "@/types/digitalMunicipality";

type AdminTab = 
  | "overview" 
  | "submissions" 
  | "locations"
  | "projects"
  | "proposals"
  | "news" 
  | "events" 
  | "businesses" 
  | "institutions" 
  | "services" 
  | "issues" 
  | "posts" 
  | "audit"
  | "pros"
  | "categories"
  | "reviews"
  | "users";

export default function AdminPage() {
  const { t, language } = useLanguage();
  const { role, user } = useAuth();
  const { currentCommunity } = useCommunity();

  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [searchFilter, setSearchFilter] = useState("");
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  // Store state queries
  const [stats, setStats] = useState(() => store.getVerificationStats());
  const [news, setNews] = useState(() => store.getNewsArticles(undefined, false, true));
  const [events, setEvents] = useState(() => store.getEvents(undefined, undefined, false, true));
  const [businesses, setBusinesses] = useState(() => store.getBusinesses(undefined, undefined, false, true));
  const [institutions, setInstitutions] = useState(() => store.getInstitutions(undefined, undefined, true));
  const [publicServices, setPublicServices] = useState(() => store.getPublicServices(undefined, undefined, true));
  const [issues, setIssues] = useState(() => store.getIssueReports());
  const [posts, setPosts] = useState(() => store.getPosts());
  const [auditLogs, setAuditLogs] = useState(() => store.getAuditLogs());
  const [professionals, setProfessionals] = useState(() => store.getProfessionals());
  const [serviceCategories, setServiceCategories] = useState(() => store.getServiceCategories());
  const [allReviews, setAllReviews] = useState(() => store.getReviews());

  // RBAC User Management State
  const [allProfiles, setAllProfiles] = useState(() => store.getProfiles());
  const [roleChangeTarget, setRoleChangeTarget] = useState<string>("");
  const [newRoleSelection, setNewRoleSelection] = useState<UserRole>("moderator");
  const [roleChangeReason, setRoleChangeReason] = useState<string>("");
  const [userSearchQuery, setUserSearchQuery] = useState<string>("");
  const [userRoleFilter, setUserRoleFilter] = useState<string>("all");
  const [userStatusFilter, setUserStatusFilter] = useState<string>("all");

  const handleAssignRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || (role !== "admin" && (role as any) !== "super_admin")) {
      showFeedback("Access Denied: Only administrators can assign or modify user roles.");
      return;
    }
    if (!roleChangeTarget) {
      showFeedback("Please select a target user.");
      return;
    }

    // Super Admin privilege barrier
    if ((newRoleSelection === "admin" || newRoleSelection === "super_admin") && (role as any) !== "super_admin") {
      showFeedback("Access Denied: Only a Super Administrator can assign administrator or super administrator privileges.");
      return;
    }

    const res = store.assignUserRole(user.id, roleChangeTarget, newRoleSelection, roleChangeReason || "Administrative update");
    if (res.success) {
      setAllProfiles([...store.getProfiles()]);
      setAuditLogs(store.getAuditLogs());
      showFeedback(`Role successfully updated to '${newRoleSelection}'.`);
      setRoleChangeReason("");
    } else {
      showFeedback(res.error || "Role update failed.");
    }
  };

  const handleSetUserStatus = (targetId: string, targetUsername: string, newStatus: "active" | "suspended") => {
    if (!user || (role !== "admin" && (role as any) !== "super_admin")) {
      showFeedback("Access Denied: Only administrators can modify account status.");
      return;
    }
    const promptMsg = newStatus === "suspended"
      ? `Enter reason for suspending user @${targetUsername}:`
      : `Enter reason for reactivating user @${targetUsername}:`;
    const reason = window.prompt(promptMsg, newStatus === "suspended" ? "Policy violation / identity review" : "Administrative review completed");
    if (reason === null) return; // Cancelled

    const res = store.setUserAccountStatus(user.id, targetId, newStatus, reason || "Administrative update");
    if (res.success) {
      setAllProfiles([...store.getProfiles()]);
      setAuditLogs(store.getAuditLogs());
      showFeedback(`Account status updated to '${newStatus}' for user @${targetUsername}.`);
    } else {
      showFeedback(res.error || "Failed to update account status.");
    }
  };

  // Digital Municipality state
  const [devProjects, setDevProjects] = useState(() => digitalMunicipalityStore.getProjects());
  const [citizenProposals, setCitizenProposals] = useState(() => digitalMunicipalityStore.getProposals());
  const [selectedProjectForMilestone, setSelectedProjectForMilestone] = useState<string | null>(null);
  const [milestoneForm, setMilestoneForm] = useState({
    title: "",
    title_ml: "",
    description: "",
    description_ml: "",
    progress_percentage: 50,
    evidence_url: "",
    verifying_authority: "താനൂർ നഗരസഭ എഞ്ചിനീയറിംഗ് വിഭാഗം",
    inspection_date: new Date().toISOString().split("T")[0],
  });
  const [proposalResponseInput, setProposalResponseInput] = useState<{
    [id: string]: { status: ProposalStatus; response: string; responderName: string; responderRole: string };
  }>({});

  const handleUpdateProjectStatus = (projectId: string, newStatus: ProjectStatus) => {
    digitalMunicipalityStore.updateProject(projectId, { status: newStatus });
    setDevProjects(digitalMunicipalityStore.getProjects());
    showFeedback(`പദ്ധതിയുടെ സ്ഥിതിവിവരം ${newStatus} ആയി മാറ്റി (Project status updated).`);
  };

  const handleAddMilestoneSubmit = (e: React.FormEvent, projectId: string) => {
    e.preventDefault();
    if (!milestoneForm.title || !milestoneForm.evidence_url) return;
    digitalMunicipalityStore.addProjectProgressUpdate(projectId, {
      title: milestoneForm.title,
      title_ml: milestoneForm.title_ml || milestoneForm.title,
      note: milestoneForm.description,
      note_ml: milestoneForm.description_ml || milestoneForm.description,
      evidence_url: milestoneForm.evidence_url,
      verified_by: milestoneForm.verifying_authority,
      date: milestoneForm.inspection_date,
    });
    const proj = digitalMunicipalityStore.getProjectById(projectId);
    if (proj && Number(milestoneForm.progress_percentage) > (proj.progress_percentage ?? 0)) {
      digitalMunicipalityStore.updateProject(projectId, { progress_percentage: Number(milestoneForm.progress_percentage) });
    }
    setDevProjects(digitalMunicipalityStore.getProjects());
    setSelectedProjectForMilestone(null);
    setMilestoneForm({
      title: "",
      title_ml: "",
      description: "",
      description_ml: "",
      progress_percentage: 50,
      evidence_url: "",
      verifying_authority: "താനൂർ നഗരസഭ എഞ്ചിനീയറിംഗ് വിഭാഗം",
      inspection_date: new Date().toISOString().split("T")[0],
    });
    showFeedback("പദ്ധതി പുരോഗതിയും ഔദ്യോഗിക തെളിവുകളും രേഖപ്പെടുത്തി (Milestone recorded).");
  };

  const handleProposalResponseSubmit = (proposalId: string) => {
    const input = proposalResponseInput[proposalId];
    if (!input || !input.response) return;
    digitalMunicipalityStore.updateProposalStatus(
      proposalId,
      input.status || "under_municipal_review",
      input.response,
      {
        name: input.responderName || "താനൂർ നഗരസഭ സെക്രട്ടറി",
        role: input.responderRole || "താനൂർ നഗരസഭാ കാര്യാലയം"
      }
    );
    setCitizenProposals(digitalMunicipalityStore.getProposals());
    showFeedback("ജനകീയ നിർദ്ദേശത്തിന് നഗരസഭാ ഔദ്യോഗിക മറുപടി രേഖപ്പെടുത്തി (Official response recorded).");
  };

  // Digital Tanur GIS Locations state & handlers
  const [gisLocations, setGisLocations] = useState<DigitalTanurLocation[]>(() => digitalMunicipalityStore.getLocations());
  const [locationSearchFilter, setLocationSearchFilter] = useState("");
  const [locationCategoryFilter, setLocationCategoryFilter] = useState<LocationCategoryKey | "all">("all");
  const [isAddLocationOpen, setIsAddLocationOpen] = useState(false);
  const [newLocationForm, setNewLocationForm] = useState({
    name: "",
    name_ml: "",
    category: "government" as LocationCategoryKey,
    category_name: "Government Offices",
    category_name_ml: "സർക്കാർ ഓഫീസുകൾ",
    ward_number: 1,
    locality: "Tanur Town",
    locality_ml: "താനൂർ ടൗൺ",
    address: "Tanur, Malappuram - 676302",
    latitude: 10.9768,
    longitude: 75.8672,
    phone: "0494 2440228",
    opening_hours: "10:00 AM - 5:00 PM (Mon-Sat)",
    description: "Official public facility in Tanur Municipality.",
    description_ml: "താനൂർ നഗരസഭയിലെ ഔദ്യോഗിക പൊതു സ്ഥാപനം.",
    image_url: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80",
    source_name: "താനൂർ നഗരസഭാ ഔദ്യോഗിക ഗസറ്റ്",
    source_url: "https://tanurmunicipality.lsgkerala.gov.in/",
    is_verified: true,
  });

  const handleToggleLocationVerification = (id: string, currentStatus: boolean) => {
    digitalMunicipalityStore.verifyLocation(
      id,
      !currentStatus,
      "താനൂർ നഗരസഭാ കാര്യാലയം (അഡ്മിൻ സ്ഥിരീകരണം)",
      "https://tanurmunicipality.lsgkerala.gov.in/"
    );
    setGisLocations(digitalMunicipalityStore.getLocations());
    showFeedback(`ലൊക്കേഷൻ പരിശോധന നില അപ്‌ഡേറ്റ് ചെയ്തു: ${!currentStatus ? "Verified ✓" : "Unverified"}`);
  };

  const handleCreateLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLocationForm.name.trim() || !newLocationForm.name_ml.trim()) return;

    digitalMunicipalityStore.addLocation({
      ...newLocationForm,
      last_verified_date: new Date().toISOString().split("T")[0],
    });

    setGisLocations(digitalMunicipalityStore.getLocations());
    setIsAddLocationOpen(false);
    setNewLocationForm({
      name: "",
      name_ml: "",
      category: "government",
      category_name: "Government Offices",
      category_name_ml: "സർക്കാർ ഓഫീസുകൾ",
      ward_number: 1,
      locality: "Tanur Town",
      locality_ml: "താനൂർ ടൗൺ",
      address: "Tanur, Malappuram - 676302",
      latitude: 10.9768,
      longitude: 75.8672,
      phone: "0494 2440228",
      opening_hours: "10:00 AM - 5:00 PM (Mon-Sat)",
      description: "Official public facility in Tanur Municipality.",
      description_ml: "താനൂർ നഗരസഭയിലെ ഔദ്യോഗിക പൊതു സ്ഥാപനം.",
      image_url: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80",
      source_name: "താനൂർ നഗരസഭാ ഔദ്യോഗിക ഗസറ്റ്",
      source_url: "https://tanurmunicipality.lsgkerala.gov.in/",
      is_verified: true,
    });
    showFeedback(`"${newLocationForm.name}" ജി.ഐ.എസ് ഡയറക്ടറിയിലേക്ക് ചേർത്തു.`);
  };

  // Category creation form
  const [newCatName, setNewCatName] = useState("");
  const [newCatNameMl, setNewCatNameMl] = useState("");
  const [newCatSlug, setNewCatSlug] = useState("");
  const [newCatDesc, setNewCatDesc] = useState("");
  const [newCatIcon, setNewCatIcon] = useState("Wrench");

  const handleVerifyPro = (proId: string) => {
    store.verifyProfessional(proId, user?.id);
    setProfessionals(store.getProfessionals());
    showFeedback("പ്രൊഫഷണൽ വെരിഫിക്കേഷൻ പൂർത്തിയായി (Professional verified successfully).");
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName || !newCatSlug) return;
    store.addServiceCategory({
      name: newCatName,
      name_ml: newCatNameMl || newCatName,
      slug: newCatSlug.toLowerCase().trim(),
      icon: newCatIcon,
      description: newCatDesc,
      display_order: serviceCategories.length + 1,
    });
    setServiceCategories(store.getServiceCategories());
    setNewCatName("");
    setNewCatNameMl("");
    setNewCatSlug("");
    setNewCatDesc("");
    showFeedback("പുതിയ സേവന വിഭാഗം വിജയകരമായി ചേർത്തു (Category created).");
  };

  // Input states
  const [officialResponseInput, setOfficialResponseInput] = useState<{ [id: string]: string }>({});

  // Verification modal state
  const [verifyingTarget, setVerifyingTarget] = useState<{ type: string; id: string; title: string } | null>(null);
  const [verifySourceUrl, setVerifySourceUrl] = useState("");
  const [verifySourceName, setVerifySourceName] = useState("");

  // Rejection modal state
  const [rejectingTarget, setRejectingTarget] = useState<{ type: "event" | "business" | "news"; id: string; title: string } | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");

  // Content Creation Modal states
  const [isCreateNewsOpen, setIsCreateNewsOpen] = useState(false);
  const [newsForm, setNewsForm] = useState({
    title: "",
    title_ml: "",
    category: "താനൂർ",
    summary: "",
    full_story: "",
    source_name: "താനൂർ നഗരസഭ ഔദ്യോഗിക വാർത്താക്കുറിപ്പ്",
    source_url: "https://tanurmunicipality.lsgkerala.gov.in/",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Tanur.jpg",
    image_license: "CC BY-SA 4.0",
    image_attribution: "Wikimedia Commons",
    is_official: true,
    is_verified: true,
  });

  const [isCreateBizOpen, setIsCreateBizOpen] = useState(false);
  const [bizForm, setBizForm] = useState({
    name: "",
    name_ml: "",
    category: "Fisheries & Seafood",
    description: "",
    address: "",
    phone: "",
    email: "",
    source_url: "https://tanurmunicipality.lsgkerala.gov.in/",
    source_name: "താനൂർ വ്യാപാര ലൈസൻസ് രജിസ്റ്റർ",
    is_verified: true,
  });

  const isAuthorized = role === "admin" || role === "moderator";

  const showFeedback = (msg: string) => {
    setActionFeedback(msg);
    setTimeout(() => setActionFeedback(null), 3500);
  };

  const refreshAllState = () => {
    setStats(store.getVerificationStats());
    setNews(store.getNewsArticles(undefined, false, true));
    setEvents(store.getEvents(undefined, undefined, false, true));
    setBusinesses(store.getBusinesses(undefined, undefined, false, true));
    setInstitutions(store.getInstitutions(undefined, undefined, true));
    setPublicServices(store.getPublicServices(undefined, undefined, true));
    setIssues(store.getIssueReports());
    setPosts(store.getPosts());
    setAuditLogs(store.getAuditLogs());
  };

  // -------------------------------------------------------------
  // ACTION HANDLERS
  // -------------------------------------------------------------
  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyingTarget) return;

    store.verifyEntity(
      verifyingTarget.type,
      verifyingTarget.id,
      verifySourceUrl.trim() || "https://tanurmunicipality.lsgkerala.gov.in/",
      verifySourceName.trim() || "തദ്ദേശ സ്വയംഭരണ വകുപ്പ് / താനൂർ നഗരസഭ",
      user?.id || "admin"
    );

    showFeedback(`"${verifyingTarget.title}" പരിശോധിച്ചുറപ്പിച്ചു (Verified with primary source).`);
    setVerifyingTarget(null);
    setVerifySourceUrl("");
    setVerifySourceName("");
    refreshAllState();
  };

  const handleRejectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectingTarget) return;

    if (rejectingTarget.type === "event") {
      store.updateEventStatus(rejectingTarget.id, "rejected", rejectionReason, user?.id);
    } else if (rejectingTarget.type === "business") {
      store.updateBusinessStatus(rejectingTarget.id, "rejected", false, user?.id);
    }

    showFeedback(`"${rejectingTarget.title}" നിരസിച്ചു (Submission Rejected).`);
    setRejectingTarget(null);
    setRejectionReason("");
    refreshAllState();
  };

  const handleUpdateIssue = (id: string, newStatus: IssueStatus) => {
    const responseNote = officialResponseInput[id] || undefined;
    store.updateIssueStatus(id, newStatus, responseNote, user?.id);
    refreshAllState();
    showFeedback(`പരാതിയുടെ അവസ്ഥ ${newStatus}-ലേക്ക് മാറ്റി.`);
  };

  const handleArchiveContent = (type: string, id: string, title: string) => {
    if (type === "news") store.archiveNewsArticle(id, user?.id);
    else if (type === "event") store.archiveEvent(id, user?.id);
    else if (type === "business") store.archiveBusiness(id, user?.id);
    else if (type === "institution") store.archiveInstitution(id, user?.id);
    else if (type === "service") store.archivePublicService(id, user?.id);

    refreshAllState();
    showFeedback(`"${title}" ആർക്കൈവ് ചെയ്തു (Archived).`);
  };

  const handleCreateNewsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    store.createNewsArticle({
      community_id: currentCommunity?.id || "40000000-0000-0000-0000-000000000007",
      title: newsForm.title,
      title_ml: newsForm.title_ml || newsForm.title,
      summary: newsForm.summary,
      full_story: newsForm.full_story,
      category: newsForm.category,
      date: new Date().toLocaleDateString("ml-IN", { day: "numeric", month: "long", year: "numeric" }),
      image_url: newsForm.image_url,
      image_license: newsForm.image_license,
      image_attribution: newsForm.image_attribution,
      source_name: newsForm.source_name,
      source_url: newsForm.source_url,
      is_official: newsForm.is_official,
      is_verified: newsForm.is_verified,
      is_community_submitted: false,
      verified_at: new Date().toISOString().split("T")[0],
      status: "approved",
    }, user?.id);

    setIsCreateNewsOpen(false);
    showFeedback("പുതിയ ഔദ്യോഗിക വാർത്ത വിജയകരമായി പ്രസിദ്ധീകരിച്ചു.");
    refreshAllState();
  };

  const handleCreateBizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    store.createBusiness({
      community_id: currentCommunity?.id || "40000000-0000-0000-0000-000000000007",
      name: bizForm.name,
      name_ml: bizForm.name_ml || bizForm.name,
      category: bizForm.category,
      description: bizForm.description,
      address: bizForm.address,
      phone: bizForm.phone,
      email: bizForm.email,
      source_url: bizForm.source_url,
      source_name: bizForm.source_name,
    });

    setIsCreateBizOpen(false);
    showFeedback("സ്ഥാപനം ഡയറക്ടറിയിൽ ചേർത്തു.");
    refreshAllState();
  };

  // Filter pending community submissions
  const pendingEvents = events.filter(e => e.status === "pending" || e.is_community_submitted);
  const pendingBusinesses = businesses.filter(b => b.status === "pending" || (!b.is_verified && b.is_community_submitted));
  const totalPending = pendingEvents.length + pendingBusinesses.length;

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl border border-[#EAE4D7] p-8 text-center shadow-card">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-[#B87A1E] flex items-center justify-center mx-auto mb-4 border border-amber-200">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold font-malayalam-serif text-[#1A2420]">
              അഡ്മിൻ പ്രവേശനം ആവശ്യമാണ്
            </h2>
            <p className="text-xs text-[#5C6A64] mt-2 leading-relaxed">
              ഈ പേജ് താനൂർ നഗരസഭാ മോഡറേറ്റർമാർക്കും പ്ലാറ്റ്‌ഫോം അഡ്മിനിസ്ട്രേറ്റർമാർക്കും മാത്രമുള്ളതാണ്. ഈ ഭാഗം സന്ദർശിക്കാൻ അധികാരമുള്ള ഒരു അക്കൗണ്ട് വഴി ലോഗിൻ ചെയ്യുക.
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <Link
                href="/"
                className="w-full py-2.5 rounded-xl bg-[#1B4D36] hover:bg-[#133A28] text-white font-bold text-xs transition active:scale-95 shadow-sm text-center"
              >
                ഹോംപേജിലേക്ക് മടങ്ങുക (Return to Home)
              </Link>
              <Link
                href="/profile"
                className="w-full py-2.5 rounded-xl bg-white hover:bg-[#F3EFE6] text-[#1B4D36] border border-[#DDD5C5] font-bold text-xs transition active:scale-95 shadow-sm text-center"
              >
                പ്രൊഫൈൽ സന്ദർശിക്കുക (View Profile)
              </Link>
            </div>
            <p className="text-[11px] text-[#7A8880] mt-4">
              സുരക്ഷാ പോളിസികൾ പ്രകാരം സാധാരണ ഉപയോക്താക്കൾക്ക് അഡ്മിൻ അനുമതികൾ സ്വയം നൽകാൻ സാധ്യമല്ല.
            </p>
          </div>
        </main>
        <Footer />
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header & Verification Health Badge */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <ShieldCheck className="w-7 h-7 text-[#1B4D36]" />
              <h1 className="text-2xl sm:text-3xl font-bold font-malayalam-serif text-[#1B4D36]">
                {t("adminDashboard")}
              </h1>
              <span className="text-[11px] bg-[#E0F1E7] text-[#1B4D36] font-bold px-3 py-0.5 rounded-full uppercase border border-[#BDE3CE]">
                {role} mode • Malappuram & Tanur
              </span>
            </div>
            <p className="text-xs text-[#5C6A64] mt-1 font-malayalam-body">
              വിവരങ്ങളുടെ കൃത്യത പരിശോധിക്കൽ, ഔദ്യോഗിക ഉറവിട ലിങ്കുകൾ, മോഡറേഷൻ, പുതിയ വിവരങ്ങൾ ചേർക്കൽ.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border border-[#EAE4D7] shadow-xs">
            <div className="text-right">
              <span className="text-[10px] font-bold uppercase text-[#7A8880] block">സ്ഥിരീകരിച്ച വിവരങ്ങൾ</span>
              <span className="text-sm font-bold text-emerald-800">{stats.percentVerified}% Verified</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#E0F1E7] text-[#1B4D36] flex items-center justify-center font-bold text-xs border border-[#BDE3CE]">
              {stats.totalVerified}/{stats.totalRecords}
            </div>
          </div>
        </div>

        {/* Feedback Banner */}
        {actionFeedback && (
          <div className="mb-6 p-4 rounded-2xl bg-[#1B4D36] text-white text-xs font-semibold flex items-center gap-2 shadow-md animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-amber-300" />
            <span>{actionFeedback}</span>
          </div>
        )}

        {/* Tabs Bar */}
        <div className="flex gap-2 overflow-x-auto pb-2 border-b border-[#E5DFD1] mb-6 scrollbar-none">
          {[
            { id: "overview", label: "Overview", icon: Activity },
            { id: "submissions", label: `അംഗീകാരത്തിനായുള്ളവ (${totalPending})`, icon: Sparkles },
            { id: "locations", label: `ഡിജിറ്റൽ താനൂർ ജി.ഐ.എസ് (${gisLocations.length})`, icon: Compass },
            { id: "projects", label: `വികസന പദ്ധതികൾ (${devProjects.length})`, icon: HardHat },
            { id: "proposals", label: `ജനകീയ ശബ്ദം (${citizenProposals.length})`, icon: HeartHandshake },
            { id: "pros", label: `വിദഗ്ദ്ധർ (${professionals.length})`, icon: Wrench },
            { id: "categories", label: `വിഭാഗങ്ങൾ (${serviceCategories.length})`, icon: Layers },
            { id: "reviews", label: `അവലോകനങ്ങൾ (${allReviews.length})`, icon: Star },
            { id: "news", label: `വാർത്തകൾ (${news.length})`, icon: FileText },
            { id: "events", label: `പരിപാടികൾ (${events.length})`, icon: Calendar },
            { id: "businesses", label: `സ്ഥാപനങ്ങൾ (${businesses.length})`, icon: Briefcase },
            { id: "institutions", label: `വിദ്യാഭ്യാസ സ്ഥാപനങ്ങൾ (${institutions.length})`, icon: School },
            { id: "services", label: `പൊതുസേവനങ്ങൾ (${publicServices.length})`, icon: Phone },
            { id: "issues", label: `പരാതികൾ (${issues.length})`, icon: AlertTriangle },
            { id: "posts", label: `പോസ്റ്റുകൾ (${posts.length})`, icon: Eye },
            { id: "audit", label: `ഓഡിറ്റ് രേഖകൾ (${auditLogs.length})`, icon: Clock },
            ...(role === "admin" ? [{ id: "users", label: `റോളുകൾ & RBAC (${allProfiles.length})`, icon: ShieldCheck }] : []),
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition active:scale-95 shadow-xs ${
                  isActive
                    ? "bg-[#1B4D36] text-white"
                    : "bg-white hover:bg-[#F3EFE6] text-[#3E4D45] border border-[#DDD5C5]"
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-amber-300" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: OVERVIEW */}
        {/* ========================================================================= */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white rounded-3xl border border-[#EAE4D7] p-5 shadow-card">
                <span className="text-[11px] font-bold text-[#7A8880] uppercase">ഡാറ്റാ സ്ഥിരീകരണ നിരക്ക്</span>
                <div className="text-3xl font-bold font-malayalam-serif text-emerald-800 mt-1">
                  {stats.percentVerified}%
                </div>
                <div className="text-[11px] text-[#5C6A64] mt-1 font-semibold">
                  {stats.totalVerified} / {stats.totalRecords} ലിസ്റ്റിംഗുകൾ സ്ഥിരീകരിച്ചു
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-[#EAE4D7] p-5 shadow-card">
                <span className="text-[11px] font-bold text-[#7A8880] uppercase">പരിശോധന ആവശ്യമുള്ളവ</span>
                <div className="text-3xl font-bold font-malayalam-serif text-amber-700 mt-1">
                  {totalPending}
                </div>
                <div className="text-[11px] text-amber-700 mt-1 font-semibold">
                  കമ്യൂണിറ്റി സമർപ്പിച്ചവ
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-[#EAE4D7] p-5 shadow-card">
                <span className="text-[11px] font-bold text-[#7A8880] uppercase">പൊതു പരാതികൾ</span>
                <div className="text-3xl font-bold font-malayalam-serif text-[#1B4D36] mt-1">
                  {issues.length}
                </div>
                <div className="text-[11px] text-[#5C6A64] mt-1 font-semibold">
                  {issues.filter(i => i.status === "resolved").length} പരിഹരിച്ചവ
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-[#EAE4D7] p-5 shadow-card">
                <span className="text-[11px] font-bold text-[#7A8880] uppercase">പൊതുസേവന നമ്പറുകൾ</span>
                <div className="text-3xl font-bold font-malayalam-serif text-[#1B4D36] mt-1">
                  {publicServices.length}
                </div>
                <div className="text-[11px] text-emerald-700 mt-1 font-semibold">
                  100% ഔദ്യോഗിക ഫോൺ നമ്പറുകൾ
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* THE SIX CORE MUNICIPAL FEATURES — ADMINISTRATIVE DESKS                    */}
            {/* ========================================================================= */}
            <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 shadow-card space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EDE6D8] pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#194B35]" />
                    <h3 className="font-bold text-base text-[#194B35] font-malayalam-heading">
                      താനൂർ ഡിജിറ്റൽ നഗരസഭ — 6 പ്രധാന വിഭാഗങ്ങൾ
                    </h3>
                  </div>
                  <p className="text-xs text-[#5C6A64] mt-0.5">
                    The Six Core Municipal Features • Central Administrative Control &amp; Public Portals
                  </p>
                </div>
                <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#FAF7F0] text-[#194B35] border border-[#DDD5C5]">
                  Tanur Municipality, Malappuram
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* 1. Digital Municipality */}
                <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] hover:border-[#194B35] transition space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-[#E0F1E7] text-[#194B35] flex items-center justify-center">
                      <Building className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#194B35] text-white">Feature 01</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#194B35]">Digital Municipality</h4>
                    <p className="text-[11px] text-[#5C6A64] mt-0.5">44 വാർഡുകൾ, സ്റ്റാൻഡിംഗ് കമ്മിറ്റികൾ, Google Maps GIS</p>
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-[#EDE6D8]/60">
                    <Link
                      href="/digital-municipality"
                      className="flex-1 text-center py-1.5 px-2 bg-[#194B35] hover:bg-[#143E2C] text-white rounded-lg text-xs font-bold transition"
                    >
                      പൊതു ഹബ്ബ്
                    </Link>
                    <button
                      onClick={() => setActiveTab("locations")}
                      className="flex-1 text-center py-1.5 px-2 bg-white hover:bg-neutral-100 text-[#194B35] border border-[#DDD5C5] rounded-lg text-xs font-bold transition"
                    >
                      GIS മാപ്പ് ({gisLocations.length})
                    </button>
                  </div>
                </div>

                {/* 2. Civic Connect */}
                <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] hover:border-[#194B35] transition space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-600 text-white">Feature 02</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#194B35]">Civic Connect</h4>
                    <p className="text-[11px] text-[#5C6A64] mt-0.5">പരാതി പരിഹാരം, ഫോട്ടോകൾ, വാർഡ് ട്രാക്കിംഗ് (TNR-XXXX)</p>
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-[#EDE6D8]/60">
                    <Link
                      href="/admin/civic"
                      className="flex-1 text-center py-1.5 px-2 bg-[#194B35] hover:bg-[#143E2C] text-white rounded-lg text-xs font-bold transition"
                    >
                      മോഡറേഷൻ
                    </Link>
                    <Link
                      href="/civic-connect"
                      className="flex-1 text-center py-1.5 px-2 bg-white hover:bg-neutral-100 text-[#194B35] border border-[#DDD5C5] rounded-lg text-xs font-bold transition"
                    >
                      പബ്ലിക് ഫീഡ്
                    </Link>
                  </div>
                </div>

                {/* 3. Development Tracker */}
                <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] hover:border-[#194B35] transition space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-800 flex items-center justify-center">
                      <HardHat className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-orange-600 text-white">Feature 03</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#194B35]">Development Tracker</h4>
                    <p className="text-[11px] text-[#5C6A64] mt-0.5">₹86.60 Cr ബജറ്റ്, 6 ഔദ്യോഗിക പദ്ധതികൾ, മൈൽസ്റ്റോൺ തെളിവുകൾ</p>
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-[#EDE6D8]/60">
                    <Link
                      href="/admin/development"
                      className="flex-1 text-center py-1.5 px-2 bg-[#194B35] hover:bg-[#143E2C] text-white rounded-lg text-xs font-bold transition"
                    >
                      അഡ്മിൻ ഡെസ്ക്
                    </Link>
                    <Link
                      href="/development-tracker"
                      className="flex-1 text-center py-1.5 px-2 bg-white hover:bg-neutral-100 text-[#194B35] border border-[#DDD5C5] rounded-lg text-xs font-bold transition"
                    >
                      പബ്ലിക് പോർട്ടൽ
                    </Link>
                  </div>
                </div>

                {/* 4. Public Services */}
                <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] hover:border-[#194B35] transition space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                      <Phone className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-700 text-white">Feature 04</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#194B35]">Public Services Directory</h4>
                    <p className="text-[11px] text-[#5C6A64] mt-0.5">കെ-സ്മാർട്ട്, ജനന-മരണ രജിസ്ട്രേഷൻ, നികുതി, പെൻഷൻ</p>
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-[#EDE6D8]/60">
                    <Link
                      href="/public-services"
                      className="flex-1 text-center py-1.5 px-2 bg-[#194B35] hover:bg-[#143E2C] text-white rounded-lg text-xs font-bold transition"
                    >
                      സേവനങ്ങൾ കാണുക
                    </Link>
                    <button
                      onClick={() => setActiveTab("services")}
                      className="flex-1 text-center py-1.5 px-2 bg-white hover:bg-neutral-100 text-[#194B35] border border-[#DDD5C5] rounded-lg text-xs font-bold transition"
                    >
                      ഡയറക്ടറി എഡിറ്റ്
                    </button>
                  </div>
                </div>

                {/* 5. Documents & Notices */}
                <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] hover:border-[#194B35] transition space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
                      <FileText className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-700 text-white">Feature 05</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#194B35]">Documents &amp; Notices</h4>
                    <p className="text-[11px] text-[#5C6A64] mt-0.5">കൗൺസിൽ തീരുമാനങ്ങൾ, ബജറ്റ്, ടെൻഡറുകൾ, ഫോമുകൾ</p>
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-[#EDE6D8]/60">
                    <Link
                      href="/documents"
                      className="w-full text-center py-1.5 px-2 bg-[#194B35] hover:bg-[#143E2C] text-white rounded-lg text-xs font-bold transition"
                    >
                      രേഖാ ശേഖരം സന്ദർശിക്കുക
                    </Link>
                  </div>
                </div>

                {/* 6. People's Voice */}
                <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] hover:border-[#194B35] transition space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center">
                      <HeartHandshake className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-700 text-white">Feature 06</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#194B35]">People&apos;s Voice</h4>
                    <p className="text-[11px] text-[#5C6A64] mt-0.5">പൗര നിർദ്ദേശങ്ങൾ, ചർച്ചകൾ, സപ്പോർട്ട് വോട്ടുകൾ (TNR-VOICE)</p>
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-[#EDE6D8]/60">
                    <Link
                      href="/admin/peoples-voice"
                      className="flex-1 text-center py-1.5 px-2 bg-[#194B35] hover:bg-[#143E2C] text-white rounded-lg text-xs font-bold transition"
                    >
                      മോഡറേഷൻ
                    </Link>
                    <Link
                      href="/peoples-voice"
                      className="flex-1 text-center py-1.5 px-2 bg-white hover:bg-neutral-100 text-[#194B35] border border-[#DDD5C5] rounded-lg text-xs font-bold transition"
                    >
                      പബ്ലിക് പോർട്ടൽ
                    </Link>
                  </div>
                </div>

                {/* 7. Local Governments Directory */}
                <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EDE6D8] hover:border-[#194B35] transition space-y-3 md:col-span-2 lg:col-span-3">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#194B35] flex items-center justify-center">
                      <Landmark className="w-5 h-5 text-[#194B35]" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#194B35] text-white">Civic Governance Directory</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#194B35]">Local Governments &amp; Representatives Directory</h4>
                    <p className="text-[11px] text-[#5C6A64] mt-0.5">താനൂർ നഗരസഭ 44 വാർഡുകൾ, താനൂർ ബ്ലോക്ക് പഞ്ചായത്ത് (17 ഡിവിഷനുകൾ), 7 ഗ്രാമപഞ്ചായത്തുകൾ, ജനപ്രതിനിധികൾ, വെരിഫിക്കേഷൻ സ്റ്റാറ്റസ്</p>
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-[#EDE6D8]/60">
                    <Link
                      href="/admin/local-governments"
                      className="flex-1 text-center py-1.5 px-2 bg-[#194B35] hover:bg-[#143E2C] text-white rounded-lg text-xs font-bold transition"
                    >
                      പ്രതിനിധികളെ മാനേജ് ചെയ്യുക
                    </Link>
                    <Link
                      href="/local-governments"
                      className="flex-1 text-center py-1.5 px-2 bg-white hover:bg-neutral-100 text-[#194B35] border border-[#DDD5C5] rounded-lg text-xs font-bold transition"
                    >
                      പബ്ലിക് ഡയറക്ടറി കാണുക
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Civic Connect Command Center Banner */}
            <div className="bg-gradient-to-r from-[#143E2C] to-[#194B35] rounded-3xl p-6 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6 border border-[#0F3022]">
              <div className="space-y-1.5 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-[#143E2C]">
                    CIVIC CONNECT PORTAL
                  </span>
                  <span className="text-xs text-amber-200 font-medium">താനൂർ നഗരസഭ 44 വാർഡുകൾ</span>
                </div>
                <h3 className="text-lg font-bold font-malayalam-serif text-white">
                  സിവിക് കണക്ട് മോഡറേഷൻ വർക്ക്‌സ്‌പേസ്
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  പൗരന്മാർ റിപ്പോർട്ട് ചെയ്ത റോഡ്, കുടിവെള്ളം, സ്ട്രീറ്റ്‌ലൈറ്റ്, മാലിന്യ പ്രശ്നങ്ങൾ പരിശോധിച്ച് താനൂർ നഗരസഭയിലേക്കും KSEB, KWA ഡിപ്പാർട്ട്മെന്റുകളിലേക്കും കൈമാറാനും പരിഹാര തെളിവുകൾ രേഖപ്പെടുത്താനും പ്രത്യേക വർക്ക്‌സ്‌പേസ് ഉപയോഗിക്കുക.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Link
                  href="/admin/public-services"
                  className="px-4 py-2.5 rounded-xl bg-emerald-300 hover:bg-emerald-200 text-[#143E2C] text-xs font-bold transition shadow-sm inline-flex items-center gap-1.5"
                >
                  <Building className="w-4 h-4" />
                  <span>Public Services Desk</span>
                </Link>
                <Link
                  href="/admin/civic"
                  className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#143E2C] text-xs font-bold transition shadow-sm inline-flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>മോഡറേഷൻ ഡാഷ്‌ബോർഡ്</span>
                </Link>
                <Link
                  href="/admin/civic/issues"
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition inline-flex items-center gap-1.5"
                >
                  <span>പരാതികൾ മാനേജ് ചെയ്യുക</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Smart Newsroom Automated Ingestion Command Center */}
            <div className="bg-gradient-to-r from-[#194B35] via-[#143E2C] to-[#0D281D] rounded-3xl p-6 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6 border border-[#235841]">
              <div className="space-y-1.5 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-[#143E2C] flex items-center gap-1">
                    <Cpu className="w-3 h-3" />
                    FULLY AUTOMATIC SMART NEWSROOM
                  </span>
                  <span className="text-xs text-amber-200 font-medium">താനൂർ, മലപ്പുറം, കേരളം</span>
                </div>
                <h3 className="text-lg font-bold font-malayalam-serif text-white">
                  സ്മാർട്ട് ന്യൂസ്‌റൂം കൺട്രോൾ സെന്റർ
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  അംഗീകൃത സർക്കാർ പോർട്ടലുകൾ, ആകാശവാണി, വാർത്താ ഏജൻസികൾ എന്നിവയിൽ നിന്നുള്ള വിവരങ്ങൾ എഐ സ്വയം ശേഖരിച്ച്, വസ്തുത പരിശോധിച്ച്, 11 വിഭാഗങ്ങളിലായി തത്സമയം പബ്ലിഷ് ചെയ്യുന്ന ഓട്ടോമേറ്റഡ് സംവിധാനം.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <Link
                  href="/admin/newsroom"
                  className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#143E2C] text-xs font-bold transition shadow-sm inline-flex items-center gap-1.5"
                >
                  <Cpu className="w-4 h-4" />
                  <span>ന്യൂസ്‌റൂം ഡാഷ്‌ബോർഡ്</span>
                </Link>
                <Link
                  href="/admin/newsroom/sources"
                  className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition inline-flex items-center gap-1.5"
                >
                  <Rss className="w-3.5 h-3.5 text-amber-300" />
                  <span>ഉറവിടങ്ങൾ (Feeds)</span>
                </Link>
                <Link
                  href="/admin/newsroom/review"
                  className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition inline-flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                  <span>എഡിറ്റോറിയൽ റിവ്യൂ</span>
                </Link>
                <Link
                  href="/admin/newsroom/analytics"
                  className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition inline-flex items-center gap-1.5"
                >
                  <BarChart3 className="w-3.5 h-3.5 text-amber-300" />
                  <span>അനലിറ്റിക്സ്</span>
                </Link>
              </div>
            </div>

            {/* Digital Municipality (Tanur 2030) Command Center Banner */}
            <div className="bg-gradient-to-r from-[#194B35] via-[#16382B] to-[#0E281F] rounded-3xl p-6 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6 border border-[#235841]">
              <div className="space-y-1.5 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#C39A5B] text-[#143E2C] flex items-center gap-1">
                    <Building className="w-3 h-3" />
                    KERALA&apos;S FIRST DIGITAL MUNICIPALITY
                  </span>
                  <span className="text-xs text-[#E3D2B8] font-medium">താനൂർ നഗരസഭ 44 വാർഡുകൾ • Tanur 2030</span>
                </div>
                <h3 className="text-lg font-bold font-malayalam-serif text-white">
                  ഡിജിറ്റൽ മുൻസിപ്പാലിറ്റി കൺട്രോൾ സെന്റർ
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  44 മുൻസിപ്പൽ വാർഡുകളുടെ ഡയറക്ടറി, ₹86.60 കോടിയുടെ 6 ഔദ്യോഗിക അടിസ്ഥാന സൗകര്യ പദ്ധതികളുടെ പുരോഗതി, പൗരന്മാരുടെ ജനകീയ നിർദ്ദേശങ്ങൾ (People&apos;s Voice) എന്നിവ ഒരു കുടക്കീഴിൽ ഏകോപിപ്പിക്കുന്ന ഡിജിറ്റൽ ഭരണ സംവിധാനം.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <Link
                  href="/digital-municipality"
                  className="px-4 py-2.5 rounded-xl bg-[#C39A5B] hover:bg-[#B3894B] text-[#143E2C] text-xs font-bold transition shadow-sm inline-flex items-center gap-1.5"
                >
                  <Globe className="w-4 h-4" />
                  <span>ഡിജിറ്റൽ നഗരസഭ</span>
                </Link>
                <Link
                  href="/admin/development"
                  className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition inline-flex items-center gap-1.5"
                >
                  <HardHat className="w-3.5 h-3.5 text-[#C39A5B]" />
                  <span>പദ്ധതികൾ ({devProjects.length})</span>
                </Link>
                <Link
                  href="/admin/peoples-voice"
                  className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition inline-flex items-center gap-1.5"
                >
                  <HeartHandshake className="w-3.5 h-3.5 text-[#C39A5B]" />
                  <span>നിർദ്ദേശങ്ങൾ ({citizenProposals.length})</span>
                </Link>
              </div>
            </div>

            {/* Quick Action Bar */}
            <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 shadow-card">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <h3 className="font-bold font-malayalam-serif text-base text-[#1A2420]">
                  ദ്രുത നടപടികൾ (Quick Content Actions)
                </h3>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setIsCreateNewsOpen(true)}
                    className="px-3.5 py-2 rounded-xl bg-[#1B4D36] hover:bg-[#133A28] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>പുതിയ വാർത്ത ചേർക്കുക</span>
                  </button>
                  <button
                    onClick={() => setIsCreateBizOpen(true)}
                    className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#FAF7F0] text-[#1B4D36] border border-[#DDD5C5] text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>സ്ഥാപനം ചേർക്കുക</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1B4D36] mb-1">
                    ഔദ്യോഗിക ഡാറ്റാ ഉറവിട മാനദണ്ഡം (Data Integrity Policy)
                  </h4>
                  <p className="text-xs text-[#5C6A64] leading-relaxed">
                    താനൂർ നഗരസഭ, റവന്യൂ വകുപ്പ്, പോലീസ്, ഫയർഫോഴ്സ്, കെ.എസ്.ഇ.ബി, റെയിൽവേ എന്നിവയുടെ ഔദ്യോഗിക പോർട്ടലുകളിൽ നിന്നോ സർക്കാർ ഉത്തരവുകളിൽ നിന്നോ ലഭിച്ച വിവരങ്ങൾ മാത്രമേ <strong>Verified</strong> ആയി അംഗീകരിക്കാവൂ. ഊഹാപോഹങ്ങളോ വ്യാജ നമ്പറുകളോ പ്രസിദ്ധീകരിക്കാൻ പാടില്ല.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1B4D36] mb-1">
                    ചിത്രങ്ങളുടെ ലൈസൻസിംഗ് (Image License Tracking)
                  </h4>
                  <p className="text-xs text-[#5C6A64] leading-relaxed">
                    സൈറ്റിൽ ഉപയോഗിക്കുന്ന ചിത്രങ്ങൾ വിക്കിമീഡിയ കോമൺസ് (CC BY-SA), സർക്കാർ പബ്ലിക് ഡൊമൈൻ, അല്ലെങ്കിൽ ലൈസൻസ് വ്യക്തമാക്കിയ ഫോട്ടോഗ്രാഫർമാരുടേതായിരിക്കണം. ഓരോ ചിത്രത്തിനും ലൈസൻസ് വിവരങ്ങളും ക്രെഡിറ്റും സൂക്ഷിക്കുന്നു.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: SUBMISSIONS & MODERATION INBOX */}
        {/* ========================================================================= */}
        {activeTab === "submissions" && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 shadow-card">
              <h3 className="font-bold font-malayalam-serif text-base text-[#1A2420] mb-2">
                കമ്യൂണിറ്റിയിൽ നിന്ന് സമർപ്പിക്കപ്പെട്ട വിവരങ്ങൾ ({totalPending})
              </h3>
              <p className="text-xs text-[#5C6A64] mb-6">
                പൊതുജനങ്ങൾ സമർപ്പിച്ച പരിപാടികളും സ്ഥാപന വിവരങ്ങളും പരിശോധിച്ച് അംഗീകരിക്കുകയോ, ഔദ്യോഗിക ഉറവിടം ചേർത്തശേഷം Verified Badge നൽകുകയോ ചെയ്യാം.
              </p>

              {totalPending === 0 ? (
                <div className="text-center py-12 bg-[#FAF7F0] rounded-2xl border border-dashed border-[#DDD5C5]">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <p className="text-xs font-bold text-[#1A2420]">പുതിയ പരിശോധനകൾ ഒന്നും ബാക്കിയില്ല</p>
                  <p className="text-[11px] text-[#7A8880] mt-0.5">എല്ലാ സമർപ്പണങ്ങളും കൃത്യമായി പ്രോസസ്സ് ചെയ്തിട്ടുണ്ട്.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Pending Events */}
                  {pendingEvents.map((ev) => (
                    <div key={ev.id} className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-blue-800 bg-blue-100 px-2.5 py-0.5 rounded-full uppercase">
                            Event Submission
                          </span>
                          <span className="text-xs text-[#7A8880]">{ev.location_name}</span>
                        </div>
                        <h4 className="font-bold text-sm text-[#1A2420] mt-1">{ev.title}</h4>
                        <p className="text-xs text-[#5C6A64] mt-0.5 line-clamp-2">{ev.description}</p>
                        <div className="flex items-center gap-3 text-[11px] text-[#7A8880] mt-2">
                          <span>തീയതി: {new Date(ev.start_date).toLocaleDateString()}</span>
                          <span>സംഘാടകർ: {ev.organizer_name}</span>
                          {ev.contact_phone && <span>ഫോൺ: {ev.contact_phone}</span>}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                        <button
                          onClick={() => setVerifyingTarget({ type: "event", id: ev.id, title: ev.title })}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs"
                        >
                          Verify & Approve ✓
                        </button>
                        <button
                          onClick={() => setRejectingTarget({ type: "event", id: ev.id, title: ev.title })}
                          className="px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold transition"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Pending Businesses */}
                  {pendingBusinesses.map((biz) => (
                    <div key={biz.id} className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full uppercase">
                            Business / Service
                          </span>
                          <span className="text-xs text-[#7A8880]">{biz.category}</span>
                        </div>
                        <h4 className="font-bold text-sm text-[#1A2420] mt-1">{biz.name}</h4>
                        <p className="text-xs text-[#5C6A64] mt-0.5">{biz.address} • ഫോൺ: {biz.phone}</p>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                        <button
                          onClick={() => setVerifyingTarget({ type: "business", id: biz.id, title: biz.name })}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs"
                        >
                          Verify & Badge ✓
                        </button>
                        <button
                          onClick={() => setRejectingTarget({ type: "business", id: biz.id, title: biz.name })}
                          className="px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold transition"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: NEWS & ANNOUNCEMENTS */}
        {/* ========================================================================= */}
        {activeTab === "news" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-bold font-malayalam-serif text-lg text-[#1A2420]">
                താനൂർ & മലപ്പുറം വാർത്തകൾ ({news.length})
              </h3>
              <button
                onClick={() => setIsCreateNewsOpen(true)}
                className="px-4 py-2 rounded-xl bg-[#1B4D36] hover:bg-[#133A28] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>പുതിയ വാർത്ത ചേർക്കുക</span>
              </button>
            </div>

            <div className="space-y-4">
              {news.map((item) => (
                <div key={item.id} className="bg-white rounded-3xl border border-[#EAE4D7] p-5 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-20 h-20 rounded-2xl object-cover shrink-0 border border-[#EAE4D7]"
                    />
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-bold text-[#1B4D36] bg-[#E0F1E7] px-2.5 py-0.5 rounded-full">
                          {item.category}
                        </span>
                        {item.is_verified && (
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            Verified Source ✓
                          </span>
                        )}
                        {item.archived && (
                          <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                            Archived
                          </span>
                        )}
                        <span className="text-xs text-[#7A8880]">{item.date}</span>
                      </div>
                      <h4 className="font-bold text-base text-[#1A2420] mt-1">{item.title}</h4>
                      <p className="text-xs text-[#5C6A64] mt-1 line-clamp-1">{item.summary}</p>
                      <div className="flex items-center gap-2 text-[11px] text-[#7A8880] mt-2">
                        <span>ഉറവിടം: {item.source_name}</span>
                        {item.source_url && (
                          <a
                            href={item.source_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#1B4D36] hover:underline flex items-center gap-0.5"
                          >
                            <span>ലിങ്ക്</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start md:self-center shrink-0">
                    {!item.is_verified && (
                      <button
                        onClick={() => setVerifyingTarget({ type: "news", id: item.id, title: item.title })}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition"
                      >
                        Verify
                      </button>
                    )}
                    {!item.archived && (
                      <button
                        onClick={() => handleArchiveContent("news", item.id, item.title)}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition flex items-center gap-1"
                      >
                        <Archive className="w-3.5 h-3.5" />
                        <span>Archive</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: EVENTS & FESTIVALS */}
        {/* ========================================================================= */}
        {activeTab === "events" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-bold font-malayalam-serif text-lg text-[#1A2420]">
                പരിപാടികളും ഉത്സവങ്ങളും ({events.length})
              </h3>
            </div>

            <div className="space-y-4">
              {events.map((ev) => (
                <div key={ev.id} className="bg-white rounded-3xl border border-[#EAE4D7] p-5 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold uppercase text-[#1B4D36] bg-[#E0F1E7] px-2.5 py-0.5 rounded-full">
                        {ev.category}
                      </span>
                      {ev.is_verified ? (
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          Verified ✓ ({ev.verified_at || "2026-11-17"})
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                          Community Submitted
                        </span>
                      )}
                      <span className="text-xs text-[#7A8880]">{ev.location_name}</span>
                    </div>
                    <h4 className="font-bold text-base text-[#1A2420] mt-1">{ev.title}</h4>
                    <p className="text-xs text-[#5C6A64] mt-0.5">{ev.description}</p>
                    <div className="flex items-center gap-3 text-[11px] text-[#7A8880] mt-2">
                      <span>തീയതി: {new Date(ev.start_date).toLocaleDateString()}</span>
                      <span>സംഘാടകർ: {ev.organizer_name}</span>
                      {ev.source_url && (
                        <a href={ev.source_url} target="_blank" rel="noopener noreferrer" className="text-[#1B4D36] hover:underline flex items-center gap-0.5">
                          <span>ഉറവിടം</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start md:self-center shrink-0">
                    {!ev.is_verified && (
                      <button
                        onClick={() => setVerifyingTarget({ type: "event", id: ev.id, title: ev.title })}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition"
                      >
                        Verify Badge
                      </button>
                    )}
                    {!ev.archived && (
                      <button
                        onClick={() => handleArchiveContent("event", ev.id, ev.title)}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition"
                      >
                        Archive
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: BUSINESSES & SHOPS */}
        {/* ========================================================================= */}
        {activeTab === "businesses" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-bold font-malayalam-serif text-lg text-[#1A2420]">
                വ്യാപാര സ്ഥാപനങ്ങൾ & സേവനങ്ങൾ ({businesses.length})
              </h3>
              <button
                onClick={() => setIsCreateBizOpen(true)}
                className="px-4 py-2 rounded-xl bg-[#1B4D36] hover:bg-[#133A28] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>സ്ഥാപനം ചേർക്കുക</span>
              </button>
            </div>

            <div className="space-y-4">
              {businesses.map((biz) => (
                <div key={biz.id} className="bg-white rounded-3xl border border-[#EAE4D7] p-5 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-[#1B4D36] bg-[#E0F1E7] px-2.5 py-0.5 rounded-full">
                        {biz.category}
                      </span>
                      {biz.is_verified ? (
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          Verified ✓ ({biz.verified_at || "2026-11-17"})
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full">
                          Unverified
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-base text-[#1A2420] mt-1">{biz.name}</h4>
                    <p className="text-xs text-[#5C6A64] mt-0.5">{biz.address} • ഫോൺ: {biz.phone}</p>
                    {biz.source_name && (
                      <span className="text-[11px] text-[#7A8880] mt-1 block">സ്ഥിരീകരിച്ച ഉറവിടം: {biz.source_name}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 self-start md:self-center shrink-0">
                    <button
                      onClick={() => {
                        const newVerified = !biz.is_verified;
                        store.updateBusinessStatus(biz.id, "approved", newVerified, user?.id);
                        refreshAllState();
                        showFeedback(`"${biz.name}" വെരിഫിക്കേഷൻ സ്റ്റാറ്റസ് പുതുക്കി.`);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                        biz.is_verified
                          ? "bg-emerald-600 text-white hover:bg-emerald-700"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                      }`}
                    >
                      {biz.is_verified ? "Verified ✓" : "Verify Badge നൽകുക"}
                    </button>
                    {!biz.archived && (
                      <button
                        onClick={() => handleArchiveContent("business", biz.id, biz.name)}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition"
                      >
                        Archive
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: INSTITUTIONS */}
        {/* ========================================================================= */}
        {activeTab === "institutions" && (
          <div className="space-y-6">
            <h3 className="font-bold font-malayalam-serif text-lg text-[#1A2420]">
              വിദ്യാഭ്യാസ സ്ഥാപനങ്ങൾ ({institutions.length})
            </h3>
            <div className="space-y-4">
              {institutions.map((inst) => (
                <div key={inst.id} className="bg-white rounded-3xl border border-[#EAE4D7] p-5 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-[#1B4D36] bg-[#E0F1E7] px-2.5 py-0.5 rounded-full">
                        {inst.type_ml}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Verified ({inst.verified_at || "2026-11-17"})
                      </span>
                      <span className="text-xs text-[#7A8880]">സ്ഥാപിതം: {inst.established_year}</span>
                    </div>
                    <h4 className="font-bold text-base text-[#1A2420] mt-1">{inst.name_ml} ({inst.name})</h4>
                    <p className="text-xs text-[#5C6A64] mt-0.5">{inst.address} • ഫോൺ: {inst.phone || "—"}</p>
                    <div className="flex items-center gap-3 text-[11px] text-[#7A8880] mt-2">
                      {inst.website && (
                        <a href={inst.website} target="_blank" rel="noopener noreferrer" className="text-[#1B4D36] hover:underline flex items-center gap-0.5">
                          <span>ഔദ്യോഗിക പോർട്ടൽ</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      <span>ഉറവിടം: {inst.source_name}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start md:self-center shrink-0">
                    <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-xl">
                      സജീവ ഡയറക്ടറി ✓
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 7: PUBLIC SERVICES & EMERGENCY */}
        {/* ========================================================================= */}
        {activeTab === "services" && (
          <div className="space-y-6">
            <h3 className="font-bold font-malayalam-serif text-lg text-[#1A2420]">
              താനൂർ പൊതുസേവന & അത്യാഹിത കാര്യാലയങ്ങൾ ({publicServices.length})
            </h3>
            <div className="space-y-4">
              {publicServices.map((srv) => (
                <div key={srv.id} className="bg-white rounded-3xl border border-[#EAE4D7] p-5 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-[#1B4D36] bg-[#E0F1E7] px-2.5 py-0.5 rounded-full">
                        {srv.category_ml}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Official Landline Verified ✓
                      </span>
                    </div>
                    <h4 className="font-bold text-base text-[#1A2420] mt-1">{srv.name_ml} ({srv.name})</h4>
                    <p className="text-xs text-[#5C6A64] mt-0.5">{srv.address} • ഫോൺ: <strong>{srv.phone}</strong> {srv.emergency_number && `(എമർജൻസി: ${srv.emergency_number})`}</p>
                    <p className="text-[11px] text-[#7A8880] mt-1">{srv.working_hours}</p>
                  </div>

                  <div className="flex items-center gap-2 self-start md:self-center shrink-0">
                    {srv.official_link && (
                      <a
                        href={srv.official_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#FAF7F0] text-[#1B4D36] border border-[#DDD5C5] text-xs font-bold transition flex items-center gap-1"
                      >
                        <span>പോർട്ടൽ</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 8: CIVIC ISSUES */}
        {/* ========================================================================= */}
        {activeTab === "issues" && (
          <div className="space-y-4">
            {issues.map((issue) => (
              <div key={issue.id} className="bg-white rounded-3xl border border-[#EAE4D7] p-6 shadow-card space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F3EFE6] pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                      {issue.category}
                    </span>
                    <h3 className="text-base font-bold font-malayalam-serif text-[#1A2420] mt-1">
                      {issue.title}
                    </h3>
                    <span className="text-xs text-[#7A8880]">
                      {issue.location_name} • {new Date(issue.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <span className={`self-start sm:self-center text-xs font-bold px-3 py-1 rounded-full uppercase ${
                    issue.status === "resolved"
                      ? "bg-emerald-100 text-emerald-800"
                      : issue.status === "in_progress"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-amber-100 text-amber-800"
                  }`}>
                    {issue.status}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#4A5750] leading-relaxed">
                  {issue.description}
                </p>

                {issue.official_response && (
                  <div className="p-3.5 rounded-2xl bg-[#E0F1E7] border border-[#BDE3CE] text-xs text-[#1B4D36]">
                    <strong>ഔദ്യോഗിക മറുപടി:</strong> {issue.official_response}
                  </div>
                )}

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <input
                    type="text"
                    placeholder="നഗരസഭാ അധികൃതരുടെ മറുപടി ഇവിടെ രേഖപ്പെടുത്താം..."
                    value={officialResponseInput[issue.id] || ""}
                    onChange={(e) =>
                      setOfficialResponseInput({
                        ...officialResponseInput,
                        [issue.id]: e.target.value,
                      })
                    }
                    className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-none focus:border-[#1B4D36]"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdateIssue(issue.id, "in_progress")}
                      className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs"
                    >
                      In Progress
                    </button>
                    <button
                      onClick={() => handleUpdateIssue(issue.id, "resolved")}
                      className="px-3.5 py-2 rounded-xl bg-[#1B4D36] hover:bg-[#133A28] text-white text-xs font-bold shadow-xs"
                    >
                      Resolved ✓
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 9: POSTS MODERATION */}
        {/* ========================================================================= */}
        {activeTab === "posts" && (
          <div className="space-y-4">
            {posts.map((p) => (
              <div key={p.id} className="bg-white rounded-3xl border border-[#EAE4D7] p-5 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-[#1A2420]">{p.author?.display_name || "Neighbor"}</span>
                  <p className="text-xs text-[#4A5750]">{p.content}</p>
                </div>
                <button
                  onClick={() => {
                    store.deletePost(p.id, user?.id || "admin");
                    refreshAllState();
                    showFeedback("പോസ്റ്റ് നീക്കം ചെയ്തു.");
                  }}
                  className="px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold self-start sm:self-center transition flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>നീക്കം ചെയ്യുക</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 10: AUDIT TRAIL */}
        {/* ========================================================================= */}
        {activeTab === "audit" && (
          <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 shadow-card overflow-x-auto">
            <h3 className="font-bold font-malayalam-serif text-base text-[#1A2420] mb-4">
              ഓഡിറ്റ് രേഖകൾ (Audit Logs & Action Trail)
            </h3>
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#EAE4D7] text-[#7A8880] font-bold">
                  <th className="pb-3">Action</th>
                  <th className="pb-3">Target</th>
                  <th className="pb-3">Target ID</th>
                  <th className="pb-3">Details</th>
                  <th className="pb-3">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3EFE6]">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-[#FAF7F0] transition">
                    <td className="py-3 font-bold text-[#1B4D36]">{log.action}</td>
                    <td className="py-3 text-[#1A2420]">{log.target_type}</td>
                    <td className="py-3 font-mono text-[11px] text-[#7A8880]">{log.target_id ? `${log.target_id.slice(0, 10)}...` : "—"}</td>
                    <td className="py-3 text-[11px] text-[#5C6A64]">
                      {log.details ? JSON.stringify(log.details) : "—"}
                    </td>
                    <td className="py-3 text-[#7A8880]">{new Date(log.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB: RBAC & USER ROLES MANAGEMENT (ADMIN EXCLUSIVE) */}
        {/* ========================================================================= */}
        {((activeTab === "users" && role === "admin") || (activeTab === "users" && (role as any) === "super_admin")) && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 shadow-card">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#F3EFE6] pb-4 mb-6">
                <div>
                  <h2 className="text-base font-bold text-[#194B35] flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#194B35]" />
                    <span>Citizen Accounts & RBAC Role Management</span>
                  </h2>
                  <p className="text-xs text-[#5C6A64] mt-1">
                    Manage municipal user identities, verify credentials, assign role privileges, and control account statuses with an immutable statutory audit trail.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {(role as any) === "super_admin" && (
                    <span className="text-xs font-bold px-3 py-1 bg-purple-100 text-purple-900 rounded-full border border-purple-300">
                      Super Administrator
                    </span>
                  )}
                  <span className="text-xs font-bold px-3 py-1 bg-emerald-50 text-[#194B35] rounded-full border border-emerald-200">
                    {allProfiles.length} Registered Accounts
                  </span>
                </div>
              </div>

              {/* Secure Role Assignment Form */}
              <form onSubmit={handleAssignRole} className="bg-[#FAF7F0] rounded-2xl p-4 sm:p-5 border border-[#EAE4D7] mb-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#194B35]">
                    Assign Verified Role & Privileges
                  </h4>
                  {(role as any) !== "super_admin" && (
                    <span className="text-[10px] text-[#5C6A64] bg-white px-2 py-0.5 rounded-md border border-[#EDE6D8]">
                      Note: Only a Super Administrator can assign Admin or Super Admin privileges.
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-[#5C6A64] block mb-1">Target Citizen / Account</label>
                    <select
                      value={roleChangeTarget}
                      onChange={(e) => setRoleChangeTarget(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-xl text-xs bg-white border border-[#DDD5C5] text-[#1A2420] focus:ring-2 focus:ring-[#194B35]"
                    >
                      <option value="">Select account...</option>
                      {allProfiles.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.display_name} (@{p.username}) — [{p.role}] {p.account_status === "suspended" ? "(Suspended)" : ""}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#5C6A64] block mb-1">New Role Assignment</label>
                    <select
                      value={newRoleSelection}
                      onChange={(e) => setNewRoleSelection(e.target.value as UserRole)}
                      className="w-full px-3 py-2 rounded-xl text-xs bg-white border border-[#DDD5C5] text-[#1A2420] focus:ring-2 focus:ring-[#194B35]"
                    >
                      <option value="citizen">Citizen (Standard Resident)</option>
                      <option value="user">User (Legacy Citizen)</option>
                      <option value="moderator">Moderator (Civic Desk)</option>
                      <option value="verified_org">Verified Org (Municipal Institution)</option>
                      {(role as any) === "super_admin" && (
                        <>
                          <option value="admin">Administrator (Platform Admin)</option>
                          <option value="super_admin">Super Administrator (Chief Custodian)</option>
                        </>
                      )}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#5C6A64] block mb-1">Statutory Reason / Audit Note</label>
                    <input
                      type="text"
                      value={roleChangeReason}
                      onChange={(e) => setRoleChangeReason(e.target.value)}
                      placeholder="e.g. Municipal IT Order No. 2026/04..."
                      required
                      className="w-full px-3 py-2 rounded-xl text-xs bg-white border border-[#DDD5C5] text-[#1A2420] focus:ring-2 focus:ring-[#194B35]"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#194B35] hover:bg-[#133A28] text-white text-xs font-bold transition shadow-xs flex items-center gap-1.5 active:scale-98"
                  >
                    <ShieldCheck className="w-4 h-4 text-amber-300" />
                    <span>Authorize Role Transition</span>
                  </button>
                </div>
              </form>

              {/* User Search & Filter Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
                <div className="w-full sm:w-72 relative">
                  <Search className="w-3.5 h-3.5 text-[#5C6A64] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={userSearchQuery}
                    onChange={(e) => setUserSearchQuery(e.target.value)}
                    placeholder="Search by name, username, or email..."
                    className="w-full pl-9 pr-3 py-2 bg-[#FAF7F0] border border-[#EDE6D8] rounded-xl text-xs text-[#1A2420] focus:outline-hidden focus:ring-2 focus:ring-[#194B35]"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <select
                    value={userRoleFilter}
                    onChange={(e) => setUserRoleFilter(e.target.value)}
                    className="px-3 py-2 bg-[#FAF7F0] border border-[#EDE6D8] rounded-xl text-xs text-[#1A2420]"
                    aria-label="Filter users by role"
                  >
                    <option value="all">All Roles</option>
                    <option value="citizen">Citizen</option>
                    <option value="user">User</option>
                    <option value="moderator">Moderator</option>
                    <option value="verified_org">Verified Org</option>
                    <option value="admin">Administrator</option>
                    <option value="super_admin">Super Admin</option>
                  </select>

                  <select
                    value={userStatusFilter}
                    onChange={(e) => setUserStatusFilter(e.target.value)}
                    className="px-3 py-2 bg-[#FAF7F0] border border-[#EDE6D8] rounded-xl text-xs text-[#1A2420]"
                    aria-label="Filter users by account status"
                  >
                    <option value="all">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                    <option value="deactivated">Deactivated</option>
                  </select>
                </div>
              </div>

              {/* Profiles Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#DDD5C5] text-[#5C6A64]">
                      <th className="py-2.5 font-bold">User Identity</th>
                      <th className="py-2.5 font-bold">Username & Email</th>
                      <th className="py-2.5 font-bold">Assigned Role</th>
                      <th className="py-2.5 font-bold">Account Status</th>
                      <th className="py-2.5 font-bold">Email Verified</th>
                      <th className="py-2.5 font-bold">Reports</th>
                      <th className="py-2.5 font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F3EFE6]">
                    {allProfiles
                      .filter((p) => {
                        if (userRoleFilter !== "all" && p.role !== userRoleFilter) return false;
                        if (userStatusFilter !== "all" && (p.account_status || "active") !== userStatusFilter) return false;
                        if (userSearchQuery.trim()) {
                          const q = userSearchQuery.toLowerCase();
                          const mName = p.display_name?.toLowerCase().includes(q);
                          const mUser = p.username?.toLowerCase().includes(q);
                          const mEmail = p.email?.toLowerCase().includes(q);
                          return mName || mUser || mEmail;
                        }
                        return true;
                      })
                      .map((p) => {
                        const issuesCount = civicStore.getIssues().filter((i: any) => i.reporter_id === p.id || i.reporter_name === p.display_name).length;
                        const isSuspended = p.account_status === "suspended";

                        return (
                          <tr key={p.id} className="hover:bg-[#FAF7F0] transition">
                            <td className="py-3">
                              <div className="font-bold text-[#1A2420]">{p.display_name}</div>
                              <div className="text-[10px] text-[#5C6A64] font-mono">{p.id.slice(0, 18)}...</div>
                            </td>
                            <td className="py-3 text-[#5C6A64]">
                              <div>@{p.username}</div>
                              <div className="text-[10px] text-gray-400">{p.email || "No email linked"}</div>
                            </td>
                            <td className="py-3">
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                p.role === "super_admin"
                                  ? "bg-purple-200 text-purple-900 border border-purple-400"
                                  : p.role === "admin" 
                                  ? "bg-purple-100 text-purple-800 border border-purple-200" 
                                  : p.role === "moderator"
                                  ? "bg-blue-100 text-blue-800 border border-blue-200"
                                  : p.role === "verified_org"
                                  ? "bg-amber-100 text-amber-800 border border-amber-200"
                                  : "bg-[#E0F1E7] text-[#194B35] border border-[#BDE3CE]"
                              }`}>
                                {p.role}
                              </span>
                            </td>
                            <td className="py-3">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 w-fit ${
                                isSuspended
                                  ? "bg-red-100 text-red-800 border border-red-200"
                                  : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                              }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${isSuspended ? "bg-red-600" : "bg-emerald-600"}`} />
                                <span>{isSuspended ? "Suspended" : "Active"}</span>
                              </span>
                            </td>
                            <td className="py-3">
                              <span className={`text-[10px] font-bold ${p.email_verified ? "text-emerald-700" : "text-amber-700"}`}>
                                {p.email_verified ? "✓ Verified" : "⏳ Pending"}
                              </span>
                            </td>
                            <td className="py-3 font-semibold text-[#194B35]">
                              {issuesCount}
                            </td>
                            <td className="py-3">
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => setRoleChangeTarget(p.id)}
                                  className="text-[10px] font-bold text-[#194B35] hover:underline"
                                >
                                  Edit Role
                                </button>
                                <span>•</span>
                                <button
                                  type="button"
                                  onClick={() => handleSetUserStatus(p.id, p.username, isSuspended ? "active" : "suspended")}
                                  className={`text-[10px] font-bold hover:underline ${isSuspended ? "text-emerald-700" : "text-red-600"}`}
                                >
                                  {isSuspended ? "Reactivate" : "Suspend"}
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 11: PROFESSIONALS MANAGEMENT & VERIFICATION (MODULE 13) */}
        {/* ========================================================================= */}
        {activeTab === "pros" && (
          <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 shadow-card space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#F3EFE6] pb-3">
              <div>
                <h2 className="text-base font-bold font-malayalam-serif text-[#1B4D36]">
                  സേവന വിദഗ്ദ്ധരുടെ വെരിഫിക്കേഷൻ & നിയന്ത്രണം (Professionals Directory Management)
                </h2>
                <p className="text-xs text-[#7A8880]">
                  താനൂർ & മലപ്പുറം സേവന ദാതാക്കളുടെ രേഖകളും പദവിയും പരിശോധിക്കുക
                </p>
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-[#E0F1E7] text-[#1B4D36] rounded-full border border-[#BDE3CE]">
                {professionals.length} രജിസ്റ്റർ ചെയ്തവർ
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#DDD5C5] text-[#5C6A64]">
                    <th className="py-2.5 font-bold">പ്രൊഫഷണൽ</th>
                    <th className="py-2.5 font-bold">വിഭാഗം</th>
                    <th className="py-2.5 font-bold">പ്രദേശം</th>
                    <th className="py-2.5 font-bold">തുടക്ക നിരക്ക്</th>
                    <th className="py-2.5 font-bold">റേറ്റിംഗ്</th>
                    <th className="py-2.5 font-bold">പദവി</th>
                    <th className="py-2.5 font-bold text-right">നടപടി (Actions)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F3EFE6]">
                  {professionals.map((p) => (
                    <tr key={p.id} className="hover:bg-[#FAF7F0]/60 transition">
                      <td className="py-3">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={p.avatar_url || "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&auto=format&fit=crop&q=80"}
                            alt={p.display_name}
                            className="w-9 h-9 rounded-xl object-cover border border-[#DDD5C5]"
                          />
                          <div>
                            <span className="font-bold text-[#1A2420] block">{p.display_name}</span>
                            <span className="text-[10px] text-[#7A8880]">@{p.username}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 font-semibold text-[#1B4D36]">{p.category_name}</td>
                      <td className="py-3 text-[#5C6A64]">{p.locality}</td>
                      <td className="py-3 font-mono font-bold text-[#1B4D36]">₹{p.starting_price}</td>
                      <td className="py-3">
                        <span className="inline-flex items-center gap-1 font-bold text-amber-600">
                          ⭐ {p.rating} ({p.reviews_count})
                        </span>
                      </td>
                      <td className="py-3">
                        {p.is_verified ? (
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-300">
                            Verified ✓
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold border border-amber-300">
                            Pending Review
                          </span>
                        )}
                      </td>
                      <td className="py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {!p.is_verified && (
                            <button
                              type="button"
                              onClick={() => handleVerifyPro(p.id)}
                              className="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold shadow-xs transition"
                            >
                              Verify Badge നൽകുക ✓
                            </button>
                          )}
                          <Link
                            href={`/professionals/${p.username}`}
                            target="_blank"
                            className="p-1.5 rounded-lg bg-[#FAF7F0] hover:bg-[#F3EFE6] border border-[#DDD5C5] text-[#1B4D36]"
                            title="പ്രൊഫൈൽ കാണുക"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 12: SERVICE CATEGORIES MANAGEMENT (MODULE 13) */}
        {/* ========================================================================= */}
        {activeTab === "categories" && (
          <div className="space-y-6">
            {/* Add New Category Form */}
            <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 shadow-card space-y-4">
              <h2 className="text-base font-bold font-malayalam-serif text-[#1B4D36] border-b border-[#F3EFE6] pb-3 flex items-center gap-2">
                <Plus className="w-4 h-4 text-emerald-600" />
                <span>പുതിയ സേവന വിഭാഗം ചേർക്കുക (Add Service Category)</span>
              </h2>

              <form onSubmit={handleAddCategory} className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="block font-bold text-[#1A2420] mb-1">ഇംഗ്ലീഷ് പേര് (Name) *</label>
                  <input
                    type="text"
                    required
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    placeholder="e.g. Solar Technician"
                    className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#1A2420] mb-1">മലയാളം പേര് (Malayalam) *</label>
                  <input
                    type="text"
                    required
                    value={newCatNameMl}
                    onChange={(e) => setNewCatNameMl(e.target.value)}
                    placeholder="ഉദാ: സോളാർ ടെക്നീഷ്യൻ"
                    className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#1A2420] mb-1">സ്ലഗ് (Slug URL) *</label>
                  <input
                    type="text"
                    required
                    value={newCatSlug}
                    onChange={(e) => setNewCatSlug(e.target.value)}
                    placeholder="solar-technician"
                    className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0]"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#1B4D36] hover:bg-[#143B29] text-white font-bold transition shadow-xs"
                  >
                    വിഭാഗം ചേർക്കുക +
                  </button>
                </div>
              </form>
            </div>

            {/* Existing Categories Table */}
            <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 shadow-card space-y-4">
              <div className="flex items-center justify-between border-b border-[#F3EFE6] pb-3">
                <h3 className="font-bold text-sm text-[#1B4D36] font-malayalam-serif">
                  നിലവിലുള്ള 18 പ്രധാന സേവന വിഭാഗങ്ങൾ (18 Core Service Categories)
                </h3>
                <span className="text-xs font-bold text-[#B87A1E]">ആകെ: {serviceCategories.length}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {serviceCategories.map((c) => (
                  <div
                    key={c.id}
                    className="p-3.5 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7] space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-[#1A2420]">{c.name_ml}</span>
                      <span className="text-[10px] text-[#7A8880] font-mono">#{c.display_order}</span>
                    </div>
                    <span className="text-[11px] text-[#1B4D36] block">{c.name}</span>
                    <span className="text-[10px] text-[#7A8880] block truncate">{c.description}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 13: REVIEWS & REPUTATION MODERATION (MODULE 13) */}
        {/* ========================================================================= */}
        {activeTab === "reviews" && (
          <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between border-b border-[#F3EFE6] pb-3">
              <div>
                <h2 className="text-base font-bold font-malayalam-serif text-[#1B4D36]">
                  അവലോകന മോഡറേഷൻ (Customer Reviews Moderation)
                </h2>
                <p className="text-xs text-[#7A8880]">
                  പൂർത്തിയായ സർവീസ് ബുക്കിംഗുകളിൽ സമർപ്പിച്ച റേറ്റിംഗുകൾ നിരീക്ഷിക്കുക
                </p>
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-[#FAF4E6] text-[#8C5B0F] rounded-full border border-[#E8DCBF]">
                {allReviews.length} അവലോകനങ്ങൾ
              </span>
            </div>

            <div className="space-y-3">
              {allReviews.map((r) => {
                const pro = store.getProfessionalById(r.professional_id);
                return (
                  <div
                    key={r.id}
                    className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7] space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#1A2420]">{r.customer_name}</span>
                        <span className="text-[#7A8880]">→</span>
                        <span className="font-bold text-[#1B4D36]">{pro?.display_name || "Professional"}</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500 font-bold">
                        ⭐ {r.rating_overall} / 5
                      </div>
                    </div>

                    <p className="text-[#3E4D45] italic">&ldquo;{r.comment}&rdquo;</p>

                    <div className="flex items-center justify-between text-[10px] text-[#7A8880] pt-1 border-t border-[#EAE4D7]">
                      <span>ബുക്കിംഗ് ID: {r.booking_id} • തീയതി: {new Date(r.created_at).toLocaleDateString()}</span>
                      <span className="text-emerald-700 font-semibold">✓ Verified Completion</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB: DEVELOPMENT PROJECTS (TRANSPARENT TANUR) */}
        {/* ========================================================================= */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#143E2C] text-amber-300">
                    TRANSPARENT TANUR
                  </span>
                  <span className="text-xs text-[#7A8880] font-semibold">ഔദ്യോഗിക ബജറ്റ്: ₹86.60 കോടി</span>
                </div>
                <h2 className="text-lg font-bold font-malayalam-serif text-[#1A2420] mt-1">
                  താനൂർ നഗരസഭാ വികസന പദ്ധതികൾ ({devProjects.length})
                </h2>
                <p className="text-xs text-[#5C6A64] mt-0.5">
                  നഗരസഭ, PWD, ഹാർബർ എഞ്ചിനീയറിംഗ്, KWA എന്നിവയുടെ നേതൃത്വത്തിൽ നടക്കുന്ന വികസന പ്രവർത്തനങ്ങളും പരിശോധനാ രേഖകളും.
                </p>
              </div>

              <Link
                href="/tanur/development"
                target="_blank"
                className="px-4 py-2 rounded-xl bg-[#FAF7F0] hover:bg-[#F3EFE6] text-[#143E2C] text-xs font-bold border border-[#DDD5C5] transition flex items-center gap-1.5 self-start sm:self-auto"
              >
                <span>പബ്ലിക് ട്രാക്കർ കാണുക</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-4">
              {devProjects.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-3xl border border-[#EAE4D7] p-6 shadow-card space-y-4"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="px-2 py-0.5 rounded-md font-bold bg-[#FAF7F0] text-[#143E2C] border border-[#DDD5C5]">
                          {p.category_name_ml || p.category}
                        </span>
                        <span className="px-2 py-0.5 rounded-md font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {p.budget_sanctioned}
                        </span>
                        {p.ward_number ? (
                          <span className="text-[#5C6A64]">വാർഡ്: {p.ward_number} ({p.ward_name_ml || p.ward_name})</span>
                        ) : (
                          <span className="text-[#5C6A64]">മുനിസിപ്പാലിറ്റി വ്യാപകം</span>
                        )}
                      </div>

                      <h3 className="font-bold text-base text-[#1A2420] font-malayalam-serif">
                        {p.title_ml || p.title}
                      </h3>
                      <p className="text-xs text-[#5C6A64]">{p.title}</p>
                      <p className="text-xs text-[#3E4D45] leading-relaxed pt-1">
                        {p.description_ml || p.description}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <div className="flex items-center gap-2">
                        <label className="text-[11px] font-bold text-[#7A8880]">സ്ഥിതി:</label>
                        <select
                          value={p.status}
                          onChange={(e) => handleUpdateProjectStatus(p.id, e.target.value as ProjectStatus)}
                          className="px-3 py-1.5 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-xs font-bold text-[#143E2C]"
                        >
                          <option value="In Progress">In Progress (പുരോഗതിയിൽ)</option>
                          <option value="Approved">Approved (അംഗീകരിച്ചു)</option>
                          <option value="Completed">Completed (പൂർത്തിയായി)</option>
                          <option value="Proposed">Proposed (നിർദ്ദേശിച്ചത്)</option>
                          <option value="Delayed">Delayed (തടസ്സപ്പെട്ടത്)</option>
                        </select>
                      </div>

                      <button
                        onClick={() => setSelectedProjectForMilestone(selectedProjectForMilestone === p.id ? null : p.id)}
                        className="px-3.5 py-1.5 rounded-xl bg-[#143E2C] hover:bg-[#0D281D] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>പുരോഗതി രേഖപ്പെടുത്തുക</span>
                      </button>
                    </div>
                  </div>

                  {/* Progress Bar & Source Meta */}
                  <div className="pt-2 border-t border-[#F3EFE6] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#7A8880] font-medium">ഔദ്യോഗിക പുരോഗതി</span>
                      <span className="font-bold text-[#143E2C]">{p.progress_percentage ?? 0}%</span>
                    </div>
                    <div className="w-full bg-[#EAE4D7] rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-emerald-600 h-2 rounded-full transition-all"
                        style={{ width: `${p.progress_percentage ?? 0}%` }}
                      />
                    </div>
                    <div className="flex flex-wrap items-center justify-between text-[11px] text-[#7A8880] pt-1">
                      <span>ഡിപ്പാർട്ട്മെന്റ്: <strong>{p.department_ml || p.department}</strong></span>
                      <a
                        href={p.official_source_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#143E2C] hover:underline flex items-center gap-1 font-semibold"
                      >
                        <span>ഉറവിടം: {p.official_source_name}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* Milestone Addition Form (Conditional) */}
                  {selectedProjectForMilestone === p.id && (
                    <form
                      onSubmit={(e) => handleAddMilestoneSubmit(e, p.id)}
                      className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#DDD5C5] space-y-3 animate-in fade-in text-xs"
                    >
                      <div className="font-bold text-[#143E2C] flex items-center gap-1.5">
                        <HardHat className="w-4 h-4 text-emerald-700" />
                        <span>പുതിയ പുരോഗതി ഘട്ടവും പരിശോധനാ രേഖകളും ചേർക്കുക</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="font-bold text-[#1A2420] block mb-1">ഘട്ടത്തിന്റെ തലക്കെട്ട് (Title)</label>
                          <input
                            type="text"
                            required
                            placeholder="ഉദാ: കോൺക്രീറ്റിംഗ് പൂർത്തിയായി / ട്രയൽ റൺ വിജയം"
                            value={milestoneForm.title}
                            onChange={(e) => setMilestoneForm({ ...milestoneForm, title: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-white"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-[#1A2420] block mb-1">പുരോഗതി ശതമാനം (%)</label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            required
                            value={milestoneForm.progress_percentage}
                            onChange={(e) => setMilestoneForm({ ...milestoneForm, progress_percentage: Number(e.target.value) })}
                            className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="font-bold text-[#1A2420] block mb-1">വിശദാംശങ്ങൾ (Description)</label>
                        <textarea
                          rows={2}
                          required
                          placeholder="ഘട്ടത്തിന്റെ പുരോഗതി വിശദാംശങ്ങൾ..."
                          value={milestoneForm.description}
                          onChange={(e) => setMilestoneForm({ ...milestoneForm, description: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-white"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <label className="font-bold text-[#1A2420] block mb-1">പരിശോധനാ ഏജൻസി (Verifying Authority)</label>
                          <input
                            type="text"
                            required
                            value={milestoneForm.verifying_authority}
                            onChange={(e) => setMilestoneForm({ ...milestoneForm, verifying_authority: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-white"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-[#1A2420] block mb-1">പരിശോധനാ തീയതി (Inspection Date)</label>
                          <input
                            type="date"
                            required
                            value={milestoneForm.inspection_date}
                            onChange={(e) => setMilestoneForm({ ...milestoneForm, inspection_date: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-white"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-[#1A2420] block mb-1">ഔദ്യോഗിക തെളിവ് ലിങ്ക് (Evidence URL)</label>
                          <input
                            type="url"
                            required
                            placeholder="https://pwd.kerala.gov.in/..."
                            value={milestoneForm.evidence_url}
                            onChange={(e) => setMilestoneForm({ ...milestoneForm, evidence_url: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-white"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setSelectedProjectForMilestone(null)}
                          className="px-3.5 py-1.5 rounded-xl border border-[#DDD5C5] text-[#5C6A64] font-bold"
                        >
                          റദ്ദാക്കുക
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold shadow-xs"
                        >
                          രേഖപ്പെടുത്തുക ✓
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Past Progress Milestones List */}
                  {p.progress_updates && p.progress_updates.length > 0 && (
                    <div className="pt-2 border-t border-[#F3EFE6] space-y-2">
                      <div className="text-[11px] font-bold text-[#7A8880] uppercase">പരിശോധനാ ചരിത്രം ({p.progress_updates.length})</div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                        {p.progress_updates.map((upd) => (
                          <div key={upd.id} className="p-3 rounded-xl bg-[#FAF7F0] border border-[#EAE4D7] space-y-1">
                            <div className="flex items-center justify-between font-bold text-[#1A2420]">
                              <span>{upd.title_ml || upd.title}</span>
                              <span className="text-emerald-700 font-semibold">{upd.date}</span>
                            </div>
                            <p className="text-[11px] text-[#5C6A64]">{upd.note_ml || upd.note}</p>
                            <div className="flex items-center justify-between text-[10px] text-[#7A8880] pt-1 border-t border-[#EAE4D7]">
                              <span>{upd.verified_by}</span>
                              {upd.evidence_url && (
                                <a
                                  href={upd.evidence_url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-[#143E2C] hover:underline flex items-center gap-0.5 font-bold"
                                >
                                  <span>രേഖ</span>
                                  <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB: CITIZEN PROPOSALS / PEOPLE'S VOICE (PEOPLE-POWERED TANUR) */}
        {/* ========================================================================= */}
        {activeTab === "proposals" && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#C39A5B] text-[#143E2C]">
                    PEOPLE-POWERED TANUR
                  </span>
                  <span className="text-xs text-[#7A8880] font-semibold">ജനകീയ ശബ്ദം</span>
                </div>
                <h2 className="text-lg font-bold font-malayalam-serif text-[#1A2420] mt-1">
                  പൗരന്മാരുടെ ജനകീയ നിർദ്ദേശങ്ങൾ ({citizenProposals.length})
                </h2>
                <p className="text-xs text-[#5C6A64] mt-0.5">
                  താനൂർ നഗരസഭയിലെ പൗരന്മാർ സമർപ്പിച്ച കമ്മ്യൂണിറ്റി വികസന നിർദ്ദേശങ്ങളും അവയ്ക്കുള്ള ഔദ്യോഗിക ഭരണകൂട മറുപടികളും.
                </p>
              </div>

              <Link
                href="/tanur/voice"
                target="_blank"
                className="px-4 py-2 rounded-xl bg-[#FAF7F0] hover:bg-[#F3EFE6] text-[#143E2C] text-xs font-bold border border-[#DDD5C5] transition flex items-center gap-1.5 self-start sm:self-auto"
              >
                <span>പബ്ലിക് പോർട്ടൽ കാണുക</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-4">
              {citizenProposals.map((prop) => {
                const currentResp = proposalResponseInput[prop.id] || {
                  status: prop.status,
                  response: prop.official_response || "",
                  responderName: prop.official_responder_name || "താനൂർ നഗരസഭ സെക്രട്ടറി",
                  responderRole: prop.official_responder_role || "താനൂർ നഗരസഭാ കാര്യാലയം",
                };

                return (
                  <div
                    key={prop.id}
                    className="bg-white rounded-3xl border border-[#EAE4D7] p-6 shadow-card space-y-4"
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span className="px-2 py-0.5 rounded-md font-mono font-bold bg-amber-50 text-amber-900 border border-amber-200">
                            {prop.tracking_id}
                          </span>
                          <span className="px-2 py-0.5 rounded-md font-semibold bg-[#FAF7F0] text-[#143E2C] border border-[#DDD5C5]">
                            {prop.category}
                          </span>
                          <span className="text-[#5C6A64]">
                            വാർഡ് {prop.ward_number}: {prop.locality_ml || prop.locality}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#143E2C] text-white flex items-center gap-1">
                            ❤️ {prop.support_count} പിന്തുണ
                          </span>
                        </div>

                        <h3 className="font-bold text-base text-[#1A2420] font-malayalam-serif">
                          {prop.title_ml || prop.title}
                        </h3>
                        <p className="text-xs text-[#5C6A64]">{prop.title}</p>
                        <p className="text-xs text-[#3E4D45] leading-relaxed pt-1">
                          {prop.summary_ml || prop.summary}
                        </p>
                        <div className="text-[11px] text-[#7A8880] pt-1">
                          സമർപ്പിച്ചത്: <strong>{prop.author_name}</strong> • തീയതി: {new Date(prop.created_at).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          prop.status === "budget_allocated" ? "bg-emerald-100 text-emerald-800" :
                          prop.status === "feasibility_study" ? "bg-blue-100 text-blue-800" :
                          prop.status === "under_municipal_review" ? "bg-purple-100 text-purple-800" :
                          prop.status === "community_supported" ? "bg-amber-100 text-amber-800" :
                          "bg-slate-100 text-slate-800"
                        }`}>
                          {prop.status}
                        </span>
                      </div>
                    </div>

                    {/* Official Municipal Response Section */}
                    <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#DDD5C5] space-y-3 text-xs">
                      <div className="flex items-center justify-between font-bold text-[#143E2C]">
                        <span className="flex items-center gap-1.5">
                          <Building className="w-4 h-4 text-emerald-700" />
                          ഔദ്യോഗിക നഗരസഭാ നടപടി / മറുപടി
                        </span>
                        {prop.official_response_date && (
                          <span className="text-[10px] text-[#7A8880] font-normal">
                            അവസാനം രേഖപ്പെടുത്തിയത്: {prop.official_response_date}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <label className="font-bold text-[#1A2420] block mb-1">ഘട്ടം (Status)</label>
                          <select
                            value={currentResp.status}
                            onChange={(e) => setProposalResponseInput({
                              ...proposalResponseInput,
                              [prop.id]: { ...currentResp, status: e.target.value as ProposalStatus }
                            })}
                            className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-white font-semibold"
                          >
                            <option value="submitted">submitted (സമർപ്പിച്ചു)</option>
                            <option value="community_supported">community_supported (50+ പിന്തുണ ലഭിച്ചു)</option>
                            <option value="under_municipal_review">under_municipal_review (നഗരസഭാ പരിശോധനയിൽ)</option>
                            <option value="feasibility_study">feasibility_study (സാധ്യതാ പഠനം നടക്കുന്നു)</option>
                            <option value="budget_allocated">budget_allocated (ബജറ്റ് വകയിരുത്തി)</option>
                            <option value="closed">closed (തീർപ്പാക്കി)</option>
                          </select>
                        </div>

                        <div>
                          <label className="font-bold text-[#1A2420] block mb-1">മറുപടി നൽകുന്ന ഉദ്യോഗസ്ഥൻ</label>
                          <input
                            type="text"
                            value={currentResp.responderName}
                            onChange={(e) => setProposalResponseInput({
                              ...proposalResponseInput,
                              [prop.id]: { ...currentResp, responderName: e.target.value }
                            })}
                            className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-white"
                          />
                        </div>

                        <div>
                          <label className="font-bold text-[#1A2420] block mb-1">പദവി (Role/Office)</label>
                          <input
                            type="text"
                            value={currentResp.responderRole}
                            onChange={(e) => setProposalResponseInput({
                              ...proposalResponseInput,
                              [prop.id]: { ...currentResp, responderRole: e.target.value }
                            })}
                            className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="font-bold text-[#1A2420] block mb-1">ഔദ്യോഗിക നഗരസഭാ തീരുമാനം / വിശദീകരണം</label>
                        <textarea
                          rows={2}
                          placeholder="നഗരസഭാ കൗൺസിൽ തീരുമാനം, എഞ്ചിനീയറിംഗ് റിപ്പോർട്ട് അല്ലെങ്കിൽ നടപടിക്രമങ്ങൾ രേഖപ്പെടുത്തുക..."
                          value={currentResp.response}
                          onChange={(e) => setProposalResponseInput({
                            ...proposalResponseInput,
                            [prop.id]: { ...currentResp, response: e.target.value }
                          })}
                          className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-white"
                        />
                      </div>

                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => handleProposalResponseSubmit(prop.id)}
                          className="px-4 py-2 rounded-xl bg-[#143E2C] hover:bg-[#0D281D] text-white font-bold transition shadow-xs"
                        >
                          ഔദ്യോഗിക മറുപടി രേഖപ്പെടുത്തുക ✓
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB: DIGITAL TANUR GIS LOCATIONS & FACILITIES MANAGEMENT */}
        {/* ========================================================================= */}
        {activeTab === "locations" && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#1B4D36] text-white">
                    DIGITAL TANUR GIS
                  </span>
                  <span className="text-xs text-[#7A8880] font-semibold">താനൂർ നഗരസഭ ജി.ഐ.എസ് ഭൂപടം</span>
                </div>
                <h2 className="text-lg font-bold font-malayalam-serif text-[#1A2420] mt-1">
                  ഡിജിറ്റൽ താനൂർ പൊതു സ്ഥാപനങ്ങൾ & സേവനങ്ങൾ ({gisLocations.length})
                </h2>
                <p className="text-xs text-[#5C6A64] mt-0.5">
                  താനൂർ നഗരസഭയിലെ ജി.ഐ.എസ് കോർഡിനേറ്റുകൾ, പരിശോധനാ നില, ഔദ്യോഗിക വിവരങ്ങൾ എന്നിവ നിയന്ത്രിക്കുക.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/digital-tanur"
                  target="_blank"
                  className="px-4 py-2 rounded-xl bg-[#FAF7F0] hover:bg-[#F3EFE6] text-[#143E2C] text-xs font-bold border border-[#DDD5C5] transition flex items-center gap-1.5"
                >
                  <span>ലൈവ് മാപ്പ് കാണുക</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
                <button
                  type="button"
                  onClick={() => setIsAddLocationOpen(!isAddLocationOpen)}
                  className="px-4 py-2 rounded-xl bg-[#1B4D36] hover:bg-[#143d2b] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>പുതിയ സ്ഥാപനം ചേർക്കുക</span>
                </button>
              </div>
            </div>

            {/* Add Location Form Modal/Card */}
            {isAddLocationOpen && (
              <form onSubmit={handleCreateLocationSubmit} className="bg-white rounded-3xl border-2 border-[#1B4D36] p-6 shadow-card space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-[#EAE4D7]">
                  <h3 className="font-bold text-sm text-[#1B4D36] flex items-center gap-2">
                    <Plus className="w-4 h-4 text-[#C39A5B]" />
                    <span>പുതിയ ഡിജിറ്റൽ താനൂർ ജി.ഐ.എസ് പോയിന്റ് ചേർക്കുക</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsAddLocationOpen(false)}
                    className="text-neutral-400 hover:text-neutral-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-[#1A2420] block mb-1">സ്ഥാപനത്തിന്റെ പേര് (English) *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tanur Municipality Office"
                      value={newLocationForm.name}
                      onChange={(e) => setNewLocationForm({ ...newLocationForm, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0]"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-[#1A2420] block mb-1">സ്ഥാപനത്തിന്റെ പേര് (മലയാളം) *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. താനൂർ നഗരസഭാ കാര്യാലയം"
                      value={newLocationForm.name_ml}
                      onChange={(e) => setNewLocationForm({ ...newLocationForm, name_ml: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#1A2420] block mb-1">വിഭാഗം (Category)</label>
                    <select
                      value={newLocationForm.category}
                      onChange={(e) => {
                        const catKey = e.target.value as LocationCategoryKey;
                        const catObj = TANUR_LOCATION_CATEGORIES.find(c => c.key === catKey);
                        setNewLocationForm({
                          ...newLocationForm,
                          category: catKey,
                          category_name: catObj?.label || "Government Offices",
                          category_name_ml: catObj?.label_ml || "സർക്കാർ ഓഫീസുകൾ",
                        });
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0]"
                    >
                      {TANUR_LOCATION_CATEGORIES.map((c) => (
                        <option key={c.key} value={c.key}>
                          {c.label_ml} ({c.label})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-[#1A2420] block mb-1">വാർഡ് നമ്പർ (Ward 1-45)</label>
                    <input
                      type="number"
                      min={1}
                      max={45}
                      value={newLocationForm.ward_number}
                      onChange={(e) => setNewLocationForm({ ...newLocationForm, ward_number: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#1A2420] block mb-1">പ്രദേശം (Locality)</label>
                    <input
                      type="text"
                      placeholder="e.g. Tanur Town / Harbour"
                      value={newLocationForm.locality}
                      onChange={(e) => setNewLocationForm({ ...newLocationForm, locality: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0]"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-[#1A2420] block mb-1">പ്രദേശം (മലയാളം)</label>
                    <input
                      type="text"
                      placeholder="e.g. താനൂർ ടൗൺ / ഹാർബർ"
                      value={newLocationForm.locality_ml}
                      onChange={(e) => setNewLocationForm({ ...newLocationForm, locality_ml: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#1A2420] block mb-1">ലാറ്റിറ്റ്യൂഡ് (Latitude: ~10.97)</label>
                    <input
                      type="number"
                      step="0.0001"
                      value={newLocationForm.latitude}
                      onChange={(e) => setNewLocationForm({ ...newLocationForm, latitude: parseFloat(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0]"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-[#1A2420] block mb-1">ലോഞ്ചിറ്റ്യൂഡ് (Longitude: ~75.86)</label>
                    <input
                      type="number"
                      step="0.0001"
                      value={newLocationForm.longitude}
                      onChange={(e) => setNewLocationForm({ ...newLocationForm, longitude: parseFloat(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#1A2420] block mb-1">ഫോൺ നമ്പർ</label>
                    <input
                      type="text"
                      placeholder="e.g. 0494 2440228"
                      value={newLocationForm.phone}
                      onChange={(e) => setNewLocationForm({ ...newLocationForm, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0]"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-[#1A2420] block mb-1">പ്രവർത്തന സമയം (Opening Hours)</label>
                    <input
                      type="text"
                      placeholder="e.g. 10:00 AM - 5:00 PM"
                      value={newLocationForm.opening_hours}
                      onChange={(e) => setNewLocationForm({ ...newLocationForm, opening_hours: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0]"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="font-bold text-[#1A2420] block mb-1">വിവരണം (Description)</label>
                    <textarea
                      rows={2}
                      value={newLocationForm.description}
                      onChange={(e) => setNewLocationForm({ ...newLocationForm, description: e.target.value, description_ml: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0]"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddLocationOpen(false)}
                    className="px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-[#1A2420] text-xs font-semibold"
                  >
                    റദ്ദാക്കുക
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#1B4D36] hover:bg-[#143d2b] text-white text-xs font-bold shadow-xs"
                  >
                    സ്ഥാപനം സൂചികയിൽ ചേർക്കുക ✓
                  </button>
                </div>
              </form>
            )}

            {/* Filter & Search Bar */}
            <div className="bg-white rounded-3xl border border-[#EAE4D7] p-4 shadow-card flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-[#7A8880] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="സ്ഥാപനമോ പ്രദേശമോ തിരയുക..."
                  value={locationSearchFilter}
                  onChange={(e) => setLocationSearchFilter(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0]"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto scrollbar-none">
                <button
                  type="button"
                  onClick={() => setLocationCategoryFilter("all")}
                  className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap ${
                    locationCategoryFilter === "all" ? "bg-[#1B4D36] text-white" : "bg-[#FAF7F0] text-[#5C6A64]"
                  }`}
                >
                  എല്ലാം ({gisLocations.length})
                </button>
                {TANUR_LOCATION_CATEGORIES.map((c) => (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => setLocationCategoryFilter(c.key as LocationCategoryKey)}
                    className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap ${
                      locationCategoryFilter === c.key ? "bg-[#1B4D36] text-white" : "bg-[#FAF7F0] text-[#5C6A64]"
                    }`}
                  >
                    {c.label_ml}
                  </button>
                ))}
              </div>
            </div>

            {/* Locations List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {gisLocations
                .filter((loc) => {
                  if (locationCategoryFilter !== "all" && loc.category !== locationCategoryFilter) return false;
                  if (locationSearchFilter.trim()) {
                    const q = locationSearchFilter.toLowerCase();
                    return (
                      loc.name.toLowerCase().includes(q) ||
                      loc.name_ml.toLowerCase().includes(q) ||
                      loc.locality.toLowerCase().includes(q) ||
                      loc.locality_ml.toLowerCase().includes(q)
                    );
                  }
                  return true;
                })
                .map((loc) => {
                  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${loc.latitude},${loc.longitude}`;

                  return (
                    <div
                      key={loc.id}
                      className="bg-white rounded-2xl border border-[#EAE4D7] p-5 shadow-card flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#1B4D36]/10 text-[#1B4D36]">
                            {loc.category_name_ml}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleToggleLocationVerification(loc.id, loc.is_verified)}
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 transition ${
                              loc.is_verified
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                : "bg-neutral-100 text-neutral-600 hover:bg-emerald-50"
                            }`}
                          >
                            <ShieldCheck className="w-3 h-3 text-emerald-600" />
                            <span>{loc.is_verified ? "Verified ✓" : "Unverified"}</span>
                          </button>
                        </div>

                        <h4 className="font-bold text-sm text-[#1A2420] font-malayalam-serif">
                          {loc.name_ml}
                        </h4>
                        <div className="text-[11px] text-[#5C6A64]">{loc.name}</div>

                        <div className="mt-3 space-y-1 text-xs text-[#5C6A64]">
                          <div>📍 വാർഡ് {loc.ward_number || "-"}: {loc.locality_ml}</div>
                          <div className="font-mono text-[11px]">🌐 {loc.latitude.toFixed(4)}, {loc.longitude.toFixed(4)}</div>
                          {loc.phone && <div>📞 {loc.phone}</div>}
                          {loc.opening_hours && <div>🕒 {loc.opening_hours}</div>}
                        </div>

                        <div className="mt-2.5 pt-2 border-t border-[#F3EFE6] text-[10px] text-[#7A8880] flex items-center justify-between">
                          <span>ഉറവിടം: {loc.source_name}</span>
                          <span>{loc.last_verified_date}</span>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#F3EFE6] flex items-center justify-between gap-2">
                        <a
                          href={directionsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-bold text-[#1B4D36] hover:text-[#C39A5B] flex items-center gap-1"
                        >
                          <Navigation className="w-3.5 h-3.5" />
                          <span>റൂട്ട് പരിശോധിക്കുക</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => handleToggleLocationVerification(loc.id, loc.is_verified)}
                          className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-[#FAF7F0] hover:bg-[#F3EFE6] text-[#143E2C] border border-[#DDD5C5]"
                        >
                          {loc.is_verified ? "പരിശോധന റദ്ദാക്കുക" : "പരിശോധിച്ചുറപ്പിക്കുക"}
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

      </main>

      {/* ========================================================================= */}
      {/* MODAL 1: VERIFICATION & SOURCE ATTRIBUTION MODAL */}
      {/* ========================================================================= */}
      {verifyingTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl border border-[#EAE4D7] max-w-lg w-full p-6 shadow-elevated">
            <div className="flex items-center justify-between pb-4 border-b border-[#F3EFE6]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <h3 className="font-bold text-base text-[#1A2420]">
                  വിവരം സ്ഥിരീകരിക്കുക (Verify Listing)
                </h3>
              </div>
              <button
                onClick={() => setVerifyingTarget(null)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleVerifySubmit} className="mt-4 space-y-4">
              <div className="p-3 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7] text-xs text-[#5C6A64]">
                <strong className="text-[#1A2420] block mb-1">വിഷയം: {verifyingTarget.title}</strong>
                പ്രാഥമിക ഉറവിടം (Primary Official Source) പരിശോധിച്ച ശേഷം മാത്രമേ Verified പദവി നൽകാവൂ.
              </div>

              <div>
                <label className="text-xs font-bold text-[#1A2420] block mb-1">
                  ഔദ്യോഗിക ഉറവിടത്തിന്റെ പേര് (Source Organization)
                </label>
                <input
                  type="text"
                  required
                  placeholder="ഉദാ: താനൂർ നഗരസഭ / കേരള വിനോദസഞ്ചാര വകുപ്പ്"
                  value={verifySourceName}
                  onChange={(e) => setVerifySourceName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-none focus:border-[#1B4D36]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#1A2420] block mb-1">
                  ഉറവിട വെബ് ലിങ്ക് (Source URL)
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://tanurmunicipality.lsgkerala.gov.in/..."
                  value={verifySourceUrl}
                  onChange={(e) => setVerifySourceUrl(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-none focus:border-[#1B4D36]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setVerifyingTarget(null)}
                  className="flex-1 py-2.5 rounded-xl border border-[#DDD5C5] text-xs font-bold text-[#5C6A64] hover:bg-[#FAF7F0]"
                >
                  റദ്ദാക്കുക
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs"
                >
                  Verified Badge നൽകുക ✓
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: REJECTION WITH REASON MODAL */}
      {/* ========================================================================= */}
      {rejectingTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl border border-[#EAE4D7] max-w-md w-full p-6 shadow-elevated">
            <div className="flex items-center justify-between pb-4 border-b border-[#F3EFE6]">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <h3 className="font-bold text-base text-[#1A2420]">
                  സമർപ്പണം നിരസിക്കുക (Reject Submission)
                </h3>
              </div>
              <button
                onClick={() => setRejectingTarget(null)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleRejectSubmit} className="mt-4 space-y-4">
              <p className="text-xs text-[#5C6A64]">
                <strong>{rejectingTarget.title}</strong> നിരസിക്കുന്നതിനുള്ള കാരണം രേഖപ്പെടുത്തുക.
              </p>

              <div>
                <textarea
                  required
                  rows={3}
                  placeholder="ഉദാ: അപൂർണ്ണമായ വിലാസം / തെറ്റായ ഫോൺ നമ്പർ / ഔദ്യോഗിക വിവരങ്ങളുമായി പൊരുത്തപ്പെടുന്നില്ല..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-none focus:border-red-600"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRejectingTarget(null)}
                  className="flex-1 py-2.5 rounded-xl border border-[#DDD5C5] text-xs font-bold text-[#5C6A64]"
                >
                  റദ്ദാക്കുക
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs"
                >
                  നിരസിക്കുക (Reject)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: CREATE OFFICIAL NEWS MODAL */}
      {/* ========================================================================= */}
      {isCreateNewsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-3xl border border-[#EAE4D7] max-w-xl w-full p-6 shadow-elevated my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#F3EFE6]">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#1B4D36]" />
                <h3 className="font-bold text-base text-[#1A2420]">
                  പുതിയ ഔദ്യോഗിക വാർത്ത ചേർക്കുക
                </h3>
              </div>
              <button
                onClick={() => setIsCreateNewsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateNewsSubmit} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="font-bold text-[#1A2420] block mb-1">വാർത്താ തലക്കെട്ട് (Title)</label>
                <input
                  type="text"
                  required
                  placeholder="ഉദാ: താനൂർ ഫിഷിംഗ് ഹാർബർ ആധുനികവൽക്കരണം..."
                  value={newsForm.title}
                  onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#1A2420] block mb-1">വിഭാഗം (Category)</label>
                  <select
                    value={newsForm.category}
                    onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                  >
                    <option value="താനൂർ">താനൂർ</option>
                    <option value="ഭരണം">ഭരണം (Governance)</option>
                    <option value="വിദ്യാഭ്യാസം">വിദ്യാഭ്യാസം (Education)</option>
                    <option value="കായികം">കായികം (Sports)</option>
                    <option value="പൈതൃകം">പൈതൃകം (Heritage)</option>
                    <option value="തീരദേശം">തീരദേശം (Coastal)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#1A2420] block mb-1">ചിത്ര ലൈസൻസ് (License)</label>
                  <input
                    type="text"
                    value={newsForm.image_license}
                    onChange={(e) => setNewsForm({ ...newsForm, image_license: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#1A2420] block mb-1">ചുരുക്കം (Summary)</label>
                <input
                  type="text"
                  required
                  value={newsForm.summary}
                  onChange={(e) => setNewsForm({ ...newsForm, summary: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>

              <div>
                <label className="font-bold text-[#1A2420] block mb-1">പൂർണ്ണ വിവരണം (Full Story)</label>
                <textarea
                  required
                  rows={4}
                  value={newsForm.full_story}
                  onChange={(e) => setNewsForm({ ...newsForm, full_story: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#1A2420] block mb-1">ഉറവിട കാര്യാലയം (Source Name)</label>
                  <input
                    type="text"
                    required
                    value={newsForm.source_name}
                    onChange={(e) => setNewsForm({ ...newsForm, source_name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#1A2420] block mb-1">ഉറവിട വെബ് ലിങ്ക് (Source URL)</label>
                  <input
                    type="url"
                    required
                    value={newsForm.source_url}
                    onChange={(e) => setNewsForm({ ...newsForm, source_url: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#1A2420] block mb-1">ചിത്ര ലിങ്ക് (Image URL)</label>
                <input
                  type="url"
                  required
                  value={newsForm.image_url}
                  onChange={(e) => setNewsForm({ ...newsForm, image_url: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsCreateNewsOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-[#DDD5C5] font-bold text-[#5C6A64]"
                >
                  റദ്ദാക്കുക
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#1B4D36] hover:bg-[#133A28] text-white font-bold shadow-xs"
                >
                  പ്രസിദ്ധീകരിക്കുക ✓
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: CREATE BUSINESS MODAL */}
      {/* ========================================================================= */}
      {isCreateBizOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-3xl border border-[#EAE4D7] max-w-lg w-full p-6 shadow-elevated my-8">
            <div className="flex items-center justify-between pb-4 border-b border-[#F3EFE6]">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#1B4D36]" />
                <h3 className="font-bold text-base text-[#1A2420]">
                  പുതിയ സ്ഥാപനം ചേർക്കുക (Add Business / Service)
                </h3>
              </div>
              <button
                onClick={() => setIsCreateBizOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateBizSubmit} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="font-bold text-[#1A2420] block mb-1">സ്ഥാപനത്തിന്റെ പേര് (Business Name)</label>
                <input
                  type="text"
                  required
                  placeholder="ഉദാ: Malabar Sea Bounty Fish Exports"
                  value={bizForm.name}
                  onChange={(e) => setBizForm({ ...bizForm, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>

              <div>
                <label className="font-bold text-[#1A2420] block mb-1">മേഖല (Category)</label>
                <select
                  value={bizForm.category}
                  onChange={(e) => setBizForm({ ...bizForm, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                >
                  <option value="Fisheries & Seafood">Fisheries & Seafood</option>
                  <option value="Food & Bakery">Food & Bakery</option>
                  <option value="Retail & Crafts">Retail & Crafts</option>
                  <option value="Healthcare & Clinics">Healthcare & Clinics</option>
                  <option value="Home & Maintenance">Home & Maintenance</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-[#1A2420] block mb-1">വിലാസം (Address in Tanur / Malappuram)</label>
                <input
                  type="text"
                  required
                  placeholder="Harbour Road, West Tanur - 676302"
                  value={bizForm.address}
                  onChange={(e) => setBizForm({ ...bizForm, address: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>

              <div>
                <label className="font-bold text-[#1A2420] block mb-1">യഥാർത്ഥ ഫോൺ നമ്പർ (Official Phone)</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 94471 23450 അല്ലെങ്കിൽ 0494 258..."
                  value={bizForm.phone}
                  onChange={(e) => setBizForm({ ...bizForm, phone: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>

              <div>
                <label className="font-bold text-[#1A2420] block mb-1">വിവരണം (Description)</label>
                <textarea
                  required
                  rows={2}
                  value={bizForm.description}
                  onChange={(e) => setBizForm({ ...bizForm, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateBizOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-[#DDD5C5] font-bold text-[#5C6A64]"
                >
                  റദ്ദാക്കുക
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#1B4D36] hover:bg-[#133A28] text-white font-bold shadow-xs"
                >
                  ചേർക്കുക ✓
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
      <BottomNav />
    </div>
  );
}
