import { cn } from "../../../lib/cn";
import { useCopyTextContext } from "./context";

export type CopyTextValueProps = {
  /** обрезать с … */
  truncate?: boolean;
  /** заменить на •••• (токены, пароли) */
  mask?: boolean;
  className?: string;
};

/** Текст (моно, truncate / mask). */
export function CopyTextValue({ truncate, mask, className }: CopyTextValueProps) {
  const { text } = useCopyTextContext();

  const display = mask ? "•".repeat(Math.min(text.length, 24)) : text;

  return (
    <span
      className={cn(
        "font-mono text-sm text-[var(--text)] flex-1 min-w-0 pr-7",
        truncate && "truncate",
        className
      )}
      title={mask ? undefined : text}
    >
      {display}
    </span>
  );
}
