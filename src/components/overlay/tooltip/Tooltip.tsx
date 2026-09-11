import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import type React from "react";
import { cn } from "../../../lib/cn";

export type TooltipProps = {
  /** текст тултипа */
  content: React.ReactNode;
  /** trigger-элемент */
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
};

export function TooltipProvider({ children }: { children: React.ReactNode }) {
  return <TooltipPrimitive.Provider delayDuration={300}>{children}</TooltipPrimitive.Provider>;
}

/** Всплывающая подсказка. Требует `TooltipProvider` в корне. */
export function Tooltip({ content, children, side = "top", className }: TooltipProps) {
  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side={side}
          sideOffset={6}
          className={cn(
            "bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-sm)]",
            "px-2.5 py-1.5 text-xs text-[var(--text)] shadow-xl z-50",
            "animate-in fade-in-0 zoom-in-95",
            "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
            "data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2",
            className
          )}
        >
          {content}
          <TooltipPrimitive.Arrow className="fill-[var(--border)]" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}
