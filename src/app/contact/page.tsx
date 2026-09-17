"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, AlertTriangle, Info, Shield, Cpu, Volume2 } from "lucide-react";
import { sendGrievanceEmail, GrievanceData } from "@/lib/emailService";

type Mode = "MENU" | "CHAT" | "DISTRESS_NAME" | "DISTRESS_AGE" | "DISTRESS_EMAIL" | "DISTRESS_GRIEVANCE" | "DISTRESS_FINISHED";

interface Message {
  id: string;
  text: string;
  sender: "bot" | "user";
}

const TypewriterText = ({ text, speed = 65 }: { text: string; speed?: number }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText("");
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      
      // Dispatch typing sound event for each character typed
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('play-typing'));
      }
      
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return <span>{displayedText}</span>;
};

const speakRoboticFemale = (text: string, volume: number = 1.0) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  
  window.speechSynthesis.cancel();
  
  // Strip out coordinates for TTS
  const cleanText = text.replace(/LOCATION LOCKED: LAT:\s*[-0-9.]+,\s*LNG:\s*[-0-9.]+\.?\s*/i, 'LOCATION LOCKED. ');
  
  const utterance = new SpeechSynthesisUtterance(cleanText);
  
  const voices = window.speechSynthesis.getVoices();
  const femaleVoice = voices.find(v => 
    v.name.includes('Zira') || 
    v.name.includes('Female') || 
    v.name.includes('Samantha') || 
    v.name.includes('Victoria')
  );
  
  if (femaleVoice) {
    utterance.voice = femaleVoice;
  }
  
  utterance.pitch = 1.4; // Slightly higher pitch
  utterance.rate = 1.1;  // Slightly faster/monotone
  utterance.volume = volume;
  window.speechSynthesis.speak(utterance);
};

