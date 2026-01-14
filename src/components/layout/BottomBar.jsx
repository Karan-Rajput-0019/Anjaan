import { motion } from 'framer-motion'
import { Mic, Activity, CheckCircle } from 'lucide-react'

const BottomBar = ({ isListening = false }) => {
    return (
        <motion.footer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="h-[70px] glass border-t border-primary/20 flex items-center justify-between px-8 relative z-50"
        >
            {/* Left Section - Voice Button */}
            <div className="flex items-center gap-3">
                <motion.div
                    animate={{
                        scale: isListening ? [1, 1.1, 1] : 1,
                    }}
                    transition={{
                        duration: 1,
                        repeat: isListening ? Infinity : 0,
                    }}
                    className={`p-3 rounded-full ${isListening
                            ? 'bg-gradient-to-r from-primary to-secondary shadow-glow'
                            : 'glass'
                        }`}
                >
                    <Mic className={`w-5 h-5 ${isListening ? 'text-white' : 'text-text-muted'}`} />
                </motion.div>
                <div>
                    <p className="text-xs font-semibold text-text-secondary">Voice Status</p>
                    <p className="text-xs text-text-muted">
                        {isListening ? 'Listening...' : 'Ready'}
                    </p>
                </div>
            </div>

            {/* Center Section - Status */}
            <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" />
                <span className="text-sm text-text-secondary font-medium">
                    All Systems Operational
                </span>
            </div>

            {/* Right Section - Task Info */}
            <div className="flex items-center gap-3">
                <div className="text-right">
                    <p className="text-xs font-semibold text-text-secondary">Tasks Completed</p>
                    <p className="text-xs text-text-muted">12 of 15</p>
                </div>
                <motion.div
                    animate={{
                        rotate: [0, 360],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="p-2 rounded-full glass"
                >
                    <CheckCircle className="w-5 h-5 text-success" />
                </motion.div>
            </div>
        </motion.footer>
    )
}

export default BottomBar
