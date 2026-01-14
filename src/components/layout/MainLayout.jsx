import { useState } from 'react'
import Header from './Header'
import LeftPanel from './LeftPanel'
import CenterArea from './CenterArea'
import RightPanel from './RightPanel'
import BottomBar from './BottomBar'
import ContentManager from '../widgets/ContentManager'

const MainLayout = ({ children, isListening = false, activeWidget, onWidgetChange }) => {
    return (
        <div className="min-h-screen flex flex-col overflow-hidden">
            {/* Header */}
            <Header />

            {/* Main Content Area - 3 Panel Layout */}
            <div className="flex-1 flex gap-6 p-6 pb-24 overflow-hidden">
                {/* Left Panel */}
                <LeftPanel activeId={activeWidget} onActiveChange={onWidgetChange} />

                {/* Center Area */}
                <CenterArea>
                    <div className="flex flex-col items-center gap-12 w-full max-w-4xl">
                        {children}
                        <ContentManager activeContext={activeWidget} />
                    </div>
                </CenterArea>

                {/* Right Panel */}
                <RightPanel />
            </div>

            {/* Bottom Bar */}
            <BottomBar isListening={isListening} />
        </div>
    )
}

export default MainLayout
