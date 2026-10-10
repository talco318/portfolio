import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import { Github, Linkedin, ArrowUpRight, Mail, Check, Terminal, Cpu, Database, Sparkles, ArrowDown } from 'lucide-react';
import { useTypewriter } from '../hooks/useTypewriter';
import { MagneticWrapper } from './MagneticWrapper';
import { ParticleNetworkCanvas } from './ParticleNetworkCanvas';
import { soundFx } from '../utils/soundEffects';

// Multiplane Spatial Dust Motes with distinct Z-depth coordinates
const DUST_MOTES = [
    { id: 1, x: '16%', y: '22%', z: 160, size: 4, speed: 2.2, color: 'bg-cyan-400' },
    { id: 2, x: '84%', y: '16%', z: -200, size: 3, speed: 1.4, color: 'bg-indigo-400' },
    { id: 3, x: '10%', y: '74%', z: 120, size: 5, speed: 2.6, color: 'bg-purple-400' },
    { id: 4, x: '90%', y: '66%', z: -350, size: 3, speed: 1.2, color: 'bg-cyan-300' },
    { id: 5, x: '35%', y: '12%', z: 80, size: 2, speed: 1.8, color: 'bg-white' },
    { id: 6, x: '65%', y: '88%', z: 220, size: 4, speed: 2.8, color: 'bg-indigo-300' },
    { id: 7, x: '42%', y: '76%', z: -150, size: 3, speed: 1.5, color: 'bg-fuchsia-400' },
    { id: 8, x: '78%', y: '32%', z: -400, size: 2, speed: 1.0, color: 'bg-emerald-400' },
    { id: 9, x: '24%', y: '42%', z: 140, size: 3, speed: 2.1, color: 'bg-blue-400' },
    { id: 10, x: '94%', y: '46%', z: -100, size: 4, speed: 1.9, color: 'bg-cyan-400' },
];

