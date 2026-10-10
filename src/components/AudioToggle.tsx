import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

export const AudioToggle = () => {
    const [isMuted, setIsMuted] = useState(soundFx.getMuted());

    useEffect(() => {
        const unsubscribe = soundFx.subscribe((muted) => setIsMuted(muted));
        return () => unsubscribe();
    }, []);

    const handleToggle = () => {
        soundFx.toggleMute();
    };

    return (
        <button
            onClick={handleToggle}
            aria-label={isMuted ? 'Enable micro-haptic sound effects' : 'Mute sound effects'}
            title={isMuted ? 'Sound FX: Off' : 'Sound FX: On'}
            className="group relative p-2 rounded-full text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-all cursor-pointer flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
            <span className="sr-only">{isMuted ? 'Enable audio' : 'Mute audio'}</span>

            {isMuted ? (
                <VolumeX className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
            ) : (
                <div className="flex items-center gap-[2.5px] h-3.5 px-0.5">
                    <Volume2 className="w-4 h-4 text-blue-500 dark:text-blue-400 mr-0.5" />
                    {/* Dynamic Sound Wave Bars */}
                    {[1, 2, 3].map((bar) => (
                        <motion.span
                            key={bar}
                            className="w-[2px] bg-blue-500 dark:bg-blue-400 rounded-full inline-block"
                            animate={{
                                height: ['4px', `${8 + bar * 3}px`, '3px'],
                            }}
                            transition={{
                                duration: 0.8 + bar * 0.2,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: bar * 0.15,
                            }}
                        />
                    ))}
                </div>
            )}
        </button>
    );
};
