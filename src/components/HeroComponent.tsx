import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import { staggerContainer, springHover, fadeInUp } from '../animations';

export const HeroComponent = () => {
    return (
        <motion.section
            className="pt-20 pb-32 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="flex flex-col md:flex-row items-center gap-8"
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                >
                    <motion.div
                        className="flex-1"
                        variants={fadeInUp}
                    >
                        <motion.h1
                            className="text-4xl md:text-6xl font-bold mb-4"
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
                            <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-6">
                                {portfolioData.personal.title}
                            </h2>
                            <p className="text-lg mb-8">{portfolioData.personal.tagline}</p>
                        </motion.div>
                        <motion.div
                            className="flex gap-4"
                            variants={springHover}
                        >
                            <motion.a
                                href="#projects"
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                View Projects
                            </motion.a>
                            <motion.a
                                href="#contact"
                                className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Contact Me
                            </motion.a>
                        </motion.div>
                    </motion.div>
                    <motion.div
                        className="flex-1 flex justify-center"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, type: "spring" }}
                    >
                        <motion.img
                            src={portfolioData.personal.avatar}
                            alt={portfolioData.personal.name}
                            className="w-64 h-64 rounded-full object-cover shadow-lg"
                            whileHover={{
                                scale: 1.1,
                                rotate: 5,
                                transition: { type: "spring", stiffness: 300 }
                            }}
                        />
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
};