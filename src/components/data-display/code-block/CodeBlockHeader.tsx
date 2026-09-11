import { cn } from "../../../lib/cn";
import { HStack } from "../../layout/HStack";
import { CodeBlockCopyButton } from "./CodeBlockCopyButton";
import { useCodeBlockContext } from "./context";

export type CodeBlockHeaderProps = {
  /** имя файла рядом с языком */
  title?: string;
  className?: string;
};

/** Шапка: язык + имя файла + кнопка копирования. */
export function CodeBlockHeader({ title, className }: CodeBlockHeaderProps) {
  const { lang } = useCodeBlockContext();

  return (
    <HStack
      justify="between"
      className={cn("px-4 py-2 border-b border-[var(--border)] bg-[var(--surface)]", className)}
    >
      <HStack gap={2}>
        <span className="inline-flex items-center px-2 py-0.5 rounded-[var(--radius-sm)] text-xs font-mono font-medium select-none bg-[rgba(249,115,22,0.12)] text-[var(--primary)]">
          {lang}
        </span>
        {title && <span className="text-xs text-[var(--text-muted)] truncate">{title}</span>}
      </HStack>
      <CodeBlockCopyButton />
    </HStack>
  );
}
