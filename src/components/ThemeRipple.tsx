import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import { useEffect, useState, useRef } from 'react';

export const ThemeRipple = () => {
    const { theme } = useTheme();
    const [ripple, setRipple] = useState<{ x: number, y: number, color: string } | null>(null);
    const prevTheme = useRef(theme);

    useEffect(() => {
        if (prevTheme.current !== theme) {
            // Find the theme toggle button position
            const toggleBtn = document.querySelector('[aria-label="Toggle theme"]');
            if (toggleBtn) {
                const rect = toggleBtn.getBoundingClientRect();
                setRipple({
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2,
                    color: theme === 'dark' ? '#09090b' : '#FAFAFA' // zinc-950 or surface
                });
            }
            prevTheme.current = theme;
        }
    }, [theme]);

    return (
        <AnimatePresence>
            {ripple && (
                <motion.div
                    key={ripple.color}
                    initial={{ 
                        clipPath: `circle(0% at ${ripple.x}px ${ripple.y}px)`,
                        opacity: 1
                    }}
                    animate={{ 
                        clipPath: `circle(150% at ${ripple.x}px ${ripple.y}px)`,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                    onAnimationComplete={() => setRipple(null)}
                    className="fixed inset-0 z-[9999] pointer-events-none"
                    style={{ backgroundColor: ripple.color }}
                />
            )}
        </AnimatePresence>
    );
};
