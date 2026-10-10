import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Terminal, Cpu, Sparkles, Database } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

interface NodeConfig {
    id: string;
    label: string;
    icon: typeof Terminal;
    color: string;
    strokeColor: string;
    initialPos: { top?: string; bottom?: string; left?: string; right?: string };
    anchorOffset: { x: number; y: number }; // relative to center
}

const NODES: NodeConfig[] = [
    {
        id: 'python',
        label: 'python.core',
        icon: Terminal,
        color: 'text-cyan-500 dark:text-cyan-400',
        strokeColor: '#06b6d4',
        initialPos: { top: '22%', left: '8%' },
        anchorOffset: { x: -380, y: -160 },
    },
    {
        id: 'react',
        label: 'react.ts',
        icon: Cpu,
        color: 'text-indigo-500 dark:text-indigo-400',
        strokeColor: '#6366f1',
        initialPos: { top: '18%', right: '10%' },
        anchorOffset: { x: 380, y: -190 },
    },
    {
        id: 'ai',
        label: 'ai.agents',
        icon: Sparkles,
        color: 'text-purple-500 dark:text-purple-400',
        strokeColor: '#a855f7',
        initialPos: { bottom: '24%', left: '10%' },
        anchorOffset: { x: -360, y: 170 },
    },
    {
        id: 'systems',
        label: 'distributed.systems',
        icon: Database,
        color: 'text-emerald-500 dark:text-emerald-400',
        strokeColor: '#10b981',
        initialPos: { bottom: '26%', right: '8%' },
        anchorOffset: { x: 360, y: 190 },
    },
];

