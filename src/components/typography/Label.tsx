import type React from "react";
import { cn } from "../../lib/cn";

export type LabelProps = {
  /** добавляет красную звёздочку (обязательное поле) */
  required?: boolean;
} & React.LabelHTMLAttributes<HTMLLabelElement>;

/** Подпись `<label>` для полей форм: `text-sm` + `font-medium` на токенах шрифта. */
export function Label({ required = false, htmlFor, className, children, ...props }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "text-[length:var(--font-size-sm)] font-[number:var(--font-weight-medium)] text-[var(--text)]",
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="ml-0.5 text-[var(--error)]">*</span>}
    </label>
  );
}
