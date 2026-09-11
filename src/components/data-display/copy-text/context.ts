import { createContext, useContext } from "react";

export type CopyTextContextValue = {
  text: string;
  copied: boolean;
  onCopy: () => void;
};

export const CopyTextContext = createContext<CopyTextContextValue | null>(null);

export function useCopyTextContext(): CopyTextContextValue {
  const ctx = useContext(CopyTextContext);
  if (!ctx) throw new Error("CopyText sub-components must be used inside <CopyText>");
  return ctx;
}
