
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { GitGraph, Users, Sparkles, Scale, Library, FileCheck, Check, Clock, FileText, UploadCloud } from 'lucide-react';

export const FeaturesGrid = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
  };

  return (
    <div id="features" className="py-32 bg-[#FAFAFA] relative overflow-hidden">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-indigo-600 font-bold tracking-widest uppercase text-xs mb-4 block"
          >
            Regulatory Intelligence
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif text-gray-900 mb-6 leading-tight tracking-tight"
          >
            Your entire compliance team <br/> <span className="text-gray-400">in the cloud.</span>
          </motion.h2>
          <p className="text-xl text-gray-500 font-light leading-relaxed">
            Compliee isn't just a text editor. It's a governance engine that maps your documents directly to regulatory requirements and internal controls.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(320px,auto)] max-w-7xl mx-auto"
        >
          
          {/* Card 1: Control Mapping (Large) */}
          <motion.div variants={item} className="md:col-span-2 h-full">
            <SpotlightCard className="h-full relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500 transform group-hover:scale-110">
                    <GitGraph size={200} />
                </div>
                
                <div className="relative z-10 h-full flex flex-col">
                    <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-8 border border-indigo-100 shadow-sm group-hover:scale-110 transition-transform duration-500">
                        <GitGraph size={28} />
                    </div>
                    <h3 className="text-2xl font-serif text-gray-900 mb-3">Automated Control Mapping</h3>
                    <p className="text-gray-500 mb-10 max-w-md leading-relaxed text-sm md:text-base">Visualize how your policies satisfy specific controls in SOC 2, ISO 27001, and HIPAA. Identify gaps instantly.</p>
                    
                    <div className="mt-auto bg-gray-50/80 backdrop-blur rounded-2xl p-5 border border-gray-100 flex items-center gap-4 group-hover:border-indigo-100 transition-colors shadow-sm">
                        <div className="flex-1 space-y-3">
                            <div className="flex items-center justify-between text-xs mb-1">
                                <span className="font-bold text-gray-700">SOC 2 - CC6.1</span>
                                <span className="text-green-600 font-medium">Mapped</span>
                            </div>
                            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: "85%" }}
                                transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                                className="h-full bg-indigo-500 rounded-full"
                            />
                            </div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 shadow-sm border border-green-200 shrink-0">
                            <FileCheck size={18} />
                        </div>
                    </div>
                </div>
            </SpotlightCard>
          </motion.div>

          {/* Card 2: AI Audit Assistant */}
          <motion.div variants={item} className="h-full">
            <div className="h-full rounded-[2.5rem] p-10 bg-gradient-to-br from-indigo-600 to-blue-700 text-white relative overflow-hidden group shadow-2xl shadow-indigo-200/50 flex flex-col">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay"></div>
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-colors duration-500"></div>
                
                <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                        <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white mb-6 border border-white/20 shadow-inner group-hover:rotate-12 transition-transform duration-500">
                            <Sparkles size={28} />
                        </div>
                        <h3 className="text-2xl font-serif mb-3">AI Audit Assistant</h3>
                        <p className="text-indigo-100 text-sm leading-relaxed opacity-90 mb-6">
                            Real-time suggestions to reduce liability and ensure clarity before you ship.
                        </p>
                    </div>
                    
                    {/* Visual AI Suggestion */}
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 text-xs text-indigo-50"
                    >
                        <div className="flex gap-2 mb-2">
                            <span className="bg-red-500/20 text-red-200 px-1.5 py-0.5 rounded text-[10px]">Flagged</span>
                            <span className="text-[10px] opacity-70">Vague wording detected</span>
                        </div>
                        <p className="line-through opacity-50 mb-1">"We try to secure data..."</p>
                        <p className="font-medium text-white">"We implement commercially reasonable security measures..."</p>
                    </motion.div>
                </div>
            </div>
          </motion.div>

          {/* Card 3: Stakeholder Management */}
          <motion.div variants={item} className="h-full">
            <SpotlightCard className="h-full group flex flex-col">
                <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-6 border border-orange-100 group-hover:scale-110 transition-transform duration-300">
                    <Users size={24} />
                </div>
                <h3 className="text-xl font-serif text-gray-900 mb-2">Stakeholder Sign-offs</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">Track approvals from Legal, IT, and HR.</p>
                
                {/* Visual List */}
                <div className="mt-auto space-y-3">
                    <div className="flex items-center justify-between bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold">JD</div>
                            <span className="text-xs font-medium text-gray-700">Legal Team</span>
                        </div>
                        <motion.div 
                            initial={{ scale: 0 }} 
                            whileInView={{ scale: 1 }}
                            transition={{ delay: 1, type: "spring" }}
                            className="text-xs text-green-600 flex items-center gap-1 bg-green-50 px-1.5 py-0.5 rounded"
                        >
                            <Check size={10} /> Approved
                        </motion.div>
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-[10px] font-bold">AS</div>
                            <span className="text-xs font-medium text-gray-700">CISO</span>
                        </div>
                        <div className="text-xs text-amber-600 flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded"><Clock size={10} /> Pending</div>
                    </div>
                </div>
            </SpotlightCard>
          </motion.div>

          {/* Card 4: Framework Library */}
          <motion.div variants={item} className="h-full">
            <SpotlightCard className="h-full group flex flex-col">
                <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6 border border-purple-100 group-hover:scale-110 transition-transform duration-300">
                    <Library size={24} />
                </div>
                <h3 className="text-xl font-serif text-gray-900 mb-2">Framework Library</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">Templates for 50+ global standards.</p>
                
                {/* Visual Frameworks */}
                <div className="mt-auto grid grid-cols-2 gap-3">
                    {['ISO 27001', 'SOC 2', 'GDPR', 'HIPAA'].map(fw => (
                        <div key={fw} className="bg-gray-50 border border-gray-100 rounded-lg p-2 text-center hover:bg-purple-50 hover:border-purple-100 hover:text-purple-700 transition-colors">
                            <span className="text-xs font-bold text-gray-600">{fw}</span>
                        </div>
                    ))}
                </div>
            </SpotlightCard>
          </motion.div>

           {/* Card 5: Evidence Collection */}
           <motion.div variants={item} className="h-full">
            <SpotlightCard className="h-full md:col-span-1 group flex flex-col">
                <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 mb-6 border border-teal-100 group-hover:scale-110 transition-transform duration-300">
                    <Scale size={24} />
                </div>
                <h3 className="text-xl font-serif text-gray-900 mb-2">Evidence Collection</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">Attach logs directly to controls.</p>
                
                {/* Visual Evidence */}
                <div className="mt-auto bg-gray-50 rounded-xl p-3 border border-gray-100 border-dashed flex flex-col items-center justify-center gap-2 group-hover:border-teal-200 group-hover:bg-teal-50/30 transition-colors">
                    <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-200 flex items-center gap-2 w-full">
                        <div className="w-8 h-8 bg-red-50 text-red-500 rounded flex items-center justify-center"><FileText size={16}/></div>
                        <div className="min-w-0">
                            <div className="text-[10px] font-bold text-gray-700 truncate">audit_log_2026.pdf</div>
                            <div className="text-[10px] text-gray-400">2.4 MB</div>
                        </div>
                    </div>
                    <div className="text-[10px] text-gray-400 flex items-center gap-1">
                        <UploadCloud size={10} /> Drag & Drop
                    </div>
                </div>
            </SpotlightCard>
           </motion.div>

        </motion.div>
      </div>
    </div>
  );
};

const SpotlightCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setOpacity(1);
  };

  const handleBlur = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleFocus}
      onMouseLeave={handleBlur}
      className={`relative bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-xl shadow-gray-200/40 overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-0"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(79,70,229,0.08), transparent 40%)`,
        }}
      />
      <div className="relative z-10 h-full">
          {children}
      </div>
    </div>
  );
};
