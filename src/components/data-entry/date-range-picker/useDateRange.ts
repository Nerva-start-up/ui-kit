import { useState } from "react";
import type { DateRange } from "./types";

export type UseDateRangeOptions = {
  value?: DateRange;
  defaultValue?: DateRange;
  onChange?: (range: DateRange) => void;
};

/** Controlled/uncontrolled диапазон + hover-превью второй даты до её выбора. */
export function useDateRange({
  value,
  defaultValue = [null, null],
  onChange,
}: UseDateRangeOptions) {
  const [internal, setInternal] = useState<DateRange>(defaultValue);
  const isControlled = value !== undefined;
  const [start, end] = isControlled ? value : internal;
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  function commit(next: DateRange) {
    if (!isControlled) setInternal(next);
    onChange?.(next);
  }

  function selectDate(date: Date) {
    if (!start || (start && end)) {
      commit([date, null]);
    } else if (date.getTime() < start.getTime()) {
      commit([date, null]);
    } else {
      commit([start, date]);
    }
  }

  function reset() {
    commit([null, null]);
  }

  return { start, end, hoverDate, setHoverDate, selectDate, reset };
}
