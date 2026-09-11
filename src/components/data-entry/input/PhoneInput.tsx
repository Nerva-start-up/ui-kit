import React from "react";
import { cn } from "../../../lib/cn";
import { HStack } from "../../layout/HStack";
import { Stack } from "../../layout/Stack";

export type PhoneInputProps = {
  label?: string;
  error?: string;
  hint?: string;
  /** Код страны слева */
  prefix?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;

/** Поле телефона с отдельным блоком префикса. `type="tel"` проставлен автоматически. */
export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ label, error, hint, prefix = "+998", className, id, disabled, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <Stack gap={1.5}>
        {label && (
          <label htmlFor={inputId} className="text-[13px] font-medium text-[var(--text-sub)]">
            {label}
          </label>
        )}

        <HStack
          gap={0}
          align="stretch"
          className={cn(
            "bg-[var(--surface-2)] border rounded-[var(--radius-md)]",
            "transition-[border-color,box-shadow] duration-150",
            !error &&
              !disabled && [
                "border-[var(--border)]",
                "hover:border-[var(--text-muted)]",
                "focus-within:border-[var(--primary)]",
                "focus-within:shadow-[0_0_0_3px_rgba(249,115,22,0.15)]",
              ],
            error && [
              "border-[var(--error)]",
              "focus-within:shadow-[0_0_0_3px_rgba(248,113,113,0.15)]",
            ],
            disabled && "border-[var(--border)] opacity-50 cursor-not-allowed"
          )}
        >
          <span className="flex items-center px-3.5 border-r border-[var(--border)] text-[15px] font-medium text-[var(--text-muted)] select-none shrink-0">
            {prefix}
          </span>
          <input
            ref={ref}
            id={inputId}
            type="tel"
            disabled={disabled}
            className={cn(
              "flex-1 min-w-0 bg-transparent outline-none",
              "px-3.5 py-[11px] text-[15px] leading-snug text-[var(--text)]",
              "placeholder:text-[var(--text-muted)]",
              "caret-[var(--primary)]",
              "disabled:cursor-not-allowed",
              className
            )}
            {...props}
          />
        </HStack>

        {error && <p className="text-[13px] text-[var(--error)]">{error}</p>}
        {!error && hint && <p className="text-[13px] text-[var(--text-muted)]">{hint}</p>}
      </Stack>
    );
  }
);
PhoneInput.displayName = "PhoneInput";
