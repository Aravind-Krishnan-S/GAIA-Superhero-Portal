"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, Send, Activity, Loader2 } from "lucide-react";
import { sendGrievanceEmail, GrievanceData } from "@/lib/emailService";

type Step = "greeting" | "name" | "age" | "email" | "grievance" | "finished";

interface Message {
  id: string;
  text: string;
  sender: "bot" | "user";
}

export default function ContactGaia() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  
  const [step, setStep] = useState<Step>("greeting");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<Partial<GrievanceData>>({});
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    // Listen for custom event from TopNavigation
    const handleOpenContact = () => {
      setIsOpen(true);
      if (!hasOpened) {
        setHasOpened(true);
        startConversation();
      }
    };
    window.addEventListener("open-contact-gaia", handleOpenContact);
    return () => window.removeEventListener("open-contact-gaia", handleOpenContact);
  }, [hasOpened]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const botReply = (text: string, delay: number = 1000) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { id: Date.now().toString(), text, sender: "bot" }]);
      setIsTyping(false);
    }, delay);
  };

  const startConversation = () => {
    if (messages.length === 0) {
      botReply("G.A.I.A SECURE CHANNEL INITIATED. I AM THE CENTRAL INTELLIGENCE NETWORK.", 500);
      setTimeout(() => {
        botReply("WE HAVE DETECTED ANOMALOUS ACTIVITY. FOR SECURITY CLEARANCE, PLEASE STATE YOUR FULL NAME.", 1000);
        setStep("name");
      }, 2000);
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isSubmitting) return;

    const userText = inputValue.trim();
    setMessages((prev) => [...prev, { id: Date.now().toString(), text: userText, sender: "user" }]);
    setInputValue("");

    switch (step) {
      case "name":
        setFormData((prev) => ({ ...prev, name: userText }));
        botReply(`ACKNOWLEDGED, ${userText.toUpperCase()}. TO CALCULATE TIMELINE VARIANCE, I NEED YOUR CURRENT AGE.`);
        setStep("age");
        break;
      
      case "age":
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
                setStep("email");
              }, 1000);
            },
            (error) => {
              setFormData((prev) => ({ ...prev, location: "UNKNOWN SECTOR" }));
              setTimeout(() => {
                botReply("SIGNAL ENCRYPTED. LOCATION SET TO UNKNOWN SECTOR. NEXT, PROVIDE A VALID EMAIL ADDRESS SO OUR OPERATIVES CAN ESTABLISH A SECURE LINK.", 1000);
                setStep("email");
              }, 1000);
            }
          );
        } else {
          setFormData((prev) => ({ ...prev, location: "UNKNOWN SECTOR" }));
          setTimeout(() => {
            botReply("SENSOR FAILURE. LOCATION SET TO UNKNOWN SECTOR. NEXT, PROVIDE A VALID EMAIL ADDRESS SO OUR OPERATIVES CAN ESTABLISH A SECURE LINK.", 1000);
            setStep("email");
          }, 1000);
        }
        break;

      case "email":
        if (!userText.includes("@")) {
          botReply("ERROR: INVALID EMAIL FORMAT. PLEASE PROVIDE A STANDARD EMAIL ADDRESS.");
          return;
        }
        setFormData((prev) => ({ ...prev, email: userText }));
        botReply("IDENTITY VERIFIED. CLEARANCES GRANTED. PLEASE DESCRIBE YOUR GRIEVANCE OR EMERGENCY PROTOCOL.");
        setStep("grievance");
        break;

      case "grievance":
        const finalData = { ...formData, grievance: userText } as GrievanceData;
        setFormData(finalData);
        setStep("finished");
        
        setIsSubmitting(true);
        botReply("ENCRYPTING AND TRANSMITTING YOUR REQUEST TO COMMAND...", 500);
        
        try {
          await sendGrievanceEmail(finalData);
          botReply("TRANSMISSION SUCCESSFUL. REQUEST SECURELY DELIVERED. OPERATIVES ALERTED.", 2000);
        } catch (error) {
          botReply("WARNING: TRANSMISSION INTERFERENCE (EMAILJS NOT CONFIGURED LOCALLY). DATA LOGGED OFFLINE.", 2000);
        } finally {
          setIsSubmitting(false);
        }
        break;

      default:
        botReply("YOUR TRANSMISSION IS ALREADY BEING PROCESSED. MAINTAIN CURRENT POSITION.");
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
    <>
      {/* Floating Action Button (Radar Style) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => {
              setIsOpen(true);
              if (!hasOpened) {
                setHasOpened(true);
                startConversation();
              }
            }}
            className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-[#000000] border border-[#E50914] text-[#E50914] shadow-[0_0_20px_rgba(229,9,20,0.3)] hover:shadow-[0_0_30px_rgba(229,9,20,0.6)] transition-all flex items-center justify-center group interactive overflow-hidden"
          >
            <div className="absolute inset-0 border border-[#E50914]/50 rounded-full animate-ping opacity-50" />
            <Activity size={24} className="group-hover:scale-110 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Intelligence Terminal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[350px] sm:w-[450px] h-[600px] max-h-[85vh] flex flex-col bg-[#000000]/95 backdrop-blur-xl border border-[#E50914]/40 shadow-[0_0_50px_rgba(229,9,20,0.2)] font-mono overflow-hidden"
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#1F1F1F] border-b border-[#E50914]/30 relative overflow-hidden">
              {/* Scanline effect on header */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#E50914]/10 to-transparent w-full h-full animate-[translate_2s_infinite_linear]" style={{ animationName: 'scanHorizontal' }} />
              
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-10 h-10 rounded-full border border-[#E50914] flex items-center justify-center bg-[#E50914]/10 relative">
                  <Terminal size={18} className="text-[#E50914]" />
                  {isTyping && (
                    <motion.div 
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} 
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute inset-0 rounded-full border border-[#E50914]" 
                    />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-[#E50914] tracking-widest text-sm">G.A.I.A. COMM-LINK</h3>
                  <p className="text-[10px] text-[#E50914]/60 tracking-widest">
                    {isTyping ? "RECEIVING TRANSMISSION..." : "ENCRYPTED CHANNEL: ACTIVE"}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-[#E50914]/60 hover:text-[#E50914] transition-colors relative z-10 interactive"
              >
                <X size={24} />
              </button>
            </div>

            {/* Visual Waveform (Simulated Voice) */}
            <div className="h-12 border-b border-[#E50914]/20 bg-[#141414] flex items-center justify-center gap-1 overflow-hidden px-4">
              {Array.from({ length: 40 }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    height: isTyping ? [4, Math.random() * 24 + 8, 4] : 4,
                    opacity: isTyping ? 1 : 0.3
                  }}
                  transition={{ 
                    repeat: isTyping ? Infinity : 0, 
                    duration: 0.5 + Math.random() * 0.5,
                    delay: Math.random() * 0.2
                  }}
                  className="w-1.5 bg-[#E50914] rounded-full"
                />
              ))}
            </div>

            {/* Chat Log */}
            <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-6 scrollbar-thin scrollbar-thumb-[#E50914]/20 scrollbar-track-transparent">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: msg.sender === "user" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex flex-col max-w-[85%] ${msg.sender === "user" ? "self-end items-end" : "self-start items-start"}`}
                >
                  <span className="text-[10px] text-[#E50914]/50 mb-1 tracking-widest">
                    {msg.sender === "user" ? "OPERATIVE" : "G.A.I.A."} // {new Date(parseInt(msg.id)).toISOString().substring(11, 19)}
                  </span>
                  <div 
                    className={`px-4 py-3 text-sm tracking-wide border ${
                      msg.sender === "user" 
                        ? "bg-[#E50914]/10 text-white border-[#E50914]/30 text-right" 
                        : "bg-transparent text-[#E50914] border-l-2 border-l-[#E50914] border-y-transparent border-r-transparent"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Command Input Area */}
            <div className="p-4 bg-[#1F1F1F] border-t border-[#E50914]/30">
              <div className="flex items-center gap-3">
                <span className="text-[#E50914] opacity-70 animate-pulse">&gt;</span>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={step === "finished" ? "TRANSMISSION COMPLETE." : "INPUT COMMAND..."}
                  disabled={step === "finished" || isTyping || isSubmitting}
                  className="flex-1 bg-transparent text-[#E50914] text-sm tracking-widest placeholder-[#E50914]/30 focus:outline-none disabled:opacity-50 uppercase"
                  autoComplete="off"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || step === "finished" || isTyping || isSubmitting}
                  className="p-2 text-[#E50914] disabled:opacity-30 hover:bg-[#E50914]/20 transition-colors interactive border border-transparent hover:border-[#E50914]/50"
                >
                  {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                </button>
              </div>
            </div>

            <style jsx>{`
              @keyframes scanHorizontal {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
              }
            `}</style>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
