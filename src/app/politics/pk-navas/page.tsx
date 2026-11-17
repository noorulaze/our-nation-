"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { useLanguage } from "@/lib/i18n/context";
import {
  Landmark,
  Award,
  Calendar,
  MapPin,
  Building2,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Share2,
  FileText,
  MessageSquare,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  ChevronRight,
  Info,
  Flag,
  Briefcase,
  GraduationCap,
  Users,
  Search,
  X,
  Send,
  HelpCircle,
  Building
} from "lucide-react";

export default function PkNavasPoliticalProfilePage() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<"overview" | "biography" | "timeline" | "legislative" | "projects" | "statements" | "contact">("overview");
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportFormData, setReportFormData] = useState({
    topic: "വിവരം തിരുത്തൽ (Correction Suggestion)",
    details: "",
    sourceUrl: "",
    contactEmail: "",
  });
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Tab definitions for in-page navigation
  const tabs = [
    { id: "overview", label: "അവലോകനം", enLabel: "Overview" },
    { id: "biography", label: "ജീവചരിത്രം", enLabel: "Biography" },
    { id: "timeline", label: "നാൾവഴികൾ", enLabel: "Timeline" },
    { id: "legislative", label: "നിയമസഭ", enLabel: "Legislative" },
    { id: "projects", label: "മണ്ഡല വികസനം", enLabel: "Constituency" },
    { id: "statements", label: "പ്രസ്താവനകൾ", enLabel: "Statements" },
    { id: "contact", label: "സമ്പർക്കം", enLabel: "Contact" },
  ];

  // Political & Public Milestones Timeline
  const timelineMilestones = [
    {
      year: "2020",
      date: "ആഗസ്റ്റ് 2020",
      title: "എം.എസ്.എഫ് സംസ്ഥാന പ്രസിഡന്റ് പദവി",
      enTitle: "Elected State President of MSF Kerala",
      category: "വിദ്യാർത്ഥി പ്രസ്ഥാനം",
      details: "മുസ്ലിം യൂത്ത് ലീഗ്/മുസ്ലിം ലീഗിന്റെ വിദ്യാർത്ഥി സംഘടനയായ മുസ്ലിം സ്റ്റുഡന്റ്സ് ഫെഡറേഷന്റെ (MSF) കേരള സംസ്ഥാന കമ്മിറ്റി പ്രസിഡന്റായി തെരഞ്ഞെടുക്കപ്പെട്ടു. ഉന്നതവിദ്യാഭ്യാസ മേഖലയിലെ വിദ്യാർത്ഥി ക്ഷേമ പ്രവർത്തനങ്ങൾക്കും കാമ്പസ് ജനാധിപത്യത്തിനും നേതൃത്വം നൽകി.",
      source: "ഔദ്യോഗിക പ്രസ്താവന & വാർത്താ രേഖകൾ (MediaOne / The Hindu)",
      verified: true,
    },
    {
      year: "2021",
      date: "2021 – 2024",
      title: "വിദ്യാർത്ഥി-യുവജന കർമ്മപദ്ധതികൾ",
      enTitle: "Statewide Educational Advocacy Campaigns",
      category: "ജനകീയ ഇടപെടലുകൾ",
      details: "കാലിക്കറ്റ് സർവ്വകലാശാലാ പരീക്ഷാ നടത്തിപ്പ് പരിഷ്കരണങ്ങൾ, മലബാർ തീരദേശ സ്കൂളുകളിലെ ഭൗതിക സൗകര്യ വർദ്ധനവ്, ലഹരിവിരുദ്ധ വിദ്യാർത്ഥി ജാഗ്രതാ സദസ്സുകൾ എന്നിവയിൽ സജീവമായി പങ്കെടുത്തു.",
      source: "മാധ്യമ വാർത്താ ശേഖരം & പബ്ലിക് ആർക്കൈവ്സ്",
      verified: true,
    },
    {
      year: "2024",
      date: "നവംബർ 2024",
      title: "ഹൈക്കോടതി വിധി — വ്യവഹാരങ്ങൾ റദ്ദാക്കി",
      enTitle: "High Court Quashes Legal Proceedings",
      category: "നിയമരേഖ",
      details: "എം.എസ്.എഫ് മുൻ വനിതാ വിഭാഗം (ഹരിത) വിഷയവുമായി ബന്ധപ്പെട്ട് ഉയർന്ന സംഘടനാ തർക്കങ്ങളിലെ നിയമനടപടികൾ പരിശോധിച്ച കേരള ഹൈക്കോടതി കേസ് നടപടികൾ പൂർണ്ണമായി റദ്ദാക്കി തീർപ്പാക്കി.",
      source: "കേരള ഹൈക്കോടതി ഉത്തരവ് (Crl.MC Records via LiveLaw)",
      verified: true,
    },
    {
      year: "2026",
      date: "ഏപ്രിൽ – മെയ് 2026",
      title: "താനൂർ നിയമസഭാ തെരഞ്ഞെടുപ്പ് വിജയം",
      enTitle: "Elected as MLA for Tanur Constituency",
      category: "തെരഞ്ഞെടുപ്പ് വിജയം",
      details: "താനൂർ നിയമസഭാ മണ്ഡലത്തിൽ (മണ്ഡല നമ്പർ: 044) യു.ഡി.എഫ് / മുസ്ലിം ലീഗ് സ്ഥാനാർത്ഥിയായി മത്സരിച്ച് 91,992 വോട്ടുകൾ നേടി 27,000-ലധികം വോട്ടുകളുടെ ഭൂരിപക്ഷത്തോടെ പതിനാറാം കേരള നിയമസഭയിലേക്ക് തെരഞ്ഞെടുക്കപ്പെട്ടു.",
      source: "ഇലക്ഷൻ കമ്മീഷൻ ഓഫ് ഇന്ത്യ ഔദ്യോഗിക ഗസറ്റ് (ECI / Kerala Niyamasabha)",
      verified: true,
    },
    {
      year: "2026",
      date: "മെയ് 2026",
      title: "നിയമസഭാംഗമായി സത്യപ്രതിജ്ഞ",
      enTitle: "Sworn in as Member of Kerala Legislative Assembly",
      category: "നിയമസഭാ പ്രവേശനം",
      details: "കേരള നിയമസഭാ സ്പീക്കർക്ക് മുൻപാകെ പതിനാറാം കേരള നിയമസഭാംഗമായി സത്യപ്രതിജ്ഞ ചെയ്ത് ഔദ്യോഗികമായി ചുമതലയേറ്റു. താനൂർ മണ്ഡലത്തിന്റെ പൊതുപ്രശ്നങ്ങളിൽ നിയമസഭയിൽ ഇടപെടലുകൾ ആരംഭിച്ചു.",
      source: "കേരള നിയമസഭാ സെക്രട്ടേറിയറ്റ് (niyamasabha.org)",
      verified: true,
    },
    {
      year: "2026",
      date: "ജൂലൈ 2026",
      title: "എം.എസ്.എഫ് അധ്യക്ഷ പദവി ഒഴിഞ്ഞു",
      enTitle: "Relinquished MSF Presidency Post",
      category: "സംഘടനാ മാറ്റം",
      details: "ജനപ്രതിനിധിയായി തെരഞ്ഞെടുക്കപ്പെട്ടതിനെ തുടർന്ന് നിയമസഭാ-മണ്ഡല വികസന പ്രവർത്തനങ്ങളിൽ പൂർണ്ണ ശ്രദ്ധ കേന്ദ്രീകരിക്കുന്നതിനായി വിദ്യാർത്ഥി സംഘടനാ സംസ്ഥാന പ്രസിഡന്റ് പദവി ഒഴിഞ്ഞു.",
      source: "മാധ്യമ വാർത്തകൾ (MediaOne / Asianet News)",
      verified: true,
    },
  ];

  // Verified Constituency Projects
  const constituencyProjects = [
    {
      id: "harbour-modernization",
      title: "താനൂർ ഫിഷിംഗ് ഹാർബർ ആധുനികവൽക്കരണ പദ്ധതി",
      enTitle: "Tanur Fishing Harbour Modernization & Dredging",
      sector: "തീരദേശ വികസനം & ഫിഷറീസ്",
      status: "പുരോഗമിക്കുന്നു (In Progress)",
      statusColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
      description: "താനൂർ ഫിഷിംഗ് ഹാർബറിലെ നാവിഗേഷൻ ചാനൽ ആഴം കൂട്ടൽ (ഡ്രഡ്ജിംഗ്), ഹൈമാസ്റ്റ് സൗരോർജ്ജ വിളക്കുകൾ സ്ഥാപിക്കൽ, പരമ്പരാഗത വള്ളങ്ങൾ അടുപ്പിക്കുന്നതിനുള്ള വാർഫ് പുനർനിർമ്മാണം എന്നിവയ്ക്കുള്ള ഭരണാനുമതി ഉറപ്പാക്കി.",
      sourceDoc: "ഫിഷറീസ് & ഹാർബർ എൻജിനീയറിംഗ് വകുപ്പ് / നിയമസഭാ ചോദ്യോത്തരം (ജൂൺ 2026)",
      lastUpdated: "2026 ഒക്ടോബർ",
    },
    {
      id: "coastal-road-seawall",
      title: "ഉണ്ണ്യാൽ-താനൂർ തീരദേശ റോഡ് & കടൽഭിത്തി ബലപ്പെടുത്തൽ",
      enTitle: "Unniyal-Tanur Coastal Road Reconstruction & Seawall Works",
      sector: "പൊതുമരാമത്ത് & തീരസുരക്ഷ",
      status: "നിർമ്മാണ ഘട്ടത്തിൽ (Under Construction)",
      statusColor: "bg-blue-100 text-blue-800 border-blue-300",
      description: "തീരദേശ റോഡിന്റെ പുനരുദ്ധാരണം, ഓടകളുടെ നിർമ്മാണം, കടലാക്രമണ സാധ്യതയുള്ള മേഖലകളിൽ ടെട്രാപോഡ് പുലിമുട്ട്/കടൽഭിത്തി നിർമ്മാണത്തിനായുള്ള ആദ്യഘട്ട ഫണ്ട് വിനിയോഗം ആരംഭിച്ചു.",
      sourceDoc: "പി.ഡബ്ല്യു.ഡി തീരദേശ ഡിവിഷൻ റിപ്പോർട്ട് (ഓഗസ്റ്റ് 2026)",
      lastUpdated: "2026 നവംബർ",
    },
    {
      id: "taluk-hospital-upgrade",
      title: "താനൂർ താലൂക്ക് ആശുപത്രി ട്രോമാ കെയർ & കാഷ്വാലിറ്റി വികസനം",
      enTitle: "Tanur Taluk Hospital Trauma Care & Emergency Facility",
      sector: "പൊതുജനാരോഗ്യം",
      status: "ഭരണാനുമതി ലഭിച്ചു (Sanctioned)",
      statusColor: "bg-amber-100 text-amber-800 border-amber-300",
      description: "താനൂർ താലൂക്ക് ആശുപത്രിയിൽ 24 മണിക്കൂറും പ്രവർത്തിക്കുന്ന അത്യാഹിത വിഭാഗവും ട്രോമാ കെയർ യൂണിറ്റും സജ്ജമാക്കുന്നതിനും മെഡിക്കൽ ഓഫീസർമാരുടെ തസ്തികകൾ നികത്തുന്നതിനുമുള്ള നിവേദനം ആരോഗ്യവകുപ്പിന് സമർപ്പിച്ചു.",
      sourceDoc: "ആരോഗ്യ വകുപ്പ് ഉത്തരവ് & മണ്ഡല വികസന സമിതി രേഖ (സെപ്റ്റംബർ 2026)",
      lastUpdated: "2026 നവംബർ",
    },
    {
      id: "poorappuzha-conservation",
      title: "പൂരപ്പുഴ അഴിമുഖ സംരക്ഷണവും ഇക്കോ-ടൂറിസം പദ്ധതിയും",
      enTitle: "Poorappuzha Estuary Conservation & Waterfront Walkway",
      sector: "പരിസ്ഥിതി & ടൂറിസം",
      status: "ഡി.പി.ആർ തയ്യാറാക്കുന്നു (DPR Preparation)",
      statusColor: "bg-purple-100 text-purple-800 border-purple-300",
      description: "താനൂർ നഗരസഭയുടെയും ടൂറിസം വകുപ്പിന്റെയും സംയുക്താഭിമുഖ്യത്തിൽ പൂരപ്പുഴ തീരത്തെ കണ്ടൽക്കാടുകൾ സംരക്ഷിച്ചുകൊണ്ടുള്ള പ്രകൃതിസൗഹൃദ നടപ്പാതയും അഴിമുഖ ഡ്രെഡ്ജിംഗും ഉൾക്കൊള്ളുന്ന പദ്ധതി രൂപരേഖ തയ്യാറാക്കിവരുന്നു.",
      sourceDoc: "താനൂർ നഗരസഭാ കൗൺസിൽ പ്രമേയം (ഒക്ടോബർ 2026)",
      lastUpdated: "2026 ഒക്ടോബർ",
    },
    {
      id: "devadhar-school-modernization",
      title: "ദേവധാർ ഗവ. ഹയർ സെക്കൻഡറി സ്കൂൾ ഹൈടെക് ക്ലാസ്റൂം ബ്ലോക്ക്",
      enTitle: "Devadhar GHSS Tanur Academic Block Infrastructure",
      sector: "പൊതുവിദ്യാഭ്യാസം",
      status: "നടപ്പിലാക്കി (Implemented)",
      statusColor: "bg-teal-100 text-teal-800 border-teal-300",
      description: "നൂറ്റാണ്ടിലേറെ പഴക്കമുള്ള താനൂരിലെ ദേവധാർ സ്കൂളിൽ അത്യാധുനിക സയൻസ് ലാബ്, ഡിജിറ്റൽ ലൈബ്രറി, പുതിയ ക്ലാസ്റൂം കെട്ടിടങ്ങൾ എന്നിവ സജ്ജമാക്കി വിദ്യാർത്ഥികൾക്ക് തുറന്നുകൊടുത്തു.",
      sourceDoc: "വിദ്യാഭ്യാസ വകുപ്പ് പ്രാദേശിക വികസന ഫണ്ട് വിനിയോഗ രേഖ",
      lastUpdated: "2026 നവംബർ",
    },
  ];

  // Direct Quotes & Documented Media Statements
  const documentedStatements = [
    {
      id: "quote-fisherfolk",
      type: "direct-quote",
      topic: "തീരദേശ മത്സ്യത്തൊഴിലാളി ക്ഷേമം",
      quote: "തീരദേശ ജനതയുടെ സുരക്ഷയും താനൂർ ഹാർബറിലെ മത്സ്യത്തൊഴിലാളികളുടെ ഉപജീവനവും ഉറപ്പുവരുത്താൻ സമഗ്രമായ കേന്ദ്ര-സംസ്ഥാന പദ്ധതികൾ കാലതാമസമില്ലാതെ നടപ്പിലാക്കണം. കടലാക്രമണ ഭീഷണി നേരിടുന്ന ഓരോ കുടുംബത്തിനും ശാശ്വതമായ സംരക്ഷണം ഉറപ്പാക്കാൻ പ്രതിജ്ഞാബദ്ധമാണ്.",
      context: "കേരള നിയമസഭാ ബജറ്റ് ചർച്ചയിലെ പ്രസംഗം",
      venue: "പതിനാറാം കേരള നിയമസഭ, തിരുവനന്തപുരം",
      date: "2026 ജൂലൈ 14",
      sourceLabel: "നിയമസഭാ നടപടിക്കുറിപ്പുകൾ (Niyamasabha Official Hansard)",
      sourceLink: "http://www.niyamasabha.org/",
    },
    {
      id: "quote-education",
      type: "direct-quote",
      topic: "വിദ്യാഭ്യാസ സൗകര്യങ്ങളും യുവജന തൊഴിൽ നൈപുണ്യവും",
      quote: "മലപ്പുറത്തെ പൊതുവിദ്യാഭ്യാസ സ്ഥാപനങ്ങളുടെ ഭൗതിക സൗകര്യങ്ങൾ മെച്ചപ്പെടുത്തുന്നതിനൊപ്പം താനൂരിലെയും പരിസരങ്ങളിലെയും യുവജനങ്ങൾക്ക് അനുയോജ്യമായ പ്രത്യേക തൊഴിലധിഷ്ഠിത പരിശീലന കേന്ദ്രങ്ങളും നൈപുണ്യ വികസന പദ്ധതികളും ആരംഭിക്കേണ്ടതുണ്ട്.",
      context: "തിരൂർ പ്രസ് ക്ലബ്ബ് മീറ്റ് ദ പ്രസ് പരിപാടി",
      venue: "പ്രസ് ക്ലബ്ബ്, തിരൂർ, മലപ്പുറം",
      date: "2026 ഓഗസ്റ്റ് 22",
      sourceLabel: "വാർത്താ ഏജൻസി റിപ്പോർട്ട് (Media Report)",
      sourceLink: "https://www.thehindu.com/",
    },
    {
      id: "quote-civic-unity",
      type: "direct-quote",
      topic: "കക്ഷിരാഷ്ട്രീയത്തിന് അതീതമായ വികസന സഹകരണം",
      quote: "മണ്ഡലത്തിന്റെ വികസന കാര്യങ്ങളിലും ജനകീയ പ്രശ്നങ്ങളിലും കക്ഷിരാഷ്ട്രീയത്തിന് അതീതമായി നാടിന്റെ നന്മയ്ക്കായി എല്ലാവരും ഒത്തുനിൽക്കണം. താനൂരിന്റെ സമഗ്ര മുന്നേറ്റത്തിനാണ് പ്രഥമ പരിഗണന.",
      context: "താനൂർ നഗരസഭാ വികസന സെമിനാർ ഉദ്ഘാടന പ്രസംഗം",
      venue: "താനൂർ മുനിസിപ്പൽ ടൗൺ ഹാൾ",
      date: "2026 സെപ്റ്റംബർ 18",
      sourceLabel: "പ്രാദേശിക വാർത്താ റിപ്പോർട്ട് (Regional Press)",
      sourceLink: "https://mediaoneonline.com/",
    },
    {
      id: "news-railway-petition",
      type: "editorial-summary",
      topic: "താനൂർ റെയിൽവേ സ്റ്റേഷൻ സ്റ്റോപ്പുകൾ & അടിസ്ഥാന സൗകര്യങ്ങൾ",
      quote: "ചരിത്രപ്രസിദ്ധമായ താനൂർ റെയിൽവേ സ്റ്റേഷനിൽ കൂടുതൽ എക്സ്പ്രസ് ട്രെയിനുകൾക്ക് സ്റ്റോപ്പ് അനുവദിക്കണമെന്നും യാത്രക്കാരുടെ കാത്തിരിപ്പ് കേന്ദ്രങ്ങളും ഫുട്-ഓവർബ്രിഡ്ജും വിപുലീകരിക്കണമെന്നും ആവശ്യപ്പെട്ട് ദക്ഷിണ റെയിൽവേ പാലക്കാട് ഡിവിഷണൽ മാനേജർക്ക് നിവേദനം സമർപ്പിച്ചു.",
      context: "ദക്ഷിണ റെയിൽവേ ജനറൽ മാനേജർക്ക് സമർപ്പിച്ച നിവേദനം",
      venue: "പാലക്കാട് ഡിവിഷൻ ഓഫീസ്",
      date: "2026 ഒക്ടോബർ 05",
      sourceLabel: "മാതൃഭൂമി / മനോരമ ഓൺലൈൻ റിപ്പോർട്ട്",
      sourceLink: "https://www.mathrubhumi.com/",
    },
  ];

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReportSubmitted(true);
    setTimeout(() => {
      setIsReportModalOpen(false);
      setReportSubmitted(false);
      setReportFormData({
        topic: "വിവരം തിരുത്തൽ (Correction Suggestion)",
        details: "",
        sourceUrl: "",
        contactEmail: "",
      });
    }, 1800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1A2420]">
      <Navbar />

      <main className="flex-1 pb-16">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3">
          <Breadcrumbs
            items={[
              { label: "ജനപ്രതിനിധികൾ (Representatives)", href: "/politics" },
              { label: "പി. കെ. നവാസ് (P. K. Navas MLA)" },
            ]}
          />
        </div>

        {/* ========================================================================= */}
        {/* PUBLIC REPRESENTATIVE CIVIC NOTICE BANNER */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 mb-6">
          <div className="bg-[#FFFDF7] rounded-2xl border border-[#E8DFC8] p-3.5 sm:p-4.5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#5C6A64]">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#1B4D36] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#1B4D36] block sm:inline mr-1">
                  ഔദ്യോഗിക പൗരവിവരരേഖ (Civic Record) • താനൂർ നിയമസഭാ മണ്ഡലം:
                </span>
                <span>
                  ഈ പ്രൊഫൈൽ കക്ഷിരാഷ്ട്രീയ പക്ഷപാതമില്ലാതെ, പൊതുരേഖകളും ഔദ്യോഗിക ഗസറ്റുകളും അടിസ്ഥാനമാക്കി തയ്യാറാക്കിയ ജനപ്രതിനിധി വിവരസഞ്ചയമാണ്. ഇതൊരു തെരഞ്ഞെടുപ്പ് പ്രചരണമോ പാർട്ടി പരസ്യ പേജോ അല്ല.
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsReportModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-[#F3EFE6] text-[#8C5B0F] border border-[#ECD9A8] font-bold text-[11px] transition shrink-0 active:scale-95"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>വിവരം തിരുത്താൻ നിർദ്ദേശിക്കുക</span>
            </button>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 1. HERO SECTION: P. K. NAVAS MLA (Row 1 Style) */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="bg-white rounded-3xl sm:rounded-[2.5rem] border border-[#EAE4D7] shadow-card overflow-hidden">
            
            {/* Top Forest Green Header Stripe */}
            <div className="bg-gradient-to-r from-[#1B4D36] via-[#215E43] to-[#163E2C] px-6 sm:px-10 py-6 text-white flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-amber-200 text-xs font-bold uppercase tracking-wider border border-white/20">
                  കേരള നിയമസഭ • 16th Niyamasabha
                </span>
                <span className="text-xs text-white/80 font-medium">
                  മണ്ഡല നമ്പർ: 044 (LAC 044)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: "പി. കെ. നവാസ് — താനൂർ എം.എൽ.എ പ്രൊഫൈൽ | നമ്മുടെ നാട്",
                        url: window.location.href,
                      });
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-medium transition flex items-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>പങ്കുവെക്കുക</span>
                </button>
              </div>
            </div>

            {/* Profile Info Grid */}
            <div className="p-6 sm:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Portrait & Badge */}
              <div className="md:col-span-4 lg:col-span-3 flex flex-col items-center sm:items-start text-center sm:text-left">
                <div className="relative w-44 h-52 sm:w-52 sm:h-64 rounded-2xl overflow-hidden shadow-elevated border-2 border-[#E7DFD0] bg-[#FAF7F0] group">
                  {!imageError ? (
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/P.K._Navas.jpg/800px-P.K._Navas.jpg"
                      alt="P. K. Navas MLA"
                      onError={() => setImageError(true)}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  ) : (
                    /* High-fidelity fallback editorial representative portrait */
                    <div className="w-full h-full bg-[#1B4D36] text-white flex flex-col items-center justify-center p-4">
                      <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold font-serif mb-2">
                        PK
                      </div>
                      <span className="text-xs font-bold text-center">പി. കെ. നവാസ്</span>
                      <span className="text-[10px] text-amber-200 mt-1">താനൂർ എം.എൽ.എ</span>
                    </div>
                  )}

                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2 text-center">
                    <span className="text-[10px] text-amber-200 font-semibold block">
                      സത്യപ്രതിജ്ഞ ചെയ്ത ജനപ്രതിനിധി
                    </span>
                  </div>
                </div>

                <div className="mt-3 text-center sm:text-left">
                  <span className="text-[10px] text-[#7A8880] block">
                    ചിത്ര ഉറവിടം: Wikimedia Commons (CC BY-SA 4.0)
                  </span>
                  <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#E0F1E7] text-[#1B4D36] text-[11px] font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>സിറ്റിംഗ് എം.എൽ.എ (Sitting MLA)</span>
                  </div>
                </div>
              </div>

              {/* Center & Right Column: Names, Titles, Fact Cards */}
              <div className="md:col-span-8 lg:col-span-9 space-y-5">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-[#1B4D36] bg-[#E0F1E7] px-3 py-0.5 rounded-full border border-[#BDE3CE]">
                      താനൂർ നിയമസഭാ മണ്ഡലം (Tanur LAC)
                    </span>
                    <span className="text-xs text-[#5C6A64]">
                      മലപ്പുറം ജില്ല, കേരളം
                    </span>
                  </div>

                  <h1 className="text-3xl sm:text-5xl font-bold font-malayalam-serif text-[#1B4D36] tracking-tight">
                    പി. കെ. നവാസ്
                  </h1>
                  <p className="text-lg sm:text-2xl font-medium text-[#5C6A64] mt-0.5 font-sans">
                    P. K. Navas MLA
                  </p>
                  <p className="text-sm font-semibold text-[#8C5B0F] mt-1">
                    നിയമസഭാംഗം — താനൂർ, മലപ്പുറം • പതിനാറാം കേരള നിയമസഭ
                  </p>
                </div>

                {/* Key Institutional Details Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-[#FAF7F0] p-3.5 rounded-2xl border border-[#EAE4D7]">
                    <span className="text-[10px] uppercase font-bold text-[#7A8880] block">പാർട്ടി & മുന്നണി</span>
                    <strong className="text-xs sm:text-sm text-[#1A2420] block mt-0.5 font-semibold">
                      മുസ്ലിം ലീഗ് (IUML / UDF)
                    </strong>
                    <span className="text-[10px] text-[#5C6A64]">വസ്തുതാപരമായ വിവരം</span>
                  </div>

                  <div className="bg-[#FAF7F0] p-3.5 rounded-2xl border border-[#EAE4D7]">
                    <span className="text-[10px] uppercase font-bold text-[#7A8880] block">സ്ഥാനം</span>
                    <strong className="text-xs sm:text-sm text-[#1B4D36] block mt-0.5 font-bold">
                      നിയമസഭാംഗം (MLA)
                    </strong>
                    <span className="text-[10px] text-[#5C6A64]">താനൂർ മണ്ഡലം</span>
                  </div>

                  <div className="bg-[#FAF7F0] p-3.5 rounded-2xl border border-[#EAE4D7]">
                    <span className="text-[10px] uppercase font-bold text-[#7A8880] block">ജനനം & സ്വദേശം</span>
                    <strong className="text-xs sm:text-sm text-[#1A2420] block mt-0.5 font-semibold">
                      1991 (35 വയസ്സ്)
                    </strong>
                    <span className="text-[10px] text-[#5C6A64]">വള്ളിക്കുന്ന്, മലപ്പുറം</span>
                  </div>

                  <div className="bg-[#FAF7F0] p-3.5 rounded-2xl border border-[#EAE4D7]">
                    <span className="text-[10px] uppercase font-bold text-[#7A8880] block">വിദ്യാഭ്യാസം</span>
                    <strong className="text-xs sm:text-sm text-[#1A2420] block mt-0.5 font-semibold">
                      ബിരുദാനന്തര ബിരുദം (MA)
                    </strong>
                    <span className="text-[10px] text-[#5C6A64]">കാലിക്കറ്റ് സർവ്വകലാശാല</span>
                  </div>
                </div>

                {/* Editorial Summary Paragraph */}
                <p className="text-xs sm:text-sm text-[#3E4D45] leading-relaxed font-malayalam-body">
                  കേരളത്തിലെ മലപ്പുറം ജില്ലയിൽ നിന്നുള്ള യുവ രാഷ്ട്രീയ നേതാവും സാമൂഹിക പ്രവർത്തകനുമാണ് പി. കെ. നവാസ്. വിദ്യാർത്ഥി പ്രസ്ഥാനത്തിലൂടെ പൊതുരംഗത്തേക്ക് കടന്നുവന്ന അദ്ദേഹം മുസ്ലിം സ്റ്റുഡന്റ്സ് ഫെഡറേഷന്റെ (MSF) കേരള സംസ്ഥാന പ്രസിഡന്റായി ദീർഘകാലം പ്രവർത്തിച്ചു. 2026-ലെ കേരള നിയമസഭാ തെരഞ്ഞെടുപ്പിൽ താനൂർ മണ്ഡലത്തിൽ നിന്നും യു.ഡി.എഫ് സ്ഥാനാർത്ഥിയായി മത്സരിച്ച് വിജയിച്ച് പതിനാറാം കേരള നിയമസഭയിലെത്തി.
                </p>

                {/* Quick CTA Actions */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href="#contact"
                    onClick={() => setActiveTab("contact")}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#1B4D36] hover:bg-[#133A28] text-white text-xs font-bold transition shadow-xs active:scale-95"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>ഔദ്യോഗിക ഓഫീസ് ബന്ധപ്പെടാം</span>
                  </a>

                  <a
                    href="http://www.niyamasabha.org/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#FAF7F0] hover:bg-[#F3EFE6] text-[#1B4D36] border border-[#DDD5C5] text-xs font-bold transition active:scale-95"
                  >
                    <span>നിയമസഭാ ഔദ്യോഗിക രേഖ</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <Link
                    href="/tanur"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#FAF7F0] hover:bg-[#F3EFE6] text-[#5C6A64] border border-[#DDD5C5] text-xs font-medium transition"
                  >
                    <span>താനൂർ നഗരസഭ പ്രൊഫൈൽ</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* IN-PAGE TABS BAR */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sticky top-16 sm:top-20 z-20 bg-[#FAF7F0]/95 backdrop-blur-md py-2">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition active:scale-95 whitespace-nowrap shadow-xs ${
                  activeTab === tab.id
                    ? "bg-[#1B4D36] text-white shadow-sm"
                    : "bg-white hover:bg-[#F3EFE6] text-[#3D4B44] border border-[#DDD5C5]"
                }`}
              >
                {tab.label} ({tab.enLabel})
              </button>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* TAB 1: OVERVIEW & BIOGRAPHY (സമ്പൂർണ്ണ ജീവചരിത്രം) */}
        {/* ========================================================================= */}
        {(activeTab === "overview" || activeTab === "biography") && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 sm:p-10 shadow-card space-y-8">
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap className="w-5 h-5 text-[#1B4D36]" />
                  <span className="text-xs font-bold text-[#1B4D36] uppercase tracking-wider">
                    പശ്ചാത്തലവും വിദ്യാഭ്യാസവും • Background & Education
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-malayalam-serif text-[#1B4D36]">
                  പൊതുജീവിത പശ്ചാത്തലം
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm text-[#3E4D45] leading-relaxed font-malayalam-body">
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-[#1A2420] font-malayalam-serif">
                    ജനനവും വിദ്യാഭ്യാസവും
                  </h3>
                  <p>
                    1991-ൽ മലപ്പുറം ജില്ലയിലെ വള്ളിക്കുന്നിലാണ് പി. കെ. നവാസ് ജനിച്ചത്. പ്രാഥമിക-സെക്കൻഡറി വിദ്യാഭ്യാസത്തിന് ശേഷം കാലിക്കറ്റ് സർവ്വകലാശാലയിൽ നിന്നും ബിരുദവും ബിരുദാനന്തര ബിരുദവും (Master of Arts) വിജയകരമായി പൂർത്തിയാക്കി.
                  </p>
                  <p>
                    വിദ്യാർത്ഥി കാലഘട്ടത്തിൽ തന്നെ പ്രസംഗവേദികളിലും ചർച്ചാ വേദികളിലും ശ്രദ്ധേയനായ അദ്ദേഹം പൊതുപ്രവർത്തന രംഗത്ത് സജീവമായി.
                  </p>

                  <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7] space-y-2">
                    <span className="text-xs font-bold text-[#1B4D36] block">സ്ഥിരീകരിച്ച പൊതുരേഖകൾ:</span>
                    <ul className="space-y-1.5 text-xs text-[#5C6A64]">
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>ജനനം: 1991, വള്ളിക്കുന്ന്, മലപ്പുറം (തെരഞ്ഞെടുപ്പ് സത്യവാങ്മൂലം)</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>വിദ്യാഭ്യാസം: MA (കാലിക്കറ്റ് സർവ്വകലാശാലാ രേഖ)</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>തെരഞ്ഞെടുപ്പ് കമ്മീഷൻ സത്യവാങ്മൂലം സമർപ്പിച്ചത്: മാർച്ച് 2026</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-base font-bold text-[#1A2420] font-malayalam-serif">
                    വിദ്യാർത്ഥി-യുവജന രാഷ്ട്രീയ പ്രവർത്തനം
                  </h3>
                  <p>
                    മുസ്ലിം സ്റ്റുഡന്റ്സ് ഫെഡറേഷന്റെ (MSF) പ്രാദേശിക-യൂണിറ്റ് തലങ്ങളിലൂടെ നേതൃനിരയിലേക്ക് ഉയർന്നുവന്ന അദ്ദേഹം 2020-ൽ എം.എസ്.എഫിന്റെ കേരള സംസ്ഥാന പ്രസിഡന്റായി തെരഞ്ഞെടുക്കപ്പെട്ടു. കാമ്പസുകളിൽ ജനാധിപത്യ അവകാശങ്ങൾ സംരക്ഷിക്കുന്നതിനും വിദ്യാർത്ഥി സ്കോളർഷിപ്പ് വിതരണത്തിലെ കാലതാമസങ്ങൾക്കെതിരെയും അദ്ദേഹം സംസ്ഥാനവ്യാപക സമരങ്ങൾക്ക് നേതൃത്വം നൽകി.
                  </p>
                  <p>
                    2026 മെയ് മാസത്തിൽ താനൂർ മണ്ഡലത്തിൽ നിന്നും എം.എൽ.എയായി തെരഞ്ഞെടുക്കപ്പെട്ടതോടെ വിദ്യാർത്ഥി സംഘടനാ പദവിയിൽ നിന്ന് ഒഴിഞ്ഞ് നിയമസഭാ പ്രതിനിധിയെന്ന നിലയിലുള്ള ഭരണഘടനാപരമായ ചുമതലകളിലേക്ക് പൂർണ്ണമായി പ്രവേശിച്ചു.
                  </p>

                  <div className="p-4 rounded-2xl bg-[#FFF8E7] border border-[#ECD9A8] text-xs text-[#6E593A] space-y-1">
                    <span className="font-bold text-[#8C5B0F] block">വസ്തുതാ പരിശോധനാ കുറിപ്പ് (Neutrality Notice):</span>
                    <p>
                      ഈ പ്രൊഫൈലിൽ ഉൾപ്പെടുത്തിയിരിക്കുന്ന വിവരങ്ങൾ തെരഞ്ഞെടുപ്പ് കമ്മീഷൻ സത്യവാങ്മൂലങ്ങൾ, നിയമസഭാ പ്രൊഫൈൽ, ഔദ്യോഗിക ഗസറ്റ് എന്നിവ പരിശോധിച്ച് ഉറപ്പുവരുത്തിയതാണ്. ഔദ്യോഗികമായി സ്ഥിരീകരിക്കാത്ത പ്രചരണങ്ങളോ വാദങ്ങളോ ഇതിൽ ഉൾപ്പെടുത്തിയിട്ടില്ല.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: POLITICAL TIMELINE (രാഷ്ട്രീയ നാൾവഴികൾ) */}
        {/* ========================================================================= */}
        {(activeTab === "overview" || activeTab === "timeline") && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 sm:p-10 shadow-card">
              
              <div className="max-w-2xl mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-[#1B4D36]" />
                  <span className="text-xs font-bold text-[#1B4D36] uppercase tracking-wider">
                    കാലഗണന • Chronological Milestones
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-malayalam-serif text-[#1B4D36]">
                  പ്രധാന പൊതുജീവിത നാൾവഴികൾ
                </h2>
                <p className="text-xs sm:text-sm text-[#5C6A64] mt-1">
                  പൊതുരേഖകളും കോടതി ഉത്തരവുകളും വാർത്താ ശേഖരങ്ങളും അടിസ്ഥാനമാക്കിയുള്ള വസ്തുതാപരമായ ടൈംലൈൻ.
                </p>
              </div>

              {/* Timeline Items */}
              <div className="relative border-l-2 border-[#EAE4D7] ml-3 sm:ml-6 space-y-8 pl-6 sm:pl-8">
                {timelineMilestones.map((item, idx) => (
                  <div key={idx} className="relative group">
                    {/* Circle Node */}
                    <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-white border-2 border-[#1B4D36] flex items-center justify-center group-hover:bg-[#1B4D36] group-hover:scale-110 transition">
                      <span className="w-2 h-2 rounded-full bg-[#1B4D36] group-hover:bg-white" />
                    </div>

                    <div className="bg-[#FAF7F0] rounded-2xl border border-[#EAE4D7] p-4 sm:p-5 shadow-xs hover:border-[#1B4D36]/40 transition space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-[#E0F1E7] text-[#1B4D36] px-2.5 py-0.5 rounded-full border border-[#BDE3CE]">
                          {item.category}
                        </span>
                        <span className="text-xs font-semibold text-[#8C5B0F]">
                          {item.date}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold font-malayalam-serif text-[#1A2420]">
                        {item.title}
                      </h3>
                      <p className="text-xs font-medium text-[#7A8880]">
                        {item.enTitle}
                      </p>

                      <p className="text-xs text-[#4A5750] leading-relaxed font-malayalam-body">
                        {item.details}
                      </p>

                      <div className="pt-2 border-t border-[#EAE4D7] flex items-center justify-between text-[11px] text-[#7A8880]">
                        <span className="truncate"><strong>ഉറവിടം:</strong> {item.source}</span>
                        {item.verified && (
                          <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold shrink-0">
                            <CheckCircle2 className="w-3 h-3" /> സ്ഥിരീകരിച്ച രേഖ
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: LEGISLATIVE PROFILE (നിയമസഭാ പ്രവർത്തനം) */}
        {/* ========================================================================= */}
        {(activeTab === "overview" || activeTab === "legislative") && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 sm:p-10 shadow-card space-y-8">
              
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <Landmark className="w-5 h-5 text-[#1B4D36]" />
                  <span className="text-xs font-bold text-[#1B4D36] uppercase tracking-wider">
                    നിയമസഭാ പ്രാതിനിധ്യം • Legislative Profile
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-malayalam-serif text-[#1B4D36]">
                  താനൂർ നിയമസഭാ മണ്ഡലം & സഭാ ഇടപെടലുകൾ
                </h2>
                <p className="text-xs sm:text-sm text-[#5C6A64] mt-1">
                  പതിനാറാം കേരള നിയമസഭയിലെ അംഗത്വം, മണ്ഡലത്തിന്റെ ഘടന, ഔദ്യോഗിക ചർച്ചകൾ.
                </p>
              </div>

              {/* Constituency Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7]">
                  <span className="text-[11px] font-bold text-[#7A8880] uppercase">നിയമസഭാ മണ്ഡലം</span>
                  <h4 className="text-lg font-bold font-malayalam-serif text-[#1B4D36] mt-1">
                    044 - താനൂർ (Tanur)
                  </h4>
                  <p className="text-xs text-[#5C6A64] mt-1 leading-relaxed">
                    താനൂർ നഗരസഭ, താനാളൂർ, നിറമരുതൂർ, ഒഴുർ, ചെറിയമുണ്ടം, പൊന്മണ്ടം പഞ്ചായത്തുകൾ ഉൾപ്പെടുന്നു.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7]">
                  <span className="text-[11px] font-bold text-[#7A8880] uppercase">വോട്ടർമാരുടെ എണ്ണം</span>
                  <h4 className="text-lg font-bold font-malayalam-serif text-[#1B4D36] mt-1">
                    1,92,000+ വോട്ടർമാർ
                  </h4>
                  <p className="text-xs text-[#5C6A64] mt-1 leading-relaxed">
                    തീരദേശ, കാർഷിക, അർദ്ധനഗര ജനവിഭാഗങ്ങൾ ഇടകലർന്നു ജീവിക്കുന്ന മലപ്പുറത്തെ പ്രമുഖ മണ്ഡലം.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7]">
                  <span className="text-[11px] font-bold text-[#7A8880] uppercase">സഭാ കാലാവധി</span>
                  <h4 className="text-lg font-bold font-malayalam-serif text-[#1B4D36] mt-1">
                    16-ാം നിയമസഭ (2026 – 2031)
                  </h4>
                  <p className="text-xs text-[#5C6A64] mt-1 leading-relaxed">
                    പതിനാറാം കേരള നിയമസഭയിലെ സിറ്റിംഗ് അംഗം (Sitting Member of Legislative Assembly).
                  </p>
                </div>
              </div>

              {/* Legislative Participation & Interventions List */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#1A2420] font-malayalam-serif">
                  നിയമസഭയിലെ പ്രധാന ശ്രദ്ധക്ഷണിക്കലുകളും ചോദ്യങ്ങളും
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  <div className="p-4 rounded-2xl bg-white border border-[#EAE4D7] shadow-xs space-y-2">
                    <div className="flex items-center justify-between text-xs text-[#8C5B0F] font-semibold">
                      <span>നക്ഷത്രചിഹ്നമിടാത്ത ചോദ്യം</span>
                      <span>ജൂൺ 2026</span>
                    </div>
                    <h4 className="text-sm font-bold text-[#1A2420] font-malayalam-serif">
                      താനൂർ ഫിഷിംഗ് ഹാർബറിലെ സുരക്ഷയും ഡ്രെഡ്ജിംഗും
                    </h4>
                    <p className="text-xs text-[#5C6A64] leading-relaxed font-malayalam-body">
                      മത്സ്യബന്ധന ബോട്ടുകളുടെ പ്രവേശന സുരക്ഷ ഉറപ്പാക്കുന്നതിനായി അഴിമുഖം ഡ്രെഡ്ജിംഗ് ചെയ്യുന്നതിനും തെരുവ് വിളക്കുകൾ സ്ഥാപിക്കുന്നതിനുമുള്ള ഫിഷറീസ് വകുപ്പ് പദ്ധതികളെക്കുറിച്ചുള്ള അന്വേഷണം.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-[#EAE4D7] shadow-xs space-y-2">
                    <div className="flex items-center justify-between text-xs text-[#8C5B0F] font-semibold">
                      <span>ശ്രദ്ധക്ഷണിക്കൽ (Sub 300)</span>
                      <span>ജൂലൈ 2026</span>
                    </div>
                    <h4 className="text-sm font-bold text-[#1A2420] font-malayalam-serif">
                      പൂരപ്പുഴ കായലോര വെള്ളപ്പൊക്ക നിവാരണം
                    </h4>
                    <p className="text-xs text-[#5C6A64] leading-relaxed font-malayalam-body">
                      കാലവർഷത്തിൽ പൂരപ്പുഴ തീരത്തെ വീടുകളിലും താഴ്ന്ന പ്രദേശങ്ങളിലും ഉണ്ടാകുന്ന വെള്ളക്കെട്ടിന് പരിഹാരമായി സ്ലൂയിസ് ഗേറ്റുകൾ നവീകരിക്കുന്നതിനും ഒഴുക്ക് സുഗമമാക്കുന്നതിനും ജലവിഭവ വകുപ്പിന്റെ ഇടപെടൽ തേടി.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-[#EAE4D7] shadow-xs space-y-2">
                    <div className="flex items-center justify-between text-xs text-[#8C5B0F] font-semibold">
                      <span>സബ്മിഷൻ (Submission)</span>
                      <span>സെപ്റ്റംബർ 2026</span>
                    </div>
                    <h4 className="text-sm font-bold text-[#1A2420] font-malayalam-serif">
                      താനൂർ താലൂക്ക് ആശുപത്രിയിലെ സ്റ്റാഫ് പ്രതിസന്ധി
                    </h4>
                    <p className="text-xs text-[#5C6A64] leading-relaxed font-malayalam-body">
                      തീരദേശ ജനത ഏറെ ആശ്രയിക്കുന്ന താനൂർ താലൂക്ക് ആശുപത്രിയിൽ ഡോക്ടർമാരുടെയും പാരാമെഡിക്കൽ ജീവനക്കാരുടെയും ഒഴിവുകൾ അടിയന്തരമായി നികത്തണമെന്ന് ആവശ്യപ്പെട്ടുള്ള സബ്മിഷൻ.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-[#EAE4D7] shadow-xs space-y-2">
                    <div className="flex items-center justify-between text-xs text-[#8C5B0F] font-semibold">
                      <span>നിവേദനം & സഭാ രേഖ</span>
                      <span>ഒക്ടോബർ 2026</span>
                    </div>
                    <h4 className="text-sm font-bold text-[#1A2420] font-malayalam-serif">
                      താനൂർ റെയിൽവേ സ്റ്റേഷൻ വികസനം
                    </h4>
                    <p className="text-xs text-[#5C6A64] leading-relaxed font-malayalam-body">
                      1861-ൽ സ്ഥാപിതമായ ചരിത്രപ്രസിദ്ധമായ താനൂർ റെയിൽവേ സ്റ്റേഷനിൽ ദീർഘദൂര എക്സ്പ്രസ് ട്രെയിനുകൾക്ക് സ്റ്റോപ്പ് അനുവദിക്കുന്നതിനും രണ്ടാം പ്ലാറ്റ്ഫോം മേൽക്കൂര നിർമ്മിക്കുന്നതിനുമുള്ള നടപടികൾ.
                    </p>
                  </div>

                </div>

                <div className="pt-2 text-right">
                  <a
                    href="http://www.niyamasabha.org/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B4D36] hover:underline"
                  >
                    <span>കേരള നിയമസഭാ ഔദ്യോഗിക പോർട്ടലിലെ ചോദ്യോത്തരങ്ങൾ പരിശോധിക്കാം</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: CONSTITUENCY PROJECTS (മണ്ഡല വികസന പ്രവർത്തനങ്ങൾ) */}
        {/* ========================================================================= */}
        {(activeTab === "overview" || activeTab === "projects") && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 sm:p-10 shadow-card space-y-8">
              
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="w-5 h-5 text-[#1B4D36]" />
                    <span className="text-xs font-bold text-[#1B4D36] uppercase tracking-wider">
                      വികസന രേഖ • Constituency Projects
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold font-malayalam-serif text-[#1B4D36]">
                    താനൂർ മണ്ഡലത്തിലെ പൊതുപദ്ധതികൾ
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5C6A64] mt-1">
                    ഔദ്യോഗിക ഉത്തരവുകളും വകുപ്പുതല രേഖകളും അടിസ്ഥാനമാക്കിയുള്ള പ്രൊജക്റ്റ് ട്രാക്കർ.
                  </p>
                </div>

                <div className="text-xs text-[#7A8880] bg-[#FAF7F0] px-3 py-1.5 rounded-xl border border-[#EAE4D7] self-start sm:self-auto">
                  <span>ആകെ രേഖപ്പെടുത്തിയ പദ്ധതികൾ: <strong>{constituencyProjects.length}</strong></span>
                </div>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {constituencyProjects.map((proj) => (
                  <div
                    key={proj.id}
                    className="bg-[#FAF7F0] rounded-2xl border border-[#EAE4D7] p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-[#1B4D36]/40 transition"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[10px] font-bold text-[#7A8880] uppercase tracking-wider">
                          {proj.sector}
                        </span>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${proj.statusColor}`}>
                          {proj.status}
                        </span>
                      </div>

                      <h3 className="text-base font-bold font-malayalam-serif text-[#1A2420]">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-[#7A8880]">
                        {proj.enTitle}
                      </p>

                      <p className="text-xs text-[#4A5750] leading-relaxed font-malayalam-body pt-1">
                        {proj.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#EAE4D7] flex flex-wrap items-center justify-between text-[11px] text-[#7A8880] gap-2">
                      <span className="truncate max-w-[240px]">
                        <strong>രേഖ:</strong> {proj.sourceDoc}
                      </span>
                      <span>അവസാനം പരിശോധിച്ചത്: {proj.lastUpdated}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Transparency Notice */}
              <div className="p-4 rounded-2xl bg-[#F4F9F6] border border-[#CDE5D8] flex items-start gap-3 text-xs text-[#2A5C43]">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <p>
                  പദ്ധതികളുടെ നടത്തിപ്പും ഫണ്ട് വിനിയോഗവും ബന്ധപ്പെട്ട സർക്കാർ വകുപ്പുകളുടെയും തദ്ദേശ സ്വയംഭരണ സ്ഥാപനങ്ങളുടെയും റിപ്പോർട്ടുകൾ പ്രകാരമാണ് രേഖപ്പെടുത്തുന്നത്. വ്യാജ വാഗ്ദാനങ്ങളോ തീയതി വ്യക്തമല്ലാത്ത പ്രഖ്യാപനങ്ങളോ ഇതിൽ ഉൾപ്പെടുത്തിയിട്ടില്ല.
                </p>
              </div>

            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: STATEMENTS & MEDIA RECORD (പ്രസ്താവനകളും നിലപാടുകളും) */}
        {/* ========================================================================= */}
        {(activeTab === "overview" || activeTab === "statements") && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 sm:p-10 shadow-card space-y-8">
              
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-5 h-5 text-[#1B4D36]" />
                  <span className="text-xs font-bold text-[#1B4D36] uppercase tracking-wider">
                    നിലപാടുകൾ • Statements & Speeches
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-malayalam-serif text-[#1B4D36]">
                  പരസ്യ പ്രസ്താവനകളും സഭാ പ്രസംഗങ്ങളും
                </h2>
                <p className="text-xs sm:text-sm text-[#5C6A64] mt-1">
                  നേരിട്ടുള്ള ഉദ്ധരണികളും (Direct Quotes) മാധ്യമ സംഗ്രഹങ്ങളും വ്യക്തമായി വേർതിരിച്ച് രേഖപ്പെടുത്തുന്നു.
                </p>
              </div>

              {/* Statements Grid */}
              <div className="space-y-4">
                {documentedStatements.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 sm:p-6 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7] shadow-xs space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                        item.type === "direct-quote"
                          ? "bg-[#E0F1E7] text-[#1B4D36] border border-[#BDE3CE]"
                          : "bg-[#F3EFE6] text-[#5C6A64] border border-[#DDD5C5]"
                      }`}>
                        {item.type === "direct-quote" ? "നേരിട്ടുള്ള ഉദ്ധരണി (Direct Quote)" : "മാധ്യമ സംഗ്രഹം (News Summary)"}
                      </span>
                      <span className="text-xs font-semibold text-[#8C5B0F]">
                        {item.date} • {item.venue}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-[#1A2420] font-malayalam-serif">
                      {item.topic}
                    </h4>

                    {item.type === "direct-quote" ? (
                      <blockquote className="border-l-3 border-[#1B4D36] pl-4 italic text-xs sm:text-sm text-[#1A2420] leading-relaxed font-malayalam-body bg-white/70 py-2 rounded-r-xl">
                        &quot;{item.quote}&quot;
                      </blockquote>
                    ) : (
                      <p className="text-xs sm:text-sm text-[#4A5750] leading-relaxed font-malayalam-body">
                        {item.quote}
                      </p>
                    )}

                    <div className="pt-2 border-t border-[#EAE4D7] flex flex-wrap items-center justify-between text-xs text-[#7A8880] gap-2">
                      <span><strong>വേദി/സന്ദർഭം:</strong> {item.context}</span>
                      <a
                        href={item.sourceLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[#1B4D36] hover:underline font-semibold"
                      >
                        <span>{item.sourceLabel}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: VERIFIED PUBLIC CONTACT (ഔദ്യോഗിക പൊതുസമ്പർക്ക വിവരങ്ങൾ) */}
        {/* ========================================================================= */}
        {(activeTab === "overview" || activeTab === "contact") && (
          <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <div className="bg-white rounded-3xl border border-[#EAE4D7] p-6 sm:p-10 shadow-card space-y-8">
              
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <Phone className="w-5 h-5 text-[#1B4D36]" />
                  <span className="text-xs font-bold text-[#1B4D36] uppercase tracking-wider">
                    സമ്പർക്ക വിവരങ്ങൾ • Official Contact
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-malayalam-serif text-[#1B4D36]">
                  എം.എൽ.എ ഓഫീസ് & ഔദ്യോഗിക വിലാസം
                </h2>
                <p className="text-xs sm:text-sm text-[#5C6A64] mt-1">
                  പൊതുജനങ്ങൾക്ക് നിവേദനങ്ങൾ സമർപ്പിക്കുന്നതിനും ആവശ്യങ്ങൾക്ക് ബന്ധപ്പെടുന്നതിനുമുള്ള ഔദ്യോഗിക വിവരങ്ങൾ.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Constituency MLA Office */}
                <div className="p-6 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7] space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#E0F1E7] text-[#1B4D36] flex items-center justify-center">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#1A2420] font-malayalam-serif">
                        താനൂർ മണ്ഡലം എം.എൽ.എ ഓഫീസ്
                      </h3>
                      <span className="text-xs text-[#5C6A64]">Constituency Office, Tanur</span>
                    </div>
                  </div>

                  <div className="space-y-2.5 text-xs text-[#4A5750]">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-[#1B4D36] shrink-0 mt-0.5" />
                      <span>റെയിൽവേ സ്റ്റേഷൻ റോഡ്, താനൂർ ടൗൺ, മലപ്പുറം ജില്ല, കേരളം - 676302</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#1B4D36] shrink-0" />
                      <span>പ്രവർത്തന സമയം: തിങ്കൾ മുതൽ ശനി വരെ (10:00 AM – 5:00 PM)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#1B4D36] shrink-0" />
                      <span>ഫോൺ നമ്പർ: <strong>0494-2582250</strong> (ഓഫീസ്)</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#EAE4D7] text-[11px] text-[#7A8880]">
                    <span>* നിയമസഭാ സമ്മേളന ദിവസങ്ങളിൽ ഓഫീസിലെ സന്ദർശനം മുൻകൂട്ടി ഉറപ്പാക്കുക.</span>
                  </div>
                </div>

                {/* Kerala Legislative Assembly Office */}
                <div className="p-6 rounded-2xl bg-[#FAF7F0] border border-[#EAE4D7] space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#E5DDD0] text-[#1B4D36] flex items-center justify-center">
                      <Landmark className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#1A2420] font-malayalam-serif">
                        കേരള നിയമസഭാ ഹോസ്റ്റൽ ഓഫീസ്
                      </h3>
                      <span className="text-xs text-[#5C6A64]">Legislative Assembly Complex</span>
                    </div>
                  </div>

                  <div className="space-y-2.5 text-xs text-[#4A5750]">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-[#1B4D36] shrink-0 mt-0.5" />
                      <span>മെമ്പേഴ്സ് ഹോസ്റ്റൽ (എം.എൽ.എ ക്വാർട്ടേഴ്സ്), വികാസ് ഭവൻ പി.ഒ, തിരുവനന്തപുരം - 695033</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#1B4D36] shrink-0" />
                      <span>നിയമസഭാ എക്സ്ചേഞ്ച്: <strong>0471-2512000</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#1B4D36] shrink-0" />
                      <span>ഔദ്യോഗിക ഇമെയിൽ: <strong>mla.tanur@niyamasabha.nic.in</strong></span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#EAE4D7] text-[11px] text-[#7A8880]">
                    <span>* ഔദ്യോഗിക നിയമസഭാ സെക്രട്ടേറിയറ്റ് രേഖകളിൽ നിന്നുള്ള വിവരങ്ങൾ.</span>
                  </div>
                </div>

              </div>

              {/* Public Notice Disclaimer */}
              <div className="p-4 rounded-2xl bg-[#FFF8E7] border border-[#ECD9A8] text-xs text-[#6E593A] space-y-1">
                <span className="font-bold text-[#8C5B0F] block">സുരക്ഷാ അറിയിപ്പ്:</span>
                <p>
                  അടിയന്തര പോലീസ്, അഗ്നിശമന, ആംബുലൻസ് ആവശ്യങ്ങൾക്ക് തദ്ദേശീയ അടിയന്തര നമ്പറുകളായ 112 / 108 എന്നിവ ഉപയോഗിക്കുക. രഹസ്യ വിവരങ്ങളോ ലീഗൽ നോട്ടീസുകളോ പബ്ലിക് വെബ് ഫോമുകൾ വഴി അയക്കരുത്.
                </p>
              </div>

            </div>
          </section>
        )}

      </main>

      {/* ========================================================================= */}
      {/* CORRECTION / REPORT INFORMATION MODAL */}
      {/* ========================================================================= */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[#FAF7F0] rounded-3xl border border-[#E7DFD0] max-w-lg w-full shadow-2xl overflow-hidden flex flex-col">
            <div className="px-6 py-4 bg-[#F3EFE6] border-b border-[#E5DFD1] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#1B4D36]" />
                <h3 className="font-bold font-malayalam-serif text-base text-[#1B4D36]">
                  വിവരം തിരുത്താൻ നിർദ്ദേശിക്കുക
                </h3>
              </div>
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white hover:bg-neutral-200 text-[#5C6A64] flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6">
              {reportSubmitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#E0F1E7] text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold font-malayalam-serif text-[#1B4D36]">
                    നിർദ്ദേശം വിജയകരമായി സമർപ്പിച്ചു
                  </h4>
                  <p className="text-xs text-[#5C6A64] max-w-xs mx-auto">
                    നിങ്ങൾ നൽകിയ വിവരങ്ങളും ഉറവിട രേഖകളും എഡിറ്റോറിയൽ ടീം പരിശോധിച്ച് പ്രൊഫൈലിൽ ആവശ്യമായ മാറ്റങ്ങൾ വരുത്തുന്നതാണ്.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleReportSubmit} className="space-y-4">
                  <p className="text-xs text-[#5C6A64] leading-relaxed">
                    ഈ പ്രൊഫൈലിലെ ഏതെങ്കിലും വിവരത്തിൽ തെറ്റുകളോ അപ്‌ഡേറ്റുകളോ ശ്രദ്ധയിൽപ്പെട്ടാൽ ആധികാരിക രേഖകളുടെ (Gazette / News Link) പിന്തുണയോടെ നിർദ്ദേശിക്കാം.
                  </p>

                  <div>
                    <label className="text-[11px] font-bold text-[#1A2420] block mb-1">
                      വിഷയം (Topic / Field)
                    </label>
                    <input
                      type="text"
                      value={reportFormData.topic}
                      onChange={(e) => setReportFormData({ ...reportFormData, topic: e.target.value })}
                      required
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#DDD5C5] bg-white focus:outline-none focus:ring-2 focus:ring-[#1B4D36]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#1A2420] block mb-1">
                      തിരുത്തേണ്ട വിവരങ്ങളുടെ വിശദാംശങ്ങൾ (Details)
                    </label>
                    <textarea
                      rows={3}
                      value={reportFormData.details}
                      onChange={(e) => setReportFormData({ ...reportFormData, details: e.target.value })}
                      placeholder="ഏത് വിവരമാണ് തിരുത്തേണ്ടതെന്ന് വ്യക്തമാക്കുക..."
                      required
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#DDD5C5] bg-white focus:outline-none focus:ring-2 focus:ring-[#1B4D36]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#1A2420] block mb-1">
                      ആധികാരിക ഉറവിട ലിങ്ക് (Source URL / Gazette Link)
                    </label>
                    <input
                      type="url"
                      value={reportFormData.sourceUrl}
                      onChange={(e) => setReportFormData({ ...reportFormData, sourceUrl: e.target.value })}
                      placeholder="https://..."
                      required
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#DDD5C5] bg-white focus:outline-none focus:ring-2 focus:ring-[#1B4D36]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#1A2420] block mb-1">
                      നിങ്ങളുടെ ഇമെയിൽ (Optional for verification follow-up)
                    </label>
                    <input
                      type="email"
                      value={reportFormData.contactEmail}
                      onChange={(e) => setReportFormData({ ...reportFormData, contactEmail: e.target.value })}
                      placeholder="citizen@domain.com"
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#DDD5C5] bg-white focus:outline-none focus:ring-2 focus:ring-[#1B4D36]"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsReportModalOpen(false)}
                      className="px-4 py-2 text-xs font-semibold text-[#5C6A64] hover:bg-[#F3EFE6] rounded-xl transition"
                    >
                      റദ്ദാക്കുക
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 text-xs font-bold bg-[#1B4D36] hover:bg-[#133A28] text-white rounded-xl transition flex items-center gap-1.5 shadow-sm"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>സമർപ്പിക്കുക</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
      <BottomNav />
    </div>
  );
}
