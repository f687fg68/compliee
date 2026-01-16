import React from 'react';
import { motion } from 'framer-motion';
import { GitGraph, Users, Sparkles, Scale, Library, FileCheck } from 'lucide-react';

export const FeaturesGrid = () => {
  return (
    <div id="features" className="py-32 bg-gray-50 relative">
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-indigo-600 font-semibold tracking-wider uppercase text-xs mb-4 block"
          >
            Regulatory Intelligence
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif text-gray-900 mb-6 leading-tight"
          >
            Your entire compliance team <br/> in the cloud.
          </motion.h2>
          <p className="text-xl text-gray-500 font-light leading-relaxed">
            Compliee isn't just a text editor. It's a governance engine that maps your documents directly to regulatory requirements and internal controls.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">
          
          {/* Card 1: Control Mapping (Large) */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-2 bg-white rounded-[2rem] p-10 border border-gray-100 shadow-xl shadow-gray-200/50 relative overflow-hidden group"
          >
             <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
                <GitGraph size={120} />
             </div>
             
             <div className="relative z-10">
                 <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6">
                    <GitGraph size={24} />
                 </div>
                 <h3 className="text-2xl font-serif text-gray-900 mb-2">Automated Control Mapping</h3>
                 <p className="text-gray-500 mb-8 max-w-md">Visualize how your policies satisfy specific controls in SOC 2, ISO 27001, and HIPAA. Identify gaps instantly.</p>
                 
                 <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex items-center gap-4">
                     <div className="flex-1 space-y-2">
                        <div className="h-2 w-3/4 bg-gray-200 rounded-full"></div>
                        <div className="h-2 w-1/2 bg-gray-200 rounded-full"></div>
                     </div>
                     <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <FileCheck size={16} />
                     </div>
                 </div>
             </div>
          </motion.div>

          {/* Card 2: AI Audit Assistant */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2rem] p-10 text-white relative overflow-hidden"
          >
             <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
             <Sparkles className="mb-6 opacity-80" size={32} />
             <h3 className="text-2xl font-serif mb-2">AI Audit Assistant</h3>
             <p className="text-indigo-100 text-sm leading-relaxed">
                Suggests improvements to language to reduce liability and ensure clarity.
             </p>
          </motion.div>

          {/* Card 3: Stakeholder Management */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-lg shadow-gray-200/40"
          >
             <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 mb-6">
                <Users size={20} />
             </div>
             <h3 className="text-xl font-serif text-gray-900 mb-2">Stakeholder Sign-offs</h3>
             <p className="text-sm text-gray-500">Track approvals from Legal, IT, and HR in one unified timeline.</p>
          </motion.div>

          {/* Card 4: Framework Library */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-lg shadow-gray-200/40"
          >
             <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                <Library size={20} />
             </div>
             <h3 className="text-xl font-serif text-gray-900 mb-2">Framework Library</h3>
             <p className="text-sm text-gray-500">Pre-built templates for over 50+ global regulatory standards.</p>
          </motion.div>

           {/* Card 5: Evidence Collection */}
           <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-1 bg-white rounded-[2rem] p-8 border border-gray-100 shadow-lg shadow-gray-200/40 flex flex-col justify-between"
          >
             <div>
                <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 mb-6">
                    <Scale size={20} />
                </div>
                <h3 className="text-xl font-serif text-gray-900 mb-2">Evidence Collection</h3>
                <p className="text-sm text-gray-500">Attach screenshots and logs directly to control statements.</p>
             </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};