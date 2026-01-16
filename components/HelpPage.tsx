
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Send, Bot, User, 
  CreditCard, HelpCircle, 
  Loader2, ExternalLink
} from 'lucide-react';

declare const puter: any;

interface HelpPageProps {
  onBack: () => void;
}

export const HelpPage = ({ onBack }: HelpPageProps) => {
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: 'Hi there! I\'m the Compliee AI Assistant. Ask me anything about compliance frameworks, how to use the editor, or managing your account.' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    const userText = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsTyping(true);

    try {
        const response = await puter.ai.chat(
            `System: You are a helpful support agent for the Compliee Compliance Suite web app. 
             The app features: AI Document Drafting, Legislative Tracking, Library Management, and Visual Generation.
             The user is asking for help. Be concise, friendly, and professional.
             User Question: ${userText}`,
            { model: 'gemini-3-flash-preview' }
        );
        const text = response?.message?.content || response?.text || "I couldn't generate a response. Please check your connection.";
        setMessages(prev => [...prev, { role: 'model', text: typeof text === 'string' ? text : JSON.stringify(text) }]);
    } catch (err) {
        setMessages(prev => [...prev, { role: 'model', text: "Sorry, something went wrong with the AI service." }]);
    } finally {
        setIsTyping(false);
    }
  };

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-gray-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
        {/* Nav */}
        <nav className="h-16 border-b border-gray-200 bg-white/80 backdrop-blur-md fixed top-0 w-full z-50 flex items-center justify-between px-6 mt-6">
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity" onClick={onBack}>
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <ArrowLeft size={16} className="text-gray-600" />
                </div>
                <span className="font-medium text-gray-600 text-sm">Back to App</span>
            </div>
            <div className="flex items-center gap-2">
                <HelpCircle size={18} className="text-indigo-600"/>
                <span className="font-serif font-bold text-gray-900">Help Center</span>
            </div>
            <div className="w-24"></div> {/* Spacer for balance */}
        </nav>

        <div className="pt-32 pb-12 px-6 container mx-auto max-w-6xl h-screen flex flex-col">
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-0">
                
                {/* Left Column: Guides - Scrollable */}
                <div className="lg:col-span-2 space-y-8 overflow-y-auto pr-2 custom-scrollbar pb-10">
                    
                    {/* Hero Text */}
                    <div className="mb-8">
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-serif text-gray-900 mb-4"
                        >
                            How can we help?
                        </motion.h1>
                        <p className="text-gray-500 text-lg font-light">
                            Watch our quick start guides or chat with our 24/7 AI support agent.
                        </p>
                    </div>

                    {/* Step-by-Step Guide for Credits */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm relative overflow-hidden"
                    >
                        {/* Decorative Background */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>

                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                                <CreditCard size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-serif font-bold text-gray-900">How to Add Credits</h2>
                                <p className="text-sm text-gray-500">Enable premium AI features in 3 steps</p>
                            </div>
                        </div>

                        {/* Steps */}
                        <div className="space-y-8 relative pl-2">
                             {/* Vertical Line */}
                            <div className="absolute left-[26px] top-4 bottom-4 w-0.5 bg-gray-100"></div>

                            <Step 
                                number="1" 
                                title="Visit Puter.com Dashboard" 
                                desc="Log in to your cloud account where your wallet is managed." 
                                link="https://puter.com"
                            />
                            <Step 
                                number="2" 
                                title="Navigate to Billing" 
                                desc="Click on your profile icon in the top right, then select 'Billing' or 'Wallet'." 
                            />
                            <Step 
                                number="3" 
                                title="Top Up Balance" 
                                desc="Add funds securely. Credits are immediately available for AI drafting." 
                            />
                        </div>

                        <a 
                            href="https://puter.com" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="mt-8 flex items-center justify-center gap-2 w-full bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-black transition-all shadow-lg shadow-gray-200"
                        >
                            Go to Puter.com <ExternalLink size={14}/>
                        </a>
                    </motion.div>

                </div>

                {/* Right Column: AI Chat - Fixed height container */}
                <div className="lg:col-span-1 h-full max-h-[calc(100vh-140px)]">
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white rounded-2xl border border-gray-200 shadow-xl shadow-gray-200/50 flex flex-col h-full overflow-hidden"
                    >
                        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="relative">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse absolute top-0 right-0"></div>
                                    <Bot size={20} className="text-indigo-600" />
                                </div>
                                <div>
                                    <span className="text-sm font-bold text-gray-900 block">Support AI</span>
                                    <span className="text-[10px] text-gray-500 font-medium">Powered by Gemini 3 Flash</span>
                                </div>
                            </div>
                        </div>

                        {/* Chat History */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white" ref={scrollRef}>
                            {messages.map((msg, idx) => (
                                <motion.div 
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                                >
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-transparent ${msg.role === 'user' ? 'bg-gray-100' : 'bg-indigo-50 text-indigo-600 border-indigo-100'}`}>
                                        {msg.role === 'user' ? <User size={14} className="text-gray-500" /> : <Bot size={14} />}
                                    </div>
                                    <div className={`p-3 rounded-2xl text-sm max-w-[85%] leading-relaxed shadow-sm border ${
                                        msg.role === 'user' 
                                        ? 'bg-gray-900 text-white border-gray-900 rounded-tr-none' 
                                        : 'bg-white border-gray-100 text-gray-600 rounded-tl-none'
                                    }`}>
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 text-indigo-600">
                                        <Bot size={14} />
                                    </div>
                                    <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-none shadow-sm">
                                        <Loader2 size={16} className="animate-spin text-indigo-500" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Chat Input */}
                        <div className="p-4 bg-white border-t border-gray-100">
                            <div className="relative">
                                <input 
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask about features, billing, or compliance..."
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-4 pr-12 text-sm focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all outline-none placeholder:text-gray-400"
                                />
                                <button 
                                    onClick={handleSend}
                                    disabled={!inputValue.trim() || isTyping}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Send size={14} />
                                </button>
                            </div>
                            <div className="text-[10px] text-center text-gray-400 mt-2">
                                AI responses can be inaccurate. Check important info.
                            </div>
                        </div>
                    </motion.div>
                </div>

            </div>
        </div>
    </div>
  );
};

const Step = ({ number, title, desc, link }: any) => (
    <div className="relative pl-12">
        <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-white border-2 border-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600 z-10 shadow-sm">
            {number}
        </div>
        <h3 className="text-sm font-bold text-gray-900 leading-tight">
            {link ? <a href={link} target="_blank" className="hover:underline hover:text-indigo-600">{title}</a> : title}
        </h3>
        <p className="text-xs text-gray-500 mt-1 leading-relaxed">{desc}</p>
    </div>
);
