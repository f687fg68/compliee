
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Lock, Eye, FileText, Server } from 'lucide-react';

interface PrivacyPolicyPageProps {
  onBack: () => void;
}

export const PrivacyPolicyPage = ({ onBack }: PrivacyPolicyPageProps) => {
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

      <main className="container mx-auto px-6 max-w-4xl pt-32 pb-20">
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
        >
            <span className="text-indigo-600 font-semibold tracking-wider uppercase text-xs mb-4 block">
              Legal
            </span>
            <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-8 leading-tight">Privacy Policy</h1>
            <p className="text-gray-500 mb-12 text-lg">Last Updated: October 24, 2026</p>
            
            <div className="prose prose-lg prose-indigo text-gray-600 max-w-none">
                <p>
                    At Compliee ("we", "us", or "our"), we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and compliance drafting services (the "Service").
                </p>

                <h3 className="text-gray-900 mt-8 mb-4 flex items-center gap-2 text-2xl font-serif">
                    <Eye size={24} className="text-indigo-600"/> 1. Information We Collect
                </h3>
                <p>
                    We collect information that you provide directly to us, as well as data collected automatically when you use the Service.
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-6">
                    <li><strong>Account Information:</strong> When you register via Puter.js, we collect your username and authentication tokens to manage your session.</li>
                    <li><strong>User Content:</strong> We store the documents, policies, and text you create using the Compliee editor. This content is encrypted at rest within our cloud storage provider.</li>
                    <li><strong>Usage Data:</strong> We collect anonymous metrics regarding how you interact with the features (e.g., number of documents created, AI features used) to improve the platform.</li>
                </ul>

                <h3 className="text-gray-900 mt-8 mb-4 flex items-center gap-2 text-2xl font-serif">
                    <Server size={24} className="text-indigo-600"/> 2. How We Use Your Information
                </h3>
                <p>We use the collected information for the following purposes:</p>
                <ul className="list-disc pl-6 space-y-2 mb-6">
                    <li>To provide, maintain, and improve the Service.</li>
                    <li>To process your specific AI drafting requests (see Section 3).</li>
                    <li>To manage your account and authentication.</li>
                    <li>To communicate with you regarding updates, security alerts, and support.</li>
                </ul>

                <h3 className="text-gray-900 mt-8 mb-4 flex items-center gap-2 text-2xl font-serif">
                    <FileText size={24} className="text-indigo-600"/> 3. AI Processing & Third Parties
                </h3>
                <p>
                    Compliee utilizes advanced Artificial Intelligence models (specifically Google Gemini and Mistral via Puter.js) to provide document drafting and analysis features.
                </p>
                <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-xl my-6">
                    <p className="text-sm text-indigo-900 font-medium">
                        <strong>Important:</strong> When you submit a prompt or document for analysis, that specific data snippet is transmitted to our AI providers for processing. We do not use your private compliance documents to train public foundation models. Data sent to the AI API is transient and used solely to generate the response.
                    </p>
                </div>

                <h3 className="text-gray-900 mt-8 mb-4 flex items-center gap-2 text-2xl font-serif">
                    <Lock size={24} className="text-indigo-600"/> 4. Data Retention & Security
                </h3>
                <p>
                    We implement industry-standard security measures to protect your data, including encryption in transit (TLS) and at rest.
                </p>
                <p>
                    Your documents are retained in your cloud filesystem until you explicitly delete them. Upon deletion, data is removed from active servers immediately and from backups within 30 days.
                </p>

                <h3 className="text-gray-900 mt-8 mb-4 text-2xl font-serif">5. Your Rights</h3>
                <p>
                    Depending on your location, you may have rights under GDPR, CCPA, or other privacy laws, including:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-6">
                    <li>The right to access the personal data we hold about you.</li>
                    <li>The right to request correction of inaccurate data.</li>
                    <li>The right to request deletion of your data ("Right to be Forgotten").</li>
                    <li>The right to withdraw consent for processing.</li>
                </ul>
            </div>
        </motion.div>
      </main>
    </div>
  );
};
