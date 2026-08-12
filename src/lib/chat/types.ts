import type { Locale } from "@/i18n/routing";

export type { Locale };

export type MessageRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: number;
}

export interface SuggestedQuestion {
  id: string;
  label: string;
}

export interface ChatUiCopy {
  openChat: string;
  closeChat: string;
  chatTitle: string;
  chatSubtitle: string;
  assistantRole: string;
  justNow: string;
  welcome: string;
  placeholder: string;
  send: string;
  typing: string;
  disclaimer: string;
  language: string;
  errorGeneric: string;
  errorRateLimit: string;
  errorNotConfigured: string;
}
