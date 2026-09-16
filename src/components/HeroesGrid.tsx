"use client";

import { useState } from "react";
import Image from "next/image";
import { heroes, Hero } from "@/data/heroes";
import DossierTheatre from "./DossierTheatre";
import { FileText, ShieldAlert } from "lucide-react";

export default function HeroesGrid() {
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);

  return (
    <div className="w-full py-16 bg-[#050505] font-mono relative border-t border-[#E50914]/20">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(229,9,20,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(229,9,20,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex items-center gap-4 mb-12 border-b border-[#E50914]/30 pb-4">
          <FileText className="text-[#E50914] w-6 h-6" />
          <h2 className="text-xl md:text-2xl font-bold text-[#E50914] tracking-[0.2em] uppercase">
            PERSONNEL ARCHIVE // OPERATIVES
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {heroes.map((hero, index) => (
            <div 
              key={hero.id}
              onClick={() => setSelectedHero(hero)}
              className={`group relative bg-[#050505]/40 backdrop-blur-md border transition-all duration-300 overflow-hidden cursor-pointer flex flex-col h-80 interactive ${
                hero.isClassified 
                  ? "border-[#E50914]/30 hover:border-[#E50914] hover:shadow-[0_0_30px_rgba(229, 9, 20,0.3)]" 
                  : "border-[#E50914]/30 hover:border-[#E50914] hover:shadow-[0_0_30px_rgba(229,9,20,0.3)]"
              }`}
              data-hover={hero.isClassified ? "[RESTRICTED ACCESS]" : `[ACCESS DOSSIER: ${hero.id}]`}
            >
              {/* Target Acquisition Brackets (Top Left, Top Right, Bottom Left, Bottom Right) */}
              <div className={`absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 transition-all duration-300 transform -translate-x-4 -translate-y-4 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 z-20 ${hero.isClassified ? "border-[#E50914]" : "border-[#E50914]"}`}></div>
              <div className={`absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 transition-all duration-300 transform translate-x-4 -translate-y-4 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 z-20 ${hero.isClassified ? "border-[#E50914]" : "border-[#E50914]"}`}></div>
              <div className={`absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 transition-all duration-300 transform -translate-x-4 translate-y-4 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 z-20 ${hero.isClassified ? "border-[#E50914]" : "border-[#E50914]"}`}></div>
              <div className={`absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 transition-all duration-300 transform translate-x-4 translate-y-4 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 z-20 ${hero.isClassified ? "border-[#E50914]" : "border-[#E50914]"}`}></div>

              {/* Image Section */}
              <div className="relative h-[65%] w-full overflow-hidden bg-[#050505]">
                {hero.image ? (
                  <>
                    <Image 
                      src={hero.image} 
                      alt={hero.name} 
                      fill
                      unoptimized={true}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectPosition: hero.imagePosition || "top" }}
                      className={`object-cover transition-all duration-100 group-hover:scale-105 ${
                        hero.isClassified 
                          ? 'grayscale contrast-125 sepia-[0.5] hue-rotate-[-50deg] opacity-70 mix-blend-screen' 
                          : 'grayscale contrast-125 opacity-80 mix-blend-screen group-hover:grayscale-0 group-hover:opacity-100 group-hover:animate-[rgbSplit_0.2s_ease-in-out]'
                      }`} 
                    />
                    {/* RGB Glitch overlays */}
                    <div className="absolute inset-0 opacity-0 group-hover:animate-[glitchRed_0.2s_ease-in-out] mix-blend-screen bg-red-500/20 pointer-events-none"></div>
                    <div className="absolute inset-0 opacity-0 group-hover:animate-[glitchBlue_0.2s_ease-in-out] mix-blend-screen bg-blue-500/20 pointer-events-none"></div>
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ShieldAlert className="w-12 h-12 text-[#1A1A1A]" />
                  </div>
                )}
                
                {/* Scanline Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#E50914]/10 to-transparent opacity-0 group-hover:opacity-100 animate-[translate_2s_infinite_linear] pointer-events-none" style={{ animationName: 'scanVertical' }} />
                
                {/* Status Badge */}
                <div className={`absolute top-4 right-4 text-[10px] tracking-widest px-2 py-1 border backdrop-blur-md z-20 ${
                  hero.isClassified ? "bg-[#E50914]/10 border-[#E50914] text-[#E50914]" : "bg-[#E50914]/10 border-[#E50914] text-[#E50914]"
                }`}>
                  {hero.isClassified ? "REDACTED" : "ACTIVE"}
                </div>
              </div>
              
              {/* Intelligence Data Section */}
              <div className={`flex-1 p-4 flex flex-col justify-between border-t z-10 transition-colors duration-300 ${
                hero.isClassified ? "border-[#E50914]/30 bg-[#E50914]/5 group-hover:bg-[#E50914]/10" : "border-[#E50914]/30 bg-[#E50914]/5 group-hover:bg-[#E50914]/10"
              }`}>
                <div>
                  <div className="text-[10px] text-[#F8F9FA] tracking-widest mb-1">
                    ID: {hero.id} // SEC-LEVEL: {hero.isClassified ? "OMEGA" : "ALPHA"}
                  </div>
                  <h3 className={`text-lg font-bold uppercase tracking-widest drop-shadow-[0_0_8px_rgba(229,9,20,0.5)] ${
                    hero.isClassified ? "text-[#E50914] drop-shadow-[0_0_8px_rgba(229, 9, 20,0.5)]" : "text-[#E50914]"
                  }`}>
                    {hero.isClassified ? '[DATA EXPUNGED]' : hero.name}
                  </h3>
                </div>
                <div className="flex justify-between items-end">
                  <p className="text-[#F8F9FA] text-[10px] tracking-widest uppercase">
                    ROLE: {hero.role}
                  </p>
                  <div className="flex gap-1 group-hover:animate-pulse">
                    <div className={`w-1 h-3 ${hero.isClassified ? "bg-[#E50914]" : "bg-[#E50914]"}`} />
                    <div className={`w-1 h-4 ${hero.isClassified ? "bg-[#E50914]" : "bg-[#E50914]"} opacity-70`} />
                    <div className={`w-1 h-2 ${hero.isClassified ? "bg-[#E50914]" : "bg-[#E50914]"} opacity-40`} />
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
        @keyframes rgbSplit {
          0% { filter: drop-shadow(4px 0 0 red) drop-shadow(-4px 0 0 red); }
          50% { filter: drop-shadow(-4px 0 0 red) drop-shadow(4px 0 0 red); }
          100% { filter: none; }
        }
        @keyframes glitchRed {
          0% { opacity: 0; transform: translate(0); }
          20% { opacity: 1; transform: translate(-4px, 2px); }
          40% { opacity: 0.5; transform: translate(4px, -2px); }
          60% { opacity: 1; transform: translate(-2px, -4px); }
          80% { opacity: 0.5; transform: translate(2px, 4px); }
          100% { opacity: 0; transform: translate(0); }
        }
        @keyframes glitchBlue {
          0% { opacity: 0; transform: translate(0); }
          20% { opacity: 1; transform: translate(4px, -2px); }
          40% { opacity: 0.5; transform: translate(-4px, 2px); }
          60% { opacity: 1; transform: translate(2px, 4px); }
          80% { opacity: 0.5; transform: translate(-2px, -4px); }
          100% { opacity: 0; transform: translate(0); }
        }
      `}</style>
    </div>
  );
}
