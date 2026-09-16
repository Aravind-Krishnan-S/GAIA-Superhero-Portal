"use client";

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { Hero } from "@/data/heroes";
import { X, Fingerprint, Activity, Terminal } from "lucide-react";
import SkillsPanel from "./SkillsPanel";

interface DossierTheatreProps {
  hero: Hero | null;
  onClose: () => void;
}

// Scramble Text Component for Data Reveal
const ScrambleText = ({ text, delay = 0 }: { text: string, delay?: number }) => {
  const [displayText, setDisplayText] = useState("");
  useEffect(() => {
    let iteration = 0;
    let interval: any = null;
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    
    const startTimeout = setTimeout(() => {
      interval = setInterval(() => {
        setDisplayText(text.split("").map((letter, index) => {
          if (index < iteration) {
            return text[index];
          }
          if (letter === " ") return " ";
          return letters[Math.floor(Math.random() * letters.length)];
        }).join(""));
        
        if (iteration >= text.length) {
          clearInterval(interval);
          setDisplayText(text);
        }
        
        iteration += 1; // Controls speed of reveal
      }, 30);
    }, delay * 1000);
    
    return () => {
      clearTimeout(startTimeout);
      clearInterval(interval);
    };
  }, [text, delay]);
  
  return <>{displayText || text.replace(/[^\s]/g, '_')}</>;
};

