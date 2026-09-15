"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { Hero } from "@/data/heroes";
import { X, Fingerprint, Activity, Terminal } from "lucide-react";

interface DossierTheatreProps {
  hero: Hero | null;
  onClose: () => void;
}

export default function DossierTheatre({ hero, onClose }: DossierTheatreProps) {
  const [activeTab, setActiveTab] = useState<"INTEL" | "COMBAT" | "TIMELINE">("INTEL");

  const [mounted, setMounted] = useState(false);

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
            className="absolute inset-0 bg-[#000000]/90 backdrop-blur-lg"
          />

          {/* Dossier Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
            transition={{ duration: 0.3 }}
            className={`relative w-full h-full md:max-w-[90vw] md:h-[90vh] bg-[#000000] border overflow-hidden flex flex-col md:flex-row z-10 ${
              hero.isClassified ? "border-[#ff3333]/50 shadow-[0_0_50px_rgba(255,51,51,0.15)]" : "border-[#E50914]/50 shadow-[0_0_50px_rgba(229,9,20,0.15)]"
            }`}
          >
            {/* Scanline Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#E50914]/5 to-transparent animate-[translate_3s_infinite_linear] pointer-events-none z-50" style={{ animationName: 'scanVertical' }} />

            {/* Close Button */}
            <button 
              onClick={onClose}
              className={`absolute top-6 right-6 z-50 p-2 border bg-[#000000]/80 transition-colors interactive ${
                hero.isClassified ? "border-[#ff3333]/30 hover:bg-[#ff3333] hover:text-black text-[#ff3333]" : "border-[#E50914]/30 hover:bg-[#E50914] hover:text-black text-[#E50914]"
              }`}
            >
              <X size={20} />
            </button>

            {/* Left Side: Subject Image & Vitals */}
            <div className="w-full md:w-1/3 h-[40vh] md:h-full relative border-b md:border-b-0 md:border-r border-inherit bg-[#1F1F1F] flex-shrink-0">
              <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 pointer-events-none">
                <div className={`px-2 py-1 text-[10px] tracking-widest border backdrop-blur-md inline-block ${
                  hero.isClassified ? "bg-[#ff3333]/20 border-[#ff3333] text-[#ff3333]" : "bg-[#E50914]/20 border-[#E50914] text-[#E50914]"
                }`}>
                  FILE: {hero.id}
                </div>
                {hero.isClassified && (
                  <div className="px-2 py-1 text-[10px] tracking-widest bg-[#ff3333] text-black font-bold uppercase inline-block animate-pulse">
                    RESTRICTED ACCESS
                  </div>
                )}
              </div>

              {hero.image ? (
                <div className="absolute inset-0">
                  <Image 
                    src={hero.image} 
                    alt={hero.name} 
                    fill 
                    unoptimized={true}
                    style={{ objectPosition: hero.imagePosition || "top" }}
                    className={`object-cover ${hero.isClassified ? 'opacity-90' : 'opacity-100'}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#000000]" />
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-30">
                  <Fingerprint size={64} className="mb-4" />
                  <p className="text-[10px] tracking-widest uppercase">BIOMETRIC DATA MISSING</p>
                </div>
              )}

              {/* Vitals Overlay */}
              <div className="absolute bottom-4 left-4 right-4 z-20">
                <div className={`p-4 border backdrop-blur-md bg-[#000000]/80 ${
                  hero.isClassified ? "border-[#ff3333]/30" : "border-[#E50914]/30"
                }`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] text-[#888888] tracking-widest">SUBJECT STATUS</span>
                    <span className={`text-[10px] tracking-widest font-bold ${hero.isClassified ? "text-[#ff3333]" : "text-[#E50914]"}`}>
                      {hero.isClassified ? "REDACTED" : "ACTIVE"}
                    </span>
                  </div>
                  <div className="w-full h-1 bg-[#141414] overflow-hidden">
                    <div className={`h-full animate-pulse ${hero.isClassified ? "bg-[#ff3333] w-1/3" : "bg-[#E50914] w-full"}`} />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Data Modules */}
            <div className="w-full md:w-2/3 flex flex-col h-[60vh] md:h-full bg-[#000000]">
              {/* Tab Navigation */}
              <div className={`flex border-b ${hero.isClassified ? "border-[#ff3333]/30" : "border-[#E50914]/30"}`}>
                {["INTEL", "COMBAT", "TIMELINE"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`flex-1 py-4 text-xs tracking-widest transition-colors interactive ${
                      activeTab === tab 
                        ? (hero.isClassified ? "bg-[#ff3333]/10 text-[#ff3333] border-b-2 border-[#ff3333]" : "bg-[#E50914]/10 text-[#E50914] border-b-2 border-[#E50914]") 
                        : "text-[#888888] hover:bg-white/5"
                    }`}
                  >
                    [{tab}]
                  </button>
                ))}
              </div>

              {/* Content Area */}
              <div className="flex-1 p-6 md:p-10 overflow-y-auto custom-scrollbar">
                
                {activeTab === "INTEL" && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <div className="mb-8">
                      <h2 className={`text-4xl md:text-5xl font-bold uppercase tracking-widest mb-2 ${hero.isClassified ? "text-[#ff3333]" : "text-[#E50914]"}`}>
                        {hero.isClassified ? '[DATA EXPUNGED]' : hero.name}
                      </h2>
                      <div className="text-xs text-[#888888] tracking-widest flex items-center gap-4">
                        <span>DESIGNATION: {hero.role}</span>
                        <span>CLEARANCE: {hero.rank}</span>
                      </div>
                    </div>

                    <div className="space-y-8">
                      <section>
                        <h3 className="text-[10px] text-[#888888] tracking-widest mb-3 border-b border-inherit pb-1 flex items-center gap-2">
                          <Terminal size={12} /> BACKGROUND_ASSESSMENT
                        </h3>
                        <p className="text-sm leading-relaxed text-[#cccccc] tracking-wide text-justify">
                          {hero.backstory}
                        </p>
                      </section>

                      <section>
                        <h3 className="text-[10px] text-[#888888] tracking-widest mb-3 border-b border-inherit pb-1 flex items-center gap-2">
                          <Activity size={12} /> ANOMALOUS_ABILITIES
                        </h3>
                        <p className="text-sm leading-relaxed text-[#cccccc] tracking-wide text-justify">
                          {hero.powerSystem}
                        </p>
                      </section>
                    </div>
                  </motion.div>
                )}

                {activeTab === "COMBAT" && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="h-full flex flex-col">
                    <h3 className="text-[10px] text-[#888888] tracking-widest mb-4 border-b border-inherit pb-1">
                      TACTICAL_PARAMETERS
                    </h3>
                    
                    <div className="flex-1 min-h-[300px] bg-[#1F1F1F] border border-inherit relative">
                      <div className="absolute top-2 left-2 text-[10px] text-[#888888]">SIMULATION MATRIX</div>
                      {hero.id === 'spectre' && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none bg-[#000000]/50 backdrop-blur-sm">
                          <span className="text-4xl font-bold text-[#ff3333] animate-pulse">DATA CORRUPTED</span>
                        </div>
                      )}
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="65%" data={hero.stats}>
                          <PolarGrid stroke={hero.isClassified ? "#ff333340" : "#E5091440"} />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: '#888', fontSize: 10, fontFamily: 'monospace' }} />
                          <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
                          <Radar
                            name={hero.name}
                            dataKey="score"
                            stroke={hero.isClassified ? "#ff3333" : "#E50914"}
                            fill={hero.isClassified ? "#ff3333" : "#E50914"}
                            fillOpacity={0.3}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                      {hero.stats.map((stat, idx) => (
                        <div key={idx} className="bg-[#1F1F1F] p-3 border border-inherit flex justify-between items-center">
                          <span className="text-[10px] text-[#888888]">{stat.subject}</span>
                          <span className={`text-sm font-bold ${hero.isClassified ? "text-[#ff3333]" : "text-[#E50914]"}`}>
                            {stat.displayScore ? stat.displayScore : `${stat.score}.0`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === "TIMELINE" && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <h3 className="text-[10px] text-[#888888] tracking-widest mb-6 border-b border-inherit pb-1">
                      OPERATIONAL_HISTORY
                    </h3>
                    
                    <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#333333] before:to-transparent">
                      {hero.skills.map((skill, idx) => (
                        <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                          <div className={`flex items-center justify-center w-5 h-5 rounded-full border-2 ${
                            hero.isClassified ? "bg-[#000000] border-[#ff3333] text-[#ff3333]" : "bg-[#000000] border-[#E50914] text-[#E50914]"
                          } shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_10px_currentColor]`} />
                          
                          <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] p-4 bg-[#1F1F1F] border border-inherit shadow">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className={`text-xs font-bold tracking-widest ${hero.isClassified ? "text-[#ff3333]" : "text-[#E50914]"}`}>
                                {skill.name}
                              </h4>
                            </div>
                            <p className="text-[11px] text-[#cccccc] leading-relaxed">
                              {skill.description}
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
