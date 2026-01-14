import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Mic,
    Settings,
    Loader2,
    Volume2,
    AlertTriangle,
    Activity,
    Bot,
    Globe,
    Brain,
    FileText,
    Music,
    Search,
    X,
    CheckCircle2,
    Clock
} from 'lucide-react'

const TaskItem = ({ task, onCancel }) => {
    const icons = {
        file: FileText,
        music: Music,
        search: Search,
        timer: Clock
    }
    const Icon = icons[task.type] || FileText

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex items-center gap-3 glass-strong px-3 py-1.5 rounded-xl border border-white/5 group"
        >
            <div className={`p-1.5 rounded-lg ${task.status === 'completed' ? 'bg-success/20' : 'bg-primary/10'}`}>
                <Icon size={14} className={task.status === 'completed' ? 'text-success' : 'text-primary'} />
            </div>

            <div className="flex flex-col min-w-[80px]">
                <span className="text-[11px] font-medium text-text-primary truncate">{task.name}</span>
                <div className="h-1 w-full bg-white/5 rounded-full mt-1 overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${task.progress}%` }}
                        className={`h-full ${task.status === 'failed' ? 'bg-error' : 'bg-secondary'}`}
                    />
                </div>
            </div>

            <button
                onClick={() => onCancel(task.id)}
                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded-full transition-all"
            >
                <X size={12} className="text-text-muted" />
            </button>
        </motion.div>
    )
}

