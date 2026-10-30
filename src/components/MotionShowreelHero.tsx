import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { MotionShowreelCanvas } from './MotionShowreelCanvas';

export const MotionShowreelHero = () => {
    return (
        <section
            id="hero-motion-showreel"
            className="relative w-full h-screen min-h-[600px] bg-[#07080b] overflow-hidden flex items-center justify-center select-none"
        >
            {/* Pure Edge-to-Edge 5-Second 100 BPM Motion Showreel Canvas */}
            <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                <MotionShowreelCanvas minimal className="w-full h-full" />
            </div>

            {/* Subtle Minimal Scroll Hint */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.55 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-zinc-500 font-mono text-[10px] tracking-widest uppercase pointer-events-none"
            >
                <span>Scroll to explore</span>
                <ArrowDown className="w-3.5 h-3.5 animate-bounce text-cyan-400" />
            </motion.div>
        </section>
    );
};

export default MotionShowreelHero;
