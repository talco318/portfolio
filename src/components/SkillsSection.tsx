import {
    Code2, Database, Globe, Layout,
    Terminal, Cloud, Laptop,
    Languages, FileJson, Server, GithubIcon,
    ChevronRight, Cpu, Smartphone, Settings, Bot
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useMemo } from 'react';
import { Skill } from '../data/portfolio';

interface SkillsSectionProps {
    skills: Skill[];
}

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.05 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
};

const skillVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
};

// Icon Mapping Helper
const getSkillIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('python') || n.includes('c++') || n.includes('java') || n.includes('c#') || n === 'c') return Code2;
    if (n.includes('react') || n.includes('html') || n.includes('css') || n.includes('tailwind')) return Layout;
    if (n.includes('node') || n.includes('server')) return Server;
    if (n.includes('sql') || n.includes('mongo') || n.includes('database')) return Database;
    if (n.includes('aws') || n.includes('gcp') || n.includes('cloud') || n.includes('firebase')) return Cloud;
    if (n.includes('linux') || n.includes('bash') || n.includes('terminal')) return Terminal;
    if (n.includes('git') || n.includes('github')) return GithubIcon;
    if (n.includes('ai') || n.includes('gemini') || n.includes('openai')) return Bot;
    if (n.includes('api') || n.includes('rest') || n.includes('postman') || n.includes('selenium')) return Globe;
    if (n.includes('hebrew') || n.includes('english') || n.includes('language')) return Languages;
    if (n.includes('system') || n.includes('orchestration')) return Cpu;
    if (n.includes('mobile') || n.includes('smartphone')) return Smartphone;
    return Settings; // Default
};

const SkillsSection = ({ skills }: SkillsSectionProps) => {
    // Group skills by their `group` property dynamically
    const categories = useMemo(() => {
        const groups: Record<string, Skill[]> = {};
        skills.forEach(skill => {
            const groupName = skill.group || "Other";
            if (!groups[groupName]) groups[groupName] = [];
            groups[groupName].push(skill);
        });

        return Object.entries(groups).map(([title, skills]) => ({
            id: title.toLowerCase().replace(/\s+/g, '-'),
            title,
            skills
        }));
    }, [skills]);

    const [activeTab, setActiveTab] = useState(categories[0]?.id || "");
    const tabsRef = useRef<HTMLDivElement>(null);

    const scrollTabIntoView = (id: string) => {
        const el = document.getElementById(`tab-${id}`);
        if (el && tabsRef.current) {
            const container = tabsRef.current;
            const scrollLeft = el.offsetLeft - (container.offsetWidth / 2) + (el.offsetWidth / 2);
            container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        }
    };

    const handleTabChange = (id: string) => {
        setActiveTab(id);
        scrollTabIntoView(id);
    };

    const activeCategoryData = categories.find(c => c.id === activeTab);

    if (!categories.length) return null;

    return (
        <motion.div
            id="skills"
            className="w-full max-w-7xl mx-auto p-4 md:p-6 my-10 md:my-20"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
        >
            <motion.div 
                className="flex items-center gap-4 mb-10 md:mb-16"
                variants={cardVariants}
            >
                <div className="h-px bg-gray-300 dark:bg-gray-700 flex-1" />
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white uppercase transition-all hover:tracking-widest duration-500">Skills</h2>
                <div className="h-px bg-gray-300 dark:bg-gray-700 flex-1" />
            </motion.div>

            {/* Mobile Tabs Wrapper */}
            <div className="md:hidden mb-8">
                <div 
                    ref={tabsRef}
                    className="flex overflow-x-auto no-scrollbar gap-2 pb-2 px-1 snap-x"
                >
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            id={`tab-${cat.id}`}
                            onClick={() => handleTabChange(cat.id)}
                            className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all snap-center border-2 ${
                                activeTab === cat.id
                                    ? 'bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-500/30'
                                    : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-400'
                            }`}
                        >
                            {cat.title}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="relative min-h-[300px] md:min-h-0">
                {/* Mobile View: Dynamic Card */}
                <div className="md:hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.98 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-gray-800"
                        >
                            <h3 className="text-2xl font-black mb-6 flex items-center gap-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
                                {activeCategoryData?.title}
                            </h3>
                            <div className="grid grid-cols-1 gap-3">
                                {activeCategoryData?.skills.map((skill) => {
                                    const Icon = getSkillIcon(skill.name);
                                    return (
                                        <div
                                            key={skill.name}
                                            className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-transparent hover:border-purple-500/30 transition-all active:scale-[0.98]"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="p-2.5 rounded-xl bg-white dark:bg-gray-700 shadow-sm">
                                                    <Icon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                                </div>
                                                <span className="font-bold text-gray-700 dark:text-gray-200">{skill.name}</span>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-600" />
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Desktop View: Dynamic Grid */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <motion.div
                            key={category.id}
                            className="bg-white dark:bg-gray-800/40 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-800 group hover:border-purple-500/20 transition-all"
                            variants={cardVariants}
                            whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                        >
                            <h3 className="text-lg font-black mb-6 text-gray-900 dark:text-white flex items-center gap-2 group-hover:text-purple-500 transition-colors">
                                <span className="w-1.5 h-6 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full" />
                                {category.title}
                            </h3>
                            <div className="grid gap-2">
                                {category.skills.map((skill) => {
                                    const Icon = getSkillIcon(skill.name);
                                    return (
                                        <motion.div
                                            key={skill.name}
                                            className="flex items-center p-3 rounded-2xl bg-gray-50/50 dark:bg-gray-900/50 border border-transparent hover:border-purple-500/10 transition-all cursor-default"
                                            variants={skillVariants}
                                            whileHover={{ x: 4, backgroundColor: "rgba(139, 92, 246, 0.05)" }}
                                        >
                                            <div className="p-2 rounded-lg bg-white dark:bg-gray-800 mr-4 shadow-sm">
                                                <Icon className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                                            </div>
                                            <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">{skill.name}</span>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default SkillsSection;