"use client";

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

function FlagUs({ className = defaultClassName }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 19 10"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="19" height="10" fill="#B22234" />
      <path
        d="M0 1.25h19M0 2.5h19M0 3.75h19M0 5h19M0 6.25h19M0 7.5h19M0 8.75h19"
        stroke="#FFFFFF"
        strokeWidth="0.75"
      />
      <rect width="7.6" height="5.4" fill="#3C3B6E" />
      <g fill="#FFFFFF">
        <circle cx="1.2" cy="0.7" r="0.28" />
        <circle cx="2.4" cy="0.7" r="0.28" />
        <circle cx="3.6" cy="0.7" r="0.28" />
        <circle cx="4.8" cy="0.7" r="0.28" />
        <circle cx="6" cy="0.7" r="0.28" />
        <circle cx="1.8" cy="1.4" r="0.28" />
        <circle cx="3" cy="1.4" r="0.28" />
        <circle cx="4.2" cy="1.4" r="0.28" />
        <circle cx="5.4" cy="1.4" r="0.28" />
        <circle cx="1.2" cy="2.1" r="0.28" />
        <circle cx="2.4" cy="2.1" r="0.28" />
        <circle cx="3.6" cy="2.1" r="0.28" />
        <circle cx="4.8" cy="2.1" r="0.28" />
        <circle cx="6" cy="2.1" r="0.28" />
        <circle cx="1.8" cy="2.8" r="0.28" />
        <circle cx="3" cy="2.8" r="0.28" />
        <circle cx="4.2" cy="2.8" r="0.28" />
        <circle cx="5.4" cy="2.8" r="0.28" />
        <circle cx="1.2" cy="3.5" r="0.28" />
        <circle cx="2.4" cy="3.5" r="0.28" />
        <circle cx="3.6" cy="3.5" r="0.28" />
        <circle cx="4.8" cy="3.5" r="0.28" />
        <circle cx="6" cy="3.5" r="0.28" />
        <circle cx="1.8" cy="4.2" r="0.28" />
        <circle cx="3" cy="4.2" r="0.28" />
        <circle cx="4.2" cy="4.2" r="0.28" />
        <circle cx="5.4" cy="4.2" r="0.28" />
        <circle cx="1.2" cy="4.9" r="0.28" />
        <circle cx="2.4" cy="4.9" r="0.28" />
        <circle cx="3.6" cy="4.9" r="0.28" />
        <circle cx="4.8" cy="4.9" r="0.28" />
        <circle cx="6" cy="4.9" r="0.28" />
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
    <FlagUs className={className} />
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
