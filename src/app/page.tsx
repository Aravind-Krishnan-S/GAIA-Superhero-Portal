"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import HeroesGrid from "@/components/HeroesGrid";
import StarWarsCrawl from "@/components/StarWarsCrawl";
import AnomalyDatabase from "@/components/AnomalyDatabase";
import CyberpunkCityscape from "@/components/CyberpunkCityscape";
import BootSequence from "@/components/BootSequence";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isBooted, setIsBooted] = useState(false);
  
  useEffect(() => {
    // If already booted in session, skip animation
    if (sessionStorage.getItem("gaia_booted")) {
      setIsBooted(true);
    }
  }, []);

  // Setup Parallax for Hero Background
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Staggered Text Animation
  const textContainerVariant: any = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariant: any = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <>
      <BootSequence onComplete={() => setIsBooted(true)} />
      
      <AnimatePresence>
        {isBooted && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            ref={containerRef} 
            className="relative min-h-screen text-[#F8F9FA] bg-[#050505] selection:bg-[#E50914] selection:text-[#050505] z-10 font-sans overflow-hidden cursor-none"
          >
            
            {/* Massive Hero Section - Theatre Mode */}
            <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden border-b border-[#050505]">
              
              {/* Full-bleed Parallax Background */}
              <motion.div 
                className="absolute inset-0 z-0 pointer-events-auto"
                style={{ y: backgroundY, opacity }}
              >
                <CyberpunkCityscape />
              </motion.div>

              {/* Star Wars Crawl Animation in Background */}
              <div className="absolute inset-0 z-[5] pointer-events-none">
                <StarWarsCrawl />
              </div>
            </section>
            
            {/* Anomaly Database Section */}
            <section className="relative z-20 w-full border-b border-[#111111]">
              <AnomalyDatabase />
            </section>

            {/* Roster Grid Section */}
            <section className="relative z-20 bg-[#050505] w-full pt-24 pb-32 cursor-none">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-7xl mx-auto px-8 md:px-16 mb-16"
              >
                 <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#F8F9FA] mb-4 font-mono">
                   Active <span className="text-[#E50914]">Roster</span>
                 </h2>
                 <p className="text-[#F8F9FA] font-mono text-sm">Classified profiles of our most effective operatives.</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: 0.2 }}
                className="interactive"
              >
                <HeroesGrid />
              </motion.div>
            </section>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
