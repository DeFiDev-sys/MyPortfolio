import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import type { AccentColor } from '../../types';

interface GlowCardProps {
  children: ReactNode;
  /** Accent colour for the glowing border + hover shadow. */
  accent?: AccentColor;
  /** Enable the 3D tilt-on-hover effect. */
  tilt?: boolean;
  className?: string;
}

/**
 * A reusable glassmorphism card with a neon glowing border. Optionally tilts
 * in 3D on hover via CSS perspective transforms (used by the project cards).
 */
function GlowCard({
  children,
  accent = 'primary',
  tilt = false,
  className = '',
}: GlowCardProps): React.JSX.Element {
  const accentBorder =
    accent === 'primary' ? 'border-glow-primary' : 'border-glow-secondary';

  return (
    <motion.div
      whileHover={
        tilt
          ? { rotateX: 6, rotateY: -6, scale: 1.02 }
          : { scale: 1.01 }
      }
      transition={{ type: 'spring', stiffness: 220, damping: 18 }}
      style={{ transformStyle: 'preserve-3d', transformPerspective: 1000 }}
      className={`glass rounded-2xl border ${accentBorder} ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default GlowCard;
