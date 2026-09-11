import type { TreeNode } from "./types";

export function findNode(nodes: TreeNode[], key: string): TreeNode | null {
  for (const node of nodes) {
    if (node.key === key) return node;
    if (node.children) {
      const found = findNode(node.children, key);
      if (found) return found;
    }
  }
  return null;
}

/** Ключи всех потомков узла (не включая сам узел). */
export function getDescendantKeys(node: TreeNode): string[] {
  const keys: string[] = [];
  function walk(n: TreeNode) {
    for (const child of n.children ?? []) {
      keys.push(child.key);
      walk(child);
    }
  }
  walk(node);
  return keys;
}

/** Цепочка узлов-предков для `targetKey`, от корня к ближайшему родителю. */
export function getAncestorPath(nodes: TreeNode[], targetKey: string): TreeNode[] {
  const path: TreeNode[] = [];

  function walk(list: TreeNode[], trail: TreeNode[]): boolean {
    for (const node of list) {
      if (node.key === targetKey) {
        path.push(...trail);
        return true;
      }
      if (node.children && walk(node.children, [...trail, node])) return true;
    }
    return false;
  }

  walk(nodes, []);
  return path;
}

export type CheckState = "checked" | "unchecked" | "indeterminate";

/** Состояние чекбокса узла: `checkedKeys` хранит только полностью отмеченные ключи (см. `useTree`). */
export function getCheckState(node: TreeNode, checkedKeys: string[]): CheckState {
  if (checkedKeys.includes(node.key)) return "checked";
  if (!node.children?.length) return "unchecked";
  const anyDescendantChecked = getDescendantKeys(node).some((k) => checkedKeys.includes(k));
  return anyDescendantChecked ? "indeterminate" : "unchecked";
}
