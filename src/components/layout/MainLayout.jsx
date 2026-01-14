import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './Header'
import LeftPanel from './LeftPanel'
import CenterArea from './CenterArea'
import RightPanel from './RightPanel'
import BottomBar from './BottomBar'
import ContentManager from '../widgets/ContentManager'
import { useUI } from '../../contexts/UIContext'
import { useAnjaan } from '../../contexts/AnjaanContext'
import useGestures from '../../hooks/useGestures'

const MainLayout = ({ children, isListening = false }) => {
    const { currentView, setCurrentView } = useAnjaan();
    const {
        isSmall,
        isLeftDrawerOpen, setIsLeftDrawerOpen,
        isRightDrawerOpen, setIsRightDrawerOpen,
        isLeftPanelCollapsed
    } = useUI();

    // Focus Trap & Management
    useEffect(() => {
        if (isLeftDrawerOpen || isRightDrawerOpen) {
            document.body.style.overflow = 'hidden';
            // Simple focus trap: set focus to the first element in the drawer
            const activeDrawer = isLeftDrawerOpen ? 'left-drawer' : 'right-drawer';
            setTimeout(() => {
                const drawerContent = document.getElementById(activeDrawer);
                const focusable = drawerContent?.querySelectorAll('button, [href], input, [tabindex]:not([tabindex="-1"])');
                if (focusable && focusable.length > 0) focusable[0].focus();
            }, 100);
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isLeftDrawerOpen, isRightDrawerOpen]);

    // Touch Gestures
    useGestures(
        () => isSmall && setIsRightDrawerOpen(true), // Swipe Left -> Open Chat
        () => isSmall && setIsLeftDrawerOpen(true),  // Swipe Right -> Open Menu
        () => {
            if (isSmall) {
                console.log('Pull to refresh triggered');
                // Could trigger a visual feedback or actual refresh logic
            }
        }
    );

    return (
        <div className="min-h-screen flex flex-col overflow-hidden bg-bg-primary text-adaptive-base">
            {/* Header */}
            <Header onMenuClick={() => setIsLeftDrawerOpen(true)} onChatClick={() => setIsRightDrawerOpen(true)} />

            {/* Backdrop for Mobile Drawers */}
            <AnimatePresence>
                {(isLeftDrawerOpen || isRightDrawerOpen) && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => {
                            setIsLeftDrawerOpen(false);
                            setIsRightDrawerOpen(false);
                        }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Main Content Area - Adaptive Layout */}
            <div className="flex-1 flex gap-0 sm:gap-6 p-4 sm:p-6 pb-24 overflow-hidden relative">

                {/* Left Panel / Drawer */}
                <AnimatePresence>
                    {(!isSmall || isLeftDrawerOpen) && (
                        <motion.div
                            id="left-drawer"
                            initial={isSmall ? { x: '-100%' } : { opacity: 0, x: -20 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className={`
                                z-[70] lg:z-auto
                                ${isSmall ? 'fixed top-0 left-0 h-full w-[80%] bg-bg-secondary/95 backdrop-blur-xl border-r border-primary/20 p-6' : 'relative'}
                                ${isLeftPanelCollapsed && !isSmall ? 'w-[80px]' : 'w-[280px]'}
                                transition-all duration-300
                            `}
                        >
                            <LeftPanel />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Center Area */}
                <CenterArea className="flex-1 min-w-0">
                    <div className="flex flex-col items-center gap-8 sm:gap-12 w-full max-w-4xl mx-auto">
                        {children}
                        <ContentManager activeContext={currentView} />
                    </div>
                </CenterArea>

                {/* Right Panel / Drawer */}
                <AnimatePresence>
                    {(!isSmall || isRightDrawerOpen) && (
                        <motion.div
                            id="right-drawer"
                            initial={isSmall ? { x: '100%' } : { opacity: 0, x: 20 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className={`
                                z-[70] lg:z-auto
                                ${isSmall ? 'fixed top-0 right-0 h-full w-[90%] bg-bg-secondary/95 backdrop-blur-xl border-l border-primary/20 p-6' : 'relative w-[320px] lg:w-[380px] xl:w-[420px]'}
                                hidden sm:flex
                            `}
                        >
                            <RightPanel />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Bottom Bar */}
            <BottomBar isListening={isListening} />
        </div>
    )
}

export default MainLayout
