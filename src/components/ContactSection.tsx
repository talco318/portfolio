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
            className="relative py-20 bg-zinc-50 dark:bg-zinc-900/50 overflow-hidden"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
        >
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <motion.div 
                    className="flex items-center gap-4 mb-10 md:mb-16 px-2 md:px-0"
                    variants={fadeInUp}
                >
                    <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-1" />
                    <h2 className="font-heading text-3xl md:text-5xl font-black uppercase tracking-tight bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">Contact</h2>
                    <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-1" />
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div variants={fadeInUp}>
                        <p className="text-lg mb-8 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            Feel free to reach out! I'm always open to discussing new projects,
                            creative ideas, or opportunities to be part of your visions.
                        </p>
                        <div className="space-y-5">
                            <div className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-zinc-900/80 border border-zinc-100 dark:border-zinc-800">
                                <div className="p-2 rounded-lg bg-accent/10">
                                    <Mail className="w-4 h-4 text-accent" />
                                </div>
                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                    <a
                                        href={`mailto:${portfolioData.personal.email}`}
                                        className="text-zinc-700 dark:text-zinc-300 hover:text-accent transition-colors font-medium text-sm truncate cursor-pointer"
                                    >
                                        {portfolioData.personal.email}
                                    </a>
                                    <motion.button
                                        onClick={handleCopyEmail}
                                        className="ml-auto p-1.5 rounded-lg text-zinc-400 hover:text-accent hover:bg-accent/10 transition-all cursor-pointer shrink-0"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        aria-label="Copy email address to clipboard"
                                        title="Copy email"
                                    >
                                        <AnimatePresence mode="wait" initial={false}>
                                            {copied ? (
                                                <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                                    <Check className="w-4 h-4 text-green-500" />
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
                            <div className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-zinc-900/80 border border-zinc-100 dark:border-zinc-800">
                                <div className="p-2 rounded-lg bg-accent/10">
                                    <MapPin className="w-4 h-4 text-accent" />
                                </div>
                                <span className="font-medium text-sm text-zinc-700 dark:text-zinc-300">
                                    {portfolioData.personal.location}
                                </span>
                            </div>
                            <div className="flex gap-3 pt-2">
                                <motion.a
                                    href={portfolioData.personal.socialLinks.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-xl bg-white dark:bg-zinc-900/80 border border-zinc-100 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-600 transition-all cursor-pointer"
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
                                    className="p-3 rounded-xl bg-white dark:bg-zinc-900/80 border border-zinc-100 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-600 transition-all cursor-pointer"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    aria-label="Visit my LinkedIn profile"
                                >
                                    <Linkedin className="w-5 h-5" />
                                    <span className="sr-only">LinkedIn Profile</span>
                                </motion.a>
                            </div>
                        </div>
                    </motion.div>
                    <motion.form
                        className="space-y-5"
                        variants={fadeInUp}
                        id="contact-form"
                        ref={form}
                        onSubmit={handleSubmit}
                    >
                        {status === 'success' && (
                            <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm font-medium border border-green-100 dark:border-green-800/30 flex items-center gap-2">
                                <Check className="w-4 h-4 shrink-0" />
                                Message sent successfully! I'll get back to you soon.
                            </div>
                        )}
                        {status === 'error' && (
                            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-sm font-medium border border-red-100 dark:border-red-800/30">
                                Failed to send message. Please try again later.
                            </div>
                        )}
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="user_name"
                                required
                                minLength={2}
                                className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900/80 focus:ring-2 focus:ring-accent/30 focus:border-accent outline-none transition-all text-zinc-900 dark:text-zinc-100 text-sm"
                                placeholder="Your name"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="user_email"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900/80 focus:ring-2 focus:ring-accent/30 focus:border-accent outline-none transition-all text-zinc-900 dark:text-zinc-100 text-sm"
                                placeholder="your@email.com"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="message"
                                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
                            >
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                minLength={10}
                                rows={4}
                                className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900/80 focus:ring-2 focus:ring-accent/30 focus:border-accent outline-none transition-all resize-none text-zinc-900 dark:text-zinc-100 text-sm"
                                placeholder="Tell me about your project..."
                            />
                        </div>
                        <motion.button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full px-6 py-3.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all disabled:opacity-60 disabled:cursor-not-allowed font-semibold text-sm inline-flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-zinc-900/10 dark:shadow-black/20"
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
                    </motion.form>
                </div>
            </div>
        </motion.section>
    );
};