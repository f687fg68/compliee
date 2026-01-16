
import React, { useState, useEffect } from 'react';
import { HeroSection } from './components/HeroSection';
import { FeaturesGrid } from './components/FeaturesGrid';
import { NotebookDemo } from './components/NotebookDemo';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { LibraryDashboard } from './components/LibraryDashboard';
import { EditorPage } from './components/EditorPage';
import { FeaturesPage } from './components/FeaturesPage'; 
import { HelpPage } from './components/HelpPage'; 
import { PricingPage } from './components/PricingPage';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { TermsOfServicePage } from './components/TermsOfServicePage';
import { SecurityPage } from './components/SecurityPage';
import { LoginPage } from './components/LoginPage';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

declare const puter: any;

type ViewState = 'landing' | 'dashboard' | 'editor' | 'features' | 'help' | 'pricing' | 'privacy' | 'terms' | 'security' | 'login';

export const SUBSCRIPTION_FILE = 'compliee_pro_v1.json';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [selectedFilePath, setSelectedFilePath] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  useEffect(() => {
    // Initial Auth Check with Library Wait Logic
    const checkAuth = async () => {
      // 1. Wait for Puter.js to load (Crucial for Vercel/Production)
      let attempts = 0;
      while (typeof (window as any).puter === 'undefined' && attempts < 50) {
          await new Promise(resolve => setTimeout(resolve, 100));
          attempts++;
      }

      // 2. If still not loaded, stop checking but don't crash
      if (typeof (window as any).puter === 'undefined') {
          console.error("Puter.js failed to initialize. Please check your internet connection.");
          setIsAuthChecking(false);
          return;
      }

      // 3. Safe to use puter now
      try {
        if (puter.auth.isSignedIn()) {
          const userData = await puter.auth.getUser();
          setUser(userData);
          
          // Check for payment callback
          const urlParams = new URLSearchParams(window.location.search);
          if (urlParams.get('success') === 'true') {
             await handlePaymentSuccess();
          }
        }
      } catch (e) {
        console.log("Not signed in or auth error", e);
      } finally {
        setIsAuthChecking(false);
      }
    };
    checkAuth();
  }, []);

  const handlePaymentSuccess = async () => {
      try {
          await puter.fs.write(SUBSCRIPTION_FILE, JSON.stringify({ 
              status: 'active', 
              since: new Date().toISOString() 
          }));
          // Clean URL
          window.history.replaceState({}, document.title, "/");
          alert("Subscription activated successfully! Welcome to Pro.");
          setCurrentView('dashboard');
      } catch (e) {
          console.error("Failed to activate subscription", e);
      }
  };

  const handleLoginSuccess = async (userData: any) => {
    setUser(userData);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Check payment on login success too if params exist
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
         await puter.fs.write(SUBSCRIPTION_FILE, JSON.stringify({ 
              status: 'active', 
              since: new Date().toISOString() 
          }));
         window.history.replaceState({}, document.title, "/");
    }

    setCurrentView('dashboard');
  };

  const handleLogout = async () => {
    try {
        await puter.auth.signOut();
    } catch (e) {
        console.log("Sign out error (ignoring for guest)", e);
    }
    setUser(null);
    setCurrentView('landing');
  };

  const handleStart = async () => {
    if (user) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setCurrentView('dashboard');
    } else {
      setCurrentView('login');
    }
  };

  const handleOpenEditor = (filePath?: string) => {
    if (filePath) setSelectedFilePath(filePath);
    else setSelectedFilePath(null); // New file
    setCurrentView('editor');
  };

  const navigateToView = (view: ViewState) => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setCurrentView(view);
  };

  if (isAuthChecking) {
     return (
       <div className="h-screen w-full flex items-center justify-center bg-gray-50">
          <div className="flex flex-col items-center gap-4 text-indigo-600">
             <Loader2 size={40} className="animate-spin" />
             <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
       </div>
     );
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden selection:bg-blue-200 selection:text-blue-900 bg-gray-50 text-gray-900">
      <AnimatePresence mode="wait">
        
        {currentView === 'login' && (
           <motion.div 
             key="login"
             initial={{ opacity: 0, scale: 0.98 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0, scale: 1.02 }}
             transition={{ duration: 0.4 }}
           >
             <LoginPage 
                onBack={() => navigateToView('landing')} 
                onLoginSuccess={handleLoginSuccess}
             />
           </motion.div>
        )}

        {currentView === 'terms' && (
           <motion.div 
             key="terms"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -20 }}
             transition={{ duration: 0.4 }}
           >
             <TermsOfServicePage onBack={() => navigateToView('landing')} />
           </motion.div>
        )}

        {currentView === 'privacy' && (
           <motion.div 
             key="privacy"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -20 }}
             transition={{ duration: 0.4 }}
           >
             <PrivacyPolicyPage onBack={() => navigateToView('landing')} />
           </motion.div>
        )}
        
        {currentView === 'security' && (
           <motion.div 
             key="security"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -20 }}
             transition={{ duration: 0.4 }}
           >
             <SecurityPage onBack={() => navigateToView('landing')} />
           </motion.div>
        )}

        {currentView === 'pricing' && (
           <motion.div 
             key="pricing"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -20 }}
             transition={{ duration: 0.4 }}
           >
             <PricingPage 
                onBack={() => navigateToView(user ? 'dashboard' : 'landing')} 
                currentUser={user}
                onPlanSelected={() => navigateToView('dashboard')}
             />
           </motion.div>
        )}

        {currentView === 'help' && (
           <motion.div 
             key="help"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -20 }}
             transition={{ duration: 0.4 }}
           >
             <HelpPage onBack={() => navigateToView(user ? 'dashboard' : 'landing')} />
           </motion.div>
        )}

        {currentView === 'features' && (
           <motion.div 
             key="features"
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             exit={{ opacity: 0, x: -20 }}
             transition={{ duration: 0.4 }}
           >
             <FeaturesPage onBack={() => navigateToView('landing')} />
           </motion.div>
        )}

        {currentView === 'editor' && (
           <motion.div 
             key="editor"
             initial={{ opacity: 0, scale: 0.98 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0, scale: 1.02 }}
             transition={{ duration: 0.4 }}
             className="h-screen overflow-hidden"
           >
             <EditorPage 
                filePath={selectedFilePath} 
                onBack={() => navigateToView('dashboard')} 
                onNavigateToPricing={() => navigateToView('pricing')}
                currentUser={user}
             />
           </motion.div>
        )}

        {currentView === 'dashboard' && (
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            className="h-screen overflow-hidden"
          >
            <LibraryDashboard 
                onBack={() => navigateToView('landing')} 
                onOpenEditor={handleOpenEditor}
                onNavigateToPricing={() => navigateToView('pricing')}
                currentUser={user}
            />
          </motion.div>
        )}

        {currentView === 'landing' && (
          <motion.div
            key="landing"
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Navbar 
              onStartWriting={handleStart} 
              onLogin={() => navigateToView('login')}
              onLogout={handleLogout}
              onNavigateToFeatures={() => navigateToView('features')}
              onNavigateToHelp={() => navigateToView('help')}
              onNavigateToPricing={() => navigateToView('pricing')}
              user={user}
            />
            <HeroSection onStartWriting={handleStart} />
            <FeaturesGrid />
            <NotebookDemo />
            <Footer 
                onNavigateToPrivacy={() => navigateToView('privacy')} 
                onNavigateToTerms={() => navigateToView('terms')}
                onNavigateToSecurity={() => navigateToView('security')}
            />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
