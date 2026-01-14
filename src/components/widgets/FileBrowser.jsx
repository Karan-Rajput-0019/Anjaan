import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, File, Image, Music, Film, Archive, Search, ChevronRight, MoreVertical, LayoutGrid, List } from 'lucide-react';

const FileItem = ({ item, index }) => {
    const icons = {
        folder: Folder,
        document: File,
        image: Image,
        audio: Music,
        video: Film,
        archive: Archive
    };
    const Icon = icons[item.type] || File;
    const colors = {
        folder: 'text-secondary',
        document: 'text-primary',
        image: 'text-accent',
        audio: 'text-blue-400',
        video: 'text-red-400',
        archive: 'text-green-400'
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -5, scale: 1.05 }}
            className="flex flex-col items-center gap-3 glass-strong p-4 rounded-2xl border border-white/5 cursor-pointer group hover:shadow-purple-glow-sm"
        >
            <div className={`p-4 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors`}>
                <Icon size={32} className={colors[item.type] || 'text-text-muted'} />
            </div>
            <div className="text-center w-full px-1">
                <span className="text-[11px] font-bold text-text-primary block truncate">{item.name}</span>
                <span className="text-[9px] text-text-muted uppercase font-bold tracking-tighter">{item.size || 'Folder'}</span>
            </div>
        </motion.div>
    );
};

const FileBrowser = () => {
    const [search, setSearch] = useState('');

    const files = [
        { id: 1, name: "Project Assets", type: "folder" },
        { id: 2, name: "Voice_Sample.wav", type: "audio", size: "12.4 MB" },
        { id: 3, name: "UI_Mockup.png", type: "image", size: "2.8 MB" },
        { id: 4, name: "Draft_Proposal.pdf", type: "document", size: "450 KB" },
        { id: 5, name: "Core_Module.zip", type: "archive", size: "8.2 MB" },
        { id: 6, name: "Intro_Video.mp4", type: "video", size: "24.1 MB" },
        { id: 7, name: "Notes.txt", type: "document", size: "12 KB" },
        { id: 8, name: "Backgrounds", type: "folder" }
    ];

    const filteredFiles = files.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="w-[600px] h-[500px] glass-strong rounded-[32px] flex flex-col border border-white/10 shadow-purple-glow-sm overflow-hidden">
            {/* Header / Breadcrumbs */}
            <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-text-muted">
                    <button className="hover:text-primary transition-colors">Home</button>
                    <ChevronRight size={12} />
                    <button className="text-text-primary">Documents</button>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex bg-white/5 rounded-lg p-1">
                        <button className="p-1 px-2 bg-white/10 text-primary rounded-md"><LayoutGrid size={14} /></button>
                        <button className="p-1 px-2 text-text-muted hover:text-text-primary"><List size={14} /></button>
                    </div>
                </div>
            </div>

            {/* Sidebar + Main Grid */}
            <div className="flex flex-1 min-h-0">
                {/* Minimal Sidebar */}
                <div className="w-48 border-r border-white/5 p-6 space-y-4 hidden md:block">
                    <div className="space-y-2">
                        <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest pl-2">Favorites</span>
                        <div className="space-y-1">
                            {['Recents', 'Documents', 'Downloads'].map(item => (
                                <button key={item} className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all ${item === 'Documents' ? 'bg-primary/20 text-primary' : 'text-text-muted hover:text-text-primary hover:bg-white/5'
                                    }`}>
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main View */}
                <div className="flex-1 flex flex-col min-w-0">
                    <div className="p-6 pb-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={14} />
                            <input
                                type="text"
                                placeholder="Search files..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs text-text-primary focus:outline-none focus:border-primary transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 pt-2 custom-scrollbar">
                        <div className="grid grid-cols-3 gap-4">
                            {filteredFiles.map((file, i) => (
                                <FileItem key={file.id} item={file} index={i} />
                            ))}
                        </div>
                        {filteredFiles.length === 0 && (
                            <div className="h-full flex items-center justify-center opacity-30 italic text-xs text-text-muted">
                                No files matching your search
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileBrowser;
