import type { Story } from "@ladle/react";
import { Text } from "../../typography/Text";
import { Card } from "../card/Card";
import { Sparkline } from "./Sparkline";

export default { title: "Components / Data Display / Sparkline" };

const KSI_SCORE = [1180, 1210, 1195, 1240, 1280, 1265, 1310, 1350, 1330, 1420];
const ATTENDANCE_DOWN = [98, 96, 94, 91, 90, 88, 85, 87, 84, 82];
const FLAT = [50, 51, 49, 50, 50, 51, 50, 49, 50, 50];

/* ── Default ────────────────────────────────────────────── */
export const Default: Story = () => <Sparkline data={KSI_SCORE} />;

/* ── With fill ──────────────────────────────────────────── */
export const WithFill: Story = () => <Sparkline data={KSI_SCORE} fill />;

/* ── Custom colors (направление тренда) ─────────────────── */
export const TrendColors: Story = () => (
  <div className="flex flex-col gap-4">
    <div className="flex items-center gap-3">
      <Sparkline data={KSI_SCORE} color="var(--success)" endpointColor="var(--success)" />
      <Text as="span" size="xs" variant="muted">
        Рост
      </Text>
    </div>
    <div className="flex items-center gap-3">
      <Sparkline data={ATTENDANCE_DOWN} color="var(--error)" endpointColor="var(--error)" />
      <Text as="span" size="xs" variant="muted">
        Падение
      </Text>
    </div>
    <div className="flex items-center gap-3">
      <Sparkline data={FLAT} />
      <Text as="span" size="xs" variant="muted">
        Без изменений
      </Text>
    </div>
  </div>
);

/* ── Sizes ──────────────────────────────────────────────── */
export const Sizes: Story = () => (
  <div className="flex items-center gap-4">
    <Sparkline data={KSI_SCORE} width={60} height={20} />
    <Sparkline data={KSI_SCORE} width={120} height={32} />
    <Sparkline data={KSI_SCORE} width={200} height={48} />
  </div>
);

/* ── В карточке метрики (stat-tile) ──────────────────────── */
function StatTile({
  label,
  value,
  trend,
  data,
  color,
}: {
  label: string;
  value: string;
  trend: string;
  data: number[];
  color: string;
}) {
  return (
    <Card className="flex flex-col gap-3">
      <Text as="span" variant="muted" className="text-[13px]">
        {label}
      </Text>
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-1">
          <Text as="span" weight="bold" className="text-[2rem] leading-none">
            {value}
          </Text>
          <Text as="span" size="xs" weight="semibold" style={{ color }}>
            {trend}
          </Text>
        </div>
        <Sparkline data={data} width={80} height={28} fill />
      </div>
    </Card>
  );
}

export const InStatTile: Story = () => (
  <div className="grid max-w-lg grid-cols-2 gap-4">
    <StatTile
      label="KSI Score"
      value="1 420"
      trend="+12% за месяц"
      data={KSI_SCORE}
      color="var(--success)"
    />
    <StatTile
      label="Посещаемость"
      value="82%"
      trend="−16% за месяц"
      data={ATTENDANCE_DOWN}
      color="var(--error)"
    />
  </div>
);

/* ── Without endpoint ───────────────────────────────────── */
export const WithoutEndpoint: Story = () => <Sparkline data={KSI_SCORE} showEndpoint={false} />;
