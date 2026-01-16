
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FileText, Plus, Check, Loader2, Trash2, ArrowRight,
    LogOut, Shield, Layout,
    Grid, List as ListIcon, X, Book, Crown, Lock
} from 'lucide-react';
import { SUBSCRIPTION_FILE } from '../App';

declare const puter: any;

interface LibraryDashboardProps {
    onBack: () => void;
    onOpenEditor: (path?: string) => void;
    onNavigateToPricing: () => void;
    onLogout: () => void;
    currentUser?: any;
}

export const LibraryDashboard = ({ onBack, onOpenEditor, onNavigateToPricing, onLogout, currentUser }: LibraryDashboardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDocTitle, setNewDocTitle] = useState('');
  const [newDocColor, setNewDocColor] = useState('#4f46e5'); 
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Backend State
  const [documents, setDocuments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const DOCS_DIR = 'compliee-docs';

  useEffect(() => {
    fetchDocs();
  }, []);

  const fetchDocs = async () => {
    try {
        await puter.fs.mkdir(DOCS_DIR, { createMissingParents: true, dedupeName: false }).catch(() => {});
        const items = await puter.fs.readdir(DOCS_DIR);
        const docs = items.filter((item: any) => !item.isDir);
        
        const enrichedDocs = await Promise.all(docs.map(async (doc: any) => {
            try {
                const blob = await puter.fs.read(doc.path);
                const text = await blob.text();
                const stat = await puter.fs.stat(doc.path);
                
                const colorMatch = text.match(/data-color="([^"]+)"/);
                const color = colorMatch ? colorMatch[1] : '#ffffff';
                
                const titleMatch = text.match(/<h1>(.*?)<\/h1>/);
                const title = titleMatch ? titleMatch[1] : doc.name.replace('.html', '').replace(/_/g, ' ');

                // Simulate metadata for the UI
                const wordCount = text.split(/\s+/).length;
                const score = Math.min(100, Math.floor((wordCount / 500) * 100)); // Fake score based on length
                const status = score > 80 ? 'Audited' : 'Draft';

                return { 
                    ...doc, 
                    color, 
                    title, 
                    updated: stat.mtime ? new Date(stat.mtime).toLocaleDateString() : 'Just now',
                    score,
                    status,
                    author: currentUser?.username || 'Admin'
                };
            } catch (e) {
                return { ...doc, color: '#ffffff', title: doc.name.replace('.html', ''), score: 0, status: 'Draft' };
            }
        }));

        enrichedDocs.sort((a, b) => b.created - a.created);
        setDocuments(enrichedDocs);
    } catch (err) {
        console.error("Failed to load documents", err);
    } finally {
        setIsLoading(false);
    }
  };

  const checkSubscriptionAndProceed = async (callback: () => void) => {
      // 1. Check if logged in
      if (!currentUser) {
          alert("Please sign in to access documents.");
          return;
      }

      // 2. Check for subscription
      try {
          await puter.fs.stat(SUBSCRIPTION_FILE);
          // File exists, user has paid
          callback();
      } catch (e) {
          // File does not exist, user must pay
          onNavigateToPricing();
      }
  };

  const handleCreateClick = () => {
      checkSubscriptionAndProceed(() => setIsModalOpen(true));
  };

  const handleOpenDoc = (path: string) => {
      checkSubscriptionAndProceed(() => onOpenEditor(path));
  };

  const handleCreate = async () => {
    if (!newDocTitle.trim()) return;
    setIsModalOpen(false);
    try {
        const fileName = `${newDocTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'untitled'}.html`;
        const path = `${DOCS_DIR}/${fileName}`;
        
        const initialContent = `
            <div id="metadata" style="display:none;" data-color="${newDocColor}"></div>
            <h1>${newDocTitle}</h1>
            <p><strong>Status:</strong> Draft</p>
            <p><strong>Owner:</strong> ${currentUser?.username || 'Admin'}</p>
            <hr>
            <p><br></p>
        `;
        
        await puter.fs.write(path, initialContent, { dedupeName: true });
        // Simulating loading for UX
        setTimeout(() => onOpenEditor(path), 500);
    } catch (err) {
        alert("Failed to create document: " + err);
    }
  };

  const handleDelete = async (e: React.MouseEvent, path: string) => {
    e.stopPropagation();
    if (window.confirm("Move this document to trash?")) {
        try {
            await puter.fs.delete(path);
            setDocuments(prev => prev.filter(d => d.path !== path));
        } catch (err) {
            alert("Could not delete file: " + err);
        }
    }
  };

  const COLORS = [
    { value: '#ffffff', label: 'Paper', bg: 'bg-gray-100', text: 'text-gray-900' },
    { value: '#1e293b', label: 'Dark', bg: 'bg-slate-800', text: 'text-white' }, 
    { value: '#4f46e5', label: 'Indigo', bg: 'bg-indigo-600', text: 'text-white' }, 
    { value: '#059669', label: 'Emerald', bg: 'bg-emerald-600', text: 'text-white' }, 
    { value: '#dc2626', label: 'Crimson', bg: 'bg-red-600', text: 'text-white' }, 
    { value: '#ea580c', label: 'Amber', bg: 'bg-orange-600', text: 'text-white' }, 
  ];

  return (
    <div className="flex h-screen w-full bg-[#F3F4F6] overflow-hidden font-sans text-gray-900 relative selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
         <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-200/40 rounded-full blur-[120px] mix-blend-multiply opacity-70" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-blue-200/40 rounded-full blur-[120px] mix-blend-multiply opacity-70" />
      </div>

      <AnimatePresence>
        {isModalOpen && (
            <CreateModal 
                onClose={() => setIsModalOpen(false)} 
                onCreate={handleCreate} 
                title={newDocTitle} 
                setTitle={setNewDocTitle}
                color={newDocColor}
                setColor={setNewDocColor}
                colors={COLORS}
            />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-20 lg:w-72 h-full flex flex-col p-4 relative z-20"
      >
        <div className="h-full bg-white/70 backdrop-blur-xl border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.04)] rounded-3xl flex flex-col p-6">
            <div className="flex items-center gap-3 mb-12 px-2 cursor-pointer group" onClick={onBack}>
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                    <Shield size={20} />
                </div>
                <span className="hidden lg:block font-serif font-bold text-xl text-gray-900 tracking-tight">Compliee</span>
            </div>

            <div className="space-y-2 flex-1">
                <p className="hidden lg:block text-xs font-bold text-gray-400 uppercase tracking-wider px-4 mb-2">Workspace</p>
                <SidebarItem icon={Layout} label="Dashboard" active />
            </div>

            <div className="mt-auto">
                 <div className="hidden lg:flex items-center gap-3 p-3 bg-white/50 rounded-xl border border-gray-100 mb-4">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
                        {currentUser?.username?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-bold truncate">{currentUser?.username || 'User'}</p>
                        <p className="text-xs text-gray-500 truncate">Administrator</p>
                    </div>
                 </div>
                <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                    <LogOut size={18} /> <span className="hidden lg:block">Sign Out</span>
                </button>
            </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative overflow-hidden z-10 p-4 pl-0">
        
        {/* Minimal Toolbar */}
        <div className="h-20 px-8 flex items-center justify-between">
            <div></div> {/* Spacer */}
            <div className="flex items-center gap-4">
                <div className="flex bg-white/50 rounded-lg p-1 border border-white/20">
                    <button 
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:bg-gray-100/50'}`}
                    >
                        <Grid size={18} />
                    </button>
                    <button 
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:bg-gray-100/50'}`}
                    >
                        <ListIcon size={18} />
                    </button>
                </div>
                
                <button 
                    onClick={handleCreateClick}
                    className="w-10 h-10 bg-gray-900 hover:bg-black text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 group"
                    title="Create New Policy"
                >
                    <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                </button>
            </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-8 pb-20 custom-scrollbar">
            
            {isLoading ? (
                <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                    <Loader2 size={32} className="animate-spin mb-4 text-indigo-500" />
                    <p>Syncing library...</p>
                </div>
            ) : documents.length === 0 ? (
                 <div className="flex flex-col items-center justify-center h-64 text-gray-400 bg-white/30 rounded-3xl border border-dashed border-gray-300">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <FileText size={32} className="opacity-50"/>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">No documents found</h3>
                    <p className="mb-6 text-sm">Create a new policy to get started with your compliance journey.</p>
                    <button onClick={handleCreateClick} className="text-indigo-600 font-medium hover:underline">Create Document</button>
                </div>
            ) : (
                <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-3"}>
                    <AnimatePresence>
                        {documents.map((doc) => (
                            <DocCard 
                                key={doc.path} 
                                doc={doc} 
                                viewMode={viewMode}
                                onClick={() => handleOpenDoc(doc.path)}
                                onDelete={(e) => handleDelete(e, doc.path)}
                            />
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon: Icon, label, active }: any) => (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 group ${active ? 'bg-indigo-50/80 text-indigo-700 shadow-sm' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
        <Icon size={20} className={active ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'} />
        <span className="hidden lg:block font-medium text-sm">{label}</span>
        {active && <div className="hidden lg:block ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500" />}
    </div>
);

const DocCard = ({ doc, viewMode, onClick, onDelete }: any) => {
    const isDark = doc.color !== '#ffffff';
    const statusColor = doc.status === 'Audited' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-amber-100 text-amber-700 border-amber-200';
    
    if (viewMode === 'list') {
        return (
            <motion.div 
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={onClick}
                className="group flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer"
            >
                <div className={`w-10 h-10 rounded-lg shrink-0 flex items-center justify-center border shadow-sm`} style={{ backgroundColor: doc.color, borderColor: isDark ? 'transparent' : '#e5e7eb' }}>
                    <FileText size={20} className={isDark ? 'text-white/80' : 'text-gray-400'} />
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 truncate">{doc.title}</h4>
                    <p className="text-xs text-gray-500 flex items-center gap-2">
                        <span>Updated {doc.updated}</span> • <span>{doc.author}</span>
                    </p>
                </div>
                <div className="flex items-center gap-6 mr-4">
                    <div className="w-24">
                        <div className="flex justify-between text-[10px] mb-1 text-gray-400">
                             <span>Health</span>
                             <span>{doc.score}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                             <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${doc.score}%` }} />
                        </div>
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${statusColor}`}>
                        {doc.status}
                    </span>
                    <button onClick={onDelete} className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                        <Trash2 size={16} />
                    </button>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={onClick}
            whileHover={{ y: -5 }}
            className="group relative cursor-pointer bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden aspect-[4/5]"
        >
            <div 
                className="h-2/5 p-5 relative flex flex-col justify-between transition-colors"
                style={{ backgroundColor: doc.color }}
            >
                <div className="flex justify-between items-start">
                    <div className={`p-2 rounded-lg backdrop-blur-md ${isDark ? 'bg-white/20 text-white' : 'bg-white/60 text-gray-500'}`}>
                        <Book size={16} />
                    </div>
                    <button 
                        onClick={onDelete}
                        className={`p-2 rounded-lg backdrop-blur-md transition-opacity opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white ${isDark ? 'bg-black/20 text-white' : 'bg-gray-100 text-gray-500'}`}
                    >
                        <Trash2 size={14} />
                    </button>
                </div>
                {isDark && <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />}
            </div>

            <div className="flex-1 p-5 flex flex-col justify-between bg-white relative">
                 <div className="-mt-10 mb-2">
                     <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100/50">
                        <h3 className="font-serif font-bold text-lg text-gray-900 line-clamp-2 leading-tight mb-1">
                            {doc.title}
                        </h3>
                        <p className="text-xs text-gray-400">Edited {doc.updated}</p>
                     </div>
                 </div>

                 <div className="space-y-4">
                     <div className="flex items-center justify-between">
                         <div className="flex -space-x-2">
                            <div className="w-6 h-6 rounded-full bg-indigo-100 border-2 border-white flex items-center justify-center text-[10px] text-indigo-700 font-bold">
                                {doc.author[0]}
                            </div>
                         </div>
                         <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusColor}`}>
                            {doc.status}
                         </span>
                     </div>

                     <div>
                         <div className="flex justify-between text-[10px] text-gray-400 mb-1.5">
                             <span>Audit Readiness</span>
                             <span className="font-medium text-gray-600">{doc.score}%</span>
                         </div>
                         <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                             <div 
                                className={`h-full rounded-full ${doc.score > 80 ? 'bg-emerald-500' : 'bg-indigo-500'}`} 
                                style={{ width: `${doc.score}%` }} 
                             />
                         </div>
                     </div>
                 </div>
            </div>
        </motion.div>
    );
};

const CreateModal = ({ onClose, onCreate, title, setTitle, color, setColor, colors }: any) => (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" 
        />
        <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden relative z-10 border border-gray-100"
        >
            <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-serif font-bold text-gray-900">New Policy</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors">
                        <X size={20} />
                    </button>
                </div>
                
                <div className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Document Title</label>
                        <input 
                            type="text" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Data Retention Policy 2026"
                            className="w-full text-lg bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
                            autoFocus
                        />
                    </div>
                    
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Cover Color</label>
                        <div className="flex flex-wrap gap-3">
                            {colors.map((c: any) => (
                                <button
                                    key={c.value}
                                    onClick={() => setColor(c.value)}
                                    className={`w-10 h-10 rounded-full border-2 transition-all hover:scale-110 ${color === c.value ? 'border-gray-900 scale-110 shadow-md' : 'border-transparent'} ${c.bg}`}
                                    title={c.label}
                                >
                                    {color === c.value && <Check size={16} className="text-white mx-auto" />}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-10 flex gap-3">
                    <button onClick={onClose} className="flex-1 px-4 py-3.5 text-gray-600 font-medium hover:bg-gray-50 rounded-xl transition-colors">
                        Cancel
                    </button>
                    <button 
                        onClick={onCreate} 
                        disabled={!title.trim()}
                        className="flex-1 px-6 py-3.5 bg-gray-900 hover:bg-black text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        <span>Create Document</span>
                        <ArrowRight size={16} />
                    </button>
                </div>
            </div>
            
            {/* Visual Decorative Strip */}
            <div className="h-2 w-full" style={{ backgroundColor: color }} />
        </motion.div>
    </div>
);
