export const siteConfig = {
  name: "Augustin FACHEHOUN",
  brand: "Augustin FACHEHOUN",
  brandUnderline: "/images/outils/benin.png",
  title: "FullStack & AI Developer",
  description:
    "Beninese FullStack & AI Developer crafting scalable web applications and intelligent systems — transitioning into Data Engineering.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://augustinfachehoun.dev",
  email: "hello@augustinfachehoun.dev",
  location: "Cotonou, Benin",
  social: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
  locales: ["en", "fr"] as const,
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
    slug: "neural-commerce",
    category: "ai",
    featured: true,
    year: "2025",
    stack: ["Next.js", "Python", "OpenAI", "PostgreSQL"],
    image: "/images/projects/neural-commerce.svg",
  },
  {
    slug: "dataflow-pipeline",
    category: "dashboard",
    featured: true,
    year: "2025",
    stack: ["React", "Apache Airflow", "dbt", "BigQuery"],
    image: "/images/projects/dataflow-pipeline.svg",
  },
  {
    slug: "benin-pay-api",
    category: "api",
    featured: true,
    year: "2024",
    stack: ["Node.js", "Redis", "MongoDB", "Docker"],
    image: "/images/projects/benin-pay-api.svg",
  },
  {
    slug: "insight-saas",
    category: "saas",
    featured: false,
    year: "2024",
    stack: ["Next.js", "Stripe", "Prisma", "Vercel"],
    image: "/images/projects/insight-saas.svg",
  },
  {
    slug: "agent-orchestrator",
    category: "automation",
    featured: true,
    year: "2025",
    stack: ["Python", "LangChain", "FastAPI", "Redis"],
    image: "/images/projects/agent-orchestrator.svg",
  },
  {
    slug: "agri-dashboard",
    category: "web",
    featured: false,
    year: "2023",
    stack: ["React", "Mapbox", "Supabase", "Tailwind"],
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
  { src: "/images/outils/next.png", name: "Next.js" },
  { src: "/images/outils/Node.png", name: "Node.js" },
  { src: "/images/outils/python.png", name: "Python" },
  { src: "/images/outils/symfony.png", name: "Symfony" },
  { src: "/images/outils/postgresql.png", name: "PostgreSQL" },
  { src: "/images/outils/MONGO.png", name: "MongoDB" },
  { src: "/images/outils/logo-mysql.utrC_Fpn_C0E4q.webp", name: "MySQL" },
  { src: "/images/outils/reidis.webp", name: "Redis" },
  { src: "/images/outils/talend.png", name: "Talend" },
  { src: "/images/outils/tensorflow.png", name: "TensorFlow" },
] as const;

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
