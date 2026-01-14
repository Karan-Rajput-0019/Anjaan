import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

const DEFAULT_SETTINGS = {
    language: 'en',
    languageMode: 'auto',
    theme: {
        scheme: 'Soft Purple & Pink',
        mode: 'dark'
    },
    voice: {
        speed: 1.0,
        currentVoice: 'Swara (Hindi)',
    },
    appearance: {
        enableAnimations: true,
        animationSpeed: 'normal',
        uiScale: 1.0,
    },
    behavior: {
        wakeWord: 'Hey Anjaan',
        wakeWordEnabled: true,
        rememberContext: true,
        autoScroll: true,
        showTimestamps: true,
        confirmActions: 'dangerous', // 'always' | 'dangerous' | 'never'
    },
    notifications: {
        enabled: true,
        types: {
            taskCompleted: true,
            reminders: true,
            newsUpdates: true,
            weatherAlerts: true,
            systemMessages: true,
        },
    },
    sound: {
        enabled: true,
        volume: 0.8,
    }
};

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem('anjaan_settings');
        return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    });

    const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('anjaan_settings', JSON.stringify(settings));

        // Apply UI Scale
        document.documentElement.style.setProperty('--ui-scale', settings.appearance.uiScale);
        document.body.style.fontSize = `${16 * settings.appearance.uiScale}px`;
    }, [settings]);

    const updateSetting = (path, value) => {
        setSettings(prev => {
            const newSettings = { ...prev };
            const keys = path.split('.');
            let current = newSettings;

            for (let i = 0; i < keys.length - 1; i++) {
                current[keys[i]] = { ...current[keys[i]] };
                current = current[keys[i]];
            }

            current[keys[keys.length - 1]] = value;
            return newSettings;
        });
    };

    const resetSettings = () => {
        setSettings(DEFAULT_SETTINGS);
    };

    const exportSettings = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(settings));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "anjaan_settings.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    const importSettings = (data) => {
        try {
            const parsed = typeof data === 'string' ? JSON.parse(data) : data;
            setSettings({ ...DEFAULT_SETTINGS, ...parsed });
        } catch (e) {
            console.error("Failed to import settings:", e);
        }
    };

    return (
        <SettingsContext.Provider value={{
            settings,
            updateSetting,
            resetSettings,
            exportSettings,
            importSettings,
            isLanguageModalOpen,
            setIsLanguageModalOpen
        }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};
