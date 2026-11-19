"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n/context";
import { useCommunity } from "@/lib/community/context";
import { useAuth } from "@/lib/auth/context";
import { KeralaLogo } from "./KeralaLogo";
import { 
  Search, 
  User, 
  MapPin, 
  Globe, 
  ChevronDown, 
  Menu, 
  X,
  Sparkles,
  ShieldCheck,
  Bell,
  Calendar,
  Bookmark,
  Briefcase,
  HardHat,
  AlertTriangle,
  TrendingUp,
  Building2,
  FileText,
  Phone,
  Layers,
  Info
} from "lucide-react";
import { store } from "@/lib/data/store";

export function Navbar({ onOpenSearchAi }: { onOpenSearchAi?: (query?: string) => void }) {
  const pathname = usePathname();
  const { t, language, toggleLanguage } = useLanguage();
  const { currentCommunity, availableCommunities, setCurrentCommunity } = useCommunity();
  const { user, role, logout } = useAuth();
  
  const [isCommunityDropdownOpen, setIsCommunityDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);
  const [isCivicDropdownOpen, setIsCivicDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [fontSizeOffset, setFontSizeOffset] = useState<"normal" | "sm" | "lg">("normal");

  const notifs = user ? store.getNotifications(user.id) : [];
  const unreadCount = notifs.filter(n => !n.is_read).length;

  // Primary Navigation Links (Matching Kerala Municipal Reference Architecture)
  const mainPillLinks = [
    { href: "/", label: "ഹോം", enLabel: "Home" },
    { href: "/digital-municipality", label: "നഗരസഭ", enLabel: "Municipality" },
    { href: "/public-services", label: "സേവനങ്ങൾ", enLabel: "Services" },
    { href: "/civic-connect", label: "സിവിക് കണക്ട്", enLabel: "Civic Connect" },
    { href: "/development-tracker", label: "വികസനം", enLabel: "Development" },
    { href: "/documents", label: "രേഖകൾ", enLabel: "Documents" },
    { href: "/peoples-voice", label: "ജനകീയ ശബ്ദം", enLabel: "People's Voice" },
  ];

  // Contextual Civic Modules Dropdown
  const civicDropdownModules = [
    { href: "/digital-municipality", label: "ഡിജിറ്റൽ നഗരസഭ ജി.ഐ.എസ്", enLabel: "Digital Municipality Hub", icon: Building2 },
    { href: "/civic-connect", label: "സിവിക് കണക്ട് (പരാതികൾ & ട്രാക്കിംഗ്)", enLabel: "Civic Connect (Reports)", icon: AlertTriangle },
    { href: "/development-tracker", label: "വികസന പദ്ധതി ട്രാക്കർ", enLabel: "Development Tracker", icon: HardHat },
    { href: "/public-services", label: "പൗര സേവന സൂചിക (K-Smart)", enLabel: "Public Services Directory", icon: Briefcase },
    { href: "/documents", label: "ഔദ്യോഗിക രേഖകളും ഗസറ്റും", enLabel: "Documents & Public Notices", icon: FileText },
    { href: "/peoples-voice", label: "ജനകീയ ശബ്ദം (പങ്കാളിത്തം)", enLabel: "People's Voice", icon: TrendingUp },
    { href: "/ai", label: "നാട് AI അസിസ്റ്റന്റ്", enLabel: "Naadu AI Assistant", icon: Sparkles },
    { href: "/about", label: "ഔർ നേഷൻ ആമുഖം", enLabel: "About OUR NATION", icon: Info },
  ];

  // Grouped Navigation for Mobile Drawer
  const primaryDestinations = [
    { href: "/", label: "ഹോം", enLabel: "Home" },
    { href: "/digital-municipality", label: "ഡിജിറ്റൽ നഗരസഭ", enLabel: "Digital Municipality" },
    { href: "/public-services", label: "പൊതു സേവനങ്ങൾ", enLabel: "Public Services" },
    { href: "/civic-connect", label: "സിവിക് കണക്ട്", enLabel: "Civic Connect" },
    { href: "/development-tracker", label: "വികസന ട്രാക്കർ", enLabel: "Development Tracker" },
    { href: "/documents", label: "രേഖകളും ഉത്തരവുകളും", enLabel: "Documents & Notices" },
    { href: "/peoples-voice", label: "ജനകീയ ശബ്ദം", enLabel: "People's Voice" },
    { href: "/profile", label: "പ്രൊഫൈൽ", enLabel: "Citizen Profile" },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onOpenSearchAi) {
      onOpenSearchAi(searchInput);
    } else {
      window.location.href = `/explore?search=${encodeURIComponent(searchInput)}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FAF7F0] border-b border-[#EAE4D7] shadow-xs">
      {/* 1. TOP STATUTORY & ACCESSIBILITY UTILITY BAR */}
      <div className="bg-[#194B35] text-white text-[11px] py-1 px-4 sm:px-6 lg:px-8 border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Accessibility & Official Line */}
          <div className="flex items-center gap-4">
            <a 
              href="#main-content" 
              className="text-white/80 hover:text-white transition font-medium focus:outline-none focus:underline"
            >
              {language === "ml" ? "പ്രധാന ഉള്ളടക്കത്തിലേക്ക് പോകുക" : "Skip to main content"}
            </a>
            <span className="text-white/30">•</span>
            {/* Font Sizer Controls */}
            <div className="inline-flex items-center gap-1.5 text-white/80">
              <span className="text-[10px] text-white/60">Text:</span>
              <button 
                type="button" 
                onClick={() => setFontSizeOffset("sm")}
                className={`px-1 py-0.5 rounded text-[10px] font-bold ${fontSizeOffset === "sm" ? "bg-white/20 text-white" : "hover:text-white"}`}
                title="Decrease font size"
              >
                A-
              </button>
              <button 
                type="button" 
                onClick={() => setFontSizeOffset("normal")}
                className={`px-1 py-0.5 rounded text-[10px] font-bold ${fontSizeOffset === "normal" ? "bg-white/20 text-white" : "hover:text-white"}`}
                title="Default font size"
              >
                A
              </button>
              <button 
                type="button" 
                onClick={() => setFontSizeOffset("lg")}
                className={`px-1 py-0.5 rounded text-[10px] font-bold ${fontSizeOffset === "lg" ? "bg-white/20 text-white" : "hover:text-white"}`}
                title="Increase font size"
              >
                A+
              </button>
            </div>
            <span className="text-white/30">•</span>
            {/* Official Switchboard Direct Notice */}
            <div className="inline-flex items-center gap-1.5 text-white/80">
              <Phone className="w-3 h-3 text-[#C39A5B]" />
              <span>{language === "ml" ? "മുനിസിപ്പൽ കൺട്രോൾ റൂം:" : "Municipal Switchboard:"}</span>
              <a href="tel:04942440228" className="font-bold text-[#C39A5B] hover:underline font-mono">
                0494 2440228
              </a>
            </div>
          </div>

          {/* Right: Language Toggle & Citizen Verification Badge */}
          <div className="flex items-center gap-4">
            <div className="inline-flex items-center gap-1.5 text-white/80">
              <ShieldCheck className="w-3 h-3 text-[#C39A5B]" />
              <span>{language === "ml" ? "താനൂർ ഗ്രേഡ് II നഗരസഭ" : "Tanur Grade II ULB"}</span>
            </div>
            <span className="text-white/30">•</span>
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1 font-semibold text-white hover:text-[#C39A5B] transition"
              title="Switch language"
            >
              <Globe className="w-3 h-3" />
              <span>{language === "ml" ? "English" : "മലയാളം"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION HEADER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          
          {/* Logo & Locality Pill */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link href="/" className="flex items-center group">
              <KeralaLogo />
            </Link>

            {/* Locality Selector Pill */}
            <div className="relative hidden xl:block ml-1">
              <button
                onClick={() => setIsCommunityDropdownOpen(!isCommunityDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFE9DC] hover:bg-[#E5DECF] text-[#194B35] text-xs font-semibold border border-[#DFD7C7] transition"
                title="Select locality"
              >
                <MapPin className="w-3.5 h-3.5 text-[#194B35] shrink-0" />
                <span className="max-w-[120px] truncate">
                  {currentCommunity 
                    ? (language === "ml" ? currentCommunity.name_ml : currentCommunity.name)
                    : "താനൂർ"}
                </span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>

              {isCommunityDropdownOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-[#EDE6D8] py-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-1.5 border-b border-[#F3EFE6] text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    {t("selectCommunityPrompt")}
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-[#F3EFE6]">
                    {availableCommunities.map((comm) => (
                      <button
                        key={comm.id}
                        onClick={() => {
                          setCurrentCommunity(comm);
                          setIsCommunityDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#FAF7F0] transition ${
                          currentCommunity?.id === comm.id ? "bg-[#194B35]/10 text-[#194B35] font-bold" : "text-[#1A2420]"
                        }`}
                      >
                        <div>
                          <div className="font-medium">
                            {language === "ml" ? comm.name_ml : comm.name}
                          </div>
                          <div className="text-[10px] text-gray-500">
                            {comm.district} • {comm.type}
                          </div>
                        </div>
                        {currentCommunity?.id === comm.id && (
                          <div className="w-2 h-2 rounded-full bg-[#194B35]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Center Navigation Links - Clean Pill Menu */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#EDE8DC]/60 p-1 rounded-full border border-[#DFD8C9]">
            {mainPillLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href.split("?")[0]));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                    language === "ml" ? "font-malayalam tracking-normal" : "font-sans"
                  } ${
                    isActive
                      ? "bg-[#194B35] text-white shadow-xs"
                      : "text-[#3D4B44] hover:text-[#194B35] hover:bg-[#EDE8DC]"
                  }`}
                >
                  {language === "ml" ? link.label : link.enLabel}
                </Link>
              );
            })}

            {/* Contextual Modules Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsCivicDropdownOpen(!isCivicDropdownOpen)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 transition ${
                  isCivicDropdownOpen
                    ? "bg-[#194B35] text-white shadow-xs"
                    : "text-[#3D4B44] hover:text-[#194B35] hover:bg-[#EDE8DC]"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{language === "ml" ? "മോഡ്യൂളുകൾ" : "Modules"}</span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {isCivicDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-[#EAE4D7] py-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3.5 py-1.5 border-b border-[#F3EFE6] text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    {language === "ml" ? "ഡിജിറ്റൽ മുൻസിപ്പാലിറ്റി മോഡ്യൂളുകൾ" : "Digital Municipality Modules"}
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-[#F3EFE6]">
                    {civicDropdownModules.map((mod) => {
                      const Icon = mod.icon;
                      return (
                        <Link
                          key={mod.href}
                          href={mod.href}
                          onClick={() => setIsCivicDropdownOpen(false)}
                          className="px-3.5 py-2.5 flex items-center gap-2.5 hover:bg-[#FAF7F0] transition group"
                        >
                          <div className="w-7 h-7 rounded-lg bg-[#FAF7F0] group-hover:bg-[#194B35] group-hover:text-white text-[#194B35] flex items-center justify-center shrink-0 border border-[#EDE6D8] transition">
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-gray-800 group-hover:text-[#194B35]">
                              {language === "ml" ? mod.label : mod.enLabel}
                            </div>
                            <div className="text-[10px] text-gray-400">
                              {language === "ml" ? mod.enLabel : mod.label}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right Section: Naadu AI, Search, Notifications & Citizen Login */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            
            {/* Ask Naadu AI Button */}
            <button
              onClick={() => onOpenSearchAi ? onOpenSearchAi() : (window.location.href = "/ai")}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#194B35]/10 hover:bg-[#194B35]/20 text-[#194B35] text-xs font-bold border border-[#194B35]/20 transition"
              title="Ask Naadu AI"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C39A5B]" />
              <span className="hidden md:inline">{language === "ml" ? "നാട് AI" : "Ask AI"}</span>
            </button>

            {/* Search Button or Expandable Pill */}
            {isSearchOpen ? (
              <form onSubmit={handleSearchSubmit} className="hidden sm:flex items-center relative animate-in fade-in duration-200">
                <input
                  type="text"
                  autoFocus
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onBlur={() => !searchInput && setIsSearchOpen(false)}
                  placeholder={language === "ml" ? "തിരയുക..." : "Search..."}
                  className="w-36 md:w-48 pl-3 pr-7 py-1.5 text-xs rounded-full bg-[#EFE9DD] border border-[#DDD5C5] text-[#1A2420] placeholder-[#7A8680] focus:outline-none focus:ring-1 focus:ring-[#194B35] focus:bg-white transition"
                />
                <button
                  type="submit"
                  aria-label="Submit search"
                  className="absolute right-2 text-[#5C6A64] hover:text-[#194B35]"
                >
                  <Search className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="w-8 h-8 rounded-full bg-[#EFE9DC] hover:bg-[#E5DECF] text-[#194B35] hidden sm:flex items-center justify-center transition border border-[#DFD7C7]"
                title="Search / തിരയുക"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            )}

            {/* Notification Bell with Badge */}
            <div className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => setIsNotifDropdownOpen(!isNotifDropdownOpen)}
                className="w-8 h-8 rounded-full bg-[#EFE9DC] hover:bg-[#E5DECF] text-[#194B35] flex items-center justify-center transition border border-[#DFD7C7] relative"
                title="അറിയിപ്പുകൾ (Notifications)"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[9px] font-bold flex items-center justify-center border border-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {isNotifDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-xl border border-[#EAE4D7] py-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-4 py-2 border-b border-[#F3EFE6] flex items-center justify-between">
                    <h4 className="text-xs font-bold text-[#194B35]">
                      അറിയിപ്പുകൾ (Notifications)
                    </h4>
                    <span className="text-[10px] text-[#7A8880]">{notifs.length} ആകെ</span>
                  </div>

                  <div className="max-h-64 overflow-y-auto divide-y divide-[#F3EFE6]">
                    {notifs.length === 0 ? (
                      <div className="p-4 text-center text-xs text-[#7A8880]">
                        പുതിയ അറിയിപ്പുകൾ ഒന്നും ലഭിച്ചിട്ടില്ല.
                      </div>
                    ) : (
                      notifs.map((n) => (
                        <Link
                          key={n.id}
                          href={n.link || "/dashboard/bookings"}
                          onClick={() => {
                            store.markNotificationAsRead(n.id);
                            setIsNotifDropdownOpen(false);
                          }}
                          className={`p-3 block text-xs hover:bg-[#FAF7F0] transition space-y-1 ${
                            !n.is_read ? "bg-[#FAF7F0]/80 font-medium" : ""
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-[#1A2420] text-[11px]">
                              {language === "ml" ? n.title_ml : n.title}
                            </span>
                            {!n.is_read && (
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                            )}
                          </div>
                          <p className="text-[11px] text-[#5C6A64] line-clamp-2">
                            {language === "ml" ? n.message_ml : n.message}
                          </p>
                          <span className="text-[9px] text-[#7A8880] block text-right">
                            {new Date(n.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </Link>
                      ))
                    )}
                  </div>

                  <div className="p-2 border-t border-[#F3EFE6] text-center">
                    <Link
                      href="/notifications"
                      onClick={() => setIsNotifDropdownOpen(false)}
                      className="text-[11px] font-bold text-[#194B35] hover:underline"
                    >
                      {language === "ml" ? "എല്ലാ അറിയിപ്പുകളും കാണുക" : "View All Notifications"}
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* DEDICATED CITIZEN LOGIN / PROFILE BUTTON */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#194B35] hover:bg-[#123626] text-white transition shadow-xs"
                  aria-label="User Account"
                >
                  <div className="w-5 h-5 rounded-full bg-[#C39A5B] text-[#194B35] flex items-center justify-center text-[10px] font-black">
                    {user.display_name?.charAt(0) || "U"}
                  </div>
                  <span className="text-xs font-bold hidden md:inline max-w-[90px] truncate">
                    {user.display_name}
                  </span>
                  <ChevronDown className="w-3 h-3 opacity-70" />
                </button>

                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-[#EDE6D8] py-2 z-50 animate-in fade-in zoom-in-95">
                    <div className="px-4 py-2 border-b border-[#F3EFE6]">
                      <p className="text-xs font-bold text-[#194B35]">{user?.display_name}</p>
                      <p className="text-[11px] text-gray-500 truncate">@{user?.username}</p>
                      <span className="inline-block mt-1 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        {role}
                      </span>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/dashboard"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="block px-4 py-2 text-xs font-bold text-[#194B35] hover:bg-[#FAF7F0] flex items-center gap-2"
                      >
                        <User className="w-3.5 h-3.5 text-[#C39A5B]" />
                        <span>{language === "ml" ? "ഡാഷ്‌ബോർഡ്" : "Citizen Dashboard"}</span>
                      </Link>

                      <Link
                        href="/profile"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="block px-4 py-2 text-xs text-gray-700 hover:bg-[#FAF7F0]"
                      >
                        {t("navProfile")}
                      </Link>

                      <Link
                        href="/dashboard/bookings"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="block px-4 py-2 text-xs text-gray-700 hover:bg-[#FAF7F0] flex items-center gap-2 font-medium"
                      >
                        <Calendar className="w-3.5 h-3.5 text-[#C39A5B]" />
                        <span>എന്റെ ബുക്കിംഗുകൾ (Bookings)</span>
                      </Link>

                      <Link
                        href="/saved"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="block px-4 py-2 text-xs text-gray-700 hover:bg-[#FAF7F0] flex items-center gap-2"
                      >
                        <Bookmark className="w-3.5 h-3.5 text-emerald-600" />
                        <span>സൂക്ഷിച്ച സേവനങ്ങൾ (Saved)</span>
                      </Link>

                      {(role === "admin" || role === "moderator") && (
                        <Link
                          href="/admin"
                          onClick={() => setIsUserDropdownOpen(false)}
                          className="block px-4 py-2 text-xs text-amber-900 bg-amber-50/50 hover:bg-amber-100/50 font-medium border-t border-[#EDE6D8] mt-1"
                        >
                          {t("navAdmin")}
                        </Link>
                      )}

                      <button
                        onClick={() => {
                          logout();
                          setIsUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 border-t border-[#EDE6D8]"
                      >
                        {t("navLogout")}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/profile"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#194B35] hover:bg-[#123626] text-white text-xs font-bold shadow-xs transition shrink-0"
              >
                <User className="w-3.5 h-3.5 text-[#C39A5B]" />
                <span>{language === "ml" ? "പൗര ലോഗിൻ" : "Citizen Login"}</span>
              </Link>
            )}

            {/* Mobile-only Language Quick Pill */}
            <button
              onClick={toggleLanguage}
              className="sm:hidden flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold text-[#194B35] bg-[#EFE9DC] border border-[#DFD7C7] transition active:scale-95"
              title="Switch Language"
            >
              <Globe className="w-3 h-3" />
              <span>{language === "ml" ? "EN" : "മല"}</span>
            </button>

            {/* Mobile Menu Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#194B35] hover:bg-[#EDE8DC] active:scale-95 transition"
              aria-label="Toggle navigation"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. MOBILE DRAWER */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-b border-[#EAE4D7] bg-[#FAF7F0] px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
          
          {/* Mobile Search Bar */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder={language === "ml" ? "വിവരങ്ങൾ തിരയുക..." : "Search services, projects, documents..."}
              className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl bg-white border border-[#DDD5C5] text-[#1A2420] placeholder-[#7A8680] focus:outline-none focus:ring-2 focus:ring-[#194B35]"
            />
            <Search className="w-4 h-4 text-[#7A8680] absolute left-3 top-3" />
          </form>

          {/* Quick Municipal Switchboard Mobile Banner */}
          <div className="p-2.5 rounded-xl bg-[#194B35]/10 border border-[#194B35]/20 flex items-center justify-between text-xs text-[#194B35]">
            <div className="flex items-center gap-1.5 font-bold">
              <Phone className="w-3.5 h-3.5 text-[#C39A5B]" />
              <span>{language === "ml" ? "കൺട്രോൾ റൂം" : "Switchboard"}: 0494 2440228</span>
            </div>
            <a 
              href="tel:04942440228" 
              className="px-2.5 py-1 rounded-md bg-[#194B35] text-white text-[10px] font-bold"
            >
              Call
            </a>
          </div>

          {/* Primary 6-Pillar Destinations */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-[#7A8880] uppercase tracking-wider px-1">
              {language === "ml" ? "പ്രധാന വഴികൾ" : "Main Features"}
            </span>
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              {primaryDestinations.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href.split("?")[0]));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-semibold ${
                      language === "ml" ? "font-malayalam tracking-normal" : "font-sans"
                    } transition flex items-center justify-between ${
                      isActive 
                        ? "bg-[#194B35] text-white shadow-xs" 
                        : "bg-white text-[#194B35] font-bold hover:bg-[#EFE9DD] border border-[#DDD5C5]"
                    }`}
                  >
                    <span>{language === "ml" ? link.label : link.enLabel}</span>
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-amber-300" />}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Ask Naadu AI Quick Link in Mobile */}
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              if (onOpenSearchAi) onOpenSearchAi();
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#194B35] to-[#123626] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-[#C39A5B]" />
            <span>{language === "ml" ? "നാട് AI അസിസ്റ്റന്റിനോട് ചോദിക്കുക" : "Ask Naadu AI Assistant"}</span>
          </button>
        </div>
      )}
    </header>
  );
}
