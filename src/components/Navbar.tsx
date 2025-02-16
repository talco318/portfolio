import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true); // Initialize to 'true'
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop < lastScrollTop && scrollTop > 100) {
        //Scrolling up and not at the top
        setIsNavbarVisible(false);
      } else if(scrollTop > lastScrollTop || scrollTop <= 100){
        //Scrolling down OR at the top
        setIsNavbarVisible(true);
      }
      setLastScrollTop(scrollTop);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      //Cleanup - removing event listener to prevent memory leaks
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop]);

  return (
      <nav
          className={`fixed top-0 left-0 right-0 bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 shadow-sm z-50 transition-all ${
              isNavbarVisible ? '' : '-translate-y-full'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <a
                  href="#"
                  className="text-xl font-bold bg-clip-text text-white dark:from-blue-400 dark:to-pink-600"
              >
                Tal Cohen - Software Developer
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
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