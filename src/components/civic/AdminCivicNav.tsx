"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  ShieldCheck, 
  LayoutDashboard, 
  FileSpreadsheet, 
  FolderTree, 
  Building2, 
  BarChart3, 
  ArrowLeft,
  Eye
} from "lucide-react";

export function AdminCivicNav() {
  const pathname = usePathname();

  const links = [
    { href: "/admin/civic", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/civic/issues", label: "Manage Issues", icon: FileSpreadsheet },
    { href: "/admin/civic/categories", label: "Categories", icon: FolderTree },
    { href: "/admin/civic/authorities", label: "Authorities", icon: Building2 },
    { href: "/admin/civic/analytics", label: "Analytics", icon: BarChart3 },
  ];

  return (
    <div className="bg-[#143E2C] text-white border-b border-[#0F3022]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Admin Banner */}
        <div className="py-2.5 flex items-center justify-between border-b border-white/10 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-md bg-amber-400 text-[#143E2C] flex items-center justify-center font-bold text-[10px]">
              ADM
            </span>
            <span className="font-bold tracking-wide text-amber-300">
              Civic Connect Moderation Workspace
            </span>
            <span className="hidden md:inline-block text-[11px] text-white/60 border-l border-white/20 pl-2">
              Tanur Municipality & Administrative Desk
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/civic-connect"
              className="text-[11px] text-white/80 hover:text-white flex items-center gap-1 transition"
            >
              <Eye className="w-3.5 h-3.5 text-amber-300" />
              <span>View Public Portal</span>
            </Link>
            <Link
              href="/admin"
              className="text-[11px] text-white/80 hover:text-white flex items-center gap-1 border-l border-white/20 pl-3 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Main Admin Panel</span>
            </Link>
          </div>
        </div>

        {/* Admin Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-none text-xs">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (link.href !== "/admin/civic" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                  isActive
                    ? "bg-white text-[#143E2C] shadow-xs"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#143E2C]" : "text-amber-300"}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}
