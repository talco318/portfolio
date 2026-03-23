import { Experience, Education } from "../data/portfolio.ts";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase } from 'lucide-react';

interface ExperienceSectionProps {
    experience: Experience[];
    education: Education[];
}

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.18 } },
};

const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const ExperienceSection = ({ experience, education }: ExperienceSectionProps) => {
    return (
        <section id="experience" className="py-16 md:py-24 bg-gray-50 dark:bg-[#0f172a]/50">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Header */}
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

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
                    {/* Experience Column */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-10">
                            <Briefcase className="w-6 h-6 text-purple-600" />
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-tighter">Experience</h3>
                            <div className="h-0.5 bg-purple-500 w-12 rounded-full" />
                        </div>
                        
                        <motion.div
                            className="relative border-l-2 border-gray-200 dark:border-gray-800 ml-4 pl-8 space-y-12"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                        >
                            {experience.map((exp) => (
                                <motion.div key={exp.id} className="relative group" variants={cardVariants}>
                                    <div className="absolute -left-[41px] top-1 w-5 h-5 bg-white dark:bg-slate-900 border-4 border-purple-500 rounded-full z-10 group-hover:scale-125 transition-transform" />
                                    
                                    <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2 gap-2">
                                        <h4 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white leading-tight">
                                            {exp.position}
                                        </h4>
                                        <span className="text-xs font-black text-purple-600 dark:text-purple-400 whitespace-nowrap px-3 py-1 bg-purple-50 dark:bg-purple-900/20 rounded-full border border-purple-100 dark:border-purple-800/30">
                                            {exp.startDate} — {exp.endDate}
                                        </span>
                                    </div>
                                    <p className="text-lg font-bold text-gray-600 dark:text-gray-400 mb-4">{exp.company}</p>
                                    
                                    <ul className="space-y-3">
                                        {exp.achievements.map((achievement, idx) => (
                                            <li key={idx} className="flex items-start gap-4 text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">
                                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                                                {achievement}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Education Column */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-10">
                            <GraduationCap className="w-6 h-6 text-blue-500" />
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-tighter">Education</h3>
                            <div className="h-0.5 bg-blue-500 w-12 rounded-full" />
                        </div>

                        <div className="space-y-8">
                            {education.map((edu, idx) => (
                                <motion.div 
                                    key={idx}
                                    className="p-6 rounded-3xl bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <GraduationCap className="w-16 h-16 text-blue-500" />
                                    </div>
                                    <h4 className="text-lg font-black text-gray-900 dark:text-white mb-1 group-hover:text-blue-500 transition-colors">{edu.degree}</h4>
                                    <p className="text-base font-bold text-gray-600 dark:text-gray-400 mb-2">{edu.school}</p>
                                    <p className="text-xs font-black text-blue-600 dark:text-blue-400 mb-4">{edu.years}</p>
                                    
                                    {edu.coursework && (
                                        <div className="flex flex-wrap gap-1.5 mt-4">
                                            {edu.coursework.map(course => (
                                                <span key={course} className="px-2 py-0.5 text-[10px] font-bold bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 rounded-md border border-blue-100/50 dark:border-blue-800/30">
                                                    {course}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExperienceSection;
