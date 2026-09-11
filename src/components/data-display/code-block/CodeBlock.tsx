import type React from "react";
import { useCallback, useState } from "react";
import { cn } from "../../../lib/cn";
import { CodeBlockContext } from "./context";

export type CodeBlockProps = {
  /** исходный код */
  code: string;
  /** язык для подсветки (python, sql, bash, json, typescript и др.) */
  lang?: string;
  className?: string;
  children: React.ReactNode;
};

/** Root — контейнер, хранит code/lang, управляет состоянием copied. */
export function CodeBlock({ code, lang = "text", className, children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [code]);

  return (
    <CodeBlockContext.Provider value={{ code, lang, copied, onCopy }}>
      <div
        className={cn(
          "rounded-[var(--radius-lg)] border border-[var(--border)] overflow-hidden",
          "bg-[var(--surface-2)] text-sm",
          className
        )}
      >
        {children}
      </div>
    </CodeBlockContext.Provider>
  );
}
