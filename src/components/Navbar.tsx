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
        className={`fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-4xl transition-all duration-500 ${
          isNavbarVisible ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0'
        }`}
      >
        <div
          className={`rounded-full border transition-all duration-300 px-4 sm:px-6 py-2.5 ${
            isScrolled || isOpen
              ? 'bg-white/80 dark:bg-zinc-950/75 backdrop-blur-2xl border-white/40 dark:border-white/10 shadow-2xl shadow-indigo-500/5 dark:shadow-black/60'
              : 'bg-white/60 dark:bg-zinc-900/50 backdrop-blur-xl border-white/30 dark:border-white/10 shadow-lg shadow-black/5'
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Left: Logo */}
            <div className="flex items-center w-20 md:w-28 shrink-0">
              <a
                href="#"
                className="group flex items-center gap-1.5 font-heading text-lg font-black tracking-tight text-zinc-900 dark:text-white cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                <span>TC</span>
                <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 group-hover:scale-125 transition-transform duration-300" />
              </a>
            </div>

            {/* Center: Desktop Navigation Links */}
            <div className="hidden md:flex items-center justify-center gap-1 flex-1">
              {navItems.map((item) => {
                const id = item.href.replace('#', '');
                const isActive = activeSection === id;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`relative px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors duration-200 cursor-pointer ${
                      isActive
                        ? 'text-blue-600 dark:text-blue-400 font-bold'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavPill"
                        className="absolute inset-0 rounded-full bg-blue-500/10 dark:bg-indigo-500/20 border border-blue-500/20 dark:border-indigo-400/30"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </a>
                );
              })}
            </div>

            {/* Right: Theme Toggle & Mobile Menu */}
            <div className="flex items-center justify-end w-20 md:w-28 shrink-0 gap-1 sm:gap-2">
              <ThemeToggle />
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-all cursor-pointer md:hidden"
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

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden mt-2 rounded-3xl border border-white/30 dark:border-white/10 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-2xl shadow-2xl p-4 overflow-hidden"
              initial={{ height: 0, opacity: 0, y: -10 }}
              animate={{ height: 'auto', opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <div className="flex flex-col gap-1.5">
                {navItems.map((item) => {
                  const id = item.href.replace('#', '');
                  const isActive = activeSection === id;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className={`block px-5 py-3 rounded-2xl transition-all font-heading font-semibold text-base tracking-wide cursor-pointer ${
                        isActive
                          ? 'text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-md shadow-indigo-500/25'
                          : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}