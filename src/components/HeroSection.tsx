import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import { staggerContainer, springHover, fadeInUp } from '../animations';
import { Github, Linkedin } from 'lucide-react';
import { useTypewriter } from '../hooks/useTypewriter';
import { MagneticWrapper } from './MagneticWrapper';

export const HeroSection = () => {
    const { displayText, isDeleting } = useTypewriter({
        texts: portfolioData.personal.heroTexts,
        typingSpeed: 55,
        deletingSpeed: 30,
        pauseAfterType: 2000,
    });

    return (
        <motion.section
            className="relative h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600 dark:from-blue-900 dark:via-purple-800 dark:to-gray-800 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >

            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                    src={portfolioData.personal.backgroundImage }
                    alt="Hero Background"
                    className="w-full h-full object-cover opacity-10"
                    fetchPriority="high"
                />
            </div>

            {/* Glowing Aurora Background Effect */}
            <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none blur-[60px] opacity-50">
                <motion.div
                    className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-teal-400/40 rounded-full"
                    style={{ willChange: 'transform' }}
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-indigo-500/40 rounded-full"
                    style={{ willChange: 'transform' }}
                    animate={{
                        x: [0, -100, 0],
                        y: [0, 100, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                />
                <motion.div
                    className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] bg-pink-500/30 rounded-full"
                    style={{ willChange: 'transform' }}
                    animate={{
                        x: [0, 80, 0],
                        y: [0, -100, 0],
                        scale: [1, 1.05, 1],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
                />
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto flex flex-col items-center justify-center px-4 relative z-10">
                <motion.div
                    className="flex flex-col items-center justify-center gap-8 text-center"
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                >
                    <motion.div
                        className="flex-1 text-white"
                        variants={fadeInUp}
                    >
                        <motion.h1
                            className="text-5xl md:text-7xl font-bold mb-4 text-gradient bg-clip-text dark:text-gradient dark:bg-clip-text dark:bg-gradient-to-r from-blue-400 to-purple-500"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.05, duration: 0.4 }}
                        >
                            {portfolioData.personal.name}
                        </motion.h1>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <h2 className="text-2xl md:text-3xl text-yellow-300 mb-6">
                                {portfolioData.personal.title}
                            </h2>
                            <p className="text-lg text-gray-200 dark:text-gray-300 mb-8 min-h-[1.75rem]">
                                {displayText}
                                <span
                                    className={`inline-block w-0.5 h-5 ml-0.5 align-middle ${
                                        isDeleting ? 'bg-pink-300' : 'bg-white'
                                    } animate-pulse`}
                                />
                            </p>
                        </motion.div>
                        <motion.div
                            className="flex gap-4 items-center justify-center"
                            variants={springHover}
                        >
                            <MagneticWrapper>
                                <motion.a
                                    href="#projects"
                                    className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all inline-block"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    View Projects
                                </motion.a>
                            </MagneticWrapper>
                            <MagneticWrapper>
                                <motion.a
                                    href="#contact"
                                    className="px-6 py-3 bg-white/20 backdrop-blur-sm border-2 border-white/60 text-white rounded-lg hover:bg-white hover:text-purple-700 transition-all font-semibold inline-block"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Contact Me
                                </motion.a>
                            </MagneticWrapper>
                        </motion.div>

                        {/* Social Media Icons */}
                        <motion.div
                            className="flex gap-4 mt-6 items-center justify-center"
                            variants={staggerContainer}
                        >
                            <MagneticWrapper strength={0.2}>
                                <motion.a
                                    href={portfolioData.personal.socialLinks.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="View my GitHub profile"
                                    className="text-gray-800 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white inline-block p-2"
                                    whileHover={{ scale: 1.2 }}
                                >
                                    <Github className="w-6 h-6" />
                                    <span className="sr-only">GitHub Profile</span>
                                </motion.a>
                            </MagneticWrapper>
                            <MagneticWrapper strength={0.2}>
                                <motion.a
                                    href={portfolioData.personal.socialLinks.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="View my LinkedIn profile"
                                    className="text-gray-800 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white inline-block p-2"
                                    whileHover={{ scale: 1.2 }}
                                >
                                    <Linkedin className="w-6 h-6" />
                                    <span className="sr-only">LinkedIn Profile</span>
                                </motion.a>
                            </MagneticWrapper>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="flex-1 flex justify-center"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, type: "spring" }}
                    >
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
};