import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "../data/portfolio";

interface Line {
    type: "input" | "output" | "error" | "system";
    text: string;
}

export const TerminalEasterEgg = () => {
    // Generate skill string from data
    const skillListStr = useMemo(() => 
        `[ ${portfolioData.skills.slice(0, 10).map(s => `'${s.name}'`).join(', ')} ... ]`, 
    []);

    const [lines, setLines] = useState<Line[]>([
        { type: "system", text: `Welcome to TalOS v${new Date().getFullYear()}.3.21` },
        { type: "system", text: "Type 'help' to see available commands." },
    ]);
    const [input, setInput] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [lines]);

    const handleCommand = (cmd: string) => {
        const trimmed = cmd.trim().toLowerCase();
        const newLines = [...lines, { type: "input", text: `guest@talcohen:~$ ${cmd}` } as Line];
        
        const personal = portfolioData.personal;

        switch (trimmed) {
            case "help":
                newLines.push({ type: "output", text: "Available commands:\n  whoami      - display current user\n  skills      - run tal.print_skills()\n  experience  - load work history\n  ls          - list directory contents\n  pwd         - print working directory\n  date        - print system date\n  clear       - clear terminal" });
                break;
            case "who":
            case "whoami":
                newLines.push({ type: "output", text: `${personal.name} - ${personal.title} stationed in ${personal.location}.` });
                break;
            case "skills":
            case "tal.print_skills()":
                newLines.push({ type: "output", text: skillListStr });
                break;
            case "experience":
                newLines.push({ type: "output", text: `Loading timeline...\n${portfolioData.experience.map(exp => `- ${exp.position} @ ${exp.company}`).join('\n')}` });
                break;
            case "pwd":
                newLines.push({ type: "output", text: "/home/guest/portfolio" });
                break;
            case "date":
                newLines.push({ type: "output", text: new Date().toString() });
                break;
            case "ls":
            case "ls -la":
                newLines.push({ type: "output", text: `drwxr-xr-x 4 guest guest 4096 ${new Date().toLocaleDateString()} .\ndrwxr-xr-x 3 root  root  4096 ${new Date().toLocaleDateString()} ..\ndrwxr-xr-x 2 guest guest 4096 projects\n-rw-r--r-- 1 guest guest   42 resume.pdf\n-rwxr-xr-x 1 guest guest   75 skills.py` });
                break;
            case "cat resume.pdf":
                newLines.push({ type: "output", text: `Objective: ${personal.tagline}\nBio: ${personal.bio.slice(0, 50)}... [TRUNCATED]` });
                break;
            case "python skills.py":
            case "./skills.py":
                newLines.push({ type: "output", text: "Great success! All systems operational." });
                break;
            case "cd projects":
            case "cd projects/":
                newLines.push({ type: "system", text: "Navigating to Projects section..." });
                setTimeout(() => {
                    const el = document.getElementById("projects");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                }, 800);
                break;
            case "clear":
                setLines([]);
                setInput("");
                return;
            case "exit":
                newLines.push({ type: "system", text: "You can't escape the TalOS Bento Box! 😈" });
                break;
            case "uname":
            case "uname -a":
                newLines.push({ type: "output", text: "Linux TalOS 5.15.0-60-generic #66-Ubuntu SMP x86_64" });
                break;
            case "":
                break;
            default:
                if (trimmed.startsWith("echo ")) {
                    newLines.push({ type: "output", text: cmd.slice(5) });
                } else {
                    newLines.push({ type: "error", text: `bash: ${trimmed}: command not found` });
                }
                break;
        }

        setLines(newLines);
        setInput("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleCommand(input);
        }
    };

    return (
        <div className="w-full h-full min-h-[300px] flex">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="w-full h-full flex flex-col glass-card rounded-2xl md:rounded-3xl overflow-hidden font-mono text-sm md:text-base relative group shadow-2xl"
                onClick={() => inputRef.current?.focus()}
            >
                {/* Mac-style Glass Top Bar */}
                <div className="flex items-center px-6 py-3.5 bg-white/40 dark:bg-white/5 border-b border-white/20 dark:border-white/10 shrink-0">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,0.6)]" title="Close" />
                        <div className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.6)]" />
                        <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)]" />
                    </div>
                    <div className="mx-auto text-zinc-500 dark:text-zinc-400 text-xs tracking-wider opacity-75 font-semibold">guest@talcohen:~</div>
                </div>

                {/* Terminal Window */}
                <div ref={containerRef} className="flex-1 p-6 overflow-y-auto text-zinc-800 dark:text-zinc-200 scroll-smooth">
                    <AnimatePresence>
                        {lines.map((line, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.2 }}
                                className="mb-2 whitespace-pre-wrap leading-relaxed"
                            >
                                {line.type === "input" && <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{line.text}</span>}
                                {line.type === "output" && <span className="text-zinc-700 dark:text-zinc-300">{line.text}</span>}
                                {line.type === "error" && <span className="text-rose-500 dark:text-rose-400 font-semibold">{line.text}</span>}
                                {line.type === "system" && <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{line.text}</span>}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    
                    {/* Input Line */}
                    <div className="flex items-center mt-3 group">
                        <span className="text-indigo-600 dark:text-indigo-400 font-semibold mr-3 shrink-0">guest@talcohen:~$</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="bg-transparent outline-none flex-1 text-zinc-900 dark:text-white caret-indigo-500 font-bold"
                            spellCheck="false"
                            autoComplete="off"
                            aria-label="Terminal command input"
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
