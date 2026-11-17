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
  ShieldCheck
} from "lucide-react";
import { UserRole } from "@/types/database";

export function Navbar({ onOpenSearchAi }: { onOpenSearchAi?: (query?: string) => void }) {
  const pathname = usePathname();
  const { t, language, toggleLanguage } = useLanguage();
  const { currentCommunity, availableCommunities, setCurrentCommunity } = useCommunity();
  const { user, role, switchUserRole, logout } = useAuth();
  
  const [isCommunityDropdownOpen, setIsCommunityDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  // Main pill links matching exact header requirements
  const mainPillLinks = [
    { href: "/", label: "Home", enLabel: "Home" },
    { href: "/about", label: "നമ്മുടെ നാട്", enLabel: "About Us" },
    { href: "/news", label: "വാർത്തകൾ", enLabel: "News" },
    { href: "/culture", label: "സംസ്കാരം", enLabel: "Culture" },
    { href: "/education", label: "വിദ്യാഭ്യാസം", enLabel: "Education" },
    { href: "/events", label: "പരിപാടികൾ", enLabel: "Events" },
    { href: "/gallery", label: "ഗാലറി", enLabel: "Gallery" },
  ];

  // Comprehensive navigation for mobile drawer & dropdown
  const allNavLinks = [
    { href: "/", label: "Home", enLabel: "Home" },
    { href: "/about", label: "നമ്മുടെ നാട്", enLabel: "About Us" },
    { href: "/news", label: "വാർത്തകൾ", enLabel: "News" },
    { href: "/culture", label: "സംസ്കാരം", enLabel: "Culture" },
    { href: "/education", label: "വിദ്യാഭ്യാസം", enLabel: "Education" },
    { href: "/events", label: "പരിപാടികൾ", enLabel: "Events" },
    { href: "/gallery", label: "ഗാലറി", enLabel: "Gallery" },
    { href: "/tanur", label: "താനൂർ പ്രൊഫൈൽ", enLabel: "Tanur Profile" },
    { href: "/contact", label: "ബന്ധപ്പെടുക", enLabel: "Contact" },
    ...(role === "admin" || role === "moderator" ? [{ href: "/admin", label: "അഡ്മിൻ", enLabel: "Admin" }] : []),
  ];

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onOpenSearchAi) {
      onOpenSearchAi(searchInput);
    } else {
      window.location.href = `/discover?search=${encodeURIComponent(searchInput)}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FAF7F0]/95 backdrop-blur-md border-b border-[#EAE4D7] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Locality Pill */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center group">
              <KeralaLogo />
            </Link>

            {/* Locality Selector Pill */}
            <div className="relative hidden xl:block ml-2">
              <button
                onClick={() => setIsCommunityDropdownOpen(!isCommunityDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFE9DC] hover:bg-[#E5DECF] text-[#1B4D36] text-xs font-semibold border border-[#DFD7C7] transition"
                title="Select locality"
              >
                <MapPin className="w-3.5 h-3.5 text-[#1B4D36] flex-shrink-0" />
                <span className="max-w-[120px] truncate">
                  {currentCommunity 
                    ? (language === "ml" ? currentCommunity.name_ml : currentCommunity.name)
                    : "കേരളം"}
                </span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>

              {isCommunityDropdownOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-surface rounded-2xl shadow-xl border border-border py-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-1.5 border-b border-border text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                    {t("selectCommunityPrompt")}
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-border/50">
                    {availableCommunities.map((comm) => (
                      <button
                        key={comm.id}
                        onClick={() => {
                          setCurrentCommunity(comm);
                          setIsCommunityDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-muted transition ${
                          currentCommunity?.id === comm.id ? "bg-brand-50 text-brand-700 font-semibold" : "text-foreground"
                        }`}
                      >
                        <div>
                          <div className="font-medium">
                            {language === "ml" ? comm.name_ml : comm.name}
                          </div>
                          <div className="text-[10px] text-muted-foreground">
                            {comm.district} • {comm.type}
                          </div>
                        </div>
                        {currentCommunity?.id === comm.id && (
                          <div className="w-2 h-2 rounded-full bg-brand-700" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Center Navigation Links - Exact Match to IMAGE 2 Pill Menu */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#EDE8DC]/50 p-1 rounded-full border border-[#DFD8C9]">
            {mainPillLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href.split("?")[0]));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
                    isActive
                      ? "bg-[#1B4D36] text-white shadow-xs"
                      : "text-[#3D4B44] hover:text-[#1B4D36] hover:bg-[#EDE8DC]"
                  }`}
                >
                  {language === "ml" ? link.label : link.enLabel}
                </Link>
              );
            })}
          </nav>

          {/* Right Section: Search & Profile Avatar (Matching IMAGE 2) */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search Button or Expandable Pill */}
            {isSearchOpen ? (
              <form onSubmit={handleSearchSubmit} className="flex items-center relative animate-in fade-in duration-200">
                <input
                  type="text"
                  autoFocus
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onBlur={() => !searchInput && setIsSearchOpen(false)}
                  placeholder="തിരയുക..."
                  className="w-40 sm:w-52 pl-3.5 pr-8 py-1.5 text-xs rounded-full bg-[#EFE9DD] border border-[#DDD5C5] text-[#1A2420] placeholder-[#7A8680] focus:outline-none focus:ring-1 focus:ring-[#1B4D36] focus:bg-white transition"
                />
                <button
                  type="submit"
                  aria-label="Submit search"
                  className="absolute right-2.5 text-[#5C6A64] hover:text-[#1B4D36]"
                >
                  <Search className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="w-8 h-8 rounded-full bg-[#EFE9DC] hover:bg-[#E5DECF] text-[#1B4D36] flex items-center justify-center transition border border-[#DFD7C7]"
                title="Search / തിരയുക"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            )}

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold text-[#1B4D36] bg-[#EFE9DC] hover:bg-[#E5DECF] border border-[#DFD7C7] transition"
              title="Switch Language / ഭാഷ മാറ്റുക"
            >
              <Globe className="w-3 h-3" />
              <span>{language === "ml" ? "English" : "മലയാളം"}</span>
            </button>

            {/* User Profile Avatar in Deep Green Circle */}
            <div className="relative">
              <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="w-8 h-8 rounded-full bg-[#1B4D36] hover:bg-[#143B29] text-white flex items-center justify-center transition shadow-xs"
                aria-label="User Account"
              >
                <User className="w-4 h-4" />
              </button>

              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-surface rounded-2xl shadow-xl border border-border py-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-4 py-2 border-b border-border">
                    <p className="text-xs font-bold text-foreground">{user?.display_name}</p>
                    <p className="text-[11px] text-muted-foreground truncate">@{user?.username}</p>
                    <span className="inline-block mt-1 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {role}
                    </span>
                  </div>

                  {/* Role Switcher for MVP Testing */}
                  <div className="px-4 py-2 bg-muted/40 border-b border-border">
                    <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-1">
                      Switch Role:
                    </p>
                    <div className="grid grid-cols-2 gap-1 text-[11px]">
                      {(["user", "moderator", "verified_org", "admin"] as UserRole[]).map((r) => (
                        <button
                          key={r}
                          onClick={() => {
                            switchUserRole(r);
                            setIsUserDropdownOpen(false);
                          }}
                          className={`px-2 py-1 rounded text-center font-medium capitalize ${
                            role === r ? "bg-[#1B4D36] text-white" : "bg-surface hover:bg-muted text-foreground border border-border"
                          }`}
                        >
                          {r.replace("_", " ")}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="py-1">
                    <Link
                      href="/profile"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="block px-4 py-2 text-xs text-foreground hover:bg-muted"
                    >
                      {t("navProfile")}
                    </Link>
                    {(role === "admin" || role === "moderator") && (
                      <Link
                        href="/admin"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="block px-4 py-2 text-xs text-foreground hover:bg-muted font-medium"
                      >
                        {t("navAdmin")}
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        setIsUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50"
                    >
                      {t("navLogout")}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-lg text-[#3D4B44] hover:bg-[#EDE8DC]"
              aria-label="Toggle navigation"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-b border-border bg-[#FAF7F0] px-4 pt-2 pb-4 space-y-1">
          {allNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-sm font-medium text-foreground hover:bg-[#EFE9DD]"
            >
              {language === "ml" ? link.label : link.enLabel}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
