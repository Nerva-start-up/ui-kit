import { Check, Copy } from "lucide-react";
import { cn } from "../../../lib/cn";
import { useCodeBlockContext } from "./context";

export type CodeBlockCopyButtonProps = { className?: string };

/** Standalone кнопка копирования, используется внутри CodeBlockHeader. */
export function CodeBlockCopyButton({ className }: CodeBlockCopyButtonProps) {
  const { copied, onCopy } = useCodeBlockContext();

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={copied ? "Скопировано" : "Скопировать"}
      className={cn(
        "flex items-center gap-1.5 px-2 py-1 rounded-[var(--radius-sm)]",
        "text-xs text-[var(--text-muted)] transition-colors",
        "hover:text-[var(--text)] hover:bg-[var(--surface-2)]",
        className
      )}
    >
      {copied ? (
        <>
          <Check size={13} className="text-[var(--success)]" />
          <span className="text-[var(--success)]">Скопировано</span>
        </>
      ) : (
        <>
          <Copy size={13} />
          <span>Копировать</span>
        </>
      )}
    </button>
  );
}
