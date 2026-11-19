"use client";

import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { 
  DigitalTanurLocation, 
  LocationCategoryKey, 
  LocalityItem,
  DevelopmentProject 
} from "@/types/digitalMunicipality";
import { TANUR_LOCATION_CATEGORIES } from "@/lib/data/digitalMunicipalityData";
import { CivicIssue } from "@/lib/data/civicConnectData";
import { GoogleMapsCoverageModal } from "./GoogleMapsCoverageModal";
import { 
  MapPin, 
  Search, 
  Compass, 
  Layers, 
  Filter, 
  Navigation, 
  ExternalLink, 
  Clock, 
  Phone, 
  ShieldCheck, 
  CheckCircle2, 
  X,
  Maximize2,
  Minimize2,
  HardHat,
  AlertTriangle,
  Building2,
  Sparkles,
  Info,
  RotateCw,
  RotateCcw,
  Plus,
  Minus,
  Key,
  Globe2,
  Eye
} from "lucide-react";

interface DigitalTanurMapProps {
  locations: DigitalTanurLocation[];
  localities?: LocalityItem[];
  projects?: DevelopmentProject[];
  civicIssues?: CivicIssue[];
  selectedLocationId?: string | null;
  onSelectLocation?: (location: DigitalTanurLocation | null) => void;
  language?: "ml" | "en";
  className?: string;
  focusCoordinates?: [number, number] | null;
  heightClass?: string;
}

// Tanur Municipality Center Coordinates: 10.9768° N, 75.8672° E
const TANUR_CENTER: [number, number] = [10.9768, 75.8672];

// Category pin configuration
const CATEGORY_STYLE: Record<LocationCategoryKey, { color: string; border: string; symbol: string; label: string; label_ml: string }> = {
  government: { color: "#194B35", border: "#C39A5B", symbol: "🏛️", label: "Government", label_ml: "സർക്കാർ" },
  education: { color: "#1E40AF", border: "#93C5FD", symbol: "🎓", label: "Education", label_ml: "വിദ്യാഭ്യാസം" },
  health: { color: "#B91C1C", border: "#FCA5A5", symbol: "🏥", label: "Healthcare", label_ml: "ആരോഗ്യം" },
  facilities: { color: "#0F766E", border: "#5EEAD4", symbol: "⚡", label: "Public Utilities", label_ml: "പൊതു സൗകര്യങ്ങൾ" },
  religious_cultural: { color: "#B45309", border: "#FDE68A", symbol: "🕌", label: "Heritage & Culture", label_ml: "പൈതൃകം & സംസ്കാരം" },
  tourism: { color: "#0369A1", border: "#7DD3FC", symbol: "🏖️", label: "Tourism & Beach", label_ml: "ടൂറിസം & ബീച്ച്" },
  transport: { color: "#6D28D9", border: "#C4B5FD", symbol: "🚆", label: "Transport & Transit", label_ml: "ഗതാഗതം" },
  business: { color: "#C2410C", border: "#FED7AA", symbol: "🏪", label: "Commerce", label_ml: "വ്യാപാരം" },
};

export type MapViewMode = "map" | "satellite" | "3d";

