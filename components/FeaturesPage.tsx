
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Wand2, FileText, Image as ImageIcon, ScanLine, Shield, 
  ArrowLeft, Search, Save, Layout, GitGraph,
  CheckCircle2, Command, Cpu, MousePointerClick
} from 'lucide-react';

interface FeaturesPageProps {
  onBack: () => void;
}

export const FeaturesPage = ({ onBack }: FeaturesPageProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50 flex items-center justify-between px-6 md:px-12">
        <div className="flex items-center gap-2 cursor-pointer" onClick={onBack}>
           <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
              <Shield size={16} />
           </div>
           <span className="font-serif font-bold text-lg">Compliee</span>
        </div>
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </button>
      </nav>

      {/* Hero Section */}
      <header className="pt-40 pb-20 px-6 container mx-auto max-w-5xl text-center">
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
        >
            <span className="text-indigo-600 font-semibold tracking-wider uppercase text-xs mb-4 block">
              User Guide & Capabilities
            </span>
            <h1 className="text-5xl md:text-7xl font-serif text-gray-900 mb-8 leading-tight">
              Mastering the <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Compliance Engine</span>
            </h1>
            <p className="text-xl text-gray-500 font-light leading-relaxed max-w-2xl mx-auto">
              A complete guide to using Compliee's AI Orchestrator, visual generation tools, and document management system.
            </p>
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 max-w-5xl pb-32 space-y-32">
        
        {/* Feature 1: AI Orchestrator */}
        <section>
           <motion.div 
             variants={containerVariants}
             initial="hidden"
             whileInView="show"
             viewport={{ once: true, margin: "-100px" }}
             className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
           >
              <div className="order-2 md:order-1 space-y-8">
                  <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                      <Cpu size={24} />
                  </div>
                  <div>
                      <h2 className="text-3xl font-serif mb-4">The AI Orchestrator</h2>
                      <p className="text-gray-500 leading-relaxed text-lg">
                          At the heart of Compliee is a multi-model AI agent capable of drafting complex regulatory documents, SOPs, and policies. It understands context from over 15 distinct compliance frameworks including GDPR, SOC 2, and ISO 27001.
                      </p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                      <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <MousePointerClick size={16} className="text-indigo-500"/> How to use
                      </h3>
                      <ol className="space-y-4 text-gray-600 text-sm">
                          <li className="flex gap-3">
                              <span className="bg-white border border-gray-200 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0">1</span>
                              <span>Open the Editor by creating a new document or opening an existing one.</span>
                          </li>
                          <li className="flex gap-3">
                              <span className="bg-white border border-gray-200 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0">2</span>
                              <span>Click the <strong className="text-gray-900">Wand Icon</strong> in the floating bottom toolbar or press the AI Assist button.</span>
                          </li>
                          <li className="flex gap-3">
                              <span className="bg-white border border-gray-200 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0">3</span>
                              <span>Type a command like: <em className="text-indigo-600">"Draft a Data Retention Policy for GDPR"</em> or <em className="text-indigo-600">"Create a Risk Assessment Matrix"</em>.</span>
                          </li>
                          <li className="flex gap-3">
                              <span className="bg-white border border-gray-200 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0">4</span>
                              <span>Press Enter. The AI will stream the formatted HTML directly into your document.</span>
                          </li>
                      </ol>
                  </div>
              </div>

              <div className="order-1 md:order-2 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden h-[500px] flex flex-col justify-center">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px]" />
                  <div className="relative z-10 space-y-4">
                      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 self-end w-3/4 ml-auto">
                          <p className="text-sm font-medium">Draft a standard Access Control Policy for SOC 2 Type II.</p>
                      </div>
                      <div className="bg-white text-gray-900 rounded-2xl p-6 shadow-xl border border-gray-100 w-full">
                          <div className="flex items-center gap-2 mb-2 border-b border-gray-100 pb-2">
                              <Wand2 size={14} className="text-indigo-600" />
                              <span className="text-xs font-bold text-gray-500 uppercase">Generating...</span>
                          </div>
                          <div className="space-y-2">
                              <div className="h-4 bg-gray-100 rounded w-3/4" />
                              <div className="h-4 bg-gray-100 rounded w-full" />
                              <div className="h-4 bg-gray-100 rounded w-5/6" />
                          </div>
                      </div>
                  </div>
              </div>
           </motion.div>
        </section>

        {/* Feature 2: Visual Generation */}
        <section>
           <motion.div 
             variants={containerVariants}
             initial="hidden"
             whileInView="show"
             viewport={{ once: true, margin: "-100px" }}
             className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
           >
              <div className="bg-gray-100 rounded-3xl p-8 h-[400px] relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop')] bg-cover bg-center opacity-80 group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute bottom-8 left-8 right-8">
                      <div className="bg-white/90 backdrop-blur rounded-xl p-4 flex items-center gap-3">
                          <ImageIcon className="text-indigo-600 shrink-0" />
                          <p className="text-sm font-medium">"Generate a diagram of a secure cloud network architecture"</p>
                      </div>
                  </div>
              </div>

              <div className="space-y-8">
                  <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600">
                      <ImageIcon size={24} />
                  </div>
                  <div>
                      <h2 className="text-3xl font-serif mb-4">Visual Generation</h2>
                      <p className="text-gray-500 leading-relaxed text-lg">
                          Compliance isn't just text. Use our integrated Gemini 3 Pro Image model to create high-fidelity diagrams, flowcharts, and illustrative assets directly within your documentation.
                      </p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                      <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <MousePointerClick size={16} className="text-purple-500"/> How to use
                      </h3>
                      <ol className="space-y-4 text-gray-600 text-sm">
                          <li className="flex gap-3">
                              <span className="bg-white border border-gray-200 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0">1</span>
                              <span>Open the AI Chat (Wand icon).</span>
                          </li>
                          <li className="flex gap-3">
                              <span className="bg-white border border-gray-200 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0">2</span>
                              <span>Type a prompt that explicitly asks for visual content, such as <em className="text-purple-600">"Generate an image of a fire evacuation map"</em> or <em className="text-purple-600">"Create a diagram for data encryption flow"</em>.</span>
                          </li>
                          <li className="flex gap-3">
                              <span className="bg-white border border-gray-200 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0">3</span>
                              <span>The system detects the visual intent and routes the request to the image generation model.</span>
                          </li>
                          <li className="flex gap-3">
                              <span className="bg-white border border-gray-200 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0">4</span>
                              <span>The generated image is automatically inserted into your document at the cursor position.</span>
                          </li>
                      </ol>
                  </div>
              </div>
           </motion.div>
        </section>

        {/* Feature 3: OCR & Document Intelligence */}
        <section>
           <motion.div 
             variants={containerVariants}
             initial="hidden"
             whileInView="show"
             viewport={{ once: true, margin: "-100px" }}
             className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
           >
              <div className="order-2 md:order-1 space-y-8">
                  <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600">
                      <ScanLine size={24} />
                  </div>
                  <div>
                      <h2 className="text-3xl font-serif mb-4">Document Scanning (OCR)</h2>
                      <p className="text-gray-500 leading-relaxed text-lg">
                          Digitize old physical records or extract text from PDF evidence using Mistral OCR. Simply attach a file and let the AI transcribe it into editable text.
                      </p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                      <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <MousePointerClick size={16} className="text-teal-500"/> How to use
                      </h3>
                      <ol className="space-y-4 text-gray-600 text-sm">
                          <li className="flex gap-3">
                              <span className="bg-white border border-gray-200 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0">1</span>
                              <span>In the AI Chat popup, click the <strong className="text-gray-900">Paperclip Icon</strong>.</span>
                          </li>
                          <li className="flex gap-3">
                              <span className="bg-white border border-gray-200 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0">2</span>
                              <span>Select an image (JPG, PNG) or PDF from your device.</span>
                          </li>
                          <li className="flex gap-3">
                              <span className="bg-white border border-gray-200 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0">3</span>
                              <span>Submit the chat (you don't even need to type text, or just say "Extract this").</span>
                          </li>
                          <li className="flex gap-3">
                              <span className="bg-white border border-gray-200 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0">4</span>
                              <span>The system uses Mistral OCR to extract the text and inserts it into your document with a clear header.</span>
                          </li>
                      </ol>
                  </div>
              </div>

              <div className="order-1 md:order-2 bg-white border border-gray-200 rounded-3xl p-8 shadow-xl relative overflow-hidden h-[400px] flex items-center justify-center">
                  <div className="absolute inset-0 bg-gray-50/50 [mask-image:linear-gradient(to_bottom,transparent,white)]" />
                  <div className="relative z-10 w-full max-w-sm">
                      <div className="flex items-center gap-4 mb-6">
                          <div className="w-16 h-20 bg-gray-200 rounded-lg flex items-center justify-center border border-gray-300">
                              <FileText className="text-gray-400" />
                          </div>
                          <ArrowLeft className="rotate-180 text-teal-500 animate-pulse" />
                          <div className="flex-1 bg-white rounded-lg p-4 shadow-sm border border-gray-100 text-[10px] text-gray-400 font-mono leading-relaxed">
                              [EXTRACTED TEXT] <br/>
                              POLICY #492 <br/>
                              EFFECTIVE DATE: 2024-01-15 <br/>
                              ...
                          </div>
                      </div>
                  </div>
              </div>
           </motion.div>
        </section>

        {/* Feature 4: Library & Organization */}
        <section className="bg-gray-900 text-white rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[100px]" />
            
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="md:col-span-1 space-y-6">
                     <Layout className="text-indigo-400" size={40} />
                     <h2 className="text-4xl font-serif">Library Management</h2>
                     <p className="text-gray-400 leading-relaxed">
                         Organize your compliance posture with a beautiful, visual library. Color-code documents by framework, apply security stamps, and manage versioning.
                     </p>
                </div>
                
                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <h4 className="font-bold mb-2 flex items-center gap-2">
                            <span className="w-2 h-2 bg-indigo-500 rounded-full"/> Color Coding
                        </h4>
                        <p className="text-sm text-gray-400">
                            Assign specific colors to documents (e.g., Red for Critical, Indigo for Policies) to visually sort your dashboard.
                        </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <h4 className="font-bold mb-2 flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"/> Security Stamps
                        </h4>
                        <p className="text-sm text-gray-400">
                            Toggle the "Confidential" stamp during document creation to visually mark sensitive assets in the library view.
                        </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <h4 className="font-bold mb-2 flex items-center gap-2">
                            <span className="w-2 h-2 bg-orange-500 rounded-full"/> Auto-Save
                        </h4>
                        <p className="text-sm text-gray-400">
                            All changes are automatically saved to your secure cloud filesystem (Puter.js) in real-time.
                        </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <h4 className="font-bold mb-2 flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"/> Outline View
                        </h4>
                        <p className="text-sm text-gray-400">
                            The editor automatically generates a clickable Table of Contents based on your H1, H2, and H3 headers.
                        </p>
                    </div>
                </div>
            </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-gray-50 py-12 text-center border-t border-gray-100">
          <p className="text-gray-500 text-sm">© 2026 Compliee. Powered by Google Gemini & Puter.js</p>
      </footer>
    </div>
  );
};
