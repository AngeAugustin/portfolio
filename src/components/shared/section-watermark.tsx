import { cn } from "@/lib/utils";

interface SectionWatermarkProps {
  text: string;
  /**
   * How far the watermark shifts left past parent content into section padding.
   * - container: editorial / section px-5 sm:px-8 lg:px-12
   * - card: CTA card px-8 md:px-16
   * - none: flush to parent left (use when parent already owns the padding)
   */
  bleed?: "container" | "card" | "none";
  className?: string;
}

/**
 * Large faint word behind section titles — left-aligned, free to paint over
 * left/right padding. Horizontal clip is handled by section/main, not here.
 */
export function SectionWatermark({
  text,
  bleed = "container",
  className,
}: SectionWatermarkProps) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute top-1/2 z-0 -translate-y-[48%] select-none whitespace-nowrap font-display text-[clamp(3.5rem,16vw,10rem)] font-extrabold uppercase leading-none tracking-tight text-foreground/[0.05]",
        bleed === "container" && "-left-5 sm:-left-8 lg:-left-12",
        bleed === "card" && "-left-8 md:-left-16",
        bleed === "none" && "left-0",
        className
      )}
    >
      {text}
    </span>
  );
}
