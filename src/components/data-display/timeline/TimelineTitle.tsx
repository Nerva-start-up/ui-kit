import type React from "react";
import { cn } from "../../../lib/cn";

export type TimelineTitleProps = {
  className?: string;
  children: React.ReactNode;
};

/** Заголовок события */
export function TimelineTitle({ className, children }: TimelineTitleProps) {
  return (
    <p className={cn("text-sm font-medium text-[var(--text)] leading-snug", className)}>
      {children}
    </p>
  );
}
