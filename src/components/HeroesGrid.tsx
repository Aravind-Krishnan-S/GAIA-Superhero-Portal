"use client";

import { useState } from "react";
import Image from "next/image";
import { heroes, Hero } from "@/data/heroes";
import DossierTheatre from "./DossierTheatre";
import { FileText, ShieldAlert } from "lucide-react";

export default function HeroesGrid() {
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);

  return (
    <div className="w-full py-16 bg-[#000000] font-mono relative border-t border-[#E50914]/20">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(229,9,20,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(229,9,20,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex items-center gap-4 mb-12 border-b border-[#E50914]/30 pb-4">
          <FileText className="text-[#E50914] w-6 h-6" />
          <h2 className="text-xl md:text-2xl font-bold text-[#E50914] tracking-[0.2em] uppercase">
            PERSONNEL ARCHIVE // OPERATIVES
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {heroes.map((hero, index) => (
            <div 
              key={hero.id}
              onClick={() => setSelectedHero(hero)}
              className={`group relative bg-[#1F1F1F] border transition-all duration-300 overflow-hidden cursor-pointer flex flex-col h-80 interactive ${
                hero.isClassified 
                  ? "border-[#ff3333]/30 hover:border-[#ff3333] hover:shadow-[0_0_20px_rgba(255,51,51,0.2)]" 
                  : "border-[#E50914]/30 hover:border-[#E50914] hover:shadow-[0_0_20px_rgba(229,9,20,0.2)]"
              }`}
              data-hover={hero.isClassified ? "[RESTRICTED ACCESS]" : `[ACCESS DOSSIER: ${hero.id}]`}
            >
              {/* Image Section */}
              <div className="relative h-[65%] w-full overflow-hidden bg-[#000000]">
                {hero.image ? (
                  <Image 
                    src={hero.image} 
                    alt={hero.name} 
                    fill
                    unoptimized={true}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectPosition: hero.imagePosition || "top" }}
                    className={`object-cover transition-transform duration-700 group-hover:scale-105 ${
                      hero.isClassified 
                        ? 'grayscale contrast-125 sepia-[0.5] hue-rotate-[-50deg] opacity-70 mix-blend-screen' 
                        : 'grayscale contrast-125 opacity-80 mix-blend-screen group-hover:grayscale-0 group-hover:opacity-100'
                    }`} 
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ShieldAlert className="w-12 h-12 text-[#333333]" />
                  </div>
                )}
                
                {/* Scanline Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#E50914]/5 to-transparent opacity-0 group-hover:opacity-100 animate-[translate_2s_infinite_linear]" style={{ animationName: 'scanVertical' }} />
                
                {/* Status Badge */}
                <div className={`absolute top-4 right-4 text-[10px] tracking-widest px-2 py-1 border backdrop-blur-md ${
                  hero.isClassified ? "bg-[#ff3333]/10 border-[#ff3333] text-[#ff3333]" : "bg-[#E50914]/10 border-[#E50914] text-[#E50914]"
                }`}>
                  {hero.isClassified ? "REDACTED" : "ACTIVE"}
                </div>
              </div>
              
              {/* Intelligence Data Section */}
              <div className={`flex-1 p-4 flex flex-col justify-between border-t ${
                hero.isClassified ? "border-[#ff3333]/30 bg-[#ff3333]/5" : "border-[#E50914]/30 bg-[#E50914]/5"
              }`}>
                <div>
                  <div className="text-[10px] text-[#888888] tracking-widest mb-1">
                    ID: {hero.id} // SEC-LEVEL: {hero.isClassified ? "OMEGA" : "ALPHA"}
                  </div>
                  <h3 className={`text-lg font-bold uppercase tracking-widest ${
                    hero.isClassified ? "text-[#ff3333]" : "text-[#E50914]"
                  }`}>
                    {hero.isClassified ? '[DATA EXPUNGED]' : hero.name}
                  </h3>
                </div>
                <div className="flex justify-between items-end">
                  <p className="text-[#cccccc] text-[10px] tracking-widest uppercase">
                    ROLE: {hero.role}
                  </p>
                  <div className="flex gap-1">
                    <div className={`w-1 h-3 ${hero.isClassified ? "bg-[#ff3333]" : "bg-[#E50914]"}`} />
                    <div className={`w-1 h-4 ${hero.isClassified ? "bg-[#ff3333]" : "bg-[#E50914]"} opacity-70`} />
                    <div className={`w-1 h-2 ${hero.isClassified ? "bg-[#ff3333]" : "bg-[#E50914]"} opacity-40`} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Character Dossier */}
      <DossierTheatre 
        hero={selectedHero} 
        onClose={() => setSelectedHero(null)} 
      />

      <style jsx>{`
        @keyframes scanVertical {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
}
