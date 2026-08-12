"use client";

const LAUNCHER_BG = "#005c42";
const LAUNCHER_ACCENT = "#3dfc8a";

export function ChatLauncherIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M24 34c-6.627 0-12-4.925-12-11V18a12 12 0 0124 0v5c0 6.075-5.373 11-12 11z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect x="7" y="19" width="5.5" height="9" rx="2.75" fill="currentColor" />
      <rect x="35.5" y="19" width="5.5" height="9" rx="2.75" fill="currentColor" />
      <path
        d="M12.5 19c0-6.351 5.149-11.5 11.5-11.5S35.5 12.649 35.5 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M38 26.5h3.5l1.5 2.5h-3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="22" r="3.25" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="24" cy="22" r="1.1" fill="currentColor" />
      <path
        d="M24 19.5v-1M24 25.5v-1M21.5 22h-1M27.5 22h-1M22.2 19.7l-.7-.7M26.5 24.3l-.7-.7M25.8 19.7l.7-.7M21.5 24.3l.7-.7"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ChatLauncherButton({
  isOpen,
  openLabel,
  closeLabel,
  onClick,
}: {
  isOpen: boolean;
  openLabel: string;
  closeLabel: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex h-[3.75rem] w-[3.75rem] shrink-0 items-center justify-center border-0 bg-transparent p-0 shadow-none transition hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3dfc8a] focus-visible:ring-offset-0 active:scale-100"
      aria-label={isOpen ? closeLabel : openLabel}
      aria-expanded={isOpen}
    >
      {isOpen ? (
        <span
          className="flex h-full w-full items-center justify-center rounded-full shadow-lg"
          style={{ backgroundColor: LAUNCHER_BG, color: LAUNCHER_ACCENT }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      ) : (
        <img
          src="/chat-launcher.png"
          alt=""
          width={60}
          height={61}
          className="h-[3.75rem] w-auto drop-shadow-lg"
          draggable={false}
        />
      )}
    </button>
  );
}
