"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import DistressProtocol from "./DistressProtocol";
import { Volume2, VolumeX } from "lucide-react";

export default function TopNavigation() {
  const [isDistressModalOpen, setIsDistressModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const handleAudioState = (e: any) => {
      setIsMuted(e.detail.muted);
    };
    window.addEventListener("audio-state-change", handleAudioState);
    return () => window.removeEventListener("audio-state-change", handleAudioState);
  }, []);

  const toggleAudio = () => {
    window.dispatchEvent(new CustomEvent("toggle-global-audio"));
  };


  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 flex flex-col">
        <header className="w-full bg-[#050505]/95 backdrop-blur-md border-b border-[#E50914]/30 px-6 py-3 flex justify-between items-center font-mono shadow-[0_4px_20px_rgba(0,0,0,0.5)] relative">
          {/* Cybernetic Underglow HUD effect */}
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#E50914] to-transparent shadow-[0_0_15px_rgba(229,9,20,0.8)] opacity-70" />

          {/* Left: Branding & Navigation */}
          <div className="flex flex-col gap-4 pointer-events-auto relative z-10">
            {/* Logo / Branding */}
            <Link href="/" className="interactive flex items-center gap-3 text-[#E50914] hover:opacity-80 transition-opacity select-none">
              <img src="/gaia-logo.jpg" alt="G.A.I.A. Logo" className="w-12 h-12 object-cover rounded-md mix-blend-screen" />
              <div className="flex flex-col drop-shadow-[0_0_8px_rgba(229,9,20,0.8)]">
                <span className="font-bold tracking-[0.2em] text-lg leading-none">G.A.I.A.</span>
                <span className="text-[8px] tracking-widest opacity-80">GLOBAL ANOMALY INVESTIGATION</span>
              </div>
            </Link>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-4 pointer-events-auto relative z-10">
            {/* Audio Toggle */}
            <button 
              onClick={toggleAudio}
              className="interactive p-2 bg-[#E50914] text-white rounded-md hover:bg-[#c40812] transition-colors shadow-md flex items-center justify-center"
              aria-label="Toggle Audio"
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>

            {/* About GAIA */}
            <Link 
              href="/about"
              className="interactive px-4 py-2 bg-[#E50914] text-white font-bold text-sm rounded-md hover:bg-[#c40812] transition-colors shadow-md flex items-center justify-center"
            >
              [ABOUT G.A.I.A.]
            </Link>

            {/* Contact GAIA */}
            <Link 
              href="/contact"
              className="interactive px-4 py-2 bg-[#E50914] text-white font-bold text-sm rounded-md hover:bg-[#c40812] transition-colors shadow-md flex items-center justify-center"
            >
              [AUTOBOT]
            </Link>
            
            {/* Transmit Distress */}
            <button 
              onClick={() => setIsDistressModalOpen(true)}
              className="interactive px-4 py-2 bg-[#E50914] text-white font-bold text-sm rounded-md hover:bg-[#c40812] transition-colors shadow-md flex items-center justify-center"
            >
              [TRANSMIT DISTRESS]
            </button>
          </div>
        </header>
      </div>

      {/* Mount the distress protocol at the root level */}
      <DistressProtocol 
        isOpen={isDistressModalOpen} 
        onClose={() => setIsDistressModalOpen(false)} 
      />
    </>
  );
}
