
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Bold, Italic, Underline, List, ListOrdered, 
  Link, Image, ChevronDown, Loader2, Paperclip, 
  Wand2, Shield, Map, Printer, Undo, Redo, CheckCircle,  
  X, ArrowUp, Check, Bot, Minus, Plus, Baseline,
  MoreVertical, FileText, Crown, Lock, ArrowRight,
  AlignLeft, AlignCenter, AlignRight, Download
} from 'lucide-react';
import { SUBSCRIPTION_FILE } from '../App';

declare const Quill: any;
declare const puter: any;
declare const html2pdf: any;
declare const pdfjsLib: any;

interface EditorPageProps {
    onBack: () => void;
    onNavigateToPricing: () => void;
    filePath?: string | null;
    currentUser?: any;
}

const COLORS = [
    "#000000", "#434343", "#666666", "#999999", "#b7b7b7", "#cccccc", "#d9d9d9", "#efefef", "#f3f3f3", "#ffffff",
    "#980000", "#ff0000", "#ff9900", "#ffff00", "#00ff00", "#00ffff", "#4a86e8", "#0000ff", "#9900ff", "#ff00ff",
    "#e6b8af", "#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d0e0e3", "#c9daf8", "#cfe2f3", "#d9d2e9", "#ead1dc",
    "#dd7e6b", "#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#a4c2f4", "#9fc5e8", "#b4a7d6", "#d5a6bd",
    "#cc4125", "#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6d9eeb", "#6fa8dc", "#6fa8dc", "#8e7cc3", "#c27ba0",
    "#a61c00", "#cc0000", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3c78d8", "#3d85c6", "#674ea7", "#a64d79",
    "#85200c", "#990000", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#1155cc", "#0b5394", "#351c75", "#741b47",
    "#5b0f00", "#660000", "#783f04", "#7f6000", "#274e13", "#0c343d", "#1c4587", "#073763", "#20124d", "#4c1130"
];

