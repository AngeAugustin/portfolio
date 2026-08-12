"use client";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder: string;
  sendLabel: string;
  disabled?: boolean;
}

export function ChatInput({
  value,
  onChange,
  onSubmit,
  placeholder,
  sendLabel,
  disabled = false,
}: ChatInputProps) {
  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!value.trim() || disabled) return;
    onSubmit();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (!value.trim() || disabled) return;
      onSubmit();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card px-4 pb-3 pt-2">
      <div className="relative flex items-center">
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          maxLength={500}
          aria-label={placeholder}
          className="max-h-24 min-h-[48px] w-full resize-none rounded-full border border-border bg-muted py-3 pr-14 pl-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-glow focus:ring-2 focus:ring-glow/20 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={disabled || !value.trim()}
          aria-label={sendLabel}
          className="absolute right-1.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-glow text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
          </svg>
        </button>
      </div>
    </form>
  );
}
