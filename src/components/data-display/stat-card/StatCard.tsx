import { TrendingDown, TrendingUp } from "lucide-react";
import type React from "react";
import { cn } from "../../../lib/cn";
import { Center } from "../../layout/Center";
import { HStack } from "../../layout/HStack";
import { Card } from "../card";

export type StatCardProps = {
  /** подпись */
  label: string;
  /** главное число/текст */
  value: string | number;
  /** мелкий текст под значением */
  sub?: string;
  /** Lucide-иконка (оранжевый фон) */
  icon?: React.ElementType;
  /** `+12` → зелёный ↑, `-5` → красный ↓, `0` → серый */
  trend?: number;
  className?: string;
};

/** Карточка метрики: label + большое значение + опциональные trend и sub-текст. */
export function StatCard({ label, value, sub, icon: Icon, trend, className }: StatCardProps) {
  const hasUp = trend !== undefined && trend > 0;
  const hasDown = trend !== undefined && trend < 0;
  const hasFlat = trend !== undefined && trend === 0;

  return (
    <Card padding="none" className={cn("p-5", className)}>
      {/* Label row */}
      <HStack justify="between" align="start" className="mb-3">
        <p className="text-[13px] text-[var(--text-muted)]">{label}</p>
        {Icon && (
          <Center className="w-8 h-8 shrink-0 rounded-[var(--radius-sm)] bg-[var(--primary-dim)] text-[var(--primary)]">
            <Icon size={16} />
          </Center>
        )}
      </HStack>

      {/* Value */}
      <p className="text-[2rem] font-bold leading-none text-[var(--text)]">{value}</p>

      {/* Trend + sub */}
      {(trend !== undefined || sub) && (
        <HStack gap={2} className="mt-2">
          {trend !== undefined && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 text-xs font-semibold",
                hasUp && "text-[var(--success)]",
                hasDown && "text-[var(--error)]",
                hasFlat && "text-[var(--text-muted)]"
              )}
            >
              {hasUp && <TrendingUp size={12} />}
              {hasDown && <TrendingDown size={12} />}
              {trend > 0 ? "+" : ""}
              {trend}%
            </span>
          )}
          {sub && <p className="text-xs text-[var(--text-muted)]">{sub}</p>}
        </HStack>
      )}
    </Card>
  );
}
