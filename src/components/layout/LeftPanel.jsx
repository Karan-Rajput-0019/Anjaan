import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Cloud,
    Newspaper,
    Globe,
    BarChart3,
    Folder,
    Edit3,
    CheckSquare,
    Clock,
    Music,
    Gamepad2,
    Book,
    Lightbulb,
    Languages,
    Palette,
    Settings2
} from 'lucide-react'

const categories = [
    {
        title: 'Information',
        items: [
            { id: 'weather', icon: Cloud, label: 'Weather', badge: null },
            { id: 'news', icon: Newspaper, label: 'News', badge: 2 },
            { id: 'search', icon: Globe, label: 'Web Search', badge: null },
            { id: 'analytics', icon: BarChart3, label: 'Analytics', badge: null },
        ]
    },
    {
        title: 'Productivity',
        items: [
            { id: 'files', icon: Folder, label: 'Files', badge: null },
            { id: 'notes', icon: Edit3, label: 'Notes', badge: 5 },
            { id: 'tasks', icon: CheckSquare, label: 'Tasks', badge: null },
            { id: 'reminders', icon: Clock, label: 'Reminders', badge: 1 },
        ]
    },
    {
        title: 'Entertainment',
        items: [
            { id: 'music', icon: Music, label: 'Music', badge: null },
            { id: 'games', icon: Gamepad2, label: 'Games', badge: null },
            { id: 'stories', icon: Book, label: 'Stories', badge: null },
            { id: 'facts', icon: Lightbulb, label: 'Fun Facts', badge: null },
        ]
    },
    {
        title: 'Settings',
        items: [
            { id: 'language', icon: Languages, label: 'Language', badge: null },
            { id: 'theme', icon: Palette, label: 'Theme', badge: null },
            { id: 'preferences', icon: Settings2, label: 'Preferences', badge: null },
        ]
    }
]

const SectionHeader = ({ title }) => (
    <div className="flex items-center gap-2 mb-4 mt-6 first:mt-0">
        <div className="w-[3px] h-4 bg-gradient-to-b from-primary to-secondary rounded-full" />
        <h2 className="text-[12px] font-outfit font-semibold text-text-muted uppercase tracking-[1.5px]">
            {title}
        </h2>
    </div>
)

const QuickAccessButton = ({ item, isActive, onClick, delay }) => {
    const Icon = item.icon

    return (
        <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay, duration: 0.3 }}
            whileHover={{ x: 4, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`
                relative w-full h-[52px] px-4 flex items-center gap-4 rounded-[16px] transition-all duration-300
                ${isActive
                    ? 'bg-gradient-to-r from-primary/15 to-secondary/15 border-secondary shadow-purple-glow'
                    : 'glass-strong border-transparent hover:border-secondary/50 hover:bg-primary/10'
                }
                border text-text-primary group overflow-hidden
            `}
            title={item.label} // Basic tooltip fallback
            aria-label={item.label}
            role="menuitem"
        >
            {/* Hover Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />

            <div className={`p-2 rounded-xl transition-all duration-300 ${isActive ? 'scale-110 bg-primary/20' : 'bg-white/5 group-hover:bg-primary/20'}`}>
                <Icon size={20} className={`transition-colors duration-300 ${isActive ? 'text-secondary' : 'text-text-muted group-hover:text-primary'}`} />
            </div>

            <span className={`text-[15px] font-medium transition-colors duration-300 ${isActive ? 'text-text-primary' : 'text-text-secondary group-hover:text-text-primary'}`}>
                {item.label}
            </span>

            {/* Notification Badge */}
            <AnimatePresence>
                {item.badge && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute right-4 w-5 h-5 bg-gradient-to-tr from-secondary to-accent rounded-full flex items-center justify-center border border-white/20 shadow-lg"
                    >
                        <span className="text-[10px] font-bold text-white leading-none">
                            {item.badge}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    )
}

const LeftPanel = ({ activeId, onActiveChange }) => {
    return (
        <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-[280px] glass-strong rounded-softest p-6 overflow-y-auto no-scrollbar hidden lg:flex flex-col gap-2 transition-smooth hover:shadow-purple-glow-lg border-primary/20"
        >
            <div role="menu" className="flex flex-col">
                {categories.map((cat, catIdx) => (
                    <div key={cat.title} className="flex flex-col">
                        <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: catIdx * 0.15 + 0.2 }}
                        >
                            <SectionHeader title={cat.title} />
                        </motion.div>

                        <div className="flex flex-col gap-2">
                            {cat.items.map((item, itemIdx) => (
                                <QuickAccessButton
                                    key={item.id}
                                    item={item}
                                    isActive={activeId === item.id}
                                    onClick={() => onActiveChange(item.id)}
                                    delay={catIdx * 0.15 + itemIdx * 0.05 + 0.3}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* System Info Widget Footer (Optional extra) */}
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                className="mt-8 pt-6 border-t border-primary/10"
            >
                <div className="glass-strong rounded-soft p-4 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                    <span className="text-xs text-text-muted font-medium">Auto-sync active</span>
                </div>
            </motion.div>
        </motion.aside>
    )
}

export default LeftPanel
