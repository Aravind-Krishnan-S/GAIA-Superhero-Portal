"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_MESSAGES = [
  "INITIALIZING GLOBAL ANOMALY NETWORK...",
  "ESTABLISHING SECURE CHANNEL...",
  "GEO-AI CORE: ONLINE",
  "PLANETARY TELEMETRY: SYNCHRONIZED",
  "G.A.I.A. CONNECTION: ESTABLISHED",
];

interface BootSequenceProps {
  onComplete: () => void;
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    // Check if we've already booted in this session to prevent annoyance
    const hasBooted = sessionStorage.getItem("gaia_booted");
    if (hasBooted) {
      setIsBooting(false);
      onComplete();
      return;
    }

    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex++;
      if (currentIndex < BOOT_MESSAGES.length) {
        setCurrentMessageIndex(currentIndex);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsBooting(false);
          sessionStorage.setItem("gaia_booted", "true");
          onComplete();
        }, 1500);
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (!isBooting) return null;

  return (
    <AnimatePresence>
      {isBooting && (
        <motion.div
          key="boot-sequence"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] text-[#E50914] font-mono cursor-none"
        >
          <div className="w-full max-w-2xl px-8 relative">
            
            {/* Terminal Window Frame */}
            <div className="border border-[#E50914]/20 p-8 relative shadow-[0_0_20px_rgba(229,9,20,0.1)]">
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#E50914]" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#E50914]" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#E50914]" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#E50914]" />
              
              <div className="flex items-center gap-4 mb-8 border-b border-[#E50914]/20 pb-4">
                <div className="w-3 h-3 bg-[#E50914] animate-pulse shadow-[0_0_8px_#E50914]" />
                <span className="text-sm tracking-widest opacity-80">G.A.I.A. TERMINAL V4.2</span>
              </div>
              
              <div className="space-y-4">
                {BOOT_MESSAGES.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: idx <= currentMessageIndex ? 1 : 0,
                      x: idx <= currentMessageIndex ? 0 : -20 
                    }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-3 text-sm md:text-base tracking-widest drop-shadow-[0_0_5px_rgba(229,9,20,0.5)]"
                  >
                    <span className="opacity-50">&gt;</span>
                    <span className={idx === currentMessageIndex ? "animate-pulse" : ""}>
                      {msg}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
            
          </div>
          
          <div className="absolute bottom-10 text-xs opacity-30 tracking-widest">
            AUTHORIZED PERSONNEL ONLY
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
