import type React from "react";
import { cn } from "../../../lib/cn";

export type ChipGroupProps = {
  children: React.ReactNode;
  /** Горизонтальный скролл вместо wrap */
  scroll?: boolean;
  className?: string;
};

export function ChipGroup({ children, scroll = false, className }: ChipGroupProps) {
  return (
    <div className={cn("flex gap-2", scroll ? "overflow-x-auto" : "flex-wrap", className)}>
      {children}
    </div>
  );
}
