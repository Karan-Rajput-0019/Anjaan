import { motion } from 'framer-motion'

const RippleEffect = ({ count = 3, color = '#ec4899', duration = 2 }) => {
    const ripples = Array.from({ length: count }, (_, i) => ({
        id: i,
        delay: i * (duration / count),
    }))

    return (
        <div className="absolute inset-0 pointer-events-none">
            {ripples.map((ripple) => (
                <motion.div
                    key={ripple.id}
                    className="absolute top-1/2 left-1/2 rounded-full border-2"
                    style={{
                        borderColor: color,
                        width: 0,
                        height: 0,
                    }}
                    animate={{
                        width: ['0%', '200%'],
                        height: ['0%', '200%'],
                        marginLeft: ['0%', '-100%'],
                        marginTop: ['0%', '-100%'],
                        opacity: [0.8, 0],
                    }}
                    transition={{
                        duration,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: ripple.delay,
                    }}
                />
            ))}
        </div>
    )
}

export default RippleEffect
