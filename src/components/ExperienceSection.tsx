import { Experience, Education } from "../data/portfolio.ts";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase, MapPin } from 'lucide-react';

interface ExperienceSectionProps {
    experience: Experience[];
    education: Education[];
}

const ExperienceSection = ({ experience, education }: ExperienceSectionProps) => {
    return (
        <section id="experience" className="relative py-14 md:py-20 bg-zinc-50 dark:bg-[#09090b] overflow-hidden">
            <div className="absolute top-1/2 -left-[200px] w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                
                {/* Section Header */}
                <motion.div 
                    className="flex items-center gap-4 mb-10 md:mb-14"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ margin: "-50px" }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-1" />
                    <h2 className="font-heading text-3xl md:text-5xl font-black uppercase tracking-tight">
                        Professional <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-transparent bg-clip-text">Journey</span>
                    </h2>
                    <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-1" />
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">
                    
                    {/* Main Experience Timeline (8 cols) */}
                    <div className="lg:col-span-8">
                        <motion.div 
                            className="flex items-center gap-4 mb-8"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ margin: "-50px" }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="p-2.5 bg-accent/10 dark:bg-accent/15 rounded-xl text-accent">
                                <Briefcase className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <h3 className="font-heading text-2xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">Experience</h3>
                            <div className="h-1 bg-gradient-to-r from-accent to-transparent w-16 rounded-full" />
                        </motion.div>
                        
                        <div className="relative border-l-2 border-zinc-200 dark:border-zinc-800 ml-4 pl-8 md:pl-12 space-y-12 mt-6">
                            {experience.map((exp, index) => (
                                <motion.div 
                                    key={exp.id} 
                                    className="relative"
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ margin: "-100px" }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    {/* Timeline Dot */}
                                    <div className="absolute -left-[41px] md:-left-[49px] top-1.5 w-5 h-5 md:w-6 md:h-6 bg-white dark:bg-zinc-900 border-[4px] border-accent rounded-full z-10 shadow-[0_0_15px_rgba(37,99,235,0.2)]" />
                                    
                                    <div className="mb-4">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                                            <h4 className="text-xl md:text-2xl font-black text-zinc-900 dark:text-white cursor-default font-heading">
                                                {exp.position} 
                                                <span className="block text-sm font-bold text-accent mt-1 uppercase tracking-wider">{exp.company}</span>
                                            </h4>
                                            <span className="text-[10px] md:text-xs font-bold text-accent whitespace-nowrap px-4 py-1.5 bg-accent/5 dark:bg-accent/10 rounded-full border border-accent/20 self-start md:self-center">
                                                {exp.startDate} — {exp.endDate}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <ul className="grid gap-2">
                                        {exp.achievements.map((achievement, idx) => (
                                            <li key={idx} className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed flex items-start gap-3">
                                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent/40 shrink-0" />
                                                {achievement}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Education Sidebar (4 cols) */}
                    <div className="lg:col-span-4">
                        <motion.div 
                            className="flex items-center gap-4 mb-8"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ margin: "-50px" }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="p-2.5 bg-accent/10 dark:bg-accent/15 rounded-xl text-accent">
                                <GraduationCap className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <h3 className="font-heading text-2xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">Education</h3>
                            <div className="h-1 bg-gradient-to-r from-accent to-transparent w-16 rounded-full" />
                        </motion.div>

                        <div className="space-y-6 mt-6">
                            {education.map((edu, idx) => (
                                <motion.div 
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                    viewport={{ margin: "-100px" }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className="p-6 md:p-8 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-100 dark:border-zinc-800 relative overflow-hidden group hover:border-accent/20 dark:hover:border-accent/20 transition-all duration-300 hover:shadow-lg hover:shadow-black/5"
                                >
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-2 mb-3 text-xs font-bold text-accent uppercase tracking-widest">
                                            <MapPin className="w-3 h-3" />
                                            {edu.school}
                                        </div>
                                        <h4 className="text-lg md:text-xl font-black text-zinc-900 dark:text-white mb-1 leading-tight font-heading">
                                            {edu.degree}
                                        </h4>
                                        <div className="text-[10px] font-bold text-zinc-400 mb-5">{edu.years}</div>
                                        
                                        {edu.coursework && (
                                            <div className="flex flex-wrap gap-2">
                                                {edu.coursework.map(course => (
                                                    <span key={course} className="px-2.5 py-1 text-[9px] font-bold bg-zinc-50 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 rounded-lg border border-zinc-100 dark:border-zinc-800">
                                                        {course}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity translate-x-4 -translate-y-4">
                                        <GraduationCap className="w-20 h-20" />
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
