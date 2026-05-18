import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-surface dark:bg-[#09090b] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-md"
            >
                <motion.h1
                    className="text-8xl md:text-9xl font-black font-heading bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                    404
                </motion.h1>
                <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mt-4 font-heading">
                    Page Not Found
                </h2>
                <p className="text-zinc-500 dark:text-zinc-400 mt-3 text-base leading-relaxed">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
                    <motion.a
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-blue-500/30 transition-all cursor-pointer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Home className="w-4 h-4" />
                        Go Home
                    </motion.a>
                    <motion.button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 rounded-xl font-semibold text-sm hover:border-purple-500 transition-all cursor-pointer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Go Back
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default NotFound;
