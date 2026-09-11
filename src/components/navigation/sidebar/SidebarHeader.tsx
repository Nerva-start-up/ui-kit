import type React from "react";
import { cn } from "../../../lib/cn";
import { useSidebarContext } from "./context";

export type SidebarHeaderProps = {
  className?: string;
  children: React.ReactNode;
};

/** Верхняя зона высотой 56px. Context-aware: при collapse переключается в justify-center px-2 */
export function SidebarHeader({ className, children }: SidebarHeaderProps) {
  const { collapsed } = useSidebarContext();

  return (
    <div
      className={cn(
        "flex items-center h-14 shrink-0 overflow-hidden",
        "border-b border-[var(--border)]",
        collapsed ? "justify-center px-2" : "px-4",
        className
      )}
    >
      {children}
    </div>
  );
}
