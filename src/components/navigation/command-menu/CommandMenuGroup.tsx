import { cn } from "../../../lib/cn";
import { CommandMenuItem } from "./CommandMenuItem";
import { useCommandMenuContext } from "./context";
import type { CommandItem, CommandItemType } from "./types";

export type CommandMenuGroupProps = {
  /** заголовок секции */
  heading: string;
  /** Фильтровать по типу ('command' | 'link') или кастомной функцией */
  filter: CommandItemType | ((item: CommandItem) => boolean);
  className?: string;
};

/** Секция с заголовком, авто-скрывается если нет результатов. */
export function CommandMenuGroup({ heading, filter, className }: CommandMenuGroupProps) {
  const { filtered } = useCommandMenuContext();

  const fn = typeof filter === "function" ? filter : (i: CommandItem) => i.type === filter;
  const items = filtered.filter(fn);

  if (items.length === 0) return null;

  return (
    <div className={cn("mb-1", className)}>
      <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)] select-none">
        {heading}
      </div>
      {items.map((item) => (
        <CommandMenuItem key={item.id} item={item} />
      ))}
    </div>
  );
}
