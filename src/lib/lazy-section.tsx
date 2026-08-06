import { lazy, Suspense, type ComponentType } from "react";

type SectionModule<P extends object> = Record<string, ComponentType<P>>;

/** Lazy-load a named section export without a loading skeleton flash. */
export function lazySection<P extends object = object>(
  importFn: () => Promise<SectionModule<P>>,
  exportName: string
) {
  const LazyComponent = lazy(() =>
    importFn().then((mod) => ({ default: mod[exportName] as ComponentType<P> }))
  );

  return function LazySectionWrapper(props: P) {
    return (
      <Suspense fallback={null}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}
