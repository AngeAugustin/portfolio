import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProjectImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
}

/** Local project assets — avoids remote image optimizer timeouts. */
export function ProjectImage({
  src,
  alt,
  className,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  fill = true,
}: ProjectImageProps) {
  const isSvg = src.endsWith(".svg");

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      priority={priority}
      sizes={sizes}
      unoptimized={isSvg}
      className={cn("object-cover", className)}
    />
  );
}
