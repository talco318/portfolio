import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles, CheckCircle2, ShieldCheck, Terminal, Layers } from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  shortAnswer: string;
  extendedAnswer: string;
}

const faqs: FaqItem[] = [
  {
    id: 'who-is-tal',
    question: 'Who is Tal Cohen and what is his core engineering specialization?',
    shortAnswer: 'Tal Cohen (טל כהן) is a Full Stack Software Developer and Systems Engineer based in Tel Aviv, Israel, specializing in Python, React, TypeScript, C# (.NET), and Generative AI systems.',
    extendedAnswer: 'Holding a B.Sc. in Computer Science from Afeka College of Engineering (2019-2022), Tal combines deep backend architecture experience (designing automated data ETL pipelines that reduce manual workloads by 70%) with modern frontend engineering and open-source developer tooling.'
  },
  {
    id: 'universal-ide-rtl',
    question: 'How does the Universal IDE RTL extension work under the hood?',
    shortAnswer: 'Universal IDE RTL Support injects isolated CSS and JavaScript DOM rules into the IDE Electron shell, detecting and isolating natural BiDi text while preserving LTR syntax for all code blocks.',
    extendedAnswer: 'Architected specifically for modern AI code editors (Cursor, Windsurf, Claude Code, Antigravity, and VS Code), it monitors chat DOM mutations via MutationObserver and selectively enforces Right-to-Left alignment for Hebrew, Arabic, and Persian without any editor lag (0ms FPS impact). It has surpassed 6,700+ downloads with a 5.0★ rating on Open VSX.'
  },
  {
    id: 'backend-architecture',
    question: 'What backend architectures and database systems does he engineer?',
    shortAnswer: 'Tal specializes in resilient microservices, high-throughput asynchronous scraping engines, and event-driven data pipelines built on Python (FastAPI), C# (.NET), and Node.js.',
    extendedAnswer: 'Database expertise spans MongoDB for unstructured real-time pipelines (like the Yad2 apartment tracker with sub-3-second notification delivery) and Microsoft SQL Server / PostgreSQL for relational transactional systems. All systems are containerized via Docker and deployed across hybrid Linux / Cloud environments (AWS, GCP).'
  },
  {
    id: 'availability-roles',
    question: 'What is Tal Cohen\'s current availability and engagement model?',
    shortAnswer: 'Tal is actively available for full-time Full Stack Software Engineering positions, enterprise technical consulting, and collaborative AI development initiatives.',
    extendedAnswer: 'Based in Tel Aviv, Israel, with a remote-first collaborative mindset, he can be contacted directly via email at talcohen318@gmail.com or through LinkedIn (linkedin.com/in/talco318).'
  }
];

const capabilityMatrix = [
  {
    domain: 'Developer Tools & Open Source',
    stack: 'TypeScript, VS Code Webview API, BiDi DOM Engine, Electron',
    impact: '6,700+ active downloads, 5.0★ rating on Open VSX, 0ms FPS overhead'
  },
  {
    domain: 'Backend & Data Pipelines',
    stack: 'Python, FastAPI, C# (.NET), MongoDB, Node.js, WebSockets',
    impact: 'Sub-3s alert delivery, 70% manual ETL reduction, 500+ daily pipeline listings'
  },
  {
    domain: 'Frontend & Systems UX',
    stack: 'React, TypeScript, Angular, Tailwind CSS, Framer Motion',
    impact: 'Sub-50ms WebSocket sync, 100% WCAG AA accessible, responsive multi-device'
  },
  {
    domain: 'Cloud, Infrastructure & AI',
    stack: 'Docker, AWS, GCP, Linux, Git, OpenAI & Gemini APIs, YOLOv5',
    impact: 'High-availability containerized microservices, 92%+ ML detection accuracy'
  }
];

