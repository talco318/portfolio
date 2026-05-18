import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import { staggerContainer, fadeInUp } from '../animations';
import { Github, Linkedin, ArrowDown } from 'lucide-react';
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
        <section
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
        >
            {/* Soft, Elegant Background Glow */}
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none flex items-center justify-center">
                <div className="absolute top-[20%] left-[15%] w-96 h-96 bg-blue-500/20 dark:bg-blue-600/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] md:blur-[140px] animate-pulse-slow" />
                <div className="absolute bottom-[20%] right-[15%] w-96 h-96 bg-purple-500/20 dark:bg-purple-600/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] md:blur-[140px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
            </div>

            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, #18181B 1px, transparent 0)`,
                    backgroundSize: '32px 32px',
                }}
            />

            {/* Content */}
            <div className="max-w-5xl mx-auto px-4 relative z-10">
                <motion.div
                    className="flex flex-col items-center text-center gap-8"
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                >
                    {/* Status badge */}
                    <motion.div
                        variants={fadeInUp}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 dark:bg-zinc-800/40 backdrop-blur-md border border-white/50 dark:border-zinc-700/50 shadow-lg text-sm text-zinc-700 dark:text-zinc-300"
                    >
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                        </span>
                        Available for opportunities
                    </motion.div>

                    <motion.div variants={fadeInUp}>
                        <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-zinc-900 dark:text-white tracking-tight leading-[0.9]">
                            {portfolioData.personal.name.split(' ')[0]}
                            <span className="block mt-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 text-transparent bg-clip-text animate-gradient-x">
                                {portfolioData.personal.name.split(' ').slice(1).join(' ')}
                            </span>
                        </h1>
                    </motion.div>

                    <motion.div variants={fadeInUp}>
                        <p className="text-xl md:text-2xl font-medium text-zinc-600 dark:text-zinc-300 max-w-2xl px-4">
                            {portfolioData.personal.title}
                        </p>
                    </motion.div>

                    {/* Typewriter */}
                    <motion.div variants={fadeInUp} className="h-8">
                        <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 font-body font-medium">
                            {displayText}
                            <span
                                className={`inline-block w-[3px] h-5 md:h-6 ml-1 align-middle ${
                                    isDeleting ? 'bg-purple-500/60' : 'bg-blue-500'
                                } animate-pulse`}
                            />
                        </p>
                    </motion.div>

                    {/* CTA Buttons & Socials */}
                    <motion.div
                        className="flex flex-col items-center gap-6 mt-6"
                        variants={fadeInUp}
                    >
                        <div className="flex flex-col sm:flex-row gap-4 items-center">
                            <MagneticWrapper>
                                <motion.a
                                    href="#projects"
                                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold text-base hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 inline-flex items-center gap-2 cursor-pointer border border-transparent hover:border-white/20"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    View Projects
                                    <ArrowDown className="w-5 h-5 animate-bounce" />
                                </motion.a>
                            </MagneticWrapper>
                            <MagneticWrapper>
                                <motion.a
                                    href="#contact"
                                    className="px-8 py-4 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-md border-2 border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 rounded-2xl font-bold text-base hover:border-purple-500 hover:text-purple-600 dark:hover:border-purple-400 dark:hover:text-purple-300 transition-all duration-300 inline-flex items-center gap-2 cursor-pointer shadow-sm"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Contact Me
                                </motion.a>
                            </MagneticWrapper>
                        </div>

                        {/* Redesigned Social Icons */}
                        <div className="flex gap-4 mt-2">
                            <MagneticWrapper strength={0.3}>
                                <a
                                    href={portfolioData.personal.socialLinks.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="View my GitHub profile"
                                    className="flex items-center justify-center w-14 h-14 rounded-full bg-white dark:bg-zinc-800 shadow-md border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:text-white hover:bg-[#24292e] dark:hover:bg-white dark:hover:text-black transition-all duration-300 group cursor-pointer"
                                >
                                    <Github className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                                    <span className="sr-only">GitHub Profile</span>
                                </a>
                            </MagneticWrapper>
                            <MagneticWrapper strength={0.3}>
                                <a
                                    href={portfolioData.personal.socialLinks.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="View my LinkedIn profile"
                                    className="flex items-center justify-center w-14 h-14 rounded-full bg-white dark:bg-zinc-800 shadow-md border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:text-white hover:bg-[#0a66c2] dark:hover:bg-[#0a66c2] dark:hover:text-white transition-all duration-300 group cursor-pointer"
                                >
                                    <Linkedin className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                                    <span className="sr-only">LinkedIn Profile</span>
                                </a>
                            </MagneticWrapper>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-70"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
                <div className="w-6 h-10 rounded-full border-2 border-zinc-400 dark:border-zinc-500 flex items-start justify-center p-1.5 backdrop-blur-sm">
                    <motion.div
                        className="w-1.5 h-1.5 rounded-full bg-zinc-600 dark:bg-zinc-400"
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </div>
            </motion.div>
        </section>
    );
};