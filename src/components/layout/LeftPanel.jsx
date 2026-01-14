import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    CloudSun,
    Globe,
    FolderOpen,
    ListTodo,
    Music,
    Search,
    Settings,
    FileText,
    Activity,
    Users
} from 'lucide-react'
import { useUI } from '../../contexts/UIContext'
import { useAnjaan } from '../../contexts/AnjaanContext'

const QuickAccessButton = ({ item, isActive, onClick, delay, isCollapsed }) => {
    const Icon = item.icon

    return (
        <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay, duration: 0.3 }}
            whileHover={{ x: isCollapsed ? 0 : 4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`
                relative w-full h-[52px] ${isCollapsed ? 'justify-center px-0' : 'px-4'} flex items-center gap-4 rounded-[16px] transition-all duration-300
                ${isActive
                    ? 'bg-gradient-to-r from-primary/15 to-secondary/15 border-secondary shadow-purple-glow'
                    : 'glass-strong border-transparent hover:border-secondary/50 hover:bg-primary/10'
                }
                border text-text-primary group overflow-hidden
            `}
            title={item.label}
            aria-label={item.label}
            role="menuitem"
        >
            <div className={`p-2 rounded-xl transition-all duration-300 ${isActive ? 'scale-110 bg-primary/20' : 'bg-white/5 group-hover:bg-primary/20'}`}>
                <Icon size={20} className={`transition-colors duration-300 ${isActive ? 'text-secondary' : 'text-text-muted group-hover:text-primary'}`} />
            </div>

            {!isCollapsed && (
                <span className={`text-[15px] font-medium transition-colors duration-300 ${isActive ? 'text-text-primary' : 'text-text-secondary group-hover:text-text-primary'}`}>
                    {item.label}
                </span>
            )}

            {/* Notification Badge */}
            <AnimatePresence>
                {item.badge && !isCollapsed && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute right-4 px-2 py-0.5 bg-gradient-to-tr from-secondary to-accent rounded-full flex items-center justify-center border border-white/20 shadow-lg"
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

const LeftPanel = () => {
    const { currentView, setCurrentView } = useAnjaan();
    const { isLeftPanelCollapsed: isCollapsed } = useUI();

    const categories = [
        {
            id: 'info',
            label: 'Information Central',
            items: [
                { id: 'weather', label: 'Weather Nexus', icon: CloudSun, badge: 'Live' },
                { id: 'news', label: 'Global News', icon: Globe },
                { id: 'search', label: 'Omni Search', icon: Search },
            ]
        },
        {
            id: 'workspace',
            label: 'Workspace',
            items: [
                { id: 'files', label: 'Files & Assets', icon: FolderOpen },
                { id: 'tasks', label: 'Agent Tasks', icon: ListTodo },
                { id: 'notes', label: 'Quick Notes', icon: FileText },
            ]
        },
        {
            id: 'media',
            label: 'Entertainment',
            items: [
                { id: 'music', label: 'Sonic Weaver', icon: Music },
            ]
        },
        {
            id: 'collaboration',
            label: 'Network',
            items: [
                { id: 'agents', label: 'Multi-Agent', icon: Users },
                { id: 'activity', label: 'Pulse Monitor', icon: Activity },
            ]
        }
    ]

    return (
        <div className={`flex flex-col gap-2 h-full ${isCollapsed ? 'items-center' : ''}`}>
            <div role="menu" className="flex flex-col w-full h-full overflow-y-auto no-scrollbar pb-10">
                {categories.map((cat, idx) => (
                    <div key={cat.id} className="flex flex-col mb-4">
                        {!isCollapsed && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] px-4 py-2 opacity-60"
                            >
                                {cat.label}
                            </motion.span>
                        )}
                        <div className={`flex flex-col gap-2 ${isCollapsed ? 'mt-4' : ''}`}>
                            {cat.items.map((item, itemIdx) => (
                                <QuickAccessButton
                                    key={item.id}
                                    item={item}
                                    isActive={currentView === item.id}
                                    onClick={() => setCurrentView(item.id)}
                                    delay={idx * 0.1 + itemIdx * 0.05}
                                    isCollapsed={isCollapsed}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* System Info Widget Footer */}
            {!isCollapsed && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-auto pt-6 border-t border-primary/10"
                >
                    <div className="glass-strong rounded-soft p-4 flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-success animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                        <span className="text-xs text-text-muted font-medium">Core Systems Online</span>
                    </div>
                </motion.div>
            )}
        </div>
    )
}

export default LeftPanel
