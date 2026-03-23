import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { TerminalEasterEgg } from './TerminalEasterEgg';
import { GitHubCalendar } from 'react-github-calendar';
import { Code2, Globe, Cpu } from 'lucide-react';

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

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className={`bg-white dark:bg-[#1e1e1e] rounded-[2rem] p-6 shadow-xl border border-gray-100 dark:border-gray-800 relative overflow-hidden group transition-colors hover:border-purple-500/30 dark:hover:border-purple-500/30 ${className}`}
        >
            {title && <h3 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                {title}
            </h3>}
            <div style={{ transform: "translateZ(20px)" }}>
                {children}
            </div>
        </motion.div>
    );
};

export const AboutSection = ({ personal }: AboutSectionProps) => {
    return (
        <motion.section 
            id="about"
            className="w-full max-w-7xl mx-auto p-4 md:p-6 my-20"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
        >
            <motion.div className="flex items-center gap-4 mb-12 px-4" variants={fadeUp}>
                <div className="h-px bg-gray-200 dark:bg-gray-800 flex-1" />
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white">ABOUT</h2>
                <div className="h-px bg-gray-200 dark:bg-gray-800 flex-1" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-auto">
                {/* 1. Main Bio (Span 3) */}
                <BentoCard className="md:col-span-3 min-h-[280px] flex flex-col justify-center">
                    <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
                        I build <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">robust backend systems</span> and interactive user experiences.
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg mb-8 max-w-3xl">
                        {personal.bio}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {personal.interests.map((interest) => (
                            <span key={interest} className="px-3 py-1 bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 rounded-lg text-sm border border-gray-100 dark:border-gray-800">
                                {interest}
                            </span>
                        ))}
                    </div>
                </BentoCard>

                {/* 2. Photo (1x1 - Smaller) */}
                <BentoCard className="md:col-span-1 aspect-square p-2 flex items-center justify-center">
                    <div className="w-full h-full rounded-[1.5rem] overflow-hidden transition-all duration-700">
                        <img 
                            src={personal.avatar} 
                            alt={personal.name} 
                            className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700" 
                        />
                    </div>
                </BentoCard>

                {/* 3. Location (1x1) */}
                <BentoCard className="md:col-span-1 flex flex-col items-center justify-center text-center py-10" title="Location">
                    <div className="relative mb-4">
                        <div className="absolute inset-0 bg-blue-500/30 blur-2xl rounded-full" />
                        <Globe className="w-10 h-10 text-blue-500 relative z-10" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-xl font-bold text-gray-900 dark:text-white block">Tel Aviv, Israel</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 block">Remote-first mindset</span>
                    </div>
                </BentoCard>

                {/* 4. Terminal (Span 3) */}
                <motion.div className="md:col-span-3 min-h-[300px]" variants={fadeUp}>
                    <TerminalEasterEgg />
                </motion.div>

                {/* 5. Tech Stack Mini Grid (2x1) */}
                <BentoCard className="md:col-span-2 flex flex-col justify-center" title="Core Stack">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-2">
                        {[
                            { name: 'Python', icon: <Code2 className="w-6 h-6 text-yellow-500" /> },
                            { name: 'React', icon: <Code2 className="w-6 h-6 text-blue-400" /> },
                            { name: 'AWS', icon: <Globe className="w-6 h-6 text-orange-400" /> },
                            { name: 'Linux', icon: <Cpu className="w-6 h-6 text-emerald-500" /> },
                        ].map((tech) => (
                            <div key={tech.name} className="flex flex-col items-center gap-2 group/icon">
                                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-2xl group-hover/icon:scale-110 group-hover/icon:bg-gray-100 dark:group-hover/icon:bg-gray-700 transition-all">
                                    {tech.icon}
                                </div>
                                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </BentoCard>

                {/* 6. GitHub Heatmap (2x1 - Smaller focus) */}
                <BentoCard className="md:col-span-2" title="GitHub Contributions">
                    <div className="w-full h-full flex items-center justify-center pt-2 md:pt-4">
                         <div className="scale-[0.85] origin-center opacity-80 group-hover:opacity-100 transition-opacity whitespace-nowrap overflow-hidden">
                            <GitHubCalendar 
                                username="talco318" 
                                blockSize={12}
                                blockMargin={4}
                                fontSize={12}
                            />
                        </div>
                    </div>
                </BentoCard>
            </div>
        </motion.section>
    );
};

export default AboutSection;