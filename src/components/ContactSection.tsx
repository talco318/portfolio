import { motion } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { staggerContainer, fadeInUp } from '../animations';

export const ContactSection = () => {
    return (
        <motion.section
            id="contact"
            className="py-20 bg-white dark:bg-gray-900"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
        >
            <div className="max-w-7xl mx-auto px-4">
                <motion.h2
                    className="text-3xl font-bold mb-8"
                    variants={fadeInUp}
                >
                    Contact Me
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div variants={fadeInUp}>
                        <p className="text-lg mb-6">
                            Feel free to reach out! I'm always open to discussing new projects,
                            creative ideas, or opportunities to be part of your visions.
                        </p>
                        <div className="space-y-4">
                            <p className="flex items-center gap-2">
                                <span className="font-semibold">Email:</span>
                                <motion.a
                                    href={`mailto:${portfolioData.personal.email}`}
                                    className="text-blue-600 hover:text-blue-700"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    {portfolioData.personal.email}
                                </motion.a>
                            </p>
                            <p className="flex items-center gap-2">
                                <span className="font-semibold">Location:</span>
                                {portfolioData.personal.location}
                            </p>
                            <motion.div
                                className="flex gap-4"
                                variants={staggerContainer}
                            >
                                <motion.a
                                    href={portfolioData.personal.socialLinks.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                    whileHover={{ scale: 1.2 }}
                                >
                                    <Github className="w-6 h-6" />
                                </motion.a>
                                <motion.a
                                    href={portfolioData.personal.socialLinks.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                    whileHover={{ scale: 1.2 }}
                                >
                                    <Linkedin className="w-6 h-6" />
                                </motion.a>
                            </motion.div>
                        </div>
                    </motion.div>
                    <motion.form
                        className="space-y-6"
                        variants={fadeInUp}
                    >
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                            >
                                Name
                            </label>
                            <motion.input
                                type="text"
                                id="name"
                                name="name"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                                whileFocus={{ scale: 1.01 }}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                            >
                                Email
                            </label>
                            <motion.input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                                whileFocus={{ scale: 1.01 }}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="message"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                            >
                                Message
                            </label>
                            <motion.textarea
                                id="message"
                                name="message"
                                rows={4}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                                whileFocus={{ scale: 1.01 }}
                            />
                        </div>
                        <motion.button
                            type="submit"
                            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Send Message
                        </motion.button>
                    </motion.form>
                </div>
            </div>
        </motion.section>
    );
};