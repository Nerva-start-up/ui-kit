import type { Story } from "@ladle/react";
import { Heart } from "lucide-react";
import { useState } from "react";
import { Badge } from "../../data-display/badge/Badge";
import { Text } from "../../typography/Text";
import { Rate } from "./Rate";

export default { title: "Components / Data Entry / Rate" };

/* ── Default ────────────────────────────────────────────── */
export const Default: Story = () => {
  const [value, setValue] = useState(3);
  return (
    <div className="flex flex-col gap-4 p-6 max-w-xs">
      <Rate value={value} onChange={setValue} />
      <Text size="xs" variant="muted">
        Значение: <Badge variant="orange">{value}</Badge>
      </Text>
    </div>
  );
};

/* ── Half star ──────────────────────────────────────────── */
export const AllowHalf: Story = () => {
  const [value, setValue] = useState(2.5);
  return (
    <div className="flex flex-col gap-4 p-6 max-w-xs">
      <Rate value={value} onChange={setValue} allowHalf />
      <Text size="xs" variant="muted">
        Значение: <Badge variant="orange">{value}</Badge>
      </Text>
    </div>
  );
};

/* ── Sizes ──────────────────────────────────────────────── */
export const Sizes: Story = () => (
  <div className="flex flex-col gap-4 p-6">
    <Rate size="sm" defaultValue={3} />
    <Rate size="md" defaultValue={3} />
    <Rate size="lg" defaultValue={3} />
  </div>
);

/* ── Count ──────────────────────────────────────────────── */
export const CustomCount: Story = () => (
  <div className="flex flex-col gap-4 p-6">
    <Rate count={3} defaultValue={2} />
    <Rate count={10} defaultValue={7} allowHalf />
  </div>
);

/* ── Custom icon ────────────────────────────────────────── */
export const CustomIcon: Story = () => <Rate icon={Heart} defaultValue={3} allowHalf />;

/* ── Label / hint / error ──────────────────────────────────── */
export const WithLabel: Story = () => (
  <div className="flex flex-col gap-4 p-6 max-w-xs">
    <Rate label="Оцените преподавателя" defaultValue={4} />
    <Rate label="Сложность курса" hint="1 — очень легко, 5 — очень сложно" defaultValue={0} />
    <Rate label="Оценка обязательна" error="Поставьте оценку перед отправкой" defaultValue={0} />
  </div>
);

/* ── Read-only / disabled ───────────────────────────────── */
export const ReadOnlyAndDisabled: Story = () => (
  <div className="flex flex-col gap-4 p-6">
    <Rate defaultValue={4} allowHalf readOnly />
    <Rate defaultValue={2} disabled />
  </div>
);

/* ── Uncontrolled ───────────────────────────────────────── */
export const Uncontrolled: Story = () => (
  <div className="flex flex-col gap-4 p-6">
    <Rate defaultValue={0} />
    <Rate defaultValue={3} allowClear={false} />
  </div>
);
