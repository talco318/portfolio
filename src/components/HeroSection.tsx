import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import { staggerContainer, fadeInUp } from '../animations';
import { Github, Linkedin, ArrowUpRight, Mail, Check, Terminal, Cpu, Database, Sparkles } from 'lucide-react';
import { useTypewriter } from '../hooks/useTypewriter';
import { MagneticWrapper } from './MagneticWrapper';
import { ParticleNetworkCanvas } from './ParticleNetworkCanvas';
import { useState } from 'react';

export const HeroSection = () => {
    const [copied, setCopied] = useState(false);

    const { displayText, isDeleting } = useTypewriter({
        texts: portfolioData.personal.heroTexts,
        typingSpeed: 50,
        deletingSpeed: 30,
        pauseAfterType: 2200,
    });

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(portfolioData.personal.email).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2200);
        });
    };

    return (
        <section
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background text-zinc-900 dark:text-white transition-colors duration-500"
        >
            {/* OpenAI Ethereal Ambient Canvas */}
            <ParticleNetworkCanvas />

            {/* Cinematic Astra Diffuse Atmospheric Glow */}
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[15%] left-[20%] w-[650px] h-[650px] bg-cyan-600/10 rounded-full filter blur-[150px] animate-pulse-slow" />
                <div className="absolute top-[25%] right-[20%] w-[600px] h-[600px] bg-indigo-600/12 rounded-full filter blur-[160px] animate-pulse-slow" style={{ animationDelay: '3s' }} />
                <div className="absolute -bottom-[10%] left-[35%] w-[700px] h-[700px] bg-blue-600/10 rounded-full filter blur-[170px] animate-pulse-slow" style={{ animationDelay: '6s' }} />
            </div>

            {/* Subtle Technical Grid Lines */}
            <div
                className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04] pointer-events-none text-zinc-950 dark:text-white"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
                    backgroundSize: '48px 48px',
                }}
            />

            {/* Draggable Minimalist Tech Badges */}
            <div className="hidden lg:block absolute inset-0 pointer-events-none z-20">
                <motion.div
                    drag
                    dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
                    dragElastic={0.4}
                    whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
                    className="absolute top-[26%] left-[8%] pointer-events-auto cursor-grab"
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <div className="px-4 py-2 rounded-full border border-zinc-200/80 dark:border-white/10 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl flex items-center gap-2 shadow-lg shadow-zinc-900/5 dark:shadow-2xl hover:border-zinc-400 dark:hover:border-white/30 transition-all text-xs font-mono text-zinc-700 dark:text-zinc-300">
                        <Terminal className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                        <span>python.core</span>
                    </div>
                </motion.div>

                <motion.div
                    drag
                    dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
                    dragElastic={0.4}
                    whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
                    className="absolute top-[22%] right-[10%] pointer-events-auto cursor-grab"
                    animate={{ y: [0, 14, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                >
                    <div className="px-4 py-2 rounded-full border border-zinc-200/80 dark:border-white/10 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl flex items-center gap-2 shadow-lg shadow-zinc-900/5 dark:shadow-2xl hover:border-zinc-400 dark:hover:border-white/30 transition-all text-xs font-mono text-zinc-700 dark:text-zinc-300">
                        <Cpu className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                        <span>react.ts</span>
                    </div>
                </motion.div>

                <motion.div
                    drag
                    dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
                    dragElastic={0.4}
                    whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
                    className="absolute bottom-[26%] left-[10%] pointer-events-auto cursor-grab"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                >
                    <div className="px-4 py-2 rounded-full border border-zinc-200/80 dark:border-white/10 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl flex items-center gap-2 shadow-lg shadow-zinc-900/5 dark:shadow-2xl hover:border-zinc-400 dark:hover:border-white/30 transition-all text-xs font-mono text-zinc-700 dark:text-zinc-300">
                        <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                        <span>ai.agents</span>
                    </div>
                </motion.div>

                <motion.div
                    drag
                    dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
                    dragElastic={0.4}
                    whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
                    className="absolute bottom-[28%] right-[8%] pointer-events-auto cursor-grab"
                    animate={{ y: [0, -14, 0] }}
                    transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                >
                    <div className="px-4 py-2 rounded-full border border-zinc-200/80 dark:border-white/10 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl flex items-center gap-2 shadow-lg shadow-zinc-900/5 dark:shadow-2xl hover:border-zinc-400 dark:hover:border-white/30 transition-all text-xs font-mono text-zinc-700 dark:text-zinc-300">
                        <Database className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>distributed.systems</span>
                    </div>
                </motion.div>
            </div>

            {/* Editorial Content */}
            <div className="max-w-4xl mx-auto px-4 relative z-10 pt-24 pb-16 text-center">
                <motion.div
                    className="flex flex-col items-center gap-8"
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                >
                    {/* Status badge: OpenAI Editorial Pill */}
                    <motion.div
                        variants={fadeInUp}
                        className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-zinc-300 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/90 backdrop-blur-xl text-xs font-mono tracking-wider text-zinc-700 dark:text-zinc-300 shadow-sm"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                        </span>
                        <span className="uppercase tracking-widest text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">Available For Opportunities</span>
                    </motion.div>

                    {/* Bold Clean Title - OpenAI Pure Luxury */}
                    <motion.div variants={fadeInUp}>
                        <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-zinc-950 dark:text-white tracking-tight leading-[0.92]">
                            {portfolioData.personal.name}
                        </h1>
                    </motion.div>

                    {/* Subtitle */}
                    <motion.div variants={fadeInUp}>
                        <p className="text-lg md:text-2xl font-normal text-zinc-600 dark:text-zinc-400 max-w-2xl px-4 leading-relaxed">
                            {portfolioData.personal.title}
                        </p>
                    </motion.div>

                    {/* Typewriter: Calm Monospace Subline */}
                    <motion.div variants={fadeInUp} className="h-8">
                        <p className="text-sm md:text-base font-mono text-zinc-600 dark:text-zinc-400">
                            <span className="text-cyan-600 dark:text-cyan-400 mr-2">$</span>
                            {displayText}
                            <span
                                className={`inline-block w-[2px] h-4 ml-1 align-middle ${
                                    isDeleting ? 'bg-zinc-400 dark:bg-zinc-600' : 'bg-cyan-600 dark:bg-cyan-400'
                                } animate-pulse`}
                            />
                        </p>
                    </motion.div>

                    {/* CTA Buttons: OpenAI Minimalist Precision */}
                    <motion.div
                        className="flex flex-col items-center gap-6 mt-4"
                        variants={fadeInUp}
                    >
                        <div className="flex flex-col sm:flex-row gap-4 items-center">
                            <MagneticWrapper>
                                <motion.a
                                    href="#projects"
                                    className="px-8 py-3.5 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 rounded-full font-bold text-sm transition-all duration-300 inline-flex items-center gap-2 cursor-pointer shadow-lg shadow-zinc-900/10 dark:shadow-white/5"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    <span>Explore Projects</span>
                                    <ArrowUpRight className="w-4 h-4" />
                                </motion.a>
                            </MagneticWrapper>
                            <MagneticWrapper>
                                <motion.a
                                    href="#contact"
                                    className="px-8 py-3.5 border border-zinc-300 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-900/60 hover:bg-zinc-200 dark:hover:bg-zinc-800/80 hover:border-zinc-400 dark:hover:border-zinc-700 text-zinc-800 dark:text-zinc-200 rounded-full font-bold text-sm transition-all duration-300 inline-flex items-center gap-2 cursor-pointer backdrop-blur-xl"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    <span>Contact Me</span>
                                </motion.a>
                            </MagneticWrapper>
                        </div>

                        {/* Social Icons & Email Copy */}
                        <div className="flex items-center gap-3 mt-1">
                            <MagneticWrapper strength={0.3}>
                                <a
                                    href={portfolioData.personal.socialLinks.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="GitHub Profile"
                                    title="GitHub"
                                    className="w-10 h-10 rounded-full border border-zinc-300 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-all flex items-center justify-center shrink-0 cursor-pointer shadow-sm"
                                >
                                    <Github className="w-4 h-4 shrink-0" />
                                </a>
                            </MagneticWrapper>
                            <MagneticWrapper strength={0.3}>
                                <a
                                    href={portfolioData.personal.socialLinks.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn Profile"
                                    title="LinkedIn"
                                    className="w-10 h-10 rounded-full border border-zinc-300 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-all flex items-center justify-center shrink-0 cursor-pointer shadow-sm"
                                >
                                    <Linkedin className="w-4 h-4 shrink-0" />
                                </a>
                            </MagneticWrapper>
                            <MagneticWrapper strength={0.3}>
                                <button
                                    onClick={handleCopyEmail}
                                    aria-label="Copy email address"
                                    title="Copy email"
                                    className="w-10 h-10 rounded-full border border-zinc-300 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-all flex items-center justify-center shrink-0 cursor-pointer relative shadow-sm"
                                >
                                    <AnimatePresence mode="wait" initial={false}>
                                        {copied ? (
                                            <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center justify-center">
                                                <Check className="w-4 h-4 text-emerald-500" />
                                            </motion.span>
                                        ) : (
                                            <motion.span key="mail" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center justify-center">
                                                <Mail className="w-4 h-4" />
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                    {copied && (
                                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500 text-black shadow-md whitespace-nowrap">
                                            Copied
                                        </span>
                                    )}
                                </button>
                            </MagneticWrapper>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;