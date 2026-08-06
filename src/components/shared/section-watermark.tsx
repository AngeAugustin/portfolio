import { cn } from "@/lib/utils";

interface SectionWatermarkProps {
  text: string;
  /**
   * How far the watermark bleeds past parent padding toward the left edge.
   * - container: editorial / section px-5 sm:px-8 lg:px-12
   * - card: CTA card px-8 md:px-16
   * - none: flush to parent left
   */
  bleed?: "container" | "card" | "none";
  className?: string;
}

/** Large faint word behind section titles — left-aligned, clipped so it never causes x-scroll. */
export function SectionWatermark({
  text,
  bleed = "container",
  className,
}: SectionWatermarkProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-y-0 right-0 overflow-hidden",
        bleed === "container" && "-left-5 sm:-left-8 lg:-left-12",
        bleed === "card" && "-left-8 md:-left-16",
        bleed === "none" && "left-0"
      )}
    >
      <span
        className={cn(
          "absolute left-0 top-1/2 -translate-y-[48%] select-none whitespace-nowrap font-display text-[clamp(3.5rem,16vw,10rem)] font-extrabold uppercase leading-none tracking-tight text-foreground/[0.05]",
          className
        )}
      >
        {text}
      </span>
    </div>
  );
}
