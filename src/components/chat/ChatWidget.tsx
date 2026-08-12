import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ChatInput } from "@/components/chat/ChatInput";
import { ChatLauncherButton, ChatLauncherIcon } from "@/components/chat/ChatLauncherButton";
import { ChatMessages } from "@/components/chat/ChatMessages";
import { LocaleFlag } from "@/components/LocaleFlag";
import { useLocale, useTranslations } from "@/i18n/context";
import type { Locale } from "@/i18n/routing";
import { ChatApiError, streamChatMessage } from "@/lib/chat/client";
import { getSalaryRefusal, isSalaryQuestion } from "@/lib/chat/guardrails";
import type { ApiChatMessage } from "@/lib/chat/validation";
import type { ChatMessage, SuggestedQuestion } from "@/lib/chat/types";

function createMessage(role: ChatMessage["role"], content: string): ChatMessage {
  return {
    id: crypto.randomUUID(),
    role,
    content,
    createdAt: Date.now(),
  };
}

function toApiMessages(messages: ChatMessage[]): ApiChatMessage[] {
  const firstUserIndex = messages.findIndex((message) => message.role === "user");
  if (firstUserIndex === -1) {
    return [];
  }

  return messages
    .slice(firstUserIndex)
    .slice(-10)
    .map(({ role, content }) => ({ role, content }));
}

export function ChatWidget() {
  const locale = useLocale();
  const navigate = useNavigate();
  const location = useLocation();
  const t = useTranslations("chat");
  const welcome = t("welcome");
  const suggestions = (t.raw("suggestions") as SuggestedQuestion[] | undefined) ?? [];

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    createMessage("assistant", welcome),
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const showSuggestions = !messages.some((message) => message.role === "user");

  useEffect(() => {
    setMessages([createMessage("assistant", welcome)]);
    setInput("");
    setIsTyping(false);
    setStreamingMessageId(null);
  }, [locale, welcome]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, streamingMessageId, showSuggestions]);

  const sendMessage = useCallback(
    async (content: string) => {
      const trimmed = content.trim();
      if (!trimmed || isTyping) return;

      const userMessage = createMessage("user", trimmed);
      const nextMessages = [...messages, userMessage];

      setInput("");
      setMessages(nextMessages);
      setIsTyping(true);

      if (isSalaryQuestion(trimmed)) {
        setMessages((prev) => [
          ...prev,
          createMessage("assistant", getSalaryRefusal(locale)),
        ]);
        setIsTyping(false);
        return;
      }

      const assistantMessage = createMessage("assistant", "");
      const assistantId = assistantMessage.id;

      setMessages((prev) => [...prev, assistantMessage]);
      setStreamingMessageId(assistantId);

      try {
        await streamChatMessage(
          locale,
          toApiMessages(nextMessages),
          (delta) => {
            setMessages((prev) =>
              prev.map((message) =>
                message.id === assistantId
                  ? { ...message, content: delta }
                  : message,
              ),
            );
          },
        );
      } catch (error) {
        let errorMessage = t("errorGeneric");

        if (error instanceof ChatApiError) {
          if (error.status === 429) {
            errorMessage = t("errorRateLimit");
          } else if (error.status === 503) {
            errorMessage = t("errorNotConfigured");
          }
        }

        setMessages((prev) =>
          prev.map((message) =>
            message.id === assistantId
              ? { ...message, content: errorMessage }
              : message,
          ),
        );
      } finally {
        setStreamingMessageId(null);
        setIsTyping(false);
      }
    },
    [isTyping, locale, messages, t],
  );

  function toggleLocale() {
    const nextLocale: Locale = locale === "fr" ? "en" : "fr";
    const suffix = location.pathname.replace(/^\/(fr|en)/, "") || "";
    navigate(`/${nextLocale}${suffix}${location.search}${location.hash}`);
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 sm:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
        {isOpen && (
          <section
            role="dialog"
            aria-label={t("chatTitle")}
            className="flex h-[min(580px,calc(100dvh-6rem))] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden rounded-[20px] border border-border bg-card shadow-2xl"
          >
            <header className="flex items-center gap-3 bg-forest px-4 py-3.5 text-forest-foreground">
              <div className="relative shrink-0">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-glow">
                  <ChatLauncherIcon className="h-7 w-7" />
                </div>
                <span
                  className="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-forest bg-glow"
                  aria-hidden="true"
                />
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="truncate text-base font-semibold">{t("chatTitle")}</h2>
                <p className="truncate text-xs text-forest-foreground/70">
                  {t("chatSubtitle")}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-1.5">
                <button
                  type="button"
                  onClick={toggleLocale}
                  className="rounded-lg bg-white/10 px-2 py-1 text-base leading-none transition hover:bg-white/20"
                  aria-label={t("language")}
                  title={t("language")}
                >
                  <LocaleFlag locale={locale} />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg bg-white/10 p-2 transition hover:bg-white/20"
                  aria-label={t("closeChat")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                  </svg>
                </button>
              </div>
            </header>

            <div className="flex min-h-0 flex-1 flex-col bg-secondary">
              <ChatMessages
                messages={messages}
                isTyping={isTyping}
                typingLabel={t("typing")}
                streamingMessageId={streamingMessageId}
                locale={locale}
                assistantName={t("chatTitle")}
                assistantRole={t("assistantRole")}
                justNow={t("justNow")}
                showSuggestions={showSuggestions}
                questions={suggestions}
                onSelectSuggestion={sendMessage}
                suggestionsDisabled={isTyping}
              />
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-border bg-card">
              <ChatInput
                value={input}
                onChange={setInput}
                onSubmit={() => sendMessage(input)}
                placeholder={t("placeholder")}
                sendLabel={t("send")}
                disabled={isTyping}
              />

              <p className="px-4 pb-3 text-[10px] leading-relaxed text-muted-foreground">
                {t("disclaimer")}
              </p>
            </div>
          </section>
        )}

        <ChatLauncherButton
          isOpen={isOpen}
          openLabel={t("openChat")}
          closeLabel={t("closeChat")}
          onClick={() => setIsOpen((open) => !open)}
        />
      </div>
    </>
  );
}
