
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FileText, Plus, Check, Loader2, Trash2, ArrowRight,
    LogOut, Shield, Layout,
    Grid, List as ListIcon, X, Book, Crown, Lock
} from 'lucide-react';

declare const puter: any;

interface LibraryDashboardProps {
    onBack: () => void;
    onOpenEditor: (path?: string) => void;
    onNavigateToPricing: () => void;
    onLogout: () => void;
    currentUser?: any;
    isSubscribed?: boolean;
}

export const LibraryDashboard = ({ onBack, onOpenEditor, onNavigateToPricing, onLogout, currentUser, isSubscribed = false }: LibraryDashboardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDocTitle, setNewDocTitle] = useState('');
  const [newDocColor, setNewDocColor] = useState('#ffffff'); 
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

                const wordCount = text.split(/\s+/).length;
                const score = Math.min(100, Math.floor((wordCount / 500) * 100)); 
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

  const handleCreateClick = () => {
      if (!currentUser) {
          alert("Please sign in to access documents.");
          return;
      }
      if (!isSubscribed) {
          if(confirm("You need an active subscription to create new compliance books. View plans?")) {
              onNavigateToPricing();
          }
          return;
      }
      setIsModalOpen(true);
  };

  const handleOpenDoc = (path: string) => {
      if (!currentUser) {
          alert("Please sign in to access documents.");
          return;
      }
      if (!isSubscribed) {
          if(confirm("Your subscription is inactive. Please upgrade to access your library.")) {
              onNavigateToPricing();
          }
          return;
      }
      onOpenEditor(path);
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
    { value: '#ffffff', label: 'Paper', bg: 'bg-white', text: 'text-gray-900' },
    { value: '#1e293b', label: 'Dark', bg: 'bg-slate-800', text: 'text-white' }, 
    { value: '#4f46e5', label: 'Indigo', bg: 'bg-indigo-600', text: 'text-white' }, 
    { value: '#059669', label: 'Emerald', bg: 'bg-emerald-600', text: 'text-white' }, 
    { value: '#9f1239', label: 'Rose', bg: 'bg-rose-800', text: 'text-white' }, 
    { value: '#d97706', label: 'Amber', bg: 'bg-amber-600', text: 'text-white' }, 
  ];

  return (
    <div className="flex h-screen w-full bg-[#FAFAFA] overflow-hidden font-sans text-gray-900 relative selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-50/50 via-gray-50 to-white"></div>

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
        <div className="h-full bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-[2rem] flex flex-col p-6 ring-1 ring-black/5">
            <div className="flex items-center gap-3 mb-12 px-2 cursor-pointer group" onClick={onBack}>
                <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
                    <Shield size={20} />
                </div>
                <span className="hidden lg:block font-serif font-bold text-xl text-gray-900 tracking-tight">Compliee</span>
            </div>

            <div className="space-y-2 flex-1">
                <p className="hidden lg:block text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 mb-2">Library</p>
                <SidebarItem icon={Layout} label="All Books" active />
            </div>

            <div className="mt-auto">
                 <div className="hidden lg:flex items-center gap-3 p-3 bg-white/50 rounded-2xl border border-gray-100 mb-4 shadow-sm">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center text-sm font-bold shadow-md">
                        {currentUser?.username?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-bold truncate">{currentUser?.username || 'User'}</p>
                        {isSubscribed && <p className="text-[10px] text-indigo-600 truncate uppercase tracking-wider font-bold">Pro Plan</p>}
                    </div>
                 </div>
                 {!isSubscribed && (
                    <button onClick={onNavigateToPricing} className="w-full flex items-center justify-center gap-2 mb-3 px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-xs font-bold rounded-xl shadow-lg hover:scale-105 transition-transform">
                        <Crown size={14} /> Upgrade Now
                    </button>
                 )}
                <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-colors">
                    <LogOut size={18} /> <span className="hidden lg:block">Sign Out</span>
                </button>
            </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative overflow-hidden z-10 p-4 pl-0">
        
        {/* Toolbar */}
        <div className="h-24 px-8 flex items-center justify-between">
            <div>
                 <h1 className="text-3xl font-serif font-bold text-gray-900">My Bookshelf</h1>
                 <p className="text-gray-500 text-sm mt-1">Manage your compliance library</p>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex bg-gray-100 rounded-xl p-1 border border-gray-200">
                    <button 
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow text-black' : 'text-gray-500 hover:bg-gray-200'}`}
                    >
                        <Grid size={18} />
                    </button>
                    <button 
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow text-black' : 'text-gray-500 hover:bg-gray-200'}`}
                    >
                        <ListIcon size={18} />
                    </button>
                </div>
                
                <button 
                    onClick={handleCreateClick}
                    className={`h-12 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 active:translate-y-0 ${isSubscribed ? 'bg-gray-900 hover:bg-black text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed opacity-70'}`}
                >
                    {isSubscribed ? <Plus size={18} /> : <Lock size={18} />}
                    <span className="font-bold text-sm">New Book</span>
                </button>
            </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-8 pb-20 custom-scrollbar">
            
            {isLoading ? (
                <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                    <Loader2 size={32} className="animate-spin mb-4 text-indigo-500" />
                    <p className="text-sm font-medium">Fetching library...</p>
                </div>
            ) : documents.length === 0 ? (
                 <div className="flex flex-col items-center justify-center h-96 text-gray-400">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                        <Book size={32} className="opacity-30 text-gray-600"/>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No books found</h3>
                    <p className="mb-8 text-sm text-gray-500">Your library is empty. Start your first draft.</p>
                    <button onClick={handleCreateClick} className="text-indigo-600 font-bold hover:underline text-sm">Create a Book</button>
                </div>
            ) : (
                <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12" : "space-y-3"}>
                    <AnimatePresence>
                        {documents.map((doc) => (
                            <DocCard 
                                key={doc.path} 
                                doc={doc} 
                                viewMode={viewMode}
                                onClick={() => handleOpenDoc(doc.path)}
                                onDelete={(e) => handleDelete(e, doc.path)}
                                isSubscribed={isSubscribed}
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
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 group ${active ? 'bg-gray-100 text-black font-bold shadow-inner' : 'text-gray-500 hover:bg-white hover:text-gray-900 hover:shadow-sm'}`}>
        <Icon size={20} className={active ? 'text-black' : 'text-gray-400 group-hover:text-gray-600'} />
        <span className="hidden lg:block text-sm">{label}</span>
    </div>
);

const DocCard = ({ doc, viewMode, onClick, onDelete, isSubscribed }: any) => {
    const isDark = doc.color !== '#ffffff';
    
    if (viewMode === 'list') {
        return (
            <motion.div 
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={onClick}
                className={`group flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 hover:border-indigo-200 hover:shadow-lg transition-all cursor-pointer ${!isSubscribed ? 'opacity-70 grayscale' : ''}`}
            >
                <div className={`w-12 h-12 rounded-xl shrink-0 flex items-center justify-center border shadow-sm`} style={{ backgroundColor: doc.color, borderColor: isDark ? 'transparent' : '#e5e7eb' }}>
                    <Book size={20} className={isDark ? 'text-white/80' : 'text-gray-400'} />
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 truncate font-serif text-lg flex items-center gap-2">
                        {doc.title} {!isSubscribed && <Lock size={12} className="text-gray-400"/>}
                    </h4>
                    <p className="text-xs text-gray-500 flex items-center gap-2 mt-1">
                        <span>Updated {doc.updated}</span> • <span className="uppercase tracking-wider font-bold text-[10px]">{doc.status}</span>
                    </p>
                </div>
                <button onClick={onDelete} className="p-2 hover:bg-red-50 text-gray-300 hover:text-red-500 rounded-lg transition-colors">
                    <Trash2 size={18} />
                </button>
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
            whileHover={{ y: -10, rotateY: -5, scale: 1.02 }}
            className={`group relative cursor-pointer perspective-1000 ${!isSubscribed ? 'opacity-80' : ''}`}
            style={{ perspective: '1000px' }}
        >
            {/* 3D Book Cover Effect */}
            <div 
                className="relative aspect-[3/4] rounded-r-2xl rounded-l-md shadow-2xl transition-all duration-300 overflow-hidden"
                style={{ 
                    transformStyle: 'preserve-3d', 
                    boxShadow: '20px 20px 40px -10px rgba(0,0,0,0.15), 0 0 2px rgba(0,0,0,0.1)' 
                }}
            >
                {/* Background Color */}
                <div className="absolute inset-0 transition-colors" style={{ backgroundColor: doc.color }}>
                     {/* Paper Texture Overlay */}
                     <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
                </div>

                {/* Spine Effect */}
                <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/20 via-black/5 to-transparent z-10"></div>
                <div className="absolute left-3 top-0 bottom-0 w-[1px] bg-white/20 z-10"></div>
                
                {/* Cover Content */}
                <div className="relative z-20 h-full p-6 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-[10px] font-bold shadow-sm ${isDark ? 'border-white/20 text-white bg-white/10' : 'border-black/5 text-black bg-white/50'}`}>
                            {doc.author[0]}
                        </div>
                        {!isSubscribed && <Lock size={16} className={isDark ? "text-white/60" : "text-gray-500/60"} />}
                    </div>

                    <div>
                        <div className={`w-8 h-1 mb-4 rounded-full ${isDark ? 'bg-white/30' : 'bg-black/10'}`}></div>
                        <h3 className={`font-serif font-bold text-2xl leading-tight mb-3 line-clamp-3 ${isDark ? 'text-white drop-shadow-sm' : 'text-gray-900'}`}>
                            {doc.title}
                        </h3>
                        <p className={`text-[10px] font-bold uppercase tracking-widest opacity-60 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {doc.updated}
                        </p>
                    </div>
                </div>

                {/* Delete overlay */}
                <div className="absolute top-2 right-2 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
                     <button 
                        onClick={onDelete}
                        className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-red-500 hover:text-white transition-colors shadow-lg"
                    >
                        <Trash2 size={14} />
                    </button>
                </div>
            </div>

            {/* Reflection/Shadow underneath */}
            <div className="absolute -bottom-4 left-4 right-4 h-4 bg-black/30 blur-xl rounded-full opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
        </motion.div>
    );
};

const CreateModal = ({ onClose, onCreate, title, setTitle, color, setColor, colors }: any) => (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" 
        />
        <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 40 }}
            className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden relative z-10"
        >
            <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-serif font-bold text-gray-900">Bind New Book</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors">
                        <X size={20} />
                    </button>
                </div>
                
                <div className="space-y-8">
                    <div className="group">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 group-focus-within:text-indigo-600 transition-colors">Book Title</label>
                        <input 
                            type="text" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Employee Handbook 2026"
                            className="w-full text-xl font-serif bg-transparent border-b-2 border-gray-100 focus:border-indigo-600 px-2 py-2 transition-all outline-none placeholder:text-gray-300"
                            autoFocus
                        />
                    </div>
                    
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Cover Finish</label>
                        <div className="flex flex-wrap gap-4">
                            {colors.map((c: any) => (
                                <button
                                    key={c.value}
                                    onClick={() => setColor(c.value)}
                                    className={`w-12 h-12 rounded-full border-2 transition-all hover:scale-110 relative shadow-sm ${color === c.value ? 'border-gray-900 scale-110 shadow-md ring-2 ring-gray-100 ring-offset-2' : 'border-transparent'} ${c.bg}`}
                                    title={c.label}
                                >
                                    {color === c.value && <div className="absolute inset-0 m-auto w-1.5 h-1.5 rounded-full bg-white shadow-sm" />}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-12">
                    <button 
                        onClick={onCreate} 
                        disabled={!title.trim()}
                        className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold text-lg shadow-xl shadow-gray-200 hover:bg-black hover:shadow-2xl hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                        <span>Create & Open Editor</span>
                        <ArrowRight size={20} />
                    </button>
                </div>
            </div>
        </motion.div>
    </div>
);
