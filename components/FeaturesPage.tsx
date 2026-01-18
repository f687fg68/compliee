
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Wand2, FileText, Layout, GitGraph,
  ArrowLeft, Zap, Shield, Factory, Users, 
  Briefcase, CheckCircle2, Bot, Network, FileOutput
} from 'lucide-react';

interface FeaturesPageProps {
  onBack: () => void;
}

export const FeaturesPage = ({ onBack }: FeaturesPageProps) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

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
                <span>SMB Compliance Engine</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-gray-900 mb-8 leading-[0.9] tracking-tight">
                The Regulatory <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-800">
                   Document Factory.
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-500 font-light leading-relaxed max-w-3xl mx-auto mb-12">
                Replace expensive consultants with an AI agent swarm that drafts, audits, and maintains your entire regulatory library—from SOPs to Safety Manuals.
              </p>
          </motion.div>
        </div>

        {/* Abstract Backgrounds */}
        <motion.div style={{ y: y1, opacity }} className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-to-b from-indigo-50/50 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 max-w-6xl pb-32 space-y-40">
        
        {/* Section 1: What it Writes */}
        <section className="relative">
           <div className="text-center mb-16">
              <h2 className="text-4xl font-serif text-gray-900 mb-4">What Compliee Writes For You</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                  Stop copying old Word docs. Generate audit-ready documentation tailored to your specific industry and location.
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               <CapabilityCard 
                  title="Standard Operating Procedures (SOPs)" 
                  desc="Detailed, step-by-step operational workflows for any department."
                  icon={Layout}
               />
               <CapabilityCard 
                  title="Internal Policy Handbooks" 
                  desc="HR, IT, and Data Security policies compliant with local labor laws."
                  icon={FileText}
               />
               <CapabilityCard 
                  title="Safety Manuals" 
                  desc="OSHA/ISO compliant safety guides for factories and clinics."
                  icon={Shield}
               />
               <CapabilityCard 
                  title="Audit Response Letters" 
                  desc="Draft professional responses to regulator inquiries instantly."
                  icon={FileText}
               />
               <CapabilityCard 
                  title="Incident Reports" 
                  desc="Structured reporting for data breaches or workplace accidents."
                  icon={Shield}
               />
               <CapabilityCard 
                  title="Compliance Checklists" 
                  desc="Daily/Weekly/Monthly actionable lists for staff adherence."
                  icon={CheckCircle2}
               />
           </div>
        </section>

        {/* Section 2: Infinite Agent Architecture */}
        <section className="bg-gray-900 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
            {/* Background noise */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-8">
                        <Network size={32} />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">Infinite Super-Agent Architecture</h2>
                    <p className="text-gray-400 text-lg leading-relaxed mb-8">
                        We don't just use a single prompt. Compliee orchestrates a swarm of specialized AI agents to ensure depth and accuracy.
                    </p>
                    <ul className="space-y-4">
                        <AgentStep step="1" title="Intake Agent" desc="Analyzes your company profile, industry, and region." />
                        <AgentStep step="2" title="Regulation Interpreter" desc="Parses specific laws (e.g., GDPR Art 30, HIPAA)." />
                        <AgentStep step="3" title="Policy Writer Swarm" desc="50+ specialized writers draft individual chapters simultaneously." />
                        <AgentStep step="4" title="Evidence Generator" desc="Creates placeholder logs and mock evidence for training." />
                    </ul>
                </div>
                
                {/* Visual Representation of Architecture */}
                <div className="bg-white/5 rounded-3xl p-8 border border-white/10 backdrop-blur-sm">
                    <div className="space-y-4">
                        <div className="flex justify-center"><AgentNode icon={Users} label="Company Intake" color="bg-blue-500" /></div>
                        <div className="h-8 w-px bg-white/20 mx-auto"></div>
                        <div className="flex justify-center"><AgentNode icon={Bot} label="Regulator Interpreter" color="bg-purple-500" /></div>
                        <div className="h-8 w-px bg-white/20 mx-auto"></div>
                        <div className="grid grid-cols-3 gap-4">
                            <AgentNode icon={FileText} label="Writer A" color="bg-indigo-500" small />
                            <AgentNode icon={FileText} label="Writer B" color="bg-indigo-500" small />
                            <AgentNode icon={FileText} label="Writer C" color="bg-indigo-500" small />
                        </div>
                        <div className="h-8 w-px bg-white/20 mx-auto"></div>
                         <div className="flex justify-center"><AgentNode icon={FileOutput} label="Final Compliance Book" color="bg-green-500" /></div>
                    </div>
                </div>
            </div>
        </section>

        {/* Section 3: Built For You */}
        <section>
           <div className="text-center mb-16">
              <h2 className="text-4xl font-serif text-gray-900 mb-4">Who is Compliee For?</h2>
              <p className="text-gray-500">
                  Big enterprise tools are too complex. We built this for the unsung heroes of the economy.
              </p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               <TargetAudienceCard icon={Factory} title="Factories" desc="Safety manuals & ISO 9001 specs." />
               <TargetAudienceCard icon={Briefcase} title="Private Schools" desc="Staff handbooks & student safety policies." />
               <TargetAudienceCard icon={Shield} title="Clinics" desc="HIPAA privacy rules & patient intake flows." />
               <TargetAudienceCard icon={Users} title="Logistics" desc="Driver safety protocols & cargo handling SOPs." />
           </div>
        </section>

        {/* Disclaimer Note */}
        <div className="max-w-3xl mx-auto mt-20">
             <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-indigo-200"></div>
                <h4 className="text-indigo-900 font-serif font-bold text-xl mb-3">A Note on Generation Quality</h4>
                <p className="text-indigo-800/80 leading-relaxed">
                    "True compliance requires detail. Our generation process prioritizes depth and accuracy over speed, utilizing advanced reasoning models to produce comprehensive, 20+ page audit-ready documentation. Please be patient while the AI constructs your tailored compliance framework."
                </p>
             </div>
        </div>

      </main>
    </div>
  );
};

const CapabilityCard = ({ title, desc, icon: Icon }: any) => (
    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all group">
        <div className="w-12 h-12 bg-gray-50 group-hover:bg-indigo-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-indigo-600 mb-6 transition-colors">
            <Icon size={24} />
        </div>
        <h3 className="font-serif font-bold text-lg text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
);

const TargetAudienceCard = ({ title, desc, icon: Icon }: any) => (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center hover:border-indigo-300 transition-colors">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-600 mx-auto mb-4">
            <Icon size={28} />
        </div>
        <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
        <p className="text-xs text-gray-500">{desc}</p>
    </div>
);

const AgentStep = ({ step, title, desc }: any) => (
    <div className="flex gap-4 items-start">
        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-sm font-bold text-white shrink-0 bg-white/5">
            {step}
        </div>
        <div>
            <h4 className="font-bold text-white text-lg">{title}</h4>
            <p className="text-gray-400 text-sm">{desc}</p>
        </div>
    </div>
);

const AgentNode = ({ icon: Icon, label, color, small }: any) => (
    <div className={`${color} ${small ? 'p-2' : 'p-4'} rounded-xl text-white flex flex-col items-center justify-center shadow-lg border border-white/10`}>
        <Icon size={small ? 16 : 24} className="mb-2" />
        <span className={`${small ? 'text-[10px]' : 'text-xs'} font-bold text-center`}>{label}</span>
    </div>
);
