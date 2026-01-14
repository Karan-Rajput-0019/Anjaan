import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe, Check } from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';
import { ActionButton } from '../core/SettingsControls';

const LanguageModal = () => {
    const { settings, updateSettings, setIsLanguageModalOpen } = useSettings();
    const isAuto = settings.voice.languageMode === 'Auto';

    const languages = [
        { id: 'Hindi', name: 'Hindi', native: 'हिंदी', flag: '🇮🇳' },
        { id: 'English', name: 'English', native: 'English', flag: '🇬🇧' },
        { id: 'Marathi', name: 'Marathi', native: 'मराठी', flag: '🇮🇳' },
    ];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsLanguageModalOpen(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-[450px] glass-strong rounded-softest p-8 shadow-glow-lg border border-primary/20 overflow-hidden"
            >
                {/* Decorative background glow */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />

                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-primary/20">
                            <Globe className="w-5 h-5 text-primary" />
                        </div>
                        <h2 className="text-2xl font-outfit font-bold text-text-primary">Select Language</h2>
                    </div>
                    <button
                        onClick={() => setIsLanguageModalOpen(false)}
                        className="p-2 rounded-full hover:bg-white/10 transition-colors"
                    >
                        <X className="w-5 h-5 text-text-muted" />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 p-1 glass rounded-2xl mb-8 relative">
                    <motion.div
                        className="absolute inset-y-1 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-xl"
                        initial={false}
                        animate={{
                            left: isAuto ? '4px' : '50%',
                            right: isAuto ? '50%' : '4px'
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                    <button
                        onClick={() => updateSettings('voice', 'languageMode', 'Auto')}
                        className={`flex-1 py-3 text-sm font-bold z-10 transition-colors ${isAuto ? 'text-primary' : 'text-text-muted'}`}
                    >
                        Auto-Detect
                    </button>
                    <button
                        onClick={() => updateSettings('voice', 'languageMode', 'Manual')}
                        className={`flex-1 py-3 text-sm font-bold z-10 transition-colors ${!isAuto ? 'text-primary' : 'text-text-muted'}`}
                    >
                        Manual
                    </button>
                </div>

                {/* Content */}
                <AnimatePresence mode="wait">
                    {!isAuto ? (
                        <motion.div
                            key="manual"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="grid grid-cols-1 gap-4"
                        >
                            {languages.map((lang, idx) => (
                                <motion.button
                                    key={lang.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    onClick={() => updateSettings('voice', 'manualLanguage', lang.id)}
                                    className={`relative flex items-center justify-between p-5 rounded-softest border-2 transition-all duration-300 group ${settings.voice.manualLanguage === lang.id
                                            ? 'border-primary bg-primary/10 shadow-purple-glow-sm'
                                            : 'border-white/5 glass hover:border-white/20'
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="text-3xl grayscale-[0.2] group-hover:grayscale-0 transition-all">{lang.flag}</span>
                                        <div className="flex flex-col items-start text-left">
                                            <span className="text-sm font-bold text-text-primary">{lang.name}</span>
                                            <span className="text-xs text-text-muted">{lang.native}</span>
                                        </div>
                                    </div>
                                    {settings.voice.manualLanguage === lang.id && (
                                        <div className="p-1 rounded-full bg-primary/20">
                                            <Check className="w-4 h-4 text-primary" />
                                        </div>
                                    )}
                                </motion.button>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="auto"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="flex flex-col gap-6 py-4"
                        >
                            <div className="flex flex-col items-center text-center gap-4">
                                <div className="w-20 h-20 rounded-full glass flex items-center justify-center relative">
                                    <Globe className="w-10 h-10 text-primary animate-pulse" />
                                    <div className="absolute inset-0 rounded-full border border-primary/30 animate-ping" />
                                </div>
                                <p className="text-sm text-text-muted leading-relaxed max-w-[300px]">
                                    Anjaan will automatically detect the language you speak and respond accordingly.
                                </p>
                            </div>

                            <div className="space-y-3">
                                {[
                                    'Real-time language switching',
                                    'Better conversational flow',
                                    'Support for mixed languages (Hinglish)'
                                ].map((benefit, i) => (
                                    <div key={i} className="flex items-center gap-3 glass p-4 rounded-softer border border-white/5">
                                        <div className="p-1 rounded-full bg-success/20">
                                            <Check className="w-3 h-3 text-success" />
                                        </div>
                                        <span className="text-xs font-medium">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Footer */}
                <div className="flex gap-4 mt-8">
                    <ActionButton
                        variant="secondary"
                        className="flex-1"
                        onClick={() => setIsLanguageModalOpen(false)}
                    >
                        Cancel
                    </ActionButton>
                    <ActionButton
                        variant="primary"
                        className="flex-1"
                        onClick={() => setIsLanguageModalOpen(false)}
                    >
                        Apply Changes
                    </ActionButton>
                </div>
            </motion.div>
        </div>
    );
};

export default LanguageModal;
