import { strapiFetch } from "./client";
import { getVisitorKey } from "./visitor";

export type ArticleComment = {
  id: string;
  authorName: string;
  body: string;
  createdAt: string;
  status?: string;
};

export type ArticleCommentPayload = {
  slug: string;
  locale: string;
  authorName: string;
  authorEmail?: string;
  body: string;
};

export async function fetchArticleComments(
  slug: string,
  locale: string
): Promise<ArticleComment[]> {
  const params = new URLSearchParams({ slug, locale });
  const response = await strapiFetch<{ data: ArticleComment[] }>(
    `/api/article-comments?${params.toString()}`
  );
  return response.data || [];
}

export async function submitArticleComment(
  payload: ArticleCommentPayload
): Promise<ArticleComment> {
  const authorName = payload.authorName.trim();
  const authorEmail = payload.authorEmail?.trim() || "";
  const body = payload.body.trim();

  if (!authorName || !body) {
    throw new Error("Missing required comment fields");
  }

  const response = await strapiFetch<{ data: ArticleComment }>(
    "/api/article-comments",
    {
      method: "POST",
      body: JSON.stringify({
        data: {
          slug: payload.slug,
          locale: payload.locale,
          authorName,
          authorEmail: authorEmail || undefined,
          body,
          visitorKey: getVisitorKey(),
        },
      }),
    }
  );

  return response.data;
}
