import type React from "react";
import { cn } from "../../../lib/cn";

export type DrawerFooterProps = {
  className?: string;
  children: React.ReactNode;
};

/** Прилипающий подвал drawer'а */
export function DrawerFooter({ className, children }: DrawerFooterProps) {
  return (
    <div className={cn("flex-shrink-0 border-t border-[var(--border)] px-5 py-4", className)}>
      {children}
    </div>
  );
}
