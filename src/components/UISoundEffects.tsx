"use client";

import { useEffect, useRef } from "react";

export default function UISoundEffects() {
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});

  useEffect(() => {
    // Preload audio files
    if (typeof window !== "undefined") {
      audioRefs.current = {
        hover: new Audio('/sfx/mixkit-sci-fi-click-900.wav'),
        click: new Audio('/sfx/mixkit-sci-fi-confirmation-914.wav'),
        powerUp: new Audio('/sfx/mixkit-crystal-chime-3108.wav'),
        alert: new Audio('/sfx/mixkit-sci-fi-ship-alert-768.wav'),
      };

      // Lower volume for hover and typing so they aren't overwhelming
      if (audioRefs.current.hover) audioRefs.current.hover.volume = 0.2;
      if (audioRefs.current.click) audioRefs.current.click.volume = 0.5;
    }

    let hasInteracted = false;

    const playSound = (type: string) => {
      const audio = audioRefs.current[type];
      if (audio) {
        // Reset playback position if it's already playing
        audio.currentTime = 0;
        audio.play().catch((err) => {
          // Ignore play errors (usually due to autoplay restrictions before user interaction)
        });
      }
    };

    // Initialize on first interaction
    const initAudio = () => {
      if (!hasInteracted) {
        hasInteracted = true;
        playSound("powerUp"); 
      }
    };

    // Track the last hovered element to prevent repeating sounds if moving inside the same element
    let lastHovered: HTMLElement | null = null;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest('button, a, [role="button"], .interactive');
      
      if (interactiveEl && interactiveEl !== lastHovered) {
        if (hasInteracted) playSound("hover");
        lastHovered = interactiveEl as HTMLElement;
      } else if (!interactiveEl) {
        lastHovered = null;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, [role="button"], input, select, textarea, .interactive')) {
        initAudio();
        playSound("click");
      }
    };

    const playAlertSound = () => { if (hasInteracted) playSound("alert"); };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('click', initAudio, { once: true }); // Unlock audio context
    window.addEventListener('play-alert', playAlertSound as any);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('play-alert', playAlertSound as any);
    };
  }, []);

  return null;
}
