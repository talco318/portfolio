import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Layers, Cpu, Database, Eye, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

export const CinemaShowcase = () => {
    const [isExploded, setIsExploded] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    // Mouse coordinates for 3D rotation
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 220 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const rotateX = useTransform(springY, [-300, 300], [14, -14]);
    const rotateY = useTransform(springX, [-300, 300], [-18, 18]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const offsetX = e.clientX - (rect.left + rect.width / 2);
        const offsetY = e.clientY - (rect.top + rect.height / 2);
        mouseX.set(offsetX);
        mouseY.set(offsetY);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    const toggleExplode = () => {
        soundFx.playChime();
        setIsExploded(!isExploded);
    };

    return (
        <section
            id="architecture-showcase"
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative py-20 md:py-32 overflow-hidden bg-background text-zinc-900 dark:text-white transition-colors duration-500"
        >
            {/* Cinematic Background Atmosphere */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-indigo-600/10 via-cyan-500/10 to-purple-600/10 rounded-full blur-[160px]" />
                <div
                    className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
                        backgroundSize: '40px 40px',
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header Badge & Title */}
                <div className="flex flex-col items-center text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs font-mono text-indigo-400 mb-4"
                    >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>SPATIAL ARCHITECTURE BREAKDOWN</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="font-heading text-4xl sm:text-5xl md:text-6xl font-black tracking-tight"
                    >
                        Flagship Engineering <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 text-transparent bg-clip-text">In 3D Depth</span>
                    </motion.h2>

                    <p className="mt-4 text-zinc-600 dark:text-zinc-400 max-w-xl text-sm md:text-base leading-relaxed">
                        An interactive exploded breakdown of the multi-tier architecture powering Universal IDE RTL & autonomous AI engines.
                    </p>

                    {/* Explode / Assemble Mode Switch */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mt-6 flex items-center gap-3"
                    >
                        <button
                            onClick={toggleExplode}
                            className="px-5 py-2.5 rounded-full border border-indigo-500/40 bg-zinc-900/90 dark:bg-white text-white dark:text-zinc-950 font-mono text-xs font-bold flex items-center gap-2 shadow-xl shadow-indigo-500/10 hover:scale-105 transition-all cursor-pointer"
                        >
                            <Layers className="w-4 h-4 text-cyan-400 dark:text-indigo-600" />
                            <span>{isExploded ? 'ASSEMBLE SYSTEM' : 'EXPLODE ARCHITECTURE'}</span>
                        </button>
                        <span className="text-xs font-mono text-zinc-500 hidden sm:inline">
                            [Move mouse to rotate 3D perspective]
                        </span>
                    </motion.div>
                </div>

                {/* 3D Exploded Stage */}
                <div style={{ perspective: 1400 }} className="relative w-full max-w-4xl mx-auto min-h-[460px] md:min-h-[520px] flex items-center justify-center">
                    <motion.div
                        style={{
                            rotateX,
                            rotateY,
                            transformStyle: 'preserve-3d',
                        }}
                        className="relative w-full max-w-2xl transition-transform duration-100"
                    >
                        {/* LAYER 1: UI & BiDi Engine (Upper Layer) */}
                        <motion.div
                            animate={{
                                transform: isExploded
                                    ? 'translateZ(120px) translateY(-70px)'
                                    : 'translateZ(10px) translateY(0px)',
                            }}
                            transition={{ type: 'spring', damping: 20, stiffness: 180 }}
                            className="relative w-full rounded-2xl md:rounded-3xl border border-cyan-500/40 bg-white/80 dark:bg-zinc-900/85 backdrop-blur-2xl p-6 md:p-8 shadow-2xl shadow-cyan-500/10 mb-4 cursor-pointer hover:border-cyan-400 transition-colors"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
                                        <Eye className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-[11px] font-mono font-bold text-cyan-500 dark:text-cyan-400 uppercase tracking-widest">
                                            LAYER 01 / SURFACE & INTERFACE
                                        </div>
                                        <h3 className="font-heading text-lg md:text-xl font-bold text-zinc-950 dark:text-white">
                                            Universal BiDi IDE & Syntax Engine
                                        </h3>
                                    </div>
                                </div>
                                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-xs font-mono font-bold">
                                    6.7K+ Global Devs
                                </span>
                            </div>
                            <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                                Zero-latency Hebrew/Arabic bidirectional cursor virtualization, Unicode paragraph level analysis, and Monaco Editor layout synchronization.
                            </p>
                        </motion.div>

                        {/* LAYER 2: Neural Core & Logic (Middle Layer) */}
                        <motion.div
                            animate={{
                                transform: isExploded
                                    ? 'translateZ(20px) translateY(0px)'
                                    : 'translateZ(0px) translateY(0px)',
                            }}
                            transition={{ type: 'spring', damping: 20, stiffness: 180, delay: 0.05 }}
                            className="relative w-full rounded-2xl md:rounded-3xl border border-indigo-500/40 bg-white/85 dark:bg-[#13141f]/90 backdrop-blur-2xl p-6 md:p-8 shadow-2xl shadow-indigo-500/15 mb-4 cursor-pointer hover:border-indigo-400 transition-colors"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                                        <Cpu className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-[11px] font-mono font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-widest">
                                            LAYER 02 / REASONING & PIPELINE
                                        </div>
                                        <h3 className="font-heading text-lg md:text-xl font-bold text-zinc-950 dark:text-white">
                                            Autonomous Agent & AST Orchestrator
                                        </h3>
                                    </div>
                                </div>
                                <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-mono font-bold">
                                    &lt;10ms P99
                                </span>
                            </div>
                            <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                                Multi-turn agent loop with vector memory recall, dynamic function dispatching, and semantic code AST parsing for high-throughput automated decision workflows.
                            </p>
                        </motion.div>

                        {/* LAYER 3: Infrastructure & Distributed Core (Deep Foundation) */}
                        <motion.div
                            animate={{
                                transform: isExploded
                                    ? 'translateZ(-80px) translateY(70px)'
                                    : 'translateZ(-10px) translateY(0px)',
                            }}
                            transition={{ type: 'spring', damping: 20, stiffness: 180, delay: 0.1 }}
                            className="relative w-full rounded-2xl md:rounded-3xl border border-purple-500/40 bg-white/90 dark:bg-[#0c0d15]/95 backdrop-blur-2xl p-6 md:p-8 shadow-2xl shadow-purple-500/15 cursor-pointer hover:border-purple-400 transition-colors"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500 border border-purple-500/20">
                                        <Database className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-[11px] font-mono font-bold text-purple-500 dark:text-purple-400 uppercase tracking-widest">
                                            LAYER 03 / KERNEL & RUNTIME
                                        </div>
                                        <h3 className="font-heading text-lg md:text-xl font-bold text-zinc-950 dark:text-white">
                                            High-Performance Cloud & Microservices
                                        </h3>
                                    </div>
                                </div>
                                <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-mono font-bold">
                                    100% Integrity
                                </span>
                            </div>
                            <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                                Edge distributed deployment, immutable telemetry logging, high-concurrency event emitters, and zero-downtime containerized service mesh.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
