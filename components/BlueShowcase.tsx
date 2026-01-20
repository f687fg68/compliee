
import React from 'react';
import { motion } from 'framer-motion';
import { Search, Globe, Scale, Shield, Compass, ExternalLink } from 'lucide-react';

export const BlueShowcase = () => {
  return (
    <div className="py-32 bg-[#050505] text-white overflow-hidden relative">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#111] via-[#050505] to-[#0a0a0a]"></div>
      <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20">
            
            {/* Text Content */}
            <div className="lg:w-1/3 space-y-8">
              <motion.div 
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 className="inline-flex items-center gap-2 border border-white/10 bg-white/5 px-3 py-1 rounded-full text-xs font-medium text-blue-300"
              >
                <Compass size={12} />
                <span>Legislative Tracking</span>
              </motion.div>
              <h2 className="text-5xl md:text-6xl font-serif leading-tight">
                Research that <br/> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 animate-pulse">mitigates risk.</span>
              </h2>
              <p className="text-xl text-gray-400 font-light leading-relaxed">
                Don't scour government databases manually. Compliee brings real-time regulatory changes directly into your sidebar, filtered for your industry.
              </p>
              
              <div className="pt-4">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 font-mono uppercase tracking-wider">
                      <span>Supported Sources</span>
                      <div className="h-px bg-gray-800 flex-1"></div>
                  </div>
                  <div className="flex gap-4">
                      {['EU', 'US', 'ISO'].map((l, i) => (
                          <motion.div 
                            key={l}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer border border-white/10"
                          >
                            <span className="font-serif font-bold">{l}</span>
                          </motion.div>
                      ))}
                  </div>
              </div>
            </div>

            {/* Interface Demo */}
            <div className="lg:w-2/3 w-full">
                <motion.div 
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="relative"
                >
                    {/* Glow behind the interface */}
                    <div className="absolute inset-0 bg-blue-500/20 blur-2xl -z-10 rounded-[30px]" />
                    
                    <div className="bg-[#0F0F11] border border-white/10 rounded-3xl p-2 shadow-2xl">
                        <div className="bg-[#151518] rounded-2xl p-6 md:p-8 min-h-[500px] text-gray-200 font-sans relative overflow-hidden">
                            
                            {/* Header */}
                            <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                                </div>
                                <div className="text-xs text-gray-500 font-mono">compliance_engine.tsx</div>
                            </div>

                            {/* Search Interaction */}
                            <div className="relative mb-8 z-10">
                                <div className="absolute inset-0 bg-blue-500/10 blur-xl rounded-full"></div>
                                <div className="bg-[#1A1A1E] border border-white/10 rounded-xl p-4 flex items-center gap-3 relative">
                                    <Search className="text-blue-400" size={18} />
                                    <input type="text" value="GDPR Article 17 Right to Erasure" readOnly className="bg-transparent text-white outline-none w-full font-medium" />
                                    <kbd className="hidden md:inline-flex items-center gap-1 px-2 py-1 bg-white/5 rounded border border-white/10 text-[10px] text-gray-400 font-sans">
                                        ENTER
                                    </kbd>
                                </div>
                            </div>

                            {/* Results Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2 md:col-span-1 space-y-4">
                                    <motion.div 
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="bg-[#1A1A1E] p-4 rounded-xl border border-white/5 hover:border-blue-500/30 transition-colors group cursor-pointer"
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex items-center gap-2 text-xs text-blue-300">
                                                <Globe size={12} />
                                                <span>EUR-Lex Database</span>
                                            </div>
                                            <ExternalLink size={12} className="text-gray-600 group-hover:text-white transition-colors"/>
                                        </div>
                                        <h4 className="font-semibold text-sm mb-1 text-gray-100">Right to Erasure ('Right to be Forgotten')</h4>
                                        <p className="text-xs text-gray-500 leading-relaxed">
                                            The data subject shall have the right to obtain from the controller the erasure of personal data concerning him or her without undue delay...
                                        </p>
                                    </motion.div>
                                    
                                     <motion.div 
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="bg-[#1A1A1E] p-4 rounded-xl border border-white/5 hover:border-blue-500/30 transition-colors group cursor-pointer"
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex items-center gap-2 text-xs text-purple-300">
                                                <Scale size={12} />
                                                <span>Case Law Precedent</span>
                                            </div>
                                        </div>
                                        <h4 className="font-semibold text-sm mb-2 text-gray-100">Google Spain v AEPD</h4>
                                        <div className="flex gap-2">
                                            <div className="px-2 py-1 bg-gray-800 rounded text-[10px] text-gray-400 border border-white/5">C-131/12</div>
                                            <div className="px-2 py-1 bg-gray-800 rounded text-[10px] text-gray-400 border border-white/5">Ruling</div>
                                        </div>
                                    </motion.div>
                                </div>

                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="hidden md:block bg-[#1A1A1E] p-4 rounded-xl border border-white/5 h-full relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/10 to-transparent pointer-events-none" />
                                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">AI Interpretation</h4>
                                    <div className="space-y-3">
                                        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                                            <motion.div initial={{ width: 0 }} whileInView={{ width: "100%" }} transition={{ duration: 1.5, ease: "easeInOut", delay: 0.8 }} className="h-full bg-gray-700 rounded-full" />
                                        </div>
                                        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                                            <motion.div initial={{ width: 0 }} whileInView={{ width: "100%" }} transition={{ duration: 1.2, ease: "easeInOut", delay: 1 }} className="h-full bg-gray-700 rounded-full" />
                                        </div>
                                        <div className="w-2/3 h-2 bg-gray-800 rounded-full overflow-hidden">
                                            <motion.div initial={{ width: 0 }} whileInView={{ width: "100%" }} transition={{ duration: 1, ease: "easeInOut", delay: 1.2 }} className="h-full bg-gray-700 rounded-full" />
                                        </div>
                                        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                                            <motion.div initial={{ width: 0 }} whileInView={{ width: "100%" }} transition={{ duration: 1.4, ease: "easeInOut", delay: 0.9 }} className="h-full bg-gray-700 rounded-full" />
                                        </div>
                                    </div>
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 2.2 }}
                                        className="mt-6 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg"
                                    >
                                        <p className="text-xs text-blue-200 leading-relaxed italic">
                                            "Critical: Data controllers must also take reasonable steps to inform other controllers processing the public data..."
                                        </p>
                                    </motion.div>
                                </motion.div>
                            </div>

                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
      </div>
    </div>
  );
};
