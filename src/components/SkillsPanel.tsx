"use client";

import { heroes, Hero } from "@/data/heroes";

interface SkillsPanelProps {
  hero?: Hero | null;
  className?: string;
}

export default function SkillsPanel({ hero, className = "" }: SkillsPanelProps) {
  const displayHeroes = hero ? [hero] : heroes;
  const allSkills = displayHeroes.flatMap(h => 
    h.skills.map(skill => ({ heroName: h.name, ...skill }))
  );

  return (
    <div className={`w-full bg-[#050505] overflow-y-auto custom-scrollbar font-mono max-h-[250px] relative z-40 ${className}`}>
      <div className="flex flex-col">
        {/* Header Row */}
        <div className="flex justify-between px-4 py-2 border-b border-[#E50914]/50 text-[10px] text-[#E50914] font-bold tracking-widest sticky top-0 bg-[#050505] z-20">
          <span>SKILL</span>
          <span>SKILL TYPE</span>
        </div>
        
        {/* Skill Rows */}
        <div className="flex flex-col">
          {allSkills.map((skill, i) => (
            <div 
              key={i} 
              className="group relative flex justify-between px-4 py-3 border-b border-[#E50914]/20 hover:bg-[#E50914]/10 transition-colors cursor-help"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-[#F8F9FA] tracking-wider uppercase">
                  {skill.name}
                </span>
              </div>
              <span className="text-[10px] text-[#E50914] tracking-widest uppercase">
                [{skill.type || "UNKNOWN"}]
              </span>

              {/* Hover Tooltip for Description */}
              <div className="absolute left-0 top-full mt-1 w-full p-3 bg-[#111] border border-[#E50914]/50 text-xs text-[#F8F9FA] tracking-wide leading-relaxed opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 shadow-[0_0_15px_rgba(229,9,20,0.3)]">
                <span className="text-[#E50914] mr-2">// DESCRIPTION:</span>
                {skill.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
