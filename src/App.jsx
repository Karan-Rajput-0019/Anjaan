import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, VolumeX, Settings as SettingsIcon } from 'lucide-react'
import MainLayout from './components/layout/MainLayout'
import AICore from './components/core/AICore'
import VoiceWaveform from './components/core/VoiceWaveform'
import { AppProviders } from './contexts/AppProviders'
import { useSettings } from './contexts/SettingsContext'
import { useAnjaan } from './contexts/AnjaanContext'
import { useVoice } from './contexts/VoiceContext'
import LanguageModal from './components/widgets/LanguageModal'
import useKeyboardShortcuts from './hooks/useKeyboardShortcuts'
import ShortcutHelp from './components/widgets/ShortcutHelp'

function AppContent() {
    const { settings } = useSettings()
    const { currentView, setCurrentView } = useAnjaan()
    const { voiceStatus, setVoiceStatus, startListening, stopListening } = useVoice()

    const [isHelpOpen, setIsHelpOpen] = useState(false)
    const [isMuted, setIsMuted] = useState(false)

    // Keyboard Shortcuts Actions
    useKeyboardShortcuts({
        onVoiceTrigger: () => voiceStatus === 'listening' ? stopListening() : startListening(),
        onCancel: () => stopListening(),
        onSettingsTrigger: () => setCurrentView('settings'),
        onSearchTrigger: () => setCurrentView('search'),
        onContextSwitch: (context) => setCurrentView(context),
        onHelpTrigger: () => setIsHelpOpen(true),
        onClearChat: () => {
            // Chat cleaning logic is now in ChatContext, we'll link it later in components
        }
    });

    return (
        <MainLayout
            isListening={voiceStatus === 'listening'}
            activeWidget={currentView}
            onWidgetChange={setCurrentView}
        >
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

            {/* AI Core & Visualization Area */}
            <div className="flex flex-col items-center gap-12 z-10">
                <AICore
                    state={voiceStatus}
                    onClick={() => voiceStatus === 'listening' ? stopListening() : startListening()}
                />

                <VoiceWaveform
                    state={voiceStatus}
                />
            </div>

            {/* Manual Control Overlays (Optional duplicate of BottomBar for desktop focus) */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="hidden lg:flex gap-4 z-10 mb-8"
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
                    onClick={() => setCurrentView('settings')}
                    className="glass rounded-softer p-4 transition-smooth hover:shadow-purple-glow"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <SettingsIcon className="w-6 h-6 text-primary" />
                </motion.button>
            </motion.div>

            {/* Global Modals */}
            <LanguageModal />
            <ShortcutHelp isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
        </MainLayout>
    )
}

function App() {
    return (
        <AppProviders>
            <AppContent />
        </AppProviders>
    )
}

export default App
