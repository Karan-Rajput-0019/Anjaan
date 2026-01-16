/**
 * Global Animation Variants and Transitions for Framer Motion
 * These follow the animation principles: Purposeful, Smooth, Consistent, Delightful, Performant.
 */

// Basic Transitions
export const springTransition = {
    type: "spring",
    stiffness: 300,
    damping: 30
};

export const slowSpringTransition = {
    type: "spring",
    stiffness: 200,
    damping: 25
};

export const smoothTransition = {
    duration: 0.5,
    ease: [0.43, 0.13, 0.23, 0.96]
};

// Page/View Transitions
export const pageVariants = {
    initial: {
        opacity: 0,
        y: 20,
        scale: 0.98
    },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut",
            staggerChildren: 0.1
        }
    },
    exit: {
        opacity: 0,
        y: -10,
        scale: 0.98,
        transition: {
            duration: 0.3,
            ease: "easeIn"
        }
    }
};

// Stagger Patterns
export const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1
        }
    }
};

export const staggerItem = (direction = 'up') => {
    const directions = {
        up: { y: 20 },
        down: { y: -20 },
        left: { x: 20 },
        right: { x: -20 }
    };

    return {
        hidden: { opacity: 0, ...directions[direction] },
        show: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 20
            }
        }
    };
};

// Interactive Elements
export const buttonHover = {
    scale: 1.02,
    y: -2,
    boxShadow: "0 10px 20px -5px rgba(236, 72, 153, 0.3)",
};

export const buttonTap = {
    scale: 0.98,
    y: 0
};

export const cardHover = {
    scale: 1.03,
    boxShadow: "0 20px 40px -10px rgba(192, 132, 252, 0.25)",
    borderColor: "rgba(192, 132, 252, 0.5)"
};

// Micro-interactions
export const checkboxVariants = {
    checked: {
        scale: 1,
        backgroundColor: "var(--color-primary)",
        transition: { type: "spring", stiffness: 500, damping: 30 }
    },
    unchecked: {
        scale: 0.8,
        backgroundColor: "transparent"
    }
};

export const toggleVariants = {
    on: { x: 24, transition: springTransition },
    off: { x: 2, transition: springTransition }
};

// AI Core Animations
export const aiPulse = {
    idle: {
        scale: [1, 1.05, 1],
        opacity: [0.8, 1, 0.8],
        transition: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
        }
    },
    listening: {
        scale: [1, 1.1, 1],
        transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

// Shimmer Effect for Skeletons
export const shimmerVariants = {
    initial: { backgroundPosition: "-200px 0" },
    animate: {
        backgroundPosition: "200px 0",
        transition: {
            repeat: Infinity,
            duration: 1.5,
            ease: "linear"
        }
    }
};
