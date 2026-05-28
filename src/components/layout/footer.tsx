"use client";

import { Github, Linkedin, Twitter } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Separator } from "@/components/ui/separator";
import { footerNavGroups, siteConfig } from "@/lib/site";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const year = new Date().getFullYear();

  const social = [
    { icon: Github, href: siteConfig.social.github, label: "GitHub" },
    { icon: Linkedin, href: siteConfig.social.linkedin, label: "LinkedIn" },
    { icon: Twitter, href: siteConfig.social.twitter, label: "Twitter" },
  ];

  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="editorial-container py-16 md:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="font-display text-2xl font-bold tracking-tight">
              {siteConfig.name}
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              {t("tagline")}
            </p>
            <div className="mt-6 flex gap-3">
              {social.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-10 items-center justify-center rounded-full border border-border bg-card transition-colors hover:border-glow/40 hover:bg-accent"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {footerNavGroups.map((group) => (
            <div key={group.titleKey}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {t(group.titleKey)}
              </h4>
              <ul className="mt-4 flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={link.key}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                    >
                      {tNav(link.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {t("connect")}
            </h4>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-foreground/80">
              <li>
                <a href={`mailto:${siteConfig.email}`} className="hover:text-foreground">
                  {siteConfig.email}
                </a>
              </li>
              <li>{siteConfig.location}</li>
            </ul>
          </div>
        </div>

        <Separator className="my-10" />

        <p className="text-center text-xs text-muted-foreground md:text-left">
          © {year} {siteConfig.name}. {t("rights")}
        </p>
      </div>
    </footer>
  );
}
