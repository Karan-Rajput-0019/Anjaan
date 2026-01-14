import { motion } from 'framer-motion'
import { Sparkles, Zap, Heart, Star } from 'lucide-react'

const LeftPanel = () => {
    const quickAccessItems = [
        { icon: Sparkles, label: 'Quick Commands', color: 'text-primary' },
        { icon: Zap, label: 'Shortcuts', color: 'text-accent-glow' },
        { icon: Heart, label: 'Favorites', color: 'text-secondary' },
        { icon: Star, label: 'Recent', color: 'text-accent' },
    ]

    return (
        <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-[280px] glass rounded-softest p-6 overflow-y-auto transition-smooth hover:shadow-purple-glow hidden lg:flex flex-col gap-6"
        >
            {/* Quick Access Section */}
            <div>
                <h2 className="text-sm font-outfit font-semibold text-text-secondary mb-4 uppercase tracking-wide">
                    Quick Access
                </h2>
                <div className="flex flex-col gap-2">
                    {quickAccessItems.map((item, index) => (
                        <motion.button
                            key={item.label}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                            whileHover={{ x: 4, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center gap-3 p-3 rounded-soft glass-strong hover:bg-primary/10 transition-smooth group"
                        >
                            <item.icon className={`w-5 h-5 ${item.color} group-hover:scale-110 transition-smooth`} />
                            <span className="text-sm text-text-primary font-medium">{item.label}</span>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Widgets Section */}
            <div className="flex-1">
                <h2 className="text-sm font-outfit font-semibold text-text-secondary mb-4 uppercase tracking-wide">
                    Widgets
                </h2>

                {/* Widget Placeholder 1 */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="glass-strong rounded-softer p-4 mb-4"
                >
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xs font-semibold text-text-secondary">System Status</h3>
                        <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
                    </div>
                    <p className="text-xs text-text-muted">All systems operational</p>
                </motion.div>

                {/* Widget Placeholder 2 */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="glass-strong rounded-softer p-4"
                >
                    <h3 className="text-xs font-semibold text-text-secondary mb-3">Quick Stats</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                            <span className="text-text-muted">Tasks Today</span>
                            <span className="text-primary font-semibold">12</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-text-muted">Conversations</span>
                            <span className="text-secondary font-semibold">8</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.aside>
    )
}

export default LeftPanel
