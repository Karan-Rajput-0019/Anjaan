import { motion, AnimatePresence } from 'framer-motion'
import {
    Mic,
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
    Clock,
    ChevronUp
} from 'lucide-react'
import { useUI } from '../../contexts/UIContext'
import { useVoice } from '../../contexts/VoiceContext'
import { useTasks } from '../../contexts/TaskContext'

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
                <span className="text-[11px] font-medium text-text-primary truncate">{task.title}</span>
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
    const { isSmall } = useUI();
    const { voiceStatus, startListening, stopListening } = useVoice();
    const { activeTasks, completedTasks, cancelTask } = useTasks();

    return (
        <motion.footer
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`
                fixed bottom-0 left-0 right-0 h-[75px] glass-strong border-t border-white/10 px-4 sm:px-8 flex items-center justify-between z-[100] backdrop-blur-[20px] shadow-[0_-8px_32px_rgba(0,0,0,0.3)]
                ${isSmall ? 'flex-col justify-center gap-0 h-auto py-2' : ''}
            `}
        >
            {/* LEFT: Voice Controller */}
            <div className={`flex flex-1 items-center gap-4 sm:gap-6 ${isSmall ? 'w-full justify-center' : ''}`}>
                <div className="relative scale-90 sm:scale-100">
                    <AnimatePresence>
                        {voiceStatus === 'listening' && (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0.5 }}
                                animate={{ scale: 1.5, opacity: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
                                className="absolute inset-0 bg-primary/30 rounded-full"
                            />
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {voiceStatus === 'processing' && (
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
                        onClick={() => voiceStatus === 'listening' ? stopListening() : startListening()}
                        className={`
                            relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-500 shadow-purple-glow
                            ${voiceStatus === 'idle' ? 'bg-gradient-to-br from-primary to-secondary' : ''}
                            ${voiceStatus === 'listening' ? 'bg-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.6)]' : ''}
                            ${voiceStatus === 'processing' ? 'bg-secondary/40' : ''}
                            ${voiceStatus === 'speaking' ? 'bg-gradient-to-tr from-accent to-primary' : ''}
                            ${voiceStatus === 'error' ? 'bg-error shadow-[0_0_20px_rgba(239,68,68,0.5)]' : ''}
                        `}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={voiceStatus}
                                initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                exit={{ opacity: 0, scale: 0.5, rotate: 20 }}
                            >
                                {voiceStatus === 'idle' && <Mic size={24} className="text-white" />}
                                {voiceStatus === 'listening' && <Mic size={24} className="text-white animate-pulse" />}
                                {voiceStatus === 'processing' && <Loader2 size={24} className="text-white animate-spin" />}
                                {voiceStatus === 'speaking' && <Volume2 size={24} className="text-white" />}
                                {voiceStatus === 'error' && <AlertTriangle size={24} className="text-white" />}
                            </motion.div>
                        </AnimatePresence>
                    </motion.button>
                </div>

                <div className="flex flex-col">
                    <span className={`text-[10px] sm:text-sm font-bold uppercase tracking-widest transition-colors duration-500 ${voiceStatus === 'error' ? 'text-error' : 'text-text-primary'
                        }`}>
                        {voiceStatus === 'idle' && (isSmall ? 'Talk' : 'Push to Talk')}
                        {voiceStatus === 'listening' && 'Listening...'}
                        {voiceStatus === 'processing' && 'Analyzing...'}
                        {voiceStatus === 'speaking' && 'Speaking'}
                        {voiceStatus === 'error' && 'Retry'}
                    </span>
                    {!isSmall && (
                        <span className="text-[10px] text-text-muted mt-0.5 font-medium line-clamp-1">
                            {voiceStatus === 'idle' && '[Space] to start'}
                            {voiceStatus !== 'idle' && '[Esc] to cancel'}
                        </span>
                    )}
                </div>
            </div>

            {/* CENTER: Status Nexus (Hidden on Mobile) */}
            {!isSmall && (
                <div className="flex-[0.3] flex items-center justify-center gap-4 sm:gap-8 glass-strong px-4 sm:px-6 py-2 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-2 group cursor-help">
                        <div className="w-2 h-2 rounded-full bg-success animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                        <span className="hidden lg:block text-[11px] font-bold text-text-secondary uppercase tracking-tighter">Ready</span>
                    </div>

                    <div className="w-[1px] h-4 bg-white/10" />

                    <div className="flex items-center gap-2 sm:gap-3">
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
            )}

            {/* RIGHT: Task Monitor (Hidden on Mobile) */}
            {!isSmall && (
                <div className="flex-1 flex flex-row-reverse items-center gap-4 overflow-hidden">
                    <AnimatePresence mode="popLayout">
                        {activeTasks.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex items-center gap-2 text-text-muted/40"
                            >
                                <CheckCircle2 size={14} />
                                <span className="text-[11px] font-medium italic">Idle</span>
                            </motion.div>
                        ) : (
                            activeTasks.slice(0, 1).map((task) => (
                                <TaskItem key={task.id} task={task} onCancel={cancelTask} />
                            ))
                        )}
                    </AnimatePresence>

                    {activeTasks.length > 1 && (
                        <div className="relative translate-y-[-1px]">
                            <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-secondary rounded-full flex items-center justify-center border border-background">
                                <span className="text-[9px] font-bold text-white">{activeTasks.length}</span>
                            </div>
                            <Activity size={16} className="text-text-muted" />
                        </div>
                    )}
                </div>
            )}
        </motion.footer>
    )
}

export default BottomBar
