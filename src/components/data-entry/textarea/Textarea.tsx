import React from "react";
import { cn } from "../../../lib/cn";
import { Flex } from "../../layout/Flex";
import { Stack } from "../../layout/Stack";

export type TextareaProps = {
  label?: string;
  error?: string;
  hint?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

/** Многострочное поле. API идентичен `Input`. */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className, id, disabled, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <Stack gap={1.5}>
        {label && (
          <label htmlFor={inputId} className="text-[13px] font-medium text-[var(--text-sub)]">
            {label}
          </label>
        )}

        <Flex
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
          <textarea
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={cn(
              "flex-1 min-w-0 bg-transparent outline-none",
              "px-3.5 py-3 text-[15px] leading-relaxed text-[var(--text)]",
              "placeholder:text-[var(--text-muted)]",
              "caret-[var(--primary)]",
              "resize-y min-h-[88px]",
              "disabled:cursor-not-allowed",
              className
            )}
            {...props}
          />
        </Flex>

        {error && <p className="text-[13px] text-[var(--error)]">{error}</p>}
        {!error && hint && <p className="text-[13px] text-[var(--text-muted)]">{hint}</p>}
      </Stack>
    );
  }
);
Textarea.displayName = "Textarea";
