"use client";

import { AssistantMessageContent } from "@/components/chat/AssistantMessageContent";
import { formatMessageTime } from "@/components/chat/chatUtils";
import { SuggestedQuestions } from "@/components/chat/SuggestedQuestions";
import type { ChatMessage, Locale, SuggestedQuestion } from "@/lib/chat/types";

interface ChatMessagesProps {
  messages: ChatMessage[];
  isTyping: boolean;
  typingLabel: string;
  streamingMessageId?: string | null;
  locale: Locale;
  assistantName: string;
  assistantRole: string;
  justNow: string;
  showSuggestions: boolean;
  questions: SuggestedQuestion[];
  onSelectSuggestion: (question: string) => void;
  suggestionsDisabled?: boolean;
}

export function ChatMessages({
  messages,
  isTyping,
  typingLabel,
  streamingMessageId,
  locale,
  assistantName,
  assistantRole,
  justNow,
  showSuggestions,
  questions,
  onSelectSuggestion,
  suggestionsDisabled = false,
}: ChatMessagesProps) {
  const streamingMessage = streamingMessageId
    ? messages.find((message) => message.id === streamingMessageId)
    : undefined;
  const waitingForFirstToken =
    isTyping &&
    (!streamingMessageId || !streamingMessage?.content.trim());

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-4">
      {messages.map((message) => {
        const isStreaming = message.id === streamingMessageId;
        const isEmpty = !message.content.trim();

        if (isEmpty) {
          return null;
        }

        if (message.role === "user") {
          return (
            <div key={message.id} className="flex justify-end">
              <div className="max-w-[85%] rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap text-primary-foreground shadow-sm">
                {message.content}
              </div>
            </div>
          );
        }

        return (
          <div key={message.id} className="flex max-w-[90%] flex-col gap-1.5">
            <div className="rounded-2xl rounded-bl-md bg-card px-4 py-3 text-sm leading-relaxed text-foreground shadow-sm">
              <AssistantMessageContent
                content={message.content}
                isStreaming={isStreaming}
              />
            </div>
            <p className="px-1 text-[11px] text-muted-foreground">
              {assistantName} • {assistantRole} •{" "}
              {formatMessageTime(message.createdAt, locale, justNow)}
            </p>
          </div>
        );
      })}

      {waitingForFirstToken && (
        <div className="flex max-w-[90%] flex-col gap-1.5">
          <div
            className="flex items-center rounded-2xl rounded-bl-md bg-card px-4 py-3 shadow-sm"
            role="status"
            aria-label={typingLabel}
          >
            <span className="flex gap-1" aria-hidden="true">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-glow [animation-delay:0ms]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-glow [animation-delay:150ms]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-glow [animation-delay:300ms]" />
            </span>
          </div>
        </div>
      )}

      {showSuggestions && (
        <SuggestedQuestions
          questions={questions}
          onSelect={onSelectSuggestion}
          disabled={suggestionsDisabled}
        />
      )}
    </div>
  );
}
