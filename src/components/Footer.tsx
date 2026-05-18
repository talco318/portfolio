import { portfolioData } from '../data/portfolio';
import { Github, Linkedin } from 'lucide-react';

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-zinc-950 border-t border-zinc-800 py-10 text-center">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-4">
                        <span className="font-heading text-lg font-bold text-white tracking-tight">
                            TC<span className="text-accent">.</span>
                        </span>
                        <span className="text-zinc-500 text-sm">
                            &copy; {currentYear} {portfolioData.personal.name}
                        </span>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex gap-3">
                            <a
                                href={portfolioData.personal.socialLinks.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-zinc-500 hover:text-white transition-colors cursor-pointer"
                                aria-label="GitHub"
                            >
                                <Github className="w-4 h-4" />
                            </a>
                            <a
                                href={portfolioData.personal.socialLinks.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-zinc-500 hover:text-white transition-colors cursor-pointer"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-4 h-4" />
                            </a>
                        </div>
                        <p className="text-xs text-zinc-600">
                            Built with React, Vite & Tailwind CSS
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};
