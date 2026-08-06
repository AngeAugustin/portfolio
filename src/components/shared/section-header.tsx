import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { SectionWatermark } from "@/components/shared/section-watermark";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  /**
   * Large faint word behind the title.
   * Defaults to `label`. Pass `false` to disable, or a custom string.
   */
  watermark?: string | false;
  align?: "left" | "center";
  className?: string;
}

function resolveWatermark(
  watermark: string | false | undefined,
  label: string
): string | null {
  if (watermark === false) return null;
  // Missing i18n keys fall back to the path ("watermark") — treat as unset.
  if (!watermark || watermark === "watermark") return label;
  return watermark;
}

export function SectionHeader({
  label,
  title,
  subtitle,
  watermark,
  align = "left",
  className,
}: SectionHeaderProps) {
  const watermarkText = resolveWatermark(watermark, label);

  return (
    <ScrollReveal
      className={cn("relative mb-16 overflow-x-clip md:mb-20", className)}
    >
      {watermarkText && <SectionWatermark text={watermarkText} />}

      <div
        className={cn(
          "relative z-10 max-w-3xl",
          align === "center" && "mx-auto text-center"
        )}
      >
        <Badge variant="outline" className="mb-4">
          {label}
        </Badge>
        <h2 className="font-display text-4xl font-extrabold tracking-tight text-balance text-foreground md:text-5xl lg:text-6xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground md:text-xl">
            {subtitle}
          </p>
        )}
      </div>
    </ScrollReveal>
  );
}
