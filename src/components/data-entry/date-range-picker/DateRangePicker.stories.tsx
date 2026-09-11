import type { Story } from "@ladle/react";
import { useState } from "react";
import { Badge } from "../../data-display/badge/Badge";
import { Text } from "../../typography/Text";
import { DateRangePicker } from "./DateRangePicker";
import type { DateRange } from "./types";

export default { title: "Components / Data Entry / DateRangePicker" };

/* ── Default ────────────────────────────────────────────── */
export const Default: Story = () => {
  const [range, setRange] = useState<DateRange>([null, null]);
  return (
    <div className="flex max-w-xs flex-col gap-3">
      <DateRangePicker value={range} onChange={setRange} />
      <Text size="xs" variant="muted">
        Диапазон: <Badge variant="orange">{range[0] && range[1] ? "выбран" : "не выбран"}</Badge>
      </Text>
    </div>
  );
};

/* ── Preselected ────────────────────────────────────────── */
export const Preselected: Story = () => (
  <div className="max-w-xs">
    <DateRangePicker defaultValue={[new Date(2026, 6, 1), new Date(2026, 6, 15)]} />
  </div>
);

/* ── Min/Max ────────────────────────────────────────────── */
export const WithMinMax: Story = () => {
  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 60);
  return (
    <div className="max-w-xs">
      <Text size="xs" variant="muted" className="mb-3">
        Период отчётности — не позднее 60 дней вперёд
      </Text>
      <DateRangePicker minDate={today} maxDate={maxDate} placeholder="Выберите период отчёта" />
    </div>
  );
};

/* ── Disabled ───────────────────────────────────────────── */
export const Disabled: Story = () => (
  <div className="max-w-xs">
    <DateRangePicker disabled placeholder="Недоступно" />
  </div>
);
