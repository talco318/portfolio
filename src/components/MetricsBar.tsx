import { motion, useInView, useMotionValue, animate } from 'framer-motion';
import { Download, Layers, ShieldCheck, Star, ExternalLink } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import { soundFx } from '../utils/soundEffects';

interface MetricItem {
    id: string;
    numValue: number;
    prefix?: string;
    suffix: string;
    decimals: number;
    label: string;
    detail: string;
    icon: typeof Download;
    highlight: string;
    highlightColor: string;
    href?: string;
    hrefTitle?: string;
}

const metrics: MetricItem[] = [
    {
        id: 'downloads',
        numValue: 6.7,
        suffix: 'K+',
        decimals: 1,
        label: 'Universal IDE RTL Downloads',
        detail: '5.0★ rating on Open VSX • Global Developer Tool',
        icon: Download,
        highlight: '5.0★ Open VSX',
        highlightColor: 'text-amber-500 bg-amber-500/10 border-amber-500/20 group-hover:border-amber-500/40',
        href: 'https://open-vsx.org/extension/talco/universal-ide-rtl',
        hrefTitle: 'Open Universal IDE RTL in Open VSX Store (6.7K+ Downloads)',
    },
    {
        id: 'projects',
        numValue: 15,
        suffix: '+',
        decimals: 0,
        label: 'Production & AI Systems',
        detail: 'Full-Stack Platforms, Automation & Cloud Microservices',
        icon: Layers,
        highlight: 'Production',
        highlightColor: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    },
    {
        id: 'quality',
        numValue: 100,
        suffix: '%',
        decimals: 0,
        label: 'Code Integrity & DX',
        detail: 'Type-Safe Architecture, High Performance & Maintainability',
        icon: ShieldCheck,
        highlight: 'Clean Code',
        highlightColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    },
];

const AnimatedCounter = ({
    target,
    decimals,
    suffix,
    prefix = '',
}: {
    target: number;
    decimals: number;
    suffix: string;
    prefix?: string;
}) => {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: '-40px' });
    const count = useMotionValue(0);
    const [display, setDisplay] = useState('0');

    useEffect(() => {
        if (!inView) return;

        const controls = animate(count, target, {
            duration: 1.8,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (latest) => {
                setDisplay(latest.toFixed(decimals));
            },
        });

        return () => controls.stop();
    }, [inView, target, decimals, count]);

    return (
        <span ref={ref} className="tabular-nums">
            {prefix}
            {display}
            {suffix}
        </span>
    );
};

export const MetricsBar = () => {
    return (
        <section className="relative z-20 max-w-6xl mx-auto px-4 -mt-4 mb-16 md:mb-24">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="glass-card rounded-2xl md:rounded-3xl border border-zinc-200/80 dark:border-white/10 shadow-xl shadow-zinc-900/5 dark:shadow-black/40 overflow-hidden"
            >
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-200/80 dark:divide-zinc-800/80">
                    {metrics.map((metric, idx) => {
                        const Icon = metric.icon;
                        const isLink = Boolean(metric.href);

                        return (
                            <motion.div
                                key={metric.id}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: idx * 0.1 }}
                                className="group p-6 md:p-8 flex flex-col justify-between transition-colors duration-300 hover:bg-zinc-50/50 dark:hover:bg-white/[0.02] relative"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    {isLink ? (
                                        <a
                                            href={metric.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={() => soundFx.playClick()}
                                            aria-label={metric.hrefTitle || metric.label}
                                            title={metric.hrefTitle}
                                            className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:text-white hover:bg-indigo-600 hover:border-indigo-500 dark:hover:bg-indigo-600 dark:hover:border-indigo-500 group-hover:scale-105 transition-all cursor-pointer shadow-sm relative group/btn"
                                        >
                                            <Icon className="w-5 h-5 group-hover/btn:animate-bounce" />
                                            <span className="sr-only">Open extension store</span>
                                        </a>
                                    ) : (
                                        <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 group-hover:scale-105 group-hover:border-indigo-500/30 transition-all">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                    )}

                                    {isLink ? (
                                        <a
                                            href={metric.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={() => soundFx.playClick()}
                                            title={metric.hrefTitle}
                                            className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold border flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer ${metric.highlightColor}`}
                                        >
                                            {metric.id === 'downloads' && (
                                                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                                            )}
                                            <span>{metric.highlight}</span>
                                            <ExternalLink className="w-3 h-3 opacity-70" />
                                        </a>
                                    ) : (
                                        <span
                                            className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold border flex items-center gap-1 ${metric.highlightColor}`}
                                        >
                                            {metric.highlight}
                                        </span>
                                    )}
                                </div>

                                <div>
                                    <div className="flex items-baseline gap-2 mb-1.5">
                                        {isLink ? (
                                            <a
                                                href={metric.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={() => soundFx.playClick()}
                                                title={metric.hrefTitle}
                                                className="group/num flex items-center gap-2 cursor-pointer"
                                            >
                                                <span className="font-heading font-black text-3xl md:text-4xl tracking-tight text-zinc-950 dark:text-white group-hover/num:text-indigo-600 dark:group-hover/num:text-indigo-400 transition-colors">
                                                    <AnimatedCounter
                                                        target={metric.numValue}
                                                        decimals={metric.decimals}
                                                        suffix={metric.suffix}
                                                        prefix={metric.prefix}
                                                    />
                                                </span>
                                                <ExternalLink className="w-4 h-4 text-zinc-400 group-hover/num:text-indigo-500 opacity-0 group-hover/num:opacity-100 transition-all -translate-y-0.5" />
                                            </a>
                                        ) : (
                                            <span className="font-heading font-black text-3xl md:text-4xl tracking-tight text-zinc-950 dark:text-white">
                                                <AnimatedCounter
                                                    target={metric.numValue}
                                                    decimals={metric.decimals}
                                                    suffix={metric.suffix}
                                                    prefix={metric.prefix}
                                                />
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="font-heading font-bold text-sm md:text-base text-zinc-800 dark:text-zinc-200 mb-1">
                                        {metric.label}
                                    </h3>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
                                        {metric.detail}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>
        </section>
    );
};

export default MetricsBar;