export const InteractiveEnergyNetwork = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [center, setCenter] = useState({ x: 0, y: 0 });
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    // Track dynamic drag offsets for all 4 nodes
    const dragOffsets = {
        python: { x: useMotionValue(0), y: useMotionValue(0) },
        react: { x: useMotionValue(0), y: useMotionValue(0) },
        ai: { x: useMotionValue(0), y: useMotionValue(0) },
        systems: { x: useMotionValue(0), y: useMotionValue(0) },
    };

    const springConfigs = { damping: 20, stiffness: 220 };
    const smoothSprings = {
        python: { x: useSpring(dragOffsets.python.x, springConfigs), y: useSpring(dragOffsets.python.y, springConfigs) },
        react: { x: useSpring(dragOffsets.react.x, springConfigs), y: useSpring(dragOffsets.react.y, springConfigs) },
        ai: { x: useSpring(dragOffsets.ai.x, springConfigs), y: useSpring(dragOffsets.ai.y, springConfigs) },
        systems: { x: useSpring(dragOffsets.systems.x, springConfigs), y: useSpring(dragOffsets.systems.y, springConfigs) },
    };

    const [paths, setPaths] = useState<Record<string, string>>({});

    // Update container center on resize
    useEffect(() => {
        const updateCenter = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setCenter({ x: rect.width / 2, y: rect.height / 2 });
            }
        };
        updateCenter();
        window.addEventListener('resize', updateCenter);
        return () => window.removeEventListener('resize', updateCenter);
    }, []);

    // 60fps loop to compute elastic Bezier curves
    useEffect(() => {
        let frameId: number;

        const renderPaths = () => {
            if (!center.x) return;

            const newPaths: Record<string, string> = {};
            NODES.forEach((node) => {
                const nodeKey = node.id as keyof typeof smoothSprings;
                const ox = smoothSprings[nodeKey].x.get();
                const oy = smoothSprings[nodeKey].y.get();

                const nodeX = center.x + node.anchorOffset.x + ox;
                const nodeY = center.y + node.anchorOffset.y + oy;

                // Central nucleus focal coordinates
                const startX = center.x;
                const startY = center.y;

                // Organic curvature with tension sag
                const dx = nodeX - startX;
                const dy = nodeY - startY;
                const midX = (startX + nodeX) / 2;
                const midY = (startY + nodeY) / 2 + Math.min(Math.abs(dx) * 0.15, 45);

                newPaths[node.id] = `M ${startX} ${startY} Q ${midX} ${midY} ${nodeX} ${nodeY}`;
            });

            setPaths(newPaths);
            frameId = requestAnimationFrame(renderPaths);
        };

        frameId = requestAnimationFrame(renderPaths);
        return () => cancelAnimationFrame(frameId);
    }, [center]);

    return (
        <div ref={containerRef} className="hidden lg:block absolute inset-0 pointer-events-none z-20 overflow-hidden">
            {/* SVG Elastic Tension Energy Cables */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                    <linearGradient id="nucleusGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
                    </linearGradient>
                    <filter id="cableGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Central Anchor Nucleus Pulse */}
                {center.x > 0 && (
                    <g transform={`translate(${center.x}, ${center.y})`}>
                        <circle r="6" fill="url(#nucleusGlow)" filter="url(#cableGlow)" className="animate-pulse" />
                        <circle r="16" fill="none" stroke="rgba(99, 102, 241, 0.25)" strokeWidth="1" className="animate-ping" style={{ animationDuration: '3s' }} />
                    </g>
                )}

                {/* Elastic Bezier Cables */}
                {NODES.map((node) => {
                    const isHovered = hoveredNode === node.id;
                    const pathD = paths[node.id] || '';
                    if (!pathD) return null;

                    return (
                        <g key={`cable-${node.id}`}>
                            {/* Outer Glow Line */}
                            <path
                                d={pathD}
                                fill="none"
                                stroke={node.strokeColor}
                                strokeWidth={isHovered ? '2.5' : '1.5'}
                                strokeOpacity={isHovered ? '0.75' : '0.22'}
                                strokeDasharray={isHovered ? 'none' : '4 4'}
                                filter="url(#cableGlow)"
                                className="transition-all duration-300"
                            />
                            {/* Travelling Energy Packet */}
                            <path
                                d={pathD}
                                fill="none"
                                stroke="#ffffff"
                                strokeWidth="2.5"
                                strokeDasharray="8 120"
                                className="animate-dash"
                                opacity={isHovered ? 0.9 : 0.4}
                            />
                        </g>
                    );
                })}
            </svg>

            {/* Draggable Physics Badges */}
            {NODES.map((node) => {
                const Icon = node.icon;
                const nodeKey = node.id as keyof typeof dragOffsets;

                return (
                    <motion.div
                        key={node.id}
                        drag
                        dragConstraints={{ left: -140, right: 140, top: -140, bottom: 140 }}
                        dragElastic={0.5}
                        whileDrag={{ scale: 1.15, cursor: 'grabbing' }}
                        onDragStart={() => soundFx.playPop(520, 0.05)}
                        onDragEnd={() => soundFx.playPop(380, 0.08)}
                        onDrag={(_, info) => {
                            dragOffsets[nodeKey].x.set(info.offset.x);
                            dragOffsets[nodeKey].y.set(info.offset.y);
                        }}
                        onHoverStart={() => {
                            setHoveredNode(node.id);
                            soundFx.playPop(620, 0.03, 0.03);
                        }}
                        onHoverEnd={() => setHoveredNode(null)}
                        className="absolute pointer-events-auto cursor-grab"
                        style={node.initialPos}
                    >
                        <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 5 + node.label.length * 0.4, repeat: Infinity, ease: 'easeInOut' }}
                            className="px-4 py-2 rounded-full border border-zinc-200/90 dark:border-white/10 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl flex items-center gap-2.5 shadow-xl shadow-zinc-900/5 dark:shadow-2xl hover:border-indigo-400 dark:hover:border-indigo-400/50 hover:shadow-indigo-500/20 transition-all text-xs font-mono text-zinc-800 dark:text-zinc-200"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${node.color}`} />
                                <span className={`relative inline-flex rounded-full h-2 w-2 bg-current ${node.color}`} />
                            </span>
                            <Icon className={`w-3.5 h-3.5 ${node.color}`} />
                            <span className="font-semibold tracking-tight">{node.label}</span>
                        </motion.div>
                    </motion.div>
                );
            })}
        </div>
    );
};
