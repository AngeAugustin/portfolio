"use client";

import type { Locale } from "@/lib/chat/types";

export function formatMessageTime(
  timestamp: number,
  locale: Locale,
  justNow: string,
): string {
  const diff = Date.now() - timestamp;
  if (diff < 60_000) return justNow;

  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-US", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(timestamp));
}
