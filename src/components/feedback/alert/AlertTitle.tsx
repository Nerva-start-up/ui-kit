import type React from "react";
import { cn } from "../../../lib/cn";

export type AlertTitleProps = {
  className?: string;
  children: React.ReactNode;
};

/** Заголовок алерта. */
export function AlertTitle({ className, children }: AlertTitleProps) {
  return (
    <p className={cn("text-sm font-semibold leading-snug text-[var(--text)]", className)}>
      {children}
    </p>
  );
}
