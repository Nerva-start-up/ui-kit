import type React from "react";
import { cn } from "../../../lib/cn";

export type AlertContentProps = {
  className?: string;
  children: React.ReactNode;
};

/** Flex-колонка для AlertTitle + AlertDescription. */
export function AlertContent({ className, children }: AlertContentProps) {
  return <div className={cn("flex-1 flex flex-col gap-1 min-w-0", className)}>{children}</div>;
}
