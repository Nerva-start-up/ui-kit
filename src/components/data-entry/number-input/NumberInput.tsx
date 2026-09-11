import { Minus, Plus } from "lucide-react";
import React from "react";
import { cn } from "../../../lib/cn";
import { Flex } from "../../layout/Flex";
import { HStack } from "../../layout/HStack";
import { Stack } from "../../layout/Stack";

export type NumberInputProps = {
  /** Controlled значение */
  value?: number;
  /** Uncontrolled начальное значение */
  defaultValue?: number;
  /** Callback изменения */
  onChange?: (value: number) => void;
  /** Минимальное значение (кнопка "-" отключается на границе) */
  min?: number;
  /** Максимальное значение (кнопка "+" отключается на границе) */
  max?: number;
  /** Шаг изменения */
  step?: number;
  /** Вид компонента */
  variant?: "default" | "line";
  /** Подпись над инпутом */
  label?: string;
  /** Подсказка под инпутом (скрывается при error) */
  hint?: string;
  /** Текст ошибки */
  error?: string;
  disabled?: boolean;
  className?: string;
  /** id для <input> (по умолчанию — из label) */
  id?: string;
};

/** Числовой инпут с кнопками -/+, два визуальных варианта */
export function NumberInput({
  value,
  defaultValue = 0,
  onChange,
  min,
  max,
  step = 1,
  variant = "default",
  label,
  hint,
  error,
  disabled = false,
  className,
  id,
}: NumberInputProps) {
  const [internal, setInternal] = React.useState(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  const clamp = (v: number) => {
    if (min !== undefined && v < min) return min;
    if (max !== undefined && v > max) return max;
    return v;
  };

  const update = (next: number) => {
    const clamped = clamp(next);
    if (!isControlled) setInternal(clamped);
    onChange?.(clamped);
  };

  const decrement = () => update(current - step);
  const increment = () => update(current + step);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = Number.parseFloat(e.target.value);
    if (!Number.isNaN(parsed)) update(parsed);
    else if (e.target.value === "" || e.target.value === "-") {
      if (!isControlled) setInternal(min ?? 0);
    }
  };

  const atMin = min !== undefined && current <= min;
  const atMax = max !== undefined && current >= max;

  if (variant === "line") {
    return (
      <Stack gap="6px" className={className}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-[13px] font-medium text-[var(--text-sub)] select-none"
          >
            {label}
          </label>
        )}

        <HStack gap={2} className={cn(disabled && "opacity-50 cursor-not-allowed")}>
          <button
            type="button"
            onClick={decrement}
            disabled={disabled || atMin}
            aria-label="Уменьшить"
            className={cn(
              "w-6 h-6 flex items-center justify-center rounded-full transition-colors shrink-0",
              "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]",
              "disabled:pointer-events-none disabled:opacity-40"
            )}
          >
            <Minus size={12} />
          </button>

          <Stack align="center" gap={1} className="flex-1">
            <input
              id={inputId}
              type="number"
              value={current}
              min={min}
              max={max}
              step={step}
              disabled={disabled}
              onChange={handleInput}
              className={cn(
                "w-full bg-transparent outline-none text-center",
                "text-sm font-medium text-[var(--text)]",
                "border-b-2 border-[var(--border)] pb-1",
                "focus:border-[var(--primary)]",
                "transition-colors duration-150",
                error && "border-[var(--error)] focus:border-[var(--error)]",
                "disabled:cursor-not-allowed",
                "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              )}
            />
            {min !== undefined && max !== undefined && (
              <div className="w-full relative h-1 rounded-full bg-[var(--border)]">
                <div
                  className="absolute left-0 top-0 h-full rounded-full bg-[var(--primary)] transition-all duration-150"
                  style={{
                    width: `${Math.min(100, Math.max(0, ((current - min) / (max - min)) * 100))}%`,
                  }}
                />
              </div>
            )}
            {min !== undefined && max !== undefined && (
              <Flex justify="between" className="w-full text-[10px] text-[var(--text-muted)]">
                <span>{min}</span>
                <span>{max}</span>
              </Flex>
            )}
          </Stack>

          <button
            type="button"
            onClick={increment}
            disabled={disabled || atMax}
            aria-label="Увеличить"
            className={cn(
              "w-6 h-6 flex items-center justify-center rounded-full transition-colors shrink-0",
              "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]",
              "disabled:pointer-events-none disabled:opacity-40"
            )}
          >
            <Plus size={12} />
          </button>
        </HStack>

        {error && <p className="text-[12px] text-[var(--error)] leading-snug">{error}</p>}
        {!error && hint && (
          <p className="text-[12px] text-[var(--text-muted)] leading-snug">{hint}</p>
        )}
      </Stack>
    );
  }

  /* variant="default" */
  return (
    <Stack gap="6px" className={className}>
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
          "bg-[var(--surface-2)] rounded-[var(--radius-sm)]",
          "border transition-[border-color,box-shadow] duration-150",
          !error &&
            !disabled && [
              "border-[var(--border)]",
              "hover:border-[color-mix(in_srgb,var(--border)_50%,var(--text-muted))]",
              "focus-within:border-[var(--primary)]",
              "focus-within:shadow-[0_0_0_3px_rgba(249,115,22,0.12)]",
            ],
          error && "border-[var(--error)] focus-within:shadow-[0_0_0_3px_rgba(248,113,113,0.12)]",
          disabled && "border-[var(--border)] opacity-50 cursor-not-allowed"
        )}
      >
        <button
          type="button"
          onClick={decrement}
          disabled={disabled || atMin}
          aria-label="Уменьшить"
          className={cn(
            "h-full px-4 flex items-center justify-center shrink-0 transition-colors",
            "text-[var(--text-muted)] hover:text-[var(--text)]",
            "border-r border-[var(--border)]",
            "disabled:pointer-events-none disabled:opacity-40"
          )}
        >
          <Minus size={14} />
        </button>

        <input
          id={inputId}
          type="number"
          value={current}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          onChange={handleInput}
          className={cn(
            "flex-1 min-w-0 bg-transparent outline-none text-center",
            "py-3 text-[15px] text-[var(--text)]",
            "disabled:cursor-not-allowed",
            "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          )}
        />

        <button
          type="button"
          onClick={increment}
          disabled={disabled || atMax}
          aria-label="Увеличить"
          className={cn(
            "h-full px-4 flex items-center justify-center shrink-0 transition-colors",
            "text-[var(--text-muted)] hover:text-[var(--text)]",
            "border-l border-[var(--border)]",
            "disabled:pointer-events-none disabled:opacity-40"
          )}
        >
          <Plus size={14} />
        </button>
      </HStack>

      {error && <p className="text-[12px] text-[var(--error)] leading-snug">{error}</p>}
      {!error && hint && (
        <p className="text-[12px] text-[var(--text-muted)] leading-snug">{hint}</p>
      )}
    </Stack>
  );
}
