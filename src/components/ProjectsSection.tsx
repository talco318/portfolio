import { portfolioData } from '../data/portfolio';
import {ExternalLink, ChevronLeft, ChevronRight, GithubIcon} from "lucide-react";
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
                <h2 className="text-3xl font-bold mb-8">Projects</h2>

                <div className="relative">
                    {portfolioData.projects.length > projectsPerPage && (
                        <>
                            <button
                                onClick={prevPage}
                                disabled={isAnimating}
                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-white dark:bg-gray-900 p-2 rounded-full shadow-lg z-10 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>

                            <button
                                onClick={nextPage}
                                disabled={isAnimating}
                                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-white dark:bg-gray-900 p-2 rounded-full shadow-lg z-10 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </>
                    )}

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentPage}
                            className={`grid gap-8 overflow-hidden ${projectsPerPage === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"}`}
                            initial={{ opacity: 0, x: direction * 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -direction * 100 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                            {visibleProjects.map((project) => (
                                <div
                                    key={project.id}
                                    className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2"
                                >
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                                    />
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-400 mb-4" style={{ whiteSpace: 'pre-line' }}>
                                            {project.description}
                                        </p>

                                        <TechStackBadges technologies={project.technologies} />

                                        <div className="flex mt-4 gap-4">
                                            {project.liveUrl && (
                                                <a
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
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
                                                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                                                >
                                                    <GithubIcon className="w-4 h-4" />
                                                    Code
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {portfolioData.projects.length > projectsPerPage && (
                        <div className="flex justify-center mt-8 gap-2">
                            {Array.from({ length: totalPages }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => !isAnimating && setCurrentPage(index)}
                                    className={`w-2 h-2 rounded-full transition-colors ${
                                        currentPage === index
                                            ? 'bg-blue-600'
                                            : 'bg-gray-300 dark:bg-gray-600'
                                    }`}
                                    disabled={isAnimating}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
export default ProjectsSection;