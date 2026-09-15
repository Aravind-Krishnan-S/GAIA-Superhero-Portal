"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from '@emailjs/browser';
import { Terminal, X, Minus, Square } from "lucide-react";

type Message = { sender: "android" | "user"; text: string };
type Step = "GREETING" | "NAME" | "AGE" | "EMAIL" | "GRIEVANCE" | "DONE";

export default function AndroidTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState<Step>("GREETING");
  
  const [userData, setUserData] = useState({
    name: "",
    age: "",
    location: "",
    email: "",
    grievance: ""
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom and maintain input focus
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    if (step !== "DONE") {
      inputRef.current?.focus();
    }
  }, [messages, step]);

  // Proactive greeting on mount
  useEffect(() => {
    // Open terminal automatically after a delay
    const timer = setTimeout(() => {
      setIsOpen(true);
      setTimeout(() => {
        addAndroidMessage("INITIALIZING UPLINK...");
        setTimeout(() => {
          addAndroidMessage("Connection established. I am Android, G.A.I.A.'s chief technical operative.");
          setTimeout(() => {
            addAndroidMessage("I detect you are accessing this portal for a reason. State your Name.");
            setStep("NAME");
          }, 1000);
        }, 1000);
      }, 500);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  const addAndroidMessage = (text: string) => {
    setMessages(prev => [...prev, { sender: "android", text }]);
  };

  const addUserMessage = (text: string) => {
    setMessages(prev => [...prev, { sender: "user", text }]);
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
    switch (step) {
      case "NAME":
        setUserData(prev => ({ ...prev, name: val }));
        setTimeout(() => {
          addAndroidMessage(`Acknowledged, ${val}. What is your Age?`);
          setStep("AGE");
        }, 500);
        break;
      case "AGE":
        setUserData(prev => ({ ...prev, age: val }));
        setTimeout(() => {
          addAndroidMessage(`Logged. Triangulating your coordinates...`);
          
          // Use Browser Geolocation API
          if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const lat = position.coords.latitude.toFixed(4);
                const lng = position.coords.longitude.toFixed(4);
                const loc = `LAT: ${lat}, LNG: ${lng}`;
                setUserData(prev => ({ ...prev, location: loc }));
                setTimeout(() => {
                  addAndroidMessage(`Coordinates locked: ${loc}.`);
                  setTimeout(() => {
                    addAndroidMessage(`We need a secure channel for updates. Enter your Email Address.`);
                    setStep("EMAIL");
                  }, 800);
                }, 500);
              },
              (error) => {
                setUserData(prev => ({ ...prev, location: "UNKNOWN SECTOR (Encrypted)" }));
                setTimeout(() => {
                  addAndroidMessage(`Signal encrypted. Location set to UNKNOWN SECTOR.`);
                  setTimeout(() => {
                    addAndroidMessage(`We need a secure channel for updates. Enter your Email Address.`);
                    setStep("EMAIL");
                  }, 800);
                }, 500);
              }
            );
          } else {
            setUserData(prev => ({ ...prev, location: "UNKNOWN SECTOR" }));
            setTimeout(() => {
              addAndroidMessage(`Sensor failure. Location set to UNKNOWN SECTOR.`);
              setTimeout(() => {
                addAndroidMessage(`We need a secure channel for updates. Enter your Email Address.`);
                setStep("EMAIL");
              }, 800);
            }, 500);
          }
        }, 500);
        break;
      case "EMAIL":
        setUserData(prev => ({ ...prev, email: val }));
        setTimeout(() => {
          addAndroidMessage(`Encrypted link secured.`);
          setTimeout(() => {
            addAndroidMessage(`So... tell me. How can I help you?`);
            setStep("GRIEVANCE");
          }, 800);
        }, 500);
        break;
      case "GRIEVANCE":
        setUserData(prev => ({ ...prev, grievance: val }));
        setTimeout(() => {
          addAndroidMessage(`Processing incident report...`);
          sendEmailPayload({ ...userData, grievance: val });
        }, 500);
        break;
      default:
        break;
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
        // Map the variables so they work with both the custom tactical templates and the default EmailJS templates
        const payload = {
          ...data,
          title: data.grievance, // Maps grievance to {{title}}
          description: data.grievance, // Maps grievance to {{description}}
          severity: "Pending Assessment"
        };
        await emailjs.send(serviceId, templateId, payload, publicKey);
      }
      
      addAndroidMessage(`[SUCCESS] Report submitted to G.A.I.A. Command. A tactical team will review it shortly. Stand by on your comms.`);
      setStep("DONE");
    } catch (error) {
      console.error("EmailJS Error:", error);
      addAndroidMessage(`[ERROR] Transmission failed. System interference detected.`);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            className="fixed bottom-4 right-4 p-4 rounded-sm bg-black border border-green-500 text-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)] z-50 hover:bg-green-500 hover:text-black transition-colors"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
          >
            <Terminal size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Terminal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`fixed right-4 z-50 bg-black/95 backdrop-blur-md border border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.1)] rounded-sm overflow-hidden flex flex-col font-mono text-sm sm:text-base ${
              isMinimized ? "bottom-4 w-72 h-12" : "bottom-4 w-[90vw] sm:w-[450px] h-[550px]"
            }`}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Terminal Header */}
            <div className="bg-[#0f172a] border-b border-green-500/30 px-4 py-2 flex justify-between items-center cursor-move">
              <div className="flex items-center gap-2 text-green-500/70 text-xs font-mono tracking-widest">
                <Terminal size={14} className="text-green-500" />
                <span>android@gaia:~/terminal</span>
              </div>
              <div className="flex gap-3 text-green-700">
                <button onClick={() => setIsMinimized(!isMinimized)} className="hover:text-green-400"><Minus size={14} /></button>
                <button onClick={() => setIsMinimized(false)} className="hover:text-green-400"><Square size={12} /></button>
                <button onClick={() => setIsOpen(false)} className="hover:text-red-500"><X size={14} /></button>
              </div>
            </div>

            {/* Terminal Body */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 terminal-scroll">
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[85%] ${msg.sender === "user" ? "text-slate-300" : "text-green-500 shadow-green-500/20 drop-shadow-md"}`}>
                        {msg.sender === "android" && <span className="opacity-50 mr-2 text-xs">{">"}</span>}
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {step === "DONE" && (
                    <div className="text-green-500 text-center mt-4 border border-green-500/30 bg-green-500/10 p-2 rounded-sm tracking-widest font-bold animate-pulse">
                      SESSION TERMINATED
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-[#0f172a]/30 border-t border-green-500/30">
                  <form onSubmit={handleSubmit} className="flex items-center gap-2">
                    <span className="text-green-500 font-bold animate-pulse">{">"}</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      disabled={step === "DONE"}
                      autoFocus
                      className="flex-1 bg-transparent border-none outline-none text-slate-200 placeholder-slate-600 font-mono"
                      placeholder={step !== "DONE" ? "Type response..." : "Session closed."}
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
