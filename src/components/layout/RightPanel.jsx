import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    MessageCircle,
    Trash2,
    Clock,
    Brain,
    Globe,
    Zap,
    AlertCircle,
    MoreVertical
} from 'lucide-react'

const ChatMessage = ({ msg, isLast }) => {
    const isAI = msg.isAI
    const timestamp = msg.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
            className={`flex flex-col ${isAI ? 'items-start' : 'items-end'} mb-4`}
        >
            <div className={`flex items-start gap-2 max-w-[85%] ${isAI ? 'flex-row' : 'flex-row-reverse'}`}>
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-lg shrink-0 ${isAI ? 'bg-gradient-to-br from-primary to-secondary p-[1px]' : 'bg-white/10'
                    }`}>
                    <div className="w-full h-full rounded-full bg-background/50 flex items-center justify-center">
                        {isAI ? '🌸' : 'Y'}
                    </div>
                </div>

                {/* Message Bubble */}
                <div
                    className={`
                        relative px-4 py-3 shadow-glass transition-all duration-300 group
                        ${isAI
                            ? 'glass-strong rounded-tr-[16px] rounded-bl-[16px] rounded-br-[16px] rounded-tl-[4px] border-l-2 border-primary'
                            : 'bg-gradient-to-br from-primary/10 to-secondary/10 rounded-tl-[16px] rounded-bl-[16px] rounded-tr-[16px] rounded-br-[4px] border-r-2 border-secondary'
                        }
                    `}
                >
                    <p className="text-[14px] text-text-primary leading-relaxed whitespace-pre-wrap">
                        {msg.message}
                    </p>

                    {/* Timestamp overlay on hover */}
                    <div className="flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Clock size={10} className="text-text-muted" />
                        <span className="text-[10px] text-text-muted">{timestamp}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

const TypingIndicator = () => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center gap-2 glass-strong px-4 py-2 rounded-full w-fit mb-4"
    >
        {[0, 1, 2].map((i) => (
            <motion.div
                key={i}
                animate={{ scale: [1, 1.2, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                className="w-1.5 h-1.5 bg-primary rounded-full"
            />
        ))}
    </motion.div>
)

const InfoCard = ({ icon: Icon, title, value, detail, color = 'primary' }) => (
    <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="glass-strong rounded-[16px] p-4 flex flex-col gap-1 cursor-pointer group transition-all duration-300 hover:shadow-purple-glow-sm"
    >
        <div className="flex items-center justify-between mb-1">
            <div className={`p-1.5 rounded-lg bg-${color}/10`}>
                <Icon size={16} className={`text-${color} group-hover:scale-110 transition-transform`} />
            </div>
            <MoreVertical size={14} className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">{title}</span>
        <span className="text-[13px] font-bold text-text-primary">{value}</span>
        {detail && <span className="text-[10px] text-text-muted italic">{detail}</span>}
    </motion.div>
)

const RightPanel = () => {
    const scrollRef = useRef(null)
    const [messages, setMessages] = useState([
        { id: 1, message: 'How can I help you today?', time: '10:30 AM', isAI: true },
        { id: 2, message: 'Tell me about the weather', time: '10:31 AM', isAI: false },
        { id: 3, message: 'The weather today is sunny with a light breeze. Perfect for a walk!', time: '10:31 AM', isAI: true },
    ])
    const [isTyping, setIsTyping] = useState(false)

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages, isTyping])

    const clearHistory = () => {
        if (window.confirm('Are you sure you want to clear chat history?')) {
            setMessages([])
        }
    }

    return (
        <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-[380px] flex flex-col gap-6 h-full hidden xl:flex"
        >
            {/* Top Section (70%): Chat Messages */}
            <div className="flex-[0.7] glass-strong rounded-[24px] p-6 flex flex-col overflow-hidden border-primary/10">
                <div className="flex items-center justify-between mb-6 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-primary/10">
                            <MessageCircle size={18} className="text-primary" />
                        </div>
                        <h2 className="text-sm font-outfit font-semibold text-text-primary uppercase tracking-widest">
                            Chat Log
                        </h2>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={clearHistory}
                        className="p-2 rounded-xl hover:bg-error/20 transition-all group"
                        title="Clear log"
                    >
                        <Trash2 size={16} className="text-text-muted group-hover:text-error" />
                    </motion.button>
                </div>

                <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto pr-2 no-scrollbar scroll-smooth"
                >
                    <AnimatePresence initial={false}>
                        {messages.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="h-full flex flex-col items-center justify-center text-center p-8 opacity-40"
                            >
                                <MessageCircle size={48} className="mb-4 text-text-muted" />
                                <p className="text-sm italic">No messages yet. Start by saying "Hello Anjaan"</p>
                            </motion.div>
                        ) : (
                            messages.map((msg, index) => (
                                <ChatMessage
                                    key={msg.id}
                                    msg={msg}
                                    isLast={index === messages.length - 1}
                                />
                            ))
                        )}
                        {isTyping && <TypingIndicator />}
                    </AnimatePresence>
                </div>
            </div>

            {/* Bottom Section (30%): System Info Cards */}
            <div className="flex-[0.3] flex flex-col gap-4">
                <div className="flex items-center gap-2 px-2">
                    <Zap size={14} className="text-secondary" />
                    <h3 className="text-[11px] font-bold text-text-muted uppercase tracking-[0.2em]">
                        System Nexus
                    </h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <InfoCard
                        icon={Brain}
                        title="Memory"
                        value="1,248 items"
                        detail="Last sync: 2m ago"
                        color="primary"
                    />
                    <InfoCard
                        icon={Globe}
                        title="Language"
                        value="Hindi / English"
                        detail="Mode: Auto-detect"
                        color="secondary"
                    />
                    <motion.div className="col-span-2">
                        <InfoCard
                            icon={Zap}
                            title="Active Tasks"
                            value="3 Background Processes"
                            detail="Optimizing context windows..."
                            color="success"
                        />
                        {/* Progress Bar for Active Tasks */}
                        <div className="mt-[-12px] px-4 pb-4">
                            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    animate={{ x: ['-100%', '100%'] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                    className="h-full w-1/3 bg-gradient-to-r from-transparent via-success to-transparent"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.aside>
    )
}

export default RightPanel
