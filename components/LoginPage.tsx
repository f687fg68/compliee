
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Check, Loader2, Play } from 'lucide-react';

interface LoginPageProps {
  onBack: () => void;
  onLoginSuccess: (user: any) => void;
}

declare const puter: any;

export const LoginPage = ({ onBack, onLoginSuccess }: LoginPageProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePuterLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Puter handles the popup and auth flow
      const res = await puter.auth.signIn();
      const user = await puter.auth.getUser();
      onLoginSuccess(user);
    } catch (err: any) {
      console.error("Login failed", err);
      // Don't show error if user just closed the popup
      if (err?.toString().includes('cancelled') || err?.message?.includes('closed')) {
        setIsLoading(false);
        return;
      }
      setError("Authentication failed. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col md:flex-row font-sans">
      
      {/* Left Column - Branding */}
      <div className="w-full md:w-1/2 bg-[#0F0F11] text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[80px]" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-12">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                <Shield size={16} />
            </div>
            <span className="font-serif font-bold text-lg">Compliee</span>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-serif font-medium leading-tight mb-6">
              Compliance writing <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">reimagined.</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-md leading-relaxed">
              Join thousands of compliance officers who use Compliee to automate policy drafting, map controls, and track regulatory changes in real-time.
            </p>
          </motion.div>
        </div>

        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="relative z-10 space-y-4"
        >
            <div className="flex items-center gap-3 text-sm text-gray-300">
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 shrink-0">
                    <Check size={14} />
                </div>
                <span>SOC 2, GDPR & HIPAA Frameworks</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-300">
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 shrink-0">
                    <Check size={14} />
                </div>
                <span>AI-Powered Drafting Assistant</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-300">
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 shrink-0">
                    <Check size={14} />
                </div>
                <span>Bank-Grade Encryption</span>
            </div>
        </motion.div>
      </div>

      {/* Right Column - Auth Form */}
      <div className="w-full md:w-1/2 bg-white flex flex-col items-center justify-center p-8 md:p-12">
         <div className="w-full max-w-md space-y-8">
            <button onClick={onBack} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-4">
                <ArrowLeft size={16} /> Back to Home
            </button>

            <div className="text-center md:text-left">
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">Welcome Back</h2>
                <p className="text-gray-500">Sign in to access your dashboard and documents.</p>
            </div>

            <div className="space-y-4 pt-4">
                <button 
                    onClick={handlePuterLogin}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 bg-gray-900 text-white hover:bg-black transition-all py-4 rounded-xl font-medium shadow-xl shadow-gray-200 disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
                >
                    {isLoading ? (
                        <>
                            <Loader2 size={20} className="animate-spin" />
                            <span>Connecting...</span>
                        </>
                    ) : (
                        <>
                            <span className="relative z-10 flex items-center gap-2">
                                Continue with Puter.com <Play size={16} className="fill-white" />
                            </span>
                        </>
                    )}
                </button>

                {error && (
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-50 text-red-600 text-sm p-3 rounded-lg text-center border border-red-100"
                    >
                        {error}
                    </motion.div>
                )}

                <div className="relative py-4">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-100"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-gray-400">Secure Authentication Provider</span>
                    </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 text-xs text-gray-500 text-center leading-relaxed">
                    By continuing, you agree to our <button className="text-indigo-600 hover:underline">Terms of Service</button> and <button className="text-indigo-600 hover:underline">Privacy Policy</button>.
                    <br/>
                    We use Puter.js for secure, password-less authentication.
                </div>
            </div>
         </div>
      </div>

    </div>
  );
};
