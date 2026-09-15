"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, MessageSquare, Send } from "lucide-react";
import { useLocale, useTranslations } from "@/i18n/context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  fetchArticleComments,
  fetchArticleLikes,
  submitArticleComment,
  toggleArticleLike,
  type ArticleComment,
} from "@/lib/cms";
import { cn } from "@/lib/utils";

function formatCommentDate(iso: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0]![0] ?? ""}${parts[1]![0] ?? ""}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase() || "?";
}

interface ArticleEngagementProps {
  slug: string;
  enabled?: boolean;
}

export function ArticleEngagement({
  slug,
  enabled = true,
}: ArticleEngagementProps) {
  const t = useTranslations("blog.engagement");
  const locale = useLocale();

  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likeBusy, setLikeBusy] = useState(false);
  const [comments, setComments] = useState<ArticleComment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [formStatus, setFormStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  useEffect(() => {
    if (!enabled) {
      setCommentsLoading(false);
      return;
    }

    let cancelled = false;

    async function load() {
      setCommentsLoading(true);
      try {
        const [likes, list] = await Promise.all([
          fetchArticleLikes(slug, locale),
          fetchArticleComments(slug, locale),
        ]);
        if (cancelled) return;
        setLikeCount(likes.likeCount);
        setLiked(likes.liked);
        setComments(list);
      } catch {
        if (!cancelled) {
          setComments([]);
        }
      } finally {
        if (!cancelled) setCommentsLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [slug, locale, enabled]);

  async function handleLike() {
    if (!enabled || likeBusy) return;
    setLikeBusy(true);

    const prevLiked = liked;
    const prevCount = likeCount;
    setLiked(!prevLiked);
    setLikeCount(Math.max(0, prevCount + (prevLiked ? -1 : 1)));

    try {
      const next = await toggleArticleLike(slug, locale);
      setLiked(next.liked);
      setLikeCount(next.likeCount);
    } catch {
      setLiked(prevLiked);
      setLikeCount(prevCount);
    } finally {
      setLikeBusy(false);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!enabled) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const authorName = String(formData.get("authorName") ?? "");
    const authorEmail = String(formData.get("authorEmail") ?? "");
    const body = String(formData.get("body") ?? "");

    setFormStatus("sending");
    try {
      await submitArticleComment({
        slug,
        locale,
        authorName,
        authorEmail,
        body,
      });
      form.reset();
      setFormStatus("success");
    } catch {
      setFormStatus("error");
    }
  }

  if (!enabled) return null;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex flex-wrap items-center justify-between gap-4 border-y border-border/70 py-6">
        <button
          type="button"
          onClick={() => void handleLike()}
          disabled={likeBusy}
          aria-pressed={liked}
          className={cn(
            "group inline-flex items-center gap-2.5 rounded-full border px-4 py-2.5 text-sm font-medium transition-all",
            liked
              ? "border-glow/40 bg-glow/10 text-glow"
              : "border-border bg-card text-muted-foreground hover:border-glow/30 hover:text-foreground"
          )}
        >
          <Heart
            className={cn(
              "size-4 transition-transform group-hover:scale-110",
              liked && "fill-current"
            )}
            strokeWidth={1.75}
          />
          <span>{liked ? t("liked") : t("like")}</span>
          <span className="tabular-nums text-xs opacity-80">{likeCount}</span>
        </button>

        <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          <MessageSquare className="size-4" strokeWidth={1.75} />
          {t("commentCount", { count: comments.length })}
        </p>
      </div>

      <div className="mt-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-glow">
          {t("label")}
        </p>
        <h2 className="mt-2 font-display text-2xl font-bold tracking-tight md:text-3xl">
          {t("title")}
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
          {t("subtitle")}
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="authorName">{t("name")}</Label>
              <Input
                id="authorName"
                name="authorName"
                required
                maxLength={80}
                placeholder={t("namePlaceholder")}
                disabled={formStatus === "sending"}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="authorEmail">{t("email")}</Label>
              <Input
                id="authorEmail"
                name="authorEmail"
                type="email"
                maxLength={160}
                placeholder={t("emailPlaceholder")}
                disabled={formStatus === "sending"}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="body">{t("message")}</Label>
            <Textarea
              id="body"
              name="body"
              required
              rows={4}
              maxLength={2000}
              placeholder={t("messagePlaceholder")}
              disabled={formStatus === "sending"}
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="submit"
              disabled={formStatus === "sending"}
              className="gap-2"
            >
              {formStatus === "sending" ? t("sending") : t("submit")}
              <Send className="size-4" />
            </Button>
            {formStatus === "success" ? (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-glow"
              >
                {t("success")}
              </motion.p>
            ) : null}
            {formStatus === "error" ? (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-destructive"
              >
                {t("error")}
              </motion.p>
            ) : null}
          </div>
        </form>

        <div className="mt-12 space-y-6">
          {commentsLoading ? (
            <div className="space-y-4">
              <div className="h-20 animate-pulse rounded-2xl bg-secondary/60" />
              <div className="h-20 animate-pulse rounded-2xl bg-secondary/40" />
            </div>
          ) : comments.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t("empty")}</p>
          ) : (
            comments.map((comment) => (
              <article
                key={comment.id}
                className="border-b border-border/60 pb-6 last:border-b-0 last:pb-0"
              >
                <div className="flex items-start gap-3">
                  <div
                    aria-hidden
                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-forest/10 text-xs font-semibold text-forest"
                  >
                    {initials(comment.authorName)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <p className="font-medium text-foreground">
                        {comment.authorName}
                      </p>
                      <time className="text-xs text-muted-foreground">
                        {formatCommentDate(comment.createdAt, locale)}
                      </time>
                    </div>
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground md:text-base">
                      {comment.body}
                    </p>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
