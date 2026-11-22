"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth/context";
import { civicStore } from "@/lib/data/civicConnectData";
import { 
  AlertTriangle, 
  PlusCircle, 
  Search, 
  MapPin, 
  FileText, 
  Bookmark, 
  Bell, 
  ShieldCheck,
  ChevronRight,
  ShieldAlert
} from "lucide-react";

export function CivicNav() {
  const pathname = usePathname();
  const { role } = useAuth();

  const unreadNotifs = civicStore.getNotifications().filter(n => !n.is_read).length;

  const links = [
    { href: "/civic", label: "Overview", icon: ShieldAlert },
    { href: "/civic/report", label: "Report Issue", icon: PlusCircle, isPrimary: true },
    { href: "/civic/issues", label: "Explore Issues", icon: Search },
    { href: "/civic/map", label: "Live Map", icon: MapPin },
    { href: "/civic/my-reports", label: "My Reports", icon: FileText },
    { href: "/civic/following", label: "Following", icon: Bookmark },
    { href: "/civic/notifications", label: "Notifications", icon: Bell, badge: unreadNotifs > 0 ? unreadNotifs : null },
  ];

  const isAdmin = role === "admin" || role === "super_admin" || role === "moderator";

  return (
    <div className="bg-[#FAF4E6] border-b border-[#E8DCBF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Brand Banner Bar */}
        <div className="py-2.5 flex items-center justify-between border-b border-[#E8DCBF]/60 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-[#194B35] text-amber-300 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-3.5 h-3.5" />
            </span>
            <div className="flex items-center gap-1.5 font-bold text-[#194B35]">
              <span>Civic Connect</span>
              <span className="text-neutral-400 font-normal">|</span>
              <span className="text-[#8C5B0F] font-semibold text-[11px]">OUR NATION</span>
            </div>
            <span className="hidden md:inline-block text-[11px] text-[#5C6A64] border-l border-[#DDD5C5] pl-2">
              Our People. Our Place. Our Future.
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-[#194B35] bg-[#E0F1E7] px-2.5 py-0.5 rounded-full border border-[#BDE3CE]">
              Tanur Municipality
            </span>
            {isAdmin && (
              <Link
                href="/admin/civic"
                className="text-[11px] font-bold text-[#8C5B0F] hover:text-[#194B35] flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-amber-100/70 hover:bg-amber-100 transition"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                <span>Admin Workspace</span>
              </Link>
            )}
          </div>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-2 scrollbar-none">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (link.href !== "/civic" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap active:scale-95 ${
                  link.isPrimary
                    ? "bg-[#194B35] hover:bg-[#143E2C] text-white shadow-xs ml-1"
                    : isActive
                    ? "bg-white text-[#194B35] shadow-xs border border-[#DDD5C5]"
                    : "text-[#5C6A64] hover:bg-white/60 hover:text-[#1A2420]"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${link.isPrimary ? "text-amber-300" : isActive ? "text-[#194B35]" : "text-[#7A8880]"}`} />
                <span>{link.label}</span>
                {link.badge && (
                  <span className="w-4 h-4 rounded-full bg-rose-600 text-white text-[9px] font-bold flex items-center justify-center animate-pulse">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}
