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
  const [isScrolled, setIsScrolled] = useState(false);

  // Hide on scroll DOWN, show on scroll UP + track progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      setIsScrolled(scrollTop > 50);

      if (scrollTop > lastScrollTop && scrollTop > 100) {
        setIsNavbarVisible(false);
        if (isOpen) setIsOpen(false);
      } else {
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
      {/* Skip to Content Link (Accessibility & SEO) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-lg focus:text-sm focus:font-bold"
      >
        Skip to main content
      </a>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-accent via-blue-400 to-accent z-[60] pointer-events-none"
        style={{ width: `${scrollProgress}%` }}
        transition={{ ease: 'linear', duration: 0.1 }}
      />

      <nav
        aria-label="Main navigation"
        className={`fixed top-4 left-4 right-4 z-50 transition-all duration-500 ${
          isNavbarVisible ? 'translate-y-0 opacity-100' : '-translate-y-[calc(100%+2rem)] opacity-0'
        }`}
      >
        <div className={`max-w-6xl mx-auto rounded-2xl border transition-all duration-300 overflow-hidden ${
          isScrolled || isOpen
            ? 'bg-white/90 dark:bg-[#09090b]/95 backdrop-blur-xl border-zinc-200/50 dark:border-zinc-800/80 shadow-2xl shadow-black/10 dark:shadow-black/40'
            : 'bg-white/40 dark:bg-[#09090b]/40 backdrop-blur-md border-white/20 dark:border-zinc-800/30'
        }`}>
          <div className="px-6 lg:px-8">
            <div className="flex justify-between h-14">
              <div className="flex items-center">
                <a
                  href="#"
                  className="font-heading text-lg font-bold text-zinc-900 dark:text-white tracking-tight hover:text-accent transition-colors duration-200 cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  TC<span className="text-accent">.</span>
                </a>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-1">
                {navItems.map((item) => {
                  const id = item.href.replace('#', '');
                  const isActive = activeSection === id;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'text-accent bg-accent/10 dark:bg-accent/15'
                          : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/50'
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
                <div className="ml-2 pl-2 border-l border-zinc-200 dark:border-zinc-700">
                  <ThemeToggle />
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="flex items-center md:hidden gap-2">
                <ThemeToggle />
                <motion.button
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2 rounded-xl text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all cursor-pointer"
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
                        <X className="h-5 w-5" />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Menu className="h-5 w-5" />
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
                className="md:hidden border-t border-zinc-200/50 dark:border-zinc-800/50 bg-white/50 dark:bg-[#09090b]/50"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
              >
                <motion.div
                  className="px-4 py-6 flex flex-col gap-2"
                  initial="hidden"
                  animate="visible"
                  variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
                >
                  {navItems.map((item) => {
                    const id = item.href.replace('#', '');
                    const isActive = activeSection === id;
                    return (
                      <motion.a
                        key={item.label}
                        href={item.href}
                        className={`block px-6 py-4 rounded-2xl transition-all font-heading font-bold text-lg text-center tracking-wide cursor-pointer ${
                          isActive
                            ? 'text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-md'
                            : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/50'
                        }`}
                        onClick={() => setIsOpen(false)}
                        variants={{
                          hidden: { opacity: 0, y: -10 },
                          visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
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
        </div>
      </nav>
    </>
  );
}