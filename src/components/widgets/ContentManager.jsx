import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WeatherCard from './WeatherCard';
import NewsPanel from './NewsPanel';
import MediaPlayer from './MediaPlayer';
import TaskList from './TaskList';
import FileBrowser from './FileBrowser';
import SettingsPanel from './SettingsPanel';

import { WidgetSkeleton } from '../core/Skeletons'

const ContentManager = ({ activeContext }) => {
    const [isLoading, setIsLoading] = useState(false)

    // Simulate loading when context changes
    useEffect(() => {
        setIsLoading(true)
        const timer = setTimeout(() => setIsLoading(false), 300)
        return () => clearTimeout(timer)
    }, [activeContext])

    const getWidget = () => {
        if (isLoading) return <WidgetSkeleton key="skeleton" />;

        switch (activeContext) {
            case 'settings':
                return <SettingsPanel key="settings" />;
            case 'weather':
                return <WeatherCard key="weather" />;
            case 'news':
                return <NewsPanel key="news" />;
            case 'music':
                return <MediaPlayer key="music" />;
            case 'tasks':
                return <TaskList key="tasks" />;
            case 'files':
                return <FileBrowser key="files" />;
            case 'idle':
            default:
                return null;
        }
    };

    return (
        <div className="relative w-full flex justify-center items-center py-8">
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeContext}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="w-full h-full flex justify-center items-center"
                >
                    {getWidget()}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default ContentManager;
