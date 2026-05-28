import { setRequestLocale } from "next-intl/server";
import { PageShell } from "@/components/shared/page-shell";

type Props = { params: Promise<{ locale: string }> };

const posts = [
  { slug: "rag-pipelines", date: "2025-03", titleEn: "Building Production RAG Pipelines", titleFr: "Construire des pipelines RAG en production" },
  { slug: "data-engineering-path", date: "2025-01", titleEn: "My Path Into Data Engineering", titleFr: "Mon parcours vers le Data Engineering" },
  { slug: "nextjs-performance", date: "2024-11", titleEn: "Next.js Performance Patterns", titleFr: "Patterns de performance Next.js" },
];

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const label = locale === "fr" ? "Blog" : "Blog";
  const title = locale === "fr" ? "Articles & réflexions" : "Articles & insights";
  const subtitle =
    locale === "fr"
      ? "IA, data engineering et craft frontend."
      : "AI, data engineering, and frontend craft.";

  return (
    <PageShell label={label} title={title} subtitle={subtitle}>
      <ul className="flex flex-col gap-6">
        {posts.map((post) => (
          <li
            key={post.slug}
            className="rounded-2xl border border-border bg-card p-8 transition-shadow hover:shadow-md"
          >
            <time className="text-xs uppercase tracking-widest text-muted-foreground">
              {post.date}
            </time>
            <h2 className="mt-2 font-display text-2xl font-bold">
              {locale === "fr" ? post.titleFr : post.titleEn}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {locale === "fr" ? "Article à venir." : "Article coming soon."}
            </p>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
