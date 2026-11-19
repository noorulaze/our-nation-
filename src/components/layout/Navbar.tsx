"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth/context";
import { KeralaLogo } from "./KeralaLogo";
import { 
  Search, 
  User, 
  ChevronDown, 
  Menu, 
  X,
  Sparkles,
  Bell,
  Calendar,
  Bookmark,
  Briefcase,
  HardHat,
  AlertTriangle,
  TrendingUp,
  Building2,
  Landmark,
  FileText,
  Phone,
  Layers,
  Info,
  Users
} from "lucide-react";
import { store } from "@/lib/data/store";

export function Navbar({ onOpenSearchAi }: { onOpenSearchAi?: (query?: string) => void }) {
  const pathname = usePathname();
  const { user, role, logout } = useAuth();
  
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);
  const [isCivicDropdownOpen, setIsCivicDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const notifs = user ? store.getNotifications(user.id) : [];
  const unreadCount = notifs.filter(n => !n.is_read).length;

  // Primary Navigation Links matching Official OUR NATION Design Reference
  const mainPillLinks = [
    { href: "/", label: "Home" },
    { href: "/public-services", label: "Services" },
    { href: "/tanur", label: "About Tanur" },
    { href: "/civic-connect", label: "Civic Connect" },
    { href: "/news", label: "News & Updates" },
    { href: "/contact", label: "Contact" },
  ];

  // Contextual Civic Modules Dropdown
  const civicDropdownModules = [
    { href: "/local-governments", label: "Local Governments", sub: "Municipality, Block & 7 Panchayats", icon: Landmark },
    { href: "/digital-municipality", label: "Tanur Municipality", sub: "45 Wards, Councillors & GIS Map", icon: Building2 },
    { href: "/development-tracker", label: "Track Projects", sub: "Budgets & work progress", icon: HardHat },
    { href: "/documents", label: "Notices & Documents", sub: "Council orders & tenders", icon: FileText },
    { href: "/peoples-voice", label: "People's Voice", sub: "Community proposals & discussions", icon: TrendingUp },
    { href: "/leadership", label: "Leadership & Guidance", sub: "Civic mentors & verified profiles", icon: Users },
    { href: "/ai", label: "Ask Naadu AI", sub: "24/7 Citizen Assistant", icon: Sparkles },
    { href: "/about", label: "About OUR NATION", sub: "Platform architecture & sources", icon: Info },
  ];

  // Grouped Navigation for Mobile Drawer
  const primaryDestinations = [
    { href: "/", label: "Home" },
    { href: "/public-services", label: "Services" },
    { href: "/tanur", label: "About Tanur" },
    { href: "/civic-connect", label: "Civic Connect" },
    { href: "/news", label: "News & Updates" },
    { href: "/contact", label: "Contact" },
    { href: "/local-governments", label: "Local Governments" },
    { href: "/digital-municipality", label: "Tanur Municipality" },
    { href: "/development-tracker", label: "Track Projects" },
    { href: "/documents", label: "Notices & Documents" },
    { href: "/peoples-voice", label: "People's Voice" },
    { href: "/leadership", label: "Leadership & Guidance" },
    { href: "/profile", label: "Citizen Profile" },
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
      {/* Accessible skip link for keyboard navigation & screen readers */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#194B35] focus:text-white focus:rounded-xl focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#C39A5B] font-bold text-xs"
      >
        Skip to main content
      </a>

      {/* MAIN NAVIGATION HEADER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          
          {/* Logo */}
          <div className="flex items-center shrink-0">
            <Link href="/" className="flex items-center group py-1">
              <KeralaLogo />
            </Link>
          </div>

          {/* Center Navigation Links - Clean Pill Menu */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#EDE8DC]/60 p-1 rounded-full border border-[#DFD8C9]">
            {mainPillLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href.split("?")[0]));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition font-sans ${
                    isActive
                      ? "bg-[#194B35] text-white shadow-xs"
                      : "text-[#3D4B44] hover:text-[#194B35] hover:bg-[#EDE8DC]"
                  }`}
                >
                  {link.label}
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
                <span>Modules</span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {isCivicDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-[#EAE4D7] py-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3.5 py-1.5 border-b border-[#F3EFE6] text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Municipal Modules
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
                              {mod.label}
                            </div>
                            <div className="text-[10px] text-gray-400">
                              {mod.sub}
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
              <span className="hidden md:inline">Ask AI</span>
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
                  placeholder="Search services, projects, notices..."
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
                title="Search"
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
                title="Notifications"
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
                      Notifications
                    </h4>
                    <span className="text-[10px] text-[#7A8880]">{notifs.length} Total</span>
                  </div>

                  <div className="max-h-64 overflow-y-auto divide-y divide-[#F3EFE6]">
                    {notifs.length === 0 ? (
                      <div className="p-4 text-center text-xs text-[#7A8880]">
                        No new notifications.
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
                              {n.title}
                            </span>
                            {!n.is_read && (
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                            )}
                          </div>
                          <p className="text-[11px] text-[#5C6A64] line-clamp-2">
                            {n.message}
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
                      View All Notifications
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
                        <span>Citizen Dashboard</span>
                      </Link>

                      <Link
                        href="/profile"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="block px-4 py-2 text-xs text-gray-700 hover:bg-[#FAF7F0]"
                      >
                        Profile Settings
                      </Link>

                      <Link
                        href="/dashboard/bookings"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="block px-4 py-2 text-xs text-gray-700 hover:bg-[#FAF7F0] flex items-center gap-2 font-medium"
                      >
                        <Calendar className="w-3.5 h-3.5 text-[#C39A5B]" />
                        <span>My Bookings</span>
                      </Link>

                      <Link
                        href="/saved"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="block px-4 py-2 text-xs text-gray-700 hover:bg-[#FAF7F0] flex items-center gap-2"
                      >
                        <Bookmark className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Saved Services</span>
                      </Link>

                      {(role === "admin" || role === "moderator") && (
                        <Link
                          href="/admin"
                          onClick={() => setIsUserDropdownOpen(false)}
                          className="block px-4 py-2 text-xs text-amber-900 bg-amber-50/50 hover:bg-amber-100/50 font-medium border-t border-[#EDE6D8] mt-1"
                        >
                          Admin Console
                        </Link>
                      )}

                      <button
                        onClick={() => {
                          logout();
                          setIsUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 border-t border-[#EDE6D8]"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#194B35] hover:bg-[#123626] text-white text-xs font-bold shadow-xs transition shrink-0"
              >
                <User className="w-3.5 h-3.5 text-[#C39A5B]" />
                <span>Citizen Login</span>
              </Link>
            )}

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
              placeholder="Search services, projects, notices..."
              className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl bg-white border border-[#DDD5C5] text-[#1A2420] placeholder-[#7A8680] focus:outline-none focus:ring-2 focus:ring-[#194B35]"
            />
            <Search className="w-4 h-4 text-[#7A8680] absolute left-3 top-3" />
          </form>

          {/* Quick Municipal Switchboard Mobile Banner */}
          <div className="p-2.5 rounded-xl bg-[#194B35]/10 border border-[#194B35]/20 flex items-center justify-between text-xs text-[#194B35]">
            <div className="flex items-center gap-1.5 font-bold">
              <Phone className="w-3.5 h-3.5 text-[#C39A5B]" />
              <span>Switchboard: 0494 2440228</span>
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
              Main Features
            </span>
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              {primaryDestinations.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href.split("?")[0]));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-semibold font-sans transition flex items-center justify-between ${
                      isActive 
                        ? "bg-[#194B35] text-white shadow-xs" 
                        : "bg-white text-[#194B35] font-bold hover:bg-[#EFE9DD] border border-[#DDD5C5]"
                    }`}
                  >
                    <span>{link.label}</span>
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
            <span>Ask Naadu AI Assistant</span>
          </button>
        </div>
      )}
    </header>
  );
}
