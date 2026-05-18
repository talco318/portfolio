import { motion } from 'framer-motion';
import {
    Code2, Database, Layout,
    Terminal, Cloud, 
    FileJson, Server, GithubIcon
} from 'lucide-react';

const techStack = [
    { name: 'Python', icon: Code2 },
    { name: 'React', icon: Layout },
    { name: 'TypeScript', icon: FileJson },
    { name: 'Node.js', icon: Server },
    { name: 'AWS', icon: Cloud },
    { name: 'Docker', icon: Terminal },
    { name: 'MongoDB', icon: Database },
    { name: 'GitHub Action', icon: GithubIcon },
    { name: 'Linux', icon: Terminal },
    { name: 'Bash', icon: Terminal },
    { name: 'C++', icon: Code2 },
    { name: 'Java', icon: Code2 },
    { name: 'Jenkins', icon: Server },
];

export const TechMarquee = () => {
    // Duplicate the stack to create a seamless loop
    const duplicatedStack = [...techStack, ...techStack];

    return (
        <div className="w-full overflow-hidden bg-zinc-50 dark:bg-zinc-900/50 py-8 my-10 relative flex border-y border-zinc-100 dark:border-zinc-800">
            {/* Left and Right gradient fades for smooth entering/exiting */}
            <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-zinc-50 dark:from-zinc-900/50 to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-zinc-50 dark:from-zinc-900/50 to-transparent z-10 pointer-events-none" />

            <motion.div
                className="flex whitespace-nowrap items-center w-max"
                style={{ willChange: 'transform' }}
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 30,
                }}
            >
                {duplicatedStack.map((tech, index) => {
                    const Icon = tech.icon;
                    return (
                        <div
                            key={index}
                            className="flex items-center gap-3 px-8 text-lg font-semibold text-zinc-500 dark:text-zinc-400 mx-4"
                        >
                            <Icon size={24} className="text-accent" />
                            {tech.name}
                        </div>
                    );
                })}
            </motion.div>
        </div>
    );
};
