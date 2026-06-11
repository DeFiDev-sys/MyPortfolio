import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface SectionWrapperProps {
  /** Anchor id used by the navbar + smooth scrolling. */
  id: string;
  children: ReactNode;
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/**
 * Wraps every page section with consistent spacing, an anchor id and a
 * scroll-triggered reveal. Animation runs once when the section enters view.
 */
function SectionWrapper({
  id,
  children,
  className = '',
}: SectionWrapperProps): React.JSX.Element {
  return (
    <motion.section
      id={id}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className={`relative mx-auto w-full max-w-7xl px-6 py-24 md:px-10 md:py-32 ${className}`}
    >
      {children}
    </motion.section>
  );
}

export default SectionWrapper;
