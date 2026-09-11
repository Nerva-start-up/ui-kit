import type { ReactNode } from "react";
import { cn } from "../../../lib/cn";

export type FileCardMetaProps = {
  className?: string;
  children: ReactNode;
};

/** Строчка с второстепенной информацией (размер, дата, автор…) */
export function FileCardMeta({ className, children }: FileCardMetaProps) {
  return (
    <span className={cn("text-xs text-[var(--text-muted)] truncate", className)}>{children}</span>
  );
}
