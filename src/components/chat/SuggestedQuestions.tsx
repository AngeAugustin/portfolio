"use client";

import type { SuggestedQuestion } from "@/lib/chat/types";

interface SuggestedQuestionsProps {
  questions: SuggestedQuestion[];
  onSelect: (question: string) => void;
  disabled?: boolean;
}

export function SuggestedQuestions({
  questions,
  onSelect,
  disabled = false,
}: SuggestedQuestionsProps) {
  return (
    <div className="ml-auto flex max-w-[85%] flex-col items-end gap-2 pt-1">
      {questions.map((question) => (
        <button
          key={question.id}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(question.label)}
          className="rounded-full border border-border bg-card px-4 py-2 text-left text-xs leading-snug text-primary transition hover:border-glow hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
        >
          {question.label}
        </button>
      ))}
    </div>
  );
}
