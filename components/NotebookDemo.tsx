
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Box, Wand2, Shield, AlertCircle, MoreHorizontal } from 'lucide-react';

export const NotebookDemo = () => {
  return (
    <div className="py-32 bg-[#E9E9EB] relative overflow-hidden">
      
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
         
         <div className="text-center mb-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">Audit-ready. <br/> From day one.</h2>
                <p className="text-gray-500">The interface clears the clutter so you can focus on governance.</p>
            </motion.div>
         </div>

         <motion.div 
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-6xl relative"
         >
             {/* iPad/Device Frame */}
             <div className="relative bg-gray-900 rounded-[2.5rem] p-3 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border border-gray-800">
                 
                 {/* Camera Dot */}
                 <div className="absolute top-1/2 left-3 w-1.5 h-1.5 rounded-full bg-gray-800 hidden md:block"></div>

                 <div className="bg-white rounded-[2rem] overflow-hidden flex flex-col md:flex-row h-[750px] w-full relative">
                     
                     {/* Sidebar (Left) */}
                     <div className="hidden md:flex w-64 bg-gray-50 border-r border-gray-200 flex-col p-4">
                         <div className="flex items-center gap-2 mb-8 px-2 pt-2">
                             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                                <Shield size={16} />
                             </div>
                             <span className="font-bold text-gray-800 text-sm">Compliee</span>
                         </div>
                         
                         <div className="space-y-1">
                             <div className="flex items-center justify-between px-3 py-2 bg-blue-100/50 text-blue-700 rounded-lg text-sm font-medium cursor-pointer">
                                 <span>Document</span>
                                 <span className="bg-blue-200 text-blue-800 text-[10px] px-1.5 rounded">v2.1</span>
                             </div>
                             <div className="flex items-center justify-between px-3 py-2 hover:bg-gray-100 text-gray-600 rounded-lg text-sm cursor-pointer transition-colors">
                                 <span>Controls</span>
                             </div>
                             <div className="flex items-center justify-between px-3 py-2 hover:bg-gray-100 text-gray-600 rounded-lg text-sm cursor-pointer transition-colors">
                                 <span>Evidence</span>
                             </div>
                             <div className="flex items-center justify-between px-3 py-2 hover:bg-gray-100 text-gray-600 rounded-lg text-sm cursor-pointer transition-colors">
                                 <span>Risk Register</span>
                             </div>
                         </div>

                         <div className="mt-auto p-4 bg-gray-100 rounded-xl">
                            <h5 className="text-xs font-bold text-gray-500 uppercase mb-2">Compliance Score</h5>
                            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mb-1">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "85%" }}
                                    transition={{ duration: 1.5, delay: 0.5 }}
                                    className="h-full bg-green-500 rounded-full"
                                ></motion.div>
                            </div>
                            <div className="flex justify-between text-[10px] text-gray-400">
                                <span>85/100</span>
                                <span>Good</span>
                            </div>
                         </div>
                     </div>

                     {/* Main Editor (Right) */}
                     <div className="flex-1 bg-white relative flex flex-col">
                         
                         {/* Editor Toolbar */}
                         <div className="h-16 border-b border-gray-100 flex items-center justify-between px-8 bg-white/80 backdrop-blur sticky top-0 z-10">
                             <div className="flex items-center gap-4 text-gray-400">
                                 <span className="text-sm font-serif italic text-gray-800">Section 4: Data Retention</span>
                                 <span className="text-gray-300">|</span>
                                 <span className="text-xs">Audit pending</span>
                             </div>
                             <div className="flex gap-4">
                                 <MoreHorizontal size={20} className="text-gray-400 hover:text-gray-600 cursor-pointer"/>
                             </div>
                         </div>

                         {/* Editor Content */}
                         <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
                             <div className="max-w-2xl mx-auto prose prose-lg prose-slate prose-p:text-gray-600 prose-headings:font-serif prose-headings:font-normal">
                                 <h1 className="text-4xl text-gray-900 mb-8">Data Retention Document</h1>
                                 <p>
                                     Personal Data shall not be retained for longer than is necessary for the purposes for which it is processed. This period typically aligns with statutory limitation periods or specific regulatory requirements.
                                 </p>
                                 <p>
                                     The Controller must conduct periodic reviews to determine whether retained data is still required.
                                 </p>
                                 
                                 {/* Interactive AI Highlight */}
                                 <div className="relative group cursor-pointer my-8">
                                    <motion.div 
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        transition={{ delay: 1 }}
                                        className="absolute -inset-2 bg-amber-50 rounded-lg"
                                    ></motion.div>
                                    <div className="relative border-l-2 border-amber-400 pl-4 py-1">
                                        <p className="text-gray-800">
                                            Exceptions to this document may be granted by the Chief Information Security Officer (CISO) on a case-by-case basis.
                                        </p>
                                        
                                        {/* Floating AI Action */}
                                        <motion.div 
                                            initial={{ opacity: 0, x: 20, rotateX: 20 }}
                                            whileInView={{ opacity: 1, x: 0, rotateX: 0 }}
                                            transition={{ delay: 1.5, type: "spring" }}
                                            className="absolute -right-32 top-0 bg-white shadow-xl rounded-lg p-3 w-48 border border-gray-100 z-20"
                                        >
                                            <div className="flex items-center gap-2 mb-2 text-xs text-amber-600 font-bold">
                                                <AlertCircle size={12}/> Risk Flag
                                            </div>
                                            <p className="text-[10px] text-gray-500 leading-relaxed mb-2">
                                                Granting exceptions without a defined expiration date creates indefinite liability under GDPR Art 5(1)(e).
                                            </p>
                                            <button className="w-full bg-amber-50 text-amber-700 text-[10px] font-medium py-1 rounded hover:bg-amber-100 animate-pulse">
                                                Auto-Remediate
                                            </button>
                                        </motion.div>
                                    </div>
                                 </div>

                                 <p>
                                     Upon expiration of the retention period, data must be securely deleted or anonymized in accordance with the Data Destruction Standard (ISO 27001 A.11.2.7).
                                 </p>
                                 <p>
                                     Logs of destruction must be maintained for audit purposes for a minimum of 3 years.
                                 </p>
                             </div>
                             
                             {/* Bottom Padding */}
                             <div className="h-32"></div>
                         </div>

                         {/* Floating Action Bar */}
                         <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-full px-2 py-2 flex items-center gap-1 ring-1 ring-black/5">
                             <button className="p-3 hover:bg-gray-100 rounded-full text-gray-500 hover:text-blue-600 transition-colors tooltip" title="Compliance Check">
                                 <Shield size={20} />
                             </button>
                             <div className="w-px h-6 bg-gray-200 mx-1"></div>
                             <button className="p-3 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
                                 <Wand2 size={20} />
                             </button>
                             <button className="p-3 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
                                 <MoreHorizontal size={20} />
                             </button>
                         </div>

                     </div>

                 </div>
             </div>
         </motion.div>

      </div>
    </div>
  );
};
