import type React from "react";
import { cn } from "../../../lib/cn";

export type TimelineContentProps = {
  className?: string;
  children: React.ReactNode;
};

/** Правая колонка (title + description + meta) */
export function TimelineContent({ className, children }: TimelineContentProps) {
  return (
    <div className={cn("flex-1 min-w-0 pb-6 flex flex-col gap-0.5", className)}>{children}</div>
  );
}
