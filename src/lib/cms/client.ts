import { getStrapiUrl } from "./config";

export class CmsError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "CmsError";
    this.status = status;
  }
}

export async function strapiFetch<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const url = `${getStrapiUrl()}${normalized}`;

  const headers = new Headers(init?.headers);
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const token = import.meta.env.VITE_STRAPI_TOKEN;
  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(url, {
    ...init,
    headers,
  });

  if (!response.ok) {
    throw new CmsError(`Strapi request failed (${response.status})`, response.status);
  }

  return response.json() as Promise<T>;
}

export function withLocale(path: string, locale: string, extra = ""): string {
  const joiner = path.includes("?") ? "&" : "?";
  return `${path}${joiner}locale=${encodeURIComponent(locale)}${extra ? `&${extra}` : ""}`;
}
