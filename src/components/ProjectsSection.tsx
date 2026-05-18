import { portfolioData } from '../data/portfolio';
import {ExternalLink, ChevronLeft, ChevronRight, GithubIcon} from "lucide-react";
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';

export const ProjectsSection = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [direction, setDirection] = useState(0);
    const [projectsPerPage, setProjectsPerPage] = useState(window.innerWidth < 768 ? 1 : 2);

    type TechStackBadgesProps = {
        technologies: string[];
    };

    const calculateProjectsPerPage = useCallback(() => {
        setProjectsPerPage(window.innerWidth < 768 ? 1 : 2);
    }, []);

    useEffect(() => {
        calculateProjectsPerPage();
        const handleResize = () => {
            calculateProjectsPerPage();
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [calculateProjectsPerPage]);


    const totalPages = Math.ceil(portfolioData.projects.length / projectsPerPage);

    const nextPage = () => {
        if (!isAnimating) {
            setIsAnimating(true);
            setDirection(1);
            setCurrentPage((prev) => (prev + 1) % totalPages);
        }
    };

    const prevPage = () => {
        if (!isAnimating) {
            setIsAnimating(true);
            setDirection(-1);
            setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
        }
    };

    const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const offset = info.offset.x;
        const velocity = info.velocity.x;

        if (offset < -50 || velocity < -500) {
            nextPage();
        } else if (offset > 50 || velocity > 500) {
            prevPage();
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsAnimating(false);
        }, 400);
        return () => clearTimeout(timer);
    }, [currentPage]);

    const visibleProjects = portfolioData.projects.slice(
        currentPage * projectsPerPage,
        currentPage * projectsPerPage + projectsPerPage
    );

    const TechStackBadges: React.FC<TechStackBadgesProps> = ({ technologies }) => {
        return (
            <motion.div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                    <span
                        key={tech}
                        className="px-3 py-1 bg-accent/5 dark:bg-accent/10 text-accent rounded-lg text-xs font-semibold border border-accent/10 dark:border-accent/20"
                    >
                        {tech}
                    </span>
                ))}
            </motion.div>
        );
    };
    return (
        <section id="projects" className="relative py-14 md:py-20 bg-white dark:bg-[#09090b] overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="section-container relative z-10">
                <motion.div 
                    className="flex items-center gap-4 mb-10 md:mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-1" />
                    <h2 className="font-heading text-3xl md:text-5xl font-black uppercase tracking-tight bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">Projects</h2>
                    <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-1" />
                </motion.div>

                <div className="relative">
                    {portfolioData.projects.length > projectsPerPage && (
                        <>
                            <button
                                onClick={prevPage}
                                disabled={isAnimating}
                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 bg-white dark:bg-zinc-900 p-2.5 rounded-xl shadow-lg border border-zinc-100 dark:border-zinc-800 z-10 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all disabled:opacity-50 cursor-pointer hover:shadow-xl"
                                aria-label="Previous project"
                            >
                                <ChevronLeft className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
                                <span className="sr-only">Previous project</span>
                            </button>

                            <button
                                onClick={nextPage}
                                disabled={isAnimating}
                                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 bg-white dark:bg-zinc-900 p-2.5 rounded-xl shadow-lg border border-zinc-100 dark:border-zinc-800 z-10 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all disabled:opacity-50 cursor-pointer hover:shadow-xl"
                                aria-label="Next project"
                            >
                                <ChevronRight className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
                                <span className="sr-only">Next project</span>
                            </button>
                        </>
                    )}

                    {/* Overflow container */}
                    <div className="relative overflow-hidden min-h-[500px]">
                        <AnimatePresence mode="popLayout" custom={direction}>
                            <motion.div
                                key={currentPage}
                                className={`grid gap-6 cursor-grab active:cursor-grabbing select-none touch-pan-y ${projectsPerPage === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2 w-full"}`}
                                initial={{ opacity: 0, x: direction * 50, scale: 0.95 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: -direction * 50, scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 40 }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.5}
                                onDragEnd={handleDragEnd}
                            >
                            {visibleProjects.map((project) => (
                                <motion.div
                                    key={project.id}
                                    className="group bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800 hover:border-zinc-200 dark:hover:border-zinc-700 transition-all duration-300"
                                    whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                >
                                    {/* Image + Overlay */}
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={project.image}
                                            alt={`Screenshot of ${project.title} - ${project.technologies.slice(0, 3).join(', ')} project`}
                                            loading="lazy"
                                            width={600}
                                            height={208}
                                            draggable={false}
                                            className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                                        />
                                        {/* Gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-5 gap-3">
                                            {project.liveUrl && (
                                                <a
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 px-4 py-2 bg-white text-zinc-900 rounded-lg text-sm font-semibold hover:bg-zinc-100 transition-colors cursor-pointer"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                    Live Demo
                                                </a>
                                            )}
                                            {project.githubUrl && (
                                                <a
                                                    href={project.githubUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 px-4 py-2 bg-zinc-900/80 text-white border border-white/20 rounded-lg text-sm font-semibold hover:bg-zinc-800 transition-colors cursor-pointer backdrop-blur-sm"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <GithubIcon className="w-4 h-4" />
                                                    Code
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-lg font-bold mb-2 text-zinc-900 dark:text-white font-heading">{project.title}</h3>
                                        <p className="text-zinc-500 dark:text-zinc-400 mb-4 text-sm leading-relaxed" style={{ whiteSpace: 'pre-line' }}>
                                            {project.description}
                                        </p>
                                        <TechStackBadges technologies={project.technologies} />
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                    </div>

                    {portfolioData.projects.length > projectsPerPage && (
                    <div className="flex justify-center mt-8 gap-2 items-center">
                            {Array.from({ length: totalPages }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => !isAnimating && setCurrentPage(index)}
                                    className="p-2 group flex items-center justify-center transition-all cursor-pointer"
                                    disabled={isAnimating}
                                    aria-label={`Go to project page ${index + 1}`}
                                    aria-current={currentPage === index}
                                >
                                    <span className={`h-2.5 rounded-full transition-all duration-300 ${
                                        currentPage === index
                                            ? 'bg-gradient-to-r from-orange-500 to-pink-500 w-8'
                                            : 'bg-zinc-300 dark:bg-zinc-600 group-hover:bg-zinc-400 dark:group-hover:bg-zinc-400 w-2.5'
                                    }`} />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
export default ProjectsSection;