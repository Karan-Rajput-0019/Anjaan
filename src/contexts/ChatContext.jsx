import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [messages, setMessages] = useState(() => {
        const saved = localStorage.getItem('anjaan_chat_history');
        return saved ? JSON.parse(saved).map(m => ({ ...m, timestamp: new Date(m.timestamp) })) : [];
    });
    const [isTyping, setIsTyping] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    // Auto-save chat history (max 100 messages)
    useEffect(() => {
        const historyToSave = messages.slice(-100);
        localStorage.setItem('anjaan_chat_history', JSON.stringify(historyToSave));
    }, [messages]);

    const addMessage = useCallback((content, role = 'user', type = 'text', metadata = {}) => {
        const newMessage = {
            id: uuidv4(),
            role,
            content,
            type,
            timestamp: new Date(),
            metadata
        };
        setMessages(prev => [...prev, newMessage]);
        if (role === 'assistant') {
            setUnreadCount(prev => prev + 1);
        }
    }, []);

    const clearChat = useCallback(() => {
        if (window.confirm('Are you sure you want to clear your conversation history?')) {
            setMessages([]);
            setUnreadCount(0);
            localStorage.removeItem('anjaan_chat_history');
        }
    }, []);

    const markAsRead = useCallback(() => {
        setUnreadCount(0);
    }, []);

    const deleteMessage = useCallback((id) => {
        setMessages(prev => prev.filter(m => m.id !== id));
    }, []);

    const updateMessage = useCallback((id, content) => {
        setMessages(prev => prev.map(m => m.id === id ? { ...m, content, timestamp: new Date() } : m));
    }, []);

    const exportChatHistory = useCallback(() => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(messages));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "anjaan_chat_history.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }, [messages]);

    return (
        <ChatContext.Provider value={{
            messages,
            addMessage,
            clearChat,
            markAsRead,
            deleteMessage,
            updateMessage,
            isTyping,
            setIsTyping,
            unreadCount,
            exportChatHistory
        }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
};
