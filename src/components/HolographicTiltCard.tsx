import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface HolographicTiltCardProps {
    children: React.ReactNode;
    className?: string;
    enableTilt?: boolean;
    enableLaserBorder?: boolean;
}

export const HolographicTiltCard: React.FC<HolographicTiltCardProps> = ({
    children,
    className = '',
    enableTilt = true,
    enableLaserBorder = true,
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Mouse coordinates normalized from -0.5 to 0.5
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Pixel mouse coordinates for spotlight
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring physics for smooth tilt response
    const springConfig = { damping: 22, stiffness: 280, mass: 0.5 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);
    const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const clientX = e.clientX - rect.left;
        const clientY = e.clientY - rect.top;

        mouseX.set(clientX);
        mouseY.set(clientY);

        if (enableTilt) {
            const normalizedX = clientX / rect.width - 0.5;
            const normalizedY = clientY / rect.height - 0.5;
            x.set(normalizedX);
            y.set(normalizedY);
        }
    };

    const handleMouseEnter = () => setIsHovered(true);

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    return (
        <div style={{ perspective: 1200 }} className="relative">
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX: enableTilt ? rotateX : 0,
                    rotateY: enableTilt ? rotateY : 0,
                    transformStyle: 'preserve-3d',
                }}
                className={`relative rounded-3xl overflow-hidden transition-shadow duration-300 ${className}`}
            >
                {/* Rotating Laser Conic Perimeter Border - Only active on hover for silky 60fps scrolling */}
                {enableLaserBorder && (
                    <div
                        className="absolute -inset-[1px] rounded-3xl pointer-events-none z-0 overflow-hidden transition-opacity duration-300"
                        style={{ opacity: isHovered ? 1 : 0.2 }}
                    >
                        {isHovered ? (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                                className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%]"
                                style={{
                                    willChange: 'transform',
                                    background:
                                        'conic-gradient(from 0deg, transparent 0deg, #6366f1 90deg, #06b6d4 180deg, #a855f7 270deg, transparent 360deg)',
                                }}
                            />
                        ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 via-transparent to-cyan-500/30" />
                        )}
                        {/* Inner mask to keep border 1px thin */}
                        <div className="absolute inset-[1px] rounded-[calc(1.5rem-1px)] bg-[#121319] dark:bg-[#0c0d14]" />
                    </div>
                )}

                {/* Mouse-Tracking Radial Spotlight */}
                <motion.div
                    className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
                    style={{
                        opacity: isHovered ? 0.35 : 0,
                        background: `radial-gradient(400px circle at ${mouseX.get()}px ${mouseY.get()}px, rgba(99, 102, 241, 0.25), transparent 70%)`,
                    }}
                />

                {/* Main Card Content */}
                <div className="relative z-10 h-full">{children}</div>
            </motion.div>
        </div>
    );
};
