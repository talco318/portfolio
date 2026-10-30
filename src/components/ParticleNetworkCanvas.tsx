import { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    colorIndex: number;
}

export const ParticleNetworkCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
        let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

        const darkColors = [
            'rgba(6, 182, 212, ',   // Cyan
            'rgba(99, 102, 241, ',  // Indigo
            'rgba(14, 165, 233, ',  // Sky Blue
            'rgba(255, 255, 255, ', // Starlight White
        ];

        const lightColors = [
            'rgba(8, 145, 178, ',   // Deep Cyan
            'rgba(79, 70, 229, ',   // Deep Indigo
            'rgba(2, 132, 199, ',   // Blue
            'rgba(147, 51, 234, ',  // Purple
        ];

        // Cache dark mode state via MutationObserver instead of checking DOM on every frame
        let isDark = document.documentElement.classList.contains('dark');
        const themeObserver = new MutationObserver(() => {
            isDark = document.documentElement.classList.contains('dark');
        });
        themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        // Create particles
        const particleCount = Math.min(Math.floor((width * height) / 16000), 55);
        const particles: Particle[] = [];

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.45,
                vy: (Math.random() - 0.5) * 0.45,
                radius: Math.random() * 1.8 + 0.8,
                colorIndex: Math.floor(Math.random() * 4),
            });
        }

        // Mouse interaction with cached rect to avoid forced reflows
        const mouse = { x: -1000, y: -1000, radius: 140 };
        let cachedRect = canvas.getBoundingClientRect();

        const updateCachedRect = () => {
            if (canvas) cachedRect = canvas.getBoundingClientRect();
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX - cachedRect.left;
            mouse.y = e.clientY - cachedRect.top;
        };

        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        document.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('scroll', updateCachedRect, { passive: true });

        const handleResize = () => {
            if (!canvas) return;
            width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
            height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
            cachedRect = canvas.getBoundingClientRect();
        };

        window.addEventListener('resize', handleResize, { passive: true });

        // Render loop
        const render = () => {
            ctx.clearRect(0, 0, width, height);

            const palette = isDark ? darkColors : lightColors;
            const baseAlpha = isDark ? 0.6 : 0.45;
            const lineAlpha = isDark ? 0.15 : 0.09;

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                // Move
                p.x += p.vx;
                p.y += p.vy;

                // Bounce borders
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                // Mouse push
                const dxMouse = mouse.x - p.x;
                const dyMouse = mouse.y - p.y;
                const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

                if (distMouse < mouse.radius) {
                    const force = (mouse.radius - distMouse) / mouse.radius;
                    p.x -= (dxMouse / distMouse) * force * 2.5;
                    p.y -= (dyMouse / distMouse) * force * 2.5;

                    // Draw connecting line to mouse
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = isDark
                        ? `rgba(99, 102, 241, ${force * 0.4})`
                        : `rgba(79, 70, 229, ${force * 0.35})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }

                // Draw Particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `${palette[p.colorIndex]}${baseAlpha})`;
                ctx.fill();

                // Draw Connections between particles
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 110) {
                        const alpha = (1 - dist / 110) * lineAlpha;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `${palette[p.colorIndex]}${alpha})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }

            if (isVisible) {
                animationFrameId = requestAnimationFrame(render);
            }
        };

        let isVisible = true;
        const observer = new IntersectionObserver(
            ([entry]) => {
                const wasVisible = isVisible;
                isVisible = entry.isIntersecting;
                if (!wasVisible && isVisible) {
                    cancelAnimationFrame(animationFrameId);
                    animationFrameId = requestAnimationFrame(render);
                }
            },
            { threshold: 0.05 }
        );
        observer.observe(canvas);

        render();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('scroll', updateCachedRect);
            window.removeEventListener('resize', handleResize);
            themeObserver.disconnect();
            observer.disconnect();
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-0 w-full h-full"
        />
    );
};
export default ParticleNetworkCanvas;
