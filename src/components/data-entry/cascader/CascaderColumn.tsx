import { ChevronRight } from "lucide-react";
import { cn } from "../../../lib/cn";
import type { TreeNode } from "../../data-display/tree/types";
import { Stack } from "../../layout/Stack";

export type CascaderColumnProps = {
  items: TreeNode[];
  activeKey?: string;
  onSelect: (node: TreeNode) => void;
};

/** Одна колонка `Cascader` — список пунктов одного уровня иерархии. */
export function CascaderColumn({ items, activeKey, onSelect }: CascaderColumnProps) {
  return (
    <Stack
      gap={0}
      className="w-44 overflow-y-auto border-r border-[var(--border)] py-1 last:border-r-0"
    >
      {items.map((item) => {
        const isActive = item.key === activeKey;
        const hasChildren = !!item.children?.length;
        return (
          <button
            key={item.key}
            type="button"
            disabled={item.disabled}
            onClick={() => onSelect(item)}
            className={cn(
              "flex items-center justify-between gap-2 px-3 py-1.5 text-left text-sm transition-colors",
              isActive
                ? "bg-[var(--primary-dim)] text-[var(--primary)]"
                : "text-[var(--text)] hover:bg-[var(--surface-2)]",
              item.disabled && "cursor-not-allowed opacity-40"
            )}
          >
            <span className="truncate">{item.label}</span>
            {hasChildren && <ChevronRight size={14} className="shrink-0" />}
          </button>
        );
      })}
    </Stack>
  );
}