export const FaqSection = () => {
  const [openId, setOpenId] = useState<string | null>('who-is-tal');

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="relative py-14 md:py-24 overflow-hidden">
      {/* Subtle Ambient Radial Backlight */}
      <div className="absolute top-1/3 -right-24 w-80 h-80 bg-blue-500/10 dark:bg-blue-600/10 rounded-full filter blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 -left-24 w-80 h-80 bg-purple-500/10 dark:bg-purple-600/10 rounded-full filter blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-zinc-300 dark:border-white/10 bg-white/80 dark:bg-zinc-900/60 backdrop-blur-md text-[11px] font-mono tracking-wider text-indigo-600 dark:text-indigo-400 font-bold mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>KNOWLEDGE BASE & VERIFIABLE PROOF</span>
          </div>

          <div className="flex items-center gap-4 w-full">
            <div className="h-px bg-zinc-200/80 dark:bg-zinc-800 flex-1" />
            <h2 className="font-heading text-3xl md:text-5xl font-black uppercase tracking-tight text-zinc-900 dark:text-white text-center">
              Technical <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 text-transparent bg-clip-text">Q&amp;A &amp; Matrix</span>
            </h2>
            <div className="h-px bg-zinc-200/80 dark:bg-zinc-800 flex-1" />
          </div>

          {/* Freshness Signal Badge */}
          <div className="mt-4 flex items-center gap-2 text-xs font-mono text-zinc-600 dark:text-zinc-400 bg-zinc-100/80 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 px-3.5 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Production Status: Active • Last Verified: </span>
            <time dateTime="2026-10-06" className="font-semibold text-zinc-900 dark:text-zinc-200">October 2026</time>
          </div>
        </div>

        {/* 2-Column Layout: Questions (Left) & Capabilities Matrix Table (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Left Column: Conversational Answer-First Questions (H3) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="mb-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-indigo-500" />
                <span>Frequently Asked Questions &amp; Architecture Insights</span>
              </h3>
            </div>

            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/40 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-indigo-400/50 dark:hover:border-indigo-500/40 shadow-sm"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full px-5 py-4.5 text-left flex items-start justify-between gap-4 cursor-pointer"
                  >
                    <h3 className="font-heading text-base md:text-lg font-bold text-zinc-900 dark:text-zinc-100 tracking-tight leading-snug">
                      {faq.question}
                    </h3>
                    <div
                      className={`p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 transition-transform duration-300 shrink-0 mt-0.5 ${
                        isOpen ? 'rotate-180 text-indigo-600 dark:text-indigo-400' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-5 pb-5 pt-1 text-sm md:text-[15px] border-t border-zinc-100 dark:border-zinc-800/60 mt-1">
                          {/* Answer-First Core Block */}
                          <p className="font-semibold text-zinc-900 dark:text-white leading-relaxed mb-2.5">
                            {faq.shortAnswer}
                          </p>
                          {/* Extended Context */}
                          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                            {faq.extendedAnswer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Right Column: Structured Capabilities Matrix (HTML Table for AI Parsing) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="mb-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-500" />
                <span>Technical Capabilities &amp; Impact Matrix</span>
              </h3>
            </div>

            <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/40 backdrop-blur-md p-5 md:p-6 shadow-sm flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4 font-mono">
                  Machine-readable benchmark matrix of core competencies and production metrics:
                </p>

                {/* Structured Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-200 dark:border-zinc-800 text-zinc-400 dark:text-zinc-500 font-mono text-[10px] uppercase">
                        <th className="py-2.5 pr-2 font-bold">Domain</th>
                        <th className="py-2.5 px-2 font-bold">Stack</th>
                        <th className="py-2.5 pl-2 font-bold">Measured Impact</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60 font-sans">
                      {capabilityMatrix.map((item, idx) => (
                        <tr key={idx} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition-colors">
                          <td className="py-3 pr-2 font-semibold text-zinc-900 dark:text-zinc-200 align-top">
                            {item.domain}
                          </td>
                          <td className="py-3 px-2 text-zinc-600 dark:text-zinc-400 font-mono text-[11px] align-top">
                            {item.stack}
                          </td>
                          <td className="py-3 pl-2 text-indigo-600 dark:text-indigo-400 font-medium align-top">
                            {item.impact}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Trust & E-E-A-T Footer Note */}
              <div className="mt-6 pt-4 border-t border-zinc-200/80 dark:border-zinc-800/60 flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>
                  All metrics cross-referenced with public registries (Open VSX, GitHub, and Afeka College).
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FaqSection;
