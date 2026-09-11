import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "../../../lib/cn";
import { Tree } from "../../data-display/tree/Tree";
import type { TreeNode } from "../../data-display/tree/types";
import { findNode } from "../../data-display/tree/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../../overlay/popover/Popover";

export type TreeSelectProps = {
  /** Иерархические данные */
  data: TreeNode[];
  /** Множественный выбор через чекбоксы (иначе — одиночный клик по узлу, закрывает попап) */
  multiple?: boolean;
  /** Controlled выбранные ключи */
  value?: string[];
  /** Uncontrolled начальные ключи */
  defaultValue?: string[];
  /** Callback изменения */
  onChange?: (keys: string[]) => void;
  /** Текст при пустом выборе */
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

/** Выбор значения(й) из иерархического списка — `Tree` в попапе с триггером в стиле select. */
export function TreeSelect({
  data,
  multiple = false,
  value,
  defaultValue = [],
  onChange,
  placeholder = "Выберите значение",
  disabled = false,
  className,
}: TreeSelectProps) {
  const [internal, setInternal] = useState<string[]>(defaultValue);
  const [open, setOpen] = useState(false);
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;

  function commit(next: string[]) {
    if (!isControlled) setInternal(next);
    onChange?.(next);
  }

  function handleSelect(keys: string[]) {
    commit(keys);
    setOpen(false);
  }

  const label = current
    .map((key) => findNode(data, key)?.label)
    .filter((l): l is string => !!l)
    .join(", ");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            "flex h-10 w-full items-center gap-2 rounded-[var(--radius-sm)] border px-3",
            "border-[var(--border)] bg-[var(--surface-2)] text-sm",
            "transition-colors hover:border-[var(--text-muted)]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
        >
          <span className={cn("flex-1 truncate text-left", !label && "text-[var(--text-muted)]")}>
            {label || placeholder}
          </span>
          <ChevronDown size={15} className="shrink-0 text-[var(--text-muted)]" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="max-h-72 w-64 overflow-y-auto p-2">
        {multiple ? (
          <Tree data={data} checkable selectable={false} checkedKeys={current} onCheck={commit} />
        ) : (
          <Tree data={data} selectable selectedKeys={current} onSelect={handleSelect} />
        )}
      </PopoverContent>
    </Popover>
  );
}
