import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
      <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <a
                  href="#"
                  className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 dark:from-blue-400 dark:to-pink-600"
              >
                Portfolio
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8" >
              {navItems.map((item) => (
                  <a
                      key={item.label}
                      href={item.href}
                      className="text-white hover:text-pink-300 dark:text-gray-300 dark:hover:text-purple-400 transition-all"
                  >
                    {item.label}
                  </a>
              ))}
              <ThemeToggle />
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <ThemeToggle />
              <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="ml-2 p-2 rounded-md text-white hover:text-pink-300 transition-all"
              >
                {isOpen ? (
                    <X className="h-6 w-6" />
                ) : (
                    <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                    <a
                        key={item.label}
                        href={item.href}
                        className="block px-3 py-2 text-white hover:text-pink-300 dark:text-gray-300 dark:hover:text-purple-400 transition-all"
                        onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </a>
                ))}
              </div>
            </div>
        )}
      </nav>
  );
}
