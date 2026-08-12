"use client";

import { useId } from "react";

import type { Locale } from "@/i18n/routing";

const defaultClassName =
  "inline-block h-[18px] w-[27px] shrink-0 overflow-hidden rounded-sm border border-black/10 shadow-sm";

function FlagFr({ className = defaultClassName }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 3 2"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="1" height="2" fill="#002395" />
      <rect x="1" width="1" height="2" fill="#FFFFFF" />
      <rect x="2" width="1" height="2" fill="#ED2939" />
    </svg>
  );
}

function FlagGb({ className = defaultClassName }: { className?: string }) {
  const clipId = useId();

  return (
    <svg
      className={className}
      viewBox="0 0 60 30"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <clipPath id={clipId}>
        <path d="M0,0 v30 h60 v-30 z" />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 60,30 M60,0 0,30" stroke="#FFFFFF" strokeWidth="6" />
        <path
          d="M0,0 60,30 M60,0 0,30"
          clipPath={`url(#${clipId})`}
          stroke="#C8102E"
          strokeWidth="4"
        />
        <path d="M30,0 v30 M0,15 h60" stroke="#FFFFFF" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}

export function LocaleFlag({
  locale,
  className,
}: {
  locale: Locale;
  className?: string;
}) {
  return locale === "fr" ? (
    <FlagFr className={className} />
  ) : (
    <FlagGb className={className} />
  );
}

export function LocaleToggleFlags({ locale }: { locale: Locale }) {
  const nextLocale: Locale = locale === "fr" ? "en" : "fr";

  return (
    <span className="inline-flex items-center gap-1.5">
      <LocaleFlag locale={locale} />
      <span className="text-[10px] text-muted-foreground">/</span>
      <LocaleFlag locale={nextLocale} className={`${defaultClassName} opacity-60`} />
    </span>
  );
}
