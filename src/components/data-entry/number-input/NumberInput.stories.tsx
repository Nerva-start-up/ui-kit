import type { Story } from "@ladle/react";
import { useState } from "react";
import { Badge } from "../../data-display/badge/Badge";
import { Text } from "../../typography/Text";
import { NumberInput } from "./NumberInput";

export default { title: "Components / Data Entry / NumberInput" };

/* ── Default ────────────────────────────────────────────── */
export const Default: Story = () => {
  const [value, setValue] = useState(5);
  return (
    <div className="flex flex-col gap-6 p-6 max-w-xs">
      <NumberInput label="Количество" value={value} onChange={setValue} />
      <Text size="xs" variant="muted">
        Значение: <Badge variant="orange">{value}</Badge>
      </Text>
    </div>
  );
};

/* ── Default with range ─────────────────────────────────── */
export const DefaultWithRange: Story = () => {
  const [score, setScore] = useState(50);
  const [attempts, setAttempts] = useState(3);

  return (
    <div className="flex flex-col gap-6 p-6 max-w-xs">
      <NumberInput
        label="Баллы за задание"
        value={score}
        onChange={setScore}
        min={0}
        max={100}
        step={5}
        hint="От 0 до 100 · шаг 5"
      />
      <NumberInput
        label="Попытки"
        value={attempts}
        onChange={setAttempts}
        min={1}
        max={10}
        hint="От 1 до 10"
      />
    </div>
  );
};

/* ── Line variant ───────────────────────────────────────── */
export const Line: Story = () => {
  const [value, setValue] = useState(40);
  return (
    <div className="flex flex-col gap-6 p-6 max-w-xs">
      <NumberInput
        variant="line"
        label="Академика, %"
        value={value}
        onChange={setValue}
        min={0}
        max={100}
        step={5}
        hint="Вес в формуле KSI Score"
      />
      <Text size="xs" variant="muted">
        Значение: <Badge variant="orange">{value}%</Badge>
      </Text>
    </div>
  );
};

/* ── Line — KSI Score weights ───────────────────────────── */
export const LineWeights: Story = () => {
  const [weights, setWeights] = useState({
    academic: 40,
    activity: 25,
    contribution: 20,
    interaction: 15,
  });

  const total = Object.values(weights).reduce((a, b) => a + b, 0);
  const set = (key: keyof typeof weights) => (v: number) =>
    setWeights((prev) => ({ ...prev, [key]: v }));

  return (
    <div className="flex flex-col gap-6 p-6 max-w-xs">
      <Text size="xs" weight="medium" variant="muted" className="uppercase tracking-wide">
        Веса KSI Score
      </Text>
      <NumberInput
        variant="line"
        label="Академика"
        value={weights.academic}
        onChange={set("academic")}
        min={0}
        max={100}
        step={5}
      />
      <NumberInput
        variant="line"
        label="Активность"
        value={weights.activity}
        onChange={set("activity")}
        min={0}
        max={100}
        step={5}
      />
      <NumberInput
        variant="line"
        label="Вклад"
        value={weights.contribution}
        onChange={set("contribution")}
        min={0}
        max={100}
        step={5}
      />
      <NumberInput
        variant="line"
        label="Взаимодействие"
        value={weights.interaction}
        onChange={set("interaction")}
        min={0}
        max={100}
        step={5}
      />
      <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
        <Text as="span" size="xs" variant="muted">
          Итого
        </Text>
        <Badge variant={total === 100 ? "success" : "error"}>{total}%</Badge>
      </div>
    </div>
  );
};

/* ── Error state ────────────────────────────────────────── */
export const ErrorState: Story = () => {
  const [value, setValue] = useState(0);
  return (
    <div className="flex flex-col gap-6 p-6 max-w-xs">
      <NumberInput
        label="Минимальный балл"
        value={value}
        onChange={setValue}
        min={0}
        max={100}
        error={value < 10 ? "Минимальный балл должен быть не менее 10" : undefined}
      />
      <NumberInput
        variant="line"
        label="Порог явки, %"
        value={value}
        onChange={setValue}
        min={0}
        max={100}
        error={value < 10 ? "Укажите значение от 10 до 100" : undefined}
      />
    </div>
  );
};

/* ── Disabled ───────────────────────────────────────────── */
export const Disabled: Story = () => (
  <div className="flex flex-col gap-6 p-6 max-w-xs">
    <NumberInput label="Баллы (заблокировано)" defaultValue={75} min={0} max={100} disabled />
    <NumberInput
      variant="line"
      label="Порог, % (заблокировано)"
      defaultValue={60}
      min={0}
      max={100}
      disabled
    />
  </div>
);

/* ── Uncontrolled ───────────────────────────────────────── */
export const Uncontrolled: Story = () => (
  <div className="flex flex-col gap-6 p-6 max-w-xs">
    <NumberInput
      label="Количество попыток"
      defaultValue={3}
      min={1}
      max={10}
      hint="Управляется внутри компонента"
    />
    <NumberInput
      variant="line"
      label="Дедлайн (дней)"
      defaultValue={7}
      min={1}
      max={30}
      hint="Управляется внутри компонента"
    />
  </div>
);
