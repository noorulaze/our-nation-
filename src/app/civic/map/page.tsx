"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { CivicNav } from "@/components/civic/CivicNav";
import { useLanguage } from "@/lib/i18n/context";
import { 
  civicStore, 
  CIVIC_CATEGORIES, 
  CivicIssue 
} from "@/lib/data/civicConnectData";
import { 
  MapPin, 
  Filter, 
  List, 
  Map as MapIcon, 
  Search, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  Send, 
  ShieldCheck, 
  PlusCircle, 
  AlertTriangle,
  ExternalLink,
  Layers
} from "lucide-react";

export default function CivicMapPage() {
  const { language } = useLanguage();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  const [isMounted, setIsMounted] = useState(false);
  const [issues, setIssues] = useState<CivicIssue[]>(() => civicStore.getIssues());
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedLocality, setSelectedLocality] = useState<string>("all");
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {
      if (selectedCategory !== "all" && issue.category_id !== selectedCategory) return false;
      if (selectedStatus !== "all" && issue.status !== selectedStatus) return false;
      if (selectedLocality !== "all") {
        if (selectedLocality === "municipality" && !issue.locality.includes("Municipality") && issue.jurisdiction_type !== "municipality") return false;
        if (selectedLocality === "block" && !issue.locality.includes("Block") && issue.jurisdiction_type !== "block_panchayat") return false;
        if (selectedLocality === "other" && (issue.locality.includes("Municipality") || issue.locality.includes("Block"))) return false;
      }
      return true;
    });
  }, [issues, selectedCategory, selectedStatus, selectedLocality]);

  // Leaflet map initialization
  useEffect(() => {
    if (!isMounted || !mapContainerRef.current) return;

    let L: any;

    const initMap = async () => {
      L = (await import("leaflet")).default;

      // Fix icon issues
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      if (!mapInstanceRef.current) {
        // Tanur Municipality Center [10.9768, 75.8672]
        const map = L.map(mapContainerRef.current).setView([10.9768, 75.8672], 13);
        mapInstanceRef.current = map;

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(map);
      }

      const map = mapInstanceRef.current;

      // Clear existing markers
      markersRef.current.forEach(m => m.remove());
      markersRef.current = [];

      // Add filtered markers
      filteredIssues.forEach((issue) => {
        if (issue.latitude && issue.longitude) {
          const category = CIVIC_CATEGORIES.find(c => c.id === issue.category_id);
          const color = category?.color || "#194B35";

          // Custom HTML Pin Marker
          const customIcon = L.divIcon({
            className: "custom-civic-pin",
            html: `
              <div style="
                background-color: ${color};
                width: 32px;
                height: 32px;
                border-radius: 50% 50% 50% 0;
                transform: rotate(-45deg);
                display: flex;
                align-items: center;
                justify-content: center;
                border: 2px solid white;
                box-shadow: 0 4px 10px rgba(0,0,0,0.3);
                cursor: pointer;
              ">
                <span style="
                  transform: rotate(45deg);
                  color: white;
                  font-size: 14px;
                  font-weight: bold;
                ">📍</span>
              </div>
            `,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32],
          });

          const marker = L.marker([issue.latitude, issue.longitude], { icon: customIcon }).addTo(map);

          const popupContent = `
            <div style="font-family: inherit; font-size: 12px; line-height: 1.4; min-width: 200px; padding: 2px;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
                <span style="font-family: monospace; font-size: 9px; font-weight: bold; background: #e0f1e7; color: #194b35; padding: 1px 6px; border-radius: 4px;">${issue.tracking_id}</span>
                <span style="font-size: 9px; font-weight: bold; text-transform: uppercase; color: ${color};">${issue.status}</span>
              </div>
              <strong style="display: block; font-size: 13px; color: #194b35; margin-bottom: 4px;">${issue.title}</strong>
              <p style="color: #64748b; font-size: 11px; margin-bottom: 6px;">📍 ${issue.address_landmark}, ${issue.locality}</p>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #f1f5f9; padding-top: 6px; margin-top: 6px;">
                <span style="color: #047857; font-size: 10px; font-weight: bold;">👍 ${issue.support_count} Supports</span>
                <a href="/civic/issues/${issue.id}" style="color: #194b35; font-size: 11px; font-weight: bold; text-decoration: underline;">വിശദാംശങ്ങൾ →</a>
              </div>
            </div>
          `;

          marker.bindPopup(popupContent);
          marker.on("click", () => {
            setSelectedIssueId(issue.id);
          });

          markersRef.current.push(marker);
        }
      });
    };

    initMap();
  }, [isMounted, filteredIssues]);

  const handleSelectIssueFromList = (issue: CivicIssue) => {
    setSelectedIssueId(issue.id);
    if (mapInstanceRef.current && issue.latitude && issue.longitude) {
      mapInstanceRef.current.setView([issue.latitude, issue.longitude], 16, { animate: true });
      const marker = markersRef.current.find(
        (m: any) => m.getLatLng().lat === issue.latitude && m.getLatLng().lng === issue.longitude
      );
      if (marker) marker.openPopup();
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#1A2420] flex flex-col">
      <Navbar />
      <CivicNav />

      {/* Map Control Bar */}
      <div className="bg-white border-b border-[#E8DCBF] px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="w-8 h-8 rounded-xl bg-[#194B35] text-amber-300 flex items-center justify-center shrink-0">
              <MapIcon className="w-4 h-4" />
            </span>
            <div>
              <h1 className="text-sm sm:text-base font-bold text-[#194B35]">
                {language === "ml" ? "താനൂർ സിവിക് മാപ്പ് (Live Civic Map)" : "Live Civic Map"}
              </h1>
              <p className="text-[11px] text-[#5C6A64]">
                താനൂർ നഗരസഭ & മലപ്പുറം ലൈവ് ലൊക്കേഷൻ മാപ്പ് • {filteredIssues.length} പ്രശ്നങ്ങൾ മാർക്ക് ചെയ്തിരിക്കുന്നു
              </p>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2 self-stretch sm:self-auto justify-end text-xs">
            {/* Locality Dropdown */}
            <select
              value={selectedLocality}
              onChange={(e) => setSelectedLocality(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-[#FAF7F0] border border-[#DDD5C5] text-xs font-semibold text-[#1A2420] focus:outline-hidden"
            >
              <option value="all">എല്ലാ പ്രദേശങ്ങളും</option>
              <option value="municipality">താനൂർ നഗരസഭ</option>
              <option value="block">താനൂർ ബ്ലോക്ക് പഞ്ചായത്ത്</option>
            </select>

            {/* Status Dropdown */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-[#FAF7F0] border border-[#DDD5C5] text-xs font-semibold text-[#1A2420] focus:outline-hidden"
            >
              <option value="all">എല്ലാ സ്റ്റാറ്റസും</option>
              <option value="in_progress">നടപടിയിൽ</option>
              <option value="verified">സ്ഥിരീകരിച്ചവ</option>
              <option value="resolved">പരിഹരിച്ചവ</option>
            </select>

            {/* Toggle Panel Button */}
            <button
              onClick={() => setIsPanelOpen(!isPanelOpen)}
              className="px-3 py-1.5 rounded-lg bg-[#FAF7F0] border border-[#DDD5C5] text-xs font-bold text-[#194B35] hover:bg-neutral-100 transition flex items-center gap-1.5"
            >
              <List className="w-3.5 h-3.5" />
              <span>{isPanelOpen ? "പാനൽ മറയ്ക്കുക" : "ലിസ്റ്റ് കാണുക"}</span>
            </button>

            <Link
              href="/civic/report"
              className="px-3.5 py-1.5 rounded-lg bg-[#194B35] text-white text-xs font-bold hover:bg-[#143E2C] transition inline-flex items-center gap-1"
            >
              <PlusCircle className="w-3.5 h-3.5 text-amber-300" />
              <span>പരാതി നൽകുക</span>
            </Link>
          </div>
        </div>

        {/* Category Horizontal Pills */}
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 overflow-x-auto pt-2.5 scrollbar-none text-xs">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold whitespace-nowrap transition ${
              selectedCategory === "all" ? "bg-[#194B35] text-white" : "bg-[#FAF7F0] text-neutral-600 hover:bg-neutral-100"
            }`}
          >
            എല്ലാം ({issues.length})
          </button>
          {CIVIC_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold whitespace-nowrap transition flex items-center gap-1 ${
                selectedCategory === cat.id ? "bg-[#194B35] text-white" : "bg-white text-neutral-600 border border-[#DDD5C5] hover:bg-[#FAF4E6]"
              }`}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
              <span>{language === "ml" ? cat.name_ml : cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Map View Area */}
      <div className="flex-1 relative flex overflow-hidden min-h-[550px]">
        {/* Leaflet Map Canvas */}
        <div ref={mapContainerRef} className="w-full h-full min-h-[550px] z-10" />

        {/* Floating Side Drawer for Issues */}
        {isPanelOpen && (
          <div className="absolute top-4 left-4 bottom-4 z-20 w-80 sm:w-96 bg-white/95 backdrop-blur-md rounded-2xl border border-[#E8DCBF] shadow-xl flex flex-col overflow-hidden">
            <div className="p-3.5 bg-[#FAF4E6] border-b border-[#E8DCBF] flex items-center justify-between">
              <span className="font-bold text-xs text-[#194B35] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#8C5B0F]" />
                <span>പ്രശ്നങ്ങളുടെ പട്ടിക ({filteredIssues.length})</span>
              </span>
              <button
                onClick={() => setIsPanelOpen(false)}
                className="text-xs text-neutral-400 hover:text-neutral-700"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-2.5 divide-y divide-neutral-100">
              {filteredIssues.length === 0 ? (
                <div className="p-6 text-center text-xs text-neutral-500">
                  തിരഞ്ഞെടുത്ത ഫിൽട്ടറുകളിൽ പ്രശ്നങ്ങളൊന്നും കണ്ടെത്തിയില്ല.
                </div>
              ) : (
                filteredIssues.map((issue) => {
                  const isSelected = selectedIssueId === issue.id;
                  const cat = CIVIC_CATEGORIES.find(c => c.id === issue.category_id);
                  return (
                    <div
                      key={issue.id}
                      onClick={() => handleSelectIssueFromList(issue)}
                      className={`pt-2.5 first:pt-0 cursor-pointer p-2 rounded-xl transition ${
                        isSelected ? "bg-[#E0F1E7]/70 border border-[#BDE3CE]" : "hover:bg-[#FAF7F0]"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1 text-[10px]">
                        <span className="font-mono font-bold text-neutral-500">{issue.tracking_id}</span>
                        <span
                          className="font-bold px-1.5 py-0.2 rounded"
                          style={{ backgroundColor: `${cat?.color || '#194B35'}20`, color: cat?.color || '#194B35' }}
                        >
                          {issue.subcategory}
                        </span>
                      </div>
                      <h4 className="font-bold text-xs text-[#1A2420] line-clamp-1 mb-1">
                        {language === "ml" ? issue.title_ml : issue.title}
                      </h4>
                      <p className="text-[11px] text-neutral-500 line-clamp-1 mb-2">
                        📍 {issue.address_landmark}, {issue.locality}
                      </p>
                      <div className="flex items-center justify-between text-[10px] text-neutral-500">
                        <span>👍 {issue.support_count} പിന്തുണ</span>
                        <Link
                          href={`/civic/issues/${issue.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="text-[#194B35] font-bold hover:underline flex items-center gap-0.5"
                        >
                          <span>വിശദാംശങ്ങൾ</span>
                          <ChevronRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* Map Legend Overlay */}
        <div className="hidden sm:block absolute bottom-4 right-4 z-20 bg-white/90 backdrop-blur-md px-3 py-2 rounded-xl border border-[#E8DCBF] shadow-md text-[10px] text-neutral-600 space-y-1">
          <div className="font-bold text-neutral-800 mb-1">മാപ്പ് അടയാളങ്ങൾ (Legend)</div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#B87A1E]" /> റോഡുകൾ & ഗതാഗതം</div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#166534]" /> മാലിന്യ സംസ്കരണം</div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#0284C7]" /> കുടിവെള്ളം & ഡ്രെയിനേജ്</div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#EAB308]" /> സ്ട്രീറ്റ്‌ലൈറ്റ് & വൈദ്യുതി</div>
        </div>
      </div>

      <Footer />
      <BottomNav />
    </div>
  );
}
