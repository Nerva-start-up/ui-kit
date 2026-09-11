import { useEffect, useRef } from "react";
import { cn } from "../../../lib/cn";
import { Flex } from "../../layout/Flex";
import { HStack } from "../../layout/HStack";
import { Stack } from "../../layout/Stack";
import { useSearchContext } from "./context";
import type { SearchItem } from "./types";

export type SearchResultItemProps = {
  item: SearchItem;
  className?: string;
};

/** Элемент: avatar/icon + label + description + tags + meta. */
export function SearchResultItem({ item, className }: SearchResultItemProps) {
  const { filtered, activeIndex, setActiveIndex, onSelect } = useSearchContext();
  const index = filtered.indexOf(item);
  const active = index === activeIndex;
  const Icon = item.icon;
  const ref = useRef<HTMLDivElement>(null);

  // При навигации стрелками активный item должен оставаться в видимой области списка
  useEffect(() => {
    if (active) ref.current?.scrollIntoView({ block: "nearest" });
  }, [active]);

  return (
    <HStack
      ref={ref}
      gap={3}
      // biome-ignore lint/a11y/useSemanticElements: option element in listbox ARIA pattern
      role="option"
      aria-selected={active}
      tabIndex={-1}
      onClick={() => onSelect(item)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onSelect(item);
      }}
      onMouseEnter={() => setActiveIndex(index)}
      className={cn(
        "px-3 py-2.5 rounded-[var(--radius-md)] cursor-pointer transition-colors",
        active
          ? "bg-[var(--primary)]/10 text-[var(--text)]"
          : "text-[var(--text-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--text)]",
        className
      )}
    >
      {/* Аватар или иконка */}
      {item.avatar ? (
        <img
          src={item.avatar}
          alt={item.label}
          className="h-8 w-8 shrink-0 rounded-full object-cover border border-[var(--border)]"
        />
      ) : Icon ? (
        <span
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-sm)]",
            active
              ? "bg-[var(--primary)]/15 text-[var(--primary)]"
              : "bg-[var(--surface-2)] text-[var(--text-muted)]"
          )}
        >
          <Icon size={16} />
        </span>
      ) : null}

      {/* Label + description */}
      <Stack gap={0} className="flex-1 min-w-0">
        <span className="truncate text-sm font-medium text-[var(--text)]">{item.label}</span>
        {item.description && (
          <span className="truncate text-xs text-[var(--text-muted)]">{item.description}</span>
        )}
        {item.tags && item.tags.length > 0 && (
          <Flex gap={1} wrap="wrap" className="mt-0.5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-1.5 py-px rounded-[var(--radius-sm)] bg-[var(--surface-2)] text-[var(--text-muted)]"
              >
                {tag}
              </span>
            ))}
          </Flex>
        )}
      </Stack>

      {/* Meta — правый угол */}
      {item.meta && (
        <span
          className={cn(
            "shrink-0 text-xs tabular-nums",
            active ? "text-[var(--primary)]/70" : "text-[var(--text-muted)]"
          )}
        >
          {item.meta}
        </span>
      )}
    </HStack>
  );
}
