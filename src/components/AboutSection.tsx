import { motion } from 'framer-motion';
import { TerminalEasterEgg } from './TerminalEasterEgg';

interface PersonalData {
    bio: string;
    interests: string[];
    avatar: string;
    name: string;
}

interface AboutSectionProps {
    personal: PersonalData;
}

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const AboutSection = ({ personal }: AboutSectionProps) => {
    return (
        <motion.section
            id="about"
            className="py-10 bg-indigo-100 dark:bg-gray-800"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-start">
                    <div className="w-full md:w-2/3">
                        <motion.h2
                            className="text-3xl font-bold mb-8"
                            variants={fadeUp}
                        >
                            About Me
                        </motion.h2>
                        <motion.p
                            className="text-lg mb-8"
                            variants={fadeUp}
                        >
                            {personal.bio}
                        </motion.p>
                        <motion.div
                            className="flex flex-wrap gap-4"
                            variants={containerVariants}
                        >
                            {personal.interests.map((interest) => (
                                <motion.span
                                    key={interest}
                                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full"
                                    variants={fadeUp}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    {interest}
                                </motion.span>
                            ))}
                        </motion.div>
                        
                        <TerminalEasterEgg />
                    </div>

                    <div className="hidden md:block w-1/4 py-10">
                        <motion.img
                            src={personal.avatar}
                            alt={`${personal.name} - Full Stack Software Developer Profile`}
                            loading="lazy"
                            className="w-48 h-48 rounded-full object-cover shadow-2xl"
                            variants={fadeUp}
                            whileHover={{
                                scale: 1.1,
                                rotate: 5,
                                transition: { type: 'spring', stiffness: 300 },
                            }}
                        />
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default AboutSection;