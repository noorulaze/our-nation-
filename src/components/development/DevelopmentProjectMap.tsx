"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { DevelopmentProject, ProjectCategory, ProjectStatus } from "@/types/digitalMunicipality";
import { 
  Compass, 
  MapPin, 
  HardHat, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  ChevronRight,
  X
} from "lucide-react";

interface DevelopmentProjectMapProps {
  projects: DevelopmentProject[];
  selectedProjectId?: string | null;
  onSelectProject?: (project: DevelopmentProject | null) => void;
  language?: "ml" | "en";
  className?: string;
  heightClass?: string;
}

export function DevelopmentProjectMap({
  projects,
  selectedProjectId = null,
  onSelectProject,
  language = "ml",
  className = "",
  heightClass = "h-[450px] sm:h-[500px]",
}: DevelopmentProjectMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersLayerGroupRef = useRef<any>(null);

  const [isMounted, setIsMounted] = useState(false);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<ProjectStatus | "all">("all");
  const [activeProject, setActiveProject] = useState<DevelopmentProject | null>(null);

  // Tanur Municipality Center [10.9768, 75.8672]
  const TANUR_CENTER: [number, number] = [10.9768, 75.8672];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const filteredProjects = projects.filter((p) => {
    if (selectedStatusFilter !== "all" && p.status !== selectedStatusFilter) {
      return false;
    }
    return true;
  });

  // Sync external selection
  useEffect(() => {
    if (selectedProjectId) {
      const p = projects.find((x) => x.id === selectedProjectId);
      if (p) {
        setActiveProject(p);
        if (mapInstanceRef.current && p.latitude && p.longitude) {
          mapInstanceRef.current.flyTo([p.latitude, p.longitude], 15, { animate: true, duration: 1 });
        }
      }
    }
  }, [selectedProjectId, projects]);

  useEffect(() => {
    if (!isMounted || !mapContainerRef.current) return;

    let L: any;

    const initMap = async () => {
      L = (await import("leaflet")).default;

      // Fix icon URL paths
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      if (!mapInstanceRef.current && mapContainerRef.current) {
        const map = L.map(mapContainerRef.current, {
          center: TANUR_CENTER,
          zoom: 13,
          minZoom: 11,
          maxZoom: 18,
          zoomControl: false,
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Transparent Tanur',
          maxZoom: 19,
        }).addTo(map);

        L.control.zoom({ position: "topright" }).addTo(map);

        markersLayerGroupRef.current = L.layerGroup().addTo(map);
        mapInstanceRef.current = map;
      }

      renderMarkers(L);
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted || !mapInstanceRef.current) return;
    const update = async () => {
      const L = (await import("leaflet")).default;
      renderMarkers(L);
    };
    update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredProjects, language]);

  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case "Completed": return { bg: "#047857", text: "#FFFFFF", pin: "#047857" };
      case "In Progress": return { bg: "#194B35", text: "#FFFFFF", pin: "#C39A5B" };
      case "Approved": return { bg: "#0284C7", text: "#FFFFFF", pin: "#0284C7" };
      case "Planned": return { bg: "#4F46E5", text: "#FFFFFF", pin: "#4F46E5" };
      case "Announced": return { bg: "#6366F1", text: "#FFFFFF", pin: "#6366F1" };
      case "Proposed": return { bg: "#D97706", text: "#FFFFFF", pin: "#D97706" };
      case "Delayed": return { bg: "#DC2626", text: "#FFFFFF", pin: "#DC2626" };
      case "On Hold": return { bg: "#6B7280", text: "#FFFFFF", pin: "#6B7280" };
      case "Cancelled": return { bg: "#BE123C", text: "#FFFFFF", pin: "#BE123C" };
      default: return { bg: "#194B35", text: "#FFFFFF", pin: "#194B35" };
    }
  };

  const renderMarkers = (L: any) => {
    if (!mapInstanceRef.current || !markersLayerGroupRef.current) return;
    markersLayerGroupRef.current.clearLayers();

    filteredProjects.forEach((proj) => {
      if (!proj.latitude || !proj.longitude) return;

      const colors = getStatusColor(proj.status);

      const customIcon = L.divIcon({
        className: "custom-dev-marker",
        html: `
          <div style="
            width: 34px;
            height: 34px;
            background: ${colors.pin};
            border: 2px solid #FFFFFF;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          ">
            <span style="
              transform: rotate(45deg);
              font-size: 14px;
              color: #FFFFFF;
              font-weight: bold;
              user-select: none;
            ">🏗️</span>
          </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 34],
        popupAnchor: [0, -32],
      });

      const marker = L.marker([proj.latitude, proj.longitude], { icon: customIcon });

      const budgetDisplay = proj.approved_budget || proj.budget_sanctioned;
      const popupHtml = `
        <div style="font-family: inherit; font-size: 12px; max-width: 260px; padding: 2px;">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 6px; margin-bottom: 4px;">
            <span style="background: ${colors.bg}; color: ${colors.text}; font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 9999px;">
              ${proj.status}
            </span>
            ${proj.progress_percentage !== undefined ? `<span style="font-weight: 700; color: #194B35;">${proj.progress_percentage}% Done</span>` : ''}
          </div>
          <strong style="font-size: 13px; color: #194B35; display: block; margin-bottom: 2px;">
            ${proj.title}
          </strong>
          <div style="color: #5C6A64; font-size: 11px; margin-bottom: 4px;">
            📍 ${proj.locality ? proj.locality : 'Tanur'} ${proj.ward_number ? `(Ward ${proj.ward_number})` : ''}
          </div>
          <div style="color: #194B35; font-size: 11px; font-weight: 600; margin-bottom: 6px;">
            💰 Budget: ${budgetDisplay}
          </div>
          <a href="/development/projects/${proj.id}" style="
            display: block;
            text-align: center;
            background: #194B35;
            color: #FFFFFF;
            font-weight: 700;
            font-size: 11px;
            padding: 6px 8px;
            border-radius: 8px;
            text-decoration: none;
            margin-top: 6px;
          ">
            View Details & Timeline →
          </a>
        </div>
      `;

      marker.bindPopup(popupHtml, { maxWidth: 280 });

      marker.on("click", () => {
        setActiveProject(proj);
        if (onSelectProject) {
          onSelectProject(proj);
        }
      });

      markersLayerGroupRef.current.addLayer(marker);
    });
  };

  const handleRecenter = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(TANUR_CENTER, 13, { animate: true, duration: 1 });
    }
  };

  const statuses: ProjectStatus[] = [
    "Proposed",
    "Approved",
    "Planned",
    "In Progress",
    "Completed",
    "Delayed",
    "On Hold",
    "Cancelled",
  ];

  return (
    <div className={`relative bg-white rounded-3xl border border-[#EDE6D8] shadow-sm overflow-hidden ${className}`}>
      {/* Top Filter Bar */}
      <div className="p-3 sm:p-4 bg-[#FAF7F0] border-b border-[#EDE6D8] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <HardHat className="w-4 h-4 text-[#C39A5B]" />
          <span className="font-bold text-xs sm:text-sm text-[#194B35]">
            Development Projects GIS Map
          </span>
          <span className="text-xs text-[#5C6A64]">
            ({filteredProjects.filter(p => p.latitude && p.longitude).length} mapped)
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setSelectedStatusFilter("all")}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition whitespace-nowrap ${
              selectedStatusFilter === "all"
                ? "bg-[#194B35] text-white"
                : "bg-white text-[#5C6A64] border border-[#EDE6D8] hover:bg-neutral-100"
            }`}
          >
            All ({projects.length})
          </button>
          {statuses.map((st) => {
            const count = projects.filter((p) => p.status === st).length;
            if (count === 0) return null;
            return (
              <button
                key={st}
                onClick={() => setSelectedStatusFilter(st)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
                  selectedStatusFilter === st
                    ? "bg-[#194B35] text-white"
                    : "bg-white text-[#5C6A64] border border-[#EDE6D8] hover:bg-neutral-100"
                }`}
              >
                <span>{st}</span>
                <span className="ml-1 text-[10px] opacity-75">({count})</span>
              </button>
            );
          })}
          <button
            onClick={handleRecenter}
            className="p-1.5 bg-white text-[#194B35] border border-[#EDE6D8] rounded-lg hover:bg-neutral-100 transition"
            title="Recenter Map"
          >
            <Compass className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Map Canvas */}
      <div className="relative">
        <div ref={mapContainerRef} className={`w-full ${heightClass} z-10`} style={{ minHeight: "400px" }} />

        {/* Selected Project Drawer on Map */}
        {activeProject && (
          <div className="absolute bottom-4 right-4 max-w-sm w-[calc(100%-2rem)] z-20 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#C39A5B] shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-start justify-between gap-2">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#194B35] text-white">
                {activeProject.status}
              </span>
              <button
                onClick={() => setActiveProject(null)}
                className="text-neutral-400 hover:text-neutral-700 p-1 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h4 className="font-bold text-sm text-[#194B35] mt-1.5">
              {activeProject.title}
            </h4>

            <div className="mt-2 space-y-1 text-xs text-[#5C6A64]">
              <div>📍 {activeProject.locality || 'Tanur'} {activeProject.ward_number ? `(Ward ${activeProject.ward_number})` : ''}</div>
              <div>💰 Budget: <strong className="text-[#194B35]">{activeProject.approved_budget || activeProject.budget_sanctioned}</strong></div>
              {activeProject.progress_percentage !== undefined && (
                <div className="mt-1">
                  <div className="flex justify-between text-[11px] mb-0.5">
                    <span>Progress</span>
                    <span>{activeProject.progress_percentage}%</span>
                  </div>
                  <div className="bg-[#EDE6D8] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#194B35] h-full" style={{ width: `${activeProject.progress_percentage}%` }} />
                  </div>
                </div>
              )}
            </div>

            <div className="mt-3 pt-2.5 border-t border-[#EDE6D8] flex items-center justify-between">
              <Link
                href={`/development/projects/${activeProject.id}`}
                className="text-xs font-bold text-[#194B35] hover:text-[#C39A5B] flex items-center gap-1"
              >
                <span>View Details & Timeline</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
              {activeProject.latitude && activeProject.longitude && (
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${activeProject.latitude},${activeProject.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#5C6A64] hover:text-[#194B35]"
                >
                  Directions ↗
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
