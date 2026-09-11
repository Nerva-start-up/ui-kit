import React, { createContext, useContext } from "react";
import { cn } from "../../../lib/cn";

/* ── Context ───────────────────────────────────────────── */
type RadioGroupContextValue = {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  variant: "default" | "card";
};

const RadioGroupContext = createContext<RadioGroupContextValue>({
  name: "",
  variant: "default",
});

/* ── RadioGroup ─────────────────────────────────────── */
export type RadioGroupProps = {
  /** HTML `name` для всех input внутри */
  name: string;
  /** Controlled значение */
  value?: string;
  /** Uncontrolled начальное значение */
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Стиль отображения пунктов */
  variant?: "default" | "card";
  /** Заголовок группы */
  label?: string;
  /** Подсказка под группой */
  hint?: string;
  /** Текст ошибки (красный) */
  error?: string;
  /** Направление пунктов */
  orientation?: "vertical" | "horizontal";
  /** Блокирует все пункты */
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
};

/** Корень — задаёт name, значение, ориентацию */
export function RadioGroup({
  name,
  value,
  defaultValue,
  onChange,
  variant = "default",
  label,
  hint,
  error,
  orientation = "vertical",
  disabled,
  className,
  children,
}: RadioGroupProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleChange = (val: string) => {
    if (!isControlled) setInternalValue(val);
    onChange?.(val);
  };

  return (
    <RadioGroupContext.Provider
      value={{ name, value: currentValue, onChange: handleChange, disabled, variant }}
    >
      <div className={cn("flex flex-col gap-1.5", className)}>
        {label && (
          <span className="text-[13px] font-medium text-[var(--text-sub)] select-none">
            {label}
          </span>
        )}
        <div
          role="radiogroup"
          aria-label={label}
          className={cn(
            "flex",
            variant === "card"
              ? orientation === "vertical"
                ? "flex-col gap-2"
                : "flex-row flex-wrap gap-3"
              : orientation === "vertical"
                ? "flex-col gap-2"
                : "flex-row flex-wrap gap-4"
          )}
        >
          {children}
        </div>
        {error && <p className="text-[12px] text-[var(--error)] leading-snug">{error}</p>}
        {!error && hint && (
          <p className="text-[12px] text-[var(--text-muted)] leading-snug">{hint}</p>
        )}
      </div>
    </RadioGroupContext.Provider>
  );
}

/* ── RadioItem ──────────────────────────────────────── */
export type RadioItemProps = {
  /** Значение пункта */
  value: string;
  /** Текст пункта */
  label: string;
  /** Подсказка под label пункта */
  hint?: string;
  /** Иконка (особенно полезна в `variant="card"`) */
  icon?: React.ReactNode;
  /** Блокирует конкретный пункт */
  disabled?: boolean;
  className?: string;
};

/** Один пункт с кастомным кружком и label */
export function RadioItem({ value, label, hint, icon, disabled, className }: RadioItemProps) {
  const ctx = useContext(RadioGroupContext);
  const isDisabled = disabled ?? ctx.disabled ?? false;
  const isChecked = ctx.value === value;
  const id = `${ctx.name}-${value}`;

  if (ctx.variant === "card") {
    return (
      <label
        htmlFor={id}
        className={cn(
          "flex items-start gap-3 p-4 rounded-[var(--radius-md)] border-2 cursor-pointer select-none",
          "transition-colors duration-150",
          isChecked
            ? "border-[var(--primary)] bg-[rgba(249,115,22,0.06)]"
            : "border-[var(--border)] hover:border-[var(--text-muted)] bg-[var(--surface)]",
          isDisabled && "cursor-not-allowed opacity-50 hover:border-[var(--border)]",
          className
        )}
      >
        <input
          type="radio"
          id={id}
          name={ctx.name}
          value={value}
          checked={isChecked}
          disabled={isDisabled}
          onChange={() => ctx.onChange?.(value)}
          className="sr-only"
        />
        {icon && (
          <span
            className={cn(
              "mt-0.5 shrink-0 transition-colors",
              isChecked ? "text-[var(--primary)]" : "text-[var(--text-muted)]"
            )}
          >
            {icon}
          </span>
        )}
        <span className="flex-1 flex flex-col gap-0.5">
          <span
            className={cn(
              "text-sm font-medium leading-snug transition-colors",
              isChecked ? "text-[var(--text)]" : "text-[var(--text-muted)]"
            )}
          >
            {label}
          </span>
          {hint && (
            <span className="text-[12px] text-[var(--text-muted)] leading-snug">{hint}</span>
          )}
        </span>
        <span
          className={cn(
            "mt-0.5 w-4 h-4 shrink-0 rounded-full border-2 flex items-center justify-center transition-colors duration-150",
            isChecked ? "border-[var(--primary)]" : "border-[var(--border)]"
          )}
        >
          <span
            className={cn(
              "w-2 h-2 rounded-full bg-[var(--primary)] transition-transform duration-150",
              isChecked ? "scale-100" : "scale-0"
            )}
          />
        </span>
      </label>
    );
  }

  return (
    <label
      htmlFor={id}
      className={cn(
        "flex items-start gap-2.5 cursor-pointer select-none group",
        isDisabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      <input
        type="radio"
        id={id}
        name={ctx.name}
        value={value}
        checked={isChecked}
        disabled={isDisabled}
        onChange={() => ctx.onChange?.(value)}
        className="sr-only"
      />
      <span
        className={cn(
          "mt-0.5 w-4 h-4 shrink-0 rounded-full border-2 transition-colors duration-150",
          "flex items-center justify-center",
          isChecked
            ? "border-[var(--primary)]"
            : "border-[var(--border)] group-hover:border-[var(--text-muted)]",
          isDisabled && "group-hover:border-[var(--border)]"
        )}
      >
        <span
          className={cn(
            "w-2 h-2 rounded-full bg-[var(--primary)] transition-transform duration-150",
            isChecked ? "scale-100" : "scale-0"
          )}
        />
      </span>
      <span className="flex flex-col gap-0.5">
        <span className="text-sm text-[var(--text)] leading-snug">{label}</span>
        {hint && <span className="text-[12px] text-[var(--text-muted)] leading-snug">{hint}</span>}
      </span>
    </label>
  );
}
