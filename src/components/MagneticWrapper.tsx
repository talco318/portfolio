import { useRef, ReactNode, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type MagneticWrapperProps = {
    children: ReactNode;
    className?: string;
    strength?: number; // How much it pulls towards the cursor
};

export const MagneticWrapper = ({ children, className = "", strength = 0.3 }: MagneticWrapperProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Raw absolute positions
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Apply strict spring physics for the "snap back" and smooth pull effect
    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();

        // Calculate distance from center of the element
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);

        // Update raw positions multiplied by pull strength
        x.set(middleX * strength);
        y.set(middleY * strength);
    };

    const reset = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={reset}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            style={{ x: springX, y: springY }}
            className={`inline-block ${className}`}
        >
            {children}
        </motion.div>
    );
};
