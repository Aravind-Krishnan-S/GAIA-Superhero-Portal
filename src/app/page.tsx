"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import HeroesGrid from "@/components/HeroesGrid";
import GaiaAnimation from "@/components/GaiaAnimation";
import GaiaIntelligence from "@/components/GaiaIntelligence";
import AnomalyDatabase from "@/components/AnomalyDatabase";
import { Shield, Globe, Cpu, ChevronDown, Terminal, Database, Lock } from "lucide-react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dossierExpanded, setDossierExpanded] = useState(false);
  
  // Setup Parallax for Hero Background
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

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
    <div ref={containerRef} className="relative min-h-screen text-white bg-black selection:bg-[#E50914] selection:text-black z-10 font-sans overflow-hidden cursor-none">
      
      {/* Massive Hero Section - Theatre Mode */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden border-b border-[#333333]">
        
        {/* Full-bleed Parallax Background */}
        <motion.div 
          className="absolute inset-0 z-0 pointer-events-auto"
          style={{ y: backgroundY, opacity }}
        >
          <GaiaAnimation />
        </motion.div>

        {/* Portfolio-like Data Overlay */}
        <motion.div 
          className="relative z-10 flex flex-col items-start px-8 md:px-16 w-full max-w-7xl mx-auto mt-auto mb-32"
          style={{ y: textY }}
          variants={textContainerVariant}
          initial="hidden"
          animate="show"
        >
          <div className="bg-[#141414]/60 backdrop-blur-xl border border-[#E50914]/20 p-8 max-w-3xl shadow-[0_0_50px_rgba(229,9,20,0.1)] relative rounded-2xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E50914] to-transparent opacity-80"></div>
            
            <motion.div variants={itemVariant} className="flex items-center gap-3 mb-6 font-mono text-sm tracking-widest text-[#888888]">
              <Database className="w-4 h-4 text-[#E50914]" />
              <span>CLASSIFIED PORTFOLIO // ID: GAIA-001</span>
            </motion.div>

            <motion.h1 
              variants={itemVariant}
              className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6 text-white font-mono"
            >
              Powering the Future<br/>
              <span className="text-[#E50914] drop-shadow-[0_0_15px_rgba(229,9,20,0.5)]">of G.A.I.A.</span>
            </motion.h1>
            
            <motion.div variants={itemVariant} className="flex flex-col gap-2 mb-8 font-mono text-sm text-[#cccccc] border-l-2 border-[#E50914] pl-4">
              <p>STATUS: <span className="text-white font-bold">ACTIVE</span></p>
              <p>CLEARANCE: <span className="text-red-500 font-bold">OMEGA LEVEL</span></p>
              <p>OBJECTIVE: <span className="text-white">Orchestrate advanced operatives and anomalous defense systems.</span></p>
            </motion.div>
            
            <motion.div variants={itemVariant}>
              <button 
                onClick={() => setDossierExpanded(!dossierExpanded)}
                className="group relative interactive px-8 py-4 bg-[#E50914] text-black font-mono font-black uppercase tracking-widest transition-all hover:bg-white flex items-center gap-3 overflow-hidden"
              >
                <div className="absolute inset-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.1)_50%,transparent_75%)] bg-[length:20px_20px] bg-[0_0] group-hover:animate-[stripes_1s_linear_infinite]" />
                <span className="relative z-10 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  {dossierExpanded ? "CLOSE DOSSIER" : "ACCESS FULL DOSSIER"}
                  <motion.div
                    animate={{ rotate: dossierExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </span>
              </button>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Subtle Gradient */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none"></div>
      </section>

      {/* Expandable Dossier Section */}
      <AnimatePresence>
        {dossierExpanded && (
          <motion.section
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 bg-[#0a0a0a] border-b border-[#333333] overflow-hidden origin-top"
          >
            <GaiaIntelligence />
          </motion.section>
        )}
      </AnimatePresence>

      {/* Anomaly Database Section */}
      <section className="relative z-20 w-full border-b border-[#111111]">
        <AnomalyDatabase />
      </section>

      {/* Roster Grid Section */}
      <section className="relative z-20 bg-black w-full pt-24 pb-32 cursor-none">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-7xl mx-auto px-8 md:px-16 mb-16"
        >
           <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-4 font-mono">
             Active <span className="text-[#E50914]">Roster</span>
           </h2>
           <p className="text-[#888888] font-mono text-sm">Classified profiles of our most effective operatives.</p>
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

    </div>
  );
}
