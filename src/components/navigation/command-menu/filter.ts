import type { CommandItem } from "./types";

export function filterItems(items: CommandItem[], search: string): CommandItem[] {
  const q = search.trim().toLowerCase();
  if (!q) return items;

  // `/tog` → ищет только команды по trigger и label
  if (q.startsWith("/")) {
    const term = q.slice(1);
    return items.filter(
      (i) =>
        i.type === "command" &&
        (i.trigger?.toLowerCase().slice(1).includes(term) || i.label.toLowerCase().includes(term))
    );
  }

  // `@dash` → ищет только ссылки по alias и label
  if (q.startsWith("@")) {
    const term = q.slice(1);
    return items.filter(
      (i) =>
        i.type === "link" &&
        (i.alias?.toLowerCase().slice(1).includes(term) || i.label.toLowerCase().includes(term))
    );
  }

  // Общий поиск по всем полям
  return items.filter(
    (i) =>
      i.label.toLowerCase().includes(q) ||
      i.description?.toLowerCase().includes(q) ||
      i.trigger?.toLowerCase().includes(q) ||
      i.alias?.toLowerCase().includes(q)
  );
}
