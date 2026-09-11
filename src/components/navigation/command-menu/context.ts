import { createContext, useContext } from "react";
import type { CommandItem } from "./types";

export type CommandMenuContextValue = {
  open: boolean;
  search: string;
  setSearch: (s: string) => void;
  filtered: CommandItem[];
  activeIndex: number;
  setActiveIndex: (i: number) => void;
  onClose: () => void;
  execute: (item: CommandItem) => void;
};

export const CommandMenuContext = createContext<CommandMenuContextValue | null>(null);

export function useCommandMenuContext(): CommandMenuContextValue {
  const ctx = useContext(CommandMenuContext);
  if (!ctx) throw new Error("CommandMenu sub-components must be used inside <CommandMenu>");
  return ctx;
}
