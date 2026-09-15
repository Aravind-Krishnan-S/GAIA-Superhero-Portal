"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Look for custom data-hover attribute
      const hoverElement = target.closest('[data-hover]') as HTMLElement;
      
      if (hoverElement) {
        setIsHovered(true);
        setHoverText(hoverElement.getAttribute('data-hover') || "");
      } else if (
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("interactive") ||
        window.getComputedStyle(target).cursor === "pointer"
      ) {
        setIsHovered(true);
        setHoverText("");
      } else {
        setIsHovered(false);
        setHoverText("");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Outer Targeting Reticle */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isHovered ? 1.5 : 1,
          opacity: isHovered ? 1 : 0.6,
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="relative w-full h-full">
          {/* Top Left Bracket */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#E50914]" />
          {/* Top Right Bracket */}
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#E50914]" />
          {/* Bottom Left Bracket */}
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#E50914]" />
          {/* Bottom Right Bracket */}
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#E50914]" />
        </div>
      </motion.div>
      
      {/* Contextual Text */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] ml-10 mt-2 font-mono text-[10px] text-[#E50914] tracking-widest whitespace-nowrap drop-shadow-[0_0_5px_rgba(229,9,20,0.8)]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          animate={{
            opacity: hoverText ? 1 : 0,
            x: hoverText ? 10 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          {hoverText}
        </motion.div>
      </motion.div>

      {/* Inner precise dot */}
      <motion.div
        className="fixed top-[14px] left-[14px] w-1 h-1 rounded-full bg-[#E50914] pointer-events-none z-[10000] shadow-[0_0_5px_rgba(229,9,20,1)]"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isHovered ? 0 : 1,
        }}
        transition={{ duration: 0.1 }}
      />
    </>
  );
}
