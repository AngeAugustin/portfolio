import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="editorial-container flex min-h-[60vh] flex-col justify-center gap-6 py-32">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-16 w-full max-w-2xl" />
      <Skeleton className="h-6 w-full max-w-xl" />
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
      </div>
    </div>
  );
}
