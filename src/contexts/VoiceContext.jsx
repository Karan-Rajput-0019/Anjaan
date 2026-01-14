import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

const VoiceContext = createContext();

export const VoiceProvider = ({ children }) => {
    const [voiceStatus, setVoiceStatus] = useState('idle'); // 'idle' | 'listening' | 'processing' | 'speaking' | 'error'
    const [isRecording, setIsRecording] = useState(false);
    const [audioLevel, setAudioLevel] = useState(0);
    const [transcript, setTranscript] = useState('');
    const [isMicrophoneEnabled, setIsMicrophoneEnabled] = useState(false);
    const [currentVoice, setCurrentVoice] = useState('Swara (Hindi)');
    const [voiceSpeed, setVoiceSpeed] = useState(1.0);

    const wsRef = useRef(null);
    const audioContextRef = useRef(null);

    // Mock WebSocket Integration for now
    useEffect(() => {
        console.log("VoiceContext: Initializing WebSocket connection (Mock)");
        // In a real scenario, we would connect here:
        // wsRef.current = new WebSocket('ws://your-backend-url');

        return () => {
            if (wsRef.current) wsRef.current.close();
        };
    }, []);

    const requestMicrophonePermission = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            setIsMicrophoneEnabled(true);
            stream.getTracks().forEach(track => track.stop()); // Just checking permission
            return true;
        } catch (err) {
            console.error("Microphone permission denied:", err);
            setIsMicrophoneEnabled(false);
            setVoiceStatus('error');
            return false;
        }
    };

    const startListening = useCallback(async () => {
        const hasPermission = await requestMicrophonePermission();
        if (!hasPermission) return;

        setVoiceStatus('listening');
        setIsRecording(true);
        setTranscript('');
        // Logic to start streaming audio to WebSocket would go here
    }, []);

    const stopListening = useCallback(() => {
        setVoiceStatus('processing');
        setIsRecording(false);
        // Logic to stop streaming and wait for final transcription
        setTimeout(() => setVoiceStatus('idle'), 2000); // Mock delay
    }, []);

    const updateAudioLevel = useCallback((level) => {
        setAudioLevel(level);
    }, []);

    const changeVoice = useCallback((voiceName) => {
        setCurrentVoice(voiceName);
    }, []);

    return (
        <VoiceContext.Provider value={{
            voiceStatus,
            setVoiceStatus,
            isRecording,
            audioLevel,
            updateAudioLevel,
            transcript,
            setTranscript,
            isMicrophoneEnabled,
            requestMicrophonePermission,
            startListening,
            stopListening,
            currentVoice,
            changeVoice,
            voiceSpeed,
            setVoiceSpeed
        }}>
            {children}
        </VoiceContext.Provider>
    );
};

export const useVoice = () => {
    const context = useContext(VoiceContext);
    if (!context) {
        throw new Error('useVoice must be used within a VoiceProvider');
    }
    return context;
};
