import React from "react";
import { cn } from "../../../lib/cn";

export type TimelineMetaProps = {
  className?: string;
  children: React.ReactNode;
};

/** Строка с датой, бейджами, счётчиками */
export function TimelineMeta({ className, children }: TimelineMetaProps) {
  return (
    <div className={cn("mt-1 flex items-center gap-2 flex-wrap", className)}>
      {React.Children.map(children, (child, i) =>
        typeof child === "string" || typeof child === "number" ? (
          <span key={i} className="text-[11px] text-[var(--text-muted)]">
            {child}
          </span>
        ) : (
          child
        )
      )}
    </div>
  );
}
