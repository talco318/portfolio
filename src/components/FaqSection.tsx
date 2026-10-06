import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  Sparkles, 
  ShieldCheck, 
  Terminal, 
  Code2, 
  Server, 
  Layout, 
  Cpu, 
  ExternalLink 
} from 'lucide-react';

interface FaqItem {
  id: string;
  number: string;
  category: string;
  question: string;
  shortAnswer: string;
  extendedAnswer: string;
}

const faqs: FaqItem[] = [
  {
    id: 'who-is-tal',
    number: '01',
    category: 'CORE SPECIALIZATION',
    question: 'Who is Tal Cohen and what is his primary engineering focus?',
    shortAnswer: 'Tal Cohen (טל כהן) is a Full Stack Software Developer and Systems Engineer based in Tel Aviv, Israel, specializing in Python, React, TypeScript, C# (.NET), and Generative AI systems.',
    extendedAnswer: 'Holding a B.Sc. in Computer Science from Afeka College of Engineering (2019–2022), Tal combines deep backend architecture experience (designing automated data ETL pipelines that reduce manual workloads by 70%) with modern frontend engineering and open-source developer tooling.'
  },
  {
    id: 'universal-ide-rtl',
    number: '02',
    category: 'IDE TOOLING & BIDI',
    question: 'How does Universal IDE RTL solve Right-to-Left BiDi rendering under the hood?',
    shortAnswer: 'Universal IDE RTL Support injects dynamic CSS and JavaScript DOM rules into the IDE Electron shell, detecting and isolating natural BiDi text while preserving LTR syntax for all code blocks.',
    extendedAnswer: 'Architected specifically for modern AI code editors (Cursor, Windsurf, Claude Code, Antigravity, and VS Code), it monitors chat DOM mutations via MutationObserver and selectively enforces Right-to-Left alignment for Hebrew, Arabic, and Persian without any editor lag (0ms FPS impact). It has surpassed 6,700+ downloads with a 5.0★ rating on Open VSX.'
  },
  {
    id: 'backend-architecture',
    number: '03',
    category: 'SYSTEM ARCHITECTURE',
    question: 'What backend architectures and database systems does he engineer?',
    shortAnswer: 'Tal specializes in resilient microservices, high-throughput asynchronous scraping engines, and event-driven data pipelines built on Python (FastAPI), C# (.NET), and Node.js.',
    extendedAnswer: 'Database expertise spans MongoDB for unstructured real-time pipelines (like the Yad2 apartment tracker with sub-3-second notification delivery) and Microsoft SQL Server / PostgreSQL for relational transactional systems. All systems are containerized via Docker and deployed across hybrid Linux / Cloud environments (AWS, GCP).'
  },
  {
    id: 'availability-roles',
    number: '04',
    category: 'CAREER & ENGAGEMENT',
    question: "What is Tal Cohen's current availability and engagement model?",
    shortAnswer: 'Tal is actively available for full-time Full Stack Software Engineering positions, enterprise technical consulting, and collaborative AI development initiatives.',
    extendedAnswer: 'Based in Tel Aviv, Israel, with a remote-first collaborative mindset, he can be contacted directly via email at talcohen318@gmail.com or through LinkedIn (linkedin.com/in/talco318).'
  }
];

