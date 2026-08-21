import { useSeoPage } from "@/lib/page-meta";
import type { SeoPageKey } from "@/lib/seo-config";

export function PageSeo({ page }: { page: SeoPageKey }) {
  useSeoPage(page);
  return null;
}
