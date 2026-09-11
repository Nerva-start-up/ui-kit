import React from "react";
import { cn } from "../../../lib/cn";
import { HStack } from "../../layout/HStack";
import { Stack } from "../../layout/Stack";

export type InputProps = {
  /** подпись над полем */
  label?: string;
  /** красный текст под полем */
  error?: string;
  /** серый текст (скрывается при error) */
  hint?: string;
  /** иконка слева (не интерактивная) */
  leftIcon?: React.ReactNode;
  /** элемент справа (может быть кнопкой) */
  rightIcon?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

/** Базовое поле ввода с label, error, hint и слотами для иконок. */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      className,
      id,
      disabled,
      "aria-invalid": ariaInvalid,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    const hasLeft = Boolean(leftIcon);
    const hasRight = Boolean(rightIcon);
    const hasError = Boolean(error) || ariaInvalid === true || ariaInvalid === "true";

    return (
      <Stack gap="6px">
        {label && (
          <label
            htmlFor={inputId}
            className="text-[13px] font-medium text-[var(--text-sub)] select-none"
          >
            {label}
          </label>
        )}

        <HStack
          gap={0}
          className={cn(
            "min-h-[48px]",
            "bg-[var(--surface-2)]",
            "border rounded-[var(--radius-sm)]",
            "transition-[border-color,box-shadow] duration-150",
            !hasError &&
              !disabled && [
                "border-[var(--border)]",
                "hover:border-[color-mix(in_srgb,var(--border)_50%,var(--text-muted))]",
                "focus-within:border-[var(--primary)]",
                "focus-within:shadow-[0_0_0_3px_rgba(249,115,22,0.12)]",
              ],
            hasError &&
              "border-[var(--error)] focus-within:shadow-[0_0_0_3px_rgba(248,113,113,0.12)]",
            disabled && "border-[var(--border)] opacity-50 cursor-not-allowed"
          )}
        >
          {hasLeft && (
            <span className="pl-[14px] flex items-center shrink-0 pointer-events-none text-[var(--text-muted)]">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={ariaInvalid}
            className={cn(
              "flex-1 min-w-0 bg-transparent outline-none",
              "px-[14px] py-3 text-[15px] leading-snug",
              "text-[var(--text)] placeholder:text-[var(--text-muted)]",
              "caret-[var(--primary)] disabled:cursor-not-allowed",
              hasLeft && "pl-2",
              hasRight && "pr-2",
              className
            )}
            {...props}
          />

          {hasRight && (
            <span className="pr-[14px] flex items-center shrink-0 text-[var(--text-muted)]">
              {rightIcon}
            </span>
          )}
        </HStack>

        {error && <p className="text-[12px] text-[var(--error)] leading-snug">{error}</p>}
        {!error && hint && (
          <p className="text-[12px] text-[var(--text-muted)] leading-snug">{hint}</p>
        )}
      </Stack>
    );
  }
);
Input.displayName = "Input";
