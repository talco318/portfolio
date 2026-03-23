import { useState, useEffect } from 'react';

interface UseTypewriterOptions {
    texts: string[];        // Array of strings to cycle through
    typingSpeed?: number;   // ms per character
    deletingSpeed?: number; // ms per character when deleting
    pauseAfterType?: number;// ms to pause before deleting
    pauseAfterDelete?: number; // ms to pause before typing next
}

export const useTypewriter = ({
    texts,
    typingSpeed = 60,
    deletingSpeed = 35,
    pauseAfterType = 1800,
    pauseAfterDelete = 400,
}: UseTypewriterOptions) => {
    const [displayText, setDisplayText] = useState('');
    const [textIndex, setTextIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;

        const currentText = texts[textIndex];

        if (!isDeleting && displayText === currentText) {
            // Finished typing — pause then start deleting
            setIsPaused(true);
            setTimeout(() => {
                setIsDeleting(true);
                setIsPaused(false);
            }, pauseAfterType);
            return;
        }

        if (isDeleting && displayText === '') {
            // Finished deleting — pause then move to next text
            setIsPaused(true);
            setTimeout(() => {
                setIsDeleting(false);
                setTextIndex((prev) => (prev + 1) % texts.length);
                setIsPaused(false);
            }, pauseAfterDelete);
            return;
        }

        const timeout = setTimeout(() => {
            setDisplayText((prev) =>
                isDeleting
                    ? prev.slice(0, -1)
                    : currentText.slice(0, prev.length + 1)
            );
        }, isDeleting ? deletingSpeed : typingSpeed);

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, textIndex, isPaused, texts, typingSpeed, deletingSpeed, pauseAfterType, pauseAfterDelete]);

    return { displayText, isDeleting };
};
