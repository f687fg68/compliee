
import React, { useState, useEffect } from 'react';
import { BookOpen, ChevronRight, LogOut, Library, Shield, Menu, Crown } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface NavbarProps {
  onStartWriting?: () => void;
  onLogin?: () => void;
  onLogout?: () => void;
  onNavigateToFeatures?: () => void;
  onNavigateToHelp?: () => void;
  onNavigateToPricing?: () => void;
  user?: any;
  isSubscribed?: boolean;
}

export const Navbar = ({ onStartWriting, onLogin, onLogout, onNavigateToFeatures, onNavigateToHelp, onNavigateToPricing, user, isSubscribed }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  // Award-winning floating animation
  const width = useTransform(scrollY, [0, 100], ["100%", "90%"]);
  const top = useTransform(scrollY, [0, 100], [0, 20]);
  const borderRadius = useTransform(scrollY, [0, 100], [0, 24]);
  const backgroundColor = useTransform(scrollY, [0, 100], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.8)"]);
  const backdropBlur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(12px)"]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 1]);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <motion.nav 
          style={{ width, top, borderRadius, backgroundColor, backdropFilter: backdropBlur, borderColor: `rgba(255,255,255,${borderOpacity.get()})` }}
          className="h-20 pointer-events-auto transition-shadow duration-300 max-w-7xl mx-auto flex items-center justify-between px-6 md:px-8 border border-transparent shadow-[0_0_0_1px_rgba(0,0,0,0.03)]"
        >
             {/* Logo */}
             <div className="flex items-center gap-3 cursor-pointer group">
                <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform ring-1 ring-black/5">
                    <Shield size={18} />
                </div>
                <span className="font-serif font-bold text-xl text-gray-900 tracking-tight">Compliee</span>
             </div>

             {/* Navigation Links (Hidden on mobile) */}
             <div className="hidden md:flex items-center gap-8">
                 <button onClick={onNavigateToFeatures} className="text-sm font-medium text-gray-500 hover:text-black transition-colors">Features</button>
                 <button onClick={onNavigateToPricing} className="text-sm font-medium text-gray-500 hover:text-black transition-colors">Pricing</button>
                 <button onClick={onNavigateToHelp} className="text-sm font-medium text-gray-500 hover:text-black transition-colors">Help</button>
             </div>

             {/* Action Buttons */}
             <div className="flex items-center gap-3">
                 {user ? (
                     <div className="flex items-center gap-3">
                         <div className="text-right hidden sm:block">
                             <p className="text-sm font-bold text-gray-900">{user.username}</p>
                         </div>
                         {!isSubscribed && (
                            <button onClick={onNavigateToPricing} className="hidden sm:flex p-2 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full text-white shadow-md hover:scale-105 transition-transform" title="Upgrade to Pro">
                                <Crown size={16} />
                            </button>
                         )}
                         <button onClick={onLogout} className="p-2.5 hover:bg-gray-100 rounded-full text-gray-400 hover:text-red-600 transition-colors" title="Sign Out">
                             <LogOut size={18} />
                         </button>
                         <button 
                            onClick={onStartWriting}
                            className={`bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-indigo-200 transition-all flex items-center gap-2 hover:scale-105 active:scale-95 ${!isSubscribed ? 'opacity-80 grayscale' : ''}`}
                         >
                            <Library size={16} />
                            <span>Dashboard</span>
                         </button>
                     </div>
                 ) : (
                     <>
                        <button onClick={onLogin} className="hidden md:block text-sm font-bold text-gray-600 hover:text-black transition-colors px-4 py-2">
                            Sign In
                        </button>
                        <button 
                            onClick={onStartWriting}
                            className="bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-full text-sm font-bold shadow-xl shadow-gray-200 transition-all flex items-center gap-2 hover:scale-105 active:scale-95 group"
                        >
                            <span>Start Writing</span>
                            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                     </>
                 )}
             </div>
        </motion.nav>
    </div>
  );
};
