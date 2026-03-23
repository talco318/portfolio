import { portfolioData } from '../data/portfolio';

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 border-t border-gray-800 py-8 text-center text-gray-400">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                
                <p className="text-sm">
                    &copy; {currentYear} {portfolioData.personal.name}. All rights reserved.
                </p>

                <div className="flex gap-4 items-center">
                    <p className="text-sm italic">
                        Built with React, Vite & Tailwind CSS
                    </p>
                </div>
            </div>
        </footer>
    );
};
