"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const milestones = [
  {
    year: "1999",
    title: "The Sacrifice",
    description: "The primordial guardian GAIA sacrifices itself to save Earth from a cosmic anomaly, scattering its essence across the globe."
  },
  {
    year: "2005",
    title: "First Generation",
    description: "The first superhumans manifest abilities linked to GAIA's scattered energy. Global Anomaly Investigation Agency is founded."
  },
  {
    year: "2015",
    title: "The Nexus Grid",
    description: "Deployment of orbital satellites allowing real-time tracking of anomalous energy signatures worldwide."
  },
  {
    year: "2026",
    title: "Android Terminal AI",
    description: "Creation of the first fully autonomous Tech-Hero AI, assigned to streamline global incident reporting and support operatives."
  }
];

export default function TechTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [300, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative w-full min-h-[1200px] py-32 bg-slate-900 flex flex-col items-center overflow-hidden border-t border-slate-800">
      
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none flex justify-center">
        <div className="w-[2px] h-full bg-gradient-to-b from-transparent via-amber-500/30 to-transparent"></div>
      </div>

      <div className="text-center mb-32 z-10">
        <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-widest text-[#F8F9FA] font-mono">
          Historical <span className="text-amber-500">Archives</span>
        </h2>
        <p className="text-slate-400 font-mono text-sm tracking-widest">[ CLASSIFIED TIMELINE ]</p>
      </div>

      <motion.div style={{ opacity }} className="relative w-full max-w-5xl mx-auto px-4 z-10 flex flex-col gap-32">
        {milestones.map((item, index) => (
          <div key={index} className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
            
            <motion.div 
              style={{ y: index % 2 === 0 ? y1 : y2 }}
              className="flex-1 w-full"
            >
              <div className="bg-slate-800/80 backdrop-blur-sm p-10 rounded-sm border border-slate-700 relative group hover:border-amber-500 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all duration-500">
                <div className="absolute -top-5 -left-5 w-10 h-10 bg-slate-900 border-2 border-amber-500 rounded-sm flex items-center justify-center text-amber-500 font-bold text-xs font-mono shadow-[0_0_10px_rgba(245,158,11,0.3)]">
                  0{index + 1}
                </div>
                <h4 className="text-amber-500 font-mono font-bold text-xl mb-2 tracking-widest">{item.year}</h4>
                <h3 className="text-2xl font-bold text-[#F8F9FA] mb-4 uppercase">{item.title}</h3>
                <p className="text-slate-300 leading-relaxed font-sans">{item.description}</p>
              </div>
            </motion.div>

            {/* Center Node */}
            <div className="hidden md:flex w-12 h-12 bg-slate-900 border-2 border-amber-500 rounded-none transform rotate-45 items-center justify-center relative z-20 shadow-[0_0_10px_rgba(245,158,11,0.3)]">
              <div className="w-3 h-3 bg-red-500 animate-pulse"></div>
            </div>

            <div className="flex-1 hidden md:block"></div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
