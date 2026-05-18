import {
    Code2, Database, Globe, Layout,
    Terminal, Cloud,
    Languages, Server, GithubIcon,
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
        <motion.section
            id="skills"
            className="relative w-full max-w-7xl mx-auto p-4 md:p-6 my-8 md:my-14 overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
        >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
            <motion.div 
                className="relative z-10 flex items-center gap-4 mb-8 md:mb-10"
                variants={cardVariants}
            >
                <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-1" />
                <h2 className="font-heading text-3xl md:text-5xl font-black uppercase tracking-tight bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text">Skills</h2>
                <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-1" />
            </motion.div>

            {/* Mobile Tabs Wrapper */}
            <div className="md:hidden mb-6">
                <div 
                    ref={tabsRef}
                    className="flex overflow-x-auto no-scrollbar gap-2 pb-2 px-1 snap-x"
                >
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            id={`tab-${cat.id}`}
                            onClick={() => handleTabChange(cat.id)}
                            className={`whitespace-nowrap px-5 py-2.5 rounded-xl text-sm font-bold transition-all snap-center border min-h-[44px] flex items-center justify-center cursor-pointer ${
                                activeTab === cat.id
                                    ? 'bg-zinc-900 dark:bg-white border-zinc-900 dark:border-white text-white dark:text-zinc-900 shadow-lg'
                                    : 'bg-white dark:bg-zinc-800 border-zinc-100 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-600'
                            }`}
                            aria-selected={activeTab === cat.id}
                            role="tab"
                            aria-label={`View ${cat.title} skills`}
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
                            className="bg-white dark:bg-zinc-900/80 rounded-2xl p-6 shadow-sm border border-zinc-100 dark:border-zinc-800"
                        >
                            <h3 className="text-xl font-black mb-6 text-zinc-900 dark:text-white font-heading flex items-center gap-2">
                                <span className="w-1.5 h-5 bg-accent rounded-full" />
                                {activeCategoryData?.title}
                            </h3>
                            <div className="grid grid-cols-1 gap-2.5">
                                {activeCategoryData?.skills.map((skill) => {
                                    const Icon = getSkillIcon(skill.name);
                                    return (
                                        <div
                                            key={skill.name}
                                            className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-transparent hover:border-accent/20 transition-all"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-lg bg-white dark:bg-zinc-700/50 shadow-sm">
                                                    <Icon className="w-4 h-4 text-accent" />
                                                </div>
                                                <span className="font-semibold text-sm text-zinc-700 dark:text-zinc-200">{skill.name}</span>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-zinc-300 dark:text-zinc-600" />
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Desktop View: Dynamic Grid */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {categories.map((category) => (
                        <motion.div
                            key={category.id}
                            className="bg-white dark:bg-zinc-900/80 rounded-2xl p-6 shadow-sm border border-zinc-100 dark:border-zinc-800 group hover:border-zinc-200 dark:hover:border-zinc-700 transition-all duration-300"
                            variants={cardVariants}
                            whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.06)' }}
                        >
                            <h3 className="text-base font-black mb-5 text-zinc-900 dark:text-white flex items-center gap-2 font-heading">
                                <span className="w-1 h-5 bg-accent rounded-full" />
                                {category.title}
                            </h3>
                            <div className="grid gap-1.5">
                                {category.skills.map((skill) => {
                                    const Icon = getSkillIcon(skill.name);
                                    return (
                                        <motion.div
                                            key={skill.name}
                                            className="flex items-center p-2.5 rounded-xl bg-zinc-50/50 dark:bg-zinc-800/30 border border-transparent hover:border-blue-500/30 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 hover:shadow-sm transition-all cursor-default group/item"
                                            variants={skillVariants}
                                            whileHover={{ x: 6 }}
                                        >
                                            <div className="p-1.5 rounded-lg bg-white dark:bg-zinc-800 mr-3 shadow-sm group-hover/item:scale-110 group-hover/item:shadow-md transition-all duration-300">
                                                <Icon className="w-4 h-4 text-blue-500 dark:text-blue-400 flex-shrink-0" />
                                            </div>
                                            <span className="font-medium text-sm text-zinc-600 dark:text-zinc-300 group-hover/item:text-blue-600 dark:group-hover/item:text-blue-300 transition-colors">{skill.name}</span>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default SkillsSection;