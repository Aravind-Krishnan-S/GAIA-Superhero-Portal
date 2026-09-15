"use client";

import { motion } from "framer-motion";
import { Terminal, Database, ShieldAlert, Crosshair } from "lucide-react";

export default function GaiaIntelligence() {
  const timelineEvents = [
    {
      year: "PRE-CONTACT",
      title: "THE PRIMITIVE ERA",
      desc: "For millennia, Earth was an isolated, uncontacted backwater planet, oblivious to the vast galactic economy and rival empires.",
      status: "CLASSIFIED"
    },
    {
      year: "2006",
      title: "FIRST CONTACT",
      desc: "Earth was abruptly introduced to the extraterrestrial enterprise network, drawing the attention of aggressive alien conglomerates.",
      status: "CRITICAL"
    },
    {
      year: "2008",
      title: "G.A.I.A. FOUNDATION",
      desc: "A unified human coalition established the Global Anomaly Investigation Agency to prevent planetary liquidation.",
      status: "SECURED"
    },
    {
      year: "2010",
      title: "THE CHARTER",
      desc: "Through sheer resourcefulness, G.A.I.A. secured the exclusive planetary charter, becoming the sovereign corporate ruler of Earth.",
      status: "AUTHORIZED"
    },
    {
      year: "PRESENT",
      title: "CORPORATE DEFENSE",
      desc: "G.A.I.A. deploys a roster of elite superpowered operatives to repel hostile takeovers and maintain Earth's independence.",
      status: "ACTIVE"
    }
  ];

  return (
    <div className="w-full bg-[#000000] font-mono border-t border-[#E50914]/20 py-20 relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(229,9,20,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(229,9,20,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Col: Mission Params */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          <div className="border border-[#E50914]/30 bg-[#1F1F1F] p-6 relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E50914] to-transparent opacity-50" />
            
            <div className="flex items-center gap-3 mb-6 border-b border-[#E50914]/20 pb-4">
              <Terminal className="w-5 h-5 text-[#E50914]" />
              <h2 className="text-lg font-bold tracking-widest text-[#E50914] uppercase">
                MISSION PARAMETERS
              </h2>
            </div>
            
            <p className="text-sm text-[#cccccc] leading-relaxed text-justify mb-6">
              To operate as Earth's sovereign mega-corporation, maintaining planetary order and defending against hostile takeovers by rival alien conglomerates. We do not negotiate with invaders. We protect the charter.
            </p>

            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <span className="text-[#E50914] font-bold">01</span>
                <p className="text-xs text-[#888888]">Identify and recruit super-powered individuals as elite corporate Operatives.</p>
              </div>
              <div className="flex gap-4 items-start">
                <span className="text-[#E50914] font-bold">02</span>
                <p className="text-xs text-[#888888]">Defend Earth's assets from extraterrestrial corporate incursions and sabotage.</p>
              </div>
              <div className="flex gap-4 items-start">
                <span className="text-[#E50914] font-bold">03</span>
                <p className="text-xs text-[#888888]">Reverse-engineer alien technology to ensure Earth remains profitable and independent.</p>
              </div>
            </div>
          </div>

          {/* Alert Status */}
          <div className="border border-[#ff3333]/30 bg-[#ff3333]/5 p-6 relative overflow-hidden flex flex-col justify-center items-center h-32 group">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,51,51,0.1)_50%,transparent_75%)] bg-[length:10px_10px] pointer-events-none" />
            <ShieldAlert className="w-6 h-6 text-[#ff3333] mb-2 group-hover:animate-ping" />
            <span className="text-xs font-bold text-[#ff3333] tracking-widest uppercase">DEFCON 2</span>
            <span className="text-[10px] text-[#ff3333]/70 tracking-widest mt-1">ELEVATED ANOMALY RISK</span>
          </div>
        </div>

        {/* Right Col: Timeline */}
        <div className="lg:col-span-8">
          <div className="flex items-center gap-3 mb-8">
            <Database className="w-5 h-5 text-[#888888]" />
            <h2 className="text-lg font-bold tracking-widest text-[#888888] uppercase">
              DECRYPTED ARCHIVE // EVENT_ZERO
            </h2>
          </div>

          <div className="relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-gradient-to-b before:from-transparent before:via-[#E50914]/50 before:to-transparent space-y-12">
            {timelineEvents.map((event, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
              >
                {/* Timeline Dot */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 bg-[#000000] border-[#E50914] text-[#E50914] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_15px_rgba(229,9,20,0.3)] z-10">
                  <Crosshair className="w-4 h-4 animate-spin-slow" />
                </div>
                
                {/* Content Box */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-[#1F1F1F] border border-[#E50914]/30 shadow-lg relative interactive hover:border-[#E50914] transition-colors">
                  <div className="absolute top-0 right-0 px-2 py-1 bg-[#E50914]/10 border-b border-l border-[#E50914]/30 text-[10px] text-[#E50914] tracking-widest">
                    {event.status}
                  </div>
                  
                  <div className="text-[10px] text-[#E50914] tracking-widest mb-2 font-bold bg-[#E50914]/10 inline-block px-2 py-1">
                    YEAR: {event.year}
                  </div>
                  
                  <h3 className="text-sm font-bold text-white tracking-widest uppercase mb-3 border-l-2 border-[#E50914] pl-3">
                    {event.title}
                  </h3>
                  
                  <p className="text-xs text-[#cccccc] leading-relaxed">
                    {event.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
