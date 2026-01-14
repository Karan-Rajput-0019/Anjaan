import { motion, AnimatePresence } from 'framer-motion'
import { X, Command, Keyboard } from 'lucide-react'

const ShortcutRow = ({ keys, description }) => (
    <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
        <span className="text-sm text-text-secondary">{description}</span>
        <div className="flex gap-1.5">
            {keys.map((key, i) => (
                <kbd key={i} className="min-w-[24px] px-2 py-1 rounded-md bg-white/10 border border-white/20 text-[10px] font-bold text-primary flex items-center justify-center uppercase shadow-lg">
                    {key}
                </kbd>
            ))}
        </div>
    </div>
)

const ShortcutHelp = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-background/80 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-md glass-strong rounded-softest overflow-hidden border border-primary/20 shadow-purple-glow-lg"
                    >
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-primary/10 to-transparent">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-primary/20">
                                    <Keyboard size={18} className="text-primary" />
                                </div>
                                <h2 className="text-lg font-outfit font-bold text-text-primary">Keyboard Shortcuts</h2>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-text-muted">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col gap-1 max-h-[60vh] overflow-y-auto no-scrollbar">
                            <h3 className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-2">Global</h3>
                            <ShortcutRow keys={['Space']} description="Activate Voice Input" />
                            <ShortcutRow keys={['Esc']} description="Cancel / Close All" />
                            <ShortcutRow keys={['?']} description="Show This Help" />
                            <ShortcutRow keys={['Ctrl', 'L']} description="Language Selection" />
                            <ShortcutRow keys={['Ctrl', ',']} description="Open Settings" />
                            <ShortcutRow keys={['Ctrl', 'K']} description="Global Search / Command" />

                            <h3 className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] mt-6 mb-2">Navigation</h3>
                            <ShortcutRow keys={['Ctrl', '1']} description="Switch to Weather" />
                            <ShortcutRow keys={['Ctrl', '2']} description="Switch to News" />
                            <ShortcutRow keys={['Ctrl', '3']} description="Switch to Files" />
                            <ShortcutRow keys={['Ctrl', '4']} description="Switch to Music" />

                            <h3 className="text-[10px] font-bold text-error uppercase tracking-[0.2em] mt-6 mb-2">Chat</h3>
                            <ShortcutRow keys={['Ctrl', 'Shift', 'C']} description="Clear Chat History" />
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 bg-white/5 border-t border-white/5 text-center">
                            <p className="text-[10px] text-text-muted italic">
                                Use <Command size={10} className="inline mr-0.5" /> or Ctrl on Windows/Linux
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

export default ShortcutHelp
