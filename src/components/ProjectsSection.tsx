import { portfolioData } from '../data/portfolio';
import { ArrowUpRight, GithubIcon, Activity, Image as ImageIcon, Layers, LayoutGrid } from "lucide-react";
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HolographicTiltCard } from './HolographicTiltCard';
import { ProjectLiveSimulation } from './ProjectLiveSimulation';
import { StackingProjectCard } from './StackingProjectCard';
import { KineticVelocityContainer } from './KineticVelocityContainer';
import { soundFx } from '../utils/soundEffects';

export const ProjectsSection = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [viewMode, setViewMode] = useState<'stack' | 'grid'>('stack');

    // Stores which project IDs currently have "Live Simulation" active
    const [simActiveMap, setSimActiveMap] = useState<Record<string, boolean>>({
        '1': true,
    });

    // Extract unique categories
    const categories = useMemo(() => {
        const cats = Array.from(new Set(portfolioData.projects.map((p) => p.category)));
        return ['All', ...cats];
    }, []);

    // Calculate count per category
    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = { All: portfolioData.projects.length };
        portfolioData.projects.forEach((p) => {
            counts[p.category] = (counts[p.category] || 0) + 1;
        });
        return counts;
    }, []);

    // Filter projects based on selected category
    const filteredProjects = useMemo(() => {
        if (selectedCategory === 'All') return portfolioData.projects;
        return portfolioData.projects.filter((p) => p.category === selectedCategory);
    }, [selectedCategory]);

    const toggleSimulation = (projectId: string) => {
        soundFx.playChime();
        setSimActiveMap((prev) => ({
            ...prev,
            [projectId]: !prev[projectId],
        }));
    };

    return (
        <section id="projects" className="relative py-12 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Framed Luxury Darkroom Showcase Capsule */}
                <div className="relative rounded-3xl md:rounded-[2.5rem] border border-zinc-700/60 dark:border-white/10 bg-gradient-to-b from-[#22242c] via-[#1a1b22] to-[#22242c] dark:from-[#0c0d14] dark:via-[#09090d] dark:to-[#0c0d14] text-white p-6 sm:p-10 md:p-16 shadow-2xl shadow-zinc-900/15 dark:shadow-black/70">
                    {/* Subtle Ethereal Ambient Radial Light */}
                    <div className="absolute -top-32 -right-32 w-96 h-96 bg-cyan-500/15 dark:bg-cyan-500/10 rounded-full filter blur-[140px] pointer-events-none" />
                    <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-500/15 dark:bg-indigo-500/10 rounded-full filter blur-[140px] pointer-events-none" />

                    <div className="relative z-10">
                        {/* Header */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16 border-b border-zinc-700/60 dark:border-zinc-800/80 pb-8">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-700/80 dark:border-zinc-800 bg-zinc-800/70 dark:bg-zinc-900/60 text-xs font-mono text-zinc-300 dark:text-zinc-400 mb-4">
                                    <span>INDEX / RESEARCH & SYSTEMS</span>
                                </div>
                                <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
                                    Selected Works
                                </h2>
                            </div>

                            <p className="text-sm md:text-base text-zinc-300 dark:text-zinc-400 max-w-md font-normal leading-relaxed">
                                A curated catalog of full-stack platforms, autonomous agents, and engineering infrastructure.
                            </p>
                        </div>

                        {/* Top Controls: Filter Pills & View Mode Switcher */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
                            {/* Filter Pills */}
                            <div className="flex flex-wrap items-center gap-2">
                                {categories.map((cat) => {
                                    const isSelected = selectedCategory === cat;
                                    const count = categoryCounts[cat] || 0;
                                    return (
                                        <button
                                            key={cat}
                                            onClick={() => {
                                                soundFx.playWhoosh();
                                                setSelectedCategory(cat);
                                            }}
                                            aria-label={`Filter projects by category: ${cat}`}
                                            className={`relative px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-200 cursor-pointer ${
                                                isSelected
                                                    ? 'bg-white text-zinc-950 font-semibold shadow-md'
                                                    : 'border border-zinc-700 dark:border-zinc-800 bg-zinc-800/60 dark:bg-zinc-900/40 text-zinc-300 dark:text-zinc-400 hover:text-white hover:border-zinc-500 dark:hover:border-zinc-700'
                                            }`}
                                        >
                                            <span className="flex items-center gap-2">
                                                <span>{cat}</span>
                                                <span className={`text-[10px] ${isSelected ? 'text-zinc-600' : 'text-zinc-400'}`}>
                                                    [{count}]
                                                </span>
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* View Mode Toggle: Stacking Deck vs Grid */}
                            <div className="flex items-center gap-1.5 p-1 rounded-full border border-zinc-700 bg-zinc-800/80 backdrop-blur-md self-start sm:self-auto">
                                <button
                                    onClick={() => {
                                        soundFx.playPop(560, 0.04);
                                        setViewMode('stack');
                                    }}
                                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                                        viewMode === 'stack'
                                            ? 'bg-white text-zinc-950 font-bold shadow-md'
                                            : 'text-zinc-400 hover:text-white'
                                    }`}
                                >
                                    <Layers className="w-3.5 h-3.5" />
                                    <span>Stack Deck</span>
                                </button>
                                <button
                                    onClick={() => {
                                        soundFx.playPop(560, 0.04);
                                        setViewMode('grid');
                                    }}
                                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                                        viewMode === 'grid'
                                            ? 'bg-white text-zinc-950 font-bold shadow-md'
                                            : 'text-zinc-400 hover:text-white'
                                    }`}
                                >
                                    <LayoutGrid className="w-3.5 h-3.5" />
                                    <span>Grid</span>
                                </button>
                            </div>
                        </div>

                        {/* MODE 1: THE STACKING DECK (Linear / Apple style) */}
                        {viewMode === 'stack' ? (
                            <div className="relative pb-24">
                                {filteredProjects.map((project, index) => (
                                    <StackingProjectCard
                                        key={project.id}
                                        project={project}
                                        index={index}
                                        total={filteredProjects.length}
                                        isSimActive={Boolean(simActiveMap[project.id])}
                                        onToggleSim={() => toggleSimulation(project.id)}
                                    />
                                ))}
                            </div>
                        ) : (
                            /* MODE 2: CLASSIC GRID WITH VELOCITY INERTIA */
                            <KineticVelocityContainer>
                                <motion.div 
                                    layout
                                    className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
                                >
                                    <AnimatePresence mode="popLayout">
                                        {filteredProjects.map((project, index) => {
                                            const isSimActive = Boolean(simActiveMap[project.id]);

                                            return (
                                                <motion.div
                                                    layout
                                                    key={project.id}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, scale: 0.98 }}
                                                    transition={{ duration: 0.35 }}
                                                >
                                                    <HolographicTiltCard
                                                        enableTilt={true}
                                                        enableLaserBorder={true}
                                                        className="group border border-zinc-700/60 dark:border-zinc-800/80 bg-[#161720]/90 dark:bg-zinc-900/40 hover:bg-[#161720] dark:hover:bg-zinc-900/70 transition-all duration-500 flex flex-col justify-between h-full"
                                                    >
                                                        <div>
                                                            {/* Frame Header with Simulation Switch */}
                                                            <div className="relative overflow-hidden bg-[#111217] dark:bg-zinc-950 border-b border-zinc-700/60 dark:border-zinc-800/60">
                                                                <AnimatePresence mode="wait">
                                                                    {isSimActive ? (
                                                                        <motion.div
                                                                            key="sim"
                                                                            initial={{ opacity: 0, scale: 0.96 }}
                                                                            animate={{ opacity: 1, scale: 1 }}
                                                                            exit={{ opacity: 0, scale: 0.96 }}
                                                                            transition={{ duration: 0.25 }}
                                                                        >
                                                                            <ProjectLiveSimulation
                                                                                projectName={project.title}
                                                                                techStack={project.technologies}
                                                                            />
                                                                        </motion.div>
                                                                    ) : (
                                                                        <motion.div
                                                                            key="image"
                                                                            initial={{ opacity: 0 }}
                                                                            animate={{ opacity: 1 }}
                                                                            exit={{ opacity: 0 }}
                                                                            transition={{ duration: 0.25 }}
                                                                            className="relative aspect-[16/10]"
                                                                        >
                                                                            <img
                                                                                src={project.image}
                                                                                alt={`Screenshot of ${project.title}`}
                                                                                loading="lazy"
                                                                                decoding="async"
                                                                                width={600}
                                                                                height={375}
                                                                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                                                                            />
                                                                            <div className="absolute inset-0 bg-gradient-to-t from-[#161720]/90 dark:from-zinc-950/80 via-transparent to-transparent pointer-events-none" />
                                                                        </motion.div>
                                                                    )}
                                                                </AnimatePresence>

                                                                {/* Top Control Bar */}
                                                                <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-auto">
                                                                    <span className="px-2.5 py-1 rounded-md text-[11px] font-mono tracking-wider font-semibold text-zinc-200 dark:text-zinc-300 bg-black/60 backdrop-blur-md border border-white/10">
                                                                        0{index + 1} • {project.category.toUpperCase()}
                                                                    </span>

                                                                    <button
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            toggleSimulation(project.id);
                                                                        }}
                                                                        title={isSimActive ? "Switch to screenshot" : "Launch live telemetry simulation"}
                                                                        className={`px-3 py-1 rounded-full text-[11px] font-mono flex items-center gap-1.5 backdrop-blur-md transition-all cursor-pointer border shadow-lg ${
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

                                                            {/* Content */}
                                                            <div className="p-7 md:p-8">
                                                                <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight group-hover:text-zinc-100 transition-colors">
                                                                    {project.title}
                                                                </h3>
                                                                <p className="text-zinc-300 dark:text-zinc-400 text-sm md:text-base leading-relaxed mb-6 font-normal">
                                                                    {project.description}
                                                                </p>

                                                                <div className="flex flex-wrap gap-2 mb-2">
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
                                                        </div>

                                                        {/* Action Bar */}
                                                        <div className="px-7 pb-7 md:px-8 md:pb-8 pt-0 flex items-center gap-4 border-t border-zinc-700/60 dark:border-zinc-800/50 pt-5 mt-4">
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
                                            );
                                        })}
                                    </AnimatePresence>
                                </motion.div>
                            </KineticVelocityContainer>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;