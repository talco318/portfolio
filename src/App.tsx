import { Navbar } from './components/Navbar';
import { portfolioData } from './data/portfolio';
import { ProjectsSection } from './components/ProjectsSection';
import {ContactSection} from "./components/ContactSection.tsx";
import {HeroSection} from "./components/HeroSection.tsx";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection/>

      {/* About Section */}
      <section id="about" className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">About Me</h2>
          <p className="text-lg mb-8">{portfolioData.personal.bio}</p>
          <div className="flex flex-wrap gap-4">
            {portfolioData.personal.interests.map((interest) => (
                <span
                    key={interest}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full"
                >
                {interest}
              </span>
            ))}
          </div>

        </div>
      </section>

      {/* Projects Section */}
      <ProjectsSection/>

      {/* Skills Section */}

      <section id="skills" className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioData.skills.map((skill) => (
              <div
                key={skill.name}
                className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-lg transition-transform hover:scale-105"
              >
                <h3 className="text-lg font-semibold mb-4">{skill.name}</h3>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Experience</h2>
          <div className="space-y-8">
            {portfolioData.experience.map((exp) => (
              <div
                key={exp.id}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
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

      {/* Contact Section */}
      { <ContactSection />}

    </div>
  );
}

export default App;