import { useEffect, useState } from "react";
import { useLocale, useMessages } from "@/i18n/context";
import { fetchArticles, fetchArticleBySlug } from "./articles";
import { fetchEducations } from "./educations";
import { fetchExperiences } from "./experiences";
import {
  articleFallbacks,
  educationFallbacks,
  experienceFallbacks,
  projectFallbacks,
  serviceFallbacks,
} from "./fallbacks";
import { fetchProjectBySlug, fetchProjects } from "./projects";
import { fetchServiceBySlug, fetchServices } from "./services";
import type {
  CmsArticle,
  CmsEducation,
  CmsExperience,
  CmsProject,
  CmsService,
} from "./types";

type CmsListState<T> = {
  data: T[];
  loading: boolean;
  fromCms: boolean;
};

type CmsItemState<T> = {
  data: T | null;
  loading: boolean;
  fromCms: boolean;
};

export function useProjects(): CmsListState<CmsProject> {
  const locale = useLocale();
  const messages = useMessages();
  const fallback = projectFallbacks(messages);
  const [data, setData] = useState<CmsProject[]>(fallback);
  const [loading, setLoading] = useState(true);
  const [fromCms, setFromCms] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetchProjects(locale)
      .then((items) => {
        if (cancelled) return;
        if (items.length > 0) {
          setData(items);
          setFromCms(true);
        } else {
          setData(projectFallbacks(messages));
          setFromCms(false);
        }
      })
      .catch(() => {
        if (cancelled) return;
        setData(projectFallbacks(messages));
        setFromCms(false);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [locale, messages]);

  return { data, loading, fromCms };
}

export function useProject(slug: string | undefined): CmsItemState<CmsProject> {
  const locale = useLocale();
  const messages = useMessages();
  const fallback =
    slug != null
      ? projectFallbacks(messages).find((item) => item.slug === slug) ?? null
      : null;

  const [data, setData] = useState<CmsProject | null>(fallback);
  const [loading, setLoading] = useState(Boolean(slug));
  const [fromCms, setFromCms] = useState(false);

  useEffect(() => {
    if (!slug) {
      setData(null);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    fetchProjectBySlug(slug, locale)
      .then((item) => {
        if (cancelled) return;
        if (item) {
          setData(item);
          setFromCms(true);
        } else {
          setData(
            projectFallbacks(messages).find((entry) => entry.slug === slug) ?? null
          );
          setFromCms(false);
        }
      })
      .catch(() => {
        if (cancelled) return;
        setData(
          projectFallbacks(messages).find((entry) => entry.slug === slug) ?? null
        );
        setFromCms(false);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug, locale, messages]);

  return { data, loading, fromCms };
}

export function useServices(): CmsListState<CmsService> {
  const locale = useLocale();
  const messages = useMessages();
  const fallback = serviceFallbacks(messages);
  const [data, setData] = useState<CmsService[]>(fallback);
  const [loading, setLoading] = useState(true);
  const [fromCms, setFromCms] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetchServices(locale)
      .then((items) => {
        if (cancelled) return;
        if (items.length > 0) {
          setData(items);
          setFromCms(true);
        } else {
          setData(serviceFallbacks(messages));
          setFromCms(false);
        }
      })
      .catch(() => {
        if (cancelled) return;
        setData(serviceFallbacks(messages));
        setFromCms(false);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [locale, messages]);

  return { data, loading, fromCms };
}

export function useService(slug: string | undefined): CmsItemState<CmsService> {
  const locale = useLocale();
  const messages = useMessages();
  const fallback =
    slug != null
      ? serviceFallbacks(messages).find((item) => item.slug === slug) ?? null
      : null;

  const [data, setData] = useState<CmsService | null>(fallback);
  const [loading, setLoading] = useState(Boolean(slug));
  const [fromCms, setFromCms] = useState(false);

  useEffect(() => {
    if (!slug) {
      setData(null);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    fetchServiceBySlug(slug, locale)
      .then((item) => {
        if (cancelled) return;
        if (item) {
          setData(item);
          setFromCms(true);
        } else {
          setData(
            serviceFallbacks(messages).find((entry) => entry.slug === slug) ?? null
          );
          setFromCms(false);
        }
      })
      .catch(() => {
        if (cancelled) return;
        setData(
          serviceFallbacks(messages).find((entry) => entry.slug === slug) ?? null
        );
        setFromCms(false);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug, locale, messages]);

  return { data, loading, fromCms };
}

export function useArticles(): CmsListState<CmsArticle> {
  const locale = useLocale();
  const messages = useMessages();
  const fallback = articleFallbacks(messages);
  const [data, setData] = useState<CmsArticle[]>(fallback);
  const [loading, setLoading] = useState(true);
  const [fromCms, setFromCms] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetchArticles(locale)
      .then((items) => {
        if (cancelled) return;
        if (items.length > 0) {
          setData(items);
          setFromCms(true);
        } else {
          setData(articleFallbacks(messages));
          setFromCms(false);
        }
      })
      .catch(() => {
        if (cancelled) return;
        setData(articleFallbacks(messages));
        setFromCms(false);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [locale, messages]);

  return { data, loading, fromCms };
}

export function useArticle(slug: string | undefined): CmsItemState<CmsArticle> {
  const locale = useLocale();
  const messages = useMessages();
  const fallback =
    slug != null
      ? articleFallbacks(messages).find((item) => item.slug === slug) ?? null
      : null;

  const [data, setData] = useState<CmsArticle | null>(fallback);
  const [loading, setLoading] = useState(Boolean(slug));
  const [fromCms, setFromCms] = useState(false);

  useEffect(() => {
    if (!slug) {
      setData(null);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    fetchArticleBySlug(slug, locale)
      .then((item) => {
        if (cancelled) return;
        if (item) {
          const local = articleFallbacks(messages).find((entry) => entry.slug === slug);
          setData({
            ...item,
            sections: item.sections ?? local?.sections,
            content: item.content || local?.content,
          });
          setFromCms(true);
        } else {
          setData(
            articleFallbacks(messages).find((entry) => entry.slug === slug) ?? null
          );
          setFromCms(false);
        }
      })
      .catch(() => {
        if (cancelled) return;
        setData(
          articleFallbacks(messages).find((entry) => entry.slug === slug) ?? null
        );
        setFromCms(false);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug, locale, messages]);

  return { data, loading, fromCms };
}

export function useExperiences(): CmsListState<CmsExperience> {
  const locale = useLocale();
  const messages = useMessages();
  const fallback = experienceFallbacks(messages);
  const [data, setData] = useState<CmsExperience[]>(fallback);
  const [loading, setLoading] = useState(true);
  const [fromCms, setFromCms] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetchExperiences(locale)
      .then((items) => {
        if (cancelled) return;
        if (items.length > 0) {
          setData(items);
          setFromCms(true);
        } else {
          setData(experienceFallbacks(messages));
          setFromCms(false);
        }
      })
      .catch(() => {
        if (cancelled) return;
        setData(experienceFallbacks(messages));
        setFromCms(false);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [locale, messages]);

  return { data, loading, fromCms };
}

export function useEducations(): CmsListState<CmsEducation> {
  const locale = useLocale();
  const messages = useMessages();
  const fallback = educationFallbacks(messages);
  const [data, setData] = useState<CmsEducation[]>(fallback);
  const [loading, setLoading] = useState(true);
  const [fromCms, setFromCms] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetchEducations(locale)
      .then((items) => {
        if (cancelled) return;
        if (items.length > 0) {
          setData(items);
          setFromCms(true);
        } else {
          setData(educationFallbacks(messages));
          setFromCms(false);
        }
      })
      .catch(() => {
        if (cancelled) return;
        setData(educationFallbacks(messages));
        setFromCms(false);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [locale, messages]);

  return { data, loading, fromCms };
}
