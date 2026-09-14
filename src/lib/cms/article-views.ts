import { strapiFetch } from "./client";

export async function trackArticleView(
  slug: string,
  locale: string
): Promise<void> {
  const key = `article-view:${locale}:${slug}`;

  try {
    if (typeof sessionStorage !== "undefined" && sessionStorage.getItem(key)) {
      return;
    }
  } catch {
    // sessionStorage may be unavailable
  }

  try {
    await strapiFetch("/api/article-views", {
      method: "POST",
      body: JSON.stringify({
        data: { slug, locale },
      }),
    });

    try {
      sessionStorage.setItem(key, "1");
    } catch {
      // ignore quota / private mode
    }
  } catch {
    // Tracking must never break the article page
  }
}
