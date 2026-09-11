import { Check, Minus } from "lucide-react";
import React from "react";
import { cn } from "../../../lib/cn";
import { Center } from "../../layout/Center";
import { Flex } from "../../layout/Flex";
import { Stack } from "../../layout/Stack";

export type CheckboxProps = {
  /** Controlled состояние */
  checked?: boolean;
  /** Uncontrolled начальное состояние */
  defaultChecked?: boolean;
  /** Частично выбранное состояние (для "выбрать все") */
  indeterminate?: boolean;
  /** Callback изменения */
  onChange?: (checked: boolean) => void;
  /** Текст метки */
  label?: string;
  /** Второстепенное описание под меткой */
  description?: string;
  /** Подсказка под чекбоксом (скрывается при error) */
  hint?: string;
  /** Текст ошибки */
  error?: string;
  disabled?: boolean;
  /** id для <input> (по умолчанию — из label) */
  id?: string;
  "aria-invalid"?: boolean | "true" | "false";
  "aria-describedby"?: string;
  "aria-label"?: string;
  className?: string;
};

/** Чекбокс с поддержкой indeterminate-состояния, описания, ошибок */
export function Checkbox({
  checked,
  defaultChecked = false,
  indeterminate = false,
  onChange,
  label,
  description,
  hint,
  error,
  disabled = false,
  id,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
  "aria-label": ariaLabel,
  className,
}: CheckboxProps) {
  const [internal, setInternal] = React.useState(defaultChecked);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internal;

  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.checked;
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  const active = isChecked || indeterminate;
  const hasError = Boolean(error) || ariaInvalid === true || ariaInvalid === "true";

  return (
    <Stack gap="6px" className={className}>
      <label
        htmlFor={inputId}
        className={cn(
          "flex items-start gap-3 cursor-pointer select-none",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        <div className="relative mt-[1px] shrink-0">
          <input
            ref={inputRef}
            id={inputId}
            type="checkbox"
            checked={isChecked}
            disabled={disabled}
            onChange={handleChange}
            aria-invalid={ariaInvalid}
            aria-describedby={ariaDescribedBy}
            aria-label={ariaLabel}
            className="sr-only peer"
          />
          <Center
            className={cn(
              "w-[18px] h-[18px] rounded-[4px] border-2 transition-all duration-150",
              active
                ? "bg-[var(--primary)] border-[var(--primary)]"
                : [
                    "bg-[var(--surface-2)] border-[var(--border)]",
                    !disabled && "group-hover:border-[var(--text-muted)]",
                  ],
              hasError && !active && "border-[var(--error)]",
              !disabled && "peer-focus-visible:shadow-[0_0_0_3px_rgba(249,115,22,0.20)]",
              disabled && "opacity-60"
            )}
          >
            {indeterminate ? (
              <Minus size={11} strokeWidth={3} className="text-white" />
            ) : isChecked ? (
              <Check size={11} strokeWidth={3} className="text-white" />
            ) : null}
          </Center>
        </div>

        {(label || description) && (
          <Stack gap={0.5}>
            {label && (
              <span className="text-[14px] font-medium text-[var(--text)] leading-snug">
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

      {error && <p className="text-[12px] text-[var(--error)] leading-snug pl-[30px]">{error}</p>}
      {!error && hint && (
        <p className="text-[12px] text-[var(--text-muted)] leading-snug pl-[30px]">{hint}</p>
      )}
    </Stack>
  );
}

/* ── CheckboxGroup ───────────────────────────────────── */
type CheckboxGroupContextValue = {
  value: string[];
  onChange: (value: string) => void;
  disabled?: boolean;
};

const CheckboxGroupContext = React.createContext<CheckboxGroupContextValue>({
  value: [],
  onChange: () => {},
});

export type CheckboxGroupProps = {
  /** Controlled массив выбранных значений */
  value?: string[];
  /** Uncontrolled начальное значение */
  defaultValue?: string[];
  /** Callback изменения */
  onChange?: (value: string[]) => void;
  /** Подпись группы */
  label?: string;
  /** Подсказка под группой */
  hint?: string;
  /** Текст ошибки */
  error?: string;
  /** Направление элементов */
  orientation?: "vertical" | "horizontal";
  /** Отключает все дочерние CheckboxItem */
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
};

/** Группа чекбоксов с контекстом для мульти-выбора */
export function CheckboxGroup({
  value,
  defaultValue = [],
  onChange,
  label,
  hint,
  error,
  orientation = "vertical",
  disabled,
  className,
  children,
}: CheckboxGroupProps) {
  const [internal, setInternal] = React.useState<string[]>(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;

  const toggle = (item: string) => {
    const next = current.includes(item) ? current.filter((v) => v !== item) : [...current, item];
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  return (
    <CheckboxGroupContext.Provider value={{ value: current, onChange: toggle, disabled }}>
      <Stack gap={1.5} className={className}>
        {label && (
          <span className="text-[13px] font-medium text-[var(--text-sub)] select-none">
            {label}
          </span>
        )}
        <Flex
          asChild
          direction={orientation === "vertical" ? "col" : "row"}
          wrap={orientation === "vertical" ? undefined : "wrap"}
          gap={orientation === "vertical" ? 2 : 4}
        >
          <fieldset aria-label={label} className="border-none p-0 m-0 min-w-0">
            {children}
          </fieldset>
        </Flex>
        {error && <p className="text-[12px] text-[var(--error)] leading-snug">{error}</p>}
        {!error && hint && (
          <p className="text-[12px] text-[var(--text-muted)] leading-snug">{hint}</p>
        )}
      </Stack>
    </CheckboxGroupContext.Provider>
  );
}

export type CheckboxItemProps = {
  /** Значение пункта (обязательно) */
  value: string;
  /** Текст метки */
  label?: string;
  /** Описание */
  description?: string;
  /** Отключает только этот пункт */
  disabled?: boolean;
  className?: string;
};

/** Пункт внутри CheckboxGroup */
export function CheckboxItem({
  value,
  label,
  description,
  disabled,
  className,
}: CheckboxItemProps) {
  const ctx = React.useContext(CheckboxGroupContext);
  const isChecked = ctx.value.includes(value);
  const isDisabled = disabled || ctx.disabled;

  return (
    <Checkbox
      checked={isChecked}
      onChange={() => ctx.onChange(value)}
      label={label}
      description={description}
      disabled={isDisabled}
      className={className}
    />
  );
}
