import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isDesktop, setIsDesktop] = useState(true);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Spring physics for smooth trailing effect
    const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        // Detect if it's a touch device (phones/tablets). If so, we don't render the cursor.
        if (window.matchMedia("(pointer: coarse)").matches) {
            setIsDesktop(false);
            return;
        }

        const updateMousePosition = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);

            // Check if hovering over a clickable element
            const target = e.target as HTMLElement;
            const isClickable = 
                target.closest('a') !== null ||
                target.closest('button') !== null ||
                target.closest('.cursor-pointer') !== null ||
                target.closest('input') !== null ||
                target.closest('textarea') !== null;
            
            setIsHovering(isClickable);
        };

        const handleMouseLeave = () => setIsVisible(false);

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [mouseX, mouseY, isVisible]);

    // Don't render on mobile or when mouse leaves window
    if (!isDesktop || !isVisible) return null;

    return (
        <>
            {/* Outer Ring with spring physics */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[10000] mix-blend-difference flex items-center justify-center"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: isHovering ? 1.5 : 1,
                    opacity: isHovering ? 0.5 : 1,
                }}
                transition={{ duration: 0.2 }}
            />
            {/* Inner Dot perfectly tracking mouse */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[10000] mix-blend-difference"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: isHovering ? 0 : 1, // Shrink to 0 when hovering to let the ring take over
                }}
                transition={{ duration: 0.2 }}
            />
        </>
    );
};
