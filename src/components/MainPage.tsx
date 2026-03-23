import { portfolioData } from '../data/portfolio';
import { Navbar } from './Navbar.tsx';
import { ProjectsSection } from './ProjectsSection.tsx';
import { ContactSection } from "./ContactSection.tsx";
import { HeroSection } from "./HeroSection.tsx";
import AboutSection from "./AboutSection.tsx";
import ExperienceSection from "./ExperienceSection.tsx";
import SocialButtons from './SocialButtons.jsx';
import SkillsSection from './SkillsSection.tsx';
import { TechMarquee } from './TechMarquee.tsx';
import { Footer } from './Footer.tsx';
import { ThemeRipple } from './ThemeRipple.tsx';

function App() {
    return (

        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
            <ThemeRipple />
            <Navbar />

            {/* Hero Section */}
            <HeroSection />

            {/* About Section */}
            <AboutSection personal={portfolioData.personal} skills={portfolioData.skills} />

            {/* Experience Section */}
            <ExperienceSection 
                experience={portfolioData.experience} 
                education={portfolioData.education} 
            />

            {/* Projects Section */}
            <ProjectsSection />

            <TechMarquee />
            <SkillsSection skills={portfolioData.skills} />

            {/* Contact Section */}
            <ContactSection />

            {/* Footer */}
            <Footer />

            {/* Social Buttons */}
            <SocialButtons socialLinks={portfolioData.personal.socialLinks} />
        </div>
    );
}

export default App;