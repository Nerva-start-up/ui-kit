import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { cn } from "../../../lib/cn";
import { useFileCardContext } from "./context";
import type { FileStatus } from "./types";

const STATUS_CONFIG: Record<FileStatus, { label: string; icon: typeof CheckCircle2; cls: string }> =
  {
    approved: {
      label: "Одобрено",
      icon: CheckCircle2,
      cls: "text-[var(--success)] bg-[rgba(74,222,128,0.12)]",
    },
    rejected: {
      label: "Отклонено",
      icon: XCircle,
      cls: "text-[var(--error)] bg-[rgba(248,113,113,0.12)]",
    },
    pending: {
      label: "На проверке",
      icon: Clock,
      cls: "text-[#fbbf24] bg-[rgba(251,191,36,0.10)]",
    },
  };

export type FileCardStatusProps = {
  /** Если не передан — берётся из контекста FileCard */
  status?: FileStatus;
  /** Показывать только иконку без текста */
  iconOnly?: boolean;
  className?: string;
};

/** Бейдж статуса. `iconOnly` — только иконка. */
export function FileCardStatus({
  status: statusProp,
  iconOnly = false,
  className,
}: FileCardStatusProps) {
  const ctx = useFileCardContext();
  const status = statusProp ?? ctx.status;
  const { label, icon: Icon, cls } = STATUS_CONFIG[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 shrink-0",
        "px-1.5 py-0.5 rounded-[var(--radius-sm)] text-xs font-medium",
        cls,
        className
      )}
      title={iconOnly ? label : undefined}
    >
      <Icon size={11} strokeWidth={2.5} />
      {!iconOnly && label}
    </span>
  );
}
