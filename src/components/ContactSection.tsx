import { motion } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { staggerContainer, fadeInUp } from '../animations';
import { useRef, useCallback, useState } from 'react';

export const ContactSection = () => {
    const form = useRef<HTMLFormElement>(null);
    const isSubmitting = useRef(false);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

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
            className="py-20 bg-white dark:bg-gray-900"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
        >
            <div className="max-w-7xl mx-auto px-4">
                <motion.h2
                    className="text-3xl font-bold mb-8"
                    variants={fadeInUp}
                >
                    Contact Me
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div variants={fadeInUp}>
                        <p className="text-lg mb-6">
                            Feel free to reach out! I'm always open to discussing new projects,
                            creative ideas, or opportunities to be part of your visions.
                        </p>
                        <div className="space-y-4">
                            <p className="flex items-center gap-2">
                                <span className="font-semibold">Email:</span>
                                <motion.a
                                    href={`mailto:${portfolioData.personal.email}`}
                                    className="text-blue-600 hover:text-blue-700"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    {portfolioData.personal.email}
                                </motion.a>
                            </p>
                            <p className="flex items-center gap-2">
                                <span className="font-semibold">Location:</span>
                                {portfolioData.personal.location}
                            </p>
                            <motion.div
                                className="flex gap-4"
                                variants={staggerContainer}
                            >
                                <motion.a
                                    href={portfolioData.personal.socialLinks.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                    whileHover={{ scale: 1.2 }}
                                >
                                    <Github className="w-6 h-6" />
                                </motion.a>
                                <motion.a
                                    href={portfolioData.personal.socialLinks.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                    whileHover={{ scale: 1.2 }}
                                >
                                    <Linkedin className="w-6 h-6" />
                                </motion.a>
                            </motion.div>
                        </div>
                    </motion.div>
                    <motion.form
                        className="space-y-6"
                        variants={fadeInUp}
                        id="contact-form"
                        ref={form}
                        onSubmit={handleSubmit}
                    >
                        {status === 'success' && (
                            <div className="p-4 rounded-lg bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-sm font-medium">
                                ✅ Message sent successfully! I'll get back to you soon.
                            </div>
                        )}
                        {status === 'error' && (
                            <div className="p-4 rounded-lg bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 text-sm font-medium">
                                ❌ Failed to send message. Please try again later.
                            </div>
                        )}
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                            >
                                Name
                            </label>
                            <motion.input
                                type="text"
                                id="name"
                                name="user_name" // Changed name attribute to match emailjs template
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                                whileFocus={{ scale: 1.01 }}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                            >
                                Email
                            </label>
                            <motion.input
                                type="email"
                                id="email"
                                name="user_email"  // Changed name attribute to match emailjs template
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                                whileFocus={{ scale: 1.01 }}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="message"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                            >
                                Message
                            </label>
                            <motion.textarea
                                id="message"
                                name="message"  // Changed name attribute to match emailjs template
                                rows={4}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                                whileFocus={{ scale: 1.01 }}
                            />
                        </div>
                        <motion.button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                            whileHover={status !== 'loading' ? { scale: 1.05 } : {}}
                            whileTap={status !== 'loading' ? { scale: 0.95 } : {}}
                        >
                            {status === 'loading' ? 'Sending...' : 'Send Message'}
                        </motion.button>
                    </motion.form>
                </div>
            </div>
        </motion.section>
    );
};