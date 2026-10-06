// SocialButtons.tsx
import { Github, Linkedin, ArrowUp } from 'lucide-react';
import { SocialLinks } from "../data/portfolio";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagneticWrapper } from './MagneticWrapper';

interface SocialButtonsProps {
    socialLinks: SocialLinks;
}

const SocialButtons: React.FC<SocialButtonsProps> = ({ socialLinks }) => {
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => setShowScrollTop(window.scrollY > 400);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed bottom-5 right-5 z-50 flex flex-col items-center space-y-2.5">
            {/* Scroll to Top */}
            <AnimatePresence>
                {showScrollTop && (
                    <MagneticWrapper strength={0.4}>
                        <motion.button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            initial={{ opacity: 0, scale: 0.5, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.5, y: 10 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-xl shadow-indigo-500/25 border border-white/20 hover:shadow-indigo-500/40 transition-all flex items-center justify-center shrink-0 cursor-pointer"
                            aria-label="Scroll to top"
                        >
                            <ArrowUp size={18} />
                        </motion.button>
                    </MagneticWrapper>
                )}
            </AnimatePresence>

            {/* GitHub */}
            {socialLinks.github && (
                <MagneticWrapper strength={0.4}>
                    <a
                        href={socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View my GitHub profile"
                        className="glass-card text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white w-11 h-11 rounded-2xl hover:border-indigo-500/40 transition-all flex items-center justify-center shrink-0 cursor-pointer"
                    >
                        <Github size={20} />
                    </a>
                </MagneticWrapper>
            )}

            {/* LinkedIn */}
            {socialLinks.linkedin && (
                <MagneticWrapper strength={0.4}>
                    <a
                        href={socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View my LinkedIn profile"
                        className="glass-card text-zinc-700 dark:text-zinc-300 hover:text-[#0a66c2] dark:hover:text-sky-400 w-11 h-11 rounded-2xl hover:border-indigo-500/40 transition-all flex items-center justify-center shrink-0 cursor-pointer"
                    >
                        <Linkedin size={20} />
                    </a>
                </MagneticWrapper>
            )}
        </div>
    );
};

export default SocialButtons;
