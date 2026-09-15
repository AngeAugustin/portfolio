import type { BlogCategory, ProjectCategory } from "@/lib/site";

export type CmsProject = {
  slug: string;
  title: string;
  description: string;
  caseStudy?: string;
  category: ProjectCategory;
  featured: boolean;
  year: string;
  stack: string[];
  image: string;
  liveUrl?: string;
  repoUrl?: string;
};

export type CmsService = {
  slug: string;
  title: string;
  summary: string;
  tagline: string;
  overview: string;
  order: number;
  tags: string[];
  deliverables: string[];
  approach: string[];
  stack: string[];
  idealFor: string[];
};

export type CmsArticle = {
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  sections?: { heading: string; paragraphs: string[] }[];
  category: BlogCategory;
  featured: boolean;
  readMinutes: number;
  date: string;
  image: string;
};

export type CmsArticleComment = {
  id: string;
  authorName: string;
  body: string;
  createdAt: string;
};

export type CmsExperience = {
  key: string;
  role: string;
  company: string;
  location?: string;
  period: string;
  description: string;
  order: number;
};

export type CmsEducation = {
  key: string;
  degree: string;
  school: string;
  period: string;
  description: string;
  status: "completed" | "ongoing";
  highlight?: string;
  order: number;
};

export type StrapiListResponse<T> = {
  data: T[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

export type StrapiMedia = {
  url?: string;
  alternativeText?: string | null;
  formats?: Record<string, { url?: string }>;
} | null;
