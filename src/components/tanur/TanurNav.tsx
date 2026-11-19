"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Compass, 
  Landmark, 
  MapPin, 
  Palette, 
  Users, 
  GraduationCap, 
  Briefcase, 
  Waves, 
  Image as ImageIcon, 
  Newspaper, 
  Building2, 
  PenTool,
  Sparkles,
  HardHat,
  HeartHandshake,
  AlertCircle
} from "lucide-react";

const tanurNavItems = [
  { name: "ഡിജിറ്റൽ താനൂർ (GIS)", name_en: "Digital Tanur", href: "/digital-tanur", icon: Compass },
  { name: "താനൂർ പ്രൊഫൈൽ", name_en: "Overview", href: "/tanur", icon: Landmark },
  { name: "വികസന ട്രാക്കർ", name_en: "Dev Tracker", href: "/tanur/development", icon: HardHat },
  { name: "ജനകീയ ശബ്ദം", name_en: "People's Voice", href: "/peoples-voice", icon: HeartHandshake },
  { name: "സിവിക് കണക്ട്", name_en: "Civic Connect", href: "/civic", icon: AlertCircle },
  { name: "സ്ഥലങ്ങൾ & മാപ്പ്", name_en: "Places & Map", href: "/tanur/places", icon: MapPin },
  { name: "സേവനങ്ങൾ", name_en: "Directory", href: "/tanur/directory", icon: Building2 },
  { name: "ചരിത്രം", name_en: "History", href: "/tanur/history", icon: Landmark },
  { name: "സംസ്കാരം", name_en: "Culture", href: "/tanur/culture", icon: Palette },
  { name: "ജനങ്ങൾ", name_en: "People", href: "/tanur/people", icon: Users },
  { name: "വിദ്യാഭ്യാസം", name_en: "Education", href: "/tanur/education", icon: GraduationCap },
  { name: "സമ്പദ്‌വ്യവസ്ഥ", name_en: "Economy", href: "/tanur/economy", icon: Briefcase },
  { name: "പ്രകൃതി", name_en: "Nature", href: "/tanur/nature", icon: Waves },
  { name: "ഗാലറി", name_en: "Gallery", href: "/tanur/gallery", icon: ImageIcon },
  { name: "വാർത്തകൾ", name_en: "News", href: "/tanur/news", icon: Newspaper },
  { name: "ജനപ്രതിനിധി (MLA)", name_en: "MLA Profile", href: "/politics/pk-navas", icon: Landmark },
  { name: "പങ്കുവെക്കാം", name_en: "Contribute", href: "/tanur/contribute", icon: PenTool },
];

export function TanurNav() {
  const pathname = usePathname();

  return (
    <div className="sticky top-16 sm:top-20 z-30 bg-[#FAF7F0]/95 backdrop-blur-md border-b border-[#EDE6D8] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 py-2.5">
          {/* Badge */}
          <div className="hidden md:flex items-center gap-2 pr-3 border-r border-[#EDE6D8] shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1B4D36] animate-pulse" />
            <span className="text-xs font-bold font-malayalam-heading text-[#1B4D36]">
              താനൂർ ഡിജിറ്റൽ പ്രൊഫൈൽ
            </span>
          </div>

          {/* Nav Items Scrollable */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1 w-full">
            {tanurNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap shrink-0 ${
                    isActive
                      ? "bg-[#1B4D36] text-white shadow-sm"
                      : "text-[#5C6A64] hover:text-[#1A2420] hover:bg-white border border-transparent hover:border-[#EDE6D8]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="font-malayalam-heading">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
