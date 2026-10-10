import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { soundFx } from '../utils/soundEffects';

export const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isDesktop, setIsDesktop] = useState(true);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);
    
    // Smooth trailing spring physics for outer liquid ring
    const springConfig = { damping: 28, stiffness: 350, mass: 0.4 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    // Dynamic velocity and angle for fluid elongation
    const cursorAngle = useMotionValue(0);
    const cursorScaleX = useMotionValue(1);
    const cursorScaleY = useMotionValue(1);

    const prevMouse = useRef({ x: -100, y: -100, time: Date.now() });

    useEffect(() => {
        // Detect touch devices
        if (window.matchMedia('(pointer: coarse)').matches) {
            setIsDesktop(false);
            return;
        }

        const handleMouseMove = (e: MouseEvent) => {
            const now = Date.now();
            const dt = Math.max(now - prevMouse.current.time, 16);
            const dx = e.clientX - prevMouse.current.x;
            const dy = e.clientY - prevMouse.current.y;
            const dist = Math.hypot(dx, dy);
            const speed = Math.min(dist / (dt / 16), 40); // normalized speed

            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);

            // Compute deformation angle & stretch
            if (dist > 3) {
                const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
                cursorAngle.set(angle);
                const stretch = 1 + Math.min(speed * 0.035, 0.55);
                const squeeze = 1 - Math.min(speed * 0.02, 0.25);
                cursorScaleX.set(stretch);
                cursorScaleY.set(squeeze);
            } else {
                cursorScaleX.set(1);
                cursorScaleY.set(1);
            }

            prevMouse.current = { x: e.clientX, y: e.clientY, time: now };

            // Check if hovering over clickable targets
            const target = e.target as HTMLElement | null;
            if (target) {
                const isClickable =
                    target.closest('a') !== null ||
                    target.closest('button') !== null ||
                    target.closest('.cursor-pointer') !== null ||
                    target.closest('input') !== null ||
                    target.closest('textarea') !== null ||
                    target.hasAttribute('data-magnetic');

                setIsHovering(Boolean(isClickable));
            }
        };

        const handleMouseDown = () => {
            setIsClicking(true);
            soundFx.playPop(480, 0.04, 0.04);
        };

        const handleMouseUp = () => {
            setIsClicking(false);
        };

        const handleMouseLeave = () => setIsVisible(false);

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [mouseX, mouseY, cursorAngle, cursorScaleX, cursorScaleY, isVisible]);

    if (!isDesktop || !isVisible) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[10000] overflow-hidden">
            {/* Outer Liquid Morphing Ring */}
            <motion.div
                className="absolute top-0 left-0 w-9 h-9 rounded-full border border-blue-400/80 dark:border-indigo-400/80 shadow-[0_0_15px_rgba(99,102,241,0.35)]"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                    rotate: cursorAngle,
                    scaleX: cursorScaleX,
                    scaleY: cursorScaleY,
                }}
                animate={{
                    scale: isClicking ? 0.8 : isHovering ? 1.6 : 1,
                    borderColor: isHovering ? 'rgba(56, 189, 248, 0.9)' : 'rgba(99, 102, 241, 0.75)',
                    backgroundColor: isHovering ? 'rgba(99, 102, 241, 0.08)' : 'transparent',
                }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
            />

            {/* Inner Precision Focal Dot */}
            <motion.div
                className="absolute top-0 left-0 w-2 h-2 rounded-full bg-blue-500 dark:bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: isClicking ? 0.5 : isHovering ? 0 : 1,
                    opacity: isHovering ? 0 : 1,
                }}
                transition={{ duration: 0.15 }}
            />
        </div>
    );
};
