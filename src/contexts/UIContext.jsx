import React, { createContext, useContext, useState, useEffect } from 'react';
import useBreakpoint from '../hooks/useBreakpoint';

const UIContext = createContext();

export const UIProvider = ({ children }) => {
    const { breakpoint, isMobile, isTablet, isSmall } = useBreakpoint();
    const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState(false);
    const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);
    const [isLeftPanelCollapsed, setIsLeftPanelCollapsed] = useState(false);

    // Auto-close drawers when switching to larger screens
    useEffect(() => {
        if (!isSmall) {
            setIsLeftDrawerOpen(false);
            setIsRightDrawerOpen(false);
        }
        if (isTablet) {
            setIsLeftPanelCollapsed(true);
        } else if (!isSmall) {
            setIsLeftPanelCollapsed(false);
        }
    }, [isSmall, isTablet]);

    const toggleLeftDrawer = () => setIsLeftDrawerOpen(prev => !prev);
    const toggleRightDrawer = () => setIsRightDrawerOpen(prev => !prev);
    const toggleLeftPanel = () => setIsLeftPanelCollapsed(prev => !prev);

    return (
        <UIContext.Provider value={{
            breakpoint,
            isMobile,
            isTablet,
            isSmall,
            isLeftDrawerOpen,
            setIsLeftDrawerOpen,
            isRightDrawerOpen,
            setIsRightDrawerOpen,
            isLeftPanelCollapsed,
            setIsLeftPanelCollapsed,
            toggleLeftDrawer,
            toggleRightDrawer,
            toggleLeftPanel
        }}>
            {children}
        </UIContext.Provider>
    );
};

export const useUI = () => {
    const context = useContext(UIContext);
    if (!context) {
        throw new Error('useUI must be used within a UIProvider');
    }
    return context;
};
