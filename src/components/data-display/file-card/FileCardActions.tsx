import type { ReactNode } from "react";
import { cn } from "../../../lib/cn";

export type FileCardActionsProps = {
  className?: string;
  children: ReactNode;
};

/** Слот для кнопок действий (download, delete, preview…) */
export function FileCardActions({ className, children }: FileCardActionsProps) {
  return (
    <div
      className={cn("shrink-0 flex items-center gap-1", className)}
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
}
