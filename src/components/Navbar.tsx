import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Fix: hide on scroll DOWN, show on scroll UP + track progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);

      if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling DOWN — hide navbar
        setIsNavbarVisible(false);
        if (isOpen) setIsOpen(false);
      } else {
        // Scrolling UP or at top — show navbar
        setIsNavbarVisible(true);
      }
      setLastScrollTop(scrollTop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollTop, isOpen]);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.replace('#', ''));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <>
      {/* Progress Bar — always visible, independent of navbar */}
      <motion.div
        className="fixed top-0 left-0 h-0.5 bg-gradient-to-r from-pink-400 via-purple-300 to-blue-300 z-[60] pointer-events-none"
        style={{ width: `${scrollProgress}%` }}
        transition={{ ease: 'linear', duration: 0.1 }}
      />

      <nav
        className={`fixed top-0 left-0 right-0 bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 shadow-sm z-50 transition-transform duration-300 ${
          isNavbarVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a
              href="#"
              className="text-xl font-bold text-white"
            >
              Tal Cohen - Software Developer
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const id = item.href.replace('#', '');
              const isActive = activeSection === id;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`relative pb-1 transition-all font-medium ${
                    isActive
                      ? 'text-white'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {item.label}
                  {/* Active underline indicator */}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-pink-300 rounded-full transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0'
                    }`}
                  />
                </a>
              );
            })}
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <ThemeToggle />
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="ml-2 p-2 rounded-md text-white hover:text-pink-300 transition-all"
              whileTap={{ scale: 0.9 }}
              aria-label={isOpen ? "Close main menu" : "Open main menu"}
            >
              <span className="sr-only">{isOpen ? "Close main menu" : "Open main menu"}</span>
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <motion.div
              className="px-2 pt-2 pb-3 space-y-1"
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
            >
              {navItems.map((item) => {
                const id = item.href.replace('#', '');
                const isActive = activeSection === id;
                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    className={`block px-3 py-2 rounded-md transition-all font-medium ${
                      isActive
                        ? 'text-white bg-white/20'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                    onClick={() => setIsOpen(false)}
                    variants={{
                      hidden: { opacity: 0, x: -16 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
                    }}
                  >
                    {item.label}
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
    </>
  );
}