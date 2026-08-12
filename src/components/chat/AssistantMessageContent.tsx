"use client";

import type { ReactNode } from "react";

interface AssistantMessageContentProps {
  content: string;
  isStreaming?: boolean;
}

const LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;

function renderBoldMarkdown(text: string, keyStart = 0): ReactNode[] {
  const nodes: ReactNode[] = [];
  let remaining = text;
  let key = keyStart;

  while (remaining.length > 0) {
    const open = remaining.indexOf("**");
    if (open === -1) {
      nodes.push(remaining);
      break;
    }

    if (open > 0) {
      nodes.push(remaining.slice(0, open));
      remaining = remaining.slice(open);
    }

    const close = remaining.indexOf("**", 2);
    if (close === -1) {
      nodes.push(remaining.replace(/^\*\*/, ""));
      break;
    }

    nodes.push(
      <strong key={key++} className="font-semibold">
        {remaining.slice(2, close)}
      </strong>,
    );
    remaining = remaining.slice(close + 2);
  }

  return nodes;
}

function renderInlineMarkdown(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;

  for (const match of text.matchAll(LINK_PATTERN)) {
    const index = match.index ?? 0;

    if (index > lastIndex) {
      nodes.push(...renderBoldMarkdown(text.slice(lastIndex, index), key));
      key += 100;
    }

    nodes.push(
      <a
        key={key++}
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-glow underline underline-offset-2 transition hover:opacity-80"
      >
        {match[1]}
      </a>,
    );

    lastIndex = index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(...renderBoldMarkdown(text.slice(lastIndex), key));
  }

  return nodes;
}

export function AssistantMessageContent({
  content,
  isStreaming = false,
}: AssistantMessageContentProps) {
  return (
    <span className="whitespace-pre-wrap">
      {renderInlineMarkdown(content)}
      {isStreaming && (
        <span
          className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-glow align-middle"
          aria-hidden="true"
        />
      )}
    </span>
  );
}
