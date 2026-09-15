"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';

// Fix Leaflet icon issue in Next.js
const blueIcon = L.divIcon({
  className: "custom-beacon-amber",
  html: `<div style="width: 20px; height: 20px; background-color: #f59e0b; border-radius: 50%; box-shadow: 0 0 15px 5px rgba(245, 158, 11, 0.6); animation: pulse-glow 2s infinite;"></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

const redIcon = L.divIcon({
  className: "custom-beacon-red",
  html: `<div style="width: 20px; height: 20px; background-color: #ef4444; border-radius: 50%; box-shadow: 0 0 15px 5px rgba(239, 68, 68, 0.6); animation: pulse-glow 2s infinite;"></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

function ClickHandler({ onMapClick }: { onMapClick?: (latlng: {lat: number, lng: number}) => void }) {
  useMapEvents({
    click(e) {
      if (onMapClick) onMapClick({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

function MapUpdater({ center }: { center?: {lat: number, lng: number} | null }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView([center.lat, center.lng], 13, { animate: true });
    }
  }, [center, map]);
  return null;
}

export default function MapComponent({ 
  onMapClick, 
  beacon,
  incidents,
  center
}: { 
  onMapClick?: (latlng: {lat: number, lng: number}) => void,
  beacon?: {lat: number, lng: number} | null,
  incidents?: {
    id: number;
    lat: number;
    lng: number;
    title: string;
    description: string;
    severity: string;
    timestamp: string;
  }[],
  center?: {lat: number, lng: number} | null
}) {
  
  // Clean up leaflet container if re-mounted (strict mode fix)
  useEffect(() => {
    return () => {
      const container = L.DomUtil.get('map');
      if(container != null){
        // @ts-expect-error - container._leaflet_id is not typed
        container._leaflet_id = null;
      }
    };
  }, []);

  return (
    <div id="map" className="w-full h-full z-0">
      <MapContainer 
        center={[20, 0]} 
        zoom={3} 
        style={{ height: '100%', width: '100%', background: '#050505' }}
        zoomControl={false}
      >
        <TileLayer
          url="https://api.maptiler.com/maps/basic-v2-dark/256/{z}/{x}/{y}.png?key=iCsRDdpVnVkGpLEJ7tSR"
          attribution='&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <ClickHandler onMapClick={onMapClick} />
        <MapUpdater center={center} />
        
        {/* Render Saved Incidents */}
        {incidents && incidents.map((incident) => (
          <Marker key={incident.id} position={[incident.lat, incident.lng]} icon={redIcon}>
            <Popup>
              <div className="bg-slate-900 border border-slate-700 text-white font-sans w-48 p-2 rounded-sm shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                <h4 className="font-bold text-red-500 font-mono uppercase tracking-widest border-b border-slate-700 pb-1 mb-2">{incident.title}</h4>
                <p className="text-sm mb-2 text-slate-300">{incident.description}</p>
                <div className="flex flex-col text-[10px] tracking-widest text-slate-500 font-mono gap-1">
                  <span className={`font-bold ${incident.severity === 'Critical' ? 'text-red-500' : 'text-amber-500'}`}>
                    CLASS: {incident.severity.toUpperCase()}
                  </span>
                  <span>{incident.timestamp}</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Temporary Pin for New Report */}
        {beacon && (
          <Marker position={[beacon.lat, beacon.lng]} icon={blueIcon}>
            <Popup>
              <div className="bg-slate-900 border border-amber-500 p-2 rounded-sm text-white font-mono font-bold tracking-widest text-center shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                DISTRESS BEACON <br/>
                <span className="text-amber-500 animate-pulse text-xs">STATUS: LOCATION PINNED</span>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
