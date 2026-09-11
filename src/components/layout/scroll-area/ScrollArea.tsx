import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import type React from "react";
import { cn } from "../../../lib/cn";

export type ScrollAreaProps = {
  children: React.ReactNode;
  /** CSS max-height */
  maxHeight?: string;
  className?: string;
};

/** Кастомизированная scrollable-область (Radix ScrollArea). */
export function ScrollArea({ children, maxHeight, className }: ScrollAreaProps) {
  return (
    <ScrollAreaPrimitive.Root
      className={cn("overflow-hidden", className)}
      style={maxHeight ? { maxHeight } : undefined}
    >
      <ScrollAreaPrimitive.Viewport className="w-full h-full">
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollAreaPrimitive.Scrollbar
        orientation="vertical"
        className="flex select-none touch-none p-0.5 transition-colors duration-150 data-[orientation=vertical]:w-2"
      >
        <ScrollAreaPrimitive.Thumb className="flex-1 bg-[var(--border)] rounded-full relative" />
      </ScrollAreaPrimitive.Scrollbar>
    </ScrollAreaPrimitive.Root>
  );
}
