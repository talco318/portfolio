import { portfolioData } from '../data/portfolio';
import { Github, Linkedin } from 'lucide-react';

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="backdrop-blur-xl bg-white/40 dark:bg-zinc-950/80 border-t border-white/20 dark:border-white/5 py-12 text-center relative z-20">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-3">
                        <span className="font-heading text-lg font-black text-zinc-900 dark:text-white tracking-tight flex items-center gap-1">
                            TC<span className="w-1.5 h-1.5 rounded-full bg-indigo-500 inline-block shadow-[0_0_6px_rgba(99,102,241,0.8)]" />
                        </span>
                        <span className="text-zinc-500 text-sm">
                            &copy; {currentYear} {portfolioData.personal.name}. All rights reserved.
                        </span>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex gap-2">
                            <a
                                href={portfolioData.personal.socialLinks.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="glass-card p-2 rounded-xl text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all cursor-pointer"
                                aria-label="GitHub"
                            >
                                <Github className="w-4 h-4" />
                            </a>
                            <a
                                href={portfolioData.personal.socialLinks.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="glass-card p-2 rounded-xl text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all cursor-pointer"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-4 h-4" />
                            </a>
                        </div>
                        <div className="flex items-center gap-3 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                            <a
                                href="/llms.txt"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                                title="LLM context file for AI search engines"
                            >
                                llms.txt
                            </a>
                            <span>•</span>
                            <span>Updated: <time dateTime="2026-10-06" className="font-semibold text-zinc-700 dark:text-zinc-300">Oct 2026</time></span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