export const EditorPage = ({ onBack, onNavigateToPricing, filePath, currentUser }: EditorPageProps) => {
  const quillRef = useRef<any>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const metadataRef = useRef<string>(''); 
  const saveTimeoutRef = useRef<any>(null);
  
  // Editor State
  const [docTitle, setDocTitle] = useState('Untitled Document');
  const [isSaving, setIsSaving] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  // UI State
  const [activeFormats, setActiveFormats] = useState<any>({});
  const [toolbarPopup, setToolbarPopup] = useState<{
      type: 'heading' | 'color-text' | null;
      rect: DOMRect;
  } | null>(null);

  // AI State
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [isRefining, setIsRefining] = useState(false);

  // Access Control State
  const [isAccessDenied, setIsAccessDenied] = useState(false);
  const [isCheckingAccess, setIsCheckingAccess] = useState(true);

  // Initial Load & Auth Check
  useEffect(() => {
    const init = async () => {
        await checkStrictAccess();
        
        if (editorRef.current && !quillRef.current) {
            initQuill();
        }
        if (filePath) {
            loadDocument(filePath);
        }
    };
    init();
  }, [filePath, currentUser]);

  const checkStrictAccess = async () => {
      setIsCheckingAccess(true);
      if (!currentUser) {
          setIsAccessDenied(true);
          setIsCheckingAccess(false);
          return;
      }
      try {
          await puter.fs.stat(SUBSCRIPTION_FILE);
          setIsAccessDenied(false);
      } catch (e) {
          setIsAccessDenied(true);
      } finally {
          setIsCheckingAccess(false);
      }
  };

  const initQuill = () => {
    if (!editorRef.current) return;
    if (quillRef.current) return;
    
    const quill = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Start writing your masterpiece...',
        modules: {
            toolbar: false,
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

    quill.on('selection-change', (range: any) => {
        if (range) setActiveFormats(quill.getFormat(range));
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

  const format = (fmt: string, value: any = true) => {
      if(quillRef.current) {
          quillRef.current.format(fmt, value);
          setActiveFormats((prev: any) => ({ ...prev, [fmt]: value }));
      }
      setToolbarPopup(null);
  };

  const toggleToolbarPopup = (e: React.MouseEvent, type: any) => {
      e.preventDefault();
      e.stopPropagation();
      const rect = e.currentTarget.getBoundingClientRect();
      if (toolbarPopup?.type === type) setToolbarPopup(null);
      else setToolbarPopup({ type, rect });
  };

  const insertEmbed = (type: string, value: any = true) => {
      if (!quillRef.current) return;
      const range = quillRef.current.getSelection(true);
      if (range) {
        quillRef.current.insertEmbed(range.index, type, value);
        quillRef.current.setSelection(range.index + 1);
      }
  };

  const handlePrint = () => window.print();
  const handleUndo = () => quillRef.current?.getModule('history')?.undo();
  const handleRedo = () => quillRef.current?.getModule('history')?.redo();

  // AI Logic
  const handleAiRefine = async () => {
    if (!quillRef.current) return;
    const range = quillRef.current.getSelection();
    if (!range || range.length === 0) {
        alert("Select text to analyze/polish.");
        return;
    }
    setIsRefining(true);
    try {
        const selectedText = quillRef.current.getText(range.index, range.length);
        const response = await puter.ai.chat(
            `Refine this text to be more formal, precise, and compliant with standard regulatory language. Maintain clarity. Text: "${selectedText}"`,
            { model: 'gemini-3-flash-preview' }
        );
        const refinedText = response?.message?.content || response?.text || "";
        if (refinedText) {
             quillRef.current.deleteText(range.index, range.length);
             quillRef.current.insertText(range.index, refinedText);
             quillRef.current.setSelection(range.index, refinedText.length);
        }
    } catch (err) {
        console.error("AI Polishing failed", err);
    } finally {
        setIsRefining(false);
    }
  };

  // Helper to extract text from file
  const extractFileContent = async (file: File): Promise<string> => {
      if (file.type === 'application/pdf') {
          if (!pdfjsLib) return "[PDF Library not loaded]";
          try {
             const arrayBuffer = await file.arrayBuffer();
             const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
             let fullText = '';
             // Limit to first 20 pages to avoid overload
             const maxPages = Math.min(pdf.numPages, 20);
             for (let i = 1; i <= maxPages; i++) {
                 const page = await pdf.getPage(i);
                 const textContent = await page.getTextContent();
                 const pageText = textContent.items.map((item: any) => item.str).join(' ');
                 fullText += `\n--- Page ${i} ---\n${pageText}`;
             }
             return fullText;
          } catch (e) {
              console.error("PDF Parse Error", e);
              return "Error extracting PDF text.";
          }
      } else if (file.type.startsWith('image/')) {
          // Placeholder for images
          return `[Image File: ${file.name} - Visual content extraction requires vision model]`;
      } else {
          // Try text
          return new Promise((resolve) => {
              const reader = new FileReader();
              reader.onload = (e) => resolve(e.target?.result as string);
              reader.onerror = () => resolve("[Error reading text file]");
              reader.readAsText(file);
          });
      }
  };

  const handleAiChatSubmit = async () => {
      if (!quillRef.current || (!aiPrompt.trim() && !attachedFile)) return;
      
      setIsAiChatOpen(false);
      setIsAiLoading(true);
      
      let promptToSend = aiPrompt;
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
        
        TASK: Generate a MASSIVE, DETAILED COMPLIANCE BOOK OR DOCUMENT (Minimum 10 pages).
        
        CRITICAL RULES FOR GENERATION:
        1. MASSIVE EXPANSION: Do not summarize. Write in extreme detail. If the user asks for a policy, include:
           - Detailed Purpose & Scope (500+ words)
           - Definitions (Extensive list)
           - Roles & Responsibilities (Detailed matrix)
           - Procedural Steps (Step-by-step with sub-steps)
           - Enforcement & Exceptions
           - References (ISO, SOC2, GDPR, etc.)
        2. PAGINATION: You MUST structure this as a multi-chapter book. Insert the delimiter [[PAGE_BREAK]] frequently to create at least 10 distinct pages/sections.
        3. STRUCTURE:
           - Chapter 1: Introduction
           - [[PAGE_BREAK]]
           - Chapter 2: Governance Structure
           - [[PAGE_BREAK]]
           - Chapter 3: ... (and so on up to 10+ chapters/pages)
        4. CONTENT QUALITY: Use formal, authoritative, and audit-ready language.
        5. FORMAT: Return raw HTML body. No markdown code blocks. Use <h2> for Chapter Titles, <h3> for Sections.
        `;
        
        const response = await puter.ai.chat(systemPrompt, { 
            model: 'gemini-3-pro-preview',
            config: {
                thinkingConfig: { thinkingBudget: 2048 } 
            }
        });
        const content = response?.message?.content || response?.text || ""; 
        
        if (content) {
            const selection = quillRef.current.getSelection(true) || { index: quillRef.current.getLength() };
            let cleanContent = content.replace(/^```html\s*/i, '').replace(/\s*```$/, '');
            cleanContent = cleanContent.replace(/\[\[PAGE_BREAK\]\]/g, '<hr class="page-break">');

            quillRef.current.clipboard.dangerouslyPasteHTML(selection.index, cleanContent);
            
            const editorHeight = editorRef.current?.scrollHeight || 0;
            const container = document.querySelector('.custom-scrollbar');
            if (container) container.scrollTo({ top: editorHeight, behavior: 'smooth' });
        }
      } catch (err) {
          console.error(err);
          alert("AI generation failed. Please try again.");
      } finally {
          setIsAiLoading(false);
      }
  };

  if (isCheckingAccess) {
      return (
          <div className="h-screen w-full flex items-center justify-center bg-gray-50">
              <div className="flex flex-col items-center gap-4">
                  <Loader2 className="animate-spin text-indigo-600" size={32} />
                  <p className="text-gray-500 font-medium">Verifying subscription...</p>
              </div>
          </div>
      );
  }

  return (
    <div className="flex flex-col h-screen w-full bg-[#F3F4F6] text-gray-900 font-sans overflow-hidden">
        
        <AnimatePresence>
            {isAccessDenied && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 z-[150] bg-gray-900/90 backdrop-blur-md flex items-center justify-center p-6"
                >
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
                        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-600">
                            <Lock size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Subscription Required</h2>
                        <p className="text-gray-500 mb-8">
                            You must have an active subscription to edit or create documents. Please upgrade to continue.
                        </p>
                        <button 
                            onClick={onNavigateToPricing}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold shadow-lg transition-all"
                        >
                            View Pricing Plans
                        </button>
                        <button 
                            onClick={onBack}
                            className="w-full mt-3 text-gray-400 hover:text-gray-600 text-sm font-medium py-2"
                        >
                            Back to Dashboard
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
        
        {/* Loading Overlay for AI */}
        <AnimatePresence>
            {isAiLoading && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[60] bg-white/80 backdrop-blur-sm flex items-center justify-center pointer-events-none"
                >
                     <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 relative">
                             <div className="absolute inset-0 border-4 border-indigo-200 rounded-full"></div>
                             <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
                             <Bot className="absolute inset-0 m-auto text-indigo-600" size={24} />
                        </div>
                        <p className="text-lg font-bold text-gray-800 animate-pulse">Drafting Compliance Document...</p>
                        <p className="text-sm text-gray-500">Reading context & attached files</p>
                     </div>
                </motion.div>
            )}
        </AnimatePresence>

        <input type="file" ref={fileInputRef} onChange={(e) => e.target.files && setAttachedFile(e.target.files[0])} className="hidden" accept="image/*,.pdf,.txt,.md" />

        {/* --- NAVBAR --- */}
        <motion.header 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="shrink-0 h-16 flex items-center justify-between px-6 z-40 bg-white border-b border-gray-200"
        >
             <div className="flex items-center gap-4">
                 <button onClick={() => { saveDocument(); onBack(); }} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors">
                    <ArrowLeft size={20} />
                 </button>
                 
                 <div className="h-6 w-px bg-gray-200 hidden sm:block" />

                 <div className="flex flex-col">
                     <input 
                        value={docTitle}
                        onChange={(e) => { setDocTitle(e.target.value); setIsSaving(true); setTimeout(saveDocument, 2000); }}
                        className="font-bold text-gray-800 placeholder:text-gray-400 border-none focus:ring-0 p-0 h-6 bg-transparent text-lg w-[200px] sm:w-[300px]"
                        placeholder="Untitled Document"
                     />
                     <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span>{wordCount} words</span>
                        <span className="hidden sm:inline">•</span>
                        <span className="hidden sm:inline">{isSaving ? 'Saving...' : 'Saved'}</span>
                     </div>
                 </div>
            </div>

            <div className="flex items-center gap-2">
                 <button onClick={handleExportPdf} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors" title="Export as PDF">
                    <Download size={20} />
                 </button>

                 <button onClick={handlePrint} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors" title="Print">
                    <Printer size={20} />
                 </button>
                 <button 
                    onClick={() => setIsAiChatOpen(true)}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors shadow-sm shadow-indigo-200"
                 >
                    <Wand2 size={16} />
                    <span className="hidden sm:inline">AI Assistant</span>
                 </button>
            </div>
        </motion.header>

        {/* --- TOOLBAR --- */}
        <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="shrink-0 h-12 bg-white border-b border-gray-200 flex items-center px-4 sm:px-6 gap-1 sm:gap-2 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] z-30 overflow-x-auto no-scrollbar"
        >
            <div className="flex items-center gap-1 mr-2 shrink-0">
                <ToolbarBtn icon={Undo} onClick={handleUndo} tooltip="Undo" />
                <ToolbarBtn icon={Redo} onClick={handleRedo} tooltip="Redo" />
            </div>
            
            <div className="w-px h-5 bg-gray-200 mx-1 sm:mx-2 shrink-0" />

            <button 
                data-popup-trigger="heading" 
                onMouseDown={(e) => e.preventDefault()} 
                onClick={(e) => toggleToolbarPopup(e, 'heading')}
                className="flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-lg hover:bg-gray-100 text-gray-700 text-sm font-medium transition-colors shrink-0"
            >
                <span className="hidden sm:inline">{activeFormats.header === 1 ? 'Title' : activeFormats.header === 2 ? 'Heading 2' : activeFormats.header === 3 ? 'Heading 3' : 'Paragraph'}</span>
                <span className="sm:hidden">{activeFormats.header === 1 ? 'H1' : activeFormats.header === 2 ? 'H2' : activeFormats.header === 3 ? 'H3' : 'P'}</span>
                <ChevronDown size={14} className="text-gray-400" />
            </button>

            <div className="w-px h-5 bg-gray-200 mx-1 sm:mx-2 shrink-0" />

            <ToolbarBtn icon={Bold} active={activeFormats.bold} onClick={() => format('bold', !activeFormats.bold)} tooltip="Bold"/>
            <ToolbarBtn icon={Italic} active={activeFormats.italic} onClick={() => format('italic', !activeFormats.italic)} tooltip="Italic"/>
            <ToolbarBtn icon={Underline} active={activeFormats.underline} onClick={() => format('underline', !activeFormats.underline)} tooltip="Underline"/>
            
            <button 
                data-popup-trigger="color-text" onMouseDown={(e) => e.preventDefault()} onClick={(e) => toggleToolbarPopup(e, 'color-text')} 
                className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors relative group shrink-0"
                title="Text Color"
            >
                <Baseline size={18} style={{ color: activeFormats.color || '#374151' }} />
                <span className="absolute bottom-1 right-1 w-2 h-2 rounded-full border border-white" style={{ backgroundColor: activeFormats.color || '#374151' }} />
            </button>

            <div className="w-px h-5 bg-gray-200 mx-1 sm:mx-2 shrink-0" />
            
            <ToolbarBtn icon={List} active={activeFormats.list === 'bullet'} onClick={() => format('list', 'bullet')} tooltip="Bullet List"/>
            <ToolbarBtn icon={ListOrdered} active={activeFormats.list === 'ordered'} onClick={() => format('list', 'ordered')} tooltip="Numbered List"/>
            
            <div className="w-px h-5 bg-gray-200 mx-1 sm:mx-2 shrink-0" />

            <ToolbarBtn icon={Link} onClick={() => format('link', prompt('Link URL'))} tooltip="Insert Link" />
            <ToolbarBtn icon={Image} onClick={() => insertEmbed('image', prompt('Image URL'))} tooltip="Insert Image" />

            <div className="flex-1 min-w-[20px]" />

            <button onClick={handleAiRefine} disabled={isRefining} className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${isRefining ? 'bg-indigo-50 text-indigo-600' : 'text-gray-500 hover:bg-indigo-50 hover:text-indigo-600'}`}>
                {isRefining ? <Loader2 size={14} className="animate-spin" /> : <Bot size={14} />}
                <span>Refine</span>
            </button>

        </motion.div>

        {/* --- MAIN EDITOR AREA --- */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden flex justify-center p-4 sm:p-8 custom-scrollbar bg-[#F3F4F6]" onClick={() => editorRef.current?.focus()}>
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.4 }}
               className="bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-200 w-full max-w-[816px] min-h-[1056px] p-[48px] sm:p-[96px] relative"
            >
               <div ref={editorRef} className="h-full min-h-[800px] outline-none text-gray-900 font-serif leading-loose" />
            </motion.div>
        </div>

        {/* AI Chat Drawer */}
        <AnimatePresence>
            {isAiChatOpen && (
                <motion.div 
                    initial={{ opacity: 0, y: 20, scale: 0.95, translateX: "-50%" }} 
                    animate={{ opacity: 1, y: 0, scale: 1, translateX: "-50%" }} 
                    exit={{ opacity: 0, y: 20, scale: 0.95, translateX: "-50%" }} 
                    className="fixed bottom-8 left-1/2 w-[90%] md:w-[600px] z-50 origin-bottom"
                >
                    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_20px_60px_-10px_rgba(0,0,0,0.2)] border border-white/60 overflow-hidden ring-1 ring-black/5">
                        <div className="p-4 border-b border-gray-100/50 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <Wand2 size={16} className="text-indigo-600" />
                                <span className="text-sm font-bold text-gray-800">Compliee Assistant</span>
                            </div>
                            <button onClick={() => setIsAiChatOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={16}/></button>
                        </div>
                        <div className="p-4">
                             <div className="relative bg-white rounded-2xl border border-gray-200 focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-100 transition-all shadow-inner">
                                {attachedFile && (
                                    <div className="px-4 pt-3 flex"><div className="bg-indigo-50 text-indigo-700 text-xs px-2 py-1 rounded-md flex items-center gap-2 border border-indigo-100"><Paperclip size={12} /><span className="max-w-[200px] truncate">{attachedFile.name}</span><button onClick={() => setAttachedFile(null)} className="hover:text-indigo-900"><X size={12}/></button></div></div>
                                )}
                                <textarea value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleAiChatSubmit()} placeholder="Ask Compliee to draft a policy, check regulations, or read attached files..." className="w-full bg-transparent p-4 pb-12 text-sm outline-none resize-none h-32 text-gray-700 placeholder:text-gray-400 font-medium" autoFocus />
                                <div className="absolute bottom-2 left-2 flex gap-2"><button onClick={() => fileInputRef.current?.click()} className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-colors"><Paperclip size={18} /></button></div>
                                <button onClick={handleAiChatSubmit} disabled={!aiPrompt.trim() && !attachedFile} className="absolute bottom-3 right-3 p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"><ArrowUp size={16} /></button>
                             </div>
                             <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar pb-1">
                                 <QuickPrompt label="Draft Full Policy" onClick={() => setAiPrompt("Draft a comprehensive Data Retention Policy with 3 distinct sections (Scope, Procedures, Enforcement).")} />
                                 <QuickPrompt label="Create Audit Report" onClick={() => setAiPrompt("Write an audit report finding for a missing firewall rule, including remediation steps.")} />
                             </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* Toolbar Popup */}
        {toolbarPopup && (
            <div 
                className="fixed z-[100] bg-white rounded-xl shadow-2xl border border-gray-100 py-2 overflow-hidden animate-in fade-in zoom-in-95 duration-100 min-w-[200px]"
                style={{ top: toolbarPopup.rect.bottom + 8, left: toolbarPopup.rect.left }} 
                onClick={() => setToolbarPopup(null)}
            >
                {toolbarPopup.type === 'heading' && (
                    <div className="flex flex-col">
                         <PopupOption label="Normal Text" sub="Paragraph" onClick={() => format('header', false)} active={!activeFormats.header}/>
                         <PopupOption label="Heading 1" sub="Document Title" onClick={() => format('header', 1)} active={activeFormats.header === 1} size="lg"/>
                         <PopupOption label="Heading 2" sub="Chapter" onClick={() => format('header', 2)} active={activeFormats.header === 2} size="md"/>
                         <PopupOption label="Heading 3" sub="Section" onClick={() => format('header', 3)} active={activeFormats.header === 3} size="sm"/>
                    </div>
                )}
                {toolbarPopup.type === 'color-text' && (
                    <div className="p-3 w-[240px]">
                        <div className="grid grid-cols-8 gap-1.5 mb-2">
                            {COLORS.map((color) => (
                                <ColorSwatch key={color} color={color} active={activeFormats.color === color} onClick={() => format('color', color)} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        )}

    </div>
  );
};

const ToolbarBtn = ({ icon: Icon, active, disabled, opacity, onClick, tooltip, shadow }: any) => (
    <button onMouseDown={(e) => e.preventDefault()} onClick={onClick} disabled={disabled} title={tooltip} className={`rounded-lg transition-all flex items-center justify-center w-8 h-8 shrink-0 ${active ? 'bg-indigo-50 text-indigo-600 shadow-sm ring-1 ring-indigo-100' : 'bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-900'} ${opacity ? 'opacity-50' : ''} ${disabled ? 'opacity-30 cursor-not-allowed' : ''} ${shadow ? 'shadow-lg shadow-gray-200/50 border border-gray-100' : ''}`}>
        <Icon size={18} strokeWidth={2} />
    </button>
);
const PopupOption = ({ label, sub, onClick, active, size }: any) => (
    <button onMouseDown={(e) => e.preventDefault()} onClick={onClick} className={`w-full text-left px-4 py-2 hover:bg-gray-50 flex flex-col justify-center transition-colors border-l-2 ${active ? 'bg-indigo-50/50 border-indigo-500' : 'border-transparent'}`}>
        <span className={`text-gray-900 ${size === 'lg' ? 'text-xl font-bold font-serif' : size === 'md' ? 'text-lg font-semibold font-serif' : size === 'sm' ? 'text-base font-medium font-serif' : 'text-sm font-normal'}`}>{label}</span>
        <span className="text-[10px] text-gray-400 uppercase tracking-wide">{sub}</span>
    </button>
);
const ColorSwatch = ({ color, active, onClick }: any) => (
    <button onMouseDown={(e) => e.preventDefault()} onClick={onClick} className={`w-6 h-6 rounded-md hover:scale-110 transition-transform relative border ${active ? 'border-gray-400 shadow-sm' : 'border-gray-200'}`} style={{ backgroundColor: color }}>
        {active && <div className="absolute inset-0 flex items-center justify-center"><Check size={12} className={['#ffffff', '#f3f3f3', '#efefef'].includes(color) ? 'text-black' : 'text-white'} /></div>}
    </button>
);
const QuickPrompt = ({ label, onClick }: any) => (
    <button onClick={onClick} className="px-3 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 text-xs rounded-lg font-medium transition-colors shadow-sm whitespace-nowrap">{label}</button>
);
