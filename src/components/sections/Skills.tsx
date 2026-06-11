import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../ui/SectionWrapper';
import CanvasLoader from '../ui/CanvasLoader';
import { skillGroups } from '../../data/portfolio';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const SkillsOrbit = lazy(() => import('../three/SkillsOrbit'));

const ORBIT_LABEL: Record<string, string> = {
  inner: 'Inner orbit',
  mid: 'Mid orbit',
  outer: 'Outer orbit',
};

const ACCENT_DOT: Record<string, string> = {
  inner: 'bg-primary',
  mid: 'bg-secondary',
  outer: 'bg-sky-400',
};

function Skills(): React.JSX.Element {
  const reducedMotion = useReducedMotion();

  return (
    <SectionWrapper id="skills">
      <div className="text-center">
        <span className="font-mono text-sm uppercase tracking-[0.3em] text-primary">
          02 / Skills
        </span>
        <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
          A <span className="gradient-text">solar system</span> of skills
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-400">
          Hover any badge to bring it into focus. Skills orbit in rings grouped
          by domain — frontend, backend, and AI &amp; tooling.
        </p>
      </div>

      {/* 3D orbit */}
      <div className="mt-8 h-[420px] w-full sm:h-[520px]">
        <Suspense fallback={<CanvasLoader label="Spinning up orbit" />}>
          <SkillsOrbit reducedMotion={reducedMotion} />
        </Suspense>
      </div>

      {/* Accessible / fallback list grouped by category */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {skillGroups.map((group, index) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="glass rounded-2xl border border-white/5 p-6"
          >
            <div className="flex items-center gap-2">
              <span
                className={`h-2.5 w-2.5 rounded-full ${ACCENT_DOT[group.orbit]}`}
              />
              <h3 className="font-display text-lg font-bold text-white">
                {group.category}
              </h3>
            </div>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-slate-500">
              {ORBIT_LABEL[group.orbit]}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-md border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-slate-200"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

export default Skills;
