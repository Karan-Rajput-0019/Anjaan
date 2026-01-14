import { useRef, useEffect, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUI } from '../../contexts/UIContext'

/**
 * VoiceWaveform Component
 * 
 * An elegant, canvas-based visualization that reacts to audio input/output.
 * Features smooth, curved paths and glass morphism styling.
 */
const VoiceWaveform = ({ state = 'idle', size: providedSize }) => {
    const { breakpoint, isSmall } = useUI();

    // Responsive size mapping
    const sizes = {
        xs: { width: window.innerWidth - 48, height: 60 },
        sm: { width: 400, height: 80 },
        md: { width: 450, height: 80 },
        lg: { width: 500, height: 100 },
        xl: { width: 600, height: 120 }
    };

    const size = providedSize || sizes[breakpoint] || sizes.lg;
    const canvasRef = useRef(null)
    const audioContextRef = useRef(null)
    const analyserRef = useRef(null)
    const dataArrayRef = useRef(null)
    const sourceRef = useRef(null)
    const animationFrameRef = useRef(null)
    const [hasPermission, setHasPermission] = useState(null)

    // Configuration for different states
    const configs = {
        idle: {
            amplitude: 0.1,
            frequency: 0.02,
            speed: 0.05,
            waves: 3,
            color: ['#c084fc', '#ec4899'],
        },
        listening: {
            amplitude: 0.8,
            frequency: 0.05,
            speed: 0.15,
            waves: 5,
            color: ['#ec4899', '#f472b6'],
        },
        thinking: {
            amplitude: 0.05,
            frequency: 0.01,
            speed: 0.02,
            waves: 2,
            color: ['#c084fc', '#a855f7'],
        },
        speaking: {
            amplitude: 0.6,
            frequency: 0.08,
            speed: 0.2,
            waves: 4,
            color: ['#f472b6', '#ec4899'],
        }
    }

    const currentConfig = configs[state] || configs.idle

    // Initialize Web Audio API for LISTENING state
    useEffect(() => {
        if (state === 'listening' && !audioContextRef.current) {
            initAudio()
        }

        return () => {
            if (state !== 'listening' && audioContextRef.current) {
                // We keep it alive for a bit but could suspend if needed
            }
        }
    }, [state])

    const initAudio = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            setHasPermission(true)

            const AudioContext = window.AudioContext || window.webkitAudioContext
            const audioCtx = new AudioContext()
            const analyser = audioCtx.createAnalyser()

            analyser.fftSize = 256
            const source = audioCtx.createMediaStreamSource(stream)
            source.connect(analyser)

            audioContextRef.current = audioCtx
            analyserRef.current = analyser
            dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount)
            sourceRef.current = source
        } catch (err) {
            console.error('Error accessing microphone:', err)
            setHasPermission(false)
        }
    }

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }
            if (audioContextRef.current) {
                audioContextRef.current.close()
            }
        }
    }, [])

    // Rendering loop
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        let offset = 0

        const draw = () => {
            const { width, height } = canvas
            ctx.clearRect(0, 0, width, height)

            let audioData = []
            if (state === 'listening' && analyserRef.current && dataArrayRef.current) {
                analyserRef.current.getByteFrequencyData(dataArrayRef.current)
                audioData = Array.from(dataArrayRef.current).map(v => v / 255)
            }

            // Draw multiple overlapping waves
            for (let i = 0; i < currentConfig.waves; i++) {
                drawWave(ctx, i, offset, audioData)
            }

            offset += currentConfig.speed
            animationFrameRef.current = requestAnimationFrame(draw)
        }

        const drawWave = (ctx, index, offset, audioData) => {
            const { width, height } = canvas
            const midY = height / 2

            ctx.beginPath()
            ctx.moveTo(0, midY)

            const wavePoints = 40
            const step = width / wavePoints

            for (let x = 0; x <= wavePoints; x++) {
                const xPos = x * step

                // Base sine wave movement
                let waveY = Math.sin(x * currentConfig.frequency + offset + index)

                // State-specific modifiers
                let amplitude = currentConfig.amplitude * (height / 3)

                if (state === 'listening' && audioData.length > 0) {
                    // Map frequency data to wave sections
                    const dataIndex = Math.floor((x / wavePoints) * (audioData.length / 2))
                    const intensity = audioData[dataIndex] || 0
                    amplitude *= (0.5 + intensity * 1.5)
                }

                if (state === 'speaking') {
                    // Simulated rhythmic pulse for speaking
                    amplitude *= (0.8 + Math.sin(offset * 2) * 0.2)
                }

                // Envelope to taper edges
                const envelope = Math.sin((x / wavePoints) * Math.PI)
                const yPos = midY + waveY * amplitude * envelope

                if (x === 0) {
                    ctx.moveTo(xPos, yPos)
                } else {
                    // Quadratic curve for smoothness
                    const prevX = (x - 1) * step
                    const xc = (prevX + xPos) / 2
                    // This is a simplified smoothing, better is a real spline
                    ctx.lineTo(xPos, yPos)
                }
            }

            // Styling the wave
            const gradient = ctx.createLinearGradient(0, 0, width, 0)
            gradient.addColorStop(0, currentConfig.color[0])
            gradient.addColorStop(1, currentConfig.color[1])

            ctx.strokeStyle = gradient
            ctx.lineWidth = 2 - (index * 0.3)
            ctx.globalAlpha = 0.6 - (index * 0.1)
            ctx.lineCap = 'round'
            ctx.lineJoin = 'round'

            // Add soft glow
            ctx.shadowBlur = 10
            ctx.shadowColor = currentConfig.color[0]

            ctx.stroke()
        }

        animationFrameRef.current = requestAnimationFrame(draw)

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }
        }
    }, [state, currentConfig])

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative flex flex-col items-center gap-2"
        >
            {/* Waveform Container */}
            <div
                className="glass rounded-softest p-4 overflow-hidden relative"
                style={{ width: size.width, height: size.height }}
            >
                <canvas
                    ref={canvasRef}
                    width={size.width - 32} // Account for padding
                    height={size.height - 32}
                    className="w-full h-full"
                />

                {/* Subtle edge blur for softness */}
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]" />
            </div>

            {/* Accessibility / Feedback Text */}
            <AnimatePresence>
                {state === 'listening' && hasPermission === false && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xs text-red-400 font-medium"
                    >
                        Microphone access denied. Using simulated view.
                    </motion.p>
                )}
            </AnimatePresence>

            <span className="sr-only">
                {state === 'listening' ? 'Audio waveform reflecting your voice' :
                    state === 'speaking' ? 'Audio waveform reflecting AI response' :
                        'Ambient audio visualization'}
            </span>
        </motion.div>
    )
}

export default VoiceWaveform
