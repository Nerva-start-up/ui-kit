import type React from "react";
import { cn } from "../../../lib/cn";
import { Checkbox } from "../../data-entry/checkbox/Checkbox";

export type TdCheckboxProps = {
  /** Состояние чекбокса */
  checked?: boolean;
  /** Колбэк изменения */
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  /** Доступное имя (визуального label у чекбокса нет) */
  "aria-label"?: string;
} & Omit<React.TdHTMLAttributes<HTMLTableCellElement>, "onChange">;

/** Чекбокс выбора строки в теле таблицы (row selection) */
export function TdCheckbox({
  checked,
  onChange,
  disabled,
  className,
  "aria-label": ariaLabel = "Выбрать строку",
  ...props
}: TdCheckboxProps) {
  return (
    <td className={cn("w-10 px-4 py-3", className)} {...props}>
      <Checkbox checked={checked} onChange={onChange} disabled={disabled} aria-label={ariaLabel} />
    </td>
  );
}