export default function ContactPage() {
  const [mode, setMode] = useState<Mode>("MENU");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<GrievanceData>>({});
  
  const [ttsVolume, setTtsVolume] = useState<number>(0.8);
  const ttsVolumeRef = useRef<number>(0.8);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Cancel TTS when leaving the page
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Focus input when not typing
  useEffect(() => {
    if (!isTyping && mode !== "MENU" && mode !== "DISTRESS_FINISHED") {
      inputRef.current?.focus();
    }
  }, [isTyping, mode]);

  // TTS on new bot message
  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    if (lastMsg && lastMsg.sender === 'bot') {
      speakRoboticFemale(lastMsg.text, ttsVolumeRef.current);
    }
  }, [messages]);

  const botReply = (text: string, delay: number = 1000) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { id: Date.now().toString(), text, sender: "bot" }]);
      setIsTyping(false);
    }, delay);
  };

  const handleMenuSelect = (option: string) => {
    if (option === "DISTRESS") {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('play-alert'));
      }
      setMode("DISTRESS_NAME");
      setMessages([{ id: Date.now().toString(), text: "DISTRESS PROTOCOL INITIATED. STATE YOUR FULL NAME.", sender: "bot" }]);
    } else {
      setMode("CHAT");
      let prompt = "";
      if (option === "GAIA") prompt = "Tell me about G.A.I.A.";
      if (option === "HEROES") prompt = "Tell me about the Operatives / Superheroes.";
      if (option === "AUTO") prompt = "Who are you, Auto?";
      
      const newMsg: Message = { id: Date.now().toString(), text: prompt, sender: "user" };
      setMessages([newMsg]);
      fetchGeminiResponse([newMsg]);
    }
  };

  const fetchGeminiResponse = async (chatHistory: Message[]) => {
    setIsTyping(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: chatHistory }),
      });
      const data = await response.json();
      if (data.reply) {
        setMessages((prev) => [...prev, { id: Date.now().toString(), text: data.reply, sender: "bot" }]);
      } else {
        setMessages((prev) => [...prev, { id: Date.now().toString(), text: "ERROR IN COMMUNICATION PROTOCOL.", sender: "bot" }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { id: Date.now().toString(), text: "CONNECTION SEVERED.", sender: "bot" }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isSubmitting || isTyping) return;

    const userText = inputValue.trim();
    const newUserMsg: Message = { id: Date.now().toString(), text: userText, sender: "user" };
    
    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue("");

    if (mode === "CHAT") {
      fetchGeminiResponse([...messages, newUserMsg]);
    } else if (mode.startsWith("DISTRESS")) {
      handleDistressFlow(userText);
    }
  };

  const handleDistressFlow = async (userText: string) => {
    switch (mode) {
      case "DISTRESS_NAME":
        setFormData((prev) => ({ ...prev, name: userText }));
        botReply(`ACKNOWLEDGED, ${userText.toUpperCase()}. I NEED YOUR CURRENT AGE FOR TIMELINE VARIANCE CHECKS.`);
        setMode("DISTRESS_AGE");
        break;
      
      case "DISTRESS_AGE":
        setFormData((prev) => ({ ...prev, age: userText }));
        botReply("PROCESSING... TRIANGULATING YOUR COORDINATES.", 500);
        
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const lat = position.coords.latitude.toFixed(4);
              const lng = position.coords.longitude.toFixed(4);
              const loc = `LAT: ${lat}, LNG: ${lng}`;
              setFormData((prev) => ({ ...prev, location: loc }));
              setTimeout(() => {
                botReply(`LOCATION LOCKED: ${loc}. NEXT, PROVIDE A VALID EMAIL ADDRESS SO OUR OPERATIVES CAN ESTABLISH A SECURE LINK.`, 1000);
                setMode("DISTRESS_EMAIL");
              }, 1000);
            },
            () => {
              setFormData((prev) => ({ ...prev, location: "UNKNOWN SECTOR" }));
              setTimeout(() => {
                botReply("SIGNAL ENCRYPTED. LOCATION SET TO UNKNOWN SECTOR. NEXT, PROVIDE A VALID EMAIL ADDRESS SO OUR OPERATIVES CAN ESTABLISH A SECURE LINK.", 1000);
                setMode("DISTRESS_EMAIL");
              }, 1000);
            }
          );
        } else {
          setFormData((prev) => ({ ...prev, location: "UNKNOWN SECTOR" }));
          setTimeout(() => {
            botReply("SENSOR FAILURE. LOCATION SET TO UNKNOWN SECTOR. NEXT, PROVIDE A VALID EMAIL ADDRESS.", 1000);
            setMode("DISTRESS_EMAIL");
          }, 1000);
        }
        break;

      case "DISTRESS_EMAIL":
        if (!userText.includes("@")) {
          botReply("ERROR: INVALID EMAIL FORMAT. PLEASE PROVIDE A STANDARD EMAIL ADDRESS.");
          return;
        }
        setFormData((prev) => ({ ...prev, email: userText }));
        botReply("IDENTITY VERIFIED. CLEARANCES GRANTED. PLEASE DESCRIBE YOUR EMERGENCY.");
        setMode("DISTRESS_GRIEVANCE");
        break;

      case "DISTRESS_GRIEVANCE":
        const finalData = { ...formData, grievance: userText } as GrievanceData;
        setFormData(finalData);
        setMode("DISTRESS_FINISHED");
        
        setIsSubmitting(true);
        botReply("ENCRYPTING AND TRANSMITTING YOUR REQUEST TO COMMAND...", 500);
        
        try {
          await sendGrievanceEmail(finalData);
          botReply("TRANSMISSION SUCCESSFUL. OPERATIVES ALERTED. HANG TIGHT.", 2000);
        } catch (error) {
          botReply("WARNING: TRANSMISSION INTERFERENCE. DATA LOGGED OFFLINE.", 2000);
        } finally {
          setIsSubmitting(false);
        }
        break;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-screen pt-[72px] bg-[#050505] flex flex-col md:flex-row overflow-hidden relative font-mono">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#E50914]/5 via-[#050505] to-[#050505] pointer-events-none z-0" />

      {/* 3D Model Area (Left Side) */}
      <div className="flex-[1.5] relative z-10 flex flex-col items-center justify-center p-6 border-b md:border-b-0 md:border-r border-[#E50914]/30 min-h-[50vh] md:min-h-0">
        


        {/* Model Container */}
        <motion.div 
          className="w-full h-full max-h-[80vh] relative"
        >
          {/* Sketchfab Iframe */}
          <div className="sketchfab-embed-wrapper w-full h-full overflow-hidden">
            <iframe 
              title="WALL-E - AUTO" 
              frameBorder="0" 
              allowFullScreen 
              className="w-full h-full"
              allow="autoplay; fullscreen; xr-spatial-tracking" 
              src="https://sketchfab.com/models/b7b477131eda4609b828e95b6c5815e2/embed?autostart=1&transparent=1&ui_infos=0&ui_stop=0&ui_watermark=0&ui_controls=0&ui_settings=0&ui_help=0&ui_inspector=0&ui_animations=0&ui_annotations=0&ui_vr=0&ui_ar=0"
            ></iframe>
            {/* Covers for Sketchfab UI elements that can't be disabled on free tier */}
            <div className="absolute top-0 left-0 w-64 h-24 bg-[#050505] z-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#050505] z-10 pointer-events-none"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-16 bg-[#050505] z-10 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-32 h-16 bg-[#050505] z-10 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-72 h-16 bg-[#050505] z-10 pointer-events-none"></div>
          </div>

          {/* Floating Speech Bubble (Only visible when not in MENU) */}
          <AnimatePresence>
            {mode !== "MENU" && messages.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute top-1/2 -translate-y-1/2 right-4 md:-right-8 bg-[#1A1A1A] border border-[#E50914]/50 p-4 rounded-lg rounded-bl-none shadow-[0_0_30px_rgba(229,9,20,0.2)] max-w-[250px] text-xs text-[#F8F9FA] leading-relaxed z-20"
              >
                {isTyping ? (
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E50914] animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E50914] animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E50914] animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                ) : (
                  <p><TypewriterText text={messages.filter(m => m.sender === 'bot').pop()?.text || "..."} /></p>
                )}
                {/* Tail of the speech bubble */}
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-[#1A1A1A] border-b border-l border-[#E50914]/50 rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Chat / Menu Area (Right Side) */}
      <div className="flex-1 max-w-full md:max-w-[450px] flex flex-col z-10 bg-[#050505]/80 backdrop-blur-md">
        
        {mode === "MENU" ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 gap-6">
            <h2 className="text-[#E50914] text-xl md:text-2xl tracking-[0.2em] font-bold text-center mb-4">
              G.A.I.A. COMM-LINK
            </h2>
            <p className="text-[#E50914]/70 text-sm text-center mb-8 max-w-md">
              I am A.U.T.O., your personal assistant. Select an operational protocol below to initiate uplink.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg">
              <button 
                onClick={() => handleMenuSelect("DISTRESS")}
                className="flex items-center gap-3 bg-[#E50914]/10 border border-[#E50914]/40 hover:bg-[#E50914]/20 p-4 rounded-sm text-[#E50914] transition-all group"
              >
                <AlertTriangle className="group-hover:animate-pulse" />
                <span className="tracking-widest text-sm">DISTRESS SIGNAL</span>
              </button>
              <button 
                onClick={() => handleMenuSelect("GAIA")}
                className="flex items-center gap-3 bg-transparent border border-[#E50914]/40 hover:bg-[#E50914]/10 p-4 rounded-sm text-[#F8F9FA] transition-all"
              >
                <Shield className="text-[#E50914]" />
                <span className="tracking-widest text-sm">ABOUT G.A.I.A.</span>
              </button>
              <button 
                onClick={() => handleMenuSelect("HEROES")}
                className="flex items-center gap-3 bg-transparent border border-[#E50914]/40 hover:bg-[#E50914]/10 p-4 rounded-sm text-[#F8F9FA] transition-all"
              >
                <Info className="text-[#E50914]" />
                <span className="tracking-widest text-sm text-left">ABOUT SUPERHEROES</span>
              </button>
              <button 
                onClick={() => handleMenuSelect("AUTO")}
                className="flex items-center gap-3 bg-transparent border border-[#E50914]/40 hover:bg-[#E50914]/10 p-4 rounded-sm text-[#F8F9FA] transition-all"
              >
                <Cpu className="text-[#E50914]" />
                <span className="tracking-widest text-sm">ABOUT AUTO</span>
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Chat Log Header */}
            <div className="p-4 border-b border-[#E50914]/30 bg-[#1A1A1A] flex justify-between items-center">
              <span className="text-[#E50914] text-xs tracking-widest">
                {mode === "CHAT" ? "GENERAL QUERY MODE" : "EMERGENCY PROTOCOL"}
              </span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2" title="Adjust A.U.T.O. Voice Volume">
                  <Volume2 className="w-3 h-3 text-[#E50914]/70" />
                  <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.1" 
                    value={ttsVolume} 
                    onChange={(e) => {
                      const vol = parseFloat(e.target.value);
                      setTtsVolume(vol);
                      ttsVolumeRef.current = vol;
                    }}
                    className="w-16 accent-[#E50914] h-1 bg-[#E50914]/30 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <button 
                  onClick={() => setMode("MENU")}
                  className="text-xs text-[#F8F9FA]/50 hover:text-[#E50914] transition-colors"
                >
                  [ RESET CONNECTION ]
                </button>
              </div>
            </div>

            {/* Chat Log */}
            <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-6 scrollbar-thin scrollbar-thumb-[#E50914]/20 scrollbar-track-transparent">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex flex-col max-w-[85%] ${msg.sender === "user" ? "self-end items-end" : "self-start items-start"}`}
                >
                  <span className="text-[10px] text-[#E50914]/50 mb-1 tracking-widest">
                    {msg.sender === "user" ? "OPERATIVE" : "A.U.T.O."}
                  </span>
                  <div 
                    className={`px-4 py-3 text-sm tracking-wide border ${
                      msg.sender === "user" 
                        ? "bg-[#E50914]/10 text-[#F8F9FA] border-[#E50914]/30 text-right" 
                        : "bg-transparent text-[#E50914] border-l-2 border-l-[#E50914] border-y-transparent border-r-transparent"
                    }`}
                  >
                    {msg.sender === "bot" ? <TypewriterText text={msg.text} /> : msg.text}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Command Input Area */}
            <div className="p-4 bg-[#1A1A1A] border-t border-[#E50914]/30 relative z-20">
              <div className="flex items-center gap-3">
                <span className="text-[#E50914] opacity-70 animate-pulse">&gt;</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={mode === "DISTRESS_FINISHED" ? "TRANSMISSION COMPLETE." : "INPUT COMMAND..."}
                  disabled={mode === "DISTRESS_FINISHED" || isTyping || isSubmitting}
                  className="flex-1 bg-transparent text-[#E50914] text-sm tracking-widest placeholder-[#E50914]/30 focus:outline-none disabled:opacity-50"
                  autoComplete="off"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || mode === "DISTRESS_FINISHED" || isTyping || isSubmitting}
                  className="p-2 text-[#E50914] disabled:opacity-30 hover:bg-[#E50914]/20 transition-colors border border-transparent hover:border-[#E50914]/50 cursor-pointer"
                >
                  {isSubmitting || isTyping ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
