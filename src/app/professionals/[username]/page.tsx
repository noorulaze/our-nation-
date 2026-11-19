"use client";

import React, { use, useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { useLanguage } from "@/lib/i18n/context";
import { useAuth } from "@/lib/auth/context";
import { store } from "@/lib/data/store";
import { 
  ProfessionalProfile, 
  ProfessionalService, 
  PortfolioItem, 
  Review, 
  Booking 
} from "@/types/database";
import Link from "next/link";
import { 
  Star, 
  MapPin, 
  Phone, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Calendar, 
  MessageSquare, 
  Bookmark, 
  Share2, 
  Flag, 
  Wrench, 
  Check, 
  X, 
  AlertCircle, 
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Send,
  Lock,
  ThumbsUp,
  Image as ImageIcon
} from "lucide-react";

interface PageProps {
  params: Promise<{ username: string }>;
}

export default function ProfessionalProfilePage({ params }: PageProps) {
  const { username } = use(params);
  const { t, language } = useLanguage();
  const { user } = useAuth();

  const pro = store.getProfessionalByUsername(decodeURIComponent(username));

  // Services, Portfolio & Reviews
  const services = pro ? store.getServicesByProfessional(pro.id) : [];
  const portfolio = pro ? store.getPortfolioItems(pro.id) : [];
  const reviews = pro ? store.getReviews(pro.id) : [];

  // Saved Status
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (user && pro) {
      setIsSaved(store.isProfessionalSaved(user.id, pro.id));
    }
  }, [user, pro]);

  const handleToggleSave = () => {
    if (!user) {
      alert("വിദഗ്ദ്ധരെ സേവ് ചെയ്യാൻ ദയവായി ലോഗിൻ ചെയ്യുക (Please login to save).");
      return;
    }
    if (pro) {
      const saved = store.toggleSaveProfessional(user.id, pro.id);
      setIsSaved(saved);
    }
  };

  // Booking Modal State
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ProfessionalService | null>(null);
  const [bookingDate, setBookingDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  });
  const [timeSlot, setTimeSlot] = useState("10:00 AM - 11:00 AM");
  const [customerName, setCustomerName] = useState(user?.display_name || "");
  const [customerPhone, setCustomerPhone] = useState(user?.phone || "+91 98470 11223");
  const [customerAddress, setCustomerAddress] = useState("Near Tanur Town Hall, Main Road");
  const [customerLocality, setCustomerLocality] = useState("Tanur Municipality");
  const [specialNotes, setSpecialNotes] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState<Booking | null>(null);
  const [bookingError, setBookingError] = useState("");

  // Messaging Modal State
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [messageSent, setMessageSent] = useState(false);

  // Report Modal State
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState("incorrect_info");
  const [reportDetails, setReportDetails] = useState("");
  const [reportSuccess, setReportSuccess] = useState(false);

  if (!pro) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
        <Navbar />
        <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-16 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
            <Wrench className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold font-malayalam-serif text-[#1B4D36]">
            സർവീസ് പ്രൊഫൈൽ കണ്ടെത്താനായില്ല (Profile Not Found)
          </h1>
          <p className="text-xs text-[#5C6A64]">
            @{username} എന്ന പേരിലുള്ള പ്രൊഫഷണൽ പ്രൊഫൈൽ ലഭ്യമല്ല.
          </p>
          <Link
            href="/professionals"
            className="inline-block px-5 py-2.5 rounded-xl bg-[#1B4D36] text-white text-xs font-bold hover:bg-[#143C2A] transition"
          >
            എല്ലാ സേവന വിദഗ്ദ്ധരെയും കാണുക
          </Link>
        </main>
        <Footer />
        <BottomNav />
      </div>
    );
  }

  // Available Time Slots for the selected date
  const AVAILABLE_SLOTS = [
    "09:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:30 AM - 12:30 PM",
    "02:00 PM - 03:00 PM",
    "03:30 PM - 04:30 PM",
    "05:00 PM - 06:00 PM",
  ];

  const handleOpenBooking = (service?: ProfessionalService) => {
    setSelectedService(service || services[0] || null);
    setBookingSuccess(null);
    setBookingError("");
    setBookingModalOpen(true);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingError("");

    if (!customerName.trim() || !customerPhone.trim() || !customerAddress.trim()) {
      setBookingError("ദയവായി നിങ്ങളുടെ പേര്, ഫോൺ നമ്പർ, വിലാസം എന്നിവ നൽകുക.");
      return;
    }

    const srv = selectedService || services[0];
    const res = store.createBooking({
      customer_id: user?.id || "u0000000-0000-0000-0000-000000000001",
      professional_id: pro.id,
      service_id: srv?.id || "srv-default",
      service_title: srv?.title || "Professional Service",
      service_title_ml: srv?.title_ml || "സേവനം",
      booking_date: bookingDate,
      time_slot: timeSlot,
      customer_name: customerName,
      customer_phone: customerPhone,
      customer_address: customerAddress,
      customer_locality: customerLocality,
      special_instructions: specialNotes,
      estimated_price: srv?.price || pro.starting_price,
      pricing_type: srv?.pricing_type || "fixed",
      payment_method: "pay_on_completion",
    });

    if (res.success && res.booking) {
      setBookingSuccess(res.booking);
    } else {
      setBookingError(res.error || "Selected slot is unavailable. Please choose another date or time.");
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setChatMessages((prev) => [...prev, chatInput]);
    setChatInput("");
    setMessageSent(true);

    // If booking exists or mock
    const conv = store.getOrCreateConversationForBooking(`bk-inq-${pro.id}`);
    store.sendChatMessage(
      conv.id,
      user?.id || "u0000000-0000-0000-0000-000000000001",
      user?.display_name || "Customer",
      chatInput
    );
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    store.reportContent(
      user?.id || "u0000000-0000-0000-0000-000000000001",
      "business",
      pro.id,
      reportReason,
      reportDetails
    );
    setReportSuccess(true);
    setTimeout(() => {
      setReportModalOpen(false);
      setReportSuccess(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "സേവന വിദഗ്ദ്ധർ", href: "/professionals" },
            { label: (pro.category_name_ml || pro.category_name || "വിഭാഗം") as string, href: `/professionals?category=${pro.category_id}` },
            { label: pro.display_name },
          ]}
        />

        {/* HERO BANNER & HEADER */}
        <div className="bg-white rounded-3xl border border-[#EAE4D7] shadow-card overflow-hidden">
          {/* Banner Photo */}
          <div className="h-44 sm:h-56 w-full relative bg-[#1B4D36]/20">
            {pro.banner_url ? (
              <img
                src={pro.banner_url}
                alt={pro.display_name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-[#1B4D36] to-[#123826]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Top Right Actions */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button
                type="button"
                onClick={handleToggleSave}
                className={`p-2.5 rounded-full backdrop-blur-md transition shadow-md ${
                  isSaved
                    ? "bg-amber-400 text-[#1B4D36]"
                    : "bg-white/80 hover:bg-white text-[#1B4D36]"
                }`}
                title={isSaved ? "സൂക്ഷിച്ചവയിൽ നിന്ന് മാറ്റുക" : "സൂക്ഷിക്കുക (Save Pro)"}
              >
                <Bookmark className="w-4 h-4 fill-current" />
              </button>

              <button
                type="button"
                onClick={() => setReportModalOpen(true)}
                className="p-2.5 rounded-full bg-white/80 hover:bg-white text-neutral-600 backdrop-blur-md transition shadow-md"
                title="പ്രൊഫൈൽ റിപ്പോർട്ട് ചെയ്യുക"
              >
                <Flag className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Profile Header Bar */}
          <div className="p-6 sm:p-8 pt-0 relative flex flex-col md:flex-row items-start md:items-end justify-between gap-6 -mt-16 sm:-mt-20">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
              <div className="relative">
                <img
                  src={pro.avatar_url || "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&auto=format&fit=crop&q=80"}
                  alt={pro.display_name}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover border-4 border-white shadow-xl bg-white"
                />
                <span className="absolute bottom-2 right-2 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" title="Active Provider" />
              </div>

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-bold font-malayalam-serif text-[#1B4D36]">
                    {language === "ml" && pro.display_name_ml ? pro.display_name_ml : pro.display_name}
                  </h1>
                  {pro.is_verified && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-300">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      <span>വെരിഫൈഡ് (Verified)</span>
                    </span>
                  )}
                  {pro.badges.includes("licensed") && (
                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold border border-blue-200">
                      ലൈസൻസുള്ളത്
                    </span>
                  )}
                </div>

                {pro.business_name && (
                  <p className="text-xs sm:text-sm font-semibold text-[#8C5B0F]">
                    {pro.business_name}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-3 text-xs text-[#5C6A64]">
                  <span className="font-bold text-[#1B4D36] bg-[#E0F1E7] px-2.5 py-0.5 rounded-lg border border-[#BDE3CE]">
                    {language === "ml" ? pro.category_name_ml : pro.category_name}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-semibold text-[#1A2420]">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{pro.rating}</span>
                    <span className="text-[#7A8880]">({pro.reviews_count} അവലോകനങ്ങൾ)</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#1B4D36]" />
                    <span>{pro.locality}</span>
                  </span>
                  <span>•</span>
                  <span>{pro.experience_years} വർഷത്തെ പരിചയം</span>
                </div>
              </div>
            </div>

            {/* Header Direct Actions */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setMessageModalOpen(true)}
                className="px-4 py-3 rounded-2xl bg-[#FAF7F0] hover:bg-[#F3EFE6] border border-[#DDD5C5] text-xs font-bold text-[#1B4D36] transition shadow-xs flex items-center justify-center gap-1.5 flex-1 sm:flex-initial"
              >
                <MessageSquare className="w-4 h-4 text-[#1B4D36]" />
                <span>സന്ദേശം അയക്കുക</span>
              </button>
              
              <button
                type="button"
                onClick={() => handleOpenBooking()}
                className="px-6 py-3 rounded-2xl bg-[#1B4D36] hover:bg-[#143B29] text-white text-xs sm:text-sm font-bold transition shadow-lg flex items-center justify-center gap-2 flex-1 sm:flex-initial active:scale-95"
              >
                <Calendar className="w-4 h-4 text-amber-300" />
                <span>ബുക്കിംഗ് ചെയ്യുക</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2-COLUMN MAIN CONTENT (8 Cols Left, 4 Cols Sticky Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: ABOUT, SERVICES, PORTFOLIO, REVIEWS (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* 1. About / Bio */}
            <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 sm:p-8 shadow-card space-y-4">
              <h2 className="text-base font-bold font-malayalam-serif text-[#1B4D36] border-b border-[#F3EFE6] pb-3">
                സേവനത്തെക്കുറിച്ച് (About Provider)
              </h2>
              <p className="text-xs sm:text-sm text-[#3E4D45] leading-relaxed">
                {language === "ml" && pro.bio_ml ? pro.bio_ml : pro.bio}
              </p>

              {/* Specializations Tags */}
              <div className="pt-2">
                <span className="text-[11px] font-bold text-[#7A8880] block mb-2">പ്രത്യേക വൈദഗ്ധ്യങ്ങൾ:</span>
                <div className="flex flex-wrap gap-1.5">
                  {pro.subcategories.map((sub) => (
                    <span
                      key={sub}
                      className="px-3 py-1 rounded-full bg-[#FAF7F0] border border-[#DDD5C5] text-xs font-semibold text-[#1B4D36]"
                    >
                      ✓ {sub}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. Services Offered & Transparent Pricing */}
            <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 sm:p-8 shadow-card space-y-5">
              <div className="flex items-center justify-between border-b border-[#F3EFE6] pb-3">
                <div>
                  <h2 className="text-base font-bold font-malayalam-serif text-[#1B4D36]">
                    ലഭ്യമായ സേവനങ്ങളും നിരക്കുകളും (Services & Pricing)
                  </h2>
                  <p className="text-[11px] text-[#7A8880]">സുതാര്യമായ നിരക്കുകൾ, ഒളിഞ്ഞിരിക്കുന്ന ചെലവുകളില്ല</p>
                </div>
                <span className="text-xs font-bold text-[#1B4D36] bg-[#E0F1E7] px-3 py-1 rounded-full">
                  {services.length} സേവനങ്ങൾ
                </span>
              </div>

              <div className="space-y-3">
                {services.map((srv) => (
                  <div
                    key={srv.id}
                    className="p-5 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7] hover:border-[#1B4D36]/40 transition space-y-2 group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h3 className="text-sm font-bold text-[#1A2420] group-hover:text-[#1B4D36] transition">
                        {language === "ml" && srv.title_ml ? srv.title_ml : srv.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-[#1B4D36] font-mono">
                          ₹{srv.price}
                        </span>
                        <span className="text-[10px] text-[#7A8880] uppercase">
                          ({srv.pricing_type === "fixed" ? "സ്ഥിര നിരക്ക്" : srv.pricing_type === "starting_at" ? "ആരംഭം" : "അളവ്"})
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-[#5C6A64] leading-relaxed">
                      {language === "ml" && srv.description_ml ? srv.description_ml : srv.description}
                    </p>

                    <div className="flex items-center justify-between pt-2 text-[11px] text-[#7A8880]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>സമയം: ഏകദേശം {srv.duration_minutes} മിനിറ്റ്</span>
                      </span>

                      <button
                        type="button"
                        onClick={() => handleOpenBooking(srv)}
                        className="px-4 py-1.5 rounded-xl bg-[#1B4D36] text-white font-bold hover:bg-[#143B29] transition shadow-xs flex items-center gap-1"
                      >
                        <span>ഈ സേവനം തിരഞ്ഞെടുക്കൂ</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Portfolio & Completed Works */}
            <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 sm:p-8 shadow-card space-y-4">
              <div className="flex items-center justify-between border-b border-[#F3EFE6] pb-3">
                <div>
                  <h2 className="text-base font-bold font-malayalam-serif text-[#1B4D36]">
                    പൂർത്തിയാക്കിയ ജോലികൾ (Portfolio & Work Gallery)
                  </h2>
                  <p className="text-[11px] text-[#7A8880]">താനൂരിലും പരിസരങ്ങളിലും ചെയ്ത സമീപകാല പ്രവൃത്തികൾ</p>
                </div>
                <span className="text-xs font-bold text-[#B87A1E] bg-[#FAF4E6] px-3 py-1 rounded-full border border-[#E8DCBF]">
                  {portfolio.length} വർക്കുകൾ
                </span>
              </div>

              {portfolio.length === 0 ? (
                <div className="py-8 text-center text-[#7A8880] text-xs">
                  <ImageIcon className="w-8 h-8 mx-auto text-[#DDD5C5] mb-2" />
                  <span>വർക്ക് ഗാലറി ഉടൻ അപ്‌ലോഡ് ചെയ്യും.</span>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {portfolio.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-[#EAE4D7] bg-[#FAF7F0] overflow-hidden group hover:shadow-md transition"
                    >
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-40 object-cover group-hover:scale-105 transition duration-300"
                      />
                      <div className="p-3.5 space-y-1">
                        <h4 className="text-xs font-bold text-[#1A2420]">
                          {language === "ml" && item.title_ml ? item.title_ml : item.title}
                        </h4>
                        {item.description && (
                          <p className="text-[11px] text-[#5C6A64] line-clamp-2">{item.description}</p>
                        )}
                        {item.completed_date && (
                          <span className="text-[10px] text-[#7A8880] block pt-1">
                            പൂർത്തിയായത്: {item.completed_date}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 4. Verified Customer Reviews & Ratings */}
            <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 sm:p-8 shadow-card space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#F3EFE6] pb-4">
                <div>
                  <h2 className="text-base font-bold font-malayalam-serif text-[#1B4D36]">
                    ഉപഭോക്തൃ അവലോകനങ്ങളും റേറ്റിംഗും (Verified Reviews)
                  </h2>
                  <p className="text-[11px] text-[#7A8880]">പൂർത്തിയായ സേവനങ്ങൾക്ക് ശേഷം നൽകിയ യഥാർത്ഥ പ്രതികരണങ്ങൾ</p>
                </div>
                <div className="flex items-center gap-3 bg-[#FAF7F0] p-3 rounded-2xl border border-[#EAE4D7]">
                  <span className="text-3xl font-bold font-mono text-[#1B4D36]">{pro.rating}</span>
                  <div>
                    <div className="flex items-center gap-0.5 text-amber-500">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-[10px] text-[#7A8880]">{pro.reviews_count} ഉപഭോക്താക്കൾ</span>
                  </div>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-5 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7] space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#1B4D36] text-amber-200 text-xs font-bold flex items-center justify-center">
                          {rev.customer_name ? rev.customer_name.charAt(0) : "C"}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-[#1A2420]">{rev.customer_name}</h4>
                          <span className="text-[10px] text-[#7A8880] flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>സ്ഥിരീകരിച്ച ബുക്കിംഗ് • {new Date(rev.created_at).toLocaleDateString()}</span>
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-0.5 text-amber-500">
                        {Array.from({ length: rev.rating_overall }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-[#3E4D45] leading-relaxed">
                      &ldquo;{rev.comment}&rdquo;
                    </p>

                    {rev.work_photo_url && (
                      <div className="pt-1">
                        <img
                          src={rev.work_photo_url}
                          alt="Work photo"
                          className="w-32 h-20 rounded-xl object-cover border border-[#DDD5C5]"
                        />
                      </div>
                    )}

                    {/* Official Provider Reply */}
                    {rev.provider_reply && (
                      <div className="p-3 rounded-xl bg-white border border-[#DDD5C5] text-xs text-[#1B4D36] space-y-1">
                        <span className="font-bold text-[11px] text-[#8C5B0F] block">
                          സേവന ദാതാവിന്റെ മറുപടി (Official Reply):
                        </span>
                        <p className="text-[11px] text-[#3E4D45] italic">
                          {rev.provider_reply}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: STICKY BOOKING CARD & HOURS (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Direct Booking CTA Card */}
            <div className="bg-white rounded-3xl border-2 border-[#1B4D36] p-6 shadow-xl space-y-5 sticky top-24">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#B87A1E]">
                  നേരിട്ടുള്ള ബുക്കിംഗ്
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold font-mono text-[#1B4D36]">₹{pro.starting_price}</span>
                  <span className="text-xs text-[#7A8880]">പ്രാരംഭ ചാർജ് (Starting at)</span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-[#5C6A64] border-y border-[#F3EFE6] py-3">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>താനൂർ മുൻസിപ്പാലിറ്റി പരിധിയിൽ അതിവേഗ സേവനം</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>ജോലി കഴിഞ്ഞു മാത്രം പണം നൽകിയാൽ മതി (Pay on completion)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>സുരക്ഷിതമായ നേരിട്ടുള്ള ആശയവിനിമയം</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleOpenBooking()}
                className="w-full py-3.5 rounded-2xl bg-[#1B4D36] hover:bg-[#143B29] text-white text-xs sm:text-sm font-bold transition shadow-md flex items-center justify-center gap-2 active:scale-95"
              >
                <Calendar className="w-4 h-4 text-amber-300" />
                <span>അപ്പോയിന്റ്മെന്റ് ബുക്ക് ചെയ്യുക</span>
              </button>

              <button
                type="button"
                onClick={() => setMessageModalOpen(true)}
                className="w-full py-2.5 rounded-xl bg-[#FAF7F0] hover:bg-[#F3EFE6] border border-[#DDD5C5] text-xs font-bold text-[#1B4D36] transition flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-[#1B4D36]" />
                <span>സംശയങ്ങൾ ചോദിക്കാം (Inquiry Chat)</span>
              </button>
            </div>

            {/* Working Hours & Availability */}
            <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 shadow-card space-y-4">
              <h3 className="text-sm font-bold font-malayalam-serif text-[#1B4D36] border-b border-[#F3EFE6] pb-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#B87A1E]" />
                <span>പ്രവൃത്തി സമയക്രമം (Working Hours)</span>
              </h3>

              <div className="space-y-2 text-xs">
                {[
                  { day: "തിങ്കൾ - വെള്ളി", hours: "08:30 AM - 06:30 PM", active: true },
                  { day: "ശനിയാഴ്ച", hours: "08:30 AM - 05:00 PM", active: true },
                  { day: "ഞായറാഴ്ച", hours: "അടിയന്തിര സേവനങ്ങൾ മാത്രം", active: false },
                ].map((s, idx) => (
                  <div key={idx} className="flex items-center justify-between text-[#3E4D45]">
                    <span className="font-semibold">{s.day}</span>
                    <span className={s.active ? "text-[#1B4D36] font-bold" : "text-amber-800 italic"}>
                      {s.hours}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-[#F3EFE6]">
                <span className="text-[11px] text-[#7A8880] block mb-1">സേവനം നൽകുന്ന പ്രദേശങ്ങൾ:</span>
                <div className="flex flex-wrap gap-1">
                  {pro.service_areas.map((area) => (
                    <span key={area} className="px-2 py-0.5 rounded-md bg-[#FAF7F0] border border-[#DDD5C5] text-[10px] text-[#1B4D36] font-semibold">
                      📍 {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Safety & Trust Box */}
            <div className="bg-[#FAF4E6] rounded-3xl border border-[#E8DCBF] p-6 shadow-card text-[#8C5B0F] space-y-2">
              <h4 className="text-xs font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>നമ്മുടെ നാട് സുരക്ഷാ ഉറപ്പ്</span>
              </h4>
              <p className="text-[11px] leading-relaxed">
                ഉപഭോക്താവിന്റെ സുരക്ഷ മുൻനിർത്തി സർവീസ് പൂർത്തിയായ ശേഷം മാത്രം പണം നൽകുക. 
                ഒടിപിയോ ബാങ്ക് രേഖകളോ ആരുമായും പങ്കുവെക്കരുത്.
              </p>
            </div>

          </div>

        </div>

      </main>

      {/* ==================================================== */}
      {/* 1. BOOKING APPOINTMENT MODAL */}
      {/* ==================================================== */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#EAE4D7] space-y-5 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-[#F3EFE6] pb-3">
              <div>
                <h3 className="font-bold text-base text-[#1B4D36] font-malayalam-serif">
                  അപ്പോയിന്റ്മെന്റ് ബുക്ക് ചെയ്യുക (Schedule Service)
                </h3>
                <p className="text-[11px] text-[#7A8880]">{pro.display_name} • {pro.locality}</p>
              </div>
              <button
                onClick={() => setBookingModalOpen(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-neutral-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {bookingSuccess ? (
              <div className="py-6 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-bold font-malayalam-serif text-[#1B4D36]">
                    ബുക്കിംഗ് അപേക്ഷ സമർപ്പിച്ചു!
                  </h4>
                  <p className="text-xs text-[#5C6A64]">
                    ബുക്കിംഗ് നമ്പർ: <strong className="text-[#1B4D36] font-mono">{bookingSuccess.booking_number}</strong>
                  </p>
                  <p className="text-xs text-[#7A8880] max-w-sm mx-auto pt-1">
                    നിങ്ങളുടെ ബുക്കിംഗ് അപേക്ഷ സർവീസ് പ്രൊവൈഡർക്ക് കൈമാറി. ഉടൻ തന്നെ സ്ഥിരീകരണം ലഭ്യമാകും.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7] text-left text-xs space-y-1.5 max-w-xs mx-auto">
                  <div className="flex justify-between">
                    <span className="text-[#7A8880]">തീയതി:</span>
                    <span className="font-bold">{bookingSuccess.booking_date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A8880]">സമയം:</span>
                    <span className="font-bold">{bookingSuccess.time_slot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A8880]">നിരക്ക്:</span>
                    <span className="font-bold text-[#1B4D36]">₹{bookingSuccess.estimated_price} (Pay on completion)</span>
                  </div>
                </div>

                <div className="flex justify-center gap-3 pt-2">
                  <Link
                    href="/dashboard/bookings"
                    className="px-5 py-2.5 rounded-xl bg-[#1B4D36] text-white text-xs font-bold hover:bg-[#143B29] transition shadow-md"
                  >
                    ബുക്കിംഗ് ട്രാക്ക് ചെയ്യുക
                  </Link>
                  <button
                    type="button"
                    onClick={() => setBookingModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-neutral-100 text-neutral-700 text-xs font-semibold hover:bg-neutral-200"
                  >
                    അടയ്ക്കുക
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleConfirmBooking} className="space-y-4">
                
                {bookingError && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{bookingError}</span>
                  </div>
                )}

                {/* Service Select */}
                <div>
                  <label className="block text-xs font-bold text-[#1A2420] mb-1">
                    ആവശ്യമായ സേവനം തിരഞ്ഞെടുക്കുക (Service) *
                  </label>
                  <select
                    value={selectedService?.id || ""}
                    onChange={(e) => {
                      const found = services.find((s) => s.id === e.target.value);
                      if (found) setSelectedService(found);
                    }}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                  >
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>
                        {language === "ml" && s.title_ml ? s.title_ml : s.title} — ₹{s.price}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date and Time Slot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#1A2420] mb-1">
                      തീയതി (Date) *
                    </label>
                    <input
                      type="date"
                      required
                      value={bookingDate}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A2420] mb-1">
                      സമയം (Time Slot) *
                    </label>
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                    >
                      {AVAILABLE_SLOTS.map((slot) => {
                        const isAvail = store.isSlotAvailable(pro.id, bookingDate, slot);
                        return (
                          <option key={slot} value={slot} disabled={!isAvail}>
                            {slot} {!isAvail ? "(Already Booked)" : ""}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                {/* Customer Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#1A2420] mb-1">
                      നിങ്ങളുടെ പേര് (Name) *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                      placeholder="പേര് നൽകുക"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A2420] mb-1">
                      ഫോൺ നമ്പർ (Phone) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                      placeholder="+91 98470 11223"
                    />
                  </div>
                </div>

                {/* Address & Locality */}
                <div>
                  <label className="block text-xs font-bold text-[#1A2420] mb-1">
                    സേവനം ആവശ്യമായ വിലാസം (Service Address in Malappuram) *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="വീട്ടുപേര് / കെട്ടിടം, റോഡ്, ലാൻഡ്മാർക്ക്..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1A2420] mb-1">
                    പ്രത്യേക നിർദ്ദേശങ്ങൾ (Special Notes - Optional)
                  </label>
                  <input
                    type="text"
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    placeholder="ഉദാ: കോളിംഗ് ബെല്ലിന് പകരം ഫോൺ ചെയ്യുക, ഗേറ്റ് തുറന്നിരിക്കും"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                  />
                </div>

                {/* Price Breakdown */}
                <div className="p-3.5 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7] flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#1A2420] block">സേവന നിരക്ക് (Estimated Fee)</span>
                    <span className="text-[11px] text-[#7A8880]">ജോലി പൂർത്തിയായ ശേഷം പണമായോ UPI വഴിയോ നൽകാം</span>
                  </div>
                  <span className="text-lg font-bold font-mono text-[#1B4D36]">
                    ₹{selectedService?.price || pro.starting_price}
                  </span>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#F3EFE6]">
                  <button
                    type="button"
                    onClick={() => setBookingModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-[#5C6A64] hover:bg-neutral-100"
                  >
                    റദ്ദാക്കുക
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#1B4D36] hover:bg-[#143B29] text-white text-xs font-bold transition shadow-md flex items-center gap-1.5 active:scale-95"
                  >
                    <Check className="w-4 h-4" />
                    <span>ബുക്കിംഗ് സ്ഥിരീകരിക്കുക</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* 2. MESSAGING / INQUIRY CHAT MODAL */}
      {/* ==================================================== */}
      {messageModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#EAE4D7] space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[#F3EFE6] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#1B4D36] text-amber-200 text-xs font-bold flex items-center justify-center">
                  {pro.display_name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-xs sm:text-sm text-[#1B4D36]">
                    {pro.display_name}
                  </h3>
                  <span className="text-[10px] text-emerald-600 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>ഓൺലൈൻ (Online)</span>
                  </span>
                </div>
              </div>
              <button
                onClick={() => setMessageModalOpen(false)}
                className="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-neutral-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Safety Warning Banner */}
            <div className="p-2.5 rounded-xl bg-[#FAF4E6] border border-[#E8DCBF] text-[10px] text-[#8C5B0F] flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 shrink-0" />
              <span>സുരക്ഷയ്ക്കായി ബാങ്ക് വിവരങ്ങളോ OTP യോ പങ്കുവെക്കരുത്.</span>
            </div>

            {/* Chat Box History */}
            <div className="h-48 overflow-y-auto p-3 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7] space-y-2 text-xs">
              <div className="bg-white p-2.5 rounded-2xl rounded-tl-none border border-[#DDD5C5] text-[#3E4D45] max-w-[85%] space-y-0.5">
                <p>നമസ്കാരം! {pro.business_name || pro.display_name} സർവീസിലേക്ക് സ്വാഗതം. എന്താണ് താങ്കളുടെ ആവശ്യം?</p>
                <span className="text-[9px] text-[#7A8880] block text-right">09:30 AM</span>
              </div>

              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className="bg-[#1B4D36] text-white p-2.5 rounded-2xl rounded-tr-none ml-auto max-w-[85%] space-y-0.5 shadow-xs"
                >
                  <p>{msg}</p>
                  <span className="text-[9px] text-white/70 block text-right">ഇപ്പോൾ</span>
                </div>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="സന്ദേശം ടൈപ്പ് ചെയ്യുക..."
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#1B4D36] text-white hover:bg-[#143B29] transition shadow-xs flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* 3. REPORT PROFILE MODAL */}
      {/* ==================================================== */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#EAE4D7] space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[#F3EFE6] pb-3">
              <h3 className="font-bold text-sm text-red-700 font-malayalam-serif flex items-center gap-1.5">
                <Flag className="w-4 h-4" />
                <span>പ്രൊഫൈൽ റിപ്പോർട്ട് ചെയ്യുക (Report Profile)</span>
              </h3>
              <button
                onClick={() => setReportModalOpen(false)}
                className="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-neutral-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {reportSuccess ? (
              <div className="py-6 text-center space-y-2 text-emerald-700">
                <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-600" />
                <h4 className="font-bold text-xs">റിപ്പോർട്ട് മോഡറേറ്റർമാർക്ക് കൈമാറി</h4>
                <p className="text-[11px] text-[#7A8880]">പരിശോധിച്ച് ആവശ്യമായ നടപടികൾ സ്വീകരിക്കും.</p>
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-[#1A2420] mb-1">കാരണം തിരഞ്ഞെടുക്കുക (Reason)</label>
                  <select
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420]"
                  >
                    <option value="incorrect_info">തെറ്റായ വിവരങ്ങൾ അല്ലെങ്കിൽ വിലാസം</option>
                    <option value="unprofessional_conduct">അനുചിതമായ പെരുമാറ്റം / വഞ്ചന</option>
                    <option value="fake_profile">വ്യാജ പ്രൊഫൈൽ / വ്യാജ യോഗ്യതകൾ</option>
                    <option value="other">മറ്റുള്ളവ</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#1A2420] mb-1">വിശദാംശങ്ങൾ (Details)</label>
                  <textarea
                    rows={3}
                    required
                    value={reportDetails}
                    onChange={(e) => setReportDetails(e.target.value)}
                    placeholder="കാരണം വ്യക്തമാക്കുക..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#F3EFE6]">
                  <button
                    type="button"
                    onClick={() => setReportModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-[#5C6A64] hover:bg-neutral-100"
                  >
                    റദ്ദാക്കുക
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition shadow-xs"
                  >
                    റിപ്പോർട്ട് സമർപ്പിക്കുക
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
