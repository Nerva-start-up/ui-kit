import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "../../../lib/cn";
import { Button } from "../../actions/button/Button";
import { Calendar } from "../../data-display/calendar/Calendar";
import { Flex } from "../../layout/Flex";
import { Popover, PopoverContent, PopoverTrigger } from "../../overlay/popover/Popover";
import type { DateRange } from "./types";
import { useDateRange } from "./useDateRange";
import { formatRangeLabel } from "./utils";

export type DateRangePickerProps = {
  /** Controlled диапазон `[от, до]` */
  value?: DateRange;
  /** Uncontrolled начальный диапазон */
  defaultValue?: DateRange;
  /** Callback изменения — вызывается при выборе каждой из дат */
  onChange?: (range: DateRange) => void;
  /** Минимальная выбираемая дата */
  minDate?: Date;
  /** Максимальная выбираемая дата */
  maxDate?: Date;
  /** Текст при пустом диапазоне */
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

/** Выбор диапазона дат — два календаря в попапе, непрерывная подсветка диапазона и hover-превью второй даты. */
export function DateRangePicker({
  value,
  defaultValue,
  onChange,
  minDate,
  maxDate,
  placeholder = "Выберите период",
  disabled = false,
  className,
}: DateRangePickerProps) {
  const { start, end, hoverDate, setHoverDate, selectDate, reset } = useDateRange({
    value,
    defaultValue,
    onChange,
  });

  const rightMonth = start
    ? new Date(start.getFullYear(), start.getMonth() + 1, 1)
    : new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1);
  const label = formatRangeLabel(start, end);

  return (
    <Popover>
      <PopoverTrigger>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            "flex h-10 w-full items-center gap-2 rounded-[var(--radius-sm)] border px-3",
            "border-[var(--border)] bg-[var(--surface-2)] text-sm",
            "transition-colors hover:border-[var(--text-muted)]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
        >
          <CalendarIcon size={15} className="shrink-0 text-[var(--text-muted)]" />
          <span className={cn("flex-1 truncate text-left", !label && "text-[var(--text-muted)]")}>
            {label || placeholder}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3">
        <Flex gap={3}>
          <Calendar
            rangeValue={[start, end]}
            hoverDate={hoverDate}
            onDayHover={setHoverDate}
            onChange={selectDate}
            minDate={minDate}
            maxDate={maxDate}
            defaultMonth={start ?? undefined}
            className="border-none p-0 shadow-none"
          />
          <Calendar
            rangeValue={[start, end]}
            hoverDate={hoverDate}
            onDayHover={setHoverDate}
            onChange={selectDate}
            minDate={minDate}
            maxDate={maxDate}
            defaultMonth={rightMonth}
            className="border-none p-0 shadow-none"
          />
        </Flex>
        {label && (
          <Flex justify="end" className="mt-2 border-t border-[var(--border)] pt-2">
            <Button variant="ghost" size="sm" onClick={reset}>
              Сбросить
            </Button>
          </Flex>
        )}
      </PopoverContent>
    </Popover>
  );
}
