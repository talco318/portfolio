import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, GithubIcon, Activity, Image as ImageIcon } from 'lucide-react';
import { HolographicTiltCard } from './HolographicTiltCard';
import { ProjectLiveSimulation } from './ProjectLiveSimulation';
import { Project } from '../data/portfolio';
import { soundFx } from '../utils/soundEffects';

interface StackingProjectCardProps {
    project: Project;
    index: number;
    total: number;
    isSimActive: boolean;
    onToggleSim: () => void;
}

export const StackingProjectCard: React.FC<StackingProjectCardProps> = ({
    project,
    index,
    total,
    isSimActive,
    onToggleSim,
}) => {
    const cardRef = useRef<HTMLDivElement>(null);

    // Track scroll progress as this card reaches sticky top and the next card covers it
    const isLast = index === total - 1;
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ['start start', 'end start'],
    });

    // Subtly scale and fade out previous cards as the next card slides completely over it
    const scale = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.96]);
    const opacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 0.8, isLast ? 1 : 0]);
    const brightness = useTransform(scrollYProgress, [0, 0.8], [1, isLast ? 1 : 0.88]);

    // Uniform sticky position so every incoming card lands directly on top and fully covers the previous one
    const stickyTop = '5.5rem';

    return (
        <div
            ref={cardRef}
            className="sticky pb-[22vh] last:pb-8"
            style={{
                top: stickyTop,
                zIndex: index + 10,
            }}
        >
            <motion.div
                style={{
                    scale,
                    opacity,
                    filter: useTransform(brightness, (b) => `brightness(${b})`),
                    transformOrigin: 'top center',
                    willChange: 'transform, opacity',
                }}
                className="relative rounded-3xl shadow-[0_-12px_40px_-5px_rgba(0,0,0,0.7)]"
            >
                <HolographicTiltCard
                    enableTilt={true}
                    enableLaserBorder={true}
                    className="border border-zinc-700/80 dark:border-zinc-800 bg-[#161720] dark:bg-[#0c0d14] flex flex-col justify-between overflow-hidden"
                >
                    <div>
                        {/* Frame Header with Simulation Switch */}
                        <div className="relative overflow-hidden bg-[#111217] dark:bg-zinc-950 border-b border-zinc-700/60 dark:border-zinc-800/60">
                            {isSimActive ? (
                                <div className="p-1">
                                    <ProjectLiveSimulation
                                        projectName={project.title}
                                        techStack={project.technologies}
                                    />
                                </div>
                            ) : (
                                <div className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={`Screenshot of ${project.title}`}
                                        loading="lazy"
                                        decoding="async"
                                        width={800}
                                        height={450}
                                        className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-103"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#161720] via-transparent to-transparent pointer-events-none" />
                                </div>
                            )}

                            {/* Top Control Bar: Index Chip & Simulation Toggle */}
                            <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-auto">
                                <span className="px-3 py-1 rounded-md text-xs font-mono tracking-wider font-bold text-white bg-black/80 backdrop-blur-md border border-white/20 shadow-md">
                                    CARD 0{index + 1} / 0{total} • {project.category.toUpperCase()}
                                </span>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onToggleSim();
                                    }}
                                    title={isSimActive ? "Show screenshot" : "Launch live telemetry simulation"}
                                    className={`px-3.5 py-1 rounded-full text-xs font-mono flex items-center gap-1.5 backdrop-blur-md transition-all cursor-pointer border shadow-lg ${
                                        isSimActive
                                            ? 'bg-indigo-600/90 text-white border-indigo-400 font-bold'
                                            : 'bg-black/70 hover:bg-black/90 text-zinc-300 hover:text-white border-white/15'
                                    }`}
                                >
                                    {isSimActive ? (
                                        <>
                                            <ImageIcon className="w-3.5 h-3.5" />
                                            <span>Show Image</span>
                                        </>
                                    ) : (
                                        <>
                                            <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                                            <span>⚡ Live Sim</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Editorial Content */}
                        <div className="p-6 sm:p-8">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
                                <h3 className="font-heading text-2xl sm:text-3xl font-black text-white tracking-tight">
                                    {project.title}
                                </h3>
                                <div className="flex flex-wrap gap-1.5">
                                    {project.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-2.5 py-1 rounded-md text-xs font-mono text-zinc-300 dark:text-zinc-400 bg-white/5 border border-white/10"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <p className="text-zinc-300 dark:text-zinc-400 text-sm sm:text-base leading-relaxed font-normal max-w-3xl">
                                {project.description}
                            </p>
                        </div>
                    </div>

                    {/* Action Bar */}
                    <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0 flex items-center gap-4 border-t border-zinc-700/60 dark:border-zinc-800/50 pt-4 mt-2">
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => soundFx.playClick()}
                                aria-label={`View live deployment for ${project.title}`}
                                className="group/btn inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-cyan-400 transition-colors cursor-pointer"
                            >
                                <span>Live Deployment</span>
                                <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                            </a>
                        )}
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => soundFx.playClick()}
                                aria-label={`View GitHub repository for ${project.title}`}
                                className="group/btn inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-300 dark:text-zinc-400 hover:text-white transition-colors cursor-pointer ml-auto"
                            >
                                <GithubIcon className="w-4 h-4" />
                                <span>Repository</span>
                                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                            </a>
                        )}
                    </div>
                </HolographicTiltCard>
            </motion.div>
        </div>
    );
};
