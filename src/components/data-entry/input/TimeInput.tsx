import { Clock } from "lucide-react";
import React from "react";
import { cn } from "../../../lib/cn";
import { Flex } from "../../layout/Flex";
import { HStack } from "../../layout/HStack";
import { Stack } from "../../layout/Stack";
import { Popover, PopoverContent, PopoverTrigger } from "../../overlay/popover/Popover";

const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));

function parseTime(value: string | undefined): { hh: string; mm: string } | null {
  const match = value?.match(/^(\d{2}):(\d{2})$/);
  if (!match) return null;
  return { hh: match[1], mm: match[2] };
}

function formatDigits(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}:${digits.slice(2)}`;
}

function clampTime(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  if (digits.length !== 4) return null;
  const hh = Math.min(23, Number.parseInt(digits.slice(0, 2), 10));
  const mm = Math.min(59, Number.parseInt(digits.slice(2, 4), 10));
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

function TimeColumn({
  title,
  items,
  selected,
  onSelect,
}: {
  title: string;
  items: string[];
  selected?: string;
  onSelect: (item: string) => void;
}) {
  return (
    <Stack gap={0} className="w-14">
      <span className="text-center text-[11px] font-medium text-[var(--text-muted)] py-1">
        {title}
      </span>
      <Stack gap={0.5} className="max-h-48 overflow-y-auto">
        {items.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onSelect(item)}
            className={cn(
              "h-8 shrink-0 rounded-[var(--radius-sm)] text-sm transition-colors outline-none",
              "focus-visible:ring-2 focus-visible:ring-[var(--primary)]",
              item === selected
                ? "bg-[var(--primary)] text-white font-semibold"
                : "text-[var(--text)] hover:bg-[var(--surface-2)]"
            )}
          >
            {item}
          </button>
        ))}
      </Stack>
    </Stack>
  );
}

export type TimeInputProps = {
  /** контролируемое значение "HH:MM" */
  value?: string;
  /** неконтролируемое начальное значение */
  defaultValue?: string;
  /** вызывается при вводе (валидном, на blur) и при выборе в пикере */
  onChange?: (value: string) => void;
  /** шаг списка минут в пикере (`00, 05, 10 …`) */
  minuteStep?: number;
  label?: string;
  error?: string;
  hint?: string;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  id?: string;
};

/** Поле ввода времени (`HH:MM`, 24ч) с текстовым вводом или пикером из двух прокручиваемых колонок — часы и минуты. */
export const TimeInput = React.forwardRef<HTMLInputElement, TimeInputProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      minuteStep = 5,
      label,
      error,
      hint,
      disabled,
      placeholder = "--:--",
      className,
      id,
    },
    ref
  ) => {
    const isControlled = value !== undefined;
    const [internal, setInternal] = React.useState(defaultValue ?? "");
    const committed = isControlled ? value : internal;

    const [text, setText] = React.useState(committed);
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
      setText(committed);
    }, [committed]);

    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    const parsed = parseTime(committed);
    const minutes = React.useMemo(
      () =>
        Array.from({ length: Math.ceil(60 / minuteStep) }, (_, i) =>
          String(i * minuteStep).padStart(2, "0")
        ),
      [minuteStep]
    );

    const commit = (next: string) => {
      if (!isControlled) setInternal(next);
      onChange?.(next);
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setText(formatDigits(e.target.value));
    };

    const handleBlur = () => {
      const clamped = clampTime(text);
      if (clamped) commit(clamped);
      else setText(committed);
    };

    const selectHour = (hh: string) => commit(`${hh}:${parsed?.mm ?? "00"}`);
    const selectMinute = (mm: string) => {
      commit(`${parsed?.hh ?? "00"}:${mm}`);
      setOpen(false);
    };

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

        <Popover open={open} onOpenChange={disabled ? undefined : setOpen}>
          <HStack
            gap={0}
            className={cn(
              "min-h-[48px]",
              "bg-[var(--surface-2)]",
              "border rounded-[var(--radius-sm)]",
              "transition-[border-color,box-shadow] duration-150",
              !error &&
                !disabled && [
                  "border-[var(--border)]",
                  "hover:border-[color-mix(in_srgb,var(--border)_50%,var(--text-muted))]",
                  "focus-within:border-[var(--primary)]",
                  "focus-within:shadow-[0_0_0_3px_rgba(249,115,22,0.12)]",
                ],
              error &&
                "border-[var(--error)] focus-within:shadow-[0_0_0_3px_rgba(248,113,113,0.12)]",
              disabled && "border-[var(--border)] opacity-50 cursor-not-allowed",
              className
            )}
          >
            <input
              ref={ref}
              id={inputId}
              type="text"
              inputMode="numeric"
              disabled={disabled}
              value={text}
              placeholder={placeholder}
              onChange={handleTextChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(error)}
              className={cn(
                "flex-1 min-w-0 bg-transparent outline-none",
                "pl-[14px] py-3 text-[15px] leading-snug tabular-nums",
                "text-[var(--text)] placeholder:text-[var(--text-muted)]",
                "caret-[var(--primary)] disabled:cursor-not-allowed"
              )}
            />

            <PopoverTrigger>
              <button
                type="button"
                disabled={disabled}
                aria-label="Выбрать время"
                className="pr-[14px] pl-2 flex items-center shrink-0 text-[var(--text-muted)] hover:text-[var(--text)] disabled:cursor-not-allowed outline-none"
              >
                <Clock size={16} />
              </button>
            </PopoverTrigger>
          </HStack>

          <PopoverContent align="end" className="p-2 w-auto">
            <Flex gap={1}>
              <TimeColumn title="Часы" items={HOURS} selected={parsed?.hh} onSelect={selectHour} />
              <div className="w-px bg-[var(--border)]" />
              <TimeColumn
                title="Минуты"
                items={minutes}
                selected={parsed?.mm}
                onSelect={selectMinute}
              />
            </Flex>
          </PopoverContent>
        </Popover>

        {error && <p className="text-[12px] text-[var(--error)] leading-snug">{error}</p>}
        {!error && hint && (
          <p className="text-[12px] text-[var(--text-muted)] leading-snug">{hint}</p>
        )}
      </Stack>
    );
  }
);
TimeInput.displayName = "TimeInput";
