import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  label,
  title,
  subtitle,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <ScrollReveal
      className={cn(
        "mb-16 max-w-3xl md:mb-20",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <Badge variant="outline" className="mb-4">
        {label}
      </Badge>
      <h2 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground md:text-xl">
          {subtitle}
        </p>
      )}
    </ScrollReveal>
  );
}
