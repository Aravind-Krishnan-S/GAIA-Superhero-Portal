"use client";

import { useState } from "react";
import Image from "next/image";
import { heroes, Hero } from "@/data/heroes";
import DossierTheatre from "./DossierTheatre";
import { ShieldAlert } from "lucide-react";

const getHeroTheme = (id: string) => {
  switch (id) {
    case 'spectre': 
      return { 
        color: '#ffffff', 
        glow: 'rgba(255,255,255,0.6)', 
        border: 'border-white/40', 
        borderHover: 'hover:border-white', 
        text: 'text-white',
        bg: 'bg-white/5',
        bgHover: 'group-hover:bg-white/10',
        flare: 'from-white/0 via-white/40 to-white/0',
        filter: 'grayscale contrast-125' 
      };
    case 'nymeria': 
      return { 
        color: '#E50914', 
        glow: 'rgba(229,9,20,0.6)', 
        border: 'border-[#E50914]/40', 
        borderHover: 'hover:border-[#E50914]', 
        text: 'text-[#E50914]',
        bg: 'bg-[#E50914]/5',
        bgHover: 'group-hover:bg-[#E50914]/10',
        flare: 'from-[#E50914]/0 via-[#E50914]/40 to-[#E50914]/0',
        filter: 'grayscale contrast-125 sepia-[0.5] hue-rotate-[-50deg]' 
      };
    case 'angel': 
      return { 
        color: '#8b5cf6', 
        glow: 'rgba(139,92,246,0.6)', 
        border: 'border-purple-500/40', 
        borderHover: 'hover:border-purple-500', 
        text: 'text-purple-500',
        bg: 'bg-purple-500/5',
        bgHover: 'group-hover:bg-purple-500/10',
        flare: 'from-purple-500/0 via-purple-500/40 to-purple-500/0',
        filter: 'grayscale contrast-125 hue-rotate-[250deg] saturate-200' 
      };
    case 'android': 
      return { 
        color: '#06b6d4', 
        glow: 'rgba(6,182,212,0.6)', 
        border: 'border-cyan-500/40', 
        borderHover: 'hover:border-cyan-500', 
        text: 'text-cyan-500',
        bg: 'bg-cyan-500/5',
        bgHover: 'group-hover:bg-cyan-500/10',
        flare: 'from-cyan-500/0 via-cyan-500/40 to-cyan-500/0',
        filter: 'grayscale contrast-125 hue-rotate-[180deg] saturate-200' 
      };
    default: 
      return { 
        color: '#E50914', 
        glow: 'rgba(229,9,20,0.6)', 
        border: 'border-[#E50914]/40', 
        borderHover: 'hover:border-[#E50914]', 
        text: 'text-[#E50914]',
        bg: 'bg-[#E50914]/5',
        bgHover: 'group-hover:bg-[#E50914]/10',
        flare: 'from-[#E50914]/0 via-[#E50914]/40 to-[#E50914]/0',
        filter: 'grayscale contrast-125' 
      };
  }
};

export default function HeroesGrid() {
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);

  return (
    <div className="w-full py-8 bg-[#050505] font-mono relative flex-grow flex flex-col">
      <div className="max-w-[95%] mx-auto px-4 w-full relative z-10 flex-grow flex">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full h-[70vh] min-h-[500px]">
          {heroes.slice(0, 4).map((hero) => {
            const theme = getHeroTheme(hero.id);
            
            return (
              <div 
                key={hero.id}
                onClick={() => setSelectedHero(hero)}
                className={`group relative bg-[#050505]/60 backdrop-blur-md border-x border-y-0 ${theme.border} ${theme.borderHover} transition-all duration-500 overflow-hidden cursor-pointer flex flex-col h-full interactive`}
                style={{
                  clipPath: 'polygon(50% 0%, 100% 10%, 100% 90%, 50% 100%, 0% 90%, 0% 10%)',
                }}
                data-hover={`[${hero.name}]`}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 40px ${theme.glow}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Flare Animation Overlay */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-30`}>
                  <div className={`absolute -inset-x-full top-1/2 h-32 -translate-y-1/2 bg-gradient-to-r ${theme.flare} transform -rotate-45 group-hover:animate-[flareSweep_1.5s_ease-in-out_infinite] blur-xl`} />
                  <div className={`absolute -inset-x-full top-1/2 h-10 -translate-y-1/2 bg-gradient-to-r ${theme.flare} transform -rotate-45 group-hover:animate-[flareSweep_1.5s_ease-in-out_infinite_0.1s] blur-md mix-blend-screen`} />
                </div>

                {/* Image Section */}
                <div className="relative h-[80%] w-full overflow-hidden bg-[#050505]">
                  {hero.image ? (
                    <>
                      <Image 
                        src={hero.image} 
                        alt={hero.name} 
                        fill
                        unoptimized={true}
                        sizes="(max-width: 768px) 100vw, 25vw"
                        style={{ objectPosition: hero.imagePosition || "center 20%" }}
                        className={`object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 mix-blend-screen ${theme.filter} group-hover:grayscale-0 group-hover:opacity-100 group-hover:filter-none`}
                      />
                      {/* Scanline Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 animate-[translate_2s_infinite_linear] pointer-events-none" style={{ animationName: 'scanVertical' }} />
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ShieldAlert className={`w-12 h-12 ${theme.text}`} />
                    </div>
                  )}
                </div>
                
                {/* Info Section */}
                <div className={`flex-1 p-6 flex flex-col justify-end items-center text-center z-10 transition-colors duration-300 ${theme.bg} ${theme.bgHover}`}>
                  <h3 className={`text-2xl lg:text-3xl font-black uppercase tracking-[0.2em] mb-2 ${theme.text}`} style={{ textShadow: `0 0 15px ${theme.color}` }}>
                    {hero.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-4">
                    <span className={`text-2xl lg:text-3xl font-black tracking-widest ${theme.text} drop-shadow-md`} style={{ fontFamily: 'var(--font-cinzel), serif' }}>
                      {hero.rank}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
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
        @keyframes flareSweep {
          0% { transform: translateX(-150%) rotate(-45deg); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateX(200%) rotate(-45deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
