import { OptimizedImage } from "@/components/shared/optimized-image";
import { cn } from "@/lib/utils";

export function ToolLogoChip({
  name,
  image,
  className,
}: {
  name: string;
  image: string;
  className?: string;
}) {
  return (
    <span
      title={name}
      className={cn(
        "relative flex h-11 w-[10.5rem] shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-card",
        className
      )}
    >
      <OptimizedImage
        src={encodeURI(image)}
        alt={name}
        fill
        className="object-contain object-center dark:bg-white"
      />
    </span>
  );
}
