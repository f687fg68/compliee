
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

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [selectedFilePath, setSelectedFilePath] = useState<string | null>(null);
  const [initialAiPrompt, setInitialAiPrompt] = useState<string>(''); 
  const [user, setUser] = useState<any>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      let attempts = 0;
      while (typeof (window as any).puter === 'undefined' && attempts < 50) {
          await new Promise(resolve => setTimeout(resolve, 100));
          attempts++;
      }

      if (typeof (window as any).puter === 'undefined') {
          console.error("Puter.js failed to initialize.");
          setIsAuthChecking(false);
          return;
      }

      try {
        if (puter.auth.isSignedIn()) {
          const userData = await puter.auth.getUser();
          setUser(userData);
          // Check subscription status from KV store
          const status = await puter.kv.get(`sub_${userData.username}`);
          setIsSubscribed(status === 'active');
        }
      } catch (e) {
        console.log("Not signed in or auth error", e);
      } finally {
        setIsAuthChecking(false);
      }
    };
    checkAuth();
  }, []);

  const handleLoginSuccess = async (userData: any) => {
    setUser(userData);
    
    // Check subscription after login
    const status = await puter.kv.get(`sub_${userData.username}`);
    const isActive = status === 'active';
    setIsSubscribed(isActive);

    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Routing Logic
    if (!isActive) {
        setCurrentView('pricing'); // Enforce subscription immediately after login
    } else if (initialAiPrompt) {
        // If they had a pending prompt from Hero
        setSelectedFilePath(null);
        setCurrentView('editor');
    } else {
        setCurrentView('dashboard');
    }
  };

  const handleSubscriptionSuccess = async () => {
      if (user) {
          // Simulate backend webhook by setting KV flag
          await puter.kv.set(`sub_${user.username}`, 'active');
          setIsSubscribed(true);
          
          if (initialAiPrompt) {
              setCurrentView('editor');
          } else {
              setCurrentView('dashboard');
          }
      }
  };

  const handleLogout = async () => {
    try {
        await puter.auth.signOut();
    } catch (e) {
        console.log("Sign out error", e);
    }
    setUser(null);
    setIsSubscribed(false);
    setCurrentView('landing');
  };

  const handleStart = async (prompt?: string) => {
    if (prompt) setInitialAiPrompt(prompt);

    if (!user) {
        // Must sign in first
        setCurrentView('login');
    } else if (!isSubscribed) {
        // Must subscribe
        setCurrentView('pricing');
    } else {
        // All good
        if (prompt) {
            setSelectedFilePath(null);
            setCurrentView('editor');
        } else {
            setCurrentView('dashboard');
        }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenEditor = (filePath?: string) => {
    if (!isSubscribed) {
        setCurrentView('pricing');
        return;
    }
    setInitialAiPrompt(''); 
    if (filePath) setSelectedFilePath(filePath);
    else setSelectedFilePath(null);
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
          </div>
       </div>
     );
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden selection:bg-indigo-100 selection:text-indigo-900 bg-[#FAFAFA] text-gray-900">
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

        {/* ... (Other static pages like terms, privacy etc remain same logic) ... */}
        {['terms', 'privacy', 'security', 'pricing', 'help', 'features'].includes(currentView) && (
             <motion.div key={currentView} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {currentView === 'terms' && <TermsOfServicePage onBack={() => navigateToView('landing')} />}
                {currentView === 'privacy' && <PrivacyPolicyPage onBack={() => navigateToView('landing')} />}
                {currentView === 'security' && <SecurityPage onBack={() => navigateToView('landing')} />}
                {currentView === 'pricing' && (
                    <PricingPage 
                        onBack={() => navigateToView(user ? (isSubscribed ? 'dashboard' : 'landing') : 'landing')} 
                        currentUser={user} 
                        onSubscriptionComplete={handleSubscriptionSuccess}
                    />
                )}
                {currentView === 'help' && <HelpPage onBack={() => navigateToView(user ? 'dashboard' : 'landing')} />}
                {currentView === 'features' && <FeaturesPage onBack={() => navigateToView('landing')} />}
             </motion.div>
        )}

        {currentView === 'editor' && (
           <motion.div 
             key="editor"
             initial={{ opacity: 0, scale: 0.95, y: 20 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             exit={{ opacity: 0, scale: 1.05 }}
             transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} 
             className="h-screen overflow-hidden bg-[#F3F4F6]"
           >
             <EditorPage 
                filePath={selectedFilePath} 
                onBack={() => navigateToView('dashboard')} 
                onNavigateToPricing={() => navigateToView('pricing')}
                currentUser={user}
                isSubscribed={isSubscribed}
                initialPrompt={initialAiPrompt} 
             />
           </motion.div>
        )}

        {currentView === 'dashboard' && (
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-screen overflow-hidden"
          >
            <LibraryDashboard 
                onBack={() => navigateToView('landing')} 
                onOpenEditor={handleOpenEditor}
                onNavigateToPricing={() => navigateToView('pricing')}
                onLogout={handleLogout}
                currentUser={user}
                isSubscribed={isSubscribed}
            />
          </motion.div>
        )}

        {currentView === 'landing' && (
          <motion.div
            key="landing"
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <Navbar 
              onStartWriting={() => handleStart()} 
              onLogin={() => navigateToView('login')}
              onLogout={handleLogout}
              onNavigateToFeatures={() => navigateToView('features')}
              onNavigateToHelp={() => navigateToView('help')}
              onNavigateToPricing={() => navigateToView('pricing')}
              user={user}
              isSubscribed={isSubscribed}
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
