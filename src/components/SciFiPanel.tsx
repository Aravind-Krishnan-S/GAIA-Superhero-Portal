"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface SciFiPanelProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  variant?: "solid" | "glass";
  glow?: boolean;
}

export default function SciFiPanel({
  children,
  className = "",
  innerClassName = "",
  variant = "glass",
  glow = true,
  ...motionProps
}: SciFiPanelProps) {
  // Polygon for top-left and bottom-right clipped corners
  const clipPathStyle = {
    clipPath: "polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)"
  };

  return (
    <motion.div
      {...motionProps}
      className={`relative p-[1px] ${
        glow ? "shadow-[0_0_20px_rgba(229,9,20,0.25)]" : ""
      } ${className}`}
      style={{
        ...clipPathStyle,
        ...motionProps.style,
        backgroundColor: "rgba(229, 9, 20, 0.4)", // The "border" color
      }}
    >
      {/* Decorative hash marks (top left) */}
      <div className="absolute top-[2px] left-8 w-8 h-[2px] flex gap-[2px] opacity-70 z-20 pointer-events-none">
        <div className="w-[4px] h-full bg-[#E50914] transform -skew-x-12" />
        <div className="w-[4px] h-full bg-[#E50914] transform -skew-x-12" />
        <div className="w-[4px] h-full bg-[#E50914] transform -skew-x-12" />
      </div>

      {/* Decorative accent lines (bottom right) */}
      <div className="absolute bottom-0 right-10 w-24 h-[1px] bg-[#E50914] shadow-[0_0_8px_#E50914] z-20 pointer-events-none" />

      {/* Inner Container */}
      <div
        className={`w-full h-full relative overflow-hidden ${
          variant === "glass" ? "bg-[#050505]/95 backdrop-blur-md" : "bg-[#050505]"
        }`}
        style={clipPathStyle}
      >
        {/* Subtle dot grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(229,9,20,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(229,9,20,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none z-0" />
        
        {/* Scanline Overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-transparent via-[#E50914]/5 to-transparent opacity-50 pointer-events-none z-0" 
          style={{ animation: 'scanVertical 4s infinite linear' }} 
        />

        {/* Content */}
        <div className={`relative z-10 h-full w-full ${innerClassName}`}>
          {children}
        </div>
      </div>
      
      {/* Target Crosshair Decoration (Bottom right inner) */}
      <div className="absolute bottom-4 right-4 w-3 h-3 border-r border-b border-[#E50914]/40 z-20 pointer-events-none" />
      <div className="absolute top-4 left-4 w-3 h-3 border-l border-t border-[#E50914]/40 z-20 pointer-events-none" />
      
      <style jsx>{`
        @keyframes scanVertical {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </motion.div>
  );
}
