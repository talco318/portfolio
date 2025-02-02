import { motion } from "framer-motion";

type TechStackBadgesProps = {
    technologies: string[];
};

type Skill = {
    name: string;
    proficiency: number;
};

type SkillsSectionProps = {
    skills: Skill[];
};

const TechStackBadges: React.FC<TechStackBadgesProps> = ({ technologies }) => {
    return (
        <motion.div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
                <motion.span
                    key={tech}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {tech}
                </motion.span>
            ))}
        </motion.div>
    );
};

const SkillsComponent: React.FC<SkillsSectionProps> = ({ skills }) => {
    return (
        <section id="skills" className="py-20 bg-white dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8">Skills</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skills.map((skill) => (
                        <div
                            key={skill.name}
                            className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-lg transition-transform hover:scale-105"
                        >
                            <h3 className="text-lg font-semibold mb-4">{skill.name}</h3>
                            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                                <div
                                    className="bg-purple-600 h-2.5 rounded-full transition-all duration-500"
                                    style={{ width: `${skill.proficiency}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export { TechStackBadges, SkillsComponent };
