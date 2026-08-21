import { motion } from "framer-motion";
import { useTranslations } from "@/i18n/context";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { GradientOrb } from "@/components/motion/gradient-orb";
import { usePageMeta } from "@/lib/page-meta";
import { siteConfig } from "@/lib/site";

export function NotFoundPage() {
  const t = useTranslations("common");

  usePageMeta({
    title: `${t("notFound")} | ${siteConfig.name}`,
    description: t("notFoundDesc"),
    robots: "noindex, follow",
  });

  return (
    <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <GradientOrb className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" size="500px" />
      <motion.span
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="font-display text-[clamp(6rem,20vw,12rem)] font-bold leading-none text-gradient"
      >
        404
      </motion.span>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-4 font-display text-2xl font-bold md:text-4xl"
      >
        {t("notFound")}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="mt-4 max-w-md text-muted-foreground"
      >
        {t("notFoundDesc")}
      </motion.p>
      <Button asChild className="mt-8" size="lg">
        <Link href="/">{t("goHome")}</Link>
      </Button>
    </section>
  );
}
