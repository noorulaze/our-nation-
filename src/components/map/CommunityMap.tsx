"use client";

import React, { useEffect, useState, useRef } from "react";
import { Event, Business, Place, IssueReport } from "@/types/database";

interface CommunityMapProps {
  centerLat?: number;
  centerLng?: number;
  zoom?: number;
  events?: Event[];
  businesses?: Business[];
  places?: Place[];
  issues?: IssueReport[];
  className?: string;
  onSelectMarker?: (type: string, id: string) => void;
}

export function CommunityMap({
  centerLat = 10.0159,
  centerLng = 76.3419,
  zoom = 13,
  events = [],
  businesses = [],
  places = [],
  issues = [],
  className = "h-[400px] w-full rounded-xl border border-border shadow-sm",
  onSelectMarker,
}: CommunityMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !mapContainerRef.current) return;

    let L: any;
    let map: any;

    const initMap = async () => {
      L = (await import("leaflet")).default;

      // Fix default marker icon assets for Leaflet in bundlers
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      // Avoid re-initializing if map already exists
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }

      map = L.map(mapContainerRef.current).setView([centerLat, centerLng], zoom);
      mapInstanceRef.current = map;

      // OpenStreetMap Tile Layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      // Add Events Markers
      events.forEach((ev) => {
        if (ev.latitude && ev.longitude) {
          const marker = L.marker([ev.latitude, ev.longitude]).addTo(map);
          marker.bindPopup(`
            <div style="font-family: inherit; font-size: 12px; line-height: 1.4;">
              <span style="display:inline-block; font-size: 10px; background: #e0f2fe; color: #0369a1; padding: 2px 6px; border-radius: 4px; font-weight: bold; margin-bottom: 4px;">EVENT</span>
              <strong style="display:block; font-size: 13px; color: #1e293b;">${ev.title}</strong>
              <div style="color: #64748b; margin-top: 2px;">📍 ${ev.location_name}</div>
              <div style="color: #047857; margin-top: 2px;">📅 ${new Date(ev.start_date).toLocaleDateString()}</div>
            </div>
          `);
        }
      });

      // Add Businesses Markers
      businesses.forEach((biz) => {
        if (biz.latitude && biz.longitude) {
          const marker = L.marker([biz.latitude, biz.longitude]).addTo(map);
          marker.bindPopup(`
            <div style="font-family: inherit; font-size: 12px; line-height: 1.4;">
              <span style="display:inline-block; font-size: 10px; background: #dcfce7; color: #15803d; padding: 2px 6px; border-radius: 4px; font-weight: bold; margin-bottom: 4px;">${biz.is_verified ? "VERIFIED SERVICE" : "LOCAL BUSINESS"}</span>
              <strong style="display:block; font-size: 13px; color: #1e293b;">${biz.name}</strong>
              <div style="color: #64748b; margin-top: 2px;">📍 ${biz.address}</div>
              <div style="color: #0f766e; margin-top: 2px;">📞 ${biz.phone}</div>
            </div>
          `);
        }
      });

      // Add Places Markers
      places.forEach((plc) => {
        if (plc.latitude && plc.longitude) {
          const marker = L.marker([plc.latitude, plc.longitude]).addTo(map);
          marker.bindPopup(`
            <div style="font-family: inherit; font-size: 12px; line-height: 1.4;">
              <span style="display:inline-block; font-size: 10px; background: #fef3c7; color: #b45309; padding: 2px 6px; border-radius: 4px; font-weight: bold; margin-bottom: 4px;">PLACE</span>
              <strong style="display:block; font-size: 13px; color: #1e293b;">${plc.name}</strong>
              <div style="color: #64748b; margin-top: 2px;">📍 ${plc.location_name}</div>
            </div>
          `);
        }
      });

      // Add Issues Markers
      issues.forEach((iss) => {
        if (iss.latitude && iss.longitude) {
          const marker = L.marker([iss.latitude, iss.longitude]).addTo(map);
          marker.bindPopup(`
            <div style="font-family: inherit; font-size: 12px; line-height: 1.4;">
              <span style="display:inline-block; font-size: 10px; background: #fee2e2; color: #b91c1c; padding: 2px 6px; border-radius: 4px; font-weight: bold; margin-bottom: 4px;">CIVIC REPORT (${iss.status.toUpperCase()})</span>
              <strong style="display:block; font-size: 13px; color: #1e293b;">${iss.title}</strong>
              <div style="color: #64748b; margin-top: 2px;">📍 ${iss.location_name || "Community Area"}</div>
            </div>
          `);
        }
      });
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [centerLat, centerLng, zoom, isMounted, events, businesses, places, issues]);

  if (!isMounted) {
    return (
      <div className={`${className} bg-muted/40 animate-pulse flex items-center justify-center text-xs text-muted-foreground`}>
        Loading Community Map...
      </div>
    );
  }

  return (
    <div className="relative">
      <div ref={mapContainerRef} className={className} />
      <div className="absolute top-2 right-2 z-20 bg-surface/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] font-medium border border-border shadow-sm text-foreground">
        OpenStreetMap • Kerala
      </div>
    </div>
  );
}
