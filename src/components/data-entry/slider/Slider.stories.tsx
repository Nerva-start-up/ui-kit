import type { Story } from "@ladle/react";
import { useState } from "react";
import { Badge } from "../../data-display/badge/Badge";
import { Text } from "../../typography/Text";
import { Slider } from "./Slider";

export default { title: "Components / Data Entry / Slider" };

/* ── Default ────────────────────────────────────────────── */
export const Default: Story = () => {
  const [value, setValue] = useState(40);
  return (
    <div className="flex max-w-sm flex-col gap-4">
      <Slider value={value} onChange={(v) => setValue(v as number)} />
      <Text size="xs" variant="muted">
        Значение: <Badge variant="orange">{value}</Badge>
      </Text>
    </div>
  );
};

/* ── With label ─────────────────────────────────────────── */
export const WithLabel: Story = () => (
  <div className="max-w-sm">
    <Slider label="Громкость" defaultValue={70} />
  </div>
);

/* ── Step ───────────────────────────────────────────────── */
export const Step: Story = () => (
  <div className="max-w-sm">
    <Slider label="Шаг 10" defaultValue={30} step={10} />
  </div>
);

/* ── Marks ──────────────────────────────────────────────── */
export const Marks: Story = () => (
  <div className="max-w-sm">
    <Slider
      label="Уровень сложности"
      defaultValue={50}
      step={25}
      marks={{ 0: "Легко", 25: "Ниже среднего", 50: "Средне", 75: "Выше среднего", 100: "Сложно" }}
    />
  </div>
);

/* ── Range ──────────────────────────────────────────────── */
export const Range: Story = () => {
  const [value, setValue] = useState<[number, number]>([20, 80]);
  return (
    <div className="flex max-w-sm flex-col gap-4">
      <Slider
        label="Диапазон KSI Score"
        range
        value={value}
        onChange={(v) => setValue(v as [number, number])}
      />
      <Text size="xs" variant="muted">
        От <Badge variant="orange">{value[0]}</Badge> до <Badge variant="orange">{value[1]}</Badge>
      </Text>
    </div>
  );
};

/* ── Range with marks ───────────────────────────────────── */
export const RangeWithMarks: Story = () => (
  <div className="max-w-sm">
    <Slider
      label="Цена курса, тыс. сум"
      range
      defaultValue={[200, 800]}
      min={0}
      max={1000}
      step={50}
      marks={{ 0: "0", 500: "500", 1000: "1000" }}
    />
  </div>
);

/* ── Without tooltip ────────────────────────────────────── */
export const WithoutTooltip: Story = () => (
  <div className="max-w-sm">
    <Slider label="Без подсказки" defaultValue={40} showTooltip={false} />
  </div>
);

/* ── Disabled ───────────────────────────────────────────── */
export const Disabled: Story = () => (
  <div className="flex max-w-sm flex-col gap-4">
    <Slider label="Отключено" defaultValue={30} disabled />
    <Slider label="Отключено (диапазон)" range defaultValue={[20, 60]} disabled />
  </div>
);

/* ── onChangeEnd ────────────────────────────────────────── */
export const OnChangeEnd: Story = () => {
  const [committed, setCommitted] = useState(50);
  return (
    <div className="flex max-w-sm flex-col gap-4">
      <Slider
        label="Отправка значения только по отпусканию"
        defaultValue={50}
        onChangeEnd={(v) => setCommitted(v as number)}
      />
      <Text size="xs" variant="muted">
        Зафиксировано: <Badge variant="orange">{committed}</Badge>
      </Text>
    </div>
  );
};
