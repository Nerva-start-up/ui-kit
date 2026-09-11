import { createContext, useContext } from "react";

export type DrawerContextValue = { onClose: () => void };

export const DrawerContext = createContext<DrawerContextValue | null>(null);

export function useDrawerContext(): DrawerContextValue {
  const ctx = useContext(DrawerContext);
  if (!ctx) throw new Error("Drawer sub-components must be used inside <Drawer>");
  return ctx;
}
