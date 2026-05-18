import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { TerminalEasterEgg } from './TerminalEasterEgg';
import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { Globe, Cpu, Database, Server, Layout, Code2, Bot, Terminal, Globe2 } from 'lucide-react';
import { PortfolioData } from '../data/portfolio';

const GitHubCalendar = lazy(() => import('react-github-calendar').then(module => ({ default: module.GitHubCalendar })));

interface AboutSectionProps {
    personal: PortfolioData['personal'];
    skills: PortfolioData['skills'];
}

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

// Icon Mapping Helper for the mini-tech-stack
const getTechIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('python') || n.includes('c++')) return <Code2 className="w-5 h-5 md:w-6 md:h-6 text-accent" />;
    if (n.includes('react') || n.includes('html')) return <Layout className="w-5 h-5 md:w-6 md:h-6 text-accent" />;
    if (n.includes('node') || n.includes('server')) return <Server className="w-5 h-5 md:w-6 md:h-6 text-emerald-500" />;
    if (n.includes('sql') || n.includes('mongo')) return <Database className="w-5 h-5 md:w-6 md:h-6 text-accent" />;
    if (n.includes('aws') || n.includes('gcp')) return <Globe2 className="w-5 h-5 md:w-6 md:h-6 text-amber-500" />;
    if (n.includes('linux') || n.includes('bash')) return <Terminal className="w-5 h-5 md:w-6 md:h-6 text-emerald-500" />;
    if (n.includes('ai') || n.includes('gemini')) return <Bot className="w-5 h-5 md:w-6 md:h-6 text-violet-500" />;
    if (n.includes('typescript')) return <Code2 className="w-5 h-5 md:w-6 md:h-6 text-accent" />;
    return <Cpu className="w-5 h-5 md:w-6 md:h-6 text-zinc-400" />;
};

const BentoCard = ({ children, className, title }: { children: React.ReactNode, className?: string, title?: string }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);
    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
        setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }, []);

    const cardRef = useRef<HTMLDivElement>(null);
    const rectRef = useRef<DOMRect | null>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isTouch) return;
        if (!rectRef.current && cardRef.current) {
            rectRef.current = cardRef.current.getBoundingClientRect();
        }
        if (!rectRef.current) return;

        const { left, top, width, height } = rectRef.current;
        const mouseX = e.clientX - left;
        const mouseY = e.clientY - top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        rectRef.current = null;
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            variants={fadeUp}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => {
                if (cardRef.current) rectRef.current = cardRef.current.getBoundingClientRect();
            }}
            onMouseLeave={handleMouseLeave}
            style={{ 
                rotateX: isTouch ? 0 : rotateX, 
                rotateY: isTouch ? 0 : rotateY, 
                transformStyle: "preserve-3d" 
            }}
            className={`bg-white dark:bg-zinc-900/80 rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-sm border border-zinc-100 dark:border-zinc-800 relative overflow-hidden group transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/5 dark:hover:shadow-purple-500/5 hover:border-blue-200 dark:hover:border-purple-500/30 ${className}`}
        >
            {title && <h3 className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-zinc-400 font-bold mb-3 md:mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                {title}
            </h3>}
            <div className="h-full flex flex-col" style={{ transform: isTouch ? "none" : "translateZ(20px)" }}>
                {children}
            </div>
        </motion.div>
    );
};

export const AboutSection = ({ personal, skills }: AboutSectionProps) => {
    // Take first 8 important skills for the mini-grid
    const topSkills = skills.slice(0, 8);

    return (
        <motion.section 
            id="about"
            className="relative w-full max-w-7xl mx-auto p-4 md:p-6 my-6 md:my-14 overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
        >
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
            <motion.div className="flex items-center gap-4 mb-10 md:mb-12 px-2 md:px-4 relative z-10" variants={fadeUp}>
                <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-1" />
                <h2 className="font-heading text-3xl md:text-5xl font-black uppercase tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-transparent bg-clip-text">About</h2>
                <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-1" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5">
                {/* 1. Bio Block */}
                <BentoCard className="md:col-span-3 min-h-0 md:min-h-[280px]">
                    <h3 className="text-xl md:text-3xl font-bold mb-4 md:mb-6 text-zinc-900 dark:text-white leading-tight font-heading">
                        I build <span className="text-accent">robust backend systems</span> and interactive user experiences.
                    </h3>
                    <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-base md:text-lg mb-6 md:mb-8">
                        {personal.bio}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {personal.interests.map((interest) => (
                            <span key={interest} className="px-3 py-1.5 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400 rounded-lg text-xs md:text-sm border border-zinc-100 dark:border-zinc-800 font-medium">
                                {interest}
                            </span>
                        ))}
                    </div>
                </BentoCard>

                {/* 2. Photo */}
                <BentoCard className="hidden md:flex md:col-span-1 aspect-square p-2 items-center justify-center">
                    <div className="w-full h-full rounded-2xl overflow-hidden transition-all duration-700">
                        <img 
                            src={personal.avatar} 
                            alt={`Portrait photo of ${personal.name}, Full Stack Software Developer`} 
                            width={300}
                            height={300}
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
                            <div className="absolute inset-0 bg-accent/20 blur-2xl rounded-full" />
                            <Globe className="w-10 h-10 text-accent relative z-10" />
                        </div>
                        <div className="flex flex-col gap-1 mt-4">
                            <span className="text-xl font-bold text-zinc-900 dark:text-white block">{personal.location}</span>
                            <span className="text-sm text-zinc-500 dark:text-zinc-400 block">{personal.locationDetail}</span>
                        </div>
                    </div>
                </BentoCard>

                {/* 5. Tech Stack */}
                <BentoCard className="md:col-span-2 min-h-0 flex flex-col justify-center" title="Technologies">
                    <div className="flex-1 flex flex-col justify-center py-2 md:py-0">
                        <div className="grid grid-cols-4 gap-4 md:gap-8 justify-items-center">
                            {topSkills.map((tech) => (
                                <div key={tech.name} className="flex flex-col items-center gap-2 group/icon transition-transform hover:-translate-y-1 cursor-pointer">
                                    <div className="p-2 md:p-3 bg-zinc-50 dark:bg-zinc-800 rounded-xl md:rounded-2xl shadow-sm group-hover/icon:shadow-md transition-all">
                                        {getTechIcon(tech.name)}
                                    </div>
                                    <span className="text-[9px] md:text-xs font-semibold text-zinc-500 dark:text-zinc-400">{tech.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </BentoCard>

                {/* 6. GitHub Activity */}
                <BentoCard className="hidden md:flex md:col-span-2 overflow-hidden flex flex-col justify-center" title="Activity">
                    <div className="w-full flex justify-center py-2 md:py-4 opacity-90 transition-opacity flex-1 items-center">
                         <div className="scale-[0.8] lg:scale-[0.95] origin-center min-w-[320px] md:min-w-0 flex justify-center">
                            <Suspense fallback={<div className="w-[300px] h-[100px] bg-zinc-100 dark:bg-zinc-800 animate-pulse rounded-lg" />}>
                                <GitHubCalendar 
                                    username={personal.githubUsername} 
                                    blockSize={12}
                                    blockMargin={4}
                                    fontSize={12}
                                />
                            </Suspense>
                        </div>
                    </div>
                </BentoCard>
            </div>
        </motion.section>
    );
};

export default AboutSection;