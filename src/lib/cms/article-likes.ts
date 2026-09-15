import { strapiFetch } from "./client";
import { getVisitorKey } from "./visitor";

export type ArticleLikeState = {
  likeCount: number;
  liked: boolean;
};

export async function fetchArticleLikes(
  slug: string,
  locale: string
): Promise<ArticleLikeState> {
  const visitorKey = getVisitorKey();
  const params = new URLSearchParams({
    slug,
    locale,
    visitorKey,
  });

  const response = await strapiFetch<{ data: ArticleLikeState }>(
    `/api/article-likes?${params.toString()}`
  );

  return {
    likeCount: response.data?.likeCount ?? 0,
    liked: Boolean(response.data?.liked),
  };
}

export async function toggleArticleLike(
  slug: string,
  locale: string
): Promise<ArticleLikeState> {
  const visitorKey = getVisitorKey();
  const response = await strapiFetch<{ data: ArticleLikeState }>(
    "/api/article-likes",
    {
      method: "POST",
      body: JSON.stringify({
        data: { slug, locale, visitorKey },
      }),
    }
  );

  return {
    likeCount: response.data?.likeCount ?? 0,
    liked: Boolean(response.data?.liked),
  };
}
