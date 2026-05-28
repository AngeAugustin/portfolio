"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/shared/section-header";
import { StaggerGroup } from "@/components/motion/stagger-group";
import { staggerItem } from "@/lib/animations";
import { Link } from "@/i18n/navigation";

type SkillGroup = { name: string; skills: string[] };

export function SkillsSection({
  compact = false,
  showLink = true,
}: {
  compact?: boolean;
  showLink?: boolean;
}) {
  const t = useTranslations("skills");
  const tRoot = useTranslations();
  const groups = tRoot.raw("skillGroups") as SkillGroup[];

  return (
    <section
      id="skills"
      className={
        compact
          ? "scroll-mt-28 border-t border-border/60 pb-24 pt-16 md:pt-20"
          : "section-padding border-y border-border/60 bg-secondary/20"
      }
    >
      <div className="editorial-container">
        {!compact && (
          <SectionHeader
            label={t("label")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        )}

        <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group, i) => (
            <motion.div
              key={group.name}
              variants={staggerItem}
              className="group rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg hover:shadow-glow/5 md:p-8"
              whileHover={{ y: -4 }}
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-glow">
                0{i + 1}
              </span>
              <h3 className="mt-3 font-display text-xl font-bold">{group.name}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </StaggerGroup>

        {!compact && showLink && (
          <div className="mt-12 text-center">
            <Link href="/about#skills" className="text-sm font-medium text-primary hover:underline">
              {t("label")} →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
