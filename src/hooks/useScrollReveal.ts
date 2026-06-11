import { useEffect, useRef, useState } from 'react';

/**
 * Reveals an element the first time it scrolls into view. Returns a ref to
 * attach to the target plus a boolean that flips to `true` once visible —
 * handy for driving Framer Motion `animate` props without re-triggering.
 */
export interface ScrollReveal<T extends HTMLElement> {
  ref: React.RefObject<T>;
  isVisible: boolean;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.2,
): ScrollReveal<T> {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}
