import type { Story } from "@ladle/react";
import { useState } from "react";
import { Text } from "../../typography/Text";
import { Calendar } from "./Calendar";

export default { title: "Components / Data Display / Calendar" };

export const Default: Story = () => {
  const [date, setDate] = useState<Date | null>(null);
  return (
    <div>
      <Calendar value={date} onChange={setDate} />
      {date && (
        <Text size="sm" variant="muted" className="mt-3">
          Выбрано: {date.toLocaleDateString("ru-RU")}
        </Text>
      )}
    </div>
  );
};

export const WithPreselected: Story = () => {
  const [date, setDate] = useState<Date | null>(new Date(2026, 5, 26));
  return <Calendar value={date} onChange={setDate} />;
};

export const WithMinMax: Story = () => {
  const [date, setDate] = useState<Date | null>(null);
  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 14);
  return (
    <div>
      <Text size="xs" variant="muted" className="mb-3">
        Выбрать дедлайн — только ближайшие 14 дней
      </Text>
      <Calendar value={date} onChange={setDate} minDate={today} maxDate={maxDate} />
    </div>
  );
};

export const ReadOnly: Story = () => <Calendar value={new Date(2026, 5, 26)} />;
