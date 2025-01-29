import { motion } from "framer-motion";

type TechStackBadgesProps = {
    technologies: string[];
};

const TechStackBadges: React.FC<TechStackBadgesProps> = ({ technologies }) => {
    return (
        <motion.div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
                <motion.span
                    key={tech}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {tech}
                </motion.span>
            ))}
        </motion.div>
    );
};

export default TechStackBadges;
