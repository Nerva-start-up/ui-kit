import type React from "react";
import { cn } from "../../../lib/cn";

export type BottomNavProps = {
  className?: string;
  children: React.ReactNode;
};

/** Фиксированный (bottom-0) контейнер-<nav> мобильной нижней навигации. */
export function BottomNav({ className, children }: BottomNavProps) {
  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-30 flex",
        "bg-[var(--surface)] border-t border-[var(--border)]",
        className
      )}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {children}
    </nav>
  );
}
