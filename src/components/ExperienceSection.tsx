import { Experience } from "../data/portfolio.ts";

interface ExperienceSectionProps {
    experience: Experience[];
}

const ExperienceSection = ({ experience }: ExperienceSectionProps) => {
    return (
        <section id="experience" className="py-5 bg-indigo-50 dark:bg-slate-800">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8">Experience</h2>
                <div className="space-y-8">
                    {experience.map((exp) => (
                        <div
                            key={exp.id}
                            className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg"
                        >
                            <h3 className="text-xl font-bold mb-2">{exp.position}</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                {exp.company} | {exp.startDate} - {exp.endDate}
                            </p>
                            <p className="mb-4">{exp.description}</p>
                            <ul className="list-disc list-inside space-y-2">
                                {exp.achievements.map((achievement, index) => (
                                    <li key={index} className="text-gray-600 dark:text-gray-400">
                                        {achievement}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExperienceSection;