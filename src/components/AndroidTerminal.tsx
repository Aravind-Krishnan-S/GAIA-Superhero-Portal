"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from '@emailjs/browser';
import { Terminal, X, Minus, Square, Volume2, VolumeX } from "lucide-react";
import { heroes } from "@/data/heroes";

type Message = { sender: "android" | "user"; text: string };
type Step = "CHAT" | "REPORT_NAME" | "REPORT_EMAIL" | "REPORT_GRIEVANCE" | "DONE";

export default function AndroidTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState<Step>("CHAT");
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    grievance: ""
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom and maintain input focus
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    if (step !== "DONE" && isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [messages, step, isOpen, isMinimized]);

  // Load voices early
  useEffect(() => {
    if (typeof window !== "undefined" && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  const speakText = (text: string) => {
    if (!voiceEnabled) return;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      // Remove symbols/brackets from text before speaking for natural speech
      const cleanText = text.replace(/\[|\]/g, "");
      
      // Don't speak technical system messages
      if (cleanText.includes("INITIALIZING UPLINK") || cleanText.includes("SESSION TERMINATED") || cleanText.includes("SENDING PAYLOAD")) {
        return;
      }

      // Stop previous utterance
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(cleanText);
      const voices = window.speechSynthesis.getVoices();
      
      // Try to find a friendly female voice (like Zira, Samantha, Google UK English Female)
      const femaleVoice = voices.find(v => 
        v.name.includes("Zira") || 
        v.name.includes("Samantha") || 
        v.name.includes("Google UK English Female") || 
        v.name.includes("Female") ||
        (v.lang === "en-US" && v.name.includes("Google"))
      );
      
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }
      
      utterance.rate = 1.05; // Slightly fast, geeky pacing
      utterance.pitch = 1.2; // Slightly higher pitch
      window.speechSynthesis.speak(utterance);
    }
  };

  const addAndroidMessage = (text: string) => {
    setMessages(prev => [...prev, { sender: "android", text }]);
    speakText(text);
  };

  const addUserMessage = (text: string) => {
    setMessages(prev => [...prev, { sender: "user", text }]);
  };

  const handleOpenTerminal = () => {
    setIsOpen(true);
    // User interaction has occurred, browser will allow TTS now.
    setTimeout(() => {
      addAndroidMessage("INITIALIZING UPLINK...");
      setTimeout(() => {
        addAndroidMessage("Uplink established. I am A.N.D.R.O.I.D. V-1, a personal assistant created by Operative Android to manage team operations. How may I assist you?");
        setTimeout(() => {
          addAndroidMessage("You can ask me about our [Operatives], the [G.A.I.A.] charter, or if you're in trouble, type [Report] to file a distress beacon.");
        }, 3000);
      }, 1500);
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const val = input.trim();
    addUserMessage(val);
    setInput("");

    processInput(val);

    // Ensure input keeps focus after submission
    setTimeout(() => {
      inputRef.current?.focus();
    }, 10);
  };

  const processInput = (val: string) => {
    const lowerVal = val.toLowerCase();

    if (step === "CHAT") {
      // Check for report trigger
      if (lowerVal.includes("report") || lowerVal.includes("distress") || lowerVal.includes("help") || lowerVal.includes("incident") || lowerVal.includes("beacon")) {
        setTimeout(() => {
          addAndroidMessage("Oh, a distress beacon? Okay, I'm initiating the Incident Protocol. First, what's your name or callsign?");
          setStep("REPORT_NAME");
        }, 500);
        return;
      }

      // Check for Lore queries
      if (lowerVal.includes("gaia") || lowerVal.includes("g.a.i.a") || lowerVal.includes("corporate") || lowerVal.includes("charter")) {
        setTimeout(() => {
          addAndroidMessage("G.A.I.A. is basically the mega-corporation that holds the planetary charter for Earth. We keep the alien conglomerates from strip-mining the planet. Pretty stressful job, honestly.");
        }, 600);
        return;
      }

      if (lowerVal.includes("operative") || lowerVal.includes("superhero") || lowerVal.includes("heroes")) {
        setTimeout(() => {
          addAndroidMessage("Our Hero Roster has 4 Operatives: Spectre, Nymeria, Angel, and my creator, Android. You can ask me about any of them!");
        }, 600);
        return;
      }

      // Check for Hero queries
      for (const hero of heroes) {
        if (lowerVal.includes(hero.name.toLowerCase()) || (hero.id === "dream-princess" && lowerVal.includes("princess"))) {
          setTimeout(() => {
            addAndroidMessage(`Accessing file: ${hero.name.toUpperCase()}...`);
            setTimeout(() => {
              addAndroidMessage(`So, ${hero.name} is ranked ${hero.rank} with a threat level of ${hero.threatLevel}.`);
              setTimeout(() => {
                addAndroidMessage(hero.backstory);
              }, 1000);
            }, 800);
          }, 400);
          return;
        }
      }

      // Fallback
      setTimeout(() => {
        addAndroidMessage("Hmm, I didn't quite catch that. You can ask about our [Operatives], [G.A.I.A.], or type [Report] to file an incident.");
      }, 500);
    } 
    else if (step === "REPORT_NAME") {
      setUserData(prev => ({ ...prev, name: val }));
      setTimeout(() => {
        addAndroidMessage(`Got it, ${val}. I need a secure channel to reach you later. What's your email address?`);
        setStep("REPORT_EMAIL");
      }, 500);
    }
    else if (step === "REPORT_EMAIL") {
      setUserData(prev => ({ ...prev, email: val }));
      setTimeout(() => {
        addAndroidMessage(`Encrypted link secured! Okay, tell me everything. Describe the anomaly, hostile entity, or whatever situation you're in.`);
        setStep("REPORT_GRIEVANCE");
      }, 500);
    }
    else if (step === "REPORT_GRIEVANCE") {
      setUserData(prev => ({ ...prev, grievance: val }));
      setTimeout(() => {
        addAndroidMessage(`Processing incident report... hang tight.`);
        sendEmailPayload({ ...userData, grievance: val });
      }, 500);
    }
  };

  const sendEmailPayload = async (data: typeof userData) => {
    try {
      console.log("SENDING PAYLOAD VIA EMAILJS:", data);
      
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

      if (!serviceId || !templateId || !publicKey) {
        console.warn("EmailJS credentials missing. Check your .env.local file.");
        // Fallback for simulation if env vars are missing so the UI still works
        await new Promise(resolve => setTimeout(resolve, 1500));
      } else {
        const payload = {
          ...data,
          user_name: data.name,
          user_email: data.email,
          to_email: data.email,
          reply_to: data.email,
          recipient_email: data.email,
          title: data.grievance, 
          description: data.grievance, 
          severity: "Pending Assessment"
        };
        await emailjs.send(serviceId, templateId, payload, publicKey);
      }
      
      addAndroidMessage(`Success! Your report has been submitted to G.A.I.A. Command. A tactical team will review it shortly. Stay safe out there!`);
      setStep("DONE");
    } catch (error) {
      console.error("EmailJS Error:", error);
      addAndroidMessage(`Uh oh... transmission failed. Looks like some system interference. Maybe try again later?`);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            className="fixed bottom-6 right-6 p-4 rounded-full bg-[#050505] border border-[#E50914] text-[#E50914] shadow-[0_0_20px_rgba(229,9,20,0.4)] z-50 hover:bg-[#E50914] hover:text-[#050505] transition-all group"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={handleOpenTerminal}
          >
            <div className="absolute inset-0 bg-[#E50914] blur-md opacity-20 group-hover:opacity-60 transition-opacity rounded-full"></div>
            <Terminal size={28} className="relative z-10" />
            <div className="absolute -top-10 -right-2 bg-[#050505]/90 backdrop-blur-sm border border-[#E50914]/50 text-[#E50914] text-xs px-3 py-1 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-mono tracking-widest">
              [ CONTACT ANDROID ]
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Terminal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`fixed right-4 sm:right-6 z-50 bg-[#050505]/95 backdrop-blur-xl border border-[#E50914]/40 shadow-[0_0_40px_rgba(229,9,20,0.15)] rounded-lg overflow-hidden flex flex-col font-mono text-sm sm:text-base ${
              isMinimized ? "bottom-4 sm:bottom-6 w-72 h-12" : "bottom-4 sm:bottom-6 w-[92vw] sm:w-[450px] h-[600px] max-h-[85vh]"
            }`}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Terminal Header */}
            <div className="bg-[#050505] border-b border-[#E50914]/30 px-4 py-3 flex justify-between items-center cursor-move select-none">
              <div className="flex items-center gap-2 text-[#E50914]/80 text-xs font-mono tracking-widest">
                <Terminal size={14} className="text-[#E50914]" />
                <span>v1-assistant@gaia:~/comms</span>
              </div>
              <div className="flex items-center gap-4 text-[#E50914]/70">
                <button 
                  onClick={() => setVoiceEnabled(!voiceEnabled)} 
                  className="hover:text-[#E50914] transition-colors"
                  title={voiceEnabled ? "Mute Voice" : "Enable Voice"}
                >
                  {voiceEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                </button>
                <div className="w-px h-4 bg-[#E50914]/30"></div>
                <button onClick={() => setIsMinimized(!isMinimized)} className="hover:text-[#E50914] transition-colors"><Minus size={16} /></button>
                <button onClick={() => setIsMinimized(false)} className="hover:text-[#E50914] transition-colors"><Square size={14} /></button>
                <button onClick={() => setIsOpen(false)} className="hover:text-red-500 transition-colors ml-1"><X size={16} /></button>
              </div>
            </div>

            {/* Terminal Body */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 terminal-scroll bg-[linear-gradient(rgba(229,9,20,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(229,9,20,0.03)_1px,transparent_1px)] bg-[size:20px_20px]">
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                      <div className="flex gap-2 items-start max-w-[85%]">
                        {msg.sender === "android" && (
                          <div className="w-8 h-8 rounded-full overflow-hidden border border-[#E50914]/50 relative shrink-0 bg-[#E50914]/10 flex items-center justify-center mt-1">
                            <Image src="/chatbot-avatar.png" alt="A.N.D.R.O.I.D. V-1" fill className="object-cover p-[2px]" />
                          </div>
                        )}
                        <div className={`px-4 py-2 rounded-sm ${
                          msg.sender === "user" 
                            ? "bg-[#E50914]/10 text-[#F8F9FA] border border-[#E50914]/20 rounded-tr-none ml-auto" 
                            : "bg-[#050505] text-[#E50914] border border-[#E50914]/10 shadow-[0_2px_10px_rgba(229,9,20,0.05)] rounded-tl-none leading-relaxed"
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    </div>
                  ))}
                  {step === "DONE" && (
                    <div className="text-[#E50914] text-center mt-6 border border-[#E50914]/30 bg-[#E50914]/10 p-3 rounded-sm tracking-[0.2em] font-bold uppercase text-xs">
                      [ SECURE CONNECTION TERMINATED ]
                    </div>
                  )}
                  <div ref={messagesEndRef} className="h-2" />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-[#050505] border-t border-[#E50914]/30">
                  <form onSubmit={handleSubmit} className="flex items-center gap-3">
                    <span className="text-[#E50914] font-bold animate-[pulse_1s_ease-in-out_infinite]">{">"}</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      disabled={step === "DONE"}
                      autoFocus
                      className="flex-1 bg-transparent border-none outline-none text-[#F8F9FA] placeholder-white/30 font-mono text-sm"
                      placeholder={step !== "DONE" ? "Type your message..." : "Transmission ended."}
                    />
                  </form>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
