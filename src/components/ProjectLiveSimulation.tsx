import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Cpu, Database, Zap, RefreshCw } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

interface ProjectLiveSimulationProps {
    projectName: string;
    techStack: string[];
}

export const ProjectLiveSimulation: React.FC<ProjectLiveSimulationProps> = ({
    projectName,
    techStack,
}) => {
    const [throughput, setThroughput] = useState(124.6);
    const [latency, setLatency] = useState(8.4);
    const [isBursting, setIsBursting] = useState(false);
    const [packetsProcessed, setPacketsProcessed] = useState(482910);

    // Live fluctuating metrics simulation
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isBursting) {
                setThroughput((prev) => +(prev + (Math.random() * 6 - 3)).toFixed(1));
                setLatency((prev) => +(Math.max(4.2, prev + (Math.random() * 0.8 - 0.4))).toFixed(1));
                setPacketsProcessed((prev) => prev + Math.floor(Math.random() * 140 + 80));
            }
        }, 1200);

        return () => clearInterval(interval);
    }, [isBursting]);

    const handleTriggerBurst = () => {
        setIsBursting(true);
        soundFx.playChime();
        setThroughput(342.8);
        setLatency(14.2);

        setTimeout(() => {
            setIsBursting(false);
            setThroughput(132.4);
            setLatency(7.9);
            soundFx.playPop(720, 0.05);
        }, 1800);
    };

    return (
        <div className="relative w-full h-full min-h-[280px] bg-[#0c0d13] text-white p-5 rounded-2xl border border-zinc-800/80 flex flex-col justify-between overflow-hidden font-mono select-none">
            {/* Ambient Background Matrix Grid */}
            <div
                className="absolute inset-0 opacity-[0.06] pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, #6366f1 1px, transparent 0)',
                    backgroundSize: '24px 24px',
                }}
            />

            {/* Top Telemetry Status Bar */}
            <div className="relative z-10 flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-2 text-xs">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span className="text-zinc-300 font-bold uppercase tracking-wider text-[11px]">
                        SIMULATION ENGINE ACTIVE
                    </span>
                    <span className="text-zinc-600 hidden sm:inline">•</span>
                    <span className="text-zinc-500 text-[10px] hidden sm:inline">{projectName}</span>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-semibold">
                        60 FPS RUNTIME
                    </span>
                </div>
            </div>

            {/* Central Animated Architecture Circuit */}
            <div className="relative z-10 py-4 my-auto">
                <div className="grid grid-cols-3 gap-2 sm:gap-4 items-center text-center">
                    {/* Node 1: Edge Ingestion */}
                    <div className="p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 flex flex-col items-center">
                        <Activity className="w-4 h-4 text-cyan-400 mb-1" />
                        <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">
                            Edge Ingress
                        </span>
                        <span className="text-xs text-white font-bold mt-0.5">TLS 1.3 / HTTP3</span>
                    </div>

                    {/* Node 2: Neural Core */}
                    <motion.div
                        animate={{
                            borderColor: isBursting ? ['#6366f1', '#a855f7', '#6366f1'] : 'rgba(99, 102, 241, 0.4)',
                        }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-500/40 flex flex-col items-center shadow-lg shadow-indigo-500/10 relative"
                    >
                        <Cpu className="w-4 h-4 text-indigo-400 mb-1 animate-pulse" />
                        <span className="text-[10px] text-indigo-300 uppercase tracking-wider font-semibold">
                            Agent / Engine
                        </span>
                        <span className="text-xs text-indigo-100 font-bold mt-0.5">
                            {techStack[0] || 'Core AI'}
                        </span>
                    </motion.div>

                    {/* Node 3: Storage / Outflow */}
                    <div className="p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 flex flex-col items-center">
                        <Database className="w-4 h-4 text-purple-400 mb-1" />
                        <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">
                            Distributed Sink
                        </span>
                        <span className="text-xs text-white font-bold mt-0.5">Zero-Copy Cache</span>
                    </div>
                </div>

                {/* Animated Dynamic Stream Tracer Line */}
                <div className="relative w-full h-1.5 bg-zinc-800/80 rounded-full mt-3 overflow-hidden">
                    <motion.div
                        className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full"
                        animate={{ left: ['-20%', '120%'] }}
                        transition={{
                            duration: isBursting ? 0.6 : 1.4,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                    />
                    {isBursting && (
                        <motion.div
                            className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-purple-400 to-transparent rounded-full"
                            animate={{ left: ['-20%', '120%'] }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear', delay: 0.2 }}
                        />
                    )}
                </div>
            </div>

            {/* Live Metrics Grid & Load Test Trigger */}
            <div className="relative z-10 pt-3 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-4">
                    <div>
                        <span className="text-[10px] text-zinc-500 block">THROUGHPUT</span>
                        <span className="text-sm font-bold text-cyan-400">{throughput} k/s</span>
                    </div>
                    <div>
                        <span className="text-[10px] text-zinc-500 block">P99 LATENCY</span>
                        <span className={`text-sm font-bold ${latency < 10 ? 'text-emerald-400' : 'text-amber-400'}`}>
                            {latency} ms
                        </span>
                    </div>
                    <div className="hidden sm:block">
                        <span className="text-[10px] text-zinc-500 block">OPS COUNTER</span>
                        <span className="text-sm font-bold text-zinc-300">
                            {packetsProcessed.toLocaleString()}
                        </span>
                    </div>
                </div>

                {/* Burst Action Button */}
                <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={handleTriggerBurst}
                    disabled={isBursting}
                    className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 font-bold text-[11px] transition-all cursor-pointer shadow-md ${
                        isBursting
                            ? 'bg-indigo-600 border-indigo-400 text-white'
                            : 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-zinc-200 hover:text-white'
                    }`}
                >
                    {isBursting ? (
                        <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>PROCESSING BURST...</span>
                        </>
                    ) : (
                        <>
                            <Zap className="w-3.5 h-3.5 text-amber-400" />
                            <span>TEST LOAD</span>
                        </>
                    )}
                </motion.button>
            </div>
        </div>
    );
};
