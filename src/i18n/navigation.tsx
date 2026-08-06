import {
  createElement,
  forwardRef,
  useCallback,
  useMemo,
  type ComponentPropsWithoutRef,
  type ElementType,
} from "react";
import {
  Link as RouterLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { routing, type Locale } from "./routing";

function stripLocale(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && routing.locales.includes(segments[0] as Locale)) {
    const rest = segments.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }
  return pathname || "/";
}

function withLocale(href: string, locale: Locale): string {
  const normalized = href.startsWith("/") ? href : `/${href}`;
  if (normalized === "/") return `/${locale}`;
  return `/${locale}${normalized}`;
}

export function usePathname(): string {
  const { pathname } = useLocation();
  return stripLocale(pathname);
}

export function useRouter() {
  const navigate = useNavigate();
  const { locale = routing.defaultLocale } = useParams<{ locale: string }>();
  const currentLocale = routing.locales.includes(locale as Locale)
    ? (locale as Locale)
    : routing.defaultLocale;

  return useMemo(
    () => ({
      replace: (href: string, options?: { locale?: Locale }) => {
        const nextLocale = options?.locale ?? currentLocale;
        navigate(withLocale(href, nextLocale), { replace: true });
      },
      push: (href: string, options?: { locale?: Locale }) => {
        const nextLocale = options?.locale ?? currentLocale;
        navigate(withLocale(href, nextLocale));
      },
    }),
    [currentLocale, navigate]
  );
}

export function getPathname(href: string, locale: Locale): string {
  return withLocale(href, locale);
}

type LinkProps = Omit<ComponentPropsWithoutRef<typeof RouterLink>, "to"> & {
  href: string;
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { href, ...props },
  ref
) {
  const { locale = routing.defaultLocale } = useParams<{ locale: string }>();
  const currentLocale = routing.locales.includes(locale as Locale)
    ? (locale as Locale)
    : routing.defaultLocale;

  return createElement(RouterLink, {
  ...props,
  ref,
  to: withLocale(href, currentLocale),
  });
});

type PolymorphicLinkProps<T extends ElementType> = {
  href: string;
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, "href" | "to">;

export function useLocalizedHref() {
  const { locale = routing.defaultLocale } = useParams<{ locale: string }>();
  const currentLocale = routing.locales.includes(locale as Locale)
    ? (locale as Locale)
    : routing.defaultLocale;

  return useCallback(
    (href: string) => withLocale(href, currentLocale),
    [currentLocale]
  );
}

export { stripLocale, withLocale };
