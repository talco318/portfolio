import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Line {
    type: "input" | "output" | "error" | "system";
    text: string;
}

export const TerminalEasterEgg = () => {
    const [lines, setLines] = useState<Line[]>([
        { type: "system", text: "Welcome to TalOS v2.4.9" },
        { type: "system", text: "Type 'help' to see available commands." },
    ]);
    const [input, setInput] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-scroll to bottom of terminal ONLY (without jumping the whole page)
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [lines]);



    const handleCommand = (cmd: string) => {
        const trimmed = cmd.trim().toLowerCase();
        
        const newLines = [...lines, { type: "input", text: `guest@talcohen:~$ ${cmd}` } as Line];
        
        switch (trimmed) {
            case "help":
                newLines.push({ type: "output", text: "Available commands:\n  whoami      - display current user\n  skills      - run tal.print_skills()\n  experience  - load work history\n  education   - load degrees\n  ls          - list directory contents\n  pwd         - print working directory\n  date        - print system date\n  clear       - clear terminal" });
                break;
            case "who":
            case "whoami":
                newLines.push({ type: "output", text: "Tal Cohen - Full Stack Developer & Tech Enthusiast." });
                break;
            case "skills":
            case "tal.print_skills()":
                newLines.push({ type: "output", text: "[ 'Python', 'React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'Linux' ]" });
                break;
            case "experience":
                newLines.push({ type: "output", text: "Loading timeline...\n- Backend Optimization\n- Workflow Automation\n- Scalable Infrastructure Engineering" });
                break;
            case "education":
                newLines.push({ type: "output", text: "B.Sc. in Computer Science" });
                break;
            case "pwd":
                newLines.push({ type: "output", text: "/home/guest/portfolio" });
                break;
            case "date":
                newLines.push({ type: "output", text: new Date().toString() });
                break;
            case "ls":
            case "ls -la":
            case "ll":
                newLines.push({ type: "output", text: "drwxr-xr-x 4 guest guest 4096 Mar 23 20:55 .\ndrwxr-xr-x 3 root  root  4096 Mar 23 20:00 ..\ndrwxr-xr-x 2 guest guest 4096 Mar 23 20:55 projects\n-rw-r--r-- 1 guest guest   42 Mar 23 20:55 resume.pdf\n-rwxr-xr-x 1 guest guest   75 Mar 23 20:55 skills.py\ndrwx------ 2 guest guest 4096 Mar 23 20:55 top_secret_hacks" });
                break;
            case "cat top_secret_hacks/":
            case "cat top_secret_hacks":
            case "more top_secret_hacks":
            case "less top_secret_hacks":
            case "cd top_secret_hacks":
            case "cd top_secret_hacks/":
            case "cd top_secert_hacks": // Typo support for user tests :)
            case "cd top_secert_hacks/":
                newLines.push({ type: "error", text: "bash: top_secret_hacks: Permission denied. Clearance level 'Recruiter' required." });
                break;
            case "cat resume.pdf":
            case "more resume.pdf":
            case "less resume.pdf":
            case "open resume.pdf":
            case "resume.pdf":
                newLines.push({ type: "output", text: "Downloading resume... Just kidding, I haven't uploaded it here yet. DM me on LinkedIn!" });
                break;
            case "cat skills.py":
            case "more skills.py":
            case "less skills.py":
                newLines.push({ type: "output", text: "import awesomeness\n\ndef hire_tal():\n    return 'Great success!'" });
                break;
            case "python skills.py":
            case "python3 skills.py":
            case "./skills.py":
                newLines.push({ type: "output", text: "[ 'Python', 'React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'Linux', 'Great Success' ]" });
                break;
            case "cd":
            case "cd ~":
            case "cd /":
                newLines.push({ type: "output", text: "You are already at home." });
                break;
            case "cd projects":
            case "cd projects/":
                newLines.push({ type: "system", text: "Navigating to Projects section..." });
                setTimeout(() => {
                    const el = document.getElementById("projects");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                }, 800);
                break;
            case "sudo make me a sandwich":
                newLines.push({ type: "output", text: "I'm a Next-Gen React Terminal, not your butler. Make it yourself 🥪" });
                break;
            case "sudo su":
            case "sudo":
                newLines.push({ type: "error", text: "Nice try. This incident will be reported to Santa 🎅." });
                break;
            case "rm -rf /":
            case "sudo rm -rf /":
                newLines.push({ type: "error", text: "Terminal wiped... just kidding. You can't delete my portfolio that easily!" });
                break;
            case "clear":
                setLines([]);
                setInput("");
                return; // skip setting newLines
            case "exit":
                newLines.push({ type: "system", text: "You can't escape the TalOS Bento Box! 😈" });
                break;
            case "uname":
            case "uname -a":
                newLines.push({ type: "output", text: "Linux TalOS 5.15.0-60-generic #66-Ubuntu SMP x86_64 GNU/Linux" });
                break;
            case "history":
                newLines.push({ type: "output", text: "1. whoami\n2. ls\n3. python skills.py\n4. clear\n... wait, I'm not saving your history." });
                break;
            case "":
                break;
            default:
                if (trimmed.startsWith("cd ")) {
                    const dir = trimmed.split("cd ")[1];
                    newLines.push({ type: "error", text: `bash: cd: ${dir}: No such file or directory` });
                } else if (trimmed.startsWith("cat ") || trimmed.startsWith("more ") || trimmed.startsWith("less ") || trimmed.startsWith("nano ") || trimmed.startsWith("vim ")) {
                    const file = trimmed.split(" ")[1];
                    if (["resume.pdf", "skills.py", "top_secret_hacks", "projects"].includes(file)) {
                        newLines.push({ type: "error", text: `bash: ${file}: Is a directory or cannot be parsed.` });
                    } else {
                        newLines.push({ type: "error", text: `bash: ${file}: No such file or directory` });
                    }
                } else if (trimmed.startsWith("python ")) {
                    const file = trimmed.split("python ")[1];
                    newLines.push({ type: "error", text: `python: can't open file '${file}': [Errno 2] No such file or directory` });
                } else if (trimmed.startsWith("echo ")) {
                    newLines.push({ type: "output", text: cmd.slice(5) });
                } else if (trimmed.startsWith("ping ")) {
                    const host = trimmed.split("ping ")[1];
                    newLines.push({ type: "output", text: `PING ${host} (192.168.1.1): 56 data bytes\n64 bytes from 192.168.1.1: icmp_seq=0 ttl=64 time=1.234 ms\n--- ${host} ping statistics ---\n1 packets transmitted, 1 packets received, 0.0% packet loss` });
                } else if (trimmed.startsWith("mkdir ") || trimmed.startsWith("touch ") || trimmed.startsWith("rm ")) {
                    newLines.push({ type: "error", text: `bash: Read-only file system. Cannot alter portfolio structure.` });
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
                className="w-full h-full flex flex-col bg-[#1e1e1e] rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800 font-mono text-sm md:text-base relative group"
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
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
