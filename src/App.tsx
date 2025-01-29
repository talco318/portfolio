import { Navbar } from './components/Navbar';
import { portfolioData } from './data/portfolio';
import { Github, Linkedin } from 'lucide-react';
import { ProjectsSection } from './components/ProjectsSection';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {portfolioData.personal.name}
              </h1>
              <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-6">
                {portfolioData.personal.title}
              </h2>
              <p className="text-lg mb-8">{portfolioData.personal.tagline}</p>
              <div className="flex gap-4">
                <a
                  href="#projects"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View Projects
                </a>
                <a
                  href="#contact"
                  className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  Contact Me
                </a>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <img
                src={portfolioData.personal.avatar}
                alt={portfolioData.personal.name}
                className="w-64 h-64 rounded-full object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

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
        <ProjectsSection />

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
      <section id="contact" className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Contact Me</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg mb-6">
                Feel free to reach out! I'm always open to discussing new projects,
                creative ideas, or opportunities to be part of your visions.
              </p>
              <div className="space-y-4">
                <p className="flex items-center gap-2">
                  <span className="font-semibold">Email:</span>
                  <a
                    href={`mailto:${portfolioData.personal.email}`}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    {portfolioData.personal.email}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-semibold">Location:</span>
                  {portfolioData.personal.location}
                </p>
                <div className="flex gap-4">
                  <a
                    href={portfolioData.personal.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                  <a
                    href={portfolioData.personal.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                  {portfolioData.personal.socialLinks.twitter && (
                    <a
                      href={portfolioData.personal.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    >
                    </a>
                  )}
                </div>
              </div>
            </div>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;