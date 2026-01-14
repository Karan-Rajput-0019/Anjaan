import React from 'react';
import { SettingsProvider } from './SettingsContext';
import { UIProvider } from './UIContext';
import { AnjaanProvider } from './AnjaanContext';
import { VoiceProvider } from './VoiceContext';
import { ChatProvider } from './ChatContext';
import { TaskProvider } from './TaskContext';

export const AppProviders = ({ children }) => {
    return (
        <SettingsProvider>
            <UIProvider>
                <AnjaanProvider>
                    <VoiceProvider>
                        <ChatProvider>
                            <TaskProvider>
                                {children}
                            </TaskProvider>
                        </ChatProvider>
                    </VoiceProvider>
                </AnjaanProvider>
            </UIProvider>
        </SettingsProvider>
    );
};
