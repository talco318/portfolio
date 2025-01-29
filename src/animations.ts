export const fadeInUp = {
    initial: { y: 50, opacity: 0 },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: [0.6, -0.05, 0.01, 0.99]
        }
    }
};

export const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

export const springHover = {
    whileHover: {
        scale: 1.05,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 10
        }
    },
    whileTap: { scale: 0.95 }
};