import { useState, useEffect } from 'react';

const breakpoints = {
    xs: 320,
    sm: 768,
    md: 1024,
    lg: 1280,
    xl: 1920
};

const useBreakpoint = () => {
    const [breakpoint, setBreakpoint] = useState('lg');

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width >= breakpoints.xl) setBreakpoint('xl');
            else if (width >= breakpoints.lg) setBreakpoint('lg');
            else if (width >= breakpoints.md) setBreakpoint('md');
            else if (width >= breakpoints.sm) setBreakpoint('sm');
            else setBreakpoint('xs');
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return {
        breakpoint,
        isMobile: breakpoint === 'xs',
        isTablet: breakpoint === 'sm' || breakpoint === 'md',
        isDesktop: breakpoint === 'lg',
        isLargeDesktop: breakpoint === 'xl',
        isSmall: breakpoint === 'xs' || breakpoint === 'sm',
    };
};

export default useBreakpoint;
