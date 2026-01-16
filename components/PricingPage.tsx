
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Shield, Zap, Star, Crown, Loader2 } from 'lucide-react';

declare const puter: any;

interface PricingPageProps {
  onBack: () => void;
  currentUser?: any;
  onPlanSelected?: () => void;
}

export const PricingPage = ({ onBack, currentUser, onPlanSelected }: PricingPageProps) => {
  const [processingPlan, setProcessingPlan] = useState<'monthly' | 'yearly' | null>(null);

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

  const handleSubscribe = async (plan: 'monthly' | 'yearly') => {
      if (!currentUser) {
          alert("You must be logged in to subscribe.");
          return;
      }

      setProcessingPlan(plan);

      try {
          // Direct redirect to payment provider.
          // The application checks for ?success=true in the URL on return to verify/activate.
          if (plan === 'monthly') {
              window.location.href = "https://buy.polar.sh/polar_cl_Uh8zbq3LZ6UbLm07xffigIB4mUDK5ayn85UmS2NkSYU";
          } else if (plan === 'yearly') {
              window.location.href = "https://buy.polar.sh/polar_cl_tsxMyr2PWeL3VkWSbxgmG0acWHGE52fjCLhsE1QO4qI";
          }
      } catch (e) {
          console.error("Payment initiation failed", e);
          alert("Could not connect to payment provider.");
          setProcessingPlan(null);
      }
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
      <div className="pt-32 pb-20 px-6 container mx-auto max-w-6xl text-center">
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
        >
            <span className="text-indigo-600 font-semibold tracking-wider uppercase text-xs mb-4 block">
              Flexible Plans
            </span>
            <h1 className="text-5xl md:text-6xl font-serif text-gray-900 mb-6 leading-tight">
              Enterprise Compliance <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Made Simple.</span>
            </h1>
            <p className="text-xl text-gray-500 font-light leading-relaxed max-w-2xl mx-auto mb-16">
              Choose the plan that fits your organization's regulatory needs. 
              Unlock full AI drafting, visual generation, and legislative tracking.
            </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
            {/* Monthly Plan */}
            <motion.div 
                variants={itemVariants}
                className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl shadow-gray-200/50 relative overflow-hidden flex flex-col"
            >
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-600">
                        <Zap size={24} />
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold text-gray-900 text-lg">Monthly</h3>
                        <p className="text-sm text-gray-500">Flexible billing</p>
                    </div>
                </div>

                <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-5xl font-serif font-bold text-gray-900">$500</span>
                    <span className="text-gray-500">/mo</span>
                </div>

                <div className="space-y-4 mb-8 flex-1">
                    <FeatureItem text="Unlimited AI Documents" />
                    <FeatureItem text="Legislative Tracking" />
                    <FeatureItem text="Basic Visual Generation" />
                    <FeatureItem text="Standard Support" />
                </div>

                <button 
                    onClick={() => handleSubscribe('monthly')}
                    disabled={!!processingPlan}
                    className="w-full py-4 rounded-xl font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 hover:text-gray-900 transition-all border border-gray-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {processingPlan === 'monthly' ? <Loader2 className="animate-spin" size={20}/> : 'Get Started'}
                </button>
            </motion.div>

            {/* Yearly Plan */}
            <motion.div 
                variants={itemVariants}
                className="bg-gray-900 text-white rounded-3xl p-8 border border-gray-800 shadow-2xl relative overflow-hidden flex flex-col transform hover:scale-105 transition-transform duration-300 ring-4 ring-indigo-500/20"
            >
                {/* Badge */}
                <div className="absolute top-6 right-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                    <Crown size={12} fill="currentColor" />
                    Best Value
                </div>

                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-yellow-400">
                        <Star size={24} fill="currentColor" />
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold text-white text-lg">Yearly</h3>
                        <p className="text-gray-400 text-sm">Save $1,000/year</p>
                    </div>
                </div>

                <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-5xl font-serif font-bold text-white">$1,000</span>
                    <span className="text-gray-400">/yr</span>
                </div>

                <div className="space-y-4 mb-8 flex-1">
                    <FeatureItem text="All Monthly Features" light />
                    <FeatureItem text="Priority AI Processing" light />
                    <FeatureItem text="Advanced Visual Gen (4K)" light />
                    <FeatureItem text="Dedicated Account Manager" light />
                    <FeatureItem text="Audit Log Retention (Forever)" light />
                </div>

                <button 
                    onClick={() => handleSubscribe('yearly')}
                    disabled={!!processingPlan}
                    className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:shadow-lg hover:shadow-indigo-500/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                     {processingPlan === 'yearly' ? <Loader2 className="animate-spin" size={20}/> : 'Subscribe Yearly'}
                </button>
            </motion.div>
        </motion.div>

      </div>
    </div>
  );
};

const FeatureItem = ({ text, light = false }: { text: string, light?: boolean }) => (
    <div className="flex items-center gap-3">
        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${light ? 'bg-indigo-500/20 text-indigo-300' : 'bg-green-100 text-green-600'}`}>
            <Check size={12} strokeWidth={3} />
        </div>
        <span className={`text-sm ${light ? 'text-gray-300' : 'text-gray-600'}`}>{text}</span>
    </div>
);
