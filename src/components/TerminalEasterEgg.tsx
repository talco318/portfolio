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
                className="w-full h-full flex flex-col bg-[#1e1e1e] rounded-2xl overflow-hidden shadow-xl border border-zinc-200 dark:border-zinc-800 font-mono text-sm md:text-base relative group"
                onClick={() => inputRef.current?.focus()}
            >
                {/* Mac-style Window Top Bar */}
                <div className="flex items-center px-6 py-4 bg-[#2d2d2d] border-b border-gray-800 shrink-0">
                    <div className="flex gap-2">
                        <div className="w-3.5 h-3.5 rounded-full bg-red-500" title="Close" />
                        <div className="w-3.5 h-3.5 rounded-full bg-yellow-500" />
                        <div className="w-3.5 h-3.5 rounded-full bg-green-500" />
                    </div>
                    <div className="mx-auto text-gray-400 text-xs tracking-wider opacity-60">guest@talcohen:~</div>
                </div>

                {/* Terminal Window */}
                <div ref={containerRef} className="flex-1 p-6 overflow-y-auto text-gray-300 scroll-smooth">
                    <AnimatePresence>
                        {lines.map((line, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.2 }}
                                className="mb-2 whitespace-pre-wrap leading-relaxed"
                            >
                                {line.type === "input" && <span className="text-blue-400">{line.text}</span>}
                                {line.type === "output" && <span className="text-gray-300">{line.text}</span>}
                                {line.type === "error" && <span className="text-red-400">{line.text}</span>}
                                {line.type === "system" && <span className="text-emerald-400">{line.text}</span>}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    
                    {/* Input Line */}
                    <div className="flex items-center mt-2 group">
                        <span className="text-blue-400 mr-3 shrink-0">guest@talcohen:~$</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="bg-transparent outline-none flex-1 text-gray-300 caret-emerald-500 font-bold"
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
