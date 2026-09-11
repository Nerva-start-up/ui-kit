import type React from "react";
import { cn } from "../../../lib/cn";

export type TopNavActionsProps = {
  className?: string;
  children: React.ReactNode;
};

/** Правый слот верхней навигации (кнопки, аватар и т.д.). */
export function TopNavActions({ className, children }: TopNavActionsProps) {
  return (
    <div className={cn("flex flex-1 items-center justify-end gap-2", className)}>{children}</div>
  );
}
