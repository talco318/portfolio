import { useEffect } from 'react';
import Lenis from 'lenis';

export const useSmoothScroll = () => {
    useEffect(() => {
        const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (isReducedMotion) return;

        const lenis = new Lenis({
            duration: 1.05,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1.1,
            touchMultiplier: 1.5,
        });

        // Handle anchor navigation smoothly (e.g. #projects, #experience)
        const handleAnchorClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const anchor = target.closest('a[href^="#"]');
            if (anchor) {
                const href = anchor.getAttribute('href');
                if (href && href.length > 1) {
                    const el = document.querySelector(href);
                    if (el) {
                        e.preventDefault();
                        lenis.scrollTo(el as HTMLElement, { offset: -70, duration: 1.2 });
                    }
                }
            }
        };

        document.addEventListener('click', handleAnchorClick);

        let rafId: number;
        function raf(time: number) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);

        return () => {
            document.removeEventListener('click', handleAnchorClick);
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []);
};
