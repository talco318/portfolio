import {
    Code2, Database, Globe, Layout,
    Terminal, Cloud, Laptop,
    Languages, FileJson, Server, GithubIcon
} from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.08 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

const skillVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

const SkillsSection = () => {
    const categories = [
        {
            title: "Programming Languages",
            skills: [
                { name: 'Python', icon: Code2 },
                { name: 'C', icon: Code2 },
                { name: 'C++', icon: Code2 },
                { name: 'C#', icon: Code2 },
                { name: 'Java', icon: Code2 },
                { name: 'JavaScript', icon: FileJson },
                { name: 'TypeScript', icon: FileJson },
            ]
        },
        {
            title: "Web Development",
            skills: [
                { name: 'React', icon: Layout },
                { name: 'HTML', icon: Code2 },
                { name: 'CSS', icon: Layout },
                { name: 'JSON', icon: FileJson },
                { name: 'Node.js', icon: Server },
            ]
        },
        {
            title: "Databases",
            skills: [
                { name: 'SQL (MySQL)', icon: Database },
                { name: 'SQL (Microsoft SQL Server)', icon: Database },
                { name: 'MongoDB', icon: Database },
            ]
        },
        {
            title: "Cloud & Infrastructure",
            skills: [
                { name: 'AWS', icon: Cloud },
                { name: 'Firebase', icon: Cloud },
                { name: 'SAS', icon: Cloud },
                { name: 'Linux (bash)', icon: Terminal },
                { name: 'Windows', icon: Laptop },
            ]
        },
        {
            title: "Tools",
            skills: [
                { name: 'Git', icon: GithubIcon },
                { name: 'Selenium', icon: Globe },
                { name: 'Postman', icon: Globe },
            ]
        },
        {
            title: "APIs",
            skills: [
                { name: 'RESTful APIs', icon: Globe },
                { name: 'Google AI Studio API', icon: Cloud },
                { name: 'Spotify API', icon: Globe },
                { name: 'Google Maps API', icon: Globe },
            ]
        },
        {
            title: "Languages",
            skills: [
                { name: 'Hebrew (Native)', icon: Languages },
                { name: 'English (Fluent)', icon: Languages },
            ]
        },
    ];

    const chunkedCategories = [];
    for (let i = 0; i < categories.length; i += 3) {
        chunkedCategories.push(categories.slice(i, i + 3));
    }

    return (
        <motion.div
            id="skills"
            className="w-full max-w-7xl mx-auto p-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
        >
            <motion.h2
                className="text-3xl font-bold mb-8 text-center dark:text-white"
                variants={cardVariants}
            >
                Skills
            </motion.h2>

            {chunkedCategories.map((row, rowIndex) => (
                <div key={rowIndex} className="grid md:grid-cols-3 gap-6 mb-6">
                    {row.map((category) => (
                        <motion.div
                            key={category.title}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                            variants={cardVariants}
                            whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(0,0,0,0.12)' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                                <h3 className="text-xl font-semibold dark:text-white">
                                    {category.title}
                                </h3>
                            </div>
                            <motion.div
                                className="p-4"
                                variants={containerVariants}
                            >
                                <div className="grid gap-3">
                                    {category.skills.map((skill) => (
                                        <motion.div
                                            key={skill.name}
                                            className="flex items-center p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-default"
                                            variants={skillVariants}
                                            whileHover={{ x: 4 }}
                                            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                                        >
                                            <skill.icon className="w-5 h-5 mr-3 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                                            <span className="font-medium dark:text-white">{skill.name}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            ))}
        </motion.div>
    );
};

export default SkillsSection;