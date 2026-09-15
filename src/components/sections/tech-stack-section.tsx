"use client";

import { useTranslations } from "@/i18n/context";
import { tools } from "@/lib/site";

type Tool = (typeof tools)[number];

function ToolChip({ tool }: { tool: Tool }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-2.5 rounded-xl border border-border bg-card px-5 py-2.5">
      <span
        className="size-2.5 rounded"
        style={{ backgroundColor: tool.color }}
        aria-hidden
      />
      <span className="text-sm font-medium text-foreground">{tool.name}</span>
      <code className="font-mono text-xs text-muted-foreground">{tool.tag}</code>
    </span>
  );
}

function ToolGroup({
  items,
  hidden = false,
}: {
  items: readonly Tool[];
  hidden?: boolean;
}) {
  return (
    <div className="flex gap-4" aria-hidden={hidden || undefined}>
      {items.map((tool) => (
        <ToolChip key={`${hidden ? "dup" : "main"}-${tool.name}`} tool={tool} />
      ))}
    </div>
  );
}

export function TechStackSection() {
  const t = useTranslations("techStack");

  return (
    <section className="overflow-hidden border-y border-border/70 py-12 md:py-14">
      <p className="mb-6 px-5 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {t("title")}
      </p>

      <div className="fade-edges overflow-hidden">
        <div className="animate-marquee flex w-max gap-4">
          <ToolGroup items={tools} />
          <ToolGroup items={tools} hidden />
        </div>
      </div>
    </section>
  );
}
