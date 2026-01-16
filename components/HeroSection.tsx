import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ChevronDown, Wand2, Shield, Lock, FileText, CheckCircle, Search } from 'lucide-react';

interface HeroSectionProps {
  onStartWriting?: () => void;
}

export const HeroSection = ({ onStartWriting }: HeroSectionProps) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const rotate1 = useTransform(scrollY, [0, 500], [-6, -12]);
  const rotate2 = useTransform(scrollY, [0, 500], [6, 12]);

  return (
    <div className="relative w-full min-h-[120vh] bg-gray-50 overflow-hidden">
      
      {/* Dynamic Aurora Background - Professional Blue Tones */}
      <div className="absolute inset-0 z-0">
         <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-blue-200/30 rounded-full blur-[120px] mix-blend-multiply animate-pulse" />
         <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-indigo-200/30 rounded-full blur-[100px] mix-blend-multiply animate-pulse" style={{ animationDelay: "2s" }} />
         <div className="absolute bottom-[20%] left-[20%] w-[50vw] h-[50vw] bg-cyan-100/30 rounded-full blur-[120px] mix-blend-multiply" />
      </div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center pt-48">
        
        {/* Floating Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="group cursor-pointer flex items-center gap-2 mb-10 bg-white/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/60 shadow-lg shadow-indigo-500/5 hover:bg-white/60 transition-all"
        >
          <span className="flex items-center justify-center w-5 h-5 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full text-white shadow-inner">
            <Shield size={10} />
          </span>
          <span className="text-gray-600 font-medium text-xs tracking-wide">Compliee 2.0 <span className="text-gray-400 mx-1">|</span> AI Governance Engine</span>
          <ChevronDown size={12} className="text-gray-400 group-hover:translate-y-0.5 transition-transform" />
        </motion.div>

        {/* Main Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl text-center font-serif leading-[0.95] text-gray-900 tracking-tighter mb-8 relative"
        >
          <span className="relative inline-block z-10">Regulatory writing</span>
          <br/>
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-b from-indigo-600 to-blue-800 z-10 pb-4">
             on autopilot.
          </span>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white/50 blur-3xl -z-10" />
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-600 text-xl md:text-2xl text-center max-w-xl font-light leading-relaxed mb-16"
        >
          The intelligent co-pilot that drafts policies, audits controls, and tracks legislation changes for modern compliance teams.
        </motion.p>

        {/* Hero Interactive Input */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full max-w-2xl relative z-20 group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-400 rounded-3xl opacity-30 blur-lg group-hover:opacity-50 transition-opacity duration-500 animate-gradient-x"></div>
          <div className="relative glass-panel bg-white/80 rounded-2xl p-2 shadow-2xl shadow-indigo-900/10 backdrop-blur-xl border border-white/60">
             <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 relative">
                    <Sparkles className="absolute top-4 left-4 text-indigo-500 animate-pulse" size={20} />
                    <input 
                      type="text" 
                      placeholder="Draft a data retention policy for GDPR..." 
                      className="w-full h-full min-h-[60px] pl-12 pr-4 bg-transparent outline-none text-lg text-gray-800 placeholder:text-gray-400 font-serif"
                    />
                </div>
                <button 
                   onClick={onStartWriting}
                   className="bg-[#111] hover:bg-black text-white px-8 py-4 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group/btn"
                >
                   <span>Draft Policy</span>
                   <Wand2 size={16} className="group-hover/btn:rotate-12 transition-transform"/>
                </button>
             </div>
             
             {/* Micro-interaction tags */}
             <div className="hidden md:flex gap-2 px-4 pb-2 pt-2">
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold py-1">Frameworks:</span>
                {['SOC 2', 'ISO 27001', 'HIPAA', 'GDPR'].map(tag => (
                    <button key={tag} className="text-xs text-gray-500 bg-gray-100/50 hover:bg-indigo-50 hover:text-indigo-600 px-2 py-1 rounded-md border border-transparent hover:border-indigo-100 transition-colors">
                        {tag}
                    </button>
                ))}
             </div>
          </div>
        </motion.div>

        {/* Floating Element Left (Compliance Score) */}
        <motion.div 
          style={{ y: y1, rotate: rotate1 }}
          className="absolute top-1/3 left-[5%] xl:left-[10%] hidden lg:block"
        >
          <div className="w-64 bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/50 transition-transform hover:scale-105 duration-300">
             <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-green-50 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center">
                   <Shield size={20} className="text-green-600" />
                </div>
                <div>
                   <h4 className="font-bold text-gray-800 text-sm">Audit Readiness</h4>
                   <p className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full inline-block mt-0.5">Passing</p>
                </div>
             </div>
             <div className="space-y-2">
                <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Control Coverage</span>
                    <span className="font-bold text-gray-900">92%</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full w-[92%] bg-green-500 rounded-full" />
                </div>
                <div className="flex justify-between text-[10px] text-gray-400 font-medium">
                    <span>Gap Analysis</span>
                    <span>2 Low Risks</span>
                </div>
             </div>
          </div>
        </motion.div>

        {/* Floating Element Right (Document Status) */}
        <motion.div 
          style={{ y: y2, rotate: rotate2 }}
          className="absolute top-1/4 right-[5%] xl:right-[10%] hidden lg:block"
        >
          <div className="w-60 bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,255,0.15)] p-6 border border-white/60 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
             <div className="flex justify-between items-center mb-4">
                 <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Draft</span>
                 <div className="flex items-center gap-1 text-[10px] text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full font-bold">
                    <Wand2 size={8} /> AI Active
                 </div>
             </div>
             
             <div className="space-y-3 mb-4">
                 <div className="w-full h-2 bg-gray-100 rounded-full" />
                 <div className="w-full h-2 bg-gray-100 rounded-full" />
                 <div className="w-2/3 h-2 bg-gray-100 rounded-full" />
             </div>

             <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-400">
                    <FileText size={14} />
                </div>
                <div>
                    <div className="text-xs font-bold text-gray-700">Access Policy</div>
                    <div className="text-[10px] text-gray-400">SOC 2 • CC 6.1</div>
                </div>
                <div className="ml-auto text-green-500">
                    <CheckCircle size={14} />
                </div>
             </div>
          </div>
        </motion.div>

      </div>
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-50 to-transparent z-10" />
    </div>
  );
};