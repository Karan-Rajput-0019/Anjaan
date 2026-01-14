import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mic, MicOff, Volume2, VolumeX, Settings, Sparkles } from 'lucide-react'
import MainLayout from './components/layout/MainLayout'

function App() {
    const [isListening, setIsListening] = useState(false)
    const [isMuted, setIsMuted] = useState(false)

    return (
        <MainLayout isListening={isListening}>
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-20 left-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

            {/* Main Voice Interface */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative z-10"
            >
                {/* Outer Glow Ring */}
                <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{
                        boxShadow: isListening
                            ? [
                                '0 0 40px rgba(236, 72, 153, 0.4)',
                                '0 0 80px rgba(236, 72, 153, 0.6)',
                                '0 0 40px rgba(236, 72, 153, 0.4)',
                            ]
                            : '0 0 20px rgba(192, 132, 252, 0.3)',
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Main Button */}
                <motion.button
                    onClick={() => setIsListening(!isListening)}
                    className="relative w-64 h-64 rounded-full glass-strong flex items-center justify-center cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        animate={{
                            rotate: isListening ? 360 : 0,
                        }}
                        transition={{
                            duration: 2,
                            repeat: isListening ? Infinity : 0,
                            ease: "linear"
                        }}
                        className="absolute inset-4 rounded-full bg-gradient-to-br from-primary via-accent-glow to-secondary opacity-20"
                    />

                    <motion.div
                        animate={{
                            scale: isListening ? [1, 1.1, 1] : 1,
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: isListening ? Infinity : 0,
                            ease: "easeInOut"
                        }}
                    >
                        {isListening ? (
                            <Mic className="w-24 h-24 text-secondary drop-shadow-glow" />
                        ) : (
                            <MicOff className="w-24 h-24 text-text-muted" />
                        )}
                    </motion.div>
                </motion.button>
            </motion.div>

            {/* Status Text */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-center z-10"
            >
                <p className="text-2xl font-outfit font-medium">
                    {isListening ? (
                        <span className="gradient-text">Listening...</span>
                    ) : (
                        <span className="text-text-secondary">Tap to speak</span>
                    )}
                </p>
            </motion.div>

            {/* Control Buttons */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex gap-4 z-10"
            >
                <motion.button
                    onClick={() => setIsMuted(!isMuted)}
                    className="glass rounded-softer p-4 transition-smooth hover:shadow-purple-glow"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {isMuted ? (
                        <VolumeX className="w-6 h-6 text-text-muted" />
                    ) : (
                        <Volume2 className="w-6 h-6 text-primary" />
                    )}
                </motion.button>

                <motion.button
                    className="glass rounded-softer p-4 transition-smooth hover:shadow-purple-glow"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Settings className="w-6 h-6 text-primary" />
                </motion.button>
            </motion.div>
        </MainLayout>
    )
}

export default App
