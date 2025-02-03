// SocialButtons.tsx
import { Github, Linkedin } from 'lucide-react';
import { SocialLinks } from "../data/portfolio"; // Ensure SocialLinks is exported properly

interface SocialButtonsProps {
    socialLinks: SocialLinks;
}

const SocialButtons: React.FC<SocialButtonsProps> = ({ socialLinks }) => {
    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2">
            {socialLinks.github && (
                <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg transition-colors duration-200"
                >
                    <Github size={24} />
                </a>
            )}
            {socialLinks.linkedin && (
                <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg transition-colors duration-200"
                >
                    <Linkedin size={24} />
                </a>
            )}
        </div>
    );
};

export default SocialButtons;
