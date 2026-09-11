import type { ReactNode } from "react";
import { cn } from "../../../lib/cn";

export type StepContentProps = {
  className?: string;
  children: ReactNode;
};

/** Обёртка текста (flex-col) */
export function StepContent({ className, children }: StepContentProps) {
  return <div className={cn("flex flex-col gap-0.5 min-w-0", className)}>{children}</div>;
}
