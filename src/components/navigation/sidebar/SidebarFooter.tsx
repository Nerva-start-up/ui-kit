import type React from "react";
import { cn } from "../../../lib/cn";

export type SidebarFooterProps = {
  className?: string;
  children: React.ReactNode;
};

/** Нижняя зона с border-t */
export function SidebarFooter({ className, children }: SidebarFooterProps) {
  return (
    <div className={cn("shrink-0 px-2 py-2", "border-t border-[var(--border)]", className)}>
      {children}
    </div>
  );
}
