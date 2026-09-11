import { Check, Copy } from "lucide-react";
import { cn } from "../../../lib/cn";
import { useCopyTextContext } from "./context";

export type CopyTextTriggerProps = { className?: string };

/** Иконка Copy → Check, абсолютно позиционирована справа по центру. */
export function CopyTextTrigger({ className }: CopyTextTriggerProps) {
  const { copied } = useCopyTextContext();

  return (
    <span
      aria-hidden
      className={cn(
        "absolute right-2 top-1/2 -translate-y-1/2 z-10",
        "flex items-center justify-center p-1 rounded-[var(--radius-sm)]",
        "transition-colors pointer-events-none",
        copied ? "text-[var(--primary)]" : "text-[var(--text-muted)]",
        className
      )}
    >
      {copied ? <Check size={14} strokeWidth={2.5} /> : <Copy size={14} />}
    </span>
  );
}
