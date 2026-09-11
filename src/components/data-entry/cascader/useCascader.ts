import { useCallback, useState } from "react";
import type { TreeNode } from "../../data-display/tree/types";

export type UseCascaderOptions = {
  data: TreeNode[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (path: string[], leaf: TreeNode) => void;
};

/** Путь навигации по колонкам (`activePath`); финальный путь коммитится только при выборе листа. */
export function useCascader({ data, value, defaultValue = [], onChange }: UseCascaderOptions) {
  const [internal, setInternal] = useState<string[]>(defaultValue);
  const isControlled = value !== undefined;
  const committedPath = isControlled ? value : internal;

  const [activePath, setActivePath] = useState<string[]>(committedPath);

  const columns: TreeNode[][] = [data];
  let currentLevel = data;
  for (const key of activePath) {
    const node = currentLevel.find((n) => n.key === key);
    if (!node?.children?.length) break;
    columns.push(node.children);
    currentLevel = node.children;
  }

  const selectAt = useCallback(
    (depth: number, node: TreeNode) => {
      if (node.disabled) return;
      const nextPath = [...activePath.slice(0, depth), node.key];
      setActivePath(nextPath);

      if (!node.children?.length) {
        if (!isControlled) setInternal(nextPath);
        onChange?.(nextPath, node);
      }
    },
    [activePath, isControlled, onChange]
  );

  const reset = useCallback((path: string[]) => {
    setActivePath(path);
  }, []);

  return { columns, activePath, committedPath, selectAt, reset };
}
