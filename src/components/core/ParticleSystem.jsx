import { motion } from 'framer-motion'

const ParticleSystem = ({ count = 10, radius = 150 }) => {
    const particles = Array.from({ length: count }, (_, i) => ({
        id: i,
        delay: i * 0.15,
        size: 4 + Math.random() * 8,
        color: i % 2 === 0 ? '#c084fc' : '#ec4899',
    }))

    return (
        <div className="absolute inset-0 pointer-events-none">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute top-1/2 left-1/2"
                    style={{
                        width: particle.size,
                        height: particle.size,
                        marginLeft: -particle.size / 2,
                        marginTop: -particle.size / 2,
                    }}
                    animate={{
                        rotate: [0, 360],
                    }}
                    transition={{
                        duration: 4 + particle.delay,
                        repeat: Infinity,
                        ease: "linear",
                        delay: particle.delay,
                    }}
                >
                    <motion.div
                        className="rounded-full"
                        style={{
                            width: particle.size,
                            height: particle.size,
                            background: `radial-gradient(circle, ${particle.color}, transparent)`,
                            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
                            transform: `translateX(${radius}px)`,
                        }}
                        animate={{
                            opacity: [0.3, 1, 0.3],
                            scale: [0.8, 1.2, 0.8],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: particle.delay,
                        }}
                    />
                </motion.div>
            ))}
        </div>
    )
}

export default ParticleSystem
