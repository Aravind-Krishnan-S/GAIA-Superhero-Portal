"use client";

import { useState } from "react";
import DistressProtocol from "./DistressProtocol";
import { Terminal } from "lucide-react";

export default function TopNavigation() {
  const [isDistressModalOpen, setIsDistressModalOpen] = useState(false);

  const navItems = ["PLANET", "OPERATIVES", "ANOMALIES", "INTELLIGENCE", "ARCHIVE"];

  return (
    <>
      <header className="fixed top-0 w-full z-50 pointer-events-none px-6 py-4 flex justify-between items-start font-mono">
        {/* Cybernetic Underglow HUD effect */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E50914] to-transparent shadow-[0_0_20px_rgba(229,9,20,0.8)] opacity-70" />
        <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-[#E50914]/10 to-transparent pointer-events-none" />

        {/* Left: Branding & Navigation */}
        <div className="flex flex-col gap-4 pointer-events-auto relative z-10">
          {/* Logo / Branding */}
          <div className="flex items-center gap-2 text-[#E50914] drop-shadow-[0_0_8px_rgba(229,9,20,0.8)]">
            <Terminal size={24} />
            <div className="flex flex-col">
              <span className="font-bold tracking-[0.2em] text-lg leading-none">G.A.I.A.</span>
              <span className="text-[8px] tracking-widest opacity-80">GLOBAL ANOMALY INVESTIGATION</span>
            </div>
          </div>

          {/* Minimal Navigation */}
          <nav className="hidden md:flex flex-col gap-2 border-l border-[#E50914]/30 pl-4 ml-4">
            {navItems.map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-[#F8F9FA] hover:text-[#E50914] hover:drop-shadow-[0_0_5px_rgba(229,9,20,0.8)] text-xs font-semibold tracking-widest transition-all uppercase flex items-center gap-2 group interactive"
                data-hover={`[ACCESS ${item}]`}
              >
                <span className="opacity-0 group-hover:opacity-100 text-[#E50914] transition-opacity">&gt;</span>
                [{item}]
              </a>
            ))}
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex flex-col items-end gap-3 pointer-events-auto relative z-10">
          {/* Contact GAIA */}
          <button 
            onClick={() => window.dispatchEvent(new Event("open-contact-gaia"))}
            className="interactive px-4 py-1.5 bg-[#050505]/80 backdrop-blur-md border border-[#E50914]/50 text-[#E50914] text-xs tracking-widest hover:bg-[#E50914]/20 hover:border-[#E50914] transition-all flex items-center gap-2 shadow-[0_0_10px_rgba(229,9,20,0.2)] hover:shadow-[0_0_15px_rgba(229,9,20,0.5)]"
          >
            <div className="w-1.5 h-1.5 bg-[#E50914] rounded-full animate-pulse shadow-[0_0_5px_#E50914]" />
            [CONTACT G.A.I.A.]
          </button>
          
          {/* Transmit Distress */}
          <button 
            onClick={() => setIsDistressModalOpen(true)}
            className="interactive px-4 py-1.5 bg-[#050505]/80 backdrop-blur-md border border-[#E50914]/50 text-[#E50914] text-xs tracking-widest hover:bg-[#E50914]/20 hover:border-[#E50914] transition-all flex items-center gap-2 shadow-[0_0_10px_rgba(229, 9, 20,0.2)] hover:shadow-[0_0_15px_rgba(229, 9, 20,0.5)]"
          >
            <div className="w-1.5 h-1.5 bg-[#E50914] rounded-full shadow-[0_0_5px_#E50914]" />
            [TRANSMIT DISTRESS]
          </button>
        </div>
      </header>

      {/* Mount the distress protocol at the root level */}
      <DistressProtocol 
        isOpen={isDistressModalOpen} 
        onClose={() => setIsDistressModalOpen(false)} 
      />
    </>
  );
}
