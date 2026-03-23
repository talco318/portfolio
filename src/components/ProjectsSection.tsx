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
            <motion.div className="flex flex-wrap gap-2 ">
                {technologies.map((tech) => (
                    <motion.span
                        key={tech}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {tech}
                    </motion.span>
                ))}
            </motion.div>
        );
    };
    return (
        <section id="projects" className="py-10 bg-indigo-20 dark:bg-slate-800">
            <div className="section-container">
                <motion.div 
                    className="flex items-center gap-4 mb-10 md:mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="h-px bg-gray-300 dark:bg-gray-700 flex-1" />
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white uppercase transition-all hover:tracking-widest duration-500">Projects</h2>
                    <div className="h-px bg-gray-300 dark:bg-gray-700 flex-1" />
                </motion.div>

                <div className="relative">
                    {portfolioData.projects.length > projectsPerPage && (
                        <>
                            <button
                                onClick={prevPage}
                                disabled={isAnimating}
                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-white dark:bg-gray-900 p-2 rounded-full shadow-lg z-10 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                                aria-label="Previous project"
                            >
                                <ChevronLeft className="w-6 h-6" />
                                <span className="sr-only">Previous project</span>
                            </button>

                            <button
                                onClick={nextPage}
                                disabled={isAnimating}
                                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-white dark:bg-gray-900 p-2 rounded-full shadow-lg z-10 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                                aria-label="Next project"
                            >
                                <ChevronRight className="w-6 h-6" />
                                <span className="sr-only">Next project</span>
                            </button>
                        </>
                    )}

                    {/* Overflow container fixes visual clipping when sliding and keeps layout stable */}
                    <div className="relative overflow-hidden min-h-[500px]">
                        <AnimatePresence mode="popLayout" custom={direction}>
                            <motion.div
                                key={currentPage}
                                className={`grid gap-8 cursor-grab active:cursor-grabbing select-none touch-pan-y ${projectsPerPage === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2 w-full"}`}
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
                                    className="group bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg"
                                    whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(0,0,0,0.15)' }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                >
                                    {/* Image + Overlay */}
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            loading="lazy"
                                            draggable={false}
                                            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110 pointer-events-none"
                                        />
                                        {/* Dark overlay */}
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                            {project.liveUrl && (
                                                <a
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 px-4 py-2 bg-white text-gray-900 rounded-full text-sm font-semibold hover:bg-purple-100 transition-colors"
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
                                                    className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white border border-white/30 rounded-full text-sm font-semibold hover:bg-gray-700 transition-colors"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <GithubIcon className="w-4 h-4" />
                                                    Code
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-400 mb-4" style={{ whiteSpace: 'pre-line' }}>
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
                                    className="p-2 group flex items-center justify-center transition-all"
                                    disabled={isAnimating}
                                    aria-label={`Go to project page ${index + 1}`}
                                    aria-current={currentPage === index}
                                >
                                    <span className={`h-2.5 rounded-full transition-all duration-300 ${
                                        currentPage === index
                                            ? 'bg-blue-600 w-6'
                                            : 'bg-gray-300 dark:bg-gray-600 group-hover:bg-gray-400 w-2.5'
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