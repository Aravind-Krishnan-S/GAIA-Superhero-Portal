"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import DistressForm from "@/components/DistressForm";

// Dynamically import MapComponent to disable SSR since Leaflet uses window
const MapComponent = dynamic(() => import("@/components/MapComponent"), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#f8f9fa] font-mono text-[#E50914] tracking-widest text-sm">
      INITIALIZING SATELLITE UPLINK...
    </div>
  )
});

export default function TransmitDistressPage() {
  const router = useRouter();
  const [beacon, setBeacon] = useState<{lat: number, lng: number} | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [mapCenter, setMapCenter] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latlng = { lat: position.coords.latitude, lng: position.coords.longitude };
          setMapCenter(latlng);
          setBeacon(latlng);
          setShowForm(true);
        },
        (error) => {
          console.warn("Geolocation error or denied:", error);
        }
      );
    }
  }, []);

  const handleMapClick = (latlng: {lat: number, lng: number}) => {
    if (showForm) {
      // Fade out current form first
      setShowForm(false);
      // Wait for exit animation (0.2s), then move beacon and fade in
      setTimeout(() => {
        setBeacon(latlng);
        // Small delay to ensure the DOM is ready for the new popup position before fading in
        setTimeout(() => setShowForm(true), 50);
      }, 200);
    } else {
      setBeacon(latlng);
      setShowForm(true);
    }
  };

  const handleClose = () => {
    setShowForm(false);
    setTimeout(() => {
      setBeacon(null);
    }, 200);
  };

  return (
    <main className="w-[100vw] h-[100vh] relative overflow-hidden bg-[#050505]">
      {/* Absolute positioning to cover everything underneath the TopNavigation */}
      <div className="absolute inset-0 z-0">
        <MapComponent 
          theme="dark"
          center={mapCenter}
          onMapClick={handleMapClick}
          beacon={beacon}
        />
      </div>

      <div className="absolute top-24 right-8 z-20 pointer-events-auto">
        <DistressForm 
          beacon={beacon} 
          isVisible={showForm} 
          onClose={handleClose} 
        />
      </div>

      {/* Instructions Overlay */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none z-10 flex flex-col items-center">
        {!beacon && (
          <div className="bg-[#E50914] text-white px-6 py-3 rounded-full font-mono text-xs font-bold tracking-widest shadow-[0_0_20px_rgba(229,9,20,0.5)] animate-bounce">
            SELECT COORDINATES ON MAP TO TRANSMIT DISTRESS SIGNAL
          </div>
        )}
        <button 
          onClick={() => router.push('/')}
          className="pointer-events-auto mt-4 text-[#E50914] bg-white px-4 py-2 border border-[#E50914] hover:bg-[#E50914] hover:text-white transition-colors font-mono text-[10px] tracking-widest shadow-md"
        >
          [RETURN TO TERMINAL]
        </button>
      </div>
    </main>
  );
}
