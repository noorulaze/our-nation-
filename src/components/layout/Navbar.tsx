"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n/context";
import { useCommunity } from "@/lib/community/context";
import { useAuth } from "@/lib/auth/context";
import { 
  MapPin, 
  Globe, 
  Sparkles, 
  ShieldCheck, 
  User, 
  ChevronDown, 
  Menu, 
  X,
  Compass,
  MessageSquare,
  PlusCircle,
  ShieldAlert
} from "lucide-react";
import { UserRole } from "@/types/database";

export function Navbar() {
  const pathname = usePathname();
  const { t, language, toggleLanguage } = useLanguage();
  const { currentCommunity, availableCommunities, setCurrentCommunity } = useCommunity();
  const { user, role, switchUserRole, logout, isAuthenticated } = useAuth();
  
  const [isCommunityDropdownOpen, setIsCommunityDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: t("navHome") },
    { href: "/discover", label: t("navDiscover") },
    { href: "/community", label: t("navCommunity") },
    { href: "/create", label: t("navCreate") },
    ...(role === "admin" || role === "moderator" ? [{ href: "/admin", label: t("navAdmin") }] : []),
  ];

  return (
    <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-md border-b border-border transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-lg bg-brand-700 text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-brand-800 transition">
                <span>നാ</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-tight text-foreground leading-none">
                  {language === "ml" ? "നമ്മുടെ നാട്" : "Nammude Naadu"}
                </span>
                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mt-0.5">
                  Kerala Local Network
                </span>
              </div>
            </Link>

            {/* Locality Selector Dropdown */}
            <div className="relative ml-2 sm:ml-4">
              <button
                onClick={() => setIsCommunityDropdownOpen(!isCommunityDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-semibold border border-brand-200 transition"
                title="Select active community"
              >
                <MapPin className="w-3.5 h-3.5 text-brand-600 flex-shrink-0" />
                <span className="max-w-[110px] sm:max-w-[140px] truncate">
                  {currentCommunity 
                    ? (language === "ml" ? currentCommunity.name_ml : currentCommunity.name)
                    : t("allCommunities")}
                </span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {isCommunityDropdownOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-surface rounded-xl shadow-xl border border-border py-2 z-50 animate-in fade-in zoom-in-95">
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
                          <div className="w-2 h-2 rounded-full bg-brand-600" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                    isActive
                      ? "text-brand-700 bg-brand-50 font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons: Language switcher & User profile / role switcher */}
          <div className="flex items-center gap-2">
            
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition border border-transparent hover:border-border"
              title="Switch Language / ഭാഷ മാറ്റുക"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{t("switchLanguage")}</span>
            </button>

            {/* Role Tester & User Profile dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="flex items-center gap-2 p-1.5 pl-2.5 rounded-full border border-border hover:bg-muted transition"
              >
                <span className="text-xs font-medium text-foreground hidden sm:inline">
                  {user ? user.display_name : t("navLogin")}
                </span>
                <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-full ${
                  role === "admin" 
                    ? "bg-purple-100 text-purple-800" 
                    : role === "moderator"
                    ? "bg-blue-100 text-blue-800"
                    : role === "verified_org"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-emerald-100 text-emerald-800"
                }`}>
                  {role}
                </span>
                <div className="w-7 h-7 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xs">
                  {user?.display_name ? user.display_name.charAt(0) : "U"}
                </div>
              </button>

              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-surface rounded-xl shadow-xl border border-border py-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-4 py-2 border-b border-border">
                    <p className="text-xs font-bold text-foreground">{user?.display_name}</p>
                    <p className="text-[11px] text-muted-foreground truncate">@{user?.username}</p>
                  </div>

                  {/* Role Switcher for MVP Testing */}
                  <div className="px-4 py-2 bg-muted/40 border-b border-border">
                    <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-1">
                      Switch Role (Testing Mode):
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
                            role === r ? "bg-brand-700 text-white" : "bg-surface hover:bg-muted text-foreground border border-border"
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
              className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
              aria-label="Toggle navigation"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-surface px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-muted"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
