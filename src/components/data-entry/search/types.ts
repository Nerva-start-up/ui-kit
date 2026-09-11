import type React from "react";

export type SearchItem = {
  id: string;
  label: string;
  description?: string;
  /** Правая мета-строка: группа, дата, счётчик и т.п. */
  meta?: string;
  icon?: React.ElementType;
  /** URL аватара — приоритет над icon */
  avatar?: string;
  /** Ключ группы — используется в SearchGroup */
  group?: string;
  tags?: string[];
  href?: string;
  onSelect?: () => void;
};

export type SearchFilterFn = (item: SearchItem, query: string) => boolean;

export function defaultFilter(item: SearchItem, query: string): boolean {
  const q = query.toLowerCase();
  return (
    item.label.toLowerCase().includes(q) ||
    (item.description?.toLowerCase().includes(q) ?? false) ||
    (item.meta?.toLowerCase().includes(q) ?? false) ||
    (item.tags?.some((t) => t.toLowerCase().includes(q)) ?? false)
  );
}
