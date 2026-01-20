
import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ArrowRight, Shield } from 'lucide-react';

interface HeroSectionProps {
  onStartWriting?: (prompt?: string) => void;
}

export const HeroSection = ({ onStartWriting }: HeroSectionProps) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleInputSubmit = () => {
      if (onStartWriting && inputValue.trim()) {
          onStartWriting(inputValue);
      }
  };

  return (
    <div className="relative w-full min-h-[110vh] bg-[#FAFAFA] overflow-hidden selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Dynamic Noise Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* Organic Aurora Background */}
      <motion.div style={{ opacity }} className="absolute inset-0 z-0">
         <div className="absolute top-[-10%] left-[10%] w-[70vw] h-[70vw] bg-gradient-to-r from-indigo-200/40 to-purple-200/40 rounded-full blur-[120px] mix-blend-multiply animate-blob" />
         <div className="absolute top-[20%] right-[-10%] w-[60vw] h-[60vw] bg-gradient-to-l from-blue-200/40 to-cyan-200/40 rounded-full blur-[100px] mix-blend-multiply animate-blob animation-delay-2000" />
         <div className="absolute bottom-[-10%] left-[30%] w-[60vw] h-[60vw] bg-gradient-to-t from-emerald-100/40 to-teal-100/40 rounded-full blur-[100px] mix-blend-multiply animate-blob animation-delay-4000" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center pt-32 md:pt-48">
        
        {/* Product Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 group cursor-pointer"
        >
          <div className="flex items-center gap-2 bg-white/60 backdrop-blur-xl px-4 py-1.5 rounded-full border border-gray-200/60 shadow-sm hover:shadow-md transition-all hover:scale-105 hover:bg-white/80">
             <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
             </div>
             <span className="text-[11px] font-bold text-gray-600 uppercase tracking-widest">Compliee 2.0</span>
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-10"
        >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[0.95] text-gray-900 tracking-tight mb-4">
              Compliance writing,
            </h1>
            <div className="relative inline-block">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[0.95] text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-gray-600 to-gray-400 bg-[length:200%_auto] animate-shimmer">
                  perfected by AI.
                </h1>
            </div>
        </motion.div>

        {/* --- ORCHESTRATION INPUT AREA --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full max-w-2xl relative z-30 mt-4 mb-16"
        >
          {/* Main Input Container */}
          <div 
            className={`
              relative bg-white/80 backdrop-blur-xl rounded-[2rem] p-2 transition-all duration-500
              ${isFocused 
                ? 'shadow-[0_20px_60px_-15px_rgba(79,70,229,0.2)] ring-1 ring-indigo-500/20 scale-[1.02]' 
                : 'shadow-[0_20px_40px_-20px_rgba(0,0,0,0.1)] hover:shadow-xl ring-1 ring-black/5'
              }
            `}
          >
             <div className="flex items-center pl-6 pr-2 h-16 md:h-20">
                
                {/* AI Icon */}
                <div className={`mr-5 transition-colors duration-500 ${isFocused ? 'text-indigo-600' : 'text-gray-400'}`}>
                    <Sparkles size={24} className={inputValue ? "animate-pulse" : ""} strokeWidth={1.5} />
                </div>

                {/* Text Input */}
                <input 
                  type="text" 
                  value={inputValue}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleInputSubmit()}
                  placeholder="Draft a Data Retention Policy for GDPR..." 
                  className="flex-1 h-full bg-transparent outline-none text-xl md:text-2xl text-gray-900 placeholder:text-gray-300 font-medium font-sans tracking-tight"
                />

                {/* Action Button */}
                <button 
                   onClick={handleInputSubmit}
                   className={`
                     h-12 md:h-14 px-6 md:px-8 rounded-[1.2rem] font-bold text-sm md:text-base transition-all duration-500 flex items-center gap-2 group overflow-hidden relative
                     ${inputValue.trim() 
                        ? 'bg-gray-900 text-white shadow-lg hover:shadow-xl hover:scale-105 translate-x-0 opacity-100 w-auto' 
                        : 'bg-gray-100 text-gray-400 w-0 px-0 opacity-0 pointer-events-none'
                     }
                   `}
                >
                   <span className="whitespace-nowrap relative z-10">Start</span>
                   <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform relative z-10"/>
                   
                   {/* Button Shine Effect */}
                   <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"></div>
                </button>
             </div>
          </div>

          {/* Quick Start Tags */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mt-8"
          >
             <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mr-2">Or try:</span>
             {['SOC 2 Type II', 'ISO 27001', 'HIPAA', 'GDPR', 'Handbook'].map((tag, i) => (
                <button 
                  key={tag}
                  onClick={() => setInputValue(`Draft a comprehensive ${tag} policy document...`)}
                  className="px-4 py-2 rounded-xl bg-white/60 border border-gray-200/60 text-xs font-semibold text-gray-600 hover:text-indigo-600 hover:border-indigo-200 hover:bg-white transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
                >
                  {tag}
                </button>
             ))}
          </motion.div>
        </motion.div>


        {/* Floating Abstract Cards (Decorative) */}
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-[40%] left-[5%] xl:left-[12%] hidden lg:block -z-10"
        >
           <div className="bg-white/40 backdrop-blur-md border border-white/50 p-6 rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] rotate-[-6deg] hover:rotate-0 transition-transform duration-700">
              <Shield size={32} className="text-indigo-600 mb-4 drop-shadow-sm" />
              <div className="w-24 h-2 bg-gray-200/80 rounded-full mb-2"></div>
              <div className="w-16 h-2 bg-gray-200/80 rounded-full"></div>
           </div>
        </motion.div>

        <motion.div 
          style={{ y: y2 }}
          className="absolute top-[35%] right-[5%] xl:right-[12%] hidden lg:block -z-10"
        >
           <div className="bg-white/40 backdrop-blur-md border border-white/50 p-6 rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] rotate-[6deg] hover:rotate-0 transition-transform duration-700">
              <div className="flex gap-1.5 mb-4">
                 <div className="w-3 h-3 rounded-full bg-red-400 shadow-sm"></div>
                 <div className="w-3 h-3 rounded-full bg-amber-400 shadow-sm"></div>
                 <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-sm"></div>
              </div>
              <div className="w-24 h-2 bg-gray-200/80 rounded-full mb-2"></div>
              <div className="w-32 h-2 bg-gray-200/80 rounded-full"></div>
           </div>
        </motion.div>

      </div>
      
      {/* Smooth Fade at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#FAFAFA] to-transparent z-10 pointer-events-none" />
    </div>
  );
};
