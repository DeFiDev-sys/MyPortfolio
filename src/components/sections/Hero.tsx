import { lazy, Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import { profile } from '../../data/portfolio';
import { useTypewriter } from '../../hooks/useTypewriter';
import { useMouseParallax } from '../../hooks/useMouseParallax';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import CanvasLoader from '../ui/CanvasLoader';

// Lazy-load the heavy Three.js scene so first paint isn't blocked.
const HeroCanvas = lazy(() => import('../three/HeroCanvas'));

function ProfileCard(): React.JSX.Element {
  const { x, y } = useMouseParallax(0.6);
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
      style={{
        transform: `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`,
        transformStyle: 'preserve-3d',
      }}
      className="relative aspect-4/5 w-56 sm:w-64 lg:w-72"
    >
      <div className="absolute -inset-1 rounded-3xl bg-linear-to-tr from-primary via-transparent to-secondary opacity-70 blur-md" />
      <div className="border-glow-primary relative h-full w-full overflow-hidden rounded-3xl border bg-darkAlt">
        {!imgFailed ? (
          <img
            src={profile.image}
            alt={`Portrait of ${profile.name}`}
            onError={() => setImgFailed(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-darkAlt to-dark">
            <span className="gradient-text font-display text-6xl font-black">
              JB
            </span>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-dark/70 via-transparent to-transparent" />
        <span className="absolute bottom-3 left-4 font-mono text-xs uppercase tracking-widest text-primary">
          &lt;/dev&gt;
        </span>
      </div>
    </motion.div>
  );
}

function Hero(): React.JSX.Element {
  const reducedMotion = useReducedMotion();
  const typed = useTypewriter(profile.roles, { disabled: reducedMotion });

  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full items-center overflow-hidden"
    >
      {/* 3D background */}
      <div className="absolute inset-0 -z-10">
        <Suspense fallback={<CanvasLoader label="Initializing scene" />}>
          <HeroCanvas reducedMotion={reducedMotion} />
        </Suspense>
      </div>

      {/* Foreground content */}
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 py-28 md:px-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mb-4 font-mono text-sm uppercase tracking-[0.3em] text-primary"
          >
            {profile.location}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="font-display text-5xl font-black leading-[1.05] tracking-tight text-white text-glow-primary sm:text-6xl lg:text-7xl"
          >
            JUWON
            <br />
            <span className="gradient-text">BOWOFOLA</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-6 flex items-center gap-3 font-mono text-lg text-slate-200 sm:text-xl"
          >
            <span className="text-secondary">$</span>
            <span aria-live="polite">{typed}</span>
            <span className="inline-block h-6 w-0.5 animate-pulse-glow bg-primary" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <button
              onClick={() =>
                document
                  .getElementById('projects')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="rounded-full bg-linear-to-r from-primary to-secondary px-7 py-3 font-mono text-sm font-semibold uppercase tracking-wider text-dark shadow-glow-primary transition-transform hover:scale-105"
            >
              View My Work
            </button>
            <a
              href={profile.resume}
              download
              className="border-glow-secondary rounded-full border px-7 py-3 font-mono text-sm font-semibold uppercase tracking-wider text-white transition-transform hover:scale-105"
            >
              Download CV
            </a>
          </motion.div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <ProfileCard />
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-primary/50 p-1.5">
          <span className="h-2 w-1 animate-float rounded-full bg-primary" />
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;
