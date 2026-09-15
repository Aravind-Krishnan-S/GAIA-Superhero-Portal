"use client";

import React, { useState, useEffect } from "react";

export default function SystemTelemetry() {
  const [time, setTime] = useState("");
  const [ping, setPing] = useState(12);
  
  useEffect(() => {
    const updateTelemetry = () => {
      const now = new Date();
      setTime(now.toISOString().replace("T", " ").substring(0, 19) + " UTC");
    };
    
    updateTelemetry();
    const interval = setInterval(updateTelemetry, 1000);
    
    const pingInterval = setInterval(() => {
      setPing(Math.floor(Math.random() * 15) + 8);
    }, 2000);
    
    return () => {
      clearInterval(interval);
      clearInterval(pingInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden text-[10px] sm:text-xs font-mono text-[#E50914]/40 select-none">
      
      {/* Top Left Telemetry */}
      <div className="absolute top-20 left-6 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#E50914] animate-pulse" />
          <span>G.A.I.A. CORE ONLINE</span>
        </div>
        <span>UPTIME: 99.999%</span>
        <span>SYS.LATENCY: {ping}MS</span>
      </div>

      {/* Top Right Telemetry */}
      <div className="absolute top-20 right-6 flex flex-col gap-1 text-right">
        <span>{time}</span>
        <span>ORBITAL LINK: STABLE</span>
        <span className="flex items-center justify-end gap-2">
          <span>ENCRYPTION: QUANTUM</span>
          <div className="w-1.5 h-1.5 rounded-full bg-[#E50914]" />
        </span>
      </div>

      {/* Bottom Left Telemetry */}
      <div className="absolute bottom-6 left-6 flex flex-col gap-1 hidden md:flex">
        <span>SECTOR: ALPHA-7</span>
        <span>ANOMALY SCANNER: ACTIVE</span>
        <div className="w-32 h-1 bg-[#E50914]/20 mt-1 relative overflow-hidden">
          <div className="absolute top-0 left-0 h-full w-1/3 bg-[#E50914]/50 animate-[translate_2s_infinite_linear]" style={{ animationName: 'scan' }} />
        </div>
      </div>

      {/* Bottom Right Telemetry */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-1 text-right hidden md:flex">
        <span>OPERATIVE NETWORK: SYNCHRONIZED</span>
        <span>SIGINT: NOMINAL</span>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { left: -33%; }
          100% { left: 100%; }
        }
      `}</style>
    </div>
  );
}
