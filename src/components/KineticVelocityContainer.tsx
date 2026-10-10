import React from 'react';
import { motion, useScroll, useVelocity, useSpring, useTransform } from 'framer-motion';

interface KineticVelocityContainerProps {
    children: React.ReactNode;
    className?: string;
    maxSkew?: number; // Maximum skew angle in degrees (default 2)
}

export const KineticVelocityContainer: React.FC<KineticVelocityContainerProps> = ({
    children,
    className = '',
    maxSkew = 2,
}) => {
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);

    // Responsive spring physics to smoothly interpolate velocity without jitter
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 42,
        stiffness: 320,
        mass: 0.45,
    });

    // Subtle, elegant aerodynamic skew based on scroll direction & speed
    const skewY = useTransform(
        smoothVelocity,
        [-1600, 0, 1600],
        [-maxSkew, 0, maxSkew]
    );

    return (
        <motion.div
            style={{
                skewY,
                willChange: 'transform',
                transformOrigin: 'center center',
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
