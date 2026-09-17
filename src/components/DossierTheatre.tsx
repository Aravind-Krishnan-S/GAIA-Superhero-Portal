"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { Hero, heroes } from "@/data/heroes";
import { X, ShieldAlert, Terminal, Activity, ChevronDown, ChevronUp, Trophy, Zap, TriangleAlert, Image as ImageIcon } from "lucide-react";

interface DossierTheatreProps {
  hero: Hero | null;
  onClose: () => void;
}

export default function DossierTheatre({ hero, onClose }: DossierTheatreProps) {
  const [activeHero, setActiveHero] = useState<Hero | null>(null);
  const [mounted, setMounted] = useState(false);
  
  // Accordion states
  const [skillsOpen, setSkillsOpen] = useState(false);
  const [achievementsOpen, setAchievementsOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (hero) {
      setActiveHero(hero);
      document.body.style.overflow = 'hidden';
      setSkillsOpen(false); // reset on hero change
      setAchievementsOpen(false);
      setGalleryOpen(false);
    } else {
      setActiveHero(null);
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [hero]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {activeHero && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 font-mono text-[#E50914]">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#050505]/95 backdrop-blur-xl"
          />

          {/* Main Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className={`relative w-full h-full md:max-w-[95vw] md:h-[90vh] bg-[#050505]/80 border shadow-[0_0_50px_rgba(229,9,20,0.15)] overflow-hidden flex flex-col md:flex-row z-10 ${
              activeHero.isClassified ? "border-[#E50914]/50" : "border-[#E50914]/50"
            }`}
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-6 z-50 p-2 border border-[#E50914]/50 bg-[#050505] hover:bg-[#E50914] hover:text-[#050505] text-[#E50914] transition-colors"
            >
              <X size={20} />
            </button>

            {/* Left Column: Character Switcher */}
            <div className="w-full md:w-28 flex flex-row md:flex-col items-center py-4 md:py-8 gap-4 border-b md:border-b-0 md:border-r border-[#E50914]/30 bg-[#050505] z-20 overflow-x-auto md:overflow-y-auto custom-scrollbar shrink-0">
              {heroes.map((h) => (
                <button
                  key={h.id}
                  onClick={() => setActiveHero(h)}
                  className={`relative w-20 h-20 md:w-20 md:h-24 shrink-0 transition-all duration-300 ${
                    activeHero.id === h.id 
                      ? 'scale-110 drop-shadow-[0_0_15px_rgba(229,9,20,0.8)] z-10' 
                      : 'opacity-50 hover:opacity-100 hover:scale-105 z-0'
                  }`}
                  style={{ clipPath: "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)" }}
                >
                  <div className={`absolute inset-0 ${activeHero.id === h.id ? 'bg-[#E50914]' : 'bg-[#E50914]/30'}`} />
                  <div 
                    className="absolute inset-[2px] bg-[#050505] overflow-hidden"
                    style={{ clipPath: "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)" }}
                  >
                    {h.image ? (
                      <Image 
                        src={h.image} 
                        alt={h.name} 
                        fill 
                        className={`object-cover ${h.isClassified && activeHero.id !== h.id ? 'grayscale' : ''}`}
                        style={{ objectPosition: h.imagePosition || "top" }}
                      />
                    ) : (
                      <ShieldAlert className="w-full h-full p-4 text-[#E50914]" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Left-Center Column: Large Portrait */}
            <div className="w-full md:w-[35%] relative border-b md:border-b-0 md:border-r border-[#E50914]/30 bg-[#050505] overflow-hidden shrink-0 min-h-[40vh] md:min-h-0">
              {activeHero.image ? (
                <motion.div
                  key={activeHero.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute inset-0"
                >
                  <Image 
                    src={activeHero.image} 
                    alt={activeHero.name} 
                    fill 
                    className={`object-cover ${activeHero.isClassified ? 'opacity-90 sepia-[0.5] hue-rotate-[-50deg]' : 'opacity-100 grayscale-[0.2]'}`}
                    style={{ objectPosition: activeHero.imagePosition || "top" }}
                  />
                  {/* Holographic overlay */}
                  <div className="absolute inset-0 bg-[#E50914]/10 mix-blend-overlay"></div>
                </motion.div>
              ) : (
                 <div className="absolute inset-0 flex items-center justify-center opacity-30">
                   <ShieldAlert size={64} className="mb-4" />
                 </div>
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent pointer-events-none">
                <div className="border-b border-[#E50914]/30 pb-4 mb-4">
                  <div className="text-[10px] text-[#E50914] tracking-widest mb-1">OPERATIVE ID: {activeHero.id}</div>
                  <h2 className={`text-4xl md:text-5xl font-bold uppercase tracking-widest drop-shadow-[0_0_10px_rgba(229,9,20,0.5)] ${activeHero.isClassified ? "text-[#E50914]" : "text-[#F8F9FA]"}`}>
                    {activeHero.isClassified ? '[REDACTED]' : activeHero.name}
                  </h2>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-[10px] text-[#F8F9FA] tracking-widest uppercase mb-1">THREAT LEVEL</div>
                    <div className="text-sm font-bold text-[#E50914] tracking-wider">{activeHero.threatLevel}</div>
                  </div>
                  <div className="text-right">
                    <div 
                      style={{ fontFamily: 'var(--font-cinzel), serif' }}
                      className={`text-4xl font-bold ${
                        activeHero.rank === 'EX-Rank' ? 'text-transparent bg-clip-text bg-gradient-to-br from-[#E50914] via-white to-black drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' :
                        activeHero.rank === 'S-Rank' ? 'text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,1)]' :
                        activeHero.rank === 'A-Rank' ? 'text-purple-600 drop-shadow-[0_0_10px_rgba(147,51,234,0.8)]' :
                        activeHero.rank === 'B-Rank' ? 'text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]' :
                        'text-[#E50914] drop-shadow-[0_0_8px_rgba(229,9,20,0.5)]'
                      }`}
                    >
                      {activeHero.rank}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Column: Skills & Backstory */}
            <div className="w-full md:w-[35%] border-b md:border-b-0 md:border-r border-[#E50914]/30 bg-[#050505]/90 overflow-y-auto custom-scrollbar p-6 shrink-0 relative">
               {/* Background Texture */}
               <div className="absolute inset-0 bg-[linear-gradient(rgba(229,9,20,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(229,9,20,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
               
               <div className="relative z-10">
                 <div className="mb-8">
                   <h3 className="text-[10px] text-[#F8F9FA] tracking-widest mb-3 border-b border-[#E50914]/30 pb-1 flex items-center gap-2">
                     <Terminal size={12} className="text-[#E50914]" /> BACKGROUND_ASSESSMENT
                   </h3>
                   <p className="text-xs md:text-sm leading-relaxed text-[#F8F9FA] tracking-wide text-justify">
                     {activeHero.backstory}
                   </p>
                 </div>
                 
                 <div className="mb-8">
                   <h3 className="text-[10px] text-[#F8F9FA] tracking-widest mb-3 border-b border-[#E50914]/30 pb-1 flex items-center gap-2">
                     <Activity size={12} className="text-[#E50914]" /> ANOMALOUS_ABILITIES
                   </h3>
                   <p className="text-xs md:text-sm leading-relaxed text-[#F8F9FA] tracking-wide text-justify">
                     {activeHero.powerSystem}
                   </p>
                 </div>

                 {/* Accordions */}
                 <div className="space-y-4">
                   
                   {/* Skills Accordion */}
                   <div className="border border-[#E50914]/30 bg-[#050505]">
                     <button 
                       onClick={() => setSkillsOpen(!skillsOpen)}
                       className="w-full flex justify-between items-center p-3 hover:bg-[#E50914]/10 transition-colors focus:outline-none"
                     >
                       <span className="text-xs font-bold text-[#E50914] tracking-widest uppercase flex items-center gap-2">
                         <Zap size={14} /> SKILLS / LOADOUT
                       </span>
                       {skillsOpen ? <ChevronUp size={16} className="text-[#E50914]" /> : <ChevronDown size={16} className="text-[#E50914]" />}
                     </button>
                     
                     <AnimatePresence>
                       {skillsOpen && (
                         <motion.div 
                           initial={{ height: 0, opacity: 0 }}
                           animate={{ height: "auto", opacity: 1 }}
                           exit={{ height: 0, opacity: 0 }}
                           className="overflow-hidden"
                         >
                           <div className="p-3 border-t border-[#E50914]/30 space-y-3 bg-[#E50914]/5">
                             {activeHero.skills.map((skill, idx) => (
                               <div key={idx} className="p-2 border border-[#E50914]/20 bg-[#050505] hover:bg-[#E50914]/10 transition-colors group">
                                 <div className="flex justify-between items-center mb-1">
                                   <div className="text-xs font-bold text-[#E50914] tracking-widest uppercase">{skill.name}</div>
                                   <span className="text-[10px] text-[#E50914] tracking-widest opacity-70">[{skill.type || "UNKNOWN"}]</span>
                                 </div>
                                 <div className="text-[11px] text-[#F8F9FA] leading-relaxed opacity-80">{skill.description}</div>
                               </div>
                             ))}
                             {activeHero.skills.length === 0 && (
                               <div className="text-xs text-[#F8F9FA] opacity-50 italic">No skills documented yet.</div>
                             )}
                           </div>
                         </motion.div>
                       )}
                     </AnimatePresence>
                   </div>

                   {/* Achievements Accordion */}
                   <div className="border border-[#E50914]/30 bg-[#050505]">
                     <button 
                       onClick={() => setAchievementsOpen(!achievementsOpen)}
                       className="w-full flex justify-between items-center p-3 hover:bg-[#E50914]/10 transition-colors focus:outline-none"
                     >
                       <span className="text-xs font-bold text-[#E50914] tracking-widest uppercase flex items-center gap-2">
                         <Trophy size={14} /> ACHIEVEMENTS / MILESTONES
                       </span>
                       {achievementsOpen ? <ChevronUp size={16} className="text-[#E50914]" /> : <ChevronDown size={16} className="text-[#E50914]" />}
                     </button>
                     
                     <AnimatePresence>
                       {achievementsOpen && (
                         <motion.div 
                           initial={{ height: 0, opacity: 0 }}
                           animate={{ height: "auto", opacity: 1 }}
                           exit={{ height: 0, opacity: 0 }}
                           className="overflow-hidden"
                         >
                           <div className="p-3 border-t border-[#E50914]/30 space-y-3 bg-[#E50914]/5">
                             {activeHero.achievements && activeHero.achievements.length > 0 ? (
                               activeHero.achievements.map((achievement, idx) => (
                                 <div key={idx} className="p-2 border border-[#E50914]/20 bg-[#050505] hover:bg-[#E50914]/10 transition-colors group">
                                   <div className="flex justify-between items-center mb-1">
                                     <div className="text-xs font-bold text-[#E50914] tracking-widest uppercase">{achievement.name}</div>
                                     {achievement.date && <span className="text-[10px] text-[#E50914] tracking-widest opacity-70">[{achievement.date}]</span>}
                                   </div>
                                   <div className="text-[11px] text-[#F8F9FA] leading-relaxed opacity-80">{achievement.description}</div>
                                 </div>
                               ))
                             ) : (
                               <div className="text-xs text-[#F8F9FA] opacity-50 italic">
                                 No achievements logged yet. Additional data will be added to this database soon.
                               </div>
                             )}
                           </div>
                         </motion.div>
                       )}
                     </AnimatePresence>
                   </div>

                   {/* Gallery Accordion */}
                   <div className="border border-[#E50914]/30 bg-[#050505]">
                     <button 
                       onClick={() => setGalleryOpen(!galleryOpen)}
                       className="w-full flex justify-between items-center p-3 hover:bg-[#E50914]/10 transition-colors focus:outline-none"
                     >
                       <span className="text-xs font-bold text-[#E50914] tracking-widest uppercase flex items-center gap-2">
                         <ImageIcon size={14} /> CLASSIFIED_GALLERY
                       </span>
                       {galleryOpen ? <ChevronUp size={16} className="text-[#E50914]" /> : <ChevronDown size={16} className="text-[#E50914]" />}
                     </button>
                     
                     <AnimatePresence>
                       {galleryOpen && (
                         <motion.div 
                           initial={{ height: 0, opacity: 0 }}
                           animate={{ height: "auto", opacity: 1 }}
                           exit={{ height: 0, opacity: 0 }}
                           className="overflow-hidden"
                         >
                           <div className="p-3 border-t border-[#E50914]/30 bg-[#E50914]/5">
                             {activeHero.gallery && activeHero.gallery.length > 0 ? (
                               <div className="grid grid-cols-2 gap-2">
                                 {activeHero.gallery.map((imgSrc, idx) => (
                                   <div key={idx} className="relative aspect-square border border-[#E50914]/30 overflow-hidden hover:border-[#E50914] transition-colors group">
                                     <Image 
                                       src={imgSrc} 
                                       alt={`${activeHero.name} gallery image ${idx + 1}`}
                                       fill
                                       className="object-cover opacity-70 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
                                     />
                                   </div>
                                 ))}
                               </div>
                             ) : (
                               <div className="text-xs text-[#F8F9FA] opacity-50 italic">
                                 No visual data available in the current dossier.
                               </div>
                             )}
                           </div>
                         </motion.div>
                       )}
                     </AnimatePresence>
                   </div>

                 </div>

               </div>
            </div>

            {/* Right Column: Radar & Attributes */}
            <div className="flex-1 bg-[#050505] flex flex-col p-6 overflow-y-auto custom-scrollbar relative">
              <h3 className="text-[10px] text-[#F8F9FA] tracking-widest mb-4 border-b border-[#E50914]/30 pb-1 text-center">
                TACTICAL_ATTRIBUTES
              </h3>
              
              <div className="w-full h-[250px] md:h-[300px] relative mb-6 shrink-0">

                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="65%" data={activeHero.stats}>
                    <PolarGrid stroke="#E5091440" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#F8F9FA', fontSize: 10, fontFamily: 'monospace' }} />
                    <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
                    <Radar
                      name={activeHero.name}
                      dataKey="score"
                      stroke="#E50914"
                      fill="#E50914"
                      fillOpacity={0.3}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="flex-1 flex flex-col gap-2 relative z-20">
                {activeHero.stats.map((stat, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 border border-[#E50914]/20 bg-[#E50914]/5 hover:bg-[#E50914]/10 transition-colors">
                    <span className="text-xs text-[#F8F9FA] tracking-widest uppercase">{stat.subject}</span>
                    <span className={`text-sm font-bold ${activeHero.id === 'spectre' ? 'text-yellow-500 drop-shadow-[0_0_5px_rgba(234,179,8,0.5)]' : 'text-[#E50914] drop-shadow-[0_0_5px_rgba(229,9,20,0.5)]'}`}>
                      {activeHero.id === 'spectre' ? '??' : stat.displayScore ? stat.displayScore : `${stat.score}.0`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
