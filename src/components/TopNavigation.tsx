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
        
        {/* Left: Branding & Navigation */}
        <div className="flex flex-col gap-4 pointer-events-auto">


          {/* Minimal Navigation */}
          <nav className="hidden md:flex flex-col gap-2 border-l border-[#E50914]/20 pl-4 ml-4">
            {navItems.map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-[#888888] hover:text-[#E50914] text-xs font-semibold tracking-widest transition-all uppercase flex items-center gap-2 group interactive"
                data-hover={`[ACCESS ${item}]`}
              >
                <span className="opacity-0 group-hover:opacity-100 text-[#E50914] transition-opacity">&gt;</span>
                [{item}]
              </a>
            ))}
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex flex-col items-end gap-3 pointer-events-auto">
          {/* Contact GAIA */}
          <button 
            onClick={() => window.dispatchEvent(new Event("open-contact-gaia"))}
            className="interactive px-4 py-1.5 bg-transparent border border-[#E50914]/30 text-[#E50914] text-xs tracking-widest hover:bg-[#E50914]/10 hover:border-[#E50914] transition-all flex items-center gap-2"
          >
            <div className="w-1.5 h-1.5 bg-[#E50914] rounded-full animate-pulse" />
            [CONTACT G.A.I.A.]
          </button>
          
          {/* Transmit Distress */}
          <button 
            onClick={() => setIsDistressModalOpen(true)}
            className="interactive px-4 py-1.5 bg-transparent border border-[#ff3333]/30 text-[#ff3333] text-xs tracking-widest hover:bg-[#ff3333]/20 hover:border-[#ff3333] transition-all flex items-center gap-2"
          >
            <div className="w-1.5 h-1.5 bg-[#ff3333] rounded-full" />
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
