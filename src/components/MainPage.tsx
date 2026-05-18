import { Navbar } from './Navbar.tsx';
import { portfolioData } from '../data/portfolio.ts';
import { ContactSection } from "./ContactSection.tsx";
import { HeroSection } from "./HeroSection.tsx";
import AboutSection from "./AboutSection.tsx";
import ExperienceSection from "./ExperienceSection.tsx";
import SocialButtons from './SocialButtons.tsx';
import ProjectsSection from './ProjectsSection.tsx';
import SkillsSection from './SkillsSection.tsx';
import { TechMarquee } from './TechMarquee.tsx';
import { Footer } from './Footer.tsx';
import { ChatBot } from './ChatBot.tsx';

function App() {
    return (
        <div className="min-h-screen bg-surface dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 transition-colors duration-500 ease-in-out">
            <Navbar />

            <main id="main-content">
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
            </main>

            {/* Footer */}
            <Footer />
            <SocialButtons socialLinks={portfolioData.personal.socialLinks} />
            
            {/* AI Chatbot */}
            <ChatBot />
        </div>
    );
}

export default App;