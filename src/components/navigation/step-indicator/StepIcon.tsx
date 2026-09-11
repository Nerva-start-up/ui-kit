import { Check, X } from "lucide-react";
import type { ElementType } from "react";
import { cn } from "../../../lib/cn";
import { type StepSize, type StepStatus, useStepContext, useStepIndicatorContext } from "./context";

const sizeClasses: Record<StepSize, { circle: string; icon: number; text: string }> = {
  sm: { circle: "h-6 w-6", icon: 12, text: "text-[11px]" },
  md: { circle: "h-8 w-8", icon: 14, text: "text-sm" },
  lg: { circle: "h-10 w-10", icon: 16, text: "text-base" },
};

const statusClasses: Record<StepStatus, string> = {
  completed: "bg-[var(--primary)]          text-white          border-[var(--primary)]",
  active:
    "bg-[var(--surface)]           text-[var(--primary)] border-[var(--primary)] ring-4 ring-[rgba(249,115,22,0.15)]",
  upcoming: "bg-[var(--surface-2)]         text-[var(--text-muted)] border-[var(--border)]",
  error: "bg-[rgba(248,113,113,0.12)]       text-[var(--error)] border-[var(--error)]",
};

export type StepIconProps = {
  /** Кастомная иконка вместо числа/чека */
  icon?: ElementType;
  className?: string;
};

/** Иконка (число / чек / X / кастомная) */
export function StepIcon({ icon, className }: StepIconProps) {
  const { index, status } = useStepContext();
  const { size } = useStepIndicatorContext();
  const { circle, icon: iconSize, text } = sizeClasses[size];
  const Icon = icon;

  const content = (() => {
    if (Icon) return <Icon size={iconSize} />;
    if (status === "completed") return <Check size={iconSize} strokeWidth={2.5} />;
    if (status === "error") return <X size={iconSize} strokeWidth={2.5} />;
    return <span className={cn("font-semibold leading-none", text)}>{index + 1}</span>;
  })();

  return (
    <div
      className={cn(
        "shrink-0 flex items-center justify-center rounded-full border-2 transition-all duration-200",
        circle,
        statusClasses[status],
        className
      )}
    >
      {content}
    </div>
  );
}
