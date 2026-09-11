import type React from "react";
import { cn } from "../../../lib/cn";

export type DrawerBodyProps = {
  className?: string;
  children: React.ReactNode;
};

/** Скроллируемое тело drawer'а (overscroll-contain) */
export function DrawerBody({ className, children }: DrawerBodyProps) {
  return (
    <div className={cn("flex-1 overflow-y-auto overscroll-contain px-5 py-4", className)}>
      {children}
    </div>
  );
}
