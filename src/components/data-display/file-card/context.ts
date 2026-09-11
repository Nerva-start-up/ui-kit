import { createContext, useContext } from "react";
import type { FileCardContextValue } from "./types";

export const FileCardContext = createContext<FileCardContextValue | null>(null);

export function useFileCardContext(): FileCardContextValue {
  const ctx = useContext(FileCardContext);
  if (!ctx) throw new Error("FileCard sub-components must be used inside <FileCard>");
  return ctx;
}
