import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "../../../lib/cn";
import type { TreeNode } from "../../data-display/tree/types";
import { findNode } from "../../data-display/tree/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../../overlay/popover/Popover";
import { CascaderColumn } from "./CascaderColumn";
import { useCascader } from "./useCascader";

export type CascaderProps = {
  /** Иерархические данные (тот же формат, что у `Tree`) */
  data: TreeNode[];
  /** Controlled путь ключей от корня до выбранного листа */
  value?: string[];
  /** Uncontrolled начальный путь */
  defaultValue?: string[];
  /** Callback при выборе листа — путь ключей и сам узел */
  onChange?: (path: string[], leaf: TreeNode) => void;
  /** Разделитель в подписи триггера */
  separator?: string;
  /** Текст при пустом выборе */
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

/** Каскадный выбор из вложенной иерархии по колонкам — факультет → группа → студент и т.п. */
export function Cascader({
  data,
  value,
  defaultValue,
  onChange,
  separator = " / ",
  placeholder = "Выберите значение",
  disabled = false,
  className,
}: CascaderProps) {
  const [open, setOpen] = useState(false);
  const { columns, activePath, committedPath, selectAt, reset } = useCascader({
    data,
    value,
    defaultValue,
    onChange: (path, leaf) => {
      onChange?.(path, leaf);
      setOpen(false);
    },
  });

  useEffect(() => {
    if (open) reset(committedPath);
  }, [open, reset, committedPath]);

  const label = committedPath
    .map((key) => findNode(data, key)?.label)
    .filter((l): l is string => !!l)
    .join(separator);

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
      <PopoverContent className="flex max-h-72 w-fit p-0">
        {columns.map((items, depth) => (
          <CascaderColumn
            key={depth}
            items={items}
            activeKey={activePath[depth]}
            onSelect={(node) => selectAt(depth, node)}
          />
        ))}
      </PopoverContent>
    </Popover>
  );
}
