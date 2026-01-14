import React, { createContext, useContext, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AnjaanContext = createContext();

export const AnjaanProvider = ({ children }) => {
    const [currentView, setCurrentView] = useState('weather');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [connectionStatus, setConnectionStatus] = useState('connected'); // 'connected' | 'disconnected' | 'connecting'
    const [activeFeature, setActiveFeature] = useState(null);
    const [notifications, setNotifications] = useState([]);

    const showNotification = useCallback((message, type = 'info', duration = 5000) => {
        const id = uuidv4();
        setNotifications(prev => [...prev, { id, message, type, timestamp: new Date() }]);

        if (duration > 0) {
            setTimeout(() => {
                clearNotification(id);
            }, duration);
        }
        return id;
    }, []);

    const clearNotification = useCallback((id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    }, []);

    const clearError = useCallback(() => setError(null), []);

    return (
        <AnjaanContext.Provider value={{
            currentView,
            setCurrentView,
            isLoading,
            setIsLoading,
            error,
            setError,
            clearError,
            connectionStatus,
            setConnectionStatus,
            activeFeature,
            setActiveFeature,
            notifications,
            showNotification,
            clearNotification
        }}>
            {children}
        </AnjaanContext.Provider>
    );
};

export const useAnjaan = () => {
    const context = useContext(AnjaanContext);
    if (!context) {
        throw new Error('useAnjaan must be used within an AnjaanProvider');
    }
    return context;
};
