
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Lock, Server, FileKey, EyeOff, CheckCircle, Bug } from 'lucide-react';

interface SecurityPageProps {
  onBack: () => void;
}

export const SecurityPage = ({ onBack }: SecurityPageProps) => {
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

      <main className="container mx-auto px-6 max-w-5xl pt-32 pb-20">
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
        >
            {/* Header Badge */}
            <div className="flex items-center gap-2 mb-8">
                <div className="bg-green-100/80 backdrop-blur border border-green-200 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/>
                    System Status: Operational
                </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-serif text-gray-900 mb-8 leading-tight">
                Security & <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Trust Center</span>
            </h1>
            <p className="text-xl text-gray-500 font-light leading-relaxed mb-16 max-w-3xl">
                We believe compliance tools should set the standard for security. 
                Compliee employs defense-in-depth strategies, zero-retention AI processing, 
                and enterprise-grade encryption to protect your sensitive data.
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
                <SecurityCard 
                    icon={<Lock size={24}/>}
                    title="End-to-End Encryption"
                    desc="Data is encrypted at rest using AES-256 and in transit via TLS 1.3. Your documents are cryptographically isolated within our cloud storage."
                />
                <SecurityCard 
                    icon={<EyeOff size={24}/>}
                    title="Zero-Retention AI"
                    desc="We do not train our models on your data. Inputs sent to our AI providers (Google, Mistral) are stateless—processed in memory and discarded immediately."
                />
                <SecurityCard 
                    icon={<Server size={24}/>}
                    title="Sandboxed Infrastructure"
                    desc="Built on Puter.js, utilizing micro-VM isolation that prevents cross-tenant data leakage and ensures robust process separation."
                />
                <SecurityCard 
                    icon={<FileKey size={24}/>}
                    title="Strict Access Control"
                    desc="Role-Based Access Control (RBAC) and mandatory session timeouts ensure only authorized personnel can access your compliance library."
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                
                {/* Methodology Column */}
                <div className="lg:col-span-2 prose prose-lg prose-indigo text-gray-600">
                    <h3 className="text-gray-900 text-2xl font-serif mb-6">Defense Methodology</h3>
                    <p>
                        Our security architecture follows the principle of least privilege. Every component of the Compliee stack is designed to minimize the blast radius of a potential breach.
                    </p>
                    <div className="space-y-6 mt-8">
                        <ListItem title="Data Isolation" text="Each user's workspace is logically isolated. We use unique encryption keys for tenant data separation." />
                        <ListItem title="Continuous Monitoring" text="Automated systems scan for suspicious access patterns, API abuse, and potential vulnerabilities 24/7." />
                        <ListItem title="Incident Response" text="A dedicated security team is on standby with a defined playbook for containment, forensic analysis, and notification." />
                    </div>
                </div>

                {/* Sidebar Column */}
                <div className="space-y-8">
                    
                    {/* Compliance Badge */}
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                         <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                             <Shield size={18} className="text-indigo-600"/> Compliance
                         </h4>
                         <div className="space-y-3">
                             <div className="flex items-center gap-3 text-sm text-gray-600">
                                 <CheckCircle size={16} className="text-green-500"/>
                                 <span>SOC 2 Type II Aligned</span>
                             </div>
                             <div className="flex items-center gap-3 text-sm text-gray-600">
                                 <CheckCircle size={16} className="text-green-500"/>
                                 <span>GDPR Compliant</span>
                             </div>
                             <div className="flex items-center gap-3 text-sm text-gray-600">
                                 <CheckCircle size={16} className="text-green-500"/>
                                 <span>CCPA Ready</span>
                             </div>
                         </div>
                    </div>

                    {/* Bug Bounty */}
                    <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-200">
                         <h4 className="font-bold mb-2 flex items-center gap-2">
                             <Bug size={18} className="text-indigo-200"/> Bug Bounty
                         </h4>
                         <p className="text-indigo-100 text-sm mb-4">
                             Found a vulnerability? We reward responsible disclosure.
                         </p>
                         <a href="mailto:security@compliee.com" className="text-xs bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg transition-colors inline-block">
                             Report Issue
                         </a>
                    </div>
                </div>
            </div>
            
            {/* AI Governance Section */}
            <div className="mt-20">
                <h3 className="text-gray-900 mb-6 text-2xl font-serif">AI Model Governance</h3>
                <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 p-8 rounded-2xl">
                    <p className="text-gray-600 leading-relaxed mb-6">
                        We rigorously vet all AI models for safety and bias before deployment. Our orchestration layer acts as a firewall between your prompt and the model.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                            <h5 className="font-bold text-gray-900 text-sm mb-1">PII Redaction</h5>
                            <p className="text-xs text-gray-500">Automated stripping of sensitive identifiers before API transmission.</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                            <h5 className="font-bold text-gray-900 text-sm mb-1">Output Filtering</h5>
                            <p className="text-xs text-gray-500">Real-time scanning of generated content to prevent harmful outputs.</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                            <h5 className="font-bold text-gray-900 text-sm mb-1">Audit Trails</h5>
                            <p className="text-xs text-gray-500">Immutable logs of every AI interaction for your compliance records.</p>
                        </div>
                    </div>
                </div>
            </div>

        </motion.div>
      </main>
    </div>
  );
};

const SecurityCard = ({ icon, title, desc }: any) => (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-lg transition-shadow group">
        <div className="w-12 h-12 bg-gray-50 group-hover:bg-indigo-50 rounded-2xl flex items-center justify-center text-gray-600 group-hover:text-indigo-600 mb-6 transition-colors">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3 font-serif">{title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </div>
);

const ListItem = ({ title, text }: any) => (
    <div className="flex gap-4">
        <div className="mt-1 bg-green-50 w-6 h-6 rounded-full flex items-center justify-center shrink-0">
            <CheckCircle size={14} className="text-green-600" />
        </div>
        <div>
            <strong className="text-gray-900 block mb-1 text-sm">{title}</strong>
            <span className="text-gray-500 text-sm leading-relaxed">{text}</span>
        </div>
    </div>
);
