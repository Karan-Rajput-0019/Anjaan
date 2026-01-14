import { useState } from 'react'
import Header from './Header'
import LeftPanel from './LeftPanel'
import CenterArea from './CenterArea'
import RightPanel from './RightPanel'
import BottomBar from './BottomBar'

const MainLayout = ({ children, isListening = false }) => {
    return (
        <div className="min-h-screen flex flex-col overflow-hidden">
            {/* Header */}
            <Header />

            {/* Main Content Area - 3 Panel Layout */}
            <div className="flex-1 flex gap-6 p-6 overflow-hidden">
                {/* Left Panel */}
                <LeftPanel />

                {/* Center Area */}
                <CenterArea>
                    {children}
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
