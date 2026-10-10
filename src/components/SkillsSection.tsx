import {
    Code2, Database, Globe, Layout,
    Terminal, Cloud,
    Languages, Server, GithubIcon,
    ChevronRight, Cpu, Smartphone, Settings, Bot,
    CheckCircle, Disc, Layers
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState, useRef, useMemo } from 'react';
import { Skill } from '../data/portfolio';
import { soundFx } from '../utils/soundEffects';

interface SkillsSectionProps {
    skills: Skill[];
}

// Icon Mapping Helper
const getSkillIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('python') || n.includes('c++') || n.includes('java') || n.includes('c#') || n === 'c') return Code2;
    if (n.includes('react') || n.includes('html') || n.includes('css') || n.includes('tailwind') || n.includes('angular')) return Layout;
    if (n.includes('node') || n.includes('server')) return Server;
    if (n.includes('sql') || n.includes('mongo') || n.includes('database')) return Database;
    if (n.includes('aws') || n.includes('gcp') || n.includes('cloud') || n.includes('firebase')) return Cloud;
    if (n.includes('linux') || n.includes('bash') || n.includes('terminal')) return Terminal;
    if (n.includes('git') || n.includes('github')) return GithubIcon;
    if (n.includes('ai') || n.includes('gemini') || n.includes('openai')) return Bot;
    if (n.includes('api') || n.includes('rest') || n.includes('postman') || n.includes('selenium')) return Globe;
    if (n.includes('hebrew') || n.includes('english') || n.includes('language')) return Languages;
    if (n.includes('system') || n.includes('orchestration') || n.includes('automation')) return Cpu;
    if (n.includes('mobile') || n.includes('smartphone')) return Smartphone;
    return Settings;
};

// Sector Color Accents
const SECTOR_ACCENTS: Record<string, { color: string; badge: string; text: string }> = {
    Backend: {
        color: '#06b6d4',
        badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
        text: 'text-cyan-400',
    },
    Frontend: {
        color: '#6366f1',
        badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
        text: 'text-indigo-400',
    },
    'AI & Tools': {
        color: '#a855f7',
        badge: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
        text: 'text-purple-400',
    },
    'Databases & Cloud': {
        color: '#10b981',
        badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
        text: 'text-emerald-400',
    },
    Languages: {
        color: '#f59e0b',
        badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
        text: 'text-amber-400',
    },
};

