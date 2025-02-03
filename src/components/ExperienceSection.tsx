import { Experience } from "../data/portfolio.ts";
import { motion } from "framer-motion";

interface ExperienceSectionProps {
    experience: Experience[];
}

const ExperienceSection = ({ experience }: ExperienceSectionProps) => {
    return (
        <section id="experience" className="py-12 bg-indigo-50 dark:bg-slate-800">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8 text-center">Experience</h2>
                <div className="relative border-l-2  border-indigo-500 dark:border-indigo-300 pl-4 space-y-4">
                    {experience.map((exp, index) => (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="relative bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg"
                        >
                            <div className="absolute -left-[27px] top-0 w-5 h-5 bg-indigo-500 dark:bg-indigo-300 rounded-full border-4 border-white dark:border-gray-700" />
                            <h3 className="text-xl font-bold mb-2">{exp.position}</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                {exp.company} | {exp.startDate} - {exp.endDate}
                            </p>
                            <p className="mb-4">{exp.description}</p>
                            <ul className="list-disc list-inside space-y-2  ">
                                {exp.achievements.map((achievement, idx) => (
                                    <li key={idx} className="text-gray-600 dark:text-gray-400">
                                        {achievement}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExperienceSection;
