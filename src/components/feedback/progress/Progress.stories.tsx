import type { Story } from "@ladle/react";
import { Progress } from "./Progress";
import { ProgressCircle } from "./ProgressCircle";

export default { title: "Components / Feedback / Progress" };

export const Default: Story = () => (
  <div className="max-w-sm">
    <Progress value={65} />
  </div>
);

export const WithLabel: Story = () => (
  <div className="flex flex-col gap-4 max-w-sm">
    <Progress value={40} label="KSI Score" showValue />
    <Progress value={78} label="Посещаемость" showValue />
    <Progress value={90} label="Академический" showValue />
  </div>
);

export const Colors: Story = () => (
  <div className="flex flex-col gap-4 max-w-sm">
    <Progress value={70} color="primary" label="primary" showValue />
    <Progress value={85} color="success" label="success" showValue />
    <Progress value={55} color="info" label="info" showValue />
  </div>
);

/* ── Статусы: active/success/error ─────────────────────── */
export const Status: Story = () => (
  <div className="flex flex-col gap-4 max-w-sm">
    <Progress value={45} status="active" label="Загрузка файла..." showValue />
    <Progress value={100} status="success" label="Задание сдано" showValue />
    <Progress value={32} status="error" label="Ошибка синхронизации" showValue />
  </div>
);

/* ── Размеры ─────────────────────────────────────────────── */
export const Sizes: Story = () => (
  <div className="flex flex-col gap-4 max-w-sm">
    <Progress value={60} size="sm" label="sm" showValue />
    <Progress value={60} size="md" label="md" showValue />
    <Progress value={60} size="lg" label="lg" showValue />
  </div>
);

/* ── Кастомный формат значения ──────────────────────────── */
export const CustomFormat: Story = () => (
  <div className="flex flex-col gap-4 max-w-sm">
    <Progress value={70} label="Уроки" showValue format={() => "7 / 10"} />
  </div>
);

export const EdgeValues: Story = () => (
  <div className="flex flex-col gap-4 max-w-sm">
    <Progress value={0} label="0%" showValue />
    <Progress value={50} label="50%" showValue />
    <Progress value={100} label="100%" showValue color="success" />
  </div>
);

/* ── Круговой вариант ────────────────────────────────────── */
export const Circle: Story = () => (
  <div className="flex flex-wrap items-end gap-8">
    <ProgressCircle value={72} />
    <ProgressCircle value={45} color="info" size={72} strokeWidth={6} />
    <ProgressCircle value={60} status="active" />
    <ProgressCircle value={100} status="success" />
    <ProgressCircle value={30} status="error" />
    <ProgressCircle value={54} size={64} strokeWidth={5} format={() => "54"} />
  </div>
);

export const Interactive: Story<{
  value: number;
  label: string;
  showValue: boolean;
  color: "primary" | "success" | "info";
  status: "normal" | "active" | "success" | "error";
  size: "sm" | "md" | "lg";
}> = ({ value, label, showValue, color, status, size }) => (
  <div className="max-w-sm">
    <Progress
      value={value}
      label={label || undefined}
      showValue={showValue}
      color={color}
      status={status}
      size={size}
    />
  </div>
);
Interactive.args = {
  value: 65,
  label: "Прогресс",
  showValue: true,
  color: "primary",
  status: "normal",
  size: "md",
};
Interactive.argTypes = {
  value: { control: { type: "number", min: 0, max: 100, step: 5 } },
  color: { options: ["primary", "success", "info"], control: { type: "select" } },
  status: { options: ["normal", "active", "success", "error"], control: { type: "select" } },
  size: { options: ["sm", "md", "lg"], control: { type: "select" } },
};
