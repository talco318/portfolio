import { portfolioData } from '../data/portfolio';
import { Navbar } from './Navbar.tsx';
import { ProjectsSection } from './ProjectsSection.tsx';
import { ContactSection } from "./ContactSection.tsx";
import { HeroSection } from "./HeroSection.tsx";
import AboutSection from "./AboutSection.tsx";
import ExperienceSection from "./ExperienceSection.tsx";
import SocialButtons from './SocialButtons.jsx';
import SkillsSection from './SkillsSection.tsx';

function App() {
    return (

        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <Navbar />

            {/* Hero Section */}
            <HeroSection />

            {/* About Section */}
            <AboutSection personal={portfolioData.personal} />

            {/* Experience Section */}
            <ExperienceSection experience={portfolioData.experience} />

            {/* Projects Section */}
            <ProjectsSection />

            {/* Skills Section */}
            <SkillsSection />

            {/* Contact Section */}
            <ContactSection />

            {/* Social Buttons */}
            <SocialButtons socialLinks={portfolioData.personal.socialLinks} />
        </div>
    );
}

export default App;