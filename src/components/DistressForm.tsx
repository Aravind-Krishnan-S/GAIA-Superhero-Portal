"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, ShieldAlert, X } from "lucide-react";
import emailjs from '@emailjs/browser';
import SciFiPanel from "./SciFiPanel";

interface DistressFormProps {
  beacon: { lat: number; lng: number } | null;
  onClose: () => void;
  isVisible: boolean;
}

export default function DistressForm({ beacon, onClose, isVisible }: DistressFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [incidentType, setIncidentType] = useState("");
  const [threatLevel, setThreatLevel] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!beacon) {
      alert("PLEASE SELECT LOCATION PARAMETERS.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

      if (serviceId && templateId && publicKey) {
        const payload = {
          name: contact || "Anonymous Operative",
          email: email,
          user_name: contact || "Anonymous Operative",
          user_email: email,
          to_email: email,
          reply_to: email,
          recipient_email: email,
          title: `[${threatLevel}] ${incidentType} at ${beacon.lat.toFixed(4)}, ${beacon.lng.toFixed(4)}`,
          description: description,
          severity: threatLevel
        };
        await emailjs.send(serviceId, templateId, payload, publicKey);
      } else {
        console.warn("EmailJS credentials missing. Check your .env.local file. Simulating request.");
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      
      setIsSubmitting(false);
      setIsSuccess(true);
      
      setTimeout(() => {
        onClose();
        // Reset form is handled on mount usually, but we'll reset here too
        setIncidentType("");
        setThreatLevel("");
        setDescription("");
        setEmail("");
        setContact("");
        setIsSuccess(false);
      }, 4000);
      
    } catch (error) {
      console.error("EmailJS Error in DistressProtocol:", error);
      setIsSubmitting(false);
      alert("TRANSMISSION FAILED. INTERFERENCE DETECTED.");
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <SciFiPanel
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="w-[350px] md:w-[450px]"
          innerClassName="flex flex-col font-mono text-left"
        >
          {/* Header */}
          <div className="p-4 border-b border-[#E50914]/30 flex justify-between items-start bg-[#E50914]/5">
            <div>
              <h2 className="text-lg font-bold text-[#E50914] tracking-widest flex items-center gap-2">
                <ShieldAlert size={18} className="animate-pulse" />
                DISTRESS PROTOCOL
              </h2>
              <p className="text-[#E50914]/60 text-[10px] tracking-widest mt-1">
                WARNING: CLASS-A FELONY FOR FALSE TRANSMISSIONS
              </p>
            </div>
            <button 
              onClick={(e) => { e.preventDefault(); onClose(); }}
              className="text-[#E50914]/60 hover:text-[#E50914] transition-colors p-1"
            >
              <X size={18} />
            </button>
          </div>

          {/* Form Content */}
          <div className="p-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
            {isSuccess ? (
              <div className="py-8 flex flex-col items-center justify-center text-center space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#E50914] rounded-full animate-ping opacity-20" />
                  <div className="w-16 h-16 border border-[#E50914] rounded-full flex items-center justify-center bg-[#E50914]/10">
                    <AlertTriangle className="w-8 h-8 text-[#E50914]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#E50914] tracking-widest mb-1">SIGNAL RECEIVED</h3>
                  <p className="text-[#E50914]/60 text-[10px] tracking-widest">
                    G.A.I.A. CORE HAS REGISTERED THE ANOMALY.<br/>
                    OPERATIVES DISPATCHED TO YOUR SECTOR.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[9px] text-[#E50914] tracking-widest">INCIDENT TYPE</label>
                    <select 
                      required
                      value={incidentType}
                      onChange={(e) => setIncidentType(e.target.value)}
                      className="w-full bg-[#E50914]/5 border border-[#E50914]/30 text-[#E50914] p-2 text-[10px] tracking-widest focus:outline-none focus:border-[#E50914] appearance-none"
                    >
                      <option value="" disabled>SELECT TYPE</option>
                      <option value="VILLAIN">HOSTILE ENTITY</option>
                      <option value="ANOMALY">SPATIAL ANOMALY</option>
                      <option value="TECH">ROGUE AI/TECH</option>
                      <option value="BIO">BIO-HAZARD</option>
                      <option value="OTHER">UNKNOWN</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] text-[#E50914] tracking-widest">THREAT LEVEL</label>
                    <select 
                      required
                      value={threatLevel}
                      onChange={(e) => setThreatLevel(e.target.value)}
                      className="w-full bg-[#E50914]/5 border border-[#E50914]/30 text-[#E50914] p-2 text-[10px] tracking-widest focus:outline-none focus:border-[#E50914] appearance-none"
                    >
                      <option value="" disabled>ASSESS THREAT</option>
                      <option value="GAMMA">GAMMA (LOCAL)</option>
                      <option value="BETA">BETA (CITY)</option>
                      <option value="ALPHA">ALPHA (NATIONAL)</option>
                      <option value="OMEGA">OMEGA (GLOBAL)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] text-[#E50914] tracking-widest">TACTICAL SITUATION</label>
                  <textarea 
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="DETAIL HOSTILES, CASUALTIES, AND HAZARDS..."
                    className="w-full min-h-[80px] bg-[#E50914]/5 border border-[#E50914]/30 text-[#E50914] placeholder-[#E50914]/30 p-2 text-[10px] tracking-widest focus:outline-none focus:border-[#E50914] resize-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] text-[#E50914] tracking-widest">UPLINK EMAIL (REQUIRED)</label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="OPERATIVE@GAIA.COM"
                    className="w-full bg-[#E50914]/5 border border-[#E50914]/30 text-[#E50914] placeholder-[#E50914]/30 p-2 text-[10px] tracking-widest focus:outline-none focus:border-[#E50914]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] text-[#E50914] tracking-widest">CONTACT ID (OPTIONAL)</label>
                  <input 
                    type="text" 
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="CITIZEN ID OR CALLSIGN"
                    className="w-full bg-[#E50914]/5 border border-[#E50914]/30 text-[#E50914] placeholder-[#E50914]/30 p-2 text-[10px] tracking-widest focus:outline-none focus:border-[#E50914]"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 mt-2 text-xs font-bold tracking-widest transition-all ${
                    isSubmitting 
                      ? 'bg-transparent border border-[#E50914]/30 text-[#E50914]/50 cursor-not-allowed'
                      : 'bg-[#E50914]/10 border border-[#E50914] text-[#E50914] hover:bg-[#E50914] hover:text-[#050505] shadow-[0_0_15px_rgba(229, 9, 20,0.2)]'
                  }`}
                >
                  {isSubmitting ? 'TRANSMITTING...' : 'INITIATE BEACON'}
                </button>
              </form>
            )}
          </div>
        </SciFiPanel>
      )}
    </AnimatePresence>
  );
}
