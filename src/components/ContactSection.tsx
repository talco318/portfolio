import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Copy, Check, Send, Mail, MapPin } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { staggerContainer, fadeInUp } from '../animations';
import { useRef, useCallback, useState } from 'react';

export const ContactSection = () => {
    const form = useRef<HTMLFormElement>(null);
    const isSubmitting = useRef(false);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [copied, setCopied] = useState(false);

    const handleCopyEmail = useCallback(() => {
        navigator.clipboard.writeText(portfolioData.personal.email).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        });
    }, []);

    const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isSubmitting.current) return;

        const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
        if (!accessKey) {
            console.error('Web3Forms access key is not defined in environment variables');
            setStatus('error');
            return;
        }

        isSubmitting.current = true;
        setStatus('loading');

        try {
            const formData = new FormData(form.current!);
            formData.append('access_key', accessKey);

            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                console.log('SUCCESS!', data);
                form.current?.reset();
                setStatus('success');
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                throw new Error(data.message || 'Submission failed');
            }
        } catch (error) {
            console.error('FAILED...', error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        } finally {
            isSubmitting.current = false;
        }
    }, []);


    return (
        <motion.section
            id="contact"
            className="relative py-16 md:py-24 overflow-hidden"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
        >
            <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full filter blur-[150px] pointer-events-none" />
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="flex flex-col items-center mb-12 md:mb-16 px-2 md:px-0">
                    <span className="glass-pill px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-3">
                        Connect & Collaborate
                    </span>
                    <motion.div 
                        className="flex items-center gap-4 w-full"
                        variants={fadeInUp}
                    >
                        <div className="h-px bg-zinc-200/80 dark:bg-zinc-800 flex-1" />
                        <h2 className="font-heading text-3xl md:text-5xl font-black uppercase tracking-tight text-zinc-900 dark:text-white">
                            Get In <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 text-transparent bg-clip-text">Touch</span>
                        </h2>
                        <div className="h-px bg-zinc-200/80 dark:bg-zinc-800 flex-1" />
                    </motion.div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    <motion.div variants={fadeInUp} className="lg:col-span-5">
                        <h3 className="font-heading text-2xl font-bold text-zinc-900 dark:text-white mb-4">
                            Let's build something exceptional together.
                        </h3>
                        <p className="text-base mb-8 text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                            Feel free to reach out! I'm always open to discussing new projects,
                            innovative ideas, or engineering opportunities.
                        </p>
                        <div className="space-y-4">
                            <div className="glass-card flex items-center gap-3.5 p-4 rounded-2xl">
                                <div className="p-2.5 rounded-xl glass-pill text-indigo-500">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                    <a
                                        href={`mailto:${portfolioData.personal.email}`}
                                        className="text-zinc-800 dark:text-zinc-200 hover:text-indigo-500 transition-colors font-medium text-sm truncate cursor-pointer"
                                    >
                                        {portfolioData.personal.email}
                                    </a>
                                    <motion.button
                                        onClick={handleCopyEmail}
                                        className="ml-auto p-2 rounded-lg text-zinc-400 hover:text-indigo-500 hover:bg-indigo-500/10 transition-all cursor-pointer shrink-0"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        aria-label="Copy email address to clipboard"
                                        title="Copy email"
                                    >
                                        <AnimatePresence mode="wait" initial={false}>
                                            {copied ? (
                                                <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                                    <Check className="w-4 h-4 text-emerald-500" />
                                                </motion.span>
                                            ) : (
                                                <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                                    <Copy className="w-4 h-4" />
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </motion.button>
                                </div>
                            </div>
                            <div className="glass-card flex items-center gap-3.5 p-4 rounded-2xl">
                                <div className="p-2.5 rounded-xl glass-pill text-indigo-500">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <span className="font-medium text-sm text-zinc-800 dark:text-zinc-200">
                                    {portfolioData.personal.location}
                                </span>
                            </div>
                            <div className="flex gap-3 pt-2">
                                <motion.a
                                    href={portfolioData.personal.socialLinks.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="glass-card p-3 rounded-2xl text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:border-indigo-500/40 transition-all cursor-pointer"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    aria-label="Visit my GitHub profile"
                                >
                                    <Github className="w-5 h-5" />
                                    <span className="sr-only">GitHub Profile</span>
                                </motion.a>
                                <motion.a
                                    href={portfolioData.personal.socialLinks.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="glass-card p-3 rounded-2xl text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:border-indigo-500/40 transition-all cursor-pointer"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    aria-label="Visit my LinkedIn profile"
                                >
                                    <Linkedin className="w-5 h-5" />
                                    <span className="sr-only">LinkedIn Profile</span>
                                </motion.a>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div variants={fadeInUp} className="lg:col-span-7">
                        <form
                            className="glass-card p-6 md:p-8 rounded-3xl space-y-5"
                            id="contact-form"
                            ref={form}
                            onSubmit={handleSubmit}
                            toolname="sendMessageToTal"
                            tooldescription="Send a direct contact inquiry or job opportunity message to Tal Cohen (Full Stack Software Developer)."
                        >
                            {status === 'success' && (
                                <div className="p-4 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-medium border border-emerald-500/20 flex items-center gap-2">
                                    <Check className="w-4 h-4 shrink-0" />
                                    Message sent successfully! I'll get back to you soon.
                                </div>
                            )}
                            {status === 'error' && (
                                <div className="p-4 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 text-sm font-medium border border-rose-500/20">
                                    Failed to send message. Please try again later.
                                </div>
                            )}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="user_name"
                                    required
                                    minLength={2}
                                    className="w-full px-4 py-3.5 rounded-xl border border-white/40 dark:border-white/10 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 outline-none transition-all text-zinc-900 dark:text-zinc-100 text-sm"
                                    placeholder="Your name"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="user_email"
                                    required
                                    className="w-full px-4 py-3.5 rounded-xl border border-white/40 dark:border-white/10 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 outline-none transition-all text-zinc-900 dark:text-zinc-100 text-sm"
                                    placeholder="your@email.com"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    minLength={10}
                                    rows={4}
                                    className="w-full px-4 py-3.5 rounded-xl border border-white/40 dark:border-white/10 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 outline-none transition-all resize-none text-zinc-900 dark:text-zinc-100 text-sm"
                                    placeholder="Tell me about your project..."
                                />
                            </div>
                            <motion.button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-xl hover:from-blue-500 hover:to-indigo-500 transition-all disabled:opacity-60 disabled:cursor-not-allowed font-bold text-sm inline-flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-indigo-500/25 border border-white/20"
                                whileHover={status !== 'loading' ? { scale: 1.01, y: -1 } : {}}
                                whileTap={status !== 'loading' ? { scale: 0.99 } : {}}
                            >
                                {status === 'loading' ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" />
                                        Send Message
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
};