const capabilityCards = [
  {
    title: 'Developer Tools & Open Source',
    icon: Code2,
    badgeColor: 'text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    tags: ['TypeScript', 'VS Code Webview', 'BiDi Engine', 'Electron'],
    metric: '6.7K+ Downloads • 5.0★ Rating',
    subtext: '0ms FPS Overhead • Published on Open VSX',
    link: 'https://open-vsx.org/extension/talco/universal-ide-rtl'
  },
  {
    title: 'Backend & Data Pipelines',
    icon: Server,
    badgeColor: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    tags: ['Python', 'FastAPI', 'C# (.NET)', 'MongoDB', 'Node.js'],
    metric: '<3s Alert Latency • 70% ETL Cut',
    subtext: '500+ Daily Listings Pipeline • Real-time Webhooks'
  },
  {
    title: 'Frontend & Systems UX',
    icon: Layout,
    badgeColor: 'text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    tags: ['React', 'TypeScript', 'Angular', 'Tailwind', 'Framer'],
    metric: 'Sub-50ms WebSocket Sync',
    subtext: '100% WCAG AA Accessible • Responsive Multi-device'
  },
  {
    title: 'Cloud, Infrastructure & AI',
    icon: Cpu,
    badgeColor: 'text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20',
    tags: ['Docker', 'AWS / GCP', 'Linux', 'OpenAI & Gemini APIs'],
    metric: 'Zero-Downtime Containers',
    subtext: '92%+ YOLOv5 ML Accuracy • Hybrid Cloud'
  }
];

