import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "../../../lib/cn";
import { Center } from "../../layout/Center";
import { Grid } from "../../layout/Grid";
import { HStack } from "../../layout/HStack";

const WEEKDAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const MONTHS = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

// Returns Mon=0 … Sun=6 offset for the first day of month
function getMonthOffset(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return (day + 6) % 7;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export type CalendarProps = {
  /** Выбранная дата */
  value?: Date | null;
  /** Callback при выборе */
  onChange?: (date: Date) => void;
  /** Минимальная дата */
  minDate?: Date;
  /** Максимальная дата */
  maxDate?: Date;
  /** Начальный месяц (по умолчанию value или сегодня) */
  defaultMonth?: Date;
  /** `[от, до]` — подсвечивает непрерывную полосу диапазона (используется `DateRangePicker`) */
  rangeValue?: [Date | null, Date | null];
  /** Дата под курсором — превью диапазона до выбора второй даты */
  hoverDate?: Date | null;
  /** Наведение на день — для превью диапазона */
  onDayHover?: (date: Date | null) => void;
  className?: string;
};

/** Автономный календарь без внешних зависимостей, неделя начинается с понедельника (русская локаль) */
export function Calendar({
  value,
  onChange,
  minDate,
  maxDate,
  defaultMonth,
  rangeValue,
  hoverDate,
  onDayHover,
  className,
}: CalendarProps) {
  const today = new Date();
  const initial = defaultMonth ?? value ?? today;

  const [viewYear, setViewYear] = useState(initial.getFullYear());
  const [viewMonth, setViewMonth] = useState(initial.getMonth());

  const offset = getMonthOffset(viewYear, viewMonth);
  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const prevMonthDays = getDaysInMonth(viewYear, viewMonth - 1);

  // Build flat grid (always 6 rows × 7 cols = 42 cells)
  const cells: Array<{ date: Date; thisMonth: boolean }> = [];

  for (let i = offset - 1; i >= 0; i--) {
    cells.push({ date: new Date(viewYear, viewMonth - 1, prevMonthDays - i), thisMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: new Date(viewYear, viewMonth, d), thisMonth: true });
  }
  let nextDay = 1;
  while (cells.length < 42) {
    cells.push({ date: new Date(viewYear, viewMonth + 1, nextDay++), thisMonth: false });
  }

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else setViewMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else setViewMonth((m) => m + 1);
  };

  const isDisabled = (date: Date) => {
    if (minDate && date < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate()))
      return true;
    if (maxDate && date > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate()))
      return true;
    return false;
  };

  const navBtnCls = cn(
    "w-7 h-7 flex items-center justify-center rounded-[var(--radius-sm)]",
    "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]",
    "transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
  );

  return (
    <div
      className={cn(
        "w-fit select-none",
        "bg-[var(--surface)] border border-[var(--border)]",
        "rounded-[var(--radius-lg)] p-4",
        "shadow-[var(--shadow-sm)]",
        className
      )}
    >
      {/* Month nav */}
      <HStack justify="between" className="mb-3">
        <button
          type="button"
          onClick={prevMonth}
          className={navBtnCls}
          aria-label="Предыдущий месяц"
        >
          <ChevronLeft size={15} />
        </button>
        <span className="text-sm font-semibold text-[var(--text)]">
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          className={navBtnCls}
          aria-label="Следующий месяц"
        >
          <ChevronRight size={15} />
        </button>
      </HStack>

      {/* Weekday headers */}
      <Grid cols={7} className="mb-1">
        {WEEKDAYS.map((d) => (
          <span
            key={d}
            className="text-center text-[11px] font-medium text-[var(--text-muted)] py-1"
          >
            {d}
          </span>
        ))}
      </Grid>

      {/* Day grid */}
      <Grid cols={7} gap={rangeValue ? undefined : 0.5} rowGap={rangeValue ? 0.5 : undefined}>
        {cells.map(({ date, thisMonth }, i) => {
          const selected = !!value && isSameDay(date, value);
          const isToday = isSameDay(date, today);
          const disabled = isDisabled(date);

          const [rangeStart, rangeEnd] = rangeValue ?? [null, null];
          const previewEnd =
            rangeEnd ??
            (rangeStart && hoverDate && hoverDate.getTime() > rangeStart.getTime()
              ? hoverDate
              : null);
          const bandEnd = rangeEnd ?? previewEnd;
          const isRangeStart = !!rangeStart && isSameDay(date, rangeStart);
          const isRangeEnd = !!bandEnd && isSameDay(date, bandEnd);
          const isRangeEdge = isRangeStart || isRangeEnd;
          const isInBand =
            !!rangeStart &&
            !!bandEnd &&
            date.getTime() > rangeStart.getTime() &&
            date.getTime() < bandEnd.getTime();

          return (
            <Center
              key={i}
              onMouseEnter={() => onDayHover?.(date)}
              className={cn(
                "h-8",
                (isInBand || isRangeEdge) && "bg-[var(--primary-dim)]",
                isRangeStart && "rounded-l-full",
                isRangeEnd && "rounded-r-full"
              )}
            >
              <button
                type="button"
                disabled={disabled}
                onClick={() => !disabled && onChange?.(date)}
                className={cn(
                  "w-8 h-8 flex items-center justify-center text-sm",
                  "transition-colors outline-none",
                  "focus-visible:ring-2 focus-visible:ring-[var(--primary)]",
                  selected || isRangeEdge ? "rounded-full" : "rounded-[var(--radius-sm)]",
                  // out-of-month
                  !thisMonth && "text-[var(--text-muted)] opacity-35",
                  // normal day in month
                  thisMonth &&
                    !selected &&
                    !isRangeEdge &&
                    !disabled &&
                    "text-[var(--text)] hover:bg-[var(--surface-2)]",
                  // today highlight (no selection)
                  isToday && !selected && !isRangeEdge && "font-bold text-[var(--primary)]",
                  // selected / range edge
                  (selected || isRangeEdge) &&
                    "bg-[var(--primary)] text-white font-semibold hover:bg-[var(--primary-h)]",
                  // disabled
                  disabled && "opacity-30 cursor-not-allowed pointer-events-none"
                )}
              >
                {date.getDate()}
              </button>
            </Center>
          );
        })}
      </Grid>
    </div>
  );
}
