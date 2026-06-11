import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../ui/SectionWrapper';
import CanvasLoader from '../ui/CanvasLoader';
import { education } from '../../data/portfolio';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const GradCapCanvas = lazy(() => import('../three/GradCapCanvas'));

function Education(): React.JSX.Element {
  const reducedMotion = useReducedMotion();

  return (
    <SectionWrapper id="education">
      <div className="text-center">
        <span className="font-mono text-sm uppercase tracking-[0.3em] text-primary">
          04 / Education
        </span>
        <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
          Academic <span className="gradient-text">foundation</span>
        </h2>
      </div>

      <div className="mt-12 grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_1.4fr]">
        {/* 3D graduation cap */}
        <div className="h-[260px] w-full sm:h-[300px]">
          <Suspense fallback={<CanvasLoader label="Loading cap" />}>
            <GradCapCanvas reducedMotion={reducedMotion} />
          </Suspense>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="border-glow-secondary glass rounded-2xl border p-8"
        >
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-secondary">
            {education.duration}
          </span>
          <h3 className="mt-4 font-display text-2xl font-bold text-white">
            {education.degree}
          </h3>
          <p className="mt-2 font-mono text-primary">{education.institution}</p>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

export default Education;
