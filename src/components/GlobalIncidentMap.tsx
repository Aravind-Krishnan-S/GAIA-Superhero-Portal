"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Activity, ShieldAlert, Crosshair } from "lucide-react";

const incidents = [
  { id: "INC-9482", lat: 35.6762, lng: 139.6503, type: "ANOMALY", status: "ACTIVE", location: "TOKYO SECTOR" },
  { id: "INC-9483", lat: 40.7128, lng: -74.0060, type: "DISTRESS", status: "RESPONDING", location: "NEW YORK SECTOR" },
  { id: "INC-9484", lat: 51.5074, lng: -0.1278, type: "OPERATIVE", status: "ENGAGED", location: "LONDON SECTOR" },
  { id: "INC-9485", lat: -23.5505, lng: -46.6333, type: "ANOMALY", status: "CONTAINED", location: "SAO PAULO SECTOR" },
];

export default function GlobalIncidentMap() {
  const [selectedIncident, setSelectedIncident] = useState<typeof incidents[0] | null>(null);

  // Helper to convert Lat/Lng to SVG coordinates (simple equirectangular projection)
  const getXY = (lat: number, lng: number) => {
    const x = (lng + 180) * (1000 / 360);
    const y = (90 - lat) * (500 / 180);
    return { x, y };
  };

  return (
    <div className="w-full h-full min-h-[600px] relative bg-[#000000] border border-[#E50914]/20 overflow-hidden flex flex-col font-mono text-sm group">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(229,9,20,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(229,9,20,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      {/* Scanline */}
      <motion.div 
        animate={{ top: ["0%", "100%", "0%"] }} 
        transition={{ duration: 8, ease: "linear", repeat: Infinity }}
        className="absolute left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#E50914]/10 to-transparent pointer-events-none border-b border-[#E50914]/30 z-10"
      />

      {/* Map Header */}
      <div className="p-6 border-b border-[#E50914]/20 flex justify-between items-center z-20 bg-[#1F1F1F]/80 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <Crosshair className="text-[#E50914] w-5 h-5 animate-spin-slow" />
          <h2 className="text-[#E50914] font-bold tracking-widest text-lg drop-shadow-[0_0_5px_rgba(229,9,20,0.5)]">GLOBAL INCIDENT TACTICAL MAP</h2>
        </div>
        <div className="flex gap-6 text-[10px] tracking-widest">
          <div className="flex items-center gap-2"><div className="w-2 h-2 bg-[#ff3333]" /> DISTRESS (1)</div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 bg-[#ffb000]" /> ANOMALY (2)</div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 bg-[#E50914]" /> OPERATIVE (1)</div>
        </div>
      </div>

      {/* SVG Map Area */}
      <div className="relative flex-1 w-full flex items-center justify-center p-8 z-20 interactive" data-hover="[INTERACT: TACTICAL MAP]">
        <svg viewBox="0 0 1000 500" className="w-full max-w-5xl h-auto opacity-40">
          {/* Simple world map path representation (abstract/stylized for cinematic feel) */}
          <path 
            d="M 150 100 Q 250 80 300 150 T 400 200 T 350 300 T 250 350 T 150 250 Z M 450 80 Q 550 50 650 100 T 700 250 T 600 350 T 500 250 Z M 750 150 Q 850 100 950 200 T 900 350 T 800 300 Z" 
            fill="none" 
            stroke="#E50914" 
            strokeWidth="1" 
            className="opacity-30" 
            strokeDasharray="4 4"
          />
          <path 
            d="M 200 400 Q 250 450 300 400 Z M 600 400 Q 700 450 800 400 Z" 
            fill="none" 
            stroke="#E50914" 
            strokeWidth="0.5" 
            className="opacity-20"
          />

          {/* Render Incidents on Map */}
          {incidents.map(inc => {
            const { x, y } = getXY(inc.lat, inc.lng);
            const color = inc.type === 'DISTRESS' ? '#ff3333' : inc.type === 'ANOMALY' ? '#ffb000' : '#E50914';
            
            return (
              <g 
                key={inc.id} 
                className="cursor-pointer transition-all duration-300 hover:opacity-80"
                onClick={() => setSelectedIncident(inc)}
                onMouseEnter={() => !selectedIncident && setSelectedIncident(inc)}
              >
                <circle cx={x} cy={y} r="20" fill={color} opacity="0.1" className="animate-ping" />
                <circle cx={x} cy={y} r="8" fill="transparent" stroke={color} strokeWidth="1" />
                <circle cx={x} cy={y} r="3" fill={color} />
                <line x1={x} y1={y-12} x2={x} y2={y+12} stroke={color} strokeWidth="0.5" opacity="0.5" />
                <line x1={x-12} y1={y} x2={x+12} y2={y} stroke={color} strokeWidth="0.5" opacity="0.5" />
              </g>
            );
          })}
        </svg>

        {/* Selected Incident Intelligence Panel */}
        <AnimatePresence>
          {selectedIncident && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute right-8 top-8 w-80 bg-[#1F1F1F]/90 border border-[#E50914]/30 backdrop-blur-md p-6 shadow-[0_0_30px_rgba(0,0,0,0.8)]"
            >
              <div className="flex justify-between items-start mb-4 border-b border-[#E50914]/20 pb-4">
                <div>
                  <h3 className="text-[#E50914] font-bold text-lg">{selectedIncident.id}</h3>
                  <div className="text-[10px] text-[#888888]">CLASSIFIED INTELLIGENCE REPORT</div>
                </div>
                <button onClick={() => setSelectedIncident(null)} className="text-[#E50914] hover:text-white">[X]</button>
              </div>
              
              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-[#555555]">CLASSIFICATION:</span><br/>
                  <span style={{ color: selectedIncident.type === 'DISTRESS' ? '#ff3333' : selectedIncident.type === 'ANOMALY' ? '#ffb000' : '#E50914' }}>
                    {selectedIncident.type}
                  </span>
                </div>
                <div>
                  <span className="text-[#555555]">LOCATION:</span><br/>
                  <span className="text-[#cccccc]">{selectedIncident.location}</span>
                </div>
                <div>
                  <span className="text-[#555555]">COORDINATES:</span><br/>
                  <span className="text-[#cccccc]">{selectedIncident.lat.toFixed(4)}, {selectedIncident.lng.toFixed(4)}</span>
                </div>
                <div>
                  <span className="text-[#555555]">STATUS:</span><br/>
                  <span className="text-[#cccccc]">{selectedIncident.status}</span>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E50914]/20">
                  <button className="w-full py-2 bg-[#E50914]/10 border border-[#E50914]/30 text-[#E50914] hover:bg-[#E50914] hover:text-black transition-all interactive" data-hover="[DISPATCH ASSETS]">
                    DISPATCH ASSETS
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
