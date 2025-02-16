import {
    Code2, Database, Globe, Layout,
    Terminal, Cloud, Laptop,
    Languages, FileJson, Server, GithubIcon
} from 'lucide-react';

const SkillsSection = () => {
    const categories = [
        {
            title: "Programming Languages",  // More specific
            skills: [
                { name: 'Python', icon: Code2 },
                { name: 'C', icon: Code2 },
                { name: 'C++', icon: Code2 },
                { name: 'C#', icon: Code2 },
                { name: 'Java', icon: Code2 },
                { name: 'JavaScript', icon: FileJson }, // JavaScript is a programming language
                { name: 'TypeScript', icon: FileJson }, // TypeScript is a programming language
            ]
        },
        {
            title: "Web Development", // Broader, encompasses both front-end and back-end
            skills: [
                { name: 'React', icon: Layout },
                { name: 'HTML', icon: Code2 },
                { name: 'CSS', icon: Layout },
                { name: 'JSON', icon: FileJson }, // JSON is data format commonly used in web dev
                { name: 'Node.js', icon: Server }, // Node.js is a back-end runtime environment
            ]
        },
        {
            title: "Databases", // Separate category for databases
            skills: [
                { name: 'SQL (MySQL)', icon: Database },
                { name: 'SQL (Microsoft SQL Server)', icon: Database },
                { name: 'MongoDB', icon: Database },
            ]
        },
        {
            title: "Cloud & Infrastructure", // Clearer title
            skills: [
                { name: 'AWS', icon: Cloud },
                { name: 'Firebase', icon: Cloud }, // Firebase is a Backend-as-a-Service (BaaS) which falls under cloud
                { name: 'SAS', icon: Cloud },
                { name: 'Linux (bash)', icon: Terminal }, // Linux is an OS, more related to infra
                { name: 'Windows', icon: Laptop }, // Windows is an OS, more related to infra
            ]
        },
        {
            title: "Tools", // More concise
            skills: [
                { name: 'Git', icon: GithubIcon },
                { name: 'Selemium', icon: Globe }, // Selenium is a tool for automating web browsers
                { name: 'Postman', icon: Globe }, // Postman is a tool for API testing
            ]
        },
        {
            title: "APIs",
            skills: [
                { name: 'RESTful APIs', icon: Globe },
                { name: 'Google AI Studio API', icon: Cloud },
                { name: 'Spotify API', icon: Globe },
                { name: 'Google Maps API', icon: Globe },
            ]
        },
        {
            title: "Languages",
            skills: [
                { name: 'Hebrew (Native)', icon: Languages },
                { name: 'English (Fluent)', icon: Languages },
            ]
        },
    ];

    const chunkedCategories = [];
    for (let i = 0; i < categories.length; i += 3) {
        chunkedCategories.push(categories.slice(i, i + 3));
    }

    return (
        <div id="skills" className="w-full max-w-7xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-8 text-center dark:text-white">Skills</h2>

            {chunkedCategories.map((row, rowIndex) => (
                <div key={rowIndex} className="grid md:grid-cols-3 gap-6 mb-6">
                    {row.map((category) => (
                        <div
                            key={category.title}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                        >
                            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                                <h3 className="text-xl font-semibold dark:text-white">
                                    {category.title}
                                </h3>
                            </div>
                            <div className="p-4">
                                <div className="grid gap-3">
                                    {category.skills.map((skill) => (
                                        <div
                                            key={skill.name}
                                            className="flex items-center p-3 rounded-lg bg-gray-100 dark:bg-gray-700
                                 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                        >
                                            <skill.icon className="w-5 h-5 mr-3 text-blue-600 dark:text-blue-400" />
                                            <span className="font-medium dark:text-white">{skill.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default SkillsSection;