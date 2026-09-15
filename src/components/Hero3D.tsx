"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Sphere, Stars } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

function FloatingGeometry() {
  const groupRef = useRef<THREE.Group>(null);
  
  const shapes = useMemo(() => {
    return Array.from({ length: 30 }).map(() => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10 - 5
      ] as [number, number, number],
      scale: Math.random() * 0.5 + 0.1,
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
      color: Math.random() > 0.8 ? "#e50914" : "#444444"
    }));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {shapes.map((props, i) => (
        <Float key={i} speed={2} rotationIntensity={1.5} floatIntensity={2}>
          <mesh position={props.position} scale={props.scale} rotation={props.rotation}>
            <icosahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color={props.color} wireframe opacity={0.4} transparent />
          </mesh>
        </Float>
      ))}
      <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere args={[2, 32, 32]} position={[0, 0, -2]}>
          <meshStandardMaterial 
            color="#e50914" 
            wireframe 
            emissive="#e50914"
            emissiveIntensity={0.2}
            transparent 
            opacity={0.15} 
          />
        </Sphere>
      </Float>
    </group>
  );
}

export default function Hero3D() {
  const scrollToMap = () => {
    const mapSection = document.getElementById("incident-map");
    if (mapSection) {
      mapSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-gaia-bg flex items-center justify-center">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#e50914" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <FloatingGeometry />
          <Environment preset="night" />
        </Canvas>
      </div>

      {/* Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20" 
           style={{ backgroundImage: "linear-gradient(#141414 1px, transparent 1px), linear-gradient(90deg, #141414 1px, transparent 1px)", backgroundSize: "40px 40px" }}>
      </div>

      {/* Glassmorphism UI Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full h-full pointer-events-none">
        <motion.div 
          className="glass-panel p-12 max-w-4xl w-full pointer-events-auto flex flex-col items-center bg-[#000000]/80 border-[#E50914]/30"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-black mb-4 tracking-widest font-mono"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="text-white">G.</span>
            <span className="text-[#E50914]">A.</span>
            <span className="text-white">I.</span>
            <span className="text-[#E50914]">A.</span>
          </motion.h1>
          
          <motion.div 
            className="text-xl md:text-2xl text-slate-300 font-light tracking-wide mb-12 max-w-2xl font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <p className="font-bold text-[#E50914] mb-4">[ GLOBAL ANOMALY INVESTIGATION AGENCY ]</p>
            <p className="text-sm md:text-base leading-relaxed text-[#aaaaaa]">Forged from the sacrifice of the primordial guardian GAIA, we stand as the vanguard. Managing the first generation of superhumans to protect Earth from the unknown.</p>
          </motion.div>

          <motion.button 
            onClick={scrollToMap}
            className="relative group flex items-center justify-center gap-3 px-8 py-4 bg-[#141414] border-2 border-[#E50914] text-[#E50914] font-mono font-bold uppercase tracking-widest overflow-hidden transition-all duration-300 hover:bg-[#E50914] hover:text-white hover:shadow-[0_0_20px_rgba(229,9,20,0.6)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            {/* Radar Ping Animation */}
            <span className="absolute right-4 w-3 h-3 bg-[#E50914] rounded-full animate-ping group-hover:bg-white"></span>
            <span className="absolute right-4 w-3 h-3 bg-[#E50914] rounded-full group-hover:bg-white"></span>
            
            {/* Button Text */}
            <span className="z-10 flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3"></path>
              </svg>
              ACCESS SURVEILLANCE
            </span>
          </motion.button>
        </motion.div>
      </div>
      
      {/* Decorative gradient overlay */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gaia-bg to-transparent z-0 pointer-events-none"></div>
    </section>
  );
}
