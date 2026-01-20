
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Bold, Italic, Underline, List, ListOrdered, 
  Link, Image, ChevronDown, Loader2, Paperclip, 
  Wand2, Shield, Map, Printer, Undo, Redo, CheckCircle,  
  X, ArrowUp, Check, Bot, Minus, Plus, Baseline,
  MoreVertical, FileText, Crown, Lock, ArrowRight,
  AlignLeft, AlignCenter, AlignRight, Download, Menu,
  Sidebar, Settings, Activity, FileCheck, Share, AlertTriangle, Eye, EyeOff, Layout
} from 'lucide-react';

declare const Quill: any;
declare const puter: any;
declare const html2pdf: any;
declare const pdfjsLib: any;

interface EditorPageProps {
    onBack: () => void;
    onNavigateToPricing: () => void;
    filePath?: string | null;
    currentUser?: any;
    initialPrompt?: string;
    isSubscribed?: boolean;
}

export const EditorPage = ({ onBack, onNavigateToPricing, filePath, currentUser, initialPrompt, isSubscribed }: EditorPageProps) => {
  const quillRef = useRef<any>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const metadataRef = useRef<string>(''); 
  const saveTimeoutRef = useRef<any>(null);
  
  // Editor State
  const [docTitle, setDocTitle] = useState('Untitled Document');
  const [isSaving, setIsSaving] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [activeSection, setActiveSection] = useState('document');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false); // New Focus Mode

  // Compliance State
  const [complianceScore, setComplianceScore] = useState<number>(0);
  const [complianceStatus, setComplianceStatus] = useState<string>('Not Audited');
  const [isCalculatingScore, setIsCalculatingScore] = useState(false);

  // AI State
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);

  // Strict Subscription Check
  useEffect(() => {
      if (!isSubscribed) {
          alert("Access Denied: You must have an active subscription to access the editor.");
          onNavigateToPricing();
      }
  }, [isSubscribed]);

  // Initial Load & AI Orchestration Trigger
  useEffect(() => {
    const init = async () => {
        if (!isSubscribed) return; // Prevent init if not subscribed

        if (editorRef.current && !quillRef.current) {
            initQuill();
        }
        if (filePath) {
            loadDocument(filePath);
        } else if (initialPrompt) {
            // ORCHESTRATION: If passing from Landing Page
            setDocTitle(initialPrompt.length > 40 ? initialPrompt.slice(0, 40) + "..." : initialPrompt);
            setAiPrompt(initialPrompt);
            // Small delay to allow UI to mount before showing the agent swarm
            setTimeout(() => {
                handleAiChatSubmit(initialPrompt); 
            }, 500);
        }
    };
    init();
  }, [filePath, currentUser, isSubscribed]);

  const initQuill = () => {
    if (!editorRef.current) return;
    if (quillRef.current) return;
    
    const quill = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Start writing your masterpiece...',
        modules: {
            toolbar: false, // We use our own toolbar/AI
            history: { delay: 1000, maxStack: 500, userOnly: true }
        }
    });
    quillRef.current = quill;

    quill.on('text-change', () => {
        setIsSaving(true);
        const text = quill.getText();
        setWordCount(text.trim().length === 0 ? 0 : text.trim().split(/\s+/).length);
        if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
        saveTimeoutRef.current = setTimeout(saveDocument, 2000);
    });
  };

  const loadDocument = async (path: string) => {
      try {
          const blob = await puter.fs.read(path);
          const text = await blob.text();
          
          const metadataRegex = /<div id="metadata"[\s\S]*?><\/div>/;
          const metadataMatch = text.match(metadataRegex);
          if (metadataMatch) metadataRef.current = metadataMatch[0];

          const h1Regex = /<h1>(.*?)<\/h1>/;
          const titleMatch = text.match(h1Regex);
          if (titleMatch) setDocTitle(titleMatch[1]);
          else {
              const fileName = path.split('/').pop() || 'Untitled';
              setDocTitle(fileName.replace('.html', '').replace(/_/g, ' '));
          }

          let cleanContent = text.replace(metadataRegex, '').replace(h1Regex, '');
          if (quillRef.current) {
              quillRef.current.clipboard.dangerouslyPasteHTML(cleanContent);
          }
          
      } catch (err) {
          console.error("Error loading file", err);
      }
  };

  const saveDocument = async () => {
      // Don't save if we don't have a filepath (unless we create one, skipping for demo)
      if (!filePath || !quillRef.current) return;
      try {
          const content = quillRef.current.root.innerHTML;
          const fileContent = `
            ${metadataRef.current}
            <h1>${docTitle}</h1>
            ${content}
          `;
          await puter.fs.write(filePath, fileContent.trim(), { overwrite: true });
          setIsSaving(false);
      } catch (err) {
          console.error("Save failed", err);
          setIsSaving(false);
      }
  };

  const handleExportPdf = () => {
    const element = editorRef.current?.querySelector('.ql-editor');
    if (!element) return;

    const opt = {
        margin: 20,
        filename: `${docTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'document'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    element.classList.add('exporting-pdf');
    html2pdf().set(opt).from(element).save().then(() => {
        element.classList.remove('exporting-pdf');
    }).catch((err: any) => {
        console.error("PDF Export failed", err);
        alert("Could not generate PDF. Please try again.");
    }).finally(() => {
        element.classList.remove('exporting-pdf');
    });
  };

  const handleCheckCompliance = async () => {
      if (!quillRef.current) return;
      setIsCalculatingScore(true);
      
      const text = quillRef.current.getText();
      
      if (text.trim().length < 50) {
          setComplianceScore(10);
          setComplianceStatus("Too Short");
          setIsCalculatingScore(false);
          return;
      }

      try {
          const prompt = `
          You are a strict Compliance Auditor (SOC2, ISO27001, GDPR). 
          Evaluate the following document text.
          Text: "${text.slice(0, 8000)}"
          
          Respond ONLY with a valid JSON object in this format (no markdown):
          {
             "score": number, // 0 to 100
             "status": "string" // e.g. "Excellent", "Good", "Needs Review"
          }
          `;

          const response = await puter.ai.chat(prompt, { model: 'gemini-3-flash-preview' });
          const rawText = response?.message?.content || response?.text || "{}";
          const jsonStr = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
          const result = JSON.parse(jsonStr);
          
          setComplianceScore(result.score || 0);
          setComplianceStatus(result.status || 'Needs Review');
      } catch (err) {
          console.error("Compliance Check Failed", err);
      } finally {
          setIsCalculatingScore(false);
      }
  };


  const extractFileContent = async (file: File): Promise<string> => {
      if (file.type === 'application/pdf') {
          if (!pdfjsLib) return "[PDF Library not loaded]";
          try {
             const arrayBuffer = await file.arrayBuffer();
             const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
             let fullText = '';
             const maxPages = Math.min(pdf.numPages, 20);
             for (let i = 1; i <= maxPages; i++) {
                 const page = await pdf.getPage(i);
                 const textContent = await page.getTextContent();
                 const pageText = textContent.items.map((item: any) => item.str).join(' ');
                 fullText += `\n--- Page ${i} ---\n${pageText}`;
             }
             return fullText;
          } catch (e) {
              return "Error extracting PDF text.";
          }
      } else {
          return new Promise((resolve) => {
              const reader = new FileReader();
              reader.onload = (e) => resolve(e.target?.result as string);
              reader.onerror = () => resolve("[Error reading text file]");
              reader.readAsText(file);
          });
      }
  };

  const handleAiChatSubmit = async (overridePrompt?: string) => {
      const promptToUse = overridePrompt || aiPrompt;
      if (!quillRef.current || (!promptToUse.trim() && !attachedFile)) return;
      
      setIsAiChatOpen(false);
      setIsAiLoading(true);
      
      let promptToSend = promptToUse;
      let extractedContent = '';

      if (attachedFile) {
          extractedContent = await extractFileContent(attachedFile);
          promptToSend += `\n\n=== ATTACHED FILE: ${attachedFile.name} ===\n${extractedContent}\n=== END ATTACHMENT ===\n`;
      }

      setAiPrompt('');
      setAttachedFile(null);
      
      try {
        const text = quillRef.current.getText();
        const context = text.slice(-3000);
        
        const systemPrompt = `YOU ARE COMPLIEE, AN ELITE COMPLIANCE WRITING ASSISTANT.
        CONTEXT (Last 3000 chars): "...${context}"
        
        USER INSTRUCTION: "${promptToSend}"
        
        TASK: Update the document based on the instruction. If asked to draft, create a detailed, formatted section.
        
        FORMAT: Return raw HTML body content. 
           - Use <h1> for the Main Title.
           - Use <h2> for Chapter Titles.
           - Use <h3> for Section Headers.
           - Use <p> for paragraphs.
           - Use <ul>/<li> for lists.
           - Do not use markdown code blocks like \`\`\`html.
           - Just return the HTML structure directly.
        `;
        
        const response = await puter.ai.chat(systemPrompt, { 
            model: 'gemini-3-flash-preview',
        });
        const content = response?.message?.content || response?.text || ""; 
        
        if (content) {
            const selection = quillRef.current.getSelection(true) || { index: quillRef.current.getLength() };
            let cleanContent = content.replace(/^```html\s*/i, '').replace(/\s*```$/, '');
            cleanContent = cleanContent.replace(/\[\[PAGE_BREAK\]\]/g, '<hr class="page-break">');

            quillRef.current.clipboard.dangerouslyPasteHTML(selection.index, cleanContent);
            
            // Auto focus mode if generating large content
            if (cleanContent.length > 500) setIsFocusMode(true);
        }
      } catch (err) {
          console.error(err);
          alert("AI generation failed. Please try again.");
      } finally {
          setIsAiLoading(false);
      }
  };

  if (!isSubscribed) return null;

  return (
    <div className="flex h-screen w-full bg-[#E5E5E5] text-gray-900 font-sans overflow-hidden relative">
        
        {/* Background Texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-0"></div>

        {/* --- LOADING OVERLAY --- */}
        <AnimatePresence>
            {isAiLoading && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-white/60 backdrop-blur-md flex items-center justify-center pointer-events-none"
                >
                     <div className="flex flex-col items-center gap-4 p-8 bg-white/80 shadow-2xl rounded-3xl max-w-lg text-center border border-white ring-1 ring-gray-100">
                        <div className="w-16 h-16 relative mb-4">
                             <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
                             <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
                             <Bot className="absolute inset-0 m-auto text-indigo-600" size={24} />
                        </div>
                        <h3 className="text-xl font-serif font-bold text-gray-900">Agent Swarm Active</h3>
                        <p className="text-sm text-gray-600 leading-relaxed font-medium">
                            Consulting regulatory database and drafting content...
                        </p>
                     </div>
                </motion.div>
            )}
        </AnimatePresence>

        <input type="file" ref={fileInputRef} onChange={(e) => e.target.files && setAttachedFile(e.target.files[0])} className="hidden" accept="image/*,.pdf,.txt,.md" />

        {/* --- DESKTOP SIDEBAR --- */}
        <motion.aside 
            animate={{ width: isFocusMode ? 0 : 280, opacity: isFocusMode ? 0 : 1, x: isFocusMode ? -50 : 0 }}
            className="hidden md:flex bg-[#F9FAFB]/90 backdrop-blur-xl border-r border-gray-200 flex-col shrink-0 z-10 overflow-hidden"
        >
             <div className="w-[280px]"> 
                <SidebarContent 
                    activeSection={activeSection} 
                    setActiveSection={setActiveSection} 
                    onBack={() => { saveDocument(); onBack(); }}
                    docTitle={docTitle}
                    currentUser={currentUser}
                    complianceScore={complianceScore}
                    complianceStatus={complianceStatus}
                    isCalculatingScore={isCalculatingScore}
                />
             </div>
        </motion.aside>

        {/* --- MAIN CONTENT AREA --- */}
        <main className="flex-1 flex flex-col relative min-w-0 z-10 transition-all duration-500">
            
            {/* Header */}
            <motion.header 
                animate={{ y: isFocusMode ? -100 : 0, opacity: isFocusMode ? 0 : 1 }}
                className="h-20 flex items-center justify-between px-8 border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-30"
            >
                <div className="flex items-center gap-3">
                    <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                        <Menu size={20} />
                    </button>
                    <div className="flex flex-col">
                        <input 
                            value={docTitle}
                            onChange={(e) => { setDocTitle(e.target.value); setIsSaving(true); setTimeout(saveDocument, 2000); }}
                            className="text-lg font-serif font-bold text-gray-900 bg-transparent outline-none placeholder:text-gray-400 w-64 md:w-96 truncate"
                            placeholder="Untitled Document"
                        />
                        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                             <span className="hidden md:inline bg-gray-100 px-2 py-0.5 rounded text-[10px] uppercase tracking-wide">Draft</span>
                             <span className="hidden md:inline text-gray-300">|</span>
                             <span>{isSaving ? 'Saving...' : 'Saved to Cloud'}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button onClick={() => setIsFocusMode(!isFocusMode)} className="p-2.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors tooltip-trigger" title="Focus Mode">
                        {isFocusMode ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    <div className="w-px h-6 bg-gray-200 mx-1"></div>
                    <button onClick={handleExportPdf} className="p-2.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors" title="Export PDF">
                        <Download size={18} />
                    </button>
                    <button className="bg-black text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg hover:shadow-xl hover:bg-gray-800 transition-all">
                        Share
                    </button>
                </div>
            </motion.header>

            {/* Editor Scroll Area */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar flex justify-center pb-32" onClick={() => editorRef.current?.focus()}>
                
                {/* Focus Mode Exit Button (Floating) */}
                <AnimatePresence>
                    {isFocusMode && (
                        <motion.button 
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            onClick={() => setIsFocusMode(false)}
                            className="fixed top-6 right-6 z-50 p-3 bg-white/90 backdrop-blur border border-gray-200 shadow-xl rounded-full text-gray-500 hover:text-black hover:scale-110 transition-all"
                        >
                            <Layout size={20} />
                        </motion.button>
                    )}
                </AnimatePresence>

                <motion.div 
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`bg-white shadow-2xl border border-gray-100 w-full max-w-[850px] min-h-[1100px] p-12 md:p-20 relative my-8 md:my-12 transition-all duration-500 ${isFocusMode ? 'scale-105' : 'scale-100'}`}
                    style={{ aspectRatio: '8.5/11' }}
                >
                    <div ref={editorRef} className="h-full min-h-[800px] outline-none text-gray-900 font-serif leading-loose" />
                </motion.div>
            </div>

            {/* --- FLOATING ACTION BAR --- */}
            <motion.div 
                animate={{ y: isFocusMode ? 100 : 0, opacity: isFocusMode ? 0 : 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 w-[90%] md:w-auto flex justify-center pointer-events-none"
            >
                <motion.div 
                    className="flex items-center gap-1 bg-white/80 backdrop-blur-xl border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.12)] rounded-full px-2 py-2 ring-1 ring-black/5 pointer-events-auto"
                >
                    <button 
                        onClick={handleCheckCompliance}
                        disabled={isCalculatingScore}
                        className={`p-3 rounded-full transition-colors relative group ${isCalculatingScore ? 'bg-gray-100 text-gray-400' : 'hover:bg-green-50 text-gray-500 hover:text-green-600'}`} 
                        title="Check Compliance"
                    >
                        {isCalculatingScore ? <Loader2 size={20} className="animate-spin" /> : <Shield size={20} />}
                        {complianceScore > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
                                {Math.floor(complianceScore/10)}
                            </span>
                        )}
                    </button>
                    
                    <div className="w-px h-6 bg-gray-200 mx-1"></div>
                    
                    <button 
                        onClick={() => setIsAiChatOpen(true)}
                        className="p-3 hover:bg-indigo-50 rounded-full text-indigo-600 hover:text-indigo-700 transition-all hover:scale-110 active:scale-95 group relative"
                        title="AI Assistant"
                    >
                        <Wand2 size={24} className="group-hover:rotate-12 transition-transform"/>
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-indigo-500 rounded-full border-2 border-white animate-pulse"></span>
                    </button>
                    
                    <div className="w-px h-6 bg-gray-200 mx-1"></div>

                    <button 
                        className="p-3 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
                        title="Attach File"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Paperclip size={20} />
                    </button>
                </motion.div>
            </motion.div>

            {/* --- AI CHAT OVERLAY --- */}
            <AnimatePresence>
                {isAiChatOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: 40, scale: 0.9, translateX: "-50%" }} 
                        animate={{ opacity: 1, y: 0, scale: 1, translateX: "-50%" }} 
                        exit={{ opacity: 0, y: 40, scale: 0.9, translateX: "-50%" }} 
                        className="absolute bottom-24 left-1/2 w-[95%] md:w-[600px] z-50 origin-bottom"
                    >
                        <div className="bg-white/80 backdrop-blur-2xl rounded-[2rem] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.3)] border border-white/50 overflow-hidden ring-1 ring-white/60">
                            <div className="p-4 border-b border-gray-100/50 flex justify-between items-center bg-white/40">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                                        <Wand2 size={14} />
                                    </div>
                                    <span className="text-sm font-bold text-gray-900">Compliee Assistant</span>
                                </div>
                                <button onClick={() => setIsAiChatOpen(false)} className="text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full p-1 transition-colors"><X size={16}/></button>
                            </div>
                            <div className="p-4">
                                <div className="relative bg-white rounded-2xl border border-gray-200 focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-100 transition-all shadow-inner">
                                    {attachedFile && (
                                        <div className="px-4 pt-3 flex"><div className="bg-indigo-50 text-indigo-700 text-xs px-2 py-1 rounded-md flex items-center gap-2 border border-indigo-100"><Paperclip size={12} /><span className="max-w-[200px] truncate">{attachedFile.name}</span><button onClick={() => setAttachedFile(null)} className="hover:text-indigo-900"><X size={12}/></button></div></div>
                                    )}
                                    <textarea 
                                        value={aiPrompt} 
                                        onChange={(e) => setAiPrompt(e.target.value)} 
                                        onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleAiChatSubmit()} 
                                        placeholder="Ask to draft a section, cite a regulation, or rewrite for clarity..." 
                                        className="w-full bg-transparent p-4 pb-12 text-sm outline-none resize-none h-32 text-gray-800 placeholder:text-gray-400 font-medium" 
                                        autoFocus 
                                    />
                                    <div className="absolute bottom-2 left-2 flex gap-2"><button onClick={() => fileInputRef.current?.click()} className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-colors"><Paperclip size={18} /></button></div>
                                    <button onClick={() => handleAiChatSubmit()} disabled={!aiPrompt.trim() && !attachedFile} className="absolute bottom-3 right-3 p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"><ArrowUp size={16} /></button>
                                </div>
                                <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar pb-1">
                                    <QuickPrompt label="Draft Scope" onClick={() => setAiPrompt("Draft a Scope section for this policy.")} />
                                    <QuickPrompt label="Professional Tone" onClick={() => setAiPrompt("Rewrite the selected text to be more formal and authoritative.")} />
                                    <QuickPrompt label="Add Sanctions" onClick={() => setAiPrompt("Add a section on Disciplinary Actions for non-compliance.")} />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    </div>
  );
};

