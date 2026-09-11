import { useState } from "react";
import type { TreeNode } from "./types";
import { getAncestorPath, getDescendantKeys } from "./utils";

export type UseTreeOptions = {
  data: TreeNode[];
  selectedKeys?: string[];
  defaultSelectedKeys?: string[];
  onSelect?: (keys: string[], node: TreeNode) => void;
  checkedKeys?: string[];
  defaultCheckedKeys?: string[];
  onCheck?: (keys: string[]) => void;
  expandedKeys?: string[];
  defaultExpandedKeys?: string[];
  onExpand?: (keys: string[]) => void;
};

/** Controlled/uncontrolled expanded/selected/checked ключи + каскадная логика чекбоксов. */
export function useTree({
  data,
  selectedKeys,
  defaultSelectedKeys = [],
  onSelect,
  checkedKeys,
  defaultCheckedKeys = [],
  onCheck,
  expandedKeys,
  defaultExpandedKeys = [],
  onExpand,
}: UseTreeOptions) {
  const [internalSelected, setInternalSelected] = useState<string[]>(defaultSelectedKeys);
  const [internalChecked, setInternalChecked] = useState<string[]>(defaultCheckedKeys);
  const [internalExpanded, setInternalExpanded] = useState<string[]>(defaultExpandedKeys);

  const isSelectedControlled = selectedKeys !== undefined;
  const isCheckedControlled = checkedKeys !== undefined;
  const isExpandedControlled = expandedKeys !== undefined;

  const currentSelected = isSelectedControlled ? selectedKeys : internalSelected;
  const currentChecked = isCheckedControlled ? checkedKeys : internalChecked;
  const currentExpanded = isExpandedControlled ? expandedKeys : internalExpanded;

  function toggleExpand(key: string) {
    const next = currentExpanded.includes(key)
      ? currentExpanded.filter((k) => k !== key)
      : [...currentExpanded, key];
    if (!isExpandedControlled) setInternalExpanded(next);
    onExpand?.(next);
  }

  function selectNode(node: TreeNode) {
    if (node.disabled) return;
    const next = [node.key];
    if (!isSelectedControlled) setInternalSelected(next);
    onSelect?.(next, node);
  }

  function toggleCheck(node: TreeNode) {
    if (node.disabled) return;
    const isChecked = currentChecked.includes(node.key);
    const descendantKeys = getDescendantKeys(node);
    let next: string[];

    if (isChecked) {
      const toRemove = new Set([node.key, ...descendantKeys]);
      next = currentChecked.filter((k) => !toRemove.has(k));
      const ancestorKeys = new Set(getAncestorPath(data, node.key).map((a) => a.key));
      next = next.filter((k) => !ancestorKeys.has(k));
    } else {
      next = Array.from(new Set([...currentChecked, node.key, ...descendantKeys]));
      const ancestors = [...getAncestorPath(data, node.key)].reverse();
      for (const ancestor of ancestors) {
        const requiredKeys = getDescendantKeys(ancestor);
        const allChecked = requiredKeys.every((k) => next.includes(k));
        if (!allChecked) break;
        next = Array.from(new Set([...next, ancestor.key]));
      }
    }

    if (!isCheckedControlled) setInternalChecked(next);
    onCheck?.(next);
  }

  return {
    selectedKeys: currentSelected,
    checkedKeys: currentChecked,
    expandedKeys: currentExpanded,
    toggleExpand,
    selectNode,
    toggleCheck,
  };
}
