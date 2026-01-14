import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    X, Mic, MicOff, Volume2, Palette, Zap,
    MessageSquare, Bell, Shield, Info, Trash2,
    Download, ExternalLink, MessageCircle, Bug, Heart,
    Moon, Sun, Sliders, Maximize
} from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';
import {
    ToggleSwitch, Slider, Dropdown,
    CollapsibleSection, ActionButton
} from '../core/SettingsControls';

const SettingsPanel = () => {
    const { settings, updateSettings, updateNotificationType, resetSettings } = useSettings();
    const scrollRef = useRef(null);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-[600px] h-[650px] glass-strong rounded-softest p-8 flex flex-col shadow-purple-glow-lg border-primary/20"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-6 shrink-0">
                <h2 className="text-3xl font-outfit font-bold gradient-text">Settings</h2>
                <button
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                    onClick={() => {/* Handled by parent change */ }}
                >
                    <X className="w-6 h-6 text-text-muted" />
                </button>
            </div>

            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-4" />

            {/* Scrollable Content */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto pr-4 no-scrollbar space-y-2"
            >
                {/* CATEGORY 1: VOICE & LANGUAGE */}
                <CollapsibleSection title="Voice & Language" icon={Mic} defaultOpen={true}>
                    <Slider
                        label="Speaking Speed"
                        value={settings.voice.speed}
                        min={0.5}
                        max={2.0}
                        step={0.1}
                        unit="x"
                        onChange={(val) => updateSettings('voice', 'speed', val)}
                    />
                    <Dropdown
                        label="Voice"
                        options={["Swara (Hindi)", "Neerja (English)", "Aarohi (Marathi)"]}
                        selected={settings.voice.voice}
                        onSelect={(val) => updateSettings('voice', 'voice', val)}
                        showPreview={true}
                        onPreview={(opt) => console.log('Previewing voice:', opt)}
                    />
                    <ToggleSwitch
                        label="Language Detection"
                        isOn={settings.voice.languageMode === 'Auto'}
                        onToggle={(val) => updateSettings('voice', 'languageMode', val ? 'Auto' : 'Manual')}
                    />
                    {settings.voice.languageMode === 'Manual' && (
                        <div className="flex gap-3 mt-2">
                            {['Hindi', 'English', 'Marathi'].map(lang => (
                                <button
                                    key={lang}
                                    onClick={() => updateSettings('voice', 'manualLanguage', lang)}
                                    className={`flex-1 py-3 rounded-softer text-sm font-medium transition-all duration-300 ${settings.voice.manualLanguage === lang
                                            ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-glow'
                                            : 'glass hover:bg-white/5 text-text-muted'
                                        }`}
                                >
                                    {lang}
                                </button>
                            ))}
                        </div>
                    )}
                </CollapsibleSection>

                {/* CATEGORY 2: APPEARANCE */}
                <CollapsibleSection title="Appearance" icon={Palette}>
                    <div className="flex flex-col gap-4">
                        <label className="text-sm font-medium text-text-primary">Color Scheme</label>
                        <div className="grid grid-cols-2 gap-4">
                            {['Soft Purple & Pink', 'Electric Blue', 'Midnight Gold', 'Emerald Dream'].map(scheme => (
                                <button
                                    key={scheme}
                                    onClick={() => updateSettings('appearance', 'colorScheme', scheme)}
                                    className={`p-4 rounded-softer border-2 transition-all duration-300 flex flex-col gap-2 text-left ${settings.appearance.colorScheme === scheme
                                            ? 'border-primary bg-primary/10 shadow-purple-glow'
                                            : 'border-white/5 glass hover:border-white/20'
                                        }`}
                                >
                                    <div className="flex gap-2">
                                        <div className="w-4 h-4 rounded-full bg-primary" />
                                        <div className="w-4 h-4 rounded-full bg-secondary" />
                                    </div>
                                    <span className="text-xs font-bold">{scheme}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <ToggleSwitch
                        label="Dark Mode"
                        isOn={settings.appearance.theme === 'dark'}
                        onToggle={(val) => updateSettings('appearance', 'theme', val ? 'dark' : 'light')}
                    />
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-text-primary">Animation Speed</label>
                        <div className="flex gap-2">
                            {['Slow', 'Normal', 'Fast'].map(speed => (
                                <button
                                    key={speed}
                                    onClick={() => updateSettings('appearance', 'animationSpeed', speed)}
                                    className={`flex-1 py-2 rounded-soft text-xs font-bold transition-all ${settings.appearance.animationSpeed === speed
                                            ? 'bg-primary text-white'
                                            : 'glass text-text-muted'
                                        }`}
                                >
                                    {speed}
                                </button>
                            ))}
                        </div>
                    </div>
                    <Slider
                        label="UI Scale"
                        value={settings.appearance.uiScale}
                        min={80}
                        max={120}
                        step={5}
                        unit="%"
                        onChange={(val) => updateSettings('appearance', 'uiScale', val)}
                    />
                </CollapsibleSection>

                {/* CATEGORY 3: BEHAVIOR */}
                <CollapsibleSection title="Behavior" icon={Zap}>
                    <ToggleSwitch
                        label="Enable Wake Word"
                        isOn={settings.behavior.enableWakeWord}
                        onToggle={(val) => updateSettings('behavior', 'enableWakeWord', val)}
                    />
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-text-primary">Custom Wake Word</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={settings.behavior.wakeWord}
                                onChange={(e) => updateSettings('behavior', 'wakeWord', e.target.value)}
                                className="flex-1 glass px-4 py-2 text-sm rounded-softer focus:outline-none focus:ring-1 focus:ring-primary"
                                placeholder="e.g. Hey Anjaan"
                            />
                            <ActionButton variant="secondary">Test</ActionButton>
                        </div>
                    </div>
                    <ToggleSwitch
                        label="Remember Context"
                        isOn={settings.behavior.rememberContext}
                        onToggle={(val) => updateSettings('behavior', 'rememberContext', val)}
                    />
                    <ToggleSwitch
                        label="Auto-scroll Chat"
                        isOn={settings.behavior.autoScroll}
                        onToggle={(val) => updateSettings('behavior', 'autoScroll', val)}
                    />
                    <ToggleSwitch
                        label="Show Timestamps"
                        isOn={settings.behavior.showTimestamps}
                        onToggle={(val) => updateSettings('behavior', 'showTimestamps', val)}
                    />
                    <Dropdown
                        label="Task Confirmation"
                        options={["Always", "For dangerous actions", "Never"]}
                        selected={settings.behavior.confirmationRequired}
                        onSelect={(val) => updateSettings('behavior', 'confirmationRequired', val)}
                    />
                </CollapsibleSection>

                {/* CATEGORY 4: NOTIFICATIONS */}
                <CollapsibleSection title="Notifications" icon={Bell}>
                    <ToggleSwitch
                        label="Enable Notifications"
                        isOn={settings.notifications.enabled}
                        onToggle={(val) => updateSettings('notifications', 'enabled', val)}
                    />
                    <div className="flex flex-col gap-3 pl-4 border-l border-white/10 mt-2">
                        <ToggleSwitch
                            label="Task Completed"
                            isOn={settings.notifications.types.taskCompleted}
                            onToggle={(val) => updateNotificationType('taskCompleted', val)}
                        />
                        <ToggleSwitch
                            label="Reminders"
                            isOn={settings.notifications.types.reminders}
                            onToggle={(val) => updateNotificationType('reminders', val)}
                        />
                        <ToggleSwitch
                            label="News Updates"
                            isOn={settings.notifications.types.newsUpdates}
                            onToggle={(val) => updateNotificationType('newsUpdates', val)}
                        />
                        <ToggleSwitch
                            label="Weather Alerts"
                            isOn={settings.notifications.types.weatherAlerts}
                            onToggle={(val) => updateNotificationType('weatherAlerts', val)}
                        />
                    </div>
                    <ToggleSwitch
                        label="Sound Effects"
                        isOn={settings.notifications.sound}
                        onToggle={(val) => updateSettings('notifications', 'sound', val)}
                    />
                    <Slider
                        label="Notification Volume"
                        value={settings.notifications.volume}
                        min={0}
                        max={1}
                        step={0.1}
                        unit=""
                        onChange={(val) => updateSettings('notifications', 'volume', val)}
                    />
                </CollapsibleSection>

                {/* CATEGORY 5: PRIVACY */}
                <CollapsibleSection title="Privacy" icon={Shield}>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Chat History</span>
                            <ActionButton variant="danger">Clear All</ActionButton>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Memory Cache</span>
                            <ActionButton variant="secondary">Clear Cache</ActionButton>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Data Export</span>
                            <ActionButton variant="secondary">Download .JSON</ActionButton>
                        </div>
                    </div>
                    <ToggleSwitch
                        label="Send Usage Data"
                        isOn={settings.privacy.analytics}
                        onToggle={(val) => updateSettings('privacy', 'analytics', val)}
                    />
                </CollapsibleSection>

                {/* CATEGORY 6: ABOUT */}
                <CollapsibleSection title="About" icon={Info}>
                    <div className="flex flex-col items-center text-center gap-4 py-4">
                        <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl shadow-glow">🌸</div>
                        <div>
                            <h4 className="text-lg font-bold">ANJAAN v1.0.4</h4>
                            <p className="text-xs text-text-muted">Your Personal AI Assistant</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-4">
                        {[
                            { label: 'Documentation', icon: MessageSquare },
                            { label: 'Feedback', icon: MessageCircle },
                            { label: 'Report Bug', icon: Bug },
                            { label: 'Support Project', icon: Heart }
                        ].map(item => (
                            <button key={item.label} className="flex flex-col items-center gap-2 p-4 glass rounded-softer hover:bg-primary/10 transition-all border border-transparent hover:border-primary/20">
                                <item.icon className="w-5 h-5 text-primary" />
                                <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
                            </button>
                        ))}
                    </div>
                </CollapsibleSection>
            </div>

            {/* Footer Buttons */}
            <div className="flex gap-4 mt-6 shrink-0 pt-4 border-t border-primary/10">
                <ActionButton
                    variant="secondary"
                    className="flex-1"
                    onClick={resetSettings}
                >
                    Reset Defaults
                </ActionButton>
                <ActionButton
                    variant="primary"
                    className="flex-1"
                    onClick={() => {/* Apply logic */ }}
                >
                    Save Changes
                </ActionButton>
            </div>
        </motion.div>
    );
};

export default SettingsPanel;
