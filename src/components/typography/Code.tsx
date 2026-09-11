import type React from "react";
import { cn } from "../../lib/cn";

export type CodeProps = React.HTMLAttributes<HTMLElement>;

/** Инлайн-код `<code>`: моноширинный токен шрифта + фон-«пилюля». Для блоков кода используй `CodeBlock`. */
export function Code({ className, children, ...props }: CodeProps) {
  return (
    <code
      className={cn(
        "rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface-2)] px-1.5 py-0.5 text-[length:var(--font-size-sm)] font-[family-name:var(--font-mono)] text-[var(--text)]",
        className
      )}
      {...props}
    >
      {children}
    </code>
  );
}
