import { Calendar as CalendarIcon } from "lucide-react";
import React from "react";
import { cn } from "../../../lib/cn";
import { Calendar } from "../../data-display/calendar/Calendar";
import { Stack } from "../../layout/Stack";
import { Popover, PopoverContent, PopoverTrigger } from "../../overlay/popover/Popover";

export type DateInputProps = {
  /** контролируемое значение */
  value?: Date | null;
  /** неконтролируемое начальное значение */
  defaultValue?: Date | null;
  /** вызывается при выборе даты в календаре, попап закрывается */
  onChange?: (date: Date) => void;
  /** пробрасывается в `Calendar` */
  minDate?: Date;
  /** пробрасывается в `Calendar` */
  maxDate?: Date;
  /** форматирование значения в поле */
  formatDate?: (date: Date) => string;
  label?: string;
  error?: string;
  hint?: string;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  id?: string;
};

const defaultFormat = (date: Date) => date.toLocaleDateString("ru-RU");

/** Поле выбора даты — кнопка в стиле input, по клику открывает попап с `Calendar`. */
export const DateInput = React.forwardRef<HTMLButtonElement, DateInputProps>(
  (
    {
      value,
      defaultValue = null,
      onChange,
      minDate,
      maxDate,
      formatDate = defaultFormat,
      label,
      error,
      hint,
      disabled,
      placeholder = "Выберите дату",
      className,
      id,
    },
    ref
  ) => {
    const isControlled = value !== undefined;
    const [internal, setInternal] = React.useState<Date | null>(defaultValue);
    const current = isControlled ? value : internal;
    const [open, setOpen] = React.useState(false);

    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    const handleSelect = (date: Date) => {
      if (!isControlled) setInternal(date);
      onChange?.(date);
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
          <PopoverTrigger>
            <button
              ref={ref}
              id={inputId}
              type="button"
              disabled={disabled}
              aria-invalid={Boolean(error)}
              className={cn(
                "flex items-center justify-between w-full min-h-[48px]",
                "bg-[var(--surface-2)] border rounded-[var(--radius-sm)]",
                "px-[14px] py-3 text-[15px] leading-snug text-left outline-none",
                "transition-[border-color,box-shadow] duration-150",
                !error &&
                  !disabled && [
                    "border-[var(--border)]",
                    "hover:border-[color-mix(in_srgb,var(--border)_50%,var(--text-muted))]",
                    "focus-visible:border-[var(--primary)]",
                    "focus-visible:shadow-[0_0_0_3px_rgba(249,115,22,0.12)]",
                  ],
                error &&
                  "border-[var(--error)] focus-visible:shadow-[0_0_0_3px_rgba(248,113,113,0.12)]",
                disabled && "border-[var(--border)] opacity-50 cursor-not-allowed",
                className
              )}
            >
              <span
                className={cn(
                  "truncate",
                  current ? "text-[var(--text)]" : "text-[var(--text-muted)]"
                )}
              >
                {current ? formatDate(current) : placeholder}
              </span>
              <CalendarIcon size={16} className="text-[var(--text-muted)] shrink-0 ml-2" />
            </button>
          </PopoverTrigger>

          <PopoverContent align="start" className="p-0 border-none shadow-none bg-transparent">
            <Calendar value={current} onChange={handleSelect} minDate={minDate} maxDate={maxDate} />
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
DateInput.displayName = "DateInput";
