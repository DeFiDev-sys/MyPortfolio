/**
 * Central TypeScript contracts for the portfolio.
 * Every data shape rendered by a section is described here so components
 * never depend on loosely-typed objects.
 */

export interface Experience {
  /** Job title / role held. */
  role: string;
  /** Company or organisation name. */
  company: string;
  /** Human-readable duration, e.g. "2025 – Present". */
  duration: string;
  /** Responsibilities / achievements. */
  bullets: string[];
  /** Visual accent used by the timeline card. */
  accent: AccentColor;
}

export interface Project {
  name: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  /** Remote (Unsplash) preview image for the card. */
  image: string;
  accent: AccentColor;
}

export interface SkillGroup {
  category: string;
  skills: string[];
  /** Orbit ring the group is rendered on in the 3D skills scene. */
  orbit: 'inner' | 'mid' | 'outer';
}

export interface Education {
  degree: string;
  institution: string;
  duration: string;
}

export interface Stat {
  label: string;
  value: string;
}

export interface SocialLink {
  label: string;
  url: string;
  /** Identifier used to pick the matching inline SVG icon. */
  icon: 'linkedin' | 'github';
}

export interface NavLink {
  label: string;
  /** Section id (without the leading #). */
  target: string;
}

export type AccentColor = 'primary' | 'secondary';

/** A single skill positioned on a 3D orbit. */
export interface OrbitSkill {
  name: string;
  /** Radius of the orbit ring. */
  radius: number;
  /** Initial angle (radians) around the ring. */
  angle: number;
  /** Vertical offset to give the rings some depth. */
  yOffset: number;
  /** Orbital speed multiplier. */
  speed: number;
  color: string;
}
