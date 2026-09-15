"use client";

import { motion } from "framer-motion";
import { AlertTriangle, MapPin, Search } from "lucide-react";

export default function AnomalyDatabase() {
  const anomalies = [
    {
      id: "ANOM-773",
      location: "New York, USA",
      type: "Dimensional Rift",
      threat: "ALPHA",
      status: "CONTAINED"
    },
    {
      id: "ANOM-219",
      location: "Tunguska, Siberia",
      type: "Energy Spike",
      threat: "OMEGA",
      status: "UNRESOLVED"
    },
    {
      id: "ANOM-904",
      location: "Bermuda Triangle",
      type: "Spatial Distortion",
      threat: "BETA",
      status: "MONITORING"
    },
    {
      id: "ANOM-441",
      location: "Mariana Trench",
      type: "Source Entity",
      threat: "OMEGA",
      status: "CLASSIFIED"
    }
  ];

  return (
    <div className="w-full bg-black font-mono py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-widest text-white uppercase mb-2">
              ANOMALY <span className="text-[#E50914]">DATABASE</span>
            </h2>
            <p className="text-[#888888] text-sm tracking-widest">
              GLOBAL MONITORING INCIDENTS // ACTIVE THREATS
            </p>
          </div>
          
          <div className="flex items-center gap-4 bg-[#1F1F1F] border border-[#E50914]/30 p-2">
            <Search className="w-4 h-4 text-[#E50914]" />
            <input 
              type="text" 
              placeholder="QUERY DATABASE..." 
              className="bg-transparent border-none outline-none text-[#E50914] text-xs tracking-widest placeholder:text-[#E50914]/50 w-48"
              readOnly
            />
          </div>
        </div>

        {/* Database Table */}
        <div className="w-full overflow-x-auto border border-[#333333] bg-[#141414]/50 backdrop-blur-md">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#333333] bg-[#000000]">
                <th className="py-4 px-6 text-[#888888] text-xs tracking-widest font-normal">INCIDENT ID</th>
                <th className="py-4 px-6 text-[#888888] text-xs tracking-widest font-normal">LOCATION</th>
                <th className="py-4 px-6 text-[#888888] text-xs tracking-widest font-normal">CLASSIFICATION</th>
                <th className="py-4 px-6 text-[#888888] text-xs tracking-widest font-normal">THREAT</th>
                <th className="py-4 px-6 text-[#888888] text-xs tracking-widest font-normal">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {anomalies.map((anom, idx) => (
                <motion.tr 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="border-b border-[#333333]/50 hover:bg-[#E50914]/5 transition-colors group interactive"
                >
                  <td className="py-4 px-6">
                    <span className="text-[#E50914] text-sm font-bold tracking-widest">{anom.id}</span>
                  </td>
                  <td className="py-4 px-6 text-white text-sm tracking-widest flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-[#555555] group-hover:text-[#E50914]" />
                    {anom.location}
                  </td>
                  <td className="py-4 px-6 text-[#cccccc] text-sm tracking-widest">
                    {anom.type}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 text-[10px] tracking-widest font-bold ${
                      anom.threat === "OMEGA" ? "bg-[#ff3333]/20 text-[#ff3333] border border-[#ff3333]/30" :
                      anom.threat === "ALPHA" ? "bg-amber-500/20 text-amber-500 border border-amber-500/30" :
                      "bg-[#E50914]/20 text-[#E50914] border border-[#E50914]/30"
                    }`}>
                      {anom.threat}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        anom.status === "UNRESOLVED" ? "bg-[#ff3333] animate-pulse" :
                        anom.status === "CLASSIFIED" ? "bg-purple-500" :
                        "bg-[#E50914]"
                      }`} />
                      <span className="text-white text-xs tracking-widest">{anom.status}</span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Warning Banner */}
        <div className="mt-8 border border-[#ff3333]/30 bg-[#ff3333]/5 p-4 flex items-center justify-center gap-3">
          <AlertTriangle className="w-4 h-4 text-[#ff3333]" />
          <span className="text-[#ff3333] text-xs tracking-widest uppercase">
            UNAUTHORIZED ACCESS WILL BE LOGGED. THIS TERMINAL IS MONITORED.
          </span>
        </div>

      </div>
    </div>
  );
}
