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
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-center space-y-2">
            {/* Scroll to Top — appears above social buttons */}
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
                            className="p-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:shadow-purple-500/40 hover:shadow-xl transition-shadow block"
                            aria-label="Scroll to top"
                        >
                            <ArrowUp size={20} />
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
                        className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg transition-colors duration-200 block"
                    >
                        <Github size={24} />
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
                        className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg transition-colors duration-200 block"
                    >
                        <Linkedin size={24} />
                    </a>
                </MagneticWrapper>
            )}
        </div>
    );
};

export default SocialButtons;
