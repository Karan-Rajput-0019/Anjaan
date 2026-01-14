import { useEffect } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { useUI } from '../contexts/UIContext';

const useKeyboardShortcuts = (actions) => {
    const { setIsLanguageModalOpen } = useSettings();
    const { setIsLeftDrawerOpen, setIsRightDrawerOpen } = useUI();

    useEffect(() => {
        const handleKeyDown = (e) => {
            // Check if user is typing in an input or textarea
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) {
                return;
            }

            const isCtrl = e.ctrlKey || e.metaKey;
            const isShift = e.shiftKey;

            // Space: Activate voice
            if (e.code === 'Space') {
                e.preventDefault();
                actions.onVoiceTrigger?.();
            }

            // Esc: Cancel/Close
            if (e.code === 'Escape') {
                actions.onCancel?.();
                setIsLanguageModalOpen(false);
                setIsLeftDrawerOpen(false);
                setIsRightDrawerOpen(false);
            }

            // Ctrl+K: Search/Command (Context change)
            if (isCtrl && e.key === 'k') {
                e.preventDefault();
                actions.onSearchTrigger?.();
            }

            // Ctrl+,: Settings
            if (isCtrl && e.key === ',') {
                e.preventDefault();
                actions.onSettingsTrigger?.();
            }

            // Ctrl+L: Language selector
            if (isCtrl && e.key === 'l') {
                e.preventDefault();
                setIsLanguageModalOpen(true);
            }

            // Navigation: Ctrl + 1-4
            if (isCtrl && ['1', '2', '3', '4'].includes(e.key)) {
                e.preventDefault();
                const contexts = ['weather', 'news', 'files', 'music'];
                actions.onContextSwitch?.(contexts[parseInt(e.key) - 1]);
            }

            // Chat: Ctrl+Enter (if in message context, though we handle global here)
            // Ctrl+Shift+C: Clear chat
            if (isCtrl && isShift && e.key === 'C') {
                e.preventDefault();
                actions.onClearChat?.();
            }

            // ?: Help modal
            if (e.key === '?' && !isCtrl) {
                e.preventDefault();
                actions.onHelpTrigger?.();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [actions, setIsLanguageModalOpen, setIsLeftDrawerOpen, setIsRightDrawerOpen]);
};

export default useKeyboardShortcuts;
