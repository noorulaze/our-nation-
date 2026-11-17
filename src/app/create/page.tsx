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
  Building2
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
    initialType as any
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

    const commId = currentCommunity?.id || "40000000-0000-0000-0000-000000000001";

    if (formType === "issue") {
      store.createIssueReport({
        community_id: commId,
        reporter_id: user.id,
        title: issueTitle,
        description: issueDesc,
        category: issueCategory,
        location_name: issueLocation,
        image_url: issueImage || null,
      });
    } else if (formType === "event") {
      store.createEvent({
        community_id: commId,
        creator_id: user.id,
        title: eventTitle,
        description: eventDesc,
        category: eventCategory,
        location_name: eventLocation,
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
        address: bizAddress,
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
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-8">
        
        {/* Title */}
        <div className="mb-6">
          <span className="text-xs font-bold text-brand-700 uppercase tracking-wider">
            {t("navCreate")}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mt-1">
            {formType === "issue" && t("submitIssueTitle")}
            {formType === "event" && t("submitEvent")}
            {formType === "service" && t("submitService")}
            {formType === "announcement" && "Publish Official Announcement"}
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Target Locality: <strong className="text-foreground">{currentCommunity?.name || "Kerala"}</strong>
          </p>
        </div>

        {/* Type Selection Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
          <button
            type="button"
            onClick={() => setFormType("issue")}
            className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition ${
              formType === "issue"
                ? "bg-brand-50 border-brand-500 text-brand-800 shadow-xs"
                : "bg-surface border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Civic Issue</span>
          </button>

          <button
            type="button"
            onClick={() => setFormType("event")}
            className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition ${
              formType === "event"
                ? "bg-brand-50 border-brand-500 text-brand-800 shadow-xs"
                : "bg-surface border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            <Calendar className="w-4 h-4 text-blue-600" />
            <span>Event</span>
          </button>

          <button
            type="button"
            onClick={() => setFormType("service")}
            className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition ${
              formType === "service"
                ? "bg-brand-50 border-brand-500 text-brand-800 shadow-xs"
                : "bg-surface border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            <Briefcase className="w-4 h-4 text-emerald-600" />
            <span>Local Business</span>
          </button>

          {isVerifiedPublisher && (
            <button
              type="button"
              onClick={() => setFormType("announcement")}
              className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition ${
                formType === "announcement"
                  ? "bg-brand-50 border-brand-500 text-brand-800 shadow-xs"
                  : "bg-surface border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              <Megaphone className="w-4 h-4 text-purple-600" />
              <span>Notice</span>
            </button>
          )}
        </div>

        {/* Success Confirmation Card */}
        {isSuccess ? (
          <div className="bg-surface rounded-2xl border border-brand-200 p-8 text-center shadow-md animate-in fade-in">
            <div className="w-12 h-12 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-foreground">
              Submission Successful!
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Your record has been successfully added to {currentCommunity?.name || "the community"}. Redirecting...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-surface rounded-2xl border border-border p-6 shadow-sm space-y-4">
            
            {/* 1. ISSUE FORM */}
            {formType === "issue" && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    {t("issueTitlePlaceholder")}
                  </label>
                  <input
                    type="text"
                    required
                    value={issueTitle}
                    onChange={(e) => setIssueTitle(e.target.value)}
                    placeholder="e.g. Broken drainage cover on bypass"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      {t("issueCategoryLabel")}
                    </label>
                    <select
                      value={issueCategory}
                      onChange={(e) => setIssueCategory(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background text-foreground"
                    >
                      <option value="roads">Roads & Footpaths</option>
                      <option value="waste_management">Waste Management</option>
                      <option value="water">Water Supply & Drainage</option>
                      <option value="public_facilities">Public Facilities & Streetlights</option>
                      <option value="environment">Environment & Trees</option>
                      <option value="other">Other General Issue</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      {t("issueLocationLabel")}
                    </label>
                    <input
                      type="text"
                      required
                      value={issueLocation}
                      onChange={(e) => setIssueLocation(e.target.value)}
                      placeholder="e.g. Near Infopark Roundabout"
                      className="w-full px-3 py-2 text-sm rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    {t("issueDescLabel")}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={issueDesc}
                    onChange={(e) => setIssueDesc(e.target.value)}
                    placeholder="Describe the issue clearly so neighbors and municipal teams can locate and address it..."
                    className="w-full px-3 py-2 text-sm rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Photo URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={issueImage}
                    onChange={(e) => setIssueImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background text-foreground"
                  />
                </div>
              </>
            )}

            {/* 2. EVENT FORM */}
            {formType === "event" && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Event Title
                  </label>
                  <input
                    type="text"
                    required
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    placeholder="e.g. Kakkanad Tech & Eco Fair"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-border bg-background text-foreground"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      Category
                    </label>
                    <select
                      value={eventCategory}
                      onChange={(e) => setEventCategory(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background text-foreground"
                    >
                      <option value="Culture & Arts">Culture & Arts</option>
                      <option value="Sports & Fitness">Sports & Fitness</option>
                      <option value="Charity & Volunteering">Charity & Volunteering</option>
                      <option value="Workshops & Education">Workshops & Education</option>
                      <option value="Festivals & Celebrations">Festivals & Celebrations</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      Date & Time
                    </label>
                    <input
                      type="date"
                      required
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-border bg-background text-foreground"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      Venue / Location Name
                    </label>
                    <input
                      type="text"
                      required
                      value={eventLocation}
                      onChange={(e) => setEventLocation(e.target.value)}
                      placeholder="e.g. Infopark Amphitheatre"
                      className="w-full px-3 py-2 text-sm rounded-xl border border-border bg-background text-foreground"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      Organizer Name
                    </label>
                    <input
                      type="text"
                      required
                      value={eventOrganizer}
                      onChange={(e) => setEventOrganizer(e.target.value)}
                      placeholder="e.g. Green Kakkanad Youth Club"
                      className="w-full px-3 py-2 text-sm rounded-xl border border-border bg-background text-foreground"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Event Description
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={eventDesc}
                    onChange={(e) => setEventDesc(e.target.value)}
                    placeholder="Details about program schedule, entry criteria, registration..."
                    className="w-full px-3 py-2 text-sm rounded-xl border border-border bg-background text-foreground"
                  />
                </div>
              </>
            )}

            {/* 3. BUSINESS / SERVICE FORM */}
            {formType === "service" && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Business / Service Name
                  </label>
                  <input
                    type="text"
                    required
                    value={bizName}
                    onChange={(e) => setBizName(e.target.value)}
                    placeholder="e.g. Cochin Plumbing & Electrical Clinic"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-border bg-background text-foreground"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      Category
                    </label>
                    <select
                      value={bizCategory}
                      onChange={(e) => setBizCategory(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background text-foreground"
                    >
                      <option value="Home & Maintenance">Home & Maintenance</option>
                      <option value="Healthcare & Clinics">Healthcare & Clinics</option>
                      <option value="Food & Bakery">Food & Bakery</option>
                      <option value="Automotive Repairs">Automotive Repairs</option>
                      <option value="Local Groceries">Local Groceries</option>
                      <option value="Professional Services">Professional Services</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={bizPhone}
                      onChange={(e) => setBizPhone(e.target.value)}
                      placeholder="+91 94470 XXXXX"
                      className="w-full px-3 py-2 text-sm rounded-xl border border-border bg-background text-foreground"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Shop / Service Address
                  </label>
                  <input
                    type="text"
                    required
                    value={bizAddress}
                    onChange={(e) => setBizAddress(e.target.value)}
                    placeholder="Building name, landmark, road..."
                    className="w-full px-3 py-2 text-sm rounded-xl border border-border bg-background text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Service Description & Offerings
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={bizDesc}
                    onChange={(e) => setBizDesc(e.target.value)}
                    placeholder="List specific services, experience, warranty, callout areas..."
                    className="w-full px-3 py-2 text-sm rounded-xl border border-border bg-background text-foreground"
                  />
                </div>
              </>
            )}

            {/* 4. ANNOUNCEMENT FORM */}
            {formType === "announcement" && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Notice Title
                  </label>
                  <input
                    type="text"
                    required
                    value={annTitle}
                    onChange={(e) => setAnnTitle(e.target.value)}
                    placeholder="e.g. Water Authority Supply Valve Replacement"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-border bg-background text-foreground"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      Issuing Organization
                    </label>
                    <input
                      type="text"
                      required
                      value={annOrg}
                      onChange={(e) => setAnnOrg(e.target.value)}
                      placeholder="e.g. Kerala Water Authority"
                      className="w-full px-3 py-2 text-sm rounded-xl border border-border bg-background text-foreground"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      Notice Category
                    </label>
                    <input
                      type="text"
                      value={annCategory}
                      onChange={(e) => setAnnCategory(e.target.value)}
                      placeholder="Public Utility / Traffic / Civic Order"
                      className="w-full px-3 py-2 text-sm rounded-xl border border-border bg-background text-foreground"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Announcement Full Text
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={annContent}
                    onChange={(e) => setAnnContent(e.target.value)}
                    placeholder="Clear instructions, affected regions, timing, and emergency contacts..."
                    className="w-full px-3 py-2 text-sm rounded-xl border border-border bg-background text-foreground"
                  />
                </div>
              </>
            )}

            <div className="flex justify-end pt-3">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-semibold text-xs sm:text-sm transition active:scale-95 shadow-sm"
              >
                Submit for Publication
              </button>
            </div>
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
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center text-xs text-muted-foreground">Loading...</div>}>
      <CreateContent />
    </Suspense>
  );
}

