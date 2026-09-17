"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from "framer-motion";
import HeroesGrid from "@/components/HeroesGrid";
import StarWarsCrawl from "@/components/StarWarsCrawl";
import CyberpunkCityscape from "@/components/CyberpunkCityscape";
import BootSequence from "@/components/BootSequence";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isBooted, setIsBooted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  useEffect(() => {
    // If already booted in session, skip animation
    if (sessionStorage.getItem("gaia_booted")) {
      setIsBooted(true);
    }
  }, []);

  useEffect(() => {
    if (isBooted && audioRef.current && !isMuted) {
      audioRef.current.play().catch(e => console.log("Audio play blocked", e));
    }
  }, [isBooted, isMuted]);

  useEffect(() => {
    const handleToggleAudio = () => {
      if (audioRef.current) {
        if (audioRef.current.paused || isMuted) {
          audioRef.current.play().catch(e => console.log("Audio play blocked", e));
          setIsMuted(false);
          window.dispatchEvent(new CustomEvent("audio-state-change", { detail: { muted: false } }));
        } else {
          audioRef.current.pause();
          setIsMuted(true);
          window.dispatchEvent(new CustomEvent("audio-state-change", { detail: { muted: true } }));
        }
      }
    };
    window.addEventListener("toggle-global-audio", handleToggleAudio);
    return () => window.removeEventListener("toggle-global-audio", handleToggleAudio);
  }, [isMuted]);

  // Setup Parallax for Hero Background
  const { scrollY } = useScroll();

  const backgroundY = useTransform(scrollY, [0, 800], ["0%", "50%"]);
  // Fade out opacity by 600px of scroll
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  useMotionValueEvent(opacity, "change", (latest) => {
    if (audioRef.current && !isMuted) {
      audioRef.current.volume = Math.max(0, Math.min(1, latest));
    }
  });

  // Staggered Text Animation
  const textContainerVariant: any = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariant: any = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <>
      <audio ref={audioRef} src="/audio/imperial_march.mp3" loop />
      <BootSequence onComplete={() => setIsBooted(true)} />
      
      <AnimatePresence>
        {isBooted && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            ref={containerRef} 
            className="relative min-h-screen text-[#F8F9FA] bg-[#050505] selection:bg-[#E50914] selection:text-[#050505] z-10 font-sans overflow-x-hidden cursor-none"
          >
            
            {/* Massive Hero Section - Theatre Mode */}
            <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden border-b border-[#050505]">
              
              {/* Full-bleed Parallax Background */}
              <motion.div 
                className="absolute inset-0 z-0 pointer-events-auto"
                style={{ y: backgroundY, opacity }}
              >
                <CyberpunkCityscape />
              </motion.div>

              {/* Star Wars Crawl Animation in Background */}
              <div className="absolute inset-0 z-[5]">
                <StarWarsCrawl />
              </div>
            </section>
            
            {/* Roster Grid Section */}
            <section className="relative z-20 bg-[#050505] w-full pt-24 pb-32 cursor-none">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-7xl mx-auto px-8 md:px-16 mb-16"
              >
                 <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#F8F9FA] mb-4 font-mono">
                   Hero <span className="text-[#E50914]">Roster</span>
                 </h2>
                 <p className="text-[#F8F9FA] font-mono text-sm">Classified profiles of our most effective operatives.</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: 0.2 }}
                className="interactive"
              >
                <HeroesGrid />
              </motion.div>
            </section>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
