import { motion } from 'framer-motion';
import SectionWrapper from '../ui/SectionWrapper';
import GlowCard from '../ui/GlowCard';
import { projects } from '../../data/portfolio';
import type { Project } from '../../types';

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}): React.JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.12, duration: 0.6 }}
    >
      <GlowCard accent={project.accent} tilt className="h-full overflow-hidden">
        {/* Preview image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.image}
            alt={`${project.name} preview`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-darkAlt via-darkAlt/40 to-transparent" />
          <h3 className="absolute bottom-3 left-5 font-display text-2xl font-bold text-white text-glow-primary">
            {project.name}
          </h3>
        </div>

        <div className="p-6">
          <p className="text-sm leading-relaxed text-slate-300">
            {project.description}
          </p>

          {/* Tech chips */}
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-primary/20 bg-primary/5 px-2.5 py-1 font-mono text-xs text-primary"
              >
                {tech}
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="mt-6 flex gap-3">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-lg bg-gradient-to-r from-primary to-secondary px-4 py-2.5 text-center font-mono text-xs font-semibold uppercase tracking-wider text-dark transition-transform hover:scale-105"
            >
              Live Demo
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-lg border border-white/15 px-4 py-2.5 text-center font-mono text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:border-primary hover:text-primary"
            >
              View Code
            </a>
          </div>
        </div>
      </GlowCard>
    </motion.div>
  );
}

function Projects(): React.JSX.Element {
  return (
    <SectionWrapper id="projects">
      <div className="text-center">
        <span className="font-mono text-sm uppercase tracking-[0.3em] text-primary">
          05 / Projects
        </span>
        <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
          Selected <span className="gradient-text">work</span>
        </h2>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} />
        ))}
      </div>
    </SectionWrapper>
  );
}

export default Projects;
