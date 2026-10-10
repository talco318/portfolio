import { Suspense, lazy } from 'react';
import { Navbar } from './Navbar.tsx';
import { portfolioData } from '../data/portfolio.ts';
import { ContactSection } from "./ContactSection.tsx";
import { HeroSection } from "./HeroSection.tsx";
import { MetricsBar } from "./MetricsBar.tsx";
import AboutSection from "./AboutSection.tsx";
import ExperienceSection from "./ExperienceSection.tsx";
import SocialButtons from './SocialButtons.tsx';
import ProjectsSection from './ProjectsSection.tsx';
import SkillsSection from './SkillsSection.tsx';
import { TechMarquee } from './TechMarquee.tsx';
import { FaqSection } from './FaqSection.tsx';
import { Footer } from './Footer.tsx';

import { useSmoothScroll } from '../hooks/useSmoothScroll.ts';

const ChatBot = lazy(() => import('./ChatBot.tsx'));

function App() {
    useSmoothScroll();

    return (
        <div className="relative min-h-screen bg-background text-zinc-900 dark:text-zinc-100 transition-colors duration-500 ease-in-out overflow-x-clip">
            {/* Ambient Background Flow with GPU hardware layer */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" style={{ transform: 'translateZ(0)' }}>
                <div className="absolute top-[25%] -left-48 w-[500px] h-[500px] rounded-full bg-indigo-500/8 dark:bg-indigo-600/10 blur-[120px]" />
                <div className="absolute top-[65%] -right-48 w-[550px] h-[550px] rounded-full bg-purple-500/8 dark:bg-purple-600/10 blur-[130px]" />
            </div>

            <Navbar />

            <main id="main-content" className="relative z-10">
                {/* Hero Section */}
                <HeroSection />

                {/* Impact & Key Metrics */}
                <MetricsBar />

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

                {/* Technical Knowledge Base & Capabilities Matrix */}
                <FaqSection />

                {/* Contact Section */}
                <ContactSection />
            </main>

            {/* Footer */}
            <Footer />
            <SocialButtons socialLinks={portfolioData.personal.socialLinks} />
            
            {/* AI Chatbot */}
            <Suspense fallback={null}>
                <ChatBot />
            </Suspense>
        </div>
    );
}

export default App;