import type React from "react";
import { cn } from "../../../lib/cn";
import { Stack } from "../../layout/Stack";
import { type TimelineVariant, useTimelineItemContext } from "./context";

const dotColors: Record<TimelineVariant, string> = {
  default: "bg-[var(--border)]        ring-[var(--surface)]",
  success: "bg-[var(--success)]       ring-[var(--surface)]",
  error: "bg-[var(--error)]         ring-[var(--surface)]",
  warning: "bg-[#fbbf24]                  ring-[var(--surface)]",
  info: "bg-[var(--info)]          ring-[var(--surface)]",
  primary: "bg-[var(--primary)]       ring-[var(--surface)]",
};

const iconColors: Record<TimelineVariant, string> = {
  default: "bg-[var(--surface-2)] text-[var(--text-muted)]",
  success: "bg-[rgba(74,222,128,0.12)]  text-[var(--success)]",
  error: "bg-[rgba(248,113,113,0.12)] text-[var(--error)]",
  warning: "bg-[rgba(251,191,36,0.12)]  text-[#fbbf24]",
  info: "bg-[rgba(96,165,250,0.12)]  text-[var(--info)]",
  primary: "bg-[rgba(249,115,22,0.12)]  text-[var(--primary)]",
};

export type TimelineIconProps = {
  /** Lucide-иконка. Если не передана — рендерится цветная точка */
  icon?: React.ElementType;
  /** URL аватара — приоритет над icon */
  avatar?: string;
  className?: string;
};

/** Точка / иконка / аватар + коннектор вниз */
export function TimelineIcon({ icon, avatar, className }: TimelineIconProps) {
  const { variant } = useTimelineItemContext();
  const Icon = icon;

  return (
    <Stack align="center" gap={0} className={cn("shrink-0", className)}>
      {/* Индикатор */}
      {avatar ? (
        <img
          src={avatar}
          alt=""
          className="h-8 w-8 rounded-full object-cover border border-[var(--border)]"
        />
      ) : Icon ? (
        <span
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)]",
            iconColors[variant]
          )}
        >
          <Icon size={15} />
        </span>
      ) : (
        <span className={cn("h-2.5 w-2.5 rounded-full ring-2 mt-1.5", dotColors[variant])} />
      )}

      {/* Коннектор — скрыт у последнего TimelineItem */}
      <div className="mt-2 flex-1 w-px min-h-[1rem] bg-[var(--border)] group-last:hidden" />
    </Stack>
  );
}
