import type { ReactNode } from "react";

type Props = {
  namespaces?: readonly string[];
  children: ReactNode;
};

/** Page-scoped intl wrapper - kept for API parity; root provider loads all messages. */
export function PageIntl({ children }: Props) {
  return children;
}
