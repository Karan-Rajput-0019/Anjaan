import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Volume2, VolumeX, Settings } from 'lucide-react'
import MainLayout from './components/layout/MainLayout'
import AICore from './components/core/AICore'

function App() {
    const [coreState, setCoreState] = useState('idle') // 'idle' | 'listening' | 'thinking' | 'speaking'
    const [isMuted, setIsMuted] = useState(false)

    // Simplified state transition logic: Manual cycle through states on click
    const handleCoreClick = () => {
        console.log('handleCoreClick called, current coreState:', coreState);
        const states = ['idle', 'listening', 'thinking', 'speaking'];
        const currentIndex = states.indexOf(coreState);
        const nextIndex = (currentIndex + 1) % states.length;
        const nextState = states[nextIndex];

        console.log(`Transitioning from ${coreState} to ${nextState}`);
        setCoreState(nextState);
    }

    return (
        <MainLayout isListening={coreState === 'listening'}>
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

            {/* AI Core Component */}
            <AICore
                state={coreState}
                onClick={handleCoreClick}
                size={300}
            />

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
                    aria-label={isMuted ? "Unmute" : "Mute"}
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
                    aria-label="Settings"
                >
                    <Settings className="w-6 h-6 text-primary" />
                </motion.button>
            </motion.div>
        </MainLayout>
    )
}

export default App
