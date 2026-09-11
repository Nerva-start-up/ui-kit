import { useState } from "react";

export type UseRateOptions = {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  count: number;
  allowClear?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
};

export type UseRateResult = {
  /** Текущее отображаемое значение — hover-превью, если есть, иначе выбранное значение */
  displayValue: number;
  setHover: (value: number | null) => void;
  select: (value: number) => void;
};

/** Controlled/uncontrolled состояние рейтинга + hover-превью + clamp/clear-логика. */
export function useRate({
  value,
  defaultValue = 0,
  onChange,
  count,
  allowClear = true,
  disabled = false,
  readOnly = false,
}: UseRateOptions): UseRateResult {
  const [internal, setInternal] = useState(defaultValue);
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;

  function select(next: number) {
    if (disabled || readOnly) return;
    const clamped = Math.max(0, Math.min(count, next));
    const resolved = allowClear && clamped === current ? 0 : clamped;
    if (!isControlled) setInternal(resolved);
    onChange?.(resolved);
  }

  function setHover(next: number | null) {
    if (disabled || readOnly) return;
    setHoverValue(next);
  }

  return {
    displayValue: hoverValue ?? current,
    setHover,
    select,
  };
}
