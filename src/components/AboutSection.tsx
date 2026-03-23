import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { TerminalEasterEgg } from './TerminalEasterEgg';
import { GitHubCalendar } from 'react-github-calendar';
import { Code2, Globe, Cpu, Database, Server, Smartphone, GithubIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

interface PersonalData {
    bio: string;
    interests: string[];
    avatar: string;
    name: string;
}

interface AboutSectionProps {
    personal: PersonalData;
}

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const BentoCard = ({ children, className, title }: { children: React.ReactNode, className?: string, title?: string }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);
    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
        setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isTouch) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            variants={fadeUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ 
                rotateX: isTouch ? 0 : rotateX, 
                rotateY: isTouch ? 0 : rotateY, 
                transformStyle: "preserve-3d" 
            }}
            className={`bg-white dark:bg-[#1e1e1e] rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-8 shadow-xl border border-gray-100 dark:border-gray-800 relative overflow-hidden group transition-colors hover:border-purple-500/30 dark:hover:border-purple-500/30 ${className}`}
        >
            {title && <h3 className="text-[10px] md:text-xs uppercase tracking-widest text-gray-400 font-bold mb-3 md:mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                {title}
            </h3>}
            <div className="h-full flex flex-col" style={{ transform: isTouch ? "none" : "translateZ(20px)" }}>
                {children}
            </div>
        </motion.div>
    );
};

export const AboutSection = ({ personal }: AboutSectionProps) => {
    return (
        <motion.section 
            id="about"
            className="w-full max-w-7xl mx-auto p-4 md:p-6 my-4 md:my-20"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
        >
            <motion.div className="flex items-center gap-4 mb-6 md:mb-12 px-2 md:px-4" variants={fadeUp}>
                <div className="h-px bg-gray-200 dark:bg-gray-800 flex-1" />
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white uppercase transition-all hover:tracking-widest duration-500">About</h2>
                <div className="h-px bg-gray-200 dark:bg-gray-800 flex-1" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
                {/* 1. Bio Block */}
                <BentoCard className="md:col-span-3 min-h-0 md:min-h-[280px]">
                    <h3 className="text-xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-900 dark:text-white leading-tight">
                        I build <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">robust backend systems</span> and interactive user experiences.
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base md:text-lg mb-6 md:mb-8">
                        {personal.bio}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {personal.interests.map((interest) => (
                            <span key={interest} className="px-2.5 py-1 bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 rounded-lg text-xs md:text-sm border border-gray-100 dark:border-gray-800">
                                {interest}
                            </span>
                        ))}
                    </div>
                </BentoCard>

                {/* 2. Photo */}
                <BentoCard className="hidden md:flex md:col-span-1 aspect-square p-2 items-center justify-center">
                    <div className="w-full h-full rounded-[1.5rem] overflow-hidden transition-all duration-700">
                        <img 
                            src={personal.avatar} 
                            alt={personal.name} 
                            className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700" 
                        />
                    </div>
                </BentoCard>

                {/* 3. Terminal Block */}
                <motion.div className="md:col-span-3 min-h-[250px] md:min-h-[350px] flex" variants={fadeUp}>
                    <TerminalEasterEgg />
                </motion.div>

                {/* 4. Location */}
                <BentoCard className="hidden md:flex md:col-span-1 flex-col items-center justify-center text-center py-10" title="Location">
                    <div className="relative mb-4 flex-1 flex flex-col items-center justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-blue-500/30 blur-2xl rounded-full" />
                            <Globe className="w-10 h-10 text-blue-500 relative z-10" />
                        </div>
                        <div className="flex flex-col gap-1 mt-4">
                            <span className="text-xl font-bold text-gray-900 dark:text-white block">Tel Aviv, Israel</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400 block">Remote-first mindset</span>
                        </div>
                    </div>
                </BentoCard>

                {/* 5. Tech Stack */}
                <BentoCard className="md:col-span-2 min-h-0 flex flex-col justify-center" title="Technologies">
                    <div className="flex-1 flex flex-col justify-center py-2 md:py-0">
                        <div className="grid grid-cols-4 gap-4 md:gap-8 justify-items-center">
                            {[
                                { name: 'Python', icon: <Code2 className="w-5 h-5 md:w-6 md:h-6 text-yellow-500" /> },
                                { name: 'React', icon: <Smartphone className="w-5 h-5 md:w-6 md:h-6 text-blue-400" /> },
                                { name: 'AWS', icon: <Globe className="w-5 h-5 md:w-6 md:h-6 text-orange-400" /> },
                                { name: 'Linux', icon: <Cpu className="w-5 h-5 md:w-6 md:h-6 text-emerald-500" /> },
                                { name: 'MongoDB', icon: <Database className="w-5 h-5 md:w-6 md:h-6 text-green-500" /> },
                                { name: 'Node.js', icon: <Server className="w-5 h-5 md:w-6 md:h-6 text-green-600" /> },
                                { name: 'TypeScript', icon: <Code2 className="w-5 h-5 md:w-6 md:h-6 text-blue-600" /> },
                                { name: 'SQL', icon: <Database className="w-5 h-5 md:w-6 md:h-6 text-blue-500" /> },
                            ].map((tech) => (
                                <div key={tech.name} className="flex flex-col items-center gap-2 group/icon transition-transform hover:-translate-y-1">
                                    <div className="p-2 md:p-3 bg-gray-50 dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-sm group-hover/icon:shadow-md transition-all">
                                        {tech.icon}
                                    </div>
                                    <span className="text-[9px] md:text-xs font-semibold text-gray-500 dark:text-gray-400">{tech.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </BentoCard>

                {/* 6. GitHub Activity - HIDDEN ON MOBILE (Clean UX) */}
                <BentoCard className="hidden md:flex md:col-span-2 overflow-hidden flex flex-col justify-center" title="Activity">
                    <div className="w-full flex justify-center py-2 md:py-4 opacity-90 transition-opacity flex-1 items-center">
                         <div className="scale-[0.8] lg:scale-[0.95] origin-center min-w-[320px] md:min-w-0 flex justify-center">
                            <GitHubCalendar 
                                username="talco318" 
                                blockSize={12}
                                blockMargin={4}
                                fontSize={12}
                            />
                        </div>
                    </div>
                </BentoCard>

                {/* Mobile GitHub Placeholder (Small sleek card) */}
                <a 
                    href="https://github.com/talco318" 
                    target="_blank" 
                    rel="noreferrer"
                    className="md:hidden flex items-center justify-between p-5 bg-white dark:bg-[#1e1e1e] rounded-[1.5rem] border border-gray-100 dark:border-gray-800 shadow-md active:scale-95 transition-all"
                >
                    <div className="flex items-center gap-3">
                        <GithubIcon className="w-6 h-6 text-gray-900 dark:text-white" />
                        <span className="font-bold text-gray-900 dark:text-white">View GitHub Activity</span>
                    </div>
                    <Globe className="w-5 h-5 text-purple-500" />
                </a>
            </div>
        </motion.section>
    );
};

export default AboutSection;