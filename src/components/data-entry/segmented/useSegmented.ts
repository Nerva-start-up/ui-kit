import { useState } from "react";

export type UseSegmentedOptions = {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
};

/** Controlled/uncontrolled текущее значение + обработчик выбора. */
export function useSegmented({ value, defaultValue, onChange }: UseSegmentedOptions) {
  const [internal, setInternal] = useState(defaultValue ?? "");
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;

  function select(next: string) {
    if (!isControlled) setInternal(next);
    onChange?.(next);
  }

  return { current, select };
}
