import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { cn } from "../../../lib/cn";
import { HStack } from "../../layout/HStack";
import { Stack } from "../../layout/Stack";
import { ScrollArea } from "../../layout/scroll-area/ScrollArea";
import { Checkbox } from "../checkbox/Checkbox";
import { Input } from "../input/Input";
import type { TransferItem } from "./types";
import { filterItems } from "./utils";

export type TransferPanelProps = {
  title: string;
  /** Полный (неотфильтрованный) список элементов этой стороны */
  items: TransferItem[];
  /** Ключи отмеченных чекбоксом элементов этой стороны */
  checked: string[];
  onToggle: (key: string) => void;
  onToggleAll: (visibleKeys: string[]) => void;
  searchable: boolean;
  disabled?: boolean;
  height: number | string;
  className?: string;
};

/** Одна панель `Transfer` — заголовок с "выбрать всё", поиск, скроллируемый список. */
export function TransferPanel({
  title,
  items,
  checked,
  onToggle,
  onToggleAll,
  searchable,
  disabled,
  height,
  className,
}: TransferPanelProps) {
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => filterItems(items, search), [items, search]);
  const selectableKeys = useMemo(
    () => filtered.filter((i) => !i.disabled).map((i) => i.key),
    [filtered]
  );
  const allChecked = selectableKeys.length > 0 && selectableKeys.every((k) => checked.includes(k));
  const someChecked = selectableKeys.some((k) => checked.includes(k));

  return (
    <Stack
      gap={0}
      style={{ height }}
      className={cn(
        "overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)]",
        className
      )}
    >
      <HStack gap={2} className="border-b border-[var(--border)] px-3 py-2.5">
        <Checkbox
          checked={allChecked}
          indeterminate={!allChecked && someChecked}
          onChange={() => onToggleAll(selectableKeys)}
          disabled={disabled || selectableKeys.length === 0}
          aria-label={`Выбрать все — ${title}`}
        />
        <span className="text-[13px] font-medium text-[var(--text)]">{title}</span>
        <span className="ml-auto text-[12px] text-[var(--text-muted)]">
          {checked.length}/{items.length}
        </span>
      </HStack>

      {searchable && (
        <div className="border-b border-[var(--border)] p-2">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск..."
            leftIcon={<Search size={14} />}
            disabled={disabled}
            className="h-8 text-[13px]"
          />
        </div>
      )}

      <ScrollArea className="min-h-0 flex-1">
        <Stack gap={0.5} className="p-1">
          {filtered.length === 0 ? (
            <p className="p-4 text-center text-[13px] text-[var(--text-muted)]">Пусто</p>
          ) : (
            filtered.map((item) => (
              <div
                key={item.key}
                className="rounded-[var(--radius-sm)] px-2 py-1 hover:bg-[var(--surface-2)]"
              >
                <Checkbox
                  checked={checked.includes(item.key)}
                  onChange={() => onToggle(item.key)}
                  disabled={disabled || item.disabled}
                  label={item.title}
                  description={item.description}
                />
              </div>
            ))
          )}
        </Stack>
      </ScrollArea>
    </Stack>
  );
}
