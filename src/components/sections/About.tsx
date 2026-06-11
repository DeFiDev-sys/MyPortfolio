import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../ui/SectionWrapper';
import CanvasLoader from '../ui/CanvasLoader';
import { profile, stats } from '../../data/portfolio';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const CrystalCanvas = lazy(() => import('../three/CrystalCanvas'));

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

function About(): React.JSX.Element {
  const reducedMotion = useReducedMotion();

  return (
    <SectionWrapper id="about">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        {/* Left: 3D crystal */}
        <div className="order-2 h-80 w-full sm:h-100 lg:order-1">
          <Suspense fallback={<CanvasLoader label="Loading crystal" />}>
            <CrystalCanvas reducedMotion={reducedMotion} />
          </Suspense>
        </div>

        {/* Right: bio */}
        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="order-1 lg:order-2"
        >
          <motion.span
            variants={itemVariants}
            className="font-mono text-sm uppercase tracking-[0.3em] text-primary"
          >
            01 / About
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl"
          >
            Building across the <span className="gradient-text">full stack</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-6 text-base leading-relaxed text-slate-300 sm:text-lg"
          >
            {profile.summary}
          </motion.p>

          {/* Stats row */}
          <motion.div
            variants={itemVariants}
            className="mt-10 grid grid-cols-3 gap-4"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="glass rounded-xl border border-white/5 p-4 text-center"
              >
                <p className="gradient-text font-display text-2xl font-black sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-slate-400 sm:text-xs">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

export default About;
