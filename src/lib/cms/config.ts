export function getStrapiUrl(): string {
  const url = import.meta.env.VITE_STRAPI_URL?.replace(/\/$/, "");
  return url || "http://localhost:1337";
}

export function isCmsConfigured(): boolean {
  return Boolean(import.meta.env.VITE_STRAPI_URL);
}
