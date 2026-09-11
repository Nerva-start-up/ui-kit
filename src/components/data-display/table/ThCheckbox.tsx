import type React from "react";
import { cn } from "../../../lib/cn";
import { Checkbox } from "../../data-entry/checkbox/Checkbox";

export type ThCheckboxProps = {
  /** Состояние чекбокса */
  checked?: boolean;
  /** Часть строк выбрана — рисует "-" вместо галочки */
  indeterminate?: boolean;
  /** Колбэк изменения */
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  /** Доступное имя (визуального label у чекбокса нет) */
  "aria-label"?: string;
} & Omit<React.ThHTMLAttributes<HTMLTableCellElement>, "onChange">;

/** Чекбокс «выбрать всё» в шапке таблицы (row selection) */
export function ThCheckbox({
  checked,
  indeterminate,
  onChange,
  disabled,
  className,
  "aria-label": ariaLabel = "Выбрать все строки",
  ...props
}: ThCheckboxProps) {
  return (
    <th className={cn("w-10 px-4 py-3", className)} {...props}>
      <Checkbox
        checked={checked}
        indeterminate={indeterminate}
        onChange={onChange}
        disabled={disabled}
        aria-label={ariaLabel}
      />
    </th>
  );
}
