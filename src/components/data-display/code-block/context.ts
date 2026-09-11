import { createContext, useContext } from "react";

export type CodeBlockContextValue = {
  code: string;
  lang: string;
  copied: boolean;
  onCopy: () => void;
};

export const CodeBlockContext = createContext<CodeBlockContextValue | null>(null);

export function useCodeBlockContext(): CodeBlockContextValue {
  const ctx = useContext(CodeBlockContext);
  if (!ctx) throw new Error("CodeBlock sub-components must be used inside <CodeBlock>");
  return ctx;
}
