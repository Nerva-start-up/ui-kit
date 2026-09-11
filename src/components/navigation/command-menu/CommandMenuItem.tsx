import { useEffect, useRef } from "react";
import { cn } from "../../../lib/cn";
import { useCommandMenuContext } from "./context";
import type { CommandItem } from "./types";

export type CommandMenuItemProps = {
  item: CommandItem;
  className?: string;
};

/** Элемент — <button> для команды, <a> для ссылки. */
export function CommandMenuItem({ item, className }: CommandMenuItemProps) {
  const { filtered, activeIndex, setActiveIndex, execute } = useCommandMenuContext();
  const index = filtered.indexOf(item);
  const active = index === activeIndex;
  const Icon = item.icon;
  const badge = item.type === "command" ? item.trigger : item.alias;

  const Tag = item.href ? "a" : "button";
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);
  const setRef = (node: HTMLAnchorElement | HTMLButtonElement | null) => {
    ref.current = node;
  };

  // При навигации стрелками активный item должен оставаться в видимой области списка
  useEffect(() => {
    if (active) ref.current?.scrollIntoView({ block: "nearest" });
  }, [active]);

  return (
    // biome-ignore lint/a11y/useSemanticElements: polymorphic element renders as button or anchor depending on item.href
    <Tag
      role="option"
      aria-selected={active}
      href={item.href}
      onClick={() => execute(item)}
      onMouseEnter={() => setActiveIndex(index)}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)] text-sm text-left cursor-pointer transition-colors",
        active
          ? "bg-[var(--primary)]/10 text-[var(--text)]"
          : "text-[var(--text-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--text)]",
        className
      )}
      ref={setRef}
    >
      {/* Иконка: слот резервируется всегда, чтобы label во всех item начинался на одном уровне */}
      <span
        className={cn(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-[var(--radius-sm)]",
          Icon &&
            (active
              ? "bg-[var(--primary)]/15 text-[var(--primary)]"
              : "bg-[var(--surface-2)] text-[var(--text-muted)]")
        )}
      >
        {Icon && <Icon size={15} />}
      </span>

      {/* Label + description */}
      <span className="flex-1 min-w-0 flex flex-col">
        <span className="truncate font-medium text-[var(--text)]">{item.label}</span>
        {/* Плейсхолдер резервирует высоту строки, чтобы label во всех item начинался на одном уровне */}
        <span
          className={cn(
            "truncate text-xs text-[var(--text-muted)]",
            !item.description && "invisible"
          )}
        >
          {item.description || " "}
        </span>
      </span>

      {/* Badge: trigger или alias */}
      {badge && (
        <span
          className={cn(
            "shrink-0 font-mono text-xs px-1.5 py-0.5 rounded-[var(--radius-sm)]",
            active
              ? "bg-[var(--primary)]/15 text-[var(--primary)]"
              : "bg-[var(--surface-2)] text-[var(--text-muted)]"
          )}
        >
          {badge}
        </span>
      )}
    </Tag>
  );
}
