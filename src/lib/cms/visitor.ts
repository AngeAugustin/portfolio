const STORAGE_KEY = "portfolio-visitor-key";

function createVisitorKey() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID().replace(/-/g, "");
  }
  return `v${Date.now().toString(36)}${Math.random().toString(36).slice(2, 12)}`;
}

/** Stable anonymous visitor id stored in localStorage (for likes / comments). */
export function getVisitorKey(): string {
  try {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (existing && /^[a-zA-Z0-9_-]{8,64}$/.test(existing)) {
      return existing;
    }
    const next = createVisitorKey().slice(0, 64);
    localStorage.setItem(STORAGE_KEY, next);
    return next;
  } catch {
    return createVisitorKey().slice(0, 64);
  }
}
