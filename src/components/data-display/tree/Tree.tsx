import { cn } from "../../../lib/cn";
import { TreeItem } from "./TreeItem";
import type { TreeNode } from "./types";
import { useTree } from "./useTree";

export type TreeProps = {
  /** Иерархические данные */
  data: TreeNode[];
  /** Показывать чекбоксы — каскадное множественное выделение (потомки/предки синхронизируются) */
  checkable?: boolean;
  /** Клик по подписи подсвечивает узел (одиночное выделение) */
  selectable?: boolean;
  /** Controlled выделенные ключи (одиночное выделение) */
  selectedKeys?: string[];
  /** Uncontrolled начальные выделенные ключи */
  defaultSelectedKeys?: string[];
  /** Callback выделения */
  onSelect?: (keys: string[], node: TreeNode) => void;
  /** Controlled отмеченные ключи (при `checkable`) */
  checkedKeys?: string[];
  /** Uncontrolled начальные отмеченные ключи */
  defaultCheckedKeys?: string[];
  /** Callback изменения отмеченных ключей */
  onCheck?: (keys: string[]) => void;
  /** Controlled развёрнутые ключи */
  expandedKeys?: string[];
  /** Uncontrolled начальные развёрнутые ключи */
  defaultExpandedKeys?: string[];
  /** Callback раскрытия/сворачивания */
  onExpand?: (keys: string[]) => void;
  className?: string;
};

/** Иерархический список с раскрытием узлов и опциональным каскадным множественным выделением (чекбоксы). */
export function Tree({
  data,
  checkable = false,
  selectable = true,
  selectedKeys,
  defaultSelectedKeys,
  onSelect,
  checkedKeys,
  defaultCheckedKeys,
  onCheck,
  expandedKeys,
  defaultExpandedKeys,
  onExpand,
  className,
}: TreeProps) {
  const tree = useTree({
    data,
    selectedKeys,
    defaultSelectedKeys,
    onSelect,
    checkedKeys,
    defaultCheckedKeys,
    onCheck,
    expandedKeys,
    defaultExpandedKeys,
    onExpand,
  });

  return (
    <div className={cn("flex flex-col", className)}>
      {data.map((node) => (
        <TreeItem
          key={node.key}
          node={node}
          level={0}
          checkable={checkable}
          selectable={selectable}
          expandedKeys={tree.expandedKeys}
          selectedKeys={tree.selectedKeys}
          checkedKeys={tree.checkedKeys}
          onToggleExpand={tree.toggleExpand}
          onSelect={tree.selectNode}
          onToggleCheck={tree.toggleCheck}
        />
      ))}
    </div>
  );
}
