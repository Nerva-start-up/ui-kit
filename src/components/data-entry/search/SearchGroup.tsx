import { cn } from "../../../lib/cn";
import { SearchResultItem } from "./SearchResultItem";
import { useSearchContext } from "./context";
import type { SearchItem } from "./types";

export type SearchGroupProps = {
  /** Заголовок секции (+ счётчик авто) */
  heading: string;
  /** Фильтр: ключ группы или кастомная функция */
  filter: string | ((item: SearchItem) => boolean);
  className?: string;
};

/** Секция с заголовком и счётчиком. */
export function SearchGroup({ heading, filter, className }: SearchGroupProps) {
  const { filtered } = useSearchContext();

  const fn = typeof filter === "function" ? filter : (i: SearchItem) => i.group === filter;
  const items = filtered.filter(fn);

  if (items.length === 0) return null;

  return (
    <div className={cn("mb-1", className)}>
      <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)] select-none">
        {heading}
        <span className="ml-1.5 font-normal opacity-60">{items.length}</span>
      </div>
      {items.map((item) => (
        <SearchResultItem key={item.id} item={item} />
      ))}
    </div>
  );
}
