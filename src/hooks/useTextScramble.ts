import { useState, useCallback, useRef, useEffect } from 'react';

const CHARS = '!<>-_\\/[]{}—=+*^?#________0123456789ABCDEF';

export const useTextScramble = (text: string) => {
    const [displayText, setDisplayText] = useState(text);
    const iterationRef = useRef(0);
    const intervalRef = useRef<number | null>(null);

    const scramble = useCallback(() => {
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
        }

        iterationRef.current = 0;

        intervalRef.current = window.setInterval(() => {
            setDisplayText(() => {
                return text
                    .split('')
                    .map((char, index) => {
                        if (char === ' ') return ' ';
                        if (index < iterationRef.current) {
                            return text[index];
                        }
                        return CHARS[Math.floor(Math.random() * CHARS.length)];
                    })
                    .join('');
            });

            if (iterationRef.current >= text.length) {
                if (intervalRef.current !== null) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                }
            }

            iterationRef.current += 1 / 2;
        }, 30);
    }, [text]);

    useEffect(() => {
        // Run initial scramble on mount
        scramble();
        return () => {
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
            }
        };
    }, [scramble]);

    return { displayText, scramble };
};
