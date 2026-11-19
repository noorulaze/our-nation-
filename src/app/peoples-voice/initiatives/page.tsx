"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { PeoplesVoiceNav } from "@/components/peoples-voice/PeoplesVoiceNav";
import { useLanguage } from "@/lib/i18n/context";
import { useAuth } from "@/lib/auth/context";
import { 
  peoplesVoiceStore, 
  PEOPLES_VOICE_INITIATIVE_CATEGORIES 
} from "@/lib/data/peoplesVoiceData";
import { 
  LocalInitiative, 
  InitiativeCategory 
} from "@/types/peoplesVoice";
import {
  Users,
  Calendar,
  Clock,
  MapPin,
  PlusCircle,
  CheckCircle2,
  Phone,
  Mail,
  Search,
  Sparkles,
  HeartHandshake,
  ShieldCheck,
  Send,
  X,
  AlertCircle,
  Image as ImageIcon
} from "lucide-react";

export default function LocalInitiativesPage() {
  const { language } = useLanguage();
  const { user } = useAuth();

  const [initiatives, setInitiatives] = useState<LocalInitiative[]>(() => peoplesVoiceStore.getInitiatives());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<InitiativeCategory | "all">("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  // Create initiative modal state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<InitiativeCategory>("cleanliness");
  const [description, setDescription] = useState("");
  const [organizerName, setOrganizerName] = useState(user?.display_name || user?.username || "");
  const [organizerType, setOrganizerType] = useState<'individual' | 'community_group' | 'ngo' | 'youth_club'>('community_group');
  const [locality, setLocality] = useState("Tanur Beach");
  const [venueAddress, setVenueAddress] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [instructions, setInstructions] = useState("");
  const [contactDetails, setContactDetails] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // Filtered initiatives
  const filteredInitiatives = useMemo(() => {
    return peoplesVoiceStore.getInitiatives({
      category: selectedCategory,
      status: selectedStatus as 'upcoming' | 'ongoing' | 'completed' | 'cancelled' | 'all',
      search: searchTerm
    });
  }, [selectedCategory, selectedStatus, searchTerm, initiatives]);

  // Handle Join Initiative / RSVP
  const handleToggleJoin = (initiativeId: string) => {
    const userId = user?.id || "usr-anon-local";
    peoplesVoiceStore.toggleInitiativeParticipation(initiativeId, userId);
    setInitiatives(peoplesVoiceStore.getInitiatives({
      category: selectedCategory,
      status: selectedStatus as 'upcoming' | 'ongoing' | 'completed' | 'cancelled' | 'all',
      search: searchTerm
    }));
  };

  // Handle Create Initiative Submit
  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !eventDate || !eventTime) return;

    const catObj = PEOPLES_VOICE_INITIATIVE_CATEGORIES.find(c => c.key === category);

    peoplesVoiceStore.addInitiative({
      title: title.trim(),
      description: description.trim(),
      category,
      category_name: catObj?.label || "Initiative",
      category_name_ml: catObj?.label_ml || "കൂട്ടായ്മ",
      organizer_name: organizerName.trim() || "Community Volunteers",
      organizer_id: user?.id || "usr-" + Date.now(),
      organizer_type: organizerType,
      locality,
      venue_address: venueAddress.trim() || locality,
      event_date: eventDate,
      event_time: eventTime,
      participation_instructions: instructions.trim() || "Open to all community volunteers.",
      contact_details: contactDetails.trim() || "Contact organizer via registration.",
      images: imageUrl ? [imageUrl] : ["https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80"],
      status: "upcoming"
    });

    setInitiatives(peoplesVoiceStore.getInitiatives());
    setIsCreateOpen(false);
    setTitle("");
    setDescription("");
    setVenueAddress("");
    setEventDate("");
    setEventTime("");
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#252A25] pb-24">
      <Navbar />
      <PeoplesVoiceNav />

      {/* Header */}
      <section className="bg-gradient-to-b from-[#FAF4E6] to-[#FAF7F0] border-b border-[#EDE6D8] pt-8 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2 text-xs text-[#5C6A64]">
                <Link href="/peoples-voice" className="hover:text-[#194B35]">
                  {language === "ml" ? "ജനകീയ ശബ്ദം" : "People's Voice"}
                </Link>
                <span>/</span>
                <span className="font-bold text-[#194B35]">
                  {language === "ml" ? "പ്രാദേശിക കൂട്ടായ്മകൾ" : "Local Initiatives"}
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#194B35] font-serif">
                {language === "ml" ? "താനൂർ സന്നദ്ധ കൂട്ടായ്മകൾ" : "Local Community Initiatives"}
              </h1>
              <p className="text-xs sm:text-sm text-[#5C6A64] mt-1">
                {language === "ml"
                  ? "ശുചിത്വ യജ്ഞങ്ങൾ, വൃക്ഷത്തൈ നടീൽ, വിദ്യാഭ്യാസം, സന്നദ്ധ പ്രവർത്തനങ്ങൾ എന്നിവയിൽ പങ്കാളികളാകൂ."
                  : "Join community-driven campaigns for beach cleanups, afforestation, education mentorship, and civic welfare."}
              </p>
            </div>

            <button
              onClick={() => setIsCreateOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#194B35] text-white font-bold text-sm shadow hover:bg-[#143E2C] transition shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{language === "ml" ? "പുതിയ കൂട്ടായ്മ ആരംഭിക്കാം" : "Create an Initiative"}</span>
            </button>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C9A94]" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={
                  language === "ml"
                    ? "കൂട്ടായ്മകൾ, സന്നദ്ധ പരിപാടികൾ തിരയുക..."
                    : "Search initiatives by title or organizer..."
                }
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-[#DDD3BF] text-sm text-[#252A25] focus:outline-none focus:ring-2 focus:ring-[#194B35] shadow-sm"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as InitiativeCategory | "all")}
              aria-label={language === "ml" ? "വിഭാഗം തിരഞ്ഞെടുക്കുക" : "Select Category"}
              className="px-4 py-3 rounded-2xl bg-white border border-[#DDD3BF] text-xs font-semibold text-[#194B35] focus:outline-none focus:ring-2 focus:ring-[#194B35] shadow-sm"
            >
              <option value="all">{language === "ml" ? "എല്ലാ പ്രവർത്തനങ്ങളും" : "All Initiative Types"}</option>
              {PEOPLES_VOICE_INITIATIVE_CATEGORIES.map((c) => (
                <option key={c.key} value={c.key}>
                  {language === "ml" ? c.label_ml : c.label}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              aria-label={language === "ml" ? "നില തിരഞ്ഞെടുക്കുക" : "Select Status"}
              className="px-4 py-3 rounded-2xl bg-white border border-[#DDD3BF] text-xs font-semibold text-[#194B35] focus:outline-none focus:ring-2 focus:ring-[#194B35] shadow-sm"
            >
              <option value="all">{language === "ml" ? "എല്ലാ നിലകളും" : "All Statuses"}</option>
              <option value="upcoming">{language === "ml" ? "വരാനിരിക്കുന്നവ" : "Upcoming"}</option>
              <option value="ongoing">{language === "ml" ? "നിലവിൽ നടക്കുന്നവ" : "Ongoing"}</option>
              <option value="completed">{language === "ml" ? "പൂർത്തിയായവ" : "Completed"}</option>
            </select>
          </div>
        </div>
      </section>

      {/* Initiatives Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex items-center justify-between text-xs text-[#5C6A64] mb-4">
          <span className="font-semibold text-[#194B35]">
            {filteredInitiatives.length} {language === "ml" ? "കൂട്ടായ്മകൾ കണ്ടെത്തി" : "initiatives listed"}
          </span>
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#C39A5B]" />
            <span>{language === "ml" ? "സന്നദ്ധ പങ്കാളിത്തം സ്വാഗതം" : "Volunteer Participation Welcome"}</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInitiatives.map((init) => (
            <div
              key={init.id}
              id={init.id}
              className="bg-white rounded-3xl border border-[#EDE6D8] overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                {/* Photo Header */}
                {init.images && init.images.length > 0 && (
                  <div className="relative h-44 w-full bg-[#EDE6D8] overflow-hidden">
                    <img
                      src={init.images[0]}
                      alt={init.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#194B35]/90 text-white backdrop-blur-sm">
                        {init.category_name}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 text-[#194B35] backdrop-blur-sm uppercase">
                        {init.status}
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-5">
                  <h3 className="font-bold text-lg text-[#194B35] font-serif leading-snug mb-2">
                    {language === "ml" && init.title_ml ? init.title_ml : init.title}
                  </h3>

                  <p className="text-xs text-[#5C6A64] line-clamp-3 mb-4 leading-relaxed font-sans">
                    {init.description}
                  </p>

                  <div className="space-y-1.5 text-xs text-[#5C6A64] mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#C39A5B]" />
                      <span className="font-semibold text-[#252A25]">{init.event_date}</span>
                      <span>({init.event_time})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#C39A5B]" />
                      <span className="truncate">{init.venue_address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <HeartHandshake className="w-3.5 h-3.5 text-[#C39A5B]" />
                      <span>{language === "ml" ? "സംഘാടകർ: " : "Organizer: "} <strong>{init.organizer_name}</strong></span>
                    </div>
                  </div>

                  {/* Participation instructions callout */}
                  <div className="p-3 rounded-xl bg-[#FAF7F0] border border-[#EDE6D8] text-[11px] text-[#5C6A64] mb-4">
                    <p className="font-bold text-[#194B35] mb-0.5">
                      {language === "ml" ? "നിർദ്ദേശങ്ങൾ:" : "Instructions:"}
                    </p>
                    <p className="line-clamp-2">{init.participation_instructions}</p>
                  </div>

                  {/* Contact privacy safe disclaimer */}
                  <div className="text-[10px] text-[#8C9A94] italic">
                    {language === "ml"
                      ? "ബന്ധപ്പെടാനുള്ള വിവരങ്ങൾ സന്നദ്ധപ്രവർത്തകർക്ക് മാത്രം ലഭ്യമാക്കുന്നു."
                      : "Contact info protected: " + init.contact_details}
                  </div>
                </div>
              </div>

              {/* Action Button: Join / RSVP */}
              <div className="px-5 py-3.5 bg-[#FAF7F0] border-t border-[#EDE6D8] flex items-center justify-between">
                <span className="text-xs font-semibold text-[#5C6A64]">
                  {init.participant_count} {language === "ml" ? "പങ്കാളികൾ" : "joined"}
                </span>

                <button
                  onClick={() => handleToggleJoin(init.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm active:scale-95 ${
                    init.is_participating_by_user
                      ? "bg-emerald-700 text-white"
                      : "bg-[#194B35] text-white hover:bg-[#143E2C]"
                  }`}
                >
                  {init.is_participating_by_user
                    ? language === "ml"
                      ? "പങ്കാളിത്തം ഉറപ്പിച്ചു ✓"
                      : "Joined (RSVP'd) ✓"
                    : language === "ml"
                    ? "പങ്കാളിയാകാം"
                    : "Join / RSVP"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Create Initiative Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#EDE6D8] my-8">
            <div className="flex items-center justify-between pb-3 border-b border-[#EDE6D8] mb-4">
              <h3 className="font-bold text-lg text-[#194B35] font-serif flex items-center gap-2">
                <Users className="w-5 h-5 text-[#C39A5B]" />
                <span>{language === "ml" ? "പുതിയ സന്നദ്ധ കൂട്ടായ്മ സംഘടിപ്പിക്കാം" : "Publish Local Initiative"}</span>
              </h3>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="p-1 rounded-full hover:bg-stone-100 text-stone-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#194B35] mb-1">
                  {language === "ml" ? "പരിപാടിയുടെ പേര് *" : "Initiative Title *"}
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Tanur Beach Mangrove Planting Drive"
                  className="w-full px-3 py-2.5 rounded-xl bg-[#FAF7F0] border border-[#DDD3BF] text-xs text-[#252A25] focus:outline-none focus:ring-2 focus:ring-[#194B35]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#194B35] mb-1">
                    {language === "ml" ? "വിഭാഗം *" : "Category *"}
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as InitiativeCategory)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#FAF7F0] border border-[#DDD3BF] text-xs font-semibold text-[#194B35]"
                  >
                    {PEOPLES_VOICE_INITIATIVE_CATEGORIES.map((c) => (
                      <option key={c.key} value={c.key}>
                        {language === "ml" ? c.label_ml : c.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#194B35] mb-1">
                    {language === "ml" ? "സംഘാടക വിഭാഗം" : "Organizer Type"}
                  </label>
                  <select
                    value={organizerType}
                    onChange={(e) => setOrganizerType(e.target.value as 'individual' | 'community_group' | 'ngo' | 'youth_club')}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#FAF7F0] border border-[#DDD3BF] text-xs font-semibold text-[#194B35]"
                  >
                    <option value="community_group">Community Group</option>
                    <option value="youth_club">Youth Club / Sports Club</option>
                    <option value="ngo">NGO / Environmental Trust</option>
                    <option value="individual">Individual Volunteer</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#194B35] mb-1">
                  {language === "ml" ? "സംഘാടകരുടെ പേര് *" : "Organizer Name *"}
                </label>
                <input
                  type="text"
                  value={organizerName}
                  onChange={(e) => setOrganizerName(e.target.value)}
                  placeholder="e.g. Tanur Beach Volunteers Collective"
                  className="w-full px-3 py-2.5 rounded-xl bg-[#FAF7F0] border border-[#DDD3BF] text-xs text-[#252A25]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#194B35] mb-1">
                    {language === "ml" ? "തീയതി *" : "Date *"}
                  </label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#FAF7F0] border border-[#DDD3BF] text-xs text-[#252A25]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#194B35] mb-1">
                    {language === "ml" ? "സമയം *" : "Time *"}
                  </label>
                  <input
                    type="text"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    placeholder="e.g. 07:00 AM - 10:00 AM"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#FAF7F0] border border-[#DDD3BF] text-xs text-[#252A25]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#194B35] mb-1">
                  {language === "ml" ? "സ്ഥലം & വിലാസം *" : "Venue & Locality *"}
                </label>
                <input
                  type="text"
                  value={venueAddress}
                  onChange={(e) => setVenueAddress(e.target.value)}
                  placeholder="e.g. Near Tanur Beach Old Port, Ward 4"
                  className="w-full px-3 py-2.5 rounded-xl bg-[#FAF7F0] border border-[#DDD3BF] text-xs text-[#252A25]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#194B35] mb-1">
                  {language === "ml" ? "വിവരണം *" : "Description *"}
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Details about what the initiative aims to accomplish..."
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF7F0] border border-[#DDD3BF] text-xs text-[#252A25]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#194B35] mb-1">
                  {language === "ml" ? "പങ്കെടുക്കുന്നവർക്കുള്ള നിർദ്ദേശങ്ങൾ" : "Participation Instructions"}
                </label>
                <textarea
                  rows={2}
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="e.g. Bring water bottle, gloves will be provided..."
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF7F0] border border-[#DDD3BF] text-xs text-[#252A25]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#194B35] mb-1">
                  {language === "ml" ? "കോർഡിനേറ്റർ ബന്ധപ്പെടേണ്ട നമ്പർ / ഇമെയിൽ" : "Contact Details (for registrants)"}
                </label>
                <input
                  type="text"
                  value={contactDetails}
                  onChange={(e) => setContactDetails(e.target.value)}
                  placeholder="e.g. 0494-2440228 / tanurvolunteers@gmail.com"
                  className="w-full px-3 py-2.5 rounded-xl bg-[#FAF7F0] border border-[#DDD3BF] text-xs text-[#252A25]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#EDE6D8]">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#EDE6D8] text-[#194B35] text-xs font-bold"
                >
                  {language === "ml" ? "റദ്ദാക്കുക" : "Cancel"}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#194B35] text-white text-xs font-bold hover:bg-[#143E2C] transition shadow"
                >
                  {language === "ml" ? "കൂട്ടായ്മ പ്രസിദ്ധീകരിക്കാം" : "Publish Initiative"}
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
