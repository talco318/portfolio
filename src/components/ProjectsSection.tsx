import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import { staggerContainer, fadeInUp } from '../animations';
import {ExternalLink, Github} from "lucide-react";
import TechStackBadgesComponent from "./TechStackBadgesComponent.tsx";

export const ProjectsSection = () => {
    return (
        <motion.section
            id="projects"
            className="py-20"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
        >
            <div className="section-container">
                <motion.h2
                    className="text-3xl font-bold mb-8"
                    variants={fadeInUp}
                >
                    Projects
                </motion.h2>
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    variants={staggerContainer}
                >
                    {portfolioData.projects.map((project) => (
                        <motion.div
                            key={project.id}
                            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg"
                            variants={fadeInUp}
                            whileHover={{
                                y: -10,
                                transition: { type: "spring", stiffness: 300 }
                            }}
                        >
                            <motion.img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-48 object-cover"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            />
                            <motion.div
                                className="p-6"
                                initial={{opacity: 0}}
                                whileInView={{opacity: 1}}
                                transition={{delay: 0.2}}
                            >
                                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    {project.description}
                                </p>

                                {/* This will push everything below to the bottom */}
                                <div className="flex-grow"></div>

                                {/* Tech Stack Badges */}
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
                                        > <p>
                                            <Github className="w-4 h-4"/></p>
                                            Code
                                        </a>
                                    )}
                                </div>
                            </motion.div>

                        </motion.div>

                    ))}

                </motion.div>
            </div>
        </motion.section>
    );
};