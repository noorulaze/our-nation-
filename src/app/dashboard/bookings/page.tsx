"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { useLanguage } from "@/lib/i18n/context";
import { useAuth } from "@/lib/auth/context";
import { store } from "@/lib/data/store";
import { Booking, BookingStatus, Review } from "@/types/database";
import Link from "next/link";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Star, 
  MessageSquare, 
  Wrench, 
  ArrowRight, 
  Check, 
  X, 
  RotateCcw, 
  Send, 
  Upload, 
  ShieldCheck, 
  User,
  DollarSign,
  ChevronRight
} from "lucide-react";

export default function BookingsDashboardPage() {
  const { t, language } = useLanguage();
  const { user } = useAuth();

  const [activeView, setActiveView] = useState<"customer" | "provider">("customer");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Get current user's provider profile if available
  const myProProfile = user ? store.getProfessionalByUserId(user.id) || store.getProfessionalById("pro-001") : undefined;

  // Bookings list
  const [customerBookings, setCustomerBookings] = useState<Booking[]>([]);
  const [providerBookings, setProviderBookings] = useState<Booking[]>([]);

  const reloadBookings = () => {
    if (user) {
      setCustomerBookings(store.getBookings({ customerId: user.id }));
    } else {
      setCustomerBookings(store.getBookings());
    }

    if (myProProfile) {
      setProviderBookings(store.getBookings({ professionalId: myProProfile.id }));
    }
  };

  useEffect(() => {
    reloadBookings();
  }, [user, myProProfile]);

  // Review Modal State
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedBookingForReview, setSelectedBookingForReview] = useState<Booking | null>(null);
  const [ratingOverall, setRatingOverall] = useState(5);
  const [ratingPunctuality, setRatingPunctuality] = useState(5);
  const [ratingQuality, setRatingQuality] = useState(5);
  const [ratingValue, setRatingValue] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewError, setReviewError] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Decline Modal State
  const [declineModalOpen, setDeclineModalOpen] = useState(false);
  const [selectedBookingForDecline, setSelectedBookingForDecline] = useState<Booking | null>(null);
  const [declineReason, setDeclineReason] = useState("");

  // Reschedule Modal State
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [selectedBookingForReschedule, setSelectedBookingForReschedule] = useState<Booking | null>(null);
  const [newDate, setNewDate] = useState("");
  const [newSlot, setNewSlot] = useState("11:30 AM - 12:30 PM");

  // Chat Modal State
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [activeBookingChat, setActiveBookingChat] = useState<Booking | null>(null);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<any[]>([]);

  // Action Handlers
  const handleAcceptBooking = (bId: string) => {
    store.updateBookingStatus(bId, "accepted", undefined, user?.id);
    reloadBookings();
  };

  const handleOpenDecline = (booking: Booking) => {
    setSelectedBookingForDecline(booking);
    setDeclineReason("");
    setDeclineModalOpen(true);
  };

  const handleConfirmDecline = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedBookingForDecline) {
      store.updateBookingStatus(selectedBookingForDecline.id, "declined", declineReason || "Provider unavailable", user?.id);
      setDeclineModalOpen(false);
      reloadBookings();
    }
  };

  const handleOpenReschedule = (booking: Booking) => {
    setSelectedBookingForReschedule(booking);
    const d = new Date();
    d.setDate(d.getDate() + 2);
    setNewDate(d.toISOString().split("T")[0]);
    setRescheduleModalOpen(true);
  };

  const handleConfirmReschedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedBookingForReschedule && newDate && newSlot) {
      store.rescheduleBooking(selectedBookingForReschedule.id, newDate, newSlot, user?.id);
      setRescheduleModalOpen(false);
      reloadBookings();
    }
  };

  const handleStartWork = (bId: string) => {
    store.updateBookingStatus(bId, "in_progress", undefined, user?.id);
    reloadBookings();
  };

  const handleCompleteWork = (bId: string) => {
    store.updateBookingStatus(bId, "completed", undefined, user?.id);
    reloadBookings();
  };

  const handleCancelBooking = (bId: string) => {
    if (confirm("ഈ ബുക്കിംഗ് റദ്ദാക്കാൻ ആഗ്രഹിക്കുന്നുണ്ടോ? (Cancel booking?)")) {
      store.updateBookingStatus(bId, "cancelled", "Cancelled by customer", user?.id);
      reloadBookings();
    }
  };

  // Review Handler
  const handleOpenReview = (booking: Booking) => {
    setSelectedBookingForReview(booking);
    setRatingOverall(5);
    setRatingPunctuality(5);
    setRatingQuality(5);
    setRatingValue(5);
    setReviewComment("");
    setReviewError("");
    setReviewSuccess(false);
    setReviewModalOpen(true);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBookingForReview) return;

    if (!reviewComment.trim()) {
      setReviewError("ദയവായി നിങ്ങളുടെ വിലയിരുത്തൽ രേഖപ്പെടുത്തുക (Please write a review).");
      return;
    }

    const res = store.createReview({
      booking_id: selectedBookingForReview.id,
      professional_id: selectedBookingForReview.professional_id,
      customer_id: user?.id || "u0000000-0000-0000-0000-000000000001",
      customer_name: user?.display_name || "Customer",
      customer_avatar: user?.avatar_url || null,
      rating_overall: ratingOverall,
      rating_punctuality: ratingPunctuality,
      rating_quality: ratingQuality,
      rating_value: ratingValue,
      comment: reviewComment,
    });

    if (res.success) {
      setReviewSuccess(true);
      setTimeout(() => {
        setReviewModalOpen(false);
        setReviewSuccess(false);
        reloadBookings();
      }, 1500);
    } else {
      setReviewError(res.error || "Review could not be submitted.");
    }
  };

  // Chat Handler
  const handleOpenChat = (booking: Booking) => {
    setActiveBookingChat(booking);
    const conv = store.getOrCreateConversationForBooking(booking.id);
    setChatMessages(store.getChatMessages(conv.id));
    setChatInput("");
    setChatModalOpen(true);
  };

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !activeBookingChat) return;

    const conv = store.getOrCreateConversationForBooking(activeBookingChat.id);
    const msg = store.sendChatMessage(
      conv.id,
      user?.id || "u0000000-0000-0000-0000-000000000001",
      user?.display_name || "User",
      chatInput
    );
    setChatMessages((prev) => [...prev, msg]);
    setChatInput("");
  };

  // Filtered List based on tab and status
  const currentList = activeView === "customer" ? customerBookings : providerBookings;
  const filteredList = statusFilter === "all"
    ? currentList
    : currentList.filter((b) => b.status === statusFilter);

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case "pending":
        return <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold">പ്രതീക്ഷിക്കുന്നു (Pending)</span>;
      case "accepted":
      case "confirmed":
        return <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold">സ്ഥിരീകരിച്ചു (Confirmed)</span>;
      case "in_progress":
        return <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-300 text-[10px] font-bold">പുരോഗമിക്കുന്നു (In Progress)</span>;
      case "completed":
        return <span className="px-2.5 py-1 rounded-full bg-purple-100 text-purple-800 border border-purple-300 text-[10px] font-bold">പൂർത്തിയായി (Completed)</span>;
      case "declined":
        return <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-800 border border-red-300 text-[10px] font-bold">നിരസിച്ചു (Declined)</span>;
      case "rescheduled":
        return <span className="px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-300 text-[10px] font-bold">സമയം മാറ്റി (Rescheduled)</span>;
      case "cancelled":
        return <span className="px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-700 border border-neutral-300 text-[10px] font-bold">റദ്ദാക്കി (Cancelled)</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-700 text-[10px] font-bold">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "പ്രൊഫൈൽ", href: "/profile" },
            { label: "ബുക്കിംഗ് ഡാഷ്‌ബോർഡ് (Bookings)" },
          ]}
        />

        {/* Dashboard Header & Dual View Tabs */}
        <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 sm:p-8 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-bold font-malayalam-serif text-[#1B4D36] flex items-center gap-2">
              <Calendar className="w-6 h-6 text-[#B87A1E]" />
              <span>സേവന ബുക്കിംഗ് ഡാഷ്‌ബോർഡ്</span>
            </h1>
            <p className="text-xs text-[#7A8880]">
              നിങ്ങളുടെ സേവന അപ്പോയിന്റ്മെന്റുകൾ, ഷെഡ്യൂളുകൾ, തത്സമയ സ്റ്റാറ്റസ് ട്രാക്കിംഗ്.
            </p>
          </div>

          {/* Dual Tab Switcher */}
          <div className="flex bg-[#FAF7F0] p-1.5 rounded-2xl border border-[#DDD5C5] shrink-0">
            <button
              onClick={() => {
                setActiveView("customer");
                setStatusFilter("all");
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeView === "customer"
                  ? "bg-[#1B4D36] text-white shadow-xs"
                  : "text-[#5C6A64] hover:text-[#1A2420]"
              }`}
            >
              എന്റെ ബുക്കിംഗുകൾ ({customerBookings.length})
            </button>
            <button
              onClick={() => {
                setActiveView("provider");
                setStatusFilter("all");
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeView === "provider"
                  ? "bg-[#1B4D36] text-white shadow-xs"
                  : "text-[#5C6A64] hover:text-[#1A2420]"
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>ഇൻകമിംഗ് വർക്കുകൾ ({providerBookings.length})</span>
            </button>
          </div>
        </div>

        {/* Status Filters Bar */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: "all", label: "എല്ലാം (All)" },
            { id: "pending", label: "തീരുമാനമാകാത്തവ (Pending)" },
            { id: "accepted", label: "സ്ഥിരീകരിച്ചവ (Confirmed)" },
            { id: "in_progress", label: "പുരോഗമിക്കുന്നവ (In Progress)" },
            { id: "completed", label: "പൂർത്തിയായവ (Completed)" },
            { id: "cancelled", label: "റദ്ദാക്കിയവ (Cancelled)" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setStatusFilter(f.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
                statusFilter === f.id
                  ? "bg-[#1B4D36] text-white border-[#1B4D36] font-bold"
                  : "bg-white text-[#5C6A64] border-[#EAE4D7] hover:bg-[#FAF7F0]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* BOOKINGS LIST */}
        {filteredList.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#EAE4D7] p-12 text-center space-y-3 shadow-card">
            <Calendar className="w-12 h-12 text-[#DDD5C5] mx-auto" />
            <h3 className="text-base font-bold font-malayalam-serif text-[#1B4D36]">
              ബുക്കിംഗുകൾ ഒന്നും കണ്ടെത്തിയില്ല
            </h3>
            <p className="text-xs text-[#7A8880] max-w-sm mx-auto">
              {activeView === "customer"
                ? "നിങ്ങൾ ഇതുവരെ പുതിയ സർവീസ് ബുക്കിംഗുകൾ ഒന്നും ചെയ്തിട്ടില്ല."
                : "നിങ്ങൾക്ക് ലഭിച്ച പുതിയ സർവീസ് അപേക്ഷകൾ ഒന്നും നിലവിലില്ല."}
            </p>
            {activeView === "customer" && (
              <Link
                href="/professionals"
                className="inline-block px-5 py-2.5 rounded-xl bg-[#1B4D36] text-white text-xs font-bold"
              >
                സേവന വിദഗ്ദ്ധരെ കണ്ടെത്തൂ (Explore Professionals)
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredList.map((b) => {
              const isCustomerView = activeView === "customer";
              const pro = store.getProfessionalById(b.professional_id);

              return (
                <div
                  key={b.id}
                  className="bg-white rounded-3xl border border-[#EAE4D7] p-5 sm:p-6 shadow-card hover:border-[#1B4D36]/40 transition space-y-4"
                >
                  {/* Top Bar: Booking Number & Status Badge */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F3EFE6] pb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-[#1B4D36] bg-[#E0F1E7] px-2.5 py-1 rounded-lg border border-[#BDE3CE]">
                        {b.booking_number}
                      </span>
                      <span className="text-xs text-[#7A8880]">
                        തീയതി: {b.booking_date} ({b.time_slot})
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {getStatusBadge(b.status)}
                    </div>
                  </div>

                  {/* Main Info Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                    
                    {/* Left: Service & Provider/Customer Info (7 Cols) */}
                    <div className="md:col-span-7 space-y-2">
                      <h3 className="font-bold text-sm sm:text-base text-[#1A2420]">
                        {b.service_title}
                      </h3>

                      <div className="space-y-1 text-xs text-[#5C6A64]">
                        {isCustomerView ? (
                          <div className="flex items-center gap-2">
                            <span className="text-[#7A8880]">സേവന ദാതാവ്:</span>
                            <Link
                              href={`/professionals/${pro?.username || ""}`}
                              className="font-bold text-[#1B4D36] hover:underline"
                            >
                              {pro?.display_name || "Service Provider"} ({pro?.locality})
                            </Link>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="text-[#7A8880]">ഉപഭോക്താവ്:</span>
                            <span className="font-bold text-[#1A2420]">{b.customer_name}</span>
                          </div>
                        )}

                        <div className="flex items-start gap-1.5 text-[11px] text-[#7A8880]">
                          <MapPin className="w-3.5 h-3.5 shrink-0 text-[#1B4D36] mt-0.5" />
                          <span>{b.customer_address}, {b.customer_locality}</span>
                        </div>

                        {b.customer_phone && (b.status === "accepted" || b.status === "confirmed" || b.status === "in_progress") && (
                          <div className="flex items-center gap-1.5 text-[11px] text-[#1B4D36] font-semibold">
                            <Phone className="w-3.5 h-3.5" />
                            <span>{b.customer_phone}</span>
                          </div>
                        )}

                        {b.special_instructions && (
                          <div className="p-2 rounded-xl bg-[#FAF7F0] border border-[#DDD5C5] text-[11px] text-[#3E4D45] mt-1">
                            <strong>നിർദ്ദേശങ്ങൾ:</strong> {b.special_instructions}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right: Price & Quick Action Buttons (5 Cols) */}
                    <div className="md:col-span-5 flex flex-col sm:items-end justify-between h-full space-y-3">
                      <div>
                        <span className="text-[10px] text-[#7A8880] block sm:text-right">എസ്റ്റിമേറ്റ് തുക</span>
                        <span className="text-xl font-bold font-mono text-[#1B4D36] block sm:text-right">
                          ₹{b.estimated_price}
                        </span>
                        <span className="text-[10px] text-[#8C5B0F] bg-[#FAF4E6] px-2 py-0.5 rounded-md block sm:text-right border border-[#E8DCBF]">
                          Pay on completion
                        </span>
                      </div>

                      {/* ACTIONS PER STATUS */}
                      <div className="flex flex-wrap items-center gap-2 justify-end pt-1">
                        
                        {/* Chat Button (Always available for active or recent bookings) */}
                        <button
                          type="button"
                          onClick={() => handleOpenChat(b)}
                          className="px-3 py-1.5 rounded-xl bg-[#FAF7F0] hover:bg-[#F3EFE6] border border-[#DDD5C5] text-xs font-bold text-[#1B4D36] transition flex items-center gap-1"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-[#1B4D36]" />
                          <span>ചാറ്റ്</span>
                        </button>

                        {/* Customer Actions */}
                        {isCustomerView && (
                          <>
                            {b.status === "completed" && (
                              <button
                                type="button"
                                onClick={() => handleOpenReview(b)}
                                className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#1B4D36] text-xs font-bold transition shadow-xs flex items-center gap-1"
                              >
                                <Star className="w-3.5 h-3.5 fill-[#1B4D36]" />
                                <span>റേറ്റിംഗ് നൽകൂ</span>
                              </button>
                            )}

                            {["pending", "accepted", "confirmed"].includes(b.status) && (
                              <button
                                type="button"
                                onClick={() => handleCancelBooking(b.id)}
                                className="px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-xs font-bold text-red-700 transition"
                              >
                                റദ്ദാക്കുക
                              </button>
                            )}
                          </>
                        )}

                        {/* Provider Actions */}
                        {!isCustomerView && (
                          <>
                            {b.status === "pending" && (
                              <>
                                <button
                                  type="button"
                                  onClick={() => handleOpenDecline(b)}
                                  className="px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-xs font-bold text-red-700 transition"
                                >
                                  നിരസിക്കുക
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleOpenReschedule(b)}
                                  className="px-3 py-1.5 rounded-xl bg-[#FAF7F0] hover:bg-[#F3EFE6] border border-[#DDD5C5] text-xs font-bold text-[#1B4D36] transition"
                                >
                                  സമയം മാറ്റുക
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleAcceptBooking(b.id)}
                                  className="px-4 py-1.5 rounded-xl bg-[#1B4D36] hover:bg-[#143B29] text-white text-xs font-bold transition shadow-xs flex items-center gap-1"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                  <span>സ്വീകരിക്കുക</span>
                                </button>
                              </>
                            )}

                            {(b.status === "accepted" || b.status === "confirmed") && (
                              <button
                                type="button"
                                onClick={() => handleStartWork(b.id)}
                                className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-xs"
                              >
                                ജോലി ആരംഭിച്ചു (Start Work)
                              </button>
                            )}

                            {b.status === "in_progress" && (
                              <button
                                type="button"
                                onClick={() => handleCompleteWork(b.id)}
                                className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition shadow-xs flex items-center gap-1"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>പൂർത്തിയായി (Mark Completed)</span>
                              </button>
                            )}
                          </>
                        )}

                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </main>

      {/* ==================================================== */}
      {/* 1. REVIEW MODAL (MODULE 9: VERIFIED RATINGS) */}
      {/* ==================================================== */}
      {reviewModalOpen && selectedBookingForReview && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#EAE4D7] space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[#F3EFE6] pb-3">
              <h3 className="font-bold text-base text-[#1B4D36] font-malayalam-serif">
                അഭിപ്രായം രേഖപ്പെടുത്തൂ (Verified Review)
              </h3>
              <button
                onClick={() => setReviewModalOpen(false)}
                className="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-neutral-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {reviewSuccess ? (
              <div className="py-6 text-center space-y-2 text-emerald-700">
                <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-600" />
                <h4 className="font-bold text-sm">വിലയേറിയ അഭിപ്രായത്തിന് നന്ദി!</h4>
                <p className="text-xs text-[#7A8880]">നിങ്ങളുടെ റേറ്റിംഗ് പ്രൊഫഷണൽ പ്രൊഫൈലിൽ ചേർത്തു.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4 text-xs">
                
                {reviewError && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                    {reviewError}
                  </div>
                )}

                {/* Overall Rating Star Selector */}
                <div className="text-center p-3 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7] space-y-1">
                  <span className="font-bold text-xs text-[#1A2420]">മൊത്തത്തിലുള്ള റേറ്റിംഗ് (Overall Rating)</span>
                  <div className="flex justify-center gap-2 pt-1 text-amber-500">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRatingOverall(star)}
                        className="p-1 hover:scale-125 transition"
                      >
                        <Star className={`w-6 h-6 ${star <= ratingOverall ? "fill-amber-500" : "text-neutral-300"}`} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sub-criteria ratings */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-[#5C6A64]">കൃത്യസമയത്ത് എത്തിയോ (Punctuality):</span>
                    <select
                      value={ratingPunctuality}
                      onChange={(e) => setRatingPunctuality(Number(e.target.value))}
                      className="px-2 py-1 rounded-lg border border-[#DDD5C5] bg-[#FAF7F0]"
                    >
                      <option value="5">⭐⭐⭐⭐⭐ 5</option>
                      <option value="4">⭐⭐⭐⭐ 4</option>
                      <option value="3">⭐⭐⭐ 3</option>
                      <option value="2">⭐⭐ 2</option>
                      <option value="1">⭐ 1</option>
                    </select>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[#5C6A64]">ജോലിയുടെ ഗുണനിലവാരം (Quality):</span>
                    <select
                      value={ratingQuality}
                      onChange={(e) => setRatingQuality(Number(e.target.value))}
                      className="px-2 py-1 rounded-lg border border-[#DDD5C5] bg-[#FAF7F0]"
                    >
                      <option value="5">⭐⭐⭐⭐⭐ 5</option>
                      <option value="4">⭐⭐⭐⭐ 4</option>
                      <option value="3">⭐⭐⭐ 3</option>
                      <option value="2">⭐⭐ 2</option>
                      <option value="1">⭐ 1</option>
                    </select>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[#5C6A64]">ന്യായമായ നിരക്ക് (Value for Money):</span>
                    <select
                      value={ratingValue}
                      onChange={(e) => setRatingValue(Number(e.target.value))}
                      className="px-2 py-1 rounded-lg border border-[#DDD5C5] bg-[#FAF7F0]"
                    >
                      <option value="5">⭐⭐⭐⭐⭐ 5</option>
                      <option value="4">⭐⭐⭐⭐ 4</option>
                      <option value="3">⭐⭐⭐ 3</option>
                      <option value="2">⭐⭐ 2</option>
                      <option value="1">⭐ 1</option>
                    </select>
                  </div>
                </div>

                {/* Comment */}
                <div>
                  <label className="block font-bold text-[#1A2420] mb-1">നിങ്ങളുടെ അനുഭവം വിവരിക്കുക (Feedback) *</label>
                  <textarea
                    rows={3}
                    required
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="സേവനത്തെക്കുറിച്ചും പെരുമാറ്റത്തെക്കുറിച്ചും നിങ്ങളുടെ സത്യസന്ധമായ അഭിപ്രായം എഴുതൂ..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#F3EFE6]">
                  <button
                    type="button"
                    onClick={() => setReviewModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-[#5C6A64] hover:bg-neutral-100"
                  >
                    റദ്ദാക്കുക
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#1B4D36] hover:bg-[#143B29] text-white text-xs font-bold transition shadow-xs flex items-center gap-1"
                  >
                    <Check className="w-4 h-4" />
                    <span>റേറ്റിംഗ് സമർപ്പിക്കുക</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* 2. DECLINE REASON MODAL */}
      {/* ==================================================== */}
      {declineModalOpen && selectedBookingForDecline && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#EAE4D7] space-y-4 animate-in fade-in zoom-in-95">
            <h3 className="font-bold text-sm text-red-700 font-malayalam-serif">
              ബുക്കിംഗ് നിരസിക്കുന്നതിനുള്ള കാരണം
            </h3>
            <form onSubmit={handleConfirmDecline} className="space-y-3 text-xs">
              <select
                value={declineReason}
                onChange={(e) => setDeclineReason(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#DDD5C5] bg-[#FAF7F0]"
              >
                <option value="ആ സമയത്ത് മറ്റ് തിരക്കുകൾ ഉള്ളതിനാൽ">ആ സമയത്ത് മറ്റ് തിരക്കുകൾ ഉള്ളതിനാൽ (Busy with other work)</option>
                <option value="ആവശ്യമായ സാമഗ്രികൾ ലഭ്യമല്ലാത്തതിനാൽ">ആവശ്യമായ സാമഗ്രികൾ ലഭ്യമല്ലാത്തതിനാൽ (Materials unavailable)</option>
                <option value="സേവന പരിധിക്ക് പുറത്തായതിനാൽ">സേവന പരിധിക്ക് പുറത്തായതിനാൽ (Out of service area)</option>
                <option value="മറ്റുള്ളവ">മറ്റുള്ളവ (Other)</option>
              </select>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setDeclineModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#5C6A64] hover:bg-neutral-100"
                >
                  റദ്ദാക്കുക
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold"
                >
                  നിരസിക്കുക
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* 3. RESCHEDULE MODAL */}
      {/* ==================================================== */}
      {rescheduleModalOpen && selectedBookingForReschedule && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#EAE4D7] space-y-4 animate-in fade-in zoom-in-95">
            <h3 className="font-bold text-sm text-[#1B4D36] font-malayalam-serif">
              മറ്റൊരു സമയത്തേക്ക് മാറ്റാൻ നിർദ്ദേശിക്കുക (Reschedule)
            </h3>
            <form onSubmit={handleConfirmReschedule} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#1A2420] mb-1">പുതിയ തീയതി (New Date)</label>
                <input
                  type="date"
                  required
                  value={newDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1A2420] mb-1">പുതിയ സമയം (New Slot)</label>
                <select
                  value={newSlot}
                  onChange={(e) => setNewSlot(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5C5] bg-[#FAF7F0]"
                >
                  <option value="09:00 AM - 10:00 AM">09:00 AM - 10:00 AM</option>
                  <option value="11:30 AM - 12:30 PM">11:30 AM - 12:30 PM</option>
                  <option value="02:30 PM - 03:30 PM">02:30 PM - 03:30 PM</option>
                  <option value="04:30 PM - 05:30 PM">04:30 PM - 05:30 PM</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRescheduleModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#5C6A64] hover:bg-neutral-100"
                >
                  റദ്ദാക്കുക
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#1B4D36] hover:bg-[#143B29] text-white text-xs font-bold"
                >
                  നിർദ്ദേശം അയക്കുക
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* 4. CHAT MODAL LINKED TO BOOKING */}
      {/* ==================================================== */}
      {chatModalOpen && activeBookingChat && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#EAE4D7] space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[#F3EFE6] pb-3">
              <div>
                <h3 className="font-bold text-xs sm:text-sm text-[#1B4D36]">
                  ബുക്കിംഗ് സന്ദേശങ്ങൾ (#{activeBookingChat.booking_number})
                </h3>
                <span className="text-[10px] text-[#7A8880]">{activeBookingChat.service_title}</span>
              </div>
              <button
                onClick={() => setChatModalOpen(false)}
                className="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-neutral-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="h-56 overflow-y-auto p-3 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7] space-y-2 text-xs">
              {chatMessages.length === 0 ? (
                <p className="text-center text-[#7A8880] py-12 text-xs italic">
                  ഇതുവരെ സന്ദേശങ്ങൾ ഒന്നും അയച്ചിട്ടില്ല.
                </p>
              ) : (
                chatMessages.map((m) => {
                  const isMe = m.sender_id === (user?.id || "u0000000-0000-0000-0000-000000000001");
                  return (
                    <div
                      key={m.id}
                      className={`p-2.5 rounded-2xl max-w-[85%] space-y-0.5 text-xs ${
                        isMe
                          ? "bg-[#1B4D36] text-white rounded-tr-none ml-auto"
                          : "bg-white text-[#3E4D45] rounded-tl-none border border-[#DDD5C5]"
                      }`}
                    >
                      <span className="text-[9px] font-bold block opacity-75">{m.sender_name}</span>
                      <p>{m.content}</p>
                      <span className={`text-[8px] block text-right ${isMe ? "text-white/70" : "text-[#7A8880]"}`}>
                        {new Date(m.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  );
                })
              )}
            </div>

            <form onSubmit={handleSendChatMessage} className="flex gap-2">
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

      <Footer />
      <BottomNav />
    </div>
  );
}
