"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BootSequenceProps {
  onComplete: () => void;
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [isBooting, setIsBooting] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check if we've already booted in this session to prevent annoyance
    const hasBooted = sessionStorage.getItem("gaia_booted");
    if (hasBooted) {
      setIsBooting(false);
      onComplete();
      return;
    }
  }, [onComplete]);

  const handleVideoEnd = () => {
    setIsBooting(false);
    sessionStorage.setItem("gaia_booted", "true");
    onComplete();
    window.dispatchEvent(new CustomEvent("boot-complete"));
  };

  const handleSkip = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    handleVideoEnd();
  };

  const startSequence = () => {
    setIsPulsing(true);
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
    
    setTimeout(() => {
      setHasInteracted(true);
    }, 800);
  };

  if (!isBooting) return null;

  return (
    <AnimatePresence>
      {isBooting && (
        <motion.div
          key="boot-sequence"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center cursor-default"
        >
          <video
            ref={videoRef}
            src="/videos/intro_v3.mp4"
            playsInline
            onEnded={handleVideoEnd}
            className={`w-full h-full object-cover transition-opacity duration-1000 ${hasInteracted ? 'opacity-100' : 'opacity-0'}`}
          />
          
          {!hasInteracted && (
            <div className="absolute inset-0 flex items-center justify-center bg-black z-10 overflow-hidden">
              <motion.button 
                animate={isPulsing ? { scale: 1.5, opacity: 0, filter: "brightness(2)" } : {}}
                transition={{ duration: 0.4 }}
                disabled={isPulsing}
                onClick={startSequence}
                className="interactive px-8 py-4 bg-[#E50914] text-white font-mono font-bold tracking-[0.2em] hover:bg-[#c40812] transition-all rounded-md shadow-[0_0_20px_rgba(229,9,20,0.5)] cursor-pointer z-20 relative"
              >
                [ ESTABLISH CONNECTION ]
              </motion.button>
              
              {isPulsing && (
                <motion.div
                  initial={{ width: "0%", opacity: 1, scaleY: 1 }}
                  animate={{ width: "100%", opacity: 0, scaleY: 4 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute h-[2px] bg-white shadow-[0_0_40px_10px_rgba(229,9,20,1)] rounded-full z-10"
                />
              )}
            </div>
          )}

          {hasInteracted && (
            <button 
              onClick={handleSkip}
              className="absolute bottom-8 right-8 text-[#F8F9FA] border border-[#F8F9FA]/30 bg-black/50 px-4 py-2 text-xs tracking-widest hover:bg-white/10 transition-colors z-50 cursor-pointer backdrop-blur-sm rounded-md"
            >
              [SKIP]
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
