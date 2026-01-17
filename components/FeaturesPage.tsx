
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Wand2, FileText, Image as ImageIcon, ScanLine, Shield, 
  ArrowLeft, Search, Save, Layout, GitGraph,
  CheckCircle2, Command, Cpu, MousePointerClick,
  Book, PenTool, Zap, Globe, Lock, BrainCircuit
} from 'lucide-react';

interface FeaturesPageProps {
  onBack: () => void;
}

export const FeaturesPage = ({ onBack }: FeaturesPageProps) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-gray-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden">
      
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-xl border-b border-gray-100 z-50 flex items-center justify-between px-6 md:px-12 transition-all">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={onBack}>
           <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:scale-105 transition-transform">
              <Shield size={20} />
           </div>
           <div>
             <span className="font-serif font-bold text-xl block leading-none">Compliee</span>
             <span className="text-[10px] text-gray-500 font-medium tracking-wider uppercase">Compliance OS</span>
           </div>
        </div>
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-gray-900 transition-all bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 px-5 py-2.5 rounded-full shadow-sm"
        >
          <ArrowLeft size={16} />
          <span>Back to Dashboard</span>
        </button>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-48 pb-32 px-6 container mx-auto max-w-7xl">
        <div className="text-center max-w-4xl mx-auto relative z-10">
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
          >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-6">
                <Zap size={12} className="fill-indigo-600" />
                <span>Capabilities & Features</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-gray-900 mb-8 leading-[0.9] tracking-tight">
                Everything you need to <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-800">
                   write compliance.
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-500 font-light leading-relaxed max-w-2xl mx-auto mb-12">
                Compliee isn't just an editor. It's a specialized operating system designed to draft, visualize, and organize regulatory documentation at enterprise scale.
              </p>
          </motion.div>
        </div>

        {/* Abstract Backgrounds */}
        <motion.div style={{ y: y1, opacity }} className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-to-b from-indigo-50/50 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 max-w-6xl pb-32 space-y-40">
        
        {/* Capability 1: Drafting */}
        <section className="relative">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                className="order-2 lg:order-1"
              >
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-8 border border-blue-100 shadow-sm">
                      <PenTool size={28} />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">Generative Drafting</h2>
                  <p className="text-lg text-gray-600 leading-relaxed mb-8">
                      Stop writing policies from scratch. Our <strong>Gemini 3 Pro</strong> powered engine can draft entire 50-page handbooks. 
                      It understands the nuances of tone, structure, and legal formatting required for audits.
                      <br/><br/>
                      <span className="block text-sm text-gray-500 italic bg-gray-50 p-4 rounded-xl border border-gray-100">
                         "True compliance requires detail. Our generation process prioritizes depth and accuracy over speed, taking the time necessary to produce comprehensive, 20+ page audit-ready documentation."
                      </span>
                  </p>
                  
                  <ul className="space-y-4">
                    <FeaturePoint icon={Book} title="Complete Books" desc="Draft multi-chapter compliance books with a single prompt." />
                    <FeaturePoint icon={Globe} title="Framework Aware" desc="Contextually aware of GDPR, SOC 2, HIPAA, and ISO 27001 requirements." />
                    <FeaturePoint icon={BrainCircuit} title="Auto-Refinement" desc="Highlight any paragraph to instantly rewrite it for clarity or formality." />
                  </ul>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="order-1 lg:order-2 relative"
              >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-[2.5rem] rotate-3 opacity-10"></div>
                  <div className="bg-white border border-gray-200 rounded-[2.5rem] p-8 shadow-2xl relative z-10 overflow-hidden">
                      <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
                          <div className="flex gap-2">
                             <div className="w-3 h-3 rounded-full bg-red-400"></div>
                             <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                             <div className="w-3 h-3 rounded-full bg-green-400"></div>
                          </div>
                          <div className="text-xs font-mono text-gray-400">AI_DRAFTER_V2.exe</div>
                      </div>
                      <div className="space-y-6 font-serif">
                          <div className="bg-indigo-50 p-4 rounded-xl rounded-tl-none border border-indigo-100 w-3/4">
                              <p className="text-sm text-indigo-900 font-medium">"Draft a Disaster Recovery Plan focusing on data backup procedures."</p>
                          </div>
                          <div className="space-y-3 pl-4 border-l-2 border-gray-100">
                               <h3 className="text-xl font-bold text-gray-900">1. Data Backup Strategy</h3>
                               <div className="h-2 bg-gray-100 rounded w-full"></div>
                               <div className="h-2 bg-gray-100 rounded w-full"></div>
                               <div className="h-2 bg-gray-100 rounded w-5/6"></div>
                               <div className="h-2 bg-gray-100 rounded w-full"></div>
                          </div>
                          <div className="flex gap-2 mt-4">
                              <span className="px-2 py-1 bg-gray-100 rounded text-[10px] text-gray-500">RPO: 24h</span>
                              <span className="px-2 py-1 bg-gray-100 rounded text-[10px] text-gray-500">RTO: 4h</span>
                          </div>
                      </div>
                      {/* Floating Element */}
                      <motion.div 
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                        className="absolute bottom-8 right-8 bg-black text-white px-4 py-2 rounded-lg text-xs font-bold shadow-lg"
                      >
                         Generated in 2.4s
                      </motion.div>
                  </div>
              </motion.div>
           </div>
        </section>

        {/* Capability 2: Visuals */}
        <section className="relative">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.6 }}
                 viewport={{ once: true }}
                 className="bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl relative"
              >
                  <div className="bg-gray-800 rounded-[2rem] overflow-hidden relative aspect-square">
                      <img 
                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop" 
                        alt="Data visualization" 
                        className="w-full h-full object-cover opacity-60 mix-blend-overlay"
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                          <ImageIcon size={64} className="text-white/80 mb-6" />
                          <p className="text-white text-lg font-light tracking-wide">
                              "Generate a network topology diagram showing a DMZ and internal subnet."
                          </p>
                          <div className="mt-8 flex gap-2">
                             <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                             <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
                             <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200"></div>
                          </div>
                      </div>
                  </div>
              </motion.div>

              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
              >
                  <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-8 border border-purple-100 shadow-sm">
                      <ImageIcon size={28} />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">Visual Intelligence</h2>
                  <p className="text-lg text-gray-600 leading-relaxed mb-8">
                      A picture is worth a thousand compliance controls. Use our integrated image generation to create diagrams, architectural flows, and evidence placeholders directly in your documents.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:border-purple-200 transition-colors">
                          <h4 className="font-bold text-gray-900 mb-1">Network Diagrams</h4>
                          <p className="text-sm text-gray-500">Visualize complex cloud infrastructure.</p>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:border-purple-200 transition-colors">
                          <h4 className="font-bold text-gray-900 mb-1">Process Flows</h4>
                          <p className="text-sm text-gray-500">Map out data handling procedures.</p>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:border-purple-200 transition-colors">
                          <h4 className="font-bold text-gray-900 mb-1">Org Charts</h4>
                          <p className="text-sm text-gray-500">Define roles and responsibilities.</p>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:border-purple-200 transition-colors">
                          <h4 className="font-bold text-gray-900 mb-1">Evidence Mockups</h4>
                          <p className="text-sm text-gray-500">Generate placeholder evidence for training.</p>
                      </div>
                  </div>
              </motion.div>
           </div>
        </section>

        {/* Capability 3: OCR */}
        <section>
           <div className="bg-gradient-to-br from-gray-50 to-white rounded-[3rem] border border-gray-200 p-8 md:p-20 text-center overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-400"></div>
              
              <div className="max-w-3xl mx-auto relative z-10">
                  <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 mx-auto mb-8">
                      <ScanLine size={32} />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">Legacy to Digital (OCR)</h2>
                  <p className="text-xl text-gray-500 mb-10">
                      Have a PDF policy from 2015? Or a screenshot of a configuration? <br/>
                      Compliee extracts text from any file type so you can edit, update, and modernize your archives.
                  </p>
                  
                  <div className="flex flex-wrap justify-center gap-4">
                      <span className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 shadow-sm">.PDF Support</span>
                      <span className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 shadow-sm">Image Extraction</span>
                      <span className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 shadow-sm">Handwriting Recognition</span>
                  </div>
              </div>

              {/* Background Decoration */}
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-teal-100/50 rounded-full blur-3xl mix-blend-multiply"></div>
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-emerald-100/50 rounded-full blur-3xl mix-blend-multiply"></div>
           </div>
        </section>

        {/* Capability 4: Library */}
        <section className="pb-20">
            <motion.div 
               initial="hidden" 
               whileInView="visible" 
               viewport={{ once: true }}
               variants={staggerContainer}
               className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
                <div className="md:col-span-1">
                   <h2 className="text-4xl font-serif text-gray-900 mb-6">Built for scale.</h2>
                   <p className="text-gray-500 text-lg leading-relaxed">
                       Manage hundreds of documents without losing your mind. Our library system is designed for the modern Compliance Officer.
                   </p>
                </div>

                <FeatureCard 
                    title="Color-Coded Organization"
                    desc="Assign distinct colors to different frameworks or document types for instant visual recognition."
                    icon={Layout}
                    delay={0.1}
                />
                <FeatureCard 
                    title="Security Stamps"
                    desc="Mark documents as 'Confidential', 'Internal', or 'Public' with visual stamps."
                    icon={Lock}
                    delay={0.2}
                />
                <FeatureCard 
                    title="Version Control"
                    desc="Never lose a change. We track history and auto-save every keystroke to the cloud."
                    icon={GitGraph}
                    delay={0.3}
                />
                <FeatureCard 
                    title="PDF Export"
                    desc="One-click export to perfectly formatted PDFs, ready for auditor submission."
                    icon={FileText}
                    delay={0.4}
                />
            </motion.div>
        </section>

      </main>

      {/* CTA Footer */}
      <footer className="bg-[#0A0A0B] text-white py-24 relative overflow-hidden">
         <div className="container mx-auto px-6 text-center relative z-10">
             <h2 className="text-4xl md:text-6xl font-serif mb-8">Ready to modernize your compliance?</h2>
             <p className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto">
                 Join the platform that is changing how regulatory documents are written, managed, and audited.
             </p>
             <button 
                onClick={onBack}
                className="bg-white text-black hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
             >
                 Start Writing Now
             </button>
         </div>
         
         {/* Footer Gradient */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none"></div>
      </footer>

    </div>
  );
};

const FeaturePoint = ({ icon: Icon, title, desc }: any) => (
    <div className="flex gap-4 items-start p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-default">
        <div className="bg-white p-2 rounded-lg border border-gray-100 shadow-sm shrink-0 text-indigo-600">
            <Icon size={20} />
        </div>
        <div>
            <h4 className="font-bold text-gray-900 text-sm mb-1">{title}</h4>
            <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
        </div>
    </div>
);

const FeatureCard = ({ title, desc, icon: Icon, delay }: any) => (
    <motion.div 
        variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
        }}
        className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-gray-200/80 transition-all group"
    >
        <div className="w-12 h-12 bg-gray-50 group-hover:bg-indigo-600 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-white mb-6 transition-colors">
            <Icon size={24} />
        </div>
        <h3 className="font-serif font-bold text-xl text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-500 leading-relaxed text-sm">{desc}</p>
    </motion.div>
);
