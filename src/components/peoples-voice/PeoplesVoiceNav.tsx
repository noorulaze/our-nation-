"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n/context";
import { useAuth } from "@/lib/auth/context";
import { 
  Lightbulb, 
  MessageSquare, 
  Users, 
  PlusCircle, 
  UserCheck, 
  ShieldAlert, 
  Sparkles,
  LayoutDashboard
} from "lucide-react";

export function PeoplesVoiceNav() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const { role } = useAuth();

  const isPrivileged = role === "admin" || role === "moderator";

  const navItems = [
    {
      href: "/peoples-voice",
      label: "അവലോകനം",
      label_en: "Overview",
      icon: LayoutDashboard,
      exact: true
    },
    {
      href: "/peoples-voice/ideas",
      label: "ആശയങ്ങൾ",
      label_en: "Community Ideas",
      icon: Lightbulb
    },
    {
      href: "/peoples-voice/ideas/new",
      label: "നിർദ്ദേശം സമർപ്പിക്കാം",
      label_en: "Submit Idea",
      icon: PlusCircle,
      highlight: true
    },
    {
      href: "/peoples-voice/discussions",
      label: "ചർച്ചകൾ",
      label_en: "Discussions",
      icon: MessageSquare
    },
    {
      href: "/peoples-voice/initiatives",
      label: "കൂട്ടായ്മകൾ",
      label_en: "Initiatives",
      icon: Users
    },
    {
      href: "/peoples-voice/my-activity",
      label: "എന്റെ പങ്കാളിത്തം",
      label_en: "My Activity",
      icon: UserCheck
    },
    ...(isPrivileged ? [
      {
        href: "/admin/peoples-voice",
        label: "മോഡറേഷൻ",
        label_en: "Moderation",
        icon: ShieldAlert,
        isAdmin: true
      }
    ] : [])
  ];

  return (
    <div className="sticky top-16 sm:top-20 z-30 bg-[#FAF7F0]/95 backdrop-blur-md border-b border-[#EDE6D8] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 py-2.5">
          {/* Brand Badge */}
          <div className="hidden lg:flex items-center gap-2 pr-3 border-r border-[#EDE6D8] shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#194B35] animate-pulse" />
            <span className="text-xs font-bold font-malayalam-heading text-[#194B35]">
              {language === "ml" ? "ജനകീയ ശബ്ദം • താനൂർ" : "People's Voice • Tanur"}
            </span>
          </div>

          {/* Nav Items Scrollable */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth py-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact 
                ? pathname === item.href 
                : pathname.startsWith(item.href);

              if (item.highlight) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition shrink-0 ${
                      isActive
                        ? "bg-[#194B35] text-white shadow-sm"
                        : "bg-[#194B35]/10 text-[#194B35] hover:bg-[#194B35] hover:text-white"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{language === "ml" ? item.label : item.label_en}</span>
                  </Link>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition shrink-0 ${
                    isActive
                      ? "bg-[#194B35] text-white shadow-sm"
                      : item.isAdmin
                      ? "text-[#BE185D] hover:bg-[#FCE7F3] border border-[#FBCFE8]"
                      : "text-[#5C6A64] hover:text-[#194B35] hover:bg-[#EFE9DC]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className={language === "ml" ? "font-malayalam-heading" : ""}>
                    {language === "ml" ? item.label : item.label_en}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Quick Disclaimer Pill */}
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EDE6D8]/60 text-[11px] text-[#5C6A64] border border-[#E0D7C6] shrink-0">
            <Sparkles className="w-3 h-3 text-[#C39A5B]" />
            <span>
              {language === "ml" ? "സ്വതന്ത്ര പൗര പങ്കാളിത്ത വേദി" : "Citizen Participation Platform"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
