import type { ComboboxOption } from "./types";

export function filterOptions(options: ComboboxOption[], search: string): ComboboxOption[] {
  const q = search.trim().toLowerCase();
  if (!q) return options;
  return options.filter((o) => o.label.toLowerCase().includes(q));
}
