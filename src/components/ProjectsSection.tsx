import { portfolioData } from '../data/portfolio';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import TechStackBadgesComponent from "./TechStackBadgesComponent.tsx";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ProjectsSection = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [direction, setDirection] = useState(0);

    // Dynamically set projects per page based on screen size
    const projectsPerPage = window.innerWidth < 768 ? 1 : 2;  // 1 project per page on mobile, 2 on larger screens

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
        }, 400); // Increased duration for a smoother effect
        return () => clearTimeout(timer);
    }, [currentPage]);

    // Ensure correct slicing of projects per page
    const visibleProjects = portfolioData.projects.slice(
        currentPage * projectsPerPage,
        currentPage * projectsPerPage + projectsPerPage
    );

    return (
        <section id="projects" className="py-20">
            <div className="section-container">
                <h2 className="text-3xl font-bold mb-8">Projects</h2>

                <div className="relative">
                    {portfolioData.projects.length > projectsPerPage && (
                        <>
                            <button
                                onClick={prevPage}
                                disabled={isAnimating}
                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg z-10 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>

                            <button
                                onClick={nextPage}
                                disabled={isAnimating}
                                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg z-10 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </>
                    )}

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentPage} // Helps with smooth animation transitions
                            className="grid grid-cols-1 md:grid-cols-2 gap-8 overflow-hidden"
                            initial={{ opacity: 0, x: direction * 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -direction * 100 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                            {visibleProjects.map((project) => (
                                <div
                                    key={project.id}
                                    className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2"
                                >
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                                    />
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                                            {project.description}
                                        </p>

                                        <TechStackBadgesComponent technologies={project.technologies}/>

                                        <div className="flex mt-4 gap-4">
                                            {project.liveUrl && (
                                                <a
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                                                >
                                                    <ExternalLink className="w-4 h-4"/>
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
                                                    <Github className="w-4 h-4"/>
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
