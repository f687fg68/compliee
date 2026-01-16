import React, { useState, useEffect } from 'react';
import { BookOpen, ChevronRight, LogOut, Shield } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface NavbarProps {
  onStartWriting?: () => void;
  onLogin?: () => void;
  onLogout?: () => void;
  onNavigateToFeatures?: () => void;
  onNavigateToHelp?: () => void;
  onNavigateToPricing?: () => void;
  user?: any;
}

export const Navbar = ({ onStartWriting, onLogin, onLogout, onNavigateToFeatures, onNavigateToHelp, onNavigateToPricing, user }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  // Dynamic width animation for the pill
  const width = useTransform(scrollY, [0, 100], ["90%", "600px"]);
  const y = useTransform(scrollY, [0, 100], [0, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center pointer-events-none">
      
      <motion.nav 
        style={{ width, y }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 16, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`pointer-events-auto h-16 rounded-full flex items-center justify-between px-2 pr-2 shadow-2xl transition-all duration-300 mt-2 ${
          isScrolled 
            ? 'bg-black/80 backdrop-blur-xl border border-white/10 text-white' 
            : 'bg-white/70 backdrop-blur-lg border border-white/40 text-gray-800'
        }`}
      >
        <div className="flex items-center gap-3 pl-4 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isScrolled ? 'bg-indigo-600' : 'bg-indigo-500 text-white'}`}>
             <Shield size={16} strokeWidth={2.5} />
          </div>
          <span className={`font-serif font-bold tracking-tight transition-colors ${isScrolled ? 'text-white' : 'text-gray-900'}`}>Compliee</span>
        </div>

        <div className="hidden md:flex items-center gap-1 bg-black/5 rounded-full p-1 mx-2">
            <button 
                onClick={onNavigateToFeatures}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${isScrolled ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-black hover:bg-white'}`}
            >
                Platform
            </button>
            <button 
                onClick={onNavigateToHelp}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${isScrolled ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-black hover:bg-white'}`}
            >
                Resources
            </button>
            <button 
                onClick={onNavigateToPricing}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${isScrolled ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-black hover:bg-white'}`}
            >
                Pricing
            </button>
        </div>

        <div className="flex items-center gap-2">
          {user ? (
             <div className="flex items-center gap-3">
                 <span className={`hidden md:block text-xs font-medium ${isScrolled ? 'text-gray-300' : 'text-gray-600'}`}>
                    {user.username}
                 </span>
                 <button 
                    onClick={onLogout}
                    className={`p-2 rounded-full transition-colors ${isScrolled ? 'hover:bg-white/10 text-gray-300' : 'hover:bg-gray-200 text-gray-600'}`}
                    title="Sign Out"
                 >
                    <LogOut size={16} />
                 </button>
             </div>
          ) : (
            <button 
                onClick={onLogin} 
                className={`hidden md:block text-xs font-medium px-4 py-2 transition-colors ${isScrolled ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'}`}
            >
                Log in
            </button>
          )}
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStartWriting}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-5 py-2.5 rounded-full hover:shadow-lg hover:shadow-indigo-500/30 transition-all font-medium text-xs"
          >
            <span>{user ? 'Dashboard' : 'Start Compliance'}</span>
            <ChevronRight size={12} />
          </motion.button>
        </div>
      </motion.nav>
    </div>
  );
};