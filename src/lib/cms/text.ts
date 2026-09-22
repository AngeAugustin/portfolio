/** Remove em dashes from CMS / copy strings for consistent typography. */
export function sanitizeText(value: string): string {
  return value
    .replace(/(\d{4}) \u2014 /g, "$1 - ")
    .replace(/ \u2014 /g, ", ")
    .replace(/\u2014/g, "");
}

export function sanitizeOptionalText(
  value: string | null | undefined
): string | undefined {
  if (value == null) return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  return sanitizeText(trimmed);
}
