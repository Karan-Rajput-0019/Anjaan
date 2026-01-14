import { useRef, useEffect } from 'react';

const useGestures = (onSwipeLeft, onSwipeRight, onPullDown) => {
    const touchStart = useRef({ x: 0, y: 0 });
    const minSwipeDistance = 50;

    useEffect(() => {
        const handleTouchStart = (e) => {
            touchStart.current = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY
            };
        };

        const handleTouchEnd = (e) => {
            const touchEnd = {
                x: e.changedTouches[0].clientX,
                y: e.changedTouches[0].clientY
            };

            const distanceX = touchEnd.x - touchStart.current.x;
            const distanceY = touchEnd.y - touchStart.current.y;

            // Horizontal Swipes
            if (Math.abs(distanceX) > Math.abs(distanceY)) {
                if (Math.abs(distanceX) > minSwipeDistance) {
                    if (distanceX > 0) {
                        onSwipeRight?.();
                    } else {
                        onSwipeLeft?.();
                    }
                }
            }
            // Vertical Swipes
            else {
                if (distanceY > 100 && touchStart.current.y < 50) {
                    onPullDown?.();
                }
            }
        };

        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchend', handleTouchEnd);

        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [onSwipeLeft, onSwipeRight, onPullDown]);
};

export default useGestures;