export const FaqSection = () => {
  const [openId, setOpenId] = useState<string | null>('who-is-tal');

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="relative py-14 md:py-24 overflow-hidden">
      {/* Subtle Ethereal Ambient Radial Glows */}
      <div className="absolute top-1/4 -right-28 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-28 w-96 h-96 bg-purple-500/10 dark:bg-purple-600/15 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header: Cohesive with About & Projects */}
        <div className="flex flex-col items-center mb-12 md:mb-16">
          <span className="glass-pill px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-3 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Architecture &amp; Knowledge Base</span>
          </span>

          <div className="flex items-center gap-4 w-full">
            <div className="h-px bg-zinc-200/80 dark:bg-zinc-800 flex-1" />
            <h2 className="font-heading text-3xl md:text-5xl font-black uppercase tracking-tight text-zinc-900 dark:text-white text-center">
              Engineering <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 text-transparent bg-clip-text">Philosophy &amp; FAQ</span>
            </h2>
            <div className="h-px bg-zinc-200/80 dark:bg-zinc-800 flex-1" />
          </div>

          {/* Subtitle & Freshness Pill */}
          <div className="flex flex-col sm:flex-row items-center gap-3 mt-4 text-center">
            <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 max-w-xl font-normal leading-relaxed">
              Direct architectural answers, system design rationale, and verified production benchmarks.
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-zinc-600 dark:text-zinc-400 bg-white/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 px-3 py-1 rounded-full shadow-sm backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Status: Verified • </span>
              <time dateTime="2026-10-06" className="font-semibold text-zinc-900 dark:text-zinc-200">October 2026</time>
            </div>
          </div>
        </div>

        {/* 2-Column Bento Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left Column: Unified Spacious Bento Card for Questions (7 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="rounded-3xl border border-zinc-200/80 dark:border-white/10 bg-white/70 dark:bg-zinc-900/40 backdrop-blur-xl p-6 sm:p-8 md:p-10 shadow-xl shadow-zinc-900/5 dark:shadow-black/40 flex-1 flex flex-col justify-between">
              
              {/* Card Header */}
              <div className="flex items-center justify-between pb-6 border-b border-zinc-200/80 dark:border-zinc-800/80 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
                      Architectural Insights &amp; Q&amp;A
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono mt-0.5">
                      DIRECT ENGINEERING CLARIFICATIONS
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-zinc-400 dark:text-zinc-500">
                  [04 QUERIES]
                </span>
              </div>

              {/* Questions List with Clean Elegant Dividers */}
              <div className="divide-y divide-zinc-200/80 dark:divide-zinc-800/80">
                {faqs.map((faq) => {
                  const isOpen = openId === faq.id;
                  return (
                    <div key={faq.id} className="py-6 first:pt-4 last:pb-2 transition-colors">
                      <button
                        onClick={() => toggleFaq(faq.id)}
                        aria-expanded={isOpen}
                        className="w-full text-left flex items-start justify-between gap-4 cursor-pointer group"
                      >
                        <div className="space-y-1.5 flex-1 pr-2">
                          <div className="flex items-center gap-2.5">
                            <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                              {faq.number}
                            </span>
                            <span className="text-zinc-300 dark:text-zinc-700">•</span>
                            <span className="text-[11px] font-mono tracking-wider uppercase font-semibold text-zinc-500 dark:text-zinc-400">
                              {faq.category}
                            </span>
                          </div>

                          <h3 className="font-heading text-base sm:text-lg md:text-xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {faq.question}
                          </h3>
                        </div>

                        <div
                          className={`p-2 rounded-xl transition-all duration-300 shrink-0 mt-1 border ${
                            isOpen
                              ? 'bg-indigo-500 text-white border-indigo-500 shadow-md shadow-indigo-500/25 rotate-180'
                              : 'bg-zinc-100 dark:bg-zinc-800/80 border-zinc-200/80 dark:border-zinc-700/60 text-zinc-500 dark:text-zinc-400 group-hover:border-indigo-400/50 group-hover:text-indigo-600'
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
                            transition={{ duration: 0.35, ease: 'easeOut' }}
                          >
                            <div className="pt-5 pl-1 sm:pl-2 space-y-3.5">
                              {/* Answer-First Highlight Box */}
                              <div className="p-4 rounded-2xl bg-indigo-500/8 dark:bg-indigo-500/10 border-l-4 border-indigo-500 shadow-sm">
                                <p className="text-sm md:text-[15px] font-semibold text-zinc-900 dark:text-white leading-relaxed">
                                  {faq.shortAnswer}
                                </p>
                              </div>

                              {/* Extended Deep Context */}
                              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal pl-1">
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

            </div>
          </div>

          {/* Right Column: Unified Spacious Bento Card for Capabilities (5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="rounded-3xl border border-zinc-200/80 dark:border-white/10 bg-white/70 dark:bg-zinc-900/40 backdrop-blur-xl p-6 sm:p-8 md:p-10 shadow-xl shadow-zinc-900/5 dark:shadow-black/40 flex-1 flex flex-col justify-between">
              
              {/* Card Header */}
              <div className="flex items-center justify-between pb-6 border-b border-zinc-200/80 dark:border-zinc-800/80 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
                      Capabilities &amp; Matrix
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono mt-0.5">
                      VERIFIABLE PRODUCTION METRICS
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-zinc-400 dark:text-zinc-500">
                  [BENCHMARK]
                </span>
              </div>

              {/* 4 Elegant Bento Sub-Cards */}
              <div className="space-y-4 flex-1 flex flex-col justify-between">
                {capabilityCards.map((card, idx) => {
                  const IconComponent = card.icon;
                  return (
                    <div
                      key={idx}
                      className="group rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white/50 dark:bg-zinc-900/30 p-4 sm:p-4.5 transition-all duration-300 hover:border-indigo-400/50 dark:hover:border-indigo-500/40 hover:bg-white/80 dark:hover:bg-zinc-900/60"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className={`p-1.5 rounded-lg border ${card.badgeColor}`}>
                            <IconComponent className="w-3.5 h-3.5" />
                          </div>
                          <h4 className="font-heading font-bold text-sm text-zinc-900 dark:text-white tracking-tight">
                            {card.title}
                          </h4>
                        </div>

                        {card.link && (
                          <a
                            href={card.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View ${card.title} registry`}
                            className="text-zinc-400 hover:text-indigo-500 transition-colors p-1"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>

                      {/* Stack Chips */}
                      <div className="flex flex-wrap gap-1.5 mb-2.5">
                        {card.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-md text-[10px] font-mono text-zinc-600 dark:text-zinc-300 bg-zinc-100/80 dark:bg-zinc-800/80 border border-zinc-200/60 dark:border-zinc-700/60"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Measured Impact Line */}
                      <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/50 flex flex-col gap-0.5">
                        <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                          {card.metric}
                        </span>
                        <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
                          {card.subtext}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Trust & E-E-A-T Footnote Card */}
              <div className="mt-5 pt-4 border-t border-zinc-200/80 dark:border-zinc-800/80 flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-normal">
                  Metrics verified via Open VSX, GitHub commits &amp; Afeka College registry.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default FaqSection;
