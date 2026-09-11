import { useState } from "react";
import type { TransferDirection, TransferItem } from "./types";

export type UseTransferOptions = {
  dataSource: TransferItem[];
  targetKeys?: string[];
  defaultTargetKeys?: string[];
  onChange?: (targetKeys: string[], direction: TransferDirection, movedKeys: string[]) => void;
};

/** Controlled/uncontrolled ключи правой панели + локальный выбор (checked) с обеих сторон. */
export function useTransfer({
  dataSource,
  targetKeys,
  defaultTargetKeys = [],
  onChange,
}: UseTransferOptions) {
  const [internalTarget, setInternalTarget] = useState<string[]>(defaultTargetKeys);
  const isControlled = targetKeys !== undefined;
  const currentTarget = isControlled ? targetKeys : internalTarget;

  const [leftChecked, setLeftChecked] = useState<string[]>([]);
  const [rightChecked, setRightChecked] = useState<string[]>([]);

  const sourceItems = dataSource.filter((item) => !currentTarget.includes(item.key));
  const targetItems = dataSource.filter((item) => currentTarget.includes(item.key));

  function toggleChecked(key: string, side: "left" | "right") {
    const setChecked = side === "left" ? setLeftChecked : setRightChecked;
    setChecked((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  }

  /** Переключает выбор только среди `visibleKeys` (текущий отфильтрованный поиском срез панели). */
  function toggleAllChecked(side: "left" | "right", visibleKeys: string[]) {
    const setChecked = side === "left" ? setLeftChecked : setRightChecked;
    setChecked((prev) => {
      const allVisibleChecked =
        visibleKeys.length > 0 && visibleKeys.every((k) => prev.includes(k));
      return allVisibleChecked
        ? prev.filter((k) => !visibleKeys.includes(k))
        : Array.from(new Set([...prev, ...visibleKeys]));
    });
  }

  function moveToRight() {
    if (leftChecked.length === 0) return;
    const next = [...currentTarget, ...leftChecked];
    if (!isControlled) setInternalTarget(next);
    onChange?.(next, "right", leftChecked);
    setLeftChecked([]);
  }

  function moveToLeft() {
    if (rightChecked.length === 0) return;
    const next = currentTarget.filter((k) => !rightChecked.includes(k));
    if (!isControlled) setInternalTarget(next);
    onChange?.(next, "left", rightChecked);
    setRightChecked([]);
  }

  return {
    sourceItems,
    targetItems,
    leftChecked,
    rightChecked,
    toggleChecked,
    toggleAllChecked,
    moveToRight,
    moveToLeft,
  };
}
