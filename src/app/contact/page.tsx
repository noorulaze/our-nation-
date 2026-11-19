"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  CheckCircle2,
  Building,
  Sparkles,
  ExternalLink,
  Globe,
  ShieldCheck,
  Building2,
  HelpCircle,
  AlertTriangle,
  ChevronDown
} from "lucide-react";
import dynamic from "next/dynamic";

// Dynamic import for Leaflet map component to prevent SSR window issues
const CommunityMap = dynamic(
  () => import("@/components/map/CommunityMap").then((mod) => mod.CommunityMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-[280px] w-full rounded-2xl bg-[#EDE6D8] animate-pulse flex items-center justify-center text-xs text-[#5C6A64]">
        Loading Tanur Municipality Map...
      </div>
    ),
  }
);

interface FaqItem {
  q: string;
  a: string;
}

const faqs: FaqItem[] = [
  {
    q: "How can I report a civic issue in Tanur?",
    a: "You can report civic issues such as road damage, garbage accumulation, or street light failure directly through the Civic Connect page or by calling our municipal switchboard at 0494 2440228.",
  },
  {
    q: "Where is the Tanur Municipality office located?",
    a: "The main administrative office of Tanur Municipality is located on Main Road, Tanur, Malappuram District, Kerala - 676302.",
  },
  {
    q: "What are the official working hours of the municipality?",
    a: "The municipal office operates from Monday to Saturday between 10:00 AM and 5:00 PM. The office is closed on Sundays, second Saturdays, and statutory public holidays.",
  },
  {
    q: "How do I apply for certificates (Birth, Death, Marriage)?",
    a: "You can apply online through the Services page via K-Smart, or visit the Front Office counter at the Tanur Municipality office with the required statutory documents.",
  },
];

