export const siteConfig = {
  name: "Augustin FACHEHOUN",
  brand: "Augustin FACHEHOUN",
  title: "FullStack & AI Developer",
  description:
    "Beninese FullStack & AI Developer crafting scalable web applications and intelligent systems — transitioning into Data Engineering.",
  url: import.meta.env.VITE_SITE_URL ?? "https://augustinfachehoun.dev",
  email: "hello@augustinfachehoun.dev",
  location: "Cotonou, Benin",
  social: {
    github: "https://github.com/AngeAugustin",
    linkedin: "https://www.linkedin.com/in/augustinfachehoun/",
    whatsapp: "https://wa.me/22954053660",
  },
  locales: ["fr", "en"] as const,
  resumeFiles: {
    fr: "/cv/augustin-fachehoun-cv-fr.pdf",
    en: "/cv/augustin-fachehoun-cv-en.pdf",
  },
};

export type ProjectCategory =
  | "web"
  | "ai"
  | "api"
  | "dashboard"
  | "saas"
  | "automation";

export interface Project {
  slug: string;
  category: ProjectCategory;
  featured: boolean;
  year: string;
  stack: string[];
  image: string;
}

export const projects: Project[] = [
  {
    slug: "cnss-pension-tracking",
    category: "web",
    featured: true,
    year: "2023",
    stack: ["React JS", "Symfony 6", "MySQL", "API REST"],
    image: "/images/projects/dataflow-pipeline.svg",
  },
  {
    slug: "tutoring-platform",
    category: "saas",
    featured: true,
    year: "2024",
    stack: ["React JS", "React Native", "Symfony 6", "MySQL", "API REST"],
    image: "/images/projects/neural-commerce.svg",
  },
  {
    slug: "packaging-crm",
    category: "saas",
    featured: true,
    year: "2024",
    stack: ["React JS", "Symfony 6", "PostgreSQL", "Electron JS", "API REST"],
    image: "/images/projects/insight-saas.svg",
  },
  {
    slug: "banking-management",
    category: "web",
    featured: false,
    year: "2023",
    stack: ["React JS", "Nest JS", "Node JS", "MySQL", "API REST"],
    image: "/images/projects/benin-pay-api.svg",
  },
  {
    slug: "accounting-ai",
    category: "ai",
    featured: true,
    year: "2024",
    stack: ["React JS", "Django", "PostgreSQL", "IA", "LLM"],
    image: "/images/projects/agent-orchestrator.svg",
  },
  {
    slug: "connectors-audit-ai",
    category: "ai",
    featured: true,
    year: "2024",
    stack: ["React JS", "Django", "PostgreSQL", "Redis", "IA/LLM", "API REST", "SOAP"],
    image: "/images/projects/agent-orchestrator.svg",
  },
  {
    slug: "dncf-personnel-transfers",
    category: "web",
    featured: false,
    year: "2025",
    stack: ["Next.js", "MongoDB"],
    image: "/images/projects/agri-dashboard.svg",
  },
  {
    slug: "dncf-committees-projects",
    category: "dashboard",
    featured: false,
    year: "2025",
    stack: ["Next.js", "MongoDB"],
    image: "/images/projects/dataflow-pipeline.svg",
  },
  {
    slug: "sigfip-dgb",
    category: "api",
    featured: true,
    year: "2025",
    stack: ["Java 8", "WildFly", "MyBatis", "SpringMVC", "Oracle 12", "X-ROAD"],
    image: "/images/projects/benin-pay-api.svg",
  },
  {
    slug: "grc-saas",
    category: "saas",
    featured: true,
    year: "2025",
    stack: ["Vite", "TypeScript", "Tailwind CSS", "Shadcn UI", "Intelligence Artificielle"],
    image: "/images/projects/insight-saas.svg",
  },
  {
    slug: "aml-detection",
    category: "ai",
    featured: true,
    year: "2025",
    stack: ["Python", "Machine Learning", "API REST"],
    image: "/images/projects/neural-commerce.svg",
  },
  {
    slug: "grc-landing",
    category: "web",
    featured: false,
    year: "2025",
    stack: ["Vite", "TypeScript", "Tailwind CSS", "Shadcn UI", "Intelligence Artificielle"],
    image: "/images/projects/agri-dashboard.svg",
  },
];

export const services = [
  { slug: "fullstack" },
  { slug: "ai-integration" },
  { slug: "api-backend" },
  { slug: "data-engineering" },
] as const;

export type ServiceSlug = (typeof services)[number]["slug"];

export const tools = [
  { name: "Next.js", tag: "app", color: "#171717" },
  { name: "Vite", tag: "spa", color: "#646cff" },
  { name: "Node.js", tag: "api", color: "#339933" },
  { name: "Python", tag: "ai", color: "#3776ab" },
  { name: "Symfony", tag: "php", color: "#000000" },
  { name: "PostgreSQL", tag: "sql", color: "#2a75ba" },
  { name: "MySQL", tag: "sql", color: "#cb7229" },
  { name: "MongoDB", tag: "nosql", color: "#319751" },
  { name: "Redis", tag: "cache", color: "#dc382d" },
  { name: "Talend", tag: "etl", color: "#ff6d00" },
  { name: "TensorFlow", tag: "ml", color: "#ff6f00" },
] as const;

export type BlogCategory = "ai" | "data" | "frontend";

export const blogPosts = [
  {
    slug: "rag-pipelines",
    date: "2025-03",
    category: "ai" as const,
    readMinutes: 8,
    featured: true,
    image: "/images/blog/rag-pipelines.svg",
  },
  {
    slug: "data-engineering-path",
    date: "2025-01",
    category: "data" as const,
    readMinutes: 6,
    featured: false,
    image: "/images/blog/data-engineering-path.svg",
  },
  {
    slug: "nextjs-performance",
    date: "2024-11",
    category: "frontend" as const,
    readMinutes: 7,
    featured: false,
    image: "/images/blog/nextjs-performance.svg",
  },
] as const;

export type BlogPostSlug = (typeof blogPosts)[number]["slug"];

export const navLinks = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/projects", key: "projects" },
  { href: "/services", key: "services" },
  { href: "/blog", key: "blog" },
  { href: "/contact", key: "contact" },
] as const;

export type NavLinkKey = (typeof navLinks)[number]["key"];

export const footerNavGroups = [
  {
    titleKey: "portfolio" as const,
    links: [
      { href: "/", key: "home" },
      { href: "/about", key: "about" },
      { href: "/projects", key: "projects" },
    ],
  },
  {
    titleKey: "expertise" as const,
    links: [
      { href: "/services", key: "services" },
      { href: "/blog", key: "blog" },
      { href: "/contact", key: "contact" },
    ],
  },
] as const;
