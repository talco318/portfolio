import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import { staggerContainer, springHover, fadeInUp } from '../animations';
import { Github, Linkedin } from 'lucide-react';

export const HeroSection = () => {
    return (
        <motion.section
            className="relative h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600 dark:from-blue-900 dark:via-purple-800 dark:to-gray-800 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >

            {/* Background Image Layer */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url('${portfolioData.personal.backgroundImage}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    opacity: 0.10,

                    //Try these if there's a problem with the image covering the whole screen.
                    height: '100%',
                    width: '100%',
                }}
            ></div>

            {/* Content */}
            <div className="max-w-7xl mx-auto flex flex-col items-center justify-center px-4 relative z-10">
                <motion.div
                    className="flex flex-col items-center justify-center gap-8 text-center"
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                >
                    <motion.div
                        className="flex-1 text-white"
                        variants={fadeInUp}
                    >
                        <motion.h1
                            className="text-5xl md:text-7xl font-bold mb-4 text-gradient bg-clip-text dark:text-gradient dark:bg-clip-text dark:bg-gradient-to-r from-blue-400 to-purple-500"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        >
                            {portfolioData.personal.name}
                        </motion.h1>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <h2 className="text-2xl md:text-3xl text-yellow-300 mb-6">
                                {portfolioData.personal.title}
                            </h2>
                            <p className="text-lg text-gray-200 dark:text-gray-300 mb-8">{portfolioData.personal.tagline}</p>
                        </motion.div>
                        <motion.div
                            className="flex gap-4 items-center justify-center"
                            variants={springHover}
                        >
                            <motion.a
                                href="#projects"
                                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                View Projects
                            </motion.a>
                            <motion.a
                                href="#contact"
                                className="px-6 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Contact Me
                            </motion.a>
                        </motion.div>

                        {/* Social Media Icons */}
                        <motion.div
                            className="flex gap-4 mt-6 items-center justify-center"
                            variants={staggerContainer}
                        >
                            <motion.a
                                href={portfolioData.personal.socialLinks.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-800 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                                whileHover={{ scale: 1.2 }}
                            >
                                <Github className="w-6 h-6" />
                            </motion.a>
                            <motion.a
                                href={portfolioData.personal.socialLinks.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-800 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                                whileHover={{ scale: 1.2 }}
                            >
                                <Linkedin className="w-6 h-6" />
                            </motion.a>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="flex-1 flex justify-center"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, type: "spring" }}
                    >
                        {/* Avatar Image (commented out in original) */}
                        {/* <motion.img
              src={portfolioData.personal.avatar}
              alt={portfolioData.personal.name}
              className="w-64 h-64 rounded-full object-cover shadow-2xl"
              whileHover={{
                scale: 1.1,
                rotate: 5,
                transition: { type: "spring", stiffness: 300 }
              }}
            /> */}
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
};