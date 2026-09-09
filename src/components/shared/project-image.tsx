import { OptimizedImage } from "@/components/shared/optimized-image";
import { cn } from "@/lib/utils";

interface ProjectImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
}

/** Local project assets - avoids remote image optimizer timeouts. */
export function ProjectImage({
  src,
  alt,
  className,
  priority = false,
  fill = true,
}: ProjectImageProps) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      fill={fill}
      priority={priority}
      className={cn("object-cover", className)}
    />
  );
}
