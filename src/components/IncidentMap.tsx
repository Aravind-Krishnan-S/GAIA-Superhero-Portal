"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from '@emailjs/browser';

// Dynamically import the map to avoid SSR issues with Leaflet window object
const MapComponent = dynamic(() => import("./MapComponent"), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] flex items-center justify-center bg-slate-900 border border-slate-700 rounded-sm">
      <div className="text-amber-500 animate-pulse font-bold font-mono tracking-widest">[ INITIALIZING UPLINK... ]</div>
    </div>
  )
});

export type Incident = {
  id: number;
  lat: number;
  lng: number;
  title: string;
  description: string;
  severity: string;
  timestamp: string;
};

export default function IncidentMap() {
  const [beacon, setBeacon] = useState<{lat: number, lng: number} | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [incidentDetails, setIncidentDetails] = useState({ title: '', description: '', severity: 'Low' });

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('gaia_incidents');
    if (saved) {
      setIncidents(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage whenever incidents change
  useEffect(() => {
    if (incidents.length > 0) {
      localStorage.setItem('gaia_incidents', JSON.stringify(incidents));
    }
  }, [incidents]);

  const handleMapClick = (latlng: {lat: number, lng: number}) => {
    setBeacon(latlng);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setBeacon(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!beacon) return;

    const newMarker: Incident = {
      id: Date.now(),
      lat: beacon.lat,
      lng: beacon.lng,
      title: incidentDetails.title,
      description: incidentDetails.description,
      severity: incidentDetails.severity,
      timestamp: new Date().toLocaleString(),
    };

    setIncidents([...incidents, newMarker]);
    
    // Send email via EmailJS
    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

      if (serviceId && templateId && publicKey) {
        const emailData = {
          title: incidentDetails.title,
          description: incidentDetails.description,
          severity: incidentDetails.severity,
          location: `LAT: ${beacon.lat.toFixed(4)}, LNG: ${beacon.lng.toFixed(4)}`,
          // Add default name/email since map doesn't collect them, but template might expect them
          name: "Anonymous Operative",
          email: "classified@gaia.gov",
          user_name: "Anonymous Operative",
          user_email: "classified@gaia.gov",
          to_email: "classified@gaia.gov",
          reply_to: "classified@gaia.gov",
          recipient_email: "classified@gaia.gov",
          grievance: incidentDetails.description
        };
        await emailjs.send(serviceId, templateId, emailData, publicKey);
        console.log("Map incident report sent via EmailJS");
      }
    } catch (error) {
      console.error("EmailJS Error in IncidentMap:", error);
    }

    closeForm();
    setIncidentDetails({ title: '', description: '', severity: 'Low' });
  };

  return (
    <section id="incident-map" className="relative w-full min-h-[800px] py-20 px-4 md:px-12 z-10 flex flex-col items-center bg-slate-900 border-t border-slate-800">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-widest font-mono">
          <span className="text-[#F8F9FA]">Global</span> <span className="text-amber-500">Surveillance</span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto font-mono text-sm tracking-widest">
          [ DEPLOY DISTRESS BEACON ON GRID. TACTICAL TEAMS ON STANDBY. ]
        </p>
      </div>

      <div className="relative w-full max-w-7xl h-[600px] rounded-sm overflow-hidden border border-slate-700 shadow-[0_0_30px_rgba(245,158,11,0.1)]">
        <MapComponent onMapClick={handleMapClick} beacon={beacon} incidents={incidents} />

        {/* Sliding Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div 
              className="absolute top-0 right-0 h-full w-full md:w-96 bg-slate-800/95 backdrop-blur-md z-[1000] p-8 border-l border-amber-500/50 shadow-2xl flex flex-col justify-between font-mono"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div>
                <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-4">
                  <h3 className="text-2xl font-bold text-[#F8F9FA] tracking-widest">FILE REPORT</h3>
                  <button onClick={closeForm} className="text-slate-400 hover:text-red-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>
                </div>
                
                {beacon && (
                  <div className="mb-6 p-3 bg-slate-900 border border-slate-700 text-xs font-mono text-amber-500 tracking-widest shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                    COORD: {beacon.lat.toFixed(4)}, {beacon.lng.toFixed(4)}
                  </div>
                )}

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs uppercase tracking-widest text-slate-400 font-bold">Anomaly Classification</label>
                    <input 
                      type="text" 
                      className="bg-slate-900 border border-slate-700 rounded-sm p-2 text-[#F8F9FA] focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-sans" 
                      placeholder="e.g. Unknown Entity" 
                      required
                      value={incidentDetails.title}
                      onChange={(e) => setIncidentDetails({...incidentDetails, title: e.target.value})}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs uppercase tracking-widest text-slate-400 font-bold">Situation Details</label>
                    <textarea 
                      className="bg-slate-900 border border-slate-700 rounded-sm p-2 text-[#F8F9FA] focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all resize-none font-sans" 
                      placeholder="Provide situation details..." 
                      rows={3}
                      required
                      value={incidentDetails.description}
                      onChange={(e) => setIncidentDetails({...incidentDetails, description: e.target.value})}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs uppercase tracking-widest text-slate-400 font-bold">Threat Severity</label>
                    <select 
                      className="bg-slate-900 border border-slate-700 rounded-sm p-2 text-[#F8F9FA] focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                      value={incidentDetails.severity}
                      onChange={(e) => setIncidentDetails({...incidentDetails, severity: e.target.value})}
                    >
                      <option value="Low">SEVERITY: LOW</option>
                      <option value="Elevated">SEVERITY: ELEVATED</option>
                      <option value="Critical">SEVERITY: CRITICAL</option>
                    </select>
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-3 mt-4 bg-red-600 hover:bg-red-500 text-[#F8F9FA] font-bold tracking-widest rounded-sm transition-all shadow-[0_0_15px_rgba(220,38,38,0.4)] hover:shadow-[0_0_20px_rgba(220,38,38,0.6)] border border-red-400"
                  >
                    DEPLOY BEACON
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
