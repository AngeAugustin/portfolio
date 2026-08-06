import { useEffect } from "react";

type PageMetaOptions = {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
};

function upsertMeta(name: string, content: string, attribute: "name" | "property" = "name") {
  let element = document.querySelector(`meta[${attribute}="${name}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

export function usePageMeta({
  title,
  description,
  ogTitle,
  ogDescription,
}: PageMetaOptions) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) upsertMeta("description", description);
    if (ogTitle) upsertMeta("og:title", ogTitle, "property");
    if (ogDescription) upsertMeta("og:description", ogDescription, "property");
  }, [title, description, ogTitle, ogDescription]);
}

export function useDocumentLang(locale: string) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
}
