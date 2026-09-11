import * as ProgressPrimitive from "@radix-ui/react-progress";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import type React from "react";
import { cn } from "../../../lib/cn";
import { HStack } from "../../layout/HStack";
import { Stack } from "../../layout/Stack";
import type { ProgressColor, ProgressStatus } from "./types";
import { clampProgress } from "./utils";

const colorClasses: Record<ProgressColor, string> = {
  primary: "bg-[var(--primary)]",
  success: "bg-[var(--success)]",
  info: "bg-[var(--info)]",
};

const sizeClasses = {
  sm: "h-1.5",
  md: "h-2",
  lg: "h-3",
};

export type ProgressProps = {
  /** 0–100 */
  value: number;
  /** текст слева */
  label?: string;
  /** процент справа */
  showValue?: boolean;
  /** Цвет заливки (перекрывается `status="success"/"error"`) */
  color?: ProgressColor;
  /** `active` — бегущая полоса поверх заливки; `success`/`error` — цвет и иконка вместо процента */
  status?: ProgressStatus;
  /** Высота полосы */
  size?: keyof typeof sizeClasses;
  /** Кастомный рендер значения справа, по умолчанию `${value}%` */
  format?: (value: number) => React.ReactNode;
  className?: string;
};

/** Линейный прогресс-бар. */
export function Progress({
  value,
  label,
  showValue = false,
  color = "primary",
  status = "normal",
  size = "md",
  format,
  className,
}: ProgressProps) {
  const clamped = clampProgress(value);

  const barColor =
    status === "error"
      ? "bg-[var(--error)]"
      : status === "success"
        ? "bg-[var(--success)]"
        : colorClasses[color];

  const valueNode =
    status === "error" ? (
      <AlertCircle size={14} className="text-[var(--error)]" />
    ) : status === "success" ? (
      <CheckCircle2 size={14} className="text-[var(--success)]" />
    ) : (
      <span className="text-xs font-medium text-[var(--text)]">
        {format ? format(clamped) : `${clamped}%`}
      </span>
    );

  return (
    <Stack gap={1.5} className={className}>
      {(label || showValue) && (
        <HStack justify="between">
          {label && <span className="text-xs text-[var(--text-muted)]">{label}</span>}
          {showValue && valueNode}
        </HStack>
      )}
      <ProgressPrimitive.Root
        value={clamped}
        className={cn(
          "relative w-full overflow-hidden rounded-full bg-[var(--surface-2)]",
          sizeClasses[size]
        )}
      >
        <ProgressPrimitive.Indicator
          className={cn(
            "relative h-full overflow-hidden rounded-full transition-all duration-500 ease-out",
            barColor
          )}
          style={{ transform: `translateX(-${100 - clamped}%)` }}
        >
          {status === "active" && (
            <motion.div
              className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "300%" }}
              transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
          )}
        </ProgressPrimitive.Indicator>
      </ProgressPrimitive.Root>
    </Stack>
  );
}
