import type { TransferItem } from "./types";

/** Фильтрует элементы по вхождению запроса в title/description (регистронезависимо). */
export function filterItems(items: TransferItem[], query: string): TransferItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return items;
  return items.filter(
    (item) => item.title.toLowerCase().includes(q) || item.description?.toLowerCase().includes(q)
  );
}
