import { motion } from 'framer-motion';

interface PersonalData {
    bio: string;
    interests: string[];
    avatar: string;
    name: string;
}

interface AboutSectionProps {
    personal: PersonalData;
}

const AboutSection = ({ personal }: AboutSectionProps) => {
    return (
        <section id="about" className="py-10 bg-indigo-100 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-start">
                    <div className="w-full md:w-2/3"> {/* Modified width for responsiveness */}
                        <h2 className="text-3xl font-bold mb-8">About Me</h2>
                        <p className="text-lg mb-8">{personal.bio}</p>
                        <div className="flex flex-wrap gap-4">
                            {personal.interests.map((interest) => (
                                <span
                                    key={interest}
                                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full"
                                >
                                    {interest}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="hidden md:block w-1/4 py-10"> {/* Hide on mobile, show on desktop */}
                        <motion.img
                            src={personal.avatar}
                            alt={personal.name}
                            className="w-48 h-48 rounded-full object-cover shadow-2xl"
                            whileHover={{
                                scale: 1.1,
                                rotate: 5,
                                transition: { type: "spring", stiffness: 300 }
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;