export default function DossierTheatre({ hero, onClose }: DossierTheatreProps) {
  const [activeTab, setActiveTab] = useState<"INTEL" | "COMBAT" | "TIMELINE">("INTEL");
  const [mounted, setMounted] = useState(false);

  // Parallax Setup for Holographic Image
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (hero) {
      document.body.style.overflow = 'hidden';
      setActiveTab("INTEL");
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [hero]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {hero && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 font-mono text-[#E50914]">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#050505]/90 backdrop-blur-lg"
          />

          {/* Dossier Container - Holographic Materialization */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, clipPath: "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)" }}
            animate={{ opacity: 1, scale: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
            exit={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={`relative w-full h-full md:max-w-[90vw] md:h-[90vh] bg-[#050505] border overflow-hidden flex flex-col md:flex-row z-10 animate-[glitchContainer_0.4s_ease-out] ${
              hero.isClassified ? "border-[#E50914]/50 shadow-[0_0_50px_rgba(229, 9, 20,0.15)]" : "border-[#E50914]/50 shadow-[0_0_50px_rgba(229,9,20,0.15)]"
            }`}
          >
            {/* Scanline Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#E50914]/5 to-transparent animate-[translate_3s_infinite_linear] pointer-events-none z-50" style={{ animationName: 'scanVertical' }} />
            
            {/* Holographic grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(229,9,20,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(229,9,20,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

            {/* Close Button */}
            <button 
              onClick={onClose}
              className={`absolute top-6 right-6 z-50 p-2 border bg-[#050505]/80 backdrop-blur-md transition-colors interactive ${
                hero.isClassified ? "border-[#E50914]/50 hover:bg-[#E50914] hover:text-[#050505] text-[#E50914]" : "border-[#E50914]/50 hover:bg-[#E50914] hover:text-[#050505] text-[#E50914]"
              }`}
            >
              <X size={20} />
            </button>

            {/* Left Side: Subject Image & Vitals */}
            <div 
              className="w-full md:w-1/3 h-[40vh] md:h-full relative border-b md:border-b-0 md:border-r border-inherit bg-[#050505] flex-shrink-0 overflow-hidden"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ perspective: 1000 }}
            >
              <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 pointer-events-none">
                <div className={`px-2 py-1 text-[10px] tracking-widest border backdrop-blur-md inline-block ${
                  hero.isClassified ? "bg-[#E50914]/20 border-[#E50914] text-[#E50914]" : "bg-[#E50914]/20 border-[#E50914] text-[#E50914]"
                }`}>
                  FILE: <ScrambleText text={hero.id} delay={0.2} />
                </div>
                {hero.isClassified && (
                  <div className="px-2 py-1 text-[10px] tracking-widest bg-[#E50914] text-[#050505] font-bold uppercase inline-block animate-[pulse_1s_infinite]">
                    RESTRICTED ACCESS
                  </div>
                )}
              </div>

              {hero.image ? (
                <motion.div 
                  className="absolute inset-0"
                  style={{ rotateX, rotateY }}
                  transition={{ type: "spring", stiffness: 100, damping: 30 }}
                >
                  <Image 
                    src={hero.image} 
                    alt={hero.name} 
                    fill 
                    unoptimized={true}
                    style={{ objectPosition: hero.imagePosition || "top" }}
                    className={`object-cover ${hero.isClassified ? 'opacity-90 mix-blend-screen sepia-[0.5] hue-rotate-[-50deg]' : 'opacity-100 mix-blend-screen grayscale-[0.2]'}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#050505]" />
                  {/* Holographic glow on image */}
                  <div className="absolute inset-0 bg-[#E50914]/10 mix-blend-overlay"></div>
                </motion.div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-30">
                  <Fingerprint size={64} className="mb-4" />
                  <p className="text-[10px] tracking-widest uppercase">BIOMETRIC DATA MISSING</p>
                </div>
              )}

              {/* Vitals Overlay */}
              <div className="absolute bottom-4 left-4 right-4 z-20">
                <div className={`p-4 border backdrop-blur-md bg-[#050505]/80 ${
                  hero.isClassified ? "border-[#E50914]/30" : "border-[#E50914]/30"
                }`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] text-[#F8F9FA] tracking-widest">SUBJECT STATUS</span>
                    <span className={`text-[10px] tracking-widest font-bold ${hero.isClassified ? "text-[#E50914]" : "text-[#E50914]"}`}>
                      <ScrambleText text={hero.isClassified ? "REDACTED" : "ACTIVE"} delay={0.4} />
                    </span>
                  </div>
                  <div className="w-full h-1 bg-[#1A1A1A] overflow-hidden">
                    <div className={`h-full animate-[pulse_2s_infinite] ${hero.isClassified ? "bg-[#E50914] w-1/3" : "bg-[#E50914] w-full"}`} />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Data Modules */}
            <div className="w-full md:w-2/3 flex flex-col h-[60vh] md:h-full bg-transparent z-10 relative">
              {/* Tab Navigation */}
              <div className={`flex border-b bg-[#050505]/90 backdrop-blur-md ${hero.isClassified ? "border-[#E50914]/30" : "border-[#E50914]/30"}`}>
                {["INTEL", "COMBAT", "TIMELINE"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`flex-1 py-4 text-xs tracking-widest transition-colors interactive ${
                      activeTab === tab 
                        ? (hero.isClassified ? "bg-[#E50914]/10 text-[#E50914] border-b-2 border-[#E50914]" : "bg-[#E50914]/10 text-[#E50914] border-b-2 border-[#E50914]") 
                        : "text-[#F8F9FA] hover:bg-white/5"
                    }`}
                  >
                    [{tab}]
                  </button>
                ))}
              </div>

              {/* Content Area */}
              <div className="flex-1 p-6 md:p-10 overflow-y-auto custom-scrollbar bg-[#050505]/50">
                
                {activeTab === "INTEL" && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <div className="mb-8">
                      <h2 className={`text-4xl md:text-5xl font-bold uppercase tracking-widest mb-2 drop-shadow-[0_0_15px_rgba(229,9,20,0.4)] ${hero.isClassified ? "text-[#E50914] drop-shadow-[0_0_15px_rgba(229, 9, 20,0.4)]" : "text-[#E50914]"}`}>
                        <ScrambleText text={hero.isClassified ? '[DATA EXPUNGED]' : hero.name} delay={0.1} />
                      </h2>
                      <div className="text-xs text-[#F8F9FA] tracking-widest flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                        <span>DESIGNATION: <ScrambleText text={hero.role} delay={0.3} /></span>
                        <span className="hidden md:inline">|</span>
                        <span>CLEARANCE: <ScrambleText text={hero.rank} delay={0.4} /></span>
                      </div>
                    </div>

                    <div className="space-y-8">
                      <section>
                        <h3 className="text-[10px] text-[#F8F9FA] tracking-widest mb-3 border-b border-inherit pb-1 flex items-center gap-2">
                          <Terminal size={12} className={hero.isClassified ? "text-[#E50914]" : "text-[#E50914]"} /> BACKGROUND_ASSESSMENT
                        </h3>
                        <p className="text-sm leading-relaxed text-[#F8F9FA] tracking-wide text-justify">
                          <ScrambleText text={hero.backstory} delay={0.5} />
                        </p>
                      </section>

                      <section>
                        <h3 className="text-[10px] text-[#F8F9FA] tracking-widest mb-3 border-b border-inherit pb-1 flex items-center gap-2">
                          <Activity size={12} className={hero.isClassified ? "text-[#E50914]" : "text-[#E50914]"} /> ANOMALOUS_ABILITIES
                        </h3>
                        <p className="text-sm leading-relaxed text-[#F8F9FA] tracking-wide text-justify">
                          <ScrambleText text={hero.powerSystem} delay={0.7} />
                        </p>
                      </section>
                    </div>
                  </motion.div>
                )}

                {activeTab === "COMBAT" && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="h-full flex flex-col">
                    <h3 className="text-[10px] text-[#F8F9FA] tracking-widest mb-4 border-b border-inherit pb-1">
                      TACTICAL_PARAMETERS
                    </h3>
                    
                    <div className="flex-1 min-h-[300px] bg-[#050505]/80 backdrop-blur-md border border-inherit relative">
                      <div className="absolute top-2 left-2 text-[10px] text-[#F8F9FA] tracking-widest"><ScrambleText text="SIMULATION MATRIX" delay={0.1} /></div>
                      {hero.id === 'spectre' && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none bg-[#050505]/70 backdrop-blur-sm">
                          <span className="text-4xl font-bold text-[#E50914] animate-pulse drop-shadow-[0_0_20px_red] tracking-widest"><ScrambleText text="DATA CORRUPTED" delay={0.3} /></span>
                        </div>
                      )}
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="65%" data={hero.stats}>
                          <PolarGrid stroke={hero.isClassified ? "#E5091440" : "#E5091440"} />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: '#888', fontSize: 10, fontFamily: 'monospace' }} />
                          <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
                          <Radar
                            name={hero.name}
                            dataKey="score"
                            stroke={hero.isClassified ? "#E50914" : "#E50914"}
                            fill={hero.isClassified ? "#E50914" : "#E50914"}
                            fillOpacity={0.3}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                      {hero.stats.map((stat, idx) => (
                        <div key={idx} className="bg-[#050505]/80 p-3 border border-inherit flex justify-between items-center hover:bg-white/5 transition-colors">
                          <span className="text-[10px] text-[#F8F9FA] tracking-widest"><ScrambleText text={stat.subject} delay={0.1 + idx * 0.1} /></span>
                          <span className={`text-sm font-bold ${hero.isClassified ? "text-[#E50914] drop-shadow-[0_0_5px_rgba(229, 9, 20,0.5)]" : "text-[#E50914] drop-shadow-[0_0_5px_rgba(229,9,20,0.5)]"}`}>
                            <ScrambleText text={stat.displayScore ? stat.displayScore : `${stat.score}.0`} delay={0.2 + idx * 0.1} />
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 pt-6 border-t border-inherit">
                      <h3 className="text-[10px] text-[#F8F9FA] tracking-widest mb-4 border-b border-inherit pb-1">
                        ANOMALOUS_SKILLS_FEED
                      </h3>
                      <div className="border border-[#E50914]/30 rounded-sm">
                        <SkillsPanel hero={hero} className="py-3" />
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "TIMELINE" && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <h3 className="text-[10px] text-[#F8F9FA] tracking-widest mb-6 border-b border-inherit pb-1">
                      OPERATIONAL_HISTORY
                    </h3>
                    
                    <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#E50914]/30 before:to-transparent">
                      {hero.skills.map((skill, idx) => (
                        <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                          <div className={`flex items-center justify-center w-5 h-5 rounded-full border-2 ${
                            hero.isClassified ? "bg-[#050505] border-[#E50914] text-[#E50914]" : "bg-[#050505] border-[#E50914] text-[#E50914]"
                          } shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_10px_currentColor] z-10`} />
                          
                          <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] p-4 bg-[#050505]/90 backdrop-blur-sm border border-inherit shadow hover:bg-white/5 transition-colors">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className={`text-xs font-bold tracking-widest ${hero.isClassified ? "text-[#E50914]" : "text-[#E50914]"}`}>
                                <ScrambleText text={skill.name} delay={0.1 + idx * 0.1} />
                              </h4>
                            </div>
                            <p className="text-[11px] text-[#F8F9FA] leading-relaxed">
                              <ScrambleText text={skill.description} delay={0.2 + idx * 0.1} />
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