const tanurLocations = [
  {
    id: "tanur-munc-office",
    name: "Tanur Municipality Office",
    description: "Central Municipal Administrative Secretariat",
    location_name: "Municipal Building, Tanur",
    latitude: 10.9768,
    longitude: 75.8675,
    community_id: "tanur",
    category: "municipality",
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "tanur-harbour-office",
    name: "Tanur Fishing Harbour Office",
    description: "Coastal Development & Fisheries Administrative Office",
    location_name: "Harbour Road, West Tanur",
    latitude: 10.9802,
    longitude: 75.8541,
    community_id: "tanur",
    category: "harbour",
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "tanur-chc",
    name: "Tanur Taluk Hospital / CHC",
    description: "Public Healthcare Centre & 24/7 Casualty",
    location_name: "Station Road, Tanur",
    latitude: 10.9745,
    longitude: 75.8692,
    community_id: "tanur",
    category: "hospital",
    is_active: true,
    created_at: new Date().toISOString(),
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    wardNumber: "Ward 1",
    category: "General Municipal Enquiry",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      wardNumber: "Ward 1",
      category: "General Municipal Enquiry",
      message: "",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
      <Navbar />

      <main className="flex-1 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3">
          <Breadcrumbs items={[{ label: "Contact Us" }]} />
        </div>

        {/* ========================================================================= */}
        {/* 1. HERO BANNER (Matching Design Reference: Contact Us / We're Here to Help) */}
        {/* ========================================================================= */}
        <section className="relative min-h-[300px] sm:min-h-[360px] overflow-hidden flex items-end mt-4">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
            style={{
              backgroundImage: "url('/images/tanur-coastal-pride.jpg')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A2016] via-[#1B4D36]/80 to-black/40" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8 sm:pb-12 text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-bold text-[#F3CE7A] mb-3">
              <Building2 className="w-3.5 h-3.5 text-[#F3CE7A]" />
              <span>Tanur Municipality — Help & Information</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-black font-sans tracking-tight leading-tight">
              Contact Us
            </h1>

            <p className="mt-1 text-xl sm:text-2xl font-bold text-[#F3CE7A] font-sans">
              We&apos;re Here to Help
            </p>

            <p className="mt-2 text-xs sm:text-sm md:text-base text-stone-200 font-sans max-w-2xl leading-relaxed">
              Reach out to Tanur Municipality. Access our central switchboard, administrative offices, working hours, or send us a direct message.
            </p>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. CONTENT CONTAINER (Grid of Contact Details & Interactive Map)         */}
        {/* ========================================================================= */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Official Contact Card & Emergency Contacts */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Primary Municipal Office Card */}
              <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-8 shadow-card relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#194B35]/5 rounded-bl-full pointer-events-none" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#C39A5B] block">
                  Official Communication
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#194B35] mt-1 mb-6">
                  Tanur Municipal Secretariat
                </h2>

                <div className="space-y-5">
                  {/* Switchboard Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-[#E8F2EC] flex items-center justify-center text-[#194B35] shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-[#5C6A64] font-medium">Central Switchboard</div>
                      <a
                        href="tel:04942440228"
                        className="text-base sm:text-lg font-bold text-[#1A2420] hover:text-[#194B35] transition block"
                      >
                        0494 2440228
                      </a>
                      <div className="text-xs text-[#5C6A64]">Direct Municipal Telephone Exchange</div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-[#E8F2EC] flex items-center justify-center text-[#194B35] shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-[#5C6A64] font-medium">Official Email Address</div>
                      <a
                        href="mailto:tanurmunicipality@gmail.com"
                        className="text-sm sm:text-base font-bold text-[#1A2420] hover:text-[#194B35] transition block"
                      >
                        tanurmunicipality@gmail.com
                      </a>
                      <div className="text-xs text-[#5C6A64]">Statutory Public Inquiries</div>
                    </div>
                  </div>

                  {/* Office Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-[#E8F2EC] flex items-center justify-center text-[#194B35] shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-[#5C6A64] font-medium">Municipal Secretariat Address</div>
                      <div className="text-xs sm:text-sm font-semibold text-[#1A2420] leading-relaxed mt-0.5">
                        Tanur Municipality Office, Main Road, Tanur, Malappuram District, Kerala - 676302
                      </div>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-[#E8F2EC] flex items-center justify-center text-[#194B35] shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-[#5C6A64] font-medium">Office Working Hours</div>
                      <div className="text-xs sm:text-sm font-semibold text-[#1A2420]">
                        Monday to Saturday: 10:00 AM – 5:00 PM
                      </div>
                      <div className="text-[11px] text-[#7A8880]">Closed on Sundays & Second Saturdays</div>
                    </div>
                  </div>
                </div>

                {/* Central Civic Help Banner */}
                <div className="mt-8 pt-6 border-t border-[#F0EBE0]">
                  <Link
                    href="/civic-connect"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#194B35] hover:bg-[#123626] text-white font-bold text-xs sm:text-sm transition shadow-sm"
                  >
                    <AlertTriangle className="w-4 h-4 text-[#F3CE7A]" />
                    <span>Report a Civic Grievance (Civic Connect)</span>
                  </Link>
                </div>
              </div>

              {/* Tanur Public Emergency & Helplines Directory */}
              <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 shadow-card">
                <h3 className="text-sm font-bold text-[#194B35] mb-3 flex items-center gap-2">
                  <Building className="w-4 h-4 text-[#C39A5B]" />
                  <span>Tanur Essential Helplines</span>
                </h3>
                <div className="space-y-2.5 text-xs text-[#5C6A64]">
                  <div className="flex justify-between items-center py-1.5 border-b border-[#F5F1E8]">
                    <span className="font-medium text-[#1A2420]">Tanur Municipality Office</span>
                    <a href="tel:04942440228" className="font-mono text-[#194B35] font-bold hover:underline">0494 2440228</a>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-[#F5F1E8]">
                    <span className="font-medium text-[#1A2420]">Tanur Police Station</span>
                    <a href="tel:04942582225" className="font-mono text-[#194B35] font-bold hover:underline">0494 2582225</a>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-[#F5F1E8]">
                    <span className="font-medium text-[#1A2420]">Tanur Taluk Hospital / CHC</span>
                    <a href="tel:04942582240" className="font-mono text-[#194B35] font-bold hover:underline">0494 2582240</a>
                  </div>
                  <div className="flex justify-between items-center py-1.5">
                    <span className="font-medium text-[#1A2420]">Tanur Fishing Harbour Office</span>
                    <a href="tel:04942582260" className="font-mono text-[#194B35] font-bold hover:underline">0494 2582260</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Message Form & Interactive Map */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Contact Message Form */}
              <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-8 shadow-card">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#C39A5B] block">
                  Send a Message
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#194B35] mt-1 mb-2">
                  We&apos;re Here to Help
                </h2>
                <p className="text-xs text-[#5C6A64] mb-6">
                  Fill in your details below and our municipal coordination desk will respond within 24–48 hours.
                </p>

                {submitted ? (
                  <div className="p-8 rounded-2xl bg-[#E8F2EC] border border-[#C5DEC8] text-center space-y-3">
                    <div className="w-14 h-14 rounded-full bg-[#194B35] text-white flex items-center justify-center mx-auto shadow-md">
                      <CheckCircle2 className="w-8 h-8 text-[#F3CE7A]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#194B35]">
                      Message Received
                    </h3>
                    <p className="text-xs sm:text-sm text-[#3A4E45] max-w-md mx-auto">
                      Thank you for contacting Tanur Municipality. Our office will review your inquiry and get in touch with you shortly.
                    </p>
                    <button
                      onClick={handleReset}
                      className="mt-4 px-6 py-2.5 rounded-xl bg-[#194B35] text-white text-xs font-bold hover:bg-[#133A28] transition"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-bold text-[#1A2420] mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your full name"
                          className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-none focus:ring-2 focus:ring-[#194B35]"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs font-bold text-[#1A2420] mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@example.com"
                          className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-none focus:ring-2 focus:ring-[#194B35]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Phone */}
                      <div>
                        <label className="block text-xs font-bold text-[#1A2420] mb-1.5">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="Your 10-digit mobile number"
                          className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-none focus:ring-2 focus:ring-[#194B35]"
                        />
                      </div>

                      {/* Category Selection */}
                      <div>
                        <label className="block text-xs font-bold text-[#1A2420] mb-1.5">
                          Inquiry Category
                        </label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-none focus:ring-2 focus:ring-[#194B35]"
                        >
                          <option value="General Municipal Enquiry">General Municipal Enquiry</option>
                          <option value="Certificates & Revenue Services">Certificates & Revenue Services</option>
                          <option value="Building Permit & Town Planning">Building Permit & Town Planning</option>
                          <option value="Health & Sanitation Services">Health & Sanitation Services</option>
                          <option value="Public Works & Engineering">Public Works & Engineering</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    {/* Message Area */}
                    <div>
                      <label className="block text-xs font-bold text-[#1A2420] mb-1.5">
                        Your Message *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Write your inquiry or feedback clearly..."
                        className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DDD5C5] bg-[#FAF7F0] text-[#1A2420] focus:outline-none focus:ring-2 focus:ring-[#194B35] resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl bg-[#194B35] hover:bg-[#133A28] disabled:opacity-60 text-white font-bold text-xs sm:text-sm transition active:scale-95 shadow-md flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4 text-[#F3CE7A]" />
                      <span>{isSubmitting ? "Sending Message..." : "Submit Message"}</span>
                    </button>
                  </form>
                )}
              </div>

              {/* Map Card */}
              <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-7 shadow-card">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#194B35]">
                      Tanur Municipality Location Map
                    </h3>
                    <p className="text-xs text-[#5C6A64]">
                      Key administrative and public service facilities across Tanur
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F2EC] text-[#194B35] text-[11px] font-bold">
                    <Globe className="w-3.5 h-3.5" />
                    <span>OpenStreetMap • Tanur</span>
                  </div>
                </div>

                {/* Leaflet Dynamic Map */}
                <CommunityMap
                  centerLat={10.9768}
                  centerLng={75.8675}
                  zoom={14}
                  places={tanurLocations}
                  className="h-[280px] w-full rounded-2xl border border-[#EDE6D8]"
                />
              </div>

              {/* Frequently Asked Questions */}
              <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-8 shadow-card">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#C39A5B] block">
                  Help Centre
                </span>
                <h3 className="text-xl font-bold text-[#194B35] mt-1 mb-4">
                  Frequently Asked Questions
                </h3>

                <div className="space-y-3">
                  {faqs.map((faq, idx) => {
                    const isOpen = openFaq === idx;
                    return (
                      <div
                        key={idx}
                        className="border border-[#EDE6D8] rounded-2xl overflow-hidden bg-[#FAF7F0]/40 transition"
                      >
                        <button
                          type="button"
                          onClick={() => setOpenFaq(isOpen ? null : idx)}
                          className="w-full p-4 text-left font-bold text-xs sm:text-sm text-[#194B35] flex items-center justify-between gap-3"
                        >
                          <span>{faq.q}</span>
                          <ChevronDown
                            className={`w-4 h-4 text-[#C39A5B] shrink-0 transition-transform duration-200 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-4 pt-1 text-xs text-[#5C6A64] border-t border-[#EDE6D8]/50 leading-relaxed">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
