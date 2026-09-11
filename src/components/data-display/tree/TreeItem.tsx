import { ChevronRight } from "lucide-react";
import { cn } from "../../../lib/cn";
import { Checkbox } from "../../data-entry/checkbox/Checkbox";
import type { TreeNode } from "./types";
import { getCheckState } from "./utils";

export type TreeItemProps = {
  node: TreeNode;
  level: number;
  checkable: boolean;
  selectable: boolean;
  expandedKeys: string[];
  selectedKeys: string[];
  checkedKeys: string[];
  onToggleExpand: (key: string) => void;
  onSelect: (node: TreeNode) => void;
  onToggleCheck: (node: TreeNode) => void;
};

/** Один узел `Tree` — рекурсивно рендерит своих детей, если раскрыт. */
export function TreeItem({
  node,
  level,
  checkable,
  selectable,
  expandedKeys,
  selectedKeys,
  checkedKeys,
  onToggleExpand,
  onSelect,
  onToggleCheck,
}: TreeItemProps) {
  const hasChildren = !!node.children?.length;
  const isExpanded = expandedKeys.includes(node.key);
  const isSelected = selectedKeys.includes(node.key);
  const checkState = checkable ? getCheckState(node, checkedKeys) : "unchecked";
  const Icon = node.icon;

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-1.5 rounded-[var(--radius-sm)] py-1 pr-2",
          isSelected && "bg-[var(--primary-dim)]"
        )}
        style={{ paddingLeft: level * 20 + 4 }}
      >
        <button
          type="button"
          onClick={() => hasChildren && onToggleExpand(node.key)}
          disabled={!hasChildren}
          className={cn(
            "flex h-5 w-5 shrink-0 items-center justify-center text-[var(--text-muted)]",
            !hasChildren && "invisible"
          )}
          aria-label={isExpanded ? "Свернуть" : "Развернуть"}
        >
          <ChevronRight
            size={14}
            className={cn("transition-transform", isExpanded && "rotate-90")}
          />
        </button>

        {checkable && (
          <Checkbox
            checked={checkState === "checked"}
            indeterminate={checkState === "indeterminate"}
            disabled={node.disabled}
            onChange={() => onToggleCheck(node)}
          />
        )}

        <button
          type="button"
          disabled={node.disabled}
          onClick={() => selectable && onSelect(node)}
          className={cn(
            "flex min-w-0 flex-1 items-center gap-1.5 py-0.5 text-left",
            !node.disabled && selectable && "cursor-pointer",
            node.disabled && "cursor-not-allowed opacity-40",
            !selectable && "cursor-default"
          )}
        >
          {Icon && <Icon size={14} className="shrink-0 text-[var(--text-muted)]" />}
          <span className="truncate text-sm text-[var(--text)]">{node.label}</span>
        </button>
      </div>

      {hasChildren && isExpanded && (
        <div>
          {node.children?.map((child) => (
            <TreeItem
              key={child.key}
              node={child}
              level={level + 1}
              checkable={checkable}
              selectable={selectable}
              expandedKeys={expandedKeys}
              selectedKeys={selectedKeys}
              checkedKeys={checkedKeys}
              onToggleExpand={onToggleExpand}
              onSelect={onSelect}
              onToggleCheck={onToggleCheck}
            />
          ))}
        </div>
      )}
    </div>
  );
}