const BottomBar = () => {
    const [voiceState, setVoiceState] = useState('idle') // idle, listening, processing, speaking, error
    const [tasks, setTasks] = useState([
        { id: 1, name: 'Processing Audio...', type: 'file', status: 'running', progress: 65 },
        { id: 2, name: 'Web Search: "Latest AI news"', type: 'search', status: 'running', progress: 30 }
    ])

    // Keyboard Shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === 'Space' && voiceState === 'idle') {
                e.preventDefault()
                setVoiceState('listening')
            } else if (e.code === 'Escape') {
                setVoiceState('idle')
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [voiceState])

    const toggleVoice = () => {
        const states = ['idle', 'listening', 'processing', 'speaking', 'error']
        const currentIndex = states.indexOf(voiceState)
        const nextIndex = (currentIndex + 1) % states.length
        setVoiceState(states[nextIndex])
    }

    const cancelTask = (id) => {
        setTasks(prev => prev.filter(t => t.id !== id))
    }

    return (
        <motion.footer
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="fixed bottom-0 left-0 right-0 h-[75px] glass-strong border-t border-white/10 px-8 flex items-center justify-between z-[100] backdrop-blur-[20px] shadow-[0_-8px_32px_rgba(0,0,0,0.3)]"
        >
            {/* LEFT: Voice Controller */}
            <div className="flex-[0.4] flex items-center gap-6">
                <div className="relative">
                    {/* Pulsing Ring for Listening */}
                    <AnimatePresence>
                        {voiceState === 'listening' && (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0.5 }}
                                animate={{ scale: 1.5, opacity: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
                                className="absolute inset-0 bg-primary/30 rounded-full"
                            />
                        )}
                    </AnimatePresence>

                    {/* Rotating Spinner for Processing */}
                    <AnimatePresence>
                        {voiceState === 'processing' && (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                className="absolute -inset-1 border-2 border-dashed border-secondary rounded-full opacity-60"
                            />
                        )}
                    </AnimatePresence>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleVoice}
                        className={`
                            relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 shadow-purple-glow
                            ${voiceState === 'idle' ? 'bg-gradient-to-br from-primary to-secondary' : ''}
                            ${voiceState === 'listening' ? 'bg-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.6)]' : ''}
                            ${voiceState === 'processing' ? 'bg-secondary/40' : ''}
                            ${voiceState === 'speaking' ? 'bg-gradient-to-tr from-accent to-primary' : ''}
                            ${voiceState === 'error' ? 'bg-error shadow-[0_0_20px_rgba(239,68,68,0.5)]' : ''}
                        `}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={voiceState}
                                initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                exit={{ opacity: 0, scale: 0.5, rotate: 20 }}
                            >
                                {voiceState === 'idle' && <Mic size={28} className="text-white" />}
                                {voiceState === 'listening' && <Mic size={28} className="text-white animate-pulse" />}
                                {voiceState === 'processing' && <Loader2 size={28} className="text-white animate-spin" />}
                                {voiceState === 'speaking' && <Volume2 size={28} className="text-white" />}
                                {voiceState === 'error' && <AlertTriangle size={28} className="text-white" />}
                            </motion.div>
                        </AnimatePresence>
                    </motion.button>
                </div>

                <div className="flex flex-col">
                    <span className={`text-sm font-bold uppercase tracking-widest transition-colors duration-500 ${voiceState === 'error' ? 'text-error' : 'text-text-primary'
                        }`}>
                        {voiceState === 'idle' && 'Push to Talk'}
                        {voiceState === 'listening' && 'Listening...'}
                        {voiceState === 'processing' && 'Analyzing...'}
                        {voiceState === 'speaking' && 'Anjaan is speaking'}
                        {voiceState === 'error' && 'Retry Access'}
                    </span>
                    <span className="text-[10px] text-text-muted mt-0.5 font-medium">
                        {voiceState === 'idle' && '[Space] to start'}
                        {voiceState !== 'idle' && '[Esc] to cancel'}
                    </span>
                </div>
            </div>

            {/* CENTER: Status Nexus */}
            <div className="flex-[0.3] flex items-center justify-center gap-8 glass-strong px-6 py-2 rounded-2xl border border-white/5">
                <div className="flex items-center gap-2 group cursor-help">
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                    <span className="text-[11px] font-bold text-text-secondary uppercase tracking-tighter">Ready</span>
                </div>

                <div className="w-[1px] h-4 bg-white/10" />

                <div className="flex items-center gap-3">
                    <motion.div whileHover={{ y: -2 }} className="p-1.5 hover:bg-primary/20 rounded-lg transition-colors cursor-pointer text-primary">
                        <Bot size={16} />
                    </motion.div>
                    <motion.div whileHover={{ y: -2 }} className="p-1.5 hover:bg-secondary/20 rounded-lg transition-colors cursor-pointer text-secondary">
                        <Globe size={16} />
                    </motion.div>
                    <motion.div whileHover={{ y: -2 }} className="p-1.5 hover:bg-accent/20 rounded-lg transition-colors cursor-pointer text-accent">
                        <Brain size={16} />
                    </motion.div>
                </div>

                <div className="w-[1px] h-4 bg-white/10" />

                <button className="flex items-center gap-2 px-2 py-1 hover:bg-white/5 rounded-lg transition-all group">
                    <span className="text-[11px] font-bold text-text-primary">EN</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary/50 group-hover:bg-secondary transition-colors" />
                </button>
            </div>

            {/* RIGHT: Task Monitor */}
            <div className="flex-[0.3] flex flex-row-reverse items-center gap-4 overflow-hidden">
                <AnimatePresence mode="popLayout">
                    {tasks.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center gap-2 text-text-muted/40"
                        >
                            <CheckCircle2 size={14} />
                            <span className="text-[11px] font-medium italic">No active tasks</span>
                        </motion.div>
                    ) : (
                        tasks.slice(0, 2).map((task) => (
                            <TaskItem key={task.id} task={task} onCancel={cancelTask} />
                        ))
                    )}
                </AnimatePresence>

                {tasks.length > 2 && (
                    <div className="relative translate-y-[-1px]">
                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-secondary rounded-full flex items-center justify-center border border-background">
                            <span className="text-[9px] font-bold text-white">{tasks.length}</span>
                        </div>
                        <Settings size={18} className="text-text-muted" />
                    </div>
                )}
            </div>
        </motion.footer>
    )
}

export default BottomBar
