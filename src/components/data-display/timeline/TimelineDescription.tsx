import type React from "react";
import { cn } from "../../../lib/cn";

export type TimelineDescriptionProps = {
  className?: string;
  children: React.ReactNode;
};

/** Подзаголовок / детали */
export function TimelineDescription({ className, children }: TimelineDescriptionProps) {
  return (
    <p className={cn("text-xs text-[var(--text-muted)] leading-relaxed", className)}>{children}</p>
  );
}
