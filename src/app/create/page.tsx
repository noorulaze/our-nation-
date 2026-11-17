"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/lib/i18n/context";
import { useCommunity } from "@/lib/community/context";
import { useAuth } from "@/lib/auth/context";
import { store } from "@/lib/data/store";
import { 
  AlertTriangle, 
  Calendar, 
  Briefcase, 
  Megaphone, 
  CheckCircle2, 
  Sparkles,
  MapPin,
  Clock,
  Phone,
  Mail,
  Building2,
  Image as ImageIcon,
  Check
} from "lucide-react";
import { IssueCategory } from "@/types/database";

function CreateContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type") || "issue";

  const { t, language } = useLanguage();
  const { currentCommunity } = useCommunity();
  const { user, role } = useAuth();

  const [formType, setFormType] = useState<"issue" | "event" | "service" | "announcement">(
    ["issue", "event", "service", "announcement"].includes(initialType) ? (initialType as any) : "issue"
  );
  const [isSuccess, setIsSuccess] = useState(false);

  // Form states
  // 1. Issue Report
  const [issueTitle, setIssueTitle] = useState("");
  const [issueDesc, setIssueDesc] = useState("");
  const [issueCategory, setIssueCategory] = useState<IssueCategory>("roads");
  const [issueLocation, setIssueLocation] = useState("");
  const [issueImage, setIssueImage] = useState("");

  // 2. Event
  const [eventTitle, setEventTitle] = useState("");
  const [eventDesc, setEventDesc] = useState("");
  const [eventCategory, setEventCategory] = useState("Culture & Arts");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventOrganizer, setEventOrganizer] = useState("");
  const [eventPhone, setEventPhone] = useState("");
  const [eventImage, setEventImage] = useState("");

  // 3. Business / Service
  const [bizName, setBizName] = useState("");
  const [bizCategory, setBizCategory] = useState("Home & Maintenance");
  const [bizDesc, setBizDesc] = useState("");
  const [bizAddress, setBizAddress] = useState("");
  const [bizPhone, setBizPhone] = useState("");
  const [bizEmail, setBizEmail] = useState("");
  const [bizWebsite, setBizWebsite] = useState("");
  const [bizHours, setBizHours] = useState("09:00 AM - 07:00 PM");

  // 4. Announcement
  const [annTitle, setAnnTitle] = useState("");
  const [annContent, setAnnContent] = useState("");
  const [annOrg, setAnnOrg] = useState("");
  const [annCategory, setAnnCategory] = useState("Public Notice");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const commId = currentCommunity?.id || "40000000-0000-0000-0000-000000000007";

    if (formType === "issue") {
      store.createIssueReport({
        community_id: commId,
        reporter_id: user.id,
        title: issueTitle,
        description: issueDesc,
        category: issueCategory,
        location_name: issueLocation || "Near Tanur Town, Malappuram",
        image_url: issueImage || null,
      });
    } else if (formType === "event") {
      store.createEvent({
        community_id: commId,
        creator_id: user.id,
        title: eventTitle,
        description: eventDesc,
        category: eventCategory,
        location_name: eventLocation || "Community Center",
        start_date: eventDate || new Date().toISOString(),
        organizer_name: eventOrganizer || user.display_name,
        contact_phone: eventPhone,
        image_url: eventImage || null,
      });
    } else if (formType === "service") {
      store.createBusiness({
        community_id: commId,
        owner_id: user.id,
        name: bizName,
        category: bizCategory,
        description: bizDesc,
        address: bizAddress || "Main Road",
        phone: bizPhone,
        email: bizEmail,
        website: bizWebsite,
        opening_hours: { Standard: bizHours },
      });
    } else if (formType === "announcement") {
      store.createAnnouncement({
        community_id: commId,
        publisher_id: user.id,
        title: annTitle,
        content: annContent,
        category: annCategory,
        is_official: true,
        publisher_organization: annOrg || "Local Authority",
      });
    }

    setIsSuccess(true);
    setTimeout(() => {
      if (formType === "issue") router.push("/community");
      else if (formType === "event") router.push("/discover?tab=events");
      else if (formType === "service") router.push("/discover?tab=services");
      else router.push("/community");
    }, 1500);
  };

  const isVerifiedPublisher = role === "verified_org" || role === "moderator" || role === "admin";

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
      <Navbar />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-8">
        
        {/* Title */}
        <div className="mb-6">
          <span className="text-[11px] font-bold text-[#1B4D36] uppercase tracking-wider bg-[#E5DDD0] px-2.5 py-0.5 rounded-full">
            {t("navCreate")}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-malayalam-serif text-[#1B4D36] mt-2">
            {formType === "issue" && t("submitIssueTitle")}
            {formType === "event" && t("submitEvent")}
            {formType === "service" && t("submitService")}
            {formType === "announcement" && "ഔദ്യോഗിക അറിയിപ്പ് പ്രസിദ്ധീകരിക്കൽ"}
          </h1>
          <p className="text-xs text-[#5C6A64] mt-1">
            പ്രദേശം: <strong className="text-[#1A2420]">{currentCommunity ? (language === "ml" ? currentCommunity.name_ml : currentCommunity.name) : "Kerala"}</strong>
          </p>
        </div>

        {/* Type Selector Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
          <button
            type="button"
            onClick={() => setFormType("issue")}
            className={`p-3.5 rounded-2xl border text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition active:scale-95 shadow-xs ${
              formType === "issue"
                ? "bg-[#1B4D36] text-white border-[#1B4D36]"
                : "bg-white text-[#3E4D45] border-[#DDD5C5] hover:bg-[#F3EFE6]"
            }`}
          >
            <AlertTriangle className="w-5 h-5 text-amber-300" />
            <span>{language === "ml" ? "പൊതു പരാതി" : "Civic Issue"}</span>
          </button>

          <button
            type="button"
            onClick={() => setFormType("event")}
            className={`p-3.5 rounded-2xl border text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition active:scale-95 shadow-xs ${
              formType === "event"
                ? "bg-[#1B4D36] text-white border-[#1B4D36]"
                : "bg-white text-[#3E4D45] border-[#DDD5C5] hover:bg-[#F3EFE6]"
            }`}
          >
            <Calendar className="w-5 h-5 text-amber-300" />
            <span>{language === "ml" ? "പരിപാടി" : "Event"}</span>
          </button>

          <button
            type="button"
            onClick={() => setFormType("service")}
            className={`p-3.5 rounded-2xl border text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition active:scale-95 shadow-xs ${
              formType === "service"
                ? "bg-[#1B4D36] text-white border-[#1B4D36]"
                : "bg-white text-[#3E4D45] border-[#DDD5C5] hover:bg-[#F3EFE6]"
            }`}
          >
            <Briefcase className="w-5 h-5 text-amber-300" />
            <span>{language === "ml" ? "സ്ഥാപനം / സേവനം" : "Service"}</span>
          </button>

          <button
            type="button"
            onClick={() => setFormType("announcement")}
            className={`p-3.5 rounded-2xl border text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition active:scale-95 shadow-xs ${
              formType === "announcement"
                ? "bg-[#1B4D36] text-white border-[#1B4D36]"
                : "bg-white text-[#3E4D45] border-[#DDD5C5] hover:bg-[#F3EFE6]"
            }`}
          >
            <Megaphone className="w-5 h-5 text-amber-300" />
            <span>{language === "ml" ? "അറിയിപ്പ്" : "Notice"}</span>
          </button>
        </div>

        {/* Success Alert */}
        {isSuccess && (
          <div className="mb-6 p-4 rounded-2xl bg-[#1B4D36] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-lg animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-amber-300" />
            <span>വിവരങ്ങൾ വിജയകരമായി സമർപ്പിച്ചു! ബന്ധപ്പെട്ട പേജിലേക്ക് മാറുന്നു...</span>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 1. ISSUE FORM */}
        {/* ========================================================================= */}
        {formType === "issue" && (
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-[#EAE4D7] p-6 sm:p-8 shadow-card space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#1A2420] mb-1">
                പരാതിയുടെ തലക്കെട്ട് *
              </label>
              <input
                type="text"
                required
                value={issueTitle}
                onChange={(e) => setIssueTitle(e.target.value)}
                placeholder="ഉദാ: പൈപ്പ് പൊട്ടി റോഡിൽ വെള്ളക്കെട്ട്"
                className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-none focus:ring-2 focus:ring-[#1B4D36]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#1A2420] mb-1">
                  വിഭാഗം *
                </label>
                <select
                  value={issueCategory}
                  onChange={(e) => setIssueCategory(e.target.value as any)}
                  className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                >
                  <option value="roads">റോഡുകൾ & കുഴികൾ</option>
                  <option value="waste_management">മാലിന്യ സംസ്കരണം</option>
                  <option value="streetlights">തെരുവ് വിളക്കുകൾ</option>
                  <option value="water_supply">കുടിവെള്ളം / പൈപ്പ്</option>
                  <option value="electricity">വൈദ്യുതി തടസ്സം</option>
                  <option value="public_safety">പൊതു സുരക്ഷ</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A2420] mb-1">
                  കൃത്യമായ സ്ഥലം
                </label>
                <input
                  type="text"
                  value={issueLocation}
                  onChange={(e) => setIssueLocation(e.target.value)}
                  placeholder="ഉദാ: പാലാരിവട്ടം ജംഗ്ഷന് സമീപം"
                  className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-none focus:ring-2 focus:ring-[#1B4D36]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1A2420] mb-1">
                വിശദ വിവരങ്ങൾ *
              </label>
              <textarea
                rows={4}
                required
                value={issueDesc}
                onChange={(e) => setIssueDesc(e.target.value)}
                placeholder="പരാതിയെക്കുറിച്ചുള്ള കൂടുതൽ വിവരങ്ങൾ പങ്കുവെക്കൂ..."
                className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-none focus:ring-2 focus:ring-[#1B4D36] resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1A2420] mb-1">
                ചിത്രം (URL)
              </label>
              <input
                type="url"
                value={issueImage}
                onChange={(e) => setIssueImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
              />
              {issueImage && (
                <div className="mt-2 h-36 w-full rounded-xl overflow-hidden border border-[#EAE4D7]">
                  <img src={issueImage} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSuccess}
              className="w-full py-3 rounded-xl bg-[#1B4D36] hover:bg-[#133A28] disabled:opacity-50 text-white font-bold text-xs sm:text-sm transition active:scale-95 shadow-md mt-4"
            >
              പരാതി സമർപ്പിക്കുക
            </button>
          </form>
        )}

        {/* ========================================================================= */}
        {/* 2. EVENT FORM */}
        {/* ========================================================================= */}
        {formType === "event" && (
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-[#EAE4D7] p-6 sm:p-8 shadow-card space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#1A2420] mb-1">
                പരിപാടിയുടെ പേര് *
              </label>
              <input
                type="text"
                required
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                placeholder="ഉദാ: വായനശാല വാർഷികോത്സവം"
                className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-none focus:ring-2 focus:ring-[#1B4D36]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#1A2420] mb-1">
                  വിഭാഗം *
                </label>
                <select
                  value={eventCategory}
                  onChange={(e) => setEventCategory(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                >
                  <option value="Culture & Arts">കല & സംസ്കാരം</option>
                  <option value="Sports & Fitness">കായികം</option>
                  <option value="Workshops & Education">വിദ്യാഭ്യാസം & സെമിനാർ</option>
                  <option value="Charity & Volunteering">സാമൂഹിക സേവനം</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A2420] mb-1">
                  തീയതി & സമയം *
                </label>
                <input
                  type="datetime-local"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#1A2420] mb-1">
                  സ്ഥലം *
                </label>
                <input
                  type="text"
                  required
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  placeholder="ഉദാ: ടൗൺ ഹാൾ, എറണാകുളം"
                  className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A2420] mb-1">
                  ബന്ധപ്പെടേണ്ട ഫോൺ
                </label>
                <input
                  type="tel"
                  value={eventPhone}
                  onChange={(e) => setEventPhone(e.target.value)}
                  placeholder="+91 98470 00000"
                  className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1A2420] mb-1">
                വിവരണം *
              </label>
              <textarea
                rows={3}
                required
                value={eventDesc}
                onChange={(e) => setEventDesc(e.target.value)}
                placeholder="പരിപാടിയുടെ കൂടുതൽ വിവരങ്ങൾ..."
                className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1A2420] mb-1">
                പോസ്റ്റർ / ചിത്രം (URL)
              </label>
              <input
                type="url"
                value={eventImage}
                onChange={(e) => setEventImage(e.target.value)}
                placeholder="https://..."
                className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
              />
              {eventImage && (
                <div className="mt-2 h-36 w-full rounded-xl overflow-hidden border border-[#EAE4D7]">
                  <img src={eventImage} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSuccess}
              className="w-full py-3 rounded-xl bg-[#1B4D36] hover:bg-[#133A28] disabled:opacity-50 text-white font-bold text-xs sm:text-sm transition active:scale-95 shadow-md mt-4"
            >
              പരിപാടി ചേർക്കുക
            </button>
          </form>
        )}

        {/* ========================================================================= */}
        {/* 3. BUSINESS / SERVICE FORM */}
        {/* ========================================================================= */}
        {formType === "service" && (
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-[#EAE4D7] p-6 sm:p-8 shadow-card space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#1A2420] mb-1">
                സ്ഥാപനത്തിന്റെ പേര് *
              </label>
              <input
                type="text"
                required
                value={bizName}
                onChange={(e) => setBizName(e.target.value)}
                placeholder="ഉദാ: മലബാർ ബേക്കേഴ്സ്"
                className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#1A2420] mb-1">
                  വിഭാഗം *
                </label>
                <select
                  value={bizCategory}
                  onChange={(e) => setBizCategory(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                >
                  <option value="Home & Maintenance">വീട്ടുജോലി / ഇലക്ട്രിക്കൽ</option>
                  <option value="Healthcare & Clinics">ആരോഗ്യം & ക്ലിനിക്കുകൾ</option>
                  <option value="Food & Bakery">ഭക്ഷണം & ബേക്കറി</option>
                  <option value="Automotive Repairs">വാഹന റിപ്പയറിംഗ്</option>
                  <option value="Local Groceries">പലചരക്ക്</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A2420] mb-1">
                  ഫോൺ നമ്പർ *
                </label>
                <input
                  type="tel"
                  required
                  value={bizPhone}
                  onChange={(e) => setBizPhone(e.target.value)}
                  placeholder="+91 98470 12345"
                  className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1A2420] mb-1">
                മേൽവിലാസം *
              </label>
              <input
                type="text"
                required
                value={bizAddress}
                onChange={(e) => setBizAddress(e.target.value)}
                placeholder="ഷോപ്പ് നമ്പർ, മെയിൻ റോഡ്, കാക്കനാട്"
                className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#1A2420] mb-1">
                  പ്രവർത്തന സമയം
                </label>
                <input
                  type="text"
                  value={bizHours}
                  onChange={(e) => setBizHours(e.target.value)}
                  placeholder="09:00 AM - 08:00 PM"
                  className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A2420] mb-1">
                  വെബ്സൈറ്റ് (ഓപ്ഷണൽ)
                </label>
                <input
                  type="url"
                  value={bizWebsite}
                  onChange={(e) => setBizWebsite(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1A2420] mb-1">
                സേവന വിവരണം *
              </label>
              <textarea
                rows={3}
                required
                value={bizDesc}
                onChange={(e) => setBizDesc(e.target.value)}
                placeholder="നിങ്ങളുടെ സ്ഥാപനം നൽകുന്ന പ്രധാന സേവനങ്ങളെക്കുറിച്ച് വ്യക്തമാക്കുക..."
                className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSuccess}
              className="w-full py-3 rounded-xl bg-[#1B4D36] hover:bg-[#133A28] disabled:opacity-50 text-white font-bold text-xs sm:text-sm transition active:scale-95 shadow-md mt-4"
            >
              സ്ഥാപനം രജിസ്റ്റർ ചെയ്യുക
            </button>
          </form>
        )}

        {/* ========================================================================= */}
        {/* 4. ANNOUNCEMENT FORM */}
        {/* ========================================================================= */}
        {formType === "announcement" && (
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-[#EAE4D7] p-6 sm:p-8 shadow-card space-y-4">
            {!isVerifiedPublisher && (
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 mb-2">
                ശ്രദ്ധിക്കുക: ഔദ്യോഗിക അറിയിപ്പുകൾ അംഗീകൃത അതോറിറ്റികൾക്കും മോഡറേറ്റർമാർക്കും മാത്രമേ പ്രസിദ്ധീകരിക്കാൻ അനുവാദമുള്ളൂ.
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-[#1A2420] mb-1">
                അറിയിപ്പ് നൽകുന്ന സ്ഥാപനം / വകുപ്പ് *
              </label>
              <input
                type="text"
                required
                value={annOrg}
                onChange={(e) => setAnnOrg(e.target.value)}
                placeholder="ഉദാ: KSEB കാക്കനാട് സെക്ഷൻ / നഗരസഭ"
                className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1A2420] mb-1">
                അറിയിപ്പിന്റെ തലക്കെട്ട് *
              </label>
              <input
                type="text"
                required
                value={annTitle}
                onChange={(e) => setAnnTitle(e.target.value)}
                placeholder="ഉദാ: നാളെ രാവിലെ 9 മുതൽ 1 വരെ വൈദ്യുതി മുടങ്ങും"
                className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1A2420] mb-1">
                പൂർണ്ണ വിവരങ്ങൾ *
              </label>
              <textarea
                rows={4}
                required
                value={annContent}
                onChange={(e) => setAnnContent(e.target.value)}
                placeholder="ബാധിക്കപ്പെടുന്ന പ്രദേശങ്ങൾ, ടൈംടേബിൾ, ഹെൽപ്പ്‌ലൈൻ നമ്പറുകൾ..."
                className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSuccess}
              className="w-full py-3 rounded-xl bg-[#1B4D36] hover:bg-[#133A28] disabled:opacity-50 text-white font-bold text-xs sm:text-sm transition active:scale-95 shadow-md mt-4"
            >
              അറിയിപ്പ് പ്രസിദ്ധീകരിക്കുക
            </button>
          </form>
        )}

      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}

export default function CreatePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7F0] flex items-center justify-center text-xs text-[#5C6A64]">Loading...</div>}>
      <CreateContent />
    </Suspense>
  );
}
