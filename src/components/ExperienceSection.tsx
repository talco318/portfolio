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
        <section id="experience" className="py-16 md:py-24 bg-gray-50 dark:bg-[#0f172a]/50">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <motion.div 
                    className="flex items-center gap-4 mb-10 md:mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="h-px bg-gray-300 dark:bg-gray-700 flex-1" />
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white uppercase transition-all hover:tracking-widest duration-500">History</h2>
                    <div className="h-px bg-gray-300 dark:bg-gray-700 flex-1" />
                </motion.div>

                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 mb-12">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-tighter">Professional Experience</h3>
                        <div className="h-0.5 bg-purple-500 w-12 rounded-full" />
                    </div>
                    
                    <motion.div
                        className="relative border-l-2 border-gray-200 dark:border-gray-800 ml-4 pl-8 space-y-16"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        {experience.map((exp) => (
                            <motion.div
                                key={exp.id}
                                className="relative group"
                                variants={cardVariants}
                            >
                                <div className="absolute -left-[41px] top-1 w-5 h-5 bg-white dark:bg-slate-900 border-4 border-purple-500 rounded-full z-10 group-hover:scale-125 transition-transform" />
                                
                                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4 gap-2">
                                    <h4 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white leading-tight">
                                        {exp.position}
                                    </h4>
                                    <span className="text-sm font-black text-purple-600 dark:text-purple-400 whitespace-nowrap px-4 py-1.5 bg-purple-50 dark:bg-purple-900/20 rounded-full border border-purple-100 dark:border-purple-800/30">
                                        {exp.startDate} — {exp.endDate}
                                    </span>
                                </div>
                                
                                <p className="text-xl font-bold text-gray-600 dark:text-gray-400 mb-6">
                                    {exp.company}
                                </p>
                                
                                <motion.ul className="space-y-4">
                                    {exp.achievements.map((achievement, idx) => (
                                        <motion.li
                                            key={idx}
                                            className="flex items-start gap-4 text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed"
                                            variants={listItemVariants}
                                        >
                                            <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                                            {achievement}
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ExperienceSection;
