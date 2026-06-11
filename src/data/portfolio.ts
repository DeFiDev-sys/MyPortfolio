import type {
  Education,
  Experience,
  NavLink,
  Project,
  SkillGroup,
  SocialLink,
  Stat,
} from '../types';

/** Identity / contact details. */
export const profile = {
  name: 'Juwon Bowofola',
  title: 'Frontend & Backend Developer | IT Personnel',
  location: 'Umuahia North, Abia State, Nigeria',
  email: 'jayjaybowofola@gmail.com',
  linkedin: 'https://www.linkedin.com/in/juwon-bowofola-a054b1337',
  github: 'https://github.com/DeFiDev-sys',
  currentPortfolio: 'https://portfolio-latest-gl74.vercel.app',
  /** Replace this file with your own photo (see README). */
  image: '/My portfolio image.jpeg',
  resume: '/Juwon_Bowofola_Resume.pdf',
  summary:
    'Motivated Frontend and Backend Developer with hands-on experience building modern web applications and scalable backend systems. Skilled in JavaScript, TypeScript, React, Next.js, NestJS, Prisma, Supabase, PostgreSQL, and MongoDB. Experienced in AI model integration for rapid frontend development, debugging, and workflow automation. Strong understanding of RESTful APIs, database management, and full-stack application architecture.',
  /** Roles cycled through by the hero typewriter. */
  roles: [
    'Frontend Developer',
    'Backend Developer',
    'AI-Assisted Engineer',
    'TypeScript Advocate',
  ],
} as const;

export const stats: Stat[] = [
  { label: 'Years Experience', value: '3+' },
  { label: 'Companies', value: '3' },
  { label: 'Capability', value: 'Full-Stack' },
];

export const experiences: Experience[] = [
  {
    role: 'IT Personnel',
    company: 'Rapid Broadcasting Network (RBN)',
    duration: '2025 – Present',
    accent: 'primary',
    bullets: [
      'Provide IT support and technical troubleshooting across organizational systems.',
      'Maintain network infrastructure, ensuring smooth operation of hardware and software resources.',
      'Diagnose and resolve technical issues to minimize downtime.',
      'Support technology deployment and digital transformation initiatives.',
    ],
  },
  {
    role: 'Frontend Developer',
    company: '360 Maaas Hub',
    duration: 'Jan 2023 – Present',
    accent: 'secondary',
    bullets: [
      'Developed user interfaces using HTML, CSS, JavaScript, React, and Next.js.',
      'Implemented responsive web designs and optimized applications for scalability.',
      'Integrated RESTful APIs and participated in agile development processes.',
      'Conducted code reviews and improved application performance.',
    ],
  },
  {
    role: 'Frontend Developer',
    company: 'Ambidexters Ltd',
    duration: 'Sept 2023 – Mar 2024',
    accent: 'primary',
    bullets: [
      'Developed user-friendly web applications using React and Next.js.',
      'Collaborated with UX/UI designers to improve user experience.',
      'Optimized application performance and assisted with debugging and troubleshooting.',
    ],
  },
];

export const projects: Project[] = [
  {
    name: 'GreenHarvest',
    description:
      'A responsive agricultural platform with scroll-triggered animations, animated counters, filterable product catalogs, pricing systems and FAQ accordions — built accessibility-first.',
    techStack: ['TypeScript', 'Tailwind CSS', 'Framer Motion', 'React'],
    liveUrl: 'https://green-harvest-flame.vercel.app/',
    githubUrl: 'https://github.com/DeFiDev-sys/GreenHarvest',
    image:
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    accent: 'primary',
  },
  {
    name: 'CoinCapView',
    description:
      'A real-time cryptocurrency dashboard with live market data, search, filtering, pagination and sparkline chart visualizations, wrapped in a responsive dark-themed UI.',
    techStack: ['React', 'TypeScript', 'REST API', 'Charts'],
    liveUrl: 'https://coin-cap-view.vercel.app/',
    githubUrl: 'https://github.com/DeFiDev-sys/CoinCapView',
    image:
      'https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=1200&q=80',
    accent: 'secondary',
  },
  {
    name: 'Smartprints',
    description:
      'A modern e-commerce website built with React and TypeScript. Features include product filtering, shopping cart, and responsive design.',
    techStack: ['React', 'TypeScript', 'REST API', 'Node.js', 'MongoDB', 'Express', 'JWT Auth', 'Redux'],
    liveUrl: 'https://smartprints.ng/#/',
    githubUrl: 'https://github.com/DeFiDev-sys/eCommerce_dev.git',
    image:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80',
    accent: 'secondary',
  },
];

export const skillGroups: SkillGroup[] = [
  {
    category: 'Frontend',
    orbit: 'inner',
    skills: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
      'Redux',
    ],
  },
  {
    category: 'Backend',
    orbit: 'mid',
    skills: [
      'NestJS',
      'Prisma',
      'Supabase',
      'PostgreSQL',
      'MongoDB',
      'RESTful APIs',
    ],
  },
  {
    category: 'AI & Tools',
    orbit: 'outer',
    skills: [
      'AI Model Integration',
      'AI-Assisted Development',
      'Git',
      'GitHub',
    ],
  },
];

export const education: Education = {
  degree: 'Bachelor of Science in Computer Science',
  institution: 'Federal University Lafia',
  duration: 'Sept 2019 – Sept 2024',
};

export const socials: SocialLink[] = [
  { label: 'LinkedIn', url: profile.linkedin, icon: 'linkedin' },
  { label: 'GitHub', url: profile.github, icon: 'github' },
];

export const navLinks: NavLink[] = [
  { label: 'About', target: 'about' },
  { label: 'Skills', target: 'skills' },
  { label: 'Experience', target: 'experience' },
  { label: 'Projects', target: 'projects' },
  { label: 'Contact', target: 'contact' },
];
