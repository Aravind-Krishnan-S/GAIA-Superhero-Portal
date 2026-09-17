"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useMap, useMapEvents, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { fetchPOIs, POI } from "@/utils/overpassApi";

// SVG Icons
const icons = {
  hospital: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`, // modified cross to medical
  police: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  education: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
  transport: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><path d="M4 11h16M9 15h0M15 15h0M9 19v2M15 19v2"/></svg>`,
  tech: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`
};

const colors = {
  hospital: "#10b981", // emerald
  police: "#3b82f6",   // blue
  education: "#f59e0b",// amber
  transport: "#8b5cf6",// violet
  tech: "#06b6d4"      // cyan
};

const createIcon = (type: POI["type"]) => {
  // Use a fallback if type is missing or unknown
  const safeType = (icons[type as keyof typeof icons] ? type : "tech") as keyof typeof icons;
  const color = colors[safeType];
  const svg = icons[safeType];

  return L.divIcon({
    className: "custom-poi-marker",
    html: `
      <div style="
        width: 28px; 
        height: 28px; 
        background-color: #050505; 
        border: 1.5px solid ${color}; 
        border-radius: 4px; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        color: ${color}; 
        box-shadow: 0 0 10px ${color}40;
      ">
        ${svg}
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14]
  });
};

export default function POIOverlay({ showPOIs = true }: { showPOIs?: boolean }) {
  const map = useMap();
  const [pois, setPois] = useState<POI[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCurrentBounds = useCallback(async () => {
    if (!showPOIs) return;
    
    // Only fetch if zoom is close enough to avoid massive data pulls
    if (map.getZoom() < 12) {
      setPois([]);
      return;
    }

    const bounds = map.getBounds();
    setIsLoading(true);
    
    // Overpass expects South, West, North, East
    const results = await fetchPOIs(
      bounds.getSouth(),
      bounds.getWest(),
      bounds.getNorth(),
      bounds.getEast()
    );
    
    if (results !== null) {
      setPois(results);
    }
    setIsLoading(false);
  }, [map, showPOIs]);

  // Initial fetch
  useEffect(() => {
    fetchCurrentBounds();
  }, [fetchCurrentBounds]);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Re-fetch on map move end
  useMapEvents({
    moveend: () => {
      // Debounce slightly in UI, to avoid Overpass API rate limits
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        fetchCurrentBounds();
      }, 800);
    }
  });

  if (!showPOIs) return null;

  return (
    <>
      {pois.map(poi => (
        <Marker key={poi.id} position={[poi.lat, poi.lon]} icon={createIcon(poi.type)}>
          <Popup className="custom-popup-wrapper" autoPan={false}>
            <div className="bg-[#050505]/90 backdrop-blur-sm border border-[#E50914]/50 p-2 text-[#F8F9FA] font-mono text-xs w-48 shadow-[0_0_15px_rgba(229,9,20,0.3)]">
              <div className="font-bold border-b border-[#E50914]/30 pb-1 mb-1 truncate text-[#E50914]">
                {poi.tags.name || `UNKNOWN ${poi.type.toUpperCase()}`}
              </div>
              <div className="text-[9px] text-[#E50914]/70 tracking-widest capitalize">
                TYPE: {poi.type}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
      
      {/* Loading indicator for POIs */}
      {isLoading && (
        <div className="absolute top-4 right-4 z-[1000] bg-[#050505]/80 border border-[#E50914] text-[#E50914] font-mono text-[10px] px-3 py-1 rounded-sm tracking-widest animate-pulse pointer-events-none">
          SCANNING FOR POI...
        </div>
      )}
    </>
  );
}
