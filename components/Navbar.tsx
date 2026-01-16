
import React, { useState, useEffect } from 'react';
import { BookOpen, ChevronRight, LogOut, Library, Shield } from 'lucide-react';
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
  const width = useTransform(scrollY, [0, 100], ["90%", "100%"]);
  const y = useTransform(scrollY, [0, 100], [20, 0]);
  const borderRadius = useTransform(scrollY, [0, 100], [24, 0]);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <motion.nav 
      style={{ width, y, borderRadius }}
      className={`fixed top-0 left-0 right-0 z-50 mx-auto transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-100 h-16 rounded-none max-w-full px-6' : 'bg-transparent h-20 max-w-7xl'}`}
    >
      <div className={`h-full flex items-center justify-between ${isScrolled ? '' : 'px-6 bg-white/70 backdrop-blur-md rounded-3xl border border-white/40 shadow-xl shadow-gray-200/20'}`}>
         
         {/* Logo */}
         <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                <Shield size={16} />
            </div>
            <span className="font-serif font-bold text-lg text-gray-900">Compliee</span>
         </div>

         {/* Navigation Links (Hidden on mobile) */}
         <div className="hidden md:flex items-center gap-6">
             <button onClick={onNavigateToFeatures} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Features</button>
             <button onClick={onNavigateToPricing} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Pricing</button>
             <button onClick={onNavigateToHelp} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Help Center</button>
         </div>

         {/* Action Buttons */}
         <div className="flex items-center gap-3">
             {user ? (
                 <div className="flex items-center gap-3">
                     <div className="text-right hidden sm:block">
                         <p className="text-xs font-bold text-gray-900">{user.username}</p>
                         <p className="text-[10px] text-gray-500">Pro Plan</p>
                     </div>
                     <button onClick={onLogout} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-red-600 transition-colors" title="Sign Out">
                         <LogOut size={18} />
                     </button>
                     <button 
                        onClick={onStartWriting}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-indigo-200 transition-all flex items-center gap-2"
                     >
                        <Library size={16} />
                        <span>Dashboard</span>
                     </button>
                 </div>
             ) : (
                 <>
                    <button onClick={onLogin} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors px-3 py-2">
                        Sign In
                    </button>
                    <button 
                        onClick={onStartWriting}
                        className="bg-gray-900 hover:bg-black text-white px-5 py-2.5 rounded-xl text-sm font-medium shadow-lg shadow-gray-200 transition-all flex items-center gap-2"
                    >
                        <span>Start Writing</span>
                        <ChevronRight size={14} />
                    </button>
                 </>
             )}
         </div>

      </div>
    </motion.nav>
  );
};
