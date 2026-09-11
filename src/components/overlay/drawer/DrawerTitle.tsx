import type React from "react";
import { cn } from "../../../lib/cn";

export type DrawerTitleProps = {
  className?: string;
  children: React.ReactNode;
};

/** Заголовок внутри DrawerHeader */
export function DrawerTitle({ className, children }: DrawerTitleProps) {
  return (
    <h2 className={cn("text-base font-semibold text-[var(--text)] truncate", className)}>
      {children}
    </h2>
  );
}