const SidebarContent = ({ 
    activeSection, setActiveSection, onBack, docTitle, currentUser, 
    complianceScore = 0, complianceStatus = 'Pending', isCalculatingScore = false,
    isMobile = false, onClose
}: any) => {
    
    const getScoreColor = (score: number) => {
        if (score >= 80) return 'bg-emerald-500';
        if (score >= 60) return 'bg-amber-500';
        return 'bg-rose-500';
    };

    return (
        <div className="flex flex-col h-full p-6 relative">
             {isMobile && (
                <button onClick={onClose} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900">
                    <X size={20} />
                </button>
            )}

            {/* Logo/Back */}
            <div className="flex items-center gap-3 mb-10 cursor-pointer group" onClick={onBack}>
                <div className="w-9 h-9 bg-gray-900 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform ring-2 ring-gray-100">
                    <Shield size={18} />
                </div>
                <div>
                    <span className="font-serif font-bold text-lg text-gray-900 leading-none">Compliee</span>
                    <span className="text-[10px] text-gray-400 font-bold tracking-widest uppercase block mt-1">Workspace</span>
                </div>
            </div>

            {/* Navigation */}
            <div className="space-y-1 flex-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 pl-3">Outline</p>
                <SidebarItem 
                    icon={FileText} 
                    label="Document Body" 
                    active={activeSection === 'document'} 
                    onClick={() => setActiveSection('document')}
                />
            </div>

            {/* Compliance Panel */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xl shadow-gray-200/50 mt-auto mb-6">
                <div className="flex items-center justify-between mb-3">
                    <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Compliance Health</h5>
                    {isCalculatingScore && <Loader2 size={10} className="animate-spin text-gray-400"/>}
                </div>
                <div className="flex items-end gap-2 mb-2">
                    <span className="text-3xl font-serif font-bold text-gray-900">{complianceScore}</span>
                    <span className="text-xs text-gray-400 mb-1">/ 100</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-3">
                    <div 
                        className={`h-full rounded-full transition-all duration-1000 ${isCalculatingScore ? 'w-full animate-pulse bg-indigo-300' : getScoreColor(complianceScore)}`}
                        style={{ width: isCalculatingScore ? '100%' : `${complianceScore}%` }}
                    ></div>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${isCalculatingScore ? 'bg-gray-300' : getScoreColor(complianceScore)}`}></div>
                    <span className="text-xs font-medium text-gray-600">{complianceStatus}</span>
                </div>
            </div>
            
            {/* User Profile */}
            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white shadow-md">
                    {currentUser?.username?.[0]?.toUpperCase() || 'U'}
                </div>
                <div className="overflow-hidden">
                    <p className="text-xs font-bold text-gray-900 truncate">{currentUser?.username || 'Guest Writer'}</p>
                </div>
            </div>
        </div>
    );
};

const SidebarItem = ({ icon: Icon, label, active, onClick, badge }: any) => (
    <button 
        onClick={onClick}
        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${active ? 'bg-white shadow-md text-indigo-600 border border-gray-100' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'}`}
    >
        <div className="flex items-center gap-3">
            <Icon size={18} className={active ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'} />
            <span>{label}</span>
        </div>
        {badge && <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${active ? 'bg-indigo-50 text-indigo-700' : 'bg-gray-100 text-gray-400'}`}>{badge}</span>}
    </button>
);

const QuickPrompt = ({ label, onClick }: any) => (
    <button onClick={onClick} className="px-3 py-1.5 bg-gray-50 hover:bg-indigo-50 hover:text-indigo-700 text-gray-600 border border-gray-200 hover:border-indigo-100 text-xs rounded-lg font-medium transition-all shadow-sm whitespace-nowrap">{label}</button>
);
