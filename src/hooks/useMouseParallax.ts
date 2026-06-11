import { useEffect, useState } from 'react';

/**
 * Tracks the cursor as a normalised offset from the centre of the viewport.
 * Returned values are in the range [-1, 1] on each axis, ready to feed into
 * 3D rotations or CSS transforms. Respects `prefers-reduced-motion`.
 */
export interface ParallaxOffset {
  x: number;
  y: number;
}

export function useMouseParallax(strength = 1): ParallaxOffset {
  const [offset, setOffset] = useState<ParallaxOffset>({ x: 0, y: 0 });

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) return;

    const handleMove = (event: MouseEvent): void => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2 * strength;
      const y = (event.clientY / window.innerHeight - 0.5) * 2 * strength;
      setOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [strength]);

  return offset;
}
