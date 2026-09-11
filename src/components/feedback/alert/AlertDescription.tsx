import type React from "react";
import { cn } from "../../../lib/cn";

export type AlertDescriptionProps = {
  className?: string;
  children: React.ReactNode;
};

/** Описание алерта. */
export function AlertDescription({ className, children }: AlertDescriptionProps) {
  return (
    <p className={cn("text-sm text-[var(--text-muted)] leading-relaxed", className)}>{children}</p>
  );
}
