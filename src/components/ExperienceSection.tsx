import { Experience, Education } from "../data/portfolio.ts";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase, MapPin } from 'lucide-react';

interface ExperienceSectionProps {
    experience: Experience[];
    education: Education[];
}

const ExperienceSection = ({ experience, education }: ExperienceSectionProps) => {
    return (
        <section id="experience" className="relative py-14 md:py-24 overflow-hidden">
            <div className="absolute top-1/2 -left-28 w-[500px] h-[500px] bg-purple-500/10 dark:bg-purple-600/15 rounded-full filter blur-[140px] pointer-events-none" />
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                
                {/* Section Header */}
                <div className="flex flex-col items-center mb-12 md:mb-16">
                    <motion.span 
                        className="glass-pill px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-3"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Track Record
                    </motion.span>
                    <motion.div 
                        className="flex items-center gap-4 w-full"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ margin: "-50px" }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                        <div className="h-px bg-zinc-200/80 dark:bg-zinc-800 flex-1" />
                        <h2 className="font-heading text-3xl md:text-5xl font-black uppercase tracking-tight text-zinc-900 dark:text-white">
                            Career <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 text-transparent bg-clip-text">Journey</span>
                        </h2>
                        <div className="h-px bg-zinc-200/80 dark:bg-zinc-800 flex-1" />
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14">
                    
                    {/* Main Experience Timeline (8 cols) */}
                    <div className="lg:col-span-8">
                        <motion.div 
                            className="flex items-center gap-3.5 mb-8"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ margin: "-50px" }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="p-2.5 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                                <Briefcase className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <h3 className="font-heading text-2xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">Experience</h3>
                            <div className="h-1 bg-gradient-to-r from-indigo-500 to-transparent w-16 rounded-full" />
                        </motion.div>
                        
                        <div className="relative border-l-2 border-indigo-500/30 dark:border-indigo-500/20 ml-4 pl-7 md:pl-10 space-y-8 mt-6">
                            {experience.map((exp, index) => (
                                <motion.div 
                                    key={exp.id} 
                                    className="relative"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ margin: "-80px" }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    {/* Glowing Timeline Node */}
                                    <div className="absolute -left-[39px] md:-left-[51px] top-5 w-5 h-5 md:w-6 md:h-6 rounded-full bg-white dark:bg-zinc-950 border-[3px] border-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.6)] z-10 flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                    </div>
                                    
                                    {/* Glass Experience Card */}
                                    <div className="glass-card p-6 md:p-8 rounded-2xl md:rounded-3xl hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-4">
                                            <div>
                                                <h4 className="text-xl md:text-2xl font-black text-zinc-900 dark:text-white font-heading">
                                                    {exp.position}
                                                </h4>
                                                <span className="inline-block text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mt-1">
                                                    {exp.company}
                                                </span>
                                            </div>
                                            <span className="glass-pill text-[11px] font-bold text-indigo-600 dark:text-indigo-400 px-3.5 py-1 rounded-full self-start sm:self-center border border-indigo-500/20">
                                                {exp.startDate} — {exp.endDate}
                                            </span>
                                        </div>
                                        
                                        <ul className="grid gap-2.5">
                                            {exp.achievements.map((achievement, idx) => (
                                                <li key={idx} className="text-zinc-600 dark:text-zinc-300 text-sm md:text-base leading-relaxed flex items-start gap-3">
                                                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 shadow-[0_0_6px_rgba(99,102,241,0.8)]" />
                                                    <span>{achievement}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Education Sidebar (4 cols) */}
                    <div className="lg:col-span-4">
                        <motion.div 
                            className="flex items-center gap-3.5 mb-8"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ margin: "-50px" }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="p-2.5 rounded-xl bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                                <GraduationCap className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <h3 className="font-heading text-2xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">Education</h3>
                            <div className="h-1 bg-gradient-to-r from-purple-500 to-transparent w-16 rounded-full" />
                        </motion.div>

                        <div className="space-y-6 mt-6">
                            {education.map((edu, idx) => (
                                <motion.div 
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                    viewport={{ margin: "-100px" }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className="glass-card p-6 md:p-8 rounded-2xl md:rounded-3xl relative overflow-hidden group hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300"
                                >
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-2 mb-3 text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest">
                                            <MapPin className="w-3.5 h-3.5" />
                                            {edu.school}
                                        </div>
                                        <h4 className="text-lg md:text-xl font-black text-zinc-900 dark:text-white mb-1.5 leading-tight font-heading">
                                            {edu.degree}
                                        </h4>
                                        <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-5">{edu.years}</div>
                                        
                                        {edu.coursework && (
                                            <div className="flex flex-wrap gap-1.5">
                                                {edu.coursework.map(course => (
                                                    <span key={course} className="glass-pill px-2.5 py-1 text-[10px] font-semibold text-zinc-600 dark:text-zinc-300 rounded-lg">
                                                        {course}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity translate-x-4 -translate-y-4 pointer-events-none">
                                        <GraduationCap className="w-24 h-24" />
                                    </div>
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
