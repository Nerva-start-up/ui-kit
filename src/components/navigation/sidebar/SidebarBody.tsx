import type React from "react";
import { cn } from "../../../lib/cn";

export type SidebarBodyProps = {
  className?: string;
  children: React.ReactNode;
};

/** Прокручиваемая средняя зона (flex-1 overflow-y-auto) */
export function SidebarBody({ className, children }: SidebarBodyProps) {
  return (
    <div className={cn("flex-1 overflow-y-auto overflow-x-hidden px-2 py-2", className)}>
      {children}
    </div>
  );
}
