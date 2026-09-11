import { X } from "lucide-react";
import { cn } from "../../../lib/cn";
import { useAlertContext } from "./context";

export type AlertDismissProps = { className?: string };

/** Кнопка ×, рендерится только если передан onDismiss. */
export function AlertDismiss({ className }: AlertDismissProps) {
  const { onDismiss } = useAlertContext();

  if (!onDismiss) return null;

  return (
    <button
      type="button"
      onClick={onDismiss}
      aria-label="Закрыть"
      className={cn(
        "ml-auto shrink-0 -mt-0.5 -mr-0.5 p-1 rounded-[var(--radius-sm)]",
        "text-[var(--text-muted)] hover:text-[var(--text)]",
        "hover:bg-[rgba(255,255,255,0.06)] transition-colors",
        className
      )}
    >
      <X size={15} />
    </button>
  );
}
