export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export const SOCIAL_LINKS = {
  github: process.env.NEXT_PUBLIC_GITHUB_URL,
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL,
  telegram: process.env.NEXT_PUBLIC_TELEGRAM_URL,
  email: process.env.NEXT_PUBLIC_EMAIL,
} as const;

export const NAV_ITEMS = [
  { key: "about", href: "/about", label: "/about" },
  { key: "experience", href: "/experience", label: "/experience" },
  { key: "projects", href: "/projects", label: "/projects" },
  { key: "blog", href: "/blog", label: "/blog" },
  { key: "contact", href: "/contact", label: "/contact" },
];

export const EXPERIENCE_IDS = ["daribar", "rokyrocks", "hurtle"] as const;

export const EXPERIENCE_TECH: Record<string, string[]> = {
  daribar: ["Next.js", "React", "TypeScript", "TanStack Query", "Tailwind CSS"],
  rokyrocks: ["React", "Next.js", "TypeScript", "Redux Toolkit", "SCSS"],
  hurtle: ["React", "Bootstrap 5", "Redux", "Git", "ClickUp"],
};

export const EXPERIENCE_METRICS: Record<
  string,
  { label: string; before?: string; after: string; unit?: string }[]
> = {
  daribar: [
    { label: "Server Load", before: "60-80%", after: "2-5%" },
    { label: "Lighthouse", after: "90+", unit: "score" },
  ],
};

export const TECH_STACK = {
  core: [
    { name: "TypeScript", category: "core" },
    { name: "JavaScript", category: "core" },
    { name: "React", category: "core" },
    { name: "Next.js", category: "core" },
    { name: "Jest", category: "core" },
  ],
  styling: [
    { name: "Tailwind CSS", category: "styling" },
    { name: "SCSS/Sass", category: "styling" },
    { name: "CSS Modules", category: "styling" },
    { name: "Framer Motion", category: "styling" },
    { name: "Styled Components", category: "styling" },
    { name: "Shadcn/ui", category: "styling" },
  ],
  state: [
    { name: "TanStack Query", category: "state" },
    { name: "Redux Toolkit", category: "state" },
    { name: "Zustand", category: "state" },
  ],
  tools: [
    { name: "Git", category: "tools" },
    { name: "Docker", category: "tools" },
    { name: "Figma", category: "tools" },
    { name: "Storybook", category: "tools" },
  ],
  backend: [
    { name: "Node.js", category: "backend" },
    { name: "Elysia.js", category: "backend" },
    { name: "REST API", category: "backend" },
    { name: "PostgreSQL", category: "backend" },
  ],
} as const;

export const ACHIEVEMENT_IDS = ["npm", "lighthouse", "server"] as const;

export const PROJECTS = [
  {
    slug: "bagsy",
    title: "Bagsy",
    tags: ["Next.js", "TypeScript", "TanStack Query", "Tailwind CSS"],
    image: "/images/projects/bagsy.jpg",
    featured: true,
    order: 1,
    link: "https://bagsy.kz/ru",
  },
  {
    slug: "dkcodec-ui",
    title: "dkcodec-ui",
    tags: ["React", "TypeScript", "Storybook", "NPM"],
    image: "/images/projects/dkcodec-ui.png",
    githubUrl: `${process.env.NEXT_PUBLIC_GITHUB_URL}/dkcodec-ui`,
    featured: true,
    order: 2,
    link: "https://github.com/dkcodec/Dkcodec-ui-kit",
  },
  {
    slug: "banking-app",
    title: "Banking App",
    tags: ["React", "Next.js", "TypeScript", "Node.js"],
    image: "/images/projects/banking-app.png",
    githubUrl: `${process.env.NEXT_PUBLIC_GITHUB_URL}/banking-app`,
    featured: true,
    order: 3,
    link: "https://github.com/dkcodec/Horizon_BankingApp",
  },
] as const;
