import type { ReactNode } from "react";
import { cn } from "../../../lib/cn";

export type StepDescriptionProps = {
  className?: string;
  children: ReactNode;
};

/** Подзаголовок шага (muted) */
export function StepDescription({ className, children }: StepDescriptionProps) {
  return (
    <span className={cn("text-xs text-[var(--text-muted)] leading-snug", className)}>
      {children}
    </span>
  );
}
