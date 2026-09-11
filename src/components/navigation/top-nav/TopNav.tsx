import type React from "react";
import { cn } from "../../../lib/cn";

export type TopNavProps = {
  className?: string;
  children: React.ReactNode;
};

/** Sticky (top-0) контейнер-<header> верхней навигационной панели. */
export function TopNav({ className, children }: TopNavProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-14 items-center gap-6",
        "bg-[var(--surface)] border-b border-[var(--border)] px-4",
        className
      )}
    >
      {children}
    </header>
  );
}
