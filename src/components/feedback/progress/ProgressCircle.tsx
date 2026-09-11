import { AlertCircle, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import type React from "react";
import { cn } from "../../../lib/cn";
import { Center } from "../../layout/Center";
import type { ProgressColor, ProgressStatus } from "./types";
import { clampProgress, getCircleCircumference } from "./utils";

const strokeColorVar: Record<ProgressColor, string> = {
  primary: "var(--primary)",
  success: "var(--success)",
  info: "var(--info)",
};

export type ProgressCircleProps = {
  /** 0–100 */
  value: number;
  /** Диаметр круга, px */
  size?: number;
  /** Толщина обводки, px */
  strokeWidth?: number;
  /** Цвет обводки (перекрывается `status="success"/"error"`) */
  color?: ProgressColor;
  /** `active` — яркий сегмент, бегущий по кольцу; `success`/`error` — цвет обводки и иконка вместо значения */
  status?: ProgressStatus;
  /** Показывать значение/иконку в центре */
  showValue?: boolean;
  /** Кастомный рендер значения в центре, по умолчанию `${value}%` */
  format?: (value: number) => React.ReactNode;
  className?: string;
};

/** Круговой прогресс-индикатор (SVG). */
export function ProgressCircle({
  value,
  size = 96,
  strokeWidth = 8,
  color = "primary",
  status = "normal",
  showValue = true,
  format,
  className,
}: ProgressCircleProps) {
  const clamped = clampProgress(value);
  const radius = (size - strokeWidth) / 2;
  const circumference = getCircleCircumference(radius);
  const offset = circumference - (clamped / 100) * circumference;

  const stroke =
    status === "error"
      ? "var(--error)"
      : status === "success"
        ? "var(--success)"
        : strokeColorVar[color];

  return (
    <Center
      role="progressbar"
      tabIndex={-1}
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      inline
      className={cn("relative shrink-0", className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} aria-hidden="true" className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--surface-2)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-500 ease-out"
        />
        {status === "active" && (
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="white"
            strokeOpacity={0.7}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${circumference * 0.12} ${circumference}`}
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: -circumference }}
            transition={{ duration: 1.6, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        )}
      </svg>

      {showValue && (
        <Center className="absolute inset-0">
          {status === "error" ? (
            <AlertCircle size={size * 0.28} className="text-[var(--error)]" />
          ) : status === "success" ? (
            <CheckCircle2 size={size * 0.28} className="text-[var(--success)]" />
          ) : (
            <span
              className="font-semibold text-[var(--text)]"
              style={{ fontSize: Math.max(11, size * 0.16) }}
            >
              {format ? format(clamped) : `${clamped}%`}
            </span>
          )}
        </Center>
      )}
    </Center>
  );
}
