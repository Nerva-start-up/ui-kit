import React from "react";
import { cn } from "../../../lib/cn";
import { Stack } from "../../layout/Stack";

export type SwitchProps = {
  /** Controlled состояние */
  checked?: boolean;
  /** Uncontrolled начальное состояние */
  defaultChecked?: boolean;
  /** Callback изменения */
  onChange?: (checked: boolean) => void;
  /** Текст метки */
  label?: string;
  /** Второстепенное описание */
  description?: string;
  /** Подсказка (скрывается при error) */
  hint?: string;
  /** Текст ошибки (трек краснеет) */
  error?: string;
  disabled?: boolean;
  /** Размер: md = 44×24px, sm = 32×18px */
  size?: "sm" | "md";
  /** id для <input> (по умолчанию — из label) */
  id?: string;
  /** Для интеграции с FormControl */
  "aria-invalid"?: boolean | "true" | "false";
  "aria-describedby"?: string;
  className?: string;
};

/** iOS-стиль переключатель на нативном input type="checkbox" role="switch", совместим с FormControl */
export function Switch({
  checked,
  defaultChecked = false,
  onChange,
  label,
  description,
  hint,
  error,
  disabled = false,
  size = "md",
  id,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
  className,
}: SwitchProps) {
  const [internal, setInternal] = React.useState(defaultChecked);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internal;

  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  const hasError = Boolean(error) || ariaInvalid === true || ariaInvalid === "true";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.checked;
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  // md: 44×24px, thumb 18×18px, pad 3px → checked translate = 44-18-3 = 23px
  // sm: 32×18px, thumb 12×12px, pad 3px → checked translate = 32-12-3 = 17px
  const isMd = size === "md";

  return (
    <Stack gap="6px" className={className}>
      <label
        htmlFor={inputId}
        className={cn(
          "flex items-start gap-3 cursor-pointer select-none",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        {/* Track + thumb */}
        <div className="relative shrink-0 mt-[1px]">
          <input
            id={inputId}
            type="checkbox"
            role="switch"
            checked={isChecked}
            disabled={disabled}
            onChange={handleChange}
            aria-checked={isChecked}
            aria-invalid={ariaInvalid}
            aria-describedby={ariaDescribedBy}
            className="sr-only peer"
          />
          <div
            className={cn(
              "relative rounded-full transition-colors duration-200",
              isMd ? "w-11 h-6" : "w-8 h-[18px]",
              isChecked ? "bg-[var(--primary)]" : "bg-[var(--border)]",
              hasError && !isChecked && "bg-[var(--error)]",
              // focus ring via peer — track is a sibling after the hidden input
              "peer-focus-visible:shadow-[0_0_0_3px_rgba(249,115,22,0.25)]"
            )}
          >
            <div
              className={cn(
                "absolute rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.35)]",
                "transition-transform duration-200 ease-out",
                isMd
                  ? cn(
                      "w-[18px] h-[18px] top-[3px]",
                      isChecked ? "translate-x-[23px]" : "translate-x-[3px]"
                    )
                  : cn("w-3 h-3 top-[3px]", isChecked ? "translate-x-[17px]" : "translate-x-[3px]")
              )}
            />
          </div>
        </div>

        {(label || description) && (
          <Stack gap={0.5}>
            {label && (
              <span
                className={cn(
                  "font-medium leading-snug text-[var(--text)]",
                  isMd ? "text-[14px]" : "text-[13px]"
                )}
              >
                {label}
              </span>
            )}
            {description && (
              <span className="text-[12px] text-[var(--text-muted)] leading-snug">
                {description}
              </span>
            )}
          </Stack>
        )}
      </label>

      {/* error / hint — indented past the track */}
      {error && (
        <p
          className={cn(
            "text-[12px] text-[var(--error)] leading-snug",
            isMd ? "pl-[56px]" : "pl-[44px]"
          )}
        >
          {error}
        </p>
      )}
      {!error && hint && (
        <p
          className={cn(
            "text-[12px] text-[var(--text-muted)] leading-snug",
            isMd ? "pl-[56px]" : "pl-[44px]"
          )}
        >
          {hint}
        </p>
      )}
    </Stack>
  );
}
