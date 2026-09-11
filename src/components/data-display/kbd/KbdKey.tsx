import type React from "react";
import { cn } from "../../../lib/cn";
import { useKbdContext } from "./context";

export type KbdKeyProps = {
  /** переопределяет размер для конкретной клавиши */
  size?: "sm" | "md";
  className?: string;
  children: React.ReactNode;
};

/** Одна клавиша в стиле физической кнопки. */
export function KbdKey({ size: sizeProp, className, children }: KbdKeyProps) {
  const { size: ctxSize } = useKbdContext();
  const size = sizeProp ?? ctxSize;

  return (
    <kbd
      className={cn(
        "inline-flex items-center justify-center font-mono font-medium select-none",
        "rounded-[var(--radius-sm)]",
        "bg-[var(--surface-2)]",
        "text-[var(--text-muted)]",
        "border border-[var(--border)] border-b-2",
        "shadow-[inset_0_-1px_0_var(--border)]",
        size === "sm"
          ? "text-[10px] px-1.5 py-px min-w-[18px] h-[18px]"
          : "text-xs px-2 py-0.5 min-w-[24px] h-[22px]",
        className
      )}
    >
      {children}
    </kbd>
  );
}