export const SkillsSection = ({ skills }: SkillsSectionProps) => {
    const trackRef = useRef<HTMLDivElement>(null);

    // Group skills by their `group` property dynamically
    const categories = useMemo(() => {
        const groups: Record<string, Skill[]> = {};
        skills.forEach((skill) => {
            const groupName = skill.group || 'Other';
            if (!groups[groupName]) groups[groupName] = [];
            groups[groupName].push(skill);
        });

        return Object.entries(groups).map(([title, catSkills]) => ({
            id: title.toLowerCase().replace(/\s+/g, '-'),
            title,
            skills: catSkills,
            accent: SECTOR_ACCENTS[title] || {
                color: '#6366f1',
                badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
                text: 'text-indigo-400',
            },
        }));
    }, [skills]);

    const [activeIndex, setActiveIndex] = useState(0);
    const activeCategory = categories[activeIndex] || categories[0];

    const isManualLockRef = useRef(false);
    const lockTimerRef = useRef<number | null>(null);

    // Scroll-Driven Channel Selection Engine
    const { scrollYProgress } = useScroll({
        target: trackRef,
        offset: ['start start', 'end end'],
    });

    useMotionValueEvent(scrollYProgress, 'change', (latest) => {
        // If user explicitly clicked a channel, lock strictly until scroll completes
        if (isManualLockRef.current || !categories.length) return;
        const total = categories.length;
        const targetIndex = Math.min(total - 1, Math.max(0, Math.floor(latest * total)));

        if (targetIndex !== activeIndex) {
            setActiveIndex(targetIndex);
            soundFx.playPop(520 + targetIndex * 50, 0.04);
        }
    });

    // Clicking channel button jumps directly to sector without flashing intermediate cards
    const handleChannelClick = (index: number) => {
        soundFx.playPop(520 + index * 50, 0.04);
        setActiveIndex(index);

        isManualLockRef.current = true;
        if (lockTimerRef.current) clearTimeout(lockTimerRef.current);

        // Unlock only after smooth scroll has completely settled (1600ms) or if user manually wheels
        const unlock = () => {
            isManualLockRef.current = false;
            window.removeEventListener('wheel', onUserInterrupt);
            window.removeEventListener('touchmove', onUserInterrupt);
        };

        const onUserInterrupt = () => {
            unlock();
        };

        window.addEventListener('wheel', onUserInterrupt, { passive: true, once: true });
        window.addEventListener('touchmove', onUserInterrupt, { passive: true, once: true });

        lockTimerRef.current = window.setTimeout(unlock, 1600);

        if (trackRef.current) {
            const rect = trackRef.current.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const trackTop = rect.top + scrollTop;
            const trackHeight = trackRef.current.offsetHeight - window.innerHeight;
            // Center within the sector's slot
            const sectorCenter = (index + 0.5) / categories.length;
            const targetY = trackTop + sectorCenter * trackHeight;

            window.scrollTo({
                top: targetY,
                behavior: 'smooth',
            });
        }
    };

    if (!categories.length) return null;

    return (
        <section
            id="skills"
            ref={trackRef}
            className="relative min-h-[260vh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
        >
            {/* Sticky Viewport Stage: Locks on screen as user scrolls through the 260vh track */}
            <div className="sticky top-20 md:top-24 z-20">
                {/* Background Ambient Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full filter blur-[150px] pointer-events-none" />

                {/* Section Header */}
                <div className="flex flex-col items-center mb-8 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs font-mono text-indigo-400 mb-3 font-semibold">
                        <Disc className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
                        <span>SCROLL TO ROTATE TECHNICAL ARSENAL</span>
                    </div>

                    <div className="flex items-center gap-4 w-full">
                        <div className="h-px bg-zinc-200/80 dark:bg-zinc-800 flex-1" />
                        <h2 className="font-heading text-3xl md:text-5xl font-black uppercase tracking-tight text-zinc-900 dark:text-white">
                            Technical <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-transparent bg-clip-text">Arsenal</span>
                        </h2>
                        <div className="h-px bg-zinc-200/80 dark:bg-zinc-800 flex-1" />
                    </div>
                </div>

                {/* Main Rotary Stage Grid */}
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start">
                    {/* LEFT PANEL: The Rotary Sector Dial & Channels (4 cols) */}
                    <div className="lg:col-span-4 rounded-3xl border border-zinc-200/80 dark:border-white/10 bg-white/80 dark:bg-[#12131b]/90 backdrop-blur-2xl p-5 sm:p-6 shadow-xl shadow-zinc-900/5 dark:shadow-2xl">
                        <div className="flex items-center justify-between text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-4 pb-3 border-b border-zinc-200/80 dark:border-zinc-800">
                            <span>SECTORS</span>
                            <span className="font-bold text-indigo-600 dark:text-indigo-400">
                                CHANNEL [0{activeIndex + 1}/0{categories.length}]
                            </span>
                        </div>

                        {/* Channel Station List */}
                        <div className="flex flex-col gap-2">
                            {categories.map((cat, idx) => {
                                const isSelected = activeIndex === idx;
                                const FirstIcon = getSkillIcon(cat.skills[0]?.name || 'default');

                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => handleChannelClick(idx)}
                                        className={`relative w-full p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                                            isSelected
                                                ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 border-zinc-950 dark:border-white font-bold shadow-xl'
                                                : 'bg-zinc-50 dark:bg-zinc-900/40 hover:bg-zinc-100 dark:hover:bg-zinc-900 border-zinc-200/70 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`p-2 rounded-xl transition-colors ${
                                                    isSelected
                                                        ? 'bg-white/20 text-white dark:bg-zinc-950/20 dark:text-zinc-950'
                                                        : 'bg-zinc-200/60 dark:bg-white/5 text-zinc-500'
                                                }`}
                                            >
                                                <FirstIcon className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <div className="text-xs font-mono font-bold tracking-tight">
                                                    {cat.title}
                                                </div>
                                                <div className={`text-[10px] font-mono ${isSelected ? 'opacity-80' : 'text-zinc-400'}`}>
                                                    CHANNEL 0{idx + 1} • {cat.skills.length} MODULES
                                                </div>
                                            </div>
                                        </div>

                                        {isSelected && (
                                            <motion.div
                                                layoutId="activeRotaryIndicator"
                                                className="w-2.5 h-2.5 rounded-full bg-indigo-500 dark:bg-indigo-600 shadow-[0_0_8px_rgba(99,102,241,0.8)]"
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Interactive Rotary Gauge Helper */}
                        <div className="mt-5 pt-3 border-t border-zinc-200/80 dark:border-zinc-800 text-[11px] font-mono text-zinc-500 flex items-center justify-between">
                            <span>Scroll mouse to rotate sectors</span>
                            <span className="text-indigo-500 font-bold">Auto-Sync</span>
                        </div>
                    </div>

                    {/* RIGHT PANEL: Active Sector Skills Showcase (8 cols) */}
                    <div className="lg:col-span-8 rounded-3xl border border-zinc-200/80 dark:border-white/10 bg-white/85 dark:bg-[#0e0f17]/95 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl min-h-[440px] flex flex-col justify-between">
                        <div>
                            {/* Sector Active Banner */}
                            <div className="flex items-center justify-between border-b border-zinc-200/80 dark:border-zinc-800 pb-5 mb-6">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2.5 rounded-2xl border ${activeCategory.accent.badge}`}>
                                        <Layers className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-heading text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white">
                                            {activeCategory.title}
                                        </h3>
                                        <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                                            Sector Readiness Index // {activeCategory.skills.length} Production Systems
                                        </span>
                                    </div>
                                </div>

                                <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center gap-1.5 font-bold">
                                    <CheckCircle className="w-3.5 h-3.5" />
                                    <span>ACTIVE</span>
                                </span>
                            </div>

                            {/* Cascading Skill Cards */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeCategory.id}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ duration: 0.16, ease: 'easeOut' }}
                                    className="grid grid-cols-1 sm:grid-cols-2 gap-3.5"
                                >
                                    {activeCategory.skills.map((skill, sIdx) => {
                                        const Icon = getSkillIcon(skill.name);

                                        return (
                                            <motion.div
                                                key={skill.name}
                                                initial={{ opacity: 0, scale: 0.96 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.15, delay: Math.min(sIdx * 0.02, 0.1) }}
                                                className="group/card p-4 rounded-2xl border border-zinc-200/90 dark:border-white/10 bg-zinc-50/70 dark:bg-zinc-900/50 hover:bg-white dark:hover:bg-zinc-900 hover:border-indigo-500/40 transition-all flex flex-col justify-between"
                                            >
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="flex items-center gap-2.5">
                                                        <div className="p-2 rounded-xl bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 group-hover/card:scale-110 transition-transform">
                                                            <Icon className={`w-4 h-4 ${activeCategory.accent.text}`} />
                                                        </div>
                                                        <h4 className="font-heading font-black text-sm text-zinc-900 dark:text-white">
                                                            {skill.name}
                                                        </h4>
                                                    </div>

                                                    <span className="text-[11px] font-mono font-bold text-zinc-500 dark:text-zinc-400 px-2 py-0.5 rounded bg-zinc-200/60 dark:bg-white/5">
                                                        {skill.proficiency}%
                                                    </span>
                                                </div>

                                                {/* Skill Proficiency Bar */}
                                                <div className="w-full h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${skill.proficiency}%` }}
                                                        transition={{ duration: 0.6, delay: sIdx * 0.04 }}
                                                        className="h-full rounded-full"
                                                        style={{ backgroundColor: activeCategory.accent.color }}
                                                    />
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Bottom Status Bar */}
                        <div className="mt-6 pt-4 border-t border-zinc-200/80 dark:border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-500">
                            <span>Scroll down to advance to next sector</span>
                            <span className="text-zinc-700 dark:text-zinc-300 font-semibold flex items-center gap-1">
                                <span>60 FPS Hardware Sync</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;