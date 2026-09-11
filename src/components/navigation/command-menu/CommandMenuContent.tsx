import type React from "react";
import { cn } from "../../../lib/cn";

export type CommandMenuContentProps = {
  className?: string;
  children: React.ReactNode;
};

/** Стилизованная панель command-меню. */
export function CommandMenuContent({ className, children }: CommandMenuContentProps) {
  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden",
        "rounded-[var(--radius-xl)] border border-[var(--border)]",
        "bg-[var(--surface)] shadow-[0_24px_64px_rgba(0,0,0,0.5)]",
        className
      )}
    >
      {children}
    </div>
  );
}
