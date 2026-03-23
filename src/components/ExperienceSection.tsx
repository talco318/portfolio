import { Experience } from "../data/portfolio.ts";
import { motion } from "framer-motion";

interface ExperienceSectionProps {
    experience: Experience[];
}

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.18 } },
};

const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const listItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

const ExperienceSection = ({ experience }: ExperienceSectionProps) => {
    return (
        <section id="experience" className="py-12 bg-indigo-50 dark:bg-slate-800">
            <div className="max-w-7xl mx-auto px-4">
                <motion.div 
                    className="flex items-center gap-4 mb-10 md:mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="h-px bg-gray-300 dark:bg-gray-700 flex-1" />
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white uppercase transition-all hover:tracking-widest duration-500">Experience</h2>
                    <div className="h-px bg-gray-300 dark:bg-gray-700 flex-1" />
                </motion.div>
                <motion.div
                    className="relative border-l-2 border-indigo-500 dark:border-indigo-300 pl-4 space-y-4"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {experience.map((exp) => (
                        <motion.div
                            key={exp.id}
                            className="relative bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg"
                            variants={cardVariants}
                            whileHover={{ x: 6, boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                            <div className="absolute -left-[27px] top-0 w-5 h-5 bg-indigo-500 dark:bg-indigo-300 rounded-full border-4 border-white dark:border-gray-700" />
                            <h3 className="text-xl font-bold mb-2">{exp.position}</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                {exp.company} | {exp.startDate} - {exp.endDate}
                            </p>
                            <p className="mb-4">{exp.description}</p>
                            <motion.ul
                                className="list-disc list-inside space-y-2"
                                variants={containerVariants}
                            >
                                {exp.achievements.map((achievement, idx) => (
                                    <motion.li
                                        key={idx}
                                        className="text-gray-600 dark:text-gray-400"
                                        variants={listItemVariants}
                                    >
                                        {achievement}
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ExperienceSection;
