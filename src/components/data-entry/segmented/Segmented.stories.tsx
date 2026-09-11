import type { Story } from "@ladle/react";
import { Grid3x3, LayoutList, Moon, Sun, SunMoon } from "lucide-react";
import { useState } from "react";
import { Badge } from "../../data-display/badge/Badge";
import { Text } from "../../typography/Text";
import { Segmented } from "./Segmented";

export default { title: "Components / Data Entry / Segmented" };

/* ── Default ────────────────────────────────────────────── */
export const Default: Story = () => {
  const [value, setValue] = useState("week");
  return (
    <div className="flex flex-col gap-4">
      <Segmented
        value={value}
        onChange={setValue}
        options={[
          { label: "День", value: "day" },
          { label: "Неделя", value: "week" },
          { label: "Месяц", value: "month" },
        ]}
      />
      <Text size="xs" variant="muted">
        Выбрано: <Badge variant="orange">{value}</Badge>
      </Text>
    </div>
  );
};

/* ── With icons ─────────────────────────────────────────── */
export const WithIcons: Story = () => (
  <Segmented
    defaultValue="list"
    options={[
      { label: "Список", value: "list", icon: LayoutList },
      { label: "Сетка", value: "grid", icon: Grid3x3 },
    ]}
  />
);

/* ── Icon only ──────────────────────────────────────────── */
export const IconOnly: Story = () => (
  <Segmented
    defaultValue="system"
    aria-label="Тема оформления"
    options={[
      { label: "", value: "light", icon: Sun },
      { label: "", value: "system", icon: SunMoon },
      { label: "", value: "dark", icon: Moon },
    ]}
  />
);

/* ── Sizes ──────────────────────────────────────────────── */
export const Sizes: Story = () => {
  const options = [
    { label: "Активные", value: "active" },
    { label: "Завершённые", value: "done" },
  ];
  return (
    <div className="flex flex-col items-start gap-4">
      <Segmented size="sm" defaultValue="active" options={options} />
      <Segmented size="md" defaultValue="active" options={options} />
      <Segmented size="lg" defaultValue="active" options={options} />
    </div>
  );
};

/* ── Block (на всю ширину) ──────────────────────────────── */
export const Block: Story = () => (
  <div className="max-w-sm">
    <Segmented
      block
      defaultValue="all"
      options={[
        { label: "Все", value: "all" },
        { label: "Ожидают", value: "pending" },
        { label: "Сданы", value: "submitted" },
      ]}
    />
  </div>
);

/* ── Disabled ───────────────────────────────────────────── */
export const Disabled: Story = () => (
  <div className="flex flex-col items-start gap-4">
    <Segmented
      disabled
      defaultValue="week"
      options={[
        { label: "День", value: "day" },
        { label: "Неделя", value: "week" },
        { label: "Месяц", value: "month" },
      ]}
    />
    <Segmented
      defaultValue="a"
      options={[
        { label: "Доступно", value: "a" },
        { label: "Недоступно", value: "b", disabled: true },
      ]}
    />
  </div>
);

/* ── Uncontrolled ───────────────────────────────────────── */
export const Uncontrolled: Story = () => (
  <Segmented
    options={[
      { label: "USD", value: "usd" },
      { label: "UZS", value: "uzs" },
      { label: "EUR", value: "eur" },
    ]}
  />
);
