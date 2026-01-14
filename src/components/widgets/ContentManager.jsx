import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WeatherCard from './WeatherCard';
import NewsPanel from './NewsPanel';
import MediaPlayer from './MediaPlayer';
import TaskList from './TaskList';
import FileBrowser from './FileBrowser';

const ContentManager = ({ activeContext = 'idle' }) => {
    const getWidget = () => {
        switch (activeContext) {
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
