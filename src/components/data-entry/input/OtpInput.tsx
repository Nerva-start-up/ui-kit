import type React from "react";
import { useRef } from "react";
import { cn } from "../../../lib/cn";
import { Flex } from "../../layout/Flex";
import { Stack } from "../../layout/Stack";

export type OtpInputProps = {
  /** Количество boxes */
  length?: number;
  /** текущее значение */
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  /** Только цифры (inputMode=numeric) */
  numeric?: boolean;
  disabled?: boolean;
  className?: string;
};

/** Поле ввода OTP/PIN — отдельные boxes для каждого символа. */
export function OtpInput({
  length = 6,
  value,
  onChange,
  label,
  error,
  numeric = true,
  disabled,
  className,
}: OtpInputProps) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const chars = value.split("").slice(0, length);

  const focus = (i: number) => refs.current[i]?.focus();

  const handleChange = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const char = (numeric ? raw.replace(/\D/g, "") : raw).slice(-1);

    const next = [...chars];
    next[i] = char;
    const result = Array.from({ length }, (_, idx) => next[idx] ?? "").join("");
    onChange(result.trimEnd());

    if (char && i < length - 1) focus(i + 1);
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !chars[i] && i > 0) {
      const next = [...chars];
      next[i - 1] = "";
      const result = Array.from({ length }, (_, idx) => next[idx] ?? "").join("");
      onChange(result.trimEnd());
      focus(i - 1);
    }
    if (e.key === "ArrowLeft" && i > 0) focus(i - 1);
    if (e.key === "ArrowRight" && i < length - 1) focus(i + 1);
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    const cleaned = (numeric ? text.replace(/\D/g, "") : text).slice(0, length);
    onChange(cleaned);
    focus(Math.min(cleaned.length, length - 1));
  };

  return (
    <Stack gap={1.5} className={className}>
      {label && <span className="text-[13px] font-medium text-[var(--text-sub)]">{label}</span>}

      <Flex gap={2}>
        {Array.from({ length }, (_, i) => {
          const filled = Boolean(chars[i]);
          return (
            <input
              key={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type={numeric ? "tel" : "text"}
              inputMode={numeric ? "numeric" : "text"}
              maxLength={2}
              value={chars[i] ?? ""}
              onChange={(e) => handleChange(i, e)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              onFocus={(e) => e.target.select()}
              disabled={disabled}
              aria-label={`Символ ${i + 1} из ${length}`}
              className={cn(
                "w-11 h-13 text-center text-lg font-semibold",
                "bg-[var(--surface-2)] border rounded-[var(--radius-md)]",
                "text-[var(--text)] outline-none",
                "caret-[var(--primary)]",
                "transition-[border-color,box-shadow] duration-150",
                !error &&
                  !disabled && [
                    filled ? "border-[var(--text-muted)]" : "border-[var(--border)]",
                    "hover:border-[var(--text-muted)]",
                    "focus:border-[var(--primary)]",
                    "focus:shadow-[0_0_0_3px_rgba(249,115,22,0.15)]",
                  ],
                error && "border-[var(--error)] focus:shadow-[0_0_0_3px_rgba(248,113,113,0.15)]",
                disabled && "border-[var(--border)] opacity-50 cursor-not-allowed"
              )}
            />
          );
        })}
      </Flex>

      {error && <p className="text-[13px] text-[var(--error)]">{error}</p>}
    </Stack>
  );
}
