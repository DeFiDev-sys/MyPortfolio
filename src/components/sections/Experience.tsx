import { motion } from 'framer-motion';
import SectionWrapper from '../ui/SectionWrapper';
import { experiences } from '../../data/portfolio';
import type { Experience } from '../../types';

function TimelineCard({
  experience,
  index,
}: {
  experience: Experience;
  index: number;
}): React.JSX.Element {
  const isLeft = index % 2 === 0;
  const accentBorder =
    experience.accent === 'primary'
      ? 'border-glow-primary'
      : 'border-glow-secondary';
  const dotColor =
    experience.accent === 'primary' ? 'bg-primary' : 'bg-secondary';

  return (
    <div
      className={`relative flex w-full md:w-1/2 ${
        isLeft ? 'md:self-start md:pr-12' : 'md:self-end md:pl-12'
      }`}
    >
      {/* Connector dot */}
      <span
        className={`absolute top-6 hidden h-4 w-4 animate-pulse-glow rounded-full ${dotColor} shadow-glow-primary md:block ${
          isLeft ? 'md:-right-2' : 'md:-left-2'
        }`}
        aria-hidden="true"
      />
      <motion.article
        initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`glass w-full rounded-2xl border ${accentBorder} p-6`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-display text-lg font-bold text-white">
            {experience.role}
          </h3>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-primary">
            {experience.duration}
          </span>
        </div>
        <p className="mt-1 font-mono text-sm text-secondary">
          {experience.company}
        </p>
        <ul className="mt-4 space-y-2">
          {experience.bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex gap-2 text-sm leading-relaxed text-slate-300"
            >
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
              {bullet}
            </li>
          ))}
        </ul>
      </motion.article>
    </div>
  );
}

function Experience(): React.JSX.Element {
  return (
    <SectionWrapper id="experience">
      <div className="text-center">
        <span className="font-mono text-sm uppercase tracking-[0.3em] text-primary">
          03 / Experience
        </span>
        <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
          Career <span className="gradient-text">timeline</span>
        </h2>
      </div>

      <div className="relative mt-16">
        {/* Central glowing line */}
        <span className="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-primary via-secondary to-transparent md:left-1/2 md:-translate-x-1/2" />
        <div className="flex flex-col gap-12 pl-12 md:pl-0">
          {experiences.map((experience, index) => (
            <TimelineCard
              key={`${experience.company}-${experience.role}`}
              experience={experience}
              index={index}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

export default Experience;
