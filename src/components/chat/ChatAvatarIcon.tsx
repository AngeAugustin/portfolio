"use client";

export function ChatAvatarIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M24 8v3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="24" cy="5.5" r="2" fill="currentColor" />

      <rect
        x="11"
        y="14"
        width="26"
        height="24"
        rx="10"
        stroke="currentColor"
        strokeWidth="2"
      />

      <circle cx="19" cy="24" r="2.75" fill="currentColor" />
      <circle cx="29" cy="24" r="2.75" fill="currentColor" />

      <path
        d="M19 31.5c1.2 1.4 2.7 2.1 5 2.1s3.8-.7 5-2.1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <path
        d="M11 22h-2.5a2.5 2.5 0 000 5H11M37 22h2.5a2.5 2.5 0 010 5H37"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M17 17.5h3M28 17.5h3"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}
