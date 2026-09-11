import type React from "react";
import { cn } from "../../../lib/cn";

export type SearchContentProps = {
  className?: string;
  children: React.ReactNode;
};

/** Панель (border + shadow). */
export function SearchContent({ className, children }: SearchContentProps) {
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: onClick only stops click bubbling to the backdrop, div is not an interactive control
    <div
      onClick={(e) => e.stopPropagation()}
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
