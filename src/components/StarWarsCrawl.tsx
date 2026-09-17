"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useAnimationFrame, useMotionValue, useMotionValueEvent } from "framer-motion";

export default function StarWarsCrawl() {
  const chapters = [
    {
      chapter: "CHAPTER 0",
      title: "THE ANCIENT PACT",
      desc: "Eons ago, Earth's guardian GAIA foresaw inevitable cosmic threats. To secure our future, she forged a pact with a supreme immortal emperor. Before departing the universe, he left a shard of his immense existence on Earth. Now secured in a subterranean vault, this ultimate failsafe—Spectre—remains in a perpetual trance, awaiting the day humanity needs its ultimate protector."
    },
    {
      chapter: "CHAPTER I",
      title: "THE VANGUARD",
      desc: "In the modern era, Earth's sudden exposure to extraterrestrial networks drew the attention of aggressive alien conglomerates. As traditional militaries proved powerless, the Global Anomaly Investigation Agency (G.A.I.A.) was founded. Stepping from the shadows as humanity's unified shield, we acquired the technology and intelligence necessary to defend our world on the galactic stage."
    },
    {
      chapter: "CHAPTER II",
      title: "THE CHARTER",
      desc: "Through unmatched diplomacy, G.A.I.A. secured Earth's exclusive planetary charter in 2010. Recognized as a sovereign entity under our protection, our world is safe from cosmic liquidation. We bear the immense burden of governance, ensuring peace and survival for all mankind as the silent architects of Earth's defense."
    },
    {
      chapter: "CHAPTER III",
      title: "OUR ELITE ROSTER",
      desc: "To defend our world, G.A.I.A. commands an elite roster of extraordinary operatives. While Spectre slumbers as our ultimate insurance, Nymeria wields cosmic light and psychic shielding. Angel strikes with divine swiftness from the atmosphere, and Android, the pinnacle of cybernetics, coordinates operations and our vast intelligence networks."
    },
    {
      chapter: "CHAPTER IV",
      title: "THE CALL TO ACTION",
      desc: "Facing daily anomalies and cosmic incursions, humanity need not fear the dark. G.A.I.A. stands ever-vigilant, deploying operatives to safeguard the planet. We ask citizens to report anomalies and seek our aid. As long as we hold the line, Earth remains free and secure. We are your shield. We are your future."
    }
  ];

  const contentBlock = (
    <div className="w-full flex flex-col items-center text-center">
      <div className="mb-32 flex justify-center">
        <h1 className="text-[6rem] md:text-[12rem] mb-12 tracking-wider font-black leading-none drop-shadow-[0_0_20px_rgba(229,9,20,0.4)]" 
            style={{ 
              color: 'black', 
              WebkitTextStroke: '4px #E50914', 
              fontFamily: 'Impact, "Arial Black", sans-serif'
            }}>
          G.A.I.A
        </h1>
      </div>

      {chapters.map((ch, i) => (
        <div key={i} className="mb-28 w-full text-center">
          <h2 className="text-3xl md:text-5xl mb-3 font-bold tracking-[0.3em] text-[#FF2A2A] drop-shadow-[0_0_8px_rgba(255,42,42,0.5)]" style={{ fontFamily: "'Univers Light Ultra Condensed', 'Univers', sans-serif" }}>{ch.chapter}</h2>
          <h3 className="text-2xl md:text-4xl mb-10 font-bold tracking-[0.2em] text-[#FF2A2A]/80" style={{ fontFamily: "'Univers Light Ultra Condensed', 'Univers', sans-serif" }}>{ch.title}</h3>
          <p className="text-2xl md:text-4xl leading-[1.8] text-[#F8F9FA] tracking-[0.1em] font-bold text-justify" style={{ textAlignLast: 'center', fontFamily: "'News Gothic Bold', 'News Gothic', sans-serif" }}>
            {ch.desc}
          </p>
        </div>
      ))}
      
      {/* 8 lines of spacing: ~32rem to account for larger text */}
      <div className="h-[32rem] w-full"></div>
    </div>
  );

  const y = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const isInteracting = useRef(false);
  const wheelTimeout = useRef<NodeJS.Timeout | null>(null);
  const [startPos, setStartPos] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setContentHeight(containerRef.current.offsetHeight / 2);
    }
    const initialPos = window.innerHeight * 0.4;
    setStartPos(initialPos);
    y.set(initialPos);
  }, [y]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleNativeWheel = (e: WheelEvent) => {
      e.preventDefault(); // Stop the main page from scrolling
      isInteracting.current = true;
      y.set(y.get() - e.deltaY);
      
      if (wheelTimeout.current) {
        clearTimeout(wheelTimeout.current);
      }
      wheelTimeout.current = setTimeout(() => {
        isInteracting.current = false;
      }, 150);
    };

    el.addEventListener('wheel', handleNativeWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', handleNativeWheel);
    };
  }, [y]);

  // Handle seamless wrapping on any change to y
  useMotionValueEvent(y, "change", (latest) => {
    if (!contentHeight) return;
    if (latest <= startPos - contentHeight) {
      y.set(latest + contentHeight);
    } else if (latest > startPos) {
      y.set(latest - contentHeight);
    }
  });

  useAnimationFrame((time, delta) => {
    if (!contentHeight || isInteracting.current) return;
    // Base speed: moves contentHeight in 100,000 ms (100 seconds), multiplied by 1.3 for 30% speedup
    const speed = (contentHeight / 100000) * 1.3;
    y.set(y.get() - speed * delta);
  });

  return (
    <div 
      className="absolute inset-x-0 top-0 h-[80vh] overflow-hidden flex items-end justify-center font-mono z-0"
      onPointerDown={() => isInteracting.current = true}
      onPointerUp={() => isInteracting.current = false}
      onPointerLeave={() => isInteracting.current = false}
    >
      <style>{`
        .perspective-container {
          perspective: 600px;
          height: 100%;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        .crawl-plane {
          width: 100%;
          max-width: 64rem;
          height: 100%;
          transform-origin: 50% 100%;
          transform: rotateX(25deg);
          position: relative;
        }
        .crawl-text {
          width: 100%;
          position: absolute;
          left: 0;
        }
      `}</style>

      {/* Fade at top */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#050505] via-[#050505]/80 to-transparent z-10 pointer-events-none" />

      <div className="perspective-container z-0">
        <div ref={wrapperRef} className="crawl-plane px-6">
          <motion.div 
            ref={containerRef}
            className="crawl-text cursor-grab active:cursor-grabbing"
            style={{ y }}
            drag="y"
            dragConstraints={{ top: -100000, bottom: 100000 }} // Arbitrary large numbers to allow infinite drag
            dragElastic={0}
            dragMomentum={false}
            onDragStart={() => isInteracting.current = true}
            onDragEnd={() => isInteracting.current = false}
          >
            {contentBlock}
            {contentBlock}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
