"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Send } from "lucide-react";
import { useLocale, useTranslations } from "@/i18n/context";
import { SectionHeader } from "@/components/shared/section-header";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { submitContactMessage } from "@/lib/cms";

export function ContactSection({ compact = false }: { compact?: boolean }) {
  const t = useTranslations("contact");
  const locale = useLocale();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const message = String(formData.get("message") ?? "");

    setStatus("sending");

    try {
      await submitContactMessage({ name, email, message, locale });
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className={
        compact
          ? "scroll-mt-28 border-t border-border/60 pb-24 pt-16 md:pt-20"
          : "section-padding border-t border-border"
      }
    >
      <div className="editorial-container">
        <div className={compact ? "mx-auto max-w-2xl" : "grid gap-16 lg:grid-cols-2"}>
          {!compact ? (
            <SectionHeader
              label={t("label")}
              title={t("title")}
              subtitle={t("subtitle")}
              className="mb-0"
            />
          ) : (
            <SectionHeader
              label={t("form.label")}
              title={t("form.title")}
              subtitle={t("form.subtitle")}
              align="center"
              className="mb-10 md:mb-12"
            />
          )}

          <ScrollReveal className={compact ? undefined : "lg:col-start-2"}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">{t("name")}</Label>
                <Input
                  id="name"
                  name="name"
                  required
                  placeholder="Your name"
                  disabled={status === "sending"}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">{t("email")}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="hello@example.com"
                  disabled={status === "sending"}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="message">{t("message")}</Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  placeholder="..."
                  rows={5}
                  disabled={status === "sending"}
                />
              </div>
              <Button type="submit" disabled={status === "sending"} className="gap-2">
                {status === "sending" ? t("sending") : t("send")}
                <Send className="size-4" />
              </Button>
              {status === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-glow"
                >
                  {t("success")}
                </motion.p>
              )}
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-destructive"
                >
                  {t("error")}
                </motion.p>
              )}
            </form>
          </ScrollReveal>
        </div>

        {!compact && (
          <p className="mt-12 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <MapPin className="size-4" />
            {t("location")}
          </p>
        )}
      </div>
    </section>
  );
}
