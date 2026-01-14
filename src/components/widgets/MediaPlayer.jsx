import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Volume2, ListMusic } from 'lucide-react';

const MediaPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(70);

    return (
        <motion.div
            className="w-[450px] h-[360px] glass-strong rounded-[32px] p-8 border border-white/10 shadow-purple-glow-sm flex flex-col items-center gap-6"
        >
            {/* Album Art & Vinyl */}
            <div className="relative w-40 h-40 group">
                <motion.div
                    animate={isPlaying ? { rotate: 360 } : {}}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-2 bg-zinc-900 rounded-full border-[12px] border-zinc-800 shadow-2xl flex items-center justify-center overflow-hidden"
                >
                    <div className="w-full h-full opacity-40 mix-blend-overlay bg-[url('https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400&q=80')] bg-cover" />
                    <div className="absolute w-4 h-4 bg-zinc-700 rounded-full shadow-inner border border-zinc-600" />
                </motion.div>

                <motion.div
                    className="absolute inset-0 rounded-2xl shadow-2xl overflow-hidden border border-white/10 z-10"
                >
                    <img
                        src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400&q=80"
                        alt="Album Art"
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                <div className="absolute -inset-4 bg-primary/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Song Info */}
            <div className="text-center">
                <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Midnight City</h3>
                <p className="text-sm text-text-muted font-medium mt-1">M83 • Hurry Up, We're Dreaming</p>
                <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-[10px] font-bold text-primary mt-2 uppercase tracking-tighter">
                    Indie Electronic
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full space-y-2">
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative">
                    <motion.div
                        animate={{ width: isPlaying ? '100%' : '45%' }}
                        transition={{ duration: 180, ease: "linear" }}
                        className="h-full bg-gradient-to-r from-primary to-secondary"
                    />
                </div>
                <div className="flex justify-between text-[10px] text-text-muted font-bold">
                    <span>1:42</span>
                    <span>3:55</span>
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-8">
                <button className="text-text-muted hover:text-primary transition-colors">
                    <SkipBack size={24} />
                </button>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-purple-glow transition-all"
                >
                    {isPlaying ? <Pause size={28} /> : <Play size={28} className="translate-x-0.5" />}
                </motion.button>
                <button className="text-text-muted hover:text-primary transition-colors">
                    <SkipForward size={24} />
                </button>
            </div>

            {/* Footer Controls */}
            <div className="w-full flex items-center justify-between mt-auto">
                <div className="flex items-center gap-3">
                    <Volume2 size={16} className="text-text-muted" />
                    <div className="w-20 h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-secondary" style={{ width: `${volume}%` }} />
                    </div>
                </div>
                <div className="flex gap-4">
                    <Shuffle size={16} className="text-text-muted hover:text-primary cursor-pointer" />
                    <Repeat size={16} className="text-text-muted hover:text-primary cursor-pointer" />
                    <ListMusic size={16} className="text-text-muted hover:text-primary cursor-pointer" />
                </div>
            </div>
        </motion.div>
    );
};

export default MediaPlayer;
