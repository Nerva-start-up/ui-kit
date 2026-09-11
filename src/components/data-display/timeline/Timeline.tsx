import type React from "react";
import { cn } from "../../../lib/cn";

export type TimelineProps = {
  className?: string;
  children: React.ReactNode;
};

/** Root — flex-col контейнер ленты событий */
export function Timeline({ className, children }: TimelineProps) {
  return <div className={cn("flex flex-col", className)}>{children}</div>;
}
