import { motion, AnimatePresence } from 'framer-motion'
import { Mic, Brain, Volume2 } from 'lucide-react'
import ParticleSystem from './ParticleSystem'
import RippleEffect from './RippleEffect'
import { useUI } from '../../contexts/UIContext'

const AICore = ({
    state = 'idle', // 'idle' | 'listening' | 'thinking' | 'speaking'
    onClick,
    size: providedSize
}) => {
    const { breakpoint } = useUI();

    // Dynamic size mapping
    const sizes = {
        xs: 200,
        sm: 250,
        md: 250,
        lg: 300,
        xl: 350
    };
    const size = providedSize || sizes[breakpoint] || 300;
    // State-specific configurations
    const stateConfig = {
        idle: {
            pulseScale: [1, 1.05, 1],
            pulseDuration: 1.5,
            glowColor: 'rgba(192, 132, 252, 0.4)',
            gradient: 'radial-gradient(circle, #c084fc 0%, #ec4899 70%, #f0abfc 100%)',
            text: 'Tap to speak',
            icon: null,
            ariaLabel: 'AI Core in idle state, tap to activate voice input',
        },
        listening: {
            pulseScale: [1, 1.08, 1],
            pulseDuration: 0.8,
            glowColor: 'rgba(236, 72, 153, 0.6)',
            gradient: 'radial-gradient(circle, #ec4899 0%, #f472b6 60%, #fda4af 100%)',
            text: 'Listening...',
            icon: Mic,
            ariaLabel: 'AI Core is listening to your voice',
        },
        thinking: {
            pulseScale: [1, 1.03, 1],
            pulseDuration: 2,
            glowColor: 'rgba(192, 132, 252, 0.5)',
            gradient: 'radial-gradient(circle, #a855f7 0%, #c084fc 60%, #e879f9 100%)',
            text: 'Thinking',
            icon: Brain,
            ariaLabel: 'AI Core is processing your request',
        },
        speaking: {
            pulseScale: [1, 1.15, 1],
            pulseDuration: 1,
            glowColor: 'rgba(236, 72, 153, 0.7)',
            gradient: 'radial-gradient(circle, #f472b6 0%, #ec4899 50%, #fda4af 100%)',
            text: 'Speaking...',
            icon: Volume2,
            ariaLabel: 'AI Core is speaking',
        },
    }

    const config = stateConfig[state]
    const isInteractive = true // Always allow cycling for now as requested

    return (
        <div className="relative flex flex-col items-center gap-8 z-20">
            {/* Main AI Core Container */}
            <motion.div
                className="relative cursor-pointer select-none"
                style={{ width: size, height: size }}
                onClick={() => {
                    console.log('AICore clicked, current state:', state);
                    if (onClick) {
                        onClick();
                    }
                }}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                aria-label={config.ariaLabel}
                role="button"
                tabIndex={0}
            >
                {/* Background Glow Layer */}
                <motion.div
                    className="absolute inset-0 rounded-full blur-3xl"
                    style={{
                        background: config.gradient,
                        opacity: 0.3,
                    }}
                    animate={{
                        scale: config.pulseScale,
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: config.pulseDuration,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* Rotating Glow Ring */}
                <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                        background: `conic-gradient(from 0deg, ${config.glowColor}, transparent, ${config.glowColor})`,
                        opacity: 0.6,
                    }}
                    animate={{
                        rotate: state === 'thinking' ? [0, -360] : [0, 360],
                    }}
                    transition={{
                        duration: state === 'listening' ? 5 : 10,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />

                {/* Ripple Effects for LISTENING and SPEAKING */}
                <AnimatePresence>
                    {(state === 'listening' || state === 'speaking') && (
                        <RippleEffect
                            count={state === 'listening' ? 4 : 3}
                            color={state === 'listening' ? '#ec4899' : '#f472b6'}
                            duration={state === 'listening' ? 1.5 : 1.2}
                        />
                    )}
                </AnimatePresence>

                {/* Outer Ring (Counter-clockwise for THINKING) */}
                {state === 'thinking' && (
                    <motion.div
                        className="absolute inset-4 rounded-full border-2 border-primary/30"
                        animate={{
                            rotate: [0, -360],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                )}

                {/* Main Core Circle */}
                <motion.div
                    className="absolute inset-8 rounded-full shadow-2xl"
                    style={{
                        background: config.gradient,
                        boxShadow: `0 0 60px ${config.glowColor}, inset 0 0 40px rgba(255, 255, 255, 0.1)`,
                    }}
                    animate={{
                        scale: state === 'speaking' ? [1, 1.12, 1] : config.pulseScale,
                    }}
                    transition={{
                        duration: config.pulseDuration,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    {/* Inner Rotating Ring (Clockwise for THINKING) */}
                    {state === 'thinking' && (
                        <motion.div
                            className="absolute inset-8 rounded-full border-2 border-accent/40"
                            animate={{
                                rotate: [0, 360],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        />
                    )}

                    {/* Center Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            {config.icon && (
                                <motion.div
                                    key={state}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <config.icon className="w-20 h-20 text-white drop-shadow-lg" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Particle System for THINKING State */}
                <AnimatePresence>
                    {state === 'thinking' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <ParticleSystem count={10} radius={size / 2} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Status Text */}
            <motion.div
                className="text-center"
                role="status"
                aria-live="polite"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <p className="text-2xl font-outfit font-medium flex items-center gap-2">
                    <span className={state === 'idle' ? 'text-text-secondary' : 'gradient-text'}>
                        {config.text}
                    </span>
                    {state === 'thinking' && (
                        <motion.span
                            className="gradient-text"
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            ...
                        </motion.span>
                    )}
                </p>
            </motion.div>
        </div>
    )
}

export default AICore