export function DigitalTanurMap({
  locations,
  localities = [],
  projects = [],
  civicIssues = [],
  selectedLocationId = null,
  onSelectLocation,
  language = "ml",
  className = "",
  focusCoordinates = null,
  heightClass = "h-[560px] sm:h-[640px]",
}: DigitalTanurMapProps) {
  // DOM & Map refs
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const leafletMapRef = useRef<any>(null);
  const leafletMarkersRef = useRef<any>(null);
  const leafletProjectsRef = useRef<any>(null);
  const leafletCivicRef = useRef<any>(null);
  const googleMarkersRef = useRef<google.maps.Marker[]>([]);

  // State
  const [isMounted, setIsMounted] = useState(false);
  const [activeEngine, setActiveEngine] = useState<"google" | "fallback">("fallback");
  const [viewMode, setViewMode] = useState<MapViewMode>("map");
  const [selectedCategory, setSelectedCategory] = useState<LocationCategoryKey | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showProjectsLayer, setShowProjectsLayer] = useState(true);
  const [showCivicLayer, setShowCivicLayer] = useState(true);
  const [activeLocation, setActiveLocation] = useState<DigitalTanurLocation | null>(null);
  const [isCoverageModalOpen, setIsCoverageModalOpen] = useState(false);

  // 3D Camera Controls State
  const [currentTilt, setCurrentTilt] = useState(0);
  const [currentHeading, setCurrentHeading] = useState(0);

  // Check API key availability
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim() || "";
  const hasValidApiKey = apiKey.length > 5;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Filtered locations
  const filteredLocations = useMemo(() => {
    return locations.filter((loc) => {
      // Safe Data Presentation Policy: Hide unverified commercial listings until trade-license verified
      if (loc.category === "business" || loc.id.startsWith("loc-biz-")) {
        return false;
      }
      if (selectedCategory !== "all" && loc.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = loc.name.toLowerCase().includes(q) || loc.name_ml.toLowerCase().includes(q);
        const matchesLocality = loc.locality.toLowerCase().includes(q) || loc.locality_ml.toLowerCase().includes(q);
        const matchesCategory = loc.category_name.toLowerCase().includes(q) || loc.category_name_ml.toLowerCase().includes(q);
        const matchesDesc = loc.description.toLowerCase().includes(q) || loc.description_ml.toLowerCase().includes(q);
        return matchesName || matchesLocality || matchesCategory || matchesDesc;
      }
      return true;
    });
  }, [locations, selectedCategory, searchQuery]);

  // Sync external selectedLocationId
  useEffect(() => {
    if (selectedLocationId) {
      const match = locations.find((l) => l.id === selectedLocationId);
      if (match) {
        setActiveLocation(match);
        flyToLocation(match.latitude, match.longitude);
      }
    }
  }, [selectedLocationId, locations]);

  // Sync external focusCoordinates
  useEffect(() => {
    if (focusCoordinates) {
      flyToLocation(focusCoordinates[0], focusCoordinates[1]);
    }
  }, [focusCoordinates]);

  // Helper: Pan and zoom map to coordinates
  const flyToLocation = (lat: number, lng: number, zoom: number = 16) => {
    if (activeEngine === "google" && googleMapRef.current) {
      googleMapRef.current.panTo({ lat, lng });
      googleMapRef.current.setZoom(zoom);
    } else if (activeEngine === "fallback" && leafletMapRef.current) {
      leafletMapRef.current.flyTo([lat, lng], zoom, {
        animate: true,
        duration: 1.2,
      });
    }
  };

  // ===========================================================================
  // 1. GOOGLE MAPS ENGINE INITIALIZATION
  // ===========================================================================
  const initGoogleMap = useCallback(async () => {
    if (!mapContainerRef.current || !hasValidApiKey) return false;

    try {
      const { setOptions, importLibrary } = await import("@googlemaps/js-api-loader");
      setOptions({
        key: apiKey,
        v: "weekly",
      });

      await importLibrary("maps");
      await importLibrary("marker");

      if (!mapContainerRef.current) return false;

      // Clean existing container
      mapContainerRef.current.innerHTML = "";

      const initialMapTypeId = 
        viewMode === "satellite" 
          ? google.maps.MapTypeId.HYBRID 
          : viewMode === "3d" 
            ? google.maps.MapTypeId.TERRAIN 
            : google.maps.MapTypeId.ROADMAP;

      const map = new google.maps.Map(mapContainerRef.current, {
        center: { lat: TANUR_CENTER[0], lng: TANUR_CENTER[1] },
        zoom: 14,
        mapTypeId: initialMapTypeId,
        tilt: viewMode === "3d" ? 45 : 0,
        heading: 0,
        mapTypeControl: false, // Custom UI controls used
        zoomControl: false,    // Custom UI controls used
        streetViewControl: false,
        fullscreenControl: false,
        rotateControl: true,
        scaleControl: true,
      });

      googleMapRef.current = map;
      setActiveEngine("google");
      setCurrentTilt(viewMode === "3d" ? 45 : 0);
      setCurrentHeading(0);

      renderGoogleMarkers(map);
      return true;
    } catch (err) {
      console.warn("Google Maps Platform initialization failed or quota reached. Switching to verified high-res fallback:", err);
      return false;
    }
  }, [hasValidApiKey, apiKey, viewMode]);

  // Render Google Markers
  const renderGoogleMarkers = (map: google.maps.Map) => {
    // Clear previous markers
    googleMarkersRef.current.forEach((m) => m.setMap(null));
    googleMarkersRef.current = [];

    // 1. Places Markers
    filteredLocations.forEach((loc) => {
      if (!loc.latitude || !loc.longitude) return;

      const style = CATEGORY_STYLE[loc.category] || CATEGORY_STYLE.government;

      // Custom SVG Marker Pin
      const marker = new google.maps.Marker({
        position: { lat: loc.latitude, lng: loc.longitude },
        map,
        title: language === "ml" ? loc.name_ml : loc.name,
        icon: {
          path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
          fillColor: style.color,
          fillOpacity: 1,
          strokeColor: "#FFFFFF",
          strokeWeight: 2,
          scale: 1.6,
          anchor: new google.maps.Point(12, 22),
        },
      });

      marker.addListener("click", () => {
        setActiveLocation(loc);
        if (onSelectLocation) onSelectLocation(loc);
        map.panTo({ lat: loc.latitude, lng: loc.longitude });
      });

      googleMarkersRef.current.push(marker);
    });

    // 2. Municipal Development Projects Layer
    if (showProjectsLayer) {
      projects.forEach((proj) => {
        let lat = proj.latitude || 10.9768;
        let lng = proj.longitude || 75.8672;
        if (proj.id === "proj-tnr-001") { lat = 10.9802; lng = 75.8541; }
        else if (proj.id === "proj-tnr-002") { lat = 10.9752; lng = 75.8690; }
        else if (proj.id === "proj-tnr-003") { lat = 10.9775; lng = 75.8665; }
        else if (proj.id === "proj-tnr-004") { lat = 10.9745; lng = 75.8562; }
        else if (proj.id === "proj-tnr-005") { lat = 10.9730; lng = 75.8715; }
        else if (proj.id === "proj-tnr-006") { lat = 10.9768; lng = 75.8672; }

        const marker = new google.maps.Marker({
          position: { lat, lng },
          map,
          title: `[Project] ${language === "ml" ? proj.title_ml : proj.title}`,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: "#C39A5B",
            fillOpacity: 1,
            strokeColor: "#194B35",
            strokeWeight: 2.5,
            scale: 9,
          },
        });

        marker.addListener("click", () => {
          map.panTo({ lat, lng });
        });

        googleMarkersRef.current.push(marker);
      });
    }

    // 3. Civic Issues Layer
    if (showCivicLayer) {
      civicIssues.forEach((issue) => {
        if (!issue.latitude || !issue.longitude) return;

        const marker = new google.maps.Marker({
          position: { lat: issue.latitude, lng: issue.longitude },
          map,
          title: `[Civic Report] ${language === "ml" ? issue.title_ml : issue.title}`,
          icon: {
            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
            fillColor: "#EA580C",
            fillOpacity: 1,
            strokeColor: "#FFFFFF",
            strokeWeight: 1.5,
            scale: 5,
          },
        });

        googleMarkersRef.current.push(marker);
      });
    }
  };

  // ===========================================================================
  // 2. LEAFLET HIGH-RES DUAL FALLBACK INITIALIZATION
  // ===========================================================================
  const initLeafletMap = useCallback(async () => {
    if (!mapContainerRef.current) return;

    const L = (await import("leaflet")).default;

    // Fix leaflet marker icon assets
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });

    if (leafletMapRef.current) {
      leafletMapRef.current.remove();
      leafletMapRef.current = null;
    }

    // Clear container
    mapContainerRef.current.innerHTML = "";

    const map = L.map(mapContainerRef.current, {
      center: TANUR_CENTER,
      zoom: 14,
      minZoom: 12,
      maxZoom: 19,
      zoomControl: false,
    });

    // Select tile URL based on current viewMode
    let tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    let attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | Digital Tanur GIS';

    if (viewMode === "satellite") {
      tileUrl = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
      attribution = 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
    } else if (viewMode === "3d") {
      tileUrl = "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png";
      attribution = 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, SRTM | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (CC-BY-SA)';
    }

    L.tileLayer(tileUrl, {
      attribution,
      maxZoom: 19,
    }).addTo(map);

    leafletMarkersRef.current = L.layerGroup().addTo(map);
    leafletProjectsRef.current = L.layerGroup().addTo(map);
    leafletCivicRef.current = L.layerGroup().addTo(map);

    leafletMapRef.current = map;
    setActiveEngine("fallback");

    renderLeafletMarkers(L);
  }, [viewMode]);

  // Render Leaflet Markers
  const renderLeafletMarkers = (L: any) => {
    if (!leafletMapRef.current) return;

    if (leafletMarkersRef.current) {
      leafletMarkersRef.current.clearLayers();

      filteredLocations.forEach((loc) => {
        if (!loc.latitude || !loc.longitude) return;

        const cfg = CATEGORY_STYLE[loc.category] || CATEGORY_STYLE.government;

        const icon = L.divIcon({
          className: "custom-gis-pin",
          html: `
            <div style="
              width: 34px;
              height: 34px;
              background: ${cfg.color};
              border: 2px solid ${cfg.border};
              box-shadow: 0 4px 10px rgba(0,0,0,0.32);
              border-radius: 50% 50% 50% 0;
              transform: rotate(-45deg);
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              transition: transform 0.2s ease;
            ">
              <span style="
                transform: rotate(45deg);
                font-size: 14px;
                line-height: 1;
                user-select: none;
              ">${cfg.symbol}</span>
            </div>
          `,
          iconSize: [34, 34],
          iconAnchor: [17, 34],
          popupAnchor: [0, -32],
        });

        const marker = L.marker([loc.latitude, loc.longitude], { icon });

        marker.on("click", () => {
          setActiveLocation(loc);
          if (onSelectLocation) onSelectLocation(loc);
        });

        leafletMarkersRef.current.addLayer(marker);
      });
    }

    // Projects Layer
    if (leafletProjectsRef.current) {
      leafletProjectsRef.current.clearLayers();
      if (showProjectsLayer) {
        projects.forEach((proj) => {
          let lat = proj.latitude || 10.9768;
          let lng = proj.longitude || 75.8672;
          if (proj.id === "proj-tnr-001") { lat = 10.9802; lng = 75.8541; }
          else if (proj.id === "proj-tnr-002") { lat = 10.9752; lng = 75.8690; }
          else if (proj.id === "proj-tnr-003") { lat = 10.9775; lng = 75.8665; }
          else if (proj.id === "proj-tnr-004") { lat = 10.9745; lng = 75.8562; }
          else if (proj.id === "proj-tnr-005") { lat = 10.9730; lng = 75.8715; }
          else if (proj.id === "proj-tnr-006") { lat = 10.9768; lng = 75.8672; }

          const icon = L.divIcon({
            className: "custom-project-pin",
            html: `
              <div style="
                width: 32px;
                height: 32px;
                background: #C39A5B;
                border: 2px solid #194B35;
                box-shadow: 0 4px 10px rgba(0,0,0,0.3);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
              ">
                <span style="font-size: 14px;">👷</span>
              </div>
            `,
            iconSize: [32, 32],
            iconAnchor: [16, 16],
          });

          const marker = L.marker([lat, lng], { icon });
          leafletProjectsRef.current.addLayer(marker);
        });
      }
    }

    // Civic Issues Layer
    if (leafletCivicRef.current) {
      leafletCivicRef.current.clearLayers();
      if (showCivicLayer) {
        civicIssues.forEach((issue) => {
          if (!issue.latitude || !issue.longitude) return;

          const icon = L.divIcon({
            className: "custom-civic-pin",
            html: `
              <div style="
                width: 30px;
                height: 30px;
                background: #EA580C;
                border: 2px solid #FFFFFF;
                box-shadow: 0 4px 10px rgba(0,0,0,0.25);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
              ">
                <span style="font-size: 13px;">⚠️</span>
              </div>
            `,
            iconSize: [30, 30],
            iconAnchor: [15, 15],
          });

          const marker = L.marker([issue.latitude, issue.longitude], { icon });
          leafletCivicRef.current.addLayer(marker);
        });
      }
    }
  };

  // Main lifecycle: Try Google Maps, fallback to Leaflet
  useEffect(() => {
    if (!isMounted) return;

    let isCancelled = false;

    const setupMap = async () => {
      if (hasValidApiKey) {
        const ok = await initGoogleMap();
        if (!ok && !isCancelled) {
          initLeafletMap();
        }
      } else {
        initLeafletMap();
      }
    };

    setupMap();

    return () => {
      isCancelled = true;
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, [isMounted, hasValidApiKey, initGoogleMap, initLeafletMap]);

  // Update Markers on filter or layer toggle
  useEffect(() => {
    if (!isMounted) return;

    if (activeEngine === "google" && googleMapRef.current) {
      renderGoogleMarkers(googleMapRef.current);
    } else if (activeEngine === "fallback" && leafletMapRef.current) {
      import("leaflet").then((mod) => {
        renderLeafletMarkers(mod.default);
      });
    }
  }, [filteredLocations, showProjectsLayer, showCivicLayer, projects, civicIssues, language, activeEngine]);

  // ===========================================================================
  // 3. MAP VIEW & CAMERA CONTROLS
  // ===========================================================================
  const handleViewModeChange = (mode: MapViewMode) => {
    setViewMode(mode);

    if (activeEngine === "google" && googleMapRef.current) {
      if (mode === "map") {
        googleMapRef.current.setMapTypeId(google.maps.MapTypeId.ROADMAP);
        googleMapRef.current.setTilt(0);
        setCurrentTilt(0);
      } else if (mode === "satellite") {
        googleMapRef.current.setMapTypeId(google.maps.MapTypeId.HYBRID);
        googleMapRef.current.setTilt(0);
        setCurrentTilt(0);
      } else if (mode === "3d") {
        googleMapRef.current.setMapTypeId(google.maps.MapTypeId.TERRAIN);
        googleMapRef.current.setTilt(45);
        setCurrentTilt(45);
      }
    } else if (activeEngine === "fallback") {
      // Re-init leaflet with chosen tile layer
      initLeafletMap();
    }
  };

  // Zoom Controls
  const handleZoom = (delta: number) => {
    if (activeEngine === "google" && googleMapRef.current) {
      const z = googleMapRef.current.getZoom() || 14;
      googleMapRef.current.setZoom(z + delta);
    } else if (activeEngine === "fallback" && leafletMapRef.current) {
      leafletMapRef.current.setZoom(leafletMapRef.current.getZoom() + delta);
    }
  };

  // Tilt Controls (for 3D View)
  const handleTilt = (delta: number) => {
    if (activeEngine === "google" && googleMapRef.current) {
      const newTilt = Math.max(0, Math.min(67.5, currentTilt + delta));
      googleMapRef.current.setTilt(newTilt);
      setCurrentTilt(newTilt);
    } else {
      // Simulated tilt state
      setCurrentTilt((prev) => Math.max(0, Math.min(60, prev + delta)));
    }
  };

  // Heading / Rotation Controls
  const handleRotate = (delta: number) => {
    const newHeading = (currentHeading + delta + 360) % 360;
    setCurrentHeading(newHeading);

    if (activeEngine === "google" && googleMapRef.current) {
      googleMapRef.current.setHeading(newHeading);
    }
  };

  // Reset to North
  const handleResetOrientation = () => {
    setCurrentHeading(0);
    setCurrentTilt(viewMode === "3d" ? 45 : 0);

    if (activeEngine === "google" && googleMapRef.current) {
      googleMapRef.current.setHeading(0);
      googleMapRef.current.setTilt(viewMode === "3d" ? 45 : 0);
    }
  };

  // Recenter to Tanur
  const handleRecenter = () => {
    flyToLocation(TANUR_CENTER[0], TANUR_CENTER[1], 14);
  };

  return (
    <div className={`relative bg-white rounded-3xl border border-[#EDE6D8] shadow-md overflow-hidden ${className}`}>
      {/* ===================================================================== */}
      {/* TOP HEADER CONTROLS BAR                                               */}
      {/* ===================================================================== */}
      <div className="p-3 sm:p-4 bg-[#FAF7F0] border-b border-[#EDE6D8] flex flex-wrap items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-[#5C6A64] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              language === "ml"
                ? "സ്ഥലങ്ങൾ, ഓഫീസുകൾ, ആശുപത്രികൾ തിരയുക..."
                : "Search places, government offices, clinics..."
            }
            className="w-full pl-9 pr-8 py-2 bg-white text-xs sm:text-sm text-[#1A2420] border border-[#EDE6D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#194B35]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#5C6A64] hover:text-[#1A2420]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* View Mode Switcher Pills (Map, Satellite, 3D) */}
        <div className="flex items-center bg-white p-1 rounded-2xl border border-[#EDE6D8] shadow-xs">
          <button
            onClick={() => handleViewModeChange("map")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              viewMode === "map"
                ? "bg-[#194B35] text-white shadow-xs"
                : "text-[#5C6A64] hover:text-[#194B35] hover:bg-neutral-50"
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{language === "ml" ? "മാപ്പ് (Roads)" : "Map"}</span>
          </button>

          <button
            onClick={() => handleViewModeChange("satellite")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              viewMode === "satellite"
                ? "bg-[#194B35] text-white shadow-xs"
                : "text-[#5C6A64] hover:text-[#194B35] hover:bg-neutral-50"
            }`}
          >
            <Globe2 className="w-3.5 h-3.5" />
            <span>{language === "ml" ? "സാറ്റലൈറ്റ് (2D)" : "Satellite"}</span>
          </button>

          <button
            onClick={() => handleViewModeChange("3d")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              viewMode === "3d"
                ? "bg-[#194B35] text-white shadow-xs"
                : "text-[#5C6A64] hover:text-[#194B35] hover:bg-neutral-50"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{language === "ml" ? "3D ടെറൈൻ" : "3D Terrain"}</span>
          </button>
        </div>

        {/* Coverage & Technical Info Button */}
        <button
          onClick={() => setIsCoverageModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white text-[#194B35] border border-[#EDE6D8] hover:bg-neutral-50 transition shadow-xs"
          title="Inspect Google Maps Platform Coverage & Feasibility"
        >
          <Info className="w-3.5 h-3.5 text-[#C39A5B]" />
          <span className="hidden sm:inline">
            {language === "ml" ? "കവറേജ് വിവരങ്ങൾ" : "Coverage Info"}
          </span>
        </button>
      </div>

      {/* ===================================================================== */}
      {/* 3D MODE GENUINE COVERAGE NOTICE BAR                                   */}
      {/* ===================================================================== */}
      {viewMode === "3d" && (
        <div className="px-4 py-2 bg-amber-50/80 border-b border-amber-200 text-amber-900 text-xs flex items-center justify-between gap-3 animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
            <span className="font-bold">
              {language === "ml"
                ? "3D ടെറൈൻ ആക്റ്റീവ്:"
                : "3D Terrain Mode Active:"}
            </span>
            <span className="text-[11px] text-amber-800">
              {language === "ml"
                ? "താനൂർ ഭൂപ്രകൃതിയുടെ ഡിജിറ്റൽ എലവേഷനും ടിൽറ്റ് ക്യാമറയും കാണിക്കുന്നു. (ഇന്ത്യയിലെ ടയർ-1 മെട്രോകളിൽ മാത്രം ലഭ്യമായ ഫോട്ടോറിയലിസ്റ്റിക് 3D ബിൽഡിംഗുകൾ താനൂരിൽ ഗൂഗിൾ നൽകുന്നില്ല)."
                : "Showing verified topographical elevation & pitch camera. (Photorealistic 3D building mesh is currently limited by Google to Tier-1 Indian metros)."}
            </span>
          </div>

          <button
            onClick={() => setIsCoverageModalOpen(true)}
            className="text-[10px] font-bold text-amber-900 underline shrink-0 hover:text-amber-700"
          >
            {language === "ml" ? "കൂടുതൽ അറിയുക" : "Learn More"}
          </button>
        </div>
      )}

      {/* ===================================================================== */}
      {/* CATEGORY FILTER PILLS & LAYER TOGGLES                                 */}
      {/* ===================================================================== */}
      <div className="px-3 sm:px-4 py-2 bg-[#FAF7F0]/60 border-b border-[#EDE6D8] overflow-x-auto scrollbar-none flex items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition ${
              selectedCategory === "all"
                ? "bg-[#194B35] text-white shadow-xs"
                : "bg-white text-[#5C6A64] border border-[#EDE6D8] hover:bg-neutral-100"
            }`}
          >
            {language === "ml" ? "എല്ലാം" : "All Categories"} ({locations.filter(l => l.category !== "business" && !l.id.startsWith("loc-biz-")).length})
          </button>

          {TANUR_LOCATION_CATEGORIES.filter(cat => cat.key !== "business").map((cat) => {
            const isSelected = selectedCategory === cat.key;
            const count = locations.filter((l) => l.category === cat.key && !l.id.startsWith("loc-biz-")).length;
            return (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key as LocationCategoryKey)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  isSelected
                    ? "bg-[#194B35] text-white shadow-xs"
                    : "bg-white text-[#5C6A64] border border-[#EDE6D8] hover:bg-neutral-100"
                }`}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                <span>{language === "ml" ? cat.label_ml : cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? "bg-white/20 text-white" : "bg-neutral-100 text-[#5C6A64]"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Layer Toggles (Projects, Civic) */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setShowProjectsLayer(!showProjectsLayer)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold border transition ${
              showProjectsLayer
                ? "bg-[#C39A5B]/20 text-[#194B35] border-[#C39A5B]"
                : "bg-white text-[#5C6A64] border-[#EDE6D8] hover:bg-neutral-50"
            }`}
            title="Toggle Municipal Development Projects Layer"
          >
            <HardHat className="w-3.5 h-3.5 text-[#C39A5B]" />
            <span className="hidden sm:inline">{language === "ml" ? "പദ്ധതികൾ" : "Projects"}</span>
          </button>

          <button
            onClick={() => setShowCivicLayer(!showCivicLayer)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold border transition ${
              showCivicLayer
                ? "bg-[#EA580C]/20 text-[#EA580C] border-[#EA580C]"
                : "bg-white text-[#5C6A64] border-[#EDE6D8] hover:bg-neutral-50"
            }`}
            title="Toggle Anonymized Civic Issues Layer"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-[#EA580C]" />
            <span className="hidden sm:inline">{language === "ml" ? "പരാതികൾ" : "Civic"}</span>
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* MAP CANVAS & INTERACTIVE OVERLAYS                                     */}
      {/* ===================================================================== */}
      <div className="relative overflow-hidden">
        {/* The Map Div */}
        <div
          ref={mapContainerRef}
          className={`w-full ${heightClass} z-10 transition-transform duration-300`}
          style={{
            minHeight: "480px",
            transform: viewMode === "3d" && activeEngine === "fallback" ? `perspective(1000px) rotateX(${currentTilt}deg) rotateZ(${currentHeading}deg)` : undefined,
          }}
        />

        {/* Top-Right Camera & Orientation Controls Floating Widget */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
          {/* Zoom Buttons */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-[#EDE6D8] p-1 shadow-md flex flex-col gap-1">
            <button
              onClick={() => handleZoom(1)}
              className="p-2 hover:bg-neutral-100 rounded-xl text-[#194B35] transition"
              title="Zoom In"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleZoom(-1)}
              className="p-2 hover:bg-neutral-100 rounded-xl text-[#194B35] transition border-t border-neutral-100"
              title="Zoom Out"
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>

          {/* 3D Tilt & Heading Camera Controls */}
          {viewMode === "3d" && (
            <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-[#EDE6D8] p-1.5 shadow-md flex flex-col gap-1.5 animate-in fade-in slide-in-from-right-2 duration-200 text-xs">
              <span className="text-[9px] font-bold uppercase tracking-wider text-center text-[#C39A5B] block">
                3D Camera
              </span>

              {/* Pitch / Tilt Controls */}
              <div className="flex items-center justify-between gap-1 bg-[#FAF7F0] p-1 rounded-xl">
                <button
                  onClick={() => handleTilt(15)}
                  className="px-2 py-1 bg-white hover:bg-neutral-100 rounded-lg font-bold text-[10px] text-[#194B35] shadow-xs"
                  title="Tilt Up (Pitch)"
                >
                  ▲ +15°
                </button>
                <span className="text-[10px] font-bold text-[#5C6A64]">{currentTilt}°</span>
                <button
                  onClick={() => handleTilt(-15)}
                  className="px-2 py-1 bg-white hover:bg-neutral-100 rounded-lg font-bold text-[10px] text-[#194B35] shadow-xs"
                  title="Tilt Down"
                >
                  ▼ -15°
                </button>
              </div>

              {/* Rotate Heading Controls */}
              <div className="flex items-center justify-between gap-1 bg-[#FAF7F0] p-1 rounded-xl">
                <button
                  onClick={() => handleRotate(-30)}
                  className="p-1.5 bg-white hover:bg-neutral-100 rounded-lg text-[#194B35] shadow-xs"
                  title="Rotate Left (-30°)"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <span className="text-[10px] font-bold text-[#5C6A64]">{currentHeading}°</span>
                <button
                  onClick={() => handleRotate(30)}
                  className="p-1.5 bg-white hover:bg-neutral-100 rounded-lg text-[#194B35] shadow-xs"
                  title="Rotate Right (+30°)"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Reset Compass North */}
              <button
                onClick={handleResetOrientation}
                className="w-full py-1 bg-[#194B35] text-white rounded-xl text-[10px] font-bold flex items-center justify-center gap-1 shadow-xs hover:bg-[#123626] transition"
                title="Reset Camera North"
              >
                <Compass className="w-3 h-3" />
                <span>Reset 0° N</span>
              </button>
            </div>
          )}

          {/* Recenter Tanur Center */}
          <button
            onClick={handleRecenter}
            className="p-2.5 bg-white/95 backdrop-blur-md rounded-2xl border border-[#EDE6D8] shadow-md hover:bg-neutral-100 text-[#194B35] transition flex items-center justify-center"
            title="Recenter to Tanur Municipality Center"
          >
            <MapPin className="w-4 h-4 text-[#C39A5B]" />
          </button>
        </div>

        {/* Bottom-Left Quick Locality Presets */}
        <div className="absolute bottom-4 left-4 z-20 hidden md:flex items-center gap-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl border border-[#EDE6D8] shadow-sm text-xs text-[#5C6A64]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#C39A5B] px-2">
            {language === "ml" ? "പ്രധാന കേന്ദ്രങ്ങൾ:" : "Presets:"}
          </span>
          <button
            onClick={() => flyToLocation(10.9768, 75.8672, 16)}
            className="px-2.5 py-1 rounded-xl hover:bg-neutral-100 font-semibold text-[#194B35] transition"
          >
            🏛️ {language === "ml" ? "ടൗൺ സെന്റർ" : "Town"}
          </button>
          <button
            onClick={() => flyToLocation(10.9802, 75.8541, 16)}
            className="px-2.5 py-1 rounded-xl hover:bg-neutral-100 font-semibold text-[#194B35] transition"
          >
            ⚓ {language === "ml" ? "ഹാർബർ" : "Harbour"}
          </button>
          <button
            onClick={() => flyToLocation(10.9745, 75.8562, 16)}
            className="px-2.5 py-1 rounded-xl hover:bg-neutral-100 font-semibold text-[#194B35] transition"
          >
            🏖️ {language === "ml" ? "ബീച്ച്" : "Beach"}
          </button>
          <button
            onClick={() => flyToLocation(10.9750, 75.8690, 16)}
            className="px-2.5 py-1 rounded-xl hover:bg-neutral-100 font-semibold text-[#194B35] transition"
          >
            🚉 {language === "ml" ? "റെയിൽവേ" : "Station"}
          </button>
        </div>

        {/* Selected Location Details Card / Bottom Drawer */}
        {activeLocation && (
          <div className="absolute bottom-4 right-4 max-w-sm w-[calc(100%-2rem)] z-30 bg-white/98 backdrop-blur-md p-4 rounded-3xl border border-[#C39A5B] shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-200">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#194B35] text-white font-bold">
                  {language === "ml" ? activeLocation.category_name_ml : activeLocation.category_name}
                </span>
                {activeLocation.is_verified && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#194B35]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#194B35]" />
                    <span>Verified</span>
                  </span>
                )}
              </div>
              <button
                onClick={() => setActiveLocation(null)}
                className="text-neutral-400 hover:text-neutral-700 p-1 rounded-full transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h4 className="font-bold text-base text-[#194B35] mt-2 font-malayalam-heading">
              {language === "ml" ? activeLocation.name_ml : activeLocation.name}
            </h4>

            <p className="text-xs text-[#5C6A64] mt-1 line-clamp-2 leading-relaxed">
              {language === "ml" ? activeLocation.description_ml : activeLocation.description}
            </p>

            <div className="mt-3 space-y-1.5 text-xs text-[#5C6A64]">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#C39A5B] shrink-0" />
                <span className="truncate">
                  {language === "ml" ? (activeLocation.locality_ml || activeLocation.locality) : activeLocation.locality}
                  {activeLocation.ward_number ? ` (Ward ${activeLocation.ward_number})` : ""}
                </span>
              </div>
              {activeLocation.opening_hours && (
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#194B35] shrink-0" />
                  <span>{activeLocation.opening_hours}</span>
                </div>
              )}
              {activeLocation.phone && (
                activeLocation.phone.startsWith("0494") || 
                activeLocation.phone.startsWith("+91 494") ||
                ["112", "101", "108", "1912", "1098", "1091"].includes(activeLocation.phone.trim())
              ) ? (
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#194B35] shrink-0" />
                  <a href={`tel:${activeLocation.phone}`} className="text-[#194B35] font-semibold underline">
                    {activeLocation.phone}
                  </a>
                  <span className="text-[9px] text-[#7A8880]">(Official Public Desk)</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-[11px] text-[#7A8880]">
                  <Phone className="w-3.5 h-3.5 text-[#C39A5B] shrink-0" />
                  <span>Central Municipal Switchboard: 0494 2440228</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 mt-3.5 pt-3 border-t border-[#EDE6D8]">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${activeLocation.latitude},${activeLocation.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Get driving directions on Google Maps"
                data-action="directions"
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-[#194B35] text-white rounded-xl text-xs font-bold hover:bg-[#123626] transition shadow-xs"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>{language === "ml" ? "റൂട്ട് കാണുക (Google Maps)" : "Directions"}</span>
              </a>

              {activeLocation.website && (
                <a
                  href={activeLocation.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-2 bg-[#FAF7F0] text-[#194B35] border border-[#EDE6D8] rounded-xl hover:bg-neutral-100 transition"
                  title="Official Website"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Geographic Boundary & Pin Verification Disclaimer Pill */}
      <div className="px-4 py-2.5 bg-[#FAF7F0] border-t border-[#EDE6D8] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-[#5C6A64]">
        <div className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-[#194B35] shrink-0" />
          <span>
            {language === "ml"
              ? "മാപ്പ് പിന്നുകൾ സ്ഥിരീകരിച്ച പൊതുസ്ഥാപന കോർഡിനേറ്റുകളാണ്. വാർഡ് അതിർത്തികൾ റഫറൻസ് മാത്രമാണ്; ഡിജിറ്റൽ കാഡസ്ട്രൽ മാപ്പുകൾ സർവേ ഓഫ് ഇന്ത്യ റിലീസിന് വിധേയം."
              : "Map pins indicate verified public facility coordinates. Ward boundaries shown are indicative reference points pending Survey of India / LSGD digital cadastral release."}
          </span>
        </div>
        <span className="text-[10px] font-bold text-[#194B35] shrink-0 bg-white px-2 py-0.5 rounded-md border border-[#EDE6D8]">
          {filteredLocations.length} Verified Public Facilities
        </span>
      </div>

      {/* ===================================================================== */}
      {/* GOOGLE MAPS PLATFORM COVERAGE MODAL                                   */}
      {/* ===================================================================== */}
      <GoogleMapsCoverageModal
        isOpen={isCoverageModalOpen}
        onClose={() => setIsCoverageModalOpen(false)}
        language={language}
        hasApiKey={hasValidApiKey}
      />
    </div>
  );
}
