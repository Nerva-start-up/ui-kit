import type { ReactNode } from "react";
import { cn } from "../../../lib/cn";
import { useStepContext } from "./context";

export type StepLabelProps = {
  className?: string;
  children: ReactNode;
};

/** Название шага. Меняет цвет по статусу. */
export function StepLabel({ className, children }: StepLabelProps) {
  const { status } = useStepContext();

  return (
    <span
      className={cn(
        "text-sm font-medium leading-snug transition-colors truncate",
        status === "active" && "text-[var(--text)]",
        status === "completed" && "text-[var(--text)]",
        status === "upcoming" && "text-[var(--text-muted)]",
        status === "error" && "text-[var(--error)]",
        className
      )}
    >
      {children}
    </span>
  );
}
