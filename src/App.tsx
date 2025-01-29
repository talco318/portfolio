import { Navbar } from './components/Navbar';
import { portfolioData } from './data/portfolio';
import { ProjectsComponent } from './components/ProjectsComponent.tsx';
import {ContactComponent} from "./components/ContactComponent.tsx";
import {HeroComponent} from "./components/HeroComponent.tsx";
import {SkillsComponent} from "./components/SkillsComponent.tsx";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      
      {/* Hero Section */}
        <HeroComponent/>

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
        <ProjectsComponent/>

      {/* Skills Section */}
        <SkillsComponent skills={portfolioData.skills}/>



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
      { <ContactComponent />}

    </div>
  );
}

export default App;