export const HeroSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const stageRef = useRef<HTMLDivElement>(null);
    const [copied, setCopied] = useState(false);

    // 1. DYNAMIC TYPEWRITER ENGINE
    const { displayText, isDeleting } = useTypewriter({
        texts: portfolioData.personal.heroTexts,
        typingSpeed: 50,
        deletingSpeed: 30,
        pauseAfterType: 2200,
    });

    const handleCopyEmail = () => {
        soundFx.playChime();
        navigator.clipboard.writeText(portfolioData.personal.email).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2200);
        });
    };

    // 2. SCROLL ENGINE
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 85,
        damping: 18,
        mass: 0.7,
    });

    // 3. MOUSE 3D GYROSCOPE (Ultra-subtle micro tilt to avoid any visual jumps)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const smoothMouseX = useSpring(mouseX, { stiffness: 60, damping: 18 });
    const smoothMouseY = useSpring(mouseY, { stiffness: 60, damping: 18 });

    const chamberRotateY = useTransform(smoothMouseX, [-1, 1], [-3, 3]);
    const chamberRotateX = useTransform(smoothMouseY, [-1, 1], [2.5, -2.5]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!stageRef.current) return;
        const rect = stageRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    // 4. NAME TRUE 3D RECEDE (Hardware-accelerated Z-space without layout jitter)
    const nameZ = useTransform(smoothProgress, [0, 1], [0, -680]);
    const nameY = useTransform(smoothProgress, [0, 1], [0, -90]);
    const nameRotateX = useTransform(smoothProgress, [0, 1], [0, 16]);
    const nameScale = useTransform(smoothProgress, [0, 0.7, 1], [1, 0.88, 0.74]);
    const nameOpacity = useTransform(smoothProgress, [0, 0.8, 1], [1, 0.65, 0.05]);

    // Subtitle & Status Pill in 3D
    const subtitleZ = useTransform(smoothProgress, [0, 1], [0, -320]);
    const subtitleY = useTransform(smoothProgress, [0, 1], [0, -60]);
    const subtitleOpacity = useTransform(smoothProgress, [0, 0.45, 1], [1, 0.4, 0]);

    // 5. BADGES POPOUT IN POSITIVE Z-SPACE (Comes forward towards the camera!)
    // Top Left: python.core (pops forward Z: +160px while moving left & up)
    const badge1X = useTransform(smoothProgress, [0, 1], [0, -260]);
    const badge1Y = useTransform(smoothProgress, [0, 1], [0, -180]);
    const badge1Z = useTransform(smoothProgress, [0, 0.6, 1], [0, 160, 60]);
    const badge1RotateX = useTransform(smoothProgress, [0, 1], [0, -16]);
    const badge1RotateY = useTransform(smoothProgress, [0, 1], [0, 24]);
    const badge1RotateZ = useTransform(smoothProgress, [0, 1], [0, -14]);
    const badge1Opacity = useTransform(smoothProgress, [0, 0.85, 1], [1, 0.8, 0.1]);

    // Top Right: react.ts (pops forward Z: +140px while moving right & up)
    const badge2X = useTransform(smoothProgress, [0, 1], [0, 260]);
    const badge2Y = useTransform(smoothProgress, [0, 1], [0, -150]);
    const badge2Z = useTransform(smoothProgress, [0, 0.6, 1], [0, 140, 50]);
    const badge2RotateX = useTransform(smoothProgress, [0, 1], [0, 18]);
    const badge2RotateY = useTransform(smoothProgress, [0, 1], [0, -22]);
    const badge2RotateZ = useTransform(smoothProgress, [0, 1], [0, 16]);
    const badge2Opacity = useTransform(smoothProgress, [0, 0.85, 1], [1, 0.8, 0.1]);

    // Bottom Left: ai.agents (pops forward Z: +170px while moving left & down)
    const badge3X = useTransform(smoothProgress, [0, 1], [0, -280]);
    const badge3Y = useTransform(smoothProgress, [0, 1], [0, 190]);
    const badge3Z = useTransform(smoothProgress, [0, 0.6, 1], [0, 170, 70]);
    const badge3RotateX = useTransform(smoothProgress, [0, 1], [0, 20]);
    const badge3RotateY = useTransform(smoothProgress, [0, 1], [0, 16]);
    const badge3RotateZ = useTransform(smoothProgress, [0, 1], [0, 10]);
    const badge3Opacity = useTransform(smoothProgress, [0, 0.85, 1], [1, 0.8, 0.1]);

    // Bottom Right: distributed.systems (pops forward Z: +160px while moving right & down)
    const badge4X = useTransform(smoothProgress, [0, 1], [0, 280]);
    const badge4Y = useTransform(smoothProgress, [0, 1], [0, 210]);
    const badge4Z = useTransform(smoothProgress, [0, 0.6, 1], [0, 160, 60]);
    const badge4RotateX = useTransform(smoothProgress, [0, 1], [0, -18]);
    const badge4RotateY = useTransform(smoothProgress, [0, 1], [0, -18]);
    const badge4RotateZ = useTransform(smoothProgress, [0, 1], [0, -12]);
    const badge4Opacity = useTransform(smoothProgress, [0, 0.85, 1], [1, 0.8, 0.1]);

    // 6. 3D PERSPECTIVE HORIZON GRID FLOOR
    const gridZ = useTransform(smoothProgress, [0, 1], [0, -200]);
    const gridY = useTransform(smoothProgress, [0, 1], [220, 150]);
    const gridOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.12, 0.35, 0.05]);

    // 7. ATMOSPHERIC HALO SPREAD
    const haloScale = useTransform(smoothProgress, [0, 1], [1, 1.7]);
    const haloOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.2, 0.45, 0.06]);

    return (
        <section
            ref={containerRef}
            className="relative min-h-[200vh] bg-background text-zinc-900 dark:text-white transition-colors duration-500"
        >
            {/* STICKY ZERO-G SPACE STAGE WITH 3D PERSPECTIVE (1200px) */}
            <div
                ref={stageRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 select-none"
                style={{ perspective: '1200px' }}
            >
                {/* 1. ORIGINAL CELESTIAL PARTICLE NETWORK CANVAS */}
                <ParticleNetworkCanvas />

                {/* 2. Deep Nebula Atmospheric Light Wells */}
                <motion.div
                    style={{ scale: haloScale, opacity: haloOpacity }}
                    className="absolute w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-cyan-500/20 via-indigo-600/25 to-fuchsia-600/20 filter blur-[150px] pointer-events-none"
                />

                {/* 3. 3D Receding Horizon Grid Plane (Floor in deep perspective) */}
                <motion.div
                    style={{
                        y: gridY,
                        z: gridZ,
                        opacity: gridOpacity,
                        rotateX: 75,
                        transformStyle: 'preserve-3d',
                    }}
                    className="absolute inset-x-0 bottom-0 h-[450px] pointer-events-none origin-bottom"
                >
                    <div
                        className="w-full h-full"
                        style={{
                            backgroundImage: `linear-gradient(to right, #6366f1 1px, transparent 1px), linear-gradient(to bottom, #6366f1 1px, transparent 1px)`,
                            backgroundSize: '48px 48px',
                            maskImage: 'linear-gradient(to top, rgba(0,0,0,0.8) 10%, transparent 85%)',
                            WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.8) 10%, transparent 85%)',
                        }}
                    />
                </motion.div>

                {/* 4. 3D HOLOGRAPHIC GYROSCOPE STAGE */}
                <motion.div
                    style={{
                        rotateX: chamberRotateX,
                        rotateY: chamberRotateY,
                        transformStyle: 'preserve-3d',
                    }}
                    className="relative w-full h-full flex flex-col items-center justify-center pointer-events-none"
                >
                    {/* MULTIPLANE SPATIAL DUST PARTICULATES */}
                    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden" style={{ transformStyle: 'preserve-3d' }}>
                        {DUST_MOTES.map((mote) => {
                            const moteY = useTransform(smoothProgress, [0, 1], [0, -mote.speed * 220]);
                            const moteOpacity = useTransform(smoothProgress, [0, 0.6, 1], [0.4, 0.9, 0.1]);

                            return (
                                <motion.div
                                    key={mote.id}
                                    style={{
                                        left: mote.x,
                                        top: mote.y,
                                        y: moteY,
                                        z: mote.z,
                                        opacity: moteOpacity,
                                        width: mote.size,
                                        height: mote.size,
                                        transformStyle: 'preserve-3d',
                                    }}
                                    className={`absolute rounded-full ${mote.color} blur-[0.5px] shadow-[0_0_8px_currentColor]`}
                                />
                            );
                        })}
                    </div>

                    {/* INTERACTIVE DRAGGABLE BADGES IN 3D SPACE (+160px FORWARD POPOUT) */}
                    <div className="hidden lg:block absolute inset-0 pointer-events-none max-w-5xl mx-auto z-20" style={{ transformStyle: 'preserve-3d' }}>
                        {/* Top Left: python.core */}
                        <motion.div
                            drag
                            dragConstraints={{ left: -120, right: 120, top: -120, bottom: 120 }}
                            dragElastic={0.4}
                            whileDrag={{ scale: 1.15, cursor: 'grabbing' }}
                            onDragStart={() => soundFx.playPop(520, 0.04)}
                            style={{
                                x: badge1X,
                                y: badge1Y,
                                z: badge1Z,
                                rotateX: badge1RotateX,
                                rotateY: badge1RotateY,
                                rotateZ: badge1RotateZ,
                                opacity: badge1Opacity,
                                transformStyle: 'preserve-3d',
                            }}
                            className="absolute top-[26%] left-[8%] sm:left-[12%] pointer-events-auto cursor-grab"
                        >
                            <div className="px-4 py-2 rounded-full border border-cyan-400/40 bg-white/80 dark:bg-zinc-950/90 backdrop-blur-2xl flex items-center gap-2.5 shadow-[0_15px_35px_rgba(0,0,0,0.1),0_0_20px_rgba(34,211,238,0.25)] text-xs font-mono text-cyan-600 dark:text-cyan-300 hover:border-cyan-400 transition-colors">
                                <Terminal className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
                                <span className="font-semibold">python.core</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                            </div>
                        </motion.div>

                        {/* Top Right: react.ts */}
                        <motion.div
                            drag
                            dragConstraints={{ left: -120, right: 120, top: -120, bottom: 120 }}
                            dragElastic={0.4}
                            whileDrag={{ scale: 1.15, cursor: 'grabbing' }}
                            onDragStart={() => soundFx.playPop(560, 0.04)}
                            style={{
                                x: badge2X,
                                y: badge2Y,
                                z: badge2Z,
                                rotateX: badge2RotateX,
                                rotateY: badge2RotateY,
                                rotateZ: badge2RotateZ,
                                opacity: badge2Opacity,
                                transformStyle: 'preserve-3d',
                            }}
                            className="absolute top-[24%] right-[8%] sm:right-[12%] pointer-events-auto cursor-grab"
                        >
                            <div className="px-4 py-2 rounded-full border border-indigo-400/40 bg-white/80 dark:bg-zinc-950/90 backdrop-blur-2xl flex items-center gap-2.5 shadow-[0_15px_35px_rgba(0,0,0,0.1),0_0_20px_rgba(99,102,241,0.25)] text-xs font-mono text-indigo-600 dark:text-indigo-300 hover:border-indigo-400 transition-colors">
                                <Cpu className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                                <span className="font-semibold">react.ts</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
                            </div>
                        </motion.div>

                        {/* Bottom Left: ai.agents */}
                        <motion.div
                            drag
                            dragConstraints={{ left: -120, right: 120, top: -120, bottom: 120 }}
                            dragElastic={0.4}
                            whileDrag={{ scale: 1.15, cursor: 'grabbing' }}
                            onDragStart={() => soundFx.playPop(600, 0.04)}
                            style={{
                                x: badge3X,
                                y: badge3Y,
                                z: badge3Z,
                                rotateX: badge3RotateX,
                                rotateY: badge3RotateY,
                                rotateZ: badge3RotateZ,
                                opacity: badge3Opacity,
                                transformStyle: 'preserve-3d',
                            }}
                            className="absolute bottom-[28%] left-[10%] sm:left-[14%] pointer-events-auto cursor-grab"
                        >
                            <div className="px-4 py-2 rounded-full border border-purple-400/40 bg-white/80 dark:bg-zinc-950/90 backdrop-blur-2xl flex items-center gap-2.5 shadow-[0_15px_35px_rgba(0,0,0,0.1),0_0_20px_rgba(192,132,252,0.25)] text-xs font-mono text-purple-600 dark:text-purple-300 hover:border-purple-400 transition-colors">
                                <Sparkles className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400" />
                                <span className="font-semibold">ai.agents</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
                            </div>
                        </motion.div>

                        {/* Bottom Right: distributed.systems */}
                        <motion.div
                            drag
                            dragConstraints={{ left: -120, right: 120, top: -120, bottom: 120 }}
                            dragElastic={0.4}
                            whileDrag={{ scale: 1.15, cursor: 'grabbing' }}
                            onDragStart={() => soundFx.playPop(640, 0.04)}
                            style={{
                                x: badge4X,
                                y: badge4Y,
                                z: badge4Z,
                                rotateX: badge4RotateX,
                                rotateY: badge4RotateY,
                                rotateZ: badge4RotateZ,
                                opacity: badge4Opacity,
                                transformStyle: 'preserve-3d',
                            }}
                            className="absolute bottom-[30%] right-[10%] sm:right-[14%] pointer-events-auto cursor-grab"
                        >
                            <div className="px-4 py-2 rounded-full border border-emerald-400/40 bg-white/80 dark:bg-zinc-950/90 backdrop-blur-2xl flex items-center gap-2.5 shadow-[0_15px_35px_rgba(0,0,0,0.1),0_0_20px_rgba(52,211,153,0.25)] text-xs font-mono text-emerald-600 dark:text-emerald-300 hover:border-emerald-400 transition-colors">
                                <Database className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                                <span className="font-semibold">distributed.systems</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                            </div>
                        </motion.div>
                    </div>

                    {/* HERO CORE CONTENT (RECEDES INTO Z: -680px) */}
                    <div className="max-w-4xl mx-auto text-center relative z-10 px-4" style={{ transformStyle: 'preserve-3d' }}>
                        {/* Status Badge */}
                        <motion.div
                            style={{
                                y: subtitleY,
                                z: subtitleZ,
                                opacity: subtitleOpacity,
                                transformStyle: 'preserve-3d',
                            }}
                            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-zinc-300 dark:border-white/10 bg-white/80 dark:bg-zinc-900/90 backdrop-blur-xl text-xs font-mono text-zinc-700 dark:text-zinc-300 mb-6 shadow-sm"
                        >
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                            <span className="uppercase tracking-widest text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
                                Available For Opportunities
                            </span>
                            <span className="text-zinc-400 dark:text-zinc-600">•</span>
                            <span className="text-zinc-500 dark:text-zinc-400 text-[11px]">2026 Edition</span>
                        </motion.div>

                        {/* NAME WITH TRUE 3D RECEDE (-680px) & 3D ROTATION */}
                        <motion.div
                            style={{
                                z: nameZ,
                                y: nameY,
                                rotateX: nameRotateX,
                                scale: nameScale,
                                opacity: nameOpacity,
                                transformStyle: 'preserve-3d',
                                willChange: 'transform',
                            }}
                        >
                            <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-zinc-950 dark:text-white tracking-tight leading-[0.92] select-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.4)] dark:drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
                                {portfolioData.personal.name}
                            </h1>
                        </motion.div>

                        {/* Subtitle, Typewriter & Actions */}
                        <motion.div
                            style={{
                                y: subtitleY,
                                z: subtitleZ,
                                opacity: subtitleOpacity,
                                transformStyle: 'preserve-3d',
                            }}
                            className="mt-6 space-y-4"
                        >
                            <p className="text-lg md:text-2xl font-normal text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                                {portfolioData.personal.title}
                            </p>

                            {/* Typewriter: Animated Monospace Changing Texts */}
                            <div className="h-8 flex items-center justify-center">
                                <p className="text-sm md:text-base font-mono text-zinc-700 dark:text-zinc-300">
                                    <span className="text-cyan-600 dark:text-cyan-400 mr-2">$</span>
                                    {displayText}
                                    <span
                                        className={`inline-block w-[2px] h-4 ml-1 align-middle ${
                                            isDeleting ? 'bg-zinc-400 dark:bg-zinc-600' : 'bg-cyan-600 dark:bg-cyan-400'
                                        } animate-pulse`}
                                    />
                                </p>
                            </div>

                            {/* CTA Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-2 pointer-events-auto">
                                <MagneticWrapper>
                                    <motion.a
                                        href="#projects"
                                        onClick={() => soundFx.playClick()}
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
                                        onClick={() => soundFx.playClick()}
                                        className="px-8 py-3.5 border border-zinc-300 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-900/60 hover:bg-zinc-200 dark:hover:bg-zinc-800/80 hover:border-zinc-400 dark:hover:border-zinc-700 text-zinc-800 dark:text-zinc-200 rounded-full font-bold text-sm transition-all duration-300 inline-flex items-center gap-2 cursor-pointer backdrop-blur-xl"
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                    >
                                        <span>Contact Me</span>
                                    </motion.a>
                                </MagneticWrapper>
                            </div>

                            {/* Social Icons & Email Copy */}
                            <div className="flex items-center justify-center gap-3 mt-4 pointer-events-auto">
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
                    </div>
                </motion.div>

                {/* SCROLL HELPER HINT */}
                <motion.div
                    style={{ opacity: subtitleOpacity }}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-zinc-400 dark:text-zinc-500 font-mono text-xs z-30 pointer-events-none"
                >
                    <span className="animate-pulse">Scroll to explore</span>
                    <ArrowDown className="w-4 h-4 animate-bounce text-indigo-500 dark:text-indigo-400" />
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;