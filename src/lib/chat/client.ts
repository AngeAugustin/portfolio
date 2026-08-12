import { getStrapiUrl } from "@/lib/cms/config";
import { sanitizeAssistantReply } from "@/lib/chat/guardrails";
import type { ApiChatMessage } from "@/lib/chat/validation";
import type { Locale } from "@/lib/chat/types";

interface ChatApiResponse {
  reply: string;
}

interface ChatApiErrorBody {
  error: string;
  code?: string;
}

export class ChatApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
  ) {
    super(message);
    this.name = "ChatApiError";
  }
}

function getChatApiUrl(): string {
  return `${getStrapiUrl()}/api/chat`;
}

export async function streamChatMessage(
  locale: Locale,
  messages: ApiChatMessage[],
  onDelta: (content: string) => void,
): Promise<string> {
  const response = await fetch(getChatApiUrl(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "text/plain",
    },
    body: JSON.stringify({ locale, messages }),
  });

  if (!response.ok) {
    let message = "Failed to generate a response.";
    let code: string | undefined;

    try {
      const data = (await response.json()) as ChatApiErrorBody;
      if (data.error) message = data.error;
      code = data.code;
    } catch {
      // Stream error body may not be JSON
    }

    throw new ChatApiError(message, response.status, code);
  }

  if (!response.body) {
    throw new ChatApiError("The AI returned an empty response.", 502);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let content = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    content += decoder.decode(value, { stream: true });
    onDelta(content);
  }

  content += decoder.decode();
  const sanitized = sanitizeAssistantReply(content.trim(), locale);

  if (sanitized !== content.trim()) {
    onDelta(sanitized);
  }

  if (!sanitized) {
    throw new ChatApiError("The AI returned an empty response.", 502);
  }

  return sanitized;
}
