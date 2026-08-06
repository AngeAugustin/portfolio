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
