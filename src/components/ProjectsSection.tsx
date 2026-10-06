import { portfolioData } from '../data/portfolio';
import { ArrowUpRight, GithubIcon } from "lucide-react";
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ProjectsSection = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

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

    return (
        <section id="projects" className="relative py-12 md:py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Framed Luxury Darkroom Showcase Capsule - Refined Dark Graphite in Light Mode */}
                <div className="relative rounded-3xl md:rounded-[2.5rem] border border-zinc-700/60 dark:border-white/10 bg-gradient-to-b from-[#22242c] via-[#1a1b22] to-[#22242c] dark:from-[#0c0d14] dark:via-[#09090d] dark:to-[#0c0d14] text-white p-6 sm:p-10 md:p-16 shadow-2xl shadow-zinc-900/15 dark:shadow-black/70 overflow-hidden">
                    {/* Subtle Ethereal Ambient Radial Light */}
                    <div className="absolute -top-32 -right-32 w-96 h-96 bg-cyan-500/15 dark:bg-cyan-500/10 rounded-full filter blur-[140px] pointer-events-none" />
                    <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-500/15 dark:bg-indigo-500/10 rounded-full filter blur-[140px] pointer-events-none" />

                    <div className="relative z-10">
                        {/* Header: OpenAI Editorial Index Header */}
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

                        {/* Filter Pills: OpenAI Monospace Category Selector */}
                        <div className="flex flex-wrap items-center gap-2 mb-12">
                            {categories.map((cat) => {
                                const isSelected = selectedCategory === cat;
                                const count = categoryCounts[cat] || 0;
                                return (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
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

                        {/* Projects Grid: OpenAI Editorial Card Architecture */}
                        <motion.div 
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
                        >
                            <AnimatePresence mode="popLayout">
                                {filteredProjects.map((project, index) => (
                                    <motion.article
                                        layout
                                        key={project.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.98 }}
                                        transition={{ duration: 0.35 }}
                                        className="group rounded-3xl border border-zinc-700/60 dark:border-zinc-800/80 bg-[#161720]/90 dark:bg-zinc-900/40 hover:bg-[#161720] dark:hover:bg-zinc-900/70 hover:border-zinc-500/60 dark:hover:border-zinc-700 transition-all duration-500 overflow-hidden flex flex-col justify-between"
                                    >
                                        <div>
                                            {/* Cinematic Image Frame */}
                                            <div className="relative aspect-[16/10] overflow-hidden bg-[#111217] dark:bg-zinc-950 border-b border-zinc-700/60 dark:border-zinc-800/60">
                                                <img
                                                    src={project.image}
                                                    alt={`Screenshot of ${project.title}`}
                                                    loading="lazy"
                                                    decoding="async"
                                                    width={600}
                                                    height={375}
                                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                                                />

                                                {/* Subtle Vignette Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#161720]/90 dark:from-zinc-950/80 via-transparent to-transparent pointer-events-none" />

                                                {/* Index Number Chip */}
                                                <div className="absolute top-4 left-4 z-10">
                                                    <span className="px-2.5 py-1 rounded-md text-[11px] font-mono tracking-wider font-semibold text-zinc-200 dark:text-zinc-300 bg-black/60 backdrop-blur-md border border-white/10">
                                                        0{index + 1} • {project.category.toUpperCase()}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Editorial Content */}
                                            <div className="p-7 md:p-8">
                                                <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight group-hover:text-zinc-100 transition-colors">
                                                    {project.title}
                                                </h3>
                                                <p className="text-zinc-300 dark:text-zinc-400 text-sm md:text-base leading-relaxed mb-6 font-normal">
                                                    {project.description}
                                                </p>

                                                {/* Minimalist Tech Stack Chips */}
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

                                        {/* Action Bar: OpenAI Minimalist Links */}
                                        <div className="px-7 pb-7 md:px-8 md:pb-8 pt-0 flex items-center gap-4 border-t border-zinc-700/60 dark:border-zinc-800/50 pt-5 mt-4">
                                            {project.liveUrl && (
                                                <a
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
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
                                                    aria-label={`View GitHub repository for ${project.title}`}
                                                    className="group/btn inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-300 dark:text-zinc-400 hover:text-white transition-colors cursor-pointer ml-auto"
                                                >
                                                    <GithubIcon className="w-4 h-4" />
                                                    <span>Repository</span>
                                                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                                                </a>
                                            )}
                                        </div>
                                    </motion.article>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;