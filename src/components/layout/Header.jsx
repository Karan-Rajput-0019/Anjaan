import { motion } from 'framer-motion'
import { Globe, Settings, User, Menu, MessageSquare } from 'lucide-react'
import { useUI } from '../../contexts/UIContext'

const Header = ({ onMenuClick, onChatClick }) => {
    const { isSmall } = useUI();

    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="h-16 sm:h-20 glass border-b border-primary/20 flex items-center justify-between px-4 sm:px-8 relative z-50 backdrop-blur-xl"
        >
            {/* Left Side - Hamburger (Mobile) or Logo */}
            <div className="flex items-center gap-3 sm:gap-4">
                {isSmall && (
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={onMenuClick}
                        className="p-2 glass rounded-xl hover:bg-white/10"
                        aria-label="Open Menu"
                    >
                        <Menu size={20} className="text-primary" />
                    </motion.button>
                )}

                <div className="flex items-center gap-3">
                    <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="text-xl sm:text-2xl"
                    >
                        ✨
                    </motion.div>

                    <div className="flex flex-col">
                        <h1 className="text-lg sm:text-2xl font-outfit font-bold gradient-text leading-none">
                            ANJAAN
                        </h1>
                        {!isSmall && (
                            <p className="text-[10px] sm:text-xs text-text-muted font-light mt-1">
                                Your Personal AI Assistant
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Right Side - Navigation Buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
                {!isSmall ? (
                    <>
                        <motion.button
                            whileHover={{ y: -2, scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="glass rounded-softer p-3 transition-smooth hover:shadow-purple-glow group"
                            aria-label="Change Language"
                        >
                            <Globe className="w-5 h-5 text-text-secondary group-hover:text-primary transition-smooth" />
                        </motion.button>

                        <motion.button
                            whileHover={{ y: -2, scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="glass rounded-softer p-3 transition-smooth hover:shadow-purple-glow group"
                            aria-label="Settings"
                        >
                            <Settings className="w-5 h-5 text-text-secondary group-hover:text-primary transition-smooth" />
                        </motion.button>

                        <motion.button
                            whileHover={{ y: -2, scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="glass rounded-softer p-3 transition-smooth hover:shadow-purple-glow group"
                            aria-label="Profile"
                        >
                            <User className="w-5 h-5 text-text-secondary group-hover:text-primary transition-smooth" />
                        </motion.button>
                    </>
                ) : (
                    <div className="flex items-center gap-2">
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            className="p-2 glass rounded-xl hover:bg-white/10"
                            aria-label="Settings"
                        >
                            <Settings size={20} className="text-text-muted" />
                        </motion.button>
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={onChatClick}
                            className="p-2 glass rounded-xl hover:bg-white/10"
                            aria-label="Open Chat"
                        >
                            <MessageSquare size={20} className="text-secondary" />
                        </motion.button>
                    </div>
                )}
            </div>
        </motion.header>
    )
}

export default Header
