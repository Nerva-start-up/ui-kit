import type React from "react";
import { cn } from "../../../lib/cn";

export type TopNavListProps = {
  className?: string;
  children: React.ReactNode;
};

/** Центральный <nav> со вкладками верхней навигации. */
export function TopNavList({ className, children }: TopNavListProps) {
  return (
    <nav className={cn("flex shrink-0 items-center gap-1 overflow-x-auto", className)}>
      {children}
    </nav>
  );
}
