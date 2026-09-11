import type React from "react";
import { cn } from "../../../lib/cn";
import { TimelineItemContext, type TimelineVariant } from "./context";

export type TimelineItemProps = {
  variant?: TimelineVariant;
  className?: string;
  children: React.ReactNode;
};

/** Одно событие, задаёт variant через контекст */
export function TimelineItem({ variant = "default", className, children }: TimelineItemProps) {
  return (
    <TimelineItemContext.Provider value={{ variant }}>
      {/* group — нужен для group-last:hidden на коннекторе внутри TimelineIcon */}
      <div className={cn("group flex gap-3", className)}>{children}</div>
    </TimelineItemContext.Provider>
  );
}
