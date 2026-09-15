"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, MapPin, Radio, ShieldAlert } from "lucide-react";

// Dynamically import MapComponent to prevent SSR issues with Leaflet
const MapComponent = dynamic(() => import("./MapComponent"), { ssr: false });

interface DistressProtocolProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DistressProtocol({ isOpen, onClose }: DistressProtocolProps) {
  const [beacon, setBeacon] = useState<{ lat: number; lng: number } | null>(null);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [incidentType, setIncidentType] = useState("");
  const [threatLevel, setThreatLevel] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");

  useEffect(() => {
    if (isOpen && !beacon) {
      setIsLocating(true);
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const loc = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            setBeacon(loc);
            setMapCenter(loc);
            setIsLocating(false);
          },
          (error) => {
            console.error("Error getting location", error);
            setIsLocating(false);
            setMapCenter({ lat: 40.7128, lng: -74.0060 });
          },
          { enableHighAccuracy: true, timeout: 10000 }
        );
      } else {
        setIsLocating(false);
        setMapCenter({ lat: 40.7128, lng: -74.0060 });
      }
    }
    
    if (isOpen) {
      setIsSuccess(false);
      setIsSubmitting(false);
    }
  }, [isOpen, beacon]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!beacon) {
      alert("PLEASE SELECT LOCATION PARAMETERS.");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call for cinematic effect
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      setTimeout(() => {
        onClose();
        setIncidentType("");
        setThreatLevel("");
        setDescription("");
        setContact("");
        setBeacon(null);
      }, 4000);
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#000000]/90 backdrop-blur-md font-mono"
        >
          {/* Global Scanlines for Emergency Mode */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,51,51,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,51,51,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none border-[8px] border-[#ff3333]/30 animate-pulse" />

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-5xl h-[85vh] md:h-[75vh] flex flex-col md:flex-row border border-[#ff3333]/50 shadow-[0_0_50px_rgba(255,51,51,0.2)] bg-[#000000] relative overflow-hidden"
          >
            {/* Cinematic Overlay FX */}
            <div className="absolute top-0 left-0 w-full h-1 bg-[#ff3333] shadow-[0_0_15px_rgba(255,51,51,1)]" />

            {/* Left: Map & Tactical */}
            <div className="w-full md:w-1/2 h-64 md:h-full relative border-b md:border-b-0 md:border-r border-[#ff3333]/30 bg-[#1F1F1F]">
              {isLocating && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#000000]/80 backdrop-blur-sm">
                  <div className="flex flex-col items-center gap-4 text-[#ff3333]">
                    <Radio className="w-12 h-12 animate-ping" />
                    <span className="tracking-widest text-xs animate-pulse">ACQUIRING SIGNAL LOCK...</span>
                  </div>
                </div>
              )}
              
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 pointer-events-none">
                <div className="bg-[#ff3333]/20 border border-[#ff3333] text-[#ff3333] px-3 py-1 text-[10px] tracking-widest flex items-center gap-2 backdrop-blur-md">
                  <div className="w-1.5 h-1.5 bg-[#ff3333] animate-pulse" />
                  EMERGENCY UPLINK ACTIVE
                </div>
              </div>

              <div className="h-full grayscale sepia-[0.3] hue-rotate-[-50deg] opacity-80 mix-blend-screen">
                <MapComponent 
                  onMapClick={(latlng) => setBeacon(latlng)} 
                  beacon={beacon} 
                  center={mapCenter}
                />
              </div>

              <div className="absolute bottom-4 left-4 right-4 z-10 bg-[#000000]/80 border border-[#ff3333]/30 p-3 flex justify-between items-center backdrop-blur-md">
                <div className="text-[#ff3333] text-[10px] tracking-widest flex items-center gap-2">
                  <MapPin size={12} />
                  {beacon ? `LAT: ${beacon.lat.toFixed(4)} LNG: ${beacon.lng.toFixed(4)}` : "AWAITING COORDINATES"}
                </div>
                {beacon && <span className="text-[#E50914] text-[10px] tracking-widest">LOCKED</span>}
              </div>
            </div>

            {/* Right: Form Data */}
            <div className="w-full md:w-1/2 h-full flex flex-col relative overflow-hidden">
              {/* Header */}
              <div className="p-6 border-b border-[#ff3333]/30 flex justify-between items-start bg-[#ff3333]/5">
                <div>
                  <h2 className="text-2xl font-bold text-[#ff3333] tracking-widest flex items-center gap-3">
                    <ShieldAlert size={24} className="animate-pulse" />
                    DISTRESS PROTOCOL
                  </h2>
                  <p className="text-[#ff3333]/60 text-[10px] tracking-widest mt-1">
                    WARNING: CLASS-A FELONY FOR FALSE TRANSMISSIONS
                  </p>
                </div>
                <button 
                  onClick={onClose}
                  className="text-[#ff3333]/60 hover:text-[#ff3333] transition-colors p-2 interactive"
                >
                  <span className="text-xs tracking-widest">[ABORT]</span>
                </button>
              </div>

              {/* Form Content */}
              <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
                {isSuccess ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-[#E50914] rounded-full animate-ping opacity-20" />
                      <div className="w-24 h-24 border border-[#E50914] rounded-full flex items-center justify-center bg-[#E50914]/10">
                        <AlertTriangle className="w-12 h-12 text-[#E50914]" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#E50914] tracking-widest mb-2">SIGNAL RECEIVED</h3>
                      <p className="text-[#E50914]/60 text-xs tracking-widest">
                        G.A.I.A. CORE HAS REGISTERED THE ANOMALY.<br/>
                        OPERATIVES DISPATCHED TO YOUR SECTOR.
                      </p>
                    </div>
                    <div className="text-[10px] text-[#888888] tracking-widest animate-pulse pt-8">
                      TERMINATING CONNECTION IN 3... 2... 1...
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col h-full gap-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] text-[#ff3333] tracking-widest">INCIDENT TYPE</label>
                        <select 
                          required
                          value={incidentType}
                          onChange={(e) => setIncidentType(e.target.value)}
                          className="w-full bg-[#ff3333]/5 border border-[#ff3333]/30 text-[#ff3333] p-3 text-xs tracking-widest focus:outline-none focus:border-[#ff3333] appearance-none"
                        >
                          <option value="" disabled>SELECT TYPE</option>
                          <option value="VILLAIN">HOSTILE ENTITY</option>
                          <option value="ANOMALY">SPATIAL ANOMALY</option>
                          <option value="TECH">ROGUE AI/TECH</option>
                          <option value="BIO">BIO-HAZARD</option>
                          <option value="OTHER">UNKNOWN</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] text-[#ff3333] tracking-widest">THREAT LEVEL</label>
                        <select 
                          required
                          value={threatLevel}
                          onChange={(e) => setThreatLevel(e.target.value)}
                          className="w-full bg-[#ff3333]/5 border border-[#ff3333]/30 text-[#ff3333] p-3 text-xs tracking-widest focus:outline-none focus:border-[#ff3333] appearance-none"
                        >
                          <option value="" disabled>ASSESS THREAT</option>
                          <option value="GAMMA">GAMMA (LOCAL)</option>
                          <option value="BETA">BETA (CITY)</option>
                          <option value="ALPHA">ALPHA (NATIONAL)</option>
                          <option value="OMEGA">OMEGA (GLOBAL)</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2 flex-1 flex flex-col">
                      <label className="text-[10px] text-[#ff3333] tracking-widest">TACTICAL SITUATION</label>
                      <textarea 
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="DETAIL HOSTILES, CASUALTIES, AND HAZARDS..."
                        className="w-full flex-1 min-h-[120px] bg-[#ff3333]/5 border border-[#ff3333]/30 text-[#ff3333] placeholder-[#ff3333]/30 p-4 text-xs tracking-widest focus:outline-none focus:border-[#ff3333] resize-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] text-[#ff3333] tracking-widest">CONTACT ID (OPTIONAL)</label>
                      <input 
                        type="text" 
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="CITIZEN ID OR CALLSIGN"
                        className="w-full bg-[#ff3333]/5 border border-[#ff3333]/30 text-[#ff3333] placeholder-[#ff3333]/30 p-3 text-xs tracking-widest focus:outline-none focus:border-[#ff3333]"
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-4 text-sm font-bold tracking-widest transition-all mt-auto interactive ${
                        isSubmitting 
                          ? 'bg-transparent border border-[#ff3333]/30 text-[#ff3333]/50 cursor-not-allowed'
                          : 'bg-[#ff3333]/10 border border-[#ff3333] text-[#ff3333] hover:bg-[#ff3333] hover:text-black shadow-[0_0_20px_rgba(255,51,51,0.2)] hover:shadow-[0_0_30px_rgba(255,51,51,0.6)]'
                      }`}
                    >
                      {isSubmitting ? 'TRANSMITTING SIGNAL...' : 'INITIATE BEACON'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
