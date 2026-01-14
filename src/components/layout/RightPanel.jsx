import { motion } from 'framer-motion'
import { MessageCircle, Clock, Trash2 } from 'lucide-react'

const RightPanel = () => {
    const chatHistory = [
        { id: 1, message: 'How can I help you today?', time: '10:30 AM', isAI: true },
        { id: 2, message: 'Tell me about the weather', time: '10:31 AM', isAI: false },
        { id: 3, message: 'The weather today is sunny...', time: '10:31 AM', isAI: true },
    ]

    return (
        <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-[380px] glass rounded-softest p-6 overflow-hidden transition-smooth hover:shadow-purple-glow hidden xl:flex flex-col gap-6"
        >
            {/* Chat History Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-primary" />
                    <h2 className="text-sm font-outfit font-semibold text-text-secondary uppercase tracking-wide">
                        Chat History
                    </h2>
                </div>
                <motion.button
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-soft hover:bg-error/20 transition-smooth group"
                    aria-label="Clear History"
                >
                    <Trash2 className="w-4 h-4 text-text-muted group-hover:text-error transition-smooth" />
                </motion.button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                {chatHistory.map((chat, index) => (
                    <motion.div
                        key={chat.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className={`p-3 rounded-softer ${chat.isAI
                                ? 'glass-strong border-l-2 border-primary'
                                : 'bg-secondary/10 border-l-2 border-secondary'
                            }`}
                    >
                        <div className="flex items-start justify-between mb-1">
                            <span className="text-xs font-semibold text-text-secondary">
                                {chat.isAI ? 'ANJAAN' : 'You'}
                            </span>
                            <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-text-muted" />
                                <span className="text-xs text-text-muted">{chat.time}</span>
                            </div>
                        </div>
                        <p className="text-xs text-text-primary leading-relaxed">
                            {chat.message}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* System Info */}
            <div className="glass-strong rounded-softer p-4 space-y-2">
                <h3 className="text-xs font-semibold text-text-secondary mb-3 uppercase tracking-wide">
                    System Info
                </h3>
                <div className="flex justify-between text-xs">
                    <span className="text-text-muted">Response Time</span>
                    <span className="text-success font-semibold">Fast</span>
                </div>
                <div className="flex justify-between text-xs">
                    <span className="text-text-muted">Model</span>
                    <span className="text-primary font-semibold">GPT-4</span>
                </div>
                <div className="flex justify-between text-xs">
                    <span className="text-text-muted">Status</span>
                    <span className="text-success font-semibold flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
                        Online
                    </span>
                </div>
            </div>
        </motion.aside>
    )
}

export default RightPanel
