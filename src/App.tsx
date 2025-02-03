import { portfolioData } from './data/portfolio';
import { Navbar } from './components/Navbar';
import { ProjectsSection } from './components/ProjectsSection.tsx';
import {ContactSection} from "./components/ContactSection.tsx";
import {HeroSection} from "./components/HeroSection.tsx";
import {SkillsComponent} from "./components/SkillsComponent.tsx";
import AboutSection from "./components/AboutSection.tsx";
import ExperienceSection from "./components/ExperienceSection.tsx";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      
      {/* Hero Section */}
        <HeroSection/>

        {/* About Section */}
        <AboutSection personal={portfolioData.personal} />


        {/* Experience Section */}
        <ExperienceSection experience={portfolioData.experience} />


        {/* Projects Section */}
        <ProjectsSection/>

      {/* Skills Section */}
        <SkillsComponent skills={portfolioData.skills}/>


      {/* Contact Section */}
      { <ContactSection />}

    </div>
  );
}

export default App;