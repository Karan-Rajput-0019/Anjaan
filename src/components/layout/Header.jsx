import { motion } from 'framer-motion'
import { Globe, Settings, User } from 'lucide-react'

const Header = () => {
    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="h-20 glass border-b border-primary/20 flex items-center justify-between px-8 relative z-50"
        >
            {/* Left Side - Logo & Title */}
            <div className="flex items-center gap-4">
                <motion.div
                    animate={{
                        y: [0, -8, 0],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="text-3xl"
                >
                    ✨
                </motion.div>

                <div className="flex flex-col">
                    <h1 className="text-2xl font-outfit font-bold gradient-text">
                        ANJAAN
                    </h1>
                    <p className="text-xs text-text-muted font-light">
                        Your Personal AI Assistant
                    </p>
                </div>
            </div>

            {/* Right Side - Navigation Buttons */}
            <div className="flex items-center gap-3">
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
            </div>
        </motion.header>
    )
}

export default Header
