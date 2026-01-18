
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
    <div className="flex h-screen w-full bg-[#E5E5E5] overflow-hidden font-sans text-gray-900 relative selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Background Texture/Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

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
        <div className="h-full bg-white/80 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl flex flex-col p-6">
            <div className="flex items-center gap-3 mb-12 px-2 cursor-pointer group" onClick={onBack}>
                <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                    <Shield size={20} />
                </div>
                <span className="hidden lg:block font-serif font-bold text-xl text-gray-900 tracking-tight">Compliee</span>
            </div>

            <div className="space-y-2 flex-1">
                <p className="hidden lg:block text-xs font-bold text-gray-400 uppercase tracking-wider px-4 mb-2">Library</p>
                <SidebarItem icon={Layout} label="All Books" active />
            </div>

            <div className="mt-auto">
                 <div className="hidden lg:flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 mb-4">
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
            <div>
                 <h1 className="text-2xl font-serif font-bold text-gray-900">My Bookshelf</h1>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex bg-white/50 rounded-lg p-1 border border-white/20 shadow-sm">
                    <button 
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:bg-gray-100/50'}`}
                    >
                        <Grid size={18} />
                    </button>
                    <button 
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:bg-gray-100/50'}`}
                    >
                        <ListIcon size={18} />
                    </button>
                </div>
                
                <button 
                    onClick={handleCreateClick}
                    className="w-10 h-10 bg-black hover:bg-gray-800 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 group"
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
                    <Loader2 size={32} className="animate-spin mb-4 text-gray-500" />
                    <p>Fetching library...</p>
                </div>
            ) : documents.length === 0 ? (
                 <div className="flex flex-col items-center justify-center h-64 text-gray-400 bg-white/40 backdrop-blur-sm rounded-3xl border border-dashed border-gray-300">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <Book size={32} className="opacity-50 text-gray-600"/>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">No books found</h3>
                    <p className="mb-6 text-sm">Draft your first compliance book.</p>
                    <button onClick={handleCreateClick} className="text-indigo-600 font-bold hover:underline">Create Book</button>
                </div>
            ) : (
                <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8" : "space-y-3"}>
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
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 group ${active ? 'bg-gray-100 text-black font-bold shadow-sm' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
        <Icon size={20} className={active ? 'text-black' : 'text-gray-400 group-hover:text-gray-600'} />
        <span className="hidden lg:block text-sm">{label}</span>
        {active && <div className="hidden lg:block ml-auto w-1.5 h-1.5 rounded-full bg-black" />}
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
                    <Book size={20} className={isDark ? 'text-white/80' : 'text-gray-400'} />
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 truncate font-serif">{doc.title}</h4>
                    <p className="text-xs text-gray-500 flex items-center gap-2">
                        <span>Updated {doc.updated}</span> • <span>{doc.author}</span>
                    </p>
                </div>
                <div className="flex items-center gap-6 mr-4">
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
            whileHover={{ y: -8, rotateX: 2 }}
            className="group relative cursor-pointer flex flex-col perspective-1000"
        >
            {/* Book Cover Effect */}
            <div className="relative aspect-[3/4] rounded-r-2xl rounded-l-sm shadow-xl transition-all duration-300 overflow-hidden border-l-4 border-l-black/10">
                {/* Dynamic Background Color */}
                <div className="absolute inset-0 transition-colors" style={{ backgroundColor: doc.color }}>
                     {/* Paper Texture Overlay */}
                     {doc.color === '#ffffff' && <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>}
                </div>

                {/* Spine Highlight */}
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-black/20 to-transparent z-10"></div>
                
                {/* Cover Content */}
                <div className="relative z-20 h-full p-6 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${isDark ? 'border-white/30 text-white' : 'border-black/10 text-black'}`}>
                            {doc.author[0]}
                        </div>
                         <button 
                            onClick={onDelete}
                            className={`p-1.5 rounded-md backdrop-blur-md transition-opacity opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white ${isDark ? 'bg-black/20 text-white' : 'bg-gray-100 text-gray-500'}`}
                        >
                            <Trash2 size={14} />
                        </button>
                    </div>

                    <div>
                        <h3 className={`font-serif font-bold text-xl leading-tight mb-2 line-clamp-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {doc.title}
                        </h3>
                        <p className={`text-xs font-medium uppercase tracking-wider opacity-60 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {doc.updated}
                        </p>
                    </div>
                </div>
            </div>

            {/* Shadow underneath */}
            <div className="absolute -bottom-4 left-4 right-4 h-4 bg-black/20 blur-xl rounded-full opacity-60 group-hover:opacity-40 transition-opacity"></div>
        </motion.div>
    );
};

const CreateModal = ({ onClose, onCreate, title, setTitle, color, setColor, colors }: any) => (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        />
        <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative z-10"
        >
            <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-serif font-bold text-gray-900">New Book</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors">
                        <X size={20} />
                    </button>
                </div>
                
                <div className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Title</label>
                        <input 
                            type="text" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Employee Handbook 2026"
                            className="w-full text-lg bg-gray-50 border-b-2 border-gray-200 focus:border-black px-4 py-3 transition-all outline-none"
                            autoFocus
                        />
                    </div>
                    
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Cover Style</label>
                        <div className="flex flex-wrap gap-3">
                            {colors.map((c: any) => (
                                <button
                                    key={c.value}
                                    onClick={() => setColor(c.value)}
                                    className={`w-10 h-10 rounded-full border-2 transition-all hover:scale-110 ${color === c.value ? 'border-black scale-110 shadow-md' : 'border-transparent'} ${c.bg}`}
                                    title={c.label}
                                >
                                    {color === c.value && <Check size={16} className={['#ffffff', '#f3f3f3', '#efefef'].includes(c.value) ? 'text-black' : 'text-white'} style={{margin: '0 auto'}} />}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-10 flex gap-3">
                    <button 
                        onClick={onCreate} 
                        disabled={!title.trim()}
                        className="w-full px-6 py-4 bg-black text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:bg-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        <span>Create</span>
                        <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </motion.div>
    </div>
);
